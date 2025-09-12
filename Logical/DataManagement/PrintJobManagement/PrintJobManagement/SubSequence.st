
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
		
			//task.status.buildInfoInvalidReasons.invalidBuildName := (gBuildInformation.build_layout = 0) OR (gBuildInformation.print_number = 0) OR (brsstrlen(ADR(gBuildInformation.base_filename)) <> 13);
			//task.status.buildInfoInvalidReasons.invalidNumLayers := (gBuildInformation.num_layers = 0);
			//task.status.buildInfoInvalidReasons.invalidLayerHeight := (gBuildInformation.layer_height < MIN_LAYER_HEIGHT) OR (gBuildInformation.layer_height > MAX_LAYER_HEIGHT);
			//task.status.buildInfoInvalidReasons.invalidPlatformID := (gBuildInformation.platform_id <> PLATFORM_SMALL_200x600) AND (gBuildInformation.platform_id <> PLATFORM_LARGE_600x600);
			//task.status.buildInfoInvalidReasons.invalidMachineName := (brsstrcmp(ADR(gBuildInformation.BuildInstanceInfo.PrinterInfo.name), ADR(gConfiguration.machineIdentity.machineName)) <> 0);
			
			
			//task.status.buildInfoInvalidReasons.invalidPrintConfigInstruction := NOT(gPrintProcessConfig.MachineName = gConfiguration.machineIdentity.machineName) OR NOT(gPrintProcessConfig.FileFormatVersion = gPrintJobManagement.currentState.PCIFileFormatVersion);
		
			//because if nothing exists in nonvolatile then this will never work
			IF Nonvolatile.pixelMapFileVersion = 0 THEN
				Nonvolatile.pixelMapFileVersion := 1;
			END_IF
			
			task.status.buildInfoValid := TRUE;
			gPrintJobManagement.currentState.buildInfoCheckValid := task.status.buildInfoValid;
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
				//dCurrentState.buildPlatform := PLATFORM_LARGE_600x600;//fixed value ignore BD
				dCurrentState.description := gBuildInformation.description;						
				dCurrentState.author := gBuildInformation.author;
				dCurrentState.printOwner := gBuildInformation.print_owner;
				
				
			task.status.sequence := SEQUENCE_DONE;
		
	END_CASE
	
	
END_ACTION


ACTION ResetPrintInfoSubsequence: 
	
	CASE task.status.sequence OF
		
		
		SEQUENCE_ABORT_DISTRIBUTION:
			
			executeCommand(gBuildDistributorApi.commands.abortDistribution);
			task.status.sequence := SEQUENCE_CLEAR_DATA;
			
		SEQUENCE_CLEAR_DATA:
			
					
			task.status.sequence := SEQUENCE_DONE;
	END_CASE
	
	END_ACTION



	