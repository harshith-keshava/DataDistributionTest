// Laser State File format:
//
//	BuildName, Layer, TotalLayers, TotalTrajectories, BuildPlateFormat, RackNumber
//	N0010,NumEvents,Laser1Power,Laser2Power,Laser3Power,…Laser19Power
//	Laser1LSW1,Laser1LSW2,Laser1LSW3,…Laser1LSW<NumEvents>
//	Laser2LSW1,Laser2LSW2,Laser2LSW3,…Laser2LSW<NumEvents>
//	Laser3LSW1,Laser3LSW2,Laser3LSW3,…Laser3LSW<NumEvents>
//	…
//	Laser19LSW1,Laser19LSW2,Laser19LSW3,…Laser19LSW<NumEvents>
//	N0020,NumEvents,Laser1Power,Laser2Power,Laser3Power,…Laser19Power
//	Laser1LSW1,Laser1LSW2,Laser1LSW3,…Laser1LSW<NumEvents>
//	Laser2LSW1,Laser2LSW2,Laser2LSW3,…Laser2LSW<NumEvents>
//	
//	
//	BuildName = Name of the build being processed (string)
//	Layer = Current layer number (int)
//	TotalLayers = Total number of layers (int)
//	TotalTrajectories = Total number of trajectories on current layer (int)
//	BuildPlateFormat = build plate format used, [200x600, 400x600, 600x600] (string)
//	RackNumber = The rack for the current file (int) [1..8]
//	
//	Nxxxx = print trajectory number; will always start at 0010 and increment by 10; always 4 digits
//	NumEvents = the number of events in that trajectory (can be used as an error check)
//	LaserNPower = the % power value for LaserN during that trajectory move


