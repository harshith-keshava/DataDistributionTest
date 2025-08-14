/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1755198539_13_
#define _BUR_1755198539_13_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef struct OPCUAData_FROM_BuildPC_typ
{	unsigned short Heartbeat;
	plcbit BuildInfoReady;
	plcbit DistributionActive;
	plcbit DistributionPaused;
	plcbit DistributionAborted;
	unsigned long BuildLayout;
	unsigned short PrintNumber;
	unsigned long CurrentDistributionLayer;
	plcstring StatusMessage[81];
	plcstring DataDistributorVersion[41];
} OPCUAData_FROM_BuildPC_typ;

typedef struct OPCUAData_TO_BuildPC_typ
{	unsigned short Heartbeat;
	plcbit RequestBuildInfo;
	plcbit RequestStartDistribution;
	plcbit RequestPauseDistribution;
	plcbit RequestAbortDistribution;
	plcbit PrintingActive;
	unsigned long CurrentPrintLayer;
} OPCUAData_TO_BuildPC_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/ProcessControl/PrintJobManagement/Opcua.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1755198539_13_ */

