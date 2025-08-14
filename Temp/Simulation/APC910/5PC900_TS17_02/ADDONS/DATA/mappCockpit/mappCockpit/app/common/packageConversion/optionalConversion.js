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
define(["require", "exports", "./anyConversion"], function (require, exports, anyConversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The conversion handling optional conversions.
     * Should be used for keys that may or may not exist.
     *
     * @class OptionalConversion
     * @extends {AnyConversion}
     */
    var OptionalConversion = /** @class */ (function (_super) {
        __extends(OptionalConversion, _super);
        /**
         * Creates an instance of OptionalConversion.
         *
         * @param {Array<string>} settingKey The keys to be addressed in the settings data by this conversion.
         * @param {Array<string>} packageKey The keys to be addressed in the package data by this conversion.
         * @param {AnyConversion} conversion The conversion that should be used, if possible.
         * @memberof OptionalConversion
         */
        function OptionalConversion(settingKey, packageKey, conversion) {
            var _this = _super.call(this, settingKey, packageKey) || this;
            _this.dataType = conversion.getDataType();
            _this.conversion = conversion;
            return _this;
        }
        /**
         * Runs the provided conversion from package to settings format.
         * If the provided conversion fails, it returns to the state before the execution of the provided conversion.
         *
         * @param {Settings} setting
         * @param {IPackage} packet
         * @returns {Settings}
         * @memberof OptionalConversion
         */
        OptionalConversion.prototype.convertFrom = function (setting, packet) {
            var changedSetting = setting;
            try {
                changedSetting = _super.prototype.convertFrom.call(this, setting, packet);
            }
            catch (e) {
                //Do nothing, just erase error.
            }
            return changedSetting;
        };
        /**
         * Runs the provided conversion from settings to package format.
         * If the provided conversion fails, it returns to the state before the execution of the provided conversion.
         *
         * @param {Settings} setting
         * @param {IPackage} packet
         * @returns {IPackage}
         * @memberof OptionalConversion
         */
        OptionalConversion.prototype.convertTo = function (setting, packet) {
            var changedPacket = packet;
            try {
                changedPacket = _super.prototype.convertTo.call(this, setting, packet);
            }
            catch (e) {
                //Do nothing, just erase error.
            }
            return changedPacket;
        };
        /**
         * Checks if the IMeta data type is valid for the provided conversion.
         *
         * @param {Array<IMeta>} meta
         * @returns {boolean}
         * @memberof OptionalConversion
         */
        OptionalConversion.prototype.checkMetaDataType = function (meta) {
            return this.conversion.checkMetaDataType(meta);
        };
        /**
         * Checks if the additional meta info of the IMeta data is valid for the provided conversion.
         *
         * @param {Array<IMeta>} meta
         * @returns {boolean}
         * @memberof OptionalConversion
         */
        OptionalConversion.prototype.checkAdditionalMetaInfos = function (meta) {
            return this.conversion.checkAdditionalMetaInfos(meta);
        };
        /**
         * Checks if the data type is valid for the provided conversion.
         *
         * @param {Array<any>} data
         * @returns {boolean}
         * @memberof OptionalConversion
         */
        OptionalConversion.prototype.checkDataTypes = function (data) {
            return this.conversion.checkDataTypes(data);
        };
        /**
         * Converts the data from package to settings format using the provided conversion.
         *
         * @param {Array<any>} data
         * @returns {Array<any>}
         * @memberof OptionalConversion
         */
        OptionalConversion.prototype.convertDataFrom = function (data) {
            return this.conversion.convertDataFrom(data);
        };
        /**
         * Converts the data from settings to package format using the provided conversion.
         *
         * @param {Array<any>} data
         * @returns {Array<IPackage>}
         * @memberof OptionalConversion
         */
        OptionalConversion.prototype.convertDataTo = function (data) {
            return this.conversion.convertDataTo(data);
        };
        return OptionalConversion;
    }(anyConversion_1.AnyConversion));
    exports.OptionalConversion = OptionalConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uYWxDb252ZXJzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vb3B0aW9uYWxDb252ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTs7Ozs7O09BTUc7SUFDSDtRQUFpQyxzQ0FBYTtRQUsxQzs7Ozs7OztXQU9HO1FBQ0gsNEJBQVksVUFBeUIsRUFBRSxVQUF5QixFQUFFLFVBQXlCO1lBQTNGLFlBQ0ksa0JBQU0sVUFBVSxFQUFFLFVBQVUsQ0FBQyxTQUdoQztZQUZHLEtBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztRQUNqQyxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSx3Q0FBVyxHQUFsQixVQUFtQixPQUFpQixFQUFFLE1BQWdCO1lBRWxELElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQztZQUM3QixJQUFJO2dCQUNBLGNBQWMsR0FBRyxpQkFBTSxXQUFXLFlBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZEO1lBQUMsT0FBTSxDQUFDLEVBQUU7Z0JBQ1AsK0JBQStCO2FBQ2xDO1lBRUQsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksc0NBQVMsR0FBaEIsVUFBaUIsT0FBaUIsRUFBRSxNQUFnQjtZQUNoRCxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDM0IsSUFBSTtnQkFDQSxhQUFhLEdBQUcsaUJBQU0sU0FBUyxZQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNwRDtZQUFDLE9BQU0sQ0FBQyxFQUFFO2dCQUNQLCtCQUErQjthQUNsQztZQUVELE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSw4Q0FBaUIsR0FBeEIsVUFBeUIsSUFBa0I7WUFDdkMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxxREFBd0IsR0FBL0IsVUFBZ0MsSUFBa0I7WUFDOUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSwyQ0FBYyxHQUFyQixVQUFzQixJQUFnQjtZQUNsQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSw0Q0FBZSxHQUF0QixVQUF1QixJQUFnQjtZQUNuQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSwwQ0FBYSxHQUFwQixVQUFxQixJQUFnQjtZQUNqQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDTCx5QkFBQztJQUFELENBQUMsQUFsSEQsQ0FBaUMsNkJBQWEsR0FrSDdDO0lBRVEsZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW55Q29udmVyc2lvbiB9IGZyb20gXCIuL2FueUNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSVBhY2thZ2UgfSBmcm9tIFwiLi9pbnRlcmZhY2UvcGFja2FnZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTWV0YSB9IGZyb20gXCIuL2ludGVyZmFjZS9tZXRhSW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogVGhlIGNvbnZlcnNpb24gaGFuZGxpbmcgb3B0aW9uYWwgY29udmVyc2lvbnMuIFxyXG4gKiBTaG91bGQgYmUgdXNlZCBmb3Iga2V5cyB0aGF0IG1heSBvciBtYXkgbm90IGV4aXN0LlxyXG4gKlxyXG4gKiBAY2xhc3MgT3B0aW9uYWxDb252ZXJzaW9uXHJcbiAqIEBleHRlbmRzIHtBbnlDb252ZXJzaW9ufVxyXG4gKi9cclxuY2xhc3MgT3B0aW9uYWxDb252ZXJzaW9uIGV4dGVuZHMgQW55Q29udmVyc2lvbiB7XHJcblxyXG4gICAgLy8gdGhlIGNvbnZlcnNpb24gdG8gYmUgcGVyZm9ybWVkIGlmIHBvc3NpYmxlXHJcbiAgICBwcml2YXRlIGNvbnZlcnNpb246IEFueUNvbnZlcnNpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE9wdGlvbmFsQ29udmVyc2lvbi5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZXR0aW5nS2V5IFRoZSBrZXlzIHRvIGJlIGFkZHJlc3NlZCBpbiB0aGUgc2V0dGluZ3MgZGF0YSBieSB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHBhY2thZ2VLZXkgVGhlIGtleXMgdG8gYmUgYWRkcmVzc2VkIGluIHRoZSBwYWNrYWdlIGRhdGEgYnkgdGhpcyBjb252ZXJzaW9uLlxyXG4gICAgICogQHBhcmFtIHtBbnlDb252ZXJzaW9ufSBjb252ZXJzaW9uIFRoZSBjb252ZXJzaW9uIHRoYXQgc2hvdWxkIGJlIHVzZWQsIGlmIHBvc3NpYmxlLlxyXG4gICAgICogQG1lbWJlcm9mIE9wdGlvbmFsQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5nS2V5OiBBcnJheTxzdHJpbmc+LCBwYWNrYWdlS2V5OiBBcnJheTxzdHJpbmc+LCBjb252ZXJzaW9uOiBBbnlDb252ZXJzaW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc2V0dGluZ0tleSwgcGFja2FnZUtleSk7XHJcbiAgICAgICAgdGhpcy5kYXRhVHlwZSA9IGNvbnZlcnNpb24uZ2V0RGF0YVR5cGUoKTtcclxuICAgICAgICB0aGlzLmNvbnZlcnNpb24gPSBjb252ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUnVucyB0aGUgcHJvdmlkZWQgY29udmVyc2lvbiBmcm9tIHBhY2thZ2UgdG8gc2V0dGluZ3MgZm9ybWF0LiBcclxuICAgICAqIElmIHRoZSBwcm92aWRlZCBjb252ZXJzaW9uIGZhaWxzLCBpdCByZXR1cm5zIHRvIHRoZSBzdGF0ZSBiZWZvcmUgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgcHJvdmlkZWQgY29udmVyc2lvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1NldHRpbmdzfSBzZXR0aW5nXHJcbiAgICAgKiBAcGFyYW0ge0lQYWNrYWdlfSBwYWNrZXRcclxuICAgICAqIEByZXR1cm5zIHtTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBPcHRpb25hbENvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnRGcm9tKHNldHRpbmc6IFNldHRpbmdzLCBwYWNrZXQ6IElQYWNrYWdlKTogU2V0dGluZ3Mge1xyXG5cclxuICAgICAgICBsZXQgY2hhbmdlZFNldHRpbmcgPSBzZXR0aW5nO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNoYW5nZWRTZXR0aW5nID0gc3VwZXIuY29udmVydEZyb20oc2V0dGluZywgcGFja2V0KTtcclxuICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgLy9EbyBub3RoaW5nLCBqdXN0IGVyYXNlIGVycm9yLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNoYW5nZWRTZXR0aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUnVucyB0aGUgcHJvdmlkZWQgY29udmVyc2lvbiBmcm9tIHNldHRpbmdzIHRvIHBhY2thZ2UgZm9ybWF0LiBcclxuICAgICAqIElmIHRoZSBwcm92aWRlZCBjb252ZXJzaW9uIGZhaWxzLCBpdCByZXR1cm5zIHRvIHRoZSBzdGF0ZSBiZWZvcmUgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgcHJvdmlkZWQgY29udmVyc2lvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1NldHRpbmdzfSBzZXR0aW5nXHJcbiAgICAgKiBAcGFyYW0ge0lQYWNrYWdlfSBwYWNrZXRcclxuICAgICAqIEByZXR1cm5zIHtJUGFja2FnZX1cclxuICAgICAqIEBtZW1iZXJvZiBPcHRpb25hbENvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnRUbyhzZXR0aW5nOiBTZXR0aW5ncywgcGFja2V0OiBJUGFja2FnZSk6IElQYWNrYWdlIHtcclxuICAgICAgICBsZXQgY2hhbmdlZFBhY2tldCA9IHBhY2tldDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjaGFuZ2VkUGFja2V0ID0gc3VwZXIuY29udmVydFRvKHNldHRpbmcsIHBhY2tldCk7XHJcbiAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgIC8vRG8gbm90aGluZywganVzdCBlcmFzZSBlcnJvci5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjaGFuZ2VkUGFja2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBJTWV0YSBkYXRhIHR5cGUgaXMgdmFsaWQgZm9yIHRoZSBwcm92aWRlZCBjb252ZXJzaW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SU1ldGE+fSBtZXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBPcHRpb25hbENvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrTWV0YURhdGFUeXBlKG1ldGE6IEFycmF5PElNZXRhPik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnNpb24uY2hlY2tNZXRhRGF0YVR5cGUobWV0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGFkZGl0aW9uYWwgbWV0YSBpbmZvIG9mIHRoZSBJTWV0YSBkYXRhIGlzIHZhbGlkIGZvciB0aGUgcHJvdmlkZWQgY29udmVyc2lvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElNZXRhPn0gbWV0YVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3B0aW9uYWxDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja0FkZGl0aW9uYWxNZXRhSW5mb3MobWV0YTogQXJyYXk8SU1ldGE+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udmVyc2lvbi5jaGVja0FkZGl0aW9uYWxNZXRhSW5mb3MobWV0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGRhdGEgdHlwZSBpcyB2YWxpZCBmb3IgdGhlIHByb3ZpZGVkIGNvbnZlcnNpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBPcHRpb25hbENvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrRGF0YVR5cGVzKGRhdGE6IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJzaW9uLmNoZWNrRGF0YVR5cGVzKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgdGhlIGRhdGEgZnJvbSBwYWNrYWdlIHRvIHNldHRpbmdzIGZvcm1hdCB1c2luZyB0aGUgcHJvdmlkZWQgY29udmVyc2lvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wdGlvbmFsQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFGcm9tKGRhdGE6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJzaW9uLmNvbnZlcnREYXRhRnJvbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIHRoZSBkYXRhIGZyb20gc2V0dGluZ3MgdG8gcGFja2FnZSBmb3JtYXQgdXNpbmcgdGhlIHByb3ZpZGVkIGNvbnZlcnNpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBhY2thZ2U+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wdGlvbmFsQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFUbyhkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8SVBhY2thZ2U+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJzaW9uLmNvbnZlcnREYXRhVG8oZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE9wdGlvbmFsQ29udmVyc2lvbiB9Il19