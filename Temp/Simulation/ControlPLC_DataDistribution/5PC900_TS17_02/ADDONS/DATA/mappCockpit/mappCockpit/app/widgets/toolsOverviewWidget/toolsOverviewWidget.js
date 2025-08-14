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
define(["require", "exports", "../common/overviewTreeGridWidgetBase", "../common/viewTypeProvider", "../loggerWidget/loggerProvider", "./componentDefaultDefinition", "../common/overviewItem"], function (require, exports, overviewTreeGridWidgetBase_1, viewTypeProvider_1, loggerProvider_1, componentDefaultDefinition_1, overviewItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the ToolsOverviewWidget
     *
     * @class ToolsOverviewWidget
     * @extends {OverviewTreeGridWidgetBase}
     * @implements {IToolsOverviewWidget}
     */
    var ToolsOverviewWidget = /** @class */ (function (_super) {
        __extends(ToolsOverviewWidget, _super);
        function ToolsOverviewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Drive Log tool text
            _this._networkCommandTraceToolName = "mapp Motion Drive Log";
            return _this;
        }
        /**
         * Returns the header text which one should be shown for this overview widget in the header
         *
         * @protected
         * @returns {string}
         * @memberof ToolsOverviewWidget
         */
        ToolsOverviewWidget.prototype.getHeaderText = function () {
            return "Tools Overview";
        };
        /**
         * Initialize the component
         *
         * @memberof ToolsOverviewWidget
         */
        ToolsOverviewWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        ToolsOverviewWidget.prototype.onToolsIdsUpdated = function (toolComponentIds) {
            var _this = this;
            // clear datasource
            this._dataSource = new Array();
            // set new data
            toolComponentIds.forEach(function (toolComponentId) {
                var toolComponentDisplayName = toolComponentId;
                if (toolComponentId == loggerProvider_1.LoggerProvider.driveLogComponentName) {
                    toolComponentDisplayName = _this._networkCommandTraceToolName; // Show "mapp Motion Drive Log" instead of "DriveLog"
                }
                _this._dataSource.push(new overviewItem_1.OverviewItem(toolComponentId, toolComponentDisplayName));
            });
            // update tree grid
            this.updateTreeGridDataSource();
        };
        /**
         * Returns the column definition for this tree grid widget
         *
         * @protected
         * @returns {{}}
         * @memberof ToolsOverviewWidget
         */
        ToolsOverviewWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: ToolsOverviewWidget.columnName, width: "350" },
                    { field: "commandButtons", headerText: ToolsOverviewWidget.columnExecuteCommand },
                ],
            };
        };
        ToolsOverviewWidget.prototype.getCommandIdsFromItem = function (overviewItem) {
            var availableViews = new Array();
            availableViews.push(viewTypeProvider_1.ViewType.DriveLog);
            return availableViews;
        };
        ToolsOverviewWidget.prototype.getDefaultCommandIdFromItem = function (overviewItem) {
            // TODO get default view from component
            return viewTypeProvider_1.ViewType.DriveLog.toString();
        };
        ToolsOverviewWidget.prototype.getNameForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewType[commandId];
        };
        ToolsOverviewWidget.prototype.getIconClassNameForCommandId = function (commandId) {
            var viewType = parseInt(commandId);
            return viewTypeProvider_1.ViewTypeProvider.getInstance().getIconClassByViewType(viewType);
        };
        ToolsOverviewWidget.prototype.click = function (overviewItem, commandId) {
            this.onExecuteToolCommand(overviewItem.id, overviewItem.displayName, commandId);
        };
        ToolsOverviewWidget.prototype.doubleClick = function (columnName, overviewItem) {
            if (columnName == ToolsOverviewWidget.columnName) {
                var defaultToolCommandId = this.getDefaultCommandIdFromItem(overviewItem);
                this.onExecuteToolCommand(overviewItem.id, overviewItem.displayName, defaultToolCommandId);
            }
        };
        ToolsOverviewWidget.prototype.onExecuteToolCommand = function (toolId, toolDisplayName, commandId) {
            console.info("Command '" + this.getNameForCommandId(commandId) + "' from tool '" + toolDisplayName + "' executed!");
            if (toolId == loggerProvider_1.LoggerProvider.driveLogComponentName) {
                this.executeNetworkCommandTraceCommand(toolId, toolDisplayName, commandId);
            }
        };
        ToolsOverviewWidget.prototype.executeNetworkCommandTraceCommand = function (toolId, toolDisplayName, commandId) {
            var viewType = parseInt(commandId);
            if (viewType == viewTypeProvider_1.ViewType.DriveLog) {
                this.openNetworkCommandTrace(toolId, viewType);
            }
        };
        ToolsOverviewWidget.prototype.openNetworkCommandTrace = function (toolId, viewType) {
            this.onOpenView(toolId, "Drive Log", viewType); // Show "Drive Log" in new view instead of "mapp Motion Drive Log"
        };
        // Column header texts
        ToolsOverviewWidget.columnName = "Name";
        ToolsOverviewWidget.columnExecuteCommand = "Shortcuts";
        return ToolsOverviewWidget;
    }(overviewTreeGridWidgetBase_1.OverviewTreeGridWidgetBase));
    exports.ToolsOverviewWidget = ToolsOverviewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHNPdmVydmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90b29sc092ZXJ2aWV3V2lkZ2V0L3Rvb2xzT3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBOzs7Ozs7T0FNRztJQUNIO1FBQXlDLHVDQUEwQjtRQUFuRTtZQUFBLHFFQWdIQztZQTFHRyxzQkFBc0I7WUFDZCxrQ0FBNEIsR0FBRyx1QkFBdUIsQ0FBQzs7UUF5R25FLENBQUM7UUF2R0c7Ozs7OztXQU1HO1FBQ08sMkNBQWEsR0FBdkI7WUFDSSxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsaURBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVPLCtDQUFpQixHQUF6QixVQUEwQixnQkFBK0I7WUFBekQsaUJBZUM7WUFkRyxtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztZQUU3QyxlQUFlO1lBQ2YsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQUEsZUFBZTtnQkFDcEMsSUFBSSx3QkFBd0IsR0FBRyxlQUFlLENBQUM7Z0JBQy9DLElBQUcsZUFBZSxJQUFJLCtCQUFjLENBQUMscUJBQXFCLEVBQUM7b0JBQ3ZELHdCQUF3QixHQUFHLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLHFEQUFxRDtpQkFDdEg7Z0JBQ0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSwyQkFBWSxDQUFDLGVBQWUsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLENBQUE7WUFDdEYsQ0FBQyxDQUFDLENB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LEdBQUcsTUFBTSxDQUFDO1FBQ3BCLHdDQUFvQixHQUFHLFdBQVcsQ0FBQztRQTRHckQsMEJBQUM7S0FBQSxBQWhIRCxDQUF5Qyx1REFBMEIsR0FnSGxFO0lBaEhZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUb29sc092ZXJ2aWV3V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90b29sc092ZXJ2aWV3V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9vdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5cclxuaW1wb3J0IHsgVmlld1R5cGUsIFZpZXdUeXBlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgTG9nZ2VyUHJvdmlkZXIgfSBmcm9tIFwiLi4vbG9nZ2VyV2lkZ2V0L2xvZ2dlclByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgT3ZlcnZpZXdJdGVtIH0gZnJvbSBcIi4uL2NvbW1vbi9vdmVydmlld0l0ZW1cIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBUb29sc092ZXJ2aWV3V2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUb29sc092ZXJ2aWV3V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lUb29sc092ZXJ2aWV3V2lkZ2V0fVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRvb2xzT3ZlcnZpZXdXaWRnZXQgZXh0ZW5kcyBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUb29sc092ZXJ2aWV3V2lkZ2V0IHtcclxuXHJcbiAgICAvLyBDb2x1bW4gaGVhZGVyIHRleHRzXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbHVtbk5hbWUgPSBcIk5hbWVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgY29sdW1uRXhlY3V0ZUNvbW1hbmQgPSBcIlNob3J0Y3V0c1wiO1xyXG5cclxuICAgIC8vIERyaXZlIExvZyB0b29sIHRleHRcclxuICAgIHByaXZhdGUgX25ldHdvcmtDb21tYW5kVHJhY2VUb29sTmFtZSA9IFwibWFwcCBNb3Rpb24gRHJpdmUgTG9nXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBoZWFkZXIgdGV4dCB3aGljaCBvbmUgc2hvdWxkIGJlIHNob3duIGZvciB0aGlzIG92ZXJ2aWV3IHdpZGdldCBpbiB0aGUgaGVhZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUb29sc092ZXJ2aWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRIZWFkZXJUZXh0KCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJUb29scyBPdmVydmlld1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRvb2xzT3ZlcnZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Ub29sc0lkc1VwZGF0ZWQodG9vbENvbXBvbmVudElkczogQXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgLy8gY2xlYXIgZGF0YXNvdXJjZVxyXG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBuZXcgQXJyYXk8T3ZlcnZpZXdJdGVtPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHNldCBuZXcgZGF0YVxyXG4gICAgICAgIHRvb2xDb21wb25lbnRJZHMuZm9yRWFjaCh0b29sQ29tcG9uZW50SWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdG9vbENvbXBvbmVudERpc3BsYXlOYW1lID0gdG9vbENvbXBvbmVudElkO1xyXG4gICAgICAgICAgICBpZih0b29sQ29tcG9uZW50SWQgPT0gTG9nZ2VyUHJvdmlkZXIuZHJpdmVMb2dDb21wb25lbnROYW1lKXtcclxuICAgICAgICAgICAgICAgIHRvb2xDb21wb25lbnREaXNwbGF5TmFtZSA9IHRoaXMuX25ldHdvcmtDb21tYW5kVHJhY2VUb29sTmFtZTsgLy8gU2hvdyBcIm1hcHAgTW90aW9uIERyaXZlIExvZ1wiIGluc3RlYWQgb2YgXCJEcml2ZUxvZ1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5wdXNoKG5ldyBPdmVydmlld0l0ZW0odG9vbENvbXBvbmVudElkLCB0b29sQ29tcG9uZW50RGlzcGxheU5hbWUpKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHVwZGF0ZSB0cmVlIGdyaWRcclxuICAgICAgICB0aGlzLnVwZGF0ZVRyZWVHcmlkRGF0YVNvdXJjZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29sdW1uIGRlZmluaXRpb24gZm9yIHRoaXMgdHJlZSBncmlkIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUb29sc092ZXJ2aWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBUb29sc092ZXJ2aWV3V2lkZ2V0LmNvbHVtbk5hbWUsIHdpZHRoOiBcIjM1MFwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImNvbW1hbmRCdXR0b25zXCIsIGhlYWRlclRleHQ6IFRvb2xzT3ZlcnZpZXdXaWRnZXQuY29sdW1uRXhlY3V0ZUNvbW1hbmQgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRDb21tYW5kSWRzRnJvbUl0ZW0ob3ZlcnZpZXdJdGVtOiBPdmVydmlld0l0ZW0pOiBBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIGxldCBhdmFpbGFibGVWaWV3cyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGF2YWlsYWJsZVZpZXdzLnB1c2goVmlld1R5cGUuRHJpdmVMb2cpO1xyXG4gICAgICAgIHJldHVybiBhdmFpbGFibGVWaWV3cztcclxuICAgIH0gIFxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdENvbW1hbmRJZEZyb21JdGVtKG92ZXJ2aWV3SXRlbTogT3ZlcnZpZXdJdGVtKTogc3RyaW5ne1xyXG4gICAgICAgIC8vIFRPRE8gZ2V0IGRlZmF1bHQgdmlldyBmcm9tIGNvbXBvbmVudFxyXG4gICAgICAgcmV0dXJuIFZpZXdUeXBlLkRyaXZlTG9nLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldE5hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFZpZXdUeXBlW2NvbW1hbmRJZF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldEljb25DbGFzc05hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpIDogc3RyaW5ne1xyXG4gICAgICAgIGxldCB2aWV3VHlwZTogVmlld1R5cGUgPSBwYXJzZUludChjb21tYW5kSWQpO1xyXG4gICAgICAgIHJldHVybiBWaWV3VHlwZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SWNvbkNsYXNzQnlWaWV3VHlwZSh2aWV3VHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNsaWNrKG92ZXJ2aWV3SXRlbTogT3ZlcnZpZXdJdGVtLCBjb21tYW5kSWQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5vbkV4ZWN1dGVUb29sQ29tbWFuZChvdmVydmlld0l0ZW0uaWQsIG92ZXJ2aWV3SXRlbS5kaXNwbGF5TmFtZSwgY29tbWFuZElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZG91YmxlQ2xpY2soY29sdW1uTmFtZTogc3RyaW5nLCBvdmVydmlld0l0ZW06IE92ZXJ2aWV3SXRlbSl7XHJcbiAgICAgICAgaWYoY29sdW1uTmFtZSA9PSBUb29sc092ZXJ2aWV3V2lkZ2V0LmNvbHVtbk5hbWUgKXtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRUb29sQ29tbWFuZElkID0gdGhpcy5nZXREZWZhdWx0Q29tbWFuZElkRnJvbUl0ZW0ob3ZlcnZpZXdJdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5vbkV4ZWN1dGVUb29sQ29tbWFuZChvdmVydmlld0l0ZW0uaWQsIG92ZXJ2aWV3SXRlbS5kaXNwbGF5TmFtZSwgZGVmYXVsdFRvb2xDb21tYW5kSWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRXhlY3V0ZVRvb2xDb21tYW5kKHRvb2xJZDogc3RyaW5nLCB0b29sRGlzcGxheU5hbWU6IHN0cmluZywgY29tbWFuZElkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oXCJDb21tYW5kICdcIiArIHRoaXMuZ2V0TmFtZUZvckNvbW1hbmRJZChjb21tYW5kSWQpICsgXCInIGZyb20gdG9vbCAnXCIgKyB0b29sRGlzcGxheU5hbWUgKyBcIicgZXhlY3V0ZWQhXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRvb2xJZCA9PSBMb2dnZXJQcm92aWRlci5kcml2ZUxvZ0NvbXBvbmVudE5hbWUpe1xyXG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVOZXR3b3JrQ29tbWFuZFRyYWNlQ29tbWFuZCh0b29sSWQsIHRvb2xEaXNwbGF5TmFtZSwgY29tbWFuZElkKTtcclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBleGVjdXRlTmV0d29ya0NvbW1hbmRUcmFjZUNvbW1hbmQodG9vbElkOiBzdHJpbmcsIHRvb2xEaXNwbGF5TmFtZTogc3RyaW5nLCBjb21tYW5kSWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHZpZXdUeXBlOiBWaWV3VHlwZSA9IHBhcnNlSW50KGNvbW1hbmRJZCk7XHJcbiAgICAgICAgaWYodmlld1R5cGUgPT0gVmlld1R5cGUuRHJpdmVMb2cpIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuTmV0d29ya0NvbW1hbmRUcmFjZSh0b29sSWQsIHZpZXdUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvcGVuTmV0d29ya0NvbW1hbmRUcmFjZSh0b29sSWQ6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlKXtcclxuICAgICAgICB0aGlzLm9uT3BlblZpZXcodG9vbElkLCBcIkRyaXZlIExvZ1wiLCB2aWV3VHlwZSk7IC8vIFNob3cgXCJEcml2ZSBMb2dcIiBpbiBuZXcgdmlldyBpbnN0ZWFkIG9mIFwibWFwcCBNb3Rpb24gRHJpdmUgTG9nXCJcclxuICAgIH1cclxufVxyXG4iXX0=