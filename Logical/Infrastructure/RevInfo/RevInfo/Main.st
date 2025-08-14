
PROGRAM _INIT
	
	gRevInfo_revision;
	revision;	// used for CSVFileMgr headers
	gRevInfo_revisionDate;
	gRevInfo_revisionAuthor;
	gRevInfo_branchName;
	gRevInfo_uncommittedChanges;
	gRevInfo_buildDate;
	gRevInfo_buildConfiguration;
	buildConfiguration;	// used for CSVFileMgr headers
	gRevInfo_builder;
	gRevInfo_versionId;
	
//	// Create the logger that will be used by RevInfo. 
//	createLogInit('App', 1000000, arEVENTLOG_PERSISTENCE_VOLATILE);
//
//	// Log revision information
//	//---------------------------------------------------------------
//	
//	logInfo('App', 0, '************ RevInfo Start ************', 0);
//
//	// revision
//	brsmemset(ADR(tempString), 0, SIZEOF(tempString));
//	tempString := 'Revision: ';
//	brsstrcat(ADR(tempString), ADR(revision));
//	logInfo('App', 0, tempString, 0);
//
//	// revisionDate
//	brsmemset(ADR(tempString), 0, SIZEOF(tempString));
//	tempString := 'Commit Date: ';
//	brsstrcat(ADR(tempString), ADR(revisionDate));
//	logInfo('App', 0, tempString, 0);
//
//	// revisionAuthor
//	brsmemset(ADR(tempString), 0, SIZEOF(tempString));
//	tempString := 'Author: ';
//	brsstrcat(ADR(tempString), ADR(revisionAuthor));
//	logInfo('App', 0, tempString, 0);
//	
//	// branchName
//	brsmemset(ADR(tempString), 0, SIZEOF(tempString));
//	tempString := 'Branch Name: ';
//	brsstrcat(ADR(tempString), ADR(branchName));
//	logInfo('App', 0, tempString, 0);
// 
//	// uncommittedChanges
//	brsmemset(ADR(tempString), 0, SIZEOF(tempString));
//	tempString := 'Uncommitted Changes: ';
//	brsstrcat(ADR(tempString), ADR(uncommittedChanges));
//	logInfo('App', 0, tempString, 0);
//
//	// buildDate
//	brsmemset(ADR(tempString), 0, SIZEOF(tempString));
//	tempString := 'Build Date: ';
//	brsstrcat(ADR(tempString), ADR(buildDate));
//	logInfo('App', 0, tempString, 0);
//
//	// buildConfiguration
//	brsmemset(ADR(tempString), 0, SIZEOF(tempString));
//	tempString := 'Configuration: ';
//	brsstrcat(ADR(tempString), ADR(buildConfiguration));
//	logInfo('App', 0, tempString, 0);
//
//	// builder
//	brsmemset(ADR(tempString), 0, SIZEOF(tempString));
//	tempString := 'Builder: ';
//	brsstrcat(ADR(tempString), ADR(builder));
//	logInfo('App', 0, tempString, 0);
//
//	// versionId
//	brsmemset(ADR(tempString), 0, SIZEOF(tempString));
//	tempString := 'Version ID: ';
//	brsstrcat(ADR(tempString), ADR(versionId));
//	logInfo('App', 0, tempString, 0);
//
//	logInfo('App', 0, '************ RevInfo End ************', 0);
	
END_PROGRAM
