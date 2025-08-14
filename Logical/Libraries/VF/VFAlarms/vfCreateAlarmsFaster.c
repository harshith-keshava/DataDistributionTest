
#include <bur/plctypes.h>
#ifdef __cplusplus
	extern "C"
	{
#endif
	#include "VFAlarms.h"
#ifdef __cplusplus
	};
#endif

plcbit vfCreateAlarmsFaster(struct vfAlarms_Data_typ* data)
{
	// Error check inputs.
	if (!data) return 0;
	if (!data->in.mpLink) return 0;
	
	// Create the XML structure. 
	buildXml(data, vfALARMS_XML_TYPE_START_WRITE);
	buildXml(data, vfALARMS_XML_TYPE_START_DOC);
	
	addXmlElement(data, "Configuration", 0);
		addXmlElement(data, "Version", 1, "ID", "1");
		closeXmlElement(data);
		addXmlElement(data, "Element", 1, "ID", data->in.mpLinkName);
			addXmlElement(data, "Group", 1, "ID", "mapp.AlarmX.Core");
				addXmlElement(data, "Group", 1, "ID", "Mapping");
					addMappingsByName(data);
				closeXmlElement(data);
				addXmlElement(data, "Group", 1, "ID", "BySeverity");
					addMappingsBySeverity(data);
				closeXmlElement(data);
				addXmlElement(data, "Group", 1, "ID", "Default");
					addDefaultMapping(data);
				closeXmlElement(data);
			closeXmlElement(data);
			// All user alarms get added here. 
			addXmlElement(data, "Group", 1, "ID", "mapp.AlarmX.Core.Configuration");
				addAlarms(data);
			closeXmlElement(data);
			addXmlElement(data, "Group", 1, "ID", "mapp.AlarmX.Core.Categories");
				addCategories(data);
			closeXmlElement(data);
			addXmlElementFull(data, "Group", 1, "ID", "mapp.AlarmX.Core.Queries");
			addXmlElement(data, "Group", 1, "ID", "mapp.AlarmX.Core.Retain");
				addXmlElementFull(data, "Property", 3, "ID", "MemorySize", "DataType", "UDINT", "Value", "5");
				addXmlElementFull(data, "Property", 3, "ID", "MemoryType", "DataType", "DINT", "Value", "1");
			closeXmlElement(data);
			// All user defined snippets get added here. 
			addXmlElement(data, "Group", 1, "ID", "mapp.AlarmX.Core.Snippets");
				addXmlElementFull(data, "Group", 1, "ID", "AutoDetect");
				addSnippets(data);
			closeXmlElement(data);
		closeXmlElement(data);
	closeXmlElement(data);

	buildXml(data, vfALARMS_XML_TYPE_END_DOC);
	buildXml(data, vfALARMS_XML_TYPE_GET_MEM);
	
	// Write the XML data to file.
	strcpy(data->internal.fileName, "config_");
	strcat(data->internal.fileName, data->in.scope);
	strcat(data->internal.fileName, ".xml");
	handleXmlFile(data, vfALARMS_FILE_CMD_DELETE);
	handleXmlFile(data, vfALARMS_FILE_CMD_SAVE);
	
	// Create the Mapp configuration object on the target based on the XML file. 
	createMappConfig(data);	
	
	// Close the XML writer (which wipes out our data buffer). 
	buildXml(data, vfALARMS_XML_TYPE_END_WRITE);
	
	data->out.done = !data->out.error;

}

void addDefaultMapping(struct vfAlarms_Data_typ* data) {

	switch(data->internal.defaultMapping.type) {
		case vfALARMS_MAPPING_REMAIN:
			addXmlElement(data, "Group", 1, "ID", "[0]");
				addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "Remain");
			closeXmlElement(data);
			break;
			
		case vfALARMS_MAPPING_AGGREGATE:
			addXmlElement(data, "Group", 1, "ID", "[0]");
				addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "Aggregate");
				addXmlElementFull(data, "Property", 3, "ID", "Name", "DataType", "STRING", "Value", data->internal.defaultMapping.alarmName);
			closeXmlElement(data);
			break;	
		
		case vfALARMS_MAPPING_ESCALATE:
			addXmlElement(data, "Group", 1, "ID", "[0]");
				addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "Escalate Alarm");
			closeXmlElement(data);
			break;
	}
}

