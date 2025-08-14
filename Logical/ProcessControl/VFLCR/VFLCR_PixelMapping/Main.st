PROGRAM _INIT
		
	
	subscribePLCOpen(gVFLCR.command.laserRackRemap, 'VFLCR_PixelMapping', task.command.laserRackRemap, task.internal.PLCOpen);
	subscribePLCOpen(gVFLCR.command.forceMappingDone, 'VFLCR_PixelMapping', task.command.forceMappingDone, task.internal.PLCOpen);
	
	registerStateParameters(gVFLCR.status.pixelMappingHeaderInfo, 'VFLCR_PixelMapping', ADR(task.status.fileHeaderInfo), SIZEOF(task.status.fileHeaderInfo));
	
	FOR task.internal.pixelLoopIndex := 0 TO (Configuration.MaxNumberOfPixelsUsed - 1) DO
		
		brsitoa(task.internal.pixelLoopIndex, ADR(task.internal.tempString));
		registerStateBool(gVFLCR.status.pixelMapped, CONCAT('VFLCR_PixelMapping Pixel ', task.internal.tempString), task.status.pixelMapped[task.internal.pixelLoopIndex]);
		
	END_FOR
	
	registerStateBool(gVFLCR.status.remapAlarmActive, 'VFLCR_PixelMapping', task.status.alarmActive);
	registerStateBool(gVFLCR.status.remapEnabled, 'VFLCR_PixelMapping', task.status.enabled);
	registerStateBool(gVFLCR.status.remapActive, 'VFLCR_PixelMapping', task.status.remapActive);
	
	// initialize
	task.internal.dataLength := 1500;// Dummy start value when we do not have a previously opened file. Will be updated after next file open
	task.internal.tempString := '';
	task.internal.offsetRead := 0;
	task.internal.laserNum := 0;
	task.internal.pixelNum := 0;
	task.internal.rackNum := 0;
	task.internal.statusNum := 0;
	task.internal.readingFileHeader := FALSE;
	task.internal.checkNewVersion := FALSE;
	task.internal.tempCharRead := '';
	task.internal.fbOpen.enable := FALSE;
	task.internal.fbOpen();
	task.internal.fbClose.enable := FALSE;
	task.internal.fbClose();
	task.internal.fbReadEx.enable := FALSE;
	task.internal.fbReadEx();
	task.internal.identifier := Pixel;
	task.internal.checkNewVersion := FALSE;
	FOR task.internal.pixelLoopIndex := 0 TO (Configuration.MaxNumberOfPixelsUsed - 1) DO
		task.status.pixelMapped[task.internal.pixelLoopIndex] := FALSE;
	END_FOR
	MACHINE_NUM_LASERS_TOTAL           := 50;
	Configuration.MaxNumberOfPixelsUsed := 50;
	
END_PROGRAM


