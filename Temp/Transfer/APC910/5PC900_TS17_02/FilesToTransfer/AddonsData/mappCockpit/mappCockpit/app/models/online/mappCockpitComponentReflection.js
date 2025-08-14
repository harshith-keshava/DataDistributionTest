define(["require", "exports", "./mappCockpitComponent", "./mappCockpitComponentMetaData", "../diagnostics/mappCockpitCommonInfoProvider", "../../widgets/methodParameterListWidget/parameterFilter"], function (require, exports, mappCockpitComponent_1, mappCockpitComponentMetaData_1, mappCockpitCommonInfoProvider_1, parameterFilter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * provides descriptive information for a parameter
     *
     * @class MappCockpitComponentParameterInfo
     */
    var MappCockpitComponentParameterInfo = /** @class */ (function () {
        function MappCockpitComponentParameterInfo() {
        }
        /**
         * Retrieves watchableParameters
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableParameters = function (componentParameters, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            // get the watchables meta infos
            if ((componentParameters[0] == undefined) || componentParameters[0].component.metaData[metaConfig] == undefined) {
                return new Array();
            }
            var metaInfo = componentParameters[0].component.metaData[metaConfig][metaStructure];
            // retrieve the watchables definitions
            var parameters = MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo([metaName], metaInfo, componentParameters);
            return parameters;
        };
        /**
         * Create watchable state parameters according to metaInfo
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitStateParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableStates = function (componentParameters, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            // get the watchables meta infos
            if ((componentParameters[0] == undefined) || componentParameters[0].component.metaData[metaConfig] == undefined) {
                return new Array();
            }
            var metaInfo = componentParameters[0].component.metaData[metaConfig][metaStructure];
            var stateParameters = MappCockpitComponentParameterInfo.retrieveWatchableStatesFromMetaInfo([metaName], metaInfo, componentParameters);
            return stateParameters;
        };
        /**
         * retrieves the message parameters from the component parameters
         *
         * @private
         * @param {Array<MappCockpitComponentParameter>} componentParameters
         * @returns {Array<MappCockpitComponentParameter>}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveMessageParameters = function (componentParameters) {
            var messageSeverityParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "intArraySeverity"; })[0];
            if (messageSeverityParameter == undefined) {
                messageSeverityParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArraySeverity"; })[0];
            }
            var messageDescriptionParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayDescription"; })[0];
            var messageEventIdParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayEventID"; })[0];
            var messageTimeStampParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayTime"; })[0];
            return [messageSeverityParameter, messageDescriptionParameter, messageEventIdParameter, messageTimeStampParameter];
        };
        /**
         * retrieves the trace configuration timing parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationTimingParameters = function (componentParameters) {
            // retrieve the trace configuration timing parameters
            var timingParameters = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTimingParameter(componentParameters[i])) {
                    timingParameters.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateTimingParameters(timingParameters, currentTrcConfigProperties[0].value);
                }
            }
            return timingParameters;
        };
        /**
         * Updates the values of the timing parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateTimingParameters = function (timingParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all timing parameters
                try {
                    if (currentTraceConfig.Timing != undefined) {
                        this.setValueOfProperty(timingParameters, "Timing_TotalRecordingTime", currentTraceConfig.Timing.TotalRecordingTime);
                        this.setValueOfProperty(timingParameters, "Timing_TriggerOffsetTime", currentTraceConfig.Timing.TriggerOffsetTime);
                        this.setValueOfProperty(timingParameters, "Timing_AcoposSampleTime", currentTraceConfig.Timing.ACOPOSSampleTime);
                        this.setValueOfProperty(timingParameters, "Timing_PlcTaskClass", currentTraceConfig.Timing.PVTaskClass);
                        this.setValueOfProperty(timingParameters, "Timing_PlcSampleTime", currentTraceConfig.Timing.PlcSampleTime);
                    }
                }
                catch (error) {
                    console.error("Updating of some trace configuration timing informations not possible!");
                }
            }
        };
        MappCockpitComponentParameterInfo.isTimingParameter = function (parameter) {
            // Timing parameters begin with "Timing_" in the properties name
            var prefix = "Timing_";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace configuration trigger parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationTriggerParameters = function (componentParameters) {
            // retrieve the trace configuration trigger parameters
            var triggerParameters = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTriggerParameter(componentParameters[i])) {
                    triggerParameters.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateTriggerParameters(triggerParameters, currentTrcConfigProperties[0].value);
                }
            }
            return triggerParameters;
        };
        /**
         * Updates the values of the trigger parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} triggerParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateTriggerParameters = function (triggerParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all supported triggers
                for (var i = 0; i < 2; i++) {
                    this.updateSingleTrigger(triggerParameters, i, currentTraceConfig);
                }
            }
        };
        /**
         * Updates the values of a trigger with the given index with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} triggerParameters
         * @param {number} triggerIndex
         * @param {*} currentTraceConfig
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateSingleTrigger = function (triggerParameters, triggerIndex, currentTraceConfig) {
            try {
                var triggerID_1 = (triggerIndex + 1);
                var startTriggerPrefixBrowseName = "StartTrigger" + triggerID_1 + "_";
                var currentTriggerCfg = currentTraceConfig.Triggers.filter(function (element) { return element.ID == triggerID_1; })[0];
                if (currentTriggerCfg != undefined) {
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Condition", currentTriggerCfg.Event);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "DataPoint", currentTriggerCfg.DataPoint);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Threshold", currentTriggerCfg.Threshold);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Window", currentTriggerCfg.Window);
                }
                else {
                    // Set Trigger to default if not available in current trace config
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Condition", "20");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "DataPoint", "");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Threshold", "0");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Window", "0");
                }
            }
            catch (error) {
                console.error("Updating of some trace configuration trigger informations not possible!");
            }
        };
        MappCockpitComponentParameterInfo.setValueOfProperty = function (properties, propertyName, value) {
            var property = properties.filter(function (element) { return element.browseName == propertyName; })[0];
            if (property != undefined) {
                property.value = value;
            }
        };
        MappCockpitComponentParameterInfo.isTriggerParameter = function (parameter) {
            // Trigger parameters begin with "StartTrigger" in the properties name
            var prefix = "StartTrigger";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace configuration datapoints from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationDatapoints = function (componentParameters) {
            // retrieve the trace configuration datapoints
            var datapoints = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isDataPoint(componentParameters[i])) {
                    datapoints.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateDataPointParameters(datapoints, currentTrcConfigProperties[0].value);
                }
            }
            return datapoints;
        };
        /**
         * Updates the values of the datapoint parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} dataPointParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateDataPointParameters = function (dataPointParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all datapoints
                try {
                    if (currentTraceConfig.DataPoints != undefined) {
                        var _loop_1 = function (index) {
                            var dataPointID = (index + 1);
                            var currentDataPoint = currentTraceConfig.DataPoints.filter(function (element) { return element.ID == dataPointID; })[0];
                            if (currentDataPoint != undefined) {
                                dataPointParameters[index].value = currentDataPoint.Name;
                            }
                            else {
                                dataPointParameters[index].value = "";
                            }
                        };
                        for (var index = 0; index < dataPointParameters.length; index++) {
                            _loop_1(index);
                        }
                    }
                }
                catch (error) {
                    console.error("Updating of some trace configuration datapoint informations not possible!");
                }
            }
        };
        MappCockpitComponentParameterInfo.isDataPoint = function (parameter) {
            // Datapoint parameters begin with "DataPoint" in the properties name
            var prefix = "DataPoint";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace control parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceControlParameters = function (componentParameters) {
            // retrieve the trace configuration datapoints
            var datapoints = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTraceControlParameter(componentParameters[i])) {
                    datapoints.push(componentParameters[i]);
                }
            }
            return datapoints;
        };
        MappCockpitComponentParameterInfo.isTraceControlParameter = function (parameter) {
            if (parameter.browseName == "TraceStatus") {
                return true;
            }
            return false;
        };
        /**
        * retrieves the configuration parameters from the parameter set
        *
        * @static
        * @param {MappCockpitComponentParameter[]} componentParameters
        * @returns {MappCockpitComponentParameter[]}
        * @memberof MappCockpitComponentParameterInfo
        */
        MappCockpitComponentParameterInfo.retrieveConfigurationParameters = function (componentParameters) {
            // get the configuration meta infos
            var configurationMetaInfo;
            if ((componentParameters[0] != undefined) && componentParameters[0].component.metaData.MetaConfigConfigProps != undefined) {
                configurationMetaInfo = componentParameters[0].component.metaData.MetaConfigConfigProps.ConfigurationStructure;
            }
            else {
                return new Array();
            }
            // retrieve the configuration definitions
            var configurationParameters = MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo(["Parameter", "Group"], configurationMetaInfo, componentParameters);
            return configurationParameters;
        };
        /**
         * retrives parameters declared in the meta info
         *
         * @private
         * @static
         * @param {string[]} requesteItemTypes
         * @param {*} parameterMetaInfo
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo = function (requesteItemTypes, parameterMetaInfo, componentParameters) {
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, requesteItemTypes);
            // create dictionary of available parameters
            var parameterSet = {};
            componentParameters.forEach(function (parameter) { parameterSet[parameter.browseName] = parameter; });
            // create dictionary of meta parameters
            var metaParameters = {};
            metaParameterItems.forEach(function (metaParameter) { metaParameters[metaParameter.Ref] = metaParameter; });
            // retrieve the parameters with matching name in the meta info
            var matchingParameters = componentParameters.filter(function (componentParameter) { return metaParameters[componentParameter.browseName] !== undefined; });
            // read and assign units
            MappCockpitComponentParameterInfo.updateParameter(matchingParameters, metaParameters);
            // notify invalid or unknown references
            var unknownParameterRefs = metaParameterItems.filter(function (metaParameter) { return metaParameter.Ref !== undefined && parameterSet[metaParameter.Ref] === undefined; });
            if (unknownParameterRefs.length > 0) {
                console.error("MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo : meta info references unknown parameters %o %o", unknownParameterRefs, parameterSet);
            }
            return matchingParameters;
        };
        /**
         * Retrieves watchable states declared in the metaInfo
         *
         * @static
         * @param {string[]} requesteItemTypes
         * @param {*} parameterMetaInfo
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitStateParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableStatesFromMetaInfo = function (requesteItemTypes, parameterMetaInfo, componentParameters) {
            var stateParameters = new Array();
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, requesteItemTypes);
            // create dictionary of available parameters
            var parameterSet = {};
            componentParameters.forEach(function (parameter) { parameterSet[parameter.browseName] = parameter; });
            // create watchable states
            metaParameterItems.forEach(function (metaParameter) {
                stateParameters.push(new mappCockpitComponent_1.MappCockpitStateParameter(metaParameter.Ref, metaParameter.IconExpression, metaParameter.WatchableVariablesMapping, metaParameter.Icon));
            });
            return stateParameters;
        };
        MappCockpitComponentParameterInfo.readParameters = function (parameterMetaInfo, parameter) {
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, parameter);
            // create dictionary of meta parameters
            var metaParameters = {};
            metaParameterItems.forEach(function (metaParameter) { metaParameters[metaParameter.Ref] = metaParameter; });
            return metaParameters;
        };
        MappCockpitComponentParameterInfo.readMessageParameters = function (parameterMetaInfo) {
            var metaParameters = {};
            metaParameters["intArraySeverity"] = { Ref: "intArraySeverity" };
            metaParameters["strArrayDescription"] = { Ref: "strArrayDescription" };
            metaParameters["strArrayEventID"] = { Ref: "strArrayEventID" };
            metaParameters["strArrayTime"] = { Ref: "strArrayTime" };
            return metaParameters;
        };
        /**
         * reads engineering units from the meta info and assigns it to the parameters
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {{}} metaParameters
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameter = function (componentParameters, metaParameters) {
            componentParameters.forEach(function (componentParameter) {
                MappCockpitComponentParameterInfo.updateParameterEngineeringUnit(metaParameters, componentParameter);
                MappCockpitComponentParameterInfo.updateParameterDisplayName(metaParameters, componentParameter);
                MappCockpitComponentParameterInfo.updateParameterIsReadOnly(metaParameters, componentParameter);
            });
        };
        /**
         * Updates the parameters display name
         *
         * @static
         * @param {{}} metaParameters
         * @param {MappCockpitComponentParameter} componentParameter
         * @returns {*}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameterDisplayName = function (metaParameters, componentParameter) {
            if (metaParameters[componentParameter.browseName].DisplayName) {
                componentParameter.displayName = metaParameters[componentParameter.browseName].DisplayName;
            }
        };
        /**
         * Updates the parameters readOnly info
         *
         * @static
         * @param {{}} metaParameters
         * @param {MappCockpitComponentParameter} componentParameter
         * @returns {*}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameterIsReadOnly = function (metaParameters, componentParameter) {
            if (metaParameters[componentParameter.browseName].IsReadOnly
                && (metaParameters[componentParameter.browseName].IsReadOnly == "true"
                    || metaParameters[componentParameter.browseName].IsReadOnly == true)) {
                componentParameter.isReadOnly = true;
            }
            else {
                componentParameter.isReadOnly = false;
            }
        };
        /**
         * Updates the parameters engineering units
         *
         * @private
         * @static
         * @param {{}} metaParameters
         * @param {MappCockpitComponentParameter} componentParameter
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameterEngineeringUnit = function (metaParameters, componentParameter) {
            if (metaParameters[componentParameter.browseName].EU) {
                componentParameter.engineeringUnit = metaParameters[componentParameter.browseName].EU;
            }
        };
        /**
         * reads enum values if available and assigns it to the parameter
         *
         * @static
         * @param {MappCockpitComponentParameter} parameter
         * @returns {*} true if the parameter uses an enum for its value
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.readParameterEnums = function (componentParameters) {
            // get available enum parameter defs 
            var enumParameterTypeDefinitions = mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance().readEnumParameterDefinitions(componentParameters, componentParameters[0].component.metaData);
            // find matching parameter
            var matchingParameters = componentParameters.filter(function (componentParameter) { return enumParameterTypeDefinitions[componentParameter.browseName]; });
            // set the enum definitions for the matching parameters
            matchingParameters.forEach(function (matchingParameter) {
                // set the enum definition
                matchingParameter.enumType = enumParameterTypeDefinitions[matchingParameter.browseName];
                console.log("MappCockpitComponentParameterInfo - set enum info %o for %o", matchingParameter.enumType, matchingParameter.component.browseName + "." + matchingParameter.browseName);
            });
        };
        return MappCockpitComponentParameterInfo;
    }());
    exports.MappCockpitComponentParameterInfo = MappCockpitComponentParameterInfo;
    /**
     * provides descriptive information for a method
     *
     * @class MappCockpitComponentMethodInfoInfo
     */
    var MappCockpitComponentMethodInfo = /** @class */ (function () {
        function MappCockpitComponentMethodInfo() {
        }
        /**
         * initializes the method input parameters
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameters = function (method) {
            // skip if the method has no parameters to initialize.
            if (method.inputParameters.length === 0)
                return;
            // get the meta data
            var methodMetaInfo = MappCockpitComponentMethodInfo.getMethodMetaInfo(method);
            if (methodMetaInfo) {
                // find and initialize method parameter default values
                method.inputParameters.forEach(function (methodInputParameter) {
                    MappCockpitComponentMethodInfo.updateMethodInputParameterDefaults(method, methodInputParameter, methodMetaInfo);
                });
            }
        };
        /**
         * updates respectively initializes the method input parameters with defaults
         *
         * @private
         * @static
         * @param {MappCockpitComponentMethod} method
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @param {*} methodMetaInfo
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameterDefaults = function (method, methodInputParameter, methodMetaInfo) {
            var methodParameterMetaInfo = MappCockpitComponentMethodInfo.getMethodParameterMetaInfo(methodMetaInfo, methodInputParameter);
            if (methodParameterMetaInfo) {
                // assign default value if defined ...
                MappCockpitComponentMethodInfo.updateMethodInputParameterDefaultValue(methodParameterMetaInfo, methodInputParameter, method);
                // assign engineering unit if defined.
                MappCockpitComponentMethodInfo.updateMethodParameterEngineeringUnit(methodParameterMetaInfo, methodInputParameter);
                // assign display name
                MappCockpitComponentMethodInfo.updateMethodParameterDisplayName(methodParameterMetaInfo, methodInputParameter);
                //assign filter if defined
                MappCockpitComponentMethodInfo.updateMethodParameterFilter(methodParameterMetaInfo, methodInputParameter);
            }
            else {
                console.error("MappCockpitComponentMethodInfo.initializeInputParameterDefaultValues : No meta info defined for for method parameter %o", method.browseName + "." + methodInputParameter.name);
            }
        };
        /**
         * Update filter information to method parameter
         *
         * @private
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodParameterFilter = function (methodParameterMetaInfo, methodInputParameter) {
            var parameterHasFilter = methodParameterMetaInfo.Parameter.hasOwnProperty("Filter");
            if (parameterHasFilter) {
                methodInputParameter.filter = new parameterFilter_1.ParameterFilter(methodParameterMetaInfo.Parameter.Filter.ParameterRef, methodParameterMetaInfo.Parameter.Filter.ParameterValues);
            }
        };
        /**
         * Updates the display from meta info
         *
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodParameterDisplayName = function (methodParameterMetaInfo, methodInputParameter) {
            if (methodParameterMetaInfo.Parameter.DisplayName) {
                methodInputParameter.displayName = methodParameterMetaInfo.Parameter.DisplayName;
            }
        };
        /**
         * Updates the engineering unit
         *
         * @private
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodParameterEngineeringUnit = function (methodParameterMetaInfo, methodInputParameter) {
            if (methodParameterMetaInfo.Parameter.EU) {
                methodInputParameter.engineeringUnit = methodParameterMetaInfo.Parameter.EU;
            }
        };
        /**
         * Updates the default value
         *
         * @private
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @param {MappCockpitComponentMethod} method
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameterDefaultValue = function (methodParameterMetaInfo, methodInputParameter, method) {
            var parameterHasDefaultValue = methodParameterMetaInfo.Parameter.hasOwnProperty("DefaultValue");
            if (parameterHasDefaultValue) {
                methodInputParameter.value = methodParameterMetaInfo.Parameter.DefaultValue;
            }
            else {
                // method parameters must have default values defined
                console.error("MappCockpitComponentMethodInfo.initializeInputParameterDefaultValues : No default value defined for method parameter %o", method.browseName + "." + methodInputParameter.name);
            }
        };
        /**
         * gets the meta info for a method parameter
         *
         * @private
         * @static
         * @param {*} methodMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMethodParameterMetaInfo = function (methodMetaInfo, methodInputParameter) {
            var methodParameterMetaInfo = undefined;
            // get parameter meta info if available
            if (methodMetaInfo.Parameters) {
                var methodParameterMetaInfos = methodMetaInfo.Parameters.filter(function (methodMetaItemParameterItem) { return methodMetaItemParameterItem.Parameter.Ref === methodInputParameter.name; });
                methodParameterMetaInfo = methodParameterMetaInfos.length === 1 ? methodParameterMetaInfos[0] : undefined;
            }
            return methodParameterMetaInfo;
        };
        /**
         * gets the meta info for the requested method
         *
         * @private
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMethodMetaInfo = function (method) {
            var methodMetaInfo = undefined;
            var componentMetaData = method.component.metaData;
            if (componentMetaData == undefined) {
                return methodMetaInfo;
            }
            // get the method info from meta data
            var methodMetaItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(componentMetaData.MetaConfigCommands.CommandsStructure, ["Command"]);
            // get the meta info for the requested method
            var methodMetaInfos = methodMetaItems.filter(function (methodMetaItem) { return methodMetaItem.Ref === method.browseName; });
            methodMetaInfo = methodMetaInfos.length === 1 ? methodMetaInfos[0] : undefined;
            return methodMetaInfo;
        };
        /**
         * gets the method parameters contained in the meta data
         *
         * @private
         * @static
         * @param {*} methodMetaItem
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMatchingMethodParameters = function (methodMetaItem, methodInputParameter) {
            return methodMetaItem.Parameters.filter(function (methodMetaItemParameterItem) {
                var isMatchingMethodParameter = methodMetaItemParameterItem.Parameter.Ref === methodInputParameter.name
                    && methodMetaItemParameterItem.Parameter.DefaultValue
                    && methodMetaItemParameterItem.Parameter.DefaultValue !== "";
                return isMatchingMethodParameter;
            });
        };
        /**
         * Retrieves the executable methods from the component method set
         *
         * @static
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitComponentMethod[]}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.retrieveExecutableMethods = function (componentMethods, dataToRetrieve) {
            var _this = this;
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            var executableMethods = Array();
            if ((componentMethods[0] == undefined) ||
                componentMethods[0].component.metaData == undefined ||
                componentMethods[0].component.metaData[metaConfig] == undefined) {
                return executableMethods;
            }
            // get the commands meta infos
            var methodsMetaInfo = componentMethods[0].component.metaData[metaConfig][metaStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, [metaName]);
            // create dictionary of available methods
            var methodSet = {};
            var metaMethodSet = {};
            componentMethods.forEach(function (method) { methodSet[method.browseName] = method; });
            metaMethods.forEach(function (metaMethod) { metaMethodSet[metaMethod.Ref] = metaMethod; });
            // retrieve the methods with matching name in the meta info
            executableMethods = metaMethods.filter(function (metaMethod) { return methodSet[metaMethod.Ref] !== undefined; }).map(function (metaMethod) { return methodSet[metaMethod.Ref]; });
            // assign the display name
            executableMethods.forEach(function (method) { _this.updateMethodDisplayName(method, metaMethodSet[method.browseName]); });
            // notify invalid or unknown methods
            var unknownMethods = metaMethods.filter(function (metaMethod) { return methodSet[metaMethod.Ref] === undefined; });
            if (unknownMethods.length > 0) {
                console.error("MappCockpitComponentMethodInfo.retrieveExecutableMethods : meta info references unknown methods %o", unknownMethods);
            }
            return executableMethods;
        };
        /**
         * Retrieves quick commands methods from metaInfo
         *
         * @static
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitQuickCommandParameter[]}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.retrieveQuickCommands = function (componentMethods, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            var quickCommands = Array();
            if ((componentMethods[0] == undefined) ||
                componentMethods[0].component.metaData == undefined ||
                componentMethods[0].component.metaData[metaConfig] == undefined) {
                return quickCommands;
            }
            // get the commands meta infos
            var methodsMetaInfo = componentMethods[0].component.metaData[metaConfig][metaStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, [metaName]);
            // create dictionary of available methods
            var methodSet = {};
            componentMethods.forEach(function (method) { methodSet[method.browseName] = method; });
            metaMethods.forEach(function (metaMethod) {
                quickCommands.push(new mappCockpitComponent_1.MappCockpitQuickCommandParameter(metaMethod.Ref, metaMethod.Tooltip, metaMethod.ImageName));
            });
            // notify invalid or unknown methods
            var unknownMethods = quickCommands.filter(function (quickCommand) { return methodSet[quickCommand.name] === undefined; });
            if (unknownMethods.length > 0) {
                console.error("MappCockpitComponentMethodInfo.retrieveQuickCommands : meta info references unknown methods %o", unknownMethods);
            }
            return quickCommands;
        };
        MappCockpitComponentMethodInfo.readMethods = function (metaInfo, property, method) {
            var metaConfig = property[0];
            var metaConfigStructure = property[1];
            // get the commands meta infos
            if (metaInfo[metaConfig] == undefined)
                return {};
            var methodsMetaInfo = metaInfo[metaConfig][metaConfigStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, method);
            // create dictionary of available methods
            var metaMethodSet = {};
            metaMethods.forEach(function (metaMethod) { metaMethodSet[metaMethod.Ref] = metaMethod; });
            return metaMethodSet;
        };
        /**
         * Updates a methods display name
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @param {*} arg1
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodDisplayName = function (method, metaMethodInfo) {
            if (metaMethodInfo && metaMethodInfo.DisplayName) {
                method.displayName = metaMethodInfo.DisplayName;
            }
        };
        /**
         * reads and updates method parameter enums
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.readMethodParameterEnums = function (method, metaData) {
            var methodParameters = method.inputParameters;
            // get available enum method parameter defs 
            var metaMethodParameterEnumTypeDefinitions = mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance().readMetaEnumMethodParameterDefinitions(method, metaData);
            // find matching parameter
            var matchingMethodParameters = methodParameters.filter(function (methodParameter) { return metaMethodParameterEnumTypeDefinitions[methodParameter.name]; });
            // set the enum definitions for the matching parameters
            matchingMethodParameters.forEach(function (matchingMethodParameter) {
                // set the enum definition
                matchingMethodParameter.enumType = metaMethodParameterEnumTypeDefinitions[matchingMethodParameter.name];
                console.log("MappCockpitComponentMethodInfo - set enum info %o for %o", matchingMethodParameter.enumType, method.browseName + "." + matchingMethodParameter.name);
            });
        };
        return MappCockpitComponentMethodInfo;
    }());
    exports.MappCockpitComponentMethodInfo = MappCockpitComponentMethodInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTs7OztPQUlHO0lBRUg7UUFBQTtRQWtoQkEsQ0FBQztRQWhoQkc7Ozs7Ozs7O1dBUUc7UUFDSSw2REFBMkIsR0FBbEMsVUFBbUMsbUJBQW9ELEVBQUUsY0FBNkI7WUFDbEgsSUFBSSxVQUFVLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksYUFBYSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakMsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBaUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBVSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQzVJLE9BQU8sSUFBSSxLQUFLLEVBQWlDLENBQUM7YUFDckQ7WUFDRCxJQUFJLFFBQVEsR0FBZ0MsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBVSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNuSCxzQ0FBc0M7WUFDdEMsSUFBSSxVQUFVLEdBQUcsaUNBQWlDLENBQUMsOEJBQThCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUM3SCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSx5REFBdUIsR0FBOUIsVUFBK0IsbUJBQW9ELEVBQUUsY0FBNkI7WUFDOUcs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QkFBdUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEssQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUwscUNBQUM7SUFBRCxDQUFDLEFBeFZELElBd1ZDO0lBRTJDLHdFQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyLCBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB9IGZyb20gXCIuL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEgfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2RpYWdub3N0aWNzL21hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFBhcmFtZXRlckZpbHRlciB9IGZyb20gXCIuLi8uLi93aWRnZXRzL21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQvcGFyYW1ldGVyRmlsdGVyXCI7XHJcblxyXG4vKipcclxuICogcHJvdmlkZXMgZGVzY3JpcHRpdmUgaW5mb3JtYXRpb24gZm9yIGEgcGFyYW1ldGVyXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICovXHJcblxyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZGF0YVRvUmV0cmlldmVcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVXYXRjaGFibGVQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIGRhdGFUb1JldHJpZXZlOiBBcnJheTxzdHJpbmc+KTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgbGV0IG1ldGFDb25maWcgPSBkYXRhVG9SZXRyaWV2ZVswXTtcclxuICAgICAgICBsZXQgbWV0YVN0cnVjdHVyZSA9IGRhdGFUb1JldHJpZXZlWzFdO1xyXG4gICAgICAgIGxldCBtZXRhTmFtZSA9IGRhdGFUb1JldHJpZXZlWzJdO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIHdhdGNoYWJsZXMgbWV0YSBpbmZvc1xyXG4gICAgICAgIGlmICgoY29tcG9uZW50UGFyYW1ldGVyc1swXSA9PSB1bmRlZmluZWQpIHx8ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKVttZXRhQ29uZmlnXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1ldGFJbmZvID0gKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddW21ldGFTdHJ1Y3R1cmVdO1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB3YXRjaGFibGVzIGRlZmluaXRpb25zXHJcbiAgICAgICAgbGV0IHBhcmFtZXRlcnMgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVQYXJhbWV0ZXJzRnJvbU1ldGFJbmZvKFttZXRhTmFtZV0sIG1ldGFJbmZvLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICByZXR1cm4gcGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB3YXRjaGFibGUgc3RhdGUgcGFyYW1ldGVycyBhY2NvcmRpbmcgdG8gbWV0YUluZm9cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZGF0YVRvUmV0cmlldmVcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZVdhdGNoYWJsZVN0YXRlcyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBkYXRhVG9SZXRyaWV2ZTogQXJyYXk8c3RyaW5nPik6IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgbGV0IG1ldGFDb25maWcgPSBkYXRhVG9SZXRyaWV2ZVswXTtcclxuICAgICAgICBsZXQgbWV0YVN0cnVjdHVyZSA9IGRhdGFUb1JldHJpZXZlWzFdO1xyXG4gICAgICAgIGxldCBtZXRhTmFtZSA9IGRhdGFUb1JldHJpZXZlWzJdO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIHdhdGNoYWJsZXMgbWV0YSBpbmZvc1xyXG4gICAgICAgIGlmICgoY29tcG9uZW50UGFyYW1ldGVyc1swXSA9PSB1bmRlZmluZWQpIHx8ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKVttZXRhQ29uZmlnXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheTxNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWV0YUluZm8gPSAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudFBhcmFtZXRlcnNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSlbbWV0YUNvbmZpZ11bbWV0YVN0cnVjdHVyZV07XHJcblxyXG4gICAgICAgIGxldCBzdGF0ZVBhcmFtZXRlcnMgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVXYXRjaGFibGVTdGF0ZXNGcm9tTWV0YUluZm8oW21ldGFOYW1lXSwgbWV0YUluZm8sIGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RhdGVQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgbWVzc2FnZSBwYXJhbWV0ZXJzIGZyb20gdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVNZXNzYWdlUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2VTZXZlcml0eVBhcmFtZXRlciA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtZXRlciA9PiB7IHJldHVybiBwYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PT0gXCJpbnRBcnJheVNldmVyaXR5XCI7IH0pWzBdO1xyXG4gICAgICAgIGlmIChtZXNzYWdlU2V2ZXJpdHlQYXJhbWV0ZXIgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VTZXZlcml0eVBhcmFtZXRlciA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtZXRlciA9PiB7IHJldHVybiBwYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PT0gXCJzdHJBcnJheVNldmVyaXR5XCI7IH0pWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2VEZXNjcmlwdGlvblBhcmFtZXRlciA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtZXRlciA9PiB7IHJldHVybiBwYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PT0gXCJzdHJBcnJheURlc2NyaXB0aW9uXCI7IH0pWzBdO1xyXG4gICAgICAgIGxldCBtZXNzYWdlRXZlbnRJZFBhcmFtZXRlciA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtZXRlciA9PiB7IHJldHVybiBwYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PT0gXCJzdHJBcnJheUV2ZW50SURcIjsgfSlbMF07XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VUaW1lU3RhbXBQYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlUaW1lXCI7IH0pWzBdO1xyXG5cclxuICAgICAgICByZXR1cm4gW21lc3NhZ2VTZXZlcml0eVBhcmFtZXRlciwgbWVzc2FnZURlc2NyaXB0aW9uUGFyYW1ldGVyLCBtZXNzYWdlRXZlbnRJZFBhcmFtZXRlciwgbWVzc2FnZVRpbWVTdGFtcFBhcmFtZXRlcl07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyaWV2ZXMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gdGltaW5nIHBhcmFtZXRlcnMgZnJvbSB0aGUgcGFyYW1ldGVyIHNldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZVRyYWNlQ29uZmlndXJhdGlvblRpbWluZ1BhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHRpbWluZyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbGV0IHRpbWluZ1BhcmFtZXRlcnMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8uaXNUaW1pbmdQYXJhbWV0ZXIoY29tcG9uZW50UGFyYW1ldGVyc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIHRpbWluZ1BhcmFtZXRlcnMucHVzaChjb21wb25lbnRQYXJhbWV0ZXJzW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIHZhbHVlcyB0byB0aGUgcmVhbCB2YWx1ZXMgZnJvbSBDdXJyZW50VHJjQ29uZmlnIFByb3BlcnR5IChCVUdGSVggZm9yIG1pc3NpbmcgU3RhcnRUcmlnZ2VycyBhdCBzdGFydHVwKVxyXG4gICAgICAgIGxldCBjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllcyA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKChlbGVtZW50KSA9PiB7IHJldHVybiBlbGVtZW50LmJyb3dzZU5hbWUgPT0gXCJDdXJyZW50VHJjQ29uZmlnXCIgfSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllc1swXS52YWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltaW5nUGFyYW1ldGVycyh0aW1pbmdQYXJhbWV0ZXJzLCBjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllc1swXS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRpbWluZ1BhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB2YWx1ZXMgb2YgdGhlIHRpbWluZyBwYXJhbWV0ZXJzIHdpdGggdGhlIHZhbHVlcyBmcm9tIGEganNvbiBzdHJpbmcgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcpIFxyXG4gICAgICogQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHRpbWluZ1BhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZVRpbWluZ1BhcmFtZXRlcnModGltaW5nUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFRyYWNlQ29uZmlnID0gSlNPTi5wYXJzZShjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIGFsbCB0aW1pbmcgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmFjZUNvbmZpZy5UaW1pbmcgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodGltaW5nUGFyYW1ldGVycywgXCJUaW1pbmdfVG90YWxSZWNvcmRpbmdUaW1lXCIsIGN1cnJlbnRUcmFjZUNvbmZpZy5UaW1pbmcuVG90YWxSZWNvcmRpbmdUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0aW1pbmdQYXJhbWV0ZXJzLCBcIlRpbWluZ19UcmlnZ2VyT2Zmc2V0VGltZVwiLCBjdXJyZW50VHJhY2VDb25maWcuVGltaW5nLlRyaWdnZXJPZmZzZXRUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0aW1pbmdQYXJhbWV0ZXJzLCBcIlRpbWluZ19BY29wb3NTYW1wbGVUaW1lXCIsIGN1cnJlbnRUcmFjZUNvbmZpZy5UaW1pbmcuQUNPUE9TU2FtcGxlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodGltaW5nUGFyYW1ldGVycywgXCJUaW1pbmdfUGxjVGFza0NsYXNzXCIsIGN1cnJlbnRUcmFjZUNvbmZpZy5UaW1pbmcuUFZUYXNrQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRpbWluZ1BhcmFtZXRlcnMsIFwiVGltaW5nX1BsY1NhbXBsZVRpbWVcIiwgY3VycmVudFRyYWNlQ29uZmlnLlRpbWluZy5QbGNTYW1wbGVUaW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVcGRhdGluZyBvZiBzb21lIHRyYWNlIGNvbmZpZ3VyYXRpb24gdGltaW5nIGluZm9ybWF0aW9ucyBub3QgcG9zc2libGUhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNUaW1pbmdQYXJhbWV0ZXIocGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIFRpbWluZyBwYXJhbWV0ZXJzIGJlZ2luIHdpdGggXCJUaW1pbmdfXCIgaW4gdGhlIHByb3BlcnRpZXMgbmFtZVxyXG4gICAgICAgIGxldCBwcmVmaXggPSBcIlRpbWluZ19cIjtcclxuICAgICAgICBpZiAocGFyYW1ldGVyLmJyb3dzZU5hbWUuc3Vic3RyKDAsIHByZWZpeC5sZW5ndGgpID09IHByZWZpeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHRyaWdnZXIgcGFyYW1ldGVycyBmcm9tIHRoZSBwYXJhbWV0ZXIgc2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlVHJhY2VDb25maWd1cmF0aW9uVHJpZ2dlclBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHRyaWdnZXIgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCB0cmlnZ2VyUGFyYW1ldGVycyA9IG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudFBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5pc1RyaWdnZXJQYXJhbWV0ZXIoY29tcG9uZW50UGFyYW1ldGVyc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJQYXJhbWV0ZXJzLnB1c2goY29tcG9uZW50UGFyYW1ldGVyc1tpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB2YWx1ZXMgdG8gdGhlIHJlYWwgdmFsdWVzIGZyb20gQ3VycmVudFRyY0NvbmZpZyBQcm9wZXJ0eSAoQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cClcclxuICAgICAgICBsZXQgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5icm93c2VOYW1lID09IFwiQ3VycmVudFRyY0NvbmZpZ1wiIH0pO1xyXG4gICAgICAgIGlmIChjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXNbMF0udmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRyaWdnZXJQYXJhbWV0ZXJzKHRyaWdnZXJQYXJhbWV0ZXJzLCBjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllc1swXS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRyaWdnZXJQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdmFsdWVzIG9mIHRoZSB0cmlnZ2VyIHBhcmFtZXRlcnMgd2l0aCB0aGUgdmFsdWVzIGZyb20gYSBqc29uIHN0cmluZyAoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZykgXHJcbiAgICAgKiBCVUdGSVggZm9yIG1pc3NpbmcgU3RhcnRUcmlnZ2VycyBhdCBzdGFydHVwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gdHJpZ2dlclBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZVRyaWdnZXJQYXJhbWV0ZXJzKHRyaWdnZXJQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50VHJhY2VDb25maWcgPSBKU09OLnBhcnNlKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcpO1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgYWxsIHN1cHBvcnRlZCB0cmlnZ2Vyc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTaW5nbGVUcmlnZ2VyKHRyaWdnZXJQYXJhbWV0ZXJzLCBpLCBjdXJyZW50VHJhY2VDb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdmFsdWVzIG9mIGEgdHJpZ2dlciB3aXRoIHRoZSBnaXZlbiBpbmRleCB3aXRoIHRoZSB2YWx1ZXMgZnJvbSBhIGpzb24gc3RyaW5nIChjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKSBcclxuICAgICAqIEJVR0ZJWCBmb3IgbWlzc2luZyBTdGFydFRyaWdnZXJzIGF0IHN0YXJ0dXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB0cmlnZ2VyUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRyaWdnZXJJbmRleFxyXG4gICAgICogQHBhcmFtIHsqfSBjdXJyZW50VHJhY2VDb25maWdcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlU2luZ2xlVHJpZ2dlcih0cmlnZ2VyUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgdHJpZ2dlckluZGV4OiBudW1iZXIsIGN1cnJlbnRUcmFjZUNvbmZpZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCB0cmlnZ2VySUQgPSAodHJpZ2dlckluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lID0gXCJTdGFydFRyaWdnZXJcIiArIHRyaWdnZXJJRCArIFwiX1wiO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFRyaWdnZXJDZmcgPSBjdXJyZW50VHJhY2VDb25maWcuVHJpZ2dlcnMuZmlsdGVyKChlbGVtZW50KSA9PiB7IHJldHVybiBlbGVtZW50LklEID09IHRyaWdnZXJJRCB9KVswXTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmlnZ2VyQ2ZnICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIkNvbmRpdGlvblwiLCBjdXJyZW50VHJpZ2dlckNmZy5FdmVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiRGF0YVBvaW50XCIsIGN1cnJlbnRUcmlnZ2VyQ2ZnLkRhdGFQb2ludCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiVGhyZXNob2xkXCIsIGN1cnJlbnRUcmlnZ2VyQ2ZnLlRocmVzaG9sZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiV2luZG93XCIsIGN1cnJlbnRUcmlnZ2VyQ2ZnLldpbmRvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgVHJpZ2dlciB0byBkZWZhdWx0IGlmIG5vdCBhdmFpbGFibGUgaW4gY3VycmVudCB0cmFjZSBjb25maWdcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJDb25kaXRpb25cIiwgXCIyMFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJEYXRhUG9pbnRcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiVGhyZXNob2xkXCIsIFwiMFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJXaW5kb3dcIiwgXCIwXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVXBkYXRpbmcgb2Ygc29tZSB0cmFjZSBjb25maWd1cmF0aW9uIHRyaWdnZXIgaW5mb3JtYXRpb25zIG5vdCBwb3NzaWJsZSFcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2V0VmFsdWVPZlByb3BlcnR5KHByb3BlcnRpZXM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZSkge1xyXG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHByb3BlcnRpZXMuZmlsdGVyKChlbGVtZW50KSA9PiB7IHJldHVybiBlbGVtZW50LmJyb3dzZU5hbWUgPT0gcHJvcGVydHlOYW1lIH0pWzBdO1xyXG4gICAgICAgIGlmIChwcm9wZXJ0eSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcHJvcGVydHkudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNUcmlnZ2VyUGFyYW1ldGVyKHBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBUcmlnZ2VyIHBhcmFtZXRlcnMgYmVnaW4gd2l0aCBcIlN0YXJ0VHJpZ2dlclwiIGluIHRoZSBwcm9wZXJ0aWVzIG5hbWVcclxuICAgICAgICBsZXQgcHJlZml4ID0gXCJTdGFydFRyaWdnZXJcIjtcclxuICAgICAgICBpZiAocGFyYW1ldGVyLmJyb3dzZU5hbWUuc3Vic3RyKDAsIHByZWZpeC5sZW5ndGgpID09IHByZWZpeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIGRhdGFwb2ludHMgZnJvbSB0aGUgcGFyYW1ldGVyIHNldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZVRyYWNlQ29uZmlndXJhdGlvbkRhdGFwb2ludHMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIGRhdGFwb2ludHNcclxuICAgICAgICBsZXQgZGF0YXBvaW50cyA9IG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudFBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5pc0RhdGFQb2ludChjb21wb25lbnRQYXJhbWV0ZXJzW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YXBvaW50cy5wdXNoKGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdmFsdWVzIHRvIHRoZSByZWFsIHZhbHVlcyBmcm9tIEN1cnJlbnRUcmNDb25maWcgUHJvcGVydHkgKEJVR0ZJWCBmb3IgbWlzc2luZyBTdGFydFRyaWdnZXJzIGF0IHN0YXJ0dXApXHJcbiAgICAgICAgbGV0IGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIoKGVsZW1lbnQpID0+IHsgcmV0dXJuIGVsZW1lbnQuYnJvd3NlTmFtZSA9PSBcIkN1cnJlbnRUcmNDb25maWdcIiB9KTtcclxuICAgICAgICBpZiAoY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzWzBdLnZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhUG9pbnRQYXJhbWV0ZXJzKGRhdGFwb2ludHMsIGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzWzBdLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YXBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlcyBvZiB0aGUgZGF0YXBvaW50IHBhcmFtZXRlcnMgd2l0aCB0aGUgdmFsdWVzIGZyb20gYSBqc29uIHN0cmluZyAoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZykgXHJcbiAgICAgKiBCVUdGSVggZm9yIG1pc3NpbmcgU3RhcnRUcmlnZ2VycyBhdCBzdGFydHVwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gZGF0YVBvaW50UGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmdcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlRGF0YVBvaW50UGFyYW1ldGVycyhkYXRhUG9pbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50VHJhY2VDb25maWcgPSBKU09OLnBhcnNlKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcpO1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgYWxsIGRhdGFwb2ludHNcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJhY2VDb25maWcuRGF0YVBvaW50cyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YVBvaW50UGFyYW1ldGVycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFQb2ludElEID0gKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50RGF0YVBvaW50ID0gY3VycmVudFRyYWNlQ29uZmlnLkRhdGFQb2ludHMuZmlsdGVyKChlbGVtZW50KSA9PiB7IHJldHVybiBlbGVtZW50LklEID09IGRhdGFQb2ludElEIH0pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudERhdGFQb2ludCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQb2ludFBhcmFtZXRlcnNbaW5kZXhdLnZhbHVlID0gY3VycmVudERhdGFQb2ludC5OYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVBvaW50UGFyYW1ldGVyc1tpbmRleF0udmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVwZGF0aW5nIG9mIHNvbWUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhcG9pbnQgaW5mb3JtYXRpb25zIG5vdCBwb3NzaWJsZSFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc0RhdGFQb2ludChwYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gRGF0YXBvaW50IHBhcmFtZXRlcnMgYmVnaW4gd2l0aCBcIkRhdGFQb2ludFwiIGluIHRoZSBwcm9wZXJ0aWVzIG5hbWVcclxuICAgICAgICBsZXQgcHJlZml4ID0gXCJEYXRhUG9pbnRcIjtcclxuICAgICAgICBpZiAocGFyYW1ldGVyLmJyb3dzZU5hbWUuc3Vic3RyKDAsIHByZWZpeC5sZW5ndGgpID09IHByZWZpeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSB0cmFjZSBjb250cm9sIHBhcmFtZXRlcnMgZnJvbSB0aGUgcGFyYW1ldGVyIHNldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZVRyYWNlQ29udHJvbFBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIGRhdGFwb2ludHNcclxuICAgICAgICBsZXQgZGF0YXBvaW50cyA9IG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudFBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5pc1RyYWNlQ29udHJvbFBhcmFtZXRlcihjb21wb25lbnRQYXJhbWV0ZXJzW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YXBvaW50cy5wdXNoKGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGFwb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNUcmFjZUNvbnRyb2xQYXJhbWV0ZXIocGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChwYXJhbWV0ZXIuYnJvd3NlTmFtZSA9PSBcIlRyYWNlU3RhdHVzXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogcmV0cmlldmVzIHRoZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgZnJvbSB0aGUgcGFyYW1ldGVyIHNldFxyXG4gICAgKlxyXG4gICAgKiBAc3RhdGljXHJcbiAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX1cclxuICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZUNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyBnZXQgdGhlIGNvbmZpZ3VyYXRpb24gbWV0YSBpbmZvc1xyXG4gICAgICAgIGxldCBjb25maWd1cmF0aW9uTWV0YUluZm87XHJcbiAgICAgICAgaWYgKChjb21wb25lbnRQYXJhbWV0ZXJzWzBdICE9IHVuZGVmaW5lZCkgJiYgKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpLk1ldGFDb25maWdDb25maWdQcm9wcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uZmlndXJhdGlvbk1ldGFJbmZvID0gKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpLk1ldGFDb25maWdDb25maWdQcm9wcy5Db25maWd1cmF0aW9uU3RydWN0dXJlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIGNvbmZpZ3VyYXRpb24gZGVmaW5pdGlvbnNcclxuICAgICAgICBsZXQgY29uZmlndXJhdGlvblBhcmFtZXRlcnMgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVQYXJhbWV0ZXJzRnJvbU1ldGFJbmZvKFtcIlBhcmFtZXRlclwiLCBcIkdyb3VwXCJdLCBjb25maWd1cmF0aW9uTWV0YUluZm8sIGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHJldHVybiBjb25maWd1cmF0aW9uUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpdmVzIHBhcmFtZXRlcnMgZGVjbGFyZWQgaW4gdGhlIG1ldGEgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXF1ZXN0ZUl0ZW1UeXBlc1xyXG4gICAgICogQHBhcmFtIHsqfSBwYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZXRyaWV2ZVBhcmFtZXRlcnNGcm9tTWV0YUluZm8ocmVxdWVzdGVJdGVtVHlwZXM6IHN0cmluZ1tdLCBwYXJhbWV0ZXJNZXRhSW5mbzogYW55LCBjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcblxyXG4gICAgICAgIC8vIGdldCByZXF1ZXN0ZWQgbWV0YSBpdGVtc1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVySXRlbXMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhwYXJhbWV0ZXJNZXRhSW5mbywgcmVxdWVzdGVJdGVtVHlwZXMpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBhdmFpbGFibGUgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCBwYXJhbWV0ZXJTZXQgPSB7fTtcclxuICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXJzLmZvckVhY2goKHBhcmFtZXRlcikgPT4geyBwYXJhbWV0ZXJTZXRbcGFyYW1ldGVyLmJyb3dzZU5hbWVdID0gcGFyYW1ldGVyOyB9KTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGRpY3Rpb25hcnkgb2YgbWV0YSBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJzID0ge307XHJcbiAgICAgICAgbWV0YVBhcmFtZXRlckl0ZW1zLmZvckVhY2goKG1ldGFQYXJhbWV0ZXIpID0+IHsgbWV0YVBhcmFtZXRlcnNbbWV0YVBhcmFtZXRlci5SZWZdID0gbWV0YVBhcmFtZXRlcjsgfSk7XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBwYXJhbWV0ZXJzIHdpdGggbWF0Y2hpbmcgbmFtZSBpbiB0aGUgbWV0YSBpbmZvXHJcbiAgICAgICAgbGV0IG1hdGNoaW5nUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFQYXJhbWV0ZXJzW2NvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lXSAhPT0gdW5kZWZpbmVkOyB9KTtcclxuXHJcbiAgICAgICAgLy8gcmVhZCBhbmQgYXNzaWduIHVuaXRzXHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnVwZGF0ZVBhcmFtZXRlcihtYXRjaGluZ1BhcmFtZXRlcnMsIG1ldGFQYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgICAgLy8gbm90aWZ5IGludmFsaWQgb3IgdW5rbm93biByZWZlcmVuY2VzXHJcbiAgICAgICAgbGV0IHVua25vd25QYXJhbWV0ZXJSZWZzID0gbWV0YVBhcmFtZXRlckl0ZW1zLmZpbHRlcigobWV0YVBhcmFtZXRlcikgPT4geyByZXR1cm4gbWV0YVBhcmFtZXRlci5SZWYgIT09IHVuZGVmaW5lZCAmJiBwYXJhbWV0ZXJTZXRbbWV0YVBhcmFtZXRlci5SZWZdID09PSB1bmRlZmluZWQ7IH0pO1xyXG4gICAgICAgIGlmICh1bmtub3duUGFyYW1ldGVyUmVmcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVQYXJhbWV0ZXJzRnJvbU1ldGFJbmZvIDogbWV0YSBpbmZvIHJlZmVyZW5jZXMgdW5rbm93biBwYXJhbWV0ZXJzICVvICVvXCIsIHVua25vd25QYXJhbWV0ZXJSZWZzLCBwYXJhbWV0ZXJTZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHdhdGNoYWJsZSBzdGF0ZXMgZGVjbGFyZWQgaW4gdGhlIG1ldGFJbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVxdWVzdGVJdGVtVHlwZXNcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW1ldGVyTWV0YUluZm9cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlV2F0Y2hhYmxlU3RhdGVzRnJvbU1ldGFJbmZvKHJlcXVlc3RlSXRlbVR5cGVzOiBzdHJpbmdbXSwgcGFyYW1ldGVyTWV0YUluZm86IGFueSwgY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgbGV0IHN0YXRlUGFyYW1ldGVycyA9IG5ldyBBcnJheTxNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyPigpO1xyXG5cclxuICAgICAgICAvLyBnZXQgcmVxdWVzdGVkIG1ldGEgaXRlbXNcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlckl0ZW1zID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMocGFyYW1ldGVyTWV0YUluZm8sIHJlcXVlc3RlSXRlbVR5cGVzKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGRpY3Rpb25hcnkgb2YgYXZhaWxhYmxlIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgcGFyYW1ldGVyU2V0ID0ge307XHJcbiAgICAgICAgY29tcG9uZW50UGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbWV0ZXIpID0+IHsgcGFyYW1ldGVyU2V0W3BhcmFtZXRlci5icm93c2VOYW1lXSA9IHBhcmFtZXRlcjsgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIHdhdGNoYWJsZSBzdGF0ZXNcclxuICAgICAgICBtZXRhUGFyYW1ldGVySXRlbXMuZm9yRWFjaCgobWV0YVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICBzdGF0ZVBhcmFtZXRlcnMucHVzaChuZXcgTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcihtZXRhUGFyYW1ldGVyLlJlZiwgbWV0YVBhcmFtZXRlci5JY29uRXhwcmVzc2lvbiwgbWV0YVBhcmFtZXRlci5XYXRjaGFibGVWYXJpYWJsZXNNYXBwaW5nICxtZXRhUGFyYW1ldGVyLkljb24pKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RhdGVQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZWFkUGFyYW1ldGVycyhwYXJhbWV0ZXJNZXRhSW5mbzogYW55LCBwYXJhbWV0ZXI6IEFycmF5PHN0cmluZz4pOiBvYmplY3Qge1xyXG4gICAgICAgIC8vIGdldCByZXF1ZXN0ZWQgbWV0YSBpdGVtc1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVySXRlbXMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhwYXJhbWV0ZXJNZXRhSW5mbywgcGFyYW1ldGVyKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGRpY3Rpb25hcnkgb2YgbWV0YSBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJzID0ge307XHJcbiAgICAgICAgbWV0YVBhcmFtZXRlckl0ZW1zLmZvckVhY2goKG1ldGFQYXJhbWV0ZXIpID0+IHsgbWV0YVBhcmFtZXRlcnNbbWV0YVBhcmFtZXRlci5SZWZdID0gbWV0YVBhcmFtZXRlcjsgfSk7XHJcbiAgICAgICAgcmV0dXJuIG1ldGFQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZWFkTWVzc2FnZVBhcmFtZXRlcnMocGFyYW1ldGVyTWV0YUluZm86IGFueSk6IG9iamVjdCB7XHJcblxyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJzW1wiaW50QXJyYXlTZXZlcml0eVwiXSA9IHsgUmVmOiBcImludEFycmF5U2V2ZXJpdHlcIiB9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJzW1wic3RyQXJyYXlEZXNjcmlwdGlvblwiXSA9IHsgUmVmOiBcInN0ckFycmF5RGVzY3JpcHRpb25cIiB9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJzW1wic3RyQXJyYXlFdmVudElEXCJdID0geyBSZWY6IFwic3RyQXJyYXlFdmVudElEXCIgfTtcclxuICAgICAgICBtZXRhUGFyYW1ldGVyc1tcInN0ckFycmF5VGltZVwiXSA9IHsgUmVmOiBcInN0ckFycmF5VGltZVwiIH07XHJcbiAgICAgICAgcmV0dXJuIG1ldGFQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgZW5naW5lZXJpbmcgdW5pdHMgZnJvbSB0aGUgbWV0YSBpbmZvIGFuZCBhc3NpZ25zIGl0IHRvIHRoZSBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHt7fX0gbWV0YVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZVBhcmFtZXRlcihjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBtZXRhUGFyYW1ldGVyczoge30pIHtcclxuICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXJzLmZvckVhY2goKGNvbXBvbmVudFBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8udXBkYXRlUGFyYW1ldGVyRW5naW5lZXJpbmdVbml0KG1ldGFQYXJhbWV0ZXJzLCBjb21wb25lbnRQYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8udXBkYXRlUGFyYW1ldGVyRGlzcGxheU5hbWUobWV0YVBhcmFtZXRlcnMsIGNvbXBvbmVudFBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXJJc1JlYWRPbmx5KG1ldGFQYXJhbWV0ZXJzLCBjb21wb25lbnRQYXJhbWV0ZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgcGFyYW1ldGVycyBkaXNwbGF5IG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3t9fSBtZXRhUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZVBhcmFtZXRlckRpc3BsYXlOYW1lKG1ldGFQYXJhbWV0ZXJzOiB7fSwgY29tcG9uZW50UGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IGFueSB7XHJcbiAgICAgICAgaWYgKG1ldGFQYXJhbWV0ZXJzW2NvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lXS5EaXNwbGF5TmFtZSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIuZGlzcGxheU5hbWUgPSBtZXRhUGFyYW1ldGVyc1tjb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZV0uRGlzcGxheU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgcGFyYW1ldGVycyByZWFkT25seSBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHt7fX0gbWV0YVBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1cGRhdGVQYXJhbWV0ZXJJc1JlYWRPbmx5KG1ldGFQYXJhbWV0ZXJzOiB7fSwgY29tcG9uZW50UGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IGFueSB7XHJcbiAgICAgICAgaWYgKG1ldGFQYXJhbWV0ZXJzW2NvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lXS5Jc1JlYWRPbmx5IFxyXG4gICAgICAgICAgICAmJiAobWV0YVBhcmFtZXRlcnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdLklzUmVhZE9ubHkgPT0gXCJ0cnVlXCJcclxuICAgICAgICAgICAgfHwgbWV0YVBhcmFtZXRlcnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdLklzUmVhZE9ubHkgPT0gdHJ1ZSkpe1xyXG4gICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIuaXNSZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtZXRlci5pc1JlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgZW5naW5lZXJpbmcgdW5pdHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHt7fX0gbWV0YVBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVQYXJhbWV0ZXJFbmdpbmVlcmluZ1VuaXQobWV0YVBhcmFtZXRlcnM6IHt9LCBjb21wb25lbnRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgaWYgKG1ldGFQYXJhbWV0ZXJzW2NvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lXS5FVSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIuZW5naW5lZXJpbmdVbml0ID0gbWV0YVBhcmFtZXRlcnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdLkVVO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGVudW0gdmFsdWVzIGlmIGF2YWlsYWJsZSBhbmQgYXNzaWducyBpdCB0byB0aGUgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gcGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7Kn0gdHJ1ZSBpZiB0aGUgcGFyYW1ldGVyIHVzZXMgYW4gZW51bSBmb3IgaXRzIHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWFkUGFyYW1ldGVyRW51bXMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG5cclxuICAgICAgICAvLyBnZXQgYXZhaWxhYmxlIGVudW0gcGFyYW1ldGVyIGRlZnMgXHJcbiAgICAgICAgbGV0IGVudW1QYXJhbWV0ZXJUeXBlRGVmaW5pdGlvbnMgPSBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5nZXRJbnN0YW5jZSgpLnJlYWRFbnVtUGFyYW1ldGVyRGVmaW5pdGlvbnMoY29tcG9uZW50UGFyYW1ldGVycywgKDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpO1xyXG4gICAgICAgIC8vIGZpbmQgbWF0Y2hpbmcgcGFyYW1ldGVyXHJcbiAgICAgICAgbGV0IG1hdGNoaW5nUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIGVudW1QYXJhbWV0ZXJUeXBlRGVmaW5pdGlvbnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdIH0pO1xyXG4gICAgICAgIC8vIHNldCB0aGUgZW51bSBkZWZpbml0aW9ucyBmb3IgdGhlIG1hdGNoaW5nIHBhcmFtZXRlcnNcclxuICAgICAgICBtYXRjaGluZ1BhcmFtZXRlcnMuZm9yRWFjaCgobWF0Y2hpbmdQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBlbnVtIGRlZmluaXRpb25cclxuICAgICAgICAgICAgbWF0Y2hpbmdQYXJhbWV0ZXIuZW51bVR5cGUgPSBlbnVtUGFyYW1ldGVyVHlwZURlZmluaXRpb25zW21hdGNoaW5nUGFyYW1ldGVyLmJyb3dzZU5hbWVdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbyAtIHNldCBlbnVtIGluZm8gJW8gZm9yICVvXCIsIG1hdGNoaW5nUGFyYW1ldGVyLmVudW1UeXBlLCAoPGFueT5tYXRjaGluZ1BhcmFtZXRlci5jb21wb25lbnQpLmJyb3dzZU5hbWUgKyBcIi5cIiArIG1hdGNoaW5nUGFyYW1ldGVyLmJyb3dzZU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogcHJvdmlkZXMgZGVzY3JpcHRpdmUgaW5mb3JtYXRpb24gZm9yIGEgbWV0aG9kXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9JbmZvXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZXMgdGhlIG1ldGhvZCBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVycyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogYW55IHtcclxuXHJcbiAgICAgICAgLy8gc2tpcCBpZiB0aGUgbWV0aG9kIGhhcyBubyBwYXJhbWV0ZXJzIHRvIGluaXRpYWxpemUuXHJcbiAgICAgICAgaWYgKG1ldGhvZC5pbnB1dFBhcmFtZXRlcnMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0YSBkYXRhXHJcbiAgICAgICAgbGV0IG1ldGhvZE1ldGFJbmZvID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLmdldE1ldGhvZE1ldGFJbmZvKG1ldGhvZCk7XHJcblxyXG4gICAgICAgIGlmIChtZXRob2RNZXRhSW5mbykge1xyXG5cclxuICAgICAgICAgICAgLy8gZmluZCBhbmQgaW5pdGlhbGl6ZSBtZXRob2QgcGFyYW1ldGVyIGRlZmF1bHQgdmFsdWVzXHJcbiAgICAgICAgICAgIG1ldGhvZC5pbnB1dFBhcmFtZXRlcnMuZm9yRWFjaCgobWV0aG9kSW5wdXRQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlckRlZmF1bHRzKG1ldGhvZCwgbWV0aG9kSW5wdXRQYXJhbWV0ZXIsIG1ldGhvZE1ldGFJbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgcmVzcGVjdGl2ZWx5IGluaXRpYWxpemVzIHRoZSBtZXRob2QgaW5wdXQgcGFyYW1ldGVycyB3aXRoIGRlZmF1bHRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0aG9kTWV0YUluZm9cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlTWV0aG9kSW5wdXRQYXJhbWV0ZXJEZWZhdWx0cyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRob2RJbnB1dFBhcmFtZXRlcjogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIG1ldGhvZE1ldGFJbmZvOiBhbnksKSB7XHJcbiAgICAgICAgbGV0IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLmdldE1ldGhvZFBhcmFtZXRlck1ldGFJbmZvKG1ldGhvZE1ldGFJbmZvLCBtZXRob2RJbnB1dFBhcmFtZXRlcik7XHJcbiAgICAgICAgaWYgKG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBhc3NpZ24gZGVmYXVsdCB2YWx1ZSBpZiBkZWZpbmVkIC4uLlxyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kSW5wdXRQYXJhbWV0ZXJEZWZhdWx0VmFsdWUobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8sIG1ldGhvZElucHV0UGFyYW1ldGVyLCBtZXRob2QpO1xyXG5cclxuICAgICAgICAgICAgLy8gYXNzaWduIGVuZ2luZWVyaW5nIHVuaXQgaWYgZGVmaW5lZC5cclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnVwZGF0ZU1ldGhvZFBhcmFtZXRlckVuZ2luZWVyaW5nVW5pdChtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbywgbWV0aG9kSW5wdXRQYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gYXNzaWduIGRpc3BsYXkgbmFtZVxyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kUGFyYW1ldGVyRGlzcGxheU5hbWUobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8sIG1ldGhvZElucHV0UGFyYW1ldGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vYXNzaWduIGZpbHRlciBpZiBkZWZpbmVkXHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RQYXJhbWV0ZXJGaWx0ZXIobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8sIG1ldGhvZElucHV0UGFyYW1ldGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8uaW5pdGlhbGl6ZUlucHV0UGFyYW1ldGVyRGVmYXVsdFZhbHVlcyA6IE5vIG1ldGEgaW5mbyBkZWZpbmVkIGZvciBmb3IgbWV0aG9kIHBhcmFtZXRlciAlb1wiLCBtZXRob2QuYnJvd3NlTmFtZSArIFwiLlwiICsgbWV0aG9kSW5wdXRQYXJhbWV0ZXIubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGZpbHRlciBpbmZvcm1hdGlvbiB0byBtZXRob2QgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm9cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJ9IG1ldGhvZElucHV0UGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRmlsdGVyKG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcik6IGFueSB7XHJcbiAgICAgICAgbGV0IHBhcmFtZXRlckhhc0ZpbHRlciA9IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvLlBhcmFtZXRlci5oYXNPd25Qcm9wZXJ0eShcIkZpbHRlclwiKTtcclxuICAgICAgICBpZiAocGFyYW1ldGVySGFzRmlsdGVyKSB7XHJcbiAgICAgICAgICAgIG1ldGhvZElucHV0UGFyYW1ldGVyLmZpbHRlciA9IG5ldyBQYXJhbWV0ZXJGaWx0ZXIobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkZpbHRlci5QYXJhbWV0ZXJSZWYsIG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvLlBhcmFtZXRlci5GaWx0ZXIuUGFyYW1ldGVyVmFsdWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkaXNwbGF5IGZyb20gbWV0YSBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRGlzcGxheU5hbWUobWV0aG9kUGFyYW1ldGVyTWV0YUluZm86IGFueSwgbWV0aG9kSW5wdXRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKTogYW55IHtcclxuICAgICAgICBpZiAobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkRpc3BsYXlOYW1lKSB7XHJcbiAgICAgICAgICAgIG1ldGhvZElucHV0UGFyYW1ldGVyLmRpc3BsYXlOYW1lID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkRpc3BsYXlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGVuZ2luZWVyaW5nIHVuaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRW5naW5lZXJpbmdVbml0KG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcikge1xyXG4gICAgICAgIGlmIChtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRVUpIHtcclxuICAgICAgICAgICAgbWV0aG9kSW5wdXRQYXJhbWV0ZXIuZW5naW5lZXJpbmdVbml0ID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkVVO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRlZmF1bHQgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlckRlZmF1bHRWYWx1ZShtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbzogYW55LCBtZXRob2RJbnB1dFBhcmFtZXRlcjogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICBsZXQgcGFyYW1ldGVySGFzRGVmYXVsdFZhbHVlID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLmhhc093blByb3BlcnR5KFwiRGVmYXVsdFZhbHVlXCIpO1xyXG4gICAgICAgIGlmIChwYXJhbWV0ZXJIYXNEZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICAgICAgbWV0aG9kSW5wdXRQYXJhbWV0ZXIudmFsdWUgPSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gbWV0aG9kIHBhcmFtZXRlcnMgbXVzdCBoYXZlIGRlZmF1bHQgdmFsdWVzIGRlZmluZWRcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5pbml0aWFsaXplSW5wdXRQYXJhbWV0ZXJEZWZhdWx0VmFsdWVzIDogTm8gZGVmYXVsdCB2YWx1ZSBkZWZpbmVkIGZvciBtZXRob2QgcGFyYW1ldGVyICVvXCIsIG1ldGhvZC5icm93c2VOYW1lICsgXCIuXCIgKyBtZXRob2RJbnB1dFBhcmFtZXRlci5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBtZXRhIGluZm8gZm9yIGEgbWV0aG9kIHBhcmFtZXRlclxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldE1ldGhvZFBhcmFtZXRlck1ldGFJbmZvKG1ldGhvZE1ldGFJbmZvOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbyA9IHVuZGVmaW5lZDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgcGFyYW1ldGVyIG1ldGEgaW5mbyBpZiBhdmFpbGFibGVcclxuICAgICAgICBpZiAobWV0aG9kTWV0YUluZm8uUGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kUGFyYW1ldGVyTWV0YUluZm9zID0gbWV0aG9kTWV0YUluZm8uUGFyYW1ldGVycy5maWx0ZXIoKG1ldGhvZE1ldGFJdGVtUGFyYW1ldGVySXRlbSkgPT4geyByZXR1cm4gbWV0aG9kTWV0YUl0ZW1QYXJhbWV0ZXJJdGVtLlBhcmFtZXRlci5SZWYgPT09IG1ldGhvZElucHV0UGFyYW1ldGVyLm5hbWU7IH0pO1xyXG4gICAgICAgICAgICBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbyA9IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvcy5sZW5ndGggPT09IDEgPyBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb3NbMF0gOiB1bmRlZmluZWQ7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgbWV0YSBpbmZvIGZvciB0aGUgcmVxdWVzdGVkIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldE1ldGhvZE1ldGFJbmZvKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBhbnkge1xyXG4gICAgICAgIGxldCBtZXRob2RNZXRhSW5mbyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBvbmVudE1ldGFEYXRhOiBhbnkgPSAoPE1hcHBDb2NrcGl0Q29tcG9uZW50Pm1ldGhvZC5jb21wb25lbnQpLm1ldGFEYXRhO1xyXG4gICAgICAgIGlmIChjb21wb25lbnRNZXRhRGF0YSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZE1ldGFJbmZvO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZXQgdGhlIG1ldGhvZCBpbmZvIGZyb20gbWV0YSBkYXRhXHJcbiAgICAgICAgbGV0IG1ldGhvZE1ldGFJdGVtczogYW55W10gPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhjb21wb25lbnRNZXRhRGF0YS5NZXRhQ29uZmlnQ29tbWFuZHMuQ29tbWFuZHNTdHJ1Y3R1cmUsIFtcIkNvbW1hbmRcIl0pO1xyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0YSBpbmZvIGZvciB0aGUgcmVxdWVzdGVkIG1ldGhvZFxyXG4gICAgICAgIGxldCBtZXRob2RNZXRhSW5mb3MgPSBtZXRob2RNZXRhSXRlbXMuZmlsdGVyKChtZXRob2RNZXRhSXRlbSkgPT4geyByZXR1cm4gbWV0aG9kTWV0YUl0ZW0uUmVmID09PSBtZXRob2QuYnJvd3NlTmFtZTsgfSk7XHJcbiAgICAgICAgbWV0aG9kTWV0YUluZm8gPSBtZXRob2RNZXRhSW5mb3MubGVuZ3RoID09PSAxID8gbWV0aG9kTWV0YUluZm9zWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBtZXRob2RNZXRhSW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIG1ldGhvZCBwYXJhbWV0ZXJzIGNvbnRhaW5lZCBpbiB0aGUgbWV0YSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0aG9kTWV0YUl0ZW1cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJ9IG1ldGhvZElucHV0UGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRNYXRjaGluZ01ldGhvZFBhcmFtZXRlcnMobWV0aG9kTWV0YUl0ZW06IGFueSwgbWV0aG9kSW5wdXRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZE1ldGFJdGVtLlBhcmFtZXRlcnMuZmlsdGVyKChtZXRob2RNZXRhSXRlbVBhcmFtZXRlckl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGlzTWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIgPSBtZXRob2RNZXRhSXRlbVBhcmFtZXRlckl0ZW0uUGFyYW1ldGVyLlJlZiA9PT0gbWV0aG9kSW5wdXRQYXJhbWV0ZXIubmFtZVxyXG4gICAgICAgICAgICAgICAgJiYgbWV0aG9kTWV0YUl0ZW1QYXJhbWV0ZXJJdGVtLlBhcmFtZXRlci5EZWZhdWx0VmFsdWVcclxuICAgICAgICAgICAgICAgICYmIG1ldGhvZE1ldGFJdGVtUGFyYW1ldGVySXRlbS5QYXJhbWV0ZXIuRGVmYXVsdFZhbHVlICE9PSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNNYXRjaGluZ01ldGhvZFBhcmFtZXRlcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgZXhlY3V0YWJsZSBtZXRob2RzIGZyb20gdGhlIGNvbXBvbmVudCBtZXRob2Qgc2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfSBjb21wb25lbnRNZXRob2RzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGRhdGFUb1JldHJpZXZlXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlRXhlY3V0YWJsZU1ldGhvZHMoY29tcG9uZW50TWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSwgZGF0YVRvUmV0cmlldmU6IEFycmF5PHN0cmluZz4pOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdIHtcclxuICAgICAgICBsZXQgbWV0YUNvbmZpZyA9IGRhdGFUb1JldHJpZXZlWzBdO1xyXG4gICAgICAgIGxldCBtZXRhU3RydWN0dXJlID0gZGF0YVRvUmV0cmlldmVbMV07XHJcbiAgICAgICAgbGV0IG1ldGFOYW1lID0gZGF0YVRvUmV0cmlldmVbMl07XHJcblxyXG4gICAgICAgIGxldCBleGVjdXRhYmxlTWV0aG9kcyA9IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPigpO1xyXG4gICAgICAgIGlmICgoY29tcG9uZW50TWV0aG9kc1swXSA9PSB1bmRlZmluZWQpIHx8XHJcbiAgICAgICAgICAgICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKSA9PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRNZXRob2RzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXhlY3V0YWJsZU1ldGhvZHM7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb21tYW5kcyBtZXRhIGluZm9zXHJcbiAgICAgICAgbGV0IG1ldGhvZHNNZXRhSW5mbyA9ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKVttZXRhQ29uZmlnXVttZXRhU3RydWN0dXJlXTtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIG1ldGhvZCBkZWZpbml0aW9uc1xyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKG1ldGhvZHNNZXRhSW5mbywgW21ldGFOYW1lXSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBkaWN0aW9uYXJ5IG9mIGF2YWlsYWJsZSBtZXRob2RzXHJcbiAgICAgICAgbGV0IG1ldGhvZFNldCA9IHt9O1xyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kU2V0ID0ge307XHJcbiAgICAgICAgY29tcG9uZW50TWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kU2V0W21ldGhvZC5icm93c2VOYW1lXSA9IG1ldGhvZCB9KTtcclxuICAgICAgICBtZXRhTWV0aG9kcy5mb3JFYWNoKChtZXRhTWV0aG9kKSA9PiB7IG1ldGFNZXRob2RTZXRbbWV0YU1ldGhvZC5SZWZdID0gbWV0YU1ldGhvZCB9KTtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgbWV0aG9kcyB3aXRoIG1hdGNoaW5nIG5hbWUgaW4gdGhlIG1ldGEgaW5mb1xyXG4gICAgICAgIGV4ZWN1dGFibGVNZXRob2RzID0gbWV0YU1ldGhvZHMuZmlsdGVyKChtZXRhTWV0aG9kKSA9PiB7IHJldHVybiBtZXRob2RTZXRbbWV0YU1ldGhvZC5SZWZdICE9PSB1bmRlZmluZWQgfSkubWFwKChtZXRhTWV0aG9kKSA9PiB7IHJldHVybiBtZXRob2RTZXRbbWV0YU1ldGhvZC5SZWZdIH0pO1xyXG5cclxuICAgICAgICAvLyBhc3NpZ24gdGhlIGRpc3BsYXkgbmFtZVxyXG4gICAgICAgIGV4ZWN1dGFibGVNZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4geyB0aGlzLnVwZGF0ZU1ldGhvZERpc3BsYXlOYW1lKG1ldGhvZCwgbWV0YU1ldGhvZFNldFttZXRob2QuYnJvd3NlTmFtZV0pIH0pXHJcblxyXG4gICAgICAgIC8vIG5vdGlmeSBpbnZhbGlkIG9yIHVua25vd24gbWV0aG9kc1xyXG4gICAgICAgIGxldCB1bmtub3duTWV0aG9kcyA9IG1ldGFNZXRob2RzLmZpbHRlcigobWV0YU1ldGhvZCkgPT4geyByZXR1cm4gbWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSA9PT0gdW5kZWZpbmVkIH0pO1xyXG4gICAgICAgIGlmICh1bmtub3duTWV0aG9kcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ucmV0cmlldmVFeGVjdXRhYmxlTWV0aG9kcyA6IG1ldGEgaW5mbyByZWZlcmVuY2VzIHVua25vd24gbWV0aG9kcyAlb1wiLCB1bmtub3duTWV0aG9kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBleGVjdXRhYmxlTWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBxdWljayBjb21tYW5kcyBtZXRob2RzIGZyb20gbWV0YUluZm9cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZGF0YVRvUmV0cmlldmVcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVRdWlja0NvbW1hbmRzKGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10sIGRhdGFUb1JldHJpZXZlOiBBcnJheTxzdHJpbmc+KTogTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgbGV0IG1ldGFDb25maWcgPSBkYXRhVG9SZXRyaWV2ZVswXTtcclxuICAgICAgICBsZXQgbWV0YVN0cnVjdHVyZSA9IGRhdGFUb1JldHJpZXZlWzFdO1xyXG4gICAgICAgIGxldCBtZXRhTmFtZSA9IGRhdGFUb1JldHJpZXZlWzJdO1xyXG5cclxuICAgICAgICBsZXQgcXVpY2tDb21tYW5kcyA9IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPigpO1xyXG4gICAgICAgIGlmICgoY29tcG9uZW50TWV0aG9kc1swXSA9PSB1bmRlZmluZWQpIHx8XHJcbiAgICAgICAgICAgICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKSA9PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRNZXRob2RzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcXVpY2tDb21tYW5kcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgY29tbWFuZHMgbWV0YSBpbmZvc1xyXG4gICAgICAgIGxldCBtZXRob2RzTWV0YUluZm8gPSAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudE1ldGhvZHNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSlbbWV0YUNvbmZpZ11bbWV0YVN0cnVjdHVyZV07XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBtZXRob2QgZGVmaW5pdGlvbnNcclxuICAgICAgICBsZXQgbWV0YU1ldGhvZHMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhtZXRob2RzTWV0YUluZm8sIFttZXRhTmFtZV0pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBhdmFpbGFibGUgbWV0aG9kc1xyXG4gICAgICAgIGxldCBtZXRob2RTZXQgPSB7fTtcclxuXHJcbiAgICAgICAgY29tcG9uZW50TWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kU2V0W21ldGhvZC5icm93c2VOYW1lXSA9IG1ldGhvZCB9KTtcclxuICAgICAgICBtZXRhTWV0aG9kcy5mb3JFYWNoKChtZXRhTWV0aG9kKSA9PiB7IFxyXG4gICAgICAgICAgICBxdWlja0NvbW1hbmRzLnB1c2gobmV3IE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyKG1ldGFNZXRob2QuUmVmLCBtZXRhTWV0aG9kLlRvb2x0aXAsIG1ldGFNZXRob2QuSW1hZ2VOYW1lKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIG5vdGlmeSBpbnZhbGlkIG9yIHVua25vd24gbWV0aG9kc1xyXG4gICAgICAgIGxldCB1bmtub3duTWV0aG9kcyA9IHF1aWNrQ29tbWFuZHMuZmlsdGVyKChxdWlja0NvbW1hbmQpID0+IHsgcmV0dXJuIG1ldGhvZFNldFtxdWlja0NvbW1hbmQubmFtZV0gPT09IHVuZGVmaW5lZCB9KTtcclxuICAgICAgICBpZiAodW5rbm93bk1ldGhvZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnJldHJpZXZlUXVpY2tDb21tYW5kcyA6IG1ldGEgaW5mbyByZWZlcmVuY2VzIHVua25vd24gbWV0aG9kcyAlb1wiLCB1bmtub3duTWV0aG9kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBxdWlja0NvbW1hbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZWFkTWV0aG9kcyhtZXRhSW5mbzogYW55LCBwcm9wZXJ0eTogQXJyYXk8c3RyaW5nPiwgbWV0aG9kOiBBcnJheTxzdHJpbmc+KTogb2JqZWN0IHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGFDb25maWcgPSBwcm9wZXJ0eVswXTtcclxuICAgICAgICBsZXQgbWV0YUNvbmZpZ1N0cnVjdHVyZSA9IHByb3BlcnR5WzFdO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGNvbW1hbmRzIG1ldGEgaW5mb3NcclxuICAgICAgICBpZiAobWV0YUluZm9bbWV0YUNvbmZpZ10gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgbGV0IG1ldGhvZHNNZXRhSW5mbyA9IG1ldGFJbmZvW21ldGFDb25maWddW21ldGFDb25maWdTdHJ1Y3R1cmVdO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgbWV0aG9kIGRlZmluaXRpb25zXHJcbiAgICAgICAgbGV0IG1ldGFNZXRob2RzID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMobWV0aG9kc01ldGFJbmZvLCBtZXRob2QpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBhdmFpbGFibGUgbWV0aG9kc1xyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kU2V0ID0ge307XHJcbiAgICAgICAgbWV0YU1ldGhvZHMuZm9yRWFjaCgobWV0YU1ldGhvZCkgPT4geyBtZXRhTWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSA9IG1ldGFNZXRob2QgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRhTWV0aG9kU2V0O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgYSBtZXRob2RzIGRpc3BsYXkgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHBhcmFtIHsqfSBhcmcxXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZU1ldGhvZERpc3BsYXlOYW1lKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIG1ldGFNZXRob2RJbmZvOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmIChtZXRhTWV0aG9kSW5mbyAmJiBtZXRhTWV0aG9kSW5mby5EaXNwbGF5TmFtZSkge1xyXG4gICAgICAgICAgICBtZXRob2QuZGlzcGxheU5hbWUgPSBtZXRhTWV0aG9kSW5mby5EaXNwbGF5TmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhbmQgdXBkYXRlcyBtZXRob2QgcGFyYW1ldGVyIGVudW1zXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlYWRNZXRob2RQYXJhbWV0ZXJFbnVtcyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRhRGF0YTogYW55KTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZFBhcmFtZXRlcnMgPSBtZXRob2QuaW5wdXRQYXJhbWV0ZXJzO1xyXG5cclxuICAgICAgICAvLyBnZXQgYXZhaWxhYmxlIGVudW0gbWV0aG9kIHBhcmFtZXRlciBkZWZzIFxyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kUGFyYW1ldGVyRW51bVR5cGVEZWZpbml0aW9ucyA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmdldEluc3RhbmNlKCkucmVhZE1ldGFFbnVtTWV0aG9kUGFyYW1ldGVyRGVmaW5pdGlvbnMobWV0aG9kLCBtZXRhRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgbWF0Y2hpbmcgcGFyYW1ldGVyXHJcbiAgICAgICAgbGV0IG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVycyA9IG1ldGhvZFBhcmFtZXRlcnMuZmlsdGVyKChtZXRob2RQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFNZXRob2RQYXJhbWV0ZXJFbnVtVHlwZURlZmluaXRpb25zW21ldGhvZFBhcmFtZXRlci5uYW1lXSB9KTtcclxuICAgICAgICAvLyBzZXQgdGhlIGVudW0gZGVmaW5pdGlvbnMgZm9yIHRoZSBtYXRjaGluZyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXJzLmZvckVhY2goKG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZW51bSBkZWZpbml0aW9uXHJcbiAgICAgICAgICAgIG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVyLmVudW1UeXBlID0gbWV0YU1ldGhvZFBhcmFtZXRlckVudW1UeXBlRGVmaW5pdGlvbnNbbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIubmFtZV07XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIC0gc2V0IGVudW0gaW5mbyAlbyBmb3IgJW9cIiwgbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIuZW51bVR5cGUsIG1ldGhvZC5icm93c2VOYW1lICsgXCIuXCIgKyBtYXRjaGluZ01ldGhvZFBhcmFtZXRlci5uYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbywgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0iXX0=