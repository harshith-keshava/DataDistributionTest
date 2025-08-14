#include <bur/plctypes.h>
#ifdef __cplusplus
	extern "C"
	{
#endif

#include "errorAPI.h"

#ifdef __cplusplus
	};
#endif

#include "string.h"

unsigned long errorWrapAck(unsigned long id, struct errWrap_typ* alarmCollector) {
	UINT i;
	
	if(alarmCollector == 0) return 1;
	
	for (i = 0; i < ERRWRAP_NUM_ERRORS; i++) {
		if(alarmCollector->internal.userAlarms[i].id == id) {
			if(alarmCollector->internal.userAlarms[i].active) {
				alarmCollector->internal.userAlarms[i].active = 0;
				alarmCollector->internal.userAlarms[i].set = 0;
				
				if(alarmCollector->internal.userAlarms[i].set) {
					// Ack	
					MpAlarmXAcknowledge(alarmCollector->internal.userAlarms[i].configure.MpLink, alarmCollector->internal.userAlarms[i].name);
				}
				else {
					// Stop configuring
					alarmCollector->internal.userAlarms[i].configure.Enable = 0;
					// Call this so if we can use this index again before running the cylic
					MpAlarmXConfigAlarm(&alarmCollector->internal.userAlarms[i].configure); 
				}
			}
			break;
		}
	}
	
	return 0;
}