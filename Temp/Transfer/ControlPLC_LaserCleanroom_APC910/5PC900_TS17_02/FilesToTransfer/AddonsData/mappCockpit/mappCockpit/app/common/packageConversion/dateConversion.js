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
     * This conversin handles Dates.
     *
     * @class DateConversion
     * @extends {AnyConversion}
     */
    var DateConversion = /** @class */ (function (_super) {
        __extends(DateConversion, _super);
        /**
         * Creates an instance of DateConversion.
         *
         * @param {Array<string>} settingKey The keys to be addressed in the settings data by this conversion.
         * @param {Array<string>} packageKey The keys to be addressed in the package data by this conversion.
         * @memberof DateConversion
         */
        function DateConversion(settingKey, packageKey) {
            var _this = _super.call(this, settingKey, packageKey) || this;
            _this.dataType = dataTypeEnum_1.DataType.DATE;
            return _this;
        }
        /**
         * Checks if the data is a date string.
         *
         * @param {Array<any>} data
         * @returns {boolean}
         * @memberof DateConversion
         */
        DateConversion.prototype.checkDataTypes = function (data) {
            return data.every(function (item) { return typeof item === "string" && !Number.isNaN(Date.parse(item)); });
        };
        /**
         * Converts the data from package (date iso string) to settings (date object) format.
         *
         * @param {Array<string>} data
         * @returns {Array<any>}
         * @memberof DateConversion
         */
        DateConversion.prototype.convertDataFrom = function (data) {
            return data.map(function (item) { return new Date(item); });
        };
        /**
         * Converts the data from settings (date object) to package (date iso string) format.
         *
         * @param {Array<any>} data
         * @returns {Array<IPackage>}
         * @memberof DateConversion
         */
        DateConversion.prototype.convertDataTo = function (data) {
            var _this = this;
            return data.map(function (item) {
                return new package_1.Package(new meta_1.Meta(_this.dataType), item.toISOString());
            });
        };
        return DateConversion;
    }(anyConversion_1.AnyConversion));
    exports.DateConversion = DateConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUNvbnZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9kYXRlQ29udmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7Ozs7O09BS0c7SUFDSDtRQUE2QixrQ0FBYTtRQUV0Qzs7Ozs7O1dBTUc7UUFDSCx3QkFBWSxVQUF5QixFQUFFLFVBQXlCO1lBQWhFLFlBQ0ksa0JBQU0sVUFBVSxFQUFFLFVBQVUsQ0FBQyxTQUVoQztZQURHLEtBQUksQ0FBQyxRQUFRLEdBQUcsdUJBQVEsQ0FBQyxJQUFJLENBQUM7O1FBQ2xDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSx1Q0FBYyxHQUFyQixVQUFzQixJQUFnQjtZQUNsQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBQyxJQUFJLElBQU8sT0FBTyxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pHLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSx3Q0FBZSxHQUF0QixVQUF1QixJQUFtQjtZQUN0QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQU8sT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxzQ0FBYSxHQUFwQixVQUFxQixJQUFpQjtZQUF0QyxpQkFJQztZQUhHLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7Z0JBQ2pCLE9BQU8sSUFBSSxpQkFBTyxDQUFDLElBQUksV0FBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNwRSxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDTCxxQkFBQztJQUFELENBQUMsQUFoREQsQ0FBNkIsNkJBQWEsR0FnRHpDO0lBRVEsd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbnlDb252ZXJzaW9uIH0gZnJvbSBcIi4vYW55Q29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gXCIuL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IFBhY2thZ2UgfSBmcm9tIFwiLi9wYWNrYWdlXCI7XHJcbmltcG9ydCB7IE1ldGEgfSBmcm9tIFwiLi9tZXRhXCI7XHJcbmltcG9ydCB7IElQYWNrYWdlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL3BhY2thZ2VJbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbnZlcnNpbiBoYW5kbGVzIERhdGVzLlxyXG4gKlxyXG4gKiBAY2xhc3MgRGF0ZUNvbnZlcnNpb25cclxuICogQGV4dGVuZHMge0FueUNvbnZlcnNpb259XHJcbiAqL1xyXG5jbGFzcyBEYXRlQ29udmVyc2lvbiBleHRlbmRzIEFueUNvbnZlcnNpb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBEYXRlQ29udmVyc2lvbi5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZXR0aW5nS2V5IFRoZSBrZXlzIHRvIGJlIGFkZHJlc3NlZCBpbiB0aGUgc2V0dGluZ3MgZGF0YSBieSB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHBhY2thZ2VLZXkgVGhlIGtleXMgdG8gYmUgYWRkcmVzc2VkIGluIHRoZSBwYWNrYWdlIGRhdGEgYnkgdGhpcyBjb252ZXJzaW9uLlxyXG4gICAgICogQG1lbWJlcm9mIERhdGVDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdLZXk6IEFycmF5PHN0cmluZz4sIHBhY2thZ2VLZXk6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBzdXBlcihzZXR0aW5nS2V5LCBwYWNrYWdlS2V5KTtcclxuICAgICAgICB0aGlzLmRhdGFUeXBlID0gRGF0YVR5cGUuREFURTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgZGF0YSBpcyBhIGRhdGUgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgRGF0ZUNvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrRGF0YVR5cGVzKGRhdGE6IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZGF0YS5ldmVyeSgoaXRlbSkgPT4geyByZXR1cm4gdHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIgJiYgIU51bWJlci5pc05hTihEYXRlLnBhcnNlKGl0ZW0pKTsgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgdGhlIGRhdGEgZnJvbSBwYWNrYWdlIChkYXRlIGlzbyBzdHJpbmcpIHRvIHNldHRpbmdzIChkYXRlIG9iamVjdCkgZm9ybWF0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgRGF0ZUNvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnREYXRhRnJvbShkYXRhOiBBcnJheTxzdHJpbmc+KTogQXJyYXk8YW55PiB7IFxyXG4gICAgICAgIHJldHVybiBkYXRhLm1hcCgoaXRlbSkgPT4geyByZXR1cm4gbmV3IERhdGUoaXRlbSk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgdGhlIGRhdGEgZnJvbSBzZXR0aW5ncyAoZGF0ZSBvYmplY3QpIHRvIHBhY2thZ2UgKGRhdGUgaXNvIHN0cmluZykgZm9ybWF0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQYWNrYWdlPn1cclxuICAgICAqIEBtZW1iZXJvZiBEYXRlQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFUbyhkYXRhOiBBcnJheTxEYXRlPik6IEFycmF5PElQYWNrYWdlPiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEubWFwKChpdGVtKSA9PiB7IFxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFBhY2thZ2UobmV3IE1ldGEodGhpcy5kYXRhVHlwZSksIGl0ZW0udG9JU09TdHJpbmcoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IERhdGVDb252ZXJzaW9uIH0iXX0=