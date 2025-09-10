/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1757533629_13_
#define _BUR_1757533629_13_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef enum BuildPlatform_enum
{	PLATFORM_UNKNOWN = 0,
	PLATFORM_SMALL_200x600 = 1,
	PLATFORM_MEDIUM_400x600 = 2,
	PLATFORM_LARGE_600x600 = 3
} BuildPlatform_enum;

typedef enum PLATE_TYPE_ENUM
{	PLATE_TYPE_NONE,
	PLATE_TYPE_STANDARD,
	PLATE_TYPE_SUBPLATES,
	PLATE_TYPE_ATTUNE_7X11
} PLATE_TYPE_ENUM;

typedef struct BuildDistributorCommands_typ
{	plcstring distributeLayerFile[81];
	plcstring startDistribution[81];
	plcstring abortDistribution[81];
} BuildDistributorCommands_typ;

typedef struct BuildDistributorStatus_Typ
{	plcstring subsystemsReady[81];
	plcstring isConnected[81];
} BuildDistributorStatus_Typ;

typedef struct BuildDistributorAlarms_typ
{	struct vfAlarms_Component_typ components;
	struct vfAlarms_Instance_type BD_HEARTBEAT_LOST_AL;
} BuildDistributorAlarms_typ;

typedef struct BuildDistributor_typ
{	struct BuildDistributorCommands_typ commands;
	struct BuildDistributorStatus_Typ status;
	struct BuildDistributorAlarms_typ alarms;
} BuildDistributor_typ;

typedef struct PrintJobManagementCommands_typ
{	plcstring validatePrintFile[81];
	plcstring CheckReadyForPrinting[81];
	plcstring updateLayerNumber[81];
	plcstring notifyEndOfPrint[81];
	plcstring setBuildPlateThickness[81];
	plcstring setFocalOffset[81];
	plcstring setRecoaterOffset[81];
	plcstring resetPrintInfo[81];
	plcstring enableLOP[81];
	plcstring disableLOP[81];
	plcstring resetPlateType[81];
	plcstring setThicknessDOMS[81];
	plcstring clearThicknessDOMS[81];
	plcstring getAllLocalConfigData[81];
	plcstring calculateRemainingPrintTime[81];
} PrintJobManagementCommands_typ;

typedef struct PrintJobManagementParameters_typ
{	float buildPlateThickness_mm;
	float focalOffset_mm;
	float recoaterOffset_mm;
	plcbit disableScratchCoat;
	float thicknessDOMS_mm;
} PrintJobManagementParameters_typ;

typedef struct PrintJobManagementStatus_typ
{	plcbit distributionLayerRecieved;
	plcbit distributionLayerRequested;
	plcstring buildInfoValid[81];
	plcstring buildInfoInvalid[81];
	plcbit distributionActive;
	plcbit reprintLayerPermitted;
	plcbit autoAdvanceEnabled;
	plcstring currentLayerGCodeFilename[256];
	float maxBPThickness;
	float maxRecoaterOffset;
	plcstring inhibitScavenge[81];
	plcstring inhibitDryRun[81];
	plcstring inhibitLOP[81];
	plcstring inhibitIncrement[81];
	plcstring inhibitScrape[81];
	plcstring inhibitRecoat[81];
	plcstring inhibitPrint[81];
	plcstring inhibitMHopperRefill[81];
	float MAX_DOMS_THICKNESS;
	plcbit loadHasStarted;
	plcbit measuringScratchCoat;
	float remainingHoursLow;
	float remainingHoursHigh;
	float hoursElapsedInPrint;
	float hoursBehindSchedule;
	plcdt updatedEstOfPrintEndTime;
	float doubleRecoatRatio;
	plcstring printStartTimeString[81];
	plcstring actualPrintTimeString[81];
	plcstring initialPrintTimeString[81];
	plcstring actualPrintDateTimeClean[81];
	plcstring initialPrintDateTimeClean[81];
	plcstring printStartDateTimeClean[81];
	plcstring actualPrintDateString[81];
	plcstring initialPrintDateString[81];
	plcstring printStartDateString[81];
	float trajectoriesPerLayer;
	float intraLayerCleansPerLayer;
	plcstring layerStatusString[21];
	float availabilityDuringPrint;
	float downTimeHours;
	float downTimeBetweenLastTwoLayers;
	plcstring longestPauseString[41];
	plcstring longestPauseMinutes[21];
	float lastLayerFloorHopper;
	float lastLayerTotalPowder;
	float totalPowderReqToFinish;
	float totalPowderUsed;
	float thisLayerTotalPowder;
} PrintJobManagementStatus_typ;

