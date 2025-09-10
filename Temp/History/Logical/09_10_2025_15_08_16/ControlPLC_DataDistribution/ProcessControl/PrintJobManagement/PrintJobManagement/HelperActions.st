
//ALLOWED TO PRINT
ACTION CheckAllowedToPrint: 
	
	//check if layer number is acceptable
	IF  (gPrintJobManagement.currentState.currentLayerNumber = gPrintJobManagement.currentState.lastPrintedLayerNumber) OR (gPrintJobManagement.currentState.currentLayerNumber = gPrintJobManagement.currentState.lastPrintedLayerNumber + 1) AND
		(gPrintJobManagement.currentState.currentLayerNumber > 0) AND
		(gPrintJobManagement.currentState.lastRecoatedLayerNumber = gPrintJobManagement.currentState.currentLayerNumber) THEN
	
		task.status.inhibitPrintReasons.layerNumberNotOK := FALSE;

	ELSE
		task.status.inhibitPrintReasons.layerNumberNotOK := TRUE;
	END_IF

	task.status.inhibitPrintReasons.buildInfoNotValid := stateAnyFalse(gPrintJobManagement.status.buildInfoValid, FALSE) ;
	task.status.inhibitPrintReasons.oxygenLevelsNotOK := stateAnyFalse(gGasApi.status.pzO2SafeToPrint, FALSE);
	task.status.inhibitPrintReasons.pnuematicSupplyNotOK := (stateAnyFalse(gSafetyApi.status.SupplyEnabledArgon, FALSE) OR stateAnyFalse(gSafetyApi.status.SupplyEnabledCDA, FALSE));
	task.status.inhibitPrintReasons.lasersNotReady := (stateAnyFalse(gVFLCR.status.readyToPrint, FALSE) OR stateAnyFalse(gVFLCR.status.userModulationEnabled, FALSE));
	task.status.inhibitPrintReasons.recoaterNotAtPark := stateAnyFalse(gRecoater.status.atPark, FALSE);	
//	task.status.inhibitPrintReasons.liftNotAtCurrentLayer :=  stateAnyFalse(gLiftApi.status.atCurrentLayer, FALSE);	 //lift now moves to current layer automatically instead of this being an inhibit
	task.status.inhibitPrintReasons.chillerNotReady := stateAnyFalse(gCoolingApi.status.coolingActive, FALSE);
	task.status.inhibitPrintReasons.pumpsNotRunningAtSetFreq := stateAnyFalse(gPumpsApi.status.pumpsRunningAtSetFreq, FALSE);
	task.status.inhibitPrintReasons.pumpsNotRunningAtSetFlow := stateAnyFalse(gPumpsApi.status.pumpsRunningAtSetFlow, FALSE);
	task.status.inhibitPrintReasons.lasersNotReadyDryRun := stateAnyFalse(gVFLCR.status.readyToPrint, FALSE);
	
	
	task.status.inhibitPrintReasons.scratchCoatNotVerified := NOT(gPrintJobManagement.currentState.scratchCoatPassedVerification) AND NOT(gPrintJobManagement.parameters.disableScratchCoat);
	//TODO - check state of all print axes
	//get reason
	
	task.status.inhibitPrintReasons.bladeOffsetNotFound := NOT(gPrintJobManagement.currentState.buildPlateRecoaterOffsetFound);
	task.status.inhibitPrintReasons.buildPlateNotPrepared := NOT(gPrintJobManagement.currentState.buildPlateHasBeenPrepared);
	task.status.inhibitPrintReasons.distributionNotOk := NOT gOpcData_FromBuildPC.DistributionActive;
	task.status.inhibitPrintReasons.longPauseRecoveryReq := gPrintJobManagement.currentState.longPauseRecoveryReq;
	
	//for HMI and alarming
	IF NOT(gPrintJobManagement.currentState.lopModeActive) THEN
		task.status.inhibitPrint := stateTrueStatus( gPrintJobManagement.status.inhibitPrint, ADR( task.status.inhibitPrintStatus ), SIZEOF(task.status.inhibitPrintStatus));	
	ELSE
		task.status.inhibitPrint := stateTrueStatus( gPrintJobManagement.status.inhibitLOP, ADR( task.status.inhibitPrintStatus ), SIZEOF(task.status.inhibitPrintStatus));	
	END_IF
	
	task.status.inhibitLOP  := stateTrueStatus( gPrintJobManagement.status.inhibitLOP, ADR( task.status.inhibitLOPStatus), SIZEOF(task.status.inhibitLOPStatus));
	task.status.inhibitPrintReasons.oxygenLevelsNotSafeToLase := stateAnyFalse(gGasApi.status.pzO2SafeToLase, FALSE);
	
