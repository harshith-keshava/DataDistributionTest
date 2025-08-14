
task.internal.showPopUp := TRUE;
task.internal.showNextPixel := TRUE;
task.internal.showSkipPixel:= TRUE;


IF task.internal.showPopUp THEN
		
	IF task.parameters.pixelNum >= MACHINE_NUM_LASERS_TOTAL THEN
		
		task.internal.showNextPixel := FALSE;
		task.internal.showSkipPixel:= FALSE;
		
		
	ELSIF gVFLCR.status.vfpMap[task.parameters.pixelNum , 1] = FALSE THEN
			
		// pixel is disabled
		//task.internal.msgId := TRUE;
		task.internal.showNextPixel := FALSE;	
		
			
	ELSE
		
		// pixel is enabled
		//task.internal.msgId := TRUE;
		task.internal.showSkipPixel:= FALSE;
			
	END_IF
	
END_IF
	
IF task.internal.showPopUp <> 0 THEN
		
	
		
END_IF
	
	//	IF messageHandler.cancel THEN
	//		messageHandler.cancel := 0;
	//		task.internal.msgId := FALSE;
	//		SFCReset := TRUE;
	//		gMachine.IN.CMD.Stop:= TRUE;
	//	END_IF
	
	//Once a selection is made we are good
IF NEXT_PIXEL OR SKIP_PIXEL OR END_TEST THEN
	
	task.internal.showPopUp := FALSE;
	task.internal.showSkipPixel:= FALSE;
	task.internal.showNextPixel := FALSE;
		
END_IF
