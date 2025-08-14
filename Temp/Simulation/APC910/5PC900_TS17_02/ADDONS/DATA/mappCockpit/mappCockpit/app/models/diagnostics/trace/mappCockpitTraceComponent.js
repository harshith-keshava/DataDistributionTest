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
define(["require", "exports", "../../../framework/property", "./traceControl", "./traceConfig/traceConfigData", "./traceDataPoint", "./traceStartTrigger", "./traceConfig/traceConfigInfo", "../../../framework/command", "../../online/mappCockpitComponentReflection", "../../../framework/componentHub/bindings/bindings", "../../../framework/componentHub/bindings/bindingDeclarations"], function (require, exports, property_1, traceControl_1, traceConfigData_1, traceDataPoint_1, traceStartTrigger_1, traceConfigInfo_1, command_1, mappCockpitComponentReflection_1, bindings_1, Binding) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides data for describing a trace component
     *
     * @class MappCockpitTraceComponent
     */
    var MappCockpitTraceComponent = /** @class */ (function () {
        function MappCockpitTraceComponent(diagnosticProvider, mappCockpitComponent) {
            this._initialized = false;
            this._diagnosticProvider = diagnosticProvider;
            this._mappCockpitComponent = mappCockpitComponent;
            this._traceControl = new traceControl_1.TraceControl(this._diagnosticProvider);
            this._availableTraceDataPoints = property_1.Property.create([]);
            this._traceConfigurationData = new traceConfigData_1.TraceConfigurationData(new Array(), new Array(), new Array());
            this._traceConfigurationInfo = new traceConfigInfo_1.TraceConfigurationInfo(new Array(), new Array(), new Array());
            this._traceComponentParameterInterface = property_1.Property.create({
                parameters: [],
                availableTraceDataPoints: this._availableTraceDataPoints,
                traceConfigurationData: this._traceConfigurationData,
                traceConfigurationInfo: this._traceConfigurationInfo,
                commandRead: this._commandReadTraceParameters,
                commandWrite: this._commandWriteTraceParameters,
            });
            this.createCommands();
            this.createComponentBindings();
            this.initialize();
        }
        /**
         * Creates the bindings to other components
         *
         * @private
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.createComponentBindings = function () {
            bindings_1.Bindings.createByDecl(Binding.Traces.Configuration.DataPoints, this, "", "updateTraceDataPoints", false);
            bindings_1.Bindings.createByDecl(Binding.Traces.Configuration.StartTriggerInfos, this, "", "updateTraceStartTriggerInfo", false);
            bindings_1.Bindings.createByDecl(Binding.Traces.Configuration.TimingInfos, this, "", "updateTraceTimingParameters", false);
        };
        /**
         * Creates the exposed commands
         *
         * @private
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.createCommands = function () {
            this._commandReadTraceParameters = command_1.Command.create(this, this.executeCommandReadTraceParameters());
            this._commandWriteTraceParameters = command_1.Command.create(this, this.executeCommandWriteTraceParameters());
        };
        /**
         * Implements the command for reading the trace parameters
         *
         * @returns {*}
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.executeCommandReadTraceParameters = function () {
            var _this = this;
            return function (traceParameters, commandResponse) {
                var parametersToRead = traceParameters ? traceParameters : _this.mappCockpitComponent.parameters;
                _this._diagnosticProvider.readParameterValues(parametersToRead).then(function (updatedParameters) {
                    commandResponse.executed(updatedParameters);
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Implements the command for writing the trace parameters
         *
         * @returns {*}
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.executeCommandWriteTraceParameters = function () {
            var _this = this;
            return function (traceParameters, commandResponse) {
                var parametersToWrite = traceParameters ? traceParameters : _this.mappCockpitComponent.parameters;
                _this._diagnosticProvider.writeParameterValues(parametersToWrite).then(function (updatedParameters) {
                    commandResponse.executed(updatedParameters);
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        MappCockpitTraceComponent.prototype.initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._initialized == true) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.connectComponent()];
                        case 1:
                            _a.sent();
                            this._traceControl.initialize(this);
                            this._traceConfigurationInfo = new traceConfigInfo_1.TraceConfigurationInfo(mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationDatapoints(this.mappCockpitComponent.parameters), mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationTimingParameters(this.mappCockpitComponent.parameters), mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationTriggerParameters(this.mappCockpitComponent.parameters));
                            this._traceConfigurationData = this.getTraceConfigurationData(this._traceConfigurationInfo);
                            this.updateParameterInterface();
                            this._initialized = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        MappCockpitTraceComponent.prototype.updateParameterInterface = function () {
            this._traceComponentParameterInterface.value = {
                parameters: this.mappCockpitComponent.parameters,
                availableTraceDataPoints: this._availableTraceDataPoints,
                traceConfigurationData: this._traceConfigurationData,
                traceConfigurationInfo: this._traceConfigurationInfo,
                commandRead: this._commandReadTraceParameters,
                commandWrite: this._commandWriteTraceParameters,
            };
            this.updateTraceTimingParameters(this._traceConfigurationData.timingParameters);
            this.updateTraceDataPoints(this._traceConfigurationData.dataPoints);
            var startTriggerInfos = { data: this._traceConfigurationData.startTriggers, info: this._traceConfigurationInfo.startTriggerInfos };
            this.updateTraceStartTriggerInfo(startTriggerInfos);
        };
        /**
         * Updates the trace start triggers
         *
         * @private
         * @param {TraceStartTrigger[]} startTriggers
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.updateTraceStartTriggerInfo = function (startTriggerInfo) {
            // BINDINGSOURCE: method stub to make the passed data bindable
        };
        /**
         * Updates the trace data points
         *
         * @private
         * @param {TraceDataPoint[]} dataPoints
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.updateTraceDataPoints = function (dataPoints) {
            // BINDINGSOURCE: method stub to make the passed data bindable
        };
        /**
         * Updates the trace timing parameters.
         *
         * @private
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.updateTraceTimingParameters = function (timingParameters) {
            // BINDINGSOURCE: method stub to make the passed data bindable
        };
        /**
         * Connects the trace component to the target and browses the methods,parameters
         *
         * @private
         * @param {MappCockpitComponent} traceComponent
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.connectComponent = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._diagnosticProvider.browseParameters(this._mappCockpitComponent)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.updateParameterDataTypes(this._mappCockpitComponent.parameters)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.browseMethods(this._mappCockpitComponent)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.browseMethodParameters(this._mappCockpitComponent.methods)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.readParameterValues(this._mappCockpitComponent.parameters)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MappCockpitTraceComponent.prototype.getTraceConfigurationData = function (traceConfigurationInfo) {
            // get datapoints
            var datapoints = this.getDataPoints(traceConfigurationInfo.dataPointInfos);
            // get timing parameters
            var timingParameters = traceConfigurationInfo.timingParameterInfos;
            // get start trigger parameters
            var startTriggers = this.getStartTriggers(traceConfigurationInfo.startTriggerInfos);
            // create trace configuration data
            return new traceConfigData_1.TraceConfigurationData(datapoints, timingParameters, startTriggers);
        };
        MappCockpitTraceComponent.prototype.getDataPoints = function (datapointParameters) {
            var datapoints = new Array();
            var _loop_1 = function (datapoint) {
                if (datapoint.displayValue != "") {
                    var newDatapoint = traceDataPoint_1.TraceDataPoint.createSimpleDataPoint(datapoint.displayValue);
                    if (this_1._availableTraceDataPoints != undefined) {
                        var dataPointInfo = this_1._availableTraceDataPoints.value.filter(function (ele) { return ele.fullname == datapoint.displayValue; })[0];
                        if (dataPointInfo != undefined) {
                            newDatapoint = traceDataPoint_1.TraceDataPoint.createWithDataPointInfo(dataPointInfo);
                        }
                    }
                    datapoints.push(newDatapoint);
                }
            };
            var this_1 = this;
            for (var _i = 0, datapointParameters_1 = datapointParameters; _i < datapointParameters_1.length; _i++) {
                var datapoint = datapointParameters_1[_i];
                _loop_1(datapoint);
            }
            return datapoints;
        };
        MappCockpitTraceComponent.prototype.getStartTriggers = function (triggerParameters) {
            var startTriggers = new Array();
            var _loop_2 = function (triggerInstance) {
                var triggerInstanceId = "StartTrigger" + triggerInstance + "_";
                var dataPointNameParam = triggerParameters.filter(function (param) { return param.browseName == triggerInstanceId + "DataPoint"; })[0];
                if (dataPointNameParam != undefined) {
                    if (dataPointNameParam.value != "") { // Add no starttrigger if datapoint name is not defined
                        var startTrigger = this_2.getStartTrigger(dataPointNameParam.value, triggerInstanceId, triggerParameters);
                        startTriggers.push(startTrigger);
                    }
                }
            };
            var this_2 = this;
            for (var triggerInstance = 1; triggerInstance < 10; triggerInstance++) {
                _loop_2(triggerInstance);
            }
            return startTriggers;
        };
        MappCockpitTraceComponent.prototype.getStartTrigger = function (dataPointName, instanceId, componentParameters) {
            var condition = "";
            var conditionParam = componentParameters.filter(function (param) { return param.browseName == instanceId + "Condition"; })[0];
            if (conditionParam != undefined) {
                condition = conditionParam.value.toString();
            }
            var threshold = "";
            var thresholdParam = componentParameters.filter(function (param) { return param.browseName == instanceId + "Threshold"; })[0];
            if (thresholdParam != undefined) {
                threshold = thresholdParam.displayValue;
            }
            var triggerWindow = "";
            var triggerParam = componentParameters.filter(function (param) { return param.browseName == instanceId + "Window"; })[0];
            if (triggerParam != undefined) {
                triggerWindow = triggerParam.displayValue;
            }
            return new traceStartTrigger_1.TraceStartTrigger(condition, dataPointName, threshold, triggerWindow);
        };
        MappCockpitTraceComponent.prototype.updateDataPointInformations = function (traceConfigurationData) {
            var _this = this;
            traceConfigurationData.dataPoints.forEach(function (datapoint) {
                var dataPointInfo = _this._availableTraceDataPoints.value.filter(function (ele) { return ele.fullname == datapoint.dataPointName; })[0];
                if (dataPointInfo != undefined) {
                    var newDatapoint = traceDataPoint_1.TraceDataPoint.createWithDataPointInfo(dataPointInfo);
                    datapoint.componentName = newDatapoint.componentName;
                    datapoint.name = newDatapoint.name;
                    datapoint.description = newDatapoint.description;
                }
            });
        };
        Object.defineProperty(MappCockpitTraceComponent.prototype, "availableTraceDataPoints", {
            set: function (dataPoints) {
                this._availableTraceDataPoints = dataPoints;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "traceConfigurationData", {
            /**
             * Returns traceConfigurationData
             *
             * @readonly
             * @type {InterfaceTraceData}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._traceConfigurationData;
            },
            set: function (traceConfigurationData) {
                this._traceConfigurationData = traceConfigurationData;
                this.updateParameterInterface();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "mappCockpitComponent", {
            /**
             * Gets the MappCockpitComponent
             *
             * @readonly
             * @type {MappCockpitComponent}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._mappCockpitComponent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "traceControlInterface", {
            /**
             * Gets the TraceControlInterface
             *
             * @readonly
             * @type {ITraceComponentControl}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._traceControl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "traceParameters", {
            /**
             * Gets the Property<ITraceComponentParameters>
             *
             * @readonly
             * @type {Property<ITraceComponentParameters>}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._traceComponentParameterInterface;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "displayName", {
            /**
             * Gets the DisplayName
             *
             * @readonly
             * @type {Property<ITraceComponentParameters>}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._mappCockpitComponent.displayName;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitTraceComponent;
    }());
    exports.MappCockpitTraceComponent = MappCockpitTraceComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRUcmFjZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JBOzs7O09BSUc7SUFDSDtRQXlCSSxtQ0FBbUIsa0JBQWlELEVBQUUsb0JBQTBDO1lBdEJ4RyxpQkFBWSxHQUFHLEtBQUssQ0FBQztZQXVCekIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBQzlDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQztZQUVsRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMkJBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMseUJBQXlCLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQTRCLEVBQUUsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLHdDQUFzQixDQUFDLElBQUksS0FBSyxFQUFrQixFQUFFLElBQUksS0FBSyxFQUFpQyxFQUFFLElBQUksS0FBSyxFQUFxQixDQUFDLENBQUE7WUFDbEssSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksd0NBQXNCLENBQUMsSUFBSSxLQUFLLEVBQWlDLEVBQUUsSUFBSSxLQUFLLEVBQWlDLEVBQUUsSUFBSSxLQUFLLEVBQWlDLENBQUMsQ0FBQTtZQUU3TCxJQUFJLENBQUMsaUNBQWlDLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQ3hEO2dCQUNJLFVBQVUsRUFBRSxFQUFFO2dCQUNkLHdCQUF3QixFQUFFLElBQUksQ0FBQyx5QkFBeUI7Z0JBQ3hELHNCQUFzQixFQUFFLElBQUksQ0FBQyx1QkFBdUI7Z0JBQ3BELHNCQUFzQixF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UHRCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUM7WUFDbEQsQ0FBQzs7O1dBQUE7UUFDTCxnQ0FBQztJQUFELENBQUMsQUFyVkQsSUFxVkM7SUFHTyw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbXBvbmVudENvbnRyb2wgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlQ29udHJvbFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbXBvbmVudFBhcmFtZXRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbnRyb2wgfSBmcm9tIFwiLi90cmFjZUNvbnRyb2xcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIgfSBmcm9tIFwiLi4vbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWd1cmF0aW9uRGF0YSB9IGZyb20gXCIuL3RyYWNlQ29uZmlnL3RyYWNlQ29uZmlnRGF0YVwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFQb2ludCB9IGZyb20gXCIuL3RyYWNlRGF0YVBvaW50XCI7XHJcbmltcG9ydCB7IFRyYWNlU3RhcnRUcmlnZ2VyIH0gZnJvbSBcIi4vdHJhY2VTdGFydFRyaWdnZXJcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWd1cmF0aW9uSW5mbyB9IGZyb20gXCIuL3RyYWNlQ29uZmlnL3RyYWNlQ29uZmlnSW5mb1wiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFQb2ludEluZm8gfSBmcm9tIFwiLi90cmFjZURhdGFQb2ludEluZm9cIjtcclxuaW1wb3J0IHsgQ29tbWFuZCwgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSwgSUNvbW1hbmRFeGVjdXRpb25SZXNwb25zZURlbGVnYXRlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb21tYW5kXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbyB9IGZyb20gXCIuLi8uLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ3NcIjtcclxuaW1wb3J0ICogYXMgQmluZGluZyBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9iaW5kaW5nRGVjbGFyYXRpb25zXCI7XHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgZGF0YSBmb3IgZGVzY3JpYmluZyBhIHRyYWNlIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudHtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBSZWZlcmVuY2VzIHRoZSBkaWFnbm9zdGljIHByb3ZpZGVyXHJcbiAgICBwcml2YXRlIF9kaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyO1xyXG5cclxuICAgIHByaXZhdGUgX21hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudDtcclxuICAgIHByaXZhdGUgX3RyYWNlQ29tcG9uZW50UGFyYW1ldGVySW50ZXJmYWNlOiBQcm9wZXJ0eTxJVHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzPjtcclxuICAgIHByaXZhdGUgX3RyYWNlQ29udHJvbCE6IFRyYWNlQ29udHJvbDtcclxuICAgIFxyXG4gICAgLy8gSG9sZHMgdGhlIGF2YWlsYWJsZSB0cmFjZSBkYXRhIHBvaW50cztcclxuICAgIHByaXZhdGUgX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50czogUHJvcGVydHk8QXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPj47XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIGNvbW1hbmQgZm9yIHJlYWRpbmcgdGhlIHRyYWNlIHBhcmFtZXRlcnNcclxuICAgIHByaXZhdGUgX2NvbW1hbmRSZWFkVHJhY2VQYXJhbWV0ZXJzITogQ29tbWFuZDwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT47XHJcbiAgICAvLyBIb2xkcyB0aGUgY29tbWFuZCBmb3Igd3JpdGluZyB0aGUgdHJhY2UgcGFyYW1ldGVyc1xyXG4gICAgcHJpdmF0ZSBfY29tbWFuZFdyaXRlVHJhY2VQYXJhbWV0ZXJzITogQ29tbWFuZDwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT47XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIGVmZmVjdGl2ZSB0cmFjZSBjb25maWd1cmF0aW9uIGRhdGFcclxuICAgIHByaXZhdGUgX3RyYWNlQ29uZmlndXJhdGlvbkRhdGE6IFRyYWNlQ29uZmlndXJhdGlvbkRhdGE7XHJcbiAgICAvLyB0cmFjZSBjb25maWd1cmF0aW9uIGRhdGEgaW5mb3JtYXRpb25cclxuICAgIHByaXZhdGUgX3RyYWNlQ29uZmlndXJhdGlvbkluZm86IFRyYWNlQ29uZmlndXJhdGlvbkluZm87XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGRpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIsIG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCl7XHJcbiAgICAgICAgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyID0gZGlhZ25vc3RpY1Byb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMuX21hcHBDb2NrcGl0Q29tcG9uZW50ID0gbWFwcENvY2twaXRDb21wb25lbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbCA9IG5ldyBUcmFjZUNvbnRyb2wodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyKTtcclxuICAgICAgICB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMgPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPj4oW10pO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkRhdGEgPSBuZXcgVHJhY2VDb25maWd1cmF0aW9uRGF0YShuZXcgQXJyYXk8VHJhY2VEYXRhUG9pbnQ+KCksIG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKSwgbmV3IEFycmF5PFRyYWNlU3RhcnRUcmlnZ2VyPigpKVxyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkluZm8gPSBuZXcgVHJhY2VDb25maWd1cmF0aW9uSW5mbyhuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCksIG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKSwgbmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPigpKVxyXG5cclxuICAgICAgICB0aGlzLl90cmFjZUNvbXBvbmVudFBhcmFtZXRlckludGVyZmFjZSA9IFByb3BlcnR5LmNyZWF0ZTxJVHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzPihcclxuICAgICAgICB7IFxyXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiBbXSwgXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50czogdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzLFxyXG4gICAgICAgICAgICB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhOiB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25EYXRhLFxyXG4gICAgICAgICAgICB0cmFjZUNvbmZpZ3VyYXRpb25JbmZvOiB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25JbmZvLFxyXG4gICAgICAgICAgICBjb21tYW5kUmVhZDogdGhpcy5fY29tbWFuZFJlYWRUcmFjZVBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAgIGNvbW1hbmRXcml0ZTogdGhpcy5fY29tbWFuZFdyaXRlVHJhY2VQYXJhbWV0ZXJzLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRzKCk7XHJcbiAgICBcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudEJpbmRpbmdzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBiaW5kaW5ncyB0byBvdGhlciBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50QmluZGluZ3MoKSB7XHJcbiAgICAgICAgQmluZGluZ3MuY3JlYXRlQnlEZWNsKEJpbmRpbmcuVHJhY2VzLkNvbmZpZ3VyYXRpb24uRGF0YVBvaW50cywgdGhpcywgXCJcIiwgXCJ1cGRhdGVUcmFjZURhdGFQb2ludHNcIiwgZmFsc2UpO1xyXG4gICAgICAgIEJpbmRpbmdzLmNyZWF0ZUJ5RGVjbChCaW5kaW5nLlRyYWNlcy5Db25maWd1cmF0aW9uLlN0YXJ0VHJpZ2dlckluZm9zLCB0aGlzLCBcIlwiLCBcInVwZGF0ZVRyYWNlU3RhcnRUcmlnZ2VySW5mb1wiLCBmYWxzZSk7XHJcbiAgICAgICAgQmluZGluZ3MuY3JlYXRlQnlEZWNsKEJpbmRpbmcuVHJhY2VzLkNvbmZpZ3VyYXRpb24uVGltaW5nSW5mb3MsIHRoaXMsIFwiXCIsIFwidXBkYXRlVHJhY2VUaW1pbmdQYXJhbWV0ZXJzXCIsIGZhbHNlKTtcclxuICAgIH1cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGV4cG9zZWQgY29tbWFuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kcygpIHtcclxuICAgICAgICB0aGlzLl9jb21tYW5kUmVhZFRyYWNlUGFyYW1ldGVycyA9IENvbW1hbmQuY3JlYXRlKHRoaXMsIHRoaXMuZXhlY3V0ZUNvbW1hbmRSZWFkVHJhY2VQYXJhbWV0ZXJzKCkpO1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRXcml0ZVRyYWNlUGFyYW1ldGVycyA9IENvbW1hbmQuY3JlYXRlKHRoaXMsIHRoaXMuZXhlY3V0ZUNvbW1hbmRXcml0ZVRyYWNlUGFyYW1ldGVycygpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEltcGxlbWVudHMgdGhlIGNvbW1hbmQgZm9yIHJlYWRpbmcgdGhlIHRyYWNlIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGVDb21tYW5kUmVhZFRyYWNlUGFyYW1ldGVycygpOiBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPntcclxuICAgICAgICByZXR1cm4gKHRyYWNlUGFyYW1ldGVyczpNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLGNvbW1hbmRSZXNwb25zZTogSUNvbW1hbmRFeGVjdXRpb25SZXNwb25zZURlbGVnYXRlPE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbWV0ZXJzVG9SZWFkID0gdHJhY2VQYXJhbWV0ZXJzID8gdHJhY2VQYXJhbWV0ZXJzIDogdGhpcy5tYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIucmVhZFBhcmFtZXRlclZhbHVlcyhwYXJhbWV0ZXJzVG9SZWFkKS50aGVuKCh1cGRhdGVkUGFyYW1ldGVycykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKHVwZGF0ZWRQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1wbGVtZW50cyB0aGUgY29tbWFuZCBmb3Igd3JpdGluZyB0aGUgdHJhY2UgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZXhlY3V0ZUNvbW1hbmRXcml0ZVRyYWNlUGFyYW1ldGVycygpOiBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPntcclxuICAgICAgIHJldHVybiAodHJhY2VQYXJhbWV0ZXJzOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sY29tbWFuZFJlc3BvbnNlOiBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4pID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtZXRlcnNUb1dyaXRlID0gdHJhY2VQYXJhbWV0ZXJzID8gdHJhY2VQYXJhbWV0ZXJzIDogdGhpcy5tYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIud3JpdGVQYXJhbWV0ZXJWYWx1ZXMocGFyYW1ldGVyc1RvV3JpdGUpLnRoZW4oKHVwZGF0ZWRQYXJhbWV0ZXJzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQodXBkYXRlZFBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGluaXRpYWxpemUoKXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5faW5pdGlhbGl6ZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb25uZWN0Q29tcG9uZW50KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbC5pbml0aWFsaXplKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25JbmZvID0gbmV3IFRyYWNlQ29uZmlndXJhdGlvbkluZm8oTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlVHJhY2VDb25maWd1cmF0aW9uRGF0YXBvaW50cyh0aGlzLm1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlVHJhY2VDb25maWd1cmF0aW9uVGltaW5nUGFyYW1ldGVycyh0aGlzLm1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZVRyYWNlQ29uZmlndXJhdGlvblRyaWdnZXJQYXJhbWV0ZXJzKHRoaXMubWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycykpO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkRhdGEgPSB0aGlzLmdldFRyYWNlQ29uZmlndXJhdGlvbkRhdGEodGhpcy5fdHJhY2VDb25maWd1cmF0aW9uSW5mbyk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVySW50ZXJmYWNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQYXJhbWV0ZXJJbnRlcmZhY2UoKXtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbXBvbmVudFBhcmFtZXRlckludGVyZmFjZS52YWx1ZSA9IHtcclxuICAgICAgICAgICAgcGFyYW1ldGVyczogdGhpcy5tYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICBhdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyxcclxuICAgICAgICAgICAgdHJhY2VDb25maWd1cmF0aW9uRGF0YTogdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uRGF0YSxcclxuICAgICAgICAgICAgdHJhY2VDb25maWd1cmF0aW9uSW5mbzogdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uSW5mbyxcclxuICAgICAgICAgICAgY29tbWFuZFJlYWQ6IHRoaXMuX2NvbW1hbmRSZWFkVHJhY2VQYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICBjb21tYW5kV3JpdGU6IHRoaXMuX2NvbW1hbmRXcml0ZVRyYWNlUGFyYW1ldGVycyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVRyYWNlVGltaW5nUGFyYW1ldGVycyh0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25EYXRhLnRpbWluZ1BhcmFtZXRlcnMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVHJhY2VEYXRhUG9pbnRzKHRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkRhdGEuZGF0YVBvaW50cyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXJ0VHJpZ2dlckluZm9zID0ge2RhdGE6dGhpcy5fdHJhY2VDb25maWd1cmF0aW9uRGF0YS5zdGFydFRyaWdnZXJzLCBpbmZvOnRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkluZm8uc3RhcnRUcmlnZ2VySW5mb3N9XHJcbiAgICAgICAgdGhpcy51cGRhdGVUcmFjZVN0YXJ0VHJpZ2dlckluZm8oc3RhcnRUcmlnZ2VySW5mb3MpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRyYWNlIHN0YXJ0IHRyaWdnZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhY2VTdGFydFRyaWdnZXJbXX0gc3RhcnRUcmlnZ2Vyc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUcmFjZVN0YXJ0VHJpZ2dlckluZm8oc3RhcnRUcmlnZ2VySW5mbzogeyBkYXRhOlRyYWNlU3RhcnRUcmlnZ2VyW10gLCBpbmZvOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119KSB7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogbWV0aG9kIHN0dWIgdG8gbWFrZSB0aGUgcGFzc2VkIGRhdGEgYmluZGFibGVcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0cmFjZSBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlRGF0YVBvaW50W119IGRhdGFQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlVHJhY2VEYXRhUG9pbnRzKGRhdGFQb2ludHM6IFRyYWNlRGF0YVBvaW50W10pIHtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBtZXRob2Qgc3R1YiB0byBtYWtlIHRoZSBwYXNzZWQgZGF0YSBiaW5kYWJsZVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRyYWNlIHRpbWluZyBwYXJhbWV0ZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHRpbWluZ1BhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlVHJhY2VUaW1pbmdQYXJhbWV0ZXJzKHRpbWluZ1BhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBtZXRob2Qgc3R1YiB0byBtYWtlIHRoZSBwYXNzZWQgZGF0YSBiaW5kYWJsZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIHRyYWNlIGNvbXBvbmVudCB0byB0aGUgdGFyZ2V0IGFuZCBicm93c2VzIHRoZSBtZXRob2RzLHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gdHJhY2VDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY29ubmVjdENvbXBvbmVudCgpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuYnJvd3NlUGFyYW1ldGVycyh0aGlzLl9tYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnVwZGF0ZVBhcmFtZXRlckRhdGFUeXBlcyh0aGlzLl9tYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzKTtcclxuICAgICAgICBhd2FpdCB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuYnJvd3NlTWV0aG9kcyh0aGlzLl9tYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLmJyb3dzZU1ldGhvZFBhcmFtZXRlcnModGhpcy5fbWFwcENvY2twaXRDb21wb25lbnQubWV0aG9kcyk7XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5yZWFkUGFyYW1ldGVyVmFsdWVzKHRoaXMuX21hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VHJhY2VDb25maWd1cmF0aW9uRGF0YSh0cmFjZUNvbmZpZ3VyYXRpb25JbmZvOiBUcmFjZUNvbmZpZ3VyYXRpb25JbmZvKTogVHJhY2VDb25maWd1cmF0aW9uRGF0YXtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgZGF0YXBvaW50c1xyXG4gICAgICAgIGxldCBkYXRhcG9pbnRzID0gdGhpcy5nZXREYXRhUG9pbnRzKHRyYWNlQ29uZmlndXJhdGlvbkluZm8uZGF0YVBvaW50SW5mb3MpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aW1pbmcgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCB0aW1pbmdQYXJhbWV0ZXJzID0gdHJhY2VDb25maWd1cmF0aW9uSW5mby50aW1pbmdQYXJhbWV0ZXJJbmZvcztcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgc3RhcnQgdHJpZ2dlciBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbGV0IHN0YXJ0VHJpZ2dlcnMgPSB0aGlzLmdldFN0YXJ0VHJpZ2dlcnModHJhY2VDb25maWd1cmF0aW9uSW5mby5zdGFydFRyaWdnZXJJbmZvcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIHRyYWNlIGNvbmZpZ3VyYXRpb24gZGF0YVxyXG4gICAgICAgIHJldHVybiBuZXcgVHJhY2VDb25maWd1cmF0aW9uRGF0YShkYXRhcG9pbnRzLCB0aW1pbmdQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERhdGFQb2ludHMoZGF0YXBvaW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IEFycmF5PFRyYWNlRGF0YVBvaW50PntcclxuICAgICAgICBsZXQgZGF0YXBvaW50cyA9IG5ldyBBcnJheTxUcmFjZURhdGFQb2ludD4oKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZGF0YXBvaW50IG9mIGRhdGFwb2ludFBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGFwb2ludC5kaXNwbGF5VmFsdWUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0RhdGFwb2ludCA9IFRyYWNlRGF0YVBvaW50LmNyZWF0ZVNpbXBsZURhdGFQb2ludChkYXRhcG9pbnQuZGlzcGxheVZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhUG9pbnRJbmZvID0gdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzLnZhbHVlLmZpbHRlcihlbGUgPT4ge3JldHVybiBlbGUuZnVsbG5hbWUgPT0gZGF0YXBvaW50LmRpc3BsYXlWYWx1ZX0pWzBdO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVBvaW50SW5mbyAhPSB1bmRlZmluZWQpICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGFwb2ludCA9IFRyYWNlRGF0YVBvaW50LmNyZWF0ZVdpdGhEYXRhUG9pbnRJbmZvKGRhdGFQb2ludEluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRhdGFwb2ludHMucHVzaChuZXdEYXRhcG9pbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U3RhcnRUcmlnZ2Vycyh0cmlnZ2VyUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IFRyYWNlU3RhcnRUcmlnZ2VyW117XHJcbiAgICAgICAgbGV0IHN0YXJ0VHJpZ2dlcnMgPSBuZXcgQXJyYXk8VHJhY2VTdGFydFRyaWdnZXI+KCk7XHJcbiAgICAgICAgZm9yKGxldCB0cmlnZ2VySW5zdGFuY2UgPSAxOyB0cmlnZ2VySW5zdGFuY2UgPCAxMDsgdHJpZ2dlckluc3RhbmNlKyspeyAvLyBTZWFyY2ggZm9yIHN0YXJ0IHRyaWdnZXJzIHdpdGggYSBkZWZpbmVkIGRhdGFwb2ludCBuYW1lXHJcbiAgICAgICAgICAgIGxldCB0cmlnZ2VySW5zdGFuY2VJZCA9IFwiU3RhcnRUcmlnZ2VyXCIgKyB0cmlnZ2VySW5zdGFuY2UgKyBcIl9cIjtcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludE5hbWVQYXJhbSA9IHRyaWdnZXJQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbSA9PiBwYXJhbS5icm93c2VOYW1lID09IHRyaWdnZXJJbnN0YW5jZUlkICsgXCJEYXRhUG9pbnRcIilbMF07XHJcbiAgICAgICAgICAgIGlmKGRhdGFQb2ludE5hbWVQYXJhbSAhPSB1bmRlZmluZWQpeyBcclxuICAgICAgICAgICAgICAgIGlmKGRhdGFQb2ludE5hbWVQYXJhbS52YWx1ZSAhPSBcIlwiKXsgLy8gQWRkIG5vIHN0YXJ0dHJpZ2dlciBpZiBkYXRhcG9pbnQgbmFtZSBpcyBub3QgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydFRyaWdnZXIgPSB0aGlzLmdldFN0YXJ0VHJpZ2dlcihkYXRhUG9pbnROYW1lUGFyYW0udmFsdWUsIHRyaWdnZXJJbnN0YW5jZUlkLCB0cmlnZ2VyUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUcmlnZ2Vycy5wdXNoKHN0YXJ0VHJpZ2dlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YXJ0VHJpZ2dlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTdGFydFRyaWdnZXIoZGF0YVBvaW50TmFtZTogc3RyaW5nLCBpbnN0YW5jZUlkOiBzdHJpbmcsIGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBUcmFjZVN0YXJ0VHJpZ2dlciB7XHJcbiAgICAgICAgbGV0IGNvbmRpdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGNvbmRpdGlvblBhcmFtID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW0gPT4gcGFyYW0uYnJvd3NlTmFtZSA9PSBpbnN0YW5jZUlkICsgXCJDb25kaXRpb25cIilbMF07XHJcbiAgICAgICAgaWYoY29uZGl0aW9uUGFyYW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uZGl0aW9uID0gY29uZGl0aW9uUGFyYW0udmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBsZXQgdGhyZXNob2xkID0gXCJcIjtcclxuICAgICAgICBsZXQgdGhyZXNob2xkUGFyYW0gPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbSA9PiBwYXJhbS5icm93c2VOYW1lID09IGluc3RhbmNlSWQgKyBcIlRocmVzaG9sZFwiKVswXTtcclxuICAgICAgICBpZih0aHJlc2hvbGRQYXJhbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aHJlc2hvbGQgPSB0aHJlc2hvbGRQYXJhbS5kaXNwbGF5VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0cmlnZ2VyV2luZG93ID0gXCJcIjtcclxuICAgICAgICBsZXQgdHJpZ2dlclBhcmFtID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW0gPT4gcGFyYW0uYnJvd3NlTmFtZSA9PSBpbnN0YW5jZUlkICsgXCJXaW5kb3dcIilbMF07XHJcbiAgICAgICAgaWYodHJpZ2dlclBhcmFtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRyaWdnZXJXaW5kb3cgPSB0cmlnZ2VyUGFyYW0uZGlzcGxheVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmV3IFRyYWNlU3RhcnRUcmlnZ2VyKGNvbmRpdGlvbiwgZGF0YVBvaW50TmFtZSwgdGhyZXNob2xkLCB0cmlnZ2VyV2luZG93KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHVwZGF0ZURhdGFQb2ludEluZm9ybWF0aW9ucyh0cmFjZUNvbmZpZ3VyYXRpb25EYXRhOiBUcmFjZUNvbmZpZ3VyYXRpb25EYXRhKXtcclxuICAgICAgICB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhLmRhdGFQb2ludHMuZm9yRWFjaChkYXRhcG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGF0YVBvaW50SW5mbyA9IHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cy52YWx1ZS5maWx0ZXIoZWxlID0+IHtyZXR1cm4gZWxlLmZ1bGxuYW1lID09IGRhdGFwb2ludC5kYXRhUG9pbnROYW1lfSlbMF07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihkYXRhUG9pbnRJbmZvICE9IHVuZGVmaW5lZCkgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdEYXRhcG9pbnQgPSBUcmFjZURhdGFQb2ludC5jcmVhdGVXaXRoRGF0YVBvaW50SW5mbyhkYXRhUG9pbnRJbmZvKTtcclxuICAgICAgICAgICAgICAgIGRhdGFwb2ludC5jb21wb25lbnROYW1lID0gbmV3RGF0YXBvaW50LmNvbXBvbmVudE5hbWU7XHJcbiAgICAgICAgICAgICAgICBkYXRhcG9pbnQubmFtZSA9IG5ld0RhdGFwb2ludC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgZGF0YXBvaW50LmRlc2NyaXB0aW9uID0gbmV3RGF0YXBvaW50LmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhdmFpbGFibGVUcmFjZURhdGFQb2ludHMoZGF0YVBvaW50cyA6IFByb3BlcnR5PEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4+KSB7XHJcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzID0gZGF0YVBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJhY2VDb25maWd1cmF0aW9uRGF0YVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0ludGVyZmFjZVRyYWNlRGF0YX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdHJhY2VDb25maWd1cmF0aW9uRGF0YSgpOiBUcmFjZUNvbmZpZ3VyYXRpb25EYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRyYWNlQ29uZmlndXJhdGlvbkRhdGEodHJhY2VDb25maWd1cmF0aW9uRGF0YSA6IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEpIHtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25EYXRhID0gdHJhY2VDb25maWd1cmF0aW9uRGF0YTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlckludGVyZmFjZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdENvbXBvbmVudH1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbWFwcENvY2twaXRDb21wb25lbnQoKTogTWFwcENvY2twaXRDb21wb25lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBwQ29ja3BpdENvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIFRyYWNlQ29udHJvbEludGVyZmFjZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0lUcmFjZUNvbXBvbmVudENvbnRyb2x9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRyYWNlQ29udHJvbEludGVyZmFjZSgpOiBJVHJhY2VDb21wb25lbnRDb250cm9sIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2VDb250cm9sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgUHJvcGVydHk8SVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycz5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtQcm9wZXJ0eTxJVHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdHJhY2VQYXJhbWV0ZXJzKCk6IFByb3BlcnR5PElUcmFjZUNvbXBvbmVudFBhcmFtZXRlcnM+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2VDb21wb25lbnRQYXJhbWV0ZXJJbnRlcmZhY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBEaXNwbGF5TmFtZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge1Byb3BlcnR5PElUcmFjZUNvbXBvbmVudFBhcmFtZXRlcnM+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkaXNwbGF5TmFtZSgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwcENvY2twaXRDb21wb25lbnQuZGlzcGxheU5hbWU7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQge01hcHBDb2NrcGl0VHJhY2VDb21wb25lbnR9Il19