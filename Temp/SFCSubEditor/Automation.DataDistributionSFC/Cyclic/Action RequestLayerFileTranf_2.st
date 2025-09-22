
buildDistCommand.Command := gBuildDistributorApi.commands.distributeLayerFile;
buildDistCommand.Execute := TRUE;
buildDistCommand();

IF buildDistCommand.Done OR  gPrintJobManagement.status.distributionLayerComplete OR (gOpcData_FromBuildPC.CurrentDistributionLayer = gOpcData_ToBuildPC.CurrentPrintLayer) THEN
	
	StepDone := TRUE;
	gPrintJobManagement.status.distributionLayerComplete := FALSE;
	buildDistCommand.Execute := FALSE;
	buildDistCommand();
ELSIF buildDistCommand.Error OR buildDistCommand.Aborted THEN
	
	StepDone := FALSE;
	StepError := TRUE;
	buildDistCommand.Execute := FALSE;
	buildDistCommand();

END_IF
