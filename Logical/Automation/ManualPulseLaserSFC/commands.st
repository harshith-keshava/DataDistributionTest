
ACTION SelectOperation: 

	CASE gMachineState.operation  OF
		
		MACH_OP_MANUAL_CALIBRATE_LASER:
			OP_MANUAL_CALIBRATE_LASER := TRUE;	
			task.status.statusID := 	ERR_FUB_BUSY;
			task.status.activeOperation:= 'Manual Pulse Laser for Laser Cal';
		
		MACH_OP_MANUAL_CALIBRATE_BEAM:
			OP_MANUAL_CALIBRATE_BEAM := TRUE;	
			task.status.statusID := 	ERR_FUB_BUSY;
			task.status.activeOperation:= 'Manual Pulse Laser for Beam Cal';
		
	END_CASE	
	
END_ACTION

ACTION ResetOperation: 

	OP_MANUAL_CALIBRATE_LASER := FALSE;

END_ACTION