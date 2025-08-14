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
define(["require", "exports", "../common/layoutWidgetBase", "../tabWidget/interfaces/tabWidgetInterface", "../common/viewTypeProvider", "../common/uniqueIdGenerator", "./componentDefaultDefinition", "../../common/componentBase/contextIds/contextIdsComponent", "../../common/componentBase/componentContext"], function (require, exports, layoutWidgetBase_1, tabWidgetInterface_1, viewTypeProvider_1, uniqueIdGenerator_1, componentDefaultDefinition_1, contextIdsComponent_1, componentContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainNavigationWidget = /** @class */ (function (_super) {
        __extends(MainNavigationWidget, _super);
        function MainNavigationWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sideBarMap = {};
            return _this;
        }
        MainNavigationWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Dispose the MainNavigationWidget
         *
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.dispose = function () {
            // Dispose widgets
            var keys = Object.keys(this._sideBarMap);
            for (var i = 0; i < keys.length; i++) {
                var sideBarObj = this._sideBarMap[keys[i]];
                if (sideBarObj != undefined) {
                    sideBarObj.dispose();
                }
            }
            if (this.sideBarWidget != undefined) {
                this.sideBarWidget.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Adds SideBar to given Container
         *
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.createLayout = function () {
            this.sideBarWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SideBarWidgetId);
            this.sideBarWidget.initialize();
            // add widget to the parent container
            this.sideBarWidget.addToParentContainer(this.mainDiv);
        };
        /**
         * Resize
         *
         * @param {number} width
         * @param {number} height
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this.sideBarWidget != undefined) {
                this.sideBarWidget.resize(width, height);
            }
        };
        /**
         *Select Tab in Tabwidget
         *
         * @param {string} parent
         * @param {string} tabname
         * @param {ViewType} viewType
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.selectTab = function (parent, tabname, viewType) {
            var tabId = tabname + "_" + viewType.toString();
            tabId = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(tabId);
            this._sideBarMap[parent].selectTab(tabId);
            this.sideBarWidget.switchTab("tab_" + parent, parent + "_" + viewTypeProvider_1.ViewType.SideBarTab);
        };
        /**
         * Add Widget to SideBarTabs TabWidget
         *
         * @param {IWidget} widget
         * @param {string} tabName
         * @param {ViewType} viewType
         * @param {*} data
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addWidget = function (widget, tabName, viewType, data) {
            this._sideBarMap[data["parent"]].addWidget(widget, tabName, viewType, data);
        };
        /**
         * Add Tab to SideBar
         *
         * @param {string} name
         * @param {string} iconPath
         * @returns {ITabWidget}
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addSideBarTab = function (name, iconPath) {
            var newTabWidget = this.component.addSubComponent("TabWidget", "TabWidget_" + name, "", this.component.context);
            this.sideBarWidget.addWidget(newTabWidget, name, viewTypeProvider_1.ViewType.SideBarTab, iconPath);
            this._sideBarMap[name] = newTabWidget;
            return newTabWidget;
        };
        /**
         * Add UserWidget to SideBarTabs TabWidget
         *
         * @param {Widgets.ILoginWidget} loginWidget
         * @param {*} data
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addUserWidget = function (loginWidget, data) {
            this._sideBarMap[data["parent"]].addWidget(loginWidget, data["parent"] + "_LoginView", viewTypeProvider_1.ViewType.User, { widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.right });
        };
        /**
         * Add ViewInstance of specific type
         *
         * @param {string} parent
         * @param {MappCockpitComponent} component
         * @param {ViewType} viewType
         * @param {boolean} select
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addView = function (parent, componentId, componentDisplayName, viewType, select) {
            var tabWidget = this._sideBarMap[parent];
            if (!this.componentAlreadyOpen(tabWidget, componentDisplayName, viewType)) {
                var widget = this.createWidgetForViewType(viewType, componentId);
                if (widget != undefined) {
                    tabWidget.addWidget(widget, componentDisplayName, viewType, { widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.flex });
                    widget.connect(componentId);
                }
            }
            if (select) {
                this.selectTab(parent, componentDisplayName, viewType);
            }
        };
        /**
         * Creates and returns a widget for the given viewType
         *
         * @private
         * @param {ViewType} viewType
         * @returns {(IWidget|undefined)}
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.createWidgetForViewType = function (viewType, contextComponentId) {
            var componentType = viewTypeProvider_1.ViewTypeProvider.getInstance().getComponentTypeForViewType(viewType);
            var componentId = viewTypeProvider_1.ViewTypeProvider.getInstance().getDefaultComponentIdForViewType(viewType);
            if (componentType != "" && componentId != "") {
                var context = new componentContext_1.ComponentContext();
                context.addContext(contextIdsComponent_1.ContextIdsComponent.ComponentId, contextComponentId);
                context.addContext(contextIdsComponent_1.ContextIdsComponent.ViewComponentTypeId, componentType);
                return this.component.addSubComponent(componentType, componentId, "", context);
            }
            return undefined;
        };
        /**
         * Test if view of component is already open
         *
         * @private
         * @param {*} tabWidget
         * @param {string} componentName
         * @param {string} viewType
         * @returns {boolean}
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.componentAlreadyOpen = function (tabWidget, componentName, viewType) {
            var tabs = tabWidget.dataModel.data.flexTabs;
            var componentAlreadyOpen = false;
            tabs.forEach(function (tab) {
                var tabId = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(componentName + "_" + viewType);
                if (tab.tabName == tabId) {
                    componentAlreadyOpen = true;
                }
            });
            return componentAlreadyOpen;
        };
        return MainNavigationWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.MainNavigationWidget = MainNavigationWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbk5hdmlnYXRpb25XaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFpbk5hdmlnYXRpb25XaWRnZXQvbWFpbk5hdmlnYXRpb25XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWFBO1FBQTBDLHdDQUFnQjtRQUExRDtZQUFBLHFFQW1MQztZQWhMVyxpQkFBVyxHQUFtQyxFQUFFLENBQUM7O1FBZ0w3RCxDQUFDO1FBOUtHLGtEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSx1REFBMEIsRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsc0NBQU8sR0FBUDtZQUNJLGtCQUFrQjtZQUNsQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBRyxVQUFVLElBQUksU0FBUyxFQUFDO29CQUN2QixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ3hCO2FBQ0o7WUFFRCxJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFDO2dCQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCwyQ0FBWSxHQUFaO1lBQ0ks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QUUsT0FBTyxDQUFZLENBQUM7YUFDN0Y7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0ssbURBQW9CLEdBQTVCLFVBQTZCLFNBQVMsRUFBRSxhQUFxQixFQUFFLFFBQWtCO1lBQzdFLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM3QyxJQUFJLG9CQUFvQixHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztnQkFDWixJQUFJLEtBQUssR0FBRyxxQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRyxJQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFDO29CQUNwQixvQkFBb0IsR0FBRyxJQUFJLENBQUM7aUJBQy9CO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLG9CQUFvQixDQUFDO1FBQ2hDLENBQUM7UUFDTCwyQkFBQztJQUFELENBQUMsQUFuTEQsQ0FBMEMsbUNBQWdCLEdBbUx6RDtJQW5MWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMYXlvdXRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9sYXlvdXRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElNYWluTmF2aWdhdGlvbldpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWFpbk5hdmlnYXRpb25XaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0ICogYXMgV2lkZ2V0cyBmcm9tIFwiLi4vLi4vd2lkZ2V0cy93aWRnZXRzXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElUYWJXaWRnZXQgfSBmcm9tIFwiLi4vdGFiV2lkZ2V0L2ludGVyZmFjZXMvdGFiV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldFdpZGdldFBvc2l0b25zIH0gZnJvbSBcIi4uL3RhYldpZGdldC9pbnRlcmZhY2VzL3RhYldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2lkZUJhcldpZGdldCB9IGZyb20gXCIuLi9zaWRlQmFyV2lkZ2V0L2ludGVyZmFjZXMvc2lkZUJhcldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSwgVmlld1R5cGVQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBVbmlxdWVJZEdlbmVyYXRvciB9IGZyb20gXCIuLi9jb21tb24vdW5pcXVlSWRHZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDb250ZXh0SWRzQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbnRleHRJZHMvY29udGV4dElkc0NvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRDb250ZXh0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudENvbnRleHRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWluTmF2aWdhdGlvbldpZGdldCBleHRlbmRzIExheW91dFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTWFpbk5hdmlnYXRpb25XaWRnZXR7XHJcbiAgICBzaWRlQmFyV2lkZ2V0ISA6IElTaWRlQmFyV2lkZ2V0O1xyXG5cclxuICAgIHByaXZhdGUgX3NpZGVCYXJNYXA6IHsgW2lkOiBzdHJpbmddIDogSVRhYldpZGdldDsgfSA9IHt9O1xyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBEaXNwb3NlIHdpZGdldHNcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3NpZGVCYXJNYXApO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2lkZUJhck9iaiA9IHRoaXMuX3NpZGVCYXJNYXBba2V5c1tpXV07XHJcbiAgICAgICAgICAgIGlmKHNpZGVCYXJPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHNpZGVCYXJPYmouZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuc2lkZUJhcldpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNpZGVCYXJXaWRnZXQuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIFNpZGVCYXIgdG8gZ2l2ZW4gQ29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLnNpZGVCYXJXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU2lkZUJhcldpZGdldElkKSBhcyBXaWRnZXRzLklTaWRlQmFyV2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuc2lkZUJhcldpZGdldC5pbml0aWFsaXplKCk7ICAgIFxyXG4gICAgICAgIC8vIGFkZCB3aWRnZXQgdG8gdGhlIHBhcmVudCBjb250YWluZXJcclxuICAgICAgICB0aGlzLnNpZGVCYXJXaWRnZXQuYWRkVG9QYXJlbnRDb250YWluZXIodGhpcy5tYWluRGl2KTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIGlmKHRoaXMuc2lkZUJhcldpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNpZGVCYXJXaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlNlbGVjdCBUYWIgaW4gVGFid2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYm5hbWVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2VsZWN0VGFiKHBhcmVudDogc3RyaW5nLCB0YWJuYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSl7XHJcbiAgICAgICAgbGV0IHRhYklkID0gdGFibmFtZSArIFwiX1wiICsgdmlld1R5cGUudG9TdHJpbmcoKTtcclxuICAgICAgICB0YWJJZCA9IFVuaXF1ZUlkR2VuZXJhdG9yLmdldEluc3RhbmNlKCkuZ2V0VW5pcXVlSWRGcm9tU3RyaW5nKHRhYklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2lkZUJhck1hcFtwYXJlbnRdLnNlbGVjdFRhYih0YWJJZCk7XHJcbiAgICAgICAgdGhpcy5zaWRlQmFyV2lkZ2V0LnN3aXRjaFRhYihcInRhYl9cIitwYXJlbnQsIHBhcmVudCsgXCJfXCIgKyBWaWV3VHlwZS5TaWRlQmFyVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBXaWRnZXQgdG8gU2lkZUJhclRhYnMgVGFiV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJOYW1lXHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgdGFiTmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUsIGRhdGEgOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuX3NpZGVCYXJNYXBbZGF0YVtcInBhcmVudFwiXV0uYWRkV2lkZ2V0KHdpZGdldCx0YWJOYW1lLHZpZXdUeXBlLGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIFRhYiB0byBTaWRlQmFyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uUGF0aFxyXG4gICAgICogQHJldHVybnMge0lUYWJXaWRnZXR9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkU2lkZUJhclRhYihuYW1lOiBzdHJpbmcsIGljb25QYXRoOiBzdHJpbmcpIDogSVRhYldpZGdldHtcclxuICAgICAgICBsZXQgbmV3VGFiV2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuYWRkU3ViQ29tcG9uZW50KFwiVGFiV2lkZ2V0XCIsIFwiVGFiV2lkZ2V0X1wiICsgbmFtZSwgXCJcIiwgdGhpcy5jb21wb25lbnQuY29udGV4dCkgYXMgSVRhYldpZGdldDtcclxuICAgICAgICB0aGlzLnNpZGVCYXJXaWRnZXQuYWRkV2lkZ2V0KG5ld1RhYldpZGdldCwgbmFtZSwgVmlld1R5cGUuU2lkZUJhclRhYiwgaWNvblBhdGgpO1xyXG5cclxuICAgICAgICB0aGlzLl9zaWRlQmFyTWFwW25hbWVdID0gbmV3VGFiV2lkZ2V0O1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3VGFiV2lkZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIFVzZXJXaWRnZXQgdG8gU2lkZUJhclRhYnMgVGFiV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtXaWRnZXRzLklMb2dpbldpZGdldH0gbG9naW5XaWRnZXRcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFVzZXJXaWRnZXQobG9naW5XaWRnZXQ6IFdpZGdldHMuSUxvZ2luV2lkZ2V0LCBkYXRhIDogYW55KXtcclxuICAgICAgICB0aGlzLl9zaWRlQmFyTWFwW2RhdGFbXCJwYXJlbnRcIl1dLmFkZFdpZGdldChsb2dpbldpZGdldCwgZGF0YVtcInBhcmVudFwiXSArIFwiX0xvZ2luVmlld1wiLCBWaWV3VHlwZS5Vc2VyLCB7d2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLnJpZ2h0fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgVmlld0luc3RhbmNlIG9mIHNwZWNpZmljIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50XHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBjb21wb25lbnRcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdFxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFZpZXcocGFyZW50OiBzdHJpbmcsIGNvbXBvbmVudElkOiBzdHJpbmcsIGNvbXBvbmVudERpc3BsYXlOYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSwgc2VsZWN0OiBib29sZWFuKXtcclxuICAgICAgICBsZXQgdGFiV2lkZ2V0ID0gdGhpcy5fc2lkZUJhck1hcFtwYXJlbnRdO1xyXG4gICAgICAgIGlmICghdGhpcy5jb21wb25lbnRBbHJlYWR5T3Blbih0YWJXaWRnZXQsIGNvbXBvbmVudERpc3BsYXlOYW1lLCB2aWV3VHlwZSkpIHtcclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IHRoaXMuY3JlYXRlV2lkZ2V0Rm9yVmlld1R5cGUodmlld1R5cGUsIGNvbXBvbmVudElkKTtcclxuICAgICAgICAgICAgaWYgKHdpZGdldCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRhYldpZGdldC5hZGRXaWRnZXQod2lkZ2V0LCBjb21wb25lbnREaXNwbGF5TmFtZSwgdmlld1R5cGUsIHsgd2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmZsZXggfSk7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuY29ubmVjdChjb21wb25lbnRJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihwYXJlbnQsIGNvbXBvbmVudERpc3BsYXlOYW1lLCB2aWV3VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIHdpZGdldCBmb3IgdGhlIGdpdmVuIHZpZXdUeXBlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcmV0dXJucyB7KElXaWRnZXR8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVdpZGdldEZvclZpZXdUeXBlKHZpZXdUeXBlOiBWaWV3VHlwZSwgY29udGV4dENvbXBvbmVudElkOiBzdHJpbmcpOiBJV2lkZ2V0fHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgY29tcG9uZW50VHlwZSA9IFZpZXdUeXBlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb21wb25lbnRUeXBlRm9yVmlld1R5cGUodmlld1R5cGUpO1xyXG4gICAgICAgIGxldCBjb21wb25lbnRJZCA9IFZpZXdUeXBlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWZhdWx0Q29tcG9uZW50SWRGb3JWaWV3VHlwZSh2aWV3VHlwZSk7XHJcbiAgICAgICAgaWYoY29tcG9uZW50VHlwZSAhPSBcIlwiICYmIGNvbXBvbmVudElkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IG5ldyBDb21wb25lbnRDb250ZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYWRkQ29udGV4dChDb250ZXh0SWRzQ29tcG9uZW50LkNvbXBvbmVudElkLCBjb250ZXh0Q29tcG9uZW50SWQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmFkZENvbnRleHQoQ29udGV4dElkc0NvbXBvbmVudC5WaWV3Q29tcG9uZW50VHlwZUlkLCBjb21wb25lbnRUeXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmFkZFN1YkNvbXBvbmVudChjb21wb25lbnRUeXBlLCBjb21wb25lbnRJZCwgXCJcIiwgY29udGV4dCkgYXMgSVdpZGdldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QgaWYgdmlldyBvZiBjb21wb25lbnQgaXMgYWxyZWFkeSBvcGVuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFiV2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZpZXdUeXBlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudEFscmVhZHlPcGVuKHRhYldpZGdldCwgY29tcG9uZW50TmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUpOiBib29sZWFue1xyXG4gICAgICAgIGxldCB0YWJzID0gdGFiV2lkZ2V0LmRhdGFNb2RlbC5kYXRhLmZsZXhUYWJzO1xyXG4gICAgICAgIGxldCBjb21wb25lbnRBbHJlYWR5T3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGFiSWQgPSBVbmlxdWVJZEdlbmVyYXRvci5nZXRJbnN0YW5jZSgpLmdldFVuaXF1ZUlkRnJvbVN0cmluZyhjb21wb25lbnROYW1lICsgXCJfXCIgKyB2aWV3VHlwZSk7XHJcbiAgICAgICAgICAgIGlmKHRhYi50YWJOYW1lID09IHRhYklkKXtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudEFscmVhZHlPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRBbHJlYWR5T3BlbjtcclxuICAgIH1cclxufSJdfQ==