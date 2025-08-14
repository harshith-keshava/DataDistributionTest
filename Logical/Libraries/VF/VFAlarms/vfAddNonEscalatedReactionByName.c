
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
plcbit vfAddNonEscalatedReactionByName(plcstring* name, plcstring* reactionName1, plcstring* reactionName2, plcstring* reactionName3, plcstring* reactionName4, plcstring* reactionName5, plcstring* reactionName6, struct vfAlarms_Data_typ* data)
{
	// Error check inputs.
	if (!data) return 0;
	if (!name) return 0;
	
	// Look for first empty spot, and add new alarm info there.
	int i;
	for (i = 0; i < vfALARMS_MAX_MAPPINGS; i++) {
		if (!strcmp(data->internal.reactions.byName[i].name, "")) {
			// Found an empty location. Add our info.
			strcpy(data->internal.reactions.byNameNotEscalated[i].name, name);
			strcpy(data->internal.reactions.byNameNotEscalated[i].reactionName[0], reactionName1);	
			strcpy(data->internal.reactions.byNameNotEscalated[i].reactionName[1], reactionName2);
			strcpy(data->internal.reactions.byNameNotEscalated[i].reactionName[2], reactionName3);
			strcpy(data->internal.reactions.byNameNotEscalated[i].reactionName[3], reactionName4);
			strcpy(data->internal.reactions.byNameNotEscalated[i].reactionName[4], reactionName5);
			strcpy(data->internal.reactions.byNameNotEscalated[i].reactionName[5], reactionName6);
			break;
		}
	}
	
	return 1;
}
