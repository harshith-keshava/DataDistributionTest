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
            _this.defaultComponentSettingsId = "methodListWidgetDefinition";
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
            componentSettings.addSubComponent("ImageProvider", ComponentDefaultDefinition.ImageProviderId);
            componentSettings.addBindingByDecl(Binding.Components.Component.UserMethods, "onMethodsUpdated", "", false);
            componentSettings.addBindingByDecl(Binding.Components.Component.QuickCommands, "onQuickCommandsUpdated", "", false);
            return componentSettings;
        };
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWV0aG9kTGlzdFdpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBbUJDO1lBakJtQixnQ0FBMEIsR0FBRyw0QkFBNEIsQ0FBQzs7UUFpQjlFLENBQUM7UUFmRzs7Ozs7V0FLRztRQUNJLGdFQUEyQixHQUFsQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2hELGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsMEJBQTBCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFL0YsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1RyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsd0JBQXdCLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXBILE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUNMLGlDQUFDO0lBQUQsQ0FBQyxBQW5CRCxDQUFnRCwyRUFBb0MsR0FtQm5GO0lBbkJZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlXCI7XHJcbmltcG9ydCAqIGFzIEJpbmRpbmcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ0RlY2xhcmF0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIGV4dGVuZHMgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNle1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBkZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NJZCA9IFwibWV0aG9kTGlzdFdpZGdldERlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiSW1hZ2VQcm92aWRlclwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5JbWFnZVByb3ZpZGVySWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmdCeURlY2woQmluZGluZy5Db21wb25lbnRzLkNvbXBvbmVudC5Vc2VyTWV0aG9kcywgXCJvbk1ldGhvZHNVcGRhdGVkXCIsIFwiXCIsIGZhbHNlKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nQnlEZWNsKEJpbmRpbmcuQ29tcG9uZW50cy5Db21wb25lbnQuUXVpY2tDb21tYW5kcywgXCJvblF1aWNrQ29tbWFuZHNVcGRhdGVkXCIsIFwiXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG59Il19