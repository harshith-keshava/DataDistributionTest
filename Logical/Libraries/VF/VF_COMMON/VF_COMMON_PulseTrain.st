// ---------------------------------------------------------------------------
// This function block generates a pulse train of one or more pulses with an
// optional starting delay. It uses a standard TON function block with a 
// 10 msec resolution.
// ---------------------------------------------------------------------------
FUNCTION_BLOCK VF_COMMON_PulseTrain


	IF (Enable AND enabled) THEN
	
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
			TON_StartDelay.PT := StartDelay;
			TON_StartDelay.IN := TRUE;
		END_IF		
	
		IF (PulseOnTime < 10) THEN	// minimum 10 msec
			PulseOnTime := 10;
		END_IF
		TON_OnState.PT := PulseOnTime;
		TON_OnState.IN := FALSE;
	
		IF (PulseOffTime < 10) THEN	// minimum 10 msec
			PulseOffTime := 10;
		END_IF
		TON_OffState.PT := PulseOffTime;
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