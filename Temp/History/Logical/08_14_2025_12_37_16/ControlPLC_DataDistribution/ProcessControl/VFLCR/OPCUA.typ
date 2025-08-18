
TYPE
	OPCUAData_FROM_Gen3CalibApp_typ : 	STRUCT 
		AppMajorVersion : USINT;
		AppMinorVersion : USINT;
		AppPatchVersion : USINT;
		ErrorNum : USINT; (*Calibration app error number*)
		HeartbeatIn : UINT; (*Heartbeat from the laser test application*)
		TestResult : USINT;
		ExampleResult : USINT;
		CalibrationInitialized : BOOL;
		PixelInitialized : BOOL;
		PixelCaptured : BOOL;
		PixelProcessed : BOOL;
		PixelResult : UDINT;
		CalibrationProcessed : BOOL;
		LUTsUploaded : BOOL;
		TestDataUploaded : BOOL;
		TestResultsDownloaded : BOOL;
		TestResultsParsed : BOOL;
		ErrorBucketNotExist : BOOL;
		ErrorS3Connection : BOOL;
		ErrorCaptureFailed : BOOL;
		ErrorFrameCaptureFailed : BOOL;
		MeasuredPower : REAL;
		CommandedPower : REAL;
		LaserTestStatus : USINT;
		Zaber1Position : REAL;
		Zaber2Position : REAL;
		Zaber1Homed : BOOL;
		Zaber2Homed : BOOL;
		MetaDataWriterReady : BOOL;
		TestAbortProcessed : BOOL;
		TestCompleteProcessed : BOOL;
		FrameCaptureInstanceResponse : UINT;
		BeamSpotXPosition : REAL;
		BeamSpotYPosition : REAL;
		NumberOfBeamSpots : UINT;
	END_STRUCT;
	OPCUAData_TO_Gen3CalibApp_typ : 	STRUCT 
		ExampleCommand : BOOL;
		InitializeCalibration : BOOL;
		InitializePixel : BOOL;
		CapturePixel : BOOL;
		CaptureFrame : BOOL;
		ProcessPixel : BOOL;
		ProcessCalibration : BOOL;
		CurrentPowerWatts : REAL;
		ActivePixel : UDINT; (*Pixel actively being tested*)
		UploadCalibratedLUTs : BOOL; (*Flag - Upload LUTs to the VFLCRs*)
		UploadLinearLUTs : BOOL; (*Flag - Upload LUTs to the VFLCRs*)
		UploadTestData : BOOL;
		DownloadTestResults : BOOL;
		ParseTestResults : BOOL;
		VFPMap : ARRAY[0..100,0..3]OF USINT;
		TestType : VFLCR_TEST_TYPE;
		LaserParameters : VFLCRManualPulseParameters_typ; (*Parameters from the laser test application to be fed into the manual pulse configuration structure on the printer*)
		HeartbeatOut : UINT; (*PLC to Laser test app heartbeat*)
		MachineName : STRING[40]; (*Name of the connected printer*)
		FactoryName : STRING[40]; (*Factory name of the connected printer*)
		CurrentLUTID : UDINT; (*Number of the laser calibration LUT currently active on the printer*)
		MachineIdentity : STRING[60]; (*[<factoryNumber>]<factoryName>:[<machineNumber>]<machineName>*)
		BuildLotID : STRING[60];
		Zaber1RelativePos_mm : REAL;
		Zaber1AbsolutePos_mm : REAL;
		Zaber2RelativePos_mm : REAL;
		Zaber2AbsolutePos_mm : REAL;
		Zaber1Home : BOOL;
		Zaber2Home : BOOL;
		Zaber1MoveRelative : BOOL;
		Zaber1MoveAbsolute : BOOL;
		Zaber2MoveRelative : BOOL;
		Zaber2MoveAbsolute : BOOL;
		Zaber1GetHomeStatus : BOOL;
		Zaber2GetHomeStatus : BOOL;
		Zaber1GetPosFeedback : BOOL;
		Zaber2GetPosFeedback : BOOL;
		CameraExposure : REAL;
		CaptureFrameInstance : UINT;
		ComPortNumberZaber1 : UINT;
		ComPortNumberZaber2 : UINT;
		PyroMultiplicationFactor : REAL;
		StartOMSTest : BOOL;
		OMSTestComplete : BOOL;
		OMSTestAborted : BOOL;
		ZOffset : UINT;
		ScrewDistance1_23 : UINT;
		ScrewDistance2_3 : UINT;
		DateOfExpiryOfCalibration : UINT;
		SOMSSerialNumber : UINT;
		LaserPulseComplete : BOOL;
	END_STRUCT;
	VFLCR_ManualLaserPulseConfig_typ : 	STRUCT  (*has to be converted - legacy type from old handshake*)
		pulseDelayMsec : UINT := 2000;
		pulseOnMsec : UINT := 30;
		pulseOffMsec : UINT := 70;
		numPulsesPerLevel : USINT := 5;
		availableLaserPowerWatts : UINT := 300;
		safePowerLimitWatts : UINT := 250;
		startingPowerLevel : UINT := 51;
		numPowerLevelSteps : USINT := 5;
		powerLevelIncrement : USINT := 25;
	END_STRUCT;
END_TYPE
