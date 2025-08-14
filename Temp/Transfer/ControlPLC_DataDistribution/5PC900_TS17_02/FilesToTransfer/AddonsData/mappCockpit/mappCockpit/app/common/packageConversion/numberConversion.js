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
     * This conversion handles the type number.
     *
     * @class NumberConversion
     * @extends {AnyConversion}
     */
    var NumberConversion = /** @class */ (function (_super) {
        __extends(NumberConversion, _super);
        /**
         * Creates an instance of NumberConversion.
         *
         * @param {Array<string>} settingKey The keys to be addressed in the settings data by this conversion.
         * @param {Array<string>} packageKey The keys to be addressed in the package data by this conversion.
         * @memberof NumberConversion
         */
        function NumberConversion(settingKey, packageKey) {
            var _this = _super.call(this, settingKey, packageKey) || this;
            _this.dataType = dataTypeEnum_1.DataType.NUMBER;
            return _this;
        }
        /**
         * Checks if the data type is number.
         *
         * @param {Array<any>} data
         * @returns {boolean}
         * @memberof NumberConversion
         */
        NumberConversion.prototype.checkDataTypes = function (data) {
            return data.every(function (item) { return typeof item === "number"; });
        };
        /**
         * Converts the data from settings to package format via the number constructor.
         *
         * @param {Array<any>} data
         * @returns {Array<IPackage>}
         * @memberof NumberConversion
         */
        NumberConversion.prototype.convertDataTo = function (data) {
            var _this = this;
            return data.map(function (item) { return new package_1.Package(new meta_1.Meta(_this.dataType), new Number(item).valueOf()); });
        };
        /**
         * Converts the data from package to settings format.
         *
         * @param {Array<any>} data
         * @returns {Array<any>}
         * @memberof NumberConversion
         */
        NumberConversion.prototype.convertDataFrom = function (data) {
            return data.map(function (item) { return new Number(item).valueOf(); });
        };
        return NumberConversion;
    }(anyConversion_1.AnyConversion));
    exports.NumberConversion = NumberConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyQ29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL251bWJlckNvbnZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BOzs7OztPQUtHO0lBQ0g7UUFBK0Isb0NBQWE7UUFFeEM7Ozs7OztXQU1HO1FBQ0gsMEJBQVksVUFBeUIsRUFBRSxVQUF5QjtZQUFoRSxZQUNJLGtCQUFNLFVBQVUsRUFBRSxVQUFVLENBQUMsU0FFaEM7WUFERyxLQUFJLENBQUMsUUFBUSxHQUFHLHVCQUFRLENBQUMsTUFBTSxDQUFDOztRQUNwQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0kseUNBQWMsR0FBckIsVUFBc0IsSUFBZ0I7WUFDbEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQUMsSUFBSSxJQUFPLE9BQU8sT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHdDQUFhLEdBQXBCLFVBQXFCLElBQWdCO1lBQXJDLGlCQUVDO1lBREcsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFPLE9BQU8sSUFBSSxpQkFBTyxDQUFDLElBQUksV0FBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDMUcsQ0FBQztRQUVBOzs7Ozs7V0FNRztRQUNJLDBDQUFlLEdBQXRCLFVBQXVCLElBQWdCO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBTSxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQTlDRCxDQUErQiw2QkFBYSxHQThDM0M7SUFFUSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbnlDb252ZXJzaW9uIH0gZnJvbSBcIi4vYW55Q29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gXCIuL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IFBhY2thZ2UgfSBmcm9tIFwiLi9wYWNrYWdlXCI7XHJcbmltcG9ydCB7IElQYWNrYWdlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL3BhY2thZ2VJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWV0YSB9IGZyb20gXCIuL21ldGFcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbnZlcnNpb24gaGFuZGxlcyB0aGUgdHlwZSBudW1iZXIuXHJcbiAqXHJcbiAqIEBjbGFzcyBOdW1iZXJDb252ZXJzaW9uXHJcbiAqIEBleHRlbmRzIHtBbnlDb252ZXJzaW9ufVxyXG4gKi9cclxuY2xhc3MgTnVtYmVyQ29udmVyc2lvbiBleHRlbmRzIEFueUNvbnZlcnNpb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBOdW1iZXJDb252ZXJzaW9uLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHNldHRpbmdLZXkgVGhlIGtleXMgdG8gYmUgYWRkcmVzc2VkIGluIHRoZSBzZXR0aW5ncyBkYXRhIGJ5IHRoaXMgY29udmVyc2lvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gcGFja2FnZUtleSBUaGUga2V5cyB0byBiZSBhZGRyZXNzZWQgaW4gdGhlIHBhY2thZ2UgZGF0YSBieSB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKiBAbWVtYmVyb2YgTnVtYmVyQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5nS2V5OiBBcnJheTxzdHJpbmc+LCBwYWNrYWdlS2V5OiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgc3VwZXIoc2V0dGluZ0tleSwgcGFja2FnZUtleSk7XHJcbiAgICAgICAgdGhpcy5kYXRhVHlwZSA9IERhdGFUeXBlLk5VTUJFUjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgZGF0YSB0eXBlIGlzIG51bWJlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE51bWJlckNvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrRGF0YVR5cGVzKGRhdGE6IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZGF0YS5ldmVyeSgoaXRlbSkgPT4geyByZXR1cm4gdHlwZW9mIGl0ZW0gPT09IFwibnVtYmVyXCI7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgdGhlIGRhdGEgZnJvbSBzZXR0aW5ncyB0byBwYWNrYWdlIGZvcm1hdCB2aWEgdGhlIG51bWJlciBjb25zdHJ1Y3Rvci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUGFja2FnZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTnVtYmVyQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFUbyhkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8SVBhY2thZ2U+IHtcclxuICAgICAgICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0pID0+IHsgcmV0dXJuIG5ldyBQYWNrYWdlKG5ldyBNZXRhKHRoaXMuZGF0YVR5cGUpLCBuZXcgTnVtYmVyKGl0ZW0pLnZhbHVlT2YoKSl9KTtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgICogQ29udmVydHMgdGhlIGRhdGEgZnJvbSBwYWNrYWdlIHRvIHNldHRpbmdzIGZvcm1hdC5cclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZGF0YVxyXG4gICAgICAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxyXG4gICAgICAqIEBtZW1iZXJvZiBOdW1iZXJDb252ZXJzaW9uXHJcbiAgICAgICovXHJcbiAgICAgcHVibGljIGNvbnZlcnREYXRhRnJvbShkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEubWFwKChpdGVtKSA9PiB7cmV0dXJuIG5ldyBOdW1iZXIoaXRlbSkudmFsdWVPZigpO30pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBOdW1iZXJDb252ZXJzaW9uIH0iXX0=