PROGRAM _CYCLIC
	
	///////////////////////////////////////////////////////////////
	//	API:
	//	Requires:
	//	- Machine name is not the empty string
	//	Commands:
	//	- laserRackRemap			- Remaps the laser rack
	//	Statuses:
	//	- enabled					- Remapping is not inhibited by any laser rack being enabled
	//	- alarmActive				- There is currently a Mapp alarm active
	//	- pixelMappingHeaderInfo	- The header information from the mapping file that was read
	//	- remapActive				- Remapping is in progress
	//	Inhibits:
	//	- laserRackRemap
	///////////////////////////////////////////////////////////////
	
	// Status
	task.status.enabled := stateAllFalse(gVFLCR.inhibit.laserRackRemap, TRUE);
	
	task.status.ready := TRUE;
	
	task.status.allPixelsMapped := stateAllTrue(gVFLCR.status.pixelMapped, FALSE);
	
	// IF Configuration.MaxNumberOfPixelsUsed = 0 THEN
	Configuration.MaxNumberOfPixelsUsed := MACHINE_NUM_LASERS_TOTAL ;
	// END_IF
	
	///////////////////////////////////////////////////////////////
	// Handle interpreting commands that do not require STATE_READY
	///////////////////////////////////////////////////////////////
	IF task.status.ready THEN
		
		// Local lockout 
		IF task.internal.localLockout THEN
			
		// Any of these commands can interrupt others, so they are handled outside the state machine
			
		END_IF
		
	ELSE
		
		// TODO: Tell the user that a command failed if commanded here?
		
		task.internal.PLCOpen.status := PIXELMAP_ERROR;
		task.status.state := STATE_NOT_READY;
		task.internal.localLockout := FALSE;
		
	END_IF
		
	///////////////////////////////////////////////////////////////
	// Handle any canceled commands that are required
	///////////////////////////////////////////////////////////////
	IF task.internal.newCommand THEN
		
		// Abort the previous ATN PLCOpen command
		atnPLCOpenAbort(task.internal.PLCOpen);
		
		// Reset the sequence
		task.status.sequence := SEQUENCE_IDLE;
		
		task.status.remapActive := FALSE;
		
	END_IF
	
	///////////////////////////////////////////////////////////////
	// Handle the current state
	///////////////////////////////////////////////////////////////
	CASE task.status.state OF
	
		STATE_NOT_READY:
		
			task.status.sequence := SEQUENCE_IDLE;
		
			IF task.status.ready THEN
			
				task.status.state := STATE_READY;
			
			END_IF
		
		STATE_READY:
		
			task.status.sequence := SEQUENCE_IDLE;
			
			// TODO: do we want to throw this alarm instantly on startup?
			vfAlarmPersistent(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_SW_MAP_UNDEFINED_AL9203, stateAnyFalse(gVFLCR.status.pixelMapped, TRUE));
			
			// Reset FUB enables
			task.internal.fbOpen.enable := FALSE;
			task.internal.fbClose.enable := FALSE;
			task.internal.fbReadEx.enable := FALSE;
		
			//task.internal.localLockout := FALSE;

			// Handle any commands that require lockout
			IF task.command.laserRackRemap THEN
				
				//IF stateAllFalse(gVFLCR.inhibit.laserRackRemap, TRUE) THEN
					
					task.internal.localLockout := TRUE;
					
					task.status.state := STATE_REMAP;
				
			ELSIF task.command.forceMappingDone THEN
					
				task.status.state := STATE_FORCE_DONE;
			//	ELSE
					
			//		task.internal.PLCOpen.status := ERR_INHIBITED;
					//TODO: generate inhibit message
					
			//	END_IF
				
			END_IF
			
		STATE_FORCE_DONE:
			
			brsmemset(ADR(task.status.pixelMapped), 1, SIZEOF(task.status.pixelMapped));
			task.internal.PLCOpen.status := ERR_OK;
			
			task.status.state := STATE_READY;
		
		STATE_REMAP:
			
			// File present = Remap; File not Found = try to map the next version of the file; Still not found- Alarm

			// Perform remap sequence
			CASE task.status.sequence OF
				SEQUENCE_ERROR:
					
					brsmemset(ADR(gmapRackLaser_to_Pixel), 0, SIZEOF(gmapRackLaser_to_Pixel));
					brsmemset(ADR(gmapPixel_to_Rack), 0, SIZEOF(gmapPixel_to_Rack));
					brsmemset(ADR(gmapPixel_to_Laser), 0, SIZEOF(gmapPixel_to_Laser));
					brsmemset(ADR(task.status.pixelMapped), 0, SIZEOF(task.status.pixelMapped));
					
					//Handle Error
					task.internal.PLCOpen.status := PIXELMAP_ERROR;
					task.status.state := STATE_READY;
					task.status.remapActive := FALSE;

				SEQUENCE_DONE:
					//Handle Done
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
					task.status.remapActive := FALSE;
			
				SEQUENCE_IDLE:
					task.status.sequence := SEQUENCE_START_REMAP;
					task.status.remapActive := TRUE;
					PixelMapSubSequence; // No need to wait for a cycle
					
				ELSE
					
					PixelMapSubSequence;
					
			END_CASE
			
	END_CASE

	///////////////////////////////////////////////////////////////
	// Reset all commands to ensure they don't get buffered
	///////////////////////////////////////////////////////////////

	task.command.laserRackRemap := FALSE;
	task.command.forceMappingDone := FALSE;
	
	task.internal.newCommand := FALSE;
	
	// Keep track of the previous state
	task.internal.previousState := task.status.state;
	
	
	gVFLCR.status.MaxNumberOfPixelsUsed := Configuration.MaxNumberOfPixelsUsed;
	
END_PROGRAM


PROGRAM _EXIT
	
	task.internal.fbOpen.enable := FALSE;
	task.internal.fbOpen();
	task.internal.fbClose.enable := FALSE;
	task.internal.fbClose();
	task.internal.fbReadEx.enable := FALSE;
	task.internal.fbReadEx();
	
END_PROGRAM