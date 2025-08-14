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

unsigned char errorWrapCyclic(errWrap_typ* inst) {
	int i;
	int numMappAlarms;
	int outputIndex;
	int mpAlarmIndex;
	
	if (inst->in.cmd.acknowledgeAllAlarms){
		inst->in.cmd.acknowledgeAllAlarms = 0; 
		inst->internal.mpAcknowledgeAll.Execute = 1;
		brsmemset(&inst->out.activeAlarmInfo, 0, sizeof(inst->out.activeAlarmInfo));
	}	
	else{
		inst->internal.mpAcknowledgeAll.Execute = 0;
	}
	
	//Cyclically call FUBs
//	MpAlarmXCore(inst->internal.mpAlarmX);	// call each core in the wrapper task because we need many cores
	MpAlarmXHistory(&inst->internal.mpAlarmXHistory);
	MpAlarmXListUI(&inst->internal.mpAlarmXListUI);
	MpAlarmXHistoryUI(&inst->internal.mpAlarmXHistoryUI);
	MpAlarmXAcknowledgeAll(&inst->internal.mpAcknowledgeAll);
	
	if(!inst->internal.initialized) {
		char tempString[10];
		inst->internal.initialized = 1;
		for (i = 0; i < ERRWRAP_NUM_ERRORS; i++) {
			brsitoa(i, tempString);
			strcpy(inst->internal.userAlarms[i].name, "TempAlarm");
			strcat(inst->internal.userAlarms[i].name, tempString);
			
			inst->internal.userAlarms[i].configure.MpLink = inst->in.par.coreMpLink;
			inst->internal.userAlarms[i].configure.Name = &inst->internal.userAlarms[i].name;
			inst->internal.userAlarms[i].configure.Configuration = &inst->internal.userAlarms[i].behavoir;
			inst->internal.userAlarms[i].behavoir.Behavior.AutoReset = 1;
			inst->internal.userAlarms[i].behavoir.Behavior.Acknowledge = mpALARMX_ACK_REQ;
			inst->internal.userAlarms[i].configure.Enable = 1;
			//inst->internal.alarms[i].behavoir.Severity
		}
	}
	
	inst->internal.activeAlarms = 0; // ReCount active errors cyclically
	for (i = 0; i < ERRWRAP_NUM_ERRORS; i++) {
		
		if(inst->internal.userAlarms[i].active) {
			inst->internal.activeAlarms++;	
		}
		
		MpAlarmXConfigAlarm(&inst->internal.userAlarms[i].configure);
		
		if(inst->internal.userAlarms[i].active && 
			inst->internal.userAlarms[i].configure.Active 
		&& !inst->internal.userAlarms[i].set) {
			inst->internal.userAlarms[i].configure.Save = 1;
		}
		
		if(inst->internal.userAlarms[i].configure.Save && inst->internal.userAlarms[i].configure.CommandDone){
			inst->internal.userAlarms[i].set = 1;
			inst->internal.userAlarms[i].configure.Save = 0;
			MpAlarmXSet(inst->internal.userAlarms[i].configure.MpLink, inst->internal.userAlarms[i].name);
		}
		
		if(inst->internal.userAlarms[i].set) {
			if(MpAlarmXCheckState(inst->internal.userAlarms[i].configure.MpLink, inst->internal.userAlarms[i].name, mpALARMX_STATE_NONE)) {
				// Alarm was acknowledged and reset (reset is automatic)
				inst->internal.userAlarms[i].set = 0;
				inst->internal.userAlarms[i].active = 0;
				
				if(inst->internal.userAlarms[i].acknowledge) {
					*((BOOL*)inst->internal.userAlarms[i].acknowledge) = 1;
				}
			}
		}
		
	}
	

	// Set outputs

	
	outputIndex = 0;
	
	for (i = 0; i < ERRWRAP_NUM_ERRORS_DISP; i++){
		brsmemcpy(&inst->out.activeAlarmInfo[outputIndex].name, &inst->internal.uiCoreConnect.AlarmList.Name[i], sizeof(inst->out.activeAlarmInfo[outputIndex].name));
		brsmemcpy(&inst->out.activeAlarmInfo[outputIndex].scope, &inst->internal.uiCoreConnect.AlarmList.Scope[i], sizeof(inst->out.activeAlarmInfo[outputIndex].scope));
		brsmemcpy(&inst->out.wStrMessage[outputIndex], &inst->internal.uiCoreConnect.AlarmList.Message[i], sizeof(inst->out.wStrMessage[outputIndex]));
		brsmemcpy(&inst->out.wStrAdditionalInfo[outputIndex], &inst->internal.uiCoreConnect.AlarmList.AdditionalInformation1[i], sizeof(inst->out.wStrAdditionalInfo[outputIndex]));
		brsstrcpy((UDINT)&inst->out.activeAlarmInfo[outputIndex].timeStamp,(UDINT)&inst->internal.uiCoreConnect.AlarmList.Timestamp[i]);
		inst->out.activeAlarmInfo[outputIndex].severity = inst->internal.uiCoreConnect.AlarmList.Severity[i];
		inst->out.activeAlarmInfo[outputIndex].code = inst->internal.uiCoreConnect.AlarmList.Code[i];
		inst->out.activeAlarmInfo[outputIndex].instance = inst->internal.uiCoreConnect.AlarmList.InstanceID[i];
		wstring2string( &inst->out.activeAlarmInfo[outputIndex].message, &inst->out.wStrMessage[outputIndex], sizeof(inst->out.activeAlarmInfo[outputIndex].message) );
		wstring2string( &inst->out.activeAlarmInfo[outputIndex].additionalInfo, &inst->out.wStrAdditionalInfo[outputIndex], sizeof(inst->out.activeAlarmInfo[outputIndex].additionalInfo) );
		outputIndex++;
	}
	
	if(inst->out.activeAlarms > 0){
		inst->out.alarmPresent = 1;
	}
	else{
		inst->out.alarmPresent = 0;
	}
	
	inst->out.activeAlarms = inst->internal.mpAlarmX->PendingAlarms + inst->internal.mpAlarmX->ActiveAlarms;
		return 0;
}