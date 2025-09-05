/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1757086158_12_
#define _BUR_1757086158_12_

#include <bur/plctypes.h>

/* Constants */
#ifdef _REPLACE_CONST
 #define DIGITAL_PCI_MAX_LAYER_CHANGE 8U
 #define DIGITAL_PCI_MAX_PARS 9U
 #define LAYER_ACTION_PRINT "PRINT"
 #define LAYER_ACTION_RECOAT "RECOAT"
 #define LAYER_ACTION_START "START"
 #define MAX_LAYER_HEIGHT 0.072f
 #define MIN_LAYER_HEIGHT 0.05f
#else
 _GLOBAL_CONST unsigned char DIGITAL_PCI_MAX_LAYER_CHANGE;
 _GLOBAL_CONST unsigned char DIGITAL_PCI_MAX_PARS;
 _GLOBAL_CONST plcstring LAYER_ACTION_PRINT[11];
 _GLOBAL_CONST plcstring LAYER_ACTION_RECOAT[11];
 _GLOBAL_CONST plcstring LAYER_ACTION_START[11];
 _GLOBAL_CONST float MAX_LAYER_HEIGHT;
 _GLOBAL_CONST float MIN_LAYER_HEIGHT;
#endif


/* Variables */

#ifdef _BUR_USE_DECLARATION_IN_IEC
_GLOBAL struct DerivedProcessParameters_typ gDerivedProcessParameters[9];
#else
/* Variable gDerivedProcessParameters not declared. Array variables with starting indexes not equal to zero cannot be used in ANSI C programs / libraries.*/
#endif
_GLOBAL plcbit gPrintProcessConfigLoaded;
_GLOBAL struct PrintProcessConfig_typ gPrintProcessConfig;
_GLOBAL float gLdsFocalOffset;
_GLOBAL float gMinimumFocalLimit;
_GLOBAL float gMaximumFocalLimit;
_GLOBAL_RETAIN struct PrintJobManagementState_typ Nonvolatile;
_GLOBAL struct BuildDistributor_typ gBuildDistributorApi;
_GLOBAL struct BuildInformation_typ gBuildInformation;
_GLOBAL struct PrintJobManagement_typ gPrintJobManagement;
_GLOBAL struct OPCUAData_FROM_BuildPC_typ gOpcData_FromBuildPC;
_GLOBAL struct OPCUAData_TO_BuildPC_typ gOpcData_ToBuildPC;





__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/ProcessControl/PrintJobManagement/Variables.var\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1757086158_12_ */

