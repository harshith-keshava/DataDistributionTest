
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
plcbit vfAddSnippet(plcstring* key, plcstring* pvName, struct vfAlarms_Data_typ* data)
{
	// Error check inputs.
	if (!data) return 0;
	if (!key) return 0;
	if (!pvName) return 0;
	
	// Look for first empty spot, and add new snippet info there.
	int i;
	for (i = 0; i < vfALARMS_MAX_SNIPPETS; i++) {
		if (!strcmp(data->internal.snippets[i].key, "")) {
			// Found an empty location. Add our string.
			strcpy(data->internal.snippets[i].key, key);	
			strcpy(data->internal.snippets[i].pvName, pvName);
			break;
		}
	}
	
	return 1;
}
