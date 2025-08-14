

brsmemset( ADR(task.internal.adjustZaber1), 0, SIZEOF(task.internal.adjustZaber1) );

FOR task.internal.rackNumber := 0 TO MACHINE_MAI_LASER_RACKS  DO
	IF NOT (gVFLCR.status.vfpMap[task.internal.activePixelIndex, 1] = FALSE) THEN
		FOR task.internal.laserNumber := 0 TO MACHINE_MAI_LASERS_PER_RACK  DO
			IF gmapRackLaser_to_Pixel[task.internal.rackNumber,task.internal.laserNumber] = task.internal.activePixelIndex THEN
				task.internal.adjustZaber1.ZaberAbsolutePos_mm := Configuration.zaber1Position + (task.internal.rackNumber * 21) + (task.internal.laserNumber) * OPTICS_BOX_PIXEL_XY_OFFSET) ;
			END_IF
		END_FOR
	END_IF
END_FOR

task.internal.adjustZaber1.ZaberMoveAbsolute := TRUE ;

