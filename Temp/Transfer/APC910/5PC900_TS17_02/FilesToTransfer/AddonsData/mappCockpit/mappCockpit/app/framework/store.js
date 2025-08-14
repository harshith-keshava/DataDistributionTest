define(["require", "exports", "./property", "../common/utilities/objectx", "./componentHub/componentDataHub"], function (require, exports, property_1, objectx_1, componentDataHub_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implemens a store for holding and sharing named data objects.
     *
     * @export
     * @class Store
     */
    var Store = /** @class */ (function () {
        function Store() {
            /**
             * holds the named store items
             *
             * @protected
             * @memberof Store
             */
            this._items = new Map();
        }
        /**
         * reads a named store item
         *
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
         * @param {TStoreItemConstructor} storeItemTypeConstructor specifies the type to be constructed
         * @param {string} [storeItemId] specifies store items id
         * @returns {STOREITEMTYPE} the requested store item
         * @memberof Store
         */
        Store.prototype.read = function (storeItemTypeConstructor, storeItemId) {
            // retrieve a copy of a named store item
            var itemValue = this.getStoreItem(storeItemId, storeItemTypeConstructor).value;
            // we copy the item value to prohibit directly modifying the original object.
            var storeItem = property_1.Property.copyValue(itemValue, storeItemTypeConstructor);
            return storeItem;
        };
        /**
         * updates the store item with values of the specified item
         *
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
         * @param {*} storeItemTypeConstructor specifies the type to be constructed
         * @param {string} [storeItemId] specifies store items id
         * @memberof Store
         */
        Store.prototype.update = function (caller, storeItemTypeConstructor, newValue, storeItemId, forceUpdate) {
            if (forceUpdate === void 0) { forceUpdate = false; }
            // get the named store item
            var storeItemProperty = this.getStoreItem(storeItemId, storeItemTypeConstructor);
            // register the caller as accessor
            if (!storeItemProperty.isAccessedBy(caller)) {
                storeItemProperty.attachAccessor(caller);
            }
            // update (and notify observers implicitly) the state properties value if the state objects content has changed. If the update
            // is forced the vaule is updated anyway and in response sent to listeners.
            if (forceUpdate || !objectx_1.ObjectX.deepEquals(storeItemProperty.value, newValue)) {
                // console.log("updated modified state: old %o new %o",storeItemProperty.value,modifiedStoreItem);
                // update the store item value
                storeItemProperty.update(newValue, storeItemTypeConstructor);
                // notify component data hub from updating a shared property
                componentDataHub_1.ComponentDataHub.notifyChanged(this, newValue, newValue);
            }
        };
        /**
         * observes changes of the store item as a consequence of an update call.
         *
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
         * @param {*} storeItemTypeConstructor specifies the type to be constructed
         * @param {(newValue: STOREITEMTYPE, oldValue: STOREITEMTYPE) => void} storeItemChangedCallback
         * @param {string} [storeItemId] specifies store items id
         * @memberof Store
         */
        Store.prototype.observe = function (caller, storeItemTypeConstructor, storeItemChangedCallback, storeItemId) {
            // get the named store item
            var storeItem = this.getStoreItem(storeItemId, storeItemTypeConstructor);
            // observe the value change of the property and notify the caller
            if (!storeItem.isObservedBy(caller)) {
                // register the caller as observer
                storeItem.attachObserver(caller, storeItemChangedCallback, storeItemTypeConstructor);
            }
            else {
                console.error("shared propery store: The item %o is already attached to observer %o", storeItem, caller);
            }
        };
        /**
         * checks if the store contains the specified item
         *
         * @param {string} itemId specifies store items id
         * @returns {*}
         * @memberof Store
         */
        Store.prototype.contains = function (itemId) {
            return this._items.has(itemId);
        };
        /**
         * retrieves the store item by id
         *
         * @private
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
         * @param {string} storeItemId specifies store items id
         * @param {TConnectionDataType} storeItemType specifies the type to be constructed
         * @returns {Property<STOREITEMTYPE>} a property object holding the store item
         * @memberof Store
         */
        Store.prototype.getStoreItem = function (storeItemId, storeItemType) {
            var itemType = typeof storeItemType !== "string" ? storeItemType : undefined;
            var effectivestoreItemId = storeItemId ? storeItemId : itemType ? itemType.name : "undefined";
            // get the existing property by id
            var property = this._items.get(effectivestoreItemId);
            // create a new one if not yet available
            if (!property) {
                // create an initial tore item value
                var initialStoreItemValue = itemType ? new itemType() : undefined;
                property = property_1.Property.create(initialStoreItemValue);
                // put the new property into the map
                this._items.set(effectivestoreItemId, property);
                // notify component data hub from creating a shared property
                if (initialStoreItemValue) {
                    componentDataHub_1.ComponentDataHub.notifyCreated(this, initialStoreItemValue);
                }
            }
            return property;
        };
        /**
         * Detaches all properties connected to the bound object
         *
         * @param {object} boundObject
         * @memberof Store
         */
        Store.prototype.detach = function (boundObject) {
            this.detachBoundObjectFromProperties(boundObject);
            this.deleteUnattachedProperties();
        };
        /**
         * Detaches the bound object from the related properties
         *
         * @private
         * @param {object} boundObject
         * @memberof Store
         */
        Store.prototype.detachBoundObjectFromProperties = function (boundObject) {
            // retrieve all observed properties
            var observedProperties = Array.from(this._items.values()).filter(function (storeProperty) { return storeProperty.isObservedBy(boundObject); });
            // detach the bound object from these properties as observer
            observedProperties.forEach(function (property) { property.detachObserver(boundObject); });
            // retrieve all accessed properties
            var accessedProperties = Array.from(this._items.values()).filter(function (storeProperty) { return storeProperty.isAccessedBy(boundObject); });
            // detach the bound object from these properties as accessor
            accessedProperties.forEach(function (property) { property.detachAccessor(boundObject); });
        };
        /**
         * Deletes all properties from the store which are not observed or accessed.
         *
         * @private
         * @memberof Store
         */
        Store.prototype.deleteUnattachedProperties = function () {
            var _this = this;
            // get the unattchaed property keys
            var unattachedPropertyKeys = Array.from(this._items.keys()).filter(function (storePropertyKey) {
                var propertyIsUnattached = false;
                var storeProperty = _this._items.get(storePropertyKey);
                if (storeProperty) {
                    propertyIsUnattached = !storeProperty.isAttached;
                }
                return propertyIsUnattached;
            });
            //// remove the unattached properties from the store
            unattachedPropertyKeys.forEach(function (unattachedPropertyKey) {
                _this._items.delete(unattachedPropertyKey);
            });
        };
        return Store;
    }());
    exports.Store = Store;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQTs7Ozs7T0FLRztJQUNIO1FBQUE7WUFFSTs7Ozs7ZUFLRztZQUNPLFdBQU0sR0FBNkIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQTRMM0QsQ0FBQztRQXpMRzs7Ozs7Ozs7V0FRRztRQUNILG9CQUFJLEdBQUosVUFBb0Isd0JBQStDLEVBQUUsV0FBbUI7WUFDcEYsd0NBQXdDO1lBQ3hDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQWdCLFdBQVcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNoRyw2RUFBNkU7WUFDN0UsSUFBSSxTQUFTLEdBQWtCLG1CQUFRLENBQUMsU0FBUyxDQUFnQixTQUFTLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztZQUN0RyxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNILHNCQUFNLEdBQU4sVUFBc0IsTUFBYyxFQUFFLHdCQUF3QixFQUFFLFFBQXVCLEVBQUUsV0FBbUIsRUFBRSxXQUE0QjtZQUE1Qiw0QkFBQSxFQUFBLG1CQUE0QjtZQUV0SSwyQkFBMkI7WUFDM0IsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFnQixXQUFXLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztZQUVoRyxrQ0FBa0M7WUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDekMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzVDO1lBRUQsOEhBQThIO1lBQzlILDJFQUEyRTtZQUMzRSxJQUFJLFdBQVcsSUFBSSxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRTtn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LENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLFlBQUM7SUFBRCxDQUFDLEFBcE1ELElBb01DO0lBcE1ZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBPYmplY3RYIH0gZnJvbSBcIi4uL2NvbW1vbi91dGlsaXRpZXMvb2JqZWN0eFwiO1xyXG5pbXBvcnQgeyBUQ29uc3RydWN0b3IsIFRDb25uZWN0aW9uRGF0YVR5cGUgfSBmcm9tIFwiLi9jb21wb25lbnRIdWIvY29tbW9uL2NvbW1vblR5cGVzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERhdGFIdWIgfSBmcm9tIFwiLi9jb21wb25lbnRIdWIvY29tcG9uZW50RGF0YUh1YlwiO1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFRTdG9yZUl0ZW1Db25zdHJ1Y3RvciA9IG5ldyAoKSA9PiBvYmplY3Q7XHJcbi8qKlxyXG4gKiBJbXBsZW1lbnMgYSBzdG9yZSBmb3IgaG9sZGluZyBhbmQgc2hhcmluZyBuYW1lZCBkYXRhIG9iamVjdHMuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFN0b3JlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3RvcmUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaG9sZHMgdGhlIG5hbWVkIHN0b3JlIGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBfaXRlbXM6TWFwPHN0cmluZyxQcm9wZXJ0eTxhbnk+PiA9IG5ldyBNYXAoKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhIG5hbWVkIHN0b3JlIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAdGVtcGxhdGUgU1RPUkVJVEVNVFlQRSBzcGVjaWZpZXMgdGhlIHN0b3JlIGl0ZW1zIHR5cGUgZm9yIGNhc3RpbmcgdG8gdGhlIHJlc3VsdCB0eXBlXHJcbiAgICAgKiBAcGFyYW0ge1RTdG9yZUl0ZW1Db25zdHJ1Y3Rvcn0gc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yIHNwZWNpZmllcyB0aGUgdHlwZSB0byBiZSBjb25zdHJ1Y3RlZCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RvcmVJdGVtSWRdIHNwZWNpZmllcyBzdG9yZSBpdGVtcyBpZFxyXG4gICAgICogQHJldHVybnMge1NUT1JFSVRFTVRZUEV9IHRoZSByZXF1ZXN0ZWQgc3RvcmUgaXRlbVxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIHJlYWQ8U1RPUkVJVEVNVFlQRT4oc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yOiBUU3RvcmVJdGVtQ29uc3RydWN0b3IsIHN0b3JlSXRlbUlkOiBzdHJpbmcpOiBTVE9SRUlURU1UWVBFIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSBhIGNvcHkgb2YgYSBuYW1lZCBzdG9yZSBpdGVtXHJcbiAgICAgICAgY29uc3QgaXRlbVZhbHVlID0gdGhpcy5nZXRTdG9yZUl0ZW08U1RPUkVJVEVNVFlQRT4oc3RvcmVJdGVtSWQsIHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvcikudmFsdWU7XHJcbiAgICAgICAgLy8gd2UgY29weSB0aGUgaXRlbSB2YWx1ZSB0byBwcm9oaWJpdCBkaXJlY3RseSBtb2RpZnlpbmcgdGhlIG9yaWdpbmFsIG9iamVjdC5cclxuICAgICAgICBsZXQgc3RvcmVJdGVtOiBTVE9SRUlURU1UWVBFID0gUHJvcGVydHkuY29weVZhbHVlPFNUT1JFSVRFTVRZUEU+KGl0ZW1WYWx1ZSwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yKTtcclxuICAgICAgICByZXR1cm4gc3RvcmVJdGVtO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgdGhlIHN0b3JlIGl0ZW0gd2l0aCB2YWx1ZXMgb2YgdGhlIHNwZWNpZmllZCBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHRlbXBsYXRlIFNUT1JFSVRFTVRZUEUgc3BlY2lmaWVzIHRoZSBzdG9yZSBpdGVtcyB0eXBlIGZvciBjYXN0aW5nIHRvIHRoZSByZXN1bHQgdHlwZVxyXG4gICAgICogQHBhcmFtIHsqfSBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3Igc3BlY2lmaWVzIHRoZSB0eXBlIHRvIGJlIGNvbnN0cnVjdGVkIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtzdG9yZUl0ZW1JZF0gc3BlY2lmaWVzIHN0b3JlIGl0ZW1zIGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgU3RvcmVcclxuICAgICAqL1xyXG4gICAgdXBkYXRlPFNUT1JFSVRFTVRZUEU+KGNhbGxlcjogb2JqZWN0LCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IsIG5ld1ZhbHVlOiBTVE9SRUlURU1UWVBFLCBzdG9yZUl0ZW1JZDogc3RyaW5nLCBmb3JjZVVwZGF0ZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbmFtZWQgc3RvcmUgaXRlbVxyXG4gICAgICAgIGxldCBzdG9yZUl0ZW1Qcm9wZXJ0eSA9IHRoaXMuZ2V0U3RvcmVJdGVtPFNUT1JFSVRFTVRZUEU+KHN0b3JlSXRlbUlkLCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IpO1xyXG5cclxuICAgICAgICAvLyByZWdpc3RlciB0aGUgY2FsbGVyIGFzIGFjY2Vzc29yXHJcbiAgICAgICAgaWYgKCFzdG9yZUl0ZW1Qcm9wZXJ0eS5pc0FjY2Vzc2VkQnkoY2FsbGVyKSkge1xyXG4gICAgICAgICAgICBzdG9yZUl0ZW1Qcm9wZXJ0eS5hdHRhY2hBY2Nlc3NvcihjYWxsZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIChhbmQgbm90aWZ5IG9ic2VydmVycyBpbXBsaWNpdGx5KSB0aGUgc3RhdGUgcHJvcGVydGllcyB2YWx1ZSBpZiB0aGUgc3RhdGUgb2JqZWN0cyBjb250ZW50IGhhcyBjaGFuZ2VkLiBJZiB0aGUgdXBkYXRlXHJcbiAgICAgICAgLy8gaXMgZm9yY2VkIHRoZSB2YXVsZSBpcyB1cGRhdGVkIGFueXdheSBhbmQgaW4gcmVzcG9uc2Ugc2VudCB0byBsaXN0ZW5lcnMuXHJcbiAgICAgICAgaWYgKGZvcmNlVXBkYXRlIHx8ICFPYmplY3RYLmRlZXBFcXVhbHMoc3RvcmVJdGVtUHJvcGVydHkudmFsdWUsIG5ld1ZhbHVlKSkge1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ1cGRhdGVkIG1vZGlmaWVkIHN0YXRlOiBvbGQgJW8gbmV3ICVvXCIsc3RvcmVJdGVtUHJvcGVydHkudmFsdWUsbW9kaWZpZWRTdG9yZUl0ZW0pO1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHN0b3JlIGl0ZW0gdmFsdWVcclxuICAgICAgICAgICAgc3RvcmVJdGVtUHJvcGVydHkudXBkYXRlKG5ld1ZhbHVlLHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3Rvcik7XHJcblxyXG4gICAgICAgICAgICAvLyBub3RpZnkgY29tcG9uZW50IGRhdGEgaHViIGZyb20gdXBkYXRpbmcgYSBzaGFyZWQgcHJvcGVydHlcclxuICAgICAgICAgICAgQ29tcG9uZW50RGF0YUh1Yi5ub3RpZnlDaGFuZ2VkKHRoaXMsbmV3VmFsdWUsbmV3VmFsdWUpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvYnNlcnZlcyBjaGFuZ2VzIG9mIHRoZSBzdG9yZSBpdGVtIGFzIGEgY29uc2VxdWVuY2Ugb2YgYW4gdXBkYXRlIGNhbGwuXHJcbiAgICAgKlxyXG4gICAgICogQHRlbXBsYXRlIFNUT1JFSVRFTVRZUEUgc3BlY2lmaWVzIHRoZSBzdG9yZSBpdGVtcyB0eXBlIGZvciBjYXN0aW5nIHRvIHRoZSByZXN1bHQgdHlwZVxyXG4gICAgICogQHBhcmFtIHsqfSBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3Igc3BlY2lmaWVzIHRoZSB0eXBlIHRvIGJlIGNvbnN0cnVjdGVkIFxyXG4gICAgICogQHBhcmFtIHsobmV3VmFsdWU6IFNUT1JFSVRFTVRZUEUsIG9sZFZhbHVlOiBTVE9SRUlURU1UWVBFKSA9PiB2b2lkfSBzdG9yZUl0ZW1DaGFuZ2VkQ2FsbGJhY2tcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RvcmVJdGVtSWRdIHNwZWNpZmllcyBzdG9yZSBpdGVtcyBpZFxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIG9ic2VydmU8U1RPUkVJVEVNVFlQRT4oY2FsbGVyOiBvYmplY3QsIHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3Rvciwgc3RvcmVJdGVtQ2hhbmdlZENhbGxiYWNrOiAobmV3VmFsdWU6IFNUT1JFSVRFTVRZUEUsIG9sZFZhbHVlOiBTVE9SRUlURU1UWVBFKSA9PiB2b2lkLCBzdG9yZUl0ZW1JZDogc3RyaW5nKTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbmFtZWQgc3RvcmUgaXRlbVxyXG4gICAgICAgIGxldCBzdG9yZUl0ZW0gPSB0aGlzLmdldFN0b3JlSXRlbTxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1JZCwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yKTtcclxuXHJcbiAgICAgICAgLy8gb2JzZXJ2ZSB0aGUgdmFsdWUgY2hhbmdlIG9mIHRoZSBwcm9wZXJ0eSBhbmQgbm90aWZ5IHRoZSBjYWxsZXJcclxuICAgICAgICBpZiAoIXN0b3JlSXRlbS5pc09ic2VydmVkQnkoY2FsbGVyKSkge1xyXG4gICAgICAgICAgICAvLyByZWdpc3RlciB0aGUgY2FsbGVyIGFzIG9ic2VydmVyXHJcbiAgICAgICAgICAgIHN0b3JlSXRlbS5hdHRhY2hPYnNlcnZlcihjYWxsZXIsc3RvcmVJdGVtQ2hhbmdlZENhbGxiYWNrLHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzaGFyZWQgcHJvcGVyeSBzdG9yZTogVGhlIGl0ZW0gJW8gaXMgYWxyZWFkeSBhdHRhY2hlZCB0byBvYnNlcnZlciAlb1wiLCBzdG9yZUl0ZW0sIGNhbGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoZWNrcyBpZiB0aGUgc3RvcmUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW1JZCBzcGVjaWZpZXMgc3RvcmUgaXRlbXMgaWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIGNvbnRhaW5zKGl0ZW1JZDogc3RyaW5nKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzKGl0ZW1JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyaWV2ZXMgdGhlIHN0b3JlIGl0ZW0gYnkgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHRlbXBsYXRlIFNUT1JFSVRFTVRZUEUgc3BlY2lmaWVzIHRoZSBzdG9yZSBpdGVtcyB0eXBlIGZvciBjYXN0aW5nIHRvIHRoZSByZXN1bHQgdHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0b3JlSXRlbUlkIHNwZWNpZmllcyBzdG9yZSBpdGVtcyBpZFxyXG4gICAgICogQHBhcmFtIHtUQ29ubmVjdGlvbkRhdGFUeXBlfSBzdG9yZUl0ZW1UeXBlIHNwZWNpZmllcyB0aGUgdHlwZSB0byBiZSBjb25zdHJ1Y3RlZCBcclxuICAgICAqIEByZXR1cm5zIHtQcm9wZXJ0eTxTVE9SRUlURU1UWVBFPn0gYSBwcm9wZXJ0eSBvYmplY3QgaG9sZGluZyB0aGUgc3RvcmUgaXRlbVxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U3RvcmVJdGVtPFNUT1JFSVRFTVRZUEU+KHN0b3JlSXRlbUlkOiBzdHJpbmcsIHN0b3JlSXRlbVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUpOiBQcm9wZXJ0eTxTVE9SRUlURU1UWVBFPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW1UeXBlOiBUQ29uc3RydWN0b3IgfCB1bmRlZmluZWQgPSB0eXBlb2Ygc3RvcmVJdGVtVHlwZSAhPT0gXCJzdHJpbmdcIiA/IHN0b3JlSXRlbVR5cGUgYXMgVENvbnN0cnVjdG9yIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBsZXQgZWZmZWN0aXZlc3RvcmVJdGVtSWQgPSBzdG9yZUl0ZW1JZCA/IHN0b3JlSXRlbUlkIDogaXRlbVR5cGUgPyBpdGVtVHlwZS5uYW1lIDogXCJ1bmRlZmluZWRcIjtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBleGlzdGluZyBwcm9wZXJ0eSBieSBpZFxyXG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMuX2l0ZW1zLmdldChlZmZlY3RpdmVzdG9yZUl0ZW1JZCk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBvbmUgaWYgbm90IHlldCBhdmFpbGFibGVcclxuICAgICAgICBpZiAoIXByb3BlcnR5KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYW4gaW5pdGlhbCB0b3JlIGl0ZW0gdmFsdWVcclxuICAgICAgICAgICAgbGV0IGluaXRpYWxTdG9yZUl0ZW1WYWx1ZSA9IGl0ZW1UeXBlID8gbmV3IGl0ZW1UeXBlKCkgOiB1bmRlZmluZWQgYXMgYW55O1xyXG4gICAgICAgICAgICBwcm9wZXJ0eSA9IFByb3BlcnR5LmNyZWF0ZTxTVE9SRUlURU1UWVBFPihpbml0aWFsU3RvcmVJdGVtVmFsdWUpO1xyXG4gICAgICAgICAgICAvLyBwdXQgdGhlIG5ldyBwcm9wZXJ0eSBpbnRvIHRoZSBtYXBcclxuICAgICAgICAgICAgdGhpcy5faXRlbXMuc2V0KGVmZmVjdGl2ZXN0b3JlSXRlbUlkLHByb3BlcnR5KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5vdGlmeSBjb21wb25lbnQgZGF0YSBodWIgZnJvbSBjcmVhdGluZyBhIHNoYXJlZCBwcm9wZXJ0eVxyXG4gICAgICAgICAgICBpZiAoaW5pdGlhbFN0b3JlSXRlbVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBDb21wb25lbnREYXRhSHViLm5vdGlmeUNyZWF0ZWQodGhpcyxpbml0aWFsU3RvcmVJdGVtVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcGVydHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyBhbGwgcHJvcGVydGllcyBjb25uZWN0ZWQgdG8gdGhlIGJvdW5kIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBib3VuZE9iamVjdFxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXRhY2goYm91bmRPYmplY3Q6IG9iamVjdCkge1xyXG4gIFxyXG4gICAgICAgIHRoaXMuZGV0YWNoQm91bmRPYmplY3RGcm9tUHJvcGVydGllcyhib3VuZE9iamVjdCk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVsZXRlVW5hdHRhY2hlZFByb3BlcnRpZXMoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIGJvdW5kIG9iamVjdCBmcm9tIHRoZSByZWxhdGVkIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGJvdW5kT2JqZWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RvcmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hCb3VuZE9iamVjdEZyb21Qcm9wZXJ0aWVzKGJvdW5kT2JqZWN0OiBvYmplY3QpIHtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgYWxsIG9ic2VydmVkIHByb3BlcnRpZXNcclxuICAgICAgICBjb25zdCBvYnNlcnZlZFByb3BlcnRpZXM6IEFycmF5PFByb3BlcnR5PGFueT4+ID0gQXJyYXkuZnJvbSh0aGlzLl9pdGVtcy52YWx1ZXMoKSkuZmlsdGVyKChzdG9yZVByb3BlcnR5KSA9PiB7IHJldHVybiBzdG9yZVByb3BlcnR5LmlzT2JzZXJ2ZWRCeShib3VuZE9iamVjdCk7IH0pO1xyXG4gICAgICAgIC8vIGRldGFjaCB0aGUgYm91bmQgb2JqZWN0IGZyb20gdGhlc2UgcHJvcGVydGllcyBhcyBvYnNlcnZlclxyXG4gICAgICAgIG9ic2VydmVkUHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4geyBwcm9wZXJ0eS5kZXRhY2hPYnNlcnZlcihib3VuZE9iamVjdCk7IH0pO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSBhbGwgYWNjZXNzZWQgcHJvcGVydGllc1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc2VkUHJvcGVydGllczogQXJyYXk8UHJvcGVydHk8YW55Pj4gPSBBcnJheS5mcm9tKHRoaXMuX2l0ZW1zLnZhbHVlcygpKS5maWx0ZXIoKHN0b3JlUHJvcGVydHkpID0+IHsgcmV0dXJuIHN0b3JlUHJvcGVydHkuaXNBY2Nlc3NlZEJ5KGJvdW5kT2JqZWN0KTsgfSk7XHJcbiAgICAgICAgLy8gZGV0YWNoIHRoZSBib3VuZCBvYmplY3QgZnJvbSB0aGVzZSBwcm9wZXJ0aWVzIGFzIGFjY2Vzc29yXHJcbiAgICAgICAgYWNjZXNzZWRQcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7IHByb3BlcnR5LmRldGFjaEFjY2Vzc29yKGJvdW5kT2JqZWN0KTsgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGFsbCBwcm9wZXJ0aWVzIGZyb20gdGhlIHN0b3JlIHdoaWNoIGFyZSBub3Qgb2JzZXJ2ZWQgb3IgYWNjZXNzZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlbGV0ZVVuYXR0YWNoZWRQcm9wZXJ0aWVzKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgdW5hdHRjaGFlZCBwcm9wZXJ0eSBrZXlzXHJcbiAgICAgICAgY29uc3QgdW5hdHRhY2hlZFByb3BlcnR5S2V5cyA9IEFycmF5LmZyb20odGhpcy5faXRlbXMua2V5cygpKS5maWx0ZXIoKHN0b3JlUHJvcGVydHlLZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHByb3BlcnR5SXNVbmF0dGFjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlUHJvcGVydHkgPSB0aGlzLl9pdGVtcy5nZXQoc3RvcmVQcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIGlmIChzdG9yZVByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUlzVW5hdHRhY2hlZCA9ICFzdG9yZVByb3BlcnR5LmlzQXR0YWNoZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5SXNVbmF0dGFjaGVkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLy8vIHJlbW92ZSB0aGUgdW5hdHRhY2hlZCBwcm9wZXJ0aWVzIGZyb20gdGhlIHN0b3JlXHJcbiAgICAgICAgdW5hdHRhY2hlZFByb3BlcnR5S2V5cy5mb3JFYWNoKCh1bmF0dGFjaGVkUHJvcGVydHlLZXkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faXRlbXMuZGVsZXRlKHVuYXR0YWNoZWRQcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=