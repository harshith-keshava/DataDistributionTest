
ACTION hmiHelper:
	
	//for the loader icon to tell if the sequence is running or not
	task.internal.hmiCommandStatus.enableLaserFullSequence.busy := task.internal.hmiCommandStatus.enableDCPower.busy OR task.internal.hmiCommandStatus.enableLaserEmission.busy OR task.internal.hmiCommandStatus.enableLaserPower.busy;
	task.internal.hmiCommandStatus.enableLaserFullSequence.idle := NOT(task.internal.hmiCommandStatus.enableLaserFullSequence.busy); 
	
	//DC power
	IF (brsstrcmp(ADR(task.internal.atnSystemCommand.Command),ADR(gVFLCR.command.enableDCPower))=0) THEN
		task.internal.hmiCommandStatus.enableDCPower.busy := task.internal.atnSystemCommand.Busy;
	ELSE
		task.internal.hmiCommandStatus.enableDCPower.busy := FALSE;	
	END_IF
	task.internal.hmiCommandStatus.enableDCPower.idle := NOT(task.internal.hmiCommandStatus.enableDCPower.busy);

	//laser emission
	IF (brsstrcmp(ADR(task.internal.atnSystemCommand.Command),ADR(gVFLCR.command.enableLaserEmission))=0) THEN
		task.internal.hmiCommandStatus.enableLaserEmission.busy := task.internal.atnSystemCommand.Busy;		
	ELSE
		task.internal.hmiCommandStatus.enableLaserEmission.busy := FALSE;
	END_IF
	task.internal.hmiCommandStatus.enableLaserEmission.idle := NOT(task.internal.hmiCommandStatus.enableLaserEmission.busy);

	//laser power
	IF (brsstrcmp(ADR(task.internal.atnSystemCommand.Command),ADR(gVFLCR.command.enableLaserPower))=0) THEN
		task.internal.hmiCommandStatus.enableLaserPower.busy := task.internal.atnSystemCommand.Busy;
	ELSE
		task.internal.hmiCommandStatus.enableLaserPower.busy := FALSE;
	END_IF
	task.internal.hmiCommandStatus.enableLaserPower.idle := NOT(task.internal.hmiCommandStatus.enableLaserPower.busy);
	

	
END_ACTION
