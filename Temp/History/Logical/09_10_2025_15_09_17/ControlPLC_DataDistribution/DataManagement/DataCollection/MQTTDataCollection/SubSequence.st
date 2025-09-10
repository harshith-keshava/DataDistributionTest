ACTION MQTTDataPublishSubSequence:
	
	CASE task.status.pubSequence OF
		PUB_SEQ_READ_PLC_DATA :
			task.internal.sequenceTimeout.PT := T#3S; // Sequence Timeout
			task.internal.sequenceTimeout.IN := TRUE;
				
			task.internal.fb_JSONReadVarList.pVariableList := ADR(task.internal.variableStructToPublish); // FIFO			
			task.internal.fb_JSONReadVarList.pCache := ADR(task.internal.jsonCache);	
			task.internal.fb_JSONReadVarList.BufferSize := 100000;
			task.internal.fb_JSONReadVarList.MaxIterations := 1000;
			task.internal.fb_JSONReadVarList();
			
			IF (task.internal.fb_JSONReadVarList.Status = 0) AND (task.internal.fb_JSONReadVarList.JSONObjectLength <> 0) THEN
				task.status.pubSequence := PUB_SEQ_READ_MOD_DATA;
			ELSIF task.internal.sequenceTimeout.Q THEN
				task.status.pubSequence := PUB_SEQ_ERROR;
				vfAlarmEdge(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_JSON_READ_ERROR_AL1402);
			END_IF
			
		PUB_SEQ_READ_MOD_DATA:
			task.internal.sequenceTimeout.PT := T#3S; // Sequence Timeout
			task.internal.sequenceTimeout.IN := TRUE;
						
			task.internal.fb_JSONModify.pJSONObjectIn := task.internal.fb_JSONReadVarList.pJSONObject; 		
			task.internal.fb_JSONModify.JSONObjectLengthIn := task.internal.fb_JSONReadVarList.JSONObjectLength;	
			task.internal.fb_JSONModify();
			
			IF (task.internal.fb_JSONModify.Status = 0) AND (task.internal.fb_JSONModify.JSONObjectLengthOut <> 0) THEN
				task.status.pubSequence := PUB_SEQ_ENABLE_PUBLISH;
			ELSIF task.internal.sequenceTimeout.Q OR (task.internal.fb_JSONModify.Status = 99) THEN
				task.status.pubSequence := PUB_SEQ_ERROR;
				vfAlarmEdge(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_JSON_READ_ERROR_AL1402);
			END_IF
			
				
		PUB_SEQ_ENABLE_PUBLISH :
			task.internal.sequenceTimeout.PT := T#3S; // Sequence Timeout
			task.internal.sequenceTimeout.IN := TRUE;
			
			task.internal.IotMqttPublish_0.Topic := ADR(task.internal.variableListTopic);
			task.internal.IotMqttPublish_0.Enable := TRUE; // Enable
			
			IF task.internal.IotMqttPublish_0.Active AND NOT task.internal.IotMqttPublish_0.Error THEN
				task.status.pubSequence := PUB_SEQ_SEND_DATA;
			ELSIF task.internal.sequenceTimeout.Q THEN	
				task.status.pubSequence := PUB_SEQ_ERROR;
				task.internal.IotMqttPublish_0.Enable := FALSE;
				vfAlarmEdge(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403);	
			END_IF	
		
		PUB_SEQ_SEND_DATA :
			task.internal.sequenceTimeout.PT := T#3S; // Sequence Timeout
			task.internal.sequenceTimeout.IN := TRUE;
			
			task.internal.IotMqttPublish_0.Send := TRUE; // Send Data
			task.internal.IotMqttPublish_0.SendTimeout := T#1500ms ; // Send Timeout 
			
			IF task.internal.IotMqttPublish_0.Active AND NOT task.internal.IotMqttPublish_0.Error AND task.internal.IotMqttPublish_0.Done THEN
				task.internal.IotMqttPublish_0.Send := FALSE;
				task.status.pubSequence := PUB_SEQ_DISABLE_PUBLISH;
			ELSIF task.internal.sequenceTimeout.Q THEN	
				task.status.pubSequence := PUB_SEQ_ERROR;
				task.internal.IotMqttPublish_0.Enable := FALSE;
				vfAlarmEdge(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403);
			END_IF
		
		PUB_SEQ_DISABLE_PUBLISH :
			task.internal.sequenceTimeout.PT := T#3S; // Sequence Timeout
			task.internal.sequenceTimeout.IN := TRUE;
			
			task.internal.IotMqttPublish_0.Enable := FALSE; // Disable
			
			IF NOT task.internal.IotMqttPublish_0.Active AND NOT task.internal.IotMqttPublish_0.Error THEN
				task.status.pubSequence := PUB_SEQ_DONE;
			ELSIF task.internal.sequenceTimeout.Q THEN	
				task.status.pubSequence := PUB_SEQ_ERROR;
				task.internal.IotMqttPublish_0.Enable := FALSE;
				vfAlarmEdge(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403);
			END_IF
		
	END_CASE

