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
     * The conversion handling booleans.
     *
     * @class BooleanConversion
     * @extends {AnyConversion}
     */
    var BooleanConversion = /** @class */ (function (_super) {
        __extends(BooleanConversion, _super);
        /**
         * Creates an instance of BooleanConversion.
         *
         * @param {Array<string>} settingKey The keys to be addressed in the settings data by this conversion.
         * @param {Array<string>} packageKey The keys to be addressed in the package data by this conversion.
         * @memberof BooleanConversion
         */
        function BooleanConversion(settingKey, packageKey) {
            var _this = _super.call(this, settingKey, packageKey) || this;
            _this.dataType = dataTypeEnum_1.DataType.BOOLEAN;
            return _this;
        }
        /**
         * Checks if the data type of the data is boolean.
         *
         * @param {Array<any>} data
         * @returns {boolean}
         * @memberof BooleanConversion
         */
        BooleanConversion.prototype.checkDataTypes = function (data) {
            return data.every(function (item) { return typeof item === "boolean"; });
        };
        /**
         * Converts the data from settings to package format via the boolean constructor.
         *
         * @param {Array<any>} data
         * @returns {Array<IPackage>}
         * @memberof BooleanConversion
         */
        BooleanConversion.prototype.convertDataTo = function (data) {
            var _this = this;
            return data.map(function (item) { return new package_1.Package(new meta_1.Meta(_this.dataType), new Boolean(item).valueOf()); });
        };
        /**
         * Converts the data from package to settings format.
         *
         * @param {Array<any>} data
         * @returns {Array<any>}
         * @memberof BooleanConversion
         */
        BooleanConversion.prototype.convertDataFrom = function (data) {
            return data.map(function (item) { return new Boolean(item).valueOf(); });
        };
        return BooleanConversion;
    }(anyConversion_1.AnyConversion));
    exports.BooleanConversion = BooleanConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbkNvbnZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9ib29sZWFuQ29udmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7Ozs7O09BS0c7SUFDSDtRQUFnQyxxQ0FBYTtRQUV6Qzs7Ozs7O1dBTUc7UUFDSCwyQkFBWSxVQUF5QixFQUFFLFVBQXlCO1lBQWhFLFlBQ0ksa0JBQU0sVUFBVSxFQUFFLFVBQVUsQ0FBQyxTQUVoQztZQURHLEtBQUksQ0FBQyxRQUFRLEdBQUcsdUJBQVEsQ0FBQyxPQUFPLENBQUM7O1FBQ3JDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSwwQ0FBYyxHQUFyQixVQUFzQixJQUFnQjtZQUNsQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBQyxJQUFJLElBQU8sT0FBTyxPQUFPLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0kseUNBQWEsR0FBcEIsVUFBcUIsSUFBZ0I7WUFBckMsaUJBRUM7WUFERyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQU8sT0FBTyxJQUFJLGlCQUFPLENBQUMsSUFBSSxXQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztRQUMzRyxDQUFDO1FBRUE7Ozs7OztXQU1HO1FBQ0ksMkNBQWUsR0FBdEIsVUFBdUIsSUFBZ0I7WUFDcEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFNLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBOUNELENBQWdDLDZCQUFhLEdBOEM1QztJQUVRLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFueUNvbnZlcnNpb24gfSBmcm9tIFwiLi9hbnlDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IERhdGFUeXBlIH0gZnJvbSBcIi4vZW51bS9kYXRhVHlwZUVudW1cIjtcclxuaW1wb3J0IHsgTWV0YSB9IGZyb20gXCIuL21ldGFcIjtcclxuaW1wb3J0IHsgUGFja2FnZSB9IGZyb20gXCIuL3BhY2thZ2VcIjtcclxuaW1wb3J0IHsgSVBhY2thZ2UgfSBmcm9tIFwiLi9pbnRlcmZhY2UvcGFja2FnZUludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjb252ZXJzaW9uIGhhbmRsaW5nIGJvb2xlYW5zLlxyXG4gKlxyXG4gKiBAY2xhc3MgQm9vbGVhbkNvbnZlcnNpb25cclxuICogQGV4dGVuZHMge0FueUNvbnZlcnNpb259XHJcbiAqL1xyXG5jbGFzcyBCb29sZWFuQ29udmVyc2lvbiBleHRlbmRzIEFueUNvbnZlcnNpb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCb29sZWFuQ29udmVyc2lvbi5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZXR0aW5nS2V5IFRoZSBrZXlzIHRvIGJlIGFkZHJlc3NlZCBpbiB0aGUgc2V0dGluZ3MgZGF0YSBieSB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHBhY2thZ2VLZXkgVGhlIGtleXMgdG8gYmUgYWRkcmVzc2VkIGluIHRoZSBwYWNrYWdlIGRhdGEgYnkgdGhpcyBjb252ZXJzaW9uLlxyXG4gICAgICogQG1lbWJlcm9mIEJvb2xlYW5Db252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdLZXk6IEFycmF5PHN0cmluZz4sIHBhY2thZ2VLZXk6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBzdXBlcihzZXR0aW5nS2V5LCBwYWNrYWdlS2V5KTtcclxuICAgICAgICB0aGlzLmRhdGFUeXBlID0gRGF0YVR5cGUuQk9PTEVBTjtcclxuICAgIH1cclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGRhdGEgdHlwZSBvZiB0aGUgZGF0YSBpcyBib29sZWFuLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQm9vbGVhbkNvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrRGF0YVR5cGVzKGRhdGE6IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZGF0YS5ldmVyeSgoaXRlbSkgPT4geyByZXR1cm4gdHlwZW9mIGl0ZW0gPT09IFwiYm9vbGVhblwiOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIHRoZSBkYXRhIGZyb20gc2V0dGluZ3MgdG8gcGFja2FnZSBmb3JtYXQgdmlhIHRoZSBib29sZWFuIGNvbnN0cnVjdG9yLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQYWNrYWdlPn1cclxuICAgICAqIEBtZW1iZXJvZiBCb29sZWFuQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFUbyhkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8SVBhY2thZ2U+IHtcclxuICAgICAgICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0pID0+IHsgcmV0dXJuIG5ldyBQYWNrYWdlKG5ldyBNZXRhKHRoaXMuZGF0YVR5cGUpLCBuZXcgQm9vbGVhbihpdGVtKS52YWx1ZU9mKCkpfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgICAvKipcclxuICAgICAgKiBDb252ZXJ0cyB0aGUgZGF0YSBmcm9tIHBhY2thZ2UgdG8gc2V0dGluZ3MgZm9ybWF0LlxyXG4gICAgICAqXHJcbiAgICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgICogQHJldHVybnMge0FycmF5PGFueT59XHJcbiAgICAgICogQG1lbWJlcm9mIEJvb2xlYW5Db252ZXJzaW9uXHJcbiAgICAgICovXHJcbiAgICAgcHVibGljIGNvbnZlcnREYXRhRnJvbShkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEubWFwKChpdGVtKSA9PiB7cmV0dXJuIG5ldyBCb29sZWFuKGl0ZW0pLnZhbHVlT2YoKTt9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQm9vbGVhbkNvbnZlcnNpb24gfSJdfQ==