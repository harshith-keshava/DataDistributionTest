
TYPE
	vfValveBasicInternal_typ : 	STRUCT 
		valveTimeOutTimer : TON; (*timeout if a command to open or close is sent and it hasnt completed*)
		valveCycleTimer : TON; (*cycle time for a rapid open/close operation*)
		valveState : vfValveBasicStates_typ;
		valveErrorState : vfValveBasicStates_typ;
		actuationDelayTimer : TON;
		oldDoOpen : BOOL;
		oldDoClose : BOOL;
	END_STRUCT;
	vfValveBasicInputs_typ : 	STRUCT 
		closeLimitSensor : BOOL;
		openLimitSensor : BOOL;
		adrParameters : REFERENCE TO ValveParameters_typ;
		parameters : ValveParameters_typ;
		adrCommands : REFERENCE TO ValveCommands_typ;
		commands : ValveCommands_typ;
	END_STRUCT;
	vfValveBasicOutputs_typ : 	STRUCT 
		OpenValveSignal : BOOL;
		CloseValveSignal : BOOL;
		status : ValveStatus_typ;
	END_STRUCT;
	vfValveBasicStates_typ : 
		(
		vfVALVE_BASIC_WAIT_FOR_COMMANDS,
		vfVALVE_BASIC_OPEN,
		vfVALVE_BASIC_CLOSE,
		vfVALVE_BASIC_CYCLE_OPEN,
		vfVALVE_BASIC_CYCLE_CLOSE,
		vfVALVE_BASIC_STOP,
		vfVALVE_BASIC_ERROR
		);
END_TYPE
