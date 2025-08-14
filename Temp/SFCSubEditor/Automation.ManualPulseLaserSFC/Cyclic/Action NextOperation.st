OK	:= FALSE;

IF task.internal.msgId = 0 THEN
	task.internal.msgId := 1; 
	
ELSIF task.internal.msgId <> 0 THEN
	
	//Waiting for the user
	
END_IF

//IF messageHandler.cancel THEN
//	messageHandler.cancel := 0;
//	messageHandler.msgId := 0;
//	SFCReset := TRUE;
//	gMachine.IN.CMD.Stop:= TRUE;
//END_IF

//Once a selection is made we are good
IF NEXT_PIXEL OR SKIP_PIXEL OR END_TEST THEN

	OK := TRUE;
	task.internal.msgId := 0;
	
END_IF