typedef struct PrintJobManagementEvents_typ
{	plcstring newPrintJob[81];
	plcstring endPrintJob[81];
} PrintJobManagementEvents_typ;

typedef struct PrintJobManagementReport_typ
{	plcdt lastPrintStartTimeStamp;
	plcdt lastEchainMaintDate;
	unsigned long echainMaintenanceTrajectory;
	unsigned long echainMaintTrajectoryOnReset;
	unsigned long lastGreasedTrajectory;
	unsigned long greaseMaintTrajectoryOnReset;
	unsigned char HerdingCleaningCount;
	unsigned char HerdingPassivationCount;
	signed short GasHeadCleanCount;
	signed short NumberOfMultiRecoatsPerLayer;
	signed short LayersInContModeSingleRecoat;
	plcstring BuildSetupStartTime[26];
	unsigned char BladeSpotCheckStatusPostPrint;
	float meteringHopperStartOfBuild;
	float overheadHopperStartOfBuild;
	float floorHopperStartOfBuild;
	unsigned long secondsPrintingDuringPrint;
	unsigned long secondsRecoatingDuringPrint;
	unsigned long secondsPreparingDuringPrint;
	unsigned long secondsIdleDuringPrint;
	unsigned long secondsWaitingOpDuringPrint;
	unsigned long secondsUnavailableDuringPrint;
	float reclaimCollectedDuringPrint;
	unsigned short layersInContinousModeDuringPrint;
	float avgGasFlowDuringPrint;
	float minGasFlowDuringPrint;
	float maxGasFlowDuringPrint;
	float avgO2PpmDuringPrint;
	float avgPzPressureDuringPrint;
	plctime totalLayerTimeInContinuousMode;
	float totalPowderPerLayerInContMode;
	plcdt timeStartOfPrint;
	plcdt timeEndOfPrint;
	unsigned long totalRecoatsDoneDuringPrint;
	unsigned long totalTrajectoriesDoneDuringPrint;
	float herdingWasteLevelStartOfPrint;
	float minO2PpmDuringPrint;
	float maxO2PpmDuringPrint;
	plctime totalLayerTimeAutoMode1Recoat;
	float totalPowderForScratchCoat;
	plcbit greaseDispensedOnUnload;
	float bladeAngle;
	float bladeMaxErrPrePrint;
	float bladeMaxErrPostPrint;
	float totalRecoatSpeed;
	float minRecoatSpeed;
	float maxRecoatSpeed;
	float avgElectrodeGainDuringPrint;
	signed short totalLayersElectrodeGainUsed;
	float minRecoatGain;
	float maxRecoatGain;
	float avgInitialDispenseRotations;
	float minRecoatInitDispense;
	float maxRecoatInitDispense;
	plctime timeElapsedInPrint;
	float initialEstOfPrintDurationHrs;
	plcdt initialEstOfPrintEndTime;
	plcstring timePrepareBpStart[26];
	plcstring timePrepareBpEnd[26];
	plcstring timeBladeSetupStart[26];
	plcstring timeBladeSetupEnd[26];
	plcstring timeCameraCalStart[26];
	plcstring timeCameraCalEnd[26];
	plcstring timeScratchCoatStart[26];
	plcstring timeScratchCoatEnd[26];
	plcstring longestPauseLayer[11];
	float longestPauseHours;
	float totalDowntimeAtLastLayerStart;
	float totalPowderLoadedForPrint;
	double plateFlatnessError;
	plcbit plateFlatnessInSpec;
	unsigned long secondsSpentCooling;
} PrintJobManagementReport_typ;

