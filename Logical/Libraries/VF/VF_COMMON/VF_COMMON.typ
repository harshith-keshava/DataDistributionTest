
TYPE
	LED_Colors : 
		( (*Colors associated with status indicator LEDs*)
		LED_OFF,
		LED_Green,
		LED_Yellow,
		LED_Red,
		LED_Blue,
		LED_Gray
		);
	VF_COMMON_LinearScale_typ : 	STRUCT  (*Linear scale factor (raw=PLC units, engineering=user units)*)
		RawMax : INT; (*Max raw units*)
		RawMin : INT; (*Min raw units*)
		RawOffset : INT; (*Optional offset applied to raw value reading prior to scaling*)
		EngineeringMax : REAL; (*Max engineering units*)
		EngineeringMin : REAL; (*Min engineering units*)
		EngineeringUnits : STRING[8]; (*Engineering units descripton (e.g. 'kPa', 'degC', etc.)*)
		DecimalPlaces : USINT; (*Engineering value display decimal places*)
	END_STRUCT;
	VF_COMMON_Constraints_typ : 	STRUCT  (*Constraints used to further limit value entry to a reasonable range for the process*)
		EnableConstraints : BOOL; (*TRUE to enable constraints; FALSE to ignore these values*)
		ScaledMax : REAL; (*Max permitted value in engineering units (typically less than .Scale.EngineeringMax)*)
		ScaledMin : REAL; (*Min permitted value in engineering units (typically greater than .Scale.EngineeringMin)*)
	END_STRUCT;
	VF_COMMON_Limit_typ : 	STRUCT  (*Defines an alarm or warning limit value along with a hysteresis range surrounding it*)
		EnableLimit : BOOL; (*TRUE to enable the limit; FALSE to disable*)
		ScaledValue : REAL; (*The limit value in engineering units*)
		ScaledHysteresis : REAL; (*The hysteresis range that straddles the limit value (1/2 on either side)*)
	END_STRUCT;
	VF_COMMON_LimitConfig_typ : 	STRUCT  (*Limit definition for alarms and warnings*)
		UpperAlarm : VF_COMMON_Limit_typ;
		UpperWarning : VF_COMMON_Limit_typ;
		LowerWarning : VF_COMMON_Limit_typ;
		LowerAlarm : VF_COMMON_Limit_typ;
		DelayAlarm_msec : UINT; (*Time delay (msec) until alarm condition causes an alarm output (set to 0 for no delay)*)
		DelayWarning_msec : UINT; (*Time delay (msec) until warning condition causes an warning output (set to 0 for no delay)*)
		MaxValidRawValue : INT; (*Maximum valid raw value beyond which the OverRange status is turned ON*)
		MinValidRawValue : INT; (*Minimum valid raw value below which the UnderRange status is turned ON*)
		EnableOutOfRange : BOOL; (*TRUE to enable out of range detection; FALSE to disable*)
		DelayOutOfRange_msec : UINT; (*Time delay (msec) until an out of range condition causes an out of range output (set to 0 for no delay)*)
	END_STRUCT;
	VF_COMMON_LimitStatus : 	STRUCT  (*Status of value including alarms and warnings (if configured)*)
		OverRange : BOOL;
		UpperAlarmTripped : BOOL;
		UpperWarningTripped : BOOL;
		LowerWarningTripped : BOOL;
		LowerAlarmTripped : BOOL;
		UnderRange : BOOL;
	END_STRUCT;
	VF_COMMON_MonitoredValueCfg_typ : 	STRUCT  (*Input to the VF_COMMON_MonitoredValue function block*)
		Used : BOOL; (*Set to TRUE if the value is used in code; FALSE to disable (possibly for version-specific reasons)*)
		DB_CrossReference : UINT; (*Cross-reference integer value used by production database to identify this value*)
		DB_Name : STRING[32]; (*Cross-reference string value used by production database to identify this value*)
		DisplayName : STRING[40]; (*Display name of the monitored value*)
		UpdateConfiguration : BOOL; (*Set to TRUE to accept the new configuration; PLC sets to FALSE when new configuration applied*)
		MovingWindowLength : UDINT; (*Number of samples to average (0=disable averaging); use caution when changing at runtime!*)
		Scale : VF_COMMON_LinearScale_typ;
		Limits : VF_COMMON_LimitConfig_typ;
	END_STRUCT;
	VF_COMMON_MonitoredValue_typ : 	STRUCT  (*Input to the VF_COMMON_MonitorValue function block*)
		Disabled : BOOL; (*TRUE if the monitored value is disabled*)
		DB_Name : STRING[32]; (*Cross-reference string value used by production database to identify this value*)
		RawValue : INT; (*Input raw value to be scaled and monitored (typically received from an analog input)*)
		ScaledValue : REAL; (*Scaled engineering value (scaled by the PLC using the linear scaling defined in .Config.Scale), averaged by .MovingAverageSamples number of scans*)
		ScaledValue_NonAveraged : REAL; (*Scaled engineering value (scaled by the PLC using the linear scaling defined in .Config.Scale)*)
		ValueIsValid : BOOL; (*TRUE if the value is currently valid*)
		AlarmsInhibited : BOOL; (*Reflects the current state of the InhibitAlarms input*)
		Status : VF_COMMON_LimitStatus; (*Status of value including alarms and warnings (if configured)*)
		LEDState : USINT; (*LED color associated with the current status of the monitored value*)
		Statistics : MTDataStatistics; (*Statistics calculations based on the scaled value (only active if .MovingWindowLength > 0)*)
		Overflow : BOOL;
		Underflow : BOOL;
		AnalogBad : BOOL;
	END_STRUCT;
	VF_COMMON_ControlledValueCfg_typ : 	STRUCT  (*Input to the VF_COMMON_ControlValue function block*)
		Used : BOOL; (*Set to TRUE if the value is used in code; FALSE to disable (possibly for version-specific reasons)*)
		DB_CrossReference : UINT; (*Cross-reference integer value used by production database to identify this value*)
		DB_Name : STRING[32]; (*Cross-reference string value used by production database to identify this value*)
		DisplayName : STRING[40]; (*Display name of the controlled value*)
		UpdateConfiguration : BOOL; (*Set to TRUE to accept the new configuration; PLC sets to FALSE when new configuration applied*)
		Scale : VF_COMMON_LinearScale_typ;
		Constraints : VF_COMMON_Constraints_typ; (*If constraints are enabled, the InputScaledValue is constrained to withing these limits*)
	END_STRUCT;
	VF_COMMON_ControlledValue_typ : 	STRUCT  (*Input to the VF_COMMON_ControlValue function block*)
		Disabled : BOOL; (*TRUE if the controlled value is disabled*)
		DB_Name : STRING[32]; (*Cross-reference string value used by production database to identify this value*)
		InputScaledValue : REAL; (*Scaled engineering value to be (optionally constrained and) reverse scaled to the output raw value*)
		ScaledValueConstrained : REAL; (*Scaled engineering value after being optionally contstrained*)
		RawValue : INT; (*Output raw value typically sent to an analog output*)
	END_STRUCT;
	VF_COMMON_DBDataTypes_enum : 
		( (*Data types supported by machine data collection system.*)
		DT_BOOL_SQL_BIT, (*Store as SQL server 'bit' data type (0, 1) [packed into bytes]*)
		DT_USINT_SQL_TINYINT, (*Store as SQL server 'tinyint' (one byte, unsigned) (0..255)*)
		DT_INT_SQL_SMALLINT, (*Store as SQL server 'smallint' data type (2 bytes) (-32768..32767)*)
		DT_UINT_SQL_INT, (*Store as SQL server 'int' data type (4 bytes) (-2147483648..2147483647)*)
		DT_DINT_SQL_INT, (*Store as SQL server 'int' data type (4 bytes) (-2147483648..2147483647)*)
		DT_UDINT_SQL_BIGINT, (*Store as SQL server 'bigint' data type (8 bytes)*)
		DT_REAL_SQL_REAL, (*Store as SQL server 'real' data type (4 bytes) (3.4E+38)*)
		DT_LREAL_SQL_FLOAT (*Store as SQL server 'float' data type (4/8 bytes) (1.79E+308)*)
		);
	VF_COMMON_DatabaseValueCfg_typ : 	STRUCT  (*Data collection system value configuration*)
		Used : BOOL; (*Set to TRUE if the value is used in code; FALSE to disable (possibly for version-specific reasons)*)
		DB_CrossReference : UINT; (*Cross-reference integer value used by production database to identify this value*)
		DB_Name : STRING[32]; (*Cross-reference string value used by production database to identify this value*)
		DisplayName : STRING[50]; (*Display name of the controlled value*)
		EngineeringUnits : STRING[8]; (*Engineering units descripton (e.g. 'kPa', 'degC', etc.)*)
		DataType : VF_COMMON_DBDataTypes_enum;
		DecimalPlaces : USINT; (*Engineering value display decimal places*)
	END_STRUCT;
	VF_COMMON_DatabaseValue_typ : 	STRUCT  (*Data collection system value*)
		Disabled : BOOL; (*TRUE if the controlled value is disabled*)
		DB_Name : STRING[32]; (*Cross-reference string value used by production database to identify this value*)
		Value : REAL; (*Scaled engineering value to be (optionally constrained and) reverse scaled to the output raw value*)
	END_STRUCT;
END_TYPE
