
ACTION ReadInputIO:
	
	IF NOT(task.status.rackIgnored) THEN
		
		// -----------------
		// Version Info
		// -----------------
		IO.ai.FPGAVersion :=  UDINT_TO_UINT(SHR(IO.raw.iFPGARevision, 16));
		IO.ai.FPGARevision := UDINT_TO_UINT(IO.raw.iFPGARevision AND 16#FFFF);
		
		IO.ai.SoftwareVersion :=  UDINT_TO_UINT(SHR(IO.raw.iSoftwareRevision, 16));
		IO.ai.SoftwareRevision := UDINT_TO_UINT(IO.raw.iSoftwareRevision AND 16#FFFF);
		
		// -----------------
		// Operation Status
		// -----------------
		IO.di.LUTFiles_Deleted := BIT_TST(IO.raw.iOperationStatus, 0);
		IO.di.LaserControlFiles_Deleted := BIT_TST(IO.raw.iOperationStatus, 1);
		IO.di.LUTFiles_LoadSuccess := BIT_TST(IO.raw.iOperationStatus, 2);
		IO.di.LUTFiles_LoadFailure := BIT_TST(IO.raw.iOperationStatus, 3);
		
		IO.di.ModeEnabled_MANUAL := BIT_TST(IO.raw.iOperationStatus, 6);
		IO.di.ModeEnabled_AUTO := BIT_TST(IO.raw.iOperationStatus, 7);
		IO.di.LayerOpen := BIT_TST(IO.raw.iOperationStatus, 8);
		IO.di.LayerAborted := BIT_TST(IO.raw.iOperationStatus, 9);
		IO.di.LayerClosed := BIT_TST(IO.raw.iOperationStatus, 10);
		IO.di.LayerError := BIT_TST(IO.raw.iOperationStatus, 11);
		
		IO.di.SystemWatchdogFailure := BIT_TST(IO.raw.iOperationStatus, 14);
		IO.di.SystemOperational := BIT_TST(IO.raw.iOperationStatus, 15);
		
		// -----------------
		// System Status
		// -----------------
		IO.di.HeartbeatError[0] := BIT_TST(IO.raw.iSystemStatus, 0);
		//		IO.di.ChillerWarning := NOT BIT_TST(IO.raw.iSystemStatus, 1); // HACK: Inverted to account for VF-LCR board issue
		//		IO.di.ChillerAlarm := NOT BIT_TST(IO.raw.iSystemStatus, 2); // HACK: Inverted to account for VF-LCR board issue
		IO.di.LaserSafetyInterlockOK := BIT_TST(IO.raw.iSystemStatus, 3);
		
		bitIndex := 4; // HACK: Inverted all four status inputs to account for VF-LCR board issue
		FOR index := 0 TO VFLCR_MAI_POWER_SUPPLIES DO
			IO.di.LaserPowerSupplyDCOK[index] := NOT BIT_TST(IO.raw.iSystemStatus, bitIndex);
			IO.di.LaserPowerSupplyACLow[index] := NOT BIT_TST(IO.raw.iSystemStatus, bitIndex + 1);
			IO.di.LaserPowerSupplyOverTemp[index] := NOT BIT_TST(IO.raw.iSystemStatus, bitIndex + 2);
			IO.di.LaserPowerSupplyFanFailure[index] := NOT BIT_TST(IO.raw.iSystemStatus, bitIndex + 3);
			bitIndex := bitIndex + 4;
		END_FOR
		
		// LE FPGA Heartbeat Error
		IO.di.HeartbeatError[1] := BIT_TST(IO.raw.iSystemStatus, 17);
		IO.di.HeartbeatError[2] := BIT_TST(IO.raw.iSystemStatus, 18);
		IO.di.HeartbeatError[3] := BIT_TST(IO.raw.iSystemStatus, 19);
		
		// -----------------
		// Laser Status
		// -----------------
		
		FOR index := 0 TO VFLCR_MAI_LASERS DO
			bitIndex := index;
			IO.di.LaserFatalError[index] := BIT_TST(IO.raw.iLaserFatalError, bitIndex);
			IO.di.LaserWatchdogError[index] := BIT_TST(IO.raw.iLaserWatchdogError, bitIndex);
			
			// Raycus and nLight lasers handle the Ready/Error output differently.
			CASE (Configuration.laserHardware) OF
				LH_Raycus_300W:
					IO.di.LaserReady[index] := BIT_TST(IO.raw.iLaserReady_Error, bitIndex);
				LH_nLight_525W:
					IO.di.LaserReady[index] := NOT BIT_TST(IO.raw.iLaserReady_Error, bitIndex);
				ELSE
					IO.di.LaserReady[index] := FALSE;
			END_CASE
			
			IO.di.LaserControlSystemPowered[index] := BIT_TST(IO.raw.iLaserControlPowerEnabled, bitIndex);
			IO.di.LaserMainPowerStarted[index] := BIT_TST(IO.raw.iLaserMainPowerEnabled, bitIndex);
			IO.di.LaserEmissionOn[index] := BIT_TST(IO.raw.iLaserEmissionEnabled, bitIndex);
			
			// Only read into selected laser index if it's one of these indexes
			IF index = task.internal.parameters.SelectedLaserIndex THEN
				
				// Capture the raw analog input value (0..65535) representing laser power output for the selected laser.
				IO.ai.LaserPowerMonitor[index] := UDINT_TO_UINT(IO.raw.iManualModeLaserPower);
				
			END_IF
			
		END_FOR
		
		IF (task.internal.parameters.SelectedLaserIndex >= 0) AND (task.internal.parameters.SelectedLaserIndex < VFLCR_NUM_LASERS) THEN
			IO.ai.SelectedLaser_DMAStatus := IO.ai.DMAStatus[task.internal.parameters.SelectedLaserIndex];
			IO.ai.SelectedLaser_DMATrajectory := IO.ai.DMACurrentTrajectory[task.internal.parameters.SelectedLaserIndex];
			IO.ai.SelectedLaser_DMALastPacket := IO.ai.DMALastPacketPosition[task.internal.parameters.SelectedLaserIndex];
		ELSE
			IO.ai.SelectedLaser_DMAStatus := 0;
			IO.ai.SelectedLaser_DMATrajectory := 0;
			IO.ai.SelectedLaser_DMALastPacket := 0;
		END_IF
		
		
		
		
		// Simulation
		IF gSimulation THEN
			SimulateIO;	
		END_IF 
		
	ELSE
		
		// Do nothing, as was done in Gen 2. TODO: Should we read inputs anyway? Reset relevant statuses? Handle simulation?
		
	END_IF
	
	
	
	
	
END_ACTION

ACTION WriteOutputIO:
	
	IF NOT(task.status.rackIgnored) THEN
		
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
		IF (IO.do.Delete_LUTFiles) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 0);
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 0);
		END_IF
		
		IF (IO.do.Delete_LaserControlFiles) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 1);
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 1);
		END_IF
		
		IF (IO.do.Transfer_LUTFiles) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 2);
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 2);
		END_IF
		
		IF (IO.do.Transfer_LaserControlFiles) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 3);
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 3);
		END_IF
		
		IF (IO.do.EnableMode_MANUAL) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 6); // Set manual mode
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 7); // Clear auto mode
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 6); // Clear manual mode
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 7); // Set auto mode
		END_IF
		
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
		
		IF (IO.do.ClearLaserErrors) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 13);
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 13);
		END_IF
		
		IF (IO.do.Transfer_FirmwareUpdate) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 14);
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 14);
		END_IF
		
		IF (IO.do.RequestSystemReboot) THEN
			IO.raw.oOperationControl := BIT_SET(IO.raw.oOperationControl, 15);
		ELSE
			IO.raw.oOperationControl := BIT_CLR(IO.raw.oOperationControl, 15);
		END_IF
		
		// -----------------
		// System Control
		// -----------------
