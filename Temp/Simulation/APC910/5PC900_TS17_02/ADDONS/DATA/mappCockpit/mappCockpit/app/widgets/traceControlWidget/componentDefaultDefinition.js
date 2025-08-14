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
            _this.defaultComponentSettingsId = "traceControlDefinition";
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
            // Add subcomponents
            // needed for busy screen
            componentSettings.addSubComponent("CommonLayoutProvider", ComponentDefaultDefinition.CommonLayoutProviderId);
            // Add bindings
            componentSettings.addBindingByDecl(Binding.Traces.State, "onTraceStateChanged", "");
            componentSettings.addBindingByDecl(Binding.Traces.ControlInterface, "updateTraceControlInterface", "");
            return componentSettings;
        };
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb250cm9sV2lkZ2V0L2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUFnRCw4Q0FBb0M7UUFBcEY7WUFBQSxxRUF1QkM7WUFyQm1CLGdDQUEwQixHQUFHLHdCQUF3QixDQUFDOztRQXFCMUUsQ0FBQztRQW5CRzs7Ozs7V0FLRztRQUNJLGdFQUEyQixHQUFsQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBRWhELG9CQUFvQjtZQUNwQix5QkFBeUI7WUFDekIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLDBCQUEwQixDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFN0csZUFBZTtZQUNmLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BGLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsNkJBQTZCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdkcsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBQ0wsaUNBQUM7SUFBRCxDQUFDLEFBdkJELENBQWdELDJFQUFvQyxHQXVCbkY7SUF2QlksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2VcIjtcclxuaW1wb3J0ICogYXMgQmluZGluZyBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9iaW5kaW5nRGVjbGFyYXRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gZXh0ZW5kcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2V7XHJcbiAgICBcclxuICAgIHB1YmxpYyByZWFkb25seSBkZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NJZCA9IFwidHJhY2VDb250cm9sRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgc3ViY29tcG9uZW50c1xyXG4gICAgICAgIC8vIG5lZWRlZCBmb3IgYnVzeSBzY3JlZW5cclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJDb21tb25MYXlvdXRQcm92aWRlclwiLCBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5Db21tb25MYXlvdXRQcm92aWRlcklkKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGJpbmRpbmdzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZ0J5RGVjbChCaW5kaW5nLlRyYWNlcy5TdGF0ZSwgXCJvblRyYWNlU3RhdGVDaGFuZ2VkXCIsIFwiXCIpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmdCeURlY2woQmluZGluZy5UcmFjZXMuQ29udHJvbEludGVyZmFjZSwgXCJ1cGRhdGVUcmFjZUNvbnRyb2xJbnRlcmZhY2VcIiwgXCJcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSJdfQ==