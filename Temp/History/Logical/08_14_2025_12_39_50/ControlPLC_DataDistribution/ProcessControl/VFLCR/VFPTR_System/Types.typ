
TYPE
	Configuration_typ : 	STRUCT 
		minLagToBeginTrajectory : REAL;
		minLagStdDev : REAL;
		lagMovingAvgWindowLength : UINT;
		disableLagCheck : BOOL;
	END_STRUCT;
	localInterface_typ : 	STRUCT 
		command : localInterfaceCommand_typ;
		status : localInterfaceStatus_typ;
		internal : localInterfaceInternal_typ;
	END_STRUCT;
	localInterfaceCommand_typ : 	STRUCT 
		enableModulation : BOOL;
		disableModulation : BOOL;
		beginTrajectoryX : BOOL;
		beginTrajectoryY : BOOL;
		endTrajectory : BOOL;
		pulseCounterReset : BOOL;
	END_STRUCT;
	localInterfaceStatus_typ : 	STRUCT 
		ready : BOOL;
		state : STATE;
		sequence : SEQUENCE;
		userModulationEnabled : BOOL;
		modulationEnabled : BOOL;
		counterResetEnabled : BOOL;
		encoderXSelected : BOOL;
		prepareTrajectory : BOOL;
	END_STRUCT;
	localInterfaceInternal_typ : 	STRUCT 
		PLCOpenEnableModulation : AtnPlcOpenStatus;
		PLCOpenDisableModulation : AtnPlcOpenStatus;
		PLCOpenTrajectory : AtnPlcOpenStatus;
		PLCOpenCounterReset : AtnPlcOpenStatus;
		manualModeEnabled : BOOL;
		laserEmissionEnabled : BOOL;
		setLeadX : BOOL;
		modulationInhibited : BOOL;
		newCommand : BOOL;
		lagErrorStatistics : ARRAY[0..MONITOR_AXIS_MAI]OF MTDataStatistics;
		openLayerTON : TON;
	END_STRUCT;
	MONITOR_AXIS_enum : 
		(
		MONITOR_AXIS_X1,
		MONITOR_AXIS_X2,
		MONITOR_AXIS_Y,
		END_OF_MONITOR_AXIS
		);
	IO_typ : 	STRUCT 
		do : IODO_typ;
	END_STRUCT;
	IODO_typ : 	STRUCT 
		counterReset : BOOL;
		selectEncoderX : BOOL;
		enableModulation : BOOL;
	END_STRUCT;
	STATE : 
		(
		STATE_NOT_READY,
		STATE_READY,
		STATE_BEGIN_TRAJECTORY,
		STATE_PULSE_COUNTER_RESET
		);
	SEQUENCE : 
		(
		SEQUENCE_IDLE,
		SEQUENCE_CHECK_LAG_IN_TOLERANCE,
		SEQUENCE_DONE,
		SEQUENCE_ERROR
		);
END_TYPE
