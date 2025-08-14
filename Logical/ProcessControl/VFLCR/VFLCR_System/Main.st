
PROGRAM _INIT
	
	Name := 'LCR System';
	
	IF gSimulation THEN
		
		IO.di.cycleOK_PLK2 := TRUE;
		IO.di.syncOK_PLK2 := TRUE;
		
	END_IF
	
	subscribePLCOpenWithParameters(gVFLCR.command.manualPulse, moduleName, ADR(task.internal.manualPulseParameters.selection), SIZEOF(task.internal.manualPulseParameters.selection), task.command.manualPulse, task.internal.manualPulseResponse);
	subscribePLCOpen(  gVFLCR.command.enableLaserPowerSequence, Name, task.command.enableAllLaserFunctions, task.internal.laserPowerSequenceResponse );
	subscribePLCOpenWithParameters(gVFLCR.command.initializeCalibration, moduleName, ADR(task.internal.initializeCalibrationParameters), SIZEOF(task.internal.initializeCalibrationParameters), task.command.initializeCalibration, task.internal.initializeDataCollectionResponse);
	subscribePLCOpenWithParameters(gVFLCR.command.initializeManualCalibration, moduleName, ADR(task.internal.initializeCalibrationParameters), SIZEOF(task.internal.initializeCalibrationParameters), task.command.initializeManualCalibration, task.internal.PLCOpen);
	
	registerStateBool( gVFLCR.status.calibrationConfigParOk, Name, task.internal.calibrationConfigParOk);
	
	// Initialize test-specific laser parameters if they haven't been set, i.e. are all zero
	IF brsmemcmp(ADR(Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING]), ADR(zeroManualPulsePars), SIZEOF(zeroManualPulsePars)) = 0 THEN
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].safePowerLimit_W := 		400;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].availableLaserPower_W := 	525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].startingPowerLevel := 		100;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].numPowerLevels := 			1;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].powerIncrementPerStep := 	1;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].numPulsesPerLevel := 		10;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].pulseOnTime_ms := 			50;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].pulseDelayTime_ms := 		0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].pulseOffTime_ms := 		50;
	END_IF	
	IF brsmemcmp(ADR(Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION]), ADR(zeroManualPulsePars), SIZEOF(zeroManualPulsePars)) = 0 THEN
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].safePowerLimit_W := 			525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].availableLaserPower_W := 	525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].startingPowerLevel := 		49;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].numPowerLevels := 			6;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].powerIncrementPerStep := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].numPulsesPerLevel := 		10;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].pulseOnTime_ms := 			5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].pulseDelayTime_ms := 		0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].pulseOffTime_ms := 			58;
	END_IF
	IF brsmemcmp(ADR(Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY]), ADR(zeroManualPulsePars), SIZEOF(zeroManualPulsePars)) = 0 THEN
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].safePowerLimit_W := 		525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].availableLaserPower_W := 	525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].startingPowerLevel := 		97;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].numPowerLevels := 			3;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].powerIncrementPerStep := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].numPulsesPerLevel := 		10;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].pulseOnTime_ms := 			5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].pulseDelayTime_ms := 		0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].pulseOffTime_ms := 			58;
	END_IF
	IF brsmemcmp(ADR(Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN]), ADR(zeroManualPulsePars), SIZEOF(zeroManualPulsePars)) = 0 THEN
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].safePowerLimit_W := 		525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].availableLaserPower_W := 	525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].startingPowerLevel := 		97;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].numPowerLevels := 			3;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].powerIncrementPerStep := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].numPulsesPerLevel := 		10;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].pulseOnTime_ms := 			5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].pulseDelayTime_ms := 		0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].pulseOffTime_ms := 			58;
	END_IF
	IF brsmemcmp(ADR(Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK]), ADR(zeroManualPulsePars), SIZEOF(zeroManualPulsePars)) = 0 THEN
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].safePowerLimit_W := 		300;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].availableLaserPower_W := 525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].startingPowerLevel := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].numPowerLevels := 		2;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].powerIncrementPerStep := 5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].numPulsesPerLevel := 	1;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].pulseOnTime_ms := 		5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].pulseDelayTime_ms := 	0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].pulseOffTime_ms := 		58;
	END_IF
	IF brsmemcmp(ADR(Configuration.manualPulseTestType[VFLCR_TEST_TYPE_SOMS]), ADR(zeroManualPulsePars), SIZEOF(zeroManualPulsePars)) = 0 THEN
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_SOMS].safePowerLimit_W := 		525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_SOMS].availableLaserPower_W := 	525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_SOMS].startingPowerLevel := 		97;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_SOMS].numPowerLevels := 			1;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_SOMS].powerIncrementPerStep := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_SOMS].numPulsesPerLevel := 		1;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_SOMS].pulseOnTime_ms := 			5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_SOMS].pulseDelayTime_ms := 		0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_SOMS].pulseOffTime_ms := 			58;
	END_IF
	IF brsmemcmp(ADR(Configuration.manualPulseTestType[VFLCR_TEST_TYPE_HIGH_POWER]), ADR(zeroManualPulsePars), SIZEOF(zeroManualPulsePars)) = 0 THEN
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_HIGH_POWER].safePowerLimit_W := 		525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_HIGH_POWER].availableLaserPower_W := 	525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_HIGH_POWER].startingPowerLevel := 		97;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_HIGH_POWER].numPowerLevels := 			1;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_HIGH_POWER].powerIncrementPerStep := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_HIGH_POWER].numPulsesPerLevel := 		1;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_HIGH_POWER].pulseOnTime_ms := 			5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_HIGH_POWER].pulseDelayTime_ms := 		0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_HIGH_POWER].pulseOffTime_ms := 			58;
	END_IF
	task.internal.currentLaserPulsePars := (Configuration.manualPulseTestType[gManualPulseTypeSelected]);
	task.internal.newLaserPulsePars := Configuration.manualPulseTestType[gManualPulseTypeSelected];
	
	
	Configuration.enableManualContinuousMode := FALSE;
	task.internal.totalNumberOfLasers := 50;
	
