// initialize app with manual pulse pars
//Command.Command := gVFLCR.command.initializeManualCalibration;



//Command.Execute := TRUE;
//Command();

IF Command.Done THEN
	StepDone := TRUE;
	Command.Execute := FALSE;
	Command();
ELSE
	
	StepDone := FALSE;
	
END_IF
