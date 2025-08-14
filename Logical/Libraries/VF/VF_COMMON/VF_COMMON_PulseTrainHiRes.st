// ---------------------------------------------------------------------------
// This function block generates a pulse train of one or more pulses with an
// optional starting delay. It uses a the TON_ScanTimeMicrosec function block
// in this libarary to enable pulse resolution down to the scan time of
// the task from which it is called.
// ---------------------------------------------------------------------------
FUNCTION_BLOCK VF_COMMON_PulseTrainHiRes

	IF (Enable AND enabled) THEN
	
		TON_StartDelay.ScanTimeMicrosec := ScanTimeMicrosec;
		TON_OnState.ScanTimeMicrosec := ScanTimeMicrosec;
		TON_OffState.ScanTimeMicrosec := ScanTimeMicrosec;
		
		// If time to start the pulse train...
		IF (StartDelay = 0) OR (TON_StartDelay.Q) THEN
	
			IF (startedPulses = FALSE) THEN
				PulseOutput := TRUE;
				startedPulses := TRUE;
			END_IF
				
			// If not done producing pulses...
			IF (NumPulses = 0) OR (CTU_PulseCounter.Q = FALSE) THEN
			
				IF (TON_OnState.Q) THEN			// on timer is done, turn output OFF
					PulseOutput := FALSE;
					IF (NumPulses > 0) THEN
						CTU_PulseCounter.CU := TRUE;
					END_IF
				END_IF
				IF (TON_OffState.Q) THEN		// off timer is done, turn output ON
					PulseOutput := TRUE;
				END_IF
							
				IF (PulseOutput = FALSE) THEN	// time the OFF state
					TON_OnState.IN := FALSE; 
					TON_OffState.IN := TRUE;
				ELSE 							// time the ON state
					TON_OnState.IN := TRUE;
					TON_OffState.IN := FALSE;
				END_IF
			
				// Turn on the 'PulseOutputOneScan' output at the start of each pulse.
				PulseOutputOneScan := FALSE;
				IF (PulseOutput) THEN
					IF (NOT pulseHistory) THEN
						pulseHistory := TRUE;
						PulseOutputOneScan := TRUE;
					END_IF
				ELSE
					pulseHistory := FALSE;
				END_IF
						
			ELSIF (CTU_PulseCounter.Q = TRUE) AND (TON_OffState.Q = TRUE) THEN	// done producing pulses
				Done := TRUE;
			END_IF
		
		END_IF
	ELSE
		enabled := FALSE;
		startedPulses := FALSE;
		pulseHistory := FALSE;
		TON_StartDelay.IN := FALSE;
		TON_OnState.IN := FALSE;
		TON_OffState.IN := FALSE;
		CTU_PulseCounter.RESET := FALSE;
		PulseOutput := FALSE;	
		PulseOutputOneScan := FALSE;	
		Done := FALSE;
	END_IF


	// Wait for leading edge, enable start delay, reset internal pulse timers/counter.
	IF (Enable AND NOT enabled) THEN
		enabled := TRUE;
		Done := FALSE;
	
		IF (StartDelay > 0) THEN
			TON_StartDelay.PT := StartDelay * 1000;
			TON_StartDelay.IN := TRUE;
		END_IF		
	
		TON_OnState.PT := PulseOnTime * 1000;
		TON_OnState.IN := FALSE;
	
		TON_OffState.PT := PulseOffTime * 1000;
		TON_OffState.IN := FALSE;
	
		CTU_PulseCounter.PV := NumPulses;
		CTU_PulseCounter.CU := FALSE;
		CTU_PulseCounter.RESET := TRUE;	
		startedPulses := FALSE;
	END_IF


	TON_StartDelay();
	TON_OnState();
	TON_OffState();
	CTU_PulseCounter();
	CTU_PulseCounter.CU := FALSE;
	CTU_PulseCounter.RESET := FALSE;
	CTU_PulseCounter();
	NumPulsesCompleted := CTU_PulseCounter.CV;

END_FUNCTION_BLOCK