
// initialize app with manual pulse pars
Command.Command := gVFLCR.command.initializeManualCalibration;

Command.pParameters := ADR(gManualPulseTypeSelected);
Command.sParameters := SIZEOF(gManualPulseTypeSelected);

Command.Execute := TRUE;
Command();

IF Command.Done THEN
	StepDone := TRUE;
	Command.Execute := FALSE;
	Command();
ELSE
	
	StepDone := FALSE;
	
END_IF
