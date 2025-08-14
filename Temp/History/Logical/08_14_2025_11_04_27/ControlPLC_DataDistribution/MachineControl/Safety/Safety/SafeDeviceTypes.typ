
TYPE
	IO_SD_Interlock_typ : 	STRUCT 
		SDI_SafeClosed : IO_SDI_DUAL_typ;
	END_STRUCT;
	IO_SD_InterlockPowerUnlock_typ : 	STRUCT 
		SDI_Closed : IO_SDI_DUAL_typ;
		DI_Locked : BOOL;
		DO_ReleaseLock : BOOL;
	END_STRUCT;
	IO_SD_InterlockPowerLock_typ : 	STRUCT 
		SDI_Closed : IO_SDI_DUAL_typ;
		DI_Locked : BOOL;
		DO_EngageLock : BOOL;
	END_STRUCT;
	IO_SD_PneumaticDumpValve_typ : 	STRUCT 
		SDI_UpstreamPressureInRange : IO_SDI_SINGLE_typ;
		SDO_OpenValve : IO_SDO_SINGLE_typ;
		SDI_DownstreamPressureInRange : IO_SDI_SINGLE_typ;
	END_STRUCT;
	IO_SD_SafetyContactor_typ : 	STRUCT 
		SDI_AuxContactEDM : IO_SDI_SINGLE_typ;
		SDO_EnableContactor : IO_SDO_SINGLE_typ;
	END_STRUCT;
	IO_SD_AxisGroupEnable_typ : 	STRUCT 
		SDO_EnableAxes : IO_SDO_DUAL_typ;
		SDO_QuickStop : IO_SDO_SINGLE_typ;
	END_STRUCT;
	IO_SD_PrintZoneDoorCylinders_typ : 	STRUCT 
		DI_DoorIsOpen : BOOL;
		DI_DoorIsClosed : BOOL;
		DI_DoorLatched_Left : BOOL;
		DI_DoorLatched_Right : BOOL;
		DO_OpenDoor : BOOL;
		DO_CloseDoor : BOOL;
		DO_UnlatchDoor : BOOL;
		DO_LatchDoor : BOOL;
	END_STRUCT;
	IO_SD_LaserSafety_typ : 	STRUCT 
		SDO_RackPowerContactor : IO_SDO_DUAL_typ;
		SDI_RackPowerContactorA_EDM : IO_SDI_SINGLE_typ;
		SDI_RackPowerContactorB_EDM : IO_SDI_SINGLE_typ;
		SDO_VFLCR_SafetyRelay : IO_SDO_DUAL_typ;
		SDI_VFLCR_SafetyRelayEDM : IO_SDI_SINGLE_typ;
	END_STRUCT;
	IO_SD_RecoaterElectrode_typ : 	STRUCT 
		SDO_EnableHighVoltage : IO_SDO_SINGLE_typ;
		Contactor : IO_SD_SafetyContactor_typ;
	END_STRUCT;
END_TYPE
