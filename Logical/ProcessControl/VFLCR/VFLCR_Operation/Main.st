
PROGRAM _INIT
	
	//brsitoa(Configuration.rackIndex + 1, ADR(moduleName));
	moduleName := CONCAT('VF-LCR Rack ', moduleName);
		

	subscribePLCOpenWithParameters(gVFLCR.command.openLayer, moduleName, ADR(task.internal.openLayerCommandParameters), SIZEOF(task.internal.openLayerCommandParameters),task.command.openLayer, task.internal.PLCOpenOpenLayer);
	subscribePLCOpen(gVFLCR.command.abortLayer, moduleName, task.command.abortLayer, task.internal.PLCOpenAbortLayer);
	
	subscribePLCOpen(gVFLCR.command.deleteLaserControlFiles, moduleName, task.command.deleteLaserControlFiles, task.internal.PLCOpenDeleteLaserControlFiles);

	task.internal.abortLayerTON.PT := T#5s;
	task.internal.deleteLaserControlFilesTON.PT := T#5s;
	task.internal.openLayerTON.PT := T#5s;
	
	
END_PROGRAM

PROGRAM _CYCLIC
	///////////////////////////////////////////////////////////////
	// API:
	//	Requires:
	//	- Rack to be enabled and communicating on Powerlink
	//	Commands:
	//	- enableDCPower 			- Turns on DC power supplies
	//	- disableDCPower 			- Turns off DC power supplies
	//	- enableLaserPower 			- Turns on laser power; requires power supplies to be on AND safety to be OK/enabling
	//	- disableLaserPower 		- Turns off laser power
	//	- enableLaserEmission 		- Turns on laser emission; requires laser power
	//	- disableLaserEmission 		- Turns off laser emission
	//	- resetHardwareError 		- Resets any hardware errors that exist; requires hardware errors to exist
	//	- checkActivePixels 		- Checks whether any of the loaded build's active pixels correspond to ignored lasers
	//	- startManualPulse 			- Starts a manual pulse sequence (local interface only)
	//	- abortManualPulse 			- Aborts a manual pulse sequence (local interface only) // TODO: should this be made globally available?
	//	- enableAutoMode 			- Enables auto mode
	//	- enableManualMode 			- Enables manual mode
	//	- openLayer 				- Opens a layer
	//	- abortLayer 				- Aborts a layer
	//	- resetSoftwareError 		- Resets any software errors that exist
	//	- deleteLaserControlFiles 	- Deletes laser control files from the VF-LCR system
	//	- deleteLUTFiles 			- Deletes calibration LUT files from the VF-LCR system
	//	- transferLUTFiles 			- Transfers calibration LUT files to the VF-LCR system
	//	Statuses:
	//	- laserSafetyEnabled 	- Laser system safety is OK/enabling
	//	- dcPowerEnabled 		- Power supplies are on
	//	- laserPowerEnabled 	- Laser power is on
	//	- laserEmissionEnabled 	- Laser emission is on
	//	- powerSupplyError 		- Any active power supply has any error
	//	- laserWatchdogError 	- Any laser signaled a "watchdog" error
	//	- laserHardwareError 	- Any laser fails powering or emission, or is not ready
	//	- laserFatalError 		- Any laser signaled a "fatal" error; [Not Implemented] more information is available
	//	- commsError 			- Communication with the VF-LCR over Powerlink has failed
	//	- error 				- An error exists. See other error statuses for details.
	//	- alarmLaserRack 		- Which rack caused the alarm (integer type)
	//	- rackIgnored 			- This rack is not being used
	//	- manualPulseActive 	- The manual pulse sequence is currently being run
	//	- OMSModeEnabled 		- OMS mode is enabled for manual pulse operation
	//	- manualModeEnabled 	- This rack is in manual mode (i.e. allows manual operation)
	//	- invalidPixelUsage 	- An active pixel of the loaded build corresponds to an ignored laser on this rack
	//	Inhbitits:
	//	- dcPower
	//	- laserPower
	//	- laserEmission
	//	- manualPulse
	///////////////////////////////////////////////////////////////
	
	// Setting snippet here is OK because no other task class uses gLaserSnippets
	gLaserSnippets.rackNumber := Configuration.rackIndex + 1;
	
	IF gSimulation THEN
		SimulateIO;
	END_IF
	
	//this is redundant with the safety program but its good to do it here esp for integration tests//todo
	//IF stateAnyFalse(gSafetyApi.status.EveryInterlockClosed, FALSE) AND task.status.dcPowerEnabled THEN
	//	task.command.disableDCPower := TRUE;
	//END_IF
	
	//Abort laser emission if O2 spikes above 2%
	
	
	// Read in external components
	ReadInputIO;
	
	
	IF gSimulation THEN
		SimulateIO;
	END_IF
	
	task.status.manualPulseStatus.safePowerLevel := REAL_TO_UINT(UINT_TO_REAL(VFLCR_POWER_COMMAND_RESOLUTION) * task.parameters.manualPulseParameters.safePowerLimit_W / task.parameters.manualPulseParameters.availableLaserPower_W);
	
	IF task.internal.parameters.SelectedLaserIndex <= VFLCR_MAI_LASERS THEN
		task.status.manualPulseStatus.feedbackPower_W := REAL_TO_UINT(UINT_TO_REAL(IO.ai.LaserPowerMonitor[task.internal.parameters.SelectedLaserIndex]) * task.parameters.manualPulseParameters.availableLaserPower_W / 65535.0);
	ELSE
		task.status.manualPulseStatus.feedbackPower_W := 0;
	END_IF
	
	task.parameters.manualPulseParameters.pulseOnTime_ms := LIMIT(1, task.parameters.manualPulseParameters.pulseOnTime_ms, 15000); // Pulse time longer than 15 seconds causes a watchdog error
	
	// Set mode status
	task.status.autoModeEnabled := IO.di.ModeEnabled_AUTO;
	task.status.manualModeEnabled := IO.di.ModeEnabled_MANUAL;
	
	// Read external states
	task.status.ready := TRUE;
	
	// TODO: Uncomment IO when it gets mapped
	task.status.laserSafetyEnabled :=  TRUE ;// AND IO.di.LaserSafetyInterlockOK;  #todo
	task.status.rackAvailable := stateAllFalse(gVFLCR.status.remapActive, TRUE) AND stateAllFalse(gVFLCR.status.remapAlarmActive, TRUE);
	
	//Pixel Map can happen in any Rack State - doesnt actually require any rack communications
	IF task.command.checkActivePixels THEN	
		task.status.invalidPixelUsage := FALSE;
		FOR pixelIndex := 0 TO MACHINE_MAI_LASERS_TOTAL DO	
			// If the gmap arrays are invalid, PixelMapping already threw an error, so we don't need to additionally check that here
			// NOTE: BuildInstanceInfo.active_pixels[] is a 1-based array, so add 1 to the pixelIndes
			IF  gmapPixel_to_Rack[pixelIndex] = Configuration.rackIndex THEN	
				laserIndex := gmapPixel_to_Laser[pixelIndex];	
				IF Configuration.ignoreLaser[laserIndex] THEN	
					gLaserSnippets.laserNumber := laserIndex + 1;
					gLaserSnippets.pixelNumber := pixelIndex + 1;	
					vfAlarmEdge(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_PM_IGNORED_PIXEL_AL9307);
					task.status.invalidPixelUsage := TRUE;	
				END_IF	
			END_IF	
		END_FOR
		IF task.status.invalidPixelUsage THEN	
			task.internal.PLCOpenPixelCheck.status := VFLCR_ERROR;	
		ELSE	
			task.internal.PLCOpenPixelCheck.status := ERR_OK;	
		END_IF	
	END_IF
	

	
	task.status.rackIgnored := Configuration.ignoreRack;
	
	IF task.status.rackIgnored THEN
		// Clear out everything and don't do most things
		
		// Any commands get finished immediately if the rack is ignored
		task.internal.PLCOpenEnableLaserEmission.status := 		ERR_OK;
		task.internal.PLCOpenEnableLaserPower.status := 			ERR_OK;
		task.internal.PLCOpenEnableDCPower.status := 				ERR_OK;
		task.internal.PLCOpenManualPulse.status := 				ERR_OK;
		task.internal.PLCOpenDeleteLaserControlFiles.status := 	ERR_OK;
		task.internal.PLCOpenDeleteLUTFiles.status := 			ERR_OK;
		task.internal.PLCOpenAbortLayer.status := 				ERR_OK;
		task.internal.PLCOpenDisableDCPower.status := 			ERR_OK;
		task.internal.PLCOpenDisableLaserEmission.status := 		ERR_OK;
		task.internal.PLCOpenEnableAutoMode.status := 			ERR_OK;
		task.internal.PLCOpenEnableManualMode.status := 			ERR_OK;
		task.internal.PLCOpenEnableManualMode.status := 			ERR_OK;
		task.internal.PLCOpenOpenLayer.status := 					ERR_OK;
		
		// Reset persistent alarms
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_HEARTBEAT_ERROR_AL9100, 	FALSE, task.internal.alarmID.AL9100);
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_SW_LUT_LOAD_FAIL_AL9202, 	FALSE, task.internal.alarmID.AL9202);
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_SUPPLY_FAN_FAIL_AL9104, 	FALSE, task.internal.alarmID.AL9104);
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_SUPPLY_OVERTEMP_AL9105, 	FALSE, task.internal.alarmID.AL9105);
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_SUPPLY_AC_LOW_AL9106, 	FALSE, task.internal.alarmID.AL9106);
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_SUPPLY_DC_FAIL_AL9107, 	FALSE, task.internal.alarmID.AL9107);
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_LASER_READY_FAIL_AL9109, FALSE, task.internal.alarmID.AL9109);
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_LASER_MAIN_POWER_AL9110, FALSE, task.internal.alarmID.AL9110);
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_LASER_EMISSION_AL9111, 	FALSE, task.internal.alarmID.AL9111);
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_LASER_FATAL_AL9112, 		FALSE, task.internal.alarmID.AL9112);
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_LASER_WATCHDOG_AL9113, 	FALSE, task.internal.alarmID.AL9113);
		
		// Clear IO
		// IO.raw outputs get set by these variables, so clearing these is good enough
		brsmemset(ADR(IO.do), 0, SIZEOF(IO.do));
		brsmemset(ADR(IO.ao), 0, SIZEOF(IO.ao));
		
		// Reset statuses/internals that aren't checked every cycle
		task.status.commsOK := TRUE;
		task.status.commsError := FALSE;
		task.internal.systemHearbeatPrevious := 65535;
		
		// Reset FUB inputs that aren't set where they're called
		task.internal.delayTON.IN := FALSE;
		task.internal.pulseFub.Enable := FALSE;
		
		// Handle state/status
		task.status.state := STATE_NOT_READY;
		task.status.sequence := SEQUENCE_IDLE;
		task.status.message := 'Rack Ignored';
		task.status.ready := FALSE;
		
	ELSE
		// Standard laser rack operation
		
		///////////////////////////////////////////////////////////////
		// Watchdog functionality
		///////////////////////////////////////////////////////////////
		// Check for VF-LCR heartbeat once every 25.6ms = 25600 us
		scanMicrosec := scanMicrosec + RTInfo_0.cycle_time;
		IF scanMicrosec >= 25600 THEN
			scanMicrosec := 0;
			
			IF NOT(IO.di.PowerlinkModuleOK) THEN
				
				// No heartbeat at all; error
				task.status.commsOK := FALSE;
				task.status.commsError := TRUE;
				task.internal.systemHearbeatPrevious := 65535;
				
			ELSE
				
				// Heartbeat must have changed, otherwise error
				task.status.commsOK := (IO.ai.SystemHeartbeat <> task.internal.systemHearbeatPrevious);
				task.status.commsError := (IO.ai.SystemHeartbeat = task.internal.systemHearbeatPrevious) OR IO.di.HeartbeatError[0];
				task.internal.systemHearbeatPrevious := IO.ai.SystemHeartbeat;
				
			END_IF
			
			vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_HEARTBEAT_ERROR_AL9100, task.status.commsError, task.internal.alarmID.AL9100);
			
		END_IF
		
		IF task.status.commsOK THEN
			
			// Determine whether all lasers are disabled
			allLasersDisabled := TRUE;
			FOR index := 0 TO VFLCR_MAI_LASERS DO
				IF NOT(Configuration.ignoreLaser[index]) THEN
					allLasersDisabled := FALSE;
				END_IF
			END_FOR
			
			// If all lasers in the rack are disabled, but the rack itself is still enabled, ignore the rack's layerOpen flag for the purpose of the overall layerOpen check
			task.status.layerOpen := allLasersDisabled OR IO.di.LayerOpen;
			task.status.readyToPrint := task.status.dcPowerEnabled AND task.status.laserEmissionEnabled AND task.status.laserPowerEnabled AND (task.status.autoModeEnabled);
			
			// If the current loop's LCR is not ready to print, its name will be obtained via stateFalseStatus where the relevant error is thrown
			
		ELSIF task.status.commsError THEN
			// VF-LCR communications have failed for an enabled rack...
			task.status.layerOpen := FALSE;
			task.status.readyToPrint := FALSE;
			
		ELSE // This rack is disabled, i.e. all lasers are disabled
			
			// Set statuses to enabling
			task.status.layerOpen := TRUE;
			task.status.readyToPrint := TRUE;
			
		END_IF
		
		vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_SW_LUT_LOAD_FAIL_AL9202, IO.di.LUTFiles_LoadFailure, task.internal.alarmID.AL9202);
		
		// Power supplies
		task.status.powerSupplyError := FALSE;
		FOR index :=0 TO VFLCR_MAI_POWER_SUPPLIES DO
			gLaserSnippets.supplyNumber := index + 1;
			
			// HACK: Require this input to go false for a few scans before alarming [due to transient noise issue].
			IF task.status.dcPowerEnabled AND NOT(Configuration.ignoreSupply[index]) AND NOT(IO.di.LaserPowerSupplyDCOK[index]) THEN
				task.internal.powerSupplyNotOKCount[index] := task.internal.powerSupplyNotOKCount[index] + 1;
			ELSE
				task.internal.powerSupplyNotOKCount[index] := 0;
			END_IF
			
			vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_SUPPLY_FAN_FAIL_AL9104, 	task.status.dcPowerEnabled AND NOT(Configuration.ignoreSupply[index]) AND IO.di.LaserPowerSupplyFanFailure[index], task.internal.alarmID.AL9104);
			vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_SUPPLY_OVERTEMP_AL9105, 	task.status.dcPowerEnabled AND NOT(Configuration.ignoreSupply[index]) AND IO.di.LaserPowerSupplyOverTemp[index], task.internal.alarmID.AL9105);
			vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_SUPPLY_AC_LOW_AL9106, 	task.status.dcPowerEnabled AND NOT(Configuration.ignoreSupply[index]) AND IO.di.LaserPowerSupplyACLow[index], task.internal.alarmID.AL9106);
			vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_SUPPLY_DC_FAIL_AL9107, 	task.internal.powerSupplyNotOKCount[index] > 3, task.internal.alarmID.AL9107);
			
			IF ( task.status.dcPowerEnabled AND NOT(Configuration.ignoreSupply[index]) AND (IO.di.LaserPowerSupplyFanFailure[index] OR IO.di.LaserPowerSupplyOverTemp[index] OR IO.di.LaserPowerSupplyACLow[index] OR task.internal.powerSupplyNotOKCount[index] > 3) ) THEN
				task.status.powerSupplyError := TRUE;
			END_IF
			
		END_FOR
		
		// Lasers
		task.status.laserFatalError := FALSE;
		task.status.laserWatchdogError := FALSE;
		task.status.laserHardwareError := FALSE;
		FOR index :=0 TO MACHINE_MAI_LASERS_PER_RACK DO
			
			gLaserSnippets.laserNumber := index + 1;
			gLaserSnippets.pixelNumber := gmapRackLaser_to_Pixel[Configuration.rackIndex, index] + 1;
			gLaserSnippets.additionalInfoLaserFatal := '';
			
			IF (IO.di.LaserWatchdogError[index]) THEN
				brsstrcat(ADR(gLaserSnippets.additionalInfoLaserFatal),ADR('Watchdog Error, check pulse configuration or laser control files '));
			END_IF
			
			IF (IO.ai.DMAStatus[index].2) THEN
				brsstrcat(ADR(gLaserSnippets.additionalInfoLaserFatal),ADR('DMA Descriptor overrun '));
			END_IF
			
			IF (IO.ai.DMAStatus[index].3) THEN
				brsstrcat(ADR(gLaserSnippets.additionalInfoLaserFatal),ADR('DMA Parity Error '));
			END_IF
			
			IF (IO.ai.DMAStatus[index].4) THEN
				brsstrcat(ADR(gLaserSnippets.additionalInfoLaserFatal),ADR('Laser Packet Format Error '));
			END_IF
			
			IF (IO.ai.DMAStatus[index].5) THEN
				brsstrcat(ADR(gLaserSnippets.additionalInfoLaserFatal),ADR('Laser FIFO Error '));
			END_IF
			
			IF (IO.ai.DMAStatus[index].6) THEN
				brsstrcat(ADR(gLaserSnippets.additionalInfoLaserFatal),ADR('Position Error '));
			END_IF
			
			IF (gLaserSnippets.additionalInfoLaserFatal = '') THEN
				gLaserSnippets.additionalInfoLaserFatal := 'Fatal error cause unknown, consult the VFLCR User Guide for Troubleshooting Instructions';
			END_IF
			
			// Set alarms
			vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_LASER_READY_FAIL_AL9109, 	NOT(IO.di.LaserReady[index]) AND NOT(Configuration.ignoreLaser[index]), task.internal.alarmID.AL9109);
			vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_LASER_MAIN_POWER_AL9110, 	task.status.laserPowerEnabled AND NOT(IO.di.LaserMainPowerStarted[index]) AND NOT(Configuration.ignoreLaser[index]), task.internal.alarmID.AL9110);
			vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_LASER_EMISSION_AL9111, 	task.status.laserEmissionEnabled AND NOT(IO.di.LaserEmissionOn[index]) AND NOT(Configuration.ignoreLaser[index]), task.internal.alarmID.AL9111);
			vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_LASER_FATAL_AL9112, 		IO.di.LaserFatalError[index] AND NOT(Configuration.ignoreLaser[index]), task.internal.alarmID.AL9112);
			vfAlarmPersistentId(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_HW_LASER_WATCHDOG_AL9113, 	IO.di.LaserWatchdogError[index] AND NOT(Configuration.ignoreLaser[index]), task.internal.alarmID.AL9113);
			
			// Set statuses
			IF NOT(Configuration.ignoreLaser[index]) THEN
				
				IF IO.di.LaserFatalError[index] THEN
					task.status.laserFatalError := TRUE;
				END_IF
				
				IF IO.di.LaserWatchdogError[index] THEN
					task.status.laserWatchdogError := TRUE;
				END_IF
				
				IF NOT(IO.di.LaserReady[index]) OR (task.status.laserPowerEnabled AND NOT(IO.di.LaserMainPowerStarted[index])) OR (task.status.laserEmissionEnabled AND NOT(IO.di.LaserEmissionOn[index])) THEN
					task.status.laserHardwareError := TRUE;
				END_IF
				
			END_IF
			
			
		END_FOR
		
		
		
		// TODO: does the disable cmd work if comms have errored? is it benign?
		task.internal.disableDCCondition := task.status.powerSupplyError OR task.status.commsError OR NOT(task.status.laserSafetyEnabled) OR gHighTempOrLowFlowLaserPowerOff  ;
		task.internal.disableLaserCondition := task.status.error OR NOT(task.status.laserSafetyEnabled);
		
		IF task.internal.disableDCCondition AND NOT(task.internal._disableDCCondition) THEN
			
			task.command.disableDCPower := TRUE;
			
			IF NOT(task.status.chillerIsRunning) THEN
				vfAlarmEdge(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_DISABLE_CHILLER_RUN_AL9208);
			END_IF
			
			IF task.status.opticsBoxFlowLow THEN
				vfAlarmEdge(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_DISABLE_OB_FLOW_LOW_AL9209);
			END_IF
				
		ELSIF task.internal.disableLaserCondition AND NOT(task.internal._disableLaserCondition) THEN
			
			task.command.disableLaserPower := TRUE;
			
		END_IF
		
		
		// Inhibit enable commands if any of the following is true:
		// 1) There is any error that causes the relevant component to shut off
		// 2) The required power source is not yet enabled (ex. laser power requires DC power)
		// 3) The component that would be enabled is already enabled (avoid repeat commands)
		task.inhibit.dcPower := task.internal.disableDCCondition OR task.status.dcPowerEnabled  ;
		task.inhibit.laserPower := task.internal.disableLaserCondition OR task.internal.disableDCCondition OR NOT(task.status.dcPowerEnabled) OR task.status.laserPowerEnabled;
		task.inhibit.laserEmission := task.internal.disableLaserCondition OR task.internal.disableDCCondition OR NOT(task.status.laserPowerEnabled) OR task.status.laserEmissionEnabled;
		
		
		///////////////////////////////////////////////////////////////
		// Handle interpreting commands that do not require STATE_READY
		///////////////////////////////////////////////////////////////
		IF task.status.ready THEN
			
			// This command goes to all racks and gets filtered. 
			// Convert it to a non rack command to be handled normally
			IF task.command.startManualPulseRack THEN
				
				
				IF task.internal.PLCOpenManualPulse.parametersWritten THEN

					IF task.internal.manualPulseCommandParameters.selection.Rack = Configuration.rackIndex THEN
						
						//It is this rack
						task.parameters.manualPulseParameters := task.internal.manualPulseCommandParameters.parameters;
						task.parameters.SelectedLaserIndex := task.internal.manualPulseCommandParameters.selection.Laser;
						
						IF task.parameters.SelectedLaserIndex < MACHINE_NUM_LASERS_PER_RACK THEN
							task.command.startManualPulse := TRUE;
						ELSE
							//Laser is not valid
							task.internal.alarmText := 'Manual pulse inhibited, selected laser is not valid';
							vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_SW_COMMAND_INHIBIT_AL9207, task.internal.alarmText);
							task.internal.PLCOpenManualPulse.status := VFLCR_ERROR;
						END_IF
						
					ELSIF task.internal.manualPulseCommandParameters.selection.Rack <= MACHINE_MAI_LASER_RACKS THEN
						// It is some other rack
						task.internal.PLCOpenManualPulse.status := ERR_OK;
					ELSE
						// Rack is not valid
						// All racks will see this bad parameter, but only one alarm should be thrown
						IF Configuration.rackIndex = 0 THEN
							task.internal.alarmText := 'Manual pulse inhibited, selected rack is not valid';
							vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_SW_COMMAND_INHIBIT_AL9207, task.internal.alarmText);
						END_IF
						task.internal.PLCOpenManualPulse.status := VFLCR_ERROR;
					END_IF
				ELSE
					// We need parameters written
					task.internal.alarmText := 'Manual pulse inhibited, parameters were not written';
					vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_SW_COMMAND_INHIBIT_AL9207, task.internal.alarmText);
					task.internal.PLCOpenManualPulse.status := VFLCR_ERROR;
				END_IF
			END_IF
			
			// These commands can run while enables are locked out
			IF task.command.disableDCPower THEN
				
				task.internal.newCommand := TRUE;
				
				// Also disable laser power and emission and abort manual pulse
				task.command.disableLaserPower := TRUE;
				task.command.disableLaserEmission := TRUE;
				task.command.abortManualPulse := TRUE;
				
				// Implemented in one cycle, so no state
				
			END_IF
			
			IF task.command.disableLaserPower THEN
				
				task.internal.newCommand := TRUE;
				
				// Also disable emission and abort manual pulse
				task.command.disableLaserEmission := TRUE;
				task.command.abortManualPulse := TRUE;
				
				// Implemented in one cycle, so no state
				
			END_IF
			
			IF task.command.disableLaserEmission THEN
				
				task.internal.newCommand := TRUE;
				
				// Also abort manual pulse
				task.command.abortManualPulse := TRUE;
				
				// Implemented in one cycle, so no state
				
			END_IF
			
			IF task.command.abortManualPulse THEN
				
				task.internal.newCommand := TRUE;
				
				// Implemented in one cycle, so no state
				
			END_IF
			
			IF task.command.deleteLaserControlFiles THEN
				task.internal.newCommand := TRUE;
			END_IF
			
			IF task.command.deleteLUTFiles THEN
				task.internal.newCommand := TRUE;
			END_IF
			
			
			IF task.internal.localLockout THEN
				
				// Don't take in commands
				
			ELSE
				
				IF task.command.enableDCPower THEN
					
					task.internal.newCommand := TRUE;
					
					task.status.state := STATE_ENABLE_DC_POWER;
					
				END_IF
				
				IF task.command.enableLaserPower THEN
					
					task.internal.newCommand := TRUE;
					
					task.status.state := STATE_ENABLE_LASER_POWER;
					
				END_IF
				
				IF task.command.enableLaserEmission THEN
					
					task.internal.newCommand := TRUE;
					
					task.status.state := STATE_ENABLE_LASER_EMISSION;
					
				END_IF
				
				IF task.command.startManualPulse THEN
					
					task.internal.newCommand := TRUE;
					
					task.status.state := STATE_MANUAL_PULSE;
					
					task.internal.parameters := task.parameters;
					
				END_IF
				
				IF task.command.startPulse THEN
					
					task.internal.newCommand := TRUE;
					
					task.status.state := STATE_START_PULSE;
					
				END_IF
				
				IF task.command.stopPulse THEN
					
					task.internal.newCommand := TRUE;
					
					task.status.state := STATE_STOP_PULSE;
					
				END_IF
				
			END_IF
			
		ELSE // Not ready
			
			// TODO: Tell the user that a command failed if commanded here?
			
			task.internal.PLCOpenEnableLaserEmission.status := VFLCR_ERROR;
			task.internal.PLCOpenEnableLaserPower.status := VFLCR_ERROR;
			task.internal.PLCOpenEnableDCPower.status := VFLCR_ERROR;
			task.internal.PLCOpenManualPulse.status := VFLCR_ERROR;
			
			task.status.state := STATE_NOT_READY;
			task.internal.localLockout := FALSE;
			
		END_IF
		
		///////////////////////////////////////////////////////////////
		// Handle any canceled commands that are required
		///////////////////////////////////////////////////////////////
		IF task.internal.newCommand THEN
			
			// Reset manual pulse vars
			IO.do.ManualPulseTrigger := 16#00;
			task.status.manualPulseActive := FALSE;
			task.status.manualPulseStatus.maxFeedbackPower_W := 0;
			task.status.manualPulseStatus.currentStep := 0;
			
			// Inhibits
			CASE task.status.state OF
				STATE_ENABLE_DC_POWER:
					
					IF isInhibited(gVFLCR.inhibit.dcPower) OR task.inhibit.dcPower THEN
						
						task.internal.PLCOpenEnableDCPower.status := ERR_INHIBITED;
						task.status.state := STATE_READY;
						
					task.internal.alarmText := 'DC Power inhibited';
					vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_SW_COMMAND_INHIBIT_AL9207, task.internal.alarmText);
						
					END_IF
					
				STATE_ENABLE_LASER_POWER:
					
					IF isInhibited(gVFLCR.inhibit.laserPower) OR task.inhibit.laserPower THEN
						
						task.internal.PLCOpenEnableLaserPower.status := ERR_INHIBITED;
						task.status.state := STATE_READY;
						
						task.internal.alarmText := 'Laser Power inhibited';
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_SW_COMMAND_INHIBIT_AL9207, task.internal.alarmText);
						
					END_IF
					
				STATE_ENABLE_LASER_EMISSION:
					
					IF isInhibited(gVFLCR.inhibit.laserEmission) OR task.inhibit.laserEmission THEN
						
						task.internal.PLCOpenEnableLaserEmission.status := ERR_INHIBITED;
						task.status.state := STATE_READY;
						
						task.internal.alarmText := 'Laser Emission inhibited';
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_SW_COMMAND_INHIBIT_AL9207, task.internal.alarmText);
						
					END_IF
					
				STATE_MANUAL_PULSE:
					
					IF isInhibited(gVFLCR.inhibit.manualPulse) OR NOT(IO.di.LUTFiles_LoadSuccess)
						OR task.internal.parameters.SelectedLaserIndex > VFLCR_MAI_LASERS
						OR NOT(task.status.manualModeEnabled) THEN
						
						task.internal.PLCOpenManualPulse.status := ERR_INHIBITED;
						task.status.state := STATE_READY;
						
						task.internal.alarmText := 'Manual pulse inhibited';
						
						IF isInhibited(gVFLCR.inhibit.manualPulse) THEN
							task.internal.alarmText := CONCAT(task.internal.alarmText, ', ATN inhibit');
						END_IF
						
						IF task.internal.parameters.SelectedLaserIndex > VFLCR_MAI_LASERS THEN
							task.internal.alarmText := CONCAT(task.internal.alarmText, ', bad index');
						END_IF
						
						IF NOT(IO.di.LUTFiles_LoadSuccess) THEN
							task.internal.alarmText := CONCAT(task.internal.alarmText, ', LUT not loaded');
						END_IF
						
						IF NOT(task.status.manualModeEnabled) THEN
							task.internal.alarmText := CONCAT(task.internal.alarmText, ', manual mode disabled');
						END_IF
						
						vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.VFLCR_SW_COMMAND_INHIBIT_AL9207, task.internal.alarmText);
						
					END_IF
				
			END_CASE
			
			IF task.internal.PLCOpenEnableLaserEmission.status = ERR_INHIBITED THEN
				
			ELSIF task.internal.PLCOpenEnableLaserPower.status = ERR_INHIBITED THEN
				
			ELSIF task.internal.PLCOpenEnableDCPower.status = ERR_INHIBITED THEN
				
			ELSE
				
				// Reset sequence
				task.status.sequence := SEQUENCE_IDLE;
				
			END_IF
			
		END_IF
		
		///////////////////////////////////////////////////////////////
		// Handle IO commands
		///////////////////////////////////////////////////////////////
		// AUTO and MANUAL mode are mutually-exclusive; MANUAL mode wins if both are requested simultaneously.
		IF task.command.enableManualMode THEN
			
			IO.do.EnableMode_MANUAL := TRUE;
			task.internal.PLCOpenEnableAutoMode.status := ERR_INHIBITED;
			
		ELSIF task.command.enableAutoMode THEN
			
			IO.do.EnableMode_MANUAL := FALSE;
			task.internal.PLCOpenEnableManualMode.status := ERR_INHIBITED;
			
		END_IF
		
		IF IO.di.ModeEnabled_MANUAL THEN
			
			task.internal.PLCOpenEnableManualMode.status := ERR_OK;
			
		ELSIF task.internal.enableManualModeTON.Q THEN
			
			task.internal.PLCOpenEnableManualMode.status := VFLCR_ERROR;
			
		END_IF
		
		IF IO.di.ModeEnabled_AUTO THEN
			
			task.internal.PLCOpenEnableAutoMode.status := ERR_OK;
			
		ELSIF task.internal.enableAutoModeTON.Q THEN
			
			task.internal.PLCOpenEnableAutoMode.status := VFLCR_ERROR;
			
		END_IF
		
		IF task.command.abortLayer THEN
			
			IO.do.AbortLayer := TRUE;
			
		END_IF
		
		IF IO.di.LayerAborted THEN
			
			IO.do.AbortLayer := FALSE;
			task.internal.PLCOpenAbortLayer.status := ERR_OK;
			
		ELSIF task.internal.abortLayerTON.Q THEN
			
			IO.do.AbortLayer := FALSE;
			task.internal.PLCOpenAbortLayer.status := VFLCR_ERROR;
			
		END_IF
		
		IF task.command.resetSoftwareError THEN
			
			IO.do.ClearLaserErrors := TRUE;
			
		END_IF
		
		IF NOT(task.status.laserFatalError OR task.status.laserWatchdogError) THEN
			
			IO.do.ClearLaserErrors := FALSE;
			task.internal.PLCOpenResetSoftwareError.status := ERR_OK;
			
		ELSIF task.internal.resetSoftwareErrorTON.Q THEN
			
			IO.do.ClearLaserErrors := FALSE;
			task.internal.PLCOpenResetSoftwareError.status := VFLCR_ERROR;
			
		END_IF
		
		IF task.command.transferLUTFiles THEN
			
			IO.do.Transfer_LUTFiles := TRUE;
		
		ELSE
			
			IO.do.Transfer_LUTFiles := FALSE;
				
		END_IF
		
		IF IO.di.LUTFiles_LoadSuccess THEN
			
			IO.do.Transfer_LUTFiles := FALSE;
			task.internal.PLCOpenLoadLUT.status := ERR_OK;
			
		ELSIF task.internal.transferLUTFilesTON.Q THEN
			
			IO.do.Transfer_LUTFiles := FALSE;
			task.internal.PLCOpenLoadLUT.status := VFLCR_ERROR;
			
		END_IF
		
		IF task.command.deleteLaserControlFiles THEN
			
			IO.do.Delete_LaserControlFiles := TRUE;
			
		END_IF
		
		IF IO.di.LaserControlFiles_Deleted THEN
			
			IO.do.Delete_LaserControlFiles := FALSE;
			task.internal.PLCOpenDeleteLaserControlFiles.status := ERR_OK;
			
		ELSIF task.internal.deleteLaserControlFilesTON.Q THEN
			
			IO.do.Delete_LaserControlFiles := FALSE;
			task.internal.PLCOpenDeleteLaserControlFiles.status := VFLCR_ERROR;
			
		END_IF
		
		IF task.command.deleteLUTFiles THEN
			
			IO.do.Delete_LUTFiles := TRUE;
			
		END_IF
		
		IF IO.di.LUTFiles_Deleted THEN
			
			IO.do.Delete_LUTFiles := FALSE;
			task.internal.PLCOpenDeleteLUTFiles.status := ERR_OK;
			
		ELSIF task.internal.deleteLUTFilesTON.Q THEN
			
			IO.do.Delete_LUTFiles := FALSE;
			task.internal.PLCOpenDeleteLUTFiles.status := VFLCR_ERROR;
			
		END_IF
		
		IF task.command.openLayer THEN
			
			IF task.internal.PLCOpenOpenLayer.parametersWritten THEN
				task.parameters.openLayerParameters := task.internal.openLayerCommandParameters.parameters;
				
				IF (task.parameters.openLayerParameters.selectedBuildLayout > 0) AND (task.parameters.openLayerParameters.selectedPrintNumber > 0) AND NOT (IO.di.LayerOpen) THEN
					IO.do.OpenLayer := TRUE;
				ELSE
					IO.do.OpenLayer := FALSE;
					task.internal.PLCOpenOpenLayer.status := VFLCR_ERROR;
				END_IF
			ELSE
				// we need pars
				task.internal.PLCOpenOpenLayer.status := VFLCR_ERROR;
			END_IF
			
		END_IF
		
		IF IO.di.LayerOpen THEN
			
			// Unlike other commands, IO.do.OpenLayer must stay set after a success (while the layer is open)
			task.internal.PLCOpenOpenLayer.status := ERR_OK;
			
		ELSIF task.internal.openLayerTON.Q THEN
			
			// Timeout cancels the command, so lower IO
			IO.do.OpenLayer := FALSE;
			task.internal.PLCOpenOpenLayer.status := VFLCR_ERROR;
			
		END_IF
		
		// Check for layer not being open
		// EDGEPOS must be first so its internal fub always runs
		IF EDGEPOS(IO.di.LayerClosed OR IO.di.LayerAborted OR IO.di.LayerError OR NOT(IO.di.LUTFiles_LoadSuccess)) OR task.command.abortLayer THEN
			
			IO.do.OpenLayer := FALSE;
			task.internal.PLCOpenOpenLayer.status := VFLCR_ERROR;
			
		END_IF
		
		IF task.command.disableDCPower THEN
			
			brsmemset(ADR(IO.do.LaserPowerSupply), 0, SIZEOF(IO.do.LaserPowerSupply));
			
			task.status.dcPowerEnabled := FALSE;
			
			task.internal.PLCOpenDisableDCPower.status := ERR_OK;
			
			CASE task.status.state OF
				STATE_ENABLE_DC_POWER,
				STATE_ENABLE_LASER_POWER,
				STATE_ENABLE_LASER_EMISSION,
				STATE_MANUAL_PULSE:
					
					task.internal.PLCOpenEnableDCPower.status := ERR_INHIBITED;
					task.internal.PLCOpenEnableLaserPower.status := ERR_INHIBITED;
					task.internal.PLCOpenEnableLaserEmission.status := ERR_INHIBITED;
					task.internal.PLCOpenManualPulse.status := ERR_INHIBITED;
					
					task.status.state := STATE_READY;
				
			END_CASE
			
		END_IF
		
		IF task.command.disableLaserPower THEN
			
			brsmemset(ADR(IO.do.EnableLaserPower), 0, SIZEOF(IO.do.EnableLaserPower));
			
			task.status.laserPowerEnabled := FALSE;
			task.status.coolingRequired := FALSE;
			
			task.internal.PLCOpenDisableLaserPower.status := ERR_OK;
			
			CASE task.status.state OF
				STATE_ENABLE_LASER_POWER,
				STATE_ENABLE_LASER_EMISSION,
				STATE_MANUAL_PULSE:
					
					task.internal.PLCOpenEnableLaserPower.status := ERR_INHIBITED;
					task.internal.PLCOpenEnableLaserEmission.status := ERR_INHIBITED;
					task.internal.PLCOpenManualPulse.status := ERR_INHIBITED;
					
					task.status.state := STATE_READY;
					
			END_CASE
			
		END_IF
		
		IF task.command.disableLaserEmission THEN
			
			brsmemset(ADR(IO.do.EnableLaserEmissionControl), 0, SIZEOF(IO.do.EnableLaserEmissionControl));
			
			task.status.laserEmissionEnabled := FALSE;
			
			task.internal.PLCOpenDisableLaserEmission.status := ERR_OK;
			
			CASE task.status.state OF
				STATE_ENABLE_LASER_EMISSION,
				STATE_MANUAL_PULSE:
					
					task.internal.PLCOpenEnableLaserEmission.status := ERR_INHIBITED;
					task.internal.PLCOpenManualPulse.status := ERR_INHIBITED;
					
					task.status.state := STATE_READY;
					
			END_CASE
			
		END_IF
		
		IF task.command.abortManualPulse THEN
			
			IF task.internal.parameters.SelectedLaserIndex <= VFLCR_MAI_LASERS THEN
				IO.ao.LaserPowerLevelSP[task.internal.parameters.SelectedLaserIndex] := 0;
			END_IF
			
			task.status.manualPulseActive := FALSE;
			task.internal.PLCOpenManualPulse.status := ERR_OK;
			
			CASE task.status.state OF
				STATE_MANUAL_PULSE:
				
					task.status.state := STATE_READY;
				
			END_CASE
			
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
				
				task.internal.localLockout := FALSE;
				task.internal.triggerFrameDataCollection.Execute := FALSE;
				
				// Handle any commands that require lockout
				IF task.command.resetHardwareError THEN
					
					task.internal.localLockout := TRUE;
					
					task.status.state := STATE_RESET_ERROR;
					
				END_IF
				
				
			STATE_ENABLE_DC_POWER:
				
				CASE task.status.sequence OF
					
					SEQUENCE_ERROR:
						// Handle Error
						task.internal.PLCOpenEnableDCPower.status := VFLCR_ERROR;
						task.status.state := STATE_READY;
						
					SEQUENCE_DONE:
						// Handle Done
						task.internal.PLCOpenEnableDCPower.status := ERR_OK;
						task.status.state := STATE_READY;
						
					SEQUENCE_IDLE:
						
						currentSupply := 0;
						task.status.sequence := SEQUENCE_ENABLE_DC_POWER_START;
						
					ELSE
						
						EnableSuppliesSubSequence;
						
				END_CASE
				
				
			STATE_ENABLE_LASER_POWER:
				
				CASE task.status.sequence OF
					
					SEQUENCE_ERROR:
						// Handle Error
						task.internal.PLCOpenEnableLaserPower.status := VFLCR_ERROR;
						task.status.state := STATE_READY;
						
					SEQUENCE_DONE:
						// Handle Done
						task.internal.PLCOpenEnableLaserPower.status := ERR_OK;
						task.status.state := STATE_READY;
						
					SEQUENCE_IDLE:
						
						currentLaser := 0;
						task.status.sequence := SEQUENCE_ENABLE_LASERS_START;
						
					ELSE
						
						EnableLasersSubSequence;
						
				END_CASE
				
				
			STATE_ENABLE_LASER_EMISSION:
				
				// Enable emission IO all at once
				FOR index := 0 TO VFLCR_MAI_LASERS DO
					IO.do.EnableLaserEmissionControl[index] := NOT(Configuration.ignoreLaser[index]);
				END_FOR
				
				// Wait 3.5s
				task.internal.delayTON.PT := T#3500ms;
				task.internal.delayTON.IN := TRUE;
				
				IF task.internal.delayTON.Q THEN
					
					task.internal.delayTON.IN := FALSE;
					task.status.laserEmissionEnabled := TRUE;
					
					task.internal.PLCOpenEnableLaserEmission.status := ERR_OK;
					task.status.state := STATE_READY;
					
				END_IF
				
				
			STATE_MANUAL_PULSE:
				
				// pulse [and capture if using app], iterate until done
				
				CASE task.status.sequence OF
					
					SEQUENCE_ERROR:
						// Handle Error
						task.internal.PLCOpenManualPulse.status := VFLCR_ERROR;
						task.status.state := STATE_READY;
						
					SEQUENCE_DONE:
						// Handle Done
						task.internal.PLCOpenManualPulse.status := ERR_OK;
						task.status.state := STATE_READY;
						
					SEQUENCE_IDLE:
						
						task.status.sequence := SEQUENCE_MANUAL_PULSE_TRIGGER;
						
					ELSE
						
						ManualPulseSubSequence;
						
				END_CASE	
				
				
			STATE_RESET_ERROR:
				
				FOR index := 0 TO VFLCR_MAI_LASERS DO
					IF (NOT IO.di.LaserReady[index]) AND (NOT Configuration.ignoreLaser[index]) THEN
						IO.do.LaserResetError[index] := FALSE; // TRUE for normal operation; FALSE momentarily to reset error
					END_IF
				END_FOR
				
				// Hold the laser error reset input(s) FALSE for 250ms to affect a reset.
				task.internal.delayTON.PT := T#250ms;
				task.internal.delayTON.IN := TRUE;
				
				IF (task.internal.delayTON.Q) THEN
					
					task.internal.delayTON.IN := FALSE;
					
					// Reset laser error reset input(s)
					FOR index := 0 TO VFLCR_MAI_LASERS DO
						IO.do.LaserResetError[index] := TRUE; // TRUE for normal operation; FALSE momentarily to reset error
					END_FOR
					
					task.status.powerSupplyError := FALSE;
					task.status.laserWatchdogError := FALSE;
					task.status.laserHardwareError := FALSE;
					task.status.laserFatalError := FALSE;
					
					task.internal.PLCOpenResetHardwareError.status := ERR_OK;
					task.status.state := STATE_READY;
					
				END_IF
			
			STATE_START_PULSE:
				
				task.CMM.START_PULSE := TRUE;
				task.internal.PLCOpenStartPulse.status := ERR_OK;
				task.status.state := STATE_READY;
				
			STATE_STOP_PULSE:
						
				task.CMM.STOP_PULSE := TRUE;
				task.internal.PLCOpenStopPulse.status := ERR_OK;
				task.status.state := STATE_READY;
			
		END_CASE
		
	END_IF //rackIgnored
	
	gVFLCR.status.calibrationLUT[Configuration.rackIndex] := IO.ai.LUTFiles_CalibrationID;
	///////////////////////////////////////////////////////////////
	// Call all function blocks
	///////////////////////////////////////////////////////////////
	
	task.internal.delayTON();
	task.internal.delayTON.IN := FALSE;
	
	task.internal.pulseFub.ScanTimeMicrosec := RTInfo_0.cycle_time; // Scan time for this task; used to increment internal ET values each cycle
	task.internal.pulseFub.StartDelay := task.parameters.manualPulseParameters.pulseDelayTime_ms;
	task.internal.pulseFub.PulseOnTime := LIMIT(1, UINT_TO_UDINT(task.parameters.manualPulseParameters.pulseOnTime_ms), 15000); // maximum 15 second pulse; longer results in VF-LCR laser watchdog timeout
	task.internal.pulseFub.PulseOffTime := task.parameters.manualPulseParameters.pulseOffTime_ms;
	task.internal.pulseFub.NumPulses := task.parameters.manualPulseParameters.numPulsesPerLevel;
	task.internal.pulseFub();
	task.internal.pulseFub.Enable := FALSE;
	
	// trigger data collection, forward manual pulse parameters + more to python app and task
	task.internal.triggerDataCollection.Command := gVFLCR.command.triggerDataCollection;
	task.internal.triggerDataCollection.pParameters := ADR(task.internal.dataCollectionParameters);
	task.internal.triggerDataCollection.sParameters := SIZEOF(task.internal.dataCollectionParameters);
	task.internal.triggerDataCollection();
	task.internal.triggerDataCollection.Execute := FALSE;
	
	task.internal.triggerFrameDataCollection.Command := gVFLCR.command.captureFrame;
	task.internal.triggerFrameDataCollection();
	//task.internal.triggerFrameDataCollection.Execute := FALSE;
	
	task.internal.enableManualModeTON.IN := IO.do.EnableMode_MANUAL AND NOT IO.di.ModeEnabled_MANUAL;
	task.internal.enableManualModeTON();
	
	task.internal.enableAutoModeTON.IN := NOT(IO.do.EnableMode_MANUAL) AND NOT IO.di.ModeEnabled_AUTO AND NOT(task.status.rackIgnored); // Check rackIgnored here because IO is cleared, i.e. NOT(IO) is TRUE
	task.internal.enableAutoModeTON();
	
	task.internal.abortLayerTON.IN := IO.do.AbortLayer AND NOT IO.di.LayerAborted;
	task.internal.abortLayerTON();
	
	task.internal.resetSoftwareErrorTON.IN := IO.do.ClearLaserErrors AND (task.status.laserFatalError OR task.status.laserWatchdogError);
	task.internal.resetSoftwareErrorTON();
	
	task.internal.transferLUTFilesTON.IN := IO.do.Transfer_LUTFiles AND NOT IO.di.LUTFiles_LoadSuccess;
	task.internal.transferLUTFilesTON();
	
	task.internal.deleteLaserControlFilesTON.IN := IO.do.Delete_LaserControlFiles AND NOT IO.di.LaserControlFiles_Deleted;
	task.internal.deleteLaserControlFilesTON();
	
	task.internal.deleteLUTFilesTON.IN := IO.do.Delete_LUTFiles AND NOT IO.di.LUTFiles_Deleted;
	task.internal.deleteLUTFilesTON();
	
	task.internal.openLayerTON.IN := IO.do.OpenLayer AND NOT IO.di.LayerOpen;
	task.internal.openLayerTON();
	
	///////////////////////////////////////////////////////////////
	// Reset all commands to ensure they don't get buffered
	///////////////////////////////////////////////////////////////
	brsmemset(ADR(task.command), 0, SIZEOF(task.command));
	
	task.internal.newCommand := FALSE;
	
	// Keep track of the previous state
	task.internal.previousState := task.status.state;
	
	// Write any statuses that weren't already written
	task.status.error := task.status.powerSupplyError OR task.status.laserWatchdogError OR task.status.laserHardwareError OR task.status.laserFatalError OR task.status.commsError;
	
	// Update edge detection vars
	task.internal._disableDCCondition := task.internal.disableDCCondition;
	task.internal._disableLaserCondition := task.internal.disableLaserCondition;
	

	
	// build an accurate pixel map for gen 3 python app to reference
	// NOTE: vfpMap uses 1-indexing
	//
	// 		[ pixel  enabled  rack  laser ]
	//		[ 1  1  1  1 ]
	//		[ 2  1  1  2 ]
	//		[ 3  1  1  3 ]
	//		...
	//		[ 21 0  2  1 ]
	//		[ 22 1  2  2 ]
	//		...	
	// given the current laser and rack, write data to location of assigned pixel
	// sometimes we have unused pixels at the end of the pixel mapping
	// we need to ignore these so find how many actual pixels there are
	FOR laserIndex := 0 TO MACHINE_MAI_LASERS_PER_RACK DO
		FOR rackIndex := 0 TO MACHINE_MAI_LASER_RACKS DO
			IF ((gmapRackLaser_to_Pixel[rackIndex, laserIndex] + 1) > task.internal.numberOfPixelsInMap) AND ((gmapRackLaser_to_Pixel[rackIndex, laserIndex] + 1) <= MACHINE_NUM_LASERS_TOTAL) THEN
				task.internal.numberOfPixelsInMap := (gmapRackLaser_to_Pixel[rackIndex, laserIndex] + 1);
			END_IF
		END_FOR
	END_FOR
	
	FOR laserIndex := 0 TO MACHINE_MAI_LASERS_PER_RACK DO
		IF laserIndex + ( Configuration.rackIndex * MACHINE_NUM_LASERS_PER_RACK ) < task.internal.numberOfPixelsInMap THEN
			gVFLCR.status.vfpMap[gmapRackLaser_to_Pixel[Configuration.rackIndex, laserIndex], 0] := gmapRackLaser_to_Pixel[Configuration.rackIndex, laserIndex] + 1; 			// pixel
			gVFLCR.status.vfpMap[gmapRackLaser_to_Pixel[Configuration.rackIndex, laserIndex], 1] := NOT (Configuration.ignoreLaser[laserIndex] OR Configuration.ignoreRack);	// enabled
			gVFLCR.status.vfpMap[gmapRackLaser_to_Pixel[Configuration.rackIndex, laserIndex], 2] := Configuration.rackIndex + 1; 												// rack
			gVFLCR.status.vfpMap[gmapRackLaser_to_Pixel[Configuration.rackIndex, laserIndex], 3] := laserIndex + 1;	// laser
		END_IF
	END_FOR	
	
	
	//(**** PIXEL MAPPING HACK CODE ****)//
		
	// NOTE: BuildInstanceInfo.active_pixels[] is a 1-based array, so add 1 to the pixelIndes
	IF stateAllTrue(gVFLCR.status.pixelMapped, FALSE) THEN
		FOR laserIndex := 0 TO MACHINE_MAI_LASERS_PER_RACK DO	
			task.status.pixelNumber[laserIndex] := gmapRackLaser_to_Pixel[Configuration.rackIndex, laserIndex] + 1;
			//task.status.pixelInUse[laserIndex] := gBuildInformation.BuildInstanceInfo.active_pixels[(gmapRackLaser_to_Pixel[Configuration.rackIndex, laserIndex]) + 1];
		END_FOR 
	ELSE
		FOR laserIndex := 0 TO MACHINE_MAI_LASERS_PER_RACK DO	
			task.status.pixelNumber[laserIndex] := 0;
			task.status.pixelInUse[laserIndex] := 0;
		END_FOR 
	END_IF
	
	
	//HACK BY PAUL TO NOT MAP UNNUSED PIXELS
	IF Configuration.rackIndex = 3 THEN
		task.internal.MAI_LASERS_IN_THIS_RACK := (gVFLCR.status.MaxNumberOfPixelsUsed - (3*MACHINE_NUM_LASERS_PER_RACK));
	ELSE
		task.internal.MAI_LASERS_IN_THIS_RACK := MACHINE_MAI_LASERS_PER_RACK;
	END_IF
	
	//set the remaining pixels to 0 and ignore them
	IF	task.internal.MAI_LASERS_IN_THIS_RACK <> MACHINE_MAI_LASERS_PER_RACK THEN
		FOR laserIndex := (task.internal.MAI_LASERS_IN_THIS_RACK + 1) TO MACHINE_MAI_LASERS_PER_RACK DO
			Configuration.ignoreLaser[laserIndex] := TRUE;
			task.status.pixelInUse[laserIndex] := 0;
			task.status.pixelNumber[laserIndex] := 0;
		END_FOR	
	END_IF		
	
	//check that our enabled lasers match the Build Info File understanding of enabled pixels
	task.internal.enabledLasersOK := TRUE;
	IF stateAllTrue(gVFLCR.status.pixelMapped, FALSE) THEN
		FOR laserIndex := 0 TO task.internal.MAI_LASERS_IN_THIS_RACK DO 
			
			//determine if there is an issue
			IF (Configuration.ignoreLaser[laserIndex] = task.status.pixelInUse[laserIndex]) AND (task.status.pixelInUse[laserIndex] = TRUE) THEN	
				task.internal.enabledLasersOK := FALSE;
				task.internal.pixelWithIssue := gmapRackLaser_to_Pixel[Configuration.rackIndex, laserIndex] + 1;
				
				//alarm but only once
				IF (task.internal._enabledLasersOK <> task.internal.enabledLasersOK) THEN
					pixelEnableMismatch := '';
					brsitoa(task.internal.pixelWithIssue, ADR(task.internal.pixelWithIssueStr));	
					pixelEnableMismatch := CONCAT('Toolpaths using a pixel which is disabled from HMI. Pixel #', task.internal.pixelWithIssueStr);
					vfAlarmEdgeSnippet(gVFLCR.alarm.components, gVFLCR.alarm.PIXEL_ENABLE_MISMATCH_AL9309, pixelEnableMismatch);
				END_IF	
			END_IF			
			
		END_FOR
	END_IF
	task.internal.enabledLasersNotOK := NOT(task.internal.enabledLasersOK);
	task.internal._enabledLasersOK := task.internal.enabledLasersOK;
	

	
	
	// Handle output IO
	WriteOutputIO;
	
	task.status.manualPulseStatus.rackNumber := Configuration.rackIndex + 1;
	task.status.manualPulseStatus.laserNumber:= task.internal.parameters.SelectedLaserIndex + 1;
	task.status.manualPulseStatus.pixelNumber := task.status.pixelNumber[task.internal.parameters.SelectedLaserIndex];
	task.status.manualPulseStatus.numPulses := task.parameters.manualPulseParameters.numPulsesPerLevel;
	
END_PROGRAM

PROGRAM _EXIT
	
	// On program exit, disable all lasers, force current layer to be aborted, and disable both AUTO and MANUAL modes.
	ShutDownIO;
	 
END_PROGRAM

