
PROGRAM _INIT
	
	//Populate alarm enum
	varPopulateMemberNames('gVFLCR.alarm', UDINT_TO_USINT(brsstrlen(ADR('gVFLCR.alarm')) + 1));
	varPopulateMemberNames('gVFLCR.alarm.hardware', UDINT_TO_USINT(brsstrlen(ADR('gVFLCR.alarm.hardware')) + 1));
	varPopulateMemberNames('gVFLCR.alarm.software', UDINT_TO_USINT(brsstrlen(ADR('gVFLCR.alarm.software')) + 1));
	varPopulateMemberNames('gVFLCR.alarm.pixelMapping', UDINT_TO_USINT(brsstrlen(ADR('gVFLCR.alarm.pixelMapping')) + 1));
	varPopulateMemberNames('gVFLCR.alarm.calibApp', UDINT_TO_USINT(brsstrlen(ADR('gVFLCR.alarm.calibApp')) + 1));

	// Choose core
	gVFLCR.alarm.components.link := alarm_Laser;
	gVFLCR.alarm.components.name  := 'VF-LCR'; // HMI dropdown name
	
	//Configure alarm data
	// Parameterize the alarms data struct with several one time assignments. 
	alarmData.in.mpLink := ADR(gVFLCR.alarm.components.link);
	alarmData.in.mpLinkName := 'alarm_Laser';
	alarmData.in.deviceName := 'AlarmData';
	alarmData.in.scope := 'VF-LCR'; // TMX name
	alarmData.in.snippetPvName := 'gVFLCR.alarm';
	alarmData.in.escalateAll := TRUE;
	
	// Set the default mapping for this alarm component. 
	vfSetDefaultMapping(vfALARMS_MAPPING_ESCALATE, '', alarmData);
	
	// Add all aggregate alarms to the list. 
	vfAddAlarmApi(gVFLCR.alarm.AGGREGATE_GENERAL_ALARM, '', 0, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.AGGREGATE_HARDWARE_ALARM, '', 0, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.AGGREGATE_SOFTWARE_ALARM, '', 0, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.AGGREGATE_PIXELMAPPING_ALARM, '', 0, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.AGGREGATE_CALIBAPP_ALARM, '', 0, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);

	// Add all general alarms to the list.
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_HEARTBEAT_ERROR_AL9100, 	'Hardware', 9100, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_HARDWARE_ERROR_AL9103, 		'Hardware', 9103, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_EDGE, 		alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_SUPPLY_FAN_FAIL_AL9104, 	'Hardware', 9104, vfALARMS_SEVERITY_WARNING, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_SUPPLY_OVERTEMP_AL9105, 	'Hardware', 9105, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_SUPPLY_AC_LOW_AL9106, 		'Hardware', 9106, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_SUPPLY_DC_FAIL_AL9107, 		'Hardware', 9107, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_CONTROL_POWER_AL9108, 		'Hardware', 9108, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_EDGE, 		alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_LASER_READY_FAIL_AL9109, 	'Hardware', 9109, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_LASER_MAIN_POWER_AL9110, 	'Hardware', 9110, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_LASER_EMISSION_AL9111, 		'Hardware', 9111, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_LASER_FATAL_AL9112, 		'Hardware', 9112, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_LASER_WATCHDOG_AL9113, 		'Hardware', 9113, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_HW_POWERLINK_ERROR_AL9114, 	'Hardware', 9114, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_SW_VERSION_MISMATCH_AL9200, 	'Software', 9200, vfALARMS_SEVERITY_WARNING, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_SW_ID_MISMATCH_AL9201, 		'Software', 9201, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_SW_LUT_LOAD_FAIL_AL9202, 		'Software', 9202, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_SW_MAP_UNDEFINED_AL9203, 		'Software', 9203, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_SW_SYSTEM_ERROR_AL9204, 		'Software', 9204, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_EDGE, 		alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_SW_TRAJECTORY_ERROR_AL9205, 	'Software', 9205, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_EDGE, 		alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_SW_PRINT_NOT_READY_AL9206, 	'Software', 9206, vfALARMS_SEVERITY_CRITICAL, 	vfALARMS_BEHAVIOR_EDGE, 		alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_SW_COMMAND_INHIBIT_AL9207, 	'Software', 9207, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_EDGE, 		alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_DISABLE_CHILLER_RUN_AL9208,    'Software', 9208, vfALARMS_SEVERITY_ALARM,      vfALARMS_BEHAVIOR_EDGE, 	    alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_DISABLE_OB_FLOW_LOW_AL9209,    'Software', 9209, vfALARMS_SEVERITY_ALARM,      vfALARMS_BEHAVIOR_EDGE, 	    alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_VERIFY_INHIBIT_AL9210,			'Software', 9210, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_EDGE, 		alarmData);
	
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_PM_FILE_NOT_FOUND_AL9300, 		'Pixel Mapping', 9300, vfALARMS_SEVERITY_ALARM, 	vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_PM_PATH_NOT_FOUND_AL9301, 		'Pixel Mapping', 9301, vfALARMS_SEVERITY_ALARM, 	vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_PM_FILE_OPEN_ERROR_AL9302, 	'Pixel Mapping', 9302, vfALARMS_SEVERITY_ALARM, 	vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_PM_FILE_CLOSE_ERROR_AL9303, 	'Pixel Mapping', 9303, vfALARMS_SEVERITY_ALARM, 	vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_PM_FILE_READ_ERROR_AL9304, 	'Pixel Mapping', 9304, vfALARMS_SEVERITY_ALARM, 	vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_PM_FILE_DATA_ERROR_AL9305, 	'Pixel Mapping', 9305, vfALARMS_SEVERITY_ALARM, 	vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_PM_VERSION_CONFLICT_AL9306, 	'Pixel Mapping', 9306, vfALARMS_SEVERITY_WARNING, 	vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_PM_IGNORED_PIXEL_AL9307, 		'Pixel Mapping', 9307, vfALARMS_SEVERITY_WARNING, 	vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_PM_RANGE_EXCEEDED_AL9308, 		'Pixel Mapping', 9308, vfALARMS_SEVERITY_WARNING, 	vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gVFLCR.alarm.PIXEL_ENABLE_MISMATCH_AL9309,		'Pixel Mapping', 9309, vfALARMS_SEVERITY_ALARM, 	vfALARMS_BEHAVIOR_EDGE, alarmData);
	
	// python calibration app alarms
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_APP_HEARTBEAT_ERROR_AL9400,	'App', 9400, vfALARMS_SEVERITY_ALARM,	 	vfALARMS_BEHAVIOR_PERSISTENT, 	alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_APP_COMMAND_TIMEOUT_AL9401,	'App', 9401, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_EDGE, 		alarmData);	
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_APP_CMD_B4_READY_AL9402,		'App', 9402, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_EDGE, 		alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_APP_RESULTS_TIMEOUT_AL9403,	'App', 9403, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_EDGE, 		alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_APP_BUCKET_MISSING_AL9404,		'App', 9404, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_EDGE, 		alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_APP_S3_CONNECTION_AL9405,		'App', 9405, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_EDGE, 		alarmData);
	vfAddAlarmApi(gVFLCR.alarm.VFLCR_APP_CAPTURE_FAILED_AL9406,		'App', 9406, vfALARMS_SEVERITY_ALARM, 		vfALARMS_BEHAVIOR_EDGE, 		alarmData);

	// Add snippets.
	vfAddSnippet('MachineID', '::gConfiguration.machineIdentity.machineNumber', alarmData);
	vfAddSnippet('VFLCRAlarmRackNumber', '::gLaserSnippets.rackNumber', alarmData);
	vfAddSnippet('VFLCRAlarmLaserNumber', '::gLaserSnippets.laserNumber', alarmData);
	vfAddSnippet('VFLCRAlarmPixelNumber', '::gLaserSnippets.pixelNumber', alarmData);
	vfAddSnippet('VFLCRAlarmPowerSupplyNumber', '::gLaserSnippets.supplyNumber', alarmData);
	vfAddSnippet('AdditionalInfoLaserFatal', '::gLaserSnippets.additionalInfoLaserFatal', alarmData);
	vfAddSnippet('MaxPixelDefined', '::VFLCR_PixelMapping:MACHINE_NUM_LASERS_TOTAL', alarmData);
	vfAddSnippet('MaxRackDefined', '::VFLCR_PixelMapping:MACHINE_NUM_LASER_RACKS', alarmData);
	vfAddSnippet('MaxLasersDefined', '::VFLCR_PixelMapping:MACHINE_NUM_LASERS_PER_RACK', alarmData);
	
	// Add all name-based alarm mappings.
