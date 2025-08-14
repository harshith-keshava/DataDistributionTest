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
define(["require", "exports", "./anyConversion", "./enum/dataTypeEnum", "./meta", "./package"], function (require, exports, anyConversion_1, dataTypeEnum_1, meta_1, package_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The conversion handling the type string.
     *
     * @class StringConversion
     * @extends {AnyConversion}
     */
    var NumberOrStringToStringConversion = /** @class */ (function (_super) {
        __extends(NumberOrStringToStringConversion, _super);
        /**
         * Creates an instance of StringConversion.
         *
         * @param {Array<string>} settingKey The keys to be addressed in the settings data by this conversion.
         * @param {Array<string>} packageKey The keys to be addressed in the package data by this conversion.
         * @memberof StringConversion
         */
        function NumberOrStringToStringConversion(settingKey, packageKey) {
            var _this = _super.call(this, settingKey, packageKey) || this;
            _this.dataType = dataTypeEnum_1.DataType.STRING;
            return _this;
        }
        /**
         * Checks if the data type is number.
         *
         * @param {Array<any>} data
         * @returns {boolean}
         * @memberof StringConversion
         */
        NumberOrStringToStringConversion.prototype.checkDataTypes = function (data) {
            return data.every(function (item) { return typeof item === "string" || typeof item === "number"; });
        };
        /**
         * Converts the data from settings to package format via the string constructor.
         *
         * @param {Array<any>} data
         * @returns {Array<IPackage>}
         * @memberof StringConversion
         */
        NumberOrStringToStringConversion.prototype.convertDataTo = function (data) {
            var _this = this;
            return data.map(function (item) { return new package_1.Package(new meta_1.Meta(_this.dataType), new String(item).valueOf()); });
        };
        /**
         * Converts the data from package to settings format.
         *
         * @param {Array<any>} data
         * @returns {Array<any>}
         * @memberof StringConversion
         */
        NumberOrStringToStringConversion.prototype.convertDataFrom = function (data) {
            return data.map(function (item) { return new String(item).valueOf(); });
        };
        return NumberOrStringToStringConversion;
    }(anyConversion_1.AnyConversion));
    exports.NumberOrStringToStringConversion = NumberOrStringToStringConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyT3JTdHJpbmdUb1N0cmluZ0NvbnZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9udW1iZXJPclN0cmluZ1RvU3RyaW5nQ29udmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7Ozs7O09BS0c7SUFDSDtRQUErQyxvREFBYTtRQUV4RDs7Ozs7O1dBTUc7UUFDSCwwQ0FBWSxVQUF5QixFQUFFLFVBQXlCO1lBQWhFLFlBQ0ksa0JBQU0sVUFBVSxFQUFFLFVBQVUsQ0FBQyxTQUVoQztZQURHLEtBQUksQ0FBQyxRQUFRLEdBQUcsdUJBQVEsQ0FBQyxNQUFNLENBQUM7O1FBQ3BDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSx5REFBYyxHQUFyQixVQUFzQixJQUFnQjtZQUNsQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBQyxJQUFJLElBQU8sT0FBTyxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEcsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHdEQUFhLEdBQXBCLFVBQXFCLElBQWdCO1lBQXJDLGlCQUVDO1lBREcsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFPLE9BQU8sSUFBSSxpQkFBTyxDQUFDLElBQUksV0FBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDMUcsQ0FBQztRQUVBOzs7Ozs7V0FNRztRQUNHLDBEQUFlLEdBQXRCLFVBQXVCLElBQWdCO1lBQ25DLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBTSxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUNMLHVDQUFDO0lBQUQsQ0FBQyxBQTlDRCxDQUErQyw2QkFBYSxHQThDM0Q7SUFFUSw0RUFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbnlDb252ZXJzaW9uIH0gZnJvbSBcIi4vYW55Q29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gXCIuL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IE1ldGEgfSBmcm9tIFwiLi9tZXRhXCI7XHJcbmltcG9ydCB7IFBhY2thZ2UgfSBmcm9tIFwiLi9wYWNrYWdlXCI7XHJcbmltcG9ydCB7IElQYWNrYWdlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL3BhY2thZ2VJbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgY29udmVyc2lvbiBoYW5kbGluZyB0aGUgdHlwZSBzdHJpbmcuXHJcbiAqXHJcbiAqIEBjbGFzcyBTdHJpbmdDb252ZXJzaW9uXHJcbiAqIEBleHRlbmRzIHtBbnlDb252ZXJzaW9ufVxyXG4gKi9cclxuY2xhc3MgTnVtYmVyT3JTdHJpbmdUb1N0cmluZ0NvbnZlcnNpb24gZXh0ZW5kcyBBbnlDb252ZXJzaW9uIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU3RyaW5nQ29udmVyc2lvbi5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZXR0aW5nS2V5IFRoZSBrZXlzIHRvIGJlIGFkZHJlc3NlZCBpbiB0aGUgc2V0dGluZ3MgZGF0YSBieSB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHBhY2thZ2VLZXkgVGhlIGtleXMgdG8gYmUgYWRkcmVzc2VkIGluIHRoZSBwYWNrYWdlIGRhdGEgYnkgdGhpcyBjb252ZXJzaW9uLlxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ0NvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ0tleTogQXJyYXk8c3RyaW5nPiwgcGFja2FnZUtleTogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHN1cGVyKHNldHRpbmdLZXksIHBhY2thZ2VLZXkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVR5cGUgPSBEYXRhVHlwZS5TVFJJTkc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGRhdGEgdHlwZSBpcyBudW1iZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja0RhdGFUeXBlcyhkYXRhOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZXZlcnkoKGl0ZW0pID0+IHsgcmV0dXJuIHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBpdGVtID09PSBcIm51bWJlclwiOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIHRoZSBkYXRhIGZyb20gc2V0dGluZ3MgdG8gcGFja2FnZSBmb3JtYXQgdmlhIHRoZSBzdHJpbmcgY29uc3RydWN0b3IuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBhY2thZ2U+fVxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ0NvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnREYXRhVG8oZGF0YTogQXJyYXk8YW55Pik6IEFycmF5PElQYWNrYWdlPiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEubWFwKChpdGVtKSA9PiB7IHJldHVybiBuZXcgUGFja2FnZShuZXcgTWV0YSh0aGlzLmRhdGFUeXBlKSwgbmV3IFN0cmluZyhpdGVtKS52YWx1ZU9mKCkpfSk7XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICAqIENvbnZlcnRzIHRoZSBkYXRhIGZyb20gcGFja2FnZSB0byBzZXR0aW5ncyBmb3JtYXQuXHJcbiAgICAgICpcclxuICAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGRhdGFcclxuICAgICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cclxuICAgICAgKiBAbWVtYmVyb2YgU3RyaW5nQ29udmVyc2lvblxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnREYXRhRnJvbShkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEubWFwKChpdGVtKSA9PiB7cmV0dXJuIG5ldyBTdHJpbmcoaXRlbSkudmFsdWVPZigpO30pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBOdW1iZXJPclN0cmluZ1RvU3RyaW5nQ29udmVyc2lvbiB9Il19