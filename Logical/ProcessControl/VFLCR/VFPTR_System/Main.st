
PROGRAM _INIT
	
	IO.do.counterReset := TRUE;
	
	subscribePLCOpen(gVFLCR.command.enableModulation,  'VFPTR_System', task.command.enableModulation,  task.internal.PLCOpenEnableModulation);
	subscribePLCOpen(gVFLCR.command.disableModulation, 'VFPTR_System', task.command.disableModulation, task.internal.PLCOpenDisableModulation);
	
	subscribePLCOpen(gVFLCR.command.openLayer, 'VFPTR_System', task.command.pulseCounterReset, task.internal.PLCOpenCounterReset);
	subscribePLCOpen(gVFLCR.command.abortLayer, 'VFPTR_System', task.command.endTrajectory, task.internal.PLCOpenTrajectory);
	
	

	
	registerStateBool(gVFLCR.inhibit.autoModulation, 'VFPTR_System', task.status.counterResetEnabled);
	
	registerStateBool(gVFLCR.status.counterResetEnabled, 'VFPTR_System', task.status.counterResetEnabled);
	registerStateBool(gVFLCR.status.modulationEnabled, 'VFPTR_System', task.status.modulationEnabled);
	registerStateBool(gVFLCR.status.userModulationEnabled, 'VFPTR_System', task.status.userModulationEnabled);
	registerStateBool(gVFLCR.status.encoderXSelected, 'VFPTR_System', task.status.encoderXSelected);
	registerStateBool(gVFLCR.status.prepareTrajectory, 'VFPTR_System', task.status.prepareTrajectory);
	
	// Set timeout
	task.internal.openLayerTON.PT := T#5s;
	
	// Initialize the lag error statistics function block moving window length.
	FOR i := 0 TO MONITOR_AXIS_MAI BY 1 DO
		task.internal.lagErrorStatistics[i].Enable := TRUE;
		task.internal.lagErrorStatistics[i].Update := TRUE;
		task.internal.lagErrorStatistics[i].MovingWindowLength := Configuration.lagMovingAvgWindowLength;
		task.internal.lagErrorStatistics[i].In := 0.0;
		task.internal.lagErrorStatistics[i]();	
	END_FOR
		 
END_PROGRAM

PROGRAM _CYCLIC
	
	//PiperModuleInterface;
	
	// Modulation in manual mode requires:
	// - safety interlock reset
	// 		- inhibit probably set elsewhere
	// - modulationEnable flag (set by user)
	// Modulation in auto mode additionally requires:
	// - prepareTrajectory (M-flag)
	// - NOT counterReset (command, maybe also M-flag related?)
	// - build info valid
	// 		- inhibit set elsewhere
	// - CNC gantry group is in GroupStateMoving
	// 		- inhibit set elsewhere
	// - master axis homed and within build volume bounds (+/- 25mm?)
	// 		- inhibit set elsewhere
	
	// do.enableModulation should be TRUE only while over the build plate; other conditions apply, see above
	// do.counterReset should be FALSE while in a trajectory, TRUE otherwise. Additionally, a positive edge is required after opening a layer and before starting the first trajectory.
	// do.selectEncoderX should be TRUE while printing in the X direction and FALSE while printing in the Y direction (while not lasing, its value is benign)
	
	///////////////////////////////////////////////////////////////
	// API:
	//	Requires:
	//	- nothing
	//	Commands:
	//	- enableModulation 			- Allows the lasers to fire
	//	- disableModulation 		- Prevents the lasers from firing
	//  Statuses:
	//	- modulationEnabled 		- Laser modulation is currently enabled
	//	- userModulationEnabled 	- Laser modulation is currently commanded to be enabled
	//	- counterResetEnabled 		- The laser position is being forced to 0
	//	- encoderXSelected 			- The X axis is being used to determine laser position, as opposed to the Y axis
	//	- prepareTrajectory 		- A trajectory is currently being executed
	//	Inhbitits:
	//	- autoModulation 			- TODO: Set by build info, CNC gantry state, and lead axis position.
	// 									TODO: should the logic that determines which axis does the inhibiting be implemented here?
	//	- modulation 				- TODO: Set by safety interlock
	///////////////////////////////////////////////////////////////
	
	// Read in external components
	
	// Read external states
	task.status.ready := TRUE;
	
	task.internal.manualModeEnabled := stateAllTrue(gVFLCR.status.manualModeEnabled, TRUE);
	task.internal.laserEmissionEnabled := stateAnyTrue(gVFLCR.status.laserEmissionEnabled, FALSE);
	
	IF task.internal.manualModeEnabled THEN
		task.internal.modulationInhibited := TRUE;
	ELSE
		task.internal.modulationInhibited := isInhibited(gVFLCR.inhibit.modulation) OR isInhibited(gVFLCR.inhibit.autoModulation) OR NOT(task.status.prepareTrajectory) ;
	END_IF
	
	// Handle commands
	//IF task.command.enableModulation THEN
		
	//	task.status.userModulationEnabled := TRUE;
	//	gVFLCR.status.laserModulationEnabled := TRUE;
	//	task.internal.PLCOpenEnableModulation.status := ERR_OK;
		
