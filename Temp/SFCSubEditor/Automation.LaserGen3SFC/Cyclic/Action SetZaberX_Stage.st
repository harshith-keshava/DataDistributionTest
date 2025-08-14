
// Set Zaber height and camera exposure
Command.Command := gVFLCR.command.setZaber1Pos;

Command.pParameters := ADR(task.internal.adjustZaber1);
Command.sParameters := SIZEOF(task.internal.adjustZaber1);

Command.Execute := TRUE;
Command();

IF Command.Done THEN
	StepDone := TRUE;
	Command.Execute := FALSE;
	Command();
ELSE
	
	StepDone := FALSE;
	
END_IF
