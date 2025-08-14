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
            _this.defaultComponentSettingsId = "traceConfigurationDataPointsDefinition";
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
            componentSettings.addBindingByDecl(Binding.Traces.AvailableDataPoints, "initializeAvailableDataPoints", "");
            componentSettings.addBindingByDecl(Binding.Traces.Configuration.DataPoints, "initializeTraceDataPoints", "");
            return componentSettings;
        };
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0L2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUFnRCw4Q0FBb0M7UUFBcEY7WUFBQSxxRUFtQkM7WUFqQm1CLGdDQUEwQixHQUFHLHdDQUF3QyxDQUFDOztRQWlCMUYsQ0FBQztRQWZHOzs7OztXQUtHO1FBQ0ksZ0VBQTJCLEdBQWxDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFFaEQsZUFBZTtZQUNmLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsK0JBQStCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUcsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLDJCQUEyQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTdHLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUNMLGlDQUFDO0lBQUQsQ0FBQyxBQW5CRCxDQUFnRCwyRUFBb0MsR0FtQm5GO0lBbkJZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlXCI7XHJcbmltcG9ydCAqIGFzIEJpbmRpbmcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ0RlY2xhcmF0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIGV4dGVuZHMgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNle1xyXG4gICAgXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvbkRhdGFQb2ludHNEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBiaW5kaW5nc1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmdCeURlY2woQmluZGluZy5UcmFjZXMuQXZhaWxhYmxlRGF0YVBvaW50cywgXCJpbml0aWFsaXplQXZhaWxhYmxlRGF0YVBvaW50c1wiLCBcIlwiKTsgICAgICAgXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZ0J5RGVjbChCaW5kaW5nLlRyYWNlcy5Db25maWd1cmF0aW9uLkRhdGFQb2ludHMsIFwiaW5pdGlhbGl6ZVRyYWNlRGF0YVBvaW50c1wiLCBcIlwiKTtcclxuICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSJdfQ==