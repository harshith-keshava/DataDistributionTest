
TYPE
	testCommand_typ : 	STRUCT 
		enableEmission : BOOL;
		enableOutput : BOOL;
		enableDC : BOOL;
		initLaserState : BOOL;
		initSystemState : BOOL;
		initOperationalState : BOOL;
		induceHeartbeatError : BOOL;
		inducePowerSupplyError : BOOL;
		induceFanError : BOOL;
		induceLowACVoltageError : BOOL;
		inducePowerSupplyTempError : BOOL;
		induceInvalidLUT : BOOL;
		induceIgnoredPixel : BOOL;
	END_STRUCT;
	test_typ : 	STRUCT 
		command : testCommand_typ;
	END_STRUCT;
	Configuration_typ : 	STRUCT 
		rackIndex : USINT;
		ignoreRack : BOOL;
		ignoreLaser : ARRAY[0..VFLCR_MAI_LASERS]OF BOOL;
		ignoreSupply : ARRAY[0..VFLCR_MAI_POWER_SUPPLIES]OF BOOL;
		laserHardware : VFLCR_LaserHardware_enum;
	END_STRUCT;
	LaserOperation_typ : 	STRUCT 
		command : LaserOperationCommand_typ;
		parameters : LaserOperationParameter_typ;
		status : LaserOperationStatus_typ;
		inhibit : LaserOperationInhibit_typ;
		CMM : LaserIOContinuousManual_typ;
		internal : LaserOperationInternal_typ;
	END_STRUCT;
	LaserOperationCommand_typ : 	STRUCT 
		enableDCPower : BOOL;
		disableDCPower : BOOL;
		enableLaserPower : BOOL;
		disableLaserPower : BOOL;
		enableLaserEmission : BOOL;
		disableLaserEmission : BOOL;
		resetHardwareError : BOOL;
		startManualPulse : BOOL;
		startManualPulseRack : BOOL;
		abortManualPulse : BOOL;
		checkActivePixels : BOOL;
		enableAutoMode : BOOL;
		enableManualMode : BOOL;
		openLayer : BOOL;
		abortLayer : BOOL;
		resetSoftwareError : BOOL;
		deleteLaserControlFiles : BOOL;
		deleteLUTFiles : BOOL;
		stopPulse : BOOL;
		startPulse : BOOL;
		transferLUTFiles : BOOL;
	END_STRUCT;
	LaserOperationParameter_typ : 	STRUCT 
		SelectedLaserIndex : USINT;
		openLayerParameters : VFLCROpenLayerParameters_typ;
		manualPulseParameters : VFLCRManualPulseParameters_typ; (*data collection also takes the manual pulse parameters*)
	END_STRUCT;
	LaserOperationStatus_typ : 	STRUCT 
		ready : BOOL;
		state : STATE;
		sequence : SEQUENCE;
		laserSafetyEnabled : BOOL;
		dcPowerEnabled : BOOL;
		laserPowerEnabled : BOOL;
		laserEmissionEnabled : BOOL;
		powerSupplyError : BOOL;
		laserWatchdogError : BOOL;
		laserHardwareError : BOOL;
		laserFatalError : BOOL;
		error : BOOL;
		alarmLaserRack : USINT;
		rackIgnored : BOOL;
		commsOK : BOOL;
		commsError : BOOL;
		rackAvailable : BOOL;
		layerOpen : BOOL;
		readyToPrint : BOOL;
		manualPulseActive : BOOL;
		OMSModeEnabled : BOOL;
		autoModeEnabled : BOOL;
		manualModeEnabled : BOOL;
		invalidPixelUsage : BOOL;
		coolingRequired : BOOL;
		pixelNumber : ARRAY[0..MACHINE_MAI_LASERS_PER_RACK]OF USINT;
		pixelInUse : ARRAY[0..MACHINE_MAI_LASERS_PER_RACK]OF USINT;
		message : STRING[80];
		manualPulseStatus : LaserManualPulseStatus_typ;
		chillerIsRunning : BOOL;
		opticsBoxFlowLow : BOOL;
	END_STRUCT;
	LaserOperationInhibit_typ : 	STRUCT 
		dcPower : BOOL;
		laserPower : BOOL;
		laserEmission : BOOL;
	END_STRUCT;
	LaserOperationInternal_typ : 	STRUCT 
		localLockout : BOOL;
		newCommand : BOOL;
		previousState : STATE;
		PLCOpenEnableDCPower : AtnPlcOpenStatus;
		PLCOpenDisableDCPower : AtnPlcOpenStatus;
		PLCOpenEnableLaserPower : AtnPlcOpenStatus;
		PLCOpenDisableLaserPower : AtnPlcOpenStatus;
		PLCOpenEnableLaserEmission : AtnPlcOpenStatus;
		PLCOpenDisableLaserEmission : AtnPlcOpenStatus;
		PLCOpenPixelCheck : AtnPlcOpenStatus;
		PLCOpenManualPulse : AtnPlcOpenStatus;
		PLCOpenEnableAutoMode : AtnPlcOpenStatus;
		PLCOpenEnableManualMode : AtnPlcOpenStatus;
		PLCOpenAbortLayer : AtnPlcOpenStatus;
		PLCOpenResetSoftwareError : AtnPlcOpenStatus;
		PLCOpenLoadLUT : AtnPlcOpenStatus;
		PLCOpenDeleteLaserControlFiles : AtnPlcOpenStatus;
		PLCOpenDeleteLUTFiles : AtnPlcOpenStatus;
		PLCOpenOpenLayer : AtnPlcOpenStatus;
		PLCOpenStartPulse : AtnPlcOpenStatus;
		PLCOpenStopPulse : AtnPlcOpenStatus;
		PLCOpenResetHardwareError : AtnPlcOpenStatus;
		delayTON : TON;
		enableManualModeTON : TON;
		enableAutoModeTON : TON;
		abortLayerTON : TON;
		resetSoftwareErrorTON : TON;
		transferLUTFilesTON : TON;
		deleteLaserControlFilesTON : TON;
		deleteLUTFilesTON : TON;
		openLayerTON : TON;
		systemHearbeatPrevious : UDINT;
		disableDCCondition : BOOL;
		disableLaserCondition : BOOL;
		_disableDCCondition : BOOL;
		_disableLaserCondition : BOOL;
		pulseFub : VF_COMMON_PulseTrainHiRes;
		triggerDataCollection : AtnPLCOpenWithParameters;
		triggerFrameDataCollection : AtnPLCOpen;
		dataCollectionParameters : VFLCRDataCollectionCmdPars_typ;
		parameters : LaserOperationParameter_typ;
		powerSupplyNotOKCount : ARRAY[0..VFLCR_MAI_POWER_SUPPLIES]OF USINT;
		openLayerCommandParameters : VFLCROpenLayerCommandPars_typ;
		manualPulseCommandParameters : VFLCRManualPulseCommandPars_typ;
		alarmText : STRING[80];
		numberOfPixelsInMap : USINT;
		o2Unsafe : BOOL;
		alarmID : LaserOperationAlarmID_typ;
		enabledLasersOK : BOOL;
		enabledLasersNotOK : BOOL;
		pixelWithIssueStr : STRING[20];
		pixelWithIssue : USINT;
		_enabledLasersOK : BOOL;
		MAI_LASERS_IN_THIS_RACK : USINT;
	END_STRUCT;
	LaserOperationAlarmID_typ : 	STRUCT 
		AL9100 : UDINT;
		AL9104 : UDINT;
		AL9105 : UDINT;
		AL9106 : UDINT;
		AL9107 : UDINT;
		AL9109 : UDINT;
		AL9110 : UDINT;
		AL9111 : UDINT;
		AL9112 : UDINT;
		AL9113 : UDINT;
		AL9202 : UDINT;
	END_STRUCT;
	STATE : 
		(
		STATE_NOT_READY,
		STATE_READY,
		STATE_DISABLE_DC_POWER,
		STATE_DISABLE_LASER_POWER,
		STATE_DISABLE_LASER_EMISSION,
		STATE_RESET_ERROR,
		STATE_ENABLE_DC_POWER,
		STATE_ENABLE_LASER_POWER,
		STATE_ENABLE_LASER_EMISSION,
		STATE_STOP_PULSE,
		STATE_START_PULSE,
		STATE_MANUAL_PULSE
		);
	SEQUENCE : 
		(
		SEQUENCE_IDLE,
		SEQUENCE_ERROR,
		SEQUENCE_DONE,
		SEQUENCE_ENABLE_DC_POWER_START,
		SEQUENCE_ENABLE_DC_POWER_CHECK,
		SEQUENCE_ENABLE_LASERS_START,
		SEQUENCE_ENABLE_LASERS_STATUS,
		SEQUENCE_MANUAL_PULSE_TRIGGER,
		SEQUENCE_MANUAL_PULSE_PULSE,
		SEQUENCE_MANUAL_PULSE_RESPONSE,
		SEQUENCE_MANUAL_PULSE_INCREMENT
		);
	LaserIO_typ : 	STRUCT 
		di : LaserIODI_typ;
		do : LaserIODO_typ;
		ai : LaserIOAI_typ;
		ao : LaserIOAO_typ;
		raw : LaserIORaw_typ; (*IO that gets converted to/from meaningful vars above.*)
	END_STRUCT;
	LaserIORaw_typ : 	STRUCT 
		iFPGARevision : UDINT;
		iSoftwareRevision : UDINT;
		iSystemStatus : UDINT;
		iOperationStatus : UDINT;
		iLaserReady_Error : UDINT;
		iLaserControlPowerEnabled : UDINT;
		iLaserMainPowerEnabled : UDINT;
		iLaserEmissionEnabled : UDINT;
		iLaserFatalError : UDINT;
		iLaserWatchdogError : UDINT;
		iManualModeLaserPower : UDINT;
		oSystemControl : UDINT;
		oOperationControl : UDINT;
		oLaserEnable : UDINT;
		oEnableLaserMainPower : UDINT;
		oEnableGuideLaser : UDINT;
		oEnableLaserEmission : UDINT;
		oResetLaserErrors : UDINT;
		oManualLaserCurrentSetpoint : UDINT;
		oIndirectRegisterRequestAddress : UDINT; (*target address for write to VFLCR*)
		oIndirectRegisterRequestData : UDINT; (*data from target address for write to VFLCR*)
		iIndirectRegisterResponseAddress : UDINT; (*read the requested address from VFLCR*)
		iIndirectRegisterResponseData : UDINT; (*read the data from the requested address from VFLCR*)
		oManualLaserOperation : UDINT;
	END_STRUCT;
	LaserIODI_typ : 	STRUCT 
		LaserSafetyInterlockOK : BOOL;
		HeartbeatError : ARRAY[0..3]OF BOOL;
		LaserControlSystemPowered : ARRAY[0..VFLCR_MAI_LASERS]OF BOOL;
		LaserFatalError : ARRAY[0..VFLCR_MAI_LASERS]OF BOOL;
		LaserWatchdogError : ARRAY[0..VFLCR_MAI_LASERS]OF BOOL;
		LaserReady : ARRAY[0..VFLCR_MAI_LASERS]OF BOOL;
		LaserEmissionOn : ARRAY[0..VFLCR_MAI_LASERS]OF BOOL;
		LaserMainPowerStarted : ARRAY[0..VFLCR_MAI_LASERS]OF BOOL;
		LaserPowerSupplyDCOK : ARRAY[0..VFLCR_MAI_POWER_SUPPLIES]OF BOOL;
		LaserPowerSupplyOverTemp : ARRAY[0..VFLCR_MAI_POWER_SUPPLIES]OF BOOL;
		LaserPowerSupplyFanFailure : ARRAY[0..VFLCR_MAI_POWER_SUPPLIES]OF BOOL;
		LaserPowerSupplyACLow : ARRAY[0..VFLCR_MAI_POWER_SUPPLIES]OF BOOL;
		LUTFiles_Deleted : BOOL;
		LaserControlFiles_Deleted : BOOL;
		LUTFiles_LoadSuccess : BOOL;
		LUTFiles_LoadFailure : BOOL;
		ModeEnabled_MANUAL : BOOL;
		ModeEnabled_AUTO : BOOL;
		LayerOpen : BOOL;
		LayerAborted : BOOL;
		LayerClosed : BOOL;
		LayerError : BOOL;
		SystemWatchdogFailure : BOOL;
		SystemOperational : BOOL;
		PowerlinkModuleOK : BOOL;
	END_STRUCT;
	LaserIODO_typ : 	STRUCT 
		LaserPowerSupply : ARRAY[0..VFLCR_MAI_POWER_SUPPLIES]OF BOOL;
		EnableLaserPower : ARRAY[0..VFLCR_MAI_LASERS]OF BOOL;
		EnableGuideLaser : ARRAY[0..VFLCR_MAI_LASERS]OF BOOL;
		EnableLaserEmissionControl : ARRAY[0..VFLCR_MAI_LASERS]OF BOOL;
		LaserResetError : ARRAY[0..VFLCR_MAI_LASERS]OF BOOL;
		Delete_LUTFiles : BOOL; (*OperationControl.0*)
		Delete_LaserControlFiles : BOOL; (*OperationControl.1*)
		Transfer_LUTFiles : BOOL; (*OperationControl.2*)
		Transfer_LaserControlFiles : BOOL; (*OperationControl.3*)
		EnableMode_MANUAL : BOOL; (*OperationControl.6; NOT(OperationControl.7)*)
		OpenLayer : BOOL; (*OperationControl.8*)
		AbortLayer : BOOL; (*OperationControl.9*)
		ClearLaserErrors : BOOL; (*OperationControl.13*)
		Transfer_FirmwareUpdate : BOOL; (*OperationControl.14*)
		RequestSystemReboot : BOOL; (*OperationControl.15*)
		ManualPulseLength : UINT;
		ManualPulseTrigger : UDINT;
		ManualPulseLaserNumber : USINT;
		PyrometerShutterOpen : BOOL;
		PyrometerShutterClose : BOOL;
	END_STRUCT;
	LaserIOAI_typ : 	STRUCT 
		LaserPowerMonitor : ARRAY[0..VFLCR_MAI_LASERS]OF UINT;
		SystemHeartbeat : UDINT; (*Heartbeat from the VF-LCR*)
		FPGAVersion : UINT;
		FPGARevision : UINT;
		SoftwareVersion : UINT;
		SoftwareRevision : UINT;
		LUTFiles_CalibrationID : UDINT;
		DMAStatus : ARRAY[0..VFLCR_MAI_LASERS]OF UDINT;
		DMACurrentTrajectory : ARRAY[0..VFLCR_MAI_LASERS]OF UDINT;
		DMALastPacketPosition : ARRAY[0..VFLCR_MAI_LASERS]OF UDINT;
		SelectedLaser_DMAStatus : UDINT;
		SelectedLaser_DMATrajectory : UDINT;
		SelectedLaser_DMALastPacket : UDINT;
	END_STRUCT;
	LaserIOAO_typ : 	STRUCT 
		LaserPowerLevelSP : ARRAY[0..VFLCR_MAI_LASERS]OF UINT;
		PLCHeartbeat : UDINT;
		SelectedBuildLayout : UDINT;
		SelectedPrintNumber : UDINT;
		SelectedLayerNumber : UDINT;
		StartingTrajectoryNumber : UDINT;
	END_STRUCT;
	CONTINUOUS_MANUAL_STATE_ONOFF : 
		(
		CMM_ONOFF_STATE_IDLE,
		CMM_ONOFF_STATE_ON,
		CMM_ONOFF_CAPTURE,
		CMM_ONOFF_STATE_OFF
		);
	CONTINUOUS_MANUAL_MODE_STATE : 
		(
		CMM_STATE_IDLE,
		CMM_STATE_CHECK_LASER_COUNT,
		CMM_STATE_COPY_ADDRESS,
		CMM_STATE_WRITE_PARAMETER,
		CMM_STATE_VERIFY_PARAMETER,
		CMM_STATE_DONE_WRITE
		);
	LaserIOContinuousManual_typ : 	STRUCT 
		STOP_PULSE : BOOL;
		START_PULSE : BOOL;
		allContinuousPeriodSet : BOOL;
		pulseContinuously : BOOL;
		pulseTimer : TON;
		laserManualContinuousPeriodAdr : ARRAY[0..VFLCR_MAI_LASERS]OF UDINT;
		requestedContinuousPeriod : ARRAY[0..VFLCR_MAI_LASERS]OF UDINT;
		actualContinuousPeriod : ARRAY[0..VFLCR_MAI_LASERS]OF UDINT;
		setContinuousPeriod : BOOL;
		STATE : CONTINUOUS_MANUAL_MODE_STATE;
		STATE_ON_OFF : CONTINUOUS_MANUAL_STATE_ONOFF;
		WATCHDOG_ERROR : BOOL;
		DUTY_CYCLE_ALL_LASERS : UINT;
		MANUAL_LASER_LUT_INDEX : UINT;
		captureTimer : TON;
		responseTimeout : TON;
		pulseTimerOnOFF : TON;
		overTempTimer : TON;
		captureImageTimer : TON;
		command : AtnPLCOpen;
	END_STRUCT;
END_TYPE