//	vfAddAggregationByNameApi('*VFLCR_PM_*', gVFLCR.alarm.AGGREGATE_PIXELMAPPING_ALARM, alarmData);
//	vfAddAggregationByNameApi('*VFLCR_SW_*', gVFLCR.alarm.AGGREGATE_SOFTWARE_ALARM, alarmData);
//	vfAddAggregationByNameApi('*VFLCR_HW_*', gVFLCR.alarm.AGGREGATE_HARDWARE_ALARM, alarmData);
//	vfAddAggregationByNameApi('*VFLCR_APP_*', gVFLCR.alarm.AGGREGATE_CALIBAPP_ALARM, alarmData);
//	vfAddAggregationByNameApi('*VFLCR_*', gVFLCR.alarm.AGGREGATE_GENERAL_ALARM, alarmData);
	
	// Add log name mappings.
	//	vfAddLogOriginMapping('gAxisVFLCRLeftLiftFront', 'VFLCR: Left Lift Front Axis', gLogMapping);
	//	vfAddLogOriginMapping('gAxisVFLCRLeftLiftRear', 'VFLCR: Left Lift Rear Axis', gLogMapping);
	//	vfAddLogOriginMapping('gAxisVFLCRRightLiftFront', 'VFLCR: Right Lift Front Axis', gLogMapping);
	//	vfAddLogOriginMapping('gAxisVFLCRRightLiftRear', 'VFLCR: Right Lift Rear Axis', gLogMapping);
	//	vfAddLogOriginMapping('gAxisVFLCRRailFront', 'VFLCR: Rail Front Axis', gLogMapping);
	//	vfAddLogOriginMapping('gAxisVFLCRRailRear', 'VFLCR: Rail Rear Axis', gLogMapping);
	
	// Create the alarm configuration.
	vfCreateAlarmsFaster(alarmData);
	
	// load core
	gVFLCR.alarm.components.core.Enable := TRUE;
	gVFLCR.alarm.components.core.MpLink := ADR(gVFLCR.alarm.components.link);
	gVFLCR.alarm.components.core();
	
	registerStateParameters( gAlarmApi.cores, gVFLCR.alarm.components.name, ADR(gVFLCR.alarm.components), SIZEOF(gVFLCR.alarm.components) );
	
END_PROGRAM

PROGRAM _CYCLIC

	 
END_PROGRAM

PROGRAM _EXIT

	 
END_PROGRAM

