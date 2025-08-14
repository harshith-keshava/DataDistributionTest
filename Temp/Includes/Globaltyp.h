/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1755184960_1_
#define _BUR_1755184960_1_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef enum MACHINE_OPERATIONS_ENUM
{	MACH_OP_NONE,
	MACH_OP_HOME_ALL,
	MACH_OP_LOAD_VOLUME,
	MACH_OP_PREPARE_NEXT_LAYER,
	MACH_OP_RECOAT_CURRENT_LAYER,
	MACH_OP_PRINT_CURRENT_LAYER,
	MACH_OP_UNLOAD_VOLUME,
	MACH_OP_HOME_SINGLE,
	MACH_OP_CALIBRATE_LASER,
	MACH_OP_CALIBRATE_BEAM,
	MACH_OP_OMS_TEST,
	MACH_OP_MANUAL_CALIBRATE_LASER,
	MACH_OP_MANUAL_CALIBRATE_BEAM,
	MACH_OP_CLEAN_GASHEAD,
	MACH_OP_SCRAPE,
	MACH_OP_PA_DISTRIBUTE,
	MACH_OP_PA_RECOAT,
	MACH_OP_PA_PRINT,
	MACH_OP_PREPARE_BUILD_PLATE,
	MACH_OP_REFILL_RECOATER,
	MACH_OP_IMAGE_LAYER,
	MACH_OP_PA_LOP,
	MACH_OP_PREPARE_ALIGNMENT,
	MACH_OP_CLEANING_BLADE,
	MACH_OP_REFILL_MH_FULL,
	MACH_OP_REFILL_OH_FULL,
	MACH_OP_FLUSH_MH_POWDER,
	MACH_OP_DRYRUN_CURRENT_LAYER
} MACHINE_OPERATIONS_ENUM;

typedef enum SYSTEM_GENERAL_STATUS_ENUM
{	STATUS_START = 1000,
	ERR_INHIBITED,
	AXIS_ERROR,
	CNC_ERROR,
	GAS_ERROR,
	SAFETY_ERROR,
	BUILD_DISTRIBUTOR_ERROR,
	MQTT_ERROR,
	HERDING_ERROR,
	HOPPER_ERROR,
	PUMPS_ERROR,
	VISION_ERROR,
	COOLING_ERROR,
	RECOATER_ERROR,
	LIFT_ERROR,
	SHROUD_LIFT_ERROR,
	PLATE_LATCH_ERROR,
	PRINT_JOB_MANAGER_ERROR,
	SHUTTLE_ERROR,
	GRIPPER_ERROR,
	VFLCR_ERROR,
	PIXELMAP_ERROR,
	GEAR_ERROR,
	POD_ERROR,
	LEVELING_ERROR,
	SFC_NOT_READY,
	POWDER_SYSTEM_ERROR,
	PURGE_ERROR,
	MACHINE_MODE_ERROR
} SYSTEM_GENERAL_STATUS_ENUM;

typedef enum MI_MachineType_enum
{	MACHINE_TYPE_UNKNOWN = 0,
	MACHINE_TYPE_PRINTER = 1
} MI_MachineType_enum;

typedef enum MI_MachineGeneration_enum
{	MACHINE_GENERATION_UNKNOWN = 0,
	MACHINE_GENERATION_BETA = 1,
	MACHINE_GENERATION_GEN2 = 2,
	MACHINE_GENERATION_GEN3 = 3
} MI_MachineGeneration_enum;

typedef enum MI_FactoryNumber_enum
{	FACTORY_UNKNOWN = 0,
	FACTORY_HQ = 1,
	FACTORY_VULCAN_ONE = 2
} MI_FactoryNumber_enum;

typedef struct Machine_typ
{	enum MACHINE_OPERATIONS_ENUM operation;
	enum MACHINE_OPERATIONS_ENUM _previousOperation;
} Machine_typ;

typedef struct stateEnum
{	plcstring machineHasBuildVolume[81];
	plcstring selectedSideIsYPos[81];
} stateEnum;

typedef struct PM_MachineIdentity_typ
{	enum MI_MachineType_enum machineType;
	enum MI_MachineGeneration_enum machineGeneration;
	enum MI_FactoryNumber_enum factoryNumber;
	plcstring factoryName[41];
	unsigned short machineNumber;
	plcstring machineName[41];
} PM_MachineIdentity_typ;

typedef struct GlobalConfiguration_typ
{	struct PM_MachineIdentity_typ machineIdentity;
} GlobalConfiguration_typ;

typedef struct VFLCR_RackConfig_typ
{	plcbit ignoreChiller;
	plcbit ignorePowerSupply[4];
	plcbit ignoreLaser[22];
	plcbit highTempDisableRack;
} VFLCR_RackConfig_typ;

typedef struct CSettings_LaserControl_typ
{	plcbit rackEnable[5];
	struct VFLCR_RackConfig_typ rackConfig[5];
} CSettings_LaserControl_typ;

typedef struct CommissioningSettings_typ
{	struct CSettings_LaserControl_typ laserControlSystem;
} CommissioningSettings_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Global.typ\\\" scope \\\"global\\\"\\n\"");

/* Additional IEC dependencies */
__asm__(".ascii \"iecdep \\\"Logical/ProcessControl/VFLCR/VFLCR.var\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1755184960_1_ */

