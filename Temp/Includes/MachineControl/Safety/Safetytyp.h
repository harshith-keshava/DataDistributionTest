/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1755183251_8_
#define _BUR_1755183251_8_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef struct SafetySystemAlarms_typ
{	unsigned long mpCore;
	plcstring SAFETY_ESTOP_PRESSED[81];
} SafetySystemAlarms_typ;

typedef struct SafetySystemCommands_typ
{	plcstring powerLasers[81];
	plcstring resetAllSafety[81];
	plcstring resetLaserSafety[81];
	plcstring resetMachineSafety[81];
} SafetySystemCommands_typ;

typedef struct SafetySystemStatus_typ
{	plcstring LaserSafetyEnabled[81];
	plcstring LaserPowerOn[81];
	plcstring AnyEStopPressed[81];
	plcstring subsystemsReady[81];
	plcstring SafetyResetEstop[81];
} SafetySystemStatus_typ;

typedef struct SafetySystemInhibit_typ
{	plcstring _[81];
} SafetySystemInhibit_typ;

typedef struct SafetySystem_typ
{	struct SafetySystemCommands_typ commands;
	struct SafetySystemStatus_typ status;
	struct SafetySystemInhibit_typ inhibit;
	struct SafetySystemAlarms_typ alarms;
} SafetySystem_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/MachineControl/Safety/Safety.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1755183251_8_ */

