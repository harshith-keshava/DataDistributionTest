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
define(["require", "exports", "./restService", "../../common/mappCockpitConfig"], function (require, exports, restService_1, mappCockpitConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements the rest service calls for mapp Cockpit
     *
     * @class OpcUaRestServices
     */
    var OpcUaRestServiceProvider = /** @class */ (function () {
        /**
         *Creates an instance of OpcUaRestServiceProvider.
         * @memberof OpcUaRestServiceProvider
         */
        function OpcUaRestServiceProvider() {
            // Specifies the mapp Cockpit namespace
            this.mappCockpitOpcUaNamespace = "urn:B&R/Diagnosis/mappCockpit";
            // Specifies the mapp Cockpit componente root node id
            this.mappCockpitRootNodeId = "i=2100";
            // Specifies the component for reading trace data
            this.mappCockpitTraceDataProviderId = "s=NewTraceRecord.MethodSet";
            // Specifies the datapoint name base for reading trace data
            this.mappCockpitTraceDataPointNameId = "s=NewTraceRecord.RecordedDataPointName";
            // Specifies the trgger time name for reading trace data
            this.mappCockpitTraceTriggerTime = "s=NewTraceRecord.TriggerTime";
            this.mappCockpitTraceDataPointCount = 32;
            // Specifies the component for reading trace data
            this.mappCockpitTraceReadDataMethodId = "s=NewTraceRecord.GetRecordedDataArray";
            // specifies the root node id for enum definitions
            this.mappCockpitEnumsId = "ns=0;i=29";
            // specifies the meta info node id
            this.mappCockpitMetaNodeId = "$BrMetaInfo";
            // specifies the namespace prefix string
            this.mappCockpitNamespacePrefix = "ns=";
            // specifies the sampling rate for montitoring items
            this.monitoringSamplingInterval = 100;
            // specifies the service channel id
            this.serviceChannelNodeId = "$BrComm";
            // specifies the opc ua rest services address an set it to localhost. This is necessary to make sure that the rest connection works with NAT.
            this.opcuaIp = '127.0.0.1';
            // specifies the session timeout. The value is set to 0 as a workoround to disable the session timeout until we can provider proper refresh.
            this.opcUaSessionTimeout = 0;
            // holds the rest service provider
            this._restService = new restService_1.RestService();
            this._restService = new restService_1.RestService();
        }
        // specifies the rest service end point url
        OpcUaRestServiceProvider.prototype.getOpcUaRestServiceEndPointUrl = function () {
            return 'opc.tcp://' + this.opcuaIp + ':' + mappCockpitConfig_1.MappCockpitConfiguration.opcUaPort;
        };
        /**
         * Creates an instance of OpcUaRestServiceProvider.
         * @memberof OpcUaRestServiceProvider
         */
        OpcUaRestServiceProvider.prototype.create = function () {
            return new OpcUaRestServiceProvider();
        };
        /**
         * Activates batching of single request calls.
         *
    
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.activateBatching = function () {
            // clear existing requests
            this._restService.clearBatchRequests();
            // switch to batch mode
            this._restService.mode = restService_1.RestServiceMode.BATCH;
        };
        /**
         * Executes the collected batch requests since last "activateBatching"
         *
         * @static
         * @returns {Promise<Map<string,any>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.executeBatchRequest = function () {
            return __awaiter(this, void 0, void 0, function () {
                var batchRequestResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            batchRequestResult = new Map();
                            if (!this._restService.hasBatchRequests()) return [3 /*break*/, 2];
                            // switch back to execution mode 
                            this._restService.mode = restService_1.RestServiceMode.EXECUTE;
                            return [4 /*yield*/, this._restService.executeBatchRequest()];
                        case 1:
                            batchRequestResult = _a.sent();
                            // executes the batch request populated with the collected list of single requests.
                            batchRequestResult = this.getBatchRequestResult(batchRequestResult);
                            // now we are done and we can clear the requests.
                            this._restService.clearBatchRequests();
                            _a.label = 2;
                        case 2: return [2 /*return*/, batchRequestResult];
                    }
                });
            });
        };
        /**
         * Retrieves the batch requests result from the response values
         *
         * @private
         * @static
         * @param {*} batchRequestResult
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.getBatchRequestResult = function (batchRequestResult) {
            // we return the batch result as map requesKey => responseValue
            var batchResultValues = new Map();
            batchRequestResult.responses.forEach(function (singleRequestResult) {
                batchResultValues.set(singleRequestResult.id, singleRequestResult.body);
            });
            return batchResultValues;
        };
        /**
         * reads access configuration data and sets the base url for the rest services
         *
         * @static
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.getBaseUrl = function () {
            // get port for RestServiceBaseUrl from mappCockpit config
            return "http://" + location.hostname + ":" + mappCockpitConfig_1.MappCockpitConfiguration.port + "/api/1.0";
        };
        /**
         * Gets the url for reading the opcu local ip address
         *
         * @returns {string}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.getOpcUaIpUrl = function () {
            // get resource string for reading the opcua ip address 
            return this.getOpcUaBaseUrl() + "/localip";
        };
        /**
         * gets the base url for opc ua access
         *
         * @returns {string}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.getOpcUaBaseUrl = function () {
            return this.getBaseUrl() + "/opcua";
        };
        /**
         * gets the base url for the web socket
         *
         * @public
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.getWsBaseUrl = function () {
            // get port for RestServiceBaseUrl from mappCockpit config
            return "ws://" + location.hostname + ":" + mappCockpitConfig_1.MappCockpitConfiguration.port + "/api/1.0/pushchannel";
        };
        /**
         * Reads the ip address to be used for opcua services
         *
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.readOpcUaLocalIp = function () {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaIpUrl();
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            this.opcuaIp = result.ip;
                            return [2 /*return*/, this.opcuaIp];
                        case 2:
                            error_1 = _a.sent();
                            throw new Error(error_1);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * provides authentifictaion for rest service access
         *
         * @returns {Promise<number>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.authenticate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getBaseUrl() + '/auth';
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_2 = _a.sent();
                            throw new Error(error_2);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Changes login to the specified user with
         *
         * @param {number} sessionId
         * @param {string} user
         * @param {string} password
         * @returns {Promise<number>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.changeUser = function (sessionId, userInfo) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceData, serviceUrl, userRoles, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            serviceData = { "userIdentityToken": userInfo };
                            serviceUrl = this.getOpcUaBaseUrl() + '/sessions/' + sessionId;
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.PATCH, serviceUrl, serviceData)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.getUserRoles(userInfo)];
                        case 2:
                            userRoles = _a.sent();
                            // return user roles as login (change user) result
                            return [2 /*return*/, userRoles.roles];
                        case 3:
                            error_3 = _a.sent();
                            throw new Error(error_3);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads a users roles
         *
         * @param {{}} userInfo
         * @returns {Promise<{}>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.getUserRoles = function (userInfo) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, serviceUrl, userRoles, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            headers = this.createUserRoleAccessHeaders(userInfo);
                            serviceUrl = this.getBaseUrl() + '/rbac/myroles';
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.GET, serviceUrl, null, headers)];
                        case 1:
                            userRoles = _a.sent();
                            return [2 /*return*/, userRoles];
                        case 2:
                            error_4 = _a.sent();
                            throw new Error(error_4);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates the headers for accessing user roles
         *
         * @private
         * @param {{}} userInfo
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.createUserRoleAccessHeaders = function (userInfo) {
            return {
                "Authorization": "Basic " + btoa(this.encode_utf8(userInfo.username) + ":" + this.encode_utf8(userInfo.password))
            };
        };
        OpcUaRestServiceProvider.prototype.encode_utf8 = function (s) {
            return unescape(encodeURIComponent(s));
        };
        /**
         * Creates a new session
         *
         * @returns {Promise<string>} The created session id
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.createSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, serviceData, result, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaBaseUrl() + '/sessions';
                            serviceData = { "url": this.getOpcUaRestServiceEndPointUrl(), "userIdentityToken": OpcUaRestServiceProvider.defaultUser, "timeout": this.opcUaSessionTimeout };
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.POST, serviceUrl, serviceData)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.id];
                        case 2:
                            error_5 = _a.sent();
                            throw new Error(error_5);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Deletes a session
         *
         * @param {number} sessionId Specifies the session to delete.
         * @returns {Promise<number>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.deleteSession = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaBaseUrl() + '/sessions/' + sessionId;
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.DELETE, serviceUrl)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, sessionId];
                        case 2:
                            error_6 = _a.sent();
                            throw new Error(error_6);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * creates a subscription as a container for opc-ua items to be monitored (observed)
         *
         * @param {number} sessionId
         * @param {number} [interval=100]
         * @param {boolean} [enabled=true]
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.createSubscription = function (sessionId, interval, enabled) {
            if (interval === void 0) { interval = 50; }
            if (enabled === void 0) { enabled = true; }
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, subscriptionSettings, serviceData, result, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions';
                            subscriptionSettings = {
                                publishingInterval: interval,
                                publishingEnabled: enabled
                            };
                            serviceData = subscriptionSettings;
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.POST, serviceUrl, serviceData)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.subscriptionId];
                        case 2:
                            error_7 = _a.sent();
                            throw new Error(error_7);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * deletes a subscription
         *
         * @param {number} sessionId
         * @param {*} subscriptionId
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.deleteSubscription = function (sessionId, subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, serviceData, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions/' + subscriptionId;
                            serviceData = { "url": this.getOpcUaRestServiceEndPointUrl() };
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.DELETE, serviceUrl, serviceData)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, subscriptionId];
                        case 2:
                            error_8 = _a.sent();
                            throw new Error(error_8);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * create a monitored item
         *
         * @param {number} sessionId specifies the service session id
         * @param {string} subscriptionId specifies the subscription id
         * @param {string} nodeId specifies the node to be subscribed
         * @param {OpcUaAttribute} specifies the attribute to be scubscribed
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.createMonitoredItem = function (sessionId, subscriptionId, nodeId, itemId, samplingInterval, attribute) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, monitorItemSettings, serviceData, result, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions/' + subscriptionId + '/monitoredItems';
                            monitorItemSettings = {
                                itemToMonitor: {
                                    nodeId: nodeId,
                                    attribute: attribute
                                },
                                monitoringParameters: {
                                    samplingInterval: samplingInterval,
                                    queueSize: 0,
                                    clientHandle: itemId
                                },
                            };
                            serviceData = monitorItemSettings;
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.POST, serviceUrl, serviceData)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_9 = _a.sent();
                            throw new Error(error_9);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * deletes a monitored item
         *
         * @param {number} sessionId
         * @param {string} subscriptionId
         * @param {*} monitoredItemId
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.deleteMonitoredItem = function (sessionId, subscriptionId, monitoredItemId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result;
                return __generator(this, function (_a) {
                    try {
                        serviceUrl = this.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions/' + subscriptionId + '/monitoredItems/' + monitoredItemId;
                        result = this._restService.call(restService_1.RestServiceType.DELETE, serviceUrl);
                        return [2 /*return*/, result];
                    }
                    catch (error) {
                        throw new Error(error);
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
        * Reads the namespace index for mapp Cockpit services
        *
        * @param {number} sessionId
        * @returns {Promise<number>} The index of the namespace
        * @memberof OpcUaRestServices
        */
        OpcUaRestServiceProvider.prototype.getNamespaceIndex = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/namespaces/' + encodeURIComponent(this.mappCockpitOpcUaNamespace);
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.index];
                        case 2:
                            error_10 = _a.sent();
                            throw new Error(error_10);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the child nodes of the specified parent node
         *
         * @param {number} sessionId
         * @param {string} parentNodeId
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.browseNodes = function (sessionId, parentNodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(parentNodeId) + '/references';
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            // in execution mode we take the and update the browsed node names
                            if (this._restService.mode === restService_1.RestServiceMode.EXECUTE) {
                                // Remove NamespaceIndex from browseName
                                result.references.forEach(function (reference) {
                                    var startIndex = reference.browseName.indexOf('"', 0);
                                    startIndex++;
                                    var endIndex = reference.browseName.indexOf('"', startIndex);
                                    reference.browseName = reference.browseName.substr(startIndex, endIndex - startIndex);
                                });
                            }
                            // in execution mode we return the references , in batch mode just the request settings.
                            return [2 /*return*/, this._restService.mode === restService_1.RestServiceMode.EXECUTE ? result.references : result];
                        case 2:
                            error_11 = _a.sent();
                            throw new Error(error_11);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * browses the meta info for a component
         *
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<Rest.InterfaceOpcUaRestResultNodeReference>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.browseNodeMetaInfo = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfoReferences, childNodes, metaNodes, metaNode, error_12;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            metaInfoReferences = undefined;
                            return [4 /*yield*/, this.browseNodes(sessionId, nodeId)];
                        case 1:
                            childNodes = _a.sent();
                            metaNodes = childNodes.filter(function (childNode) { return childNode.browseName === _this.mappCockpitMetaNodeId; });
                            if (!(metaNodes.length === 1)) return [3 /*break*/, 4];
                            metaNode = metaNodes[0];
                            return [4 /*yield*/, this.browseNodes(sessionId, metaNode.nodeId)];
                        case 2:
                            // Browse the meta info nodes
                            metaInfoReferences = _a.sent();
                            if (!metaInfoReferences) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.browseNodeMetaInfoValues(metaInfoReferences, sessionId)];
                        case 3:
                            // retrieve valid meta nodes
                            metaInfoReferences = _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, metaInfoReferences];
                        case 5:
                            error_12 = _a.sent();
                            throw error_12;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses and updates the meta info values
         *
         * @private
         * @param {Rest.InterfaceOpcUaRestResultNodeReference[]} metaInfoReferences
         * @param {number} sessionId
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.browseNodeMetaInfoValues = function (metaInfoReferences, sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var readMetaInfoValuesResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            metaInfoReferences = metaInfoReferences.filter(function (parameter) { return parameter.nodeClass === "Variable"; });
                            return [4 /*yield*/, this.readMetaInfoValues(metaInfoReferences, sessionId)];
                        case 1:
                            readMetaInfoValuesResult = _a.sent();
                            // assign meta info values
                            this.updateMetaInfoValues(readMetaInfoValuesResult, metaInfoReferences);
                            return [2 /*return*/, metaInfoReferences];
                    }
                });
            });
        };
        /**
         * Updates hte meta info values
         *
         * @private
         * @param {*} readMetaInfoValuesResult
         * @param {Rest.InterfaceOpcUaRestResultNodeReference[]} metaInfoReferences
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.updateMetaInfoValues = function (readMetaInfoValuesResult, metaInfoReferences) {
            for (var i = 0; i < readMetaInfoValuesResult.responses.length; i++) {
                // get meta info value
                var metaInfoValue = readMetaInfoValuesResult.responses[i].body.value;
                // get response id
                var responseId = readMetaInfoValuesResult.responses[i].id;
                // assign meta info value to corresponding meta value object
                metaInfoReferences[responseId].value = metaInfoValue;
            }
        };
        /**
         * Reads the meta info values
         *
         * @private
         * @param {Rest.InterfaceOpcUaRestResultNodeReference[]} metaInfoReferences
         * @param {number} sessionId
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.readMetaInfoValues = function (metaInfoReferences, sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var readMetaInfoValuesRequests, i, _a, _b, readMetaInfoValuesResult;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            // activate batch mode
                            this._restService.mode = restService_1.RestServiceMode.BATCH;
                            readMetaInfoValuesRequests = [];
                            i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(i < metaInfoReferences.length)) return [3 /*break*/, 4];
                            _b = (_a = readMetaInfoValuesRequests).push;
                            return [4 /*yield*/, this.readNodeAttribute(sessionId, metaInfoReferences[i].nodeId)];
                        case 2:
                            _b.apply(_a, [_c.sent()]);
                            _c.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            // eterminate batch mode and excute batch request
                            this._restService.mode = restService_1.RestServiceMode.EXECUTE;
                            return [4 /*yield*/, this.callBatchRequest(readMetaInfoValuesRequests)];
                        case 5:
                            readMetaInfoValuesResult = _c.sent();
                            return [2 /*return*/, readMetaInfoValuesResult];
                    }
                });
            });
        };
        /**
         * Browses the parameters of the specified node
         *
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<Rest.InterfaceOpcUaRestResultNodeReference>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.browseNodeParameters = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var parameterReferences, valueParameterReferences, error_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.browseNodes(sessionId, nodeId)];
                        case 1:
                            parameterReferences = _a.sent();
                            valueParameterReferences = parameterReferences.filter(function (parameter) { return parameter.nodeClass === "Variable"; });
                            return [2 /*return*/, valueParameterReferences];
                        case 2:
                            error_13 = _a.sent();
                            throw new Error(error_13);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the parameter set of a node if any.
         *
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<OpcUaNodeReferenceInterface>>} The paremeter references
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.browseNodeParameterSet = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var parameterReferences, valueParameterReferences, error_14;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Add the sub node id for parameter.
                            nodeId += ".ParameterSet";
                            return [4 /*yield*/, this.browseNodes(sessionId, nodeId)];
                        case 1:
                            parameterReferences = (_a.sent());
                            valueParameterReferences = parameterReferences.filter(function (parameter) { return parameter.nodeClass === "Variable"; });
                            return [2 /*return*/, valueParameterReferences];
                        case 2:
                            error_14 = _a.sent();
                            throw new Error(error_14);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads the specified node attribute
         *
         * @param {number} sessionId
         * @param {string} nodeId
         * @param {*} attribute
         * @param {*} OpcUaAttribute
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.readNodeAttribute = function (sessionId, nodeId, attribute) {
            if (attribute === void 0) { attribute = OpcUaAttribute.VALUE; }
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, restServiceResult, error_15;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(nodeId) + '/attributes/' + attribute;
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            restServiceResult = (_a.sent());
                            return [2 /*return*/, this._restService.mode === restService_1.RestServiceMode.EXECUTE ? restServiceResult.value : restServiceResult];
                        case 2:
                            error_15 = _a.sent();
                            throw new Error(error_15);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Writes the node attribute
         *
         * @param {number} sessionId
         * @param {string} nodeId
         * @param {OpcUaAttribute} [attribute=OpcUaAttribute.VALUE]
         * @param {*} value
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.writeNodeAttribute = function (sessionId, nodeId, attribute, value) {
            if (attribute === void 0) { attribute = OpcUaAttribute.VALUE; }
            return __awaiter(this, void 0, void 0, function () {
                var valueData, serviceUrl, error_16;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            valueData = value;
                            if (attribute === OpcUaAttribute.VALUE) {
                                valueData = { "value": value };
                            }
                            serviceUrl = this.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(nodeId) + '/attributes/' + attribute;
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.PUT, serviceUrl, valueData)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_16 = _a.sent();
                            throw new Error(error_16);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the methods pf the specifed node
         *
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<Rest.InterfaceOpcUaRestResultNodeReference>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.browseNodeMethods = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var methodReferences, error_17;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.browseNodes(sessionId, nodeId)];
                        case 1:
                            methodReferences = (_a.sent()).filter(function (method) { return method.nodeClass === "Method"; });
                            return [2 /*return*/, methodReferences];
                        case 2:
                            error_17 = _a.sent();
                            throw new Error(error_17);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the method set of a node if any.
         *
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<OpcUaNodeReferenceInterface>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.browseNodeMethodSet = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var methodReferences, error_18;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Add the sub node id for methods.
                            nodeId += ".MethodSet";
                            return [4 /*yield*/, this.browseNodes(sessionId, nodeId)];
                        case 1:
                            methodReferences = (_a.sent()).filter(function (method) { return method.nodeClass === "Method"; });
                            return [2 /*return*/, methodReferences];
                        case 2:
                            error_18 = _a.sent();
                            throw new Error(error_18);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads the input parameters of a method
         *
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.readMethodParameters = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var inputArguments, error_19;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Add the sub node id for method parameters.
                            nodeId += "#InputArguments";
                            return [4 /*yield*/, this.readNodeAttribute(sessionId, nodeId, OpcUaAttribute.VALUE)];
                        case 1:
                            inputArguments = (_a.sent());
                            return [2 /*return*/, inputArguments];
                        case 2:
                            error_19 = _a.sent();
                            throw new Error(error_19);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Create and call a json batch request
         *
         * @param {JQuery.AjaxSettings<any>[]} restRequests
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.callBatchRequest = function (restRequests) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._restService.callBatchRequest(this.getOpcUaBaseUrl(), restRequests)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * Executes the specified method
         *
         * @template T_METHOD_RESULT
         * @param {number} sessionId
         * @param {string} nodeId
         * @param {string} methodId
         * @param {*} methodArgs
         * @returns {Promise<T_METHOD_RESULT>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.executeMethod = function (sessionId, nodeId, methodId, methodArgs) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_20;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(nodeId) + '/methods/' + encodeURIComponent(methodId);
                            return [4 /*yield*/, this._restService.call(restService_1.RestServiceType.POST, serviceUrl, methodArgs)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_20 = _a.sent();
                            throw new Error(error_20);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Filters the nodes to be displayed in mapp cockpit
         *
         * @param {Array<Rest.InterfaceOpcUaRestResultNodeReference>} opcUaNodes
         * @param {string} mappCockpitNamespace
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServiceProvider.prototype.filterMappCockpitNodes = function (opcUaNodes, mappCockpitNamespace) {
            return opcUaNodes.filter(function (nodeReference) {
                var isChildNode = nodeReference.isForward === true;
                // check if the node is within the mapp cockpit namespace
                var isMappComponent = nodeReference.typeDefinition.indexOf(mappCockpitNamespace) > -1;
                return isChildNode && isMappComponent;
            });
        };
        // specifies the default user settings
        OpcUaRestServiceProvider.defaultUser = { username: "Anonymous", password: "" };
        return OpcUaRestServiceProvider;
    }());
    exports.OpcUaRestServiceProvider = OpcUaRestServiceProvider;
    /**
     * Defines OpcUa Attribute names.
     *
     * @enum {number}
     */
    var OpcUaAttribute;
    (function (OpcUaAttribute) {
        OpcUaAttribute["VALUE"] = "Value";
        OpcUaAttribute["DATA_TYPE"] = "DataType";
        OpcUaAttribute["BROWSE_NAME"] = "BrowseName";
        OpcUaAttribute["DISPLAY_NAME"] = "DisplayName";
        OpcUaAttribute["DESCRIPTION"] = "Description";
        OpcUaAttribute["USER_ACCESS_LEVEL"] = "UserAccessLevel";
    })(OpcUaAttribute || (OpcUaAttribute = {}));
    /**
     * Specifies access levels ( as bit flags )
     *
     * @enum {number}
     */
    var OpcUaAccessLevel;
    (function (OpcUaAccessLevel) {
        OpcUaAccessLevel[OpcUaAccessLevel["CurrentRead"] = 1] = "CurrentRead";
        OpcUaAccessLevel[OpcUaAccessLevel["CurrentWrite"] = 2] = "CurrentWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["HistoryRead"] = 4] = "HistoryRead";
        OpcUaAccessLevel[OpcUaAccessLevel["HistoryWrite"] = 8] = "HistoryWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["SemanticChange"] = 16] = "SemanticChange";
        OpcUaAccessLevel[OpcUaAccessLevel["StatusWrite"] = 32] = "StatusWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["TimestampWrite"] = 64] = "TimestampWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["Reserved"] = 128] = "Reserved";
    })(OpcUaAccessLevel || (OpcUaAccessLevel = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BjVWFSZXN0U2VydmljZVByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0U2VydmljZVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUlBOzs7O09BSUc7SUFDSDtRQXVESTs7O1dBR0c7UUFDSDtZQXpEQSx1Q0FBdUM7WUFDdkIsOEJBQXlCLEdBQVcsK0JBQStCLENBQUM7WUFFcEYscURBQXFEO1lBQ3JDLDBCQUFxQixHQUFXLFFBQVEsQ0FBQztZQUV6RCxpREFBaUQ7WUFDakMsbUNBQThCLEdBQVcsNEJBQTRCLENBQUM7WUFFdEYsMkRBQTJEO1lBQzNDLG9DQUErQixHQUFXLHdDQUF3QyxDQUFDO1lBRW5HLHdEQUF3RDtZQUN4QyxnQ0FBMkIsR0FBVyw4QkFBOEIsQ0FBQztZQUVyRSxtQ0FBOEIsR0FBVyxFQUFFLENBQUM7WUFFNUQsaURBQWlEO1lBQ2pDLHFDQUFnQyxHQUFXLHVDQUF1QyxDQUFDO1lBRW5HLGtEQUFrRDtZQUNsQyx1QkFBa0IsR0FBVyxXQUFXLENBQUM7WUFFekQsa0NBQWtDO1lBQ2xCLDBCQUFxQixHQUFVLGFBQWEsQ0FBQztZQUU3RCx3Q0FBd0M7WUFDeEIsK0JBQTBCLEdBQVcsS0FBSyxDQUFDO1lBRTNELG9EQUFvRDtZQUNwQywrQkFBMEIsR0FBVyxHQUFHLENBQUM7WUFFekQsbUNBQW1DO1lBQ25CLHlCQUFvQixHQUFVLFNBQVMsQ0FBQztZQUV4RCw2SUFBNkk7WUFDckksWUFBTyxHQUFVLFdBQVcsQ0FBQztZQVVyQyw0SUFBNEk7WUFDM0gsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDO1lBRXpDLGtDQUFrQztZQUMxQixpQkFBWSxHQUFlLElBQUkseUJBQVcsRUFBRSxDQUFDO1lBUWpELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx5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O2dCQUNuQyxJQUFJLFdBQVcsR0FBRyxhQUFhLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztnQkFFbkQseURBQXlEO2dCQUN6RCxJQUFJLGVBQWUsR0FBWSxhQUFhLENBQUMsY0FBZSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUVoRyxPQUFPLFdBQVcsSUFBSSxlQUFlLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBdnRCRCxzQ0FBc0M7UUFDZCxvQ0FBVyxHQUFHLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7UUF1dEJsRiwrQkFBQztLQUFBLEFBcndCRCxJQXF3QkM7SUFyd0JZLDREQUF3QjtJQXN3QnJDOzs7O09BSUc7SUFDSCxJQUFLLGNBT0o7SUFQRCxXQUFLLGNBQWM7UUFDZixpQ0FBZSxDQUFBO1FBQ2Ysd0NBQXNCLENBQUE7UUFDdEIsNENBQTBCLENBQUE7UUFDMUIsOENBQTRCLENBQUE7UUFDNUIsNkNBQTJCLENBQUE7UUFDM0IsdURBQXFDLENBQUE7SUFDekMsQ0FBQyxFQVBJLGNBQWMsS0FBZCxjQUFjLFFBT2xCO0lBRUQ7Ozs7T0FJRztJQUNILElBQUssZ0JBU0o7SUFURCxXQUFLLGdCQUFnQjtRQUNqQixxRUFBa0IsQ0FBQTtRQUNsQix1RUFBbUIsQ0FBQTtRQUNuQixxRUFBa0IsQ0FBQTtRQUNsQix1RUFBbUIsQ0FBQTtRQUNuQiw0RUFBcUIsQ0FBQTtRQUNyQixzRUFBa0IsQ0FBQTtRQUNsQiw0RUFBcUIsQ0FBQTtRQUNyQixpRUFBZSxDQUFBO0lBQ25CLENBQUMsRUFUSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBU3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVzdCBmcm9tIFwiLi9vcGNVYVJlc3RSZXN1bHRUeXBlc1wiO1xyXG5pbXBvcnQge1Jlc3RTZXJ2aWNlLCBSZXN0U2VydmljZVR5cGUsUmVzdFNlcnZpY2VNb2RlLCBSZXN0UmVxdWVzdEluZm8gfSBmcm9tIFwiLi9yZXN0U2VydmljZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hcHBDb2NrcGl0Q29uZmlnXCI7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyB0aGUgcmVzdCBzZXJ2aWNlIGNhbGxzIGZvciBtYXBwIENvY2twaXRcclxuICpcclxuICogQGNsYXNzIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3BjVWFSZXN0U2VydmljZVByb3ZpZGVyIHtcclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIG1hcHAgQ29ja3BpdCBuYW1lc3BhY2VcclxuICAgIHB1YmxpYyByZWFkb25seSBtYXBwQ29ja3BpdE9wY1VhTmFtZXNwYWNlOiBzdHJpbmcgPSBcInVybjpCJlIvRGlhZ25vc2lzL21hcHBDb2NrcGl0XCI7XHJcblxyXG4gICAgLy8gU3BlY2lmaWVzIHRoZSBtYXBwIENvY2twaXQgY29tcG9uZW50ZSByb290IG5vZGUgaWRcclxuICAgIHB1YmxpYyByZWFkb25seSBtYXBwQ29ja3BpdFJvb3ROb2RlSWQ6IHN0cmluZyA9IFwiaT0yMTAwXCI7XHJcblxyXG4gICAgLy8gU3BlY2lmaWVzIHRoZSBjb21wb25lbnQgZm9yIHJlYWRpbmcgdHJhY2UgZGF0YVxyXG4gICAgcHVibGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0VHJhY2VEYXRhUHJvdmlkZXJJZDogc3RyaW5nID0gXCJzPU5ld1RyYWNlUmVjb3JkLk1ldGhvZFNldFwiO1xyXG5cclxuICAgIC8vIFNwZWNpZmllcyB0aGUgZGF0YXBvaW50IG5hbWUgYmFzZSBmb3IgcmVhZGluZyB0cmFjZSBkYXRhXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbWFwcENvY2twaXRUcmFjZURhdGFQb2ludE5hbWVJZDogc3RyaW5nID0gXCJzPU5ld1RyYWNlUmVjb3JkLlJlY29yZGVkRGF0YVBvaW50TmFtZVwiO1xyXG5cclxuICAgIC8vIFNwZWNpZmllcyB0aGUgdHJnZ2VyIHRpbWUgbmFtZSBmb3IgcmVhZGluZyB0cmFjZSBkYXRhXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbWFwcENvY2twaXRUcmFjZVRyaWdnZXJUaW1lOiBzdHJpbmcgPSBcInM9TmV3VHJhY2VSZWNvcmQuVHJpZ2dlclRpbWVcIjtcclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbWFwcENvY2twaXRUcmFjZURhdGFQb2ludENvdW50OiBudW1iZXIgPSAzMjtcclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIGNvbXBvbmVudCBmb3IgcmVhZGluZyB0cmFjZSBkYXRhXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbWFwcENvY2twaXRUcmFjZVJlYWREYXRhTWV0aG9kSWQ6IHN0cmluZyA9IFwicz1OZXdUcmFjZVJlY29yZC5HZXRSZWNvcmRlZERhdGFBcnJheVwiO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgcm9vdCBub2RlIGlkIGZvciBlbnVtIGRlZmluaXRpb25zXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbWFwcENvY2twaXRFbnVtc0lkOiBzdHJpbmcgPSBcIm5zPTA7aT0yOVwiO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgbWV0YSBpbmZvIG5vZGUgaWRcclxuICAgIHB1YmxpYyByZWFkb25seSBtYXBwQ29ja3BpdE1ldGFOb2RlSWQ6c3RyaW5nID0gXCIkQnJNZXRhSW5mb1wiO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgbmFtZXNwYWNlIHByZWZpeCBzdHJpbmdcclxuICAgIHB1YmxpYyByZWFkb25seSBtYXBwQ29ja3BpdE5hbWVzcGFjZVByZWZpeDogc3RyaW5nID0gXCJucz1cIjtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHNhbXBsaW5nIHJhdGUgZm9yIG1vbnRpdG9yaW5nIGl0ZW1zXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbW9uaXRvcmluZ1NhbXBsaW5nSW50ZXJ2YWw6IG51bWJlciA9IDEwMDtcclxuICAgIFxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBzZXJ2aWNlIGNoYW5uZWwgaWRcclxuICAgIHB1YmxpYyByZWFkb25seSBzZXJ2aWNlQ2hhbm5lbE5vZGVJZDpzdHJpbmcgPSBcIiRCckNvbW1cIjtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIG9wYyB1YSByZXN0IHNlcnZpY2VzIGFkZHJlc3MgYW4gc2V0IGl0IHRvIGxvY2FsaG9zdC4gVGhpcyBpcyBuZWNlc3NhcnkgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHJlc3QgY29ubmVjdGlvbiB3b3JrcyB3aXRoIE5BVC5cclxuICAgIHByaXZhdGUgb3BjdWFJcDpzdHJpbmcgPSAnMTI3LjAuMC4xJztcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHJlc3Qgc2VydmljZSBlbmQgcG9pbnQgdXJsXHJcbiAgICBwdWJsaWMgZ2V0T3BjVWFSZXN0U2VydmljZUVuZFBvaW50VXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICdvcGMudGNwOi8vJyArIHRoaXMub3BjdWFJcCArICc6JyArIE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi5vcGNVYVBvcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBkZWZhdWx0IHVzZXIgc2V0dGluZ3NcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGRlZmF1bHRVc2VyID0geyB1c2VybmFtZTogXCJBbm9ueW1vdXNcIiwgcGFzc3dvcmQ6IFwiXCIgfTtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHNlc3Npb24gdGltZW91dC4gVGhlIHZhbHVlIGlzIHNldCB0byAwIGFzIGEgd29ya29yb3VuZCB0byBkaXNhYmxlIHRoZSBzZXNzaW9uIHRpbWVvdXQgdW50aWwgd2UgY2FuIHByb3ZpZGVyIHByb3BlciByZWZyZXNoLlxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcGNVYVNlc3Npb25UaW1lb3V0ID0gMDtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgcmVzdCBzZXJ2aWNlIHByb3ZpZGVyXHJcbiAgICBwcml2YXRlIF9yZXN0U2VydmljZTpSZXN0U2VydmljZSA9IG5ldyBSZXN0U2VydmljZSgpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBPcGNVYVJlc3RTZXJ2aWNlUHJvdmlkZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5fcmVzdFNlcnZpY2UgPSBuZXcgUmVzdFNlcnZpY2UoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE9wY1VhUmVzdFNlcnZpY2VQcm92aWRlci5cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZSgpIDogT3BjVWFSZXN0U2VydmljZVByb3ZpZGVye1xyXG4gICAgICAgIHJldHVybiBuZXcgT3BjVWFSZXN0U2VydmljZVByb3ZpZGVyKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIGJhdGNoaW5nIG9mIHNpbmdsZSByZXF1ZXN0IGNhbGxzLlxyXG4gICAgICpcclxuXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFjdGl2YXRlQmF0Y2hpbmcoKXtcclxuICAgICAgICAvLyBjbGVhciBleGlzdGluZyByZXF1ZXN0c1xyXG4gICAgICAgIHRoaXMuX3Jlc3RTZXJ2aWNlLmNsZWFyQmF0Y2hSZXF1ZXN0cygpO1xyXG4gICAgICAgIC8vIHN3aXRjaCB0byBiYXRjaCBtb2RlXHJcbiAgICAgICAgdGhpcy5fcmVzdFNlcnZpY2UubW9kZSA9IFJlc3RTZXJ2aWNlTW9kZS5CQVRDSDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIHRoZSBjb2xsZWN0ZWQgYmF0Y2ggcmVxdWVzdHMgc2luY2UgbGFzdCBcImFjdGl2YXRlQmF0Y2hpbmdcIlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1hcDxzdHJpbmcsYW55Pj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBleGVjdXRlQmF0Y2hSZXF1ZXN0KCk6UHJvbWlzZTxNYXA8c3RyaW5nLGFueT4+e1xyXG5cclxuICAgICAgICBsZXQgYmF0Y2hSZXF1ZXN0UmVzdWx0ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcmVzdFNlcnZpY2UuaGFzQmF0Y2hSZXF1ZXN0cygpKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBzd2l0Y2ggYmFjayB0byBleGVjdXRpb24gbW9kZSBcclxuICAgICAgICAgICAgdGhpcy5fcmVzdFNlcnZpY2UubW9kZSA9IFJlc3RTZXJ2aWNlTW9kZS5FWEVDVVRFO1xyXG4gICAgICAgICAgICBiYXRjaFJlcXVlc3RSZXN1bHQgPSBhd2FpdCB0aGlzLl9yZXN0U2VydmljZS5leGVjdXRlQmF0Y2hSZXF1ZXN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZXhlY3V0ZXMgdGhlIGJhdGNoIHJlcXVlc3QgcG9wdWxhdGVkIHdpdGggdGhlIGNvbGxlY3RlZCBsaXN0IG9mIHNpbmdsZSByZXF1ZXN0cy5cclxuICAgICAgICAgICAgYmF0Y2hSZXF1ZXN0UmVzdWx0ID0gIHRoaXMuZ2V0QmF0Y2hSZXF1ZXN0UmVzdWx0KGJhdGNoUmVxdWVzdFJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAvLyBub3cgd2UgYXJlIGRvbmUgYW5kIHdlIGNhbiBjbGVhciB0aGUgcmVxdWVzdHMuXHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc3RTZXJ2aWNlLmNsZWFyQmF0Y2hSZXF1ZXN0cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJhdGNoUmVxdWVzdFJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgYmF0Y2ggcmVxdWVzdHMgcmVzdWx0IGZyb20gdGhlIHJlc3BvbnNlIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IGJhdGNoUmVxdWVzdFJlc3VsdFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEJhdGNoUmVxdWVzdFJlc3VsdChiYXRjaFJlcXVlc3RSZXN1bHQ6IGFueSkge1xyXG5cclxuICAgICAgICAvLyB3ZSByZXR1cm4gdGhlIGJhdGNoIHJlc3VsdCBhcyBtYXAgcmVxdWVzS2V5ID0+IHJlc3BvbnNlVmFsdWVcclxuICAgICAgICBsZXQgYmF0Y2hSZXN1bHRWYWx1ZXM6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgICAgIGJhdGNoUmVxdWVzdFJlc3VsdC5yZXNwb25zZXMuZm9yRWFjaChzaW5nbGVSZXF1ZXN0UmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgYmF0Y2hSZXN1bHRWYWx1ZXMuc2V0KHNpbmdsZVJlcXVlc3RSZXN1bHQuaWQsIHNpbmdsZVJlcXVlc3RSZXN1bHQuYm9keSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGJhdGNoUmVzdWx0VmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgYWNjZXNzIGNvbmZpZ3VyYXRpb24gZGF0YSBhbmQgc2V0cyB0aGUgYmFzZSB1cmwgZm9yIHRoZSByZXN0IHNlcnZpY2VzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRCYXNlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgIC8vIGdldCBwb3J0IGZvciBSZXN0U2VydmljZUJhc2VVcmwgZnJvbSBtYXBwQ29ja3BpdCBjb25maWdcclxuICAgICAgICByZXR1cm4gXCJodHRwOi8vXCIgKyBsb2NhdGlvbi5ob3N0bmFtZSArIFwiOlwiICsgTWFwcENvY2twaXRDb25maWd1cmF0aW9uLnBvcnQgKyBcIi9hcGkvMS4wXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB1cmwgZm9yIHJlYWRpbmcgdGhlIG9wY3UgbG9jYWwgaXAgYWRkcmVzc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBnZXRPcGNVYUlwVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgLy8gZ2V0IHJlc291cmNlIHN0cmluZyBmb3IgcmVhZGluZyB0aGUgb3BjdWEgaXAgYWRkcmVzcyBcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcGNVYUJhc2VVcmwoKSArIFwiL2xvY2FsaXBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGJhc2UgdXJsIGZvciBvcGMgdWEgYWNjZXNzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICAgcHVibGljIGdldE9wY1VhQmFzZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJhc2VVcmwoKSArIFwiL29wY3VhXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgYmFzZSB1cmwgZm9yIHRoZSB3ZWIgc29ja2V0XHJcbiAgICAgKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgZ2V0V3NCYXNlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgLy8gZ2V0IHBvcnQgZm9yIFJlc3RTZXJ2aWNlQmFzZVVybCBmcm9tIG1hcHBDb2NrcGl0IGNvbmZpZ1xyXG4gICAgICAgIHJldHVybiBcIndzOi8vXCIgKyBsb2NhdGlvbi5ob3N0bmFtZSArIFwiOlwiICsgTWFwcENvY2twaXRDb25maWd1cmF0aW9uLnBvcnQgKyBcIi9hcGkvMS4wL3B1c2hjaGFubmVsXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgaXAgYWRkcmVzcyB0byBiZSB1c2VkIGZvciBvcGN1YSBzZXJ2aWNlc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyByZWFkT3BjVWFMb2NhbElwKCk6UHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSB0aGlzLmdldE9wY1VhSXBVcmwoKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fcmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICB0aGlzLm9wY3VhSXAgPSByZXN1bHQuaXA7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wY3VhSXA7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvdmlkZXMgYXV0aGVudGlmaWN0YWlvbiBmb3IgcmVzdCBzZXJ2aWNlIGFjY2Vzc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBhdXRoZW50aWNhdGUoKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSB0aGlzLmdldEJhc2VVcmwoKSArICcvYXV0aCc7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCB0aGlzLl9yZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLkdFVCwgc2VydmljZVVybCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2VzIGxvZ2luIHRvIHRoZSBzcGVjaWZpZWQgdXNlciB3aXRoXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGNoYW5nZVVzZXIoc2Vzc2lvbklkOiBudW1iZXIsIHVzZXJJbmZvOiB7fSk6IFByb21pc2U8e30+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgLy97IHVzZXJuYW1lOiB1c2VyLCBwYXNzd29yZDogcGFzc3dvcmQgfSBcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VEYXRhID0geyBcInVzZXJJZGVudGl0eVRva2VuXCI6IHVzZXJJbmZvIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlVXJsID0gdGhpcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZDtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVzdFNlcnZpY2UuY2FsbChSZXN0U2VydmljZVR5cGUuUEFUQ0gsIHNlcnZpY2VVcmwsIHNlcnZpY2VEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFmdGVyIHN1Y2Nlc3NmdWxsIGxvZ2luIHdlIHJlYWQgdGhlIHVzZXJzIHJvbGVzXHJcbiAgICAgICAgICAgIGxldCB1c2VyUm9sZXMgPSBhd2FpdCB0aGlzLmdldFVzZXJSb2xlcyh1c2VySW5mbyk7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiB1c2VyIHJvbGVzIGFzIGxvZ2luIChjaGFuZ2UgdXNlcikgcmVzdWx0XHJcbiAgICAgICAgICAgIHJldHVybiAoPGFueT51c2VyUm9sZXMpLnJvbGVzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgdXNlcnMgcm9sZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3t9fSB1c2VySW5mb1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8e30+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgZ2V0VXNlclJvbGVzKHVzZXJJbmZvOiB7fSk6IFByb21pc2U8e30+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVVzZXJSb2xlQWNjZXNzSGVhZGVycyh1c2VySW5mbyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlVXJsID0gdGhpcy5nZXRCYXNlVXJsKCkgKyAnL3JiYWMvbXlyb2xlcyc7XHJcbiAgICAgICAgICAgIGxldCB1c2VyUm9sZXMgPSBhd2FpdCB0aGlzLl9yZXN0U2VydmljZS5jYWxsPHt9PihSZXN0U2VydmljZVR5cGUuR0VULCBzZXJ2aWNlVXJsLCBudWxsLCBoZWFkZXJzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJSb2xlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGhlYWRlcnMgZm9yIGFjY2Vzc2luZyB1c2VyIHJvbGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7e319IHVzZXJJbmZvXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVXNlclJvbGVBY2Nlc3NIZWFkZXJzKHVzZXJJbmZvOiB7fSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIFwiICsgYnRvYSh0aGlzLmVuY29kZV91dGY4KCg8YW55PnVzZXJJbmZvKS51c2VybmFtZSkgKyBcIjpcIiArIHRoaXMuZW5jb2RlX3V0ZjgoKDxhbnk+dXNlckluZm8pLnBhc3N3b3JkKSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgIGVuY29kZV91dGY4KHMpIHtcclxuICAgICAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHMpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNlc3Npb25cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBUaGUgY3JlYXRlZCBzZXNzaW9uIGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBjcmVhdGVTZXNzaW9uKCk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSB0aGlzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucyc7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHNlc3Npb24gd2l0aCBkZWZhdWx0IHVzZXIgYWNjZXNzIHJpZ2h0cyBhbmQgYSB0aW1lb3V0XHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlRGF0YSA9IHsgXCJ1cmxcIjogdGhpcy5nZXRPcGNVYVJlc3RTZXJ2aWNlRW5kUG9pbnRVcmwoKSwgXCJ1c2VySWRlbnRpdHlUb2tlblwiOiBPcGNVYVJlc3RTZXJ2aWNlUHJvdmlkZXIuZGVmYXVsdFVzZXIgLCBcInRpbWVvdXRcIjogdGhpcy5vcGNVYVNlc3Npb25UaW1lb3V0IH07XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCB0aGlzLl9yZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLlBPU1QsIHNlcnZpY2VVcmwsIHNlcnZpY2VEYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5pZDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBhIHNlc3Npb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkIFNwZWNpZmllcyB0aGUgc2Vzc2lvbiB0byBkZWxldGUuXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgZGVsZXRlU2Vzc2lvbihzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VydmljZVVybCA9IHRoaXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQ7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Jlc3RTZXJ2aWNlLmNhbGwoUmVzdFNlcnZpY2VUeXBlLkRFTEVURSwgc2VydmljZVVybCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uSWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGEgc3Vic2NyaXB0aW9uIGFzIGEgY29udGFpbmVyIGZvciBvcGMtdWEgaXRlbXMgdG8gYmUgbW9uaXRvcmVkIChvYnNlcnZlZClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2ludGVydmFsPTEwMF1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuYWJsZWQ9dHJ1ZV1cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBjcmVhdGVTdWJzY3JpcHRpb24oc2Vzc2lvbklkOiBudW1iZXIsIGludGVydmFsOiBudW1iZXIgPSA1MCwgZW5hYmxlZDogYm9vbGVhbiA9IHRydWUpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBiYWVzIHVybFxyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IHRoaXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL3N1YnNjcmlwdGlvbnMnO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5lIHN1YnNjcml0aW9uIHNldHRpbmdzXHJcbiAgICAgICAgICAgIGxldCBzdWJzY3JpcHRpb25TZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgICAgIHB1Ymxpc2hpbmdJbnRlcnZhbDogaW50ZXJ2YWwsXHJcbiAgICAgICAgICAgICAgICBwdWJsaXNoaW5nRW5hYmxlZDogZW5hYmxlZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBjYWxsIHRoZSBzZXJ2aWNlIHdpdGggdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXJzICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlRGF0YSA9IHN1YnNjcmlwdGlvblNldHRpbmdzO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgdGhpcy5fcmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5QT1NULCBzZXJ2aWNlVXJsLCBzZXJ2aWNlRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuc3Vic2NyaXB0aW9uSWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGVzIGEgc3Vic2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHsqfSBzdWJzY3JpcHRpb25JZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGRlbGV0ZVN1YnNjcmlwdGlvbihzZXNzaW9uSWQ6IG51bWJlciwgc3Vic2NyaXB0aW9uSWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSB0aGlzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9zdWJzY3JpcHRpb25zLycgKyBzdWJzY3JpcHRpb25JZDtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VEYXRhID0geyBcInVybFwiOiB0aGlzLmdldE9wY1VhUmVzdFNlcnZpY2VFbmRQb2ludFVybCgpIH07XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Jlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuREVMRVRFLCBzZXJ2aWNlVXJsLCBzZXJ2aWNlRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb25JZDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhIG1vbml0b3JlZCBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZCBzcGVjaWZpZXMgdGhlIHNlcnZpY2Ugc2Vzc2lvbiBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN1YnNjcmlwdGlvbklkIHNwZWNpZmllcyB0aGUgc3Vic2NyaXB0aW9uIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkIHNwZWNpZmllcyB0aGUgbm9kZSB0byBiZSBzdWJzY3JpYmVkXHJcbiAgICAgKiBAcGFyYW0ge09wY1VhQXR0cmlidXRlfSBzcGVjaWZpZXMgdGhlIGF0dHJpYnV0ZSB0byBiZSBzY3Vic2NyaWJlZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGNyZWF0ZU1vbml0b3JlZEl0ZW0oc2Vzc2lvbklkOiBudW1iZXIsIHN1YnNjcmlwdGlvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nLCBpdGVtSWQ6IG51bWJlciwgc2FtcGxpbmdJbnRlcnZhbDogbnVtYmVyLCBhdHRyaWJ1dGU6IE9wY1VhQXR0cmlidXRlKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBkZWZpbmUgYmFlcyB1cmxcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSB0aGlzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9zdWJzY3JpcHRpb25zLycgKyBzdWJzY3JpcHRpb25JZCArICcvbW9uaXRvcmVkSXRlbXMnO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5lIG1vbml0b3IgaXRlbSBzZXR0aW5nc1xyXG4gICAgICAgICAgICBjb25zdCBtb25pdG9ySXRlbVNldHRpbmdzID0ge1xyXG4gICAgICAgICAgICAgICAgaXRlbVRvTW9uaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVJZDogbm9kZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG1vbml0b3JpbmdQYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FtcGxpbmdJbnRlcnZhbDogc2FtcGxpbmdJbnRlcnZhbCxcclxuICAgICAgICAgICAgICAgICAgICBxdWV1ZVNpemU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50SGFuZGxlOiBpdGVtSWRcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gY2FsbCB0aGUgc2VydmljZSB3aXRoIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVycyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc2VydmljZURhdGEgPSBtb25pdG9ySXRlbVNldHRpbmdzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IHRoaXMuX3Jlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuUE9TVCwgc2VydmljZVVybCwgc2VydmljZURhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGVzIGEgbW9uaXRvcmVkIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3Vic2NyaXB0aW9uSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gbW9uaXRvcmVkSXRlbUlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgZGVsZXRlTW9uaXRvcmVkSXRlbShzZXNzaW9uSWQ6IHN0cmluZywgc3Vic2NyaXB0aW9uSWQ6IG51bWJlciwgbW9uaXRvcmVkSXRlbUlkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBiYWVzIHVybFxyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IHRoaXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL3N1YnNjcmlwdGlvbnMvJyArIHN1YnNjcmlwdGlvbklkICsgJy9tb25pdG9yZWRJdGVtcy8nICsgbW9uaXRvcmVkSXRlbUlkO1xyXG4gICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX3Jlc3RTZXJ2aWNlLmNhbGwoUmVzdFNlcnZpY2VUeXBlLkRFTEVURSwgc2VydmljZVVybCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZWFkcyB0aGUgbmFtZXNwYWNlIGluZGV4IGZvciBtYXBwIENvY2twaXQgc2VydmljZXMgXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gVGhlIGluZGV4IG9mIHRoZSBuYW1lc3BhY2VcclxuICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBnZXROYW1lc3BhY2VJbmRleChzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSB0aGlzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9uYW1lc3BhY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5tYXBwQ29ja3BpdE9wY1VhTmFtZXNwYWNlKTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IHRoaXMuX3Jlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuR0VULCBzZXJ2aWNlVXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5pbmRleDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyB0aGUgY2hpbGQgbm9kZXMgb2YgdGhlIHNwZWNpZmllZCBwYXJlbnQgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnROb2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBicm93c2VOb2RlcyhzZXNzaW9uSWQ6IG51bWJlciwgcGFyZW50Tm9kZUlkOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT4+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IHRoaXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL25vZGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQocGFyZW50Tm9kZUlkKSArICcvcmVmZXJlbmNlcyc7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCB0aGlzLl9yZXN0U2VydmljZS5jYWxsPFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0UmVmZXJlbmNlc1ZhbHVlPihSZXN0U2VydmljZVR5cGUuR0VULCBzZXJ2aWNlVXJsKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGluIGV4ZWN1dGlvbiBtb2RlIHdlIHRha2UgdGhlIGFuZCB1cGRhdGUgdGhlIGJyb3dzZWQgbm9kZSBuYW1lc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVzdFNlcnZpY2UubW9kZSA9PT0gUmVzdFNlcnZpY2VNb2RlLkVYRUNVVEUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBOYW1lc3BhY2VJbmRleCBmcm9tIGJyb3dzZU5hbWVcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5yZWZlcmVuY2VzLmZvckVhY2gocmVmZXJlbmNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRJbmRleCA9IHJlZmVyZW5jZS5icm93c2VOYW1lLmluZGV4T2YoJ1wiJywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRJbmRleCA9IHJlZmVyZW5jZS5icm93c2VOYW1lLmluZGV4T2YoJ1wiJywgc3RhcnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlLmJyb3dzZU5hbWUgPSByZWZlcmVuY2UuYnJvd3NlTmFtZS5zdWJzdHIoc3RhcnRJbmRleCwgZW5kSW5kZXggLSBzdGFydEluZGV4KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpbiBleGVjdXRpb24gbW9kZSB3ZSByZXR1cm4gdGhlIHJlZmVyZW5jZXMgLCBpbiBiYXRjaCBtb2RlIGp1c3QgdGhlIHJlcXVlc3Qgc2V0dGluZ3MuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXN0U2VydmljZS5tb2RlID09PSBSZXN0U2VydmljZU1vZGUuRVhFQ1VURSA/ICg8YW55PnJlc3VsdC5yZWZlcmVuY2VzKSA6IHJlc3VsdDsgICAgICAgICAgIFxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgbWV0YSBpbmZvIGZvciBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT4+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgYnJvd3NlTm9kZU1ldGFJbmZvKHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPnx1bmRlZmluZWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgbWV0YUluZm9SZWZlcmVuY2VzOkFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT58dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVhZCB0aGUgY2hpbGQgbm9kZXNcclxuICAgICAgICAgICAgbGV0IGNoaWxkTm9kZXMgPSBhd2FpdCB0aGlzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgbm9kZUlkKTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGNoaWxkIG5vZGVzIGNvbnRhaW4gYSBtZXRhIG5vZGVcclxuICAgICAgICAgICAgbGV0IG1ldGFOb2RlcyA9IGNoaWxkTm9kZXMuZmlsdGVyKChjaGlsZE5vZGUpPT57IHJldHVybiBjaGlsZE5vZGUuYnJvd3NlTmFtZSA9PT0gIHRoaXMubWFwcENvY2twaXRNZXRhTm9kZUlkO30pXHJcbiAgICAgICAgICAgIGlmIChtZXRhTm9kZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHN1YiBub2RlIGlkIGZvciBwYXJhbWV0ZXIuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWV0YU5vZGUgPSBtZXRhTm9kZXNbMF07XHJcbiAgICAgICAgICAgICAgICAvLyBCcm93c2UgdGhlIG1ldGEgaW5mbyBub2Rlc1xyXG4gICAgICAgICAgICAgICAgbWV0YUluZm9SZWZlcmVuY2VzID0gYXdhaXQgdGhpcy5icm93c2VOb2RlcyhzZXNzaW9uSWQsIG1ldGFOb2RlLm5vZGVJZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWV0YUluZm9SZWZlcmVuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0cmlldmUgdmFsaWQgbWV0YSBub2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGFJbmZvUmVmZXJlbmNlcyA9IGF3YWl0IHRoaXMuYnJvd3NlTm9kZU1ldGFJbmZvVmFsdWVzKG1ldGFJbmZvUmVmZXJlbmNlcywgc2Vzc2lvbklkKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRhSW5mb1JlZmVyZW5jZXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgYW5kIHVwZGF0ZXMgdGhlIG1ldGEgaW5mbyB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2VbXX0gbWV0YUluZm9SZWZlcmVuY2VzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYnJvd3NlTm9kZU1ldGFJbmZvVmFsdWVzKG1ldGFJbmZvUmVmZXJlbmNlczogUmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlW10sIHNlc3Npb25JZDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIG1ldGFJbmZvUmVmZXJlbmNlcyA9IG1ldGFJbmZvUmVmZXJlbmNlcy5maWx0ZXIoKHBhcmFtZXRlcikgPT4geyByZXR1cm4gcGFyYW1ldGVyLm5vZGVDbGFzcyA9PT0gXCJWYXJpYWJsZVwiOyB9KTtcclxuXHJcbiAgICAgICAgLy8gcmVhZCBtZXRhIGluZm8gdmFsdWVzXHJcbiAgICAgICAgbGV0IHJlYWRNZXRhSW5mb1ZhbHVlc1Jlc3VsdCA9IGF3YWl0IHRoaXMucmVhZE1ldGFJbmZvVmFsdWVzKG1ldGFJbmZvUmVmZXJlbmNlcywgc2Vzc2lvbklkKTtcclxuXHJcbiAgICAgICAgLy8gYXNzaWduIG1ldGEgaW5mbyB2YWx1ZXNcclxuICAgICAgICB0aGlzLnVwZGF0ZU1ldGFJbmZvVmFsdWVzKHJlYWRNZXRhSW5mb1ZhbHVlc1Jlc3VsdCwgbWV0YUluZm9SZWZlcmVuY2VzKTtcclxuICAgICAgICByZXR1cm4gbWV0YUluZm9SZWZlcmVuY2VzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBodGUgbWV0YSBpbmZvIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHJlYWRNZXRhSW5mb1ZhbHVlc1Jlc3VsdFxyXG4gICAgICogQHBhcmFtIHtSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2VbXX0gbWV0YUluZm9SZWZlcmVuY2VzXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVNZXRhSW5mb1ZhbHVlcyhyZWFkTWV0YUluZm9WYWx1ZXNSZXN1bHQ6IGFueSwgbWV0YUluZm9SZWZlcmVuY2VzOiBSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2VbXSkge1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlYWRNZXRhSW5mb1ZhbHVlc1Jlc3VsdC5yZXNwb25zZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBtZXRhIGluZm8gdmFsdWVcclxuICAgICAgICAgICAgY29uc3QgbWV0YUluZm9WYWx1ZSA9IHJlYWRNZXRhSW5mb1ZhbHVlc1Jlc3VsdC5yZXNwb25zZXNbaV0uYm9keS52YWx1ZTtcclxuICAgICAgICAgICAgLy8gZ2V0IHJlc3BvbnNlIGlkXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlSWQgPSByZWFkTWV0YUluZm9WYWx1ZXNSZXN1bHQucmVzcG9uc2VzW2ldLmlkO1xyXG4gICAgICAgICAgICAvLyBhc3NpZ24gbWV0YSBpbmZvIHZhbHVlIHRvIGNvcnJlc3BvbmRpbmcgbWV0YSB2YWx1ZSBvYmplY3RcclxuICAgICAgICAgICAgKDxhbnk+bWV0YUluZm9SZWZlcmVuY2VzW3Jlc3BvbnNlSWRdKS52YWx1ZSA9IG1ldGFJbmZvVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIG1ldGEgaW5mbyB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2VbXX0gbWV0YUluZm9SZWZlcmVuY2VzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVhZE1ldGFJbmZvVmFsdWVzKG1ldGFJbmZvUmVmZXJlbmNlczogUmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlW10sIHNlc3Npb25JZDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIC8vIGFjdGl2YXRlIGJhdGNoIG1vZGVcclxuICAgICAgICB0aGlzLl9yZXN0U2VydmljZS5tb2RlID0gUmVzdFNlcnZpY2VNb2RlLkJBVENIO1xyXG4gICAgICAgIGxldCByZWFkTWV0YUluZm9WYWx1ZXNSZXF1ZXN0czogUmVzdFJlcXVlc3RJbmZvW10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHJlcXVlc3RzIGZvciByZWFkaW5nIHRoZSBtZXRhIGluZm8gbm9kZXMvdmFsdWVzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRhSW5mb1JlZmVyZW5jZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVhZE1ldGFJbmZvVmFsdWVzUmVxdWVzdHMucHVzaChhd2FpdCB0aGlzLnJlYWROb2RlQXR0cmlidXRlKHNlc3Npb25JZCwgbWV0YUluZm9SZWZlcmVuY2VzW2ldLm5vZGVJZCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZXRlcm1pbmF0ZSBiYXRjaCBtb2RlIGFuZCBleGN1dGUgYmF0Y2ggcmVxdWVzdFxyXG4gICAgICAgIHRoaXMuX3Jlc3RTZXJ2aWNlLm1vZGUgPSBSZXN0U2VydmljZU1vZGUuRVhFQ1VURTtcclxuICAgICAgICBsZXQgcmVhZE1ldGFJbmZvVmFsdWVzUmVzdWx0ID0gYXdhaXQgdGhpcy5jYWxsQmF0Y2hSZXF1ZXN0KHJlYWRNZXRhSW5mb1ZhbHVlc1JlcXVlc3RzKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcmVhZE1ldGFJbmZvVmFsdWVzUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyB0aGUgcGFyYW1ldGVycyBvZiB0aGUgc3BlY2lmaWVkIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+Pn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGJyb3dzZU5vZGVQYXJhbWV0ZXJzKHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIEJyb3dzZSB0aGUgcGFyYW1ldGVyIHNldCBhbmQgZXh0cmFjdCB2YXJpYWJsZSB0eXBlcyBvbmx5LlxyXG5cclxuICAgICAgICAgICAgdmFyIHBhcmFtZXRlclJlZmVyZW5jZXMgPSBhd2FpdCB0aGlzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgbm9kZUlkKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlUGFyYW1ldGVyUmVmZXJlbmNlcyA9IHBhcmFtZXRlclJlZmVyZW5jZXMuZmlsdGVyKChwYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHBhcmFtZXRlci5ub2RlQ2xhc3MgPT09IFwiVmFyaWFibGVcIiB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlUGFyYW1ldGVyUmVmZXJlbmNlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIHBhcmFtZXRlciBzZXQgb2YgYSBub2RlIGlmIGFueS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxPcGNVYU5vZGVSZWZlcmVuY2VJbnRlcmZhY2U+Pn0gVGhlIHBhcmVtZXRlciByZWZlcmVuY2VzXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBicm93c2VOb2RlUGFyYW1ldGVyU2V0KHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgc3ViIG5vZGUgaWQgZm9yIHBhcmFtZXRlci5cclxuICAgICAgICAgICAgbm9kZUlkICs9IFwiLlBhcmFtZXRlclNldFwiO1xyXG4gICAgICAgICAgICAvLyBCcm93c2UgdGhlIHBhcmFtZXRlciBzZXQgYW5kIGV4dHJhY3QgdmFyaWFibGUgdHlwZXMgb25seS5cclxuXHJcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJSZWZlcmVuY2VzID0gKGF3YWl0IHRoaXMuYnJvd3NlTm9kZXMoc2Vzc2lvbklkLCBub2RlSWQpKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlUGFyYW1ldGVyUmVmZXJlbmNlcyA9IHBhcmFtZXRlclJlZmVyZW5jZXMuZmlsdGVyKChwYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHBhcmFtZXRlci5ub2RlQ2xhc3MgPT09IFwiVmFyaWFibGVcIiB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlUGFyYW1ldGVyUmVmZXJlbmNlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIHNwZWNpZmllZCBub2RlIGF0dHJpYnV0ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gYXR0cmlidXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IE9wY1VhQXR0cmlidXRlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgcmVhZE5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nLCBhdHRyaWJ1dGU6IE9wY1VhQXR0cmlidXRlID0gT3BjVWFBdHRyaWJ1dGUuVkFMVUUpOiAgUHJvbWlzZTxhbnk+e1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gdGhpcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChub2RlSWQpICsgJy9hdHRyaWJ1dGVzLycgKyBhdHRyaWJ1dGU7XHJcbiAgICAgICAgICAgIHZhciByZXN0U2VydmljZVJlc3VsdCA9IChhd2FpdCB0aGlzLl9yZXN0U2VydmljZS5jYWxsPFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0QXR0cmlidXRlVmFsdWU+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3RTZXJ2aWNlLm1vZGUgPT09IFJlc3RTZXJ2aWNlTW9kZS5FWEVDVVRFID8gKDxhbnk+cmVzdFNlcnZpY2VSZXN1bHQpLnZhbHVlIDogcmVzdFNlcnZpY2VSZXN1bHQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgdGhlIG5vZGUgYXR0cmlidXRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxyXG4gICAgICogQHBhcmFtIHtPcGNVYUF0dHJpYnV0ZX0gW2F0dHJpYnV0ZT1PcGNVYUF0dHJpYnV0ZS5WQUxVRV1cclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyB3cml0ZU5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nLCBhdHRyaWJ1dGU6IE9wY1VhQXR0cmlidXRlID0gT3BjVWFBdHRyaWJ1dGUuVkFMVUUsIHZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZURhdGEgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUgPT09IE9wY1VhQXR0cmlidXRlLlZBTFVFKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZURhdGEgPSB7IFwidmFsdWVcIjogdmFsdWUgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSB0aGlzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9ub2Rlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG5vZGVJZCkgKyAnL2F0dHJpYnV0ZXMvJyArIGF0dHJpYnV0ZTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVzdFNlcnZpY2UuY2FsbDxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdEF0dHJpYnV0ZVZhbHVlPihSZXN0U2VydmljZVR5cGUuUFVULCBzZXJ2aWNlVXJsLCB2YWx1ZURhdGEpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyB0aGUgbWV0aG9kcyBwZiB0aGUgc3BlY2lmZWQgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT4+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgYnJvd3NlTm9kZU1ldGhvZHMoc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gQnJvd3NlIHRoZSBtZXRob2Qgc2V0LlxyXG4gICAgICAgICAgICB2YXIgbWV0aG9kUmVmZXJlbmNlcyA9IChhd2FpdCB0aGlzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgbm9kZUlkKSkuZmlsdGVyKChtZXRob2QpID0+IHsgcmV0dXJuIG1ldGhvZC5ub2RlQ2xhc3MgPT09IFwiTWV0aG9kXCIgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2RSZWZlcmVuY2VzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyB0aGUgbWV0aG9kIHNldCBvZiBhIG5vZGUgaWYgYW55LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PE9wY1VhTm9kZVJlZmVyZW5jZUludGVyZmFjZT4+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgYnJvd3NlTm9kZU1ldGhvZFNldChzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT4+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIHN1YiBub2RlIGlkIGZvciBtZXRob2RzLlxyXG4gICAgICAgICAgICBub2RlSWQgKz0gXCIuTWV0aG9kU2V0XCI7XHJcbiAgICAgICAgICAgIC8vIEJyb3dzZSB0aGUgbWV0aG9kIHNldC5cclxuICAgICAgICAgICAgdmFyIG1ldGhvZFJlZmVyZW5jZXMgPSAoYXdhaXQgdGhpcy5icm93c2VOb2RlcyhzZXNzaW9uSWQsIG5vZGVJZCkpLmZpbHRlcigobWV0aG9kKSA9PiB7IHJldHVybiBtZXRob2Qubm9kZUNsYXNzID09PSBcIk1ldGhvZFwiIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kUmVmZXJlbmNlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgaW5wdXQgcGFyYW1ldGVycyBvZiBhIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyByZWFkTWV0aG9kUGFyYW1ldGVycyhzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgc3ViIG5vZGUgaWQgZm9yIG1ldGhvZCBwYXJhbWV0ZXJzLlxyXG4gICAgICAgICAgICBub2RlSWQgKz0gXCIjSW5wdXRBcmd1bWVudHNcIjtcclxuICAgICAgICAgICAgLy8gQnJvd3NlIHRoZSBpbnB1dCBhcmd1bWVudHNcclxuICAgICAgICAgICAgdmFyIGlucHV0QXJndW1lbnRzID0gKGF3YWl0IHRoaXMucmVhZE5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkLCBub2RlSWQsIE9wY1VhQXR0cmlidXRlLlZBTFVFKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dEFyZ3VtZW50cztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhbmQgY2FsbCBhIGpzb24gYmF0Y2ggcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5LkFqYXhTZXR0aW5nczxhbnk+W119IHJlc3RSZXF1ZXN0c1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgY2FsbEJhdGNoUmVxdWVzdChyZXN0UmVxdWVzdHM6IFJlc3RSZXF1ZXN0SW5mb1tdKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3Jlc3RTZXJ2aWNlLmNhbGxCYXRjaFJlcXVlc3Q8YW55Pih0aGlzLmdldE9wY1VhQmFzZVVybCgpICxyZXN0UmVxdWVzdHMpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyB0aGUgc3BlY2lmaWVkIG1ldGhvZCBcclxuICAgICAqXHJcbiAgICAgKiBAdGVtcGxhdGUgVF9NRVRIT0RfUkVTVUxUXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0aG9kQXJnc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VF9NRVRIT0RfUkVTVUxUPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGV4ZWN1dGVNZXRob2Q8VF9NRVRIT0RfUkVTVUxUPihzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcsIG1ldGhvZElkOiBzdHJpbmcsIG1ldGhvZEFyZ3M6IGFueSk6IFByb21pc2U8VF9NRVRIT0RfUkVTVUxUPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSB0aGlzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9ub2Rlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG5vZGVJZCkgKyAnL21ldGhvZHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChtZXRob2RJZCk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCB0aGlzLl9yZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLlBPU1QsIHNlcnZpY2VVcmwsIG1ldGhvZEFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlsdGVycyB0aGUgbm9kZXMgdG8gYmUgZGlzcGxheWVkIGluIG1hcHAgY29ja3BpdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPn0gb3BjVWFOb2Rlc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1hcHBDb2NrcGl0TmFtZXNwYWNlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgZmlsdGVyTWFwcENvY2twaXROb2RlcyhvcGNVYU5vZGVzOiBBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+LCBtYXBwQ29ja3BpdE5hbWVzcGFjZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wY1VhTm9kZXMuZmlsdGVyKChub2RlUmVmZXJlbmNlKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBpc0NoaWxkTm9kZSA9IG5vZGVSZWZlcmVuY2UuaXNGb3J3YXJkID09PSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG5vZGUgaXMgd2l0aGluIHRoZSBtYXBwIGNvY2twaXQgbmFtZXNwYWNlXHJcbiAgICAgICAgICAgIHZhciBpc01hcHBDb21wb25lbnQgPSAoPFN0cmluZz5ub2RlUmVmZXJlbmNlLnR5cGVEZWZpbml0aW9uKS5pbmRleE9mKG1hcHBDb2NrcGl0TmFtZXNwYWNlKSA+IC0xO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGlzQ2hpbGROb2RlICYmIGlzTWFwcENvbXBvbmVudDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogRGVmaW5lcyBPcGNVYSBBdHRyaWJ1dGUgbmFtZXMuXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIE9wY1VhQXR0cmlidXRlIHtcclxuICAgIFZBTFVFID0gXCJWYWx1ZVwiLFxyXG4gICAgREFUQV9UWVBFID0gXCJEYXRhVHlwZVwiLFxyXG4gICAgQlJPV1NFX05BTUUgPSBcIkJyb3dzZU5hbWVcIixcclxuICAgIERJU1BMQVlfTkFNRSA9IFwiRGlzcGxheU5hbWVcIixcclxuICAgIERFU0NSSVBUSU9OID0gXCJEZXNjcmlwdGlvblwiLFxyXG4gICAgVVNFUl9BQ0NFU1NfTEVWRUwgPSBcIlVzZXJBY2Nlc3NMZXZlbFwiXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTcGVjaWZpZXMgYWNjZXNzIGxldmVscyAoIGFzIGJpdCBmbGFncyApIFxyXG4gKlxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZW51bSBPcGNVYUFjY2Vzc0xldmVsIHtcclxuICAgIEN1cnJlbnRSZWFkID0gMHgwMSxcclxuICAgIEN1cnJlbnRXcml0ZSA9IDB4MDIsXHJcbiAgICBIaXN0b3J5UmVhZCA9IDB4MDQsXHJcbiAgICBIaXN0b3J5V3JpdGUgPSAweDA4LFxyXG4gICAgU2VtYW50aWNDaGFuZ2UgPSAweDEwLFxyXG4gICAgU3RhdHVzV3JpdGUgPSAweDIwLFxyXG4gICAgVGltZXN0YW1wV3JpdGUgPSAweDQwLFxyXG4gICAgUmVzZXJ2ZWQgPSAweDgwLFxyXG59XHJcblxyXG4iXX0=