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
            _this.defaultComponentSettingsId = "toolsOverviewDefinition";
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
            // Add bindings
            componentSettings.addBindingByDecl(Binding.Tools.ToolsIds, "onToolsIdsUpdated", "", false);
            return componentSettings;
        };
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdG9vbHNPdmVydmlld1dpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBaUJDO1lBZm1CLGdDQUEwQixHQUFHLHlCQUF5QixDQUFDOztRQWUzRSxDQUFDO1FBYkc7Ozs7O1dBS0c7UUFDSSxnRUFBMkIsR0FBbEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUVoRCxlQUFlO1lBQ2YsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNGLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUNMLGlDQUFDO0lBQUQsQ0FBQyxBQWpCRCxDQUFnRCwyRUFBb0MsR0FpQm5GO0lBakJZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlXCI7XHJcbmltcG9ydCAqIGFzIEJpbmRpbmcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ0RlY2xhcmF0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIGV4dGVuZHMgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNle1xyXG4gICAgXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcInRvb2xzT3ZlcnZpZXdEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG5cclxuICAgICAgICAvLyBBZGQgYmluZGluZ3NcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nQnlEZWNsKEJpbmRpbmcuVG9vbHMuVG9vbHNJZHMsIFwib25Ub29sc0lkc1VwZGF0ZWRcIiwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSJdfQ==