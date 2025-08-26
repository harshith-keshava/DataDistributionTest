/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1756238066_22_
#define _BUR_1756238066_22_

#include <bur/plctypes.h>

/* Constants */
#ifdef _REPLACE_CONST
 #define MAI_FILEDEVICES 8U
 #define NUM_FILEDEVICES 9U
#else
 _LOCAL_CONST unsigned char MAI_FILEDEVICES;
 _LOCAL_CONST unsigned char NUM_FILEDEVICES;
#endif


/* Variables */
_BUR_LOCAL_RETAIN plcstring _buildDate[81];
_BUR_LOCAL plcstring alarmSnippet[81];
_BUR_LOCAL plcstring axisString[321];
_BUR_LOCAL plcstring indexString[321];
_BUR_LOCAL signed long i;
_BUR_LOCAL plcstring parameters[9][321];
_BUR_LOCAL plcstring directory[9][321];
_BUR_LOCAL plcstring fileDevice[9][21];
_BUR_LOCAL struct DevLink fileDeviceDevLink[9];
_BUR_LOCAL struct DevLink simCheckDevLink;





__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Infrastructure/FirstInitProg/FirstInitProg.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AS/FileIO/FileIO.fun\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1756238066_22_ */

