/* Automation Studio generated header file */
/* Do not edit ! */
/* AxisLib 4.02.0 */

#ifndef _AXISLIB_
#define _AXISLIB_
#ifdef __cplusplus
extern "C" 
{
#endif
#ifndef _AxisLib_VERSION
#define _AxisLib_VERSION 4.02.0
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
#ifdef _SG3
		#include "McAcpAx.h"
		#include "McAxis.h"
#endif
#ifdef _SG4
		#include "McAcpAx.h"
		#include "McAxis.h"
#endif
#ifdef _SGC
		#include "McAcpAx.h"
		#include "McAxis.h"
#endif


/* Constants */
#ifdef _REPLACE_CONST
 #define WAYPOINT_NUM 10U
 #define WAYPOINT_MAI 9U
 #define AXLIB_STRLEN_NAME 120U
#else
 _GLOBAL_CONST unsigned char WAYPOINT_NUM;
 _GLOBAL_CONST unsigned char WAYPOINT_MAI;
 _GLOBAL_CONST unsigned short AXLIB_STRLEN_NAME;
#endif




/* Datatypes and datatypes of function blocks */
typedef enum AXISLIB_REFST_enum
{	AXISLIB_REFST_START,
	AXISLIB_REFST_START_CHECK,
	AXISLIB_REFST_START_INIT,
	AXISLIB_REFST_START_HOME,
	AXISLIB_REFST_IDLE,
	AXISLIB_REFST_REF_INIT,
	AXISLIB_REFST_REF_HOME
} AXISLIB_REFST_enum;

typedef struct AxisStatus_Int_typ
{	struct MC_BR_ProcessParam ReadAxisLimits;
	struct MC_ReadActualPosition ReadActualPosition;
	struct MC_ReadActualVelocity ReadActualVelocity;
	struct MC_ReadAxisInfo ReadAxisInfo;
	struct MC_BR_GetAxisLibraryInfo ReadLibraryInfo;
} AxisStatus_Int_typ;

typedef struct AxisLib_AxisInfo_typ
{	plcstring libraryInfo[33];
	struct McAddInfoType AdditionalInfo;
	struct McCfgAxMoveLimType AxisLimits;
} AxisLib_AxisInfo_typ;

typedef struct AxisLib_AxisState_typ
{	plcbit Simulation;
	plcbit CommunicationReady;
	plcbit IsHomed;
	plcbit Referenced;
	plcbit ReadyForPowerOn;
	plcbit PowerOn;
	plcbit HomeDataValid;
	plcbit MotionInhibited;
	plcbit AxisWarning;
} AxisLib_AxisState_typ;

typedef struct AxisLib_PLCOpenState_typ
{	plcbit Errorstop;
	plcbit Disabled;
	plcbit StandStill;
	plcbit Stopping;
	plcbit Homing;
	plcbit DiscreteMotion;
	plcbit SynchronizedMotion;
	plcbit ContinuousMotion;
} AxisLib_PLCOpenState_typ;

typedef struct AxisStatus
{
	/* VAR_INPUT (analog) */
	struct McAxisType* Axis;
	/* VAR_OUTPUT (analog) */
	double Position;
	float Velocity;
	struct AxisLib_AxisInfo_typ Info;
	unsigned short ErrorID;
	/* VAR (analog) */
	struct AxisStatus_Int_typ internal;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit AxisWarning;
	plcbit CommunicationReady;
	plcbit IsHomed;
	plcbit PowerOn;
	plcbit ReadyForPowerOn;
	plcbit Simulation;
	plcbit Valid;
	plcbit Busy;
	plcbit Error;
} AxisStatus_typ;

typedef struct AxisReference_Int_typ
{	plcbit clearReference;
	plcbit needToClearReference;
	plcbit oldCommunicationReady;
	unsigned long oldStartupCount;
	plcbit reference;
	struct McAcpAxRestorePosType restorePos;
	enum AXISLIB_REFST_enum state;
	struct MC_BR_CheckRestorePositionData CheckRestorePos;
	struct MC_BR_InitHome_AcpAx InitHome;
	struct MC_Home Home;
	struct AxisStatus Status;
	plcbit initHomeSupported;
} AxisReference_Int_typ;

typedef struct AxisBasic_IN_CMD_typ
{	plcbit Power;
	plcbit Reference;
	plcbit MoveAbsolute;
	plcbit MoveAdditiveForward;
	plcbit MoveAdditiveReverse;
	plcbit MoveVelocity;
	plcbit MoveWaypoint;
	plcbit JogForward;
	plcbit JogReverse;
	plcbit InhibitMotion;
	plcbit Halt;
	plcbit Stop;
	plcbit ClearReference;
	plcbit ErrorReset;
	plcbit WaitToInitializeReference;
	plcbit SaveParameters;
	plcbit LoadParameters;
	plcbit SaveWaypoints;
	plcbit LoadWaypoints;
	plcbit EnableSwEndLimits;
	plcbit DisableSwEndLimits;
} AxisBasic_IN_CMD_typ;

typedef struct AxisBasic_IN_PAR_typ
{	double Position;
	float Distance;
	float Velocity;
	float Acceleration;
	float Deceleration;
	McDirectionEnum Direction;
	float JogVelocity;
	float JogAcceleration;
	float JogDeceleration;
	float JogJerk;
	unsigned char WaypointIndex;
	unsigned long pInitHomingData;
	unsigned long szInitHomingData;
} AxisBasic_IN_PAR_typ;

typedef struct AxisBasic_IN_CFG_typ
{	plcstring Name[121];
	plcbit Active;
	double HomingPosition;
	McHomingModeEnum HomingMode;
	double DefaultPosition;
	float StopDeceleration;
	plcbit DisableLagRead;
} AxisBasic_IN_CFG_typ;

typedef struct AxisBasic_IN_typ
{	struct AxisBasic_IN_CMD_typ CMD;
	struct AxisBasic_IN_PAR_typ PAR;
	struct AxisBasic_IN_CFG_typ CFG;
} AxisBasic_IN_typ;

typedef struct AxisBasic_OUT_typ
{	plcstring Name[121];
	plcbit Active;
	plcbit Busy;
	plcbit Done;
	plcbit Error;
	signed long ErrorID;
	unsigned short ErrorCount;
	plcbit Warning;
	double Position;
	float Velocity;
	float Lag;
	struct AxisLib_AxisState_typ State;
	McAxisPLCopenStateEnum PLCOpen;
	struct AxisLib_PLCOpenState_typ PLCOpenDiscrete;
	struct AxisLib_AxisInfo_typ Info;
} AxisBasic_OUT_typ;

typedef struct AxisBasic_TEST_STAT_typ
{	plcbit Busy;
	plcbit Done;
	plcbit Warning;
	plcbit Error;
	unsigned short ErrorCount;
	unsigned short ErrorID;
	double ActualPosition;
	float ActualVelocity;
	plcbit CommunicationReady;
	plcbit PowerOn;
	plcbit IsHomed;
} AxisBasic_TEST_STAT_typ;

typedef struct AxisBasic_TEST_typ
{	plcbit Enable;
	struct AxisBasic_IN_CMD_typ CMD;
	struct AxisBasic_IN_PAR_typ PAR;
	struct AxisBasic_TEST_STAT_typ STAT;
} AxisBasic_TEST_typ;

typedef struct AxisReference
{
	/* VAR_INPUT (analog) */
	struct McAxisType* Axis;
	unsigned long RestorePositionVariableAddress;
	double DefaultPosition;
	double Position;
	unsigned char HomingMode;
	unsigned long pInitHomingData;
	unsigned long szInitHomingData;
	plcstring Library[33];
	/* VAR_OUTPUT (analog) */
	unsigned short ErrorID;
	/* VAR (analog) */
	struct AxisReference_Int_typ internal;
	/* VAR_INPUT (digital) */
	plcbit WaitToInitialize;
	plcbit Reference;
	plcbit ClearReference;
	/* VAR_OUTPUT (digital) */
	plcbit Done;
	plcbit Busy;
	plcbit CommandAborted;
	plcbit Error;
	plcbit Referenced;
	plcbit DataValid;
} AxisReference_typ;

typedef struct AxisBasic_Int_FUB_typ
{	struct AxisStatus Status;
	struct MC_Power Power;
	struct AxisReference Reference;
	struct MC_Home Home;
	struct MC_MoveAbsolute MoveAbsolute;
	struct MC_MoveAbsolute MoveWaypoint;
	struct MC_MoveAdditive MoveAdditive;
	struct MC_MoveVelocity MoveVelocity;
	struct MC_BR_JogLimitPosition Jog;
	struct MC_Halt Halt;
	struct MC_Stop Stop;
	struct MC_ReadAxisError ReadAxisError;
	struct MC_Reset Reset;
	struct MC_WriteParameter WriteParameter;
	struct MC_BR_CyclicProcessParID_AcpAx CyclicRead;
} AxisBasic_Int_FUB_typ;

typedef struct AxisBasic_Internal_typ
{	struct AxisBasic_Int_FUB_typ FUB;
	plcbit ResetOK;
	plcbit FubError;
	struct McAcpAxCycParIDType CyclicReadPar;
} AxisBasic_Internal_typ;

typedef struct AxisBasic_typ
{	struct McAxisType* pAxisObject;
	unsigned long pRestorePosition;
	struct AxisBasic_IN_typ IN;
	struct AxisBasic_OUT_typ OUT;
	struct AxisBasic_TEST_typ TEST;
	struct AxisBasic_Internal_typ Internal;
} AxisBasic_typ;

typedef struct AxisBasic_WayPoint_typ
{	plcstring Name[121];
	double Position;
	float Velocity;
	float Acceleration;
	float Deceleration;
	float Jerk;
	McDirectionEnum Direction;
} AxisBasic_WayPoint_typ;

typedef struct AxisBasic_ApiIn_typ
{	struct AxisBasic_IN_CMD_typ CMD;
	struct AxisBasic_IN_PAR_typ PAR;
	struct AxisBasic_WayPoint_typ Waypoint[10];
} AxisBasic_ApiIn_typ;

typedef struct AxisBasic_Api_typ
{	struct McAxisType* pAxisObject;
	unsigned long pRestorePosition;
	struct AxisBasic_ApiIn_typ IN;
	struct AxisBasic_OUT_typ OUT;
} AxisBasic_Api_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void AxisStatus(struct AxisStatus* inst);
_BUR_PUBLIC void AxisReference(struct AxisReference* inst);
_BUR_PUBLIC plcbit AxisBasicCyclic(struct AxisBasic_Api_typ* interface, struct AxisBasic_IN_CFG_typ* configuration, struct AxisBasic_Internal_typ* internal);


#ifdef __cplusplus
};
#endif
#endif /* _AXISLIB_ */

