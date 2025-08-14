
TYPE
	Configuration_typ : 	STRUCT 
		errorAborts : BOOL;
		zaber2HeightArray : ARRAY[0..10]OF REAL;
		zaber2HeightCameraExpoArray : ARRAY[0..10]OF REAL;
		zaber1Position : REAL;
		zaber2StepIndexSize_mm : REAL;
	END_STRUCT;
	localInterface_typ : 	STRUCT 
		status : localInterfaceStatus_typ;
		command : localInterfaceCommand_typ;
		internal : localInterfaceInternal_typ;
	END_STRUCT;
	localInterfaceCommand_typ : 	STRUCT 
		stop : BOOL;
		_ : BOOL;
	END_STRUCT;
	localInterfaceStatus_typ : 	STRUCT 
		activeOperation : STRING[80];
		activeStep : STRING[80];
		statusMessage : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		subSystemStatus : ARRAY[0..9]OF STRING[80];
		ready : BOOL;
		ErrorState : STRING[80];
		statusID : UDINT;
		allPixelsMapped : BOOL;
		manualPulseConfigOk : BOOL;
	END_STRUCT;
	localInterfaceInternal_typ : 	STRUCT 
		PLCOpen : AtnPlcOpenStatus;
		newCommand : BOOL;
		manualPulse : VFLCRManualPulseRackPars_typ;
		adjustZaber2AndCamera : VFLCRAdjustZaberAndExpoPars_typ;
		adjustZaber1 : VFLCRAdjustZaberAndExpoPars_typ;
		activePixelIndex : USINT;
		activeZaber1Index : USINT;
		activeZaber2Index : USINT;
		currentPixel : USINT;
		currentZaber1Height : USINT;
		currentZaber2Height : USINT;
		initializePixelParameters : VFLCRInitializePixelCmdPars_typ;
		uploadLUTParameters : VFLCRUploadLUTsCmdPars_typ;
		pixelMappingTestType : BOOL;
		calibrationTestType : BOOL;
		dirtyVerificationTestType : BOOL;
		cleanVerificationTestType : BOOL;
		lowPowerTestType : BOOL;
		highPowerTestType : BOOL;
		somsTestType : BOOL;
		_PixelMappingTestType : BOOL;
		_CalibrationTestType : BOOL;
		_DirtyVerificationTestType : BOOL;
		_CleanVerificationTestType : BOOL;
		_LowPowerTestType : BOOL;
		_HighPowerTestType : BOOL;
		_somsTestType : BOOL;
		failedImageCaptureRetry : USINT;
		laserIndex : USINT;
		laserNumber : USINT;
		totalZaberIndex : USINT;
		actualPixelMapIndex : USINT;
		pixelPassed : BOOL;
		rackIndex : USINT;
		rackNumber : USINT;
		cancelPopUp : BOOL;
		continuePopUp : BOOL;
		pausePopUp : BOOL;
		showPopUp : BOOL;
		showNextPixel : BOOL;
		showErrorMessage : BOOL;
		clearListPixelNumber : USINT;
		pixelLoopNumber : USINT;
		showSkipPixel : BOOL;
		numOfRetries : USINT;
		captureFrameTimer : TON;
		continuousModeStopTimer : TON;
		continuousModeTimer : TON;
	END_STRUCT;
END_TYPE
