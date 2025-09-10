
ACTION DeriveProcessData: 

	// =============== HMI TOGGLE CONTROL ===============================================================================================================
	
	IF NOT task.internal._previousPciLoaded AND gPrintProcessConfigLoaded THEN
		task.internal.enableManualOverwrite := FALSE;	// PCI control once after load
	ELSIF NOT gPrintProcessConfigLoaded THEN
		task.internal.enableManualOverwrite := TRUE; // No PCI manual control 
	END_IF
	
	IF (NOT task.internal._previousOverwriteStatus AND task.internal.enableManualOverwrite) THEN // Overwrite edge detected
		// Gain default if 0
		IF gDerivedProcessParameters[ELECTRODE_GAIN_PERCENT].DerivedValue = 0 THEN
			HMIInputs.ElectrodeGainPerc := 70.0;
			HMIInputs.ApplyElectrodeGain := TRUE;
		END_IF
	END_IF
	
	task.internal._previousOverwriteStatus := task.internal.enableManualOverwrite;
	task.internal._previousPciLoaded := gPrintProcessConfigLoaded;
	
	// ==================================================================================================================================================
	
	// =============== DERIVE PROCESS DATA FROM PCI OR HMI ============================================================================================
	// DerivedProcessParameters is a middleman between actual and PCI/HMI
	// HMI RANGES: Update HMI ranges and get other data from PCI when active ----------------------
	
	IF task.internal.enableManualOverwrite AND NOT gPrintProcessConfigLoaded THEN // No PCI active and Overwrite enabled. Max Range
		gDerivedProcessParameters[CONTINUOUS_MODE_ENABLE].HmiRangeMin := 0.0;
		gDerivedProcessParameters[CONTINUOUS_MODE_ENABLE].HmiRangeMax := 1.0;
		gDerivedProcessParameters[GAS_FLOW_LPM].HmiRangeMin := 1500.0;
		gDerivedProcessParameters[GAS_FLOW_LPM].HmiRangeMax := 2500.0;
		gDerivedProcessParameters[REC_SPREAD_MOVE_VEL].HmiRangeMin := 10.0;
		gDerivedProcessParameters[REC_SPREAD_MOVE_VEL].HmiRangeMax := 500.0;
		gDerivedProcessParameters[REC_APPROACH_MOVE_VEL].HmiRangeMin := 10.0;
		gDerivedProcessParameters[REC_APPROACH_MOVE_VEL].HmiRangeMax := 500.0;
		gDerivedProcessParameters[ELECTRODE_ENABLE].HmiRangeMin := 0.0;
		gDerivedProcessParameters[ELECTRODE_ENABLE].HmiRangeMax := 1.0;
		gDerivedProcessParameters[ELECTRODE_GAIN_PERCENT].HmiRangeMin := 30.0;
		gDerivedProcessParameters[ELECTRODE_GAIN_PERCENT].HmiRangeMax := 100.0;
		gDerivedProcessParameters[MH_INITIAL_DISP_ROTATIONS].HmiRangeMin := 0.1;
		gDerivedProcessParameters[MH_INITIAL_DISP_ROTATIONS].HmiRangeMax := 3.0;
		gDerivedProcessParameters[MH_CONT_DISP_ROTATIONS].HmiRangeMin := 0.0;
		gDerivedProcessParameters[MH_CONT_DISP_ROTATIONS].HmiRangeMax := 3.0;
		gDerivedProcessParameters[AI_MAX_RECOAT_LIMIT].HmiRangeMin := 1.0;
		gDerivedProcessParameters[AI_MAX_RECOAT_LIMIT].HmiRangeMax := 4.0;
	ELSE // Get it from PCI
		
		FOR ii:=1 TO DIGITAL_PCI_MAX_PARS BY 1 DO
			gDerivedProcessParameters[ii].HmiRangeMin := gPrintProcessConfig.ParamterSetpoints[ii].HmiRangeMin;
			gDerivedProcessParameters[ii].HmiRangeMax := gPrintProcessConfig.ParamterSetpoints[ii].HmiRangeMax;
			
			gDerivedProcessParameters[ii].EngineeringUnits := gPrintProcessConfig.ParamterSetpoints[ii].EngineeringUnits;
			gDerivedProcessParameters[ii].Name := gPrintProcessConfig.ParamterSetpoints[ii].Name;
			gDerivedProcessParameters[ii].ParDataType := gPrintProcessConfig.ParamterSetpoints[ii].ParDataType;
			gDerivedProcessParameters[ii].Used := gPrintProcessConfig.ParamterSetpoints[ii].Used;
		END_FOR
		
	END_IF
	
	// ---------------------------------------------------------------------------------
	
	
	// DERIVED VALUES -------------------------------------------------------------------
	// For Layer specific values- no overlap with layer ranges allowed and all layers of the print will be covered in PCI.This is checked in CE.Value within CE bounds are also checked by CE.
	// gDerivedProcessParameters are derived from PCI or HMI and used throught through the code
	
	IF task.internal.enableManualOverwrite THEN // HMI CONTROL ( do required checks and populate derived value to be used through the project )
		// Continous Mode
		IF HMIInputs.ContinuousModeEnable THEN
			HMIInputs.ContinuousModeEnable := FALSE;
			gDerivedProcessParameters[CONTINUOUS_MODE_ENABLE].DerivedValue := 1.0;
		ELSIF HMIInputs.ContinuousModeDisable THEN
			HMIInputs.ContinuousModeDisable := FALSE;
			gDerivedProcessParameters[CONTINUOUS_MODE_ENABLE].DerivedValue := 0.0;
		ELSE
			HMIInputs.ContinuousModeEnable := FALSE;
			HMIInputs.ContinuousModeDisable := FALSE;
		END_IF
		
		// Electrode Enable
		IF HMIInputs.ElectrodeEnable THEN
			HMIInputs.ElectrodeEnable := FALSE;
			gDerivedProcessParameters[ELECTRODE_ENABLE].DerivedValue := 1.0; 
		ELSIF HMIInputs.ElectrodeDisable THEN
			HMIInputs.ElectrodeDisable := FALSE;
			gDerivedProcessParameters[ELECTRODE_ENABLE].DerivedValue := 0.0; 
		ELSE
			HMIInputs.ElectrodeEnable := FALSE;
			HMIInputs.ElectrodeDisable := FALSE;
		END_IF
		
		// Spread Velocity
		IF HMIInputs.RecSpreadVelocity < gDerivedProcessParameters[REC_SPREAD_MOVE_VEL].HmiRangeMin THEN
			HMIInputs.RecSpreadVelocity := gDerivedProcessParameters[REC_SPREAD_MOVE_VEL].HmiRangeMin;
		ELSIF HMIInputs.RecSpreadVelocity > gDerivedProcessParameters[REC_SPREAD_MOVE_VEL].HmiRangeMax THEN
			HMIInputs.RecSpreadVelocity := gDerivedProcessParameters[REC_SPREAD_MOVE_VEL].HmiRangeMax;
		END_IF
		IF  HMIInputs.ApplyRecSpreadVel THEN
			HMIInputs.ApplyRecSpreadVel := FALSE;
			gDerivedProcessParameters[REC_SPREAD_MOVE_VEL].DerivedValue := HMIInputs.RecSpreadVelocity;  // Derived is not used for this as gMotorbasic waypoints can be directly set from Axis tab. gMotorBasic Set only on apply 
			gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Velocity := HMIInputs.RecSpreadVelocity;
			gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Acceleration := HMIInputs.RecSpreadAccel; 
			gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Deceleration := HMIInputs.RecSpreadDecel;
		END_IF
		
		// Approach Velocity
		IF HMIInputs.RecApproachVelocity < gDerivedProcessParameters[REC_APPROACH_MOVE_VEL].HmiRangeMin THEN
			HMIInputs.RecApproachVelocity := gDerivedProcessParameters[REC_APPROACH_MOVE_VEL].HmiRangeMin;
		ELSIF HMIInputs.RecApproachVelocity > gDerivedProcessParameters[REC_APPROACH_MOVE_VEL].HmiRangeMax THEN
			HMIInputs.RecApproachVelocity := gDerivedProcessParameters[REC_APPROACH_MOVE_VEL].HmiRangeMax;
		END_IF
		IF  HMIInputs.ApplyRecApproachVel THEN
			HMIInputs.ApplyRecApproachVel := FALSE;
			gDerivedProcessParameters[REC_APPROACH_MOVE_VEL].DerivedValue := HMIInputs.RecApproachVelocity; // Derived is not used for this as gMotorbasic waypoints can be directly set from Axis tab. gMotorBasic Set only on apply 
			gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Velocity := HMIInputs.RecApproachVelocity;
			gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Acceleration := HMIInputs.RecApproachAccel; 
			gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Deceleration := HMIInputs.RecApproachDecel;
		END_IF
		
		// Gas Flow 
		IF HMIInputs.GasFlowLpm < gDerivedProcessParameters[GAS_FLOW_LPM].HmiRangeMin THEN
			HMIInputs.GasFlowLpm := gDerivedProcessParameters[GAS_FLOW_LPM].HmiRangeMin;
		ELSIF HMIInputs.GasFlowLpm > gDerivedProcessParameters[GAS_FLOW_LPM].HmiRangeMax THEN
			HMIInputs.GasFlowLpm := gDerivedProcessParameters[GAS_FLOW_LPM].HmiRangeMax;
		END_IF
		IF ((REAL_TO_INT(HMIInputs.GasFlowLpm) MOD 50) = 0) AND HMIInputs.ApplyGasFlow THEN // CE checks this for PCI
			HMIInputs.ApplyGasFlow := FALSE;
			gDerivedProcessParameters[GAS_FLOW_LPM].DerivedValue := HMIInputs.GasFlowLpm; 
		ELSE
			HMIInputs.ApplyGasFlow := FALSE;
		END_IF
		
		// Electrode Gain
		IF HMIInputs.ElectrodeGainPerc < gDerivedProcessParameters[ELECTRODE_GAIN_PERCENT].HmiRangeMin THEN
			HMIInputs.ElectrodeGainPerc := gDerivedProcessParameters[ELECTRODE_GAIN_PERCENT].HmiRangeMin;
		ELSIF HMIInputs.ElectrodeGainPerc > gDerivedProcessParameters[ELECTRODE_GAIN_PERCENT].HmiRangeMax THEN
			HMIInputs.ElectrodeGainPerc := gDerivedProcessParameters[ELECTRODE_GAIN_PERCENT].HmiRangeMax;
		END_IF
		IF  HMIInputs.ApplyElectrodeGain THEN
			HMIInputs.ApplyElectrodeGain := FALSE;
			gDerivedProcessParameters[ELECTRODE_GAIN_PERCENT].DerivedValue := HMIInputs.ElectrodeGainPerc; 
		END_IF	
		
		// MH Initial Dispense Rotations
		IF HMIInputs.MhInitialDispenseRot < gDerivedProcessParameters[MH_INITIAL_DISP_ROTATIONS].HmiRangeMin THEN
			HMIInputs.MhInitialDispenseRot := gDerivedProcessParameters[MH_INITIAL_DISP_ROTATIONS].HmiRangeMin;
		ELSIF HMIInputs.MhInitialDispenseRot > gDerivedProcessParameters[MH_INITIAL_DISP_ROTATIONS].HmiRangeMax THEN
			HMIInputs.MhInitialDispenseRot := gDerivedProcessParameters[MH_INITIAL_DISP_ROTATIONS].HmiRangeMax;
		END_IF	
		IF  HMIInputs.ApplyInitialDispenseRot THEN
			HMIInputs.ApplyInitialDispenseRot := FALSE;
			gDerivedProcessParameters[MH_INITIAL_DISP_ROTATIONS].DerivedValue := HMIInputs.MhInitialDispenseRot; 
		END_IF
		
		// MH Continuous Dispense Rotations
		IF HMIInputs.MhContinuousDispenseRot < gDerivedProcessParameters[MH_CONT_DISP_ROTATIONS].HmiRangeMin THEN
			HMIInputs.MhContinuousDispenseRot := gDerivedProcessParameters[MH_CONT_DISP_ROTATIONS].HmiRangeMin;
		ELSIF HMIInputs.MhContinuousDispenseRot > gDerivedProcessParameters[MH_CONT_DISP_ROTATIONS].HmiRangeMax THEN
			HMIInputs.MhContinuousDispenseRot := gDerivedProcessParameters[MH_CONT_DISP_ROTATIONS].HmiRangeMax;
		END_IF
		IF  HMIInputs.ApplyContDispenseRot THEN
			HMIInputs.ApplyContDispenseRot := FALSE;
			gDerivedProcessParameters[MH_CONT_DISP_ROTATIONS].DerivedValue := HMIInputs.MhContinuousDispenseRot; 
		END_IF
		
		// AI Max Recoat Limit
		IF HMIInputs.AiMaxRecoatLimit < gDerivedProcessParameters[AI_MAX_RECOAT_LIMIT].HmiRangeMin THEN
			HMIInputs.AiMaxRecoatLimit := gDerivedProcessParameters[AI_MAX_RECOAT_LIMIT].HmiRangeMin;
		ELSIF HMIInputs.AiMaxRecoatLimit > gDerivedProcessParameters[AI_MAX_RECOAT_LIMIT].HmiRangeMax THEN
			HMIInputs.AiMaxRecoatLimit := gDerivedProcessParameters[AI_MAX_RECOAT_LIMIT].HmiRangeMax;
		END_IF
		IF  HMIInputs.ApplyAiMaxRecoatLimit THEN
			HMIInputs.ApplyAiMaxRecoatLimit := FALSE;
			gDerivedProcessParameters[AI_MAX_RECOAT_LIMIT].DerivedValue := HMIInputs.AiMaxRecoatLimit; 
		END_IF
		
	ELSE // DIGITAL PCI CONTROL
		
		IF gPrintProcessConfigLoaded THEN
			FOR ii:=1 TO DIGITAL_PCI_MAX_PARS BY 1 DO // Loop through all pars
				
				IF gPrintProcessConfig.ParamterSetpoints[ii].Used THEN
					
					IF gPrintProcessConfig.ParamterSetpoints[ii].EnableLayerRangeChanges THEN // Layers specific changes enabled
						
						FOR jj:=1 TO gPrintProcessConfig.ParamterSetpoints[ii].NumberOfLayerValuesUsed BY 1 DO // Loop through all layer data
							
							IF gPrintJobManagement.currentState.currentLayerNumber > gPrintProcessConfig.ParamterSetpoints[ii].LayerSpecificValues[jj].LayerStart - 1 AND
								gPrintJobManagement.currentState.currentLayerNumber < gPrintProcessConfig.ParamterSetpoints[ii].LayerSpecificValues[jj].LayerEnd + 1	THEN // layer in range
								
								gDerivedProcessParameters[ii].DerivedValue := gPrintProcessConfig.ParamterSetpoints[ii].LayerSpecificValues[jj].LayerValue; // use this layer specific value
								
							END_IF
							
						END_FOR
						
					ELSE // Fixed value for the print
						gDerivedProcessParameters[ii].DerivedValue := gPrintProcessConfig.ParamterSetpoints[ii].FixedValue;
					END_IF
						
				END_IF
				
			END_FOR
			
			// Update actuals for parameters that is not using Derived Pars directly
			gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Velocity := gDerivedProcessParameters[REC_SPREAD_MOVE_VEL].DerivedValue;
			IF gDerivedProcessParameters[REC_APPROACH_MOVE_VEL].DerivedValue = gDerivedProcessParameters[REC_SPREAD_MOVE_VEL].DerivedValue THEN
				gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Velocity := gDerivedProcessParameters[REC_SPREAD_MOVE_VEL].DerivedValue - 10.0; // If process team missed to make approach speed 10 less than spread speed, force it
			ELSE
				gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Velocity := gDerivedProcessParameters[REC_APPROACH_MOVE_VEL].DerivedValue;
			END_IF
		
			// Update all HMI input to reflect PCI, so input will reflect current when HMI takes control
			HMIInputs.RecSpreadVelocity := gDerivedProcessParameters[REC_SPREAD_MOVE_VEL].DerivedValue;
			HMIInputs.RecApproachVelocity  :=  gDerivedProcessParameters[REC_APPROACH_MOVE_VEL].DerivedValue; 
			HMIInputs.GasFlowLpm := gDerivedProcessParameters[GAS_FLOW_LPM].DerivedValue ; 
			HMIInputs.ElectrodeGainPerc := gDerivedProcessParameters[ELECTRODE_GAIN_PERCENT].DerivedValue;
			HMIInputs.MhInitialDispenseRot := gDerivedProcessParameters[MH_INITIAL_DISP_ROTATIONS].DerivedValue ; 
			HMIInputs.MhContinuousDispenseRot := gDerivedProcessParameters[MH_CONT_DISP_ROTATIONS].DerivedValue ; 
			HMIInputs.AiMaxRecoatLimit := gDerivedProcessParameters[AI_MAX_RECOAT_LIMIT].DerivedValue;
		END_IF
		
	END_IF

	// ---------------------------------------------------------------------------------
	
	// Actions for a few parameters
	IF 	gDerivedProcessParameters[ELECTRODE_ENABLE].DerivedValue = 1.0 THEN
		IF stateAllFalse(gRecoater.status.electrodeEnabled,FALSE) THEN
			task.internal.atnCommand.Command := gRecoater.command.enableElectrode;
			task.internal.atnCommand.Execute := TRUE;
		END_IF
	ELSIF gDerivedProcessParameters[ELECTRODE_ENABLE].DerivedValue = 0.0  THEN
		IF stateAllTrue(gRecoater.status.electrodeEnabled,FALSE) THEN
			task.internal.atnCommand.Command := gRecoater.command.powerOffElectrode;
			task.internal.atnCommand.Execute := TRUE;
		END_IF
	END_IF
	
	task.status.continuousModeStatus := REAL_TO_BOOL(gDerivedProcessParameters[CONTINUOUS_MODE_ENABLE].DerivedValue);
	
	// ATN command handle
	task.internal.atnCommand();
	IF task.internal.atnCommand.Done OR task.internal.atnCommand.Error OR task.internal.atnCommand.Aborted THEN
		task.internal.atnCommand.Execute := FALSE;
	END_IF
	// ==================================================================================================================================================
	
	// =================================== HMI PCI VIEW =================================================================================================
	
	task.internal.hmiSelectedPciParameterData.MachineName := gPrintProcessConfig.MachineName;
	task.internal.hmiSelectedPciParameterData.Description := gPrintProcessConfig.Description;
	task.internal.hmiSelectedPciParameterData.FileFormatVersion := gPrintProcessConfig.FileFormatVersion;
	task.internal.hmiSelectedPciParameterData.DateTimeGenerated := gPrintProcessConfig.DateTimeGenerated;
	
	task.internal.hmiSelectedPciParameterData.ParamterSetpoints.Name := gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].Name;
	task.internal.hmiSelectedPciParameterData.ParamterSetpoints.Used := gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].Used;
	task.internal.hmiSelectedPciParameterData.ParamterSetpoints.EngineeringUnits := gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].EngineeringUnits;
	task.internal.hmiSelectedPciParameterData.ParamterSetpoints.ParDataType := gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].ParDataType;
	task.internal.hmiSelectedPciParameterData.ParamterSetpoints.HmiRangeMin := gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].HmiRangeMin;
	task.internal.hmiSelectedPciParameterData.ParamterSetpoints.HmiRangeMax := gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].HmiRangeMax;
	task.internal.hmiSelectedPciParameterData.ParamterSetpoints.FixedValue := gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].FixedValue;
	task.internal.hmiSelectedPciParameterData.ParamterSetpoints.EnableLayerRangeChanges := gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].EnableLayerRangeChanges;
	task.internal.hmiSelectedPciParameterData.ParamterSetpoints.NumberOfLayerValuesUsed := gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].NumberOfLayerValuesUsed;
	
	FOR jj:= 1 TO 8 BY 1 DO
		task.internal.hmiSelectedPciParameterData.ParamterSetpoints.LayerSpecificValues[jj].LayerValue :=  gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].LayerSpecificValues[jj].LayerValue;
		task.internal.hmiSelectedPciParameterData.ParamterSetpoints.LayerSpecificValues[jj].LayerStart := gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].LayerSpecificValues[jj].LayerStart;
		task.internal.hmiSelectedPciParameterData.ParamterSetpoints.LayerSpecificValues[jj].LayerEnd := gPrintProcessConfig.ParamterSetpoints[HMIInputs.DropdownSelection].LayerSpecificValues[jj].LayerEnd;
	END_FOR
	
	// ==================================================================================================================================================
	
	IF gPrintProcessConfigLoaded THEN
		task.status.pciLoadStatus := 'LOADED';
	ELSE
		task.status.pciLoadStatus := 'NOT LOADED';
	END_IF
		
END_ACTION
