
buildDistCommand.Command := gBuildDistributorApi.commands.distributeLayerFile;
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
