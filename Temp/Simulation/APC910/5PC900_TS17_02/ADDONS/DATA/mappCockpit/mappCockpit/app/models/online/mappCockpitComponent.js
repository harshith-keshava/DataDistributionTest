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
define(["require", "exports", "../../framework/property", "../../framework/command", "./mappCockpitComponentReflection", "../../common/numericHelper", "../../widgets/methodParameterListWidget/parameterFilter", "../common/stateExpression/watchableStateExpression", "../../common/componentBase/componentContext", "../../common/componentBase/contextIds/contextIdsComponent", "../../framework/componentHub/bindings/bindingDeclarations", "../../framework/componentHub/bindings/bindings"], function (require, exports, property_1, command_1, mappCockpitComponentReflection_1, numericHelper_1, parameterFilter_1, watchableStateExpression_1, componentContext_1, contextIdsComponent_1, Binding, bindings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements the base members for managing component model members.
     *
     * @class MappCockpitComponentItem
     */
    var MappCockpitComponentItem = /** @class */ (function () {
        /**
         * creates an instance of MappCockpitComponentItem.
         * @param {MappCockpitComponentItem} component
         * @param {string} name
         * @param {*} reference
         * @memberof MappCockpitComponentItem
         */
        function MappCockpitComponentItem(component, name, reference) {
            // Holds the items value
            // protected _value: any = "";
            // holds subitems if any
            this._items = [];
            this._valueSource = property_1.Property.create("");
            // holds the property with the info if the current user has write access
            this._writeAccess = property_1.Property.create(false);
            // specifies a response delaget for write requets
            this._reflectedWriteResponseDelegate = undefined;
            this._reference = reference;
            this._displayName = name;
            this._component = component;
        }
        Object.defineProperty(MappCockpitComponentItem.prototype, "displayName", {
            /**
             * Returns the items display name
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._displayName;
            },
            set: function (displayName) {
                this._displayName = displayName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "browseName", {
            get: function () {
                return this._reference.browseName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "name", {
            get: function () {
                return this._reference.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "component", {
            get: function () {
                return this._component;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "writeAccess", {
            /**
             * true if the current user have write access, else false
             *
             * @readonly
             * @type {string[]}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._writeAccess;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "id", {
            /**
             * Returns the items id
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._reference.nodeId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "value", {
            /**
             * sets/gets the items value object
             *
             * @readonly
             * @type {(MappCockpitComponentParameterValue|undefined)}
             * @memberof MappCockpitComponentParameter
             */
            get: function () {
                return this._valueSource.value;
            },
            set: function (value) {
                this._valueSource.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "valueSource", {
            get: function () {
                return this._valueSource;
            },
            set: function (valueSource) {
                this._valueSource = valueSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "reflectedWriteResponseDelegate", {
            /**
             * Gets the delegate for observing write respomses
             *
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._reflectedWriteResponseDelegate;
            },
            /**
             * Sets a delegate for observing write responses
             *
             * @memberof MappCockpitComponentItem
             */
            set: function (reflectedWriteResponseDelegate) {
                this._reflectedWriteResponseDelegate = reflectedWriteResponseDelegate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "displayValue", {
            /**
             * gets the value as formatted string if appropiate
             *
             * @type {*}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._valueSource.toString();
            },
            set: function (inputValue) {
                this._valueSource.value = inputValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "dataTypeId", {
            get: function () {
                return this._reference.dataType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "items", {
            /**
             * gets the subitems if any
             *
             * @readonly
             * @type {Array<MappCockpitComponentItem>}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitComponentItem;
    }());
    exports.MappCockpitComponentItem = MappCockpitComponentItem;
    /**
     * The class represents a component to be used within mapp cockpit UI
     *
     * @class MappCockpitComponent
     */
    var MappCockpitComponent = /** @class */ (function (_super) {
        __extends(MappCockpitComponent, _super);
        function MappCockpitComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds the component methods
            _this._componentService = null;
            _this._methods = [];
            _this._quickCommands = [];
            _this._userMethods = [];
            // Holds the component parameters
            _this._parameters = [];
            _this._watchableParameters = [];
            _this._watchableStateParameters = [];
            _this._configurationParameters = [];
            _this._messageParameters = [];
            // Holds the meta data of the component
            _this._metaData = undefined;
            // Holds the commands of the component
            _this._commandConnect = command_1.Command.create(_this, _this.executeCommandConnect());
            _this._commandDisconnect = command_1.Command.create(_this, _this.executeCommandDisconnect());
            return _this;
        }
        Object.defineProperty(MappCockpitComponent.prototype, "commandConnectComponent", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._commandConnect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "commandDisconnectComponent", {
            /**
             * gets the command for disconnecting the component
             *
             * @readonly
             * @type {Command<any, any>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._commandDisconnect;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Create bindings
         *
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.createBindings = function () {
            // get the components id
            var componentId = this.browseName;
            var context = new componentContext_1.ComponentContext();
            context.addContext(contextIdsComponent_1.ContextIdsComponent.ComponentId, componentId);
            bindings_1.Bindings.createByDecl(Binding.Components.Component.Messages, this, "", "onMessageParametersUpdated", false, context);
            bindings_1.Bindings.createByDecl(Binding.Components.Component.Watchables, this, "", "onWatchableParametersUpdated", false, context);
            bindings_1.Bindings.createByDecl(Binding.Components.Component.WatchableStates, this, "", "onWatchableStateParametersUpdated", false, context);
            bindings_1.Bindings.createByDecl(Binding.Components.Component.Configuration, this, "", "onConfigurationParametersUpdated", false, context);
            bindings_1.Bindings.createByDecl(Binding.Components.Component.QuickCommands, this, "", "onQuickCommandsUpdated", false, context);
            bindings_1.Bindings.createByDecl(Binding.Components.Component.UserMethods, this, "", "onMethodsUpdated", false, context);
            bindings_1.Bindings.createByDecl(Binding.Components.Component.AllMethods, this, "", "onAllMethodsUpdated", false, context);
        };
        MappCockpitComponent.prototype.executeCommandConnect = function () {
            var _this = this;
            return function (commandPars, commandResponse) { return __awaiter(_this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this.createBindings();
                            // read parameter component set
                            return [4 /*yield*/, this.connectComponent()];
                        case 1:
                            // read parameter component set
                            _a.sent();
                            // update the data link
                            commandResponse.executed();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            commandResponse.rejected(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        /**
         * Connects the component
         *
         * @private
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.connectComponent = function () {
            return __awaiter(this, void 0, void 0, function () {
                var model, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = this.model;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            if (!model) return [3 /*break*/, 3];
                            // browse the component members
                            return [4 /*yield*/, model.browseComponent(this)];
                        case 2:
                            // browse the component members
                            _a.sent();
                            // intitially update the components access rights
                            this.updateComponentAccessRights(model);
                            // watch access right changes
                            this.observeComponentAccessRights(model);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            console.error("MappCockpitComponent: Could not connect component. %o", error_2);
                            throw (error_2);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Disconnects the component
         *
         * @private
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.disconnectComponent = function () {
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    model = this.model;
                    try {
                        if (model) {
                            // detach component access rights observers
                            this.unobserveComponentAccessRights(model);
                            // unbind/dispose all bindings of this instance
                            bindings_1.Bindings.unbind(this);
                        }
                    }
                    catch (error) {
                        console.error("MappCockpitComponent: Could not disconnect component. %o", error);
                        throw (error);
                    }
                    return [2 /*return*/];
                });
            });
        };
        MappCockpitComponent.prototype.executeCommandDisconnect = function () {
            var _this = this;
            return function (commandPars, commandResponse) { return __awaiter(_this, void 0, void 0, function () {
                var model, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = this.model;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            if (!model) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.disconnectComponent()];
                        case 2:
                            _a.sent();
                            // the command has been executed
                            commandResponse.executed();
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_3 = _a.sent();
                            commandResponse.rejected(error_3);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
        };
        /**
         * Observes changes of the access rights
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainModel
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.observeComponentAccessRights = function (mainModel) {
            var _this = this;
            mainModel.userRoles.attachObserver(this, function (userRoles) {
                _this.updateComponentAccessRights(mainModel);
            });
        };
        /**
           * unobserves changes of the access rights
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainModel
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.unobserveComponentAccessRights = function (mainModel) {
            mainModel.userRoles.detachObserver(this);
        };
        /**
         * Updates the componentrs access rights
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainModel
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateComponentAccessRights = function (mainModel) {
            var writeAccess = mainModel.writeAccess;
            console.log("user roles changed %o write access =%o", mainModel.userRoles.value, writeAccess);
            this.updateComponentMemberAccessRights(writeAccess);
            this.writeAccess.value = writeAccess;
        };
        /**
         * Updates the access rights of component members
         *
         * @param {boolean} writeAccess
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateComponentMemberAccessRights = function (writeAccess) {
            this.updateParameterAccessRights(writeAccess);
            this.updateMethodsAccessRights(writeAccess);
        };
        /**
         * Updates the parameters access rights
         *
         * @private
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateParameterAccessRights = function (writeAccess) {
            this.parameters.forEach(function (parameter) {
                // rewrite the parameters write access property with its original raw value to force triggering the changed event. This is just a workaround
                // to fix the log in/out problem displaying wrong readonly states.
                // the workaround is intended to be replaced by proper batch refresh requests!
                parameter.isWriteable.value = parameter.isWriteable._value;
            });
        };
        /**
         * Updates the methods access rights
         *
         * @private
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateMethodsAccessRights = function (writeAccess) {
            this.methods.forEach(function (method) {
                method.isExecutable.value = writeAccess;
            });
        };
        Object.defineProperty(MappCockpitComponent.prototype, "serviceChannel", {
            /**
             * Gets the service channel
             *
             * @type {(MappCockpitComponentService|null)}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._componentService;
            },
            /**
             * Sets the service channel
             *
             * @memberof MappCockpitComponent
             */
            set: function (serviceChannel) {
                this._componentService = serviceChannel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "methods", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._methods;
            },
            set: function (methods) {
                this._methods = methods;
                this.onAllMethodsUpdated(this._methods);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "quickCommands", {
            get: function () {
                return this._quickCommands;
            },
            set: function (quickCommands) {
                this._quickCommands = quickCommands;
                this.onQuickCommandsUpdated(this._quickCommands);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "userMethods", {
            get: function () {
                return this._userMethods;
            },
            set: function (methods) {
                this._userMethods = methods;
                this.onMethodsUpdated(this._userMethods);
            },
            enumerable: true,
            configurable: true
        });
        MappCockpitComponent.prototype.onMethodsUpdated = function (userMethods) {
            //BINDINGSOURCE: method stub supporting bindability
        };
        MappCockpitComponent.prototype.onAllMethodsUpdated = function (allMethods) {
            //BINDINGSOURCE: method stub supporting bindability
        };
        MappCockpitComponent.prototype.onQuickCommandsUpdated = function (quickCommands) {
            //BINDINGSOURCE: method stub supporting bindability
        };
        Object.defineProperty(MappCockpitComponent.prototype, "parameters", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._parameters;
            },
            set: function (parameters) {
                this._parameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "watchableParameters", {
            get: function () {
                return this._watchableParameters;
            },
            set: function (parameters) {
                this._watchableParameters = parameters;
                this.onWatchableParametersUpdated(this._watchableParameters);
            },
            enumerable: true,
            configurable: true
        });
        MappCockpitComponent.prototype.onWatchableParametersUpdated = function (parameters) {
            // BINDINGSOURCE: method stub supporting bindability
        };
        Object.defineProperty(MappCockpitComponent.prototype, "watchableStateParameters", {
            get: function () {
                return this._watchableStateParameters;
            },
            set: function (parameters) {
                this._watchableStateParameters = parameters;
                this.onWatchableStateParametersUpdated(this._watchableStateParameters);
            },
            enumerable: true,
            configurable: true
        });
        MappCockpitComponent.prototype.onWatchableStateParametersUpdated = function (parameters) {
            // BINDINGSOURCE: method stub supporting bindability
        };
        Object.defineProperty(MappCockpitComponent.prototype, "messageParameters", {
            get: function () {
                return this._messageParameters;
            },
            set: function (parameters) {
                this._messageParameters = parameters;
                this.onMessageParametersUpdated(this._messageParameters);
            },
            enumerable: true,
            configurable: true
        });
        MappCockpitComponent.prototype.onMessageParametersUpdated = function (parameters) {
            // BINDINGSOURCE: method stub supporting bindability
        };
        Object.defineProperty(MappCockpitComponent.prototype, "configurationParameters", {
            get: function () {
                return this._configurationParameters;
            },
            set: function (parameters) {
                this._configurationParameters = parameters;
                this.onConfigurationParametersUpdated(this._configurationParameters);
            },
            enumerable: true,
            configurable: true
        });
        MappCockpitComponent.prototype.onConfigurationParametersUpdated = function (parameters) {
            // BINDINGSOURCE: method stub supporting bindability
        };
        Object.defineProperty(MappCockpitComponent.prototype, "metaData", {
            /**
             * refreshes the components parameter list
             *
             * @private
             * @param {Property<MappCockpitComponentParameter[]>} dataLink
             * @returns {*}
             * @memberof MappCockpitComponent
             */
            /*private async requestReadComponentParameters(dataLink: Property<MappCockpitComponentParameter[]>): Promise<MappCockpitComponentParameter[]> {
                let componentParameters: MappCockpitComponentParameter[] = [];
                // get the components main model
                let model = (<any>this).model as MappCockpitComponentDataModel;
                try {
                    if (model) {
                        // read parameter component set
                        componentParameters = await model.browseParameters(this);
                        // update the data link
                        dataLink.readRequestExecuted(componentParameters);
                    }
                } catch (error) {
                    dataLink.readRequestRejected(error);
                }
        
                return componentParameters;
            }*/
            /**
             * Refreshes the components methods
             *
             * @param {Property<MappCockpitComponentMethod[]>} dataLink
             * @returns {*}
             * @memberof MappCockpitComponent
             */
            /*private async requestReadComponentMethods(dataLink: Property<MappCockpitComponentMethod[]>): Promise<any> {
                let componentMethods: MappCockpitComponentMethod[] = [];
                // get the components main model
                let model = (<any>this).model as MappCockpitComponentDataModel;
                try {
                    if (model) {
                        // read parameter component set
                        componentMethods = await model.browseMethods(this);
                        // update the data link
                        dataLink.readRequestExecuted(componentMethods);
                    }
                } catch (error) {
                    dataLink.readRequestRejected(error);
                }
        
                return componentMethods;
            }*/
            /**
             *  gets the meta data of a component
             *
             * @type {*}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._metaData;
            },
            set: function (metaData) {
                this._metaData = metaData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Registers or marks the component as user component
         *
         * @static
         * @param {MappCockpitComponent} component
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.registerUserComponent = function (component) {
            component.isUserComponent = true;
        };
        /**
         * Determines if the component is a user component
         *
         * @static
         * @param {MappCockpitComponent} component
         * @returns {boolean}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.isUserComponent = function (component) {
            return component.isUserComponent;
        };
        return MappCockpitComponent;
    }(MappCockpitComponentItem));
    exports.MappCockpitComponent = MappCockpitComponent;
    /**
     * The class implements method access.
     *
     * @class MappCockpitComponentMethod
     */
    var MappCockpitComponentMethod = /** @class */ (function (_super) {
        __extends(MappCockpitComponentMethod, _super);
        function MappCockpitComponentMethod() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds the method parameters
            _this._inputParameters = [];
            // specefies if the method is executable
            _this._isExecutable = property_1.Property.create(false, undefined, undefined, function (value) { return _this.methodIsExecutable(value); });
            return _this;
        }
        Object.defineProperty(MappCockpitComponentMethod.prototype, "inputParameters", {
            /**
             * Returns the input parameters of the method
             *
             * @readonly
             * @type {Array<MappCockpitMethodParameter>}
             * @memberof MappCockpitComponentMethod
             */
            get: function () {
                return this._inputParameters;
            },
            set: function (value) {
                this._inputParameters = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Invokes the execution of the component method
         *
         * @static
         * @param {MappCockpitComponentMethod} componentMethod
         * @returns {*}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.execute = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = componentMethod.component.model;
                            if (!(model && model.executeComponentMethod)) return [3 /*break*/, 2];
                            return [4 /*yield*/, model.executeComponentMethod(componentMethod)];
                        case 1: 
                        // invoke the execution of the method
                        return [2 /*return*/, _a.sent()];
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Finds a method by name
         *
         * @static
         * @param {string} methodName
         * @param {(MappCockpitComponentMethod[]|undefined)} componentMethods
         * @param {boolean} [includeInternals=true]
         * @returns {MappCockpitComponentMethod|undefined}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.find = function (methodName, componentMethods, includeInternals) {
            if (includeInternals === void 0) { includeInternals = true; }
            var method = undefined;
            if (componentMethods) {
                var model = componentMethods[0].component.model;
                if (model) {
                    // get the executable methods
                    var executableMethods = includeInternals ? componentMethods[0].component.methods : componentMethods;
                    var matchingMethods = executableMethods.filter(function (method) { return method.browseName === methodName; });
                    if (matchingMethods.length === 1) {
                        // call the requested method
                        method = matchingMethods[0];
                    }
                }
            }
            return method;
        };
        Object.defineProperty(MappCockpitComponentMethod.prototype, "isExecutable", {
            /**
             * Gets if the method is executable
             *
             * @readonly
             * @type {Property<boolean>}
             * @memberof MappCockpitComponentMethod
             */
            get: function () {
                return this._isExecutable;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Determines if the methid is executable
         *
         * @param {boolean} executable
         * @returns {*}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.prototype.methodIsExecutable = function (executable) {
            var isExecutableValue = executable;
            var model = this.component.model;
            if (model && this.component) {
                // enable method execution for non user components
                isExecutableValue = MappCockpitComponent.isUserComponent(this.component) ? isExecutableValue : true;
            }
            return isExecutableValue;
        };
        /**
         * Updates the methods input parameters
         *
         * @static
         * @param {MappCockpitComponentMethod} componentMethod
         * @returns {Promise<MappCockpitMethodParameter[]>}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.updateInputParameters = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = componentMethod.component.model;
                            if (!(model && model.executeComponentMethod)) return [3 /*break*/, 2];
                            return [4 /*yield*/, model.browseMethodInputParameters(componentMethod)];
                        case 1:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.updateMethodInputParameters(componentMethod);
                            _a.label = 2;
                        case 2: return [2 /*return*/, componentMethod.inputParameters];
                    }
                });
            });
        };
        return MappCockpitComponentMethod;
    }(MappCockpitComponentItem));
    exports.MappCockpitComponentMethod = MappCockpitComponentMethod;
    var MappCockpitParameter = /** @class */ (function (_super) {
        __extends(MappCockpitParameter, _super);
        function MappCockpitParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // holds the parameters type
            _this._dataType = new MappCockpitParameterDataType();
            // reference to the enum information
            _this._enumRef = new MappCockpitComponentParameterEnum(null);
            // holds the engineering unit name for this parameter
            _this._engineeringUnit = "";
            // holds the modified value if the value of this parameter was already changed in the ui
            _this._modifiedValue = undefined;
            // was there an error at the last transfer of this parameter
            _this._transferFailed = false;
            // is it allowed to change/write this item in general
            _this._isReadOnly = false;
            // is it allowed to write this parameter at the current state
            _this._isWritable = property_1.Property.create(false, undefined, undefined, function (value) { return _this.parameterIsWritable(value); });
            return _this;
        }
        Object.defineProperty(MappCockpitParameter.prototype, "dataType", {
            /**
             * Returns the parameters value object
             *
             * @readonly
             * @type {(MappCockpitParameterDataType)}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._dataType;
            },
            set: function (dataType) {
                this._dataType = dataType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "engineeringUnit", {
            get: function () {
                return this._engineeringUnit;
            },
            set: function (engineeringUnit) {
                this._engineeringUnit = engineeringUnit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "enumType", {
            get: function () {
                return this._enumRef;
            },
            set: function (enumRef) {
                this._enumRef = enumRef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "isReadOnly", {
            /**
             * true if it is not possible to change the value of this parameter, else false
             *
             * @type {boolean}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._isReadOnly;
            },
            set: function (isReadOnly) {
                this._isReadOnly = isReadOnly;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "isWriteable", {
            /**
             * true if the the parameter value can not be written at the current state
             *
             * @readonly
             * @type {Property<boolean>}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._isWritable;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Determines if the properties value is writable.
         *
         * @private
         * @param {boolean} value
         * @returns {boolean}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.parameterIsWritable = function (writable) {
            var writableValue = writable;
            var model = this.component.model;
            if (model) {
                writableValue = writable && model.writeAccess;
            }
            return writableValue;
        };
        Object.defineProperty(MappCockpitParameter.prototype, "displayValue", {
            /**
             * Retruns the display value
             *
             * @type {string}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this.valueToString(this._valueSource.value);
            },
            /**
             * Sets the display value
             *
             * @memberof MappCockpitParameter
             */
            set: function (inputValue) {
                var newValue = this.valueFromString(inputValue);
                this.value = newValue;
                console.log("MappCockpitParameter.setDisplayValue %o for %o", this.value, inputValue);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "modifiedValue", {
            /**
             * Gets the modified parameter value.
             *
             * @type {*}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._modifiedValue;
            },
            /**
             * Sets the modified parameter value.
             *
             * @memberof MappCockpitParameter
             */
            set: function (value) {
                this._modifiedValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "modifiedDisplayValue", {
            /**
             * Gets the modified display parameter value.
             *
             * @type {*}
             * @memberof MappCockpitParameter
             */
            get: function () {
                if (this._modifiedValue != undefined) {
                    return this.valueToString(this._modifiedValue);
                }
                return this.valueToString(this._valueSource.value);
            },
            /**
             * Sets the modified display parameter value.
             *
             * @memberof MappCockpitParameter
             */
            set: function (value) {
                var newValue = this.valueFromString(value);
                this._modifiedValue = newValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "transferFailed", {
            /**
             * True if transfer of modififed value was not possible
             *
             * @type {boolean}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._transferFailed;
            },
            /**
             * Will be set to true if transfer of modififed value was not possible
             *
             * @memberof MappCockpitParameter
             */
            set: function (value) {
                this._transferFailed = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * converts the parameter value to a formatted string
         *
         * @param {*} value
         * @returns {string}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.valueToString = function (value) {
            var valueString = "";
            // avoid converting null or undefined value
            if (value != null && value != undefined) {
                valueString = value.toString();
                valueString = numericHelper_1.NumericHelper.convertNumericString(valueString, this.dataType.name);
                if (this.enumType.isDefined) {
                    valueString = this.enumType.getDisplayValue(value);
                }
            }
            return valueString;
        };
        /**
         * converts a parameter value string to a value according to the parameters data type
         *
         * @param {string} inputValue
         * @returns {*}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.valueFromString = function (inputValue) {
            // set an empty string for an undefined input value
            var value = inputValue !== undefined && inputValue !== null ? inputValue : "";
            // replace the enum string by the value if there is one defined.
            if (this.enumType.isDefined) {
                value = this.enumType.getValue(inputValue);
            }
            return value;
        };
        return MappCockpitParameter;
    }(MappCockpitComponentItem));
    /**
     * The class implements a component parameter
     *
     * @class MappCockpitComponentParameter
     */
    var MappCockpitComponentParameter = /** @class */ (function (_super) {
        __extends(MappCockpitComponentParameter, _super);
        function MappCockpitComponentParameter(component, name, reference) {
            var _this = _super.call(this, component, name, reference) || this;
            _this._valueSource = property_1.Property.create("", undefined, function (dataLink) { return _this.requestWriteValue(dataLink); });
            return _this;
        }
        /**
         * Writes the current parameter value to target
         *
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.prototype.write = function (reflectedWriteResponseDelegate) {
            // connect the write response delegate
            this.reflectedWriteResponseDelegate = reflectedWriteResponseDelegate;
            // execute writing the parameter value
            this.valueSource.write();
        };
        /**
         * Writes the data links value to target
         *
         * @private
         * @param {Property<any>} dataLink
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.prototype.requestWriteValue = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var component, model, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            component = this.component;
                            if (!(component && component.model)) return [3 /*break*/, 2];
                            model = component.model;
                            return [4 /*yield*/, model.writeComponentParameter(this)];
                        case 1:
                            _a.sent();
                            dataLink.writeRequestExecuted(null);
                            _a.label = 2;
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            dataLink.writeRequestRejected(error_4);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Initiates the observation of parameter value changes
         *
         * @static
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @returns {*}
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.observeParameterValueChanges = function (observer, observableParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(observableParameters.length > 0 && observableParameters[0] != undefined)) return [3 /*break*/, 2];
                            model = MappCockpitComponentParameter.getModel(observableParameters[0]);
                            if (!(model && model.observeDataModelItems)) return [3 /*break*/, 2];
                            // invoke the observation on the model
                            return [4 /*yield*/, model.observeDataModelItems(observer, observableParameters)];
                        case 1:
                            // invoke the observation on the model
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Activates model items registered for observation
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @returns {*}
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.activateComponentModelItems = function (observer, observableParameters) {
            //TODO: implement model item activation handling
        };
        /**
         * Unobserves all observables associated with the observer
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observedParameters
         * @param {boolean} [suspend=true] suspends the observation if true otherwise removes the whole subscription
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.unobserveComponentModelItems = function (observer, observedParameters, suspend) {
            if (observedParameters === void 0) { observedParameters = []; }
            if (suspend === void 0) { suspend = true; }
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(observedParameters.length > 0 && observedParameters[0] != undefined)) return [3 /*break*/, 2];
                            model = MappCockpitComponentParameter.getModel(observedParameters[0]);
                            if (!(model && model.unobserveComponentModelItems)) return [3 /*break*/, 2];
                            // invoke the unobservation on the model
                            return [4 /*yield*/, model.unobserveComponentModelItems(observer, observedParameters, suspend)];
                        case 1:
                            // invoke the unobservation on the model
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Unobserves all connected parameters of the specified component
         *
         * @static
         * @param {*} observer
         * @param {(MappCockpitComponentItem | null)} component
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.unobserveAll = function (observer, component) {
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!component) return [3 /*break*/, 2];
                            model = component.model;
                            if (!(model && model.unobserveComponentModelItems)) return [3 /*break*/, 2];
                            // Omitting a parameter list forces unobserving every observables of the specified observer
                            return [4 /*yield*/, model.unobserveComponentModelItems(observer, [], false).then(function (result) {
                                    console.log("MappCockpitComponentParameter: unobserved %o", observer);
                                }).catch(function (error) {
                                    console.error(error);
                                })];
                        case 1:
                            // Omitting a parameter list forces unobserving every observables of the specified observer
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Deactivates model items registered for observation
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observedParameters
         * @param {boolean} [suspend=true]
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.deactivateComponentModelItems = function (observer, observedParameters, suspend) {
            if (suspend === void 0) { suspend = true; }
            //TODO: implement model item deactivation handling
        };
        /**
         * Gets the parameters model
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @returns
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.getModel = function (componentParameter) {
            if (!componentParameter) {
                console.error("componentParameter undefined !");
            }
            if (!componentParameter.component) {
                console.error("componentParameter.component undefined !");
            }
            return componentParameter.component.model;
        };
        return MappCockpitComponentParameter;
    }(MappCockpitParameter));
    exports.MappCockpitComponentParameter = MappCockpitComponentParameter;
    /**
     * Defines class used for state icons
     *
     * @class MappCockpitStateParameter
     */
    var MappCockpitStateParameter = /** @class */ (function () {
        function MappCockpitStateParameter(name, expression, watchableMapping, icon) {
            // Holds watchable state expression class
            this.stateExpression = new watchableStateExpression_1.WatchableStateExpression();
            this._name = name;
            this.stateExpression = new watchableStateExpression_1.WatchableStateExpression(name, expression, watchableMapping, icon);
        }
        Object.defineProperty(MappCockpitStateParameter.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitStateParameter;
    }());
    exports.MappCockpitStateParameter = MappCockpitStateParameter;
    /**
     * implements a method parameter
     *
     * @class MappCockpitMethodParameter
     * @extends {MappCockpitParameter}
     */
    var MappCockpitMethodParameter = /** @class */ (function (_super) {
        __extends(MappCockpitMethodParameter, _super);
        function MappCockpitMethodParameter(component, name, reference) {
            var _this = _super.call(this, component, name, reference) || this;
            _this._filter = new parameterFilter_1.ParameterFilter();
            return _this;
        }
        Object.defineProperty(MappCockpitMethodParameter.prototype, "filter", {
            get: function () {
                return this._filter;
            },
            set: function (filter) {
                this._filter = filter;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitMethodParameter;
    }(MappCockpitParameter));
    exports.MappCockpitMethodParameter = MappCockpitMethodParameter;
    /**
     * Defines the clas for quickcommands
     *
     * @class MappCockpitQuickCommandParameter
     */
    var MappCockpitQuickCommandParameter = /** @class */ (function () {
        function MappCockpitQuickCommandParameter(name, tooltip, imageName) {
            this._name = name;
            this._tooltip = tooltip;
            this._imageName = imageName;
        }
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "tooltip", {
            get: function () {
                return this._tooltip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "imageName", {
            get: function () {
                return this._imageName;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitQuickCommandParameter;
    }());
    exports.MappCockpitQuickCommandParameter = MappCockpitQuickCommandParameter;
    /**
     * defines the parameter data type
     *
     * @class MappCockpitComponentParameterDataType
     */
    var MappCockpitParameterDataType = /** @class */ (function () {
        function MappCockpitParameterDataType(dataTypeId, dataTypeName) {
            if (dataTypeId === void 0) { dataTypeId = "undefined"; }
            if (dataTypeName === void 0) { dataTypeName = "undefined"; }
            this._dataTypeId = "undefined";
            this._dataTypeName = "undefined";
            this._dataTypeId = dataTypeId;
            this._dataTypeName = dataTypeName;
        }
        Object.defineProperty(MappCockpitParameterDataType.prototype, "isDefined", {
            /**
             * Returns if the data type is defined.
             *
             * @readonly
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._dataTypeId !== "undefined" && this._dataTypeName !== "undefined";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameterDataType.prototype, "id", {
            get: function () {
                return this, this._dataTypeId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameterDataType.prototype, "name", {
            get: function () {
                return this._dataTypeName;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitParameterDataType;
    }());
    exports.MappCockpitParameterDataType = MappCockpitParameterDataType;
    /**
     * implements a single enum value with value and string
     *
     * @class MappCockpitComponentParameterEnumValue
     */
    var MappCockpitComponentParameterEnumValue = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitComponentParameterEnumValue.
         * @param {string} displayText
         * @param {*} value
         * @memberof MappCockpitComponentParameterEnumValue
         */
        function MappCockpitComponentParameterEnumValue(displayText, value) {
            this._displayValue = "undefined";
            this._value = null;
            this._displayValue = displayText;
            this._value = value;
        }
        Object.defineProperty(MappCockpitComponentParameterEnumValue.prototype, "value", {
            /**
             * gets the value of the enum
             *
             * @readonly
             * @type {*}
             * @memberof MappCockpitComponentParameterEnumValue
             */
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnumValue.prototype, "displayValue", {
            /**
             * gets the string of the enum value
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentParameterEnumValue
             */
            get: function () {
                return this._displayValue;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitComponentParameterEnumValue;
    }());
    exports.MappCockpitComponentParameterEnumValue = MappCockpitComponentParameterEnumValue;
    /**
     * implements a parameter enum holding a collection of enum items
     *
     * @class MappCockpitComponentParameterEnum
     */
    var MappCockpitComponentParameterEnum = /** @class */ (function () {
        function MappCockpitComponentParameterEnum(enumValuesReference) {
            if (enumValuesReference === void 0) { enumValuesReference = null; }
            this._browseName = "";
            this._enumValuesReference = enumValuesReference;
            if (this._enumValuesReference) {
                this._browseName = this._enumValuesReference.browseName;
                this._enumValues = this._enumValuesReference.enumValues.map(function (enumValueRef) { return new MappCockpitComponentParameterEnumValue(enumValueRef.displayName.text, enumValueRef.value); });
            }
        }
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "browseName", {
            /**
             * gets the browse name of the enum
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValuesReference.browseName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "values", {
            /**
             * gets the collection of enum items
             *
             * @readonly
             * @type {MappCockpitComponentParameterEnumValue[]}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValues;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "isDefined", {
            /**
             * determines if the enum is defined and contains values
             *
             * @readonly
             * @type {boolean}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValues && this._enumValues.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * gets a string matching the specified enum value, otherwise return value string as default.
         *
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.getDisplayValue = function (enumValue) {
            // get an enum item matching the requested value
            var matchingEnumItem = this.findMatchingEnumItemByValue(enumValue);
            // update the value string to the matching one or use the default string
            var enumValueString = matchingEnumItem ? matchingEnumItem.displayValue : enumValue.toString();
            return enumValueString;
        };
        /**
         *
         *
         * @param {string} inputValue
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.getValue = function (enumDisplayValue) {
            var enumValue = enumDisplayValue;
            // get an enum item matching the requested string
            var matchingEnumItem = this.findMatchingEnumItemByString(enumDisplayValue);
            if (matchingEnumItem) {
                enumValue = matchingEnumItem.value;
            }
            else {
                console.error("MappCockpitComponentParameterEnum.getValue: could not find matching enum value for %o", enumDisplayValue);
            }
            return enumValue;
        };
        /**
         * find an enum item with matching value
         *
         * @private
         * @param {*} enumValue
         * @returns
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.findMatchingEnumItemByValue = function (enumValue) {
            var matchingEnumItem = this._enumValues.filter(function (enumItem) { return enumItem.value == enumValue; });
            return matchingEnumItem.length === 1 ? matchingEnumItem[0] : undefined;
        };
        /**
         * find an enum item with matching string
         *
         * @param {string} enumDisplayValue
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.findMatchingEnumItemByString = function (enumDisplayValue) {
            var matchingEnumItem = this._enumValues.filter(function (enumItem) { return enumItem.displayValue === enumDisplayValue; });
            return matchingEnumItem.length === 1 ? matchingEnumItem[0] : undefined;
        };
        return MappCockpitComponentParameterEnum;
    }());
    exports.MappCockpitComponentParameterEnum = MappCockpitComponentParameterEnum;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWdCQTs7OztPQUlHO0lBQ0g7UUF3Qkk7Ozs7OztXQU1HO1FBQ0gsa0NBQVksU0FBMEMsRUFBRSxJQUFZLEVBQUUsU0FBYztZQTNCcEYsd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5Qix3QkFBd0I7WUFDZCxXQUFNLEdBQW9DLEVBQUUsQ0FBQztZQVE3QyxpQkFBWSxHQUFrQixtQkFBUSxDQUFDLE1BQU0sQ0FBTSxFQUFFLENBQUMsQ0FBQztZQUVqRSx3RUFBd0U7WUFDaEUsaUJBQVksR0FBc0IsbUJBQVEsQ0FBQyxNQUFNLENBQVUsS0FBSyxDQUFDLENBQUM7WUFFMUUsaURBQWlEO1lBQ3pDLG9DQUErQixHQUE0QyxTQUFTLENBQUM7WUFXekYsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDaEMsQ0FBQztRQVNELHNCQUFXLGlEQUFXO1lBUHRCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQztpQkFFRCxVQUF1QixXQUFtQjtnQkFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDcEMsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBVyxnREFBVTtpQkFBckI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUN0QyxDQUFDOzs7V0FBQTtRQUVELHNCQUFXLDBDQUFJO2lCQUFmO2dCQUNJLE9B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QixVQUE2QixnQkFBd0I7WUFDakQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQVEsSUFBTyxPQUFPLFFBQVEsQ0FBQyxZQUFZLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNySCxPQUFPLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0UsQ0FBQztRQUdMLHdDQUFDO0lBQUQsQ0FBQyxBQW5IRCxJQW1IQztJQUdtSiw4RUFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfSBmcm9tIFwiLi9jb21wb25lbnRzRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQsIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uXCI7XHJcbmltcG9ydCB7IE51bWVyaWNIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL251bWVyaWNIZWxwZXJcIjtcclxuaW1wb3J0IHsgSU9ic2VydmVyIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcbmltcG9ydCB7IElWYWx1ZUxpc3RJdGVtIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZhbHVlTGlzdEl0ZW1JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC9wYXJhbWV0ZXJGaWx0ZXJcIjtcclxuaW1wb3J0IHsgV2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZUV4cHJlc3Npb24vd2F0Y2hhYmxlU3RhdGVFeHByZXNzaW9uXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZSB9IGZyb20gXCIuL21hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRDb250ZXh0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudENvbnRleHRcIjtcclxuaW1wb3J0IHsgQ29udGV4dElkc0NvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb250ZXh0SWRzL2NvbnRleHRJZHNDb21wb25lbnRcIjtcclxuaW1wb3J0ICogYXMgQmluZGluZyBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9iaW5kaW5nRGVjbGFyYXRpb25zXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdzIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ3NcIjtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIHRoZSBiYXNlIG1lbWJlcnMgZm9yIG1hbmFnaW5nIGNvbXBvbmVudCBtb2RlbCBtZW1iZXJzLlxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0ge1xyXG5cclxuICAgIC8vIEhvbGRzIGEgcmVmZXJlbmNlIHRvIHRoZSB1bmRlcmx5aW5nIGl0ZW1cclxuICAgIHByb3RlY3RlZCByZWFkb25seSBfcmVmZXJlbmNlOiBhbnk7XHJcbiAgICAvLyBIb2xkcyB0aGUgaXRlbXMgdmFsdWVcclxuICAgIC8vIHByb3RlY3RlZCBfdmFsdWU6IGFueSA9IFwiXCI7XHJcbiAgICAvLyBob2xkcyBzdWJpdGVtcyBpZiBhbnlcclxuICAgIHByb3RlY3RlZCBfaXRlbXM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbT4gPSBbXTtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgZGlzcGxheSBuYW1lXHJcbiAgICBwcm90ZWN0ZWQgX2Rpc3BsYXlOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGNvbXBvbmVudCByZXByZXNlbnRpbmcgdGhlIG93bmVyIG9mIHRoZSBjb21wb25lbnQgaXRlbVxyXG4gICAgcHJvdGVjdGVkIF9jb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIF92YWx1ZVNvdXJjZTogUHJvcGVydHk8YW55PiA9IFByb3BlcnR5LmNyZWF0ZTxhbnk+KFwiXCIpO1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBwcm9wZXJ0eSB3aXRoIHRoZSBpbmZvIGlmIHRoZSBjdXJyZW50IHVzZXIgaGFzIHdyaXRlIGFjY2Vzc1xyXG4gICAgcHJpdmF0ZSBfd3JpdGVBY2Nlc3M6IFByb3BlcnR5PGJvb2xlYW4+ID0gUHJvcGVydHkuY3JlYXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgYSByZXNwb25zZSBkZWxhZ2V0IGZvciB3cml0ZSByZXF1ZXRzXHJcbiAgICBwcml2YXRlIF9yZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU6ICgocmVzdWx0RGF0YTogYW55KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbS5cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRJdGVtfSBjb21wb25lbnRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0geyp9IHJlZmVyZW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGwsIG5hbWU6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9yZWZlcmVuY2UgPSByZWZlcmVuY2U7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheU5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGl0ZW1zIGRpc3BsYXkgbmFtZSBcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkaXNwbGF5TmFtZShkaXNwbGF5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGJyb3dzZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVmZXJlbmNlLmJyb3dzZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZS5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50KCk6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0cnVlIGlmIHRoZSBjdXJyZW50IHVzZXIgaGF2ZSB3cml0ZSBhY2Nlc3MsIGVsc2UgZmFsc2VcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHdyaXRlQWNjZXNzKCk6IFByb3BlcnR5PGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVBY2Nlc3M7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaXRlbXMgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVmZXJlbmNlLm5vZGVJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldHMvZ2V0cyB0aGUgaXRlbXMgdmFsdWUgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7KE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyVmFsdWV8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2YWx1ZVNvdXJjZSgpOiBQcm9wZXJ0eTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB2YWx1ZVNvdXJjZSh2YWx1ZVNvdXJjZTogUHJvcGVydHk8YW55Pikge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlU291cmNlID0gdmFsdWVTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGEgZGVsZWdhdGUgZm9yIG9ic2VydmluZyB3cml0ZSByZXNwb25zZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlKHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTogKChyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlVmFsdWU6IGFueSkgPT4gdm9pZCkgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9yZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGUgPSByZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBkZWxlZ2F0ZSBmb3Igb2JzZXJ2aW5nIHdyaXRlIHJlc3BvbXNlc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGUoKTogKChyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlVmFsdWU6IGFueSkgPT4gdm9pZCkgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHZhbHVlIGFzIGZvcm1hdHRlZCBzdHJpbmcgaWYgYXBwcm9waWF0ZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBTdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZVNvdXJjZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRpc3BsYXlWYWx1ZShpbnB1dFZhbHVlOiBTdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZSA9IGlucHV0VmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YVR5cGVJZCgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2UuZGF0YVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBzdWJpdGVtcyBpZiBhbnlcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGl0ZW1zKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgcmVwcmVzZW50cyBhIGNvbXBvbmVudCB0byBiZSB1c2VkIHdpdGhpbiBtYXBwIGNvY2twaXQgVUlcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudCBleHRlbmRzIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIGNvbXBvbmVudCBtZXRob2RzXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2UgfCBudWxsPW51bGw7XHJcbiAgICBwcml2YXRlIF9tZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4gPSBbXTtcclxuICAgIHByaXZhdGUgX3F1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfdXNlck1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPiA9IFtdO1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgcHJpdmF0ZSBfcGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+ID0gW107XHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTtcclxuXHJcbiAgICAvLyBIb2xkcyB0aGUgbWV0YSBkYXRhIG9mIHRoZSBjb21wb25lbnRcclxuICAgIHByaXZhdGUgX21ldGFEYXRhOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvLyBIb2xkcyB0aGUgY29tbWFuZHMgb2YgdGhlIGNvbXBvbmVudFxyXG4gICAgcHJpdmF0ZSBfY29tbWFuZENvbm5lY3QgPSBDb21tYW5kLmNyZWF0ZTxhbnksIGFueT4odGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZENvbm5lY3QoKSk7XHJcbiAgICBwcml2YXRlIF9jb21tYW5kRGlzY29ubmVjdCA9IENvbW1hbmQuY3JlYXRlPGFueSwgYW55Pih0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kRGlzY29ubmVjdCgpKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzL2dldHMgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIGdldCBjb21tYW5kQ29ubmVjdENvbXBvbmVudCgpOiBDb21tYW5kPGFueSwgYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRDb25uZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgY29tbWFuZCBmb3IgZGlzY29ubmVjdGluZyB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Q29tbWFuZDxhbnksIGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb21tYW5kRGlzY29ubmVjdENvbXBvbmVudCgpOiBDb21tYW5kPGFueSwgYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmREaXNjb25uZWN0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBiaW5kaW5nc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlQmluZGluZ3MoKXtcclxuICAgICAgICAvLyBnZXQgdGhlIGNvbXBvbmVudHMgaWRcclxuICAgICAgICBjb25zdCBjb21wb25lbnRJZCA9IHRoaXMuYnJvd3NlTmFtZTtcclxuICAgICAgICBsZXQgY29udGV4dCA9IG5ldyBDb21wb25lbnRDb250ZXh0KCk7XHJcbiAgICAgICAgY29udGV4dC5hZGRDb250ZXh0KENvbnRleHRJZHNDb21wb25lbnQuQ29tcG9uZW50SWQsIGNvbXBvbmVudElkKTtcclxuXHJcbiAgICAgICAgQmluZGluZ3MuY3JlYXRlQnlEZWNsKEJpbmRpbmcuQ29tcG9uZW50cy5Db21wb25lbnQuTWVzc2FnZXMsIHRoaXMsIFwiXCIsIFwib25NZXNzYWdlUGFyYW1ldGVyc1VwZGF0ZWRcIiwgZmFsc2UsIGNvbnRleHQpO1xyXG4gICAgICAgIEJpbmRpbmdzLmNyZWF0ZUJ5RGVjbChCaW5kaW5nLkNvbXBvbmVudHMuQ29tcG9uZW50LldhdGNoYWJsZXMsIHRoaXMsIFwiXCIsIFwib25XYXRjaGFibGVQYXJhbWV0ZXJzVXBkYXRlZFwiLCBmYWxzZSwgY29udGV4dCk7XHJcbiAgICAgICAgQmluZGluZ3MuY3JlYXRlQnlEZWNsKEJpbmRpbmcuQ29tcG9uZW50cy5Db21wb25lbnQuV2F0Y2hhYmxlU3RhdGVzLCB0aGlzLCBcIlwiLCBcIm9uV2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzVXBkYXRlZFwiLCBmYWxzZSwgY29udGV4dCk7XHJcbiAgICAgICAgQmluZGluZ3MuY3JlYXRlQnlEZWNsKEJpbmRpbmcuQ29tcG9uZW50cy5Db21wb25lbnQuQ29uZmlndXJhdGlvbiwgdGhpcywgXCJcIiwgXCJvbkNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzVXBkYXRlZFwiLCBmYWxzZSwgY29udGV4dCk7XHJcbiAgICAgICAgQmluZGluZ3MuY3JlYXRlQnlEZWNsKEJpbmRpbmcuQ29tcG9uZW50cy5Db21wb25lbnQuUXVpY2tDb21tYW5kcywgdGhpcywgXCJcIiwgXCJvblF1aWNrQ29tbWFuZHNVcGRhdGVkXCIsIGZhbHNlLCBjb250ZXh0KTtcclxuICAgICAgICBCaW5kaW5ncy5jcmVhdGVCeURlY2woQmluZGluZy5Db21wb25lbnRzLkNvbXBvbmVudC5Vc2VyTWV0aG9kcywgdGhpcywgXCJcIiwgXCJvbk1ldGhvZHNVcGRhdGVkXCIsIGZhbHNlLCBjb250ZXh0KTtcclxuICAgICAgICBCaW5kaW5ncy5jcmVhdGVCeURlY2woQmluZGluZy5Db21wb25lbnRzLkNvbXBvbmVudC5BbGxNZXRob2RzLCB0aGlzLCBcIlwiLCBcIm9uQWxsTWV0aG9kc1VwZGF0ZWRcIiwgZmFsc2UsIGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGV4ZWN1dGVDb21tYW5kQ29ubmVjdCgpOiBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSwgYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGFzeW5jIChjb21tYW5kUGFycywgY29tbWFuZFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVCaW5kaW5ncygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlYWQgcGFyYW1ldGVyIGNvbXBvbmVudCBzZXRcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuY29ubmVjdENvbXBvbmVudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YSBsaW5rXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoKTtcclxuXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBjb25uZWN0Q29tcG9uZW50KCkge1xyXG4gICAgICAgIGxldCBtb2RlbDogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgPSAoPGFueT50aGlzKS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKG1vZGVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYnJvd3NlIHRoZSBjb21wb25lbnQgbWVtYmVyc1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgbW9kZWwuYnJvd3NlQ29tcG9uZW50KHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGludGl0aWFsbHkgdXBkYXRlIHRoZSBjb21wb25lbnRzIGFjY2VzcyByaWdodHNcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB3YXRjaCBhY2Nlc3MgcmlnaHQgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudDogQ291bGQgbm90IGNvbm5lY3QgY29tcG9uZW50LiAlb1wiLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHRocm93IChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzY29ubmVjdHMgdGhlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBkaXNjb25uZWN0Q29tcG9uZW50KCkge1xyXG5cclxuICAgICAgICBsZXQgbW9kZWw6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsID0gKDxhbnk+dGhpcykubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChtb2RlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRldGFjaCBjb21wb25lbnQgYWNjZXNzIHJpZ2h0cyBvYnNlcnZlcnNcclxuICAgICAgICAgICAgICAgIHRoaXMudW5vYnNlcnZlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB1bmJpbmQvZGlzcG9zZSBhbGwgYmluZGluZ3Mgb2YgdGhpcyBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgQmluZGluZ3MudW5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50OiBDb3VsZCBub3QgZGlzY29ubmVjdCBjb21wb25lbnQuICVvXCIsIGVycm9yKTtcclxuICAgICAgICAgICAgdGhyb3cgKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBleGVjdXRlQ29tbWFuZERpc2Nvbm5lY3QoKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksIGFueT4ge1xyXG4gICAgICAgIHJldHVybiBhc3luYyAoY29tbWFuZFBhcnMsIGNvbW1hbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT50aGlzKS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChtb2RlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmRpc2Nvbm5lY3RDb21wb25lbnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGNvbW1hbmQgaGFzIGJlZW4gZXhlY3V0ZWRcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgY2hhbmdlcyBvZiB0aGUgYWNjZXNzIHJpZ2h0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsfSBtYWluTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9ic2VydmVDb21wb25lbnRBY2Nlc3NSaWdodHMobWFpbk1vZGVsOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCkge1xyXG4gICAgICAgIG1haW5Nb2RlbC51c2VyUm9sZXMuYXR0YWNoT2JzZXJ2ZXIodGhpcywodXNlclJvbGVzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1haW5Nb2RlbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICAgKiB1bm9ic2VydmVzIGNoYW5nZXMgb2YgdGhlIGFjY2VzcyByaWdodHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbH0gbWFpbk1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1bm9ic2VydmVDb21wb25lbnRBY2Nlc3NSaWdodHMobWFpbk1vZGVsOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCkge1xyXG4gICAgICAgIG1haW5Nb2RlbC51c2VyUm9sZXMuZGV0YWNoT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnRycyBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9IG1haW5Nb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1haW5Nb2RlbDogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwpIHtcclxuICAgICAgICBsZXQgd3JpdGVBY2Nlc3MgPSBtYWluTW9kZWwud3JpdGVBY2Nlc3M7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIHJvbGVzIGNoYW5nZWQgJW8gd3JpdGUgYWNjZXNzID0lb1wiLCBtYWluTW9kZWwudXNlclJvbGVzLnZhbHVlLCB3cml0ZUFjY2Vzcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRNZW1iZXJBY2Nlc3NSaWdodHMod3JpdGVBY2Nlc3MpO1xyXG4gICAgICAgIHRoaXMud3JpdGVBY2Nlc3MudmFsdWUgPSB3cml0ZUFjY2VzcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGFjY2VzcyByaWdodHMgb2YgY29tcG9uZW50IG1lbWJlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHdyaXRlQWNjZXNzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVDb21wb25lbnRNZW1iZXJBY2Nlc3NSaWdodHMod3JpdGVBY2Nlc3M6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1ldGhvZHNBY2Nlc3NSaWdodHMod3JpdGVBY2Nlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgcGFyYW1ldGVycyBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVBhcmFtZXRlckFjY2Vzc1JpZ2h0cyh3cml0ZUFjY2VzczogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gcmV3cml0ZSB0aGUgcGFyYW1ldGVycyB3cml0ZSBhY2Nlc3MgcHJvcGVydHkgd2l0aCBpdHMgb3JpZ2luYWwgcmF3IHZhbHVlIHRvIGZvcmNlIHRyaWdnZXJpbmcgdGhlIGNoYW5nZWQgZXZlbnQuIFRoaXMgaXMganVzdCBhIHdvcmthcm91bmRcclxuICAgICAgICAgICAgLy8gdG8gZml4IHRoZSBsb2cgaW4vb3V0IHByb2JsZW0gZGlzcGxheWluZyB3cm9uZyByZWFkb25seSBzdGF0ZXMuXHJcbiAgICAgICAgICAgIC8vIHRoZSB3b3JrYXJvdW5kIGlzIGludGVuZGVkIHRvIGJlIHJlcGxhY2VkIGJ5IHByb3BlciBiYXRjaCByZWZyZXNoIHJlcXVlc3RzIVxyXG4gICAgICAgICAgICBwYXJhbWV0ZXIuaXNXcml0ZWFibGUudmFsdWUgPSAoPGFueT5wYXJhbWV0ZXIuaXNXcml0ZWFibGUpLl92YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIG1ldGhvZHMgYWNjZXNzIHJpZ2h0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZU1ldGhvZHNBY2Nlc3NSaWdodHMod3JpdGVBY2Nlc3M6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIHRoaXMubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcclxuICAgICAgICAgICAgbWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9IHdyaXRlQWNjZXNzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBzZXJ2aWNlIGNoYW5uZWxcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KE1hcHBDb2NrcGl0Q29tcG9uZW50U2VydmljZXxudWxsKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHNlcnZpY2VDaGFubmVsKCkgOiBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2V8bnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFNlcnZpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlcnZpY2UgY2hhbm5lbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHNlcnZpY2VDaGFubmVsKHNlcnZpY2VDaGFubmVsIDogTWFwcENvY2twaXRDb21wb25lbnRTZXJ2aWNlfG51bGwpIHtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlID0gc2VydmljZUNoYW5uZWwgO1xyXG4gICAgfVxyXG4gICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0cy9nZXRzIHRoZSBwYXJhbWV0ZXJzIG9mIHRoZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZ2V0IG1ldGhvZHMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWV0aG9kcyhtZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4pIHtcclxuICAgICAgICB0aGlzLl9tZXRob2RzID0gbWV0aG9kcztcclxuICAgICAgICB0aGlzLm9uQWxsTWV0aG9kc1VwZGF0ZWQodGhpcy5fbWV0aG9kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHF1aWNrQ29tbWFuZHMoKTogQXJyYXk8TWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcXVpY2tDb21tYW5kcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcXVpY2tDb21tYW5kcyhxdWlja0NvbW1hbmRzOiBBcnJheTxNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9xdWlja0NvbW1hbmRzID0gcXVpY2tDb21tYW5kcztcclxuICAgICAgICB0aGlzLm9uUXVpY2tDb21tYW5kc1VwZGF0ZWQodGhpcy5fcXVpY2tDb21tYW5kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVzZXJNZXRob2RzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJNZXRob2RzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB1c2VyTWV0aG9kcyhtZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4pIHtcclxuICAgICAgICB0aGlzLl91c2VyTWV0aG9kcyA9IG1ldGhvZHM7XHJcbiAgICAgICAgdGhpcy5vbk1ldGhvZHNVcGRhdGVkKHRoaXMuX3VzZXJNZXRob2RzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTWV0aG9kc1VwZGF0ZWQodXNlck1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10pIHtcclxuICAgICAgICAvL0JJTkRJTkdTT1VSQ0U6IG1ldGhvZCBzdHViIHN1cHBvcnRpbmcgYmluZGFiaWxpdHlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQWxsTWV0aG9kc1VwZGF0ZWQoYWxsTWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSkge1xyXG4gICAgICAgIC8vQklORElOR1NPVVJDRTogbWV0aG9kIHN0dWIgc3VwcG9ydGluZyBiaW5kYWJpbGl0eVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25RdWlja0NvbW1hbmRzVXBkYXRlZChxdWlja0NvbW1hbmRzOiBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgLy9CSU5ESU5HU09VUkNFOiBtZXRob2Qgc3R1YiBzdXBwb3J0aW5nIGJpbmRhYmlsaXR5XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0cy9nZXRzIHRoZSBwYXJhbWV0ZXJzIG9mIHRoZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZ2V0IHBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGFyYW1ldGVycyhwYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2F0Y2hhYmxlUGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB3YXRjaGFibGVQYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRoaXMub25XYXRjaGFibGVQYXJhbWV0ZXJzVXBkYXRlZCh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uV2F0Y2hhYmxlUGFyYW1ldGVyc1VwZGF0ZWQocGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IG1ldGhvZCBzdHViIHN1cHBvcnRpbmcgYmluZGFiaWxpdHlcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMocGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRoaXMub25XYXRjaGFibGVTdGF0ZVBhcmFtZXRlcnNVcGRhdGVkKHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbldhdGNoYWJsZVN0YXRlUGFyYW1ldGVyc1VwZGF0ZWQocGFyYW1ldGVyczogTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogbWV0aG9kIHN0dWIgc3VwcG9ydGluZyBiaW5kYWJpbGl0eVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtZXNzYWdlUGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWVzc2FnZVBhcmFtZXRlcnMocGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRoaXMub25NZXNzYWdlUGFyYW1ldGVyc1VwZGF0ZWQodGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25NZXNzYWdlUGFyYW1ldGVyc1VwZGF0ZWQocGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IG1ldGhvZCBzdHViIHN1cHBvcnRpbmcgYmluZGFiaWxpdHlcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29uZmlndXJhdGlvblBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlndXJhdGlvblBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcclxuICAgICAgICB0aGlzLm9uQ29uZmlndXJhdGlvblBhcmFtZXRlcnNVcGRhdGVkKHRoaXMuX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ29uZmlndXJhdGlvblBhcmFtZXRlcnNVcGRhdGVkKHBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBtZXRob2Qgc3R1YiBzdXBwb3J0aW5nIGJpbmRhYmlsaXR5XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIGNvbXBvbmVudHMgcGFyYW1ldGVyIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn0gZGF0YUxpbmtcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIC8qcHJpdmF0ZSBhc3luYyByZXF1ZXN0UmVhZENvbXBvbmVudFBhcmFtZXRlcnMoZGF0YUxpbms6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+KTogUHJvbWlzZTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPiB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10gPSBbXTtcclxuICAgICAgICAvLyBnZXQgdGhlIGNvbXBvbmVudHMgbWFpbiBtb2RlbFxyXG4gICAgICAgIGxldCBtb2RlbCA9ICg8YW55PnRoaXMpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVhZCBwYXJhbWV0ZXIgY29tcG9uZW50IHNldFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50UGFyYW1ldGVycyA9IGF3YWl0IG1vZGVsLmJyb3dzZVBhcmFtZXRlcnModGhpcyk7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGEgbGlua1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RFeGVjdXRlZChjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0UmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFBhcmFtZXRlcnM7XHJcbiAgICB9Ki9cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoZXMgdGhlIGNvbXBvbmVudHMgbWV0aG9kc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXT59IGRhdGFMaW5rXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICAvKnByaXZhdGUgYXN5bmMgcmVxdWVzdFJlYWRDb21wb25lbnRNZXRob2RzKGRhdGFMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPik6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10gPSBbXTtcclxuICAgICAgICAvLyBnZXQgdGhlIGNvbXBvbmVudHMgbWFpbiBtb2RlbFxyXG4gICAgICAgIGxldCBtb2RlbCA9ICg8YW55PnRoaXMpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVhZCBwYXJhbWV0ZXIgY29tcG9uZW50IHNldFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50TWV0aG9kcyA9IGF3YWl0IG1vZGVsLmJyb3dzZU1ldGhvZHModGhpcyk7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGEgbGlua1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RFeGVjdXRlZChjb21wb25lbnRNZXRob2RzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0UmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudE1ldGhvZHM7XHJcbiAgICB9Ki9cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIGdldHMgdGhlIG1ldGEgZGF0YSBvZiBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGdldCBtZXRhRGF0YSgpOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YURhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1ldGFEYXRhKG1ldGFEYXRhOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fbWV0YURhdGEgPSBtZXRhRGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgb3IgbWFya3MgdGhlIGNvbXBvbmVudCBhcyB1c2VyIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGNvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlZ2lzdGVyVXNlckNvbXBvbmVudChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KTogdm9pZCB7XHJcbiAgICAgICAgKDxhbnk+Y29tcG9uZW50KS5pc1VzZXJDb21wb25lbnQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgY29tcG9uZW50IGlzIGEgdXNlciBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBjb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc1VzZXJDb21wb25lbnQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoPGFueT5jb21wb25lbnQpLmlzVXNlckNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgaW1wbGVtZW50cyBtZXRob2QgYWNjZXNzLlxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIGV4dGVuZHMgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHtcclxuXHJcbiAgICAvLyBIb2xkcyB0aGUgbWV0aG9kIHBhcmFtZXRlcnNcclxuICAgIHByaXZhdGUgX2lucHV0UGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXI+ID0gW107XHJcbiAgICBcclxuICAgIC8vIHNwZWNlZmllcyBpZiB0aGUgbWV0aG9kIGlzIGV4ZWN1dGFibGVcclxuICAgIHByb3RlY3RlZCBfaXNFeGVjdXRhYmxlOiBQcm9wZXJ0eTxib29sZWFuPiA9IFByb3BlcnR5LmNyZWF0ZTxib29sZWFuPihmYWxzZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsICh2YWx1ZSkgPT4gdGhpcy5tZXRob2RJc0V4ZWN1dGFibGUodmFsdWUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGlucHV0IHBhcmFtZXRlcnMgb2YgdGhlIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlucHV0UGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpbnB1dFBhcmFtZXRlcnModmFsdWU6IEFycmF5PE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX2lucHV0UGFyYW1ldGVycyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgZXhlY3V0aW9uIG9mIHRoZSBjb21wb25lbnQgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gY29tcG9uZW50TWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZXhlY3V0ZShjb21wb25lbnRNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAvLyBnZXQgdGhlIG1ldGhvZHMgbW9kZWwgZnJvbSB0aGUgcGFyZW50IGNvbXBvbmVudFxyXG4gICAgICAgIGxldCBtb2RlbCA9ICg8YW55PmNvbXBvbmVudE1ldGhvZC5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIGlmIChtb2RlbCAmJiBtb2RlbC5leGVjdXRlQ29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIC8vIGludm9rZSB0aGUgZXhlY3V0aW9uIG9mIHRoZSBtZXRob2RcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IG1vZGVsLmV4ZWN1dGVDb21wb25lbnRNZXRob2QoY29tcG9uZW50TWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBhIG1ldGhvZCBieSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWVcclxuICAgICAqIEBwYXJhbSB7KE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW118dW5kZWZpbmVkKX0gY29tcG9uZW50TWV0aG9kc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbaW5jbHVkZUludGVybmFscz10cnVlXVxyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfHVuZGVmaW5lZH1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZmluZChtZXRob2ROYW1lOiBzdHJpbmcsIGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10gfCB1bmRlZmluZWQsIGluY2x1ZGVJbnRlcm5hbHM6IGJvb2xlYW4gPSB0cnVlKTogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfCB1bmRlZmluZWQge1xyXG5cclxuICAgICAgICBsZXQgbWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgaWYgKGNvbXBvbmVudE1ldGhvZHMpIHtcclxuICAgICAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGV4ZWN1dGFibGUgbWV0aG9kc1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4ZWN1dGFibGVNZXRob2RzID0gaW5jbHVkZUludGVybmFscyA/ICg8YW55PmNvbXBvbmVudE1ldGhvZHNbMF0pLmNvbXBvbmVudC5tZXRob2RzIDogY29tcG9uZW50TWV0aG9kcztcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdNZXRob2RzID0gZXhlY3V0YWJsZU1ldGhvZHMuZmlsdGVyKChtZXRob2QpID0+IHsgcmV0dXJuIG1ldGhvZC5icm93c2VOYW1lID09PSBtZXRob2ROYW1lIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoaW5nTWV0aG9kcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSByZXF1ZXN0ZWQgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kID0gbWF0Y2hpbmdNZXRob2RzWzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWV0aG9kO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBpZiB0aGUgbWV0aG9kIGlzIGV4ZWN1dGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtQcm9wZXJ0eTxib29sZWFuPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzRXhlY3V0YWJsZSgpOiBQcm9wZXJ0eTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRXhlY3V0YWJsZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBtZXRoaWQgaXMgZXhlY3V0YWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhlY3V0YWJsZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtZXRob2RJc0V4ZWN1dGFibGUoZXhlY3V0YWJsZTogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgbGV0IGlzRXhlY3V0YWJsZVZhbHVlID0gZXhlY3V0YWJsZTtcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT50aGlzLmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgaWYgKG1vZGVsICYmIHRoaXMuY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIC8vIGVuYWJsZSBtZXRob2QgZXhlY3V0aW9uIGZvciBub24gdXNlciBjb21wb25lbnRzXHJcbiAgICAgICAgICAgIGlzRXhlY3V0YWJsZVZhbHVlID0gTWFwcENvY2twaXRDb21wb25lbnQuaXNVc2VyQ29tcG9uZW50KHRoaXMuY29tcG9uZW50IGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50KSA/IGlzRXhlY3V0YWJsZVZhbHVlIDogdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRXhlY3V0YWJsZVZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbWV0aG9kcyBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gY29tcG9uZW50TWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgdXBkYXRlSW5wdXRQYXJhbWV0ZXJzKGNvbXBvbmVudE1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBQcm9taXNlPE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW10+IHtcclxuICAgICAgICAvLyBnZXQgdGhlIG1ldGhvZHMgbW9kZWwgZnJvbSB0aGUgcGFyZW50IGNvbXBvbmVudFxyXG4gICAgICAgIGxldCBtb2RlbCA9ICg8YW55PmNvbXBvbmVudE1ldGhvZC5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIGlmIChtb2RlbCAmJiBtb2RlbC5leGVjdXRlQ29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IG1vZGVsLmJyb3dzZU1ldGhvZElucHV0UGFyYW1ldGVycyhjb21wb25lbnRNZXRob2QpO1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kSW5wdXRQYXJhbWV0ZXJzKGNvbXBvbmVudE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgTWFwcENvY2twaXRQYXJhbWV0ZXIgZXh0ZW5kcyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0ge1xyXG4gICAgLy8gaG9sZHMgdGhlIHBhcmFtZXRlcnMgdHlwZVxyXG4gICAgcHJvdGVjdGVkIF9kYXRhVHlwZTogTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSA9IG5ldyBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlKCk7XHJcbiAgICBcclxuICAgIC8vIHJlZmVyZW5jZSB0byB0aGUgZW51bSBpbmZvcm1hdGlvblxyXG4gICAgcHJvdGVjdGVkIF9lbnVtUmVmOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0gPSBuZXcgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtKG51bGwpO1xyXG4gICAgXHJcbiAgICAvLyBob2xkcyB0aGUgZW5naW5lZXJpbmcgdW5pdCBuYW1lIGZvciB0aGlzIHBhcmFtZXRlclxyXG4gICAgcHJvdGVjdGVkIF9lbmdpbmVlcmluZ1VuaXQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBcclxuICAgIC8vIGhvbGRzIHRoZSBtb2RpZmllZCB2YWx1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBwYXJhbWV0ZXIgd2FzIGFscmVhZHkgY2hhbmdlZCBpbiB0aGUgdWlcclxuICAgIHByb3RlY3RlZCBfbW9kaWZpZWRWYWx1ZTogYW55ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIC8vIHdhcyB0aGVyZSBhbiBlcnJvciBhdCB0aGUgbGFzdCB0cmFuc2ZlciBvZiB0aGlzIHBhcmFtZXRlclxyXG4gICAgcHJvdGVjdGVkIF90cmFuc2ZlckZhaWxlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIGlzIGl0IGFsbG93ZWQgdG8gY2hhbmdlL3dyaXRlIHRoaXMgaXRlbSBpbiBnZW5lcmFsXHJcbiAgICBwcm90ZWN0ZWQgX2lzUmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgLy8gaXMgaXQgYWxsb3dlZCB0byB3cml0ZSB0aGlzIHBhcmFtZXRlciBhdCB0aGUgY3VycmVudCBzdGF0ZVxyXG4gICAgcHJvdGVjdGVkIF9pc1dyaXRhYmxlOiBQcm9wZXJ0eTxib29sZWFuPiA9IFByb3BlcnR5LmNyZWF0ZTxib29sZWFuPihmYWxzZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsICh2YWx1ZSkgPT4gdGhpcy5wYXJhbWV0ZXJJc1dyaXRhYmxlKHZhbHVlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwYXJhbWV0ZXJzIHZhbHVlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyhNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGFUeXBlKCk6IE1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGFUeXBlKGRhdGFUeXBlOiBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVR5cGUgPSBkYXRhVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVuZ2luZWVyaW5nVW5pdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmdpbmVlcmluZ1VuaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBlbmdpbmVlcmluZ1VuaXQoZW5naW5lZXJpbmdVbml0OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9lbmdpbmVlcmluZ1VuaXQgPSBlbmdpbmVlcmluZ1VuaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBlbnVtVHlwZSgpOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtUmVmO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZW51bVR5cGUoZW51bVJlZjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtKSB7XHJcbiAgICAgICAgdGhpcy5fZW51bVJlZiA9IGVudW1SZWY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0cnVlIGlmIGl0IGlzIG5vdCBwb3NzaWJsZSB0byBjaGFuZ2UgdGhlIHZhbHVlIG9mIHRoaXMgcGFyYW1ldGVyLCBlbHNlIGZhbHNlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBnZXQgaXNSZWFkT25seSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNSZWFkT25seTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzUmVhZE9ubHkoaXNSZWFkT25seTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2lzUmVhZE9ubHkgPSBpc1JlYWRPbmx5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdHJ1ZSBpZiB0aGUgdGhlIHBhcmFtZXRlciB2YWx1ZSBjYW4gbm90IGJlIHdyaXR0ZW4gYXQgdGhlIGN1cnJlbnQgc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtQcm9wZXJ0eTxib29sZWFuPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzV3JpdGVhYmxlKCk6IFByb3BlcnR5PGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNXcml0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIHByb3BlcnRpZXMgdmFsdWUgaXMgd3JpdGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyYW1ldGVySXNXcml0YWJsZSh3cml0YWJsZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCB3cml0YWJsZVZhbHVlID0gd3JpdGFibGU7XHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+dGhpcy5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgICAgICB3cml0YWJsZVZhbHVlID0gd3JpdGFibGUgJiYgbW9kZWwud3JpdGVBY2Nlc3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3cml0YWJsZVZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cnVucyB0aGUgZGlzcGxheSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVRvU3RyaW5nKHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRpc3BsYXkgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBkaXNwbGF5VmFsdWUoaW5wdXRWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy52YWx1ZUZyb21TdHJpbmcoaW5wdXRWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRQYXJhbWV0ZXIuc2V0RGlzcGxheVZhbHVlICVvIGZvciAlb1wiLCB0aGlzLnZhbHVlLCBpbnB1dFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1vZGlmaWVkIHBhcmFtZXRlciB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1vZGlmaWVkVmFsdWUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kaWZpZWRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1vZGlmaWVkIHBhcmFtZXRlciB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBtb2RpZmllZFZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9tb2RpZmllZFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtb2RpZmllZCBkaXNwbGF5IHBhcmFtZXRlciB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1vZGlmaWVkRGlzcGxheVZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgaWYodGhpcy5fbW9kaWZpZWRWYWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVRvU3RyaW5nKHRoaXMuX21vZGlmaWVkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVRvU3RyaW5nKHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlKTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtb2RpZmllZCBkaXNwbGF5IHBhcmFtZXRlciB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBtb2RpZmllZERpc3BsYXlWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy52YWx1ZUZyb21TdHJpbmcodmFsdWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX21vZGlmaWVkVmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRydWUgaWYgdHJhbnNmZXIgb2YgbW9kaWZpZmVkIHZhbHVlIHdhcyBub3QgcG9zc2libGVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRyYW5zZmVyRmFpbGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zZmVyRmFpbGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBzZXQgdG8gdHJ1ZSBpZiB0cmFuc2ZlciBvZiBtb2RpZmlmZWQgdmFsdWUgd2FzIG5vdCBwb3NzaWJsZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHRyYW5zZmVyRmFpbGVkKHZhbHVlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl90cmFuc2ZlckZhaWxlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29udmVydHMgdGhlIHBhcmFtZXRlciB2YWx1ZSB0byBhIGZvcm1hdHRlZCBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHZhbHVlVG9TdHJpbmcodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHZhbHVlU3RyaW5nID0gXCJcIjtcclxuICAgICAgICAvLyBhdm9pZCBjb252ZXJ0aW5nIG51bGwgb3IgdW5kZWZpbmVkIHZhbHVlXHJcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhbHVlU3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdmFsdWVTdHJpbmcgPSBOdW1lcmljSGVscGVyLmNvbnZlcnROdW1lcmljU3RyaW5nKHZhbHVlU3RyaW5nLCB0aGlzLmRhdGFUeXBlLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbnVtVHlwZS5pc0RlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlU3RyaW5nID0gdGhpcy5lbnVtVHlwZS5nZXREaXNwbGF5VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZVN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnZlcnRzIGEgcGFyYW1ldGVyIHZhbHVlIHN0cmluZyB0byBhIHZhbHVlIGFjY29yZGluZyB0byB0aGUgcGFyYW1ldGVycyBkYXRhIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRWYWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgdmFsdWVGcm9tU3RyaW5nKGlucHV0VmFsdWU6IHN0cmluZyk6IGFueSB7XHJcblxyXG4gICAgICAgIC8vIHNldCBhbiBlbXB0eSBzdHJpbmcgZm9yIGFuIHVuZGVmaW5lZCBpbnB1dCB2YWx1ZVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IGlucHV0VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBpbnB1dFZhbHVlICE9PSBudWxsID8gaW5wdXRWYWx1ZSA6IFwiXCI7XHJcblxyXG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIGVudW0gc3RyaW5nIGJ5IHRoZSB2YWx1ZSBpZiB0aGVyZSBpcyBvbmUgZGVmaW5lZC5cclxuICAgICAgICBpZiAodGhpcy5lbnVtVHlwZS5pc0RlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudW1UeXBlLmdldFZhbHVlKGlucHV0VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgaW1wbGVtZW50cyBhIGNvbXBvbmVudCBwYXJhbWV0ZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciBleHRlbmRzIE1hcHBDb2NrcGl0UGFyYW1ldGVyIHtcclxuXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHwgbnVsbCwgbmFtZTogc3RyaW5nLCByZWZlcmVuY2U6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKGNvbXBvbmVudCwgbmFtZSwgcmVmZXJlbmNlKTtcclxuICAgICAgICB0aGlzLl92YWx1ZVNvdXJjZSA9IFByb3BlcnR5LmNyZWF0ZTxhbnk+KFwiXCIsIHVuZGVmaW5lZCwgKGRhdGFMaW5rKSA9PiB0aGlzLnJlcXVlc3RXcml0ZVZhbHVlKGRhdGFMaW5rKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIHRoZSBjdXJyZW50IHBhcmFtZXRlciB2YWx1ZSB0byB0YXJnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgd3JpdGUocmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlOiAoKHJlc3VsdERhdGE6IGFueSkgPT4gdm9pZCkgfCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgLy8gY29ubmVjdCB0aGUgd3JpdGUgcmVzcG9uc2UgZGVsZWdhdGVcclxuICAgICAgICB0aGlzLnJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZSA9IHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTtcclxuXHJcbiAgICAgICAgLy8gZXhlY3V0ZSB3cml0aW5nIHRoZSBwYXJhbWV0ZXIgdmFsdWVcclxuICAgICAgICB0aGlzLnZhbHVlU291cmNlLndyaXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgdGhlIGRhdGEgbGlua3MgdmFsdWUgdG8gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8YW55Pn0gZGF0YUxpbmtcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlcXVlc3RXcml0ZVZhbHVlKGRhdGFMaW5rOiBQcm9wZXJ0eTxhbnk+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50O1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50ICYmICg8YW55PmNvbXBvbmVudCkubW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9ICg8YW55PmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBtb2RlbC53cml0ZUNvbXBvbmVudFBhcmFtZXRlcih0aGlzKTtcclxuICAgICAgICAgICAgICAgIGRhdGFMaW5rLndyaXRlUmVxdWVzdEV4ZWN1dGVkKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgZGF0YUxpbmsud3JpdGVSZXF1ZXN0UmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWF0ZXMgdGhlIG9ic2VydmF0aW9uIG9mIHBhcmFtZXRlciB2YWx1ZSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgb2JzZXJ2ZVBhcmFtZXRlclZhbHVlQ2hhbmdlcyhvYnNlcnZlcjogSU9ic2VydmVyLCBvYnNlcnZhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKG9ic2VydmFibGVQYXJhbWV0ZXJzLmxlbmd0aCA+IDAgJiYgb2JzZXJ2YWJsZVBhcmFtZXRlcnNbMF0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgcGFyYW1ldGVycyBtb2RlbCBmcm9tIHRoZSBwYXJlbnQgY29tcG9uZW50XHJcbiAgICAgICAgICAgIGxldCBtb2RlbCA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmdldE1vZGVsKG9ic2VydmFibGVQYXJhbWV0ZXJzWzBdKTtcclxuICAgICAgICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLm9ic2VydmVEYXRhTW9kZWxJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW52b2tlIHRoZSBvYnNlcnZhdGlvbiBvbiB0aGUgbW9kZWxcclxuICAgICAgICAgICAgICAgIGF3YWl0IG1vZGVsLm9ic2VydmVEYXRhTW9kZWxJdGVtcyhvYnNlcnZlciwgb2JzZXJ2YWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIG1vZGVsIGl0ZW1zIHJlZ2lzdGVyZWQgZm9yIG9ic2VydmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBvYnNlcnZhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBvYnNlcnZhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAgICAgLy9UT0RPOiBpbXBsZW1lbnQgbW9kZWwgaXRlbSBhY3RpdmF0aW9uIGhhbmRsaW5nXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5vYnNlcnZlcyBhbGwgb2JzZXJ2YWJsZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBvYnNlcnZlclxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gb2JzZXJ2ZWRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzdXNwZW5kPXRydWVdIHN1c3BlbmRzIHRoZSBvYnNlcnZhdGlvbiBpZiB0cnVlIG90aGVyd2lzZSByZW1vdmVzIHRoZSB3aG9sZSBzdWJzY3JpcHRpb25cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgdW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBvYnNlcnZlZFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10gPSBbXSwgc3VzcGVuZDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBpZiAob2JzZXJ2ZWRQYXJhbWV0ZXJzLmxlbmd0aCA+IDAgJiYgb2JzZXJ2ZWRQYXJhbWV0ZXJzWzBdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5nZXRNb2RlbChvYnNlcnZlZFBhcmFtZXRlcnNbMF0pO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW52b2tlIHRoZSB1bm9ic2VydmF0aW9uIG9uIHRoZSBtb2RlbFxyXG4gICAgICAgICAgICAgICAgYXdhaXQgbW9kZWwudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlciwgb2JzZXJ2ZWRQYXJhbWV0ZXJzLCBzdXNwZW5kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbm9ic2VydmVzIGFsbCBjb25uZWN0ZWQgcGFyYW1ldGVycyBvZiB0aGUgc3BlY2lmaWVkIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7KE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGwpfSBjb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgdW5vYnNlcnZlQWxsKG9ic2VydmVyOiBhbnksIGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHwgbnVsbCkge1xyXG5cclxuICAgICAgICBpZiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9ICg8YW55PmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlbCAmJiBtb2RlbC51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbWl0dGluZyBhIHBhcmFtZXRlciBsaXN0IGZvcmNlcyB1bm9ic2VydmluZyBldmVyeSBvYnNlcnZhYmxlcyBvZiB0aGUgc3BlY2lmaWVkIG9ic2VydmVyXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBtb2RlbC51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyLCBbXSwgZmFsc2UpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI6IHVub2JzZXJ2ZWQgJW9cIiwgb2JzZXJ2ZXIpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZXMgbW9kZWwgaXRlbXMgcmVnaXN0ZXJlZCBmb3Igb2JzZXJ2YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmVkUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbc3VzcGVuZD10cnVlXVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBkZWFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBvYnNlcnZlZFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHN1c3BlbmQ6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgLy9UT0RPOiBpbXBsZW1lbnQgbW9kZWwgaXRlbSBkZWFjdGl2YXRpb24gaGFuZGxpbmdcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwYXJhbWV0ZXJzIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gb2JzZXJ2YWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TW9kZWwoY29tcG9uZW50UGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIGlmICghY29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wb25lbnRQYXJhbWV0ZXIgdW5kZWZpbmVkICFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29tcG9uZW50UGFyYW1ldGVyLmNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY29tcG9uZW50UGFyYW1ldGVyLmNvbXBvbmVudCB1bmRlZmluZWQgIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICg8YW55PmNvbXBvbmVudFBhcmFtZXRlci5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIGNsYXNzIHVzZWQgZm9yIHN0YXRlIGljb25zXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyIHtcclxuXHJcbiAgICAvLyBIb2xkcyBuYW1lIG9mIHdhdGNoYWJsZSBzdGF0ZSBwYXJhbWV0ZXJcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgIC8vIEhvbGRzIHdhdGNoYWJsZSBzdGF0ZSBleHByZXNzaW9uIGNsYXNzXHJcbiAgICBwdWJsaWMgc3RhdGVFeHByZXNzaW9uID0gbmV3IFdhdGNoYWJsZVN0YXRlRXhwcmVzc2lvbigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZXhwcmVzc2lvbjogc3RyaW5nLCB3YXRjaGFibGVNYXBwaW5nOiBBcnJheTxbc3RyaW5nLCBzdHJpbmddPiwgaWNvbikge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuc3RhdGVFeHByZXNzaW9uID0gbmV3IFdhdGNoYWJsZVN0YXRlRXhwcmVzc2lvbihuYW1lLCBleHByZXNzaW9uLCB3YXRjaGFibGVNYXBwaW5nLCBpY29uKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBhIG1ldGhvZCBwYXJhbWV0ZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyXHJcbiAqIEBleHRlbmRzIHtNYXBwQ29ja3BpdFBhcmFtZXRlcn1cclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyIGV4dGVuZHMgTWFwcENvY2twaXRQYXJhbWV0ZXIge1xyXG5cclxuICAgIC8vIEhvbGRzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBmaWx0ZXIgbWVjaGFuaXNtXHJcbiAgICBwcml2YXRlIF9maWx0ZXI6IFBhcmFtZXRlckZpbHRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGwsIG5hbWU6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihjb21wb25lbnQsIG5hbWUsIHJlZmVyZW5jZSk7XHJcbiAgICAgICAgdGhpcy5fZmlsdGVyID0gbmV3IFBhcmFtZXRlckZpbHRlcigpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGZpbHRlcihmaWx0ZXI6IFBhcmFtZXRlckZpbHRlcikge1xyXG4gICAgICAgIHRoaXMuX2ZpbHRlciA9IGZpbHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZmlsdGVyKCk6IFBhcmFtZXRlckZpbHRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlcjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIGNsYXMgZm9yIHF1aWNrY29tbWFuZHNcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB7XHJcblxyXG4gICAgLy9Ib2xkcyBuYW1lIG9mIG1ldGhvZCBwYXJhbWV0ZXJcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgIC8vSG9sZHMgdG9vbHRpcCBpbmZvcm1hdGlvblxyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcDogc3RyaW5nO1xyXG4gICAgLy9Ib2xkcyBuYW1lIG9mIGltYWdlIHVzZWRcclxuICAgIHByaXZhdGUgX2ltYWdlTmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdG9vbHRpcDogc3RyaW5nLCBpbWFnZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0b29sdGlwO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlTmFtZSA9IGltYWdlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXAoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGltYWdlTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2VOYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZGVmaW5lcyB0aGUgcGFyYW1ldGVyIGRhdGEgdHlwZVxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJEYXRhVHlwZVxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSB7XHJcbiAgICBwcml2YXRlIF9kYXRhVHlwZUlkID0gXCJ1bmRlZmluZWRcIjtcclxuICAgIHByaXZhdGUgX2RhdGFUeXBlTmFtZSA9IFwidW5kZWZpbmVkXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YVR5cGVJZDogc3RyaW5nID0gXCJ1bmRlZmluZWRcIiwgZGF0YVR5cGVOYW1lOiBzdHJpbmcgPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVR5cGVJZCA9IGRhdGFUeXBlSWQ7XHJcbiAgICAgICAgdGhpcy5fZGF0YVR5cGVOYW1lID0gZGF0YVR5cGVOYW1lO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGlmIHRoZSBkYXRhIHR5cGUgaXMgZGVmaW5lZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICAgZ2V0IGlzRGVmaW5lZCgpe1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVR5cGVJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGlzLl9kYXRhVHlwZU5hbWUgIT09IFwidW5kZWZpbmVkXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcywgdGhpcy5fZGF0YVR5cGVJZFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhVHlwZU5hbWVcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgYSBzaW5nbGUgZW51bSB2YWx1ZSB3aXRoIHZhbHVlIGFuZCBzdHJpbmdcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZSBpbXBsZW1lbnRzIElWYWx1ZUxpc3RJdGVtIHtcclxuICAgIF9kaXNwbGF5VmFsdWU6IHN0cmluZyA9IFwidW5kZWZpbmVkXCI7XHJcbiAgICBfdmFsdWU6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlUZXh0XHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGlzcGxheVRleHQ6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlWYWx1ZSA9IGRpc3BsYXlUZXh0O1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSB2YWx1ZSBvZiB0aGUgZW51bVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHN0cmluZyBvZiB0aGUgZW51bSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5VmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBhIHBhcmFtZXRlciBlbnVtIGhvbGRpbmcgYSBjb2xsZWN0aW9uIG9mIGVudW0gaXRlbXNcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtIHtcclxuXHJcbiAgICBwcml2YXRlIF9icm93c2VOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIF9lbnVtVmFsdWVzUmVmZXJlbmNlOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfZW51bVZhbHVlcyE6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVudW1WYWx1ZXNSZWZlcmVuY2U6IGFueSA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9lbnVtVmFsdWVzUmVmZXJlbmNlID0gZW51bVZhbHVlc1JlZmVyZW5jZTtcclxuICAgICAgICBpZiAodGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9icm93c2VOYW1lID0gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5icm93c2VOYW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9lbnVtVmFsdWVzID0gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5lbnVtVmFsdWVzLm1hcCgoZW51bVZhbHVlUmVmKSA9PiB7IHJldHVybiBuZXcgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWUoZW51bVZhbHVlUmVmLmRpc3BsYXlOYW1lLnRleHQsIGVudW1WYWx1ZVJlZi52YWx1ZSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGJyb3dzZSBuYW1lIG9mIHRoZSBlbnVtXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGJyb3dzZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5icm93c2VOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgY29sbGVjdGlvbiBvZiBlbnVtIGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZXMoKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudW1WYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXRlcm1pbmVzIGlmIHRoZSBlbnVtIGlzIGRlZmluZWQgYW5kIGNvbnRhaW5zIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNEZWZpbmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtVmFsdWVzICYmIHRoaXMuX2VudW1WYWx1ZXMubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIGEgc3RyaW5nIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgZW51bSB2YWx1ZSwgb3RoZXJ3aXNlIHJldHVybiB2YWx1ZSBzdHJpbmcgYXMgZGVmYXVsdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheVZhbHVlKGVudW1WYWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgICAgICAvLyBnZXQgYW4gZW51bSBpdGVtIG1hdGNoaW5nIHRoZSByZXF1ZXN0ZWQgdmFsdWVcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuZmluZE1hdGNoaW5nRW51bUl0ZW1CeVZhbHVlKGVudW1WYWx1ZSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdmFsdWUgc3RyaW5nIHRvIHRoZSBtYXRjaGluZyBvbmUgb3IgdXNlIHRoZSBkZWZhdWx0IHN0cmluZ1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWVTdHJpbmcgPSBtYXRjaGluZ0VudW1JdGVtID8gbWF0Y2hpbmdFbnVtSXRlbS5kaXNwbGF5VmFsdWUgOiBlbnVtVmFsdWUudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVudW1WYWx1ZVN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0VmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZShlbnVtRGlzcGxheVZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWUgPSBlbnVtRGlzcGxheVZhbHVlO1xyXG4gICAgICAgIC8vIGdldCBhbiBlbnVtIGl0ZW0gbWF0Y2hpbmcgdGhlIHJlcXVlc3RlZCBzdHJpbmdcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuZmluZE1hdGNoaW5nRW51bUl0ZW1CeVN0cmluZyhlbnVtRGlzcGxheVZhbHVlKTtcclxuICAgICAgICBpZiAobWF0Y2hpbmdFbnVtSXRlbSkge1xyXG4gICAgICAgICAgICBlbnVtVmFsdWUgPSBtYXRjaGluZ0VudW1JdGVtLnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0uZ2V0VmFsdWU6IGNvdWxkIG5vdCBmaW5kIG1hdGNoaW5nIGVudW0gdmFsdWUgZm9yICVvXCIsIGVudW1EaXNwbGF5VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVudW1WYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmluZCBhbiBlbnVtIGl0ZW0gd2l0aCBtYXRjaGluZyB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVudW1WYWx1ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTWF0Y2hpbmdFbnVtSXRlbUJ5VmFsdWUoZW51bVZhbHVlOiBhbnkpIHtcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuX2VudW1WYWx1ZXMuZmlsdGVyKChlbnVtSXRlbSkgPT4geyByZXR1cm4gZW51bUl0ZW0udmFsdWUgPT0gZW51bVZhbHVlOyB9KTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdFbnVtSXRlbS5sZW5ndGggPT09IDEgPyBtYXRjaGluZ0VudW1JdGVtWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmluZCBhbiBlbnVtIGl0ZW0gd2l0aCBtYXRjaGluZyBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW51bURpc3BsYXlWYWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIGZpbmRNYXRjaGluZ0VudW1JdGVtQnlTdHJpbmcoZW51bURpc3BsYXlWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuX2VudW1WYWx1ZXMuZmlsdGVyKChlbnVtSXRlbSkgPT4geyByZXR1cm4gZW51bUl0ZW0uZGlzcGxheVZhbHVlID09PSBlbnVtRGlzcGxheVZhbHVlOyB9KTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdFbnVtSXRlbS5sZW5ndGggPT09IDEgPyBtYXRjaGluZ0VudW1JdGVtWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyLCBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlLCBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0sIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19