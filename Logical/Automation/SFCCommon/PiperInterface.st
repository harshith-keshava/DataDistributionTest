
ACTION PiperModuleInterface: 
	
	IF NOT init THEN
		init:= TRUE;
		
		//Subscribe the SFC commands so they can be controled externally
		subscribeCommandBool(gSFCControlApi.command.reset, logStateChange_0.ModuleName, SFCReset);
		subscribeCommandBool(gSFCControlApi.command.pause, logStateChange_0.ModuleName, SFCPause);

		//We need to register the SFCPause bit as a parameter so it can be written to false, currently commands only write true.		
		registerStateParameters(gSFCControlApi.status.sfc, logStateChange_0.ModuleName, ADR(sfcData), SIZEOF(sfcData));
	END_IF	
	sfcData.pBypass := ADR(ModuleInterface.ModuleBypass);
	sfcData.pPause := ADR(SFCPause);
	sfcData.pTransition := ADR(SFCTrans);
	sfcData.pSingleStep := ADR(SFCSingleStep);


	//Give this module a name so it is easier to debug
	ModuleInterface.ModuleName:=	logStateChange_0.ModuleName;

	//Add a module to the Piper
	Module.ModuleInterface:=	ADR(ModuleInterface);
	Module.Piper:= 	ADR(gMachine);
	Module();

	//Don't reset operations if we are bypassed, as this can mess with 
	// The SFC while it's paused.
	//IF ModuleInterface.PiperState <> MACH_ST_BYPASSED THEN

	//	ResetOperation;

	//END_IF
			
	// Handle any machine states that this module needs to respond to
	CASE ModuleInterface.PiperState OF
		//		MACH_ST_BOOTING:		
		//		MACH_ST_CLEARING:
		//		MACH_ST_STOPPED:
		MACH_ST_STARTING:
			
			CASE ModuleInterface.PiperSubState OF
				SUB_STATE_INIT:
					task.status.statusID := ERR_OK;
					ModuleInterface.ModuleSubStateRequest := SUB_STATE_START_SFC;							

				SUB_STATE_START_SFC:
					
					SelectOperation;
					ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
						
			END_CASE	
			
			//		MACH_ST_IDLE:
			//		MACH_ST_SUSPENDED:
		MACH_ST_EXECUTE:
			
			IF task.status.statusID = ERR_OK THEN
	  				
				ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;	
				
			ELSIF task.status.statusID = ERR_FUB_BUSY THEN
				
				ModuleInterface.ModuleResponse :=	MACH_ST_NOT_READY;	

			ELSE
				
				IF Configuration.errorAborts THEN
					IF ModuleInterface.ModuleResponse <> MACH_ST_ERROR THEN
						ModuleInterface.ModuleResponse:=	MACH_ST_ERROR;		
					//	vfAlarmEdgeSnippet( gMachineAlarms.components, gMachineAlarms.PACKML_ABORT, logStateChange_0.ModuleName);
					END_IF					
				ELSE

					IF NOT gMachine.IN.CMD.Stop THEN

				//		vfAlarmEdgeSnippet( gMachineAlarms.components, gMachineAlarms.PACKML_STOP, logStateChange_0.ModuleName);
						logInfo( 'App', UDINT_TO_UINT(task.status.statusID), 'Stop due to SFC status', 0 );				
						gMachine.IN.CMD.Stop := TRUE;	

					END_IF	

				END_IF							
			END_IF	
			
		MACH_ST_STOPPING:
			SFCReset := TRUE;	
			// SOMS abort handskake handling 
			
			IF (gMachineState._previousOperation = MACH_OP_OMS_TEST ) AND stateAnyFalse( gSFCControlApi.status.sOMSTestComplete , TRUE ) AND stateAnyTrue( gVFLCR.status.usingGen3LaserCalibrationApp , TRUE ) 
				AND stateAllTrue(gSFCControlApi.status.sOMSModeActive,FALSE) AND stateAllTrue(gVFLCR.status.heartbeatLaserCalibrationAppOk,FALSE) THEN
				executeCommand(gVFLCR.command.passAbortedHandshakeWithoutAck);
			END_IF	

			gMachineState._previousOperation := MACH_OP_NONE;
			
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
			
		MACH_ST_ABORTING:

			SFCReset := TRUE;	
			// SOMS abort handskake handling 
			
			IF (gMachineState._previousOperation = MACH_OP_OMS_TEST ) AND stateAnyFalse( gSFCControlApi.status.sOMSTestComplete , TRUE ) AND stateAnyTrue( gVFLCR.status.usingGen3LaserCalibrationApp , TRUE ) 
				AND stateAllTrue(gSFCControlApi.status.sOMSModeActive,FALSE) AND stateAllTrue(gVFLCR.status.heartbeatLaserCalibrationAppOk,FALSE) THEN
				executeCommand(gVFLCR.command.passAbortedHandshakeWithoutAck);
			END_IF	
			
			gMachineState._previousOperation := MACH_OP_NONE;
			
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;

			IF messageHandler.msgId <> 0 THEN
				messageHandler.msgId := 0;
				MessageBox_RemoveMsg( messageHandler.msgId );
			END_IF
						
		MACH_ST_HOLDING:
			SFCPause := TRUE;
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;				

		MACH_ST_UNHOLDING:
			//At this point the task is paused, so this actually isn't really a case to handle here.
			// Unpause happens externally in SFCControl Task.
			SFCPause := FALSE;
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;				
			
			//		MACH_ST_ABORTED:
			//		MACH_ST_HELD:
			//		MACH_ST_SUSPENDING:
			//		MACH_ST_UNSUSPENDING:
			//		MACH_ST_RESETTING:
			//		MACH_ST_COMPLETING:
			//		MACH_ST_COMPLETE:
		
		MACH_ST_BYPASSED:
		
		ELSE
			ModuleInterface.ModuleResponse:=	ModuleInterface.PiperState;
		
	END_CASE	

//	ModuleInterface.ModuleBypass := SFCPause;

	brsmemset( ADR(task.command), 0, SIZEOF(task.command));
		
END_ACTION