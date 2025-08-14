
PROGRAM _INIT
	
	IO.do.counterReset := TRUE;
	
	subscribePLCOpen(gVFLCR.command.openLayer, 'VFPTR_System', task.command.pulseCounterReset, task.internal.PLCOpenCounterReset);
	subscribePLCOpen(gVFLCR.command.abortLayer, 'VFPTR_System', task.command.endTrajectory, task.internal.PLCOpenTrajectory);
	
	// Set timeout
	task.internal.openLayerTON.PT := T#5s;
		 
END_PROGRAM

PROGRAM _CYCLIC
	
	// Read external states
	task.status.ready := TRUE;
	
	///////////////////////////////////////////////////////////////
	// Handle any canceled commands that are required
	///////////////////////////////////////////////////////////////
	IF task.internal.newCommand THEN
	
		task.status.sequence := SEQUENCE_IDLE;
		
	END_IF
	

	
	
	

	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

