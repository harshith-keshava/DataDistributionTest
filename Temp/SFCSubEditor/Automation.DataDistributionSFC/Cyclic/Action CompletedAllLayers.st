task.internal.completedLayers := TRUE;

IF task.command.closePopup THEN
		
	task.internal.completedLayers := FALSE;
	StepDone := TRUE;
		
END_IF