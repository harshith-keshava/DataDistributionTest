Command.Command :=  gVFLCR.command.abortLayer;
Command.Execute := TRUE;
Command();
IF Command.Done THEN
	StepDone := TRUE;
	Command.Execute := FALSE;
	Command();
ELSE
	StepDone := FALSE;	
END_IF
