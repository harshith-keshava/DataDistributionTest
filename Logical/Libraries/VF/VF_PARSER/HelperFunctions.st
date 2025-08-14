
FUNCTION GetNextString
	
	// Return error if function is called with missing parameters.
	IF (pAdrData = 0) OR (pParameter = 0) THEN
		GetNextString := vfp_ERR_NULL_POINTER;
		RETURN;
	END_IF
	
	// AdrData is the starting address of the data to be parsed.
	AdrData ACCESS pAdrData; 
	ParameterValue ACCESS pParameter;

	FOR index := 0 TO (vfp_MAX_CHARS_PER_STRING_VALUE - 1) DO	
		
		// Examine one character at a time, beginning at the starting address.
		CharVal ACCESS (AdrData + index);

		// If a NULL character is encountered, return with an error code.
		IF (CharVal = 0) THEN
			AdrData := AdrData + index;
			GetNextString := vfp_ERR_MISSING_DATA;
			RETURN;		
			
			// When a carriage return or delimiter character is found...
		ELSIF ((CharVal = vfp_CHAR_COMMA) OR (CharVal = vfp_CHAR_CARRIAGE_RETURN)) THEN 
		
			// If no data is present, return an error code indicating missing data (before delimiter) or end of line.
			IF (index = 0) THEN
				IF (CharVal = vfp_CHAR_COMMA) THEN
					AdrData := AdrData + index + 1;
					GetNextString := vfp_ERR_MISSING_DATA;
				ELSE
					AdrData := AdrData + index;
					GetNextString := vfp_ERR_EOL_REACHED;
				END_IF
				RETURN;				

				// Otherwise, return the string in ParameterValue.
			ELSE
				brsmemset(ADR(TempString), 0, SIZEOF(TempString));
				brsmemcpy(ADR(TempString), AdrData, index);
				ParameterValue := TempString;
								
				// If a carriage return was found, return the the address of the CURRENT character for further processing.
				IF (CharVal = vfp_CHAR_CARRIAGE_RETURN) THEN
					AdrData := AdrData + index;
					GetNextString := vfp_ERR_EOL_REACHED;
					// Otherwise, a delimiter was found, so return the address of the NEXT character for further processing.
				ELSE
					AdrData := AdrData + index + 1;
					GetNextString := vfp_ERR_OK;					
				END_IF				
				RETURN;
				
			END_IF				
			
		END_IF
		
	END_FOR
	
	// No delimiters were found in the search range.
	AdrData := AdrData + index;	
	GetNextString := vfp_ERR_NO_DELIMITER;

END_FUNCTION



FUNCTION GetNextParameter
	
	// Return error if function is called with missing parameters.
	IF (pAdrData = 0) OR (pParameter = 0) THEN
		GetNextParameter := vfp_ERR_NULL_POINTER;
		RETURN;
	END_IF
	
	// AdrData is the starting address of the data to be parsed.
	AdrData ACCESS pAdrData; 
	ParameterValue ACCESS pParameter;

	FOR index := 0 TO (vfp_MAX_CHARS_PER_NUMERIC_VALUE - 1) DO
		
		// Examine one character at a time, beginning at the starting address.
		CharVal ACCESS (AdrData + index);

		// If a NULL character is encountered, return with an error code.
		IF (CharVal = 0) THEN
			AdrData := AdrData + index;
			GetNextParameter := vfp_ERR_MISSING_DATA;
			RETURN;	
			
			// When a carriage return or delimiter character is found...
		ELSIF ((CharVal = vfp_CHAR_COMMA) OR (CharVal = vfp_CHAR_CARRIAGE_RETURN)) THEN 
			
			// If no data is present, return an error code indicating missing data (before delimiter) or end of line.
			IF (index = 0) THEN
				IF (CharVal = vfp_CHAR_COMMA) THEN
					AdrData := AdrData + index + 1;
					GetNextParameter := vfp_ERR_MISSING_DATA;
				ELSE
					AdrData := AdrData + index;
					GetNextParameter := vfp_ERR_EOL_REACHED;
				END_IF
				RETURN;				
				
				// Otherwise, convert the numeric string to a floating point value and return it in the ParameterValue.
			ELSE
				brsmemset(ADR(TempString), 0, SIZEOF(TempString));
				brsmemcpy(ADR(TempString), AdrData, index);
				ParameterValue := brsatod(ADR(TempString));
				
				// If a carriage return was found, return the the address of the CURRENT character for further processing.
				IF (CharVal = vfp_CHAR_CARRIAGE_RETURN) THEN
					AdrData := AdrData + index;
					GetNextParameter := vfp_ERR_EOL_REACHED;
					// Otherwise, a delimiter was found, so return the address of the NEXT character for further processing.
				ELSE
					AdrData := AdrData + index + 1;
					GetNextParameter := vfp_ERR_OK;					
				END_IF				
				RETURN;
				
			END_IF

			// If a non-numerical value was found...
			// HACK: Spaces are ignored here; this is just a hack
		ELSIF (((CharVal < vfp_CHAR_DIGIT_0) OR (CharVal > vfp_CHAR_DIGIT_9)) AND (CharVal <> vfp_CHAR_DECIMAL_POINT) AND (CharVal <> vfp_CHAR_SPACE)) THEN
			// Return the address of the CURRENT character for further processing.
			AdrData := AdrData + index;
			GetNextParameter := vfp_ERR_NON_NUMERICAL;
			RETURN;
		END_IF
		
	END_FOR
	
	// No delimiters were found in the search range.
	AdrData := AdrData + index;
	GetNextParameter := vfp_ERR_NO_DELIMITER;

