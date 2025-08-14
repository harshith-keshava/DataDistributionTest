define(["require", "exports", "./binding", "../../../common/utilities/dataBox", "../../events", "../../store", "./bindingType"], function (require, exports, binding_1, dataBox_1, events_1, store_1, bindingType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements an interface for binding/wiring components. A binding connector supports connecting components and exchanging data without any
     * direct dependencies.
     *
     * @export
     * @class BindingConnector
     */
    var BindingConnector = /** @class */ (function () {
        function BindingConnector() {
        }
        Object.defineProperty(BindingConnector, "sharedProperties", {
            /**
             * Gets the store with the bindable properties
             *
             * @readonly
             * @static
             * @type {Store}
             * @memberof BindingConnector
             */
            get: function () {
                return this._sharedProperties;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates a binding according to the binding declaration
         *
         * @static
         * @param {Binding} bindingDeclaration
         * @returns {BindingConnector}
         * @memberof BindingConnector
         */
        BindingConnector.bind = function (bindingDeclaration) {
            var bindingDescriptor = bindingDeclaration.descriptor;
            if (bindingDeclaration.sourceKey) {
                this.bindSource(bindingDeclaration.component, bindingDescriptor);
            }
            if (bindingDeclaration.targetKey) {
                this.bindTarget(bindingDeclaration.component, bindingDescriptor);
            }
            // release component dependency
            bindingDeclaration.component = null;
        };
        /**
         *
         *
         * @param {Binding} bindingDeclaration
         * @memberof BindingConnector
         */
        BindingConnector.bindSource = function (component, bindingDescriptor) {
            // check if the component contains the source key
            if (bindingDescriptor.sourceKey in component) {
                if (component[bindingDescriptor.sourceKey] instanceof events_1.TypedEvent) {
                    this.bindSourceEvent(component, bindingDescriptor);
                }
                else if (typeof component[bindingDescriptor.sourceKey] === 'function') {
                    this.bindSourceMethod(component, bindingDescriptor);
                }
            }
            else {
                console.error("The binding key %o is not contained in %o! ", bindingDescriptor.sourceKey, component);
            }
        };
        /**
         * Binds the components source method ....
         *
         * @private
         * @param {Binding} bindingDescriptor
         * @param {*} sourceMember
         * @memberof BindingConnector
         */
        BindingConnector.bindSourceMethod = function (component, bindingDescriptor) {
            var originalSourceMethod = component[bindingDescriptor.sourceKey];
            // capture respectively intercept the source member call
            component[bindingDescriptor.sourceKey] = methodBindingInterceptor;
            var sourceMethodBinding = {
                "object": component,
                "originalSourceMethod": originalSourceMethod,
                "methodName": bindingDescriptor.sourceKey,
            };
            // register sourcebindings
            this._sourceBindings.push(sourceMethodBinding);
            // declares the method interceptor necessary for capturing the sender.
            function methodBindingInterceptor(methodArgs) {
                // capture the caller
                var caller = this;
                // call original method
                originalSourceMethod.call(caller, methodArgs);
                // forward the call to the binding logic
                BindingConnector.updateBindingValue(caller, bindingDescriptor, methodArgs);
            }
        };
        /**
         * Updates the bound value when the components intercepted (bound) method has been called
         *
         * @private
         * @param {Binding} bindingInfo
         * @param {*} args
         * @memberof BindingConnector
         */
        BindingConnector.updateBindingValue = function (caller, bindingDescriptor, args) {
            // pass the data within a reference box if required. This keeps the data and its members unmodified respectively passed without copying.
            var bindingArgs = bindingDescriptor.passByValue ? args : dataBox_1.DataBox.Box(args);
            // get the data type 
            var dataType = bindingDescriptor.dataType;
            // get the binding id for the target object
            var bindingId = bindingDescriptor.fullId;
            // temporal variable containing the computed value for forceUpdate
            var computedForceUpdateValue = false;
            // in case of a command or command response we need to pass a null object if no command args are provided. also forceUpdate needs to be true 
            // to force the command execution by a simulated value change!
            if (bindingDescriptor.type === bindingType_1.BindingType.COMMAND || bindingDescriptor.type === bindingType_1.BindingType.COMMAND_RESPONSE) {
                var nullObject = {};
                bindingArgs = bindingArgs ? bindingArgs : nullObject;
                computedForceUpdateValue = true;
            }
            else { // if the value is passed by reference, we force updating to avoid the comparision of complex objects with references 
                computedForceUpdateValue = !bindingDescriptor.passByValue;
            }
            // set previously computed value for forceUpdate to const variable
            var forceUpdate = computedForceUpdateValue;
            // update the corresponding binding value
            this.sharedProperties.update(caller, dataType, bindingArgs, bindingId, forceUpdate);
        };
        /**
         * Binds ac omponent event
         *
         * @private
         * @param {Binding} bindingDeclaration
         * @memberof BindingConnector
         */
        BindingConnector.bindSourceEvent = function (component, bindingDescriptor) {
            var _this = this;
            var sourceEvent = component[bindingDescriptor.sourceKey];
            sourceEvent.attach(function (sender, args) { return _this.onSourceEventRaised(bindingDescriptor, sender, args); });
        };
        /**
         * Called when the components observed (bound) event has been raised
         *
         * @private
         * @param {Binding} bindingInfo
         * @param {*} sender
         * @param {*} eventArgs
         * @memberof BindingConnector
         */
        BindingConnector.onSourceEventRaised = function (bindingDescriptor, sender, eventArgs) {
            this.updateBindingValue(sender, bindingDescriptor, eventArgs);
        };
        /**
         * Binds a components property to a bindable value
         *
         * @param {Binding} bindingDeclaration
         * @memberof BindingConnector
         */
        BindingConnector.bindTarget = function (component, bindingDescriptor) {
            // check if the component contains the target key
            if (bindingDescriptor.targetKey in component) {
                // get the target instance 
                var connectionTarget = component;
                // get the data type 
                var dataType = bindingDescriptor.dataType;
                // get the binding id for the target object
                var bindingId = bindingDescriptor.fullId;
                // check if the endpoint is a function
                var endPointIsMethod = this.endPointIsFunction(connectionTarget, bindingDescriptor.targetKey);
                // check if the endpoint is a property
                var endPointIsProperty = this.endPointIsProperty(connectionTarget, bindingDescriptor.targetKey);
                // bind the target endpoint according to the handler type
                if (endPointIsMethod) {
                    // get the target handler
                    var targetBindingChangedHandler = connectionTarget[bindingDescriptor.targetKey];
                    // bind the method handler
                    this.bindTargetMethod(connectionTarget, targetBindingChangedHandler, dataType, bindingId);
                }
                else {
                    // bind the property handler
                    this.bindTargetProperty(connectionTarget, bindingDescriptor.targetKey, dataType, bindingId);
                }
            }
            else {
                console.error("ComponentBinding: The binding key %o is not contained in %o! ", bindingDescriptor.targetKey, component);
            }
        };
        /**
         * Binds a target method to a bindable value
         *
         * @private
         * @param {object} connectionTarget
         * @param {TBindableChangedHandler} targetBindingValueChangedHandler
         * @param {TConnectionDataType} dataType
         * @param {string} [bindingId=""]
         * @memberof BindingConnector
         */
        BindingConnector.bindTargetMethod = function (connectionTarget, targetBindingValueChangedHandler, dataType, bindingId) {
            var _this = this;
            if (bindingId === void 0) { bindingId = ""; }
            // create the data changed handler for an update method call
            var bindingValueChangedHandler = function (newValue, oldValue) { return _this.invokeTargetMethod(newValue, oldValue, connectionTarget, targetBindingValueChangedHandler, dataType); };
            // observe the state change and forward the notification to the target handler
            this.sharedProperties.observe(connectionTarget, dataType, bindingValueChangedHandler, bindingId);
        };
        /**
         * Invokes the components target method when a bindable value has been changed.
         *
         * @private
         * @param {*} newValue
         * @param {*} oldValue
         * @param {object} connectionTarget
         * @param {TBindableChangedHandler} targetBindingValueChangedHandler
         * @param {TConnectionDataType} dataType
         * @memberof BindingConnector
         */
        BindingConnector.invokeTargetMethod = function (newValue, oldValue, connectionTarget, targetBindingValueChangedHandler, dataType) {
            var modifiedType = newValue ? typeof newValue === "object" ? newValue.constructor.name : typeof newValue : undefined;
            var targetDataType = dataType ? typeof dataType === "string" ? dataType : dataType.name : undefined;
            if (!dataType || (modifiedType === targetDataType)) {
                targetBindingValueChangedHandler.bind(connectionTarget)(newValue, oldValue);
            }
            else {
                console.error("ComponentBinding: could not invoke %o because data types do not match!", connectionTarget);
            }
        };
        /**
         * Binds a component property to a bindable value.
         *
         * @private
         * @param {object} bindingTarget
         * @param {string} targetMemberName
         * @param {TConnectionDataType} dataType
         * @param {string} bindingId
         * @memberof BindingConnector
         */
        BindingConnector.bindTargetProperty = function (bindingTarget, targetMemberName, dataType, bindingId) {
            var _this = this;
            // create the data changed handler for a property update
            var bindingValueChangedHandler = function (newValue) { return _this.updateTargetProperty(bindingTarget, newValue, targetMemberName, dataType); };
            // observe the data change and forward the notification to the property changed handler 
            this.sharedProperties.observe(bindingTarget, dataType, bindingValueChangedHandler, bindingId);
        };
        /**
         * Updates the components property when a bindable value has been changed.
         *
         * @private
         * @param {object} bindingTarget
         * @param {*} newValue
         * @param {string} targetMemberName
         * @param {TConnectionDataType} dataType
         * @memberof BindingConnector
         */
        BindingConnector.updateTargetProperty = function (bindingTarget, newValue, targetMemberName, dataType) {
            var modifiedType = newValue ? typeof newValue === "object" ? newValue.constructor.name : typeof newValue : undefined;
            var targetDataType = dataType ? typeof dataType === "string" ? dataType : dataType.name : undefined;
            //TODO: make sure that the modified type and binding type are matching
            // if (!dataType || (modifiedType === targetDataType)) {
            for (var key in bindingTarget) {
                if (key === targetMemberName) {
                    bindingTarget[targetMemberName] = newValue;
                }
            }
        };
        /**
         * Determines if the end point is a function
         *
         * @private
         * @static
         * @param {object} connectionTarget
         * @returns
         * @memberof BindingConnector
         */
        BindingConnector.endPointIsFunction = function (connectionTarget, targetMemberName) {
            // get the target handler
            var connectionPointHandler = connectionTarget[targetMemberName];
            // check if the endpoint is a function
            var endPointIsFunction = connectionPointHandler instanceof Function;
            return endPointIsFunction;
        };
        /**
         * Determines if the end point is a property
         *
         * @private
         * @static
         * @param {object} connectionTarget
         * @returns
         * @memberof BindingConnector
         */
        BindingConnector.endPointIsProperty = function (connectionTarget, targetMemberName) {
            // check if the endpoint is a property
            var targetBaseOwnsProperty = connectionTarget.constructor.prototype.hasOwnProperty(targetMemberName);
            var targetOwnsProperty = connectionTarget.constructor.prototype.hasOwnProperty(targetMemberName);
            var endPointIsProperty = targetOwnsProperty && !this.endPointIsFunction(connectionTarget, targetMemberName);
            return endPointIsProperty;
        };
        /**
         * Unbinds a whole component or the binding specified by the binding declaration
         *
         * @static
         * @param {(object | Binding)} bindingObject
         * @memberof BindingConnector
         */
        BindingConnector.unbind = function (bindingObject) {
            if (bindingObject instanceof binding_1.Binding) {
                this.unbindBinding(bindingObject);
            }
            else {
                this.unbindComponent(bindingObject);
            }
        };
        /**
         * Unbinds a specific binding
         *
         * @private
         * @static
         * @param {Binding} bindingDeclaration
         * @memberof BindingConnector
         */
        BindingConnector.unbindBinding = function (bindingDeclaration) {
            throw new Error("Method not implemented.");
        };
        /**
         * Unbinds all bindings related to the bound object
         *
         * @private
         * @static
         * @param {object} boundObject
         * @memberof BindingConnector
         */
        BindingConnector.unbindComponent = function (boundObject) {
            // detach the bound object from all shared properties
            this.sharedProperties.detach(boundObject);
            //// unconnect and restore intercepted methods.
            // get all objects source bindings
            var objectSourceBindings = this._sourceBindings.filter(function (sourceBinding) { return sourceBinding.object === boundObject; });
            if (objectSourceBindings.length > 0) {
                this.unbindSourceMethods(objectSourceBindings);
            }
        };
        /**
         * Unbinds the intercepted methods and restores the original method
         *
         * @static
         * @param {SourceMethodBinding[]} objectSourceBindings
         * @memberof BindingConnector
         */
        BindingConnector.unbindSourceMethods = function (objectSourceBindings) {
            var _this = this;
            var deleted = [];
            objectSourceBindings.forEach(function (objectSourceBinding) {
                // restore original method
                var interceptedObject = objectSourceBinding.object;
                interceptedObject[objectSourceBinding.methodName] = objectSourceBinding.originalSourceMethod;
                // delete registered method source binding
                var iDelete = _this._sourceBindings.indexOf(objectSourceBinding);
                if (iDelete >= 0) {
                    deleted = deleted.concat(_this._sourceBindings.splice(iDelete, 1));
                }
            });
            return deleted;
        };
        /**
         * Updates a shared data item specified by scope and id
         *
         * @static
         * @template TDataType
         * @param {object} caller
         * @param {TDataType} value
         * @param {string} sharedDataScope
         * @param {string} sharedDataId
         * @param {(import("../componentDataService").SharedDataType | undefined)} sharedDataType
         * @memberof BindingConnector
         */
        BindingConnector.updateSharedData = function (caller, value, sharedDataScope, sharedDataId, sharedDataType) {
            // get the full id
            var sharedId = sharedDataScope + '.' + sharedDataId;
            // update the corresponding binding value
            this.sharedProperties.update(caller, sharedDataType, value, sharedId, false);
        };
        /**
         * Reads a shared data item specified by scope and id
         *
         * @static
         * @template TDataType
         * @param {object} caller
         * @param {string} sharedDataScope
         * @param {string} sharedDataId
         * @param {TStoreItemConstructor} sharedDataType
         * @returns {TDataType}
         * @memberof BindingConnector
         */
        BindingConnector.readSharedData = function (caller, sharedDataScope, sharedDataId, sharedDataType) {
            // get the full id
            var sharedId = sharedDataScope + '.' + sharedDataId;
            // read and return the requested item from the store
            return this.sharedProperties.read(sharedDataType, sharedId);
        };
        // holds the binding properties to be shared between source and target binding points as property objects in a store.
        BindingConnector._sharedProperties = new store_1.Store();
        BindingConnector._sourceBindings = new Array();
        return BindingConnector;
    }());
    exports.BindingConnector = BindingConnector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ0Nvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9iaW5kaW5nQ29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWFBOzs7Ozs7T0FNRztJQUNIO1FBQUE7UUE4Y0EsQ0FBQztRQTliRyxzQkFBbUIsb0NBQWdCO1lBUm5DOzs7Ozs7O2VBT0c7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDbEMsQ0FBQzs7O1dBQUE7UUFHRDs7Ozs7OztXQU9HO1FBQ1cscUJBQUksR0FBbEIsVUFBbUIsa0JBQTJCO1lBRTFDLElBQU0saUJBQWlCLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDO1lBRXhELElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFO2dCQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2FBQ3BFO1lBRUQsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7YUFFcEU7WUFFRCwrQkFBK0I7WUFDL0Isa0JBQWtCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN4QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDWSwyQkFBVSxHQUF6QixVQUEwQixTQUFTLEVBQUUsaUJBQW9DO1lBRXJFLGlEQUFpRDtZQUNqRCxJQUFJLGlCQUFpQixDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUU7Z0JBQzFDLElBQUksU0FBUyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxZQUFZLG1CQUFVLEVBQUU7b0JBQzlELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7aUJBQ3REO3FC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SyxFQUFFLENBQUM7UUF5Y3JFLHVCQUFDO0tBQUEsQUE5Y0QsSUE4Y0M7SUE5Y1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVEJpbmRhYmxlQ2hhbmdlZEhhbmRsZXIsIFRDb25uZWN0aW9uRGF0YVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2NvbW1vblR5cGVzXCI7XHJcbmltcG9ydCB7IEJpbmRpbmcsIEJpbmRpbmdEZXNjcmlwdG9yIH0gZnJvbSBcIi4vYmluZGluZ1wiO1xyXG5pbXBvcnQgeyBEYXRhQm94IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi91dGlsaXRpZXMvZGF0YUJveFwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yZSwgVFN0b3JlSXRlbUNvbnN0cnVjdG9yIH0gZnJvbSBcIi4uLy4uL3N0b3JlXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdUeXBlIH0gZnJvbSBcIi4vYmluZGluZ1R5cGVcIjtcclxuXHJcbnR5cGUgU291cmNlTWV0aG9kQmluZGluZyA9IHtcclxuICAgIFwib2JqZWN0XCI6b2JqZWN0LFxyXG4gICAgXCJvcmlnaW5hbFNvdXJjZU1ldGhvZFwiOkZ1bmN0aW9uLFxyXG4gICAgXCJtZXRob2ROYW1lXCI6c3RyaW5nLFxyXG59XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyBhbiBpbnRlcmZhY2UgZm9yIGJpbmRpbmcvd2lyaW5nIGNvbXBvbmVudHMuIEEgYmluZGluZyBjb25uZWN0b3Igc3VwcG9ydHMgY29ubmVjdGluZyBjb21wb25lbnRzIGFuZCBleGNoYW5naW5nIGRhdGEgd2l0aG91dCBhbnlcclxuICogZGlyZWN0IGRlcGVuZGVuY2llcy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQmluZGluZ0Nvbm5lY3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJpbmRpbmdDb25uZWN0b3Ige1xyXG5cclxuXHJcbiAgICAvLyBob2xkcyB0aGUgYmluZGluZyBwcm9wZXJ0aWVzIHRvIGJlIHNoYXJlZCBiZXR3ZWVuIHNvdXJjZSBhbmQgdGFyZ2V0IGJpbmRpbmcgcG9pbnRzIGFzIHByb3BlcnR5IG9iamVjdHMgaW4gYSBzdG9yZS5cclxuICAgIHByaXZhdGUgc3RhdGljIF9zaGFyZWRQcm9wZXJ0aWVzOiBTdG9yZSA9IG5ldyBTdG9yZSgpO1xyXG4gICAgc3RhdGljIF9zb3VyY2VCaW5kaW5nczogQXJyYXk8U291cmNlTWV0aG9kQmluZGluZz4gPSBuZXcgQXJyYXkoKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBzdG9yZSB3aXRoIHRoZSBiaW5kYWJsZSBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAdHlwZSB7U3RvcmV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXQgc2hhcmVkUHJvcGVydGllcygpOiBTdG9yZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXJlZFByb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGJpbmRpbmcgYWNjb3JkaW5nIHRvIHRoZSBiaW5kaW5nIGRlY2xhcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtCaW5kaW5nfSBiaW5kaW5nRGVjbGFyYXRpb25cclxuICAgICAqIEByZXR1cm5zIHtCaW5kaW5nQ29ubmVjdG9yfVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBiaW5kKGJpbmRpbmdEZWNsYXJhdGlvbjogQmluZGluZykge1xyXG5cclxuICAgICAgICBjb25zdCBiaW5kaW5nRGVzY3JpcHRvciA9IGJpbmRpbmdEZWNsYXJhdGlvbi5kZXNjcmlwdG9yO1xyXG5cclxuICAgICAgICBpZiAoYmluZGluZ0RlY2xhcmF0aW9uLnNvdXJjZUtleSkge1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRTb3VyY2UoYmluZGluZ0RlY2xhcmF0aW9uLmNvbXBvbmVudCwgYmluZGluZ0Rlc2NyaXB0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJpbmRpbmdEZWNsYXJhdGlvbi50YXJnZXRLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kVGFyZ2V0KGJpbmRpbmdEZWNsYXJhdGlvbi5jb21wb25lbnQsIGJpbmRpbmdEZXNjcmlwdG9yKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZWxlYXNlIGNvbXBvbmVudCBkZXBlbmRlbmN5XHJcbiAgICAgICAgYmluZGluZ0RlY2xhcmF0aW9uLmNvbXBvbmVudCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0JpbmRpbmd9IGJpbmRpbmdEZWNsYXJhdGlvblxyXG4gICAgICogQG1lbWJlcm9mIEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYmluZFNvdXJjZShjb21wb25lbnQsIGJpbmRpbmdEZXNjcmlwdG9yOiBCaW5kaW5nRGVzY3JpcHRvcikge1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgY29tcG9uZW50IGNvbnRhaW5zIHRoZSBzb3VyY2Uga2V5XHJcbiAgICAgICAgaWYgKGJpbmRpbmdEZXNjcmlwdG9yLnNvdXJjZUtleSBpbiBjb21wb25lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudFtiaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXldIGluc3RhbmNlb2YgVHlwZWRFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU291cmNlRXZlbnQoY29tcG9uZW50LCBiaW5kaW5nRGVzY3JpcHRvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbXBvbmVudFtiaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXldID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTb3VyY2VNZXRob2QoY29tcG9uZW50LCBiaW5kaW5nRGVzY3JpcHRvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIGJpbmRpbmcga2V5ICVvIGlzIG5vdCBjb250YWluZWQgaW4gJW8hIFwiLCBiaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXksIGNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJpbmRzIHRoZSBjb21wb25lbnRzIHNvdXJjZSBtZXRob2QgLi4uLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0JpbmRpbmd9IGJpbmRpbmdEZXNjcmlwdG9yXHJcbiAgICAgKiBAcGFyYW0geyp9IHNvdXJjZU1lbWJlclxyXG4gICAgICogQG1lbWJlcm9mIEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYmluZFNvdXJjZU1ldGhvZChjb21wb25lbnQsIGJpbmRpbmdEZXNjcmlwdG9yOiBCaW5kaW5nRGVzY3JpcHRvcikge1xyXG4gICAgICBcclxuICAgICAgICBjb25zdCBvcmlnaW5hbFNvdXJjZU1ldGhvZCA9IGNvbXBvbmVudFtiaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXldO1xyXG5cclxuICAgICAgICAvLyBjYXB0dXJlIHJlc3BlY3RpdmVseSBpbnRlcmNlcHQgdGhlIHNvdXJjZSBtZW1iZXIgY2FsbFxyXG4gICAgICAgIGNvbXBvbmVudFtiaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXldID0gbWV0aG9kQmluZGluZ0ludGVyY2VwdG9yO1xyXG5cclxuICAgICAgICBsZXQgc291cmNlTWV0aG9kQmluZGluZzpTb3VyY2VNZXRob2RCaW5kaW5nID0ge1xyXG4gICAgICAgICAgICBcIm9iamVjdFwiOmNvbXBvbmVudCxcclxuICAgICAgICAgICAgXCJvcmlnaW5hbFNvdXJjZU1ldGhvZFwiOm9yaWdpbmFsU291cmNlTWV0aG9kLFxyXG4gICAgICAgICAgICBcIm1ldGhvZE5hbWVcIjpiaW5kaW5nRGVzY3JpcHRvci5zb3VyY2VLZXksXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZWdpc3RlciBzb3VyY2ViaW5kaW5nc1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZUJpbmRpbmdzLnB1c2goc291cmNlTWV0aG9kQmluZGluZyk7XHJcblxyXG5cclxuICAgICAgICAvLyBkZWNsYXJlcyB0aGUgbWV0aG9kIGludGVyY2VwdG9yIG5lY2Vzc2FyeSBmb3IgY2FwdHVyaW5nIHRoZSBzZW5kZXIuXHJcbiAgICAgICAgZnVuY3Rpb24gbWV0aG9kQmluZGluZ0ludGVyY2VwdG9yKHRoaXM6IGFueSwgbWV0aG9kQXJncykge1xyXG5cclxuICAgICAgICAgICAgLy8gY2FwdHVyZSB0aGUgY2FsbGVyXHJcbiAgICAgICAgICAgIGNvbnN0IGNhbGxlciA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBjYWxsIG9yaWdpbmFsIG1ldGhvZFxyXG4gICAgICAgICAgICBvcmlnaW5hbFNvdXJjZU1ldGhvZC5jYWxsKGNhbGxlciwgbWV0aG9kQXJncyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBmb3J3YXJkIHRoZSBjYWxsIHRvIHRoZSBiaW5kaW5nIGxvZ2ljXHJcbiAgICAgICAgICAgIEJpbmRpbmdDb25uZWN0b3IudXBkYXRlQmluZGluZ1ZhbHVlKGNhbGxlcixiaW5kaW5nRGVzY3JpcHRvciwgbWV0aG9kQXJncyk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBib3VuZCB2YWx1ZSB3aGVuIHRoZSBjb21wb25lbnRzIGludGVyY2VwdGVkIChib3VuZCkgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0JpbmRpbmd9IGJpbmRpbmdJbmZvXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZUJpbmRpbmdWYWx1ZShjYWxsZXIsYmluZGluZ0Rlc2NyaXB0b3I6IEJpbmRpbmdEZXNjcmlwdG9yLCBhcmdzOiBhbnkpIHtcclxuXHJcbiAgICAgICAgLy8gcGFzcyB0aGUgZGF0YSB3aXRoaW4gYSByZWZlcmVuY2UgYm94IGlmIHJlcXVpcmVkLiBUaGlzIGtlZXBzIHRoZSBkYXRhIGFuZCBpdHMgbWVtYmVycyB1bm1vZGlmaWVkIHJlc3BlY3RpdmVseSBwYXNzZWQgd2l0aG91dCBjb3B5aW5nLlxyXG4gICAgICAgIGxldCBiaW5kaW5nQXJncyA9IGJpbmRpbmdEZXNjcmlwdG9yLnBhc3NCeVZhbHVlID8gYXJncyA6IERhdGFCb3guQm94KGFyZ3MpO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGRhdGEgdHlwZSBcclxuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IGJpbmRpbmdEZXNjcmlwdG9yLmRhdGFUeXBlO1xyXG4gICAgICAgIC8vIGdldCB0aGUgYmluZGluZyBpZCBmb3IgdGhlIHRhcmdldCBvYmplY3RcclxuICAgICAgICBjb25zdCBiaW5kaW5nSWQgPSBiaW5kaW5nRGVzY3JpcHRvci5mdWxsSWQ7XHJcblxyXG4gICAgICAgIC8vIHRlbXBvcmFsIHZhcmlhYmxlIGNvbnRhaW5pbmcgdGhlIGNvbXB1dGVkIHZhbHVlIGZvciBmb3JjZVVwZGF0ZVxyXG4gICAgICAgIGxldCBjb21wdXRlZEZvcmNlVXBkYXRlVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gaW4gY2FzZSBvZiBhIGNvbW1hbmQgb3IgY29tbWFuZCByZXNwb25zZSB3ZSBuZWVkIHRvIHBhc3MgYSBudWxsIG9iamVjdCBpZiBubyBjb21tYW5kIGFyZ3MgYXJlIHByb3ZpZGVkLiBhbHNvIGZvcmNlVXBkYXRlIG5lZWRzIHRvIGJlIHRydWUgXHJcbiAgICAgICAgLy8gdG8gZm9yY2UgdGhlIGNvbW1hbmQgZXhlY3V0aW9uIGJ5IGEgc2ltdWxhdGVkIHZhbHVlIGNoYW5nZSFcclxuICAgICAgICBpZiAoYmluZGluZ0Rlc2NyaXB0b3IudHlwZSA9PT0gQmluZGluZ1R5cGUuQ09NTUFORCB8fCBiaW5kaW5nRGVzY3JpcHRvci50eXBlID09PSBCaW5kaW5nVHlwZS5DT01NQU5EX1JFU1BPTlNFKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG51bGxPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgYmluZGluZ0FyZ3MgPSBiaW5kaW5nQXJncyA/IGJpbmRpbmdBcmdzIDogbnVsbE9iamVjdDtcclxuICAgICAgICAgICAgY29tcHV0ZWRGb3JjZVVwZGF0ZVZhbHVlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgeyAvLyBpZiB0aGUgdmFsdWUgaXMgcGFzc2VkIGJ5IHJlZmVyZW5jZSwgd2UgZm9yY2UgdXBkYXRpbmcgdG8gYXZvaWQgdGhlIGNvbXBhcmlzaW9uIG9mIGNvbXBsZXggb2JqZWN0cyB3aXRoIHJlZmVyZW5jZXMgXHJcbiAgICAgICAgICAgIGNvbXB1dGVkRm9yY2VVcGRhdGVWYWx1ZSA9ICFiaW5kaW5nRGVzY3JpcHRvci5wYXNzQnlWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNldCBwcmV2aW91c2x5IGNvbXB1dGVkIHZhbHVlIGZvciBmb3JjZVVwZGF0ZSB0byBjb25zdCB2YXJpYWJsZVxyXG4gICAgICAgIGNvbnN0IGZvcmNlVXBkYXRlID0gY29tcHV0ZWRGb3JjZVVwZGF0ZVZhbHVlO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGNvcnJlc3BvbmRpbmcgYmluZGluZyB2YWx1ZVxyXG4gICAgICAgIHRoaXMuc2hhcmVkUHJvcGVydGllcy51cGRhdGUoY2FsbGVyLGRhdGFUeXBlLCBiaW5kaW5nQXJncywgYmluZGluZ0lkLCBmb3JjZVVwZGF0ZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgYWMgb21wb25lbnQgZXZlbnQgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmluZGluZ30gYmluZGluZ0RlY2xhcmF0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBiaW5kU291cmNlRXZlbnQoY29tcG9uZW50LCBiaW5kaW5nRGVzY3JpcHRvcjogQmluZGluZ0Rlc2NyaXB0b3IpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VFdmVudDogVHlwZWRFdmVudDxhbnksIGFueT4gPSBjb21wb25lbnRbYmluZGluZ0Rlc2NyaXB0b3Iuc291cmNlS2V5XTtcclxuXHJcbiAgICAgICAgc291cmNlRXZlbnQuYXR0YWNoKChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Tb3VyY2VFdmVudFJhaXNlZChiaW5kaW5nRGVzY3JpcHRvciwgc2VuZGVyLCBhcmdzKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudHMgb2JzZXJ2ZWQgKGJvdW5kKSBldmVudCBoYXMgYmVlbiByYWlzZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCaW5kaW5nfSBiaW5kaW5nSW5mb1xyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gZXZlbnRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBvblNvdXJjZUV2ZW50UmFpc2VkKGJpbmRpbmdEZXNjcmlwdG9yOiBCaW5kaW5nRGVzY3JpcHRvciwgc2VuZGVyOiBhbnksIGV2ZW50QXJnczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCaW5kaW5nVmFsdWUoc2VuZGVyLGJpbmRpbmdEZXNjcmlwdG9yLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kcyBhIGNvbXBvbmVudHMgcHJvcGVydHkgdG8gYSBiaW5kYWJsZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmluZGluZ30gYmluZGluZ0RlY2xhcmF0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBiaW5kVGFyZ2V0KGNvbXBvbmVudCwgYmluZGluZ0Rlc2NyaXB0b3I6IEJpbmRpbmdEZXNjcmlwdG9yKSB7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBjb21wb25lbnQgY29udGFpbnMgdGhlIHRhcmdldCBrZXlcclxuICAgICAgICBpZiAoYmluZGluZ0Rlc2NyaXB0b3IudGFyZ2V0S2V5IGluIGNvbXBvbmVudCkge1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0YXJnZXQgaW5zdGFuY2UgXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb25UYXJnZXQgPSBjb21wb25lbnQ7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgZGF0YSB0eXBlIFxyXG4gICAgICAgICAgICBjb25zdCBkYXRhVHlwZSA9IGJpbmRpbmdEZXNjcmlwdG9yLmRhdGFUeXBlO1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGJpbmRpbmcgaWQgZm9yIHRoZSB0YXJnZXQgb2JqZWN0XHJcbiAgICAgICAgICAgIGNvbnN0IGJpbmRpbmdJZCA9IGJpbmRpbmdEZXNjcmlwdG9yLmZ1bGxJZDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBlbmRwb2ludCBpcyBhIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IGVuZFBvaW50SXNNZXRob2QgPSB0aGlzLmVuZFBvaW50SXNGdW5jdGlvbihjb25uZWN0aW9uVGFyZ2V0LCBiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXkpO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgZW5kcG9pbnQgaXMgYSBwcm9wZXJ0eVxyXG4gICAgICAgICAgICBjb25zdCBlbmRQb2ludElzUHJvcGVydHkgPSB0aGlzLmVuZFBvaW50SXNQcm9wZXJ0eShjb25uZWN0aW9uVGFyZ2V0LCBiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGJpbmQgdGhlIHRhcmdldCBlbmRwb2ludCBhY2NvcmRpbmcgdG8gdGhlIGhhbmRsZXIgdHlwZVxyXG4gICAgICAgICAgICBpZiAoZW5kUG9pbnRJc01ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSB0YXJnZXQgaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0QmluZGluZ0NoYW5nZWRIYW5kbGVyID0gY29ubmVjdGlvblRhcmdldFtiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXldO1xyXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgbWV0aG9kIGhhbmRsZXJcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZFRhcmdldE1ldGhvZChjb25uZWN0aW9uVGFyZ2V0LCB0YXJnZXRCaW5kaW5nQ2hhbmdlZEhhbmRsZXIsIGRhdGFUeXBlLCBiaW5kaW5nSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgcHJvcGVydHkgaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kVGFyZ2V0UHJvcGVydHkoY29ubmVjdGlvblRhcmdldCwgYmluZGluZ0Rlc2NyaXB0b3IudGFyZ2V0S2V5LCBkYXRhVHlwZSwgYmluZGluZ0lkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50QmluZGluZzogVGhlIGJpbmRpbmcga2V5ICVvIGlzIG5vdCBjb250YWluZWQgaW4gJW8hIFwiLCBiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXksIGNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgYSB0YXJnZXQgbWV0aG9kIHRvIGEgYmluZGFibGUgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbm5lY3Rpb25UYXJnZXRcclxuICAgICAqIEBwYXJhbSB7VEJpbmRhYmxlQ2hhbmdlZEhhbmRsZXJ9IHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0ge1RDb25uZWN0aW9uRGF0YVR5cGV9IGRhdGFUeXBlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2JpbmRpbmdJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYmluZFRhcmdldE1ldGhvZChjb25uZWN0aW9uVGFyZ2V0OiBvYmplY3QsIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyOiBUQmluZGFibGVDaGFuZ2VkSGFuZGxlciwgZGF0YVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUsIGJpbmRpbmdJZDogc3RyaW5nID0gXCJcIikge1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgdGhlIGRhdGEgY2hhbmdlZCBoYW5kbGVyIGZvciBhbiB1cGRhdGUgbWV0aG9kIGNhbGxcclxuICAgICAgICBjb25zdCBiaW5kaW5nVmFsdWVDaGFuZ2VkSGFuZGxlcjogVEJpbmRhYmxlQ2hhbmdlZEhhbmRsZXIgPSAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiB0aGlzLmludm9rZVRhcmdldE1ldGhvZChuZXdWYWx1ZSwgb2xkVmFsdWUsIGNvbm5lY3Rpb25UYXJnZXQsIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyLCBkYXRhVHlwZSk7XHJcblxyXG4gICAgICAgIC8vIG9ic2VydmUgdGhlIHN0YXRlIGNoYW5nZSBhbmQgZm9yd2FyZCB0aGUgbm90aWZpY2F0aW9uIHRvIHRoZSB0YXJnZXQgaGFuZGxlclxyXG4gICAgICAgIHRoaXMuc2hhcmVkUHJvcGVydGllcy5vYnNlcnZlKGNvbm5lY3Rpb25UYXJnZXQsZGF0YVR5cGUsIGJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyLCBiaW5kaW5nSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgY29tcG9uZW50cyB0YXJnZXQgbWV0aG9kIHdoZW4gYSBiaW5kYWJsZSB2YWx1ZSBoYXMgYmVlbiBjaGFuZ2VkLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcGFyYW0geyp9IG9sZFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29ubmVjdGlvblRhcmdldFxyXG4gICAgICogQHBhcmFtIHtUQmluZGFibGVDaGFuZ2VkSGFuZGxlcn0gdGFyZ2V0QmluZGluZ1ZhbHVlQ2hhbmdlZEhhbmRsZXJcclxuICAgICAqIEBwYXJhbSB7VENvbm5lY3Rpb25EYXRhVHlwZX0gZGF0YVR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGludm9rZVRhcmdldE1ldGhvZChuZXdWYWx1ZTogYW55LCBvbGRWYWx1ZTogYW55LCBjb25uZWN0aW9uVGFyZ2V0OiBvYmplY3QsIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyOiBUQmluZGFibGVDaGFuZ2VkSGFuZGxlciwgZGF0YVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgY29uc3QgbW9kaWZpZWRUeXBlID0gbmV3VmFsdWUgPyB0eXBlb2YgbmV3VmFsdWUgPT09IFwib2JqZWN0XCIgPyBuZXdWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lIDogdHlwZW9mIG5ld1ZhbHVlIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldERhdGFUeXBlID0gZGF0YVR5cGUgPyB0eXBlb2YgZGF0YVR5cGUgPT09IFwic3RyaW5nXCIgPyBkYXRhVHlwZSA6IGRhdGFUeXBlLm5hbWUgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmICghZGF0YVR5cGUgfHwgKG1vZGlmaWVkVHlwZSA9PT0gdGFyZ2V0RGF0YVR5cGUpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyLmJpbmQoY29ubmVjdGlvblRhcmdldCkobmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50QmluZGluZzogY291bGQgbm90IGludm9rZSAlbyBiZWNhdXNlIGRhdGEgdHlwZXMgZG8gbm90IG1hdGNoIVwiLCBjb25uZWN0aW9uVGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kcyBhIGNvbXBvbmVudCBwcm9wZXJ0eSB0byBhIGJpbmRhYmxlIHZhbHVlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYmluZGluZ1RhcmdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldE1lbWJlck5hbWVcclxuICAgICAqIEBwYXJhbSB7VENvbm5lY3Rpb25EYXRhVHlwZX0gZGF0YVR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiaW5kaW5nSWRcclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGJpbmRUYXJnZXRQcm9wZXJ0eShiaW5kaW5nVGFyZ2V0OiBvYmplY3QsIHRhcmdldE1lbWJlck5hbWU6IHN0cmluZywgZGF0YVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUsIGJpbmRpbmdJZDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGF0YSBjaGFuZ2VkIGhhbmRsZXIgZm9yIGEgcHJvcGVydHkgdXBkYXRlXHJcbiAgICAgICAgY29uc3QgYmluZGluZ1ZhbHVlQ2hhbmdlZEhhbmRsZXI6IFRCaW5kYWJsZUNoYW5nZWRIYW5kbGVyID0gKG5ld1ZhbHVlKSA9PiB0aGlzLnVwZGF0ZVRhcmdldFByb3BlcnR5KGJpbmRpbmdUYXJnZXQsIG5ld1ZhbHVlLCB0YXJnZXRNZW1iZXJOYW1lLCBkYXRhVHlwZSk7XHJcblxyXG4gICAgICAgIC8vIG9ic2VydmUgdGhlIGRhdGEgY2hhbmdlIGFuZCBmb3J3YXJkIHRoZSBub3RpZmljYXRpb24gdG8gdGhlIHByb3BlcnR5IGNoYW5nZWQgaGFuZGxlciBcclxuICAgICAgICB0aGlzLnNoYXJlZFByb3BlcnRpZXMub2JzZXJ2ZShiaW5kaW5nVGFyZ2V0LGRhdGFUeXBlLCBiaW5kaW5nVmFsdWVDaGFuZ2VkSGFuZGxlciwgYmluZGluZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGNvbXBvbmVudHMgcHJvcGVydHkgd2hlbiBhIGJpbmRhYmxlIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBiaW5kaW5nVGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFyZ2V0TWVtYmVyTmFtZVxyXG4gICAgICogQHBhcmFtIHtUQ29ubmVjdGlvbkRhdGFUeXBlfSBkYXRhVHlwZVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlVGFyZ2V0UHJvcGVydHkoYmluZGluZ1RhcmdldDogb2JqZWN0LCBuZXdWYWx1ZTogYW55LCB0YXJnZXRNZW1iZXJOYW1lOiBzdHJpbmcsIGRhdGFUeXBlOiBUQ29ubmVjdGlvbkRhdGFUeXBlKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGNvbnN0IG1vZGlmaWVkVHlwZSA9IG5ld1ZhbHVlID8gdHlwZW9mIG5ld1ZhbHVlID09PSBcIm9iamVjdFwiID8gbmV3VmFsdWUuY29uc3RydWN0b3IubmFtZSA6IHR5cGVvZiBuZXdWYWx1ZSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBjb25zdCB0YXJnZXREYXRhVHlwZSA9IGRhdGFUeXBlID8gdHlwZW9mIGRhdGFUeXBlID09PSBcInN0cmluZ1wiID8gZGF0YVR5cGUgOiBkYXRhVHlwZS5uYW1lIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAvL1RPRE86IG1ha2Ugc3VyZSB0aGF0IHRoZSBtb2RpZmllZCB0eXBlIGFuZCBiaW5kaW5nIHR5cGUgYXJlIG1hdGNoaW5nXHJcbiAgICAgICAgLy8gaWYgKCFkYXRhVHlwZSB8fCAobW9kaWZpZWRUeXBlID09PSB0YXJnZXREYXRhVHlwZSkpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBiaW5kaW5nVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHRhcmdldE1lbWJlck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGJpbmRpbmdUYXJnZXRbdGFyZ2V0TWVtYmVyTmFtZV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGVuZCBwb2ludCBpcyBhIGZ1bmN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb25uZWN0aW9uVGFyZ2V0XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZW5kUG9pbnRJc0Z1bmN0aW9uKGNvbm5lY3Rpb25UYXJnZXQ6IG9iamVjdCwgdGFyZ2V0TWVtYmVyTmFtZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgdGFyZ2V0IGhhbmRsZXJcclxuICAgICAgICBjb25zdCBjb25uZWN0aW9uUG9pbnRIYW5kbGVyID0gY29ubmVjdGlvblRhcmdldFt0YXJnZXRNZW1iZXJOYW1lXTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGVuZHBvaW50IGlzIGEgZnVuY3Rpb25cclxuICAgICAgICBjb25zdCBlbmRQb2ludElzRnVuY3Rpb24gPSBjb25uZWN0aW9uUG9pbnRIYW5kbGVyIGluc3RhbmNlb2YgRnVuY3Rpb247XHJcblxyXG4gICAgICAgIHJldHVybiBlbmRQb2ludElzRnVuY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBlbmQgcG9pbnQgaXMgYSBwcm9wZXJ0eVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29ubmVjdGlvblRhcmdldFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGVuZFBvaW50SXNQcm9wZXJ0eShjb25uZWN0aW9uVGFyZ2V0OiBvYmplY3QsIHRhcmdldE1lbWJlck5hbWU6IHN0cmluZykge1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZW5kcG9pbnQgaXMgYSBwcm9wZXJ0eVxyXG4gICAgICAgIGNvbnN0IHRhcmdldEJhc2VPd25zUHJvcGVydHkgPSBjb25uZWN0aW9uVGFyZ2V0LmNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSh0YXJnZXRNZW1iZXJOYW1lKTtcclxuICAgICAgICBjb25zdCB0YXJnZXRPd25zUHJvcGVydHkgPSBjb25uZWN0aW9uVGFyZ2V0LmNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSh0YXJnZXRNZW1iZXJOYW1lKTtcclxuXHJcbiAgICAgICAgY29uc3QgZW5kUG9pbnRJc1Byb3BlcnR5ID0gdGFyZ2V0T3duc1Byb3BlcnR5ICYmICF0aGlzLmVuZFBvaW50SXNGdW5jdGlvbihjb25uZWN0aW9uVGFyZ2V0LCB0YXJnZXRNZW1iZXJOYW1lKTtcclxuICAgICAgICByZXR1cm4gZW5kUG9pbnRJc1Byb3BlcnR5O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuYmluZHMgYSB3aG9sZSBjb21wb25lbnQgb3IgdGhlIGJpbmRpbmcgc3BlY2lmaWVkIGJ5IHRoZSBiaW5kaW5nIGRlY2xhcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsob2JqZWN0IHwgQmluZGluZyl9IGJpbmRpbmdPYmplY3RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1bmJpbmQoYmluZGluZ09iamVjdDogb2JqZWN0IHwgQmluZGluZykge1xyXG4gXHJcbiAgICAgICAgaWYgKGJpbmRpbmdPYmplY3QgaW5zdGFuY2VvZiBCaW5kaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5iaW5kQmluZGluZyhiaW5kaW5nT2JqZWN0IGFzIEJpbmRpbmcpOyAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudW5iaW5kQ29tcG9uZW50KGJpbmRpbmdPYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmJpbmRzIGEgc3BlY2lmaWMgYmluZGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0JpbmRpbmd9IGJpbmRpbmdEZWNsYXJhdGlvblxyXG4gICAgICogQG1lbWJlcm9mIEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdW5iaW5kQmluZGluZyhiaW5kaW5nRGVjbGFyYXRpb246IEJpbmRpbmcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuYmluZHMgYWxsIGJpbmRpbmdzIHJlbGF0ZWQgdG8gdGhlIGJvdW5kIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYm91bmRPYmplY3RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVuYmluZENvbXBvbmVudChib3VuZE9iamVjdDogb2JqZWN0KSB7XHJcbiBcclxuICAgICAgICAvLyBkZXRhY2ggdGhlIGJvdW5kIG9iamVjdCBmcm9tIGFsbCBzaGFyZWQgcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMuc2hhcmVkUHJvcGVydGllcy5kZXRhY2goYm91bmRPYmplY3QpO1xyXG5cclxuICAgICAgICAvLy8vIHVuY29ubmVjdCBhbmQgcmVzdG9yZSBpbnRlcmNlcHRlZCBtZXRob2RzLlxyXG4gICAgICAgIC8vIGdldCBhbGwgb2JqZWN0cyBzb3VyY2UgYmluZGluZ3NcclxuICAgICAgICBjb25zdCBvYmplY3RTb3VyY2VCaW5kaW5ncyA9IHRoaXMuX3NvdXJjZUJpbmRpbmdzLmZpbHRlcigoc291cmNlQmluZGluZyk9PnsgcmV0dXJuIHNvdXJjZUJpbmRpbmcub2JqZWN0ID09PSBib3VuZE9iamVjdH0pO1xyXG5cclxuICAgICAgICBpZiAob2JqZWN0U291cmNlQmluZGluZ3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnVuYmluZFNvdXJjZU1ldGhvZHMob2JqZWN0U291cmNlQmluZGluZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmJpbmRzIHRoZSBpbnRlcmNlcHRlZCBtZXRob2RzIGFuZCByZXN0b3JlcyB0aGUgb3JpZ2luYWwgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtTb3VyY2VNZXRob2RCaW5kaW5nW119IG9iamVjdFNvdXJjZUJpbmRpbmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdW5iaW5kU291cmNlTWV0aG9kcyhvYmplY3RTb3VyY2VCaW5kaW5nczogU291cmNlTWV0aG9kQmluZGluZ1tdKTogU291cmNlTWV0aG9kQmluZGluZ1tdIHtcclxuICAgICAgIFxyXG4gICAgICAgIGxldCBkZWxldGVkOlNvdXJjZU1ldGhvZEJpbmRpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICBvYmplY3RTb3VyY2VCaW5kaW5ncy5mb3JFYWNoKChvYmplY3RTb3VyY2VCaW5kaW5nKT0+e1xyXG5cclxuICAgICAgICAgICAgLy8gcmVzdG9yZSBvcmlnaW5hbCBtZXRob2RcclxuICAgICAgICAgICAgbGV0IGludGVyY2VwdGVkT2JqZWN0ID0gb2JqZWN0U291cmNlQmluZGluZy5vYmplY3Q7XHJcbiAgICAgICAgICAgIGludGVyY2VwdGVkT2JqZWN0W29iamVjdFNvdXJjZUJpbmRpbmcubWV0aG9kTmFtZV0gPSBvYmplY3RTb3VyY2VCaW5kaW5nLm9yaWdpbmFsU291cmNlTWV0aG9kO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVsZXRlIHJlZ2lzdGVyZWQgbWV0aG9kIHNvdXJjZSBiaW5kaW5nXHJcbiAgICAgICAgICAgIGNvbnN0IGlEZWxldGUgPSB0aGlzLl9zb3VyY2VCaW5kaW5ncy5pbmRleE9mKG9iamVjdFNvdXJjZUJpbmRpbmcpO1xyXG4gICAgICAgICAgICBpZiAoaURlbGV0ZSA+PSAwKSAge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlZCA9IGRlbGV0ZWQuY29uY2F0KHRoaXMuX3NvdXJjZUJpbmRpbmdzLnNwbGljZShpRGVsZXRlLDEpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlbGV0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGEgc2hhcmVkIGRhdGEgaXRlbSBzcGVjaWZpZWQgYnkgc2NvcGUgYW5kIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHRlbXBsYXRlIFREYXRhVHlwZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNhbGxlclxyXG4gICAgICogQHBhcmFtIHtURGF0YVR5cGV9IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhcmVkRGF0YVNjb3BlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhcmVkRGF0YUlkXHJcbiAgICAgKiBAcGFyYW0geyhpbXBvcnQoXCIuLi9jb21wb25lbnREYXRhU2VydmljZVwiKS5TaGFyZWREYXRhVHlwZSB8IHVuZGVmaW5lZCl9IHNoYXJlZERhdGFUeXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlU2hhcmVkRGF0YTxURGF0YVR5cGU+KGNhbGxlcjogb2JqZWN0LCB2YWx1ZTogVERhdGFUeXBlLCBzaGFyZWREYXRhU2NvcGU6IHN0cmluZywgc2hhcmVkRGF0YUlkOiBzdHJpbmcsIHNoYXJlZERhdGFUeXBlOiBUQ29ubmVjdGlvbkRhdGFUeXBlIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBmdWxsIGlkXHJcbiAgICAgICAgY29uc3Qgc2hhcmVkSWQgPSBzaGFyZWREYXRhU2NvcGUgKyAnLicgKyBzaGFyZWREYXRhSWQ7XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBjb3JyZXNwb25kaW5nIGJpbmRpbmcgdmFsdWVcclxuICAgICAgICB0aGlzLnNoYXJlZFByb3BlcnRpZXMudXBkYXRlKGNhbGxlcixzaGFyZWREYXRhVHlwZSwgdmFsdWUsIHNoYXJlZElkLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYSBzaGFyZWQgZGF0YSBpdGVtIHNwZWNpZmllZCBieSBzY29wZSBhbmQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAdGVtcGxhdGUgVERhdGFUeXBlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY2FsbGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhcmVkRGF0YVNjb3BlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhcmVkRGF0YUlkXHJcbiAgICAgKiBAcGFyYW0ge1RTdG9yZUl0ZW1Db25zdHJ1Y3Rvcn0gc2hhcmVkRGF0YVR5cGVcclxuICAgICAqIEByZXR1cm5zIHtURGF0YVR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVhZFNoYXJlZERhdGE8VERhdGFUeXBlPihjYWxsZXI6IG9iamVjdCwgc2hhcmVkRGF0YVNjb3BlOiBzdHJpbmcsIHNoYXJlZERhdGFJZDogc3RyaW5nLCBzaGFyZWREYXRhVHlwZTogVFN0b3JlSXRlbUNvbnN0cnVjdG9yKTogVERhdGFUeXBlIHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBmdWxsIGlkXHJcbiAgICAgICAgY29uc3Qgc2hhcmVkSWQgPSBzaGFyZWREYXRhU2NvcGUgKyAnLicgKyBzaGFyZWREYXRhSWQ7XHJcblxyXG4gICAgICAgIC8vIHJlYWQgYW5kIHJldHVybiB0aGUgcmVxdWVzdGVkIGl0ZW0gZnJvbSB0aGUgc3RvcmVcclxuICAgICAgICByZXR1cm4gIHRoaXMuc2hhcmVkUHJvcGVydGllcy5yZWFkKHNoYXJlZERhdGFUeXBlLHNoYXJlZElkKTtcclxuICAgIH1cclxufVxyXG4iXX0=