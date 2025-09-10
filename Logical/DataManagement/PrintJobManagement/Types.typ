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
		parameters : PrintJobManagementParameters_typ;
		status : PrintJobManagementStatus_typ;
		events : PrintJobManagementEvents_typ;
		currentState : PrintJobManagementState_typ;
		alarms : PrintJobManagementAlarms_typ;
	END_STRUCT;
	PrintJobManagementCommands_typ : 	STRUCT 
		validatePrintFile : STRING[80];
		CheckReadyForPrinting : STRING[80];
		updateLayerNumber : STRING[80];
		notifyEndOfPrint : STRING[80];
		setBuildPlateThickness : STRING[80];
		setFocalOffset : STRING[80];
		setRecoaterOffset : STRING[80];
		resetPrintInfo : STRING[80];
		enableLOP : STRING[80];
		disableLOP : STRING[80];
		resetPlateType : STRING[80];
		setThicknessDOMS : STRING[80];
		clearThicknessDOMS : STRING[80];
		getAllLocalConfigData : STRING[80];
		calculateRemainingPrintTime : STRING[80];
	END_STRUCT;
	PrintJobManagementParameters_typ : 	STRUCT 
		buildPlateThickness_mm : REAL;
		focalOffset_mm : REAL;
		recoaterOffset_mm : REAL;
		disableScratchCoat : BOOL;
		thicknessDOMS_mm : REAL;
	END_STRUCT;
	PrintJobManagementStatus_typ : 	STRUCT 
		distributionLayerRecieved : BOOL;
		distributionLayerRequested : BOOL;
		buildInfoValid : STRING[80];
		buildInfoInvalid : STRING[80];
		distributionActive : BOOL;
		reprintLayerPermitted : BOOL;
		autoAdvanceEnabled : BOOL;
		currentLayerGCodeFilename : STRING[255];
		maxBPThickness : REAL;
		maxRecoaterOffset : REAL;
		inhibitScavenge : STRING[80];
		inhibitDryRun : STRING[80];
		inhibitLOP : STRING[80];
		inhibitIncrement : STRING[80];
		inhibitScrape : STRING[80];
		inhibitRecoat : STRING[80];
		inhibitPrint : STRING[80];
		inhibitMHopperRefill : STRING[80];
		MAX_DOMS_THICKNESS : REAL;
		loadHasStarted : BOOL;
		measuringScratchCoat : BOOL;
		remainingHoursLow : REAL;
		remainingHoursHigh : REAL;
		hoursElapsedInPrint : REAL;
		hoursBehindSchedule : REAL;
		updatedEstOfPrintEndTime : DATE_AND_TIME;
		doubleRecoatRatio : REAL;
		printStartTimeString : STRING[80];
		actualPrintTimeString : STRING[80];
		initialPrintTimeString : STRING[80];
		actualPrintDateTimeClean : STRING[80];
		initialPrintDateTimeClean : STRING[80];
		printStartDateTimeClean : STRING[80];
		actualPrintDateString : STRING[80];
		initialPrintDateString : STRING[80];
		printStartDateString : STRING[80];
		trajectoriesPerLayer : REAL;
		intraLayerCleansPerLayer : REAL;
		layerStatusString : STRING[20];
		availabilityDuringPrint : REAL;
		downTimeHours : REAL;
		downTimeBetweenLastTwoLayers : REAL;
		longestPauseString : STRING[40];
		longestPauseMinutes : STRING[20];
		lastLayerFloorHopper : REAL;
		lastLayerTotalPowder : REAL;
		totalPowderReqToFinish : REAL;
		totalPowderUsed : REAL;
		thisLayerTotalPowder : REAL;
	END_STRUCT;
	PrintJobManagementEvents_typ : 	STRUCT 
		newPrintJob : STRING[80];
		endPrintJob : STRING[80];
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
		buildPlatform : BuildPlatform_enum;
		buildPlatformName : STRING[20];
		buildVolumeExtents : BuildVolumeExtents_typ;
		currentPartHeight : REAL;
		currentLayerNumber : UINT;
		lastRecoatedLayerNumber : UINT;
		lastPrintedLayerNumber : UINT;
		newBuildInfoFileLoaded : BOOL;
		lastCompletedOperation : MACHINE_OPERATIONS_ENUM;
		buildIteration : UINT;
		cleanerEngagedToScoops : BOOL;
		pixelMapFileVersion : UINT;
		lopModeActive : BOOL;
		lastOpLoadComplete : BOOL;
		lastOpUnloadComplete : BOOL;
		buildPlateThickness : REAL;
		recoaterOffset : REAL;
		safetyEnables : UDINT;
		currentThetaX_mrad : LREAL;
		currentThetaY_mrad : LREAL;
		buildPlateHasBeenPrepared : BOOL;
		buildPlateRecoaterOffsetFound : BOOL;
		longPauseRecoveryReq : BOOL;
		podLoaded : BOOL;
		scratchCoatPassedVerification : BOOL;
		focalOffset : REAL;
		totalTrajectory : UDINT;
		lastKnowLift1Position : LREAL; (*checked on boot up to prevent perm mem/position problem*)
		lastKnowLift2Position : LREAL; (*checked on boot up to prevent perm mem/position problem*)
		lastKnowLift3Position : LREAL; (*checked on boot up to prevent perm mem/position problem*)
		opticsBoxType : USINT; (*Type- OB2 =2; OB3=3 and so forth*)
		plateType : STRING[80];
		domsPlateTypeLoaded : BOOL;
		domsHasBeenPrepared : BOOL;
		domsThickness : REAL;
		argonPurgeStartTime : DATE_AND_TIME;
		cameraCalDone : BOOL;
		lastKnownShuttlePosition : LREAL; (*checked on boot up to prevent perm mem/position problem*)
		lastKnownAirlockPosition : LREAL; (*checked on boot up to prevent perm mem/position problem*)
		printActive : BOOL; (*lase start of layer 1 to lasing complete of last layer or end of Unload if aborted *)
		lastDistributedLayer : UINT;
		vflcrsHaveBeenReferenced : BOOL;
		PCIFileFormatVersion : INT := 1;
		buildReport : PrintJobManagementReport_typ;
		hopperSwapAllowed : BOOL;
	END_STRUCT;
	PrintJobManagementAlarms_typ : 	STRUCT 
		components : vfAlarms_Component_typ;
		AGGREGATE_GENERAL_ALARM : vfAlarms_Instance_type;
		COMMAND_BEFORE_READY : vfAlarms_Instance_type;
		COMMAND_INHIBITED : vfAlarms_Instance_type;
		BuildInfoFileError_AL0020 : vfAlarms_Instance_type;
		PixelActiveOnIgnoredLaser_AL0021 : vfAlarms_Instance_type;
		Inhibited_AL0022 : vfAlarms_Instance_type;
		FileLoadError_AL0023 : vfAlarms_Instance_type;
		FileSaveError_AL0024 : vfAlarms_Instance_type;
		BuildInfoValidRequired_AL0025 : vfAlarms_Instance_type;
		InvalidCurrentLayer_AL0026 : vfAlarms_Instance_type;
		PrintingNotAllowed_AL0027 : vfAlarms_Instance_type;
		RecoatNotAllowed_AL0028 : vfAlarms_Instance_type;
		BPThicknessInvalid_AL0029 : vfAlarms_Instance_type;
		NotAllowedToEnterLopMode_AL0030 : vfAlarms_Instance_type;
		NotAllowedToResetPrint_AL0031 : vfAlarms_Instance_type;
		RecoaterOffsetInvalid_AL0032 : vfAlarms_Instance_type;
		InterlockDoorOpened_AL0033 : vfAlarms_Instance_type;
	END_STRUCT;
	New_Datatype : 	STRUCT 
	END_STRUCT;
	PrintJobManagementReport_typ : 	STRUCT 
		lastPrintStartTimeStamp : DATE_AND_TIME; (*Layer print start time *)
		lastEchainMaintDate : DATE_AND_TIME;
		echainMaintenanceTrajectory : UDINT;
		echainMaintTrajectoryOnReset : UDINT;
		lastGreasedTrajectory : UDINT;
		greaseMaintTrajectoryOnReset : UDINT;
		HerdingCleaningCount : USINT;
		HerdingPassivationCount : USINT;
		GasHeadCleanCount : INT;
		NumberOfMultiRecoatsPerLayer : INT;
		LayersInContModeSingleRecoat : INT;
		BuildSetupStartTime : STRING[25];
		BladeSpotCheckStatusPostPrint : USINT; (*0-No Data, 1- BladeInSpec, 2 - BladeOutOfSpec*)
		meteringHopperStartOfBuild : REAL;
		overheadHopperStartOfBuild : REAL;
		floorHopperStartOfBuild : REAL;
		secondsPrintingDuringPrint : UDINT;
		secondsRecoatingDuringPrint : UDINT;
		secondsPreparingDuringPrint : UDINT;
		secondsIdleDuringPrint : UDINT;
		secondsWaitingOpDuringPrint : UDINT;
		secondsUnavailableDuringPrint : UDINT;
		reclaimCollectedDuringPrint : REAL;
		layersInContinousModeDuringPrint : UINT;
		avgGasFlowDuringPrint : REAL;
		minGasFlowDuringPrint : REAL;
		maxGasFlowDuringPrint : REAL;
		avgO2PpmDuringPrint : REAL;
		avgPzPressureDuringPrint : REAL;
		totalLayerTimeInContinuousMode : TIME;
		totalPowderPerLayerInContMode : REAL;
		timeStartOfPrint : DATE_AND_TIME;
		timeEndOfPrint : DATE_AND_TIME;
		totalRecoatsDoneDuringPrint : UDINT;
		totalTrajectoriesDoneDuringPrint : UDINT;
		herdingWasteLevelStartOfPrint : REAL;
		minO2PpmDuringPrint : REAL;
		maxO2PpmDuringPrint : REAL;
		totalLayerTimeAutoMode1Recoat : TIME;
		totalPowderForScratchCoat : REAL;
		greaseDispensedOnUnload : BOOL;
		bladeAngle : REAL;
		bladeMaxErrPrePrint : REAL;
		bladeMaxErrPostPrint : REAL;
		totalRecoatSpeed : REAL;
		minRecoatSpeed : REAL;
		maxRecoatSpeed : REAL;
		avgElectrodeGainDuringPrint : REAL;
		totalLayersElectrodeGainUsed : INT;
		minRecoatGain : REAL;
		maxRecoatGain : REAL;
		avgInitialDispenseRotations : REAL;
		minRecoatInitDispense : REAL;
		maxRecoatInitDispense : REAL;
		timeElapsedInPrint : TIME;
		initialEstOfPrintDurationHrs : REAL;
		initialEstOfPrintEndTime : DATE_AND_TIME;
		timePrepareBpStart : STRING[25];
		timePrepareBpEnd : STRING[25];
		timeBladeSetupStart : STRING[25];
		timeBladeSetupEnd : STRING[25];
		timeCameraCalStart : STRING[25];
		timeCameraCalEnd : STRING[25];
		timeScratchCoatStart : STRING[25];
		timeScratchCoatEnd : STRING[25];
		longestPauseLayer : STRING[10];
		longestPauseHours : REAL;
		totalDowntimeAtLastLayerStart : REAL;
		totalPowderLoadedForPrint : REAL;
		plateFlatnessError : LREAL;
		plateFlatnessInSpec : BOOL;
		secondsSpentCooling : UDINT;
	END_STRUCT;
	PLATE_TYPE_ENUM : 
		(
		PLATE_TYPE_NONE,
		PLATE_TYPE_STANDARD,
		PLATE_TYPE_SUBPLATES,
		PLATE_TYPE_ATTUNE_7X11
		);
END_TYPE