void addMappingsByName(struct vfAlarms_Data_typ* data) {

	int i = 0;
	int j = 0;
	STRING * tempString[80];
	STRING * index[10];
	int storedIndex = 0;

	// Loop through all reaction mappings by name.
	for (i = 0; i < vfALARMS_MAX_MAPPINGS; i++) {
		
		
		if (strcmp(data->internal.reactions.byName[i].name, "")) {
		
			// Create the dynamic index.
			brsitoa(storedIndex, tempString);
			strcpy(index, "[");
			strcat(index, tempString);
			strcat(index, "]");
			
			addXmlElement(data, "Group", 1, "ID", index);
			addXmlElementFull(data, "Property", 3, "ID", "Alarm", "DataType", "STRING", "Value", data->internal.reactions.byName[i].name);
			for (j = 0; j <= vfALARMS_MAI_REACTIONS; j++) {
				if (strcmp(data->internal.reactions.byName[i].reactionName[j], "")) {
					brsitoa(j, tempString);
					strcpy(index, "[");
					strcat(index, tempString);
					strcat(index, "]");
					addXmlElement(data, "Group", 1, "ID", index);
					//	addXmlElementFull(data, "Property", 3, "ID", "Name", "DataType", "STRING", "Value", data->internal.reactions.byName[i].reactionName[j]);
					//	addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "Reaction");
					
					//Modified by Paul to Escalate Reactions
					addXmlElementFull(data, "Property", 3, "ID", "Reaction", "DataType", "STRING", "Value", data->internal.reactions.byName[i].reactionName[j]);
					addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "EscalateReaction");
					
					closeXmlElement(data);
				}
			}
			closeXmlElement(data);
			storedIndex++;
		}
		
		if (strcmp(data->internal.reactions.byNameNotEscalated[i].name, "")) {		
			// Create the dynamic index.
			brsitoa(storedIndex, tempString);
			strcpy(index, "[");
			strcat(index, tempString);
			strcat(index, "]");
			
			addXmlElement(data, "Group", 1, "ID", index);
			addXmlElementFull(data, "Property", 3, "ID", "Alarm", "DataType", "STRING", "Value", data->internal.reactions.byNameNotEscalated[i].name);
			for (j = 0; j <= vfALARMS_MAI_REACTIONS; j++) {
				if (strcmp(data->internal.reactions.byNameNotEscalated[i].reactionName[j], "")) {
					brsitoa(j, tempString);
					strcpy(index, "[");
					strcat(index, tempString);
					strcat(index, "]");
					addXmlElement(data, "Group", 1, "ID", index);
						addXmlElementFull(data, "Property", 3, "ID", "Name", "DataType", "STRING", "Value", data->internal.reactions.byNameNotEscalated[i].reactionName[j]);
						addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "Reaction");
					
					//Modified by Paul to Escalate Reactions
					//	addXmlElementFull(data, "Property", 3, "ID", "Reaction", "DataType", "STRING", "Value", data->internal.reactions.byName[i].reactionName[j]);
					//	addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "EscalateReaction");
					
					closeXmlElement(data);
				}
			}
			closeXmlElement(data);
			storedIndex++;			
		}
	}
	
	// Loop through all aggregation mappings by name. 
	for (i = 0; i < vfALARMS_MAX_MAPPINGS; i++) {
		if (strcmp(data->internal.aggregations.byName[i].name, "")) {
			// Create the dynamic index.
			brsitoa(storedIndex, tempString);
			strcpy(index, "[");
			strcat(index, tempString);
			strcat(index, "]");
			
			addXmlElement(data, "Group", 1, "ID", index);
				addXmlElementFull(data, "Property", 3, "ID", "Alarm", "DataType", "STRING", "Value", data->internal.aggregations.byName[i].name);
				addXmlElement(data, "Group", 1, "ID", "[0]");					
					addXmlElementFull(data, "Property", 3, "ID", "Name", "DataType", "STRING", "Value", data->internal.aggregations.byName[i].aggregationName);
					addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "Aggregate");	
				closeXmlElement(data);
			closeXmlElement(data);
			storedIndex++;
		}
	}
	
	if( data->in.escalateAll ){
		// Create the dynamic index.
		brsitoa(storedIndex, tempString);
		strcpy(index, "[");
		strcat(index, tempString);
		strcat(index, "]");
			
		addXmlElement(data, "Group", 1, "ID", index);
			addXmlElementFull(data, "Property", 3, "ID", "Alarm", "DataType", "STRING", "Value", "*");
			addXmlElement(data, "Group", 1, "ID", "[0]");					
				addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "Escalate");	
			closeXmlElement(data);
		closeXmlElement(data);
		storedIndex++;
	}	
}

