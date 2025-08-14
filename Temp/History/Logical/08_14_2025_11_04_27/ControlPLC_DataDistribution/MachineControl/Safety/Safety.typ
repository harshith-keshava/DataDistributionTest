
TYPE
	SafetySystemAlarms_typ : 	STRUCT 
		mpCore : UDINT;
		SAFETY_ESTOP_PRESSED : STRING[80];
	END_STRUCT;
	SafetySystem_typ : 	STRUCT 
		commands : SafetySystemCommands_typ;
		status : SafetySystemStatus_typ;
		inhibit : SafetySystemInhibit_typ;
		alarms : SafetySystemAlarms_typ;
	END_STRUCT;
	SafetySystemStatus_typ : 	STRUCT 
		LaserSafetyEnabled : STRING[80];
		LaserPowerOn : STRING[80];
		AnyEStopPressed : STRING[80];
		subsystemsReady : STRING[80];
		SafetyResetEstop : STRING[80];
	END_STRUCT;
	SafetySystemCommands_typ : 	STRUCT 
		powerLasers : STRING[80];
		resetAllSafety : STRING[80];
		resetLaserSafety : STRING[80];
		resetMachineSafety : STRING[80];
	END_STRUCT;
	SafetySystemInhibit_typ : 	STRUCT 
		_ : STRING[80];
	END_STRUCT;
END_TYPE
