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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "../common/domHelper", "./watchablesGridToolbar", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "./watchableValueBuffer", "./componentDefaultDefinition"], function (require, exports, domHelper_1, watchablesGridToolbar_1, treeGridWidgetBase_1, mappCockpitComponent_1, watchableValueBuffer_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // defines the base id for the watchable value template
    var WATCHABLE_VALUE_ID = "watchableValue_";
    var WATCHABLE_TREND_ID = "watchableTrend_";
    /**
     * implements the widget for displaying the watchables and their values with fast update. It includes displaying a short value trend.
     *
     * @class WatchablesWidget
     * @extends {TreeGridWidgetBase}
     */
    var WatchablesWidget = /** @class */ (function (_super) {
        __extends(WatchablesWidget, _super);
        function WatchablesWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // holds a list of parameters to watch
            _this._watchableParameters = [];
            // holds a list of watchable parameters that use an icon to show its state
            _this._watchableStateParameters = [];
            // holds a trend buffer for every parameter
            _this._watchableTrendValues = {};
            // specifies the time span of the trend.
            _this._trendTimeSpan = 60000;
            // specifies the period for sampling the parameter values (msecs)
            _this._trendSamplingInterval = 100;
            // specifies the ui refresh rate (msecs)
            _this._trendRefreshingInterval = 500;
            // holds the timer id for the sample timer
            _this._watchableSampleTimerId = undefined;
            // holds the timer id for the trend timer
            _this._watchablTrendTimerId = -1;
            _this._watchableIconUpdateHandler = function (sender, args) { return _this.onWatchableIconUpdated(sender, args); };
            _this._watchableParamsLoaded = false;
            _this._watchableStateParamsLoaded = false;
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        WatchablesWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Watch");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 100);
        };
        WatchablesWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Are the watchables and watchable state infos already available(via binding)
         *
         * @private
         * @returns {boolean}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.allBindingsDataAvailable = function () {
            if (this._watchableParamsLoaded == true && this._watchableStateParamsLoaded == true) {
                return true;
            }
            return false;
        };
        /**
         * Called when the watchable parameters have been updated
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onWatchableParametersUpdated = function (watchableParameters) {
            this._watchableParameters = watchableParameters;
            this._watchableParamsLoaded = true;
            if (this.allBindingsDataAvailable()) {
                this.onComponentParametersUpdated();
            }
        };
        /**
         * Called when the watchable state parameters have been updated
         *
         * @private
         * @param {MappCockpitStateParameter[]} watchableStateParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onWatchableStateParametersUpdated = function (watchableStateParameters) {
            this._watchableStateParameters = watchableStateParameters;
            this._watchableStateParamsLoaded = true;
            this.addTreeGridIcons();
            if (this.allBindingsDataAvailable()) {
                this.onComponentParametersUpdated();
            }
        };
        /**
         * Loads the styles for the watchables widget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            _super.prototype.addStyle.call(this, "widgets/watchablesWidget/style/css/toolbarIcons.css");
        };
        /**
         * The component parameters have been updated
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onComponentParametersUpdated = function () {
            // create trend buffers for the parameters
            this.createWatchableTrendBuffers(this._watchableParameters);
            // start watchable trend timer
            this.startWatchablesTrend();
            // populate the watchables widget
            this.populateWatchablesWidget();
            // update treegrid's toolbar Icons
            this.updateToolbarIcons();
            // after populating the watchables we start observing value changes of the watchables
            this.observeWatchables(this._watchableParameters);
        };
        /**
         * Start
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startWatchablesTrend = function () {
            this.startSamplingWatchables();
            this.startRefreshingWatchablesTrend();
        };
        /**
         * Starts sampling the watchables
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startSamplingWatchables = function () {
            var _this = this;
            // stop an eventually running timer before starting a new one
            this.stopSamplingTimer();
            this._watchableSampleTimerId = setInterval(function () {
                _this.sampleWatchables(_this._watchableParameters);
            }, this._trendSamplingInterval, this._watchableSampleTimerId);
        };
        /**
         * Stops the sampling timer
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.stopSamplingTimer = function () {
            if (this._watchableSampleTimerId) {
                clearInterval(this._watchableSampleTimerId);
            }
        };
        /**
         * Starts refreshing the watchables trend
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startRefreshingWatchablesTrend = function () {
            var _this = this;
            // stop an eventually running timer before starting a new one
            this.stopTrendTimer();
            this._watchablTrendTimerId = setInterval(function () {
                _this.refreshWatchablesTrend(_this._watchableParameters);
            }, this._trendRefreshingInterval);
        };
        /**
         * Stops the trend timer
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.stopTrendTimer = function () {
            if (this._watchablTrendTimerId) {
                clearInterval(this._watchablTrendTimerId);
            }
        };
        /**
         * Creates a trend buffer for every watchable parameter
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createWatchableTrendBuffers = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                _this._watchableTrendValues[watchableParameter.browseName] = watchableValueBuffer_1.WatchableValueTrendBuffer.create(_this._trendTimeSpan / _this._trendSamplingInterval);
            });
        };
        /** resizes the watchables widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            // Refresh watchable values after resize (treegrid sets the data to "0" after resize)
            this.refreshWatchablesValues(this._watchableParameters);
        };
        /** creates the tree grid for the watchables informations
         *
         * @protected
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), { dataSource: undefined, cssClass: 'watchablesWidget', allowSelection: false, isResponsive: false, editSettings: {
                    allowEditing: false,
                    allowAdding: false,
                    allowDeleting: false,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                }, create: function (args) { return _this.treeGridCreated(); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Name", isPrimaryKey: true, width: "200" },
                    { field: "displayValue", headerText: "Value", width: "200", isTemplateColumn: true, template: "<div style='padding-left: 20px' id='" + this.mainDivId + WATCHABLE_VALUE_ID + "{{:uiId}}'>0</div>" },
                    { field: "engineeringUnit", headerText: "Unit", width: "100" },
                    { field: "watchableTrend", headerText: "Trend", isTemplateColumn: true, template: "<div id='" + this.mainDivId + WATCHABLE_TREND_ID + "{{:uiId}}'></div>" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.columnResized(args); },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @protected
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new watchablesGridToolbar_1.WatchablesGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        WatchablesWidget.prototype.columnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            // Refresh watchable values after resize (treegrid sets the data to "0" after resize)
            this.refreshWatchablesValues(this._watchableParameters);
        };
        /**
         * Add icons to the toolbar treegrid
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.addTreeGridIcons = function () {
            var _this = this;
            this._watchableStateParameters.forEach(function (stateParameter) {
                _this._toolbar.addIcon(stateParameter);
            });
        };
        /**
         * Disable button properties from icons
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.updateToolbarIcons = function () {
            var toolbar = this._toolbar;
            toolbar.hideIcon('empty');
            toolbar.disableIcons();
            toolbar.addEventListeners();
            toolbar.tooltipExtension();
        };
        /**
         *
         * marks the parameters with an id as a reference to the ui
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.setWatchablesUiId = function (watchableParameters) {
            for (var i = 0; i < watchableParameters.length; i++) {
                var watchableParameter = watchableParameters[i];
                watchableParameter.uiId = i;
            }
        };
        /**
         * Populate the widget with its specific data content.
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.populateWatchablesWidget = function () {
            this.setWatchablesUiId(this._watchableParameters);
            $(this.mainDiv).ejTreeGrid({
                dataSource: this._watchableParameters,
                toolbarSettings: {
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
            });
        };
        /**
         * Samples the watchable values
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.sampleWatchables = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                // update the trend buffer
                _this.addWatchableTrendValue(watchableParameter);
            });
        };
        /**
         * Refreshes the watchables trend fields
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchablesTrend = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                var watchableTrendElement = _this.getWatchableTrendElement(watchableParameter);
                if (watchableTrendElement && domHelper_1.DomHelper.isElementInViewport(watchableTrendElement)) {
                    var watchableTrendFieldId = "#" + watchableTrendElement.id;
                    // update the trend field
                    _this.refreshWatchableTrendField(watchableParameter, watchableTrendFieldId);
                }
            });
        };
        /**
         * refreshes the content of the watchable value fields
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchablesValues = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) { _this.refreshWatchableValueField(watchableParameter); });
        };
        /**
         * Gets an element corresponding to the parameter to be used for displaying the watchable value
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @returns
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableValueElement = function (watchableParameter) {
            var mySubDiv = this.mainDiv.querySelector("#" + this.mainDivId + WATCHABLE_VALUE_ID + watchableParameter.uiId);
            return mySubDiv;
        };
        /**
         * Gets an element corresponding to the parameter to be used for displaying the watchable trend line
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @returns {(HTMLElement | null)}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableTrendElement = function (watchableParameter) {
            var mySubDiv = this.mainDiv.querySelector("#" + this.mainDivId + WATCHABLE_TREND_ID + watchableParameter.uiId);
            return mySubDiv;
        };
        /**
         * updates a watchable field with the current values of the corresponding parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchableValueField = function (watchableParameter) {
            // get the corresponding ui element
            var watchableValueElement = this.getWatchableValueElement(watchableParameter);
            // let minValue = this._watchableTrendValues[watchableParameter.browseName]._minValue;
            // let maxValue = this._watchableTrendValues[watchableParameter.browseName]._maxValue;
            // let valueString: string = watchableParameter.displayValue.toString() + "(" + minValue + "-" + maxValue + ")";
            var valueString = watchableParameter.displayValue.toString();
            if (watchableValueElement) {
                watchableValueElement.innerHTML = valueString;
            }
        };
        /**
         * refreshes the visible trend filed content
         *
         * @param {MappCockpitComponentParameter} watchableParameter
         * @param {string} watchableTrendFieldId
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchableTrendField = function (watchableParameter, watchableTrendFieldId) {
            var watchableTrendData = this.getWatchableTrendValues(watchableParameter);
            this.renderWatchableTrend(watchableTrendFieldId, watchableTrendData);
        };
        /**
         * gets the trend values for the watchable parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @returns {Array<any>}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableTrendValues = function (watchableParameter) {
            var trendValues = [];
            if (this._watchableTrendValues[watchableParameter.browseName]) {
                trendValues = this._watchableTrendValues[watchableParameter.browseName].values;
            }
            return trendValues;
        };
        /**
         * renders a short history of trends
         *
         * @private
         * @param {string} watchableTrendFieldId
         * @param {number[]} watchableTrendData
         * @returns
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.renderWatchableTrend = function (watchableTrendFieldId, watchableTrendData) {
            // get the trend cell
            var $trendCell = $(watchableTrendFieldId);
            var $sparkInstance = $(watchableTrendFieldId + "_sparkline_svg");
            // create a new sparkline instance if not already existing
            if ($sparkInstance.length === 0) {
                this.createWatchableTrendView($trendCell, watchableTrendData);
            }
            else {
                // update the trendline with new data
                this.updateWatchableTrendView($trendCell, watchableTrendData);
            }
        };
        /**
         * updates the trend view with new data
         *
         * @private
         * @param {JQuery<HTMLElement>} $trendCell
         * @param {number[]} watchableTrendData
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.updateWatchableTrendView = function ($trendCell, watchableTrendData) {
            $trendCell.ejSparkline({
                dataSource: watchableTrendData,
            });
        };
        /**
         *
         * creates a new instance of a watchable trend view
         * @private
         * @param {JQuery<HTMLElement>} jqtrendCell
         * @param {number[]} watchableTrendData
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createWatchableTrendView = function ($trendCell, watchableTrendData) {
            $trendCell.ejSparkline({
                dataSource: watchableTrendData,
                width: 2,
                stroke: "#C4C4C4",
                type: "line",
                size: { height: 28, width: $trendCell.width() },
                isResponsive: false,
                padding: 2,
            });
        };
        /**
         * Observes the watchables for changes
         *
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.observeWatchables = function (watchableParameters) {
            // invoke observing the watchables first ....
            mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, watchableParameters);
            // and then observe watchables inside each watchable state expression
            this.observeWatchablesInStateExpression(watchableParameters);
        };
        /**
         * called after changes of observables
         *
         * @param {Observable[]} changedObservables
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onObservablesChanged = function (changedObservables) {
            var _this = this;
            console.log("onObservablesChanged: %o %o", this, changedObservables);
            changedObservables.forEach(function (observable) {
                if (observable.property === "Value") {
                    var watchableParameter = observable.object;
                    _this.onWatchableValueChanged(watchableParameter);
                }
            });
        };
        /**
         * Send watchables to state expression to be observed
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.observeWatchablesInStateExpression = function (watchableParameters) {
            var _this = this;
            this._watchableStateParameters.forEach(function (state) {
                var observedWatchables = watchableParameters.filter(function (watchable) { return state.stateExpression.watchableMapping.has(watchable.browseName); });
                state.stateExpression.observeWatchables(observedWatchables);
                //attach event listener
                state.stateExpression.eventIconUpdated.attach(_this._watchableIconUpdateHandler);
            });
        };
        /**
         * Handles the value change of a watchable parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onWatchableValueChanged = function (watchableParameter) {
            // refresh the value field.
            this.refreshWatchableValueField(watchableParameter);
        };
        /**
         * Called when watchable icon is updated
         *
         * @private
         * @param {*} sender
         * @param {{name: string, watchableIcon: WatchableIcon}} args
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onWatchableIconUpdated = function (sender, args) {
            this._toolbar.updateIcon(args.name, args.watchableIcon);
        };
        /**
         * Adds a new value to the parameters trend buffer
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.addWatchableTrendValue = function (watchableParameter) {
            // filter numbers and boolean values to be recorded
            if (typeof watchableParameter.value === "number" || typeof watchableParameter.value === "boolean") {
                this._watchableTrendValues[watchableParameter.browseName].push(watchableParameter.value);
            }
        };
        /**
         * activates WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.activate = function () {
            console.log("WatchablesWidget activated");
            mappCockpitComponent_1.MappCockpitComponentParameter.activateComponentModelItems(this, this._watchableParameters);
        };
        /**
         * deactivates WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.deactivate = function () {
            console.log("WatchablesWidget deactivated");
            mappCockpitComponent_1.MappCockpitComponentParameter.deactivateComponentModelItems(this, this._watchableParameters);
        };
        /**
         * disposes WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.dispose = function () {
            var _this = this;
            var _a;
            this.stopSamplingTimer();
            this.stopTrendTimer();
            mappCockpitComponent_1.MappCockpitComponentParameter.unobserveAll(this, (_a = this._watchableParameters[0]) === null || _a === void 0 ? void 0 : _a.component);
            // detach event listeners
            this._watchableStateParameters.forEach(function (state) {
                state.stateExpression.eventIconUpdated.detach(_this._watchableIconUpdateHandler);
            });
            _super.prototype.dispose.call(this);
        };
        return WatchablesWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.WatchablesWidget = WatchablesWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlc1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy93YXRjaGFibGVzV2lkZ2V0L3dhdGNoYWJsZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBYUEsdURBQXVEO0lBQ3ZELElBQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7SUFDN0MsSUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztJQUM3Qzs7Ozs7T0FLRztJQUNIO1FBQStCLG9DQUFrQjtRQUFqRDtZQUFBLHFFQTBvQkM7WUF6b0JHLHNDQUFzQztZQUM5QiwwQkFBb0IsR0FBb0MsRUFBRSxDQUFDO1lBQ25FLDBFQUEwRTtZQUNsRSwrQkFBeUIsR0FBZ0MsRUFBRSxDQUFDO1lBQ3BFLDJDQUEyQztZQUNuQywyQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDbkMsd0NBQXdDO1lBQ2hDLG9CQUFjLEdBQVcsS0FBSyxDQUFDO1lBQ3ZDLGlFQUFpRTtZQUN6RCw0QkFBc0IsR0FBVSxHQUFHLENBQUM7WUFDNUMsd0NBQXdDO1lBQ2hDLDhCQUF3QixHQUFVLEdBQUcsQ0FBQztZQUM5QywwQ0FBMEM7WUFDbEMsNkJBQXVCLEdBQXFCLFNBQVMsQ0FBQztZQUM5RCx5Q0FBeUM7WUFDakMsMkJBQXFCLEdBQXFCLENBQUMsQ0FBQyxDQUFDO1lBRTdDLGlDQUEyQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXhDLENBQXdDLENBQUM7WUFFdEYsNEJBQXNCLEdBQUcsS0FBSyxDQUFDO1lBQy9CLGlDQUEyQixHQUFHLEtBQUssQ0FBQzs7UUFxbkJoRCxDQUFDO1FBbm5CRzs7Ozs7V0FLRztRQUNILDZDQUFrQixHQUFsQjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FB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QyxNQUFNLENBQUMsS0FBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDcEYsQ0FBQyxDQUFDLENBQUE7WUFDRixpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBMW9CRCxDQUErQix1Q0FBa0IsR0Ewb0JoRDtJQUVRLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9saWJzL3VpL1R5cGVzL2VqLndlYi5hbGwuZC50c1wiIC8+XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuLi9jb21tb24vZG9tSGVscGVyXCI7XHJcbmltcG9ydCB7IElXYXRjaGFibGVzV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy93YXRjaGFibGVzV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElVaUJpbmRpbmcgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFdhdGNoYWJsZXNHcmlkVG9vbGJhciB9IGZyb20gXCIuL3dhdGNoYWJsZXNHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5cclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyIH0gZnJvbSBcIi4vd2F0Y2hhYmxlVmFsdWVCdWZmZXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFdhdGNoYWJsZUljb24gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zdGF0ZUV4cHJlc3Npb24vd2F0Y2hhYmxlSWNvblwiO1xyXG5cclxuLy8gZGVmaW5lcyB0aGUgYmFzZSBpZCBmb3IgdGhlIHdhdGNoYWJsZSB2YWx1ZSB0ZW1wbGF0ZVxyXG5jb25zdCBXQVRDSEFCTEVfVkFMVUVfSUQgPSBcIndhdGNoYWJsZVZhbHVlX1wiO1xyXG5jb25zdCBXQVRDSEFCTEVfVFJFTkRfSUQgPSBcIndhdGNoYWJsZVRyZW5kX1wiO1xyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgd2lkZ2V0IGZvciBkaXNwbGF5aW5nIHRoZSB3YXRjaGFibGVzIGFuZCB0aGVpciB2YWx1ZXMgd2l0aCBmYXN0IHVwZGF0ZS4gSXQgaW5jbHVkZXMgZGlzcGxheWluZyBhIHNob3J0IHZhbHVlIHRyZW5kLlxyXG4gKlxyXG4gKiBAY2xhc3MgV2F0Y2hhYmxlc1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7VHJlZUdyaWRXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgV2F0Y2hhYmxlc1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElXYXRjaGFibGVzV2lkZ2V0IHtcclxuICAgIC8vIGhvbGRzIGEgbGlzdCBvZiBwYXJhbWV0ZXJzIHRvIHdhdGNoXHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gW107XHJcbiAgICAvLyBob2xkcyBhIGxpc3Qgb2Ygd2F0Y2hhYmxlIHBhcmFtZXRlcnMgdGhhdCB1c2UgYW4gaWNvbiB0byBzaG93IGl0cyBzdGF0ZVxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW10gPSBbXTtcclxuICAgIC8vIGhvbGRzIGEgdHJlbmQgYnVmZmVyIGZvciBldmVyeSBwYXJhbWV0ZXJcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVRyZW5kVmFsdWVzID0ge307XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHRpbWUgc3BhbiBvZiB0aGUgdHJlbmQuXHJcbiAgICBwcml2YXRlIF90cmVuZFRpbWVTcGFuOiBudW1iZXIgPSA2MDAwMDtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgcGVyaW9kIGZvciBzYW1wbGluZyB0aGUgcGFyYW1ldGVyIHZhbHVlcyAobXNlY3MpXHJcbiAgICBwcml2YXRlIF90cmVuZFNhbXBsaW5nSW50ZXJ2YWw6bnVtYmVyID0gMTAwO1xyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSB1aSByZWZyZXNoIHJhdGUgKG1zZWNzKVxyXG4gICAgcHJpdmF0ZSBfdHJlbmRSZWZyZXNoaW5nSW50ZXJ2YWw6bnVtYmVyID0gNTAwO1xyXG4gICAgLy8gaG9sZHMgdGhlIHRpbWVyIGlkIGZvciB0aGUgc2FtcGxlIHRpbWVyXHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVTYW1wbGVUaW1lcklkOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgLy8gaG9sZHMgdGhlIHRpbWVyIGlkIGZvciB0aGUgdHJlbmQgdGltZXJcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsVHJlbmRUaW1lcklkOiBudW1iZXJ8dW5kZWZpbmVkID0gLTE7XHJcblxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlSWNvblVwZGF0ZUhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uV2F0Y2hhYmxlSWNvblVwZGF0ZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVBhcmFtc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlU3RhdGVQYXJhbXNMb2FkZWQgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBoZWlnaHQgb2YgdGhlIGhlYWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWZpbmVIZWFkZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudChcIldhdGNoXCIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDMsIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXJlIHRoZSB3YXRjaGFibGVzIGFuZCB3YXRjaGFibGUgc3RhdGUgaW5mb3MgYWxyZWFkeSBhdmFpbGFibGUodmlhIGJpbmRpbmcpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgIHByaXZhdGUgYWxsQmluZGluZ3NEYXRhQXZhaWxhYmxlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYodGhpcy5fd2F0Y2hhYmxlUGFyYW1zTG9hZGVkID09IHRydWUgJiYgdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbXNMb2FkZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgd2F0Y2hhYmxlIHBhcmFtZXRlcnMgaGF2ZSBiZWVuIHVwZGF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uV2F0Y2hhYmxlUGFyYW1ldGVyc1VwZGF0ZWQod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMgPSB3YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtc0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFsbEJpbmRpbmdzRGF0YUF2YWlsYWJsZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSB3YXRjaGFibGUgc3RhdGUgcGFyYW1ldGVycyBoYXZlIGJlZW4gdXBkYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uV2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzVXBkYXRlZCh3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyA9IHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVycztcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hZGRUcmVlR3JpZEljb25zKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5hbGxCaW5kaW5nc0RhdGFBdmFpbGFibGUoKSl7XHJcbiAgICAgICAgICAgIHRoaXMub25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSB3YXRjaGFibGVzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgICBsb2FkU3R5bGVzKCkge1xyXG4gICAgICAgIHN1cGVyLmxvYWRTdHlsZXMoKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvd2F0Y2hhYmxlc1dpZGdldC9zdHlsZS9jc3MvdG9vbGJhckljb25zLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb21wb25lbnQgcGFyYW1ldGVycyBoYXZlIGJlZW4gdXBkYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZCgpIHtcclxuICAgICAgICAvLyBjcmVhdGUgdHJlbmQgYnVmZmVycyBmb3IgdGhlIHBhcmFtZXRlcnNcclxuICAgICAgICB0aGlzLmNyZWF0ZVdhdGNoYWJsZVRyZW5kQnVmZmVycyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICAvLyBzdGFydCB3YXRjaGFibGUgdHJlbmQgdGltZXJcclxuICAgICAgICB0aGlzLnN0YXJ0V2F0Y2hhYmxlc1RyZW5kKCk7XHJcbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIHdhdGNoYWJsZXMgd2lkZ2V0XHJcbiAgICAgICAgdGhpcy5wb3B1bGF0ZVdhdGNoYWJsZXNXaWRnZXQoKTtcclxuICAgICAgICAvLyB1cGRhdGUgdHJlZWdyaWQncyB0b29sYmFyIEljb25zXHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFySWNvbnMoKTtcclxuICAgICAgICAvLyBhZnRlciBwb3B1bGF0aW5nIHRoZSB3YXRjaGFibGVzIHdlIHN0YXJ0IG9ic2VydmluZyB2YWx1ZSBjaGFuZ2VzIG9mIHRoZSB3YXRjaGFibGVzXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlV2F0Y2hhYmxlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRXYXRjaGFibGVzVHJlbmQoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydFNhbXBsaW5nV2F0Y2hhYmxlcygpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRSZWZyZXNoaW5nV2F0Y2hhYmxlc1RyZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgc2FtcGxpbmcgdGhlIHdhdGNoYWJsZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydFNhbXBsaW5nV2F0Y2hhYmxlcygpIHsgICAgICAgIFxyXG4gICAgICAgIC8vIHN0b3AgYW4gZXZlbnR1YWxseSBydW5uaW5nIHRpbWVyIGJlZm9yZSBzdGFydGluZyBhIG5ldyBvbmVcclxuICAgICAgICB0aGlzLnN0b3BTYW1wbGluZ1RpbWVyKCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl93YXRjaGFibGVTYW1wbGVUaW1lcklkID0gIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVXYXRjaGFibGVzKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH0sIHRoaXMuX3RyZW5kU2FtcGxpbmdJbnRlcnZhbCx0aGlzLl93YXRjaGFibGVTYW1wbGVUaW1lcklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIHRoZSBzYW1wbGluZyB0aW1lclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0b3BTYW1wbGluZ1RpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl93YXRjaGFibGVTYW1wbGVUaW1lcklkKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIHJlZnJlc2hpbmcgdGhlIHdhdGNoYWJsZXMgdHJlbmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydFJlZnJlc2hpbmdXYXRjaGFibGVzVHJlbmQoKSB7XHJcblxyXG4gICAgICAgIC8vIHN0b3AgYW4gZXZlbnR1YWxseSBydW5uaW5nIHRpbWVyIGJlZm9yZSBzdGFydGluZyBhIG5ldyBvbmVcclxuICAgICAgICB0aGlzLnN0b3BUcmVuZFRpbWVyKCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl93YXRjaGFibFRyZW5kVGltZXJJZCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoV2F0Y2hhYmxlc1RyZW5kKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH0sIHRoaXMuX3RyZW5kUmVmcmVzaGluZ0ludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIHRoZSB0cmVuZCB0aW1lclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0b3BUcmVuZFRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl93YXRjaGFibFRyZW5kVGltZXJJZCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3dhdGNoYWJsVHJlbmRUaW1lcklkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgdHJlbmQgYnVmZmVyIGZvciBldmVyeSB3YXRjaGFibGUgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlV2F0Y2hhYmxlVHJlbmRCdWZmZXJzKHdhdGNoYWJsZVBhcmFtZXRlcnM6TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIHdhdGNoYWJsZVBhcmFtZXRlcnMuZm9yRWFjaCgod2F0Y2hhYmxlUGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXSA9IFdhdGNoYWJsZVZhbHVlVHJlbmRCdWZmZXIuY3JlYXRlPGFueT4odGhpcy5fdHJlbmRUaW1lU3Bhbi90aGlzLl90cmVuZFNhbXBsaW5nSW50ZXJ2YWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZXNpemVzIHRoZSB3YXRjaGFibGVzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBSZWZyZXNoIHdhdGNoYWJsZSB2YWx1ZXMgYWZ0ZXIgcmVzaXplICh0cmVlZ3JpZCBzZXRzIHRoZSBkYXRhIHRvIFwiMFwiIGFmdGVyIHJlc2l6ZSlcclxuICAgICAgICB0aGlzLnJlZnJlc2hXYXRjaGFibGVzVmFsdWVzKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSB3YXRjaGFibGVzIGluZm9ybWF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3dhdGNoYWJsZXNXaWRnZXQnLFxyXG4gICAgICAgICAgICBhbGxvd1NlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dFZGl0aW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFsbG93QWRkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFsbG93RGVsZXRpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dEZWxldGVDb25maXJtRGlhbG9nICA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1EaWFsb2cgIDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgaXNQcmltYXJ5S2V5OiB0cnVlLCB3aWR0aDogXCIyMDBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5VmFsdWVcIiwgaGVhZGVyVGV4dDogXCJWYWx1ZVwiLCB3aWR0aDogXCIyMDBcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0ncGFkZGluZy1sZWZ0OiAyMHB4JyBpZD0nXCIgKyB0aGlzLm1haW5EaXZJZCArIFdBVENIQUJMRV9WQUxVRV9JRCArIFwie3s6dWlJZH19Jz4wPC9kaXY+XCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZW5naW5lZXJpbmdVbml0XCIsIGhlYWRlclRleHQ6IFwiVW5pdFwiLCB3aWR0aDogXCIxMDBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJ3YXRjaGFibGVUcmVuZFwiLCBoZWFkZXJUZXh0OiBcIlRyZW5kXCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlOiBcIjxkaXYgaWQ9J1wiICsgdGhpcy5tYWluRGl2SWQgKyBXQVRDSEFCTEVfVFJFTkRfSUQgKyBcInt7OnVpSWR9fSc+PC9kaXY+XCIgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiB0aGlzLmNvbHVtblJlc2l6ZWQoYXJncyksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge317XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBXYXRjaGFibGVzR3JpZFRvb2xiYXIodGhpcy5tYWluRGl2KTtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29sdW1uUmVzaXplZChhcmdzKXtcclxuICAgICAgICBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpO1xyXG4gICAgICAgIC8vIFJlZnJlc2ggd2F0Y2hhYmxlIHZhbHVlcyBhZnRlciByZXNpemUgKHRyZWVncmlkIHNldHMgdGhlIGRhdGEgdG8gXCIwXCIgYWZ0ZXIgcmVzaXplKVxyXG4gICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZXNWYWx1ZXModGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGljb25zIHRvIHRoZSB0b29sYmFyIHRyZWVncmlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVHJlZUdyaWRJY29ucygpIHtcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMuZm9yRWFjaCgoc3RhdGVQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgKHRoaXMuX3Rvb2xiYXIgYXMgV2F0Y2hhYmxlc0dyaWRUb29sYmFyKS5hZGRJY29uKHN0YXRlUGFyYW1ldGVyKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSBidXR0b24gcHJvcGVydGllcyBmcm9tIGljb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlVG9vbGJhckljb25zKCkge1xyXG4gICAgICAgIGxldCB0b29sYmFyID0gdGhpcy5fdG9vbGJhciBhcyBXYXRjaGFibGVzR3JpZFRvb2xiYXI7XHJcbiAgICAgICAgdG9vbGJhci5oaWRlSWNvbignZW1wdHknKTtcclxuICAgICAgICB0b29sYmFyLmRpc2FibGVJY29ucygpO1xyXG4gICAgICAgIHRvb2xiYXIuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0b29sYmFyLnRvb2x0aXBFeHRlbnNpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBtYXJrcyB0aGUgcGFyYW1ldGVycyB3aXRoIGFuIGlkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSB1aSBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0V2F0Y2hhYmxlc1VpSWQod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2F0Y2hhYmxlUGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3YXRjaGFibGVQYXJhbWV0ZXIgPSB3YXRjaGFibGVQYXJhbWV0ZXJzW2ldO1xyXG4gICAgICAgICAgICAoPElVaUJpbmRpbmc+PGFueT53YXRjaGFibGVQYXJhbWV0ZXIpLnVpSWQgPSBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvcHVsYXRlIHRoZSB3aWRnZXQgd2l0aCBpdHMgc3BlY2lmaWMgZGF0YSBjb250ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHBvcHVsYXRlV2F0Y2hhYmxlc1dpZGdldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFdhdGNoYWJsZXNVaUlkKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhbXBsZXMgdGhlIHdhdGNoYWJsZSB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNhbXBsZVdhdGNoYWJsZXMod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIHdhdGNoYWJsZVBhcmFtZXRlcnMuZm9yRWFjaCgod2F0Y2hhYmxlUGFyYW1ldGVyKT0+e1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHRyZW5kIGJ1ZmZlclxyXG4gICAgICAgICAgICB0aGlzLmFkZFdhdGNoYWJsZVRyZW5kVmFsdWUod2F0Y2hhYmxlUGFyYW1ldGVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2hlcyB0aGUgd2F0Y2hhYmxlcyB0cmVuZCBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hXYXRjaGFibGVzVHJlbmQod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIHdhdGNoYWJsZVBhcmFtZXRlcnMuZm9yRWFjaCgod2F0Y2hhYmxlUGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB3YXRjaGFibGVUcmVuZEVsZW1lbnQgPSB0aGlzLmdldFdhdGNoYWJsZVRyZW5kRWxlbWVudCh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICBpZiAod2F0Y2hhYmxlVHJlbmRFbGVtZW50ICYmIERvbUhlbHBlci5pc0VsZW1lbnRJblZpZXdwb3J0KHdhdGNoYWJsZVRyZW5kRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB3YXRjaGFibGVUcmVuZEZpZWxkSWQgPSBcIiNcIiArIHdhdGNoYWJsZVRyZW5kRWxlbWVudC5pZDtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdHJlbmQgZmllbGRcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZVRyZW5kRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyLHdhdGNoYWJsZVRyZW5kRmllbGRJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgY29udGVudCBvZiB0aGUgd2F0Y2hhYmxlIHZhbHVlIGZpZWxkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaFdhdGNoYWJsZXNWYWx1ZXMod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIHdhdGNoYWJsZVBhcmFtZXRlcnMuZm9yRWFjaCgod2F0Y2hhYmxlUGFyYW1ldGVyKT0+e3RoaXMucmVmcmVzaFdhdGNoYWJsZVZhbHVlRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyKX0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBlbGVtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHBhcmFtZXRlciB0byBiZSB1c2VkIGZvciBkaXNwbGF5aW5nIHRoZSB3YXRjaGFibGUgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRXYXRjaGFibGVWYWx1ZUVsZW1lbnQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IEVsZW1lbnQgfCBudWxsIHtcclxuICAgICAgICB2YXIgbXlTdWJEaXYgPSB0aGlzLm1haW5EaXYucXVlcnlTZWxlY3RvcihcIiNcIiArIHRoaXMubWFpbkRpdklkICsgV0FUQ0hBQkxFX1ZBTFVFX0lEICsgKDxJVWlCaW5kaW5nPjxhbnk+d2F0Y2hhYmxlUGFyYW1ldGVyKS51aUlkKTtcclxuICAgICAgICByZXR1cm4gbXlTdWJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFuIGVsZW1lbnQgY29ycmVzcG9uZGluZyB0byB0aGUgcGFyYW1ldGVyIHRvIGJlIHVzZWQgZm9yIGRpc3BsYXlpbmcgdGhlIHdhdGNoYWJsZSB0cmVuZCBsaW5lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnMgeyhIVE1MRWxlbWVudCB8IG51bGwpfVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRXYXRjaGFibGVUcmVuZEVsZW1lbnQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IEVsZW1lbnQgfCBudWxsIHtcclxuICAgICAgICB2YXIgbXlTdWJEaXYgPSB0aGlzLm1haW5EaXYucXVlcnlTZWxlY3RvcihcIiNcIiArIHRoaXMubWFpbkRpdklkICsgV0FUQ0hBQkxFX1RSRU5EX0lEICsgKDxJVWlCaW5kaW5nPjxhbnk+d2F0Y2hhYmxlUGFyYW1ldGVyKS51aUlkKTtcclxuICAgICAgICByZXR1cm4gbXlTdWJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIGEgd2F0Y2hhYmxlIGZpZWxkIHdpdGggdGhlIGN1cnJlbnQgdmFsdWVzIG9mIHRoZSBjb3JyZXNwb25kaW5nIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaFdhdGNoYWJsZVZhbHVlRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIC8vIGdldCB0aGUgY29ycmVzcG9uZGluZyB1aSBlbGVtZW50XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZVZhbHVlRWxlbWVudCA9ICB0aGlzLmdldFdhdGNoYWJsZVZhbHVlRWxlbWVudCh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICAvLyBsZXQgbWluVmFsdWUgPSB0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0uX21pblZhbHVlO1xyXG4gICAgICAgIC8vIGxldCBtYXhWYWx1ZSA9IHRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXS5fbWF4VmFsdWU7XHJcblxyXG4gICAgICAgIC8vIGxldCB2YWx1ZVN0cmluZzogc3RyaW5nID0gd2F0Y2hhYmxlUGFyYW1ldGVyLmRpc3BsYXlWYWx1ZS50b1N0cmluZygpICsgXCIoXCIgKyBtaW5WYWx1ZSArIFwiLVwiICsgbWF4VmFsdWUgKyBcIilcIjtcclxuICAgICAgICBsZXQgdmFsdWVTdHJpbmc6IHN0cmluZyA9IHdhdGNoYWJsZVBhcmFtZXRlci5kaXNwbGF5VmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAod2F0Y2hhYmxlVmFsdWVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHdhdGNoYWJsZVZhbHVlRWxlbWVudC5pbm5lckhUTUwgPSB2YWx1ZVN0cmluZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIHZpc2libGUgdHJlbmQgZmlsZWQgY29udGVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdhdGNoYWJsZVRyZW5kRmllbGRJZFxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVmcmVzaFdhdGNoYWJsZVRyZW5kRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcix3YXRjaGFibGVUcmVuZEZpZWxkSWQ6c3RyaW5nICk6IGFueSB7XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZVRyZW5kRGF0YSA9IHRoaXMuZ2V0V2F0Y2hhYmxlVHJlbmRWYWx1ZXMod2F0Y2hhYmxlUGFyYW1ldGVyKTtcclxuICAgICAgICB0aGlzLnJlbmRlcldhdGNoYWJsZVRyZW5kKHdhdGNoYWJsZVRyZW5kRmllbGRJZCwgd2F0Y2hhYmxlVHJlbmREYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHRyZW5kIHZhbHVlcyBmb3IgdGhlIHdhdGNoYWJsZSBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0V2F0Y2hhYmxlVHJlbmRWYWx1ZXMod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIGxldCB0cmVuZFZhbHVlcyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0pIHtcclxuICAgICAgICAgICAgdHJlbmRWYWx1ZXMgPSB0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0udmFsdWVzOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJlbmRWYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW5kZXJzIGEgc2hvcnQgaGlzdG9yeSBvZiB0cmVuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdhdGNoYWJsZVRyZW5kRmllbGRJZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gd2F0Y2hhYmxlVHJlbmREYXRhXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW5kZXJXYXRjaGFibGVUcmVuZCh3YXRjaGFibGVUcmVuZEZpZWxkSWQ6IHN0cmluZywgd2F0Y2hhYmxlVHJlbmREYXRhOiBudW1iZXJbXSkge1xyXG4gICAgICAgIC8vIGdldCB0aGUgdHJlbmQgY2VsbFxyXG4gICAgICAgIGxldCAkdHJlbmRDZWxsID0gJCh3YXRjaGFibGVUcmVuZEZpZWxkSWQpO1xyXG4gICAgICAgIGxldCAkc3BhcmtJbnN0YW5jZSA9ICQod2F0Y2hhYmxlVHJlbmRGaWVsZElkICsgXCJfc3BhcmtsaW5lX3N2Z1wiKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHNwYXJrbGluZSBpbnN0YW5jZSBpZiBub3QgYWxyZWFkeSBleGlzdGluZ1xyXG4gICAgICAgIGlmICgkc3BhcmtJbnN0YW5jZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVXYXRjaGFibGVUcmVuZFZpZXcoJHRyZW5kQ2VsbCwgd2F0Y2hhYmxlVHJlbmREYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHRyZW5kbGluZSB3aXRoIG5ldyBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2F0Y2hhYmxlVHJlbmRWaWV3KCR0cmVuZENlbGwsIHdhdGNoYWJsZVRyZW5kRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgdHJlbmQgdmlldyB3aXRoIG5ldyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gJHRyZW5kQ2VsbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gd2F0Y2hhYmxlVHJlbmREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVdhdGNoYWJsZVRyZW5kVmlldygkdHJlbmRDZWxsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCB3YXRjaGFibGVUcmVuZERhdGE6IG51bWJlcltdKSB7XHJcbiAgICAgICAgJHRyZW5kQ2VsbC5lalNwYXJrbGluZSh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHdhdGNoYWJsZVRyZW5kRGF0YSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBjcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgd2F0Y2hhYmxlIHRyZW5kIHZpZXdcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IGpxdHJlbmRDZWxsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB3YXRjaGFibGVUcmVuZERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlV2F0Y2hhYmxlVHJlbmRWaWV3KCR0cmVuZENlbGw6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHdhdGNoYWJsZVRyZW5kRGF0YTogbnVtYmVyW10pIHtcclxuICAgICAgICAkdHJlbmRDZWxsLmVqU3BhcmtsaW5lKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogd2F0Y2hhYmxlVHJlbmREYXRhLFxyXG4gICAgICAgICAgICB3aWR0aDogMixcclxuICAgICAgICAgICAgc3Ryb2tlOiBcIiNDNEM0QzRcIiwgICBcclxuICAgICAgICAgICAgdHlwZTogXCJsaW5lXCIsXHJcbiAgICAgICAgICAgIHNpemU6IHsgaGVpZ2h0OiAyOCwgd2lkdGg6ICR0cmVuZENlbGwud2lkdGgoKSB9LFxyXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAyLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgdGhlIHdhdGNoYWJsZXMgZm9yIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIG9ic2VydmVXYXRjaGFibGVzKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBpbnZva2Ugb2JzZXJ2aW5nIHRoZSB3YXRjaGFibGVzIGZpcnN0IC4uLi5cclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5vYnNlcnZlUGFyYW1ldGVyVmFsdWVDaGFuZ2VzKHRoaXMsd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIC8vIGFuZCB0aGVuIG9ic2VydmUgd2F0Y2hhYmxlcyBpbnNpZGUgZWFjaCB3YXRjaGFibGUgc3RhdGUgZXhwcmVzc2lvblxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZVdhdGNoYWJsZXNJblN0YXRlRXhwcmVzc2lvbih3YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsZWQgYWZ0ZXIgY2hhbmdlcyBvZiBvYnNlcnZhYmxlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JzZXJ2YWJsZVtdfSBjaGFuZ2VkT2JzZXJ2YWJsZXNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbk9ic2VydmFibGVzQ2hhbmdlZChjaGFuZ2VkT2JzZXJ2YWJsZXM6IE9ic2VydmFibGVbXSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25PYnNlcnZhYmxlc0NoYW5nZWQ6ICVvICVvXCIsdGhpcyxjaGFuZ2VkT2JzZXJ2YWJsZXMpO1xyXG4gICAgICAgIGNoYW5nZWRPYnNlcnZhYmxlcy5mb3JFYWNoKChvYnNlcnZhYmxlKT0+e1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2YWJsZS5wcm9wZXJ0eSA9PT0gXCJWYWx1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F0Y2hhYmxlUGFyYW1ldGVyOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyID0gb2JzZXJ2YWJsZS5vYmplY3QgYXMgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uV2F0Y2hhYmxlVmFsdWVDaGFuZ2VkKHdhdGNoYWJsZVBhcmFtZXRlcik7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kIHdhdGNoYWJsZXMgdG8gc3RhdGUgZXhwcmVzc2lvbiB0byBiZSBvYnNlcnZlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZVdhdGNoYWJsZXNJblN0YXRlRXhwcmVzc2lvbih3YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzLmZvckVhY2goKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZlZFdhdGNoYWJsZXMgPSB3YXRjaGFibGVQYXJhbWV0ZXJzLmZpbHRlcigod2F0Y2hhYmxlKSA9PiBzdGF0ZS5zdGF0ZUV4cHJlc3Npb24ud2F0Y2hhYmxlTWFwcGluZy5oYXMod2F0Y2hhYmxlLmJyb3dzZU5hbWUpKTtcclxuICAgICAgICAgICAgc3RhdGUuc3RhdGVFeHByZXNzaW9uLm9ic2VydmVXYXRjaGFibGVzKG9ic2VydmVkV2F0Y2hhYmxlcyk7XHJcbiAgICAgICAgICAgIC8vYXR0YWNoIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgICAgIHN0YXRlLnN0YXRlRXhwcmVzc2lvbi5ldmVudEljb25VcGRhdGVkLmF0dGFjaCh0aGlzLl93YXRjaGFibGVJY29uVXBkYXRlSGFuZGxlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSB2YWx1ZSBjaGFuZ2Ugb2YgYSB3YXRjaGFibGUgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbldhdGNoYWJsZVZhbHVlQ2hhbmdlZCh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgdmFsdWUgZmllbGQuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoV2F0Y2hhYmxlVmFsdWVGaWVsZCh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gd2F0Y2hhYmxlIGljb24gaXMgdXBkYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHt7bmFtZTogc3RyaW5nLCB3YXRjaGFibGVJY29uOiBXYXRjaGFibGVJY29ufX0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbldhdGNoYWJsZUljb25VcGRhdGVkKHNlbmRlciwgYXJnczoge25hbWU6IHN0cmluZywgd2F0Y2hhYmxlSWNvbjogV2F0Y2hhYmxlSWNvbn0pIHtcclxuICAgICAgICAodGhpcy5fdG9vbGJhciBhcyBXYXRjaGFibGVzR3JpZFRvb2xiYXIpLnVwZGF0ZUljb24oYXJncy5uYW1lLCBhcmdzLndhdGNoYWJsZUljb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyB2YWx1ZSB0byB0aGUgcGFyYW1ldGVycyB0cmVuZCBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFdhdGNoYWJsZVRyZW5kVmFsdWUod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIC8vIGZpbHRlciBudW1iZXJzIGFuZCBib29sZWFuIHZhbHVlcyB0byBiZSByZWNvcmRlZFxyXG4gICAgICAgIGlmICh0eXBlb2Ygd2F0Y2hhYmxlUGFyYW1ldGVyLnZhbHVlID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiB3YXRjaGFibGVQYXJhbWV0ZXIudmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgICAgICg8V2F0Y2hhYmxlVmFsdWVUcmVuZEJ1ZmZlcj50aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0pLnB1c2goPG51bWJlcj53YXRjaGFibGVQYXJhbWV0ZXIudmFsdWUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFjdGl2YXRlcyBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJXYXRjaGFibGVzV2lkZ2V0IGFjdGl2YXRlZFwiKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5hY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcyx0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlYWN0aXZhdGVzIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2F0Y2hhYmxlc1dpZGdldCBkZWFjdGl2YXRlZFwiKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5kZWFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGlzcG9zZXMgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5zdG9wU2FtcGxpbmdUaW1lcigpO1xyXG4gICAgICAgIHRoaXMuc3RvcFRyZW5kVGltZXIoKTtcclxuXHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIudW5vYnNlcnZlQWxsKHRoaXMsdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVyc1swXT8uY29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgLy8gZGV0YWNoIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycy5mb3JFYWNoKChzdGF0ZSkgPT4geyBcclxuICAgICAgICAgICAgc3RhdGUuc3RhdGVFeHByZXNzaW9uLmV2ZW50SWNvblVwZGF0ZWQuZGV0YWNoKHRoaXMuX3dhdGNoYWJsZUljb25VcGRhdGVIYW5kbGVyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgV2F0Y2hhYmxlc1dpZGdldCB9OyJdfQ==