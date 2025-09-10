PROGRAM _CYCLIC
	
	
	IF runTest THEN
		
		runTest := FALSE;
		state1 := 1;
		state2 := 1;
		
	END_IF
	
	
	CASE state1 OF
		
		0: //idle
				
		1:
		
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfPrint';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfPrint');
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
				state1 := 0;
			ELSE	
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOfPrint');
				state1 := 0;
			END_IF
			
	END_CASE
	
	CASE state2 OF
		
		0: //idle
			
		1:

			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := variableList;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/');
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,packetType);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/');
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,variableList);
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
				state2 := 0;
			ELSE	
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOfRecoat');
				state2 := 0;
			END_IF
			
	END_CASE
	
	IF startSendingEveryMessage THEN
		startSendingEveryMessage := FALSE;
		messageIndex := 0;
		sendEveryMessage := TRUE;
	END_IF
	
	CASE MQTT_MESSAGE_SEQUENCE OF
		
		0:
			//do nothing
			messageWait.IN := sendEveryMessage;
			messageWait.PT := MESSAGE_STRESS_TEST_DELAY;
				
			IF messageWait.Q THEN
				MQTT_MESSAGE_SEQUENCE := messageIndex + 1;
			END_IF
			
		1: //EventStartOfRecoat
			gDataCollection.EventStartOfRecoat.lot_id							:= '';
			gDataCollection.EventStartOfRecoat.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventStartOfRecoat.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOfRecoat.timestamp);
			gDataCollection.EventStartOfRecoat.seq								:= gDataCollection.EventStartOfRecoat.timestamp;
			
			gDataCollection.EventStartOfRecoat.tags[0].name						:= 'RecoaterSpeed';
			gDataCollection.EventStartOfRecoat.tags[0].value					:= REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Velocity);
			gDataCollection.EventStartOfRecoat.tags[0].type						:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[1].name						:= 'ElectrodeRecoaterActive';
			gDataCollection.EventStartOfRecoat.tags[1].value					:= BOOL_TO_STRING(gRecoater.dataCollection.ElectrodeRecoaterActive);
			gDataCollection.EventStartOfRecoat.tags[1].type						:= 'BOOL';
			gDataCollection.EventStartOfRecoat.tags[2].name						:= 'ElectrodeRecoaterGain';
			gDataCollection.EventStartOfRecoat.tags[2].value					:= REAL_TO_STRING(gRecoater.dataCollection.ElectrodeRecoaterGain);
			gDataCollection.EventStartOfRecoat.tags[2].type						:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[3].name						:= 'MeteringHopperInitSpeed';
			gDataCollection.EventStartOfRecoat.tags[3].value					:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperInitSpeed);
			gDataCollection.EventStartOfRecoat.tags[3].type						:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[4].name						:= 'MeteringHopperDispenseSpeed';
			gDataCollection.EventStartOfRecoat.tags[4].value					:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperDispenseSpeed);
			gDataCollection.EventStartOfRecoat.tags[4].type						:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[5].name						:= 'MeteringHopperFillSpeed';
			gDataCollection.EventStartOfRecoat.tags[5].value					:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperFillSpeed);
			gDataCollection.EventStartOfRecoat.tags[5].type						:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[6].name						:= 'MeteringHopperLoadCell';
			gDataCollection.EventStartOfRecoat.tags[6].value					:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperLoadCell);
			gDataCollection.EventStartOfRecoat.tags[6].type						:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[7].name						:= 'RecoatStartPosition';
			gDataCollection.EventStartOfRecoat.tags[7].value					:= LREAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Position);
			gDataCollection.EventStartOfRecoat.tags[7].type						:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[8].name						:= 'RecoatEndPosition';
			gDataCollection.EventStartOfRecoat.tags[8].value					:= LREAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Position);
			gDataCollection.EventStartOfRecoat.tags[8].type						:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[9].name						:= 'PrepileMoveRotation_deg';
			gDataCollection.EventStartOfRecoat.tags[9].value					:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.PrepileMoveRotation_deg);
			gDataCollection.EventStartOfRecoat.tags[9].type						:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[10].name					:= 'SpreadingMoveRot_deg';
			gDataCollection.EventStartOfRecoat.tags[10].value					:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.SpreadingMoveRot_deg);
			gDataCollection.EventStartOfRecoat.tags[10].type					:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[11].name					:= 'WaitedForRefillToFinish';
			gDataCollection.EventStartOfRecoat.tags[11].value					:= BOOL_TO_STRING(FALSE);//changed the tag just for validation report
			gDataCollection.EventStartOfRecoat.tags[11].type					:= 'BOOL';
			gDataCollection.EventStartOfRecoat.tags[12].name					:= 'BladeOffsetPrepileMoveRot_deg';
			gDataCollection.EventStartOfRecoat.tags[12].value					:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.BladeOffsetPrepileMoveRot_deg);
			gDataCollection.EventStartOfRecoat.tags[12].type					:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[13].name					:= 'TimeWaitingForRefill';
			//gDataCollection.EventStartOfRecoat.tags[13].value					:= TIME_TO_STRING(refillWaitTime);
			gDataCollection.EventStartOfRecoat.tags[13].type					:= 'STRING';
			gDataCollection.EventStartOfRecoat.tags[14].name					:= 'ReclaimBinLevel';
			gDataCollection.EventStartOfRecoat.tags[14].value					:= REAL_TO_STRING(gPowderApi.dataCollection.ReclaimBinLevel);
			gDataCollection.EventStartOfRecoat.tags[14].type					:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[15].name					:= 'ReclaimBinLevelRaw';
			gDataCollection.EventStartOfRecoat.tags[15].value					:= REAL_TO_STRING(gPowderApi.dataCollection.ReclaimBinLevelRaw);
			gDataCollection.EventStartOfRecoat.tags[15].type					:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[16].name					:= 'ElectrodeRecoaterVFeedback';
			gDataCollection.EventStartOfRecoat.tags[16].value					:= REAL_TO_STRING(gRecoater.dataCollection.ElectrodeRecoaterVFeedback);
			gDataCollection.EventStartOfRecoat.tags[16].type					:= 'FLOAT32';
			gDataCollection.EventStartOfRecoat.tags[17].name					:= 'ElectrodeRecoaterIFeedback';
			gDataCollection.EventStartOfRecoat.tags[17].value					:= REAL_TO_STRING(gRecoater.dataCollection.ElectrodeRecoaterIFeedback);
			gDataCollection.EventStartOfRecoat.tags[17].type					:= 'FLOAT32';
			
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfRecoat';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfRecoat');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOfRecoat' );		
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		2: //EventEndOfRecoat
			gDataCollection.EventEndOfRecoat.lot_id							:= '';
			gDataCollection.EventEndOfRecoat.lot_id							:= gPrintJobManagement.currentState.baseFilename ;
			gDataCollection.EventEndOfRecoat.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfRecoat.timestamp);
			gDataCollection.EventEndOfRecoat.seq							:= gDataCollection.EventStartOfRecoat.timestamp;
			
			gDataCollection.EventEndOfRecoat.tags[0].name						:= 'MeteringHopperLoadCell';
			gDataCollection.EventEndOfRecoat.tags[0].value						:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperLoadCell);
			gDataCollection.EventEndOfRecoat.tags[0].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRecoat.tags[1].name						:= 'RecoaterX1MotorCurrentRMS';
			//gDataCollection.EventEndOfRecoat.tags[1].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfRecoat.tags[1].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRecoat.tags[2].name						:= 'RecoaterX1MotorCurrentPeak';
			//gDataCollection.EventEndOfRecoat.tags[2].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfRecoat.tags[2].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRecoat.tags[3].name						:= 'RecoaterX2MotorCurrentRMS';
			//gDataCollection.EventEndOfRecoat.tags[3].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfRecoat.tags[3].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRecoat.tags[4].name						:= 'RecoaterX2MotorCurrentPeak';
			//gDataCollection.EventEndOfRecoat.tags[4].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfRecoat.tags[4].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRecoat.tags[5].name						:= 'ReclaimBinLevel';
			gDataCollection.EventEndOfRecoat.tags[5].value						:= REAL_TO_STRING(gPowderApi.dataCollection.ReclaimBinLevel);
			gDataCollection.EventEndOfRecoat.tags[5].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRecoat.tags[6].name						:= 'ReclaimBinLevelRaw';
			gDataCollection.EventEndOfRecoat.tags[6].value						:= REAL_TO_STRING(gPowderApi.dataCollection.ReclaimBinLevelRaw);
			gDataCollection.EventEndOfRecoat.tags[6].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRecoat.tags[7].name						:= 'MeteringHopperPrepileMoveCurrentRMS';
			//gDataCollection.EventEndOfRecoat.tags[7].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfRecoat.tags[7].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRecoat.tags[8].name						:= 'MeteringHopperPrepileMoveCurrentMax';
			//gDataCollection.EventEndOfRecoat.tags[8].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfRecoat.tags[8].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRecoat.tags[9].name						:= 'MeteringHopperSpreadMoveCurrentRMS';
			//gDataCollection.EventEndOfRecoat.tags[9].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfRecoat.tags[9].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRecoat.tags[10].name						:= 'MeteringHopperSpreadMoveCurrentMax';
			//gDataCollection.EventEndOfRecoat.tags[10].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfRecoat.tags[10].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRecoat.tags[11].name						:= 'NumberOfRecoats';
			gDataCollection.EventEndOfRecoat.tags[11].value						:= USINT_TO_STRING(gOpcData_ToVisionPC.CurrentRecoat);
			gDataCollection.EventEndOfRecoat.tags[11].type						:= 'INT32'; 
			gDataCollection.EventEndOfRecoat.tags[12].name						:= 'ElectrodeFeedback';
			gDataCollection.EventEndOfRecoat.tags[12].value						:= BOOL_TO_STRING(gRecoater.dataCollection.ElectrodeRecoaterActive);
			gDataCollection.EventEndOfRecoat.tags[12].type						:= 'BOOL';
			gDataCollection.EventEndOfRecoat.tags[13].name						:= 'ElectrodeRecoaterGain';
			gDataCollection.EventEndOfRecoat.tags[13].value						:= REAL_TO_STRING(gRecoater.dataCollection.ElectrodeRecoaterGain);
			gDataCollection.EventEndOfRecoat.tags[13].type						:= 'FLOAT32'; 
			gDataCollection.EventEndOfRecoat.tags[14].name						:= 'ElectrodeFeedbackCurrent';
			gDataCollection.EventEndOfRecoat.tags[14].value						:= REAL_TO_STRING(gRecoater.dataCollection.ElectrodeRecoaterIFeedback);
			gDataCollection.EventEndOfRecoat.tags[14].type						:= 'FLOAT32'; 
			gDataCollection.EventEndOfRecoat.tags[15].name						:= 'ElectrodeFeedbackVoltage';
			gDataCollection.EventEndOfRecoat.tags[15].value						:= REAL_TO_STRING(gRecoater.dataCollection.ElectrodeRecoaterVFeedback);
			gDataCollection.EventEndOfRecoat.tags[15].type						:= 'FLOAT32';

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfRecoat';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfRecoat');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOfRecoat' );	
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		3: //EventStartOfRefill
			// EventStartOfRefill ==========================
			gDataCollection.EventStartOfRefill.lot_id							:= '';
			gDataCollection.EventStartOfRefill.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventStartOfRefill.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOfRefill.timestamp);
			gDataCollection.EventStartOfRefill.seq								:= gDataCollection.EventStartOfRefill.timestamp;

			gDataCollection.EventStartOfRefill.tags[0].name						:= 'MeteringHopperLoadCell';
			gDataCollection.EventStartOfRefill.tags[0].value					:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperLoadCell);
			gDataCollection.EventStartOfRefill.tags[0].type						:= 'FLOAT32';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfRefill';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfRefill');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventStartOfRefill');
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		4: //EventEndOfRefill
			gDataCollection.EventEndOfRefill.lot_id							:= '';
			gDataCollection.EventEndOfRefill.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventEndOfRefill.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfRefill.timestamp);
			gDataCollection.EventEndOfRefill.seq							:= gDataCollection.EventStartOfRefill.timestamp;

			gDataCollection.EventEndOfRefill.tags[0].name						:= 'MeteringHopperLoadCell';
			gDataCollection.EventEndOfRefill.tags[0].value					    := REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperLoadCell);
			gDataCollection.EventEndOfRefill.tags[0].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRefill.tags[1].name						:= 'MeteringHopperRefillCurrentRMS';
			//gDataCollection.EventEndOfRefill.tags[1].value					    := ; //Set elsewhere
			gDataCollection.EventEndOfRefill.tags[1].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRefill.tags[2].name						:= 'MeteringHopperRefillCurrentMax';
			//gDataCollection.EventEndOfRefill.tags[2].value					    := ; //Set elsewhere
			gDataCollection.EventEndOfRefill.tags[2].type						:= 'FLOAT32';
			gDataCollection.EventEndOfRefill.tags[3].name						:= 'EndOfRefillPowderParticleCount';
			gDataCollection.EventEndOfRefill.tags[3].value					    := REAL_TO_STRING(gPowderApi.dataCollection.PowderParticleCounter);
			gDataCollection.EventEndOfRefill.tags[3].type						:= 'FLOAT32';

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfRefill';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfRefill');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOfRefill' );	
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		5: //EventStartOfPrint

			// EventStartOfPrint ==========================
			gDataCollection.EventStartOfPrint.lot_id							:= '';
			gDataCollection.EventStartOfPrint.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventStartOfPrint.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOfPrint.timestamp);
			gDataCollection.EventStartOfPrint.seq								:= gDataCollection.EventStartOfPrint.timestamp	;

			gDataCollection.EventStartOfPrint.tags[0].name						:= 'OpticBoxTemperatureSensor1';
			//gDataCollection.EventStartOfPrint.tags[0].value						:= ; //set elsewhere
			gDataCollection.EventStartOfPrint.tags[0].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[1].name						:= 'OpticBoxTemperatureSensor2';
			//gDataCollection.EventStartOfPrint.tags[1].value						:= ; //set elsewhere
			gDataCollection.EventStartOfPrint.tags[1].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[2].name						:= 'OpticBoxTemperatureSensor3';
			//gDataCollection.EventStartOfPrint.tags[2].value						:= ; //set elsewhere
			gDataCollection.EventStartOfPrint.tags[2].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[3].name						:= 'OpticBoxTemperatureSensor4';
			//gDataCollection.EventStartOfPrint.tags[3].value						:= ; //set elsewhere
			gDataCollection.EventStartOfPrint.tags[3].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[4].name						:= 'OpticBoxTemperatureSensor5';
			//gDataCollection.EventStartOfPrint.tags[4].value						:= ; //set elsewhere
			gDataCollection.EventStartOfPrint.tags[4].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[5].name						:= 'OpticBoxTemperatureSensor6';
			//gDataCollection.EventStartOfPrint.tags[5].value						:= ; //set elsewhere
			gDataCollection.EventStartOfPrint.tags[5].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[6].name						:= 'OpticBoxTemperatureSensor7';
			//gDataCollection.EventStartOfPrint.tags[6].value						:= ; //set elsewhere
			gDataCollection.EventStartOfPrint.tags[6].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[7].name						:= 'OpticBoxTemperatureSensor8';
			//gDataCollection.EventStartOfPrint.tags[7].value						:= ; //set elsewhere
			gDataCollection.EventStartOfPrint.tags[7].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[8].name						:= 'OpticBoxTemperature';
			gDataCollection.EventStartOfPrint.tags[8].value						:= REAL_TO_STRING(gCoolingApi.dataCollection.OpticsBoxTemperature); 
			gDataCollection.EventStartOfPrint.tags[8].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[9].name						:= 'OpticBoxFlowRate';
			gDataCollection.EventStartOfPrint.tags[9].value						:= REAL_TO_STRING(gCoolingApi.dataCollection.OpticsBoxFlowRate); 
			gDataCollection.EventStartOfPrint.tags[9].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[10].name						:= 'LeftGHFlowRate';
			gDataCollection.EventStartOfPrint.tags[10].value					:= REAL_TO_STRING(gPumpsApi.dataCollection.LeftGHFlowRate); 
			gDataCollection.EventStartOfPrint.tags[10].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[11].name						:= 'RightGHFlowRate';
			gDataCollection.EventStartOfPrint.tags[11].value					:= REAL_TO_STRING(gPumpsApi.dataCollection.RightGHFlowRate); 
			gDataCollection.EventStartOfPrint.tags[11].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[12].name						:= 'HadToPauseForFlowEqualization';
			gDataCollection.EventStartOfPrint.tags[12].value					:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneO2ppm);  // Had to change tag to fix errors on validator app for testing 
			gDataCollection.EventStartOfPrint.tags[12].type						:= 'FLOAT32'; // Had to change tag to fix errors on validator app for testing
			gDataCollection.EventStartOfPrint.tags[13].name						:= 'ZLiftHeight';
			gDataCollection.EventStartOfPrint.tags[13].value					:= REAL_TO_STRING(LREAL_TO_REAL(gMotorBasic[AXIS_LIFT_Z].OUT.Position)); 
			gDataCollection.EventStartOfPrint.tags[13].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[14].name						:= 'LastLayerTime';
			//gDataCollection.EventStartOfPrint.tags[14].value					:= ; // set elsewhere 
			gDataCollection.EventStartOfPrint.tags[14].type						:= 'STRING';
			gDataCollection.EventStartOfPrint.tags[15].name						:= 'PrintZoneO2ppm';
			gDataCollection.EventStartOfPrint.tags[15].value					:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneO2ppm); 
			gDataCollection.EventStartOfPrint.tags[15].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[16].name						:= 'LUTFileVersion';
			gDataCollection.EventStartOfPrint.tags[16].value					:= REAL_TO_STRING(gVFLCR.dataCollection.CalibrationLutNumber); 
			gDataCollection.EventStartOfPrint.tags[16].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[17].name						:= 'MeteringHopperLoadCell';
			gDataCollection.EventStartOfPrint.tags[17].value					:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperLoadCell); 
			gDataCollection.EventStartOfPrint.tags[17].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[18].name						:= 'PowderConsumptionThisLayer';
			gDataCollection.EventStartOfPrint.tags[18].value					:= REAL_TO_STRING((STRING_TO_REAL(gDataCollection.EventStartOfRecoat.tags[6].value) - STRING_TO_REAL(gDataCollection.EventStartOfPrint.tags[17].value)));  //Calculation of the powder consumption for each layer
			gDataCollection.EventStartOfPrint.tags[18].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[19].name						:= 'PowderConsumptionLastRecoat'; // If multi recoated, only last recoat is checked 
			//gDataCollection.EventStartOfPrint.tags[19].value					:= ;  //Set below
			gDataCollection.EventStartOfPrint.tags[19].type						:= 'FLOAT32';
			gDataCollection.EventStartOfPrint.tags[20].name						:= 'NumberOfConsecutiveMultiRecoats'; 
			//gDataCollection.EventStartOfPrint.tags[20].value					:= ; //Set below
			gDataCollection.EventStartOfPrint.tags[20].type						:= 'INT32';
			gDataCollection.EventStartOfPrint.tags[21].name						:= 'StartOfPrintPowderParticleCounter';
			gDataCollection.EventStartOfPrint.tags[21].value					:= REAL_TO_STRING(gPowderApi.dataCollection.PowderParticleCounter); 
			gDataCollection.EventStartOfPrint.tags[21].type						:= 'FLOAT32';
			

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfPrint';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;	
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfPrint');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOfPrint' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		6: // EventEndOfPrint ===========================
			gDataCollection.EventEndOfPrint.lot_id							:= '';
			gDataCollection.EventEndOfPrint.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventEndOfPrint.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfPrint.timestamp);
			gDataCollection.EventEndOfPrint.seq								:= gDataCollection.EventStartOfPrint.timestamp;

			gDataCollection.EventEndOfPrint.tags[0].name						:= 'OpticBoxTemperatureSensor1';
			//gDataCollection.EventEndOfPrint.tags[0].value						:= ; //set elsewhere
			gDataCollection.EventEndOfPrint.tags[0].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[1].name						:= 'OpticBoxTemperatureSensor2';
			//gDataCollection.EventEndOfPrint.tags[1].value						:= ; //set elsewhere
			gDataCollection.EventEndOfPrint.tags[1].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[2].name						:= 'OpticBoxTemperatureSensor3';
			//gDataCollection.EventEndOfPrint.tags[2].value						:= ; //set elsewhere
			gDataCollection.EventEndOfPrint.tags[2].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[3].name						:= 'OpticBoxTemperatureSensor4';
			//gDataCollection.EventEndOfPrint.tags[3].value						:= ; //set elsewhere
			gDataCollection.EventEndOfPrint.tags[3].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[4].name						:= 'OpticBoxTemperatureSensor5';
			//gDataCollection.EventEndOfPrint.tags[4].value						:= ; //set elsewhere
			gDataCollection.EventEndOfPrint.tags[4].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[5].name						:= 'OpticBoxTemperatureSensor6';
			//gDataCollection.EventEndOfPrint.tags[5].value						:= ; //set elsewhere
			gDataCollection.EventEndOfPrint.tags[5].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[6].name						:= 'OpticBoxTemperatureSensor7';
			//gDataCollection.EventEndOfPrint.tags[6].value						:= ; //set elsewhere
			gDataCollection.EventEndOfPrint.tags[6].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[7].name						:= 'OpticBoxTemperatureSensor8';
			//gDataCollection.EventEndOfPrint.tags[7].value						:= ; //set elsewhere
			gDataCollection.EventEndOfPrint.tags[7].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[8].name						:= 'OpticBoxTemperature';
			gDataCollection.EventEndOfPrint.tags[8].value						:= REAL_TO_STRING(gCoolingApi.dataCollection.OpticsBoxTemperature); 
			gDataCollection.EventEndOfPrint.tags[8].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[9].name						:= 'OpticBoxFlowRate';
			gDataCollection.EventEndOfPrint.tags[9].value						:= REAL_TO_STRING(gCoolingApi.dataCollection.OpticsBoxFlowRate); 
			gDataCollection.EventEndOfPrint.tags[9].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[10].name						:= 'LeftGHFlowRate';
			gDataCollection.EventEndOfPrint.tags[10].value						:= REAL_TO_STRING(gPumpsApi.dataCollection.LeftGHFlowRate); 
			gDataCollection.EventEndOfPrint.tags[10].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[11].name						:= 'RightGHFlowRate';
			gDataCollection.EventEndOfPrint.tags[11].value						:= REAL_TO_STRING(gPumpsApi.dataCollection.RightGHFlowRate); 
			gDataCollection.EventEndOfPrint.tags[11].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[12].name						:= 'PrintZoneO2ppm';
			gDataCollection.EventEndOfPrint.tags[12].value						:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneO2ppm); 
			gDataCollection.EventEndOfPrint.tags[12].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[13].name						:= 'x1MotorCurrentRMS';
			//gDataCollection.EventEndOfPrint.tags[13].value						:= ; // Set elsewhere 
			gDataCollection.EventEndOfPrint.tags[13].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[14].name						:= 'x1MotorCurrentPeak';
			//gDataCollection.EventEndOfPrint.tags[14].value						:= ; // Set elsewhere 
			gDataCollection.EventEndOfPrint.tags[14].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[15].name						:= 'x2MotorCurrentRMS';
			//gDataCollection.EventEndOfPrint.tags[15].value						:= ; // Set elsewhere 
			gDataCollection.EventEndOfPrint.tags[15].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[16].name						:= 'x2MotorCurrentPeak';
			//gDataCollection.EventEndOfPrint.tags[16].value						:= ; // Set elsewhere 
			gDataCollection.EventEndOfPrint.tags[16].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[17].name						:= 'yMotorCurrentRMS';
			//gDataCollection.EventEndOfPrint.tags[17].value						:= ; // Set elsewhere 
			gDataCollection.EventEndOfPrint.tags[17].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[18].name						:= 'yMotorCurrentPeak';
			//gDataCollection.EventEndOfPrint.tags[18].value						:= ; // Set elsewhere 
			gDataCollection.EventEndOfPrint.tags[18].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[19].name						:= 'CncMovementTime';
			//gDataCollection.EventEndOfPrint.tags[19].value						:= LREAL_TO_STRING(gCNC.dataCollection.CncMovementRuntime); // Set elsewhere  
			gDataCollection.EventEndOfPrint.tags[19].type						:= 'FLOAT32'; // MLDS team handles it as a REAL
			gDataCollection.EventEndOfPrint.tags[20].name						:= 'CncTotalRunTime';
			//gDataCollection.EventEndOfPrint.tags[20].value						:= LREAL_TO_STRING(gCNC.dataCollection.CncOverallRuntime); // Set elsewhere 
			gDataCollection.EventEndOfPrint.tags[20].type						:= 'FLOAT32'; // MLDS team handles it as a REAL
			gDataCollection.EventEndOfPrint.tags[21].name						:= 'ENCODER_RESET_DELAY_S';
			gDataCollection.EventEndOfPrint.tags[21].value						:= REAL_TO_STRING(gCNC.dataCollection.ENCODER_RESET_DELAY_S); 
			gDataCollection.EventEndOfPrint.tags[21].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[22].name						:= 'LayerScanDirection';
			gDataCollection.EventEndOfPrint.tags[22].value						:= gVFLCR.dataCollection.LastTrajectoryDirection; 
			gDataCollection.EventEndOfPrint.tags[22].type						:= 'STRING';
			gDataCollection.EventEndOfPrint.tags[23].name						:= 'LayerTrajectoryCount';
			//gDataCollection.EventEndOfPrint.tags[23].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfPrint.tags[23].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[24].name						:= 'RecoaterStationaryX1MotorCurrentRMS';
			//gDataCollection.EventEndOfPrint.tags[24].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfPrint.tags[24].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[25].name						:= 'RecoaterStationaryX1MotorCurrentPeak';
			//gDataCollection.EventEndOfPrint.tags[25].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfPrint.tags[25].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[26].name						:= 'RecoaterStationaryX2MotorCurrentRMS';
			//gDataCollection.EventEndOfPrint.tags[26].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfPrint.tags[26].type						:= 'FLOAT32';
			gDataCollection.EventEndOfPrint.tags[27].name						:= 'RecoaterStationaryX2MotorCurrentPeak';
			//gDataCollection.EventEndOfPrint.tags[27].value						:= ; // Set elsewhere
			gDataCollection.EventEndOfPrint.tags[27].type						:= 'FLOAT32';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfPrint';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfPrint');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOfPrint' );		
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		7: // Operator Required ==========================
			// EventEndOfBladeLevelling ==========================
			gDataCollection.EventEndOfBladeLevelling.lot_id							:= '';
			gDataCollection.EventEndOfBladeLevelling.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventEndOfBladeLevelling.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfBladeLevelling.timestamp);
			gDataCollection.EventEndOfBladeLevelling.seq							:= gDataCollection.EventStartOfBladeLevelling.timestamp;

			gDataCollection.EventEndOfBladeLevelling.tags[0].name					:= 'focalOffset';
			gDataCollection.EventEndOfBladeLevelling.tags[0].value					:= REAL_TO_STRING(gPrintJobManagement.currentState.focalOffset);
			gDataCollection.EventEndOfBladeLevelling.tags[0].type					:= 'FLOAT32';
			gDataCollection.EventEndOfBladeLevelling.tags[1].name					:= 'bladeOffset';
			gDataCollection.EventEndOfBladeLevelling.tags[1].value					:= REAL_TO_STRING(gPrintJobManagement.currentState.recoaterOffset);
			gDataCollection.EventEndOfBladeLevelling.tags[1].type					:= 'FLOAT32';
			gDataCollection.EventEndOfBladeLevelling.tags[2].name					:= 'plateThickness';
			gDataCollection.EventEndOfBladeLevelling.tags[2].value					:= REAL_TO_STRING(gPrintJobManagement.currentState.buildPlateThickness);
			gDataCollection.EventEndOfBladeLevelling.tags[2].type					:= 'FLOAT32';
			gDataCollection.EventEndOfBladeLevelling.tags[3].name					:= 'bladeAngle';
			gDataCollection.EventEndOfBladeLevelling.tags[3].value					:= LREAL_TO_STRING(gLevelingApi.state.recoaterBladeAngle);
			gDataCollection.EventEndOfBladeLevelling.tags[3].type					:= 'FLOAT32'; // MLDS team handles it as a REAL
			gDataCollection.EventEndOfBladeLevelling.tags[4].name					:= 'bladeFlatness';
			gDataCollection.EventEndOfBladeLevelling.tags[4].value					:= LREAL_TO_STRING(gLevelingApi.state.recoaterBladeMaxErrorDistance);
			gDataCollection.EventEndOfBladeLevelling.tags[4].type					:= 'FLOAT32'; // MLDS team handles it as a REAL
			gDataCollection.EventEndOfBladeLevelling.tags[5].name					:= 'TimeBladeLevellingEnd';
			gDataCollection.EventEndOfBladeLevelling.tags[5].value					:= REAL_TO_STRING(0); // set elseewhere
			gDataCollection.EventEndOfBladeLevelling.tags[5].type					:= 'STRING';

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfBladeLevelling';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfBladeLevelling');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOfBladeLevelling' );	
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		8: //EventEndOfVolumeLoad
			// EventEndOfVolumeLoad ==========================
			gDataCollection.EventEndOfVolumeLoad.lot_id							:= '';
			gDataCollection.EventEndOfVolumeLoad.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventEndOfVolumeLoad.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfVolumeLoad.timestamp);
			gDataCollection.EventEndOfVolumeLoad.seq							:= gDataCollection.EventEndOfVolumeLoad.timestamp;

			gDataCollection.EventEndOfVolumeLoad.tags[0].name					:= 'TimeLoadVolumeStart';
			//gDataCollection.EventEndOfVolumeLoad.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventEndOfVolumeLoad.tags[0].type					:= 'STRING';
			gDataCollection.EventEndOfVolumeLoad.tags[1].name					:= 'TimeLoadVolumeEnd';
			//gDataCollection.EventEndOfVolumeLoad.tags[1].value					:= ; // set elseewhere
			gDataCollection.EventEndOfVolumeLoad.tags[1].type					:= 'STRING';

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfVolumeLoad';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfVolumeLoad');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOfVolumeLoad' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		9: // EventEndOfVolumeUnload ==========================
			gDataCollection.EventEndOfVolumeUnload.lot_id							:= '';
			gDataCollection.EventEndOfVolumeUnload.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventEndOfVolumeUnload.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfVolumeUnload.timestamp);
			gDataCollection.EventEndOfVolumeUnload.seq								:= gDataCollection.EventEndOfVolumeUnload.timestamp;

			gDataCollection.EventEndOfVolumeUnload.tags[0].name					:= 'TimeUnloadVolumeStart';
			//gDataCollection.EventEndOfVolumeUnload.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventEndOfVolumeUnload.tags[0].type					:= 'STRING';
			gDataCollection.EventEndOfVolumeUnload.tags[1].name					:= 'TimeUnloadVolumeEnd';
			//gDataCollection.EventEndOfVolumeUnload.tags[1].value					:= ; // set elseewhere
			gDataCollection.EventEndOfVolumeUnload.tags[1].type					:= 'STRING';

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfVolumeUnload';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfVolumeUnload');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOfVolumeUnload' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		10: //EventAiDecision
			//EventAiDecision ==========================
			gDataCollection.EventAiDecision.lot_id							:= '';
			gDataCollection.EventAiDecision.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventAiDecision.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventAiDecision.timestamp);
			gDataCollection.EventAiDecision.seq								:= gDataCollection.EventAiDecision.timestamp;

			gDataCollection.EventAiDecision.tags[0].name					:= 'NumberOfRecoats';
			gDataCollection.EventAiDecision.tags[0].value					:= USINT_TO_STRING(gOpcData_ToVisionPC.CurrentRecoat);
			gDataCollection.EventAiDecision.tags[0].type					:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventAiDecision.tags[1].name					:= 'AiDecision';
			//gDataCollection.EventAiDecision.tags[1].value					:= ; // Set elsewhere
			gDataCollection.EventAiDecision.tags[1].type					:= 'STRING';
			gDataCollection.EventAiDecision.tags[2].name					:= 'LastRecoaterLayerNumber';
			gDataCollection.EventAiDecision.tags[2].value					:= UINT_TO_STRING(gPrintJobManagement.currentState.lastRecoatedLayerNumber);
			gDataCollection.EventAiDecision.tags[2].type					:= 'INT32'; // MLDS team handles it as a INT

			IF gVisionApi.AI.recoatBadRecoatAgain THEN
				gDataCollection.EventAiDecision.tags[1].value := 'RECOAT BAD. RECOAT AGAIN';
			ELSIF gVisionApi.AI.recoatBadScrape THEN
				gDataCollection.EventAiDecision.tags[1].value := 'RECOAT BAD. SCRAPE';
			ELSIF gVisionApi.AI.recoatBadStop THEN
				gDataCollection.EventAiDecision.tags[1].value := 'RECOAT BAD. STOP';
			ELSIF gVisionApi.AI.recoatGoodContinue THEN
				gDataCollection.EventAiDecision.tags[1].value := 'RECOAT GOOD. CONTINUE';
			ELSE
				gDataCollection.EventAiDecision.tags[1].value := 'UNKNOW';
			END_IF

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventAiDecision';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;	
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventAiDecision');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventAiDecision' );;
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		11: //EventNewToolpathLoaded
			//EventNewToolpathLoaded ==========================
			gDataCollection.EventNewToolpathLoaded.lot_id							:= '';
			gDataCollection.EventNewToolpathLoaded.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventNewToolpathLoaded.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventNewToolpathLoaded.timestamp);
			gDataCollection.EventNewToolpathLoaded.seq								:= gDataCollection.EventNewToolpathLoaded.timestamp;
			
			gDataCollection.EventNewToolpathLoaded.tags[0].name						:= 'FileName';
			gDataCollection.EventNewToolpathLoaded.tags[0].value					:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventNewToolpathLoaded.tags[0].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[1].name						:= 'Author';
			gDataCollection.EventNewToolpathLoaded.tags[1].value					:= gPrintJobManagement.currentState.author;
			gDataCollection.EventNewToolpathLoaded.tags[1].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[2].name						:= 'BuildInstanceID';
			gDataCollection.EventNewToolpathLoaded.tags[2].value					:= gPrintJobManagement.currentState.buildInstanceID;
			gDataCollection.EventNewToolpathLoaded.tags[2].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[3].name						:= 'BuildLayout';
			gDataCollection.EventNewToolpathLoaded.tags[3].value					:= UDINT_TO_STRING(gPrintJobManagement.currentState.buildLayout);
			gDataCollection.EventNewToolpathLoaded.tags[3].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventNewToolpathLoaded.tags[4].name						:= 'BuildPlatformName';
			gDataCollection.EventNewToolpathLoaded.tags[4].value					:= gPrintJobManagement.currentState.buildPlatformName;
			gDataCollection.EventNewToolpathLoaded.tags[4].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[5].name						:= 'ConfigEditorVersion';
			gDataCollection.EventNewToolpathLoaded.tags[5].value					:= gPrintJobManagement.currentState.configEditorVersion;
			gDataCollection.EventNewToolpathLoaded.tags[5].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[6].name						:= 'CurrentLayerNumber';
			gDataCollection.EventNewToolpathLoaded.tags[6].value					:= UINT_TO_STRING(gPrintJobManagement.currentState.currentLayerNumber);
			gDataCollection.EventNewToolpathLoaded.tags[6].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventNewToolpathLoaded.tags[7].name						:= 'Description';
			gDataCollection.EventNewToolpathLoaded.tags[7].value					:= gPrintJobManagement.currentState.description;
			gDataCollection.EventNewToolpathLoaded.tags[7].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[8].name						:= 'NumberOfLayers';
			gDataCollection.EventNewToolpathLoaded.tags[8].value					:= UINT_TO_STRING(gPrintJobManagement.currentState.numberOfLayers);
			gDataCollection.EventNewToolpathLoaded.tags[8].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventNewToolpathLoaded.tags[9].name						:= 'PrintNumber';
			gDataCollection.EventNewToolpathLoaded.tags[9].value					:= UINT_TO_STRING(gPrintJobManagement.currentState.printNumber);
			gDataCollection.EventNewToolpathLoaded.tags[9].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventNewToolpathLoaded.tags[10].name					:= 'PrintOwner';
			gDataCollection.EventNewToolpathLoaded.tags[10].value					:= gPrintJobManagement.currentState.printOwner;
			gDataCollection.EventNewToolpathLoaded.tags[10].type					:= 'STRING';
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventNewToolpathLoaded';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventNewToolpathLoaded');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventNewToolpathLoaded');
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		12: //EventLayerStarted
			gDataCollection.EventLayerStarted.lot_id							:= '';
			gDataCollection.EventLayerStarted.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventLayerStarted.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventLayerStarted.timestamp);
			gDataCollection.EventLayerStarted.seq								:= gDataCollection.EventLayerStarted.timestamp;
			
			gDataCollection.EventLayerStarted.tags[0].name						:= 'CurrentLayerNumber';
			gDataCollection.EventLayerStarted.tags[0].value						:= UINT_TO_STRING(gPrintJobManagement.currentState.currentLayerNumber); 
			gDataCollection.EventLayerStarted.tags[0].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[1].name						:= 'NumberOfLayers';
			gDataCollection.EventLayerStarted.tags[1].value						:= UINT_TO_STRING(gPrintJobManagement.currentState.numberOfLayers); 
			gDataCollection.EventLayerStarted.tags[1].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[2].name						:= 'RemainingLayers';
			gDataCollection.EventLayerStarted.tags[2].value						:= UINT_TO_STRING(gPrintJobManagement.currentState.numberOfLayers - gPrintJobManagement.currentState.currentLayerNumber); 
			gDataCollection.EventLayerStarted.tags[2].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[3].name						:= 'RemainingHoursLow';
			gDataCollection.EventLayerStarted.tags[3].value						:= REAL_TO_STRING(gPrintJobManagement.status.remainingHoursLow); 
			gDataCollection.EventLayerStarted.tags[3].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[4].name						:= 'RemainingHoursHigh';
			gDataCollection.EventLayerStarted.tags[4].value						:= REAL_TO_STRING(gPrintJobManagement.status.remainingHoursHigh); 
			gDataCollection.EventLayerStarted.tags[4].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[5].name						:= 'LongestPauseString';
			gDataCollection.EventLayerStarted.tags[5].value						:= (gPrintJobManagement.status.longestPauseString); 
			gDataCollection.EventLayerStarted.tags[5].type						:= 'STRING'; // MLDS team handles it as a INT\
			gDataCollection.EventLayerStarted.tags[6].name						:= 'TotalPrintTimeHours';
			gDataCollection.EventLayerStarted.tags[6].value						:= REAL_TO_STRING(gPrintJobManagement.status.hoursElapsedInPrint); 
			gDataCollection.EventLayerStarted.tags[6].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[7].name						:= 'PrintUptimePercentRunning';
			gDataCollection.EventLayerStarted.tags[7].value						:= REAL_TO_STRING(gPrintJobManagement.status.availabilityDuringPrint); 
			gDataCollection.EventLayerStarted.tags[7].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[8].name						:= 'HoursBehindSchedule';
			gDataCollection.EventLayerStarted.tags[8].value						:= REAL_TO_STRING(gPrintJobManagement.status.hoursBehindSchedule); 
			gDataCollection.EventLayerStarted.tags[8].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[9].name						:= 'ProjectedFinishTime';
			gDataCollection.EventLayerStarted.tags[9].value						:= DT_TO_STRING(gPrintJobManagement.status.updatedEstOfPrintEndTime); 
			gDataCollection.EventLayerStarted.tags[9].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[10].name						:= 'RecoatsPerLayer';
			gDataCollection.EventLayerStarted.tags[10].value					:= REAL_TO_STRING(gPrintJobManagement.status.doubleRecoatRatio); 
			gDataCollection.EventLayerStarted.tags[10].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[11].name						:= 'TotalPowderRemaining';
			gDataCollection.EventLayerStarted.tags[11].value					:= REAL_TO_STRING(gPrintJobManagement.status.thisLayerTotalPowder); 
			gDataCollection.EventLayerStarted.tags[11].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[12].name						:= 'TotalPowderUsed';
			gDataCollection.EventLayerStarted.tags[12].value					:= REAL_TO_STRING(gPrintJobManagement.status.totalPowderUsed); 
			gDataCollection.EventLayerStarted.tags[12].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[13].name						:= 'TotalRequiredPowder';
			gDataCollection.EventLayerStarted.tags[13].value					:= REAL_TO_STRING(gPrintJobManagement.status.totalPowderReqToFinish); 
			gDataCollection.EventLayerStarted.tags[13].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventLayerStarted';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventLayerStarted');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventLayerStarted' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		13: //Online
			
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
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		14: //StatusStateChange
			
			gDataCollection.StatusStateChange.lot_id							:= '';
			gDataCollection.StatusStateChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.StatusStateChange.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusStateChange.timestamp);
			gDataCollection.StatusStateChange.seq								:= gDataCollection.StatusStateChange.timestamp;
			gDataCollection.StatusStateChange.tags[0].name						:= 'MachineState';
			gDataCollection.StatusStateChange.tags[0].value						:= 'COMPLETE'; 
			gDataCollection.StatusStateChange.tags[0].type						:= 'STRING';	
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'StatusStateChange';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/STATUS/StatusStateChange');
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE	
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'StatusStateChange');
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		15: //EventHerdingCleaningDone
			
			gDataCollection.EventHerdingCleaningDone.lot_id							:= '';
			gDataCollection.EventHerdingCleaningDone.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventHerdingCleaningDone.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventHerdingCleaningDone.timestamp);
			gDataCollection.EventHerdingCleaningDone.seq							:= gDataCollection.EventHerdingCleaningDone.timestamp; // changed this timestamp just for testing on validator app
			gDataCollection.EventHerdingCleaningDone.tags[0].name						:= 'Status';
			gDataCollection.EventHerdingCleaningDone.tags[0].value						:= 'Herding Cleaning Complete'; 
			gDataCollection.EventHerdingCleaningDone.tags[0].type						:= 'STRING';
			gDataCollection.EventHerdingCleaningDone.tags[1].name						:= 'HerdingBinFilllevel';
			gDataCollection.EventHerdingCleaningDone.tags[1].value						:= REAL_TO_STRING(gFilterApi.dataCollection.WasteBinFillLevel);
			gDataCollection.EventHerdingCleaningDone.tags[1].type						:= 'FLOAT32';
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventHerdingCleaningDone';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventHerdingCleaningDone');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventHerdingCleaningDone' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		16: //EventHerdingPassivationDone
			gDataCollection.EventHerdingPassivationDone.lot_id							:= '';
			gDataCollection.EventHerdingPassivationDone.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventHerdingPassivationDone.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventHerdingPassivationDone.timestamp);
			gDataCollection.EventHerdingPassivationDone.seq								:= gDataCollection.EventHerdingPassivationDone.timestamp;
			gDataCollection.EventHerdingPassivationDone.tags[0].name						:= 'Status';
			gDataCollection.EventHerdingPassivationDone.tags[0].value						:= 'Herding Passivation Complete'; 
			gDataCollection.EventHerdingPassivationDone.tags[0].type						:= 'STRING';	
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventHerdingPassivationDone';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventHerdingPassivationDone');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventHerdingPassivationDone' );		
				END_IF
			END_IF	
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		17: //EventStartOfOverheadFill
			gDataCollection.EventStartOfOverheadFill.lot_id							:= '';
			gDataCollection.EventStartOfOverheadFill.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventStartOfOverheadFill.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOfOverheadFill.timestamp);
			gDataCollection.EventStartOfOverheadFill.seq							:= gDataCollection.EventStartOfOverheadFill.timestamp;
			gDataCollection.EventStartOfOverheadFill.tags[0].name					:= 'FloorHopperLoadCell';
			gDataCollection.EventStartOfOverheadFill.tags[0].value					:= REAL_TO_STRING(gPowderApi.dataCollection.FloorHopperLoadCell);
			gDataCollection.EventStartOfOverheadFill.tags[0].type					:= 'FLOAT32';
			gDataCollection.EventStartOfOverheadFill.tags[1].name					:= 'OverheadHopperLoadCell';
			gDataCollection.EventStartOfOverheadFill.tags[1].value					:= REAL_TO_STRING(gPowderApi.dataCollection.OverheadHopperLoadCell);
			gDataCollection.EventStartOfOverheadFill.tags[1].type					:= 'FLOAT32';
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfOverheadFill';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfOverheadFill');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOfOverheadFill' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		18: //EventEndOfOverheadFill
			gDataCollection.EventEndOfOverheadFill.lot_id							:= '';
			gDataCollection.EventEndOfOverheadFill.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventEndOfOverheadFill.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfOverheadFill.timestamp);
			gDataCollection.EventEndOfOverheadFill.seq								:= gDataCollection.EventStartOfOverheadFill.timestamp;
			gDataCollection.EventEndOfOverheadFill.tags[0].name						:= 'FloorHopperLoadCell';
			gDataCollection.EventEndOfOverheadFill.tags[0].value					:= REAL_TO_STRING(gPowderApi.dataCollection.FloorHopperLoadCell);
			gDataCollection.EventEndOfOverheadFill.tags[0].type						:= 'FLOAT32';
			gDataCollection.EventEndOfOverheadFill.tags[1].name						:= 'OverheadHopperLoadCell';
			gDataCollection.EventEndOfOverheadFill.tags[1].value					:= REAL_TO_STRING(gPowderApi.dataCollection.OverheadHopperLoadCell);
			gDataCollection.EventEndOfOverheadFill.tags[1].type						:= 'FLOAT32';
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfOverheadFill';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfOverheadFill');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOfOverheadFill' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		19: //StatusSetupParChange
			
			gDataCollection.StatusSetupParChange.lot_id							:= '';
			gDataCollection.StatusSetupParChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.StatusSetupParChange.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusSetupParChange.timestamp);
			gDataCollection.StatusSetupParChange.seq							:= gDataCollection.StatusSetupParChange.timestamp;
			gDataCollection.StatusSetupParChange.tags[0].name					:= 'focalOffset';
			gDataCollection.StatusSetupParChange.tags[0].value					:= REAL_TO_STRING(gPrintJobManagement.currentState.focalOffset);  
			gDataCollection.StatusSetupParChange.tags[0].type					:= 'FLOAT32';
			gDataCollection.StatusSetupParChange.tags[1].name					:= 'bladeOffset';
			gDataCollection.StatusSetupParChange.tags[1].value					:= REAL_TO_STRING(gPrintJobManagement.currentState.recoaterOffset);  
			gDataCollection.StatusSetupParChange.tags[1].type					:= 'FLOAT32';
			gDataCollection.StatusSetupParChange.tags[2].name					:= 'plateThickness';
			gDataCollection.StatusSetupParChange.tags[2].value					:= REAL_TO_STRING(gPrintJobManagement.currentState.buildPlateThickness);  
			gDataCollection.StatusSetupParChange.tags[2].type					:= 'FLOAT32';
			gDataCollection.StatusSetupParChange.tags[3].name					:= 'bladeAngle';
			gDataCollection.StatusSetupParChange.tags[3].value					:= LREAL_TO_STRING(gLevelingApi.state.recoaterBladeAngle);
			gDataCollection.StatusSetupParChange.tags[3].type					:= 'FLOAT32'; // MLDS team handles it as a REAL
			gDataCollection.StatusSetupParChange.tags[4].name					:= 'scratchCoatMaxThickness';
			gDataCollection.StatusSetupParChange.tags[4].value					:= LREAL_TO_STRING(gLevelingApi.state.scratchCoatMaxThickness);
			gDataCollection.StatusSetupParChange.tags[4].type					:= 'FLOAT32'; // MLDS team handles it as a REAL
			gDataCollection.StatusSetupParChange.tags[5].name					:= 'bladeFlatness';
			gDataCollection.StatusSetupParChange.tags[5].value					:= LREAL_TO_STRING(gLevelingApi.state.recoaterBladeMaxErrorDistance);
			gDataCollection.StatusSetupParChange.tags[5].type					:= 'FLOAT32'; // MLDS team handles it as a REAL
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'StatusSetupParChange' ;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/STATUS/StatusSetupParChange');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'StatusSetupParChange');
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		20: //StatusCurrentOpChanged
			
			gDataCollection.StatusCurrentOpChanged.lot_id							:= '';
			gDataCollection.StatusCurrentOpChanged.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.StatusCurrentOpChanged.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusCurrentOpChanged.timestamp);
			gDataCollection.StatusCurrentOpChanged.seq								:= gDataCollection.StatusCurrentOpChanged.timestamp;
			gDataCollection.StatusCurrentOpChanged.tags[0].name						:= 'CurrentOperation';
			gDataCollection.StatusCurrentOpChanged.tags[0].type						:= 'STRING';
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'StatusCurrentOpChanged';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/STATUS/StatusCurrentOpChanged');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventCurrentOpChanged' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		21: //AlarmUpdateToAlarmList
			gDataCollection.AlarmUpdateToAlarmList.lot_id							:= '';
			gDataCollection.AlarmUpdateToAlarmList.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.AlarmUpdateToAlarmList.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.AlarmUpdateToAlarmList.timestamp);
			gDataCollection.AlarmUpdateToAlarmList.seq								:= gDataCollection.AlarmUpdateToAlarmList.timestamp;
			gDataCollection.AlarmUpdateToAlarmList.tags[0].name					:= 'AlarmScope';
			gDataCollection.AlarmUpdateToAlarmList.tags[0].type					:= 'STRING';
			gDataCollection.AlarmUpdateToAlarmList.tags[1].name					:= 'AlarmName';
			gDataCollection.AlarmUpdateToAlarmList.tags[1].type					:= 'STRING';
			gDataCollection.AlarmUpdateToAlarmList.tags[2].name					:= 'AlarmMessage';
			gDataCollection.AlarmUpdateToAlarmList.tags[2].type					:= 'STRING';
			gDataCollection.AlarmUpdateToAlarmList.tags[3].name					:= 'AlarmAdditionalInfo';
			gDataCollection.AlarmUpdateToAlarmList.tags[3].type					:= 'STRING';
			gDataCollection.AlarmUpdateToAlarmList.tags[4].name					:= 'AlarmCode';
			gDataCollection.AlarmUpdateToAlarmList.tags[4].type					:= 'STRING';
			gDataCollection.AlarmUpdateToAlarmList.tags[5].name					:= 'AlarmTimeStamp';
			gDataCollection.AlarmUpdateToAlarmList.tags[5].type					:= 'STRING';				
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'AlarmUpdateToAlarmList';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/ALARM/AlarmUpdateToAlarmList');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'AlarmUpdateToAlarmList');
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		22: //StatusProcessParChange
			gDataCollection.StatusProcessParChange.lot_id							:= '';
			gDataCollection.StatusProcessParChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.StatusProcessParChange.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusProcessParChange.timestamp);
			gDataCollection.StatusProcessParChange.seq								:= gDataCollection.StatusProcessParChange.timestamp;
	
			gDataCollection.StatusProcessParChange.tags[0].name						:= 'UserLoggedInDetails';
			//gDataCollection.StatusProcessParChange.tags[0].value						:= ; // Set elswhere
			gDataCollection.StatusProcessParChange.tags[0].type						:= 'STRING';
			gDataCollection.StatusProcessParChange.tags[1].name						:= 'continuousModeEnabled';
			//gDataCollection.StatusProcessParChange.tags[1].value						:= ; // Set elswhere
			gDataCollection.StatusProcessParChange.tags[1].type						:= 'BOOL';
			gDataCollection.StatusProcessParChange.tags[2].name						:= 'targetGasHeadFlowLPM';
			//gDataCollection.StatusProcessParChange.tags[2].value						:= ; // Set elswhere
			gDataCollection.StatusProcessParChange.tags[2].type						:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[3].name						:= 'recoatMoveVelocity';
			gDataCollection.StatusProcessParChange.tags[3].value						:= REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Velocity);
			gDataCollection.StatusProcessParChange.tags[3].type						:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[4].name						:= 'recoatMoveAccel';
			gDataCollection.StatusProcessParChange.tags[4].value						:= REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Acceleration);
			gDataCollection.StatusProcessParChange.tags[4].type						:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[5].name						:= 'recoatMoveDecel';
			gDataCollection.StatusProcessParChange.tags[5].value						:= REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Deceleration);
			gDataCollection.StatusProcessParChange.tags[5].type						:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[6].name						:= 'electrodeEnabled';
			//gDataCollection.StatusProcessParChange.tags[6].value						:= ; // Set elswhere
			gDataCollection.StatusProcessParChange.tags[6].type						:= 'BOOL';
			gDataCollection.StatusProcessParChange.tags[7].name						:= 'electrodeGain';
			//gDataCollection.StatusProcessParChange.tags[7].value						:= ; // Set elswhere
			gDataCollection.StatusProcessParChange.tags[7].type						:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[8].name						:= 'initialDispenseAugerRotations';
			//gDataCollection.StatusProcessParChange.tags[8].value						:= ; // Set elswhere
			gDataCollection.StatusProcessParChange.tags[8].type						:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[9].name						:= 'initialDispenseAugerVelocity';
			//gDataCollection.StatusProcessParChange.tags[9].value						:= ; // Set elswhere
			gDataCollection.StatusProcessParChange.tags[9].type						:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[10].name					:= 'continuousDispenseAugerRotations';
			//gDataCollection.StatusProcessParChange.tags[10].value						:= ; // Set elswhere
			gDataCollection.StatusProcessParChange.tags[10].type					:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[11].name					:= 'continuousDispenseAugerVelocity';
			//gDataCollection.StatusProcessParChange.tags[11].value						:= ; // Set elswhere
			gDataCollection.StatusProcessParChange.tags[11].type					:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[12].name					:= 'recoatMoveVelocity';
			gDataCollection.StatusProcessParChange.tags[12].value					:= REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Velocity);
			gDataCollection.StatusProcessParChange.tags[12].type					:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[13].name					:= 'recoatMoveAccel';
			gDataCollection.StatusProcessParChange.tags[13].value					:= REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Acceleration);
			gDataCollection.StatusProcessParChange.tags[13].type					:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[14].name					:= 'recoatMoveDecel';
			gDataCollection.StatusProcessParChange.tags[14].value					:= REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Deceleration);
			gDataCollection.StatusProcessParChange.tags[14].type					:= 'FLOAT32';
			gDataCollection.StatusProcessParChange.tags[15].name					:= 'AiMaxRecoatLimit';
			gDataCollection.StatusProcessParChange.tags[15].value					:= REAL_TO_STRING(gOpcData_ToVisionPC.AiMaxRecoatLimit);
			gDataCollection.StatusProcessParChange.tags[15].type					:= 'FLOAT32';
			
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'StatusProcessParChange';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/StatusProcessParChange');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'StatusProcessParChange' );	
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		23: //EventStartOfGasheadCleaning
			gDataCollection.EventStartOfGasheadCleaning.lot_id							:= '';
			gDataCollection.EventStartOfGasheadCleaning.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventStartOfGasheadCleaning.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOfGasheadCleaning.timestamp);
			gDataCollection.EventStartOfGasheadCleaning.seq								:= gDataCollection.EventStartOfGasheadCleaning.timestamp;
			gDataCollection.EventStartOfGasheadCleaning.tags[0].name					:= 'Status';
			gDataCollection.EventStartOfGasheadCleaning.tags[0].value					:= 'Gas Head Cleaning Started';
			gDataCollection.EventStartOfGasheadCleaning.tags[0].type					:= 'STRING';
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfGasheadCleaning';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfGasheadCleaning');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOfGasheadCleaning' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		24: //EventGasHeadCleaningEnd
			gDataCollection.EventEndOfGasheadCleaning.lot_id							:= '';
			gDataCollection.EventEndOfGasheadCleaning.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventEndOfGasheadCleaning.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfGasheadCleaning.timestamp);
			gDataCollection.EventEndOfGasheadCleaning.seq								:= gDataCollection.EventStartOfGasheadCleaning.timestamp;
			gDataCollection.EventEndOfGasheadCleaning.tags[0].name						:= 'Status';
			gDataCollection.EventEndOfGasheadCleaning.tags[0].value						:= 'Gas Head Cleaning Complete';
			gDataCollection.EventEndOfGasheadCleaning.tags[0].type						:= 'STRING';
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfGasheadCleaning';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfGasheadCleaning');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOfGasheadCleaning' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		25: //EventPostscanImageTaken
			gDataCollection.EventPostscanImageTaken.lot_id							:= '';
			gDataCollection.EventPostscanImageTaken.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPostscanImageTaken.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPostscanImageTaken.timestamp);
			gDataCollection.EventPostscanImageTaken.seq								:= gDataCollection.EventPostscanImageTaken.timestamp;
			gDataCollection.EventPostscanImageTaken.tags[0].name					    := 'Status';
			gDataCollection.EventPostscanImageTaken.tags[0].value					    := 'Post Scan Image taken';
			gDataCollection.EventPostscanImageTaken.tags[0].type					    := 'STRING';
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPostscanImageTaken';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPostscanImageTaken');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventPostscanImageTaken' );	
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		26: //EventPrescanImageTaken
			gDataCollection.EventPrescanImageTaken.lot_id							:= '';
			gDataCollection.EventPrescanImageTaken.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPrescanImageTaken.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPrescanImageTaken.timestamp);
			gDataCollection.EventPrescanImageTaken.seq								:= gDataCollection.EventPrescanImageTaken.timestamp;
			gDataCollection.EventPrescanImageTaken.tags[0].name						:= 'Status';
			gDataCollection.EventPrescanImageTaken.tags[0].value					    := 'PreScan Image taken';
			gDataCollection.EventPrescanImageTaken.tags[0].type						:= 'STRING';
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPrescanImageTaken';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPrescanImageTaken');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventPrescanImageTaken' );	
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		27: //EventOperatorRequired
			gDataCollection.EventOperatorRequired.lot_id							:= '';
			gDataCollection.EventOperatorRequired.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventOperatorRequired.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventOperatorRequired.timestamp);
			gDataCollection.EventOperatorRequired.seq								:= gDataCollection.EventOperatorRequired.timestamp	;
			gDataCollection.EventOperatorRequired.tags[0].name						    := 'ReasonForOperator';
			gDataCollection.EventOperatorRequired.tags[0].value						:= 'Not In Auto Mode';
			gDataCollection.EventOperatorRequired.tags[0].type						    := 'STRING';
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventOperatorRequired';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventOperatorRequired');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventOperatorRequired' );	
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		28: //EventSaveBladeScanData
			
			gDataCollection.EventSaveBladeScanData.lot_id := gBuildInformation.base_filename;
			gDataCollection.EventSaveBladeScanData.layer := gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventSaveBladeScanData.timestamp);
			gDataCollection.EventSaveBladeScanData.seq := gDataCollection.EventSaveBladeScanData.timestamp; 
			
			//BLADE DATA
			gDataCollection.EventSaveBladeScanData.tags[0].name := 'BladeData_yCoordinates';
			gDataCollection.EventSaveBladeScanData.tags[0].type := 'JSON';	
			gDataCollection.EventSaveBladeScanData.tags[1].name := 'BladeData_bladeOffsetRaw';
			gDataCollection.EventSaveBladeScanData.tags[1].type := 'JSON';
			gDataCollection.EventSaveBladeScanData.tags[2].name := 'BladeData_bladeOffsetMovingAverage';
			gDataCollection.EventSaveBladeScanData.tags[2].type := 'JSON';
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventSaveBladeScanData';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventSaveBladeScanData');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventSaveBladeScanData' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		29: //EventSaveSetupScanData
	
			gDataCollection.EventSaveSetupScanData.lot_id := gBuildInformation.base_filename;
			gDataCollection.EventSaveSetupScanData.layer := gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventSaveSetupScanData.timestamp);
			gDataCollection.EventSaveSetupScanData.seq := gDataCollection.EventSaveSetupScanData.timestamp;
			gDataCollection.EventSaveSetupScanData.tags[0].name := 'PlateData_xCoordinates';
			gDataCollection.EventSaveSetupScanData.tags[0].type := 'JSON';
			gDataCollection.EventSaveSetupScanData.tags[1].name := 'PlateData_yCoordinates';
			gDataCollection.EventSaveSetupScanData.tags[1].type := 'JSON';
			gDataCollection.EventSaveSetupScanData.tags[2].name := 'PlateData_plateFlat_parallelism';
			gDataCollection.EventSaveSetupScanData.tags[2].type := 'JSON';
			gDataCollection.EventSaveSetupScanData.tags[3].name := 'PlateData_plateWithBladeAngle_LDS';
			gDataCollection.EventSaveSetupScanData.tags[3].type := 'JSON';
			gDataCollection.EventSaveSetupScanData.tags[4].name := 'PlateData_scratchCoat_LDS';
			gDataCollection.EventSaveSetupScanData.tags[4].type := 'JSON';
			gDataCollection.EventSaveSetupScanData.tags[5].name := 'PlateData_scratchCoat_powderThickness';
			gDataCollection.EventSaveSetupScanData.tags[5].type := 'JSON';

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventSaveSetupScanData';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventSaveSetupScanData');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventSaveSetupScanData' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		30:
			//OMS Test Data Collection ==========================
			gDataCollection.EventStartOMSTest.lot_id						    := '';
			gDataCollection.EventStartOMSTest.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOMSTest.timestamp);
			gDataCollection.EventStartOMSTest.seq								:= gDataCollection.EventStartOMSTest.timestamp;

			gDataCollection.EventStartOMSTest.tags[0].name						:= 'NumberOfPixels';
			gDataCollection.EventStartOMSTest.tags[0].value						:= USINT_TO_STRING(gOpcData_ToGen3CalibApp.NumberOfPixels); 
			gDataCollection.EventStartOMSTest.tags[0].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventStartOMSTest.tags[1].name						:= 'LDSUpperLimit';
			gDataCollection.EventStartOMSTest.tags[1].value						:= REAL_TO_STRING(gOpcData_ToGen3CalibApp.LDSUpperLimit); 
			gDataCollection.EventStartOMSTest.tags[1].type						:= 'FLOAT32'; // MLDS team handles it as a REAL
			gDataCollection.EventStartOMSTest.tags[2].name						:= 'LDSLowerLimit';
			gDataCollection.EventStartOMSTest.tags[2].value						:= REAL_TO_STRING(gOpcData_ToGen3CalibApp.LDSLowerLimit); 
			gDataCollection.EventStartOMSTest.tags[2].type						:= 'FLOAT32'; // MLDS team handles it as a REAL
			gDataCollection.EventStartOMSTest.tags[3].name						:= 'CurrentLDSFocalOffset';
			gDataCollection.EventStartOMSTest.tags[3].value						:= REAL_TO_STRING(gOpcData_ToGen3CalibApp.LDSFocalOffset); 
			gDataCollection.EventStartOMSTest.tags[3].type						:= 'FLOAT32'; // MLDS team handles it as a REAL
			gDataCollection.EventStartOMSTest.tags[4].name						:= 'SensorNumber';
			gDataCollection.EventStartOMSTest.tags[4].value						:= gOpcData_ToGen3CalibApp.SensorNumber; 
			gDataCollection.EventStartOMSTest.tags[4].type						:= 'STRING'; // MLDS team handles it as a STRING
			gDataCollection.EventStartOMSTest.tags[5].name						:= 'DateOfExpiryOfCalibration';
			gDataCollection.EventStartOMSTest.tags[5].value						:= gOpcData_ToGen3CalibApp.DateOfExpiryOfCalibration; 
			gDataCollection.EventStartOMSTest.tags[5].type						:= 'STRING'; // MLDS team handles it as a STRING
			gDataCollection.EventStartOMSTest.tags[6].name						:= 'OMSTestType';
			gDataCollection.EventStartOMSTest.tags[6].value						:= gOpcData_ToGen3CalibApp.OMSTestType; 
			gDataCollection.EventStartOMSTest.tags[6].type						:= 'STRING'; // MLDS team handles it as a STRING
			gDataCollection.EventStartOMSTest.tags[7].name						:= 'OperatorRunningTest';
			gDataCollection.EventStartOMSTest.tags[7].value						:= gOpcData_ToGen3CalibApp.OperatorRunningTest; 
			gDataCollection.EventStartOMSTest.tags[7].type						:= 'STRING'; // MLDS team handles it as a STRING
			gDataCollection.EventStartOMSTest.tags[8].name						:= 'OBSpecificationNumber';
			gDataCollection.EventStartOMSTest.tags[8].value						:= gOpcData_ToGen3CalibApp.OBSpecificationNumber; 
			gDataCollection.EventStartOMSTest.tags[8].type						:= 'STRING'; // MLDS team handles it as a STRING
			gDataCollection.EventStartOMSTest.tags[9].name						:= 'OBSerialNumber';
			gDataCollection.EventStartOMSTest.tags[9].value						:= gOpcData_ToGen3CalibApp.OBSerialNumber; 
			gDataCollection.EventStartOMSTest.tags[9].type						:= 'STRING'; // MLDS team handles it as a STRING

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOMSTest';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOMSTest');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOMSTest' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		31:
			//OMS Test Data Collection ==========================
			gDataCollection.EventEndOMSTest.lot_id						        := '';
			gDataCollection.EventEndOMSTest.lot_id							    := gPrintJobManagement.currentState.baseFilename;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOMSTest.timestamp);
			gDataCollection.EventEndOMSTest.seq									:= gDataCollection.EventEndOMSTest.timestamp;

			gDataCollection.EventEndOMSTest.tags[0].name						:= 'NumberOfPixels';
			gDataCollection.EventEndOMSTest.tags[0].value						:= USINT_TO_STRING(gOpcData_ToGen3CalibApp.NumberOfPixels); 
			gDataCollection.EventEndOMSTest.tags[0].type						:= 'INT32'; 
			gDataCollection.EventEndOMSTest.tags[1].name						:= 'LDSUpperLimit';
			gDataCollection.EventEndOMSTest.tags[1].value						:= REAL_TO_STRING(gOpcData_ToGen3CalibApp.LDSUpperLimit); 
			gDataCollection.EventEndOMSTest.tags[1].type						:= 'FLOAT32'; 
			gDataCollection.EventEndOMSTest.tags[2].name						:= 'LDSLowerLimit';
			gDataCollection.EventEndOMSTest.tags[2].value						:= REAL_TO_STRING(gOpcData_ToGen3CalibApp.LDSLowerLimit); 
			gDataCollection.EventEndOMSTest.tags[2].type						:= 'FLOAT32'; 
			gDataCollection.EventEndOMSTest.tags[3].name						:= 'CurrentLDSFocalOffset';
			gDataCollection.EventEndOMSTest.tags[3].value						:= REAL_TO_STRING(gOpcData_ToGen3CalibApp.LDSFocalOffset); 
			gDataCollection.EventEndOMSTest.tags[3].type						:= 'FLOAT32'; 
			gDataCollection.EventEndOMSTest.tags[4].name						:= 'SensorNumber';
			gDataCollection.EventEndOMSTest.tags[4].value						:= gOpcData_ToGen3CalibApp.SensorNumber; 
			gDataCollection.EventEndOMSTest.tags[4].type						:= 'STRING'; 
			gDataCollection.EventEndOMSTest.tags[5].name						:= 'DateOfExpiryOfCalibration';
			gDataCollection.EventEndOMSTest.tags[5].value						:= gOpcData_ToGen3CalibApp.DateOfExpiryOfCalibration; 
			gDataCollection.EventEndOMSTest.tags[5].type						:= 'STRING'; 
			gDataCollection.EventEndOMSTest.tags[6].name						:= 'OMSTestType';
			gDataCollection.EventEndOMSTest.tags[6].value						:= gOpcData_ToGen3CalibApp.OMSTestType; 
			gDataCollection.EventEndOMSTest.tags[6].type						:= 'STRING'; 
			gDataCollection.EventEndOMSTest.tags[7].name						:= 'OperatorRunningTest';
			gDataCollection.EventEndOMSTest.tags[7].value						:= gOpcData_ToGen3CalibApp.OperatorRunningTest; 
			gDataCollection.EventEndOMSTest.tags[7].type						:= 'STRING';  
			gDataCollection.EventEndOMSTest.tags[8].name						:= 'OMSProcessorStatus';
			gDataCollection.EventEndOMSTest.tags[8].value						:= USINT_TO_STRING(gOpcData_FromGen3CalibApp.OmsProcessorStatus); 
			gDataCollection.EventEndOMSTest.tags[8].type						:= 'INT32'; 
			gDataCollection.EventEndOMSTest.tags[9].name						:= 'CalculatedFocalLdsValid';
			gDataCollection.EventEndOMSTest.tags[9].value						:= BOOL_TO_STRING(gOpcData_FromGen3CalibApp.CalculatedFocalLdsValid); 
			gDataCollection.EventEndOMSTest.tags[9].type						:= 'BOOL';
			gDataCollection.EventEndOMSTest.tags[10].name						:= 'CalculatedFocalLds';
			gDataCollection.EventEndOMSTest.tags[10].value					    := REAL_TO_STRING(gOpcData_FromGen3CalibApp.CalculatedFocalLds); 
			gDataCollection.EventEndOMSTest.tags[10].type						:= 'FLOAT32';
			gDataCollection.EventEndOMSTest.tags[11].name						:= 'CameraSavePath';
			gDataCollection.EventEndOMSTest.tags[11].value					    := gOpcData_FromGen3CalibApp.CameraSavePath; 
			gDataCollection.EventEndOMSTest.tags[11].type						:= 'STRING';
			gDataCollection.EventEndOMSTest.tags[12].name					    := 'S3Path';
			gDataCollection.EventEndOMSTest.tags[12].value					    := gOpcData_FromGen3CalibApp.S3Path; 
			gDataCollection.EventEndOMSTest.tags[12].type					    := 'STRING';
			gDataCollection.EventEndOMSTest.tags[13].name					    := 'LaserLineAngle';
			gDataCollection.EventEndOMSTest.tags[13].value					    := REAL_TO_STRING(gOpcData_FromGen3CalibApp.LaserLineAngle); 
			gDataCollection.EventEndOMSTest.tags[13].type					    := 'FLOAT32';
			gDataCollection.EventEndOMSTest.tags[14].name					    := 'LaserSpacing';
			gDataCollection.EventEndOMSTest.tags[14].value					    := REAL_TO_STRING(gOpcData_FromGen3CalibApp.LaserSpacing); 
			gDataCollection.EventEndOMSTest.tags[14].type					    := 'FLOAT32';
			gDataCollection.EventEndOMSTest.tags[15].name						:= 'OBSpecificationNumber';
			gDataCollection.EventEndOMSTest.tags[15].value						:= gOpcData_ToGen3CalibApp.OBSpecificationNumber; 
			gDataCollection.EventEndOMSTest.tags[15].type						:= 'STRING'; // MLDS team handles it as a STRING
			gDataCollection.EventEndOMSTest.tags[16].name						:= 'OBSerialNumber';
			gDataCollection.EventEndOMSTest.tags[16].value						:= gOpcData_ToGen3CalibApp.OBSerialNumber; 
			gDataCollection.EventEndOMSTest.tags[16].type						:= 'STRING'; // MLDS team handles it as a STRING

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOMSTest';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOMSTest');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOMSTest' );
				END_IF
			END_IF
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		32:
			//OMS Test Data Collection ==========================
			gDataCollection.EventOMSTestResult.lot_id						        := '';
			gDataCollection.EventOMSTestResult.lot_id							    := gPrintJobManagement.currentState.baseFilename;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventOMSTestResult.timestamp);
			gDataCollection.EventOMSTestResult.seq									:= gDataCollection.EventOMSTestResult.timestamp;

			gDataCollection.EventOMSTestResult.tags[0].name							:= 'BeamProfilePixelResult';
			gDataCollection.EventOMSTestResult.tags[0].value						:= gOpcData_FromGen3CalibApp.BeamProfilePixelResult; 
			gDataCollection.EventOMSTestResult.tags[0].type							:= 'JSON'; 


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventOMSTestResult';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventOMSTestResult');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventOMSTestResult' );
				END_IF
			END_IF
				
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		33:
			//Status User LoggedIn Data Collection ==========================
			gDataCollection.StatusUserLoggedIn.lot_id							:= '';
			gDataCollection.StatusUserLoggedIn.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.StatusUserLoggedIn.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusUserLoggedIn.timestamp);
			gDataCollection.StatusUserLoggedIn.seq								:= gDataCollection.StatusUserLoggedIn.timestamp;
	
			gDataCollection.StatusUserLoggedIn.tags[0].name					:= 'UserLoggedIn';
			gDataCollection.StatusUserLoggedIn.tags[0].value				:= 'SIM Test Name';
			gDataCollection.StatusUserLoggedIn.tags[0].type					:= 'STRING';
			gDataCollection.StatusUserLoggedIn.tags[1].name					:= 'LoggedInUserGroup';
			gDataCollection.StatusUserLoggedIn.tags[1].value				:= 'SIM Test Group';
			gDataCollection.StatusUserLoggedIn.tags[1].type					:= 'STRING';
	
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
			
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'StatusUserLoggedIn';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/STATUS/StatusUserLoggedIn');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'StatusUserLoggedIn' );
				END_IF
		
			END_IF
				
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
				
		34:
			//Status User LoggedOut Data Collection ==========================
			gDataCollection.StatusUserLoggedOut.lot_id							:= '';
			gDataCollection.StatusUserLoggedOut.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.StatusUserLoggedOut.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusUserLoggedOut.timestamp);
			gDataCollection.StatusUserLoggedOut.seq								:= gDataCollection.StatusUserLoggedOut.timestamp;
	
			gDataCollection.StatusUserLoggedOut.tags[0].name						:= 'UserLoggingOut';
			gDataCollection.StatusUserLoggedOut.tags[0].value						:= 'SIM Test Name';
			gDataCollection.StatusUserLoggedOut.tags[0].type						:= 'STRING';
			gDataCollection.StatusUserLoggedOut.tags[1].name						:= 'LoggingOutUserGroup';
			gDataCollection.StatusUserLoggedOut.tags[1].value						:= 'SIM Test Group';
			gDataCollection.StatusUserLoggedOut.tags[1].type						:= 'STRING';
	
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
			
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'StatusUserLoggedOut';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/STATUS/StatusUserLoggedOut');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'StatusUserLoggedOut' );
				END_IF
		
			END_IF
				
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		35:
			// Event Build Start
			gDataCollection.EventBuildStart.lot_id								:= '';
			gDataCollection.EventBuildStart.lot_id								:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventBuildStart.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventBuildStart.timestamp);
			gDataCollection.EventBuildStart.seq									:= gDataCollection.EventBuildStart.timestamp;

			gDataCollection.EventBuildStart.tags[0].name						:= 'BuildStartInfo';
			gDataCollection.EventBuildStart.tags[0].value						:= 'Build Started'; 
			gDataCollection.EventBuildStart.tags[1].name						:= 'BuildStartTime';
			gDataCollection.EventBuildStart.tags[0].type						:= 'STRING'; 
			gDataCollection.EventBuildStart.tags[1].value						:= 	gDataCollection.EventBuildStart.timestamp; 
			gDataCollection.EventBuildStart.tags[1].type						:= 'STRING'; 
	
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
						
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventBuildStart';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventBuildStart');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventBuildStart' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		36:
			// Event Build End
			gDataCollection.EventBuildEnd.lot_id								:= '';
			gDataCollection.EventBuildEnd.lot_id								:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventBuildEnd.layer									:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventBuildEnd.timestamp);
			gDataCollection.EventBuildEnd.seq									:= gDataCollection.EventBuildEnd.timestamp;

			gDataCollection.EventBuildEnd.tags[0].value						:= 'Build Complete'; 
			gDataCollection.EventBuildEnd.tags[0].name						:= 'BuildEndInfo';
			gDataCollection.EventBuildEnd.tags[0].type						:= 'STRING'; 
			gDataCollection.EventBuildEnd.tags[1].name						:= 'BuildEndTime';
			gDataCollection.EventBuildEnd.tags[1].value						:= 	gDataCollection.EventBuildEnd.timestamp; 
			gDataCollection.EventBuildEnd.tags[1].type						:= 'STRING'; 
			
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
				IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
						
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventBuildEnd';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventBuildEnd');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF	
				ELSE
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventBuildEnd' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		37:
			// Herding Cleaning Started Data Collection ==========================
			gDataCollection.EventHerdingCleaningStarted.lot_id							:= '';
			gDataCollection.EventHerdingCleaningStarted.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventHerdingCleaningStarted.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventHerdingCleaningStarted.timestamp);
			gDataCollection.EventHerdingCleaningStarted.seq								:= gDataCollection.EventHerdingCleaningStarted.timestamp;
			
			gDataCollection.EventHerdingCleaningStarted.tags[0].name						:= 'Status';
			gDataCollection.EventHerdingCleaningStarted.tags[0].value						:= 'Herding Cleaning Started'; 
			gDataCollection.EventHerdingCleaningStarted.tags[0].type						:= 'STRING';
			gDataCollection.EventHerdingCleaningStarted.tags[1].name						:= 'HerdingBinFillLevelStart';
			gDataCollection.EventHerdingCleaningStarted.tags[1].value						:= REAL_TO_STRING(gFilterApi.dataCollection.WasteBinFillLevel);
			gDataCollection.EventHerdingCleaningStarted.tags[1].type						:= 'FLOAT32';
						
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventHerdingCleaningStarted';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventHerdingCleaningStarted');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventHerdingCleaningStarted' );
				END_IF
			END_IF	
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		38:
			//EventLayerEnded ==========================
			gDataCollection.EventLayerEnded.lot_id								:= '';
			gDataCollection.EventLayerEnded.lot_id								:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventLayerEnded.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventLayerEnded.timestamp);
			gDataCollection.EventLayerEnded.seq									:= gDataCollection.EventLayerStarted.timestamp;

			gDataCollection.EventLayerEnded.tags[0].name						:= 'CurrentLayerNumber';
			gDataCollection.EventLayerEnded.tags[0].value						:= UINT_TO_STRING(gPrintJobManagement.currentState.currentLayerNumber); 
			gDataCollection.EventLayerEnded.tags[0].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerEnded.tags[1].name						:= 'NumberOfLayers';
			gDataCollection.EventLayerEnded.tags[1].value						:= UINT_TO_STRING(gPrintJobManagement.currentState.numberOfLayers); 
			gDataCollection.EventLayerEnded.tags[1].type						:= 'INT32'; // MLDS team handles it as a INT

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventLayerEnded';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventLayerEnded');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventLayerEnded' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		39:	
		
			// EventGreasePumpRun ==========================
			gDataCollection.EventGreasePumpRun.lot_id						:= '';
			gDataCollection.EventGreasePumpRun.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventGreasePumpRun.layer						:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventGreasePumpRun.timestamp);
			gDataCollection.EventGreasePumpRun.seq							:= gDataCollection.EventGreasePumpRun.timestamp;

			gDataCollection.EventGreasePumpRun.tags[0].name					:= 'NumberOfCyclesGreasePumpRan';
		//	gDataCollection.EventGreasePumpRun.tags[0].value				:= USINT_TO_STRING(task.internal.cyclesrun);
			gDataCollection.EventGreasePumpRun.tags[0].type					:= 'INT32';

			gDataCollection.EventGreasePumpRun.tags[1].name					:= 'TrajectoryOfGreasing';
			gDataCollection.EventGreasePumpRun.tags[1].value				:= UDINT_TO_STRING(gPrintJobManagement.currentState.totalTrajectory);
			gDataCollection.EventGreasePumpRun.tags[1].type					:= 'INT32';
			

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventGreasePumpRun';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventGreasePumpRun');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventGreasePumpRun' );	
				END_IF
			END_IF	
		
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		40:
			
			//Data collection for Event Start Of Purge
			gDataCollection.EventStartOfPurge.lot_id							:= '';
			gDataCollection.EventStartOfPurge.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventStartOfPurge.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOfPurge.timestamp);
			gDataCollection.EventStartOfPurge.seq								:= gDataCollection.EventStartOfPurge.timestamp;
	
			gDataCollection.EventStartOfPurge.tags[0].name					:= 'PrintZoneO2Percentage';
			gDataCollection.EventStartOfPurge.tags[0].value					:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneO2Percentage);  
			gDataCollection.EventStartOfPurge.tags[0].type					:= 'FLOAT32';
			gDataCollection.EventStartOfPurge.tags[1].name					:= 'LoadZoneO2Percentage';
			gDataCollection.EventStartOfPurge.tags[1].value					:= REAL_TO_STRING(gGasApi.dataCollection.LoadZoneO2Percentage);  
			gDataCollection.EventStartOfPurge.tags[1].type					:= 'FLOAT32';
			gDataCollection.EventStartOfPurge.tags[2].name					:= 'PrintZoneSafetyBoxO2Percentage';
			gDataCollection.EventStartOfPurge.tags[2].value					:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneSafetyBoxO2Percentage);  
			gDataCollection.EventStartOfPurge.tags[2].type					:= 'FLOAT32';
			gDataCollection.EventStartOfPurge.tags[3].name					:= 'TransportPodO2Percentage';
			gDataCollection.EventStartOfPurge.tags[3].value					:= REAL_TO_STRING(gGasApi.dataCollection.TransportPodO2Percentage);  
			gDataCollection.EventStartOfPurge.tags[3].type					:= 'FLOAT32';
			gDataCollection.EventStartOfPurge.tags[4].name					:= 'PrintZoneO2Ppm';
			gDataCollection.EventStartOfPurge.tags[4].value					:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneO2ppm);  
			gDataCollection.EventStartOfPurge.tags[4].type					:= 'FLOAT32';
					
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
								
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfPurge';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfPurge');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventStartOfPurge');
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		41:
			//Data collection for Event End Of Purge
			gDataCollection.EventEndOfPurge.lot_id							:= '';
			gDataCollection.EventEndOfPurge.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventEndOfPurge.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfPurge.timestamp);
			gDataCollection.EventEndOfPurge.seq								:= gDataCollection.EventStartOfPurge.timestamp;
		
			gDataCollection.EventEndOfPurge.tags[0].name					:= 'PrintZoneO2Percentage';
			gDataCollection.EventEndOfPurge.tags[0].value					:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneO2Percentage);  
			gDataCollection.EventEndOfPurge.tags[0].type					:= 'FLOAT32';
			gDataCollection.EventEndOfPurge.tags[1].name					:= 'LoadZoneO2Percentage';
			gDataCollection.EventEndOfPurge.tags[1].value					:= REAL_TO_STRING(gGasApi.dataCollection.LoadZoneO2Percentage);  
			gDataCollection.EventEndOfPurge.tags[1].type					:= 'FLOAT32';
			gDataCollection.EventEndOfPurge.tags[2].name					:= 'PrintZoneSafetyBoxO2Percentage';
			gDataCollection.EventEndOfPurge.tags[2].value					:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneSafetyBoxO2Percentage);  
			gDataCollection.EventEndOfPurge.tags[2].type					:= 'FLOAT32';
			gDataCollection.EventEndOfPurge.tags[3].name					:= 'TransportPodO2Percentage';
			gDataCollection.EventEndOfPurge.tags[3].value					:= REAL_TO_STRING(gGasApi.dataCollection.TransportPodO2Percentage);  
			gDataCollection.EventEndOfPurge.tags[3].type					:= 'FLOAT32';
			gDataCollection.EventEndOfPurge.tags[4].name					:= 'PrintZoneO2Ppm';
			gDataCollection.EventEndOfPurge.tags[4].value					:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneO2ppm);  
			gDataCollection.EventEndOfPurge.tags[4].type					:= 'FLOAT32';
			gDataCollection.EventEndOfPurge.tags[5].name					:= 'TotalArgonConsumption'; 
			//gDataCollection.EventEndOfPurge.tags[5].value					:= REAL_TO_STRING(scaledTotalArgonUsage); 
			gDataCollection.EventEndOfPurge.tags[5].type					:= 'FLOAT32';
						
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
								
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfPurge';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfPurge');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventEndOfPurge');
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		42: 
			//Data collection for Event Maintain Purge
				gDataCollection.EventMaintainPurge.lot_id							:= '';
				gDataCollection.EventMaintainPurge.lot_id							:= gPrintJobManagement.currentState.baseFilename;
				gDataCollection.EventMaintainPurge.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
				VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventMaintainPurge.timestamp);
				gDataCollection.EventMaintainPurge.seq								:= gDataCollection.EventStartOfPurge.timestamp;
		
				gDataCollection.EventMaintainPurge.tags[0].name					:= 'PrintZoneO2Percentage';
				gDataCollection.EventMaintainPurge.tags[0].value				:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneO2Percentage);  
				gDataCollection.EventMaintainPurge.tags[0].type					:= 'FLOAT32';
				gDataCollection.EventMaintainPurge.tags[1].name					:= 'LoadZoneO2Percentage';
				gDataCollection.EventMaintainPurge.tags[1].value				:= REAL_TO_STRING(gGasApi.dataCollection.LoadZoneO2Percentage);  
				gDataCollection.EventMaintainPurge.tags[1].type					:= 'FLOAT32';
				gDataCollection.EventMaintainPurge.tags[2].name					:= 'PrintZoneSafetyBoxO2Percentage';
				gDataCollection.EventMaintainPurge.tags[2].value				:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneSafetyBoxO2Percentage);  
				gDataCollection.EventMaintainPurge.tags[2].type					:= 'FLOAT32';
				gDataCollection.EventMaintainPurge.tags[3].name					:= 'TransportPodO2Percentage';
				gDataCollection.EventMaintainPurge.tags[3].value				:= REAL_TO_STRING(gGasApi.dataCollection.TransportPodO2Percentage);  
				gDataCollection.EventMaintainPurge.tags[3].type					:= 'FLOAT32';
				gDataCollection.EventMaintainPurge.tags[4].name					:= 'PrintZoneO2Ppm';
				gDataCollection.EventMaintainPurge.tags[4].value				:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneO2ppm);  
				gDataCollection.EventMaintainPurge.tags[4].type					:= 'FLOAT32';
				gDataCollection.EventMaintainPurge.tags[5].name					:= 'TotalArgonConsumption';
				//gDataCollection.EventMaintainPurge.tags[5].value				:= REAL_TO_STRING(scaledTotalArgonUsage); 
				gDataCollection.EventMaintainPurge.tags[5].type					:= 'FLOAT32';
				gDataCollection.EventMaintainPurge.tags[6].name					:= 'TimeNeededForArgonHighFlowToMaintain';
				//gDataCollection.EventMaintainPurge.tags[6].value				:= ; Set Above 
				gDataCollection.EventMaintainPurge.tags[6].type					:= 'STRING';
						
				IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
					IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
								
						gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventMaintainPurge';
						gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
						gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
						gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
						gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventMaintainPurge');
						gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
						IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
							gMQTTApi.status.bufferIsFull := TRUE;
						END_IF
					ELSE	
						vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventMaintainPurge');
					END_IF
				END_IF
				
				messageIndex := MQTT_MESSAGE_SEQUENCE;
				MQTT_MESSAGE_SEQUENCE := 0;
		
		43:
			// Config All Data Collection ==========================
			gDataCollection.EventPublishConfigAll.lot_id							:= '';
			gDataCollection.EventPublishConfigAll.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPublishConfigAll.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPublishConfigAll.timestamp);
			gDataCollection.EventPublishConfigAll.seq								:= gDataCollection.EventPublishConfigAll.timestamp;
			
			gDataCollection.EventPublishConfigAll.tags[CFGO1].name := 'BUILD_PLATE_THICKNESS_MAX_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGO1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGO1].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGO2].name := 'BLADE_OFFSET_MAX_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGO2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGO2].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGO3].name := 'FOCAL_OFFSET_MAX_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGO3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGO3].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGO4].name := 'FOCAL_OFFSET_MIN_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGO4].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGO4].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGO5].name := 'FOCAL_OFFSET_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGO5].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGO5].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGO6].name := 'OPTICS_BOX_REVISION';
			gDataCollection.EventPublishConfigAll.tags[CFGO6].type := 'STRING';
			gDataCollection.EventPublishConfigAll.tags[CFGO6].value := USINT_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGO7].name := 'BLADE_OFFSET_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGO7].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGO7].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGR1].name := 'FILL_PLATE_RECOAT_CYCLES';
			gDataCollection.EventPublishConfigAll.tags[CFGR1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGR1].value := USINT_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI1].name := 'OMS_ZABER_POSITION_WAYPOINTS_MM[0]';
			gDataCollection.EventPublishConfigAll.tags[CFGI1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI1].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI2].name := 'OMS_ZABER_POSITION_WAYPOINTS_MM[1]';
			gDataCollection.EventPublishConfigAll.tags[CFGI2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI2].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI3].name := 'OMS_ZABER_POSITION_WAYPOINTS_MM[2]';
			gDataCollection.EventPublishConfigAll.tags[CFGI3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI3].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI4].name := 'OMS_ZABER_POSITION_WAYPOINTS_MM[3]';
			gDataCollection.EventPublishConfigAll.tags[CFGI4].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI4].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI5].name := 'OMS_ZABER_POSITION_WAYPOINTS_MM[4]';
			gDataCollection.EventPublishConfigAll.tags[CFGI5].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI5].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI6].name := 'OMS_ZABER_POSITION_WAYPOINTS_MM[5]';
			gDataCollection.EventPublishConfigAll.tags[CFGI6].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI6].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI7].name := 'OMS_ZABER_POSITION_WAYPOINTS_MM[6]';
			gDataCollection.EventPublishConfigAll.tags[CFGI7].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI7].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI8].name := 'OMS_ZABER_POSITION_WAYPOINTS_MM[7]';
			gDataCollection.EventPublishConfigAll.tags[CFGI8].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI8].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI9].name := 'OMS_ZABER_POSITION_WAYPOINTS_MM[8]';
			gDataCollection.EventPublishConfigAll.tags[CFGI9].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI9].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI10].name := 'OMS_ZABER_POSITION_WAYPOINTS_MM[9]';
			gDataCollection.EventPublishConfigAll.tags[CFGI10].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI10].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI11].name := 'OMS_ZABER_POSITION_WAYPOINTS_MM[10]';
			gDataCollection.EventPublishConfigAll.tags[CFGI11].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI11].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI12].name := 'OMS_ZABER_EXPOSURE_WAYPOINTS_S[0]';
			gDataCollection.EventPublishConfigAll.tags[CFGI12].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI12].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI13].name := 'OMS_ZABER_EXPOSURE_WAYPOINTS_S[1]';
			gDataCollection.EventPublishConfigAll.tags[CFGI13].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI13].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI14].name := 'OMS_ZABER_EXPOSURE_WAYPOINTS_S[2]';
			gDataCollection.EventPublishConfigAll.tags[CFGI14].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI14].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI15].name := 'OMS_ZABER_EXPOSURE_WAYPOINTS_S[3]';
			gDataCollection.EventPublishConfigAll.tags[CFGI15].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI15].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI16].name := 'OMS_ZABER_EXPOSURE_WAYPOINTS_S[4]';
			gDataCollection.EventPublishConfigAll.tags[CFGI16].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI16].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI17].name := 'OMS_ZABER_EXPOSURE_WAYPOINTS_S[5]';
			gDataCollection.EventPublishConfigAll.tags[CFGI17].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI17].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI18].name := 'OMS_ZABER_EXPOSURE_WAYPOINTS_S[6]';
			gDataCollection.EventPublishConfigAll.tags[CFGI18].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI18].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI19].name := 'OMS_ZABER_EXPOSURE_WAYPOINTS_S[7]';
			gDataCollection.EventPublishConfigAll.tags[CFGI19].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI19].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI20].name := 'OMS_ZABER_EXPOSURE_WAYPOINTS_S[8]';
			gDataCollection.EventPublishConfigAll.tags[CFGI20].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI20].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI21].name := 'OMS_ZABER_EXPOSURE_WAYPOINTS_S[9]';
			gDataCollection.EventPublishConfigAll.tags[CFGI21].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI21].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI22].name := 'OMS_ZABER_EXPOSURE_WAYPOINTS_S[10]';
			gDataCollection.EventPublishConfigAll.tags[CFGI22].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI22].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGI23].name := 'OMS_ZABER_POSITION_STEP_SIZE_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGI23].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGI23].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGA1].name := 'ELECTRODE_ENABLED_BLADE_SETUP';
			gDataCollection.EventPublishConfigAll.tags[CFGA1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGA1].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));		
			gDataCollection.EventPublishConfigAll.tags[CFGA2].name := 'LDS_BLOWOFF_ENABLED_FOR_SETUP';
			gDataCollection.EventPublishConfigAll.tags[CFGA2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGA2].value := UDINT_TO_STRING(BOOL_TO_UDINT(0));		
			gDataCollection.EventPublishConfigAll.tags[CFGB1].name := 'ENCODER_RESET_DELAY_S';
			gDataCollection.EventPublishConfigAll.tags[CFGB1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGB1].value := REAL_TO_STRING(0);	
			gDataCollection.EventPublishConfigAll.tags[CFGB2].name := 'GAS_HEAD_SWITCH_TRIGGER_TIME_S';
			gDataCollection.EventPublishConfigAll.tags[CFGB2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGB2].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGB3].name := 'VFLCR_REFERENCE_POS_X';
			gDataCollection.EventPublishConfigAll.tags[CFGB3].type := 'FLOAT64';
			gDataCollection.EventPublishConfigAll.tags[CFGB3].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGB4].name := 'VFLCR_REFERENCE_POS_Y';
			gDataCollection.EventPublishConfigAll.tags[CFGB4].type := 'FLOAT64';
			gDataCollection.EventPublishConfigAll.tags[CFGB4].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGQ1].name := 'ELECTRODE_COMMANDED_POWER_PCT';
			gDataCollection.EventPublishConfigAll.tags[CFGQ1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGQ1].value := REAL_TO_STRING(0);	
			gDataCollection.EventPublishConfigAll.tags[CFGQ2].name := 'ELECTRODE_ENABLED_FOR_RECOAT';
			gDataCollection.EventPublishConfigAll.tags[CFGQ2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGQ2].value := UDINT_TO_STRING(BOOL_TO_UDINT(0));	
			gDataCollection.EventPublishConfigAll.tags[CFGK1].name := 'BLADE_DEFLECTION_ACTUAL';
			gDataCollection.EventPublishConfigAll.tags[CFGK1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGK1].value := REAL_TO_STRING(0);	
			gDataCollection.EventPublishConfigAll.tags[CFGS1].name := 'ENGAGE_VOLUME_RETRY_DISTANCE_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGS1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGS1].value := LREAL_TO_STRING(0);		
			gDataCollection.EventPublishConfigAll.tags[CFGS2].name := 'ENGAGE_VOLUME_RETRY_VEL_MMS';
			gDataCollection.EventPublishConfigAll.tags[CFGS2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGS2].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGS3].name := 'SHUTTLE_SEARCH_DISTANCE_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGS3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGS3].value := LREAL_TO_STRING(0);		
			gDataCollection.EventPublishConfigAll.tags[CFGS4].name := 'SHUTTLE_SEARCH_VELOCITY_MMS';
			gDataCollection.EventPublishConfigAll.tags[CFGS4].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGS4].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGM1].name := 'COMMISSIONING_POD_NOT_INSTALLED';
			gDataCollection.EventPublishConfigAll.tags[CFGM1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGM1].value := UDINT_TO_STRING(BOOL_TO_UDINT(0));		
			gDataCollection.EventPublishConfigAll.tags[CFGM2].name := 'DISABLE_GAP_CHECK_SENSOR';
			gDataCollection.EventPublishConfigAll.tags[CFGM2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGM2].value := UDINT_TO_STRING(BOOL_TO_UDINT(0));
			gDataCollection.EventPublishConfigAll.tags[CFGX1].name := 'LDS_BLOWOFF_ENABLED_FOR_SETUP';
			gDataCollection.EventPublishConfigAll.tags[CFGX1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGX1].value := USINT_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGJ1].name := 'BLADE_FLATNESS_MAX_ERROR_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGJ1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ1].value := LREAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGJ2].name := 'BLADE_ANGLE_MAX_MRAD';
			gDataCollection.EventPublishConfigAll.tags[CFGJ2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ2].value := LREAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGJ3].name := 'LDS_DESIRED_AVG_TIME_US';
			gDataCollection.EventPublishConfigAll.tags[CFGJ3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ3].value := UDINT_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGJ4].name := 'X_MINUS_CORNER_SCAN_POS_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGJ4].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ4].value := LREAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGJ5].name := 'X_PLUS_CORNER_SCAN_POS_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGJ5].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ5].value := LREAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGJ6].name := 'Y_MINUS_CORNER_SCAN_POS_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGJ6].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ6].value := LREAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigAll.tags[CFGJ7].name := 'Y_PLUS_CORNER_SCAN_POS_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGJ7].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ7].value := LREAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGJ8].name := 'MEASURE_SURFACE_X_POS_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGJ8].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ8].value := LREAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigAll.tags[CFGJ9].name := 'MEASURE_SURFACE_Y_START_POS_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGJ9].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ9].value := LREAL_TO_STRING(0);						
			gDataCollection.EventPublishConfigAll.tags[CFGJ10].name := 'MEASURE_SURFACE_Y_INCREMENT_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGJ10].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ10].value := LREAL_TO_STRING(0);									
			gDataCollection.EventPublishConfigAll.tags[CFGJ11].name := 'PLATE_X_SCAN_LDS_ORIGIN';
			gDataCollection.EventPublishConfigAll.tags[CFGJ11].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ11].value := LREAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGJ12].name := 'PLATE_Y_SCAN_LDS_ORIGIN';
			gDataCollection.EventPublishConfigAll.tags[CFGJ12].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGJ12].value := LREAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGC1].name := 'OPTICS_BOX_FLOW_LOW_ALARM_GPM';
			gDataCollection.EventPublishConfigAll.tags[CFGC1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGC1].value := REAL_TO_STRING(0);		
			gDataCollection.EventPublishConfigAll.tags[CFGC2].name := 'OPTICS_BOX_FLOW_LOW_WARNING_GPM';
			gDataCollection.EventPublishConfigAll.tags[CFGC2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGC2].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGH1].name := 'CLEANING_SEQUENCE_TIMEOUT_MS';
			gDataCollection.EventPublishConfigAll.tags[CFGH1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGH1].value := UINT_TO_STRING(TIME_TO_UINT(0));
			gDataCollection.EventPublishConfigAll.tags[CFGH2].name := 'PASSIVATION_SEQUENCE_TIMEOUT_MS';
			gDataCollection.EventPublishConfigAll.tags[CFGH2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGH2].value := UINT_TO_STRING(TIME_TO_UINT(0));
			gDataCollection.EventPublishConfigAll.tags[CFGH3].name := 'CLEANING_START_TIMEOUT_MS';
			gDataCollection.EventPublishConfigAll.tags[CFGH3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGH3].value := UINT_TO_STRING(TIME_TO_UINT(0));	
			gDataCollection.EventPublishConfigAll.tags[CFGH4].name := 'PASSIVATION_START_TIMEOUT_MS';
			gDataCollection.EventPublishConfigAll.tags[CFGH4].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGH4].value := UINT_TO_STRING(TIME_TO_UINT(0));
			gDataCollection.EventPublishConfigAll.tags[CFGH5].name := 'HERDING_COMMUNICATION_TIMEOUT_MS';
			gDataCollection.EventPublishConfigAll.tags[CFGH5].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGH5].value := UINT_TO_STRING(TIME_TO_UINT(0));
			gDataCollection.EventPublishConfigAll.tags[CFGH6].name := 'GENERIC_SEQUENCE_TIMEOUT_MS';
			gDataCollection.EventPublishConfigAll.tags[CFGH6].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGH6].value := UINT_TO_STRING(TIME_TO_UINT(0));	
			gDataCollection.EventPublishConfigAll.tags[CFGH7].name := 'HERDING_BIN_ALARM_LIMIT_PCT';
			gDataCollection.EventPublishConfigAll.tags[CFGH7].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGH7].value := REAL_TO_STRING(0);		
			gDataCollection.EventPublishConfigAll.tags[CFGH8].name := 'HERDING_BIN_WARN_LIMIT_PCT';
			gDataCollection.EventPublishConfigAll.tags[CFGH8].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGH8].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGH9].name := 'HERDING_CLEANING_ELEMENTS';
			gDataCollection.EventPublishConfigAll.tags[CFGH9].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGH9].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGF1].name := 'GANTRY_CMD_SKEW_MAX_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGF1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGF1].value := LREAL_TO_STRING(0);	
			gDataCollection.EventPublishConfigAll.tags[CFGF2].name := 'RECOATER_CMD_SKEW_MAX_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGF2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGF2].value := LREAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGF3].name := 'LIFTS_CMD_SKEW_MAX_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGF3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGF3].value := LREAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGE1].name := 'GANTRY_SKEW_MAX_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGE1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGE1].value := LREAL_TO_STRING(0);		
			gDataCollection.EventPublishConfigAll.tags[CFGE2].name := 'RECOATER_SKEW_MAX_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGE2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGE2].value := LREAL_TO_STRING(0);
			gDataCollection.EventPublishConfigAll.tags[CFGE3].name := 'LIFTS_SKEW_MAX_MM';
			gDataCollection.EventPublishConfigAll.tags[CFGE3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigAll.tags[CFGE3].value := LREAL_TO_STRING(0);
			
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit, FALSE) AND NOT gMQTTApi.status.bufferIsFull THEN
				// Publish data to MQTT
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPublishConfigAll';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPublishConfigAll');
				
				// Update the buffer tail pointer
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
						
				//task.status.sequence :=  SEQUENCE_DELAY1; 
						
				// Check if the buffer is full
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE
				// Handle MQTT publish error
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventPublishConfigAll');
				//task.status.sequence :=  SEQUENCE_ERROR; 
			END_IF
			
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
			
		44: 
			// Laser Config Data Collection ==========================
			gDataCollection.EventPublishConfigLasers.lot_id							:= '';
			gDataCollection.EventPublishConfigLasers.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPublishConfigLasers.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPublishConfigLasers.timestamp);
			gDataCollection.EventPublishConfigLasers.seq							:= gDataCollection.EventPublishConfigLasers.timestamp;
			
			gDataCollection.EventPublishConfigLasers.tags[CFGT1].name := 'DISABLE_RACK_1';
			gDataCollection.EventPublishConfigLasers.tags[CFGT1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT1].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));	
			gDataCollection.EventPublishConfigLasers.tags[CFGT2].name := 'DISABLED_LASERS_RACK_1[0]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT2].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT3].name := 'DISABLED_LASERS_RACK_1[1]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT3].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT4].name := 'DISABLED_LASERS_RACK_1[2]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT4].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT4].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT5].name := 'DISABLED_LASERS_RACK_1[3]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT5].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT5].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT6].name := 'DISABLED_LASERS_RACK_1[4]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT6].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT6].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT7].name := 'DISABLED_LASERS_RACK_1[5]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT7].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT7].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT8].name := 'DISABLED_LASERS_RACK_1[6]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT8].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT8].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT9].name := 'DISABLED_LASERS_RACK_1[7]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT9].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT9].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT10].name := 'DISABLED_LASERS_RACK_1[8]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT10].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT10].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT11].name := 'DISABLED_LASERS_RACK_1[9]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT11].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT11].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT12].name := 'DISABLED_LASERS_RACK_1[10]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT12].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT12].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT13].name := 'DISABLED_LASERS_RACK_1[11]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT13].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT13].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT14].name := 'DISABLED_LASERS_RACK_1[12]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT14].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT14].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT15].name := 'DISABLED_LASERS_RACK_1[13]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT15].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT15].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT16].name := 'DISABLED_LASERS_RACK_1[14]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT16].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT16].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT17].name := 'DISABLED_LASERS_RACK_1[15]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT17].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT17].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT18].name := 'DISABLED_LASERS_RACK_1[16]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT18].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT18].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT19].name := 'DISABLED_LASERS_RACK_1[17]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT19].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT19].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT20].name := 'DISABLED_LASERS_RACK_1[18]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT20].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT20].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));	
			gDataCollection.EventPublishConfigLasers.tags[CFGT21].name := 'DISABLED_LASERS_RACK_1[19]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT21].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT21].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));		
			gDataCollection.EventPublishConfigLasers.tags[CFGT22].name := 'DISABLED_LASERS_RACK_1[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT22].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT22].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGT23].name := 'DISABLED_DC_POWER_SUPPLY_RACK_1[0]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT23].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT23].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));	
			gDataCollection.EventPublishConfigLasers.tags[CFGT24].name := 'DISABLED_DC_POWER_SUPPLY_RACK_1[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT24].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT24].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));		
			gDataCollection.EventPublishConfigLasers.tags[CFGT25].name := 'DISABLED_DC_POWER_SUPPLY_RACK_1[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGT25].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGT25].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU1].name := 'DISABLE_RACK_2';
			gDataCollection.EventPublishConfigLasers.tags[CFGU1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU1].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));			
			gDataCollection.EventPublishConfigLasers.tags[CFGU2].name := 'DISABLED_LASERS_RACK_2[0]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU2].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU3].name := 'DISABLED_LASERS_RACK_2[1]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU3].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU4].name := 'DISABLED_LASERS_RACK_2[2]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU4].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU4].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU5].name := 'DISABLED_LASERS_RACK_2[3]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU5].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU5].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU6].name := 'DISABLED_LASERS_RACK_2[4]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU6].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU6].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU7].name := 'DISABLED_LASERS_RACK_2[5]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU7].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU7].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU8].name := 'DISABLED_LASERS_RACK_2[6]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU8].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU8].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU9].name := 'DISABLED_LASERS_RACK_2[7]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU9].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU9].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU10].name := 'DISABLED_LASERS_RACK_2[8]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU10].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU10].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU11].name := 'DISABLED_LASERS_RACK_2[9]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU11].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU11].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU12].name := 'DISABLED_LASERS_RACK_2[10]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU12].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU12].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU13].name := 'DISABLED_LASERS_RACK_2[11]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU13].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU13].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU14].name := 'DISABLED_LASERS_RACK_2[12]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU14].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU14].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU15].name := 'DISABLED_LASERS_RACK_2[13]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU15].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU15].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU16].name := 'DISABLED_LASERS_RACK_2[14]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU16].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU16].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU17].name := 'DISABLED_LASERS_RACK_2[15]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU17].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU17].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU18].name := 'DISABLED_LASERS_RACK_2[16]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU18].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU18].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU19].name := 'DISABLED_LASERS_RACK_2[17]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU19].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU19].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU20].name := 'DISABLED_LASERS_RACK_2[18]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU20].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU20].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGU21].name := 'DISABLED_LASERS_RACK_2[19]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU21].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU21].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));	
			gDataCollection.EventPublishConfigLasers.tags[CFGU22].name := 'DISABLED_LASERS_RACK_2[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU22].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU22].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));	
			//power supply
			gDataCollection.EventPublishConfigLasers.tags[CFGU23].name := 'DISABLED_DC_POWER_SUPPLY_RACK_2[0]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU23].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU23].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));	
			gDataCollection.EventPublishConfigLasers.tags[CFGU24].name := 'DISABLED_DC_POWER_SUPPLY_RACK_2[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU24].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU24].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));		
			gDataCollection.EventPublishConfigLasers.tags[CFGU25].name := 'DISABLED_DC_POWER_SUPPLY_RACK_2[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGU25].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGU25].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));			
			gDataCollection.EventPublishConfigLasers.tags[CFGV1].name := 'DISABLE_RACK_3';
			gDataCollection.EventPublishConfigLasers.tags[CFGV1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV1].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));		
			gDataCollection.EventPublishConfigLasers.tags[CFGV2].name := 'DISABLED_LASERS_RACK_3[0]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV2].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV3].name := 'DISABLED_LASERS_RACK_3[1]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV3].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV4].name := 'DISABLED_LASERS_RACK_3[2]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV4].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV4].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV5].name := 'DISABLED_LASERS_RACK_3[3]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV5].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV5].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV6].name := 'DISABLED_LASERS_RACK_3[4]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV6].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV6].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV7].name := 'DISABLED_LASERS_RACK_3[5]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV7].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV7].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV8].name := 'DISABLED_LASERS_RACK_3[6]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV8].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV8].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV9].name := 'DISABLED_LASERS_RACK_3[7]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV9].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV9].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV10].name := 'DISABLED_LASERS_RACK_3[8]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV10].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV10].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV11].name := 'DISABLED_LASERS_RACK_3[9]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV11].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV11].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV12].name := 'DISABLED_LASERS_RACK_3[10]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV12].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV12].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV13].name := 'DISABLED_LASERS_RACK_3[11]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV13].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV13].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV14].name := 'DISABLED_LASERS_RACK_3[12]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV14].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV14].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV15].name := 'DISABLED_LASERS_RACK_3[13]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV15].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV15].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV16].name := 'DISABLED_LASERS_RACK_3[14]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV16].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV16].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV17].name := 'DISABLED_LASERS_RACK_3[15]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV17].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV17].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV18].name := 'DISABLED_LASERS_RACK_3[16]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV18].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV18].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV19].name := 'DISABLED_LASERS_RACK_3[17]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV19].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV19].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGV20].name := 'DISABLED_LASERS_RACK_3[18]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV20].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV20].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));		
			gDataCollection.EventPublishConfigLasers.tags[CFGV21].name := 'DISABLED_LASERS_RACK_3[19]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV21].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV21].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));			
			gDataCollection.EventPublishConfigLasers.tags[CFGV22].name := 'DISABLED_LASERS_RACK_3[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV22].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV22].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));				
			//power supply
			gDataCollection.EventPublishConfigLasers.tags[CFGV23].name := 'DISABLED_DC_POWER_SUPPLY_RACK_3[0]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV23].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV23].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));				
			gDataCollection.EventPublishConfigLasers.tags[CFGV24].name := 'DISABLED_DC_POWER_SUPPLY_RACK_3[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV24].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV24].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));		
			gDataCollection.EventPublishConfigLasers.tags[CFGV25].name := 'DISABLED_DC_POWER_SUPPLY_RACK_3[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGV25].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGV25].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW1].name := 'DISABLE_RACK_4';
			gDataCollection.EventPublishConfigLasers.tags[CFGW1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW1].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));	
			gDataCollection.EventPublishConfigLasers.tags[CFGW2].name := 'DISABLED_LASERS_RACK_4[0]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW2].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW3].name := 'DISABLED_LASERS_RACK_4[1]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW3].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW4].name := 'DISABLED_LASERS_RACK_4[2]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW4].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW4].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW5].name := 'DISABLED_LASERS_RACK_4[3]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW5].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW5].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW6].name := 'DISABLED_LASERS_RACK_4[4]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW6].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW6].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW7].name := 'DISABLED_LASERS_RACK_4[5]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW7].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW7].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW8].name := 'DISABLED_LASERS_RACK_4[6]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW8].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW8].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW9].name := 'DISABLED_LASERS_RACK_4[7]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW9].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW9].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW10].name := 'DISABLED_LASERS_RACK_4[8]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW10].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW10].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW11].name := 'DISABLED_LASERS_RACK_4[9]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW11].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW11].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW12].name := 'DISABLED_LASERS_RACK_4[10]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW12].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW12].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW13].name := 'DISABLED_LASERS_RACK_4[11]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW13].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW13].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW14].name := 'DISABLED_LASERS_RACK_4[12]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW14].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW14].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW15].name := 'DISABLED_LASERS_RACK_4[13]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW15].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW15].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW16].name := 'DISABLED_LASERS_RACK_4[14]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW16].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW16].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW17].name := 'DISABLED_LASERS_RACK_4[15]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW17].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW17].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW18].name := 'DISABLED_LASERS_RACK_4[16]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW18].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW18].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW19].name := 'DISABLED_LASERS_RACK_4[17]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW19].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW19].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
			gDataCollection.EventPublishConfigLasers.tags[CFGW20].name := 'DISABLED_LASERS_RACK_4[18]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW20].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW20].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));		
			gDataCollection.EventPublishConfigLasers.tags[CFGW21].name := 'DISABLED_LASERS_RACK_4[19]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW21].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW21].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));			
			gDataCollection.EventPublishConfigLasers.tags[CFGW22].name := 'DISABLED_LASERS_RACK_4[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW22].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW22].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));			
			//power supply
			gDataCollection.EventPublishConfigLasers.tags[CFGW23].name := 'DISABLED_DC_POWER_SUPPLY_RACK_4[0]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW23].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW23].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));			
			gDataCollection.EventPublishConfigLasers.tags[CFGW24].name := 'DISABLED_DC_POWER_SUPPLY_RACK_4[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW24].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW24].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));				
			gDataCollection.EventPublishConfigLasers.tags[CFGW25].name := 'DISABLED_DC_POWER_SUPPLY_RACK_4[20]';
			gDataCollection.EventPublishConfigLasers.tags[CFGW25].type := 'FLOAT32';
			gDataCollection.EventPublishConfigLasers.tags[CFGW25].value := UDINT_TO_STRING(BOOL_TO_UDINT(FALSE));
				
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit, FALSE) AND NOT gMQTTApi.status.bufferIsFull THEN
						
				// Publish data to MQTT
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPublishConfigLasers';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPublishConfigLasers');
				
				// Update the buffer tail pointer
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
						
				//task.status.sequence :=  SEQUENCE_DELAY2; 
						
				// Check if the buffer is full
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE
				// Handle MQTT publish error
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventPublishConfigLasers');
				//task.status.sequence :=  SEQUENCE_ERROR; 
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		45:
			// Powder Config Data Collection ==========================
			gDataCollection.EventPublishConfigPowder.lot_id							:= '';
			gDataCollection.EventPublishConfigPowder.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPublishConfigPowder.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPublishConfigPowder.timestamp);
			gDataCollection.EventPublishConfigPowder.seq							:= gDataCollection.EventPublishConfigPowder.timestamp;
			
			gDataCollection.EventPublishConfigPowder.tags[CFGL1].name := 'MH_POWDER_REFILL_TRIGGER_KG';
			gDataCollection.EventPublishConfigPowder.tags[CFGL1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL1].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGL2].name := 'MH_POWDER_REFILL_MAX_KG';
			gDataCollection.EventPublishConfigPowder.tags[CFGL2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL2].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGL3].name := 'CONTINUOUS_DISPENSE_ROTATIONS';
			gDataCollection.EventPublishConfigPowder.tags[CFGL3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL3].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGL4].name := 'BLADE_SETUP_DISPENSE_ROTATIONS';
			gDataCollection.EventPublishConfigPowder.tags[CFGL4].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL4].value :=REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGL5].name := 'INITIAL_DISPENSE_ROTATIONS';
			gDataCollection.EventPublishConfigPowder.tags[CFGL5].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL5].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGL6].name := 'FILL_PLATE_DISPENSE_ROTATIONS';
			gDataCollection.EventPublishConfigPowder.tags[CFGL6].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL6].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGL7].name := 'HOPPER_LOAD_CELL_AVG_TIME_US';
			gDataCollection.EventPublishConfigPowder.tags[CFGL7].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL7].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGL8].name := 'METERING_HOPPER_ENG_MIN';
			gDataCollection.EventPublishConfigPowder.tags[CFGL8].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL8].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGL9].name := 'METERING_HOPPER_ENG_MAX';
			gDataCollection.EventPublishConfigPowder.tags[CFGL9].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL9].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGL10].name := 'METERING_HOPPER_RAW_OFFSET';
			gDataCollection.EventPublishConfigPowder.tags[CFGL10].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL10].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGL11].name := 'ENABLE_CURRENT_MONITORING';
			gDataCollection.EventPublishConfigPowder.tags[CFGL11].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL11].value := REAL_TO_STRING(0);	
			gDataCollection.EventPublishConfigPowder.tags[CFGL12].name := 'MOTOR_CURRENT_WATCHDOG_LIMIT_A';
			gDataCollection.EventPublishConfigPowder.tags[CFGL12].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL12].value := REAL_TO_STRING(0);	
			gDataCollection.EventPublishConfigPowder.tags[CFGL13].name := 'MOTOR_CURRENT_WATCHDOG_TIME_SEC';
			gDataCollection.EventPublishConfigPowder.tags[CFGL13].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGL13].value := REAL_TO_STRING(0);	
			gDataCollection.EventPublishConfigPowder.tags[CFGN1].name := 'FLOOR_HOPPER_LOW_LIMIT';
			gDataCollection.EventPublishConfigPowder.tags[CFGN1].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN1].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN2].name := 'FLOOR_CONVEY_VALVE_OPEN_TIME_MS';
			gDataCollection.EventPublishConfigPowder.tags[CFGN2].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN2].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN3].name := 'VOLKMANN_DROP_ON_TIME_MS';
			gDataCollection.EventPublishConfigPowder.tags[CFGN3].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN3].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN4].name := 'VOLKMANN_CONVEY_POWDER_TIME_MS';
			gDataCollection.EventPublishConfigPowder.tags[CFGN4].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN4].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN5].name := 'VOLKMANN_CONVEY_CYCLES_PER_DROP';
			gDataCollection.EventPublishConfigPowder.tags[CFGN5].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN5].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN6].name := 'VOLKMANN_DROP_CYCLES_PER_REFILL';
			gDataCollection.EventPublishConfigPowder.tags[CFGN6].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN6].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN7].name := 'OVERHEAD_HOPPER_PURGE_TIMEOUT_MS';
			gDataCollection.EventPublishConfigPowder.tags[CFGN7].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN7].value := REAL_TO_STRING(0);							
			gDataCollection.EventPublishConfigPowder.tags[CFGN8].name := 'VOLKMANN_CONVEY_PREP_TIME_MS';
			gDataCollection.EventPublishConfigPowder.tags[CFGN8].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN8].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN9].name := 'GENERIC_VALVE_ACTUATION_DELAY_MS';
			gDataCollection.EventPublishConfigPowder.tags[CFGN9].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN9].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN10].name := 'DROP_TO_BUFFER_MAX_ON_TIME_MS';
			gDataCollection.EventPublishConfigPowder.tags[CFGN10].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN10].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN11].name := 'DROP_TO_RECOATER_ON_TIME_MS';
			gDataCollection.EventPublishConfigPowder.tags[CFGN11].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN11].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN12].name := 'DROP_TO_BUFFER_TARGET_WEIGHT_KG';
			gDataCollection.EventPublishConfigPowder.tags[CFGN12].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN12].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN13].name := 'OVERHEAD_HOPPER_FILL_TRIGGER_KG';
			gDataCollection.EventPublishConfigPowder.tags[CFGN13].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN13].value := REAL_TO_STRING(0);				
			gDataCollection.EventPublishConfigPowder.tags[CFGN14].name := 'OVERHEAD_HOPPER_FILL_TARGET_KG';
			gDataCollection.EventPublishConfigPowder.tags[CFGN14].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN14].value := REAL_TO_STRING(0);				
			gDataCollection.EventPublishConfigPowder.tags[CFGN15].name := 'RECLAIM_BIN_FILL_LIMIT_KG';
			gDataCollection.EventPublishConfigPowder.tags[CFGN15].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN15].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN16].name := 'OVERHEAD_HOPPER_ENG_MIN';
			gDataCollection.EventPublishConfigPowder.tags[CFGN16].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN16].value := REAL_TO_STRING(0);				
			gDataCollection.EventPublishConfigPowder.tags[CFGN17].name := 'OVERHEAD_HOPPER_ENG_MAX';
			gDataCollection.EventPublishConfigPowder.tags[CFGN17].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN17].value := REAL_TO_STRING(0);				
			gDataCollection.EventPublishConfigPowder.tags[CFGN18].name := 'OVERHEAD_HOPPER_RAW_OFFSET';
			gDataCollection.EventPublishConfigPowder.tags[CFGN18].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN18].value := REAL_TO_STRING(0);					
			gDataCollection.EventPublishConfigPowder.tags[CFGN19].name := 'FLOOR_HOPPER_ENG_MIN';
			gDataCollection.EventPublishConfigPowder.tags[CFGN19].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN19].value := REAL_TO_STRING(0);					
			gDataCollection.EventPublishConfigPowder.tags[CFGN20].name := 'FLOOR_HOPPER_ENG_MAX';
			gDataCollection.EventPublishConfigPowder.tags[CFGN20].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN20].value := REAL_TO_STRING(0);					
			gDataCollection.EventPublishConfigPowder.tags[CFGN21].name := 'FLOOR_HOPPER_RAW_OFFSET';
			gDataCollection.EventPublishConfigPowder.tags[CFGN21].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN21].value := REAL_TO_STRING(0);					
			gDataCollection.EventPublishConfigPowder.tags[CFGN22].name := 'RECLAIM_BIN_ENG_MIN';
			gDataCollection.EventPublishConfigPowder.tags[CFGN22].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN22].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN23].name := 'RECLAIM_BIN_ENG_MAX';
			gDataCollection.EventPublishConfigPowder.tags[CFGN23].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN23].value := REAL_TO_STRING(0);			
			gDataCollection.EventPublishConfigPowder.tags[CFGN24].name := 'RECLAIM_BIN_RAW_OFFSET';
			gDataCollection.EventPublishConfigPowder.tags[CFGN24].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN24].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGN25].name := 'FLOOR_HOPPER_LOW_REF';
			gDataCollection.EventPublishConfigPowder.tags[CFGN25].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN25].value := DINT_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGN26].name := 'FLOOR_HOPPER_HIGH_REF';
			gDataCollection.EventPublishConfigPowder.tags[CFGN26].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN26].value := DINT_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGN27].name := 'OVERHEAD_HOPPER_LOW_REF';
			gDataCollection.EventPublishConfigPowder.tags[CFGN27].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN27].value := DINT_TO_STRING(0);
			gDataCollection.EventPublishConfigPowder.tags[CFGN28].name := 'OVERHEAD_HOPPER_HIGH_REF';
			gDataCollection.EventPublishConfigPowder.tags[CFGN28].type := 'FLOAT32';
			gDataCollection.EventPublishConfigPowder.tags[CFGN28].value := DINT_TO_STRING(0);
					
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit, FALSE) AND NOT gMQTTApi.status.bufferIsFull THEN
						
				// Publish data to MQTT
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPublishConfigPowder';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPublishConfigPowder');
				
				// Update the buffer tail pointer
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
						
				//task.status.sequence :=  SEQUENCE_DELAY3; 
						
				// Check if the buffer is full
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE
				// Handle MQTT publish error
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventPublishConfigPowder');
				//task.status.sequence :=  SEQUENCE_ERROR; 
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		46: 
			// Gas Config Data Collection ==========================
			gDataCollection.EventPublishConfigGas.lot_id						:= '';
			gDataCollection.EventPublishConfigGas.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPublishConfigGas.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPublishConfigGas.timestamp);
			gDataCollection.EventPublishConfigGas.seq							:= gDataCollection.EventPublishConfigGas.timestamp;
			
			gDataCollection.EventPublishConfigGas.tags[CFGP1].name := 'COMMISSIONING_MODE_ENABLED';
			gDataCollection.EventPublishConfigGas.tags[CFGP1].type := 'BOOL';
			gDataCollection.EventPublishConfigGas.tags[CFGP1].value := BOOL_TO_STRING(FALSE);
			gDataCollection.EventPublishConfigGas.tags[CFGP2].name := 'HIGH_FLOW_PROP_VALVE_PCT';
			gDataCollection.EventPublishConfigGas.tags[CFGP2].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGP2].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGP3].name := 'PRINTZONE_OXYGEN_PRINT_LIMIT_PPM';
			gDataCollection.EventPublishConfigGas.tags[CFGP3].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGP3].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGP4].name := 'PRINTZONE_PRESSURE_LIMIT_INH2O';
			gDataCollection.EventPublishConfigGas.tags[CFGP4].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGP4].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGP5].name := 'EXHAUST_PRESSURE_LIMIT_INH2O';
			gDataCollection.EventPublishConfigGas.tags[CFGP5].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGP5].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD1].name := 'COMMISSIONING_ENABLED';
			gDataCollection.EventPublishConfigGas.tags[CFGD1].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD1].value := UINT_TO_STRING(0));
			gDataCollection.EventPublishConfigGas.tags[CFGD2].name := 'BLOWER_VALVE_ACTUATION_DELAY_MS';
			gDataCollection.EventPublishConfigGas.tags[CFGD2].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD2].value := UINT_TO_STRING(TIME_TO_UINT(0));
			gDataCollection.EventPublishConfigGas.tags[CFGD3].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[0]';
			gDataCollection.EventPublishConfigGas.tags[CFGD3].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD3].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD4].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[1]';
			gDataCollection.EventPublishConfigGas.tags[CFGD4].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD4].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD5].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[2]';
			gDataCollection.EventPublishConfigGas.tags[CFGD5].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD5].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD6].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[3]';
			gDataCollection.EventPublishConfigGas.tags[CFGD6].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD6].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD7].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[4]';
			gDataCollection.EventPublishConfigGas.tags[CFGD7].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD7].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD8].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[5]';
			gDataCollection.EventPublishConfigGas.tags[CFGD8].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD8].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD9].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[6]';
			gDataCollection.EventPublishConfigGas.tags[CFGD9].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD9].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD10].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[7]';
			gDataCollection.EventPublishConfigGas.tags[CFGD10].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD10].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD11].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[8]';
			gDataCollection.EventPublishConfigGas.tags[CFGD11].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD11].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD12].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[9]';
			gDataCollection.EventPublishConfigGas.tags[CFGD12].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD12].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD13].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[10]';
			gDataCollection.EventPublishConfigGas.tags[CFGD13].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD13].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD14].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[11]';
			gDataCollection.EventPublishConfigGas.tags[CFGD14].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD14].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD15].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[12]';
			gDataCollection.EventPublishConfigGas.tags[CFGD15].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD15].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD16].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[13]';
			gDataCollection.EventPublishConfigGas.tags[CFGD16].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD16].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD17].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[14]';
			gDataCollection.EventPublishConfigGas.tags[CFGD17].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD17].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD18].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[15]';
			gDataCollection.EventPublishConfigGas.tags[CFGD18].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD18].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD19].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[16]';
			gDataCollection.EventPublishConfigGas.tags[CFGD19].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD19].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD20].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[17]';
			gDataCollection.EventPublishConfigGas.tags[CFGD20].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD20].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD21].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[18]';
			gDataCollection.EventPublishConfigGas.tags[CFGD21].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD21].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD22].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[19]';
			gDataCollection.EventPublishConfigGas.tags[CFGD22].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD22].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD23].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[20]';
			gDataCollection.EventPublishConfigGas.tags[CFGD23].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD23].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD24].name := 'PUMP_FLOW_TO_FREQ_LOOKUP_HZ[21]';
			gDataCollection.EventPublishConfigGas.tags[CFGD24].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD24].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD25].name := 'TARGET_GAS_HEAD_FLOW_LPM';
			gDataCollection.EventPublishConfigGas.tags[CFGD25].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD25].value := INT_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD26].name := 'GENERIC_SEQUENCE_TIMEOUT_MS';
			gDataCollection.EventPublishConfigGas.tags[CFGD26].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD26].value := UINT_TO_STRING(TIME_TO_UINT(0));
			gDataCollection.EventPublishConfigGas.tags[CFGD27].name := 'GAS_HEAD_FLOW_AVG_TIME_US';
			gDataCollection.EventPublishConfigGas.tags[CFGD27].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD27].value := UDINT_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD28].name := 'GAS_TEMP_HIGH_WARNING_LIMIT_C';
			gDataCollection.EventPublishConfigGas.tags[CFGD28].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD28].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD29].name := 'GAS_TEMP_HIGH_ALARM_LIMIT_C';
			gDataCollection.EventPublishConfigGas.tags[CFGD29].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD29].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD30].name := 'PRE_FILTER_PRESSURE_WARNING_KPA';
			gDataCollection.EventPublishConfigGas.tags[CFGD30].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD30].value := REAL_TO_STRING(0);
			gDataCollection.EventPublishConfigGas.tags[CFGD31].name := 'PRE_FILTER_PRESSURE_ALARM_KPA';
			gDataCollection.EventPublishConfigGas.tags[CFGD31].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigGas.tags[CFGD31].value := REAL_TO_STRING(0);
					
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit, FALSE) AND NOT gMQTTApi.status.bufferIsFull THEN
						
				// Publish data to MQTT
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPublishConfigGas';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPublishConfigGas');
				
				// Update the buffer tail pointer
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
						
				//task.status.sequence :=  SEQUENCE_DONE; 
						
				// Check if the buffer is full
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE
				// Handle MQTT publish error
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventPublishConfigGas');
				//task.status.sequence :=  SEQUENCE_ERROR; 
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		47:
			// Recoater Waypoint Data Collection ==========================
			gDataCollection.EventPublishRecoaterWaypoint.lot_id						:= '';
			gDataCollection.EventPublishRecoaterWaypoint.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPublishRecoaterWaypoint.layer						:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPublishRecoaterWaypoint.timestamp);
			gDataCollection.EventPublishRecoaterWaypoint.seq						:= gDataCollection.EventPublishRecoaterWaypoint.timestamp;
			
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR1].name := 'WAYPOINT_RECOATER_X_PARK_POSITION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR1].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR1].value := LREAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PARK].Position);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR2].name := 'WAYPOINT_RECOATER_X_PARK_VELOCITY';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR2].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR2].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PARK].Velocity);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR3].name := 'WAYPOINT_RECOATER_X_PARK_ACCELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR3].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR3].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PARK].Acceleration);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR4].name := 'WAYPOINT_RECOATER_X_PARK_DECELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR4].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR4].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PARK].Deceleration);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR5].name := 'WAYPOINT_RECOATER_X_PREP_RECOAT_POSITION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR5].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR5].value := LREAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Position);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR6].name := 'WAYPOINT_RECOATER_X_PREP_RECOAT_VELOCITY';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR6].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR6].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Velocity);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR7].name := 'WAYPOINT_RECOATER_X_PREP_RECOAT_ACCELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR7].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR7].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Acceleration);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR8].name := 'WAYPOINT_RECOATER_X_PREP_RECOAT_DECELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR8].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR8].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Deceleration);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR9].name := 'WAYPOINT_RECOATER_X_END_RECOAT_POSITION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR9].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR9].value := LREAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Position);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR10].name := 'WAYPOINT_RECOATER_X_END_RECOAT_VELOCITY';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR10].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR10].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Velocity);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR11].name := 'WAYPOINT_RECOATER_X_END_RECOAT_ACCELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR11].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR11].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Acceleration);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR12].name := 'WAYPOINT_RECOATER_X_END_RECOAT_DECELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR12].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR12].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Deceleration);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR13].name := 'WAYPOINT_RECOATER_X_SETUP_RECOAT_POSITION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR13].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR13].value := LREAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_SETUP_RECOAT].Position);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR14].name := 'WAYPOINT_RECOATER_X_SETUP_RECOAT_VELOCITY';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR14].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR14].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_SETUP_RECOAT].Velocity);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR15].name := 'WAYPOINT_RECOATER_X_SETUP_RECOAT_ACCELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR15].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR15].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_SETUP_RECOAT].Acceleration);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR16].name := 'WAYPOINT_RECOATER_X_SETUP_RECOAT_DECELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR16].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR16].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_SETUP_RECOAT].Deceleration);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR17].name := 'WAYPOINT_RECOATER_X_PREP_ALIGN_POSITION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR17].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR17].value := LREAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_ALIGN].Position);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR18].name := 'WAYPOINT_RECOATER_X_PREP_ALIGN_VELOCITY';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR18].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR18].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_ALIGN].Velocity);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR19].name := 'WAYPOINT_RECOATER_X_PREP_ALIGN_ACCELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR19].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR19].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_ALIGN].Acceleration);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR20].name := 'WAYPOINT_RECOATER_X_PREP_ALIGN_DECELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR20].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR20].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_ALIGN].Deceleration);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR21].name := 'WAYPOINT_RECOATER_X_END_ALIGN_POSITION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR21].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR21].value := LREAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_ALIGN].Position);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR22].name := 'WAYPOINT_RECOATER_X_END_ALIGN_VELOCITY';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR22].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR22].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_ALIGN].Velocity);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR23].name := 'WAYPOINT_RECOATER_X_END_ALIGN_ACCELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR23].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR23].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_ALIGN].Acceleration);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR24].name := 'WAYPOINT_RECOATER_X_END_ALIGN_DECELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR24].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR24].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_ALIGN].Deceleration);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR25].name := 'WAYPOINT_RECOATER_X_END_FLUSH_POSITION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR25].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR25].value := LREAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_FLUSH].Position);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR26].name := 'WAYPOINT_RECOATER_X_END_FLUSH_VELOCITY';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR26].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR26].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_FLUSH].Velocity);
	
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR27].name := 'WAYPOINT_RECOATER_X_END_FLUSH_ACCELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR27].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR27].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_FLUSH].Acceleration);

			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR28].name := 'WAYPOINT_RECOATER_X_END_FLUSH_DECELERATION';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR28].type := 'FLOAT32';
			gDataCollection.EventPublishRecoaterWaypoint.tags[CFGAXR28].value := REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_FLUSH].Deceleration);
	
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit, FALSE) AND NOT gMQTTApi.status.bufferIsFull THEN
						
				// Publish data to MQTT
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPublishRecoaterWaypoint';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPublishRecoaterWaypoint');
				// Check if the buffer is full
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE
				// Handle MQTT publish error
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventPublishRecoaterWaypoint');
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		48:	
			// Gantry Waypoint Data Collection ==========================
			gDataCollection.EventPublishGantryWaypoint.lot_id						:= '';
			gDataCollection.EventPublishGantryWaypoint.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPublishGantryWaypoint.layer						:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPublishGantryWaypoint.timestamp);
			gDataCollection.EventPublishGantryWaypoint.seq							:= gDataCollection.EventPublishGantryWaypoint.timestamp;
			
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG1].name := 'WAYPOINT_GANTRY_X_PARK_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG1].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG1].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_PARK].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG2].name := 'WAYPOINT_GANTRY_X_PARK_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG2].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG2].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_PARK].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG3].name := 'WAYPOINT_GANTRY_X_PARK_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG3].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG3].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_PARK].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG4].name := 'WAYPOINT_GANTRY_X_PARK_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG4].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG4].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_PARK].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG5].name := 'WAYPOINT_GANTRY_X_BEAM_CAL_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG5].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG5].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_BEAM_CAL].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG6].name := 'WAYPOINT_GANTRY_X_BEAM_CAL_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG6].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG6].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_BEAM_CAL].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG7].name := 'WAYPOINT_GANTRY_X_BEAM_CAL_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG7].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG7].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_BEAM_CAL].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG8].name := 'WAYPOINT_GANTRY_X_BEAM_CAL_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG8].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG8].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_BEAM_CAL].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG9].name := 'WAYPOINT_GANTRY_X_LOWER_LIMIT_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG9].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG9].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_LOWER_LIMIT].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG10].name := 'WAYPOINT_GANTRY_X_LOWER_LIMIT_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG10].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG10].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_LOWER_LIMIT].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG11].name := 'WAYPOINT_GANTRY_X_LOWER_LIMIT_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG11].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG11].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_LOWER_LIMIT].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG12].name := 'WAYPOINT_GANTRY_X_LOWER_LIMIT_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG12].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG12].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_LOWER_LIMIT].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG13].name := 'WAYPOINT_GANTRY_X_PRINT_EXTENT_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG13].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG13].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_PRINT_EXTENT].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG14].name := 'WAYPOINT_GANTRY_X_PRINT_EXTENT_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG14].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG14].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_PRINT_EXTENT].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG15].name := 'WAYPOINT_GANTRY_X_PRINT_EXTENT_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG15].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG15].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_PRINT_EXTENT].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG16].name := 'WAYPOINT_GANTRY_X_PRINT_EXTENT_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG16].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG16].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_PRINT_EXTENT].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG17].name := 'WAYPOINT_GANTRY_X_LASER_CAL_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG17].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG17].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_LASER_CAL].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG18].name := 'WAYPOINT_GANTRY_X_LASER_CAL_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG18].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG18].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_LASER_CAL].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG19].name := 'WAYPOINT_GANTRY_X_LASER_CAL_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG19].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG19].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_LASER_CAL].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG20].name := 'WAYPOINT_GANTRY_X_LASER_CAL_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG20].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG20].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_LASER_CAL].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG21].name := 'WAYPOINT_GANTRY_X_START_CLEAN_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG21].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG21].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_START_CLEAN].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG22].name := 'WAYPOINT_GANTRY_X_START_CLEAN_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG22].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG22].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_START_CLEAN].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG23].name := 'WAYPOINT_GANTRY_X_START_CLEAN_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG23].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG23].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_START_CLEAN].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG24].name := 'WAYPOINT_GANTRY_X_START_CLEAN_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG24].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG24].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_START_CLEAN].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG25].name := 'WAYPOINT_GANTRY_X_CLEAN_1_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG25].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG25].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_CLEAN_1].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG26].name := 'WAYPOINT_GANTRY_X_CLEAN_1_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG26].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG26].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_CLEAN_1].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG27].name := 'WAYPOINT_GANTRY_X_CLEAN_1_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG27].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG27].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_CLEAN_1].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG28].name := 'WAYPOINT_GANTRY_X_CLEAN_1_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG28].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG28].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_CLEAN_1].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG29].name := 'WAYPOINT_GANTRY_X_CLEAN_2_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG29].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG29].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_CLEAN_2].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG30].name := 'WAYPOINT_GANTRY_X_CLEAN_2_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG30].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG30].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_CLEAN_2].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG31].name := 'WAYPOINT_GANTRY_X_CLEAN_2_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG31].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG31].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_CLEAN_2].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG32].name := 'WAYPOINT_GANTRY_X_CLEAN_2_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG32].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG32].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_CLEAN_2].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG33].name := 'WAYPOINT_GANTRY_X_RECOATER_SETUP_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG33].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG33].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_RECOATER_SETUP].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG34].name := 'WAYPOINT_GANTRY_X_RECOATER_SETUP_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG34].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG34].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_RECOATER_SETUP].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG35].name := 'WAYPOINT_GANTRY_X_RECOATER_SETUP_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG35].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG35].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_RECOATER_SETUP].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG36].name := 'WAYPOINT_GANTRY_X_RECOATER_SETUP_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG36].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG36].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_RECOATER_SETUP].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG37].name := 'WAYPOINT_GANTRY_X_BLOWOFF_START_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG37].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG37].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_BLOWOFF_START].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG38].name := 'WAYPOINT_GANTRY_X_BLOWOFF_START_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG38].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG38].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_BLOWOFF_START].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG39].name := 'WAYPOINT_GANTRY_X_BLOWOFF_START_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG39].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG39].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_BLOWOFF_START].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG40].name := 'WAYPOINT_GANTRY_X_BLOWOFF_START_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG40].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG40].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_BLOWOFF_START].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG41].name := 'WAYPOINT_GANTRY_Y_MIDDLE_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG41].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG41].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_MIDDLE].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG42].name := 'WAYPOINT_GANTRY_Y_MIDDLE_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG42].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG42].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_MIDDLE].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG43].name := 'WAYPOINT_GANTRY_Y_MIDDLE_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG43].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG43].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_MIDDLE].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG44].name := 'WAYPOINT_GANTRY_Y_MIDDLE_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG44].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG44].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_MIDDLE].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG45].name := 'WAYPOINT_GANTRY_Y_PARK_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG45].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG45].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_PARK].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG46].name := 'WAYPOINT_GANTRY_Y_PARK_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG46].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG46].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_PARK].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG47].name := 'WAYPOINT_GANTRY_Y_PARK_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG47].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG47].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_PARK].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG48].name := 'WAYPOINT_GANTRY_Y_PARK_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG48].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG48].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_PARK].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG49].name := 'WAYPOINT_GANTRY_Y_LASER_CAL_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG49].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG49].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_LASER_CAL].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG50].name := 'WAYPOINT_GANTRY_Y_LASER_CAL_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG50].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG50].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_LASER_CAL].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG51].name := 'WAYPOINT_GANTRY_Y_LASER_CAL_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG51].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG51].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_LASER_CAL].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG52].name := 'WAYPOINT_GANTRY_Y_LASER_CAL_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG52].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG52].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_LASER_CAL].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG53].name := 'WAYPOINT_GANTRY_Y_BEAM_CAL_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG53].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG53].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BEAM_CAL].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG54].name := 'WAYPOINT_GANTRY_Y_BEAM_CAL_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG54].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG54].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BEAM_CAL].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG55].name := 'WAYPOINT_GANTRY_Y_BEAM_CAL_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG55].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG55].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BEAM_CAL].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG56].name := 'WAYPOINT_GANTRY_Y_BEAM_CAL_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG56].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG56].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BEAM_CAL].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG57].name := 'WAYPOINT_GANTRY_Y_START_CLEAN_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG57].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG57].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_START_CLEAN].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG58].name := 'WAYPOINT_GANTRY_Y_START_CLEAN_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG58].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG58].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_START_CLEAN].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG59].name := 'WAYPOINT_GANTRY_Y_START_CLEAN_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG59].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG59].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_START_CLEAN].Acceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG60].name := 'WAYPOINT_GANTRY_Y_START_CLEAN_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG60].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG60].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_START_CLEAN].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG61].name := 'WAYPOINT_GANTRY_Y_CLEAN_1_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG61].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG61].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_CLEAN_1].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG62].name := 'WAYPOINT_GANTRY_Y_CLEAN_1_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG62].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG62].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_CLEAN_1].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG63].name := 'WAYPOINT_GANTRY_Y_CLEAN_1_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG63].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG63].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_CLEAN_1].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG64].name := 'WAYPOINT_GANTRY_Y_CLEAN_1_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG64].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG64].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_CLEAN_1].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG65].name := 'WAYPOINT_GANTRY_Y_CLEAN_2_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG65].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG65].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_CLEAN_2].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG66].name := 'WAYPOINT_GANTRY_Y_CLEAN_2_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG66].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG66].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_CLEAN_2].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG67].name := 'WAYPOINT_GANTRY_Y_CLEAN_2_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG67].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG67].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_CLEAN_2].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG68].name := 'WAYPOINT_GANTRY_Y_CLEAN_2_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG68].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG68].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_CLEAN_2].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG69].name := 'WAYPOINT_GANTRY_Y_BLOWOFF_START_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG69].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG69].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BLOWOFF_START].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG70].name := 'WAYPOINT_GANTRY_Y_BLOWOFF_START_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG70].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG70].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BLOWOFF_START].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG71].name := 'WAYPOINT_GANTRY_Y_BLOWOFF_START_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG71].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG71].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BLOWOFF_START].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG72].name := 'WAYPOINT_GANTRY_Y_BLOWOFF_START_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG72].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG72].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BLOWOFF_START].Deceleration);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG73].name := 'WAYPOINT_GANTRY_Y_BLOWOFF_STOP_POSITION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG73].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG73].value := LREAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BLOWOFF_STOP].Position);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG74].name := 'WAYPOINT_GANTRY_Y_BLOWOFF_STOP_VELOCITY';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG74].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG74].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BLOWOFF_STOP].Velocity);
	
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG75].name := 'WAYPOINT_GANTRY_Y_BLOWOFF_STOP_ACCELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG75].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG75].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BLOWOFF_STOP].Acceleration);

			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG76].name := 'WAYPOINT_GANTRY_Y_BLOWOFF_STOP_DECELERATION';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG76].type := 'FLOAT32';
			gDataCollection.EventPublishGantryWaypoint.tags[CFGAXG76].value := REAL_TO_STRING(gMotorBasic[AXIS_GANTRY_Y].IN.Waypoint[WAYPOINT_GANTRY_Y_BLOWOFF_STOP].Deceleration);
			
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit, FALSE) AND NOT gMQTTApi.status.bufferIsFull THEN
						
				// Publish data to MQTT
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPublishGantryWaypoint';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPublishGantryWaypoint');
						
				// Check if the buffer is full
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE
				// Handle MQTT publish error
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventPublishGantryWaypoint');
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
			
		49:	
			// Lift Waypoint Data Collection ==========================
			gDataCollection.EventPublishLiftWaypoint.lot_id						:= '';
			gDataCollection.EventPublishLiftWaypoint.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPublishLiftWaypoint.layer						:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPublishLiftWaypoint.timestamp);
			gDataCollection.EventPublishLiftWaypoint.seq						:= gDataCollection.EventPublishLiftWaypoint.timestamp;
			
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL1].name := 'WAYPOINT_LIFT_Z_CURRENT_LAYER_POSITION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL1].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL1].value := LREAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_CURRENT_LAYER].Position);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL2].name := 'WAYPOINT_LIFT_Z_CURRENT_LAYER_VELOCITY';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL2].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL2].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_CURRENT_LAYER].Velocity);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL3].name := 'WAYPOINT_LIFT_Z_CURRENT_LAYER_ACCELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL3].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL3].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_CURRENT_LAYER].Acceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL4].name := 'WAYPOINT_LIFT_Z_CURRENT_LAYER_DECELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL4].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL4].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_CURRENT_LAYER].Deceleration);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL5].name := 'WAYPOINT_LIFT_Z_ZERO_POSITION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL5].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL5].value := LREAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_ZERO].Position);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL6].name := 'WAYPOINT_LIFT_Z_ZERO_VELOCITY';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL6].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL6].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_ZERO].Velocity);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL7].name := 'WAYPOINT_LIFT_Z_ZERO_ACCELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL7].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL7].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_ZERO].Acceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL8].name := 'WAYPOINT_LIFT_Z_ZERO_DECELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL8].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL8].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_ZERO].Deceleration);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL9].name := 'WAYPOINT_LIFT_Z_TRANSFER_POSITION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL9].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL9].value := LREAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_TRANSFER].Position);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL10].name := 'WAYPOINT_LIFT_Z_TRANSFER_VELOCITY';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL10].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL10].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_TRANSFER].Velocity);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL11].name := 'WAYPOINT_LIFT_Z_TRANSFER_ACCELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL11].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL11].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_TRANSFER].Acceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL12].name := 'WAYPOINT_LIFT_Z_TRANSFER_DECELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL12].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL12].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_TRANSFER].Deceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL13].name := 'WAYPOINT_LIFT_Z_ENGAGE_PLATE_POSITION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL13].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL13].value := LREAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_ENGAGE_PLATE].Position);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL14].name := 'WAYPOINT_LIFT_Z_ENGAGE_PLATE_VELOCITY';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL14].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL14].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_ENGAGE_PLATE].Velocity);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL15].name := 'WAYPOINT_LIFT_Z_ENGAGE_PLATE_ACCELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL15].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL15].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_ENGAGE_PLATE].Acceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL16].name := 'WAYPOINT_LIFT_Z_ENGAGE_PLATE_DECELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL16].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL16].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_ENGAGE_PLATE].Deceleration);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL17].name := 'WAYPOINT_LIFT_Z_MAX_PART_HEIGHT_POSITION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL17].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL17].value := LREAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_MAX_PART_HEIGHT].Position);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL18].name := 'WAYPOINT_LIFT_Z_MAX_PART_HEIGHT_VELOCITY';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL18].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL18].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_MAX_PART_HEIGHT].Velocity);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL19].name := 'WAYPOINT_LIFT_Z_MAX_PART_HEIGHT_ACCELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL19].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL19].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_MAX_PART_HEIGHT].Acceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL20].name := 'WAYPOINT_LIFT_Z_MAX_PART_HEIGHT_DECELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL20].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL20].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_MAX_PART_HEIGHT].Deceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL21].name := 'WAYPOINT_LIFT_DOMS_LOAD_POSITION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL21].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL21].value := LREAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_DOMS_LOAD].Position);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL22].name := 'WAYPOINT_LIFT_DOMS_LOAD_VELOCITY';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL22].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL22].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_DOMS_LOAD].Velocity);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL23].name := 'WAYPOINT_LIFT_DOMS_LOAD_ACCELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL23].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL23].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_DOMS_LOAD].Acceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL24].name := 'WAYPOINT_LIFT_DOMS_LOAD_DECELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL24].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL24].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_DOMS_LOAD].Deceleration);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL25].name := 'WAYPOINT_LIFT_Z_EN_SHROUD_BOTTOM_POSITION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL25].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL25].value := LREAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_EN_SHROUD_BOTTOM].Position);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL26].name := 'WAYPOINT_LIFT_Z_EN_SHROUD_BOTTOM_VELOCITY';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL26].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL26].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_EN_SHROUD_BOTTOM].Velocity);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL27].name := 'WAYPOINT_LIFT_Z_EN_SHROUD_BOTTOM_ACCELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL27].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL27].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_EN_SHROUD_BOTTOM].Acceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL28].name := 'WAYPOINT_LIFT_Z_EN_SHROUD_BOTTOM_DECELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL28].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL28].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_EN_SHROUD_BOTTOM].Deceleration);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL29].name := 'WAYPOINT_LIFT_Z_PINS_ONLY_POSITION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL29].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL29].value := LREAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_PINS_ONLY].Position);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL30].name := 'WAYPOINT_LIFT_Z_PINS_ONLY_VELOCITY';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL30].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL30].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_PINS_ONLY].Velocity);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL31].name := 'WAYPOINT_LIFT_Z_PINS_ONLY_ACCELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL31].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL31].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_PINS_ONLY].Acceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL32].name := 'WAYPOINT_LIFT_Z_PINS_ONLY_DECELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL32].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL32].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_Z_PINS_ONLY].Deceleration);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL33].name := 'WAYPOINT_LIFT_CURRENT_LAYER_RECOAT_POSITION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL33].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL33].value := LREAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_CURRENT_LAYER_RECOAT].Position);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL34].name := 'WAYPOINT_LIFT_CURRENT_LAYER_RECOAT_VELOCITY';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL34].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL34].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_CURRENT_LAYER_RECOAT].Velocity);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL35].name := 'WAYPOINT_LIFT_CURRENT_LAYER_RECOAT_ACCELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL35].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL35].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_CURRENT_LAYER_RECOAT].Acceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL36].name := 'WAYPOINT_LIFT_CURRENT_LAYER_RECOAT_DECELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL36].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL36].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_CURRENT_LAYER_RECOAT].Deceleration);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL37].name := 'WAYPOINT_LIFT_DOMS_LEVELED_POSITION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL37].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL37].value := LREAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_DOMS_LEVELED].Position);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL38].name := 'WAYPOINT_LIFT_DOMS_LEVELED_VELOCITY';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL38].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL38].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_DOMS_LEVELED].Velocity);
	
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL39].name := 'WAYPOINT_LIFT_DOMS_LEVELED_ACCELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL39].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL39].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_DOMS_LEVELED].Acceleration);

			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL40].name := 'WAYPOINT_LIFT_DOMS_LEVELED_DECELERATION';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL40].type := 'FLOAT32';
			gDataCollection.EventPublishLiftWaypoint.tags[CFGAXL40].value := REAL_TO_STRING(gMotorBasic[AXIS_LIFT_Z].IN.Waypoint[WAYPOINT_LIFT_DOMS_LEVELED].Deceleration);
			
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit, FALSE) AND NOT gMQTTApi.status.bufferIsFull THEN
						
				// Publish data to MQTT
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPublishLiftWaypoint';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPublishLiftWaypoint');
						
				// Check if the buffer is full
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE
				// Handle MQTT publish error
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventPublishLiftWaypoint');
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		50:	
			// Other Waypoint Data Collection ==========================
			gDataCollection.EventPublishOtherWaypoint.lot_id						:= '';
			gDataCollection.EventPublishOtherWaypoint.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPublishOtherWaypoint.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPublishOtherWaypoint.timestamp);
			gDataCollection.EventPublishOtherWaypoint.seq							:= gDataCollection.EventPublishOtherWaypoint.timestamp;
			
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO1].name := 'WAYPOINT_SHUTTLE_PARK_POSITION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO1].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO1].value := LREAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_PARK].Position);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO2].name := 'WAYPOINT_SHUTTLE_PARK_VELOCITY';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO2].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO2].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_PARK].Velocity);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO3].name := 'WAYPOINT_SHUTTLE_PARK_ACCELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO3].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO3].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_PARK].Acceleration);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO4].name := 'WAYPOINT_SHUTTLE_PARK_DECELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO4].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO4].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_PARK].Deceleration);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO5].name := 'WAYPOINT_SHUTTLE_APPROACH_POD_POSITION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO5].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO5].value := LREAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_APPROACH_POD].Position);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO6].name := 'WAYPOINT_SHUTTLE_APPROACH_POD_VELOCITY';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO6].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO6].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_APPROACH_POD].Velocity);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO7].name := 'WAYPOINT_SHUTTLE_APPROACH_POD_ACCELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO7].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO7].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_APPROACH_POD].Acceleration);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO8].name := 'WAYPOINT_SHUTTLE_APPROACH_POD_DECELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO8].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO8].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_APPROACH_POD].Deceleration);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO9].name := 'WAYPOINT_SHUTTLE_POD_POSITION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO9].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO9].value := LREAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_POD].Position);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO10].name := 'WAYPOINT_SHUTTLE_POD_VELOCITY';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO10].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO10].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_POD].Velocity);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO11].name := 'WAYPOINT_SHUTTLE_POD_ACCELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO11].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO11].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_POD].Acceleration);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO12].name := 'WAYPOINT_SHUTTLE_POD_DECELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO12].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO12].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_POD].Deceleration);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO13].name := 'WAYPOINT_SHUTTLE_APPROACH_LIFT_POSITION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO13].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO13].value := LREAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_APPROACH_LIFT].Position);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO14].name := 'WAYPOINT_SHUTTLE_APPROACH_LIFT_VELOCITY';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO14].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO14].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_APPROACH_LIFT].Velocity);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO15].name := 'WAYPOINT_SHUTTLE_APPROACH_LIFT_ACCELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO15].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO15].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_APPROACH_LIFT].Acceleration);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO16].name := 'WAYPOINT_SHUTTLE_APPROACH_LIFT_DECELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO16].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO16].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_APPROACH_LIFT].Deceleration);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO17].name := 'WAYPOINT_SHUTTLE_LIFT_POSITION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO17].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO17].value := LREAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_LIFT].Position);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO18].name := 'WAYPOINT_SHUTTLE_LIFT_VELOCITY';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO18].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO18].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_LIFT].Velocity);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO19].name := 'WAYPOINT_SHUTTLE_LIFT_ACCELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO19].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO19].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_LIFT].Acceleration);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO20].name := 'WAYPOINT_SHUTTLE_LIFT_DECELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO20].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO20].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_LIFT].Deceleration);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO21].name := 'WAYPOINT_SHUTTLE_LIFT_DECELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO21].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO21].value := REAL_TO_STRING(gMotorBasic[AXIS_SHUTTLE].IN.Waypoint[WAYPOINT_SHUTTLE_LIFT].Deceleration);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO22].name := 'WAYPOINT_HOPPER_FILL_POSITION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO22].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO22].value := LREAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_FILL].Position);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO23].name := 'WAYPOINT_HOPPER_FILL_VELOCITY';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO23].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO23].value := REAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_FILL].Velocity);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO24].name := 'WAYPOINT_HOPPER_FILL_ACCELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO24].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO24].value := REAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_FILL].Acceleration);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO25].name := 'WAYPOINT_HOPPER_FILL_DECELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO25].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO25].value := REAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_FILL].Deceleration);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO26].name := 'WAYPOINT_HOPPER_CONT_DISPENSE_POSITION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO26].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO26].value := LREAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_CONT_DISPENSE].Position);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO27].name := 'WAYPOINT_HOPPER_CONT_DISPENSE_VELOCITY';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO27].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO27].value := REAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_CONT_DISPENSE].Velocity);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO28].name := 'WAYPOINT_HOPPER_CONT_DISPENSE_ACCELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO28].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO28].value := REAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_CONT_DISPENSE].Acceleration);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO29].name := 'WAYPOINT_HOPPER_CONT_DISPENSE_DECELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO29].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO29].value := REAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_CONT_DISPENSE].Deceleration);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO30].name := 'WAYPOINT_HOPPER_INITIAL_DISPENSE_POSITION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO30].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO30].value := LREAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_INITIAL_DISPENSE].Position);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO31].name := 'WAYPOINT_HOPPER_INITIAL_DISPENSE_VELOCITY';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO31].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO31].value := REAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_INITIAL_DISPENSE].Velocity);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO32].name := 'WAYPOINT_HOPPER_INITIAL_DISPENSE_ACCELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO32].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO32].value := REAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_INITIAL_DISPENSE].Acceleration);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO33].name := 'WAYPOINT_HOPPER_INITIAL_DISPENSE_DECELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO33].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO33].value := REAL_TO_STRING(gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_INITIAL_DISPENSE].Deceleration);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO34].name := 'WAYPOINT_DOOR_UP_POSITION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO34].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO34].value := LREAL_TO_STRING(gMotorBasic[AXIS_DOOR_LIFT].IN.Waypoint[WAYPOINT_DOOR_UP].Position);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO35].name := 'WAYPOINT_DOOR_UP_VELOCITY';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO35].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO35].value := REAL_TO_STRING(gMotorBasic[AXIS_DOOR_LIFT].IN.Waypoint[WAYPOINT_DOOR_UP].Velocity);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO36].name := 'WAYPOINT_DOOR_UP_ACCELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO36].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO36].value := REAL_TO_STRING(gMotorBasic[AXIS_DOOR_LIFT].IN.Waypoint[WAYPOINT_DOOR_UP].Acceleration);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO37].name := 'WAYPOINT_DOOR_UP_DECELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO37].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO37].value := REAL_TO_STRING(gMotorBasic[AXIS_DOOR_LIFT].IN.Waypoint[WAYPOINT_DOOR_UP].Deceleration);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO38].name := 'WAYPOINT_DOOR_DOWN_POSITION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO38].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO38].value := LREAL_TO_STRING(gMotorBasic[AXIS_DOOR_LIFT].IN.Waypoint[WAYPOINT_DOOR_DOWN].Position);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO39].name := 'WAYPOINT_DOOR_DOWN_VELOCITY';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO39].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO39].value := REAL_TO_STRING(gMotorBasic[AXIS_DOOR_LIFT].IN.Waypoint[WAYPOINT_DOOR_DOWN].Velocity);
	
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO40].name := 'WAYPOINT_DOOR_DOWN_ACCELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO40].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO40].value := REAL_TO_STRING(gMotorBasic[AXIS_DOOR_LIFT].IN.Waypoint[WAYPOINT_DOOR_DOWN].Acceleration);

			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO41].name := 'WAYPOINT_DOOR_DOWN_DECELERATION';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO41].type := 'FLOAT32';
			gDataCollection.EventPublishOtherWaypoint.tags[CFGAXO41].value := REAL_TO_STRING(gMotorBasic[AXIS_DOOR_LIFT].IN.Waypoint[WAYPOINT_DOOR_DOWN].Deceleration);
			
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit, FALSE) AND NOT gMQTTApi.status.bufferIsFull THEN
						
				// Publish data to MQTT
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPublishOtherWaypoint';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPublishOtherWaypoint');
						
				// Check if the buffer is full
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE
				// Handle MQTT publish error
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventPublishOtherWaypoint');
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		51: 
			// Axis Config Data Collection ==========================
			gDataCollection.EventPublishConfigAxis.lot_id						:= '';
			gDataCollection.EventPublishConfigAxis.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPublishConfigAxis.layer						:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPublishConfigAxis.timestamp);
			gDataCollection.EventPublishConfigAxis.seq							:= gDataCollection.EventPublishConfigAxis.timestamp;
			
			gDataCollection.EventPublishConfigAxis.tags[CFGAX1].name := 'RECOATER_X_POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX1].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX1].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X].tuning.positionLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX2].name := 'RECOATER_X_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX2].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX2].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX3].name := 'RECOATER_X_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX3].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX3].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX4].name := 'RECOATER_X_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX4].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX4].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X].tuning.enableConfigBasedTuning);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX5].name := 'RECOATER_X1_POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX5].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX5].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X1].tuning.positionLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX6].name := 'RECOATER_X1_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX6].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX6].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X1].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX7].name := 'RECOATER_X1_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX7].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX7].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X1].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX8].name := 'RECOATER_X1_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX8].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX8].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X1].tuning.enableConfigBasedTuning);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX9].name := 'RECOATER_X2_POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX9].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX9].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X2].tuning.positionLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX10].name := 'RECOATER_X2_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX10].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX10].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X2].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX11].name := 'RECOATER_X2_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX11].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX11].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X2].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX12].name := 'RECOATER_X2_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX12].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX12].value := REAL_TO_STRING(Configuration.Axis[AXIS_RECOATER_X2].tuning.enableConfigBasedTuning);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX13].name := 'GANTRY_X__POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX13].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX13].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.positionLoopGainKv);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX14].name := 'GANTRY_X_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX14].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX14].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX15].name := 'GANTRY_X_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX15].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX15].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX16].name := 'GANTRY_X_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX16].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX16].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.enableConfigBasedTuning);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX17].name := 'GANTRY_X1__POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX17].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX17].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.positionLoopGainKv);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX18].name := 'GANTRY_X1_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX18].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX18].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX19].name := 'GANTRY_X1_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX19].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX19].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX20].name := 'GANTRY_X1_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX20].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX20].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.enableConfigBasedTuning);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX21].name := 'GANTRY_X2__POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX21].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX21].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.positionLoopGainKv);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX22].name := 'GANTRY_X2_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX22].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX22].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX23].name := 'GANTRY_X2_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX23].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX23].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX24].name := 'GANTRY_X2_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX24].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX24].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.enableConfigBasedTuning);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX25].name := 'GANTRY_X2__POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX25].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX25].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.positionLoopGainKv);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX26].name := 'GANTRY_X2_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX26].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX26].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX27].name := 'GANTRY_X2_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX27].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX27].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX28].name := 'GANTRY_X2_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX28].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX28].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.enableConfigBasedTuning);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX29].name := 'GANTRY_Y__POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX29].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX29].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.positionLoopGainKv);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX30].name := 'GANTRY_Y_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX30].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX30].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX31].name := 'GANTRY_Y_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX31].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX31].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX32].name := 'GANTRY_Y_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX32].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX32].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.enableConfigBasedTuning);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX33].name := 'LIFT_Z__POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX33].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX33].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z].tuning.positionLoopGainKv);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX34].name := 'LIFT_Z_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX34].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX34].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX35].name := 'LIFT_Z_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX35].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX35].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX36].name := 'LIFT_Z_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX36].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX36].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z].tuning.enableConfigBasedTuning);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX37].name := 'LIFT_Z1__POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX37].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX37].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z1].tuning.positionLoopGainKv);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX38].name := 'LIFT_Z1_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX38].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX38].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z1].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX39].name := 'LIFT_Z1_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX39].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX39].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z1].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX40].name := 'LIFT_Z1_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX40].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX40].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z1].tuning.enableConfigBasedTuning);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX41].name := 'LIFT_Z2__POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX41].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX41].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z2].tuning.positionLoopGainKv);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX42].name := 'LIFT_Z2_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX42].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX42].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z2].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX43].name := 'LIFT_Z2_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX43].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX43].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z2].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX44].name := 'LIFT_Z2_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX44].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX44].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z2].tuning.enableConfigBasedTuning);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX45].name := 'LIFT_Z3__POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX45].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX45].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z3].tuning.positionLoopGainKv);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX46].name := 'LIFT_Z3_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX46].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX46].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z3].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX47].name := 'LIFT_Z3_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX47].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX47].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z3].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX48].name := 'LIFT_Z3_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX48].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX48].value := REAL_TO_STRING(Configuration.Axis[AXIS_LIFT_Z3].tuning.enableConfigBasedTuning);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX49].name := 'SHUTTLE__POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX49].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX49].value := REAL_TO_STRING(Configuration.Axis[AXIS_SHUTTLE].tuning.positionLoopGainKv);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX50].name := 'SHUTTLE_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX50].type := 'FLOAT32';
		//	gDataCollection.EventPublishConfigAxis.tags[CFGAX50].value := REAL_TO_STRING(Configuration.Axis[AXIS_SHUTTLE].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX51].name := 'SHUTTLE_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX51].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX51].value := REAL_TO_STRING(Configuration.Axis[AXIS_SHUTTLE].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX52].name := 'SHUTTLE_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX52].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX52].value := REAL_TO_STRING(Configuration.Axis[AXIS_SHUTTLE].tuning.enableConfigBasedTuning);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX53].name := 'HOPPER__POSITION_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX53].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX53].value := REAL_TO_STRING(Configuration.Axis[AXIS_HOPPER].tuning.positionLoopGainKv);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX54].name := 'HOPPER_SPEED_LOOP_GAIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX54].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX54].value := REAL_TO_STRING(Configuration.Axis[AXIS_HOPPER].tuning.speedLoopGainKv);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX55].name := 'HOPPER_SPEED_LOOP_INTEGRAL';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX55].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX55].value := REAL_TO_STRING(Configuration.Axis[AXIS_HOPPER].tuning.speedLoopIntegralTn);

			gDataCollection.EventPublishConfigAxis.tags[CFGAX56].name := 'HOPPER_CONFIG_TUNING_ENABLE';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX56].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX56].value := REAL_TO_STRING(Configuration.Axis[AXIS_HOPPER].tuning.enableConfigBasedTuning);
			
			gDataCollection.EventPublishConfigAxis.tags[CFGAX57].name := 'SOFT_LIMIT_GANTRY_X_ENCODER_MAX';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX57].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX57].value := DINT_TO_STRING(Configuration.SOFT_LIMIT_GANTRY_X_ENCODER_MAX);
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX58].name := 'SOFT_LIMIT_GANTRY_X_ENCODER_MIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX58].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX58].value := DINT_TO_STRING(Configuration.SOFT_LIMIT_GANTRY_X_ENCODER_MIN);
	
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX59].name := 'SOFT_LIMIT_GANTRY_Y_ENCODER_MAX';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX59].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX59].value := DINT_TO_STRING(Configuration.SOFT_LIMIT_GANTRY_Y_ENCODER_MAX);
	
	
			gDataCollection.EventPublishConfigAxis.tags[CFGAX60].name := 'SOFT_LIMIT_GANTRY_Y_ENCODER_MIN';
			gDataCollection.EventPublishConfigAxis.tags[CFGAX60].type := 'FLOAT32';
			//gDataCollection.EventPublishConfigAxis.tags[CFGAX60].value := DINT_TO_STRING(Configuration.SOFT_LIMIT_GANTRY_Y_ENCODER_MIN);
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit, FALSE) AND NOT gMQTTApi.status.bufferIsFull THEN
						
				// Publish data to MQTT
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPublishConfigAxis';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPublishConfigAxis');
				
						
				// Check if the buffer is full
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE
				// Handle MQTT publish error
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventPublishConfigAxis'); 
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
			
		52:
			// Optics Data Collection ==========================
			gDataCollection.EventPublishOpticsData.lot_id						:= '';
			gDataCollection.EventPublishOpticsData.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPublishOpticsData.layer						:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPublishOpticsData.timestamp);
			gDataCollection.EventPublishOpticsData.seq							:= gDataCollection.EventPublishOpticsData.timestamp;
			
			// Optics Data recorded along with other waypoints
	
			gDataCollection.EventPublishOpticsData.tags[CFGOP1].name := 'OPTICS_ENCODER_TICK_WIDTH';
			gDataCollection.EventPublishOpticsData.tags[CFGOP1].type := 'FLOAT32';
			gDataCollection.EventPublishOpticsData.tags[CFGOP1].value := REAL_TO_STRING(gPrintJobManagement.currentState.encoderTickWidth);
	
			gDataCollection.EventPublishOpticsData.tags[CFGOP2].name := 'OPTICS_MAX_LASER_COUNT';
			gDataCollection.EventPublishOpticsData.tags[CFGOP2].type := 'FLOAT32';
			gDataCollection.EventPublishOpticsData.tags[CFGOP2].value := REAL_TO_STRING(gPrintJobManagement.currentState.maxLaserCount);
	
			gDataCollection.EventPublishOpticsData.tags[CFGOP3].name := 'OPTICS_LASER_LINE_ANGLE';
			gDataCollection.EventPublishOpticsData.tags[CFGOP3].type := 'FLOAT32';
			gDataCollection.EventPublishOpticsData.tags[CFGOP3].value := REAL_TO_STRING(gPrintJobManagement.currentState.laserLineAngle);
	
			gDataCollection.EventPublishOpticsData.tags[CFGOP4].name := 'OPTICS_HEAD_CENTER_OFFSET';
			gDataCollection.EventPublishOpticsData.tags[CFGOP4].type := 'FLOAT32';
			gDataCollection.EventPublishOpticsData.tags[CFGOP4].value := REAL_TO_STRING(gPrintJobManagement.currentState.headCenterOffset);
	
			gDataCollection.EventPublishOpticsData.tags[CFGOP5].name := 'OPTICS_LASER_SPACING';
			gDataCollection.EventPublishOpticsData.tags[CFGOP5].type := 'FLOAT32';
			gDataCollection.EventPublishOpticsData.tags[CFGOP5].value := REAL_TO_STRING(gPrintJobManagement.currentState.laserSpacing);
	
			gDataCollection.EventPublishOpticsData.tags[CFGOP6].name := 'OPTICS_MIN_LASER_WATTS';
			gDataCollection.EventPublishOpticsData.tags[CFGOP6].type := 'FLOAT32';
			gDataCollection.EventPublishOpticsData.tags[CFGOP6].value := REAL_TO_STRING(gPrintJobManagement.currentState.minLaserWatts);
	
			gDataCollection.EventPublishOpticsData.tags[CFGOP7].name := 'OPTICS_MAX_LASER_WATTS';
			gDataCollection.EventPublishOpticsData.tags[CFGOP7].type := 'FLOAT32';
			gDataCollection.EventPublishOpticsData.tags[CFGOP7].value := REAL_TO_STRING(gPrintJobManagement.currentState.maxLaserWatts);
					
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit, FALSE) AND NOT gMQTTApi.status.bufferIsFull THEN
						
				// Publish data to MQTT
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPublishOpticsData';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPublishOpticsData');
				
				// Update the buffer tail pointer
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
						
				//task.status.sequence :=  SEQUENCE_DELAY10; 
						
				// Check if the buffer is full
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE
				// Handle MQTT publish error
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventPublishOpticsData');
				//task.status.sequence :=  SEQUENCE_ERROR; 
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		53:
			// Filter Config Axis Data Collection ==========================
			gDataCollection.EventPublishFilterConfigAxis.lot_id						:= '';
			gDataCollection.EventPublishFilterConfigAxis.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPublishFilterConfigAxis.layer						:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPublishFilterConfigAxis.timestamp);
			gDataCollection.EventPublishFilterConfigAxis.seq						:= gDataCollection.EventPublishFilterConfigAxis.timestamp;
			
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX1].name := 'GANTRY_X_LOW_PASS_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX1].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX1].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.lowPassFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX2].name := 'GANTRY_X_LOW_PASS_FILTER_CUTOFF_FREQ';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX2].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX2].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.lowPassFilter.cutoffFrequencyHz);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX3].name := 'GANTRY_X_BI_QUAD_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX3].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX3].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.biquadFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX4].name := 'GANTRY_X_BI_QUAD_FILTER_FREQ_NUMERATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX4].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX4].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.biquadFilter.frequencyNumerator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX5].name := 'GANTRY_X_BI_QUAD_FILTER_DAMP_NUMERATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX5].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX5].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.biquadFilter.dampingNumerator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX6].name := 'GANTRY_X_BI_QUAD_FILTER_FREQ_DENOMINATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX6].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX6].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.biquadFilter.frequencyDenominator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX7].name := 'GANTRY_X_BI_QUAD_FILTER_DAMP_DENOMINATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX7].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX7].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.biquadFilter.dampingDenominator);

			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX8].name := 'GANTRY_X_NOTCH_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX8].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX8].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.notchFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX9].name := 'GANTRY_X_NOTCH_FILTER_CENTER_FREQ';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX9].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX9].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.notchFilter.centerFrequency);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX10].name := 'GANTRY_X_NOTCH_FILTER_BANDWIDTH';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX10].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX10].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X].tuning.notchFilter.bandwidth);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX11].name := 'GANTRY_X1_LOW_PASS_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX11].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX11].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.lowPassFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX12].name := 'GANTRY_X1_LOW_PASS_FILTER_CUTOFF_FREQ';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX12].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX12].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.lowPassFilter.cutoffFrequencyHz);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX13].name := 'GANTRY_X1_BI_QUAD_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX13].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX13].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.biquadFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX14].name := 'GANTRY_X1_BI_QUAD_FILTER_FREQ_NUMERATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX14].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX14].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.biquadFilter.frequencyNumerator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX15].name := 'GANTRY_X1_BI_QUAD_FILTER_DAMP_NUMERATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX15].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX15].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.biquadFilter.dampingNumerator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX16].name := 'GANTRY_X1_BI_QUAD_FILTER_FREQ_DENOMINATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX16].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX16].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.biquadFilter.frequencyDenominator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX17].name := 'GANTRY_X1_BI_QUAD_FILTER_DAMP_DENOMINATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX17].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX17].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.biquadFilter.dampingDenominator);

			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX18].name := 'GANTRY_X1_NOTCH_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX18].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX18].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.notchFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX19].name := 'GANTRY_X1_NOTCH_FILTER_CENTER_FREQ';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX19].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX19].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.notchFilter.centerFrequency);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX20].name := 'GANTRY_X1_NOTCH_FILTER_BANDWIDTH';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX20].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX20].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X1].tuning.notchFilter.bandwidth);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX21].name := 'GANTRY_X2_LOW_PASS_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX21].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX21].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.lowPassFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX22].name := 'GANTRY_X2_LOW_PASS_FILTER_CUTOFF_FREQ';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX22].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX22].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.lowPassFilter.cutoffFrequencyHz);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX23].name := 'GANTRY_X2_BI_QUAD_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX23].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX23].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.biquadFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX24].name := 'GANTRY_X2_BI_QUAD_FILTER_FREQ_NUMERATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX24].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX24].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.biquadFilter.frequencyNumerator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX25].name := 'GANTRY_X2_BI_QUAD_FILTER_DAMP_NUMERATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX25].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX25].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.biquadFilter.dampingNumerator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX26].name := 'GANTRY_X2_BI_QUAD_FILTER_FREQ_DENOMINATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX26].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX26].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.biquadFilter.frequencyDenominator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX27].name := 'GANTRY_X2_BI_QUAD_FILTER_DAMP_DENOMINATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX27].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX27].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.biquadFilter.dampingDenominator);

			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX28].name := 'GANTRY_X2_NOTCH_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX28].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX28].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.notchFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX29].name := 'GANTRY_X2_NOTCH_FILTER_CENTER_FREQ';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX29].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX29].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.notchFilter.centerFrequency);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX30].name := 'GANTRY_X2_NOTCH_FILTER_BANDWIDTH';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX30].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX30].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_X2].tuning.notchFilter.bandwidth);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX31].name := 'GANTRY_Y_LOW_PASS_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX31].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX31].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.lowPassFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX32].name := 'GANTRY_Y_LOW_PASS_FILTER_CUTOFF_FREQ';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX32].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX32].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.lowPassFilter.cutoffFrequencyHz);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX33].name := 'GANTRY_Y_BI_QUAD_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX33].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX33].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.biquadFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX34].name := 'GANTRY_Y_BI_QUAD_FILTER_FREQ_NUMERATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX34].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX34].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.biquadFilter.frequencyNumerator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX35].name := 'GANTRY_Y_BI_QUAD_FILTER_DAMP_NUMERATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX35].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX35].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.biquadFilter.dampingNumerator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX36].name := 'GANTRY_Y_BI_QUAD_FILTER_FREQ_DENOMINATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX36].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX36].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.biquadFilter.frequencyDenominator);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX37].name := 'GANTRY_Y_BI_QUAD_FILTER_DAMP_DENOMINATOR';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX37].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX37].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.biquadFilter.dampingDenominator);

			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX38].name := 'GANTRY_Y_NOTCH_FILTER_ENABLE';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX38].type := 'BOOL';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX38].value := BOOL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.notchFilter.enable);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX39].name := 'GANTRY_Y_NOTCH_FILTER_CENTER_FREQ';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX39].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX39].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.notchFilter.centerFrequency);
	
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX40].name := 'GANTRY_Y_NOTCH_FILTER_BANDWIDTH';
			gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX40].type := 'FLOAT32';
			//gDataCollection.EventPublishFilterConfigAxis.tags[CFGFAX40].value := REAL_TO_STRING(Configuration.Axis[AXIS_GANTRY_Y].tuning.notchFilter.bandwidth);
					
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit, FALSE) AND NOT gMQTTApi.status.bufferIsFull THEN
						
				// Publish data to MQTT
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPublishFilterConfigAxis';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPublishFilterConfigAxis');
				
				// Update the buffer tail pointer
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
						
				//task.status.sequence :=  SEQUENCE_DELAY6; 
						
				// Check if the buffer is full
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE
				// Handle MQTT publish error
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components, gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventPublishFilterConfigAxis');
				//task.status.sequence :=  SEQUENCE_ERROR; 
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		54:
			//EventHerdingPassivationStarted =====================
			gDataCollection.EventHerdingPassivationStarted.lot_id							:= '';
			gDataCollection.EventHerdingPassivationStarted.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventHerdingPassivationStarted.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventHerdingPassivationStarted.timestamp);
			gDataCollection.EventHerdingPassivationStarted.seq								:= gDataCollection.EventHerdingPassivationStarted.timestamp;
			
			gDataCollection.EventHerdingPassivationStarted.tags[0].name						:= 'Status';
			gDataCollection.EventHerdingPassivationStarted.tags[0].value						:= 'Herding Passivation Started'; 
			gDataCollection.EventHerdingPassivationStarted.tags[0].type						:= 'STRING';
			
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventHerdingPassivationStarted';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventHerdingPassivationStarted');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventHerdingPassivationStarted' );		
				END_IF
			END_IF	
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		55:
			IF 	gPrintJobManagement.currentState.currentLayerNumber > 1 THEN
				// EventHealthReport ==========================
				gDataCollection.EventHealthReport.lot_id						:= '';
				gDataCollection.EventHealthReport.lot_id						:= gPrintJobManagement.currentState.baseFilename;
				gDataCollection.EventHealthReport.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
				VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventHealthReport.timestamp);
				gDataCollection.EventHealthReport.seq							:= gDataCollection.EventGreasePumpRun.timestamp;
	
				gDataCollection.EventHealthReport.tags[0].name					:= 'TrajectoriesSinceEchainMaintenance';
				gDataCollection.EventHealthReport.tags[0].value					:= 	UDINT_TO_STRING(gPrintJobManagement.currentState.totalTrajectory - gPrintJobManagement.currentState.buildReport.echainMaintenanceTrajectory + gPrintJobManagement.currentState.buildReport.echainMaintTrajectoryOnReset);
				gDataCollection.EventHealthReport.tags[0].type					:= 'INT64';
	
				gDataCollection.EventHealthReport.tags[1].name					:= 'LastEchainMaintenanceDate';
				ascDT(gPrintJobManagement.currentState.buildReport.lastEchainMaintDate ,ADR(gDataCollection.EventHealthReport.tags[1].value),SIZEOF(gDataCollection.EventHealthReport.tags[1].value));
				gDataCollection.EventHealthReport.tags[1].type					:= 'STRING';
	
				gDataCollection.EventHealthReport.tags[2].name					:= 'EchainType';
				//gDataCollection.EventHealthReport.tags[2].value					:= ; // Set Elsewhere
				gDataCollection.EventHealthReport.tags[2].type					:= 'STRING';
	
				gDataCollection.EventHealthReport.tags[3].name					:= 'EchainMaintenanceThreshold';
				//gDataCollection.EventHealthReport.tags[3].value					:= ; // Set Elsewhere
				gDataCollection.EventHealthReport.tags[3].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[4].name					:= 'FileName';
				gDataCollection.EventHealthReport.tags[4].value					:= gPrintJobManagement.currentState.baseFilename;
				gDataCollection.EventHealthReport.tags[4].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[5].name					:= 'Author';
				gDataCollection.EventHealthReport.tags[5].value					:= gPrintJobManagement.currentState.author;
				gDataCollection.EventHealthReport.tags[5].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[6].name					:= 'BuildInstanceID';
				gDataCollection.EventHealthReport.tags[6].value					:= gPrintJobManagement.currentState.buildInstanceID;
				gDataCollection.EventHealthReport.tags[6].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[7].name					:= 'BuildPlatformName';
				gDataCollection.EventHealthReport.tags[7].value					:= gPrintJobManagement.currentState.buildPlatformName;
				gDataCollection.EventHealthReport.tags[7].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[8].name					:= 'NumberOfLayers';
				gDataCollection.EventHealthReport.tags[8].value					:= UINT_TO_STRING(gPrintJobManagement.currentState.numberOfLayers);
				gDataCollection.EventHealthReport.tags[8].type					:= 'INT32'; 
	
				gDataCollection.EventHealthReport.tags[9].name					:= 'PrintOwner';
				gDataCollection.EventHealthReport.tags[9].value					:= gPrintJobManagement.currentState.printOwner;
				gDataCollection.EventHealthReport.tags[9].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[10].name					:= 'LastGreasedTrajectoryNumber';
				gDataCollection.EventHealthReport.tags[10].value				:= UDINT_TO_STRING(gPrintJobManagement.currentState.buildReport.lastGreasedTrajectory);
				gDataCollection.EventHealthReport.tags[10].type					:= 'INT64';
						
				gDataCollection.EventHealthReport.tags[11].name					:= 'LastGreaseMaintenanceDate';
				//gDataCollection.EventHealthReport.tags[11].value				:= ; // Set Elsewhere
				gDataCollection.EventHealthReport.tags[11].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[12].name					:= 'TrajectoriesSinceGreaseMaintenance';
				gDataCollection.EventHealthReport.tags[12].value				:= UDINT_TO_STRING(gPrintJobManagement.currentState.totalTrajectory - gPrintJobManagement.currentState.buildReport.lastGreasedTrajectory + gPrintJobManagement.currentState.buildReport.greaseMaintTrajectoryOnReset);
				gDataCollection.EventHealthReport.tags[12].type					:= 'INT64';
						
				gDataCollection.EventHealthReport.tags[13].name					:= 'HerdingCleaningCount';
				gDataCollection.EventHealthReport.tags[13].value				:= USINT_TO_STRING(gPrintJobManagement.currentState.buildReport.HerdingCleaningCount); 
				gDataCollection.EventHealthReport.tags[13].type					:= 'INT32';
						
				gDataCollection.EventHealthReport.tags[14].name					:= 'HerdingPassivationCount';
				gDataCollection.EventHealthReport.tags[14].value				:= USINT_TO_STRING(gPrintJobManagement.currentState.buildReport.HerdingPassivationCount);
				gDataCollection.EventHealthReport.tags[14].type					:= 'INT32';
						
				gDataCollection.EventHealthReport.tags[15].name					:= 'GasHeadCleaningCount';
				gDataCollection.EventHealthReport.tags[15].value				:= INT_TO_STRING(gPrintJobManagement.currentState.buildReport.GasHeadCleanCount); 
				gDataCollection.EventHealthReport.tags[15].type					:= 'INT32';
						
				gDataCollection.EventHealthReport.tags[16].name					:= 'NumberOfMultiRecoats';
				gDataCollection.EventHealthReport.tags[16].value				:= INT_TO_STRING(gPrintJobManagement.currentState.buildReport.NumberOfMultiRecoatsPerLayer); 
				gDataCollection.EventHealthReport.tags[16].type					:= 'INT32';
						
				gDataCollection.EventHealthReport.tags[17].name					:= 'PrintCompletionStatus';
				IF gPrintJobManagement.currentState.currentLayerNumber = gPrintJobManagement.currentState.numberOfLayers THEN
					gDataCollection.EventHealthReport.tags[17].value				:= 'PRINT COMPLETE'; 
				ELSE
					gDataCollection.EventHealthReport.tags[17].value				:= 'PRINT ABORTED';
				END_IF
				gDataCollection.EventHealthReport.tags[17].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[18].name					:= 'BuildSetupStartTime';
				gDataCollection.EventHealthReport.tags[18].value				:= gPrintJobManagement.currentState.buildReport.BuildSetupStartTime; 
				gDataCollection.EventHealthReport.tags[18].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[19].name					:= 'BuildRemovedTime';
				VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventHealthReport.tags[19].value);
				gDataCollection.EventHealthReport.tags[19].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[20].name					:= 'PLCSoftwareVersion';
				gDataCollection.EventHealthReport.tags[20].value				:= gRevInfo_revision;
				gDataCollection.EventHealthReport.tags[20].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[21].name					:= 'OverheadHopperLoadCellBuildEnd';
				gDataCollection.EventHealthReport.tags[21].value				:= REAL_TO_STRING(gPowderApi.dataCollection.OverheadHopperLoadCell);
				gDataCollection.EventHealthReport.tags[21].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[22].name					:= 'FloorHopperLoadCellBuildEnd';
				gDataCollection.EventHealthReport.tags[22].value				:= REAL_TO_STRING(gPowderApi.dataCollection.FloorHopperLoadCell);
				gDataCollection.EventHealthReport.tags[22].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[23].name					:= 'MeteringHopperLoadCellBuildEnd';
				gDataCollection.EventHealthReport.tags[23].value				:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperLoadCell);
				gDataCollection.EventHealthReport.tags[23].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[24].name					:= 'BladeSpotCheckStatusPostPrint';
				IF gPrintJobManagement.currentState.buildReport.BladeSpotCheckStatusPostPrint = 1 THEN
					gDataCollection.EventHealthReport.tags[24].value				:= 'BLADE IN SPEC';
				ELSIF gPrintJobManagement.currentState.buildReport.BladeSpotCheckStatusPostPrint = 2 THEN
					gDataCollection.EventHealthReport.tags[24].value				:= 'BLADE NOT IN SPEC';
				ELSE
					gDataCollection.EventHealthReport.tags[24].value				:= 'NO BLADE SPOT CHECK DONE';
				END_IF
				gDataCollection.EventHealthReport.tags[24].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[25].name					:= 'TotalTrajectoryCount';
				gDataCollection.EventHealthReport.tags[25].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.totalTrajectory);
				gDataCollection.EventHealthReport.tags[25].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[26].name					:= 'MeteringHopperLoadCellBuildStart';
				gDataCollection.EventHealthReport.tags[26].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.meteringHopperStartOfBuild);
				gDataCollection.EventHealthReport.tags[26].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[27].name					:= 'OverheadHopperLoadCellBuildStart';
				gDataCollection.EventHealthReport.tags[27].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.overheadHopperStartOfBuild);
				gDataCollection.EventHealthReport.tags[27].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[28].name					:= 'FloorHopperLoadCellBuildStart';
				gDataCollection.EventHealthReport.tags[28].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.floorHopperStartOfBuild);
				gDataCollection.EventHealthReport.tags[28].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[29].name					:= 'PowderConsumedByMachine';
				gDataCollection.EventHealthReport.tags[29].value				:= REAL_TO_STRING((gPrintJobManagement.currentState.buildReport.floorHopperStartOfBuild-gPowderApi.dataCollection.FloorHopperLoadCell) + gPowderApi.dataCollection.OverheadHopperLoadCell + gMeteringHopperApi.dataCollection.MeteringHopperLoadCell);
				gDataCollection.EventHealthReport.tags[29].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[30].name					:= 'FocalOffsetUsedForPrint';
				gDataCollection.EventHealthReport.tags[30].value				:= REAL_TO_STRING(99.99);
				gDataCollection.EventHealthReport.tags[30].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[31].name					:= 'BladeOffsetUsedForPrint';
				gDataCollection.EventHealthReport.tags[31].value				:= REAL_TO_STRING(99.99);
				gDataCollection.EventHealthReport.tags[31].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[32].name					:= 'InitialAugerRotations';
				//gDataCollection.EventHealthReport.tags[32].value				:= ; // Set Elsewhere
				gDataCollection.EventHealthReport.tags[32].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[33].name					:= 'InitialAugerRotationVelocity';
				//gDataCollection.EventHealthReport.tags[33].value				:= ; // Set Elsewhere
				gDataCollection.EventHealthReport.tags[33].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[34].name					:= 'HerdingWasteLevelEndOfPrint';
				gDataCollection.EventHealthReport.tags[34].value				:= REAL_TO_STRING(gFilterApi.dataCollection.WasteBinFillLevel);
				gDataCollection.EventHealthReport.tags[34].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[35].name					:= 'ReclaimWeightEndOfPrint';
				gDataCollection.EventHealthReport.tags[35].value				:= REAL_TO_STRING(gPowderApi.dataCollection.ReclaimBinLevel);
				gDataCollection.EventHealthReport.tags[35].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[36].name					:= 'PowderConsumedForPrint';
				gDataCollection.EventHealthReport.tags[36].value				:= REAL_TO_STRING((gPrintJobManagement.currentState.buildReport.floorHopperStartOfBuild-gPowderApi.dataCollection.FloorHopperLoadCell) + ABS(gPrintJobManagement.currentState.buildReport.overheadHopperStartOfBuild - gPowderApi.dataCollection.OverheadHopperLoadCell) + ABS(gPrintJobManagement.currentState.buildReport.meteringHopperStartOfBuild - gMeteringHopperApi.dataCollection.MeteringHopperLoadCell));
				gDataCollection.EventHealthReport.tags[36].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[37].name					:= 'TimePrinting_Secs';
				gDataCollection.EventHealthReport.tags[37].value				:= UDINT_TO_STRING(gPrintJobManagement.currentState.buildReport.secondsPrintingDuringPrint);
				gDataCollection.EventHealthReport.tags[37].type					:= 'INT64';
						
				gDataCollection.EventHealthReport.tags[38].name					:= 'TimeRecoating_Secs';
				gDataCollection.EventHealthReport.tags[38].value				:= UDINT_TO_STRING(gPrintJobManagement.currentState.buildReport.secondsRecoatingDuringPrint);
				gDataCollection.EventHealthReport.tags[38].type					:= 'INT64';
						
				gDataCollection.EventHealthReport.tags[39].name					:= 'TimePreparing_Secs';
				gDataCollection.EventHealthReport.tags[39].value				:= UDINT_TO_STRING(gPrintJobManagement.currentState.buildReport.secondsPreparingDuringPrint);
				gDataCollection.EventHealthReport.tags[39].type					:= 'INT64';
						
				gDataCollection.EventHealthReport.tags[40].name					:= 'TimeRunning_Secs';
				gDataCollection.EventHealthReport.tags[40].value				:= UDINT_TO_STRING(gPrintJobManagement.currentState.buildReport.secondsPrintingDuringPrint + gPrintJobManagement.currentState.buildReport.secondsRecoatingDuringPrint + gPrintJobManagement.currentState.buildReport.secondsPreparingDuringPrint);
				gDataCollection.EventHealthReport.tags[40].type					:= 'INT64';
						
				gDataCollection.EventHealthReport.tags[41].name					:= 'TimeNotRunning_Secs';
				gDataCollection.EventHealthReport.tags[41].value				:= UDINT_TO_STRING(gPrintJobManagement.currentState.buildReport.secondsIdleDuringPrint + gPrintJobManagement.currentState.buildReport.secondsUnavailableDuringPrint + gPrintJobManagement.currentState.buildReport.secondsWaitingOpDuringPrint);
				gDataCollection.EventHealthReport.tags[41].type					:= 'INT64';
						
				gDataCollection.EventHealthReport.tags[42].name					:= 'ReclaimCollectedDuringPrint';
				gDataCollection.EventHealthReport.tags[42].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.reclaimCollectedDuringPrint);
				gDataCollection.EventHealthReport.tags[42].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[43].name					:= 'LayersInContinuousMode';
				gDataCollection.EventHealthReport.tags[43].value				:= UINT_TO_STRING(gPrintJobManagement.currentState.buildReport.layersInContinousModeDuringPrint);
				gDataCollection.EventHealthReport.tags[43].type					:= 'INT32';
						
				gDataCollection.EventHealthReport.tags[44].name					:= 'AverageGasFlowDuringPrint_Lpm';
				gDataCollection.EventHealthReport.tags[44].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.avgGasFlowDuringPrint);
				gDataCollection.EventHealthReport.tags[44].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[45].name					:= 'AverageO2PpmDuringPrint_Ppm';
				gDataCollection.EventHealthReport.tags[45].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.avgO2PpmDuringPrint);
				gDataCollection.EventHealthReport.tags[45].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[46].name					:= 'AveragePzPressureDuringPrint_InH2o';
				gDataCollection.EventHealthReport.tags[46].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.avgPzPressureDuringPrint);
				gDataCollection.EventHealthReport.tags[46].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[47].name					:= 'AverageLayerTimeInContinuousMode_Time';
				ascTIME((gPrintJobManagement.currentState.buildReport.totalLayerTimeInContinuousMode/gPrintJobManagement.currentState.currentLayerNumber),ADR(gDataCollection.EventHealthReport.tags[47].value),25);
				gDataCollection.EventHealthReport.tags[47].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[48].name					:= 'AveragePowderPerLayerInContinuousMode_Kgs';
				gDataCollection.EventHealthReport.tags[48].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.totalPowderPerLayerInContMode/gPrintJobManagement.currentState.currentLayerNumber);
				gDataCollection.EventHealthReport.tags[48].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[49].name					:= 'TimeOfPrintStart';
				ascDT(gPrintJobManagement.currentState.buildReport.timeStartOfPrint,ADR(gDataCollection.EventHealthReport.tags[49].value),25);
				gDataCollection.EventHealthReport.tags[49].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[50].name					:= 'TimeOfPrintEnd';
				ascDT(gPrintJobManagement.currentState.buildReport.timeEndOfPrint,ADR(gDataCollection.EventHealthReport.tags[50].value),25);
				gDataCollection.EventHealthReport.tags[50].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[51].name					:= 'OEEPercentage';
				IF (STRING_TO_REAL(gDataCollection.EventHealthReport.tags[40].value)+STRING_TO_REAL(gDataCollection.EventHealthReport.tags[41].value)) <> 0 THEN
					gDataCollection.EventHealthReport.tags[51].value				:= REAL_TO_STRING(STRING_TO_REAL(gDataCollection.EventHealthReport.tags[40].value)/(STRING_TO_REAL(gDataCollection.EventHealthReport.tags[40].value)+STRING_TO_REAL(gDataCollection.EventHealthReport.tags[41].value))*100);
				END_IF
				gDataCollection.EventHealthReport.tags[51].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[52].name					:= 'PrintTotalRecoats';
				gDataCollection.EventHealthReport.tags[52].value				:= UDINT_TO_STRING(gPrintJobManagement.currentState.buildReport.totalRecoatsDoneDuringPrint);
				gDataCollection.EventHealthReport.tags[52].type					:= 'INT64';
						
				gDataCollection.EventHealthReport.tags[53].name					:= 'PrintTotalTrajectories';
				gDataCollection.EventHealthReport.tags[53].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.totalTrajectoriesDoneDuringPrint);
				gDataCollection.EventHealthReport.tags[53].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[54].name					:= 'HerdingWasteLevelStartOfPrint';
				gDataCollection.EventHealthReport.tags[54].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.herdingWasteLevelStartOfPrint);
				gDataCollection.EventHealthReport.tags[54].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[55].name					:= 'MaxO2PpmDuringPrint_PPM';
				gDataCollection.EventHealthReport.tags[55].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.maxO2PpmDuringPrint);
				gDataCollection.EventHealthReport.tags[55].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport.tags[56].name					:= 'AverageLayerTimeInContinuousModeSingleRecoats_Time';
				ascTIME((gPrintJobManagement.currentState.buildReport.totalLayerTimeAutoMode1Recoat/gPrintJobManagement.currentState.currentLayerNumber),ADR(gDataCollection.EventHealthReport.tags[56].value),25);
				gDataCollection.EventHealthReport.tags[56].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[57].name					:= 'PrepareBuildPlateStart';
				gDataCollection.EventHealthReport.tags[57].value				:= (gPrintJobManagement.currentState.buildReport.timePrepareBpStart);
				gDataCollection.EventHealthReport.tags[57].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[58].name					:= 'PrepareBuildPlateEnd';
				gDataCollection.EventHealthReport.tags[58].value				:= (gPrintJobManagement.currentState.buildReport.timePrepareBpEnd);
				gDataCollection.EventHealthReport.tags[58].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[59].name					:= 'BladeSetupStart';
				gDataCollection.EventHealthReport.tags[59].value				:= (gPrintJobManagement.currentState.buildReport.timeBladeSetupStart);
				gDataCollection.EventHealthReport.tags[59].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[60].name					:= 'BladeSetupEnd';
				gDataCollection.EventHealthReport.tags[60].value				:= (gPrintJobManagement.currentState.buildReport.timeBladeSetupEnd);
				gDataCollection.EventHealthReport.tags[60].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[61].name					:= 'CameraCalibrationStart';
				gDataCollection.EventHealthReport.tags[61].value				:= (gPrintJobManagement.currentState.buildReport.timeCameraCalStart);
				gDataCollection.EventHealthReport.tags[61].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[62].name					:= 'CameraCalibrationEnd';
				gDataCollection.EventHealthReport.tags[62].value				:= (gPrintJobManagement.currentState.buildReport.timeCameraCalEnd);
				gDataCollection.EventHealthReport.tags[62].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[63].name					:= 'ScratchCoatStart';
				gDataCollection.EventHealthReport.tags[63].value				:= (gPrintJobManagement.currentState.buildReport.timeScratchCoatStart);
				gDataCollection.EventHealthReport.tags[63].type					:= 'STRING';
						
				gDataCollection.EventHealthReport.tags[64].name					:= 'ScratchCoatEnd';
				gDataCollection.EventHealthReport.tags[64].value				:= (gPrintJobManagement.currentState.buildReport.timeScratchCoatEnd);
				gDataCollection.EventHealthReport.tags[64].type					:= 'STRING';
				
				IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
					IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
				
						gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventHealthReport';
						gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
						gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
						gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
						gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventHealthReport');
						gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
						IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
							gMQTTApi.status.bufferIsFull := TRUE;
						END_IF
												
						gPrintJobManagement.currentState.buildReport.greaseMaintTrajectoryOnReset       :=  0; //Resetting the grease Maint trajectory count after sending the Mqtt event 
					ELSE	
						vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventHealthReport' );	
					END_IF
				END_IF
			
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		56:
			// Event End Power Test Data Collection ==========================
			gDataCollection.EventEndOfPowerTest.lot_id							:= '';
			gDataCollection.EventEndOfPowerTest.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventEndOfPowerTest.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfPowerTest.timestamp);
			gDataCollection.EventEndOfPowerTest.seq								:= gDataCollection.EventLayerStarted.timestamp;

			gDataCollection.EventEndOfPowerTest.tags[0].name						:= 'FolderNameOfTest';
			//gDataCollection.EventEndOfPowerTest.tags[0].value						:= ; // Set Elsewhere
			gDataCollection.EventEndOfPowerTest.tags[0].type						:= 'STRING'; 
			gDataCollection.EventEndOfPowerTest.tags[1].name						:= 'FolderSaveLocation';
			//gDataCollection.EventEndOfPowerTest.tags[1].value						:= ;  // Set Elsewhere
			gDataCollection.EventEndOfPowerTest.tags[1].type						:= 'STRING';
			gDataCollection.EventEndOfPowerTest.tags[2].name						:= 'OverallPassFailStatus';
			//gDataCollection.EventEndOfPowerTest.tags[2].value						:= ;  // Set Elsewhere 
			gDataCollection.EventEndOfPowerTest.tags[2].type						:= 'STRING'; 
			gDataCollection.EventEndOfPowerTest.tags[3].name						:= 'TestType';
			IF gManualPulseTypeSelected = VFLCR_TEST_TYPE_CALIBRATION THEN
				gDataCollection.EventEndOfPowerTest.tags[3].value						:= 'Calibration'; 
			ELSIF gManualPulseTypeSelected = VFLCR_TEST_TYPE_VERIFY_CLEAN THEN
				gDataCollection.EventEndOfPowerTest.tags[3].value						:= 'CleanVerification'; 
			ELSIF gManualPulseTypeSelected = VFLCR_TEST_TYPE_VERIFY_DIRTY THEN	
				gDataCollection.EventEndOfPowerTest.tags[3].value						:= 'DirtyVerification'; 
			ELSIF gManualPulseTypeSelected = VFLCR_TEST_TYPE_LOW_POWER_CHECK THEN	
				gDataCollection.EventEndOfPowerTest.tags[3].value						:= 'LowPowerCheck'; 
			END_IF
			gDataCollection.EventEndOfPowerTest.tags[3].type						:= 'STRING'; 

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfPowerTest';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfPowerTest');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOfPowerTest' );
				END_IF
			END_IF
		
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		57:
			// EventStartOfVolumeLoad ==========================
			gDataCollection.EventStartOfVolumeLoad.lot_id							:= '';
			gDataCollection.EventStartOfVolumeLoad.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventStartOfVolumeLoad.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOfVolumeLoad.timestamp);
			gDataCollection.EventStartOfVolumeLoad.seq								:= gDataCollection.EventStartOfVolumeLoad.timestamp;

			gDataCollection.EventStartOfVolumeLoad.tags[0].name					:= 'TimeLoadVolumeStart';
			//gDataCollection.EventStartOfVolumeLoad.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventStartOfVolumeLoad.tags[0].type					:= 'STRING';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfVolumeLoad';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfVolumeLoad');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOfVolumeLoad' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		58:
			// EventStartOfVolumeUnload ==========================
			gDataCollection.EventStartOfVolumeUnload.lot_id							:= '';
			gDataCollection.EventStartOfVolumeUnload.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventStartOfVolumeUnload.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOfVolumeUnload.timestamp);
			gDataCollection.EventStartOfVolumeUnload.seq							:= gDataCollection.EventStartOfVolumeUnload.timestamp;

			gDataCollection.EventStartOfVolumeUnload.tags[0].name					:= 'TimeUnloadVolumeStart';
			//gDataCollection.EventEndOfVolumeUnload.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventStartOfVolumeUnload.tags[0].type					:= 'STRING';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfVolumeUnload';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfVolumeUnload');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOfVolumeUnload' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		59:
			// EventStartOfPlateLevelling ==========================
			gDataCollection.EventStartOfPlateLevelling.lot_id							:= '';
			gDataCollection.EventStartOfPlateLevelling.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventStartOfPlateLevelling.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOfPlateLevelling.timestamp);
			gDataCollection.EventStartOfPlateLevelling.seq								:= gDataCollection.EventStartOfPlateLevelling.timestamp;

			gDataCollection.EventStartOfPlateLevelling.tags[0].name					:= 'TimePlateLevellingStart';
			//gDataCollection.EventStartOfPlateLevelling.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventStartOfPlateLevelling.tags[0].type					:= 'STRING';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfPlateLevelling';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfPlateLevelling');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOfPlateLevelling' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		60:
			// EventEndOfPlateLevelling ==========================
			gDataCollection.EventEndOfPlateLevelling.lot_id							:= '';
			gDataCollection.EventEndOfPlateLevelling.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventEndOfPlateLevelling.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfPlateLevelling.timestamp);
			gDataCollection.EventEndOfPlateLevelling.seq							:= gDataCollection.EventStartOfPlateLevelling.timestamp;

			gDataCollection.EventEndOfPlateLevelling.tags[0].name					:= 'TimePlateLevellingEnd';
			//gDataCollection.EventEndOfPlateLevelling.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventEndOfPlateLevelling.tags[0].type					:= 'STRING';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfPlateLevelling';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfPlateLevelling');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOfPlateLevelling' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		61:
			// EventStartOfBladeLevelling ==========================
			gDataCollection.EventStartOfBladeLevelling.lot_id							:= '';
			gDataCollection.EventStartOfBladeLevelling.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventStartOfBladeLevelling.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOfBladeLevelling.timestamp);
			gDataCollection.EventStartOfBladeLevelling.seq								:= gDataCollection.EventStartOfBladeLevelling.timestamp;

			gDataCollection.EventStartOfBladeLevelling.tags[0].name					:= 'TimeBladeLevellingStart';
			//gDataCollection.EventStartOfBladeLevelling.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventStartOfBladeLevelling.tags[0].type					:= 'STRING';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfBladeLevelling';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfBladeLevelling');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOfBladeLevelling' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
	
		62:
			// EventStartOfCameraCal ==========================
			gDataCollection.EventStartOfCameraCal.lot_id						:= '';
			gDataCollection.EventStartOfCameraCal.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventStartOfCameraCal.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventStartOfCameraCal.timestamp);
			gDataCollection.EventStartOfCameraCal.seq							:= gDataCollection.EventStartOfCameraCal.timestamp;

			gDataCollection.EventStartOfCameraCal.tags[0].name					:= 'TimeCameraCalStart';
			//gDataCollection.EventStartOfCameraCal.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventStartOfCameraCal.tags[0].type					:= 'STRING';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventStartOfCameraCal';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventStartOfCameraCal');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventStartOfCameraCal' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		63:
			// EventEndOfCameraCal ==========================
			gDataCollection.EventEndOfCameraCal.lot_id							:= '';
			gDataCollection.EventEndOfCameraCal.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventEndOfCameraCal.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventEndOfCameraCal.timestamp);
			gDataCollection.EventEndOfCameraCal.seq								:= gDataCollection.EventStartOfCameraCal.timestamp;


			gDataCollection.EventEndOfCameraCal.tags[0].name					:= 'TimeCameraCalEnd';
			//gDataCollection.EventEndOfCameraCal.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventEndOfCameraCal.tags[0].type					:= 'STRING';



			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventEndOfCameraCal';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventEndOfCameraCal');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventEndOfCameraCal' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
		64:
			// EventStartOfScratchCoat ==========================
			gDataCollection.EventScratchCoatStart.lot_id						:= '';
			gDataCollection.EventScratchCoatStart.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventScratchCoatStart.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventScratchCoatStart.timestamp);
			gDataCollection.EventScratchCoatStart.seq							:= gDataCollection.EventScratchCoatStart.timestamp;

			gDataCollection.EventScratchCoatStart.tags[0].name					:= 'TimeScratchCoatStart';
			//gDataCollection.EventScratchCoatStart.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventScratchCoatStart.tags[0].type					:= 'STRING';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventScratchCoatStart';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventScratchCoatStart');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventScratchCoatStart' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		65:
			// EventEndOfScratchCoat ==========================
			gDataCollection.EventScratchCoatEnd.lot_id						:= '';
			gDataCollection.EventScratchCoatEnd.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventScratchCoatEnd.layer						:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventScratchCoatEnd.timestamp);
			gDataCollection.EventScratchCoatEnd.seq							:= gDataCollection.EventScratchCoatStart.timestamp;

			gDataCollection.EventScratchCoatEnd.tags[0].name					:= 'TimeScratchCoatEnd';
			//gDataCollection.EventScratchCoatEnd.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventScratchCoatEnd.tags[0].type					:= 'STRING';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventScratchCoatEnd';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventScratchCoatEnd');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventScratchCoatEnd' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		66:
			// EventPodAttached ==========================
			gDataCollection.EventPodAttached.lot_id							:= '';
			gDataCollection.EventPodAttached.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPodAttached.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPodAttached.timestamp);
			gDataCollection.EventPodAttached.seq							:= gDataCollection.EventPodAttached.timestamp;

			gDataCollection.EventPodAttached.tags[0].name					:= 'TimePodAttached';
			//gDataCollection.EventPodAttached.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventPodAttached.tags[0].type					:= 'STRING';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPodAttached';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPodAttached');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventPodAttached' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		67:
			// EventPodDetached ==========================
			gDataCollection.EventPodDetached.lot_id							:= '';
			gDataCollection.EventPodDetached.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventPodDetached.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventPodDetached.timestamp);
			gDataCollection.EventPodDetached.seq							:= gDataCollection.EventPodAttached.timestamp;

			gDataCollection.EventPodDetached.tags[0].name					:= 'TimePodDetached';
			//gDataCollection.EventPodDetached.tags[0].value					:= ; // set elseewhere
			gDataCollection.EventPodDetached.tags[0].type					:= 'STRING';


			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventPodDetached';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventPodDetached');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventPodDetached' );
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
			
		68: 
			// Distribution Aborted Data Collection ==========================
			gDataCollection.EventDistributionAborted.lot_id							:= '';
			gDataCollection.EventDistributionAborted.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventDistributionAborted.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventDistributionAborted.timestamp);
			gDataCollection.EventDistributionAborted.seq							:= gDataCollection.EventDistributionAborted.timestamp;
			
			gDataCollection.EventDistributionAborted.tags[0].name					:= 'FileName';
			gDataCollection.EventDistributionAborted.tags[0].value					:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventDistributionAborted.tags[0].type					:= 'STRING';
			gDataCollection.EventDistributionAborted.tags[1].name					:= 'Author';
			gDataCollection.EventDistributionAborted.tags[1].value					:= gPrintJobManagement.currentState.author;
			gDataCollection.EventDistributionAborted.tags[1].type					:= 'STRING';
			gDataCollection.EventDistributionAborted.tags[2].name					:= 'BuildInstanceID';
			gDataCollection.EventDistributionAborted.tags[2].value					:= gPrintJobManagement.currentState.buildInstanceID;
			gDataCollection.EventDistributionAborted.tags[2].type					:= 'STRING';
			gDataCollection.EventDistributionAborted.tags[3].name					:= 'BuildLayout';
			gDataCollection.EventDistributionAborted.tags[3].value					:= UDINT_TO_STRING(gPrintJobManagement.currentState.buildLayout);
			gDataCollection.EventDistributionAborted.tags[3].type					:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventDistributionAborted.tags[4].name					:= 'BuildPlatformName';
			gDataCollection.EventDistributionAborted.tags[4].value					:= gPrintJobManagement.currentState.buildPlatformName;
			gDataCollection.EventDistributionAborted.tags[4].type					:= 'STRING';
			gDataCollection.EventDistributionAborted.tags[5].name					:= 'ConfigEditorVersion';
			gDataCollection.EventDistributionAborted.tags[5].value					:= gPrintJobManagement.currentState.configEditorVersion;
			gDataCollection.EventDistributionAborted.tags[5].type					:= 'STRING';
			gDataCollection.EventDistributionAborted.tags[6].name					:= 'CurrentLayerNumber';
			gDataCollection.EventDistributionAborted.tags[6].value					:= UINT_TO_STRING(gPrintJobManagement.currentState.currentLayerNumber);
			gDataCollection.EventDistributionAborted.tags[6].type					:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventDistributionAborted.tags[7].name					:= 'Description';
			gDataCollection.EventDistributionAborted.tags[7].value					:= gPrintJobManagement.currentState.description;
			gDataCollection.EventDistributionAborted.tags[7].type					:= 'STRING';
			gDataCollection.EventDistributionAborted.tags[8].name					:= 'NumberOfLayers';
			gDataCollection.EventDistributionAborted.tags[8].value					:= UINT_TO_STRING(gPrintJobManagement.currentState.numberOfLayers);
			gDataCollection.EventDistributionAborted.tags[8].type					:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventDistributionAborted.tags[9].name					:= 'PrintNumber';
			gDataCollection.EventDistributionAborted.tags[9].value					:= UINT_TO_STRING(gPrintJobManagement.currentState.printNumber);
			gDataCollection.EventDistributionAborted.tags[9].type					:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventDistributionAborted.tags[10].name					:= 'PrintOwner';
			gDataCollection.EventDistributionAborted.tags[10].value					:= gPrintJobManagement.currentState.printOwner;
			gDataCollection.EventDistributionAborted.tags[10].type					:= 'STRING';

			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
					
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventDistributionAborted';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventDistributionAborted');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'EventDistributionAborted');
				END_IF
			END_IF
			
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
		
		69:
			IF 	gPrintJobManagement.currentState.currentLayerNumber > 1 THEN	
				// EventHealthReport Continued ==========================
				gDataCollection.EventHealthReport2.lot_id						:= '';
				gDataCollection.EventHealthReport2.lot_id						:= gPrintJobManagement.currentState.baseFilename;
				gDataCollection.EventHealthReport2.layer						:= gPrintJobManagement.currentState.currentLayerNumber;
				VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventHealthReport2.timestamp);
				gDataCollection.EventHealthReport2.seq							:= gDataCollection.EventHealthReport2.timestamp;
	
				gDataCollection.EventHealthReport2.tags[0].name					:= 'PowderConsumedForScratchCoat';
				gDataCollection.EventHealthReport2.tags[0].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.totalPowderForScratchCoat);
				gDataCollection.EventHealthReport2.tags[0].type					:= 'FLOAT32';
				
				gDataCollection.EventHealthReport2.tags[1].name					:= 'GreaseDispensedOnUnload';
				gDataCollection.EventHealthReport2.tags[1].value				:= BOOL_TO_STRING(gPrintJobManagement.currentState.buildReport.greaseDispensedOnUnload);
				gDataCollection.EventHealthReport2.tags[1].type					:= 'BOOL';
				
				gDataCollection.EventHealthReport2.tags[2].name					:= 'BladeAngle';
				gDataCollection.EventHealthReport2.tags[2].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.bladeAngle);
				gDataCollection.EventHealthReport2.tags[2].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[3].name					:= 'BladeMaxErrorPrePrint';
				gDataCollection.EventHealthReport2.tags[3].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.bladeMaxErrPrePrint);
				gDataCollection.EventHealthReport2.tags[3].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[4].name					:= 'BladeMaxErrorPostPrint';
				gDataCollection.EventHealthReport2.tags[4].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.bladeMaxErrPostPrint);
				gDataCollection.EventHealthReport2.tags[4].type					:= 'FLOAT32';
				
				gDataCollection.EventHealthReport2.tags[5].name					:= 'AverageRecoaterSpreadSpeed_mm_s';
				gDataCollection.EventHealthReport2.tags[5].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.totalRecoatSpeed/gPrintJobManagement.currentState.currentLayerNumber);
				gDataCollection.EventHealthReport2.tags[5].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[6].name					:= 'MinRecoaterSpreadSpeed_mm_s';
				gDataCollection.EventHealthReport2.tags[6].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.minRecoatSpeed);
				gDataCollection.EventHealthReport2.tags[6].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[7].name					:= 'MaxRecoaterSpreadSpeed_mm_s';
				gDataCollection.EventHealthReport2.tags[7].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.maxRecoatSpeed);
				gDataCollection.EventHealthReport2.tags[7].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[8].name					:= 'AverageRecoaterGain_Percent';
				gDataCollection.EventHealthReport2.tags[8].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.avgElectrodeGainDuringPrint);
				gDataCollection.EventHealthReport2.tags[8].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[9].name					:= 'MinRecoaterGain_Percent';
				gDataCollection.EventHealthReport2.tags[9].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.minRecoatGain);
				gDataCollection.EventHealthReport2.tags[9].type					:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[10].name				:= 'MaxRecoaterGain_Percent';
				gDataCollection.EventHealthReport2.tags[10].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.maxRecoatGain);
				gDataCollection.EventHealthReport2.tags[10].type				:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[11].name				:= 'AverageRecoaterInitDispenseRotations';
				gDataCollection.EventHealthReport2.tags[11].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.avgInitialDispenseRotations);
				gDataCollection.EventHealthReport2.tags[11].type				:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[12].name				:= 'MinRecoaterInitDispenseRotations';
				gDataCollection.EventHealthReport2.tags[12].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.minRecoatInitDispense);
				gDataCollection.EventHealthReport2.tags[12].type				:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[13].name				:= 'MaxRecoaterInitDispenseRotations';
				gDataCollection.EventHealthReport2.tags[13].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.maxRecoatInitDispense);
				gDataCollection.EventHealthReport2.tags[13].type				:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[14].name				:= 'MinGasFlowDuringPrint_Lpm';
				gDataCollection.EventHealthReport2.tags[14].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.minGasFlowDuringPrint);
				gDataCollection.EventHealthReport2.tags[14].type				:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[15].name				:= 'MaxGasFlowDuringPrint_Lpm';
				gDataCollection.EventHealthReport2.tags[15].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.maxGasFlowDuringPrint);
				gDataCollection.EventHealthReport2.tags[15].type				:= 'FLOAT32';
				
				gDataCollection.EventHealthReport2.tags[16].name				:= 'PrintingTime';
				ascTIME(gPrintJobManagement.currentState.buildReport.timeElapsedInPrint,ADR(gDataCollection.EventHealthReport2.tags[16].value),SIZEOF(gDataCollection.EventHealthReport2.tags[16].value));
				gDataCollection.EventHealthReport2.tags[16].type				:= 'STRING';
				
				gDataCollection.EventHealthReport2.tags[17].name				:= 'TotalStartingPowder_Kgs';
				gDataCollection.EventHealthReport2.tags[17].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.meteringHopperStartOfBuild + gPrintJobManagement.currentState.buildReport.overheadHopperStartOfBuild + gPrintJobManagement.currentState.buildReport.floorHopperStartOfBuild);
				gDataCollection.EventHealthReport2.tags[17].type				:= 'FLOAT32';
						
				gDataCollection.EventHealthReport2.tags[18].name				:= 'TotalEndingPowder_Kgs';
				gDataCollection.EventHealthReport2.tags[18].value				:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperLoadCell + gPowderApi.dataCollection.OverheadHopperLoadCell + gPowderApi.dataCollection.FloorHopperLoadCell);
				gDataCollection.EventHealthReport2.tags[18].type				:= 'FLOAT32';
				
				gDataCollection.EventHealthReport2.tags[19].name				:= 'ReclaimBinWeightEndOfPrint_Kgs';
				gDataCollection.EventHealthReport2.tags[19].value				:= REAL_TO_STRING(gPowderApi.dataCollection.ReclaimBinLevel);
				gDataCollection.EventHealthReport2.tags[19].type				:= 'FLOAT32';
				
				gDataCollection.EventHealthReport2.tags[20].name				:= 'MinO2PpmDuringPrint_PPM';
				gDataCollection.EventHealthReport2.tags[20].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.minO2PpmDuringPrint);
				gDataCollection.EventHealthReport2.tags[20].type				:= 'FLOAT32';
				
				gDataCollection.EventHealthReport2.tags[21].name				:= 'LongestPauseHours';
				gDataCollection.EventHealthReport2.tags[21].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.longestPauseHours);
				gDataCollection.EventHealthReport2.tags[21].type				:= 'FLOAT32';
					
				gDataCollection.EventHealthReport2.tags[22].name				:= 'LongestPauseLayer';
				gDataCollection.EventHealthReport2.tags[22].value				:= (gPrintJobManagement.currentState.buildReport.longestPauseLayer);
				gDataCollection.EventHealthReport2.tags[22].type				:= 'FLOAT32';
				
				IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
					IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
				
						gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventHealthReport2';
						gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
						gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
						gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
						gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventHealthReport2');
						gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
						IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
							gMQTTApi.status.bufferIsFull := TRUE;
						END_IF
											
					ELSE	
						vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventHealthReport2' );	
					END_IF
				END_IF
		
			END_IF
		
			messageIndex := MQTT_MESSAGE_SEQUENCE;
			MQTT_MESSAGE_SEQUENCE := 0;
			
			
		70:
			// EventFacilityIssue ==========================
			gDataCollection.EventFacilityWaterIssue.lot_id						:= '';
			gDataCollection.EventFacilityWaterIssue.lot_id						:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventFacilityWaterIssue.layer						:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventFacilityWaterIssue.timestamp);
			gDataCollection.EventFacilityWaterIssue.seq							:= gDataCollection.EventFacilityWaterIssue.timestamp;

			gDataCollection.EventFacilityWaterIssue.tags[0].name				:= 'FacilityPressureHigh';
			gDataCollection.EventFacilityWaterIssue.tags[0].value				:= BOOL_TO_STRING(FALSE);
			gDataCollection.EventFacilityWaterIssue.tags[0].type				:= 'BOOL';

			gDataCollection.EventFacilityWaterIssue.tags[1].name				:= 'FacilityPressureLow';
			gDataCollection.EventFacilityWaterIssue.tags[1].value				:= BOOL_TO_STRING(FALSE);
			gDataCollection.EventFacilityWaterIssue.tags[1].type				:= 'BOOL';
		
			gDataCollection.EventFacilityWaterIssue.tags[2].name				:= 'FacilityTemperatureHigh';
			gDataCollection.EventFacilityWaterIssue.tags[2].value				:= BOOL_TO_STRING(FALSE);
			gDataCollection.EventFacilityWaterIssue.tags[2].type				:= 'BOOL';

			gDataCollection.EventFacilityWaterIssue.tags[3].name				:= 'FacilityTemperatureLow';
			gDataCollection.EventFacilityWaterIssue.tags[3].value				:= BOOL_TO_STRING(FALSE);
			gDataCollection.EventFacilityWaterIssue.tags[3].type				:= 'BOOL';
			
			gDataCollection.EventFacilityWaterIssue.tags[4].name				:= 'DryCoolerPumpIssue';
			gDataCollection.EventFacilityWaterIssue.tags[4].value				:= BOOL_TO_STRING(FALSE);
			gDataCollection.EventFacilityWaterIssue.tags[4].type				:= 'BOOL';
			
			
			IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
				IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull) THEN
		
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventFacilityWaterIssue';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
					gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventFacilityWaterIssue');
					gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
					IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
						gMQTTApi.status.bufferIsFull := TRUE;
					END_IF
				ELSE	
					vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventFacilityWaterIssue' );	
				END_IF
			END_IF	
			
			sendEveryMessage := FALSE;
			MQTT_MESSAGE_SEQUENCE := 0;
			messageIndex := 0;
			
		
	END_CASE
	
	
	IF sendContinuousMessages THEN
		
		IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'EventSaveSetupScanData';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/EVENT/EventSaveSetupScanData');
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE	
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventSaveSetupScanData' );
			END_IF
		END_IF

	END_IF
	
	IF sendTwentyAlarms THEN
		
		sendTwentyAlarms := FALSE;
		vfAlarmEdge(gAxisApi[0].alarm.component, gAxisApi[0].alarm.INVALID_TUNING_PARAMETERS);
		vfAlarmEdge(gAxisApi[0].alarm.component, gAxisApi[0].alarm.AXISBASIC_ALARM);
		vfAlarmEdge(gAxisApi[0].alarm.component, gAxisApi[0].alarm.AGGREGATE_GENERAL_ALARM);
		vfAlarmEdge(gAxisApi[0].alarm.component, gAxisApi[0].alarm.AXISBASIC_HOME_DISTANCE_ALARM);
		vfAlarmEdge(gAxisApi[0].alarm.component, gAxisApi[0].alarm.AXISBASIC_INIHIBIT_JOG);
		vfAlarmEdge(gAxisApi[0].alarm.component, gAxisApi[0].alarm.AXISBASIC_INIHIBIT_JOG_NEG);
		vfAlarmEdge(gAxisApi[0].alarm.component, gAxisApi[0].alarm.AXISBASIC_INIHIBIT_JOG_POS);
		vfAlarmEdge(gAxisApi[0].alarm.component, gAxisApi[0].alarm.AXISBASIC_INIHIBIT_WAYPOINTS);
		vfAlarmEdge(gAxisApi[0].alarm.component, gAxisApi[0].alarm.AXISBASIC_NO_REF_ALARM);
		vfAlarmEdge(gAxisApi[0].alarm.component, gAxisApi[0].alarm.AXISBASIC_UPDATE_LIMITS_ALARM);
		vfAlarmEdge(gAxisApi[0].alarm.component, gAxisApi[0].alarm.CONTINUOUS_CURRENT_TOO_HIGH);
			
		// Add all general alarms to the list.
		vfAlarmEdge(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_HEARTBEAT_ERROR_AL9100);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_HARDWARE_ERROR_AL9103);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_SUPPLY_FAN_FAIL_AL9104);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_SUPPLY_OVERTEMP_AL9105);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_SUPPLY_AC_LOW_AL9106);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_SUPPLY_DC_FAIL_AL9107);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_CONTROL_POWER_AL9108);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_LASER_READY_FAIL_AL9109);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_LASER_MAIN_POWER_AL9110);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_LASER_EMISSION_AL9111);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_LASER_FATAL_AL9112);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_LASER_WATCHDOG_AL9113);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_HW_POWERLINK_ERROR_AL9114);
	
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_SW_VERSION_MISMATCH_AL9200);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_SW_ID_MISMATCH_AL9201);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_SW_LUT_LOAD_FAIL_AL9202);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_SW_MAP_UNDEFINED_AL9203);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_SW_SYSTEM_ERROR_AL9204);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_SW_TRAJECTORY_ERROR_AL9205);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_SW_PRINT_NOT_READY_AL9206);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_SW_COMMAND_INHIBIT_AL9207);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_DISABLE_CHILLER_RUN_AL9208);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_DISABLE_OB_FLOW_LOW_AL9209);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_VERIFY_INHIBIT_AL9210);
	
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_PM_FILE_NOT_FOUND_AL9300);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_PM_PATH_NOT_FOUND_AL9301);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_PM_FILE_OPEN_ERROR_AL9302);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_PM_FILE_CLOSE_ERROR_AL9303);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_PM_FILE_READ_ERROR_AL9304);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_PM_FILE_DATA_ERROR_AL9305);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_PM_VERSION_CONFLICT_AL9306);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_PM_IGNORED_PIXEL_AL9307);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_PM_RANGE_EXCEEDED_AL9308);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.PIXEL_ENABLE_MISMATCH_AL9309);
	
		// python calibration app alarms
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_APP_HEARTBEAT_ERROR_AL9400);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401);	
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_APP_CMD_B4_READY_AL9402);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_APP_RESULTS_TIMEOUT_AL9403);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_APP_BUCKET_MISSING_AL9404);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_APP_S3_CONNECTION_AL9405);
		vfAlarmEdge(gVFLCR.alarm.components,gVFLCR.alarm.VFLCR_APP_CAPTURE_FAILED_AL9406);

	END_IF
	

	
	
	messageWait();
	messageWait.IN := FALSE;
END_PROGRAM

