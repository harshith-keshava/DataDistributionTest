
PROGRAM _INIT

	Configuration.Exists := TRUE; //for now
	
	Name := 'MQTT Data Collection';
	IF Configuration.Exists THEN
		//Commands *************
		subscribePLCOpenWithParameters(gMQTTApi.commands.PublishData, 'Publish Data MQTT', ADR(task.internal.publishDataPar), SIZEOF(task.internal.publishDataPar), task.command.publishMQTTData, task.internal.PLCOpenPub);
		subscribePLCOpen(gMQTTApi.commands.SubscribeData, 'Subscribe Data MQTT',task.command.subscribeMQTTData, task.internal.PLCOpenSub);
		subscribePLCOpen(gMQTTApi.commands.WriteData, 'Subscribe Data MQTT',task.command.WriteData, task.internal.PLCOpenWrite);
		
		//Status ************
		registerStateBool(gMQTTApi.status.subsystemsReady, 'MQTT Data Subsystem Ready',task.status.connectionOk); //SubSystem Status
		registerStateBool(gMQTTApi.status.MQTTEnabled, 'MQTT task enabled',Configuration.EnableDataCollection); //SubSystem Enabled	
		
		//Inhibits ************
		registerStateBool(gMQTTApi.inhibit.MQTTPublishInhibit, 'No Connection established with broker', task.status.connectionError); 
		registerStateBool(gMQTTApi.inhibit.MQTTPublishInhibit, 'MQTT Not Enabled', task.internal.notEnabled);
		registerStateBool(gMQTTApi.inhibit.MQTTSubscribeInhibit, 'No Connection established with broker', task.status.connectionError);
		registerStateBool(gMQTTApi.inhibit.MQTTSubscribeInhibit, 'MQTT Not Enabled', task.internal.notEnabled);
		
		
		// Init *************
		task.internal.publishEnable := FALSE;
		task.internal.publishConnect := FALSE;
		
		task.internal.IotMqttPublish_0.Send := FALSE;
		task.internal.IotMqttPublish_0.ErrorReset := TRUE;
		task.internal.IotMqttPublish_0();
		
		task.internal.reconnectDelayTimer.IN := TRUE;
		task.internal.reconnectDelayTimer();

		gMQTTApi.status.bufferTail := 1;
		gMQTTApi.status.bufferHead := 1;
		
		brsmemset(ADR(gDataCollectionQueue), 0, SIZEOF(gDataCollectionQueue));
		brsmemset(ADR(task.internal.publishDataPar), 0, SIZEOF(task.internal.publishDataPar));
		
		task.internal.plcBooted := TRUE;
		
		IF gSimulation THEN
			Configuration.EnableDataCollection := FALSE;
		END_IF	
			
	END_IF

END_PROGRAM

