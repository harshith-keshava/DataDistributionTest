
PROGRAM _INIT          
		
	Name := 'Print Job Management';
	
	// Restore current print job management information from permanent memory.
	gPrintJobManagement.currentState := Nonvolatile;

	//load pixel map and verify
	task.internal.checkPixelUsage.Command := gVFLCR.command.checkActivePixels;
	
	subscribePLCOpenWithParameters( gPrintJobManagement.commands.updateLayerNumber, Name, ADR(task.parameters.printJobLayer), SIZEOF(task.parameters.printJobLayer), task.command.updateCurrentLayer, task.internal.PLCOpen);
	
	subscribePLCOpen( gPrintJobManagement.commands.validatePrintFile, Name, task.command.validatePrintFile, task.internal.PLCOpen);
	subscribePLCOpen( gPrintJobManagement.commands.calculateRemainingPrintTime, Name, task.command.calculateRemainingPrintTime, task.internal.PLCOpen);
	
	
	subscribePLCOpen( gPrintJobManagement.commands.enableLOP, Name, task.command.enableLOP, task.internal.PLCOpen);
	subscribePLCOpen( gPrintJobManagement.commands.disableLOP, Name, task.command.disableLOP, task.internal.PLCOpen);
	
	subscribePLCOpen( gPrintJobManagement.commands.getAllLocalConfigData, Name, task.command.publishConfigurationData, task.internal.PLCOpenConfigData);
	
	subscribePLCOpen( gSystemRecipeApi.events.buildInfoLoaded, Name, task.command.validatePrintFile, task.internal.PLCOpen);
	subscribePLCOpen( gPrintJobManagement.commands.resetPrintInfo, Name, task.command.resetPrintInfo, task.internal.PLCOpen);
	subscribePLCOpen( gPrintJobManagement.commands.resetPlateType, Name, task.command.resetPlateType, task.internal.PLCOpen);
	
	
	subscribePLCOpen(gPrintJobManagement.commands.clearThicknessDOMS, Name, task.command.clearThicknessDOMS, task.internal.PLCOpen);
	subscribePLCOpenWithParameters( gPrintJobManagement.commands.setThicknessDOMS, Name, ADR(task.internal.parameters), SIZEOF(task.internal.parameters), task.command.setThicknessDOMS, task.internal.PLCOpen);
	
	subscribePLCOpenWithParameters( gPrintJobManagement.commands.setBuildPlateThickness, Name, ADR(task.internal.parameters), SIZEOF(task.internal.parameters), task.command.setBuildPlateThickness, task.internal.PLCOpen);	
	subscribePLCOpenWithParameters( gPrintJobManagement.commands.setRecoaterOffset, Name, ADR(task.internal.parameters), SIZEOF(task.internal.parameters), task.command.setRecoaterOffset, task.internal.PLCOpen);
	subscribePLCOpenWithParameters( gPrintJobManagement.commands.setFocalOffset, Name, ADR(task.internal.parameters), SIZEOF(task.internal.parameters), task.command.setFocalOffset, task.internal.PLCOpen);
	
	registerStateBool( gPrintJobManagement.status.buildInfoValid, 'Build Info Loaded', task.status.buildInfoValid);		
	
	//REASONS FOR INVALID BUILD FILE
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Build Name Invalid', task.status.buildInfoInvalidReasons.invalidBuildName);	
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Num Layers Invalid', task.status.buildInfoInvalidReasons.invalidNumLayers);
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Layer Height Invalid', task.status.buildInfoInvalidReasons.invalidLayerHeight);
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Platform ID Invalid', task.status.buildInfoInvalidReasons.invalidPlatformID);
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Machine Name Invalid', task.status.buildInfoInvalidReasons.invalidMachineName);
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Pixel Map Ver. Invalid', task.status.buildInfoInvalidReasons.invalidPixelMapVersion);
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Pixel Usage Invalid', task.status.buildInfoInvalidReasons.invalidPixelUsage);	

	//	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Workspace Boundaries Invalid', task.status.buildInfoInvalidReasons.invalidWorkspace);	 //TODO ADD BACK WHEN BUILD INFO FILE HAS THIS
	
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'PCI File Invalid', task.status.buildInfoInvalidReasons.invalidPrintConfigInstruction);
			
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'VFLCR Plate Origin Invalid', task.status.buildInfoInvalidReasons.invalidPlateOrigin);
	//REASONS FOR BEING ALLOWED TO PRINT
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Build Info Not Valid', task.status.inhibitPrintReasons.buildInfoNotValid);		
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Chiller Not Ready', task.status.inhibitPrintReasons.chillerNotReady);	
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Lasers Not Ready', task.status.inhibitPrintReasons.lasersNotReady);	
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Layer Number Not OK', task.status.inhibitPrintReasons.layerNumberNotOK);	
	//registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Lift Not At Current Layer', task.status.inhibitPrintReasons.liftNotAtCurrentLayer);	
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Oxygen Levels not below print PPM', task.status.inhibitPrintReasons.oxygenLevelsNotOK);	
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Pneumatic Supply Not OK', task.status.inhibitPrintReasons.pnuematicSupplyNotOK);	
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Pumps Not Running at Set Freq', task.status.inhibitPrintReasons.pumpsNotRunningAtSetFreq);	
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Pumps Not Running at Set Flow', task.status.inhibitPrintReasons.pumpsNotRunningAtSetFlow);	
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Recoater Not At Park', task.status.inhibitPrintReasons.recoaterNotAtPark);	
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Build Plate Thickness Not Valid', task.status.buildPlateThicknessInvalid);	
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'LOP Mode Active', task.status.inhibitRecoatReasons.LopModeActive);
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Recoater Offset Not Valid', task.status.recoaterOffsetInvalid);	
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Build plate has not been prepared/leveled', task.status.inhibitPrintReasons.buildPlateNotPrepared);
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Blade offset has not been found for this plate', task.status.inhibitPrintReasons.bladeOffsetNotFound);
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Build Distribution not ok', task.status.inhibitPrintReasons.distributionNotOk);
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Long Pause Recovery Required', task.status.inhibitPrintReasons.longPauseRecoveryReq);	

	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Default LUT is Loaded', gVFLCR.status.defaultLUT);
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'LUTs dont match Rack to Rack', gVFLCR.status.mismatchedLUTs);
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'The LUT version is invalid. (Version 0)', gVFLCR.status.versionZeroLUT);
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'Scratch Coat Has Not Passed Verification Step', task.status.inhibitPrintReasons.scratchCoatNotVerified);
	
	registerStateBool( gPrintJobManagement.status.inhibitPrint, 'DOMS Volume loaded', gPrintJobManagement.currentState.domsPlateTypeLoaded );
	
	
	//REASONS FOR BEING ALLOWED TO LOP
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'Build Info Not Valid', task.status.inhibitPrintReasons.buildInfoNotValid);	
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'Chiller Not Ready', task.status.inhibitPrintReasons.chillerNotReady);	
	registerStateBool( gPrintJobManagement.status.inhibitLOP,  'Lasers Not Ready', task.status.inhibitPrintReasons.lasersNotReady);		
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'Pneumatic Supply Not OK', task.status.inhibitPrintReasons.pnuematicSupplyNotOK);		
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'Recoater Not At Park', task.status.inhibitPrintReasons.recoaterNotAtPark);	
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'Build Plate Thickness Not Valid', task.status.buildPlateThicknessInvalid);	
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'O2 PPM not below safe level to lase', task.status.inhibitPrintReasons.oxygenLevelsNotSafeToLase);	
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'Build plate has not been prepared/leveled', task.status.inhibitPrintReasons.buildPlateNotPrepared);
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'Build Distribution not ok', task.status.inhibitPrintReasons.distributionNotOk);
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'Default LUT is Loaded', gVFLCR.status.defaultLUT);
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'LUTs dont match Rack to Rack', gVFLCR.status.mismatchedLUTs);
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'The LUT version is invalid. (Version 0)', gVFLCR.status.versionZeroLUT);
	
	registerStateBool( gPrintJobManagement.status.inhibitLOP, 'DOMS Volume loaded', gPrintJobManagement.currentState.domsPlateTypeLoaded );
	
	//REASONS FOR BEING ALLOWED TO DryRun
	registerStateBool( gPrintJobManagement.status.inhibitDryRun, 'Build Info Not Valid', task.status.inhibitPrintReasons.buildInfoNotValid);	
	registerStateBool( gPrintJobManagement.status.inhibitDryRun, 'Chiller Not Ready', task.status.inhibitPrintReasons.chillerNotReady);	
	registerStateBool( gPrintJobManagement.status.inhibitDryRun,  'Lasers Not Ready', task.status.inhibitPrintReasons.lasersNotReadyDryRun);		
	registerStateBool( gPrintJobManagement.status.inhibitDryRun, 'Pneumatic Supply Not OK', task.status.inhibitPrintReasons.pnuematicSupplyNotOK);		
	registerStateBool( gPrintJobManagement.status.inhibitDryRun, 'Recoater Not At Park', task.status.inhibitPrintReasons.recoaterNotAtPark);	
	registerStateBool( gPrintJobManagement.status.inhibitDryRun, 'Build Plate Thickness Not Valid', task.status.buildPlateThicknessInvalid);	
	registerStateBool( gPrintJobManagement.status.inhibitDryRun, 'O2 PPM not below safe level to lase', task.status.inhibitPrintReasons.oxygenLevelsNotSafeToLase);	
	registerStateBool( gPrintJobManagement.status.inhibitDryRun, 'Build plate has not been prepared/leveled', task.status.inhibitPrintReasons.buildPlateNotPrepared);
	registerStateBool( gPrintJobManagement.status.inhibitDryRun, 'Build Distribution not ok', task.status.inhibitPrintReasons.distributionNotOk);
	
	//REASONS FOR BEING ALLOWED TO SCAVENGE
	(*
	registerStateBool( gPrintJobManagement.status.inhibitScavenge, 'Axes Powered and Homed', task.status.inhibitRecoatReasons.axesNotOK);	
	registerStateBool( gPrintJobManagement.status.inhibitScavenge, 'Chiller Not Ready', task.status.inhibitRecoatReasons.chillerNotReady);	
	registerStateBool( gPrintJobManagement.status.inhibitScavenge, 'Gantry X Not in Safe Area', task.status.inhibitRecoatReasons.gantryXNotInSafeArea);	
	registerStateBool( gPrintJobManagement.status.inhibitScavenge, 'Lift Not At Current Layer', task.status.inhibitPrintReasons.liftNotAtCurrentLayer);	
	registerStateBool( gPrintJobManagement.status.inhibitScavenge, 'Oxygen Levels Not Below 2%', task.status.inhibitRecoatReasons.oxygenLevelsNotOK);	
	*)
	
	//REASONS FOR BEING ALLOWED TO RECOAT
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Axes Not Powered/Homed', task.status.inhibitRecoatReasons.axesNotOK);	
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Chiller Not Ready', task.status.inhibitRecoatReasons.chillerNotReady);	
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Gantry X Not in Safe Area', task.status.inhibitRecoatReasons.gantryXNotInSafeArea);	
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Layer Number Not OK', task.status.inhibitRecoatReasons.layerNumberNotOK);	
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Oxygen Levels Not Below 2%', task.status.inhibitRecoatReasons.oxygenLevelsNotOK);	
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Pneumatic Supply Not OK', task.status.inhibitRecoatReasons.pnuematicSupplyNotOK);		
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Vision Not Connected', task.status.inhibitRecoatReasons.visionNotOK);	
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Metering Hopper Not Ready', task.status.inhibitRecoatReasons.meteringHopperNotOK);
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Build Plate Not Present', task.status.inhibitRecoatReasons.buildPlateNotPresent);
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'LOP Mode Active', task.status.inhibitRecoatReasons.LopModeActive);
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Pumps Not Running', task.status.inhibitRecoatReasons.pumpsNotRunning);
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Build plate has not been prepared/leveled', task.status.inhibitPrintReasons.buildPlateNotPrepared);
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Blade offset has not been found for this plate', task.status.inhibitPrintReasons.bladeOffsetNotFound);
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Recoater Load Cell is Maxed. Possible Failure', gMeteringHopperApi.status.possibleLoadCellFailure);
	registerStateBool( gPrintJobManagement.status.inhibitRecoat, 'Long Pause Recovery Required', task.status.inhibitRecoatReasons.longPauseRecoveryReq);
	
	
	//REASONS FOR BEING ALLOWED TO SCRAPE
	registerStateBool( gPrintJobManagement.status.inhibitScrape, 'Chiller Not Ready', task.status.inhibitRecoatReasons.chillerNotReady);	
	registerStateBool( gPrintJobManagement.status.inhibitScrape, 'Gantry X Not in Safe Area', task.status.inhibitRecoatReasons.gantryXNotInSafeArea);	
	registerStateBool( gPrintJobManagement.status.inhibitScrape, 'Layer Number Not OK', task.status.inhibitRecoatReasons.layerNumberNotOK);	
	registerStateBool( gPrintJobManagement.status.inhibitScrape, 'Build Plate Not Present', task.status.inhibitRecoatReasons.buildPlateNotPresent);
	registerStateBool( gPrintJobManagement.status.inhibitScrape, 'LOP Mode Active', task.status.inhibitRecoatReasons.LopModeActive);
	
	// machine mode requirements
	registerStateBool( gMachineModeApi.watchdog.productionModeOkay, 'build volume loaded', gPrintJobManagement.currentState.lastOpLoadComplete );
	
	
	// REASONS FOR BEING ALLOWED TO REFILL
	registerStateBool( gPrintJobManagement.status.inhibitMHopperRefill, 'Oxygen Levels Not Below 2%', task.status.inhibitMHopperRefillReasons.oxygenLevelsNotOK);
	registerStateBool( gPrintJobManagement.status.inhibitMHopperRefill, 'Overhead Hopper refill active', task.status.inhibitMHopperRefillReasons.overheadHopperRefillActive);
	

	//SIM helper for bootup to set some non vol
	IF gSimulation THEN
		gConfiguration.machineIdentity.factoryName := 'VulcanOne';
		gConfiguration.machineIdentity.factoryNumber := FACTORY_VULCAN_ONE;
		gConfiguration.machineIdentity.machineGeneration := MACHINE_GENERATION_GEN3;
		//	gConfiguration.machineIdentity.machineName := 'DP13';
		gConfiguration.machineIdentity.machineType := MACHINE_TYPE_PRINTER;
		//	gConfiguration.machineIdentity.machineNumber := 13;
		
		gPrintJobManagement.currentState.buildPlateHasBeenPrepared := TRUE;
		gPrintJobManagement.currentState.buildPlateRecoaterOffsetFound := TRUE;
		gPrintJobManagement.currentState.lastOpLoadComplete := TRUE;
		gPrintJobManagement.currentState.lastOpUnloadComplete := TRUE;
		gPrintJobManagement.currentState.cleanerEngagedToScoops := FALSE;
		
		gPrintJobManagement.currentState.pixelMapFileVersion := 1;
		gPrintJobManagement.currentState.lopModeActive := FALSE;
		gPrintJobManagement.currentState.lastPrintedLayerNumber := 0;
		gPrintJobManagement.currentState.lastRecoatedLayerNumber := 0;
		gPrintJobManagement.currentState.currentLayerNumber := 0;
		gPrintJobManagement.currentState.buildPlateThickness := 75;
		
		gPrintJobManagement.parameters.disableScratchCoat := TRUE;
		
	END_IF
	
	// get retained val
	task.status.buildPlateThickness := gPrintJobManagement.currentState.buildPlateThickness;
	task.status.recoaterOffset := gPrintJobManagement.currentState.recoaterOffset;
	task.status.focalOffset := gPrintJobManagement.currentState.focalOffset;
	
	task.parameters.recoaterOffset_mm := gPrintJobManagement.currentState.recoaterOffset;
	
	IF gPrintJobManagement.currentState.opticsBoxType = 0 THEN
		gPrintJobManagement.currentState.opticsBoxType := 3; //Default OB3
	END_IF
	
	gPrintJobManagement.currentState.vflcrsHaveBeenReferenced := FALSE;//always on boot up 
	
	IF gPrintJobManagement.currentState.PCIFileFormatVersion = 0 THEN
		gPrintJobManagement.currentState.PCIFileFormatVersion := 1;
	END_IF
	
	
	//init strings
	gPrintJobManagement.status.layerStatusString := 'N/A';	
	gPrintJobManagement.status.printStartDateTimeClean := 'N/A';
	gPrintJobManagement.status.initialPrintDateTimeClean := 'N/A';
	gPrintJobManagement.status.actualPrintDateTimeClean := 'N/A';
	
	
	subscribePLCOpen( gMFunction[MFUNC_COOLING_DELAY].command, Name, task.command.coolingDelay, task.internal.PLCOpen );

