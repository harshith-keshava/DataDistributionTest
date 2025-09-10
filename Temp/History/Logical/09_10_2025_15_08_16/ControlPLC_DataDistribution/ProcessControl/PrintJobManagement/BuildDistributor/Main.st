
PROGRAM _INIT
	
		
	Name := 'Build Distributor';


	//direct commands to operate the chiller
	subscribePLCOpenWithParameters ( gBuildDistributorApi.commands.startDistribution, Name, ADR(task.parameters.layerNumberToDistribute), SIZEOF(task.parameters.layerNumberToDistribute), task.command.startDistribution, task.internal.PLCOpen);
	subscribePLCOpenWithParameters ( gBuildDistributorApi.commands.distributeLayerFile, Name, ADR(task.parameters.layerNumberToDistribute), SIZEOF(task.parameters.layerNumberToDistribute), task.command.distributeLayerFile, task.internal.PLCOpen );
	subscribePLCOpenWithParameters ( gBuildDistributorApi.commands.abortDistribution, Name, 0, 0, task.command.abortDistribution, task.internal.PLCOpen);
		
	//other systems can monitor this state
	registerStateBool( gBuildDistributorApi.status.subsystemsReady, Name, task.status.buildDistributorConnected);
		
END_PROGRAM

PROGRAM _CYCLIC
	
	
	//Call piper interface	
	PiperModuleInterface;
	

	///////////////////////////////////////////////////////////////
	//API:
	//	Requires:
	//	-
	//	Commands:
	//	-takePrescan
	//	-takePostscan
	//  -takeManual
	//	Inhbits:
	//	- 
	
	//  State Monitoring
	//  -
	///////////////////////////////////////////////////////////////


	//Heartbeat set and monitor
	task.internal.heartbeatTimer.PT := T#1s;
	task.internal.heartbeatTimer.IN := NOT(task.internal.heartbeatTimer.Q);
	IF (task.internal.heartbeatTimer.Q) THEN
		gOpcData_ToBuildPC.Heartbeat := gOpcData_ToBuildPC.Heartbeat + 1;
		IF (gOpcData_FromBuildPC.Heartbeat <> task.internal.lastHeartbeatReceived) THEN
			task.internal.lastHeartbeatReceived := gOpcData_FromBuildPC.Heartbeat;
			task.status.buildDistributorConnected := TRUE;
			task.status.missedHeartbeats := 0;
		ELSE
			task.status.missedHeartbeats := task.status.missedHeartbeats + 1;
			task.status.buildDistributorConnected := FALSE;
		END_IF
	END_IF
	task.internal.heartbeatTimer();
	
	//timeout after 3 missed heartbeats
	IF task.status.missedHeartbeats > 3 THEN
		task.status.buildDistributorConnected := FALSE;
	END_IF
	
	//ADD LATER TODO
	//	vfAlarmPersistent(gVisionApi.alarms.components, gVisionApi.alarms.VISION_HEARTBEAT_LOST_AL1200, NOT(task.status.visionAppConnected));	
	
	//ready to handle commands
	task.status.ready := stateTrueStatus( gBuildDistributorApi.status.subsystemsReady, ADR(task.internal.subSystemStatus), SIZEOF(task.internal.subSystemStatus) );	

	IF NOT task.status.ready THEN
		stateStatus( gBuildDistributorApi.status.subsystemsReady, ADR(task.internal.subSystemStatus), SIZEOF(task.internal.subSystemStatus) );	
	ELSE
		task.internal.subSystemStatus[0] := 'Ready';
	END_IF	
	

	
	///////////////////////////////////////////////////////////////
	//Handle interpreting commands that do not require STATE_READY
	///////////////////////////////////////////////////////////////
	IF task.status.ready THEN
				
		//NOTE: Commands that just turn ON/OFF IO CAN happen in the command translation
		IF task.command.startDistribution THEN
			task.internal.newCommand := 1;
			
			IF (gOpcData_FromBuildPC.BuildInfoReady) OR (gOpcData_FromBuildPC.DistributionActive) THEN
				task.status.sequence := SEQUENCE_IDLE;
				task.status.state := STATE_ABORT_DISTRIBUTION;
				task.status.statusMessage := 'Aborting Distribution';
			ELSE		
				task.status.sequence := SEQUENCE_IDLE;
				task.status.state := STATE_START_DISTRIBUTION;
				task.status.statusMessage := 'Starting Distribution';
			END_IF
		
		ELSIF task.command.distributeLayerFile THEN
			task.internal.newCommand := 1;	
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_DISTRIBUTE_LAYER_FILE;
			task.status.statusMessage := 'Distributing Layer File';	
			
		ELSIF task.command.abortDistribution THEN
			task.internal.newCommand := 1;	
			task.status.sequence := SEQUENCE_IDLE;
			task.status.state := STATE_ABORT_DISTRIBUTION;
			task.status.statusMessage := 'Aborting Distribution';	
			
		END_IF		
	
	ELSE
		task.internal.PLCOpen.status := BUILD_DISTRIBUTOR_ERROR;
		task.status.state := STATE_NOT_READY;
		task.internal.localLockout := FALSE;	
	END_IF
	
		
	///////////////////////////////////////////////////////////////
	//Handle any canceled commands that are required
	///////////////////////////////////////////////////////////////	
	IF task.internal.newCommand THEN

		//TODO: Log state changes
		//		task.internal.abortedStep := task.status.sequence;
		//		task.internal.abortedState := task.internal.previousState;

		//If a new command came into the system, abort any PLCOpen commands that were active.
		// If the command came from PLCOpen FirstPass will be true and it will not abort it
		atnPLCOpenAbort(task.internal.PLCOpen);
		
	END_IF
					

	///////////////////////////////////////////////////////////////
	//Handle any Commands that do not require state.
	///////////////////////////////////////////////////////////////	
	

	
	
	///////////////////////////////////////////////////////////////
	//Handle the current state
	///////////////////////////////////////////////////////////////
	CASE task.status.state OF
		
		STATE_NOT_READY:
			
			task.status.sequence := SEQUENCE_IDLE;
			task.status.statusMessage := 'Build Distributor is NOT ready';
			gOpcData_ToBuildPC.RequestBuildInfo := FALSE;
			
			IF task.status.ready THEN
				task.status.state := STATE_READY;
				task.status.statusMessage := 'Build Distributor is ready';	
			END_IF	

		STATE_READY:

			task.status.sequence := SEQUENCE_IDLE;
			task.internal.localLockout := FALSE;
			gOpcData_ToBuildPC.RequestBuildInfo := FALSE;
	
		STATE_START_DISTRIBUTION:
		
			CASE task.status.sequence OF
				
				SEQUENCE_ERROR:
					task.status.statusMessage := 'Start Distribution ERROR';	
					task.internal.PLCOpen.status := BUILD_DISTRIBUTOR_ERROR;
					task.status.state := STATE_READY;

				SEQUENCE_DONE:
					task.status.statusMessage := 'Start Distribution COMPLETE';	
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
				
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Start Distribution busy...';	
					task.status.sequence := SEQUENCE_EXECUTE_START_DIST;
					
				ELSE
					
					StartDistributionSubSequence;	

			END_CASE
		
		STATE_DISTRIBUTE_LAYER_FILE:
		
			CASE task.status.sequence OF 
				
				SEQUENCE_ERROR:
					task.status.statusMessage := 'Distribute Layer ERROR';	
					task.internal.PLCOpen.status := BUILD_DISTRIBUTOR_ERROR;
					task.status.state := STATE_READY;

				SEQUENCE_DONE:
					task.status.statusMessage := 'Distribute Layer COMPLETE';	
					task.internal.PLCOpen.status := ERR_OK;
					task.status.state := STATE_READY;
				
				SEQUENCE_IDLE:
					task.status.statusMessage := 'Distribute Layer busy...';	
					task.status.sequence := SEQUENCE_EXECUTE_GET_LAYER_FILES;
					
				ELSE
					
					DistributeLayerFileSubSequence;	
				
			END_CASE
		
		STATE_ABORT_DISTRIBUTION:
		
			
			task.status.statusMessage := 'aborting distribution';
			
			IF task.status.buildDistributorConnected THEN
				//gPrint Job management files
				gOpcData_ToBuildPC.RequestAbortDistribution := TRUE;
				gOpcData_ToBuildPC.RequestPauseDistribution := FALSE;
				gOpcData_ToBuildPC.RequestStartDistribution := FALSE;
				gOpcData_ToBuildPC.PrintingActive := FALSE;			
				gOpcData_ToBuildPC.RequestBuildInfo := FALSE;
				
				
			ELSE
				task.status.statusMessage := 'BD not connected';
				gOpcData_ToBuildPC.RequestAbortDistribution := FALSE;
				task.status.state := STATE_READY;
				task.internal.PLCOpen.status := ERR_OK;
				
			END_IF
				
	END_CASE
			

	///////////////////////////////////////////////////////////////
	//Update Statuses
	///////////////////////////////////////////////////////////////
	


	///////////////////////////////////////////////////////////////
	//Call all PLCOpen function blocks
	///////////////////////////////////////////////////////////////
	task.internal.fbTON_DistributionDelay();
	task.internal.fbTON_DistributionDelay.IN := FALSE;
	
	task.internal.atnPLCOpenCommand();
	task.internal.atnPLCOpenCommand.Execute := FALSE;
	
	task.internal.atnPLCOpenCommandParameters();
	task.internal.atnPLCOpenCommandParameters.Execute := FALSE;
	
	
	///////////////////////////////////////////////////////////////
	//Reset all commands to ensure they don't get buffered
	///////////////////////////////////////////////////////////////
	task.command.distributeLayerFile := 0;
	task.command.startDistribution := 0;
	task.command.abortDistribution := 0;
	task.internal.newCommand := 0;
	
	
	task.internal.waitToRetry();
	task.internal.waitToRetry.IN := FALSE;
	
	logStateChange_0.LoggerName := 'App';
	logStateChange_0.ModuleName := Name;
	logStateChange_0.State 		:= task.status.state;
	logStateChange_0.StateName 	:= task.status.statusMessage;
	logStateChange_0();
	
	logSeqChange_0.LoggerName 	:= 'App';
	logSeqChange_0.ModuleName 	:= Name;
	logSeqChange_0.State		:= task.status.sequence;
	logSeqChange_0.StateName	:= task.status.statusMessage;
	logSeqChange_0();
	
	//Keep track of the previous state
	task.internal.previousState := task.status.state;
	
	
	///////////////////////////////////////////////////////////////
	//Simulation
	///////////////////////////////////////////////////////////////	
	IF gSimulation THEN
		SimulateIO;
	END_IF
	
	
END_PROGRAM

PROGRAM _EXIT
		(* Insert code here *)
	 
END_PROGRAM

