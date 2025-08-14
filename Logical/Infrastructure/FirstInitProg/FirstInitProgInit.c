/********************************************************************
 * COPYRIGHT --  
 ********************************************************************
 * Program: FirstInitProg
 * File: FirstInitProgInit.c
 * Author: ScismD
 * Created: January 07, 2014
 ********************************************************************
 * Implementation of program FirstInitProg
 ********************************************************************/

// TODO: convert to ST

#include <bur/plctypes.h>

//#ifdef _DEFAULT_INCLUDES
#include <AsDefault.h>
//#endif

#include <string.h>

void _INIT FirstInitProgInit(void)
{
	
	gTransfer = gCyclic;
	
	if( strcmp(_buildDate, gRevInfo_buildDate) != 0 || gTransfer){
		gBootAfterTransfer = !gTransfer;
		gDataValid[0] = 0;
		gDataValid[1] = 0;
	}
	if(!gTransfer){
		strcpy(_buildDate, gRevInfo_buildDate);
	}
	
	// Check for simulation
	// This is a DevLink using a Windows share which is not supported by ARsim
	// We use this instead of Diag function to support older CPU's
	simCheckDevLink.enable = 1;
	simCheckDevLink.pDevice = (UDINT)&("SimCheck");
	simCheckDevLink.pParam = (UDINT)&("/SIP=127.0.0.1 /PROTOCOL=cifs /SHARE=testfolder /USER=max /PASSWORD=passw");
	
	DevLink(&simCheckDevLink);
	
	if (simCheckDevLink.status == ERR_NOTIMPLEMENTED) {
		gSimulation = 1;
	}
	
	// Initialize User Loggers
	createLogInit("Errors", 1000000, arEVENTLOG_PERSISTENCE_VOLATILE);	
	createLogInit("Files", 1000000, arEVENTLOG_PERSISTENCE_VOLATILE);	
	createLogInit("App", 1000000, arEVENTLOG_PERSISTENCE_VOLATILE);	
	
	// INIT ATN Interfaces
	//-------------------------------------------------------
	atninit( &gConsole.Console, sizeof(gConsole.Console) );

	varPopulateMemberNames( "gStates", strlen(&"gStates") + 1);
	varPopulateMemberNames( "gActions", strlen(&"gActions") + 1);
	varPopulateMemberNames( "gCommands", strlen(&"gCommands") + 1);			
	varPopulateMemberNames( "gVFLCR", 0 );
	varPopulateMemberNames( "gSFCControlApi", 0 );
	varPopulateMemberNames( "gAlarmApi", 0 );
	
	
	// Link file devices
	//-------------------------------------------------------
	
	// This is NOT done in the CPU configuration because when using CPU simulation
	// you cannot have separate file devices for simulation mode,
	// and you cannot unlink devices that were entered in the CPU configuration

	// Set up file device names
	strcpy(fileDevice[3], "PermData");
	strcpy(fileDevice[6], "PixelMapping");
	strcpy(fileDevice[7], "CurrentBuild");

	
	// Set up file device paths
	if (gSimulation) {
		strcpy(directory[0], "C:\\ARSimUser\\ControlPLC_Gen3");
		strcpy(directory[3], "C:\\ARSimUser\\ControlPLC_Gen3\\PermData");
		strcpy(directory[6], "C:\\ARSimUser\\ControlPLC_Gen3\\CurrentBuild");
		strcpy(directory[7], "C:\\ARSimUser\\ControlPLC_Gen3\\CurrentBuild");
	} else {
		// TODO: This won't work (nicely) with ARwin
		strcpy(directory[0], "F:\\");
		strcpy(directory[3], "F:\\PermData");
		strcpy(directory[6], "F:\\CurrentBuild");
		strcpy(directory[7], "F:\\CurrentBuild");
	}	
	
	// Link file devices
	for (i = 0; i < NUM_FILEDEVICES; i++) {
		
		strcpy(parameters[i], "/DEVICE=");
		strcat(parameters[i], directory[i]);
		
		fileDeviceDevLink[i].enable = 1;
		fileDeviceDevLink[i].pDevice = (UDINT)&(fileDevice[i]);
		fileDeviceDevLink[i].pParam =  (UDINT)&(parameters[i]);
		
		DevLink(&fileDeviceDevLink[i]);
		
	}

	
	// Initialize Persisters
	//-------------------------------------------------------
	
	// Working variables
	
	// Machine configuration
	varGetVariableList((UDINT)"Configuration", (UDINT)&(gPersister[PERM_CONFIGURATION].IN.WorkingVariableList));
				
	// Home data
	strcpy(gPersister[PERM_HOME_DATA].IN.WorkingVariableList[0],"RestorePosition");
	

	// Permanent variables	
	gPersister[PERM_CONFIGURATION].IN.pPersistentVariable = (UDINT)&gPermConfiguration;
	gPersister[PERM_CONFIGURATION].IN.sizeofPersistentVariable = sizeof(gPermConfiguration);

	gPersister[PERM_HOME_DATA].IN.pPersistentVariable = (UDINT)&gPermHomeData;
	gPersister[PERM_HOME_DATA].IN.sizeofPersistentVariable = sizeof(gPermHomeData);
	
	// DataValid and PersistFn_Init()
	for(i = 0; i < NUM_PERSISTERS; i++){
		gPersister[i].IN.pDataValid = (UDINT)&gDataValid[i];
		PersistFn_Init(&gPersister[i]);
		if(gPersister[i].OUT.STAT.Error){
			persistErrorID = gPersister[i].OUT.STAT.ErrorID;
			//vfAlarmEdgeSnippet(&gMachineAlarms.components, &gMachineAlarms.PERMMEM_PERSISTER_ERROR, gPersister[i].OUT.STAT.ErrorString);
		}
		if( gPersister[i].OUT.STAT.RequiredMemory != gPermDataSize[i]){
			gDataValid[i] = 0;
			//			vfAlarmEdgeSnippet(&gMachineAlarms.components, &gMachineAlarms.PERMMEM_PERSISTER_SIZE_CHANGED, gPersister[i].OUT.STAT.ErrorString);
		}		
	}	
	
	//-------------------------------------------------------
	// Load task configurations
	//-------------------------------------------------------
	
	// TODO: check retval of this varGetVariableList call and add alarm when we've exceeded max number of configs
	varGetVariableList((UDINT)"Configuration", (UDINT)&(gSplitConfig.configList));
	strcpy(gPermData[PERM_CONFIGURATION].IN.PAR.FileDevice, "PermData");
	CSVFn_Init( &gPermData[PERM_CONFIGURATION] );
	
	// cache split config data
	int taskIndex;
	for( taskIndex = 0; taskIndex <= CSV_MAI_VARLIST; taskIndex++ ){
		//Go through the list until there is an empty filename
		if( gSplitConfig.configList[taskIndex][0] != 0 ){
		
			gSplitConfig.taskCount++;
			
			//The taskIndex name is the filename
			strcpy(&gSplitConfig.configFilename[taskIndex], &gSplitConfig.configList[taskIndex]);

			//Put log files in a log folder
			strcpy(&gSplitConfig.logFilename[taskIndex], "logs/");
			strcat(&gSplitConfig.logFilename[taskIndex], &gSplitConfig.configList[taskIndex]);

			//Remove the data starting from the colon. ie ':Configuration'
			char *colon;
			colon = strchr(&gSplitConfig.configFilename[taskIndex], ':');
			if( colon ){
				*colon = 0;
			}
			colon = strchr(&gSplitConfig.logFilename[taskIndex], ':');
			if( colon ){
				*colon = 0;
			}

			//Append some extensions
			strcat(&gSplitConfig.configFilename[taskIndex], ".csv");
			strcat(&gSplitConfig.logFilename[taskIndex], ".csvlog");
	
		}
	}
	
	// if persister failed, reload from csv
	if (!gDataValid[PERM_CONFIGURATION]) {
		for( taskIndex = 0; taskIndex < gSplitConfig.taskCount; taskIndex++ ){
	
			// run all split config CSVFileMgr setup
			strcpy(&gPermData[PERM_CONFIGURATION].IN.PAR.FileName, &gSplitConfig.configFilename[taskIndex]);
			memset(&gPermData[PERM_CONFIGURATION].IN.PAR.VariableList, 0, sizeof(gPermData[PERM_CONFIGURATION].IN.PAR.VariableList));
			memcpy(&gPermData[PERM_CONFIGURATION].IN.PAR.VariableList, &gSplitConfig.configList[taskIndex], sizeof(gSplitConfig.configList[taskIndex]));
			strcpy(&gPermData[PERM_CONFIGURATION].IN.CFG.LogFileName, &gSplitConfig.logFilename[taskIndex]);
			
			CSVOpenFile_Init( &gPermData[PERM_CONFIGURATION] );
			
			if (gPermData[PERM_CONFIGURATION].OUT.STAT.Error) {
				
				// error, mark data invalid for this task
				gSplitConfig.taskDataValid[taskIndex] = 0;
				
				//Copy filename to the alarm snippet
				strcpy( alarmSnippet, gPermData[PERM_CONFIGURATION].IN.PAR.FileName );
			
				//This error indicates the file doesn't exist
				// We will create a template file for the user to edit.
				if( gPermData[PERM_CONFIGURATION].OUT.STAT.ErrorID == 20708 ){
	
					//Alert the user that the config is wrong
					//vfAlarmEdgeSnippet( &gMachineAlarms.components, &gMachineAlarms.PERMMEM_FILE_ERROR, gPermData[PERM_CONFIGURATION].IN.PAR.FileName );
					
					//Make sure the error is acknowledged so we can accept new commands
					gPermData[PERM_CONFIGURATION].IN.CMD.AcknowledgeError = 1;
					CSVFn_Cyclic( &gPermData[PERM_CONFIGURATION] );				
	
					//Append a _tmp so that the file isn't just accepted with invalid values
					strcat(gPermData[PERM_CONFIGURATION].IN.PAR.FileName, "_tmp");
					
					//Start writing a file and and call cyclicly until it's done
					gPermData[PERM_CONFIGURATION].IN.CMD.SaveVariableListToFile = 1;												
					do{ 
						CSVFn_Cyclic( &gPermData[PERM_CONFIGURATION] );				
					}while(	gPermData[PERM_CONFIGURATION].OUT.STAT.Busy  );
					
					//Call with no commmand to reset for the next file
					gPermData[PERM_CONFIGURATION].IN.CMD.SaveVariableListToFile = 0;											
					CSVFn_Cyclic( &gPermData[PERM_CONFIGURATION] );				
				}
	
					//Other errors are just posted to the user and acknowledged to set new files can be created
				else{					
					//Alert the user that the config is wrong
					//vfAlarmEdgeSnippet( &gMachineAlarms.components, &gMachineAlarms.PERMMEM_FILE_ERROR, gPermData[PERM_CONFIGURATION].IN.PAR.FileName );
					
					//Acknowledge the error
					gPermData[PERM_CONFIGURATION].IN.CMD.AcknowledgeError = 1;
					CSVFn_Cyclic( &gPermData[PERM_CONFIGURATION] );				
					gPermData[PERM_CONFIGURATION].IN.CMD.AcknowledgeError = 0;
					CSVFn_Cyclic( &gPermData[PERM_CONFIGURATION] );				
				}
			} else {
				// no error, mark data valid for this task
				gSplitConfig.taskDataValid[taskIndex] = 1;
			}
		}
		
		// update datavalid for split config
		gDataValid[PERM_CONFIGURATION] = 1;
		for (taskIndex = 0; taskIndex < gSplitConfig.taskCount; taskIndex++) {
			gDataValid[PERM_CONFIGURATION] &= gSplitConfig.taskDataValid[taskIndex];
		}
	}
	
	// Initialize non-config persister CSV backups 	
	strcpy(gPermData[PERM_HOME_DATA].IN.PAR.FileName, "homeData.csv");
	
	// set non-default gPermData cfg
	gPermData[PERM_HOME_DATA].IN.CFG.MaxFileSize = 10000000;

	for( i = PERM_HOME_DATA; i < NUM_PERSISTERS; i++){
		
		strcpy(gPermData[i].IN.PAR.FileDevice, "PermData");
		// these array sizes don't inherently match - could cause issues at some point
		memcpy(&gPermData[i].IN.PAR.VariableList, &gPersister[i].IN.WorkingVariableList, sizeof(gPermData[i].IN.PAR.VariableList) );
		strcpy(gPermData[i].IN.CFG.LogFileName, "logs/");
		strcat(gPermData[i].IN.CFG.LogFileName, gPermData[i].IN.PAR.FileName);
		strcat(gPermData[i].IN.CFG.LogFileName, ".log");
		
		CSVFn_Init(&(gPermData[i]));
		
		// if persister failed, reload from csv
		if (!gDataValid[i]) {
			CSVOpenFile_Init(&gPermData[i]);
			if (!gPermData[i].OUT.STAT.Error) {
				gDataValid[i] = 1;
			//	vfAlarmEdgeSnippet(&gMachineAlarms.components, &gMachineAlarms.PERMMEM_DATA_RESTORED, gPermData[i].IN.PAR.FileName);
			}
		}
		
	} // loop through PermData

	// Load configuration.csv every startup
	//CSVOpenFile_Init(&gPermData[PERM_CONFIGURATION]);
	

} // _INIT
