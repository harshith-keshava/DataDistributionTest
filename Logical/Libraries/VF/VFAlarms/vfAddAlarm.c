
#include <bur/plctypes.h>
#ifdef __cplusplus
	extern "C"
	{
#endif
	#include "VFAlarms.h"
#ifdef __cplusplus
	};
#endif
#include "string.h"

/* TODO: Add your comment here */
plcbit vfAddAlarm(plcstring* name, plcstring* scope, unsigned long code, enum vfALARMS_SEVERITY_enum severity, enum vfALARMS_BEHAVIOR_enum behavior, struct vfAlarms_Data_typ* data)
{

	vfAddAlarmTextScope( name, scope, "", code, severity, behavior, data);
	
	return 1;
}

plcbit vfAddAlarmApi(struct vfAlarms_Instance_type* name, plcstring* scope, unsigned long code, enum vfALARMS_SEVERITY_enum severity, enum vfALARMS_BEHAVIOR_enum behavior, struct vfAlarms_Data_typ* data){

	vfAddAlarm(name->_,  scope, code, severity, behavior, data);

	STRING snippet[vfALARMS_MAX_SNIPPET_PV_NAME_LEN];
	stringlcpy( snippet, data->in.snippetPvName, vfALARMS_MAX_SNIPPET_PV_NAME_LEN);
	stringlcat( snippet, ".", vfALARMS_MAX_SNIPPET_PV_NAME_LEN);
	stringlcat( snippet, name->snippet, vfALARMS_MAX_SNIPPET_PV_NAME_LEN);
	
	vfAddSnippet( name->snippet, snippet, data);
	
}

/* TODO: Add your comment here */
plcbit vfAddAlarmTextScope(plcstring* name, plcstring* scope, plcstring* textScope, unsigned long code, enum vfALARMS_SEVERITY_enum severity, enum vfALARMS_BEHAVIOR_enum behavior, struct vfAlarms_Data_typ* data)
{
	// Error check inputs.
	if (!data) return 0;
	if (!name) return 0;
	
	// Look for first empty spot, and add new alarm info there.
	int i;
	for (i = 0; i < vfALARMS_MAX_ALARMS; i++) {
		if (!strcmp(data->internal.alarms[i].name, "")) {
			// Found an empty location. Add our string.
			strcpy(data->internal.alarms[i].name, name);
			if (!strcmp(scope, "")) {
				strcpy(data->internal.alarms[i].scope, data->in.scope);
			} else {
				strcpy(data->internal.alarms[i].scope, scope);
			}

			if (!strcmp(textScope, "")) {
				strcpy(data->internal.alarms[i].textScope, data->in.scope);
			} else{
				strcpy(data->internal.alarms[i].textScope, textScope);				
			}
			data->internal.alarms[i].code = code;
			data->internal.alarms[i].severity = severity;
			data->internal.alarms[i].behavior = behavior;
			break;
		}
	}
	
	return 1;
}

plcbit vfAddAlarmTextScopeApi(struct vfAlarms_Instance_type* name, plcstring* scope, plcstring* textScope, unsigned long code, enum vfALARMS_SEVERITY_enum severity, enum vfALARMS_BEHAVIOR_enum behavior, struct vfAlarms_Data_typ* data){

	vfAddAlarmTextScope(name->_,  scope, textScope, code, severity, behavior, data);

	STRING snippet[vfALARMS_MAX_SNIPPET_PV_NAME_LEN];
	stringlcpy( snippet, data->in.snippetPvName, vfALARMS_MAX_SNIPPET_PV_NAME_LEN);
	stringlcat( snippet, ".", vfALARMS_MAX_SNIPPET_PV_NAME_LEN);
	stringlcat( snippet, name->snippet, vfALARMS_MAX_SNIPPET_PV_NAME_LEN);
	
	vfAddSnippet( name->snippet, snippet, data);
	
}
