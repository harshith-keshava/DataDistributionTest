/* Automation Studio generated header file */
/* Do not edit ! */
/* VF_COMMON 2.01.0 */

#ifndef _VF_COMMON_
#define _VF_COMMON_
#ifdef __cplusplus
extern "C" 
{
#endif
#ifndef _VF_COMMON_VERSION
#define _VF_COMMON_VERSION 2.01.0
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
#ifdef _SG3
		#include "astime.h"
		#include "AsBrStr.h"
		#include "standard.h"
		#include "LoopConR.h"
		#include "AsBrMath.h"
		#include "LoopCont.h"
		#include "MpBase.h"
		#include "MpAlarmX.h"
		#include "MTData.h"
#endif
#ifdef _SG4
		#include "astime.h"
		#include "AsBrStr.h"
		#include "standard.h"
		#include "LoopConR.h"
		#include "AsBrMath.h"
		#include "LoopCont.h"
		#include "MpBase.h"
		#include "MpAlarmX.h"
		#include "MTData.h"
#endif
#ifdef _SGC
		#include "astime.h"
		#include "AsBrStr.h"
		#include "standard.h"
		#include "LoopConR.h"
		#include "AsBrMath.h"
		#include "LoopCont.h"
		#include "MpBase.h"
		#include "MpAlarmX.h"
		#include "MTData.h"
#endif


/* Datatypes and datatypes of function blocks */
typedef enum LED_Colors
{	LED_OFF,
	LED_Green,
	LED_Yellow,
	LED_Red,
	LED_Blue,
	LED_Gray
} LED_Colors;

typedef enum VF_COMMON_DBDataTypes_enum
{	DT_BOOL_SQL_BIT,
	DT_USINT_SQL_TINYINT,
	DT_INT_SQL_SMALLINT,
	DT_UINT_SQL_INT,
	DT_DINT_SQL_INT,
	DT_UDINT_SQL_BIGINT,
	DT_REAL_SQL_REAL,
	DT_LREAL_SQL_FLOAT
} VF_COMMON_DBDataTypes_enum;

typedef struct VF_COMMON_LinearScale_typ
{	signed short RawMax;
	signed short RawMin;
	signed short RawOffset;
	float EngineeringMax;
	float EngineeringMin;
	plcstring EngineeringUnits[9];
	unsigned char DecimalPlaces;
} VF_COMMON_LinearScale_typ;

typedef struct VF_COMMON_Constraints_typ
{	plcbit EnableConstraints;
	float ScaledMax;
	float ScaledMin;
} VF_COMMON_Constraints_typ;

typedef struct VF_COMMON_Limit_typ
{	plcbit EnableLimit;
	float ScaledValue;
	float ScaledHysteresis;
} VF_COMMON_Limit_typ;

typedef struct VF_COMMON_LimitConfig_typ
{	struct VF_COMMON_Limit_typ UpperAlarm;
	struct VF_COMMON_Limit_typ UpperWarning;
	struct VF_COMMON_Limit_typ LowerWarning;
	struct VF_COMMON_Limit_typ LowerAlarm;
	unsigned short DelayAlarm_msec;
	unsigned short DelayWarning_msec;
	signed short MaxValidRawValue;
	signed short MinValidRawValue;
	plcbit EnableOutOfRange;
	unsigned short DelayOutOfRange_msec;
} VF_COMMON_LimitConfig_typ;

typedef struct VF_COMMON_LimitStatus
{	plcbit OverRange;
	plcbit UpperAlarmTripped;
	plcbit UpperWarningTripped;
	plcbit LowerWarningTripped;
	plcbit LowerAlarmTripped;
	plcbit UnderRange;
} VF_COMMON_LimitStatus;

typedef struct VF_COMMON_MonitoredValueCfg_typ
{	plcbit Used;
	unsigned short DB_CrossReference;
	plcstring DB_Name[33];
	plcstring DisplayName[41];
	plcbit UpdateConfiguration;
	unsigned long MovingWindowLength;
	struct VF_COMMON_LinearScale_typ Scale;
	struct VF_COMMON_LimitConfig_typ Limits;
} VF_COMMON_MonitoredValueCfg_typ;

typedef struct VF_COMMON_MonitoredValue_typ
{	plcbit Disabled;
	plcstring DB_Name[33];
	signed short RawValue;
	float ScaledValue;
	float ScaledValue_NonAveraged;
	plcbit ValueIsValid;
	plcbit AlarmsInhibited;
	struct VF_COMMON_LimitStatus Status;
	unsigned char LEDState;
	struct MTDataStatistics Statistics;
	plcbit Overflow;
	plcbit Underflow;
	plcbit AnalogBad;
} VF_COMMON_MonitoredValue_typ;

typedef struct VF_COMMON_ControlledValueCfg_typ
{	plcbit Used;
	unsigned short DB_CrossReference;
	plcstring DB_Name[33];
	plcstring DisplayName[41];
	plcbit UpdateConfiguration;
	struct VF_COMMON_LinearScale_typ Scale;
	struct VF_COMMON_Constraints_typ Constraints;
} VF_COMMON_ControlledValueCfg_typ;

typedef struct VF_COMMON_ControlledValue_typ
{	plcbit Disabled;
	plcstring DB_Name[33];
	float InputScaledValue;
	float ScaledValueConstrained;
	signed short RawValue;
} VF_COMMON_ControlledValue_typ;

typedef struct VF_COMMON_DatabaseValueCfg_typ
{	plcbit Used;
	unsigned short DB_CrossReference;
	plcstring DB_Name[33];
	plcstring DisplayName[51];
	plcstring EngineeringUnits[9];
	enum VF_COMMON_DBDataTypes_enum DataType;
	unsigned char DecimalPlaces;
} VF_COMMON_DatabaseValueCfg_typ;

typedef struct VF_COMMON_DatabaseValue_typ
{	plcbit Disabled;
	plcstring DB_Name[33];
	float Value;
} VF_COMMON_DatabaseValue_typ;

typedef struct VF_COMMON_TON_ScanMicrosec
{
	/* VAR_INPUT (analog) */
	unsigned long ScanTimeMicrosec;
	unsigned long PT;
	/* VAR_OUTPUT (analog) */
	unsigned long ET;
	/* VAR (analog) */
	unsigned long scanCountTarget;
	unsigned long scanCount;
	/* VAR_INPUT (digital) */
	plcbit IN;
	/* VAR_OUTPUT (digital) */
	plcbit Q;
	/* VAR (digital) */
	plcbit enabled;
} VF_COMMON_TON_ScanMicrosec_typ;

typedef struct VF_COMMON_PulseTrain
{
	/* VAR_INPUT (analog) */
	unsigned long StartDelay;
	unsigned long PulseOnTime;
	unsigned long PulseOffTime;
	unsigned short NumPulses;
	/* VAR_OUTPUT (analog) */
	unsigned short NumPulsesCompleted;
	/* VAR (analog) */
	struct TON TON_StartDelay;
	struct TON TON_OnState;
	struct TON TON_OffState;
	struct CTU CTU_PulseCounter;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit Done;
	plcbit PulseOutput;
	plcbit PulseOutputOneScan;
	/* VAR (digital) */
	plcbit startedPulses;
	plcbit pulseHistory;
	plcbit enabled;
} VF_COMMON_PulseTrain_typ;

typedef struct VF_COMMON_PulseTrainHiRes
{
	/* VAR_INPUT (analog) */
	unsigned long ScanTimeMicrosec;
	unsigned long StartDelay;
	unsigned long PulseOnTime;
	unsigned long PulseOffTime;
	unsigned short NumPulses;
	/* VAR_OUTPUT (analog) */
	unsigned short NumPulsesCompleted;
	/* VAR (analog) */
	struct VF_COMMON_TON_ScanMicrosec TON_StartDelay;
	struct VF_COMMON_TON_ScanMicrosec TON_OnState;
	struct VF_COMMON_TON_ScanMicrosec TON_OffState;
	struct CTU CTU_PulseCounter;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit Done;
	plcbit PulseOutput;
	plcbit PulseOutputOneScan;
	/* VAR (digital) */
	plcbit startedPulses;
	plcbit pulseHistory;
	plcbit enabled;
} VF_COMMON_PulseTrainHiRes_typ;

typedef struct VF_COMMON_ControlValue
{
	/* VAR_INPUT (analog) */
	struct VF_COMMON_ControlledValueCfg_typ* pValueConfig;
	struct VF_COMMON_ControlledValue_typ* pValue;
	/* VAR_OUTPUT (analog) */
	unsigned short InternalErrorCode;
	/* VAR (analog) */
	struct LCRLimScal fbLCRLimitScale;
	float tempScaledValue;
	signed short lastRawValue;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR (digital) */
	plcbit initialized;
	plcbit updateConfigComplete;
} VF_COMMON_ControlValue_typ;

typedef struct VF_COMMON_MonitorValue
{
	/* VAR_INPUT (analog) */
	signed short RawValue;
	struct VF_COMMON_MonitoredValueCfg_typ* pValueConfig;
	struct VF_COMMON_MonitoredValue_typ* pValue;
	/* VAR_OUTPUT (analog) */
	unsigned short InternalErrorCode;
	/* VAR (analog) */
	struct LCRLimScal fbLCRLimitScale;
	struct LC3PHy fbLC3PointHysteresisAlarm;
	struct LC3PHy fbLC3PointHysteresisWarning;
	struct TON fbTONRawValueValid;
	float scaledZero;
	signed short minValidRaw;
	signed short maxValidRaw;
	unsigned short outOfRangeDelay;
	unsigned short alarmDelay;
	unsigned short warningDelay;
	struct TON TON_OutOfRangeDelay;
	struct TON TON_AlarmDelay;
	struct TON TON_WarningDelay;
	unsigned short errorCode;
	signed short lastRawValue;
	float lastScaledValue;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	plcbit RawValueIsValid;
	plcbit InhibitAlarms;
	/* VAR (digital) */
	plcbit initialized;
	plcbit enableStatistics;
	plcbit enOutOfRange;
	plcbit haveOver;
	plcbit haveUnder;
	plcbit enUpperAlarm;
	plcbit enUpperWarn;
	plcbit enLowerWarn;
	plcbit enLowerAlarm;
	plcbit haveUpperAlarm;
	plcbit haveUpperWarn;
	plcbit haveLowerWarn;
	plcbit haveLowerAlarm;
} VF_COMMON_MonitorValue_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void VF_COMMON_TON_ScanMicrosec(struct VF_COMMON_TON_ScanMicrosec* inst);
_BUR_PUBLIC void VF_COMMON_PulseTrain(struct VF_COMMON_PulseTrain* inst);
_BUR_PUBLIC void VF_COMMON_PulseTrainHiRes(struct VF_COMMON_PulseTrainHiRes* inst);
_BUR_PUBLIC void VF_COMMON_ControlValue(struct VF_COMMON_ControlValue* inst);
_BUR_PUBLIC void VF_COMMON_MonitorValue(struct VF_COMMON_MonitorValue* inst);
_BUR_PUBLIC plcbit VF_COMMON_ConvertToHex(unsigned long valueToConvert, plcstring* outputHexString);
_BUR_PUBLIC plcbit VF_COMMON_IsValueInRange(double TargetValue, float Tolerance, double ValueToCompare);
_BUR_PUBLIC plcbit VF_COMMON_MpAlarmXToggle(struct MpComIdentType* MpLink, plcstring* Name, plcbit AlarmConditionActive, unsigned long* InstanceID);
_BUR_PUBLIC plcbit VF_COMMON_FileNameWithTimestamp(plcstring* BaseFileName, plcstring* FileExtension, plcdt CurrentDateAndTime, plcbit IncludeTime, plcstring* OutputFileName);


#ifdef __cplusplus
};
#endif
#endif /* _VF_COMMON_ */

