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
            _this.defaultComponentSettingsId = "traceConfigurationViewDefinition";
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
            componentSettings.addSubComponent("SplitterWidget", ComponentDefaultDefinition.SplitterWidgetTraceConfigurationViewId, ComponentDefaultDefinition.MainSplitterDefinitionId);
            componentSettings.addBindingByDecl(Binding.Components.Component.Connect, "", "connectComponent");
            componentSettings.addBindingByDecl(Binding.Components.Component.Disconnect, "", "disconnectComponent");
            return componentSettings;
        };
        ComponentDefaultDefinition.prototype.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationVertical);
            splitterComponentSettings.addPane("TraceControlWidget", ComponentDefaultDefinition.TraceControlWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(40, false));
            splitterComponentSettings.addPane("TraceConfigurationWidget", ComponentDefaultDefinition.TraceConfigurationWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1, true));
            splitterComponentSettings.addPane("MessagesWidget", ComponentDefaultDefinition.TraceConfigurationMessagesWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(110));
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
            defaultSettingsPackages.push(new componentDefaultSettingsPackage_1.ComponentDefaultSettingsPackage(ComponentDefaultDefinition.MainSplitterDefinitionId, this.getMainSplitterDefinition()));
            return defaultSettingsPackages;
        };
        ComponentDefaultDefinition.SplitterWidgetTraceConfigurationViewId = "SplitterWidget_TraceConfigurationView";
        ComponentDefaultDefinition.TraceControlWidgetId = "TraceControlWidget";
        ComponentDefaultDefinition.TraceConfigurationWidgetId = "TraceConfigurationWidget";
        ComponentDefaultDefinition.TraceConfigurationMessagesWidgetId = "TraceConfigurationMessagesWidget";
        ComponentDefaultDefinition.MainSplitterDefinitionId = "traceConfigurationViewMainSplitterDefinition";
        ComponentDefaultDefinition.InnerSplitterDefinitionId = "traceConfigurationViewInnerSplitterDefinition";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBT0E7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBNkNDO1lBdENtQixnQ0FBMEIsR0FBRyxrQ0FBa0MsQ0FBQzs7UUFzQ3BGLENBQUM7UUFqQ0c7Ozs7O1dBS0c7UUFDSSxnRUFBMkIsR0FBbEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsMEJBQTBCLENBQUMsc0NBQXNDLEVBQUUsMEJBQTBCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUM1SyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDakcsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3ZHLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUVPLDhEQUF5QixHQUFqQztZQUNJLElBQUkseUJBQXlCLEdBQUcsSUFBSSxxREFBeUIsQ0FBQyx1Q0FBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3RHLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSwwQkFBMEIsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25LLHlCQUF5QixDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSwwQkFBMEIsQ0FBQywwQkFBMEIsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUsseUJBQXlCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLDBCQUEwQixDQUFDLGtDQUFrQyxFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2SyxPQUFPLHlCQUF5QixDQUFDO1FBQ3JDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDBFQUFxQyxHQUE1QztZQUNJLElBQUksdUJBQXVCLEdBQUcsSUFBSSxLQUFLLEVBQW1DLENBQUM7WUFDM0UsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksaUVBQStCLENBQUMsMEJBQTBCLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pKLE9BQU8sdUJBQXVCLENBQUM7UUFDbkMsQ0FBQztRQTFDYSxpRUFBc0MsR0FBRyx1Q0FBdUMsQ0FBQztRQUNqRiwrQ0FBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUM1QyxxREFBMEIsR0FBRywwQkFBMEIsQ0FBQztRQUN4RCw2REFBa0MsR0FBRyxrQ0FBa0MsQ0FBQztRQUl4RSxtREFBd0IsR0FBRyw4Q0FBOEMsQ0FBQztRQUMxRSxvREFBeUIsR0FBRywrQ0FBK0MsQ0FBQztRQW1DOUYsaUNBQUM7S0FBQSxBQTdDRCxDQUFnRCwyRUFBb0MsR0E2Q25GO0lBN0NZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNwbGl0dGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9zcGxpdHRlckRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi9jb21tb24vc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VcIjtcclxuaW1wb3J0ICogYXMgQmluZGluZyBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9iaW5kaW5nRGVjbGFyYXRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gZXh0ZW5kcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2V7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTcGxpdHRlcldpZGdldFRyYWNlQ29uZmlndXJhdGlvblZpZXdJZCA9IFwiU3BsaXR0ZXJXaWRnZXRfVHJhY2VDb25maWd1cmF0aW9uVmlld1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFjZUNvbnRyb2xXaWRnZXRJZCA9IFwiVHJhY2VDb250cm9sV2lkZ2V0XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldElkID0gXCJUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhY2VDb25maWd1cmF0aW9uTWVzc2FnZXNXaWRnZXRJZCA9IFwiVHJhY2VDb25maWd1cmF0aW9uTWVzc2FnZXNXaWRnZXRcIjtcclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvblZpZXdEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBNYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvblZpZXdNYWluU3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIElubmVyU3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvblZpZXdJbm5lclNwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTcGxpdHRlcldpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TcGxpdHRlcldpZGdldFRyYWNlQ29uZmlndXJhdGlvblZpZXdJZCwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nQnlEZWNsKEJpbmRpbmcuQ29tcG9uZW50cy5Db21wb25lbnQuQ29ubmVjdCwgXCJcIiwgXCJjb25uZWN0Q29tcG9uZW50XCIpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmdCeURlY2woQmluZGluZy5Db21wb25lbnRzLkNvbXBvbmVudC5EaXNjb25uZWN0LCBcIlwiLCBcImRpc2Nvbm5lY3RDb21wb25lbnRcIik7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpIDogYW55IHtcclxuICAgICAgICBsZXQgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyA9IG5ldyBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzKFNwbGl0dGVyRGVmaW5pdGlvbi5vcmllbnRhdGlvblZlcnRpY2FsKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJUcmFjZUNvbnRyb2xXaWRnZXRcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uVHJhY2VDb250cm9sV2lkZ2V0SWQsIFwiXCIsIFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuZ2V0UGFuZVNldHRpbmdzKDQwLCBmYWxzZSkpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIlRyYWNlQ29uZmlndXJhdGlvbldpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5UcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRJZCwgXCJcIiwgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5nZXRQYW5lU2V0dGluZ3MoLTEsIHRydWUpKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJNZXNzYWdlc1dpZGdldFwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5UcmFjZUNvbmZpZ3VyYXRpb25NZXNzYWdlc1dpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncygxMTApKTtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwYWNrYWdlcyBpbiB0aGUgbWFpbiBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZVtdfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudERlZmF1bHRTZXR0aW5nc1BhY2thZ2VbXXwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgZGVmYXVsdFNldHRpbmdzUGFja2FnZXMgPSBuZXcgQXJyYXk8Q29tcG9uZW50RGVmYXVsdFNldHRpbmdzUGFja2FnZT4oKTtcclxuICAgICAgICBkZWZhdWx0U2V0dGluZ3NQYWNrYWdlcy5wdXNoKG5ldyBDb21wb25lbnREZWZhdWx0U2V0dGluZ3NQYWNrYWdlKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLk1haW5TcGxpdHRlckRlZmluaXRpb25JZCwgdGhpcy5nZXRNYWluU3BsaXR0ZXJEZWZpbml0aW9uKCkpKTtcclxuICAgICAgICByZXR1cm4gZGVmYXVsdFNldHRpbmdzUGFja2FnZXM7XHJcbiAgICB9XHJcbn0iXX0=