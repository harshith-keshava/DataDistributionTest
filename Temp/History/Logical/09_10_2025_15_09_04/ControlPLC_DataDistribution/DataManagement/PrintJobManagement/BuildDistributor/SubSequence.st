
// Start connection to build distributor and distribute the starting files
ACTION StartDistributionSubSequence: 
	
	CASE task.status.sequence OF
		
		SEQUENCE_EXECUTE_START_DIST:
			
			task.status.sequence := SEQUENCE_REQUEST_BUILD_INFO;
	
			
		SEQUENCE_REQUEST_BUILD_INFO: 
			
			task.status.statusMessage := 'ask for build info file';
						
			//gPrint Job management files
			gOpcData_ToBuildPC.RequestAbortDistribution := FALSE;
			gOpcData_ToBuildPC.RequestPauseDistribution := FALSE;
			gOpcData_ToBuildPC.RequestStartDistribution := FALSE;
			gOpcData_ToBuildPC.PrintingActive := FALSE;			
			gOpcData_ToBuildPC.RequestBuildInfo := TRUE;
			
			//load the last file you had saved, if its 0 get layer 1
			gOpcData_ToBuildPC.CurrentPrintLayer := gPrintJobManagement.currentState.currentLayerNumber;
			IF (gOpcData_ToBuildPC.CurrentPrintLayer = 0) THEN
				gOpcData_ToBuildPC.CurrentPrintLayer := 1;
			END_IF
			
			task.status.sequence := SEQUENCE_BUILD_INFO_READY;
					
		SEQUENCE_BUILD_INFO_READY:
			
			IF (gOpcData_FromBuildPC.BuildInfoReady) THEN
				gOpcData_ToBuildPC.RequestBuildInfo := FALSE;
				task.status.sequence := SEQUENCE_LOAD_PCI_FILE;
			END_IF
						
		SEQUENCE_LOAD_PCI_FILE:
			
			task.status.statusMessage := 'Loading PCI File and Verifying';
			
			task.internal.atnPLCOpenCommand.Command := gSystemRecipeApi.commands.loadPrintProcessConfigFile;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommand.Done THEN 
				task.status.sequence := SEQUENCE_LOAD_BUILD_FILE;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
				
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				task.status.sequence := SEQUENCE_ERROR;
			END_IF
				
		SEQUENCE_LOAD_BUILD_FILE: 
			task.status.statusMessage := 'load build info file';
			task.internal.atnPLCOpenCommand.Command := gSystemRecipeApi.commands.loadBuildInfo;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommand.Done THEN
				task.status.sequence := SEQUENCE_CHK_BUILD_INFO_VALID;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF
			
		
		SEQUENCE_CHK_BUILD_INFO_VALID:
			task.status.statusMessage := 'validating build info contents';
			task.internal.atnPLCOpenCommand.Command := gPrintJobManagement.commands.validatePrintFile;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommand.Done THEN
				task.status.sequence := SEQUENCE_DELETE_LASER_FILES;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
				gPrintProcessConfigLoaded := TRUE; // Set flag after validating PCI with BuildInfo File
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF
		
		SEQUENCE_DELETE_LASER_FILES: 
			task.status.statusMessage := 'delete laser files';
			task.internal.atnPLCOpenCommand.Command := gVFLCR.command.deleteLaserControlFiles;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommand.Done THEN
				task.status.sequence := SEQUENCE_START_DISTRIBUTION;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF	
			
		SEQUENCE_START_DISTRIBUTION:
			task.status.statusMessage := 'distribute laser files';
					
			gOpcData_ToBuildPC.RequestStartDistribution := TRUE;
			task.status.sequence := SEQUENCE_VERIFY_DISTRIBUTION;	
		
		SEQUENCE_VERIFY_DISTRIBUTION:
			
			task.status.statusMessage := 'verifying distribution';
			
			IF (gOpcData_FromBuildPC.CurrentDistributionLayer = gOpcData_ToBuildPC.CurrentPrintLayer) THEN
						
				task.internal.lastDistributedLayerNumber := UDINT_TO_UINT(gOpcData_ToBuildPC.CurrentPrintLayer);
				gPrintJobManagement.currentState.lastDistributedLayer := task.internal.lastDistributedLayerNumber;
				
				task.status.sequence := SEQUENCE_SET_CURRENT_LAYER;
				
			END_IF
			
			task.internal.distributorTimeout.PT := T#30s;
			task.internal.distributorTimeout.IN := TRUE;
			
			IF task.internal.distributorTimeout.Q THEN
				task.status.sequence := SEQUENCE_ERROR;
			END_IF
			
		SEQUENCE_SET_CURRENT_LAYER:
			
			//this is redundant, but that command also will re-set the CNC file name 
			task.status.statusMessage := 'update current layer';
			
			//NOT NEEDED!
			task.internal.atnPLCOpenCommandParameters.Command := gPrintJobManagement.commands.updateLayerNumber;
			task.internal.atnPLCOpenCommandParameters.pParameters := ADR(task.internal.lastDistributedLayerNumber);
			task.internal.atnPLCOpenCommandParameters.sParameters := SIZEOF(task.internal.lastDistributedLayerNumber);
			task.internal.atnPLCOpenCommandParameters.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommandParameters.Done THEN
				task.status.sequence := SEQUENCE_CALCULATE_PRINT_TIME;
				task.internal.atnPLCOpenCommandParameters.Execute := FALSE;
				
			ELSIF task.internal.atnPLCOpenCommandParameters.Error THEN
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF
			
		SEQUENCE_CALCULATE_PRINT_TIME:
			
			task.internal.atnPLCOpenCommandParameters.Command := gPrintJobManagement.commands.calculateRemainingPrintTime;
			task.internal.atnPLCOpenCommandParameters.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommandParameters.Done THEN
				task.status.sequence := SEQUENCE_DISTRIBUTION_STARTED;
				task.internal.atnPLCOpenCommandParameters.Execute := FALSE;
				
			ELSIF task.internal.atnPLCOpenCommandParameters.Error THEN
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF
			
		SEQUENCE_DISTRIBUTION_STARTED:
			task.status.sequence := SEQUENCE_REMAP_PIXELS;
			gPrintJobManagement.currentState.newBuildInfoFileLoaded := TRUE;//TODO this should be set outside?
			
		SEQUENCE_REMAP_PIXELS:
			
			//TODO - check if we actually need to do this every time. It takes like 15 seconds
			task.status.statusMessage := 'Remapping pixel on distribution start';
				
			task.internal.atnPLCOpenCommand.Command := gVFLCR.command.laserRackRemap;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
				
			IF task.internal.atnPLCOpenCommand.Done THEN
				task.status.sequence := SEQUENCE_ENABLE_LASER_AUTO;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				task.status.sequence := SEQUENCE_ERROR;
			END_IF
			
			
		SEQUENCE_ENABLE_LASER_AUTO:
			
			//TODO - check if we actually need to do this every time. It takes like 15 seconds
			task.status.statusMessage := 'Enable laser auto mode';
				
			task.internal.atnPLCOpenCommand.Command := gVFLCR.command.enableAutoMode;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
				
			IF task.internal.atnPLCOpenCommand.Done THEN
				task.status.sequence := SEQUENCE_PUBLISH_LOAD_DATA;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				task.status.sequence := SEQUENCE_ERROR;
			END_IF
			
		SEQUENCE_PUBLISH_LOAD_DATA:
			
			
			task.status.statusMessage := 'Publishing Data';
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
			
			IF gPrintJobManagement.currentState.currentLayerNumber = 1 THEN
				
				//EventLayerStarted ==========================
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
				gDataCollection.EventLayerStarted.tags[5].type						:= 'STRING'; // MLDS team handles it as a INT


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
				
			END_IF 
			
			task.status.sequence := SEQUENCE_DONE;
	END_CASE
	
