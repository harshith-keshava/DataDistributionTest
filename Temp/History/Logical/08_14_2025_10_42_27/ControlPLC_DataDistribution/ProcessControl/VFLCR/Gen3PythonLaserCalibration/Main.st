
PROGRAM _INIT
	
	// TODO: re-add configuration once we bump vartools version
	//Configuration.Exists := TRUE; //for now
		
	Name := 'Gen 3 Python Laser Cal';
	//IF Configuration.Exists THEN
		
	//other systems can monitor this state
	//	registerStateBool( , Name, );
		
	//END_IF
	
	// are we using the gen3 python app?
	//registerStateBool( gVFLCR.status.usingGen3LaserCalibrationApp, Name, Configuration.Exists );
	
	// TEMPORARY

	registerStateBool( gVFLCR.status.usingGen3LaserCalibrationApp, Name, usingGen3LaserCalibrationApp );
	registerStateBool( gVFLCR.status.heartbeatLaserCalibrationAppOk, Name, task.status.calibAppConnected );
	
	// subscribe trigger/capture command to gVFLCR command for VFLCR_Operation to use in subsequence
	subscribePLCOpenWithParameters( gVFLCR.command.triggerDataCollection, Name, ADR(task.internal.parameters.capturePixel), SIZEOF(task.internal.parameters.capturePixel), task.command.capturePixel, task.internal.PLCOpen );
	subscribePLCOpenWithParameters( gVFLCR.command.initializeDataCollection, Name, ADR(task.internal.parameters.capturePixel), SIZEOF(task.internal.parameters.capturePixel), task.command.initializeCalibration, task.internal.PLCOpen );
	subscribePLCOpenWithParameters( gVFLCR.command.initializePixel, Name, ADR(task.internal.parameters.initializePixel), SIZEOF(task.internal.parameters.initializePixel), task.command.initializePixel, task.internal.PLCOpen );
	subscribePLCOpenWithParameters( gVFLCR.command.uploadLUTs, Name, ADR(task.internal.parameters.uploadLUTs), SIZEOF(task.internal.parameters.uploadLUTs), task.command.uploadLUTs, task.internal.PLCOpen );
	subscribePLCOpenWithParameters( gVFLCR.command.setZaber1Pos, Name, ADR(task.internal.parameters.adjustZaber1), SIZEOF(task.internal.parameters.adjustZaber1), task.command.setZaber1Pos, task.internal.PLCOpen );
	subscribePLCOpenWithParameters( gVFLCR.command.setZaber2PosAndExposure, Name, ADR(task.internal.parameters.adjustZaber2AndExposure), SIZEOF(task.internal.parameters.adjustZaber2AndExposure), task.command.setZaber2PosAndExposure, task.internal.PLCOpen );
	subscribePLCOpenWithParameters( gVFLCR.command.initializePixelForFrame, Name, ADR(task.internal.parameters.initializePixelForFrame), SIZEOF(task.internal.parameters.initializePixelForFrame), task.command.initializePixelForFrame, task.internal.PLCOpen );	
	subscribePLCOpen( gVFLCR.command.captureFrame, Name, task.command.captureFrame, task.internal.PLCOpen );
	subscribePLCOpen( gVFLCR.command.initializeOmsTestZaber1, Name, task.command.initializeOmsTestZaber1, task.internal.PLCOpen );
	subscribePLCOpen( gVFLCR.command.initializeOmsTestZaber2, Name, task.command.initializeOmsTestZaber2, task.internal.PLCOpen );
	subscribePLCOpen( gVFLCR.command.processPixel, Name, task.command.processPixel, task.internal.PLCOpen );
	subscribePLCOpen( gVFLCR.command.processCalibration, Name, task.command.processCalibration, task.internal.PLCOpen );
	subscribePLCOpen( gVFLCR.command.uploadTestData, Name, task.command.uploadTestData, task.internal.PLCOpen );
	subscribePLCOpen( gVFLCR.command.checkZaber1Homed, Name, task.command.checkZaber1Homed, task.internal.PLCOpen );
	subscribePLCOpen( gVFLCR.command.checkZaber2Homed, Name, task.command.checkZaber2Homed, task.internal.PLCOpen );
	subscribePLCOpen( gVFLCR.command.passRequiredMetaData, Name, task.command.passRequiredMetaData, task.internal.PLCOpen );
	subscribePLCOpen( gVFLCR.command.passCompleteHandshake, Name, task.command.passCompleteHandshake, task.internal.PLCOpen );
	subscribePLCOpen( gVFLCR.command.passAbortedHandshake, Name, task.command.passAbortedHandshake, task.internal.PLCOpen );
	subscribePLCOpen( gVFLCR.command.passAbortedHandshakeWithoutAck, Name, task.command.passAbortedHandshakeWithoutAck, task.internal.PLCOpen );
	
	//Defaut to automatic test 
	usingGen3LaserCalibrationApp := TRUE;
	Configuration.ComPortNumberZaber1Hmi := 8;
	
END_PROGRAM

