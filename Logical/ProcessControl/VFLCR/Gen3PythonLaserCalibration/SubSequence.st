ACTION UploadLUTsSubsequence: 
	
	CASE task.status.sequence OF
		
		SEQUENCE_LUT_DELETE:
		
			task.status.statusMessage := 'deleting LUTs';
			task.internal.atnPLCOpenCommand.Command := gVFLCR.command.deleteLUTFiles;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
			task.internal.atnPLCOpenCommand();
		
			IF task.internal.atnPLCOpenCommand.Done THEN
				task.status.sequence := SEQUENCE_LUT_FTP;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
				task.internal.atnPLCOpenCommand();
			ELSIF task.internal.atnPLCOpenCommand.Aborted OR task.internal.atnPLCOpenCommand.Error THEN
				task.status.statusMessage := 'failed to delete LUTs';
				task.status.sequence := SEQUENCE_ERROR;
			END_IF
		
		SEQUENCE_LUT_FTP:
			
			// update command bool in opcua
			IF task.parameters.uploadLUTs.Calibrated THEN
				dOut.UploadCalibratedLUTs := TRUE;
			ELSE
				dOut.UploadLinearLUTs := TRUE;
			END_IF
			
			task.status.statusMessage := 'uploading LUTs';
			
			// start timeout timer
			task.internal.cmdTimeoutTimer.IN := TRUE;
			
			// wait for feedback
			IF dIn.LUTsUploaded THEN
				
				task.status.statusMessage := 'LUTs uploaded';
				
				dOut.UploadLinearLUTs := FALSE;
				dOut.UploadCalibratedLUTs := FALSE;
				
				task.status.sequence := SEQUENCE_LUT_TRANSFER;
				
			ELSIF task.internal.cmdTimeoutTimer.Q THEN
				
				task.status.statusMessage := 'LUT FTP command to python app timed out';	
		
				dOut.UploadLinearLUTs := FALSE;
				dOut.UploadCalibratedLUTs := FALSE;
				
				task.status.sequence := SEQUENCE_ERROR;
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);

			END_IF
			
		SEQUENCE_LUT_TRANSFER:
		
			task.status.statusMessage := 'transfering LUTs';
			task.internal.atnPLCOpenCommand.Command := gVFLCR.command.transferLUTFiles;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
			task.internal.atnPLCOpenCommand();
		
			IF task.internal.atnPLCOpenCommand.Done THEN
				task.status.sequence := SEQUENCE_DONE;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
				task.internal.atnPLCOpenCommand();
			ELSIF task.internal.atnPLCOpenCommand.Aborted OR task.internal.atnPLCOpenCommand.Error THEN
				task.status.statusMessage := 'failed to transfer LUTs';
				task.status.sequence := SEQUENCE_ERROR;
			END_IF
		
	END_CASE
	
END_ACTION

ACTION DownloadResultsSubsequence:
	
	CASE task.status.sequence OF
		
		SEQUENCE_RESULTS_DOWNLOAD:
			
			// update command bool in opcua
			dOut.DownloadTestResults := TRUE;
			
			// start timeout timer
			task.internal.cmdTimeoutTimer.IN := TRUE;
			
			// wait for feedback
			IF dIn.TestResultsDownloaded THEN
				
				dOut.DownloadTestResults := FALSE;
				
				// set flags
				task.status.processingTestData := FALSE;
				task.status.resultsDownloaded := TRUE;
				
				// parse newly-downloaded results
				task.status.sequence := SEQUENCE_RESULTS_PARSE;
				
				// explicitly lower timer.IN so the TON resets before the next step
				task.internal.cmdTimeoutTimer.IN := FALSE;
				
			ELSIF dIn.ErrorBucketNotExist THEN
				
				task.status.statusMessage := 'download failed; S3 bucket does not exist';
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_BUCKET_MISSING_AL9404, task.status.statusMessage);
				
				dOut.DownloadTestResults := FALSE;
				task.status.sequence := SEQUENCE_ERROR;
				
			ELSIF dIn.ErrorS3Connection THEN
				
				task.status.statusMessage := 'download failed; S3 connection failed';
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_S3_CONNECTION_AL9405, task.status.statusMessage);
				
				dOut.DownloadTestResults := FALSE;
				task.status.sequence := SEQUENCE_ERROR;
				
			ELSIF task.internal.cmdTimeoutTimer.Q THEN
				
				// probably just means the results aren't there yet; this is OK
				// TODO: should this error anyways?
				
				dOut.DownloadTestResults := FALSE;
				
				// finish early without error
				task.status.statusMessage := 'results not available to download';
				task.status.sequence := SEQUENCE_DONE;
				
			END_IF
			
		SEQUENCE_RESULTS_PARSE:
			
			// update command bool in opcua
			dOut.ParseTestResults := TRUE;
			
			// start timeout timer
			task.internal.cmdTimeoutTimer.IN := TRUE;
			
			// wait for feedback
			IF dIn.TestResultsParsed THEN
				
				task.status.statusMessage := 'results downloaded and parsed';
				dOut.ParseTestResults := FALSE;
				task.status.sequence := SEQUENCE_DONE;
				
			ELSIF task.internal.cmdTimeoutTimer.Q THEN
				
				task.status.statusMessage := 'results downloaded; parse command to python app timed out';
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
				
				dOut.ParseTestResults := FALSE;
				task.status.sequence := SEQUENCE_ERROR;
				
			END_IF
			
		
	END_CASE
	
END_ACTION
