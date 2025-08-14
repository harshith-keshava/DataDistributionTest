// ---------------------------------------------------------------------------
// This function block converts an unsigned integer value to a hexidecimal string
// without any prefix/postfix notation.
// ---------------------------------------------------------------------------
FUNCTION VF_COMMON_ConvertToHex
	
	digitIndex := 7; 
	quotient := valueToConvert;
	brsstrcpy(ADR(outputHexString), ADR('00000000'));
	REPEAT
		remainder := quotient MOD 16;
		quotient := quotient / 16;
		brsmemmove(ADR(outputHexString) + digitIndex, ADR(hexDigits[remainder]), 1); 
		digitIndex := digitIndex - 1;
	UNTIL
		(quotient <= 0)
	END_REPEAT
	
	VF_COMMON_ConvertToHex := TRUE;
	
END_FUNCTION
