task.internal.activePixelIndex := 0; // used to iterate through all pixels during pixel mapping

FOR loopVar := 0 TO MACHINE_MAI_LASERS_TOTAL BY 1 DO
	IF pixelIgnoreList[task.internal.activePixelIndex] = TRUE THEN
		task.internal.activePixelIndex := task.internal.activePixelIndex + 1;
	ELSE
		EXIT;
	END_IF
END_FOR


brsmemset( ADR(task.internal.adjustZaber1), 0, SIZEOF(task.internal.adjustZaber1) );

task.internal.adjustZaber1.ZaberAbsolutePos_mm := Configuration.zaber1Position + ((task.internal.activeZaber1Index+1) * OPTICS_BOX_PIXEL_XY_OFFSET) ;
task.internal.adjustZaber1.ZaberMoveAbsolute := TRUE ;

