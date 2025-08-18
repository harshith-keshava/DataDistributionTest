
TYPE
	PixelMapping_typ : 	STRUCT 
		command : PixelMappingCommand_typ;
		status : PixelMappingStatus_typ;
		internal : PixelMappingInternal_typ;
	END_STRUCT;
	PixelMappingCommand_typ : 	STRUCT 
		laserRackRemap : BOOL;
		forceMappingDone : BOOL;
	END_STRUCT;
	PixelMappingStatus_typ : 	STRUCT 
		ready : BOOL;
		state : STATE;
		sequence : SEQUENCE;
		enabled : BOOL;
		remapActive : BOOL;
		alarmActive : BOOL;
		fileHeaderInfo : STRING[70];
		pixelMapped : ARRAY[0..100]OF BOOL;
		allPixelsMapped : BOOL;
	END_STRUCT;
	PixelMappingInternal_typ : 	STRUCT 
		previousState : STATE;
		PLCOpen : AtnPlcOpenStatus;
		fbOpen : FileOpen;
		fbClose : FileClose;
		fbReadEx : FileReadEx;
		fileHandle : UDINT;
		newCommand : BOOL;
		localLockout : BOOL;
		dataLength : UDINT;
		offsetRead : UDINT;
		identifier : IDENTIFIER;
		pixelNum : INT;
		pixelIndex : INT;
		rackNum : INT;
		rackIndex : INT;
		laserNum : INT;
		laserIndex : INT;
		statusNum : INT;
		configFileName : STRING[70];
		tempCharRead : STRING[1];
		tempString : STRING[70];
		readingFileHeader : BOOL;
		checkNewVersion : BOOL;
		pixelLoopIndex : USINT;
	END_STRUCT;
	STATE : 
		(
		STATE_NOT_READY,
		STATE_READY,
		STATE_REMAP,
		STATE_FORCE_DONE
		);
	SEQUENCE : 
		(
		SEQUENCE_IDLE,
		SEQUENCE_DONE,
		SEQUENCE_ERROR,
		SEQUENCE_START_REMAP,
		SEQUENCE_OPEN_FILE,
		SEQUENCE_READ,
		SEQUENCE_MAPPING,
		SEQUENCE_RESET_IDENTIFIER,
		SEQUENCE_CLOSE_FILE,
		SEQUENCE_VALIDATE_MAP_DATA
		);
	IDENTIFIER : 
		(
		Pixel,
		Status,
		Rack,
		Laser
		);
	Configuration_typ : 	STRUCT 
		MaxNumberOfPixelsUsed : USINT := 50;
	END_STRUCT;
END_TYPE
