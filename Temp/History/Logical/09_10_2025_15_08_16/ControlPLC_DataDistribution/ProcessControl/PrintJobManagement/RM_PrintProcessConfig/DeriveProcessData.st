
ACTION DeriveProcessData: 


	// ==================================================================================================================================================
	// ATN command handle
	task.internal.atnCommand();
	IF task.internal.atnCommand.Done OR task.internal.atnCommand.Error OR task.internal.atnCommand.Aborted THEN
		task.internal.atnCommand.Execute := FALSE;
	END_IF
	
	IF gPrintProcessConfigLoaded THEN
		task.status.pciLoadStatus := 'LOADED';
	ELSE
		task.status.pciLoadStatus := 'NOT LOADED';
	END_IF
		
END_ACTION
