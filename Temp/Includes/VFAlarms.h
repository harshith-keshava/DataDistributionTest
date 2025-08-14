/* Automation Studio generated header file */
/* Do not edit ! */
/* VFAlarms 0.01.0 */

#ifndef _VFALARMS_
#define _VFALARMS_
#ifdef __cplusplus
extern "C" 
{
#endif
#ifndef _VFAlarms_VERSION
#define _VFAlarms_VERSION 0.01.0
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
#ifdef _SG3
		#include "AsBrStr.h"
		#include "AsXml.h"
		#include "MpAlarmX.h"
		#include "MpCom.h"
		#include "fiowrap.h"
#endif
#ifdef _SG4
		#include "AsBrStr.h"
		#include "AsXml.h"
		#include "MpAlarmX.h"
		#include "MpCom.h"
		#include "fiowrap.h"
#endif
#ifdef _SGC
		#include "AsBrStr.h"
		#include "AsXml.h"
		#include "MpAlarmX.h"
		#include "MpCom.h"
		#include "fiowrap.h"
#endif


/* Constants */
#ifdef _REPLACE_CONST
 #define vfALARMS_MAX_NAME_LEN 80U
 #define vfALARMS_MAX_REACTION_LEN 80U
 #define vfALARMS_MAX_BEHAVIOR_LEN 80U
 #define vfALARMS_MAX_SNIPPET_KEY_LEN 80U
 #define vfALARMS_MAX_SNIPPET_PV_NAME_LEN 80U
 #define vfALARMS_MAX_SNIPPET_STR_LENGTH 255U
 #define vfALARMS_MAX_ALARMS 100U
 #define vfALARMS_MAI_ALARMS 99U
 #define vfALARMS_MAX_SNIPPETS 100U
 #define vfALARMS_MAI_SNIPPETS 99U
 #define vfALARMS_MAX_MAPPINGS 100U
 #define vfALARMS_MAI_MAPPINGS 99U
 #define vfALARMS_MAX_REACTIONS 6U
 #define vfALARMS_MAI_REACTIONS 5U
 #define vfALARMS_MAX_BUFFER_LEN 1500000U
 #define vfALARMS_MAI_BUFFER 1499999U
 #define LOGBOOK_MAI_MAPPINGS 200U
#else
 _GLOBAL_CONST unsigned short vfALARMS_MAX_NAME_LEN;
 _GLOBAL_CONST unsigned short vfALARMS_MAX_REACTION_LEN;
 _GLOBAL_CONST unsigned short vfALARMS_MAX_BEHAVIOR_LEN;
 _GLOBAL_CONST unsigned short vfALARMS_MAX_SNIPPET_KEY_LEN;
 _GLOBAL_CONST unsigned short vfALARMS_MAX_SNIPPET_PV_NAME_LEN;
 _GLOBAL_CONST unsigned short vfALARMS_MAX_SNIPPET_STR_LENGTH;
 _GLOBAL_CONST unsigned short vfALARMS_MAX_ALARMS;
 _GLOBAL_CONST unsigned short vfALARMS_MAI_ALARMS;
 _GLOBAL_CONST unsigned short vfALARMS_MAX_SNIPPETS;
 _GLOBAL_CONST unsigned short vfALARMS_MAI_SNIPPETS;
 _GLOBAL_CONST unsigned short vfALARMS_MAX_MAPPINGS;
 _GLOBAL_CONST unsigned short vfALARMS_MAI_MAPPINGS;
 _GLOBAL_CONST unsigned short vfALARMS_MAX_REACTIONS;
 _GLOBAL_CONST unsigned short vfALARMS_MAI_REACTIONS;
 _GLOBAL_CONST unsigned long vfALARMS_MAX_BUFFER_LEN;
 _GLOBAL_CONST unsigned long vfALARMS_MAI_BUFFER;
 _GLOBAL_CONST unsigned short LOGBOOK_MAI_MAPPINGS;
#endif




/* Datatypes and datatypes of function blocks */
typedef enum vfALARMS_MAPPING_enum
{	vfALARMS_MAPPING_REMAIN,
	vfALARMS_MAPPING_AGGREGATE,
	vfALARMS_MAPPING_ESCALATE
} vfALARMS_MAPPING_enum;

typedef enum vfALARMS_BEHAVIOR_enum
{	vfALARMS_BEHAVIOR_PERSISTENT,
	vfALARMS_BEHAVIOR_EDGE
} vfALARMS_BEHAVIOR_enum;

typedef enum vfALARMS_SEVERITY_enum
{	vfALARMS_SEVERITY_NONE = 0,
	vfALARMS_SEVERITY_INFO = 1,
	vfALARMS_SEVERITY_WARNING = 2,
	vfALARMS_SEVERITY_ALARM = 3,
	vfALARMS_SEVERITY_CRITICAL = 4
} vfALARMS_SEVERITY_enum;

typedef enum vfALARMS_XML_TYPE_enum
{	vfALARMS_XML_TYPE_START_WRITE,
	vfALARMS_XML_TYPE_START_DOC,
	vfALARMS_XML_TYPE_START_ELEM,
	vfALARMS_XML_TYPE_ATTRIBUTE,
	vfALARMS_XML_TYPE_END_ELEM,
	vfALARMS_XML_TYPE_END_DOC,
	vfALARMS_XML_TYPE_GET_MEM,
	vfALARMS_XML_TYPE_END_WRITE
} vfALARMS_XML_TYPE_enum;

typedef enum vfALARMS_FILE_CMD_enum
{	vfALARMS_FILE_CMD_DELETE,
	vfALARMS_FILE_CMD_SAVE
} vfALARMS_FILE_CMD_enum;

typedef struct vfAlarms_Data_In_typ
{	unsigned long mpLink;
	plcstring deviceName[81];
	plcstring scope[81];
	plcstring mpLinkName[81];
	plcstring snippetPvName[81];
	plcbit escalateAll;
} vfAlarms_Data_In_typ;

typedef struct vfAlarms_Data_Out_typ
{	plcbit done;
	plcbit error;
	signed long errorId;
	plcstring errorString[81];
} vfAlarms_Data_Out_typ;

typedef struct vfAlarms_Data_Internal_Fub_typ
{	struct MpComConfigManager manageConfiguration;
	struct xmlCreateMemoryWriter xmlCreateMemoryWriter;
	struct xmlWriteStartDocument xmlWriteStartDocument;
	struct xmlWriteStartElement xmlWriteStartElement;
	struct xmlWriteAttribute xmlWriteAttribute;
	struct xmlWriteEndElement xmlWriteEndElement;
	struct xmlWriteEndDocument xmlWriteEndDocument;
	struct xmlGetMemoryInfo xmlGetMemoryInfo;
	struct xmlCloseMemoryWriter xmlCloseMemoryWriter;
	struct FIOWrap_typ fioWrapper;
} vfAlarms_Data_Internal_Fub_typ;

typedef struct vfAlarms_DefaultMapping_typ
{	enum vfALARMS_MAPPING_enum type;
	plcstring alarmName[81];
} vfAlarms_DefaultMapping_typ;

typedef struct vfAlarms_Item_typ
{	plcstring name[81];
	plcstring scope[81];
	plcstring textScope[81];
	unsigned long code;
	enum vfALARMS_SEVERITY_enum severity;
	enum vfALARMS_BEHAVIOR_enum behavior;
} vfAlarms_Item_typ;

typedef struct vfAlarms_Snippet_typ
{	plcstring key[81];
	plcstring pvName[81];
} vfAlarms_Snippet_typ;

typedef struct vfAlarms_ReactionByName_typ
{	plcstring name[81];
	plcstring reactionName[6][81];
} vfAlarms_ReactionByName_typ;

typedef struct vfAlarms_ReactionBySeverity_typ
{	enum vfALARMS_SEVERITY_enum severity;
	plcstring reactionName[6][81];
} vfAlarms_ReactionBySeverity_typ;

typedef struct vfAlarms_Reactions_typ
{	struct vfAlarms_ReactionByName_typ byNameNotEscalated[100];
	struct vfAlarms_ReactionByName_typ byName[100];
	struct vfAlarms_ReactionBySeverity_typ bySeverity[100];
} vfAlarms_Reactions_typ;

typedef struct vfAlarms_AggByName_typ
{	plcstring name[81];
	plcstring aggregationName[81];
} vfAlarms_AggByName_typ;

typedef struct vfAlarms_AggBySeverity_typ
{	enum vfALARMS_SEVERITY_enum severity;
	plcstring aggregationName[81];
} vfAlarms_AggBySeverity_typ;

typedef struct vfAlarms_Aggregations_typ
{	struct vfAlarms_AggByName_typ byName[100];
	struct vfAlarms_AggBySeverity_typ bySeverity[100];
} vfAlarms_Aggregations_typ;

typedef struct vfAlarms_Data_Internal_typ
{	struct vfAlarms_Data_Internal_Fub_typ fub;
	struct vfAlarms_DefaultMapping_typ defaultMapping;
	struct vfAlarms_Item_typ alarms[100];
	struct vfAlarms_Snippet_typ snippets[100];
	struct vfAlarms_Reactions_typ reactions;
	struct vfAlarms_Aggregations_typ aggregations;
	plcstring fileName[81];
	unsigned long xmlIdent;
	unsigned long pXmlData;
	unsigned long szXmlData;
} vfAlarms_Data_Internal_typ;

typedef struct vfAlarms_Data_typ
{	struct vfAlarms_Data_In_typ in;
	struct vfAlarms_Data_Out_typ out;
	struct vfAlarms_Data_Internal_typ internal;
} vfAlarms_Data_typ;

typedef struct vfAlarms_Component_typ
{	struct MpComIdentType link;
	struct MpAlarmXCore core;
	plcbit noDisplay;
	plcstring name[81];
} vfAlarms_Component_typ;

typedef struct vfAlarms_Instance_type
{	plcstring _[81];
	unsigned long id;
	plcstring snippet[256];
} vfAlarms_Instance_type;

typedef struct Log_Origin_Mappings_typ
{	plcstring originFormatted[201][33];
	plcstring originRaw[201][33];
} Log_Origin_Mappings_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC plcbit vfAddSnippet(plcstring* key, plcstring* pvName, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAddAggregationBySeverity(enum vfALARMS_SEVERITY_enum severity, plcstring* aggregationName, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAddAggregationByName(plcstring* name, plcstring* aggregationName, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAddReactionBySeverity(enum vfALARMS_SEVERITY_enum severity, plcstring* reactionName1, plcstring* reactionName2, plcstring* reactionName3, plcstring* reactionName4, plcstring* reactionName5, plcstring* reactionName6, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAddReactionByName(plcstring* name, plcstring* reactionName1, plcstring* reactionName2, plcstring* reactionName3, plcstring* reactionName4, plcstring* reactionName5, plcstring* reactionName6, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAddNonEscalatedReactionByName(plcstring* name, plcstring* reactionName1, plcstring* reactionName2, plcstring* reactionName3, plcstring* reactionName4, plcstring* reactionName5, plcstring* reactionName6, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfSetDefaultMapping(enum vfALARMS_MAPPING_enum type, plcstring* alarmName, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAddAlarm(plcstring* name, plcstring* scope, unsigned long code, enum vfALARMS_SEVERITY_enum severity, enum vfALARMS_BEHAVIOR_enum behavior, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAddAlarmTextScope(plcstring* name, plcstring* scope, plcstring* textScope, unsigned long code, enum vfALARMS_SEVERITY_enum severity, enum vfALARMS_BEHAVIOR_enum behavior, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfCreateAlarmsFaster(struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAddLogOriginMapping(plcstring* originRaw, plcstring* originFormatted, struct Log_Origin_Mappings_typ* map);
_BUR_PUBLIC plcbit vfLookupOrigin(unsigned long pOriginRaw, unsigned long pOriginFormatted, struct Log_Origin_Mappings_typ* map);
_BUR_PUBLIC plcbit vfSetDefaultMappingApi(enum vfALARMS_MAPPING_enum type, struct vfAlarms_Instance_type* alarmName, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAddAlarmApi(struct vfAlarms_Instance_type* name, plcstring* scope, unsigned long code, enum vfALARMS_SEVERITY_enum severity, enum vfALARMS_BEHAVIOR_enum behavior, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAddAlarmTextScopeApi(struct vfAlarms_Instance_type* name, plcstring* scope, plcstring* textScope, unsigned long code, enum vfALARMS_SEVERITY_enum severity, enum vfALARMS_BEHAVIOR_enum behavior, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAddAggregationByNameApi(plcstring* name, struct vfAlarms_Instance_type* aggregationName, struct vfAlarms_Data_typ* data);
_BUR_PUBLIC plcbit vfAlarmPersistent(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm, plcbit AlarmConditionActive);
_BUR_PUBLIC plcbit vfAlarmPersistentId(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm, plcbit AlarmConditionActive, unsigned long* id);
_BUR_PUBLIC plcbit vfAlarmPersistentSnippetId(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm, plcbit AlarmConditionActive, plcstring* snippet, unsigned long* id);
_BUR_PUBLIC plcbit vfAlarmPersistentSnippet(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm, plcbit AlarmConditionActive, plcstring* snippet);
_BUR_PUBLIC plcbit vfAlarmEdge(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm);
_BUR_PUBLIC plcbit vfAlarmEdgeSnippet(struct vfAlarms_Component_typ* alarmComponent, struct vfAlarms_Instance_type* alarm, plcstring* snippet);


#ifdef __cplusplus
};
#endif
#endif /* _VFALARMS_ */

