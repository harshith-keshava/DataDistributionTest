//Continuous action connected to step one
ACTION FunctionblockCalls: 
	// Data collection info updated for the event

	
	task.status.activeStep := SFCCurrentStep;	
	
	IF task.command.stop THEN 		
		SFCReset := 		TRUE;
		Command.Execute := 	FALSE;
		Command();
	ELSE	 	
		SFCReset := 		FALSE;	
	END_IF
	
	IF Command.Aborted THEN
		
		logStateChange_0.StateName := CONCAT(Command.Command, ' - Aborted');
		task.status.statusID := ERR_FUB_REDUNDANT;			
		task.internal.PLCOpen.status := ERR_FUB_REDUNDANT;
		task.status.ErrorState := SFCCurrentStep;

//		AlarmText := CONCAT(logStateChange_0.ModuleName, ' Step: ');
//		AlarmText := CONCAT(AlarmText, SFCCurrentStep);
//		gMachineAlarms.commandStatus := Command.StatusMessage;
//		gMachineAlarms.messageStatus := task.status.statusMessage;
//		vfAlarmEdgeSnippet( gMachineAlarms.components, gMachineAlarms.AUTOMATION_FAIL_COMMAND, AlarmText);

		SFCReset := 		TRUE;
		Command.Execute := 	FALSE;
		Command();
		
		
		
		logStateChange_0.State := logStateChange_0.State + 1; 
		
	ELSIF Command.Error THEN
		
		logStateChange_0.StateName := CONCAT(Command.Command, ' - Error');
		task.status.statusID := Command.Status;
		task.internal.PLCOpen.status := Command.Status;
		task.status.ErrorState := SFCCurrentStep;

//		AlarmText := CONCAT(logStateChange_0.ModuleName, ' Step: ');
//		AlarmText := CONCAT(AlarmText, SFCCurrentStep);
//		gMachineAlarms.commandStatus := Command.StatusMessage;
//		gMachineAlarms.messageStatus := task.status.statusMessage;
//		vfAlarmEdgeSnippet( gMachineAlarms.components, gMachineAlarms.AUTOMATION_FAIL_COMMAND, AlarmText);

		SFCReset := 		TRUE;
		Command.Execute := 	FALSE;
		Command();
		
		

		logStateChange_0.State := logStateChange_0.State + 1; 
		
	ELSIF StepError THEN
		
		StepError := FALSE;
		
		logStateChange_0.StateName := CONCAT(SFCCurrentStep, ' - Error');
		//		task.status.statusID := this should be set by the erroring state;
		task.internal.PLCOpen.status := 	ERR_FUB_ENABLE_FALSE;
		task.status.ErrorState := SFCCurrentStep;

//		AlarmText := CONCAT(logStateChange_0.ModuleName, ' Step: ');
//		AlarmText := CONCAT(AlarmText, SFCCurrentStep);
//		AlarmText := CONCAT(AlarmText, ' (Step Error)');
//		gMachineAlarms.commandStatus := Command.StatusMessage;
//		gMachineAlarms.messageStatus := task.status.statusMessage;			
//		vfAlarmEdgeSnippet( gMachineAlarms.components, gMachineAlarms.AUTOMATION_FAIL, AlarmText);

		SFCReset := 		TRUE;
		Command.Execute := 	FALSE;
		Command();
		
		

		logStateChange_0.State := logStateChange_0.State + 1; 

	ELSE

		IF logStateChange_0.StateName <> SFCCurrentStep THEN
			logStateChange_0.State := logStateChange_0.State + 1; 
		END_IF	
		logStateChange_0.StateName := SFCCurrentStep;	
	END_IF		

	Command.pParameters := 0; 
	Command.sParameters := 0; 

	logStateChange_0.LoggerName:= 'App';
	ST_name( 0, ADR(logStateChange_0.ModuleName), ADR(group) );
	logStateChange_0();
	
	//	StepDone := FALSE;
	//	StepRetry := FALSE;

	IF NOT startStepActive AND _startStepActive THEN

		task.status.statusID := ERR_FUB_BUSY;
		task.status.ErrorState := '';
		task.status.statusMessage := '';
				
	END_IF	
	
	_startStepActive := startStepActive;
	startStepActive := FALSE;
	
END_ACTION

//Action running during step1
ACTION Step1Active: 

	logStateChange_0.State := 0;
	
	//If Step 1 is active, clear out any old fub statuses
	IF Command.Busy OR Command.Done OR Command.Aborted OR Command.Error THEN
		Command.Execute := 	FALSE;
		Command();		
	END_IF	

	//If we get here and have a busy status, it means we completed succefully
	IF NOT _startStepActive THEN
		IF task.status.statusID = ERR_FUB_BUSY THEN
			task.status.statusID := ERR_OK;
			task.internal.PLCOpen.status := ERR_OK;
		ELSE
			task.internal.PLCOpen.status := task.status.statusID;
		END_IF	
	END_IF	

	StepDone := FALSE;
	StepError := FALSE;
	
	IF messageHandler.msgId <> 0 THEN
		messageHandler.msgId := 0;
		MessageBox_RemoveMsg( messageHandler.msgId );
	END_IF

	startStepActive := TRUE;
	
END_ACTION

