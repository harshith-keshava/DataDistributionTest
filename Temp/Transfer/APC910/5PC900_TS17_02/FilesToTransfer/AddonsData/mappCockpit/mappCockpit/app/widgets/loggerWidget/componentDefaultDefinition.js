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
define(["require", "exports", "../common/componentDefaultDefinitionWidgetBase", "../../common/componentBase/componentSettings", "../../framework/componentHub/bindings/bindingDeclarations"], function (require, exports, componentDefaultDefinitionWidgetBase_1, componentSettings_1, Binding) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Default definition for the logger widget
     *
     * @export
     * @class ComponentDefaultDefinition
     * @extends {ComponentDefaultDefinitionWidgetBase}
     */
    var ComponentDefaultDefinition = /** @class */ (function (_super) {
        __extends(ComponentDefaultDefinition, _super);
        function ComponentDefaultDefinition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultComponentSettingsId = "networkCommandTraceWigetDefinition";
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
            componentSettings.addBindingByDecl(Binding.Components.Component.Connect, "", "connectComponent");
            componentSettings.addBindingByDecl(Binding.Components.Component.Disconnect, "", "disconnectComponent");
            componentSettings.addBindingByDecl(Binding.Components.Component.AllMethods, "onMethodsUpdated", "", false);
            return componentSettings;
        };
        return ComponentDefaultDefinition;
    }(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase));
    exports.ComponentDefaultDefinition = ComponentDefaultDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbG9nZ2VyV2lkZ2V0L2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTs7Ozs7O09BTUc7SUFDSDtRQUFnRCw4Q0FBb0M7UUFBcEY7WUFBQSxxRUF1QkM7WUFyQm1CLGdDQUEwQixHQUFHLG9DQUFvQyxDQUFDOztRQXFCdEYsQ0FBQztRQW5CRzs7Ozs7V0FLRztRQUNLLGdFQUEyQixHQUFsQztZQUNHLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBRWhELG9CQUFvQjtZQUNwQix5QkFBeUI7WUFDekIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLDBCQUEwQixDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFN0csaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2pHLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUN2RyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTNHLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUNMLGlDQUFDO0lBQUQsQ0FBQyxBQXZCRCxDQUFnRCwyRUFBb0MsR0F1Qm5GO0lBdkJZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCAqIGFzIEJpbmRpbmcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ0RlY2xhcmF0aW9uc1wiO1xyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgZGVmaW5pdGlvbiBmb3IgdGhlIGxvZ2dlciB3aWRnZXRcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cclxuICogQGV4dGVuZHMge0NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZX1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiBleHRlbmRzIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZXtcclxuXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzSWQgPSBcIm5ldHdvcmtDb21tYW5kVHJhY2VXaWdldERlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBzdWJjb21wb25lbnRzXHJcbiAgICAgICAgLy8gbmVlZGVkIGZvciBidXN5IHNjcmVlblxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkNvbW1vbkxheW91dFByb3ZpZGVyXCIsIENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbW1vbkxheW91dFByb3ZpZGVySWQpO1xyXG5cclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nQnlEZWNsKEJpbmRpbmcuQ29tcG9uZW50cy5Db21wb25lbnQuQ29ubmVjdCwgXCJcIiwgXCJjb25uZWN0Q29tcG9uZW50XCIpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmdCeURlY2woQmluZGluZy5Db21wb25lbnRzLkNvbXBvbmVudC5EaXNjb25uZWN0LCBcIlwiLCBcImRpc2Nvbm5lY3RDb21wb25lbnRcIik7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZ0J5RGVjbChCaW5kaW5nLkNvbXBvbmVudHMuQ29tcG9uZW50LkFsbE1ldGhvZHMsIFwib25NZXRob2RzVXBkYXRlZFwiLCBcIlwiLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSJdfQ==