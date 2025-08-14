/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1755200719_12_
#define _BUR_1755200719_12_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
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
} PrintJobManagementCommands_typ;

typedef struct PrintJobManagementStatus_typ
{	plcbit distributionLayerRecieved;
	plcbit distributionLayerRequested;
	plcstring buildInfoValid[81];
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
	unsigned short currentLayerNumber;
	unsigned short lastRecoatedLayerNumber;
	unsigned short lastPrintedLayerNumber;
	plcbit newBuildInfoFileLoaded;
	unsigned short lastDistributedLayer;
} PrintJobManagementState_typ;

typedef struct PrintJobManagementAlarms_typ
{	struct vfAlarms_Instance_type FileLoadError_AL0023;
	struct vfAlarms_Instance_type FileSaveError_AL0024;
	struct vfAlarms_Instance_type BuildInfoValidRequired_AL0025;
} PrintJobManagementAlarms_typ;

typedef struct PrintJobManagement_typ
{	struct PrintJobManagementCommands_typ commands;
	struct PrintJobManagementStatus_typ status;
	struct PrintJobManagementState_typ currentState;
	struct PrintJobManagementAlarms_typ alarms;
} PrintJobManagement_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/ProcessControl/PrintJobManagement/Types.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1755200719_12_ */