END_ACTION




//ALLOWED TO SCAVENGE
ACTION CheckAllowedToScavenge:	
END_ACTION



//ALLOWED TO RECOAT
ACTION CheckAllowedToRecoat:
	
	//check if layer number is acceptable
	IF  (gPrintJobManagement.currentState.currentLayerNumber > gPrintJobManagement.currentState.lastPrintedLayerNumber) THEN	
		task.status.inhibitRecoatReasons.layerNumberNotOK := FALSE;
	ELSE
		task.status.inhibitRecoatReasons.layerNumberNotOK := TRUE;
	END_IF 
	
	task.status.inhibitRecoatReasons.gantryXNotInSafeArea := (gMotorBasic[AXIS_GANTRY_X].OUT.Position > (gMotorBasic[AXIS_GANTRY_X].IN.Waypoint[WAYPOINT_GANTRY_X_CLEAN_1].Position + 0.1));

	task.status.inhibitRecoatReasons.chillerNotReady := stateAnyFalse(gCoolingApi.status.coolingActive, FALSE);	
	
	task.status.inhibitRecoatReasons.meteringHopperNotOK := stateAnyFalse(gMeteringHopperApi.status.isReadyToRun, FALSE);
	
	task.status.inhibitRecoatReasons.oxygenLevelsNotOK := stateAnyFalse(gGasApi.status.pzO2SafeToLase, FALSE);
	task.status.inhibitRecoatReasons.pnuematicSupplyNotOK := (stateAnyFalse(gSafetyApi.status.SupplyEnabledArgon, FALSE) OR stateAnyFalse(gSafetyApi.status.SupplyEnabledCDA, FALSE));
	task.status.inhibitRecoatReasons.axesNotOK := FALSE;//TODO
	task.status.inhibitRecoatReasons.buildPlateNotPresent := stateAllFalse(gLiftApi.status.buildVolumeEngaged, FALSE); //TODO
	task.status.inhibitRecoatReasons.LopModeActive := (gPrintJobManagement.currentState.lopModeActive);
	task.status.inhibitRecoatReasons.pumpsNotRunning := (stateAnyFalse(gPumpsApi.status.pumpsRunningAtSetFreq, FALSE) OR stateAnyFalse(gPumpsApi.status.pumpsRunningAtSetFlow, FALSE)) AND NOT(gPrintJobManagement.status.measuringScratchCoat) ;
	task.status.inhibitRecoatReasons.longPauseRecoveryReq := gPrintJobManagement.currentState.longPauseRecoveryReq;
	
	
	//lift axes powered etc
	//does layer number make sense and compare to previous steps
	//is the metering hopper ready to rock
	//is the o2% below 2%
	//do we have a build plate present?
	//does the dispense position make sense?
	
		
	//ADD LOP 
	
	//for HMI and alarming
	task.status.inhibitRecoat := stateTrueStatus( gPrintJobManagement.status.inhibitRecoat, ADR( task.status.inhibitRecoatStatus ), SIZEOF(task.status.inhibitRecoatStatus));	
	
END_ACTION



//ALLOWED TO SCRAPE
ACTION CheckAllowedToScrape:
END_ACTION

