
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
			
			IF stateAnyTrue(gPrintJobManagement.status.buildInfoInvalid, FALSE) THEN
				task.status.buildInfoValid := FALSE;
				task.status.currentLayerGCodeFilename := '';
				//get reason
				task.status.buildInfoError := stateTrueStatus( gPrintJobManagement.status.buildInfoInvalid, ADR( task.status.buildInfoErrorStatus ), SIZEOF(task.status.buildInfoErrorStatus));
			
				//alarm with reason 
				//vfAlarmEdgeSnippet( gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.BuildInfoFileError_AL0020, task.status.buildInfoErrorStatus[0]);
				
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
				//dCurrentState.buildIteration := gBuildInformation.build_iter;
				dCurrentState.buildLayout := gBuildInformation.build_layout;
				dCurrentState.printNumber := gBuildInformation.print_number;
				dCurrentState.numberOfLayers := gBuildInformation.num_layers;
				//dCurrentState.layerHeight := gBuildInformation.layer_height;
				//dCurrentState.buildPlatform := PLATFORM_LARGE_600x600;//fixed value ignore BD
				dCurrentState.description := gBuildInformation.description;						
				dCurrentState.author := gBuildInformation.author;
				dCurrentState.printOwner := gBuildInformation.print_owner;
				//dCurrentState.buildPlatformName := gBuildInformation.platform_name;
				//dCurrentState.buildVolumeExtents := gBuildInformation.build_volume_limits;
				//dCurrentState.pixelMapFileVersion := gBuildInformation.BuildInstanceInfo.PrinterInfo.vfpmap_version;
				dCurrentState.buildInstanceID := gBuildInformation.BuildInstanceInfo.base_unique_id;
				//dCurrentState.encoderTickWidth := gBuildInformation.BuildInstanceInfo.PrinterInfo.encoder_tick_width;
				//dCurrentState.maxLaserCount := gBuildInformation.BuildInstanceInfo.PrinterInfo.max_laser_count;
			//dCurrentState.laserLineAngle := gBuildInformation.BuildInstanceInfo.PrinterInfo.laser_line_angle;
				//dCurrentState.headCenterOffset := gBuildInformation.BuildInstanceInfo.PrinterInfo.head_center_offset;
				//dCurrentState.laserSpacing := gBuildInformation.BuildInstanceInfo.PrinterInfo.laser_spacing;
				//dCurrentState.minLaserWatts := gBuildInformation.BuildInstanceInfo.PrinterInfo.min_laser_watts;
				//dCurrentState.maxLaserWatts := gBuildInformation.BuildInstanceInfo.PrinterInfo.max_laser_watts;
				
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
				//Nonvolatile.buildIteration := dCurrentState.buildIteration;
				Nonvolatile.buildLayout := dCurrentState.buildLayout;
				Nonvolatile.printNumber	:= dCurrentState.printNumber;
				Nonvolatile.numberOfLayers := dCurrentState.numberOfLayers; 
				//Nonvolatile.layerHeight := dCurrentState.layerHeight;			
				//Nonvolatile.buildPlatform := dCurrentState.buildPlatform;
				Nonvolatile.description := dCurrentState.description;
				Nonvolatile.author := dCurrentState.author;
				Nonvolatile.printOwner := dCurrentState.printOwner;
				//Nonvolatile.buildPlatformName := dCurrentState.buildPlatformName;
				//Nonvolatile.buildVolumeExtents := dCurrentState.buildVolumeExtents;			
				//Nonvolatile.pixelMapFileVersion := dCurrentState.pixelMapFileVersion;
				//Nonvolatile.buildInstanceID := dCurrentState.buildInstanceID;
				//Nonvolatile.configEditorBranch := dCurrentState.configEditorBranch;			
			//	Nonvolatile.configEditorVersion := dCurrentState.configEditorVersion;			
				//Nonvolatile.rasterEngineBranch := dCurrentState.rasterEngineBranch;			
			//	Nonvolatile.rasterEngineVersion := dCurrentState.rasterEngineVersion;
			//	Nonvolatile.encoderTickWidth := dCurrentState.encoderTickWidth;
			//	Nonvolatile.maxLaserCount := dCurrentState.maxLaserCount;
			//	Nonvolatile.laserLineAngle := dCurrentState.laserLineAngle;
			//	Nonvolatile.headCenterOffset := dCurrentState.headCenterOffset;
			//	Nonvolatile.laserSpacing := dCurrentState.laserSpacing;
			//	Nonvolatile.minLaserWatts := dCurrentState.minLaserWatts;
			//	Nonvolatile.maxLaserWatts := dCurrentState.maxLaserWatts;
				
				task.status.sequence := SEQUENCE_DONE;
					
							
			END_IF
			
	END_CASE
	
END_ACTION


ACTION ResetPrintInfoSubsequence: 
	
	CASE task.status.sequence OF
		

		SEQUENCE_ABORT_DISTRIBUTION:
			
			executeCommand(gBuildDistributorApi.commands.abortDistribution);
			task.status.sequence := SEQUENCE_CLEAR_DATA;
			
		SEQUENCE_CLEAR_DATA:

			dCurrentState.lastRecoatedLayerNumber := 0;
			dCurrentState.lastPrintedLayerNumber := 0;	
			dCurrentState.author := '';
			dCurrentState.baseFilename := '';
			dCurrentState.buildInstanceID := '';
			dCurrentState.numberOfLayers := 0;	
			task.status.sequence := SEQUENCE_DONE;
		END_CASE
	
	END_ACTION
			
