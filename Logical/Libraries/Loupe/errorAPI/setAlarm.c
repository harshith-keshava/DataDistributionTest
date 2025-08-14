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

unsigned long errorWrapSet(unsigned long source, unsigned long string, unsigned long errorId, unsigned long acknowledge, struct errWrap_typ* alarmCollector) {
	UINT i;
	
	if(alarmCollector == 0) return 1;
	
	alarmCollector->internal.id++; // Make sure every alarm has a unique id
	
	for (i = 0; i < ERRWRAP_NUM_ERRORS; i++) {
		if(!alarmCollector->internal.userAlarms[i].active) {
			alarmCollector->internal.userAlarms[i].active = 1;
			alarmCollector->internal.userAlarms[i].configure.Enable = 1;
			alarmCollector->internal.userAlarms[i].id = alarmCollector->internal.id;
			
			alarmCollector->internal.userAlarms[i].behavoir.Code = errorId;
			
			// Set message
			alarmCollector->internal.userAlarms[i].behavoir.Message[0] = '\0';
			if(source) { 
				strcat(alarmCollector->internal.userAlarms[i].behavoir.Message, source);
				strcat(alarmCollector->internal.userAlarms[i].behavoir.Message, ": ");
			}
			if(string) {
				strcat(alarmCollector->internal.userAlarms[i].behavoir.Message, string);
			}
			
			alarmCollector->internal.userAlarms[i].acknowledge = acknowledge;
			
			break;
		}
	}
	
	return 0;
}