FUNCTION_BLOCK VfParseLaserStateFile
	
	IF (Enable) THEN
		
		// Trace the currently-active step; the most recent step is in array index [0].
		IF (local.Step <> local.StepTrace[0]) THEN		
			// Use the line below to determined the number of scans required for each operation.
			// IF (local.Step <> vfSTEP_LSF_INITIALIZE) AND (local.Step <> vfSTEP_LSF_IDLE) AND (local.Step <> vfSTEP_LSF_AWAIT_NEXT_COMMAND) AND (local.Step <> vfSTEP_LSF_ERROR) AND (local.Step <> vfSTEP_LSF_AWAIT_CMD_RESET) THEN		
			FOR local.index := 99 TO 1 BY (-1) DO
				local.StepTrace[local.index] := local.StepTrace[local.index-1];
			END_FOR					
			local.StepTrace[0] := local.Step;
		END_IF
		
		
		CASE local.Step OF
			
			// ------------------------------------------------------------------------------------------------------------------------------------------------
			// Initialize parser state.
			vfSTEP_LSF_INITIALIZE:
				Status.LayerFilename := '';
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
					local.Step := vfSTEP_LSF_IDLE;
				END_IF
												
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for incoming command to open the specified layer file.
			vfSTEP_LSF_IDLE:
				Active := TRUE;	
				
				Status.LayerFilename := '';
				local.ParsedHeaderLine := FALSE;
				local.FoundTrajectory := FALSE;
				local.TrajectoryNumber := fvp_FIRST_TRAJECTORY_NUMBER;
				local.FinalTrajectoryNumber := 0;
				local.LayerAborted := FALSE;
				local.LayerClosed := FALSE;

				IF (Command.OpenLayer) AND NOT (Command.CloseLayer OR Command.AbortLayer OR Command.ResetError) THEN
					IF (Command.SelectedBuildLayout > 0) AND (Command.SelectedPrintNumber > 0) AND (Command.SelectedRack > 0) THEN
						local.BuildLayout := Command.SelectedBuildLayout;
						local.PrintNumber := Command.SelectedPrintNumber;
						local.RackNumber := Command.SelectedRack;
						local.LastLaserNumber := Command.NumLasersInRack;
						local.LayerNumber := Command.SelectedLayer;
						local.Step := vfSTEP_LSF_CREATE_LAYER_FILENAME;	
					END_IF						
				ELSIF (Command.AbortLayer) THEN	
					local.LayerAborted := TRUE;
					local.Step := vfSTEP_LSF_CLOSE_FILE;	
				END_IF
		
				
					
				// ------------------------------------------------------------------------------------------------------------------------------------------------
			vfSTEP_LSF_CREATE_LAYER_FILENAME:				
			
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
				
				// Convert the desired rack number to a string with the "rr" format, adding required leading 0s.
				brsitoa(local.RackNumber, ADR(local.Temp_string));						
				IF (local.RackNumber > 9) THEN
					local.RackNumber_string := '';
				ELSE
					local.RackNumber_string := '0';
				END_IF
				brsstrcat(ADR(local.RackNumber_string), ADR(local.Temp_string));
			
				
				// Format the complete layer filename.
				// The .vflc file type extension stands for Vulcan Forms Laser Control
				local.LayerFileName := 'VF-';
				brsstrcat(ADR(local.LayerFileName), ADR(local.BuildLayout_string));
				brsstrcat(ADR(local.LayerFileName), ADR('-'));
				brsstrcat(ADR(local.LayerFileName), ADR(local.PrintNumber_string));
				brsstrcat(ADR(local.LayerFileName), ADR('_L'));
				brsstrcat(ADR(local.LayerFileName), ADR(local.LayerNumber_string));
				brsstrcat(ADR(local.LayerFileName), ADR('_LaserControl_R'));
				brsstrcat(ADR(local.LayerFileName), ADR(local.RackNumber_string));
				brsstrcat(ADR(local.LayerFileName), ADR('.vflc'));
				
				Status.LayerFilename := local.LayerFileName;				
				local.Step := vfSTEP_LSF_OPEN_FILE;	
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Open the laser state file for the specified layer in read-only mode.
			vfSTEP_LSF_OPEN_FILE:
				local.FB.FileOpen.pDevice := ADR('CurrentLaserControlFiles');
				local.FB.FileOpen.pFile := ADR(local.LayerFileName);
				local.FB.FileOpen.mode := fiREAD_ONLY;
				local.FB.FileOpen.enable := TRUE;
				local.Step := vfSTEP_LSF_WAIT_FILE_OPEN;

				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for file to be open or failure.
			vfSTEP_LSF_WAIT_FILE_OPEN:				
				IF (local.FB.FileOpen.status = ERR_OK) THEN
					local.FB.FileOpen.enable := FALSE;
					local.LocalFileHandle := local.FB.FileOpen.ident;
					local.FileReadOffset := 0;
					// Notify the caller that the requested layer is open.
					Status.LayerOpen := TRUE;
					Status.CurrentLayer := local.LayerNumber;
					local.Step := vfSTEP_LSF_AWAIT_COMMAND;					
					
				ELSIF (local.FB.FileOpen.status <> ERR_FUB_BUSY) THEN
					local.FB.FileOpen.enable := FALSE;
					Status.Error := TRUE;
					Status.ErrorID := local.FB.FileOpen.status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_LSF_ERROR;					
				END_IF
				
				
							
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for incoming command to begin parsing the specified trajectory number.
				// Once parsing is started, commands to process each subsequent trajectory in the same file will start from step vfSTEP_LSF_AWAIT_NEXT_COMMAND.				
			vfSTEP_LSF_AWAIT_COMMAND:
				IF (Command.ParseTrajectory) AND NOT (Command.CloseLayer OR Command.AbortLayer OR Command.ResetError) THEN									
					IF (Command.OptionalStartingTrajectory > fvp_FIRST_TRAJECTORY_NUMBER) THEN
						local.TrajectoryNumber := Command.OptionalStartingTrajectory;
					ELSE					
						local.TrajectoryNumber := fvp_FIRST_TRAJECTORY_NUMBER;
					END_IF	
					local.FoundTrajectory := FALSE;
					local.FinalTrajectoryNumber := 0;
					local.FileReadOffset := 0;
					local.Step := vfSTEP_LSF_READ_FILE_DATA;
					
				ELSIF (Command.CloseLayer) THEN
					local.LayerClosed := TRUE;
					local.Step := vfSTEP_LSF_CLOSE_FILE;					
					
				ELSIF (Command.AbortLayer) THEN	
					local.LayerAborted := TRUE;
					local.Step := vfSTEP_LSF_CLOSE_FILE;	
				END_IF
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Read the next chunk of data large enough to hold the maximum possible trajectory (probably far too long in many cases).
			vfSTEP_LSF_READ_FILE_DATA:													
				// Clear the receiving buffer.
				local.StartingByteAddress := ADR(local.DataBuffer);				
				brsmemset(local.StartingByteAddress, 0, vfp_LSF_FILE_READ_BUFFER_SIZE);				

				// Calculate the number of bytes to read from the file that will include all data for the most complex trajectory.
				local.ReadLengthBytes := (vfp_LSF_NUM_LASERS_PER_SYSTEM * (vfp_LSF_MAX_32BIT_VAL_PER_TRAJ * vfp_LSF_MAX_CHARS_PER_32BIT_VAL)) + vfp_LSF_MAX_CHARS_PER_HEADER;
				// Check that the read buffer size can hold the above.
				IF (local.ReadLengthBytes >= vfp_LSF_FILE_READ_BUFFER_SIZE) THEN
					Status.Error := TRUE;
					Status.ErrorID := vfp_ERR_BUFFER_SIZE;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_LSF_ERROR;										
				ELSE				
					// Read the block of data starting at the current FileReadOffset
					local.FB.FileReadEx.ident := local.LocalFileHandle;
					local.FB.FileReadEx.offset := local.FileReadOffset;
					local.FB.FileReadEx.len := local.ReadLengthBytes; 
					local.FB.FileReadEx.pDest := local.StartingByteAddress;
					local.FB.FileReadEx.enable := TRUE;
					local.Step := vfSTEP_LSF_WAIT_READ_DONE;
				END_IF
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for data read to complete.
			vfSTEP_LSF_WAIT_READ_DONE:
				IF (local.FB.FileReadEx.status = ERR_OK) THEN
					local.FB.FileReadEx.enable := FALSE;
					local.NextByteAddress := local.StartingByteAddress;
					local.TotalBytesRead := local.FB.FileReadEx.bytesread;					
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
					IF (local.ParsedHeaderLine) THEN
						local.Step := vfSTEP_LSF_FIND_TRAJECTORY_HDR;					
					ELSE
						local.Step := vfSTEP_LSF_PARSE_FILE_HDR;					
					END_IF
						
				ELSIF (local.FB.FileReadEx.status <> ERR_FUB_BUSY) THEN
					local.FB.FileReadEx.enable := FALSE;
					local.TotalBytesRead := 0;
					Status.Error := TRUE;
					Status.ErrorID := local.FB.FileReadEx.status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_LSF_CLOSE_FILE;					
				END_IF
		
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Parse the file header line.		
			vfSTEP_LSF_PARSE_FILE_HDR:
				
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
					local.Step := vfSTEP_LSF_CLOSE_FILE;
				ELSE			
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
					local.MaxBytes := local.TotalBytesRead - local.CurrentByteIndex;
					local.Status := FindNextLineStart(ADR(local.NextByteAddress), local.MaxBytes);			
					IF (local.Status = vfp_ERR_OK) THEN
						local.ParsedHeaderLine := TRUE;
						local.Step := vfSTEP_LSF_FIND_TRAJECTORY_HDR;
					ELSE								
						local.Status := vfp_ERR_MISSING_DATA;
						Status.Error := TRUE;
						Status.ErrorID := local.Status;
						local.ErrorStep := local.Step;
						local.Step := vfSTEP_LSF_CLOSE_FILE;								
					END_IF								
				END_IF				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Find the next trajectory header "Nxxxx" by searching for the next 'N' character without going beyond the end of the buffer. 
			vfSTEP_LSF_FIND_TRAJECTORY_HDR:
				local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
				local.MaxBytes := local.TotalBytesRead - local.CurrentByteIndex;
				local.Status := FindNextTrajectoryStart(ADR(local.NextByteAddress), local.MaxBytes);
				
				IF (local.Status = vfp_ERR_OK) THEN
					local.Step := vfSTEP_LSF_PARSE_TRAJECTORY_HDR;
					
				ELSIF (local.Status = vfp_ERR_MISSING_DATA) THEN
					local.FileReadOffset := local.FileReadOffset + (local.NextByteAddress - local.StartingByteAddress);
					local.Step := vfSTEP_LSF_READ_FILE_DATA;	
				
				ELSE 
					local.FB.FileReadEx.enable := FALSE;
					local.TotalBytesRead := 0;
					Status.Error := TRUE;
					Status.ErrorID := local.Status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_LSF_CLOSE_FILE;					
				END_IF			
				
						
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Parse the trajectory header to determine if it matches the desired trajectory number.
				// The trajectory header "Nxxxx" is identical to the G-code line number associated with that trajectory.
				// By convention, the value of xxxx is always 4 digits long, the first trajectory is always N0010, and subsequent trajectories increment by 10.
				// This makes it simple to identify the next "printing" trajectory and allows up to 9 lines of G-code between each.
			vfSTEP_LSF_PARSE_TRAJECTORY_HDR:	
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
						local.Step := vfSTEP_LSF_PARSE_NUM_EVENTS;	
							
						// Set the flag indicating that the trajectory marker has been located.
						local.FoundTrajectory := TRUE;
						// Start with the first laser in the trajectory.
						local.LaserNumber := 1;							
						
						// Otherwise, continue searching the file for the desired trajectory number.
					ELSE
						local.FileReadOffset := local.FileReadOffset + (local.NextByteAddress - local.StartingByteAddress);
						local.Step := vfSTEP_LSF_READ_FILE_DATA;	
					END_IF
					
				ELSE
					pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
					Status.Error := TRUE;
					Status.ErrorID := local.Status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_LSF_CLOSE_FILE;													
				END_IF
							
			
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Extract the number of events (laser states) for this trajectory.
			vfSTEP_LSF_PARSE_NUM_EVENTS:				
				local.ParameterValue := 0;
				local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
				local.Status := GetNextParameter(ADR(local.NextByteAddress), ADR(local.ParameterValue));
				
				IF (local.Status = vfp_ERR_OK) THEN		
					IF (local.ParameterValue > 0) THEN						
						local.ExpectedNumEvents := LREAL_TO_UINT(local.ParameterValue);	
						// Verify that the expected number of events is within the valid range.
						IF (local.ExpectedNumEvents > 0.0) AND (local.ExpectedNumEvents < (vfp_LSF_MAX_32BIT_VAL_PER_TRAJ * 32)) THEN
							local.Step := vfSTEP_LSF_PARSE_LASER_POWERS;	
						ELSE		
							local.Status := vfp_ERR_INVALID_PARAMETER;
							pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
							Status.Error := TRUE;
							Status.ErrorID := local.Status;
							local.ErrorStep := local.Step;
							local.Step := vfSTEP_LSF_CLOSE_FILE;							
						END_IF
					ELSE
						local.Status := vfp_ERR_INVALID_PARAMETER;
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
						Status.Error := TRUE;
						Status.ErrorID := local.Status;
						local.ErrorStep := local.Step;
						local.Step := vfSTEP_LSF_CLOSE_FILE;													
					END_IF
					
				ELSE
					local.ExpectedNumEvents := 0;
					pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
					Status.Error := TRUE;
					Status.ErrorID := local.Status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_LSF_CLOSE_FILE;													
				END_IF
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Extract the laser power settings for this trajectory.
			vfSTEP_LSF_PARSE_LASER_POWERS:
				FOR local.LaserPowerValueIndex := 1 TO local.LastLaserNumber DO					
					local.ParameterValue := 0;
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
					local.Status := GetNextParameter(ADR(local.NextByteAddress), ADR(local.ParameterValue));
					
					CASE local.Status OF
						
						// Interpret the parameter as a LREAL value; more values expected.
						vfp_ERR_OK:
							IF (local.ParameterValue >= 0.0) AND (local.ParameterValue <= 100.0) THEN
								pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].LaserTrajectoryInfo[local.LaserPowerValueIndex].PowerSetpointPercent := LREAL_TO_REAL(local.ParameterValue);
							ELSE
								local.Status := vfp_ERR_INVALID_PARAMETER;
								pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
								Status.Error := TRUE;
								Status.ErrorID := local.Status;
								local.ErrorStep := local.Step;
								local.Step := vfSTEP_LSF_CLOSE_FILE;
								EXIT;
							END_IF
							
							// Interpret the parameter as a REAL value; this is the last laser power value value.
						vfp_ERR_EOL_REACHED:
							IF (local.ParameterValue >= 0.0) AND (local.ParameterValue <= 100.0) THEN
								pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].LaserTrajectoryInfo[local.LaserPowerValueIndex].PowerSetpointPercent := LREAL_TO_REAL(local.ParameterValue);
							ELSE
								local.Status := vfp_ERR_INVALID_PARAMETER;
								pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
								Status.Error := TRUE;
								Status.ErrorID := local.Status;
								local.ErrorStep := local.Step;
								local.Step := vfSTEP_LSF_CLOSE_FILE;
								EXIT;
							END_IF
									
							// Find the start of the next line without going beyond the end of the buffer. 
							local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;							
							local.MaxBytes := local.TotalBytesRead - local.CurrentByteIndex;
							local.Status := FindNextLineStart(ADR(local.NextByteAddress), local.MaxBytes);
							IF (local.Status = vfp_ERR_OK) THEN
								local.Step := vfSTEP_LSF_PARSE_LASER_STATES;
								EXIT;
							ELSE								
								pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := vfp_ERR_NO_MORE_LINES;
								Status.Error := TRUE;
								Status.ErrorID := local.Status;
								local.ErrorStep := local.Step;
								local.Step := vfSTEP_LSF_CLOSE_FILE;								
								EXIT;
							END_IF								
							
							// Found a non-numerical character or encountered end of file (this should not happen while reading laser states).																
						ELSE
							pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
							Status.Error := TRUE;
							Status.ErrorID := local.Status;
							local.ErrorStep := local.Step;
							local.Step := vfSTEP_LSF_CLOSE_FILE;							
							EXIT;
							
					END_CASE					
				END_FOR
				
				// If there were more parameters than the number of lasers, ignore them.
				IF (local.Step = vfSTEP_LSF_PARSE_LASER_POWERS) THEN
					// Find the start of the next line without going beyond the end of the buffer. 
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
					local.MaxBytes := local.TotalBytesRead - local.CurrentByteIndex;
					local.Status := FindNextLineStart(ADR(local.NextByteAddress), local.MaxBytes);
					IF (local.Status = vfp_ERR_OK) THEN
						local.Step := vfSTEP_LSF_PARSE_LASER_STATES;
					ELSE								
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := vfp_ERR_NO_MORE_LINES;
						Status.Error := TRUE;
						Status.ErrorID := local.Status;
						local.ErrorStep := local.Step;
						local.Step := vfSTEP_LSF_CLOSE_FILE;								
					END_IF													
				END_IF

				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Extract all of the 32-bit laser state values for the current laser.							
			vfSTEP_LSF_PARSE_LASER_STATES:
				FOR local.LaserStateValueIndex := 1 TO vfp_LSF_MAX_32BIT_VAL_PER_TRAJ DO
					local.ParameterValue := 0;
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
					local.Status := GetNextParameter(ADR(local.NextByteAddress), ADR(local.ParameterValue));					

					CASE local.Status OF
						
						// Interpret the parameter as a UDINT value; more values expected.
						vfp_ERR_OK:
							local.ParameterValue_UDINT := LREAL_TO_UDINT(local.ParameterValue);
							pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].LaserTrajectoryInfo[local.LaserNumber].StateValue32Bit[local.LaserStateValueIndex] := local.ParameterValue_UDINT;
							pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].LaserTrajectoryInfo[local.LaserNumber].NumStateValues := local.LaserStateValueIndex;
							
							// Interpret the parameter as a UDINT value; this is the last value.
						vfp_ERR_EOL_REACHED:
							local.ParameterValue_UDINT := LREAL_TO_UDINT(local.ParameterValue);
							pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].LaserTrajectoryInfo[local.LaserNumber].StateValue32Bit[local.LaserStateValueIndex] := local.ParameterValue_UDINT;
							pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].LaserTrajectoryInfo[local.LaserNumber].NumStateValues := local.LaserStateValueIndex;
							
							// End of line reached, so check that the number of states includes the expected number.
							IF ((local.LaserStateValueIndex * 32) < local.ExpectedNumEvents) OR ((local.LaserStateValueIndex * 32) > (local.ExpectedNumEvents + 32)) THEN
								local.Status := vfp_ERR_WRONG_NUM_STATES;
								pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
								Status.Error := TRUE;
								Status.ErrorID := local.Status;
								local.ErrorStep := local.Step;
								local.Step := vfSTEP_LSF_CLOSE_FILE;								
								EXIT;								
							END_IF
							
							// Find the start of the next line without going beyond the end of the buffer. 
							local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;
							local.MaxBytes := local.TotalBytesRead - (local.NextByteAddress - local.StartingByteAddress);
							local.Status := FindNextLineStart(ADR(local.NextByteAddress), local.MaxBytes);
							IF (local.Status = vfp_ERR_OK) THEN
								local.Step := vfSTEP_LSF_SELECT_NEXT_LASER;
								EXIT;
							ELSE								
								pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := vfp_ERR_NO_MORE_LINES;
								Status.Error := TRUE;
								Status.ErrorID := local.Status;
								local.ErrorStep := local.Step;
								local.Step := vfSTEP_LSF_CLOSE_FILE;								
								EXIT;
							END_IF								
							
							// Found a non-numerical character or encountered end of file (this should not happen while reading laser states).																
						ELSE
							pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := local.Status;
							Status.Error := TRUE;
							Status.ErrorID := local.Status;
							local.ErrorStep := local.Step;
							local.Step := vfSTEP_LSF_CLOSE_FILE;							
							EXIT;
							
					END_CASE					
				END_FOR
				
				// If there were more than the vfp_LSF_MAX_32BIT_VAL_PER_TRAJ in a trajectory, ignore them and skip to the next laser.				
				IF (local.Step = vfSTEP_LSF_PARSE_LASER_STATES) THEN
					// Find the start of the next line without going beyond the end of the buffer. 
					local.CurrentByteIndex := local.NextByteAddress - local.StartingByteAddress;					
					local.MaxBytes := local.TotalBytesRead - (local.NextByteAddress - local.StartingByteAddress);
					local.Status := FindNextLineStart(ADR(local.NextByteAddress), local.MaxBytes);
					IF (local.Status = vfp_ERR_OK) THEN
						local.Step := vfSTEP_LSF_SELECT_NEXT_LASER;
					ELSE								
						pParsedData.TrajectoryCircularBuffer[pParsedData.FIFOHeadIndex].ExitCode := vfp_ERR_NO_MORE_LINES;
						Status.Error := TRUE;
						Status.ErrorID := local.Status;
						local.ErrorStep := local.Step;
						local.Step := vfSTEP_LSF_CLOSE_FILE;								
					END_IF													
				END_IF
				

				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Increment the laser number and continue parsing or indicate that trajectory parsing is complete.
			vfSTEP_LSF_SELECT_NEXT_LASER:				
				local.LaserNumber := local.LaserNumber + 1;
				IF (local.LaserNumber <= local.LastLaserNumber) THEN
					local.Step := vfSTEP_LSF_PARSE_LASER_STATES;	
				ELSE
					// Notify the caller that the requested trajectory has been parsed.			
					Status.ParseTrajectoryComplete := TRUE;
					Status.FinalTrajectoryNumber := local.FinalTrajectoryNumber;
					Status.ParsedTrajectoryNumber := local.TrajectoryNumber;					
					local.Step := vfSTEP_LSF_TRAJECTORY_PARSE_DONE;
				END_IF
				


				// Trajectory parsing is now complete; await command reset.
			vfSTEP_LSF_TRAJECTORY_PARSE_DONE:
				IF (NOT Command.ParseTrajectory) THEN
					Status.ParseTrajectoryComplete := FALSE;
					Status.ParsedTrajectoryNumber := 0;
					local.Step := vfSTEP_LSF_AWAIT_NEXT_COMMAND;
				END_IF
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for the next command.
			vfSTEP_LSF_AWAIT_NEXT_COMMAND:
				IF (Command.ParseTrajectory) THEN
					// Increment to the next trajectory number.
					local.FoundTrajectory := FALSE;
					local.TrajectoryNumber := local.TrajectoryNumber + fvp_TRAJECTORY_NUMBER_INCREMENT;					
					local.FileReadOffset := local.FileReadOffset + (local.NextByteAddress - local.StartingByteAddress);
					local.Step := vfSTEP_LSF_READ_FILE_DATA;
					
				ELSIF (Command.CloseLayer) THEN
					local.LayerClosed := TRUE;
					local.Step := vfSTEP_LSF_CLOSE_FILE;					
					
				ELSIF (Command.AbortLayer) THEN	
					local.LayerAborted := TRUE;
					local.Step := vfSTEP_LSF_CLOSE_FILE;	
				END_IF

				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Close the file.
			vfSTEP_LSF_CLOSE_FILE:				
				local.FB.FileClose.ident := local.LocalFileHandle;
				local.FB.FileClose.enable := TRUE;
				local.Step := vfSTEP_LSF_WAIT_FILE_CLOSED;
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for file to complete closing.
			vfSTEP_LSF_WAIT_FILE_CLOSED:
				IF (local.FB.FileClose.status = ERR_OK) THEN
					local.FB.FileClose.enable := FALSE;
					IF (Status.Error) THEN
						local.Step := vfSTEP_LSF_ERROR;
					ELSIF (local.LayerAborted) THEN
						local.Step := vfSTEP_LSF_LAYER_ABORTED;
					ELSE
						local.Step := vfSTEP_LSF_LAYER_CLOSED;
					END_IF	
					
				ELSIF (local.FB.FileClose.status <> ERR_FUB_BUSY) THEN
					local.FB.FileClose.enable := FALSE;
					Status.Error := TRUE;
					Status.ErrorID := local.FB.FileClose.status;
					local.ErrorStep := local.Step;
					local.Step := vfSTEP_LSF_ERROR;					
				END_IF			
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// File parsing is now complete.
				// Wait for all commands to be FALSE before returning to IDLE step.
			vfSTEP_LSF_LAYER_CLOSED:
				Status.LayerOpen := FALSE;
				Status.LayerClosed := TRUE;
				local.Step := vfSTEP_LSF_AWAIT_CMD_RESET;
				
				

				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// File parsing was aborted.
			vfSTEP_LSF_LAYER_ABORTED:
				Status.LayerOpen := FALSE;
				Status.LayerAborted := TRUE;
				local.Step := vfSTEP_LSF_AWAIT_CMD_RESET;
					
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Jump here on any sort of error and wait for ErrorReset command.
			vfSTEP_LSF_ERROR:
				Status.LayerOpen := FALSE;
				Status.Error := TRUE;
				IF (Command.ResetError) THEN
					Status.Error := FALSE;
					Status.ErrorID := ERR_OK;					
					local.Step := vfSTEP_LSF_AWAIT_CMD_RESET;
				END_IF
				
				
				
				// ------------------------------------------------------------------------------------------------------------------------------------------------
				// Wait for all commands to be FALSE before returning to IDLE step.
			vfSTEP_LSF_AWAIT_CMD_RESET:
				IF NOT (Command.ParseTrajectory OR Command.OpenLayer OR Command.CloseLayer OR Command.AbortLayer OR Command.ResetError) THEN									
					Status.LayerOpen := FALSE;
					Status.CurrentLayer := 0;	
					Status.ParsedTrajectoryNumber := 0;
					Status.ParseTrajectoryComplete := FALSE;
					Status.LayerClosed := FALSE;
					Status.LayerAborted := FALSE;
					Status.Error := FALSE;
					Status.ErrorID := ERR_OK;					
					local.Step := vfSTEP_LSF_INITIALIZE;
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

		local.Step := vfSTEP_LSF_INITIALIZE;
		local.ErrorStep := vfSTEP_LSF_INITIALIZE;		
		local.FB.FileOpen.enable := FALSE;
		local.FB.FileReadEx.enable := FALSE;
		local.FB.FileClose.enable := FALSE;
		
	END_IF
	
	GetSystemErrorText(Status.ErrorID, ADR(Status.ErrorText));	
	
	local.FB.FileOpen();
	local.FB.FileReadEx();
	local.FB.FileClose();
	
END_FUNCTION_BLOCK
