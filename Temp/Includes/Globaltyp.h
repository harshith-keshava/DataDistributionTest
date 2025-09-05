/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1757102219_1_
#define _BUR_1757102219_1_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef enum MACHINE_OPERATIONS_ENUM
{	MACH_OP_NONE,
	MACH_OP_START_DISTRIBUTION,
	MACH_OP_ABORT_DISTRIBUTION
} MACHINE_OPERATIONS_ENUM;

typedef enum SYSTEM_GENERAL_STATUS_ENUM
{	PRINT_JOB_MANAGER_ERROR,
	BUILD_DISTRIBUTOR_ERROR,
	VFLCR_ERROR
} SYSTEM_GENERAL_STATUS_ENUM;

typedef struct Machine_typ
{	enum MACHINE_OPERATIONS_ENUM operation;
	enum MACHINE_OPERATIONS_ENUM _previousOperation;
} Machine_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Global.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1757102219_1_ */

