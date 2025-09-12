
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
	END_STRUCT;
	localInterfaceInternal_typ : 	STRUCT 
		PLCOpenConfigData : AtnPlcOpenStatus;
		PLCOpen : AtnPlcOpenStatus;
		checkPixelUsage : AtnPLCOpen;
		previousState : STATE;
		newCommand : BOOL;
		localLockout : BOOL;
		subSystemStatus : ARRAY[0..10]OF STRING[80];
		remapPixels : AtnPLCOpen;
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
		buildInfoErrorStatus : ARRAY[0..19]OF STRING[80];
		ready : BOOL;
		sequence : SEQUENCE;
		statusMessage : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		state : STATE;
		buildInfoInvalidReasons : buildInfoInvalidReasons_typ;
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
