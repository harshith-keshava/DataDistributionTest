
FUNCTION_BLOCK VfSMRConnect
	
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
			
			// Waiting for Execute
			vfSMR_CNCT_STEP_IDLE:
				Internal.Step := vfSMR_CNCT_STEP_CONNECT_SMR1;
				
			
			// Establish connection to local media where target file will be placed
			vfSMR_CNCT_STEP_CONNECT_SMR1:			
				Internal.FB.DevLinkLocalSMR.pDevice := pLocalSMRDriveName;
				Internal.FB.DevLinkLocalSMR.pParam := pLocalSMRDrive;
				Internal.FB.DevLinkLocalSMR.enable := TRUE;				
				Internal.Step := vfSMR_CNCT_STEP_CONNECT_SMR2;
				
				
			// Wait for successful connection
			vfSMR_CNCT_STEP_CONNECT_SMR2:
				IF (Internal.FB.DevLinkLocalSMR.status = ERR_OK) THEN
					Internal.FB.DevLinkLocalSMR.enable := FALSE;
					LocalSMRDriveHandle := Internal.FB.DevLinkLocalSMR.handle;
					Internal.Step := vfSMR_CNCT_STEP_CONNECT_PTR1;
					
				ELSIF (Internal.FB.DevLinkLocalSMR.status <> ERR_FUB_BUSY) THEN
					Internal.FB.DevLinkLocalSMR.enable := FALSE;
					Internal.ErrorStep := Internal.Step;
					Error := TRUE;
					ErrorID := Internal.FB.DevLinkLocalSMR.status;
					Internal.Step := vfSMR_CNCT_STEP_DISCONNECT1;
					
				END_IF
				
				
			// Establish connection to local media where target file will be placed
			vfSMR_CNCT_STEP_CONNECT_PTR1:			
				Internal.FB.DevLinkLocalPTR.pDevice := pLocalPTRDriveName;
				Internal.FB.DevLinkLocalPTR.pParam := pLocalPTRDrive;
				Internal.FB.DevLinkLocalPTR.enable := TRUE;				
				Internal.Step := vfSMR_CNCT_STEP_CONNECT_PTR2;
				
				
			// Wait for successful connection
			vfSMR_CNCT_STEP_CONNECT_PTR2:
				IF (Internal.FB.DevLinkLocalPTR.status = ERR_OK) THEN
					Internal.FB.DevLinkLocalPTR.enable := FALSE;
					LocalPTRDriveHandle := Internal.FB.DevLinkLocalPTR.handle;
					Internal.Step := vfSMR_CNCT_STEP_CONNECT_LCR1;
					
				ELSIF (Internal.FB.DevLinkLocalPTR.status <> ERR_FUB_BUSY) THEN
					Internal.FB.DevLinkLocalPTR.enable := FALSE;
					Internal.ErrorStep := Internal.Step;
					Error := TRUE;
					ErrorID := Internal.FB.DevLinkLocalPTR.status;
					Internal.Step := vfSMR_CNCT_STEP_DISCONNECT1;
					
				END_IF
				
				
			// Establish connection to local media where target file will be placed
			vfSMR_CNCT_STEP_CONNECT_LCR1:			
				Internal.FB.DevLinkLocalLCR.pDevice := pLocalLCRDriveName;
				Internal.FB.DevLinkLocalLCR.pParam := pLocalLCRDrive;
				Internal.FB.DevLinkLocalLCR.enable := TRUE;				
				Internal.Step := vfSMR_CNCT_STEP_CONNECT_LCR2;
				
				
			// Wait for successful connection
			vfSMR_CNCT_STEP_CONNECT_LCR2:
				IF (Internal.FB.DevLinkLocalLCR.status = ERR_OK) THEN
					Internal.FB.DevLinkLocalLCR.enable := FALSE;
					LocalLCRDriveHandle := Internal.FB.DevLinkLocalLCR.handle;
					Internal.Step := vfSMR_CNCT_STEP_CONNECT_REMOTE1;
					
				ELSIF (Internal.FB.DevLinkLocalLCR.status <> ERR_FUB_BUSY) THEN
					Internal.FB.DevLinkLocalLCR.enable := FALSE;
					Internal.ErrorStep := Internal.Step;
					Error := TRUE;
					ErrorID := Internal.FB.DevLinkLocalLCR.status;
					Internal.Step := vfSMR_CNCT_STEP_DISCONNECT1;
					
				END_IF
				
				
			// Establish connection to remote media where target file resides
			vfSMR_CNCT_STEP_CONNECT_REMOTE1:			
				Internal.FB.DevLinkRemote.pDevice := pRemoteDriveName;
				Internal.FB.DevLinkRemote.pParam := pRemoteDrive;
				Internal.FB.DevLinkRemote.enable := TRUE;				
				Internal.Step := vfSMR_CNCT_STEP_CONNECT_REMOTE2;
				
				
			// Wait for successful connection
			vfSMR_CNCT_STEP_CONNECT_REMOTE2:
				IF (Internal.FB.DevLinkRemote.status = ERR_OK) THEN
					Internal.FB.DevLinkRemote.enable := FALSE;
					RemoteDriveHandle := Internal.FB.DevLinkRemote.handle;
					Internal.Step := vfSMR_CNCT_STEP_DONE;
					
				ELSIF (Internal.FB.DevLinkRemote.status <> ERR_FUB_BUSY) THEN
					Internal.FB.DevLinkRemote.enable := FALSE;
					Internal.ErrorStep := Internal.Step;
					Error := TRUE;
					ErrorID := Internal.FB.DevLinkRemote.status;
					Internal.Step := vfSMR_CNCT_STEP_DISCONNECT1;
					
				END_IF						
				
				
			// Wait for incoming command
			vfSMR_CNCT_STEP_DONE:
				Done := TRUE;
				
				
			// Disconnect from all media
			vfSMR_CNCT_STEP_DISCONNECT1:
				IF (LocalSMRDriveHandle <> 0) THEN
					Internal.FB.DevUnlinkLocalSMR.handle := LocalSMRDriveHandle;
					Internal.FB.DevUnlinkLocalSMR.enable := TRUE;
				END_IF
				IF (LocalPTRDriveHandle <> 0) THEN
					Internal.FB.DevUnlinkLocalPTR.handle := LocalPTRDriveHandle;
					Internal.FB.DevUnlinkLocalPTR.enable := TRUE;
				END_IF
				IF (RemoteDriveHandle <> 0) THEN
					Internal.FB.DevUnlinkRemote.handle := RemoteDriveHandle;
					Internal.FB.DevUnlinkRemote.enable := TRUE;
				END_IF
				Internal.Step := vfSMR_CNCT_STEP_DISCONNECT2;
				
				
			vfSMR_CNCT_STEP_DISCONNECT2:
				// Wait for confirmation that both devices are unlinked
				IF (((Internal.FB.DevUnlinkLocalSMR.status = ERR_OK) OR (NOT Internal.FB.DevUnlinkLocalSMR.enable)) AND 
					((Internal.FB.DevUnlinkLocalPTR.status = ERR_OK) OR (NOT Internal.FB.DevUnlinkLocalPTR.enable)) AND
					((Internal.FB.DevUnlinkRemote.status = ERR_OK) OR (NOT Internal.FB.DevUnlinkRemote.enable))) THEN
					LocalSMRDriveHandle := 0;
					LocalPTRDriveHandle := 0;
					RemoteDriveHandle := 0;
					Internal.Step := vfSMR_CNCT_STEP_ERROR;
				END_IF
				
				
			vfSMR_CNCT_STEP_ERROR:

				IF (ErrorReset) THEN
					Internal.Step := vfSMR_CNCT_STEP_ERROR_RESET;
				END_IF
				
				
			vfSMR_CNCT_STEP_ERROR_RESET:
			
				
		END_CASE
		
	ELSE // NOT Execute
		Internal.Step := vfSMR_CNCT_STEP_IDLE;
		Done := FALSE;
		Error := FALSE;
		ErrorID := ERR_OK;
		Internal.FB.DevLinkLocalSMR.enable := FALSE;
		Internal.FB.DevLinkLocalPTR.enable := FALSE;
		Internal.FB.DevLinkRemote.enable := FALSE;
		Internal.FB.DevUnlinkLocalSMR.enable := FALSE;
		Internal.FB.DevUnlinkLocalPTR.enable := FALSE;
		Internal.FB.DevUnlinkRemote.enable := FALSE;
		
	END_IF

	// Calling all FBs
	Internal.FB.DevLinkLocalSMR();
	Internal.FB.DevLinkLocalPTR();
	Internal.FB.DevLinkLocalLCR();
	Internal.FB.DevLinkRemote();
	
	Internal.FB.DevUnlinkLocalSMR();
	Internal.FB.DevUnlinkLocalPTR();
	Internal.FB.DevUnlinkRemote();
	Internal.FB.DevUnlinkLocalLCR();
	
END_FUNCTION_BLOCK
