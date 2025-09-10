
TYPE
	IO_typ : 	STRUCT 
		di : DI_typ;
		do : DO_typ;
		ai : AI_typ;
		ao : AO_typ;
	END_STRUCT;
	DI_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	DO_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	AI_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	AO_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	Configuration_typ : 	STRUCT 
		Exists : BOOL;
		EnableDataCollection : BOOL := TRUE;
		MQTTServerUri : STRING[50];
		MQTTPort : UINT;
		MQTTClientPLC_IDName : STRING[80];
		MQTTClientTopic : STRING[100];
		MQTTClientPLCTopic : STRING[100];
		SubcribeQueSize : USINT;
	END_STRUCT;
	MonitoredValuesConfig_typ : 	STRUCT 
		_ : VF_COMMON_MonitoredValueCfg_typ;
	END_STRUCT;
	localInterface_typ : 	STRUCT 
		command : localInterfaceCommand_typ;
		status : localInterfaceStatus_typ;
		internal : localInterfaceInternal_typ;
	END_STRUCT;
	localInterfaceCommand_typ : 	STRUCT 
		restoreDefaultMvs : BOOL;
		publishMQTTData : BOOL;
		subscribeMQTTData : BOOL;
		WriteData : BOOL;
	END_STRUCT;
	localInterfaceStatus_typ : 	STRUCT 
		ready : BOOL;
		statusMessagePub : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		statusMessageSub : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		statusMessageWrite : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
		connectionError : BOOL;
		connectionOk : BOOL;
		pubState : PUB_STATE;
		pubSequence : PUB_SEQUENCE;
		subState : SUB_STATE;
		subSequence : SUB_SEQUENCE;
		writeState : WRITE_STATE;
		writeSequence : WRITE_SEQUENCE;
		timeStampGenerated : BOOL;
	END_STRUCT;
	localInterfaceInternal_typ : 	STRUCT 
		PLCOpenPub : AtnPlcOpenStatus;
		PLCOpenSub : AtnPlcOpenStatus;
		PLCOpenWrite : AtnPlcOpenStatus;
		previousStatePub : PUB_STATE;
		previousStateSub : SUB_STATE;
		newCommand : BOOL;
		newPubCommand : BOOL;
		newSubCommand : BOOL;
		newWriteCommand : BOOL;
		localLockout : BOOL;
		subSystemStatus : ARRAY[0..10]OF STRING[80];
		publishDataPar : MQTTPublishDataPar_typ;
		IotMqttParameters : IotMqttClientParType;
		IotMqttClient_0 : IotMqttClient;
		IotMqttPublish_0 : IotMqttPublish;
		IotMqttSubscribe_0 : IotMqttSubscribe;
		fb_JSONReadVarList : jsonReadVariableList;
		fb_JSONWriteVar : jsonWriteVariable;
		fb_JSONModify : jsonStructureForMqtt;
		IotMqttLink : IoTMqttComIdentType;
		publishEnable : BOOL;
		publishConnect : BOOL;
		reconnectTimer : TON;
		reconnectDelayTimer : TON;
		inhibitReason : STRING[150];
		jsonCache : jsonCache_typ;
		sequenceTimeout : TON;
		sequenceTimeoutSub : TON;
		subsrcibeReceivedTopic : STRING[80];
		populateDefault : BOOL;
		subsrcibeReceivedBuffer : STRING[10000];
		periodicDataCycle1Timer : TON;
		ii : USINT; (*Loop Index*)
		plcBooted : BOOL;
		previousPlcBooted : BOOL;
		notEnabled : BOOL;
		variableStructToPublish : STRING[250];
		totalPrintTimeMsec : TIME;
		variableListTopic : STRING[150];
	END_STRUCT;
	MV_enum : 
		( (*Monitored Values only for this local task. Start at 0*)
		_
		);
	PUB_STATE : 
		(
		PUB_STATE_NOT_READY := 0,
		PUB_STATE_READY,
		PUB_STATE_DONE,
		PUB_STATE_ERROR,
		PUB_STATE_PUBLISH_DATA
		);
	SUB_STATE : 
		(
		SUB_STATE_NOT_READY := 0,
		SUB_STATE_READY,
		SUB_STATE_DONE,
		SUB_STATE_ERROR,
		SUB_STATE_SUBSCRIBE_DATA
		);
	WRITE_STATE : 
		(
		STATE_NOT_READY := 0,
		STATE_READY,
		STATE_DONE,
		STATE_ERROR,
		STATE_WRITE_DATA
		);
	PUB_SEQUENCE : 
		(
		PUB_SEQ_IDLE := 0,
		PUB_SEQ_DONE,
		PUB_SEQ_ERROR,
		PUB_SEQ_READ_PLC_DATA,
		PUB_SEQ_READ_MOD_DATA,
		PUB_SEQ_ENABLE_PUBLISH,
		PUB_SEQ_SEND_DATA,
		PUB_SEQ_DISABLE_PUBLISH
		);
	SUB_SEQUENCE : 
		(
		SUB_SEQ_IDLE := 0,
		SUB_SEQ_DONE,
		SUB_SEQ_ERROR,
		SUB_SEQ_CHECK_ENABLED_SUB,
		SUB_SEQ_READ_DATA,
		SUB_SEQ_WRITE_DATA_QUEUE,
		SUB_SEQ_WRITE_PLC_DATA
		);
	WRITE_SEQUENCE : 
		(
		SEQ_IDLE := 0,
		SEQ_DONE,
		SEQ_ERROR,
		SEQ_WRITE_PLC_DATA
		);
END_TYPE