PROGRAM _CYCLIC
	IF gSimulation THEN
		Configuration.MQTTServerUri 		:= 'nats.service.prod-hq.consul'; // Dev Broker for testing
		Configuration.MQTTClientPLC_IDName 	:= gConfiguration.machineIdentity.machineName;
		Configuration.MQTTPort 				:= 1883; // Dev Broker for testing
		Configuration.SubcribeQueSize 		:= 50;
	END_IF	
		
	//Call piper interface	
	PiperModuleInterface;
	
	task.internal.notEnabled := NOT(Configuration.EnableDataCollection) AND NOT(gSimulation);
	
	IF Configuration.EnableDataCollection THEN
		IF NOT Configuration.Exists THEN
			RETURN;		
		END_IF
			
		//Data Collection signal update
		DataCollectionSignals;
		QueueData;
		
		///////////////////////////////////////////////////////////////
		//API:
		//	Requires:
		//	- Active connection with Broker
	
		//	Commands:
		//	-PublishData			- Converts specifed PLC Data structure into JSON format and sent MQTT data packet via MQTT broker
		//	-SubscribeData			- Reads the MQTT data from broker in JSON format and writes to corresponding PLC data structure
	
		//	Inhbits:
		//	-MQTTPublishInhibit		- No Connection established with broker
	
		//  -MQTTSubscribeInhibit	- No Connection established with broker
		//  -MQTTQueueInhibit		- Queue overflow
		
		//  State Monitoring:
		//	-
	
		///////////////////////////////////////////////////////////////
	
		//Handle scaling and parameterization of monitored values
		//MonitoredValues;
	    
		
		//Read Memory usage 
		
		fbMemoryCheck_USRRAM.enable := TRUE;
		fbMemoryCheck_USRRAM.mem_typ := brUSRRAM; 
		fbMemoryCheck_USRRAM();
	
		IF (fbMemoryCheck_USRRAM.status = ERR_OK) THEN	
			IF (fbMemoryCheck_USRRAM.MemSize <> 0) THEN
				gMemPercentFull_USRRAM := 100 - (100 * (UDINT_TO_REAL(fbMemoryCheck_USRRAM.FreeMemSize) / UDINT_TO_REAL(fbMemoryCheck_USRRAM.MemSize)));
			END_IF			
		END_IF

		//Read external states
		task.status.connectionError := NOT task.internal.IotMqttClient_0.Connected OR NOT task.internal.IotMqttClient_0.Active;
		task.status.connectionOk := NOT task.status.connectionError;
		
		
		task.status.ready := stateAllTrue( gMQTTApi.status.subsystemsReady, FALSE );
		stateStatus( gMQTTApi.status.subsystemsReady, ADR(task.internal.subSystemStatus), SIZEOF(task.internal.subSystemStatus) );	
	
		IF NOT task.status.ready THEN
			stateStatus( gMQTTApi.status.subsystemsReady, ADR(task.internal.subSystemStatus), SIZEOF(task.internal.subSystemStatus) );	
		ELSE
			task.internal.subSystemStatus[0] := 'Ready';
		END_IF	
	
		//cyclic logic here:

		// Connection settings handled here
		BrokerConnection;
		
		IF task.internal.plcBooted AND NOT task.internal.previousPlcBooted AND NOT(isInhibited(gMQTTApi.inhibit.MQTTPublishInhibit)) AND (task.status.pubState = PUB_STATE_READY) THEN // Trigger PLC connect event 
			//Initialise the Mqtt tag value when the plc has been rebooted 
			gDataCollection.EventStartOfRecoat.tags[6].value					:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperLoadCell); // initialise the metering hopper value in case of a reboot of the PLC
			//EventPLCConnected ==========================
			gDataCollection.StatusOnline.lot_id							:= '';
			gDataCollection.StatusOnline.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.StatusOnline.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusOnline.timestamp);
			gDataCollection.StatusOnline.seq							:= gDataCollection.StatusOnline.timestamp;
			
			gDataCollection.StatusOnline.tags[0].name						:= 'MachineClientID';
			gDataCollection.StatusOnline.tags[0].value						:= gConfiguration.machineIdentity.machineName;
			gDataCollection.StatusOnline.tags[0].type						:= 'STRING';
			gDataCollection.StatusOnline.tags[1].name						:= 'PLCSoftwareVersion';
			gDataCollection.StatusOnline.tags[1].value						:= gRevInfo_revision;
			gDataCollection.StatusOnline.tags[1].type						:= 'STRING';
			gDataCollection.StatusOnline.tags[2].name						:= 'SoftwareRevOwner';
			gDataCollection.StatusOnline.tags[2].value						:= gRevInfo_revisionAuthor;
			gDataCollection.StatusOnline.tags[2].type						:= 'STRING';
			gDataCollection.StatusOnline.tags[3].name						:= 'BranchName';
			gDataCollection.StatusOnline.tags[3].value						:= gRevInfo_branchName;
			gDataCollection.StatusOnline.tags[3].type						:= 'STRING';
			
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'StatusOnline';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/STATUS/Online');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'Online');
				END_IF
			END_IF
			task.internal.previousPlcBooted := task.internal.plcBooted;
			
		END_IF	
		
		// ALARMS ============================================================================================================================================

		vfAlarmPersistent(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_CONNECTION_ERROR_AL1400,task.internal.reconnectTimer.IN); // Connection Error
		
		// ===================================================================================================================================================
	
		///////////////////////////////////////////////////////////////
		//Handle interpreting commands that do not require STATE_READY
		///////////////////////////////////////////////////////////////
		IF task.status.ready THEN
				
			//NOTE: Commands that just turn ON/OFF IO CAN happen in the command translation
		
			//Local lockout (prevent any command from being run)
			IF task.internal.localLockout THEN

				//Any of these commands can interrupt others, so they are handled outside the state machine
		
			ELSIF task.command.publishMQTTData THEN 
			
				task.internal.newPubCommand := TRUE;
				task.internal.IotMqttPublish_0.ErrorReset := TRUE;
				task.status.pubState := PUB_STATE_PUBLISH_DATA;
		
				//Update status
				task.status.statusMessagePub := 'Start MQTT data publish';
			END_IF
				
			IF task.command.subscribeMQTTData THEN // Subscribe only when resource is available ( Not publishing ). Locally controlled command
			
				task.internal.newSubCommand := TRUE;
				task.status.subState := SUB_STATE_SUBSCRIBE_DATA;
		
				//Update status
				task.status.statusMessageSub := 'Start MQTT data subscribe';
			
			END_IF

							
		ELSE
		
			//TODO: Tell the user that a command failed if commanded here?			
			task.internal.PLCOpenPub.status := MQTT_ERROR;
			task.internal.PLCOpenSub.status := MQTT_ERROR;
			task.status.pubState := PUB_STATE_NOT_READY;
			task.status.subState := SUB_STATE_NOT_READY;
			task.internal.localLockout := FALSE;
			
		END_IF
	
		IF task.command.WriteData THEN // Do not have to rely on subsystem ready 
			task.internal.newWriteCommand := TRUE;
			task.status.writeState := STATE_WRITE_DATA;
		
			//Update status
			task.status.statusMessageWrite := 'Start MQTT data Write';
		END_IF
		
		///////////////////////////////////////////////////////////////
		//Handle any canceled commands that are required
		///////////////////////////////////////////////////////////////	

		IF task.internal.newPubCommand THEN
				
			//TODO: Log state changes
			//		task.internal.abortedStep := task.status.sequence;
			//		task.internal.abortedState := task.internal.previousState;

			task.status.pubSequence := PUB_SEQ_IDLE;
				
			IF (task.status.pubState = PUB_STATE_PUBLISH_DATA) AND (isInhibited(gMQTTApi.inhibit.MQTTPublishInhibit)) THEN
				task.internal.inhibitReason := ''; // Reset inhibit Reason
				stateTrueStatus(gMQTTApi.inhibit.MQTTPublishInhibit,ADR(task.internal.inhibitReason),SIZEOF(task.internal.inhibitReason));
				vfAlarmEdge(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_PUBLISH_INHIBIT_AL1401);
				task.status.pubState := PUB_STATE_READY;
				task.internal.PLCOpenPub.status := ERR_INHIBITED; 
			END_IF
					
		END_IF
		
		IF task.internal.newSubCommand THEN
				
			//TODO: Log state changes
			//		task.internal.abortedStep := task.status.sequence;
			//		task.internal.abortedState := task.internal.previousState;

			task.status.subSequence := SUB_SEQ_IDLE;
				
			IF (task.status.subState = SUB_STATE_SUBSCRIBE_DATA) AND (isInhibited(gMQTTApi.inhibit.MQTTSubscribeInhibit)) THEN
				task.internal.inhibitReason := ''; // Reset inhibit Reason
				stateTrueStatus(gMQTTApi.inhibit.MQTTSubscribeInhibit,ADR(task.internal.inhibitReason),SIZEOF(task.internal.inhibitReason));
				vfAlarmEdge(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_SUBSCRIBE_INHIBIT_AL1404);
				task.status.subState := SUB_STATE_READY;	
				task.internal.PLCOpenSub.status := ERR_INHIBITED; 
			END_IF
					
		END_IF
		
		IF task.internal.newWriteCommand THEN
			
			task.status.writeSequence := SEQ_IDLE;
			
			// No inhibits for this yet
		END_IF
			
		///////////////////////////////////////////////////////////////
		//Handle any Commands that do not require state.
		///////////////////////////////////////////////////////////////	
	
		//TODO: Implement single shot commands 
	
		///////////////////////////////////////////////////////////////
		//Handle the current state
		///////////////////////////////////////////////////////////////
			
		CASE task.status.pubState OF
			
			PUB_STATE_NOT_READY:
			
				task.status.pubSequence := PUB_SEQ_IDLE;	

				IF task.status.ready THEN
				
					task.status.pubState := PUB_STATE_READY;
				
				END_IF	

			PUB_STATE_READY:

				task.status.pubSequence := PUB_SEQ_IDLE;

				//TODO: Handle any commands that require lockout
				task.internal.localLockout := FALSE;
			
				// TODO: Initialze all variables
				task.internal.IotMqttPublish_0.Send := FALSE;
					
			PUB_STATE_PUBLISH_DATA:
		
				CASE task.status.pubSequence OF
					PUB_SEQ_ERROR:
			
						task.internal.IotMqttPublish_0.ErrorReset := TRUE;
					
						brsmemset(ADR(task.internal.publishDataPar), 0, SIZEOF(task.internal.publishDataPar));
						
						//Handle Error
						task.internal.PLCOpenPub.status := MQTT_ERROR;
						task.status.pubState := PUB_STATE_READY;

					PUB_SEQ_DONE:
						
						brsmemset(ADR(task.internal.publishDataPar), 0, SIZEOF(task.internal.publishDataPar));

						//Handle Done
						task.internal.PLCOpenPub.status := ERR_OK;
						task.status.pubState := PUB_STATE_READY;
				
					PUB_SEQ_IDLE:
						
						IF task.internal.PLCOpenPub.parametersWritten THEN
							task.internal.IotMqttPublish_0.ErrorReset := TRUE;
	
							task.internal.variableStructToPublish := '';		
							task.internal.variableStructToPublish := CONCAT('["MQTTDataCo:task.internal.publishDataPar.VariableDataToPublish.',task.internal.publishDataPar.VariableListToPublish);
							task.internal.variableStructToPublish := CONCAT(task.internal.variableStructToPublish,'"]');
							task.internal.variableListTopic := task.internal.publishDataPar.TopicForVariableList;
	
							//Handle Sequence
							task.status.pubSequence := PUB_SEQ_READ_PLC_DATA;
						ELSE
							
							task.status.pubSequence := PUB_SEQ_ERROR; // Problem with paramter passing. Error out
							
						END_IF
				
					ELSE
					
						MQTTDataPublishSubSequence;
					
				END_CASE;
		
		END_CASE;
			
		CASE task.status.subState OF
			
			SUB_STATE_NOT_READY:
			
				task.status.subSequence := SUB_SEQ_IDLE;	

				IF task.status.ready THEN
				
					task.status.subState := SUB_STATE_READY;
				
				END_IF	

			SUB_STATE_READY:

				task.status.subSequence := SUB_SEQ_IDLE;

				//TODO: Handle any commands that require lockout
				task.internal.localLockout := FALSE;
			
				// TODO: Initialze all variables
				task.internal.IotMqttSubscribe_0.Read := FALSE;
					
			SUB_STATE_SUBSCRIBE_DATA:
		
				CASE task.status.subSequence OF
					SUB_SEQ_ERROR:
						task.status.statusMessageSub := 'MQTT Data subscribe error';	
					
						//Handle Error
						task.internal.PLCOpenSub.status := MQTT_ERROR;
						task.status.subState := SUB_STATE_READY;

					SUB_SEQ_DONE:
						task.status.statusMessageSub := 'MQTT Data subscribe Finished Succesfully';	

						//Handle Done
						task.internal.PLCOpenSub.status := ERR_OK;
						task.status.subState := SUB_STATE_READY;
				
					SUB_SEQ_IDLE:
						task.status.statusMessageSub := 'MQTT Data subscribe started';
			
						//Handle Sequence
						task.status.subSequence := SUB_SEQ_CHECK_ENABLED_SUB;
				
					ELSE
					
						MQTTDataSubscribeSubSequence;
					
				END_CASE;
		END_CASE;
		

		CASE task.status.writeState OF
			
			STATE_NOT_READY:
			
				task.status.writeSequence := SEQ_IDLE;	

				IF task.status.ready THEN
				
					task.status.writeState := STATE_READY;
				
				END_IF	

			STATE_READY:

				task.status.writeSequence := SEQ_IDLE;

				//TODO: Handle any commands that require lockout
				task.internal.localLockout := FALSE;
					
			STATE_WRITE_DATA:
		
				CASE task.status.writeSequence OF
					SUB_SEQ_ERROR:
						task.status.statusMessageWrite := 'MQTT Data write error';	
					
						//Handle Error
						task.internal.PLCOpenWrite.status := MQTT_ERROR;
						task.status.writeState := STATE_READY;

					SUB_SEQ_DONE:
						task.status.statusMessageWrite := 'MQTT Data write Finished Succesfully';	

						//Handle Done
						task.internal.PLCOpenWrite.status := ERR_OK;
						task.status.writeState := STATE_READY;
				
					SUB_SEQ_IDLE:
						task.status.statusMessageWrite := 'MQTT Data write started';
			
						//Handle Sequence
						task.status.writeSequence := SEQ_WRITE_PLC_DATA;
				
					ELSE
					
						MQTTDataWritePlcSubSequence;
					
				END_CASE;
		END_CASE;
		///////////////////////////////////////////////////////////////
		//Update Statuses
		///////////////////////////////////////////////////////////////
	
		//Outputs 

		
		///////////////////////////////////////////////////////////////
		//Call all PLCOpen function blocks
		///////////////////////////////////////////////////////////////

	
		///////////////////////////////////////////////////////////////
		//Reset all commands to ensure they don't get buffered
		///////////////////////////////////////////////////////////////
		brsmemset(ADR(task.command), 0, SIZEOF(task.command));
		task.internal.newPubCommand := FALSE;
		task.internal.newSubCommand := FALSE;
		task.internal.newWriteCommand := FALSE;
	
		logStateChange_0.LoggerName := 'App';
		logStateChange_0.ModuleName := Name;
		logStateChange_0.State 		:= task.status.pubState;
		logStateChange_0.StateName 	:= task.status.statusMessagePub;
		logStateChange_0();
	
		logSeqChange_0.LoggerName 	:= 'App';
		logSeqChange_0.ModuleName 	:= Name;
		//	logSeqChange_0.State		:= task.status.sequence;
		//	logSeqChange_0.StateName	:= task.status.statusMessage;
		//	logSeqChange_0();
		
		task.internal.sequenceTimeout();
		task.internal.sequenceTimeout.IN := FALSE;
		task.internal.sequenceTimeoutSub();
		task.internal.sequenceTimeoutSub.IN := FALSE;
		task.internal.reconnectTimer();
		task.internal.reconnectDelayTimer();
		task.internal.periodicDataCycle1Timer();
		task.internal.periodicDataCycle1Timer.IN := FALSE;
		
		task.internal.IotMqttPublish_0();
		task.internal.IotMqttPublish_0.ErrorReset := FALSE; // Reset 'error reset' command which is set after on commad start and Error
		task.internal.IotMqttSubscribe_0();
		task.internal.IotMqttSubscribe_0.Enable := FALSE;
	
		//Keep track of the previous state
		task.internal.previousStatePub := task.status.pubState;
		task.internal.previousStateSub := task.status.subState;

	ELSE	
		task.internal.PLCOpenPub.status := ERR_OK;
		task.status.pubState := PUB_STATE_READY;
		task.internal.PLCOpenSub.status := ERR_OK;
		task.status.subState := SUB_STATE_READY;
		task.internal.PLCOpenWrite.status := ERR_OK;
		task.status.writeState := STATE_READY;
	END_IF
END_PROGRAM

PROGRAM _EXIT
	task.internal.IotMqttClient_0(Enable := FALSE);
	task.internal.IotMqttPublish_0(Enable := FALSE); 
	task.internal.IotMqttSubscribe_0(Enable := FALSE); 
END_PROGRAM

