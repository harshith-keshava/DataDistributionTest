
ACTION PixelConvert: 

	IF (task.internal.activePixelIndex <= MACHINE_MAI_LASERS_TOTAL) THEN
		task.internal.manualPulse.Laser := gmapPixel_to_Laser[task.internal.activePixelIndex];
		task.internal.manualPulse.Rack := gmapPixel_to_Rack[task.internal.activePixelIndex];
	END_IF
	
	// Monitor test type set on HMI ======================================================================
	IF task.internal.pixelMappingTestType AND NOT task.internal._PixelMappingTestType THEN
		
		gManualPulseTypeSelected := VFLCR_TEST_TYPE_PIXEL_MAPPING;
		
		task.internal.calibrationTestType := FALSE;
		task.internal.dirtyVerificationTestType := FALSE;
		task.internal.cleanVerificationTestType := FALSE;
		task.internal.lowPowerTestType := FALSE;
		task.internal.somsTestType := FALSE;
		task.internal.highPowerTestType := FALSE;
	END_IF
	
	IF task.internal.calibrationTestType AND NOT task.internal._CalibrationTestType THEN
		
		gManualPulseTypeSelected := VFLCR_TEST_TYPE_CALIBRATION;

		task.internal.dirtyVerificationTestType := FALSE;
		task.internal.cleanVerificationTestType := FALSE;
		task.internal.lowPowerTestType := FALSE;
		task.internal.somsTestType := FALSE;
		task.internal.pixelMappingTestType := FALSE;
		task.internal.highPowerTestType := FALSE;
	END_IF
	
	IF task.internal.dirtyVerificationTestType AND NOT task.internal._DirtyVerificationTestType THEN
				
		gManualPulseTypeSelected := VFLCR_TEST_TYPE_VERIFY_DIRTY;
		
		task.internal.calibrationTestType := FALSE;
		task.internal.cleanVerificationTestType := FALSE;
		task.internal.lowPowerTestType := FALSE;
		task.internal.somsTestType := FALSE;
		task.internal.pixelMappingTestType := FALSE;
		task.internal.highPowerTestType := FALSE;
	END_IF
	
	IF task.internal.cleanVerificationTestType AND NOT task.internal._CleanVerificationTestType THEN

		gManualPulseTypeSelected := VFLCR_TEST_TYPE_VERIFY_CLEAN;

		task.internal.calibrationTestType := FALSE;
		task.internal.dirtyVerificationTestType := FALSE;
		task.internal.lowPowerTestType := FALSE;
		task.internal.somsTestType := FALSE;
		task.internal.pixelMappingTestType := FALSE;
	END_IF
	
	IF task.internal.lowPowerTestType AND NOT task.internal._LowPowerTestType THEN

		gManualPulseTypeSelected := VFLCR_TEST_TYPE_LOW_POWER_CHECK;
		
		task.internal.calibrationTestType := FALSE;
		task.internal.dirtyVerificationTestType := FALSE;
		task.internal.cleanVerificationTestType := FALSE;
		task.internal.somsTestType := FALSE;
		task.internal.pixelMappingTestType := FALSE;
		task.internal.highPowerTestType := FALSE;
	END_IF
	
	IF task.internal.somsTestType AND NOT task.internal._somsTestType THEN

		gManualPulseTypeSelected := VFLCR_TEST_TYPE_SOMS;
		
		task.internal.calibrationTestType := FALSE;
		task.internal.dirtyVerificationTestType := FALSE;
		task.internal.cleanVerificationTestType := FALSE;
		task.internal.lowPowerTestType := FALSE;
		task.internal.pixelMappingTestType := FALSE;
		task.internal.highPowerTestType := FALSE;
	END_IF
	
	IF task.internal.highPowerTestType AND NOT task.internal._HighPowerTestType THEN

		gManualPulseTypeSelected := VFLCR_TEST_TYPE_HIGH_POWER;
		
		task.internal.calibrationTestType := FALSE;
		task.internal.dirtyVerificationTestType := FALSE;
		task.internal.cleanVerificationTestType := FALSE;
		task.internal.somsTestType := FALSE;
		task.internal.lowPowerTestType := FALSE;
		task.internal.pixelMappingTestType := FALSE;
	END_IF
	
	task.internal._CalibrationTestType 			:= task.internal.calibrationTestType;
	task.internal._DirtyVerificationTestType 	:= task.internal.dirtyVerificationTestType;
	task.internal._CleanVerificationTestType 	:= task.internal.cleanVerificationTestType;
	task.internal._LowPowerTestType 			:= task.internal.lowPowerTestType;
	task.internal._somsTestType					:= task.internal.somsTestType;
	task.internal._PixelMappingTestType			:= task.internal.pixelMappingTestType;
	task.internal._HighPowerTestType			:= task.internal.highPowerTestType;
		
	// ========================================================================================================
	
	
	
	// ========================= Handle Config defaults and populate non zero zaber 2 offset postions ============
	IF Configuration.zaber2HeightArray[5] = 0 THEN
		Configuration.zaber2HeightArray[5] := 27.5; // Default
	END_IF
	
	IF Configuration.zaber2HeightArray[5] <> 0 THEN
		Configuration.zaber2HeightArray[0] := Configuration.zaber2HeightArray[5]- (5*Configuration.zaber2StepIndexSize_mm);
		Configuration.zaber2HeightArray[1] := Configuration.zaber2HeightArray[5]- (4*Configuration.zaber2StepIndexSize_mm);
		Configuration.zaber2HeightArray[2] := Configuration.zaber2HeightArray[5]- (3*Configuration.zaber2StepIndexSize_mm);
		Configuration.zaber2HeightArray[3] := Configuration.zaber2HeightArray[5]- (2*Configuration.zaber2StepIndexSize_mm);
		Configuration.zaber2HeightArray[4] := Configuration.zaber2HeightArray[5]- (1*Configuration.zaber2StepIndexSize_mm);
		
		Configuration.zaber2HeightArray[6] := Configuration.zaber2HeightArray[5]+ (1*Configuration.zaber2StepIndexSize_mm);
		Configuration.zaber2HeightArray[7] := Configuration.zaber2HeightArray[5]+ (2*Configuration.zaber2StepIndexSize_mm);
		Configuration.zaber2HeightArray[8] := Configuration.zaber2HeightArray[5]+ (3*Configuration.zaber2StepIndexSize_mm);
		Configuration.zaber2HeightArray[9] := Configuration.zaber2HeightArray[5]+ (4*Configuration.zaber2StepIndexSize_mm);
		Configuration.zaber2HeightArray[10] := Configuration.zaber2HeightArray[5]+ (5*Configuration.zaber2StepIndexSize_mm);
	END_IF
	
	IF Configuration.zaber2HeightCameraExpoArray[0] = 0 THEN
		Configuration.zaber2HeightCameraExpoArray[0] := 0.451; // Default
	END_IF
	IF Configuration.zaber2HeightCameraExpoArray[1] = 0 THEN
		Configuration.zaber2HeightCameraExpoArray[1] := 0.393; // Default
	END_IF
	IF Configuration.zaber2HeightCameraExpoArray[2] = 0 THEN
		Configuration.zaber2HeightCameraExpoArray[2] := 0.319; // Default
	END_IF
	IF Configuration.zaber2HeightCameraExpoArray[3] = 0 THEN
		Configuration.zaber2HeightCameraExpoArray[3] := 0.280; // Default
	END_IF
	IF Configuration.zaber2HeightCameraExpoArray[4] = 0 THEN
		Configuration.zaber2HeightCameraExpoArray[4] := 0.241; // Default
	END_IF
	IF Configuration.zaber2HeightCameraExpoArray[5] = 0 THEN
		Configuration.zaber2HeightCameraExpoArray[5] := 0.227; // Default
	END_IF
	IF Configuration.zaber2HeightCameraExpoArray[6] = 0 THEN
		Configuration.zaber2HeightCameraExpoArray[6] := 0.236; // Default
	END_IF
	IF Configuration.zaber2HeightCameraExpoArray[7] = 0 THEN
		Configuration.zaber2HeightCameraExpoArray[7] := 0.295; // Default
	END_IF
	IF Configuration.zaber2HeightCameraExpoArray[8] = 0 THEN
		Configuration.zaber2HeightCameraExpoArray[8] := 0.509; // Default
	END_IF
	IF Configuration.zaber2HeightCameraExpoArray[9] = 0 THEN
		Configuration.zaber2HeightCameraExpoArray[9] := 0.579; // Default
	END_IF
	IF Configuration.zaber2HeightCameraExpoArray[10] = 0 THEN
		Configuration.zaber2HeightCameraExpoArray[10] := 0.420; // Default
	END_IF
	// ========================================================================================================
END_ACTION
