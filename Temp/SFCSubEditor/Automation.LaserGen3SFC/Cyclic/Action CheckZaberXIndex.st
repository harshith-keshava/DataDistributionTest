IF task.internal.activeZaber1Index < MACHINE_NUM_LASERS_TOTAL THEN
	StepContinue := TRUE;
	task.internal.activeZaber1Index:= task.internal.activeZaber1Index +1 ;
ELSE
	StepDone := TRUE;
END_IF
   
(* TODO: Insert Program *)