void addMappingsBySeverity(struct vfAlarms_Data_typ* data) {

	int i = 0;
	int j = 0;
	STRING * tempString[80];
	STRING * index[10];
	STRING * severity[80];
	int storedIndex = 0;

	// Loop through all reaction mappings by severity. 
	for (i = 0; i < vfALARMS_MAX_MAPPINGS; i++) {
		if (data->internal.reactions.bySeverity[i].severity != vfALARMS_SEVERITY_NONE) {
			storedIndex = i;
		
			// Create the dynamic index.
			brsitoa(i, tempString);
			strcpy(index, "[");
			strcat(index, tempString);
			strcat(index, "]");
			
			// Create the 'severity' string field. 
			brsitoa(data->internal.reactions.bySeverity[i].severity, severity);
			
			addXmlElement(data, "Group", 1, "ID", index);
				addXmlElementFull(data, "Property", 3, "ID", "Severity", "DataType", "STRING", "Value", severity);
				for (j = 0; j <= vfALARMS_MAI_REACTIONS; j++) {
					if (strcmp(data->internal.reactions.bySeverity[i].reactionName[j], "")) {			
						brsitoa(j, tempString);
						strcpy(index, "[");
						strcat(index, tempString);
						strcat(index, "]");
						addXmlElement(data, "Group", 1, "ID", index);
							addXmlElementFull(data, "Property", 3, "ID", "Name", "DataType", "STRING", "Value", data->internal.reactions.bySeverity[i].reactionName[j]);
							addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "Reaction");
					
						closeXmlElement(data);
					}
				}
			closeXmlElement(data);
		}
	}
	
	// Loop through all aggregation mappings by severity
	for (i = 0; i < vfALARMS_MAX_MAPPINGS; i++) {
		if (data->internal.aggregations.bySeverity[i].severity != vfALARMS_SEVERITY_NONE) {
		
			// Create the dynamic index.
			brsitoa(i+storedIndex, tempString);
			strcpy(index, "[");
			strcat(index, tempString);
			strcat(index, "]");
			
			// Create the 'severity' string field. 
			brsitoa(data->internal.aggregations.bySeverity[i].severity, severity);
			
			addXmlElement(data, "Group", 1, "ID", index);
				addXmlElementFull(data, "Property", 3, "ID", "Severity", "DataType", "STRING", "Value", severity);
				addXmlElement(data, "Group", 1, "ID", "[0]");					
					addXmlElementFull(data, "Property", 3, "ID", "Name", "DataType", "STRING", "Value", data->internal.aggregations.bySeverity[i].aggregationName);
					addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "Aggregate");
				closeXmlElement(data);
			closeXmlElement(data);
		}
	}
}

void addAlarms(struct vfAlarms_Data_typ* data) {

	int i = 0;
	STRING * tempString[80];
	STRING * index[10];
	STRING * severity[80];
	STRING * code[80];
	STRING * message[255];
	STRING * additionalInfo1[255];
	STRING * additionalInfo2[255];
	for (i = 0; i < vfALARMS_MAX_ALARMS; i++) {
		if (strcmp(data->internal.alarms[i].name, "")) {
		
			// Create the dynamic index.
			brsitoa(i, tempString);
			strcpy(index, "[");
			strcat(index, tempString);
			strcat(index, "]");
			
			// Create the 'severity' string field. 
			brsitoa(data->internal.alarms[i].severity, severity);
			
			// Create the 'code' string field. 
			brsitoa(data->internal.alarms[i].code, code);
			
			// Create the 'message' string field.	
			strcpy(message, "{$IAT/");
			strcat(message, data->internal.alarms[i].textScope);
			strcat(message, "/");
			strcat(message, data->internal.alarms[i].name);
			strcat(message, ".Message}");
			
			// Create the 'additionalInfo' string field.	
			strcpy(additionalInfo1, "{$IAT/");
			strcat(additionalInfo1, data->internal.alarms[i].textScope);
			strcat(additionalInfo1, "/");
			strcat(additionalInfo1, data->internal.alarms[i].name);
			strcat(additionalInfo1, ".AdditionalInfo}");
			
			// Create the 'additionalInfo2' string field. 
			// This is being used to store the scope of the alarm, actually. 
			strcpy(additionalInfo2, data->internal.alarms[i].scope);
			
			addXmlElement(data, "Group", 1, "ID", index);
				addXmlElementFull(data, "Property", 3, "ID", "Name", "DataType", "STRING", "Value", data->internal.alarms[i].name);
				addXmlElementFull(data, "Property", 3, "ID", "Message", "DataType", "STRING", "Value", message);
				addXmlElementFull(data, "Property", 3, "ID", "Code", "DataType", "UDINT", "Value", code);
				addXmlElementFull(data, "Property", 3, "ID", "Severity", "DataType", "UDINT", "Value", severity);			
				addXmlElementFull(data, "Property", 3, "ID", "AdditionalInformation1", "DataType", "STRING", "Value", additionalInfo1);
				addXmlElementFull(data, "Property", 3, "ID", "AdditionalInformation2", "DataType", "STRING", "Value", additionalInfo2);
				addXmlElementFull(data, "Property", 3, "ID", "Disable", "DataType", "BOOL", "Value", "false");
				addXmlElement(data, "Group", 1, "ID", "Behavior");
					addAlarmBehavior(data, i);
				closeXmlElement(data);
			closeXmlElement(data);
		
		}		
	}
}

