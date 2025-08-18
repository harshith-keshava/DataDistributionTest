/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1755527880_19_
#define _BUR_1755527880_19_

#include <bur/plctypes.h>

/* Constants */
#ifdef _REPLACE_CONST
 #define MAI_PERM_HOME 1999U
 #define MAI_PERM_CONFIG 23999U
 #define MAI_PERSISTERS 1U
 #define NUM_PERSISTERS 2U
#else
 _GLOBAL_CONST unsigned long MAI_PERM_HOME;
 _GLOBAL_CONST unsigned long MAI_PERM_CONFIG;
 _GLOBAL_CONST unsigned char MAI_PERSISTERS;
 _GLOBAL_CONST unsigned char NUM_PERSISTERS;
#endif


/* Variables */
_GLOBAL plcbit gBootAfterTransfer;
_GLOBAL plcbit gTransfer;
_GLOBAL plcbit gCyclic;
_GLOBAL_RETAIN unsigned long gPermDataSize[2];
_GLOBAL struct AtnTerminal_typ gConsole;
_GLOBAL_RETAIN unsigned char gPermConfiguration[24000];
_GLOBAL_RETAIN unsigned char gPermHomeData[2000];
_GLOBAL struct SplitConfig_typ gSplitConfig;
_GLOBAL_RETAIN plcbit gDataValid[2];
_GLOBAL struct CSVFileMgr_typ gPermData[2];
_GLOBAL struct Persistence_typ gPersister[2];
_GLOBAL plcbit gSimulation;





__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Infrastructure/Infrastructure.var\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1755527880_19_ */