ACTION CheckAllowedToIncrement:
	
	IF stateAllTrue( gPrintJobManagement.status.buildInfoValid, TRUE ) THEN
		IF ( (gPrintJobManagement.currentState.currentLayerNumber + 1) <= gPrintJobManagement.currentState.numberOfLayers ) THEN
			IF ((gPrintJobManagement.currentState.currentLayerNumber + 1) = (gPrintJobManagement.currentState.lastPrintedLayerNumber + 1)) THEN
				task.status.inhibitIncrement := FALSE;//good - next layer is last printed + 1
			ELSE
				task.status.inhibitIncrement := TRUE;//bad - not next layer
			END_IF
		ELSE
			task.status.inhibitIncrement := TRUE;//bad - max layers in print
		END_IF	
	ELSE	
		task.status.inhibitIncrement := TRUE;//bad - not valid build info
	END_IF

		
END_ACTION

//ALLOWED TO REFILL
ACTION CheckAllowedToRefill:
	task.status.inhibitMHopperRefillReasons.oxygenLevelsNotOK := stateAnyFalse(gGasApi.status.pzO2SafeToLase, FALSE);
	task.status.inhibitMHopperRefillReasons.overheadHopperRefillActive := stateAnyTrue(gPowderApi.status.ohRefillSeqActive, FALSE);
END_ACTION



