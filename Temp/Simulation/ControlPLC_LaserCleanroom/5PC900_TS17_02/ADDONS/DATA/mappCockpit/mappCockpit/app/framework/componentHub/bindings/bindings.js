define(["require", "exports", "./bindingConnector", "./binding", "../../../common/componentBase/contextIds/contextIdsComponent"], function (require, exports, bindingConnector_1, binding_1, contextIdsComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The class provides creation and management of bindings
     *
     * @export
     * @class Bindings
     */
    var Bindings = /** @class */ (function () {
        function Bindings() {
        }
        /**
         * Binds an instance (binding source) to the specified binding target (external binding reference).
         *
         * @static
         * @param {Binding} bindingObject
         * @memberof Bindings
         */
        Bindings.bind = function (bindingObject) {
            bindingConnector_1.BindingConnector.bind(bindingObject);
        };
        /**
         * Unbinds a whole component or the binding specified by the binding declaration
         *
         * @static
         * @param {(object | Binding)} bindingObject
         * @memberof Bindings
         */
        Bindings.unbind = function (bindingObject) {
            bindingConnector_1.BindingConnector.unbind(bindingObject);
        };
        /**
         * Creates a binding with the given data and binds it
         *
         * @static
         * @param {IBindingDeclaration} bindingDeclaration
         * @param {*} component
         * @param {string} targetKey
         * @param {string} sourceKey
         * @param {boolean} [passByValue=true]
         * @param {(ComponentContext|undefined)} [context=undefined]
         * @memberof Bindings
         */
        Bindings.createByDecl = function (bindingDeclaration, component, targetKey, sourceKey, passByValue, context) {
            if (passByValue === void 0) { passByValue = true; }
            if (context === void 0) { context = undefined; }
            this.create(bindingDeclaration.bindingType, bindingDeclaration.dataType, component, bindingDeclaration.scope, bindingDeclaration.id, targetKey, sourceKey, passByValue, context);
        };
        /**
         * Creates a binding with the given data and binds it
         *
         * @static
         * @param {BindingType} type
         * @param {TConnectionDataType} dataType
         * @param {*} component
         * @param {(string | object)} scope
         * @param {string} id
         * @param {string} targetKey
         * @param {string} sourceKey
         * @param {boolean} [passByValue=true]
         * @param {(ComponentContext|undefined)} [context=undefined]
         * @memberof Bindings
         */
        Bindings.create = function (type, dataType, component, scope, id, targetKey, sourceKey, passByValue, context) {
            if (passByValue === void 0) { passByValue = true; }
            if (context === void 0) { context = undefined; }
            var binding = new binding_1.Binding();
            binding.type = type;
            binding.dataType = dataType;
            binding.component = component;
            binding.scope = scope;
            binding.id = this.replacePlaceHolders(id, context);
            binding.targetKey = targetKey;
            binding.sourceKey = sourceKey;
            binding.passByValue = passByValue;
            Bindings.bind(binding);
        };
        /**
         * Replaces placeholders in the binding id with the context data (currently only for ComponentId)
         *
         * @private
         * @static
         * @param {string} id
         * @param {(ComponentContext|undefined)} context
         * @returns {string}
         * @memberof Bindings
         */
        Bindings.replacePlaceHolders = function (id, context) {
            if (context == undefined) {
                return id;
            }
            var componentId = context.getContext(contextIdsComponent_1.ContextIdsComponent.ComponentId);
            if (componentId == undefined) {
                return id;
            }
            var componentIdPlaceHolder = "<%" + contextIdsComponent_1.ContextIdsComponent.ComponentId + "%>";
            return id.replace(componentIdPlaceHolder, componentId);
        };
        return Bindings;
    }());
    exports.Bindings = Bindings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBUUE7Ozs7O09BS0c7SUFDSDtRQUFBO1FBK0ZBLENBQUM7UUE3Rkc7Ozs7OztXQU1HO1FBQ0ksYUFBSSxHQUFYLFVBQVksYUFBc0I7WUFFOUIsbUNBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFHRDs7Ozs7O1dBTUc7UUFDVyxlQUFNLEdBQXBCLFVBQXFCLGFBQThCO1lBRS9DLG1DQUFnQixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSSxxQkFBWSxHQUFuQixVQUFvQixrQkFBdUMsRUFBRSxTQUFjLEVBQUUsU0FBaUIsRUFBRSxTQUFpQixFQUFFLFdBQTJCLEVBQUUsT0FBK0M7WUFBNUUsNEJBQUEsRUFBQSxrQkFBMkI7WUFBRSx3QkFBQSxFQUFBLG1CQUErQztZQUMzTCxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEwsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0ksZUFBTSxHQUFiLFVBQWMsSUFBaUIsRUFBRSxRQUE2QixFQUFFLFNBQWMsRUFBRSxLQUFzQixFQUFFLEVBQVUsRUFBRSxTQUFpQixFQUFFLFNBQWlCLEVBQUUsV0FBMkIsRUFBRSxPQUErQztZQUE1RSw0QkFBQSxFQUFBLGtCQUEyQjtZQUFFLHdCQUFBLEVBQUEsbUJBQStDO1lBQ2xPLElBQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBRXRCLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuRCxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUM5QixPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUM5QixPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDWSw0QkFBbUIsR0FBbEMsVUFBbUMsRUFBVSxFQUFFLE9BQW1DO1lBQzlFLElBQUcsT0FBTyxJQUFJLFNBQVMsRUFBQztnQkFDcEIsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMseUNBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEUsSUFBRyxXQUFXLElBQUksU0FBUyxFQUFDO2dCQUN4QixPQUFPLEVBQUUsQ0FBQzthQUNiO1lBRUQsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLEdBQUcseUNBQW1CLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUMzRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFM0QsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQUFDLEFBL0ZELElBK0ZDO0lBL0ZZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVENvbm5lY3Rpb25EYXRhVHlwZSB9IGZyb20gXCIuLi9jb21tb24vY29tbW9uVHlwZXNcIjtcclxuaW1wb3J0IHsgQmluZGluZ0Nvbm5lY3RvciB9IGZyb20gXCIuL2JpbmRpbmdDb25uZWN0b3JcIjtcclxuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gXCIuL2JpbmRpbmdcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50Q29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRDb250ZXh0XCI7XHJcbmltcG9ydCB7IENvbnRleHRJZHNDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29udGV4dElkcy9jb250ZXh0SWRzQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEJpbmRpbmdUeXBlIH0gZnJvbSBcIi4vYmluZGluZ1R5cGVcIjtcclxuaW1wb3J0IHsgSUJpbmRpbmdEZWNsYXJhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvYmluZGluZ0RlY2xhcmF0aW9uSW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIHByb3ZpZGVzIGNyZWF0aW9uIGFuZCBtYW5hZ2VtZW50IG9mIGJpbmRpbmdzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEJpbmRpbmdzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmluZGluZ3Mge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgYW4gaW5zdGFuY2UgKGJpbmRpbmcgc291cmNlKSB0byB0aGUgc3BlY2lmaWVkIGJpbmRpbmcgdGFyZ2V0IChleHRlcm5hbCBiaW5kaW5nIHJlZmVyZW5jZSkuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtCaW5kaW5nfSBiaW5kaW5nT2JqZWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZGluZ3NcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJpbmQoYmluZGluZ09iamVjdDogQmluZGluZykge1xyXG5cclxuICAgICAgICBCaW5kaW5nQ29ubmVjdG9yLmJpbmQoYmluZGluZ09iamVjdCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5iaW5kcyBhIHdob2xlIGNvbXBvbmVudCBvciB0aGUgYmluZGluZyBzcGVjaWZpZWQgYnkgdGhlIGJpbmRpbmcgZGVjbGFyYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyhvYmplY3QgfCBCaW5kaW5nKX0gYmluZGluZ09iamVjdFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmRpbmdzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdW5iaW5kKGJpbmRpbmdPYmplY3Q6b2JqZWN0IHwgQmluZGluZyl7XHJcblxyXG4gICAgICAgIEJpbmRpbmdDb25uZWN0b3IudW5iaW5kKGJpbmRpbmdPYmplY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGJpbmRpbmcgd2l0aCB0aGUgZ2l2ZW4gZGF0YSBhbmQgYmluZHMgaXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lCaW5kaW5nRGVjbGFyYXRpb259IGJpbmRpbmdEZWNsYXJhdGlvblxyXG4gICAgICogQHBhcmFtIHsqfSBjb21wb25lbnRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXRLZXlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2VLZXlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Bhc3NCeVZhbHVlPXRydWVdXHJcbiAgICAgKiBAcGFyYW0geyhDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCl9IFtjb250ZXh0PXVuZGVmaW5lZF1cclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlQnlEZWNsKGJpbmRpbmdEZWNsYXJhdGlvbjogSUJpbmRpbmdEZWNsYXJhdGlvbiwgY29tcG9uZW50OiBhbnksIHRhcmdldEtleTogc3RyaW5nLCBzb3VyY2VLZXk6IHN0cmluZywgcGFzc0J5VmFsdWU6IGJvb2xlYW4gPSB0cnVlLCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGUoYmluZGluZ0RlY2xhcmF0aW9uLmJpbmRpbmdUeXBlLCBiaW5kaW5nRGVjbGFyYXRpb24uZGF0YVR5cGUsIGNvbXBvbmVudCwgYmluZGluZ0RlY2xhcmF0aW9uLnNjb3BlLCBiaW5kaW5nRGVjbGFyYXRpb24uaWQsIHRhcmdldEtleSwgc291cmNlS2V5LHBhc3NCeVZhbHVlLCBjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBiaW5kaW5nIHdpdGggdGhlIGdpdmVuIGRhdGEgYW5kIGJpbmRzIGl0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtCaW5kaW5nVHlwZX0gdHlwZVxyXG4gICAgICogQHBhcmFtIHtUQ29ubmVjdGlvbkRhdGFUeXBlfSBkYXRhVHlwZVxyXG4gICAgICogQHBhcmFtIHsqfSBjb21wb25lbnRcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZyB8IG9iamVjdCl9IHNjb3BlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXRLZXlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2VLZXlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Bhc3NCeVZhbHVlPXRydWVdXHJcbiAgICAgKiBAcGFyYW0geyhDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCl9IFtjb250ZXh0PXVuZGVmaW5lZF1cclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlKHR5cGU6IEJpbmRpbmdUeXBlLCBkYXRhVHlwZTogVENvbm5lY3Rpb25EYXRhVHlwZSwgY29tcG9uZW50OiBhbnksIHNjb3BlOiBzdHJpbmcgfCBvYmplY3QsIGlkOiBzdHJpbmcsIHRhcmdldEtleTogc3RyaW5nLCBzb3VyY2VLZXk6IHN0cmluZywgcGFzc0J5VmFsdWU6IGJvb2xlYW4gPSB0cnVlLCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRpbmcgPSBuZXcgQmluZGluZygpO1xyXG4gICAgICAgIGJpbmRpbmcudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgYmluZGluZy5kYXRhVHlwZSA9IGRhdGFUeXBlO1xyXG4gICAgICAgIGJpbmRpbmcuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gICAgICAgIGJpbmRpbmcuc2NvcGUgPSBzY29wZTtcclxuXHJcbiAgICAgICAgYmluZGluZy5pZCA9IHRoaXMucmVwbGFjZVBsYWNlSG9sZGVycyhpZCwgY29udGV4dCk7XHJcbiAgICAgICAgYmluZGluZy50YXJnZXRLZXkgPSB0YXJnZXRLZXk7XHJcbiAgICAgICAgYmluZGluZy5zb3VyY2VLZXkgPSBzb3VyY2VLZXk7XHJcbiAgICAgICAgYmluZGluZy5wYXNzQnlWYWx1ZSA9IHBhc3NCeVZhbHVlO1xyXG4gICAgICAgIEJpbmRpbmdzLmJpbmQoYmluZGluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBsYWNlcyBwbGFjZWhvbGRlcnMgaW4gdGhlIGJpbmRpbmcgaWQgd2l0aCB0aGUgY29udGV4dCBkYXRhIChjdXJyZW50bHkgb25seSBmb3IgQ29tcG9uZW50SWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHsoQ29tcG9uZW50Q29udGV4dHx1bmRlZmluZWQpfSBjb250ZXh0XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmRpbmdzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJlcGxhY2VQbGFjZUhvbGRlcnMoaWQ6IHN0cmluZywgY29udGV4dDogQ29tcG9uZW50Q29udGV4dHx1bmRlZmluZWQpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYoY29udGV4dCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb21wb25lbnRJZCA9IGNvbnRleHQuZ2V0Q29udGV4dChDb250ZXh0SWRzQ29tcG9uZW50LkNvbXBvbmVudElkKTtcclxuICAgICAgICBpZihjb21wb25lbnRJZCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICBcclxuICAgICAgICBsZXQgY29tcG9uZW50SWRQbGFjZUhvbGRlciA9IFwiPCVcIiArIENvbnRleHRJZHNDb21wb25lbnQuQ29tcG9uZW50SWQgKyBcIiU+XCI7XHJcbiAgICAgICAgcmV0dXJuIGlkLnJlcGxhY2UoY29tcG9uZW50SWRQbGFjZUhvbGRlciwgY29tcG9uZW50SWQpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==