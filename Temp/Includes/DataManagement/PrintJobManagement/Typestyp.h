/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1765904570_13_
#define _BUR_1765904570_13_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef enum BuildPlatform_enum
{	PLATFORM_UNKNOWN = 0,
	PLATFORM_SMALL_200x600 = 1,
	PLATFORM_MEDIUM_400x600 = 2,
	PLATFORM_LARGE_600x600 = 3
} BuildPlatform_enum;

typedef struct BuildDistributorCommands_typ
{	plcstring distributeLayerFile[81];
	plcstring startDistribution[81];
	plcstring abortDistribution[81];
} BuildDistributorCommands_typ;

typedef struct BuildDistributorStatus_Typ
{	plcstring subsystemsReady[81];
	plcstring isConnected[81];
} BuildDistributorStatus_Typ;

typedef struct BuildDistributorAlarms_typ
{	struct vfAlarms_Component_typ components;
	struct vfAlarms_Instance_type BD_HEARTBEAT_LOST_AL;
} BuildDistributorAlarms_typ;

typedef struct BuildDistributor_typ
{	struct BuildDistributorCommands_typ commands;
	struct BuildDistributorStatus_Typ status;
	struct BuildDistributorAlarms_typ alarms;
} BuildDistributor_typ;

typedef struct PrintJobManagementCommands_typ
{	plcstring validatePrintFile[81];
	plcstring updateLayerNumber[81];
	plcstring resetPrintInfo[81];
	plcstring enableLOP[81];
	plcstring disableLOP[81];
} PrintJobManagementCommands_typ;

typedef struct PrintJobManagementStatus_typ
{	plcbit distributionLayerRecieved;
	plcbit distributionLayerRequested;
	plcbit loadPCIFileComplete;
	plcbit distributionLayerComplete;
	plcbit buildInfoValidCheck;
	plcstring buildInfoValid[81];
	plcstring currentLayerGCodeFilename[256];
	plcstring buildInfoInvalid[81];
	plcbit distributionActive;
} PrintJobManagementStatus_typ;

typedef struct PrintJobManagementState_typ
{	plcstring baseFilename[21];
	plcstring description[81];
	plcstring author[41];
	plcstring printOwner[41];
	plcstring buildInstanceID[41];
	plcstring configEditorBranch[21];
	plcstring configEditorVersion[21];
	plcstring rasterEngineBranch[21];
	plcstring rasterEngineVersion[21];
	unsigned long buildLayout;
	unsigned short printNumber;
	unsigned short numberOfLayers;
	float layerHeight;
	float encoderTickWidth;
	unsigned short maxLaserCount;
	float laserLineAngle;
	float headCenterOffset;
	float laserSpacing;
	float minLaserWatts;
	float maxLaserWatts;
	plcstring buildPlatformName[21];
	float currentPartHeight;
	unsigned short nextLayerNumber;
	unsigned short currentLayerNumber;
	unsigned short lastRecoatedLayerNumber;
	unsigned short lastPrintedLayerNumber;
	plcbit buildInfoCheckValid;
	plcbit newBuildInfoFileLoaded;
	unsigned short buildIteration;
	plcbit openAndCloseLayers;
	plcbit cleanerEngagedToScoops;
	unsigned short pixelMapFileVersion;
	unsigned short lastDistributedLayer;
} PrintJobManagementState_typ;

typedef struct PrintJobManagement_typ
{	struct PrintJobManagementCommands_typ commands;
	struct PrintJobManagementStatus_typ status;
	struct PrintJobManagementState_typ currentState;
} PrintJobManagement_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/DataManagement/PrintJobManagement/Types.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1765904570_13_ */

