
{REDUND_ERROR} FUNCTION vfAddSnippet : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		key : STRING[vfALARMS_MAX_SNIPPET_KEY_LEN]; (*The name of the snippet that will be referenced in a TMX file (i.e. via {&snippet})*)
		pvName : STRING[vfALARMS_MAX_SNIPPET_PV_NAME_LEN]; (*The name of the PV, including task name (i.e. ::myTask:MyPV)*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAddAggregationBySeverity : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		severity : vfALARMS_SEVERITY_enum; (*The severity that triggers this aggregation*)
		aggregationName : STRING[vfALARMS_MAX_NAME_LEN]; (*The name of the alarm that gets escalated during aggregation*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAddAggregationByName : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		name : STRING[vfALARMS_MAX_NAME_LEN]; (*The alarm name that triggers the aggregation*)
		aggregationName : STRING[vfALARMS_MAX_NAME_LEN]; (*The name of the alarm that gets escalated during aggregation*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAddReactionBySeverity : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		severity : vfALARMS_SEVERITY_enum; (*The severity that triggers these reactions*)
		reactionName1 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated severity*)
		reactionName2 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated severity*)
		reactionName3 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated severity*)
		reactionName4 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated severity*)
		reactionName5 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated severity*)
		reactionName6 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated severity*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAddReactionByName : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		name : STRING[vfALARMS_MAX_NAME_LEN]; (*The alarm name that triggers these reactions*)
		reactionName1 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
		reactionName2 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
		reactionName3 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
		reactionName4 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
		reactionName5 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
		reactionName6 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAddNonEscalatedReactionByName : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		name : STRING[vfALARMS_MAX_NAME_LEN]; (*The alarm name that triggers these reactions*)
		reactionName1 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
		reactionName2 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
		reactionName3 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
		reactionName4 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
		reactionName5 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
		reactionName6 : STRING[vfALARMS_MAX_REACTION_LEN]; (*A reaction that gets triggered by the associated alarm name*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfSetDefaultMapping : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		type : vfALARMS_MAPPING_enum; (*The default type of mapping to trigger*)
		alarmName : STRING[vfALARMS_MAX_NAME_LEN]; (*The name of the alarm that gets escalated for aggregation mappings*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAddAlarm : BOOL (*Add a new alarm definition to the local alarm system*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		name : STRING[vfALARMS_MAX_NAME_LEN]; (*The name of the alarm being defined (i.e. this is the name referenced later by MpAlarmXSet calls)*)
		scope : STRING[vfALARMS_MAX_NAME_LEN]; (*The "Origin" field that will show up on the HMI*)
		code : UDINT; (*The error code associated with this alarm*)
		severity : vfALARMS_SEVERITY_enum; (*The severity of the alarm*)
		behavior : vfALARMS_BEHAVIOR_enum; (*The behavior of the alarm*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAddAlarmTextScope : BOOL (*Add a new alarm definition to the local alarm system*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		name : STRING[vfALARMS_MAX_NAME_LEN]; (*The name of the alarm being defined (i.e. this is the name referenced later by MpAlarmXSet calls)*)
		scope : STRING[vfALARMS_MAX_NAME_LEN]; (*The "Origin" field that will show up on the HMI*)
		textScope : STRING[vfALARMS_MAX_NAME_LEN]; (*The "Origin" field that will show up on the HMI*)
		code : UDINT; (*The error code associated with this alarm*)
		severity : vfALARMS_SEVERITY_enum; (*The severity of the alarm*)
		behavior : vfALARMS_BEHAVIOR_enum; (*The behavior of the alarm*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfCreateAlarmsFaster : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAddLogOriginMapping : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		originRaw : STRING[32]; (*The default value B&R uses in the "Entered By" column in the Logger*)
		originFormatted : STRING[32]; (*The desired replacement value for the "Entered By" column*)
	END_VAR
	VAR_IN_OUT
		map : Log_Origin_Mappings_typ; (*The global Log mappings data structure*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfLookupOrigin : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		pOriginRaw : UDINT; (*A pointer to the raw "Entered By" name*)
		pOriginFormatted : UDINT; (*A pointer to the new formatted "Entered By" name*)
	END_VAR
	VAR_IN_OUT
		map : Log_Origin_Mappings_typ; (*The global Log mappings data structure*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfSetDefaultMappingApi : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		type : vfALARMS_MAPPING_enum; (*The default type of mapping to trigger*)
		alarmName : vfAlarms_Instance_type; (*The name of the alarm that gets escalated for aggregation mappings*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAddAlarmApi : BOOL (*Add a new alarm definition to the local alarm system*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		name : vfAlarms_Instance_type; (*The name of the alarm being defined (i.e. this is the name referenced later by MpAlarmXSet calls)*)
		scope : STRING[vfALARMS_MAX_NAME_LEN]; (*The "Origin" field that will show up on the HMI*)
		code : UDINT; (*The error code associated with this alarm*)
		severity : vfALARMS_SEVERITY_enum; (*The severity of the alarm*)
		behavior : vfALARMS_BEHAVIOR_enum; (*The behavior of the alarm*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAddAlarmTextScopeApi : BOOL (*Add a new alarm definition to the local alarm system*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		name : vfAlarms_Instance_type; (*The name of the alarm being defined (i.e. this is the name referenced later by MpAlarmXSet calls)*)
		scope : STRING[vfALARMS_MAX_NAME_LEN]; (*The "Origin" field that will show up on the HMI*)
		textScope : STRING[vfALARMS_MAX_NAME_LEN]; (*The "Origin" field that will show up on the HMI*)
		code : UDINT; (*The error code associated with this alarm*)
		severity : vfALARMS_SEVERITY_enum; (*The severity of the alarm*)
		behavior : vfALARMS_BEHAVIOR_enum; (*The behavior of the alarm*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAddAggregationByNameApi : BOOL (* *) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		name : STRING[vfALARMS_MAX_NAME_LEN]; (*The alarm name that triggers the aggregation*)
		aggregationName : vfAlarms_Instance_type; (*The name of the alarm that gets escalated during aggregation*)
	END_VAR
	VAR_IN_OUT
		data : vfAlarms_Data_typ; (*The VfAlarms data structure that stores transient info*)
	END_VAR
END_FUNCTION

FUNCTION vfAlarmPersistent : BOOL (*Sets or resets a named alarm based on CurrentState and InstanceID*)
	VAR_INPUT
		alarmComponent : vfAlarms_Component_typ;
		alarm : vfAlarms_Instance_type;
		AlarmConditionActive : BOOL;
	END_VAR
END_FUNCTION

FUNCTION vfAlarmPersistentId : BOOL (*Sets or resets a named alarm based on CurrentState and InstanceID*)
	VAR_INPUT
		alarmComponent : vfAlarms_Component_typ;
		alarm : vfAlarms_Instance_type;
		AlarmConditionActive : BOOL;
	END_VAR
	VAR_IN_OUT
		id : UDINT;
	END_VAR
END_FUNCTION

FUNCTION vfAlarmPersistentSnippetId : BOOL (*Sets or resets a named alarm based on CurrentState and InstanceID*)
	VAR_INPUT
		alarmComponent : vfAlarms_Component_typ;
		alarm : vfAlarms_Instance_type;
		AlarmConditionActive : BOOL;
		snippet : STRING[80];
	END_VAR
	VAR_IN_OUT
		id : UDINT;
	END_VAR
END_FUNCTION

FUNCTION vfAlarmPersistentSnippet : BOOL (*Sets or resets a named alarm based on CurrentState and InstanceID*)
	VAR_INPUT
		alarmComponent : vfAlarms_Component_typ;
		alarm : vfAlarms_Instance_type;
		AlarmConditionActive : BOOL;
		snippet : STRING[80];
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAlarmEdge : BOOL (*TODO: Add your comment here*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		alarmComponent : vfAlarms_Component_typ;
		alarm : vfAlarms_Instance_type;
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION vfAlarmEdgeSnippet : BOOL (*TODO: Add your comment here*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		alarmComponent : vfAlarms_Component_typ;
		alarm : vfAlarms_Instance_type;
		snippet : STRING[80];
	END_VAR
END_FUNCTION
