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
define(["require", "exports", "./anyConversion", "./package", "./meta", "./enum/dataTypeEnum"], function (require, exports, anyConversion_1, package_1, meta_1, dataTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The conversion for generating data for settings keys based on data from package keys.
     * No conversion happens from setting to package format.
     *
     * @class GenerateFromConversion
     * @extends {AnyConversion}
     */
    var GenerateFromConversion = /** @class */ (function (_super) {
        __extends(GenerateFromConversion, _super);
        /**
         * Creates an instance of GenerateFromConversion.
         *
         * @param {Array<string>} settingKey The keys to be addressed in the settings data by this conversion.
         * @param {Array<string>} packageKey The keys to be addressed in the package data by this conversion.
         * @param {(data: Array<any>) => Array<any>} generateFrom The function that is called to generate data for settings keys based on data read from package keys
         * @memberof GenerateFromConversion
         */
        function GenerateFromConversion(settingKey, packageKey, generateFrom) {
            var _this = _super.call(this, settingKey, packageKey) || this;
            _this.dataType = dataTypeEnum_1.DataType.INVALID;
            _this.generateFrom = generateFrom;
            return _this;
        }
        /**
         * Checks if the IMeta data is invalid.
         *
         * @param {Array<IMeta>} meta
         * @returns {boolean}
         * @memberof GenerateFromConversion
         */
        GenerateFromConversion.prototype.checkMetaDataType = function (meta) {
            return meta.every(function (meta) { return !meta_1.Meta.isInvalid(meta); });
        };
        /**
         * Converts the data from package to settings format.
         * Uses the provided function for data generation.
         *
         * @param {Array<any>} data
         * @returns {Array<any>}
         * @memberof GenerateFromConversion
         */
        GenerateFromConversion.prototype.convertDataFrom = function (data) {
            return this.generateFrom(data);
        };
        /**
         * Creates invalid packages as no conversion from setting to package format should happen.
         *
         * @param {Array<any>} data
         * @returns {Array<IPackage>}
         * @memberof GenerateFromConversion
         */
        GenerateFromConversion.prototype.convertDataTo = function (data) {
            return data.map(function () { return package_1.Package.createInvalid(); });
        };
        return GenerateFromConversion;
    }(anyConversion_1.AnyConversion));
    exports.GenerateFromConversion = GenerateFromConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVGcm9tQ29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2dlbmVyYXRlRnJvbUNvbnZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BOzs7Ozs7T0FNRztJQUNIO1FBQXFDLDBDQUFhO1FBSzlDOzs7Ozs7O1dBT0c7UUFDSCxnQ0FBWSxVQUF5QixFQUFFLFVBQXlCLEVBQUUsWUFBOEM7WUFBaEgsWUFDSSxrQkFBTSxVQUFVLEVBQUUsVUFBVSxDQUFDLFNBR2hDO1lBRkcsS0FBSSxDQUFDLFFBQVEsR0FBRyx1QkFBUSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQzs7UUFDckMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGtEQUFpQixHQUF4QixVQUF5QixJQUFtQjtZQUN4QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBQyxJQUFJLElBQU8sT0FBTyxDQUFDLFdBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLGdEQUFlLEdBQXRCLFVBQXVCLElBQWdCO1lBQ25DLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksOENBQWEsR0FBcEIsVUFBcUIsSUFBZ0I7WUFDakMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQVEsT0FBTyxpQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQXBERCxDQUFxQyw2QkFBYSxHQW9EakQ7SUFFUSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbnlDb252ZXJzaW9uIH0gZnJvbSBcIi4vYW55Q29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBJUGFja2FnZSB9IGZyb20gXCIuL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBhY2thZ2UgfSBmcm9tIFwiLi9wYWNrYWdlXCI7XHJcbmltcG9ydCB7IE1ldGEgfSBmcm9tIFwiLi9tZXRhXCI7XHJcbmltcG9ydCB7IERhdGFUeXBlIH0gZnJvbSBcIi4vZW51bS9kYXRhVHlwZUVudW1cIjtcclxuaW1wb3J0IHsgSU1ldGEgfSBmcm9tIFwiLi9pbnRlcmZhY2UvbWV0YUludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjb252ZXJzaW9uIGZvciBnZW5lcmF0aW5nIGRhdGEgZm9yIHNldHRpbmdzIGtleXMgYmFzZWQgb24gZGF0YSBmcm9tIHBhY2thZ2Uga2V5cy4gXHJcbiAqIE5vIGNvbnZlcnNpb24gaGFwcGVucyBmcm9tIHNldHRpbmcgdG8gcGFja2FnZSBmb3JtYXQuXHJcbiAqXHJcbiAqIEBjbGFzcyBHZW5lcmF0ZUZyb21Db252ZXJzaW9uXHJcbiAqIEBleHRlbmRzIHtBbnlDb252ZXJzaW9ufVxyXG4gKi9cclxuY2xhc3MgR2VuZXJhdGVGcm9tQ29udmVyc2lvbiBleHRlbmRzIEFueUNvbnZlcnNpb24geyBcclxuICAgIFxyXG4gICAgLy8gZnVuY3Rpb24gdG8gYmUgdXNlZCB0byBnZW5lcmF0ZSB2YWx1ZXMgdXBvbiBjb252ZXJzaW9uIGZyb20gcGFja2FnZSB0byBzZXR0aW5nXHJcbiAgICBwcml2YXRlIGdlbmVyYXRlRnJvbTogKGRhdGE6IEFycmF5PGFueT4pID0+IEFycmF5PGFueT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdlbmVyYXRlRnJvbUNvbnZlcnNpb24uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gc2V0dGluZ0tleSBUaGUga2V5cyB0byBiZSBhZGRyZXNzZWQgaW4gdGhlIHNldHRpbmdzIGRhdGEgYnkgdGhpcyBjb252ZXJzaW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBwYWNrYWdlS2V5IFRoZSBrZXlzIHRvIGJlIGFkZHJlc3NlZCBpbiB0aGUgcGFja2FnZSBkYXRhIGJ5IHRoaXMgY29udmVyc2lvbi5cclxuICAgICAqIEBwYXJhbSB7KGRhdGE6IEFycmF5PGFueT4pID0+IEFycmF5PGFueT59IGdlbmVyYXRlRnJvbSBUaGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgdG8gZ2VuZXJhdGUgZGF0YSBmb3Igc2V0dGluZ3Mga2V5cyBiYXNlZCBvbiBkYXRhIHJlYWQgZnJvbSBwYWNrYWdlIGtleXNcclxuICAgICAqIEBtZW1iZXJvZiBHZW5lcmF0ZUZyb21Db252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdLZXk6IEFycmF5PHN0cmluZz4sIHBhY2thZ2VLZXk6IEFycmF5PHN0cmluZz4sIGdlbmVyYXRlRnJvbTogKGRhdGE6IEFycmF5PGFueT4pID0+IEFycmF5PGFueT4pIHtcclxuICAgICAgICBzdXBlcihzZXR0aW5nS2V5LCBwYWNrYWdlS2V5KTtcclxuICAgICAgICB0aGlzLmRhdGFUeXBlID0gRGF0YVR5cGUuSU5WQUxJRDtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlRnJvbSA9IGdlbmVyYXRlRnJvbTtcclxuICAgIH1cclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIElNZXRhIGRhdGEgaXMgaW52YWxpZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElNZXRhPn0gbWV0YVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgR2VuZXJhdGVGcm9tQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tNZXRhRGF0YVR5cGUobWV0YTogIEFycmF5PElNZXRhPik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBtZXRhLmV2ZXJ5KChtZXRhKSA9PiB7IHJldHVybiAhTWV0YS5pc0ludmFsaWQobWV0YSk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgdGhlIGRhdGEgZnJvbSBwYWNrYWdlIHRvIHNldHRpbmdzIGZvcm1hdC4gXHJcbiAgICAgKiBVc2VzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBmb3IgZGF0YSBnZW5lcmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgR2VuZXJhdGVGcm9tQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFGcm9tKGRhdGE6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZyb20oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGludmFsaWQgcGFja2FnZXMgYXMgbm8gY29udmVyc2lvbiBmcm9tIHNldHRpbmcgdG8gcGFja2FnZSBmb3JtYXQgc2hvdWxkIGhhcHBlbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUGFja2FnZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgR2VuZXJhdGVGcm9tQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFUbyhkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8SVBhY2thZ2U+IHtcclxuICAgICAgICByZXR1cm4gZGF0YS5tYXAoKCkgPT4geyByZXR1cm4gUGFja2FnZS5jcmVhdGVJbnZhbGlkKCl9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgR2VuZXJhdGVGcm9tQ29udmVyc2lvbiB9Il19