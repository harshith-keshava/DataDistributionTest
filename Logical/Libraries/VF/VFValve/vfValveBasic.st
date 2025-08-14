
FUNCTION_BLOCK vfValveBasic
	
	pCommandWriteBack ACCESS (Inputs.adrCommands);


	IF NOT (Inputs.parameters.enabled) THEN
		internal.valveState	:= vfVALVE_BASIC_STOP;
	ELSIF(Inputs.commands.stop = TRUE) THEN	
		pCommandWriteBack.stop := FALSE;
		internal.valveState	:= vfVALVE_BASIC_STOP;	
	END_IF		
	

	
	CASE internal.valveState OF
		
		vfVALVE_BASIC_WAIT_FOR_COMMANDS:
			
			Outputs.status.fbState := 'WAITING FOR COMMANDS';
			
			Outputs.status.readyForCommand := TRUE;
			
			IF (Inputs.commands.cycle = TRUE) THEN
				
				pCommandWriteBack.cycle := FALSE;
				
				internal.valveState	:= vfVALVE_BASIC_CYCLE_OPEN;
				
			
			ELSIF (Inputs.commands.open = TRUE) THEN
				
				pCommandWriteBack.open := FALSE;
				
				IF NOT Outputs.status.opened THEN
					
					internal.valveTimeOutTimer.IN := TRUE;
					
					internal.valveState	:= vfVALVE_BASIC_OPEN;
				END_IF
				
			ELSIF (Inputs.commands.close = TRUE)THEN
				
				pCommandWriteBack.close := FALSE;
				
				IF NOT Outputs.status.closed THEN
					
					internal.valveTimeOutTimer.IN := TRUE;
					
					internal.valveState	:= vfVALVE_BASIC_CLOSE;;
				END_IF	
	
			END_IF
			
		vfVALVE_BASIC_CYCLE_OPEN:
			
			Outputs.status.fbState := 'CYCLE OPEN';
			Outputs.OpenValveSignal := TRUE; //cmd
			Outputs.CloseValveSignal := FALSE;//cmd
			Outputs.status.cycling	:= TRUE;//status
			Outputs.status.doOpen 	:= TRUE;//status
			Outputs.status.doClose	:= FALSE;//status
			
			internal.valveCycleTimer.PT	:= Inputs.parameters.cycleTime;
			internal.valveCycleTimer.IN	:= TRUE;
			internal.valveTimeOutTimer.IN := TRUE;
			
			
			//once its opened stop monitoring for timeout error
			IF Outputs.status.opened THEN 
				internal.valveTimeOutTimer.IN := FALSE;
				
			//didnt open after allowed time
			ELSIF internal.valveTimeOutTimer.Q 	THEN
				internal.valveTimeOutTimer.IN := FALSE;
				internal.valveState := vfVALVE_BASIC_ERROR;
				
			END_IF
			
			
			//cycled open long enough
			IF (internal.valveCycleTimer.Q = TRUE) AND Outputs.status.opened THEN
				internal.valveCycleTimer.IN	:= FALSE;
				Outputs.CloseValveSignal := TRUE;
				Outputs.OpenValveSignal := FALSE;
				Outputs.status.doOpen := FALSE;
				Outputs.status.doClose := TRUE;
				
				//reset timeout timer 
				internal.valveTimeOutTimer.IN := FALSE;
				internal.valveState				:= vfVALVE_BASIC_CYCLE_CLOSE;
			
			END_IF
			
		vfVALVE_BASIC_CYCLE_CLOSE:
			
			Outputs.status.fbState := 'CYCLE CLOSE';
			
			IF Outputs.status.closed THEN
				Outputs.status.cycling := FALSE;
				internal.valveTimeOutTimer.IN := FALSE;
				internal.valveState				:= vfVALVE_BASIC_WAIT_FOR_COMMANDS;
			
			ELSIF internal.valveTimeOutTimer.Q THEN
				internal.valveTimeOutTimer.IN := FALSE;
				internal.valveState := vfVALVE_BASIC_ERROR;
				
				
			END_IF
		
			
		vfVALVE_BASIC_OPEN:
			
			Outputs.status.fbState := 'OPENING';
			
			//open valve
			Outputs.OpenValveSignal := TRUE;
			Outputs.CloseValveSignal := FALSE;
			
			//update valve output status
			Outputs.status.doOpen 					:= TRUE;
			Outputs.status.doClose					:= FALSE;
			
			IF Outputs.status.opened THEN
			
				//reset timeout timer 
				internal.valveTimeOutTimer.IN := FALSE;
				internal.valveState				:= vfVALVE_BASIC_WAIT_FOR_COMMANDS;
			
			ELSIF internal.valveTimeOutTimer.Q 	THEN
				
				internal.valveState := vfVALVE_BASIC_ERROR;
				
			END_IF
			
		vfVALVE_BASIC_CLOSE:
			
			Outputs.status.fbState := 'CLOSING';
			
			Outputs.OpenValveSignal := FALSE;
			Outputs.CloseValveSignal := TRUE;
			
			//update valve output status
			Outputs.status.doOpen 					:= FALSE;
			Outputs.status.doClose 				:= TRUE;
			
			IF Outputs.status.closed THEN
				
				//reset timeout timer 
				internal.valveTimeOutTimer.IN := FALSE;
				internal.valveState				:= vfVALVE_BASIC_WAIT_FOR_COMMANDS;
			
			ELSIF internal.valveTimeOutTimer.Q 	THEN
				
				internal.valveState := vfVALVE_BASIC_ERROR;
				
			END_IF
			
		vfVALVE_BASIC_STOP:
			
			Outputs.status.fbState := 'STOPPING';
			
			Outputs.OpenValveSignal := FALSE;
			Outputs.CloseValveSignal := FALSE;
			
			//reset timeout timer 
			internal.valveTimeOutTimer.IN := FALSE;
			internal.valveCycleTimer.IN		:= FALSE;	
			
			//update valve output status
			Outputs.status.cycling					:= FALSE;
			Outputs.status.doOpen 					:= FALSE;
			Outputs.status.doClose 				:= FALSE;
			internal.valveState				:= vfVALVE_BASIC_WAIT_FOR_COMMANDS;
						
		vfVALVE_BASIC_ERROR:
			
			
			Outputs.status.fbState := 'ERRORED';
			
			//reset timeout timer 
			internal.valveTimeOutTimer.IN := FALSE;
			
			Outputs.status.error := TRUE;
		
			IF Inputs.commands.errReset THEN
				
				Outputs.status.error := FALSE;
				
				internal.valveState				:= vfVALVE_BASIC_WAIT_FOR_COMMANDS;
			END_IF
		
	END_CASE
	
	
	IF (internal.valveState = vfVALVE_BASIC_ERROR) OR (internal.valveState = vfVALVE_BASIC_WAIT_FOR_COMMANDS) THEN
		Outputs.status.busy := FALSE;
	ELSE
		Outputs.status.busy := TRUE;
	END_IF
	
	
	//so nothing gets queued and stuck
	IF internal.valveState <> vfVALVE_BASIC_WAIT_FOR_COMMANDS THEN
		
		Outputs.status.readyForCommand := FALSE;
			
		pCommandWriteBack.close := FALSE;
		pCommandWriteBack.open := FALSE;
		pCommandWriteBack.cycle := FALSE;
		
	END_IF
	
	IF Inputs.commands.errReset THEN
		Outputs.status.error := FALSE;
	END_IF
	
	
	//feedback for position
	IF Inputs.parameters.hasLimitSensors THEN
		
		Outputs.status.closed := Inputs.closeLimitSensor;
		Outputs.status.opened := Inputs.openLimitSensor;
				
		Outputs.status.middle := NOT(Inputs.closeLimitSensor OR Inputs.openLimitSensor);
		
		internal.valveTimeOutTimer.PT := Inputs.parameters.TimeOutValue;	
		internal.valveTimeOutTimer();
		
	ELSE
		
		internal.actuationDelayTimer.PT := Inputs.parameters.actuationDelay;
		
	
		IF Outputs.status.doClose AND NOT internal.oldDoClose THEN
			Outputs.status.opened := FALSE;
			internal.actuationDelayTimer.IN := TRUE;
			
		ELSIF Outputs.status.doOpen AND NOT internal.oldDoOpen THEN	
			Outputs.status.closed := FALSE;
			internal.actuationDelayTimer.IN := TRUE;
		END_IF
		
		IF internal.actuationDelayTimer.Q THEN
			internal.actuationDelayTimer.IN := FALSE;
			Outputs.status.closed := Outputs.status.doClose;
			Outputs.status.opened := Outputs.status.doOpen;
		END_IF
		
		internal.actuationDelayTimer();
		
		//for rising edge
		internal.oldDoOpen := Outputs.status.doOpen;
		internal.oldDoClose := Outputs.status.doClose;
			
	END_IF
	
	//init timer for cycle option
	internal.valveCycleTimer();
	

	
END_FUNCTION_BLOCK