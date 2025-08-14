
IF NOT autoMode THEN
	IF task.internal.msgId = 0 THEN
		
		NEXT_PIXEL := FALSE;
		SKIP_PIXEL := FALSE;
		END_TEST := FALSE;
		
		IF task.internal.activePixelIndex >= MACHINE_NUM_LASERS_TOTAL THEN
			
			// there are no more pixels
			task.internal.msgId := TRUE;
			task.internal.nextPixel := TRUE;
		
		ELSIF gVFLCR.status.vfpMap[task.internal.activePixelIndex, 1] = FALSE THEN
			
			// pixel is disabled
			task.internal.msgId := TRUE;
			task.internal.skipPixel:= TRUE;	
			
		ELSE
		
			// pixel is enabled
			task.internal.msgId := TRUE;
			
		END_IF
	
		
	ELSIF task.internal.msgId <> 0 THEN
		
		//Waiting for the user
		
	END_IF
	
//	IF messageHandler.cancel THEN
//		messageHandler.cancel := 0;
//		task.internal.msgId := FALSE;
//		SFCReset := TRUE;
//		gMachine.IN.CMD.Stop:= TRUE;
//	END_IF
	
	//Once a selection is made we are good
	IF NEXT_PIXEL OR SKIP_PIXEL OR END_TEST THEN
	
//		OK := TRUE;
		task.internal.msgId := FALSE;
		task.internal.skipPixel:= FALSE;
		task.internal.nextPixel := FALSE;
		
	END_IF
ELSE
	IF gVFLCR.status.vfpMap[task.internal.activePixelIndex, 1] = FALSE THEN
		SKIP_PIXEL := TRUE;
	ELSE
		NEXT_PIXEL := TRUE;
	END_IF
END_IF
