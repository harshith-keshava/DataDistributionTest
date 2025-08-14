
TYPE
	localInterface_typ : 	STRUCT 
		command : localInterfaceCommand_typ;
		parameters : localInterfaceParameter_typ;
		status : localInterfaceStatus_typ;
		internal : localInterfaceInternal_typ;
	END_STRUCT;
	localInterfaceCommand_typ : 	STRUCT 
		openLayer : BOOL;
		abortLayer : BOOL;
	END_STRUCT;
	localInterfaceParameter_typ : 	STRUCT 
		openLayer : VFLCROpenLayerCommandPars_typ;
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
		PLCOpen : AtnPlcOpenStatus;
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
