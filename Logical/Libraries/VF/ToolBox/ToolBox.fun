
FUNCTION allZero : BOOL
	VAR_INPUT
		pData : UDINT;
		szData : UINT;
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION EdgePosArray : BOOL (*Trigger edges on an array of booleans*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		Level : REFERENCE TO BOOL;
		PreviousLevel : REFERENCE TO BOOL;
		Edge : REFERENCE TO BOOL;
		Size : UINT;
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION EdgeNegArray : BOOL (*Trigger edges on an array of booleans*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		Level : REFERENCE TO BOOL;
		PreviousLevel : REFERENCE TO BOOL;
		Edge : REFERENCE TO BOOL;
		Size : UINT;
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION EdgeArray : BOOL (*Trigger edges on an array of booleans*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		Level : REFERENCE TO BOOL;
		PreviousLevel : REFERENCE TO BOOL;
		Edge : REFERENCE TO BOOL;
		Size : UINT;
	END_VAR
END_FUNCTION