END_PROGRAM   


PROGRAM _CYCLIC
	 
	
	//MAX THICKNESS IS 130mm 
	//THIS CORRESPONDS TO LIFT HEIGHT OF -76 WHICH IS THE STARTING HEIGHT WHEN IDENTIFYING PLATE THICKNESS
	//WE ALLOW 14 SCANS OF 5MM INCREMENTS WHEN SEARCHING FOR THE PLATE (130- (14*5) = 60mm MIN THICKNESS)
	//LIFTS WILL SEARCH AND DO SCANS UP UNTIL -6MM. THIS GIVES LIFTS 6mm BUFFER FROM HARDSTOP
	//THESE VARIABLES EXIST INSIDE PrintJobManagement, BuldPlateSFC, AND Lift TASKS. CHANGING ONE REQUIRES CHANGING ALL!	
	Configuration.BLADE_OFFSET_MAX_MM := 3.5;
	Configuration.FOCAL_OFFSET_MIN_MM := 1.0;
	Configuration.FOCAL_OFFSET_MAX_MM := 2.5; //( range is 1.0 to 2.5)
	Configuration.FOCAL_OFFSET_MM := gPrintJobManagement.currentState.focalOffset;//so it gets captured by audit log
	Configuration.BLADE_OFFSET_MM := gPrintJobManagement.currentState.recoaterOffset;//so it gets captured by audit log
	Configuration.OPTICS_BOX_REVISION := gPrintJobManagement.currentState.opticsBoxType;
	Configuration.BUILD_PLATE_THICKNESS_MAX_MM := 130;
	Configuration.ENCODER_TICK_WIDTH := gPrintJobManagement.currentState.encoderTickWidth;
	Configuration.MAX_LASER_COUNT := gPrintJobManagement.currentState.maxLaserCount;
	Configuration.LASER_LINE_ANGLE:= gPrintJobManagement.currentState.laserLineAngle;
	Configuration.HEAD_CENTER_OFFSET := gPrintJobManagement.currentState.headCenterOffset;
	Configuration.LASER_SPACING := gPrintJobManagement.currentState.laserSpacing;
	Configuration.MIN_LASER_WATTS := gPrintJobManagement.currentState.minLaserWatts;
	Configuration.MAX_LASER_WATTS := gPrintJobManagement.currentState.maxLaserWatts;
	
	gMinimumFocalLimit := Configuration.FOCAL_OFFSET_MIN_MM;
	gMaximumFocalLimit := Configuration.FOCAL_OFFSET_MAX_MM;
	gLdsFocalOffset := task.status.focalOffset;
	
	
	//Copy current state to non-volatile memory.
	Nonvolatile := gPrintJobManagement.currentState;
	dCurrentState ACCESS ADR(gPrintJobManagement.currentState);
					
	task.status.ready := TRUE;
	
	IF gSimulation THEN
		SimulateIO;
	END_IF
	/////////////////////////////////////////////////////////////////////////////////////////////////
	//COMMANDS
	//validate build info file
	//check if ready for printing
	//increment layer number
	
	//Cyclically this task also manages the part height and parameters related to the build info file
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	IF task.status.ready THEN
		
		IF task.internal.localLockout THEN

		ELSIF task.command.validatePrintFile THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Validating Build Info File';
			task.status.state := STATE_VALIDATING_BUILD_INFO;
			
		ELSIF task.command.updateCurrentLayer THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Updating Layer Number';
			task.status.state := STATE_UPDATE_LAYER_NUMBER;
			
		ELSIF task.command.checkReadyForPrinting THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Checking if Ready to Print';
			task.status.state := STATE_CHECKING_PRINT_READY;
			
		ELSIF task.command.setBuildPlateThickness THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Setting build plate thickness';
			task.status.state := STATE_SET_BUILD_PLATE_THICKNESS;
			
		ELSIF task.command.setRecoaterOffset THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Setting recoater offset';
			task.status.state := STATE_SET_RECOATER_OFFSET;
			
		ELSIF task.command.setThicknessDOMS THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Setting DOMS thickness';
			task.status.state := STATE_SET_DOMS_THICKNESS;
			
		ELSIF task.command.clearThicknessDOMS THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Setting DOMS thickness';
			task.status.thicknessDOMS := MAX_DOMS_THICKNESS;
			task.internal.PLCOpen.status := ERR_OK;
			
		ELSIF task.command.setFocalOffset THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Setting focal offset';
			task.status.state := STATE_SET_FOCAL_OFFSET;
			
		ELSIF task.command.resetPrintInfo THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Resetting print info';
			task.status.state := STATE_RESETTING_PRINT_INFO;
		
		ELSIF task.command.bladeOffsetPlusTen THEN
			
			task.parameters.recoaterOffset_mm := task.parameters.recoaterOffset_mm + 0.01;
			
		ELSIF task.command.bladeOffsetMinusTen THEN
			
			task.parameters.recoaterOffset_mm := task.parameters.recoaterOffset_mm - 0.01;
			
		ELSIF task.command.bladeOffsetClr THEN
			
			task.parameters.recoaterOffset_mm := gPrintJobManagement.currentState.recoaterOffset;
			
		ELSIF task.command.resetPlateType THEN	
			
			dCurrentState.plateType := 'PLATE_TYPE_NONE';
			task.internal.PLCOpen.status := ERR_OK;
		
		ELSIF task.command.enableLOP THEN
			dCurrentState.lopModeActive := TRUE;
			task.internal.PLCOpen.status := ERR_OK;
			
		ELSIF task.command.disableLOP THEN
			dCurrentState.lopModeActive := FALSE;
			task.internal.PLCOpen.status := ERR_OK;
			
		ELSIF task.command.coolingDelay THEN
			task.status.state := STATE_COOLING_DELAY;
			
			
		ELSIF task.command.calculateRemainingPrintTime THEN
			
			
			LookAheadPrintTime;
			task.internal.PLCOpen.status := ERR_OK;
		
			
		END_IF

	ELSE
		
		IF NOT allZero( ADR(task.command), SIZEOF(task.command)) THEN
			vfAlarmEdgeSnippet(gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.COMMAND_BEFORE_READY, 'Print Job Manager');
		END_IF	
		
		task.internal.PLCOpen.status := PRINT_JOB_MANAGER_ERROR;
		task.status.state := STATE_NOT_READY;
		task.internal.localLockout := FALSE;
		
	END_IF
	
	
	IF task.command.publishConfigurationData THEN
			
		gDataCollection.EventPublishConfigAll.tags[CFGO1].name := 'BUILD_PLATE_THICKNESS_MAX_MM';
		gDataCollection.EventPublishConfigAll.tags[CFGO1].type := 'FLOAT32';
		gDataCollection.EventPublishConfigAll.tags[CFGO1].value := REAL_TO_STRING(Configuration.BUILD_PLATE_THICKNESS_MAX_MM);

		gDataCollection.EventPublishConfigAll.tags[CFGO2].name := 'BLADE_OFFSET_MAX_MM';
		gDataCollection.EventPublishConfigAll.tags[CFGO2].type := 'FLOAT32';
		gDataCollection.EventPublishConfigAll.tags[CFGO2].value := REAL_TO_STRING(Configuration.BLADE_OFFSET_MAX_MM);

		gDataCollection.EventPublishConfigAll.tags[CFGO3].name := 'FOCAL_OFFSET_MAX_MM';
		gDataCollection.EventPublishConfigAll.tags[CFGO3].type := 'FLOAT32';
		gDataCollection.EventPublishConfigAll.tags[CFGO3].value := REAL_TO_STRING(Configuration.FOCAL_OFFSET_MAX_MM);

		gDataCollection.EventPublishConfigAll.tags[CFGO4].name := 'FOCAL_OFFSET_MIN_MM';
		gDataCollection.EventPublishConfigAll.tags[CFGO4].type := 'FLOAT32';
		gDataCollection.EventPublishConfigAll.tags[CFGO4].value := REAL_TO_STRING(Configuration.FOCAL_OFFSET_MIN_MM);

		gDataCollection.EventPublishConfigAll.tags[CFGO5].name := 'FOCAL_OFFSET_MM';
		gDataCollection.EventPublishConfigAll.tags[CFGO5].type := 'FLOAT32';
		gDataCollection.EventPublishConfigAll.tags[CFGO5].value := REAL_TO_STRING(Configuration.FOCAL_OFFSET_MM);

		gDataCollection.EventPublishConfigAll.tags[CFGO6].name := 'OPTICS_BOX_REVISION';
		gDataCollection.EventPublishConfigAll.tags[CFGO6].type := 'STRING';
		gDataCollection.EventPublishConfigAll.tags[CFGO6].value := USINT_TO_STRING(Configuration.OPTICS_BOX_REVISION);

		gDataCollection.EventPublishConfigAll.tags[CFGO7].name := 'BLADE_OFFSET_MM';
		gDataCollection.EventPublishConfigAll.tags[CFGO7].type := 'FLOAT32';
		gDataCollection.EventPublishConfigAll.tags[CFGO7].value := REAL_TO_STRING(Configuration.BLADE_OFFSET_MM);
			
		task.internal.PLCOpenConfigData.status := ERR_OK;
	END_IF
	///////////////////////////////////////////////////////////////
	// Handle any canceled commands that are required
	///////////////////////////////////////////////////////////////
	IF task.internal.newCommand THEN
		
		// TODO: Log state changes
		//		task.internal.abortedStep := task.status.sequence;
		//		task.internal.abortedState := task.internal.previousState;
		
		task.status.sequence := SEQUENCE_IDLE;
		
		// If a new command came into the system, abort any PLCOpen commands that were active.
		// If the command came from PLCOpen FirstPass will be true and it will not abort it
		atnPLCOpenAbort(task.internal.PLCOpen);
		
		// handle state-based inhibits
		CASE task.status.state OF
			STATE_UPDATE_LAYER_NUMBER:
				
				IF stateAnyTrue( gPrintJobManagement.status.buildInfoInvalid , TRUE) THEN
					
					task.internal.PLCOpen.status := ERR_INHIBITED;
					task.status.state := STATE_READY;
					
					stateTrueStatus(gPrintJobManagement.status.buildInfoInvalid, ADR(task.internal.subSystemStatus), SIZEOF(task.internal.subSystemStatus)); 
					
					task.status.statusMessage := CONCAT(task.status.statusMessage, ' (Update Layer Number Inhibit) ');
					task.status.statusMessage := CONCAT(task.status.statusMessage, task.internal.subSystemStatus[0]);
					vfAlarmEdgeSnippet(gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.COMMAND_INHIBITED, task.status.statusMessage);

				END_IF
				
			STATE_RESETTING_PRINT_INFO:
				
				//dont allow reset print data unless the last thing we did was unload
				IF NOT(dCurrentState.lastOpUnloadComplete) AND NOT gSimulation THEN
					
					task.internal.PLCOpen.status := ERR_INHIBITED;
					task.status.state := STATE_READY;
					
					task.status.statusMessage := CONCAT(task.status.statusMessage, ' (Inhibited) ');
					task.status.statusMessage := CONCAT(task.status.statusMessage, 'Last operation was not unload');
					vfAlarmEdgeSnippet(gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.NotAllowedToResetPrint_AL0031, task.status.statusMessage);
					
				END_IF
			
		END_CASE
		
	END_IF
	
	CASE task.status.state OF
	
		STATE_NOT_READY:
			
			task.status.sequence := SEQUENCE_IDLE;
			
			task.status.statusMessage := 'Print job manager is not in ready state';
			
			IF task.status.ready THEN
				
				task.status.state := STATE_READY;
				
				task.status.statusMessage := 'Print job manager is in ready state';
				
			END_IF
			
		STATE_READY:
			
			task.status.sequence := SEQUENCE_IDLE;
			task.internal.localLockout := FALSE;
				
		STATE_RESETTING_PRINT_INFO:

			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					task.status.statusMessage := 'Error resetting print data';	

					//Handle Error
					task.internal.PLCOpen.status := PRINT_JOB_MANAGER_ERROR;
					task.status.state := STATE_READY;

				SEQUENCE_DONE:
					task.status.statusMessage := 'Print Data has been Reset';	

					//Handle Done
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
				
				SEQUENCE_IDLE:
					
					task.status.statusMessage := 'Resetting Print Data';	
					task.status.sequence := SEQUENCE_ASK_IF_OK_TO_RESET;
					
				ELSE
					
					ResetPrintInfoSubsequence;														

			END_CASE
			
			
		STATE_UPDATE_LAYER_NUMBER:
			
			//Updating Layer Number
			IF task.internal.PLCOpen.parametersWritten THEN
				task.internal.PLCOpen.parametersWritten := FALSE;
				
				IF dCurrentState.currentLayerNumber <> task.parameters.printJobLayer THEN
					//reset signals but only if its a different layer number
					gOpcData_ToVisionPC.ImgSet := 0;
					gOpcData_ToVisionPC.CurrentRecoat := 0;
					gOpcData_ToVisionPC.CurrentScan := 0;
				END_IF
				
				dCurrentState.currentLayerNumber := task.parameters.printJobLayer;			
			END_IF
	
			
			Nonvolatile.currentLayerNumber := dCurrentState.currentLayerNumber;
											
			// Convert the current layer number to a string with the "nnnnn" format, adding required leading 0s.
			brsitoa(dCurrentState.currentLayerNumber, ADR(layerNumberValue_string));						
			IF (dCurrentState.currentLayerNumber > 9999) THEN
				layerNumber_string := '';
			ELSIF (dCurrentState.currentLayerNumber > 999) THEN
				layerNumber_string := '0';
			ELSIF (dCurrentState.currentLayerNumber > 99) THEN
				layerNumber_string := '00';
			ELSIF (dCurrentState.currentLayerNumber > 9) THEN
				layerNumber_string := '000';
			ELSE
				layerNumber_string := '0000';
			END_IF
			brsstrcat(ADR(layerNumber_string), ADR(layerNumberValue_string));				
			
			// Format the complete layer filename for the G-code (CNC) motion control file.
			layerFilename_GCode := Nonvolatile.baseFilename;
			brsstrcat(ADR(layerFilename_GCode), ADR('_L'));
			brsstrcat(ADR(layerFilename_GCode), ADR(layerNumber_string));
			brsstrcat(ADR(layerFilename_GCode), ADR('_GCode.cnc'));			
			task.status.currentLayerGCodeFilename := layerFilename_GCode;		
				
			task.internal.PLCOpen.status := ERR_OK;
			task.status.state := STATE_READY;
	
		STATE_VALIDATING_BUILD_INFO:
			
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					task.status.statusMessage := 'Error Validating Print Files';	

					//Handle Error
					task.internal.PLCOpen.status := PRINT_JOB_MANAGER_ERROR;
					task.status.state := STATE_READY;

				SEQUENCE_DONE:
					task.status.statusMessage := 'Pre-Scan imaging sequence finished';	

					//Handle Done
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
				
				SEQUENCE_IDLE:

					task.status.statusMessage := 'Pre-Scan sequence started';	
					task.status.sequence := SEQUENCE_READ_BUILD_INFO;
					
				ELSE
					
					ValidateBuildFileSubsequence;														

			END_CASE
		
		STATE_SET_BUILD_PLATE_THICKNESS:
			
			IF task.internal.PLCOpen.parametersWritten THEN
				task.parameters.buildPlateThickness_mm := task.internal.parameters.buildPlateThickness_mm;
			END_IF
			
			task.status.buildPlateThickness := task.parameters.buildPlateThickness_mm;
			
			IF (task.status.buildPlateThickness < 50) THEN
				task.internal.PLCOpen.status := PRINT_JOB_MANAGER_ERROR;
				task.status.state := STATE_READY;
			ELSIF (task.status.buildPlateThickness > Configuration.BUILD_PLATE_THICKNESS_MAX_MM) THEN	
				task.internal.PLCOpen.status := PRINT_JOB_MANAGER_ERROR;
				task.status.state := STATE_READY;
			ELSE
				// reset persistent alarm
				task.status.buildPlateThicknessInvalid := FALSE;
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
			END_IF
			
		STATE_SET_DOMS_THICKNESS:
			
			IF task.internal.PLCOpen.parametersWritten THEN
				task.parameters.thicknessDOMS_mm := task.internal.parameters.thicknessDOMS_mm;
			END_IF
			
			task.status.thicknessDOMS := task.parameters.thicknessDOMS_mm;
			
			IF (task.status.thicknessDOMS < MIN_DOMS_THICKNESS) THEN
				task.internal.PLCOpen.status := PRINT_JOB_MANAGER_ERROR;
				task.status.state := STATE_READY;
			ELSIF (task.status.buildPlateThickness > MAX_DOMS_THICKNESS) THEN	
				task.internal.PLCOpen.status := PRINT_JOB_MANAGER_ERROR;
				task.status.state := STATE_READY;
			ELSE
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
			END_IF
			
			
		STATE_SET_RECOATER_OFFSET:
			
			IF task.internal.PLCOpen.parametersWritten THEN
				task.parameters.recoaterOffset_mm := task.internal.parameters.recoaterOffset_mm;
			END_IF
			
		
			IF (task.parameters.recoaterOffset_mm < 0) THEN
				
				//too small //todo alarm
				task.internal.PLCOpen.status := PRINT_JOB_MANAGER_ERROR;
				task.status.state := STATE_READY;
				
			ELSIF (task.parameters.recoaterOffset_mm > Configuration.BLADE_OFFSET_MAX_MM)  THEN
				//too large //todo alarm
				task.internal.PLCOpen.status := PRINT_JOB_MANAGER_ERROR;
				task.status.state := STATE_READY;
			ELSE
				task.status.recoaterOffset := task.parameters.recoaterOffset_mm;
				task.status.recoaterOffsetInvalid := FALSE;
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
			END_IF
		
		STATE_SET_FOCAL_OFFSET:
			
			IF task.internal.PLCOpen.parametersWritten THEN
				task.parameters.focalOffset_mm := task.internal.parameters.focalOffset_mm;
			END_IF
			
		
			IF (task.parameters.focalOffset_mm < Configuration.FOCAL_OFFSET_MIN_MM) THEN
				
				//too small //todo alarm
				task.internal.PLCOpen.status := PRINT_JOB_MANAGER_ERROR;
				task.status.state := STATE_READY;
				
			ELSIF (task.parameters.focalOffset_mm > Configuration.FOCAL_OFFSET_MAX_MM)  THEN
				//too large //todo alarm
				task.internal.PLCOpen.status := PRINT_JOB_MANAGER_ERROR;
				task.status.state := STATE_READY;
			ELSE
				task.status.focalOffset := task.parameters.focalOffset_mm;
	
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
			END_IF
		
		STATE_COOLING_DELAY:
			
			COOLING_DELAY_MS := COOLING_DELAY_S*1000;
			
			task.internal.coolingDelayTimer.PT := UDINT_TO_TIME(COOLING_DELAY_MS);
			task.internal.coolingDelayTimer.IN := TRUE;
			
		
			IF task.internal.coolingDelayTimer.Q THEN
				gPrintJobManagement.currentState.buildReport.secondsSpentCooling := gPrintJobManagement.currentState.buildReport.secondsSpentCooling + COOLING_DELAY_S;
				task.status.state := STATE_READY;
				task.internal.PLCOpen.status := ERR_OK;
			END_IF
	END_CASE
	
	//limit doms thickness
	gPrintJobManagement.status.MAX_DOMS_THICKNESS := MAX_DOMS_THICKNESS;
	
	IF gPrintJobManagement.currentState.domsThickness < MIN_DOMS_THICKNESS THEN
		task.status.thicknessDOMS := MAX_DOMS_THICKNESS;
	END_IF	
	IF gPrintJobManagement.currentState.domsThickness > MAX_DOMS_THICKNESS THEN
		task.status.thicknessDOMS := MAX_DOMS_THICKNESS;
	END_IF
	
	// limit bp thickness, set persistent alarm
	IF (task.status.buildPlateThickness < 50) THEN
		task.status.buildPlateThickness := Configuration.BUILD_PLATE_THICKNESS_MAX_MM;
		task.status.buildPlateThicknessInvalid := TRUE;
	ELSIF (task.status.buildPlateThickness > Configuration.BUILD_PLATE_THICKNESS_MAX_MM) THEN	
		task.status.buildPlateThickness := Configuration.BUILD_PLATE_THICKNESS_MAX_MM;
		task.status.buildPlateThicknessInvalid := TRUE;
	END_IF
	vfAlarmPersistent( gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.BPThicknessInvalid_AL0029, task.status.buildPlateThicknessInvalid);

	// limit recoater offset, set persistent alarm
	IF (task.status.recoaterOffset < 0) THEN
		task.status.recoaterOffset := 0;
		task.status.recoaterOffsetInvalid := TRUE;
	ELSIF (task.status.recoaterOffset > Configuration.BLADE_OFFSET_MAX_MM) THEN	
		task.status.recoaterOffset := Configuration.BLADE_OFFSET_MAX_MM;
		task.status.recoaterOffsetInvalid := TRUE;
	END_IF
	vfAlarmPersistent( gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.RecoaterOffsetInvalid_AL0032, task.status.recoaterOffsetInvalid);
	
	//band limit the focal offset
	IF (task.status.focalOffset < Configuration.FOCAL_OFFSET_MIN_MM) THEN
		task.status.focalOffset := Configuration.FOCAL_OFFSET_MIN_MM;
	ELSIF (task.status.focalOffset > Configuration.FOCAL_OFFSET_MAX_MM) THEN	
		task.status.focalOffset := Configuration.FOCAL_OFFSET_MAX_MM;
	END_IF
	
	// assert build plate thickness from this subsystem - if you want to change it USE THE API
	gPrintJobManagement.currentState.buildPlateThickness := task.status.buildPlateThickness;
	gPrintJobManagement.currentState.domsThickness := task.status.thicknessDOMS;	
	gPrintJobManagement.status.maxBPThickness := Configuration.BUILD_PLATE_THICKNESS_MAX_MM;
	gPrintJobManagement.currentState.recoaterOffset := task.status.recoaterOffset;
	gPrintJobManagement.currentState.focalOffset := task.status.focalOffset;
	gPrintJobManagement.status.maxRecoaterOffset := Configuration.BLADE_OFFSET_MAX_MM;
	
	
	//get reason that might occur outside of the sequence
	task.status.buildInfoError := stateTrueStatus( gPrintJobManagement.status.buildInfoInvalid, ADR( task.status.buildInfoErrorStatus ), SIZEOF(task.status.buildInfoErrorStatus));
		
	
	//WHAT IF WE BOOT WITH NO MEMORY OF THE LOADED/UNLOADED?
	IF NOT(dCurrentState.lastOpLoadComplete) AND NOT(dCurrentState.lastOpUnloadComplete) THEN
		
		IF gSimulation THEN
			// don't ask in sim, just make it loaded
			dCurrentState.lastOpLoadComplete := TRUE;
			dCurrentState.lastOpUnloadComplete := FALSE;
			
		ELSE
			
			IF messageHandler.msgId = 0 THEN
				messageHandler.msgId := MessageBox_AddMsg(ADR('Printer has lost track of build volume. What was the last completed operation?'), 
				ADR('Unloaded'), ADR(messageHandler.ok),
				ADR('Loaded'), ADR(messageHandler.cancel));
			END_IF
		
			IF messageHandler.ok THEN
				messageHandler.ok := FALSE;
				messageHandler.msgId := 0;
				dCurrentState.lastOpLoadComplete := FALSE;
				dCurrentState.lastOpUnloadComplete := TRUE;
			END_IF
		
			IF messageHandler.cancel THEN
				messageHandler.cancel := FALSE;
				messageHandler.msgId := 0;
				dCurrentState.lastOpLoadComplete := TRUE;
				dCurrentState.lastOpUnloadComplete := FALSE;	
			END_IF
			
		END_IF
		
	END_IF
			
	
	
	//INHIBITS FOR THE AUTOMATION SFC
	CheckAllowedToPrint;
	CheckAllowedToScavenge;
	CheckAllowedToRecoat;
	CheckAllowedToScrape;
	CheckAllowedToIncrement;
		
	// ---------------------------------------------------------------------------
	// Calculate current part height cyclically
	// ---------------------------------------------------------------------------						
	dCurrentState.currentPartHeight := UINT_TO_REAL(dCurrentState.currentLayerNumber) * dCurrentState.layerHeight; //TODO: I think this needs to be modified for lase on plate.
		

	//DONT LET MACHINE ENTER LOP MODE IF THERE HAS BEEN A RECOATED LAYER ON THE BUILD PLATE.
	//IF IN LOP MODE, DO NOT FACTOR THE CURRENT LAYER INTO PART HEIGHT
	IF dCurrentState.lopModeActive THEN 
		IF dCurrentState.lastRecoatedLayerNumber > 0 THEN
			vfAlarmEdge(gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.NotAllowedToEnterLopMode_AL0030);
			dCurrentState.lopModeActive := FALSE;
		END_IF
		dCurrentState.currentPartHeight := 0;
	END_IF
		
	
	//RESET PRINT DATA ON EXIT OF LOP MODE - KEEP BUILD PLATE THICKNESS!
	IF (NOT dCurrentState.lopModeActive) AND task.internal._lopModeActive THEN
		
		task.status.currentLayerGCodeFilename := '';
		dCurrentState.currentLayerNumber := 0;
		
		dCurrentState.lastRecoatedLayerNumber := 0;
		dCurrentState.lastPrintedLayerNumber := 0;			
		dCurrentState.lastCompletedOperation := MACH_OP_NONE;
			
		// Reset values from vision system when starting a new print job.
		gOpcData_FromVisionPC.AcquiredLayer := 0;
		gOpcData_FromVisionPC.TriggerCount := 0;
		gOpcData_ToVisionPC.ImgSet := 0;
		gOpcData_ToVisionPC.CurrentRecoat := 0;	
		
		//TODO broken
	//	messageHandler.msgId := MessageBox_AddMsgTop(ADR('After exiting LOP mode print data is cleared'), ADR('OK'), ADR(messageHandler.ok), 0, 0);

	END_IF
	
	
	task.internal._lopModeActive := dCurrentState.lopModeActive;
	
	
	//RETAIN PART HEIGHT
	IF (dCurrentState.currentPartHeight <> Nonvolatile.currentPartHeight) THEN
		Nonvolatile.currentPartHeight := dCurrentState.currentPartHeight;
	END_IF
	
			
	//Set Nonvolatile cyclically
	Nonvolatile.lastRecoatedLayerNumber := dCurrentState.lastRecoatedLayerNumber;
	Nonvolatile.lastPrintedLayerNumber := dCurrentState.lastPrintedLayerNumber;
	Nonvolatile.lastCompletedOperation := dCurrentState.lastCompletedOperation;				
	Nonvolatile.lastOpLoadComplete := dCurrentState.lastOpLoadComplete;
	Nonvolatile.lastOpUnloadComplete := dCurrentState.lastOpUnloadComplete;		
	//---------------------------------------------------------------------------
	// Repopulate layer gcode file name if PLC restarted.
	//---------------------------------------------------------------------------	
	
	IF (task.status.currentLayerGCodeFilename = '') AND ((Nonvolatile.lastCompletedOperation = MACH_OP_PREPARE_NEXT_LAYER) OR (Nonvolatile.lastCompletedOperation = MACH_OP_RECOAT_CURRENT_LAYER)) THEN
			
		// Convert the current layer number to a string with the "nnnnn" format, adding required leading 0s.
		brsitoa(dCurrentState.currentLayerNumber, ADR(layerNumberValue_string));						
		IF (dCurrentState.currentLayerNumber > 9999) THEN
			layerNumber_string := '';
		ELSIF (dCurrentState.currentLayerNumber > 999) THEN
			layerNumber_string := '0';
		ELSIF (dCurrentState.currentLayerNumber > 99) THEN
			layerNumber_string := '00';
		ELSIF (dCurrentState.currentLayerNumber > 9) THEN
			layerNumber_string := '000';
		ELSE
			layerNumber_string := '0000';
		END_IF
		brsstrcat(ADR(layerNumber_string), ADR(layerNumberValue_string));				
			
		// Format the complete layer filename for the G-code (CNC) motion control file.
		layerFilename_GCode := Nonvolatile.baseFilename;
		brsstrcat(ADR(layerFilename_GCode), ADR('_L'));
		brsstrcat(ADR(layerFilename_GCode), ADR(layerNumber_string));
		brsstrcat(ADR(layerFilename_GCode), ADR('_GCode.cnc'));			
		task.status.currentLayerGCodeFilename := layerFilename_GCode;
				
	END_IF
	
	//hmi stuff
	IF gPrintJobManagement.currentState.buildPlateHasBeenPrepared THEN
		task.internal.strBpPreparedStatus := 'Build plate thickness has been found';
	ELSE
		task.internal.strBpPreparedStatus := 'Build plate thickness has not been found - set to max';
	END_IF
	
	IF gPrintJobManagement.currentState.buildPlateRecoaterOffsetFound THEN
		task.internal.strRecoaterOffsetStatus := 'Recoater Offset has been found for this build plate';
	ELSE
		task.internal.strRecoaterOffsetStatus := 'Recoater Offset has not been found for this build plate';
	END_IF
	
	IF gPrintJobManagement.currentState.lastOpLoadComplete THEN
		task.internal.strBuildPlateLoadStatus := 'A build plate is currently on the lift';
	ELSE
		task.internal.strBuildPlateLoadStatus := 'No build plate is on the lift';
	END_IF
	
	(*// LOG CHANGES IN SETUP PARAMETERS *)
	IF (task.internal._focalOffset <> task.status.focalOffset) OR (task.internal._bladeOffset <> task.status.recoaterOffset) OR (task.internal._plateThickness <> task.status.buildPlateThickness) THEN
		task.internal.triggerDataCapture := TRUE;
	END_IF
	
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
		
	//trigger the capture on a var change..
	IF task.internal.triggerDataCapture THEN
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
		task.internal.triggerDataCapture := FALSE;
	END_IF
	
	//EDGES
	task.internal._focalOffset := task.status.focalOffset;
	task.internal._bladeOffset := task.status.recoaterOffset;
	task.internal._plateThickness := task.status.buildPlateThickness;
	

	//other vars are collected inside the various routines 
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
	gDataCollection.StatusProcessParChange.tags[12].name					:= 'recoatApproachMoveVelocity';
	gDataCollection.StatusProcessParChange.tags[12].value					:= REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Velocity);
	gDataCollection.StatusProcessParChange.tags[12].type					:= 'FLOAT32';
	gDataCollection.StatusProcessParChange.tags[13].name					:= 'recoatApproachMoveAccel';
	gDataCollection.StatusProcessParChange.tags[13].value					:= REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Acceleration);
	gDataCollection.StatusProcessParChange.tags[13].type					:= 'FLOAT32';
	gDataCollection.StatusProcessParChange.tags[14].name					:= 'recoatApproachMoveDecel';
	gDataCollection.StatusProcessParChange.tags[14].value					:= REAL_TO_STRING(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Deceleration);
	gDataCollection.StatusProcessParChange.tags[14].type					:= 'FLOAT32';
	gDataCollection.StatusProcessParChange.tags[15].name					:= 'AiMaxRecoatLimit';
	gDataCollection.StatusProcessParChange.tags[15].value					:= REAL_TO_STRING(gOpcData_ToVisionPC.AiMaxRecoatLimit);
	gDataCollection.StatusProcessParChange.tags[15].type					:= 'FLOAT32';
		
	//if any of these values change since last scan update the whole list
	IF
		(task.internal._processParEvent.tags[1].value <>  (gDataCollection.StatusProcessParChange.tags[1].value)) OR
		(task.internal._processParEvent.tags[2].value <>  (gDataCollection.StatusProcessParChange.tags[2].value)) OR
		(task.internal._processParEvent.tags[3].value <>  (gDataCollection.StatusProcessParChange.tags[3].value)) OR
		(task.internal._processParEvent.tags[4].value <>  (gDataCollection.StatusProcessParChange.tags[4].value)) OR
		(task.internal._processParEvent.tags[5].value <>  (gDataCollection.StatusProcessParChange.tags[5].value)) OR
		(task.internal._processParEvent.tags[6].value <> (gDataCollection.StatusProcessParChange.tags[6].value)) OR
		(task.internal._processParEvent.tags[7].value <> (gDataCollection.StatusProcessParChange.tags[7].value)) OR
		(task.internal._processParEvent.tags[8].value <>  (gDataCollection.StatusProcessParChange.tags[8].value)) OR
		(task.internal._processParEvent.tags[9].value <> (gDataCollection.StatusProcessParChange.tags[9].value)) OR
		(task.internal._processParEvent.tags[10].value <> (gDataCollection.StatusProcessParChange.tags[10].value)) OR
		(task.internal._processParEvent.tags[11].value <> (gDataCollection.StatusProcessParChange.tags[11].value)) OR
		(task.internal._processParEvent.tags[12].value <> (gDataCollection.StatusProcessParChange.tags[12].value)) OR 
		(task.internal._processParEvent.tags[13].value <> (gDataCollection.StatusProcessParChange.tags[13].value)) OR
		(task.internal._processParEvent.tags[14].value <> (gDataCollection.StatusProcessParChange.tags[14].value)) OR 
		(task.internal._processParEvent.tags[15].value <> (gDataCollection.StatusProcessParChange.tags[15].value)) THEN
		
		task.internal.triggerParDataCapture := TRUE;
		
	END_IF
	
	//trigger the capture on a var change..
	IF task.internal.triggerParDataCapture THEN
		IF stateAllTrue(gMQTTApi.status.MQTTEnabled,FALSE) THEN
			IF stateAllFalse(gMQTTApi.inhibit.MQTTPublishInhibit,FALSE) AND NOT(gMQTTApi.status.bufferIsFull ) THEN
				
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableListToPublish := 'StatusProcessParChange' ;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].VariableDataToPublish := gDataCollection;
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := 'vf1.0/Printers/';
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,gConfiguration.machineIdentity.machineName);
				gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList := CONCAT(gDataCollectionQueue[gMQTTApi.status.bufferTail].TopicForVariableList,'/PrinterPLC/STATUS/StatusProcessParChange');
				gMQTTApi.status.bufferTail := (gMQTTApi.status.bufferTail + 1) MOD MAX_PUBLISH_STACK_SIZE;
				IF gMQTTApi.status.bufferTail = gMQTTApi.status.bufferHead THEN
					gMQTTApi.status.bufferIsFull := TRUE;
				END_IF
			ELSE	
				vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403,'StatusProcessParChange');
			END_IF
		END_IF
		task.internal.triggerParDataCapture := FALSE;
	END_IF
	
	//EDGES
	task.internal._processParEvent.tags[1].value := (gDataCollection.StatusProcessParChange.tags[1].value);
	task.internal._processParEvent.tags[2].value := (gDataCollection.StatusProcessParChange.tags[2].value);
	task.internal._processParEvent.tags[3].value := (gDataCollection.StatusProcessParChange.tags[3].value);
	task.internal._processParEvent.tags[4].value := (gDataCollection.StatusProcessParChange.tags[4].value);
	task.internal._processParEvent.tags[5].value := (gDataCollection.StatusProcessParChange.tags[5].value);
	task.internal._processParEvent.tags[6].value := (gDataCollection.StatusProcessParChange.tags[6].value);
	task.internal._processParEvent.tags[7].value := (gDataCollection.StatusProcessParChange.tags[7].value);
	task.internal._processParEvent.tags[8].value := (gDataCollection.StatusProcessParChange.tags[8].value);
	task.internal._processParEvent.tags[9].value := (gDataCollection.StatusProcessParChange.tags[9].value);
	task.internal._processParEvent.tags[10].value := (gDataCollection.StatusProcessParChange.tags[10].value);
	task.internal._processParEvent.tags[11].value :=  (gDataCollection.StatusProcessParChange.tags[11].value); 
	task.internal._processParEvent.tags[12].value :=  (gDataCollection.StatusProcessParChange.tags[12].value); 
	task.internal._processParEvent.tags[13].value :=  (gDataCollection.StatusProcessParChange.tags[13].value); 
	task.internal._processParEvent.tags[14].value :=  (gDataCollection.StatusProcessParChange.tags[14].value); 
	task.internal._processParEvent.tags[15].value :=  (gDataCollection.StatusProcessParChange.tags[15].value);
	
	task.internal.coolingDelayTimer();
	task.internal.coolingDelayTimer.IN := FALSE;
	
	//RESET COMMANDS	
	brsmemset(ADR(task.command), 0, SIZEOF(task.command));
	task.internal.newCommand := FALSE;
	
	task.internal.newCommand := 0;
	
	command();
	IF command.Done OR command.Error OR command.Aborted THEN 
		command.Execute := FALSE;
	END_IF	
	
	logStateChange_0.LoggerName := 'App';
	logStateChange_0.ModuleName := Name;
	logStateChange_0.State 		:= task.status.state;
	logStateChange_0.StateName 	:= task.status.statusMessage;
	logStateChange_0();
	
	logSeqChange_0.LoggerName 	:= 'App';
	logSeqChange_0.ModuleName 	:= Name;
	//	logSeqChange_0.State		:= task.status.sequence;
	//	logSeqChange_0.StateName	:= task.status.statusMessage;
	//	logSeqChange_0();
	
	// ---------------------------------------------------------------------------
	// Call ATN FUB
	// ---------------------------------------------------------------------------
	task.internal.checkPixelUsage();
	task.internal.checkPixelUsage.Execute := FALSE;
	
	task.internal.remapPixels();
	task.internal.remapPixels.Execute := FALSE;
	
	task.status.buildInfoValid := stateAllFalse( gPrintJobManagement.status.buildInfoInvalid, TRUE);
	
	//HMI text
	IF task.status.inhibitPrintReasons.lasersNotReady THEN
		task.status.laserText := 'LASERS NOT READY';
	ELSE
		task.status.laserText := 'LASERS READY';
	END_IF
	
	IF task.status.inhibitPrintReasons.pumpsNotRunningAtSetFreq THEN
		task.status.pumpText := 'PUMPS NOT RUNNING AT SET FREQ';
	ELSE
		task.status.pumpText := 'PUMPS RUNNING';
	END_IF
	
	IF task.status.inhibitPrintReasons.pumpsNotRunningAtSetFlow THEN
		task.status.pumpText := 'PUMPS NOT RUNNING AT SET FLOW';
	ELSE
		task.status.pumpText := 'PUMPS RUNNING';
	END_IF
	
	// Update print job status flags based on last completed machine operation.
	CASE (dCurrentState.lastCompletedOperation) OF
	
		MACH_OP_PRINT_CURRENT_LAYER:
			task.status.finishedPrint := TRUE;
			task.status.finishedRecoat := FALSE;
			task.status.finishedPrepareNextLayer := FALSE;
			
		MACH_OP_RECOAT_CURRENT_LAYER:
			task.status.finishedPrint := FALSE;
			task.status.finishedRecoat := TRUE;
			task.status.finishedPrepareNextLayer := FALSE;
		
		MACH_OP_PREPARE_NEXT_LAYER:
			task.status.finishedPrint := FALSE;
			task.status.finishedRecoat := FALSE;
			task.status.finishedPrepareNextLayer := TRUE;
	
		ELSE
			task.status.finishedPrint := FALSE;
			task.status.finishedRecoat := FALSE;
			task.status.finishedPrepareNextLayer := FALSE;

	END_CASE
	
	IF stateAllTrue(gPodApi.status.podlatched, FALSE) THEN
		gPrintJobManagement.currentState.podLoaded := 1;
	ELSE
		gPrintJobManagement.currentState.podLoaded := 0;
	END_IF
	
	gPrintJobManagement.status.currentLayerGCodeFilename := task.status.currentLayerGCodeFilename;
	
END_PROGRAM

		
PROGRAM _EXIT
	 
END_PROGRAM

