var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
define(["require", "exports", "./cmGroup", "../dataModelBase", "../dataModelInterface", "../online/mappCockpitComponent", "../online/mappCockpitComponentReflection", "../online/mappCockpitComponentService"], function (require, exports, cmGroup_1, dataModelBase_1, dataModelInterface_1, mappCockpitComponent_1, mappCockpitComponentReflection_1, mappCockpitComponentService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfigManagerDataModel = /** @class */ (function (_super) {
        __extends(ConfigManagerDataModel, _super);
        function ConfigManagerDataModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Holds the service channel
             *
             * @private
             * @type {(MappCockpitComponentService | null)}
             * @memberof ConfigManagerDataModel
             */
            _this._serviceChannel = null;
            /**
             * Holds the last active parameters
             *
             * @private
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof ConfigManagerDataModel
             */
            _this._currentActiveComponentParameters = [];
            // holds the actual connected component
            _this._actualComponent = undefined;
            /**
             * DataModel changed handler
             *
             * @private
             * @memberof ConfigManagerDataModel
             */
            _this._dataModelChangedHandler = function (sender, eventArgs) { _this.handleModelChanged(sender, eventArgs); };
            /**
             * Holds the info if the datamodel is currently in edit mode
             *
             * @private
             * @type {boolean}
             * @memberof ConfigManagerDataModel
             */
            _this._editModeActive = false;
            return _this;
        }
        /**
         * Initialize the configmanager datamodel
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.initialize = function () {
            // watch the data model for change events
            this.eventModelChanged.attach(this._dataModelChangedHandler);
            _super.prototype.initialize.call(this);
        };
        /**
         * Initialize the component
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        /**
         * Dispose the configmanager datamodel
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.dispose = function () {
            var _a;
            this.eventModelChanged.detach(this._dataModelChangedHandler);
            // destroy observables
            mappCockpitComponent_1.MappCockpitComponentParameter.unobserveAll(this, (_a = this._currentActiveComponentParameters[0]) === null || _a === void 0 ? void 0 : _a.component);
        };
        Object.defineProperty(ConfigManagerDataModel.prototype, "configurationParameters", {
            /**
             * Sets the configurationparameters as the data source for the configuration manager datamodel
             *
             * @memberof ConfigManagerDataModel
             */
            set: function (configurationParameters) {
                var componentParameters = configurationParameters;
                if (componentParameters.length > 0) {
                    this.onComponentParametersUpdated(componentParameters);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigManagerDataModel.prototype, "componentParameters", {
            /**
             * Returns the parameters of the component which is used in this datamodel
             *
             * @readonly
             * @type {(MappCockpitComponentParameter[]|undefined)}
             * @memberof ConfigManagerDataModel
             */
            get: function () {
                return this._componentParameters;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Handle component parameters update
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.onComponentParametersUpdated = function (componentParameters) {
            // filter the configuration parameters and update the parameter values
            if (componentParameters.length != 0 && componentParameters[0] != undefined) {
                this._componentParameters = componentParameters;
                this._actualComponent = this.getComponentFromParameters();
                if (this._actualComponent != undefined) {
                    this._data = this.createDataModelData(this._actualComponent);
                    // observe the service channel
                    this.connectServiceChannel(this._actualComponent);
                }
                this.observeConfigParameters(componentParameters);
                // Initialize the datamodel after observing the first data
                this.updateFiltersInDataModel();
                this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
            }
        };
        /**
         * Connects to the service channel for calling service methods (...bulk write) and observing service notifications
         *
         * @private
         * @param {MappCockpitComponent} component
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.connectServiceChannel = function (component) {
            if (component.serviceChannel) {
                // connect and preserve the service channel
                this._serviceChannel = component.serviceChannel;
                // observe the service notification
                this.observeParameterSetWriteResponse(component);
            }
        };
        /**
           * handles the component parameter update.
           *
           * @param {MappCockpitComponentDataModel} sender
           * @param {EventModelChangedArgs} eventArgs
           * @memberof ConfigManagerDataModel
           */
        ConfigManagerDataModel.prototype.handleEventComponentParametersUpdated = function (sender, eventArgs) {
            var componentParameters = eventArgs.data;
            if (componentParameters) {
                var configParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveConfigurationParameters(componentParameters);
                if (configParameters.length > 0) {
                    this._componentParameters = configParameters;
                    var component = this.getComponentFromParameters();
                    if (component != undefined) {
                        this._data = this.createDataModelData(component);
                    }
                }
                this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
            }
        };
        /**
         * Returns the configuration structure metaInfo for the given component
         *
         * @private
         * @param {MappCockpitComponent} component
         * @returns {*} metaInfo object from the component
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.getMetaInfoFromComponent = function (component) {
            var compMetaData = component.metaData;
            if (compMetaData != undefined) {
                return compMetaData.MetaConfigConfigProps;
            }
            return undefined;
        };
        /**
         * handles model changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.handleModelChanged = function (sender, eventArgs) {
            // external model changes with change type "updateSource" have to be forwarded (written) to the source
            if (eventArgs.caller !== this && eventArgs.changeType === dataModelInterface_1.ModelChangeType.updateSource) {
                console.log("handleModelChanged (%o) : %o", this, eventArgs);
                var modifiedComponentParameter = eventArgs.hint.changedItemData.componentParameter;
                // modify parameter value
                this.modifyParameter(modifiedComponentParameter, eventArgs.hint.newItemData);
            }
        };
        /**
         * Modifies the specified parameter value
         *
         * @param {MappCockpitComponentParameter} modifiedParameter
         * @param {*} newItemData
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.modifyParameter = function (modifiedParameter, value) {
            // preserve the modified value ...
            modifiedParameter.modifiedDisplayValue = value;
        };
        /**
         * Applies the modified parameter set
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.applyModifiedParameters = function () {
            var _this = this;
            // get the modified parameters
            var modifiedParameters = this.getModifiedParameters();
            // exit on no parameters to modify or the component not defined
            if (modifiedParameters.length > 0) {
                // get the component holding the parameters
                var component = modifiedParameters[0].component;
                if (component && component.serviceChannel) {
                    // invoke writing the parameter set
                    (function (component) { return __awaiter(_this, void 0, void 0, function () {
                        var success;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, component.serviceChannel.writeParameterSet(modifiedParameters)];
                                case 1:
                                    success = _a.sent();
                                    if (success) {
                                        // the request has been invoked successfully ....-> wait for  and handle response event
                                        console.log("Parameter write pending ...: %0 ", modifiedParameters);
                                    }
                                    else {
                                        // the request could not be invoked successfully ... -> handle request failure
                                        console.log("Could not write parameters: %0 ", modifiedParameters);
                                        this.setParametersTransferFailed(modifiedParameters);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })(component);
                }
                else {
                    console.error("Component or service channel of the component not available!");
                }
            }
        };
        /**
         * Sets all the given parameters to transferFailed
         *
         * @private
         * @param {MappCockpitComponentParameter[]} modifiedParameters
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.setParametersTransferFailed = function (modifiedParameters) {
            modifiedParameters.forEach(function (modifiedParameters) {
                modifiedParameters.transferFailed = true;
            });
            // Update transfer failed icon in the view 
            this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
        };
        /**
         * Returns the modified parameters
         *
         * @private
         * @returns {Array<MappCockpitComponentParameter>}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.getModifiedParameters = function () {
            var _this = this;
            var modifiedParameters = new Array();
            this.componentParameters.forEach(function (parameter) {
                if (parameter.modifiedValue != undefined) {
                    var isFiltered = _this.isParameterFiltered(parameter, _this._data);
                    if (isFiltered == false) {
                        // Add parameter only to modified parameter list if parameter is not filtered(not shown in config manager)
                        modifiedParameters.push(parameter);
                    }
                }
            });
            return modifiedParameters;
        };
        /**
         * Returns true if this component parameter is used within a filtered configManager parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} componentParameter
         * @param {Array<ICmParameter>} parameters
         * @returns {boolean}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.isParameterFiltered = function (componentParameter, parameters) {
            for (var i = 0; i <= parameters.length; i++) {
                var parameter = parameters[i];
                if (parameter != undefined) {
                    if (parameter.componentParameter == componentParameter) {
                        if (parameter.filter != undefined) {
                            if (parameter.filter.active == true) {
                                return true;
                            }
                        }
                    }
                    else if (parameter instanceof cmGroup_1.CmGroup) {
                        var filtered = this.isParameterFiltered(componentParameter, parameter.childs);
                        if (filtered == true) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        /**
         * Discards user edited parameter modifications
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.discardModifications = function () {
            // clear modifications 
            this.clearModifiedParameters();
        };
        /**
         * Sets the edit mode and updates the datamodel
         *
         * @param {boolean} active
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.setEditModeActive = function (active) {
            this._editModeActive = active;
            var component = this.getComponentFromParameters();
            if (component != undefined) {
                this.setDataModelActive(active);
                this.updateFiltersInDataModel();
            }
        };
        /**
         * Sets the edit mode for the data model.
         *
         * @private
         * @param {boolean} active
         * @returns {*}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.setDataModelActive = function (active) {
            this.parseDataModel(this._data, function (cmParameter) {
                cmParameter.editModeActive = active;
            });
        };
        /**
         * Returns the component of the given component parameters(first parameter)
         *
         * @private
         * @returns {(MappCockpitComponentItem|undefined)}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.getComponentFromParameters = function () {
            if (this.componentParameters != undefined) {
                if (this.componentParameters.length > 0) {
                    var component = this.componentParameters[0].component;
                    if (component != null) {
                        return component;
                    }
                }
            }
            return undefined;
        };
        /**
         * Marks the parameters with a flag that the parameter value was not transfered
         *
         * @private
         * @param {(Array<ComponentServiceResponseDataChangedParameter>|undefined)} [failedParameters=undefined]
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.setTransferFailedParameters = function (failedParameters) {
            this.componentParameters.forEach(function (parameter) {
                var foundParam = failedParameters.find(function (param) { return param.key == parameter.browseName; });
                if (foundParam != undefined) {
                    parameter.transferFailed = true;
                }
            });
        };
        /**
         * Clears the modified parameters
         *
         * @private
         * @param {(Array<ComponentServiceResponseDataChangedParameter>|undefined)} [parametersToClear=undefined]
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.clearModifiedParameters = function (parametersToClear) {
            if (parametersToClear === void 0) { parametersToClear = undefined; }
            this.componentParameters.forEach(function (parameter) {
                if (parametersToClear == undefined) {
                    parameter.modifiedValue = undefined;
                    parameter.transferFailed = false;
                }
                else {
                    var paramFound = parametersToClear.find(function (param) { return param.key == parameter.browseName; });
                    if (paramFound != undefined) {
                        parameter.modifiedValue = undefined;
                        parameter.transferFailed = false;
                    }
                }
            });
            this.updateFiltersInDataModel();
        };
        /**
         * Updates all filters and raises the model changed event
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.updateFiltersInDataModel = function () {
            // update the active parameter set according to the filter criteria
            this.updateFilterState();
            // update parameter change observation
            this.updateActiveParameterObservables();
            // Update modified value (modified icon) in the view 
            this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
        };
        /**
         * Retrieves the active parameters and updates the required observables (monitored items)
         *
         * @private
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.updateActiveParameterObservables = function () {
            // get the currently active and obsolete parameters
            var _a = this.retrieveParameterSetChanges(), activatedParameters = _a.activatedParameters, deactivatedParameters = _a.deactivatedParameters, newActiveConfigParameters = _a.newActiveConfigParameters;
            // add new observers and remove obsolete ones.
            this.updateParameterObservables(activatedParameters, deactivatedParameters);
            // keep the currently activated parameters.
            this._currentActiveComponentParameters = newActiveConfigParameters;
        };
        /**
         * Detects changes of the active parameter set and returns the activated and obsolete parameters
         *
         * @private
         * @returns
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.retrieveParameterSetChanges = function () {
            var _this = this;
            // retrieve the currently active parameters
            var newActiveConfigParameters = this.retrieveActiveParameters(this._data);
            // find newly activated parameters to be observed
            var activatedParameters = newActiveConfigParameters.filter(function (parameter) { return !_this._currentActiveComponentParameters.includes(parameter); });
            // find obsolete parameters to be unobserved
            var deactivatedParameters = this._currentActiveComponentParameters.filter(function (parameter) { return !newActiveConfigParameters.includes(parameter); });
            return { activatedParameters: activatedParameters, deactivatedParameters: deactivatedParameters, newActiveConfigParameters: newActiveConfigParameters };
        };
        /**
         * Updates the active monitored items for observing parameter changes
         *
         * @private
         * @param {MappCockpitComponentParameter[]} activatedParameters
         * @param {MappCockpitComponentParameter[]} deactivatedParameters
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.updateParameterObservables = function (activatedParameters, deactivatedParameters) {
            var _this = this;
            // create and call an async context to make sure that observing and unobserving is called strictly consecutive.
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(activatedParameters.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.observeConfigParameterValues(activatedParameters)];
                        case 1:
                            _a.sent();
                            console.log("ConfigManagerDataModel:observed - %o", activatedParameters);
                            _a.label = 2;
                        case 2:
                            if (!(deactivatedParameters.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.unobserveConfigParameterValues(deactivatedParameters)];
                        case 3:
                            _a.sent();
                            console.log("ConfigManagerDataModel:unobserved - %o", deactivatedParameters);
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); })();
        };
        /**
         * Creates the datamodel data for the given metaInformation
         *
         * @private
         * @param {*} metaInformation
         * @returns {Array<ICmGroup>}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.createDataModelData = function (component) {
            var _this = this;
            var metaInformation = this.getMetaInfoFromComponent(component);
            var metaInformationDataModel = new Array();
            if (metaInformation.ConfigurationStructure != null) {
                if (metaInformation.ConfigurationStructure.Childs != null) {
                    metaInformation.ConfigurationStructure.Childs.forEach(function (element) {
                        metaInformationDataModel.push(new cmGroup_1.CmGroup(element.Group, _this.componentParameters, _this._editModeActive));
                    });
                }
            }
            return metaInformationDataModel;
        };
        /**
         * Updates all filters of the given cmParameters(or the whole datamodel if undefined)if they are active or not for there corresponding values
         *
         * @param {(ICmParameter[]|undefined)} [cmParameters=undefined]
         * @returns
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.updateFilterState = function (cmParameters) {
            var _this = this;
            if (cmParameters === void 0) { cmParameters = undefined; }
            if (cmParameters == undefined) {
                cmParameters = this._data;
            }
            if (cmParameters == undefined) {
                return;
            }
            cmParameters.forEach(function (element) {
                if (element instanceof cmGroup_1.CmGroup) {
                    if (element.filter != null) {
                        _this.updateFilter(element.filter, element.editModeActive);
                    }
                    if (element.childs != null) {
                        _this.updateFilterState(element.childs);
                    }
                }
                else {
                    if (element.filter != null) {
                        _this.updateFilter(element.filter, element.editModeActive);
                    }
                }
            });
        };
        /**
         * Retrieves the flat parameters currently active (or needed for filtering)
         *
         * @private
         * @param {ICmParameter[]} cmParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.retrieveActiveParameters = function (cmParameters) {
            var _this = this;
            var parameters = new Map();
            // parse the data model and retrieve all active items.
            this.parseDataModel(cmParameters, function (cmParameter) {
                var _a;
                var filterParameter = (_a = _this.componentParameters) === null || _a === void 0 ? void 0 : _a.find(function (componentParameter) { var _a; return componentParameter.browseName == ((_a = cmParameter.filter) === null || _a === void 0 ? void 0 : _a.parameterRef); });
                if (filterParameter != undefined) {
                    // Add also parameters needed for filters
                    parameters.set(filterParameter.browseName, filterParameter);
                }
                if (cmParameter.componentParameter) {
                    // if we find a cmParameter we just collect the component parameter
                    if (cmParameter.filter === undefined || (cmParameter.filter && !cmParameter.filter.active)) {
                        parameters.set(cmParameter.componentParameter.browseName, cmParameter.componentParameter);
                    }
                }
            });
            return Array.from(parameters.values());
        };
        /**
         * Parses the data model and calls the processing function for every model item
         *
         * @private
         * @param {ICmParameter[]} cmParameters
         * @param {(cmParameter:ICmParameter)=> void} processingDelegate
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.parseDataModel = function (cmParameters, processingDelegate) {
            var _this = this;
            cmParameters.forEach(function (cmParameter) {
                // call the processing function with the current model item
                processingDelegate(cmParameter);
                // in case of a group we need to iterate its childs and call the parsing method recursive ...
                if (cmParameter instanceof cmGroup_1.CmGroup && cmParameter.childs && cmParameter.childs.length > 0) {
                    _this.parseDataModel(cmParameter.childs, processingDelegate);
                }
            });
        };
        /**
         * Updates the info, if the filter is active for the given parameter with the given value
         *
         * @private
         * @param {ICmFilter} filter
         * @param {boolean} editModeActive
         * @returns
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.updateFilter = function (filter, editModeActive) {
            filter.active = false;
            if (filter.parameterRef == "" && filter.parameterValue == undefined && filter.parameterValues == undefined) {
                return; // No filter defined
            }
            var paramValue = this.getParameterValueFromSource(filter.parameterRef, editModeActive);
            if (paramValue == undefined) {
                filter.active = true;
                return;
            }
            if (filter.parameterValue != undefined) {
                // Check single parameterValue filter
                if (paramValue != filter.parameterValue) {
                    filter.active = true;
                }
            }
            else if (filter.parameterValues != undefined) {
                // Check multiple parameterValue filter
                filter.active = true;
                filter.parameterValues.forEach(function (filterParamValue) {
                    if (filterParamValue == paramValue) {
                        filter.active = false;
                    }
                });
            }
        };
        /**
         * Returns the value/modified value for the given parameter reference name
         *
         * @private
         * @param {string} parameterRef
         * @param {boolean} editModeActive
         * @returns {(string | undefined)}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.getParameterValueFromSource = function (parameterRef, editModeActive) {
            if (this.componentParameters == undefined) {
                return undefined;
            }
            for (var _i = 0, _a = this.componentParameters; _i < _a.length; _i++) {
                var parameter = _a[_i];
                if (parameter.browseName == parameterRef) {
                    var value = parameter.modifiedValue;
                    if (editModeActive == false) {
                        value = parameter.value; // Use value instead of modifiedValue if editMode is not active
                    }
                    if (value == undefined) {
                        value = parameter.value; // Use value if no modified value is defined
                    }
                    return value;
                }
            }
            return undefined;
        };
        /**
         * Observes the config parameters for changes
         *
         * @param {MappCockpitComponentParameter[]} observableParmeters
         * @returns {*}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.observeConfigParameters = function (observableParmeters) {
            // observe component write access
            this.observeComponentWriteAccess(observableParmeters);
            // add the service channel parameter to the observables
            var serviceChannelInfoParameter = this._serviceChannel && this._serviceChannel && this._serviceChannel.infoChannel ? this._serviceChannel.infoChannel : null;
            if (serviceChannelInfoParameter) {
                // observableParmeters.push(serviceChannelInfoParameter);
                mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, [serviceChannelInfoParameter]);
            }
        };
        /**
         * Adds the specified parameters as observables
         *
         * @private
         * @param {MappCockpitComponentParameter[]} observableParmeters
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.observeConfigParameterValues = function (observableParmeters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, observableParmeters)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Removes the specified parameters as observables.
         *
         * @private
         * @param {MappCockpitComponentParameter[]} observableParmeters
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.unobserveConfigParameterValues = function (observableParmeters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this, observableParmeters)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Observes the component reply channel for the purpose of receiving the response for parameter set write requests.
         *
         * @private
         * @param {MappCockpitComponent} component
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.observeParameterSetWriteResponse = function (component) {
            var _this = this;
            // get the components reply channel parameter ...
            var serviceChannelInfoParameter = this._serviceChannel && this._serviceChannel && this._serviceChannel.infoChannel ? this._serviceChannel.infoChannel : null;
            // ...and observe the info channel parameter
            if (serviceChannelInfoParameter) {
                // listen to the response notifications
                serviceChannelInfoParameter.valueSource.changed(function (infoChannelData) {
                    _this.handleParameterSetWriteResponse(infoChannelData);
                });
            }
        };
        /**
       * Handles the notification in response to parameter set write requests.
       *
       * @private
       * @param {*} responseData
       * @memberof ConfigManagerDataModel
       */
        ConfigManagerDataModel.prototype.handleParameterSetWriteResponse = function (serviceInfoData) {
            if (serviceInfoData) {
                try {
                    var serviceResponseData = JSON.parse(serviceInfoData);
                    // process the service response 
                    switch (serviceResponseData.eventType) {
                        case mappCockpitComponentService_1.ComponentServiceRequestType.changeParameterSet:
                            this.handleServiceResponseChangeParameterSet(serviceResponseData);
                            break;
                        default:
                            break;
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        };
        /**
         * Handles the service response for parameter set changed.
         *
         * @private
         * @param {ServiceResponseChangeParameters} serviceResponseData
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.handleServiceResponseChangeParameterSet = function (serviceResponseData) {
            var _a;
            // the response id needs to match the request id to make sure that the result corresponds to the request!
            if ((_a = this._serviceChannel) === null || _a === void 0 ? void 0 : _a.requestIsPending(serviceResponseData.requestID)) {
                // rejected parameters need to be indicated as erroneous. 
                var rejectedParameters = serviceResponseData.eventData.rejected ? serviceResponseData.eventData.rejected : [];
                this.setTransferFailedParameters(rejectedParameters);
                // applied parameters are considered as no longer modified. Thus the corresponding modified parameters ( or state ) need to be removed
                var appliedParameters = serviceResponseData.eventData.applied ? serviceResponseData.eventData.applied : [];
                this.clearModifiedParameters(appliedParameters);
                // now we can clear the matching pending request.
                this._serviceChannel.clearPendingRequest(serviceResponseData.requestID);
            }
        };
        /**
         * handles observable changes
         *
         * @param {Observable[]} changedObservables
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.onObservablesChanged = function (changedObservables) {
            console.log("onObservablesChanged: %o %o", this, changedObservables);
            this.updateFiltersInDataModel();
        };
        /**
         * Observes if the component changes the write access
         *
         * @param {MappCockpitComponentParameter[]} configParameters
         * @returns {*}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.observeComponentWriteAccess = function (configParameters) {
            var _this = this;
            // we use a single parameter to get the parent component and observe changes of the write acces value.
            configParameters[0].component.writeAccess.changed(function (writeAccess) {
                // invoke common model changed processing triggered by write access change.
                _this.onModelChanged(_this, new dataModelInterface_1.EventModelChangedArgs(_this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", _this));
                // invoke specific write access changed changed processing.
                _this.onModelChanged(_this, new dataModelInterface_1.EventModelChangedArgs(_this, dataModelInterface_1.ModelChangeType.updateTarget, "writeAccessChanged", writeAccess));
            });
        };
        return ConfigManagerDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.ConfigManagerDataModel = ConfigManagerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlckRhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvY29uZmlnTWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7UUFBNEMsMENBQWE7UUFBekQ7WUFBQSxxRUFnMEJDO1lBOXpCQzs7Ozs7O2VBTUc7WUFDSyxxQkFBZSxHQUF1QyxJQUFJLENBQUM7WUFZbkU7Ozs7OztlQU1HO1lBQ0ssdUNBQWlDLEdBQXlDLEVBQUUsQ0FBQztZQUVyRix1Q0FBdUM7WUFDL0Isc0JBQWdCLEdBQW1DLFNBQVMsQ0FBQztZQUVyRTs7Ozs7ZUFLRztZQUNLLDhCQUF3QixHQUFHLFVBQUMsTUFBTSxFQUFFLFNBQVMsSUFBTyxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBRXpHOzs7Ozs7ZUFNRztZQUNLLHFCQUFlLEdBQVksS0FBSyxDQUFDOztRQWd4QjNDLENBQUM7UUE5d0JDOzs7O1dBSUc7UUFDSCwyQ0FBVSxHQUFWO1lBQ0UseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFFN0QsaUJBQU0sVUFBVSxXQUFFLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxvREFBbUIsR0FBbkI7WUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCx3Q0FBTyxHQUFQOztZQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFF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LENBQUMsNkJBQTZCLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILDREQUEyQixHQUEzQixVQUE0QixnQkFBaUQ7WUFBN0UsaUJBVUM7WUFUQyxzR0FBc0c7WUFDL0UsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxXQUFXO2dCQUVwRiwyRUFBMkU7Z0JBQzNFLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLElBQUksMENBQXFCLENBQUMsS0FBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLDRCQUE0QixFQUFFLEtBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRTdILDJEQUEyRDtnQkFDM0QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsSUFBSSwwQ0FBcUIsQ0FBQyxLQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM5SCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDSCw2QkFBQztJQUFELENBQUMsQUFoMEJELENBQTRDLDZCQUFhLEdBZzBCeEQ7SUFoMEJZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbUdyb3VwIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jbUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENtR3JvdXAgfSBmcm9tIFwiLi9jbUdyb3VwXCI7XHJcbmltcG9ydCB7IElDbUZpbHRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY21GaWx0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNtUGFyYW1ldGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jbVBhcmFtZXRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEYXRhTW9kZWxCYXNlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfSBmcm9tIFwiLi4vb25saW5lL2NvbXBvbmVudHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBNb2RlbENoYW5nZVR5cGUsIElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvIH0gZnJvbSBcIi4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuaW1wb3J0IHsgSU9ic2VydmVyLCBPYnNlcnZhYmxlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZSwgQ29tcG9uZW50U2VydmljZVJlcXVlc3RUeXBlLCBTZXJ2aWNlUmVzcG9uc2VDaGFuZ2VQYXJhbWV0ZXJzLCBDb21wb25lbnRTZXJ2aWNlUmVzcG9uc2VEYXRhQ2hhbmdlZFBhcmFtZXRlciB9IGZyb20gXCIuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRTZXJ2aWNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbmZpZ01hbmFnZXJEYXRhTW9kZWwgZXh0ZW5kcyBEYXRhTW9kZWxCYXNlIGltcGxlbWVudHMgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWwsIElPYnNlcnZlciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhvbGRzIHRoZSBzZXJ2aWNlIGNoYW5uZWxcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHR5cGUgeyhNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2UgfCBudWxsKX1cclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3NlcnZpY2VDaGFubmVsOiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2UgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogSG9sZHMgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIHVzZWQgY29tcG9uZW50IGluIHRoaXMgZGF0YW1vZGVsXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEB0eXBlIHsoQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fHVuZGVmaW5lZCl9XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9jb21wb25lbnRQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj58dW5kZWZpbmVkO1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogSG9sZHMgdGhlIGxhc3QgYWN0aXZlIHBhcmFtZXRlcnNcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2N1cnJlbnRBY3RpdmVDb21wb25lbnRQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTtcclxuXHJcbiAgLy8gaG9sZHMgdGhlIGFjdHVhbCBjb25uZWN0ZWQgY29tcG9uZW50XHJcbiAgcHJpdmF0ZSBfYWN0dWFsQ29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudHx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogRGF0YU1vZGVsIGNoYW5nZWQgaGFuZGxlclxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RhdGFNb2RlbENoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB7IHRoaXMuaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzKSB9O1xyXG5cclxuICAvKipcclxuICAgKiBIb2xkcyB0aGUgaW5mbyBpZiB0aGUgZGF0YW1vZGVsIGlzIGN1cnJlbnRseSBpbiBlZGl0IG1vZGVcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9lZGl0TW9kZUFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBjb25maWdtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgLy8gd2F0Y2ggdGhlIGRhdGEgbW9kZWwgZm9yIGNoYW5nZSBldmVudHNcclxuICAgIHRoaXMuZXZlbnRNb2RlbENoYW5nZWQuYXR0YWNoKHRoaXMuX2RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuXHJcbiAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBjb21wb25lbnRcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpIHtcclxuICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNwb3NlIHRoZSBjb25maWdtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBkaXNwb3NlKCkge1xyXG4gICAgdGhpcy5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG5cclxuICAgIC8vIGRlc3Ryb3kgb2JzZXJ2YWJsZXNcclxuICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLnVub2JzZXJ2ZUFsbCh0aGlzLHRoaXMuX2N1cnJlbnRBY3RpdmVDb21wb25lbnRQYXJhbWV0ZXJzWzBdPy5jb21wb25lbnQpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBjb25maWd1cmF0aW9ucGFyYW1ldGVycyBhcyB0aGUgZGF0YSBzb3VyY2UgZm9yIHRoZSBjb25maWd1cmF0aW9uIG1hbmFnZXIgZGF0YW1vZGVsXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXQgY29uZmlndXJhdGlvblBhcmFtZXRlcnMoY29uZmlndXJhdGlvblBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgbGV0IGNvbXBvbmVudFBhcmFtZXRlcnMgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycztcclxuICAgIGlmIChjb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5vbkNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcGFyYW1ldGVycyBvZiB0aGUgY29tcG9uZW50IHdoaWNoIGlzIHVzZWQgaW4gdGhpcyBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEByZWFkb25seVxyXG4gICAqIEB0eXBlIHsoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXXx1bmRlZmluZWQpfVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBjb21wb25lbnRQYXJhbWV0ZXJzKCk6ICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfHVuZGVmaW5lZHtcclxuICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIGNvbXBvbmVudCBwYXJhbWV0ZXJzIHVwZGF0ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBvbkNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgIC8vIGZpbHRlciB0aGUgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzIGFuZCB1cGRhdGUgdGhlIHBhcmFtZXRlciB2YWx1ZXNcclxuICAgIGlmIChjb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aCAhPSAwICYmIGNvbXBvbmVudFBhcmFtZXRlcnNbMF0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFBhcmFtZXRlcnMgPSBjb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gICAgICB0aGlzLl9hY3R1YWxDb21wb25lbnQgPSB0aGlzLmdldENvbXBvbmVudEZyb21QYXJhbWV0ZXJzKCk7XHJcbiAgICAgIGlmKHRoaXMuX2FjdHVhbENvbXBvbmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLmNyZWF0ZURhdGFNb2RlbERhdGEodGhpcy5fYWN0dWFsQ29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgLy8gb2JzZXJ2ZSB0aGUgc2VydmljZSBjaGFubmVsXHJcbiAgICAgICAgdGhpcy5jb25uZWN0U2VydmljZUNoYW5uZWwodGhpcy5fYWN0dWFsQ29tcG9uZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5vYnNlcnZlQ29uZmlnUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgIC8vIEluaXRpYWxpemUgdGhlIGRhdGFtb2RlbCBhZnRlciBvYnNlcnZpbmcgdGhlIGZpcnN0IGRhdGFcclxuICAgICAgdGhpcy51cGRhdGVGaWx0ZXJzSW5EYXRhTW9kZWwoKTtcclxuXHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMpKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogQ29ubmVjdHMgdG8gdGhlIHNlcnZpY2UgY2hhbm5lbCBmb3IgY2FsbGluZyBzZXJ2aWNlIG1ldGhvZHMgKC4uLmJ1bGsgd3JpdGUpIGFuZCBvYnNlcnZpbmcgc2VydmljZSBub3RpZmljYXRpb25zXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGNvbXBvbmVudFxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb25uZWN0U2VydmljZUNoYW5uZWwoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCkge1xyXG4gICAgaWYgKGNvbXBvbmVudC5zZXJ2aWNlQ2hhbm5lbCkge1xyXG5cclxuICAgICAgLy8gY29ubmVjdCBhbmQgcHJlc2VydmUgdGhlIHNlcnZpY2UgY2hhbm5lbFxyXG4gICAgICB0aGlzLl9zZXJ2aWNlQ2hhbm5lbCA9IGNvbXBvbmVudC5zZXJ2aWNlQ2hhbm5lbDtcclxuXHJcbiAgICAgIC8vIG9ic2VydmUgdGhlIHNlcnZpY2Ugbm90aWZpY2F0aW9uXHJcbiAgICAgICB0aGlzLm9ic2VydmVQYXJhbWV0ZXJTZXRXcml0ZVJlc3BvbnNlKGNvbXBvbmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICAqIGhhbmRsZXMgdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXIgdXBkYXRlLiBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICBoYW5kbGVFdmVudENvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKHNlbmRlcjogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICBsZXQgY29tcG9uZW50UGFyYW1ldGVycyA9IGV2ZW50QXJncy5kYXRhIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW107XHJcbiAgICBpZiAoY29tcG9uZW50UGFyYW1ldGVycykge1xyXG4gICAgICBsZXQgY29uZmlnUGFyYW1ldGVycyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZUNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgICBpZiAoY29uZmlnUGFyYW1ldGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50UGFyYW1ldGVycyA9IGNvbmZpZ1BhcmFtZXRlcnM7XHJcblxyXG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmdldENvbXBvbmVudEZyb21QYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgaWYoY29tcG9uZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICB0aGlzLl9kYXRhID0gdGhpcy5jcmVhdGVEYXRhTW9kZWxEYXRhKGNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJjb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZFwiLCB0aGlzKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjb25maWd1cmF0aW9uIHN0cnVjdHVyZSBtZXRhSW5mbyBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBjb21wb25lbnRcclxuICAgKiBAcmV0dXJucyB7Kn0gbWV0YUluZm8gb2JqZWN0IGZyb20gdGhlIGNvbXBvbmVudFxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRNZXRhSW5mb0Zyb21Db21wb25lbnQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IGFueXtcclxuICAgIGxldCBjb21wTWV0YURhdGEgPSBjb21wb25lbnQubWV0YURhdGE7XHJcbiAgICBpZihjb21wTWV0YURhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgcmV0dXJuICg8YW55PmNvbXBNZXRhRGF0YSkuTWV0YUNvbmZpZ0NvbmZpZ1Byb3BzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGhhbmRsZXMgbW9kZWwgY2hhbmdlc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZXZlbnRBcmdzXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgLy8gZXh0ZXJuYWwgbW9kZWwgY2hhbmdlcyB3aXRoIGNoYW5nZSB0eXBlIFwidXBkYXRlU291cmNlXCIgaGF2ZSB0byBiZSBmb3J3YXJkZWQgKHdyaXR0ZW4pIHRvIHRoZSBzb3VyY2VcclxuICAgIGlmIChldmVudEFyZ3MuY2FsbGVyICE9PSB0aGlzICYmIGV2ZW50QXJncy5jaGFuZ2VUeXBlID09PSBNb2RlbENoYW5nZVR5cGUudXBkYXRlU291cmNlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlTW9kZWxDaGFuZ2VkICglbykgOiAlb1wiLCB0aGlzLCBldmVudEFyZ3MpO1xyXG5cclxuICAgICAgbGV0IG1vZGlmaWVkQ29tcG9uZW50UGFyYW1ldGVyID0gZXZlbnRBcmdzLmhpbnQuY2hhbmdlZEl0ZW1EYXRhLmNvbXBvbmVudFBhcmFtZXRlciBhcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcjtcclxuXHJcbiAgICAgIC8vIG1vZGlmeSBwYXJhbWV0ZXIgdmFsdWVcclxuICAgICAgdGhpcy5tb2RpZnlQYXJhbWV0ZXIobW9kaWZpZWRDb21wb25lbnRQYXJhbWV0ZXIsIGV2ZW50QXJncy5oaW50Lm5ld0l0ZW1EYXRhKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vZGlmaWVzIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVyIHZhbHVlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSBtb2RpZmllZFBhcmFtZXRlclxyXG4gICAqIEBwYXJhbSB7Kn0gbmV3SXRlbURhdGFcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBtb2RpZnlQYXJhbWV0ZXIobW9kaWZpZWRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAvLyBwcmVzZXJ2ZSB0aGUgbW9kaWZpZWQgdmFsdWUgLi4uXHJcbiAgICBtb2RpZmllZFBhcmFtZXRlci5tb2RpZmllZERpc3BsYXlWYWx1ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwbGllcyB0aGUgbW9kaWZpZWQgcGFyYW1ldGVyIHNldFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgYXBwbHlNb2RpZmllZFBhcmFtZXRlcnMoKSB7XHJcbiAgICAvLyBnZXQgdGhlIG1vZGlmaWVkIHBhcmFtZXRlcnNcclxuICAgIGxldCBtb2RpZmllZFBhcmFtZXRlcnMgPSB0aGlzLmdldE1vZGlmaWVkUGFyYW1ldGVycygpO1xyXG5cclxuICAgIC8vIGV4aXQgb24gbm8gcGFyYW1ldGVycyB0byBtb2RpZnkgb3IgdGhlIGNvbXBvbmVudCBub3QgZGVmaW5lZFxyXG4gICAgaWYgKG1vZGlmaWVkUGFyYW1ldGVycy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAvLyBnZXQgdGhlIGNvbXBvbmVudCBob2xkaW5nIHRoZSBwYXJhbWV0ZXJzXHJcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG1vZGlmaWVkUGFyYW1ldGVyc1swXS5jb21wb25lbnQgYXMgTWFwcENvY2twaXRDb21wb25lbnQ7XHJcblxyXG4gICAgICBpZiAoY29tcG9uZW50ICYmIGNvbXBvbmVudC5zZXJ2aWNlQ2hhbm5lbCkge1xyXG5cclxuICAgICAgICAvLyBpbnZva2Ugd3JpdGluZyB0aGUgcGFyYW1ldGVyIHNldFxyXG4gICAgICAgIChhc3luYyAoY29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBjb21wb25lbnQhLnNlcnZpY2VDaGFubmVsIS53cml0ZVBhcmFtZXRlclNldChtb2RpZmllZFBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgIC8vIHRoZSByZXF1ZXN0IGhhcyBiZWVuIGludm9rZWQgc3VjY2Vzc2Z1bGx5IC4uLi4tPiB3YWl0IGZvciAgYW5kIGhhbmRsZSByZXNwb25zZSBldmVudFxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGFyYW1ldGVyIHdyaXRlIHBlbmRpbmcgLi4uOiAlMCBcIixtb2RpZmllZFBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgLy8gdGhlIHJlcXVlc3QgY291bGQgbm90IGJlIGludm9rZWQgc3VjY2Vzc2Z1bGx5IC4uLiAtPiBoYW5kbGUgcmVxdWVzdCBmYWlsdXJlXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb3VsZCBub3Qgd3JpdGUgcGFyYW1ldGVyczogJTAgXCIsbW9kaWZpZWRQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcnNUcmFuc2ZlckZhaWxlZChtb2RpZmllZFBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShjb21wb25lbnQpO1xyXG5cclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnQgb3Igc2VydmljZSBjaGFubmVsIG9mIHRoZSBjb21wb25lbnQgbm90IGF2YWlsYWJsZSFcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgYWxsIHRoZSBnaXZlbiBwYXJhbWV0ZXJzIHRvIHRyYW5zZmVyRmFpbGVkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gbW9kaWZpZWRQYXJhbWV0ZXJzXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIHNldFBhcmFtZXRlcnNUcmFuc2ZlckZhaWxlZChtb2RpZmllZFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pe1xyXG4gICAgbW9kaWZpZWRQYXJhbWV0ZXJzLmZvckVhY2gobW9kaWZpZWRQYXJhbWV0ZXJzID0+IHtcclxuICAgICAgbW9kaWZpZWRQYXJhbWV0ZXJzLnRyYW5zZmVyRmFpbGVkID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgLy8gVXBkYXRlIHRyYW5zZmVyIGZhaWxlZCBpY29uIGluIHRoZSB2aWV3IFxyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgbW9kaWZpZWQgcGFyYW1ldGVyc1xyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRNb2RpZmllZFBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+e1xyXG4gICAgICBjb25zdCBtb2RpZmllZFBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiA9IG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKTtcclxuICAgICAgdGhpcy5jb21wb25lbnRQYXJhbWV0ZXJzIS5mb3JFYWNoKHBhcmFtZXRlciA9PiB7XHJcbiAgICAgICAgaWYocGFyYW1ldGVyLm1vZGlmaWVkVmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIGxldCBpc0ZpbHRlcmVkID0gdGhpcy5pc1BhcmFtZXRlckZpbHRlcmVkKHBhcmFtZXRlciwgdGhpcy5fZGF0YSk7XHJcbiAgICAgICAgICBpZihpc0ZpbHRlcmVkID09IGZhbHNlKXtcclxuICAgICAgICAgICAgLy8gQWRkIHBhcmFtZXRlciBvbmx5IHRvIG1vZGlmaWVkIHBhcmFtZXRlciBsaXN0IGlmIHBhcmFtZXRlciBpcyBub3QgZmlsdGVyZWQobm90IHNob3duIGluIGNvbmZpZyBtYW5hZ2VyKVxyXG4gICAgICAgICAgICBtb2RpZmllZFBhcmFtZXRlcnMucHVzaChwYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBtb2RpZmllZFBhcmFtZXRlcnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBjb21wb25lbnQgcGFyYW1ldGVyIGlzIHVzZWQgd2l0aGluIGEgZmlsdGVyZWQgY29uZmlnTWFuYWdlciBwYXJhbWV0ZXJcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICogQHBhcmFtIHtBcnJheTxJQ21QYXJhbWV0ZXI+fSBwYXJhbWV0ZXJzXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIGlzUGFyYW1ldGVyRmlsdGVyZWQoY29tcG9uZW50UGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgcGFyYW1ldGVyczogQXJyYXk8SUNtUGFyYW1ldGVyPik6IGJvb2xlYW4ge1xyXG4gICAgZm9yKGxldCBpID0wOyBpIDw9IHBhcmFtZXRlcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICBsZXQgcGFyYW1ldGVyID0gcGFyYW1ldGVyc1tpXTtcclxuICAgICAgaWYocGFyYW1ldGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYocGFyYW1ldGVyLmNvbXBvbmVudFBhcmFtZXRlciA9PSBjb21wb25lbnRQYXJhbWV0ZXIpe1xyXG4gICAgICAgICAgaWYocGFyYW1ldGVyLmZpbHRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihwYXJhbWV0ZXIuZmlsdGVyLmFjdGl2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHBhcmFtZXRlciBpbnN0YW5jZW9mIENtR3JvdXApe1xyXG4gICAgICAgICAgbGV0IGZpbHRlcmVkID0gdGhpcy5pc1BhcmFtZXRlckZpbHRlcmVkKGNvbXBvbmVudFBhcmFtZXRlciwgcGFyYW1ldGVyLmNoaWxkcyk7XHJcbiAgICAgICAgICBpZihmaWx0ZXJlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNjYXJkcyB1c2VyIGVkaXRlZCBwYXJhbWV0ZXIgbW9kaWZpY2F0aW9uc1xyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgZGlzY2FyZE1vZGlmaWNhdGlvbnMoKSB7XHJcbiAgICAvLyBjbGVhciBtb2RpZmljYXRpb25zIFxyXG4gICAgdGhpcy5jbGVhck1vZGlmaWVkUGFyYW1ldGVycygpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBlZGl0IG1vZGUgYW5kIHVwZGF0ZXMgdGhlIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBhY3RpdmVcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRFZGl0TW9kZUFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pe1xyXG4gICAgdGhpcy5fZWRpdE1vZGVBY3RpdmUgPSBhY3RpdmU7XHJcbiAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5nZXRDb21wb25lbnRGcm9tUGFyYW1ldGVycygpO1xyXG4gICAgaWYoY29tcG9uZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuc2V0RGF0YU1vZGVsQWN0aXZlKGFjdGl2ZSk7XHJcbiAgICAgIHRoaXMudXBkYXRlRmlsdGVyc0luRGF0YU1vZGVsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBlZGl0IG1vZGUgZm9yIHRoZSBkYXRhIG1vZGVsLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFjdGl2ZVxyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXREYXRhTW9kZWxBY3RpdmUoYWN0aXZlOiBib29sZWFuKTogYW55IHtcclxuICAgICAgdGhpcy5wYXJzZURhdGFNb2RlbCh0aGlzLl9kYXRhLChjbVBhcmFtZXRlcik9PntcclxuICAgICAgICBjbVBhcmFtZXRlci5lZGl0TW9kZUFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gY29tcG9uZW50IHBhcmFtZXRlcnMoZmlyc3QgcGFyYW1ldGVyKVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcmV0dXJucyB7KE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbXx1bmRlZmluZWQpfVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRDb21wb25lbnRGcm9tUGFyYW1ldGVycygpOiBNYXBwQ29ja3BpdENvbXBvbmVudHx1bmRlZmluZWR7XHJcbiAgICBpZih0aGlzLmNvbXBvbmVudFBhcmFtZXRlcnMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgaWYodGhpcy5jb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudFBhcmFtZXRlcnNbMF0uY29tcG9uZW50IGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50O1xyXG4gICAgICAgIGlmIChjb21wb25lbnQgIT0gbnVsbCl7XHJcbiAgICAgICAgICByZXR1cm4gY29tcG9uZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcmtzIHRoZSBwYXJhbWV0ZXJzIHdpdGggYSBmbGFnIHRoYXQgdGhlIHBhcmFtZXRlciB2YWx1ZSB3YXMgbm90IHRyYW5zZmVyZWRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHsoQXJyYXk8Q29tcG9uZW50U2VydmljZVJlc3BvbnNlRGF0YUNoYW5nZWRQYXJhbWV0ZXI+fHVuZGVmaW5lZCl9IFtmYWlsZWRQYXJhbWV0ZXJzPXVuZGVmaW5lZF1cclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0VHJhbnNmZXJGYWlsZWRQYXJhbWV0ZXJzKGZhaWxlZFBhcmFtZXRlcnM6IEFycmF5PENvbXBvbmVudFNlcnZpY2VSZXNwb25zZURhdGFDaGFuZ2VkUGFyYW1ldGVyPil7XHJcbiAgICB0aGlzLmNvbXBvbmVudFBhcmFtZXRlcnMhLmZvckVhY2gocGFyYW1ldGVyID0+IHtcclxuICAgICAgICBsZXQgZm91bmRQYXJhbSA9IGZhaWxlZFBhcmFtZXRlcnMuZmluZChwYXJhbSA9PiBwYXJhbS5rZXkgPT0gcGFyYW1ldGVyLmJyb3dzZU5hbWUpO1xyXG4gICAgICAgIGlmKGZvdW5kUGFyYW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIHBhcmFtZXRlci50cmFuc2ZlckZhaWxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhcnMgdGhlIG1vZGlmaWVkIHBhcmFtZXRlcnNcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHsoQXJyYXk8Q29tcG9uZW50U2VydmljZVJlc3BvbnNlRGF0YUNoYW5nZWRQYXJhbWV0ZXI+fHVuZGVmaW5lZCl9IFtwYXJhbWV0ZXJzVG9DbGVhcj11bmRlZmluZWRdXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyTW9kaWZpZWRQYXJhbWV0ZXJzKHBhcmFtZXRlcnNUb0NsZWFyOiBBcnJheTxDb21wb25lbnRTZXJ2aWNlUmVzcG9uc2VEYXRhQ2hhbmdlZFBhcmFtZXRlcj58dW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudFBhcmFtZXRlcnMhLmZvckVhY2gocGFyYW1ldGVyID0+IHtcclxuICAgICAgaWYocGFyYW1ldGVyc1RvQ2xlYXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBwYXJhbWV0ZXIubW9kaWZpZWRWYWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBwYXJhbWV0ZXIudHJhbnNmZXJGYWlsZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGxldCBwYXJhbUZvdW5kID0gcGFyYW1ldGVyc1RvQ2xlYXIuZmluZChwYXJhbSA9PiBwYXJhbS5rZXkgPT0gcGFyYW1ldGVyLmJyb3dzZU5hbWUpO1xyXG4gICAgICAgIGlmKHBhcmFtRm91bmQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIHBhcmFtZXRlci5tb2RpZmllZFZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgcGFyYW1ldGVyLnRyYW5zZmVyRmFpbGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUZpbHRlcnNJbkRhdGFNb2RlbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyBhbGwgZmlsdGVycyBhbmQgcmFpc2VzIHRoZSBtb2RlbCBjaGFuZ2VkIGV2ZW50XHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHB1YmxpYyB1cGRhdGVGaWx0ZXJzSW5EYXRhTW9kZWwoKSB7XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSBhY3RpdmUgcGFyYW1ldGVyIHNldCBhY2NvcmRpbmcgdG8gdGhlIGZpbHRlciBjcml0ZXJpYVxyXG4gICAgdGhpcy51cGRhdGVGaWx0ZXJTdGF0ZSgpO1xyXG5cclxuICAgIC8vIHVwZGF0ZSBwYXJhbWV0ZXIgY2hhbmdlIG9ic2VydmF0aW9uXHJcbiAgICB0aGlzLnVwZGF0ZUFjdGl2ZVBhcmFtZXRlck9ic2VydmFibGVzKCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIG1vZGlmaWVkIHZhbHVlIChtb2RpZmllZCBpY29uKSBpbiB0aGUgdmlldyBcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMpKTtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmVzIHRoZSBhY3RpdmUgcGFyYW1ldGVycyBhbmQgdXBkYXRlcyB0aGUgcmVxdWlyZWQgb2JzZXJ2YWJsZXMgKG1vbml0b3JlZCBpdGVtcylcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZUFjdGl2ZVBhcmFtZXRlck9ic2VydmFibGVzKCkge1xyXG5cclxuICAgIC8vIGdldCB0aGUgY3VycmVudGx5IGFjdGl2ZSBhbmQgb2Jzb2xldGUgcGFyYW1ldGVyc1xyXG4gICAgY29uc3QgeyBhY3RpdmF0ZWRQYXJhbWV0ZXJzLCBkZWFjdGl2YXRlZFBhcmFtZXRlcnMsIG5ld0FjdGl2ZUNvbmZpZ1BhcmFtZXRlcnMgfSA9IHRoaXMucmV0cmlldmVQYXJhbWV0ZXJTZXRDaGFuZ2VzKCk7XHJcblxyXG4gICAgLy8gYWRkIG5ldyBvYnNlcnZlcnMgYW5kIHJlbW92ZSBvYnNvbGV0ZSBvbmVzLlxyXG4gICAgdGhpcy51cGRhdGVQYXJhbWV0ZXJPYnNlcnZhYmxlcyhhY3RpdmF0ZWRQYXJhbWV0ZXJzLCBkZWFjdGl2YXRlZFBhcmFtZXRlcnMpO1xyXG5cclxuICAgIC8vIGtlZXAgdGhlIGN1cnJlbnRseSBhY3RpdmF0ZWQgcGFyYW1ldGVycy5cclxuICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVDb21wb25lbnRQYXJhbWV0ZXJzID0gbmV3QWN0aXZlQ29uZmlnUGFyYW1ldGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVjdHMgY2hhbmdlcyBvZiB0aGUgYWN0aXZlIHBhcmFtZXRlciBzZXQgYW5kIHJldHVybnMgdGhlIGFjdGl2YXRlZCBhbmQgb2Jzb2xldGUgcGFyYW1ldGVyc1xyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXRyaWV2ZVBhcmFtZXRlclNldENoYW5nZXMoKSB7XHJcblxyXG4gICAgLy8gcmV0cmlldmUgdGhlIGN1cnJlbnRseSBhY3RpdmUgcGFyYW1ldGVyc1xyXG4gICAgbGV0IG5ld0FjdGl2ZUNvbmZpZ1BhcmFtZXRlcnMgPSB0aGlzLnJldHJpZXZlQWN0aXZlUGFyYW1ldGVycyh0aGlzLl9kYXRhIGFzIElDbUdyb3VwW10pO1xyXG4gICAgXHJcbiAgICAvLyBmaW5kIG5ld2x5IGFjdGl2YXRlZCBwYXJhbWV0ZXJzIHRvIGJlIG9ic2VydmVkXHJcbiAgICBjb25zdCBhY3RpdmF0ZWRQYXJhbWV0ZXJzID0gbmV3QWN0aXZlQ29uZmlnUGFyYW1ldGVycy5maWx0ZXIocGFyYW1ldGVyID0+ICF0aGlzLl9jdXJyZW50QWN0aXZlQ29tcG9uZW50UGFyYW1ldGVycy5pbmNsdWRlcyhwYXJhbWV0ZXIhKSk7XHJcblxyXG4gICAgLy8gZmluZCBvYnNvbGV0ZSBwYXJhbWV0ZXJzIHRvIGJlIHVub2JzZXJ2ZWRcclxuICAgIGNvbnN0IGRlYWN0aXZhdGVkUGFyYW1ldGVycyA9IHRoaXMuX2N1cnJlbnRBY3RpdmVDb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4gIW5ld0FjdGl2ZUNvbmZpZ1BhcmFtZXRlcnMuaW5jbHVkZXMocGFyYW1ldGVyKSk7XHJcbiAgICByZXR1cm4geyBhY3RpdmF0ZWRQYXJhbWV0ZXJzLCBkZWFjdGl2YXRlZFBhcmFtZXRlcnMsIG5ld0FjdGl2ZUNvbmZpZ1BhcmFtZXRlcnMgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIGFjdGl2ZSBtb25pdG9yZWQgaXRlbXMgZm9yIG9ic2VydmluZyBwYXJhbWV0ZXIgY2hhbmdlc1xyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGFjdGl2YXRlZFBhcmFtZXRlcnNcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGRlYWN0aXZhdGVkUGFyYW1ldGVyc1xyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVQYXJhbWV0ZXJPYnNlcnZhYmxlcyhhY3RpdmF0ZWRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBkZWFjdGl2YXRlZFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuXHJcbiAgICAvLyBjcmVhdGUgYW5kIGNhbGwgYW4gYXN5bmMgY29udGV4dCB0byBtYWtlIHN1cmUgdGhhdCBvYnNlcnZpbmcgYW5kIHVub2JzZXJ2aW5nIGlzIGNhbGxlZCBzdHJpY3RseSBjb25zZWN1dGl2ZS5cclxuICAgIChhc3luYyAoKSA9PiB7XHJcblxyXG4gICAgICAvLyBvYnNlcnZlIHRoZSBuZXcgYWN0aXZhdGVkIHBhcmFtZXRlcnNcclxuICAgICAgaWYgKGFjdGl2YXRlZFBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMub2JzZXJ2ZUNvbmZpZ1BhcmFtZXRlclZhbHVlcyhhY3RpdmF0ZWRQYXJhbWV0ZXJzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmZpZ01hbmFnZXJEYXRhTW9kZWw6b2JzZXJ2ZWQgLSAlb1wiLCBhY3RpdmF0ZWRQYXJhbWV0ZXJzKTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8vIHVub2JzZXJ2ZSB0aGUgcGFyYW1ldGVycyBcclxuICAgICAgaWYgKGRlYWN0aXZhdGVkUGFyYW1ldGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy51bm9ic2VydmVDb25maWdQYXJhbWV0ZXJWYWx1ZXMoZGVhY3RpdmF0ZWRQYXJhbWV0ZXJzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmZpZ01hbmFnZXJEYXRhTW9kZWw6dW5vYnNlcnZlZCAtICVvXCIsIGRlYWN0aXZhdGVkUGFyYW1ldGVycyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgZGF0YW1vZGVsIGRhdGEgZm9yIHRoZSBnaXZlbiBtZXRhSW5mb3JtYXRpb25cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHsqfSBtZXRhSW5mb3JtYXRpb25cclxuICAgKiBAcmV0dXJucyB7QXJyYXk8SUNtR3JvdXA+fVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVEYXRhTW9kZWxEYXRhKGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBBcnJheTxJQ21Hcm91cD4ge1xyXG4gICAgbGV0IG1ldGFJbmZvcm1hdGlvbiA9IHRoaXMuZ2V0TWV0YUluZm9Gcm9tQ29tcG9uZW50KGNvbXBvbmVudCk7XHJcbiAgICBsZXQgbWV0YUluZm9ybWF0aW9uRGF0YU1vZGVsID0gbmV3IEFycmF5PElDbUdyb3VwPigpO1xyXG4gICAgaWYgKG1ldGFJbmZvcm1hdGlvbi5Db25maWd1cmF0aW9uU3RydWN0dXJlICE9IG51bGwpIHtcclxuICAgICAgaWYgKG1ldGFJbmZvcm1hdGlvbi5Db25maWd1cmF0aW9uU3RydWN0dXJlLkNoaWxkcyAhPSBudWxsKSB7XHJcbiAgICAgICAgbWV0YUluZm9ybWF0aW9uLkNvbmZpZ3VyYXRpb25TdHJ1Y3R1cmUuQ2hpbGRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICBtZXRhSW5mb3JtYXRpb25EYXRhTW9kZWwucHVzaChuZXcgQ21Hcm91cChlbGVtZW50Lkdyb3VwLCB0aGlzLmNvbXBvbmVudFBhcmFtZXRlcnMsIHRoaXMuX2VkaXRNb2RlQWN0aXZlKSlcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1ldGFJbmZvcm1hdGlvbkRhdGFNb2RlbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgYWxsIGZpbHRlcnMgb2YgdGhlIGdpdmVuIGNtUGFyYW1ldGVycyhvciB0aGUgd2hvbGUgZGF0YW1vZGVsIGlmIHVuZGVmaW5lZClpZiB0aGV5IGFyZSBhY3RpdmUgb3Igbm90IGZvciB0aGVyZSBjb3JyZXNwb25kaW5nIHZhbHVlc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHsoSUNtUGFyYW1ldGVyW118dW5kZWZpbmVkKX0gW2NtUGFyYW1ldGVycz11bmRlZmluZWRdXHJcbiAgICogQHJldHVybnNcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHB1YmxpYyB1cGRhdGVGaWx0ZXJTdGF0ZShjbVBhcmFtZXRlcnM6IElDbVBhcmFtZXRlcltdfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgaWYoY21QYXJhbWV0ZXJzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgIGNtUGFyYW1ldGVycyA9IHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcbiAgICBpZihjbVBhcmFtZXRlcnMgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY21QYXJhbWV0ZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQ21Hcm91cCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50LmZpbHRlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcihlbGVtZW50LmZpbHRlciwgZWxlbWVudC5lZGl0TW9kZUFjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbGVtZW50LmNoaWxkcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlclN0YXRlKGVsZW1lbnQuY2hpbGRzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuZmlsdGVyICE9IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyKGVsZW1lbnQuZmlsdGVyLCBlbGVtZW50LmVkaXRNb2RlQWN0aXZlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmVzIHRoZSBmbGF0IHBhcmFtZXRlcnMgY3VycmVudGx5IGFjdGl2ZSAob3IgbmVlZGVkIGZvciBmaWx0ZXJpbmcpXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7SUNtUGFyYW1ldGVyW119IGNtUGFyYW1ldGVyc1xyXG4gICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXRyaWV2ZUFjdGl2ZVBhcmFtZXRlcnMoY21QYXJhbWV0ZXJzOiBJQ21QYXJhbWV0ZXJbXSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10ge1xyXG4gICAgbGV0IHBhcmFtZXRlcnMgPSBuZXcgTWFwPHN0cmluZywgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAvLyBwYXJzZSB0aGUgZGF0YSBtb2RlbCBhbmQgcmV0cmlldmUgYWxsIGFjdGl2ZSBpdGVtcy5cclxuICAgIHRoaXMucGFyc2VEYXRhTW9kZWwoY21QYXJhbWV0ZXJzLCAoY21QYXJhbWV0ZXIpID0+IHtcclxuICAgICAgbGV0IGZpbHRlclBhcmFtZXRlciA9IHRoaXMuY29tcG9uZW50UGFyYW1ldGVycz8uZmluZChjb21wb25lbnRQYXJhbWV0ZXIgPT4gY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWUgPT0gY21QYXJhbWV0ZXIuZmlsdGVyPy5wYXJhbWV0ZXJSZWYpO1xyXG4gICAgICBpZihmaWx0ZXJQYXJhbWV0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAvLyBBZGQgYWxzbyBwYXJhbWV0ZXJzIG5lZWRlZCBmb3IgZmlsdGVyc1xyXG4gICAgICAgIHBhcmFtZXRlcnMuc2V0KGZpbHRlclBhcmFtZXRlci5icm93c2VOYW1lLCBmaWx0ZXJQYXJhbWV0ZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY21QYXJhbWV0ZXIuY29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgLy8gaWYgd2UgZmluZCBhIGNtUGFyYW1ldGVyIHdlIGp1c3QgY29sbGVjdCB0aGUgY29tcG9uZW50IHBhcmFtZXRlclxyXG4gICAgICAgIGlmIChjbVBhcmFtZXRlci5maWx0ZXIgPT09IHVuZGVmaW5lZCB8fCAoY21QYXJhbWV0ZXIuZmlsdGVyICYmICFjbVBhcmFtZXRlci5maWx0ZXIuYWN0aXZlICkpIHtcclxuICAgICAgICAgIHBhcmFtZXRlcnMuc2V0KGNtUGFyYW1ldGVyLmNvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lLCBjbVBhcmFtZXRlci5jb21wb25lbnRQYXJhbWV0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJhbWV0ZXJzLnZhbHVlcygpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcnNlcyB0aGUgZGF0YSBtb2RlbCBhbmQgY2FsbHMgdGhlIHByb2Nlc3NpbmcgZnVuY3Rpb24gZm9yIGV2ZXJ5IG1vZGVsIGl0ZW1cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHtJQ21QYXJhbWV0ZXJbXX0gY21QYXJhbWV0ZXJzXHJcbiAgICogQHBhcmFtIHsoY21QYXJhbWV0ZXI6SUNtUGFyYW1ldGVyKT0+IHZvaWR9IHByb2Nlc3NpbmdEZWxlZ2F0ZVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwYXJzZURhdGFNb2RlbChjbVBhcmFtZXRlcnM6IElDbVBhcmFtZXRlcltdLCBwcm9jZXNzaW5nRGVsZWdhdGU6IChjbVBhcmFtZXRlcjpJQ21QYXJhbWV0ZXIpPT4gdm9pZCkge1xyXG4gICAgY21QYXJhbWV0ZXJzLmZvckVhY2goKGNtUGFyYW1ldGVyKT0+e1xyXG4gICAgICBcclxuICAgICAgLy8gY2FsbCB0aGUgcHJvY2Vzc2luZyBmdW5jdGlvbiB3aXRoIHRoZSBjdXJyZW50IG1vZGVsIGl0ZW1cclxuICAgICAgcHJvY2Vzc2luZ0RlbGVnYXRlKGNtUGFyYW1ldGVyKTtcclxuXHJcbiAgICAgIC8vIGluIGNhc2Ugb2YgYSBncm91cCB3ZSBuZWVkIHRvIGl0ZXJhdGUgaXRzIGNoaWxkcyBhbmQgY2FsbCB0aGUgcGFyc2luZyBtZXRob2QgcmVjdXJzaXZlIC4uLlxyXG4gICAgICBpZiAoY21QYXJhbWV0ZXIgaW5zdGFuY2VvZiBDbUdyb3VwICYmIGNtUGFyYW1ldGVyLmNoaWxkcyAmJiBjbVBhcmFtZXRlci5jaGlsZHMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgdGhpcy5wYXJzZURhdGFNb2RlbChjbVBhcmFtZXRlci5jaGlsZHMscHJvY2Vzc2luZ0RlbGVnYXRlKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgaW5mbywgaWYgdGhlIGZpbHRlciBpcyBhY3RpdmUgZm9yIHRoZSBnaXZlbiBwYXJhbWV0ZXIgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHtJQ21GaWx0ZXJ9IGZpbHRlclxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZWRpdE1vZGVBY3RpdmVcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVGaWx0ZXIoZmlsdGVyOiBJQ21GaWx0ZXIsIGVkaXRNb2RlQWN0aXZlOiBib29sZWFuKSB7XHJcbiAgICBmaWx0ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBpZiAoZmlsdGVyLnBhcmFtZXRlclJlZiA9PSBcIlwiICYmIGZpbHRlci5wYXJhbWV0ZXJWYWx1ZSA9PSB1bmRlZmluZWQgJiYgZmlsdGVyLnBhcmFtZXRlclZhbHVlcyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuOyAvLyBObyBmaWx0ZXIgZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIHZhciBwYXJhbVZhbHVlID0gdGhpcy5nZXRQYXJhbWV0ZXJWYWx1ZUZyb21Tb3VyY2UoZmlsdGVyLnBhcmFtZXRlclJlZiwgZWRpdE1vZGVBY3RpdmUpO1xyXG4gICAgaWYgKHBhcmFtVmFsdWUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZpbHRlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVyLnBhcmFtZXRlclZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBDaGVjayBzaW5nbGUgcGFyYW1ldGVyVmFsdWUgZmlsdGVyXHJcbiAgICAgIGlmIChwYXJhbVZhbHVlICE9IGZpbHRlci5wYXJhbWV0ZXJWYWx1ZSkge1xyXG4gICAgICAgIGZpbHRlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChmaWx0ZXIucGFyYW1ldGVyVmFsdWVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBDaGVjayBtdWx0aXBsZSBwYXJhbWV0ZXJWYWx1ZSBmaWx0ZXJcclxuICAgICAgZmlsdGVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGZpbHRlci5wYXJhbWV0ZXJWYWx1ZXMuZm9yRWFjaChmaWx0ZXJQYXJhbVZhbHVlID0+IHtcclxuICAgICAgICBpZiAoZmlsdGVyUGFyYW1WYWx1ZSA9PSBwYXJhbVZhbHVlKSB7XHJcbiAgICAgICAgICBmaWx0ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHZhbHVlL21vZGlmaWVkIHZhbHVlIGZvciB0aGUgZ2l2ZW4gcGFyYW1ldGVyIHJlZmVyZW5jZSBuYW1lXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbWV0ZXJSZWZcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVkaXRNb2RlQWN0aXZlXHJcbiAgICogQHJldHVybnMgeyhzdHJpbmcgfCB1bmRlZmluZWQpfVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRQYXJhbWV0ZXJWYWx1ZUZyb21Tb3VyY2UocGFyYW1ldGVyUmVmOiBzdHJpbmcsIGVkaXRNb2RlQWN0aXZlOiBib29sZWFuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIGlmICh0aGlzLmNvbXBvbmVudFBhcmFtZXRlcnMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgcGFyYW1ldGVyIG9mIHRoaXMuY29tcG9uZW50UGFyYW1ldGVycykge1xyXG4gICAgICBpZiAocGFyYW1ldGVyLmJyb3dzZU5hbWUgPT0gcGFyYW1ldGVyUmVmKXtcclxuICAgICAgICBsZXQgdmFsdWUgPSBwYXJhbWV0ZXIubW9kaWZpZWRWYWx1ZTtcclxuICAgICAgICBpZihlZGl0TW9kZUFjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICB2YWx1ZSA9IHBhcmFtZXRlci52YWx1ZTsgLy8gVXNlIHZhbHVlIGluc3RlYWQgb2YgbW9kaWZpZWRWYWx1ZSBpZiBlZGl0TW9kZSBpcyBub3QgYWN0aXZlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHZhbHVlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICB2YWx1ZSA9IHBhcmFtZXRlci52YWx1ZTsgLy8gVXNlIHZhbHVlIGlmIG5vIG1vZGlmaWVkIHZhbHVlIGlzIGRlZmluZWRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2ZXMgdGhlIGNvbmZpZyBwYXJhbWV0ZXJzIGZvciBjaGFuZ2VzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmFibGVQYXJtZXRlcnNcclxuICAgKiBAcmV0dXJucyB7Kn1cclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb2JzZXJ2ZUNvbmZpZ1BhcmFtZXRlcnMob2JzZXJ2YWJsZVBhcm1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAvLyBvYnNlcnZlIGNvbXBvbmVudCB3cml0ZSBhY2Nlc3NcclxuICAgIHRoaXMub2JzZXJ2ZUNvbXBvbmVudFdyaXRlQWNjZXNzKG9ic2VydmFibGVQYXJtZXRlcnMpO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgc2VydmljZSBjaGFubmVsIHBhcmFtZXRlciB0byB0aGUgb2JzZXJ2YWJsZXNcclxuICAgIGNvbnN0IHNlcnZpY2VDaGFubmVsSW5mb1BhcmFtZXRlciA9IHRoaXMuX3NlcnZpY2VDaGFubmVsICYmIHRoaXMuX3NlcnZpY2VDaGFubmVsICYmIHRoaXMuX3NlcnZpY2VDaGFubmVsLmluZm9DaGFubmVsID8gIHRoaXMuX3NlcnZpY2VDaGFubmVsLmluZm9DaGFubmVsIDogbnVsbCA7XHJcbiAgICBpZiAoc2VydmljZUNoYW5uZWxJbmZvUGFyYW1ldGVyKSB7XHJcbiAgICAgIC8vIG9ic2VydmFibGVQYXJtZXRlcnMucHVzaChzZXJ2aWNlQ2hhbm5lbEluZm9QYXJhbWV0ZXIpO1xyXG4gICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5vYnNlcnZlUGFyYW1ldGVyVmFsdWVDaGFuZ2VzKHRoaXMsIFtzZXJ2aWNlQ2hhbm5lbEluZm9QYXJhbWV0ZXJdICk7XHJcbiAgICB9XHJcblxyXG5cclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogQWRkcyB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMgYXMgb2JzZXJ2YWJsZXNcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBvYnNlcnZhYmxlUGFybWV0ZXJzXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIGFzeW5jIG9ic2VydmVDb25maWdQYXJhbWV0ZXJWYWx1ZXMob2JzZXJ2YWJsZVBhcm1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICBhd2FpdCBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5vYnNlcnZlUGFyYW1ldGVyVmFsdWVDaGFuZ2VzKHRoaXMsIG9ic2VydmFibGVQYXJtZXRlcnMpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXJzIGFzIG9ic2VydmFibGVzLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmFibGVQYXJtZXRlcnNcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXN5bmMgdW5vYnNlcnZlQ29uZmlnUGFyYW1ldGVyVmFsdWVzKG9ic2VydmFibGVQYXJtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGF3YWl0IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLnVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcywgb2JzZXJ2YWJsZVBhcm1ldGVycyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlcyB0aGUgY29tcG9uZW50IHJlcGx5IGNoYW5uZWwgZm9yIHRoZSBwdXJwb3NlIG9mIHJlY2VpdmluZyB0aGUgcmVzcG9uc2UgZm9yIHBhcmFtZXRlciBzZXQgd3JpdGUgcmVxdWVzdHMuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGNvbXBvbmVudFxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvYnNlcnZlUGFyYW1ldGVyU2V0V3JpdGVSZXNwb25zZShjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KSB7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBjb21wb25lbnRzIHJlcGx5IGNoYW5uZWwgcGFyYW1ldGVyIC4uLlxyXG4gICAgY29uc3Qgc2VydmljZUNoYW5uZWxJbmZvUGFyYW1ldGVyID0gdGhpcy5fc2VydmljZUNoYW5uZWwgJiYgdGhpcy5fc2VydmljZUNoYW5uZWwgJiYgdGhpcy5fc2VydmljZUNoYW5uZWwuaW5mb0NoYW5uZWwgPyAgdGhpcy5fc2VydmljZUNoYW5uZWwuaW5mb0NoYW5uZWwgOiBudWxsIDtcclxuXHJcbiAgICAvLyAuLi5hbmQgb2JzZXJ2ZSB0aGUgaW5mbyBjaGFubmVsIHBhcmFtZXRlclxyXG4gICAgaWYgKHNlcnZpY2VDaGFubmVsSW5mb1BhcmFtZXRlcikge1xyXG5cclxuICAgICAgLy8gbGlzdGVuIHRvIHRoZSByZXNwb25zZSBub3RpZmljYXRpb25zXHJcbiAgICAgIHNlcnZpY2VDaGFubmVsSW5mb1BhcmFtZXRlci52YWx1ZVNvdXJjZS5jaGFuZ2VkKChpbmZvQ2hhbm5lbERhdGEpID0+IHtcclxuICAgICAgICB0aGlzLmhhbmRsZVBhcmFtZXRlclNldFdyaXRlUmVzcG9uc2UoaW5mb0NoYW5uZWxEYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAqIEhhbmRsZXMgdGhlIG5vdGlmaWNhdGlvbiBpbiByZXNwb25zZSB0byBwYXJhbWV0ZXIgc2V0IHdyaXRlIHJlcXVlc3RzLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0geyp9IHJlc3BvbnNlRGF0YVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgICAgcHJpdmF0ZSBoYW5kbGVQYXJhbWV0ZXJTZXRXcml0ZVJlc3BvbnNlKHNlcnZpY2VJbmZvRGF0YTogYW55KSB7XHJcbiAgICAgIGlmIChzZXJ2aWNlSW5mb0RhdGEpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3Qgc2VydmljZVJlc3BvbnNlRGF0YSA9IEpTT04ucGFyc2Uoc2VydmljZUluZm9EYXRhKSBhcyBTZXJ2aWNlUmVzcG9uc2VDaGFuZ2VQYXJhbWV0ZXJzO1xyXG4gICAgICAgICAgLy8gcHJvY2VzcyB0aGUgc2VydmljZSByZXNwb25zZSBcclxuICAgICAgICAgIHN3aXRjaCAoc2VydmljZVJlc3BvbnNlRGF0YS5ldmVudFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDb21wb25lbnRTZXJ2aWNlUmVxdWVzdFR5cGUuY2hhbmdlUGFyYW1ldGVyU2V0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTZXJ2aWNlUmVzcG9uc2VDaGFuZ2VQYXJhbWV0ZXJTZXQoc2VydmljZVJlc3BvbnNlRGF0YSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9ICBcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyB0aGUgc2VydmljZSByZXNwb25zZSBmb3IgcGFyYW1ldGVyIHNldCBjaGFuZ2VkLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0ge1NlcnZpY2VSZXNwb25zZUNoYW5nZVBhcmFtZXRlcnN9IHNlcnZpY2VSZXNwb25zZURhdGFcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGFuZGxlU2VydmljZVJlc3BvbnNlQ2hhbmdlUGFyYW1ldGVyU2V0KHNlcnZpY2VSZXNwb25zZURhdGE6IFNlcnZpY2VSZXNwb25zZUNoYW5nZVBhcmFtZXRlcnMpIHtcclxuXHJcbiAgICAgIC8vIHRoZSByZXNwb25zZSBpZCBuZWVkcyB0byBtYXRjaCB0aGUgcmVxdWVzdCBpZCB0byBtYWtlIHN1cmUgdGhhdCB0aGUgcmVzdWx0IGNvcnJlc3BvbmRzIHRvIHRoZSByZXF1ZXN0IVxyXG4gICAgICBpZiAodGhpcy5fc2VydmljZUNoYW5uZWw/LnJlcXVlc3RJc1BlbmRpbmcoc2VydmljZVJlc3BvbnNlRGF0YS5yZXF1ZXN0SUQpKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcmVqZWN0ZWQgcGFyYW1ldGVycyBuZWVkIHRvIGJlIGluZGljYXRlZCBhcyBlcnJvbmVvdXMuIFxyXG4gICAgICAgIGNvbnN0IHJlamVjdGVkUGFyYW1ldGVyczogQXJyYXk8Q29tcG9uZW50U2VydmljZVJlc3BvbnNlRGF0YUNoYW5nZWRQYXJhbWV0ZXI+ID0gc2VydmljZVJlc3BvbnNlRGF0YS5ldmVudERhdGEucmVqZWN0ZWQgPyBzZXJ2aWNlUmVzcG9uc2VEYXRhLmV2ZW50RGF0YS5yZWplY3RlZCA6IFtdO1xyXG4gICAgICAgIHRoaXMuc2V0VHJhbnNmZXJGYWlsZWRQYXJhbWV0ZXJzKHJlamVjdGVkUGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIC8vIGFwcGxpZWQgcGFyYW1ldGVycyBhcmUgY29uc2lkZXJlZCBhcyBubyBsb25nZXIgbW9kaWZpZWQuIFRodXMgdGhlIGNvcnJlc3BvbmRpbmcgbW9kaWZpZWQgcGFyYW1ldGVycyAoIG9yIHN0YXRlICkgbmVlZCB0byBiZSByZW1vdmVkXHJcbiAgICAgICAgY29uc3QgYXBwbGllZFBhcmFtZXRlcnM6IEFycmF5PENvbXBvbmVudFNlcnZpY2VSZXNwb25zZURhdGFDaGFuZ2VkUGFyYW1ldGVyPiA9IHNlcnZpY2VSZXNwb25zZURhdGEuZXZlbnREYXRhLmFwcGxpZWQgPyBzZXJ2aWNlUmVzcG9uc2VEYXRhLmV2ZW50RGF0YS5hcHBsaWVkIDogW107XHJcbiAgICAgICAgdGhpcy5jbGVhck1vZGlmaWVkUGFyYW1ldGVycyhhcHBsaWVkUGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIC8vIG5vdyB3ZSBjYW4gY2xlYXIgdGhlIG1hdGNoaW5nIHBlbmRpbmcgcmVxdWVzdC5cclxuICAgICAgICB0aGlzLl9zZXJ2aWNlQ2hhbm5lbC5jbGVhclBlbmRpbmdSZXF1ZXN0KHNlcnZpY2VSZXNwb25zZURhdGEucmVxdWVzdElEKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGhhbmRsZXMgb2JzZXJ2YWJsZSBjaGFuZ2VzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09ic2VydmFibGVbXX0gY2hhbmdlZE9ic2VydmFibGVzXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBvbk9ic2VydmFibGVzQ2hhbmdlZChjaGFuZ2VkT2JzZXJ2YWJsZXM6IE9ic2VydmFibGVbXSkge1xyXG4gICAgY29uc29sZS5sb2coXCJvbk9ic2VydmFibGVzQ2hhbmdlZDogJW8gJW9cIiwgdGhpcywgY2hhbmdlZE9ic2VydmFibGVzKTtcclxuICAgIHRoaXMudXBkYXRlRmlsdGVyc0luRGF0YU1vZGVsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlcyBpZiB0aGUgY29tcG9uZW50IGNoYW5nZXMgdGhlIHdyaXRlIGFjY2Vzc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb25maWdQYXJhbWV0ZXJzXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBvYnNlcnZlQ29tcG9uZW50V3JpdGVBY2Nlc3MoY29uZmlnUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAvLyB3ZSB1c2UgYSBzaW5nbGUgcGFyYW1ldGVyIHRvIGdldCB0aGUgcGFyZW50IGNvbXBvbmVudCBhbmQgb2JzZXJ2ZSBjaGFuZ2VzIG9mIHRoZSB3cml0ZSBhY2NlcyB2YWx1ZS5cclxuICAgICg8TWFwcENvY2twaXRDb21wb25lbnQ+Y29uZmlnUGFyYW1ldGVyc1swXS5jb21wb25lbnQpLndyaXRlQWNjZXNzLmNoYW5nZWQoKHdyaXRlQWNjZXNzKSA9PiB7XHJcblxyXG4gICAgICAvLyBpbnZva2UgY29tbW9uIG1vZGVsIGNoYW5nZWQgcHJvY2Vzc2luZyB0cmlnZ2VyZWQgYnkgd3JpdGUgYWNjZXNzIGNoYW5nZS5cclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcykpO1xyXG5cclxuICAgICAgLy8gaW52b2tlIHNwZWNpZmljIHdyaXRlIGFjY2VzcyBjaGFuZ2VkIGNoYW5nZWQgcHJvY2Vzc2luZy5cclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwid3JpdGVBY2Nlc3NDaGFuZ2VkXCIsIHdyaXRlQWNjZXNzKSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0iXX0=