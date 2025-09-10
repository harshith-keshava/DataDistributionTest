
ACTION SimulateIO: 
	
	

	
	IF gOpcData_ToBuildPC.RequestStartDistribution THEN
		
		gOpcData_FromBuildPC.DistributionActive := TRUE;
		gOpcData_FromBuildPC.CurrentDistributionLayer := gOpcData_ToBuildPC.CurrentPrintLayer;

	END_IF
	
	
	IF gOpcData_ToBuildPC.RequestAbortDistribution THEN
		gOpcData_FromBuildPC.DistributionAborted := TRUE;
		gOpcData_FromBuildPC.DistributionActive := FALSE;
	END_IF
	
	gOpcData_FromBuildPC.BuildInfoReady := gOpcData_ToBuildPC.RequestBuildInfo;
	gOpcData_FromBuildPC.Heartbeat := gOpcData_ToBuildPC.Heartbeat;

	
	
	
END_ACTION
