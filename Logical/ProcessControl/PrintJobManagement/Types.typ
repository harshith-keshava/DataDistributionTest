(*api for build distributor interface*)

TYPE
	BuildDistributor_typ : 	STRUCT 
		commands : BuildDistributorCommands_typ;
		status : BuildDistributorStatus_Typ;
		alarms : BuildDistributorAlarms_typ;
	END_STRUCT;
	BuildDistributorAlarms_typ : 	STRUCT 
		components : vfAlarms_Component_typ;
		BD_HEARTBEAT_LOST_AL : vfAlarms_Instance_type;
	END_STRUCT;
	BuildDistributorStatus_Typ : 	STRUCT 
		subsystemsReady : STRING[80];
		isConnected : STRING[80];
	END_STRUCT;
	BuildDistributorCommands_typ : 	STRUCT 
		distributeLayerFile : STRING[80];
		startDistribution : STRING[80];
		abortDistribution : STRING[80];
	END_STRUCT;
END_TYPE

(*api for print job management interface*)

TYPE
	PrintJobManagement_typ : 	STRUCT 
		commands : PrintJobManagementCommands_typ;
		status : PrintJobManagementStatus_typ;
		currentState : PrintJobManagementState_typ;
		alarms : PrintJobManagementAlarms_typ;
	END_STRUCT;
	PrintJobManagementCommands_typ : 	STRUCT 
		validatePrintFile : STRING[80];
		updateLayerNumber : STRING[80];
		resetPrintInfo : STRING[80];
	END_STRUCT;
	PrintJobManagementStatus_typ : 	STRUCT 
		distributionLayerRecieved : BOOL;
		distributionLayerRequested : BOOL;
		buildInfoValid : STRING[80];
		buildInfoInvalid : STRING[80];
		distributionActive : BOOL;
	END_STRUCT;
	PrintJobManagementState_typ : 	STRUCT 
		baseFilename : STRING[20];
		description : STRING[80];
		author : STRING[40];
		printOwner : STRING[40];
		buildInstanceID : STRING[40];
		configEditorBranch : STRING[20];
		configEditorVersion : STRING[20];
		rasterEngineBranch : STRING[20];
		rasterEngineVersion : STRING[20];
		buildLayout : UDINT;
		printNumber : UINT;
		numberOfLayers : UINT;
		currentLayerNumber : UINT;
		lastRecoatedLayerNumber : UINT;
		lastPrintedLayerNumber : UINT;
		newBuildInfoFileLoaded : BOOL;
		lastDistributedLayer : UINT;
	END_STRUCT;
	PrintJobManagementAlarms_typ : 	STRUCT 
		FileLoadError_AL0023 : vfAlarms_Instance_type;
		FileSaveError_AL0024 : vfAlarms_Instance_type;
		BuildInfoValidRequired_AL0025 : vfAlarms_Instance_type;
	END_STRUCT;
END_TYPE
