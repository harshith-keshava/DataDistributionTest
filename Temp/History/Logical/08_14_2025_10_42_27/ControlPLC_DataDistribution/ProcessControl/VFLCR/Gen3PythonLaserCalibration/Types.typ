
TYPE
	Configuration_typ : 	STRUCT 
		Exists : BOOL;
		ComPortNumberZaber1Hmi : UINT;
		PyroMultiplicationFactorHmi : REAL;
	END_STRUCT;
	DI_typ : 	STRUCT 
		_ : BOOL;
	END_STRUCT;
	DO_typ : 	STRUCT 
		_ : BOOL;
	END_STRUCT;
	IO_typ : 	STRUCT 
		do : DO_typ;
		di : DI_typ;
	END_STRUCT;
	localInterfaceCommand_typ : 	STRUCT 
		exampleCommand : BOOL;
		initializeCalibration : BOOL;
		initializePixel : BOOL;
		capturePixel : BOOL;
		processPixel : BOOL;
		processCalibration : BOOL;
		uploadLUTs : BOOL;
		abort : BOOL;
		uploadTestData : BOOL;
		downloadAndParseTestResults : BOOL;
		initializeOmsTestZaber2 : BOOL;
		initializeOmsTestZaber1 : BOOL;
		setZaber1Pos : BOOL;
		setZaber2PosAndExposure : BOOL;
		checkZaber2Homed : BOOL;
		checkZaber1Homed : BOOL;
		passRequiredMetaData : BOOL;
		passCompleteHandshake : BOOL;
		passAbortedHandshake : BOOL;
		captureFrame : BOOL;
		passAbortedHandshakeWithoutAck : BOOL;
		initializePixelForFrame : BOOL;
	END_STRUCT;
	localInterfaceInternal_typ : 	STRUCT 
		PLCOpen : AtnPlcOpenStatus;
		previousState : STATE;
		frameCaptured : BOOL;
		newCommand : BOOL;
		localLockout : BOOL;
		subSystemStatus : ARRAY[0..10]OF STRING[80];
		parameters : localInterfaceParameters_typ;
		missedHeartbeats : USINT;
		lastHeartbeatReceived : INT;
		calibAppNotConnected : BOOL;
		heartbeatTimer : TON;
		cmdTimeoutTimer : TON;
		cmdFrameCaptureTimer : TON;
		homeZaberWaitTimer : TON;
		moveZaberWaitTimer : TON;
		cmdZaberOnWaitTimer : TON;
		pollingAppWaitTimer : TON;
		resultsPollingTimer : TON;
		resultsTimeoutTimer : TON;
		atnPLCOpenCommandParameters : AtnPLCOpenWithParameters;
		atnPLCOpenCommand : AtnPLCOpen;
		measuredPowerList1 : ARRAY[0..100]OF REAL;
		measuredPowerList2 : ARRAY[0..100]OF REAL;
		measuredPowerList3 : ARRAY[0..100]OF REAL;
		measuredPowerList4 : ARRAY[0..100]OF REAL;
		measuredPowerList5 : ARRAY[0..100]OF REAL;
		measuredPowerList6 : ARRAY[0..100]OF REAL;
		measuredPowerList7 : ARRAY[0..100]OF REAL;
		measuredPowerList8 : ARRAY[0..100]OF REAL;
		CommandedPowerList1 : ARRAY[0..100]OF REAL;
		CommandedPowerList2 : ARRAY[0..100]OF REAL;
		CommandedPowerList3 : ARRAY[0..100]OF REAL;
		CommandedPowerList4 : ARRAY[0..100]OF REAL;
		CommandedPowerList5 : ARRAY[0..100]OF REAL;
		CommandedPowerList6 : ARRAY[0..100]OF REAL;
		CommandedPowerList7 : ARRAY[0..100]OF REAL;
		CommandedPowerList8 : ARRAY[0..100]OF REAL;
		LaserTestStatusList1 : ARRAY[0..100]OF STRING[10];
		LaserTestStatusList2 : ARRAY[0..100]OF STRING[10];
		LaserTestStatusList3 : ARRAY[0..100]OF STRING[10];
		LaserTestStatusList4 : ARRAY[0..100]OF STRING[10];
		LaserTestStatusList5 : ARRAY[0..100]OF STRING[10];
		LaserTestStatusList6 : ARRAY[0..100]OF STRING[10];
		LaserTestStatusList7 : ARRAY[0..100]OF STRING[10];
		LaserTestStatusList8 : ARRAY[0..100]OF STRING[10];
		currentPowerLevel : USINT;
		ii : USINT; (*loop variable*)
		appVersionTempString : STRING[5]; (*loop variable*)
	END_STRUCT;
	localInterfaceParameters_typ : 	STRUCT 
		uploadLUTs : VFLCRUploadLUTsCmdPars_typ;
		initializePixel : VFLCRInitializePixelCmdPars_typ;
		capturePixel : VFLCRDataCollectionCmdPars_typ;
		adjustZaber1 : VFLCRAdjustZaberAndExpoPars_typ;
		adjustZaber2AndExposure : VFLCRAdjustZaberAndExpoPars_typ;
		initializePixelForFrame : VFLCRInitializePixelCmdPars_typ;
	END_STRUCT;
	localInterfaceStatus_typ : 	STRUCT 
		ready : BOOL;
		state : STATE;
		sequence : SEQUENCE;
		calibAppConnected : BOOL;
		processingTestData : BOOL;
		resultsDownloaded : BOOL;
		statusMessage : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		strStatus : STRING[80];
		LutIdHmi : UDINT;
		AppVersion : STRING[10];
	END_STRUCT;
	localInterface_typ : 	STRUCT 
		command : localInterfaceCommand_typ;
		status : localInterfaceStatus_typ;
		internal : localInterfaceInternal_typ;
		parameters : localInterfaceParameters_typ;
	END_STRUCT;
	SEQUENCE : 
		(
		SEQUENCE_IDLE,
		SEQUENCE_DONE,
		SEQUENCE_ERROR,
		SEQUENCE_LUT_DELETE,
		SEQUENCE_LUT_FTP,
		SEQUENCE_LUT_TRANSFER,
		SEQUENCE_RESULTS_DOWNLOAD,
		SEQUENCE_RESULTS_PARSE,
		SEQUENCE_MOVE_ZABER2,
		SEQUENCE_MOVE_ZABER1,
		SEQUENCE_OMS_INIT,
		SEQUENCE_OMS_ABORTED,
		SEQUENCE_WAIT_FRAME_CAPTURE
		);
	TEST_MODE : 
		(
		TEST_MODE_CONTINUOUS,
		TEST_MODE_SEMI_AUTO
		);
	TEST_RESULT : 
		(
		TEST_RESULT_IN_PROGRESS,
		TEST_RESULT_PASSED,
		TEST_RESULT_HIGH_POWER_FAILURE,
		TEST_RESULT_LOW_POWER_FAILURE,
		TEST_RESULT_NO_POWER_FAILURE,
		TEST_RESULT_UNTESTED,
		TEST_RESULT_ABORTED := 10
		);
	STATE : 
		(
		STATE_NOT_READY,
		STATE_READY,
		STATE_DONE,
		STATE_ERROR,
		STATE_EXAMPLE_COMMAND,
		STATE_INITIALIZE_CALIBRATION,
		STATE_INITIALIZE_PIXEL,
		STATE_CAPTURE_PIXEL,
		STATE_PROCESS_PIXEL,
		STATE_PROCESS_CALIBRATION,
		STATE_UPLOAD_LUTS,
		STATE_UPLOAD_TEST_DATA,
		STATE_DOWNLOAD_PARSE_RESULTS,
		STATE_INITIALIZE_OMS_TEST_ZABER2,
		STATE_INITIALIZE_OMS_TEST_ZABER1,
		STATE_CHECK_ZABER2_HOMED,
		STATE_CHECK_ZABER1_HOMED,
		STATE_PASS_META_DATA,
		STATE_CAPTURE_FRAME,
		STATE_MOVE_ZABER2_CAM_EXPO,
		STATE_MOVE_ZABER1_CAM,
		STATE_PASS_TEST_COMPLETE,
		STATE_PASS_TEST_ABORTED,
		STATE_PASS_TEST_ABORTED_NO_ACK,
		STATE_INIT_PIXEL_FRAMECAPTURE
		);
END_TYPE
