PROGRAM _INIT
		
	//gOpcData_ToBuildPC.Heartbeat := 0;
	//gOpcData_FromBuildPC.Heartbeat := 0;

	//gOpcData_ToVisionPC.HeartbeatOut := 0;
	//gOpcData_FromVisionPC.HeartbeatIn := 0;
	
	gBuildInformation.base_filename := 'VF-99999-9999';
	gBuildInformation.build_iter := 0;
	gBuildInformation.description := 'n/a';
	gBuildInformation.build_layout := 99999;
	gBuildInformation.print_number := 9999;
	gBuildInformation.num_layers := 1;
	gBuildInformation.layer_height := 0.05;
	gBuildInformation.platform_id := 3;
	gBuildInformation.description := '';
	gBuildInformation.author := '';
	gBuildInformation.print_owner := '';
	gBuildInformation.platform_name := '600x600';
		
	gBuildInformation.build_volume_limits.min.X := 130.0;
	gBuildInformation.build_volume_limits.min.Y := 130.0;
	gBuildInformation.build_volume_limits.min.Z := 0.0;

	gBuildInformation.build_volume_limits.max.X := 728.0;
	gBuildInformation.build_volume_limits.max.Y := 728.0;
	gBuildInformation.build_volume_limits.max.Z := 400.0;
	
	
	//subscribePLCOpen( gSystemRecipeApi.commands.loadBuildInfo, 'Build Info', task.commands.load, task.internal.load );
	
	//task.internal.loaded := gSystemRecipeApi.events.buildInfoLoaded;
	
	registerStateBool( gPrintJobManagement.status.buildInfoInvalid, 'File Not Loaded', task.internal.notLoaded);
	
	task.internal.notLoaded := TRUE;
	
END_PROGRAM


PROGRAM _CYCLIC
	
	// Get the current date/time for save operations.
	fbDTGetTime.enable := TRUE;
	fbDTGetTime();
	saveTime := fbDTGetTime.DT1;
	
	
	
	// ---------------------------------------------------------------------------
	// BuildInfo recipe file management.
	// ---------------------------------------------------------------------------			
	IF task.status.state = STATE_READY THEN

		// Prevent simultaneous load and save commands.
		//If both are true, cancel them both..
		IF (task.commands.load AND task.commands.save) THEN
	
			//task.internal.save.status := ERR_INHIBITED;
			//task.internal.load.status := ERR_INHIBITED;

			//vfAlarmEdgeSnippet( gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.Inhibited_AL0022, 'Load and Save commanded at the same time');
			
		ELSIF task.commands.load THEN
		
			task.commands.load := FALSE;
			task.status.state:= STATE_LOAD;
			
		ELSIF task.commands.save THEN 	
			
			task.commands.save := FALSE;
			task.status.state:= STATE_SAVE;
			
		END_IF
	ELSE

		//TODO: Should we allow this?
		//Respond error to commands that come in while we are busy
		//Currently, this will allow commands to be saved 
		//and processed when they are complete
		IF task.commands.load THEN
//			task.internal.load.status := ERR_INHIBITED;
		END_IF	
			
		IF task.commands.load THEN 	
