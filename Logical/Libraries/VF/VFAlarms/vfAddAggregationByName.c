
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
plcbit vfAddAggregationByName(plcstring* name, plcstring* aggregationName, struct vfAlarms_Data_typ* data)
{
	// Error check inputs.
	if (!data) return 0;
	if (!name) return 0;
	
	// Look for first empty spot, and add new alarm info there.
	int i;
	for (i = 0; i < vfALARMS_MAX_MAPPINGS; i++) {
		if (!strcmp(data->internal.aggregations.byName[i].name, "")) {
			// Found an empty location. Add our info.
			strcpy(data->internal.aggregations.byName[i].name, name);
			strcpy(data->internal.aggregations.byName[i].aggregationName, aggregationName);
			break;
		}
	}
	
	return 1;
}

plcbit vfAddAggregationByNameApi(plcstring* name, struct vfAlarms_Instance_type* aggregationName, struct vfAlarms_Data_typ* data){

	vfAddAggregationByName( name, aggregationName->_, data);
		
}
