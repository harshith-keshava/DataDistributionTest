/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1757086158_15_
#define _BUR_1757086158_15_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef struct SystemRecipeCommand_typ
{	plcstring loadBuildInfo[81];
	plcstring loadCustomScanFile[81];
	plcstring loadPrintProcessConfigFile[81];
} SystemRecipeCommand_typ;

typedef struct SystemRecipeEvents_typ
{	plcstring buildInfoLoaded[81];
	plcstring customScanLoaded[81];
} SystemRecipeEvents_typ;

typedef struct SystemRecipeManager_typ
{	struct SystemRecipeCommand_typ commands;
	struct SystemRecipeEvents_typ events;
} SystemRecipeManager_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/ProcessControl/PrintJobManagement/RecipeManagement.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1757086158_15_ */

