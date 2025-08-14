
TYPE
	Configuration_typ : 	STRUCT 
		enableManualContinuousMode : BOOL;
		manualPulse : VFLCRManualPulseParameters_typ;
		manualPulseTestType : ARRAY[0..MAI_VFLCR_TEST_TYPE]OF VFLCRManualPulseParameters_typ;
	END_STRUCT;
	localInterface_typ : 	STRUCT 
		command : localInterfaceCommand_typ;
		parameters : localInterfaceParameter_typ;
		status : localInterfaceStatus_typ;
		internal : localInterfaceInternal_typ;
	END_STRUCT;
	localInterfaceCommand_typ : 	STRUCT 
		enableAllLaserFunctions : BOOL;
		enableDCPower : BOOL;
		enableLaserPower : BOOL;
		enableLaserEmission : BOOL;
		disableDCPower : BOOL;
		disableLaserPower : BOOL;
		disableLaserEmission : BOOL;
		resetAllErrors : BOOL;
		initializeCalibration : BOOL;
		initializeManualCalibration : BOOL;
		manualPulse : BOOL;
		manualPulseAbort : BOOL;
		enableAutoMode : BOOL;
		enableManualMode : BOOL;
		openLayer : BOOL;
		abortLayer : BOOL;
		restoreManualPulsePars : BOOL;
		stopContinuousPulse : BOOL;
		startContinuousPulse : BOOL;
		closePopup : BOOL;
		confirmReboot : BOOL;
		rebootPLC : BOOL;
	END_STRUCT;
	localInterfaceParameter_typ : 	STRUCT 
		manualPulseRackNumber : USINT;
		manualPulseLaserNumber : USINT;
		openLayer : VFLCROpenLayerCommandPars_typ;
		testType : VFLCR_TEST_TYPE;
	END_STRUCT;
	POWER_SEQUENCE : 
		(
		SEQUENCE_READY,
		SEQUENCE_ENABLING_DC_POWER,
		SEQUENCE_ENABLING_LASER_EMISSION,
		SEQUENCE_ENABLING_LASER_POWER,
		SEQUENCE_ENABLING_LASER_MOD,
		SEQUENCE_FAILED
		);
	localInterfaceStatus_typ : 	STRUCT 
		cycleOKFailCount_PLK2 : UINT;
		syncOKFailCount_PLK2 : UINT;
		plkErrorDetected : BOOL;
		error : BOOL;
		errorStatus : ARRAY[0..19]OF STRING[80];
		commandDone : BOOL;
		manualPulseActive : BOOL;
		manualPulseStatus : LaserManualPulseStatus_typ;
		manualPulseCalculations : LaserManualPulseCalculated_typ;
		autoModeEnabled : BOOL;
		manualModeEnabled : BOOL;
		powerSequence : POWER_SEQUENCE;
		statusMessage : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		racksOnline : BOOL;
	END_STRUCT;
	LaserManualPulseCalculated_typ : 	STRUCT 
		pixelNumber : UINT;
		startingPowerWatts : REAL;
		powerIncrementWatts : REAL;
		endingPowerWatts : REAL;
		endingPowerHigh : REAL;
	END_STRUCT;
	localInterfaceInternal_typ : 	STRUCT 
		atnSystemCommand : AtnPLCOpen;
		enableLaserPowerSequenceCommand : AtnPLCOpen;
		openLayerCommand : AtnPLCOpenWithParameters;
		manualPulseCommand : AtnPLCOpenWithParameters;
		manualPulseAbortCommand : AtnPLCOpenWithParameters;
		laserPowerSequenceResponse : AtnPlcOpenStatus;
		initializeDataCollectionCommand : AtnPLCOpenWithParameters;
		initializeDataCollectionResponse : AtnPlcOpenStatus;
		PLCOpen : AtnPlcOpenStatus;
		dataCollectionParameters : VFLCRDataCollectionCmdPars_typ;
		manualPulseResponse : AtnPlcOpenStatus;
		manualPulseParameters : VFLCRManualPulseCommandPars_typ;
		hmiCommandStatus : vflcrSystemCommandStatus_typ;
		timeout : TON;
		initializeCalibrationParameters : VFLCRInitCalibrationPars_typ;
		calibrationConfigParOk : BOOL;
		currentLaserPulsePars : VFLCRManualPulseParameters_typ;
		updateManualPulsePars : BOOL;
		newLaserPulsePars : VFLCRManualPulseParameters_typ;
		matchingLUT : BOOL;
		defaultLUT : BOOL;
		notLUT : BOOL;
		totalNumberOfLasers : USINT := 50;
		rebootPLC : BOOL;
	END_STRUCT;
	IO_typ : 	STRUCT 
		di : IODI_typ;
	END_STRUCT;
	IODI_typ : 	STRUCT 
		cycleOK_PLK2 : BOOL;
		syncOK_PLK2 : BOOL;
	END_STRUCT;
	vflcrSystemCommandStatus_typ : 	STRUCT 
		enableDCPower : commandStatus_typ;
		enableLaserPower : commandStatus_typ;
		enableLaserEmission : commandStatus_typ;
		enableLaserFullSequence : commandStatus_typ;
	END_STRUCT;
	commandStatus_typ : 	STRUCT 
		busy : BOOL;
		idle : BOOL;
	END_STRUCT;
END_TYPE
