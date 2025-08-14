(*
This is a template for the SFC types
*)

TYPE
	Configuration_typ : 	STRUCT 
		errorAborts : BOOL;
	END_STRUCT;
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
		activeOperation : STRING[80];
		activeStep : USINT;
		statusMessage : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		statusID : UDINT;
		subSystemStatus : ARRAY[0..9]OF STRING[80];
		ready : BOOL;
		ErrorState : STRING[80];
	END_STRUCT;
	localInterfaceInternal_typ : 	STRUCT 
		PLCOpen : AtnPlcOpenStatus;
		newCommand : BOOL;
	END_STRUCT;
END_TYPE