typedef struct PrintJobManagementState_typ
{	plcstring baseFilename[21];
	plcstring description[81];
	plcstring author[41];
	plcstring printOwner[41];
	plcstring buildInstanceID[41];
	plcstring configEditorBranch[21];
	plcstring configEditorVersion[21];
	plcstring rasterEngineBranch[21];
	plcstring rasterEngineVersion[21];
	unsigned long buildLayout;
	unsigned short printNumber;
	unsigned short numberOfLayers;
	float layerHeight;
	float encoderTickWidth;
	unsigned short maxLaserCount;
	float laserLineAngle;
	float headCenterOffset;
	float laserSpacing;
	float minLaserWatts;
	float maxLaserWatts;
	enum BuildPlatform_enum buildPlatform;
	plcstring buildPlatformName[21];
	struct BuildVolumeExtents_typ buildVolumeExtents;
	float currentPartHeight;
	unsigned short currentLayerNumber;
	unsigned short lastRecoatedLayerNumber;
	unsigned short lastPrintedLayerNumber;
	plcbit newBuildInfoFileLoaded;
	MACHINE_OPERATIONS_ENUM lastCompletedOperation;
	unsigned short buildIteration;
	plcbit cleanerEngagedToScoops;
	unsigned short pixelMapFileVersion;
	plcbit lopModeActive;
	plcbit lastOpLoadComplete;
	plcbit lastOpUnloadComplete;
	float buildPlateThickness;
	float recoaterOffset;
	unsigned long safetyEnables;
	double currentThetaX_mrad;
	double currentThetaY_mrad;
	plcbit buildPlateHasBeenPrepared;
	plcbit buildPlateRecoaterOffsetFound;
	plcbit longPauseRecoveryReq;
	plcbit podLoaded;
	plcbit scratchCoatPassedVerification;
	float focalOffset;
	unsigned long totalTrajectory;
	double lastKnowLift1Position;
	double lastKnowLift2Position;
	double lastKnowLift3Position;
	unsigned char opticsBoxType;
	plcstring plateType[81];
	plcbit domsPlateTypeLoaded;
	plcbit domsHasBeenPrepared;
	float domsThickness;
	plcdt argonPurgeStartTime;
	plcbit cameraCalDone;
	double lastKnownShuttlePosition;
	double lastKnownAirlockPosition;
	plcbit printActive;
	unsigned short lastDistributedLayer;
	plcbit vflcrsHaveBeenReferenced;
	signed short PCIFileFormatVersion;
	struct PrintJobManagementReport_typ buildReport;
	plcbit hopperSwapAllowed;
} PrintJobManagementState_typ;

typedef struct PrintJobManagementAlarms_typ
{	struct vfAlarms_Component_typ components;
	struct vfAlarms_Instance_type AGGREGATE_GENERAL_ALARM;
	struct vfAlarms_Instance_type COMMAND_BEFORE_READY;
	struct vfAlarms_Instance_type COMMAND_INHIBITED;
	struct vfAlarms_Instance_type BuildInfoFileError_AL0020;
	struct vfAlarms_Instance_type PixelActiveOnIgnoredLaser_AL0021;
	struct vfAlarms_Instance_type Inhibited_AL0022;
	struct vfAlarms_Instance_type FileLoadError_AL0023;
	struct vfAlarms_Instance_type FileSaveError_AL0024;
	struct vfAlarms_Instance_type BuildInfoValidRequired_AL0025;
	struct vfAlarms_Instance_type InvalidCurrentLayer_AL0026;
	struct vfAlarms_Instance_type PrintingNotAllowed_AL0027;
	struct vfAlarms_Instance_type RecoatNotAllowed_AL0028;
	struct vfAlarms_Instance_type BPThicknessInvalid_AL0029;
	struct vfAlarms_Instance_type NotAllowedToEnterLopMode_AL0030;
	struct vfAlarms_Instance_type NotAllowedToResetPrint_AL0031;
	struct vfAlarms_Instance_type RecoaterOffsetInvalid_AL0032;
	struct vfAlarms_Instance_type InterlockDoorOpened_AL0033;
} PrintJobManagementAlarms_typ;

typedef struct PrintJobManagement_typ
{	struct PrintJobManagementCommands_typ commands;
	struct PrintJobManagementParameters_typ parameters;
	struct PrintJobManagementStatus_typ status;
	struct PrintJobManagementEvents_typ events;
	struct PrintJobManagementState_typ currentState;
	struct PrintJobManagementAlarms_typ alarms;
} PrintJobManagement_typ;

typedef struct New_Datatype
{
} New_Datatype;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/DataManagement/PrintJobManagement/Types.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1757533629_13_ */