//		IF (IO.do.RemoteChillerStart) THEN
//			IO.raw.oSystemControl := BIT_SET(IO.raw.oSystemControl, 0);
//		ELSE
//			IO.raw.oSystemControl := BIT_CLR(IO.raw.oSystemControl, 0);
//		END_IF
		
		FOR index := 0 TO VFLCR_MAI_POWER_SUPPLIES DO
			bitIndex := index + 1;
			IF (IO.do.LaserPowerSupply[index]) THEN
				IO.raw.oSystemControl := BIT_SET(IO.raw.oSystemControl, bitIndex);
			ELSE
				IO.raw.oSystemControl := BIT_CLR(IO.raw.oSystemControl, bitIndex);
			END_IF
		END_FOR
		
		// -----------------
		// Laser Control
		// -----------------
		FOR index := 0 TO VFLCR_MAI_LASERS DO
			bitIndex := index;
			
			IF (NOT Configuration.ignoreLaser[index]) THEN
				IO.raw.oLaserEnable := BIT_SET(IO.raw.oLaserEnable, bitIndex);
			ELSE
				IO.raw.oLaserEnable := BIT_CLR(IO.raw.oLaserEnable, bitIndex);
			END_IF
			
			IF (IO.do.EnableLaserPower[index]) THEN
				IO.raw.oEnableLaserMainPower := BIT_SET(IO.raw.oEnableLaserMainPower, bitIndex);
			ELSE
				IO.raw.oEnableLaserMainPower := BIT_CLR(IO.raw.oEnableLaserMainPower, bitIndex);
			END_IF
			
			IF (IO.do.EnableGuideLaser[index]) THEN
				IO.raw.oEnableGuideLaser := BIT_SET(IO.raw.oEnableGuideLaser, bitIndex);
			ELSE
				IO.raw.oEnableGuideLaser := BIT_CLR(IO.raw.oEnableGuideLaser, bitIndex);
			END_IF
			
			IF (IO.do.EnableLaserEmissionControl[index]) THEN
				IO.raw.oEnableLaserEmission := BIT_SET(IO.raw.oEnableLaserEmission, bitIndex);
			ELSE
				IO.raw.oEnableLaserEmission := BIT_CLR(IO.raw.oEnableLaserEmission, bitIndex);
			END_IF
			
			IF (IO.do.LaserResetError[index]) THEN
				IO.raw.oResetLaserErrors := BIT_SET(IO.raw.oResetLaserErrors, bitIndex);
			ELSE
				IO.raw.oResetLaserErrors := BIT_CLR(IO.raw.oResetLaserErrors, bitIndex);
			END_IF
			
		END_FOR
		
		IF (task.internal.parameters.SelectedLaserIndex >= 0) AND (task.internal.parameters.SelectedLaserIndex < VFLCR_NUM_LASERS) THEN
		
			IO.raw.oManualLaserCurrentSetpoint := SHL(IO.ao.LaserPowerLevelSP[task.internal.parameters.SelectedLaserIndex], 8);
			
		ELSE
			
			IO.raw.oManualLaserCurrentSetpoint := 0;
			
		END_IF
		
		
		//CONTINUOUS MANUAL MODE FOR LASER POWER THERMAL TESTING ONLY
		IF gVFLCR.status.manualContinuousModeEnabled THEN
			writeContinuousModeIO;
		ELSE
			task.CMM.STATE_ON_OFF := CMM_ONOFF_STATE_IDLE;
			task.CMM.STATE := CMM_STATE_IDLE;
			IO.raw.oManualLaserOperation.7 := 0;

			// The bits/bytes of ManualLaserOperation correspond to 2#LLLLLLLL_LLLLLLLL_TTTTTTTT_NNNNNNNN
			// where L is pulse length, T is pulse trigger, and N is laser number.
			// Some bits technically aren't being used, but including them makes the variable correspondence more clear.
			IO.raw.oManualLaserOperation := SHL(UINT_TO_UDINT(IO.do.ManualPulseLength), 16) OR IO.do.ManualPulseTrigger OR USINT_TO_DINT(IO.do.ManualPulseLaserNumber);
		END_IF
		
	ELSE
		
		// -----------------
		// Shut down racks that are not in use.
		// -----------------
		ShutDownIO;
		
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



