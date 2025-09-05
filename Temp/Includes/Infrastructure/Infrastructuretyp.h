/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1757086158_16_
#define _BUR_1757086158_16_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef enum PERM_enum
{	PERM_CONFIGURATION,
	PERM_HOME_DATA,
	PERM_
} PERM_enum;

typedef struct AtnTerminal_typ
{	plcstring Command[81];
	plcstring Console[101][81];
	plcstring Overflow[11][81];
} AtnTerminal_typ;

typedef struct SplitConfig_typ
{	plcbit taskDataValid[100];
	unsigned char taskCount;
	plcstring configList[100][121];
	plcstring logFilename[100][261];
	plcstring configFilename[100][261];
} SplitConfig_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Infrastructure/Infrastructure.typ\\\" scope \\\"global\\\"\\n\"");

/* Additional IEC dependencies */
__asm__(".ascii \"iecdep \\\"Logical/Libraries/Loupe/csvfilelib/CSVFileLib.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecdep \\\"Logical/Libraries/Loupe/persist/Persist.var\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1757086158_16_ */

