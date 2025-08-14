task.internal.actualPixelMapIndex :=0;
task.internal.totalZaberIndex :=0;
// Set Zaber height and camera exposure
Command.Command := gVFLCR.command.setZaber2PosAndExposure;

Command.pParameters := ADR(task.internal.adjustZaber2AndCamera);
Command.sParameters := SIZEOF(task.internal.adjustZaber2AndCamera);

Command.Execute := TRUE;
Command();

IF Command.Done THEN
	StepDone := TRUE;
	Command.Execute := FALSE;
	Command();
ELSE
	
	StepDone := FALSE;
	
END_IF
