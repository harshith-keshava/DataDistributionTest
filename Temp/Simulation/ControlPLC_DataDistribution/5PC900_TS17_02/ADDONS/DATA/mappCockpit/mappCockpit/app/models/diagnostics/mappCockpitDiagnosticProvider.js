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
define(["require", "exports", "../../communication/rest/opcUaRestServices", "./mappCockpitComponentProvider", "./mappCockpitCommonInfoProvider", "./trace/mappCockpitTraceProvider", "./mappCockpitDiagnosticMonitoringProvider", "../../framework/events", "../online/mappCockpitComponent", "../../services/appServices", "../online/mappCockpitComponentService"], function (require, exports, opcUaRestServices_1, mappCockpitComponentProvider_1, mappCockpitCommonInfoProvider_1, mappCockpitTraceProvider_1, mappCockpitDiagnosticMonitoringProvider_1, events_1, ModelItems, appServices_1, mappCockpitComponentService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventObservablesChanged = /** @class */ (function (_super) {
        __extends(EventObservablesChanged, _super);
        function EventObservablesChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventObservablesChanged;
    }(events_1.TypedEvent));
    ;
    /**
     * Implements the mapp cockpit diagnostic provider
     *
     * @class MappCockpitDiagnosticProvider
     */
    var MappCockpitDiagnosticProvider = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitDiagnosticProvider.
         * @memberof MappCockpitDiagnosticProvider
         */
        function MappCockpitDiagnosticProvider(dataModel) {
            var _this = this;
            // Holds the currently acive session id
            this._sessionId = -1;
            // Holds the mapp cockpit nmespace index
            this._namespaceIndex = -1;
            this._observedItemsChangedHandler = function (sender, eventArgs) { _this.handleObservableChanged(sender, eventArgs); };
            // Initialize members
            this._dataModel = dataModel;
            this._componentProvider = new mappCockpitComponentProvider_1.MappCockpitComponentProvider(this);
            this._traceProvider = new mappCockpitTraceProvider_1.MappCockpitTraceProvider(this);
            this._monitoringProvider = new mappCockpitDiagnosticMonitoringProvider_1.MappCockpitDiagnosticMonitoringProvider(this);
            this._commonInfoProvider = mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance();
            this.eventObservablesChanged = new EventObservablesChanged();
            // attach events 
            this._monitoringProvider.eventObservedItemsChanged.attach(this._observedItemsChangedHandler);
        }
        /**
         * Dispose the MappCockpitDiagnosticProvider
         *
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.dispose = function () {
            var _this = this;
            // detach events 
            this._monitoringProvider.eventObservedItemsChanged.detach(this._observedItemsChangedHandler);
            // terminate the current session
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.endSession()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })();
        };
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "componentProvider", {
            /**
             * Gets the component provider
             *
             * @readonly
             * @type {MappCockpitTraceProvider}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._componentProvider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "model", {
            /**
             * Gets the data model
             *
             * @readonly
             * @type {MappCockpitComponentDataModel}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._dataModel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "traceProvider", {
            /**
             * Gets the trace provider
             *
             * @readonly
             * @type {MappCockpitTraceProvider}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._traceProvider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "sessionId", {
            /**
             * Returns the current session id
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._sessionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "namespaceIndex", {
            /**
             * Returns the effective namespace index
             *
             * @readonly
             * @type {number}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._namespaceIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "namespace", {
            /**
             * Returns the mapp cockpit namespace
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return opcUaRestServices_1.OpcUaRestServices.mappCockpitNamespacePrefix + this._namespaceIndex;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * starts a diagnostic session
         *
         * @private
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.beginSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 8, , 9]);
                            // get opc ua address
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readOpcUaLocalIp()];
                        case 1:
                            // get opc ua address
                            _b.sent();
                            // authenticate 
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.authenticate()];
                        case 2:
                            // authenticate 
                            _b.sent();
                            // create a socket connection for receiving opc-ua events
                            return [4 /*yield*/, this._monitoringProvider.createOpcUaSocket()];
                        case 3:
                            // create a socket connection for receiving opc-ua events
                            _b.sent();
                            console.log('MappCockpitDiagnosticProvider: created web socket ');
                            // create a session
                            return [4 /*yield*/, this.createSession()];
                        case 4:
                            // create a session
                            _b.sent();
                            console.log("MappCockpitDiagnosticProvider: created session: %o", this.sessionId);
                            // read the namespace index for further access
                            _a = this;
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.getNamespaceIndex(this.sessionId)];
                        case 5:
                            // read the namespace index for further access
                            _a._namespaceIndex = _b.sent();
                            console.log("MappCockpitDiagnosticProvider: got namespace index: %o", this._namespaceIndex);
                            // initialize common info provider 
                            return [4 /*yield*/, this._commonInfoProvider.initialize(this.sessionId, this._namespaceIndex)];
                        case 6:
                            // initialize common info provider 
                            _b.sent();
                            // connects to the text system
                            return [4 /*yield*/, this.connectTextSystem()];
                        case 7:
                            // connects to the text system
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            error_1 = _b.sent();
                            console.log(error_1);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Connects and initializes the textsystem
         *
         * @private
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.connectTextSystem = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appServices_1.Services.textSystem.connectTextSystem()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // /**
        //  * Just a test method for browsing the text system
        //  *
        //  * @private
        //  * @memberof MappCockpitDiagnosticProvider
        //  */
        // private async browseTextSystem() {
        //     // read the default language
        //     const defaultLanguageId = await Services.textSystem.getDefaultLanguage();
        //     // read all available languages
        //     const languages = await Services.textSystem.getLanguages();
        //     // read namespace text resources
        //     const namespaceTextItemsMap = await Services.textSystem.getNamespaceTextItems(defaultLanguageId,"BR/GMC/Enum/AcpParIdDescription");
        //     // get one text from the map
        //     const parIdTextFromMap = namespaceTextItemsMap.get("111");
        //     // read single specific text from namespace
        //     const parIdText = await Services.textSystem.getText(defaultLanguageId,"BR/GMC/Enum/AcpParIdDescription","111");
        //     // // read all text items of the namespace per single access
        //     // // retrieve the text keys
        //     // const textItemIds = Object.keys(namespaceTextItems);
        //     // let retrievedNsTextItems  = {};
        //     // // iterate all text keys and get the correponding text
        //     // textItemIds.forEach(async textItemId => {
        //     //     const nsText = await Services.textSystem.getText(defaultLanguageId,"BR/GMC/Enum/AcpParIdDescription",textItemId);
        //     //     retrievedNsTextItems[textItemId] = nsText;
        //     // }); 
        //     console.log(languages);
        // }
        // private _text: TextItem = new TextItem();
        // private _uploadedNamespacesFinishedHandler = (sender, args)=>this.onUploadedNamespacesFinished(sender, args);
        // private onUploadedNamespacesFinished(sender: ITextProvider, args: EventNamespacesLoadedResponse) {
        //     if(args.notFoundNamespaces.length !== 0) {
        //         // react to not all namespaces found
        //     }
        //     let inputArgs = new FormatterInputArgumentList();
        //     inputArgs.push(new FormatterInputArgumentString("°C"));
        //     inputArgs.push(new FormatterInputArgumentFloat(23.12000));
        //     this._text = sender.getFormattedText("BR/EventLog", "-2141085654", inputArgs);
        // }
        // private async browseTextProvider() {
        //     let componentFactory: IComponentFactory = ComponentFactory.getInstance();
        //     let textProvider: ITextProvider = componentFactory.create(new ComponentDefinition("TextProvider", "TextProvider", "textProviderDefinition"), undefined) as ITextProvider;
        //     const defaultLanguageId = await Services.textSystem.getDefaultLanguage();
        //     textProvider.setSelectedLanguage(defaultLanguageId);
        //     let namespaces: Array<string> = new Array<string>();
        //     namespaces.push("BR/GMC/Enum/AcpParIdDescription");
        //     namespaces.push("BR/EventLog");
        //     textProvider.eventNamespacesLoaded.attach(this._uploadedNamespacesFinishedHandler);
        //     textProvider.loadFullNamespacesRequest(namespaces);
        //     textProvider.eventNamespacesLoaded.detach(this._uploadedNamespacesFinishedHandler);
        // }
        /**
         * Creates a new session if not already available.
         *
         * @private
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.createSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var newSessionId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this._sessionId === -1)) return [3 /*break*/, 2];
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.createSession()];
                        case 1:
                            newSessionId = _a.sent();
                            this._sessionId = newSessionId;
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * terminates a diagnostic session
         *
         * @private
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.endSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._monitoringProvider.close();
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.deleteSession(this.sessionId)];
                        case 1:
                            _a.sent();
                            this._sessionId = -1;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Checks is the connection to the target is still valid
         *
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.checkTargetConnection = function () {
            return __awaiter(this, void 0, void 0, function () {
                var connected, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            connected = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            // we access the mapp cockpit roots description atribute as live check. The connection is valid if the attribute could be read successfully.
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this.sessionId, this.namespace + ";" + opcUaRestServices_1.OpcUaRestServices.mappCockpitRootNodeId, opcUaRestServices_1.OpcUaAttribute.DESCRIPTION)];
                        case 2:
                            // we access the mapp cockpit roots description atribute as live check. The connection is valid if the attribute could be read successfully.
                            _a.sent();
                            connected = true;
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            connected = false;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, connected];
                    }
                });
            });
        };
        /**
         * Login new user
         *
         * @param {string} user
         * @param {string} password
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.changeUser = function (userInfo) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.changeUser(this.sessionId, userInfo)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * browses the meta info for a component
         *
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.browseMetaInfo = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentMetaInfo(mappCockpitComponent)];
                        case 1:
                            metaInfo = _a.sent();
                            return [2 /*return*/, metaInfo];
                    }
                });
            });
        };
        /**
         * browses the parameters of a component
         *
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<ModelItems.MappCockpitComponentParameter[]>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.browseParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var mappCockpitComponentParameters;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentParameters(mappCockpitComponent)];
                        case 1:
                            mappCockpitComponentParameters = _a.sent();
                            return [2 /*return*/, mappCockpitComponentParameters];
                    }
                });
            });
        };
        /**
         * updates parameter data types
         *
         * @param {ModelItems.MappCockpitComponentParameter[]} parameters
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.updateParameterDataTypes = function (parameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.updateParameterDataTypes(parameters)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * updates method parameter data types
         *
         * @param {ModelItems.MappCockpitComponentMethod[]} methods
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.updateMethodParameterDataTypes = function (methods) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.updateMethodParameterDataTypes(methods)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * reads a list of parameter values
         *
         * @param {Array<ModelItems.MappCockpitComponentParameter>} componentParameters
         * @returns {Promise<Array<ModelItems.MappCockpitComponentParameter>>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.readParameterValues = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var requestsReadParameterValues;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestsReadParameterValues = componentParameters.map(function (componentParameter) { return _this._componentProvider.readComponentParameterValue(componentParameter); });
                            return [4 /*yield*/, Promise.all(requestsReadParameterValues)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, componentParameters];
                    }
                });
            });
        };
        /**
         * Writes the parameters values
         *
         * @param {ModelItems.MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.writeParameterValues = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var requestsWriteParameterValues;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestsWriteParameterValues = componentParameters.map(function (componentParameter) { return _this._componentProvider.writeComponentParameterValue(componentParameter); });
                            return [4 /*yield*/, Promise.all(requestsWriteParameterValues)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, componentParameters];
                    }
                });
            });
        };
        /**
         * observes the list of items for value changes
         *
         * @param {Array<ModelItems.MappCockpitComponentParameter>} componentParameters
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.observeComponentModelItems = function (observer, componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._monitoringProvider.observeComponentModelItems(observer, this.sessionId, componentParameters)];
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
         * @param {ModelItems.MappCockpitComponentParameter[]} observableParameters
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.unobserveComponentModelItems = function (observer, observableParameters, suspend) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._monitoringProvider.unobserveComponentModelItems(observer, this.sessionId, observableParameters, suspend)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * handles change notifications from observables
         *
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.handleObservableChanged = function (sender, changedEventArgs) {
            this.eventObservablesChanged.raise(this, changedEventArgs);
        };
        /**
         * writes a parameters value
         *
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @param {*} value
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.writeParameterValue = function (componentParameter, value) {
            return __awaiter(this, void 0, void 0, function () {
                var componentParameterValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.writeComponentParameterValue(componentParameter)];
                        case 1:
                            componentParameterValue = _a.sent();
                            return [2 /*return*/, componentParameterValue];
                    }
                });
            });
        };
        /**
         * browses the methods of a component
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.browseMethods = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var mappCockpitComponentMethods;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentMethods(mappCockpitComponent)];
                        case 1:
                            mappCockpitComponentMethods = _a.sent();
                            return [2 /*return*/, mappCockpitComponentMethods];
                    }
                });
            });
        };
        MappCockpitDiagnosticProvider.prototype.browseMethodParameters = function (mappCockpitComponentMethods) {
            return __awaiter(this, void 0, void 0, function () {
                var mappCockpitComponentMethodParameters;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentMethodParameters(mappCockpitComponentMethods)];
                        case 1:
                            mappCockpitComponentMethodParameters = _a.sent();
                            return [2 /*return*/, mappCockpitComponentMethodParameters];
                    }
                });
            });
        };
        /**
         * executes a component method
         *
         * @param {*} mappCockpitComponent
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.executeComponentMethod = function (mappCockpitComponentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.executeComponentMethod(mappCockpitComponentMethod)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * Browses for the service node and creates a component service object
         *
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<MappCockpitComponentService>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.browseServiceChannel = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var componentService, componentNodes, serviceNodeId, serviceParameters, serviceChannel, serviceMethods, serviceRequest, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            componentService = new mappCockpitComponentService_1.MappCockpitComponentService();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodes(this.sessionId, mappCockpitComponent.id)];
                        case 2:
                            componentNodes = _a.sent();
                            if (!(componentNodes && componentNodes.find(function (node) { return node.browseName === opcUaRestServices_1.OpcUaRestServices.serviceChannelNodeId; }))) return [3 /*break*/, 5];
                            serviceNodeId = mappCockpitComponent.id + "." + opcUaRestServices_1.OpcUaRestServices.serviceChannelNodeId;
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeParameters(this.sessionId, serviceNodeId)];
                        case 3:
                            serviceParameters = _a.sent();
                            serviceChannel = serviceParameters.filter(function (parameter) { return parameter.browseName === "infoChannel"; });
                            if (serviceChannel.length === 1) {
                                componentService.infoChannel = new ModelItems.MappCockpitComponentParameter(mappCockpitComponent, serviceChannel[0].displayName, serviceChannel[0]);
                                ;
                            }
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeMethods(this.sessionId, serviceNodeId)];
                        case 4:
                            serviceMethods = _a.sent();
                            serviceRequest = serviceMethods.filter(function (parameter) { return parameter.browseName === "request"; });
                            if (serviceRequest.length === 1) {
                                componentService.request = new ModelItems.MappCockpitComponentMethod(mappCockpitComponent, serviceRequest[0].displayName, serviceRequest[0]);
                            }
                            _a.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_3 = _a.sent();
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/, componentService.request && componentService.infoChannel ? componentService : null];
                    }
                });
            });
        };
        return MappCockpitDiagnosticProvider;
    }());
    exports.MappCockpitDiagnosticProvider = MappCockpitDiagnosticProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7UUFBc0MsMkNBQXdFO1FBQTlHOztRQUFnSCxDQUFDO1FBQUQsOEJBQUM7SUFBRCxDQUFDLEFBQWpILENBQXNDLG1CQUFVLEdBQWlFO0lBQUEsQ0FBQztJQUVsSDs7OztPQUlHO0lBQ0g7UUFzQkk7OztXQUdHO1FBQ0gsdUNBQVksU0FBd0M7WUFBcEQsaUJBYUM7WUE1QkQsdUNBQXVDO1lBQy9CLGVBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQyx3Q0FBd0M7WUFDaEMsb0JBQWUsR0FBVyxDQUFDLENBQUMsQ0FBQztZQU03QixpQ0FBNEIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQVE5RyxxQkFBcUI7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksMkRBQTRCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLG1EQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGlGQUF1QyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyw2REFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUV2RSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSx1QkFB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QUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDOzs7O1NBQzdGO1FBQ0wsb0NBQUM7SUFBRCxDQUFDLEFBdGdCRCxJQXNnQkM7SUFHUSxzRUFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGNVYVJlc3RTZXJ2aWNlcywgT3BjVWFBdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0U2VydmljZXMnXHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXIgfSBmcm9tICcuL21hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXInO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlciB9IGZyb20gJy4vbWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIgfSBmcm9tICcuL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VQcm92aWRlcic7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlciwgRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZEFyZ3MgfSBmcm9tICcuL21hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlcic7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvZXZlbnRzJztcclxuaW1wb3J0ICogYXMgTW9kZWxJdGVtcyBmcm9tICcuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0sIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIH0gZnJvbSAnLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfSBmcm9tICcuLi9vbmxpbmUvY29tcG9uZW50c0RhdGFNb2RlbCc7XHJcbmltcG9ydCB7IFNlcnZpY2VzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBwU2VydmljZXMnO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRTZXJ2aWNlJztcclxuXHJcblxyXG5jbGFzcyBFdmVudE9ic2VydmFibGVzQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIsIEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzPnsgfTtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIHRoZSBtYXBwIGNvY2twaXQgZGlhZ25vc3RpYyBwcm92aWRlclxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyIHtcclxuXHJcbiAgICAvLyBIb2xkcyBhbiBpbnN0YW5jZSBvZiB0aGUgY29tcG9uZW50IHByb3ZpZGVyXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRQcm92aWRlcjogTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlcjtcclxuICAgIC8vIEhvbGRzIGFuIGluc3RhbmNlIG9mIHRoZSB0cmFjZSBwcm92aWRlclxyXG4gICAgcHJpdmF0ZSBfdHJhY2VQcm92aWRlcjogTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyO1xyXG4gICAgLy8gaG9sZHMgYW4gaW5zdGFuY2Ugb2YgdGhlIG1vbml0b3JpbmcgcHJvdmlkZXJcclxuICAgIHByaXZhdGUgX21vbml0b3JpbmdQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyO1xyXG4gICAgLy8gaG9sZHMgYW4gaW5zdGFuY2Ugb2YgYSBwcm92aWRlciBmb3IgcmVhZGluZyBhbmQgZXhwb3NpbmcgY29tbW9uIGluZm8gKGVudW1zLCBtZXRhKVxyXG4gICAgcHJpdmF0ZSBfY29tbW9uSW5mb1Byb3ZpZGVyOiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlcjtcclxuXHJcbiAgICAvLyBIb2xkcyB0aGUgY3VycmVudGx5IGFjaXZlIHNlc3Npb24gaWRcclxuICAgIHByaXZhdGUgX3Nlc3Npb25JZDogbnVtYmVyID0gLTE7XHJcbiAgICAvLyBIb2xkcyB0aGUgbWFwcCBjb2NrcGl0IG5tZXNwYWNlIGluZGV4XHJcbiAgICBwcml2YXRlIF9uYW1lc3BhY2VJbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICAvLyBkZWNsYXJlcyBvYnNlcnZhYmxlIGNoYW5nZWQgZXZlbnRcclxuICAgIGV2ZW50T2JzZXJ2YWJsZXNDaGFuZ2VkOiBFdmVudE9ic2VydmFibGVzQ2hhbmdlZDtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhTW9kZWw6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG5cclxuICAgIHByaXZhdGUgX29ic2VydmVkSXRlbXNDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLmhhbmRsZU9ic2VydmFibGVDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzKSB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhTW9kZWw6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsKSB7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgbWVtYmVyc1xyXG4gICAgICAgIHRoaXMuX2RhdGFNb2RlbCA9IGRhdGFNb2RlbDtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRQcm92aWRlciA9IG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlUHJvdmlkZXIgPSBuZXcgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX21vbml0b3JpbmdQcm92aWRlciA9IG5ldyBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fY29tbW9uSW5mb1Byb3ZpZGVyID0gTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudE9ic2VydmFibGVzQ2hhbmdlZCA9IG5ldyBFdmVudE9ic2VydmFibGVzQ2hhbmdlZCgpO1xyXG5cclxuICAgICAgICAvLyBhdHRhY2ggZXZlbnRzIFxyXG4gICAgICAgIHRoaXMuX21vbml0b3JpbmdQcm92aWRlci5ldmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vYnNlcnZlZEl0ZW1zQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIC8vIGRldGFjaCBldmVudHMgXHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ1Byb3ZpZGVyLmV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQuZGV0YWNoKHRoaXMuX29ic2VydmVkSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcblxyXG4gICAgICAgIC8vIHRlcm1pbmF0ZSB0aGUgY3VycmVudCBzZXNzaW9uXHJcbiAgICAgICAgKGFzeW5jICgpPT57XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZW5kU2Vzc2lvbigpO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjb21wb25lbnQgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb21wb25lbnRQcm92aWRlcigpIDogTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlciB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9jb21wb25lbnRQcm92aWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGRhdGEgbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbH1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1vZGVsKCkgOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRyYWNlIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRUcmFjZVByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdHJhY2VQcm92aWRlcigpIDogTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2VQcm92aWRlcjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHNlc3Npb24gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzZXNzaW9uSWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbklkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZWZmZWN0aXZlIG5hbWVzcGFjZSBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWVzcGFjZUluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWVzcGFjZUluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbWFwcCBjb2NrcGl0IG5hbWVzcGFjZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWVzcGFjZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAgT3BjVWFSZXN0U2VydmljZXMubWFwcENvY2twaXROYW1lc3BhY2VQcmVmaXggKyB0aGlzLl9uYW1lc3BhY2VJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHN0YXJ0cyBhIGRpYWdub3N0aWMgc2Vzc2lvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYmVnaW5TZXNzaW9uKCkge1xyXG5cclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IG9wYyB1YSBhZGRyZXNzXHJcbiAgICAgICAgICAgIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWRPcGNVYUxvY2FsSXAoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZSBcclxuICAgICAgICAgICAgYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYXV0aGVudGljYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBzb2NrZXQgY29ubmVjdGlvbiBmb3IgcmVjZWl2aW5nIG9wYy11YSBldmVudHNcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fbW9uaXRvcmluZ1Byb3ZpZGVyLmNyZWF0ZU9wY1VhU29ja2V0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjogY3JlYXRlZCB3ZWIgc29ja2V0ICcpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgc2Vzc2lvblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVNlc3Npb24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjogY3JlYXRlZCBzZXNzaW9uOiAlb1wiLCB0aGlzLnNlc3Npb25JZCk7XHJcblxyXG4gICAgICAgICAgICAvLyByZWFkIHRoZSBuYW1lc3BhY2UgaW5kZXggZm9yIGZ1cnRoZXIgYWNjZXNzXHJcbiAgICAgICAgICAgIHRoaXMuX25hbWVzcGFjZUluZGV4ID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuZ2V0TmFtZXNwYWNlSW5kZXgodGhpcy5zZXNzaW9uSWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyOiBnb3QgbmFtZXNwYWNlIGluZGV4OiAlb1wiLCB0aGlzLl9uYW1lc3BhY2VJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIGNvbW1vbiBpbmZvIHByb3ZpZGVyIFxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9jb21tb25JbmZvUHJvdmlkZXIuaW5pdGlhbGl6ZSh0aGlzLnNlc3Npb25JZCwgdGhpcy5fbmFtZXNwYWNlSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY29ubmVjdHMgdG8gdGhlIHRleHQgc3lzdGVtXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY29ubmVjdFRleHRTeXN0ZW0oKTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIGFuZCBpbml0aWFsaXplcyB0aGUgdGV4dHN5c3RlbVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjb25uZWN0VGV4dFN5c3RlbSgpIHtcclxuICAgICAgICBcclxuICAgICAgICBhd2FpdCBTZXJ2aWNlcy50ZXh0U3lzdGVtLmNvbm5lY3RUZXh0U3lzdGVtKCk7XHJcblxyXG4gICAgICAgIC8vIC8vIGJyb3dzZSB0aGUgdGV4dHN5c3RlbSBqdXN0IGZvciB0ZXN0IGFuZCBleGVtcGxhcmljIHB1cnBvc2VzXHJcbiAgICAgICAgLy8gYXdhaXQgdGhpcy5icm93c2VUZXh0U3lzdGVtKCk7XHJcblxyXG4gICAgICAgIC8vIC8vIGJyb3dzZSB0aGUgdGV4dHByb3ZpZGVyIGp1c3QgZm9yIHRlc3QgYW5kIGV4ZW1wbGFyaWMgcHVycG9zZXNcclxuICAgICAgICAvLyBhd2FpdCB0aGlzLmJyb3dzZVRleHRQcm92aWRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8qKlxyXG4gICAgLy8gICogSnVzdCBhIHRlc3QgbWV0aG9kIGZvciBicm93c2luZyB0aGUgdGV4dCBzeXN0ZW1cclxuICAgIC8vICAqXHJcbiAgICAvLyAgKiBAcHJpdmF0ZVxyXG4gICAgLy8gICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAvLyAgKi9cclxuICAgIC8vIHByaXZhdGUgYXN5bmMgYnJvd3NlVGV4dFN5c3RlbSgpIHtcclxuXHJcbiAgICAvLyAgICAgLy8gcmVhZCB0aGUgZGVmYXVsdCBsYW5ndWFnZVxyXG4gICAgLy8gICAgIGNvbnN0IGRlZmF1bHRMYW5ndWFnZUlkID0gYXdhaXQgU2VydmljZXMudGV4dFN5c3RlbS5nZXREZWZhdWx0TGFuZ3VhZ2UoKTtcclxuXHJcbiAgICAvLyAgICAgLy8gcmVhZCBhbGwgYXZhaWxhYmxlIGxhbmd1YWdlc1xyXG4gICAgLy8gICAgIGNvbnN0IGxhbmd1YWdlcyA9IGF3YWl0IFNlcnZpY2VzLnRleHRTeXN0ZW0uZ2V0TGFuZ3VhZ2VzKCk7XHJcblxyXG4gICAgLy8gICAgIC8vIHJlYWQgbmFtZXNwYWNlIHRleHQgcmVzb3VyY2VzXHJcbiAgICAvLyAgICAgY29uc3QgbmFtZXNwYWNlVGV4dEl0ZW1zTWFwID0gYXdhaXQgU2VydmljZXMudGV4dFN5c3RlbS5nZXROYW1lc3BhY2VUZXh0SXRlbXMoZGVmYXVsdExhbmd1YWdlSWQsXCJCUi9HTUMvRW51bS9BY3BQYXJJZERlc2NyaXB0aW9uXCIpO1xyXG5cclxuICAgIC8vICAgICAvLyBnZXQgb25lIHRleHQgZnJvbSB0aGUgbWFwXHJcbiAgICAvLyAgICAgY29uc3QgcGFySWRUZXh0RnJvbU1hcCA9IG5hbWVzcGFjZVRleHRJdGVtc01hcC5nZXQoXCIxMTFcIik7XHJcblxyXG4gICAgLy8gICAgIC8vIHJlYWQgc2luZ2xlIHNwZWNpZmljIHRleHQgZnJvbSBuYW1lc3BhY2VcclxuICAgIC8vICAgICBjb25zdCBwYXJJZFRleHQgPSBhd2FpdCBTZXJ2aWNlcy50ZXh0U3lzdGVtLmdldFRleHQoZGVmYXVsdExhbmd1YWdlSWQsXCJCUi9HTUMvRW51bS9BY3BQYXJJZERlc2NyaXB0aW9uXCIsXCIxMTFcIik7XHJcblxyXG4gICAgLy8gICAgIC8vIC8vIHJlYWQgYWxsIHRleHQgaXRlbXMgb2YgdGhlIG5hbWVzcGFjZSBwZXIgc2luZ2xlIGFjY2Vzc1xyXG4gICAgLy8gICAgIC8vIC8vIHJldHJpZXZlIHRoZSB0ZXh0IGtleXNcclxuICAgIC8vICAgICAvLyBjb25zdCB0ZXh0SXRlbUlkcyA9IE9iamVjdC5rZXlzKG5hbWVzcGFjZVRleHRJdGVtcyk7XHJcbiAgICAvLyAgICAgLy8gbGV0IHJldHJpZXZlZE5zVGV4dEl0ZW1zICA9IHt9O1xyXG4gICAgLy8gICAgIC8vIC8vIGl0ZXJhdGUgYWxsIHRleHQga2V5cyBhbmQgZ2V0IHRoZSBjb3JyZXBvbmRpbmcgdGV4dFxyXG4gICAgLy8gICAgIC8vIHRleHRJdGVtSWRzLmZvckVhY2goYXN5bmMgdGV4dEl0ZW1JZCA9PiB7XHJcbiAgICAvLyAgICAgLy8gICAgIGNvbnN0IG5zVGV4dCA9IGF3YWl0IFNlcnZpY2VzLnRleHRTeXN0ZW0uZ2V0VGV4dChkZWZhdWx0TGFuZ3VhZ2VJZCxcIkJSL0dNQy9FbnVtL0FjcFBhcklkRGVzY3JpcHRpb25cIix0ZXh0SXRlbUlkKTtcclxuICAgIC8vICAgICAvLyAgICAgcmV0cmlldmVkTnNUZXh0SXRlbXNbdGV4dEl0ZW1JZF0gPSBuc1RleHQ7XHJcbiAgICAvLyAgICAgLy8gfSk7IFxyXG5cclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhsYW5ndWFnZXMpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHByaXZhdGUgX3RleHQ6IFRleHRJdGVtID0gbmV3IFRleHRJdGVtKCk7XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBfdXBsb2FkZWROYW1lc3BhY2VzRmluaXNoZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncyk9PnRoaXMub25VcGxvYWRlZE5hbWVzcGFjZXNGaW5pc2hlZChzZW5kZXIsIGFyZ3MpO1xyXG5cclxuICAgIC8vIHByaXZhdGUgb25VcGxvYWRlZE5hbWVzcGFjZXNGaW5pc2hlZChzZW5kZXI6IElUZXh0UHJvdmlkZXIsIGFyZ3M6IEV2ZW50TmFtZXNwYWNlc0xvYWRlZFJlc3BvbnNlKSB7XHJcbiAgICAvLyAgICAgaWYoYXJncy5ub3RGb3VuZE5hbWVzcGFjZXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAvLyAgICAgICAgIC8vIHJlYWN0IHRvIG5vdCBhbGwgbmFtZXNwYWNlcyBmb3VuZFxyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vICAgICBsZXQgaW5wdXRBcmdzID0gbmV3IEZvcm1hdHRlcklucHV0QXJndW1lbnRMaXN0KCk7XHJcbiAgICAvLyAgICAgaW5wdXRBcmdzLnB1c2gobmV3IEZvcm1hdHRlcklucHV0QXJndW1lbnRTdHJpbmcoXCLCsENcIikpO1xyXG4gICAgLy8gICAgIGlucHV0QXJncy5wdXNoKG5ldyBGb3JtYXR0ZXJJbnB1dEFyZ3VtZW50RmxvYXQoMjMuMTIwMDApKTtcclxuXHJcbiAgICAvLyAgICAgdGhpcy5fdGV4dCA9IHNlbmRlci5nZXRGb3JtYXR0ZWRUZXh0KFwiQlIvRXZlbnRMb2dcIiwgXCItMjE0MTA4NTY1NFwiLCBpbnB1dEFyZ3MpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHByaXZhdGUgYXN5bmMgYnJvd3NlVGV4dFByb3ZpZGVyKCkge1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGxldCBjb21wb25lbnRGYWN0b3J5OiBJQ29tcG9uZW50RmFjdG9yeSA9IENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAvLyAgICAgbGV0IHRleHRQcm92aWRlcjogSVRleHRQcm92aWRlciA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKG5ldyBDb21wb25lbnREZWZpbml0aW9uKFwiVGV4dFByb3ZpZGVyXCIsIFwiVGV4dFByb3ZpZGVyXCIsIFwidGV4dFByb3ZpZGVyRGVmaW5pdGlvblwiKSwgdW5kZWZpbmVkKSBhcyBJVGV4dFByb3ZpZGVyO1xyXG5cclxuICAgIC8vICAgICBjb25zdCBkZWZhdWx0TGFuZ3VhZ2VJZCA9IGF3YWl0IFNlcnZpY2VzLnRleHRTeXN0ZW0uZ2V0RGVmYXVsdExhbmd1YWdlKCk7XHJcblxyXG4gICAgLy8gICAgIHRleHRQcm92aWRlci5zZXRTZWxlY3RlZExhbmd1YWdlKGRlZmF1bHRMYW5ndWFnZUlkKTtcclxuXHJcbiAgICAvLyAgICAgbGV0IG5hbWVzcGFjZXM6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgLy8gICAgIG5hbWVzcGFjZXMucHVzaChcIkJSL0dNQy9FbnVtL0FjcFBhcklkRGVzY3JpcHRpb25cIik7XHJcbiAgICAvLyAgICAgbmFtZXNwYWNlcy5wdXNoKFwiQlIvRXZlbnRMb2dcIik7XHJcbiAgICAgIFxyXG4gICAgLy8gICAgIHRleHRQcm92aWRlci5ldmVudE5hbWVzcGFjZXNMb2FkZWQuYXR0YWNoKHRoaXMuX3VwbG9hZGVkTmFtZXNwYWNlc0ZpbmlzaGVkSGFuZGxlcik7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgdGV4dFByb3ZpZGVyLmxvYWRGdWxsTmFtZXNwYWNlc1JlcXVlc3QobmFtZXNwYWNlcyk7XHJcblxyXG4gICAgLy8gICAgIHRleHRQcm92aWRlci5ldmVudE5hbWVzcGFjZXNMb2FkZWQuZGV0YWNoKHRoaXMuX3VwbG9hZGVkTmFtZXNwYWNlc0ZpbmlzaGVkSGFuZGxlcik7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNlc3Npb24gaWYgbm90IGFscmVhZHkgYXZhaWxhYmxlLiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlU2Vzc2lvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2Vzc2lvbklkID09PSAtMSkgeyAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5ld1Nlc3Npb25JZCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmNyZWF0ZVNlc3Npb24oKTsgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25JZCA9IG5ld1Nlc3Npb25JZDsgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRlcm1pbmF0ZXMgYSBkaWFnbm9zdGljIHNlc3Npb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGVuZFNlc3Npb24oKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21vbml0b3JpbmdQcm92aWRlci5jbG9zZSgpO1xyXG5cclxuICAgICAgICBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5kZWxldGVTZXNzaW9uKHRoaXMuc2Vzc2lvbklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2Vzc2lvbklkID0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaXMgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIHRhcmdldCBpcyBzdGlsbCB2YWxpZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNoZWNrVGFyZ2V0Q29ubmVjdGlvbigpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGxldCBjb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyB3ZSBhY2Nlc3MgdGhlIG1hcHAgY29ja3BpdCByb290cyBkZXNjcmlwdGlvbiBhdHJpYnV0ZSBhcyBsaXZlIGNoZWNrLiBUaGUgY29ubmVjdGlvbiBpcyB2YWxpZCBpZiB0aGUgYXR0cmlidXRlIGNvdWxkIGJlIHJlYWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAgICAgICAgICBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTm9kZUF0dHJpYnV0ZSh0aGlzLnNlc3Npb25JZCwgdGhpcy5uYW1lc3BhY2UgKyBcIjtcIiArIE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0Um9vdE5vZGVJZCwgT3BjVWFBdHRyaWJ1dGUuREVTQ1JJUFRJT04pO1xyXG4gICAgICAgICAgICBjb25uZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29ubmVjdGVkO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2dpbiBuZXcgdXNlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBjaGFuZ2VVc2VyKHVzZXJJbmZvOnt9KSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmNoYW5nZVVzZXIodGhpcy5zZXNzaW9uSWQsIHVzZXJJbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJyb3dzZXMgdGhlIG1ldGEgaW5mbyBmb3IgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJyb3dzZU1ldGFJbmZvKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB2YXIgbWV0YUluZm8gPSBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci5icm93c2VDb21wb25lbnRNZXRhSW5mbyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICAgICAgcmV0dXJuIG1ldGFJbmZvO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJyb3dzZXMgdGhlIHBhcmFtZXRlcnMgb2YgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJyb3dzZVBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQ6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIHZhciBtYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnMgPSBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci5icm93c2VDb21wb25lbnRQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyB1cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZXMocGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci51cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZXMocGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIG1ldGhvZCBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfSBtZXRob2RzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHVwZGF0ZU1ldGhvZFBhcmFtZXRlckRhdGFUeXBlcyhtZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci51cGRhdGVNZXRob2RQYXJhbWV0ZXJEYXRhVHlwZXMobWV0aG9kcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgYSBsaXN0IG9mIHBhcmFtZXRlciB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgcmVhZFBhcmFtZXRlclZhbHVlcyhjb21wb25lbnRQYXJhbWV0ZXJzOiBBcnJheTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPik6IFByb21pc2U8QXJyYXk8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+IHtcclxuXHJcbiAgICAgICAgbGV0IHJlcXVlc3RzUmVhZFBhcmFtZXRlclZhbHVlcyA9IGNvbXBvbmVudFBhcmFtZXRlcnMubWFwKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLnJlYWRDb21wb25lbnRQYXJhbWV0ZXJWYWx1ZShjb21wb25lbnRQYXJhbWV0ZXIpIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChyZXF1ZXN0c1JlYWRQYXJhbWV0ZXJWYWx1ZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyB0aGUgcGFyYW1ldGVycyB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgd3JpdGVQYXJhbWV0ZXJWYWx1ZXMoY29tcG9uZW50UGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmVxdWVzdHNXcml0ZVBhcmFtZXRlclZhbHVlcyA9IGNvbXBvbmVudFBhcmFtZXRlcnMubWFwKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLndyaXRlQ29tcG9uZW50UGFyYW1ldGVyVmFsdWUoY29tcG9uZW50UGFyYW1ldGVyKSB9KTtcclxuXHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocmVxdWVzdHNXcml0ZVBhcmFtZXRlclZhbHVlcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIG9ic2VydmVzIHRoZSBsaXN0IG9mIGl0ZW1zIGZvciB2YWx1ZSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIG9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksIGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fbW9uaXRvcmluZ1Byb3ZpZGVyLm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyLCB0aGlzLnNlc3Npb25JZCwgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbm9ic2VydmVzIHRoZSBwYXNzZWQgcGFyYW1ldGVycy4gXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBvYnNlcnZhYmxlUGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBzdXNwZW5kOmJvb2xlYW4pIHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9tb25pdG9yaW5nUHJvdmlkZXIudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlciwgdGhpcy5zZXNzaW9uSWQsIG9ic2VydmFibGVQYXJhbWV0ZXJzLHN1c3BlbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyBjaGFuZ2Ugbm90aWZpY2F0aW9ucyBmcm9tIG9ic2VydmFibGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgaGFuZGxlT2JzZXJ2YWJsZUNoYW5nZWQoc2VuZGVyOiBhbnksIGNoYW5nZWRFdmVudEFyZ3M6IEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzKTogYW55IHtcclxuICAgICAgICB0aGlzLmV2ZW50T2JzZXJ2YWJsZXNDaGFuZ2VkLnJhaXNlKHRoaXMsIGNoYW5nZWRFdmVudEFyZ3MpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogd3JpdGVzIGEgcGFyYW1ldGVycyB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHdyaXRlUGFyYW1ldGVyVmFsdWUoY29tcG9uZW50UGFyYW1ldGVyOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCB2YWx1ZTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhdGUgbG9hZGluZyB0cmFjZSBkYXRhXHJcbiAgICAgICAgdmFyIGNvbXBvbmVudFBhcmFtZXRlclZhbHVlID0gYXdhaXQgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIud3JpdGVDb21wb25lbnRQYXJhbWV0ZXJWYWx1ZShjb21wb25lbnRQYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50UGFyYW1ldGVyVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBtZXRob2RzIG9mIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJyb3dzZU1ldGhvZHMobWFwcENvY2twaXRDb21wb25lbnQ6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICB2YXIgbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RzID0gYXdhaXQgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIuYnJvd3NlQ29tcG9uZW50TWV0aG9kcyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgYnJvd3NlTWV0aG9kUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIHZhciBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFBhcmFtZXRlcnMgPSBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci5icm93c2VDb21wb25lbnRNZXRob2RQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBleGVjdXRlcyBhIGNvbXBvbmVudCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBleGVjdXRlQ29tcG9uZW50TWV0aG9kKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIuZXhlY3V0ZUNvbXBvbmVudE1ldGhvZChtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIGZvciB0aGUgc2VydmljZSBub2RlIGFuZCBjcmVhdGVzIGEgY29tcG9uZW50IHNlcnZpY2Ugb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRTZXJ2aWNlPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VTZXJ2aWNlQ2hhbm5lbChtYXBwQ29ja3BpdENvbXBvbmVudDogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRTZXJ2aWNlfG51bGw+IHtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBjb21wb25lbnQgc2VydmljZSBvYmplY3RcclxuICAgICAgICBsZXQgY29tcG9uZW50U2VydmljZSA9IG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudFNlcnZpY2UoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBjb21wb25lbnRzIG5vZGVzLlxyXG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnROb2RlcyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVzKHRoaXMuc2Vzc2lvbklkLCBtYXBwQ29ja3BpdENvbXBvbmVudC5pZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2VydmljZSBub2RlIGlzIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50Tm9kZXMgJiYgY29tcG9uZW50Tm9kZXMuZmluZCgobm9kZSkgPT4geyByZXR1cm4gbm9kZS5icm93c2VOYW1lID09PSBPcGNVYVJlc3RTZXJ2aWNlcy5zZXJ2aWNlQ2hhbm5lbE5vZGVJZCB9KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY29tcG9uZW50cyBzZXJ2aWNlIG5vZGUgaWRcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VOb2RlSWQgPSBtYXBwQ29ja3BpdENvbXBvbmVudC5pZCArIFwiLlwiICsgT3BjVWFSZXN0U2VydmljZXMuc2VydmljZUNoYW5uZWxOb2RlSWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYnJvd3NlIGFuZCBnZXQgdGhlIGluZm8gY2hhbm5lbCBwcm9wZXJ0eVxyXG4gICAgICAgICAgICAgICAgbGV0IHNlcnZpY2VQYXJhbWV0ZXJzID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZVBhcmFtZXRlcnModGhpcy5zZXNzaW9uSWQsc2VydmljZU5vZGVJZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VydmljZUNoYW5uZWwgPSBzZXJ2aWNlUGFyYW1ldGVycy5maWx0ZXIoKHBhcmFtZXRlcikgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwiaW5mb0NoYW5uZWxcIiB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlQ2hhbm5lbC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRTZXJ2aWNlLmluZm9DaGFubmVsID0gbmV3IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIobWFwcENvY2twaXRDb21wb25lbnQsIHNlcnZpY2VDaGFubmVsWzBdLmRpc3BsYXlOYW1lLCBzZXJ2aWNlQ2hhbm5lbFswXSk7O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJyb3dzZSBhbmQgZ2V0IHRoZSByZXF1ZXN0IG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgbGV0IHNlcnZpY2VNZXRob2RzID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZU1ldGhvZHModGhpcy5zZXNzaW9uSWQsIHNlcnZpY2VOb2RlSWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcnZpY2VSZXF1ZXN0ID0gc2VydmljZU1ldGhvZHMuZmlsdGVyKChwYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHBhcmFtZXRlci5icm93c2VOYW1lID09PSBcInJlcXVlc3RcIiB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlUmVxdWVzdC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRTZXJ2aWNlLnJlcXVlc3QgPSBuZXcgTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZChtYXBwQ29ja3BpdENvbXBvbmVudCwgc2VydmljZVJlcXVlc3RbMF0uZGlzcGxheU5hbWUsIHNlcnZpY2VSZXF1ZXN0WzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNlcnZpY2UucmVxdWVzdCAmJiBjb21wb25lbnRTZXJ2aWNlLmluZm9DaGFubmVsID8gY29tcG9uZW50U2VydmljZSA6IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciB9OyJdfQ==