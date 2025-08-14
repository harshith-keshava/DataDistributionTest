/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1755183251_12_
#define _BUR_1755183251_12_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef enum VFLCR_LaserHardware_enum
{	LH_undefined,
	LH_Raycus_300W,
	LH_nLight_525W
} VFLCR_LaserHardware_enum;

typedef enum VFLCR_TEST_TYPE
{	VFLCR_TEST_TYPE_PIXEL_MAPPING,
	VFLCR_TEST_TYPE_CALIBRATION,
	VFLCR_TEST_TYPE_VERIFY_CLEAN,
	VFLCR_TEST_TYPE_VERIFY_DIRTY,
	VFLCR_TEST_TYPE_LOW_POWER_CHECK,
	VFLCR_TEST_TYPE_SOMS,
	VFLCR_TEST_TYPE_HIGH_POWER,
	END_OF_VFLCR_TEST_TYPE
} VFLCR_TEST_TYPE;

typedef struct VFLCRApiCommand_typ
{	plcstring enableLaserPowerSequence[81];
	plcstring laserRackRemap[81];
	plcstring forceMappingDone[81];
	plcstring checkActivePixels[81];
	plcstring enableModulation[81];
	plcstring disableModulation[81];
	plcstring enableDCPower[81];
	plcstring disableDCPower[81];
	plcstring enableLaserPower[81];
	plcstring disableLaserPower[81];
	plcstring enableLaserEmission[81];
	plcstring disableLaserEmission[81];
	plcstring resetHardwareError[81];
	plcstring resetAllErrors[81];
	plcstring enableAutoMode[81];
	plcstring enableManualMode[81];
	plcstring openLayer[81];
	plcstring abortLayer[81];
	plcstring resetSoftwareError[81];
	plcstring deleteLaserControlFiles[81];
	plcstring deleteLUTFiles[81];
	plcstring transferLUTFiles[81];
	plcstring checkPixelOk[81];
	plcstring checkMotionOk[81];
	plcstring manualPulse[81];
	plcstring manualPulseRack[81];
	plcstring manualPulseAbort[81];
	plcstring triggerDataCollection[81];
	plcstring initializeDataCollection[81];
	plcstring initializeCalibration[81];
	plcstring initializeManualCalibration[81];
	plcstring initializePixel[81];
	plcstring initializePixelForFrame[81];
	plcstring processPixel[81];
	plcstring processCalibration[81];
	plcstring uploadLUTs[81];
	plcstring uploadTestData[81];
	plcstring initializeOmsTestZaber1[81];
	plcstring initializeOmsTestZaber2[81];
	plcstring setZaber2PosAndExposure[81];
	plcstring setZaber1Pos[81];
	plcstring checkZaber2Homed[81];
	plcstring checkZaber1Homed[81];
	plcstring passRequiredMetaData[81];
	plcstring passCompleteHandshake[81];
	plcstring passAbortedHandshake[81];
	plcstring captureFrame[81];
	plcstring stopPulse[81];
	plcstring startPulse[81];
	plcstring passAbortedHandshakeWithoutAck[81];
} VFLCRApiCommand_typ;

typedef struct VFLCRApiStatus_typ
{	plcstring remapEnabled[81];
	plcstring pixelMappingHeaderInfo[81];
	plcstring counterResetEnabled[81];
	plcstring modulationEnabled[81];
	plcstring userModulationEnabled[81];
	plcstring encoderXSelected[81];
	plcstring prepareTrajectory[81];
	plcstring error[81];
	plcstring subSystemsReady[81];
	plcstring rackIgnored[81];
	plcstring laserSafetyEnabled[81];
	plcstring laserEmissionEnabled[81];
	plcstring laserPowerEnabled[81];
	plcstring dcPowerEnabled[81];
	plcstring remapActive[81];
	plcstring remapAlarmActive[81];
	plcstring pixelMapped[81];
	plcstring manualPulseActive[81];
	plcstring OMSModeEnabled[81];
	plcstring autoModeEnabled[81];
	plcstring manualModeEnabled[81];
	plcstring invalidPixelUsage[81];
	plcstring readyToPrint[81];
	plcstring layerOpen[81];
	plcstring rackOnline[81];
	plcstring usingGen3LaserCalibrationApp[81];
	plcstring heartbeatLaserCalibrationAppOk[81];
	plcstring calibrationConfigParOk[81];
	plcbit pythonOpcuaControlEnabled;
	unsigned char vfpMap[101][4];
	unsigned long calibrationLUT[4];
	plcbit mismatchedLUTs;
	plcbit defaultLUT;
	plcbit versionZeroLUT;
	plcbit laserModulationEnabled;
	plcbit frameCaptured;
	plcbit manualContinuousModeEnabled;
	unsigned char MaxNumberOfPixelsUsed;
} VFLCRApiStatus_typ;

