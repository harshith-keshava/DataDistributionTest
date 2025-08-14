
TYPE
	VFLCRApi_typ : 	STRUCT 
		command : VFLCRApiCommand_typ;
		status : VFLCRApiStatus_typ;
		inhibit : VFLCRApiInhibit_typ;
		IO : VFLCRApiIO_typ;
		alarm : VFLCRApiAlarm_typ;
	END_STRUCT;
	VFLCRApiParameter_typ : 	STRUCT 
		manualPulse : VFLCRManualPulseParameters_typ;
	END_STRUCT;
	VFLCRApiCommand_typ : 	STRUCT 
		enableLaserPowerSequence : STRING[80];
		laserRackRemap : STRING[80];
		forceMappingDone : STRING[80];
		checkActivePixels : STRING[80];
		enableModulation : STRING[80];
		disableModulation : STRING[80];
		enableDCPower : STRING[80];
		disableDCPower : STRING[80];
		enableLaserPower : STRING[80];
		disableLaserPower : STRING[80];
		enableLaserEmission : STRING[80];
		disableLaserEmission : STRING[80];
		resetHardwareError : STRING[80];
		resetAllErrors : STRING[80];
		enableAutoMode : STRING[80];
		enableManualMode : STRING[80];
		openLayer : STRING[80];
		abortLayer : STRING[80];
		resetSoftwareError : STRING[80];
		deleteLaserControlFiles : STRING[80];
		deleteLUTFiles : STRING[80];
		transferLUTFiles : STRING[80];
		checkPixelOk : STRING[80];
		checkMotionOk : STRING[80];
		manualPulse : STRING[80];
		manualPulseRack : STRING[80];
		manualPulseAbort : STRING[80];
		triggerDataCollection : STRING[80];
		initializeDataCollection : STRING[80];
		initializeCalibration : STRING[80];
		initializeManualCalibration : STRING[80];
		initializePixel : STRING[80];
		initializePixelForFrame : STRING[80];
		processPixel : STRING[80];
		processCalibration : STRING[80];
		uploadLUTs : STRING[80];
		uploadTestData : STRING[80];
		initializeOmsTestZaber1 : STRING[80];
		initializeOmsTestZaber2 : STRING[80];
		setZaber2PosAndExposure : STRING[80];
		setZaber1Pos : STRING[80];
		checkZaber2Homed : STRING[80];
		checkZaber1Homed : STRING[80];
		passRequiredMetaData : STRING[80];
		passCompleteHandshake : STRING[80];
		passAbortedHandshake : STRING[80];
		captureFrame : STRING[80];
		stopPulse : STRING[80];
		startPulse : STRING[80];
		passAbortedHandshakeWithoutAck : STRING[80];
	END_STRUCT;
	VFLCRApiStatus_typ : 	STRUCT 
		remapEnabled : STRING[80];
		pixelMappingHeaderInfo : STRING[80];
		counterResetEnabled : STRING[80];
		modulationEnabled : STRING[80];
		userModulationEnabled : STRING[80];
		encoderXSelected : STRING[80];
		prepareTrajectory : STRING[80];
		error : STRING[80];
		subSystemsReady : STRING[80];
		rackIgnored : STRING[80];
		laserSafetyEnabled : STRING[80];
		laserEmissionEnabled : STRING[80];
		laserPowerEnabled : STRING[80];
		dcPowerEnabled : STRING[80];
		remapActive : STRING[80];
		remapAlarmActive : STRING[80];
		pixelMapped : STRING[80];
		manualPulseActive : STRING[80];
		OMSModeEnabled : STRING[80];
		autoModeEnabled : STRING[80];
		manualModeEnabled : STRING[80];
		invalidPixelUsage : STRING[80];
		readyToPrint : STRING[80];
		layerOpen : STRING[80];
		rackOnline : STRING[80];
		usingGen3LaserCalibrationApp : STRING[80];
		heartbeatLaserCalibrationAppOk : STRING[80];
		calibrationConfigParOk : STRING[80];
		pythonOpcuaControlEnabled : BOOL;
		vfpMap : ARRAY[0..100,0..3]OF USINT;
		calibrationLUT : ARRAY[0..3]OF UDINT; (*9999 Lut Loaded*)
		mismatchedLUTs : BOOL; (*luts match*)
		defaultLUT : BOOL;
		versionZeroLUT : BOOL;
		laserModulationEnabled : BOOL;
		frameCaptured : BOOL;
		manualContinuousModeEnabled : BOOL;
		MaxNumberOfPixelsUsed : USINT;
	END_STRUCT;
	VFLCRApiInhibit_typ : 	STRUCT 
		laserRackRemap : STRING[80];
		modulation : STRING[80];
		autoModulation : STRING[80];
		dcPower : STRING[80];
		laserPower : STRING[80];
		laserEmission : STRING[80];
		manualPulse : STRING[80];
	END_STRUCT;
	VFLCR_LaserHardware_enum : 
		(
		LH_undefined,
		LH_Raycus_300W,
		LH_nLight_525W
		);
	VFLCRApiIO_typ : 	STRUCT 
		rack : STRING[80];
	END_STRUCT;
	VFLCRApiAlarm_typ : 	STRUCT 
		components : vfAlarms_Component_typ;
		AGGREGATE_GENERAL_ALARM : vfAlarms_Instance_type;
		AGGREGATE_HARDWARE_ALARM : vfAlarms_Instance_type;
		AGGREGATE_SOFTWARE_ALARM : vfAlarms_Instance_type;
		AGGREGATE_PIXELMAPPING_ALARM : vfAlarms_Instance_type;
		AGGREGATE_CALIBAPP_ALARM : vfAlarms_Instance_type;
		VFLCR_HW_HEARTBEAT_ERROR_AL9100 : vfAlarms_Instance_type;
		VFLCR_HW_HARDWARE_ERROR_AL9103 : vfAlarms_Instance_type;
		VFLCR_HW_SUPPLY_FAN_FAIL_AL9104 : vfAlarms_Instance_type;
		VFLCR_HW_SUPPLY_OVERTEMP_AL9105 : vfAlarms_Instance_type;
		VFLCR_HW_SUPPLY_AC_LOW_AL9106 : vfAlarms_Instance_type;
		VFLCR_HW_SUPPLY_DC_FAIL_AL9107 : vfAlarms_Instance_type;
		VFLCR_HW_CONTROL_POWER_AL9108 : vfAlarms_Instance_type;
		VFLCR_HW_LASER_READY_FAIL_AL9109 : vfAlarms_Instance_type;
		VFLCR_HW_LASER_MAIN_POWER_AL9110 : vfAlarms_Instance_type;
		VFLCR_HW_LASER_EMISSION_AL9111 : vfAlarms_Instance_type;
		VFLCR_HW_LASER_FATAL_AL9112 : vfAlarms_Instance_type;
		VFLCR_HW_LASER_WATCHDOG_AL9113 : vfAlarms_Instance_type;
		VFLCR_HW_POWERLINK_ERROR_AL9114 : vfAlarms_Instance_type;
		VFLCR_SW_VERSION_MISMATCH_AL9200 : vfAlarms_Instance_type;
		VFLCR_SW_ID_MISMATCH_AL9201 : vfAlarms_Instance_type;
		VFLCR_SW_LUT_LOAD_FAIL_AL9202 : vfAlarms_Instance_type;
		VFLCR_SW_MAP_UNDEFINED_AL9203 : vfAlarms_Instance_type;
		VFLCR_SW_SYSTEM_ERROR_AL9204 : vfAlarms_Instance_type;
		VFLCR_SW_TRAJECTORY_ERROR_AL9205 : vfAlarms_Instance_type;
		VFLCR_SW_PRINT_NOT_READY_AL9206 : vfAlarms_Instance_type;
		VFLCR_SW_COMMAND_INHIBIT_AL9207 : vfAlarms_Instance_type;
		VFLCR_PM_FILE_NOT_FOUND_AL9300 : vfAlarms_Instance_type;
		VFLCR_PM_PATH_NOT_FOUND_AL9301 : vfAlarms_Instance_type;
		VFLCR_PM_FILE_OPEN_ERROR_AL9302 : vfAlarms_Instance_type;
		VFLCR_PM_FILE_CLOSE_ERROR_AL9303 : vfAlarms_Instance_type;
		VFLCR_PM_FILE_READ_ERROR_AL9304 : vfAlarms_Instance_type;
		VFLCR_PM_FILE_DATA_ERROR_AL9305 : vfAlarms_Instance_type;
		VFLCR_PM_VERSION_CONFLICT_AL9306 : vfAlarms_Instance_type;
		VFLCR_PM_IGNORED_PIXEL_AL9307 : vfAlarms_Instance_type;
		VFLCR_PM_RANGE_EXCEEDED_AL9308 : vfAlarms_Instance_type;
		VFLCR_APP_HEARTBEAT_ERROR_AL9400 : vfAlarms_Instance_type;
		VFLCR_APP_COMMAND_TIMEOUT_AL9401 : vfAlarms_Instance_type;
		VFLCR_APP_CMD_B4_READY_AL9402 : vfAlarms_Instance_type;
		VFLCR_APP_RESULTS_TIMEOUT_AL9403 : vfAlarms_Instance_type;
		VFLCR_APP_BUCKET_MISSING_AL9404 : vfAlarms_Instance_type;
		VFLCR_APP_S3_CONNECTION_AL9405 : vfAlarms_Instance_type;
		VFLCR_APP_CAPTURE_FAILED_AL9406 : vfAlarms_Instance_type;
		VFLCR_DISABLE_CHILLER_RUN_AL9208 : vfAlarms_Instance_type;
		VFLCR_DISABLE_OB_FLOW_LOW_AL9209 : vfAlarms_Instance_type;
		PIXEL_ENABLE_MISMATCH_AL9309 : vfAlarms_Instance_type;
		VFLCR_VERIFY_INHIBIT_AL9210 : vfAlarms_Instance_type;
	END_STRUCT;
	VFLCROpenLayerCommandPars_typ : 	STRUCT 
		parameters : VFLCROpenLayerParameters_typ;
	END_STRUCT;
	VFLCROpenLayerRackPars_typ : 	STRUCT 
		Rack : USINT;
	END_STRUCT;
	VFLCROpenLayerParameters_typ : 	STRUCT 
		selectedBuildLayout : UDINT;
		selectedPrintNumber : UINT;
		selectedLayer : UDINT;
	END_STRUCT;
	VFLCRInitializePixelCmdPars_typ : 	STRUCT 
		activePixelIndex : USINT;
	END_STRUCT;
	VFLCRInitCalibrationPars_typ : 	STRUCT 
		testType : VFLCR_TEST_TYPE;
	END_STRUCT;
	VFLCRUploadLUTsCmdPars_typ : 	STRUCT 
		Calibrated : BOOL;
	END_STRUCT;
	VFLCRAdjustZaberAndExpoPars_typ : 	STRUCT 
		ZaberRelativePos_mm : REAL;
		ZaberAbsolutePos_mm : REAL;
		ZaberHome : BOOL;
		ZaberMoveRelative : BOOL;
		ZaberMoveAbsolute : BOOL;
		CameraExposure : REAL;
	END_STRUCT;
	VFLCRDataCollectionCmdPars_typ : 	STRUCT 
		TestType : VFLCR_TEST_TYPE;
		CurrentPowerWatts : REAL;
		LaserParameters : VFLCRManualPulseParameters_typ;
		ActivePixel : USINT;
	END_STRUCT;
	VFLCRManualPulseCommandPars_typ : 	STRUCT 
		selection : VFLCRManualPulseRackPars_typ;
		parameters : VFLCRManualPulseParameters_typ;
	END_STRUCT;
	VFLCRManualPulseParameters_typ : 	STRUCT 
		safePowerLimit_W : REAL;
		availableLaserPower_W : REAL;
		startingPowerLevel : UINT;
		numPowerLevels : USINT;
		powerIncrementPerStep : USINT;
		numPulsesPerLevel : USINT;
		pulseOnTime_ms : UINT;
		pulseDelayTime_ms : UDINT;
		pulseOffTime_ms : UDINT;
	END_STRUCT;
	VFLCRManualPulseRackPars_typ : 	STRUCT 
		Rack : USINT;
		Laser : USINT;
	END_STRUCT;
	LaserManualPulseStatus_typ : 	STRUCT 
		rackNumber : USINT;
		laserNumber : USINT;
		pixelNumber : USINT;
		numPulses : UINT;
		currentPowerLevel : UINT;
		safePowerLevel : UINT;
		maxFeedbackPower_W : UINT;
		currentStep : UINT;
		currentPower_W : REAL;
		feedbackPower_W : UINT;
	END_STRUCT;
	LaserSnippets_typ : 	STRUCT 
		rackNumber : USINT;
		laserNumber : USINT;
		pixelNumber : USINT;
		supplyNumber : USINT;
		additionalInfoLaserFatal : STRING[160];
	END_STRUCT;
	VFLCR_TEST_TYPE : 
		(
		VFLCR_TEST_TYPE_PIXEL_MAPPING,
		VFLCR_TEST_TYPE_CALIBRATION,
		VFLCR_TEST_TYPE_VERIFY_CLEAN,
		VFLCR_TEST_TYPE_VERIFY_DIRTY,
		VFLCR_TEST_TYPE_LOW_POWER_CHECK,
		VFLCR_TEST_TYPE_SOMS,
		VFLCR_TEST_TYPE_HIGH_POWER,
		END_OF_VFLCR_TEST_TYPE
		);
END_TYPE
