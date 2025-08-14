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
define(["require", "exports", "./anyConversion", "./enum/dataTypeEnum", "./package", "./meta"], function (require, exports, anyConversion_1, dataTypeEnum_1, package_1, meta_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This conversion handles the translation of a string in settings format to another string in package format.
     *
     * @class StringStringConversion
     * @extends {AnyConversion}
     */
    var StringStringConversion = /** @class */ (function (_super) {
        __extends(StringStringConversion, _super);
        /**
         * Creates an instance of StringStringConversion.
         *
         * @param {Array<string>} settingKey The keys to be addressed in the settings data by this conversion.
         * @param {Array<string>} packageKey The keys to be addressed in the package data by this conversion.
         * @param {Map<string, string>} substitutionMap The map used for matching the different strings.
         * @memberof StringStringConversion
         */
        function StringStringConversion(settingKey, packageKey, substitutionMap) {
            var _this = _super.call(this, settingKey, packageKey) || this;
            _this.dataType = dataTypeEnum_1.DataType.STRING;
            _this.substitutionMap = substitutionMap;
            return _this;
        }
        /**
         * Checks if the dataType contained in the IMeta data is correct for this conversion.
         *
         * @param {Array<IMeta>} meta
         * @returns {boolean}
         * @memberof StringStringConversion
         */
        StringStringConversion.prototype.checkMetaDataType = function (meta) {
            var _this = this;
            return meta.every(function (meta) {
                return !meta_1.Meta.isInvalid(meta) && meta.dataType === _this.dataType;
            });
        };
        /**
         * Checks if the data type of the data is string.
         *
         * @param {Array<any>} data
         * @returns {boolean}
         * @memberof StringStringConversion
         */
        StringStringConversion.prototype.checkDataTypes = function (data) {
            return data.every(function (item) { return typeof item === "string"; });
        };
        /**
         * Converts the data from package to settings format using the provided map.
         *
         * @param {Array<string>} data
         * @returns {Array<any>}
         * @memberof StringStringConversion
         */
        StringStringConversion.prototype.convertDataFrom = function (data) {
            var _this = this;
            return data.map(function (item) { return _this.substituteFrom(item); });
        };
        /**
         * Converts the data from settings to package format using the provided map.
         *
         * @param {Array<string>} data
         * @returns {Array<IPackage>}
         * @memberof StringStringConversion
         */
        StringStringConversion.prototype.convertDataTo = function (data) {
            var _this = this;
            return data.map(function (item) {
                return new package_1.Package(new meta_1.Meta(_this.dataType), _this.substituteTo(item));
            });
        };
        /**
         * Maps the settings format string to the package format string using the provided map.
         *
         * @private
         * @param {string} data
         * @returns {string}
         * @memberof StringStringConversion
         */
        StringStringConversion.prototype.substituteTo = function (data) {
            var substitute = this.substitutionMap.get(data);
            if (substitute !== undefined) {
                return substitute;
            }
            throw new Error("No replacement text available");
        };
        /**
         * Maps the package format string to the settings format string using the provided map.
         *
         * @private
         * @param {string} data
         * @returns {string}
         * @memberof StringStringConversion
         */
        StringStringConversion.prototype.substituteFrom = function (data) {
            var substitute = undefined;
            this.substitutionMap.forEach(function (val, key) {
                if (data === val && substitute === undefined) {
                    substitute = key;
                }
            });
            if (substitute !== undefined) {
                return substitute;
            }
            throw new Error("No replacement text available");
        };
        return StringStringConversion;
    }(anyConversion_1.AnyConversion));
    exports.StringStringConversion = StringStringConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nU3RyaW5nQ29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL3N0cmluZ1N0cmluZ0NvbnZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BOzs7OztPQUtHO0lBQ0g7UUFBcUMsMENBQWE7UUFLOUM7Ozs7Ozs7V0FPRztRQUNILGdDQUFZLFVBQXlCLEVBQUUsVUFBeUIsRUFBRSxlQUFvQztZQUF0RyxZQUNJLGtCQUFNLFVBQVUsRUFBRSxVQUFVLENBQUMsU0FHaEM7WUFGRyxLQUFJLENBQUMsUUFBUSxHQUFHLHVCQUFRLENBQUMsTUFBTSxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDOztRQUMzQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksa0RBQWlCLEdBQXhCLFVBQXlCLElBQWtCO1lBQTNDLGlCQUlDO1lBSEcsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQUMsSUFBSTtnQkFDbkIsT0FBTyxDQUFDLFdBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLCtDQUFjLEdBQXJCLFVBQXNCLElBQWdCO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFDLElBQUksSUFBTyxPQUFPLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxnREFBZSxHQUF0QixVQUF1QixJQUFtQjtZQUExQyxpQkFHQztZQURHLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBTyxPQUFPLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksOENBQWEsR0FBcEIsVUFBcUIsSUFBbUI7WUFBeEMsaUJBSUM7WUFIRyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJO2dCQUNqQixPQUFPLElBQUksaUJBQU8sQ0FBQyxJQUFJLFdBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyw2Q0FBWSxHQUFwQixVQUFxQixJQUFZO1lBRTdCLElBQUksVUFBVSxHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVwRSxJQUFHLFVBQVUsS0FBSyxTQUFTLEVBQUU7Z0JBQ3pCLE9BQU8sVUFBVSxDQUFDO2FBQ3JCO1lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssK0NBQWMsR0FBdEIsVUFBdUIsSUFBWTtZQUUvQixJQUFJLFVBQVUsR0FBdUIsU0FBUyxDQUFBO1lBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUc7Z0JBQ2xDLElBQUcsSUFBSSxLQUFLLEdBQUcsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO29CQUN6QyxVQUFVLEdBQUcsR0FBRyxDQUFDO2lCQUNwQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBRyxVQUFVLEtBQUssU0FBUyxFQUFFO2dCQUN6QixPQUFPLFVBQVUsQ0FBQzthQUNyQjtZQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBN0dELENBQXFDLDZCQUFhLEdBNkdqRDtJQUVRLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFueUNvbnZlcnNpb24gfSBmcm9tIFwiLi9hbnlDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IERhdGFUeXBlIH0gZnJvbSBcIi4vZW51bS9kYXRhVHlwZUVudW1cIjtcclxuaW1wb3J0IHsgSU1ldGEgfSBmcm9tIFwiLi9pbnRlcmZhY2UvbWV0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUGFja2FnZSB9IGZyb20gXCIuL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBhY2thZ2UgfSBmcm9tIFwiLi9wYWNrYWdlXCI7aW1wb3J0IHsgTWV0YSB9IGZyb20gXCIuL21ldGFcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbnZlcnNpb24gaGFuZGxlcyB0aGUgdHJhbnNsYXRpb24gb2YgYSBzdHJpbmcgaW4gc2V0dGluZ3MgZm9ybWF0IHRvIGFub3RoZXIgc3RyaW5nIGluIHBhY2thZ2UgZm9ybWF0LlxyXG4gKlxyXG4gKiBAY2xhc3MgU3RyaW5nU3RyaW5nQ29udmVyc2lvblxyXG4gKiBAZXh0ZW5kcyB7QW55Q29udmVyc2lvbn1cclxuICovXHJcbmNsYXNzIFN0cmluZ1N0cmluZ0NvbnZlcnNpb24gZXh0ZW5kcyBBbnlDb252ZXJzaW9uIHtcclxuXHJcbiAgICAvLyBtYXAgY29udGFpbmluZyB0aGUgbWF0Y2hpbmcgYmV0d2VlbiB0aGUgZGlmZmVyZW50IHN0cmluZ3NcclxuICAgIHByaXZhdGUgc3Vic3RpdHV0aW9uTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTdHJpbmdTdHJpbmdDb252ZXJzaW9uLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHNldHRpbmdLZXkgVGhlIGtleXMgdG8gYmUgYWRkcmVzc2VkIGluIHRoZSBzZXR0aW5ncyBkYXRhIGJ5IHRoaXMgY29udmVyc2lvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gcGFja2FnZUtleSBUaGUga2V5cyB0byBiZSBhZGRyZXNzZWQgaW4gdGhlIHBhY2thZ2UgZGF0YSBieSB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IHN1YnN0aXR1dGlvbk1hcCBUaGUgbWFwIHVzZWQgZm9yIG1hdGNoaW5nIHRoZSBkaWZmZXJlbnQgc3RyaW5ncy5cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdTdHJpbmdDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdLZXk6IEFycmF5PHN0cmluZz4sIHBhY2thZ2VLZXk6IEFycmF5PHN0cmluZz4sIHN1YnN0aXR1dGlvbk1hcDogTWFwPHN0cmluZywgc3RyaW5nPikge1xyXG4gICAgICAgIHN1cGVyKHNldHRpbmdLZXksIHBhY2thZ2VLZXkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVR5cGUgPSBEYXRhVHlwZS5TVFJJTkc7XHJcbiAgICAgICAgdGhpcy5zdWJzdGl0dXRpb25NYXAgPSBzdWJzdGl0dXRpb25NYXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGRhdGFUeXBlIGNvbnRhaW5lZCBpbiB0aGUgSU1ldGEgZGF0YSBpcyBjb3JyZWN0IGZvciB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJTWV0YT59IG1ldGFcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ1N0cmluZ0NvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrTWV0YURhdGFUeXBlKG1ldGE6IEFycmF5PElNZXRhPik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBtZXRhLmV2ZXJ5KChtZXRhKSA9PiB7IFxyXG4gICAgICAgICAgICByZXR1cm4gIU1ldGEuaXNJbnZhbGlkKG1ldGEpICYmIG1ldGEuZGF0YVR5cGUgPT09IHRoaXMuZGF0YVR5cGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGRhdGEgdHlwZSBvZiB0aGUgZGF0YSBpcyBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdTdHJpbmdDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja0RhdGFUeXBlcyhkYXRhOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZXZlcnkoKGl0ZW0pID0+IHsgcmV0dXJuIHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIHRoZSBkYXRhIGZyb20gcGFja2FnZSB0byBzZXR0aW5ncyBmb3JtYXQgdXNpbmcgdGhlIHByb3ZpZGVkIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ1N0cmluZ0NvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnREYXRhRnJvbShkYXRhOiBBcnJheTxzdHJpbmc+KTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRhdGEubWFwKChpdGVtKSA9PiB7IHJldHVybiB0aGlzLnN1YnN0aXR1dGVGcm9tKGl0ZW0pOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIHRoZSBkYXRhIGZyb20gc2V0dGluZ3MgdG8gcGFja2FnZSBmb3JtYXQgdXNpbmcgdGhlIHByb3ZpZGVkIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUGFja2FnZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RyaW5nU3RyaW5nQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFUbyhkYXRhOiBBcnJheTxzdHJpbmc+KTogQXJyYXk8SVBhY2thZ2U+IHtcclxuICAgICAgICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0pID0+IHsgXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGFja2FnZShuZXcgTWV0YSh0aGlzLmRhdGFUeXBlKSwgdGhpcy5zdWJzdGl0dXRlVG8oaXRlbSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyB0aGUgc2V0dGluZ3MgZm9ybWF0IHN0cmluZyB0byB0aGUgcGFja2FnZSBmb3JtYXQgc3RyaW5nIHVzaW5nIHRoZSBwcm92aWRlZCBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ1N0cmluZ0NvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdWJzdGl0dXRlVG8oZGF0YTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc3Vic3RpdHV0ZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdGhpcy5zdWJzdGl0dXRpb25NYXAuZ2V0KGRhdGEpO1xyXG5cclxuICAgICAgICBpZihzdWJzdGl0dXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyByZXBsYWNlbWVudCB0ZXh0IGF2YWlsYWJsZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgdGhlIHBhY2thZ2UgZm9ybWF0IHN0cmluZyB0byB0aGUgc2V0dGluZ3MgZm9ybWF0IHN0cmluZyB1c2luZyB0aGUgcHJvdmlkZWQgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdTdHJpbmdDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3Vic3RpdHV0ZUZyb20oZGF0YTogc3RyaW5nKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgbGV0IHN1YnN0aXR1dGU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIHRoaXMuc3Vic3RpdHV0aW9uTWFwLmZvckVhY2goKHZhbCwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGRhdGEgPT09IHZhbCAmJiBzdWJzdGl0dXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN1YnN0aXR1dGUgPSBrZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihzdWJzdGl0dXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyByZXBsYWNlbWVudCB0ZXh0IGF2YWlsYWJsZVwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgU3RyaW5nU3RyaW5nQ29udmVyc2lvbiB9Il19