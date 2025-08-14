
#include <bur/plctypes.h>
#ifdef __cplusplus
	extern "C"
	{
#endif
	#include "VFAlarms.h"
#ifdef __cplusplus
	};
#endif



plcbit vfAlarmPersistentId(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm, plcbit AlarmConditionActive, unsigned long* id ){
	// This routine is valid for Persistent alarms only!
	
	if ( *id == 0) {
		if (AlarmConditionActive) {	
			// Set the alarm and return the instance ID of the alarm to be used in MpAlarmXResetID
			*id = MpAlarmXSet( &alarmComponent->link, alarm->_);
		}
	}			
	else{		
		if ( !AlarmConditionActive ) {
			// Reset the alarm by instance ID.
			MpAlarmXResetID( &alarmComponent->link, *id );
			*id = 0;
		}		
	}		
	
	return AlarmConditionActive;
		
}

plcbit vfAlarmPersistent(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm, plcbit AlarmConditionActive){
	
	return vfAlarmPersistentId( alarmComponent, alarm, AlarmConditionActive, &alarm->id );
		
}
plcbit vfAlarmPersistentSnippet(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm, plcbit AlarmConditionActive, plcstring* snippet){

	if(AlarmConditionActive){
		strncpy(alarm->snippet, snippet, sizeof(alarm->snippet) );
	}
	return vfAlarmPersistentId( alarmComponent, alarm, AlarmConditionActive, &alarm->id );	
}

plcbit vfAlarmPersistentSnippetId(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm, plcbit AlarmConditionActive, plcstring* snippet, unsigned long* id){

	if(AlarmConditionActive){
		strncpy(alarm->snippet, snippet, sizeof(alarm->snippet) );
	}
	return vfAlarmPersistentId( alarmComponent, alarm, AlarmConditionActive, id);	

}
