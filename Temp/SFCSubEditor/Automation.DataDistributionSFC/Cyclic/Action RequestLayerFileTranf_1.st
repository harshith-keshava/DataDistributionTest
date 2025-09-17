
buildDistCommand.Command := gBuildDistributorApi.commands.distributeLayerFile;
buildDistCommand.Execute := TRUE;
buildDistCommand();


IF buildDistCommand.Done THEN
	
	StepDone := TRUE;
	
ELSIF buildDistCommand.Error OR buildDistCommand.Aborted THEN
	
	StepDone := FALSE;
	StepError := TRUE;

END_IF
