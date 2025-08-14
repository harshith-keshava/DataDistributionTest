
ACTION EnableSuppliesSubSequence:
	
	CASE task.status.sequence OF
		
SEQUENCE_ENABLE_DC_POWER_START:
			
			// Enable power supply IO with a 1.5s delay between each
			IF currentSupply < VFLCR_NUM_POWER_SUPPLIES THEN
				
				IO.do.LaserPowerSupply[currentSupply] := NOT(Configuration.ignoreSupply[currentSupply]);
				task.internal.delayTON.PT := T#1500ms;
				task.internal.delayTON.IN := TRUE;
				
				IF task.internal.delayTON.Q THEN
					
					task.internal.delayTON.IN := FALSE; // Handles resetting before the next supply and before the laser check
					currentSupply := currentSupply + 1;
					
				END_IF
				
			ELSE
				
				task.status.sequence := SEQUENCE_ENABLE_DC_POWER_CHECK;
				
			END_IF
			
		SEQUENCE_ENABLE_DC_POWER_CHECK:
			
			// Wait 20s for laser system check
			task.internal.delayTON.PT := T#5s;
			task.internal.delayTON.IN := TRUE;
			
			IF task.internal.delayTON.Q THEN
				
				task.internal.delayTON.IN := FALSE;
				task.status.dcPowerEnabled := TRUE;
				task.status.sequence := SEQUENCE_DONE;
				
			END_IF
		
	END_CASE
	
END_ACTION




