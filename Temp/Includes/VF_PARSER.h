/* Automation Studio generated header file */
/* Do not edit ! */
/* VF_PARSER 1.00.0 */

#ifndef _VF_PARSER_
#define _VF_PARSER_
#ifdef __cplusplus
extern "C" 
{
#endif
#ifndef _VF_PARSER_VERSION
#define _VF_PARSER_VERSION 1.00.0
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
/* Constants */
#ifdef _REPLACE_CONST
 #define vfp_MAX_CHARS_PER_STRING_VALUE 60U
 #define vfp_MAX_CHARS_PER_NUMERIC_VALUE 30U
 #define fvp_FIRST_TRAJECTORY_NUMBER 10U
 #define fvp_TRAJECTORY_NUMBER_INCREMENT 10U
 #define vfp_LSF_FILE_READ_BUFFER_SIZE 341000U
 #define vfp_LSF_TRAJECTORY_FIFO_SIZE 4U
 #define vfp_LSF_NUM_LASERS_PER_SYSTEM 19U
 #define vfp_LSF_MAX_32BIT_VAL_PER_TRAJ 1630U
 #define vfp_LSF_MAX_CHARS_PER_32BIT_VAL 11U
 #define vfp_LSF_MAX_CHARS_PER_HEADER 300U
 #define vfp_FEF_FILE_READ_BUFFER_SIZE 200U
 #define vfp_FEF_TRAJECTORY_FIFO_SIZE 100U
 #define vfp_FEF_MASTER_AXIS_X 1U
 #define vfp_FEF_MASTER_AXIS_Y 2U
 #define vfp_FEF_MAX_X_Y_POSN_MM 960.0
 #define vfp_CHAR_CARRIAGE_RETURN 13U
 #define vfp_CHAR_LINE_FEED 10U
 #define vfp_CHAR_SPACE 32U
 #define vfp_CHAR_COMMA 44U
 #define vfp_CHAR_DECIMAL_POINT 46U
 #define vfp_CHAR_DIGIT_0 48U
 #define vfp_CHAR_DIGIT_9 57U
 #define vfp_CHAR_EQUALS 61U
 #define vfp_CHAR_TRAJECTORY_HDR 78U
 #define vfp_ERR_OK 50000U
 #define vfp_ERR_EOL_REACHED 50001U
 #define vfp_ERR_NO_MORE_LINES 50002U
 #define vfp_ERR_NULL_POINTER 50003U
 #define vfp_ERR_INVALID_PARAMETER 50004U
 #define vfp_ERR_NO_DELIMITER 50005U
 #define vfp_ERR_MISSING_DATA 50006U
 #define vfp_ERR_NON_NUMERICAL 50007U
 #define vfp_ERR_WRONG_NUM_STATES 50008U
 #define vfp_ERR_BAD_HEADER 50009U
 #define vfp_ERR_HEADER_INVALID_NUM_TRAJ 50010U
 #define vfp_ERR_BUFFER_SIZE 50040U
 #define vfp_ERR_FATAL_SYSTEM_ERROR 50050U
#else
 _GLOBAL_CONST unsigned short vfp_MAX_CHARS_PER_STRING_VALUE;
 _GLOBAL_CONST unsigned short vfp_MAX_CHARS_PER_NUMERIC_VALUE;
 _GLOBAL_CONST unsigned short fvp_FIRST_TRAJECTORY_NUMBER;
 _GLOBAL_CONST unsigned char fvp_TRAJECTORY_NUMBER_INCREMENT;
 _GLOBAL_CONST unsigned long vfp_LSF_FILE_READ_BUFFER_SIZE;
 _GLOBAL_CONST unsigned char vfp_LSF_TRAJECTORY_FIFO_SIZE;
 _GLOBAL_CONST unsigned short vfp_LSF_NUM_LASERS_PER_SYSTEM;
 _GLOBAL_CONST unsigned short vfp_LSF_MAX_32BIT_VAL_PER_TRAJ;
 _GLOBAL_CONST unsigned short vfp_LSF_MAX_CHARS_PER_32BIT_VAL;
 _GLOBAL_CONST unsigned short vfp_LSF_MAX_CHARS_PER_HEADER;
 _GLOBAL_CONST unsigned long vfp_FEF_FILE_READ_BUFFER_SIZE;
 _GLOBAL_CONST unsigned char vfp_FEF_TRAJECTORY_FIFO_SIZE;
 _GLOBAL_CONST unsigned char vfp_FEF_MASTER_AXIS_X;
 _GLOBAL_CONST unsigned char vfp_FEF_MASTER_AXIS_Y;
 _GLOBAL_CONST double vfp_FEF_MAX_X_Y_POSN_MM;
 _GLOBAL_CONST unsigned char vfp_CHAR_CARRIAGE_RETURN;
 _GLOBAL_CONST unsigned char vfp_CHAR_LINE_FEED;
 _GLOBAL_CONST unsigned char vfp_CHAR_SPACE;
 _GLOBAL_CONST unsigned char vfp_CHAR_COMMA;
 _GLOBAL_CONST unsigned char vfp_CHAR_DECIMAL_POINT;
 _GLOBAL_CONST unsigned char vfp_CHAR_DIGIT_0;
 _GLOBAL_CONST unsigned char vfp_CHAR_DIGIT_9;
 _GLOBAL_CONST unsigned char vfp_CHAR_EQUALS;
 _GLOBAL_CONST unsigned char vfp_CHAR_TRAJECTORY_HDR;
 _GLOBAL_CONST unsigned short vfp_ERR_OK;
 _GLOBAL_CONST unsigned short vfp_ERR_EOL_REACHED;
 _GLOBAL_CONST unsigned short vfp_ERR_NO_MORE_LINES;
 _GLOBAL_CONST unsigned short vfp_ERR_NULL_POINTER;
 _GLOBAL_CONST unsigned short vfp_ERR_INVALID_PARAMETER;
 _GLOBAL_CONST unsigned short vfp_ERR_NO_DELIMITER;
 _GLOBAL_CONST unsigned short vfp_ERR_MISSING_DATA;
 _GLOBAL_CONST unsigned short vfp_ERR_NON_NUMERICAL;
 _GLOBAL_CONST unsigned short vfp_ERR_WRONG_NUM_STATES;
 _GLOBAL_CONST unsigned short vfp_ERR_BAD_HEADER;
 _GLOBAL_CONST unsigned short vfp_ERR_HEADER_INVALID_NUM_TRAJ;
 _GLOBAL_CONST unsigned short vfp_ERR_BUFFER_SIZE;
 _GLOBAL_CONST unsigned short vfp_ERR_FATAL_SYSTEM_ERROR;
#endif




/* Datatypes and datatypes of function blocks */
typedef enum vfpLSFStepsEnum
{	vfSTEP_LSF_INITIALIZE,
	vfSTEP_LSF_IDLE,
	vfSTEP_LSF_CREATE_LAYER_FILENAME,
	vfSTEP_LSF_OPEN_FILE,
	vfSTEP_LSF_WAIT_FILE_OPEN,
	vfSTEP_LSF_AWAIT_COMMAND,
	vfSTEP_LSF_READ_FILE_DATA,
	vfSTEP_LSF_WAIT_READ_DONE,
	vfSTEP_LSF_PARSE_FILE_HDR,
	vfSTEP_LSF_FIND_TRAJECTORY_HDR,
	vfSTEP_LSF_PARSE_TRAJECTORY_HDR,
	vfSTEP_LSF_PARSE_NUM_EVENTS,
	vfSTEP_LSF_PARSE_LASER_POWERS,
	vfSTEP_LSF_PARSE_LASER_STATES,
	vfSTEP_LSF_SELECT_NEXT_LASER,
	vfSTEP_LSF_TRAJECTORY_PARSE_DONE,
	vfSTEP_LSF_AWAIT_NEXT_COMMAND,
	vfSTEP_LSF_CLOSE_FILE,
	vfSTEP_LSF_WAIT_FILE_CLOSED,
	vfSTEP_LSF_LAYER_CLOSED,
	vfSTEP_LSF_LAYER_ABORTED,
	vfSTEP_LSF_ERROR,
	vfSTEP_LSF_AWAIT_CMD_RESET
} vfpLSFStepsEnum;

typedef enum vfpFEFStepsEnum
{	vfSTEP_FEF_INITIALIZE,
	vfSTEP_FEF_IDLE,
	vfSTEP_FEF_CREATE_LAYER_FILENAME,
	vfSTEP_FEF_OPEN_FILE,
	vfSTEP_FEF_WAIT_FILE_OPEN,
	vfSTEP_FEF_AWAIT_COMMAND,
	vfSTEP_FEF_READ_FILE_DATA,
	vfSTEP_FEF_WAIT_READ_DONE,
	vfSTEP_FEF_PARSE_FILE_HDR,
	vfSTEP_FEF_FIND_TRAJECTORY_HDR,
	vfSTEP_FEF_PARSE_TRAJECTORY_HDR,
	vfSTEP_FEF_PARSE_MASTER_AXIS,
	vfSTEP_FEF_PARSE_START_POSN,
	vfSTEP_FEF_PARSE_END_POSN,
	vfSTEP_FEF_PARSE_EVENT_PERIOD,
	vfSTEP_FEF_TRAJECTORY_PARSE_DONE,
	vfSTEP_FEF_AWAIT_NEXT_COMMAND,
	vfSTEP_FEF_CLOSE_FILE,
	vfSTEP_FEF_WAIT_FILE_CLOSED,
	vfSTEP_FEF_LAYER_CLOSED,
	vfSTEP_FEF_LAYER_ABORTED,
	vfSTEP_FEF_ERROR,
	vfSTEP_FEF_AWAIT_CMD_RESET
} vfpFEFStepsEnum;

typedef enum VfSMRFileStepsEnum
{	vfSMR_FILE_STEP_IDLE,
	vfSMR_FILE_STEP_COPY_TO_SMR1,
	vfSMR_FILE_STEP_COPY_TO_SMR2,
	vfSMR_FILE_STEP_COPY_TO_SMR3,
	vfSMR_FILE_STEP_COPY_TO_SMR4,
	vfSMR_FILE_STEP_COPY_TO_PTR1,
	vfSMR_FILE_STEP_COPY_TO_PTR2,
	vfSMR_FILE_STEP_COPY_TO_LCR1,
	vfSMR_FILE_STEP_COPY_TO_LCR2,
	vfSMR_FILE_STEP_DONE,
	vfSMR_FILE_STEP_DISCONNECT1,
	vfSMR_FILE_STEP_DISCONNECT2,
	vfSMR_FILE_STEP_ERROR,
	vfSMR_FILE_STEP_ERROR_RESET
} VfSMRFileStepsEnum;

typedef enum VfSMRConnectStepsEnum
{	vfSMR_CNCT_STEP_IDLE,
	vfSMR_CNCT_STEP_CONNECT_SMR1,
	vfSMR_CNCT_STEP_CONNECT_SMR2,
	vfSMR_CNCT_STEP_CONNECT_PTR1,
	vfSMR_CNCT_STEP_CONNECT_PTR2,
	vfSMR_CNCT_STEP_CONNECT_LCR1,
	vfSMR_CNCT_STEP_CONNECT_LCR2,
	vfSMR_CNCT_STEP_CONNECT_REMOTE1,
	vfSMR_CNCT_STEP_CONNECT_REMOTE2,
	vfSMR_CNCT_STEP_DONE,
	vfSMR_CNCT_STEP_DISCONNECT1,
	vfSMR_CNCT_STEP_DISCONNECT2,
	vfSMR_CNCT_STEP_ERROR,
	vfSMR_CNCT_STEP_ERROR_RESET
} VfSMRConnectStepsEnum;

typedef enum VfLCRConnectStepsEnum
{	vfLCR_CNCT_STEP_IDLE,
	vfLCR_CNCT_STEP_CONNECT_LCR1,
	vfLCR_CNCT_STEP_CONNECT_LCR2,
	vfLCR_CNCT_STEP_DONE,
	vfLCR_CNCT_STEP_DISCONNECT1,
	vfLCR_CNCT_STEP_DISCONNECT2,
	vfLCR_CNCT_STEP_ERROR,
	vfLCR_CNCT_STEP_ERROR_RESET
} VfLCRConnectStepsEnum;

typedef struct vfpLSFCommandType
{	unsigned long SelectedBuildLayout;
	unsigned short SelectedPrintNumber;
	unsigned char SelectedRack;
	unsigned long SelectedLayer;
	unsigned short OptionalStartingTrajectory;
	unsigned char NumLasersInRack;
	plcbit OpenLayer;
	plcbit ParseTrajectory;
	plcbit CloseLayer;
	plcbit AbortLayer;
	plcbit ResetError;
} vfpLSFCommandType;

typedef struct vfpLSFStatusType
{	plcstring LayerFilename[256];
	plcbit LayerOpen;
	unsigned long CurrentLayer;
	unsigned short FinalTrajectoryNumber;
	unsigned short ParsedTrajectoryNumber;
	plcbit ParseTrajectoryComplete;
	plcbit LayerClosed;
	plcbit LayerAborted;
	plcbit Error;
	unsigned short ErrorID;
	plcstring ErrorText[81];
} vfpLSFStatusType;

typedef struct vfpLSFInternalFBType
{	struct FileOpen FileOpen;
	struct FileReadEx FileReadEx;
	struct FileClose FileClose;
} vfpLSFInternalFBType;

#ifdef _BUR_USE_DECLARATION_IN_IEC
typedef struct vfpLSFLaserTrajectoryInfoType
{	float PowerSetpointPercent;
	unsigned short NumStateValues;
	unsigned long StateValue32Bit[1630];
} vfpLSFLaserTrajectoryInfoType;
#else
/* Data type vfpLSFLaserTrajectoryInfoType not declared. Data types with array elements whose starting indexes are not equal to zero cannot be used in ANSI C programs / libraries.*/
#endif

#ifdef _BUR_USE_DECLARATION_IN_IEC
typedef struct vfpLSFBufferElementType
{	unsigned short TrajectoryNumber;
	struct vfpLSFLaserTrajectoryInfoType LaserTrajectoryInfo[19];
	unsigned short ExitCode;
} vfpLSFBufferElementType;
#else
/* Data type vfpLSFBufferElementType not declared. Data types with array elements whose starting indexes are not equal to zero cannot be used in ANSI C programs / libraries.*/
#endif

#ifdef _BUR_USE_DECLARATION_IN_IEC
typedef struct vfpLSFParsedDataType
{	struct vfpLSFBufferElementType TrajectoryCircularBuffer[4];
	unsigned char FIFOCount;
	unsigned char FIFOHeadIndex;
	unsigned char FIFOTailIndex;
} vfpLSFParsedDataType;
#else
/* Data type vfpLSFParsedDataType not declared. Data types with array elements whose starting indexes are not equal to zero cannot be used in ANSI C programs / libraries.*/
#endif

typedef struct vfpLSFLocalType
{	enum vfpLSFStepsEnum Step;
	enum vfpLSFStepsEnum StepTrace[100];
	unsigned short index;
	struct vfpLSFInternalFBType FB;
	enum vfpLSFStepsEnum ErrorStep;
	plcstring DataBuffer[341001];
	unsigned long ReadLengthBytes;
	unsigned long TotalBytesRead;
	unsigned long StartingByteAddress;
	unsigned long MaxBytes;
	unsigned long NextByteAddress;
	unsigned long CurrentByteIndex;
	double ParameterValue;
	unsigned long ParameterValue_UDINT;
	plcstring ParameterValue_string[61];
	plcbit ParsedHeaderLine;
	plcbit FoundTrajectory;
	unsigned short Status;
	unsigned long BuildLayout;
	unsigned short PrintNumber;
	unsigned char RackNumber;
	unsigned long LayerNumber;
	plcbit LayerClosed;
	plcbit LayerAborted;
	unsigned short FinalTrajectoryNumber;
	unsigned short TrajectoryNumber;
	unsigned char LaserNumber;
	unsigned char LastLaserNumber;
	unsigned char LaserPowerValueIndex;
	unsigned short LaserStateValueIndex;
	unsigned short ExpectedNumEvents;
	unsigned long FileReadOffset;
	unsigned long LocalFileHandle;
	plcstring GCodeLineNumber_string[31];
	plcstring BuildLayout_string[21];
	plcstring PrintNumber_string[21];
	plcstring RackNumber_string[9];
	plcstring LayerNumber_string[9];
	plcstring LayerFileName[256];
	unsigned char HeaderElement;
	plcstring BuildName[81];
	plcstring BuildPlateFormat[41];
	unsigned short Temp_val;
	plcstring Temp_string[41];
} vfpLSFLocalType;

typedef struct vfpFEFCommandType
{	unsigned long SelectedBuildLayout;
	unsigned short SelectedPrintNumber;
	unsigned long SelectedLayer;
	unsigned short OptionalStartingTrajectory;
	plcbit OpenLayer;
	plcbit ParseTrajectory;
	plcbit CloseLayer;
	plcbit AbortLayer;
	plcbit ResetError;
} vfpFEFCommandType;

typedef struct vfpFEFStatusType
{	plcstring LayerFilename_GCode[256];
	plcstring LayerFilename_FixedEvents[256];
	plcbit LayerOpen;
	unsigned long CurrentLayer;
	unsigned short FinalTrajectoryNumber;
	unsigned short ParsedTrajectoryNumber;
	plcbit ParseTrajectoryComplete;
	plcbit LayerClosed;
	plcbit LayerAborted;
	plcbit Error;
	unsigned short ErrorID;
	plcstring ErrorText[81];
} vfpFEFStatusType;

typedef struct vfpFEFInternalFBType
{	struct FileOpen FileOpen;
	struct FileReadEx FileReadEx;
	struct FileClose FileClose;
} vfpFEFInternalFBType;

typedef struct vfpFEFBufferElementType
{	unsigned short TrajectoryNumber;
	unsigned short ExitCode;
	unsigned char MasterAxis;
	float StartPositionMM;
	float EndPositionMM;
	float EventPeriodMM;
} vfpFEFBufferElementType;

#ifdef _BUR_USE_DECLARATION_IN_IEC
typedef struct vfpFEFParsedDataType
{	struct vfpFEFBufferElementType TrajectoryCircularBuffer[100];
	unsigned char FIFOCount;
	unsigned char FIFOHeadIndex;
	unsigned char FIFOTailIndex;
} vfpFEFParsedDataType;
#else
/* Data type vfpFEFParsedDataType not declared. Data types with array elements whose starting indexes are not equal to zero cannot be used in ANSI C programs / libraries.*/
#endif

typedef struct vfpFEFLocalType
{	enum vfpFEFStepsEnum Step;
	enum vfpFEFStepsEnum StepTrace[100];
	unsigned short index;
	struct vfpFEFInternalFBType FB;
	enum vfpFEFStepsEnum ErrorStep;
	plcstring DataBuffer[201];
	unsigned long ReadLengthBytes;
	unsigned long TotalBytesRead;
	unsigned long StartingByteAddress;
	unsigned long MaxBytes;
	unsigned long NextByteAddress;
	unsigned long CurrentByteIndex;
	double ParameterValue;
	unsigned long ParameterValue_UDINT;
	plcstring ParameterValue_string[61];
	plcbit ParsedHeaderLine;
	plcbit FoundTrajectory;
	unsigned short Status;
	unsigned long BuildLayout;
	unsigned short PrintNumber;
	unsigned long LayerNumber;
	plcbit LayerClosed;
	plcbit LayerAborted;
	unsigned short FinalTrajectoryNumber;
	unsigned short TrajectoryNumber;
	unsigned long FileReadOffset;
	unsigned long LocalFileHandle;
	unsigned char MasterAxis;
	float StartPosition;
	float EndPosition;
	float EventPeriod;
	plcstring GCodeLineNumber_string[31];
	plcstring BuildLayout_string[21];
	plcstring PrintNumber_string[21];
	plcstring LayerNumber_string[9];
	plcstring LayerFileName_FixedEvents[256];
	plcstring LayerFileName_GCode[256];
	unsigned char HeaderElement;
	plcstring BuildName[81];
	plcstring BuildPlateFormat[41];
	unsigned short Temp_val;
	plcstring Temp_string[41];
} vfpFEFLocalType;

typedef struct VfSMRFileInternalFBType
{	struct FileCopy FileCopy1;
	struct FileCopy FileCopy2;
	struct FileCopy FileCopy3;
} VfSMRFileInternalFBType;

typedef struct VfSMRFileInternalType
{	enum VfSMRFileStepsEnum Step;
	enum VfSMRFileStepsEnum StepTrace[100];
	enum VfSMRFileStepsEnum ErrorStep;
	struct VfSMRFileInternalFBType FB;
	unsigned short index;
} VfSMRFileInternalType;

typedef struct VfSMRConnectInternalFBType
{	struct DevLink DevLinkRemote;
	struct DevLink DevLinkLocalSMR;
	struct DevLink DevLinkLocalPTR;
	struct DevLink DevLinkLocalLCR;
	struct DevUnlink DevUnlinkRemote;
	struct DevUnlink DevUnlinkLocalSMR;
	struct DevUnlink DevUnlinkLocalPTR;
	struct DevUnlink DevUnlinkLocalLCR;
} VfSMRConnectInternalFBType;

typedef struct VfSMRConnectInternalType
{	enum VfSMRConnectStepsEnum Step;
	enum VfSMRConnectStepsEnum StepTrace[100];
	enum VfSMRConnectStepsEnum ErrorStep;
	struct VfSMRConnectInternalFBType FB;
	unsigned long LocalFileHandle;
	unsigned short index;
} VfSMRConnectInternalType;

typedef struct VfLCRConnectInternalFBType
{	struct DevLink DevLinkLocalLCR;
	struct DevUnlink DevUnlinkLocalLCR;
} VfLCRConnectInternalFBType;

typedef struct VfLCRConnectInternalType
{	enum VfLCRConnectStepsEnum Step;
	enum VfLCRConnectStepsEnum StepTrace[100];
	enum VfLCRConnectStepsEnum ErrorStep;
	struct VfLCRConnectInternalFBType FB;
	plcstring LocalFileName[81];
	plcstring LocalLCRDriveName[81];
	unsigned long LocalFileHandle;
	unsigned short i;
} VfLCRConnectInternalType;

typedef struct VfSMRFileSetup
{
	/* VAR_INPUT (analog) */
	unsigned long pPEFName;
	unsigned long pFEFName;
	unsigned long pRemoteDriveName;
	unsigned long pLocalSMRDriveName;
	unsigned long pLocalPTRDriveName;
	unsigned long pLocalLCRDriveName;
	/* VAR_OUTPUT (analog) */
	unsigned short ErrorID;
	/* VAR (analog) */
	struct VfSMRFileInternalType Internal;
	/* VAR_INPUT (digital) */
	plcbit Execute;
	plcbit ErrorReset;
	/* VAR_OUTPUT (digital) */
	plcbit Done;
	plcbit Error;
} VfSMRFileSetup_typ;

typedef struct VfSMRConnect
{
	/* VAR_INPUT (analog) */
	unsigned long pRemoteDriveName;
	unsigned long pLocalSMRDriveName;
	unsigned long pLocalPTRDriveName;
	unsigned long pLocalLCRDriveName;
	unsigned long pRemoteDrive;
	unsigned long pLocalSMRDrive;
	unsigned long pLocalPTRDrive;
	unsigned long pLocalLCRDrive;
	/* VAR_OUTPUT (analog) */
	unsigned short ErrorID;
	unsigned long LocalSMRDriveHandle;
	unsigned long LocalPTRDriveHandle;
	unsigned long LocalLCRDriveHandle;
	unsigned long RemoteDriveHandle;
	/* VAR (analog) */
	struct VfSMRConnectInternalType Internal;
	/* VAR_INPUT (digital) */
	plcbit Execute;
	plcbit ErrorReset;
	/* VAR_OUTPUT (digital) */
	plcbit Done;
	plcbit Error;
} VfSMRConnect_typ;

typedef struct VfLCRConnect
{
	/* VAR_INPUT (analog) */
	unsigned long pLocalLCRDriveName;
	unsigned long pLocalLCRDrive;
	/* VAR_OUTPUT (analog) */
	unsigned short ErrorID;
	unsigned long LocalLCRDriveHandle;
	/* VAR (analog) */
	struct VfLCRConnectInternalType Internal;
	/* VAR_INPUT (digital) */
	plcbit Execute;
	plcbit ErrorReset;
	/* VAR_OUTPUT (digital) */
	plcbit Done;
	plcbit Error;
} VfLCRConnect_typ;

typedef struct VfParseLaserStateFile
{
	/* VAR_INPUT (analog) */
	struct vfpLSFParsedDataType* pParsedData;
	struct vfpLSFCommandType Command;
	/* VAR_OUTPUT (analog) */
	struct vfpLSFStatusType Status;
	/* VAR (analog) */
	struct vfpLSFLocalType local;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit Active;
} VfParseLaserStateFile_typ;

typedef struct VfParseFixedEventFile
{
	/* VAR_INPUT (analog) */
	struct vfpFEFParsedDataType* pParsedData;
	struct vfpFEFCommandType Command;
	/* VAR_OUTPUT (analog) */
	struct vfpFEFStatusType Status;
	/* VAR (analog) */
	struct vfpFEFLocalType local;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit Active;
} VfParseFixedEventFile_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void VfSMRFileSetup(struct VfSMRFileSetup* inst);
_BUR_PUBLIC void VfSMRConnect(struct VfSMRConnect* inst);
_BUR_PUBLIC void VfLCRConnect(struct VfLCRConnect* inst);
_BUR_PUBLIC void VfParseLaserStateFile(struct VfParseLaserStateFile* inst);
_BUR_PUBLIC void VfParseFixedEventFile(struct VfParseFixedEventFile* inst);
_BUR_PUBLIC unsigned short GetNextString(unsigned long pAdrData, unsigned long pParameter);
_BUR_PUBLIC unsigned short GetNextParameter(unsigned long pAdrData, unsigned long pParameter);
_BUR_PUBLIC unsigned short FindNextLineStart(unsigned long pAdrData, unsigned long MaxBytes);
_BUR_PUBLIC unsigned short FindNextTrajectoryStart(unsigned long pAdrData, unsigned long MaxBytes);
_BUR_PUBLIC plcbit GetSystemErrorText(unsigned short ErrorID, plcstring** ErrorText);


#ifdef __cplusplus
};
#endif
#endif /* _VF_PARSER_ */

