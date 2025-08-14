
TYPE
	testCommand_typ : 	STRUCT 
		induceLowSupplyPressure : BOOL;
		initAirPressure : BOOL;
		initNoEstopPressed : BOOL;
		induceOpenHatch : BOOL;
		induceEStopPressed : BOOL;
	END_STRUCT;
	test_typ : 	STRUCT 
		command : testCommand_typ;
	END_STRUCT;
	IO_typ : 	STRUCT 
		safeLOGIC : IO_SafeLOGIC_typ;
		DI_SafetyResetButton : ARRAY[0..1]OF BOOL;
		DO_InhibitAlarm_O2SafetyBox : BOOL;
		DO_SafetyResetLamp : BOOL;
		SDI_EStopButton_HandHeld : IO_SDI_DUAL_typ;
		SDI_EStop_LaserControlRoom : IO_SDI_DUAL_typ;
		DoorInterlock2 : IO_SD_Interlock_typ;
		DoorInterlock1 : IO_SD_Interlock_typ;
		SDI_SafetyLockoutSwitchMCC : IO_SDI_DUAL_typ;
		LaserSystem : ARRAY[0..MACHINE_MAI_LASER_RACKS]OF IO_SD_LaserSafety_typ;
		Chiller2TemperatureOK : BOOL;
		Chiller1TemperatureOK : BOOL;
		Chiller1Running : BOOL;
		Chiller2Running : BOOL;
		ChillerRunning : BOOL;
		SafetyStatus : BOOL;
		BatOBFlow : BOOL;
	END_STRUCT;
	Configuration_typ : 	STRUCT 
		Exists : BOOL;
	END_STRUCT;
	localInterfaceCommand_typ : 	STRUCT 
		resetAllSafety : BOOL;
		resetMachineSafety : BOOL;
		resetLaserSafety : BOOL;
	END_STRUCT;
	localInterfaceInternal_typ : 	STRUCT 
		PLCOpen : AtnPlcOpenStatus;
		previousState : STATE;
		newCommand : BOOL;
		localLockout : BOOL;
		fbResetLaserOnPulse : VF_COMMON_PulseTrain;
		fbPulseBlueResetIndicator : VF_COMMON_PulseTrain;
		fbResetMachineOnPulse : VF_COMMON_PulseTrain;
		subSystemStatus : ARRAY[0..10]OF STRING[80];
		_safetyResetButton : BOOL;
		eStopIndex : USINT;
		interlockIndex : USINT;
		overrideIndex : USINT;
		resetAllSafety : AtnPLCOpen;
		ns_PodGaurdClosed : BOOL;
		ns_PigtailGaurdClosed : BOOL;
		alarmExteriorUnlock : BOOL;
		preventExteriorUnlock : BOOL;
		safetyTimeout : TON;
		interlocksOpen : BOOL;
		_interlocksOpen : BOOL;
	END_STRUCT;
	localInterfaceStatus_typ : 	STRUCT 
		ready : BOOL;
		state : STATE;
		sequence : SEQUENCE;
		statusMessage : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		allSafetyReset : BOOL;
		IOState : IOSTATE;
		eStopStatus : ARRAY[0..10]OF STRING[80];
		eStopStatusBool : BOOL;
		interlockStatus : ARRAY[0..10]OF STRING[80];
		interlockStatusBool : BOOL;
		overrideStatus : ARRAY[0..10]OF STRING[80];
		overrideStatusBool : BOOL;
		debrisShieldStatus : STRING[40];
		allActiveEStopOverridden : BOOL;
	END_STRUCT;
	localInterface_typ : 	STRUCT 
		command : localInterfaceCommand_typ;
		status : localInterfaceStatus_typ;
		internal : localInterfaceInternal_typ;
	END_STRUCT;
	SEQUENCE : 
		(
		SEQUENCE_IDLE,
		SEQUENCE_DONE,
		SEQUENCE_ERROR,
		SEQUENCE_EXECUTE_SAFETY_RESET,
		SEQUENCE_RESET_MACHINE_SAFETY,
		SEQUENCE_WAITING_FOR_MACH_SAFETY,
		SEQUENCE_RESET_LASER_SAFETY,
		SEQUENCE_WAITING_FOR_LSR_SAFETY
		);
	IOSTATE : 
		(
		ENABLE_ARGON_PZ_PURGE,
		DISABLE_ARGON_PZ_PURGE,
		PURGE_GAS_HEAD_ARGON,
		PURGE_GAS_HEAD_CDA
		);
	STATE : 
		(
		STATE_NOT_READY,
		STATE_READY,
		STATE_DONE,
		STATE_ERROR,
		STATE_RESET_MACHINE_SAFETY,
		STATE_RESET_LASER_SAFETY,
		STATE_RESET_ALL_SAFETY
		);
END_TYPE
