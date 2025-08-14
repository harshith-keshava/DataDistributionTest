
TYPE
	BuildCoordinate_typ : 	STRUCT 
		X : REAL;
		Y : REAL;
		Z : REAL;
	END_STRUCT;
	BuildVolumeExtents_typ : 	STRUCT 
		min : BuildCoordinate_typ;
		max : BuildCoordinate_typ;
	END_STRUCT;
	BuildInformation_typ : 	STRUCT  (*CAUTION: Structure member names must match those in BuildInfo.xml file*)
		base_filename : STRING[20]; (*example:  VF-XXXXX-YYYY*)
		build_iter : UINT; (*example:  2*)
		build_layout : UDINT; (*example:  XXXXX*)
		print_number : UINT; (*example:  YYYY*)
		num_layers : UINT; (*example:  1000*)
		layer_height : REAL; (*example:  0.050*)
		num_trajectories_x : UDINT;
		num_trajectories_y : UDINT;
		num_intralayer_gashead_cleans : UINT;
		avg_trajectory_length_y : REAL;
		total_cooling_delay : UDINT;
		avg_trajectory_length_x : REAL;
		trajectory_velocity : REAL;
		trajectory_acceleration : REAL;
		index_velocity : REAL;
		index_acceleration : REAL;
		platform_id : USINT; (*example:  1=200x600, 2=400x600, 3=600x600, 4=...*)
		description : STRING[80]; (*example:  ZStepFocusTest*)
		author : STRING[40]; (*example:  Joe Schmoe*)
		print_owner : STRING[40]; (*example:  Joe Schmoe*)
		platform_name : STRING[20]; (*example:  200x600*)
		cmmFilename : STRING[100];
		CameraCalibration : UINT;
		SubPlateInUse : BOOL;
		build_volume_limits : BuildVolumeExtents_typ;
		SoftwareInfo : BuildSoftwareInfo_typ;
		BuildInstanceInfo : BuildInstanceInfo_typ;
		BuildPrinterInfo : BuildPrinterInfo_typ;
	END_STRUCT;
	BuildInstanceInfo_typ : 	STRUCT 
		base_unique_id : STRING[40]; (*example:  2021-08-27-08-59-55-VF-00244-0007*)
		PrinterInfo : BuildPrinterInfo_typ;
		active_pixels : ARRAY[0..147]OF BOOL; (*example:  pixel number is TRUE if used by the build, FALSE if not used*)
	END_STRUCT;
	BuildPrinterInfo_typ : 	STRUCT 
		name : STRING[20]; (*example:  BETA, GEN2, DP1, DP2, ... DP21*)
		vfpmap_version : UINT; (*example:  3*)
		encoder_tick_width : REAL; (*example:  0.001000*)
		max_gantry_speed : REAL; (*example:  1000*)
		max_gantry_acceleration : REAL; (*example:  9800*)
		max_laser_count : UINT; (*example:  147*)
		laser_line_angle : REAL; (*example:  45.00*)
		head_center_offset : REAL; (*example:  36.750*)
		laser_spacing : REAL; (*example:  0.500*)
		min_laser_watts : REAL; (*example:  0*)
		max_laser_watts : REAL; (*example:  525*)
		phy_laser_encoding : STRING[20]; (*example:  VFLCR*)
		gantry_max_pos_x : REAL;
		gantry_max_pos_y : REAL;
		gantry_min_pos_x : REAL;
		gantry_min_pos_y : REAL;
	END_STRUCT;
	BuildSoftwareInfoDetails_typ : 	STRUCT 
		version : STRING[20]; (*example:  1_2_8*)
		branch : STRING[20]; (*example:  master*)
		commit : STRING[60]; (*example:  814c89354298fdffd768bf74d4408e2ac6ac2c64*)
	END_STRUCT;
	BuildSoftwareInfo_typ : 	STRUCT 
		Configuration_Editor : BuildSoftwareInfoDetails_typ;
		Raster_Engine : BuildSoftwareInfoDetails_typ;
	END_STRUCT;
END_TYPE

(*PRINT PROCESS CONFIG*)

TYPE
	PrintProcessConfig_typ : 	STRUCT 
		MachineName : STRING[5];
		Description : STRING[255];
		FileFormatVersion : INT;
		DateTimeGenerated : STRING[30];
		ParamterSetpoints : ARRAY[1..DIGITAL_PCI_MAX_PARS]OF ParamterSetpoints_typ;
	END_STRUCT;
	ParamterSetpoints_typ : 	STRUCT 
		Name : STRING[50];
		Used : BOOL;
		EngineeringUnits : STRING[25];
		ParDataType : STRING[10];
		HmiRangeMin : REAL;
		HmiRangeMax : REAL;
		FixedValue : REAL;
		EnableLayerRangeChanges : BOOL;
		NumberOfLayerValuesUsed : USINT;
		LayerSpecificValues : ARRAY[1..DIGITAL_PCI_MAX_LAYER_CHANGE]OF LayerSpecificValues_typ;
	END_STRUCT;
	LayerSpecificValues_typ : 	STRUCT 
		LayerValue : REAL;
		LayerStart : INT;
		LayerEnd : INT;
	END_STRUCT;
	DerivedProcessParameters_typ : 	STRUCT 
		Name : STRING[50];
		Used : BOOL;
		EngineeringUnits : STRING[25];
		ParDataType : STRING[10];
		HmiRangeMin : REAL;
		HmiRangeMax : REAL;
		DerivedValue : REAL;
	END_STRUCT;
	ProcessParameters : 
		(
		CONTINUOUS_MODE_ENABLE := 1,
		GAS_FLOW_LPM,
		REC_SPREAD_MOVE_VEL,
		REC_APPROACH_MOVE_VEL,
		ELECTRODE_ENABLE,
		ELECTRODE_GAIN_PERCENT,
		MH_INITIAL_DISP_ROTATIONS,
		MH_CONT_DISP_ROTATIONS,
		AI_MAX_RECOAT_LIMIT
		);
END_TYPE
