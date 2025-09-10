
TYPE
	OPCUAData_FROM_BuildPC_typ : 	STRUCT 
		Heartbeat : UINT;
		BuildInfoReady : BOOL;
		DistributionActive : BOOL;
		DistributionPaused : BOOL;
		DistributionAborted : BOOL;
		BuildLayout : UDINT;
		PrintNumber : UINT;
		CurrentDistributionLayer : UDINT;
		StatusMessage : STRING[80];
		DataDistributorVersion : STRING[40];
	END_STRUCT;
	OPCUAData_TO_BuildPC_typ : 	STRUCT 
		Heartbeat : UINT;
		RequestBuildInfo : BOOL;
		RequestStartDistribution : BOOL;
		RequestPauseDistribution : BOOL;
		RequestAbortDistribution : BOOL;
		PrintingActive : BOOL;
		CurrentPrintLayer : UDINT;
	END_STRUCT;
END_TYPE
