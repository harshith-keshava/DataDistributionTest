
TYPE
	IO_DI_typ : 	STRUCT 
		operatorStationAckAll : BOOL;
	END_STRUCT;
	IO_DO_typ : 	STRUCT 
		operatorStationAlarmsLED : BOOL;
	END_STRUCT;
	IO_typ : 	STRUCT 
		di : IO_DI_typ;
		do : IO_DO_typ;
	END_STRUCT;
END_TYPE