PROGRAM _CYCLIC
	
		
	//Call piper interface	
	//PiperModuleInterface;
	
	
	//usingGen3LaserCalibrationApp := TRUE;
	
	dOut ACCESS ADR(gOpcData_ToGen3CalibApp);
	dIn ACCESS ADR(gOpcData_FromGen3CalibApp);

	///////////////////////////////////////////////////////////////
	//API:
	//	Requires:
	//	-
	//	Commands:
	//	-
	//	Inhbits:
	//	- 
	//
	//  State Monitoring
	//  -
	///////////////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////////////
	//Connection watchdog
	///////////////////////////////////////////////////////////////
	IF task.internal.heartbeatTimer.Q THEN
		
		// kick app
		dOut.HeartbeatOut := dOut.HeartbeatOut + 1;
		
		IF (dIn.HeartbeatIn <> task.internal.lastHeartbeatReceived) THEN
			
			// response received
			task.internal.lastHeartbeatReceived := dIn.HeartbeatIn;
			task.status.calibAppConnected := TRUE;
			task.internal.missedHeartbeats := 0;
			
		ELSIF task.internal.missedHeartbeats <= MAX_MISSED_HEARTBEATS THEN
			
			// no response, count but don't overflow counter
			task.internal.missedHeartbeats := task.internal.missedHeartbeats + 1;
			
		END_IF
		
	ELSE
		
		// restart kick timer
		task.internal.heartbeatTimer.IN := TRUE;
		
	END_IF
	
	//timeout after 3 missed heartbeats
	IF task.internal.missedHeartbeats >= MAX_MISSED_HEARTBEATS THEN
		// heartbeat timer should be longer than cmd timeouts so cmds fail gracefully and flags reset
		task.status.calibAppConnected := FALSE;
	END_IF
	
	task.internal.calibAppNotConnected := NOT task.status.calibAppConnected;
	vfAlarmPersistent(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_HEARTBEAT_ERROR_AL9400, task.internal.calibAppNotConnected);
	
	///////////////////////////////////////////////////////////////
	//Test results watchdog
	///////////////////////////////////////////////////////////////
	IF task.status.processingTestData THEN
		
		// Check for results regularly (while data is being processed)
		IF task.internal.resultsPollingTimer.Q THEN
			
			// Perform a download
			// A little weird to set command like this, but prevents overlap with other commands using the same app
			task.command.downloadAndParseTestResults := TRUE;
			
		ELSE
			
			task.internal.resultsPollingTimer.IN := TRUE;
		END_IF
		
		// test result timeout
		task.internal.resultsTimeoutTimer.IN := TRUE;
		
		IF task.internal.resultsTimeoutTimer.Q THEN
			vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_RESULTS_TIMEOUT_AL9403, 'Test results timed out');
			task.status.processingTestData := FALSE;
		END_IF
		
	END_IF
	
	//ready to handle commands
	task.status.ready := task.status.calibAppConnected;
	
	///////////////////////////////////////////////////////////////
	//Handle commands
	///////////////////////////////////////////////////////////////
	IF task.status.ready THEN
		
		//Local lockout 
		IF task.internal.localLockout THEN
			
		ELSIF task.command.exampleCommand THEN
			task.internal.newCommand := 1;
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_EXAMPLE_COMMAND;
			task.status.statusMessage := 'running example command';
			
		ELSIF task.command.abort THEN
			
			task.internal.newCommand := 1;
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_READY;
			task.status.statusMessage := 'aborting';
			
		ELSIF task.command.initializeCalibration THEN
			
			task.internal.newCommand := 1;
			
			IF task.internal.PLCOpen.parametersWritten THEN
				task.parameters.capturePixel := task.internal.parameters.capturePixel;
			END_IF
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_INITIALIZE_CALIBRATION;
			task.status.statusMessage := 'initializing calibration';
			
		ELSIF task.command.initializePixel THEN
			
			task.internal.newCommand := 1;
			
			IF task.internal.PLCOpen.parametersWritten THEN
				task.parameters.initializePixel := task.internal.parameters.initializePixel;
			END_IF
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_INITIALIZE_PIXEL;
			task.status.statusMessage := 'initializing pixel';
			
		ELSIF task.command.capturePixel THEN
			
			task.internal.newCommand := 1;
			
			IF task.internal.PLCOpen.parametersWritten THEN
				task.parameters.capturePixel := task.internal.parameters.capturePixel;
			END_IF
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_CAPTURE_PIXEL;
			task.status.statusMessage := 'capturing pixel';
			
		ELSIF task.command.processPixel THEN
			
			task.internal.newCommand := 1;
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_PROCESS_PIXEL;
			task.status.statusMessage := 'processing pixel';
			
		ELSIF task.command.processCalibration THEN
			
			task.internal.newCommand := 1;
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_PROCESS_CALIBRATION;
			task.status.statusMessage := 'processing calibration';
			
		ELSIF task.command.uploadLUTs THEN
			
			task.internal.newCommand := 1;
			
			IF task.internal.PLCOpen.parametersWritten THEN
				task.parameters.uploadLUTs := task.internal.parameters.uploadLUTs;
			END_IF
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_UPLOAD_LUTS;
			task.status.statusMessage := 'uploading LUTs';
			
		ELSIF task.command.uploadTestData THEN
			
			task.internal.newCommand := 1;
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_UPLOAD_TEST_DATA;
			task.status.statusMessage := 'uploading test data';
			
		ELSIF task.command.downloadAndParseTestResults THEN
			
			task.internal.newCommand := 1;
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_DOWNLOAD_PARSE_RESULTS;
			task.status.statusMessage := 'downloading and parsing test results';
			
		ELSIF task.command.initializeOmsTestZaber1 THEN
			
						
			task.internal.newCommand := 1;
			
			dOut.OMSTestAborted := FALSE; // reset flags
			dOut.OMSTestComplete := FALSE; // reset flags
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_INITIALIZE_OMS_TEST_ZABER1;
			task.status.statusMessage := 'Initializing OMS test';
			
		ELSIF task.command.initializeOmsTestZaber2 THEN
			
						
			task.internal.newCommand := 1;
			
			dOut.OMSTestAborted := FALSE; // reset flags
			dOut.OMSTestComplete := FALSE; // reset flags
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_INITIALIZE_OMS_TEST_ZABER2;
			task.status.statusMessage := 'Initializing OMS test';
		
		ELSIF task.command.checkZaber1Homed THEN
			
			task.internal.newCommand := 1;
			
			dIn.Zaber1Homed := FALSE; // Reset Flag
			dIn.Zaber2Homed := FALSE; // Reset Flag
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_CHECK_ZABER1_HOMED;
			task.status.statusMessage := 'Check Zaber Homed';
		
		ELSIF task.command.checkZaber2Homed THEN
			
			task.internal.newCommand := 1;
			
			dIn.Zaber1Homed := FALSE; // Reset Flag
			dIn.Zaber2Homed := FALSE; // Reset Flag
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_CHECK_ZABER2_HOMED;
			task.status.statusMessage := 'Check Zaber Homed';
			
		ELSIF task.command.passRequiredMetaData THEN
			
			task.internal.newCommand := 1;
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_PASS_META_DATA;
			task.status.statusMessage := 'pass additional meta data';
		
		ELSIF task.command.captureFrame THEN
			
			task.internal.newCommand := 1;
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_CAPTURE_FRAME;
			task.status.statusMessage := 'Capture Frame';	
			
		ELSIF task.command.setZaber1Pos THEN
			
			task.internal.newCommand := 1;
			
			IF task.internal.PLCOpen.parametersWritten THEN
				task.parameters.adjustZaber1 := task.internal.parameters.adjustZaber1;
			END_IF
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_MOVE_ZABER1_CAM;
			task.status.statusMessage := 'Move Zaber1 and set cam exposure';
			
		ELSIF task.command.setZaber2PosAndExposure THEN
			
			task.internal.newCommand := 1;
			
			IF task.internal.PLCOpen.parametersWritten THEN
				task.parameters.adjustZaber2AndExposure := task.internal.parameters.adjustZaber2AndExposure;
			END_IF
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_MOVE_ZABER2_CAM_EXPO;
			task.status.statusMessage := 'Move Zaber2 and set cam exposure';
		
		ELSIF task.command.passCompleteHandshake THEN
			
			task.internal.newCommand := 1;
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_PASS_TEST_COMPLETE;
			task.status.statusMessage := 'Test Complete handshake signal';
			
		ELSIF task.command.passAbortedHandshake THEN
			
			task.internal.newCommand := 1;
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_PASS_TEST_ABORTED;
			task.status.statusMessage := 'Test Aborted handshake signal';	
			
		ELSIF task.command.passAbortedHandshakeWithoutAck THEN
			
			task.internal.newCommand := 1;
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_PASS_TEST_ABORTED_NO_ACK;
			task.status.statusMessage := 'Test Aborted handshake signal without acknowledge';
			
		ELSIF task.command.initializePixelForFrame THEN
			
			task.internal.newCommand := 1;
			
			IF task.internal.PLCOpen.parametersWritten THEN
				task.parameters.initializePixelForFrame := task.internal.parameters.initializePixelForFrame;
			END_IF
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_INIT_PIXEL_FRAMECAPTURE;
			task.status.statusMessage := 'Initialize pixel data for frame capture';
			
		END_IF
		
	ELSE
		
		IF NOT allZero( ADR(task.command), SIZEOF(task.command)) THEN
			vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_CMD_B4_READY_AL9402, Name);
		END_IF
		
		task.internal.PLCOpen.status := VFLCR_ERROR;
		task.status.state := STATE_NOT_READY;
		task.internal.localLockout := FALSE;
		
	END_IF
	
	
	///////////////////////////////////////////////////////////////
	//Handle any canceled commands
	///////////////////////////////////////////////////////////////
	IF task.internal.newCommand THEN
		
		atnPLCOpenAbort(task.internal.PLCOpen);
		
	END_IF
	
	
	///////////////////////////////////////////////////////////////
	//Handle the current state
	///////////////////////////////////////////////////////////////
	CASE task.status.state OF
		
		STATE_NOT_READY:
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.statusMessage := 'app not connected';
			
			IF task.status.ready THEN
				task.status.state := STATE_READY;
			END_IF
			
		STATE_READY:
		
			task.status.statusMessage := 'ready for cmd';
			task.status.sequence := SEQUENCE_IDLE;
			
		STATE_EXAMPLE_COMMAND:
			
			// update command bool in opcua
			dOut.ExampleCommand := TRUE;
			
			// start timeout timer
			task.internal.cmdTimeoutTimer.IN := TRUE;
			
			// wait for feedback
			IF dIn.ExampleResult = 1 THEN
				
				task.status.statusMessage := 'command completed';
				
				dOut.ExampleCommand := FALSE;
				
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
				
			ELSIF task.internal.cmdTimeoutTimer.Q THEN
				
				task.status.statusMessage := 'Example command to python app timed out';
				
				dOut.ExampleCommand := FALSE;
				
				task.internal.PLCOpen.status := VFLCR_ERROR;
				task.status.state := STATE_READY;
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
				
			END_IF
			
		STATE_INITIALIZE_CALIBRATION:
			
			IF stateAllFalse(gSFCControlApi.status.sOMSModeActive,FALSE)   THEN
				// update command bool in opcua
				dOut.InitializeCalibration := TRUE;
				
				dOut.CurrentPowerWatts := task.parameters.capturePixel.CurrentPowerWatts;
				dOut.LaserParameters := task.parameters.capturePixel.LaserParameters;
				dOut.VFPMap := gVFLCR.status.vfpMap;
				dOut.TestType := task.parameters.capturePixel.TestType;
				
				// start timeout timer
				task.internal.cmdTimeoutTimer.IN := TRUE;
				
				// wait for feedback
				IF dIn.CalibrationInitialized THEN
					
					brsmemset( ADR(task.internal.measuredPowerList1), 0, SIZEOF(task.internal.measuredPowerList1) ); //reset list
					brsmemset( ADR(task.internal.CommandedPowerList1), 0, SIZEOF(task.internal.CommandedPowerList1) ); //reset list
					brsmemset( ADR(task.internal.measuredPowerList2), 0, SIZEOF(task.internal.measuredPowerList2) ); //reset list
					brsmemset( ADR(task.internal.CommandedPowerList2), 0, SIZEOF(task.internal.CommandedPowerList2) ); //reset list
					brsmemset( ADR(task.internal.measuredPowerList3), 0, SIZEOF(task.internal.measuredPowerList3) ); //reset list
					brsmemset( ADR(task.internal.CommandedPowerList3), 0, SIZEOF(task.internal.CommandedPowerList3) ); //reset list
					brsmemset( ADR(task.internal.measuredPowerList4), 0, SIZEOF(task.internal.measuredPowerList4) ); //reset list
					brsmemset( ADR(task.internal.CommandedPowerList4), 0, SIZEOF(task.internal.CommandedPowerList4) ); //reset list
					brsmemset( ADR(task.internal.measuredPowerList5), 0, SIZEOF(task.internal.measuredPowerList5) ); //reset list
					brsmemset( ADR(task.internal.CommandedPowerList5), 0, SIZEOF(task.internal.CommandedPowerList5) ); //reset list
					brsmemset( ADR(task.internal.measuredPowerList6), 0, SIZEOF(task.internal.measuredPowerList6) ); //reset list
					brsmemset( ADR(task.internal.CommandedPowerList6), 0, SIZEOF(task.internal.CommandedPowerList6) ); //reset list
					brsmemset( ADR(task.internal.measuredPowerList7), 0, SIZEOF(task.internal.measuredPowerList7) ); //reset list
					brsmemset( ADR(task.internal.CommandedPowerList7), 0, SIZEOF(task.internal.CommandedPowerList7) ); //reset list
					brsmemset( ADR(task.internal.measuredPowerList8), 0, SIZEOF(task.internal.measuredPowerList8) ); //reset list
					brsmemset( ADR(task.internal.CommandedPowerList8), 0, SIZEOF(task.internal.CommandedPowerList8) ); //reset list
					FOR task.internal.ii:=0 TO MACHINE_MAI_LASERS_TOTAL BY 1 DO
						task.internal.LaserTestStatusList1[task.internal.ii] := 'NO DATA';
						task.internal.LaserTestStatusList2[task.internal.ii] := 'NO DATA';
						task.internal.LaserTestStatusList3[task.internal.ii] := 'NO DATA';
						task.internal.LaserTestStatusList4[task.internal.ii] := 'NO DATA';
						task.internal.LaserTestStatusList5[task.internal.ii] := 'NO DATA';
						task.internal.LaserTestStatusList6[task.internal.ii] := 'NO DATA';
						task.internal.LaserTestStatusList7[task.internal.ii] := 'NO DATA';
						task.internal.LaserTestStatusList8[task.internal.ii] := 'NO DATA';
					END_FOR	
					task.internal.currentPowerLevel := 1;
	
					task.status.statusMessage := 'calibration initialized';
					
					dOut.InitializeCalibration := FALSE;
					
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				ELSIF task.internal.cmdTimeoutTimer.Q THEN
					
					task.status.statusMessage := 'initialize Calibration command to python app timed out';
					
					dOut.InitializeCalibration := FALSE;
					
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
					vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					
				END_IF
			ELSE // SOMS test- Send response ok
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
			END_IF	
			
		STATE_INITIALIZE_PIXEL:
			
			// update command bool in opcua
			dOut.InitializePixel := TRUE;
			
			// 1-indexed active pixel
			dOut.ActivePixel := task.parameters.initializePixel.activePixelIndex + 1;
			
			// reset internal power level tracking of pixel used for HMI plot
			task.internal.currentPowerLevel := 1;
			
			
			
			// start timeout timer
			task.internal.cmdTimeoutTimer.IN := TRUE;
			
			// wait for feedback
			IF dIn.PixelInitialized THEN
				
				task.status.statusMessage := 'pixel initialized';
				
				dOut.InitializePixel := FALSE;
				
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
				
			ELSIF task.internal.cmdTimeoutTimer.Q THEN
				
				task.status.statusMessage := 'Initialize Pixel command to python app timed out';
				
				dOut.InitializePixel := FALSE;
				
				task.internal.PLCOpen.status := VFLCR_ERROR;
				task.status.state := STATE_READY;
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
				
			END_IF
			
		STATE_CAPTURE_PIXEL:
			
			// update command bool in opcua
			dOut.CapturePixel := TRUE;
			
			dOut.CurrentPowerWatts := task.parameters.capturePixel.CurrentPowerWatts;
			dOut.LaserParameters := task.parameters.capturePixel.LaserParameters;
			
			// start timeout timer
			task.internal.cmdTimeoutTimer.IN := TRUE;
			
			// wait for feedback
			IF dIn.PixelCaptured THEN
				IF task.internal.currentPowerLevel = 1 THEN
					task.internal.measuredPowerList1[dOut.ActivePixel] := dIn.MeasuredPower;
					task.internal.CommandedPowerList1[dOut.ActivePixel] := dIn.CommandedPower;
					IF dIn.LaserTestStatus = 1 THEN
						task.internal.LaserTestStatusList1[dOut.ActivePixel] := 'PASS';
					ELSE
						task.internal.LaserTestStatusList1[dOut.ActivePixel] := 'FAIL';
					END_IF
				ELSIF task.internal.currentPowerLevel = 2 THEN
					task.internal.measuredPowerList2[dOut.ActivePixel] := dIn.MeasuredPower;
					task.internal.CommandedPowerList2[dOut.ActivePixel] := dIn.CommandedPower;
					IF dIn.LaserTestStatus = 1 THEN
						task.internal.LaserTestStatusList2[dOut.ActivePixel] := 'PASS';
					ELSE
						task.internal.LaserTestStatusList2[dOut.ActivePixel] := 'FAIL';
					END_IF
				ELSIF task.internal.currentPowerLevel = 3 THEN
					task.internal.measuredPowerList3[dOut.ActivePixel] := dIn.MeasuredPower;
					task.internal.CommandedPowerList3[dOut.ActivePixel] := dIn.CommandedPower;
					IF dIn.LaserTestStatus = 1 THEN
						task.internal.LaserTestStatusList3[dOut.ActivePixel] := 'PASS';
					ELSE
						task.internal.LaserTestStatusList3[dOut.ActivePixel] := 'FAIL';
					END_IF
				ELSIF task.internal.currentPowerLevel = 4 THEN	
					task.internal.measuredPowerList4[dOut.ActivePixel] := dIn.MeasuredPower;
					task.internal.CommandedPowerList4[dOut.ActivePixel] := dIn.CommandedPower;
					IF dIn.LaserTestStatus = 1 THEN
						task.internal.LaserTestStatusList4[dOut.ActivePixel] := 'PASS';
					ELSE
						task.internal.LaserTestStatusList4[dOut.ActivePixel] := 'FAIL';
					END_IF
				ELSIF task.internal.currentPowerLevel = 5 THEN	
					task.internal.measuredPowerList5[dOut.ActivePixel] := dIn.MeasuredPower;
					task.internal.CommandedPowerList5[dOut.ActivePixel] := dIn.CommandedPower;
					IF dIn.LaserTestStatus = 1 THEN
						task.internal.LaserTestStatusList5[dOut.ActivePixel] := 'PASS';
					ELSE
						task.internal.LaserTestStatusList5[dOut.ActivePixel] := 'FAIL';
					END_IF
				ELSIF task.internal.currentPowerLevel = 6 THEN	
					task.internal.measuredPowerList6[dOut.ActivePixel] := dIn.MeasuredPower;
					task.internal.CommandedPowerList6[dOut.ActivePixel] := dIn.CommandedPower;
					IF dIn.LaserTestStatus = 1 THEN
						task.internal.LaserTestStatusList6[dOut.ActivePixel] := 'PASS';
					ELSE
						task.internal.LaserTestStatusList6[dOut.ActivePixel] := 'FAIL';
					END_IF
				ELSIF task.internal.currentPowerLevel = 7 THEN	
					task.internal.measuredPowerList7[dOut.ActivePixel] := dIn.MeasuredPower;
					task.internal.CommandedPowerList7[dOut.ActivePixel] := dIn.CommandedPower;
					IF dIn.LaserTestStatus = 1 THEN
						task.internal.LaserTestStatusList7[dOut.ActivePixel] := 'PASS';
					ELSE
						task.internal.LaserTestStatusList7[dOut.ActivePixel] := 'FAIL';
					END_IF
				ELSIF task.internal.currentPowerLevel = 8 THEN	
					task.internal.measuredPowerList8[dOut.ActivePixel] := dIn.MeasuredPower;
					task.internal.CommandedPowerList8[dOut.ActivePixel] := dIn.CommandedPower;
					IF dIn.LaserTestStatus = 1 THEN
						task.internal.LaserTestStatusList8[dOut.ActivePixel] := 'PASS';
					ELSE
						task.internal.LaserTestStatusList8[dOut.ActivePixel] := 'FAIL';
					END_IF
			END_IF
					
				task.internal.currentPowerLevel := task.internal.currentPowerLevel + 1;
				
				task.status.statusMessage := 'pixel captured';
				
				dOut.CapturePixel := FALSE;
				
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
				
			ELSIF dIn.ErrorCaptureFailed THEN
				
				task.status.statusMessage := 'pixel capture failed';
				
				dOut.CapturePixel := FALSE;
				
				task.internal.PLCOpen.status := VFLCR_ERROR;
				task.status.state := STATE_READY;
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_CAPTURE_FAILED_AL9406, task.status.statusMessage);
				
			ELSIF task.internal.cmdTimeoutTimer.Q THEN
				
				task.status.statusMessage := 'Capture Pixel command to python app timed out';
				
				dOut.CapturePixel := FALSE;
				
				task.internal.PLCOpen.status := VFLCR_ERROR;
				task.status.state := STATE_READY;
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
				
			END_IF
			
		STATE_PROCESS_PIXEL:
			
			// update command bool in opcua
			dOut.ProcessPixel := TRUE;
			
			// start timeout timer
			task.internal.cmdTimeoutTimer.IN := TRUE;
			
			// wait for feedback
			IF dIn.PixelProcessed THEN
				
				// TODO: record result
				dIn.PixelResult;
				
				task.status.statusMessage := 'pixel processed';
				
				dOut.ProcessPixel := FALSE;
				
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
				
			ELSIF task.internal.cmdTimeoutTimer.Q THEN
				
				task.status.statusMessage := 'Process Pixel command to python app timed out';
				
				dOut.ProcessPixel := FALSE;
				
				task.internal.PLCOpen.status := VFLCR_ERROR;
				task.status.state := STATE_READY;
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
				
			END_IF
			
		STATE_PROCESS_CALIBRATION:
			
			// update command bool in opcua
			dOut.ProcessCalibration := TRUE;
			
			// start timeout timer
			task.internal.cmdTimeoutTimer.IN := TRUE;
			
			// wait for feedback
			IF dIn.CalibrationProcessed THEN
				
				task.status.statusMessage := 'calibration processed';
				
				dOut.ProcessCalibration := FALSE;
				
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
				
			ELSIF task.internal.cmdTimeoutTimer.Q THEN
				
				task.status.statusMessage := 'Process Calibration command to python app timed out';
				
				dOut.ProcessCalibration := FALSE;
				
				task.internal.PLCOpen.status := VFLCR_ERROR;
				task.status.state := STATE_READY;
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
				
			END_IF
			
		STATE_UPLOAD_LUTS:
			
			CASE task.status.sequence OF 
				
				SEQUENCE_ERROR:
					// specific error message within subsequence
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					task.status.statusMessage := 'LUTs uploaded';
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'starting LUT upload';
					task.status.sequence := SEQUENCE_LUT_DELETE;
					
				ELSE
					
					UploadLUTsSubsequence;
					
			END_CASE
			
		STATE_UPLOAD_TEST_DATA:
			
			// update command bool in opcua
			dOut.UploadTestData := TRUE;
			
			// start timeout timer
			task.internal.cmdTimeoutTimer.IN := TRUE;
			
			// wait for feedback
			IF dIn.TestDataUploaded THEN
				
				task.status.statusMessage := 'test data uploaded';
				
				dOut.UploadTestData := FALSE;
				
				// TODO: this automatically starts right?
				task.status.processingTestData := TRUE;
				
				task.internal.PLCOpen.status := ERR_OK;
				task.status.state := STATE_READY;
			
			ELSIF dIn.ErrorBucketNotExist THEN
				
				task.status.statusMessage := 'upload failed; S3 bucket does not exist';
				
				dOut.UploadTestData := FALSE;
				
				task.internal.PLCOpen.status := VFLCR_ERROR;
				task.status.state := STATE_READY;
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_BUCKET_MISSING_AL9404, task.status.statusMessage);
				
			ELSIF dIn.ErrorS3Connection THEN
				
				task.status.statusMessage := 'upload failed; S3 connection failed';
				
				dOut.UploadTestData := FALSE;
				
				task.internal.PLCOpen.status := VFLCR_ERROR;
				task.status.state := STATE_READY;
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_S3_CONNECTION_AL9405, task.status.statusMessage);
				
			ELSIF task.internal.cmdTimeoutTimer.Q THEN
				
				task.status.statusMessage := 'Upload Test data command to python app timed out';
				
				dOut.UploadTestData := FALSE;
				
				task.internal.PLCOpen.status := VFLCR_ERROR;
				task.status.state := STATE_READY;
				
				vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
				
			END_IF
			
		STATE_DOWNLOAD_PARSE_RESULTS:
			
			// Sets PLCOpen.status despite not being an ATN command; this is benign
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					// specific error message within subsequence
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					// specific done message within subsequence TODO: make this work better/more intuitively
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'starting results download';
					task.status.sequence := SEQUENCE_RESULTS_DOWNLOAD;
					
					// Clear downloaded status
					task.status.resultsDownloaded := FALSE;
					
				ELSE
					
					DownloadResultsSubsequence;
					
			END_CASE
			
		STATE_INITIALIZE_OMS_TEST_ZABER1:
			
			// Sets PLCOpen.status despite not being an ATN command; this is benign
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					// specific error message within subsequence
					dOut.Zaber1Home := FALSE;
					dIn.MetaDataWriterReady := FALSE;
					dOut.StartOMSTest := FALSE;
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					// specific done message within subsequence TODO: make this work better/more intuitively
					dOut.Zaber1Home := FALSE;
					dIn.MetaDataWriterReady := FALSE;
					dOut.StartOMSTest := FALSE;
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Initializing OMS test';
					
					dOut.StartOMSTest := TRUE; // send signal to Meta data writter to initialize 
					dOut.Zaber1Home := TRUE; // Home Zaber 1
					
					task.status.sequence := SEQUENCE_OMS_INIT;
				
				SEQUENCE_OMS_INIT:
					// start timeout timer
					task.internal.cmdTimeoutTimer.IN := TRUE;
					
					task.internal.homeZaberWaitTimer.IN := TRUE;
						
					IF task.internal.homeZaberWaitTimer.Q THEN // wait for zaber to home
						task.status.sequence := SEQUENCE_DONE;
					END_IF
									
					IF dIn.MetaDataWriterReady THEN
						dOut.StartOMSTest := FALSE;
						dOut.Zaber1Home := FALSE;
						dIn.MetaDataWriterReady := FALSE;
												
					ELSIF task.internal.cmdTimeoutTimer.Q THEN
						dOut.Zaber1Home := FALSE;
						dIn.MetaDataWriterReady := FALSE;
						dOut.StartOMSTest := FALSE;
						task.status.sequence := SEQUENCE_ERROR;
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					END_IF
				
			END_CASE
			
		STATE_INITIALIZE_OMS_TEST_ZABER2:
			
			// Sets PLCOpen.status despite not being an ATN command; this is benign
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					// specific error message within subsequence
					dOut.Zaber2Home := FALSE;
					dIn.MetaDataWriterReady := FALSE;
					dOut.StartOMSTest := FALSE;
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					// specific done message within subsequence TODO: make this work better/more intuitively
					dOut.Zaber2Home := FALSE;
					dIn.MetaDataWriterReady := FALSE;
					dOut.StartOMSTest := FALSE;
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Initializing OMS test';
					
					dOut.StartOMSTest := TRUE; // send signal to Meta data writter to initialize 
					dOut.Zaber2Home := TRUE; // Home Zaber 2
					
					task.status.sequence := SEQUENCE_OMS_INIT;
				
				SEQUENCE_OMS_INIT:
					// start timeout timer
					task.internal.cmdTimeoutTimer.IN := TRUE;
					
					task.internal.homeZaberWaitTimer.IN := TRUE;
						
					IF task.internal.homeZaberWaitTimer.Q THEN // wait for zaber to home
						task.status.sequence := SEQUENCE_DONE;
					END_IF
									
					IF dIn.MetaDataWriterReady THEN
						dOut.StartOMSTest := FALSE;
						dOut.Zaber2Home := FALSE;
						dIn.MetaDataWriterReady := FALSE;
												
					ELSIF task.internal.cmdTimeoutTimer.Q THEN
						dOut.Zaber2Home := FALSE;
						dIn.MetaDataWriterReady := FALSE;
						dOut.StartOMSTest := FALSE;
						task.status.sequence := SEQUENCE_ERROR;
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					END_IF
				
			END_CASE
		
		STATE_CHECK_ZABER1_HOMED: 
			
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					// specific error message within subsequence
					dOut.Zaber1GetHomeStatus := FALSE;
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					// specific done message within subsequence TODO: make this work better/more intuitively
					dOut.Zaber1GetHomeStatus := FALSE;
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Checking Zaber Home status';
					
					// start timeout timer
					task.internal.cmdTimeoutTimer.IN := TRUE;
					
					dOut.Zaber1GetHomeStatus := TRUE;
				
					IF dIn.Zaber1Homed THEN
						dOut.Zaber1GetHomeStatus := FALSE;
						task.status.sequence := SEQUENCE_DONE;
					ELSIF task.internal.cmdTimeoutTimer.Q THEN
						dOut.Zaber1GetHomeStatus := FALSE;
						task.status.sequence := SEQUENCE_ERROR;
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					END_IF
				
				END_CASE
			
		STATE_CHECK_ZABER2_HOMED: 
			
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					// specific error message within subsequence
					dOut.Zaber2GetHomeStatus := FALSE;
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					// specific done message within subsequence TODO: make this work better/more intuitively
					dOut.Zaber2GetHomeStatus := FALSE;
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Checking Zaber Home status';
					
					// start timeout timer
					task.internal.cmdTimeoutTimer.IN := TRUE;
					
					dOut.Zaber2GetHomeStatus := TRUE;
				
					IF  dIn.Zaber2Homed THEN
						dOut.Zaber2GetHomeStatus := FALSE;
						task.status.sequence := SEQUENCE_DONE;
					ELSIF task.internal.cmdTimeoutTimer.Q THEN
						dOut.Zaber2GetHomeStatus := FALSE;
						task.status.sequence := SEQUENCE_ERROR;
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					END_IF
				
			END_CASE
			
			
		STATE_PASS_META_DATA:
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					// specific error message within subsequence
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					// specific done message within subsequence TODO: make this work better/more intuitively
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Passing Required Meta Data';
					
					
					task.status.sequence := SEQUENCE_DONE;
	
			END_CASE
		
		STATE_INIT_PIXEL_FRAMECAPTURE:
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					// specific error message within subsequence
			
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					// specific done message within subsequence TODO: make this work better/more intuitively
			
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'initializing pixel data for frame capture';
					
					// start timeout timer
					task.internal.cmdTimeoutTimer.IN := TRUE;
					
					IF task.internal.PLCOpen.parametersWritten THEN
						dOut.ActivePixel := task.parameters.initializePixelForFrame.activePixelIndex + 1;
						dOut.CurrentPowerWatts := UINT_TO_REAL(task.parameters.capturePixel.LaserParameters.startingPowerLevel) * task.parameters.capturePixel.LaserParameters.availableLaserPower_W / VFLCR_POWER_COMMAND_RESOLUTION ; // refer Manual pulse sub seq for calculation ( only 1 power level used for this test)
						dOut.TestType := task.parameters.capturePixel.TestType;
						task.status.sequence := SEQUENCE_DONE;
					ELSIF task.internal.cmdTimeoutTimer.Q THEN
					
						task.status.sequence := SEQUENCE_ERROR;
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					END_IF		
	
			END_CASE
			
		STATE_CAPTURE_FRAME:
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					// specific error message within subsequence
					dOut.CaptureFrame := FALSE;
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					// specific done message within subsequence TODO: make this work better/more intuitively
					dOut.CaptureFrame := FALSE;
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'CApturing Frame data';
										
					dOut.CaptureFrame := TRUE;
					
					IF dOut.CaptureFrameInstance = 10000 THEN
						dOut.CaptureFrameInstance := 1;
						task.status.sequence := SEQUENCE_WAIT_FRAME_CAPTURE;
					ELSE
						dOut.CaptureFrameInstance := dOut.CaptureFrameInstance + 1;
						task.status.sequence := SEQUENCE_WAIT_FRAME_CAPTURE;
					END_IF
