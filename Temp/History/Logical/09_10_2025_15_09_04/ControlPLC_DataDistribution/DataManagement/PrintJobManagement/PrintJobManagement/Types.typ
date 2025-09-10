
TYPE
	test_typ : 	STRUCT 
		command : testCommand_typ;
	END_STRUCT;
	testCommand_typ : 	STRUCT 
		induceCurrentLayerToEleven : BOOL;
		assertDOMS : BOOL;
		assertRegularPlate : BOOL;
	END_STRUCT;
	Configuration_typ : 	STRUCT 
		BUILD_PLATE_THICKNESS_MAX_MM : REAL;
		BLADE_OFFSET_MAX_MM : REAL;
		FOCAL_OFFSET_MAX_MM : REAL;
		FOCAL_OFFSET_MIN_MM : REAL;
		FOCAL_OFFSET_MM : REAL;
		OPTICS_BOX_REVISION : USINT;
		BLADE_OFFSET_MM : REAL;
		ENCODER_TICK_WIDTH : REAL;
		MAX_LASER_COUNT : UINT;
		LASER_LINE_ANGLE : REAL;
		HEAD_CENTER_OFFSET : REAL;
		LASER_SPACING : REAL;
		MIN_LASER_WATTS : REAL;
		MAX_LASER_WATTS : REAL;
	END_STRUCT;
	IO_typ : 	STRUCT 
		_ : USINT;
	END_STRUCT;
	localInterface_typ : 	STRUCT 
		command : localInterfaceCommand_typ;
		parameters : localInterfaceParameter_typ;
		status : localInterfaceStatus_typ;
		internal : localInterfaceInternal_typ;
	END_STRUCT;
	localInterfaceCommand_typ : 	STRUCT 
		updateCurrentLayer : BOOL;
		validatePrintFile : BOOL;
		checkReadyForPrinting : BOOL;
		resetLayerNumberToZero : BOOL;
		restartAtSpecifiedLayer : BOOL;
		setBuildPlateThickness : BOOL;
		setFocalOffset : BOOL;
		publishConfigurationData : BOOL;
		setRecoaterOffset : BOOL;
		resetPrintInfo : BOOL;
		bladeOffsetClr : BOOL;
		bladeOffsetPlusTen : BOOL;
		bladeOffsetMinusTen : BOOL;
		setThicknessDOMS : BOOL;
		clearThicknessDOMS : BOOL;
		resetPlateType : BOOL;
		enableLOP : BOOL;
		disableLOP : BOOL;
		calculateRemainingPrintTime : BOOL;
		coolingDelay : BOOL;
	END_STRUCT;
	localInterfaceParameter_typ : 	STRUCT 
		layerToDistribute : UINT;
		printJobLayer : UINT;
		startingLayerNumber : UDINT;
		laseOnPlateLayerNumber : UINT;
		buildPlateThickness_mm : REAL;
		focalOffset_mm : REAL;
		recoaterOffset_mm : REAL;
		thicknessDOMS_mm : REAL;
	END_STRUCT;
	localInterfaceInternal_typ : 	STRUCT 
		PLCOpenConfigData : AtnPlcOpenStatus;
		PLCOpen : AtnPlcOpenStatus;
		checkPixelUsage : AtnPLCOpen;
		parameters : PrintJobManagementParameters_typ;
		previousState : STATE;
		newCommand : BOOL;
		localLockout : BOOL;
		subSystemStatus : ARRAY[0..10]OF STRING[80];
		remapPixels : AtnPLCOpen;
		_lopModeActive : BOOL;
		strBpPreparedStatus : STRING[80];
		strRecoaterOffsetStatus : STRING[80];
		strBuildPlateLoadStatus : STRING[80];
		_focalOffset : REAL;
		_bladeOffset : REAL;
		_plateThickness : REAL;
		triggerDataCapture : BOOL;
		triggerParDataCapture : BOOL;
		_processParEvent : StatusChangeOfProcessParams_typ;
		printTimeCalc : printTimeCalc_typ;
		coolingDelayTimer : TON;
		powderConsumptionAverage : REAL;
		powderConsumptionSum : REAL;
		powderConsumption5Layers : ARRAY[0..4]OF REAL;
		remainingCoolingDelayS : UDINT;
	END_STRUCT;
	localInterfaceStatus_typ : 	STRUCT 
		currentLayerGCodeFilename : STRING[255];
		recoaterOffsetInvalid : BOOL;
		focalOffset : REAL;
		recoaterOffset : REAL;
		buildPlateThicknessInvalid : BOOL;
		buildPlateThickness : REAL;
		buildInfoValid : BOOL;
		buildInfoNotInvalid : BOOL;
		buildInfoError : BOOL;
		distributionTimeout : BOOL;
		finishedRecoat : BOOL;
		finishedPrepareNextLayer : BOOL;
		finishedPrint : BOOL;
		laseOnPlateActive : BOOL;
		buildInfoErrorSnippet : STRING[80];
		enableAutoAdvance : BOOL;
		buildInfoErrorStatus : ARRAY[0..19]OF STRING[80];
		ready : BOOL;
		sequence : SEQUENCE;
		statusMessage : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		state : STATE;
		inhibitRecoatReasons : inhibitRecoatReasons_typ;
		inhibitPrintReasons : inhibitPrintReasons_typ;
		buildInfoInvalidReasons : buildInfoInvalidReasons_typ;
		inhibitPrint : BOOL;
		inhibitRecoatStatus : ARRAY[0..19]OF STRING[80];
		inhibitLOPStatus : ARRAY[0..19]OF STRING[80];
		inhibitPrintStatus : ARRAY[0..19]OF STRING[80];
		inhibitIncrement : BOOL;
		inhibitRecoat : BOOL;
		inhibitMHopperRefillReasons : inhibitMHopperRefill_typ;
		laserText : STRING[20];
		pumpText : STRING[20];
		startDistributionAllowed : BOOL;
		thicknessDOMS : REAL;
		inhibitLOP : BOOL;
	END_STRUCT;
	inhibitMHopperRefill_typ : 	STRUCT 
		overheadHopperRefillActive : BOOL;
		oxygenLevelsNotOK : BOOL;
	END_STRUCT;
	SEQUENCE : 
		(
		SEQUENCE_IDLE,
		SEQUENCE_DONE,
		SEQUENCE_ERROR,
		SEQUENCE_READ_BUILD_INFO,
		SEQUENCE_CHECK_PIXEL_USAGE,
		SEQUENCE_DO_PIXEL_MAP,
		SEQUENCE_CHECK_LASERS,
		SEQUENCE_CHECK_PUMPS,
		SEQUENCE_CHECK_O2_LEVELS,
		SEQUENCE_CHECK_PNEUMATIC_SUPPLY,
		SEQUENCE_CHECK_AXES_STATE,
		SEQUENCE_CHECK_RECOATER_POS,
		SEQUENCE_CHECK_LIFT_POS,
		SEQUENCE_CHECK_LAYER_NUMBER,
		SEQUENCE_CHECK_CAMERA,
		SEQUENCE_ASK_IF_OK_TO_RESET,
		SEQUENCE_CLEAR_DATA,
		SEQUENCE_ABORT_DISTRIBUTION
		);
	STATE : 
		(
		STATE_READY,
		STATE_NOT_READY,
		STATE_CHECKING_PRINT_READY,
		STATE_UPDATE_LAYER_NUMBER,
		STATE_VALIDATING_BUILD_INFO,
		STATE_SET_BUILD_PLATE_THICKNESS,
		STATE_COOLING_DELAY,
		STATE_SET_FOCAL_OFFSET,
		STATE_SET_DOMS_THICKNESS,
		STATE_SET_RECOATER_OFFSET,
		STATE_RESETTING_PRINT_INFO,
		STATE_ERROR
		);
	inhibitRecoatReasons_typ : 	STRUCT 
		layerNumberNotOK : BOOL;
		oxygenLevelsNotOK : BOOL;
		pnuematicSupplyNotOK : BOOL;
		chillerNotReady : BOOL;
		axesNotOK : BOOL;
		gantryXNotInSafeArea : BOOL;
		meteringHopperNotOK : BOOL;
		visionNotOK : BOOL;
		LopModeActive : BOOL;
		pumpsNotRunning : BOOL;
		longPauseRecoveryReq : BOOL;
		buildPlateNotPresent : BOOL;
	END_STRUCT;
	inhibitPrintReasons_typ : 	STRUCT 
		layerNumberNotOK : BOOL;
		oxygenLevelsNotSafeToLase : BOOL;
		oxygenLevelsNotOK : BOOL;
		pumpsNotRunningAtSetFreq : BOOL;
		pumpsNotRunningAtSetFlow : BOOL;
		pnuematicSupplyNotOK : BOOL;
		lasersNotReadyDryRun : BOOL;
		lasersNotReady : BOOL;
		chillerNotReady : BOOL;
		axesNotOK : BOOL;
		recoaterNotAtPark : BOOL;
		liftNotAtCurrentLayer : BOOL;
		buildInfoNotValid : BOOL;
		bladeOffsetNotFound : BOOL;
		buildPlateNotPrepared : BOOL;
		distributionNotOk : BOOL;
		scratchCoatNotVerified : BOOL;
		longPauseRecoveryReq : BOOL;
	END_STRUCT;
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
	printTimeCalc_typ : 	STRUCT 
		intraLayerGasheadCleansRemaining : UINT;
		trajectoriesRemaining : UDINT;
		recoatsRemainingMin : UINT;
		recoatsRemainingMax : UINT;
		remainingPrintTimeHigh : REAL;
		remainingPrintTimeLow : REAL;
		layersRemaining : UINT;
	END_STRUCT;
END_TYPE
