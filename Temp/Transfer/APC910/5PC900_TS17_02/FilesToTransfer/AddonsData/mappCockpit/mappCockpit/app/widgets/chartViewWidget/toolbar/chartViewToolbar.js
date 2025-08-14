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
define(["require", "exports", "../../common/widgetBase", "../../common/themeProvider", "../../../common/directoryProvider", "../../../framework/events", "../../common/states/cursorStates", "../../common/states/chartViewToolbarStates", "../chartViewWidget", "./componentDefaultDefinition"], function (require, exports, widgetBase_1, themeProvider_1, directoryProvider_1, events_1, cursorStates_1, chartViewToolbarStates_1, chartViewWidget_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Enum of ChartViewToolbarButtonIds
     *
     * @enum {number}
     */
    var ChartViewToolbarButtonId;
    (function (ChartViewToolbarButtonId) {
        ChartViewToolbarButtonId["RefCursor1"] = "RefCursor1";
        ChartViewToolbarButtonId["RefCursor2"] = "RefCursor2";
        ChartViewToolbarButtonId["Panning"] = "Panning";
        ChartViewToolbarButtonId["BoxZoom"] = "BoxZoom";
        ChartViewToolbarButtonId["ZoomX"] = "ZoomX";
        ChartViewToolbarButtonId["ZoomY"] = "ZoomY";
        ChartViewToolbarButtonId["ZoomXY"] = "ZoomXY";
        ChartViewToolbarButtonId["ResetZoom"] = "ResetZoom";
        ChartViewToolbarButtonId["AutoScale"] = "AutoScale";
    })(ChartViewToolbarButtonId || (ChartViewToolbarButtonId = {}));
    exports.ChartViewToolbarButtonId = ChartViewToolbarButtonId;
    var EventToolbarButtonClicked = /** @class */ (function (_super) {
        __extends(EventToolbarButtonClicked, _super);
        function EventToolbarButtonClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventToolbarButtonClicked;
    }(events_1.TypedEvent));
    exports.EventToolbarButtonClicked = EventToolbarButtonClicked;
    ;
    var EventToolbarButtonClickedArgs = /** @class */ (function () {
        function EventToolbarButtonClickedArgs(selectedButton, groupNumber) {
            this.groupNumber = 0;
            this.groupNumber = groupNumber;
            this.selectedButton = selectedButton;
        }
        return EventToolbarButtonClickedArgs;
    }());
    /**
     *Toolbar for ChartViewWidget
     *
     * @class ChartViewToolbar
     * @extends {WidgetBase}
     * @implements {IChartViewToolbar}
     */
    var ChartViewToolbar = /** @class */ (function (_super) {
        __extends(ChartViewToolbar, _super);
        function ChartViewToolbar() {
            var _this = _super.call(this) || this;
            _this.toolbarButtonGroup1 = [];
            _this.toolbarButtonGroup2 = [];
            _this.toolbarButtonGroup3 = [];
            // holds the current cursor states values. We initialize the member for default. The effective initialization takes place when the external shared instance
            // of the cursor states is created and reflected through the curorStates setter!
            _this._cursorStates = new cursorStates_1.CursorStates();
            _this._toolState = new chartViewToolbarStates_1.ChartViewToolState();
            _this._zoomDirectionState = new chartViewToolbarStates_1.ChartViewZoomDirectionState();
            _this.eventToolbarButtonClicked = new EventToolbarButtonClicked();
            return _this;
        }
        /**
         * Dispose the chart view toolbar
         *
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            var toolbar = this.getToolbarInstance();
            if (toolbar != undefined) {
                toolbar.destroy();
            }
        };
        ChartViewToolbar.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.toolbarButtonGroup1.push(ChartViewToolbarButtonId.RefCursor1);
            this.toolbarButtonGroup1.push(ChartViewToolbarButtonId.RefCursor2);
            this.toolbarButtonGroup3.push(ChartViewToolbarButtonId.Panning);
            this.toolbarButtonGroup3.push(ChartViewToolbarButtonId.BoxZoom);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomX);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomXY);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomY);
        };
        ChartViewToolbar.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        Object.defineProperty(ChartViewToolbar.prototype, "cursorsStates", {
            /**
             * Gets the cursors states
             *
             * @protected
             * @type {CursorStates}
             * @memberof ChartViewToolbar
             */
            get: function () {
                return this._cursorStates;
            },
            /**
             * Sets the cursors states. The method is called automatically whenever a cursor state has been changed externally.
             *
             * @protected
             * @memberof ChartViewToolbar
             */
            set: function (cursorStates) {
                // update the backup field
                this._cursorStates = cursorStates;
                this.updateOnCursorStatesChanges(cursorStates);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewToolbar.prototype, "toolState", {
            /**
             * Gets the tool state
             *
             * @protected
             * @type {ChartViewToolState}
             * @memberof ChartViewToolbar
             */
            get: function () {
                return this._toolState;
            },
            /**
             * Sets the tool state. The method is called automatically whenever a tool state has been changed externally.
             *
             * @protected
             * @memberof ChartViewToolbar
             */
            set: function (toolState) {
                // update the backup field
                this._toolState = toolState;
                this.updateOnChartViewToolStateChange(toolState);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewToolbar.prototype, "zoomDirectionState", {
            /**
             * Gets the zoom direction state
             *
             * @protected
             * @type {ChartViewZoomDirectionState}
             * @memberof ChartViewToolbar
             */
            get: function () {
                return this._zoomDirectionState;
            },
            /**
             * Sets the zoom direction state. The method is called automatically whenever a zoom direction state has been changed externally.
             *
             * @protected
             * @memberof ChartViewToolbar
             */
            set: function (zoomDirectionState) {
                // update the backup field
                this._zoomDirectionState = zoomDirectionState;
                this.updateOnChartViewZoomDirectionStateChange(zoomDirectionState);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the cursor states.
         *
         * @protected
         * @param {CursorStates} cursorStates
         * @memberof ChartBase
         */
        ChartViewToolbar.prototype.updateCursorStates = function (cursorStates) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        /**
         * Updates the tool state.
         *
         * @protected
         * @param {ChartViewToolState} toolState
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.updateToolState = function (toolState) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        /**
         * Updates the zoom direction state.
         *
         * @protected
         * @param {ChartViewZoomDirectionState} zoomDirectionState
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.updateZoomDirectionState = function (zoomDirectionState) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        /**
         * create the ChartViewToolbars Layout
         *
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.createLayout = function () {
            var _this = this;
            this.addLayoutDivs();
            $(this.mainDiv).ejToolbar({
                width: "100%",
                enableSeparator: true,
                height: 33,
                click: function (args) { return _this.onChartViewToolbarClick(args.currentTarget.id); }
            });
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                toolbarInstance.selectItemByID(ChartViewToolbarButtonId.RefCursor1);
                toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomXY);
            }
        };
        /**
         * add the needed html code for the toolbar
         *
         * @private
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.addLayoutDivs = function () {
            $(this.mainDiv).append("<ul> " +
                "<li id='" + ChartViewToolbarButtonId.RefCursor1 + "' style='background-image: url(" + this.getImagePath("cursor1.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Cursor 1'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.RefCursor2 + "' style='background-image: url(" + this.getImagePath("cursor2.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Cursor 2'> </li>" +
                "</ul>" +
                "<ul> " +
                "<li id='" + ChartViewToolbarButtonId.Panning + "' style='background-image: url(" + this.getImagePath("panning.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Panning'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.BoxZoom + "' style='background-image: url(" + this.getImagePath("box_zoom.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='BoxZoom'> </li>" +
                "</ul>" +
                "<ul> " +
                "<li id='" + ChartViewToolbarButtonId.ZoomXY + "' style='background-image: url(" + this.getImagePath("zoomXY.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Zoom XY '> </li>" +
                "<li id='" + ChartViewToolbarButtonId.ZoomX + "' style='background-image: url(" + this.getImagePath("zoomX.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Zoom X'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.ZoomY + "' style='background-image: url(" + this.getImagePath("zoomY.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Zoom Y'> </li>" +
                "</ul>" +
                "<ul> " +
                "<li id='" + ChartViewToolbarButtonId.AutoScale + "' style='background-image: url(" + this.getImagePath("zoom_autoscale.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Auto Scale'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.ResetZoom + "' style='background-image: url(" + this.getImagePath("zoom_reset_all.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Reset All'> </li>" +
                "</ul>");
        };
        /**
         * return the Path of an image by its name
         *
         * @private
         * @param {string} imageName
         * @returns {string}
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.getImagePath = function (imageName) {
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "chartViewWidget/style/images/toolbar/" + imageName);
        };
        /**
         *  deselect all toolbar items and remove highlighting
         *
         * @private
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.deselectToolbarGroup = function (toolbarGroup) {
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                for (var i = 0; i < toolbarGroup.length; i++) {
                    toolbarInstance.deselectItemByID(toolbarGroup[i]);
                }
            }
        };
        /**
         * react on a mouse click on one of the toolbars buttons
         *
         * @private
         * @param {ChartViewToolbarButtonId} buttonID
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.onChartViewToolbarClick = function (buttonID) {
            var toolstate = this._toolState;
            var zoomDirectionState = this._zoomDirectionState;
            switch (buttonID) {
                case ChartViewToolbarButtonId.BoxZoom:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM;
                    break;
                case ChartViewToolbarButtonId.Panning:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING;
                    break;
                case ChartViewToolbarButtonId.RefCursor1:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
                    this.cursorsStates.setSelected(0, true);
                    break;
                case ChartViewToolbarButtonId.RefCursor2:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
                    this.cursorsStates.setSelected(1, true);
                    break;
                case ChartViewToolbarButtonId.ZoomX:
                    zoomDirectionState.zoomDirection = chartViewWidget_1.ZoomDirection.X;
                    break;
                case ChartViewToolbarButtonId.ZoomY:
                    zoomDirectionState.zoomDirection = chartViewWidget_1.ZoomDirection.Y;
                    break;
                case ChartViewToolbarButtonId.ZoomXY:
                    zoomDirectionState.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
                    break;
                case ChartViewToolbarButtonId.AutoScale:
                    //TODO: remove Event and find solution via states
                    var eventToolbarButtonClickedArgs = new EventToolbarButtonClickedArgs(0, 3);
                    this.eventToolbarButtonClicked.raise(this, eventToolbarButtonClickedArgs);
                    break;
                case ChartViewToolbarButtonId.ResetZoom:
                    //TODO: remove Event and find solution via states
                    var eventToolbarButtonClickedArgs2 = new EventToolbarButtonClickedArgs(0, 4);
                    this.eventToolbarButtonClicked.raise(this, eventToolbarButtonClickedArgs2);
                    break;
            }
            // Update the states
            this.updateCursorStates(this.cursorsStates);
            this.updateToolState(toolstate);
            this.updateZoomDirectionState(zoomDirectionState);
        };
        /**
         * highlight one of the cursor button as the selected one
         *
         * @private
         * @param {*} index
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.setCursorButtonSelected = function (index) {
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                var firstFreqCursor = 2;
                var secondFreqCursor = 3;
                this.deselectToolbarGroup(this.toolbarButtonGroup1);
                if (index < 4 && toolbarInstance.selectItemByID) {
                    if (index == secondFreqCursor) {
                        index = 1;
                    }
                    else if (index == firstFreqCursor) {
                        index = 0;
                    }
                    toolbarInstance.selectItemByID(this.toolbarButtonGroup1[index]);
                }
            }
        };
        ChartViewToolbar.prototype.setChartViewToolSelected = function (chartViewToolState) {
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                this.deselectToolbarGroup(this.toolbarButtonGroup3);
                switch (chartViewToolState) {
                    case chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.Panning);
                        break;
                    case chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.BoxZoom);
                        break;
                }
            }
        };
        ChartViewToolbar.prototype.getToolbarInstance = function () {
            var instance = undefined;
            try {
                instance = $(this.mainDiv).ejToolbar("instance");
            }
            catch (e) {
                console.error("ToolbarInstance not available");
            }
            return instance;
        };
        ChartViewToolbar.prototype.setZoomDirectionButtonSelected = function (chartViewZoomDirectionState) {
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                this.deselectToolbarGroup(this.toolbarButtonGroup2);
                switch (chartViewZoomDirectionState) {
                    case chartViewWidget_1.ZoomDirection.X:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomX);
                        break;
                    case chartViewWidget_1.ZoomDirection.Y:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomY);
                        break;
                    case chartViewWidget_1.ZoomDirection.XY:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomXY);
                        break;
                }
            }
        };
        ChartViewToolbar.prototype.updateOnCursorStatesChanges = function (modifiedStates) {
            this.setCursorButtonSelected(modifiedStates.getSelectedCursorIndex());
        };
        ChartViewToolbar.prototype.updateOnChartViewToolStateChange = function (modifiedStates) {
            this.setChartViewToolSelected(modifiedStates.selectedTool);
        };
        ChartViewToolbar.prototype.updateOnChartViewZoomDirectionStateChange = function (modifiedStates) {
            this.setZoomDirectionButtonSelected(modifiedStates.zoomDirection);
        };
        return ChartViewToolbar;
    }(widgetBase_1.WidgetBase));
    exports.ChartViewToolbar = ChartViewToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3VG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvdG9vbGJhci9jaGFydFZpZXdUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVQTs7OztPQUlHO0lBQ0gsSUFBSyx3QkFVSjtJQVZELFdBQUssd0JBQXdCO1FBQ3pCLHFEQUF5QixDQUFBO1FBQ3pCLHFEQUF5QixDQUFBO1FBQ3pCLCtDQUFtQixDQUFBO1FBQ25CLCtDQUFtQixDQUFBO1FBQ25CLDJDQUFlLENBQUE7UUFDZiwyQ0FBZSxDQUFBO1FBQ2YsNkNBQWlCLENBQUE7UUFDakIsbURBQXVCLENBQUE7UUFDdkIsbURBQXVCLENBQUE7SUFDM0IsQ0FBQyxFQVZJLHdCQUF3QixLQUF4Qix3QkFBd0IsUUFVNUI7SUF5WnlCLDREQUF3QjtJQXJabEQ7UUFBd0MsNkNBQTREO1FBQXBHOztRQUFzRyxDQUFDO1FBQUQsZ0NBQUM7SUFBRCxDQUFDLEFBQXZHLENBQXdDLG1CQUFVLEdBQXFEO0lBcVpuRCw4REFBeUI7SUFyWjBCLENBQUM7SUFHeEc7UUFJSSx1Q0FBWSxjQUFtQixFQUFFLFdBQW1CO1lBRnBELGdCQUFXLEdBQVksQ0FBQyxDQUFDO1lBR3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLENBQUM7UUFFTCxvQ0FBQztJQUFELENBQUMsQUFURCxJQVNDO0lBRUQ7Ozs7OztPQU1HO0lBQ0g7UUFBK0Isb0NBQVU7UUFlckM7WUFBQSxZQUNJLGlCQUFPLFNBR1Y7WUFmRCx5QkFBbUIsR0FBZ0MsRUFBRSxDQUFDO1lBQ3RELHlCQUFtQixHQUFnQyxFQUFFLENBQUM7WUFDdEQseUJBQW1CLEdBQWdDLEVBQUUsQ0FBQztZQUd0RCwySkFBMko7WUFDM0osZ0ZB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QUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQTlYRCxDQUErQix1QkFBVSxHQThYeEM7SUFFTyw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2hhcnRWaWV3VG9vbGJhciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY2hhcnRWaWV3VG9vbGJhckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RoZW1lUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3VG9vbFN0YXRlLCBDaGFydFZpZXdUb29sU3RhdGVFbnVtLCBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N0YXRlcy9jaGFydFZpZXdUb29sYmFyU3RhdGVzXCI7XHJcbmltcG9ydCB7IFpvb21EaXJlY3Rpb24gfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuXHJcbi8qKlxyXG4gKiBFbnVtIG9mIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZHNcclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklke1xyXG4gICAgUmVmQ3Vyc29yMSA9IFwiUmVmQ3Vyc29yMVwiLFxyXG4gICAgUmVmQ3Vyc29yMiA9IFwiUmVmQ3Vyc29yMlwiLFxyXG4gICAgUGFubmluZyA9IFwiUGFubmluZ1wiLFxyXG4gICAgQm94Wm9vbSA9IFwiQm94Wm9vbVwiLFxyXG4gICAgWm9vbVggPSBcIlpvb21YXCIsXHJcbiAgICBab29tWSA9IFwiWm9vbVlcIixcclxuICAgIFpvb21YWSA9IFwiWm9vbVhZXCIsXHJcbiAgICBSZXNldFpvb20gPSBcIlJlc2V0Wm9vbVwiLFxyXG4gICAgQXV0b1NjYWxlID0gXCJBdXRvU2NhbGVcIlxyXG59XHJcblxyXG5cclxuXHJcbmNsYXNzIEV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQgZXh0ZW5kcyBUeXBlZEV2ZW50IDxDaGFydFZpZXdUb29sYmFyLCBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncz4ge307XHJcblxyXG5cclxuY2xhc3MgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3Mge1xyXG4gICAgc2VsZWN0ZWRCdXR0b246IGFueTtcclxuICAgIGdyb3VwTnVtYmVyIDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RlZEJ1dHRvbjogYW55LCBncm91cE51bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ncm91cE51bWJlciA9IGdyb3VwTnVtYmVyO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRCdXR0b24gPSBzZWxlY3RlZEJ1dHRvbjtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKlRvb2xiYXIgZm9yIENoYXJ0Vmlld1dpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgQ2hhcnRWaWV3VG9vbGJhclxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lDaGFydFZpZXdUb29sYmFyfVxyXG4gKi9cclxuY2xhc3MgQ2hhcnRWaWV3VG9vbGJhciBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJQ2hhcnRWaWV3VG9vbGJhciB7XHJcbiAgICBcclxuICAgIGV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQ6IEV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQ7XHJcblxyXG4gICAgdG9vbGJhckJ1dHRvbkdyb3VwMSA6IENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZFtdID0gW107XHJcbiAgICB0b29sYmFyQnV0dG9uR3JvdXAyIDogQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkW10gPSBbXTtcclxuICAgIHRvb2xiYXJCdXR0b25Hcm91cDMgOiBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWRbXSA9IFtdO1xyXG5cclxuXHJcbiAgICAvLyBob2xkcyB0aGUgY3VycmVudCBjdXJzb3Igc3RhdGVzIHZhbHVlcy4gV2UgaW5pdGlhbGl6ZSB0aGUgbWVtYmVyIGZvciBkZWZhdWx0LiBUaGUgZWZmZWN0aXZlIGluaXRpYWxpemF0aW9uIHRha2VzIHBsYWNlIHdoZW4gdGhlIGV4dGVybmFsIHNoYXJlZCBpbnN0YW5jZVxyXG4gICAgLy8gb2YgdGhlIGN1cnNvciBzdGF0ZXMgaXMgY3JlYXRlZCBhbmQgcmVmbGVjdGVkIHRocm91Z2ggdGhlIGN1cm9yU3RhdGVzIHNldHRlciFcclxuICAgIHByb3RlY3RlZCBfY3Vyc29yU3RhdGVzOiBDdXJzb3JTdGF0ZXMgPSBuZXcgQ3Vyc29yU3RhdGVzKCk7XHJcbiAgICBwcml2YXRlIF90b29sU3RhdGU6IENoYXJ0Vmlld1Rvb2xTdGF0ZSA9IG5ldyBDaGFydFZpZXdUb29sU3RhdGUoKTtcclxuICAgIHByaXZhdGUgX3pvb21EaXJlY3Rpb25TdGF0ZTogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlID0gbmV3IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQgPSBuZXcgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZCgpO1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBjaGFydCB2aWV3IHRvb2xiYXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICBsZXQgdG9vbGJhciA9IHRoaXMuZ2V0VG9vbGJhckluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYodG9vbGJhciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0b29sYmFyLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDEucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMSlcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDEucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMilcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDMucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUGFubmluZylcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDMucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuQm94Wm9vbSlcclxuXHJcbiAgICAgICAgdGhpcy50b29sYmFyQnV0dG9uR3JvdXAyLnB1c2goQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YKVxyXG4gICAgICAgIHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMi5wdXNoKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWFkpXHJcbiAgICAgICAgdGhpcy50b29sYmFyQnV0dG9uR3JvdXAyLnB1c2goQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21ZKVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJzb3JzIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtDdXJzb3JTdGF0ZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGN1cnNvcnNTdGF0ZXMoKSA6IEN1cnNvclN0YXRlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY3Vyc29ycyBzdGF0ZXMuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSBjdXJzb3Igc3RhdGUgaGFzIGJlZW4gY2hhbmdlZCBleHRlcm5hbGx5LiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0IGN1cnNvcnNTdGF0ZXMoY3Vyc29yU3RhdGVzIDogQ3Vyc29yU3RhdGVzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBiYWNrdXAgZmllbGRcclxuICAgICAgICB0aGlzLl9jdXJzb3JTdGF0ZXMgPSBjdXJzb3JTdGF0ZXM7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlT25DdXJzb3JTdGF0ZXNDaGFuZ2VzKGN1cnNvclN0YXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0b29sIHN0YXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge0NoYXJ0Vmlld1Rvb2xTdGF0ZX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgICBwcm90ZWN0ZWQgZ2V0IHRvb2xTdGF0ZSgpIDogQ2hhcnRWaWV3VG9vbFN0YXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbFN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdG9vbCBzdGF0ZS4gVGhlIG1ldGhvZCBpcyBjYWxsZWQgYXV0b21hdGljYWxseSB3aGVuZXZlciBhIHRvb2wgc3RhdGUgaGFzIGJlZW4gY2hhbmdlZCBleHRlcm5hbGx5LlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXQgdG9vbFN0YXRlKHRvb2xTdGF0ZSA6IENoYXJ0Vmlld1Rvb2xTdGF0ZSkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgYmFja3VwIGZpZWxkXHJcbiAgICAgICAgdGhpcy5fdG9vbFN0YXRlID0gdG9vbFN0YXRlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXBkYXRlT25DaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UodG9vbFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHpvb20gZGlyZWN0aW9uIHN0YXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge0NoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgICBwcm90ZWN0ZWQgZ2V0IHpvb21EaXJlY3Rpb25TdGF0ZSgpIDogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fem9vbURpcmVjdGlvblN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgem9vbSBkaXJlY3Rpb24gc3RhdGUuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSB6b29tIGRpcmVjdGlvbiBzdGF0ZSBoYXMgYmVlbiBjaGFuZ2VkIGV4dGVybmFsbHkuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNldCB6b29tRGlyZWN0aW9uU3RhdGUoem9vbURpcmVjdGlvblN0YXRlIDogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlKSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBiYWNrdXAgZmllbGRcclxuICAgICAgICB0aGlzLl96b29tRGlyZWN0aW9uU3RhdGUgPSB6b29tRGlyZWN0aW9uU3RhdGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVPbkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZUNoYW5nZSh6b29tRGlyZWN0aW9uU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY3Vyc29yIHN0YXRlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gY3Vyc29yU3RhdGVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVDdXJzb3JTdGF0ZXMoY3Vyc29yU3RhdGVzOiBDdXJzb3JTdGF0ZXMpe1xyXG4gICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IGRpc3BhdGNoZXMgdGhlIG1ldGhvZCBjYWxsIHRvIGJvdW5kIHRhcmdldHNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRvb2wgc3RhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtDaGFydFZpZXdUb29sU3RhdGV9IHRvb2xTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVRvb2xTdGF0ZSh0b29sU3RhdGU6IENoYXJ0Vmlld1Rvb2xTdGF0ZSl7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogZGlzcGF0Y2hlcyB0aGUgbWV0aG9kIGNhbGwgdG8gYm91bmQgdGFyZ2V0c1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgem9vbSBkaXJlY3Rpb24gc3RhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGV9IHpvb21EaXJlY3Rpb25TdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVpvb21EaXJlY3Rpb25TdGF0ZSh6b29tRGlyZWN0aW9uU3RhdGU6IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSl7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogZGlzcGF0Y2hlcyB0aGUgbWV0aG9kIGNhbGwgdG8gYm91bmQgdGFyZ2V0c1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIHRoZSBDaGFydFZpZXdUb29sYmFycyBMYXlvdXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKXtcclxuICAgICAgICB0aGlzLmFkZExheW91dERpdnMoKTtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUb29sYmFyKHtcclxuICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcclxuICAgICAgICAgICAgIGVuYWJsZVNlcGFyYXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgIGhlaWdodDogMzMsXHJcbiAgICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHRoaXMub25DaGFydFZpZXdUb29sYmFyQ2xpY2soYXJncy5jdXJyZW50VGFyZ2V0LmlkKVxyXG4gXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0b29sYmFySW5zdGFuY2UgPSB0aGlzLmdldFRvb2xiYXJJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKHRvb2xiYXJJbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0b29sYmFySW5zdGFuY2Uuc2VsZWN0SXRlbUJ5SUQoQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjEpO1xyXG4gICAgICAgICAgICB0b29sYmFySW5zdGFuY2Uuc2VsZWN0SXRlbUJ5SUQoQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YWSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgdGhlIG5lZWRlZCBodG1sIGNvZGUgZm9yIHRoZSB0b29sYmFyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTGF5b3V0RGl2cygpe1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5hcHBlbmQoXHJcbiAgICAgICAgICAgIFwiPHVsPiBcIiArIFxyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjErIFwiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJjdXJzb3IxLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nQ3Vyc29yIDEnPiA8L2xpPlwiICsgXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMisgXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcImN1cnNvcjIuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdDdXJzb3IgMic+IDwvbGk+XCIgK1xyXG4gICAgICAgICAgICBcIjwvdWw+XCIgK1xyXG5cclxuICAgICAgICAgICAgXCI8dWw+IFwiICsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlBhbm5pbmcrIFwiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJwYW5uaW5nLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nUGFubmluZyc+IDwvbGk+XCIgK1xyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLkJveFpvb20rIFwiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJib3hfem9vbS5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J0JveFpvb20nPiA8L2xpPlwiICtcclxuXHJcbiAgICAgICAgICAgIFwiPC91bD5cIiArXHJcblxyXG4gICAgICAgICAgICBcIjx1bD4gXCIgK1xyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YWStcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiem9vbVhZLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nWm9vbSBYWSAnPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWCsgXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcInpvb21YLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nWm9vbSBYJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVkrIFwiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJ6b29tWS5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J1pvb20gWSc+IDwvbGk+XCIgK1xyXG4gICAgICAgICAgICBcIjwvdWw+XCIgK1xyXG5cclxuICAgICAgICAgICAgXCI8dWw+IFwiICsgXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuQXV0b1NjYWxlK1wiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJ6b29tX2F1dG9zY2FsZS5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J0F1dG8gU2NhbGUnPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZXNldFpvb20rXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcInpvb21fcmVzZXRfYWxsLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nUmVzZXQgQWxsJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPC91bD5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm4gdGhlIFBhdGggb2YgYW4gaW1hZ2UgYnkgaXRzIG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlTmFtZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SW1hZ2VQYXRoKGltYWdlTmFtZTogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBUaGVtZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGhlbWVkRmlsZVBhdGgoXCIuLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwiY2hhcnRWaWV3V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiICsgaW1hZ2VOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBkZXNlbGVjdCBhbGwgdG9vbGJhciBpdGVtcyBhbmQgcmVtb3ZlIGhpZ2hsaWdodGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlc2VsZWN0VG9vbGJhckdyb3VwKHRvb2xiYXJHcm91cDogQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkW10pe1xyXG4gICAgICAgIGxldCB0b29sYmFySW5zdGFuY2UgPSB0aGlzLmdldFRvb2xiYXJJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKHRvb2xiYXJJbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdG9vbGJhckdyb3VwLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLmRlc2VsZWN0SXRlbUJ5SUQodG9vbGJhckdyb3VwW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWN0IG9uIGEgbW91c2UgY2xpY2sgb24gb25lIG9mIHRoZSB0b29sYmFycyBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkfSBidXR0b25JRFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0Vmlld1Rvb2xiYXJDbGljayhidXR0b25JRCA6IENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZCl7XHJcblxyXG4gICAgICAgIGxldCB0b29sc3RhdGUgPSB0aGlzLl90b29sU3RhdGU7XHJcbiAgICAgICAgbGV0IHpvb21EaXJlY3Rpb25TdGF0ZSA9IHRoaXMuX3pvb21EaXJlY3Rpb25TdGF0ZTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChidXR0b25JRCl7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLkJveFpvb206XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5CT1haT09NO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlBhbm5pbmc6XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5QQU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjE6XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5DVVJTT1JTO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKDAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjI6XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5DVVJTT1JTO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKDEsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YOlxyXG4gICAgICAgICAgICAgICAgem9vbURpcmVjdGlvblN0YXRlLnpvb21EaXJlY3Rpb24gPSBab29tRGlyZWN0aW9uLlg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVk6XHJcbiAgICAgICAgICAgICAgICB6b29tRGlyZWN0aW9uU3RhdGUuem9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWFk6XHJcbiAgICAgICAgICAgICAgICB6b29tRGlyZWN0aW9uU3RhdGUuem9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWFk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLkF1dG9TY2FsZTpcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVtb3ZlIEV2ZW50IGFuZCBmaW5kIHNvbHV0aW9uIHZpYSBzdGF0ZXNcclxuICAgICAgICAgICAgICAgIGxldCBldmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJnczogRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MgPSBuZXcgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MoMCwgMylcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZC5yYWlzZSh0aGlzLCBldmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVzZXRab29tOlxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZW1vdmUgRXZlbnQgYW5kIGZpbmQgc29sdXRpb24gdmlhIHN0YXRlc1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzMjogRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MgPSBuZXcgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MoMCwgNClcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZC5yYWlzZSh0aGlzLCBldmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJnczIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIHN0YXRlc1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKHRoaXMuY3Vyc29yc1N0YXRlcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sU3RhdGUodG9vbHN0YXRlKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVpvb21EaXJlY3Rpb25TdGF0ZSh6b29tRGlyZWN0aW9uU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGlnaGxpZ2h0IG9uZSBvZiB0aGUgY3Vyc29yIGJ1dHRvbiBhcyB0aGUgc2VsZWN0ZWQgb25lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q3Vyc29yQnV0dG9uU2VsZWN0ZWQoaW5kZXgpe1xyXG4gICAgICAgIGxldCB0b29sYmFySW5zdGFuY2UgPSB0aGlzLmdldFRvb2xiYXJJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKHRvb2xiYXJJbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdEZyZXFDdXJzb3IgPSAyO1xyXG4gICAgICAgICAgICBjb25zdCBzZWNvbmRGcmVxQ3Vyc29yID0gMztcclxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdFRvb2xiYXJHcm91cCh0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDEpO1xyXG4gICAgICAgICAgICBpZihpbmRleCA8IDQgJiYgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKXtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSBzZWNvbmRGcmVxQ3Vyc29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPT0gZmlyc3RGcmVxQ3Vyc29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMVtpbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q2hhcnRWaWV3VG9vbFNlbGVjdGVkKGNoYXJ0Vmlld1Rvb2xTdGF0ZSA6IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0pe1xyXG4gICAgICAgIGxldCB0b29sYmFySW5zdGFuY2UgPSB0aGlzLmdldFRvb2xiYXJJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKHRvb2xiYXJJbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0VG9vbGJhckdyb3VwKHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMyk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNoYXJ0Vmlld1Rvb2xTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLlBBTk5JTkc6XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5QYW5uaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uQk9YWk9PTTpcclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFySW5zdGFuY2Uuc2VsZWN0SXRlbUJ5SUQoQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLkJveFpvb20pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VG9vbGJhckluc3RhbmNlKCk6IGVqLlRvb2xiYXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGluc3RhbmNlID0gJCh0aGlzLm1haW5EaXYpLmVqVG9vbGJhcihcImluc3RhbmNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRvb2xiYXJJbnN0YW5jZSBub3QgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRab29tRGlyZWN0aW9uQnV0dG9uU2VsZWN0ZWQoY2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlOiBab29tRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHRvb2xiYXJJbnN0YW5jZSA9IHRoaXMuZ2V0VG9vbGJhckluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYodG9vbGJhckluc3RhbmNlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RUb29sYmFyR3JvdXAodGhpcy50b29sYmFyQnV0dG9uR3JvdXAyKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoY2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgWm9vbURpcmVjdGlvbi5YOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgWm9vbURpcmVjdGlvbi5ZOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgWm9vbURpcmVjdGlvbi5YWTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVhZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICBcclxuICAgIHByaXZhdGUgdXBkYXRlT25DdXJzb3JTdGF0ZXNDaGFuZ2VzKG1vZGlmaWVkU3RhdGVzIDogQ3Vyc29yU3RhdGVzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JCdXR0b25TZWxlY3RlZChtb2RpZmllZFN0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlT25DaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UobW9kaWZpZWRTdGF0ZXM6IENoYXJ0Vmlld1Rvb2xTdGF0ZSl7XHJcbiAgICAgICAgdGhpcy5zZXRDaGFydFZpZXdUb29sU2VsZWN0ZWQobW9kaWZpZWRTdGF0ZXMuc2VsZWN0ZWRUb29sKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU9uQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlQ2hhbmdlKG1vZGlmaWVkU3RhdGVzOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUpe1xyXG4gICAgICAgIHRoaXMuc2V0Wm9vbURpcmVjdGlvbkJ1dHRvblNlbGVjdGVkKG1vZGlmaWVkU3RhdGVzLnpvb21EaXJlY3Rpb24pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0NoYXJ0Vmlld1Rvb2xiYXIsIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZCwgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZH0iXX0=