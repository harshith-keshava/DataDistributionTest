
ACTION DeriveProcessData: 


	// ==================================================================================================================================================
	
	IF gPrintProcessConfigLoaded THEN
		task.status.pciLoadStatus := 'LOADED';
	ELSE
		task.status.pciLoadStatus := 'NOT LOADED';
	END_IF
		
END_ACTION
