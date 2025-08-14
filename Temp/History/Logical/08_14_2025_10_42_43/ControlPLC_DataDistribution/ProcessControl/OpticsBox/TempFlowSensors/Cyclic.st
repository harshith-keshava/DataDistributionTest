
PROGRAM _CYCLIC
	
	
	//	// --------------------------------------------
	//OB TEMP SENSORS
	// --------------------------------------------
	monValueIndex := 0;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp1);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp1);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_TEMP1';
	dMonitoredValueConfig.DisplayName := 'Optics Box Temp 1';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	
	monValueIndex := 1;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp2);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp2);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_TEMP2';
	dMonitoredValueConfig.DisplayName := 'Optics Box Temp 2';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 2;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp3);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp3);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_TEMP3';
	dMonitoredValueConfig.DisplayName := 'Optics Box Temp 3';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 3;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp4);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp4);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_TEMP1';
	dMonitoredValueConfig.DisplayName := 'Optics Box Temp 4';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 4;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp5);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp5);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_TEMP5';
	dMonitoredValueConfig.DisplayName := 'Optics Box Temp 5';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 5;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp6);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp6);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_TEMP6';
	dMonitoredValueConfig.DisplayName := 'Optics Box Temp 6';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 6;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp7);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp7);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_TEMP7';
	dMonitoredValueConfig.DisplayName := 'Optics Box Temp 7';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 7;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp8);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp8);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_TEMP8';
	dMonitoredValueConfig.DisplayName := 'Optics Box Temp 8';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 8;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp9);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp9);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_Temp9';
	dMonitoredValueConfig.DisplayName := 'OB Temp 9';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 9;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp10);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp10);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_Temp10';
	dMonitoredValueConfig.DisplayName := 'OB Temp 10';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 10;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp11);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp11);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_Temp11';
	dMonitoredValueConfig.DisplayName := 'OB Temp 11';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 11;
	dMonitoredValue ACCESS ADR(IO.ai.obTemp12);
	dMonitoredValueConfig ACCESS ADR(mvConfig.obTemp12);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB_Temp12';
	dMonitoredValueConfig.DisplayName := 'OB Temp 12';
	dMonitoredValueConfig.Scale.RawMin := -2000;
	dMonitoredValueConfig.Scale.RawMax := 8500;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := -200;
	dMonitoredValueConfig.Scale.EngineeringMax := 850;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 12;
	dMonitoredValue ACCESS ADR(IO.ai.chillerTemp);
	dMonitoredValueConfig ACCESS ADR(mvConfig.chillerTemp);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'OB Chiller Temp';
	dMonitoredValueConfig.DisplayName := 'OB Chiller Temp';
	dMonitoredValueConfig.Scale.RawMin := 0;
	dMonitoredValueConfig.Scale.RawMax := 32767;
	dMonitoredValueConfig.Scale.RawOffset := -5446;
	dMonitoredValueConfig.Scale.EngineeringMin := 0;
	dMonitoredValueConfig.Scale.EngineeringMax := 90;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	monValueIndex := 13;
	dMonitoredValue ACCESS ADR(IO.ai.BatFlowTemp);
	dMonitoredValueConfig ACCESS ADR(mvConfig.BatFlowTemp);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'BAT flow Temp';
	dMonitoredValueConfig.DisplayName := 'BAT flow Temp';
	dMonitoredValueConfig.Scale.RawMin := 0;
	dMonitoredValueConfig.Scale.RawMax := 32767;
	dMonitoredValueConfig.Scale.RawOffset := -5446;
	dMonitoredValueConfig.Scale.EngineeringMin := 0;
	dMonitoredValueConfig.Scale.EngineeringMax := 90;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'deg C';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 625;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	
	//OPTICS BOX FLOW
	monValueIndex := 14;
	dMonitoredValue ACCESS ADR(IO.ai.chillerFlow);
	dMonitoredValueConfig ACCESS ADR(mvConfig.chillerFlow);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'MV_OPTICS_BOX_FLOW';
	dMonitoredValueConfig.DisplayName := 'Optics Box Flow';
	dMonitoredValueConfig.Scale.RawMin := 6556;//TODO
	dMonitoredValueConfig.Scale.RawMax := 32767;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := 0;
	dMonitoredValueConfig.Scale.EngineeringMax := 10.55;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'GPM';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 100;	// 3125 * 3.2ms cycle = ~10 sec moving average;
	
	dMonitoredValueConfig.Limits.LowerAlarm.EnableLimit := TRUE;//OB FLOW MUST ALWAYS HAVE LOW ALARM ENABLED
	dMonitoredValueConfig.Limits.LowerWarning.EnableLimit := TRUE;
	
	//min value for low flow is 1.5 gpm
	IF (dMonitoredValueConfig.Limits.LowerWarning.ScaledValue < 1.2) THEN
		dMonitoredValueConfig.Limits.LowerWarning.ScaledValue := 1.2;
	END_IF
	IF (dMonitoredValueConfig.Limits.LowerAlarm.ScaledValue < 1.5) THEN
		dMonitoredValueConfig.Limits.LowerAlarm.ScaledValue := 1.5;
	END_IF

	dMonitoredValueConfig.Limits.DelayAlarm_msec := 5000;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	dMonitoredValueConfig.Limits.DelayAlarm_msec := 5000;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	//BAT FLOW
	monValueIndex := 15;
	dMonitoredValue ACCESS ADR(IO.ai.BatFlowValue);
	dMonitoredValueConfig ACCESS ADR(mvConfig.BatFlowValue);
	dMonitoredValueConfig.DB_CrossReference;
	dMonitoredValueConfig.Used := TRUE;
	dMonitoredValueConfig.DB_Name := 'BAT_FLOW';
	dMonitoredValueConfig.DisplayName := 'BAT Flow';
	dMonitoredValueConfig.Scale.RawMin := 6556;//TODO
	dMonitoredValueConfig.Scale.RawMax := 32767;
	dMonitoredValueConfig.Scale.RawOffset := 0;
	dMonitoredValueConfig.Scale.EngineeringMin := 0;
	dMonitoredValueConfig.Scale.EngineeringMax := 10.55;
	dMonitoredValueConfig.Scale.EngineeringUnits := 'GPM';
	dMonitoredValueConfig.Scale.DecimalPlaces := 1;
	dMonitoredValueConfig.MovingWindowLength := 100;	// 3125 * 3.2ms cycle = ~10 sec moving average;
	
	dMonitoredValueConfig.Limits.LowerAlarm.EnableLimit := TRUE;//OB FLOW MUST ALWAYS HAVE LOW ALARM ENABLED
	dMonitoredValueConfig.Limits.LowerWarning.EnableLimit := TRUE;
	
	//min value for low flow is 1.5 gpm
	IF (dMonitoredValueConfig.Limits.LowerWarning.ScaledValue < 1.2) THEN
		dMonitoredValueConfig.Limits.LowerWarning.ScaledValue := 1.2;
	END_IF
	IF (dMonitoredValueConfig.Limits.LowerAlarm.ScaledValue < 1.5) THEN
		dMonitoredValueConfig.Limits.LowerAlarm.ScaledValue := 1.5;
	END_IF
	
	dMonitoredValueConfig.Limits.DelayAlarm_msec := 5000;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	dMonitoredValueConfig.Limits.DelayAlarm_msec := 5000;
	fbMonValueIndex[monValueIndex].Enable := TRUE;
	fbMonValueIndex[monValueIndex].RawValue := dMonitoredValue.RawValue; 
	fbMonValueIndex[monValueIndex].InhibitAlarms := FALSE;
	fbMonValueIndex[monValueIndex].RawValueIsValid := TRUE;
	fbMonValueIndex[monValueIndex].pValue := ADR(dMonitoredValue);
	fbMonValueIndex[monValueIndex].pValueConfig := ADR(dMonitoredValueConfig);
	fbMonValueIndex[monValueIndex]();
	
	//Check for Temperature and Flow
	
	IF IO.ai.obTemp1.ScaledValue > 60 OR IO.ai.chillerFlow.ScaledValue <4 OR IO.ai.BatFlowValue.ScaledValue <3 THEN
		gHighTempOrLowFlowLaserPowerOff := TRUE;
	ELSE
		gHighTempOrLowFlowLaserPowerOff := FALSE;
	END_IF
		
		
END_PROGRAM
