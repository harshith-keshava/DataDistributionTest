(**)
(*ParseLSF structures*)

TYPE
	vfpLSFCommandType : 	STRUCT 
		SelectedBuildLayout : UDINT;
		SelectedPrintNumber : UINT;
		SelectedRack : USINT;
		SelectedLayer : UDINT;
		OptionalStartingTrajectory : UINT;
		NumLasersInRack : USINT;
		OpenLayer : BOOL;
		ParseTrajectory : BOOL;
		CloseLayer : BOOL;
		AbortLayer : BOOL;
		ResetError : BOOL;
	END_STRUCT;
	vfpLSFStatusType : 	STRUCT 
		LayerFilename : STRING[255];
		LayerOpen : BOOL;
		CurrentLayer : UDINT;
		FinalTrajectoryNumber : UINT;
		ParsedTrajectoryNumber : UINT;
		ParseTrajectoryComplete : BOOL;
		LayerClosed : BOOL;
		LayerAborted : BOOL;
		Error : BOOL;
		ErrorID : UINT;
		ErrorText : STRING[80];
	END_STRUCT;
	vfpLSFInternalFBType : 	STRUCT 
		FileOpen : FileOpen;
		FileReadEx : FileReadEx;
		FileClose : FileClose;
	END_STRUCT;
	vfpLSFParsedDataType : 	STRUCT 
		TrajectoryCircularBuffer : ARRAY[1..vfp_LSF_TRAJECTORY_FIFO_SIZE]OF vfpLSFBufferElementType;
		FIFOCount : USINT := 0;
		FIFOHeadIndex : USINT := 1;
		FIFOTailIndex : USINT := 1;
	END_STRUCT;
	vfpLSFBufferElementType : 	STRUCT 
		TrajectoryNumber : UINT;
		LaserTrajectoryInfo : ARRAY[1..vfp_LSF_NUM_LASERS_PER_SYSTEM]OF vfpLSFLaserTrajectoryInfoType;
		ExitCode : UINT;
	END_STRUCT;
	vfpLSFLaserTrajectoryInfoType : 	STRUCT 
		PowerSetpointPercent : REAL;
		NumStateValues : UINT;
		StateValue32Bit : ARRAY[1..vfp_LSF_MAX_32BIT_VAL_PER_TRAJ]OF UDINT;
	END_STRUCT;
	vfpLSFLocalType : 	STRUCT 
		Step : vfpLSFStepsEnum;
		StepTrace : ARRAY[0..99]OF vfpLSFStepsEnum;
		index : UINT;
		FB : vfpLSFInternalFBType;
		ErrorStep : vfpLSFStepsEnum;
		DataBuffer : STRING[vfp_LSF_FILE_READ_BUFFER_SIZE];
		ReadLengthBytes : UDINT;
		TotalBytesRead : UDINT;
		StartingByteAddress : UDINT;
		MaxBytes : UDINT;
		NextByteAddress : UDINT;
		CurrentByteIndex : UDINT;
		ParameterValue : LREAL;
		ParameterValue_UDINT : UDINT;
		ParameterValue_string : STRING[vfp_MAX_CHARS_PER_STRING_VALUE];
		ParsedHeaderLine : BOOL;
		FoundTrajectory : BOOL;
		Status : UINT;
		BuildLayout : UDINT;
		PrintNumber : UINT;
		RackNumber : USINT;
		LayerNumber : UDINT;
		LayerClosed : BOOL;
		LayerAborted : BOOL;
		FinalTrajectoryNumber : UINT;
		TrajectoryNumber : UINT;
		LaserNumber : USINT;
		LastLaserNumber : USINT;
		LaserPowerValueIndex : USINT;
		LaserStateValueIndex : UINT;
		ExpectedNumEvents : UINT;
		FileReadOffset : UDINT;
		LocalFileHandle : UDINT;
		GCodeLineNumber_string : STRING[30];
		BuildLayout_string : STRING[20];
		PrintNumber_string : STRING[20];
		RackNumber_string : STRING[8];
		LayerNumber_string : STRING[8];
		LayerFileName : STRING[255];
		HeaderElement : USINT;
		BuildName : STRING[80];
		BuildPlateFormat : STRING[40];
		Temp_val : UINT;
		Temp_string : STRING[40];
	END_STRUCT;
	vfpLSFStepsEnum : 
		(
		vfSTEP_LSF_INITIALIZE,
		vfSTEP_LSF_IDLE,
		vfSTEP_LSF_CREATE_LAYER_FILENAME,
		vfSTEP_LSF_OPEN_FILE,
		vfSTEP_LSF_WAIT_FILE_OPEN,
		vfSTEP_LSF_AWAIT_COMMAND,
		vfSTEP_LSF_READ_FILE_DATA,
		vfSTEP_LSF_WAIT_READ_DONE,
		vfSTEP_LSF_PARSE_FILE_HDR,
		vfSTEP_LSF_FIND_TRAJECTORY_HDR,
		vfSTEP_LSF_PARSE_TRAJECTORY_HDR,
		vfSTEP_LSF_PARSE_NUM_EVENTS,
		vfSTEP_LSF_PARSE_LASER_POWERS,
		vfSTEP_LSF_PARSE_LASER_STATES,
		vfSTEP_LSF_SELECT_NEXT_LASER,
		vfSTEP_LSF_TRAJECTORY_PARSE_DONE,
		vfSTEP_LSF_AWAIT_NEXT_COMMAND,
		vfSTEP_LSF_CLOSE_FILE,
		vfSTEP_LSF_WAIT_FILE_CLOSED,
		vfSTEP_LSF_LAYER_CLOSED,
		vfSTEP_LSF_LAYER_ABORTED,
		vfSTEP_LSF_ERROR,
		vfSTEP_LSF_AWAIT_CMD_RESET
		);
