
ACTION ValidateBuildFileSubsequence: 
	
	CASE task.status.sequence OF
		
		SEQUENCE_READ_BUILD_INFO:
			
			task.status.statusMessage := 'Checking build info contents'; 
			
			// NOTES:====================================================
			// base_filename must be 13 charaters long (e.g. VF-00001-0001)
			// build_layout and print_number must be > 0
			// num_layers must be > 0
			// layer_height must be within established range
			// PLATFORM_MEDIUM_400x600 is not currently supported
			// PrinterInfo.name must match the machineIdentity.machineName setting
		
			task.status.buildInfoInvalidReasons.invalidBuildName := (gBuildInformation.build_layout = 0) OR (gBuildInformation.print_number = 0) OR (brsstrlen(ADR(gBuildInformation.base_filename)) <> 13);
			task.status.buildInfoInvalidReasons.invalidNumLayers := (gBuildInformation.num_layers = 0);
			task.status.buildInfoInvalidReasons.invalidLayerHeight := (gBuildInformation.layer_height < MIN_LAYER_HEIGHT) OR (gBuildInformation.layer_height > MAX_LAYER_HEIGHT);
			task.status.buildInfoInvalidReasons.invalidPlatformID := (gBuildInformation.platform_id <> PLATFORM_SMALL_200x600) AND (gBuildInformation.platform_id <> PLATFORM_LARGE_600x600);
			task.status.buildInfoInvalidReasons.invalidMachineName := (brsstrcmp(ADR(gBuildInformation.BuildInstanceInfo.PrinterInfo.name), ADR(gConfiguration.machineIdentity.machineName)) <> 0);
			
			IF (ABS(gCNC.status.xOriginVFLCR - gBuildInformation.build_volume_limits.min.X) < 0.001) AND (ABS(gCNC.status.yOriginVFLCR - gBuildInformation.build_volume_limits.min.Y) < 0.001) THEN
				task.status.buildInfoInvalidReasons.invalidPlateOrigin := FALSE;
			ELSE
				
				task.status.buildInfoInvalidReasons.invalidPlateOrigin := NOT(gSimulation);
				
			END_IF
			
			
			task.status.buildInfoInvalidReasons.invalidPrintConfigInstruction := NOT(gPrintProcessConfig.MachineName = gConfiguration.machineIdentity.machineName) OR NOT(gPrintProcessConfig.FileFormatVersion = gPrintJobManagement.currentState.PCIFileFormatVersion);
		
			//because if nothing exists in nonvolatile then this will never work
			IF Nonvolatile.pixelMapFileVersion = 0 THEN
				Nonvolatile.pixelMapFileVersion := 1;
			END_IF
			
				
			//commented by paul. This ver can just always be set from the build info file.
			//task.status.buildInfoInvalidReasons.invalidPixelMapVersion := gBuildInformation.BuildInstanceInfo.PrinterInfo.vfpmap_version <> Nonvolatile.pixelMapFileVersion;
			
			task.status.buildInfoInvalidReasons.invalidPixelUsage := task.internal.checkPixelUsage.Error;
			
			
			IF (gCNC.status.gantry_max_pos_x <> gBuildInformation.BuildInstanceInfo.PrinterInfo.gantry_max_pos_x) THEN
				task.status.buildInfoInvalidReasons.invalidWorkspace := TRUE;
			ELSIF (gCNC.status.gantry_max_pos_y <> gBuildInformation.BuildInstanceInfo.PrinterInfo.gantry_max_pos_y) THEN
				task.status.buildInfoInvalidReasons.invalidWorkspace := TRUE;	
			ELSIF (gCNC.status.gantry_min_pos_x <> gBuildInformation.BuildInstanceInfo.PrinterInfo.gantry_min_pos_x) THEN
				task.status.buildInfoInvalidReasons.invalidWorkspace := TRUE;
			ELSIF (gCNC.status.gantry_min_pos_y <> gBuildInformation.BuildInstanceInfo.PrinterInfo.gantry_min_pos_y) THEN
				task.status.buildInfoInvalidReasons.invalidWorkspace := TRUE;
			ELSE
				task.status.buildInfoInvalidReasons.invalidWorkspace := FALSE;
			END_IF
			
		
			
			
			IF stateAnyTrue(gPrintJobManagement.status.buildInfoInvalid, FALSE) THEN
				task.status.buildInfoValid := FALSE;
				task.status.currentLayerGCodeFilename := '';
				//get reason
				task.status.buildInfoError := stateTrueStatus( gPrintJobManagement.status.buildInfoInvalid, ADR( task.status.buildInfoErrorStatus ), SIZEOF(task.status.buildInfoErrorStatus));
			
				//alarm with reason 
				vfAlarmEdgeSnippet( gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.BuildInfoFileError_AL0020, task.status.buildInfoErrorStatus[0]);
				
				task.status.sequence := SEQUENCE_ERROR;		
			ELSE
				task.status.buildInfoValid := TRUE;
				// If the BuildInfo file is different from the one that was previously running, reset to layer zero to start a new print.
				(*	IF (gBuildInformation.build_layout <> dCurrentState.buildLayout)
				OR (gBuildInformation.print_number <> dCurrentState.printNumber)				
				OR (gBuildInformation.layer_height <> dCurrentState.layerHeight) THEN
				
				task.command.resetLayerNumberToZero := TRUE;//todo				
				ELSE *)
			
				//populate print info
				dCurrentState.baseFilename := gBuildInformation.base_filename;
				dCurrentState.buildIteration := gBuildInformation.build_iter;
				dCurrentState.buildLayout := gBuildInformation.build_layout;
				dCurrentState.printNumber := gBuildInformation.print_number;
				dCurrentState.numberOfLayers := gBuildInformation.num_layers;
				dCurrentState.layerHeight := gBuildInformation.layer_height;
				dCurrentState.buildPlatform := PLATFORM_LARGE_600x600;//fixed value ignore BD
				dCurrentState.description := gBuildInformation.description;						
				dCurrentState.author := gBuildInformation.author;
				dCurrentState.printOwner := gBuildInformation.print_owner;
				dCurrentState.buildPlatformName := gBuildInformation.platform_name;
				dCurrentState.buildVolumeExtents := gBuildInformation.build_volume_limits;
				dCurrentState.pixelMapFileVersion := gBuildInformation.BuildInstanceInfo.PrinterInfo.vfpmap_version;
				dCurrentState.buildInstanceID := gBuildInformation.BuildInstanceInfo.base_unique_id;
				dCurrentState.encoderTickWidth := gBuildInformation.BuildInstanceInfo.PrinterInfo.encoder_tick_width;
				dCurrentState.maxLaserCount := gBuildInformation.BuildInstanceInfo.PrinterInfo.max_laser_count;
				dCurrentState.laserLineAngle := gBuildInformation.BuildInstanceInfo.PrinterInfo.laser_line_angle;
				dCurrentState.headCenterOffset := gBuildInformation.BuildInstanceInfo.PrinterInfo.head_center_offset;
				dCurrentState.laserSpacing := gBuildInformation.BuildInstanceInfo.PrinterInfo.laser_spacing;
				dCurrentState.minLaserWatts := gBuildInformation.BuildInstanceInfo.PrinterInfo.min_laser_watts;
				dCurrentState.maxLaserWatts := gBuildInformation.BuildInstanceInfo.PrinterInfo.max_laser_watts;
				
				// If no description is provided, use the build instance ID as the description (for display on top status bar).
				IF (dCurrentState.description = '') THEN
					dCurrentState.description := dCurrentState.buildInstanceID;
				END_IF
			
				dCurrentState.configEditorBranch := gBuildInformation.SoftwareInfo.Configuration_Editor.branch;
				dCurrentState.configEditorVersion := gBuildInformation.SoftwareInfo.Configuration_Editor.version;		
				dCurrentState.rasterEngineBranch := gBuildInformation.SoftwareInfo.Raster_Engine.branch;
				dCurrentState.rasterEngineVersion := gBuildInformation.SoftwareInfo.Raster_Engine.version;			
			
				// Save current job info in permanent memory.
				Nonvolatile.baseFilename := dCurrentState.baseFilename;
				Nonvolatile.buildIteration := dCurrentState.buildIteration;
				Nonvolatile.buildLayout := dCurrentState.buildLayout;
				Nonvolatile.printNumber	:= dCurrentState.printNumber;
				Nonvolatile.numberOfLayers := dCurrentState.numberOfLayers; 
				Nonvolatile.layerHeight := dCurrentState.layerHeight;			
				Nonvolatile.buildPlatform := dCurrentState.buildPlatform;
				Nonvolatile.description := dCurrentState.description;
				Nonvolatile.author := dCurrentState.author;
				Nonvolatile.printOwner := dCurrentState.printOwner;
				Nonvolatile.buildPlatformName := dCurrentState.buildPlatformName;
				Nonvolatile.buildVolumeExtents := dCurrentState.buildVolumeExtents;			
				Nonvolatile.pixelMapFileVersion := dCurrentState.pixelMapFileVersion;
				Nonvolatile.buildInstanceID := dCurrentState.buildInstanceID;
				Nonvolatile.configEditorBranch := dCurrentState.configEditorBranch;			
				Nonvolatile.configEditorVersion := dCurrentState.configEditorVersion;			
				Nonvolatile.rasterEngineBranch := dCurrentState.rasterEngineBranch;			
				Nonvolatile.rasterEngineVersion := dCurrentState.rasterEngineVersion;
				Nonvolatile.encoderTickWidth := dCurrentState.encoderTickWidth;
				Nonvolatile.maxLaserCount := dCurrentState.maxLaserCount;
				Nonvolatile.laserLineAngle := dCurrentState.laserLineAngle;
				Nonvolatile.headCenterOffset := dCurrentState.headCenterOffset;
				Nonvolatile.laserSpacing := dCurrentState.laserSpacing;
				Nonvolatile.minLaserWatts := dCurrentState.minLaserWatts;
				Nonvolatile.maxLaserWatts := dCurrentState.maxLaserWatts;
				
				task.status.sequence := SEQUENCE_DONE;
					
							
			END_IF
		
		
		SEQUENCE_DO_PIXEL_MAP:
				
			task.status.statusMessage := 'loading pixel map';
			task.internal.remapPixels.Command := gVFLCR.command.laserRackRemap;
			task.internal.remapPixels.Execute := TRUE;
			
			IF task.internal.remapPixels.Done THEN
				task.status.sequence := SEQUENCE_CHECK_PIXEL_USAGE;
				task.internal.remapPixels.Execute := FALSE;
			ELSIF task.internal.remapPixels.Error THEN
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF

		
		
		SEQUENCE_CHECK_PIXEL_USAGE:
			task.status.statusMessage := 'comparing used pixels to build info file';
			task.internal.checkPixelUsage.Execute := TRUE;	
			IF task.internal.checkPixelUsage.Done THEN
				task.status.sequence := SEQUENCE_DONE;	
			ELSIF task.internal.checkPixelUsage.Error THEN
				task.status.sequence := SEQUENCE_ERROR;
			END_IF
		
	END_CASE
	
	
