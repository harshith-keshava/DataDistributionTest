var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../online/mappCockpitComponent", "../../online/mappCockpitComponentReflection", "../../../framework/command", "./traceDataReader", "./traceConfig/traceConfigData", "./traceConfig/traceConfigExport", "./traceConfig/traceConfigImport", "../../../framework/componentHub/bindings/bindings", "../../../framework/componentHub/bindings/bindingDeclarations"], function (require, exports, mappCockpitComponent_1, mappCockpitComponentReflection_1, command_1, traceDataReader_1, traceConfigData_1, traceConfigExport_1, traceConfigImport_1, bindings_1, Binding) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Defines the browsenames of the trace control methods on the opc ua server (e.g. "Activate")
     *
     * @class TraceMethodIds
     */
    var TraceMethodIds = /** @class */ (function () {
        function TraceMethodIds() {
        }
        TraceMethodIds.Activate = "Activate";
        TraceMethodIds.ForceStop = "ForceStop";
        TraceMethodIds.ForceStart = "ForceStart";
        TraceMethodIds.SaveTraceConfig = "SaveTraceConfig";
        TraceMethodIds.Reset = "Reset";
        TraceMethodIds.RemoveDataPoint = "RemoveDataPoint";
        TraceMethodIds.RemoveStartTrigger1 = "RemoveStartTrigger1";
        TraceMethodIds.RemoveStartTrigger2 = "RemoveStartTrigger2";
        TraceMethodIds.AddDataPoint = "AddDataPoint";
        TraceMethodIds.SetStartTrigger = "SetStartTrigger";
        return TraceMethodIds;
    }());
    var TraceControl = /** @class */ (function () {
        /**
         * Creates an instance of TraceControl.
         * @param {MappCockpitDiagnosticProvider} diagnosticProvider
         * @memberof TraceControl
         */
        function TraceControl(diagnosticProvider) {
            this._actualTraceState = "";
            this._traceDataLoading = false;
            this._diagnosticProvider = diagnosticProvider;
            this._traceDataReader = new traceDataReader_1.MappCockpitTraceDataReader(diagnosticProvider);
            this.createComponentBindings();
        }
        ;
        /**
         * Creates the bindings to other components
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.createComponentBindings = function () {
            bindings_1.Bindings.createByDecl(Binding.Traces.TraceData.Load, this, "invokeLoadTraceData", "");
            bindings_1.Bindings.createByDecl(Binding.Traces.TraceData.Loaded, this, "", "onTraceDataLoaded");
            bindings_1.Bindings.createByDecl(Binding.Traces.TraceData.LoadingError, this, "", "onErrorLoadingTraceData");
            bindings_1.Bindings.createByDecl(Binding.Traces.State, this, "", "onTraceStateChanged");
            bindings_1.Bindings.createByDecl(Binding.Traces.TraceData.DataAvailable, this, "", "onTraceDataAvailable");
            bindings_1.Bindings.createByDecl(Binding.Traces.ControlInterface, this, "", "updateTraceControlInterface", false);
        };
        /**
         * Initializes the TraceControl instance
         *
         * @param {MappCockpitTraceComponent} traceComponent
         * @returns {Promise<any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.initialize = function (traceComponent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._traceComponent = traceComponent;
                    // create commands
                    this.createCommands();
                    this.observeTraceState(this._traceComponent.mappCockpitComponent.parameters);
                    this.updateTraceControlInterface(this);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Updates the trace control interface
         *
         * @private
         * @param {ITraceComponentControl} traceComponentControl
         * @memberof TraceControl
         */
        TraceControl.prototype.updateTraceControlInterface = function (traceControl) {
            // BINDINGSOURCE: method stub to make the passed data bindable
        };
        /**
         * Creates commands exposed by trace control
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.createCommands = function () {
            this._commandActivate = command_1.Command.create(this, this.executeCommandActivate());
            this._commandForceStart = command_1.Command.create(this, this.executeCommandForceStart());
            this._commandForceStop = command_1.Command.create(this, this.executeCommandForceStop());
            this._commandSaveConfiguration = command_1.Command.create(this, this.executeCommandSaveConfiguration());
            this._commandImportTraceConfiguration = command_1.Command.create(this, this.executeCommandImportTraceConfiguration());
            this._commandExportTraceConfiguration = command_1.Command.create(this, this.executeCommandExportTraceConfiguration());
        };
        Object.defineProperty(TraceControl.prototype, "commandActivate", {
            get: function () {
                return this._commandActivate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandForceStart", {
            get: function () {
                return this._commandForceStart;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandForceStop", {
            get: function () {
                return this._commandForceStop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandSaveConfiguration", {
            get: function () {
                return this._commandSaveConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandImportTraceConfiguration", {
            get: function () {
                return this._commandImportTraceConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandExportTraceConfiguration", {
            get: function () {
                return this._commandExportTraceConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Processes the activate command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandActivate = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                _this.transferDataToTarget()
                    .then(function () {
                    return _this.executeMethod(_this.getTraceMethod(TraceMethodIds.Activate));
                })
                    .then(function () {
                    commandResponse.executed();
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Processes the force stop command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandForceStop = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                _this.executeMethod(_this.getTraceMethod(TraceMethodIds.ForceStop))
                    .then(function () {
                    commandResponse.executed();
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Processes the force start command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandForceStart = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                _this.executeMethod(_this.getTraceMethod(TraceMethodIds.ForceStart))
                    .then(function () {
                    commandResponse.executed();
                })
                    .catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Processes the save configuration command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandSaveConfiguration = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                _this.transferDataToTarget()
                    .then(function () {
                    return _this.executeMethod(_this.getTraceMethod(TraceMethodIds.SaveTraceConfig));
                })
                    .then(function () {
                    commandResponse.executed();
                })
                    .catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Invokes loading trace data
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.invokeLoadTraceData = function () {
            var _this = this;
            if (!this._traceDataLoading && this._actualTraceState == "23") {
                this._traceDataLoading = true;
                this._traceDataReader.requestLoadTraceDataFromTarget().then(function (traceData) {
                    // confirm loading trace data successfully
                    _this.onTraceDataLoaded(traceData);
                    _this._traceDataLoading = false;
                }).catch(function (error) {
                    // notify loading error
                    _this.onErrorLoadingTraceData(error);
                    _this._traceDataLoading = false;
                });
            }
            else {
                this.onErrorLoadingTraceData("trace data loading already in progress!");
            }
        };
        /**
         * Confirms trace data loaded
         *
         * @memberof TraceControl
         */
        TraceControl.prototype.onTraceDataLoaded = function (traceData) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        /**
         * Trace data loading triggered an error
         *
         * @param {*} error
         * @memberof TraceControlProvider
         */
        TraceControl.prototype.onErrorLoadingTraceData = function (error) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        /**
         * Processes the import trace configuration command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandImportTraceConfiguration = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                try {
                    _this.importTraceConfiguration(commandPars);
                }
                catch (e) {
                    console.error(e);
                }
                commandResponse.executed();
            };
        };
        /**
         * Processes the export trace configuration command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandExportTraceConfiguration = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                var exportData = "";
                try {
                    exportData = _this.exportTraceConfiguration();
                }
                catch (e) {
                    console.error(e);
                }
                commandResponse.executed(exportData);
            };
        };
        /**
         * Returns the XmlData of the current trace configuration (for export)
         *
         * @private
         * @returns {string}
         * @memberof TraceControl
         */
        TraceControl.prototype.exportTraceConfiguration = function () {
            var traceConfigExport = new traceConfigExport_1.TraceConfigExport();
            return traceConfigExport.getXmlDataFromTraceConfig(this._traceComponent.traceConfigurationData);
        };
        /**
         * Imports the given xml data to the trace configuration
         *
         * @private
         * @param {string} fileData
         * @returns
         * @memberof TraceControl
         */
        TraceControl.prototype.importTraceConfiguration = function (fileData) {
            var traceConfigData = traceConfigImport_1.TraceConfigImport.getTraceConfigDataFromXml(fileData);
            if (traceConfigData != undefined) {
                this.setValuesOfTimingParameters(this._traceComponent.traceConfigurationData.timingParameters, traceConfigData.timingParameters);
                var traceConfigurationData = new traceConfigData_1.TraceConfigurationData(traceConfigData.dataPoints, this._traceComponent.traceConfigurationData.timingParameters, traceConfigData.startTriggers);
                // Update datapoint informations (e.g. axis name, description, ...)
                this._traceComponent.updateDataPointInformations(traceConfigurationData);
                // Set new trace configuration data to trace component
                this._traceComponent.traceConfigurationData = traceConfigurationData;
            }
        };
        /**
         * Sets the values of the timing parameters(from import) to the mappCockpitComponentParameters
         *
         * @private
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @param {{[key: string]: string}} values
         * @memberof TraceControl
         */
        TraceControl.prototype.setValuesOfTimingParameters = function (timingParameters, values) {
            for (var i = 0; i < timingParameters.length; i++) {
                var timingParam = timingParameters[i];
                var timingParamId = traceConfigExport_1.TraceConfigExport.getTimingParamId(timingParam.browseName);
                if (timingParamId != "") {
                    var newValue = values[timingParamId];
                    timingParam.value = newValue;
                }
            }
        };
        /**
         * Observes the trace state
         *
         * @private
         * @param {MappCockpitComponentParameter[]} parameters
         * @returns {*}
         * @memberof TraceControl
         */
        TraceControl.prototype.observeTraceState = function (parameters) {
            var _this = this;
            var traceStateParameter = parameters.filter(function (traceParameter) { return traceParameter.browseName === "TraceStatus"; })[0];
            traceStateParameter.valueSource.changed(function (newTraceStateValue, oldTraceStateValue) {
                _this._actualTraceState = traceStateParameter.value;
                // notify trace state change
                _this.onTraceStateChanged(traceStateParameter.value);
                if (newTraceStateValue != oldTraceStateValue) {
                    if (_this._actualTraceState == "23") {
                        // notify trace data available
                        _this.onTraceDataAvailable(true);
                    }
                }
            });
            // watch trace state changes
            this._diagnosticProvider.observeComponentModelItems(this, [traceStateParameter]);
        };
        TraceControl.prototype.onTraceDataAvailable = function (traceDataAvailable) {
            // BINDINGSOURCE: method dispatches the call to a bound target
        };
        TraceControl.prototype.onTraceStateChanged = function (traceState) {
            // BINDINGSOURCE: method dispatches the value to a bound target
        };
        /**
         * transfers the trace configuration data to the target (e.g. datapoints, timing parameters, triggers, ...),
         * and clears all data on target before
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.transferDataToTarget = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < this._traceComponent.mappCockpitComponent.methods.length)) return [3 /*break*/, 4];
                            // update the methods input parameters
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(this._traceComponent.mappCockpitComponent.methods[i])];
                        case 2:
                            // update the methods input parameters
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: 
                        // Call reset method before transfering data to avoid problems when trace is in wrong state
                        return [4 /*yield*/, this.executeMethod(this.getTraceMethod(TraceMethodIds.Reset))];
                        case 5:
                            // Call reset method before transfering data to avoid problems when trace is in wrong state
                            _a.sent();
                            // remove all datapoints
                            return [4 /*yield*/, this.removeAllDatapoints()];
                        case 6:
                            // remove all datapoints
                            _a.sent();
                            // remove all start triggers
                            return [4 /*yield*/, this.removeAllStartTriggers()];
                        case 7:
                            // remove all start triggers
                            _a.sent();
                            // write timing parameters
                            return [4 /*yield*/, this.setTimingParameters()];
                        case 8:
                            // write timing parameters
                            _a.sent();
                            // add all datapoints
                            return [4 /*yield*/, this.addDatapoints()];
                        case 9:
                            // add all datapoints
                            _a.sent();
                            // add all start triggers
                            return [4 /*yield*/, this.addStartTriggers()];
                        case 10:
                            // add all start triggers
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Removes all trace configuration datapoints on target
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.removeAllDatapoints = function () {
            return __awaiter(this, void 0, void 0, function () {
                var datapoints, removeDataPointMethod, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            datapoints = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationDatapoints(this._traceComponent.mappCockpitComponent.parameters);
                            return [4 /*yield*/, this._diagnosticProvider.readParameterValues(datapoints)];
                        case 1:
                            _a.sent();
                            removeDataPointMethod = this.getTraceMethod(TraceMethodIds.RemoveDataPoint);
                            if (!(removeDataPointMethod != undefined)) return [3 /*break*/, 5];
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < datapoints.length)) return [3 /*break*/, 5];
                            if (!(datapoints[i].value != "")) return [3 /*break*/, 4];
                            removeDataPointMethod.inputParameters[0].value = datapoints[i].value;
                            //console.info("Remove datapoint: " + datapoints[i].value);
                            return [4 /*yield*/, this.executeMethod(removeDataPointMethod)];
                        case 3:
                            //console.info("Remove datapoint: " + datapoints[i].value);
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Removes all trace configuration start triggers on target
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.removeAllStartTriggers = function () {
            return __awaiter(this, void 0, void 0, function () {
                var triggerParameters, startTriggerDataPoint1, startTriggerDataPoint2, removeStartTrigger1Method, removeStartTrigger2Method;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            triggerParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationTriggerParameters(this._traceComponent.mappCockpitComponent.parameters);
                            return [4 /*yield*/, this._diagnosticProvider.readParameterValues(triggerParameters)];
                        case 1:
                            _a.sent();
                            startTriggerDataPoint1 = this.getTraceParameter("StartTrigger1_DataPoint");
                            startTriggerDataPoint2 = this.getTraceParameter("StartTrigger2_DataPoint");
                            removeStartTrigger1Method = this.getTraceMethod(TraceMethodIds.RemoveStartTrigger1);
                            removeStartTrigger2Method = this.getTraceMethod(TraceMethodIds.RemoveStartTrigger2);
                            if (!(startTriggerDataPoint2.value != "")) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.executeMethod(removeStartTrigger2Method)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            if (!(startTriggerDataPoint1.value != "")) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.executeMethod(removeStartTrigger1Method)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Sets all timing parameters on target with the current trace configuration from mappCockpit
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.setTimingParameters = function () {
            return __awaiter(this, void 0, void 0, function () {
                var timingParameters, i, timingParameter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            timingParameters = this._traceComponent.traceConfigurationData.timingParameters;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < timingParameters.length)) return [3 /*break*/, 4];
                            timingParameter = timingParameters[i];
                            /*if (timingParam.displayName == "PLC task class number") {
                                // use value to avoid problems with taskclass cycle time displayValue
                                //timingParam.componentParameter.value = timingParam.value; // value not up to date currently
                                timingParam.componentParameter.value = timingParam.displayValue.substr(0, 1); // value not up to date currently
                            }
                            else {
                                timingParam.componentParameter.value = timingParam.displayValue;
                            }*/
                            return [4 /*yield*/, this._diagnosticProvider.writeParameterValue(timingParameter, timingParameter.value)];
                        case 2:
                            /*if (timingParam.displayName == "PLC task class number") {
                                // use value to avoid problems with taskclass cycle time displayValue
                                //timingParam.componentParameter.value = timingParam.value; // value not up to date currently
                                timingParam.componentParameter.value = timingParam.displayValue.substr(0, 1); // value not up to date currently
                            }
                            else {
                                timingParam.componentParameter.value = timingParam.displayValue;
                            }*/
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Sets all datapoints on target with the current trace configuration from mappCockpit
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.addDatapoints = function () {
            return __awaiter(this, void 0, void 0, function () {
                var addDataPointMethod, dataPoints, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            addDataPointMethod = this.getTraceMethod(TraceMethodIds.AddDataPoint);
                            if (!(addDataPointMethod != undefined)) return [3 /*break*/, 4];
                            dataPoints = this._traceComponent.traceConfigurationData.dataPoints;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < dataPoints.length)) return [3 /*break*/, 4];
                            if (!(dataPoints[i].dataPointName != "")) return [3 /*break*/, 3];
                            addDataPointMethod.inputParameters[0].value = dataPoints[i].dataPointName;
                            //console.info("Add datapoint: " + dataPoints[i].dataPointName);
                            return [4 /*yield*/, this.executeMethod(addDataPointMethod)];
                        case 2:
                            //console.info("Add datapoint: " + dataPoints[i].dataPointName);
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Sets all starttriggers on target with the current trace configuration from mappCockpit
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.addStartTriggers = function () {
            return __awaiter(this, void 0, void 0, function () {
                var setStartTriggerMethod, startTriggers, i, startTrigger, missingInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setStartTriggerMethod = this.getTraceMethod(TraceMethodIds.SetStartTrigger);
                            startTriggers = this._traceComponent.traceConfigurationData.startTriggers;
                            if (!(setStartTriggerMethod != undefined)) return [3 /*break*/, 4];
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < startTriggers.length)) return [3 /*break*/, 4];
                            startTrigger = startTriggers[i];
                            missingInfo = false;
                            // set setStartTrigger method input args
                            setStartTriggerMethod.inputParameters[0].value = startTrigger.condition;
                            setStartTriggerMethod.inputParameters[1].value = startTrigger.dataPointName;
                            setStartTriggerMethod.inputParameters[2].value = startTrigger.threshold;
                            setStartTriggerMethod.inputParameters[3].value = startTrigger.window;
                            if (!(missingInfo == false)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.executeMethod(setStartTriggerMethod)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Returns a trace component method for the given method id or undefined if not found
         *
         * @private
         * @param {string} methodId
         * @returns {(MappCockpitComponentMethod | undefined)}
         * @memberof TraceControl
         */
        TraceControl.prototype.getTraceMethod = function (methodId) {
            var traceComponent = this._traceComponent.mappCockpitComponent;
            for (var i = 0; i < traceComponent.methods.length; i++) {
                if (traceComponent.methods[i].browseName == methodId) {
                    return traceComponent.methods[i];
                }
            }
            console.warn("Method '" + methodId + "' not found on trace component!");
            return undefined;
        };
        /**
         * Returns a trace component parameter for the given parameter id or undefined if not found
         *
         * @private
         * @param {string} parameterId
         * @returns {(MappCockpitComponentParameter | undefined)}
         * @memberof TraceControl
         */
        TraceControl.prototype.getTraceParameter = function (parameterId) {
            var traceComponent = this._traceComponent.mappCockpitComponent;
            for (var i = 0; i < traceComponent.parameters.length; i++) {
                if (traceComponent.parameters[i].browseName == parameterId) {
                    return traceComponent.parameters[i];
                }
            }
            console.warn("Parameter '" + parameterId + "' not found on trace component!");
            return undefined;
        };
        /**
         * executes the selected method
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.executeMethod = function (method) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!method) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._diagnosticProvider.executeComponentMethod(method)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return TraceControl;
    }());
    exports.TraceControl = TraceControl;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWFBOzs7O09BSUc7SUFDSDtRQUFBO1FBV0EsQ0FBQztRQVZtQix1QkFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0Qix3QkFBUyxHQUFHLFdBQVcsQ0FBQztRQUN4Qix5QkFBVSxHQUFHLFlBQVksQ0FBQztRQUMxQiw4QkFBZSxHQUFHLGlCQUFpQixDQUFDO1FBQ3BDLG9CQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLDhCQUFlLEdBQUcsaUJBQWlCLENBQUM7UUFDcEMsa0NBQW1CLEdBQUcscUJBQXFCLENBQUM7UUFDNUMsa0NBQW1CLEdBQUcscUJBQXFCLENBQUM7UUFDNUMsMkJBQVksR0FBRyxjQUFjLENBQUM7UUFDOUIsOEJBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUN4RCxxQkFBQztLQUFBLEFBWEQsSUFXQztJQUVEO1FBaUJJOzs7O1dBSUc7UUFDSCxzQkFBWSxrQkFBaUQ7WUFsQnJELHNCQUFpQixHQUFXLEVBQUUsQ0FBQztZQVcvQixzQkFBaUIsR0FBWSxLQUFLLENBQUM7WUFRdkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLDRDQUEwQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFMUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDcEMsQ0FBQztRQVowQyxDQUFDO1FBYzVDOzs7OztXQUtHO1FBQ0ssOENBQXVCLEdBQS9CO1lBQ0ksbUJBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxx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QUcsaUNBQWlDLENBQUMsQ0FBQztZQUN4RSxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLHdDQUFpQixHQUF6QixVQUEwQixXQUFtQjtZQUN6QyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDO1lBQy9ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkQsSUFBSSxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxXQUFXLEVBQUU7b0JBQ3hELE9BQU8sY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkM7YUFDSjtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsR0FBRyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQzlFLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNXLG9DQUFhLEdBQTNCLFVBQTRCLE1BQThDOzs7OztpQ0FDbEUsTUFBTSxFQUFOLHdCQUFNOzRCQUNOLHFCQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsRUFBQTs7NEJBQTdELFNBQTZELENBQUM7Ozs7OztTQUVyRTtRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQWpqQkQsSUFpakJDO0lBRVEsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfSBmcm9tIFwiLi4vLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbyB9IGZyb20gXCIuLi8uLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyIH0gZnJvbSBcIi4uL21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IENvbW1hbmQsIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGUsIElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29tbWFuZFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRDb250cm9sIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbnRyb2xQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlRGF0YVJlYWRlciB9IGZyb20gXCIuL3RyYWNlRGF0YVJlYWRlclwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50IH0gZnJvbSBcIi4vbWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ3VyYXRpb25EYXRhIH0gZnJvbSBcIi4vdHJhY2VDb25maWcvdHJhY2VDb25maWdEYXRhXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnRXhwb3J0IH0gZnJvbSBcIi4vdHJhY2VDb25maWcvdHJhY2VDb25maWdFeHBvcnRcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdJbXBvcnQgfSBmcm9tIFwiLi90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0ltcG9ydFwiO1xyXG5pbXBvcnQgeyBCaW5kaW5ncyB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2JpbmRpbmdzXCI7XHJcbmltcG9ydCAqIGFzIEJpbmRpbmcgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ0RlY2xhcmF0aW9uc1wiO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIGJyb3dzZW5hbWVzIG9mIHRoZSB0cmFjZSBjb250cm9sIG1ldGhvZHMgb24gdGhlIG9wYyB1YSBzZXJ2ZXIgKGUuZy4gXCJBY3RpdmF0ZVwiKVxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VNZXRob2RJZHNcclxuICovXHJcbmNsYXNzIFRyYWNlTWV0aG9kSWRze1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEFjdGl2YXRlID0gXCJBY3RpdmF0ZVwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEZvcmNlU3RvcCA9IFwiRm9yY2VTdG9wXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRm9yY2VTdGFydCA9IFwiRm9yY2VTdGFydFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNhdmVUcmFjZUNvbmZpZyA9IFwiU2F2ZVRyYWNlQ29uZmlnXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUmVzZXQgPSBcIlJlc2V0XCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUmVtb3ZlRGF0YVBvaW50ID0gXCJSZW1vdmVEYXRhUG9pbnRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBSZW1vdmVTdGFydFRyaWdnZXIxID0gXCJSZW1vdmVTdGFydFRyaWdnZXIxXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUmVtb3ZlU3RhcnRUcmlnZ2VyMiA9IFwiUmVtb3ZlU3RhcnRUcmlnZ2VyMlwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEFkZERhdGFQb2ludCA9IFwiQWRkRGF0YVBvaW50XCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgU2V0U3RhcnRUcmlnZ2VyID0gXCJTZXRTdGFydFRyaWdnZXJcIjtcclxufVxyXG5cclxuY2xhc3MgVHJhY2VDb250cm9sIGltcGxlbWVudHMgSVRyYWNlQ29tcG9uZW50Q29udHJvbHtcclxuXHJcbiAgICBwcml2YXRlIF9kaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyO1xyXG4gICAgcHJpdmF0ZSBfdHJhY2VDb21wb25lbnQhOiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50O1xyXG4gICAgcHJpdmF0ZSBfYWN0dWFsVHJhY2VTdGF0ZTogc3RyaW5nID0gXCJcIjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfY29tbWFuZEFjdGl2YXRlITogQ29tbWFuZDxhbnksYW55PjtcclxuICAgIHByaXZhdGUgX2NvbW1hbmRGb3JjZVN0YXJ0ITogQ29tbWFuZDxhbnksYW55PjtcclxuICAgIHByaXZhdGUgX2NvbW1hbmRGb3JjZVN0b3AhOiBDb21tYW5kPGFueSxhbnk+O1xyXG4gICAgcHJpdmF0ZSBfY29tbWFuZFNhdmVDb25maWd1cmF0aW9uITogQ29tbWFuZDxhbnksYW55PjtcclxuICAgIHByaXZhdGUgX2NvbW1hbmRJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24hOiBDb21tYW5kPGFueSxhbnk+O1xyXG4gICAgcHJpdmF0ZSBfY29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbiE6IENvbW1hbmQ8YW55LGFueT47XHJcblxyXG4gICAgLy8gaG9sZHMgYW4gaW5zdGFuY2Ugb2YgYSB0cmFjZSBkYXRhIHJlYWRlclxyXG4gICAgcHJpdmF0ZSBfdHJhY2VEYXRhUmVhZGVyOiBNYXBwQ29ja3BpdFRyYWNlRGF0YVJlYWRlcjtcclxuICAgIHByaXZhdGUgX3RyYWNlRGF0YUxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTs7XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUcmFjZUNvbnRyb2wuXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyfSBkaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcikge1xyXG4gICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlciA9IGRpYWdub3N0aWNQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl90cmFjZURhdGFSZWFkZXIgPSBuZXcgTWFwcENvY2twaXRUcmFjZURhdGFSZWFkZXIoZGlhZ25vc3RpY1Byb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50QmluZGluZ3MoKTtcclxuICAgIH1cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGJpbmRpbmdzIHRvIG90aGVyIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbXBvbmVudEJpbmRpbmdzKCkge1xyXG4gICAgICAgIEJpbmRpbmdzLmNyZWF0ZUJ5RGVjbChCaW5kaW5nLlRyYWNlcy5UcmFjZURhdGEuTG9hZCwgdGhpcywgXCJpbnZva2VMb2FkVHJhY2VEYXRhXCIsIFwiXCIpO1xyXG4gICAgICAgIEJpbmRpbmdzLmNyZWF0ZUJ5RGVjbChCaW5kaW5nLlRyYWNlcy5UcmFjZURhdGEuTG9hZGVkLCB0aGlzLCBcIlwiLCBcIm9uVHJhY2VEYXRhTG9hZGVkXCIpO1xyXG4gICAgICAgIEJpbmRpbmdzLmNyZWF0ZUJ5RGVjbChCaW5kaW5nLlRyYWNlcy5UcmFjZURhdGEuTG9hZGluZ0Vycm9yLCB0aGlzLFwiXCIsIFwib25FcnJvckxvYWRpbmdUcmFjZURhdGFcIik7XHJcbiAgICAgICAgQmluZGluZ3MuY3JlYXRlQnlEZWNsKEJpbmRpbmcuVHJhY2VzLlN0YXRlLCB0aGlzLCBcIlwiLCBcIm9uVHJhY2VTdGF0ZUNoYW5nZWRcIik7XHJcbiAgICAgICAgQmluZGluZ3MuY3JlYXRlQnlEZWNsKEJpbmRpbmcuVHJhY2VzLlRyYWNlRGF0YS5EYXRhQXZhaWxhYmxlLCB0aGlzLFwiXCIsIFwib25UcmFjZURhdGFBdmFpbGFibGVcIik7XHJcbiAgICAgICAgQmluZGluZ3MuY3JlYXRlQnlEZWNsKEJpbmRpbmcuVHJhY2VzLkNvbnRyb2xJbnRlcmZhY2UsIHRoaXMsIFwiXCIsIFwidXBkYXRlVHJhY2VDb250cm9sSW50ZXJmYWNlXCIsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgVHJhY2VDb250cm9sIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50fSB0cmFjZUNvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgYXN5bmMgaW5pdGlhbGl6ZSh0cmFjZUNvbXBvbmVudDogTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb21wb25lbnQgPSB0cmFjZUNvbXBvbmVudDtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgY29tbWFuZHNcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZVRyYWNlU3RhdGUodGhpcy5fdHJhY2VDb21wb25lbnQubWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlVHJhY2VDb250cm9sSW50ZXJmYWNlKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdHJhY2UgY29udHJvbCBpbnRlcmZhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDb21wb25lbnRDb250cm9sfSB0cmFjZUNvbXBvbmVudENvbnRyb2xcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUcmFjZUNvbnRyb2xJbnRlcmZhY2UodHJhY2VDb250cm9sOiBJVHJhY2VDb21wb25lbnRDb250cm9sKSB7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogbWV0aG9kIHN0dWIgdG8gbWFrZSB0aGUgcGFzc2VkIGRhdGEgYmluZGFibGVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgY29tbWFuZHMgZXhwb3NlZCBieSB0cmFjZSBjb250cm9sXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kcygpIHtcclxuICAgICAgICB0aGlzLl9jb21tYW5kQWN0aXZhdGUgPSBDb21tYW5kLmNyZWF0ZSh0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kQWN0aXZhdGUoKSk7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZEZvcmNlU3RhcnQgPSBDb21tYW5kLmNyZWF0ZSh0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kRm9yY2VTdGFydCgpKTtcclxuICAgICAgICB0aGlzLl9jb21tYW5kRm9yY2VTdG9wID0gQ29tbWFuZC5jcmVhdGUodGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZEZvcmNlU3RvcCgpKTtcclxuICAgICAgICB0aGlzLl9jb21tYW5kU2F2ZUNvbmZpZ3VyYXRpb24gPSBDb21tYW5kLmNyZWF0ZSh0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kU2F2ZUNvbmZpZ3VyYXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbiA9IENvbW1hbmQuY3JlYXRlKHRoaXMsIHRoaXMuZXhlY3V0ZUNvbW1hbmRJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbiA9IENvbW1hbmQuY3JlYXRlKHRoaXMsIHRoaXMuZXhlY3V0ZUNvbW1hbmRFeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb21tYW5kQWN0aXZhdGUoKSA6IENvbW1hbmQ8YW55LGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21tYW5kQWN0aXZhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb21tYW5kRm9yY2VTdGFydCgpIDogQ29tbWFuZDxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRGb3JjZVN0YXJ0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29tbWFuZEZvcmNlU3RvcCgpIDogQ29tbWFuZDxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRGb3JjZVN0b3A7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb21tYW5kU2F2ZUNvbmZpZ3VyYXRpb24oKSA6IENvbW1hbmQ8YW55LGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21tYW5kU2F2ZUNvbmZpZ3VyYXRpb247XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgY29tbWFuZEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbigpIDogQ29tbWFuZDxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb21tYW5kRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uKCkgOiBDb21tYW5kPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb2Nlc3NlcyB0aGUgYWN0aXZhdGUgY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7SUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRBY3RpdmF0ZSgpOiBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gKGNvbW1hbmRQYXJzOmFueSxjb21tYW5kUmVzcG9uc2UpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmZXJEYXRhVG9UYXJnZXQoKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlTWV0aG9kKHRoaXMuZ2V0VHJhY2VNZXRob2QoVHJhY2VNZXRob2RJZHMuQWN0aXZhdGUpKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZCgpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRoZSBmb3JjZSBzdG9wIGNvbW1hbmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0lDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRGb3JjZVN0b3AoKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIChjb21tYW5kUGFyczphbnksY29tbWFuZFJlc3BvbnNlKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVNZXRob2QodGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5Gb3JjZVN0b3ApKVxyXG4gICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9jZXNzZXMgdGhlIGZvcmNlIHN0YXJ0IGNvbW1hbmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0lDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRGb3JjZVN0YXJ0KCk6ICBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gKGNvbW1hbmRQYXJzOmFueSxjb21tYW5kUmVzcG9uc2UpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZXhlY3V0ZU1ldGhvZCh0aGlzLmdldFRyYWNlTWV0aG9kKFRyYWNlTWV0aG9kSWRzLkZvcmNlU3RhcnQpKVxyXG4gICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRoZSBzYXZlIGNvbmZpZ3VyYXRpb24gY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7SUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlQ29tbWFuZFNhdmVDb25maWd1cmF0aW9uKCk6IElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT4ge1xyXG4gICAgICAgIHJldHVybiAoY29tbWFuZFBhcnM6YW55LGNvbW1hbmRSZXNwb25zZSkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy50cmFuc2ZlckRhdGFUb1RhcmdldCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlTWV0aG9kKHRoaXMuZ2V0VHJhY2VNZXRob2QoVHJhY2VNZXRob2RJZHMuU2F2ZVRyYWNlQ29uZmlnKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pOyBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyBsb2FkaW5nIHRyYWNlIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGludm9rZUxvYWRUcmFjZURhdGEoKXtcclxuICAgICAgICBpZiAoICF0aGlzLl90cmFjZURhdGFMb2FkaW5nICYmIHRoaXMuX2FjdHVhbFRyYWNlU3RhdGUgPT0gXCIyM1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlRGF0YUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZURhdGFSZWFkZXIucmVxdWVzdExvYWRUcmFjZURhdGFGcm9tVGFyZ2V0KCkudGhlbigodHJhY2VEYXRhKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gY29uZmlybSBsb2FkaW5nIHRyYWNlIGRhdGEgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVHJhY2VEYXRhTG9hZGVkKHRyYWNlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFjZURhdGFMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgICAgIC8vIG5vdGlmeSBsb2FkaW5nIGVycm9yXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3JMb2FkaW5nVHJhY2VEYXRhKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlRGF0YUxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMub25FcnJvckxvYWRpbmdUcmFjZURhdGEoXCJ0cmFjZSBkYXRhIGxvYWRpbmcgYWxyZWFkeSBpbiBwcm9ncmVzcyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpcm1zIHRyYWNlIGRhdGEgbG9hZGVkXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25UcmFjZURhdGFMb2FkZWQodHJhY2VEYXRhKXtcclxuICAgICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IGRpc3BhdGNoZXMgdGhlIG1ldGhvZCBjYWxsIHRvIGJvdW5kIHRhcmdldHNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYWNlIGRhdGEgbG9hZGluZyB0cmlnZ2VyZWQgYW4gZXJyb3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGVycm9yXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRXJyb3JMb2FkaW5nVHJhY2VEYXRhKGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBkaXNwYXRjaGVzIHRoZSBtZXRob2QgY2FsbCB0byBib3VuZCB0YXJnZXRzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRoZSBpbXBvcnQgdHJhY2UgY29uZmlndXJhdGlvbiBjb21tYW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4ZWN1dGVDb21tYW5kSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uKCk6IElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT4ge1xyXG4gICAgICAgIHJldHVybiAoY29tbWFuZFBhcnM6YW55LGNvbW1hbmRSZXNwb25zZSkgPT4geyBcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oY29tbWFuZFBhcnMpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaChlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0gXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9jZXNzZXMgdGhlIGV4cG9ydCB0cmFjZSBjb25maWd1cmF0aW9uIGNvbW1hbmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0lDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRFeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIChjb21tYW5kUGFyczphbnksY29tbWFuZFJlc3BvbnNlOiBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8c3RyaW5nPikgPT4geyBcclxuICAgICAgICAgICAgbGV0IGV4cG9ydERhdGE6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIGV4cG9ydERhdGEgPSB0aGlzLmV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoZXhwb3J0RGF0YSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIFhtbERhdGEgb2YgdGhlIGN1cnJlbnQgdHJhY2UgY29uZmlndXJhdGlvbiAoZm9yIGV4cG9ydClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCB0cmFjZUNvbmZpZ0V4cG9ydCA9IG5ldyBUcmFjZUNvbmZpZ0V4cG9ydCgpO1xyXG4gICAgICAgIHJldHVybiB0cmFjZUNvbmZpZ0V4cG9ydC5nZXRYbWxEYXRhRnJvbVRyYWNlQ29uZmlnKHRoaXMuX3RyYWNlQ29tcG9uZW50LnRyYWNlQ29uZmlndXJhdGlvbkRhdGEpOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEltcG9ydHMgdGhlIGdpdmVuIHhtbCBkYXRhIHRvIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlRGF0YVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oZmlsZURhdGE6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHRyYWNlQ29uZmlnRGF0YSA9IFRyYWNlQ29uZmlnSW1wb3J0LmdldFRyYWNlQ29uZmlnRGF0YUZyb21YbWwoZmlsZURhdGEpO1xyXG4gICAgICAgIGlmKHRyYWNlQ29uZmlnRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlc09mVGltaW5nUGFyYW1ldGVycyh0aGlzLl90cmFjZUNvbXBvbmVudC50cmFjZUNvbmZpZ3VyYXRpb25EYXRhLnRpbWluZ1BhcmFtZXRlcnMsIHRyYWNlQ29uZmlnRGF0YS50aW1pbmdQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgbGV0IHRyYWNlQ29uZmlndXJhdGlvbkRhdGEgPSBuZXcgVHJhY2VDb25maWd1cmF0aW9uRGF0YSh0cmFjZUNvbmZpZ0RhdGEuZGF0YVBvaW50cywgdGhpcy5fdHJhY2VDb21wb25lbnQudHJhY2VDb25maWd1cmF0aW9uRGF0YS50aW1pbmdQYXJhbWV0ZXJzLCB0cmFjZUNvbmZpZ0RhdGEuc3RhcnRUcmlnZ2Vycyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgZGF0YXBvaW50IGluZm9ybWF0aW9ucyAoZS5nLiBheGlzIG5hbWUsIGRlc2NyaXB0aW9uLCAuLi4pXHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29tcG9uZW50LnVwZGF0ZURhdGFQb2ludEluZm9ybWF0aW9ucyh0cmFjZUNvbmZpZ3VyYXRpb25EYXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFNldCBuZXcgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhIHRvIHRyYWNlIGNvbXBvbmVudFxyXG4gICAgICAgICAgICB0aGlzLl90cmFjZUNvbXBvbmVudC50cmFjZUNvbmZpZ3VyYXRpb25EYXRhID0gdHJhY2VDb25maWd1cmF0aW9uRGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZXMgb2YgdGhlIHRpbWluZyBwYXJhbWV0ZXJzKGZyb20gaW1wb3J0KSB0byB0aGUgbWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHRpbWluZ1BhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7e1trZXk6IHN0cmluZ106IHN0cmluZ319IHZhbHVlc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFZhbHVlc09mVGltaW5nUGFyYW1ldGVycyh0aW1pbmdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCB2YWx1ZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGltaW5nUGFyYW1ldGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB0aW1pbmdQYXJhbSA9IHRpbWluZ1BhcmFtZXRlcnNbaV07XHJcbiAgICAgICAgICAgIGxldCB0aW1pbmdQYXJhbUlkID0gVHJhY2VDb25maWdFeHBvcnQuZ2V0VGltaW5nUGFyYW1JZCh0aW1pbmdQYXJhbS5icm93c2VOYW1lKTtcclxuICAgICAgICAgICAgaWYodGltaW5nUGFyYW1JZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlc1t0aW1pbmdQYXJhbUlkXTtcclxuICAgICAgICAgICAgICAgIHRpbWluZ1BhcmFtLnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgdGhlIHRyYWNlIHN0YXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZVRyYWNlU3RhdGUocGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAgICAgbGV0IHRyYWNlU3RhdGVQYXJhbWV0ZXIgPSBwYXJhbWV0ZXJzLmZpbHRlcigodHJhY2VQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHRyYWNlUGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwiVHJhY2VTdGF0dXNcIiB9KVswXTtcclxuXHJcbiAgICAgICAgdHJhY2VTdGF0ZVBhcmFtZXRlci52YWx1ZVNvdXJjZS5jaGFuZ2VkKChuZXdUcmFjZVN0YXRlVmFsdWUsb2xkVHJhY2VTdGF0ZVZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxUcmFjZVN0YXRlID0gdHJhY2VTdGF0ZVBhcmFtZXRlci52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5vdGlmeSB0cmFjZSBzdGF0ZSBjaGFuZ2VcclxuICAgICAgICAgICAgdGhpcy5vblRyYWNlU3RhdGVDaGFuZ2VkKHRyYWNlU3RhdGVQYXJhbWV0ZXIudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5ld1RyYWNlU3RhdGVWYWx1ZSAhPSBvbGRUcmFjZVN0YXRlVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FjdHVhbFRyYWNlU3RhdGUgPT0gXCIyM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbm90aWZ5IHRyYWNlIGRhdGEgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblRyYWNlRGF0YUF2YWlsYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB3YXRjaCB0cmFjZSBzdGF0ZSBjaGFuZ2VzXHJcbiAgICAgICAgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsIFt0cmFjZVN0YXRlUGFyYW1ldGVyXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRyYWNlRGF0YUF2YWlsYWJsZSh0cmFjZURhdGFBdmFpbGFibGU6Ym9vbGVhbikge1xyXG4gICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IG1ldGhvZCBkaXNwYXRjaGVzIHRoZSBjYWxsIHRvIGEgYm91bmQgdGFyZ2V0XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRyYWNlU3RhdGVDaGFuZ2VkKHRyYWNlU3RhdGU6IGFueSkge1xyXG4gICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IG1ldGhvZCBkaXNwYXRjaGVzIHRoZSB2YWx1ZSB0byBhIGJvdW5kIHRhcmdldFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdHJhbnNmZXJzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIGRhdGEgdG8gdGhlIHRhcmdldCAoZS5nLiBkYXRhcG9pbnRzLCB0aW1pbmcgcGFyYW1ldGVycywgdHJpZ2dlcnMsIC4uLiksXHJcbiAgICAgKiBhbmQgY2xlYXJzIGFsbCBkYXRhIG9uIHRhcmdldCBiZWZvcmUgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyB0cmFuc2ZlckRhdGFUb1RhcmdldCgpIHtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuX3RyYWNlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIG1ldGhvZHMgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICBhd2FpdCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC51cGRhdGVJbnB1dFBhcmFtZXRlcnModGhpcy5fdHJhY2VDb21wb25lbnQubWFwcENvY2twaXRDb21wb25lbnQubWV0aG9kc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENhbGwgcmVzZXQgbWV0aG9kIGJlZm9yZSB0cmFuc2ZlcmluZyBkYXRhIHRvIGF2b2lkIHByb2JsZW1zIHdoZW4gdHJhY2UgaXMgaW4gd3Jvbmcgc3RhdGVcclxuICAgICAgICBhd2FpdCB0aGlzLmV4ZWN1dGVNZXRob2QodGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5SZXNldCkpO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgYWxsIGRhdGFwb2ludHNcclxuICAgICAgICBhd2FpdCB0aGlzLnJlbW92ZUFsbERhdGFwb2ludHMoKTtcclxuICAgICAgICAvLyByZW1vdmUgYWxsIHN0YXJ0IHRyaWdnZXJzXHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZW1vdmVBbGxTdGFydFRyaWdnZXJzKCk7XHJcblxyXG4gICAgICAgIC8vIHdyaXRlIHRpbWluZyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRUaW1pbmdQYXJhbWV0ZXJzKCk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBhbGwgZGF0YXBvaW50c1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYWRkRGF0YXBvaW50cygpO1xyXG4gICAgICAgIC8vIGFkZCBhbGwgc3RhcnQgdHJpZ2dlcnNcclxuICAgICAgICBhd2FpdCB0aGlzLmFkZFN0YXJ0VHJpZ2dlcnMoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCB0cmFjZSBjb25maWd1cmF0aW9uIGRhdGFwb2ludHMgb24gdGFyZ2V0IFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVtb3ZlQWxsRGF0YXBvaW50cygpIHtcclxuICAgICAgICBsZXQgZGF0YXBvaW50cyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZVRyYWNlQ29uZmlndXJhdGlvbkRhdGFwb2ludHModGhpcy5fdHJhY2VDb21wb25lbnQubWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnJlYWRQYXJhbWV0ZXJWYWx1ZXMoZGF0YXBvaW50cyk7XHJcblxyXG4gICAgICAgIGxldCByZW1vdmVEYXRhUG9pbnRNZXRob2QgPSB0aGlzLmdldFRyYWNlTWV0aG9kKFRyYWNlTWV0aG9kSWRzLlJlbW92ZURhdGFQb2ludCk7XHJcbiAgICAgICAgaWYgKHJlbW92ZURhdGFQb2ludE1ldGhvZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YXBvaW50c1tpXS52YWx1ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRGF0YVBvaW50TWV0aG9kLmlucHV0UGFyYW1ldGVyc1swXS52YWx1ZSA9IGRhdGFwb2ludHNbaV0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oXCJSZW1vdmUgZGF0YXBvaW50OiBcIiArIGRhdGFwb2ludHNbaV0udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZXhlY3V0ZU1ldGhvZChyZW1vdmVEYXRhUG9pbnRNZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgdHJhY2UgY29uZmlndXJhdGlvbiBzdGFydCB0cmlnZ2VycyBvbiB0YXJnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlbW92ZUFsbFN0YXJ0VHJpZ2dlcnMoKSB7XHJcbiAgICAgICAgbGV0IHRyaWdnZXJQYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlVHJhY2VDb25maWd1cmF0aW9uVHJpZ2dlclBhcmFtZXRlcnModGhpcy5fdHJhY2VDb21wb25lbnQubWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnJlYWRQYXJhbWV0ZXJWYWx1ZXModHJpZ2dlclBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VyRGF0YVBvaW50MSA9IHRoaXMuZ2V0VHJhY2VQYXJhbWV0ZXIoXCJTdGFydFRyaWdnZXIxX0RhdGFQb2ludFwiKTtcclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VyRGF0YVBvaW50MiA9IHRoaXMuZ2V0VHJhY2VQYXJhbWV0ZXIoXCJTdGFydFRyaWdnZXIyX0RhdGFQb2ludFwiKTtcclxuXHJcbiAgICAgICAgbGV0IHJlbW92ZVN0YXJ0VHJpZ2dlcjFNZXRob2QgPSB0aGlzLmdldFRyYWNlTWV0aG9kKFRyYWNlTWV0aG9kSWRzLlJlbW92ZVN0YXJ0VHJpZ2dlcjEpO1xyXG4gICAgICAgIGxldCByZW1vdmVTdGFydFRyaWdnZXIyTWV0aG9kID0gdGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5SZW1vdmVTdGFydFRyaWdnZXIyKTtcclxuXHJcbiAgICAgICAgLy8gb25seSBkZWxldGUgaWYgc3RhcnR0cmlnZ2VyIGlmIGRlZmluZWQoZGF0YXBvaW50IGlzIGRlZmluZWQpXHJcbiAgICAgICAgaWYgKHN0YXJ0VHJpZ2dlckRhdGFQb2ludDIhLnZhbHVlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlTWV0aG9kKHJlbW92ZVN0YXJ0VHJpZ2dlcjJNZXRob2QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhcnRUcmlnZ2VyRGF0YVBvaW50MSEudmFsdWUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmV4ZWN1dGVNZXRob2QocmVtb3ZlU3RhcnRUcmlnZ2VyMU1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhbGwgdGltaW5nIHBhcmFtZXRlcnMgb24gdGFyZ2V0IHdpdGggdGhlIGN1cnJlbnQgdHJhY2UgY29uZmlndXJhdGlvbiBmcm9tIG1hcHBDb2NrcGl0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBzZXRUaW1pbmdQYXJhbWV0ZXJzKCkge1xyXG4gICAgICAgIGxldCB0aW1pbmdQYXJhbWV0ZXJzID0gdGhpcy5fdHJhY2VDb21wb25lbnQudHJhY2VDb25maWd1cmF0aW9uRGF0YSEudGltaW5nUGFyYW1ldGVycztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWluZ1BhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpbWluZ1BhcmFtZXRlciA9IHRpbWluZ1BhcmFtZXRlcnNbaV07XHJcbiAgICAgICAgICAgIC8qaWYgKHRpbWluZ1BhcmFtLmRpc3BsYXlOYW1lID09IFwiUExDIHRhc2sgY2xhc3MgbnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVzZSB2YWx1ZSB0byBhdm9pZCBwcm9ibGVtcyB3aXRoIHRhc2tjbGFzcyBjeWNsZSB0aW1lIGRpc3BsYXlWYWx1ZVxyXG4gICAgICAgICAgICAgICAgLy90aW1pbmdQYXJhbS5jb21wb25lbnRQYXJhbWV0ZXIudmFsdWUgPSB0aW1pbmdQYXJhbS52YWx1ZTsgLy8gdmFsdWUgbm90IHVwIHRvIGRhdGUgY3VycmVudGx5XHJcbiAgICAgICAgICAgICAgICB0aW1pbmdQYXJhbS5jb21wb25lbnRQYXJhbWV0ZXIudmFsdWUgPSB0aW1pbmdQYXJhbS5kaXNwbGF5VmFsdWUuc3Vic3RyKDAsIDEpOyAvLyB2YWx1ZSBub3QgdXAgdG8gZGF0ZSBjdXJyZW50bHlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpbWluZ1BhcmFtLmNvbXBvbmVudFBhcmFtZXRlci52YWx1ZSA9IHRpbWluZ1BhcmFtLmRpc3BsYXlWYWx1ZTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLndyaXRlUGFyYW1ldGVyVmFsdWUodGltaW5nUGFyYW1ldGVyLCB0aW1pbmdQYXJhbWV0ZXIudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYWxsIGRhdGFwb2ludHMgb24gdGFyZ2V0IHdpdGggdGhlIGN1cnJlbnQgdHJhY2UgY29uZmlndXJhdGlvbiBmcm9tIG1hcHBDb2NrcGl0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBhZGREYXRhcG9pbnRzKCkge1xyXG4gICAgICAgIGxldCBhZGREYXRhUG9pbnRNZXRob2QgPSB0aGlzLmdldFRyYWNlTWV0aG9kKFRyYWNlTWV0aG9kSWRzLkFkZERhdGFQb2ludCk7XHJcbiAgICAgICAgaWYgKGFkZERhdGFQb2ludE1ldGhvZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludHMgPSB0aGlzLl90cmFjZUNvbXBvbmVudC50cmFjZUNvbmZpZ3VyYXRpb25EYXRhIS5kYXRhUG9pbnRzO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhUG9pbnRzW2ldLmRhdGFQb2ludE5hbWUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZERhdGFQb2ludE1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbMF0udmFsdWUgPSBkYXRhUG9pbnRzW2ldLmRhdGFQb2ludE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oXCJBZGQgZGF0YXBvaW50OiBcIiArIGRhdGFQb2ludHNbaV0uZGF0YVBvaW50TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlTWV0aG9kKGFkZERhdGFQb2ludE1ldGhvZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGFsbCBzdGFydHRyaWdnZXJzIG9uIHRhcmdldCB3aXRoIHRoZSBjdXJyZW50IHRyYWNlIGNvbmZpZ3VyYXRpb24gZnJvbSBtYXBwQ29ja3BpdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYWRkU3RhcnRUcmlnZ2VycygpIHtcclxuICAgICAgICBsZXQgc2V0U3RhcnRUcmlnZ2VyTWV0aG9kID0gdGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5TZXRTdGFydFRyaWdnZXIpO1xyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJzID0gdGhpcy5fdHJhY2VDb21wb25lbnQudHJhY2VDb25maWd1cmF0aW9uRGF0YSEuc3RhcnRUcmlnZ2VycztcclxuXHJcbiAgICAgICAgaWYgKHNldFN0YXJ0VHJpZ2dlck1ldGhvZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFydFRyaWdnZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydFRyaWdnZXIgPSBzdGFydFRyaWdnZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pc3NpbmdJbmZvID0gZmFsc2U7IC8vIFRPRE86IHVzZSBtaXNzaW5nIGluZm8gYW5kIHJlcG9ydCBlcnJvciA9PiBubyBkYXRhcG9pbnRuYW1lIGRlZmluZWRcclxuICAgICAgICAgICAgICAgIC8vIHNldCBzZXRTdGFydFRyaWdnZXIgbWV0aG9kIGlucHV0IGFyZ3NcclxuICAgICAgICAgICAgICAgIHNldFN0YXJ0VHJpZ2dlck1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbMF0udmFsdWUgPSBzdGFydFRyaWdnZXIuY29uZGl0aW9uO1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhcnRUcmlnZ2VyTWV0aG9kLmlucHV0UGFyYW1ldGVyc1sxXS52YWx1ZSA9IHN0YXJ0VHJpZ2dlci5kYXRhUG9pbnROYW1lO1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhcnRUcmlnZ2VyTWV0aG9kLmlucHV0UGFyYW1ldGVyc1syXS52YWx1ZSA9IHN0YXJ0VHJpZ2dlci50aHJlc2hvbGQ7XHJcbiAgICAgICAgICAgICAgICBzZXRTdGFydFRyaWdnZXJNZXRob2QuaW5wdXRQYXJhbWV0ZXJzWzNdLnZhbHVlID0gc3RhcnRUcmlnZ2VyLndpbmRvdztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWlzc2luZ0luZm8gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmV4ZWN1dGVNZXRob2Qoc2V0U3RhcnRUcmlnZ2VyTWV0aG9kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSB0cmFjZSBjb21wb25lbnQgbWV0aG9kIGZvciB0aGUgZ2l2ZW4gbWV0aG9kIGlkIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZElkXHJcbiAgICAgKiBAcmV0dXJucyB7KE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmFjZU1ldGhvZChtZXRob2RJZDogc3RyaW5nKTogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCB0cmFjZUNvbXBvbmVudCA9IHRoaXMuX3RyYWNlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2VDb21wb25lbnQubWV0aG9kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodHJhY2VDb21wb25lbnQubWV0aG9kc1tpXS5icm93c2VOYW1lID09IG1ldGhvZElkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2VDb21wb25lbnQubWV0aG9kc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLndhcm4oXCJNZXRob2QgJ1wiICsgbWV0aG9kSWQgKyBcIicgbm90IGZvdW5kIG9uIHRyYWNlIGNvbXBvbmVudCFcIik7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSB0cmFjZSBjb21wb25lbnQgcGFyYW1ldGVyIGZvciB0aGUgZ2l2ZW4gcGFyYW1ldGVyIGlkIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlcklkXHJcbiAgICAgKiBAcmV0dXJucyB7KE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmFjZVBhcmFtZXRlcihwYXJhbWV0ZXJJZDogc3RyaW5nKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCB0cmFjZUNvbXBvbmVudCA9IHRoaXMuX3RyYWNlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2VDb21wb25lbnQucGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodHJhY2VDb21wb25lbnQucGFyYW1ldGVyc1tpXS5icm93c2VOYW1lID09IHBhcmFtZXRlcklkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2VDb21wb25lbnQucGFyYW1ldGVyc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLndhcm4oXCJQYXJhbWV0ZXIgJ1wiICsgcGFyYW1ldGVySWQgKyBcIicgbm90IGZvdW5kIG9uIHRyYWNlIGNvbXBvbmVudCFcIik7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGV4ZWN1dGVzIHRoZSBzZWxlY3RlZCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGV4ZWN1dGVNZXRob2QobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLmV4ZWN1dGVDb21wb25lbnRNZXRob2QobWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29udHJvbCB9OyJdfQ==