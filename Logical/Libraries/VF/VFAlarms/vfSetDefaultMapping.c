
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
plcbit vfSetDefaultMapping(enum vfALARMS_MAPPING_enum type, plcstring* alarmName, struct vfAlarms_Data_typ* data)
{
	// Error check inputs.
	if (!data) return 0;
	
	data->internal.defaultMapping.type = type;
	strcpy(data->internal.defaultMapping.alarmName, alarmName);
	
	return 1;
}

plcbit vfSetDefaultMappingApi(enum vfALARMS_MAPPING_enum type, struct vfAlarms_Instance_type* alarmName, struct vfAlarms_Data_typ* data){

	vfSetDefaultMapping( type, alarmName->_ , data);
		
}
