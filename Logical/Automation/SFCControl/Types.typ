
TYPE
	localInterface_typ : 	STRUCT 
		command : localInterfaceCommand_typ;
		parameters : localInterfaceParameter_typ;
		status : localInterfaceStatus_typ;
		internal : localInterfaceInternal_typ;
	END_STRUCT;
	localInterfaceCommand_typ : 	STRUCT 
		stop : BOOL;
		_ : BOOL;
	END_STRUCT;
	localInterfaceParameter_typ : 	STRUCT 
		_ : USINT;
	END_STRUCT;
	localInterfaceStatus_typ : 	STRUCT 
		ErrorState : STRING[80];
		paused : BOOL;
	END_STRUCT;
	localInterfaceInternal_typ : 	STRUCT 
		PLCOpen : AtnPlcOpenStatus;
		unpause : AtnPLCOpen;
		reset : AtnPLCOpen;
	END_STRUCT;
END_TYPE
