/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1754338176_7_
#define _BUR_1754338176_7_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef enum MACHINE_MODE
{	MACHINE_MODE_SETUP,
	MACHINE_MODE_PRODUCTION,
	MACHINE_MODE_MAINTENANCE
} MACHINE_MODE;

typedef struct MachineModeApiCommand_type
{	plcstring activateMode[81];
} MachineModeApiCommand_type;

typedef struct MachineModeApiWatchdog_type
{	plcstring maintenanceModeOkay[81];
	plcstring setupModeOkay[81];
	plcstring productionModeOkay[81];
} MachineModeApiWatchdog_type;

typedef struct MachineModeApiStatus_type
{	plcstring subSystemsReady[81];
	plcstring hmiRemoteActive[81];
	enum MACHINE_MODE activeMode;
} MachineModeApiStatus_type;

typedef struct MachineModeApiInhibit_type
{	plcstring _[81];
} MachineModeApiInhibit_type;

typedef struct MachineModeAlarmInstances_typ
{	unsigned long AL10028;
	unsigned long AL10029;
	unsigned long AL10030;
	unsigned long AL10031;
	unsigned long AL10032;
	unsigned long AL10033;
} MachineModeAlarmInstances_typ;

typedef struct MachineModeApiAlarm_type
{	struct vfAlarms_Component_typ components;
	struct vfAlarms_Instance_type AGGREGATE_GENERAL_ALARM;
	struct vfAlarms_Instance_type COMMAND_BEFORE_READY;
	struct vfAlarms_Instance_type COMMAND_INHIBITED;
	struct vfAlarms_Instance_type COMMAND_ERROR;
	struct vfAlarms_Instance_type MODE_ERROR;
	struct vfAlarms_Instance_type PRODUCTION_WATCHDOG;
	struct MachineModeAlarmInstances_typ alarmInstances;
} MachineModeApiAlarm_type;

typedef struct MachineModeApi
{	struct MachineModeApiCommand_type command;
	struct MachineModeApiStatus_type status;
	struct MachineModeApiWatchdog_type watchdog;
	struct MachineModeApiInhibit_type inhibit;
	struct MachineModeApiAlarm_type alarm;
} MachineModeApi;

typedef struct MachineModeApiParameter_type
{	enum MACHINE_MODE selectedMode;
} MachineModeApiParameter_type;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/MachineControl/MachineMode/MachineMode.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1754338176_7_ */