END_ACTION

ACTION MQTTDataSubscribeSubSequence:

	CASE task.status.subSequence OF
		SUB_SEQ_CHECK_ENABLED_SUB :
			task.internal.sequenceTimeoutSub.PT := T#3S; // Sequence Timeout
			task.internal.sequenceTimeoutSub.IN := TRUE;
			
			IF task.internal.IotMqttSubscribe_0.Active AND NOT task.internal.IotMqttSubscribe_0.Error THEN
				task.status.subSequence := SUB_SEQ_READ_DATA;
			ELSIF task.internal.sequenceTimeoutSub.Q THEN	
				task.status.subSequence := SUB_SEQ_ERROR;
				vfAlarmEdge(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_SUBS_ERR_AL1405);	
			END_IF	

		SUB_SEQ_READ_DATA :
			task.internal.sequenceTimeoutSub.PT := T#3S; // Sequence Timeout
			task.internal.sequenceTimeoutSub.IN := TRUE;
			
			task.internal.IotMqttSubscribe_0.Read := TRUE; // Read Data
			
			IF task.internal.IotMqttSubscribe_0.Active AND NOT task.internal.IotMqttSubscribe_0.Error AND task.internal.IotMqttSubscribe_0.MessageRetrieved THEN
				task.internal.IotMqttSubscribe_0.Read := FALSE;
				task.status.subSequence := SUB_SEQ_WRITE_DATA_QUEUE;
			ELSIF task.internal.sequenceTimeoutSub.Q THEN	
				task.status.subSequence := SUB_SEQ_ERROR;
				vfAlarmEdge(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_SUBS_ERR_AL1405);
			END_IF
			
		SUB_SEQ_WRITE_DATA_QUEUE:
			
			gSubDataCollectionQueue[gMQTTApi.status.subBufferTail].PayloadMessageReceived := task.internal.subsrcibeReceivedBuffer;
			gSubDataCollectionQueue[gMQTTApi.status.subBufferTail].ReceivedTopic := task.internal.subsrcibeReceivedTopic;
			
			gMQTTApi.status.subBufferTail := (gMQTTApi.status.subBufferTail + 1) MOD MAX_SUBSCRIBE_STACK_SIZE;
		
			IF gMQTTApi.status.subBufferTail = gMQTTApi.status.subBufferHead THEN
				gMQTTApi.status.subBufferIsFull := TRUE;
			END_IF
			
			task.status.subSequence := SUB_SEQ_DONE;
				
	END_CASE	
	
END_ACTION

ACTION MQTTDataWritePlcSubSequence:

	CASE task.status.writeSequence OF
		
		SEQ_WRITE_PLC_DATA :
			task.internal.sequenceTimeoutSub.PT := T#3S; // Sequence Timeout
			task.internal.sequenceTimeoutSub.IN := TRUE;
			
			task.internal.fb_JSONWriteVar.pJSONObject := ADR(task.internal.subsrcibeReceivedBuffer);	
			task.internal.fb_JSONWriteVar.MaxJSONObjectLength := 100000;
			task.internal.fb_JSONWriteVar.MaxIterations := 1000;
			task.internal.fb_JSONWriteVar();
			
			IF (task.internal.fb_JSONWriteVar.Status = 0) THEN
				task.status.writeSequence := SEQ_DONE;
			ELSIF task.internal.sequenceTimeoutSub.Q THEN
				task.status.writeSequence := SEQ_ERROR;
				vfAlarmEdge(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_JSON_WRITE_ERR_AL1406);
			END_IF
		
	END_CASE
	
END_ACTION