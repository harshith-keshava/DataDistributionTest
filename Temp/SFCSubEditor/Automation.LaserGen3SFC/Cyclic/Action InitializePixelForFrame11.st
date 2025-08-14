Command.Command := gVFLCR.command.initializePixelForFrame;

task.internal.initializePixelParameters.activePixelIndex := task.internal.activePixelIndex;

Command.pParameters := ADR(task.internal.initializePixelParameters);
Command.sParameters := SIZEOF(task.internal.initializePixelParameters);

Command.Execute := TRUE;
Command();

IF Command.Done THEN
	StepDone := TRUE;
	Command.Execute := FALSE;
	Command();
ELSE
	
	StepDone := FALSE;
	
END_IF
