/* Automation Studio generated header file */
/* Do not edit ! */
/* errorAPI  */

#ifndef _ERRORAPI_
#define _ERRORAPI_
#ifdef __cplusplus
extern "C" 
{
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
#ifdef _SG3
		#include "AsBrStr.h"
		#include "MpAlarmX.h"
#endif
#ifdef _SG4
		#include "AsBrStr.h"
		#include "MpAlarmX.h"
#endif
#ifdef _SGC
		#include "AsBrStr.h"
		#include "MpAlarmX.h"
#endif


/* Constants */
#ifdef _REPLACE_CONST
 #define ERRWRAP_NUM_ERRORS 50U
 #define ERRWRAP_MAI_ERRORS 49U
 #define ERRWRAP_NUM_ERRORS_DISP 30U
 #define ERRWRAP_MAI_ERRORS_DISP 29U
#else
 _GLOBAL_CONST unsigned char ERRWRAP_NUM_ERRORS;
 _GLOBAL_CONST unsigned char ERRWRAP_MAI_ERRORS;
 _GLOBAL_CONST unsigned char ERRWRAP_NUM_ERRORS_DISP;
 _GLOBAL_CONST unsigned char ERRWRAP_MAI_ERRORS_DISP;
#endif




/* Datatypes and datatypes of function blocks */
typedef enum alarmX_ST_enum
{	ALARMX_IDLE_ST,
	ALARMX_EXPORT_HISTORY_ST,
	ALARMX_RESET_FUBS_ST,
	ALARMX_ACK_ALL_ST,
	ALARMX_RESET_ALARMS_ST
} alarmX_ST_enum;

typedef struct errWrapInCmd_typ
{	plcbit acknowledgeError;
	plcbit acknowledgeAllAlarms;
	plcbit exportHistory;
} errWrapInCmd_typ;

typedef struct errWrapInPar_typ
{	struct MpComIdentType* coreMpLink;
	struct MpComIdentType* histMpLink;
	struct MpAlarmXHistoryUISetupType uiHistSetup;
	struct MpAlarmXListUISetupType uiCoreSetup;
} errWrapInPar_typ;

typedef struct errWrapInCfg_typ
{	unsigned long logSeverity;
	unsigned long errorSeverity;
} errWrapInCfg_typ;

typedef struct errWrapIn_typ
{	struct errWrapInCmd_typ cmd;
	struct errWrapInPar_typ par;
	struct errWrapInCfg_typ cfg;
} errWrapIn_typ;

typedef struct errWrapAlarmOut_typ
{	plcstring scope[256];
	plcstring name[256];
	plcstring message[256];
	plcstring additionalInfo[256];
	unsigned long code;
	unsigned long instance;
	unsigned long severity;
	plcstring timeStamp[51];
	plcstring codeString[8];
} errWrapAlarmOut_typ;

typedef struct errWrapOut_typ
{	unsigned short activeAlarms;
	plcbit error;
	unsigned short errorID;
	plcstring errorString[321];
	struct errWrapAlarmOut_typ activeAlarmInfo[30];
	plcbit alarmPresent;
	plcwstring wStrMessage[30][256];
	plcwstring wStrAdditionalInfo[30][256];
} errWrapOut_typ;

typedef struct errWrapInternalAlarm_typ
{	plcstring name[81];
	plcbit active;
	plcbit set;
	unsigned long id;
	struct MpAlarmXConfigAlarm configure;
	struct MpAlarmXAlarmConfigType behavoir;
	unsigned long acknowledge;
	plcdt timeStamp;
} errWrapInternalAlarm_typ;

typedef struct errWrapInternal_typ
{	struct errWrapInternalAlarm_typ userAlarms[50];
	unsigned short activeAlarms;
	plcbit initialized;
	unsigned long id;
	struct MpComIdentType* coreMpLink;
	struct MpComIdentType histMpLink;
	plcbit exportHistory;
	plcbit resetErrors;
	struct MpAlarmXCore* mpAlarmX;
	struct MpAlarmXHistory mpAlarmXHistory;
	struct MpAlarmXListUI mpAlarmXListUI;
	struct MpAlarmXHistoryUI mpAlarmXHistoryUI;
	unsigned char resetErrorCounter;
	unsigned char resetCounter;
	struct MpAlarmXHistoryUIConnectType uiHistConnect;
	struct MpAlarmXListUIConnectType uiCoreConnect;
	struct MpAlarmXAcknowledgeAll mpAcknowledgeAll;
	unsigned short previousActiveCount;
	unsigned char alarmListLoopIndex;
	unsigned char alarmListActiveCount;
	plcstring _previousAlarmMessage[256];
	plcstring _previousAlarmMessageList[30][256];
	unsigned char _previousAlarmListActiveCount;
	unsigned char _previousWrapperAlarmActiveCount;
} errWrapInternal_typ;

typedef struct errWrap_typ
{	struct errWrapIn_typ in;
	struct errWrapOut_typ out;
	struct errWrapInternal_typ internal;
} errWrap_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC unsigned char errorWrapCyclic(struct errWrap_typ* inst);
_BUR_PUBLIC unsigned long errorWrapAck(unsigned long id, struct errWrap_typ* alarmCollector);
_BUR_PUBLIC unsigned long errorWrapSet(unsigned long source, unsigned long string, unsigned long errorId, unsigned long acknowledge, struct errWrap_typ* alarmCollector);


#ifdef __cplusplus
};
#endif
#endif /* _ERRORAPI_ */

