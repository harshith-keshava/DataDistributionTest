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
define(["require", "exports", "../../communication/rest/opcUaWebSocket", "../../communication/rest/opcUaRestServices", "../../framework/events", "../../framework/interfaces/observer"], function (require, exports, opcUaWebSocket_1, opcUaRestServices_1, events_1, observer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventObservedItemsChanged = /** @class */ (function (_super) {
        __extends(EventObservedItemsChanged, _super);
        function EventObservedItemsChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventObservedItemsChanged;
    }(events_1.TypedEvent));
    ;
    var EventObservedSubscriptionItemsChanged = /** @class */ (function (_super) {
        __extends(EventObservedSubscriptionItemsChanged, _super);
        function EventObservedSubscriptionItemsChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventObservedSubscriptionItemsChanged;
    }(events_1.TypedEvent));
    ;
    var EventObservedItemsChangedArgs = /** @class */ (function () {
        function EventObservedItemsChangedArgs(observer, subscription, changedItems) {
            this._observer = observer;
            this._monitoringSubscription = subscription;
            this._changedMonitoredItems = changedItems;
        }
        Object.defineProperty(EventObservedItemsChangedArgs.prototype, "observer", {
            get: function () {
                return this._observer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventObservedItemsChangedArgs.prototype, "subscription", {
            get: function () {
                return this._monitoringSubscription;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventObservedItemsChangedArgs.prototype, "changedItems", {
            get: function () {
                return this._changedMonitoredItems;
            },
            enumerable: true,
            configurable: true
        });
        return EventObservedItemsChangedArgs;
    }());
    exports.EventObservedItemsChangedArgs = EventObservedItemsChangedArgs;
    ;
    /**
     * implements observation and monitoring of diagnostic elements
     *
     * @class MappCockpitDiagnosticMonitoringProvider
     */
    var MappCockpitDiagnosticMonitoringProvider = /** @class */ (function () {
        /**
         *Creates an instance of MappCockpitDiagnosticMonitoringProvider.
         * @param {MappCockpitDiagnosticProvider} diagnosticProvider
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        function MappCockpitDiagnosticMonitoringProvider(diagnosticProvider) {
            var _this = this;
            this._opcUaWebSocketHandler = function (sender, eventArgs) { _this.handleOpcUaEvent(eventArgs); };
            this._observedItemsChangedHandler = function (sender, eventArgs) { _this.eventObservedItemsChanged.raise(_this, eventArgs); };
            this._diagnosticProvider = diagnosticProvider;
            this._monitoringSubscriptions = new MonitoringSubscriptionCollection();
            this.eventObservedItemsChanged = new EventObservedItemsChanged();
        }
        /**
         * creates a connection for listening to events from opc-ua
         *
         * @private
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.createOpcUaSocket = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._opcUaWebSocket = opcUaWebSocket_1.OpcUaWebSocket.create();
                            this._opcUaWebSocket.eventOpcUaWebSocket.attach(this._opcUaWebSocketHandler);
                            return [4 /*yield*/, this._opcUaWebSocket.connect()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * activates observing parameter changes.
         *
         * @param {*} observer
         * @param {number} sessionId
         * @param {MappCockpitComponentItem[]} componentParameters
         * @returns {Promise<void>}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.observeComponentModelItems = function (observer, sessionId, componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            subscription = this.findSubscriptionForObserver(observer, sessionId);
                            if (!!subscription) return [3 /*break*/, 2];
                            return [4 /*yield*/, MonitoringSubscription.create(observer, sessionId)];
                        case 1:
                            subscription = _a.sent();
                            // add the new subscription to the subscription collection
                            this._monitoringSubscriptions.add(subscription);
                            _a.label = 2;
                        case 2:
                            if (!subscription) return [3 /*break*/, 4];
                            // attach items changed event and forward it through the provider
                            subscription.eventObservedItemsChanged.attach(this._observedItemsChangedHandler);
                            // create the items to monitor
                            return [4 /*yield*/, subscription.createMonitoredItems(componentParameters)];
                        case 3:
                            // create the items to monitor
                            _a.sent();
                            console.log("MappCockpitDiagnosticMonitoringProvider:created subscription: %o %o %o %o", observer, componentParameters, subscription.id, subscription);
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            console.error(error_1);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Gets the subscription for the observer.
         *
         * @private
         * @param {*} observer
         * @param {number} sessionId
         * @returns
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.findSubscriptionForObserver = function (observer, sessionId) {
            // find a subscription for this observer.
            var existingSubscription = this._monitoringSubscriptions.items.filter(function (subscription) { return subscription.observer == observer; });
            // check if a subscription for this observer already exists.
            if (existingSubscription.length >= 1) {
                // return the existing subscription ...
                return existingSubscription[0];
            }
            else {
                return null;
            }
        };
        /**
         * Unobserves the passed items.
         *
         * @param {*} observer
         * @param {number} sessionId
         * @param {MappCockpitComponentItem[]} observedItems
         * @param {boolean} suspend
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.unobserveComponentModelItems = function (observer, sessionId, observedItems, suspend) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription, deletedSubscriptionId, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            subscription = this.findSubscriptionForObserver(observer, sessionId);
                            if (!subscription) return [3 /*break*/, 5];
                            if (!(observedItems.length === 0)) return [3 /*break*/, 2];
                            // if no observables are specified, we delete the whole subscription to remove all contained monitored items
                            subscription.eventObservedItemsChanged.detach(this._observedItemsChangedHandler);
                            return [4 /*yield*/, this.deleteSubscription(sessionId, subscription)];
                        case 1:
                            deletedSubscriptionId = _a.sent();
                            console.log("MappCockpitDiagnosticMonitoringProvider.unobserveComponentModelItems:deleted subscription - observer:%o :subscriptionId:%o", subscription.observer, deletedSubscriptionId);
                            return [3 /*break*/, 5];
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            // create the items to monitor
                            return [4 /*yield*/, subscription.deleteMontitoredItems(observedItems)];
                        case 3:
                            // create the items to monitor
                            _a.sent();
                            console.log("MappCockpitDiagnosticMonitoringProvider.unobserveComponentModelItems:removed items - observer:%o :items %o, subscriptionId:%o", subscription.observer, observedItems, subscription.id);
                            return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            console.error(error_2);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Deletes a subscription with its monitored items.
         *
         * @private
         * @param {number} sessionId
         * @param {MonitoringSubscription} subscription
         * @returns {Promise<number>}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.deleteSubscription = function (sessionId, subscription) {
            return __awaiter(this, void 0, void 0, function () {
                var deletedSubscriptionId, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            deletedSubscriptionId = -1;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, MonitoringSubscription.delete(sessionId, subscription.id)];
                        case 2:
                            // delete the subscription on the target
                            deletedSubscriptionId = _a.sent();
                            // remove the subscription instance from the list
                            this._monitoringSubscriptions.remove(subscription);
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            console.error(error_3);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, deletedSubscriptionId];
                    }
                });
            });
        };
        /**
         * handles opc-ua events
         *
         * @param {OpcUaWebSocketEventArgs} eventArgs
         * @returns {*}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.handleOpcUaEvent = function (eventArgs) {
            switch (eventArgs.type) {
                case opcUaWebSocket_1.SockeEventType.MESSAGE:
                    this.processOpcUaDataChanged(eventArgs.data);
                    break;
                default:
                    break;
            }
        };
        /**
         * receives the data changed and distributes it to consumers
         *
         * @private
         * @param {IOpcUaDataChanged} opcUaDataChangedInfo
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.processOpcUaDataChanged = function (opcUaDataChangedInfo) {
            var modifiedSubscription = this._monitoringSubscriptions.findById(opcUaDataChangedInfo.subscriptionId);
            if (modifiedSubscription) {
                modifiedSubscription.processItemChanges(opcUaDataChangedInfo);
            }
        };
        /**
         * closes the monitoring provider and all its connections
         *
         * @returns {*}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.close = function () {
            if (this._opcUaWebSocket) {
                this._opcUaWebSocket.eventOpcUaWebSocket.detach(this._opcUaWebSocketHandler);
                this._opcUaWebSocket.close();
            }
        };
        return MappCockpitDiagnosticMonitoringProvider;
    }());
    exports.MappCockpitDiagnosticMonitoringProvider = MappCockpitDiagnosticMonitoringProvider;
    /**
     * the class holds and manages subscriptions.
     *
     * @class MonitoringSubscriptionSet
     */
    var MonitoringSubscriptionCollection = /** @class */ (function () {
        /**
         *Creates an instance of MonitoringSubscriptionCollection.
         * @memberof MonitoringSubscriptionCollection
         */
        function MonitoringSubscriptionCollection() {
            // the subscription instances are stored with id as key on a simple object
            this._subscriptions = new Map();
        }
        /**
         * adds a new subcription
         *
         * @param {MonitoringSubscription} subscription
         * @memberof MonitoringSubscriptionCollection
         */
        MonitoringSubscriptionCollection.prototype.add = function (subscription) {
            // store the subscription by id
            this._subscriptions.set(subscription.id, subscription);
        };
        /**
         * removes the given subscription
         *
         * @param {MonitoringSubscription} subscription
         * @memberof MonitoringSubscriptionCollection
         */
        MonitoringSubscriptionCollection.prototype.remove = function (subscription) {
            this._subscriptions.delete(subscription.id);
        };
        /**
         * returns the subscription with the requested id
         *
         * @param {number} subscriptionId
         * @memberof MonitoringSubscriptionCollection
         */
        MonitoringSubscriptionCollection.prototype.findById = function (subscriptionId) {
            // retrieve the available subscription
            return this._subscriptions.get(subscriptionId);
        };
        Object.defineProperty(MonitoringSubscriptionCollection.prototype, "items", {
            /**
             * gets the available subscriptions
             *
             * @readonly
             * @type {Array<MonitoringSubscription>}
             * @memberof MonitoringSubscriptionCollection
             */
            get: function () {
                return Array.from(this._subscriptions.values());
            },
            enumerable: true,
            configurable: true
        });
        return MonitoringSubscriptionCollection;
    }());
    /**
     * implements managing a set of monitoring items in a subscription
     *
     * @class MonitoringSubscription
     */
    var MonitoringSubscription = /** @class */ (function () {
        /**
         * Creates an instance of MonitoringSubscription.
         * @param {*} observer
         * @param {*} sessionId
         * @param {number} subscriptionId
         * @memberof MonitoringSubscription
         */
        function MonitoringSubscription(observer, sessionId, subscriptionId) {
            // holds the subscription id
            this._subscriptionId = -1;
            // holds a collection of items to be monitored
            this._monitoringItems = new Map();
            // holds the next possible client id
            this._nextClientId = 0;
            this._subscriptionObserver = observer;
            this._sessionId = sessionId;
            this._subscriptionId = subscriptionId;
            this._monitoringItems = new Map();
            this.eventObservedItemsChanged = new EventObservedSubscriptionItemsChanged();
        }
        Object.defineProperty(MonitoringSubscription.prototype, "id", {
            /**
             * returns the subscription id
             *
             * @readonly
             * @memberof MonitoringSubscription
             */
            get: function () {
                return this._subscriptionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonitoringSubscription.prototype, "observer", {
            /**
             * returns the observer interrested in change notifications
             *
             * @readonly
             * @type {*}
             * @memberof MonitoringSubscription
             */
            get: function () {
                return this._subscriptionObserver;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * returns the monitored item with the specefied id
         *
         * @param {*} clientId
         * @returns {MappCockpitComponentParameter}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.getMonitoredItemById = function (clientId) {
            return this._monitoringItems.get(clientId);
        };
        /**
         * creates a new monitoring subscription.
         *
         * @static
         * @param {*} observer
         * @param {number} sessionId
         * @returns {Promise<MonitoringSubscription>}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.create = function (observer, sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var subscriptionId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.createSubscription(sessionId)];
                        case 1:
                            subscriptionId = _a.sent();
                            return [2 /*return*/, new MonitoringSubscription(observer, sessionId, subscriptionId)];
                    }
                });
            });
        };
        /**
         * Deletes the specified subscription
         *
         * @static
         * @param {number} sessionId
         * @param {number} subscriptionId
         * @returns {Promise<number>}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.delete = function (sessionId, subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.deleteSubscription(sessionId, subscriptionId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * creates a set of items to be monitored
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {Promise<any>}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.createMonitoredItems = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var newMonitoredItems_1, createMonitoredItemsBatchServices, createMonitoredItemsResult, error_4;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            newMonitoredItems_1 = Array.from(this.createMonitoredSubscriptionItems(componentParameters).values());
                            createMonitoredItemsBatchServices = opcUaRestServices_1.OpcUaRestServices.create();
                            createMonitoredItemsBatchServices.activateBatching();
                            // invoke the creation of the new monitored items
                            return [4 /*yield*/, this.invokeCreateMonitoredSubscriptionItems(createMonitoredItemsBatchServices, newMonitoredItems_1)];
                        case 1:
                            // invoke the creation of the new monitored items
                            _a.sent();
                            return [4 /*yield*/, createMonitoredItemsBatchServices.executeBatchRequest()];
                        case 2:
                            createMonitoredItemsResult = _a.sent();
                            // process the batch request result by connecting the monitored item ids ..
                            createMonitoredItemsResult.forEach(function (responseValue, requestId) {
                                var requestedItem = newMonitoredItems_1[requestId];
                                // update the monitoring items id.
                                if (requestedItem != undefined) {
                                    requestedItem.id = responseValue.monitoredItemId;
                                }
                                else {
                                    console.error("requestedItem == undefined");
                                    console.error(_this);
                                    console.error(newMonitoredItems_1);
                                }
                            }, this);
                            return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            console.error(error_4);
                            return [3 /*break*/, 4];
                        case 4:
                            console.log("MonitoringSubscription:createMonitoredItems: %o", componentParameters);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Adds new monitored items.
         *
         * @private
         * @param {MappCockpitComponentItem[]} componentItems
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.createMonitoredSubscriptionItems = function (componentItems) {
            var _this = this;
            var newMonitoredItems = new Map();
            componentItems.forEach(function (componentItem) {
                // create the monotored item for the values
                _this.addNewMonitoringItem(componentItem, newMonitoredItems, opcUaRestServices_1.OpcUaAttribute.VALUE);
                // create the monotored item for the user access level
                _this.addNewMonitoringItem(componentItem, newMonitoredItems, opcUaRestServices_1.OpcUaAttribute.USER_ACCESS_LEVEL);
            });
            return newMonitoredItems;
        };
        /**
         * Adds a new monitoring item to the subscription.
         *
         * @private
         * @param {MappCockpitComponentItem} componentItem
         * @param {Map<number, MonitoringSubscriptionItem>} newMonitoredItems
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.addNewMonitoringItem = function (componentItem, newMonitoredItems, opcUaAttribute) {
            // get the next client handle
            var clientHandle = this.getNextClientHandle();
            // create a new monitoring item instance
            var newMonitorItem = MonitoringSubscriptionItem.create(componentItem, opcUaAttribute, clientHandle);
            // add it to the subscription items collection
            this._monitoringItems.set(clientHandle, newMonitorItem);
            // add it to the subscription items
            newMonitoredItems.set(clientHandle, newMonitorItem);
        };
        /**
         * Creates the monitored subscription items
         *
         * @private
         * @param {MappCockpitComponentItem[]} componentItems
         * @returns
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.invokeCreateMonitoredSubscriptionItems = function (createMonitoredItemsBatchServices, monitoringItems) {
            return __awaiter(this, void 0, void 0, function () {
                var i, monitoringItem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < monitoringItems.length)) return [3 /*break*/, 4];
                            monitoringItem = monitoringItems[i];
                            return [4 /*yield*/, createMonitoredItemsBatchServices.createMonitoredItem(this._sessionId, this._subscriptionId, monitoringItem.monitoringObject.id, monitoringItem.clientId, opcUaRestServices_1.OpcUaRestServices.monitoringSamplingInterval, monitoringItem.monitoringProperty)];
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
         *
         *
         * @private
         * @returns {number}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.getNextClientHandle = function () {
            // get the next client id and set it to the next value. This ensures a unique id over the subscription lifetime when removing and readding monitored items.
            return this._nextClientId++;
        };
        /**
         * Removes the specified observales from the subscription
         *
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.deleteMontitoredItems = function (observedItems) {
            return __awaiter(this, void 0, void 0, function () {
                var deleteMonitoredItemsBatchServices, obsoleteMonitoringItemsToDelete, deletedResult, error_5, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            if (!(this._monitoringItems.size > 0)) return [3 /*break*/, 5];
                            deleteMonitoredItemsBatchServices = opcUaRestServices_1.OpcUaRestServices.create();
                            deleteMonitoredItemsBatchServices.activateBatching();
                            return [4 /*yield*/, this.getObsoleteMonitoredItems(observedItems, deleteMonitoredItemsBatchServices)];
                        case 1:
                            obsoleteMonitoringItemsToDelete = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, deleteMonitoredItemsBatchServices.executeBatchRequest()];
                        case 3:
                            deletedResult = _a.sent();
                            //TODO: match the deleted keys of the result to the requested items and delete. Currently the order and number of requests strictly needs to match the responses,
                            // which is typically the case.
                            // remove monitored items after unsubscribing them
                            this.deleteManagedMonitoredItems(obsoleteMonitoringItemsToDelete);
                            return [3 /*break*/, 5];
                        case 4:
                            error_5 = _a.sent();
                            console.error(error_5);
                            return [3 /*break*/, 5];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_6 = _a.sent();
                            console.log(error_6);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Deletes the obsolete items from the managed collection
         *
         * @private
         * @param {MonitoringSubscriptionItem[]} obsoleteMonitoringItemsToDelete
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.deleteManagedMonitoredItems = function (obsoleteMonitoringItemsToDelete) {
            var _this = this;
            // find the obsolete and deleted items in the collection and delete it.
            var monitoringEntries = Array.from(this._monitoringItems.entries());
            obsoleteMonitoringItemsToDelete.forEach(function (obsoleteItem) {
                var obsoleteMonitoringItem = monitoringEntries.forEach(function (item) {
                    if (item[1] === obsoleteItem) {
                        _this._monitoringItems.delete(item[0]);
                    }
                });
            });
        };
        /**
         * Collects the obsolete minitored items to be deleted
         *
         * @private
         * @param {MappCockpitComponentItem[]} observedItems
         * @param {OpcUaRestServiceProvider} deleteMonitoredItemsBatchServices
         * @returns
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.getObsoleteMonitoredItems = function (observedItems, deleteMonitoredItemsBatchServices) {
            return __awaiter(this, void 0, void 0, function () {
                var obsoleteMonitoringItemsToDelete, i, obsoleteMonitoringItems, i_1, itemDeleted;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            obsoleteMonitoringItemsToDelete = [];
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < observedItems.length)) return [3 /*break*/, 6];
                            obsoleteMonitoringItems = this.findObservedSubscriptionItems(observedItems[i]);
                            if (!(obsoleteMonitoringItems.length > 0)) return [3 /*break*/, 5];
                            i_1 = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i_1 < obsoleteMonitoringItems.length)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.removeMonitoredSubscriptionItem(deleteMonitoredItemsBatchServices, obsoleteMonitoringItems[i_1])];
                        case 3:
                            itemDeleted = _a.sent();
                            if (itemDeleted) {
                                obsoleteMonitoringItemsToDelete.push(itemDeleted);
                            }
                            _a.label = 4;
                        case 4:
                            i_1++;
                            return [3 /*break*/, 2];
                        case 5:
                            i++;
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/, obsoleteMonitoringItemsToDelete];
                    }
                });
            });
        };
        /**
         * Finds all monitoring items with matching monitoringObjet.id
         *
         * @private
         * @param {any[]} observedItems
         * @param {number} i
         * @returns
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.findObservedSubscriptionItems = function (observedItem) {
            // get the key of a matching item ( the monitoring object ids need to be the same)
            var monitoringItems = Array.from(this._monitoringItems.values()).filter(function (item) { return item.monitoringObject.id === observedItem.id; });
            return monitoringItems;
        };
        /**
         * Removes the monitored item from the subscription
         *
         * @private
         * @param {any[]} observedItems
         * @param {number} itemKey
         * @param {MonitoringSubscriptionItem} subscriptionItem
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.removeMonitoredSubscriptionItem = function (deleteMonitoredItemsBatchServices, subscriptionItem) {
            return __awaiter(this, void 0, void 0, function () {
                var monitoringEntries, obsoleteMonitoringItem, obsoleteItem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            monitoringEntries = Array.from(this._monitoringItems.entries());
                            obsoleteMonitoringItem = monitoringEntries.find(function (item) {
                                return (item[1].monitoringObject.id === subscriptionItem.monitoringObject.id)
                                    && (item[1].monitoringProperty === subscriptionItem.monitoringProperty);
                            });
                            if (!obsoleteMonitoringItem) return [3 /*break*/, 2];
                            obsoleteItem = obsoleteMonitoringItem[1];
                            // remove obsolete item from the subscription.
                            return [4 /*yield*/, deleteMonitoredItemsBatchServices.deleteMonitoredItem(this._sessionId, this._subscriptionId, obsoleteItem.id)];
                        case 1:
                            // remove obsolete item from the subscription.
                            _a.sent();
                            return [2 /*return*/, subscriptionItem];
                        case 2: return [2 /*return*/, null];
                    }
                });
            });
        };
        /**
         * handles the processing of item changes
         *
         * @param {IOpcUaDataChanged} opcUaDataChangedInfo
         * @returns {*}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.processItemChanges = function (opcUaDataChangedInfo) {
            var _this = this;
            var changedObservables = new Array();
            opcUaDataChangedInfo.DataNotifications.forEach(function (dataNotification) {
                // get the item to change
                var monitorItem = _this.getMonitoredItemById(dataNotification.clientHandle);
                if (monitorItem) {
                    // update the items value
                    monitorItem.changeValue(dataNotification.value);
                    // add it to the modified observables list
                    changedObservables.push(new observer_1.Observable(monitorItem.monitoringObject, monitorItem.monitoringProperty));
                }
                else {
                    throw new Error('MappCockpitDiagnosticMonitoringProvider.processOpcUaDataChanged: Could not find monitored item ' + JSON.stringify(dataNotification));
                }
            });
            this.onMonitorItemsChanged(this, changedObservables);
        };
        /**
         * notifies from updateing observed items
         *
         * @param {MonitoringSubscription} changedSubscription
         * @param {Observable[]} changedObservables
         * @returns {*}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.onMonitorItemsChanged = function (changedSubscription, changedObservables) {
            var changedEventArgs = new EventObservedItemsChangedArgs(changedSubscription.observer, changedSubscription, changedObservables);
            this.eventObservedItemsChanged.raise(this, changedEventArgs);
            this.notifyObserverFromChanges(changedSubscription.observer, changedObservables);
        };
        /**
         * notifies the observer from changes if the observer implements the notification interface
         *
         * @private
         * @param {IObserver} observer
         * @param {Observables[]} changedObservables
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.notifyObserverFromChanges = function (observer, changedObservables) {
            if (observer.onObservablesChanged) {
                observer.onObservablesChanged(changedObservables);
            }
        };
        return MonitoringSubscription;
    }());
    /**
     * The class holds information about the subsripted item
     *
     * @class MonitoringSubscriptionItem
     */
    var MonitoringSubscriptionItem = /** @class */ (function () {
        /**
         * Creates an instance of MonitoringSubscriptionItem.
         * @param {*} monitoringObject
         * @param {string} monitoringProperty
         * @memberof MonitoringSubscriptionItem
         */
        function MonitoringSubscriptionItem(monitoringObject, monitoringProperty, clientId) {
            // holds the item instance
            this._monitorItemInstance = undefined;
            // holds the property name of the item to watch
            this._monitoringProperty = "";
            // holds the monitor item id
            this._id = "";
            // holds client id 
            this._clientId = -1;
            this._monitorItemInstance = monitoringObject;
            this._monitoringProperty = monitoringProperty;
            this._clientId = clientId;
        }
        Object.defineProperty(MonitoringSubscriptionItem.prototype, "monitoringObject", {
            /**
             * Gets the monitoring object
             *
             * @readonly
             * @type {*}
             * @memberof MonitoringSubscriptionItem
             */
            get: function () {
                return this._monitorItemInstance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonitoringSubscriptionItem.prototype, "monitoringProperty", {
            /**
             * Gets the monitoring property
             *
             * @readonly
             * @type {string}
             * @memberof MonitoringSubscriptionItem
             */
            get: function () {
                return this._monitoringProperty;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonitoringSubscriptionItem.prototype, "clientId", {
            /**
             * Gets the client id
             *
             * @readonly
             * @type {number}
             * @memberof MonitoringSubscriptionItem
             */
            get: function () {
                return this._clientId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonitoringSubscriptionItem.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * creates and initializes a new monitoring item
         *
         * @static
         * @param {MappCockpitComponentItem} monitoringObject
         * @param {string} monitoringProperty
         * @param {number} clientId
         * @returns {MonitoringSubscriptionItem}
         * @memberof MonitoringSubscriptionItem
         */
        MonitoringSubscriptionItem.create = function (monitoringObject, monitoringProperty, clientId) {
            return new MonitoringSubscriptionItem(monitoringObject, monitoringProperty, clientId);
        };
        /**
         * Updates the specified item property with the new value
         *
         * @param {*} newMonitoredItemValue
         * @returns {*}
         * @memberof MonitoringSubscriptionItem
         */
        MonitoringSubscriptionItem.prototype.changeValue = function (newMonitoredItemValue) {
            switch (this.monitoringProperty) {
                case "Value":
                    // set object value
                    this.monitoringObject.value = newMonitoredItemValue;
                    break;
                case "UserAccessLevel":
                    // set writeable attribute according to the access level
                    var newWriteableState = (newMonitoredItemValue & opcUaRestServices_1.OpcUaAccessLevel.CurrentWrite) == opcUaRestServices_1.OpcUaAccessLevel.CurrentWrite;
                    this.monitoringObject.isWriteable.value = newWriteableState;
                    console.log("MonitoringSubscriptionItem - updated writeable %o %o", this.monitoringObject.browseName + ".isWriteable = ", this.monitoringObject.isWriteable);
                    break;
                default:
                    break;
            }
        };
        return MonitoringSubscriptionItem;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvbWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVQTtRQUF3Qyw2Q0FBa0Y7UUFBMUg7O1FBQTRILENBQUM7UUFBRCxnQ0FBQztJQUFELENBQUMsQUFBN0gsQ0FBd0MsbUJBQVUsR0FBMkU7SUFBQSxDQUFDO0lBQzlIO1FBQW9ELHlEQUFpRTtRQUFySDs7UUFBdUgsQ0FBQztRQUFELDRDQUFDO0lBQUQsQ0FBQyxBQUF4SCxDQUFvRCxtQkFBVSxHQUEwRDtJQUFBLENBQUM7SUFFekg7UUFRSSx1Q0FBWSxRQUFhLEVBQUUsWUFBb0MsRUFBRSxZQUFnQjtZQUM3RSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsdUJBQXVCLEdBQUcsWUFBWSxDQUFDO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxZQUFZLENBQUM7UUFDL0MsQ0FBQztRQUVELHNCQUFXLG1EQUFRO2lCQUFuQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7WUFDekIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx1REFBWTtpQkFBdkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUE7WUFDdkMsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx1REFBWTtpQkFBdkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUE7WUFDdEMsQ0FBQzs7O1dBQUE7UUFDTCxvQ0FBQztJQUFELENBQUMsQUF6QkQsSUF5QkM7SUE2eEJpRCxzRUFBNkI7SUE3eEI5RSxDQUFDO0lBRUY7Ozs7T0FJRztJQUNIO1FBa0JJOzs7O1dBSUc7UUFDSCxpREFBWSxrQkFBaUQ7WUFBN0QsaUJBS0M7WUFkTywyQkFBc0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRGLGlDQUE0QixHQUFHLFVBQUMsTUFBTSxFQUFFLFNBQVMsSUFBTyxLQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLEtBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQVFySCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFDOUMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksZ0NBQWdDLEVBQUUsQ0FBQztZQUV2RSxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1FBQ3JFLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNHLG1FQUFpQixHQUF2Qjs7Ozs7NEJBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRywrQkFBYyxDQUFDLE1BQU0sRUFBRSxDQUFDOzRCQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQzs0QkFFdEUscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBQTtnQ0FBM0Msc0JBQU8sU0FBb0MsRUFBQzs7OztTQUMvQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0csNEVBQTBCLEdBQWhDLFVBQWlDLFFBQWEsRUFBRSxTQUFpQixFQUFFLG1CQUErQzs7Ozs7Ozs0QkFJdEcsWUFBWSxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7aUNBR3JFLENBQUMsWUFBWSxFQUFiLHdCQUFhOzRCQUVFLHFCQUFNLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUE7OzRCQUF2RSxZQUFZLEdBQUcsU0FBd0QsQ0FBQzs0QkFFeEUsMERBQTBEOzRCQUMxRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7aUNBSWhELFlBQVksRUFBWix3QkFBWTs0QkFFWixpRUFBaUU7NEJBQ2pFLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7NEJBRWpGLDhCQUE4Qjs0QkFDOUIscUJBQU0sWUFBWSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLEVBQUE7OzRCQUQ1RCw4QkFBOEI7NEJBQzlCLFNBQTRELENBQUM7NEJBRTdELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkVBQTJFLEVBQUMsUUFBUSxFQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Ozs7OzRCQUd6SixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQUssQ0FBQyxDQUFDOzs7Ozs7U0FFNUI7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLDZFQUEyQixHQUFuQyxVQUFvQyxRQUFhLEVBQUUsU0FBaUI7WUFDaEUseUNBQXlDO1lBQ3pDLElBQUksb0JBQW9CLEdBQUksSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxZQUFZLElBQUssT0FBTyxZQUFZLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBQ3BJLDREQUE0RDtZQUM1RCxJQUFJLG9CQUFvQixDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ2xDLHVDQUF1QztnQkFDeEMsT0FBTyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztpQkFBSTtnQkFDRCxPQUFPLElBQUksQ0FBQzthQUNmO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0csOEVBQTRCLEdBQWxDLFVBQW1DLFFBQWEsRUFBRSxTQUFpQixFQUFFLGFBQXlDLEVBQUUsT0FBZTs7Ozs7OzRCQUN2SCxZQUFZLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztpQ0FDckUsWUFBWSxFQUFaLHdCQUFZO2lDQUVSLENBQUEsYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUEsRUFBMUIsd0JBQTBCOzRCQUMxQiw0R0FBNEc7NEJBQzVHLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7NEJBQ3JELHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUMsWUFBWSxDQUFDLEVBQUE7OzRCQUE3RSxxQkFBcUIsR0FBRyxTQUFxRDs0QkFDakYsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0SEFBNEgsRUFBQyxZQUFZLENBQUMsUUFBUSxFQUFDLHFCQUFxQixDQUFFLENBQUM7Ozs7NEJBSS9LLDhCQUE4Qjs0QkFDOUIscUJBQU0sWUFBWSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxFQUFBOzs0QkFEdkQsOEJBQThCOzRCQUM5QixTQUF1RCxDQUFDOzRCQUV4RCxPQUFPLENBQUMsR0FBRyxDQUFDLCtIQUErSCxFQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsYUFBYSxFQUFDLFlBQVksQ0FBQyxFQUFFLENBQUUsQ0FBQzs7Ozs0QkFFdE0sT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFLLENBQUMsQ0FBQzs7Ozs7O1NBS3BDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDVyxvRUFBa0IsR0FBaEMsVUFBaUMsU0FBaUIsRUFBRSxZQUFvQzs7Ozs7OzRCQUNoRixxQkFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Ozs0QkFHSCxxQkFBTSxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBQTs7NEJBRHZGLHdDQUF3Qzs0QkFDeEMscUJBQXFCLEdBQUcsU0FBK0QsQ0FBQzs0QkFDeEYsaURBQWlEOzRCQUNqRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7OzRCQUVuRCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQUssQ0FBQyxDQUFDOztnQ0FFekIsc0JBQU8scUJBQXFCLEVBQUM7Ozs7U0FDaEM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxrRUFBZ0IsR0FBaEIsVUFBaUIsU0FBa0M7WUFDL0MsUUFBUSxTQUFTLENBQUMsSUFBSSxFQUFFO2dCQUNwQixLQUFLLCtCQUFjLENBQUMsT0FBTztvQkFDdkIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0MsTUFBTTtnQkFDVjtvQkFDSSxNQUFNO2FBQ2I7UUFFTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0sseUVBQXVCLEdBQS9CLFVBQWdDLG9CQUF1QztZQUVuRSxJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFdkcsSUFBSSxvQkFBb0IsRUFBRTtnQkFDdEIsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUNqRTtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILHVEQUFLLEdBQUw7WUFDSSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQztRQUNMLDhDQUFDO0lBQUQsQ0FBQyxBQTdNRCxJQTZNQztJQXlrQlEsMEZBQXVDO0lBdmtCaEQ7Ozs7T0FJRztJQUNIO1FBS0k7OztXQUdHO1FBQ0g7WUFDSSwwRUFBMEU7WUFDMUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDhDQUFHLEdBQUgsVUFBSSxZQUFvQztZQUNwQywrQkFBK0I7WUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBQyxZQUFZLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxpREFBTSxHQUFOLFVBQU8sWUFBb0M7WUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILG1EQUFRLEdBQVIsVUFBUyxjQUFzQjtZQUMzQixzQ0FBc0M7WUFDdEMsT0FBUSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBU0Qsc0JBQVcsbURBQUs7WUFQaEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDcEQsQ0FBQzs7O1dBQUE7UUFDTCx1Q0FBQztJQUFELENBQUMsQUF4REQsSUF3REM7SUFFRDs7OztPQUlHO0lBQ0g7UUFlSTs7Ozs7O1dBTUc7UUFDSCxnQ0FBb0IsUUFBYSxFQUFFLFNBQVMsRUFBRSxjQUFzQjtZQXBCcEUsNEJBQTRCO1lBQ3BCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFHN0IsOENBQThDO1lBQ3RDLHFCQUFnQixHQUEwQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQzVFLG9DQUFvQztZQUM1QixrQkFBYSxHQUFHLENBQUMsQ0FBQztZQWN0QixJQUFJLENBQUMscUJBQXFCLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRWxDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLHFDQUFxQyxFQUFFLENBQUM7UUFDakYsQ0FBQztRQVFELHNCQUFJLHNDQUFFO1lBTk47Ozs7O2VBS0c7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ2hDLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcsNENBQVE7WUFQbkI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBRUQ7Ozs7OztXQU1HO1FBQ0gscURBQW9CLEdBQXBCLFVBQXFCLFFBQVE7WUFDekIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNVLDZCQUFNLEdBQW5CLFVBQW9CLFFBQWEsRUFBRSxTQUFpQjs7Ozs7Z0NBQzNCLHFCQUFNLHFDQUFpQixDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxFQUFBOzs0QkFBdEUsY0FBYyxHQUFHLFNBQXFEOzRCQUMxRSxzQkFBTyxJQUFJLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLEVBQUM7Ozs7U0FDMUU7UUFFRDs7Ozs7Ozs7V0FRRztRQUNVLDZCQUFNLEdBQW5CLFVBQW9CLFNBQWlCLEVBQUUsY0FBc0I7Ozs7Z0NBQ2xELHFCQUFNLHFDQUFpQixDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsRUFBQTtnQ0FBNUUsc0JBQU8sU0FBcUUsRUFBQzs7OztTQUNoRjtRQUVEOzs7Ozs7V0FNRztRQUNHLHFEQUFvQixHQUExQixVQUEyQixtQkFBK0M7Ozs7Ozs7OzRCQUk5RCxzQkFBcUIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOzRCQUtuRyxpQ0FBaUMsR0FBRyxxQ0FBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDckUsaUNBQWlDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs0QkFHckQsaURBQWlEOzRCQUNqRCxxQkFBTSxJQUFJLENBQUMsc0NBQXNDLENBQUMsaUNBQWlDLEVBQUMsbUJBQWlCLENBQUMsRUFBQTs7NEJBRHRHLGlEQUFpRDs0QkFDakQsU0FBc0csQ0FBQzs0QkFHekIscUJBQU0saUNBQWlDLENBQUMsbUJBQW1CLEVBQUUsRUFBQTs7NEJBQXZJLDBCQUEwQixHQUFnRCxTQUE2RDs0QkFFM0ksMkVBQTJFOzRCQUMzRSwwQkFBMEIsQ0FBQyxPQUFPLENBQUMsVUFBQyxhQUFhLEVBQUUsU0FBUztnQ0FDeEQsSUFBTSxhQUFhLEdBQUcsbUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQ25ELGtDQUFrQztnQ0FDbEMsSUFBRyxhQUFhLElBQUksU0FBUyxFQUFDO29DQUMxQixhQUFhLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUM7aUNBQ3BEO3FDQUNHO29DQUNBLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztvQ0FDNUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsQ0FBQztvQ0FDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBaUIsQ0FBQyxDQUFDO2lDQUNwQzs0QkFDSixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7Ozs7NEJBTVQsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFLLENBQUMsQ0FBQzs7OzRCQUd6QixPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxFQUFFLG1CQUFtQixDQUFDLENBQUE7Ozs7O1NBQ3RGO1FBRUQ7Ozs7OztXQU1HO1FBQ00saUVBQWdDLEdBQXpDLFVBQTBDLGNBQTBDO1lBQXBGLGlCQWdCQztZQWRHLElBQU0saUJBQWlCLEdBQTBDLElBQUksR0FBRyxFQUFFLENBQUM7WUFFM0UsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLGFBQWE7Z0JBRWpDLDJDQUEyQztnQkFDM0MsS0FBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBQyxpQkFBaUIsRUFBRSxrQ0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUdqRixzREFBc0Q7Z0JBQ3RELEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUMsaUJBQWlCLEVBQUUsa0NBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRWpHLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLHFEQUFvQixHQUE1QixVQUE2QixhQUF1QyxFQUFDLGlCQUF3RCxFQUFDLGNBQThCO1lBRXBKLDZCQUE2QjtZQUM3QixJQUFJLFlBQVksR0FBVyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUN0RCx3Q0FBd0M7WUFDeEMsSUFBSSxjQUFjLEdBQUcsMEJBQTBCLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDcEcsOENBQThDO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ3hELG1DQUFtQztZQUNuQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ1csdUVBQXNDLEdBQXBELFVBQXFELGlDQUEwRCxFQUFDLGVBQWlEOzs7Ozs7NEJBRXBKLENBQUMsR0FBRyxDQUFDOzs7aUNBQUUsQ0FBQSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQTs0QkFDaEMsY0FBYyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUMscUJBQU0saUNBQWlDLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxxQ0FBaUIsQ0FBQywwQkFBMEIsRUFBRSxjQUFjLENBQUMsa0JBQW9DLENBQUMsRUFBQTs7NEJBQWpRLFNBQWlRLENBQUM7Ozs0QkFGMU4sQ0FBQyxFQUFFLENBQUE7Ozs7OztTQUlsRDtRQUVEOzs7Ozs7V0FNRztRQUNLLG9EQUFtQixHQUEzQjtZQUNJLDJKQUEySjtZQUMzSixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNHLHNEQUFxQixHQUEzQixVQUE0QixhQUF5Qzs7Ozs7OztpQ0FHeEQsQ0FBQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQSxFQUE5Qix3QkFBOEI7NEJBR3pCLGlDQUFpQyxHQUFHLHFDQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDOzRCQUNyRSxpQ0FBaUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOzRCQUdvQixxQkFBTSxJQUFJLENBQUMseUJBQXlCLENBQUMsYUFBYSxFQUFFLGlDQUFpQyxDQUFDLEVBQUE7OzRCQUEzSiwrQkFBK0IsR0FBc0MsU0FBc0Y7Ozs7NEJBS3JJLHFCQUFNLGlDQUFpQyxDQUFDLG1CQUFtQixFQUFFLEVBQUE7OzRCQUE3RSxhQUFhLEdBQUcsU0FBNkQ7NEJBRW5GLGlLQUFpSzs0QkFDakssK0JBQStCOzRCQUUvQixrREFBa0Q7NEJBQ2xELElBQUksQ0FBQywyQkFBMkIsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDOzs7OzRCQUdsRSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQUssQ0FBQyxDQUFDOzs7Ozs0QkFJN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFLLENBQUMsQ0FBQzs7Ozs7O1NBRTFCO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssNERBQTJCLEdBQW5DLFVBQW9DLCtCQUE2RDtZQUFqRyxpQkFXQztZQVRHLHVFQUF1RTtZQUN2RSxJQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDdEUsK0JBQStCLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtnQkFDakQsSUFBTSxzQkFBc0IsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO29CQUMxRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxZQUFZLEVBQUU7d0JBQzFCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3pDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDVywwREFBeUIsR0FBdkMsVUFBd0MsYUFBeUMsRUFBRSxpQ0FBMkQ7Ozs7Ozs0QkFDdEksK0JBQStCLEdBQXNDLEVBQUUsQ0FBQzs0QkFDbkUsQ0FBQyxHQUFHLENBQUM7OztpQ0FBRSxDQUFBLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFBOzRCQUc5Qix1QkFBdUIsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUNBR2pGLENBQUEsdUJBQXVCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQSxFQUFsQyx3QkFBa0M7NEJBRXpCLE1BQUksQ0FBQzs7O2lDQUFFLENBQUEsR0FBQyxHQUFHLHVCQUF1QixDQUFDLE1BQU0sQ0FBQTs0QkFDMUIscUJBQU0sSUFBSSxDQUFDLCtCQUErQixDQUFDLGlDQUFpQyxFQUFFLHVCQUF1QixDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUE7OzRCQUF2SCxXQUFXLEdBQUcsU0FBeUc7NEJBQzdILElBQUksV0FBVyxFQUFFO2dDQUNiLCtCQUErQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs2QkFDckQ7Ozs0QkFKK0MsR0FBQyxFQUFFLENBQUE7Ozs0QkFSckIsQ0FBQyxFQUFFLENBQUE7O2dDQWdCN0Msc0JBQU8sK0JBQStCLEVBQUM7Ozs7U0FDMUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLDhEQUE2QixHQUFyQyxVQUFzQyxZQUFzQztZQUV4RSxrRkFBa0Y7WUFDbEYsSUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFnQyxJQUFPLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxZQUFZLENBQUMsRUFBRSxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7WUFFeEssT0FBTyxlQUFlLENBQUM7UUFDM0IsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ1csZ0VBQStCLEdBQTdDLFVBQThDLGlDQUEwRCxFQUFDLGdCQUE0Qzs7Ozs7OzRCQUUzSSxpQkFBaUIsR0FBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDOzRCQUdqRSxzQkFBc0IsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dDQUN2RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7dUNBQ3RFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixLQUFLLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7NEJBQ2hGLENBQUMsQ0FBQyxDQUFDO2lDQUVDLHNCQUFzQixFQUF0Qix3QkFBc0I7NEJBR2hCLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFL0MsOENBQThDOzRCQUM5QyxxQkFBTSxpQ0FBaUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFBOzs0QkFEbkgsOENBQThDOzRCQUM5QyxTQUFtSCxDQUFDOzRCQUVwSCxzQkFBTyxnQkFBZ0IsRUFBQztnQ0FJNUIsc0JBQU8sSUFBSSxFQUFDOzs7O1NBRWY7UUFFRDs7Ozs7O1dBTUc7UUFDSCxtREFBa0IsR0FBbEIsVUFBbUIsb0JBQXVDO1lBQTFELGlCQWVDO1lBZEcsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBQ2pELG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFBLGdCQUFnQjtnQkFDM0QseUJBQXlCO2dCQUN6QixJQUFJLFdBQVcsR0FBRyxLQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzNFLElBQUksV0FBVyxFQUFFO29CQUNiLHlCQUF5QjtvQkFDekIsV0FBVyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEQsMENBQTBDO29CQUMxQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBVSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2lCQUN4RztxQkFBTTtvQkFDSCxNQUFNLElBQUksS0FBSyxDQUFDLGlHQUFpRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2lCQUN6SjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsc0RBQXFCLEdBQXJCLFVBQXNCLG1CQUEyQyxFQUFFLGtCQUFnQztZQUMvRixJQUFJLGdCQUFnQixHQUFHLElBQUksNkJBQTZCLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFFLGtCQUF3QixDQUFDLENBQUM7WUFDdEksSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMseUJBQXlCLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSywwREFBeUIsR0FBakMsVUFBa0MsUUFBbUIsRUFBRSxrQkFBZ0M7WUFDbkYsSUFBRyxRQUFRLENBQUMsb0JBQW9CLEVBQUM7Z0JBQzdCLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ3JEO1FBQ0wsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQW5aRCxJQW1aQztJQUVEOzs7O09BSUc7SUFDSDtRQVdJOzs7OztXQUtHO1FBQ0gsb0NBQVksZ0JBQXFCLEVBQUUsa0JBQTBCLEVBQUMsUUFBZTtZQWY3RSwwQkFBMEI7WUFDbEIseUJBQW9CLEdBQVEsU0FBUyxDQUFDO1lBQzlDLCtDQUErQztZQUN2Qyx3QkFBbUIsR0FBUSxFQUFFLENBQUM7WUFDdEMsNEJBQTRCO1lBQ3BCLFFBQUcsR0FBVyxFQUFFLENBQUM7WUFDekIsbUJBQW1CO1lBQ1gsY0FBUyxHQUFXLENBQUMsQ0FBQyxDQUFDO1lBUzNCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUM3QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDOUIsQ0FBQztRQVNELHNCQUFXLHdEQUFnQjtZQVAzQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7WUFDckMsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVywwREFBa0I7WUFQN0I7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1lBQ3BDLENBQUM7OztXQUFBO1FBVUQsc0JBQVcsZ0RBQVE7WUFQbkI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixDQUFDOzs7V0FBQTtRQUdELHNCQUFXLDBDQUFFO2lCQUFiO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNwQixDQUFDO2lCQUVELFVBQWMsRUFBUztnQkFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDbEIsQ0FBQzs7O1dBSkE7UUFNRDs7Ozs7Ozs7O1dBU0c7UUFDSSxpQ0FBTSxHQUFiLFVBQWMsZ0JBQTBDLEVBQUUsa0JBQTBCLEVBQUUsUUFBZTtZQUNqRyxPQUFPLElBQUksMEJBQTBCLENBQUMsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFDekYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILGdEQUFXLEdBQVgsVUFBWSxxQkFBMEI7WUFDbEMsUUFBUSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7Z0JBQzdCLEtBQUssT0FBTztvQkFDUixtQkFBbUI7b0JBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUM7b0JBQ3BELE1BQU07Z0JBQ1YsS0FBSyxpQkFBaUI7b0JBQ2xCLHdEQUF3RDtvQkFDeEQsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLHFCQUFxQixHQUFHLG9DQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLG9DQUFnQixDQUFDLFlBQVksQ0FBQztvQkFDakgsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7b0JBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0RBQXNELEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzdKLE1BQU07Z0JBQ1Y7b0JBQ0ksTUFBTTthQUNiO1FBQ0wsQ0FBQztRQUNMLGlDQUFDO0lBQUQsQ0FBQyxBQXZHRCxJQXVHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyIH0gZnJvbSBcIi4vbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgT3BjVWFXZWJTb2NrZXQsIE9wY1VhV2ViU29ja2V0RXZlbnRBcmdzLCBTb2NrZUV2ZW50VHlwZSwgSU9wY1VhRGF0YUNoYW5nZWQgfSBmcm9tICcuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFXZWJTb2NrZXQnO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfSBmcm9tIFwiLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE9wY1VhUmVzdFNlcnZpY2VzLCBPcGNVYUF0dHJpYnV0ZSwgT3BjVWFBY2Nlc3NMZXZlbCB9IGZyb20gXCIuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0U2VydmljZXNcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IElPYnNlcnZlciwgT2JzZXJ2YWJsZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlclwiO1xyXG5pbXBvcnQgeyBJT3BjVWFDcmVhdGVkTW9uaXRvcmVkSXRlbVJlc3VsdCB9IGZyb20gXCIuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0UmVzdWx0VHlwZXNcIjtcclxuaW1wb3J0IHsgT3BjVWFSZXN0U2VydmljZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW11bmljYXRpb24vcmVzdC9vcGNVYVJlc3RTZXJ2aWNlUHJvdmlkZXJcIjtcclxuXHJcblxyXG5jbGFzcyBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXIsIEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRPYnNlcnZlZFN1YnNjcmlwdGlvbkl0ZW1zQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TW9uaXRvcmluZ1N1YnNjcmlwdGlvbiwgRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZEFyZ3M+eyB9O1xyXG5cclxuY2xhc3MgRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZEFyZ3Mge1xyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfb2JzZXJ2ZXI6IGFueTtcclxuICAgIHByaXZhdGUgX21vbml0b3JpbmdTdWJzY3JpcHRpb246IE1vbml0b3JpbmdTdWJzY3JpcHRpb247XHJcbiAgICBwcml2YXRlIF9jaGFuZ2VkTW9uaXRvcmVkSXRlbXM7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob2JzZXJ2ZXI6IGFueSwgc3Vic2NyaXB0aW9uOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uLCBjaGFuZ2VkSXRlbXM6IFtdKSB7XHJcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIgPSBvYnNlcnZlcjtcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nU3Vic2NyaXB0aW9uID0gc3Vic2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuX2NoYW5nZWRNb25pdG9yZWRJdGVtcyA9IGNoYW5nZWRJdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG9ic2VydmVyKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29ic2VydmVyXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdWJzY3JpcHRpb24oKTogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNoYW5nZWRJdGVtcygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFuZ2VkTW9uaXRvcmVkSXRlbXNcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIG9ic2VydmF0aW9uIGFuZCBtb25pdG9yaW5nIG9mIGRpYWdub3N0aWMgZWxlbWVudHNcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlclxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyIHtcclxuXHJcbiAgICAvLyBob2xkcyBhIHJlZmVyZW5jZSB0byB0aGUgZGlhZ25vc3RpYyBwcm92aWRlclxyXG4gICAgcHJpdmF0ZSBfZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjtcclxuXHJcbiAgICAvLyBob2xkcyBzdWJzY3JpcHRpb25zXHJcbiAgICBwcml2YXRlIF9tb25pdG9yaW5nU3Vic2NyaXB0aW9uczogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkNvbGxlY3Rpb247XHJcblxyXG4gICAgLy8gaG9sZHMgYSB3ZWIgc29ja2V0IGluc3RhbmNlXHJcbiAgICBwcml2YXRlIF9vcGNVYVdlYlNvY2tldCE6IE9wY1VhV2ViU29ja2V0O1xyXG5cclxuICAgIC8vIGRlY2xhcmVzIHRoZSBvYnNlcnZlYWJsZSBjaGFuZ2VkIGV2ZW50XHJcbiAgICBwdWJsaWMgZXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZDogRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZDtcclxuXHJcbiAgICBwcml2YXRlIF9vcGNVYVdlYlNvY2tldEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5oYW5kbGVPcGNVYUV2ZW50KGV2ZW50QXJncyk7IH07XHJcblxyXG4gICAgcHJpdmF0ZSBfb2JzZXJ2ZWRJdGVtc0NoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB7IHRoaXMuZXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZC5yYWlzZSh0aGlzLCBldmVudEFyZ3MpOyB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlci5cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJ9IGRpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyID0gZGlhZ25vc3RpY1Byb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMuX21vbml0b3JpbmdTdWJzY3JpcHRpb25zID0gbmV3IE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZCA9IG5ldyBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGEgY29ubmVjdGlvbiBmb3IgbGlzdGVuaW5nIHRvIGV2ZW50cyBmcm9tIG9wYy11YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNyZWF0ZU9wY1VhU29ja2V0KCkge1xyXG4gICAgICAgIHRoaXMuX29wY1VhV2ViU29ja2V0ID0gT3BjVWFXZWJTb2NrZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fb3BjVWFXZWJTb2NrZXQuZXZlbnRPcGNVYVdlYlNvY2tldC5hdHRhY2godGhpcy5fb3BjVWFXZWJTb2NrZXRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX29wY1VhV2ViU29ja2V0LmNvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFjdGl2YXRlcyBvYnNlcnZpbmcgcGFyYW1ldGVyIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1bXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIG9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksIHNlc3Npb25JZDogbnVtYmVyLCBjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1bXSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHN1YnNjcmlwdGlvbiBmb3IgdGhlIG9ic2VydmVyIG9yIGNyZWF0ZSBhIG5ldyBvbmVcclxuICAgICAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHRoaXMuZmluZFN1YnNjcmlwdGlvbkZvck9ic2VydmVyKG9ic2VydmVyLCBzZXNzaW9uSWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHN1YnNjcmlwdGlvbiBpZiBub3QgeWV0IGF2YWlsYWJsZS5cclxuICAgICAgICAgICAgaWYgKCFzdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gYXdhaXQgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbi5jcmVhdGUob2JzZXJ2ZXIsIHNlc3Npb25JZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBuZXcgc3Vic2NyaXB0aW9uIHRvIHRoZSBzdWJzY3JpcHRpb24gY29sbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9uaXRvcmluZ1N1YnNjcmlwdGlvbnMuYWRkKHN1YnNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoIGl0ZW1zIGNoYW5nZWQgZXZlbnQgYW5kIGZvcndhcmQgaXQgdGhyb3VnaCB0aGUgcHJvdmlkZXJcclxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5ldmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vYnNlcnZlZEl0ZW1zQ2hhbmdlZEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgaXRlbXMgdG8gbW9uaXRvclxyXG4gICAgICAgICAgICAgICAgYXdhaXQgc3Vic2NyaXB0aW9uLmNyZWF0ZU1vbml0b3JlZEl0ZW1zKGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyOmNyZWF0ZWQgc3Vic2NyaXB0aW9uOiAlbyAlbyAlbyAlb1wiLG9ic2VydmVyLGNvbXBvbmVudFBhcmFtZXRlcnMsIHN1YnNjcmlwdGlvbi5pZCwgc3Vic2NyaXB0aW9uKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBzdWJzY3JpcHRpb24gZm9yIHRoZSBvYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kU3Vic2NyaXB0aW9uRm9yT2JzZXJ2ZXIob2JzZXJ2ZXI6IGFueSwgc2Vzc2lvbklkOiBudW1iZXIpOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9ufG51bGwge1xyXG4gICAgICAgIC8vIGZpbmQgYSBzdWJzY3JpcHRpb24gZm9yIHRoaXMgb2JzZXJ2ZXIuXHJcbiAgICAgICAgbGV0IGV4aXN0aW5nU3Vic2NyaXB0aW9uID0gIHRoaXMuX21vbml0b3JpbmdTdWJzY3JpcHRpb25zLml0ZW1zLmZpbHRlcigoc3Vic2NyaXB0aW9uKT0+eyByZXR1cm4gc3Vic2NyaXB0aW9uLm9ic2VydmVyID09IG9ic2VydmVyfSk7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgYSBzdWJzY3JpcHRpb24gZm9yIHRoaXMgb2JzZXJ2ZXIgYWxyZWFkeSBleGlzdHMuXHJcbiAgICAgICAgaWYgKGV4aXN0aW5nU3Vic2NyaXB0aW9uLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiB0aGUgZXhpc3Rpbmcgc3Vic2NyaXB0aW9uIC4uLlxyXG4gICAgICAgICAgIHJldHVybiBleGlzdGluZ1N1YnNjcmlwdGlvblswXTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5vYnNlcnZlcyB0aGUgcGFzc2VkIGl0ZW1zLiBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdfSBvYnNlcnZlZEl0ZW1zXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN1c3BlbmRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBzZXNzaW9uSWQ6IG51bWJlciwgb2JzZXJ2ZWRJdGVtczogTWFwcENvY2twaXRDb21wb25lbnRJdGVtW10sIHN1c3BlbmQ6Ym9vbGVhbikge1xyXG4gICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmZpbmRTdWJzY3JpcHRpb25Gb3JPYnNlcnZlcihvYnNlcnZlciwgc2Vzc2lvbklkKTtcclxuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKXtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYnNlcnZlZEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gb2JzZXJ2YWJsZXMgYXJlIHNwZWNpZmllZCwgd2UgZGVsZXRlIHRoZSB3aG9sZSBzdWJzY3JpcHRpb24gdG8gcmVtb3ZlIGFsbCBjb250YWluZWQgbW9uaXRvcmVkIGl0ZW1zXHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uZXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZC5kZXRhY2godGhpcy5fb2JzZXJ2ZWRJdGVtc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIGxldCBkZWxldGVkU3Vic2NyaXB0aW9uSWQgPSBhd2FpdCB0aGlzLmRlbGV0ZVN1YnNjcmlwdGlvbihzZXNzaW9uSWQsc3Vic2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLnVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXM6ZGVsZXRlZCBzdWJzY3JpcHRpb24gLSBvYnNlcnZlcjolbyA6c3Vic2NyaXB0aW9uSWQ6JW9cIixzdWJzY3JpcHRpb24ub2JzZXJ2ZXIsZGVsZXRlZFN1YnNjcmlwdGlvbklkICk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIGRlbGV0ZSB0aGUgc3BlY2lmaWVkIGl0ZW1zXHJcbiAgICAgICAgICAgICAgICB0cnkgeyAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgaXRlbXMgdG8gbW9uaXRvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBzdWJzY3JpcHRpb24uZGVsZXRlTW9udGl0b3JlZEl0ZW1zKG9ic2VydmVkSXRlbXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zOnJlbW92ZWQgaXRlbXMgLSBvYnNlcnZlcjolbyA6aXRlbXMgJW8sIHN1YnNjcmlwdGlvbklkOiVvXCIsc3Vic2NyaXB0aW9uLm9ic2VydmVyLG9ic2VydmVkSXRlbXMsc3Vic2NyaXB0aW9uLmlkICk7ICAgIFxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGEgc3Vic2NyaXB0aW9uIHdpdGggaXRzIG1vbml0b3JlZCBpdGVtcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtNb25pdG9yaW5nU3Vic2NyaXB0aW9ufSBzdWJzY3JpcHRpb25cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgZGVsZXRlU3Vic2NyaXB0aW9uKHNlc3Npb25JZDogbnVtYmVyLCBzdWJzY3JpcHRpb246IE1vbml0b3JpbmdTdWJzY3JpcHRpb24pOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIGxldCBkZWxldGVkU3Vic2NyaXB0aW9uSWQgPSAtMTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBkZWxldGUgdGhlIHN1YnNjcmlwdGlvbiBvbiB0aGUgdGFyZ2V0XHJcbiAgICAgICAgICAgIGRlbGV0ZWRTdWJzY3JpcHRpb25JZCA9IGF3YWl0IE1vbml0b3JpbmdTdWJzY3JpcHRpb24uZGVsZXRlKHNlc3Npb25JZCwgc3Vic2NyaXB0aW9uLmlkKTtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBzdWJzY3JpcHRpb24gaW5zdGFuY2UgZnJvbSB0aGUgbGlzdFxyXG4gICAgICAgICAgICB0aGlzLl9tb25pdG9yaW5nU3Vic2NyaXB0aW9ucy5yZW1vdmUoc3Vic2NyaXB0aW9uKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlbGV0ZWRTdWJzY3JpcHRpb25JZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgb3BjLXVhIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T3BjVWFXZWJTb2NrZXRFdmVudEFyZ3N9IGV2ZW50QXJnc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU9wY1VhRXZlbnQoZXZlbnRBcmdzOiBPcGNVYVdlYlNvY2tldEV2ZW50QXJncyk6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnRBcmdzLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTb2NrZUV2ZW50VHlwZS5NRVNTQUdFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzT3BjVWFEYXRhQ2hhbmdlZChldmVudEFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWNlaXZlcyB0aGUgZGF0YSBjaGFuZ2VkIGFuZCBkaXN0cmlidXRlcyBpdCB0byBjb25zdW1lcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJT3BjVWFEYXRhQ2hhbmdlZH0gb3BjVWFEYXRhQ2hhbmdlZEluZm9cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwcm9jZXNzT3BjVWFEYXRhQ2hhbmdlZChvcGNVYURhdGFDaGFuZ2VkSW5mbzogSU9wY1VhRGF0YUNoYW5nZWQpIHtcclxuXHJcbiAgICAgICAgbGV0IG1vZGlmaWVkU3Vic2NyaXB0aW9uID0gdGhpcy5fbW9uaXRvcmluZ1N1YnNjcmlwdGlvbnMuZmluZEJ5SWQob3BjVWFEYXRhQ2hhbmdlZEluZm8uc3Vic2NyaXB0aW9uSWQpO1xyXG5cclxuICAgICAgICBpZiAobW9kaWZpZWRTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgbW9kaWZpZWRTdWJzY3JpcHRpb24ucHJvY2Vzc0l0ZW1DaGFuZ2VzKG9wY1VhRGF0YUNoYW5nZWRJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjbG9zZXMgdGhlIG1vbml0b3JpbmcgcHJvdmlkZXIgYW5kIGFsbCBpdHMgY29ubmVjdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgY2xvc2UoKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fb3BjVWFXZWJTb2NrZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3BjVWFXZWJTb2NrZXQuZXZlbnRPcGNVYVdlYlNvY2tldC5kZXRhY2godGhpcy5fb3BjVWFXZWJTb2NrZXRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fb3BjVWFXZWJTb2NrZXQuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0aGUgY2xhc3MgaG9sZHMgYW5kIG1hbmFnZXMgc3Vic2NyaXB0aW9ucy5cclxuICpcclxuICogQGNsYXNzIE1vbml0b3JpbmdTdWJzY3JpcHRpb25TZXRcclxuICovXHJcbmNsYXNzIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uIHtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgc3Vic2NyaXB0aW9uc1xyXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczpNYXA8bnVtYmVyLE1vbml0b3JpbmdTdWJzY3JpcHRpb24+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uLlxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vIHRoZSBzdWJzY3JpcHRpb24gaW5zdGFuY2VzIGFyZSBzdG9yZWQgd2l0aCBpZCBhcyBrZXkgb24gYSBzaW1wbGUgb2JqZWN0XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZHMgYSBuZXcgc3ViY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vbml0b3JpbmdTdWJzY3JpcHRpb259IHN1YnNjcmlwdGlvblxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIGFkZChzdWJzY3JpcHRpb246IE1vbml0b3JpbmdTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAvLyBzdG9yZSB0aGUgc3Vic2NyaXB0aW9uIGJ5IGlkXHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5zZXQoc3Vic2NyaXB0aW9uLmlkLHN1YnNjcmlwdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmVzIHRoZSBnaXZlbiBzdWJzY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vbml0b3JpbmdTdWJzY3JpcHRpb259IHN1YnNjcmlwdGlvblxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZShzdWJzY3JpcHRpb246IE1vbml0b3JpbmdTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmRlbGV0ZShzdWJzY3JpcHRpb24uaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyB0aGUgc3Vic2NyaXB0aW9uIHdpdGggdGhlIHJlcXVlc3RlZCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdWJzY3JpcHRpb25JZFxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIGZpbmRCeUlkKHN1YnNjcmlwdGlvbklkOiBudW1iZXIpOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9ufHVuZGVmaW5lZCB7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIGF2YWlsYWJsZSBzdWJzY3JpcHRpb25cclxuICAgICAgICByZXR1cm4gIHRoaXMuX3N1YnNjcmlwdGlvbnMuZ2V0KHN1YnNjcmlwdGlvbklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGF2YWlsYWJsZSBzdWJzY3JpcHRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TW9uaXRvcmluZ1N1YnNjcmlwdGlvbj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkNvbGxlY3Rpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpdGVtcygpOiBBcnJheTxNb25pdG9yaW5nU3Vic2NyaXB0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5fc3Vic2NyaXB0aW9ucy52YWx1ZXMoKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIG1hbmFnaW5nIGEgc2V0IG9mIG1vbml0b3JpbmcgaXRlbXMgaW4gYSBzdWJzY3JpcHRpb25cclxuICpcclxuICogQGNsYXNzIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICovXHJcbmNsYXNzIE1vbml0b3JpbmdTdWJzY3JpcHRpb24ge1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBzdWJzY3JpcHRpb24gaWRcclxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbklkID0gLTE7XHJcbiAgICAvLyBob2xkcyB0aGUgc2Vzc2lvbiBpZFxyXG4gICAgcHJpdmF0ZSBfc2Vzc2lvbklkOiBhbnk7XHJcbiAgICAvLyBob2xkcyBhIGNvbGxlY3Rpb24gb2YgaXRlbXMgdG8gYmUgbW9uaXRvcmVkXHJcbiAgICBwcml2YXRlIF9tb25pdG9yaW5nSXRlbXM6TWFwPG51bWJlcixNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbT4gPSBuZXcgTWFwKCk7XHJcbiAgICAvLyBob2xkcyB0aGUgbmV4dCBwb3NzaWJsZSBjbGllbnQgaWRcclxuICAgIHByaXZhdGUgX25leHRDbGllbnRJZCA9IDA7XHJcbiAgICAvLyBob2xkcyBhIHJlZmVyZW5jZSB0byB0aGUgb2JzZXJ2ZXIgaW50ZXJyZXN0ZWQgaW4gc3Vic2NyaXB0aW9uIGFuZCBpdGVtIGNoYW5nZXNcclxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbk9ic2VydmVyOiBhbnk7XHJcbiAgICAvLyBkZWNsYXJlcyB0aGUgb2JzZXJ2ZWFibGUgY2hhbmdlZCBldmVudFxyXG4gICAgcHVibGljIGV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQ6IEV2ZW50T2JzZXJ2ZWRTdWJzY3JpcHRpb25JdGVtc0NoYW5nZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb24uXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN1YnNjcmlwdGlvbklkXHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKG9ic2VydmVyOiBhbnksIHNlc3Npb25JZCwgc3Vic2NyaXB0aW9uSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbk9ic2VydmVyID0gb2JzZXJ2ZXI7XHJcbiAgICAgICAgdGhpcy5fc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbklkID0gc3Vic2NyaXB0aW9uSWQ7XHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ0l0ZW1zID0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQgPSBuZXcgRXZlbnRPYnNlcnZlZFN1YnNjcmlwdGlvbkl0ZW1zQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyB0aGUgc3Vic2NyaXB0aW9uIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBnZXQgaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnNjcmlwdGlvbklkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyB0aGUgb2JzZXJ2ZXIgaW50ZXJyZXN0ZWQgaW4gY2hhbmdlIG5vdGlmaWNhdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBvYnNlcnZlcigpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpcHRpb25PYnNlcnZlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdGhlIG1vbml0b3JlZCBpdGVtIHdpdGggdGhlIHNwZWNlZmllZCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gY2xpZW50SWRcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIGdldE1vbml0b3JlZEl0ZW1CeUlkKGNsaWVudElkKTogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW18dW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9uaXRvcmluZ0l0ZW1zLmdldChjbGllbnRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGEgbmV3IG1vbml0b3Jpbmcgc3Vic2NyaXB0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1vbml0b3JpbmdTdWJzY3JpcHRpb24+fVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNyZWF0ZShvYnNlcnZlcjogYW55LCBzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8TW9uaXRvcmluZ1N1YnNjcmlwdGlvbj4ge1xyXG4gICAgICAgIGxldCBzdWJzY3JpcHRpb25JZCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmNyZWF0ZVN1YnNjcmlwdGlvbihzZXNzaW9uSWQpO1xyXG4gICAgICAgIHJldHVybiBuZXcgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbihvYnNlcnZlciwgc2Vzc2lvbklkLCBzdWJzY3JpcHRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIHRoZSBzcGVjaWZpZWQgc3Vic2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN1YnNjcmlwdGlvbklkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGRlbGV0ZShzZXNzaW9uSWQ6IG51bWJlciwgc3Vic2NyaXB0aW9uSWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmRlbGV0ZVN1YnNjcmlwdGlvbihzZXNzaW9uSWQsIHN1YnNjcmlwdGlvbklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYSBzZXQgb2YgaXRlbXMgdG8gYmUgbW9uaXRvcmVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlTW9uaXRvcmVkSXRlbXMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRJdGVtW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBpdGVtcyB0byBiZSBvYnNlcnZlZFxyXG4gICAgICAgICAgICBsZXQgbmV3TW9uaXRvcmVkSXRlbXMgPSAgQXJyYXkuZnJvbSh0aGlzLmNyZWF0ZU1vbml0b3JlZFN1YnNjcmlwdGlvbkl0ZW1zKGNvbXBvbmVudFBhcmFtZXRlcnMpLnZhbHVlcygpKTtcclxuXHJcbiAgICAgICAgICAgIC8vLy8gYWN0aXZhdGUgYmF0Y2hpbmdcclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgc3BlY2lmaWMgc2VydmljZSBpbnN0YW5jZSBmb3IgYmF0Y2hpbmdcclxuICAgICAgICAgICAgLy8gT3BjVWFSZXN0U2VydmljZXMuYWN0aXZhdGVCYXRjaGluZygpO1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVNb25pdG9yZWRJdGVtc0JhdGNoU2VydmljZXMgPSBPcGNVYVJlc3RTZXJ2aWNlcy5jcmVhdGUoKTtcclxuICAgICAgICAgICAgY3JlYXRlTW9uaXRvcmVkSXRlbXNCYXRjaFNlcnZpY2VzLmFjdGl2YXRlQmF0Y2hpbmcoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBpbnZva2UgdGhlIGNyZWF0aW9uIG9mIHRoZSBuZXcgbW9uaXRvcmVkIGl0ZW1zXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW52b2tlQ3JlYXRlTW9uaXRvcmVkU3Vic2NyaXB0aW9uSXRlbXMoY3JlYXRlTW9uaXRvcmVkSXRlbXNCYXRjaFNlcnZpY2VzLG5ld01vbml0b3JlZEl0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgYmF0Y2ggcmVxdWVzdFxyXG4gICAgICAgICAgICBsZXQgY3JlYXRlTW9uaXRvcmVkSXRlbXNSZXN1bHQ6TWFwPHN0cmluZyxJT3BjVWFDcmVhdGVkTW9uaXRvcmVkSXRlbVJlc3VsdD4gPSBhd2FpdCBjcmVhdGVNb25pdG9yZWRJdGVtc0JhdGNoU2VydmljZXMuZXhlY3V0ZUJhdGNoUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gcHJvY2VzcyB0aGUgYmF0Y2ggcmVxdWVzdCByZXN1bHQgYnkgY29ubmVjdGluZyB0aGUgbW9uaXRvcmVkIGl0ZW0gaWRzIC4uXHJcbiAgICAgICAgICAgIGNyZWF0ZU1vbml0b3JlZEl0ZW1zUmVzdWx0LmZvckVhY2goKHJlc3BvbnNlVmFsdWUsIHJlcXVlc3RJZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdGVkSXRlbSA9IG5ld01vbml0b3JlZEl0ZW1zW3JlcXVlc3RJZF07XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIG1vbml0b3JpbmcgaXRlbXMgaWQuXHJcbiAgICAgICAgICAgICAgICBpZihyZXF1ZXN0ZWRJdGVtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdGVkSXRlbS5pZCA9IHJlc3BvbnNlVmFsdWUubW9uaXRvcmVkSXRlbUlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVxdWVzdGVkSXRlbSA9PSB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG5ld01vbml0b3JlZEl0ZW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0sdGhpcyk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNb25pdG9yaW5nU3Vic2NyaXB0aW9uOmNyZWF0ZU1vbml0b3JlZEl0ZW1zOiAlb1wiLCBjb21wb25lbnRQYXJhbWV0ZXJzKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBuZXcgbW9uaXRvcmVkIGl0ZW1zLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdfSBjb21wb25lbnRJdGVtc1xyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSAgY3JlYXRlTW9uaXRvcmVkU3Vic2NyaXB0aW9uSXRlbXMoY29tcG9uZW50SXRlbXM6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdKSA6TWFwPG51bWJlcixNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbT4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IG5ld01vbml0b3JlZEl0ZW1zOk1hcDxudW1iZXIsTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW0+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICBjb21wb25lbnRJdGVtcy5mb3JFYWNoKChjb21wb25lbnRJdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgbW9ub3RvcmVkIGl0ZW0gZm9yIHRoZSB2YWx1ZXNcclxuICAgICAgICAgICAgdGhpcy5hZGROZXdNb25pdG9yaW5nSXRlbShjb21wb25lbnRJdGVtLG5ld01vbml0b3JlZEl0ZW1zLCBPcGNVYUF0dHJpYnV0ZS5WQUxVRSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBtb25vdG9yZWQgaXRlbSBmb3IgdGhlIHVzZXIgYWNjZXNzIGxldmVsXHJcbiAgICAgICAgICAgIHRoaXMuYWRkTmV3TW9uaXRvcmluZ0l0ZW0oY29tcG9uZW50SXRlbSxuZXdNb25pdG9yZWRJdGVtcywgT3BjVWFBdHRyaWJ1dGUuVVNFUl9BQ0NFU1NfTEVWRUwpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld01vbml0b3JlZEl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBtb25pdG9yaW5nIGl0ZW0gdG8gdGhlIHN1YnNjcmlwdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW19IGNvbXBvbmVudEl0ZW1cclxuICAgICAqIEBwYXJhbSB7TWFwPG51bWJlciwgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW0+fSBuZXdNb25pdG9yZWRJdGVtc1xyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGROZXdNb25pdG9yaW5nSXRlbShjb21wb25lbnRJdGVtOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0sbmV3TW9uaXRvcmVkSXRlbXM6TWFwPG51bWJlcixNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbT4sb3BjVWFBdHRyaWJ1dGU6IE9wY1VhQXR0cmlidXRlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIG5leHQgY2xpZW50IGhhbmRsZVxyXG4gICAgICAgICAgICBsZXQgY2xpZW50SGFuZGxlOiBudW1iZXIgPSB0aGlzLmdldE5leHRDbGllbnRIYW5kbGUoKTtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IG1vbml0b3JpbmcgaXRlbSBpbnN0YW5jZVxyXG4gICAgICAgICAgICBsZXQgbmV3TW9uaXRvckl0ZW0gPSBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbS5jcmVhdGUoY29tcG9uZW50SXRlbSwgb3BjVWFBdHRyaWJ1dGUsIGNsaWVudEhhbmRsZSk7XHJcbiAgICAgICAgICAgIC8vIGFkZCBpdCB0byB0aGUgc3Vic2NyaXB0aW9uIGl0ZW1zIGNvbGxlY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5fbW9uaXRvcmluZ0l0ZW1zLnNldChjbGllbnRIYW5kbGUsIG5ld01vbml0b3JJdGVtKTtcclxuICAgICAgICAgICAgLy8gYWRkIGl0IHRvIHRoZSBzdWJzY3JpcHRpb24gaXRlbXNcclxuICAgICAgICAgICAgbmV3TW9uaXRvcmVkSXRlbXMuc2V0KGNsaWVudEhhbmRsZSwgbmV3TW9uaXRvckl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbW9uaXRvcmVkIHN1YnNjcmlwdGlvbiBpdGVtc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdfSBjb21wb25lbnRJdGVtc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgaW52b2tlQ3JlYXRlTW9uaXRvcmVkU3Vic2NyaXB0aW9uSXRlbXMoY3JlYXRlTW9uaXRvcmVkSXRlbXNCYXRjaFNlcnZpY2VzOk9wY1VhUmVzdFNlcnZpY2VQcm92aWRlcixtb25pdG9yaW5nSXRlbXM6QXJyYXk8TW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW0+KXtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb25pdG9yaW5nSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbW9uaXRvcmluZ0l0ZW0gPSBtb25pdG9yaW5nSXRlbXNbaV07XHJcbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU1vbml0b3JlZEl0ZW1zQmF0Y2hTZXJ2aWNlcy5jcmVhdGVNb25pdG9yZWRJdGVtKHRoaXMuX3Nlc3Npb25JZCwgdGhpcy5fc3Vic2NyaXB0aW9uSWQsIG1vbml0b3JpbmdJdGVtLm1vbml0b3JpbmdPYmplY3QuaWQsbW9uaXRvcmluZ0l0ZW0uY2xpZW50SWQsIE9wY1VhUmVzdFNlcnZpY2VzLm1vbml0b3JpbmdTYW1wbGluZ0ludGVydmFsLCBtb25pdG9yaW5nSXRlbS5tb25pdG9yaW5nUHJvcGVydHkgYXMgT3BjVWFBdHRyaWJ1dGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE5leHRDbGllbnRIYW5kbGUoKTogbnVtYmVyIHtcclxuICAgICAgICAvLyBnZXQgdGhlIG5leHQgY2xpZW50IGlkIGFuZCBzZXQgaXQgdG8gdGhlIG5leHQgdmFsdWUuIFRoaXMgZW5zdXJlcyBhIHVuaXF1ZSBpZCBvdmVyIHRoZSBzdWJzY3JpcHRpb24gbGlmZXRpbWUgd2hlbiByZW1vdmluZyBhbmQgcmVhZGRpbmcgbW9uaXRvcmVkIGl0ZW1zLlxyXG4gICAgICAgIHJldHVybiB0aGlzLl9uZXh0Q2xpZW50SWQrKztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBvYnNlcnZhbGVzIGZyb20gdGhlIHN1YnNjcmlwdGlvblxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGRlbGV0ZU1vbnRpdG9yZWRJdGVtcyhvYnNlcnZlZEl0ZW1zOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1bXSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIHNvbWV0aGluZyB0byByZW1vdmUgLi4uLlxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX21vbml0b3JpbmdJdGVtcy5zaXplID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFjdGl2YXRlIGJhdGNoaW5nXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVNb25pdG9yZWRJdGVtc0JhdGNoU2VydmljZXMgPSBPcGNVYVJlc3RTZXJ2aWNlcy5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZU1vbml0b3JlZEl0ZW1zQmF0Y2hTZXJ2aWNlcy5hY3RpdmF0ZUJhdGNoaW5nKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSByZXF1ZXN0cyBmb3IgcmVtb3ZpbmcgdGhlIG1vbml0b3JlZCBpdGVtcy5cclxuICAgICAgICAgICAgICAgIGxldCBvYnNvbGV0ZU1vbml0b3JpbmdJdGVtc1RvRGVsZXRlOiBBcnJheTxNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbT4gPSBhd2FpdCB0aGlzLmdldE9ic29sZXRlTW9uaXRvcmVkSXRlbXMob2JzZXJ2ZWRJdGVtcywgZGVsZXRlTW9uaXRvcmVkSXRlbXNCYXRjaFNlcnZpY2VzKTsgIFxyXG4gICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgYmF0Y2ggcmVxdWVzdCBmb3IgdW5zdWJzY3JpYmluZyB0aGUgb2Jzb2xldGUgbW9uaXRvcmVkIGl0ZW1zXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlZFJlc3VsdCA9IGF3YWl0IGRlbGV0ZU1vbml0b3JlZEl0ZW1zQmF0Y2hTZXJ2aWNlcy5leGVjdXRlQmF0Y2hSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBtYXRjaCB0aGUgZGVsZXRlZCBrZXlzIG9mIHRoZSByZXN1bHQgdG8gdGhlIHJlcXVlc3RlZCBpdGVtcyBhbmQgZGVsZXRlLiBDdXJyZW50bHkgdGhlIG9yZGVyIGFuZCBudW1iZXIgb2YgcmVxdWVzdHMgc3RyaWN0bHkgbmVlZHMgdG8gbWF0Y2ggdGhlIHJlc3BvbnNlcyxcclxuICAgICAgICAgICAgICAgICAgICAvLyB3aGljaCBpcyB0eXBpY2FsbHkgdGhlIGNhc2UuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBtb25pdG9yZWQgaXRlbXMgYWZ0ZXIgdW5zdWJzY3JpYmluZyB0aGVtXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVNYW5hZ2VkTW9uaXRvcmVkSXRlbXMob2Jzb2xldGVNb25pdG9yaW5nSXRlbXNUb0RlbGV0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIHRoZSBvYnNvbGV0ZSBpdGVtcyBmcm9tIHRoZSBtYW5hZ2VkIGNvbGxlY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbVtdfSBvYnNvbGV0ZU1vbml0b3JpbmdJdGVtc1RvRGVsZXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlbGV0ZU1hbmFnZWRNb25pdG9yZWRJdGVtcyhvYnNvbGV0ZU1vbml0b3JpbmdJdGVtc1RvRGVsZXRlOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbVtdKSB7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgdGhlIG9ic29sZXRlIGFuZCBkZWxldGVkIGl0ZW1zIGluIHRoZSBjb2xsZWN0aW9uIGFuZCBkZWxldGUgaXQuXHJcbiAgICAgICAgY29uc3QgbW9uaXRvcmluZ0VudHJpZXMgPSBBcnJheS5mcm9tKHRoaXMuX21vbml0b3JpbmdJdGVtcy5lbnRyaWVzKCkpO1xyXG4gICAgICAgIG9ic29sZXRlTW9uaXRvcmluZ0l0ZW1zVG9EZWxldGUuZm9yRWFjaCgob2Jzb2xldGVJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9ic29sZXRlTW9uaXRvcmluZ0l0ZW0gPSBtb25pdG9yaW5nRW50cmllcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbVsxXSA9PT0gb2Jzb2xldGVJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9uaXRvcmluZ0l0ZW1zLmRlbGV0ZShpdGVtWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyB0aGUgb2Jzb2xldGUgbWluaXRvcmVkIGl0ZW1zIHRvIGJlIGRlbGV0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1bXX0gb2JzZXJ2ZWRJdGVtc1xyXG4gICAgICogQHBhcmFtIHtPcGNVYVJlc3RTZXJ2aWNlUHJvdmlkZXJ9IGRlbGV0ZU1vbml0b3JlZEl0ZW1zQmF0Y2hTZXJ2aWNlc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0T2Jzb2xldGVNb25pdG9yZWRJdGVtcyhvYnNlcnZlZEl0ZW1zOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1bXSwgZGVsZXRlTW9uaXRvcmVkSXRlbXNCYXRjaFNlcnZpY2VzOiBPcGNVYVJlc3RTZXJ2aWNlUHJvdmlkZXIpIHtcclxuICAgICAgICBsZXQgb2Jzb2xldGVNb25pdG9yaW5nSXRlbXNUb0RlbGV0ZTogQXJyYXk8TW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW0+ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYnNlcnZlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBmaW5kIGNvcnJlc3BvbmRpbmcgbW9uaWRvcmVkIGl0ZW1zXHJcbiAgICAgICAgICAgIGNvbnN0IG9ic29sZXRlTW9uaXRvcmluZ0l0ZW1zID0gdGhpcy5maW5kT2JzZXJ2ZWRTdWJzY3JpcHRpb25JdGVtcyhvYnNlcnZlZEl0ZW1zW2ldKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBpdGVtcyB0byByZW1vdmUgLi4uLlxyXG4gICAgICAgICAgICBpZiAob2Jzb2xldGVNb25pdG9yaW5nSXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBtb25pdG9yaW5nIGl0ZW1zIG9mIHRoZSBvYnNlcnZlZCBpdGVtXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9ic29sZXRlTW9uaXRvcmluZ0l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbURlbGV0ZWQgPSBhd2FpdCB0aGlzLnJlbW92ZU1vbml0b3JlZFN1YnNjcmlwdGlvbkl0ZW0oZGVsZXRlTW9uaXRvcmVkSXRlbXNCYXRjaFNlcnZpY2VzLCBvYnNvbGV0ZU1vbml0b3JpbmdJdGVtc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1EZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic29sZXRlTW9uaXRvcmluZ0l0ZW1zVG9EZWxldGUucHVzaChpdGVtRGVsZXRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYnNvbGV0ZU1vbml0b3JpbmdJdGVtc1RvRGVsZXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgYWxsIG1vbml0b3JpbmcgaXRlbXMgd2l0aCBtYXRjaGluZyBtb25pdG9yaW5nT2JqZXQuaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHthbnlbXX0gb2JzZXJ2ZWRJdGVtc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmRPYnNlcnZlZFN1YnNjcmlwdGlvbkl0ZW1zKG9ic2VydmVkSXRlbTogTWFwcENvY2twaXRDb21wb25lbnRJdGVtKTpBcnJheTxNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbT4ge1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGtleSBvZiBhIG1hdGNoaW5nIGl0ZW0gKCB0aGUgbW9uaXRvcmluZyBvYmplY3QgaWRzIG5lZWQgdG8gYmUgdGhlIHNhbWUpXHJcbiAgICAgICAgY29uc3QgbW9uaXRvcmluZ0l0ZW1zID0gQXJyYXkuZnJvbSh0aGlzLl9tb25pdG9yaW5nSXRlbXMudmFsdWVzKCkpLmZpbHRlcigoaXRlbTogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW0pID0+IHsgcmV0dXJuIGl0ZW0ubW9uaXRvcmluZ09iamVjdC5pZCA9PT0gb2JzZXJ2ZWRJdGVtLmlkfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtb25pdG9yaW5nSXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBtb25pdG9yZWQgaXRlbSBmcm9tIHRoZSBzdWJzY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHthbnlbXX0gb2JzZXJ2ZWRJdGVtc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGl0ZW1LZXlcclxuICAgICAqIEBwYXJhbSB7TW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW19IHN1YnNjcmlwdGlvbkl0ZW1cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVtb3ZlTW9uaXRvcmVkU3Vic2NyaXB0aW9uSXRlbShkZWxldGVNb25pdG9yZWRJdGVtc0JhdGNoU2VydmljZXM6T3BjVWFSZXN0U2VydmljZVByb3ZpZGVyLHN1YnNjcmlwdGlvbkl0ZW06IE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtKTpQcm9taXNlPE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtfG51bGw+IHtcclxuXHJcbiAgICAgICAgY29uc3QgbW9uaXRvcmluZ0VudHJpZXMgPSAgQXJyYXkuZnJvbSh0aGlzLl9tb25pdG9yaW5nSXRlbXMuZW50cmllcygpKTtcclxuXHJcbiAgICAgICAgLy8gZmlsdGVyIHRoZSBpdGVtcyBtYXRjaGluZyB0aGUgaXRlbSBpZCBhbmQgYXR0cmlidXRlL3Byb3BlcnR5IG5hbWVcclxuICAgICAgICBjb25zdCBvYnNvbGV0ZU1vbml0b3JpbmdJdGVtID0gbW9uaXRvcmluZ0VudHJpZXMuZmluZCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKGl0ZW1bMV0ubW9uaXRvcmluZ09iamVjdC5pZCA9PT0gc3Vic2NyaXB0aW9uSXRlbS5tb25pdG9yaW5nT2JqZWN0LmlkKVxyXG4gICAgICAgICAgICAgICAgJiYgKGl0ZW1bMV0ubW9uaXRvcmluZ1Byb3BlcnR5ID09PSBzdWJzY3JpcHRpb25JdGVtLm1vbml0b3JpbmdQcm9wZXJ0eSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChvYnNvbGV0ZU1vbml0b3JpbmdJdGVtKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGl0ZW0gZW50cnlcclxuICAgICAgICAgICAgY29uc3Qgb2Jzb2xldGVJdGVtID0gb2Jzb2xldGVNb25pdG9yaW5nSXRlbVsxXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvYnNvbGV0ZSBpdGVtIGZyb20gdGhlIHN1YnNjcmlwdGlvbi5cclxuICAgICAgICAgICAgYXdhaXQgZGVsZXRlTW9uaXRvcmVkSXRlbXNCYXRjaFNlcnZpY2VzLmRlbGV0ZU1vbml0b3JlZEl0ZW0odGhpcy5fc2Vzc2lvbklkLCB0aGlzLl9zdWJzY3JpcHRpb25JZCwgb2Jzb2xldGVJdGVtLmlkKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb25JdGVtO1xyXG4gICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyB0aGUgcHJvY2Vzc2luZyBvZiBpdGVtIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lPcGNVYURhdGFDaGFuZ2VkfSBvcGNVYURhdGFDaGFuZ2VkSW5mb1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwcm9jZXNzSXRlbUNoYW5nZXMob3BjVWFEYXRhQ2hhbmdlZEluZm86IElPcGNVYURhdGFDaGFuZ2VkKTogYW55IHtcclxuICAgICAgICBsZXQgY2hhbmdlZE9ic2VydmFibGVzID0gbmV3IEFycmF5PE9ic2VydmFibGU+KCk7XHJcbiAgICAgICAgb3BjVWFEYXRhQ2hhbmdlZEluZm8uRGF0YU5vdGlmaWNhdGlvbnMuZm9yRWFjaChkYXRhTm90aWZpY2F0aW9uID0+IHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBpdGVtIHRvIGNoYW5nZVxyXG4gICAgICAgICAgICBsZXQgbW9uaXRvckl0ZW0gPSB0aGlzLmdldE1vbml0b3JlZEl0ZW1CeUlkKGRhdGFOb3RpZmljYXRpb24uY2xpZW50SGFuZGxlKTtcclxuICAgICAgICAgICAgaWYgKG1vbml0b3JJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGl0ZW1zIHZhbHVlXHJcbiAgICAgICAgICAgICAgICBtb25pdG9ySXRlbS5jaGFuZ2VWYWx1ZShkYXRhTm90aWZpY2F0aW9uLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vIGFkZCBpdCB0byB0aGUgbW9kaWZpZWQgb2JzZXJ2YWJsZXMgbGlzdFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlZE9ic2VydmFibGVzLnB1c2gobmV3IE9ic2VydmFibGUobW9uaXRvckl0ZW0ubW9uaXRvcmluZ09iamVjdCxtb25pdG9ySXRlbS5tb25pdG9yaW5nUHJvcGVydHkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLnByb2Nlc3NPcGNVYURhdGFDaGFuZ2VkOiBDb3VsZCBub3QgZmluZCBtb25pdG9yZWQgaXRlbSAnICsgSlNPTi5zdHJpbmdpZnkoZGF0YU5vdGlmaWNhdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vbk1vbml0b3JJdGVtc0NoYW5nZWQodGhpcywgY2hhbmdlZE9ic2VydmFibGVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vdGlmaWVzIGZyb20gdXBkYXRlaW5nIG9ic2VydmVkIGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb25pdG9yaW5nU3Vic2NyaXB0aW9ufSBjaGFuZ2VkU3Vic2NyaXB0aW9uXHJcbiAgICAgKiBAcGFyYW0ge09ic2VydmFibGVbXX0gY2hhbmdlZE9ic2VydmFibGVzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIG9uTW9uaXRvckl0ZW1zQ2hhbmdlZChjaGFuZ2VkU3Vic2NyaXB0aW9uOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uLCBjaGFuZ2VkT2JzZXJ2YWJsZXM6IE9ic2VydmFibGVbXSk6IGFueSB7XHJcbiAgICAgICAgbGV0IGNoYW5nZWRFdmVudEFyZ3MgPSBuZXcgRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZEFyZ3MoY2hhbmdlZFN1YnNjcmlwdGlvbi5vYnNlcnZlciwgY2hhbmdlZFN1YnNjcmlwdGlvbiwgY2hhbmdlZE9ic2VydmFibGVzIGFzIFtdKTtcclxuICAgICAgICB0aGlzLmV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQucmFpc2UodGhpcywgY2hhbmdlZEV2ZW50QXJncyk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlPYnNlcnZlckZyb21DaGFuZ2VzKGNoYW5nZWRTdWJzY3JpcHRpb24ub2JzZXJ2ZXIsY2hhbmdlZE9ic2VydmFibGVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vdGlmaWVzIHRoZSBvYnNlcnZlciBmcm9tIGNoYW5nZXMgaWYgdGhlIG9ic2VydmVyIGltcGxlbWVudHMgdGhlIG5vdGlmaWNhdGlvbiBpbnRlcmZhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJT2JzZXJ2ZXJ9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge09ic2VydmFibGVzW119IGNoYW5nZWRPYnNlcnZhYmxlc1xyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBub3RpZnlPYnNlcnZlckZyb21DaGFuZ2VzKG9ic2VydmVyOiBJT2JzZXJ2ZXIsIGNoYW5nZWRPYnNlcnZhYmxlczogT2JzZXJ2YWJsZVtdKSB7XHJcbiAgICAgICAgaWYob2JzZXJ2ZXIub25PYnNlcnZhYmxlc0NoYW5nZWQpe1xyXG4gICAgICAgICAgICBvYnNlcnZlci5vbk9ic2VydmFibGVzQ2hhbmdlZChjaGFuZ2VkT2JzZXJ2YWJsZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyBob2xkcyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc3Vic3JpcHRlZCBpdGVtXHJcbiAqXHJcbiAqIEBjbGFzcyBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbVxyXG4gKi9cclxuY2xhc3MgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW0ge1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBpdGVtIGluc3RhbmNlXHJcbiAgICBwcml2YXRlIF9tb25pdG9ySXRlbUluc3RhbmNlOiBhbnkgPSB1bmRlZmluZWQ7XHJcbiAgICAvLyBob2xkcyB0aGUgcHJvcGVydHkgbmFtZSBvZiB0aGUgaXRlbSB0byB3YXRjaFxyXG4gICAgcHJpdmF0ZSBfbW9uaXRvcmluZ1Byb3BlcnR5OiBhbnkgPSBcIlwiO1xyXG4gICAgLy8gaG9sZHMgdGhlIG1vbml0b3IgaXRlbSBpZFxyXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvLyBob2xkcyBjbGllbnQgaWQgXHJcbiAgICBwcml2YXRlIF9jbGllbnRJZDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtLlxyXG4gICAgICogQHBhcmFtIHsqfSBtb25pdG9yaW5nT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbW9uaXRvcmluZ1Byb3BlcnR5XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW1cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobW9uaXRvcmluZ09iamVjdDogYW55LCBtb25pdG9yaW5nUHJvcGVydHk6IHN0cmluZyxjbGllbnRJZDpudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9tb25pdG9ySXRlbUluc3RhbmNlID0gbW9uaXRvcmluZ09iamVjdDtcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nUHJvcGVydHkgPSBtb25pdG9yaW5nUHJvcGVydHk7XHJcbiAgICAgICAgdGhpcy5fY2xpZW50SWQgPSBjbGllbnRJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1vbml0b3Jpbmcgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1vbml0b3JpbmdPYmplY3QoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9uaXRvckl0ZW1JbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1vbml0b3JpbmcgcHJvcGVydHlcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBtb25pdG9yaW5nUHJvcGVydHkoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9uaXRvcmluZ1Byb3BlcnR5O1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjbGllbnQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjbGllbnRJZCgpIDogbnVtYmVyICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudElkO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlkKGlkOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYW5kIGluaXRpYWxpemVzIGEgbmV3IG1vbml0b3JpbmcgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRJdGVtfSBtb25pdG9yaW5nT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbW9uaXRvcmluZ1Byb3BlcnR5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2xpZW50SWRcclxuICAgICAqIEByZXR1cm5zIHtNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbX1cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlKG1vbml0b3JpbmdPYmplY3Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSwgbW9uaXRvcmluZ1Byb3BlcnR5OiBzdHJpbmcsIGNsaWVudElkOm51bWJlcik6IE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtKG1vbml0b3JpbmdPYmplY3QsIG1vbml0b3JpbmdQcm9wZXJ0eSxjbGllbnRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBzcGVjaWZpZWQgaXRlbSBwcm9wZXJ0eSB3aXRoIHRoZSBuZXcgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld01vbml0b3JlZEl0ZW1WYWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW1cclxuICAgICAqL1xyXG4gICAgY2hhbmdlVmFsdWUobmV3TW9uaXRvcmVkSXRlbVZhbHVlOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb25pdG9yaW5nUHJvcGVydHkpIHtcclxuICAgICAgICAgICAgY2FzZSBcIlZhbHVlXCI6XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgb2JqZWN0IHZhbHVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbml0b3JpbmdPYmplY3QudmFsdWUgPSBuZXdNb25pdG9yZWRJdGVtVmFsdWU7IFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJVc2VyQWNjZXNzTGV2ZWxcIjpcclxuICAgICAgICAgICAgICAgIC8vIHNldCB3cml0ZWFibGUgYXR0cmlidXRlIGFjY29yZGluZyB0byB0aGUgYWNjZXNzIGxldmVsXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3V3JpdGVhYmxlU3RhdGUgPSAobmV3TW9uaXRvcmVkSXRlbVZhbHVlICYgT3BjVWFBY2Nlc3NMZXZlbC5DdXJyZW50V3JpdGUpID09IE9wY1VhQWNjZXNzTGV2ZWwuQ3VycmVudFdyaXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25pdG9yaW5nT2JqZWN0LmlzV3JpdGVhYmxlLnZhbHVlID0gbmV3V3JpdGVhYmxlU3RhdGU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtIC0gdXBkYXRlZCB3cml0ZWFibGUgJW8gJW9cIiwgdGhpcy5tb25pdG9yaW5nT2JqZWN0LmJyb3dzZU5hbWUgKyBcIi5pc1dyaXRlYWJsZSA9IFwiLCB0aGlzLm1vbml0b3JpbmdPYmplY3QuaXNXcml0ZWFibGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlciwgRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZEFyZ3MgfTsiXX0=