END_ACTION




// Distribute Layer Files to VFLCR and adjust number
ACTION DistributeLayerFileSubSequence:
	
	CASE task.status.sequence OF
	
		SEQUENCE_EXECUTE_GET_LAYER_FILES:
			task.status.sequence := SEQUENCE_CHK_BUILD_INFO;
				
		SEQUENCE_CHK_BUILD_INFO: 
			task.status.statusMessage := 'validating build info';
			task.internal.atnPLCOpenCommand.Command := gPrintJobManagement.commands.validatePrintFile;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
							
			IF task.internal.atnPLCOpenCommand.Done THEN
				task.status.sequence := SEQUENCE_SET_DESIRED_LAYER;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				
				task.status.lastErrorMessage := 'SEQUENCE_CHK_BUILD_INFO';
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF
		
		SEQUENCE_SET_DESIRED_LAYER:
			
			task.internal.distRetryAttempted := 0;
			
			task.status.statusMessage := 'set layer for distribution';
			gOpcData_ToBuildPC.CurrentPrintLayer := task.parameters.layerNumberToDistribute;
			
			//delay for parameter to go through 
			task.internal.fbTON_DistributionDelay.PT := T#0.25s;
			task.internal.fbTON_DistributionDelay.IN := TRUE;
			IF task.internal.fbTON_DistributionDelay.Q THEN 
				task.status.sequence := SEQUENCE_REQUEST_DISTRIBUTION;
			END_IF
								
		SEQUENCE_REQUEST_DISTRIBUTION:
			
			task.status.statusMessage := 'request distribution';
			gOpcData_ToBuildPC.PrintingActive := TRUE;			
			gOpcData_ToBuildPC.RequestStartDistribution := TRUE;
			task.status.sequence := SEQUENCE_WAIT_FOR_FEEDBACK;
		
		SEQUENCE_WAIT_FOR_FEEDBACK: 
			
			IF (gOpcData_FromBuildPC.CurrentDistributionLayer = gOpcData_ToBuildPC.CurrentPrintLayer) THEN
				task.status.sequence := SEQUENCE_SET_CURRENT_LAYER;
			END_IF
			
			task.internal.distributorTimeout.IN := TRUE;
			task.internal.distributorTimeout.PT := T#20s;
			
			IF task.internal.distributorTimeout.Q  THEN
				
				IF task.internal.distRetryAttempted THEN 
					task.status.sequence := SEQUENCE_ERROR;	
				ELSE
					task.status.sequence := SEQUENCE_RETRY_DISTRIBUTION;
				END_IF
			
			END_IF
			
		SEQUENCE_RETRY_DISTRIBUTION:
			
			gOpcData_ToBuildPC.CurrentPrintLayer := 0;
			
			task.internal.distributionRecoveryTimer.IN := TRUE;
			task.internal.distributionRecoveryTimer.PT := T#5s;
			
			IF task.internal.distributionRecoveryTimer.Q THEN
				task.internal.distRetryAttempted := TRUE;
				gOpcData_ToBuildPC.CurrentPrintLayer := task.parameters.layerNumberToDistribute;	
				task.status.sequence := SEQUENCE_REQUEST_DISTRIBUTION;
			END_IF
			
		SEQUENCE_SET_CURRENT_LAYER:
			
			task.status.statusMessage := 'update current layer';
			
			task.internal.lastDistributedLayerNumber := UDINT_TO_UINT(gOpcData_ToBuildPC.CurrentPrintLayer);
			gPrintJobManagement.currentState.lastDistributedLayer := task.internal.lastDistributedLayerNumber;
			
			task.internal.atnPLCOpenCommandParameters.Command := gPrintJobManagement.commands.updateLayerNumber;
			task.internal.atnPLCOpenCommandParameters.pParameters := ADR(task.internal.lastDistributedLayerNumber);
			task.internal.atnPLCOpenCommandParameters.sParameters := SIZEOF(task.internal.lastDistributedLayerNumber);
			task.internal.atnPLCOpenCommandParameters.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommandParameters.Done THEN
				task.status.sequence := SEQUENCE_DONE;
				task.internal.atnPLCOpenCommandParameters.Execute := FALSE;
				
			ELSIF task.internal.atnPLCOpenCommandParameters.Error THEN
				task.status.lastErrorMessage := 'SEQUENCE_SET_CURRENT_LAYER';
				
				IF NOT(task.internal.retryAttempted) THEN
					task.status.sequence := SEQUENCE_RETRY_AFTER_ERROR;	
					task.status.lastErrorState := SEQUENCE_SET_CURRENT_LAYER;
				ELSE
					task.status.sequence := SEQUENCE_ERROR;
					task.internal.retryAttempted := FALSE;
				END_IF
			END_IF
		
		
		SEQUENCE_RETRY_AFTER_ERROR:
		
			task.internal.retryAttempted := TRUE;
			
			task.internal.waitToRetry.PT := T#5s;
			task.internal.waitToRetry.IN := TRUE;
			
			IF task.internal.waitToRetry.Q THEN
				task.status.sequence := task.status.lastErrorState;
			END_IF
		
	END_CASE
		
