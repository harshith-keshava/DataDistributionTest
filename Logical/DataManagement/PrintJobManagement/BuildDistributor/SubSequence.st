
// Start connection to build distributor and distribute the starting files
ACTION StartDistributionSubSequence: 
	
	CASE task.status.sequence OF
		
		SEQUENCE_EXECUTE_START_DIST:
			
			task.status.sequence := SEQUENCE_REQUEST_BUILD_INFO;
	
			
		SEQUENCE_REQUEST_BUILD_INFO: 
			
			task.status.statusMessage := 'ask for build info file';
						
			//gPrint Job management files
			gOpcData_ToBuildPC.RequestAbortDistribution := FALSE;
			gOpcData_ToBuildPC.RequestPauseDistribution := FALSE;
			gOpcData_ToBuildPC.RequestStartDistribution := FALSE;
			gOpcData_ToBuildPC.PrintingActive := FALSE;			
			gOpcData_ToBuildPC.RequestBuildInfo := TRUE;
			
			//load the last file you had saved, if its 0 get layer 1
			gOpcData_ToBuildPC.CurrentPrintLayer := gPrintJobManagement.currentState.currentLayerNumber;
			IF (gOpcData_ToBuildPC.CurrentPrintLayer = 0) THEN
				gOpcData_ToBuildPC.CurrentPrintLayer := 1;
			END_IF
			
			task.status.sequence := SEQUENCE_BUILD_INFO_READY;
					
		SEQUENCE_BUILD_INFO_READY:
			
			IF (gOpcData_FromBuildPC.BuildInfoReady) THEN
				gOpcData_ToBuildPC.RequestBuildInfo := FALSE;
				task.status.sequence := SEQUENCE_LOAD_BUILD_FILE;
			END_IF
						
		SEQUENCE_LOAD_PCI_FILE:
			
			task.status.statusMessage := 'Loading PCI File and Verifying';
			
			task.internal.atnPLCOpenCommand.Command := gSystemRecipeApi.commands.loadPrintProcessConfigFile;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommand.Done THEN 
				task.status.sequence := SEQUENCE_LOAD_BUILD_FILE;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
				
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				task.status.sequence := SEQUENCE_ERROR;
			END_IF
				
		SEQUENCE_LOAD_BUILD_FILE: 
			task.status.statusMessage := 'load build info file';
			task.internal.atnPLCOpenCommand.Command := gSystemRecipeApi.commands.loadBuildInfo;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommand.Done OR gSystemRecipeApi.status.buildInfoLoaded THEN
				task.status.sequence := SEQUENCE_CHK_BUILD_INFO_VALID;
				gSystemRecipeApi.status.buildInfoLoaded := FALSE;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF
			
		
		SEQUENCE_CHK_BUILD_INFO_VALID:
			task.status.statusMessage := 'validating build info contents';
			task.internal.atnPLCOpenCommand.Command := gPrintJobManagement.commands.validatePrintFile;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommand.Done OR gPrintJobManagement.status.buildInfoValidCheck THEN
				task.status.sequence := SEQUENCE_DELETE_LASER_FILES;
				gPrintJobManagement.status.buildInfoValidCheck:= FALSE;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
				gPrintProcessConfigLoaded := TRUE; // Set flag after validating PCI with BuildInfo File
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF
		
		SEQUENCE_DELETE_LASER_FILES: 
			task.status.statusMessage := 'delete laser files';
			task.internal.atnPLCOpenCommand.Command := gVFLCR.command.deleteLaserControlFiles;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommand.Done THEN
				task.status.sequence := SEQUENCE_START_DISTRIBUTION;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF	
			
		SEQUENCE_START_DISTRIBUTION:
			task.status.statusMessage := 'distribute laser files';
					
			gOpcData_ToBuildPC.RequestStartDistribution := TRUE;
			task.status.sequence := SEQUENCE_VERIFY_DISTRIBUTION;	
		
		SEQUENCE_VERIFY_DISTRIBUTION:
			
			task.status.statusMessage := 'verifying distribution';
			
			IF (gOpcData_FromBuildPC.CurrentDistributionLayer = gOpcData_ToBuildPC.CurrentPrintLayer) THEN
						
				task.internal.lastDistributedLayerNumber := UDINT_TO_UINT(gOpcData_ToBuildPC.CurrentPrintLayer);
				gPrintJobManagement.currentState.lastDistributedLayer := task.internal.lastDistributedLayerNumber;
				
				task.status.sequence := SEQUENCE_SET_CURRENT_LAYER;
				
			END_IF
			
			task.internal.distributorTimeout.PT := T#30s;
			task.internal.distributorTimeout.IN := TRUE;
			
			IF task.internal.distributorTimeout.Q THEN
				task.status.sequence := SEQUENCE_ERROR;
			END_IF
			
		SEQUENCE_SET_CURRENT_LAYER:
			
			//this is redundant, but that command also will re-set the CNC file name 
			task.status.statusMessage := 'update current layer';
			
			//NOT NEEDED!
			task.internal.atnPLCOpenCommandParameters.Command := gPrintJobManagement.commands.updateLayerNumber;
			task.internal.atnPLCOpenCommandParameters.pParameters := ADR(task.internal.lastDistributedLayerNumber);
			task.internal.atnPLCOpenCommandParameters.sParameters := SIZEOF(task.internal.lastDistributedLayerNumber);
			task.internal.atnPLCOpenCommandParameters.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommandParameters.Done THEN
				task.status.sequence := SEQUENCE_DISTRIBUTION_STARTED;
				task.internal.atnPLCOpenCommandParameters.Execute := FALSE;
				
			ELSIF task.internal.atnPLCOpenCommandParameters.Error THEN
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF
			
			
		SEQUENCE_DISTRIBUTION_STARTED:
			gPrintJobManagement.currentState.newBuildInfoFileLoaded := TRUE;//TODO this should be set outside?
			task.status.sequence := SEQUENCE_DONE;
	END_CASE
	
