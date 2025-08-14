// ---------------------------------------------------------------------------
// This function returns TRUE if the specified ValueToEvaluate is within the
// range defined by TargetValue +/- Tolerance.
// ---------------------------------------------------------------------------
FUNCTION VF_COMMON_IsValueInRange
	
	VF_COMMON_IsValueInRange := ((TargetValue - Tolerance) < ValueToCompare) AND (ValueToCompare < (TargetValue + Tolerance));
	
END_FUNCTION