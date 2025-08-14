task.internal.rackNumber := 0;
task.internal.laserNumber :=0;

IF gOpcData_FromGen3CalibApp.NumberOfBeamSpots = 1 THEN
	task.internal.actualPixelMapIndex := task.internal.actualPixelMapIndex +1;
	FOR task.internal.rackNumber := 0 TO MACHINE_MAI_LASER_RACKS  DO
		FOR task.internal.laserNumber := 0 TO MACHINE_MAI_LASERS_PER_RACK  DO
			IF gmapRackLaser_to_Pixel[task.internal.rackNumber,task.internal.laserNumber] = task.internal.activePixelIndex THEN
				
				gmapRackLaser_to_Pixel[task.internal.rackNumber,task.internal.laserNumber] := task.internal.actualPixelMapIndex;
			END_IF
			task.internal.laserNumber := task.internal.laserNumber +1;
		END_FOR
		task.internal.rackNumber := task.internal.rackNumber +1;
	END_FOR
	StepDone := TRUE;
	StepContinue := FALSE;
ELSIF gOpcData_FromGen3CalibApp.NumberOfBeamSpots = 2 THEN
	StepDone := FALSE;
	StepContinue := FALSE;
ELSE
	StepDone := FALSE;
	StepContinue := FALSE;
END_IF





