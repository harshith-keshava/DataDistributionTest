// initialize app with manual pulse pars; Will create directories for calibration test as well- Should be ok; Assuming data backup of last test to Nas is done by then
Command.Command := gVFLCR.command.initializeCalibration;

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
