
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	// Call PiperModuleInterface to interface with the rest of the machine
	PiperModuleInterface;


	//Call Fubs

	//The pause command must be set false. The current ATN commands are only set true,
	//This allows us to manually set the pause bits false as we need to
	anyPaused := FALSE;
	FOR index := 0 TO stateCount( gSFCControlApi.status.sfc ) DO
		IF forStateGetPointer( gSFCControlApi.status.sfc, index, 0, ADR(pSFCData), ADR(sSFCData) ) THEN
			dSFCData ACCESS pSFCData;
			dPause ACCESS dSFCData.pPause;
			dBypass ACCESS dSFCData.pBypass;
			dTrans ACCESS dSFCData.pTransition;
			dSingleStep ACCESS dSFCData.pSingleStep;

			IF dSingleStep AND NOT dPause AND dTrans THEN
				dPause := TRUE;
			END_IF	
			
			IF task.internal.unpause.Execute OR task.internal.reset.Execute THEN
				dPause := FALSE;		
			END_IF	

			dBypass := dPause AND task.status.paused;
			anyPaused := anyPaused OR dPause;

		END_IF	
	END_FOR	


	task.internal.unpause.Command := gSFCControlApi.command.unpause;
	task.internal.unpause();
	task.internal.unpause.Execute := FALSE;
	
	task.internal.reset.Command := gSFCControlApi.command.reset;
	task.internal.reset();
	task.internal.reset.Execute := FALSE;

END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

