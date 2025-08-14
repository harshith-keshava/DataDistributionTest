
PROGRAM _INIT
	
	// Set defaults
	wrapper.internal.mpAlarmX := ADR(gMachineAlarms.components.core);
	wrapper.in.par.coreMpLink := ADR(gMachineAlarms.components.link);
	
	//Init alarm wrapper
	//	//Configure History FUB
	//	wrapper.in.par.histMpLink := ADR(gAlarmXHistory_Machine);
	//	wrapper.internal.mpAlarmXHistory.Enable := TRUE;
	//	wrapper.internal.mpAlarmXHistory.MpLink := wrapper.in.par.histMpLink;
	
	//Configure Core List UI
	wrapper.in.par.uiCoreSetup.AlarmListSize := 30;
	wrapper.internal.mpAlarmXListUI.Enable := TRUE;
	wrapper.internal.mpAlarmXListUI.UIConnect := ADR(wrapper.internal.uiCoreConnect);
	wrapper.internal.mpAlarmXListUI.MpLink := wrapper.in.par.coreMpLink;
	wrapper.internal.mpAlarmXListUI.UISetup := wrapper.in.par.uiCoreSetup;
	
	//	//Configure History List UI
	//	wrapper.internal.mpAlarmXHistoryUI.Enable := TRUE;
	//	wrapper.internal.mpAlarmXHistoryUI.UIConnect := ADR(wrapper.internal.uiHistConnect);
	//	wrapper.internal.mpAlarmXHistoryUI.MpLink := wrapper.in.par.histMpLink;
	//	wrapper.internal.mpAlarmXHistoryUI.UISetup := wrapper.in.par.uiHistSetup;
	
	//Configure Acknowledge all FUB
	wrapper.internal.mpAcknowledgeAll.Enable := 1;
	wrapper.internal.mpAcknowledgeAll.MpLink := wrapper.in.par.coreMpLink;
	wrapper.internal.uiCoreConnect.AcknowledgeAll := 1; //acknowledge on boot
	
	wrapper.in.cfg.errorSeverity; 	// Not used
	wrapper.in.cfg.logSeverity; 	// Not used
	
	blinkLED.Enable := TRUE;
	blinkLED.Time := T#2s;
	blinkLED.Percentage := 50;
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	displayAble := 0;
	// call all alarm cores
	FOR i:=0 TO stateCount(gAlarmApi.cores) BY 1 DO
		IF forStateGetPointer(gAlarmApi.cores, i, 0, ADR(pAlarmComponent), ADR(sAlarmComponent)) THEN
			dAlarmComponent ACCESS pAlarmComponent;
			dAlarmComponent.core.Enable := TRUE;
			dAlarmComponent.core.MpLink := ADR(dAlarmComponent.link);
			dAlarmComponent.core();
			//dAlarmComponent.core.ErrorReset := dAlarmComponent.core.Error;
			
			IF NOT dAlarmComponent.noDisplay THEN
				IF displayAble = selectedIndex THEN
					newLink := dAlarmComponent.link;
					wrapper.internal.mpAlarmX := ADR(dAlarmComponent.core);
					selectedName := dAlarmComponent.name; 
				END_IF
				
				coreNames[displayAble] := dAlarmComponent.name;
				coreNames[displayAble] := CONCAT(coreNames[displayAble], ' (');

				coreNames[displayAble] := CONCAT(coreNames[displayAble], ' Active: ');
				brsitoa(dAlarmComponent.core.ActiveAlarms, ADR(snippet));
				coreNames[displayAble] := CONCAT(coreNames[displayAble], snippet);

				coreNames[displayAble] := CONCAT(coreNames[displayAble], ' Pending: ');
				brsitoa(dAlarmComponent.core.PendingAlarms, ADR(snippet));
				coreNames[displayAble] := CONCAT(coreNames[displayAble], snippet);
				
				coreNames[displayAble] := CONCAT(coreNames[displayAble], ' )');
				
				IF ((dAlarmComponent.core.ActiveAlarms > 0) OR (dAlarmComponent.core.PendingAlarms > 0)) THEN
					coreAlarmsPresent[displayAble] := TRUE;
				ELSE
					coreAlarmsPresent[displayAble] := FALSE;
				END_IF

				displayAble := displayAble + 1;
			END_IF			
		END_IF
	END_FOR
	
	IF oldLink.Internal[0] <> newLink.Internal[0] THEN
	
		oldLink := newLink;
		
		// disable
		//		wrapper.internal.mpAlarmX.Enable := FALSE;
		wrapper.internal.mpAcknowledgeAll.Enable := FALSE;
		wrapper.internal.mpAlarmXListUI.Enable := FALSE;
		errorWrapCyclic(wrapper);
		
		// reenable with new selection
		//		wrapper.internal.mpAlarmX.Enable := TRUE;
		wrapper.internal.mpAcknowledgeAll.Enable := TRUE;
		wrapper.internal.mpAlarmXListUI.Enable := TRUE;
		
	END_IF
	
	// Map the operator station command to acknowledge all alarms. 	
	IF (IO.di.operatorStationAckAll AND NOT _operatorStationAckAll) THEN
		_operatorStationAckAll := TRUE;
		wrapper.in.cmd.acknowledgeAllAlarms := TRUE;
	ELSIF (NOT IO.di.operatorStationAckAll) THEN
		_operatorStationAckAll := FALSE;
	END_IF
	// Map the operator station alarm indicator to the presence of alarms.
	// It should be solid if acknowledged alarms are present,
	// and blink if unacknowledged alarms are present.
	IF (wrapper.out.alarmPresent) THEN
		// TODO: check if alarms are ack'd, and change to solid.
		IO.do.operatorStationAlarmsLED := blinkLED.Out;
	END_IF
	blinkLED();
	
	wrapper.in.par.coreMpLink := ADR(newLink);
	//	wrapper.internal.mpAlarmX.MpLink := wrapper.in.par.coreMpLink;
	wrapper.internal.mpAcknowledgeAll.MpLink := wrapper.in.par.coreMpLink;
	wrapper.internal.mpAlarmXListUI.MpLink := wrapper.in.par.coreMpLink;
	errorWrapCyclic(wrapper);
	
	// Use a dynamic variable for watch window access
	dSelectedAlarmCore ACCESS wrapper.internal.mpAlarmX;
	
	
	
	FOR i := 0 TO ERRWRAP_MAI_ERRORS_DISP BY 1 DO
		IF wrapper.out.activeAlarmInfo[i].code <> 0 THEN
			wrapper.out.activeAlarmInfo[i].codeString := UDINT_TO_STRING(wrapper.out.activeAlarmInfo[i].code);
		ELSE
			wrapper.out.activeAlarmInfo[i].codeString := '';
		END_IF	
		CASE wrapper.out.activeAlarmInfo[i].severity OF
			
			vfALARMS_SEVERITY_NONE:
				activeAlarmSeverity[i] := '';
			
			vfALARMS_SEVERITY_INFO:
				activeAlarmSeverity[i] := 'INFO';
			
			vfALARMS_SEVERITY_WARNING:
				activeAlarmSeverity[i] := 'WARN';
			
			vfALARMS_SEVERITY_ALARM:
				activeAlarmSeverity[i] := 'STOP';
				
			vfALARMS_SEVERITY_CRITICAL:
				activeAlarmSeverity[i] := 'ABORT';

		END_CASE
	END_FOR
	
	
END_PROGRAM



PROGRAM _EXIT
	
	 
END_PROGRAM

