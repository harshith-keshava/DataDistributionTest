
ACTION SimulateIO: 
	
	IO.di.PowerlinkModuleOK := TRUE;
	IO.ai.SystemHeartbeat := task.internal.systemHearbeatPrevious + 1;
		
	IO.ai.LUTFiles_CalibrationID := 100; // Set to a non-zero dummy value for now
	IO.di.LUTFiles_LoadSuccess := TRUE; // Allow manual pulsing in simulation
	
	
	IF test.command.initSystemState THEN
		
		//for the pixel ignore test
		Configuration.ignoreLaser[15] := FALSE;
		
		///////////////////////////////////////////////////////////////
		// SystemStatus population
		///////////////////////////////////////////////////////////////
			
		// Bit 0: Heartbeat Error
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 0);
			
		// Bit 3: Laser Safety Interlock OK
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 3);
			
		// Bits 4, 8, 12: NOT(Laser Power Supply DC OK) for each power supply
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 4);
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 8);
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 12);

		
		// Bits 5, 9, 13: NOT(Laser Power Supply AC Low) for each power supply
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 5);
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 9);
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 13);
			
		// Bits 6, 10, 14: NOT(Laser Power Supply Over Temp) for each power supply
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 6);
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 10);
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 14);
			
		// Bits 7, 11, 15: NOT(Laser Power Supply Fan Failure) for each power supply
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 7);
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 11);
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 15);
			
		// Bit 16: unused
			
		// Bit 17, 18, 19: LE FPGA Heartbeat Error 1, 2, 3
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 17);
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 18);
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 19);
		
	END_IF
	

	
	IF test.command.initOperationalState THEN
		
		// Bits 20-31: unused
					
		///////////////////////////////////////////////////////////////
		// OperationStatus population
		///////////////////////////////////////////////////////////////
			
		// Bit 0: LUT Files Deleted - Always Clear
		IO.raw.iOperationStatus := BIT_CLR(IO.raw.iOperationStatus, 0);
			
		// Bit 1: LaserControlFiles Deleted - Always Clear
		IO.raw.iOperationStatus := BIT_CLR(IO.raw.iOperationStatus, 1);
			
		// Bit 2: LUT File Load Success - Always Set
		IO.raw.iOperationStatus := BIT_SET(IO.raw.iOperationStatus, 2);
			
		// Bit 3: LUT File Load Failure - Always Clear
		IO.raw.iOperationStatus := BIT_CLR(IO.raw.iOperationStatus, 3);
			
		// Bit 4: unused
		// Bit 5: unused
			
		// Bit 6: Manual mode enabled
		// Bit 7: Auto mode enabled
		IF BIT_TST(IO.raw.oOperationControl, 6) THEN
			IO.raw.iOperationStatus := BIT_SET(IO.raw.iOperationStatus, 6);
			IO.raw.iOperationStatus := BIT_CLR(IO.raw.iOperationStatus, 7);
		ELSIF BIT_TST(IO.raw.oOperationControl, 7) THEN
			IO.raw.iOperationStatus := BIT_CLR(IO.raw.iOperationStatus, 6);
			IO.raw.iOperationStatus := BIT_SET(IO.raw.iOperationStatus, 7);
		END_IF
			
		// Bit 8: Layer open
		// Bit 10: Layer closed
		// TODO: is this the correct way to handle bit 10? This differs from the previous implementation
		IF BIT_TST(IO.raw.oOperationControl, 8) THEN
			IO.raw.iOperationStatus := BIT_SET(IO.raw.iOperationStatus, 8);
			IO.raw.iOperationStatus := BIT_CLR(IO.raw.iOperationStatus, 10);
		ELSE
			IO.raw.iOperationStatus := BIT_CLR(IO.raw.iOperationStatus, 8);
			IO.raw.iOperationStatus := BIT_SET(IO.raw.iOperationStatus, 10);
		END_IF
			
		// Bit 9: Layer aborted
		IF BIT_TST(IO.raw.oOperationControl, 9) THEN
			IO.raw.iOperationStatus := BIT_SET(IO.raw.iOperationStatus, 9);
		ELSE
			IO.raw.iOperationStatus := BIT_CLR(IO.raw.iOperationStatus, 9);
		END_IF
			
		// Bit 11: Layer Error - Always Clear
		IO.raw.iOperationStatus := BIT_CLR(IO.raw.iOperationStatus, 11);
			
		// Bit 12: unused
		// Bit 13: unused
			
		// Bit 14: System Watchdog Failure
		IO.raw.iOperationStatus := BIT_CLR(IO.raw.iOperationStatus, 14);
			
		// Bit 15: System Operational
		IO.raw.iOperationStatus := BIT_SET(IO.raw.iOperationStatus, 15);
			
		// Bit 16-31: unused
			
	END_IF
	
	
	///////////////////////////////////////////////////////////////
	// Laser control
	///////////////////////////////////////////////////////////////
		
	// TODO: consider adding timers to some or all of these
	FOR index := 0 TO VFLCR_MAI_LASERS DO
		bitIndex := index;
			
		// Trick out the trajectory monitoring logic in sim
		// TODO: obtain current print trajectory from its Gen 3 source
		//				IO.ai.DMACurrentTrajectory[index] := gMachine.laserControl.interface.systemStatus.currentPrintTrajectory;
			
		IF BIT_TST(IO.raw.oEnableLaserMainPower, bitIndex) THEN
			IO.raw.iLaserMainPowerEnabled := BIT_SET(IO.raw.iLaserMainPowerEnabled, bitIndex);
		ELSE
			IO.raw.iLaserMainPowerEnabled := BIT_CLR(IO.raw.iLaserMainPowerEnabled, bitIndex);
		END_IF
			
		// I'm *fairly* sure this is right
		IF BIT_TST(IO.raw.oEnableGuideLaser, bitIndex) THEN
			IO.raw.iLaserControlPowerEnabled := BIT_SET(IO.raw.iLaserControlPowerEnabled, bitIndex);
		ELSE
			IO.raw.iLaserControlPowerEnabled := BIT_CLR(IO.raw.iLaserControlPowerEnabled, bitIndex);
		END_IF
			
		IF BIT_TST(IO.raw.oEnableLaserEmission, bitIndex) THEN
			IO.raw.iLaserEmissionEnabled := BIT_SET(IO.raw.iLaserEmissionEnabled, bitIndex);
		ELSE
			IO.raw.iLaserEmissionEnabled := BIT_CLR(IO.raw.iLaserEmissionEnabled, bitIndex);
		END_IF
			
		IF BIT_TST(IO.raw.oResetLaserErrors, bitIndex) THEN	
			IO.raw.iLaserFatalError := BIT_CLR(IO.raw.iLaserFatalError, bitIndex);
			IO.raw.iLaserWatchdogError := BIT_CLR(IO.raw.iLaserWatchdogError, bitIndex);	
			// Raycus and nLight lasers handle the Ready/Error output differently.
			CASE (Configuration.laserHardware) OF
				LH_Raycus_300W:
					// Ready
					IO.raw.iLaserReady_Error := BIT_SET(IO.raw.iLaserReady_Error, bitIndex);
				LH_nLight_525W:
					// Error
					IO.raw.iLaserReady_Error := BIT_CLR(IO.raw.iLaserReady_Error, bitIndex);	
				ELSE
					IO.raw.iLaserReady_Error := BIT_CLR(IO.raw.iLaserReady_Error, bitIndex);		
			END_CASE
		END_IF
	END_FOR
		
	IF (IO.do.ManualPulseTrigger = 16#6000) THEN
		IO.raw.iManualModeLaserPower := IO.raw.oManualLaserCurrentSetpoint;
	ELSE
		IO.raw.iManualModeLaserPower := 0;
	END_IF


	//ADDED BY PAUL ABOVE THIS NEEDS TO BE LOOKED AT FOR SIM 
	IF  IO.do.LaserPowerSupply[0] OR IO.do.LaserPowerSupply[1]  THEN	
		task.status.dcPowerEnabled := TRUE;	
	END_IF

	IO.di.LaserControlFiles_Deleted := IO.do.Delete_LaserControlFiles;

	IO.di.LayerAborted := IO.do.AbortLayer;
	IO.di.LayerOpen	:= IO.do.OpenLayer;
	IO.di.LUTFiles_Deleted := IO.do.Delete_LUTFiles;
	IO.di.LUTFiles_LoadSuccess := IO.do.OpenLayer;
	
	// allow mode switching
	IO.di.ModeEnabled_MANUAL := IO.do.EnableMode_MANUAL;
	IO.di.ModeEnabled_AUTO := NOT IO.do.EnableMode_MANUAL;
	
	
	
	//Cypress Error Induction (keep at the bottom)
	IF test.command.induceHeartbeatError THEN
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 0);
	END_IF
	
	
	IF test.command.induceLowACVoltageError THEN
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 5);
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 9);
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 13);
	END_IF
	
	IF test.command.inducePowerSupplyError THEN
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 4);
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 8);
		IO.raw.iSystemStatus := BIT_SET(IO.raw.iSystemStatus, 12);
	END_IF
	
	IF test.command.induceFanError THEN
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 7);
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 11);
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 15);
	END_IF
	
	IF test.command.induceIgnoredPixel THEN
		Configuration.ignoreLaser[15] := FALSE;
	END_IF
		
	IF test.command.inducePowerSupplyTempError THEN
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 6);
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 10);
		IO.raw.iSystemStatus := BIT_CLR(IO.raw.iSystemStatus, 14);
	END_IF
	
	IF test.command.induceInvalidLUT THEN
		IO.ai.LUTFiles_CalibrationID := 9999;
	END_IF
	
	

END_ACTION