//ALLOWED TO REFILL
ACTION LookAheadPrintTime:
	
	
	//calculate how long a recoat is taking
	//calculate how long a trajectory takes (with index moves included at a ratio of 1 large index per 7 small index)
	//calculate how long imaging takes
	//calculate how many recoats, trajectories and images are remaining in the print
	//multiply together and display this as a predictor how print time remaining
	//make sure no div/0
	//update once every layer
	//all time vars in seconds
	
	
	
	(*** --------------------- ***)
	//TRAJECTORY AND INDEX TIME MATH
	TRAJECTORY_ACCELERATION := gBuildInformation.trajectory_acceleration;
	TRAJECTORY_VELOCITY := gBuildInformation.trajectory_velocity;
	TRAJECTORY_DISTANCE_X := LREAL_TO_REAL(gBuildInformation.avg_trajectory_length_x);
	TRAJECTORY_DISTANCE_Y := LREAL_TO_REAL(gBuildInformation.avg_trajectory_length_y);
	IF (TRAJECTORY_ACCELERATION <> 0) AND (TRAJECTORY_VELOCITY <> 0 ) THEN
		//formula for trajectory (+avg index time at end)
		//t = 2 * (v / a) + (d - v^2 / a) / v
		TRAJECTORY_TIME_X  := 	2*(TRAJECTORY_VELOCITY/TRAJECTORY_ACCELERATION) + ((TRAJECTORY_DISTANCE_X - ((TRAJECTORY_VELOCITY*TRAJECTORY_VELOCITY)/TRAJECTORY_ACCELERATION))/TRAJECTORY_VELOCITY);
		TRAJECTORY_TIME_Y  := 	2*(TRAJECTORY_VELOCITY/TRAJECTORY_ACCELERATION) + ((TRAJECTORY_DISTANCE_Y - ((TRAJECTORY_VELOCITY*TRAJECTORY_VELOCITY)/TRAJECTORY_ACCELERATION))/TRAJECTORY_VELOCITY);
	END_IF	
	
	INDEX_VELOCITY := gBuildInformation.index_velocity; 
	INDEX_ACCELERATION := gBuildInformation.index_acceleration;
	INDEX_DISTANCE_SHORT := 50;
	INDEX_DISTANCE_LONG := 1.5;

	IF (INDEX_ACCELERATION <> 0) AND (INDEX_VELOCITY <> 0 ) THEN
		//formula for trajectory (+avg index time at end)
		//t = 2 * (v / a) + (d - v^2 / a) / v
		INDEX_TIME_SHORT  := 	2*(INDEX_VELOCITY/INDEX_ACCELERATION) + ((INDEX_DISTANCE_SHORT - ((INDEX_VELOCITY*TRAJECTORY_VELOCITY)/INDEX_ACCELERATION))/INDEX_VELOCITY);
		INDEX_TIME_LONG  := 	2*(INDEX_VELOCITY/INDEX_ACCELERATION) + ((INDEX_DISTANCE_LONG - ((INDEX_VELOCITY*TRAJECTORY_VELOCITY)/INDEX_ACCELERATION))/INDEX_VELOCITY);
		
		//7 shorts per long
		INDEX_TIME_AVG := (INDEX_TIME_SHORT*7 + INDEX_TIME_LONG)/8;
	END_IF	
	
	
	IMAGING_TIME := 2; //2seconds.
	
	
	(*** --------------------- ***)
	//RECOAT APPROACH, DISPENSE AND SPREAD TIME MATH
	RECOAT_SPREAD_VELOCITY := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Velocity; 
	RECOAT_SPREAD_ACCELERATION := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Acceleration; 
	RECOAT_SPREAD_DECELERATION := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Deceleration;	
	RECOAT_SPREAD_DISTANCE := LREAL_TO_REAL(ABS(gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Position - gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PARK].Position));
	IF (RECOAT_SPREAD_VELOCITY <> 0) AND (RECOAT_SPREAD_ACCELERATION <> 0) THEN
		RECOAT_SPREAD_TIME := 2*(RECOAT_SPREAD_VELOCITY/RECOAT_SPREAD_ACCELERATION) + ((RECOAT_SPREAD_DISTANCE - ((RECOAT_SPREAD_VELOCITY*RECOAT_SPREAD_VELOCITY)/RECOAT_SPREAD_ACCELERATION))/RECOAT_SPREAD_VELOCITY);
	END_IF
	

	RECOAT_APPROACH_VELOCITY := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Velocity;
	RECOAT_APPROACH_ACCELERATION := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Acceleration; 
	RECOAT_APPROACH_DECELERATION := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Deceleration; 
	IF (RECOAT_APPROACH_VELOCITY <> 0) AND (RECOAT_APPROACH_ACCELERATION <> 0) THEN
		RECOAT_APPROACH_TIME := 2*(RECOAT_APPROACH_VELOCITY/RECOAT_APPROACH_ACCELERATION) + ((RECOAT_SPREAD_DISTANCE - ((RECOAT_APPROACH_VELOCITY*RECOAT_APPROACH_VELOCITY)/RECOAT_APPROACH_ACCELERATION))/RECOAT_APPROACH_VELOCITY);
	END_IF
	
	
	RECOAT_DISPENSE_ACCELERATION := gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_INITIAL_DISPENSE].Acceleration;
	RECOAT_DISPENSE_VELOCITY := gMotorBasic[AXIS_HOPPER].IN.Waypoint[WAYPOINT_HOPPER_INITIAL_DISPENSE].Velocity;
	RECOAT_DISPENSE_DISTANCE := 360*gMeteringHopperApi.dataCollection.PrepileMoveRotation_deg; 
	
	IF (RECOAT_DISPENSE_VELOCITY <> 0) AND (RECOAT_DISPENSE_ACCELERATION <> 0) THEN
		RECOAT_DISPENSE_TIME := 2*(RECOAT_DISPENSE_VELOCITY/RECOAT_DISPENSE_ACCELERATION) + ((RECOAT_DISPENSE_DISTANCE - ((RECOAT_DISPENSE_VELOCITY*RECOAT_DISPENSE_VELOCITY)/RECOAT_DISPENSE_ACCELERATION))/RECOAT_DISPENSE_VELOCITY);
	END_IF
	
	RECOAT_TIME_TOTAL := RECOAT_SPREAD_TIME + RECOAT_DISPENSE_TIME + RECOAT_APPROACH_TIME;
	
	
	//it takes about 11 seconds..
	GAS_HEAD_CLEAN_TIME_ESTIMATE := 11;
	
	
	(*** --------------------- ***)
	//REMAINING ACTIONS
	
	task.internal.printTimeCalc.layersRemaining := gBuildInformation.num_layers - gPrintJobManagement.currentState.currentLayerNumber;
	
	//all layers multiple recoats
	IF gDerivedProcessParameters[AI_MAX_RECOAT_LIMIT].DerivedValue <> 0 THEN
		task.internal.printTimeCalc.recoatsRemainingMax := (gBuildInformation.num_layers - gPrintJobManagement.currentState.lastRecoatedLayerNumber)*REAL_TO_UINT(gDerivedProcessParameters[AI_MAX_RECOAT_LIMIT].DerivedValue);	
	ELSE
		task.internal.printTimeCalc.recoatsRemainingMax := (gBuildInformation.num_layers - gPrintJobManagement.currentState.lastRecoatedLayerNumber)*2;	
	END_IF
	
	//no multi recoats at all
	task.internal.printTimeCalc.recoatsRemainingMin := (gBuildInformation.num_layers - gPrintJobManagement.currentState.lastRecoatedLayerNumber);
	
	//remaining trajectories
	task.internal.printTimeCalc.trajectoriesRemaining := gBuildInformation.num_trajectories_x + gBuildInformation.num_trajectories_y - (gPrintJobManagement.currentState.buildReport.totalTrajectoriesDoneDuringPrint); 
	
	IF gBuildInformation.num_intralayer_gashead_cleans <> 0 THEN
		task.internal.printTimeCalc.intraLayerGasheadCleansRemaining :=  gBuildInformation.num_intralayer_gashead_cleans -  ABS(gPrintJobManagement.currentState.currentLayerNumber - gPrintJobManagement.currentState.buildReport.GasHeadCleanCount);
	ELSE
		task.internal.printTimeCalc.intraLayerGasheadCleansRemaining := 0;
	END_IF
	
	
	//cooling time remaining
	IF gBuildInformation.total_cooling_delay > 0 THEN
		task.internal.remainingCoolingDelayS := gBuildInformation.total_cooling_delay - gPrintJobManagement.currentState.buildReport.secondsSpentCooling;
	ELSE
		task.internal.remainingCoolingDelayS := 0;
	END_IF
	IF TRAJECTORY_TIME_X <> 0 THEN
		//time is in hours
		task.internal.printTimeCalc.remainingPrintTimeLow := 
			(task.internal.printTimeCalc.trajectoriesRemaining*(TRAJECTORY_TIME_X + INDEX_TIME_AVG) +
		task.internal.printTimeCalc.recoatsRemainingMin*(RECOAT_TIME_TOTAL) +
			task.internal.printTimeCalc.layersRemaining*IMAGING_TIME +    
			task.internal.printTimeCalc.intraLayerGasheadCleansRemaining*GAS_HEAD_CLEAN_TIME_ESTIMATE + task.internal.remainingCoolingDelayS)/3600;
		
		//only 1 sig fig
		task.internal.printTimeCalc.remainingPrintTimeLow := INT_TO_REAL(REAL_TO_INT(task.internal.printTimeCalc.remainingPrintTimeLow * 10.0))/10.0;
		
		task.internal.printTimeCalc.remainingPrintTimeHigh := 
			(task.internal.printTimeCalc.trajectoriesRemaining*(TRAJECTORY_TIME_X + INDEX_TIME_AVG) +
			task.internal.printTimeCalc.recoatsRemainingMax*(RECOAT_TIME_TOTAL) +
			task.internal.printTimeCalc.layersRemaining*IMAGING_TIME +    
			task.internal.printTimeCalc.intraLayerGasheadCleansRemaining*GAS_HEAD_CLEAN_TIME_ESTIMATE + task.internal.remainingCoolingDelayS)/3600;
		
		task.internal.printTimeCalc.remainingPrintTimeHigh := INT_TO_REAL(REAL_TO_INT(task.internal.printTimeCalc.remainingPrintTimeHigh * 10.0))/10.0;
		
	ELSE
		task.internal.printTimeCalc.remainingPrintTimeHigh := 0;
		task.internal.printTimeCalc.remainingPrintTimeLow := 0;
	END_IF
	
	
	
	gPrintJobManagement.status.remainingHoursHigh := task.internal.printTimeCalc.remainingPrintTimeHigh;	
	gPrintJobManagement.status.remainingHoursLow := task.internal.printTimeCalc.remainingPrintTimeLow;
	
	msRemainingInPrint := REAL_TO_UDINT(gPrintJobManagement.status.remainingHoursLow * 3600000);
	

	
	//////////////////////////////////////////////////////////////////////////////////
	// CALCULATE INTRALAYER BUILD STATUS ///////////////
	//////////////////////////////////////////////////////////////////////////////////
		
	IF gPrintJobManagement.currentState.lastRecoatedLayerNumber > 0 THEN
		VF_COMMON_GetPlcUtcDateTime(gDataCollection.getUtcDateTime);
		gPrintJobManagement.currentState.buildReport.timeElapsedInPrint := (gDataCollection.getUtcDateTime - gPrintJobManagement.currentState.buildReport.timeStartOfPrint);
	END_IF
	
	//calculate how many hours have gone by since print started
	TIME_TO_TIMEStructure(gPrintJobManagement.currentState.buildReport.timeElapsedInPrint,ADR(elapsedTimeStructure)); 
	gPrintJobManagement.status.hoursElapsedInPrint := SINT_TO_REAL(elapsedTimeStructure.day)*24 + USINT_TO_REAL(elapsedTimeStructure.hour) + USINT_TO_REAL(elapsedTimeStructure.minute)/60;    
	
	
	//store the initial estimates how long the print will take
	IF gPrintJobManagement.currentState.lastRecoatedLayerNumber = 1 THEN
		
		//CALCULATE THE PROJECTED TOTAL PRINT TIME
		gPrintJobManagement.currentState.buildReport.initialEstOfPrintDurationHrs := gPrintJobManagement.status.remainingHoursLow;		
		gPrintJobManagement.currentState.buildReport.initialEstOfPrintEndTime := gPrintJobManagement.currentState.buildReport.timeStartOfPrint + UDINT_TO_TIME(msRemainingInPrint); //todo...
			
	END_IF
	
	
	//calculate how far behind schedule we are in hours
	VF_COMMON_GetPlcUtcDateTime(gDataCollection.getUtcDateTime);
	gPrintJobManagement.status.hoursBehindSchedule := gPrintJobManagement.currentState.buildReport.initialEstOfPrintDurationHrs - (gPrintJobManagement.status.hoursElapsedInPrint + gPrintJobManagement.status.remainingHoursLow);
	gPrintJobManagement.status.updatedEstOfPrintEndTime := gDataCollection.getUtcDateTime + UDINT_TO_TIME(msRemainingInPrint);
	

	IF 	gPrintJobManagement.currentState.lastRecoatedLayerNumber <> 0 THEN
		gPrintJobManagement.status.doubleRecoatRatio := UDINT_TO_REAL(gPrintJobManagement.currentState.buildReport.totalRecoatsDoneDuringPrint)/UINT_TO_REAL(gPrintJobManagement.currentState.lastRecoatedLayerNumber);
	END_IF
	
	
	//TRAJ/LAYER
	IF gBuildInformation.num_layers <> 0 THEN
		gPrintJobManagement.status.trajectoriesPerLayer := (gBuildInformation.num_trajectories_x + gBuildInformation.num_trajectories_y)/gBuildInformation.num_layers;
	END_IF
	
	//GAS HEAD CLEANS/LAYER
	IF gBuildInformation.num_layers <> 0 THEN	
		gPrintJobManagement.status.intraLayerCleansPerLayer := (UINT_TO_REAL(gBuildInformation.num_intralayer_gashead_cleans))/UINT_TO_REAL(gBuildInformation.num_layers);
	END_IF
		
	
	//current layer string
	currentLayerString := UINT_TO_STRING(gPrintJobManagement.currentState.currentLayerNumber);
	totalLayersString := UINT_TO_STRING(gBuildInformation.num_layers);
	
	gPrintJobManagement.status.layerStatusString := '';
	brsstrcat(ADR(gPrintJobManagement.status.layerStatusString), ADR(currentLayerString));
	brsstrcat(ADR(gPrintJobManagement.status.layerStatusString), ADR(slash));
	brsstrcat(ADR(gPrintJobManagement.status.layerStatusString), ADR(totalLayersString));

	
	//LONGEST PAUSE CALCULATION
	gPrintJobManagement.status.downTimeHours := (UDINT_TO_REAL(gPrintJobManagement.currentState.buildReport.secondsUnavailableDuringPrint) + UDINT_TO_REAL(gPrintJobManagement.currentState.buildReport.secondsWaitingOpDuringPrint) + UDINT_TO_REAL(gPrintJobManagement.currentState.buildReport.secondsIdleDuringPrint))/3600;
		
	IF gPrintJobManagement.currentState.buildReport.totalDowntimeAtLastLayerStart <> gPrintJobManagement.status.downTimeHours THEN	
		gPrintJobManagement.status.downTimeBetweenLastTwoLayers := gPrintJobManagement.status.downTimeHours - gPrintJobManagement.currentState.buildReport.totalDowntimeAtLastLayerStart;	
		IF gPrintJobManagement.status.downTimeBetweenLastTwoLayers > gPrintJobManagement.currentState.buildReport.longestPauseHours THEN
			gPrintJobManagement.currentState.buildReport.longestPauseHours := gPrintJobManagement.status.downTimeBetweenLastTwoLayers;
			gPrintJobManagement.status.longestPauseMinutes := INT_TO_STRING(REAL_TO_INT(gPrintJobManagement.currentState.buildReport.longestPauseHours*60));
			gPrintJobManagement.currentState.buildReport.longestPauseLayer := UINT_TO_STRING(gPrintJobManagement.currentState.currentLayerNumber);
			stringLayer := ' layer: ';
			stringMinutes := 'minutes: ';
			stringSpace := ' ';
			gPrintJobManagement.status.longestPauseString := '';	
			brsstrcat(ADR(gPrintJobManagement.status.longestPauseString ),ADR(stringMinutes));
			brsstrcat(ADR(gPrintJobManagement.status.longestPauseString ),ADR(gPrintJobManagement.status.longestPauseMinutes));	
			brsstrcat(ADR(gPrintJobManagement.status.longestPauseString),ADR(stringLayer));
			brsstrcat(ADR(gPrintJobManagement.status.longestPauseString),ADR(gPrintJobManagement.currentState.buildReport.longestPauseLayer));		
		END_IF
	END_IF
	
	gPrintJobManagement.currentState.buildReport.totalDowntimeAtLastLayerStart := gPrintJobManagement.status.downTimeHours;
	
	//OEE CALCULATION
	IF gPrintJobManagement.status.hoursElapsedInPrint <> 0 THEN
		gPrintJobManagement.status.availabilityDuringPrint := ((gPrintJobManagement.status.hoursElapsedInPrint - gPrintJobManagement.status.downTimeHours)/gPrintJobManagement.status.hoursElapsedInPrint)*100;
	END_IF
	
	gPrintJobManagement.status.initialPrintTimeString := TOD_TO_STRING(DT_TO_TOD(gPrintJobManagement.currentState.buildReport.initialEstOfPrintEndTime));
	gPrintJobManagement.status.actualPrintTimeString := TOD_TO_STRING(DT_TO_TOD(gPrintJobManagement.status.updatedEstOfPrintEndTime));
	gPrintJobManagement.status.printStartTimeString := TOD_TO_STRING(DT_TO_TOD(gPrintJobManagement.currentState.buildReport.timeStartOfPrint)); 
	gPrintJobManagement.status.initialPrintTimeString := DELETE(gPrintJobManagement.status.initialPrintTimeString, 4, 1);
	gPrintJobManagement.status.actualPrintTimeString := DELETE(gPrintJobManagement.status.actualPrintTimeString, 4, 1);
	gPrintJobManagement.status.printStartTimeString := DELETE(gPrintJobManagement.status.printStartTimeString, 4, 1);
	gPrintJobManagement.status.initialPrintDateString := DATE_TO_STRING(DT_TO_DATE(gPrintJobManagement.currentState.buildReport.initialEstOfPrintEndTime));
	gPrintJobManagement.status.actualPrintDateString := DATE_TO_STRING(DT_TO_DATE(gPrintJobManagement.status.updatedEstOfPrintEndTime));
	gPrintJobManagement.status.printStartDateString := DATE_TO_STRING(DT_TO_DATE(gPrintJobManagement.currentState.buildReport.timeStartOfPrint)); 
	gPrintJobManagement.status.initialPrintDateString := DELETE(gPrintJobManagement.status.initialPrintDateString, 2, 1);
	gPrintJobManagement.status.actualPrintDateString := DELETE(gPrintJobManagement.status.actualPrintDateString, 2, 1);
	gPrintJobManagement.status.printStartDateString := DELETE(gPrintJobManagement.status.printStartDateString, 2, 1);
	
	//clean string for date time	
	stringAt := ' at ';

	gPrintJobManagement.status.printStartDateTimeClean := '';
	gPrintJobManagement.status.initialPrintDateTimeClean := '';
	gPrintJobManagement.status.actualPrintDateTimeClean := '';
	
	brsstrcat(ADR(gPrintJobManagement.status.printStartDateTimeClean),ADR(gPrintJobManagement.status.printStartDateString));
	brsstrcat(ADR(gPrintJobManagement.status.printStartDateTimeClean),ADR(stringAt));
	brsstrcat(ADR(gPrintJobManagement.status.printStartDateTimeClean),ADR(gPrintJobManagement.status.printStartTimeString));
		
	brsstrcat(ADR(gPrintJobManagement.status.initialPrintDateTimeClean),ADR(gPrintJobManagement.status.initialPrintDateString));
	brsstrcat(ADR(gPrintJobManagement.status.initialPrintDateTimeClean),ADR(stringAt));
	brsstrcat(ADR(gPrintJobManagement.status.initialPrintDateTimeClean),ADR(gPrintJobManagement.status.initialPrintTimeString));
	
	brsstrcat(ADR(gPrintJobManagement.status.actualPrintDateTimeClean),ADR(gPrintJobManagement.status.actualPrintDateString));
	brsstrcat(ADR(gPrintJobManagement.status.actualPrintDateTimeClean),ADR(stringAt));
	brsstrcat(ADR(gPrintJobManagement.status.actualPrintDateTimeClean),ADR(gPrintJobManagement.status.actualPrintTimeString));
	
	
	
	
	//POWDER TRACKING
	
	//last layer powder
	//starting total powder
	//this layer total powder
	//special comparison for hopper swaps if this layer powder is > last layer powder by a lot
	//goal is powder used total and powder remaining
	
	gPrintJobManagement.status.thisLayerTotalPowder := gPowderApi.status.floorHopperWeight + gPowderApi.status.overheadHopperWeight + gMeteringHopperApi.status.powderWeightScaled;
	
	//powder tracking kicks in after scratch coat layer
	IF (gPrintJobManagement.currentState.currentLayerNumber = 1) THEN
		gPrintJobManagement.currentState.buildReport.totalPowderLoadedForPrint := gPrintJobManagement.status.thisLayerTotalPowder;
	END_IF
	
	//detect floor hopper swap
	IF (gPrintJobManagement.status.lastLayerFloorHopper) > (gPowderApi.status.floorHopperWeight + 30) THEN
		gPrintJobManagement.currentState.buildReport.totalPowderLoadedForPrint := gPrintJobManagement.currentState.buildReport.totalPowderLoadedForPrint - gPrintJobManagement.status.lastLayerFloorHopper + gPowderApi.status.floorHopperWeight;	
	END_IF	
		
	gPrintJobManagement.status.totalPowderUsed := gPrintJobManagement.currentState.buildReport.totalPowderLoadedForPrint - gPrintJobManagement.status.thisLayerTotalPowder;
	gPrintJobManagement.status.lastLayerTotalPowder := gPrintJobManagement.status.thisLayerTotalPowder;
	gPrintJobManagement.status.lastLayerFloorHopper := gPowderApi.status.floorHopperWeight;
	
END_ACTION