END_FUNCTION




FUNCTION FindNextLineStart
	
	// Return error if function is called with missing parameters.
	IF (pAdrData = 0) THEN
		FindNextLineStart := vfp_ERR_NULL_POINTER;
		RETURN;
	END_IF
	IF (MaxBytes = 0) THEN
		FindNextLineStart := vfp_ERR_INVALID_PARAMETER;
		RETURN;
	END_IF
	
	// AdrData is the starting address of the data to be parsed.
	AdrData ACCESS pAdrData; 
	index := 0;

	// Examine one character at a time, searching for a line feed character (or end of buffer).
	REPEAT
		CharVal ACCESS (AdrData + index);					
		index := index + 1;		
		UNTIL
		(CharVal = vfp_CHAR_LINE_FEED) OR (CharVal = 0) OR (index >= MaxBytes)
	END_REPEAT;
	
	// If a line feed is found, return the address of the NEXT character for further processing.
	IF (CharVal = vfp_CHAR_LINE_FEED) THEN
		AdrData := AdrData + index;
		FindNextLineStart := vfp_ERR_OK;
	ELSE
		AdrData := AdrData + index;
		FindNextLineStart := vfp_ERR_MISSING_DATA;
	END_IF

END_FUNCTION




FUNCTION FindNextTrajectoryStart
	
	// Return error if function is called with missing parameters.
	IF (pAdrData = 0) THEN
		FindNextTrajectoryStart := vfp_ERR_NULL_POINTER;
		RETURN;
	END_IF
	IF (MaxBytes = 0) THEN
		FindNextTrajectoryStart := vfp_ERR_INVALID_PARAMETER;
		RETURN;
	END_IF
	
	// AdrData is the starting address of the data to be parsed.
	AdrData ACCESS pAdrData; 
	index := 0;

	// Examine one character at a time, searching for a line feed character (or end of buffer).
	REPEAT
		CharVal ACCESS (AdrData + index);					
		index := index + 1;		
		UNTIL
		(CharVal = vfp_CHAR_TRAJECTORY_HDR) OR (CharVal = 0) OR (index >= MaxBytes)
	END_REPEAT;
	
	// If a trajectory header is found, return the address of the CURRENT character for further processing.
	IF (CharVal = vfp_CHAR_TRAJECTORY_HDR) THEN
		AdrData := AdrData + index - 1;
		FindNextTrajectoryStart := vfp_ERR_OK;
	ELSE
		AdrData := AdrData + index - 1;
		FindNextTrajectoryStart := vfp_ERR_MISSING_DATA;
	END_IF

END_FUNCTION



FUNCTION GetSystemErrorText
	
	CASE (ErrorID) OF
				
		0, vfp_ERR_OK:
			ErrorText := 'No Error';		
		vfp_ERR_EOL_REACHED:
			ErrorText := 'Unexpected end-of-line encountered';		
		vfp_ERR_NO_MORE_LINES:
			ErrorText := 'No more lines in file';		
		vfp_ERR_NULL_POINTER:
			ErrorText := 'Null pointer in function call';		
		vfp_ERR_INVALID_PARAMETER:
			ErrorText := 'Invalid parameter in function call';		
		vfp_ERR_NO_DELIMITER:
			ErrorText := 'Required delimiter missing';		
		vfp_ERR_MISSING_DATA:
			ErrorText := 'Required data missing';		
		vfp_ERR_NON_NUMERICAL:
			ErrorText := 'Non-numerical value detected';		
		vfp_ERR_WRONG_NUM_STATES:
			ErrorText := 'Wrong number of laser states';		
		vfp_ERR_BAD_HEADER:
			ErrorText := 'Bad file header';		
		vfp_ERR_HEADER_INVALID_NUM_TRAJ:
			ErrorText := 'Invlaid number of trajectories';		
		vfp_ERR_BUFFER_SIZE:
			ErrorText := 'Inadequate buffer size declaration';		
		vfp_ERR_FATAL_SYSTEM_ERROR:
			ErrorText := 'Fatal system error (recovery not possible)';			
			
		fiERR_FILE_NOT_FOUND:
			ErrorText := 'File does not exist';
			
		ELSE
			ErrorText := 'no error text available';	
	END_CASE

	GetSystemErrorText := TRUE;

END_FUNCTION




