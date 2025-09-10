
TYPE
	MQTTSystem_typ : 	STRUCT 
		commands : MQTTSystemCommands_typ;
		status : MQTTSystemStatus_typ;
		inhibit : MQTTSystemInhibit_typ;
		state : MQTTSystemState_typ;
		alarms : MQTTSystemAlarms_typ;
	END_STRUCT;
	MQTTSystemCommands_typ : 	STRUCT 
		PublishData : STRING[80];
		SubscribeData : STRING[80];
		WriteData : STRING[80];
	END_STRUCT;
	MQTTSystemStatus_typ : 	STRUCT 
		subsystemsReady : STRING[80];
		MQTTEnabled : STRING[80];
		bufferTail : UINT;
		bufferHead : UINT;
		bufferIsFull : BOOL;
		subBufferTail : UINT;
		subBufferHead : UINT;
		subBufferIsFull : BOOL;
	END_STRUCT;
	MQTTSystemInhibit_typ : 	STRUCT 
		MQTTPublishInhibit : STRING[80];
		MQTTSubscribeInhibit : STRING[80];
	END_STRUCT;
	MQTTSystemState_typ : 	STRUCT 
		_ : USINT;
	END_STRUCT;
	MQTTSystemAlarms_typ : 	STRUCT 
		components : vfAlarms_Component_typ;
		MQTT_SW_CONNECTION_ERROR_AL1400 : vfAlarms_Instance_type;
		MQTT_SW_PUBLISH_INHIBIT_AL1401 : vfAlarms_Instance_type;
		MQTT_SW_JSON_READ_ERROR_AL1402 : vfAlarms_Instance_type;
		MQTT_SW_DATA_PUBLISH_ERR_AL1403 : vfAlarms_Instance_type;
		MQTT_SW_SUBSCRIBE_INHIBIT_AL1404 : vfAlarms_Instance_type;
		MQTT_SW_DATA_SUBS_ERR_AL1405 : vfAlarms_Instance_type;
		MQTT_SW_JSON_WRITE_ERR_AL1406 : vfAlarms_Instance_type;
		MQTT_SW_PRINT_NOT_ALLOWED_AL1407 : vfAlarms_Instance_type;
	END_STRUCT;
END_TYPE
