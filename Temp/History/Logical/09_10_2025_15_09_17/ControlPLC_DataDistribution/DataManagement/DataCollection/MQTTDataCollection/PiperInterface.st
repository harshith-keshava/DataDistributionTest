
ACTION PiperModuleInterface: 
	
	//Give this module a name so it is easier to debug
	ModuleInterface.ModuleName:=	Name;

	//Add a module to the Piper
	Module.ModuleInterface:=	ADR(ModuleInterface);
	Module.Piper:= 	ADR(gMachine);
	Module();

	
	
	// Handle any machine states that this module needs to respond to
	CASE ModuleInterface.PiperState OF
//		MACH_ST_BOOTING:		
//		MACH_ST_CLEARING:
		MACH_ST_STOPPED:
			IF Configuration.EnableDataCollection THEN
				IF (ModuleInterface.PiperState = MACH_ST_STOPPED) AND (previousPiperState <> MACH_ST_STOPPED) THEN
					gDataCollection.StatusStateChange.lot_id							:= '';
					gDataCollection.StatusStateChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
					gDataCollection.StatusStateChange.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
					VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusStateChange.timestamp);
					gDataCollection.StatusStateChange.seq								:= gDataCollection.StatusStateChange.timestamp;
					
					gDataCollection.StatusStateChange.tags[0].name						:= 'MachineState';
					gDataCollection.StatusStateChange.tags[0].value						:= 'STOPPED'; 
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
					
				END_IF

				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;

			ELSE
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			END_IF	
			
		MACH_ST_STARTING:
			IF Configuration.EnableDataCollection THEN
				IF (ModuleInterface.PiperState = MACH_ST_STARTING) AND (previousPiperState <> MACH_ST_STARTING) THEN
					gDataCollection.StatusStateChange.lot_id							:= '';
					gDataCollection.StatusStateChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
					gDataCollection.StatusStateChange.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
					VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusStateChange.timestamp);
					gDataCollection.StatusStateChange.seq								:= gDataCollection.StatusStateChange.timestamp;
					
					gDataCollection.StatusStateChange.tags[0].name						:= 'MachineState';
					gDataCollection.StatusStateChange.tags[0].value						:= 'STARTING'; 
					gDataCollection.StatusStateChange.tags[0].type						:= 'STRING';
					
					IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull )  THEN
						
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
					
				END_IF

				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;

			ELSE
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			END_IF	
			(*//sample piper integration
			
			//for when sequence is required for substate transition
			CASE ModuleInterface.PiperSubState OF
				
				0:
					
					//only need the chiller for printing but not other operations
					CASE gMachineState.operation OF
						
						MACHINE_OPERATIONS_PRINT_LAYER:
							ModuleInterface.ModuleSubStateRequest := SUB_STATE_CHECK_CHILLER;
						
						ELSE
							ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
						
					END_CASE
						
						
								
			
				
					
			
				SUB_STATE_CHECK_CHILLER:
					
					//should be an edge command
					task.command.startChiller := TRUE;
					
					ModuleInterface.ModuleStatus := 'waiting chiller';
					
					IF task.status.chillerIsRunning THEN
						ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
					END_IF

			END_CASE
			
			*)
			
			
			
			
		MACH_ST_IDLE:
			IF Configuration.EnableDataCollection THEN
				IF (ModuleInterface.PiperState = MACH_ST_IDLE) AND (previousPiperState <> MACH_ST_IDLE) THEN
					gDataCollection.StatusStateChange.lot_id							:= '';
					gDataCollection.StatusStateChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
					gDataCollection.StatusStateChange.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
					VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusStateChange.timestamp);
					gDataCollection.StatusStateChange.seq								:= gDataCollection.StatusStateChange.timestamp;
					
					gDataCollection.StatusStateChange.tags[0].name						:= 'MachineState';
					gDataCollection.StatusStateChange.tags[0].value						:= 'IDLE'; 
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
					
				END_IF

				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;

			ELSE
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			END_IF
			
