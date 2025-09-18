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
	BuildPlatform_enum : 
		(
		PLATFORM_UNKNOWN := 0,
		PLATFORM_SMALL_200x600 := 1,
		PLATFORM_MEDIUM_400x600 := 2,
		PLATFORM_LARGE_600x600 := 3
		);
END_TYPE

(*api for print job management interface*)

TYPE
	PrintJobManagement_typ : 	STRUCT 
		commands : PrintJobManagementCommands_typ;
		status : PrintJobManagementStatus_typ;
		currentState : PrintJobManagementState_typ;
	END_STRUCT;
	PrintJobManagementCommands_typ : 	STRUCT 
		validatePrintFile : STRING[80];
		updateLayerNumber : STRING[80];
		resetPrintInfo : STRING[80];
		enableLOP : STRING[80];
		disableLOP : STRING[80];
	END_STRUCT;
	PrintJobManagementStatus_typ : 	STRUCT 
		distributionLayerRecieved : BOOL;
		distributionLayerRequested : BOOL;
		loadPCIFileComplete : BOOL;
		distributionLayerComplete : BOOL;
		buildInfoValidCheck : BOOL;
		buildInfoValid : STRING[80];
		currentLayerGCodeFilename : STRING[255];
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
		layerHeight : REAL;
		encoderTickWidth : REAL;
		maxLaserCount : UINT;
		laserLineAngle : REAL;
		headCenterOffset : REAL;
		laserSpacing : REAL;
		minLaserWatts : REAL;
		maxLaserWatts : REAL;
		buildPlatformName : STRING[20];
		currentPartHeight : REAL;
		nextLayerNumber : UINT;
		currentLayerNumber : UINT;
		lastRecoatedLayerNumber : UINT;
		lastPrintedLayerNumber : UINT;
		buildInfoCheckValid : BOOL;
		newBuildInfoFileLoaded : BOOL;
		buildIteration : UINT;
		cleanerEngagedToScoops : BOOL;
		pixelMapFileVersion : UINT;
		lastDistributedLayer : UINT;
	END_STRUCT;
END_TYPE
