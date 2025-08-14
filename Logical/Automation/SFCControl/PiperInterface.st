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
	
	//Give this module a name so it is easier to debug
	ModuleInterface.ModuleName:=	'SFC Control';

	//Add a module to the Piper
	Module.ModuleInterface:=	ADR(ModuleInterface);
	Module.Piper:= 	ADR(gMachine);
	Module();
	
	task.status.paused := FALSE;

	// Handle any machine states that this module needs to respond to
	CASE ModuleInterface.PiperState OF
		//		MACH_ST_BOOTING:		
		//		MACH_ST_CLEARING:
		//		MACH_ST_STOPPED:
		//		MACH_ST_STARTING:
		//		MACH_ST_IDLE:
		//		MACH_ST_SUSPENDED:
		MACH_ST_EXECUTE:
			IF anyPaused THEN
				task.status.paused := TRUE;
				ModuleInterface.ModuleResponse:=	MACH_ST_NOT_READY;		
			ELSE 
				task.status.paused := FALSE;
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;				
			END_IF	
		//		MACH_ST_ABORTING:
		//		MACH_ST_ABORTED:
		//		MACH_ST_HOLDING:
		//		MACH_ST_HELD:
		MACH_ST_STOPPING,
		MACH_ST_ABORTING:
			task.internal.reset.Execute := TRUE;
			IF task.internal.reset.Done 
			OR task.internal.reset.Error 
			OR task.internal.reset.Aborted THEN

				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
				
			END_IF	
						
			
		MACH_ST_UNHOLDING,							
		MACH_ST_SUSPENDING:

			task.internal.unpause.Execute := TRUE;
			IF task.internal.unpause.Done THEN

				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;

			ELSIF task.internal.unpause.Error OR task.internal.unpause.Aborted THEN

				gMachine.IN.CMD.Stop := TRUE;

	//			vfAlarmEdgeSnippet( gMachineAlarms.components, gMachineAlarms.PACKML_STOP, 'Stop due to unpause failure');

				logInfo( 'App', 0, 'Stop due to failure to unpause', 0 );
				
			END_IF	
		//		MACH_ST_UNSUSPENDING:
		//		MACH_ST_RESETTING:
		//		MACH_ST_COMPLETING:
		//		MACH_ST_COMPLETE:			
		MACH_ST_BYPASSED:
		
		ELSE
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
		
	END_CASE	

		
END_ACTION