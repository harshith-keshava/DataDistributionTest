
FUNCTION_BLOCK VfParseFixedEventFile
	
	IF (Enable) THEN
		
		// Trace the currently-active step; the most recent step is in array index [0].
		IF (local.Step <> local.StepTrace[0]) THEN		
			// Use the line below to determined the number of scans required for each operation.
			// IF (local.Step <> vfSTEP_FEF_INITIALIZE) AND (local.Step <> vfSTEP_FEF_IDLE) AND (local.Step <> vfSTEP_FEF_AWAIT_NEXT_COMMAND) AND (local.Step <> vfSTEP_FEF_ERROR) AND (local.Step <> vfSTEP_FEF_AWAIT_CMD_RESET) THEN		
			FOR local.index := 99 TO 1 BY (-1) DO
				local.StepTrace[local.index] := local.StepTrace[local.index-1];
			END_FOR					
			local.StepTrace[0] := local.Step;
		END_IF
		
		
		CASE local.Step OF
			
			// ------------------------------------------------------------------------------------------------------------------------------------------------
			// Initialize parser state.
			vfSTEP_FEF_INITIALIZE:
				Status.LayerFilename_GCode := '';
				Status.LayerFilename_FixedEvents := '';
				Status.LayerOpen := FALSE;
				Status.CurrentLayer := 0;	
				Status.ParsedTrajectoryNumber := 0;
				Status.ParseTrajectoryComplete := FALSE;
				Status.LayerClosed := FALSE;
				Status.LayerAborted := FALSE;
				Status.Error := FALSE;
				Status.ErrorID := ERR_OK;
				
				local.FB.FileOpen.enable := FALSE;
				local.FB.FileReadEx.enable := FALSE;
				local.FB.FileClose.enable := FALSE;
				
				local.ParsedHeaderLine := FALSE;
				local.FoundTrajectory := FALSE;
				local.TrajectoryNumber := fvp_FIRST_TRAJECTORY_NUMBER;
				local.FinalTrajectoryNumber := 0;
				local.LayerAborted := FALSE;
				local.LayerClosed := FALSE;
				
				IF NOT (Command.ParseTrajectory OR Command.OpenLayer OR Command.CloseLayer OR Command.AbortLayer OR Command.ResetError) THEN
					local.Step := vfSTEP_FEF_IDLE;
				END_IF
												
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for incoming command to open the specified layer file.
			vfSTEP_FEF_IDLE:
				Active := TRUE;	
				
				Status.LayerFilename_GCode := '';
				Status.LayerFilename_FixedEvents := '';
				local.ParsedHeaderLine := FALSE;
				local.FoundTrajectory := FALSE;
				local.TrajectoryNumber := fvp_FIRST_TRAJECTORY_NUMBER;
				local.FinalTrajectoryNumber := 0;
				local.LayerAborted := FALSE;
				local.LayerClosed := FALSE;

				IF (Command.OpenLayer) AND NOT (Command.CloseLayer OR Command.AbortLayer OR Command.ResetError) THEN
					IF (Command.SelectedBuildLayout > 0) AND (Command.SelectedPrintNumber > 0) THEN
						local.BuildLayout := Command.SelectedBuildLayout;
						local.PrintNumber := Command.SelectedPrintNumber;
						local.LayerNumber := Command.SelectedLayer;
						local.Step := vfSTEP_FEF_CREATE_LAYER_FILENAME;	
					END_IF						
				ELSIF (Command.AbortLayer) THEN	
					local.LayerAborted := TRUE;
					local.Step := vfSTEP_FEF_CLOSE_FILE;	
				END_IF
		
				
					
				// ------------------------------------------------------------------------------------------------------------------------------------------------
			vfSTEP_FEF_CREATE_LAYER_FILENAME:				
			
				// Convert the desired build layout number to a string with the "XXXXX" format, adding required leading 0s.
				brsitoa(local.BuildLayout, ADR(local.Temp_string));						
				IF (local.BuildLayout > 9999) THEN
					local.BuildLayout_string := '';
				ELSIF (local.BuildLayout > 999) THEN
					local.BuildLayout_string := '0';
				ELSIF (local.BuildLayout > 99) THEN
					local.BuildLayout_string := '00';
				ELSIF (local.BuildLayout > 9) THEN
					local.BuildLayout_string := '000';
				ELSE
					local.BuildLayout_string := '0000';
				END_IF
				brsstrcat(ADR(local.BuildLayout_string), ADR(local.Temp_string));				

				// Convert the desired print number to a string with the "YYYY" format, adding required leading 0s.
				brsitoa(local.PrintNumber, ADR(local.Temp_string));						
				IF (local.PrintNumber > 999) THEN
					local.PrintNumber_string := '';
				ELSIF (local.PrintNumber > 99) THEN
					local.PrintNumber_string := '0';
				ELSIF (local.PrintNumber > 9) THEN
					local.PrintNumber_string := '00';
				ELSE
					local.PrintNumber_string := '000';
				END_IF
				brsstrcat(ADR(local.PrintNumber_string), ADR(local.Temp_string));								
				
				// Convert the desired layer number to a string with the "nnnnn" format, adding required leading 0s.
				brsitoa(local.LayerNumber, ADR(local.Temp_string));						
				IF (local.LayerNumber > 9999) THEN
					local.LayerNumber_string := '';
				ELSIF (local.LayerNumber > 999) THEN
					local.LayerNumber_string := '0';
				ELSIF (local.LayerNumber > 99) THEN
					local.LayerNumber_string := '00';
				ELSIF (local.LayerNumber > 9) THEN
					local.LayerNumber_string := '000';
				ELSE
					local.LayerNumber_string := '0000';
				END_IF
				brsstrcat(ADR(local.LayerNumber_string), ADR(local.Temp_string));				
								
				// Format the complete layer filename.
				// The .vffe file type extension stands for Vulcan Forms Fixed Events
				local.LayerFileName_FixedEvents := 'VF-';
				brsstrcat(ADR(local.LayerFileName_FixedEvents), ADR(local.BuildLayout_string));
				brsstrcat(ADR(local.LayerFileName_FixedEvents), ADR('-'));
				brsstrcat(ADR(local.LayerFileName_FixedEvents), ADR(local.PrintNumber_string));
				brsstrcat(ADR(local.LayerFileName_FixedEvents), ADR('_L'));
				brsstrcat(ADR(local.LayerFileName_FixedEvents), ADR(local.LayerNumber_string));
				brsstrcat(ADR(local.LayerFileName_FixedEvents), ADR('_FixedEvents.vffe'));

				// Format the complete layer filename.
				// The .cnc file type extension stands for a G-code (CNC) motion control file.
				local.LayerFileName_GCode := 'VF-';
				brsstrcat(ADR(local.LayerFileName_GCode), ADR(local.BuildLayout_string));
				brsstrcat(ADR(local.LayerFileName_GCode), ADR('-'));
				brsstrcat(ADR(local.LayerFileName_GCode), ADR(local.PrintNumber_string));
				brsstrcat(ADR(local.LayerFileName_GCode), ADR('_L'));
				brsstrcat(ADR(local.LayerFileName_GCode), ADR(local.LayerNumber_string));
				brsstrcat(ADR(local.LayerFileName_GCode), ADR('_GCode.cnc'));
				
				Status.LayerFilename_FixedEvents := local.LayerFileName_FixedEvents;
				Status.LayerFilename_GCode := local.LayerFileName_GCode := local.LayerFileName_GCode;
				local.Step := vfSTEP_FEF_OPEN_FILE;	
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Open the PTR fixed event file for the specified layer in read-only mode.
			vfSTEP_FEF_OPEN_FILE:
				local.FB.FileOpen.pDevice := ADR('CurrentPTRControlFiles');
				local.FB.FileOpen.pFile := ADR(local.LayerFileName_FixedEvents);
				local.FB.FileOpen.mode := fiREAD_ONLY;
				local.FB.FileOpen.enable := TRUE;
				local.Step := vfSTEP_FEF_WAIT_FILE_OPEN;

				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for file to be open or failure.
			vfSTEP_FEF_WAIT_FILE_OPEN:				
				IF (local.FB.FileOpen.status = ERR_OK) THEN
					local.FB.FileOpen.enable := FALSE;
					local.LocalFileHandle := local.FB.FileOpen.ident;
					local.FileReadOffset := 0;
					// Notify the caller that the requested layer is open.
					Status.LayerOpen := TRUE;
					Status.CurrentLayer := local.LayerNumber;
					local.Step := vfSTEP_FEF_AWAIT_COMMAND;					
					
				ELSIF (local.FB.FileOpen.status <> ERR_FUB_BUSY) THEN
					local.FB.FileOpen.enable := FALSE;
					Status.Error := TRUE;
					Status.ErrorID := local.FB.FileOpen.status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_FEF_ERROR;					
				END_IF
				
				
							
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for incoming command to begin parsing the specified trajectory number.
				// Once parsing is started, commands to process each subsequent trajectory in the same file will start from step vfSTEP_FEF_AWAIT_NEXT_COMMAND.				
			vfSTEP_FEF_AWAIT_COMMAND:
				IF (Command.ParseTrajectory) AND NOT (Command.CloseLayer OR Command.AbortLayer OR Command.ResetError) THEN									
					IF (Command.OptionalStartingTrajectory > fvp_FIRST_TRAJECTORY_NUMBER) THEN
						local.TrajectoryNumber := Command.OptionalStartingTrajectory;
					ELSE					
						local.TrajectoryNumber := fvp_FIRST_TRAJECTORY_NUMBER;
					END_IF	
					local.FoundTrajectory := FALSE;
					local.FinalTrajectoryNumber := 0;
					local.FileReadOffset := 0;
					local.Step := vfSTEP_FEF_READ_FILE_DATA;
					
				ELSIF (Command.CloseLayer) THEN
					local.LayerClosed := TRUE;
					local.Step := vfSTEP_FEF_CLOSE_FILE;					
					
				ELSIF (Command.AbortLayer) THEN	
					local.LayerAborted := TRUE;
					local.Step := vfSTEP_FEF_CLOSE_FILE;	
				END_IF
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Read the next chunk of data large enough to contain all of the trajectory parameters.
			vfSTEP_FEF_READ_FILE_DATA:													
				// Clear the receiving buffer.
				local.StartingByteAddress := ADR(local.DataBuffer);				
				brsmemset(local.StartingByteAddress, 0, vfp_FEF_FILE_READ_BUFFER_SIZE);				

				local.ReadLengthBytes := vfp_FEF_FILE_READ_BUFFER_SIZE - 1;
				
				// Read the block of data starting at the current FileReadOffset.
				local.FB.FileReadEx.ident := local.LocalFileHandle;
				local.FB.FileReadEx.offset := local.FileReadOffset;
				local.FB.FileReadEx.len := local.ReadLengthBytes; 
				local.FB.FileReadEx.pDest := local.StartingByteAddress;
				local.FB.FileReadEx.enable := TRUE;
				local.Step := vfSTEP_FEF_WAIT_READ_DONE;
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for data read to complete.
			vfSTEP_FEF_WAIT_READ_DONE:
				IF (local.FB.FileReadEx.status = ERR_OK) THEN
					local.FB.FileReadEx.enable := FALSE;
					local.NextByteAddress := local.StartingByteAddress;
					local.TotalBytesRead := local.FB.FileReadEx.bytesread;					
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
					IF (local.ParsedHeaderLine) THEN
						local.Step := vfSTEP_FEF_FIND_TRAJECTORY_HDR;					
					ELSE
						local.Step := vfSTEP_FEF_PARSE_FILE_HDR;					
					END_IF
						
				ELSIF (local.FB.FileReadEx.status <> ERR_FUB_BUSY) THEN
					local.FB.FileReadEx.enable := FALSE;
					local.TotalBytesRead := 0;
					Status.Error := TRUE;
					Status.ErrorID := local.FB.FileReadEx.status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_FEF_CLOSE_FILE;					
				END_IF
		
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Parse the file header line.		
			vfSTEP_FEF_PARSE_FILE_HDR:
				
				// TODO: This is a hack - should parse each header element in a separate step to simplify format error identification.
				local.HeaderElement := 0;
				
				// Read the Build Name.
				local.HeaderElement := local.HeaderElement + 1;
				local.BuildName := '';				
				local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
				local.Status := GetNextString(ADR(local.NextByteAddress), ADR(local.BuildName));
				
				// Read the Layer Number.
				IF (local.Status = vfp_ERR_OK) THEN 
					local.HeaderElement := local.HeaderElement + 1;
					local.ParameterValue := 0;
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
					local.Status := GetNextParameter(ADR(local.NextByteAddress), ADR(local.ParameterValue));
				ELSE
					local.Status := vfp_ERR_BAD_HEADER;
				END_IF					
				
				// Read the Total Number of Layers.
				IF (local.Status = vfp_ERR_OK) THEN 
					local.HeaderElement := local.HeaderElement + 1;
					local.ParameterValue := 0;
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
					local.Status := GetNextParameter(ADR(local.NextByteAddress), ADR(local.ParameterValue));
				ELSE
					local.Status := vfp_ERR_BAD_HEADER;
				END_IF
				
				// Read the Total Number of Trajectories (in this layer).
				IF (local.Status = vfp_ERR_OK) THEN 
					local.HeaderElement := local.HeaderElement + 1;
					local.ParameterValue := 0;
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
					local.Status := GetNextParameter(ADR(local.NextByteAddress), ADR(local.ParameterValue));

					IF (local.Status = vfp_ERR_OK) THEN
						IF (local.ParameterValue > 0) THEN	
							// The final trajectory number is a multiple of 10.
							local.FinalTrajectoryNumber := LREAL_TO_UINT(local.ParameterValue) * 10;						
						ELSE
							local.Status := vfp_ERR_HEADER_INVALID_NUM_TRAJ;
						END_IF					
					ELSE
						local.Status := vfp_ERR_BAD_HEADER;	
					END_IF
				ELSE
					local.Status := vfp_ERR_BAD_HEADER;					
				END_IF
				
				// Read the Build Plate format.
				IF (local.Status = vfp_ERR_OK) THEN
					local.HeaderElement := local.HeaderElement + 1;
					local.BuildPlateFormat := '';
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
					local.Status := GetNextString(ADR(local.NextByteAddress), ADR(local.BuildPlateFormat));
				ELSE
					local.Status := vfp_ERR_BAD_HEADER;
				END_IF
				
				IF (local.Status <> vfp_ERR_OK) AND (local.Status <> vfp_ERR_EOL_REACHED) THEN
					Status.Error := TRUE;
					Status.ErrorID := local.Status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_FEF_CLOSE_FILE;
				ELSE			
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
					local.MaxBytes := local.TotalBytesRead - local.CurrentByteIndex;
					local.Status := FindNextLineStart(ADR(local.NextByteAddress), local.MaxBytes);			
					IF (local.Status = vfp_ERR_OK) THEN
						local.ParsedHeaderLine := TRUE;
						local.Step := vfSTEP_FEF_FIND_TRAJECTORY_HDR;
					ELSE								
						local.Status := vfp_ERR_MISSING_DATA;
						Status.Error := TRUE;
						Status.ErrorID := local.Status;
						local.ErrorStep := local.Step;
						local.Step := vfSTEP_FEF_CLOSE_FILE;								
					END_IF								
				END_IF				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Find the next trajectory header "Nxxxx" by searching for the next 'N' character without going beyond the end of the buffer. 
			vfSTEP_FEF_FIND_TRAJECTORY_HDR:
				local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
				local.MaxBytes := local.TotalBytesRead - local.CurrentByteIndex;
				local.Status := FindNextTrajectoryStart(ADR(local.NextByteAddress), local.MaxBytes);
				
				IF (local.Status = vfp_ERR_OK) THEN
					local.Step := vfSTEP_FEF_PARSE_TRAJECTORY_HDR;
					
				ELSIF (local.Status = vfp_ERR_MISSING_DATA) THEN
					local.FileReadOffset := local.FileReadOffset + (local.NextByteAddress - local.StartingByteAddress);
					local.Step := vfSTEP_FEF_READ_FILE_DATA;	
				
				ELSE 
					local.FB.FileReadEx.enable := FALSE;
					local.TotalBytesRead := 0;
					Status.Error := TRUE;
					Status.ErrorID := local.Status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_FEF_CLOSE_FILE;					
				END_IF			
				
						
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Parse the trajectory header to determine if it matches the desired trajectory number.
				// The trajectory header "Nxxxx" is identical to the G-code line number associated with that trajectory.
				// By convention, the value of xxxx is always 4 digits long, the first trajectory is always N0010, and subsequent trajectories increment by 10.
				// This makes it simple to identify the next "printing" trajectory and allows up to 9 lines of G-code between each.
			vfSTEP_FEF_PARSE_TRAJECTORY_HDR:	
				// Read the trajectory identifer "Nxxxx" at the start of the pass.
				local.ParameterValue_string := '';
				local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
				local.Status := GetNextString(ADR(local.NextByteAddress), ADR(local.ParameterValue_string));
				
				IF (local.Status = vfp_ERR_OK) THEN
					
					// Convert the desired trajectory number to a string with the "Nxxxx" format, adding required leading 0s.
					brsitoa(local.TrajectoryNumber, ADR(local.Temp_string));						
					IF (local.TrajectoryNumber > 999) THEN
						local.GCodeLineNumber_string := 'N';
					ELSIF (local.TrajectoryNumber > 99) THEN
						local.GCodeLineNumber_string := 'N0';
					ELSIF (local.TrajectoryNumber > 9) THEN
						local.GCodeLineNumber_string := 'N00';
					ELSE
						local.GCodeLineNumber_string := 'N000';
					END_IF
					brsstrcat(ADR(local.GCodeLineNumber_string), ADR(local.Temp_string));
						
					// Compare the desired trajectory number with that read from the file.
					// If the two match, we have located the desired trajectory, so continue with processing..
					IF (brsstrcmp(ADR(local.GCodeLineNumber_string), ADR(local.ParameterValue_string)) = 0) THEN					
						
						// Identify the trajectory number in the parsed data buffer.
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].TrajectoryNumber := local.TrajectoryNumber;																										
						local.Step := vfSTEP_FEF_PARSE_MASTER_AXIS;	
							
						// Set the flag indicating that the trajectory marker has been located.
						local.FoundTrajectory := TRUE;
						
						// Otherwise, continue searching the file for the desired trajectory number.
					ELSE
						local.FileReadOffset := local.FileReadOffset + (local.NextByteAddress - local.StartingByteAddress);
						local.Step := vfSTEP_FEF_READ_FILE_DATA;	
					END_IF
					
				ELSE
					pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
					Status.Error := TRUE;
					Status.ErrorID := local.Status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_FEF_CLOSE_FILE;													
				END_IF
							
			
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Extract the master axis (X or Y) for this trajectory.
			vfSTEP_FEF_PARSE_MASTER_AXIS:				
				local.ParameterValue_string := '';
				local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
				local.Status := GetNextString(ADR(local.NextByteAddress), ADR(local.ParameterValue_string));
				
				IF (local.Status = vfp_ERR_OK) THEN	
					
					IF (brsstrcmp(ADR('X'), ADR(local.ParameterValue_string)) = 0) THEN						
						local.MasterAxis := vfp_FEF_MASTER_AXIS_X;	
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].MasterAxis := local.MasterAxis;
						local.Step := vfSTEP_FEF_PARSE_START_POSN;	
					ELSIF (brsstrcmp(ADR('Y'), ADR(local.ParameterValue_string)) = 0) THEN
						local.MasterAxis := vfp_FEF_MASTER_AXIS_Y;	
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].MasterAxis := local.MasterAxis;
						local.Step := vfSTEP_FEF_PARSE_START_POSN;	
					ELSE		
						local.Status := vfp_ERR_INVALID_PARAMETER;
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
						Status.Error := TRUE;
						Status.ErrorID := local.Status;
						local.ErrorStep := local.Step;
						local.Step := vfSTEP_FEF_CLOSE_FILE;							
					END_IF
					
				ELSE
					pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
					Status.Error := TRUE;
					Status.ErrorID := local.Status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_FEF_CLOSE_FILE;													
				END_IF
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Extract the start position for this trajectory.
			vfSTEP_FEF_PARSE_START_POSN:
				local.ParameterValue := 0;
				local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
				local.Status := GetNextParameter(ADR(local.NextByteAddress), ADR(local.ParameterValue));
					
				IF (local.Status = vfp_ERR_OK) THEN	
					
					// Interpret the parameter as a LREAL value.
					IF (local.ParameterValue > 0.0) AND (local.ParameterValue < vfp_FEF_MAX_X_Y_POSN_MM) THEN
						local.StartPosition := LREAL_TO_REAL(local.ParameterValue);
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].StartPositionMM := local.StartPosition;
						local.Step := vfSTEP_FEF_PARSE_END_POSN;	
					ELSE		
						local.Status := vfp_ERR_INVALID_PARAMETER;
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
						Status.Error := TRUE;
						Status.ErrorID := local.Status;
						local.ErrorStep := local.Step;
						local.Step := vfSTEP_FEF_CLOSE_FILE;							
					END_IF
					
				ELSE
					pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
					Status.Error := TRUE;
					Status.ErrorID := local.Status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_FEF_CLOSE_FILE;													
				END_IF
				

				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Extract the end position for this trajectory.
			vfSTEP_FEF_PARSE_END_POSN:
				local.ParameterValue := 0;
				local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
				local.Status := GetNextParameter(ADR(local.NextByteAddress), ADR(local.ParameterValue));
					
				IF (local.Status = vfp_ERR_OK) THEN	
					
					// Interpret the parameter as a LREAL value.
					IF (local.ParameterValue > 0.0) AND (local.ParameterValue < vfp_FEF_MAX_X_Y_POSN_MM) AND (local.ParameterValue > REAL_TO_LREAL(local.StartPosition)) THEN
						local.EndPosition := LREAL_TO_REAL(local.ParameterValue);
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].EndPositionMM := local.EndPosition;
						local.Step := vfSTEP_FEF_PARSE_EVENT_PERIOD;	
					ELSE		
						local.Status := vfp_ERR_INVALID_PARAMETER;
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
						Status.Error := TRUE;
						Status.ErrorID := local.Status;
						local.ErrorStep := local.Step;
						local.Step := vfSTEP_FEF_CLOSE_FILE;							
					END_IF
					
				ELSE
					pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
					Status.Error := TRUE;
					Status.ErrorID := local.Status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_FEF_CLOSE_FILE;													
				END_IF



				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Extract the event period for this trajectory.
			vfSTEP_FEF_PARSE_EVENT_PERIOD:
				local.ParameterValue := 0;
				local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
				local.Status := GetNextParameter(ADR(local.NextByteAddress), ADR(local.ParameterValue));
					
				// This is the last parameter on the line, so EOL_REACHED is expected.
				IF (local.Status = vfp_ERR_OK) OR (local.Status = vfp_ERR_EOL_REACHED) THEN	
					
					// Interpret the parameter as a LREAL value.
					IF (local.ParameterValue > 0.0) AND (local.ParameterValue < 1.0) THEN
						local.EventPeriod := LREAL_TO_REAL(local.ParameterValue);
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].EventPeriodMM := local.EventPeriod;
						
						Status.ParseTrajectoryComplete := TRUE;
						Status.FinalTrajectoryNumber := local.FinalTrajectoryNumber;
						Status.ParsedTrajectoryNumber := local.TrajectoryNumber;											
						local.Step := vfSTEP_FEF_TRAJECTORY_PARSE_DONE;	
					ELSE		
						local.Status := vfp_ERR_INVALID_PARAMETER;
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
						Status.Error := TRUE;
						Status.ErrorID := local.Status;
						local.ErrorStep := local.Step;
						local.Step := vfSTEP_FEF_CLOSE_FILE;							
					END_IF
					
				ELSE
					pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
					Status.Error := TRUE;
					Status.ErrorID := local.Status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_FEF_CLOSE_FILE;													
				END_IF
				
				
				
							
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Trajectory parsing is now complete; await command reset.
			vfSTEP_FEF_TRAJECTORY_PARSE_DONE:
				IF (NOT Command.ParseTrajectory) THEN
					Status.ParseTrajectoryComplete := FALSE;
					Status.ParsedTrajectoryNumber := 0;
					local.Step := vfSTEP_FEF_AWAIT_NEXT_COMMAND;
				END_IF
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for the next command.
			vfSTEP_FEF_AWAIT_NEXT_COMMAND:
				IF (Command.ParseTrajectory) THEN
					// Increment to the next trajectory number.
					local.FoundTrajectory := FALSE;
					local.TrajectoryNumber := local.TrajectoryNumber + fvp_TRAJECTORY_NUMBER_INCREMENT;					
					local.FileReadOffset := local.FileReadOffset + (local.NextByteAddress - local.StartingByteAddress);
					local.Step := vfSTEP_FEF_READ_FILE_DATA;
					
				ELSIF (Command.CloseLayer) THEN
					local.LayerClosed := TRUE;
					local.Step := vfSTEP_FEF_CLOSE_FILE;					
					
				ELSIF (Command.AbortLayer) THEN	
					local.LayerAborted := TRUE;
					local.Step := vfSTEP_FEF_CLOSE_FILE;	
				END_IF

				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Close the file.
			vfSTEP_FEF_CLOSE_FILE:				
				local.FB.FileClose.ident := local.LocalFileHandle;
				local.FB.FileClose.enable := TRUE;
				local.Step := vfSTEP_FEF_WAIT_FILE_CLOSED;
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for file to complete closing.
			vfSTEP_FEF_WAIT_FILE_CLOSED:
				IF (local.FB.FileClose.status = ERR_OK) THEN
					local.FB.FileClose.enable := FALSE;
					IF (Status.Error) THEN
						local.Step := vfSTEP_FEF_ERROR;
					ELSIF (local.LayerAborted) THEN
						local.Step := vfSTEP_FEF_LAYER_ABORTED;
					ELSE
						local.Step := vfSTEP_FEF_LAYER_CLOSED;
					END_IF	
					
				ELSIF (local.FB.FileClose.status <> ERR_FUB_BUSY) THEN
					local.FB.FileClose.enable := FALSE;
					Status.Error := TRUE;
					Status.ErrorID := local.FB.FileClose.status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_FEF_ERROR;					
				END_IF			
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// File parsing is now complete.
				// Wait for all commands to be FALSE before returning to IDLE step.
			vfSTEP_FEF_LAYER_CLOSED:
				Status.LayerOpen := FALSE;
				Status.LayerClosed := TRUE;
				local.Step := vfSTEP_FEF_AWAIT_CMD_RESET;
				
				

				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// File parsing was aborted.
			vfSTEP_FEF_LAYER_ABORTED:
				Status.LayerOpen := FALSE;
				Status.LayerAborted := TRUE;
				local.Step := vfSTEP_FEF_AWAIT_CMD_RESET;
					
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Jump here on any sort of error and wait for ErrorReset command.
			vfSTEP_FEF_ERROR:
				Status.LayerOpen := FALSE;
				Status.Error := TRUE;
				IF (Command.ResetError) THEN
					Status.Error := FALSE;
					Status.ErrorID := ERR_OK;					
					local.Step := vfSTEP_FEF_AWAIT_CMD_RESET;
				END_IF
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for all commands to be FALSE before returning to IDLE step.
			vfSTEP_FEF_AWAIT_CMD_RESET:
				IF NOT (Command.ParseTrajectory OR Command.OpenLayer OR Command.CloseLayer OR Command.AbortLayer OR Command.ResetError) THEN									
					Status.LayerOpen := FALSE;
					Status.CurrentLayer := 0;	
					Status.ParsedTrajectoryNumber := 0;
					Status.ParseTrajectoryComplete := FALSE;
					Status.LayerClosed := FALSE;
					Status.LayerAborted := FALSE;
					Status.Error := FALSE;
					Status.ErrorID := ERR_OK;					
					local.Step := vfSTEP_FEF_INITIALIZE;
				END_IF										
			
		END_CASE
				

		
	ELSE  // function block NOT enabled
	
		Active := FALSE;
		
		Status.LayerOpen := FALSE;
		Status.CurrentLayer := 0;		
		Status.ParsedTrajectoryNumber := 0;
		Status.ParseTrajectoryComplete := FALSE;
		Status.LayerClosed := FALSE;
		Status.LayerAborted := FALSE;
		Status.Error := FALSE;
		Status.ErrorID := ERR_OK;

		local.Step := vfSTEP_FEF_INITIALIZE;
		local.ErrorStep := vfSTEP_FEF_INITIALIZE;		
		local.FB.FileOpen.enable := FALSE;
		local.FB.FileReadEx.enable := FALSE;
		local.FB.FileClose.enable := FALSE;
		
	END_IF
	
	GetSystemErrorText(Status.ErrorID, ADR(Status.ErrorText));			
	
	local.FB.FileOpen();
	local.FB.FileReadEx();
	local.FB.FileClose();
	
END_FUNCTION_BLOCK
