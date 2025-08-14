/* Automation Studio generated header file */
/* Do not edit ! */
/* VFValve  */

#ifndef _VFVALVE_
#define _VFVALVE_
#ifdef __cplusplus
extern "C" 
{
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
/* Datatypes and datatypes of function blocks */
typedef enum vfValveBasicStates_typ
{	vfVALVE_BASIC_WAIT_FOR_COMMANDS,
	vfVALVE_BASIC_OPEN,
	vfVALVE_BASIC_CLOSE,
	vfVALVE_BASIC_CYCLE_OPEN,
	vfVALVE_BASIC_CYCLE_CLOSE,
	vfVALVE_BASIC_STOP,
	vfVALVE_BASIC_ERROR
} vfValveBasicStates_typ;

typedef struct vfValveBasicInternal_typ
{	struct TON valveTimeOutTimer;
	struct TON valveCycleTimer;
	enum vfValveBasicStates_typ valveState;
	enum vfValveBasicStates_typ valveErrorState;
	struct TON actuationDelayTimer;
	plcbit oldDoOpen;
	plcbit oldDoClose;
} vfValveBasicInternal_typ;

typedef struct ValveParameters_typ
{	plctime TimeOutValue;
	plcbit hasLimitSensors;
	plcbit enabled;
	plctime actuationDelay;
	unsigned long cycleTime;
} ValveParameters_typ;

typedef struct ValveCommands_typ
{	plcbit open;
	plcbit close;
	plcbit cycle;
	plcbit stop;
	plcbit errReset;
} ValveCommands_typ;

typedef struct vfValveBasicInputs_typ
{	plcbit closeLimitSensor;
	plcbit openLimitSensor;
	struct ValveParameters_typ* adrParameters;
	struct ValveParameters_typ parameters;
	struct ValveCommands_typ* adrCommands;
	struct ValveCommands_typ commands;
} vfValveBasicInputs_typ;

typedef struct ValveStatus_typ
{	plcbit busy;
	plcbit opened;
	plcbit closed;
	plcbit middle;
	plcbit cycling;
	plcbit leftOpened;
	plcbit leftClosed;
	plcbit leftMiddle;
	plcbit rightOpened;
	plcbit rightClosed;
	plcbit rightMiddle;
	plcbit frontLeftOpened;
	plcbit rearLeftOpened;
	plcbit frontLeftClosed;
	plcbit rearLeftClosed;
	plcbit frontLeftMiddle;
	plcbit rearLeftMiddle;
	plcbit frontRightOpened;
	plcbit rearRightOpened;
	plcbit frontRightClosed;
	plcbit rearRightClosed;
	plcbit frontRightMiddle;
	plcbit rearRightMiddle;
	plcbit doOpen;
	plcbit doClose;
	plcbit readyForCommand;
	plcbit safeEnabled;
	plcbit error;
	plcbit reachedFullOpen;
	plcstring fbState[21];
	unsigned long actualCycleTimeMsec;
} ValveStatus_typ;

typedef struct vfValveBasicOutputs_typ
{	plcbit OpenValveSignal;
	plcbit CloseValveSignal;
	struct ValveStatus_typ status;
} vfValveBasicOutputs_typ;

typedef struct ValveHandling_typ
{	struct ValveCommands_typ commands;
	struct ValveParameters_typ parameters;
	struct ValveStatus_typ status;
} ValveHandling_typ;

typedef struct vfValveBasic
{
	/* VAR_INPUT (analog) */
	struct vfValveBasicInputs_typ Inputs;
	/* VAR_OUTPUT (analog) */
	struct vfValveBasicOutputs_typ Outputs;
	/* VAR (analog) */
	struct ValveCommands_typ* pCommandWriteBack;
	struct vfValveBasicInternal_typ internal;
} vfValveBasic_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void vfValveBasic(struct vfValveBasic* inst);


#ifdef __cplusplus
};
#endif
#endif /* _VFVALVE_ */