void addCategories(struct vfAlarms_Data_typ* data) {

	addXmlElement(data, "Group", 1, "ID", "[0]");
		addXmlElementFull(data, "Property", 3, "ID", "Name", "DataType", "STRING", "Value", "Information");
		addXmlElement(data, "Group", 1, "ID", "SourceProperty");
			addXmlElementFull(data, "Property", 3, "ID", "Severity", "DataType", "STRING", "Value", "1");
		closeXmlElement(data);
	closeXmlElement(data);
	addXmlElement(data, "Group", 1, "ID", "[1]");
		addXmlElementFull(data, "Property", 3, "ID", "Name", "DataType", "STRING", "Value", "Warning");
		addXmlElement(data, "Group", 1, "ID", "SourceProperty");
			addXmlElementFull(data, "Property", 3, "ID", "Severity", "DataType", "STRING", "Value", "2");
		closeXmlElement(data);
	closeXmlElement(data);
	addXmlElement(data, "Group", 1, "ID", "[2]");
		addXmlElementFull(data, "Property", 3, "ID", "Name", "DataType", "STRING", "Value", "Alarm");
		addXmlElement(data, "Group", 1, "ID", "SourceProperty");
			addXmlElementFull(data, "Property", 3, "ID", "Severity", "DataType", "STRING", "Value", "3");
		closeXmlElement(data);
	closeXmlElement(data);
	addXmlElement(data, "Group", 1, "ID", "[3]");
		addXmlElementFull(data, "Property", 3, "ID", "Name", "DataType", "STRING", "Value", "Critical");
		addXmlElement(data, "Group", 1, "ID", "SourceProperty");
			addXmlElementFull(data, "Property", 3, "ID", "Severity", "DataType", "STRING", "Value", "4");
		closeXmlElement(data);
	closeXmlElement(data);
	
}

