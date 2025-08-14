// ---------------------------------------------------------------------------
// This function block appends a timestamp to the specified filename.
// ---------------------------------------------------------------------------
FUNCTION VF_COMMON_FileNameWithTimestamp
		
	DT_TO_DTStructure(CurrentDateAndTime, ADR(dateTimeStruct));
	
	// UINT values
	timeYEAR := UINT_TO_STRING(dateTimeStruct.year);
	// USINT values
	timeMONTH := USINT_TO_STRING(dateTimeStruct.month);
	timeDAY := USINT_TO_STRING(dateTimeStruct.day);
	timeHOUR := USINT_TO_STRING(dateTimeStruct.hour);
	timeMIN := USINT_TO_STRING(dateTimeStruct.minute);
	timeSEC := USINT_TO_STRING(dateTimeStruct.second);

	brsstrcpy(ADR(OutputFileName), ADR(BaseFileName));
	
	brsstrcat(ADR(OutputFileName), ADR('_')); 
	brsstrcat(ADR(OutputFileName), ADR(timeYEAR));
	
	brsstrcat(ADR(OutputFileName), ADR('_')); 
	IF (brsstrlen(ADR(timeMONTH)) = 1) THEN
		brsstrcat(ADR(OutputFileName), ADR('0'));	
	END_IF		
	brsstrcat(ADR(OutputFileName), ADR(timeMONTH));	
	
	brsstrcat(ADR(OutputFileName), ADR('_')); 
	IF (brsstrlen(ADR(timeDAY)) = 1) THEN
		brsstrcat(ADR(OutputFileName), ADR('0'));	
	END_IF		
	brsstrcat(ADR(OutputFileName), ADR(timeDAY)); 
	
	IF (IncludeTime) THEN
		brsstrcat(ADR(OutputFileName), ADR('_')); 
		IF (brsstrlen(ADR(timeHOUR)) = 1) THEN
			brsstrcat(ADR(OutputFileName), ADR('0'));	
		END_IF		
		brsstrcat(ADR(OutputFileName), ADR(timeHOUR));

		brsstrcat(ADR(OutputFileName), ADR('_')); 
		IF (brsstrlen(ADR(timeMIN)) = 1) THEN
			brsstrcat(ADR(OutputFileName), ADR('0'));	
		END_IF		
		brsstrcat(ADR(OutputFileName), ADR(timeMIN)); 

		brsstrcat(ADR(OutputFileName), ADR('_')); 
		IF (brsstrlen(ADR(timeSEC)) = 1) THEN
			brsstrcat(ADR(OutputFileName), ADR('0'));	
		END_IF		
		brsstrcat(ADR(OutputFileName), ADR(timeSEC)); 
	END_IF
	
	brsstrcat(ADR(OutputFileName), ADR(FileExtension));
	
	VF_COMMON_FileNameWithTimestamp := TRUE;
	
END_FUNCTION
