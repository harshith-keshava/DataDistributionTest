
TYPE
	Machine_typ : 	STRUCT 
		operation : MACHINE_OPERATIONS_ENUM;
		_previousOperation : MACHINE_OPERATIONS_ENUM;
	END_STRUCT;
	MACHINE_OPERATIONS_ENUM : 
		(
		MACH_OP_NONE,
		MACH_OP_START_DISTRIBUTION,
		MACH_OP_ABORT_DISTRIBUTION
		);
	SYSTEM_GENERAL_STATUS_ENUM : 
		(
		PRINT_JOB_MANAGER_ERROR,
		BUILD_DISTRIBUTOR_ERROR,
		VFLCR_ERROR
		);
	GlobalConfiguration_typ : 	STRUCT 
		machineIdentity : PM_MachineIdentity_typ;
	END_STRUCT;
	PM_MachineIdentity_typ : 	STRUCT 
		factoryName : STRING[40]; (*ex: HQ, VulcanOne, ...*)
		machineNumber : UINT; (*ex: 0=invalid, 1..N (repeat in each factory)*)
		machineName : STRING[40]; (*ex: BETA, GEN2, DP1, DP2, DP3...*)
	END_STRUCT;
END_TYPE
