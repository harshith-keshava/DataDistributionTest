
 (* Convert a scaled input value to a raw value (INT) for analog output *)
FUNCTION_BLOCK VF_COMMON_ControlValue


	IF (Enable) THEN

		// Update configuration on the first pass and on the rising edge of .UpdateConfiguration.
		// This prevents unnecessary code from running once the scaling and limits Convert a scaled input value to a raw value (INT) for analog outputssfare established.
		IF (pValueConfig.UpdateConfiguration AND NOT updateConfigComplete) OR (NOT initialized) THEN

			// Set the linear scale in order to convert from the scaled (engineering) value ot the raw (system) output value.
			fbLCRLimitScale.x1 := pValueConfig.Scale.EngineeringMin;
			fbLCRLimitScale.x2 := pValueConfig.Scale.EngineeringMax;
			fbLCRLimitScale.y1 := INT_TO_REAL(pValueConfig.Scale.RawMin);
			fbLCRLimitScale.y2 := INT_TO_REAL(pValueConfig.Scale.RawMax);

			// If constraints are not enabled, default them to the engineering scale limits.
			// Constraints can only be used to limit the range of values to less than then engineering range.
			IF (NOT pValueConfig.Constraints.EnableConstraints) THEN
				pValueConfig.Constraints.ScaledMax := pValueConfig.Scale.EngineeringMax;
				pValueConfig.Constraints.ScaledMin := pValueConfig.Scale.EngineeringMin;
			END_IF
		
			initialized := TRUE;
			lastRawValue := 0;
		
			// Reset the update configuration flag to indicate completion.
			IF (pValueConfig.UpdateConfiguration) THEN 
				pValueConfig.UpdateConfiguration := FALSE;
			END_IF
		END_IF

		// Constrain the input value as required.
		tempScaledValue := pValue.InputScaledValue;			
		IF (pValueConfig.Constraints.EnableConstraints) THEN
			// When max > min...
			IF (pValueConfig.Constraints.ScaledMax > pValueConfig.Constraints.ScaledMin) THEN
				IF (tempScaledValue > pValueConfig.Constraints.ScaledMax) THEN
					tempScaledValue := pValueConfig.Constraints.ScaledMax;
				ELSIF (tempScaledValue < pValueConfig.Constraints.ScaledMin) THEN
					tempScaledValue := pValueConfig.Constraints.ScaledMin;
				END_IF
			ELSE // when max < min...
				IF (tempScaledValue < pValueConfig.Constraints.ScaledMax) THEN
					tempScaledValue := pValueConfig.Constraints.ScaledMax;
				ELSIF (tempScaledValue > pValueConfig.Constraints.ScaledMin) THEN
					tempScaledValue := pValueConfig.Constraints.ScaledMin;
				END_IF	
			END_IF
		END_IF
	
		pValue.Disabled := FALSE;
		pValue.ScaledValueConstrained := tempScaledValue;
	
		// Convert the the scaled value to a raw value.
		fbLCRLimitScale(x := tempScaledValue);
		lastRawValue := REAL_TO_INT(fbLCRLimitScale.y);
		pValue.RawValue := lastRawValue;

		InternalErrorCode := 0;		
	
	ELSE
	
		initialized := FALSE;
		pValue.Disabled := TRUE;
		pValue.ScaledValueConstrained := 0.0;		
		pValue.RawValue := lastRawValue;
		InternalErrorCode := 0;
	
	END_IF		
			
	
END_FUNCTION_BLOCK