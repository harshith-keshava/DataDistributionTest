
FUNCTION errorWrapCyclic : USINT
	VAR_INPUT
		inst : errWrap_typ;
	END_VAR
END_FUNCTION

FUNCTION errorWrapAck : UDINT
	VAR_INPUT
		id : UDINT;
		alarmCollector : errWrap_typ;
	END_VAR
END_FUNCTION

FUNCTION errorWrapSet : UDINT
	VAR_INPUT
		source : UDINT;
		string : UDINT;
		errorId : UDINT;
		acknowledge : UDINT;
		alarmCollector : errWrap_typ;
	END_VAR
END_FUNCTION