END_ACTION




// Distribute Layer Files to VFLCR and adjust number
ACTION DistributeLayerFileSubSequence:
	
	CASE task.status.sequence OF
	
		SEQUENCE_EXECUTE_GET_LAYER_FILES:
			task.status.sequence := SEQUENCE_CHK_BUILD_INFO;
				
		SEQUENCE_CHK_BUILD_INFO: 
			task.status.statusMessage := 'validating build info';
			task.internal.atnPLCOpenCommand.Command := gPrintJobManagement.commands.validatePrintFile;
			task.internal.atnPLCOpenCommand.Execute := TRUE;
							
			IF task.internal.atnPLCOpenCommand.Done THEN
				task.status.sequence := SEQUENCE_SET_DESIRED_LAYER;
				task.internal.atnPLCOpenCommand.Execute := FALSE;
			ELSIF task.internal.atnPLCOpenCommand.Error THEN
				
				task.status.lastErrorMessage := 'SEQUENCE_CHK_BUILD_INFO';
				task.status.sequence := SEQUENCE_ERROR;	
			END_IF
		
		SEQUENCE_SET_DESIRED_LAYER:
			
			task.internal.distRetryAttempted := 0;
			
			task.status.statusMessage := 'set layer for distribution';
			gOpcData_ToBuildPC.CurrentPrintLayer := task.parameters.layerNumberToDistribute;
			
			//delay for parameter to go through 
			task.internal.fbTON_DistributionDelay.PT := T#0.25s;
			task.internal.fbTON_DistributionDelay.IN := TRUE;
			IF task.internal.fbTON_DistributionDelay.Q THEN 
				task.status.sequence := SEQUENCE_REQUEST_DISTRIBUTION;
			END_IF
								
		SEQUENCE_REQUEST_DISTRIBUTION:
			
			task.status.statusMessage := 'request distribution';
			gOpcData_ToBuildPC.PrintingActive := TRUE;			
			gOpcData_ToBuildPC.RequestStartDistribution := TRUE;
			task.status.sequence := SEQUENCE_WAIT_FOR_FEEDBACK;
		
		SEQUENCE_WAIT_FOR_FEEDBACK: 
			
			IF (gOpcData_FromBuildPC.CurrentDistributionLayer = gOpcData_ToBuildPC.CurrentPrintLayer) THEN
				task.status.sequence := SEQUENCE_SET_CURRENT_LAYER;
			END_IF
			
			task.internal.distributorTimeout.IN := TRUE;
			task.internal.distributorTimeout.PT := T#20s;
			
			IF task.internal.distributorTimeout.Q  THEN
				
				IF task.internal.distRetryAttempted THEN 
					task.status.sequence := SEQUENCE_ERROR;	
				ELSE
					task.status.sequence := SEQUENCE_RETRY_DISTRIBUTION;
				END_IF
			
			END_IF
			
		SEQUENCE_RETRY_DISTRIBUTION:
			
			gOpcData_ToBuildPC.CurrentPrintLayer := 0;
			
			task.internal.distributionRecoveryTimer.IN := TRUE;
			task.internal.distributionRecoveryTimer.PT := T#5s;
			
			IF task.internal.distributionRecoveryTimer.Q THEN
				task.internal.distRetryAttempted := TRUE;
				gOpcData_ToBuildPC.CurrentPrintLayer := task.parameters.layerNumberToDistribute;	
				task.status.sequence := SEQUENCE_REQUEST_DISTRIBUTION;
			END_IF
			
		SEQUENCE_SET_CURRENT_LAYER:
			
			task.status.statusMessage := 'update current layer';
			
			task.internal.lastDistributedLayerNumber := UDINT_TO_UINT(gOpcData_ToBuildPC.CurrentPrintLayer);
			gPrintJobManagement.currentState.lastDistributedLayer := task.internal.lastDistributedLayerNumber;
			
			task.internal.atnPLCOpenCommandParameters.Command := gPrintJobManagement.commands.updateLayerNumber;
			task.internal.atnPLCOpenCommandParameters.pParameters := ADR(task.internal.lastDistributedLayerNumber);
			task.internal.atnPLCOpenCommandParameters.sParameters := SIZEOF(task.internal.lastDistributedLayerNumber);
			task.internal.atnPLCOpenCommandParameters.Execute := TRUE;
			
			IF task.internal.atnPLCOpenCommandParameters.Done THEN
				task.status.sequence := SEQUENCE_DONE;
				task.internal.atnPLCOpenCommandParameters.Execute := FALSE;
				
			ELSIF task.internal.atnPLCOpenCommandParameters.Error THEN
				task.status.lastErrorMessage := 'SEQUENCE_SET_CURRENT_LAYER';
				
				IF NOT(task.internal.retryAttempted) THEN
					task.status.sequence := SEQUENCE_RETRY_AFTER_ERROR;	
					task.status.lastErrorState := SEQUENCE_SET_CURRENT_LAYER;
				ELSE
					task.status.sequence := SEQUENCE_ERROR;
					task.internal.retryAttempted := FALSE;
				END_IF
			END_IF
		
		
		SEQUENCE_RETRY_AFTER_ERROR:
		
			task.internal.retryAttempted := TRUE;
			
			task.internal.waitToRetry.PT := T#5s;
			task.internal.waitToRetry.IN := TRUE;
			
			IF task.internal.waitToRetry.Q THEN
				task.status.sequence := task.status.lastErrorState;
			END_IF
		
	END_CASE
		
