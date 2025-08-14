
TYPE
	localInterface_typ : 	STRUCT 
		command : localInterfaceCommand_typ;
		parameters : localInterfaceParameter_typ;
		status : localInterfaceStatus_typ;
		internal : localInterfaceInternal_typ;
	END_STRUCT;
	localInterfaceCommand_typ : 	STRUCT 
		updateCurrentLayer : BOOL;
		validatePrintFile : BOOL;
		resetPrintInfo : BOOL;
	END_STRUCT;
	localInterfaceParameter_typ : 	STRUCT 
		layerToDistribute : UINT;
		printJobLayer : UINT;
		startingLayerNumber : UDINT;
	END_STRUCT;
	localInterfaceInternal_typ : 	STRUCT 
		PLCOpenConfigData : AtnPlcOpenStatus;
		PLCOpen : AtnPlcOpenStatus;
		localLockout : BOOL;
		newCommand : BOOL;
	END_STRUCT;
	localInterfaceStatus_typ : 	STRUCT 
		currentLayerGCodeFilename : STRING[255];
		buildInfoValid : BOOL;
		buildInfoNotInvalid : BOOL;
		buildInfoError : BOOL;
		ready : BOOL;
		distributionTimeout : BOOL;
		buildInfoErrorSnippet : STRING[80];
		buildInfoErrorStatus : ARRAY[0..19]OF STRING[80];
		buildInfoInvalidReasons : buildInfoInvalidReasons_typ;
		sequence : SEQUENCE;
		statusMessage : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		state : STATE;
	END_STRUCT;
	SEQUENCE : 
		(
		SEQUENCE_IDLE,
		SEQUENCE_DONE,
		SEQUENCE_ERROR,
		SEQUENCE_READ_BUILD_INFO,
		SEQUENCE_CHECK_LAYER_NUMBER,
		SEQUENCE_CLEAR_DATA,
		SEQUENCE_ABORT_DISTRIBUTION
		);
	STATE : 
		(
		STATE_READY,
		STATE_NOT_READY,
		STATE_UPDATE_LAYER_NUMBER,
		STATE_VALIDATING_BUILD_INFO,
		STATE_RESETTING_PRINT_INFO,
		STATE_ERROR
		);
	buildInfoInvalidReasons_typ : 	STRUCT 
		invalidPixelUsage : BOOL;
		invalidPixelMapVersion : BOOL;
		invalidMachineName : BOOL;
		invalidPlatformID : BOOL;
		invalidLayerHeight : BOOL;
		invalidNumLayers : BOOL;
		invalidBuildName : BOOL;
		invalidToolpath : BOOL;
		invalidWorkspace : BOOL;
		invalidPlateOrigin : BOOL;
		invalidPrintConfigInstruction : BOOL;
	END_STRUCT;
END_TYPE