void addAlarmBehavior(struct vfAlarms_Data_typ* data, UINT i) {

	switch(data->internal.alarms[i].behavior) {
		case vfALARMS_BEHAVIOR_EDGE:
			addXmlElementFull(data, "Property", 3, "ID", "Acknowledge", "DataType", "DINT", "Value", "1");
			addXmlElementFull(data, "Property", 3, "ID", "AutoReset", "DataType", "BOOL", "Value", "true");
			addXmlElementFull(data, "Property", 3, "ID", "MultipleInstances", "DataType", "BOOL", "Value", "true");
			addXmlElementFull(data, "Property", 3, "ID", "ReactionUntilAcknowledged", "DataType", "BOOL", "Value", "true");
			addXmlElementFull(data, "Property", 3, "ID", "Retain", "DataType", "BOOL", "Value", "false");
			addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "EdgeAlarm");
			addXmlElement(data, "Group", 1, "ID", "DataUpdate");
				addXmlElement(data, "Group", 1, "ID", "Activation");
					addXmlElementFull(data, "Property", 3, "ID", "Snippets", "DataType", "BOOL", "Value", "false");
					addXmlElementFull(data, "Property", 3, "ID", "TimeStamp", "DataType", "BOOL", "Value", "false");
				closeXmlElement(data);
			closeXmlElement(data);
			addXmlElement(data, "Group", 1, "ID", "Recording");
				addXmlElementFull(data, "Property", 3, "ID", "AcknowledgedToUnacknowledged", "DataType", "BOOL", "Value", "false");
				addXmlElementFull(data, "Property", 3, "ID", "ActiveToInactive", "DataType", "BOOL", "Value", "false");
				addXmlElementFull(data, "Property", 3, "ID", "InactiveToActive", "DataType", "BOOL", "Value", "true");
				addXmlElementFull(data, "Property", 3, "ID", "UnacknowledgedToAcknowledged", "DataType", "BOOL", "Value", "true");
			closeXmlElement(data);
			break;
		
		case vfALARMS_BEHAVIOR_PERSISTENT:
			addXmlElementFull(data, "Property", 3, "ID", "Acknowledge", "DataType", "DINT", "Value", "1");
			addXmlElementFull(data, "Property", 3, "ID", "AutoReset", "DataType", "BOOL", "Value", "false");
			addXmlElementFull(data, "Property", 3, "ID", "MultipleInstances", "DataType", "BOOL", "Value", "false");
			addXmlElementFull(data, "Property", 3, "ID", "ReactionUntilAcknowledged", "DataType", "BOOL", "Value", "true");
			addXmlElementFull(data, "Property", 3, "ID", "Retain", "DataType", "BOOL", "Value", "false");
			addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "STRING", "Value", "PersistentAlarm");
			addXmlElement(data, "Group", 1, "ID", "DataUpdate");
				addXmlElement(data, "Group", 1, "ID", "Activation");
					addXmlElementFull(data, "Property", 3, "ID", "Snippets", "DataType", "BOOL", "Value", "false");
					addXmlElementFull(data, "Property", 3, "ID", "TimeStamp", "DataType", "BOOL", "Value", "false");
				closeXmlElement(data);
			closeXmlElement(data);
			addXmlElement(data, "Group", 1, "ID", "Recording");
				addXmlElementFull(data, "Property", 3, "ID", "AcknowledgedToUnacknowledged", "DataType", "BOOL", "Value", "true");
				addXmlElementFull(data, "Property", 3, "ID", "ActiveToInactive", "DataType", "BOOL", "Value", "false");
				addXmlElementFull(data, "Property", 3, "ID", "InactiveToActive", "DataType", "BOOL", "Value", "true");
				addXmlElementFull(data, "Property", 3, "ID", "UnacknowledgedToAcknowledged", "DataType", "BOOL", "Value", "true");
				addXmlElementFull(data, "Property", 3, "ID", "Update", "DataType", "BOOL", "Value", "false");
			closeXmlElement(data);
			break;
	
	}
}

void addSnippets(struct vfAlarms_Data_typ* data) {

	int i = 0;
	STRING * tempString[80];
	STRING * index[10];
	for (i = 0; i < vfALARMS_MAX_SNIPPETS; i++) {
		if (strcmp(data->internal.snippets[i].key, "")) {
		
			// Create the dynamic index.
			brsitoa(i, tempString);
			strcpy(index, "[");
			strcat(index, tempString);
			strcat(index, "]");
	
			addXmlElement(data, "Group", 1, "ID", index);
				addXmlElementFull(data, "Property", 3, "ID", "Alarm", "DataType", "STRING", "Value", "");
				addXmlElementFull(data, "Property", 3, "ID", "Key", "DataType", "STRING", "Value", data->internal.snippets[i].key);
				addXmlElement(data, "Group", 1, "ID", "Value");
					addXmlElementFull(data, "Property", 3, "ID", "PV", "DataType", "STRING", "Value", data->internal.snippets[i].pvName);
					addXmlElementFull(data, "Property", 3, "ID", "Type", "DataType", "DINT", "Value", "1");
				closeXmlElement(data);
			closeXmlElement(data);
			
		}	
	}
}
	
void addXmlElementFull(struct vfAlarms_Data_typ* data, plcstring* name, USINT numAttributes, plcstring* attribute1, plcstring* value1, plcstring* attribute2, plcstring* value2, plcstring* attribute3, plcstring* value3) {
	addXmlElement(data, name, numAttributes, attribute1, value1, attribute2, value2, attribute3, value3);
	buildXml(data, vfALARMS_XML_TYPE_END_ELEM);
}

