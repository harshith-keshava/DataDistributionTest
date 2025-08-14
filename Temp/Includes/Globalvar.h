/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1755183251_2_
#define _BUR_1755183251_2_

#include <bur/plctypes.h>

/* Constants */
#ifdef _REPLACE_CONST
 #define MAX_PUBLISH_STACK_SIZE 20U
#else
 _GLOBAL_CONST unsigned char MAX_PUBLISH_STACK_SIZE;
#endif


/* Variables */
_GLOBAL unsigned short hmiTick;
_GLOBAL McPsmAxisType gPSM;
_GLOBAL struct CommissioningSettings_typ gCommissioningSettings;
_GLOBAL struct GlobalConfiguration_typ gConfiguration;
_GLOBAL plcbit gHighTempOrLowFlowLaserPowerOff;
_GLOBAL struct Machine_typ gMachineState;
_GLOBAL struct stateEnum gStates;





__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Global.var\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1755183251_2_ */

