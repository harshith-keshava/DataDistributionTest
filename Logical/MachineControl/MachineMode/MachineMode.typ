
TYPE
	MachineModeApiCommand_type : 	STRUCT 
		activateMode : STRING[80];
	END_STRUCT;
	MachineModeApiWatchdog_type : 	STRUCT 
		maintenanceModeOkay : STRING[80];
		setupModeOkay : STRING[80];
		productionModeOkay : STRING[80];
	END_STRUCT;
	MachineModeApiStatus_type : 	STRUCT 
		subSystemsReady : STRING[80];
		hmiRemoteActive : STRING[80];
		activeMode : MACHINE_MODE;
	END_STRUCT;
	MachineModeApiInhibit_type : 	STRUCT 
		_ : STRING[80];
	END_STRUCT;
	MachineModeAlarmInstances_typ : 	STRUCT 
		AL10028 : UDINT := 10028;
		AL10029 : UDINT := 10029;
		AL10030 : UDINT := 10030;
		AL10031 : UDINT := 10031;
		AL10032 : UDINT := 10032;
		AL10033 : UDINT := 10033;
	END_STRUCT;
	MachineModeApiAlarm_type : 	STRUCT 
		components : vfAlarms_Component_typ;
		AGGREGATE_GENERAL_ALARM : vfAlarms_Instance_type;
		COMMAND_BEFORE_READY : vfAlarms_Instance_type;
		COMMAND_INHIBITED : vfAlarms_Instance_type;
		COMMAND_ERROR : vfAlarms_Instance_type;
		MODE_ERROR : vfAlarms_Instance_type;
		PRODUCTION_WATCHDOG : vfAlarms_Instance_type;
		alarmInstances : MachineModeAlarmInstances_typ;
	END_STRUCT;
	MachineModeApi : 	STRUCT 
		command : MachineModeApiCommand_type;
		status : MachineModeApiStatus_type;
		watchdog : MachineModeApiWatchdog_type;
		inhibit : MachineModeApiInhibit_type;
		alarm : MachineModeApiAlarm_type;
	END_STRUCT;
	MachineModeApiParameter_type : 	STRUCT 
		selectedMode : MACHINE_MODE;
	END_STRUCT;
	MACHINE_MODE : 
		(
		MACHINE_MODE_SETUP,
		MACHINE_MODE_PRODUCTION,
		MACHINE_MODE_MAINTENANCE
		);
END_TYPE
