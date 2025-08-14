// ---------------------------------------------------------------------------
// This function block implments a timer with an similar interface to the
// TON function block but with a resolution that matches the scan time of
// the task from which it is called (specifed by ScanTimeMicrosec).
// ---------------------------------------------------------------------------
FUNCTION_BLOCK VF_COMMON_TON_ScanMicrosec
	
	IF (IN AND enabled) THEN
		scanCount := scanCount + 1;
		ET := scanCount * ScanTimeMicrosec;
		IF (scanCount >= scanCountTarget) THEN
			Q := TRUE;
			scanCount := scanCount - 1;
		END_IF
	ELSE
		enabled := FALSE;
		Q := FALSE;
		ET := 0;
		scanCount := 0;
	END_IF

	// Wait for leading edge of the enable signal.
	IF (IN AND NOT enabled) THEN
		enabled := TRUE;
		Q := FALSE;	
		ET := 0;		
		// Scan count target is rounded down to the nearest integer value.
		IF (ScanTimeMicrosec <= 0) THEN
			ScanTimeMicrosec := 2000;
		END_IF
		scanCountTarget := REAL_TO_UDINT(brmfloor(UDINT_TO_REAL(PT) / UDINT_TO_REAL(ScanTimeMicrosec)));
	END_IF

END_FUNCTION_BLOCK