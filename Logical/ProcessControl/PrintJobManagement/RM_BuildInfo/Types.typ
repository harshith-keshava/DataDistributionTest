
TYPE
	RecipeFile_typ : 	STRUCT 
		commands : RecipeCommands_typ;
		parameters : RecipeParameters_typ;
		status : RecipeStatus_typ;
		internal : RecipeInternal_typ;
	END_STRUCT;
	RecipeCommands_typ : 	STRUCT 
		load : BOOL;
		save : BOOL;
	END_STRUCT;
	RecipeParameters_typ : 	STRUCT 
		_ : STRING[260];
	END_STRUCT;
	RecipeStatus_typ : 	STRUCT 
		state : STATE;
		busy : BOOL;
		done : BOOL;
		error : BOOL;
		errorId : DINT;
	END_STRUCT;
	RecipeInternal_typ : 	STRUCT 
		save : AtnPlcOpenStatus;
		load : AtnPlcOpenStatus;
		notLoaded : BOOL;
		loaded : STRING[80];
	END_STRUCT;
	STATE : 
		(
		STATE_NOT_READY,
		STATE_READY,
		STATE_DONE,
		STATE_ERROR,
		STATE_LOAD,
		STATE_SAVE
		);
END_TYPE