//	END_IF
	
	IF task.command.disableModulation THEN
		
		task.status.userModulationEnabled := FALSE;
		task.internal.PLCOpenDisableModulation.status := ERR_OK;
		task.internal.PLCOpenEnableModulation.status := ERR_INHIBITED;
		
	END_IF
	
	IF task.command.pulseCounterReset THEN
		
		task.internal.newCommand := TRUE;
		task.status.state := STATE_PULSE_COUNTER_RESET;
		
	ELSIF task.command.beginTrajectoryX THEN
		
		task.internal.newCommand := TRUE;
		task.internal.setLeadX := TRUE;
		task.status.state := STATE_BEGIN_TRAJECTORY;
		
	ELSIF task.command.beginTrajectoryY THEN
		
		task.internal.newCommand := TRUE;
		task.internal.setLeadX := FALSE;
		task.status.state := STATE_BEGIN_TRAJECTORY;
		
	ELSIF task.command.endTrajectory THEN
		
		task.internal.newCommand := TRUE;
		task.status.state := STATE_READY;
		
	END_IF
	
	
	///////////////////////////////////////////////////////////////
	// Handle any canceled commands that are required
	///////////////////////////////////////////////////////////////
	IF task.internal.newCommand THEN
		
		//TODO: Log state changes
		//		task.internal.abortedStep := task.status.sequence;
		//		task.internal.abortedState := task.internal.previousState;
		
		task.status.sequence := SEQUENCE_IDLE;
		
		atnPLCOpenAbort(task.internal.PLCOpenTrajectory);
		atnPLCOpenAbort(task.internal.PLCOpenCounterReset);
		
	END_IF
	
	// Handle single-cycle commands
	IF task.command.endTrajectory THEN
		
		task.status.prepareTrajectory := FALSE;
		IO.do.counterReset := TRUE;
		task.internal.PLCOpenTrajectory.status := ERR_OK;
		
	END_IF
	
	
	///////////////////////////////////////////////////////////////
	// Handle the current state
	///////////////////////////////////////////////////////////////
	CASE task.status.state OF
		
		STATE_NOT_READY:
			
			task.status.sequence := SEQUENCE_IDLE;
			
			IF task.status.ready THEN
				
				task.status.state := STATE_READY;
				
			END_IF
			
			
		STATE_READY:
			
			task.status.sequence := SEQUENCE_IDLE;
			
			
		STATE_BEGIN_TRAJECTORY:
			
			CASE task.status.sequence OF
				// Non-standard sequencing to improve responsiveness
				SEQUENCE_IDLE:
				
						
					IO.do.selectEncoderX := task.internal.setLeadX;
					IO.do.counterReset := TRUE;
					
					IF Configuration.disableLagCheck THEN
						task.status.sequence := SEQUENCE_DONE;
					ELSE
						
						task.status.sequence := SEQUENCE_CHECK_LAG_IN_TOLERANCE;
						
					END_IF
					
				SEQUENCE_CHECK_LAG_IN_TOLERANCE:
					
					// Verify that lag error for X1 and X2 has stabilized. 
					IF task.status.encoderXSelected THEN
						IF ((task.internal.lagErrorStatistics[MONITOR_AXIS_X1].Mean < Configuration.minLagToBeginTrajectory) AND
							(task.internal.lagErrorStatistics[MONITOR_AXIS_X1].StdDeviation < Configuration.minLagStdDev) AND 
							(task.internal.lagErrorStatistics[MONITOR_AXIS_X2].Mean < Configuration.minLagToBeginTrajectory) AND
							(task.internal.lagErrorStatistics[MONITOR_AXIS_X2].StdDeviation < Configuration.minLagStdDev)) THEN
							task.status.sequence := SEQUENCE_DONE;
						END_IF
					// Verify that lag error for Y axis has stabilized.
					ELSE
						IF ((task.internal.lagErrorStatistics[MONITOR_AXIS_Y].Mean < Configuration.minLagToBeginTrajectory) AND
							(task.internal.lagErrorStatistics[MONITOR_AXIS_Y].StdDeviation < Configuration.minLagStdDev)) THEN
							task.status.sequence := SEQUENCE_DONE;
						END_IF
					END_IF
					
				SEQUENCE_DONE:
					
					task.status.prepareTrajectory := TRUE;
					IO.do.counterReset := FALSE;
					task.internal.PLCOpenTrajectory.status := ERR_OK;
					task.status.state := STATE_READY;
					
			END_CASE
			
		// This sequence requires the laser IO devices to check IO at least as frequently as this task runs (cycle time is currently 0.8ms)
		STATE_PULSE_COUNTER_RESET:
			// Non-standard sequencing to match STATE_BEGIN_TRAJECTORY
			CASE task.status.sequence OF
				
				SEQUENCE_IDLE:
					// One or more racks might fail to open layer; if so, time out instead of hanging
					task.internal.openLayerTON.IN := TRUE;
					
					IF stateAllTrue(gVFLCR.status.layerOpen, TRUE) THEN
						// pulse
						IO.do.counterReset := FALSE;
						task.status.sequence := SEQUENCE_DONE;
						
					ELSIF task.internal.openLayerTON.Q THEN
						// no need to pulse
						task.internal.PLCOpenCounterReset.status := VFLCR_ERROR;
						task.status.state := STATE_READY;
						
					END_IF
					
				SEQUENCE_DONE:
					
					IO.do.counterReset := TRUE;
					task.internal.PLCOpenCounterReset.status := ERR_OK;
					task.status.state := STATE_READY;
					
			END_CASE
			
	END_CASE
	
	
	///////////////////////////////////////////////////////////////
	// Reset all commands to ensure they don't get buffered
	///////////////////////////////////////////////////////////////
	brsmemset(ADR(task.command), 0, SIZEOF(task.command));
	task.internal.newCommand := FALSE;
	
	
	///////////////////////////////////////////////////////////////
	// Call all function blocks
	///////////////////////////////////////////////////////////////
	task.internal.openLayerTON();
	task.internal.openLayerTON.IN := FALSE;
	
	
	///////////////////////////////////////////////////////////////
	// Set remaining IO and statuses
	///////////////////////////////////////////////////////////////
	IO.do.enableModulation := FALSE;
	
	task.status.counterResetEnabled := IO.do.counterReset;
	task.status.encoderXSelected := IO.do.selectEncoderX;
	task.status.modulationEnabled := IO.do.enableModulation;
	
	

	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

