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
define(["require", "exports", "./bindingType"], function (require, exports, bindingType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements a binding descriptor
     *
     * @export
     * @class BindingDescriptor
     */
    var BindingDescriptor = /** @class */ (function () {
        function BindingDescriptor() {
            this.type = bindingType_1.BindingType.UNDEFINED;
            /**
             * The scope specifies which components can be connected with the the binding id's
             *
             * @type {(string|object)}
             * @memberof BindingDescriptor
             */
            this.scope = "";
            /**
             * Specifies the binding id for matching binding points.
             *
             * @type {string}
             * @memberof BindingDescriptor
             */
            this.id = "";
            /**
             * The target key specifies the name of a method or property to receive the bound data.
             *
             * @type {string}
             * @memberof BindingDescriptor
             */
            this.targetKey = "";
            /**
             *  The source key specifies the name of a method to be obeserved as triggers for modifications to be forwarded to bound components.
             *
             * @type {string}
             * @memberof BindingDescriptor
             */
            this.sourceKey = "";
            /**
             * The data type specifies the effective type to be exchanged between components.
             *
             * @type {TConnectionDataType}
             * @memberof BindingDescriptor
             */
            this.dataType = "";
            /**
             *  Binding values are passed by value as default. The parameter specifies that the value is passed and transported as copy only. This way references get lost respectively invalid. When the data contains references the
             *  parameter needs to be set to false. Beware that in this case the receivers are able to access and modify the original instances.
             *
             * @type {boolean}
             * @memberof BindingDescriptor
             */
            this.passByValue = true;
        }
        Object.defineProperty(BindingDescriptor.prototype, "fullId", {
            /**
             * Gets the id consisting of scope and id
             *
             * @readonly
             * @type {string}
             * @memberof BindingDescriptor
             */
            get: function () {
                return this.scope + '.' + this.id;
            },
            enumerable: true,
            configurable: true
        });
        return BindingDescriptor;
    }());
    exports.BindingDescriptor = BindingDescriptor;
    /**
     * Implements a binding declaration
     *
     * @export
     * @class Binding
     */
    var Binding = /** @class */ (function (_super) {
        __extends(Binding, _super);
        function Binding() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = bindingType_1.BindingType.UNDEFINED;
            return _this;
        }
        Object.defineProperty(Binding.prototype, "descriptor", {
            get: function () {
                var copiedBindingDescriptor = new BindingDescriptor();
                copiedBindingDescriptor.type = this.type;
                copiedBindingDescriptor.scope = this.scope;
                copiedBindingDescriptor.id = this.id;
                copiedBindingDescriptor.dataType = this.dataType;
                copiedBindingDescriptor.sourceKey = this.sourceKey;
                copiedBindingDescriptor.targetKey = this.targetKey;
                copiedBindingDescriptor.passByValue = this.passByValue;
                return copiedBindingDescriptor;
            },
            enumerable: true,
            configurable: true
        });
        return Binding;
    }(BindingDescriptor));
    exports.Binding = Binding;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9iaW5kaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTs7Ozs7T0FLRztJQUNIO1FBQUE7WUFFSSxTQUFJLEdBQWdCLHlCQUFXLENBQUMsU0FBUyxDQUFBO1lBRXpDOzs7OztlQUtHO1lBQ0gsVUFBSyxHQUFlLEVBQUUsQ0FBQztZQUV2Qjs7Ozs7ZUFLRztZQUNILE9BQUUsR0FBUSxFQUFFLENBQUM7WUFFYjs7Ozs7ZUFLRztZQUNILGNBQVMsR0FBVSxFQUFFLENBQUM7WUFFdEI7Ozs7O2VBS0c7WUFDSCxjQUFTLEdBQVUsRUFBRSxDQUFDO1lBRXRCOzs7OztlQUtHO1lBQ0gsYUFBUSxHQUFxQixFQUFFLENBQUM7WUFFaEM7Ozs7OztlQU1HO1lBQ0gsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFjL0IsQ0FBQztRQUpHLHNCQUFXLHFDQUFNO1lBUGpCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdEMsQ0FBQzs7O1dBQUE7UUFFTCx3QkFBQztJQUFELENBQUMsQUFqRUQsSUFpRUM7SUFqRVksOENBQWlCO0lBcUU5Qjs7Ozs7T0FLRztJQUNIO1FBQTZCLDJCQUFpQjtRQUE5QztZQUFBLHFFQXdCQztZQXRCRyxVQUFJLEdBQWdCLHlCQUFXLENBQUMsU0FBUyxDQUFBOztRQXNCN0MsQ0FBQztRQVpHLHNCQUFXLCtCQUFVO2lCQUFyQjtnQkFDSSxJQUFNLHVCQUF1QixHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztnQkFDeEQsdUJBQXVCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3pDLHVCQUF1QixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUMzQyx1QkFBdUIsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDckMsdUJBQXVCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ2pELHVCQUF1QixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuRCx1QkFBdUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDbkQsdUJBQXVCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBRXZELE9BQU8sdUJBQXVCLENBQUM7WUFDbkMsQ0FBQzs7O1dBQUE7UUFDTCxjQUFDO0lBQUQsQ0FBQyxBQXhCRCxDQUE2QixpQkFBaUIsR0F3QjdDO0lBeEJZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IFRDb25uZWN0aW9uRGF0YVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2NvbW1vblR5cGVzXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdUeXBlIH0gZnJvbSBcIi4vYmluZGluZ1R5cGVcIjtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgYmluZGluZyBkZXNjcmlwdG9yXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEJpbmRpbmdEZXNjcmlwdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmluZGluZ0Rlc2NyaXB0b3J7XHJcblxyXG4gICAgdHlwZTogQmluZGluZ1R5cGUgPSBCaW5kaW5nVHlwZS5VTkRFRklORURcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2NvcGUgc3BlY2lmaWVzIHdoaWNoIGNvbXBvbmVudHMgY2FuIGJlIGNvbm5lY3RlZCB3aXRoIHRoZSB0aGUgYmluZGluZyBpZCdzXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8b2JqZWN0KX1cclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBzY29wZTpzdHJpbmd8b2JqZWN0PVwiXCI7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmaWVzIHRoZSBiaW5kaW5nIGlkIGZvciBtYXRjaGluZyBiaW5kaW5nIHBvaW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmRpbmdEZXNjcmlwdG9yXHJcbiAgICAgKi9cclxuICAgIGlkOnN0cmluZz1cIlwiO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0YXJnZXQga2V5IHNwZWNpZmllcyB0aGUgbmFtZSBvZiBhIG1ldGhvZCBvciBwcm9wZXJ0eSB0byByZWNlaXZlIHRoZSBib3VuZCBkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZGluZ0Rlc2NyaXB0b3JcclxuICAgICAqL1xyXG4gICAgdGFyZ2V0S2V5OnN0cmluZyA9IFwiXCI7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogIFRoZSBzb3VyY2Uga2V5IHNwZWNpZmllcyB0aGUgbmFtZSBvZiBhIG1ldGhvZCB0byBiZSBvYmVzZXJ2ZWQgYXMgdHJpZ2dlcnMgZm9yIG1vZGlmaWNhdGlvbnMgdG8gYmUgZm9yd2FyZGVkIHRvIGJvdW5kIGNvbXBvbmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBzb3VyY2VLZXk6c3RyaW5nID0gXCJcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGF0YSB0eXBlIHNwZWNpZmllcyB0aGUgZWZmZWN0aXZlIHR5cGUgdG8gYmUgZXhjaGFuZ2VkIGJldHdlZW4gY29tcG9uZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7VENvbm5lY3Rpb25EYXRhVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBkYXRhVHlwZTpUQ29ubmVjdGlvbkRhdGFUeXBlPVwiXCI7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogIEJpbmRpbmcgdmFsdWVzIGFyZSBwYXNzZWQgYnkgdmFsdWUgYXMgZGVmYXVsdC4gVGhlIHBhcmFtZXRlciBzcGVjaWZpZXMgdGhhdCB0aGUgdmFsdWUgaXMgcGFzc2VkIGFuZCB0cmFuc3BvcnRlZCBhcyBjb3B5IG9ubHkuIFRoaXMgd2F5IHJlZmVyZW5jZXMgZ2V0IGxvc3QgcmVzcGVjdGl2ZWx5IGludmFsaWQuIFdoZW4gdGhlIGRhdGEgY29udGFpbnMgcmVmZXJlbmNlcyB0aGVcclxuICAgICAqICBwYXJhbWV0ZXIgbmVlZHMgdG8gYmUgc2V0IHRvIGZhbHNlLiBCZXdhcmUgdGhhdCBpbiB0aGlzIGNhc2UgdGhlIHJlY2VpdmVycyBhcmUgYWJsZSB0byBhY2Nlc3MgYW5kIG1vZGlmeSB0aGUgb3JpZ2luYWwgaW5zdGFuY2VzLlxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmRpbmdEZXNjcmlwdG9yXHJcbiAgICAgKi9cclxuICAgIHBhc3NCeVZhbHVlOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBpZCBjb25zaXN0aW5nIG9mIHNjb3BlIGFuZCBpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGZ1bGxJZCgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY29wZSArICcuJyArIHRoaXMuaWQ7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgYmluZGluZyBkZWNsYXJhdGlvblxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBCaW5kaW5nXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmluZGluZyBleHRlbmRzIEJpbmRpbmdEZXNjcmlwdG9ye1xyXG5cclxuICAgIHR5cGU6IEJpbmRpbmdUeXBlID0gQmluZGluZ1R5cGUuVU5ERUZJTkVEXHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmaWVzIHRoZSBjb21wb25lbnQgd2hpY2ggaXMgdG8gYmUgY29ubmVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nXHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudCE6IG9iamVjdHxudWxsO1xyXG4gICBcclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRvcigpIDogQmluZGluZ0Rlc2NyaXB0b3Ige1xyXG4gICAgICAgIGNvbnN0IGNvcGllZEJpbmRpbmdEZXNjcmlwdG9yID0gbmV3IEJpbmRpbmdEZXNjcmlwdG9yKCk7XHJcbiAgICAgICAgY29waWVkQmluZGluZ0Rlc2NyaXB0b3IudHlwZSA9IHRoaXMudHlwZTtcclxuICAgICAgICBjb3BpZWRCaW5kaW5nRGVzY3JpcHRvci5zY29wZSA9IHRoaXMuc2NvcGU7XHJcbiAgICAgICAgY29waWVkQmluZGluZ0Rlc2NyaXB0b3IuaWQgPSB0aGlzLmlkO1xyXG4gICAgICAgIGNvcGllZEJpbmRpbmdEZXNjcmlwdG9yLmRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZTtcclxuICAgICAgICBjb3BpZWRCaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXkgPSB0aGlzLnNvdXJjZUtleTtcclxuICAgICAgICBjb3BpZWRCaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXkgPSB0aGlzLnRhcmdldEtleTtcclxuICAgICAgICBjb3BpZWRCaW5kaW5nRGVzY3JpcHRvci5wYXNzQnlWYWx1ZSA9IHRoaXMucGFzc0J5VmFsdWU7XHJcblxyXG4gICAgICAgIHJldHVybiBjb3BpZWRCaW5kaW5nRGVzY3JpcHRvcjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==