void addXmlElement(struct vfAlarms_Data_typ* data, plcstring* name, USINT numAttributes, plcstring* attribute1, plcstring* value1, plcstring* attribute2, plcstring* value2, plcstring* attribute3, plcstring* value3) {
	buildXml(data, vfALARMS_XML_TYPE_START_ELEM, name);
	if (numAttributes > 0) {
		buildXml(data, vfALARMS_XML_TYPE_ATTRIBUTE, attribute1, value1);
	}
	if (numAttributes > 1) {
		buildXml(data, vfALARMS_XML_TYPE_ATTRIBUTE, attribute2, value2);
	}
	if (numAttributes > 2) {
		buildXml(data, vfALARMS_XML_TYPE_ATTRIBUTE, attribute3, value3);
	}	
}

void closeXmlElement(struct vfAlarms_Data_typ* data) {
	buildXml(data, vfALARMS_XML_TYPE_END_ELEM);
}

void buildXml(struct vfAlarms_Data_typ* data, enum vfALARMS_XML_TYPE_enum type, plcstring* arg1, plcstring* arg2, plcstring* arg3) {

	// Skip the step if there's an active error. 
	if (data->out.error) return;
	
	BOOL done = 0;
	BOOL error = 0;
	UINT errorId = 0;
	STRING errorString[80];
	strcpy(errorString, "");
	while (!done && !error) {
		
		// Call all FUBs so we get the initial 65534 status.
		xmlCreateMemoryWriter(&data->internal.fub.xmlCreateMemoryWriter);
		xmlWriteStartDocument(&data->internal.fub.xmlWriteStartDocument);
		xmlWriteStartElement(&data->internal.fub.xmlWriteStartElement);
		xmlWriteAttribute(&data->internal.fub.xmlWriteAttribute);
		xmlWriteEndElement(&data->internal.fub.xmlWriteEndElement);
		xmlWriteEndDocument(&data->internal.fub.xmlWriteEndDocument);
		xmlGetMemoryInfo(&data->internal.fub.xmlGetMemoryInfo);
		xmlCloseMemoryWriter(&data->internal.fub.xmlCloseMemoryWriter);
		data->internal.fub.xmlCreateMemoryWriter.enable = 0;
		data->internal.fub.xmlWriteStartDocument.enable = 0;
		data->internal.fub.xmlWriteStartElement.enable = 0;
		data->internal.fub.xmlWriteAttribute.enable = 0;
		data->internal.fub.xmlWriteEndElement.enable = 0;
		data->internal.fub.xmlWriteEndDocument.enable = 0;
		data->internal.fub.xmlGetMemoryInfo.enable = 0;
		data->internal.fub.xmlCloseMemoryWriter.enable = 0;
		
		switch(type) {
			case vfALARMS_XML_TYPE_START_WRITE:
				if (data->internal.fub.xmlCreateMemoryWriter.status == ERR_OK) {
					data->internal.xmlIdent = data->internal.fub.xmlCreateMemoryWriter.ident;
					done = 1;
				} else if ((data->internal.fub.xmlCreateMemoryWriter.status != ERR_FUB_ENABLE_FALSE) && (data->internal.fub.xmlCreateMemoryWriter.status != ERR_FUB_BUSY)) {
					error = 1;
					errorId = data->internal.fub.xmlCreateMemoryWriter.status;
					strcpy(errorString, "Error while creating the memory writer");
				} else {
					data->internal.fub.xmlCreateMemoryWriter.enable = 1;
				}
				break;
			
			case vfALARMS_XML_TYPE_START_DOC:
				if (data->internal.fub.xmlWriteStartDocument.status == ERR_OK) {
					done = 1;
				} else if ((data->internal.fub.xmlWriteStartDocument.status != ERR_FUB_ENABLE_FALSE) && (data->internal.fub.xmlWriteStartDocument.status != ERR_FUB_BUSY)) {
					error = 1;
					errorId = data->internal.fub.xmlWriteStartDocument.status;
					strcpy(errorString, "Error while writing start document");
				} else {
					data->internal.fub.xmlWriteStartDocument.enable = 1;
					data->internal.fub.xmlWriteStartDocument.ident = data->internal.xmlIdent;
					data->internal.fub.xmlWriteStartDocument.pVersion = &"1.0";
					data->internal.fub.xmlWriteStartDocument.pEncoding = &"UTF-8";
				}
				break;
			
			case vfALARMS_XML_TYPE_START_ELEM:
				if (data->internal.fub.xmlWriteStartElement.status == ERR_OK) {
					done = 1;
				} else if ((data->internal.fub.xmlWriteStartElement.status != ERR_FUB_ENABLE_FALSE) && (data->internal.fub.xmlWriteStartElement.status != ERR_FUB_BUSY)) {
					error = 1;
					errorId = data->internal.fub.xmlWriteStartElement.status;
					strcpy(errorString, "Error while writing start element");
				} else {
					data->internal.fub.xmlWriteStartElement.enable = 1;
					data->internal.fub.xmlWriteStartElement.ident = data->internal.xmlIdent;
					data->internal.fub.xmlWriteStartElement.pName = arg1;
				}
				break;	
			
			case vfALARMS_XML_TYPE_ATTRIBUTE:
				if (data->internal.fub.xmlWriteAttribute.status == ERR_OK) {
					done = 1;
				} else if ((data->internal.fub.xmlWriteAttribute.status != ERR_FUB_ENABLE_FALSE) && (data->internal.fub.xmlWriteAttribute.status != ERR_FUB_BUSY)) {
					error = 1;
					errorId = data->internal.fub.xmlWriteAttribute.status;
					strcpy(errorString, "Error while writing attribute");
				} else {
					data->internal.fub.xmlWriteAttribute.enable = 1;
					data->internal.fub.xmlWriteAttribute.ident = data->internal.xmlIdent;
					data->internal.fub.xmlWriteAttribute.pName = arg1;
					data->internal.fub.xmlWriteAttribute.pValue = arg2;
				}
				break;
					
			case vfALARMS_XML_TYPE_END_ELEM:
				if (data->internal.fub.xmlWriteEndElement.status == ERR_OK) {
					done = 1;
				} else if ((data->internal.fub.xmlWriteEndElement.status != ERR_FUB_ENABLE_FALSE) && (data->internal.fub.xmlWriteEndElement.status != ERR_FUB_BUSY)) {
					error = 1;
					errorId = data->internal.fub.xmlWriteEndElement.status;
					strcpy(errorString, "Error while writing end element");
				} else {
					data->internal.fub.xmlWriteEndElement.enable = 1;
					data->internal.fub.xmlWriteEndElement.ident = data->internal.xmlIdent;
				}
				break;
			
			case vfALARMS_XML_TYPE_END_DOC:
				if (data->internal.fub.xmlWriteEndDocument.status == ERR_OK) {
					done = 1;
				} else if ((data->internal.fub.xmlWriteEndDocument.status != ERR_FUB_ENABLE_FALSE) && (data->internal.fub.xmlWriteEndDocument.status != ERR_FUB_BUSY)) {
					error = 1;
					errorId = data->internal.fub.xmlWriteEndDocument.status;
					strcpy(errorString, "Error while writing end document");
				} else {
					data->internal.fub.xmlWriteEndDocument.enable = 1;
					data->internal.fub.xmlWriteEndDocument.ident = data->internal.xmlIdent;
				}
				break;
			
			case vfALARMS_XML_TYPE_GET_MEM:
				if (data->internal.fub.xmlGetMemoryInfo.status == ERR_OK) {
					if (data->internal.fub.xmlGetMemoryInfo.xmlDataSize < vfALARMS_MAI_BUFFER) {
						data->internal.pXmlData = data->internal.fub.xmlGetMemoryInfo.pXmlData;
						data->internal.szXmlData = data->internal.fub.xmlGetMemoryInfo.xmlDataSize;
						done = 1;
					} else {
						error = 1;
						errorId = 50001;
					}
				} else if ((data->internal.fub.xmlGetMemoryInfo.status != ERR_FUB_ENABLE_FALSE) && (data->internal.fub.xmlGetMemoryInfo.status != ERR_FUB_BUSY)) {
					error = 1;
					errorId = data->internal.fub.xmlGetMemoryInfo.status;
					strcpy(errorString, "Error while retrieving mem info");
				} else {
					data->internal.fub.xmlGetMemoryInfo.enable = 1;
					data->internal.fub.xmlGetMemoryInfo.ident = data->internal.xmlIdent;
				}
				break;
			
			case vfALARMS_XML_TYPE_END_WRITE:
				if (data->internal.fub.xmlCloseMemoryWriter.status == ERR_OK) {
					done = 1;
				} else if ((data->internal.fub.xmlCloseMemoryWriter.status != ERR_FUB_ENABLE_FALSE) && (data->internal.fub.xmlCloseMemoryWriter.status != ERR_FUB_BUSY)) {
					error = 1;
					errorId = data->internal.fub.xmlCloseMemoryWriter.status;
					strcpy(errorString, "Error while closing the memory writer");
				} else {
					data->internal.fub.xmlCloseMemoryWriter.enable = 1;
					data->internal.fub.xmlCloseMemoryWriter.ident = data->internal.xmlIdent;
				}
				break;
			
			default:
				break;
		}		
	}	
	
	data->out.error = error;
	data->out.errorId = (DINT)errorId;
	strcpy(data->out.errorString, errorString);
}

