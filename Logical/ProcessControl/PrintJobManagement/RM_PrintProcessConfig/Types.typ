
TYPE
	PrintProcessConfigTask_typ : 	STRUCT 
		commands : PrintConfigCommands_typ;
		parameters : PrintConfigParameters_typ;
		status : PrintConfigStatus_typ;
		internal : PrintConfigInternal_typ;
	END_STRUCT;
	PrintConfigCommands_typ : 	STRUCT 
		load : BOOL;
		save : BOOL;
	END_STRUCT;
	PrintConfigParameters_typ : 	STRUCT 
		_ : STRING[260];
	END_STRUCT;
	PrintConfigStatus_typ : 	STRUCT 
		state : STATE;
		busy : BOOL;
		done : BOOL;
		error : BOOL;
		errorId : DINT;
		continuousModeStatus : BOOL;
		pciLoadStatus : STRING[12];
	END_STRUCT;
	PrintConfigInternal_typ : 	STRUCT 
		save : AtnPlcOpenStatus;
		load : AtnPlcOpenStatus;
		enableManualOverwrite : BOOL;
		_previousPciLoaded : BOOL;
		atnCommand : AtnPLCOpen;
		hmiSelectedPciParameterData : HMISelectedPciParData_typ;
		_previousOverwriteStatus : BOOL;
	END_STRUCT;
	HMIInputs_typ : 	STRUCT 
		ContinuousModeEnable : BOOL;
		ContinuousModeDisable : BOOL;
		GasFlowLpm : REAL;
		RecSpreadVelocity : REAL;
		RecSpreadAccel : REAL;
		RecSpreadDecel : REAL;
		RecApproachVelocity : REAL;
		RecApproachAccel : REAL;
		RecApproachDecel : REAL;
		ElectrodeEnable : BOOL;
		ElectrodeDisable : BOOL;
		ElectrodeGainPerc : REAL;
		MhInitialDispenseRot : REAL;
		MhContinuousDispenseRot : REAL;
		AiMaxRecoatLimit : REAL;
		ApplyRecSpreadVel : BOOL;
		ApplyRecApproachVel : BOOL;
		ApplyGasFlow : BOOL;
		ApplyElectrodeGain : BOOL;
		ApplyInitialDispenseRot : BOOL;
		ApplyContDispenseRot : BOOL;
		ApplyAiMaxRecoatLimit : BOOL;
		DropdownSelection : USINT;
	END_STRUCT;
	HMISelectedPciParData_typ : 	STRUCT 
		MachineName : STRING[5];
		Description : STRING[255];
		FileFormatVersion : INT;
		DateTimeGenerated : STRING[30];
		ParamterSetpoints : ParamterSetpoints_typ;
	END_STRUCT;
	STATE : 
		(
		STATE_NOT_READY,
		STATE_READY,
		STATE_DONE,
		STATE_ERROR,
		STATE_LOAD,
		STATE_SAVE
		);
END_TYPE
