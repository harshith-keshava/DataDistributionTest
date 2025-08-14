
TYPE
	IO_SafeLOGIC_typ : 	STRUCT 
		Status : IO_SL_Status_typ;
		Command : IO_SL_Commands_typ;
		Override : IO_SL_Override_typ;
		NonSafeInputs : IO_SL_NonSafeInputs_typ;
		SafeModuleOK : ARRAY[0..16]OF BOOL;
	END_STRUCT;
	IO_SL_Status_typ : 	STRUCT 
		SafetyProgramRevision : UINT;
		SafetySystemReady : BOOL;
		EStopPressed : BOOL;
		GuardOpen_LoadZone : BOOL;
		GuardOpen_Airlock : BOOL;
		GuardOpen_Exterior : BOOL;
		GuardOpen_PrintZone : BOOL;
		SafetyReset_EStops : BOOL;
		SafetyReset_Guards_LoadZone : BOOL;
		SafetyReset_Guards_Pod : BOOL;
		SafetyReset_Guards_Airl : BOOL;
		SafetyReset_Guards_PrintZone : BOOL;
		SafetyReset_Lasers : BOOL;
		HeaterContactorEnabled : BOOL;
		AxesEnabled_Gantry : BOOL;
		AxesEnabled_Recoater : BOOL;
		AxesEnabled_Shuttle_AirLocks : BOOL;
		AxesEnabled_ZLifts : BOOL;
		RecoaterStepperEnabled : BOOL;
		RecoaterElectrodeEnabled : BOOL;
		SupplyEnabled_CDA : BOOL;
		SupplyEnabled_Argon : BOOL;
		ArgonSupplyEnabled_PrintZone : BOOL;
		ArgonEnabled_OBox_DShield : BOOL;
		ArgonEnabled_GasHead : BOOL;
		CDAEnabled_GasHead : BOOL;
		FBK_Error_EStop : BOOL;
		FBK_Error_Guard : BOOL;
		FBK_Error_Pneumatic : BOOL;
		FBK_Error_Heater : BOOL;
		FBK_Error_Drive : BOOL;
		FBK_Error_RecStepper : BOOL;
		FBK_Error_RecElectrode : BOOL;
		FBK_Error_Laser : BOOL;
		FBK_Error_VFLCR_LaserEDM : BOOL;
		FBK_Diag_EStop : UINT;
		FBK_Diag_Guard : UINT;
		FBK_Diag_Pneumatic : UINT;
		FBK_Diag_Heater : UINT;
		FBK_Diag_Drive : UINT;
		FBK_Diag_RecStepper : UINT;
		FBK_Diag_RecElectrode : UINT;
		FBK_Diag_Laser : UINT;
		FBK_Diag_VFLCR_LaserEDM0 : UINT;
		FBK_Diag_VFLCR_LaserEDM1 : UINT;
		FBK_Diag_VFLCR_LaserEDM2 : UINT;
		FBK_Diag_VFLCR_LaserEDM3 : UINT;
		LaserSafetyPwrContactRackError : ARRAY[0..6]OF BOOL;
		AirlockSealed_Right : BOOL;
		ExteriorLoadZoneInterlocked : BOOL;
		PodPresentSealed_Right : BOOL;
	END_STRUCT;
	IO_SL_Commands_typ : 	STRUCT 
		RequestMachineSafetyReset : BOOL;
		RequestLaserSafetyReset : BOOL;
		RequestReleaseReset : BOOL;
		RequestUnlock_LoadZone : BOOL;
		RequestUnlock_PrintZone : BOOL;
		EnableHeaterContactor : BOOL;
		EnableLaserSafetyInterlock : BOOL;
		EnableAxes_Gantry : BOOL;
		EnableAxes_Recoater : BOOL;
		EnableAxes_Shuttle_Airlocks : BOOL;
		EnableAxes_ZLifts : BOOL;
		EnableRecoaterStepper : BOOL;
		EnableRecoaterElectrode : BOOL;
		EnablePneumaticsSupply : BOOL;
		EnableArgonSupply_PrintZonePurge : BOOL;
		SelectArgon_OBox_DShield : BOOL;
		SelectArgon_GasHead : BOOL;
		SelectCDA_GasHead : BOOL;
		RacksEnabled : UINT;
		RequestToEnterExteriorLoadZone : BOOL;
	END_STRUCT;
	IO_SL_NonSafeInputs_typ : 	STRUCT 
		ArgonPreRegulatorPressureOK : BOOL;
		ArgonSupplyPressureOK : BOOL;
		CDASupplyPressureOK : BOOL;
		RequestExteriorZoneUnlock : BOOL;
		AcceleratedAirPurgeActive : BOOL;
	END_STRUCT;
	IO_SL_Override_typ : 	STRUCT 
		Override_LoadZoneGuards : BOOL;
		Override_PrintZoneGuards : BOOL;
		Override_ControlStationEStop : BOOL;
		Override_SafetyLockoutBoxEStop : BOOL;
		Override_MachineMezEStop : BOOL;
		Override_MachineRearEStop : BOOL;
		Override_GasDistributionEStop : BOOL;
		Override_AirlockSafetyInterl : BOOL;
	END_STRUCT;
	IO_SDI_DUAL_typ : 	STRUCT 
		CH1 : BOOL;
		CH2 : BOOL;
		DUAL_EVAL : BOOL;
		SAFEOK : BOOL;
	END_STRUCT;
	IO_SDO_DUAL_typ : 	STRUCT 
		CH1 : BOOL;
		CH2 : BOOL;
		CH1_SAFEOK : BOOL;
		CH2_SAFEOK : BOOL;
	END_STRUCT;
	IO_SDI_SINGLE_typ : 	STRUCT 
		CH1 : BOOL;
		SAFEOK : BOOL;
	END_STRUCT;
	IO_SDO_SINGLE_typ : 	STRUCT 
		CH1 : BOOL;
		SAFEOK : BOOL;
	END_STRUCT;
END_TYPE
