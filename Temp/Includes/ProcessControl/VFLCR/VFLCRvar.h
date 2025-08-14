/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1755183251_14_
#define _BUR_1755183251_14_

#include <bur/plctypes.h>

/* Constants */
#ifdef _REPLACE_CONST
 #define MAI_VFLCR_TEST_TYPE 6U
 #define NUM_VFLCR_TEST_TYPE 7U
 #define MACHINE_MAI_POWER_SUPPLIES_TOTAL 10U
 #define MACHINE_NUM_POWER_SUPPLIES_TOTAL 11U
 #define MACHINE_MAI_LASERS_PER_RACK 20U
 #define MACHINE_NUM_LASERS_PER_RACK 21U
 #define MACHINE_MAI_LASER_RACKS 3U
 #define MACHINE_NUM_LASER_RACKS 4U
 #define VFLCR_POWER_COMMAND_RESOLUTION 255U
 #define VFLCR_MAI_LASERS 20U
 #define VFLCR_NUM_LASERS 21U
 #define VFLCR_MAI_POWER_SUPPLIES 2U
 #define VFLCR_NUM_POWER_SUPPLIES 3U
#else
 _GLOBAL_CONST unsigned char MAI_VFLCR_TEST_TYPE;
 _GLOBAL_CONST unsigned char NUM_VFLCR_TEST_TYPE;
 _GLOBAL_CONST unsigned char MACHINE_MAI_POWER_SUPPLIES_TOTAL;
 _GLOBAL_CONST unsigned char MACHINE_NUM_POWER_SUPPLIES_TOTAL;
 _GLOBAL_CONST unsigned char MACHINE_MAI_LASERS_PER_RACK;
 _GLOBAL_CONST unsigned char MACHINE_NUM_LASERS_PER_RACK;
 _GLOBAL_CONST unsigned char MACHINE_MAI_LASER_RACKS;
 _GLOBAL_CONST unsigned char MACHINE_NUM_LASER_RACKS;
 _GLOBAL_CONST unsigned short VFLCR_POWER_COMMAND_RESOLUTION;
 _GLOBAL_CONST unsigned char VFLCR_MAI_LASERS;
 _GLOBAL_CONST unsigned char VFLCR_NUM_LASERS;
 _GLOBAL_CONST unsigned char VFLCR_MAI_POWER_SUPPLIES;
 _GLOBAL_CONST unsigned char VFLCR_NUM_POWER_SUPPLIES;
#endif


/* Variables */
_GLOBAL struct OPCUAData_FROM_Gen3CalibApp_typ gOpcData_FromGen3CalibApp;
_GLOBAL struct OPCUAData_TO_Gen3CalibApp_typ gOpcData_ToGen3CalibApp;
_GLOBAL_RETAIN enum VFLCR_TEST_TYPE gManualPulseTypeSelected;
_GLOBAL struct LaserSnippets_typ gLaserSnippets;
_GLOBAL struct VFLCRApi_typ gVFLCR;
_GLOBAL unsigned char gmapPixel_to_Laser[101];
_GLOBAL unsigned char gmapPixel_to_Rack[101];
_GLOBAL unsigned char gmapRackLaser_to_Pixel[4][21];
_GLOBAL float OPTICS_BOX_PIXEL_XY_OFFSET;
_GLOBAL unsigned char MACHINE_MAI_LASERS_TOTAL;
_GLOBAL unsigned char MACHINE_NUM_LASERS_TOTAL;





__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/ProcessControl/VFLCR/VFLCR.var\\\" scope \\\"global\\\"\\n\"");

/* Additional IEC dependencies */
__asm__(".ascii \"iecdep \\\"Logical/ProcessControl/VFLCR/VFLCR.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1755183251_14_ */

