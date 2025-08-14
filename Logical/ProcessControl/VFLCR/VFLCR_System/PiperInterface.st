(********************************************************************
 * COPYRIGHT --  
 ********************************************************************
 * Program: MachineProg
 * File: PiperModuleInterface.st
 * Author: Josh
 * Created: October 03, 2013
 ********************************************************************
 * Implementation of program MachineProg
 ********************************************************************) 

ACTION PiperModuleInterface: 
	
	// Give this module a name so it is easier to debug
	ModuleInterface.ModuleName:= Name;
	
	// Add a module to the Piper
	Module.ModuleInterface:= ADR(ModuleInterface);
	Module.Piper:= ADR(gMachine);
	Module();
	
	// Set machine mode optional actions
	piperEnableLasers := FALSE;
	CASE gMachineModeApi.status.activeMode OF
		
		MACHINE_MODE_MAINTENANCE:
			
		MACHINE_MODE_SETUP:
			
		MACHINE_MODE_PRODUCTION:
			
			//only reset the lasers if its good to do so..
			IF stateAllTrue(gMachineModeApi.watchdog.productionModeOkay, FALSE) THEN
				piperEnableLasers := TRUE;
			END_IF
				
		ELSE
			
	END_CASE
	
	// Handle any machine states that this module needs to respond to
	CASE ModuleInterface.PiperState OF
//		MACH_ST_BOOTING:
//		MACH_ST_CLEARING:
//		MACH_ST_STOPPED:
//		MACH_ST_STARTING:
//		MACH_ST_IDLE:
//		MACH_ST_SUSPENDED:
//		MACH_ST_EXECUTE:
		MACH_ST_STOPPING:
			
			IF _prevPiperState <> ModuleInterface.PiperState THEN
			
				executeCommand(gVFLCR.command.abortLayer);
				executeCommand(gVFLCR.command.manualPulseAbort);
			END_IF
			
			ModuleInterface.ModuleResponse := ModuleInterface.PiperState;

		MACH_ST_ABORTING:
			
			piperCommands.disableDCPower := TRUE;
			
			CASE ModuleInterface.PiperSubState OF
				SUB_STATE_INIT:
					ModuleInterface.ModuleSubStateRequest := SUB_STATE_DEPOWER_LASERS;
					
				SUB_STATE_DEPOWER_LASERS:
					
					IF stateAllFalse(gVFLCR.status.dcPowerEnabled, TRUE) THEN 
						IF _prevPiperState <> ModuleInterface.PiperState THEN
							executeCommand(gVFLCR.command.abortLayer);
						END_IF
						
						ModuleInterface.ModuleResponse := ModuleInterface.PiperState;
					END_IF
					
			END_CASE
			
//		MACH_ST_ABORTED:
//		MACH_ST_HOLDING:
//		MACH_ST_HELD:
//		MACH_ST_UNHOLDING:
//		MACH_ST_SUSPENDING:
//		MACH_ST_UNSUSPENDING:
			//		MACH_ST_STARTING,
			
		MACH_ST_RESETTING:
			
			IF piperEnableLasers AND stateAnyFalse(gVFLCR.status.readyToPrint, FALSE) THEN
		
				piperCommands.resetAllErrors := TRUE;
				
				CASE ModuleInterface.PiperSubState OF
					SUB_STATE_INIT:
						ModuleInterface.ModuleSubStateRequest := SUB_STATE_CONFIRM_LASERS_WANTED;
					
						
					SUB_STATE_CONFIRM_LASERS_WANTED:
						
						
						IF (messageHandler.msgId = 0) AND NOT(ModuleInterface.ModuleSubStateRequest = SUB_STATE_RESETTING_LASERS_ON) THEN
							messageHandler.msgId := MessageBox_AddMsg(ADR('Turn on Lasers?'), 
							ADR('Yes'), ADR(messageHandler.ok),
							ADR('No'), ADR(messageHandler.cancel));
						END_IF

						IF messageHandler.ok THEN
							ModuleInterface.ModuleSubStateRequest := SUB_STATE_RESETTING_LASERS_ON;
							messageHandler.ok := FALSE;
							messageHandler.msgId := 0;
						END_IF


						IF messageHandler.cancel THEN
							ModuleInterface.ModuleResponse := ModuleInterface.PiperState;
							messageHandler.cancel := FALSE;
							messageHandler.msgId := 0;
						END_IF

						
					SUB_STATE_RESETTING_LASERS_ON:
						
						piperCommands.enableAllLaserFunctions := TRUE;
				
						IF stateAllTrue(gVFLCR.status.readyToPrint, FALSE) OR gSimulation THEN 
							ModuleInterface.ModuleResponse := ModuleInterface.PiperState;
						END_IF
						
				END_CASE
	
			ELSE
		
				ModuleInterface.ModuleResponse := ModuleInterface.PiperState;
				
			END_IF
			
			
//		MACH_ST_COMPLETING:
//		MACH_ST_COMPLETE:
		
		MACH_ST_BYPASSED:
		
		ELSE
			ModuleInterface.ModuleResponse:= ModuleInterface.PiperState;
		
	END_CASE
	
	// Turn level commands to edges
	EdgePosArray(ADR(piperCommands), ADR(_piperCommands), ADR(task.command), SIZEOF(task.command));
	brsmemset(ADR(piperCommands), 0, SIZEOF(piperCommands));
	
	_prevPiperState := ModuleInterface.PiperState;
END_ACTION