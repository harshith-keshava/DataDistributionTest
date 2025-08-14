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
     * This conversion handles the translation of a number in settings format to a string in package format.
     * This is used to provide readable text instead of number enums in the package format.
     *
     * @class NumberStringConversion
     * @extends {AnyConversion}
     */
    var NumberStringConversion = /** @class */ (function (_super) {
        __extends(NumberStringConversion, _super);
        /**
         * Creates an instance of NumberStringConversion.
         *
         * @param {Array<string>} settingKey The keys to be addressed in the settings data by this conversion.
         * @param {Array<string>} packageKey The keys to be addressed in the package data by this conversion.
         * @param {Map<number, string>} substitutionMap The map used for matching the numbers to their replacement texts and vice versa.
         * @memberof NumberStringConversion
         */
        function NumberStringConversion(settingKey, packageKey, substitutionMap) {
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
         * @memberof NumberStringConversion
         */
        NumberStringConversion.prototype.checkMetaDataType = function (meta) {
            var _this = this;
            return meta.every(function (meta) {
                return !meta_1.Meta.isInvalid(meta) && (meta.dataType === _this.dataType || meta.dataType === "number");
            }); // or equals number is for backwards compatibility of scale package
        };
        /**
         * Checks if the data type of the data is string.
         *
         * @param {Array<any>} data
         * @returns {boolean}
         * @memberof NumberStringConversion
         */
        NumberStringConversion.prototype.checkDataTypes = function (data) {
            return data.every(function (item) { return typeof item === "string"; });
        };
        /**
         * Converts the data from package to settings format using the provided map.
         *
         * @param {Array<any>} data
         * @returns {Array<any>}
         * @memberof NumberStringConversion
         */
        NumberStringConversion.prototype.convertDataFrom = function (data) {
            var _this = this;
            return data.map(function (item) { return _this.substituteFrom(item); });
        };
        /**
         * Converts the data from settings to package format using the provided map.
         *
         * @param {Array<any>} data
         * @returns {Array<IPackage>}
         * @memberof NumberStringConversion
         */
        NumberStringConversion.prototype.convertDataTo = function (data) {
            var _this = this;
            return data.map(function (item) {
                return new package_1.Package(new meta_1.Meta(_this.dataType), _this.substituteTo(item));
            });
        };
        /**
         * Maps the number to a string using the provided map.
         *
         * @private
         * @param {number} data
         * @returns {string}
         * @memberof NumberStringConversion
         */
        NumberStringConversion.prototype.substituteTo = function (data) {
            var substitute = this.substitutionMap.get(data);
            if (substitute !== undefined) {
                return substitute;
            }
            throw new Error("No text to substitute this number available");
        };
        /**
         * Maps the string to a number using the provided map.
         *
         * @private
         * @param {string} data
         * @returns {number}
         * @memberof NumberStringConversion
         */
        NumberStringConversion.prototype.substituteFrom = function (data) {
            var substitute = undefined;
            this.substitutionMap.forEach(function (val, key) {
                if (data === val && substitute === undefined) {
                    substitute = key;
                }
            });
            if (substitute !== undefined) {
                return substitute;
            }
            throw new Error("No number for this text available");
        };
        return NumberStringConversion;
    }(anyConversion_1.AnyConversion));
    exports.NumberStringConversion = NumberStringConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyU3RyaW5nQ29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL251bWJlclN0cmluZ0NvbnZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BOzs7Ozs7T0FNRztJQUNIO1FBQXFDLDBDQUFhO1FBSzlDOzs7Ozs7O1dBT0c7UUFDSCxnQ0FBWSxVQUF5QixFQUFFLFVBQXlCLEVBQUUsZUFBb0M7WUFBdEcsWUFDSSxrQkFBTSxVQUFVLEVBQUUsVUFBVSxDQUFDLFNBR2hDO1lBRkcsS0FBSSxDQUFDLFFBQVEsR0FBRyx1QkFBUSxDQUFDLE1BQU0sQ0FBQztZQUNoQyxLQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQzs7UUFDM0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGtEQUFpQixHQUF4QixVQUF5QixJQUFrQjtZQUEzQyxpQkFJQztZQUhHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFDLElBQUk7Z0JBQ25CLE9BQU8sQ0FBQyxXQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUM7WUFDcEcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtRUFBbUU7UUFDM0UsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLCtDQUFjLEdBQXJCLFVBQXNCLElBQWdCO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFDLElBQUksSUFBTyxPQUFPLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxnREFBZSxHQUF0QixVQUF1QixJQUFnQjtZQUF2QyxpQkFHQztZQURHLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBTyxPQUFPLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksOENBQWEsR0FBcEIsVUFBcUIsSUFBZ0I7WUFBckMsaUJBSUM7WUFIRyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJO2dCQUNqQixPQUFPLElBQUksaUJBQU8sQ0FBQyxJQUFJLFdBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyw2Q0FBWSxHQUFwQixVQUFxQixJQUFZO1lBRTdCLElBQUksVUFBVSxHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVwRSxJQUFHLFVBQVUsS0FBSyxTQUFTLEVBQUU7Z0JBQ3pCLE9BQU8sVUFBVSxDQUFDO2FBQ3JCO1lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssK0NBQWMsR0FBdEIsVUFBdUIsSUFBWTtZQUUvQixJQUFJLFVBQVUsR0FBdUIsU0FBUyxDQUFBO1lBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUc7Z0JBQ2xDLElBQUcsSUFBSSxLQUFLLEdBQUcsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO29CQUN6QyxVQUFVLEdBQUcsR0FBRyxDQUFDO2lCQUNwQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBRyxVQUFVLEtBQUssU0FBUyxFQUFFO2dCQUN6QixPQUFPLFVBQVUsQ0FBQzthQUNyQjtZQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBN0dELENBQXFDLDZCQUFhLEdBNkdqRDtJQUVRLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFueUNvbnZlcnNpb24gfSBmcm9tIFwiLi9hbnlDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IERhdGFUeXBlIH0gZnJvbSBcIi4vZW51bS9kYXRhVHlwZUVudW1cIjtcclxuaW1wb3J0IHsgSVBhY2thZ2UgfSBmcm9tIFwiLi9pbnRlcmZhY2UvcGFja2FnZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQYWNrYWdlIH0gZnJvbSBcIi4vcGFja2FnZVwiO1xyXG5pbXBvcnQgeyBNZXRhIH0gZnJvbSBcIi4vbWV0YVwiO1xyXG5pbXBvcnQgeyBJTWV0YSB9IGZyb20gXCIuL2ludGVyZmFjZS9tZXRhSW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBjb252ZXJzaW9uIGhhbmRsZXMgdGhlIHRyYW5zbGF0aW9uIG9mIGEgbnVtYmVyIGluIHNldHRpbmdzIGZvcm1hdCB0byBhIHN0cmluZyBpbiBwYWNrYWdlIGZvcm1hdC5cclxuICogVGhpcyBpcyB1c2VkIHRvIHByb3ZpZGUgcmVhZGFibGUgdGV4dCBpbnN0ZWFkIG9mIG51bWJlciBlbnVtcyBpbiB0aGUgcGFja2FnZSBmb3JtYXQuXHJcbiAqXHJcbiAqIEBjbGFzcyBOdW1iZXJTdHJpbmdDb252ZXJzaW9uXHJcbiAqIEBleHRlbmRzIHtBbnlDb252ZXJzaW9ufVxyXG4gKi9cclxuY2xhc3MgTnVtYmVyU3RyaW5nQ29udmVyc2lvbiBleHRlbmRzIEFueUNvbnZlcnNpb24ge1xyXG5cclxuICAgIC8vIG1hcCBjb250YWluaW5nIHRoZSBtYXRjaGluZyBiZXR3ZWVuIG51bWJlcnMgYW5kIHRleHQuXHJcbiAgICBwcml2YXRlIHN1YnN0aXR1dGlvbk1hcDogTWFwPG51bWJlciwgc3RyaW5nPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTnVtYmVyU3RyaW5nQ29udmVyc2lvbi5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZXR0aW5nS2V5IFRoZSBrZXlzIHRvIGJlIGFkZHJlc3NlZCBpbiB0aGUgc2V0dGluZ3MgZGF0YSBieSB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHBhY2thZ2VLZXkgVGhlIGtleXMgdG8gYmUgYWRkcmVzc2VkIGluIHRoZSBwYWNrYWdlIGRhdGEgYnkgdGhpcyBjb252ZXJzaW9uLlxyXG4gICAgICogQHBhcmFtIHtNYXA8bnVtYmVyLCBzdHJpbmc+fSBzdWJzdGl0dXRpb25NYXAgVGhlIG1hcCB1c2VkIGZvciBtYXRjaGluZyB0aGUgbnVtYmVycyB0byB0aGVpciByZXBsYWNlbWVudCB0ZXh0cyBhbmQgdmljZSB2ZXJzYS5cclxuICAgICAqIEBtZW1iZXJvZiBOdW1iZXJTdHJpbmdDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdLZXk6IEFycmF5PHN0cmluZz4sIHBhY2thZ2VLZXk6IEFycmF5PHN0cmluZz4sIHN1YnN0aXR1dGlvbk1hcDogTWFwPG51bWJlciwgc3RyaW5nPikge1xyXG4gICAgICAgIHN1cGVyKHNldHRpbmdLZXksIHBhY2thZ2VLZXkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVR5cGUgPSBEYXRhVHlwZS5TVFJJTkc7XHJcbiAgICAgICAgdGhpcy5zdWJzdGl0dXRpb25NYXAgPSBzdWJzdGl0dXRpb25NYXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGRhdGFUeXBlIGNvbnRhaW5lZCBpbiB0aGUgSU1ldGEgZGF0YSBpcyBjb3JyZWN0IGZvciB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJTWV0YT59IG1ldGFcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE51bWJlclN0cmluZ0NvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrTWV0YURhdGFUeXBlKG1ldGE6IEFycmF5PElNZXRhPik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBtZXRhLmV2ZXJ5KChtZXRhKSA9PiB7IFxyXG4gICAgICAgICAgICByZXR1cm4gIU1ldGEuaXNJbnZhbGlkKG1ldGEpICYmIChtZXRhLmRhdGFUeXBlID09PSB0aGlzLmRhdGFUeXBlIHx8IG1ldGEuZGF0YVR5cGUgPT09IFwibnVtYmVyXCIpO1xyXG4gICAgICAgIH0pOyAvLyBvciBlcXVhbHMgbnVtYmVyIGlzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBvZiBzY2FsZSBwYWNrYWdlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGRhdGEgdHlwZSBvZiB0aGUgZGF0YSBpcyBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBOdW1iZXJTdHJpbmdDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja0RhdGFUeXBlcyhkYXRhOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZXZlcnkoKGl0ZW0pID0+IHsgcmV0dXJuIHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIHRoZSBkYXRhIGZyb20gcGFja2FnZSB0byBzZXR0aW5ncyBmb3JtYXQgdXNpbmcgdGhlIHByb3ZpZGVkIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE51bWJlclN0cmluZ0NvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnREYXRhRnJvbShkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRhdGEubWFwKChpdGVtKSA9PiB7IHJldHVybiB0aGlzLnN1YnN0aXR1dGVGcm9tKGl0ZW0pOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIHRoZSBkYXRhIGZyb20gc2V0dGluZ3MgdG8gcGFja2FnZSBmb3JtYXQgdXNpbmcgdGhlIHByb3ZpZGVkIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUGFja2FnZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTnVtYmVyU3RyaW5nQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFUbyhkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8SVBhY2thZ2U+IHtcclxuICAgICAgICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0pID0+IHsgXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGFja2FnZShuZXcgTWV0YSh0aGlzLmRhdGFUeXBlKSwgdGhpcy5zdWJzdGl0dXRlVG8oaXRlbSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyB0aGUgbnVtYmVyIHRvIGEgc3RyaW5nIHVzaW5nIHRoZSBwcm92aWRlZCBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE51bWJlclN0cmluZ0NvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdWJzdGl0dXRlVG8oZGF0YTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc3Vic3RpdHV0ZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdGhpcy5zdWJzdGl0dXRpb25NYXAuZ2V0KGRhdGEpO1xyXG5cclxuICAgICAgICBpZihzdWJzdGl0dXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB0ZXh0IHRvIHN1YnN0aXR1dGUgdGhpcyBudW1iZXIgYXZhaWxhYmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyB0aGUgc3RyaW5nIHRvIGEgbnVtYmVyIHVzaW5nIHRoZSBwcm92aWRlZCBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE51bWJlclN0cmluZ0NvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdWJzdGl0dXRlRnJvbShkYXRhOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cclxuICAgICAgICBsZXQgc3Vic3RpdHV0ZTogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICAgICAgdGhpcy5zdWJzdGl0dXRpb25NYXAuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYoZGF0YSA9PT0gdmFsICYmIHN1YnN0aXR1dGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc3Vic3RpdHV0ZSA9IGtleTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHN1YnN0aXR1dGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG51bWJlciBmb3IgdGhpcyB0ZXh0IGF2YWlsYWJsZVwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTnVtYmVyU3RyaW5nQ29udmVyc2lvbiB9Il19