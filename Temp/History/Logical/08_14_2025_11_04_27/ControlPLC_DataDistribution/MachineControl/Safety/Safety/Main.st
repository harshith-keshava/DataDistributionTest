PROGRAM _INIT
	
	Configuration.Exists := TRUE; //for now
		
	Name := 'Safety System';
	IF Configuration.Exists THEN

		//COMMAND SUBSCRIPTION
		subscribePLCOpen( gSafetyApi.commands.resetMachineSafety, Name, task.command.resetMachineSafety, task.internal.PLCOpen );			
		subscribePLCOpen( gSafetyApi.commands.resetLaserSafety, Name, task.command.resetLaserSafety, task.internal.PLCOpen );
		subscribePLCOpen( gSafetyApi.commands.resetAllSafety, Name, task.command.resetAllSafety, task.internal.PLCOpen );
		
		//GENERAL SAFETY STATUS
		registerStateBool( gSafetyApi.status.AnyEStopPressed, 'Safety PLC Estop', IO.safeLOGIC.Status.EStopPressed);
		registerStateBool( gSafetyApi.status.AnyEStopPressed, ' Handheld Estop', IO.SDI_EStopButton_HandHeld.DUAL_EVAL);
		registerStateBool( gSafetyApi.status.AnyEStopPressed, 'Control Room EStop', IO.SDI_EStop_LaserControlRoom.DUAL_EVAL);

		//LASERS
		registerStateBool( gSafetyApi.status.LaserSafetyEnabled, Name, IO.safeLOGIC.Status.SafetyReset_Lasers);	
		

		//Safety Reset status
		registerStateBool( gSafetyApi.status.SafetyResetEstop, Name, IO.safeLOGIC.Status.SafetyReset_EStops);	
		

		
	END_IF
	
	// hard code racks enabled (bit 0 is unused)
	IO.safeLOGIC.Command.RacksEnabled := 2#0000_1111;
	
	
	IF gSimulation THEN
		test.command.initAirPressure := TRUE;
		test.command.initNoEstopPressed := TRUE;
	END_IF
	
END_PROGRAM

