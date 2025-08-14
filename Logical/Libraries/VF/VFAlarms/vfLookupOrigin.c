
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
plcbit vfLookupOrigin(unsigned long pOriginRaw, unsigned long pOriginFormatted, struct Log_Origin_Mappings_typ* map)
{
	if (!map) return;

	int i = 0;
	
	char *originRaw = (char *)pOriginRaw;
	char *originFormatted = (char *)pOriginFormatted;
	
	// Loop through map, looking for a match. 
	for (i = 0; i <= LOGBOOK_MAI_MAPPINGS; i++) {
		if (!strcmp(originRaw, map->originRaw[i])) {
			strcpy(originFormatted, map->originFormatted[i]);
			return;
		}
	}
	
	// Getting here means no match was found. Just pass the input back out. 
	strcpy(originFormatted, originRaw);
}
