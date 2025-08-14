
FUNCTION_BLOCK vfValveBasic
	VAR_INPUT
		Inputs : vfValveBasicInputs_typ;
	END_VAR
	VAR_OUTPUT
		Outputs : vfValveBasicOutputs_typ;
	END_VAR
	VAR
		pCommandWriteBack : REFERENCE TO ValveCommands_typ;
		internal : vfValveBasicInternal_typ;
	END_VAR
END_FUNCTION_BLOCK
