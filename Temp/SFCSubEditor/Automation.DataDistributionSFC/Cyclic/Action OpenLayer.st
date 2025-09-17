Command.Command :=  gVFLCR.command.openLayer;
//TODO: VALIDATE THIS  IS CORRECT!
openLayerParameters.parameters.selectedBuildLayout :=	gPrintJobManagement.currentState.buildLayout;
openLayerParameters.parameters.selectedLayer :=			gPrintJobManagement.currentState.currentLayerNumber;
openLayerParameters.parameters.selectedPrintNumber :=	gPrintJobManagement.currentState.printNumber;
Command.pParameters := ADR(openLayerParameters); 
Command.sParameters := SIZEOF(openLayerParameters);
Command.Execute := TRUE;
Command();
IF Command.Done THEN
	StepDone := TRUE;
	Command.Execute := FALSE;
	Command();
ELSE
	StepDone := FALSE;	
END_IF
