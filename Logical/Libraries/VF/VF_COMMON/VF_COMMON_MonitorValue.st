
 (* Convert a raw input value (INT) to a scaled value and monitor it for warning/alarm limits *)
FUNCTION_BLOCK VF_COMMON_MonitorValue


	IF (Enable) THEN

		// Update configuration on the first pass and on the rising edge of .UpdateConfiguration.
		// This prevents unnecessary code from running once the scaling and limits are established.
		IF (pValueConfig.UpdateConfiguration) OR (NOT initialized) THEN
		
			// Invert the linear scale in order to convert the alarm limits from scaled (engineering) values to raw (system) values.
			// The raw values are rounded to the nearest integer as required by the LCRLimScal() function block.
			fbLCRLimitScale.x1 := pValueConfig.Scale.EngineeringMin;
			fbLCRLimitScale.x2 := pValueConfig.Scale.EngineeringMax;
			fbLCRLimitScale.y1 := INT_TO_REAL(pValueConfig.Scale.RawMin);
			fbLCRLimitScale.y2 := INT_TO_REAL(pValueConfig.Scale.RawMax);
				
			// Configure out of range limits.
			maxValidRaw := pValueConfig.Limits.MaxValidRawValue;
			minValidRaw := pValueConfig.Limits.MinValidRawValue;
			enOutOfRange := pValueConfig.Limits.EnableOutOfRange;
			outOfRangeDelay := pValueConfig.Limits.DelayOutOfRange_msec;
			TON_OutOfRangeDelay.PT := REAL_TO_TIME(outOfRangeDelay);
			TON_OutOfRangeDelay.IN := FALSE;
		
			// Configure ALARM limits, if enabled.
			enLowerAlarm := pValueConfig.Limits.LowerAlarm.EnableLimit;
			enUpperAlarm := pValueConfig.Limits.UpperAlarm.EnableLimit;
			alarmDelay := pValueConfig.Limits.DelayAlarm_msec;
			TON_AlarmDelay.PT := REAL_TO_TIME(alarmDelay);
			TON_AlarmDelay.IN := FALSE;		

			// Calculate the raw value representing a scaled value of zero.			
			fbLCRLimitScale(x := 0.0);
			scaledZero := fbLCRLimitScale.y;

			fbLC3PointHysteresisAlarm.enable := (enLowerAlarm OR enUpperAlarm);
			IF (enLowerAlarm) THEN
				fbLCRLimitScale(x := pValueConfig.Limits.LowerAlarm.ScaledValue);
				fbLC3PointHysteresisAlarm.xsetvalue1 := REAL_TO_INT(fbLCRLimitScale.y);						
				fbLCRLimitScale(x := pValueConfig.Limits.LowerAlarm.ScaledHysteresis); 
				fbLC3PointHysteresisAlarm.hysteresis1 := REAL_TO_UINT(fbLCRLimitScale.y - scaledZero);			
			ELSE
				fbLC3PointHysteresisAlarm.xsetvalue1 := -32768;
				fbLC3PointHysteresisAlarm.hysteresis1 := 0;	
			END_IF
			IF (enUpperAlarm) THEN	
				fbLCRLimitScale(x := pValueConfig.Limits.UpperAlarm.ScaledValue);
				fbLC3PointHysteresisAlarm.xsetvalue2 := REAL_TO_INT(fbLCRLimitScale.y);
				fbLCRLimitScale(x := pValueConfig.Limits.UpperAlarm.ScaledHysteresis);
				fbLC3PointHysteresisAlarm.hysteresis2 := REAL_TO_UINT(fbLCRLimitScale.y - scaledZero);			
			ELSE
				fbLC3PointHysteresisAlarm.xsetvalue2 := 32767;
				fbLC3PointHysteresisAlarm.hysteresis2 := 0;
			END_IF
			fbLC3PointHysteresisAlarm.ymax := 1;	// above upper limit
			fbLC3PointHysteresisAlarm.ymid := 0;	// within limits
			fbLC3PointHysteresisAlarm.ymin := -1;	// below lower limit
			// Set the starting point midway between the two setpoints.	
			fbLC3PointHysteresisAlarm.xstart := fbLC3PointHysteresisAlarm.xsetvalue1 + ((fbLC3PointHysteresisAlarm.xsetvalue2 - fbLC3PointHysteresisAlarm.xsetvalue1) / 2);		
		
			// Configure WARNING limits, if enabled.
			enLowerWarn := pValueConfig.Limits.LowerWarning.EnableLimit;
			enUpperWarn := pValueConfig.Limits.UpperWarning.EnableLimit;
			warningDelay := pValueConfig.Limits.DelayWarning_msec;		
			TON_WarningDelay.PT := REAL_TO_TIME(warningDelay);
			TON_WarningDelay.IN := FALSE;
			
			fbLC3PointHysteresisWarning.enable := (enLowerWarn OR enUpperWarn);
			IF (enLowerWarn) THEN
				fbLCRLimitScale(x := pValueConfig.Limits.LowerWarning.ScaledValue); 
				fbLC3PointHysteresisWarning.xsetvalue1 := REAL_TO_INT(fbLCRLimitScale.y);
				fbLCRLimitScale(x :=  pValueConfig.Limits.LowerWarning.ScaledHysteresis); 
				fbLC3PointHysteresisWarning.hysteresis1 := REAL_TO_UINT(fbLCRLimitScale.y - scaledZero);		
			ELSE
				fbLC3PointHysteresisWarning.xsetvalue1 := -32768;
				fbLC3PointHysteresisWarning.hysteresis1 := 0;	
			END_IF
			IF (enUpperWarn) THEN	
				fbLCRLimitScale(x := pValueConfig.Limits.UpperWarning.ScaledValue); 
				fbLC3PointHysteresisWarning.xsetvalue2 := REAL_TO_INT(fbLCRLimitScale.y);
				fbLCRLimitScale(x := pValueConfig.Limits.UpperWarning.ScaledHysteresis); 
				fbLC3PointHysteresisWarning.hysteresis2 := REAL_TO_UINT(fbLCRLimitScale.y - scaledZero);
			ELSE
				fbLC3PointHysteresisWarning.xsetvalue2 := 32767;
				fbLC3PointHysteresisWarning.hysteresis2 := 0;
			END_IF
			fbLC3PointHysteresisWarning.ymax := 1;	// above upper limit
			fbLC3PointHysteresisWarning.ymid := 0;	// within limits
			fbLC3PointHysteresisWarning.ymin := -1;	// below lower limit
			// Set the starting point midway between the two setpoints.	
			fbLC3PointHysteresisWarning.xstart := fbLC3PointHysteresisWarning.xsetvalue1 + ((fbLC3PointHysteresisWarning.xsetvalue2 - fbLC3PointHysteresisWarning.xsetvalue1) / 2);		
		
			// Set the linear scale in order to conver the raw (system) input value to a scaled (engineering) output value.
			fbLCRLimitScale.x1 := INT_TO_REAL(pValueConfig.Scale.RawMin);
			fbLCRLimitScale.x2 := INT_TO_REAL(pValueConfig.Scale.RawMax);
			fbLCRLimitScale.y1 := pValueConfig.Scale.EngineeringMin;
			fbLCRLimitScale.y2 := pValueConfig.Scale.EngineeringMax;
				
			// Set up the moving window size.
			IF (pValueConfig.MovingWindowLength > 0) THEN
				enableStatistics := TRUE;
				pValue.Statistics.Reset := TRUE;
				pValue.Statistics();
				pValue.Statistics.MovingWindowLength := pValueConfig.MovingWindowLength;
				pValue.Statistics.Enable := TRUE;
				pValue.Statistics();
			ELSE
				enableStatistics := FALSE;
				pValue.Statistics.Enable := FALSE;
				pValue.Statistics();
			END_IF
				
			initialized := TRUE;
			lastRawValue := 0;
			lastScaledValue := 0.0;
		
			// Reset the update configuration flag to indicate completion.
			IF (pValueConfig.UpdateConfiguration) THEN 
				pValueConfig.UpdateConfiguration := FALSE;
			END_IF
		END_IF

		
		// Update the value structure with the input raw value and its status.
		pValue.Disabled := FALSE;
		pValue.RawValue := RawValue;		
		// Fixed 2 second delay to prevent disconnected sensor with dithering IO status bits (e.g. underflow/overflow) from participating the scaling code.
		fbTONRawValueValid.IN := RawValueIsValid;
		fbTONRawValueValid.PT := T#20ms;
		pValue.ValueIsValid := fbTONRawValueValid.Q;
		
		// If the raw value is valid, monitor the alarm and warning conditions with hysterisis;
		// otheriwse, the output value remains at its last valid value and the alarm/warning outputs are set to FALSE.
		IF (fbTONRawValueValid.Q) THEN	
			
			// Capture the raw value, adjusted by any specified raw offset.
			lastRawValue := RawValue + pValueConfig.Scale.RawOffset;
			
			// Convert the raw value to a scaled value.
			fbLCRLimitScale(x := lastRawValue);			
			pValue.ScaledValue_NonAveraged := fbLCRLimitScale.y;
			lastScaledValue := pValue.ScaledValue_NonAveraged;
								
			// If statistics are enabled, add the value and recompute staticstics.	
			IF (enableStatistics) THEN
				pValue.Statistics.In := lastScaledValue;
				pValue.Statistics();
				pValue.ScaledValue := pValue.Statistics.Mean;
			ELSE
				pValue.ScaledValue := lastScaledValue;
			END_IF						
						
			// If the raw value is on or outside of the limits, flag the out of range condition.
			IF (enOutOfRange) AND (NOT InhibitAlarms) THEN
				haveOver := (lastRawValue >= maxValidRaw);
				haveUnder := (lastRawValue <= minValidRaw);
				// Delay the range output if a non-zero time (in msec) was specified.
				IF (outOfRangeDelay > 0) THEN
					TON_OutOfRangeDelay.IN := (haveUnder OR haveOver);
					pValue.Status.OverRange := (TON_OutOfRangeDelay.Q AND haveOver);
					pValue.Status.UnderRange := (TON_OutOfRangeDelay.Q AND haveUnder);
				ELSE
					TON_OutOfRangeDelay.IN := FALSE;
					pValue.Status.OverRange := haveOver;
					pValue.Status.UnderRange := haveUnder;
				END_IF
			ELSE
				pValue.Status.OverRange := FALSE;
				pValue.Status.UnderRange := FALSE;		
			END_IF
				
			InternalErrorCode := 0;				
		
			// Check for ALARM conditions based on input value (LC3PHy() function block takes care of hysteresis).
			// Error code (if any) from the LC3PHy function blocks are reported on the InternalErrorCode output.
			fbLC3PointHysteresisAlarm(x := lastRawValue);
			IF (NOT InhibitAlarms) THEN
				errorCode := fbLC3PointHysteresisAlarm.status;
				IF (errorCode <> 0) AND (enLowerAlarm OR enUpperAlarm) THEN
					InternalErrorCode := errorCode;
					pValue.Status.UpperAlarmTripped := TRUE;
					pValue.Status.LowerAlarmTripped := TRUE;
				ELSE
					haveUpperAlarm := SEL(enUpperAlarm, FALSE, fbLC3PointHysteresisAlarm.ymx);
					haveLowerAlarm := SEL(enLowerAlarm, FALSE, fbLC3PointHysteresisAlarm.ymn); 
					// Delay the alarm output if a non-zero time (in msec) was specified.
					IF (alarmDelay > 0) THEN
						TON_AlarmDelay.IN := (haveUpperAlarm OR haveLowerAlarm);	
						pValue.Status.UpperAlarmTripped := (TON_AlarmDelay.Q AND haveUpperAlarm);
						pValue.Status.LowerAlarmTripped := (TON_AlarmDelay.Q AND haveLowerAlarm);
					ELSE
						TON_AlarmDelay.IN := FALSE;
						pValue.Status.UpperAlarmTripped := haveUpperAlarm;
						pValue.Status.LowerAlarmTripped := haveLowerAlarm;
					END_IF			
				END_IF	
			ELSE
				pValue.Status.UpperAlarmTripped := FALSE;
				pValue.Status.LowerAlarmTripped := FALSE;		
			END_IF	
		
			// Check for WARNING conditions based on input value (LC3PHy() function block takes care of hysteresis).
			fbLC3PointHysteresisWarning(x := lastRawValue);
			IF (NOT InhibitAlarms) THEN		
				errorCode := fbLC3PointHysteresisWarning.status;
				IF (errorCode <> 0) AND (enLowerWarn OR enUpperWarn) THEN
					IF (InternalErrorCode = 0) THEN  // only set error code if it was not already set above
						InternalErrorCode := errorCode;
					END_IF
					pValue.Status.UpperWarningTripped := TRUE;
					pValue.Status.LowerWarningTripped := TRUE;
				ELSE		
					haveUpperWarn := SEL(enUpperWarn, FALSE, fbLC3PointHysteresisWarning.ymx);
					haveLowerWarn := SEL(enLowerWarn, FALSE, fbLC3PointHysteresisWarning.ymn);
					// Delay the warning output if a non-zero time (in msec) was specified.
					IF (warningDelay > 0) THEN
						TON_WarningDelay.IN := (haveUpperWarn OR haveLowerWarn);	
						pValue.Status.UpperWarningTripped := (TON_WarningDelay.Q AND haveUpperWarn);
						pValue.Status.LowerWarningTripped := (TON_WarningDelay.Q AND haveLowerWarn);
					ELSE
						TON_WarningDelay.IN := FALSE;
						pValue.Status.UpperWarningTripped := haveUpperWarn;
						pValue.Status.LowerWarningTripped := haveLowerWarn;
					END_IF						
				END_IF	
			ELSE
				pValue.Status.UpperWarningTripped := FALSE;
				pValue.Status.LowerWarningTripped := FALSE;
			END_IF		
		
			pValue.AlarmsInhibited := InhibitAlarms;
			
			// Set Status LED color based on current status.
			IF (InhibitAlarms) THEN
				pValue.LEDState := DINT_TO_USINT(LED_Gray);
			ELSIF (pValue.Status.OverRange OR pValue.Status.UnderRange) THEN
				pValue.LEDState := DINT_TO_USINT(LED_Blue);
			ELSIF (pValue.Status.LowerAlarmTripped OR pValue.Status.UpperAlarmTripped) THEN
				pValue.LEDState := DINT_TO_USINT(LED_Red);
			ELSIF (pValue.Status.LowerWarningTripped OR pValue.Status.UpperWarningTripped) THEN
				pValue.LEDState := DINT_TO_USINT(LED_Yellow);
			ELSE
				pValue.LEDState := DINT_TO_USINT(LED_Green);
			END_IF
			
		ELSE  // IF (RawValueIsValid)
			
			pValue.ScaledValue := lastScaledValue;
			pValue.ScaledValue_NonAveraged := lastScaledValue;
			pValue.AlarmsInhibited := InhibitAlarms;
			pValue.Status.OverRange := NOT InhibitAlarms;
			pValue.Status.UnderRange := NOT InhibitAlarms;	
			pValue.Status.UpperAlarmTripped := FALSE;
			pValue.Status.UpperWarningTripped := FALSE;
			pValue.Status.LowerWarningTripped := FALSE;
			pValue.Status.LowerAlarmTripped := FALSE;
			pValue.LEDState := DINT_TO_USINT(LED_Gray);
			InternalErrorCode := 0;	
			TON_OutOfRangeDelay.IN := FALSE;		
			TON_AlarmDelay.IN := FALSE;
			TON_WarningDelay.IN := FALSE;		
		END_IF
		
	ELSE  // IF (Enable)
	
		initialized := FALSE;
		pValue.RawValue := 0;
		pValue.ScaledValue := 0.0;
		pValue.ScaledValue_NonAveraged := 0.0;
		pValue.ValueIsValid := FALSE;
		pValue.Disabled := TRUE;	
		pValue.AlarmsInhibited := FALSE;
		pValue.Status.OverRange := FALSE;
		pValue.Status.UnderRange := FALSE;	
		pValue.Status.UpperAlarmTripped := FALSE;
		pValue.Status.UpperWarningTripped := FALSE;
		pValue.Status.LowerWarningTripped := FALSE;
		pValue.Status.LowerAlarmTripped := FALSE;
		pValue.LEDState :=  DINT_TO_USINT(LED_OFF);
		InternalErrorCode := 0;	
		fbTONRawValueValid.IN := FALSE;
		TON_OutOfRangeDelay.IN := FALSE;
		TON_AlarmDelay.IN := FALSE;
		TON_WarningDelay.IN := FALSE;
		
	END_IF		
	
	fbTONRawValueValid();
	TON_OutOfRangeDelay();
	TON_AlarmDelay();
	TON_WarningDelay();

END_FUNCTION_BLOCK