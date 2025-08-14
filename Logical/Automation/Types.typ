
TYPE
	MessageHandler_typ : 	STRUCT 
		msgId : BOOL;
		ok : BOOL;
		cancel : BOOL;
	END_STRUCT;
	SFCControlApi_type : 	STRUCT 
		command : SFCControlCommand_type;
		status : SFCControlStatus_type;
		inhibit : SFCControlInhibits_type;
		systems : STRING[80];
	END_STRUCT;
	SFCControlCommand_type : 	STRUCT 
		pause : STRING[80];
		unpause : STRING[80];
		reset : STRING[80];
	END_STRUCT;
	SFCControlStatus_type : 	STRUCT 
		sfc : STRING[80];
		sOMSModeActive : STRING[80];
		sOMSTestComplete : STRING[80];
	END_STRUCT;
	SFCControlInhibits_type : 	STRUCT 
		_ : STRING[80];
	END_STRUCT;
	SFCControlDataApi_type : {REDUND_UNREPLICABLE} 	STRUCT 
		pPause : REFERENCE TO BOOL;
		pBypass : REFERENCE TO BOOL;
		pTransition : REFERENCE TO BOOL;
		pSingleStep : REFERENCE TO BOOL;
	END_STRUCT;
	Automations_type : 	STRUCT 
		command : AutomationsCommand_type;
		status : AutomationsStatus_type;
	END_STRUCT;
	AutomationsCommand_type : 	STRUCT 
		recoat : STRING[80];
		scrape : STRING[80];
		refillHopper : STRING[80];
		printLayer : STRING[80];
		cleanGasHead : STRING[80];
		refillBuffer : STRING[80];
		refillOverheadHopper : STRING[80];
		initiateDoor : STRING[80];
		closeDoor : STRING[80];
		initiatePod : STRING[80];
	END_STRUCT;
	AutomationsStatus_type : 	STRUCT 
		autonomousModeActive : STRING[80];
	END_STRUCT;
	MODE_MACHINE_ENUM : 
		(
		MODE_MACHINE_AUTO,
		MODE_MACHINE_MANUAL_PROGRAM,
		MODE_MACHINE_MANUAL_JOG
		);
END_TYPE
