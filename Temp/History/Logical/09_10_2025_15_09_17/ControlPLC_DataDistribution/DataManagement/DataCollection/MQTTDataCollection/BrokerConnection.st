
ACTION BrokerConnection: 
	
	// Default configuration
	IF task.internal.populateDefault THEN
		task.internal.populateDefault := FALSE;
		Configuration.MQTTServerUri 		:= '10.68.1.174';
		Configuration.MQTTClientPLCTopic 	:= CONCAT (gConfiguration.machineIdentity.machineName,'/PLC_ClientTopic');
		Configuration.MQTTPort 				:= 30576;
		Configuration.SubcribeQueSize 		:= 50;
	END_IF	
	
	// ===================== Establish connection. Retry if failed to connect with alarm ==================================================================
	
	IF task.internal.reconnectTimer.Q THEN // After 5 sec try reconnect
		task.internal.reconnectTimer.IN := FALSE;	
		task.internal.publishEnable := TRUE;
		task.internal.publishConnect := TRUE;
		
		task.internal.reconnectDelayTimer.IN := TRUE;
		task.internal.reconnectDelayTimer.PT := T#3s ;
	END_IF
	
	task.internal.IotMqttParameters.ServerUri				:= Configuration.MQTTServerUri;
	task.internal.IotMqttParameters.Port					:= Configuration.MQTTPort;
	task.internal.IotMqttParameters.ClientID				:= Configuration.MQTTClientPLC_IDName;
	task.internal.IotMqttParameters.PersistentData			:= TRUE;
	task.internal.IotMqttParameters.CleanSession			:= FALSE;
	
	task.internal.IotMqttClient_0.Enable					:= task.internal.publishEnable;
	task.internal.IotMqttClient_0.Connect					:= task.internal.publishConnect;
	task.internal.IotMqttClient_0.IotMqttLink 				:= ADR(task.internal.IotMqttLink);
	task.internal.IotMqttClient_0.Parameters				:= task.internal.IotMqttParameters;
	task.internal.IotMqttClient_0();
	
	task.internal.IotMqttPublish_0.IotMqttLink				:= task.internal.IotMqttClient_0.IotMqttLink;
	//task.internal.IotMqttPublish_0.Topic					:= ADR(Configuration.MQTTClientTopic); //Updated dynamically now
	task.internal.IotMqttPublish_0.Buffer					:= task.internal.fb_JSONModify.pJSONObjectOut;
	task.internal.IotMqttPublish_0.BufferLength				:= task.internal.fb_JSONModify.JSONObjectLengthOut;
	task.internal.IotMqttPublish_0.QoS						:= IotMqtt_QoS1;
	
	task.internal.IotMqttSubscribe_0.IotMqttLink			:= task.internal.IotMqttClient_0.IotMqttLink; 
	task.internal.IotMqttSubscribe_0.Topic					:= ADR(Configuration.MQTTClientPLCTopic);
	task.internal.IotMqttSubscribe_0.RecievedTopic			:= ADR(task.internal.subsrcibeReceivedTopic); 
	task.internal.IotMqttSubscribe_0.RecievedTopicSize		:= SIZEOF(task.internal.subsrcibeReceivedTopic);
	task.internal.IotMqttSubscribe_0.QueueSize 				:= Configuration.SubcribeQueSize;	
	task.internal.IotMqttSubscribe_0.Buffer					:= ADR(task.internal.subsrcibeReceivedBuffer);
	task.internal.IotMqttSubscribe_0.BufferSize				:= SIZEOF(task.internal.subsrcibeReceivedBuffer);
	task.internal.IotMqttSubscribe_0.Enable 				:= SEL(task.internal.IotMqttClient_0.Connected, FALSE, TRUE);  // Always Enable if connected

	IF task.internal.reconnectDelayTimer.Q AND NOT task.internal.IotMqttClient_0.Connected AND NOT task.internal.reconnectTimer.Q THEN
		task.internal.reconnectDelayTimer.IN := FALSE;
		task.internal.publishEnable := FALSE;
		task.internal.publishConnect := FALSE;

		task.internal.reconnectTimer.IN := TRUE;
		task.internal.reconnectTimer.PT := T#5s ;		
	END_IF
	// ===================================================================================================================================================
	
END_ACTION
