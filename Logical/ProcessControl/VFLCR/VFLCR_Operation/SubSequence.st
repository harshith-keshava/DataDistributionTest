
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

ACTION EnableLasersSubSequence:
	
	CASE task.status.sequence OF
		
		SEQUENCE_ENABLE_LASERS_START:
			
			// Enable laser power IO with a 250ms delay between each
			IF currentLaser < VFLCR_NUM_LASERS THEN
				
				IO.do.EnableLaserPower[currentLaser] := NOT(Configuration.ignoreLaser[currentLaser]);
				IO.do.EnableGuideLaser[currentLaser] := FALSE; // Disable guide laser while power is on
				task.internal.delayTON.PT := T#250ms;
				task.internal.delayTON.IN := TRUE;
				
				IF task.internal.delayTON.Q THEN
					
					task.internal.delayTON.IN := FALSE; // Handles resetting before the next supply and before the status delay
					currentLaser := currentLaser + 1;
					
				END_IF
				
			ELSE
				
				task.status.coolingRequired := TRUE;
				task.status.sequence := SEQUENCE_ENABLE_LASERS_STATUS;
				
			END_IF
			
		SEQUENCE_ENABLE_LASERS_STATUS:
			
			// Wait 3.5s
			task.internal.delayTON.PT := T#3500ms;
			task.internal.delayTON.IN := TRUE;
			
			IF task.internal.delayTON.Q THEN
				
				task.internal.delayTON.IN := FALSE;
				task.status.laserPowerEnabled := TRUE;
				task.status.sequence := SEQUENCE_DONE;
				
			END_IF
		
	END_CASE
	
END_ACTION

ACTION ManualPulseSubSequence:
	
	CASE task.status.sequence OF
		
		SEQUENCE_MANUAL_PULSE_TRIGGER:
			
			task.internal.triggerFrameDataCollection.Execute := TRUE;
			
			//task.command.disableLaserEmission := TRUE;
			
			task.status.sequence := SEQUENCE_MANUAL_PULSE_RESPONSE;
			
		
				
		SEQUENCE_MANUAL_PULSE_RESPONSE:
			// Pixel Test 
			IF stateAnyTrue( gVFLCR.status.usingGen3LaserCalibrationApp , TRUE ) AND stateAllFalse(gSFCControlApi.status.sOMSModeActive,FALSE) THEN
				
				// capture data after last pulse of this power level
				
				IF task.internal.triggerDataCollection.Done THEN
					
					task.status.sequence := SEQUENCE_MANUAL_PULSE_INCREMENT;
					
				ELSIF task.internal.triggerDataCollection.Error THEN
					
					task.status.sequence := SEQUENCE_ERROR;
					
				ELSIF NOT task.internal.triggerDataCollection.Busy THEN
					
					// this command forwards pulse parameters + more via plcOpen params
					task.internal.dataCollectionParameters.CurrentPowerWatts := task.status.manualPulseStatus.currentPower_W;
					task.internal.dataCollectionParameters.LaserParameters := task.parameters.manualPulseParameters;
					task.internal.triggerDataCollection.Execute := TRUE;
					
				END_IF
				// sOMS test
			ELSIF stateAnyTrue( gVFLCR.status.usingGen3LaserCalibrationApp , TRUE ) AND stateAnyTrue(gSFCControlApi.status.sOMSModeActive,FALSE) THEN
				
				// capture data after last pulse of this power level
				
				gOpcData_ToGen3CalibApp.LaserPulseComplete := TRUE;
				
				IF task.internal.triggerFrameDataCollection.Done THEN
					
					gOpcData_ToGen3CalibApp.LaserPulseComplete := FALSE;
					task.internal.triggerFrameDataCollection.Execute := FALSE;
					task.status.sequence := SEQUENCE_MANUAL_PULSE_INCREMENT;
					
				ELSIF task.internal.triggerFrameDataCollection.Error THEN
					
					gOpcData_ToGen3CalibApp.LaserPulseComplete := FALSE;
					task.internal.triggerFrameDataCollection.Execute := FALSE;
					task.status.sequence := SEQUENCE_ERROR;
																		
				END_IF
					
			ELSE 
				
				task.status.sequence := SEQUENCE_MANUAL_PULSE_INCREMENT;
				
			END_IF
			
		SEQUENCE_MANUAL_PULSE_INCREMENT:
			
			task.status.manualPulseStatus.currentStep := task.status.manualPulseStatus.currentStep + 1;
			
			// Check for completion
			IF task.status.manualPulseStatus.currentStep >= task.internal.parameters.manualPulseParameters.numPowerLevels THEN
						
				task.status.manualPulseActive := FALSE;
						
				task.status.sequence := SEQUENCE_DONE;				
			
			ELSE
				
				task.status.sequence := SEQUENCE_MANUAL_PULSE_TRIGGER;
				
			END_IF
		
	END_CASE
	
END_ACTION