PROGRAM _CYCLIC			
	
	IF NOT Configuration.Exists THEN
		RETURN;		
	END_IF
	
	IF gSimulation THEN
		SimulateIO;
	END_IF
	
	//Call piper interface	
	PiperModuleInterface;
	
	///////////////////////////////////////////////////////////////
	//API:
	//	Requires:
	//	-
	//	Commands:
	//	-resetSafety
	//	-enableLasers
	
	//	Inhbits:
	//	- 
	//  State Monitoring
	//  -
	///////////////////////////////////////////////////////////////

	task.status.ready := stateStatus( gSafetyApi.status.subsystemsReady, ADR(task.internal.subSystemStatus), SIZEOF(task.internal.subSystemStatus) );	
	
	IF NOT task.status.ready THEN
		stateStatus( gSafetyApi.status.subsystemsReady, ADR(task.internal.subSystemStatus), SIZEOF(task.internal.subSystemStatus) );	
	ELSE
		task.internal.subSystemStatus[0] := 'Ready';
	END_IF	
	

	
	// Status population from EStop I/O
	task.status.eStopStatusBool := stateFalseStatus( gSafetyApi.status.AnyEStopPressed, ADR(task.status.eStopStatus ), SIZEOF(task.status.eStopStatus));
	
	
	// If there's an EStop detected but no 'EStop Pressed' output from the Safety PLC, all active EStops must logically have been overridden	
	//IF task.status.overrideStatusBool AND task.status.eStopStatusBool AND NOT (IO.safeLOGIC.Status.EStopPressed) THEN
	//	task.status.allActiveEStopOverridden := TRUE;
	//ELSE
	//	task.status.allActiveEStopOverridden := FALSE;
	//END_IF

	
	//BLUE RESET BUTTON
	IF (IO.DI_SafetyResetButton[0] OR IO.DI_SafetyResetButton[1]) AND NOT(task.internal._safetyResetButton) THEN
		task.command.resetAllSafety := TRUE;
	END_IF
	
	//LED BLUE INDICATOR ON JOG BOX
	IF IO.safeLOGIC.Status.EStopPressed THEN
		// Estop pressed: Fast blip
		task.internal.fbPulseBlueResetIndicator.Enable := FALSE;
		task.internal.fbPulseBlueResetIndicator();
		task.internal.fbPulseBlueResetIndicator.PulseOffTime := 2000;
		task.internal.fbPulseBlueResetIndicator.PulseOnTime := 50;
		task.internal.fbPulseBlueResetIndicator.Enable := TRUE;
		IO.DO_SafetyResetLamp := task.internal.fbPulseBlueResetIndicator.PulseOutput;
	ELSIF NOT(IO.safeLOGIC.Status.SafetyReset_EStops)  THEN
		// Estops physically reset but not safety reset: Slow pulse
		task.internal.fbPulseBlueResetIndicator.Enable := FALSE;
		task.internal.fbPulseBlueResetIndicator();
		task.internal.fbPulseBlueResetIndicator.PulseOffTime := 500;
		task.internal.fbPulseBlueResetIndicator.PulseOnTime := 500;
		task.internal.fbPulseBlueResetIndicator.Enable :=  TRUE;
		IO.DO_SafetyResetLamp := task.internal.fbPulseBlueResetIndicator.PulseOutput;
	END_IF
	
	IF IO.Chiller1Running AND IO.Chiller2Running THEN
		IO.ChillerRunning := TRUE;
	ELSE
		IO.ChillerRunning := FALSE;
	END_IF
	

	///////////////////////////////////////////////////////////////
	//Handle interpreting commands that do not require STATE_READY
	///////////////////////////////////////////////////////////////
	IF task.status.ready THEN
				
		//NOTE: Commands that just turn ON/OFF IO CAN happen in the command translation
	
		IF task.command.resetMachineSafety THEN
			
			task.internal.newCommand := 1;
			task.status.state := STATE_RESET_MACHINE_SAFETY;
		
		ELSIF task.command.resetLaserSafety THEN
		
			task.internal.newCommand := 1;
			task.status.state := STATE_RESET_LASER_SAFETY;	
		
		ELSIF task.command.resetAllSafety THEN
				
			task.internal.newCommand := 1;	
			task.status.state := STATE_RESET_ALL_SAFETY;
		
		END_IF
		
	ELSE
			
		task.internal.PLCOpen.status := SAFETY_ERROR;
		task.status.state := STATE_NOT_READY;
		task.internal.localLockout := FALSE;
			
	END_IF
	
		
	///////////////////////////////////////////////////////////////
	//Handle any canceled commands that are required
	///////////////////////////////////////////////////////////////	
	IF task.internal.newCommand THEN

		task.status.sequence := SEQUENCE_IDLE;

		//If a new command came into the system, abort any PLCOpen commands that were active.
		// If the command came from PLCOpen FirstPass will be true and it will not abort it
		atnPLCOpenAbort(task.internal.PLCOpen);

		//TODO: Handle any commands that might need to be inhibited		
	END_IF
					

	///////////////////////////////////////////////////////////////
	//Handle any Commands that do not require state.
	///////////////////////////////////////////////////////////////	

	
	///////////////////////////////////////////////////////////////
	//Handle the current state
	///////////////////////////////////////////////////////////////
	CASE task.status.state OF
		
		STATE_NOT_READY:
			
			task.status.sequence := SEQUENCE_IDLE;

			task.status.statusMessage := 'Safety is not ready';	

			IF task.status.ready THEN
				task.status.state := STATE_READY;
				task.status.statusMessage := 'Safety is ready';	
			END_IF	

		STATE_READY:

			task.status.sequence := SEQUENCE_IDLE;
			
			//TODO: Handle any commands that require lockout
			task.internal.localLockout := FALSE;
			task.status.statusMessage := 'Ready For Command';
			
		STATE_RESET_MACHINE_SAFETY:
			task.status.statusMessage := 'Resetting Machine Safety';
			
			//hold on for 1 second
			task.internal.fbResetMachineOnPulse.StartDelay := 0;
			task.internal.fbResetMachineOnPulse.PulseOnTime := 1000;
			task.internal.fbResetMachineOnPulse.PulseOffTime := 500;
			task.internal.fbResetMachineOnPulse.NumPulses := 2;
			task.internal.fbResetMachineOnPulse.Enable := TRUE;
			
			//hold reset signal to safety PLC for one pulse 
			IF task.internal.fbResetMachineOnPulse.Done THEN 	
				task.internal.fbResetMachineOnPulse.Enable := FALSE;
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
			END_IF
		
		STATE_RESET_LASER_SAFETY:
		
			task.status.statusMessage := 'Resetting Laser Safety';
			
			//hold on for 1 second
			task.internal.fbResetLaserOnPulse.StartDelay := 0;
			task.internal.fbResetLaserOnPulse.PulseOnTime := 1000;
			task.internal.fbResetLaserOnPulse.NumPulses := 1;
			task.internal.fbResetLaserOnPulse.Enable := TRUE;
			
			//hold reset signal to safety PLC for one pulse 
			IF task.internal.fbResetLaserOnPulse.Done THEN 
				task.internal.fbResetLaserOnPulse.Enable := FALSE;
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
			END_IF
		
		
		STATE_RESET_ALL_SAFETY:
			
			task.status.statusMessage := 'Resetting All Safety';
		
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					task.status.statusMessage := 'Error Resetting Safety';	

					//Handle Error
					task.internal.PLCOpen.status := SAFETY_ERROR;
					task.status.state := STATE_READY;

				SEQUENCE_DONE:
					task.status.statusMessage := 'All Safety Reset';	

					//Handle Done
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
				
				SEQUENCE_IDLE:

					task.status.statusMessage := 'resetting all safety';	
					task.status.sequence := SEQUENCE_EXECUTE_SAFETY_RESET;
					
				ELSE
					
					ResetAllSafetySubsequence;														

			END_CASE
		
	END_CASE;
	
	//logic to abort if the door is opened and we are powered on
	IF task.internal.interlocksOpen AND NOT(task.internal._interlocksOpen) THEN
		gMachine.IN.CMD.Abort := TRUE;
	//	vfAlarmEdge(gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.InterlockDoorOpened_AL0033);
	END_IF
	
	task.internal._interlocksOpen := task.internal.interlocksOpen;
	
	//requests to safety PLC are held on by a timer
	IO.safeLOGIC.Command.RequestMachineSafetyReset := task.internal.fbResetMachineOnPulse.PulseOutput;
	IO.safeLOGIC.Command.RequestLaserSafetyReset := task.internal.fbResetLaserOnPulse.PulseOutput;
	

	///////////////////////////////////////////////////////////////
	//Update Statuses
	///////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////
	//Edge Detection
	///////////////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////////////
	//Reset all commands to ensure they don't get buffered
	///////////////////////////////////////////////////////////////
	task.command.resetAllSafety := 0;
	task.command.resetMachineSafety := 0;
	task.command.resetLaserSafety := 0;
	task.internal.newCommand := 0;

	///////////////////////////////////////////////////////////////
	//Call all PLCOpen function blocks
	///////////////////////////////////////////////////////////////
	task.internal.fbResetMachineOnPulse(); 
	task.internal.fbResetLaserOnPulse(); 		
	task.internal.fbPulseBlueResetIndicator(); 
	task.internal.safetyTimeout();
	task.internal.safetyTimeout.IN := FALSE;
	task.internal.safetyTimeout.PT := T#7s;
	
	
	// FUB for piper-based safety reset in MACH_ST_RESETTING
	task.internal.resetAllSafety.Command := gSafetyApi.commands.resetAllSafety;
	task.internal.resetAllSafety();
	task.internal.resetAllSafety.Execute := FALSE;

	logStateChange_0.LoggerName := 'App';
	logStateChange_0.ModuleName := Name;
	logStateChange_0.State 		:= task.status.state;
	logStateChange_0.StateName 	:= task.status.statusMessage;
	logStateChange_0();
	
	logSeqChange_0.LoggerName 	:= 'App';
	logSeqChange_0.ModuleName 	:= Name;
//	logSeqChange_0.State		:= task.status.sequence;
//	logSeqChange_0.StateName	:= task.status.statusMessage;
//	logSeqChange_0();
	
	//Keep track of the previous state
	task.internal.previousState := task.status.state;
	
	

END_PROGRAM

PROGRAM _EXIT
		(* Insert code here *)
	 
END_PROGRAM

