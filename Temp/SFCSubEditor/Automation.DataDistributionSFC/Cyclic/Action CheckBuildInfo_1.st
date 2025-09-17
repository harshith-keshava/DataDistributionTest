
gPrintJobManagement.currentState.currentLayerNumber := 1;
IF gPrintJobManagement.currentState.buildInfoCheckValid THEN
	StepDone := TRUE;
ELSE
	//TODO:	task.status.statusID := SOME_ERROR;
	StepError := TRUE;
END_IF