END_ACTION


// Abort distribution process started earlier (must be done before starting another)
ACTION AbortDistributionSubSequence: 
	
	CASE task.status.sequence OF
		
		SEQUENCE_EXECUTE_ABORT_DIST:
			
			task.status.sequence := SEQUENCE_CHECK_DIST_READY_ABORT;
		
		SEQUENCE_CHECK_DIST_READY_ABORT: 
			task.status.statusMessage := 'check distributor connected';
			//move this outside maybe and cyclically check for connection status and throw alarm if not connected
			IF task.status.buildDistributorConnected THEN
				task.status.sequence := SEQUENCE_REQUEST_ABORT_DIST;	
			ELSE
				task.status.sequence := SEQUENCE_ERROR;		
			END_IF		
					
					
		SEQUENCE_REQUEST_ABORT_DIST: 
			
			task.status.statusMessage := 'aborting distribution';
			
			//gPrint Job management files
			gOpcData_ToBuildPC.RequestAbortDistribution := TRUE;
			gOpcData_ToBuildPC.RequestPauseDistribution := FALSE;
			gOpcData_ToBuildPC.RequestStartDistribution := FALSE;
			gOpcData_ToBuildPC.PrintingActive := FALSE;			
			gOpcData_ToBuildPC.RequestBuildInfo := FALSE;
					
			task.status.sequence := SEQUENCE_WAIT_DIST_ABORTED;
					
		SEQUENCE_WAIT_DIST_ABORTED:
			
			task.status.statusMessage := 'distribution aborted';
			
			IF (gOpcData_FromBuildPC.DistributionAborted) THEN
				gOpcData_ToBuildPC.RequestAbortDistribution := FALSE;
				task.status.sequence := SEQUENCE_DONE;;
			END_IF
			
		
		
			
		
	END_CASE
	
	
END_ACTION

