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
define(["require", "exports", "../common/viewTypeProvider", "../common/overviewTreeGridWidgetBase", "./componentDefaultDefinition", "../common/overviewItem"], function (require, exports, viewTypeProvider_1, overviewTreeGridWidgetBase_1, componentDefaultDefinition_1, overviewItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the ComponentOverviewWidget
     *
     * @class ComponentOverviewWidget
     * @extends {OverviewTreeGridWidgetBase}
     * @implements {IComponentOverviewWidget}
     */
    var ComponentOverviewWidget = /** @class */ (function (_super) {
        __extends(ComponentOverviewWidget, _super);
        function ComponentOverviewWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns the header text which one should be shown for this overview widget in the header
         *
         * @protected
         * @returns {string}
         * @memberof ComponentOverviewWidget
         */
        ComponentOverviewWidget.prototype.getHeaderText = function () {
            return "Component Overview";
        };
        /**
         * Initialize the component
         *
         * @memberof ComponentOverviewWidget
         */
        ComponentOverviewWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        ComponentOverviewWidget.prototype.onUserComponentIdsUpdated = function (componentIds) {
            var _this = this;
            // clear datasource
            this._dataSource = new Array();
            // add new data to datasource
            componentIds.forEach(function (componentId) {
                _this._dataSource.push(new overviewItem_1.OverviewItem(componentId, componentId));
            });
            // update the tree grid with the new data
            this.updateTreeGridDataSource();
        };
        ComponentOverviewWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: ComponentOverviewWidget.columnName, width: "350", allowSorting: true },
                    { field: "commandButtons", headerText: ComponentOverviewWidget.columnOpenView, allowSorting: false },
                ],
            };
        };
        /**
         * Returns the definition for column sorting(=> activated)
         *
         * @protected
         * @returns {{}}
         * @memberof ComponentOverviewWidget
         */
        ComponentOverviewWidget.prototype.getTreeGridColumnSorting = function () {
            return {
                allowSorting: true,
            };
        };
        ComponentOverviewWidget.prototype.getNameForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewType[commandId];
        };
        ComponentOverviewWidget.prototype.getIconClassNameForCommandId = function (commandId) {
            var viewType = parseInt(commandId);
            return viewTypeProvider_1.ViewTypeProvider.getInstance().getIconClassByViewType(viewType);
        };
        ComponentOverviewWidget.prototype.getCommandIdsFromItem = function (overviewItem) {
            // TODO get available views from component
            var availableViews = new Array();
            availableViews.push(viewTypeProvider_1.ViewType.Common);
            return availableViews;
        };
        ComponentOverviewWidget.prototype.getDefaultCommandIdFromItem = function (overviewItem) {
            // TODO get default view from component
            return viewTypeProvider_1.ViewType.Common.toString();
        };
        ComponentOverviewWidget.prototype.click = function (overviewItem, commandId) {
            var viewType = parseInt(commandId);
            this.onOpenView(overviewItem.id, overviewItem.displayName, viewType);
        };
        ComponentOverviewWidget.prototype.doubleClick = function (columnName, overviewItem) {
            if (columnName == ComponentOverviewWidget.columnName) {
                var defaultCommandId = this.getDefaultCommandIdFromItem(overviewItem);
                var defaultOpenViewType = parseInt(defaultCommandId);
                this.onOpenView(overviewItem.id, overviewItem.displayName, defaultOpenViewType);
            }
        };
        // Column header texts
        ComponentOverviewWidget.columnName = "Name";
        ComponentOverviewWidget.columnOpenView = "Open View";
        return ComponentOverviewWidget;
    }(overviewTreeGridWidgetBase_1.OverviewTreeGridWidgetBase));
    exports.ComponentOverviewWidget = ComponentOverviewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BOzs7Ozs7T0FNRztJQUNIO1FBQTZDLDJDQUEwQjtRQUF2RTs7UUErRkEsQ0FBQztRQXpGRzs7Ozs7O1dBTUc7UUFDTywrQ0FBYSxHQUF2QjtZQUNJLE9BQU8sb0JBQW9CLENBQUM7UUFDaEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxxREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksdURBQTBCLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRU8sMkRBQXlCLEdBQWpDLFVBQWtDLFlBQTJCO1lBQTdELGlCQVdDO1lBVkcsbUJBQW1CO1lBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7WUFFN0MsNkJBQTZCO1lBQzdCLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXO2dCQUM1QixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLDJCQUFZLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEUsQ0FBQyxDQUFDLENBQUM7WUFFSCx5Q0FBeUM7WUFDekMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUVTLDZEQUEyQixHQUFyQztZQUNJLE9BQU87Z0JBQ0gsT0FBTyxFQUFFO29CQUNMLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsdUJBQXVCLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBQztvQkFDekcsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDO2lCQUN0RzthQUNKLENBQUM7UUFDTixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ08sMERBQXdCLEdBQWxDO1lBQ0ksT0FBTztnQkFDSCxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDO1FBQ04sQ0FBQztRQUVTLHFEQUFtQixHQUE3QixVQUE4QixTQUFpQjtZQUMzQyxPQUFPLDJCQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVTLDhEQUE0QixHQUF0QyxVQUF1QyxTQUFpQjtZQUNwRCxJQUFJLFFBQVEsR0FBYSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0MsT0FBTyxtQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRSxDQUFDO1FBRVMsdURBQXFCLEdBQS9CLFVBQWdDLFlBQTBCO1lBQ3RELDBDQUEwQztZQUMxQyxJQUFJLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ2pDLGNBQWMsQ0FBQyxJQUFJLENBQUMsMkJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxPQUFPLGNBQWMsQ0FBQztRQUMxQixDQUFDO1FBRU8sNkRBQTJCLEdBQW5DLFVBQW9DLFlBQTBCO1lBQzFELHVDQUF1QztZQUN4QyxPQUFPLDJCQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFFUyx1Q0FBSyxHQUFmLFVBQWdCLFlBQTBCLEVBQUUsU0FBaUI7WUFDekQsSUFBSSxRQUFRLEdBQWEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFFUyw2Q0FBVyxHQUFyQixVQUFzQixVQUFrQixFQUFFLFlBQTBCO1lBQ2hFLElBQUcsVUFBVSxJQUFJLHVCQUF1QixDQUFDLFVBQVUsRUFBQztnQkFDaEQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3RFLElBQUksbUJBQW1CLEdBQWEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLG1CQUFtQixDQUFDLENBQUM7YUFDbkY7UUFDTCxDQUFDO1FBNUZELHNCQUFzQjtRQUNSLGtDQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLHNDQUFjLEdBQUcsV0FBVyxDQUFDO1FBMkYvQyw4QkFBQztLQUFBLEFBL0ZELENBQTZDLHVEQUEwQixHQStGdEU7SUEvRlksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb21wb25lbnRPdmVydmlld1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSwgVmlld1R5cGVQcm92aWRlciwgIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9vdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IE92ZXJ2aWV3SXRlbSB9IGZyb20gXCIuLi9jb21tb24vb3ZlcnZpZXdJdGVtXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRcclxuICpcclxuICogQGNsYXNzIENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lDb21wb25lbnRPdmVydmlld1dpZGdldH1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRPdmVydmlld1dpZGdldCBleHRlbmRzIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0IHtcclxuXHJcbiAgICAvLyBDb2x1bW4gaGVhZGVyIHRleHRzXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbHVtbk5hbWUgPSBcIk5hbWVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgY29sdW1uT3BlblZpZXcgPSBcIk9wZW4gVmlld1wiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaGVhZGVyIHRleHQgd2hpY2ggb25lIHNob3VsZCBiZSBzaG93biBmb3IgdGhpcyBvdmVydmlldyB3aWRnZXQgaW4gdGhlIGhlYWRlclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEhlYWRlclRleHQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIkNvbXBvbmVudCBPdmVydmlld1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVXNlckNvbXBvbmVudElkc1VwZGF0ZWQoY29tcG9uZW50SWRzOiBBcnJheTxzdHJpbmc+KXtcclxuICAgICAgICAvLyBjbGVhciBkYXRhc291cmNlXHJcbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IG5ldyBBcnJheTxPdmVydmlld0l0ZW0+KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gYWRkIG5ldyBkYXRhIHRvIGRhdGFzb3VyY2VcclxuICAgICAgICBjb21wb25lbnRJZHMuZm9yRWFjaChjb21wb25lbnRJZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFTb3VyY2UucHVzaChuZXcgT3ZlcnZpZXdJdGVtKGNvbXBvbmVudElkLCBjb21wb25lbnRJZCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdHJlZSBncmlkIHdpdGggdGhlIG5ldyBkYXRhXHJcbiAgICAgICAgdGhpcy51cGRhdGVUcmVlR3JpZERhdGFTb3VyY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuY29sdW1uTmFtZSwgd2lkdGg6IFwiMzUwXCIsIGFsbG93U29ydGluZzogdHJ1ZX0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImNvbW1hbmRCdXR0b25zXCIsIGhlYWRlclRleHQ6IENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LmNvbHVtbk9wZW5WaWV3LCBhbGxvd1NvcnRpbmc6IGZhbHNlfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmluaXRpb24gZm9yIGNvbHVtbiBzb3J0aW5nKD0+IGFjdGl2YXRlZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFRyZWVHcmlkQ29sdW1uU29ydGluZygpOiB7fXtcclxuICAgICAgICByZXR1cm4geyAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93U29ydGluZzogdHJ1ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXROYW1lRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBWaWV3VHlwZVtjb21tYW5kSWRdO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRJY29uQ2xhc3NOYW1lRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKSA6IHN0cmluZ3tcclxuICAgICAgICBsZXQgdmlld1R5cGU6IFZpZXdUeXBlID0gcGFyc2VJbnQoY29tbWFuZElkKTtcclxuICAgICAgICByZXR1cm4gVmlld1R5cGVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEljb25DbGFzc0J5Vmlld1R5cGUodmlld1R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRDb21tYW5kSWRzRnJvbUl0ZW0ob3ZlcnZpZXdJdGVtOiBPdmVydmlld0l0ZW0pOiBBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIC8vIFRPRE8gZ2V0IGF2YWlsYWJsZSB2aWV3cyBmcm9tIGNvbXBvbmVudFxyXG4gICAgICAgIGxldCBhdmFpbGFibGVWaWV3cyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGF2YWlsYWJsZVZpZXdzLnB1c2goVmlld1R5cGUuQ29tbW9uKTtcclxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlVmlld3M7XHJcbiAgICB9ICBcclxuXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRDb21tYW5kSWRGcm9tSXRlbShvdmVydmlld0l0ZW06IE92ZXJ2aWV3SXRlbSk6IHN0cmluZ3tcclxuICAgICAgICAvLyBUT0RPIGdldCBkZWZhdWx0IHZpZXcgZnJvbSBjb21wb25lbnRcclxuICAgICAgIHJldHVybiBWaWV3VHlwZS5Db21tb24udG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY2xpY2sob3ZlcnZpZXdJdGVtOiBPdmVydmlld0l0ZW0sIGNvbW1hbmRJZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgdmlld1R5cGU6IFZpZXdUeXBlID0gcGFyc2VJbnQoY29tbWFuZElkKTtcclxuICAgICAgICB0aGlzLm9uT3BlblZpZXcob3ZlcnZpZXdJdGVtLmlkLCBvdmVydmlld0l0ZW0uZGlzcGxheU5hbWUsIHZpZXdUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZG91YmxlQ2xpY2soY29sdW1uTmFtZTogc3RyaW5nLCBvdmVydmlld0l0ZW06IE92ZXJ2aWV3SXRlbSl7XHJcbiAgICAgICAgaWYoY29sdW1uTmFtZSA9PSBDb21wb25lbnRPdmVydmlld1dpZGdldC5jb2x1bW5OYW1lKXtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRDb21tYW5kSWQgPSB0aGlzLmdldERlZmF1bHRDb21tYW5kSWRGcm9tSXRlbShvdmVydmlld0l0ZW0pO1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdE9wZW5WaWV3VHlwZTogVmlld1R5cGUgPSBwYXJzZUludChkZWZhdWx0Q29tbWFuZElkKTtcclxuICAgICAgICAgICAgdGhpcy5vbk9wZW5WaWV3KG92ZXJ2aWV3SXRlbS5pZCwgb3ZlcnZpZXdJdGVtLmRpc3BsYXlOYW1lLCBkZWZhdWx0T3BlblZpZXdUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=