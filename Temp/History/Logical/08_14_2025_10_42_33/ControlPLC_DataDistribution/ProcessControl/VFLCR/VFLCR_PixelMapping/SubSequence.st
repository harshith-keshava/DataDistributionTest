
ACTION PixelMapSubSequence:
	
	// Reset read offset and close file if it is outside the range. Escape condition to avoid infinte loop check (just in case)
	IF (task.internal.offsetRead > task.internal.dataLength) THEN
		task.internal.offsetRead := 0;
		task.status.sequence := SEQUENCE_CLOSE_FILE;
	END_IF

	CASE task.status.sequence OF
		
		SEQUENCE_START_REMAP:
			
			task.status.alarmActive := FALSE;
			
			task.internal.dataLength := 1500;// Dummy start value when we do not have a previously opened file. Will be updated after next file open
			task.internal.tempString := '';
			task.internal.offsetRead := 0;
			task.internal.laserNum := 0;
			task.internal.pixelNum := 0;
			task.internal.rackNum := 0;
			task.internal.statusNum := 0;
			task.internal.readingFileHeader := FALSE;
			task.internal.checkNewVersion := FALSE;
			task.internal.tempCharRead := '';
			task.internal.fbOpen.enable := FALSE;
			task.internal.fbOpen();
			task.internal.fbClose.enable := FALSE;
			task.internal.fbClose();
			task.internal.fbReadEx.enable := FALSE;
			task.internal.fbReadEx();
			task.internal.fileHandle := 0;
			task.internal.identifier := Pixel;
			task.internal.checkNewVersion := FALSE;
			FOR task.internal.pixelLoopIndex := 0 TO (Configuration.MaxNumberOfPixelsUsed - 1) DO
				task.status.pixelMapped[task.internal.pixelLoopIndex] := FALSE;
			END_FOR
			
			task.status.sequence := SEQUENCE_OPEN_FILE;
		
		SEQUENCE_OPEN_FILE:
			
			IF task.internal.fbOpen.status = ERR_FUB_ENABLE_FALSE THEN
				
				// Set pars
				// Set version conditionally
				
				task.internal.configFileName := USINT_TO_STRING(MACHINE_NUM_LASERS_TOTAL);
				
				task.internal.configFileName := CONCAT (task.internal.configFileName, '.vfpmap');
				task.internal.configFileName := CONCAT ('_', task.internal.configFileName);
				task.internal.configFileName := CONCAT ('DP13', task.internal.configFileName);
				task.internal.configFileName := CONCAT ('PrinterPixelMap_', task.internal.configFileName);
				task.internal.fbOpen.pDevice := ADR('PixelMapping');
				task.internal.fbOpen.pFile := ADR(task.internal.configFileName);
				task.internal.fbOpen.mode := fiREAD_ONLY;
				task.internal.fbOpen.enable := TRUE;
			
			ELSIF task.internal.fbOpen.status = fiERR_INVALID_PATH THEN
				
				task.internal.fbOpen.enable := FALSE;
				task.internal.fileHandle := 0; 
				vfAlarmEdge(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_PM_PATH_NOT_FOUND_AL9301);
				task.status.alarmActive := TRUE;
				task.status.sequence := SEQUENCE_ERROR;
				
			ELSIF task.internal.fbOpen.status = fiERR_FILE_NOT_FOUND THEN
				
				//IF NOT task.internal.checkNewVersion THEN // If not already checked for a new version of the file, trying finding it again
					
				//	task.internal.fbOpen.enable := FALSE; 
				//	task.internal.fileHandle := 0;
				//	task.internal.checkNewVersion := TRUE;
					// Parameters will be re-asssigned because status will be ERR_FUB_ENABLE_FALSE
					
				//ELSE
					
					task.internal.fbOpen.enable := FALSE;
					task.internal.fileHandle := 0;
					vfAlarmEdge(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_PM_FILE_NOT_FOUND_AL9300);
					task.status.alarmActive := TRUE;
					task.status.sequence := SEQUENCE_ERROR;
				
				//END_IF
				
			ELSIF task.internal.fbOpen.status = ERR_OK THEN

				task.internal.fbOpen.enable := FALSE;
				task.internal.fileHandle := task.internal.fbOpen.ident;
				//IF task.internal.checkNewVersion THEN // New version of the file found - write the new version
				
				//	task.internal.checkNewVersion := FALSE;
					//gPrintJobManagement.currentState.pixelMapFileVersion := gPrintJobManagement.currentState.pixelMapFileVersion + 1;
					
				//END_IF
				task.internal.dataLength := task.internal.fbOpen.filelen;
				task.internal.readingFileHeader := TRUE;
				task.status.sequence := SEQUENCE_READ;
				
			ELSIF task.internal.fbOpen.status = ERR_FUB_BUSY THEN
				
				// Enable must stay true, and it does
				
			ELSE // Some other type of error happened
				
				task.internal.fbOpen.enable := FALSE;
				vfAlarmEdge(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_PM_FILE_OPEN_ERROR_AL9302); // General Error
				task.status.alarmActive := TRUE;
				task.status.sequence := SEQUENCE_ERROR;
				
			END_IF
			
			task.internal.fbOpen();
			
		SEQUENCE_READ:
			
			IF task.internal.fbReadEx.status = ERR_FUB_ENABLE_FALSE THEN
				
				// Set pars
				task.internal.fbReadEx.enable := TRUE;
				task.internal.fbReadEx.ident := task.internal.fileHandle;
				task.internal.fbReadEx.len := 1;
				task.internal.fbReadEx.pDest := ADR(task.internal.tempCharRead);
				task.internal.fbReadEx.offset := task.internal.offsetRead;
				
			ELSIF task.internal.fbReadEx.status = ERR_OK THEN
				
				task.internal.fbReadEx.enable := FALSE;
				task.status.sequence := SEQUENCE_MAPPING;
				
			ELSIF task.internal.fbReadEx.status = ERR_FUB_BUSY THEN
				
				// Enable must stay true, and it does
				
			ELSE // Error
				
				task.internal.fbReadEx.enable := FALSE;
				vfAlarmEdge(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_PM_FILE_READ_ERROR_AL9304);
				task.status.alarmActive := TRUE;
				task.status.sequence := SEQUENCE_ERROR;
				
			END_IF
			
			task.internal.fbReadEx();
		
		SEQUENCE_MAPPING:
			
			IF (task.internal.tempCharRead <> '$n') THEN
				
				IF task.internal.readingFileHeader THEN // Read the header of the file
					
					IF (task.internal.tempCharRead = '$r') THEN
						
						task.status.fileHeaderInfo := task.internal.tempString;
						task.internal.offsetRead := task.internal.offsetRead + 1;
					
					ELSE
						
						task.internal.offsetRead := task.internal.offsetRead + 1;
						task.internal.tempString := CONCAT (task.internal.tempString, task.internal.tempCharRead);
						
					END_IF
					
				END_IF
				task.status.sequence := SEQUENCE_READ;
			
			ELSIF (task.internal.tempCharRead = '$n') THEN // End of a line. Reset identifer and map the next pixel
				
				IF task.internal.readingFileHeader THEN
					
					task.internal.readingFileHeader := FALSE;
					task.internal.tempString := '';
					
				END_IF	
				task.status.sequence := SEQUENCE_RESET_IDENTIFIER;
				
			END_IF
			
			IF NOT task.internal.readingFileHeader THEN
				
				IF (task.internal.tempCharRead <> ',' AND task.internal.tempCharRead <> '$r' AND task.internal.tempCharRead <> '$n' ) THEN // Valid data char
					
					task.internal.offsetRead := task.internal.offsetRead + 1;
					task.internal.tempString := CONCAT (task.internal.tempString, task.internal.tempCharRead);
					task.status.sequence := SEQUENCE_READ;
					
				ELSIF (task.internal.tempCharRead = ',' OR task.internal.tempCharRead = '$r') THEN // Record pixel/status/rack/laser number
					
					task.internal.offsetRead := task.internal.offsetRead + 1;
					IF (task.internal.identifier = Pixel) THEN
						
						task.internal.pixelNum := STRING_TO_USINT (task.internal.tempString);
						task.internal.pixelIndex := task.internal.pixelNum - 1;
						task.internal.tempString := '';
						task.internal.identifier := task.internal.identifier + 1;
						
					ELSIF (task.internal.identifier = Status) THEN
						
						task.internal.statusNum := STRING_TO_USINT (task.internal.tempString);
						task.internal.tempString := '';
						task.internal.identifier := task.internal.identifier + 1;
						
					ELSIF(task.internal.identifier = Rack) THEN
						
						task.internal.rackNum := STRING_TO_USINT (task.internal.tempString);
						task.internal.rackIndex := task.internal.rackNum - 1;
						task.internal.tempString := '';
						task.internal.identifier := task.internal.identifier + 1;
						
					ELSIF(task.internal.identifier = Laser) THEN
						
						task.internal.laserNum := STRING_TO_USINT (task.internal.tempString);
						task.internal.laserIndex := task.internal.laserNum - 1;
						task.internal.tempString := '';
						task.internal.identifier := Pixel;
						
						// Despite using num, this condition is correct
						IF ((task.internal.pixelNum > 0 AND task.internal.pixelNum <= Configuration.MaxNumberOfPixelsUsed) AND
							(task.internal.rackNum > 0 AND task.internal.rackNum <= MACHINE_NUM_LASER_RACKS) AND 
							(task.internal.laserNum > 0 AND task.internal.laserNum <= MACHINE_NUM_LASERS_PER_RACK)) THEN 
							// Map laser and rack with corresponding pixel
							gmapRackLaser_to_Pixel[task.internal.rackIndex,task.internal.laserIndex] := INT_TO_USINT(task.internal.pixelIndex);
							gmapPixel_to_Rack[task.internal.pixelIndex] := INT_TO_USINT(task.internal.rackIndex);
							gmapPixel_to_Laser[task.internal.pixelIndex] := INT_TO_USINT(task.internal.laserIndex);
							task.status.pixelMapped[task.internal.pixelIndex] := TRUE;
							
						ELSE
							// If data in file exceed max, close file and fail pixel remap command
							task.status.sequence := SEQUENCE_CLOSE_FILE;
							
						END_IF
						
					END_IF
					
				END_IF
				
			END_IF
			
		SEQUENCE_RESET_IDENTIFIER:
			
			task.internal.identifier := Pixel;
			IF (task.internal.fbReadEx.offset > task.internal.dataLength) THEN
				
				task.status.sequence := SEQUENCE_CLOSE_FILE;
				
			ELSE
				
				task.status.sequence := SEQUENCE_READ;
				task.internal.offsetRead := task.internal.offsetRead + 1;
				
			END_IF
			
		SEQUENCE_CLOSE_FILE:
			
			IF task.internal.fbClose.status = ERR_FUB_ENABLE_FALSE THEN
				
				task.internal.fbClose.enable := TRUE;
				task.internal.fbClose.ident := task.internal.fileHandle;
				
			ELSIF task.internal.fbClose.status = ERR_OK THEN
				
				task.internal.fbClose.enable := FALSE;				
				task.status.sequence := SEQUENCE_VALIDATE_MAP_DATA;
				
			ELSIF task.internal.fbClose.status = ERR_FUB_BUSY THEN
				
				// Enable must stay true, and it does
				
			ELSE // Error closing the file
				
				task.internal.fbClose.enable := FALSE;	
				vfAlarmEdge(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_PM_FILE_CLOSE_ERROR_AL9303);
				task.status.alarmActive := TRUE;
				task.status.sequence := SEQUENCE_ERROR;
				
			END_IF
			
			task.internal.fbClose();
			
			
		SEQUENCE_VALIDATE_MAP_DATA:
			// Default to done; change if there's an error
			task.status.sequence := SEQUENCE_DONE;
			
			// Check to make sure all pixels are mapped
			FOR task.internal.pixelLoopIndex := 0 TO (Configuration.MaxNumberOfPixelsUsed - 1) DO
				
				IF NOT(task.status.pixelMapped[task.internal.pixelLoopIndex]) THEN
					
					task.status.alarmActive := TRUE;
					vfAlarmEdge(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_PM_FILE_DATA_ERROR_AL9305);
					task.status.sequence := SEQUENCE_ERROR;
					
				END_IF
				
			END_FOR
		
			// Error- Pixel Num in file out of range 
			IF (NOT(task.internal.pixelNum > 0 AND task.internal.pixelNum <= MACHINE_NUM_LASERS_TOTAL) OR
				NOT (task.internal.rackNum > 0 AND task.internal.rackNum <= MACHINE_NUM_LASER_RACKS) OR 
				NOT (task.internal.laserNum > 0 AND task.internal.laserNum <= MACHINE_NUM_LASERS_PER_RACK)) THEN
				
				task.status.alarmActive := TRUE;
				vfAlarmEdge(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_PM_RANGE_EXCEEDED_AL9308);
				task.status.sequence := SEQUENCE_ERROR;
				
			END_IF
			
	END_CASE

END_ACTION
