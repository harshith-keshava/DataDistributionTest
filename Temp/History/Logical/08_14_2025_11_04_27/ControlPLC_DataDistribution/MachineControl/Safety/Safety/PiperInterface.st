
ACTION PiperModuleInterface: 
	
	//Give this module a name so it is easier to debug
	ModuleInterface.ModuleName:=	Name;

	//Add a module to the Piper
	Module.ModuleInterface:=	ADR(ModuleInterface);
	Module.Piper:= 	ADR(gMachine);
	Module();

	// Set machine mode optional actions
	piperResetSafety := FALSE;
	piperCheckSafetyReset := FALSE;
	piperCheckLaserSafetyReset := FALSE;
	CASE gMachineModeApi.status.activeMode OF
		
		MACHINE_MODE_MAINTENANCE:
		
			piperResetSafety := TRUE;
			
		MACHINE_MODE_SETUP:
						
			piperResetSafety := TRUE;
			piperCheckSafetyReset := TRUE;

		MACHINE_MODE_PRODUCTION:
			
			piperResetSafety := TRUE;
			piperCheckSafetyReset := TRUE;
			piperCheckLaserSafetyReset := TRUE;

		ELSE
			
	END_CASE;
	
	// Handle any machine states that this module needs to respond to
	CASE ModuleInterface.PiperState OF
//		MACH_ST_BOOTING:		
//		MACH_ST_CLEARING:
//		MACH_ST_STOPPED:
		MACH_ST_STARTING:
			
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			
			
			(*//sample piper integration
			
			//for when sequence is required for substate transition
			CASE ModuleInterface.PiperSubState OF
				
				0:
					
					//only need the chiller for printing but not other operations
					CASE gMachineState.operation OF
						
						MACHINE_OPERATIONS_PRINT_LAYER:
							ModuleInterface.ModuleSubStateRequest := SUB_STATE_CHECK_CHILLER;
						
						ELSE
							ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
						
					END_CASE
						
						
								
			
				
					
			
				SUB_STATE_CHECK_CHILLER:
					
					//should be an edge command
					task.command.startChiller := TRUE;
					
					ModuleInterface.ModuleStatus := 'waiting chiller';
					
					IF task.status.chillerIsRunning THEN
						ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
					END_IF

			END_CASE
			
			*)
			
			
			
			
//		MACH_ST_IDLE:
//		MACH_ST_SUSPENDED:
//		MACH_ST_EXECUTE:
//		MACH_ST_STOPPING:
//		MACH_ST_ABORTING:
//		MACH_ST_ABORTED:
//		MACH_ST_HOLDING:
//		MACH_ST_HELD:
//		MACH_ST_UNHOLDING:
//		MACH_ST_SUSPENDING:
//		MACH_ST_UNSUSPENDING:
		
		MACH_ST_RESETTING:
			
			IF piperResetSafety THEN
			
				CASE ModuleInterface.PiperSubState OF
					
					SUB_STATE_INIT:
						ModuleInterface.ModuleSubStateRequest := SUB_STATE_RESETTING_RESET_SAFETY;
						
					SUB_STATE_RESETTING_RESET_SAFETY:
						
						// trigger reset
						task.internal.resetAllSafety.Execute := TRUE;
						
						IF piperCheckSafetyReset AND NOT gSimulation THEN
							
							// check success
							IF (	stateAllTrue( gSafetyApi.status.LaserSafetyEnabled , TRUE ) OR NOT(piperCheckLaserSafetyReset) ) THEN
		//					
								
								ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;			
							
							END_IF
							
						ELSE
							
							// proceed without checking success
							IF task.internal.resetAllSafety.Done THEN
							
								ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;			
							
							END_IF
							
						END_IF
					
						
					ELSE
						
				END_CASE
				
			ELSE
				
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;	
			
			END_IF

			
			
//		MACH_ST_COMPLETING:
//		MACH_ST_COMPLETE:
		
		MACH_ST_BYPASSED:
		
		ELSE
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
		
	END_CASE	

	
	//handle unlock load zone based on piper state
	CASE ModuleInterface.PiperState OF
		MACH_ST_BYPASSED, MACH_ST_COMPLETE, MACH_ST_HELD, MACH_ST_ABORTED, MACH_ST_SUSPENDED,
		MACH_ST_IDLE, MACH_ST_STOPPED, MACH_ST_NOT_READY, MACH_ST_ERROR, MACH_ST_BOOTING:
				task.internal.alarmExteriorUnlock := FALSE; // Machine in stopped state reset invalid command
			IF IO.safeLOGIC.NonSafeInputs.RequestExteriorZoneUnlock THEN
				IO.safeLOGIC.Command.RequestToEnterExteriorLoadZone := TRUE;
			END_IF
		ELSE
			task.internal.preventExteriorUnlock := TRUE;
			IF IO.safeLOGIC.NonSafeInputs.RequestExteriorZoneUnlock THEN // ignore command
				IO.safeLOGIC.Command.RequestToEnterExteriorLoadZone := FALSE;
				task.internal.alarmExteriorUnlock := TRUE;
			END_IF
	END_CASE
	
		
			

	//for turning commands to edges to work with piper
	(*
	//Turn level commands to edges
	EdgePosArray( ADR(piperCommands), ADR(_piperCommands), ADR(task.command), SIZEOF(task.command) );
	brsmemset( ADR(piperCommands), 0, SIZEOF(piperCommands) );
	*)
	
	
END_ACTION