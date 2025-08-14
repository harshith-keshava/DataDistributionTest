
ACTION SimulateIO: 

	(*
	IO.safeLOGIC.Status.SafetySystemReady := TRUE;
	

	
	IO.safeLOGIC.Status.SupplyEnabled_Argon := IO.safeLOGIC.Command.EnablePneumaticsSupply;
	IO.safeLOGIC.Status.SupplyEnabled_CDA := IO.safeLOGIC.Command.EnablePneumaticsSupply;
	IO.safeLOGIC.Status.AxesEnabled_Gantry := IO.safeLOGIC.Command.EnableAxes_Gantry;
	IO.safeLOGIC.Status.AxesEnabled_Recoater := IO.safeLOGIC.Command.EnableAxes_Recoater;
	IO.safeLOGIC.Status.AxesEnabled_Shuttle_AirLocks := IO.safeLOGIC.Command.EnableAxes_Shuttle_Airlocks;
	IO.safeLOGIC.Status.AxesEnabled_ZLifts := IO.safeLOGIC.Command.EnableAxes_ZLifts;
	IO.safeLOGIC.Status.ArgonSupplyEnabled_PrintZone := IO.safeLOGIC.Command.EnableArgonSupply_PrintZonePurge;

	IO.safeLOGIC.Status.SafetyReset_Lasers := IO.safeLOGIC.Command.EnableLaserSafetyInterlock;
	
	IF NOT(IO.safeLOGIC.Command.EnablePneumaticsSupply) THEN
		IO.safeLOGIC.Status.SupplyEnabled_Argon := FALSE;
	END_IF
	
	IF NOT(IO.safeLOGIC.Command.EnablePneumaticsSupply) THEN
		IO.safeLOGIC.Status.SupplyEnabled_CDA := FALSE;
	END_IF
	
	IF NOT(IO.safeLOGIC.Command.EnableAxes_Gantry) THEN
		IO.safeLOGIC.Status.AxesEnabled_Gantry := FALSE;
	END_IF
	
	IF NOT(IO.safeLOGIC.Command.EnableAxes_Recoater) THEN
		IO.safeLOGIC.Status.AxesEnabled_Recoater := FALSE;
	END_IF
	
	IF NOT(IO.safeLOGIC.Command.EnableAxes_Shuttle_Airlocks) THEN
		IO.safeLOGIC.Status.AxesEnabled_Shuttle_AirLocks := FALSE;
	END_IF
	
	IF NOT(IO.safeLOGIC.Command.EnableAxes_ZLifts) THEN
		IO.safeLOGIC.Status.AxesEnabled_ZLifts := FALSE;
	END_IF
	
	IF NOT(IO.safeLOGIC.Command.EnableArgonSupply_PrintZonePurge) THEN
		IO.safeLOGIC.Status.ArgonSupplyEnabled_PrintZone := FALSE;
	END_IF
	
	*)

	
END_ACTION
