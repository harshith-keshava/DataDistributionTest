
PROGRAM _INIT          
		
	Name := 'Print Job Management';
	
	// Restore current print job management information from permanent memory.
	gPrintJobManagement.currentState := Nonvolatile;

	
	
	subscribePLCOpenWithParameters( gPrintJobManagement.commands.updateLayerNumber, Name, ADR(task.parameters.printJobLayer), SIZEOF(task.parameters.printJobLayer), task.command.updateCurrentLayer, task.internal.PLCOpen);
	
	subscribePLCOpen( gPrintJobManagement.commands.validatePrintFile, Name, task.command.validatePrintFile, task.internal.PLCOpen);
	
	
	subscribePLCOpen( gSystemRecipeApi.events.buildInfoLoaded, Name, task.command.validatePrintFile, task.internal.PLCOpen);
	subscribePLCOpen( gPrintJobManagement.commands.resetPrintInfo, Name, task.command.resetPrintInfo, task.internal.PLCOpen);
	registerStateBool( gPrintJobManagement.status.buildInfoValid, 'Build Info Loaded', task.status.buildInfoValid);		
	
	//REASONS FOR INVALID BUILD FILE
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Build Name Invalid', task.status.buildInfoInvalidReasons.invalidBuildName);	
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Num Layers Invalid', task.status.buildInfoInvalidReasons.invalidNumLayers);
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Layer Height Invalid', task.status.buildInfoInvalidReasons.invalidLayerHeight);
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Platform ID Invalid', task.status.buildInfoInvalidReasons.invalidPlatformID);
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'Machine Name Invalid', task.status.buildInfoInvalidReasons.invalidMachineName);
	//SIM helper for bootup to set some non vol
	IF gSimulation THEN
		//gConfiguration.machineIdentity.factoryName := 'VulcanOne';
		//gConfiguration.machineIdentity.factoryNumber := FACTORY_VULCAN_ONE;
		//gConfiguration.machineIdentity.machineGeneration := MACHINE_GENERATION_GEN3;
		//	gConfiguration.machineIdentity.machineName := 'DP13';
		//gConfiguration.machineIdentity.machineType := MACHINE_TYPE_PRINTER;
		//	gConfiguration.machineIdentity.machineNumber := 13;
		//gPrintJobManagement.currentState.currentLayerNumber := 0;
	
	END_IF
	

END_PROGRAM   


PROGRAM _CYCLIC
	 

	
	//Copy current state to non-volatile memory.
	Nonvolatile := gPrintJobManagement.currentState;
	dCurrentState ACCESS ADR(gPrintJobManagement.currentState);
					
	task.status.ready := TRUE;
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	//COMMANDS
	//validate build info file
	//check if ready for printing
	//increment layer number
	
	//Cyclically this task also manages the part height and parameters related to the build info file
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	IF task.status.ready THEN
		
		

		IF task.command.validatePrintFile THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Validating Build Info File';
			task.status.state := STATE_VALIDATING_BUILD_INFO;
			
		ELSIF task.command.updateCurrentLayer THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Updating Layer Number';
			task.status.state := STATE_UPDATE_LAYER_NUMBER;
			
	
		ELSIF task.command.resetPrintInfo THEN
			
			task.internal.newCommand := TRUE;
			task.status.statusMessage := 'Resetting print info';
			task.status.state := STATE_RESETTING_PRINT_INFO;
	
			
		END_IF

	ELSE
		
	
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
					task.status.state := STATE_VALIDATING_BUILD_INFO;
					
				ELSE
					
					ResetPrintInfoSubsequence;														

			END_CASE
			
		STATE_UPDATE_LAYER_NUMBER:
				dCurrentState.currentLayerNumber := task.parameters.printJobLayer;
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
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				ELSE
					
					ValidateBuildFileSubsequence;														

			END_CASE
		
		END_CASE
	END_IF
	
	
		//Set Nonvolatile cyclically
		Nonvolatile.lastRecoatedLayerNumber := dCurrentState.lastRecoatedLayerNumber;
		Nonvolatile.lastPrintedLayerNumber := dCurrentState.lastPrintedLayerNumber;
	
	
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
		
	
		task.status.buildInfoValid := stateAllFalse( gPrintJobManagement.status.buildInfoInvalid, TRUE);
	

	
		END_PROGRAM

		
		PROGRAM _EXIT
	 
		END_PROGRAM

