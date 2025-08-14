
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
plcbit vfAddLogOriginMapping(plcstring* originRaw, plcstring* originFormatted, struct Log_Origin_Mappings_typ* map)
{
	if (!map) return;
	
	int i = 0;
	
	// Search for first open spot for adding mappings. 
	for (i = 0; i <= LOGBOOK_MAI_MAPPINGS; i++) {
		if (!strcmp(map->originRaw[i], "")) {
			strcpy(map->originRaw[i], originRaw);
			strcpy(map->originFormatted[i], originFormatted);
			return;
		}
	}
}