typedef struct VFLCRApiInhibit_typ
{	plcstring laserRackRemap[81];
	plcstring modulation[81];
	plcstring autoModulation[81];
	plcstring dcPower[81];
	plcstring laserPower[81];
	plcstring laserEmission[81];
	plcstring manualPulse[81];
} VFLCRApiInhibit_typ;

typedef struct VFLCRApiIO_typ
{	plcstring rack[81];
} VFLCRApiIO_typ;

typedef struct VFLCRApiAlarm_typ
{	struct vfAlarms_Component_typ components;
	struct vfAlarms_Instance_type AGGREGATE_GENERAL_ALARM;
	struct vfAlarms_Instance_type AGGREGATE_HARDWARE_ALARM;
	struct vfAlarms_Instance_type AGGREGATE_SOFTWARE_ALARM;
	struct vfAlarms_Instance_type AGGREGATE_PIXELMAPPING_ALARM;
	struct vfAlarms_Instance_type AGGREGATE_CALIBAPP_ALARM;
	struct vfAlarms_Instance_type VFLCR_HW_HEARTBEAT_ERROR_AL9100;
	struct vfAlarms_Instance_type VFLCR_HW_HARDWARE_ERROR_AL9103;
	struct vfAlarms_Instance_type VFLCR_HW_SUPPLY_FAN_FAIL_AL9104;
	struct vfAlarms_Instance_type VFLCR_HW_SUPPLY_OVERTEMP_AL9105;
	struct vfAlarms_Instance_type VFLCR_HW_SUPPLY_AC_LOW_AL9106;
	struct vfAlarms_Instance_type VFLCR_HW_SUPPLY_DC_FAIL_AL9107;
	struct vfAlarms_Instance_type VFLCR_HW_CONTROL_POWER_AL9108;
	struct vfAlarms_Instance_type VFLCR_HW_LASER_READY_FAIL_AL9109;
	struct vfAlarms_Instance_type VFLCR_HW_LASER_MAIN_POWER_AL9110;
	struct vfAlarms_Instance_type VFLCR_HW_LASER_EMISSION_AL9111;
	struct vfAlarms_Instance_type VFLCR_HW_LASER_FATAL_AL9112;
	struct vfAlarms_Instance_type VFLCR_HW_LASER_WATCHDOG_AL9113;
	struct vfAlarms_Instance_type VFLCR_HW_POWERLINK_ERROR_AL9114;
	struct vfAlarms_Instance_type VFLCR_SW_VERSION_MISMATCH_AL9200;
	struct vfAlarms_Instance_type VFLCR_SW_ID_MISMATCH_AL9201;
	struct vfAlarms_Instance_type VFLCR_SW_LUT_LOAD_FAIL_AL9202;
	struct vfAlarms_Instance_type VFLCR_SW_MAP_UNDEFINED_AL9203;
	struct vfAlarms_Instance_type VFLCR_SW_SYSTEM_ERROR_AL9204;
	struct vfAlarms_Instance_type VFLCR_SW_TRAJECTORY_ERROR_AL9205;
	struct vfAlarms_Instance_type VFLCR_SW_PRINT_NOT_READY_AL9206;
	struct vfAlarms_Instance_type VFLCR_SW_COMMAND_INHIBIT_AL9207;
	struct vfAlarms_Instance_type VFLCR_PM_FILE_NOT_FOUND_AL9300;
	struct vfAlarms_Instance_type VFLCR_PM_PATH_NOT_FOUND_AL9301;
	struct vfAlarms_Instance_type VFLCR_PM_FILE_OPEN_ERROR_AL9302;
	struct vfAlarms_Instance_type VFLCR_PM_FILE_CLOSE_ERROR_AL9303;
	struct vfAlarms_Instance_type VFLCR_PM_FILE_READ_ERROR_AL9304;
	struct vfAlarms_Instance_type VFLCR_PM_FILE_DATA_ERROR_AL9305;
	struct vfAlarms_Instance_type VFLCR_PM_VERSION_CONFLICT_AL9306;
	struct vfAlarms_Instance_type VFLCR_PM_IGNORED_PIXEL_AL9307;
	struct vfAlarms_Instance_type VFLCR_PM_RANGE_EXCEEDED_AL9308;
	struct vfAlarms_Instance_type VFLCR_APP_HEARTBEAT_ERROR_AL9400;
	struct vfAlarms_Instance_type VFLCR_APP_COMMAND_TIMEOUT_AL9401;
	struct vfAlarms_Instance_type VFLCR_APP_CMD_B4_READY_AL9402;
	struct vfAlarms_Instance_type VFLCR_APP_RESULTS_TIMEOUT_AL9403;
	struct vfAlarms_Instance_type VFLCR_APP_BUCKET_MISSING_AL9404;
	struct vfAlarms_Instance_type VFLCR_APP_S3_CONNECTION_AL9405;
	struct vfAlarms_Instance_type VFLCR_APP_CAPTURE_FAILED_AL9406;
	struct vfAlarms_Instance_type VFLCR_DISABLE_CHILLER_RUN_AL9208;
	struct vfAlarms_Instance_type VFLCR_DISABLE_OB_FLOW_LOW_AL9209;
	struct vfAlarms_Instance_type PIXEL_ENABLE_MISMATCH_AL9309;
	struct vfAlarms_Instance_type VFLCR_VERIFY_INHIBIT_AL9210;
} VFLCRApiAlarm_typ;