END_TYPE

(**)
(*ParseFEF structures*)

TYPE
	vfpFEFCommandType : 	STRUCT 
		SelectedBuildLayout : UDINT;
		SelectedPrintNumber : UINT;
		SelectedLayer : UDINT;
		OptionalStartingTrajectory : UINT;
		OpenLayer : BOOL;
		ParseTrajectory : BOOL;
		CloseLayer : BOOL;
		AbortLayer : BOOL;
		ResetError : BOOL;
	END_STRUCT;
	vfpFEFStatusType : 	STRUCT 
		LayerFilename_GCode : STRING[255];
		LayerFilename_FixedEvents : STRING[255];
		LayerOpen : BOOL;
		CurrentLayer : UDINT;
		FinalTrajectoryNumber : UINT;
		ParsedTrajectoryNumber : UINT;
		ParseTrajectoryComplete : BOOL;
		LayerClosed : BOOL;
		LayerAborted : BOOL;
		Error : BOOL;
		ErrorID : UINT;
		ErrorText : STRING[80];
	END_STRUCT;
	vfpFEFInternalFBType : 	STRUCT 
		FileOpen : FileOpen;
		FileReadEx : FileReadEx;
		FileClose : FileClose;
	END_STRUCT;
	vfpFEFParsedDataType : 	STRUCT 
		TrajectoryCircularBuffer : ARRAY[1..vfp_FEF_TRAJECTORY_FIFO_SIZE]OF vfpFEFBufferElementType;
		FIFOCount : USINT := 0;
		FIFOHeadIndex : USINT := 1;
		FIFOTailIndex : USINT := 1;
	END_STRUCT;
	vfpFEFBufferElementType : 	STRUCT 
		TrajectoryNumber : UINT;
		ExitCode : UINT;
		MasterAxis : USINT;
		StartPositionMM : REAL;
		EndPositionMM : REAL;
		EventPeriodMM : REAL;
	END_STRUCT;
	vfpFEFLocalType : 	STRUCT 
		Step : vfpFEFStepsEnum;
		StepTrace : ARRAY[0..99]OF vfpFEFStepsEnum;
		index : UINT;
		FB : vfpFEFInternalFBType;
		ErrorStep : vfpFEFStepsEnum;
		DataBuffer : STRING[vfp_FEF_FILE_READ_BUFFER_SIZE];
		ReadLengthBytes : UDINT;
		TotalBytesRead : UDINT;
		StartingByteAddress : UDINT;
		MaxBytes : UDINT;
		NextByteAddress : UDINT;
		CurrentByteIndex : UDINT;
		ParameterValue : LREAL;
		ParameterValue_UDINT : UDINT;
		ParameterValue_string : STRING[vfp_MAX_CHARS_PER_STRING_VALUE];
		ParsedHeaderLine : BOOL;
		FoundTrajectory : BOOL;
		Status : UINT;
		BuildLayout : UDINT;
		PrintNumber : UINT;
		LayerNumber : UDINT;
		LayerClosed : BOOL;
		LayerAborted : BOOL;
		FinalTrajectoryNumber : UINT;
		TrajectoryNumber : UINT;
		FileReadOffset : UDINT;
		LocalFileHandle : UDINT;
		MasterAxis : USINT;
		StartPosition : REAL;
		EndPosition : REAL;
		EventPeriod : REAL;
		GCodeLineNumber_string : STRING[30];
		BuildLayout_string : STRING[20];
		PrintNumber_string : STRING[20];
		LayerNumber_string : STRING[8];
		LayerFileName_FixedEvents : STRING[255];
		LayerFileName_GCode : STRING[255];
		HeaderElement : USINT;
		BuildName : STRING[80];
		BuildPlateFormat : STRING[40];
		Temp_val : UINT;
		Temp_string : STRING[40];
	END_STRUCT;
	vfpFEFStepsEnum : 
		(
		vfSTEP_FEF_INITIALIZE,
		vfSTEP_FEF_IDLE,
		vfSTEP_FEF_CREATE_LAYER_FILENAME,
		vfSTEP_FEF_OPEN_FILE,
		vfSTEP_FEF_WAIT_FILE_OPEN,
		vfSTEP_FEF_AWAIT_COMMAND,
		vfSTEP_FEF_READ_FILE_DATA,
		vfSTEP_FEF_WAIT_READ_DONE,
		vfSTEP_FEF_PARSE_FILE_HDR,
		vfSTEP_FEF_FIND_TRAJECTORY_HDR,
		vfSTEP_FEF_PARSE_TRAJECTORY_HDR,
		vfSTEP_FEF_PARSE_MASTER_AXIS,
		vfSTEP_FEF_PARSE_START_POSN,
		vfSTEP_FEF_PARSE_END_POSN,
		vfSTEP_FEF_PARSE_EVENT_PERIOD,
		vfSTEP_FEF_TRAJECTORY_PARSE_DONE,
		vfSTEP_FEF_AWAIT_NEXT_COMMAND,
		vfSTEP_FEF_CLOSE_FILE,
		vfSTEP_FEF_WAIT_FILE_CLOSED,
		vfSTEP_FEF_LAYER_CLOSED,
		vfSTEP_FEF_LAYER_ABORTED,
		vfSTEP_FEF_ERROR,
		vfSTEP_FEF_AWAIT_CMD_RESET
		);