END_PROGRAM

PROGRAM _CYCLIC
	
	// VF-LCR code is based on Gen 2 v3.18.0
	
	///////////////////////////////////////////////////////////////
	// API:
	//	Requires:
	//	- nothing
	//	Commands:
	//	- manualPulse 				- Sets up parameters and distributes the manual pulse commands to the VFLCR_Operations
	//	- manualPulseAbort 			- Cancel all manual pulse commands
	//  Statuses:
	//	- cycleOKFailCount_PLK2		- the number of cycles that had a Powerlink cycle error
	//	- syncOKFailCount_PLK2		- the number of cycles that had a Powerlink synchronization error
	//	- plkErrorDetected			- there is a Powerlink cycle or synchronization error
	//	- manualModeEnabled			- manual mode is enabled for all racks, respecting ignores
	//	- autoModeEnabled			- auto mode is enabled for all racks, respecting ignores
	//	Inhbitits:
	//	- nothing
	///////////////////////////////////////////////////////////////
	
	// Call Piper
	//PiperModuleInterface;
	
	// Read in external components
	
	// Read external states
	task.status.autoModeEnabled := stateAllTrue(gVFLCR.status.autoModeEnabled, FALSE);
	task.status.manualModeEnabled := stateAllTrue(gVFLCR.status.manualModeEnabled, FALSE);
	
	gVFLCR.status.manualContinuousModeEnabled := Configuration.enableManualContinuousMode;
	
	MACHINE_NUM_LASERS_TOTAL := task.internal.totalNumberOfLasers;
	MACHINE_MAI_LASERS_TOTAL := MACHINE_NUM_LASERS_TOTAL - 1;
	
	IF task.command.rebootPLC THEN
		task.internal.rebootPLC := TRUE;
	END_IF
	
	//IF task.internal.rebootPLC <> 0 THEN
		
	IF task.command.confirmReboot  THEN
			
		task.internal.rebootPLC := FALSE;
		SYSreset(TRUE, SYSLIB_WARMSTART);
			
	END_IF

	IF task.command.closePopup THEN
		
		task.internal.rebootPLC := FALSE;
		
	END_IF
	 
	IF gManualPulseTypeSelected <> VFLCR_TEST_TYPE_HIGH_POWER THEN
		Configuration.enableManualContinuousMode := FALSE;
	END_IF
		
	//END_IF 
	
	IF task.command.restoreManualPulsePars THEN
		task.command.restoreManualPulsePars := FALSE;
		
		// Initialize test-specific laser parameters if they haven't been set, i.e. are all zero
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].safePowerLimit_W := 		525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].availableLaserPower_W := 	525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].startingPowerLevel := 		49;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].numPowerLevels := 			6;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].powerIncrementPerStep := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].numPulsesPerLevel := 		10;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].pulseOnTime_ms := 			5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].pulseDelayTime_ms := 		0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_PIXEL_MAPPING].pulseOffTime_ms := 		58;
			
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].safePowerLimit_W := 			525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].availableLaserPower_W := 	525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].startingPowerLevel := 		49;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].numPowerLevels := 			6;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].powerIncrementPerStep := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].numPulsesPerLevel := 		10;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].pulseOnTime_ms := 			5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].pulseDelayTime_ms := 		0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_CALIBRATION].pulseOffTime_ms := 			58;

		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].safePowerLimit_W := 		525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].availableLaserPower_W := 	525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].startingPowerLevel := 		97;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].numPowerLevels := 			3;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].powerIncrementPerStep := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].numPulsesPerLevel := 		10;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].pulseOnTime_ms := 			5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].pulseDelayTime_ms := 		0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].pulseOffTime_ms := 			58;
	
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].safePowerLimit_W := 		525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].availableLaserPower_W := 	525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].startingPowerLevel := 		97;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].numPowerLevels := 			3;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].powerIncrementPerStep := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].numPulsesPerLevel := 		10;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].pulseOnTime_ms := 			5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].pulseDelayTime_ms := 		0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_CLEAN].pulseOffTime_ms := 			58;


		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].safePowerLimit_W := 		300;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].availableLaserPower_W := 525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].startingPowerLevel := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].numPowerLevels := 		2;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].powerIncrementPerStep := 5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].numPulsesPerLevel := 	1;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].pulseOnTime_ms := 		5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].pulseDelayTime_ms := 	0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_LOW_POWER_CHECK].pulseOffTime_ms := 		58;
		
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].safePowerLimit_W := 		525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].availableLaserPower_W := 	525;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].startingPowerLevel := 		97;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].numPowerLevels := 			1;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].powerIncrementPerStep := 	24;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].numPulsesPerLevel := 		1;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].pulseOnTime_ms := 			5;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].pulseDelayTime_ms := 		0;
		Configuration.manualPulseTestType[VFLCR_TEST_TYPE_VERIFY_DIRTY].pulseOffTime_ms := 			58;

		task.internal.currentLaserPulsePars := (Configuration.manualPulseTestType[gManualPulseTypeSelected]);
	END_IF
	
	
	
	//check for invalid LUT
	gVFLCR.status.mismatchedLUTs := FALSE;
	gVFLCR.status.defaultLUT := FALSE;
	gVFLCR.status.versionZeroLUT := FALSE;
	
	
	FOR i := 1 TO 3 BY 1 DO
		
		IF i <> 0 THEN
			IF (gVFLCR.status.calibrationLUT[i] <> gVFLCR.status.calibrationLUT[i-1]) THEN
				gVFLCR.status.mismatchedLUTs := TRUE;
			END_IF	
		END_IF	
		
		IF (gVFLCR.status.calibrationLUT[i] = 9999) THEN
			gVFLCR.status.defaultLUT := TRUE;
		END_IF
		
		IF (gVFLCR.status.calibrationLUT[i] = 0) THEN
			gVFLCR.status.versionZeroLUT := TRUE;
		END_IF
	
	END_FOR
	

		
	
	

	
	
	
	// Identify powerlink cycle / synchronization errors.
	IF NOT(IO.di.cycleOK_PLK2) THEN
		task.status.cycleOKFailCount_PLK2 := task.status.cycleOKFailCount_PLK2 + 1;
	END_IF
	
	IF NOT(IO.di.syncOK_PLK2) THEN
		task.status.syncOKFailCount_PLK2 := task.status.syncOKFailCount_PLK2 + 1;
	END_IF
	
	task.status.plkErrorDetected := NOT(IO.di.cycleOK_PLK2) OR NOT(IO.di.syncOK_PLK2);
	task.status.error := stateTrueStatus(gVFLCR.status.error, ADR(task.status.errorStatus), SIZEOF(task.status.errorStatus));
	task.status.commandDone := task.internal.atnSystemCommand.Done;
	task.internal.currentLaserPulsePars := Configuration.manualPulseTestType[gManualPulseTypeSelected];
	IF (task.internal.updateManualPulsePars) THEN
		task.internal.updateManualPulsePars := FALSE;
		Configuration.manualPulseTestType[gManualPulseTypeSelected] := task.internal.newLaserPulsePars;
	END_IF	
	
	//vfAlarmPersistent(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_POWERLINK_ERROR_AL9114, task.status.plkErrorDetected);
	
	// Check few config values are not zero before laser autoimation manual laser pulse
	IF task.internal.initializeCalibrationParameters.testType < NUM_VFLCR_TEST_TYPE THEN
		IF Configuration.manualPulseTestType[task.internal.initializeCalibrationParameters.testType].numPowerLevels <> 0 AND
			Configuration.manualPulseTestType[task.internal.initializeCalibrationParameters.testType].numPulsesPerLevel <> 0 AND
			Configuration.manualPulseTestType[task.internal.initializeCalibrationParameters.testType].pulseOnTime_ms <> 0 AND
			Configuration.manualPulseTestType[task.internal.initializeCalibrationParameters.testType].pulseOffTime_ms <> 0 THEN
			
			task.internal.calibrationConfigParOk := TRUE;
		ELSE
			task.internal.calibrationConfigParOk := FALSE;
		END_IF	
	END_IF	
	
	///////////////////////////////////////////////////////////////
	// Propagate direct system commands to laser racks via ATN
	///////////////////////////////////////////////////////////////	
	CASE task.status.powerSequence OF
	
		SEQUENCE_READY:
			
			IF task.command.enableAllLaserFunctions THEN
				task.status.powerSequence := SEQUENCE_ENABLING_DC_POWER;
			END_IF
			
			
			task.status.statusMessage := '';
			
		SEQUENCE_ENABLING_DC_POWER:
			task.internal.atnSystemCommand.Command := gVFLCR.command.enableDCPower;
			task.internal.atnSystemCommand.Execute := TRUE;
			
			task.status.statusMessage := 'Enabling DC Power';
			
			IF task.internal.atnSystemCommand.Done THEN
				task.status.powerSequence := SEQUENCE_ENABLING_LASER_POWER;
				task.internal.atnSystemCommand.Execute := FALSE;
			ELSIF task.internal.atnSystemCommand.Error THEN
				task.internal.laserPowerSequenceResponse.status := VFLCR_ERROR;
				task.status.powerSequence := SEQUENCE_FAILED;
				task.internal.atnSystemCommand.Execute := FALSE;
			END_IF
			
		SEQUENCE_ENABLING_LASER_POWER:
			task.internal.atnSystemCommand.Command := gVFLCR.command.enableLaserPower;
			task.internal.atnSystemCommand.Execute := TRUE;
			
			task.status.statusMessage := 'Enabling Laser Power';
			
			IF task.internal.atnSystemCommand.Done THEN
				task.status.powerSequence := SEQUENCE_ENABLING_LASER_EMISSION;
					task.internal.atnSystemCommand.Execute := FALSE;
			ELSIF task.internal.atnSystemCommand.Error THEN
				task.internal.laserPowerSequenceResponse.status := VFLCR_ERROR;
				task.internal.atnSystemCommand.Execute := FALSE;
				task.status.powerSequence := SEQUENCE_FAILED;
			END_IF
			
		
			
		SEQUENCE_ENABLING_LASER_EMISSION:
			
			task.internal.atnSystemCommand.Command := gVFLCR.command.enableLaserEmission;
			task.internal.atnSystemCommand.Execute := TRUE;
			
			task.status.statusMessage := 'Enabling Laser Emission';
			
			IF task.internal.atnSystemCommand.Done THEN
				task.status.powerSequence := SEQUENCE_ENABLING_LASER_MOD;
				task.internal.atnSystemCommand.Execute := FALSE;
			ELSIF task.internal.atnSystemCommand.Error THEN
				task.internal.laserPowerSequenceResponse.status := VFLCR_ERROR;
				task.status.powerSequence := SEQUENCE_FAILED;
				task.internal.atnSystemCommand.Execute := FALSE;
			END_IF
			
		SEQUENCE_ENABLING_LASER_MOD:
			
			task.internal.atnSystemCommand.Command := gVFLCR.command.enableModulation;
			task.internal.atnSystemCommand.Execute := TRUE;
			
			task.status.statusMessage := 'Enabling Laser Modulation';
			
			IF task.internal.atnSystemCommand.Done THEN
				task.internal.laserPowerSequenceResponse.status := ERR_OK;
				task.status.powerSequence := SEQUENCE_READY;
				task.internal.atnSystemCommand.Execute := FALSE;
			ELSIF task.internal.atnSystemCommand.Error THEN
				task.internal.laserPowerSequenceResponse.status := VFLCR_ERROR;
				task.status.powerSequence := SEQUENCE_FAILED;
				task.internal.atnSystemCommand.Execute := FALSE;
			END_IF
		
		SEQUENCE_FAILED:
			
			task.internal.atnSystemCommand.Execute := FALSE;
			task.status.powerSequence := SEQUENCE_READY;
			
	END_CASE
	
	IF task.status.powerSequence <> SEQUENCE_READY THEN
		task.internal.timeout.IN := TRUE;
	END_IF
	
	IF task.internal.timeout.Q THEN
		task.status.powerSequence := SEQUENCE_FAILED;
	END_IF
	
	task.internal.timeout.PT := T#75s;
	task.internal.timeout();
	task.internal.timeout.IN := FALSE;
	
	// Power commands
	IF task.command.enableDCPower THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.enableDCPower;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF


	IF task.command.enableLaserPower THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.enableLaserPower;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF

	IF task.command.enableLaserEmission THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.enableLaserEmission;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF

	IF task.command.disableDCPower THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.disableDCPower;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF

	IF task.command.disableLaserPower THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.disableLaserPower;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF

	IF task.command.disableLaserEmission THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.disableLaserEmission;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF
	
	// Mode commands
	IF task.command.enableAutoMode THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.enableAutoMode;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF
	
	IF task.command.enableManualMode THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.enableManualMode;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF
	
	//Continuous Mode
	IF task.command.startContinuousPulse THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.startPulse;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF
	
	
	IF task.command.stopContinuousPulse THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.stopPulse;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF
	
	// Layer commands
	IF task.command.openLayer THEN
		// pars set by hmi
		task.internal.openLayerCommand.Execute := TRUE;
	END_IF
	
	IF task.command.abortLayer THEN
		task.internal.atnSystemCommand.Command := gVFLCR.command.abortLayer;
		task.internal.atnSystemCommand.Execute := TRUE;
	END_IF
	
	// Manual pulse commands
	IF task.command.manualPulse THEN
		task.internal.manualPulseCommand.Execute := TRUE;
		IF task.internal.manualPulseResponse.parametersWritten THEN
			task.parameters.manualPulseRackNumber := task.internal.manualPulseParameters.selection.Rack + 1;
			task.parameters.manualPulseLaserNumber := task.internal.manualPulseParameters.selection.Laser + 1;
		END_IF
		
		// Copy the data to transfer
		task.internal.manualPulseParameters.parameters := 		Configuration.manualPulse;	// HMI pars
		task.internal.manualPulseParameters.selection.Laser :=	task.parameters.manualPulseLaserNumber - 1;
		task.internal.manualPulseParameters.selection.Rack := 	task.parameters.manualPulseRackNumber - 1;
	END_IF
	
	IF task.command.manualPulseAbort THEN
		task.internal.manualPulseAbortCommand.Execute := TRUE;
	END_IF
	
	// pass manual pulse parameters to app
	IF task.command.initializeCalibration OR task.command.initializeManualCalibration THEN
		IF task.command.initializeCalibration THEN
			task.internal.initializeDataCollectionCommand.Execute := TRUE;
		END_IF 
		
		IF task.internal.initializeDataCollectionResponse.parametersWritten OR task.internal.PLCOpen.parametersWritten THEN
			IF task.internal.initializeCalibrationParameters.testType < NUM_VFLCR_TEST_TYPE THEN
				task.parameters.testType := task.internal.initializeCalibrationParameters.testType;
				Configuration.manualPulse := Configuration.manualPulseTestType[task.parameters.testType]; // Overwrite HMI pars to be read by manual pulse
			END_IF
		END_IF
		
		task.command.initializeManualCalibration := FALSE;
		task.internal.PLCOpen.status := ERR_OK;
		
		// Copy the data to transfer
		task.internal.dataCollectionParameters.CurrentPowerWatts := 0;
		task.internal.dataCollectionParameters.TestType := 			task.parameters.testType;
		task.internal.dataCollectionParameters.LaserParameters := 	Configuration.manualPulse;	// HMI pars
		
	END_IF
	
	// Error reset command
	IF task.command.resetAllErrors THEN
		executeCommand(gVFLCR.command.resetAllErrors);
	END_IF
	
	///////////////////////////////////////////////////////////////
	// Reset all commands to ensure they don't get buffered
	///////////////////////////////////////////////////////////////
	brsmemset(ADR(task.command), 0, SIZEOF(task.command));
	
	///////////////////////////////////////////////////////////////
	// Call all PLCOpen function blocks
	///////////////////////////////////////////////////////////////
	task.internal.manualPulseCommand.Command := gVFLCR.command.manualPulseRack;
	task.internal.manualPulseCommand.pParameters := ADR(task.internal.manualPulseParameters);
	task.internal.manualPulseCommand.sParameters := SIZEOF(task.internal.manualPulseParameters);
	task.internal.manualPulseCommand();
	task.internal.manualPulseCommand.Execute := FALSE;
	IF task.internal.manualPulseCommand.Done
		OR task.internal.manualPulseCommand.Error
		OR task.internal.manualPulseCommand.Busy
		OR task.internal.manualPulseCommand.Aborted THEN
		task.internal.manualPulseResponse.status := task.internal.manualPulseCommand.Status;
	END_IF
	
	task.internal.initializeDataCollectionCommand.Command := gVFLCR.command.initializeDataCollection;
	task.internal.initializeDataCollectionCommand.pParameters := ADR(task.internal.dataCollectionParameters);
	task.internal.initializeDataCollectionCommand.sParameters := SIZEOF(task.internal.dataCollectionParameters);
	task.internal.initializeDataCollectionCommand();
	task.internal.initializeDataCollectionCommand.Execute := FALSE;
	IF task.internal.initializeDataCollectionCommand.Done
		OR task.internal.initializeDataCollectionCommand.Error
		OR task.internal.initializeDataCollectionCommand.Busy
		OR task.internal.initializeDataCollectionCommand.Aborted THEN
		task.internal.initializeDataCollectionResponse.status := task.internal.initializeDataCollectionCommand.Status;
	END_IF
	
	task.internal.openLayerCommand.Command := gVFLCR.command.openLayer;
	task.internal.openLayerCommand.pParameters := ADR(task.parameters.openLayer);
	task.internal.openLayerCommand.sParameters := SIZEOF(task.parameters.openLayer);
	task.internal.openLayerCommand();
	task.internal.openLayerCommand.Execute := FALSE;
	
	// If we get an abort command, ensure that the manual pulse start gets errored
	IF task.internal.manualPulseAbortCommand.Execute THEN
		atnPLCOpenAbort(task.internal.manualPulseResponse);
	END_IF
	
	task.internal.manualPulseAbortCommand.Command := gVFLCR.command.manualPulseAbort;
	task.internal.manualPulseAbortCommand();
	task.internal.manualPulseAbortCommand.Execute := FALSE;
	
	task.internal.atnSystemCommand();
	task.internal.atnSystemCommand.Execute := FALSE;
	
	task.status.racksOnline := stateAllTrue(gVFLCR.status.rackOnline, FALSE);
	task.internal.enableLaserPowerSequenceCommand.Command := gVFLCR.command.enableLaserPowerSequence;
	task.internal.enableLaserPowerSequenceCommand();
	task.internal.enableLaserPowerSequenceCommand.Execute := FALSE;
	
	hmiHelper;
	
	///////////////////////////////////////////////////////////////
	// Handle manual pulse status
	///////////////////////////////////////////////////////////////
	// Look for any active manual pulse lasers
	task.status.manualPulseActive := FALSE;
	brsmemset(ADR(task.status.manualPulseStatus), 0, SIZEOF(task.status.manualPulseStatus));
	FOR index :=0 TO stateCount(gVFLCR.status.manualPulseActive) DO
		IF forState(gVFLCR.status.manualPulseActive, index, ADR(active), ADR(ManualPulseStatus), SIZEOF(ManualPulseStatus)) THEN
			// Display the active one if there is one
			IF active THEN
				
				task.status.manualPulseActive := TRUE;
				task.status.manualPulseStatus := ManualPulseStatus;
				
				// Disallow changing while there is an active rack
				task.parameters.manualPulseRackNumber := ManualPulseStatus.rackNumber;
				
			// If there is not an active one, display the selected one
			ELSIF NOT task.status.manualPulseActive AND task.parameters.manualPulseRackNumber = ManualPulseStatus.rackNumber THEN
				task.status.manualPulseStatus := ManualPulseStatus;
			END_IF
		END_IF
	END_FOR
	
	IF task.parameters.manualPulseRackNumber < 1 THEN
		task.parameters.manualPulseRackNumber := 1;
	END_IF
	IF task.parameters.manualPulseLaserNumber < 1 THEN
		task.parameters.manualPulseLaserNumber := 1;
	END_IF
	
	// Calculate manual pulse parameters
	
	task.status.manualPulseCalculations.pixelNumber := gmapRackLaser_to_Pixel[task.parameters.manualPulseRackNumber - 1, task.parameters.manualPulseLaserNumber - 1] + 1;
	
	task.status.manualPulseCalculations.startingPowerWatts := UINT_TO_REAL(Configuration.manualPulse.startingPowerLevel)
	* Configuration.manualPulse.availableLaserPower_W / UINT_TO_REAL(VFLCR_POWER_COMMAND_RESOLUTION);
	
	task.status.manualPulseCalculations.powerIncrementWatts := USINT_TO_REAL(Configuration.manualPulse.powerIncrementPerStep)
	* Configuration.manualPulse.availableLaserPower_W / UINT_TO_REAL(VFLCR_POWER_COMMAND_RESOLUTION);
	
	task.status.manualPulseCalculations.endingPowerWatts := task.status.manualPulseCalculations.startingPowerWatts 
	+ (USINT_TO_REAL((Configuration.manualPulse.numPowerLevels - 1) * Configuration.manualPulse.powerIncrementPerStep)
	* Configuration.manualPulse.availableLaserPower_W / UINT_TO_REAL(VFLCR_POWER_COMMAND_RESOLUTION));
	
	task.status.manualPulseCalculations.endingPowerHigh := (task.status.manualPulseCalculations.endingPowerWatts > Configuration.manualPulse.safePowerLimit_W);
	
	
END_PROGRAM

PROGRAM _EXIT
	 
END_PROGRAM

