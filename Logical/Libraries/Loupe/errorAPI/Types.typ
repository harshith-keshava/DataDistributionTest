
TYPE
	errWrap_typ : 	STRUCT 
		in : errWrapIn_typ;
		out : errWrapOut_typ;
		internal : errWrapInternal_typ;
	END_STRUCT;
	errWrapIn_typ : 	STRUCT 
		cmd : errWrapInCmd_typ;
		par : errWrapInPar_typ;
		cfg : errWrapInCfg_typ;
	END_STRUCT;
	errWrapInCmd_typ : 	STRUCT 
		acknowledgeError : BOOL;
		acknowledgeAllAlarms : BOOL;
		exportHistory : BOOL;
	END_STRUCT;
	errWrapInPar_typ : 	STRUCT 
		coreMpLink : REFERENCE TO MpComIdentType;
		histMpLink : REFERENCE TO MpComIdentType;
		uiHistSetup : MpAlarmXHistoryUISetupType;
		uiCoreSetup : MpAlarmXListUISetupType;
	END_STRUCT;
	errWrapInCfg_typ : 	STRUCT 
		logSeverity : UDINT;
		errorSeverity : UDINT;
	END_STRUCT;
	errWrapAlarmOut_typ : 	STRUCT 
		scope : STRING[255];
		name : STRING[255];
		message : STRING[255];
		additionalInfo : STRING[255];
		code : UDINT;
		instance : UDINT;
		severity : UDINT;
		timeStamp : STRING[50];
		codeString : STRING[7];
	END_STRUCT;
	errWrapOut_typ : 	STRUCT 
		activeAlarms : UINT;
		error : BOOL;
		errorID : UINT;
		errorString : STRING[320];
		activeAlarmInfo : ARRAY[0..ERRWRAP_MAI_ERRORS_DISP]OF errWrapAlarmOut_typ;
		alarmPresent : BOOL;
		wStrMessage : ARRAY[0..ERRWRAP_MAI_ERRORS_DISP]OF WSTRING[255];
		wStrAdditionalInfo : ARRAY[0..ERRWRAP_MAI_ERRORS_DISP]OF WSTRING[255];
	END_STRUCT;
	errWrapInternal_typ : 	STRUCT 
		userAlarms : ARRAY[0..ERRWRAP_MAI_ERRORS]OF errWrapInternalAlarm_typ;
		activeAlarms : UINT;
		initialized : BOOL;
		id : UDINT;
		coreMpLink : REFERENCE TO MpComIdentType;
		histMpLink : MpComIdentType;
		exportHistory : BOOL;
		resetErrors : BOOL;
		mpAlarmX : REFERENCE TO MpAlarmXCore;
		mpAlarmXHistory : MpAlarmXHistory;
		mpAlarmXListUI : MpAlarmXListUI;
		mpAlarmXHistoryUI : MpAlarmXHistoryUI;
		resetErrorCounter : USINT;
		resetCounter : USINT;
		uiHistConnect : MpAlarmXHistoryUIConnectType;
		uiCoreConnect : MpAlarmXListUIConnectType;
		mpAcknowledgeAll : MpAlarmXAcknowledgeAll;
		previousActiveCount : UINT;
		alarmListLoopIndex : USINT;
		alarmListActiveCount : USINT;
		_previousAlarmMessage : STRING[255];
		_previousAlarmMessageList : ARRAY[0..ERRWRAP_MAI_ERRORS_DISP]OF STRING[255];
		_previousAlarmListActiveCount : USINT;
		_previousWrapperAlarmActiveCount : USINT;
	END_STRUCT;
	errWrapInternalAlarm_typ : 	STRUCT 
		name : STRING[80];
		active : BOOL;
		set : BOOL;
		id : UDINT;
		configure : MpAlarmXConfigAlarm;
		behavoir : MpAlarmXAlarmConfigType;
		acknowledge : UDINT;
		timeStamp : DATE_AND_TIME;
	END_STRUCT;
	alarmX_ST_enum : 
		(
		ALARMX_IDLE_ST,
		ALARMX_EXPORT_HISTORY_ST,
		ALARMX_RESET_FUBS_ST,
		ALARMX_ACK_ALL_ST,
		ALARMX_RESET_ALARMS_ST
		);
END_TYPE
