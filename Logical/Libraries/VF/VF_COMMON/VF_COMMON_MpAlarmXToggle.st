// ---------------------------------------------------------------------------
// This function sets or resets a persistant alarm based on its current state and instance ID.
// ---------------------------------------------------------------------------
FUNCTION VF_COMMON_MpAlarmXToggle
	
	// This routine is valid for Persistent alarms only!
	
	IF (InstanceID = 0) THEN
		IF (AlarmConditionActive) THEN	
			// Set the alarm and return the instance ID of the alarm to be used in MpAlarmXResetID
			InstanceID := MpAlarmXSet(MpLink, Name);
		END_IF			
	ELSE		
		IF (NOT AlarmConditionActive) THEN
			// Reset the alarm by instance ID.
			MpAlarmXResetID(MpLink, InstanceID);
			InstanceID := 0;
		END_IF		
	END_IF		
	
	VF_COMMON_MpAlarmXToggle := TRUE;
	
END_FUNCTION