//		MACH_ST_SUSPENDED:
		MACH_ST_EXECUTE:
			IF Configuration.EnableDataCollection THEN
				IF (ModuleInterface.PiperState = MACH_ST_EXECUTE) AND (previousPiperState <> MACH_ST_EXECUTE) THEN
					gDataCollection.StatusStateChange.lot_id							:= '';
					gDataCollection.StatusStateChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
					gDataCollection.StatusStateChange.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
					VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusStateChange.timestamp);
					gDataCollection.StatusStateChange.seq								:= gDataCollection.StatusStateChange.timestamp;
					
					gDataCollection.StatusStateChange.tags[0].name						:= 'MachineState';
					gDataCollection.StatusStateChange.tags[0].value						:= 'EXECUTE'; 
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
					
				END_IF

				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;

			ELSE
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			END_IF	
			
		MACH_ST_STOPPING:
			IF Configuration.EnableDataCollection THEN
				IF (ModuleInterface.PiperState = MACH_ST_STOPPING) AND (previousPiperState <> MACH_ST_STOPPING) THEN
					gDataCollection.StatusStateChange.lot_id							:= '';
					gDataCollection.StatusStateChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
					gDataCollection.StatusStateChange.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
					VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusStateChange.timestamp);
					gDataCollection.StatusStateChange.seq								:= gDataCollection.StatusStateChange.timestamp;
					
					gDataCollection.StatusStateChange.tags[0].name						:= 'MachineState';
					gDataCollection.StatusStateChange.tags[0].value						:= 'STOPPING'; 
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
					
				END_IF

				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;

			ELSE
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			END_IF		
			
		MACH_ST_ABORTING:
			IF Configuration.EnableDataCollection THEN
				IF (ModuleInterface.PiperState = MACH_ST_ABORTING) AND (previousPiperState <> MACH_ST_ABORTING) THEN
					gDataCollection.StatusStateChange.lot_id							:= '';
					gDataCollection.StatusStateChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
					gDataCollection.StatusStateChange.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
					VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusStateChange.timestamp);
					gDataCollection.StatusStateChange.seq								:= gDataCollection.StatusStateChange.timestamp;
					
					gDataCollection.StatusStateChange.tags[0].name						:= 'MachineState';
					gDataCollection.StatusStateChange.tags[0].value						:= 'ABORTING'; 
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
					
				END_IF

				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;

			ELSE
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			END_IF	
			
		MACH_ST_ABORTED:
			IF Configuration.EnableDataCollection THEN
				IF (ModuleInterface.PiperState = MACH_ST_ABORTED) AND (previousPiperState <> MACH_ST_ABORTED) THEN
					gDataCollection.StatusStateChange.lot_id							:= '';
					gDataCollection.StatusStateChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
					gDataCollection.StatusStateChange.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
					VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusStateChange.timestamp);
					gDataCollection.StatusStateChange.seq								:= gDataCollection.StatusStateChange.timestamp;
					
					gDataCollection.StatusStateChange.tags[0].name					 	:= 'MachineState';
					gDataCollection.StatusStateChange.tags[0].value						:= 'ABORTED'; 
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
					
				END_IF

				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;

			ELSE
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			END_IF	
			
//		MACH_ST_HOLDING:
//		MACH_ST_HELD:
//		MACH_ST_UNHOLDING:
//		MACH_ST_SUSPENDING:
//		MACH_ST_UNSUSPENDING:
		MACH_ST_RESETTING:
			IF Configuration.EnableDataCollection THEN
				IF (ModuleInterface.PiperState = MACH_ST_RESETTING) AND (previousPiperState <> MACH_ST_RESETTING) THEN
					gDataCollection.StatusStateChange.lot_id							:= '';
					gDataCollection.StatusStateChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
					gDataCollection.StatusStateChange.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
					VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusStateChange.timestamp);
					gDataCollection.StatusStateChange.seq								:= gDataCollection.StatusStateChange.timestamp;
					
					gDataCollection.StatusStateChange.tags[0].name						:= 'MachineState';
					gDataCollection.StatusStateChange.tags[0].value						:= 'RESETTING'; 
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
					
				END_IF

				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;

			ELSE
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			END_IF
			
//		MACH_ST_COMPLETING:
		MACH_ST_COMPLETE:
			IF Configuration.EnableDataCollection THEN
				IF (ModuleInterface.PiperState = MACH_ST_COMPLETE) AND (previousPiperState <> MACH_ST_COMPLETE) THEN
					gDataCollection.StatusStateChange.lot_id							:= '';
					gDataCollection.StatusStateChange.lot_id							:= gPrintJobManagement.currentState.baseFilename;
					gDataCollection.StatusStateChange.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
					VF_COMMON_ISO8601_UtcTimeString(gDataCollection.StatusStateChange.timestamp);
					gDataCollection.StatusStateChange.seq								:= gDataCollection.StatusStateChange.timestamp;
					
					gDataCollection.StatusStateChange.tags[0].name						:= 'MachineState';
					gDataCollection.StatusStateChange.tags[0].value						:= 'COMPLETE'; 
					gDataCollection.StatusStateChange.tags[0].type						 := 'STRING';
					
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
					
				END_IF

				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;

			ELSE
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			END_IF
		
		MACH_ST_BYPASSED:
		
		ELSE
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
		
	END_CASE	
	
	previousPiperState := ModuleInterface.PiperState;
	
	//for turning commands to edges to work with piper
	(*
	//Turn level commands to edges
	EdgePosArray( ADR(piperCommands), ADR(_piperCommands), ADR(task.command), SIZEOF(task.command) );
	brsmemset( ADR(piperCommands), 0, SIZEOF(piperCommands) );
	*)
	
	
END_ACTION