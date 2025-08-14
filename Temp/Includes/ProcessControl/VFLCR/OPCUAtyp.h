/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1755183251_13_
#define _BUR_1755183251_13_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef struct OPCUAData_FROM_Gen3CalibApp_typ
{	unsigned char AppMajorVersion;
	unsigned char AppMinorVersion;
	unsigned char AppPatchVersion;
	unsigned char ErrorNum;
	unsigned short HeartbeatIn;
	unsigned char TestResult;
	unsigned char ExampleResult;
	plcbit CalibrationInitialized;
	plcbit PixelInitialized;
	plcbit PixelCaptured;
	plcbit PixelProcessed;
	unsigned long PixelResult;
	plcbit CalibrationProcessed;
	plcbit LUTsUploaded;
	plcbit TestDataUploaded;
	plcbit TestResultsDownloaded;
	plcbit TestResultsParsed;
	plcbit ErrorBucketNotExist;
	plcbit ErrorS3Connection;
	plcbit ErrorCaptureFailed;
	plcbit ErrorFrameCaptureFailed;
	float MeasuredPower;
	float CommandedPower;
	unsigned char LaserTestStatus;
	float Zaber1Position;
	float Zaber2Position;
	plcbit Zaber1Homed;
	plcbit Zaber2Homed;
	plcbit MetaDataWriterReady;
	plcbit TestAbortProcessed;
	plcbit TestCompleteProcessed;
	unsigned short FrameCaptureInstanceResponse;
	float BeamSpotXPosition;
	float BeamSpotYPosition;
	unsigned short NumberOfBeamSpots;
} OPCUAData_FROM_Gen3CalibApp_typ;

typedef struct OPCUAData_TO_Gen3CalibApp_typ
{	plcbit ExampleCommand;
	plcbit InitializeCalibration;
	plcbit InitializePixel;
	plcbit CapturePixel;
	plcbit CaptureFrame;
	plcbit ProcessPixel;
	plcbit ProcessCalibration;
	float CurrentPowerWatts;
	unsigned long ActivePixel;
	plcbit UploadCalibratedLUTs;
	plcbit UploadLinearLUTs;
	plcbit UploadTestData;
	plcbit DownloadTestResults;
	plcbit ParseTestResults;
	unsigned char VFPMap[101][4];
	VFLCR_TEST_TYPE TestType;
	struct VFLCRManualPulseParameters_typ LaserParameters;
	unsigned short HeartbeatOut;
	plcstring MachineName[41];
	plcstring FactoryName[41];
	unsigned long CurrentLUTID;
	plcstring MachineIdentity[61];
	plcstring BuildLotID[61];
	float Zaber1RelativePos_mm;
	float Zaber1AbsolutePos_mm;
	float Zaber2RelativePos_mm;
	float Zaber2AbsolutePos_mm;
	plcbit Zaber1Home;
	plcbit Zaber2Home;
	plcbit Zaber1MoveRelative;
	plcbit Zaber1MoveAbsolute;
	plcbit Zaber2MoveRelative;
	plcbit Zaber2MoveAbsolute;
	plcbit Zaber1GetHomeStatus;
	plcbit Zaber2GetHomeStatus;
	plcbit Zaber1GetPosFeedback;
	plcbit Zaber2GetPosFeedback;
	float CameraExposure;
	unsigned short CaptureFrameInstance;
	unsigned short ComPortNumberZaber1;
	unsigned short ComPortNumberZaber2;
	float PyroMultiplicationFactor;
	plcbit StartOMSTest;
	plcbit OMSTestComplete;
	plcbit OMSTestAborted;
	unsigned short ZOffset;
	unsigned short ScrewDistance1_23;
	unsigned short ScrewDistance2_3;
	unsigned short DateOfExpiryOfCalibration;
	unsigned short SOMSSerialNumber;
	plcbit LaserPulseComplete;
} OPCUAData_TO_Gen3CalibApp_typ;

typedef struct VFLCR_ManualLaserPulseConfig_typ
{	unsigned short pulseDelayMsec;
	unsigned short pulseOnMsec;
	unsigned short pulseOffMsec;
	unsigned char numPulsesPerLevel;
	unsigned short availableLaserPowerWatts;
	unsigned short safePowerLimitWatts;
	unsigned short startingPowerLevel;
	unsigned char numPowerLevelSteps;
	unsigned char powerLevelIncrement;
} VFLCR_ManualLaserPulseConfig_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/ProcessControl/VFLCR/OPCUA.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1755183251_13_ */

