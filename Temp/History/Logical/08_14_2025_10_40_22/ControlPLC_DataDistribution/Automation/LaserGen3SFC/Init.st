

PROGRAM _INIT

	registerStateBool( gSFCControlApi.status.sOMSModeActive, 'SOMS mode active', task.internal.somsTestType );
	registerStateBool( gSFCControlApi.status.sOMSModeActive, 'Pixel Mapping Test active', task.internal.pixelMappingTestType );
	registerStateBool( gSFCControlApi.status.sOMSTestComplete, 'SOMS mode active', omsTestComplete );
	 
END_PROGRAM