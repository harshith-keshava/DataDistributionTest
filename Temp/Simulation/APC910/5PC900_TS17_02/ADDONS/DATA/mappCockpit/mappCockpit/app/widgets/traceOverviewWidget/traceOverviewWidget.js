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
define(["require", "exports", "../common/overviewTreeGridWidgetBase", "../common/viewTypeProvider", "../common/overviewItem", "./componentDefaultDefinition"], function (require, exports, overviewTreeGridWidgetBase_1, viewTypeProvider_1, overviewItem_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceOverviewWidget
     *
     * @class TraceOverviewWidget
     * @extends {OverviewTreeGridWidgetBase}
     * @implements {ITraceOverviewWidget}
     */
    var TraceOverviewWidget = /** @class */ (function (_super) {
        __extends(TraceOverviewWidget, _super);
        function TraceOverviewWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns the header text which one should be shown for this overview widget in the header
         *
         * @protected
         * @returns {string}
         * @memberof TraceOverviewWidget
         */
        TraceOverviewWidget.prototype.getHeaderText = function () {
            return "Trace Overview";
        };
        /**
         * Initialize the component
         *
         * @memberof TraceOverviewWidget
         */
        TraceOverviewWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        TraceOverviewWidget.prototype.onTraceComponentIdsUpdated = function (traceComponentIds) {
            var _this = this;
            // clear data source
            this._dataSource = new Array();
            // add new data
            traceComponentIds.forEach(function (traceComponentId) {
                var traceComponentDisplayName = traceComponentId;
                if (traceComponentId == "NewTraceConfig") {
                    traceComponentDisplayName = "Trace"; // Show Trace instead of "NewTraceConfig"
                }
                _this._dataSource.push(new overviewItem_1.OverviewItem(traceComponentId, traceComponentDisplayName));
            });
            // update tree grid
            this.updateTreeGridDataSource();
        };
        TraceOverviewWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: TraceOverviewWidget.columnName, width: "350" },
                    { field: "commandButtons", headerText: TraceOverviewWidget.columnOpenView },
                ],
            };
        };
        TraceOverviewWidget.prototype.getNameForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewType[commandId];
        };
        TraceOverviewWidget.prototype.getIconClassNameForCommandId = function (commandId) {
            var viewType = parseInt(commandId);
            return viewTypeProvider_1.ViewTypeProvider.getInstance().getIconClassByViewType(viewType);
        };
        TraceOverviewWidget.prototype.getCommandIdsFromItem = function (overviewItem) {
            // TODO get available views from component
            var availableViews = new Array();
            availableViews.push(viewTypeProvider_1.ViewType.Configuration);
            availableViews.push(viewTypeProvider_1.ViewType.Analysis);
            return availableViews;
        };
        TraceOverviewWidget.prototype.getDefaultCommandIdFromItem = function (overviewItem) {
            // TODO get default view from component
            return viewTypeProvider_1.ViewType.Analysis.toString();
        };
        TraceOverviewWidget.prototype.click = function (overviewItem, commandId) {
            var viewType = parseInt(commandId);
            this.onOpenView(overviewItem.id, overviewItem.displayName, viewType);
        };
        TraceOverviewWidget.prototype.doubleClick = function (columnName, overviewItem) {
            if (columnName == TraceOverviewWidget.columnName) {
                var defaultCommandId = this.getDefaultCommandIdFromItem(overviewItem);
                var defaultOpenViewType = parseInt(defaultCommandId);
                this.onOpenView(overviewItem.id, overviewItem.displayName, defaultOpenViewType);
            }
        };
        // Column header texts
        TraceOverviewWidget.columnName = "Name";
        TraceOverviewWidget.columnOpenView = "Open View";
        return TraceOverviewWidget;
    }(overviewTreeGridWidgetBase_1.OverviewTreeGridWidgetBase));
    exports.TraceOverviewWidget = TraceOverviewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VPdmVydmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZU92ZXJ2aWV3V2lkZ2V0L3RyYWNlT3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BOzs7Ozs7T0FNRztJQUNIO1FBQXlDLHVDQUEwQjtRQUFuRTs7UUF1RkEsQ0FBQztRQWpGRzs7Ozs7O1dBTUc7UUFDTywyQ0FBYSxHQUF2QjtZQUNJLE9BQU8sZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxpREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksdURBQTBCLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRU8sd0RBQTBCLEdBQWxDLFVBQW1DLGlCQUFnQztZQUFuRSxpQkFlQztZQWRHLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO1lBRTdDLGVBQWU7WUFDZixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxnQkFBZ0I7Z0JBQ3RDLElBQUkseUJBQXlCLEdBQUcsZ0JBQWdCLENBQUM7Z0JBQ2pELElBQUcsZ0JBQWdCLElBQUksZ0JBQWdCLEVBQUM7b0JBQ3BDLHlCQUF5QixHQUFHLE9BQU8sQ0FBQyxDQUFDLHlDQUF5QztpQkFDakY7Z0JBQ0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSwyQkFBWSxDQUFDLGdCQUFnQixFQUFFLHlCQUF5QixDQUFDLENBQUMsQ0FBQztZQUN6RixDQUFDLENBQUMsQ0FBQztZQUVILG1CQUFtQjtZQUNuQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBRVMseURBQTJCLEdBQXJDO1lBQ0ksT0FBTztnQkFDSCxPQUFPLEVBQUU7b0JBQ0wsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtvQkFDbEYsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGNBQWMsRUFBRTtpQkFDOUU7YUFDSixDQUFDO1FBQ04sQ0FBQztRQUVTLGlEQUFtQixHQUE3QixVQUE4QixTQUFpQjtZQUMzQyxPQUFPLDJCQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVTLDBEQUE0QixHQUF0QyxVQUF1QyxTQUFpQjtZQUNwRCxJQUFJLFFBQVEsR0FBYSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0MsT0FBTyxtQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRSxDQUFDO1FBRVMsbURBQXFCLEdBQS9CLFVBQWdDLFlBQTBCO1lBQ3RELDBDQUEwQztZQUMxQyxJQUFJLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ2pDLGNBQWMsQ0FBQyxJQUFJLENBQUMsMkJBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1QyxjQUFjLENBQUMsSUFBSSxDQUFDLDJCQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUVPLHlEQUEyQixHQUFuQyxVQUFvQyxZQUEwQjtZQUN6RCx1Q0FBdUM7WUFDeEMsT0FBTywyQkFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxDQUFDO1FBRVMsbUNBQUssR0FBZixVQUFnQixZQUEwQixFQUFFLFNBQWlCO1lBQ3pELElBQUksUUFBUSxHQUFhLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBRVMseUNBQVcsR0FBckIsVUFBc0IsVUFBa0IsRUFBRSxZQUEwQjtZQUNoRSxJQUFHLFVBQVUsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUM7Z0JBQzVDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLG1CQUFtQixHQUFhLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2FBQ25GO1FBQ0wsQ0FBQztRQXBGRCxzQkFBc0I7UUFDUiw4QkFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixrQ0FBYyxHQUFHLFdBQVcsQ0FBQztRQW1GL0MsMEJBQUM7S0FBQSxBQXZGRCxDQUF5Qyx1REFBMEIsR0F1RmxFO0lBdkZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZU92ZXJ2aWV3V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZU92ZXJ2aWV3V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9vdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSwgVmlld1R5cGVQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBPdmVydmlld0l0ZW0gfSBmcm9tIFwiLi4vY29tbW9uL292ZXJ2aWV3SXRlbVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VPdmVydmlld1dpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VPdmVydmlld1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7T3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqIEBpbXBsZW1lbnRzIHtJVHJhY2VPdmVydmlld1dpZGdldH1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmFjZU92ZXJ2aWV3V2lkZ2V0IGV4dGVuZHMgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJVHJhY2VPdmVydmlld1dpZGdldCB7XHJcbiAgICBcclxuICAgIC8vIENvbHVtbiBoZWFkZXIgdGV4dHNcclxuICAgIHB1YmxpYyBzdGF0aWMgY29sdW1uTmFtZSA9IFwiTmFtZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBjb2x1bW5PcGVuVmlldyA9IFwiT3BlbiBWaWV3XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBoZWFkZXIgdGV4dCB3aGljaCBvbmUgc2hvdWxkIGJlIHNob3duIGZvciB0aGlzIG92ZXJ2aWV3IHdpZGdldCBpbiB0aGUgaGVhZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZU92ZXJ2aWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRIZWFkZXJUZXh0KCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJUcmFjZSBPdmVydmlld1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlT3ZlcnZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25UcmFjZUNvbXBvbmVudElkc1VwZGF0ZWQodHJhY2VDb21wb25lbnRJZHM6IEFycmF5PHN0cmluZz4pe1xyXG4gICAgICAgIC8vIGNsZWFyIGRhdGEgc291cmNlXHJcbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IG5ldyBBcnJheTxPdmVydmlld0l0ZW0+KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gYWRkIG5ldyBkYXRhXHJcbiAgICAgICAgdHJhY2VDb21wb25lbnRJZHMuZm9yRWFjaCh0cmFjZUNvbXBvbmVudElkID0+IHtcclxuICAgICAgICAgICAgbGV0IHRyYWNlQ29tcG9uZW50RGlzcGxheU5hbWUgPSB0cmFjZUNvbXBvbmVudElkO1xyXG4gICAgICAgICAgICBpZih0cmFjZUNvbXBvbmVudElkID09IFwiTmV3VHJhY2VDb25maWdcIil7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNvbXBvbmVudERpc3BsYXlOYW1lID0gXCJUcmFjZVwiOyAvLyBTaG93IFRyYWNlIGluc3RlYWQgb2YgXCJOZXdUcmFjZUNvbmZpZ1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5wdXNoKG5ldyBPdmVydmlld0l0ZW0odHJhY2VDb21wb25lbnRJZCwgdHJhY2VDb21wb25lbnREaXNwbGF5TmFtZSkpO1xyXG4gICAgICAgIH0pOyBcclxuICAgICAgICBcclxuICAgICAgICAvLyB1cGRhdGUgdHJlZSBncmlkXHJcbiAgICAgICAgdGhpcy51cGRhdGVUcmVlR3JpZERhdGFTb3VyY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogVHJhY2VPdmVydmlld1dpZGdldC5jb2x1bW5OYW1lLCB3aWR0aDogXCIzNTBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJjb21tYW5kQnV0dG9uc1wiLCBoZWFkZXJUZXh0OiBUcmFjZU92ZXJ2aWV3V2lkZ2V0LmNvbHVtbk9wZW5WaWV3IH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TmFtZUZvckNvbW1hbmRJZChjb21tYW5kSWQ6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVmlld1R5cGVbY29tbWFuZElkXTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SWNvbkNsYXNzTmFtZUZvckNvbW1hbmRJZChjb21tYW5kSWQ6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHZpZXdUeXBlOiBWaWV3VHlwZSA9IHBhcnNlSW50KGNvbW1hbmRJZCk7XHJcbiAgICAgICAgcmV0dXJuIFZpZXdUeXBlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJY29uQ2xhc3NCeVZpZXdUeXBlKHZpZXdUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tbWFuZElkc0Zyb21JdGVtKG92ZXJ2aWV3SXRlbTogT3ZlcnZpZXdJdGVtKTogQXJyYXk8c3RyaW5nPntcclxuICAgICAgICAvLyBUT0RPIGdldCBhdmFpbGFibGUgdmlld3MgZnJvbSBjb21wb25lbnRcclxuICAgICAgICBsZXQgYXZhaWxhYmxlVmlld3MgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBhdmFpbGFibGVWaWV3cy5wdXNoKFZpZXdUeXBlLkNvbmZpZ3VyYXRpb24pO1xyXG4gICAgICAgIGF2YWlsYWJsZVZpZXdzLnB1c2goVmlld1R5cGUuQW5hbHlzaXMpO1xyXG4gICAgICAgIHJldHVybiBhdmFpbGFibGVWaWV3cztcclxuICAgIH0gIFxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdENvbW1hbmRJZEZyb21JdGVtKG92ZXJ2aWV3SXRlbTogT3ZlcnZpZXdJdGVtKTogc3RyaW5ne1xyXG4gICAgICAgICAvLyBUT0RPIGdldCBkZWZhdWx0IHZpZXcgZnJvbSBjb21wb25lbnRcclxuICAgICAgICByZXR1cm4gVmlld1R5cGUuQW5hbHlzaXMudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY2xpY2sob3ZlcnZpZXdJdGVtOiBPdmVydmlld0l0ZW0sIGNvbW1hbmRJZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgdmlld1R5cGU6IFZpZXdUeXBlID0gcGFyc2VJbnQoY29tbWFuZElkKTtcclxuICAgICAgICB0aGlzLm9uT3BlblZpZXcob3ZlcnZpZXdJdGVtLmlkLCBvdmVydmlld0l0ZW0uZGlzcGxheU5hbWUsIHZpZXdUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZG91YmxlQ2xpY2soY29sdW1uTmFtZTogc3RyaW5nLCBvdmVydmlld0l0ZW06IE92ZXJ2aWV3SXRlbSl7XHJcbiAgICAgICAgaWYoY29sdW1uTmFtZSA9PSBUcmFjZU92ZXJ2aWV3V2lkZ2V0LmNvbHVtbk5hbWUpe1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdENvbW1hbmRJZCA9IHRoaXMuZ2V0RGVmYXVsdENvbW1hbmRJZEZyb21JdGVtKG92ZXJ2aWV3SXRlbSk7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0T3BlblZpZXdUeXBlOiBWaWV3VHlwZSA9IHBhcnNlSW50KGRlZmF1bHRDb21tYW5kSWQpO1xyXG4gICAgICAgICAgICB0aGlzLm9uT3BlblZpZXcob3ZlcnZpZXdJdGVtLmlkLCBvdmVydmlld0l0ZW0uZGlzcGxheU5hbWUsIGRlZmF1bHRPcGVuVmlld1R5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==