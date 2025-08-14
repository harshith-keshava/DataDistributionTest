
PROGRAM _INIT
	
	//brsitoa(Configuration.rackIndex + 1, ADR(moduleName));
	moduleName := CONCAT('VF-LCR Rack ', moduleName);
		

	subscribePLCOpenWithParameters(gVFLCR.command.openLayer, moduleName, ADR(task.internal.openLayerCommandParameters), SIZEOF(task.internal.openLayerCommandParameters),task.command.openLayer, task.internal.PLCOpenOpenLayer);
	subscribePLCOpen(gVFLCR.command.abortLayer, moduleName, task.command.abortLayer, task.internal.PLCOpenAbortLayer);
	
	subscribePLCOpen(gVFLCR.command.deleteLaserControlFiles, moduleName, task.command.deleteLaserControlFiles, task.internal.PLCOpenDeleteLaserControlFiles);

	task.internal.abortLayerTON.PT := T#5s;
	task.internal.deleteLaserControlFilesTON.PT := T#5s;
	task.internal.openLayerTON.PT := T#5s;
	
END_PROGRAM

PROGRAM _CYCLIC
	///////////////////////////////////////////////////////////////

	//	- openLayer 				- Opens a layer
	//	- abortLayer 				- Aborts a layer
	
	//	- deleteLaserControlFiles 	- Deletes laser control files from the VF-LCR system

	
	// Read in external components
	ReadInputIO;
	
	
	IF gSimulation THEN
		SimulateIO;
	END_IF
	
	
	// Read external states
	task.status.ready := TRUE;

	///////////////////////////////////////////////////////////////
	// Handle interpreting commands that do not require STATE_READY
	///////////////////////////////////////////////////////////////
	IF task.status.ready THEN
				
		IF task.command.deleteLaserControlFiles THEN
			task.internal.newCommand := TRUE;
		END_IF
				
	ELSE // Not ready
			
		task.status.state := STATE_NOT_READY;
			
	END_IF
		
	///////////////////////////////////////////////////////////////
	// Handle any canceled commands that are required
	///////////////////////////////////////////////////////////////
	IF task.internal.newCommand THEN
			
	
		
		IF task.command.abortLayer THEN
			
			IO.do.AbortLayer := TRUE;
			
		END_IF
		
		IF IO.di.LayerAborted THEN
			
			IO.do.AbortLayer := FALSE;
			task.internal.PLCOpenAbortLayer.status := ERR_OK;
			
		ELSIF task.internal.abortLayerTON.Q THEN
			
			IO.do.AbortLayer := FALSE;
			task.internal.PLCOpenAbortLayer.status := VFLCR_ERROR;
			
		END_IF
		
		
		
		IF task.command.deleteLaserControlFiles THEN
			
			IO.do.Delete_LaserControlFiles := TRUE;
			
		END_IF
		
		IF IO.di.LaserControlFiles_Deleted THEN
			
			IO.do.Delete_LaserControlFiles := FALSE;
			task.internal.PLCOpenDeleteLaserControlFiles.status := ERR_OK;
			
		ELSIF task.internal.deleteLaserControlFilesTON.Q THEN
			
			IO.do.Delete_LaserControlFiles := FALSE;
			task.internal.PLCOpenDeleteLaserControlFiles.status := VFLCR_ERROR;
			
		END_IF
		
	
		
		IF task.command.openLayer THEN
			
			IF task.internal.PLCOpenOpenLayer.parametersWritten THEN
				task.parameters.openLayerParameters := task.internal.openLayerCommandParameters.parameters;
				
				IF (task.parameters.openLayerParameters.selectedBuildLayout > 0) AND (task.parameters.openLayerParameters.selectedPrintNumber > 0) AND NOT (IO.di.LayerOpen) THEN
					IO.do.OpenLayer := TRUE;
				ELSE
					IO.do.OpenLayer := FALSE;
					task.internal.PLCOpenOpenLayer.status := VFLCR_ERROR;
				END_IF
			ELSE
				// we need pars
				task.internal.PLCOpenOpenLayer.status := VFLCR_ERROR;
			END_IF
			
		END_IF
		
		IF IO.di.LayerOpen THEN
			
			// Unlike other commands, IO.do.OpenLayer must stay set after a success (while the layer is open)
			task.internal.PLCOpenOpenLayer.status := ERR_OK;
			
		ELSIF task.internal.openLayerTON.Q THEN
			
			// Timeout cancels the command, so lower IO
			IO.do.OpenLayer := FALSE;
			task.internal.PLCOpenOpenLayer.status := VFLCR_ERROR;
			
		END_IF
		
		// Check for layer not being open
		// EDGEPOS must be first so its internal fub always runs
		IF EDGEPOS(IO.di.LayerClosed OR IO.di.LayerAborted OR IO.di.LayerError OR task.command.abortLayer) THEN
			
			IO.do.OpenLayer := FALSE;
			task.internal.PLCOpenOpenLayer.status := VFLCR_ERROR;
			
		END_IF
		
	END_IF //rackIgnored
	
	
	task.internal.abortLayerTON.IN := IO.do.AbortLayer AND NOT IO.di.LayerAborted;
	task.internal.abortLayerTON();
	
	task.internal.deleteLaserControlFilesTON.IN := IO.do.Delete_LaserControlFiles AND NOT IO.di.LaserControlFiles_Deleted;
	task.internal.deleteLaserControlFilesTON();
	
	
	task.internal.openLayerTON.IN := IO.do.OpenLayer AND NOT IO.di.LayerOpen;
	task.internal.openLayerTON();
	
	///////////////////////////////////////////////////////////////
	// Reset all commands to ensure they don't get buffered
	///////////////////////////////////////////////////////////////
	brsmemset(ADR(task.command), 0, SIZEOF(task.command));
	
	task.internal.newCommand := FALSE;

	
END_PROGRAM

PROGRAM _EXIT
	
	// On program exit, disable all lasers, force current layer to be aborted, and disable both AUTO and MANUAL modes.
	ShutDownIO;
	 
END_PROGRAM