END_TYPE

(**)
(*SMRFile structures*)

TYPE
	VfSMRFileInternalType : 	STRUCT 
		Step : VfSMRFileStepsEnum;
		StepTrace : ARRAY[0..99]OF VfSMRFileStepsEnum;
		ErrorStep : VfSMRFileStepsEnum;
		FB : VfSMRFileInternalFBType;
		index : UINT;
	END_STRUCT;
	VfSMRFileInternalFBType : 	STRUCT 
		FileCopy1 : FileCopy;
		FileCopy2 : FileCopy;
		FileCopy3 : FileCopy;
	END_STRUCT;
	VfSMRFileStepsEnum : 
		(
		vfSMR_FILE_STEP_IDLE,
		vfSMR_FILE_STEP_COPY_TO_SMR1,
		vfSMR_FILE_STEP_COPY_TO_SMR2,
		vfSMR_FILE_STEP_COPY_TO_SMR3,
		vfSMR_FILE_STEP_COPY_TO_SMR4,
		vfSMR_FILE_STEP_COPY_TO_PTR1,
		vfSMR_FILE_STEP_COPY_TO_PTR2,
		vfSMR_FILE_STEP_COPY_TO_LCR1,
		vfSMR_FILE_STEP_COPY_TO_LCR2,
		vfSMR_FILE_STEP_DONE,
		vfSMR_FILE_STEP_DISCONNECT1,
		vfSMR_FILE_STEP_DISCONNECT2,
		vfSMR_FILE_STEP_ERROR,
		vfSMR_FILE_STEP_ERROR_RESET
		);
