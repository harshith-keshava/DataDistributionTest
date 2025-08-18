
ACTION PiperModuleInterface: 
	
	//Give this module a name so it is easier to debug
	ModuleInterface.ModuleName:=	Name;

	//Add a module to the Piper
	Module.ModuleInterface:=	ADR(ModuleInterface);
	Module.Piper:= 	ADR(gMachine);
	Module();

	
	
	// Handle any machine states that this module needs to respond to
	CASE ModuleInterface.PiperState OF
//		MACH_ST_BOOTING:		
//		MACH_ST_CLEARING:
//		MACH_ST_STOPPED:
		MACH_ST_STARTING:
			
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			
			
//		MACH_ST_IDLE:
//		MACH_ST_SUSPENDED:
//		MACH_ST_EXECUTE:
		MACH_ST_STOPPING:
			IF task.status.ready THEN
				task.command.abort := TRUE;
			END_IF
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
		MACH_ST_ABORTING:
			IF task.status.ready THEN	
				task.command.abort := TRUE;
			END_IF	
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
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
	
	
	
	//for turning commands to edges to work with piper
	(*
	//Turn level commands to edges
	EdgePosArray( ADR(piperCommands), ADR(_piperCommands), ADR(task.command), SIZEOF(task.command) );
	brsmemset( ADR(piperCommands), 0, SIZEOF(piperCommands) );
	*)
	
	
END_ACTION