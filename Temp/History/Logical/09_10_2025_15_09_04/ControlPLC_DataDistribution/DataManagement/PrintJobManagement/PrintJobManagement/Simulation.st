
ACTION SimulateIO:
	
	//used in the electrode test case -> electrode only enable if layer 10 or more
	IF test.command.induceCurrentLayerToEleven THEN
		test.command.induceCurrentLayerToEleven := FALSE;
		gPrintJobManagement.currentState.currentLayerNumber := 11;
		gPrintJobManagement.currentState.lastPrintedLayerNumber := 10;
		gPrintJobManagement.currentState.lastRecoatedLayerNumber := 10;
	END_IF
	
	IF test.command.assertRegularPlate THEN
		gPrintJobManagement.currentState.plateType := 'PLATE_TYPE_STANDARD';
	END_IF
	
	IF test.command.assertDOMS THEN
		gPrintJobManagement.currentState.plateType := 'PLATE_TYPE_DOMS';
	END_IF
	
END_ACTION