typedef struct VFLCRApi_typ
{	struct VFLCRApiCommand_typ command;
	struct VFLCRApiStatus_typ status;
	struct VFLCRApiInhibit_typ inhibit;
	struct VFLCRApiIO_typ IO;
	struct VFLCRApiAlarm_typ alarm;
} VFLCRApi_typ;

typedef struct VFLCRManualPulseParameters_typ
{	float safePowerLimit_W;
	float availableLaserPower_W;
	unsigned short startingPowerLevel;
	unsigned char numPowerLevels;
	unsigned char powerIncrementPerStep;
	unsigned char numPulsesPerLevel;
	unsigned short pulseOnTime_ms;
	unsigned long pulseDelayTime_ms;
	unsigned long pulseOffTime_ms;
} VFLCRManualPulseParameters_typ;

typedef struct VFLCRApiParameter_typ
{	struct VFLCRManualPulseParameters_typ manualPulse;
} VFLCRApiParameter_typ;

typedef struct VFLCROpenLayerParameters_typ
{	unsigned long selectedBuildLayout;
	unsigned short selectedPrintNumber;
	unsigned long selectedLayer;
} VFLCROpenLayerParameters_typ;

typedef struct VFLCROpenLayerCommandPars_typ
{	struct VFLCROpenLayerParameters_typ parameters;
} VFLCROpenLayerCommandPars_typ;

typedef struct VFLCROpenLayerRackPars_typ
{	unsigned char Rack;
} VFLCROpenLayerRackPars_typ;

typedef struct VFLCRInitializePixelCmdPars_typ
{	unsigned char activePixelIndex;
} VFLCRInitializePixelCmdPars_typ;

typedef struct VFLCRInitCalibrationPars_typ
{	enum VFLCR_TEST_TYPE testType;
} VFLCRInitCalibrationPars_typ;

typedef struct VFLCRUploadLUTsCmdPars_typ
{	plcbit Calibrated;
} VFLCRUploadLUTsCmdPars_typ;

typedef struct VFLCRAdjustZaberAndExpoPars_typ
{	float ZaberRelativePos_mm;
	float ZaberAbsolutePos_mm;
	plcbit ZaberHome;
	plcbit ZaberMoveRelative;
	plcbit ZaberMoveAbsolute;
	float CameraExposure;
} VFLCRAdjustZaberAndExpoPars_typ;

typedef struct VFLCRDataCollectionCmdPars_typ
{	enum VFLCR_TEST_TYPE TestType;
	float CurrentPowerWatts;
	struct VFLCRManualPulseParameters_typ LaserParameters;
	unsigned char ActivePixel;
} VFLCRDataCollectionCmdPars_typ;

typedef struct VFLCRManualPulseRackPars_typ
{	unsigned char Rack;
	unsigned char Laser;
} VFLCRManualPulseRackPars_typ;

typedef struct VFLCRManualPulseCommandPars_typ
{	struct VFLCRManualPulseRackPars_typ selection;
	struct VFLCRManualPulseParameters_typ parameters;
} VFLCRManualPulseCommandPars_typ;

typedef struct LaserManualPulseStatus_typ
{	unsigned char rackNumber;
	unsigned char laserNumber;
	unsigned char pixelNumber;
	unsigned short numPulses;
	unsigned short currentPowerLevel;
	unsigned short safePowerLevel;
	unsigned short maxFeedbackPower_W;
	unsigned short currentStep;
	float currentPower_W;
	unsigned short feedbackPower_W;
} LaserManualPulseStatus_typ;

typedef struct LaserSnippets_typ
{	unsigned char rackNumber;
	unsigned char laserNumber;
	unsigned char pixelNumber;
	unsigned char supplyNumber;
	plcstring additionalInfoLaserFatal[161];
} LaserSnippets_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/ProcessControl/VFLCR/VFLCR.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1755183251_12_ */

