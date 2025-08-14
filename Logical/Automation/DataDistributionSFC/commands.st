
ACTION SelectOperation: 

	CASE gMachineState.operation  OF
		
		MACH_OP_START_DISTRIBUTION:
			OP_START_DISTRIBUTION := TRUE;	
			task.status.statusID := 	ERR_FUB_BUSY;
			task.status.activeOperation:= 'Distribution Started';
		
		MACH_OP_ABORT_DISTRIBUTION:
			OP_ABORT_DISTRIBUTION := TRUE;	
			task.status.statusID := 	ERR_FUB_BUSY;
			task.status.activeOperation:= 'Distribution Aborted';
		
	END_CASE	
	
END_ACTION

ACTION ResetOperation: 

	OP_START_DISTRIBUTION := FALSE;
	OP_ABORT_DISTRIBUTION := FALSE;

END_ACTION