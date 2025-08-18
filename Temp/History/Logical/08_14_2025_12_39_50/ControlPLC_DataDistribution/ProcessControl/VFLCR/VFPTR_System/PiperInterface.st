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
	ModuleInterface.ModuleName:=	'VFPTR_System';

	//Add a module to the Piper
	Module.ModuleInterface:=	ADR(ModuleInterface);
	Module.Piper:= 	ADR(gMachine);
	Module();

	// Set machine mode optional actions
	piperDisableModulation := FALSE;
	CASE gMachineModeApi.status.activeMode OF
		
		MACHINE_MODE_MAINTENANCE:
			piperDisableModulation := TRUE;
			
		MACHINE_MODE_SETUP:
			piperDisableModulation := TRUE;
			
		MACHINE_MODE_PRODUCTION:
			piperDisableModulation := TRUE;
			
		ELSE
			
	END_CASE;
	
	// Handle any machine states that this module needs to respond to
	CASE ModuleInterface.PiperState OF
//		MACH_ST_BOOTING:		
//		MACH_ST_CLEARING:
//		MACH_ST_STOPPED:
//		MACH_ST_STARTING:
//		MACH_ST_IDLE:
//		MACH_ST_SUSPENDED:
//		MACH_ST_EXECUTE
		
		MACH_ST_STOPPING:
				
			piperCommands.disableModulation := TRUE;
			ModuleInterface.ModuleResponse := ModuleInterface.PiperState;

			
		MACH_ST_ABORTING:
			piperCommands.disableModulation := TRUE;
			ModuleInterface.ModuleResponse := ModuleInterface.PiperState;
			
//		MACH_ST_ABORTED:
//		MACH_ST_HOLDING:
//		MACH_ST_HELD:
//		MACH_ST_UNHOLDING:
//		MACH_ST_SUSPENDING:
//		MACH_ST_UNSUSPENDING:
		MACH_ST_RESETTING:
			piperCommands.enableModulation := TRUE;
			ModuleInterface.ModuleResponse := ModuleInterface.PiperState;
			
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