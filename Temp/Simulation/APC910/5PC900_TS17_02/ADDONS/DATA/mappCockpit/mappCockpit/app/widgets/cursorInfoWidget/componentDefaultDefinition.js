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
define(["require", "exports", "../../common/componentBase/componentSettings", "../common/componentDefaultDefinitionWidgetBase", "../traceViewWidget/bindingIds"], function (require, exports, componentSettings_1, componentDefaultDefinitionWidgetBase_1, bindingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefaultDefinition = /** @class */ (function (_super) {
        __extends(ComponentDefaultDefinition, _super);
        function ComponentDefaultDefinition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultComponentSettingsId = "CursorInfoWidgetDefinition";
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
            componentSettings.addSubComponent("ChartManagerDataModel", ComponentDefaultDefinition.ChartManagerDataModelId);
            componentSettings.addSubComponent("CursorSignalsDataModel", ComponentDefaultDefinition.CursorSignalsDataModelId);
            // Add bindings
            componentSettings.addBindingByDecl(bindingIds_1.TraceViewBinding.CursorStates, "cursorsStates", "updateCursorStates");
            componentSettings.addBindingByDecl(bindingIds_1.TraceViewBinding.ToolState, "toolState", "updateToolState");
            return componentSettings;
        };
        ComponentDefaultDefinition.ChartManagerDataModelId = "ChartManagerDataModel";
        ComponentDefaultDefinition.CursorSignalsDataModelId = "CursorSignalsDataModel";
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY3Vyc29ySW5mb1dpZGdldC9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBZ0QsOENBQW9DO1FBQXBGO1lBQUEscUVBMEJDO1lBckJtQixnQ0FBMEIsR0FBRyw0QkFBNEIsQ0FBQzs7UUFxQjlFLENBQUM7UUFuQkc7Ozs7O1dBS0c7UUFDSSxnRUFBMkIsR0FBbEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUVoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsMEJBQTBCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUMvRyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsd0JBQXdCLEVBQUUsMEJBQTBCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUVqSCxlQUFlO1lBQ2YsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsNkJBQWdCLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3pHLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLDZCQUFnQixDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUUvRixPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUF0QmEsa0RBQXVCLEdBQUcsdUJBQXVCLENBQUM7UUFDbEQsbURBQXdCLEdBQUcsd0JBQXdCLENBQUM7UUF1QnRFLGlDQUFDO0tBQUEsQUExQkQsQ0FBZ0QsMkVBQW9DLEdBMEJuRjtJQTFCWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBUcmFjZVZpZXdCaW5kaW5nIH0gZnJvbSBcIi4uL3RyYWNlVmlld1dpZGdldC9iaW5kaW5nSWRzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gZXh0ZW5kcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2V7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBDaGFydE1hbmFnZXJEYXRhTW9kZWxJZCA9IFwiQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxJZCA9IFwiQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFwiO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcIkN1cnNvckluZm9XaWRnZXREZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG5cclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJDaGFydE1hbmFnZXJEYXRhTW9kZWxcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkN1cnNvclNpZ25hbHNEYXRhTW9kZWxcIiwgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbElkKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGJpbmRpbmdzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZ0J5RGVjbChUcmFjZVZpZXdCaW5kaW5nLkN1cnNvclN0YXRlcywgXCJjdXJzb3JzU3RhdGVzXCIsIFwidXBkYXRlQ3Vyc29yU3RhdGVzXCIpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmdCeURlY2woVHJhY2VWaWV3QmluZGluZy5Ub29sU3RhdGUsIFwidG9vbFN0YXRlXCIsIFwidXBkYXRlVG9vbFN0YXRlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbn0iXX0=