
TYPE
	VFLCRApi_typ : 	STRUCT 
		command : VFLCRApiCommand_typ;
		status : VFLCRApiStatus_typ;
		IO : VFLCRApiIO_typ;
		alarm : VFLCRApiAlarm_typ;
	END_STRUCT;
	VFLCRApiCommand_typ : 	STRUCT 
		openLayer : STRING[80];
		abortLayer : STRING[80];
		deleteLaserControlFiles : STRING[80];
	END_STRUCT;
	VFLCRApiStatus_typ : 	STRUCT 
		layerOpen : STRING[80];
	END_STRUCT;
	VFLCRApiIO_typ : 	STRUCT 
		rack : STRING[80];
	END_STRUCT;
	VFLCRApiAlarm_typ : 	STRUCT 
		components : vfAlarms_Component_typ;
		AGGREGATE_GENERAL_ALARM : vfAlarms_Instance_type;
		AGGREGATE_HARDWARE_ALARM : vfAlarms_Instance_type;
		AGGREGATE_SOFTWARE_ALARM : vfAlarms_Instance_type;
		AGGREGATE_PIXELMAPPING_ALARM : vfAlarms_Instance_type;
		AGGREGATE_CALIBAPP_ALARM : vfAlarms_Instance_type;
		VFLCR_HW_HEARTBEAT_ERROR_AL9100 : vfAlarms_Instance_type;
		VFLCR_HW_HARDWARE_ERROR_AL9103 : vfAlarms_Instance_type;
		VFLCR_HW_SUPPLY_FAN_FAIL_AL9104 : vfAlarms_Instance_type;
		VFLCR_HW_SUPPLY_OVERTEMP_AL9105 : vfAlarms_Instance_type;
		VFLCR_HW_SUPPLY_AC_LOW_AL9106 : vfAlarms_Instance_type;
		VFLCR_HW_SUPPLY_DC_FAIL_AL9107 : vfAlarms_Instance_type;
		VFLCR_HW_CONTROL_POWER_AL9108 : vfAlarms_Instance_type;
		VFLCR_HW_LASER_READY_FAIL_AL9109 : vfAlarms_Instance_type;
		VFLCR_HW_LASER_MAIN_POWER_AL9110 : vfAlarms_Instance_type;
		VFLCR_HW_LASER_EMISSION_AL9111 : vfAlarms_Instance_type;
		VFLCR_HW_LASER_FATAL_AL9112 : vfAlarms_Instance_type;
		VFLCR_HW_LASER_WATCHDOG_AL9113 : vfAlarms_Instance_type;
		VFLCR_HW_POWERLINK_ERROR_AL9114 : vfAlarms_Instance_type;
		VFLCR_SW_VERSION_MISMATCH_AL9200 : vfAlarms_Instance_type;
		VFLCR_SW_ID_MISMATCH_AL9201 : vfAlarms_Instance_type;
		VFLCR_SW_LUT_LOAD_FAIL_AL9202 : vfAlarms_Instance_type;
		VFLCR_SW_MAP_UNDEFINED_AL9203 : vfAlarms_Instance_type;
		VFLCR_SW_SYSTEM_ERROR_AL9204 : vfAlarms_Instance_type;
		VFLCR_SW_TRAJECTORY_ERROR_AL9205 : vfAlarms_Instance_type;
		VFLCR_SW_PRINT_NOT_READY_AL9206 : vfAlarms_Instance_type;
		VFLCR_SW_COMMAND_INHIBIT_AL9207 : vfAlarms_Instance_type;
		VFLCR_PM_FILE_NOT_FOUND_AL9300 : vfAlarms_Instance_type;
		VFLCR_PM_PATH_NOT_FOUND_AL9301 : vfAlarms_Instance_type;
		VFLCR_PM_FILE_OPEN_ERROR_AL9302 : vfAlarms_Instance_type;
		VFLCR_PM_FILE_CLOSE_ERROR_AL9303 : vfAlarms_Instance_type;
		VFLCR_PM_FILE_READ_ERROR_AL9304 : vfAlarms_Instance_type;
		VFLCR_PM_FILE_DATA_ERROR_AL9305 : vfAlarms_Instance_type;
		VFLCR_PM_VERSION_CONFLICT_AL9306 : vfAlarms_Instance_type;
		VFLCR_PM_IGNORED_PIXEL_AL9307 : vfAlarms_Instance_type;
		VFLCR_PM_RANGE_EXCEEDED_AL9308 : vfAlarms_Instance_type;
		VFLCR_APP_HEARTBEAT_ERROR_AL9400 : vfAlarms_Instance_type;
		VFLCR_APP_COMMAND_TIMEOUT_AL9401 : vfAlarms_Instance_type;
		VFLCR_APP_CMD_B4_READY_AL9402 : vfAlarms_Instance_type;
		VFLCR_APP_RESULTS_TIMEOUT_AL9403 : vfAlarms_Instance_type;
		VFLCR_APP_BUCKET_MISSING_AL9404 : vfAlarms_Instance_type;
		VFLCR_APP_S3_CONNECTION_AL9405 : vfAlarms_Instance_type;
		VFLCR_APP_CAPTURE_FAILED_AL9406 : vfAlarms_Instance_type;
		VFLCR_DISABLE_CHILLER_RUN_AL9208 : vfAlarms_Instance_type;
		VFLCR_DISABLE_OB_FLOW_LOW_AL9209 : vfAlarms_Instance_type;
		PIXEL_ENABLE_MISMATCH_AL9309 : vfAlarms_Instance_type;
		VFLCR_VERIFY_INHIBIT_AL9210 : vfAlarms_Instance_type;
	END_STRUCT;
	VFLCROpenLayerCommandPars_typ : 	STRUCT 
		parameters : VFLCROpenLayerParameters_typ;
	END_STRUCT;
	VFLCROpenLayerRackPars_typ : 	STRUCT 
		Rack : USINT;
	END_STRUCT;
	VFLCROpenLayerParameters_typ : 	STRUCT 
		selectedBuildLayout : UDINT;
		selectedPrintNumber : UINT;
		selectedLayer : UDINT;
	END_STRUCT;
	LaserSnippets_typ : 	STRUCT 
		rackNumber : USINT;
		laserNumber : USINT;
		pixelNumber : USINT;
		supplyNumber : USINT;
		additionalInfoLaserFatal : STRING[160];
	END_STRUCT;
END_TYPE
