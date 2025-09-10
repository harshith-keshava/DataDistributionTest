
PROGRAM _INIT
	
	//Populate alarm enum
	varPopulateMemberNames('gPrintJobManagement.alarms', UDINT_TO_USINT(brsstrlen(ADR('gPrintJobManagement.alarms')) + 1));
	
	
	alarmLink ACCESS ADR(alarm_PrintMan);

	// Choose core
	gPrintJobManagement.alarms.components.link := alarmLink;
	gPrintJobManagement.alarms.components.name  := 'Print Management';

	//Configure alarm data
	// Parameterize the alarms data struct with several one time assignments. 
	alarmData.in.mpLink := ADR(alarmLink);
	alarmData.in.mpLinkName := 'alarm_PrintMan';
	alarmData.in.deviceName := 'AlarmData';
	alarmData.in.scope := 'Print Management';
	alarmData.in.snippetPvName := 'gPrintJobManagement.alarms';
	alarmData.in.escalateAll := TRUE;
	
	// Set the default mapping for this alarm component. 
	vfSetDefaultMapping(vfALARMS_MAPPING_ESCALATE, '', alarmData);

	
	// Add all general alarms to the list.	
	vfAddAlarmApi(gPrintJobManagement.alarms.AGGREGATE_GENERAL_ALARM, 'Software', 0, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_PERSISTENT, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.COMMAND_BEFORE_READY, 'Software', 0, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.COMMAND_INHIBITED, 'Software', 0, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.BuildInfoFileError_AL0020, 'Software', 20, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.PixelActiveOnIgnoredLaser_AL0021, 'Software', 21, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_PERSISTENT, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.Inhibited_AL0022, 'Software', 22, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.FileLoadError_AL0023, 'Software', 23, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.FileSaveError_AL0024, 'Software', 24, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.BuildInfoValidRequired_AL0025, 'Software', 25, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.InvalidCurrentLayer_AL0026, 'Software', 26, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.PrintingNotAllowed_AL0027, 'Software', 27, vfALARMS_SEVERITY_CRITICAL, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.RecoatNotAllowed_AL0028, 'Software', 28, vfALARMS_SEVERITY_CRITICAL, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.BPThicknessInvalid_AL0029, 'Software', 29, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_PERSISTENT, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.NotAllowedToEnterLopMode_AL0030, 'Software', 30, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.NotAllowedToResetPrint_AL0031, 'Software', 31, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.RecoaterOffsetInvalid_AL0032, 'Software', 32, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_PERSISTENT, alarmData);
	vfAddAlarmApi(gPrintJobManagement.alarms.InterlockDoorOpened_AL0033, 'Software', 33, vfALARMS_SEVERITY_ALARM, vfALARMS_BEHAVIOR_EDGE, alarmData);
	
	// Add snippets
	
	// Add all name-based alarm mappings.
	//	vfAddAggregationByNameApi('*', gPrintJobManagement.alarms.AGGREGATE_GENERAL_ALARM, alarmData);

	// Add log name mappings.
	
	// Create the alarm configuration.
	vfCreateAlarmsFaster(alarmData);
	
	// load core
	gPrintJobManagement.alarms.components.core.Enable := TRUE;
	gPrintJobManagement.alarms.components.core.MpLink := ADR(alarmLink);
	gPrintJobManagement.alarms.components.core();
	
	registerStateParameters( gAlarmApi.cores, gPrintJobManagement.alarms.components.name, ADR(gPrintJobManagement.alarms.components), SIZEOF(gPrintJobManagement.alarms.components) );
	
END_PROGRAM

PROGRAM _CYCLIC
	
	 
END_PROGRAM

PROGRAM _EXIT
	 
END_PROGRAM

