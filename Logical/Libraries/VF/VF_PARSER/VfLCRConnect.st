
FUNCTION_BLOCK VfLCRConnect
	
	IF (Execute) THEN
		
		// Trace the currently-active step; the most recent step is in array index [0].
		IF (Internal.Step <> Internal.StepTrace[0]) THEN		
			FOR Internal.i := 99 TO 1 BY (-1) DO
				Internal.StepTrace[Internal.i] := Internal.StepTrace[Internal.i-1];
			END_FOR
			Internal.StepTrace[0] := Internal.Step;
		END_IF;
		
		// Main state machine
		CASE Internal.Step OF
			
			// Waiting for Execute
			vfLCR_CNCT_STEP_IDLE:
				Internal.Step := vfLCR_CNCT_STEP_CONNECT_LCR1;
				
				
			// Establish connection to local media where target file will be placed
			vfLCR_CNCT_STEP_CONNECT_LCR1:			
				Internal.FB.DevLinkLocalLCR.pDevice := pLocalLCRDriveName;
				Internal.FB.DevLinkLocalLCR.pParam := pLocalLCRDrive;
				Internal.FB.DevLinkLocalLCR.enable := TRUE;				
				Internal.Step := vfLCR_CNCT_STEP_CONNECT_LCR2;
				
				
			// Wait for successful connection
			vfLCR_CNCT_STEP_CONNECT_LCR2:
				IF (Internal.FB.DevLinkLocalLCR.status = ERR_OK) THEN
					Internal.FB.DevLinkLocalLCR.enable := FALSE;
					LocalLCRDriveHandle := Internal.FB.DevLinkLocalLCR.handle;
					Internal.Step := vfLCR_CNCT_STEP_DONE;
					
				ELSIF (Internal.FB.DevLinkLocalLCR.status <> ERR_FUB_BUSY) THEN
					Internal.FB.DevLinkLocalLCR.enable := FALSE;
					Internal.ErrorStep := Internal.Step;
					Error := TRUE;
					ErrorID := Internal.FB.DevLinkLocalLCR.status;
					Internal.Step := vfLCR_CNCT_STEP_DISCONNECT1;
					
				END_IF				
		
				
				// Wait for incoming command
			vfLCR_CNCT_STEP_DONE:
				Done := TRUE;
				
				
				// Disconnect from all media
			vfLCR_CNCT_STEP_DISCONNECT1:
				IF (LocalLCRDriveHandle <> 0) THEN
					Internal.FB.DevUnlinkLocalLCR.handle := LocalLCRDriveHandle;
					Internal.FB.DevUnlinkLocalLCR.enable := TRUE;
				END_IF
				Internal.Step := vfLCR_CNCT_STEP_DISCONNECT2;
				
				
			vfLCR_CNCT_STEP_DISCONNECT2:
				// Wait for confirmation that both devices are unlinked
				IF ((Internal.FB.DevUnlinkLocalLCR.status = ERR_OK) OR (NOT Internal.FB.DevUnlinkLocalLCR.enable)) THEN
					LocalLCRDriveHandle := 0;
					Internal.Step := vfLCR_CNCT_STEP_ERROR;
				END_IF
				
				
			vfLCR_CNCT_STEP_ERROR:

				IF (ErrorReset) THEN
					Internal.Step := vfLCR_CNCT_STEP_ERROR_RESET;
				END_IF
				
				
			vfLCR_CNCT_STEP_ERROR_RESET:
			
				
		END_CASE
		
	ELSE // NOT Execute
		Internal.Step := vfLCR_CNCT_STEP_IDLE;
		Done := FALSE;
		Error := FALSE;
		ErrorID := ERR_OK;
		Internal.FB.DevLinkLocalLCR.enable := FALSE;
		Internal.FB.DevUnlinkLocalLCR.enable := FALSE;
		
	END_IF

	// Calling all FBs
	Internal.FB.DevLinkLocalLCR();	
	Internal.FB.DevUnlinkLocalLCR();
	
END_FUNCTION_BLOCK
