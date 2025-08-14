
PROGRAM _INIT
	
	Name := 'LCR System';
	
	
END_PROGRAM

PROGRAM _CYCLIC
	
	// VF-LCR code is based on Gen 2 v3.18.0
	
	///////////////////////////////////////////////////////////////
	// API:
	//	Requires:
	//	- nothing
	//	Commands:
	//	- manualPulse 				- Sets up parameters and distributes the manual pulse commands to the VFLCR_Operations
	//	- manualPulseAbort 			- Cancel all manual pulse commands
	//  Statuses:
	//	- cycleOKFailCount_PLK2		- the number of cycles that had a Powerlink cycle error
	//	- syncOKFailCount_PLK2		- the number of cycles that had a Powerlink synchronization error
	//	- plkErrorDetected			- there is a Powerlink cycle or synchronization error
	//	- manualModeEnabled			- manual mode is enabled for all racks, respecting ignores
	//	- autoModeEnabled			- auto mode is enabled for all racks, respecting ignores
	//	Inhbitits:
	//	- nothing
	///////////////////////////////////////////////////////////////
	
	// Call Piper
	//PiperModuleInterface;
	
	// Read in external components
	
	// Read external states

	IF task.command.rebootPLC THEN
		task.internal.rebootPLC := TRUE;
	END_IF
	
	//IF task.internal.rebootPLC <> 0 THEN
		
	IF task.command.confirmReboot  THEN
			
		task.internal.rebootPLC := FALSE;
		SYSreset(TRUE, SYSLIB_WARMSTART);
			
	END_IF

	IF task.command.closePopup THEN
		
		task.internal.rebootPLC := FALSE;
		
	END_IF
	 	
	// Layer commands
	IF task.command.openLayer THEN
		// pars set by hmi
		task.internal.openLayerCommand.Execute := TRUE;
	END_IF
	
	IF task.command.abortLayer THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.abortLayer;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF
	
	task.internal.openLayerCommand.Command := gVFLCR.command.openLayer;
	task.internal.openLayerCommand.pParameters := ADR(task.parameters.openLayer);
	task.internal.openLayerCommand.sParameters := SIZEOF(task.parameters.openLayer);
	task.internal.openLayerCommand();
	task.internal.openLayerCommand.Execute := FALSE;
	
	// If we get an abort command, ensure that the manual pulse start gets errored

	
	task.internal.atnSystemCommand();
	task.internal.atnSystemCommand.Execute := FALSE;
	
	task.status.racksOnline := stateAllTrue(gVFLCR.status.rackOnline, FALSE);

	
END_PROGRAM

PROGRAM _EXIT
	 
END_PROGRAM

