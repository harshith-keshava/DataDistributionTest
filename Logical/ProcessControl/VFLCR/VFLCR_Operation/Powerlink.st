
ACTION ReadInputIO:
	
		IO.ai.FPGAVersion :=  UDINT_TO_UINT(SHR(IO.raw.iFPGARevision, 16));
		IO.ai.FPGARevision := UDINT_TO_UINT(IO.raw.iFPGARevision AND 16#FFFF);
		
		IO.ai.SoftwareVersion :=  UDINT_TO_UINT(SHR(IO.raw.iSoftwareRevision, 16));
		IO.ai.SoftwareRevision := UDINT_TO_UINT(IO.raw.iSoftwareRevision AND 16#FFFF);
		
		// -----------------
		// Operation Status
		// -----------------
		//IO.di.LUTFiles_Deleted := BIT_TST(IO.raw.iOperationStatus, 0);
		IO.di.LaserControlFiles_Deleted := BIT_TST(IO.raw.iOperationStatus, 1);
		//IO.di.LUTFiles_LoadSuccess := BIT_TST(IO.raw.iOperationStatus, 2);
		//IO.di.LUTFiles_LoadFailure := BIT_TST(IO.raw.iOperationStatus, 3);
		
		//IO.di.ModeEnabled_MANUAL := BIT_TST(IO.raw.iOperationStatus, 6);
		//IO.di.ModeEnabled_AUTO := BIT_TST(IO.raw.iOperationStatus, 7);
		IO.di.LayerOpen := BIT_TST(IO.raw.iOperationStatus, 8);
		IO.di.LayerAborted := BIT_TST(IO.raw.iOperationStatus, 9);
		IO.di.LayerClosed := BIT_TST(IO.raw.iOperationStatus, 10);
		IO.di.LayerError := BIT_TST(IO.raw.iOperationStatus, 11);
		
		//IO.di.SystemWatchdogFailure := BIT_TST(IO.raw.iOperationStatus, 14);
		//IO.di.SystemOperational := BIT_TST(IO.raw.iOperationStatus, 15);
		
		// Simulation
		IF gSimulation THEN
			SimulateIO;	
		END_IF 

	
END_ACTION

ACTION WriteOutputIO:
	
		
		// -----------------
		// Heartbeats
		// -----------------
		// Continuously increment heartbeat to VF-LCR system.
		IO.ao.PLCHeartbeat := IO.ao.PLCHeartbeat + 1;
		
		// -----------------
		// Layer Selection
		// -----------------
		IO.ao.SelectedBuildLayout := task.parameters.openLayerParameters.selectedBuildLayout;
		IO.ao.SelectedPrintNumber := task.parameters.openLayerParameters.selectedPrintNumber;
		IO.ao.SelectedLayerNumber := task.parameters.openLayerParameters.selectedLayer;
		
		// -----------------
		// Operation Control
		// -----------------
		//IF (IO.do.Delete_LUTFiles) THEN
		//	IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 0);
		//ELSE
		//	IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 0);
		//END_IF
		
		IF (IO.do.Delete_LaserControlFiles) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 1);
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 1);
		END_IF
		
		//IF (IO.do.Transfer_LUTFiles) THEN
		//	IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 2);
		//ELSE
		//	IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 2);
		//END_IF
		
		IF (IO.do.Transfer_LaserControlFiles) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 3);
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 3);
		END_IF
		
		//IF (IO.do.EnableMode_MANUAL) THEN
		//	IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 6); // Set manual mode
		//	IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 7); // Clear auto mode
		//ELSE
		//	IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 6); // Clear manual mode
		//	IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 7); // Set auto mode
		//END_IF
		
		IF (IO.do.OpenLayer) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 8);
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 8);
		END_IF
		
		IF (IO.do.AbortLayer) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 9);
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 9);
		END_IF
	
END_ACTION

ACTION ShutDownIO:
	
	IO.raw.oEnableLaserMainPower := 0;
	IO.raw.oEnableLaserEmission := 0;
	IO.raw.oManualLaserOperation := 0;
	IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 6); // Disable MANUAL mode
	IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 7); // Disable AUTO mode
	IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 9); // Force AbortLayer command
	
END_ACTION




	
	
	

