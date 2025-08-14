
TYPE
	ValveCommands_typ : 	STRUCT 
		open : BOOL;
		close : BOOL;
		cycle : BOOL;
		stop : BOOL;
		errReset : BOOL;
	END_STRUCT;
	ValveHandling_typ : 	STRUCT 
		commands : ValveCommands_typ;
		parameters : ValveParameters_typ;
		status : ValveStatus_typ;
	END_STRUCT;
	ValveParameters_typ : 	STRUCT 
		TimeOutValue : TIME; (*timeout of the valve (not opened or closed despite command)*)
		hasLimitSensors : BOOL; (*FALSE if no limit sensors are used to determine valve position*)
		enabled : BOOL;
		actuationDelay : TIME; (*If option of "no limit" sensors is selected, this is a delay to allow the valve to actuate before reporting on new status*)
		cycleTime : UDINT; (*when cycling this is the amount of time it stays in the open state*)
	END_STRUCT;
	ValveStatus_typ : 	STRUCT 
		busy : BOOL;
		opened : BOOL;
		closed : BOOL;
		middle : BOOL;
		cycling : BOOL;
		leftOpened : BOOL;
		leftClosed : BOOL;
		leftMiddle : BOOL;
		rightOpened : BOOL;
		rightClosed : BOOL;
		rightMiddle : BOOL;
		frontLeftOpened : BOOL;
		rearLeftOpened : BOOL;
		frontLeftClosed : BOOL;
		rearLeftClosed : BOOL;
		frontLeftMiddle : BOOL;
		rearLeftMiddle : BOOL;
		frontRightOpened : BOOL;
		rearRightOpened : BOOL;
		frontRightClosed : BOOL;
		rearRightClosed : BOOL;
		frontRightMiddle : BOOL;
		rearRightMiddle : BOOL;
		doOpen : BOOL;
		doClose : BOOL;
		readyForCommand : BOOL;
		safeEnabled : BOOL;
		error : BOOL;
		reachedFullOpen : BOOL;
		fbState : STRING[20];
		actualCycleTimeMsec : UDINT;
	END_STRUCT;
END_TYPE
