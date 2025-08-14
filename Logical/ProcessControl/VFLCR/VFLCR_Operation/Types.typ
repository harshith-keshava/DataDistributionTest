
TYPE
	Configuration_typ : 	STRUCT 
		rackIndex : USINT;
	END_STRUCT;
	LaserOperation_typ : 	STRUCT 
		command : LaserOperationCommand_typ;
		parameters : LaserOperationParameter_typ;
		status : LaserOperationStatus_typ;
		internal : LaserOperationInternal_typ;
	END_STRUCT;
	LaserOperationCommand_typ : 	STRUCT 
		openLayer : BOOL;
		abortLayer : BOOL;
		deleteLaserControlFiles : BOOL;
	END_STRUCT;
	LaserOperationParameter_typ : 	STRUCT 
		openLayerParameters : VFLCROpenLayerParameters_typ;
	END_STRUCT;
	LaserOperationStatus_typ : 	STRUCT 
		ready : BOOL;
		state : STATE;
		sequence : SEQUENCE;
		layerOpen : BOOL;
	END_STRUCT;
	LaserOperationInternal_typ : 	STRUCT 
		localLockout : BOOL;
		newCommand : BOOL;
		previousState : STATE;
		PLCOpenAbortLayer : AtnPlcOpenStatus;
		PLCOpenDeleteLaserControlFiles : AtnPlcOpenStatus;
		PLCOpenOpenLayer : AtnPlcOpenStatus;
		abortLayerTON : TON;
		resetSoftwareErrorTON : TON;
		deleteLaserControlFilesTON : TON;
		openLayerCommandParameters : VFLCROpenLayerCommandPars_typ;
		openLayerTON : TON;
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
		STATE_READY
		);
	SEQUENCE : 
		(
		SEQUENCE_IDLE,
		SEQUENCE_ERROR,
		SEQUENCE_DONE
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
		PoweLinkModuleOK : BOOL;
		LaserControlFiles_Deleted : BOOL;
		LayerOpen : BOOL;
		LayerAborted : BOOL;
		LayerClosed : BOOL;
		LayerError : BOOL;
	END_STRUCT;
	LaserIODO_typ : 	STRUCT 
		Delete_LaserControlFiles : BOOL; (*OperationControl.1*)
		Transfer_LaserControlFiles : BOOL; (*OperationControl.3*)
		OpenLayer : BOOL; (*OperationControl.8*)
		AbortLayer : BOOL; (*OperationControl.9*)
	END_STRUCT;
	LaserIOAI_typ : 	STRUCT 
		SystemHeartbeat : UDINT; (*Heartbeat from the VF-LCR*)
		FPGAVersion : UINT;
		FPGARevision : UINT;
		SoftwareVersion : UINT;
		SoftwareRevision : UINT;
		LUTFiles_CalibrationID : UDINT;
		SelectedLaser_DMAStatus : UDINT;
		SelectedLaser_DMATrajectory : UDINT;
		SelectedLaser_DMALastPacket : UDINT;
	END_STRUCT;
	LaserIOAO_typ : 	STRUCT 
		PLCHeartbeat : UDINT;
		SelectedBuildLayout : UDINT;
		SelectedPrintNumber : UDINT;
		SelectedLayerNumber : UDINT;
		StartingTrajectoryNumber : UDINT;
	END_STRUCT;
END_TYPE
