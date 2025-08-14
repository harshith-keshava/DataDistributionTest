
FUNCTION_BLOCK VfSMRFileSetup
	
	IF (Execute) THEN
		
		// Trace the currently-active step; the most recent step is in array index [0].
		IF (Internal.Step <> Internal.StepTrace[0]) THEN
			FOR Internal.index := 99 TO 1 BY (-1) DO
				Internal.StepTrace[Internal.index] := Internal.StepTrace[Internal.index-1];
			END_FOR
			Internal.StepTrace[0] := Internal.Step;
		END_IF;
		
		// Main state machine
		CASE Internal.Step OF
			
			// Waiting for execute command
			vfSMR_FILE_STEP_IDLE:
				Internal.Step := vfSMR_FILE_STEP_COPY_TO_SMR1;				
				
				
					// Copy target file from remote media to local SMR CF card
			vfSMR_FILE_STEP_COPY_TO_SMR1:
				Internal.FB.FileCopy1.pSrcDev := pRemoteDriveName;
				Internal.FB.FileCopy1.pSrc := pPEFName;
				Internal.FB.FileCopy1.pDestDev := pLocalSMRDriveName;
				Internal.FB.FileCopy1.pDest := ADR('PEF.csv');
				Internal.FB.FileCopy1.option := fiOVERWRITE;
				Internal.FB.FileCopy1.enable := TRUE;
				Internal.Step := vfSMR_FILE_STEP_COPY_TO_SMR2;
				
				
				// Wait for completion of the copy operation
			vfSMR_FILE_STEP_COPY_TO_SMR2:
				IF (Internal.FB.FileCopy1.status = ERR_OK) THEN
					Internal.FB.FileCopy1.enable := FALSE;
					Internal.Step := vfSMR_FILE_STEP_COPY_TO_SMR3;
				
				ELSIF (Internal.FB.FileCopy1.status <> ERR_FUB_BUSY) THEN
					Internal.FB.FileCopy1.enable := FALSE;
					Internal.ErrorStep := Internal.Step;
					Error := TRUE;
					ErrorID := Internal.FB.FileCopy1.status;
					Internal.Step := vfSMR_FILE_STEP_ERROR;
					
				END_IF
				
				
			// Copy target file from remote media to local SMR CF card
			vfSMR_FILE_STEP_COPY_TO_SMR3:
				Internal.FB.FileCopy1.pSrcDev := pRemoteDriveName;
				Internal.FB.FileCopy1.pSrc := pFEFName;
				Internal.FB.FileCopy1.pDestDev := pLocalSMRDriveName;
				Internal.FB.FileCopy1.pDest := ADR('FEF.csv');
				Internal.FB.FileCopy1.option := fiOVERWRITE;
				Internal.FB.FileCopy1.enable := TRUE;
				Internal.Step := vfSMR_FILE_STEP_COPY_TO_SMR4;
				
				
			// Wait for completion of the copy operation
			vfSMR_FILE_STEP_COPY_TO_SMR4:
				IF (Internal.FB.FileCopy1.status = ERR_OK) THEN
					Internal.FB.FileCopy1.enable := FALSE;
					Internal.Step := vfSMR_FILE_STEP_COPY_TO_PTR1;
				
				ELSIF (Internal.FB.FileCopy1.status <> ERR_FUB_BUSY) THEN
					Internal.FB.FileCopy1.enable := FALSE;
					Internal.ErrorStep := Internal.Step;
					Error := TRUE;
					ErrorID := Internal.FB.FileCopy1.status;
					Internal.Step := vfSMR_FILE_STEP_ERROR;
					
				END_IF
				
				
				// Copy target file from local SMR CF card to local PTR CF card
			vfSMR_FILE_STEP_COPY_TO_PTR1:
				Internal.FB.FileCopy2.pSrcDev := pLocalSMRDriveName;
				Internal.FB.FileCopy2.pSrc := ADR('PEF.csv');
				Internal.FB.FileCopy2.pDestDev := pLocalPTRDriveName;
				Internal.FB.FileCopy2.pDest := ADR('PEF.csv');
				Internal.FB.FileCopy2.option := fiOVERWRITE;
				Internal.FB.FileCopy2.enable := TRUE;
				Internal.Step := vfSMR_FILE_STEP_COPY_TO_PTR2;
				
				
				// Wait for completion of the copy operation
			vfSMR_FILE_STEP_COPY_TO_PTR2:
				IF (Internal.FB.FileCopy2.status = ERR_OK) THEN
					Internal.FB.FileCopy2.enable := FALSE;
					Internal.Step := vfSMR_FILE_STEP_COPY_TO_LCR1;
				
				ELSIF (Internal.FB.FileCopy2.status <> ERR_FUB_BUSY) THEN
					Internal.FB.FileCopy2.enable := FALSE;
					Internal.ErrorStep := Internal.Step;
					Error := TRUE;
					ErrorID := Internal.FB.FileCopy2.status;
					Internal.Step := vfSMR_FILE_STEP_ERROR;
					
				END_IF
				
				
				// Copy target file from remote media to local LCR CF card
			vfSMR_FILE_STEP_COPY_TO_LCR1:
				Internal.FB.FileCopy3.pSrcDev := pLocalSMRDriveName;
				Internal.FB.FileCopy3.pSrc := ADR('FEF.csv');
				Internal.FB.FileCopy3.pDestDev := pLocalLCRDriveName;
				Internal.FB.FileCopy3.pDest := ADR('FEF.csv');
				Internal.FB.FileCopy3.option := fiOVERWRITE;
				Internal.FB.FileCopy3.enable := TRUE;
				Internal.Step := vfSMR_FILE_STEP_COPY_TO_LCR2;
				
				
				// Wait for completion of the copy operation
			vfSMR_FILE_STEP_COPY_TO_LCR2:
				IF (Internal.FB.FileCopy3.status = ERR_OK) THEN
					Internal.FB.FileCopy3.enable := FALSE;
					Internal.Step := vfSMR_FILE_STEP_DONE;
				
				ELSIF (Internal.FB.FileCopy3.status <> ERR_FUB_BUSY) THEN
					Internal.FB.FileCopy3.enable := FALSE;
					Internal.ErrorStep := Internal.Step;
					Error := TRUE;
					ErrorID := Internal.FB.FileCopy3.status;
					Internal.Step := vfSMR_FILE_STEP_ERROR;
					
				END_IF
				
				
				// We're officially done. 
			vfSMR_FILE_STEP_DONE:
				Done := TRUE;
				
				
			vfSMR_FILE_STEP_ERROR:

				IF (ErrorReset) THEN
					Internal.Step := vfSMR_FILE_STEP_ERROR_RESET;
				END_IF
				
				
			vfSMR_FILE_STEP_ERROR_RESET:
			
				
		END_CASE

		
	ELSE // NOT Execute
		Internal.Step := vfSMR_FILE_STEP_IDLE;
		Done := FALSE;
		Error := FALSE;
		ErrorID := ERR_OK;
		Internal.FB.FileCopy1.enable := FALSE;
		Internal.FB.FileCopy2.enable := FALSE;
		Internal.FB.FileCopy3.enable := FALSE;
	END_IF
			
	// Calling all FBs
	Internal.FB.FileCopy1();
	Internal.FB.FileCopy2();
	Internal.FB.FileCopy3();
END_FUNCTION_BLOCK
