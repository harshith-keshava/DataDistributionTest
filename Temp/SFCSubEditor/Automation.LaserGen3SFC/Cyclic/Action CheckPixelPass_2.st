task.internal.rackNumber := 0;
task.internal.laserNumber :=0;

IF gVFLCR.status.frameCaptured THEN
	//task.internal.actualPixelMapIndex := task.internal.actualPixelMapIndex +1;
	FOR task.internal.rackNumber := 0 TO MACHINE_MAI_LASER_RACKS  DO
		FOR task.internal.laserNumber := 0 TO MACHINE_MAI_LASERS_PER_RACK  DO
			IF gmapRackLaser_to_Pixel[task.internal.rackNumber,task.internal.laserNumber] = task.internal.activePixelIndex THEN
				
				derivedMappingList[task.internal.rackNumber,task.internal.laserNumber] := task.internal.activeZaber1Index;
				gVFLCR.status.vfpMap[task.internal.activePixelIndex , 1] := FALSE;
				gVFLCR.status.frameCaptured := FALSE;
			END_IF
			//task.internal.laserNumber := task.internal.laserNumber +1;
		END_FOR
		//task.internal.rackNumber := task.internal.rackNumber +1;
	END_FOR
	StepDone := TRUE;
	StepContinue := FALSE;
	StepRetry := FALSE;
ELSE
	StepDone := FALSE;
	StepContinue := TRUE;
	StepRetry := FALSE;
END_IF





