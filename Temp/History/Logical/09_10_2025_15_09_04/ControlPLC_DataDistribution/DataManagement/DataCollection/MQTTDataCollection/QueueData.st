
ACTION QueueData:	
	
	// PUBLISH ===========================================================================================================
	
	//gMQTTApi.status.bufferHead is used to tell which message needs to get sent next
	//gMQTTApi.status.bufferTail is used to tell which message was added recently
		
	IF ((gMQTTApi.status.bufferHead <> gMQTTApi.status.bufferTail) OR gMQTTApi.status.bufferIsFull) AND stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) THEN
		sendMessage := TRUE;
	ELSE
		sendMessage := FALSE;
	END_IF
	
	//PUBLISH MESSAGE
	IF sendMessage AND NOT Command.Busy THEN 	
		Command.Command := gMQTTApi.commands.PublishData;
		CommandPars.VariableListToPublish := gDataCollectionQueue[gMQTTApi.status.bufferHead].VariableListToPublish;
		CommandPars.VariableDataToPublish := gDataCollectionQueue[gMQTTApi.status.bufferHead].VariableDataToPublish;
		CommandPars.TopicForVariableList := gDataCollectionQueue[gMQTTApi.status.bufferHead].TopicForVariableList;
		Command.pParameters := ADR(CommandPars);
		Command.sParameters := SIZEOF(CommandPars);
		Command.Execute := TRUE;
	END_IF
	
	//DEQUEUE WHEN MESSAGE IS PUBLISHED (OR ATTEMPTED TO BE PUBLISHED)
	IF Command.Done THEN
		gMQTTApi.status.bufferHead := (gMQTTApi.status.bufferHead + 1) MOD MAX_PUBLISH_STACK_SIZE;
		Command.Execute := FALSE;
		gMQTTApi.status.bufferIsFull := FALSE;
	ELSIF Command.Error OR Command.Aborted THEN
		gMQTTApi.status.bufferHead := (gMQTTApi.status.bufferHead + 1) MOD MAX_PUBLISH_STACK_SIZE;
		gMQTTApi.status.bufferIsFull := FALSE;
		Command.Execute := FALSE;
		vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, CommandPars.VariableListToPublish);
	END_IF
	
	Command();

	
	// SUBSCRIBE  ============================================================================================
	
	IF task.internal.IotMqttSubscribe_0.Info.MessagesInQueue > 0  AND stateAllFalse(gMQTTApi.inhibit.MQTTSubscribeInhibit,FALSE) AND NOT gMQTTApi.status.subBufferIsFull  THEN // have message queued in FB and no inhibit to subscribe
		receiveMessage := TRUE;
	ELSE
		receiveMessage := FALSE;
	END_IF
			
	//SUBSCRIBE MESSAGE
	IF receiveMessage AND NOT SubscribeCommand.Busy THEN 	
		SubscribeCommand.Command := gMQTTApi.commands.SubscribeData;
		SubscribeCommand.Execute := TRUE;
	END_IF
	
	IF SubscribeCommand.Done THEN
		SubscribeCommand.Execute := FALSE;
	ELSIF SubscribeCommand.Error OR SubscribeCommand.Aborted THEN
		SubscribeCommand.Execute := FALSE;
		vfAlarmEdge(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_SUBS_ERR_AL1405);
	END_IF
	
	SubscribeCommand();
	
	// WRITE TO PLC ============================================================================================
	
	IF ((gMQTTApi.status.subBufferHead <> gMQTTApi.status.subBufferTail) OR gMQTTApi.status.subBufferIsFull) THEN
		writeMessage := TRUE;
	ELSE
		writeMessage := FALSE;	
	END_IF
		
	//WRITE DATA
	IF writeMessage AND NOT WritePlcCommand.Busy THEN 	
		WritePlcCommand.Command := gMQTTApi.commands.WriteData;
		WritePlcCommand.Execute := TRUE;
	END_IF
	
	IF WritePlcCommand.Done THEN
		gMQTTApi.status.subBufferHead := (gMQTTApi.status.subBufferHead + 1) MOD MAX_SUBSCRIBE_STACK_SIZE;
		WritePlcCommand.Execute := FALSE;
	ELSIF WritePlcCommand.Error OR WritePlcCommand.Aborted THEN
		WritePlcCommand.Execute := FALSE;
		vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_JSON_WRITE_ERR_AL1406,gSubDataCollectionQueue[gMQTTApi.status.subBufferHead].ReceivedTopic);
		gMQTTApi.status.subBufferHead := (gMQTTApi.status.subBufferHead + 1) MOD MAX_SUBSCRIBE_STACK_SIZE;
	END_IF
	
	WritePlcCommand();
	
	gSubDataCollection := gSubDataCollection;
	
END_ACTION


