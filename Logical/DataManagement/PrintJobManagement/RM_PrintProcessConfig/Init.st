

PROGRAM _INIT
	
	subscribePLCOpen( gSystemRecipeApi.commands.loadPrintProcessConfigFile, 'Print Process Config File Load', task.commands.load, task.internal.load );
	 

	
END_PROGRAM