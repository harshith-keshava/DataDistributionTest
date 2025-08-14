
#include <bur/plctypes.h>
#ifdef __cplusplus
	extern "C"
	{
#endif
	#include "VFAlarms.h"
#ifdef __cplusplus
	};
#endif

plcbit vfAlarmEdge(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm){

	MpAlarmXSet( &alarmComponent->link, alarm->_);

}
plcbit vfAlarmEdgeSnippet(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm, plcstring* snippet){

	strncpy(alarm->snippet, snippet, sizeof(alarm->snippet) );

	vfAlarmEdge( alarmComponent, alarm );

}
