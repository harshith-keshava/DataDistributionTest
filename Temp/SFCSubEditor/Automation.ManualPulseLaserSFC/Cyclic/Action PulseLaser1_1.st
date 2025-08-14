Command.Command := gVFLCR.command.manualPulse;

Command.pParameters := ADR(task.internal.manualPulse);
Command.sParameters := SIZEOF(task.internal.manualPulse);

Command.Execute := TRUE;
Command();

IF Command.Done THEN
	StepDone := TRUE;
	Command.Execute := FALSE;
	Command();
ELSE
	StepDone := FALSE;	
END_IF
