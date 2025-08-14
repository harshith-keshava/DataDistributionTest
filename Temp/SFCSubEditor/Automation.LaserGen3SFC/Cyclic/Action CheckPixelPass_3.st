task.internal.rackNumber := 0;
task.internal.laserNumber :=0;

IF gVFLCR.status.frameCaptured THEN
	//task.internal.actualPixelMapIndex := task.internal.actualPixelMapIndex +1;
	FOR task.internal.rackNumber := 0 TO MACHINE_MAI_LASER_RACKS  DO
		FOR task.internal.laserNumber := 0 TO MACHINE_MAI_LASERS_PER_RACK  DO
			IF gmapRackLaser_to_Pixel[task.internal.rackNumber,task.internal.laserNumber] = task.internal.activePixelIndex THEN
				
				derivedMappingList[task.internal.rackNumber,task.internal.laserNumber] := task.internal.activeZaber1Index;
				pixelIgnoreList[task.internal.activePixelIndex] := TRUE;
				gVFLCR.status.frameCaptured := FALSE;
			END_IF

		END_FOR

	END_FOR
	StepDone := TRUE;
	StepContinue := FALSE;

ELSE
	StepDone := FALSE;
	StepContinue := TRUE;
END_IF





