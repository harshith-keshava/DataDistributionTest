
Command.Command := gPrintJobManagement.commands.updateLayerNumber;
Command.pParameters := ADR(task.internal.nextLayerNumber);
Command.sParameters := SIZEOF(task.internal.nextLayerNumber);
Command.Execute := TRUE;
Command();

StepDone := FALSE;
			
IF Command.Done THEN
	StepDone := TRUE;
	Command.Execute := FALSE;
	Command();		
ELSIF Command.Error OR Command.Aborted THEN
	StepError := TRUE;
END_IF
