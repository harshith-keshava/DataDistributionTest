/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1755634366_6_
#define _BUR_1755634366_6_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef enum MODE_MACHINE_ENUM
{	MODE_MACHINE_AUTO,
	MODE_MACHINE_MANUAL_PROGRAM,
	MODE_MACHINE_MANUAL_JOG
} MODE_MACHINE_ENUM;

typedef struct MessageHandler_typ
{	plcbit msgId;
	plcbit ok;
	plcbit cancel;
} MessageHandler_typ;

typedef struct SFCControlCommand_type
{	plcstring pause[81];
	plcstring unpause[81];
	plcstring reset[81];
} SFCControlCommand_type;

typedef struct SFCControlStatus_type
{	plcstring sfc[81];
	plcstring sOMSModeActive[81];
	plcstring sOMSTestComplete[81];
} SFCControlStatus_type;

typedef struct SFCControlInhibits_type
{	plcstring _[81];
} SFCControlInhibits_type;

typedef struct SFCControlApi_type
{	struct SFCControlCommand_type command;
	struct SFCControlStatus_type status;
	struct SFCControlInhibits_type inhibit;
	plcstring systems[81];
} SFCControlApi_type;

typedef struct SFCControlDataApi_type
{	plcbit* pPause;
	plcbit* pBypass;
	plcbit* pTransition;
	plcbit* pSingleStep;
} SFCControlDataApi_type;

typedef struct AutomationsCommand_type
{	plcstring recoat[81];
	plcstring scrape[81];
	plcstring refillHopper[81];
	plcstring printLayer[81];
	plcstring cleanGasHead[81];
	plcstring refillBuffer[81];
	plcstring refillOverheadHopper[81];
	plcstring initiateDoor[81];
	plcstring closeDoor[81];
	plcstring initiatePod[81];
} AutomationsCommand_type;

typedef struct AutomationsStatus_type
{	plcstring autonomousModeActive[81];
} AutomationsStatus_type;

typedef struct Automations_type
{	struct AutomationsCommand_type command;
	struct AutomationsStatus_type status;
} Automations_type;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Automation/Types.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1755634366_6_ */

