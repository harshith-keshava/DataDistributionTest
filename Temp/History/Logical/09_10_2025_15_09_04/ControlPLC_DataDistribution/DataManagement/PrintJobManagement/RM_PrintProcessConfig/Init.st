

PROGRAM _INIT
	
	subscribePLCOpen( gSystemRecipeApi.commands.loadPrintProcessConfigFile, 'Print Process Config File Load', task.commands.load, task.internal.load );
	 
	HMIInputs.RecSpreadVelocity := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Velocity;
	HMIInputs.RecSpreadDecel := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Deceleration;
	HMIInputs.RecSpreadAccel := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_END_RECOAT].Acceleration;
	
	HMIInputs.RecApproachVelocity := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Velocity;
	HMIInputs.RecApproachDecel := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Deceleration;
	HMIInputs.RecApproachAccel := gMotorBasic[AXIS_RECOATER_X].IN.Waypoint[WAYPOINT_RECOATER_X_PREP_RECOAT].Acceleration;
	
END_PROGRAM