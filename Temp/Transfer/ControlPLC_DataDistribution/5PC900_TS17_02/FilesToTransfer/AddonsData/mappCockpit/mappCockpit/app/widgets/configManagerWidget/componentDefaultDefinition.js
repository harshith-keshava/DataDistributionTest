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
define(["require", "exports", "../../common/componentBase/componentSettings", "../common/componentDefaultDefinitionWidgetBase", "../../framework/componentHub/bindings/bindingDeclarations"], function (require, exports, componentSettings_1, componentDefaultDefinitionWidgetBase_1, Binding) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function (_super) {
        __extends(ComponentDefaultDefinition, _super);
        function ComponentDefaultDefinition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultComponentSettingsId = "configManagerWidgetDefinition";
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
            componentSettings.addSubComponent("ConfigManagerDataModel", ComponentDefaultDefinition.ConfigManagerDataModel);
            componentSettings.addBindingByDecl(Binding.Components.Component.Configuration, "onConfigurationParametersUpdated", "", false);
            componentSettings.addBindingByDecl(Binding.Components.Component.AllMethods, "onMethodsUpdated", "", false);
            return componentSettings;
        };
        ComponentDefaultDefinition.ConfigManagerDataModel = "ConfigManagerDataModel";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29uZmlnTWFuYWdlcldpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBcUJDO1lBakJtQixnQ0FBMEIsR0FBRywrQkFBK0IsQ0FBQzs7UUFpQmpGLENBQUM7UUFmRzs7Ozs7V0FLRztRQUNJLGdFQUEyQixHQUFsQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2hELGlCQUFpQixDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsRUFBRSwwQkFBMEIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRS9HLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxrQ0FBa0MsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUUzRyxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFsQmEsaURBQXNCLEdBQUcsd0JBQXdCLENBQUM7UUFtQnBFLGlDQUFDO0tBQUEsQUFyQkQsQ0FBZ0QsMkVBQW9DLEdBcUJuRjtJQXJCWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgKiBhcyBCaW5kaW5nIGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2JpbmRpbmdEZWNsYXJhdGlvbnNcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gZXh0ZW5kcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2V7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBDb25maWdNYW5hZ2VyRGF0YU1vZGVsID0gXCJDb25maWdNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IGRlZmF1bHRDb21wb25lbnRTZXR0aW5nc0lkID0gXCJjb25maWdNYW5hZ2VyV2lkZ2V0RGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJDb25maWdNYW5hZ2VyRGF0YU1vZGVsXCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbmZpZ01hbmFnZXJEYXRhTW9kZWwpO1xyXG4gICAgICAgXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZ0J5RGVjbChCaW5kaW5nLkNvbXBvbmVudHMuQ29tcG9uZW50LkNvbmZpZ3VyYXRpb24sIFwib25Db25maWd1cmF0aW9uUGFyYW1ldGVyc1VwZGF0ZWRcIiwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmdCeURlY2woQmluZGluZy5Db21wb25lbnRzLkNvbXBvbmVudC5BbGxNZXRob2RzLCBcIm9uTWV0aG9kc1VwZGF0ZWRcIiwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG59Il19