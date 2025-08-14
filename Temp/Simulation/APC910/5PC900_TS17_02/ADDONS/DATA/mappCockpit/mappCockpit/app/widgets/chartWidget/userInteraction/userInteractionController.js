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
define(["require", "exports", "../../../framework/events", "./strategies/charStrategyInterface", "./strategies/cursorStrategy", "./strategies/chartPanningStrategy", "../../chartViewWidget/chartViewWidget", "./strategies/chartBoxZoomStrategy", "./strategies/cursorDragStrategy", "../ChartBase", "../../common/states/chartViewToolbarStates", "./strategies/axisPanningStrategy", "../../../core/types/point", "../../traceViewWidget/bindingIds", "../../../framework/componentHub/bindings/bindings"], function (require, exports, events_1, charStrategyInterface_1, cursorStrategy_1, chartPanningStrategy_1, chartViewWidget_1, chartBoxZoomStrategy_1, cursorDragStrategy_1, ChartBase_1, chartViewToolbarStates_1, axisPanningStrategy_1, point_1, bindingIds_1, bindings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventExecuteChartCommand = /** @class */ (function (_super) {
        __extends(EventExecuteChartCommand, _super);
        function EventExecuteChartCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventExecuteChartCommand;
    }(events_1.TypedEvent));
    exports.EventExecuteChartCommand = EventExecuteChartCommand;
    ;
    /**
     * Commands that can be used within the charts
     *
     * @enum {number}
     */
    var ChartCommandType;
    (function (ChartCommandType) {
        ChartCommandType[ChartCommandType["setCursorOnPointerPosition"] = 0] = "setCursorOnPointerPosition";
        ChartCommandType[ChartCommandType["resetZoom"] = 1] = "resetZoom";
        ChartCommandType[ChartCommandType["selectCursor"] = 2] = "selectCursor";
        ChartCommandType[ChartCommandType["checkCursorHovering"] = 3] = "checkCursorHovering";
        ChartCommandType[ChartCommandType["dragCursor"] = 4] = "dragCursor";
        ChartCommandType[ChartCommandType["endCursorDrag"] = 5] = "endCursorDrag";
        ChartCommandType[ChartCommandType["panChart"] = 6] = "panChart";
        ChartCommandType[ChartCommandType["toggleBoxZoom"] = 7] = "toggleBoxZoom";
        ChartCommandType[ChartCommandType["togglePanning"] = 8] = "togglePanning";
        ChartCommandType[ChartCommandType["selectZoomAxis"] = 9] = "selectZoomAxis";
        ChartCommandType[ChartCommandType["selectPanningAxes"] = 10] = "selectPanningAxes";
        ChartCommandType[ChartCommandType["zoomChart"] = 11] = "zoomChart";
        ChartCommandType[ChartCommandType["autoScale"] = 12] = "autoScale";
        ChartCommandType[ChartCommandType["resetDragPosition"] = 13] = "resetDragPosition";
        ChartCommandType[ChartCommandType["resetCursorHovering"] = 14] = "resetCursorHovering";
    })(ChartCommandType || (ChartCommandType = {}));
    exports.ChartCommandType = ChartCommandType;
    /**
     * ChartInteractionType
     *
     * @enum {number}
     */
    var MouseActionType;
    (function (MouseActionType) {
        MouseActionType[MouseActionType["mouseDown"] = 0] = "mouseDown";
        MouseActionType[MouseActionType["mouseUp"] = 1] = "mouseUp";
        MouseActionType[MouseActionType["mouseMove"] = 2] = "mouseMove";
        MouseActionType[MouseActionType["mouseWheel"] = 3] = "mouseWheel";
    })(MouseActionType || (MouseActionType = {}));
    exports.MouseActionType = MouseActionType;
    /**
     * ChartMouseState
     *
     * @enum {number}
     */
    var ChartMouseState;
    (function (ChartMouseState) {
        ChartMouseState[ChartMouseState["mouseUp"] = 0] = "mouseUp";
        ChartMouseState[ChartMouseState["mouseDown"] = 1] = "mouseDown";
        ChartMouseState[ChartMouseState["dragging"] = 2] = "dragging";
    })(ChartMouseState || (ChartMouseState = {}));
    /**
     * Arguments for EventExecuteChartCommand
     *
     * @class EventExecuteChartCommandArgs
     */
    var EventExecuteChartCommandArgs = /** @class */ (function () {
        function EventExecuteChartCommandArgs(caller, commandType, traceChart, data) {
            if (data === void 0) { data = {}; }
            this.caller = caller;
            this.commandType = commandType;
            this.traceChart = traceChart;
            this.data = data;
        }
        return EventExecuteChartCommandArgs;
    }());
    exports.EventExecuteChartCommandArgs = EventExecuteChartCommandArgs;
    /**
     * UserInteractionController
     *
     * @class UserInteractionController
     * @implements {IUserInteractionController}
     */
    var UserInteractionController = /** @class */ (function () {
        /**
         * Creates an instance of UserInteractionController
         * @memberof UserInteractionController
         */
        function UserInteractionController() {
            var _this = this;
            this.mouseDownPosition = [];
            this.zoomStep = 1.2;
            this.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
            this._toolState = new chartViewToolbarStates_1.ChartViewToolState();
            this._zoomDirectionState = new chartViewToolbarStates_1.ChartViewZoomDirectionState();
            this.eventExecuteChartCommand = new EventExecuteChartCommand();
            this.mouseState = ChartMouseState.mouseUp;
            this.activeStrategies = [];
            this.createBindings();
            this.selectCursor(1);
            //needed for mouse actions that are happening outside of the charts
            $(document).on("mouseup", (function () { return _this.onMouseUpOutsideOfChart(); }));
            $(document).on("mousemove", (function (e) { return _this.onMouseMoveOutsideOfChart(e); }));
        }
        /**
         * Creates the binding to the different states(zoom direction, tool, ...)
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.createBindings = function () {
            bindings_1.Bindings.createByDecl(bindingIds_1.TraceViewBinding.ToolState, this, "toolState", "");
            bindings_1.Bindings.createByDecl(bindingIds_1.TraceViewBinding.ZoomDirectionState, this, "zoomDirectionState", "");
        };
        /**
         * Disposes all bindings to this instance
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.disposeBindings = function () {
            bindings_1.Bindings.unbind(this);
        };
        /**
         * Dispose this instance
         *
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.dispose = function () {
            this.disposeBindings();
        };
        Object.defineProperty(UserInteractionController.prototype, "toolState", {
            /**
             * Gets the tool states
             *
             * @protected
             * @type {ChartViewToolState}
             * @memberof UserInteractionController
             */
            get: function () {
                return this._toolState;
            },
            /**
             * Sets the tool state. The method is called automatically whenever a tool state has been changed externally.
             *
             * @protected
             * @memberof UserInteractionController
             */
            set: function (toolState) {
                // update the backup field
                this._toolState = toolState;
                this.updateOnChartViewToolStateChange(this._toolState);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInteractionController.prototype, "zoomDirectionState", {
            /**
             * Gets the zoom direction states
             *
             * @protected
             * @type {ChartViewZoomDirectionState}
             * @memberof UserInteractionController
             */
            get: function () {
                return this._zoomDirectionState;
            },
            /**
             * Sets the zoom direction state. The method is called automatically whenever a zoom direction state has been changed externally.
             *
             * @protected
             * @memberof UserInteractionController
             */
            set: function (zoomDirectionState) {
                // update the backup field
                this._zoomDirectionState = zoomDirectionState;
                this.updateOnChartViewZoomDirectionChange(this._zoomDirectionState);
            },
            enumerable: true,
            configurable: true
        });
        UserInteractionController.prototype.updateOnChartViewToolStateChange = function (modifiedState) {
            switch (modifiedState.selectedTool) {
                case chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS: {
                    this.selectCursor(1);
                    break;
                }
                case chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING:
                    this.setPanning();
                    break;
                case chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM:
                    this.setBoxZoom();
                    break;
            }
        };
        UserInteractionController.prototype.updateOnChartViewZoomDirectionChange = function (modifiedState) {
            switch (modifiedState.zoomDirection) {
                case chartViewWidget_1.ZoomDirection.X:
                    this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.selectZoomAxis, null, { zoomAxes: chartViewWidget_1.ZoomDirection.X }));
                    this.zoomDirection = chartViewWidget_1.ZoomDirection.X;
                    break;
                case chartViewWidget_1.ZoomDirection.Y:
                    this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.selectZoomAxis, null, { zoomAxes: chartViewWidget_1.ZoomDirection.Y }));
                    this.zoomDirection = chartViewWidget_1.ZoomDirection.Y;
                    break;
                case chartViewWidget_1.ZoomDirection.XY:
                    this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.selectZoomAxis, null, { zoomAxes: chartViewWidget_1.ZoomDirection.XY }));
                    this.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
                    break;
            }
        };
        /**
         * method called when the user interacts with charts
         *
         * @param {MouseActionType} chartInteractionType
         * @param {ITraceChart} sender chart in which interaction happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartInteraction = function (chartInteractionType, sender, args) {
            switch (chartInteractionType) {
                case (MouseActionType.mouseDown):
                    this.onChartMouseDown(sender, args);
                    break;
                case (MouseActionType.mouseUp):
                    this.onChartMouseUp(sender, args);
                    break;
                case (MouseActionType.mouseMove):
                    this.onChartMouseMove(sender, args);
                    break;
                case (MouseActionType.mouseWheel):
                    this.onChartMouseWheel(sender, args);
                    break;
            }
        };
        /**
         *method called on mouse down event
         *
         * @private
         * @param {ITraceChart} sender chart in which mouseDown happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseDown = function (sender, args) {
            this.mouseState = ChartMouseState.mouseDown;
            this.activeChart = sender;
            this.mouseDownPosition = [args.mousePointChart.x, args.mousePointChart.y];
            for (var i = 0; i < this.activeStrategies.length; i++) {
                args.objectUnderMouse = this.activeStrategies[i].onMouseDown(sender, args.objectUnderMouse, args.mousePointChart);
            }
        };
        /**
         *method called on mouse up event
         *
         * @private
         * @param {ITraceChart} sender chart in which mouseUp happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseUp = function (sender, args) {
            if (this.mouseDownPosition[0] != args.mousePointChart.x || this.mouseDownPosition[1] != args.mousePointChart.y) {
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onDragEnd(sender, args.objectUnderMouse);
                }
            }
            else {
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onClick(sender, args.objectUnderMouse, args.mousePointChart);
                }
            }
            this.mouseState = ChartMouseState.mouseUp;
            this.activeChart = undefined;
            this.mouseDownPosition = [];
        };
        /**
         * called when the mousebutton is released outside of a chart
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onMouseUpOutsideOfChart = function () {
            if (this.mouseState == ChartMouseState.dragging) {
                //each strategy has to be notified, when the drag stopped outside of the chart
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onDragEnd(undefined, new ChartBase_1.ChartObjectInformation(ChartBase_1.ChartObjectType.invalid, {}));
                }
            }
            this.mouseState = ChartMouseState.mouseUp;
            this.mouseDownPosition = [];
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.resetDragPosition, null, {}));
        };
        /**
         * called when the mouse is moved outside of the chart
         *
         * @private
         * @param {*} e
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onMouseMoveOutsideOfChart = function (e) {
            //only reset the hovering state when the mouse is currently dragging (e.g dragging the cursor)
            if (this.mouseState != ChartMouseState.dragging) {
                this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.resetCursorHovering, null, { e: e }));
            }
        };
        /**
         *method called on mouse move event
         *
         * @private
         * @param {ITraceChart} sender chart in which mouseDown happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseMove = function (sender, args) {
            if (this.mouseState == ChartMouseState.mouseUp) {
                this.mouseHover(sender, args);
            }
            else {
                if (this.activeChart) {
                    args.mousePointChart = new point_1.Point(args.mousePoint.x - this.activeChart.mainDiv.getBoundingClientRect().x, args.mousePoint.y - this.activeChart.mainDiv.getBoundingClientRect().y);
                    this.mouseDrag(this.activeChart, args);
                }
            }
        };
        /**
         *method called when mouse is hovering above chart
         *
         * @private
         * @param {*} sender chart in which hover happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.mouseHover = function (sender, args) {
            for (var i = 0; i < this.activeStrategies.length; i++) {
                this.activeStrategies[i].onMouseHover(sender, args.objectUnderMouse, args.mousePointChart);
            }
        };
        /**
         *method called when mouse is draged on chart
         *
         * @private
         * @param {*} sender chart in which drag happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.mouseDrag = function (sender, args) {
            this.mouseState = ChartMouseState.dragging;
            var activeStrategy = this.getActiveDragStrategy();
            if (activeStrategy != undefined) {
                activeStrategy.onDrag(sender, args);
            }
            else {
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onDrag(sender, args);
                    if (this.activeStrategies[i].dragIsActive == true) {
                        break;
                    }
                }
            }
        };
        /**
         * checks if any drag operation is active and return corresponding strategy
         *
         * @private
         * @returns IChartInteractionStrategy | undefined
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.getActiveDragStrategy = function () {
            for (var i = 0; i < this.activeStrategies.length; i++) {
                if (this.activeStrategies[i].dragIsActive == true) {
                    return this.activeStrategies[i];
                }
            }
            return undefined;
        };
        /**
         *method called when mouse wheel changes
         *
         * @private
         * @param {ITraceChart} sender
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseWheel = function (sender, args) {
            var zoomStep = this.zoomStep;
            if (args.wheelDelta > 0) {
                zoomStep = 1 / this.zoomStep;
            }
            if (args.objectUnderMouse.chartObjectType != ChartBase_1.ChartObjectType.emptySpace) {
                var axes = new Array();
                if (args.objectUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.axis) {
                    axes.push(sender.chart.getAxis(args.objectUnderMouse.args.axis.getAxisID()));
                }
                this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.zoomChart, sender, { mousePoint: args.mousePoint, zoomStep: zoomStep, zoomDirection: this.zoomDirection, axes: axes }));
            }
        };
        /**
         * method called when the chartViewToolbar is clicked
         *
         * @param {IChartViewToolbar} sender
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onToolbarClick = function (sender, args) {
            //TODO: remove this method and use state updates instead
            if (args.groupNumber == 3) {
                this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.autoScale, null));
            }
            if (args.groupNumber == 4) {
                this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.resetZoom, null));
            }
        };
        /**
         *method used to execute a chart command
         *
         * @param {EventExecuteChartCommandArgs} executeChartCommandArgs
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.executeCommand = function (executeChartCommandArgs) {
            this.eventExecuteChartCommand.raise(this, executeChartCommandArgs);
        };
        /**
         * method to choose one of the cursors as active tool by index
         *
         * @param {number} cursorIndex
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.selectCursor = function (cursorIndex) {
            //let commandArguments = new EventExecuteChartCommandArgs(this,ChartCommandType.selectCursor, null, {cursorIndex : cursorIndex});
            //this.executeCommand(commandArguments);
            var commandArguments = new EventExecuteChartCommandArgs(this, ChartCommandType.toggleBoxZoom, null, { enabled: false });
            this.executeCommand(commandArguments);
            commandArguments = new EventExecuteChartCommandArgs(this, ChartCommandType.togglePanning, null, { enabled: false });
            this.executeCommand(commandArguments);
            this.clearActiveStrategies();
            this.activeStrategies.push(new axisPanningStrategy_1.AxisPanningStrategy(this));
            this.activeStrategies.push(new cursorStrategy_1.CursorInteractionStrategy(this, cursorIndex));
            this.activeStrategies.push(new cursorDragStrategy_1.CursorDragStrategy(this, cursorIndex));
        };
        /**
         * method to set panning as active tool
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.setPanning = function () {
            this.clearActiveStrategies();
            this.activeStrategies.push(new axisPanningStrategy_1.AxisPanningStrategy(this));
            this.activeStrategies.push(new chartPanningStrategy_1.ChartPanningStrategy(this));
            this.activeStrategies.push(new cursorDragStrategy_1.CursorDragStrategy(this, 0));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.toggleBoxZoom, null, { boxZoomEnabled: false }));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.togglePanning, null, { panningEnabled: false }));
        };
        /**
         *method to set box zoom as active tool
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.setBoxZoom = function () {
            this.clearActiveStrategies();
            this.activeStrategies.push(new axisPanningStrategy_1.AxisPanningStrategy(this));
            this.activeStrategies.unshift(new chartBoxZoomStrategy_1.ChartBoxZoomStrategy(this));
            this.activeStrategies.push(new cursorDragStrategy_1.CursorDragStrategy(this, 0));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.toggleBoxZoom, null, { boxZoomEnabled: true }));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.togglePanning, null, { panningEnabled: false }));
        };
        /**
         *removes all active strategys that are in place
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.clearActiveStrategies = function () {
            this.activeStrategies = [];
            this.activeStrategies.push(new charStrategyInterface_1.ChartIdleStrategy(this));
        };
        return UserInteractionController;
    }());
    exports.UserInteractionController = UserInteractionController;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckludGVyYWN0aW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vdXNlckludGVyYWN0aW9uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBbUJBO1FBQXVDLDRDQUFvRTtRQUEzRzs7UUFBOEcsQ0FBQztRQUFELCtCQUFDO0lBQUQsQ0FBQyxBQUEvRyxDQUF1QyxtQkFBVSxHQUE4RDtJQW1nQjNFLDREQUF3QjtJQW5nQm1ELENBQUM7SUFFaEg7Ozs7T0FJRztJQUNILElBQUssZ0JBZ0JKO0lBaEJELFdBQUssZ0JBQWdCO1FBQ2pCLG1HQUEwQixDQUFBO1FBQzFCLGlFQUFTLENBQUE7UUFDVCx1RUFBWSxDQUFBO1FBQ1oscUZBQW1CLENBQUE7UUFDbkIsbUVBQVUsQ0FBQTtRQUNWLHlFQUFhLENBQUE7UUFDYiwrREFBUSxDQUFBO1FBQ1IseUVBQWEsQ0FBQTtRQUNiLHlFQUFhLENBQUE7UUFDYiwyRUFBYyxDQUFBO1FBQ2Qsa0ZBQWlCLENBQUE7UUFDakIsa0VBQVMsQ0FBQTtRQUNULGtFQUFTLENBQUE7UUFDVCxrRkFBaUIsQ0FBQTtRQUNqQixzRkFBbUIsQ0FBQTtJQUN2QixDQUFDLEVBaEJJLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFnQnBCO0lBNGUyRiw0Q0FBZ0I7SUExZTVHOzs7O09BSUc7SUFDSCxJQUFLLGVBS0o7SUFMRCxXQUFLLGVBQWU7UUFDaEIsK0RBQVMsQ0FBQTtRQUNULDJEQUFPLENBQUE7UUFDUCwrREFBUyxDQUFBO1FBQ1QsaUVBQVUsQ0FBQTtJQUNkLENBQUMsRUFMSSxlQUFlLEtBQWYsZUFBZSxRQUtuQjtJQWdlNkcsMENBQWU7SUE5ZDdIOzs7O09BSUc7SUFDSCxJQUFLLGVBSUo7SUFKRCxXQUFLLGVBQWU7UUFDaEIsMkRBQU8sQ0FBQTtR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Q0FBQyxJQUFJLDJDQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLHVDQUFrQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRzVELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksNEJBQTRCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xKLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksNEJBQTRCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZKLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLHlEQUFxQixHQUE3QjtZQUNJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLHlDQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUNMLGdDQUFDO0lBQUQsQ0FBQyxBQXhiRCxJQXdiQztJQUVRLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY29udHJvbGxlckludGVyZmFjZVwiXHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBJQ2hhcnRWaWV3VG9vbGJhciB9IGZyb20gXCIuLi8uLi9jaGFydFZpZXdXaWRnZXQvdG9vbGJhci9pbnRlcmZhY2VzL2NoYXJ0Vmlld1Rvb2xiYXJJbnRlcmZhY2VcIlxyXG5pbXBvcnQgeyBJQ2hhcnRJbnRlcmFjdGlvblN0cmF0ZWd5LCBDaGFydElkbGVTdHJhdGVneSB9IGZyb20gXCIuL3N0cmF0ZWdpZXMvY2hhclN0cmF0ZWd5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEN1cnNvckludGVyYWN0aW9uU3RyYXRlZ3kgfSBmcm9tIFwiLi9zdHJhdGVnaWVzL2N1cnNvclN0cmF0ZWd5XCI7XHJcbmltcG9ydCB7IENoYXJ0UGFubmluZ1N0cmF0ZWd5IH0gZnJvbSBcIi4vc3RyYXRlZ2llcy9jaGFydFBhbm5pbmdTdHJhdGVneVwiO1xyXG5pbXBvcnQgeyBab29tRGlyZWN0aW9uIH0gZnJvbSBcIi4uLy4uL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgQ2hhcnRCb3hab29tU3RyYXRlZ3kgfSBmcm9tIFwiLi9zdHJhdGVnaWVzL2NoYXJ0Qm94Wm9vbVN0cmF0ZWd5XCI7XHJcbmltcG9ydCB7IEN1cnNvckRyYWdTdHJhdGVneSB9IGZyb20gXCIuL3N0cmF0ZWdpZXMvY3Vyc29yRHJhZ1N0cmF0ZWd5XCI7XHJcbmltcG9ydCB7IENoYXJ0T2JqZWN0VHlwZSwgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbiB9IGZyb20gXCIuLi9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3VG9vbFN0YXRlLCBDaGFydFZpZXdUb29sU3RhdGVFbnVtLCBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N0YXRlcy9jaGFydFZpZXdUb29sYmFyU3RhdGVzXCI7XHJcbmltcG9ydCB7IEF4aXNQYW5uaW5nU3RyYXRlZ3kgfSBmcm9tIFwiLi9zdHJhdGVnaWVzL2F4aXNQYW5uaW5nU3RyYXRlZ3lcIjtcclxuaW1wb3J0IHsgRXZlbnRNb3VzZUFyZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvY2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS90eXBlcy9wb2ludFwiO1xyXG5pbXBvcnQgeyBUcmFjZVZpZXdCaW5kaW5nIH0gZnJvbSBcIi4uLy4uL3RyYWNlVmlld1dpZGdldC9iaW5kaW5nSWRzXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ3NcIjtcclxuXHJcblxyXG5jbGFzcyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmQgZXh0ZW5kcyBUeXBlZEV2ZW50PElVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyLCBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzPiB7IH07XHJcblxyXG4vKipcclxuICogQ29tbWFuZHMgdGhhdCBjYW4gYmUgdXNlZCB3aXRoaW4gdGhlIGNoYXJ0c1xyXG4gKlxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZW51bSBDaGFydENvbW1hbmRUeXBlIHtcclxuICAgIHNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uLFxyXG4gICAgcmVzZXRab29tLFxyXG4gICAgc2VsZWN0Q3Vyc29yLFxyXG4gICAgY2hlY2tDdXJzb3JIb3ZlcmluZyxcclxuICAgIGRyYWdDdXJzb3IsXHJcbiAgICBlbmRDdXJzb3JEcmFnLFxyXG4gICAgcGFuQ2hhcnQsXHJcbiAgICB0b2dnbGVCb3hab29tLFxyXG4gICAgdG9nZ2xlUGFubmluZyxcclxuICAgIHNlbGVjdFpvb21BeGlzLFxyXG4gICAgc2VsZWN0UGFubmluZ0F4ZXMsXHJcbiAgICB6b29tQ2hhcnQsXHJcbiAgICBhdXRvU2NhbGUsXHJcbiAgICByZXNldERyYWdQb3NpdGlvbixcclxuICAgIHJlc2V0Q3Vyc29ySG92ZXJpbmdcclxufVxyXG5cclxuLyoqXHJcbiAqIENoYXJ0SW50ZXJhY3Rpb25UeXBlXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIE1vdXNlQWN0aW9uVHlwZSB7XHJcbiAgICBtb3VzZURvd24sXHJcbiAgICBtb3VzZVVwLFxyXG4gICAgbW91c2VNb3ZlLFxyXG4gICAgbW91c2VXaGVlbFxyXG59XHJcblxyXG4vKipcclxuICogQ2hhcnRNb3VzZVN0YXRlXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIENoYXJ0TW91c2VTdGF0ZSB7XHJcbiAgICBtb3VzZVVwLFxyXG4gICAgbW91c2VEb3duLFxyXG4gICAgZHJhZ2dpbmcsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBcmd1bWVudHMgZm9yIEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZFxyXG4gKlxyXG4gKiBAY2xhc3MgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJnc1xyXG4gKi9cclxuY2xhc3MgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyB7XHJcbiAgICBjb21tYW5kVHlwZTogQ2hhcnRDb21tYW5kVHlwZTtcclxuICAgIGNhbGxlcjogYW55O1xyXG4gICAgdHJhY2VDaGFydDogSVRyYWNlQ2hhcnQgfCBudWxsO1xyXG4gICAgZGF0YTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbGxlcjogYW55LCBjb21tYW5kVHlwZTogQ2hhcnRDb21tYW5kVHlwZSwgdHJhY2VDaGFydDogSVRyYWNlQ2hhcnQgfCBudWxsLCBkYXRhOiBhbnkgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuY2FsbGVyID0gY2FsbGVyO1xyXG4gICAgICAgIHRoaXMuY29tbWFuZFR5cGUgPSBjb21tYW5kVHlwZTtcclxuICAgICAgICB0aGlzLnRyYWNlQ2hhcnQgPSB0cmFjZUNoYXJ0O1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG59XHJcbi8qKlxyXG4gKiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAqXHJcbiAqIEBjbGFzcyBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJVXNlckludGVyYWN0aW9uQ29udHJvbGxlcn1cclxuICovXHJcbmNsYXNzIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgaW1wbGVtZW50cyBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlciB7XHJcblxyXG4gICAgZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kOiBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmQ7XHJcblxyXG4gICAgcHJpdmF0ZSBtb3VzZVN0YXRlOiBDaGFydE1vdXNlU3RhdGU7XHJcbiAgICBwcml2YXRlIG1vdXNlRG93blBvc2l0aW9uOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgYWN0aXZlU3RyYXRlZ2llczogSUNoYXJ0SW50ZXJhY3Rpb25TdHJhdGVneVtdO1xyXG4gICAgcHJpdmF0ZSBhY3RpdmVDaGFydDogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWRcclxuXHJcbiAgICBwcml2YXRlIHpvb21TdGVwOiBudW1iZXIgPSAxLjI7XHJcbiAgICBwcml2YXRlIHpvb21EaXJlY3Rpb246IFpvb21EaXJlY3Rpb24gPSBab29tRGlyZWN0aW9uLlhZO1xyXG5cclxuICAgIHByaXZhdGUgX3Rvb2xTdGF0ZTogQ2hhcnRWaWV3VG9vbFN0YXRlID0gbmV3IENoYXJ0Vmlld1Rvb2xTdGF0ZSgpO1xyXG4gICAgcHJpdmF0ZSBfem9vbURpcmVjdGlvblN0YXRlOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUgPSBuZXcgQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kID0gbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZCgpO1xyXG5cclxuICAgICAgICB0aGlzLm1vdXNlU3RhdGUgPSBDaGFydE1vdXNlU3RhdGUubW91c2VVcFxyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZUJpbmRpbmdzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZWxlY3RDdXJzb3IoMSk7XHJcblxyXG4gICAgICAgIC8vbmVlZGVkIGZvciBtb3VzZSBhY3Rpb25zIHRoYXQgYXJlIGhhcHBlbmluZyBvdXRzaWRlIG9mIHRoZSBjaGFydHNcclxuICAgICAgICAkKGRvY3VtZW50KS5vbihcIm1vdXNldXBcIiwgKCgpID0+IHRoaXMub25Nb3VzZVVwT3V0c2lkZU9mQ2hhcnQoKSkpO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwibW91c2Vtb3ZlXCIsICgoZSkgPT4gdGhpcy5vbk1vdXNlTW92ZU91dHNpZGVPZkNoYXJ0KGUpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBiaW5kaW5nIHRvIHRoZSBkaWZmZXJlbnQgc3RhdGVzKHpvb20gZGlyZWN0aW9uLCB0b29sLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQmluZGluZ3MoKXtcclxuICAgICAgICBCaW5kaW5ncy5jcmVhdGVCeURlY2woVHJhY2VWaWV3QmluZGluZy5Ub29sU3RhdGUsIHRoaXMsIFwidG9vbFN0YXRlXCIsIFwiXCIpO1xyXG4gICAgICAgIEJpbmRpbmdzLmNyZWF0ZUJ5RGVjbChUcmFjZVZpZXdCaW5kaW5nLlpvb21EaXJlY3Rpb25TdGF0ZSwgdGhpcywgXCJ6b29tRGlyZWN0aW9uU3RhdGVcIiwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlcyBhbGwgYmluZGluZ3MgdG8gdGhpcyBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpc3Bvc2VCaW5kaW5ncygpe1xyXG4gICAgICAgIEJpbmRpbmdzLnVuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhpcyBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLmRpc3Bvc2VCaW5kaW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdG9vbCBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7Q2hhcnRWaWV3VG9vbFN0YXRlfVxyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgIHByb3RlY3RlZCBnZXQgdG9vbFN0YXRlKCkgOiBDaGFydFZpZXdUb29sU3RhdGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sU3RhdGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdG9vbCBzdGF0ZS4gVGhlIG1ldGhvZCBpcyBjYWxsZWQgYXV0b21hdGljYWxseSB3aGVuZXZlciBhIHRvb2wgc3RhdGUgaGFzIGJlZW4gY2hhbmdlZCBleHRlcm5hbGx5LiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0IHRvb2xTdGF0ZSh0b29sU3RhdGUgOiBDaGFydFZpZXdUb29sU3RhdGUpIHtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGJhY2t1cCBmaWVsZFxyXG4gICAgICAgIHRoaXMuX3Rvb2xTdGF0ZSA9IHRvb2xTdGF0ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU9uQ2hhcnRWaWV3VG9vbFN0YXRlQ2hhbmdlKHRoaXMuX3Rvb2xTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB6b29tIGRpcmVjdGlvbiBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7Q2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlfVxyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgIHByb3RlY3RlZCBnZXQgem9vbURpcmVjdGlvblN0YXRlKCkgOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl96b29tRGlyZWN0aW9uU3RhdGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgem9vbSBkaXJlY3Rpb24gc3RhdGUuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSB6b29tIGRpcmVjdGlvbiBzdGF0ZSBoYXMgYmVlbiBjaGFuZ2VkIGV4dGVybmFsbHkuIFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXQgem9vbURpcmVjdGlvblN0YXRlKHpvb21EaXJlY3Rpb25TdGF0ZSA6IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgYmFja3VwIGZpZWxkXHJcbiAgICAgICAgdGhpcy5fem9vbURpcmVjdGlvblN0YXRlID0gem9vbURpcmVjdGlvblN0YXRlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlT25DaGFydFZpZXdab29tRGlyZWN0aW9uQ2hhbmdlKHRoaXMuX3pvb21EaXJlY3Rpb25TdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVPbkNoYXJ0Vmlld1Rvb2xTdGF0ZUNoYW5nZShtb2RpZmllZFN0YXRlOiBDaGFydFZpZXdUb29sU3RhdGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG1vZGlmaWVkU3RhdGUuc2VsZWN0ZWRUb29sKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5DVVJTT1JTOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEN1cnNvcigxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5QQU5OSU5HOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYW5uaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkJPWFpPT006XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJveFpvb20oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU9uQ2hhcnRWaWV3Wm9vbURpcmVjdGlvbkNoYW5nZShtb2RpZmllZFN0YXRlOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG1vZGlmaWVkU3RhdGUuem9vbURpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIFpvb21EaXJlY3Rpb24uWDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0Wm9vbUF4aXMsIG51bGwsIHsgem9vbUF4ZXM6IFpvb21EaXJlY3Rpb24uWCB9KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnpvb21EaXJlY3Rpb24gPSBab29tRGlyZWN0aW9uLlg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBab29tRGlyZWN0aW9uLlk6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLCBuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnNlbGVjdFpvb21BeGlzLCBudWxsLCB7IHpvb21BeGVzOiBab29tRGlyZWN0aW9uLlkgfSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy56b29tRGlyZWN0aW9uID0gWm9vbURpcmVjdGlvbi5ZO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgWm9vbURpcmVjdGlvbi5YWTpcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0Wm9vbUF4aXMsIG51bGwsIHsgem9vbUF4ZXM6IFpvb21EaXJlY3Rpb24uWFkgfSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy56b29tRGlyZWN0aW9uID0gWm9vbURpcmVjdGlvbi5YWTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1ldGhvZCBjYWxsZWQgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCBjaGFydHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vdXNlQWN0aW9uVHlwZX0gY2hhcnRJbnRlcmFjdGlvblR5cGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IHNlbmRlciBjaGFydCBpbiB3aGljaCBpbnRlcmFjdGlvbiBoYXBwZW5lZFxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25DaGFydEludGVyYWN0aW9uKGNoYXJ0SW50ZXJhY3Rpb25UeXBlOiBNb3VzZUFjdGlvblR5cGUsIHNlbmRlcjogSVRyYWNlQ2hhcnQsIGFyZ3M6IGFueSkge1xyXG4gICAgICAgIHN3aXRjaCAoY2hhcnRJbnRlcmFjdGlvblR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAoTW91c2VBY3Rpb25UeXBlLm1vdXNlRG93bik6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZURvd24oc2VuZGVyLCBhcmdzKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgKE1vdXNlQWN0aW9uVHlwZS5tb3VzZVVwKTpcclxuICAgICAgICAgICAgICAgIHRoaXMub25DaGFydE1vdXNlVXAoc2VuZGVyLCBhcmdzKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgKE1vdXNlQWN0aW9uVHlwZS5tb3VzZU1vdmUpOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYXJ0TW91c2VNb3ZlKHNlbmRlciwgYXJncylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIChNb3VzZUFjdGlvblR5cGUubW91c2VXaGVlbCk6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlciwgYXJncylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqbWV0aG9kIGNhbGxlZCBvbiBtb3VzZSBkb3duIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IHNlbmRlciBjaGFydCBpbiB3aGljaCBtb3VzZURvd24gaGFwcGVuZWRcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VEb3duKHNlbmRlcjogSVRyYWNlQ2hhcnQsIGFyZ3M6IEV2ZW50TW91c2VBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5tb3VzZVN0YXRlID0gQ2hhcnRNb3VzZVN0YXRlLm1vdXNlRG93bjtcclxuICAgICAgICB0aGlzLmFjdGl2ZUNoYXJ0ID0gc2VuZGVyO1xyXG4gICAgICAgIHRoaXMubW91c2VEb3duUG9zaXRpb24gPSBbYXJncy5tb3VzZVBvaW50Q2hhcnQueCwgYXJncy5tb3VzZVBvaW50Q2hhcnQueV07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJncy5vYmplY3RVbmRlck1vdXNlID0gdGhpcy5hY3RpdmVTdHJhdGVnaWVzW2ldLm9uTW91c2VEb3duKHNlbmRlciwgYXJncy5vYmplY3RVbmRlck1vdXNlLCBhcmdzLm1vdXNlUG9pbnRDaGFydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICptZXRob2QgY2FsbGVkIG9uIG1vdXNlIHVwIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IHNlbmRlciBjaGFydCBpbiB3aGljaCBtb3VzZVVwIGhhcHBlbmVkXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydE1vdXNlVXAoc2VuZGVyOiBJVHJhY2VDaGFydCwgYXJncyA6IEV2ZW50TW91c2VBcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW91c2VEb3duUG9zaXRpb25bMF0gIT0gYXJncy5tb3VzZVBvaW50Q2hhcnQueCB8fCB0aGlzLm1vdXNlRG93blBvc2l0aW9uWzFdICE9IGFyZ3MubW91c2VQb2ludENoYXJ0LnkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llc1tpXS5vbkRyYWdFbmQoc2VuZGVyLCBhcmdzLm9iamVjdFVuZGVyTW91c2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzW2ldLm9uQ2xpY2soc2VuZGVyLCBhcmdzLm9iamVjdFVuZGVyTW91c2UsIGFyZ3MubW91c2VQb2ludENoYXJ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdXNlU3RhdGUgPSBDaGFydE1vdXNlU3RhdGUubW91c2VVcDtcclxuICAgICAgICB0aGlzLmFjdGl2ZUNoYXJ0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMubW91c2VEb3duUG9zaXRpb24gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxlZCB3aGVuIHRoZSBtb3VzZWJ1dHRvbiBpcyByZWxlYXNlZCBvdXRzaWRlIG9mIGEgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk1vdXNlVXBPdXRzaWRlT2ZDaGFydCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tb3VzZVN0YXRlID09IENoYXJ0TW91c2VTdGF0ZS5kcmFnZ2luZykge1xyXG4gICAgICAgICAgICAvL2VhY2ggc3RyYXRlZ3kgaGFzIHRvIGJlIG5vdGlmaWVkLCB3aGVuIHRoZSBkcmFnIHN0b3BwZWQgb3V0c2lkZSBvZiB0aGUgY2hhcnRcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llc1tpXS5vbkRyYWdFbmQodW5kZWZpbmVkIGFzIHVua25vd24gYXMgSVRyYWNlQ2hhcnQsIG5ldyBDaGFydE9iamVjdEluZm9ybWF0aW9uKENoYXJ0T2JqZWN0VHlwZS5pbnZhbGlkLCB7fSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1vdXNlU3RhdGUgPSBDaGFydE1vdXNlU3RhdGUubW91c2VVcDtcclxuICAgICAgICB0aGlzLm1vdXNlRG93blBvc2l0aW9uID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUucmVzZXREcmFnUG9zaXRpb24sIG51bGwsIHt9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsZWQgd2hlbiB0aGUgbW91c2UgaXMgbW92ZWQgb3V0c2lkZSBvZiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTW91c2VNb3ZlT3V0c2lkZU9mQ2hhcnQoZSk6IHZvaWQge1xyXG4gICAgICAgIC8vb25seSByZXNldCB0aGUgaG92ZXJpbmcgc3RhdGUgd2hlbiB0aGUgbW91c2UgaXMgY3VycmVudGx5IGRyYWdnaW5nIChlLmcgZHJhZ2dpbmcgdGhlIGN1cnNvcilcclxuICAgICAgICBpZiAodGhpcy5tb3VzZVN0YXRlICE9IENoYXJ0TW91c2VTdGF0ZS5kcmFnZ2luZykge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLCBuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnJlc2V0Q3Vyc29ySG92ZXJpbmcsIG51bGwsIHsgZSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICptZXRob2QgY2FsbGVkIG9uIG1vdXNlIG1vdmUgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDaGFydH0gc2VuZGVyIGNoYXJ0IGluIHdoaWNoIG1vdXNlRG93biBoYXBwZW5lZFxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZU1vdmUoc2VuZGVyOiBJVHJhY2VDaGFydCwgYXJncyA6IEV2ZW50TW91c2VBcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW91c2VTdGF0ZSA9PSBDaGFydE1vdXNlU3RhdGUubW91c2VVcCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlSG92ZXIoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBhcmdzLm1vdXNlUG9pbnRDaGFydCA9IG5ldyBQb2ludChhcmdzLm1vdXNlUG9pbnQueCAtIHRoaXMuYWN0aXZlQ2hhcnQubWFpbkRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54LCBhcmdzLm1vdXNlUG9pbnQueSAtIHRoaXMuYWN0aXZlQ2hhcnQubWFpbkRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VEcmFnKHRoaXMuYWN0aXZlQ2hhcnQsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKm1ldGhvZCBjYWxsZWQgd2hlbiBtb3VzZSBpcyBob3ZlcmluZyBhYm92ZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlciBjaGFydCBpbiB3aGljaCBob3ZlciBoYXBwZW5lZFxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlSG92ZXIoc2VuZGVyLCBhcmdzIDogRXZlbnRNb3VzZUFyZ3MpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXNbaV0ub25Nb3VzZUhvdmVyKHNlbmRlciwgYXJncy5vYmplY3RVbmRlck1vdXNlLCBhcmdzLm1vdXNlUG9pbnRDaGFydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICptZXRob2QgY2FsbGVkIHdoZW4gbW91c2UgaXMgZHJhZ2VkIG9uIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyIGNoYXJ0IGluIHdoaWNoIGRyYWcgaGFwcGVuZWRcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3VzZURyYWcoc2VuZGVyLCBhcmdzIDogRXZlbnRNb3VzZUFyZ3MpIHtcclxuICAgICAgICB0aGlzLm1vdXNlU3RhdGUgPSBDaGFydE1vdXNlU3RhdGUuZHJhZ2dpbmc7XHJcblxyXG4gICAgICAgIGxldCBhY3RpdmVTdHJhdGVneSA9IHRoaXMuZ2V0QWN0aXZlRHJhZ1N0cmF0ZWd5KCk7XHJcbiAgICAgICAgaWYgKGFjdGl2ZVN0cmF0ZWd5ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhY3RpdmVTdHJhdGVneS5vbkRyYWcoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RpdmVTdHJhdGVnaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXNbaV0ub25EcmFnKHNlbmRlciwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVTdHJhdGVnaWVzW2ldLmRyYWdJc0FjdGl2ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGVja3MgaWYgYW55IGRyYWcgb3BlcmF0aW9uIGlzIGFjdGl2ZSBhbmQgcmV0dXJuIGNvcnJlc3BvbmRpbmcgc3RyYXRlZ3lcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMgSUNoYXJ0SW50ZXJhY3Rpb25TdHJhdGVneSB8IHVuZGVmaW5lZFxyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBY3RpdmVEcmFnU3RyYXRlZ3koKTogSUNoYXJ0SW50ZXJhY3Rpb25TdHJhdGVneSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlU3RyYXRlZ2llc1tpXS5kcmFnSXNBY3RpdmUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlU3RyYXRlZ2llc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKm1ldGhvZCBjYWxsZWQgd2hlbiBtb3VzZSB3aGVlbCBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlcjogSVRyYWNlQ2hhcnQsIGFyZ3MpIHtcclxuICAgICAgICBsZXQgem9vbVN0ZXAgPSB0aGlzLnpvb21TdGVwO1xyXG4gICAgICAgIGlmIChhcmdzLndoZWVsRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgIHpvb21TdGVwID0gMSAvIHRoaXMuem9vbVN0ZXBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhcmdzLm9iamVjdFVuZGVyTW91c2UuY2hhcnRPYmplY3RUeXBlICE9IENoYXJ0T2JqZWN0VHlwZS5lbXB0eVNwYWNlKSB7XHJcbiAgICAgICAgICAgIGxldCBheGVzID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJncy5vYmplY3RVbmRlck1vdXNlLmNoYXJ0T2JqZWN0VHlwZSA9PSBDaGFydE9iamVjdFR5cGUuYXhpcykge1xyXG4gICAgICAgICAgICAgICAgYXhlcy5wdXNoKHNlbmRlci5jaGFydC5nZXRBeGlzKGFyZ3Mub2JqZWN0VW5kZXJNb3VzZS5hcmdzLmF4aXMuZ2V0QXhpc0lEKCkpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQucmFpc2UodGhpcywgbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS56b29tQ2hhcnQsIHNlbmRlciwgeyBtb3VzZVBvaW50OiBhcmdzLm1vdXNlUG9pbnQsIHpvb21TdGVwOiB6b29tU3RlcCwgem9vbURpcmVjdGlvbjogdGhpcy56b29tRGlyZWN0aW9uLCBheGVzOiBheGVzIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXRob2QgY2FsbGVkIHdoZW4gdGhlIGNoYXJ0Vmlld1Rvb2xiYXIgaXMgY2xpY2tlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0Vmlld1Rvb2xiYXJ9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25Ub29sYmFyQ2xpY2soc2VuZGVyOiBJQ2hhcnRWaWV3VG9vbGJhciwgYXJncykge1xyXG5cclxuICAgICAgICAvL1RPRE86IHJlbW92ZSB0aGlzIG1ldGhvZCBhbmQgdXNlIHN0YXRlIHVwZGF0ZXMgaW5zdGVhZFxyXG4gICAgICAgIGlmIChhcmdzLmdyb3VwTnVtYmVyID09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQucmFpc2UodGhpcywgbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS5hdXRvU2NhbGUsIG51bGwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFyZ3MuZ3JvdXBOdW1iZXIgPT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLCBuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnJlc2V0Wm9vbSwgbnVsbCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqbWV0aG9kIHVzZWQgdG8gZXhlY3V0ZSBhIGNoYXJ0IGNvbW1hbmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3N9IGV4ZWN1dGVDaGFydENvbW1hbmRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXhlY3V0ZUNvbW1hbmQoZXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3M6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLCBleGVjdXRlQ2hhcnRDb21tYW5kQXJncyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIG1ldGhvZCB0byBjaG9vc2Ugb25lIG9mIHRoZSBjdXJzb3JzIGFzIGFjdGl2ZSB0b29sIGJ5IGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0Q3Vyc29yKGN1cnNvckluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAvL2xldCBjb21tYW5kQXJndW1lbnRzID0gbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcyxDaGFydENvbW1hbmRUeXBlLnNlbGVjdEN1cnNvciwgbnVsbCwge2N1cnNvckluZGV4IDogY3Vyc29ySW5kZXh9KTtcclxuICAgICAgICAvL3RoaXMuZXhlY3V0ZUNvbW1hbmQoY29tbWFuZEFyZ3VtZW50cyk7XHJcbiAgICAgICAgbGV0IGNvbW1hbmRBcmd1bWVudHMgPSBuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnRvZ2dsZUJveFpvb20sIG51bGwsIHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5leGVjdXRlQ29tbWFuZChjb21tYW5kQXJndW1lbnRzKTtcclxuICAgICAgICBjb21tYW5kQXJndW1lbnRzID0gbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS50b2dnbGVQYW5uaW5nLCBudWxsLCB7IGVuYWJsZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZUNvbW1hbmQoY29tbWFuZEFyZ3VtZW50cyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmVTdHJhdGVnaWVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBBeGlzUGFubmluZ1N0cmF0ZWd5KHRoaXMpKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMucHVzaChuZXcgQ3Vyc29ySW50ZXJhY3Rpb25TdHJhdGVneSh0aGlzLCBjdXJzb3JJbmRleCkpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBDdXJzb3JEcmFnU3RyYXRlZ3kodGhpcywgY3Vyc29ySW5kZXgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1ldGhvZCB0byBzZXQgcGFubmluZyBhcyBhY3RpdmUgdG9vbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFBhbm5pbmcoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZVN0cmF0ZWdpZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzLnB1c2gobmV3IEF4aXNQYW5uaW5nU3RyYXRlZ3kodGhpcykpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBDaGFydFBhbm5pbmdTdHJhdGVneSh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzLnB1c2gobmV3IEN1cnNvckRyYWdTdHJhdGVneSh0aGlzLCAwKSk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUudG9nZ2xlQm94Wm9vbSwgbnVsbCwgeyBib3hab29tRW5hYmxlZDogZmFsc2UgfSkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUudG9nZ2xlUGFubmluZywgbnVsbCwgeyBwYW5uaW5nRW5hYmxlZDogZmFsc2UgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICptZXRob2QgdG8gc2V0IGJveCB6b29tIGFzIGFjdGl2ZSB0b29sXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Qm94Wm9vbSgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlU3RyYXRlZ2llcygpO1xyXG5cclxuICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMucHVzaChuZXcgQXhpc1Bhbm5pbmdTdHJhdGVneSh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzLnVuc2hpZnQobmV3IENoYXJ0Qm94Wm9vbVN0cmF0ZWd5KHRoaXMpKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMucHVzaChuZXcgQ3Vyc29yRHJhZ1N0cmF0ZWd5KHRoaXMsIDApKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsIG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUudG9nZ2xlQm94Wm9vbSwgbnVsbCwgeyBib3hab29tRW5hYmxlZDogdHJ1ZSB9KSk7XHJcbiAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQucmFpc2UodGhpcywgbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS50b2dnbGVQYW5uaW5nLCBudWxsLCB7IHBhbm5pbmdFbmFibGVkOiBmYWxzZSB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKnJlbW92ZXMgYWxsIGFjdGl2ZSBzdHJhdGVneXMgdGhhdCBhcmUgaW4gcGxhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhckFjdGl2ZVN0cmF0ZWdpZXMoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzID0gW107XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzLnB1c2gobmV3IENoYXJ0SWRsZVN0cmF0ZWd5KHRoaXMpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVXNlckludGVyYWN0aW9uQ29udHJvbGxlciwgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLCBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzLCBDaGFydENvbW1hbmRUeXBlLCBNb3VzZUFjdGlvblR5cGUgfSJdfQ==