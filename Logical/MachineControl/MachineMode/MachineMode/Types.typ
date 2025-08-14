
TYPE
	Configuration_type : 	STRUCT 
		_ : BOOL;
	END_STRUCT;
	task_command_type : 	STRUCT 
		activateMaintenanceMode : BOOL;
		activateSetupMode : BOOL;
		activateProductionMode : BOOL;
		activateSelectedMode : BOOL;
	END_STRUCT;
	task_status_type : 	STRUCT 
		ready : BOOL;
		state : STATE;
		sequence : SEQUENCE;
		statusMessage : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		activeMode : MACHINE_MODE;
		maintenanceModeActive : BOOL;
		setupModeActive : BOOL;
		productionModeActive : BOOL;
	END_STRUCT;
	task_internal_type : 	STRUCT 
		PLCOpen : AtnPlcOpenStatus;
		previousState : STATE;
		newCommand : BOOL;
		localLockout : BOOL;
		watchdogStatus : ARRAY[0..10]OF STRING[80];
		watchdogStatusMaintenance : ARRAY[0..10]OF STRING[80];
		watchdogStatusSetup : ARRAY[0..10]OF STRING[80];
		watchdogStatusProduction : ARRAY[0..10]OF STRING[80];
		subSystemStatus : ARRAY[0..10]OF STRING[80];
		parameters : MachineModeApiParameter_type;
		machineIsStopped : BOOL;
		modeSwitchAllowed : BOOL;
		machineStoppedByModeFlag : BOOL;
		activeModeRequirementsNotMet : BOOL;
		maintenanceRequirementsNotMet : BOOL;
		setupRequirementsNotMet : BOOL;
		productionRequirementsNotMet : BOOL;
	END_STRUCT;
	task_type : 	STRUCT 
		command : task_command_type;
		status : task_status_type;
		parameters : MachineModeApiParameter_type;
		internal : task_internal_type;
	END_STRUCT;
	SEQUENCE : 
		(
		SEQUENCE_IDLE,
		SEQUENCE_DONE,
		SEQUENCE_ERROR
		);
	STATE : 
		(
		STATE_NOT_READY,
		STATE_READY,
		STATE_DONE,
		STATE_ERROR,
		STATE_SWITCH_MODE
		);
	nonvolatile_type : 	STRUCT 
		activeMode : MACHINE_MODE;
	END_STRUCT;
END_TYPE