END_ACTION


ACTION ResetPrintInfoSubsequence: 
	
	CASE task.status.sequence OF
		
		SEQUENCE_ASK_IF_OK_TO_RESET:
			
			IF messageHandler.msgId = 0 THEN
				messageHandler.msgId := MessageBox_AddMsg(ADR('Are you sure you want to reset print data and end this print?'), 
				ADR('End Print'), ADR(messageHandler.ok),
				ADR('Cancel'), ADR(messageHandler.cancel));
			END_IF
	
			IF messageHandler.ok THEN
				messageHandler.ok := FALSE;
				messageHandler.msgId := 0;
			
				IF gPrintJobManagement.currentState.currentLayerNumber > 20 THEN // Send if it is an actual print and not for Camera Cal/Pixel eval unloads 
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
					gDataCollection.EventHealthReport.tags[30].value				:= REAL_TO_STRING(Configuration.FOCAL_OFFSET_MM);
					gDataCollection.EventHealthReport.tags[30].type					:= 'FLOAT32';
					
					gDataCollection.EventHealthReport.tags[31].name					:= 'BladeOffsetUsedForPrint';
					gDataCollection.EventHealthReport.tags[31].value				:= REAL_TO_STRING(Configuration.BLADE_OFFSET_MM);
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
					IF gPrintJobManagement.currentState.buildReport.layersInContinousModeDuringPrint <> 0 THEN
						ascTIME((gPrintJobManagement.currentState.buildReport.totalLayerTimeInContinuousMode/gPrintJobManagement.currentState.buildReport.layersInContinousModeDuringPrint),ADR(gDataCollection.EventHealthReport.tags[47].value),25);
					END_IF
					gDataCollection.EventHealthReport.tags[47].type					:= 'STRING';
					
					gDataCollection.EventHealthReport.tags[48].name					:= 'AveragePowderPerLayerInContinuousMode_Kgs';
					IF gPrintJobManagement.currentState.buildReport.layersInContinousModeDuringPrint <> 0 THEN
						gDataCollection.EventHealthReport.tags[48].value				:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.totalPowderPerLayerInContMode/gPrintJobManagement.currentState.buildReport.layersInContinousModeDuringPrint);	
					END_IF
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
					IF gPrintJobManagement.currentState.buildReport.LayersInContModeSingleRecoat <> 0 THEN
						ascTIME((gPrintJobManagement.currentState.buildReport.totalLayerTimeAutoMode1Recoat/gPrintJobManagement.currentState.buildReport.LayersInContModeSingleRecoat),ADR(gDataCollection.EventHealthReport.tags[56].value),25);
					END_IF
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
										
						ELSE	
							vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'EventHealthReport' );	
						END_IF
					END_IF
			
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
					gDataCollection.EventHealthReport2.tags[8].value			:= REAL_TO_STRING(gPrintJobManagement.currentState.buildReport.avgElectrodeGainDuringPrint);
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
				
				task.status.sequence := SEQUENCE_ABORT_DISTRIBUTION;
			END_IF
	
			IF messageHandler.cancel THEN
				messageHandler.cancel := FALSE;
				messageHandler.msgId := 0;
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF
		
		SEQUENCE_ABORT_DISTRIBUTION:
			
			executeCommand(gBuildDistributorApi.commands.abortDistribution);
			task.status.sequence := SEQUENCE_CLEAR_DATA;
			
		SEQUENCE_CLEAR_DATA:
			
			task.status.currentLayerGCodeFilename := '';
			dCurrentState.currentPartHeight := 0.0;
			dCurrentState.currentLayerNumber := 0;	
			task.status.buildPlateThickness := Configuration.BUILD_PLATE_THICKNESS_MAX_MM;
			task.status.recoaterOffset := 0;
			
			gPrintJobManagement.currentState.domsThickness := MAX_DOMS_THICKNESS;
			gPrintJobManagement.currentState.domsHasBeenPrepared := FALSE;
			gPrintJobManagement.currentState.cameraCalDone := FALSE;
			
			dCurrentState.lastRecoatedLayerNumber := 0;
			dCurrentState.lastPrintedLayerNumber := 0;			
			dCurrentState.lastCompletedOperation := MACH_OP_NONE;
			dCurrentState.buildPlateHasBeenPrepared := FALSE;
			dCurrentState.buildPlateRecoaterOffsetFound := FALSE;
			dCurrentState.scratchCoatPassedVerification := FALSE;
			dCurrentState.longPauseRecoveryReq := FALSE;
			
			//clear out old data
			gPrintJobManagement.status.availabilityDuringPrint := 0;
			gPrintJobManagement.status.doubleRecoatRatio := 0;
			gPrintJobManagement.status.downTimeBetweenLastTwoLayers := 0;
			gPrintJobManagement.status.downTimeHours := 0;
			gPrintJobManagement.status.hoursBehindSchedule := 0;
			gPrintJobManagement.status.hoursElapsedInPrint := 0;
			gPrintJobManagement.status.updatedEstOfPrintEndTime := 0;
			gPrintJobManagement.status.trajectoriesPerLayer := 0;
			gPrintJobManagement.status.remainingHoursLow := 0;
			gPrintJobManagement.status.remainingHoursHigh := 0;
			gPrintJobManagement.status.intraLayerCleansPerLayer := 0;
			gPrintJobManagement.status.actualPrintDateTimeClean := 'NA';
			gPrintJobManagement.status.initialPrintDateTimeClean := 'NA';
			gPrintJobManagement.status.printStartDateTimeClean := 'NA';
			gPrintJobManagement.status.totalPowderReqToFinish := 0;
			
			command.Command := gMeteringHopperApi.command.resetBladeSetupAugerRotations;
			command.Execute := TRUE;
			
			dCurrentState.author := '';
			dCurrentState.baseFilename := '';
			dCurrentState.buildInstanceID := '';
			dCurrentState.numberOfLayers := 0;
			
			// Reset Report related data
			brsmemset( ADR(dCurrentState.buildReport), 0, SIZEOF(dCurrentState.buildReport) );
			dCurrentState.printActive := FALSE;
				
			// Reset values from vision system when starting a new print job.
			gOpcData_FromVisionPC.AcquiredLayer := 0;
			gOpcData_FromVisionPC.TriggerCount := 0;
			gOpcData_ToVisionPC.ImgSet := 0;
			gOpcData_ToVisionPC.CurrentRecoat := 0;

			//clear Mqtt data
			//EventNewToolpathLoaded ==========================
			gDataCollection.EventNewToolpathLoaded.lot_id							:= '';
			gDataCollection.EventNewToolpathLoaded.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventNewToolpathLoaded.layer							:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventNewToolpathLoaded.timestamp);
			gDataCollection.EventNewToolpathLoaded.seq								:= gDataCollection.EventNewToolpathLoaded.timestamp;
			
			gDataCollection.EventNewToolpathLoaded.tags[0].name						:= 'FileName';
			gDataCollection.EventNewToolpathLoaded.tags[0].value					:= '';
			gDataCollection.EventNewToolpathLoaded.tags[0].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[1].name						:= 'Author';
			gDataCollection.EventNewToolpathLoaded.tags[1].value					:= '_';
			gDataCollection.EventNewToolpathLoaded.tags[1].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[2].name						:= 'BuildInstanceID';
			gDataCollection.EventNewToolpathLoaded.tags[2].value					:= '_';
			gDataCollection.EventNewToolpathLoaded.tags[2].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[3].name						:= 'BuildLayout';
			gDataCollection.EventNewToolpathLoaded.tags[3].value					:= UDINT_TO_STRING(0);
			gDataCollection.EventNewToolpathLoaded.tags[3].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventNewToolpathLoaded.tags[4].name						:= 'BuildPlatformName';
			gDataCollection.EventNewToolpathLoaded.tags[4].value					:= '_';
			gDataCollection.EventNewToolpathLoaded.tags[4].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[5].name						:= 'ConfigEditorVersion';
			gDataCollection.EventNewToolpathLoaded.tags[5].value					:= '_';
			gDataCollection.EventNewToolpathLoaded.tags[5].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[6].name						:= 'CurrentLayerNumber';
			gDataCollection.EventNewToolpathLoaded.tags[6].value					:= UINT_TO_STRING(0);
			gDataCollection.EventNewToolpathLoaded.tags[6].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventNewToolpathLoaded.tags[7].name						:= 'Description';
			gDataCollection.EventNewToolpathLoaded.tags[7].value					:= '_';
			gDataCollection.EventNewToolpathLoaded.tags[7].type						:= 'STRING';
			gDataCollection.EventNewToolpathLoaded.tags[8].name						:= 'NumberOfLayers';
			gDataCollection.EventNewToolpathLoaded.tags[8].value					:= UINT_TO_STRING(0);
			gDataCollection.EventNewToolpathLoaded.tags[8].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventNewToolpathLoaded.tags[9].name						:= 'PrintNumber';
			gDataCollection.EventNewToolpathLoaded.tags[9].value					:= UINT_TO_STRING(0);
			gDataCollection.EventNewToolpathLoaded.tags[9].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventNewToolpathLoaded.tags[10].name					:= 'PrintOwner';
			gDataCollection.EventNewToolpathLoaded.tags[10].value					:= '_';
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
			
			//EventLayerStarted ==========================
			gDataCollection.EventLayerStarted.lot_id							:= '';
			gDataCollection.EventLayerStarted.lot_id							:= gPrintJobManagement.currentState.baseFilename;
			gDataCollection.EventLayerStarted.layer								:= gPrintJobManagement.currentState.currentLayerNumber;
			VF_COMMON_ISO8601_UtcTimeString(gDataCollection.EventLayerStarted.timestamp);
			gDataCollection.EventLayerStarted.seq								:= gDataCollection.EventLayerStarted.timestamp;

			gDataCollection.EventLayerStarted.tags[0].name						:= 'CurrentLayerNumber';
			gDataCollection.EventLayerStarted.tags[0].value						:= UINT_TO_STRING(0); 
			gDataCollection.EventLayerStarted.tags[0].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[1].name						:= 'NumberOfLayers';
			gDataCollection.EventLayerStarted.tags[1].value						:= UINT_TO_STRING(0); 
			gDataCollection.EventLayerStarted.tags[1].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[2].name						:= 'RemainingLayers';
			gDataCollection.EventLayerStarted.tags[2].value						:= UINT_TO_STRING(0); 
			gDataCollection.EventLayerStarted.tags[2].type						:= 'INT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[3].name						:= 'RemainingHoursLow';
			gDataCollection.EventLayerStarted.tags[3].value						:= REAL_TO_STRING(0); 
			gDataCollection.EventLayerStarted.tags[3].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			gDataCollection.EventLayerStarted.tags[4].name						:= 'RemainingHoursHigh';
			gDataCollection.EventLayerStarted.tags[4].value						:= REAL_TO_STRING(0); 
			gDataCollection.EventLayerStarted.tags[4].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			
			gDataCollection.EventLayerStarted.tags[5].name						:= 'LongestPauseString';
			gDataCollection.EventLayerStarted.tags[5].value						:= ''; 
			gDataCollection.EventLayerStarted.tags[5].type						:= 'STRING'; // MLDS team handles it as a INT

			gDataCollection.EventLayerStarted.tags[6].name						:= 'TotalPrintTimeHours';
			gDataCollection.EventLayerStarted.tags[6].value						:= REAL_TO_STRING(0); 
			gDataCollection.EventLayerStarted.tags[6].type						:= 'FLOAT32'; // MLDS team handles it as a INT

			gDataCollection.EventLayerStarted.tags[7].name						:= 'PrintUptimePercentRunning';
			gDataCollection.EventLayerStarted.tags[7].value						:= REAL_TO_STRING(0); 
			gDataCollection.EventLayerStarted.tags[7].type						:= 'FLOAT32'; // MLDS team handles it as a INT

			gDataCollection.EventLayerStarted.tags[8].name						:= 'HoursBehindSchedule';
			gDataCollection.EventLayerStarted.tags[8].value						:= REAL_TO_STRING(0);  
			gDataCollection.EventLayerStarted.tags[8].type						:= 'FLOAT32'; // MLDS team handles it as a INT

			gDataCollection.EventLayerStarted.tags[9].name						:= 'ProjectedFinishTime';
			gDataCollection.EventLayerStarted.tags[9].value						:= 'N/A'; 
			gDataCollection.EventLayerStarted.tags[9].type						:= 'FLOAT32'; // MLDS team handles it as a INT

			gDataCollection.EventLayerStarted.tags[10].name						:= 'RecoatsPerLayer';
			gDataCollection.EventLayerStarted.tags[10].value					:= REAL_TO_STRING(0); 
			gDataCollection.EventLayerStarted.tags[10].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			
			gDataCollection.EventLayerStarted.tags[11].name						:= 'TotalPowderRemaining';
			gDataCollection.EventLayerStarted.tags[11].value					:= REAL_TO_STRING(gPowderApi.status.overheadHopperWeight + gPowderApi.status.floorHopperWeight + gMeteringHopperApi.status.powderWeightScaled); 
			gDataCollection.EventLayerStarted.tags[11].type						:= 'FLOAT32'; // MLDS team handles it as a INT

			gDataCollection.EventLayerStarted.tags[12].name						:= 'TotalPowderUsed';
			gDataCollection.EventLayerStarted.tags[12].value					:= REAL_TO_STRING(0); 
			gDataCollection.EventLayerStarted.tags[12].type						:= 'FLOAT32'; // MLDS team handles it as a INT
			
	
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
					
			task.status.sequence := SEQUENCE_DONE;
	END_CASE
	
	END_ACTION



	