ACTION writeContinuousModeIO:
	
	//THESE ARE THE REGISTER ADDRESSES TO SET PULSE PERIOD OF EACH LASER
	task.CMM.laserManualContinuousPeriodAdr[0] := 16#0000_0144;
	task.CMM.laserManualContinuousPeriodAdr[1] := 16#0000_0344;
	task.CMM.laserManualContinuousPeriodAdr[2] := 16#0000_0544;
	task.CMM.laserManualContinuousPeriodAdr[3] := 16#0000_0744;	
	task.CMM.laserManualContinuousPeriodAdr[4] := 16#0000_0944;
	task.CMM.laserManualContinuousPeriodAdr[5] := 16#0000_0B44;
	task.CMM.laserManualContinuousPeriodAdr[6] := 16#0000_0D44;
	task.CMM.laserManualContinuousPeriodAdr[7] := 16#0000_0F44;
	task.CMM.laserManualContinuousPeriodAdr[8] := 16#0000_1144;
	task.CMM.laserManualContinuousPeriodAdr[9] := 16#0000_1344;
	task.CMM.laserManualContinuousPeriodAdr[10] := 16#0000_1544;
	task.CMM.laserManualContinuousPeriodAdr[11] := 16#0000_1744;
	task.CMM.laserManualContinuousPeriodAdr[12] := 16#0000_1944;
	task.CMM.laserManualContinuousPeriodAdr[13] := 16#0000_1B44;
	task.CMM.laserManualContinuousPeriodAdr[14] := 16#0000_1D44;
	task.CMM.laserManualContinuousPeriodAdr[15] := 16#0000_1F44;
	task.CMM.laserManualContinuousPeriodAdr[16] := 16#0000_2144;
	task.CMM.laserManualContinuousPeriodAdr[17] := 16#0000_2344;
	task.CMM.laserManualContinuousPeriodAdr[18] := 16#0000_2544;
	task.CMM.laserManualContinuousPeriodAdr[19] := 16#0000_2744;
	task.CMM.laserManualContinuousPeriodAdr[20] := 16#0000_2944;

	// OUT OF RANGE CHECK FOR DUTY CYCLE
	IF task.CMM.DUTY_CYCLE_ALL_LASERS > 255 THEN
		task.CMM.DUTY_CYCLE_ALL_LASERS := 255;
	END_IF
	
	// OUT OF RANGE CHECK FOR LUT INDEX 
	IF task.CMM.MANUAL_LASER_LUT_INDEX > 255 THEN
		task.CMM.MANUAL_LASER_LUT_INDEX := 255;
	END_IF
	
	// OUT OF RANGE CHECK FOR PWM PERIOD
	FOR i:= 0 TO i <= VFLCR_MAI_LASERS BY 1 DO
		IF task.CMM.requestedContinuousPeriod[i] > 255 THEN
			task.CMM.requestedContinuousPeriod[i] := 255;
		END_IF
	END_FOR	
	
	//SET MANUAL LASER LUT INDEX FOR ALL LASERS
	IO.raw.oManualLaserCurrentSetpoint.8 := task.CMM.MANUAL_LASER_LUT_INDEX.0;
	IO.raw.oManualLaserCurrentSetpoint.9 := task.CMM.MANUAL_LASER_LUT_INDEX.1;
	IO.raw.oManualLaserCurrentSetpoint.10 := task.CMM.MANUAL_LASER_LUT_INDEX.2;
	IO.raw.oManualLaserCurrentSetpoint.11 := task.CMM.MANUAL_LASER_LUT_INDEX.3;
	IO.raw.oManualLaserCurrentSetpoint.12 := task.CMM.MANUAL_LASER_LUT_INDEX.4;
	IO.raw.oManualLaserCurrentSetpoint.13 := task.CMM.MANUAL_LASER_LUT_INDEX.5;
	IO.raw.oManualLaserCurrentSetpoint.14 := task.CMM.MANUAL_LASER_LUT_INDEX.6;
	IO.raw.oManualLaserCurrentSetpoint.15 := task.CMM.MANUAL_LASER_LUT_INDEX.7;
	
	//SET THE DUTY CYCLE BASE ON AN 8 BIT INTEGER
	IO.raw.oManualLaserCurrentSetpoint.16 := task.CMM.DUTY_CYCLE_ALL_LASERS.0;
	IO.raw.oManualLaserCurrentSetpoint.17 := task.CMM.DUTY_CYCLE_ALL_LASERS.1;
	IO.raw.oManualLaserCurrentSetpoint.18 := task.CMM.DUTY_CYCLE_ALL_LASERS.2;
	IO.raw.oManualLaserCurrentSetpoint.19 := task.CMM.DUTY_CYCLE_ALL_LASERS.3;
	IO.raw.oManualLaserCurrentSetpoint.20 := task.CMM.DUTY_CYCLE_ALL_LASERS.4;
	IO.raw.oManualLaserCurrentSetpoint.21 := task.CMM.DUTY_CYCLE_ALL_LASERS.5;
	IO.raw.oManualLaserCurrentSetpoint.22 := task.CMM.DUTY_CYCLE_ALL_LASERS.6;
	IO.raw.oManualLaserCurrentSetpoint.23 := task.CMM.DUTY_CYCLE_ALL_LASERS.7;
	
	
	//ALL LASERS ENABLED ALWAYS(31). USE PWM TO TURN SPECIFIC LASERS ON OR OFF
	IO.raw.oManualLaserOperation.0 := 1;
	IO.raw.oManualLaserOperation.1 := 1;
	IO.raw.oManualLaserOperation.2 := 1;
	IO.raw.oManualLaserOperation.3 := 1;
	IO.raw.oManualLaserOperation.4 := 1;
	
	//ENABLE MANUAL CONTINUOUS MODE
	IO.raw.oManualLaserOperation.7 := 1;
	
	
	CASE task.CMM.STATE OF
		
		CMM_STATE_IDLE:
			
			//DONT REQUEST WRITE OR READ ON ANY REGISTER
			IO.raw.oIndirectRegisterRequestAddress.30 := 0;
			IO.raw.oIndirectRegisterRequestAddress.31 := 0;
			
			//USER INPUT TO PARAMETERIZE CONTINUOUS PERIOD
			IF task.CMM.setContinuousPeriod THEN
				task.CMM.setContinuousPeriod := FALSE;
				task.CMM.allContinuousPeriodSet := FALSE;
				task.CMM.STOP_PULSE := TRUE;
				ii := 0; //start at laser 0
				task.CMM.STATE := CMM_STATE_CHECK_LASER_COUNT;
			END_IF
		
		CMM_STATE_CHECK_LASER_COUNT:
			
			//CHECK IF THE LASER INDEX IS VALID FOR THIS RACK
			IF ii <= VFLCR_MAI_LASERS THEN
				IF NOT(Configuration.ignoreLaser[ii]) THEN
					task.CMM.STATE := CMM_STATE_COPY_ADDRESS;
				ELSE
					ii := ii + 1;	
				END_IF
			ELSE
				task.CMM.STATE := CMM_STATE_DONE_WRITE;
			END_IF
				
		CMM_STATE_COPY_ADDRESS:
			
			//COPY THE VALUE WE WANT FOR ~THIS~ LASERS CONTINUOUS MANUAL FIRING PERIOD (0-255)
			IO.raw.oIndirectRegisterRequestData := task.CMM.requestedContinuousPeriod[ii];
			
			//COPY THE ADDRESS FOR THE LASER WE WANT TO PARAMETERIZE
			IO.raw.oIndirectRegisterRequestAddress := task.CMM.laserManualContinuousPeriodAdr[ii];
			task.CMM.STATE := CMM_STATE_WRITE_PARAMETER;
			
		CMM_STATE_WRITE_PARAMETER:
			
			//ACTIVATE WRITE
			IO.raw.oIndirectRegisterRequestAddress.30 := 1;
			IO.raw.oIndirectRegisterRequestAddress.31 := 1;
			
			task.CMM.STATE := CMM_STATE_VERIFY_PARAMETER;
			
		CMM_STATE_VERIFY_PARAMETER:
			
			task.CMM.responseTimeout.IN := TRUE;
			task.CMM.responseTimeout.PT := T#10s ;
			
			//IF (RESPONSE = REQUEST) THEN WRITE COMPLETE
			IF IO.raw.iIndirectRegisterResponseData = IO.raw.oIndirectRegisterRequestData THEN
				
				task.CMM.actualContinuousPeriod[ii] := IO.raw.iIndirectRegisterResponseData;
				
				//DEACTIVATE
				IO.raw.oIndirectRegisterRequestAddress.30 := 0;
				IO.raw.oIndirectRegisterRequestAddress.31 := 0;
				
				//NEXT LASER
				ii := ii + 1;	
				task.CMM.STATE := CMM_STATE_CHECK_LASER_COUNT;
				
			ELSIF task.CMM.responseTimeout.Q THEN
				
				//DEACTIVATE
				IO.raw.oIndirectRegisterRequestAddress.30 := 0;
				IO.raw.oIndirectRegisterRequestAddress.31 := 0;
				
				task.CMM.STOP_PULSE := TRUE;
				task.CMM.STATE := CMM_STATE_IDLE;
				
				
			END_IF	
				
				
		CMM_STATE_DONE_WRITE:
			task.CMM.allContinuousPeriodSet := TRUE;
			task.CMM.STATE := CMM_STATE_IDLE;
		
	END_CASE
	
	//TO STOP PULSING THE GO CODE
	IF task.CMM.STOP_PULSE OR task.CMM.overTempTimer.Q THEN
		task.CMM.STOP_PULSE := FALSE;
		task.CMM.START_PULSE := FALSE;
		//IO.raw.oEnableLaserEmission := 0;
		IO.raw.oManualLaserOperation.7 := 0; // Disable Laser Continous mode for a scan cycle
		task.CMM.STATE_ON_OFF := CMM_ONOFF_STATE_IDLE;
	END_IF
	
	//PULSE EVERY 5 SECONDS
	CASE task.CMM.STATE_ON_OFF OF
		
		CMM_ONOFF_STATE_IDLE:
			
			IO.raw.oManualLaserOperation.8 := 0;
			IO.raw.oManualLaserOperation.9 := 0;
			IO.raw.oManualLaserOperation.10 := 0;
			IO.raw.oManualLaserOperation.11 := 0;
			IO.raw.oManualLaserOperation.12 := 0;
			IO.raw.oManualLaserOperation.13 := 0;
			IO.raw.oManualLaserOperation.14 := 0;
			IO.raw.oManualLaserOperation.15 := 0;
			
			IF task.CMM.START_PULSE THEN
				task.CMM.START_PULSE := FALSE;
				task.CMM.STATE_ON_OFF := CMM_ONOFF_STATE_ON;			
			END_IF	
		
		CMM_ONOFF_STATE_ON:
			task.CMM.pulseTimerOnOFF.IN := TRUE;
			task.CMM.pulseTimerOnOFF.PT := T#5s ;
				
			IO.raw.oManualLaserOperation.8 := 0;
			IO.raw.oManualLaserOperation.9 := 0;
			IO.raw.oManualLaserOperation.10 := 0;
			IO.raw.oManualLaserOperation.11 := 0;
			IO.raw.oManualLaserOperation.12 := 0;
			IO.raw.oManualLaserOperation.13 := 1;
			IO.raw.oManualLaserOperation.14 := 1;
			IO.raw.oManualLaserOperation.15 := 0;
			
			IF task.CMM.pulseTimerOnOFF.Q THEN
				task.CMM.pulseTimerOnOFF.IN := FALSE;
				task.CMM.STATE_ON_OFF := CMM_ONOFF_STATE_OFF;
			END_IF
		
		CMM_ONOFF_STATE_OFF:
		
			task.CMM.pulseTimerOnOFF.IN := TRUE;
			task.CMM.pulseTimerOnOFF.PT := T#5s ;
				
			IO.raw.oManualLaserOperation.8 := 0;
			IO.raw.oManualLaserOperation.9 := 0;
			IO.raw.oManualLaserOperation.10 := 0;
			IO.raw.oManualLaserOperation.11 := 0;
			IO.raw.oManualLaserOperation.12 := 0;
			IO.raw.oManualLaserOperation.13 := 0;
			IO.raw.oManualLaserOperation.14 := 0;
			IO.raw.oManualLaserOperation.15 := 0;
			
			IF task.CMM.pulseTimerOnOFF.Q THEN
				task.CMM.pulseTimerOnOFF.IN := FALSE;
				task.CMM.STATE_ON_OFF := CMM_ONOFF_STATE_ON;
			END_IF
		
	END_CASE
	

	
	
	


	
	// CAPTURE IMAGE EVERY FEW MINS IF APP CONNECTED
	//IF stateAllTrue(gVFLCR.status.heartbeatLaserCalibrationAppOk,FALSE) THEN
	//	task.CMM.captureImageTimer.IN := TRUE;
	//	task.CMM.captureImageTimer.PT := T#30m ;
	//END_IF	
	
	//IF stateAllTrue(gVFLCR.status.heartbeatLaserCalibrationAppOk,FALSE) AND task.CMM.captureImageTimer.Q THEN
	//	task.CMM.command.Command := gVFLCR.command.captureFrame;
	//	task.CMM.command.Execute := TRUE;
	//	task.CMM.command();
		
	//	task.CMM.captureImageTimer.IN := FALSE;
	//END_IF
	
	//IF task.CMM.command.Done OR task.CMM.command.Error OR task.CMM.command.Aborted THEN
	//	task.CMM.command.Execute := FALSE;
	//	task.CMM.command();
	//END_IF
	//--
	
	task.CMM.captureTimer();
	task.CMM.captureTimer.IN := FALSE;
	
	task.CMM.responseTimeout();
	task.CMM.responseTimeout.IN := FALSE;
	
	task.CMM.pulseTimerOnOFF();
	task.CMM.pulseTimerOnOFF.IN := FALSE;
	
	task.CMM.overTempTimer();
	task.CMM.overTempTimer.IN := FALSE;
	
	//task.CMM.captureImageTimer();
	//task.CMM.overTempTimer.IN := FALSE;
	
END_ACTION

