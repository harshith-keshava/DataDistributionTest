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
	ModuleInterface.ModuleName:=	Name;

	//Add a module to the Piper
	Module.ModuleInterface:=	ADR(ModuleInterface);
	Module.Piper:= 	ADR(gMachine);
	Module();

	// reset stopped state flag (for atn ready registration)
	task.internal.machineIsStopped := FALSE;
	
	// Handle any machine states that this module needs to respond to
	CASE ModuleInterface.PiperState OF
//		MACH_ST_BOOTING:		
//		MACH_ST_CLEARING:
		
		MACH_ST_STOPPED:
			task.internal.machineIsStopped := TRUE;
			
			// Switch from maintenance mode to setup mode if requirements are lost (i.e. on logout)
			IF task.status.maintenanceModeActive AND task.internal.maintenanceRequirementsNotMet AND task.status.ready THEN
				piperCommands.activateSetupMode := TRUE;
			END_IF
			
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			
//		MACH_ST_STARTING:
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
//		MACH_ST_RESETTING:
//		MACH_ST_COMPLETING:
//		MACH_ST_COMPLETE:
		
		MACH_ST_BYPASSED:
		
		ELSE
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
		
	END_CASE	
	
	// Turn level commands to edges
	EdgePosArray(ADR(piperCommands), ADR(_piperCommands), ADR(task.command), SIZEOF(task.command));
	brsmemset(ADR(piperCommands), 0, SIZEOF(piperCommands));
	
END_ACTION