END_TYPE

(**)
(*SMRConnect structures*)

TYPE
	VfSMRConnectInternalType : 	STRUCT 
		Step : VfSMRConnectStepsEnum;
		StepTrace : ARRAY[0..99]OF VfSMRConnectStepsEnum;
		ErrorStep : VfSMRConnectStepsEnum;
		FB : VfSMRConnectInternalFBType;
		LocalFileHandle : UDINT;
		index : UINT;
	END_STRUCT;
	VfSMRConnectInternalFBType : 	STRUCT 
		DevLinkRemote : DevLink;
		DevLinkLocalSMR : DevLink;
		DevLinkLocalPTR : DevLink;
		DevLinkLocalLCR : DevLink;
		DevUnlinkRemote : DevUnlink;
		DevUnlinkLocalSMR : DevUnlink;
		DevUnlinkLocalPTR : DevUnlink;
		DevUnlinkLocalLCR : DevUnlink;
	END_STRUCT;
	VfSMRConnectStepsEnum : 
		(
		vfSMR_CNCT_STEP_IDLE,
		vfSMR_CNCT_STEP_CONNECT_SMR1,
		vfSMR_CNCT_STEP_CONNECT_SMR2,
		vfSMR_CNCT_STEP_CONNECT_PTR1,
		vfSMR_CNCT_STEP_CONNECT_PTR2,
		vfSMR_CNCT_STEP_CONNECT_LCR1,
		vfSMR_CNCT_STEP_CONNECT_LCR2,
		vfSMR_CNCT_STEP_CONNECT_REMOTE1,
		vfSMR_CNCT_STEP_CONNECT_REMOTE2,
		vfSMR_CNCT_STEP_DONE,
		vfSMR_CNCT_STEP_DISCONNECT1,
		vfSMR_CNCT_STEP_DISCONNECT2,
		vfSMR_CNCT_STEP_ERROR,
		vfSMR_CNCT_STEP_ERROR_RESET
		);
END_TYPE

(**)
(*LCRConnect structures*)

TYPE
	VfLCRConnectInternalType : 	STRUCT 
		Step : VfLCRConnectStepsEnum;
		StepTrace : ARRAY[0..99]OF VfLCRConnectStepsEnum;
		ErrorStep : VfLCRConnectStepsEnum;
		FB : VfLCRConnectInternalFBType;
		LocalFileName : STRING[80];
		LocalLCRDriveName : STRING[80];
		LocalFileHandle : UDINT;
		i : UINT;
	END_STRUCT;
	VfLCRConnectInternalFBType : 	STRUCT 
		DevLinkLocalLCR : DevLink;
		DevUnlinkLocalLCR : DevUnlink;
	END_STRUCT;
	VfLCRConnectStepsEnum : 
		(
		vfLCR_CNCT_STEP_IDLE,
		vfLCR_CNCT_STEP_CONNECT_LCR1,
		vfLCR_CNCT_STEP_CONNECT_LCR2,
		vfLCR_CNCT_STEP_DONE,
		vfLCR_CNCT_STEP_DISCONNECT1,
		vfLCR_CNCT_STEP_DISCONNECT2,
		vfLCR_CNCT_STEP_ERROR,
		vfLCR_CNCT_STEP_ERROR_RESET
		);
END_TYPE
