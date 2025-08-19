/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1755630755_8_
#define _BUR_1755630755_8_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef struct VFLCRApiCommand_typ
{	plcstring openLayer[81];
	plcstring abortLayer[81];
	plcstring deleteLaserControlFiles[81];
} VFLCRApiCommand_typ;

typedef struct VFLCRApiStatus_typ
{	plcstring layerOpen[81];
} VFLCRApiStatus_typ;

typedef struct VFLCRApiIO_typ
{	plcstring rack[81];
} VFLCRApiIO_typ;

typedef struct VFLCRApiAlarm_typ
{	struct vfAlarms_Component_typ components;
	struct vfAlarms_Instance_type AGGREGATE_GENERAL_ALARM;
	struct vfAlarms_Instance_type AGGREGATE_HARDWARE_ALARM;
	struct vfAlarms_Instance_type AGGREGATE_SOFTWARE_ALARM;
	struct vfAlarms_Instance_type AGGREGATE_PIXELMAPPING_ALARM;
	struct vfAlarms_Instance_type AGGREGATE_CALIBAPP_ALARM;
	struct vfAlarms_Instance_type VFLCR_HW_HEARTBEAT_ERROR_AL9100;
	struct vfAlarms_Instance_type VFLCR_HW_HARDWARE_ERROR_AL9103;
	struct vfAlarms_Instance_type VFLCR_HW_SUPPLY_FAN_FAIL_AL9104;
	struct vfAlarms_Instance_type VFLCR_HW_SUPPLY_OVERTEMP_AL9105;
	struct vfAlarms_Instance_type VFLCR_HW_SUPPLY_AC_LOW_AL9106;
	struct vfAlarms_Instance_type VFLCR_HW_SUPPLY_DC_FAIL_AL9107;
	struct vfAlarms_Instance_type VFLCR_HW_CONTROL_POWER_AL9108;
	struct vfAlarms_Instance_type VFLCR_HW_LASER_READY_FAIL_AL9109;
	struct vfAlarms_Instance_type VFLCR_HW_LASER_MAIN_POWER_AL9110;
	struct vfAlarms_Instance_type VFLCR_HW_LASER_EMISSION_AL9111;
	struct vfAlarms_Instance_type VFLCR_HW_LASER_FATAL_AL9112;
	struct vfAlarms_Instance_type VFLCR_HW_LASER_WATCHDOG_AL9113;
	struct vfAlarms_Instance_type VFLCR_HW_POWERLINK_ERROR_AL9114;
	struct vfAlarms_Instance_type VFLCR_SW_VERSION_MISMATCH_AL9200;
	struct vfAlarms_Instance_type VFLCR_SW_ID_MISMATCH_AL9201;
	struct vfAlarms_Instance_type VFLCR_SW_LUT_LOAD_FAIL_AL9202;
	struct vfAlarms_Instance_type VFLCR_SW_MAP_UNDEFINED_AL9203;
	struct vfAlarms_Instance_type VFLCR_SW_SYSTEM_ERROR_AL9204;
	struct vfAlarms_Instance_type VFLCR_SW_TRAJECTORY_ERROR_AL9205;
	struct vfAlarms_Instance_type VFLCR_SW_PRINT_NOT_READY_AL9206;
	struct vfAlarms_Instance_type VFLCR_SW_COMMAND_INHIBIT_AL9207;
	struct vfAlarms_Instance_type VFLCR_PM_FILE_NOT_FOUND_AL9300;
	struct vfAlarms_Instance_type VFLCR_PM_PATH_NOT_FOUND_AL9301;
	struct vfAlarms_Instance_type VFLCR_PM_FILE_OPEN_ERROR_AL9302;
	struct vfAlarms_Instance_type VFLCR_PM_FILE_CLOSE_ERROR_AL9303;
	struct vfAlarms_Instance_type VFLCR_PM_FILE_READ_ERROR_AL9304;
	struct vfAlarms_Instance_type VFLCR_PM_FILE_DATA_ERROR_AL9305;
	struct vfAlarms_Instance_type VFLCR_PM_VERSION_CONFLICT_AL9306;
	struct vfAlarms_Instance_type VFLCR_PM_IGNORED_PIXEL_AL9307;
	struct vfAlarms_Instance_type VFLCR_PM_RANGE_EXCEEDED_AL9308;
	struct vfAlarms_Instance_type VFLCR_APP_HEARTBEAT_ERROR_AL9400;
	struct vfAlarms_Instance_type VFLCR_APP_COMMAND_TIMEOUT_AL9401;
	struct vfAlarms_Instance_type VFLCR_APP_CMD_B4_READY_AL9402;
	struct vfAlarms_Instance_type VFLCR_APP_RESULTS_TIMEOUT_AL9403;
	struct vfAlarms_Instance_type VFLCR_APP_BUCKET_MISSING_AL9404;
	struct vfAlarms_Instance_type VFLCR_APP_S3_CONNECTION_AL9405;
	struct vfAlarms_Instance_type VFLCR_APP_CAPTURE_FAILED_AL9406;
	struct vfAlarms_Instance_type VFLCR_DISABLE_CHILLER_RUN_AL9208;
	struct vfAlarms_Instance_type VFLCR_DISABLE_OB_FLOW_LOW_AL9209;
	struct vfAlarms_Instance_type PIXEL_ENABLE_MISMATCH_AL9309;
	struct vfAlarms_Instance_type VFLCR_VERIFY_INHIBIT_AL9210;
} VFLCRApiAlarm_typ;

typedef struct VFLCRApi_typ
{	struct VFLCRApiCommand_typ command;
	struct VFLCRApiStatus_typ status;
	struct VFLCRApiIO_typ IO;
	struct VFLCRApiAlarm_typ alarm;
} VFLCRApi_typ;

typedef struct VFLCROpenLayerParameters_typ
{	unsigned long selectedBuildLayout;
	unsigned short selectedPrintNumber;
	unsigned long selectedLayer;
} VFLCROpenLayerParameters_typ;

typedef struct VFLCROpenLayerCommandPars_typ
{	struct VFLCROpenLayerParameters_typ parameters;
} VFLCROpenLayerCommandPars_typ;

typedef struct VFLCROpenLayerRackPars_typ
{	unsigned char Rack;
} VFLCROpenLayerRackPars_typ;

typedef struct LaserSnippets_typ
{	unsigned char rackNumber;
	unsigned char laserNumber;
	unsigned char pixelNumber;
	unsigned char supplyNumber;
	plcstring additionalInfoLaserFatal[161];
} LaserSnippets_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/ProcessControl/VFLCR/VFLCR.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1755630755_8_ */

