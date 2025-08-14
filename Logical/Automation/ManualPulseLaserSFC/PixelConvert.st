
ACTION PixelConvert: 

	// Make sure that the index being used is within the array bounds
	// This catches pixelNum being 0 because it's unsigned, i.e. pixelNum - 1 overflows to 255
	IF (task.parameters.pixelNum - 1 <= MACHINE_MAI_LASERS_TOTAL) THEN
		task.internal.manualPulse.Laser := gmapPixel_to_Laser[task.parameters.pixelNum - 1];
		task.internal.manualPulse.Rack := gmapPixel_to_Rack[task.parameters.pixelNum - 1];
	END_IF
	
	task.internal.displayLaser := task.internal.manualPulse.Laser + 1;
	task.internal.displayRack := task.internal.manualPulse.Rack + 1;
	
END_ACTION