void handleXmlFile(struct vfAlarms_Data_typ* data, enum vfALARMS_FILE_CMD_enum cmd) {
	
	// Skip the step if there's an active error. 
	if (data->out.error) return;
	
	BOOL done = 0;
	BOOL error = 0;
	UINT errorId = 0;
	STRING errorString[80];
	strcpy(errorString, "");
	while (!done && !error) {
		
		FIOWrapFn_Cyclic(&data->internal.fub.fioWrapper);
		data->internal.fub.fioWrapper.IN.CMD.SaveAs = 0;
		data->internal.fub.fioWrapper.IN.CMD.Delete = 0;
		
		switch(cmd) {
			case vfALARMS_FILE_CMD_DELETE:
				if (data->internal.fub.fioWrapper.OUT.STAT.Done) {
					done = 1;	
				} else if (data->internal.fub.fioWrapper.OUT.STAT.Error) {
					error = 1;
					errorId = data->internal.fub.fioWrapper.OUT.STAT.ErrorID;
					strcpy(errorString, "Error while deleting XML file");
				} else {
					data->internal.fub.fioWrapper.IN.CMD.Delete = 1;
					strcpy(data->internal.fub.fioWrapper.IN.PAR.FileDevice, data->in.deviceName);
					strcpy(data->internal.fub.fioWrapper.IN.PAR.FileName, data->internal.fileName);
				}
				break;
				
			case vfALARMS_FILE_CMD_SAVE:
				if (data->internal.fub.fioWrapper.OUT.STAT.Done) {
					done = 1;	
				} else if (data->internal.fub.fioWrapper.OUT.STAT.Error) {
					error = 1;
					errorId = data->internal.fub.fioWrapper.OUT.STAT.ErrorID;
					strcpy(errorString, "Error while creating XML file");
				} else {
					data->internal.fub.fioWrapper.IN.CMD.SaveAs = 1;
					strcpy(data->internal.fub.fioWrapper.IN.PAR.FileDevice, data->in.deviceName);
					strcpy(data->internal.fub.fioWrapper.IN.PAR.FileName, data->internal.fileName);
					data->internal.fub.fioWrapper.IN.PAR.pData = data->internal.pXmlData;
					data->internal.fub.fioWrapper.IN.PAR.len = data->internal.szXmlData;
					data->internal.fub.fioWrapper.IN.PAR.offset = 0;
				}
				break;
		}		
	}
	data->out.error = error;
	data->out.errorId = (DINT)errorId;
	strcpy(data->out.errorString, errorString);
}

