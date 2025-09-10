(*System Recipe*)

TYPE
	SystemRecipeManager_typ : 	STRUCT 
		commands : SystemRecipeCommand_typ;
		events : SystemRecipeEvents_typ;
	END_STRUCT;
	SystemRecipeCommand_typ : 	STRUCT 
		loadBuildInfo : STRING[80];
		loadCustomScanFile : STRING[80];
		loadPrintProcessConfigFile : STRING[80];
	END_STRUCT;
	SystemRecipeEvents_typ : 	STRUCT 
		buildInfoLoaded : STRING[80];
		customScanLoaded : STRING[80];
	END_STRUCT;
END_TYPE

(*Single recipe handler*)
