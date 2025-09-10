

PROGRAM _EXIT
	
	// Prevent error mpRECIPE_ERR_MPLINK_IN_USE by releasing the link to the configuration objects.
	fbRecipeXml_PrintProcessConfig.Enable := FALSE;
	fbRecipeXml_PrintProcessConfig();
	
END_PROGRAM