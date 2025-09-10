
PROGRAM _INIT
	
	//Populate alarm enum
	varPopulateMemberNames('gMQTTApi.alarms', UDINT_TO_USINT(brsstrlen(ADR('gMQTTApi.alarms')) + 1));
	
	
	// Choose core
	gMQTTApi.alarms.components.link := alarm_MQTT;
	gMQTTApi.alarms.components.name  := 'MQTT';
	
	//Configure alarm data
	// Parameterize the alarms data struct with several one time assignments. 
	alarmData.in.mpLink := ADR(gMQTTApi.alarms.components.link);
	alarmData.in.mpLinkName := 'alarm_MQTT';
	alarmData.in.deviceName := 'AlarmData';
	alarmData.in.scope := 'DataCollection';
	alarmData.in.snippetPvName := 'gMQTTApi.alarms';
	alarmData.in.escalateAll := TRUE;
	
	
	
	// Set the default mapping for this alarm component. 
	vfSetDefaultMapping(vfALARMS_MAPPING_ESCALATE, '', alarmData);

	
	// Add all general alarms to the list.	
	vfAddAlarmApi(gMQTTApi.alarms.MQTT_SW_CONNECTION_ERROR_AL1400, 'Software', 1400, vfALARMS_SEVERITY_INFO, vfALARMS_BEHAVIOR_PERSISTENT , alarmData);
	vfAddAlarmApi(gMQTTApi.alarms.MQTT_SW_PUBLISH_INHIBIT_AL1401, 'Software', 1401, vfALARMS_SEVERITY_INFO, vfALARMS_BEHAVIOR_EDGE , alarmData);
	vfAddAlarmApi(gMQTTApi.alarms.MQTT_SW_JSON_READ_ERROR_AL1402, 'Software', 1402, vfALARMS_SEVERITY_INFO, vfALARMS_BEHAVIOR_EDGE , alarmData);
	vfAddAlarmApi(gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'Software', 1403, vfALARMS_SEVERITY_INFO, vfALARMS_BEHAVIOR_EDGE , alarmData);
	vfAddAlarmApi(gMQTTApi.alarms.MQTT_SW_SUBSCRIBE_INHIBIT_AL1404, 'Software', 1404, vfALARMS_SEVERITY_INFO, vfALARMS_BEHAVIOR_EDGE , alarmData);
	vfAddAlarmApi(gMQTTApi.alarms.MQTT_SW_DATA_SUBS_ERR_AL1405, 'Software', 1405, vfALARMS_SEVERITY_INFO, vfALARMS_BEHAVIOR_EDGE , alarmData);
	vfAddAlarmApi(gMQTTApi.alarms.MQTT_SW_JSON_WRITE_ERR_AL1406, 'Software', 1406, vfALARMS_SEVERITY_INFO, vfALARMS_BEHAVIOR_EDGE , alarmData);
	vfAddAlarmApi(gMQTTApi.alarms.MQTT_SW_PRINT_NOT_ALLOWED_AL1407, 'Software', 1407, vfALARMS_SEVERITY_INFO, vfALARMS_BEHAVIOR_EDGE , alarmData);
		// Add snippets.
	//vfAddSnippet('nameOfAlarmedMv','::FilterAlarms:nameOfAlarmedMv', alarmData);
	vfAddSnippet('inhibitReason','::MQTTDataCollection:task.internal.inhibitReason', alarmData);

	// Add all name-based alarm mappings.
	
	// Add log name mappings.
	
	// Create the alarm configuration.
	vfCreateAlarmsFaster(alarmData);
	
	// load core
	gMQTTApi.alarms.components.core.Enable := TRUE;
	gMQTTApi.alarms.components.core.MpLink := ADR(gMQTTApi.alarms.components.link);
	gMQTTApi.alarms.components.core();
	
	registerStateParameters( gAlarmApi.cores, gMQTTApi.alarms.components.name, ADR(gMQTTApi.alarms.components), SIZEOF(gMQTTApi.alarms.components) );
END_PROGRAM

PROGRAM _CYCLIC
	
	IF testAlarm THEN
		testAlarm := FALSE;
		testSnippet := 'this is a test event';
		vfAlarmEdgeSnippet(gMQTTApi.alarms.components,gMQTTApi.alarms.MQTT_SW_DATA_PUBLISH_ERR_AL1403, 'this is a test event');
	END_IF 
END_PROGRAM

PROGRAM _EXIT
	 
END_PROGRAM

