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
define(["require", "exports", "./anyConversion", "./enum/dataTypeEnum", "./enum/additionalMetaKeys", "./package", "./meta"], function (require, exports, anyConversion_1, dataTypeEnum_1, additionalMetaKeys_1, package_1, meta_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The conversion handling arrays.
     *
     * @class ArrayConversion
     * @extends {AnyConversion}
     */
    var ArrayConversion = /** @class */ (function (_super) {
        __extends(ArrayConversion, _super);
        /**
         * Creates an instance of ArrayConversion.
         *
         * @param {Array<string>} settingKey The keys to be addressed in the settings data by this conversion.
         * @param {Array<string>} packageKey The keys to be addressed in the package data by this conversion.
         * @param {AnyConversion} contentConversion The conversion to be used for the array elements.
         * @memberof ArrayConversion
         */
        function ArrayConversion(settingKey, packageKey, contentConversion) {
            var _this = _super.call(this, settingKey, packageKey) || this;
            _this.dataType = dataTypeEnum_1.DataType.ARRAY;
            _this.contentConversion = contentConversion;
            return _this;
        }
        /**
         * Checks if the additional meta infos contains the correct arrayType for the provided content conversion.
         *
         * @param {Array<IMeta>} meta
         * @returns {boolean}
         * @memberof ArrayConversion
         */
        ArrayConversion.prototype.checkAdditionalMetaInfos = function (meta) {
            var contentDataType = this.contentConversion.getDataType();
            return meta.every(function (meta) { return !meta_1.Meta.isInvalid(meta) && (meta[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE] === contentDataType || meta[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE] === dataTypeEnum_1.DataType.INVALID); });
        };
        /**
         * Checks if the data types of the array elements match with the provided content conversion
         *
         * @param {Array<any>} data
         * @returns {boolean}
         * @memberof ArrayConversion
         */
        ArrayConversion.prototype.checkDataTypes = function (data) {
            var _this = this;
            return data.every(function (item) { return Array.isArray(item) && _this.contentConversion.checkDataTypes(item); });
        };
        /**
         * Performs the conversion from package to setting format of the content conversion for each array element.
         *
         * @param {Array<any>} data
         * @returns {Array<any>}
         * @memberof ArrayConversion
         */
        ArrayConversion.prototype.convertDataFrom = function (data) {
            var _this = this;
            return data.map(function (item) { return _this.contentConversion.convertDataFrom(item); });
        };
        /**
         * Performs the conversion from setting to package format of the content conversion for each array element.
         *
         * @param {Array<any>} data
         * @returns {Array<IPackage>}
         * @memberof ArrayConversion
         */
        ArrayConversion.prototype.convertDataTo = function (data) {
            var _this = this;
            var packageArray;
            var contentDataType = this.contentConversion.getDataType();
            if (contentDataType === dataTypeEnum_1.DataType.INVALID) { // If the content conversion IMeta datatype is of type INVALID, for each key an invalid package should be returned instead of an array.
                packageArray = data.map(function () { return package_1.Package.createInvalid(); });
            }
            else { // for every else IMeta datatype, an array package should be returned for each key.
                packageArray = data.map(function (item) { return new package_1.Package(new meta_1.Meta(_this.dataType, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: contentDataType }]), _this.contentConversion.convertDataTo(item).map(function (elem) { return elem.data; })); });
            }
            return packageArray;
        };
        return ArrayConversion;
    }(anyConversion_1.AnyConversion));
    exports.ArrayConversion = ArrayConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlDb252ZXJzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYXJyYXlDb252ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQTs7Ozs7T0FLRztJQUNIO1FBQThCLG1DQUFhO1FBS3ZDOzs7Ozs7O1dBT0c7UUFDSCx5QkFBWSxVQUF5QixFQUFFLFVBQXlCLEVBQUUsaUJBQWdDO1lBQWxHLFlBQ0ksa0JBQU0sVUFBVSxFQUFFLFVBQVUsQ0FBQyxTQUdoQztZQUZHLEtBQUksQ0FBQyxRQUFRLEdBQUcsdUJBQVEsQ0FBQyxLQUFLLENBQUM7WUFDL0IsS0FBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDOztRQUMvQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksa0RBQXdCLEdBQS9CLFVBQWdDLElBQWtCO1lBQzlDLElBQUksZUFBZSxHQUFhLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBQyxJQUFJLElBQU8sT0FBTyxDQUFDLFdBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsdUNBQWtCLENBQUMsU0FBUyxDQUFDLEtBQUssZUFBZSxJQUFJLElBQUksQ0FBQyx1Q0FBa0IsQ0FBQyxTQUFTLENBQUMsS0FBSyx1QkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDeEwsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHdDQUFjLEdBQXJCLFVBQXNCLElBQWdCO1lBQXRDLGlCQUVDO1lBREcsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQUMsSUFBSSxJQUFPLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0csQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHlDQUFlLEdBQXRCLFVBQXVCLElBQWdCO1lBQXZDLGlCQUVDO1lBREcsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFPLE9BQU8sS0FBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSx1Q0FBYSxHQUFwQixVQUFxQixJQUFnQjtZQUFyQyxpQkFVQztZQVRHLElBQUksWUFBNkIsQ0FBQztZQUNsQyxJQUFJLGVBQWUsR0FBYSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFckUsSUFBRyxlQUFlLEtBQUssdUJBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSx1SUFBdUk7Z0JBQzlLLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU8sT0FBTyxpQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7YUFDcEU7aUJBQU0sRUFBRSxtRkFBbUY7Z0JBQ3hGLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFPLE9BQU8sSUFBSSxpQkFBTyxDQUFDLElBQUksV0FBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFDLEdBQUcsRUFBRSx1Q0FBa0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBQyxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBTyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7YUFDck87WUFDRCxPQUFPLFlBQVksQ0FBQztRQUN4QixDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBdkVELENBQThCLDZCQUFhLEdBdUUxQztJQUVRLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW55Q29udmVyc2lvbiB9IGZyb20gXCIuL2FueUNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgRGF0YVR5cGUgfSBmcm9tIFwiLi9lbnVtL2RhdGFUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBJUGFja2FnZSB9IGZyb20gXCIuL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElNZXRhIH0gZnJvbSBcIi4vaW50ZXJmYWNlL21ldGFJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQWRkaXRpb25hbE1ldGFLZXlzIH0gZnJvbSBcIi4vZW51bS9hZGRpdGlvbmFsTWV0YUtleXNcIjtcclxuaW1wb3J0IHsgUGFja2FnZSB9IGZyb20gXCIuL3BhY2thZ2VcIjtcclxuaW1wb3J0IHsgTWV0YSB9IGZyb20gXCIuL21ldGFcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgY29udmVyc2lvbiBoYW5kbGluZyBhcnJheXMuXHJcbiAqXHJcbiAqIEBjbGFzcyBBcnJheUNvbnZlcnNpb25cclxuICogQGV4dGVuZHMge0FueUNvbnZlcnNpb259XHJcbiAqL1xyXG5jbGFzcyBBcnJheUNvbnZlcnNpb24gZXh0ZW5kcyBBbnlDb252ZXJzaW9uIHtcclxuXHJcbiAgICAvL3RoZSBjb252ZXJzaW9uIGZvciB0aGUgYXJyYXkgZWxlbWVudHNcclxuICAgIHByaXZhdGUgY29udGVudENvbnZlcnNpb246IEFueUNvbnZlcnNpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFycmF5Q29udmVyc2lvbi5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZXR0aW5nS2V5IFRoZSBrZXlzIHRvIGJlIGFkZHJlc3NlZCBpbiB0aGUgc2V0dGluZ3MgZGF0YSBieSB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHBhY2thZ2VLZXkgVGhlIGtleXMgdG8gYmUgYWRkcmVzc2VkIGluIHRoZSBwYWNrYWdlIGRhdGEgYnkgdGhpcyBjb252ZXJzaW9uLlxyXG4gICAgICogQHBhcmFtIHtBbnlDb252ZXJzaW9ufSBjb250ZW50Q29udmVyc2lvbiBUaGUgY29udmVyc2lvbiB0byBiZSB1c2VkIGZvciB0aGUgYXJyYXkgZWxlbWVudHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgQXJyYXlDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdLZXk6IEFycmF5PHN0cmluZz4sIHBhY2thZ2VLZXk6IEFycmF5PHN0cmluZz4sIGNvbnRlbnRDb252ZXJzaW9uOiBBbnlDb252ZXJzaW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc2V0dGluZ0tleSwgcGFja2FnZUtleSk7XHJcbiAgICAgICAgdGhpcy5kYXRhVHlwZSA9IERhdGFUeXBlLkFSUkFZO1xyXG4gICAgICAgIHRoaXMuY29udGVudENvbnZlcnNpb24gPSBjb250ZW50Q29udmVyc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgYWRkaXRpb25hbCBtZXRhIGluZm9zIGNvbnRhaW5zIHRoZSBjb3JyZWN0IGFycmF5VHlwZSBmb3IgdGhlIHByb3ZpZGVkIGNvbnRlbnQgY29udmVyc2lvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElNZXRhPn0gbWV0YVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQXJyYXlDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja0FkZGl0aW9uYWxNZXRhSW5mb3MobWV0YTogQXJyYXk8SU1ldGE+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnREYXRhVHlwZTogRGF0YVR5cGUgPSB0aGlzLmNvbnRlbnRDb252ZXJzaW9uLmdldERhdGFUeXBlKCk7XHJcbiAgICAgICAgcmV0dXJuIG1ldGEuZXZlcnkoKG1ldGEpID0+IHsgcmV0dXJuICFNZXRhLmlzSW52YWxpZChtZXRhKSAmJiAobWV0YVtBZGRpdGlvbmFsTWV0YUtleXMuQVJSQVlUWVBFXSA9PT0gY29udGVudERhdGFUeXBlIHx8IG1ldGFbQWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRV0gPT09IERhdGFUeXBlLklOVkFMSUQpfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGRhdGEgdHlwZXMgb2YgdGhlIGFycmF5IGVsZW1lbnRzIG1hdGNoIHdpdGggdGhlIHByb3ZpZGVkIGNvbnRlbnQgY29udmVyc2lvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQXJyYXlDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja0RhdGFUeXBlcyhkYXRhOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZXZlcnkoKGl0ZW0pID0+IHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoaXRlbSkgJiYgdGhpcy5jb250ZW50Q29udmVyc2lvbi5jaGVja0RhdGFUeXBlcyhpdGVtKSB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBQZXJmb3JtcyB0aGUgY29udmVyc2lvbiBmcm9tIHBhY2thZ2UgdG8gc2V0dGluZyBmb3JtYXQgb2YgdGhlIGNvbnRlbnQgY29udmVyc2lvbiBmb3IgZWFjaCBhcnJheSBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgQXJyYXlDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb252ZXJ0RGF0YUZyb20oZGF0YTogQXJyYXk8YW55Pik6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHJldHVybiBkYXRhLm1hcCgoaXRlbSkgPT4geyByZXR1cm4gdGhpcy5jb250ZW50Q29udmVyc2lvbi5jb252ZXJ0RGF0YUZyb20oaXRlbSk7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQZXJmb3JtcyB0aGUgY29udmVyc2lvbiBmcm9tIHNldHRpbmcgdG8gcGFja2FnZSBmb3JtYXQgb2YgdGhlIGNvbnRlbnQgY29udmVyc2lvbiBmb3IgZWFjaCBhcnJheSBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQYWNrYWdlPn1cclxuICAgICAqIEBtZW1iZXJvZiBBcnJheUNvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnREYXRhVG8oZGF0YTogQXJyYXk8YW55Pik6IEFycmF5PElQYWNrYWdlPiB7XHJcbiAgICAgICAgbGV0IHBhY2thZ2VBcnJheTogQXJyYXk8SVBhY2thZ2U+O1xyXG4gICAgICAgIGxldCBjb250ZW50RGF0YVR5cGU6IERhdGFUeXBlID0gdGhpcy5jb250ZW50Q29udmVyc2lvbi5nZXREYXRhVHlwZSgpO1xyXG5cclxuICAgICAgICBpZihjb250ZW50RGF0YVR5cGUgPT09IERhdGFUeXBlLklOVkFMSUQpIHsgLy8gSWYgdGhlIGNvbnRlbnQgY29udmVyc2lvbiBJTWV0YSBkYXRhdHlwZSBpcyBvZiB0eXBlIElOVkFMSUQsIGZvciBlYWNoIGtleSBhbiBpbnZhbGlkIHBhY2thZ2Ugc2hvdWxkIGJlIHJldHVybmVkIGluc3RlYWQgb2YgYW4gYXJyYXkuXHJcbiAgICAgICAgICAgIHBhY2thZ2VBcnJheSA9IGRhdGEubWFwKCgpID0+IHtyZXR1cm4gUGFja2FnZS5jcmVhdGVJbnZhbGlkKCk7fSk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gZm9yIGV2ZXJ5IGVsc2UgSU1ldGEgZGF0YXR5cGUsIGFuIGFycmF5IHBhY2thZ2Ugc2hvdWxkIGJlIHJldHVybmVkIGZvciBlYWNoIGtleS5cclxuICAgICAgICAgICAgcGFja2FnZUFycmF5ID0gZGF0YS5tYXAoKGl0ZW0pID0+IHsgcmV0dXJuIG5ldyBQYWNrYWdlKG5ldyBNZXRhKHRoaXMuZGF0YVR5cGUsIFt7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuQVJSQVlUWVBFLCB2YWx1ZTogY29udGVudERhdGFUeXBlfV0pLCB0aGlzLmNvbnRlbnRDb252ZXJzaW9uLmNvbnZlcnREYXRhVG8oaXRlbSkubWFwKChlbGVtKSA9PiB7IHJldHVybiBlbGVtLmRhdGE7IH0pKX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFja2FnZUFycmF5O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBBcnJheUNvbnZlcnNpb24gfSJdfQ==