//					dOut.ActivePixel := task.parameters.captureFrame.ActivePixel;
//					dOut.LaserParameters := task.parameters.captureFrame.LaserParameters;
						
	
				SEQUENCE_WAIT_FRAME_CAPTURE:
					
					// start timeout timer
					task.internal.cmdFrameCaptureTimer.IN := TRUE;
					
					IF dOut.CaptureFrameInstance = dIn.FrameCaptureInstanceResponse THEN
						dOut.CaptureFrame := FALSE;
						task.status.sequence := SEQUENCE_DONE;
						gVFLCR.status.frameCaptured := TRUE;
					ELSIF task.internal.cmdFrameCaptureTimer.Q THEN
						dOut.CaptureFrame := FALSE;
						task.status.sequence := SEQUENCE_ERROR;
						gVFLCR.status.frameCaptured := FALSE;
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					END_IF	
					
			END_CASE
						
		STATE_MOVE_ZABER1_CAM:
			CASE task.status.sequence OF
				SEQUENCE_ERROR:
					// specific error message within subsequence
					dOut.Zaber1MoveAbsolute := FALSE;
					dOut.Zaber1MoveRelative := FALSE;
					dOut.Zaber1GetPosFeedback := FALSE;
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
							
				SEQUENCE_DONE:
					// specific done message within subsequence TODO: make this work better/more intuitively
					dOut.Zaber1MoveAbsolute := FALSE;
					dOut.Zaber1MoveRelative := FALSE;
					dOut.Zaber1GetPosFeedback := FALSE;
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
							
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Moving Zaber and setting camera exposure';
					task.internal.pollingAppWaitTimer.IN := TRUE;
					
					dIn.Zaber1Position := 0.0; //Reset Flag
					
					// Creating more than 100ms app poll time delay for parameters to reach before command trigger
							
					IF task.parameters.adjustZaber1.ZaberMoveAbsolute  THEN
						dOut.Zaber1AbsolutePos_mm := task.parameters.adjustZaber1.ZaberAbsolutePos_mm ;
					ELSIF task.parameters.adjustZaber1.ZaberMoveRelative THEN
						dOut.Zaber1RelativePos_mm := task.parameters.adjustZaber1.ZaberRelativePos_mm;
					END_IF
					
					IF task.internal.pollingAppWaitTimer.Q THEN
						task.status.sequence := SEQUENCE_MOVE_ZABER1;
					END_IF	
				
				SEQUENCE_MOVE_ZABER1:
										
					// start timeout timer
					task.internal.cmdTimeoutTimer.IN := TRUE;

					task.internal.moveZaberWaitTimer.IN := TRUE;
					
					task.internal.cmdZaberOnWaitTimer.IN := TRUE;
										
					IF task.parameters.adjustZaber1.ZaberMoveAbsolute  THEN
						dOut.Zaber1MoveAbsolute := TRUE;
					ELSIF task.parameters.adjustZaber1.ZaberMoveRelative THEN
						dOut.Zaber1MoveRelative := TRUE;
					END_IF
					
					IF task.internal.cmdZaberOnWaitTimer.Q THEN
						dOut.Zaber1MoveAbsolute := FALSE;
						dOut.Zaber1MoveRelative := FALSE;
					END_IF
					
					IF task.internal.moveZaberWaitTimer.Q THEN
						dOut.Zaber1GetPosFeedback := TRUE;
					END_IF
					
					IF task.parameters.adjustZaber1.ZaberMoveAbsolute AND VF_COMMON_IsValueInRange(task.parameters.adjustZaber1.ZaberAbsolutePos_mm,0.1,dIn.Zaber1Position)  THEN
						dOut.Zaber1MoveAbsolute := FALSE;
						dOut.Zaber1MoveRelative := FALSE;
						dOut.Zaber1GetPosFeedback := FALSE;
						task.status.sequence := SEQUENCE_DONE;
					ELSIF task.parameters.adjustZaber1.ZaberMoveRelative AND task.internal.moveZaberWaitTimer.Q THEN
						dOut.Zaber1MoveAbsolute := FALSE;
						dOut.Zaber1MoveRelative := FALSE;
						dOut.Zaber1GetPosFeedback := FALSE;
						task.status.sequence := SEQUENCE_DONE;	
					ELSIF task.internal.cmdTimeoutTimer.Q THEN
						dOut.Zaber1MoveAbsolute := FALSE;
						dOut.Zaber1MoveRelative := FALSE;
						dOut.Zaber1GetPosFeedback := FALSE;
						task.status.sequence := SEQUENCE_ERROR;
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					END_IF
				
			END_CASE
			
			
			
		STATE_MOVE_ZABER2_CAM_EXPO:
			CASE task.status.sequence OF
				SEQUENCE_ERROR:
					// specific error message within subsequence
					dOut.Zaber2MoveAbsolute := FALSE;
					dOut.Zaber2MoveRelative := FALSE;
					dOut.Zaber2GetPosFeedback := FALSE;
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
							
				SEQUENCE_DONE:
					// specific done message within subsequence TODO: make this work better/more intuitively
					dOut.Zaber2MoveAbsolute := FALSE;
					dOut.Zaber2MoveRelative := FALSE;
					dOut.Zaber2GetPosFeedback := FALSE;
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
							
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Moving Zaber and setting camera exposure';
					task.internal.pollingAppWaitTimer.IN := TRUE;
					
					dIn.Zaber2Position := 0.0; //Reset Flag
					
					// Creating more than 100ms app poll time delay for parameters to reach before command trigger
							
					IF task.parameters.adjustZaber2AndExposure.ZaberMoveAbsolute  THEN
						dOut.Zaber2AbsolutePos_mm := task.parameters.adjustZaber2AndExposure.ZaberAbsolutePos_mm ;
						dOut.CameraExposure := task.parameters.adjustZaber2AndExposure.CameraExposure;
					ELSIF task.parameters.adjustZaber2AndExposure.ZaberMoveRelative THEN
						dOut.Zaber2RelativePos_mm := task.parameters.adjustZaber2AndExposure.ZaberRelativePos_mm;
						dOut.CameraExposure := task.parameters.adjustZaber2AndExposure.CameraExposure;
					END_IF
					
					IF task.internal.pollingAppWaitTimer.Q THEN
						task.status.sequence := SEQUENCE_MOVE_ZABER2;
					END_IF	
				
				SEQUENCE_MOVE_ZABER2:
										
					// start timeout timer
					task.internal.cmdTimeoutTimer.IN := TRUE;

					task.internal.moveZaberWaitTimer.IN := TRUE;
					
					task.internal.cmdZaberOnWaitTimer.IN := TRUE;
										
					IF task.parameters.adjustZaber2AndExposure.ZaberMoveAbsolute  THEN
						dOut.Zaber2MoveAbsolute := TRUE;
					ELSIF task.parameters.adjustZaber2AndExposure.ZaberMoveRelative THEN
						dOut.Zaber2MoveRelative := TRUE;
					END_IF
					
					IF task.internal.cmdZaberOnWaitTimer.Q THEN
						dOut.Zaber2MoveAbsolute := FALSE;
						dOut.Zaber2MoveRelative := FALSE;
					END_IF
					
					IF task.internal.moveZaberWaitTimer.Q THEN
						dOut.Zaber2GetPosFeedback := TRUE;
					END_IF
					
					IF task.parameters.adjustZaber2AndExposure.ZaberMoveAbsolute AND VF_COMMON_IsValueInRange(task.parameters.adjustZaber2AndExposure.ZaberAbsolutePos_mm,0.1,dIn.Zaber2Position)  THEN
						dOut.Zaber2MoveAbsolute := FALSE;
						dOut.Zaber2MoveRelative := FALSE;
						dOut.Zaber2GetPosFeedback := FALSE;
						task.status.sequence := SEQUENCE_DONE;
					ELSIF task.parameters.adjustZaber2AndExposure.ZaberMoveRelative AND task.internal.moveZaberWaitTimer.Q THEN
						dOut.Zaber2MoveAbsolute := FALSE;
						dOut.Zaber2MoveRelative := FALSE;
						dOut.Zaber2GetPosFeedback := FALSE;
						task.status.sequence := SEQUENCE_DONE;	
					ELSIF task.internal.cmdTimeoutTimer.Q THEN
						dOut.Zaber2MoveAbsolute := FALSE;
						dOut.Zaber2MoveRelative := FALSE;
						dOut.Zaber2GetPosFeedback := FALSE;
						task.status.sequence := SEQUENCE_ERROR;
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					END_IF
				
			END_CASE
			
			
		STATE_PASS_TEST_COMPLETE:
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					dOut.OMSTestComplete := FALSE;
					// specific error message within subsequence
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					dOut.OMSTestComplete := FALSE;
					// specific done message within subsequence TODO: make this work better/more intuitively
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Passing Complete handshake signal';
					
					// start timeout timer
					task.internal.cmdTimeoutTimer.IN := TRUE;
					
					dOut.OMSTestComplete := TRUE;
					
					IF dIn.TestCompleteProcessed THEN
						dOut.OMSTestComplete := FALSE;
						task.status.sequence := SEQUENCE_DONE;
					ELSIF task.internal.cmdTimeoutTimer.Q THEN
						dOut.OMSTestComplete := FALSE;
						task.status.sequence := SEQUENCE_ERROR;
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					END_IF		
				
			END_CASE
			
		STATE_PASS_TEST_ABORTED:
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					dOut.OMSTestAborted := FALSE;
					// specific error message within subsequence
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					dOut.OMSTestAborted := FALSE;
					// specific done message within subsequence TODO: make this work better/more intuitively
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Passing Aborted handshake signal';
					
					// start timeout timer
					task.internal.cmdTimeoutTimer.IN := TRUE;
					
					dOut.OMSTestAborted := TRUE;
										
					IF dIn.TestAbortProcessed THEN
						dOut.OMSTestAborted := FALSE;
						task.status.sequence := SEQUENCE_DONE;
					ELSIF task.internal.cmdTimeoutTimer.Q THEN
						dOut.OMSTestAborted := FALSE;
						task.status.sequence := SEQUENCE_ERROR;
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					END_IF
	
			END_CASE
			
		STATE_PASS_TEST_ABORTED_NO_ACK:
			
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					dOut.OMSTestAborted := FALSE;
					// specific error message within subsequence
					task.internal.PLCOpen.status := VFLCR_ERROR;
					task.status.state := STATE_READY;
					
				SEQUENCE_DONE:
					dOut.OMSTestAborted := FALSE;
					// specific done message within subsequence TODO: make this work better/more intuitively
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Passing Aborted handshake signal with no ack';
					task.internal.pollingAppWaitTimer.IN := TRUE;
					
					// start timeout timer
					task.internal.cmdTimeoutTimer.IN := TRUE;
					
					dOut.OMSTestAborted := TRUE;
					
					IF task.internal.pollingAppWaitTimer.Q THEN
						task.status.sequence := SEQUENCE_OMS_ABORTED;
					ELSIF task.internal.cmdTimeoutTimer.Q THEN
						dOut.OMSTestAborted := FALSE;
						task.status.sequence := SEQUENCE_ERROR;
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401, task.status.statusMessage);
					END_IF
				
				SEQUENCE_OMS_ABORTED:

					dOut.OMSTestAborted := FALSE;
					task.status.sequence := SEQUENCE_DONE;

			END_CASE
			
			
		ELSE
		
	END_CASE
	
	
	///////////////////////////////////////////////////////////////
	//Update Statuses
	///////////////////////////////////////////////////////////////
	
	dOut.MachineName := gConfiguration.machineIdentity.machineName;
	dOut.FactoryName := gConfiguration.machineIdentity.factoryName;
	dOut.PyroMultiplicationFactor := Configuration.PyroMultiplicationFactorHmi;
	dOut.ComPortNumberZaber1 := Configuration.ComPortNumberZaber1Hmi;
	dOut.CurrentLUTID := task.status.LutIdHmi;//TODO - an error check here that some racks arent different!
	//	dOut.CurrentPowerStep := gMachine.laserControl.interface.systemStatus.manualPulse_CurrentPowerStep;
	task.parameters.capturePixel.TestType := gManualPulseTypeSelected;
	dOut.TestType := task.parameters.capturePixel.TestType;
	// Laser Calib App version string
	task.internal.appVersionTempString := USINT_TO_STRING(dIn.AppMajorVersion);
	task.status.AppVersion := 'v';
	task.status.AppVersion := CONCAT(task.status.AppVersion,task.internal.appVersionTempString);
	task.status.AppVersion := CONCAT(task.status.AppVersion,'.');
	task.internal.appVersionTempString := USINT_TO_STRING(dIn.AppMinorVersion);
	task.status.AppVersion := CONCAT(task.status.AppVersion,task.internal.appVersionTempString);
	task.status.AppVersion := CONCAT(task.status.AppVersion,'.');
	task.internal.appVersionTempString := USINT_TO_STRING(dIn.AppPatchVersion);
	task.status.AppVersion := CONCAT(task.status.AppVersion,task.internal.appVersionTempString);
	
	IF LEN(dOut.MachineIdentity) = 0 THEN
		
		//set machine identity same as gen2..
		brsitoa(gConfiguration.machineIdentity.factoryNumber, ADR(strFactoryNumber));
		brsitoa(gConfiguration.machineIdentity.machineNumber, ADR(strMachineNumber));
		
		dOut.MachineIdentity := '[';
		brsstrcat(ADR(dOut.MachineIdentity), ADR(strFactoryNumber));
		brsstrcat(ADR(dOut.MachineIdentity), ADR(']'));
		brsstrcat(ADR(dOut.MachineIdentity), ADR(dOut.FactoryName));
		brsstrcat(ADR(dOut.MachineIdentity), ADR(':'));
		brsstrcat(ADR(dOut.MachineIdentity), ADR('['));
		brsstrcat(ADR(dOut.MachineIdentity), ADR(strMachineNumber));
		brsstrcat(ADR(dOut.MachineIdentity), ADR(']'));
		brsstrcat(ADR(dOut.MachineIdentity), ADR(dOut.MachineName));
		
	END_IF
	
