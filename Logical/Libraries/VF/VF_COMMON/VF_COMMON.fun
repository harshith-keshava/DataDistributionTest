
FUNCTION_BLOCK VF_COMMON_TON_ScanMicrosec (*Timer with a resolution of the calling task scan time*)
	VAR_INPUT
		IN : BOOL := FALSE; (*Set to enable the pulse train, reset to disable/reset*)
		ScanTimeMicrosec : UDINT := 2000; (*PLC task scan time*)
		PT : UDINT := 2000; (*Preset time (microseconds)*)
	END_VAR
	VAR_OUTPUT
		ET : UDINT := 2000; (*Elapsed time (microseconds)*)
		Q : BOOL := FALSE; (*TRUE when the timer is done*)
	END_VAR
	VAR
		scanCountTarget : UDINT := 0;
		scanCount : UDINT := 0;
		enabled : BOOL := FALSE;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK VF_COMMON_PulseTrain (*Generates a pulse train with a resolution of 10 msec*)
	VAR_INPUT
		Enable : BOOL := FALSE; (*Set to enable the pulse train, reset to disable/reset*)
		StartDelay : UDINT := 0; (*Delay (msec) to the start of the pulse train*)
		PulseOnTime : UDINT := 100; (*Pulse ON time (msec)*)
		PulseOffTime : UDINT := 100; (*Pulse OFF time (msec)*)
		NumPulses : UINT := 0; (*Number of pulses to produce (0=infinite)*)
	END_VAR
	VAR_OUTPUT
		NumPulsesCompleted : UINT := 0; (*Number of pulses completed so far (unless NumPulses=0)*)
		Done : BOOL := FALSE; (*TRUE when requested number of pulses has been completed (unless NumPulses=0)*)
		PulseOutput : BOOL := FALSE; (*Pulse output variable*)
		PulseOutputOneScan : BOOL := FALSE; (*Pulse output variable (TRUE for only one scan per pulse)*)
	END_VAR
	VAR
		TON_StartDelay : TON := (0);
		TON_OnState : TON := (0);
		TON_OffState : TON := (0);
		CTU_PulseCounter : CTU;
		startedPulses : BOOL := FALSE;
		pulseHistory : BOOL := FALSE;
		enabled : BOOL := FALSE;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK VF_COMMON_PulseTrainHiRes (*Generates a pulse train with a resolution of the calling task scan time*)
	VAR_INPUT
		Enable : BOOL := FALSE; (*Set to enable the pulse train, reset to disable/reset*)
		ScanTimeMicrosec : UDINT := 2000; (*PLC task scan time (microseconds)*)
		StartDelay : UDINT := 0; (*Delay (msec) to the start of the pulse train*)
		PulseOnTime : UDINT := 100; (*Pulse ON time (msec)*)
		PulseOffTime : UDINT := 100; (*Pulse OFF time (msec)*)
		NumPulses : UINT := 0; (*Number of pulses to produce (0=infinite)*)
	END_VAR
	VAR_OUTPUT
		NumPulsesCompleted : UINT := 0; (*Number of pulses completed so far (unless NumPulses=0)*)
		Done : BOOL := FALSE; (*TRUE when requested number of pulses has been completed (unless NumPulses=0)*)
		PulseOutput : BOOL := FALSE; (*Pulse output variable*)
		PulseOutputOneScan : BOOL := FALSE; (*Pulse output variable (TRUE for only one scan per pulse)*)
	END_VAR
	VAR
		TON_StartDelay : VF_COMMON_TON_ScanMicrosec;
		TON_OnState : VF_COMMON_TON_ScanMicrosec;
		TON_OffState : VF_COMMON_TON_ScanMicrosec;
		CTU_PulseCounter : CTU;
		startedPulses : BOOL := FALSE;
		pulseHistory : BOOL := FALSE;
		enabled : BOOL := FALSE;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION VF_COMMON_ConvertToHex : BOOL (*Converts an unsigned integer value to a hexidecimal string*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		valueToConvert : UDINT;
	END_VAR
	VAR_IN_OUT
		outputHexString : STRING[20];
	END_VAR
	VAR
		quotient : UDINT;
		remainder : UDINT;
		digitIndex : USINT;
	END_VAR
	VAR CONSTANT
		hexDigits : ARRAY[0..15] OF STRING[1] := ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	END_VAR
END_FUNCTION

FUNCTION VF_COMMON_IsValueInRange : BOOL (*Returns TRUE if specified position is within a defined tolerance band*)
	VAR_INPUT
		TargetValue : LREAL;
		Tolerance : REAL;
		ValueToCompare : LREAL;
	END_VAR
END_FUNCTION

FUNCTION VF_COMMON_MpAlarmXToggle : BOOL (*Sets or resets a named alarm based on CurrentState and InstanceID*)
	VAR_INPUT
		MpLink : MpComIdentType;
		Name : STRING[255];
		AlarmConditionActive : BOOL;
	END_VAR
	VAR_IN_OUT
		InstanceID : UDINT;
	END_VAR
END_FUNCTION

FUNCTION_BLOCK VF_COMMON_ControlValue (*Convert a scaled input value to a raw value (INT)*)
	VAR_INPUT
		Enable : BOOL := FALSE;
		pValueConfig : REFERENCE TO VF_COMMON_ControlledValueCfg_typ; (*Pointer to the controlled value configuration structure*)
		pValue : REFERENCE TO VF_COMMON_ControlledValue_typ; (*Pointer to the controlled value structure*)
	END_VAR
	VAR_OUTPUT
		InternalErrorCode : UINT; (*Error code from internal function blocks, or 0 for no error*)
	END_VAR
	VAR
		fbLCRLimitScale : LCRLimScal;
		initialized : BOOL := FALSE;
		updateConfigComplete : BOOL := FALSE;
		tempScaledValue : REAL;
		lastRawValue : INT := 0;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK VF_COMMON_MonitorValue (*Convert a raw input value (INT) to a scaled value and monitor it for warning/alarm limits with hysterisis*)
	VAR_INPUT
		Enable : BOOL := FALSE;
		RawValue : INT := 0; (*Raw input value to be monitored*)
		RawValueIsValid : BOOL := FALSE; (*Set to TRUE when the raw input value is a valid signal (i.e. when hardware signal is okay)*)
		InhibitAlarms : BOOL := FALSE; (*Set to TRUE to temporarily disable all limit checks (warning, alarm, and out of range)*)
		pValueConfig : REFERENCE TO VF_COMMON_MonitoredValueCfg_typ; (*Pointer to the monitored value configuration structure*)
		pValue : REFERENCE TO VF_COMMON_MonitoredValue_typ; (*Pointer to the monitored value structure*)
	END_VAR
	VAR_OUTPUT
		InternalErrorCode : UINT; (*Error code from internal function blocks, or 0 for no error*)
	END_VAR
	VAR
		fbLCRLimitScale : LCRLimScal;
		fbLC3PointHysteresisAlarm : LC3PHy;
		fbLC3PointHysteresisWarning : LC3PHy;
		fbTONRawValueValid : TON;
		initialized : BOOL := FALSE;
		scaledZero : REAL;
		enableStatistics : BOOL;
		minValidRaw : INT;
		maxValidRaw : INT;
		enOutOfRange : BOOL := FALSE;
		haveOver : BOOL := FALSE;
		haveUnder : BOOL := FALSE;
		enUpperAlarm : BOOL := FALSE;
		enUpperWarn : BOOL := FALSE;
		enLowerWarn : BOOL := FALSE;
		enLowerAlarm : BOOL := FALSE;
		haveUpperAlarm : BOOL := FALSE;
		haveUpperWarn : BOOL := FALSE;
		haveLowerWarn : BOOL := FALSE;
		haveLowerAlarm : BOOL := FALSE;
		outOfRangeDelay : UINT := 0;
		alarmDelay : UINT := 0;
		warningDelay : UINT := 0;
		TON_OutOfRangeDelay : TON;
		TON_AlarmDelay : TON;
		TON_WarningDelay : TON;
		errorCode : UINT;
		lastRawValue : INT := 0;
		lastScaledValue : REAL := 0.0;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION VF_COMMON_FileNameWithTimestamp : BOOL
	VAR_INPUT
		BaseFileName : STRING[100];
		FileExtension : STRING[10];
		CurrentDateAndTime : DATE_AND_TIME;
		IncludeTime : BOOL;
	END_VAR
	VAR_IN_OUT
		OutputFileName : STRING[150];
	END_VAR
	VAR
		dateTimeStruct : DTStructure;
		timeYEAR : STRING[4];
		timeMONTH : STRING[4];
		timeDAY : STRING[4];
		timeHOUR : STRING[4];
		timeMIN : STRING[4];
		timeSEC : STRING[4];
	END_VAR
END_FUNCTION
