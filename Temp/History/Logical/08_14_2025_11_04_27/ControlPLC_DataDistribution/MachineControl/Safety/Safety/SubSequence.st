
ACTION ResetAllSafetySubsequence: 
	
	CASE task.status.sequence OF
		
		SEQUENCE_EXECUTE_SAFETY_RESET:
			
			//reset machine safety
			task.internal.fbResetMachineOnPulse.StartDelay := 0;
			task.internal.fbResetMachineOnPulse.PulseOnTime := 1000;
			task.internal.fbResetMachineOnPulse.PulseOffTime := 500;
			task.internal.fbResetMachineOnPulse.NumPulses := 2;
			task.internal.fbResetMachineOnPulse.Enable := TRUE;
			
			//reset laser safety
			task.internal.fbResetLaserOnPulse.StartDelay := 0;
			task.internal.fbResetLaserOnPulse.PulseOnTime := 1000;
			task.internal.fbResetLaserOnPulse.PulseOffTime := 500;
			task.internal.fbResetLaserOnPulse.NumPulses := 2;
			task.internal.fbResetLaserOnPulse.Enable := TRUE;
					
			task.status.sequence := SEQUENCE_WAITING_FOR_MACH_SAFETY;
		
		SEQUENCE_RESET_MACHINE_SAFETY:
			
			//hold reset signal to safety PLC for one pulse 
			IF (task.internal.fbResetMachineOnPulse.Done) THEN 
				task.internal.fbResetLaserOnPulse.Enable := FALSE;
				task.internal.fbResetMachineOnPulse.Enable := FALSE;
				task.status.sequence := SEQUENCE_WAITING_FOR_MACH_SAFETY;
			END_IF
			
		SEQUENCE_WAITING_FOR_MACH_SAFETY:
			
			task.internal.safetyTimeout.IN := TRUE;
			
			IF task.internal.safetyTimeout.Q THEN
				task.status.sequence := SEQUENCE_ERROR;
			END_IF
			
		//	IF IO.safeLOGIC.Status.SafetyReset_EStops THEN
				task.status.sequence := SEQUENCE_RESET_LASER_SAFETY;
		//	END_IF
			
		
			
		SEQUENCE_RESET_LASER_SAFETY:
			
			//hold reset signal to safety PLC for one pulse 
			IF (task.internal.fbResetLaserOnPulse.Done) THEN 
				task.internal.fbResetLaserOnPulse.Enable := FALSE;
				task.internal.fbResetMachineOnPulse.Enable := FALSE;
				task.status.sequence := SEQUENCE_WAITING_FOR_LSR_SAFETY;
			END_IF
			
			
		
		SEQUENCE_WAITING_FOR_LSR_SAFETY:
			
			task.internal.safetyTimeout.IN := TRUE;
			
			IF task.internal.safetyTimeout.Q THEN
				task.status.sequence := SEQUENCE_ERROR;
			END_IF
			
		
	//		IF IO.safeLOGIC.Status.SafetyReset_Lasers THEN
				task.status.sequence := SEQUENCE_DONE;
	//		END_IF
		

		
	END_CASE
	
	
END_ACTION