void createMappConfig(struct vfAlarms_Data_typ* data) {
	
	// Skip the step if there's an active error. 
	if (data->out.error) return;
	
	BOOL done = 0;
	BOOL error = 0;
	UINT errorId = 0;
	STRING errorString[80];
	strcpy(errorString, "");
	while (!done && !error) {
	
		MpComConfigManager(&data->internal.fub.manageConfiguration);
		data->internal.fub.manageConfiguration.Export = 0;
		data->internal.fub.manageConfiguration.Import = 0;
	
		data->internal.fub.manageConfiguration.Enable = 1;
	
		if (data->internal.fub.manageConfiguration.Active) {
			if (data->internal.fub.manageConfiguration.CommandBusy) {
//				data->internal.fub.manageConfiguration.Export = 1;
			} else if (data->internal.fub.manageConfiguration.Error) {
				error = 1;
				errorId = data->internal.fub.manageConfiguration.StatusID;
				strcpy(errorString, "Error while creating Mapp configuration");
			} else if (data->internal.fub.manageConfiguration.CommandDone) {
				done = 1;
			} else {
				data->internal.fub.manageConfiguration.DeviceName = &data->in.deviceName;
				data->internal.fub.manageConfiguration.FileName = &data->internal.fileName;
				data->internal.fub.manageConfiguration.MpLink = data->in.mpLink;
				data->internal.fub.manageConfiguration.Scope = mpCOM_CONFIG_SCOPE_COMPONENT;
				data->internal.fub.manageConfiguration.Import = 1;
			}			
		}	
	}
	data->out.error = error;
	data->out.errorId = (DINT)errorId;
	strcpy(data->out.errorString, errorString);
}