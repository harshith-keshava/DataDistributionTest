
FOR task.internal.rackIndex := 0 TO MACHINE_NUM_LASER_RACKS-1  DO
	FOR task.internal.laserIndex := 0 TO MACHINE_NUM_LASERS_PER_RACK-1 DO	
		IF gVFLCR.status.vfpMap[task.internal.laserNumber,task.internal.rackNumber] = TRUE THEN
			gmapRackLaser_to_Pixel[task.internal.rackIndex,task.internal.laserIndex ] := derivedMappingList[task.internal.rackIndex,task.internal.laserIndex ];
		//task.internal.laserNumber := task.internal.laserNumber +1;
			gmapPixel_to_Rack[derivedMappingList[task.internal.rackIndex,task.internal.laserIndex]] := task.internal.rackIndex;
			gmapPixel_to_Laser[derivedMappingList[task.internal.rackIndex,task.internal.laserIndex]] := task.internal.laserIndex;
		END_IF
	END_FOR
		//task.internal.rackNumber := task.internal.rackNumber +1;
END_FOR

//FOR task.internal.pixelLoopNumber := 1 TO MACHINE_NUM_LASERS_TOTAL DO
//	FOR task.internal.rackNumber := 1 TO MACHINE_NUM_LASER_RACKS  DO
//		FOR task.internal.laserNumber := 1 TO MACHINE_NUM_LASERS_PER_RACK  DO
//			IF gmapRackLaser_to_Pixel[task.internal.rackNumber,task.internal.laserNumber] = task.internal.pixelLoopNumber THEN
//				gmapPixel_to_Rack[task.internal.pixelLoopNumber] := task.internal.rackNumber;
//				gmapPixel_to_Laser[task.internal.pixelLoopNumber] := task.internal.laserNumber;
//			END_IF
//		END_FOR
//	END_FOR
//END_FOR	
FOR task.internal.clearListPixelNumber := 0 TO MACHINE_NUM_LASERS_TOTAL-1 DO
	pixelIgnoreList[task.internal.clearListPixelNumber] := FALSE;
END_FOR
StepDone := TRUE;

