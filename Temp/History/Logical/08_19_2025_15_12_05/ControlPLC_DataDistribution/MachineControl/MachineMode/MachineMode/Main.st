
PROGRAM _INIT

	Name := 'Machine Mode';
	
	// link commands
	subscribePLCOpenWithParameters( gMachineModeApi.command.activateMode, Name, ADR(task.internal.parameters), SIZEOF(task.internal.parameters), task.command.activateSelectedMode, task.internal.PLCOpen );
	
	// link statuses
	registerStateBool( gMachineModeApi.status.subSystemsReady, Name, task.internal.machineIsStopped );
	
	// restore mode
	task.status.activeMode := MACHINE_MODE_MAINTENANCE;
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	///////////////////////////////////////////////////////////////
	//Call Piper Interface
	///////////////////////////////////////////////////////////////
	PiperModuleInterface;

	///////////////////////////////////////////////////////////////
	//API:
	//	Requires:
	//	- MACH_ST_STOPPED
	//	Commands:
	//	- activateSelectedMode
	//	Status:
	//	- 
	//	Inhbitits:
	//	-
	///////////////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////////////
	//Update statuses
	///////////////////////////////////////////////////////////////
	gMachineModeApi.status.activeMode := task.status.activeMode;
	task.status.maintenanceModeActive := ( task.status.activeMode = MACHINE_MODE_MAINTENANCE );

	

	//Read external states
	task.status.ready := stateAllTrue( gMachineModeApi.status.subSystemsReady, TRUE );

	///////////////////////////////////////////////////////////////
	//Handle interpreting commands that require STATE_READY
	///////////////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////////////
	//Handle any canceled commands that are required
	///////////////////////////////////////////////////////////////	
	IF task.internal.newCommand THEN

		//TODO: Log state changes
		//		task.internal.abortedStep := task.status.sequence;
		//		task.internal.abortedState := task.internal.previousState;

		task.status.sequence := SEQUENCE_IDLE;

		//If a new command came into the system, abort any PLCOpen commands that were active.
		// If the command came from PLCOpen FirstPass will be true and it will not abort it
		atnPLCOpenAbort(task.internal.PLCOpen);		

	END_IF
					

	
		///////////////////////////////////////////////////////////////
		//Reset all commands to ensure they don't get buffered
		///////////////////////////////////////////////////////////////

		brsmemset( ADR(task.command), 0, SIZEOF(task.command) );
	
		task.internal.newCommand := 0;

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
	
	// retain mode
	nonvolatile.activeMode := task.status.activeMode;
	 
END_PROGRAM

PROGRAM _EXIT
	 
END_PROGRAM