//	// TODO: set up readiness - probably using some of these statuses
//	dOut.ReadyToTest := dOut.ConfigValid AND
//						stateAllTrue(gVFLCR.status.manualModeEnabled, FALSE) AND
//						stateAllTrue(gVFLCR.status.dcPowerEnabled, FALSE) AND
//						stateAllTrue(gVFLCR.status.laserEmissionEnabled, FALSE) AND
//						stateAllTrue(gVFLCR.status.laserPowerEnabled, FALSE) AND
//						stateAllTrue(gVFLCR.status.modulationEnabled, FALSE) AND
//						(dIn.TestPixel <> 0);
//	
//	// If the configured test is a calibration, additionally require that the system have linear LUTs loaded to begin the test
//	IF (dIn.TestType = TEST_TYPE_CALIBRATION) THEN
//		dOut.ReadyToTest := dOut.ReadyToTest AND (gVFLCR.status.calibrationLUT[0] = 99999);
//	END_IF
	
	///////////////////////////////////////////////////////////////
	//Call all PLCOpen function blocks
	///////////////////////////////////////////////////////////////
	
	task.internal.cmdTimeoutTimer.PT := T#25s;
	task.internal.cmdTimeoutTimer();
	task.internal.cmdTimeoutTimer.IN := FALSE;
	
	task.internal.cmdFrameCaptureTimer.PT := T#5s;
	task.internal.cmdFrameCaptureTimer();
	task.internal.cmdFrameCaptureTimer.IN := FALSE;
	
	task.internal.heartbeatTimer.PT := T#1s;
	task.internal.heartbeatTimer();
	task.internal.heartbeatTimer.IN := FALSE;
	
	task.internal.resultsPollingTimer.PT := T#60s;
	task.internal.resultsPollingTimer();
	task.internal.resultsPollingTimer.IN := FALSE;
	
	task.internal.resultsTimeoutTimer.PT := T#15m; // 15 minutes should be long enough
	task.internal.resultsTimeoutTimer();
	task.internal.resultsTimeoutTimer.IN := FALSE;
						
	task.internal.homeZaberWaitTimer.PT := T#15s;
	task.internal.homeZaberWaitTimer();
	task.internal.homeZaberWaitTimer.IN := FALSE;
	
	task.internal.moveZaberWaitTimer.PT := T#5s;
	task.internal.moveZaberWaitTimer();
	task.internal.moveZaberWaitTimer.IN := FALSE;
	
	task.internal.cmdZaberOnWaitTimer.PT := T#2s;
	task.internal.cmdZaberOnWaitTimer();
	task.internal.cmdZaberOnWaitTimer.IN := FALSE;
	
	task.internal.pollingAppWaitTimer.PT := T#300ms;
	task.internal.pollingAppWaitTimer();
	task.internal.pollingAppWaitTimer.IN := FALSE;
	
	task.internal.atnPLCOpenCommand();
	task.internal.atnPLCOpenCommand.Execute := FALSE;
	
	task.internal.atnPLCOpenCommandParameters();
	task.internal.atnPLCOpenCommandParameters.Execute := FALSE;
	
	
	///////////////////////////////////////////////////////////////
	//Reset all commands to ensure they don't get buffered
	///////////////////////////////////////////////////////////////
	brsmemset(ADR(task.command), 0, SIZEOF(task.command));
	task.internal.newCommand := 0;
	
	logStateChange_0.LoggerName := 'App';
	logStateChange_0.ModuleName := Name;
	logStateChange_0.State 		:= task.status.state;
	logStateChange_0.StateName 	:= task.status.statusMessage;
	logStateChange_0();
	
	logSeqChange_0.LoggerName 	:= 'App';
	logSeqChange_0.ModuleName 	:= Name;
	logSeqChange_0.State		:= task.status.sequence;
	logSeqChange_0.StateName	:= task.status.statusMessage;
	logSeqChange_0();
	
	//Keep track of the previous state
	task.internal.previousState := task.status.state;
	
	
	///////////////////////////////////////////////////////////////
	//Simulation
	///////////////////////////////////////////////////////////////
	IF gSimulation THEN
		SimulateIO;
	END_IF
	
	
END_PROGRAM

PROGRAM _EXIT
	 
END_PROGRAM

