Command.Command := gVFLCR.command.manualPulse;

Command.pParameters := ADR(task.internal.manualPulse);
Command.sParameters := SIZEOF(task.internal.manualPulse);

Command.Execute := TRUE;
Command();

IF Command.Done THEN
	StepDone := TRUE;
	Command.Execute := FALSE;
	Command();
ELSIF Command.Error THEN
	IF task.internal.failedImageCaptureRetry < task.internal.numOfRetries THEN
		RePulse := TRUE;
		task.internal.failedImageCaptureRetry := task.internal.failedImageCaptureRetry +1;
		Command.Execute := FALSE;
		Command();
	ELSE
		task.internal.failedImageCaptureRetry := 0;
		RePulse := FALSE;
		StepDone := TRUE;
		Command.Execute := FALSE;
		Command();
	END_IF
END_IF
