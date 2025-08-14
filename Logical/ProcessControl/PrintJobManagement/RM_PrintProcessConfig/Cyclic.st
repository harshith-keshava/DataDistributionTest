
PROGRAM _CYCLIC

	// ---------------------------------------------------------------------------
	// PrintProcessConfig recipe file management.
	// ---------------------------------------------------------------------------		
	
	IF task.status.state = STATE_READY THEN

		IF  task.commands.load THEN
			
			task.status.state:= STATE_LOAD;
				
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
			
			fbRecipeXml_PrintProcessConfig.Load := TRUE;
			
			IF fbRecipeXml_PrintProcessConfig.CommandDone THEN				
	
				task.internal.load.status := ERR_OK;
				
				task.status.state := STATE_READY;

			ELSIF fbRecipeXml_PrintProcessConfig.Error THEN

				fbRecipeXml_PrintProcessConfig.ErrorReset	:= TRUE;
				task.internal.load.status := PRINT_JOB_MANAGER_ERROR;
				
				task.status.state := STATE_READY;

				//brsitoa(fbRecipeXml_PrintProcessConfig.StatusID, ADR(gPrintJobManagement.alarms.FileLoadError_AL0023.snippet));
				//vfAlarmEdge( gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.FileLoadError_AL0023);
				
			END_IF
			
		STATE_SAVE:		

			fbRecipeXml_PrintProcessConfig.Save := TRUE;

			IF fbRecipeXml_PrintProcessConfig.CommandDone THEN

				task.status.state := STATE_READY;
				task.internal.save.status := ERR_OK;

			ELSIF fbRecipeXml_PrintProcessConfig.Error THEN
				
				fbRecipeXml_PrintProcessConfig.ErrorReset	:= TRUE;
				task.internal.save.status := PRINT_JOB_MANAGER_ERROR;
				task.status.state := STATE_READY;
				
				//brsitoa( fbRecipeXml_PrintProcessConfig.StatusID, ADR(gPrintJobManagement.alarms.FileSaveError_AL0024.snippet));
				//vfAlarmEdge( gPrintJobManagement.alarms.components, gPrintJobManagement.alarms.FileSaveError_AL0024);
								
			END_IF

	END_CASE	
	
	task.commands.load := FALSE;
	task.commands.save := FALSE;
	
	

	//If we are not ready, and the build info IS ready, go to ready
	IF task.status.state =  STATE_NOT_READY AND fbRecipeRegPar_PrintConfig.StatusID = ERR_OK THEN

		task.status.state:= STATE_READY;

	END_IF	
	
	// Update the command status; if an error occurs, update select the first applicable status ID.
	task.status.busy := fbRecipeXml_PrintProcessConfig.CommandBusy;
	task.status.done := fbRecipeXml_PrintProcessConfig.CommandDone;
	task.status.error := fbRecipeRegPar_PrintConfig.Error OR fbRecipeXml_PrintProcessConfig.Error;
	IF (fbRecipeRegPar_PrintConfig.Error) THEN
		task.status.errorId := fbRecipeRegPar_PrintConfig.StatusID;
	ELSIF (fbRecipeXml_PrintProcessConfig.Error) THEN
		task.status.errorId := fbRecipeXml_PrintProcessConfig.StatusID;
	ELSE
		task.status.errorId := ERR_OK;
		
	END_IF
	
	DeriveProcessData;
	
END_PROGRAM
