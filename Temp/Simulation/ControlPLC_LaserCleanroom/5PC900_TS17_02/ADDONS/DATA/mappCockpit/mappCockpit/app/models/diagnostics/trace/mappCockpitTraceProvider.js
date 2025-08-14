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
define(["require", "exports", "../mappCockpitCommonInfoProvider", "./traceDataPointInfo", "../../../framework/property", "../../../framework/command", "./mappCockpitTraceComponent", "../../../framework/componentHub/bindings/bindings", "../../../framework/componentHub/bindings/bindingDeclarations"], function (require, exports, mappCockpitCommonInfoProvider_1, traceDataPointInfo_1, property_1, command_1, mappCockpitTraceComponent_1, bindings_1, Binding) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements trace access services
     *
     * @class MappCockpitTraceProvider
     */
    var MappCockpitTraceProvider = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitTraceProvider.
         * @param {MappCockpitDiagnosticProvider} diagnosticProvider
         * @memberof MappCockpitTraceProvider
         */
        function MappCockpitTraceProvider(diagnosticProvider) {
            this._diagnosticProvider = diagnosticProvider;
            this._availableTraceDataPoints = property_1.Property.create([]);
            this.createCommands();
        }
        MappCockpitTraceProvider.prototype.onTraceComponentIdsUpdated = function (traceComponentIds) {
            //BINDINGSOURCE: method stub supporting bindability
        };
        /**
         * Creates the exposed commands
         *
         * @private
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.createCommands = function () {
            this._commandReadAvailableTracePoints = command_1.Command.create(this, this.executeCommandReadAvailableTracePoints());
        };
        /**
         * Initializes and connects the trace provider
         *
         * @returns {Promise<any>}
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.createComponentBindings();
                            _a = this;
                            return [4 /*yield*/, this.initializeTraceComponents()];
                        case 1:
                            _a.traceComponents = _b.sent();
                            return [4 /*yield*/, this.commandReadAvailableTracePoints.execute(null, function (availableTraceDataPoints) {
                                    _this.updateAvailableTracePointsInfo(availableTraceDataPoints);
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates the bindings to other components
         *
         * @private
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.createComponentBindings = function () {
            bindings_1.Bindings.createByDecl(Binding.Traces.ComponentIds, this, "", "onTraceComponentIdsUpdated", false);
            bindings_1.Bindings.createByDecl(Binding.Traces.AvailableDataPoints, this, "", "updateAvailableDataPoints", false);
        };
        /**
         * Notifies from updating the available trace points
         *
         * @private
         * @param {TraceDataPointInfo[]} availableTraceDataPoints
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.updateAvailableTracePointsInfo = function (availableTraceDataPoints) {
            this._availableTraceDataPoints.value = availableTraceDataPoints;
            //TODO: extract to own method to be called from the red trace points response
            this.traceComponents.forEach(function (traceComponent) {
                traceComponent.updateDataPointInformations(traceComponent.traceConfigurationData);
            });
        };
        Object.defineProperty(MappCockpitTraceProvider.prototype, "commandReadAvailableTracePoints", {
            /**
             * Command for reading the currently available trace points.
             *
             * @readonly
             * @type {Command<any, TraceData>}
             * @memberof MappCockpitTraceProvider
             */
            get: function () {
                return this._commandReadAvailableTracePoints;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Implements the command for reading the available trace points
         *
         * @returns {*}
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.executeCommandReadAvailableTracePoints = function () {
            var _this = this;
            return function (commandArguments, commandResponse) {
                _this.readAllTraceDataPoints().then(function (traceDataPoints) {
                    commandResponse.executed(traceDataPoints);
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        Object.defineProperty(MappCockpitTraceProvider.prototype, "traceComponents", {
            /**
             * Returns the trace components
             *
             * @readonly
             * @type {MappCockpitTraceComponent[]}
             * @memberof MappCockpitTraceProvider
             */
            get: function () {
                return this._traceComponents;
            },
            set: function (traceComponents) {
                this._traceComponents = traceComponents;
                var userComponentIds = this._traceComponents.map(function (component) { return component.mappCockpitComponent.browseName; });
                this.onTraceComponentIdsUpdated(userComponentIds);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceProvider.prototype, "availableDataPoints", {
            /**
             * Gets the traceable data points
             *
             * @readonly
             * @type {Property<Array<TraceDataPoint>>}
             * @memberof MappCockpitTraceProvider
             */
            get: function () {
                return this._availableTraceDataPoints;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initializes and connects the target trace components
         *
         * @private
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.initializeTraceComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var components, traceComponents, i, traceComponent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getTraceComponents()];
                        case 1:
                            components = _a.sent();
                            traceComponents = new Array();
                            for (i = 0; i < components.length; i++) {
                                traceComponent = new mappCockpitTraceComponent_1.MappCockpitTraceComponent(this._diagnosticProvider, components[i]);
                                traceComponent.availableTraceDataPoints = this._availableTraceDataPoints;
                                traceComponents.push(traceComponent);
                            }
                            ;
                            return [2 /*return*/, traceComponents];
                    }
                });
            });
        };
        /**
         * gets the trace components from all available components
         *
         * @private
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.getTraceComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var traceComponents;
                return __generator(this, function (_a) {
                    traceComponents = this._diagnosticProvider.model.components.filter(function (component) { return component.browseName == "NewTraceConfig"; });
                    if (traceComponents.length == 1) {
                        // Set Displayname of trace component "NewTraceConfig" to "Trace"
                        traceComponents[0].displayName = "Trace";
                        return [2 /*return*/, traceComponents];
                    }
                    return [2 /*return*/, new Array()];
                });
            });
        };
        /**
         * Reads the available trace datapoints from all components.
         *
         * @private
         * @returns
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.readAllTraceDataPoints = function () {
            return __awaiter(this, void 0, void 0, function () {
                var allAvailableTraceDataPoints, traceableComponents;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            allAvailableTraceDataPoints = new Array();
                            return [4 /*yield*/, this.readTraceProviderComponents()];
                        case 1:
                            traceableComponents = _a.sent();
                            // collect the components data points into one flat array
                            traceableComponents.forEach(function (traceableComponentcomponent) {
                                var componetTracePoints = _this.readComponentTraceDataPoints(traceableComponentcomponent);
                                allAvailableTraceDataPoints = allAvailableTraceDataPoints.concat(componetTracePoints);
                            });
                            // update the available trace points link.
                            this._availableTraceDataPoints.value = allAvailableTraceDataPoints;
                            this.updateAvailableDataPoints(allAvailableTraceDataPoints);
                            return [2 /*return*/, allAvailableTraceDataPoints];
                    }
                });
            });
        };
        /**
         * Updates the available data points
         *
         * @private
         * @param {TraceDataPointInfo[]} allAvailableTraceDataPoints
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.updateAvailableDataPoints = function (allAvailableTraceDataPoints) {
            // BINDINGSOURCE: method stub to make the passed data bindable
        };
        /**
         * Collects components supporting traceability and exposing tracepoints
         *
         * @returns {Array<MappCockpitComponent>}
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.readTraceProviderComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var traceComponents, allComponents, i, component;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            traceComponents = new Array();
                            return [4 /*yield*/, this._diagnosticProvider.componentProvider.browseComponents()];
                        case 1:
                            allComponents = _a.sent();
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < allComponents.length)) return [3 /*break*/, 5];
                            component = allComponents[i];
                            return [4 /*yield*/, mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance().readComponentMetaInfo(component)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5:
                            traceComponents = allComponents.filter(function (component) { return component.metaData && component.metaData.MetaConfigDatapoints; });
                            return [2 /*return*/, traceComponents];
                    }
                });
            });
        };
        /**
         * Reads the trace data points from a single component
         *
         * @private
         * @param {MappCockpitComponent} traceableComponent
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.readComponentTraceDataPoints = function (traceableComponent) {
            var traceDataPoints = [];
            var traceMetaInfo = traceableComponent.metaData.MetaConfigDatapoints.DataPointsDefinition;
            traceMetaInfo.Namespaces.forEach(function (namespace) {
                namespace.Data.DataPoints.forEach(function (dataPointRef) {
                    traceDataPoints.push(traceDataPointInfo_1.TraceDataPointInfo.create(traceableComponent.browseName, traceMetaInfo.DeviceAddress, namespace, dataPointRef));
                });
            });
            return traceDataPoints;
        };
        return MappCockpitTraceProvider;
    }());
    exports.MappCockpitTraceProvider = MappCockpitTraceProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRUcmFjZVByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvbWFwcENvY2twaXRUcmFjZVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVlBOzs7O09BSUc7SUFDSDtRQWdCSTs7OztXQUlHO1FBQ0gsa0NBQVksa0JBQWlEO1lBRXpELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztZQUU5QyxJQUFJLENBQUMseUJBQXlCLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQTRCLEVBQUUsQ0FBQyxDQUFDO1lBRWhGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBR08sNkRBQTBCLEdBQWxDLFVBQW1DLGlCQUFpQztZQUNoRSxtREFBbUQ7UUFDdkQsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssaURBQWMsR0FBdEI7WUFDSSxJQUFJLENBQUMsZ0NBQWdDLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxzQ0FBc0MsRUFBRSxDQUFDLENBQUM7UUFDaEgsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0csNkNBQVUsR0FBaEI7Ozs7Ozs7NEJBRUksSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7NEJBRS9CLEtBQUEsSUFBSSxDQUFBOzRCQUFtQixxQkFBTSxJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFBQTs7NEJBQTdELEdBQUssZUFBZSxHQUFHLFNBQXNDLENBQUM7NEJBRTlELHFCQUFNLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLFVBQUMsd0JBQXdCO29DQUM3RSxLQUFJLENBQUMsOEJBQThCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQ0FDbEUsQ0FBQyxDQUFDLEVBQUE7OzRCQUZGLFNBRUUsQ0FBQzs7Ozs7U0FDTjtRQUVEOzs7OztXQUtHO1FBQ0ssMERBQXVCLEdBQS9CO1lBQ0ksbUJBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRyxtQkFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsMkJBQTJCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUcsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGlFQUE4QixHQUF0QyxVQUF1Qyx3QkFBOEM7WUFDakYsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssR0FBRyx3QkFBd0IsQ0FBQztZQUNoRSw2RUFBNkU7WUFDN0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQSxjQUFjO2dCQUN2QyxjQUFjLENBQUMsMkJBQTJCLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDdEYsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBU0Qsc0JBQVcscUVBQStCO1lBUDFDOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQztZQUNqRCxDQUFDOzs7V0FBQTtRQUVEOzs7OztXQUtHO1FBQ0sseUVBQXNDLEdBQTlDO1lBQUEsaUJBU0M7WUFSRyxPQUFPLFVBQUMsZ0JBQW9CLEVBQUMsZUFBd0U7Z0JBQ2pHLEtBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLGVBQWU7b0JBQy9DLGVBQWUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBRTlDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQUs7b0JBQ1gsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7UUFDTixDQUFDO1FBU0Qsc0JBQVcscURBQWU7WUFQMUI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLENBQUM7aUJBRUQsVUFBMkIsZUFBNEM7Z0JBQ25FLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7Z0JBQ3hDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQXpDLENBQXlDLENBQUMsQ0FBQztnQkFDekcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdEQsQ0FBQzs7O1dBTkE7UUFlRCxzQkFBVyx5REFBbUI7WUFQOUI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDO1lBQzFDLENBQUM7OztXQUFBO1FBR0Q7Ozs7O1dBS0c7UUFDVyw0REFBeUIsR0FBdkM7Ozs7O2dDQUVxQixxQkFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBQTs7NEJBQTVDLFVBQVUsR0FBRyxTQUErQjs0QkFDNUMsZUFBZSxHQUFHLElBQUksS0FBSyxFQUE2QixDQUFDOzRCQUM3RCxLQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0NBRWxDLGNBQWMsR0FBRyxJQUFJLHFEQUF5QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDNUYsY0FBYyxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztnQ0FDekUsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs2QkFDeEM7NEJBQUEsQ0FBQzs0QkFFRixzQkFBTyxlQUFlLEVBQUM7Ozs7U0FDMUI7UUFHRDs7Ozs7V0FLRztRQUNXLHFEQUFrQixHQUFoQzs7OztvQkFDUSxlQUFlLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsU0FBUyxJQUFLLE9BQU8sU0FBUyxDQUFDLFVBQVUsSUFBSSxnQkFBZ0IsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO29CQUN2SSxJQUFHLGVBQWUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUM5Qjt3QkFDSSxpRUFBaUU7d0JBQ2pFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO3dCQUN6QyxzQkFBTyxlQUFlLEVBQUE7cUJBQ3pCO29CQUNELHNCQUFPLElBQUksS0FBSyxFQUF3QixFQUFDOzs7U0FDNUM7UUFFRDs7Ozs7O1dBTUc7UUFDVyx5REFBc0IsR0FBcEM7Ozs7Ozs7NEJBRVEsMkJBQTJCLEdBQUcsSUFBSSxLQUFLLEVBQXNCLENBQUM7NEJBRVgscUJBQU0sSUFBSSxDQUFDLDJCQUEyQixFQUFFLEVBQUE7OzRCQUEzRixtQkFBbUIsR0FBZ0MsU0FBd0M7NEJBRS9GLHlEQUF5RDs0QkFDekQsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFVBQUMsMkJBQTJCO2dDQUNwRCxJQUFJLG1CQUFtQixHQUFHLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dDQUN6RiwyQkFBMkIsR0FBRywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs0QkFDMUYsQ0FBQyxDQUFDLENBQUM7NEJBRUgsMENBQTBDOzRCQUMxQyxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxHQUFHLDJCQUEyQixDQUFDOzRCQUVuRSxJQUFJLENBQUMseUJBQXlCLENBQUMsMkJBQTJCLENBQUMsQ0FBQzs0QkFFNUQsc0JBQU8sMkJBQTJCLEVBQUM7Ozs7U0FDdEM7UUFFRDs7Ozs7O1dBTUc7UUFDSyw0REFBeUIsR0FBakMsVUFBa0MsMkJBQWlEO1lBQ2hGLDhEQUE4RDtRQUNqRSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDRyw4REFBMkIsR0FBakM7Ozs7Ozs0QkFDUSxlQUFlLEdBQUcsSUFBSSxLQUFLLEVBQXdCLENBQUM7NEJBRXBDLHFCQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFBOzs0QkFBbkYsYUFBYSxHQUFHLFNBQW1FOzRCQUU5RSxDQUFDLEdBQUcsQ0FBQzs7O2lDQUFFLENBQUEsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUE7NEJBQzlCLFNBQVMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25DLHFCQUFNLDZEQUE2QixDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxFQUFBOzs0QkFBbEYsU0FBa0YsQ0FBQzs7OzRCQUY3QyxDQUFDLEVBQUUsQ0FBQTs7OzRCQUs3QyxlQUFlLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFNBQVMsSUFBSSxPQUFhLFNBQVUsQ0FBQyxRQUFRLElBQVUsU0FBVSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMzSSxzQkFBTyxlQUFlLEVBQUM7Ozs7U0FDMUI7UUFFRDs7Ozs7O1dBTUc7UUFDSywrREFBNEIsR0FBcEMsVUFBcUMsa0JBQXdDO1lBRXpFLElBQUksZUFBZSxHQUE4QixFQUFFLENBQUM7WUFFcEQsSUFBSSxhQUFhLEdBQVMsa0JBQWtCLENBQUMsUUFBUyxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDO1lBRWpHLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsU0FBUztnQkFDdkMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtvQkFDM0MsZUFBZSxDQUFDLElBQUksQ0FBQyx1Q0FBa0IsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RJLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUE7WUFFRixPQUFPLGVBQWUsQ0FBQztRQUMzQixDQUFDO1FBQ0wsK0JBQUM7SUFBRCxDQUFDLEFBdFFELElBc1FDO0lBR1EsNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIgfSBmcm9tICcuLi9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcic7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlciB9IGZyb20gJy4uL21hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyJztcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnRJbmZvIH0gZnJvbSAnLi90cmFjZURhdGFQb2ludEluZm8nO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eSc7XHJcbmltcG9ydCB7IElUcmFjZURhdGFQcm92aWRlciB9IGZyb20gJy4vaW50ZXJmYWNlcy90cmFjZURhdGFQcm92aWRlckludGVyZmFjZSc7XHJcbmltcG9ydCB7IENvbW1hbmQsIElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZSwgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9jb21tYW5kJztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCB9IGZyb20gJy4vbWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJpbmRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ3NcIjtcclxuaW1wb3J0ICogYXMgQmluZGluZyBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2JpbmRpbmdEZWNsYXJhdGlvbnMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIHRyYWNlIGFjY2VzcyBzZXJ2aWNlc1xyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIgaW1wbGVtZW50cyAgSVRyYWNlRGF0YVByb3ZpZGVyIHtcclxuICAgXHJcbiAgICAvLyBSZWZlcmVuY2VzIHRoZSBkaWFnbm9zdGljIHByb3ZpZGVyXHJcbiAgICBwcml2YXRlIF9kaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyO1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSB0cmFjZSBjb21wb25lbnRzIGluc3RhbmNlc1xyXG4gICAgcHJpdmF0ZSBfdHJhY2VDb21wb25lbnRzITogTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFtdO1xyXG4gICAgXHJcbiAgICAvLyBIb2xkcyB0aGUgYXZhaWxhYmxlIHRyYWNlIGRhdGEgcG9pbnRzO1xyXG4gICAgcHJpdmF0ZSBfYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiBQcm9wZXJ0eTxBcnJheTxUcmFjZURhdGFQb2ludEluZm8+PjtcclxuXHJcbiAgICAvLyBIb2xkcyB0aGUgY29tbWFuZCBmb3IgcmVhZGluZyB0aCB0cmFjZSBkYXRhXHJcbiAgICBwcml2YXRlIF9jb21tYW5kUmVhZEF2YWlsYWJsZVRyYWNlUG9pbnRzITogQ29tbWFuZDxhbnksIEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4+O1xyXG5cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIuXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyfSBkaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcikge1xyXG5cclxuICAgICAgICB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIgPSBkaWFnbm9zdGljUHJvdmlkZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxUcmFjZURhdGFQb2ludEluZm8+PihbXSk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZHMoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvblRyYWNlQ29tcG9uZW50SWRzVXBkYXRlZCh0cmFjZUNvbXBvbmVudElkczogIEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICAvL0JJTkRJTkdTT1VSQ0U6IG1ldGhvZCBzdHViIHN1cHBvcnRpbmcgYmluZGFiaWxpdHlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGV4cG9zZWQgY29tbWFuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRzKCkge1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRSZWFkQXZhaWxhYmxlVHJhY2VQb2ludHMgPSBDb21tYW5kLmNyZWF0ZSh0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kUmVhZEF2YWlsYWJsZVRyYWNlUG9pbnRzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgYW5kIGNvbm5lY3RzIHRoZSB0cmFjZSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGluaXRpYWxpemUoKTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRCaW5kaW5ncygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudHJhY2VDb21wb25lbnRzID0gYXdhaXQgdGhpcy5pbml0aWFsaXplVHJhY2VDb21wb25lbnRzKCk7XHJcbiAgIFxyXG4gICAgICAgIGF3YWl0IHRoaXMuY29tbWFuZFJlYWRBdmFpbGFibGVUcmFjZVBvaW50cy5leGVjdXRlKG51bGwsKGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyk9PntcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVBdmFpbGFibGVUcmFjZVBvaW50c0luZm8oYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGJpbmRpbmdzIHRvIG90aGVyIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbXBvbmVudEJpbmRpbmdzKCkge1xyXG4gICAgICAgIEJpbmRpbmdzLmNyZWF0ZUJ5RGVjbChCaW5kaW5nLlRyYWNlcy5Db21wb25lbnRJZHMsIHRoaXMsIFwiXCIsIFwib25UcmFjZUNvbXBvbmVudElkc1VwZGF0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIEJpbmRpbmdzLmNyZWF0ZUJ5RGVjbChCaW5kaW5nLlRyYWNlcy5BdmFpbGFibGVEYXRhUG9pbnRzLCB0aGlzLCBcIlwiLCBcInVwZGF0ZUF2YWlsYWJsZURhdGFQb2ludHNcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm90aWZpZXMgZnJvbSB1cGRhdGluZyB0aGUgYXZhaWxhYmxlIHRyYWNlIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlRGF0YVBvaW50SW5mb1tdfSBhdmFpbGFibGVUcmFjZURhdGFQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVBdmFpbGFibGVUcmFjZVBvaW50c0luZm8oYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiBUcmFjZURhdGFQb2ludEluZm9bXSkge1xyXG4gICAgICAgIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cy52YWx1ZSA9IGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cztcclxuICAgICAgICAvL1RPRE86IGV4dHJhY3QgdG8gb3duIG1ldGhvZCB0byBiZSBjYWxsZWQgZnJvbSB0aGUgcmVkIHRyYWNlIHBvaW50cyByZXNwb25zZVxyXG4gICAgICAgIHRoaXMudHJhY2VDb21wb25lbnRzLmZvckVhY2godHJhY2VDb21wb25lbnQgPT4ge1xyXG4gICAgICAgICAgICB0cmFjZUNvbXBvbmVudC51cGRhdGVEYXRhUG9pbnRJbmZvcm1hdGlvbnModHJhY2VDb21wb25lbnQudHJhY2VDb25maWd1cmF0aW9uRGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21tYW5kIGZvciByZWFkaW5nIHRoZSBjdXJyZW50bHkgYXZhaWxhYmxlIHRyYWNlIHBvaW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtDb21tYW5kPGFueSwgVHJhY2VEYXRhPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb21tYW5kUmVhZEF2YWlsYWJsZVRyYWNlUG9pbnRzKCk6IENvbW1hbmQ8YW55LCBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRSZWFkQXZhaWxhYmxlVHJhY2VQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBsZW1lbnRzIHRoZSBjb21tYW5kIGZvciByZWFkaW5nIHRoZSBhdmFpbGFibGUgdHJhY2UgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRSZWFkQXZhaWxhYmxlVHJhY2VQb2ludHMoKTogIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LFRyYWNlRGF0YVBvaW50SW5mb1tdPntcclxuICAgICAgICByZXR1cm4gKGNvbW1hbmRBcmd1bWVudHM6YW55LGNvbW1hbmRSZXNwb25zZTogSUNvbW1hbmRFeGVjdXRpb25SZXNwb25zZURlbGVnYXRlPFRyYWNlRGF0YVBvaW50SW5mb1tdPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRBbGxUcmFjZURhdGFQb2ludHMoKS50aGVuKCh0cmFjZURhdGFQb2ludHMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZCh0cmFjZURhdGFQb2ludHMpO1xyXG5cclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJhY2UgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0cmFjZUNvbXBvbmVudHMoKTogTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2VDb21wb25lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdHJhY2VDb21wb25lbnRzKHRyYWNlQ29tcG9uZW50czogTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFtdKXtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbXBvbmVudHMgPSB0cmFjZUNvbXBvbmVudHM7XHJcbiAgICAgICAgbGV0IHVzZXJDb21wb25lbnRJZHMgPSB0aGlzLl90cmFjZUNvbXBvbmVudHMubWFwKGNvbXBvbmVudCA9PiBjb21wb25lbnQubWFwcENvY2twaXRDb21wb25lbnQuYnJvd3NlTmFtZSk7XHJcbiAgICAgICAgdGhpcy5vblRyYWNlQ29tcG9uZW50SWRzVXBkYXRlZCh1c2VyQ29tcG9uZW50SWRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRyYWNlYWJsZSBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge1Byb3BlcnR5PEFycmF5PFRyYWNlRGF0YVBvaW50Pj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgYXZhaWxhYmxlRGF0YVBvaW50cygpIDogUHJvcGVydHk8QXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHM7XHJcbiAgICB9XHJcbiAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBhbmQgY29ubmVjdHMgdGhlIHRhcmdldCB0cmFjZSBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0aWFsaXplVHJhY2VDb21wb25lbnRzKCkgIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSBhd2FpdCB0aGlzLmdldFRyYWNlQ29tcG9uZW50cygpO1xyXG4gICAgICAgIGxldCB0cmFjZUNvbXBvbmVudHMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdHJhY2VDb21wb25lbnQgPSBuZXcgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIsIGNvbXBvbmVudHNbaV0pO1xyXG4gICAgICAgICAgICB0cmFjZUNvbXBvbmVudC5hdmFpbGFibGVUcmFjZURhdGFQb2ludHMgPSB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHM7XHJcbiAgICAgICAgICAgIHRyYWNlQ29tcG9uZW50cy5wdXNoKHRyYWNlQ29tcG9uZW50KTtcclxuICAgICAgICB9O1xyXG4gICAgICBcclxuICAgICAgICByZXR1cm4gdHJhY2VDb21wb25lbnRzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgdHJhY2UgY29tcG9uZW50cyBmcm9tIGFsbCBhdmFpbGFibGUgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0VHJhY2VDb21wb25lbnRzKCk6IFByb21pc2U8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiB7XHJcbiAgICAgICAgbGV0IHRyYWNlQ29tcG9uZW50cyA9IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5tb2RlbC5jb21wb25lbnRzLmZpbHRlcihjb21wb25lbnQgPT4ge3JldHVybiBjb21wb25lbnQuYnJvd3NlTmFtZSA9PSBcIk5ld1RyYWNlQ29uZmlnXCJ9KTtcclxuICAgICAgICBpZih0cmFjZUNvbXBvbmVudHMubGVuZ3RoID09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBTZXQgRGlzcGxheW5hbWUgb2YgdHJhY2UgY29tcG9uZW50IFwiTmV3VHJhY2VDb25maWdcIiB0byBcIlRyYWNlXCJcclxuICAgICAgICAgICAgdHJhY2VDb21wb25lbnRzWzBdLmRpc3BsYXlOYW1lID0gXCJUcmFjZVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJhY2VDb21wb25lbnRzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgYXZhaWxhYmxlIHRyYWNlIGRhdGFwb2ludHMgZnJvbSBhbGwgY29tcG9uZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZWFkQWxsVHJhY2VEYXRhUG9pbnRzKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBhbGxBdmFpbGFibGVUcmFjZURhdGFQb2ludHMgPSBuZXcgQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPigpO1xyXG4gICAgICAgIC8vIGdldCB0aGUgdHJhY2VhYmxlIGNvbXBvbmVudHNcclxuICAgICAgICBsZXQgdHJhY2VhYmxlQ29tcG9uZW50czogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+ID0gYXdhaXQgdGhpcy5yZWFkVHJhY2VQcm92aWRlckNvbXBvbmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gY29sbGVjdCB0aGUgY29tcG9uZW50cyBkYXRhIHBvaW50cyBpbnRvIG9uZSBmbGF0IGFycmF5XHJcbiAgICAgICAgdHJhY2VhYmxlQ29tcG9uZW50cy5mb3JFYWNoKCh0cmFjZWFibGVDb21wb25lbnRjb21wb25lbnQpPT57XHJcbiAgICAgICAgICAgIGxldCBjb21wb25ldFRyYWNlUG9pbnRzID0gdGhpcy5yZWFkQ29tcG9uZW50VHJhY2VEYXRhUG9pbnRzKHRyYWNlYWJsZUNvbXBvbmVudGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGFsbEF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyA9IGFsbEF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cy5jb25jYXQoY29tcG9uZXRUcmFjZVBvaW50cyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgYXZhaWxhYmxlIHRyYWNlIHBvaW50cyBsaW5rLlxyXG4gICAgICAgIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cy52YWx1ZSA9IGFsbEF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cztcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVBdmFpbGFibGVEYXRhUG9pbnRzKGFsbEF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyk7XHJcblxyXG4gICAgICAgIHJldHVybiBhbGxBdmFpbGFibGVUcmFjZURhdGFQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBhdmFpbGFibGUgZGF0YSBwb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUcmFjZURhdGFQb2ludEluZm9bXX0gYWxsQXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlQXZhaWxhYmxlRGF0YVBvaW50cyhhbGxBdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IFRyYWNlRGF0YVBvaW50SW5mb1tdKSB7XHJcbiAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBtZXRob2Qgc3R1YiB0byBtYWtlIHRoZSBwYXNzZWQgZGF0YSBiaW5kYWJsZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29sbGVjdHMgY29tcG9uZW50cyBzdXBwb3J0aW5nIHRyYWNlYWJpbGl0eSBhbmQgZXhwb3NpbmcgdHJhY2Vwb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyByZWFkVHJhY2VQcm92aWRlckNvbXBvbmVudHMoKTogUHJvbWlzZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+IHtcclxuICAgICAgICBsZXQgdHJhY2VDb21wb25lbnRzID0gbmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50PigpO1xyXG4gICAgICAgIC8vbGV0IGFsbENvbXBvbmVudHMgPSB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIubW9kZWwuY29tcG9uZW50cztcclxuICAgICAgICBsZXQgYWxsQ29tcG9uZW50cyA9IGF3YWl0IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5jb21wb25lbnRQcm92aWRlci5icm93c2VDb21wb25lbnRzKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsQ29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBhbGxDb21wb25lbnRzW2ldO1xyXG4gICAgICAgICAgICBhd2FpdCBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5nZXRJbnN0YW5jZSgpLnJlYWRDb21wb25lbnRNZXRhSW5mbyhjb21wb25lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJhY2VDb21wb25lbnRzID0gYWxsQ29tcG9uZW50cy5maWx0ZXIoKGNvbXBvbmVudCk9PntyZXR1cm4gKDxhbnk+Y29tcG9uZW50KS5tZXRhRGF0YSAmJiAoPGFueT5jb21wb25lbnQpLm1ldGFEYXRhLk1ldGFDb25maWdEYXRhcG9pbnRzIH0pO1xyXG4gICAgICAgIHJldHVybiB0cmFjZUNvbXBvbmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgdHJhY2UgZGF0YSBwb2ludHMgZnJvbSBhIHNpbmdsZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gdHJhY2VhYmxlQ29tcG9uZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZENvbXBvbmVudFRyYWNlRGF0YVBvaW50cyh0cmFjZWFibGVDb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KTogQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHRyYWNlRGF0YVBvaW50czogQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPiA9IFtdO1xyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHRyYWNlTWV0YUluZm8gPSAoPGFueT50cmFjZWFibGVDb21wb25lbnQubWV0YURhdGEpLk1ldGFDb25maWdEYXRhcG9pbnRzLkRhdGFQb2ludHNEZWZpbml0aW9uO1xyXG5cclxuICAgICAgICB0cmFjZU1ldGFJbmZvLk5hbWVzcGFjZXMuZm9yRWFjaCgobmFtZXNwYWNlKT0+e1xyXG4gICAgICAgICAgICBuYW1lc3BhY2UuRGF0YS5EYXRhUG9pbnRzLmZvckVhY2goKGRhdGFQb2ludFJlZik9PntcclxuICAgICAgICAgICAgICAgIHRyYWNlRGF0YVBvaW50cy5wdXNoKFRyYWNlRGF0YVBvaW50SW5mby5jcmVhdGUodHJhY2VhYmxlQ29tcG9uZW50LmJyb3dzZU5hbWUsdHJhY2VNZXRhSW5mby5EZXZpY2VBZGRyZXNzLG5hbWVzcGFjZSxkYXRhUG9pbnRSZWYpKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gdHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyIH07Il19