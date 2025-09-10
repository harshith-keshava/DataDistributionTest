
ACTION DataCollectionSignals: 
		
	task.internal.periodicDataCycle1Timer.IN := TRUE;
	task.internal.periodicDataCycle1Timer.PT := T#10s ;
	
	IF task.internal.periodicDataCycle1Timer.Q THEN 
		IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'PeriodicDataCycle1';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;	
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/DATA/PeriodicDataCycle1');
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
				 
			ELSE	
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'PeriodicDataCycle1');
			END_IF
		END_IF
		task.internal.periodicDataCycle1Timer.IN := FALSE;
	END_IF
	
	//NOTE: SCAN CYCLE DEPENDENT SIGNALS ARE UPDATED WHERE THE CAPTURE IS TRIGGERED *********************************************
	
	// Periodic Data Cycle 1 (10secs) ==========================
	gDataCollection.PeriodicDataCycle1.lot_id							:= '';
	gDataCollection.PeriodicDataCycle1.lot_id							:= gPrintJobManagement.currentState.baseFilename;
	gDataCollection.PeriodicDataCycle1.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
	VF_COMMON_ISO8601_UtcTimeString(gDataCollection.PeriodicDataCycle1.timestamp);
	gDataCollection.PeriodicDataCycle1.seq								:= gDataCollection.PeriodicDataCycle1.timestamp;
	
	gDataCollection.PeriodicDataCycle1.tags[0].name						:= 'OpticBoxTemperatureSensor1';
	//gDataCollection.PeriodicDataCycle1.tags[0].value					:= ; // Set elsewhere
	gDataCollection.PeriodicDataCycle1.tags[0].type						:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[1].name						:= 'OpticBoxTemperatureSensor2';
	//gDataCollection.PeriodicDataCycle1.tags[1].value					:= ; // Set elsewhere
	gDataCollection.PeriodicDataCycle1.tags[1].type						:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[2].name						:= 'OpticBoxTemperatureSensor3';
	//gDataCollection.PeriodicDataCycle1.tags[2].value					:= ; // Set elsewhere
	gDataCollection.PeriodicDataCycle1.tags[2].type						:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[3].name						:= 'OpticBoxTemperatureSensor4';
	//gDataCollection.PeriodicDataCycle1.tags[3].value					:= ; // Set elsewhere
	gDataCollection.PeriodicDataCycle1.tags[3].type						:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[4].name						:= 'OpticBoxTemperatureSensor5';
	//gDataCollection.PeriodicDataCycle1.tags[4].value					:= ; // Set elsewhere
	gDataCollection.PeriodicDataCycle1.tags[4].type						:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[5].name						:= 'OpticBoxTemperatureSensor6';
	//gDataCollection.PeriodicDataCycle1.tags[5].value					:= ; // Set elsewhere
	gDataCollection.PeriodicDataCycle1.tags[5].type						:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[6].name						:= 'OpticBoxTemperatureSensor7';
	//gDataCollection.PeriodicDataCycle1.tags[6].value					:= ; // Set elsewhere
	gDataCollection.PeriodicDataCycle1.tags[6].type						:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[7].name						:= 'OpticBoxTemperatureSensor8';
	//gDataCollection.PeriodicDataCycle1.tags[7].value					:= ; // Set elsewhere
	gDataCollection.PeriodicDataCycle1.tags[7].type						:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[8].name						:= 'PrintZoneAmbientTemperature';
	gDataCollection.PeriodicDataCycle1.tags[8].value					:= '0.0'; // Needs to be updated 
	gDataCollection.PeriodicDataCycle1.tags[8].type						:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[9].name						:= 'OpticBoxTemperature';
	gDataCollection.PeriodicDataCycle1.tags[9].value					:= REAL_TO_STRING(gCoolingApi.dataCollection.OpticsBoxTemperature);
	gDataCollection.PeriodicDataCycle1.tags[9].type						:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[10].name					:= 'OpticBoxFlowRate';
	gDataCollection.PeriodicDataCycle1.tags[10].value					:= REAL_TO_STRING(gCoolingApi.dataCollection.OpticsBoxFlowRate);
	gDataCollection.PeriodicDataCycle1.tags[10].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[11].name					:= 'ChillerWaterOutputTemperature';
	gDataCollection.PeriodicDataCycle1.tags[11].value					:= REAL_TO_STRING(gCoolingApi.dataCollection.ChillerWaterOutputTemperature);
	gDataCollection.PeriodicDataCycle1.tags[11].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[12].name					:= 'ChillerWaterReturnTemperature';
	gDataCollection.PeriodicDataCycle1.tags[12].value					:= REAL_TO_STRING(gCoolingApi.dataCollection.ChillerWaterReturnTemperature);
	gDataCollection.PeriodicDataCycle1.tags[12].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[13].name					:= 'ZLiftPosition';
	gDataCollection.PeriodicDataCycle1.tags[13].value					:= REAL_TO_STRING(LREAL_TO_REAL(gMotorBasic[AXIS_LIFT_Z].OUT.Position));
	gDataCollection.PeriodicDataCycle1.tags[13].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[14].name					:= 'LeftGHFlowRate';
	gDataCollection.PeriodicDataCycle1.tags[14].value					:= REAL_TO_STRING(gPumpsApi.dataCollection.LeftGHFlowRate);
	gDataCollection.PeriodicDataCycle1.tags[14].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[15].name					:= 'RightGHFlowRate';
	gDataCollection.PeriodicDataCycle1.tags[15].value					:= REAL_TO_STRING(gPumpsApi.dataCollection.RightGHFlowRate);
	gDataCollection.PeriodicDataCycle1.tags[15].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[16].name					:= 'SV500BlowersFrequency';
	gDataCollection.PeriodicDataCycle1.tags[16].value					:= REAL_TO_STRING(gPumpsApi.dataCollection.SV500BlowersFrequency);
	gDataCollection.PeriodicDataCycle1.tags[16].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[17].name					:= 'LeftGHFlowProportionalValve';
	gDataCollection.PeriodicDataCycle1.tags[17].value					:= REAL_TO_STRING(gPumpsApi.dataCollection.LeftGHFlowProportionalValve);
	gDataCollection.PeriodicDataCycle1.tags[17].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[18].name					:= 'RightGHFlowProportionalValve';
	gDataCollection.PeriodicDataCycle1.tags[18].value					:= REAL_TO_STRING(gPumpsApi.dataCollection.RightGHFlowProportionalValve);
	gDataCollection.PeriodicDataCycle1.tags[18].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[19].name					:= 'DewPoint';
	gDataCollection.PeriodicDataCycle1.tags[19].value					:= REAL_TO_STRING(gGasApi.dataCollection.DewPoint);
	gDataCollection.PeriodicDataCycle1.tags[19].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[20].name					:= 'PrintZoneO2ppm';
	gDataCollection.PeriodicDataCycle1.tags[20].value					:= REAL_TO_STRING(gGasApi.dataCollection.PrintZoneO2ppm);
	gDataCollection.PeriodicDataCycle1.tags[20].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[21].name					:= 'CDAUsageLPM';
	gDataCollection.PeriodicDataCycle1.tags[21].value					:= REAL_TO_STRING(gGasApi.dataCollection.CDALPM);
	gDataCollection.PeriodicDataCycle1.tags[21].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[22].name					:= 'ArgonUsageLPM';
	gDataCollection.PeriodicDataCycle1.tags[22].value					:= REAL_TO_STRING(gGasApi.dataCollection.ArgonLPM);
	gDataCollection.PeriodicDataCycle1.tags[22].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[23].name					:= 'PrintZonePressure';
	gDataCollection.PeriodicDataCycle1.tags[23].value					:= REAL_TO_STRING(gGasApi.dataCollection.PrintZonePressure);
	gDataCollection.PeriodicDataCycle1.tags[23].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[24].name					:= 'TotalArgonConsumption';
	gDataCollection.PeriodicDataCycle1.tags[24].value					:= REAL_TO_STRING(gGasApi.dataCollection.ArgonTotalFlow);
	gDataCollection.PeriodicDataCycle1.tags[24].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[25].name					:= 'FactoryArgonTemperature';
	gDataCollection.PeriodicDataCycle1.tags[25].value					:= REAL_TO_STRING(gGasApi.dataCollection.ArgonTemperature);
	gDataCollection.PeriodicDataCycle1.tags[25].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[26].name					:= 'FactoryArgonPressure';
	gDataCollection.PeriodicDataCycle1.tags[26].value					:= REAL_TO_STRING(gGasApi.dataCollection.ArgonPressure);
	gDataCollection.PeriodicDataCycle1.tags[26].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[27].name					:= 'TotalCDAConsumption';
	gDataCollection.PeriodicDataCycle1.tags[27].value					:= REAL_TO_STRING(gGasApi.dataCollection.CDATotalFlow);
	gDataCollection.PeriodicDataCycle1.tags[27].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[28].name					:= 'FactoryCDATemperaure';
	gDataCollection.PeriodicDataCycle1.tags[28].value					:= REAL_TO_STRING(gGasApi.dataCollection.CDATemperature);
	gDataCollection.PeriodicDataCycle1.tags[28].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[29].name					:= 'FactoryCDAPressure';
	gDataCollection.PeriodicDataCycle1.tags[29].value					:= REAL_TO_STRING(gGasApi.dataCollection.CDAPressure);
	gDataCollection.PeriodicDataCycle1.tags[29].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[30].name					:= 'PrintZoneExhaustPressure';
	gDataCollection.PeriodicDataCycle1.tags[30].value					:= REAL_TO_STRING(gGasApi.dataCollection.ExhaustPressure);
	gDataCollection.PeriodicDataCycle1.tags[30].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[31].name					:= 'PurgeModeStatusMessage';
	gDataCollection.PeriodicDataCycle1.tags[31].value					:= gGasApi.dataCollection.PurgeModeStatusMessage;
	gDataCollection.PeriodicDataCycle1.tags[31].type					:= 'STRING';
	gDataCollection.PeriodicDataCycle1.tags[32].name					:= 'ExhaustPropValvePercentOpen';
	gDataCollection.PeriodicDataCycle1.tags[32].value					:= REAL_TO_STRING(gGasApi.dataCollection.ExhaustPropValvePercentOpen);
	gDataCollection.PeriodicDataCycle1.tags[32].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[33].name					:= 'ReclaimBinLevel';
	gDataCollection.PeriodicDataCycle1.tags[33].value					:= REAL_TO_STRING(gPowderApi.dataCollection.ReclaimBinLevel);
	gDataCollection.PeriodicDataCycle1.tags[33].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[34].name					:= 'HerdingWasteFilllevel';
	gDataCollection.PeriodicDataCycle1.tags[34].value					:= REAL_TO_STRING(gFilterApi.dataCollection.WasteBinFillLevel);
	gDataCollection.PeriodicDataCycle1.tags[34].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[35].name					:= 'HerdingPostFilterPressure';
	gDataCollection.PeriodicDataCycle1.tags[35].value					:= REAL_TO_STRING(gPumpsApi.dataCollection.PostFilterPressure);
	gDataCollection.PeriodicDataCycle1.tags[35].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[36].name					:= 'R1MotorActualTemperature';
	gDataCollection.PeriodicDataCycle1.tags[36].value					:= REAL_TO_STRING(gRecoater.status.x1ActualTemp);
	gDataCollection.PeriodicDataCycle1.tags[36].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[37].name					:= 'R2MotorActualTemperature';
	gDataCollection.PeriodicDataCycle1.tags[37].value					:= REAL_TO_STRING(gRecoater.status.x2ActualTemp);
	gDataCollection.PeriodicDataCycle1.tags[37].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[38].name					:= 'YMotorActualTemperature';
	gDataCollection.PeriodicDataCycle1.tags[38].value					:= REAL_TO_STRING(gCNC.status.yActualTemp);
	gDataCollection.PeriodicDataCycle1.tags[38].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[39].name					:= 'X1MotorActualTemperature';
	gDataCollection.PeriodicDataCycle1.tags[39].value					:= REAL_TO_STRING(gCNC.status.x1ActualTemp);
	gDataCollection.PeriodicDataCycle1.tags[39].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[40].name					:= 'X2MotorActualTemperature';
	gDataCollection.PeriodicDataCycle1.tags[40].value					:= REAL_TO_STRING(gCNC.status.x2ActualTemp);
	gDataCollection.PeriodicDataCycle1.tags[40].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[41].name					:= 'GasReturnO2ppm';
	gDataCollection.PeriodicDataCycle1.tags[41].value					:= REAL_TO_STRING(gGasApi.dataCollection.GasReturnO2ppm);
	gDataCollection.PeriodicDataCycle1.tags[41].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[42].name					:= 'VentO2ppm';
	gDataCollection.PeriodicDataCycle1.tags[42].value					:= REAL_TO_STRING(gGasApi.dataCollection.VentO2ppm);
	gDataCollection.PeriodicDataCycle1.tags[42].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[43].name					:= 'MeteringHopperLoadCell';
	gDataCollection.PeriodicDataCycle1.tags[43].value					:= REAL_TO_STRING(gMeteringHopperApi.dataCollection.MeteringHopperLoadCell);
	gDataCollection.PeriodicDataCycle1.tags[43].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[44].name					:= 'OverheadHopperLoadCell';
	gDataCollection.PeriodicDataCycle1.tags[44].value					:= REAL_TO_STRING(gPowderApi.dataCollection.OverheadHopperLoadCell);
	gDataCollection.PeriodicDataCycle1.tags[44].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[45].name					:= 'FloorHopperLoadCell';
	gDataCollection.PeriodicDataCycle1.tags[45].value					:= REAL_TO_STRING(gPowderApi.dataCollection.FloorHopperLoadCell);
	gDataCollection.PeriodicDataCycle1.tags[45].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[46].name					:= 'TrajectoriesSinceEchainMaintenance';
	gDataCollection.PeriodicDataCycle1.tags[46].value					:= 	UDINT_TO_STRING(gPrintJobManagement.currentState.totalTrajectory - gPrintJobManagement.currentState.buildReport.echainMaintenanceTrajectory + gPrintJobManagement.currentState.buildReport.echainMaintTrajectoryOnReset);
	gDataCollection.PeriodicDataCycle1.tags[46].type					:= 'INT32';
	gDataCollection.PeriodicDataCycle1.tags[47].name					:= 'PrintZoneO2Percentage';
	gDataCollection.PeriodicDataCycle1.tags[47].value					:= 	REAL_TO_STRING(gGasApi.dataCollection.PrintZoneO2Percentage);
	gDataCollection.PeriodicDataCycle1.tags[47].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[48].name					:= 'PrintZoneSafetyBoxO2Percentage';
	gDataCollection.PeriodicDataCycle1.tags[48].value					:= 	REAL_TO_STRING(gGasApi.dataCollection.PrintZoneSafetyBoxO2Percentage);
	gDataCollection.PeriodicDataCycle1.tags[48].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[49].name					:= 'TransportPodO2Percentage';
	gDataCollection.PeriodicDataCycle1.tags[49].value					:= 	REAL_TO_STRING(gGasApi.dataCollection.TransportPodO2Percentage);
	gDataCollection.PeriodicDataCycle1.tags[49].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[50].name					:= 'LoadZoneO2Percentage';
	gDataCollection.PeriodicDataCycle1.tags[50].value					:= 	REAL_TO_STRING(gGasApi.dataCollection.LoadZoneO2Percentage);
	gDataCollection.PeriodicDataCycle1.tags[50].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[51].name					:= 'USRRAMUsage';
	gDataCollection.PeriodicDataCycle1.tags[51].value					:= 	REAL_TO_STRING(gMemPercentFull_USRRAM);
	gDataCollection.PeriodicDataCycle1.tags[51].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[52].name					:= 'LastGreasedTrajectoryNumber';
	gDataCollection.PeriodicDataCycle1.tags[52].value					:= UDINT_TO_STRING(gPrintJobManagement.currentState.buildReport.lastGreasedTrajectory);
	gDataCollection.PeriodicDataCycle1.tags[52].type					:= 'INT64';					
	gDataCollection.PeriodicDataCycle1.tags[53].name					:= 'LastGreaseMaintenanceDate';
	gDataCollection.PeriodicDataCycle1.tags[53].value					:= gDataCollection.EventHealthReport.tags[11].value; 
	gDataCollection.PeriodicDataCycle1.tags[53].type					:= 'STRING';			
	gDataCollection.PeriodicDataCycle1.tags[54].name					:= 'TrajectoriesSinceGreaseMaintenance';
	gDataCollection.PeriodicDataCycle1.tags[54].value					:= UDINT_TO_STRING(gPrintJobManagement.currentState.totalTrajectory - gPrintJobManagement.currentState.buildReport.lastGreasedTrajectory + gPrintJobManagement.currentState.buildReport.greaseMaintTrajectoryOnReset);
	gDataCollection.PeriodicDataCycle1.tags[54].type					:= 'INT64';
	gDataCollection.PeriodicDataCycle1.tags[55].name					:= 'PeriodicPowderParticleCounter';
	gDataCollection.PeriodicDataCycle1.tags[55].value					:= 	REAL_TO_STRING(gPowderApi.dataCollection.PowderParticleCounter);
	gDataCollection.PeriodicDataCycle1.tags[55].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[56].name					:= 'X1MotorActualTorque';
	gDataCollection.PeriodicDataCycle1.tags[56].value					:= REAL_TO_STRING(gCNC.status.x1Torque);
	gDataCollection.PeriodicDataCycle1.tags[56].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[57].name					:= 'X2MotorActualTorque';
	gDataCollection.PeriodicDataCycle1.tags[57].value					:= REAL_TO_STRING(gCNC.status.x2Torque);
	gDataCollection.PeriodicDataCycle1.tags[57].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[58].name					:= 'YMotorActualTorque';
	gDataCollection.PeriodicDataCycle1.tags[58].value					:= REAL_TO_STRING(gCNC.status.yTorque);
	gDataCollection.PeriodicDataCycle1.tags[58].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[59].name					:= 'R1MotorActualTorque';
	gDataCollection.PeriodicDataCycle1.tags[59].value					:= REAL_TO_STRING(gRecoater.status.x1Torque);
	gDataCollection.PeriodicDataCycle1.tags[59].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[60].name					:= 'R2MotorActualTorque';
	gDataCollection.PeriodicDataCycle1.tags[60].value					:= REAL_TO_STRING(gRecoater.status.x2Torque);
	gDataCollection.PeriodicDataCycle1.tags[60].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[61].name					:= 'MHMotorActualCurrent';
	gDataCollection.PeriodicDataCycle1.tags[61].value					:= REAL_TO_STRING(gMeteringHopperApi.status.current);
	gDataCollection.PeriodicDataCycle1.tags[61].type					:= 'FLOAT32';
	gDataCollection.PeriodicDataCycle1.tags[62].name					:= 'MHMotorActuallTorque';
	gDataCollection.PeriodicDataCycle1.tags[62].value					:= REAL_TO_STRING(gMeteringHopperApi.status.torque);
	gDataCollection.PeriodicDataCycle1.tags[62].type					:= 'FLOAT32';
	
END_ACTION

