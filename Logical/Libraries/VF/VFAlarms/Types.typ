
TYPE
	vfAlarms_Data_typ : 	STRUCT 
		in : vfAlarms_Data_In_typ;
		out : vfAlarms_Data_Out_typ;
		internal : vfAlarms_Data_Internal_typ;
	END_STRUCT;
	vfAlarms_Data_In_typ : 	STRUCT 
		mpLink : UDINT;
		deviceName : STRING[80];
		scope : STRING[80];
		mpLinkName : STRING[80];
		snippetPvName : STRING[80];
		escalateAll : BOOL;
	END_STRUCT;
	vfAlarms_Data_Internal_typ : 	STRUCT 
		fub : vfAlarms_Data_Internal_Fub_typ;
		defaultMapping : vfAlarms_DefaultMapping_typ;
		alarms : ARRAY[0..vfALARMS_MAI_ALARMS]OF vfAlarms_Item_typ;
		snippets : ARRAY[0..vfALARMS_MAI_SNIPPETS]OF vfAlarms_Snippet_typ;
		reactions : vfAlarms_Reactions_typ;
		aggregations : vfAlarms_Aggregations_typ;
		fileName : STRING[80];
		xmlIdent : UDINT;
		pXmlData : UDINT;
		szXmlData : UDINT;
	END_STRUCT;
	vfAlarms_DefaultMapping_typ : 	STRUCT 
		type : vfALARMS_MAPPING_enum;
		alarmName : STRING[vfALARMS_MAX_NAME_LEN];
	END_STRUCT;
	vfAlarms_Aggregations_typ : 	STRUCT 
		byName : ARRAY[0..vfALARMS_MAI_MAPPINGS]OF vfAlarms_AggByName_typ;
		bySeverity : ARRAY[0..vfALARMS_MAI_MAPPINGS]OF vfAlarms_AggBySeverity_typ;
	END_STRUCT;
	vfAlarms_AggByName_typ : 	STRUCT 
		name : STRING[vfALARMS_MAX_NAME_LEN];
		aggregationName : STRING[vfALARMS_MAX_NAME_LEN];
	END_STRUCT;
	vfAlarms_AggBySeverity_typ : 	STRUCT 
		severity : vfALARMS_SEVERITY_enum;
		aggregationName : STRING[vfALARMS_MAX_NAME_LEN];
	END_STRUCT;
	vfAlarms_Reactions_typ : 	STRUCT 
		byNameNotEscalated : ARRAY[0..vfALARMS_MAI_MAPPINGS]OF vfAlarms_ReactionByName_typ;
		byName : ARRAY[0..vfALARMS_MAI_MAPPINGS]OF vfAlarms_ReactionByName_typ;
		bySeverity : ARRAY[0..vfALARMS_MAI_MAPPINGS]OF vfAlarms_ReactionBySeverity_typ;
	END_STRUCT;
	vfAlarms_ReactionByName_typ : 	STRUCT 
		name : STRING[vfALARMS_MAX_NAME_LEN];
		reactionName : ARRAY[0..vfALARMS_MAI_REACTIONS]OF STRING[vfALARMS_MAX_REACTION_LEN];
	END_STRUCT;
	vfAlarms_ReactionBySeverity_typ : 	STRUCT 
		severity : vfALARMS_SEVERITY_enum;
		reactionName : ARRAY[0..vfALARMS_MAI_REACTIONS]OF STRING[vfALARMS_MAX_REACTION_LEN];
	END_STRUCT;
	vfAlarms_Data_Internal_Fub_typ : 	STRUCT 
		manageConfiguration : MpComConfigManager;
		xmlCreateMemoryWriter : xmlCreateMemoryWriter;
		xmlWriteStartDocument : xmlWriteStartDocument;
		xmlWriteStartElement : xmlWriteStartElement;
		xmlWriteAttribute : xmlWriteAttribute;
		xmlWriteEndElement : xmlWriteEndElement;
		xmlWriteEndDocument : xmlWriteEndDocument;
		xmlGetMemoryInfo : xmlGetMemoryInfo;
		xmlCloseMemoryWriter : xmlCloseMemoryWriter;
		fioWrapper : FIOWrap_typ;
	END_STRUCT;
	vfAlarms_Data_Out_typ : 	STRUCT 
		done : BOOL;
		error : BOOL;
		errorId : DINT;
		errorString : STRING[80];
	END_STRUCT;
	vfAlarms_Item_typ : 	STRUCT 
		name : STRING[vfALARMS_MAX_NAME_LEN];
		scope : STRING[vfALARMS_MAX_NAME_LEN];
		textScope : STRING[vfALARMS_MAX_NAME_LEN];
		code : UDINT;
		severity : vfALARMS_SEVERITY_enum;
		behavior : vfALARMS_BEHAVIOR_enum;
	END_STRUCT;
	vfAlarms_Snippet_typ : 	STRUCT 
		key : STRING[vfALARMS_MAX_SNIPPET_KEY_LEN];
		pvName : STRING[vfALARMS_MAX_SNIPPET_PV_NAME_LEN];
	END_STRUCT;
	vfAlarms_Component_typ : 	STRUCT 
		link : {REDUND_UNREPLICABLE} MpComIdentType;
		core : {REDUND_UNREPLICABLE} MpAlarmXCore;
		noDisplay : BOOL;
		name : STRING[80];
	END_STRUCT;
	vfAlarms_Instance_type : 	STRUCT 
		_ : STRING[80];
		id : UDINT;
		snippet : STRING[vfALARMS_MAX_SNIPPET_STR_LENGTH];
	END_STRUCT;
	Log_Origin_Mappings_typ : 	STRUCT 
		originFormatted : ARRAY[0..LOGBOOK_MAI_MAPPINGS]OF STRING[32];
		originRaw : ARRAY[0..LOGBOOK_MAI_MAPPINGS]OF STRING[32];
	END_STRUCT;
	vfALARMS_MAPPING_enum : 
		(
		vfALARMS_MAPPING_REMAIN,
		vfALARMS_MAPPING_AGGREGATE,
		vfALARMS_MAPPING_ESCALATE
		);
	vfALARMS_BEHAVIOR_enum : 
		(
		vfALARMS_BEHAVIOR_PERSISTENT,
		vfALARMS_BEHAVIOR_EDGE
		);
	vfALARMS_SEVERITY_enum : 
		(
		vfALARMS_SEVERITY_NONE := 0,
		vfALARMS_SEVERITY_INFO := 1,
		vfALARMS_SEVERITY_WARNING := 2,
		vfALARMS_SEVERITY_ALARM := 3,
		vfALARMS_SEVERITY_CRITICAL := 4
		);
	vfALARMS_XML_TYPE_enum : 
		(
		vfALARMS_XML_TYPE_START_WRITE,
		vfALARMS_XML_TYPE_START_DOC,
		vfALARMS_XML_TYPE_START_ELEM,
		vfALARMS_XML_TYPE_ATTRIBUTE,
		vfALARMS_XML_TYPE_END_ELEM,
		vfALARMS_XML_TYPE_END_DOC,
		vfALARMS_XML_TYPE_GET_MEM,
		vfALARMS_XML_TYPE_END_WRITE
		);
	vfALARMS_FILE_CMD_enum : 
		(
		vfALARMS_FILE_CMD_DELETE,
		vfALARMS_FILE_CMD_SAVE
		);
END_TYPE
