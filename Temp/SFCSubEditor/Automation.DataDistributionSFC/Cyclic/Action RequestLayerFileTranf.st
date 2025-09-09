
buildDistCommand.Command := gBuildDistributorApi.commands.distributeLayerFile;
buildDistCommand.pParameters := ADR(task.internal.nextLayerNumber);
buildDistCommand.sParameters := SIZEOF(task.internal.nextLayerNumber);
buildDistCommand.Execute := TRUE;
buildDistCommand();


IF buildDistCommand.Busy THEN
	
	StepDone := TRUE;
	
ELSIF buildDistCommand.Error OR buildDistCommand.Aborted THEN
	
	StepDone := FALSE;
	StepError := TRUE;

ELSE
	StepDone := FALSE;	
	StepRetry := FALSE;
END_IF
