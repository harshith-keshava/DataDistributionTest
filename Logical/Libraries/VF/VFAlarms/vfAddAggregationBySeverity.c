
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
plcbit vfAddAggregationBySeverity(enum vfALARMS_SEVERITY_enum severity, plcstring* aggregationName, struct vfAlarms_Data_typ* data)
{
	// Error check inputs.
	if (!data) return 0;
	
	// Look for first empty spot, and add new alarm info there.
	int i;
	for (i = 0; i < vfALARMS_MAX_MAPPINGS; i++) {
		if (data->internal.aggregations.bySeverity[i].severity == vfALARMS_SEVERITY_NONE) {
			// Found an empty location. Add our info.
			data->internal.aggregations.bySeverity[i].severity = severity;
			strcpy(data->internal.aggregations.bySeverity[i].aggregationName, aggregationName);	
			break;
		}
	}
	
	return 1;
}
