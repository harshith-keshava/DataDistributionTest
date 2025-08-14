task.internal.activePixelIndex := task.internal.activePixelIndex + 1;
 
IF task.internal.activePixelIndex >= MACHINE_NUM_LASERS_TOTAL THEN
	IF task.internal.activeZaber1Index < 10 AND task.internal.activeZaber2Index < 10 THEN // 0-10 point reading with 5 being zero offset position and 5 reading on either side
		// reset pixel iterator
		task.internal.activePixelIndex := 0;
		endPixelIteration := TRUE;
		task.internal.activeZaber1Index := task.internal.activeZaber1Index + 1;
		task.internal.currentZaber1Height := task.internal.activeZaber1Index - 1;
		endTest := FALSE;
	ELSIF task.internal.activeZaber1Index >= 10 AND task.internal.activeZaber2Index < 10 THEN
		task.internal.activePixelIndex := 0;
		endZaber1Iteration := TRUE;
		task.internal.activeZaber2Index := task.internal.activeZaber2Index + 1;
		task.internal.currentZaber2Height := task.internal.activeZaber2Index - 1;
		task.internal.activeZaber1Index := 0;
		endTest := FALSE;	
	ELSE	
		endTest := TRUE;
	END_IF	
ELSE
	endPixelIteration := FALSE;
	endZaber1Iteration := FALSE;
	endTest := FALSE;
END_IF