//			task.internal.save.status := ERR_INHIBITED;
		END_IF

	END_IF	
	
	CASE task.status.state OF						
		STATE_LOAD:		

			fbRecipeXml_BuildInfo.Load := TRUE;

			IF fbRecipeXml_BuildInfo.CommandDone THEN
				
				task.internal.notLoaded := FALSE;
				task.status.state := STATE_READY;
				task.internal.load.status := ERR_OK;
				
				executeCommand( task.internal.loaded );

			ELSIF fbRecipeXml_BuildInfo.Error THEN
				
				task.internal.notLoaded := TRUE;
				
				fbRecipeXml_BuildInfo.ErrorReset	:= TRUE;
				task.internal.load.status := PRINT_JOB_MANAGER_ERROR;
				task.status.state := STATE_READY;

				//brsitoa(fbRecipeXml_BuildInfo.StatusID, ADR(gPrintJobManagement.alarms.FileLoadError_AL0023.snippet));
				//vfAlarmEdge( gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.FileLoadError_AL0023);
				
			END_IF
			
		STATE_SAVE:		

			fbRecipeXml_BuildInfo.Save := TRUE;

			IF fbRecipeXml_BuildInfo.CommandDone THEN

				task.status.state := STATE_READY;
				task.internal.save.status := ERR_OK;

			ELSIF fbRecipeXml_BuildInfo.Error THEN
				
				fbRecipeXml_BuildInfo.ErrorReset	:= TRUE;
				task.internal.save.status := PRINT_JOB_MANAGER_ERROR;
				task.status.state := STATE_READY;
				
				//brsitoa( fbRecipeXml_BuildInfo.StatusID, ADR(gPrintJobManagement.alarms.FileSaveError_AL0024.snippet));
				//vfAlarmEdge( gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.FileSaveError_AL0024);
								
			END_IF

	END_CASE	


	fbRecipeXml_BuildInfo.MpLink := ADR(gBuildInfoRecipe);
	fbRecipeXml_BuildInfo.Enable := TRUE;
	fbRecipeXml_BuildInfo.DeviceName := ADR('CurrentBuild');
	fbRecipeXml_BuildInfo.Category := ADR('BuildInfo');
	fbRecipeXml_BuildInfo.FileName := ADR('BuildInfo.xml');		
	//fbRecipeXml_BuildInfo.Header := ADR(header_BuildInfo);  // BuildInfo.xml file has no header	
	fbRecipeXml_BuildInfo.LoadType := mpRECIPE_XML_LOAD_ALL;
	fbRecipeXml_BuildInfo();
	fbRecipeXml_BuildInfo.Save := FALSE;
	fbRecipeXml_BuildInfo.Load := FALSE;
	fbRecipeXml_BuildInfo.ErrorReset := FALSE;

			
	fbRecipeRegPar_BuildInfo.MpLink := ADR(gBuildInfoRecipe);
	fbRecipeRegPar_BuildInfo.Enable := TRUE;
	fbRecipeRegPar_BuildInfo.PVName := ADR('gBuildInformation');
	fbRecipeRegPar_BuildInfo.Category := ADR('BuildInfo');
	fbRecipeRegPar_BuildInfo();	
	fbRecipeRegPar_BuildInfo.ErrorReset := FALSE;

	//If we are not ready, and the build info IS ready, go to ready
	IF task.status.state =  STATE_NOT_READY AND fbRecipeRegPar_BuildInfo.StatusID = ERR_OK THEN

		task.status.state:= STATE_READY;

	END_IF	

	
	// Update the command status; if an error occurs, update select the first applicable status ID.
	task.status.busy := fbRecipeXml_BuildInfo.CommandBusy;
	task.status.done := fbRecipeXml_BuildInfo.CommandDone;
	task.status.error := fbRecipeRegPar_BuildInfo.Error OR fbRecipeXml_BuildInfo.Error;
	IF (fbRecipeRegPar_BuildInfo.Error) THEN
		task.status.errorId := fbRecipeRegPar_BuildInfo.StatusID;
	ELSIF (fbRecipeXml_BuildInfo.Error) THEN
		task.status.errorId := fbRecipeXml_BuildInfo.StatusID;
	ELSE
		task.status.errorId := ERR_OK;
	END_IF
		
				
END_PROGRAM


PROGRAM _EXIT
	
	// Prevent error mpRECIPE_ERR_MPLINK_IN_USE by releasing the link to the configuration objects.
	fbRecipeRegPar_BuildInfo.Enable := FALSE;	
	fbRecipeRegPar_BuildInfo();
	fbRecipeXml_BuildInfo.Enable := FALSE;
	fbRecipeXml_BuildInfo();

END_PROGRAM