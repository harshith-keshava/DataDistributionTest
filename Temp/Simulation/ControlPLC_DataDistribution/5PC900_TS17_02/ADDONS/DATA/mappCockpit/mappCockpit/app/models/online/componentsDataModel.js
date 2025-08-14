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
define(["require", "exports", "../diagnostics/mappCockpitDiagnosticProvider", "./mappCockpitComponent", "../../framework/events", "../dataModelInterface", "../dataModelBase", "../../framework/property", "../../framework/command", "../diagnostics/mappCockpitCommonInfoProvider", "./mappCockpitComponentReflection", "../../common/mappCockpitConfig", "../../framework/componentHub/bindings/bindings", "../../framework/componentHub/bindings/bindingDeclarations"], function (require, exports, mappCockpitDiagnosticProvider_1, mappCockpitComponent_1, events_1, dataModelInterface_1, dataModelBase_1, property_1, command_1, mappCockpitCommonInfoProvider_1, mappCockpitComponentReflection_1, mappCockpitConfig_1, bindings_1, Binding) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventTraceDataLoaded = /** @class */ (function (_super) {
        __extends(EventTraceDataLoaded, _super);
        function EventTraceDataLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTraceDataLoaded;
    }(events_1.TypedEvent));
    ;
    var EventComponentsUpdated = /** @class */ (function (_super) {
        __extends(EventComponentsUpdated, _super);
        function EventComponentsUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentsUpdated;
    }(events_1.TypedEvent));
    ;
    var EventComponentParametersUpdated = /** @class */ (function (_super) {
        __extends(EventComponentParametersUpdated, _super);
        function EventComponentParametersUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentParametersUpdated;
    }(events_1.TypedEvent));
    ;
    var EventComponentMethodsUpdated = /** @class */ (function (_super) {
        __extends(EventComponentMethodsUpdated, _super);
        function EventComponentMethodsUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentMethodsUpdated;
    }(events_1.TypedEvent));
    ;
    var EventParameterValuesUpdated = /** @class */ (function (_super) {
        __extends(EventParameterValuesUpdated, _super);
        function EventParameterValuesUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventParameterValuesUpdated;
    }(events_1.TypedEvent));
    ;
    var EventModelConnection = /** @class */ (function (_super) {
        __extends(EventModelConnection, _super);
        function EventModelConnection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelConnection;
    }(events_1.TypedEvent));
    ;
    /**
     * The class implements the main data model for mapp Cockpit.
     *
     * @class MappCockpitComponentDataModel
     */
    var MappCockpitComponentDataModel = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitComponentDataModel
         * @memberof MappCockpitComponentDataModel
         */
        function MappCockpitComponentDataModel() {
            var _this = this;
            // Create a data source for the components.
            this._componentsSource = property_1.Property.create([]);
            this._userComponentsSource = property_1.Property.create([], function (dataLink) { _this.requestReadUserComponents(dataLink); });
            // Holds user roles
            this._userRoles = property_1.Property.create([]);
            // specifies interval for connection observation
            this._connectionObservationInterval = 1000;
            // specefies the connection observation id
            this._connectionObservationTimerId = -1;
            // holds the current model connection state
            this._modelConnected = false;
            this._observablesChangedHandler = function (sender, eventArgs) { _this.handleObservableItemsChanged(eventArgs); };
            // Initialize members
            this._mappCockpitDiagnosticProvider = new mappCockpitDiagnosticProvider_1.MappCockpitDiagnosticProvider(this);
            this._components = [];
            this._userComponents = [];
            // Create event sources
            this.eventTraceDataLoaded = new EventTraceDataLoaded();
            this.eventComponentsUpdated = new EventComponentsUpdated();
            this.eventComponentParametersUpdated = new EventComponentParametersUpdated();
            this.eventParameterValuesUpdated = new EventParameterValuesUpdated();
            this.eventComponentMethodsUpdated = new EventComponentMethodsUpdated();
            this.eventModelConnectionChanged = new EventModelConnection();
            // forward the event
            this._mappCockpitDiagnosticProvider.eventObservablesChanged.attach(this._observablesChangedHandler);
            // Create and initialize commands
            this.createCommands();
        }
        /**
         * Dispose the MappCockpitComponentDataModel
         *
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.dispose = function () {
            // detach events
            this._mappCockpitDiagnosticProvider.eventObservablesChanged.detach(this._observablesChangedHandler);
            this._mappCockpitDiagnosticProvider.dispose();
        };
        /**
         * Creates exposed commands
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.createCommands = function () {
            this._commandChangeUser = command_1.Command.create(this, this.executeCommandChangeUser());
        };
        /**
         * initializes the data model
         *
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.initialize = function () {
        };
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "traceProvider", {
            /**
             * Gets the trace provider
             *
             * @readonly
             * @type {MappCockpitTraceProvider}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._mappCockpitDiagnosticProvider.traceProvider;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * connects the data model to the data source
         *
         * @returns {Promise<boolean>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.beginSession()];
                        case 1:
                            _a.sent();
                            this.createModelBindings();
                            return [4 /*yield*/, this.browseComponents()];
                        case 2:
                            _a.sent();
                            // after connecting successfully
                            this.startObserveModelConnection();
                            return [2 /*return*/, true];
                        case 3:
                            error_1 = _a.sent();
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates bindings as providers for data used from specific widgets.
         *
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.createModelBindings = function () {
            bindings_1.Bindings.createByDecl(Binding.Components.Component.Connect, this, "connectComponent", "", true);
            bindings_1.Bindings.createByDecl(Binding.Components.Component.Disconnect, this, "disconnectComponent", "", true);
            bindings_1.Bindings.createByDecl(Binding.Components.UserComponentIds, this, "", "onUserComponentIdsUpdated", false);
            bindings_1.Bindings.createByDecl(Binding.Tools.ToolsIds, this, "", "onToolsComponentIdsUpdated", false);
        };
        /**
         * Creates component bindings as providers for data used from with e.g. specific widgets.
         *
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.createComponentBindings = function () {
            // create component binding sources
            this.components.forEach(function (component) {
                component.createBindings();
            });
        };
        MappCockpitComponentDataModel.prototype.onUserComponentIdsUpdated = function (componentIds) {
            //BINDINGSOURCE: method stub supporting bindability
        };
        MappCockpitComponentDataModel.prototype.onToolsComponentIdsUpdated = function (componentIds) {
            //BINDINGSOURCE: method stub supporting bindability
        };
        MappCockpitComponentDataModel.prototype.connectComponent = function (componentId) {
            //Look for component
            var foundComponent = this.components.find(function (component) { return component.browseName == componentId; });
            // connect component
            if (foundComponent != undefined) {
                foundComponent.commandConnectComponent.execute();
            }
            else {
                console.error("Component not found! Connect not possible!");
            }
        };
        MappCockpitComponentDataModel.prototype.disconnectComponent = function (componentId) {
            //Look for component
            var foundComponent = this.components.find(function (component) { return component.browseName == componentId; });
            // connect component
            if (foundComponent != undefined) {
                foundComponent.commandDisconnectComponent.execute();
            }
            else {
                console.error("Component not found! Connect not possible!");
            }
        };
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "commandChangeUser", {
            get: function () {
                return this._commandChangeUser;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "components", {
            /**
             * Returns the available mapp components
             *
             * @readonly
             * @type {Array<MappCockpitComponent>}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._components;
            },
            /**
             * Sets the available mapp components
             *
             * @memberof MappCockpitComponentDataModel
             */
            set: function (components) {
                this._components = components;
                var toolsComponentIds = this._components.map(function (component) { return component.browseName; }).filter(function (componentId) { return componentId == "DriveLog"; });
                this.onToolsComponentIdsUpdated(toolsComponentIds);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "userComponents", {
            get: function () {
                return this._userComponents;
            },
            set: function (userComponents) {
                this._userComponents = userComponents;
                this.onUserComponentsUpdated(this._userComponents);
                var userComponentIds = this._userComponents.map(function (component) { return component.browseName; });
                this.onUserComponentIdsUpdated(userComponentIds);
            },
            enumerable: true,
            configurable: true
        });
        MappCockpitComponentDataModel.prototype.onUserComponentsUpdated = function (_userComponents) {
            //BINDINGSOURCE: method stub for suppporting bindability
        };
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "componentsSource", {
            get: function () {
                return this._componentsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "userComponentsSource", {
            get: function () {
                return this._userComponentsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "userRoles", {
            /**
             * Gets the current user roles
             *
             * @readonly
             * @type {string[]}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._userRoles;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "writeAccess", {
            /**
             *
             *
             * @returns {boolean}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                var modelHasWriteAccess = false;
                if (this.userRoles.value.length > 0) {
                    // update the write access right according the current role
                    modelHasWriteAccess = this.userRoles.value.some(function (userRole) { return userRole === mappCockpitConfig_1.MappCockpitConfiguration.writeAccessRole; });
                }
                return modelHasWriteAccess;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Clears the data model
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.clear = function () {
            this.components = [];
        };
        /**
         * Browses all available resources and updates the model
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // Update components in model
                            _a = this;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.componentProvider.browseComponents()];
                        case 1:
                            // Update components in model
                            _a.components = _b.sent();
                            // update the components meta data
                            return [4 /*yield*/, this.updateComponentMetaData()];
                        case 2:
                            // update the components meta data
                            _b.sent();
                            // filter and update the user components
                            this.userComponents = MappCockpitComponentDataModel.retrieveUserComponents(this.components);
                            // Connect to model
                            this.connectComponentsToModel();
                            this.componentsSource.value = this.components;
                            return [2 /*return*/, this.components];
                    }
                });
            });
        };
        /**
         * Connects the components to the maon data model
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.connectComponentsToModel = function () {
            var _this = this;
            this.components.forEach(function (component) { component.model = _this; });
        };
        /**
         * Updates the components meta data
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.updateComponentMetaData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < this.components.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.browseMetaInfo(this.components[i])];
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
         * Reads the available user components
         *
         * @private
         * @param {Property<MappCockpitComponent[]>} dataLink
         * @returns {Promise<MappCockpitComponent[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.requestReadUserComponents = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var userComponents;
                return __generator(this, function (_a) {
                    userComponents = [];
                    try {
                        // filter components to be exposed to the user
                        userComponents = MappCockpitComponentDataModel.retrieveUserComponents(this.components);
                        // submit user components
                        dataLink.readRequestExecuted(userComponents);
                    }
                    catch (error) {
                        console.error(error);
                        dataLink.readRequestRejected(error);
                    }
                    return [2 /*return*/, userComponents];
                });
            });
        };
        /**
         * Retrieves the user components from the available components
         *
         * @private
         * @param {MappCockpitComponent[]} components
         * @returns
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.retrieveUserComponents = function (components) {
            var userComponents = components.filter(function (component) { return component.metaData; });
            userComponents.forEach(function (component) { mappCockpitComponent_1.MappCockpitComponent.registerUserComponent(component); });
            return userComponents;
        };
        /**
         * browses the meta data, parameters and methods of a single component
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseComponent = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // service channel must be loaded before parameters
                        return [4 /*yield*/, this.browseServiceChannel(mappCockpitComponent)];
                        case 1:
                            // service channel must be loaded before parameters
                            _a.sent();
                            return [4 /*yield*/, this.browseParameters(mappCockpitComponent)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.browseMethods(mappCockpitComponent)];
                        case 3:
                            _a.sent();
                            console.log("MappCockpitComponentDataModel.browseComponent: %o", mappCockpitComponent);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Called after components update
         *
         * @param {MappCockpitComponent[]} mappCockpitComponents
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onComponentsUpdated = function (mappCockpitComponents) {
            this.eventComponentsUpdated.raise(this, mappCockpitComponents);
        };
        /**
           * browses the meta info for a component
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMetaInfo = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfoReferences, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMetaInfo(mappCockpitComponent)];
                        case 1:
                            metaInfoReferences = _a.sent();
                            if (metaInfoReferences) {
                                mappCockpitComponent.metaData = this.readMetaData(metaInfoReferences);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            console.error(e_1.message);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/, mappCockpitComponent.metaData];
                    }
                });
            });
        };
        /**
         * Browses available component parameters
         *
         * @returns {Promise<void>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // Update components in model
                            _a = mappCockpitComponent;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseParameters(mappCockpitComponent)];
                        case 1:
                            // Update components in model
                            _a.parameters = _b.sent();
                            // retrieve and update user parameters
                            return [4 /*yield*/, this.retrieveUserParameters(mappCockpitComponent)];
                        case 2:
                            // retrieve and update user parameters
                            _b.sent();
                            return [2 /*return*/, mappCockpitComponent.parameters];
                    }
                });
            });
        };
        /**
         * Browses and updates the methods input parameters
         *
         * @param {MappCockpitComponentMethod} mappCockpitComponentMethod
         * @returns {Promise<MappCockpitMethodParameter[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMethodInputParameters = function (mappCockpitComponentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // browse and update the methods parameters
                        return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMethodParameters([mappCockpitComponentMethod])];
                        case 1:
                            // browse and update the methods parameters
                            _a.sent();
                            // update the parameter data types
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateMethodParameterDataTypes([mappCockpitComponentMethod])];
                        case 2:
                            // update the parameter data types
                            _a.sent();
                            return [2 /*return*/, mappCockpitComponentMethod.inputParameters];
                    }
                });
            });
        };
        /**
         * Retrieves the component parameters relevant for the user. They are specified by meta data
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.retrieveUserParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var watchableMetaConfig, watchableStateMetaConfig;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            watchableMetaConfig = ['MetaConfigWatchables', 'WatchablesStructure', 'Watchable'];
                            watchableStateMetaConfig = ['MetaConfigWatchablesStates', 'WatchablesStatesStructure', 'WatchableState'];
                            mappCockpitComponent.messageParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveMessageParameters(mappCockpitComponent.parameters);
                            if (!mappCockpitComponent.metaData) return [3 /*break*/, 5];
                            if (!(mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("Watchable"))) return [3 /*break*/, 2];
                            mappCockpitComponent.watchableParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveWatchableParameters(mappCockpitComponent.parameters, watchableMetaConfig);
                            if (!(mappCockpitComponent.watchableParameters.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateParameterDataTypes(mappCockpitComponent.watchableParameters)];
                        case 1:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.updateParameter(mappCockpitComponent.watchableParameters, mappCockpitComponent.metaData["Parameters"]["Watchable"]);
                            _a.label = 2;
                        case 2:
                            if (!(mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("Configuration"))) return [3 /*break*/, 4];
                            mappCockpitComponent.configurationParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveConfigurationParameters(mappCockpitComponent.parameters);
                            if (!(mappCockpitComponent.configurationParameters.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateParameterDataTypes(mappCockpitComponent.configurationParameters)];
                        case 3:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.updateParameter(mappCockpitComponent.configurationParameters, mappCockpitComponent.metaData["Parameters"]["Configuration"]);
                            _a.label = 4;
                        case 4:
                            if (mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("WatchableState") && mappCockpitComponent.watchableParameters.length > 0) {
                                mappCockpitComponent.watchableStateParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveWatchableStates(mappCockpitComponent.watchableParameters, watchableStateMetaConfig);
                            }
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * writes the value to component parameter
         *
         * @param {MappCockpitComponentParameter} parameter
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.writeComponentParameter = function (parameter) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.writeParameterValue(parameter, parameter.value)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * browses the component methods
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<MappCockpitComponentMethod[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMethods = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var methodsMetaConfig, quickCommandsMetaConfig, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            methodsMetaConfig = ['MetaConfigCommands', 'CommandsStructure', 'Command'];
                            quickCommandsMetaConfig = ['MetaConfigQuickCommands', 'QuickCommandsStructure', 'QuickCommand'];
                            // Update component methods in model
                            _a = mappCockpitComponent;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMethods(mappCockpitComponent)];
                        case 1:
                            // Update component methods in model
                            _a.methods = _b.sent();
                            // filter the methods to the ones specefied by meta info
                            mappCockpitComponent.userMethods = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.retrieveExecutableMethods(mappCockpitComponent.methods, methodsMetaConfig);
                            mappCockpitComponent.quickCommands = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.retrieveQuickCommands(mappCockpitComponent.methods, quickCommandsMetaConfig);
                            return [2 /*return*/, mappCockpitComponent.methods];
                    }
                });
            });
        };
        /**
         * Browses for the service channel and connects it if available
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseServiceChannel = function (mappCockpitComponent) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            // browse the service channel
                            _b = mappCockpitComponent;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseServiceChannel(mappCockpitComponent)];
                        case 1:
                            // browse the service channel
                            _b.serviceChannel = _c.sent();
                            if (!mappCockpitComponent.serviceChannel) return [3 /*break*/, 3];
                            // update the request methods input parameters
                            return [4 /*yield*/, this.browseMethodInputParameters((_a = mappCockpitComponent.serviceChannel) === null || _a === void 0 ? void 0 : _a.request)];
                        case 2:
                            // update the request methods input parameters
                            _c.sent();
                            if (mappCockpitComponent.serviceChannel) {
                                mappCockpitComponent.serviceChannel.initialize();
                            }
                            _c.label = 3;
                        case 3: return [2 /*return*/, mappCockpitComponent.serviceChannel];
                    }
                });
            });
        };
        /**
         * Retrieves the methods relevant for the user. They are specified by meta data
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @param {*} componentMethods
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.retrieveUserMethods = function (mappCockpitComponent, componentMethods) {
            var userMethods = [];
            if (mappCockpitComponent.metaData && mappCockpitComponent.metaData.hasOwnProperty("Methods") && mappCockpitComponent.metaData["Methods"].hasOwnProperty("Executable")) {
                var methodsMeta_1 = mappCockpitComponent.metaData["Methods"]["Executable"];
                userMethods = componentMethods.filter(function (method) { return methodsMeta_1[method.browseName]; });
            }
            return userMethods;
        };
        /**
         * reads the meta infos into a single object
         *
         * @private
         * @param {Array<string>} metaParameters
         * @returns
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.readMetaData = function (metaParameters) {
            var metaData = {};
            try {
                metaParameters.forEach(function (metaParameter) {
                    if (metaParameter.value == "") { // Fallback: Use empty object in case of empty metaInfo
                        metaParameter.value = "{}";
                    }
                    //Just for prototype: Enable/Disable of methods
                    // if (metaParameter.nodeId == "ns=5;s=gAxis1.MetaConfigCommands") {
                    //     metaParameter.value = '{"CommandsStructure":{"Scope":"mapp/Motion/Axis/AcpAxis","Childs":[{"Group":{"DisplayName":"Preparation","Childs":[{"Command":{"DisplayName":"Power on","Ref":"Power On","WatchableVariablesMapping":[["Is Powered","Is_Powered"]],"EnableStateExpression":"Is_Powered == false ? true : false"}},{"Command":{"DisplayName":"Power off","Ref":"Power Off","WatchableVariablesMapping":[["Is Powered","Is_Powered"]],"EnableStateExpression":"Is_Powered == true ? true : false"}},{"Command":{"DisplayName":"Init home","Ref":"Init Home","Parameters":[{"Parameter":{"DisplayName":"Homing mode","Ref":"Homing Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::InitHomeReduced"}}},{"Parameter":{"DisplayName":"Position","Ref":"Position","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Start velocity","Ref":"Start Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Homing velocity","Ref":"Homing Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Switch edge","Ref":"SwitchEdge","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::InitHomeDirection"}}},{"Parameter":{"DisplayName":"Start direction","Ref":"Start Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::InitHomeDirection"}}},{"Parameter":{"DisplayName":"Homing direction","Ref":"Homing Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::InitHomeDirection"}}},{"Parameter":{"DisplayName":"Reference pulse","Ref":"Reference Pulse","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::Switch"}}},{"Parameter":{"DisplayName":"Keep direction","Ref":"Keep Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::Switch"}}},{"Parameter":{"DisplayName":"Reference pulse blocking distance","Ref":"Reference Pulse Blocking Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Torque limit","Ref":"Torque Limit","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Block detection position error","Ref":"Block Detection Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Position error stop limit","Ref":"Position Error Stop Limit","DefaultValue":"0.0","EU":"mm"}}]}},{"Command":{"DisplayName":"Home","Ref":"Home","Parameters":[{"Parameter":{"DisplayName":"Position","Ref":"Position","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Homing mode","Ref":"Homing Mode","DefaultValue":"140","TypeDef":{"EnumTypeRef":"AcpAx::HomingReduced"}}}]}}]}},{"Group":{"DisplayName":"Administration","Childs":[{"Command":{"DisplayName":"Reset","Ref":"Reset"}},{"Command":{"DisplayName":"Set override","Ref":"Set Override","Parameters":[{"Parameter":{"DisplayName":"Velocity factor","Ref":"Velocity Factor","DefaultValue":"1.0"}},{"Parameter":{"DisplayName":"Acceleration factor","Ref":"Acceleration Factor","DefaultValue":"1.0"}}]}},{"Command":{"DisplayName":"Command error","Ref":"CommandError","Parameters":[{"Parameter":{"DisplayName":"Command","Ref":"Command","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::CommandErrors"}}}]}},{"Command":{"DisplayName":"Read ParID","Ref":"Read ParId","Parameters":[{"Parameter":{"DisplayName":"ParID","Ref":"ParId","DefaultValue":"0"}}]}},{"Command":{"DisplayName":"Write ParID","Ref":"Write ParId","Parameters":[{"Parameter":{"DisplayName":"ParID","Ref":"ParId","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Value","Ref":"Value","DefaultValue":"0"}}]}}]}},{"Group":{"DisplayName":"Movement","Childs":[{"Command":{"DisplayName":"Move absolute","Ref":"Move Absolute","Parameters":[{"Parameter":{"DisplayName":"Position","Ref":"Position","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"2","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Direction","Ref":"Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::MoveAbsDirection"}}}]}},{"Command":{"DisplayName":"Move additive","Ref":"Move Additive","Parameters":[{"Parameter":{"DisplayName":"Distance","Ref":"Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"2","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}}]}},{"Command":{"DisplayName":"Move velocity","Ref":"Move Velocity","Parameters":[{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"2","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Direction","Ref":"Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::MoveVeloDirection"}}}]}},{"Command":{"DisplayName":"Gear in","Ref":"Gear In","Parameters":[{"Parameter":{"DisplayName":"Master","Ref":"Master","DefaultValue":""}},{"Parameter":{"DisplayName":"Ratio numerator","Ref":"Ratio Numerator","DefaultValue":"0.0"}},{"Parameter":{"DisplayName":"Ratio denominator","Ref":"Ratio Denominator","DefaultValue":"0.0"}},{"Parameter":{"DisplayName":"Master value source","Ref":"Master Value Source","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::ValueSource"}}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Master max velocity","Ref":"Master Max Velocity","DefaultValue":"0.0","EU":"mm/s"}}]}},{"Command":{"DisplayName":"Cam in","Ref":"CamIn","Parameters":[{"Parameter":{"DisplayName":"Master","Ref":"Master","DefaultValue":""}},{"Parameter":{"DisplayName":"Master offset","Ref":"MasterOffset","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Slave offset","Ref":"SlaveOffset","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Master scaling","Ref":"MasterScaling","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Slave scaling","Ref":"SlaveScaling","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Start mode","Ref":"StartMode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::CamStartMode"}}},{"Parameter":{"DisplayName":"Master value source","Ref":"MasterValueSource","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::ValueSourceCamIn"}}},{"Parameter":{"DisplayName":"Cam ID","Ref":"CamID","DefaultValue":"65535"}},{"Parameter":{"DisplayName":"Periodic","Ref":"Periodic","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"0.0","EU":"mm/s²"}}]}},{"Command":{"DisplayName":"Torque control","Ref":"Torque Control","Parameters":[{"Parameter":{"DisplayName":"Torque","Ref":"Torque","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Torque ramp","Ref":"Torque Ramp","DefaultValue":"0.0","EU":"N·m/s"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}}]}},{"Command":{"DisplayName":"Brake operation","Ref":"Brake Operation","Parameters":[{"Parameter":{"DisplayName":"Command","Ref":"Command","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::BrakeCommand"}}}]}},{"Command":{"DisplayName":"Halt","Ref":"Halt","Parameters":[{"Parameter":{"DisplayName":"Deceleration","Ref":"Deceleration","DefaultValue":"10","EU":"mm/s²"}}]}}]}},{"Group":{"DisplayName":"Load simulation","Childs":[{"Command":{"DisplayName":"Load simulation command","Ref":"Load Simulation Command","Parameters":[{"Parameter":{"DisplayName":"Command","Ref":"Command","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::SimulationCommand"}}}]}},{"Command":{"DisplayName":"Load simulation set params auto","Ref":"Load Simulation Set Params Auto","Parameters":[{"Parameter":{"DisplayName":"Additive load ParID","Ref":"Additive Load ParId","DefaultValue":"0"}}]}},{"Command":{"DisplayName":"Load simulation set params one mass","Ref":"Load Simulation Set Params One Mass","Parameters":[{"Parameter":{"DisplayName":"Additive load ParID","Ref":"Additive Load ParId","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Inertia","Ref":"Inertia","DefaultValue":"0.0","EU":"kg·m²"}},{"Parameter":{"DisplayName":"Static friction","Ref":"Static Friction","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Viscous friction","Ref":"Viscous Friction","DefaultValue":"0.0","EU":"N·m·s"}}]}},{"Command":{"DisplayName":"Load simulation set params two masses","Ref":"Load Simulation Set Params Two Masses","Parameters":[{"Parameter":{"DisplayName":"Additive load ParID","Ref":"Additive Load ParId","DefaultValue":"0"}},{"Parameter":{"DisplayName":"Inertia M1","Ref":"Inertia M1","DefaultValue":"0.0","EU":"kg·m²"}},{"Parameter":{"DisplayName":"Static friction M1","Ref":"Static Friction M1","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Viscous friction M1","Ref":"Viscous Friction M1","DefaultValue":"0.0","EU":"N·m·s"}},{"Parameter":{"DisplayName":"Inertia M2","Ref":"Inertia M2","DefaultValue":"0.0","EU":"kg·m²"}},{"Parameter":{"DisplayName":"Static friction M2","Ref":"Static Friction M2","DefaultValue":"0.0","EU":"N·m"}},{"Parameter":{"DisplayName":"Viscous friction M2","Ref":"Viscous Friction M2","DefaultValue":"0.0","EU":"N·m·s"}},{"Parameter":{"DisplayName":"Stiffness","Ref":"Stiffness","DefaultValue":"0.0","EU":"N·m/rad"}},{"Parameter":{"DisplayName":"Damping","Ref":"Damping","DefaultValue":"0.0","EU":"N·m·s/rad"}}]}}]}},{"Group":{"DisplayName":"AutoTune","Childs":[{"Command":{"DisplayName":"Autotune position controller","Ref":"Auto Tune Position Controller","Parameters":[{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Operating point","Ref":"Operating Point","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOperationPoint"}}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Max proportional gain","Ref":"Max Proportional Gain","DefaultValue":"2000.0","EU":"As"}},{"Parameter":{"DisplayName":"Proportional gain percent","Ref":"Proportional Gain Percent","DefaultValue":"100.0","EU":"%"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune speed controller","Ref":"Auto Tune Speed Controller","Parameters":[{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Loop filter1 mode","Ref":"Loop Filter1 Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Filter time mode","Ref":"Filter Time Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningFilterTimeMode"}}},{"Parameter":{"DisplayName":"Integration time mode","Ref":"Integration Time Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningIntegrationTimeMode"}}},{"Parameter":{"DisplayName":"Operating point","Ref":"Operating Point","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOperationPoint"}}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Max proportional gain","Ref":"Max Proportional Gain","DefaultValue":"2000.0","EU":"As"}},{"Parameter":{"DisplayName":"Proportional gain percent","Ref":"Proportional Gain Percent","DefaultValue":"100.0","EU":"%"}},{"Parameter":{"DisplayName":"Resonance factor","Ref":"Resonance Factor","DefaultValue":"2.0"}},{"Parameter":{"DisplayName":"Inertia estimation lower frequency","Ref":"Inertia Estimation Lower Frequency","DefaultValue":"10.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Inertia estimation upper frequency","Ref":"Inertia Estimation Upper Frequency","DefaultValue":"40.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune feed forward","Ref":"Auto Tune Feed Forward","Parameters":[{"Parameter":{"DisplayName":"Direction","Ref":"Direction","DefaultValue":"0","TypeDef":{"EnumTypeRef":"Axis::Direction"}}},{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Max current percentage","Ref":"Max Current Percentage","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max velocity percentage","Ref":"Max Velocity Percentage","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune loop filters","Ref":"Auto Tune Loop Filters","Parameters":[{"Parameter":{"DisplayName":"Loop filter 1 mode","Ref":"Loop Filter1 Mode","DefaultValue":"1","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Loop filter 2 mode","Ref":"Loop Filter2 Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Loop filter 3 mode","Ref":"Loop Filter3 Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningLoopFilterMode"}}},{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Operating point","Ref":"Operating Point","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOperationPoint"}}},{"Parameter":{"DisplayName":"Velocity","Ref":"Velocity","DefaultValue":"0.0","EU":"mm/s"}},{"Parameter":{"DisplayName":"Acceleration","Ref":"Acceleration","DefaultValue":"0.0","EU":"mm/s²"}},{"Parameter":{"DisplayName":"Resonance factor","Ref":"Resonance Factor","DefaultValue":"2"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}},{"Command":{"DisplayName":"Autotune test","Ref":"Auto Tune Test","Parameters":[{"Parameter":{"DisplayName":"Mode","Ref":"Mode","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningTestMode"}}},{"Parameter":{"DisplayName":"Orientation","Ref":"Orientation","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningOrientation"}}},{"Parameter":{"DisplayName":"Max current percent","Ref":"Max Current Percent","DefaultValue":"50","EU":"%"}},{"Parameter":{"DisplayName":"Max distance","Ref":"Max Distance","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Max position error","Ref":"Max Position Error","DefaultValue":"0.0","EU":"mm"}},{"Parameter":{"DisplayName":"Signal type","Ref":"Signal Type","DefaultValue":"0","TypeDef":{"EnumTypeRef":"AcpAx::AutoTuningExcitationSignal"}}},{"Parameter":{"DisplayName":"Signal order","Ref":"Signal Order","DefaultValue":"9"}},{"Parameter":{"DisplayName":"Delay time","Ref":"Delay Time","DefaultValue":"0.0","EU":"s"}},{"Parameter":{"DisplayName":"Signal start frequency","Ref":"Signal Start Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal stop frequency","Ref":"Signal Stop Frequency","DefaultValue":"0.0","EU":"Hz"}},{"Parameter":{"DisplayName":"Signal time","Ref":"Signal Time","DefaultValue":"0.0","EU":"s"}}]}}]}}]}}'
                    // }
                    metaData[metaParameter.browseName] = JSON.parse(metaParameter.value);
                    //Just for prototype: watchableIcons
                    //var watchstateMetaData = '{"WatchablesStatesStructure":{"Scope":"mapp/Motion/Axis/AcpAxis","Childs":[{"Group":{"DisplayName":"Main","Childs":[{"WatchableState":{"Ref":"Axis_state","WatchableVariablesMapping":[["Communication Ready","Communication"],["PlcOpen State","PLC_State"]],"IconExpression":"Communication == false ? 1 : PLC_State == 1 ? 2 : PLC_State == 2 ? 3 : PLC_State == 3 or PLC_State == 4 or PLC_State == 5 ? 4 : PLC_State == 6 ? 5 : PLC_State == 7 ? 6 : 0","Icon":{"0":{"ImageName":"GearDisabled","Tooltip":"Axis is disabled"},"1":{"ImageName":"CommunicationNotReady","Tooltip":"Communication is not ready"},"2":{"ImageName":"GearEnabled","Tooltip":"Axis is standstill"},"3":{"ImageName":"GeneralError","Tooltip":"Axis is in error state"},"4":{"ImageName":"GearRotating","Tooltip":"Axis is moving"},"5":{"ImageName":"GearsRotating","Tooltip":"Axis is synchronized"}}}},{"WatchableState":{"Ref":"Controller_state","WatchableVariablesMapping":[["Is Powered","Is_Powered"]],"IconExpression":"Is_Powered == true ? 1 : 0","Icon":{"0":{"ImageName":"Off","Tooltip":"Controller is switched off"},"1":{"ImageName":"On","Tooltip":"Controller is switched on"}}}},{"WatchableState":{"Ref":"Axis_reference_state","WatchableVariablesMapping":[["Is Homed","Is_Homed"],["PlcOpen State","PLC_State"]],"IconExpression":"Is_Homed == true ? 1 : PLC_State == 7 ? 2: 0","Icon":{"0":{"ImageName":"UnkownPosition","Tooltip":"Axis is not homed"},"1":{"ImageName":"KnownPosition","Tooltip":"Axis is homed"},"2":{"ImageName":"FindingPosition","Tooltip":"Axis is homing"}}}}]}}]}}'; 
                    //metaData['MetaConfigWatchablesStates'] = JSON.parse(watchstateMetaData);
                    //Just for prototype: quickCommands
                    // var quickMethod = ' {"QuickCommandsStructure":{"Scope":"mapp/Motion/Axis/AcpAxis","Childs":[{"Group":{"DisplayName":"Main","Childs":[{"QuickCommand":{"Ref":"Power On","Tooltip":"Power on","ImageName":"On"}},{"QuickCommand":{"Ref":"Power Off","Tooltip":"Power off","ImageName":"Off"}},{"QuickCommand":{"Ref":"Abort Command","Tooltip":"Abort command","ImageName":"Stop"}},{"QuickCommand":{"Ref":"Reset","Tooltip":"Reset","ImageName":"Reset"}}]}}]}} '
                    // metaData['MetaConfigQuickCommands'] = JSON.parse(quickMethod);
                });
                // update specific parameter types in meta data object
                mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.initializeMetaData(metaData);
            }
            catch (e) {
                throw new Error("MappCockpitComponentDataModel.browseMetaData: could not parse meta data: " + e.message);
            }
            return metaData;
        };
        MappCockpitComponentDataModel.prototype.executeComponentMethod = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.executeComponentMethod(componentMethod)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * called after component parameters have been updated
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        // Obsolete because components can't be updated at runtime
        /*onComponentParametersUpdated(component: MappCockpitComponent, componentParameters: MappCockpitComponentParameter[]): any {
            this.eventComponentParametersUpdated.raise(this, new EventModelChangedArgs(this, ModelChangeType.updateTarget, "updatedComponentParameters", componentParameters));
        }*/
        /**
         * called after component methods have been updated
         *
         * @param {MappCockpitComponent} component
         * @param {MappCockpitComponentParameter[]} componentMethods
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        // Obsolete because components can't be updated at runtime
        /*onComponentMethodsUpdated(component: MappCockpitComponent, componentMethods: MappCockpitComponentMethod[]): any {
            this.eventComponentMethodsUpdated.raise(this, new EventModelChangedArgs(this, ModelChangeType.updateTarget, "updatedComponentMethods", componentMethods));
        }*/
        /**
         * reads  and updates the parameter values of the specified parameter list
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.readParameterValues = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.readParameterValues(componentParameters)];
                        case 1:
                            _a.sent();
                            this.onParameterValuesUpdated(componentParameters);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * observes the parameters for value changes
         *
         * @param {IObserver} observer
         * @param {MappCockpitComponentItem[]} observableDataModelItems
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.observeDataModelItems = function (observer, observableDataModelItems) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.observeComponentModelItems(observer, observableDataModelItems)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Unobserves the passed parameters.
         *
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @param {boolean} suspend
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.unobserveComponentModelItems = function (observer, observableParameters, suspend) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.unobserveComponentModelItems(observer, observableParameters, suspend)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * handles observable changed notifications
         *
         * @private
         * @param {EventObservedItemsChangedArgs} eventArgs
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.handleObservableItemsChanged = function (eventArgs) {
            if (eventArgs.observer instanceof dataModelBase_1.DataModelBase) {
                // create model changed args
                var modelItemsChangedArgs = new dataModelInterface_1.EventModelChangedArgs(eventArgs.observer, dataModelInterface_1.ModelChangeType.updateTarget, "changed observables", eventArgs.changedItems);
                // notify observers from changing model items
                eventArgs.observer.onModelItemsChanged(eventArgs.observer, modelItemsChangedArgs);
            }
        };
        /**
         * notify from updating the specified parameters values
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onParameterValuesUpdated = function (componentParameters) {
            this.eventParameterValuesUpdated.raise(this, componentParameters);
        };
        /**
         * Called when the model has been successfully connected
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelConnected = function () {
            this._modelConnected = true;
            this.onModelConnectionChanged(this._modelConnected);
        };
        /**
         * Called when the model has lost the connection to the target
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelDisconnected = function () {
            // notify connection change
            this._modelConnected = false;
            this.onModelConnectionChanged(this._modelConnected);
        };
        /**
         * Observes the connection if it is still alive
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.startObserveModelConnection = function () {
            var _this = this;
            // initially notify the successfull connection
            this.onModelConnected();
            // establish a timer for watching the connection
            if (this._connectionObservationTimerId == -1) {
                this._connectionObservationTimerId = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.observeModelConnection()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, this._connectionObservationInterval);
            }
        };
        /**
         * Obsereves the model connection
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.observeModelConnection = function () {
            return __awaiter(this, void 0, void 0, function () {
                var isConnected;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.checkTargetConnection()];
                        case 1:
                            isConnected = _a.sent();
                            if (isConnected) {
                                if (!this._modelConnected) {
                                    this.onModelConnected();
                                }
                            }
                            else {
                                if (this._modelConnected) {
                                    this.onModelDisconnected();
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Called when the model connection has changed
         *
         * @param {boolean} connected
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelConnectionChanged = function (connected) {
            this.eventModelConnectionChanged.raise(this, connected);
        };
        /**
         * Provides command for changing the user to be logged in
         *
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.executeCommandChangeUser = function () {
            var _this = this;
            return function (userInfo, commandResponse) { return __awaiter(_this, void 0, void 0, function () {
                var _a, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            // update the user roles
                            _a = this._userRoles;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.changeUser(userInfo)];
                        case 1:
                            // update the user roles
                            _a.value = (_b.sent());
                            commandResponse.executed(this._userRoles);
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _b.sent();
                            commandResponse.rejected(error_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        return MappCockpitComponentDataModel;
    }());
    exports.MappCockpitComponentDataModel = MappCockpitComponentDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50c0RhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL29ubGluZS9jb21wb25lbnRzRGF0YU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtQkE7UUFBbUMsd0NBQW9EO1FBQXZGOztRQUF5RixDQUFDO1FBQUQsMkJBQUM7SUFBRCxDQUFDLEFBQTFGLENBQW1DLG1CQUFVLEdBQTZDO0lBQUEsQ0FBQztJQUMzRjtRQUFxQywwQ0FBaUU7UUFBdEc7O1FBQXdHLENBQUM7UUFBRCw2QkFBQztJQUFELENBQUMsQUFBekcsQ0FBcUMsbUJBQVUsR0FBMEQ7SUFBQSxDQUFDO0lBQzFHO1FBQThDLG1EQUFnRTtRQUE5Rzs7UUFBZ0gsQ0FBQztRQUFELHNDQUFDO0lBQUQsQ0FBQyxBQUFqSCxDQUE4QyxtQkFBVSxHQUF5RDtJQUFBLENBQUM7SUFDbEg7UUFBMkMsZ0RBQWdFO1FBQTNHOztRQUE2RyxDQUFDO1FBQUQsbUNBQUM7SUFBRCxDQUFDLEFBQTlHLENBQTJDLG1CQUFVLEdBQXlEO0lBQUEsQ0FBQztJQUMvRztRQUEwQywrQ0FBK0U7UUFBekg7O1FBQTJILENBQUM7UUFBRCxrQ0FBQztJQUFELENBQUMsQUFBNUgsQ0FBMEMsbUJBQVUsR0FBd0U7SUFBQSxDQUFDO0lBRTdIO1FBQW1DLHdDQUFrRDtRQUFyRjs7UUFBc0YsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FBQyxBQUF2RixDQUFtQyxtQkFBVSxHQUEwQztJQUFBLENBQUM7SUFFeEY7Ozs7T0FJRztJQUNIO1FBMENJOzs7V0FHRztRQUNIO1lBQUEsaUJBcUJDO1lBNUNELDJDQUEyQztZQUNuQyxzQkFBaUIsR0FBMEMsbUJBQVEsQ0FBQyxNQUFNLENBQThCLEVBQUUsQ0FBQyxDQUFDO1lBQzVHLDBCQUFxQixHQUEwQyxt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QUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO29DQUN2QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQ0FDM0I7NkJBQ0o7aUNBQUk7Z0NBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO29DQUN0QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztpQ0FDOUI7NkJBQ0o7Ozs7O1NBQ0o7UUFFRDs7Ozs7O1dBTUc7UUFDSCxnRUFBd0IsR0FBeEIsVUFBeUIsU0FBaUI7WUFDdEMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsZ0VBQXdCLEdBQXhCO1lBQUEsaUJBVUM7WUFURyxPQUFPLFVBQU8sUUFBWSxFQUFFLGVBQXVEOzs7Ozs7NEJBRTNFLHdCQUF3Qjs0QkFDeEIsS0FBQSxJQUFJLENBQUMsVUFBVSxDQUFBOzRCQUFVLHFCQUFNLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUE7OzRCQUR2Rix3QkFBd0I7NEJBQ3hCLEdBQWdCLEtBQUssSUFBSSxTQUEwRSxDQUFBLENBQUM7NEJBQ3BHLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7OzRCQUUxQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQUssQ0FBQyxDQUFDOzs7OztpQkFFdkMsQ0FBQztRQUNOLENBQUM7UUFDTCxvQ0FBQztJQUFELENBQUMsQUF4eEJELElBd3hCQztJQUVRLHNFQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2RpYWdub3N0aWNzL21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50LCBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSwgTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIgfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3MvdHJhY2UvbWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvZXZlbnRzJztcclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBNb2RlbENoYW5nZVR5cGUgfSBmcm9tIFwiLi4vZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzIH0gZnJvbSBcIi4uL2RpYWdub3N0aWNzL21hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBEYXRhTW9kZWxCYXNlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IENvbW1hbmQsIElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZSwgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlciB9IGZyb20gXCIuLi9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGEgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUmVhZGVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbywgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vbWFwcENvY2twaXRDb25maWdcIjtcclxuaW1wb3J0IHsgSU9ic2VydmVyIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZSB9IGZyb20gXCIuL21hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZVwiO1xyXG5pbXBvcnQgeyBCaW5kaW5ncyB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2JpbmRpbmdzXCI7XHJcbmltcG9ydCAqIGFzIEJpbmRpbmcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ0RlY2xhcmF0aW9uc1wiO1xyXG5cclxuXHJcbmNsYXNzIEV2ZW50VHJhY2VEYXRhTG9hZGVkIGV4dGVuZHMgVHlwZWRFdmVudDxNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCwgVHJhY2VEYXRhPnsgfTtcclxuY2xhc3MgRXZlbnRDb21wb25lbnRzVXBkYXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIE1hcHBDb2NrcGl0Q29tcG9uZW50W10+eyB9O1xyXG5jbGFzcyBFdmVudENvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkIGV4dGVuZHMgVHlwZWRFdmVudDxNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRDb21wb25lbnRNZXRob2RzVXBkYXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50UGFyYW1ldGVyVmFsdWVzVXBkYXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj57IH07XHJcblxyXG5jbGFzcyBFdmVudE1vZGVsQ29ubmVjdGlvbiBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIGJvb2xlYW4+e307XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGltcGxlbWVudHMgdGhlIG1haW4gZGF0YSBtb2RlbCBmb3IgbWFwcCBDb2NrcGl0LiBcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9jb21wb25lbnRzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD47XHJcblxyXG4gICAgcHJvdGVjdGVkIF91c2VyQ29tcG9uZW50czogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+O1xyXG5cclxuICAgIC8vIERlY2xhcmUgZXZlbnQgdHJhY2UgZGF0YSBsb2FkZWRcclxuICAgIHB1YmxpYyBldmVudFRyYWNlRGF0YUxvYWRlZDogRXZlbnRUcmFjZURhdGFMb2FkZWQ7XHJcblxyXG4gICAgLy8gRGVjbGFyZSBldmVudCB0cmFjZSBkYXRhIGxvYWRlZFxyXG4gICAgcHVibGljIGV2ZW50Q29tcG9uZW50c1VwZGF0ZWQ6IEV2ZW50Q29tcG9uZW50c1VwZGF0ZWQ7XHJcblxyXG4gICAgcHVibGljIGV2ZW50Q29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQ6IEV2ZW50Q29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQ7XHJcblxyXG4gICAgcHVibGljIGV2ZW50Q29tcG9uZW50TWV0aG9kc1VwZGF0ZWQ6IEV2ZW50Q29tcG9uZW50TWV0aG9kc1VwZGF0ZWQ7XHJcblxyXG4gICAgcHVibGljIGV2ZW50UGFyYW1ldGVyVmFsdWVzVXBkYXRlZDogRXZlbnRQYXJhbWV0ZXJWYWx1ZXNVcGRhdGVkO1xyXG5cclxuICAgIC8vIERlY2xhcmUgZXZlbnQgZm9yIG1vZGVsIGNvbm5lY3Rpb24gY2hhbmdlXHJcbiAgICBwdWJsaWMgZXZlbnRNb2RlbENvbm5lY3Rpb25DaGFuZ2VkOiBFdmVudE1vZGVsQ29ubmVjdGlvbjtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSBkYXRhIHNvdXJjZSBmb3IgdGhlIGNvbXBvbmVudHMuXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRzU291cmNlOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4oW10pO1xyXG4gICAgcHJpdmF0ZSBfdXNlckNvbXBvbmVudHNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PihbXSwoZGF0YUxpbmspPT57dGhpcy5yZXF1ZXN0UmVhZFVzZXJDb21wb25lbnRzKGRhdGFMaW5rKTt9KTtcclxuXHJcbiAgICAvLyBDb21tYW5kIGZvciBjaGFuZ2luZyB0aGUgdXNlclxyXG4gICAgcHJpdmF0ZSBfY29tbWFuZENoYW5nZVVzZXIhOiBDb21tYW5kPHt9LCB7fT47XHJcbiAgICBcclxuICAgIC8vIEhvbGRzIHVzZXIgcm9sZXNcclxuICAgIHByaXZhdGUgX3VzZXJSb2xlczogUHJvcGVydHk8c3RyaW5nW10+ID0gIFByb3BlcnR5LmNyZWF0ZTxzdHJpbmdbXT4oW10pO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyBpbnRlcnZhbCBmb3IgY29ubmVjdGlvbiBvYnNlcnZhdGlvblxyXG4gICAgcHJpdmF0ZSAgX2Nvbm5lY3Rpb25PYnNlcnZhdGlvbkludGVydmFsOiBudW1iZXIgPSAxMDAwO1xyXG4gICAgLy8gc3BlY2VmaWVzIHRoZSBjb25uZWN0aW9uIG9ic2VydmF0aW9uIGlkXHJcbiAgICBwcml2YXRlIF9jb25uZWN0aW9uT2JzZXJ2YXRpb25UaW1lcklkOiBudW1iZXIgPSAtMTtcclxuICAgIC8vIGhvbGRzIHRoZSBjdXJyZW50IG1vZGVsIGNvbm5lY3Rpb24gc3RhdGVcclxuICAgIHByaXZhdGUgX21vZGVsQ29ubmVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfb2JzZXJ2YWJsZXNDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLmhhbmRsZU9ic2VydmFibGVJdGVtc0NoYW5nZWQoZXZlbnRBcmdzKTsgfTsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgbWVtYmVyc1xyXG4gICAgICAgIHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyID0gbmV3IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLl91c2VyQ29tcG9uZW50cyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgZXZlbnQgc291cmNlc1xyXG4gICAgICAgIHRoaXMuZXZlbnRUcmFjZURhdGFMb2FkZWQgPSBuZXcgRXZlbnRUcmFjZURhdGFMb2FkZWQoKTtcclxuICAgICAgICB0aGlzLmV2ZW50Q29tcG9uZW50c1VwZGF0ZWQgPSBuZXcgRXZlbnRDb21wb25lbnRzVXBkYXRlZCgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRDb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZCA9IG5ldyBFdmVudENvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFBhcmFtZXRlclZhbHVlc1VwZGF0ZWQgPSBuZXcgRXZlbnRQYXJhbWV0ZXJWYWx1ZXNVcGRhdGVkKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudENvbXBvbmVudE1ldGhvZHNVcGRhdGVkID0gbmV3IEV2ZW50Q29tcG9uZW50TWV0aG9kc1VwZGF0ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudE1vZGVsQ29ubmVjdGlvbkNoYW5nZWQgPSBuZXcgRXZlbnRNb2RlbENvbm5lY3Rpb24oKTtcclxuXHJcbiAgICAgICAgLy8gZm9yd2FyZCB0aGUgZXZlbnRcclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5ldmVudE9ic2VydmFibGVzQ2hhbmdlZC5hdHRhY2godGhpcy5fb2JzZXJ2YWJsZXNDaGFuZ2VkSGFuZGxlcik7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgaW5pdGlhbGl6ZSBjb21tYW5kc1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBkZXRhY2ggZXZlbnRzXHJcbiAgICAgICAgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuZXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQuZGV0YWNoKHRoaXMuX29ic2VydmFibGVzQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgZXhwb3NlZCBjb21tYW5kc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kcygpIHtcclxuICAgICAgICB0aGlzLl9jb21tYW5kQ2hhbmdlVXNlciA9IENvbW1hbmQuY3JlYXRlPHt9LHt9Pih0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kQ2hhbmdlVXNlcigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemVzIHRoZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdHJhY2UgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0cmFjZVByb3ZpZGVyKCk6IE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLnRyYWNlUHJvdmlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25uZWN0cyB0aGUgZGF0YSBtb2RlbCB0byB0aGUgZGF0YSBzb3VyY2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBjb25uZWN0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5iZWdpblNlc3Npb24oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9kZWxCaW5kaW5ncygpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5icm93c2VDb21wb25lbnRzKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBhZnRlciBjb25uZWN0aW5nIHN1Y2Nlc3NmdWxseVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0T2JzZXJ2ZU1vZGVsQ29ubmVjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGJpbmRpbmdzIGFzIHByb3ZpZGVycyBmb3IgZGF0YSB1c2VkIGZyb20gc3BlY2lmaWMgd2lkZ2V0cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RlbEJpbmRpbmdzKCkge1xyXG5cclxuICAgICAgICBCaW5kaW5ncy5jcmVhdGVCeURlY2woQmluZGluZy5Db21wb25lbnRzLkNvbXBvbmVudC5Db25uZWN0LCB0aGlzLCBcImNvbm5lY3RDb21wb25lbnRcIiwgXCJcIiwgdHJ1ZSk7XHJcbiAgICAgICAgQmluZGluZ3MuY3JlYXRlQnlEZWNsKEJpbmRpbmcuQ29tcG9uZW50cy5Db21wb25lbnQuRGlzY29ubmVjdCwgdGhpcywgXCJkaXNjb25uZWN0Q29tcG9uZW50XCIsIFwiXCIsIHRydWUpO1xyXG5cclxuXHJcbiAgICAgICAgQmluZGluZ3MuY3JlYXRlQnlEZWNsKEJpbmRpbmcuQ29tcG9uZW50cy5Vc2VyQ29tcG9uZW50SWRzLCB0aGlzLCBcIlwiLCBcIm9uVXNlckNvbXBvbmVudElkc1VwZGF0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIEJpbmRpbmdzLmNyZWF0ZUJ5RGVjbChCaW5kaW5nLlRvb2xzLlRvb2xzSWRzLCB0aGlzLCBcIlwiLCBcIm9uVG9vbHNDb21wb25lbnRJZHNVcGRhdGVkXCIsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgY29tcG9uZW50IGJpbmRpbmdzIGFzIHByb3ZpZGVycyBmb3IgZGF0YSB1c2VkIGZyb20gd2l0aCBlLmcuIHNwZWNpZmljIHdpZGdldHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50QmluZGluZ3MoKSB7XHJcbiAgICAgICAgLy8gY3JlYXRlIGNvbXBvbmVudCBiaW5kaW5nIHNvdXJjZXNcclxuICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5jcmVhdGVCaW5kaW5ncygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Vc2VyQ29tcG9uZW50SWRzVXBkYXRlZChjb21wb25lbnRJZHM6ICBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgLy9CSU5ESU5HU09VUkNFOiBtZXRob2Qgc3R1YiBzdXBwb3J0aW5nIGJpbmRhYmlsaXR5XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRvb2xzQ29tcG9uZW50SWRzVXBkYXRlZChjb21wb25lbnRJZHM6ICBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgLy9CSU5ESU5HU09VUkNFOiBtZXRob2Qgc3R1YiBzdXBwb3J0aW5nIGJpbmRhYmlsaXR5XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25uZWN0Q29tcG9uZW50KGNvbXBvbmVudElkOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vTG9vayBmb3IgY29tcG9uZW50XHJcbiAgICAgICAgbGV0IGZvdW5kQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRzLmZpbmQoY29tcG9uZW50ID0+IGNvbXBvbmVudC5icm93c2VOYW1lID09IGNvbXBvbmVudElkKTtcclxuICAgICAgICAvLyBjb25uZWN0IGNvbXBvbmVudFxyXG4gICAgICAgIGlmKGZvdW5kQ29tcG9uZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZvdW5kQ29tcG9uZW50LmNvbW1hbmRDb25uZWN0Q29tcG9uZW50LmV4ZWN1dGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudCBub3QgZm91bmQhIENvbm5lY3Qgbm90IHBvc3NpYmxlIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkaXNjb25uZWN0Q29tcG9uZW50KGNvbXBvbmVudElkOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vTG9vayBmb3IgY29tcG9uZW50XHJcbiAgICAgICAgbGV0IGZvdW5kQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRzLmZpbmQoY29tcG9uZW50ID0+IGNvbXBvbmVudC5icm93c2VOYW1lID09IGNvbXBvbmVudElkKTtcclxuICAgICAgICAvLyBjb25uZWN0IGNvbXBvbmVudFxyXG4gICAgICAgIGlmKGZvdW5kQ29tcG9uZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZvdW5kQ29tcG9uZW50LmNvbW1hbmREaXNjb25uZWN0Q29tcG9uZW50LmV4ZWN1dGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudCBub3QgZm91bmQhIENvbm5lY3Qgbm90IHBvc3NpYmxlIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb21tYW5kQ2hhbmdlVXNlcigpOiBDb21tYW5kPHt9LCB7fT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21tYW5kQ2hhbmdlVXNlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGF2YWlsYWJsZSBtYXBwIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb21wb25lbnRzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYXZhaWxhYmxlIG1hcHAgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGNvbXBvbmVudHMoY29tcG9uZW50czogTWFwcENvY2twaXRDb21wb25lbnRbXSkge1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBjb21wb25lbnRzO1xyXG5cclxuICAgICAgICBsZXQgdG9vbHNDb21wb25lbnRJZHMgPSB0aGlzLl9jb21wb25lbnRzLm1hcChjb21wb25lbnQgPT4gY29tcG9uZW50LmJyb3dzZU5hbWUpLmZpbHRlcihjb21wb25lbnRJZCA9PiBjb21wb25lbnRJZCA9PSBcIkRyaXZlTG9nXCIpO1xyXG4gICAgICAgIHRoaXMub25Ub29sc0NvbXBvbmVudElkc1VwZGF0ZWQodG9vbHNDb21wb25lbnRJZHMpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHVzZXJDb21wb25lbnRzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJDb21wb25lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdXNlckNvbXBvbmVudHModXNlckNvbXBvbmVudHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pikge1xyXG4gICAgICAgIHRoaXMuX3VzZXJDb21wb25lbnRzID0gdXNlckNvbXBvbmVudHM7XHJcbiAgICAgICAgdGhpcy5vblVzZXJDb21wb25lbnRzVXBkYXRlZCh0aGlzLl91c2VyQ29tcG9uZW50cyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHVzZXJDb21wb25lbnRJZHMgPSB0aGlzLl91c2VyQ29tcG9uZW50cy5tYXAoY29tcG9uZW50ID0+IGNvbXBvbmVudC5icm93c2VOYW1lKTtcclxuICAgICAgICB0aGlzLm9uVXNlckNvbXBvbmVudElkc1VwZGF0ZWQodXNlckNvbXBvbmVudElkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblVzZXJDb21wb25lbnRzVXBkYXRlZChfdXNlckNvbXBvbmVudHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50W10pIHtcclxuICAgICAgICAvL0JJTkRJTkdTT1VSQ0U6IG1ldGhvZCBzdHViIGZvciBzdXBwcG9ydGluZyBiaW5kYWJpbGl0eVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGNvbXBvbmVudHNTb3VyY2UoKSA6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdXNlckNvbXBvbmVudHNTb3VyY2UoKSA6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyQ29tcG9uZW50c1NvdXJjZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHVzZXIgcm9sZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHVzZXJSb2xlcygpIDogUHJvcGVydHk8c3RyaW5nW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclJvbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHdyaXRlQWNjZXNzKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGxldCBtb2RlbEhhc1dyaXRlQWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlclJvbGVzLnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB3cml0ZSBhY2Nlc3MgcmlnaHQgYWNjb3JkaW5nIHRoZSBjdXJyZW50IHJvbGVcclxuICAgICAgICAgICAgbW9kZWxIYXNXcml0ZUFjY2VzcyA9IHRoaXMudXNlclJvbGVzLnZhbHVlLnNvbWUoKHVzZXJSb2xlKT0+eyByZXR1cm4gdXNlclJvbGUgPT09IE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi53cml0ZUFjY2Vzc1JvbGUgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9kZWxIYXNXcml0ZUFjY2VzcztcclxuICAgIH0gICBcclxuICBcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIGFsbCBhdmFpbGFibGUgcmVzb3VyY2VzIGFuZCB1cGRhdGVzIHRoZSBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJyb3dzZUNvbXBvbmVudHMoKTogUHJvbWlzZTxNYXBwQ29ja3BpdENvbXBvbmVudFtdPiB7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBjb21wb25lbnRzIGluIG1vZGVsXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuY29tcG9uZW50UHJvdmlkZXIuYnJvd3NlQ29tcG9uZW50cygpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGNvbXBvbmVudHMgbWV0YSBkYXRhXHJcbiAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVDb21wb25lbnRNZXRhRGF0YSgpO1xyXG5cclxuICAgICAgICAvLyBmaWx0ZXIgYW5kIHVwZGF0ZSB0aGUgdXNlciBjb21wb25lbnRzXHJcbiAgICAgICAgdGhpcy51c2VyQ29tcG9uZW50cyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLnJldHJpZXZlVXNlckNvbXBvbmVudHModGhpcy5jb21wb25lbnRzKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDb25uZWN0IHRvIG1vZGVsXHJcbiAgICAgICAgdGhpcy5jb25uZWN0Q29tcG9uZW50c1RvTW9kZWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRzU291cmNlLnZhbHVlID0gdGhpcy5jb21wb25lbnRzO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIGNvbXBvbmVudHMgdG8gdGhlIG1hb24gZGF0YSBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0Q29tcG9uZW50c1RvTW9kZWwoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4geyAoPGFueT5jb21wb25lbnQpLm1vZGVsID0gdGhpczsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnRzIG1ldGEgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyB1cGRhdGVDb21wb25lbnRNZXRhRGF0YSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmJyb3dzZU1ldGFJbmZvKHRoaXMuY29tcG9uZW50c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGF2YWlsYWJsZSB1c2VyIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFtdPn0gZGF0YUxpbmtcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50W10+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlYWRVc2VyQ29tcG9uZW50cyhkYXRhTGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRbXT4pOiBQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50W10+IHtcclxuICAgICAgICBsZXQgdXNlckNvbXBvbmVudHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50W10gPSBbXTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gZmlsdGVyIGNvbXBvbmVudHMgdG8gYmUgZXhwb3NlZCB0byB0aGUgdXNlclxyXG4gICAgICAgICAgICB1c2VyQ29tcG9uZW50cyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLnJldHJpZXZlVXNlckNvbXBvbmVudHModGhpcy5jb21wb25lbnRzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHN1Ym1pdCB1c2VyIGNvbXBvbmVudHNcclxuICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RFeGVjdXRlZCh1c2VyQ29tcG9uZW50cyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0UmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXNlckNvbXBvbmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIHVzZXIgY29tcG9uZW50cyBmcm9tIHRoZSBhdmFpbGFibGUgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50W119IGNvbXBvbmVudHNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmV0cmlldmVVc2VyQ29tcG9uZW50cyhjb21wb25lbnRzOiBNYXBwQ29ja3BpdENvbXBvbmVudFtdKSB7XHJcblxyXG4gICAgICAgIGxldCB1c2VyQ29tcG9uZW50cyA9IGNvbXBvbmVudHMuZmlsdGVyKChjb21wb25lbnQpID0+IHsgcmV0dXJuIGNvbXBvbmVudC5tZXRhRGF0YTsgfSk7XHJcblxyXG4gICAgICAgIHVzZXJDb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4geyBNYXBwQ29ja3BpdENvbXBvbmVudC5yZWdpc3RlclVzZXJDb21wb25lbnQoY29tcG9uZW50KTsgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB1c2VyQ29tcG9uZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJyb3dzZXMgdGhlIG1ldGEgZGF0YSwgcGFyYW1ldGVycyBhbmQgbWV0aG9kcyBvZiBhIHNpbmdsZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgYnJvd3NlQ29tcG9uZW50KG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCkge1xyXG4gICAgICAgIC8vIHNlcnZpY2UgY2hhbm5lbCBtdXN0IGJlIGxvYWRlZCBiZWZvcmUgcGFyYW1ldGVyc1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYnJvd3NlU2VydmljZUNoYW5uZWwobWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYnJvd3NlUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5icm93c2VNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbC5icm93c2VDb21wb25lbnQ6ICVvXCIsIG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciBjb21wb25lbnRzIHVwZGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRbXX0gbWFwcENvY2twaXRDb21wb25lbnRzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBvbkNvbXBvbmVudHNVcGRhdGVkKG1hcHBDb2NrcGl0Q29tcG9uZW50czogTWFwcENvY2twaXRDb21wb25lbnRbXSk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5ldmVudENvbXBvbmVudHNVcGRhdGVkLnJhaXNlKHRoaXMsIG1hcHBDb2NrcGl0Q29tcG9uZW50cylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgICogYnJvd3NlcyB0aGUgbWV0YSBpbmZvIGZvciBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJyb3dzZU1ldGFJbmZvKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIGNvbXBvbmVudHMgaW4gbW9kZWxcclxuICAgICAgICAgICAgbGV0IG1ldGFJbmZvUmVmZXJlbmNlcyA9IGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmJyb3dzZU1ldGFJbmZvKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuICAgICAgICAgICAgaWYgKG1ldGFJbmZvUmVmZXJlbmNlcykge1xyXG4gICAgICAgICAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGEgPSB0aGlzLnJlYWRNZXRhRGF0YShtZXRhSW5mb1JlZmVyZW5jZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgYXZhaWxhYmxlIGNvbXBvbmVudCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+IHtcclxuICAgICAgICAvLyBVcGRhdGUgY29tcG9uZW50cyBpbiBtb2RlbFxyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMgPSBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5icm93c2VQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgYW5kIHVwZGF0ZSB1c2VyIHBhcmFtZXRlcnNcclxuICAgICAgICBhd2FpdCB0aGlzLnJldHJpZXZlVXNlclBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIGFuZCB1cGRhdGVzIHRoZSBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlTWV0aG9kSW5wdXRQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT4ge1xyXG5cclxuICAgICAgICAvLyBicm93c2UgYW5kIHVwZGF0ZSB0aGUgbWV0aG9kcyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuYnJvd3NlTWV0aG9kUGFyYW1ldGVycyhbbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RdKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLnVwZGF0ZU1ldGhvZFBhcmFtZXRlckRhdGFUeXBlcyhbbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RdKTsgIFxyXG4gICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgY29tcG9uZW50IHBhcmFtZXRlcnMgcmVsZXZhbnQgZm9yIHRoZSB1c2VyLiBUaGV5IGFyZSBzcGVjaWZpZWQgYnkgbWV0YSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZXRyaWV2ZVVzZXJQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCkge1xyXG4gICAgICAgIGxldCB3YXRjaGFibGVNZXRhQ29uZmlnID0gWydNZXRhQ29uZmlnV2F0Y2hhYmxlcycsICdXYXRjaGFibGVzU3RydWN0dXJlJywgJ1dhdGNoYWJsZSddO1xyXG4gICAgICAgIGxldCB3YXRjaGFibGVTdGF0ZU1ldGFDb25maWcgPSBbJ01ldGFDb25maWdXYXRjaGFibGVzU3RhdGVzJywgJ1dhdGNoYWJsZXNTdGF0ZXNTdHJ1Y3R1cmUnLCAnV2F0Y2hhYmxlU3RhdGUnXTtcclxuXHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnQubWVzc2FnZVBhcmFtZXRlcnMgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVNZXNzYWdlUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzKTtcclxuICAgICAgICBpZiAobWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGEpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgaWYgKCBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YS5oYXNPd25Qcm9wZXJ0eShcIlBhcmFtZXRlcnNcIikgJiYgbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdLmhhc093blByb3BlcnR5KFwiV2F0Y2hhYmxlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlV2F0Y2hhYmxlUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzLCB3YXRjaGFibGVNZXRhQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci51cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZXMobWFwcENvY2twaXRDb21wb25lbnQud2F0Y2hhYmxlUGFyYW1ldGVycyk7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXIobWFwcENvY2twaXRDb21wb25lbnQud2F0Y2hhYmxlUGFyYW1ldGVycywgbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdW1wiV2F0Y2hhYmxlXCJdKTsgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICBcclxuICAgXHJcbiAgICAgICAgICAgIGlmICggbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGEuaGFzT3duUHJvcGVydHkoXCJQYXJhbWV0ZXJzXCIpICYmIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhW1wiUGFyYW1ldGVyc1wiXS5oYXNPd25Qcm9wZXJ0eShcIkNvbmZpZ3VyYXRpb25cIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5jb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZUNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcHBDb2NrcGl0Q29tcG9uZW50LmNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci51cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZXMobWFwcENvY2twaXRDb21wb25lbnQuY29uZmlndXJhdGlvblBhcmFtZXRlcnMpOyAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXIobWFwcENvY2twaXRDb21wb25lbnQuY29uZmlndXJhdGlvblBhcmFtZXRlcnMsIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhW1wiUGFyYW1ldGVyc1wiXVtcIkNvbmZpZ3VyYXRpb25cIl0pOyAgICAgXHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhLmhhc093blByb3BlcnR5KFwiUGFyYW1ldGVyc1wiKSAmJiBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YVtcIlBhcmFtZXRlcnNcIl0uaGFzT3duUHJvcGVydHkoXCJXYXRjaGFibGVTdGF0ZVwiKSAmJiBtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LndhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZVdhdGNoYWJsZVN0YXRlcyhtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzLCB3YXRjaGFibGVTdGF0ZU1ldGFDb25maWcpOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogd3JpdGVzIHRoZSB2YWx1ZSB0byBjb21wb25lbnQgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gcGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgd3JpdGVDb21wb25lbnRQYXJhbWV0ZXIocGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLndyaXRlUGFyYW1ldGVyVmFsdWUocGFyYW1ldGVyLCBwYXJhbWV0ZXIudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgY29tcG9uZW50IG1ldGhvZHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlTWV0aG9kcyhtYXBwQ29ja3BpdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10+IHtcclxuICAgICAgICBsZXQgbWV0aG9kc01ldGFDb25maWcgPSBbJ01ldGFDb25maWdDb21tYW5kcycsICdDb21tYW5kc1N0cnVjdHVyZScsICdDb21tYW5kJ107XHJcbiAgICAgICAgbGV0IHF1aWNrQ29tbWFuZHNNZXRhQ29uZmlnID0gWydNZXRhQ29uZmlnUXVpY2tDb21tYW5kcycsICdRdWlja0NvbW1hbmRzU3RydWN0dXJlJywgJ1F1aWNrQ29tbWFuZCddO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgY29tcG9uZW50IG1ldGhvZHMgaW4gbW9kZWxcclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRob2RzID0gYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuYnJvd3NlTWV0aG9kcyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZmlsdGVyIHRoZSBtZXRob2RzIHRvIHRoZSBvbmVzIHNwZWNlZmllZCBieSBtZXRhIGluZm9cclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC51c2VyTWV0aG9kcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5yZXRyaWV2ZUV4ZWN1dGFibGVNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHMsIG1ldGhvZHNNZXRhQ29uZmlnKTtcclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5xdWlja0NvbW1hbmRzID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnJldHJpZXZlUXVpY2tDb21tYW5kcyhtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRob2RzLCBxdWlja0NvbW1hbmRzTWV0YUNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIGZvciB0aGUgc2VydmljZSBjaGFubmVsIGFuZCBjb25uZWN0cyBpdCBpZiBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VTZXJ2aWNlQ2hhbm5lbChtYXBwQ29ja3BpdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZXxudWxsPiB7XHJcblxyXG4gICAgICAgIC8vIGJyb3dzZSB0aGUgc2VydmljZSBjaGFubmVsXHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnQuc2VydmljZUNoYW5uZWwgPSBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5icm93c2VTZXJ2aWNlQ2hhbm5lbChtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIC8vIGluaXRpYWxpemUgc2VydmljZSBjaGFubmVsICBpZiBhdmFpbGFibGUuXHJcbiAgICAgICAgaWYgKG1hcHBDb2NrcGl0Q29tcG9uZW50LnNlcnZpY2VDaGFubmVsKSB7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcmVxdWVzdCBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5icm93c2VNZXRob2RJbnB1dFBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQuc2VydmljZUNoYW5uZWw/LnJlcXVlc3QhKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXBwQ29ja3BpdENvbXBvbmVudC5zZXJ2aWNlQ2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnQuc2VydmljZUNoYW5uZWwuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50LnNlcnZpY2VDaGFubmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHRoZSBtZXRob2RzIHJlbGV2YW50IGZvciB0aGUgdXNlci4gVGhleSBhcmUgc3BlY2lmaWVkIGJ5IG1ldGEgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHBhcmFtIHsqfSBjb21wb25lbnRNZXRob2RzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXRyaWV2ZVVzZXJNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCwgY29tcG9uZW50TWV0aG9kczogYW55KTogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSB7XHJcbiAgICAgICAgbGV0IHVzZXJNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdID0gW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhICYmICBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YS5oYXNPd25Qcm9wZXJ0eShcIk1ldGhvZHNcIikgJiYgbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGFbXCJNZXRob2RzXCJdLmhhc093blByb3BlcnR5KFwiRXhlY3V0YWJsZVwiKSkge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kc01ldGEgPSBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YVtcIk1ldGhvZHNcIl1bXCJFeGVjdXRhYmxlXCJdO1xyXG4gICAgICAgICAgICB1c2VyTWV0aG9kcyA9IGNvbXBvbmVudE1ldGhvZHMuZmlsdGVyKChtZXRob2QpID0+IHsgcmV0dXJuIG1ldGhvZHNNZXRhW21ldGhvZC5icm93c2VOYW1lXTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1c2VyTWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIHRoZSBtZXRhIGluZm9zIGludG8gYSBzaW5nbGUgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gbWV0YVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkTWV0YURhdGEobWV0YVBhcmFtZXRlcnM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBsZXQgbWV0YURhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbWV0YVBhcmFtZXRlcnMuZm9yRWFjaCgobWV0YVBhcmFtZXRlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihtZXRhUGFyYW1ldGVyLnZhbHVlID09IFwiXCIpeyAvLyBGYWxsYmFjazogVXNlIGVtcHR5IG9iamVjdCBpbiBjYXNlIG9mIGVtcHR5IG1ldGFJbmZvXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0YVBhcmFtZXRlci52YWx1ZSA9IFwie31cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9KdXN0IGZvciBwcm90b3R5cGU6IEVuYWJsZS9EaXNhYmxlIG9mIG1ldGhvZHNcclxuICAgICAgICAgICAgICAgIC8vIGlmIChtZXRhUGFyYW1ldGVyLm5vZGVJZCA9PSBcIm5zPTU7cz1nQXhpczEuTWV0YUNvbmZpZ0NvbW1hbmRzXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBtZXRhUGFyYW1ldGVyLnZhbHVlID0gJ3tcIkNvbW1hbmRzU3RydWN0dXJlXCI6e1wiU2NvcGVcIjpcIm1hcHAvTW90aW9uL0F4aXMvQWNwQXhpc1wiLFwiQ2hpbGRzXCI6W3tcIkdyb3VwXCI6e1wiRGlzcGxheU5hbWVcIjpcIlByZXBhcmF0aW9uXCIsXCJDaGlsZHNcIjpbe1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJQb3dlciBvblwiLFwiUmVmXCI6XCJQb3dlciBPblwiLFwiV2F0Y2hhYmxlVmFyaWFibGVzTWFwcGluZ1wiOltbXCJJcyBQb3dlcmVkXCIsXCJJc19Qb3dlcmVkXCJdXSxcIkVuYWJsZVN0YXRlRXhwcmVzc2lvblwiOlwiSXNfUG93ZXJlZCA9PSBmYWxzZSA/IHRydWUgOiBmYWxzZVwifX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJQb3dlciBvZmZcIixcIlJlZlwiOlwiUG93ZXIgT2ZmXCIsXCJXYXRjaGFibGVWYXJpYWJsZXNNYXBwaW5nXCI6W1tcIklzIFBvd2VyZWRcIixcIklzX1Bvd2VyZWRcIl1dLFwiRW5hYmxlU3RhdGVFeHByZXNzaW9uXCI6XCJJc19Qb3dlcmVkID09IHRydWUgPyB0cnVlIDogZmFsc2VcIn19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSW5pdCBob21lXCIsXCJSZWZcIjpcIkluaXQgSG9tZVwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSG9taW5nIG1vZGVcIixcIlJlZlwiOlwiSG9taW5nIE1vZGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6SW5pdEhvbWVSZWR1Y2VkXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlBvc2l0aW9uXCIsXCJSZWZcIjpcIlBvc2l0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU3RhcnQgdmVsb2NpdHlcIixcIlJlZlwiOlwiU3RhcnQgVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkhvbWluZyB2ZWxvY2l0eVwiLFwiUmVmXCI6XCJIb21pbmcgVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU3dpdGNoIGVkZ2VcIixcIlJlZlwiOlwiU3dpdGNoRWRnZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OkluaXRIb21lRGlyZWN0aW9uXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlN0YXJ0IGRpcmVjdGlvblwiLFwiUmVmXCI6XCJTdGFydCBEaXJlY3Rpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpJbml0SG9tZURpcmVjdGlvblwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJIb21pbmcgZGlyZWN0aW9uXCIsXCJSZWZcIjpcIkhvbWluZyBEaXJlY3Rpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpJbml0SG9tZURpcmVjdGlvblwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJSZWZlcmVuY2UgcHVsc2VcIixcIlJlZlwiOlwiUmVmZXJlbmNlIFB1bHNlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6U3dpdGNoXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIktlZXAgZGlyZWN0aW9uXCIsXCJSZWZcIjpcIktlZXAgRGlyZWN0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6U3dpdGNoXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlJlZmVyZW5jZSBwdWxzZSBibG9ja2luZyBkaXN0YW5jZVwiLFwiUmVmXCI6XCJSZWZlcmVuY2UgUHVsc2UgQmxvY2tpbmcgRGlzdGFuY2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJUb3JxdWUgbGltaXRcIixcIlJlZlwiOlwiVG9ycXVlIExpbWl0XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIk7Ct21cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJCbG9jayBkZXRlY3Rpb24gcG9zaXRpb24gZXJyb3JcIixcIlJlZlwiOlwiQmxvY2sgRGV0ZWN0aW9uIFBvc2l0aW9uIEVycm9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUG9zaXRpb24gZXJyb3Igc3RvcCBsaW1pdFwiLFwiUmVmXCI6XCJQb3NpdGlvbiBFcnJvciBTdG9wIExpbWl0XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkhvbWVcIixcIlJlZlwiOlwiSG9tZVwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUG9zaXRpb25cIixcIlJlZlwiOlwiUG9zaXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJIb21pbmcgbW9kZVwiLFwiUmVmXCI6XCJIb21pbmcgTW9kZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxNDBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkhvbWluZ1JlZHVjZWRcIn19fV19fV19fSx7XCJHcm91cFwiOntcIkRpc3BsYXlOYW1lXCI6XCJBZG1pbmlzdHJhdGlvblwiLFwiQ2hpbGRzXCI6W3tcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUmVzZXRcIixcIlJlZlwiOlwiUmVzZXRcIn19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2V0IG92ZXJyaWRlXCIsXCJSZWZcIjpcIlNldCBPdmVycmlkZVwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmVsb2NpdHkgZmFjdG9yXCIsXCJSZWZcIjpcIlZlbG9jaXR5IEZhY3RvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxLjBcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb24gZmFjdG9yXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvbiBGYWN0b3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMS4wXCJ9fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkNvbW1hbmQgZXJyb3JcIixcIlJlZlwiOlwiQ29tbWFuZEVycm9yXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJDb21tYW5kXCIsXCJSZWZcIjpcIkNvbW1hbmRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpDb21tYW5kRXJyb3JzXCJ9fX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJSZWFkIFBhcklEXCIsXCJSZWZcIjpcIlJlYWQgUGFySWRcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlBhcklEXCIsXCJSZWZcIjpcIlBhcklkXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiV3JpdGUgUGFySURcIixcIlJlZlwiOlwiV3JpdGUgUGFySWRcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlBhcklEXCIsXCJSZWZcIjpcIlBhcklkXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWYWx1ZVwiLFwiUmVmXCI6XCJWYWx1ZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCJ9fV19fV19fSx7XCJHcm91cFwiOntcIkRpc3BsYXlOYW1lXCI6XCJNb3ZlbWVudFwiLFwiQ2hpbGRzXCI6W3tcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTW92ZSBhYnNvbHV0ZVwiLFwiUmVmXCI6XCJNb3ZlIEFic29sdXRlXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJQb3NpdGlvblwiLFwiUmVmXCI6XCJQb3NpdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZlbG9jaXR5XCIsXCJSZWZcIjpcIlZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjJcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRlY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJEZWNlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMTBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEaXJlY3Rpb25cIixcIlJlZlwiOlwiRGlyZWN0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6TW92ZUFic0RpcmVjdGlvblwifX19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTW92ZSBhZGRpdGl2ZVwiLFwiUmVmXCI6XCJNb3ZlIEFkZGl0aXZlXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEaXN0YW5jZVwiLFwiUmVmXCI6XCJEaXN0YW5jZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZlbG9jaXR5XCIsXCJSZWZcIjpcIlZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjJcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRlY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJEZWNlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMTBcIixcIkVVXCI6XCJtbS9zwrJcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTW92ZSB2ZWxvY2l0eVwiLFwiUmVmXCI6XCJNb3ZlIFZlbG9jaXR5XCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWZWxvY2l0eVwiLFwiUmVmXCI6XCJWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIyXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMTBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJEZWNlbGVyYXRpb25cIixcIlJlZlwiOlwiRGVjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEwXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGlyZWN0aW9uXCIsXCJSZWZcIjpcIkRpcmVjdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6Ok1vdmVWZWxvRGlyZWN0aW9uXCJ9fX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJHZWFyIGluXCIsXCJSZWZcIjpcIkdlYXIgSW5cIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1hc3RlclwiLFwiUmVmXCI6XCJNYXN0ZXJcIixcIkRlZmF1bHRWYWx1ZVwiOlwiXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUmF0aW8gbnVtZXJhdG9yXCIsXCJSZWZcIjpcIlJhdGlvIE51bWVyYXRvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJSYXRpbyBkZW5vbWluYXRvclwiLFwiUmVmXCI6XCJSYXRpbyBEZW5vbWluYXRvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXN0ZXIgdmFsdWUgc291cmNlXCIsXCJSZWZcIjpcIk1hc3RlciBWYWx1ZSBTb3VyY2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpWYWx1ZVNvdXJjZVwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb25cIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRlY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJEZWNlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWFzdGVyIG1heCB2ZWxvY2l0eVwiLFwiUmVmXCI6XCJNYXN0ZXIgTWF4IFZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3NcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQ2FtIGluXCIsXCJSZWZcIjpcIkNhbUluXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXN0ZXJcIixcIlJlZlwiOlwiTWFzdGVyXCIsXCJEZWZhdWx0VmFsdWVcIjpcIlwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1hc3RlciBvZmZzZXRcIixcIlJlZlwiOlwiTWFzdGVyT2Zmc2V0XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTbGF2ZSBvZmZzZXRcIixcIlJlZlwiOlwiU2xhdmVPZmZzZXRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1hc3RlciBzY2FsaW5nXCIsXCJSZWZcIjpcIk1hc3RlclNjYWxpbmdcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNsYXZlIHNjYWxpbmdcIixcIlJlZlwiOlwiU2xhdmVTY2FsaW5nXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTdGFydCBtb2RlXCIsXCJSZWZcIjpcIlN0YXJ0TW9kZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkF4aXM6OkNhbVN0YXJ0TW9kZVwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXN0ZXIgdmFsdWUgc291cmNlXCIsXCJSZWZcIjpcIk1hc3RlclZhbHVlU291cmNlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6VmFsdWVTb3VyY2VDYW1JblwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJDYW0gSURcIixcIlJlZlwiOlwiQ2FtSURcIixcIkRlZmF1bHRWYWx1ZVwiOlwiNjU1MzVcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJQZXJpb2RpY1wiLFwiUmVmXCI6XCJQZXJpb2RpY1wiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmVsb2NpdHlcIixcIlJlZlwiOlwiVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGVjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkRlY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zwrJcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVG9ycXVlIGNvbnRyb2xcIixcIlJlZlwiOlwiVG9ycXVlIENvbnRyb2xcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlRvcnF1ZVwiLFwiUmVmXCI6XCJUb3JxdWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiTsK3bVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlRvcnF1ZSByYW1wXCIsXCJSZWZcIjpcIlRvcnF1ZSBSYW1wXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIk7Ct20vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZlbG9jaXR5XCIsXCJSZWZcIjpcIlZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb25cIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3PCslwifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJCcmFrZSBvcGVyYXRpb25cIixcIlJlZlwiOlwiQnJha2UgT3BlcmF0aW9uXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJDb21tYW5kXCIsXCJSZWZcIjpcIkNvbW1hbmRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpCcmFrZUNvbW1hbmRcIn19fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkhhbHRcIixcIlJlZlwiOlwiSGFsdFwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGVjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkRlY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxMFwiLFwiRVVcIjpcIm1tL3PCslwifX1dfX1dfX0se1wiR3JvdXBcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTG9hZCBzaW11bGF0aW9uXCIsXCJDaGlsZHNcIjpbe1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJMb2FkIHNpbXVsYXRpb24gY29tbWFuZFwiLFwiUmVmXCI6XCJMb2FkIFNpbXVsYXRpb24gQ29tbWFuZFwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQ29tbWFuZFwiLFwiUmVmXCI6XCJDb21tYW5kXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQXhpczo6U2ltdWxhdGlvbkNvbW1hbmRcIn19fV19fSx7XCJDb21tYW5kXCI6e1wiRGlzcGxheU5hbWVcIjpcIkxvYWQgc2ltdWxhdGlvbiBzZXQgcGFyYW1zIGF1dG9cIixcIlJlZlwiOlwiTG9hZCBTaW11bGF0aW9uIFNldCBQYXJhbXMgQXV0b1wiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWRkaXRpdmUgbG9hZCBQYXJJRFwiLFwiUmVmXCI6XCJBZGRpdGl2ZSBMb2FkIFBhcklkXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTG9hZCBzaW11bGF0aW9uIHNldCBwYXJhbXMgb25lIG1hc3NcIixcIlJlZlwiOlwiTG9hZCBTaW11bGF0aW9uIFNldCBQYXJhbXMgT25lIE1hc3NcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFkZGl0aXZlIGxvYWQgUGFySURcIixcIlJlZlwiOlwiQWRkaXRpdmUgTG9hZCBQYXJJZFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSW5lcnRpYVwiLFwiUmVmXCI6XCJJbmVydGlhXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcImtnwrdtwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTdGF0aWMgZnJpY3Rpb25cIixcIlJlZlwiOlwiU3RhdGljIEZyaWN0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIk7Ct21cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWaXNjb3VzIGZyaWN0aW9uXCIsXCJSZWZcIjpcIlZpc2NvdXMgRnJpY3Rpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiTsK3bcK3c1wifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJMb2FkIHNpbXVsYXRpb24gc2V0IHBhcmFtcyB0d28gbWFzc2VzXCIsXCJSZWZcIjpcIkxvYWQgU2ltdWxhdGlvbiBTZXQgUGFyYW1zIFR3byBNYXNzZXNcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFkZGl0aXZlIGxvYWQgUGFySURcIixcIlJlZlwiOlwiQWRkaXRpdmUgTG9hZCBQYXJJZFwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSW5lcnRpYSBNMVwiLFwiUmVmXCI6XCJJbmVydGlhIE0xXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcImtnwrdtwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTdGF0aWMgZnJpY3Rpb24gTTFcIixcIlJlZlwiOlwiU3RhdGljIEZyaWN0aW9uIE0xXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIk7Ct21cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWaXNjb3VzIGZyaWN0aW9uIE0xXCIsXCJSZWZcIjpcIlZpc2NvdXMgRnJpY3Rpb24gTTFcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiTsK3bcK3c1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkluZXJ0aWEgTTJcIixcIlJlZlwiOlwiSW5lcnRpYSBNMlwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJrZ8K3bcKyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU3RhdGljIGZyaWN0aW9uIE0yXCIsXCJSZWZcIjpcIlN0YXRpYyBGcmljdGlvbiBNMlwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJOwrdtXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmlzY291cyBmcmljdGlvbiBNMlwiLFwiUmVmXCI6XCJWaXNjb3VzIEZyaWN0aW9uIE0yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIk7Ct23Ct3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTdGlmZm5lc3NcIixcIlJlZlwiOlwiU3RpZmZuZXNzXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIk7Ct20vcmFkXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGFtcGluZ1wiLFwiUmVmXCI6XCJEYW1waW5nXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIk7Ct23Ct3MvcmFkXCJ9fV19fV19fSx7XCJHcm91cFwiOntcIkRpc3BsYXlOYW1lXCI6XCJBdXRvVHVuZVwiLFwiQ2hpbGRzXCI6W3tcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQXV0b3R1bmUgcG9zaXRpb24gY29udHJvbGxlclwiLFwiUmVmXCI6XCJBdXRvIFR1bmUgUG9zaXRpb24gQ29udHJvbGxlclwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiT3JpZW50YXRpb25cIixcIlJlZlwiOlwiT3JpZW50YXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ09yaWVudGF0aW9uXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBjdXJyZW50IHBlcmNlbnRcIixcIlJlZlwiOlwiTWF4IEN1cnJlbnQgUGVyY2VudFwiLFwiRGVmYXVsdFZhbHVlXCI6XCI1MFwiLFwiRVVcIjpcIiVcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggZGlzdGFuY2VcIixcIlJlZlwiOlwiTWF4IERpc3RhbmNlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IHBvc2l0aW9uIGVycm9yXCIsXCJSZWZcIjpcIk1heCBQb3NpdGlvbiBFcnJvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk9wZXJhdGluZyBwb2ludFwiLFwiUmVmXCI6XCJPcGVyYXRpbmcgUG9pbnRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ09wZXJhdGlvblBvaW50XCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlZlbG9jaXR5XCIsXCJSZWZcIjpcIlZlbG9jaXR5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3NcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJBY2NlbGVyYXRpb25cIixcIlJlZlwiOlwiQWNjZWxlcmF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tL3PCslwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBwcm9wb3J0aW9uYWwgZ2FpblwiLFwiUmVmXCI6XCJNYXggUHJvcG9ydGlvbmFsIEdhaW5cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMjAwMC4wXCIsXCJFVVwiOlwiQXNcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJQcm9wb3J0aW9uYWwgZ2FpbiBwZXJjZW50XCIsXCJSZWZcIjpcIlByb3BvcnRpb25hbCBHYWluIFBlcmNlbnRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMTAwLjBcIixcIkVVXCI6XCIlXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHR5cGVcIixcIlJlZlwiOlwiU2lnbmFsIFR5cGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ0V4Y2l0YXRpb25TaWduYWxcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIG9yZGVyXCIsXCJSZWZcIjpcIlNpZ25hbCBPcmRlclwiLFwiRGVmYXVsdFZhbHVlXCI6XCI5XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGVsYXkgdGltZVwiLFwiUmVmXCI6XCJEZWxheSBUaW1lXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcInNcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgc3RhcnQgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIlNpZ25hbCBTdGFydCBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgc3RvcCBmcmVxdWVuY3lcIixcIlJlZlwiOlwiU2lnbmFsIFN0b3AgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHRpbWVcIixcIlJlZlwiOlwiU2lnbmFsIFRpbWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwic1wifX1dfX0se1wiQ29tbWFuZFwiOntcIkRpc3BsYXlOYW1lXCI6XCJBdXRvdHVuZSBzcGVlZCBjb250cm9sbGVyXCIsXCJSZWZcIjpcIkF1dG8gVHVuZSBTcGVlZCBDb250cm9sbGVyXCIsXCJQYXJhbWV0ZXJzXCI6W3tcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJPcmllbnRhdGlvblwiLFwiUmVmXCI6XCJPcmllbnRhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nT3JpZW50YXRpb25cIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IGN1cnJlbnQgcGVyY2VudFwiLFwiUmVmXCI6XCJNYXggQ3VycmVudCBQZXJjZW50XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjUwXCIsXCJFVVwiOlwiJVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBkaXN0YW5jZVwiLFwiUmVmXCI6XCJNYXggRGlzdGFuY2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggcG9zaXRpb24gZXJyb3JcIixcIlJlZlwiOlwiTWF4IFBvc2l0aW9uIEVycm9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTG9vcCBmaWx0ZXIxIG1vZGVcIixcIlJlZlwiOlwiTG9vcCBGaWx0ZXIxIE1vZGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ0xvb3BGaWx0ZXJNb2RlXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkZpbHRlciB0aW1lIG1vZGVcIixcIlJlZlwiOlwiRmlsdGVyIFRpbWUgTW9kZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nRmlsdGVyVGltZU1vZGVcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSW50ZWdyYXRpb24gdGltZSBtb2RlXCIsXCJSZWZcIjpcIkludGVncmF0aW9uIFRpbWUgTW9kZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nSW50ZWdyYXRpb25UaW1lTW9kZVwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJPcGVyYXRpbmcgcG9pbnRcIixcIlJlZlwiOlwiT3BlcmF0aW5nIFBvaW50XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdPcGVyYXRpb25Qb2ludFwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWZWxvY2l0eVwiLFwiUmVmXCI6XCJWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggcHJvcG9ydGlvbmFsIGdhaW5cIixcIlJlZlwiOlwiTWF4IFByb3BvcnRpb25hbCBHYWluXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjIwMDAuMFwiLFwiRVVcIjpcIkFzXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiUHJvcG9ydGlvbmFsIGdhaW4gcGVyY2VudFwiLFwiUmVmXCI6XCJQcm9wb3J0aW9uYWwgR2FpbiBQZXJjZW50XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjEwMC4wXCIsXCJFVVwiOlwiJVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlJlc29uYW5jZSBmYWN0b3JcIixcIlJlZlwiOlwiUmVzb25hbmNlIEZhY3RvclwiLFwiRGVmYXVsdFZhbHVlXCI6XCIyLjBcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJJbmVydGlhIGVzdGltYXRpb24gbG93ZXIgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIkluZXJ0aWEgRXN0aW1hdGlvbiBMb3dlciBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMTAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiSW5lcnRpYSBlc3RpbWF0aW9uIHVwcGVyIGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJJbmVydGlhIEVzdGltYXRpb24gVXBwZXIgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjQwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCB0eXBlXCIsXCJSZWZcIjpcIlNpZ25hbCBUeXBlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdFeGNpdGF0aW9uU2lnbmFsXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBvcmRlclwiLFwiUmVmXCI6XCJTaWduYWwgT3JkZXJcIixcIkRlZmF1bHRWYWx1ZVwiOlwiOVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRlbGF5IHRpbWVcIixcIlJlZlwiOlwiRGVsYXkgVGltZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJzXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHN0YXJ0IGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJTaWduYWwgU3RhcnQgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHN0b3AgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIlNpZ25hbCBTdG9wIEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCB0aW1lXCIsXCJSZWZcIjpcIlNpZ25hbCBUaW1lXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcInNcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQXV0b3R1bmUgZmVlZCBmb3J3YXJkXCIsXCJSZWZcIjpcIkF1dG8gVHVuZSBGZWVkIEZvcndhcmRcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRpcmVjdGlvblwiLFwiUmVmXCI6XCJEaXJlY3Rpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBeGlzOjpEaXJlY3Rpb25cIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiT3JpZW50YXRpb25cIixcIlJlZlwiOlwiT3JpZW50YXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ09yaWVudGF0aW9uXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBkaXN0YW5jZVwiLFwiUmVmXCI6XCJNYXggRGlzdGFuY2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggcG9zaXRpb24gZXJyb3JcIixcIlJlZlwiOlwiTWF4IFBvc2l0aW9uIEVycm9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiVmVsb2NpdHlcIixcIlJlZlwiOlwiVmVsb2NpdHlcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc1wifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkFjY2VsZXJhdGlvblwiLFwiUmVmXCI6XCJBY2NlbGVyYXRpb25cIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW0vc8KyXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IGN1cnJlbnQgcGVyY2VudGFnZVwiLFwiUmVmXCI6XCJNYXggQ3VycmVudCBQZXJjZW50YWdlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjUwXCIsXCJFVVwiOlwiJVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCB2ZWxvY2l0eSBwZXJjZW50YWdlXCIsXCJSZWZcIjpcIk1heCBWZWxvY2l0eSBQZXJjZW50YWdlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjUwXCIsXCJFVVwiOlwiJVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCB0eXBlXCIsXCJSZWZcIjpcIlNpZ25hbCBUeXBlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdFeGNpdGF0aW9uU2lnbmFsXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBvcmRlclwiLFwiUmVmXCI6XCJTaWduYWwgT3JkZXJcIixcIkRlZmF1bHRWYWx1ZVwiOlwiOVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRlbGF5IHRpbWVcIixcIlJlZlwiOlwiRGVsYXkgVGltZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJzXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHN0YXJ0IGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJTaWduYWwgU3RhcnQgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHN0b3AgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIlNpZ25hbCBTdG9wIEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCB0aW1lXCIsXCJSZWZcIjpcIlNpZ25hbCBUaW1lXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcInNcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQXV0b3R1bmUgbG9vcCBmaWx0ZXJzXCIsXCJSZWZcIjpcIkF1dG8gVHVuZSBMb29wIEZpbHRlcnNcIixcIlBhcmFtZXRlcnNcIjpbe1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkxvb3AgZmlsdGVyIDEgbW9kZVwiLFwiUmVmXCI6XCJMb29wIEZpbHRlcjEgTW9kZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIxXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nTG9vcEZpbHRlck1vZGVcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTG9vcCBmaWx0ZXIgMiBtb2RlXCIsXCJSZWZcIjpcIkxvb3AgRmlsdGVyMiBNb2RlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdMb29wRmlsdGVyTW9kZVwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJMb29wIGZpbHRlciAzIG1vZGVcIixcIlJlZlwiOlwiTG9vcCBGaWx0ZXIzIE1vZGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ0xvb3BGaWx0ZXJNb2RlXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk9yaWVudGF0aW9uXCIsXCJSZWZcIjpcIk9yaWVudGF0aW9uXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdPcmllbnRhdGlvblwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggY3VycmVudCBwZXJjZW50XCIsXCJSZWZcIjpcIk1heCBDdXJyZW50IFBlcmNlbnRcIixcIkRlZmF1bHRWYWx1ZVwiOlwiNTBcIixcIkVVXCI6XCIlXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IGRpc3RhbmNlXCIsXCJSZWZcIjpcIk1heCBEaXN0YW5jZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBwb3NpdGlvbiBlcnJvclwiLFwiUmVmXCI6XCJNYXggUG9zaXRpb24gRXJyb3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJPcGVyYXRpbmcgcG9pbnRcIixcIlJlZlwiOlwiT3BlcmF0aW5nIFBvaW50XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdPcGVyYXRpb25Qb2ludFwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJWZWxvY2l0eVwiLFwiUmVmXCI6XCJWZWxvY2l0eVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQWNjZWxlcmF0aW9uXCIsXCJSZWZcIjpcIkFjY2VsZXJhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJtbS9zwrJcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJSZXNvbmFuY2UgZmFjdG9yXCIsXCJSZWZcIjpcIlJlc29uYW5jZSBGYWN0b3JcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMlwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCB0eXBlXCIsXCJSZWZcIjpcIlNpZ25hbCBUeXBlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdFeGNpdGF0aW9uU2lnbmFsXCJ9fX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCBvcmRlclwiLFwiUmVmXCI6XCJTaWduYWwgT3JkZXJcIixcIkRlZmF1bHRWYWx1ZVwiOlwiOVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIkRlbGF5IHRpbWVcIixcIlJlZlwiOlwiRGVsYXkgVGltZVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJzXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHN0YXJ0IGZyZXF1ZW5jeVwiLFwiUmVmXCI6XCJTaWduYWwgU3RhcnQgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHN0b3AgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIlNpZ25hbCBTdG9wIEZyZXF1ZW5jeVwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwLjBcIixcIkVVXCI6XCJIelwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIlNpZ25hbCB0aW1lXCIsXCJSZWZcIjpcIlNpZ25hbCBUaW1lXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcInNcIn19XX19LHtcIkNvbW1hbmRcIjp7XCJEaXNwbGF5TmFtZVwiOlwiQXV0b3R1bmUgdGVzdFwiLFwiUmVmXCI6XCJBdXRvIFR1bmUgVGVzdFwiLFwiUGFyYW1ldGVyc1wiOlt7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTW9kZVwiLFwiUmVmXCI6XCJNb2RlXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjBcIixcIlR5cGVEZWZcIjp7XCJFbnVtVHlwZVJlZlwiOlwiQWNwQXg6OkF1dG9UdW5pbmdUZXN0TW9kZVwifX19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJPcmllbnRhdGlvblwiLFwiUmVmXCI6XCJPcmllbnRhdGlvblwiLFwiRGVmYXVsdFZhbHVlXCI6XCIwXCIsXCJUeXBlRGVmXCI6e1wiRW51bVR5cGVSZWZcIjpcIkFjcEF4OjpBdXRvVHVuaW5nT3JpZW50YXRpb25cIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWF4IGN1cnJlbnQgcGVyY2VudFwiLFwiUmVmXCI6XCJNYXggQ3VycmVudCBQZXJjZW50XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjUwXCIsXCJFVVwiOlwiJVwifX0se1wiUGFyYW1ldGVyXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1heCBkaXN0YW5jZVwiLFwiUmVmXCI6XCJNYXggRGlzdGFuY2VcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwibW1cIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYXggcG9zaXRpb24gZXJyb3JcIixcIlJlZlwiOlwiTWF4IFBvc2l0aW9uIEVycm9yXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIm1tXCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHR5cGVcIixcIlJlZlwiOlwiU2lnbmFsIFR5cGVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMFwiLFwiVHlwZURlZlwiOntcIkVudW1UeXBlUmVmXCI6XCJBY3BBeDo6QXV0b1R1bmluZ0V4Y2l0YXRpb25TaWduYWxcIn19fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIG9yZGVyXCIsXCJSZWZcIjpcIlNpZ25hbCBPcmRlclwiLFwiRGVmYXVsdFZhbHVlXCI6XCI5XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiRGVsYXkgdGltZVwiLFwiUmVmXCI6XCJEZWxheSBUaW1lXCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcInNcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgc3RhcnQgZnJlcXVlbmN5XCIsXCJSZWZcIjpcIlNpZ25hbCBTdGFydCBGcmVxdWVuY3lcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwiSHpcIn19LHtcIlBhcmFtZXRlclwiOntcIkRpc3BsYXlOYW1lXCI6XCJTaWduYWwgc3RvcCBmcmVxdWVuY3lcIixcIlJlZlwiOlwiU2lnbmFsIFN0b3AgRnJlcXVlbmN5XCIsXCJEZWZhdWx0VmFsdWVcIjpcIjAuMFwiLFwiRVVcIjpcIkh6XCJ9fSx7XCJQYXJhbWV0ZXJcIjp7XCJEaXNwbGF5TmFtZVwiOlwiU2lnbmFsIHRpbWVcIixcIlJlZlwiOlwiU2lnbmFsIFRpbWVcIixcIkRlZmF1bHRWYWx1ZVwiOlwiMC4wXCIsXCJFVVwiOlwic1wifX1dfX1dfX1dfX0nXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBtZXRhRGF0YVttZXRhUGFyYW1ldGVyLmJyb3dzZU5hbWVdID0gSlNPTi5wYXJzZShtZXRhUGFyYW1ldGVyLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0p1c3QgZm9yIHByb3RvdHlwZTogd2F0Y2hhYmxlSWNvbnNcclxuICAgICAgICAgICAgICAgIC8vdmFyIHdhdGNoc3RhdGVNZXRhRGF0YSA9ICd7XCJXYXRjaGFibGVzU3RhdGVzU3RydWN0dXJlXCI6e1wiU2NvcGVcIjpcIm1hcHAvTW90aW9uL0F4aXMvQWNwQXhpc1wiLFwiQ2hpbGRzXCI6W3tcIkdyb3VwXCI6e1wiRGlzcGxheU5hbWVcIjpcIk1haW5cIixcIkNoaWxkc1wiOlt7XCJXYXRjaGFibGVTdGF0ZVwiOntcIlJlZlwiOlwiQXhpc19zdGF0ZVwiLFwiV2F0Y2hhYmxlVmFyaWFibGVzTWFwcGluZ1wiOltbXCJDb21tdW5pY2F0aW9uIFJlYWR5XCIsXCJDb21tdW5pY2F0aW9uXCJdLFtcIlBsY09wZW4gU3RhdGVcIixcIlBMQ19TdGF0ZVwiXV0sXCJJY29uRXhwcmVzc2lvblwiOlwiQ29tbXVuaWNhdGlvbiA9PSBmYWxzZSA/IDEgOiBQTENfU3RhdGUgPT0gMSA/IDIgOiBQTENfU3RhdGUgPT0gMiA/IDMgOiBQTENfU3RhdGUgPT0gMyBvciBQTENfU3RhdGUgPT0gNCBvciBQTENfU3RhdGUgPT0gNSA/IDQgOiBQTENfU3RhdGUgPT0gNiA/IDUgOiBQTENfU3RhdGUgPT0gNyA/IDYgOiAwXCIsXCJJY29uXCI6e1wiMFwiOntcIkltYWdlTmFtZVwiOlwiR2VhckRpc2FibGVkXCIsXCJUb29sdGlwXCI6XCJBeGlzIGlzIGRpc2FibGVkXCJ9LFwiMVwiOntcIkltYWdlTmFtZVwiOlwiQ29tbXVuaWNhdGlvbk5vdFJlYWR5XCIsXCJUb29sdGlwXCI6XCJDb21tdW5pY2F0aW9uIGlzIG5vdCByZWFkeVwifSxcIjJcIjp7XCJJbWFnZU5hbWVcIjpcIkdlYXJFbmFibGVkXCIsXCJUb29sdGlwXCI6XCJBeGlzIGlzIHN0YW5kc3RpbGxcIn0sXCIzXCI6e1wiSW1hZ2VOYW1lXCI6XCJHZW5lcmFsRXJyb3JcIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgaW4gZXJyb3Igc3RhdGVcIn0sXCI0XCI6e1wiSW1hZ2VOYW1lXCI6XCJHZWFyUm90YXRpbmdcIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgbW92aW5nXCJ9LFwiNVwiOntcIkltYWdlTmFtZVwiOlwiR2VhcnNSb3RhdGluZ1wiLFwiVG9vbHRpcFwiOlwiQXhpcyBpcyBzeW5jaHJvbml6ZWRcIn19fX0se1wiV2F0Y2hhYmxlU3RhdGVcIjp7XCJSZWZcIjpcIkNvbnRyb2xsZXJfc3RhdGVcIixcIldhdGNoYWJsZVZhcmlhYmxlc01hcHBpbmdcIjpbW1wiSXMgUG93ZXJlZFwiLFwiSXNfUG93ZXJlZFwiXV0sXCJJY29uRXhwcmVzc2lvblwiOlwiSXNfUG93ZXJlZCA9PSB0cnVlID8gMSA6IDBcIixcIkljb25cIjp7XCIwXCI6e1wiSW1hZ2VOYW1lXCI6XCJPZmZcIixcIlRvb2x0aXBcIjpcIkNvbnRyb2xsZXIgaXMgc3dpdGNoZWQgb2ZmXCJ9LFwiMVwiOntcIkltYWdlTmFtZVwiOlwiT25cIixcIlRvb2x0aXBcIjpcIkNvbnRyb2xsZXIgaXMgc3dpdGNoZWQgb25cIn19fX0se1wiV2F0Y2hhYmxlU3RhdGVcIjp7XCJSZWZcIjpcIkF4aXNfcmVmZXJlbmNlX3N0YXRlXCIsXCJXYXRjaGFibGVWYXJpYWJsZXNNYXBwaW5nXCI6W1tcIklzIEhvbWVkXCIsXCJJc19Ib21lZFwiXSxbXCJQbGNPcGVuIFN0YXRlXCIsXCJQTENfU3RhdGVcIl1dLFwiSWNvbkV4cHJlc3Npb25cIjpcIklzX0hvbWVkID09IHRydWUgPyAxIDogUExDX1N0YXRlID09IDcgPyAyOiAwXCIsXCJJY29uXCI6e1wiMFwiOntcIkltYWdlTmFtZVwiOlwiVW5rb3duUG9zaXRpb25cIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgbm90IGhvbWVkXCJ9LFwiMVwiOntcIkltYWdlTmFtZVwiOlwiS25vd25Qb3NpdGlvblwiLFwiVG9vbHRpcFwiOlwiQXhpcyBpcyBob21lZFwifSxcIjJcIjp7XCJJbWFnZU5hbWVcIjpcIkZpbmRpbmdQb3NpdGlvblwiLFwiVG9vbHRpcFwiOlwiQXhpcyBpcyBob21pbmdcIn19fX1dfX1dfX0nOyBcclxuICAgICAgICAgICAgICAgIC8vbWV0YURhdGFbJ01ldGFDb25maWdXYXRjaGFibGVzU3RhdGVzJ10gPSBKU09OLnBhcnNlKHdhdGNoc3RhdGVNZXRhRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9KdXN0IGZvciBwcm90b3R5cGU6IHF1aWNrQ29tbWFuZHNcclxuICAgICAgICAgICAgICAgIC8vIHZhciBxdWlja01ldGhvZCA9ICcge1wiUXVpY2tDb21tYW5kc1N0cnVjdHVyZVwiOntcIlNjb3BlXCI6XCJtYXBwL01vdGlvbi9BeGlzL0FjcEF4aXNcIixcIkNoaWxkc1wiOlt7XCJHcm91cFwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYWluXCIsXCJDaGlsZHNcIjpbe1wiUXVpY2tDb21tYW5kXCI6e1wiUmVmXCI6XCJQb3dlciBPblwiLFwiVG9vbHRpcFwiOlwiUG93ZXIgb25cIixcIkltYWdlTmFtZVwiOlwiT25cIn19LHtcIlF1aWNrQ29tbWFuZFwiOntcIlJlZlwiOlwiUG93ZXIgT2ZmXCIsXCJUb29sdGlwXCI6XCJQb3dlciBvZmZcIixcIkltYWdlTmFtZVwiOlwiT2ZmXCJ9fSx7XCJRdWlja0NvbW1hbmRcIjp7XCJSZWZcIjpcIkFib3J0IENvbW1hbmRcIixcIlRvb2x0aXBcIjpcIkFib3J0IGNvbW1hbmRcIixcIkltYWdlTmFtZVwiOlwiU3RvcFwifX0se1wiUXVpY2tDb21tYW5kXCI6e1wiUmVmXCI6XCJSZXNldFwiLFwiVG9vbHRpcFwiOlwiUmVzZXRcIixcIkltYWdlTmFtZVwiOlwiUmVzZXRcIn19XX19XX19ICdcclxuICAgICAgICAgICAgICAgIC8vIG1ldGFEYXRhWydNZXRhQ29uZmlnUXVpY2tDb21tYW5kcyddID0gSlNPTi5wYXJzZShxdWlja01ldGhvZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIHNwZWNpZmljIHBhcmFtZXRlciB0eXBlcyBpbiBtZXRhIGRhdGEgb2JqZWN0XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmluaXRpYWxpemVNZXRhRGF0YShtZXRhRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLmJyb3dzZU1ldGFEYXRhOiBjb3VsZCBub3QgcGFyc2UgbWV0YSBkYXRhOiBcIiArIGUubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXRhRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBleGVjdXRlQ29tcG9uZW50TWV0aG9kKGNvbXBvbmVudE1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5leGVjdXRlQ29tcG9uZW50TWV0aG9kKGNvbXBvbmVudE1ldGhvZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsZWQgYWZ0ZXIgY29tcG9uZW50IHBhcmFtZXRlcnMgaGF2ZSBiZWVuIHVwZGF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIC8vIE9ic29sZXRlIGJlY2F1c2UgY29tcG9uZW50cyBjYW4ndCBiZSB1cGRhdGVkIGF0IHJ1bnRpbWVcclxuICAgIC8qb25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50LCBjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICB0aGlzLmV2ZW50Q29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQucmFpc2UodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcInVwZGF0ZWRDb21wb25lbnRQYXJhbWV0ZXJzXCIsIGNvbXBvbmVudFBhcmFtZXRlcnMpKTtcclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2FsbGVkIGFmdGVyIGNvbXBvbmVudCBtZXRob2RzIGhhdmUgYmVlbiB1cGRhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gY29tcG9uZW50XHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIC8vIE9ic29sZXRlIGJlY2F1c2UgY29tcG9uZW50cyBjYW4ndCBiZSB1cGRhdGVkIGF0IHJ1bnRpbWVcclxuICAgIC8qb25Db21wb25lbnRNZXRob2RzVXBkYXRlZChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50LCBjb21wb25lbnRNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdKTogYW55IHtcclxuICAgICAgICB0aGlzLmV2ZW50Q29tcG9uZW50TWV0aG9kc1VwZGF0ZWQucmFpc2UodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcInVwZGF0ZWRDb21wb25lbnRNZXRob2RzXCIsIGNvbXBvbmVudE1ldGhvZHMpKTtcclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgIGFuZCB1cGRhdGVzIHRoZSBwYXJhbWV0ZXIgdmFsdWVzIG9mIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVyIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHJlYWRQYXJhbWV0ZXJWYWx1ZXMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIucmVhZFBhcmFtZXRlclZhbHVlcyhjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICB0aGlzLm9uUGFyYW1ldGVyVmFsdWVzVXBkYXRlZChjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG9ic2VydmVzIHRoZSBwYXJhbWV0ZXJzIGZvciB2YWx1ZSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJT2JzZXJ2ZXJ9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdfSBvYnNlcnZhYmxlRGF0YU1vZGVsSXRlbXNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgb2JzZXJ2ZURhdGFNb2RlbEl0ZW1zKG9ic2VydmVyOiBJT2JzZXJ2ZXIsIG9ic2VydmFibGVEYXRhTW9kZWxJdGVtczogTWFwcENvY2twaXRDb21wb25lbnRJdGVtW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyLCBvYnNlcnZhYmxlRGF0YU1vZGVsSXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5vYnNlcnZlcyB0aGUgcGFzc2VkIHBhcmFtZXRlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBvYnNlcnZhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzdXNwZW5kXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBvYnNlcnZhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgc3VzcGVuZDpib29sZWFuKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlciwgb2JzZXJ2YWJsZVBhcmFtZXRlcnMsc3VzcGVuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIG9ic2VydmFibGUgY2hhbmdlZCBub3RpZmljYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7RXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZEFyZ3N9IGV2ZW50QXJnc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGFuZGxlT2JzZXJ2YWJsZUl0ZW1zQ2hhbmdlZChldmVudEFyZ3M6IEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzKSB7XHJcblxyXG4gICAgICAgIGlmIChldmVudEFyZ3Mub2JzZXJ2ZXIgaW5zdGFuY2VvZiBEYXRhTW9kZWxCYXNlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgbW9kZWwgY2hhbmdlZCBhcmdzXHJcbiAgICAgICAgICAgIGxldCBtb2RlbEl0ZW1zQ2hhbmdlZEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKGV2ZW50QXJncy5vYnNlcnZlciwgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJjaGFuZ2VkIG9ic2VydmFibGVzXCIsIGV2ZW50QXJncy5jaGFuZ2VkSXRlbXMpO1xyXG4gICAgICAgICAgICAvLyBub3RpZnkgb2JzZXJ2ZXJzIGZyb20gY2hhbmdpbmcgbW9kZWwgaXRlbXNcclxuICAgICAgICAgICAgZXZlbnRBcmdzLm9ic2VydmVyLm9uTW9kZWxJdGVtc0NoYW5nZWQoZXZlbnRBcmdzLm9ic2VydmVyLCBtb2RlbEl0ZW1zQ2hhbmdlZEFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vdGlmeSBmcm9tIHVwZGF0aW5nIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVycyB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25QYXJhbWV0ZXJWYWx1ZXNVcGRhdGVkKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBhbnkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRQYXJhbWV0ZXJWYWx1ZXNVcGRhdGVkLnJhaXNlKHRoaXMsIGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIG1vZGVsIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBjb25uZWN0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Nb2RlbENvbm5lY3RlZCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fbW9kZWxDb25uZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENvbm5lY3Rpb25DaGFuZ2VkKHRoaXMuX21vZGVsQ29ubmVjdGVkKTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgbW9kZWwgaGFzIGxvc3QgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIHRhcmdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk1vZGVsRGlzY29ubmVjdGVkKCkge1xyXG4gICAgICAgIC8vIG5vdGlmeSBjb25uZWN0aW9uIGNoYW5nZVxyXG4gICAgICAgIHRoaXMuX21vZGVsQ29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ29ubmVjdGlvbkNoYW5nZWQodGhpcy5fbW9kZWxDb25uZWN0ZWQpOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIHRoZSBjb25uZWN0aW9uIGlmIGl0IGlzIHN0aWxsIGFsaXZlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydE9ic2VydmVNb2RlbENvbm5lY3Rpb24oKTogYW55IHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBpbml0aWFsbHkgbm90aWZ5IHRoZSBzdWNjZXNzZnVsbCBjb25uZWN0aW9uXHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ29ubmVjdGVkKCk7XHJcblxyXG4gICAgICAgIC8vIGVzdGFibGlzaCBhIHRpbWVyIGZvciB3YXRjaGluZyB0aGUgY29ubmVjdGlvblxyXG4gICAgICAgIGlmICh0aGlzLl9jb25uZWN0aW9uT2JzZXJ2YXRpb25UaW1lcklkID09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25PYnNlcnZhdGlvblRpbWVySWQgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm9ic2VydmVNb2RlbENvbm5lY3Rpb24oKTtcclxuICAgICAgICAgICAgfSwgdGhpcy5fY29ubmVjdGlvbk9ic2VydmF0aW9uSW50ZXJ2YWwpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VyZXZlcyB0aGUgbW9kZWwgY29ubmVjdGlvbiBcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIG9ic2VydmVNb2RlbENvbm5lY3Rpb24oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcmVhZCB0aGUgY29ubmVjdGlvbiBzdGF0ZVxyXG4gICAgICAgIGxldCBpc0Nvbm5lY3RlZCA9IGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmNoZWNrVGFyZ2V0Q29ubmVjdGlvbigpOyAgIFxyXG4gXHJcbiAgICAgICAgaWYgKGlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbW9kZWxDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENvbm5lY3RlZCgpO1xyXG4gICAgICAgICAgICB9ICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbW9kZWxDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbERpc2Nvbm5lY3RlZCgpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBtb2RlbCBjb25uZWN0aW9uIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjb25uZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIG9uTW9kZWxDb25uZWN0aW9uQ2hhbmdlZChjb25uZWN0ZWQ6Ym9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgdGhpcy5ldmVudE1vZGVsQ29ubmVjdGlvbkNoYW5nZWQucmFpc2UodGhpcyxjb25uZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgY29tbWFuZCBmb3IgY2hhbmdpbmcgdGhlIHVzZXIgdG8gYmUgbG9nZ2VkIGluXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgZXhlY3V0ZUNvbW1hbmRDaGFuZ2VVc2VyKCk6IElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT4ge1xyXG4gICAgICAgIHJldHVybiBhc3luYyAodXNlckluZm86IHt9LCBjb21tYW5kUmVzcG9uc2U6IElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHVzZXIgcm9sZXNcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJSb2xlcy52YWx1ZSA9ICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5jaGFuZ2VVc2VyKHVzZXJJbmZvKSBhcyBzdHJpbmdbXTtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZCh0aGlzLl91c2VyUm9sZXMpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLnJlamVjdGVkKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsIH07Il19