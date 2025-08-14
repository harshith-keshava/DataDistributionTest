
ACTION SelectOperation: 

	CASE gMachineState.operation  OF
		MACH_OP_CALIBRATE_LASER:
			OP_CALIBRATE_LASER := TRUE;	
			task.status.statusID := 	ERR_FUB_BUSY;
			task.status.activeOperation:= 'Calibrate Laser';
		
		MACH_OP_OMS_TEST:
			OP_S_OMS_TEST := TRUE;	
			task.status.statusID := 	ERR_FUB_BUSY;
			task.status.activeOperation:= 'SOMS Test';
		
	END_CASE	
	
END_ACTION

ACTION ResetOperation: 

	OP_CALIBRATE_LASER := FALSE;
	OP_S_OMS_TEST := FALSE;

END_ACTION