END_ACTION


// Abort distribution process started earlier (must be done before starting another)
ACTION AbortDistributionSubSequence: 
	
	CASE task.status.sequence OF
		
		SEQUENCE_EXECUTE_ABORT_DIST:
			
			task.status.sequence := SEQUENCE_CHECK_DIST_READY_ABORT;
		
		SEQUENCE_CHECK_DIST_READY_ABORT: 
			task.status.statusMessage := 'check distributor connected';
			//move this outside maybe and cyclically check for connection status and throw alarm if not connected
			IF task.status.buildDistributorConnected THEN
				task.status.sequence := SEQUENCE_REQUEST_ABORT_DIST;	
			ELSE
				task.status.sequence := SEQUENCE_ERROR;		
			END_IF		
					
					
		SEQUENCE_REQUEST_ABORT_DIST: 
			
			task.status.statusMessage := 'aborting distribution';
			
			//gPrint Job management files
			gOpcData_ToBuildPC.RequestAbortDistribution := TRUE;
			gOpcData_ToBuildPC.RequestPauseDistribution := FALSE;
			gOpcData_ToBuildPC.RequestStartDistribution := FALSE;
			gOpcData_ToBuildPC.PrintingActive := FALSE;			
			gOpcData_ToBuildPC.RequestBuildInfo := FALSE;
					
			task.status.sequence := SEQUENCE_WAIT_DIST_ABORTED;
					
		SEQUENCE_WAIT_DIST_ABORTED:
			
			task.status.statusMessage := 'distribution aborted';
			
			IF (gOpcData_FromBuildPC.DistributionAborted) THEN
				gOpcData_ToBuildPC.RequestAbortDistribution := FALSE;
				task.status.sequence := SEQUENCE_PUBLISH_ABORT_DATA;
			END_IF
			
		SEQUENCE_PUBLISH_ABORT_DATA:
		
			task.status.statusMessage := 'Publishing Data';
			//EventDistributionAborted ==========================
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
		
			task.status.sequence := SEQUENCE_DONE;
		
	END_CASE
	
	
END_ACTION

