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
define(["require", "exports", "../splitterWidget/splitterDefinition", "../../common/componentBase/componentSettings", "../common/splitterComponentSettings", "../common/componentDefaultDefinitionWidgetBase", "../../common/componentBase/componentDefaultSettingsPackage", "../../framework/componentHub/bindings/bindingDeclarations"], function (require, exports, splitterDefinition_1, componentSettings_1, splitterComponentSettings_1, componentDefaultDefinitionWidgetBase_1, componentDefaultSettingsPackage_1, Binding) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function (_super) {
        __extends(ComponentDefaultDefinition, _super);
        function ComponentDefaultDefinition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultComponentSettingsId = "componentViewWidgetDefinition";
            _this.MainSplitterDefinitionId = "componentViewMainSplitterDefinition";
            _this.TopSplitterDefinitionId = "componentViewTopSplitterDefinition";
            return _this;
        }
        /**
         * Returns the default component settings for this widget
         *
         * @returns {ComponentSettings}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getDefaultComponentSettings = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SplitterWidget", ComponentDefaultDefinition.SplitterWidgetComponentViewId, this.MainSplitterDefinitionId);
            componentSettings.addBindingByDecl(Binding.Components.Component.Connect, "", "connectComponent");
            componentSettings.addBindingByDecl(Binding.Components.Component.Disconnect, "", "disconnectComponent");
            return componentSettings;
        };
        ComponentDefaultDefinition.prototype.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationVertical);
            splitterComponentSettings.addPane("SplitterWidget", ComponentDefaultDefinition.SplitterWidgetTopSplitterId, this.TopSplitterDefinitionId, splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1));
            splitterComponentSettings.addPane("MessagesWidget", ComponentDefaultDefinition.ComponentViewMessagesWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(110));
            return splitterComponentSettings;
        };
        ComponentDefaultDefinition.prototype.getTopSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationHorizontal);
            splitterComponentSettings.addPane("MethodsWidget", ComponentDefaultDefinition.MethodsWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(400));
            splitterComponentSettings.addPane("WatchablesWidget", ComponentDefaultDefinition.WatchablesWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1));
            splitterComponentSettings.addPane("ConfigManagerWidget", ComponentDefaultDefinition.ConfigManagerWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(750));
            return splitterComponentSettings;
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @returns {(ComponentDefaultSettingsPackage[]| undefined)}
         * @memberof ComponentDefaultDefinition
         */
        ComponentDefaultDefinition.prototype.getAdditionalDefaultComponentSettings = function () {
            var defaultSettingsPackages = new Array();
            defaultSettingsPackages.push(new componentDefaultSettingsPackage_1.ComponentDefaultSettingsPackage(this.MainSplitterDefinitionId, this.getMainSplitterDefinition()));
            defaultSettingsPackages.push(new componentDefaultSettingsPackage_1.ComponentDefaultSettingsPackage(this.TopSplitterDefinitionId, this.getTopSplitterDefinition()));
            return defaultSettingsPackages;
        };
        ComponentDefaultDefinition.SplitterWidgetComponentViewId = "SplitterWidget_ComponentView";
        ComponentDefaultDefinition.SplitterWidgetTopSplitterId = "SplitterWidget_TopSplitter";
        ComponentDefaultDefinition.ComponentViewMessagesWidgetId = "ComponentViewMessagesWidget";
        ComponentDefaultDefinition.MethodsWidgetId = "MethodsWidget";
        ComponentDefaultDefinition.WatchablesWidgetId = "WatchablesWidget";
        ComponentDefaultDefinition.ConfigManagerWidgetId = "ConfigManagerWidget";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tcG9uZW50Vmlld1dpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBT0E7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBMERDO1lBaERtQixnQ0FBMEIsR0FBRywrQkFBK0IsQ0FBQztZQUM1RCw4QkFBd0IsR0FBRyxxQ0FBcUMsQ0FBQztZQUNqRSw2QkFBdUIsR0FBRyxvQ0FBb0MsQ0FBQzs7UUE4Q3BGLENBQUM7UUE1Q0c7Ozs7O1dBS0c7UUFDSSxnRUFBMkIsR0FBbEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsMEJBQTBCLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFFN0ksaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2pHLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUV2RyxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFFTyw4REFBeUIsR0FBakM7WUFDSSxJQUFJLHlCQUF5QixHQUFHLElBQUkscURBQXlCLENBQUMsdUNBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUN0Ryx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsMEJBQTBCLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFLHFEQUF5QixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekwseUJBQXlCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLDBCQUEwQixDQUFDLDZCQUE2QixFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsSyxPQUFPLHlCQUF5QixDQUFDO1FBQ3JDLENBQUM7UUFFTyw2REFBd0IsR0FBaEM7WUFDSSxJQUFJLHlCQUF5QixHQUFHLElBQUkscURBQXlCLENBQUMsdUNBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN4Ryx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLDBCQUEwQixDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkoseUJBQXlCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLDBCQUEwQixDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hKLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDL0osT0FBTyx5QkFBeUIsQ0FBQztRQUNyQyxDQUFDO1FBR0Q7Ozs7O1dBS0c7UUFDSSwwRUFBcUMsR0FBNUM7WUFDSSxJQUFJLHVCQUF1QixHQUFHLElBQUksS0FBSyxFQUFtQyxDQUFDO1lBQzNFLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLGlFQUErQixDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkksdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksaUVBQStCLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqSSxPQUFPLHVCQUF1QixDQUFDO1FBQ25DLENBQUM7UUF2RGEsd0RBQTZCLEdBQUcsOEJBQThCLENBQUM7UUFDL0Qsc0RBQTJCLEdBQUcsNEJBQTRCLENBQUM7UUFDM0Qsd0RBQTZCLEdBQUcsNkJBQTZCLENBQUM7UUFDOUQsMENBQWUsR0FBRyxlQUFlLENBQUM7UUFDbEMsNkNBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDeEMsZ0RBQXFCLEdBQUcscUJBQXFCLENBQUM7UUFtRGhFLGlDQUFDO0tBQUEsQUExREQsQ0FBZ0QsMkVBQW9DLEdBMERuRjtJQTFEWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcGxpdHRlckRlZmluaXRpb24gfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tbW9uL3NwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlXCI7XHJcbmltcG9ydCAqIGFzIEJpbmRpbmcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ0RlY2xhcmF0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIGV4dGVuZHMgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNle1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgU3BsaXR0ZXJXaWRnZXRDb21wb25lbnRWaWV3SWQgPSBcIlNwbGl0dGVyV2lkZ2V0X0NvbXBvbmVudFZpZXdcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU3BsaXR0ZXJXaWRnZXRUb3BTcGxpdHRlcklkID0gXCJTcGxpdHRlcldpZGdldF9Ub3BTcGxpdHRlclwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBDb21wb25lbnRWaWV3TWVzc2FnZXNXaWRnZXRJZCA9IFwiQ29tcG9uZW50Vmlld01lc3NhZ2VzV2lkZ2V0XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIE1ldGhvZHNXaWRnZXRJZCA9IFwiTWV0aG9kc1dpZGdldFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBXYXRjaGFibGVzV2lkZ2V0SWQgPSBcIldhdGNoYWJsZXNXaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ29uZmlnTWFuYWdlcldpZGdldElkID0gXCJDb25maWdNYW5hZ2VyV2lkZ2V0XCI7XHJcblxyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBkZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NJZCA9IFwiY29tcG9uZW50Vmlld1dpZGdldERlZmluaXRpb25cIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkID0gXCJjb21wb25lbnRWaWV3TWFpblNwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBUb3BTcGxpdHRlckRlZmluaXRpb25JZCA9IFwiY29tcG9uZW50Vmlld1RvcFNwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTcGxpdHRlcldpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TcGxpdHRlcldpZGdldENvbXBvbmVudFZpZXdJZCwgdGhpcy5NYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQpO1xyXG5cclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nQnlEZWNsKEJpbmRpbmcuQ29tcG9uZW50cy5Db21wb25lbnQuQ29ubmVjdCwgXCJcIiwgXCJjb25uZWN0Q29tcG9uZW50XCIpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmdCeURlY2woQmluZGluZy5Db21wb25lbnRzLkNvbXBvbmVudC5EaXNjb25uZWN0LCBcIlwiLCBcImRpc2Nvbm5lY3RDb21wb25lbnRcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzID0gbmV3IFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MoU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uVmVydGljYWwpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIlNwbGl0dGVyV2lkZ2V0XCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNwbGl0dGVyV2lkZ2V0VG9wU3BsaXR0ZXJJZCwgdGhpcy5Ub3BTcGxpdHRlckRlZmluaXRpb25JZCwgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5nZXRQYW5lU2V0dGluZ3MoLTEpKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJNZXNzYWdlc1dpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5Db21wb25lbnRWaWV3TWVzc2FnZXNXaWRnZXRJZCwgXCJcIiwgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5nZXRQYW5lU2V0dGluZ3MoMTEwKSk7XHJcbiAgICAgICAgcmV0dXJuIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUb3BTcGxpdHRlckRlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyA9IG5ldyBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzKFNwbGl0dGVyRGVmaW5pdGlvbi5vcmllbnRhdGlvbkhvcml6b250YWwpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIk1ldGhvZHNXaWRnZXRcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uTWV0aG9kc1dpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncyg0MDApKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJXYXRjaGFibGVzV2lkZ2V0XCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLldhdGNoYWJsZXNXaWRnZXRJZCwgXCJcIiwgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5nZXRQYW5lU2V0dGluZ3MoLTEpKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJDb25maWdNYW5hZ2VyV2lkZ2V0XCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbmZpZ01hbmFnZXJXaWRnZXRJZCwgXCJcIiwgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5nZXRQYW5lU2V0dGluZ3MoNzUwKSk7XHJcbiAgICAgICAgcmV0dXJuIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9IFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwYWNrYWdlcyBpbiB0aGUgbWFpbiBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZVtdfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VbXXwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgZGVmYXVsdFNldHRpbmdzUGFja2FnZXMgPSBuZXcgQXJyYXk8Q29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZT4oKTtcclxuICAgICAgICBkZWZhdWx0U2V0dGluZ3NQYWNrYWdlcy5wdXNoKG5ldyBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlKHRoaXMuTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkLCB0aGlzLmdldE1haW5TcGxpdHRlckRlZmluaXRpb24oKSkpO1xyXG4gICAgICAgIGRlZmF1bHRTZXR0aW5nc1BhY2thZ2VzLnB1c2gobmV3IENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2UodGhpcy5Ub3BTcGxpdHRlckRlZmluaXRpb25JZCwgdGhpcy5nZXRUb3BTcGxpdHRlckRlZmluaXRpb24oKSkpO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0U2V0dGluZ3NQYWNrYWdlcztcclxuICAgIH1cclxufSJdfQ==