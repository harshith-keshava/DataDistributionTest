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
define(["require", "exports", "../../common/componentFactory/componentDefinition", "../../framework/componentHub/bindings/binding", "../persistence/settings"], function (require, exports, componentDefinition_1, binding_1, settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentSettings = /** @class */ (function (_super) {
        __extends(ComponentSettings, _super);
        /**
         * Creates an instance of ComponentSettings
         * @memberof ComponentSettings
         */
        function ComponentSettings() {
            return _super.call(this, "") || this;
        }
        /**
         * Sets the given component settings information to this component settings
         *
         * @param {(ISettings|undefined)} settings
         * @memberof ComponentSettings
         */
        ComponentSettings.prototype.setSettings = function (settings) {
            if (settings != undefined) {
                if (settings.type != "") {
                    this.type = settings.type;
                }
                this.version = settings.version;
                this.data = settings.data;
            }
        };
        ComponentSettings.prototype.getSettings = function (onlyModified) {
            var _this = this;
            if (onlyModified === void 0) { onlyModified = false; }
            if (onlyModified) {
                var onlyModifiedSettings_1 = new ComponentSettings();
                onlyModifiedSettings_1.type = this.type;
                onlyModifiedSettings_1.version = this.version;
                var keys = Object.keys(this.data);
                keys.forEach(function (key) {
                    // TODO: compare with default settings
                    // Currently SubComponent and Binding settings are static und must not be saved(or returned with getSettings)
                    if (key != ComponentSettings.SubComponentsSettingId && key != ComponentSettings.BindingsSettingId) {
                        var data = _this.data[key];
                        onlyModifiedSettings_1.setValue(key, data);
                    }
                });
                return onlyModifiedSettings_1;
            }
            else {
                return this;
            }
        };
        /**
         * Adds a new (sub) component to this component settings
         *
         * @param {string} type
         * @param {string} id
         * @param {string} [defaultInstanceDataId=""]
         * @memberof ComponentSettings
         */
        ComponentSettings.prototype.addSubComponent = function (type, id, defaultInstanceDataId) {
            if (defaultInstanceDataId === void 0) { defaultInstanceDataId = ""; }
            var addComponentData = false;
            // Find components data
            var components = this.getSubComponentSettings();
            if (components == undefined) {
                // Create components data
                components = new Array();
                addComponentData = true;
            }
            // Add component to sub components list
            components.push(new componentDefinition_1.ComponentDefinition(type, id, defaultInstanceDataId));
            if (addComponentData == true) {
                this.setValue(ComponentSettings.SubComponentsSettingId, components);
            }
        };
        /**
         * Adds a new binding via bindingDeclaration to this component settings
         *
         * @param {IBindingDeclaration} bindingDeclaration
         * @param {string} targetKey
         * @param {string} sourceKey
         * @param {boolean} [passByValue=true]
         * @memberof ComponentSettings
         */
        ComponentSettings.prototype.addBindingByDecl = function (bindingDeclaration, targetKey, sourceKey, passByValue) {
            if (passByValue === void 0) { passByValue = true; }
            this.addBinding(bindingDeclaration.bindingType, bindingDeclaration.dataType, bindingDeclaration.scope, bindingDeclaration.id, targetKey, sourceKey, passByValue);
        };
        /**
         * Adds a new binding to this component settings
         *
         * @private
         * @param {BindingType} type
         * @param {TConnectionDataType} dataType
         * @param {string} scope
         * @param {string} id
         * @param {string} targetKey
         * @param {string} sourceKey
         * @param {boolean} [passByValue=true]
         * @memberof ComponentSettings
         */
        ComponentSettings.prototype.addBinding = function (type, dataType, scope, id, targetKey, sourceKey, passByValue) {
            if (passByValue === void 0) { passByValue = true; }
            var addBindingsData = false;
            // Find bindings data
            var bindings = this.getValue(ComponentSettings.BindingsSettingId);
            if (bindings == undefined) {
                // Create binding data
                bindings = new Array();
                addBindingsData = true;
            }
            // Add binding to bindings data
            var binding = new binding_1.Binding();
            binding.type = type;
            binding.dataType = dataType;
            //binding.component = undefined;
            binding.scope = scope;
            binding.id = id;
            binding.targetKey = targetKey;
            binding.sourceKey = sourceKey;
            binding.passByValue = passByValue;
            bindings.push(binding);
            if (addBindingsData == true) {
                // add bindings data to this widget base data
                this.setValue(ComponentSettings.BindingsSettingId, bindings);
            }
        };
        ComponentSettings.prototype.getSubComponentSettings = function () {
            return this.getValue(ComponentSettings.SubComponentsSettingId);
        };
        ComponentSettings.prototype.setSubComponentSettings = function (subComponentSettings) {
            this.setValue(ComponentSettings.SubComponentsSettingId, subComponentSettings);
        };
        ComponentSettings.prototype.getBindingSettings = function () {
            return this.getValue(ComponentSettings.BindingsSettingId);
        };
        ComponentSettings.prototype.setBindingSettings = function (subComponentSettings) {
            this.setValue(ComponentSettings.BindingsSettingId, subComponentSettings);
        };
        ComponentSettings.SubComponentsSettingId = "subComponents";
        ComponentSettings.BindingsSettingId = "bindings";
        return ComponentSettings;
    }(settings_1.Settings));
    exports.ComponentSettings = ComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50U2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQTtRQUF1QyxxQ0FBUTtRQUkzQzs7O1dBR0c7UUFDSDttQkFDSSxrQkFBTSxFQUFFLENBQUM7UUFDYixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx1Q0FBVyxHQUFYLFVBQVksUUFBNkI7WUFDckMsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQixJQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFDO29CQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7aUJBQzdCO2dCQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQzdCO1FBQ0wsQ0FBQztRQUVELHVDQUFXLEdBQVgsVUFBWSxZQUE2QjtZQUF6QyxpQkFvQkM7WUFwQlcsNkJBQUEsRUFBQSxvQkFBNkI7WUFDckMsSUFBRyxZQUFZLEVBQUM7Z0JBQ1osSUFBSSxzQkFBb0IsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ25ELHNCQUFvQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxzQkFBb0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFFNUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO29CQUNaLHNDQUFzQztvQkFDdEMsNkdBQTZHO29CQUM3RyxJQUFHLEdBQUcsSUFB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LEVBQUM7Z0JBQ3ZCLDZDQUE2QztnQkFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNoRTtRQUNMLENBQUM7UUFFRCxtREFBdUIsR0FBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNuRSxDQUFDO1FBRUQsbURBQXVCLEdBQXZCLFVBQXdCLG9CQUFpRDtZQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDbEYsQ0FBQztRQUVELDhDQUFrQixHQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRCw4Q0FBa0IsR0FBbEIsVUFBbUIsb0JBQW9DO1lBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBNUlzQix3Q0FBc0IsR0FBRyxlQUFlLENBQUM7UUFDekMsbUNBQWlCLEdBQUcsVUFBVSxDQUFDO1FBNEkxRCx3QkFBQztLQUFBLEFBOUlELENBQXVDLG1CQUFRLEdBOEk5QztJQTlJWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2JpbmRpbmdcIjtcclxuaW1wb3J0IHsgVENvbm5lY3Rpb25EYXRhVHlwZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2NvbW1vbi9jb21tb25UeXBlc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCaW5kaW5nVHlwZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2JpbmRpbmdUeXBlXCI7XHJcbmltcG9ydCB7IElCaW5kaW5nRGVjbGFyYXRpb24gfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9pbnRlcmZhY2VzL2JpbmRpbmdEZWNsYXJhdGlvbkludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudFNldHRpbmdzIGV4dGVuZHMgU2V0dGluZ3N7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFN1YkNvbXBvbmVudHNTZXR0aW5nSWQgPSBcInN1YkNvbXBvbmVudHNcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQmluZGluZ3NTZXR0aW5nSWQgPSBcImJpbmRpbmdzXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcihcIlwiKTsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiBjb21wb25lbnQgc2V0dGluZ3MgaW5mb3JtYXRpb24gdG8gdGhpcyBjb21wb25lbnQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhJU2V0dGluZ3N8dW5kZWZpbmVkKX0gc2V0dGluZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBzZXRTZXR0aW5ncyhzZXR0aW5nczogSVNldHRpbmdzfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYoc2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoc2V0dGluZ3MudHlwZSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IHNldHRpbmdzLnR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy52ZXJzaW9uID0gc2V0dGluZ3MudmVyc2lvbjtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gc2V0dGluZ3MuZGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2V0dGluZ3Mob25seU1vZGlmaWVkOiBib29sZWFuID0gZmFsc2UpOiBDb21wb25lbnRTZXR0aW5nc3tcclxuICAgICAgICBpZihvbmx5TW9kaWZpZWQpe1xyXG4gICAgICAgICAgICBsZXQgb25seU1vZGlmaWVkU2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgb25seU1vZGlmaWVkU2V0dGluZ3MudHlwZSA9IHRoaXMudHlwZTtcclxuICAgICAgICAgICAgb25seU1vZGlmaWVkU2V0dGluZ3MudmVyc2lvbiA9IHRoaXMudmVyc2lvbjtcclxuICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEpXHJcbiAgICAgICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogY29tcGFyZSB3aXRoIGRlZmF1bHQgc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgIC8vIEN1cnJlbnRseSBTdWJDb21wb25lbnQgYW5kIEJpbmRpbmcgc2V0dGluZ3MgYXJlIHN0YXRpYyB1bmQgbXVzdCBub3QgYmUgc2F2ZWQob3IgcmV0dXJuZWQgd2l0aCBnZXRTZXR0aW5ncylcclxuICAgICAgICAgICAgICAgIGlmKGtleSAhPSBDb21wb25lbnRTZXR0aW5ncy5TdWJDb21wb25lbnRzU2V0dGluZ0lkICYmIGtleSAhPSBDb21wb25lbnRTZXR0aW5ncy5CaW5kaW5nc1NldHRpbmdJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGFba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBvbmx5TW9kaWZpZWRTZXR0aW5ncy5zZXRWYWx1ZShrZXksIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG9ubHlNb2RpZmllZFNldHRpbmdzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgKHN1YikgY29tcG9uZW50IHRvIHRoaXMgY29tcG9uZW50IHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZWZhdWx0SW5zdGFuY2VEYXRhSWQ9XCJcIl1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBhZGRTdWJDb21wb25lbnQodHlwZTogc3RyaW5nLCBpZDogc3RyaW5nLCBkZWZhdWx0SW5zdGFuY2VEYXRhSWQ6IHN0cmluZyA9IFwiXCIpe1xyXG4gICAgICAgIGxldCBhZGRDb21wb25lbnREYXRhID0gZmFsc2U7XHJcbiAgICAgICAgLy8gRmluZCBjb21wb25lbnRzIGRhdGFcclxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IHRoaXMuZ2V0U3ViQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBpZihjb21wb25lbnRzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBjb21wb25lbnRzIGRhdGFcclxuICAgICAgICAgICAgY29tcG9uZW50cyA9IG5ldyBBcnJheTxDb21wb25lbnREZWZpbml0aW9uPigpO1xyXG4gICAgICAgICAgICBhZGRDb21wb25lbnREYXRhID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkIGNvbXBvbmVudCB0byBzdWIgY29tcG9uZW50cyBsaXN0XHJcbiAgICAgICAgY29tcG9uZW50cy5wdXNoKG5ldyBDb21wb25lbnREZWZpbml0aW9uKHR5cGUsIGlkLCBkZWZhdWx0SW5zdGFuY2VEYXRhSWQpKTtcclxuICAgICAgICBpZihhZGRDb21wb25lbnREYXRhID09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKENvbXBvbmVudFNldHRpbmdzLlN1YkNvbXBvbmVudHNTZXR0aW5nSWQsIGNvbXBvbmVudHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgYmluZGluZyB2aWEgYmluZGluZ0RlY2xhcmF0aW9uIHRvIHRoaXMgY29tcG9uZW50IHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJQmluZGluZ0RlY2xhcmF0aW9ufSBiaW5kaW5nRGVjbGFyYXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXRLZXlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2VLZXlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Bhc3NCeVZhbHVlPXRydWVdXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgYWRkQmluZGluZ0J5RGVjbChiaW5kaW5nRGVjbGFyYXRpb246IElCaW5kaW5nRGVjbGFyYXRpb24sIHRhcmdldEtleTogc3RyaW5nLCBzb3VyY2VLZXk6IHN0cmluZywgcGFzc0J5VmFsdWU6IGJvb2xlYW4gPSB0cnVlKXtcclxuICAgICAgICB0aGlzLmFkZEJpbmRpbmcoYmluZGluZ0RlY2xhcmF0aW9uLmJpbmRpbmdUeXBlLCBiaW5kaW5nRGVjbGFyYXRpb24uZGF0YVR5cGUsIGJpbmRpbmdEZWNsYXJhdGlvbi5zY29wZSwgYmluZGluZ0RlY2xhcmF0aW9uLmlkLCAgdGFyZ2V0S2V5LCBzb3VyY2VLZXksIHBhc3NCeVZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgYmluZGluZyB0byB0aGlzIGNvbXBvbmVudCBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0JpbmRpbmdUeXBlfSB0eXBlXHJcbiAgICAgKiBAcGFyYW0ge1RDb25uZWN0aW9uRGF0YVR5cGV9IGRhdGFUeXBlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2NvcGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldEtleVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZUtleVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcGFzc0J5VmFsdWU9dHJ1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZEJpbmRpbmcodHlwZTogQmluZGluZ1R5cGUsIGRhdGFUeXBlOiBUQ29ubmVjdGlvbkRhdGFUeXBlLCBzY29wZTogc3RyaW5nLCBpZDogc3RyaW5nLCB0YXJnZXRLZXk6IHN0cmluZywgc291cmNlS2V5OiBzdHJpbmcsIHBhc3NCeVZhbHVlOiBib29sZWFuID0gdHJ1ZSl7XHJcbiAgICAgICAgbGV0IGFkZEJpbmRpbmdzRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIEZpbmQgYmluZGluZ3MgZGF0YVxyXG4gICAgICAgIGxldCBiaW5kaW5ncyA9IHRoaXMuZ2V0VmFsdWUoQ29tcG9uZW50U2V0dGluZ3MuQmluZGluZ3NTZXR0aW5nSWQpO1xyXG4gICAgICAgIGlmKGJpbmRpbmdzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBiaW5kaW5nIGRhdGFcclxuICAgICAgICAgICAgYmluZGluZ3MgPSBuZXcgQXJyYXk8QmluZGluZz4oKTtcclxuICAgICAgICAgICAgYWRkQmluZGluZ3NEYXRhID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkIGJpbmRpbmcgdG8gYmluZGluZ3MgZGF0YVxyXG4gICAgICAgIGNvbnN0IGJpbmRpbmcgPSBuZXcgQmluZGluZygpO1xyXG4gICAgICAgIGJpbmRpbmcudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgYmluZGluZy5kYXRhVHlwZSA9IGRhdGFUeXBlO1xyXG4gICAgICAgIC8vYmluZGluZy5jb21wb25lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgYmluZGluZy5zY29wZSA9IHNjb3BlO1xyXG4gICAgICAgIGJpbmRpbmcuaWQgPSBpZDtcclxuICAgICAgICBiaW5kaW5nLnRhcmdldEtleSA9IHRhcmdldEtleTtcclxuICAgICAgICBiaW5kaW5nLnNvdXJjZUtleSA9IHNvdXJjZUtleTtcclxuICAgICAgICBiaW5kaW5nLnBhc3NCeVZhbHVlID0gcGFzc0J5VmFsdWU7XHJcbiBcclxuICAgICAgICBiaW5kaW5ncy5wdXNoKGJpbmRpbmcpO1xyXG4gICAgICAgIGlmKGFkZEJpbmRpbmdzRGF0YSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgLy8gYWRkIGJpbmRpbmdzIGRhdGEgdG8gdGhpcyB3aWRnZXQgYmFzZSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoQ29tcG9uZW50U2V0dGluZ3MuQmluZGluZ3NTZXR0aW5nSWQsIGJpbmRpbmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3ViQ29tcG9uZW50U2V0dGluZ3MoKTogIEFycmF5PENvbXBvbmVudERlZmluaXRpb24+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFZhbHVlKENvbXBvbmVudFNldHRpbmdzLlN1YkNvbXBvbmVudHNTZXR0aW5nSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN1YkNvbXBvbmVudFNldHRpbmdzKHN1YkNvbXBvbmVudFNldHRpbmdzOiAgQXJyYXk8Q29tcG9uZW50RGVmaW5pdGlvbj4pe1xyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoQ29tcG9uZW50U2V0dGluZ3MuU3ViQ29tcG9uZW50c1NldHRpbmdJZCwgc3ViQ29tcG9uZW50U2V0dGluZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJpbmRpbmdTZXR0aW5ncygpOiBBcnJheTxCaW5kaW5nPntcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZShDb21wb25lbnRTZXR0aW5ncy5CaW5kaW5nc1NldHRpbmdJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QmluZGluZ1NldHRpbmdzKHN1YkNvbXBvbmVudFNldHRpbmdzOiBBcnJheTxCaW5kaW5nPil7XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZShDb21wb25lbnRTZXR0aW5ncy5CaW5kaW5nc1NldHRpbmdJZCwgc3ViQ29tcG9uZW50U2V0dGluZ3MpO1xyXG4gICAgfVxyXG59Il19