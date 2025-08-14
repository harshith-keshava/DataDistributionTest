define(["require", "exports", "./enum/dataTypeEnum", "./meta", "./package"], function (require, exports, dataTypeEnum_1, meta_1, package_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The base class for all conversions of package entries.
     *
     * @class AnyConversion
     * @implements {IPackageEntryConversion}
     */
    var AnyConversion = /** @class */ (function () {
        /**
         * Creates an instance of AnyConversion.
         *
         * @param {Array<string>} settingKey The keys to be addressed in the settings data by this conversion.
         * @param {Array<string>} packageKey The keys to be addressed in the package data by this conversion.
         * @memberof AnyConversion
         */
        function AnyConversion(settingKey, packageKey) {
            this.settingKey = settingKey;
            this.packageKey = packageKey;
            this.dataType = dataTypeEnum_1.DataType.ANY;
        }
        /**
         * Returns the datatype which can be handled by this conversion.
         *
         * @returns {DataType}
         * @memberof AnyConversion
         */
        AnyConversion.prototype.getDataType = function () {
            return this.dataType;
        };
        /**
         * Handles the basic procedure and checks for the conversion of a package entry to a settings entry and applies it.
         *
         * @param {Settings} setting
         * @param {IPackage} packet
         * @returns {Settings}
         * @memberof AnyConversion
         */
        AnyConversion.prototype.convertFrom = function (setting, packet) {
            var _this = this;
            // extract the metadata of the (in the packageKey array) specified keys from the package
            var meta = this.packageKey.map(function (key) { return package_1.Package.getPackageKeyMeta(packet, key); });
            //check if the meta data is valid and the contained data type supported by this conversion
            if (!this.checkMetaDataType(meta)) {
                throw new Error("wrong meta type");
            }
            //check if the additional meta data is supported by this conversion
            if (!this.checkAdditionalMetaInfos(meta)) {
                throw new Error("wrong additional meta info");
            }
            // extract the data of the (in the packageKey array) specified keys from the package
            var data = this.packageKey.map(function (key) { return package_1.Package.getPackageKeyData(packet, key); });
            // check if the data types of the data are supported by this conversion
            if (!this.checkDataTypes(data)) {
                throw new Error("wrong data type");
            }
            // run the conversion of the data
            var settingsData = this.convertDataFrom(data);
            // check if the number of converted data entries matches the provided settings keys
            if (settingsData.length !== this.settingKey.length) {
                throw new Error("amount of data and keys inconsistent");
            }
            // add each converted data entry to the setting
            settingsData.forEach(function (item, i) {
                if (item !== undefined) { // only add the converted data if it is valid/exists
                    setting.setValue(_this.settingKey[i], item);
                }
            });
            return setting;
        };
        /**
         * Handles the basic procedure and checks for the conversion of a settings entry to a package entry and applies it.
         *
         * @param {Settings} setting
         * @param {IPackage} packet
         * @returns {IPackage}
         * @memberof AnyConversion
         */
        AnyConversion.prototype.convertTo = function (setting, packet) {
            var _this = this;
            // extract the data of the (in the settingKey array) specified keys from the setting
            var data = this.settingKey.map(function (key) { return _this.getSettingsKey(setting, key); });
            // run the conversion of the data
            var packageData = this.convertDataTo(data);
            // add each converted data entry to the package
            packageData.forEach(function (item, i) {
                if (!package_1.Package.isInvalid(item)) { // only add the converted data if it is valid
                    package_1.Package.setPackageKey(packet, _this.packageKey[i], item);
                }
            });
            return packet;
        };
        /**
         * Retrieves the data of a key of from a setting.
         *
         * @protected
         * @template T
         * @param {Settings} setting
         * @param {string} key
         * @returns {T}
         * @memberof AnyConversion
         */
        AnyConversion.prototype.getSettingsKey = function (setting, key) {
            return setting.getValue(key);
        };
        /**
         * Checks if the dataType contained in the IMeta data is correct for this conversion.
         *
         * @param {Array<IMeta>} meta
         * @returns {boolean} Returns true if check was successful.
         * @memberof AnyConversion
         */
        AnyConversion.prototype.checkMetaDataType = function (meta) {
            var _this = this;
            return meta.every(function (meta) { return !meta_1.Meta.isInvalid(meta) && meta.dataType === _this.dataType; });
        };
        /**
         * Checks if the additional meta infos contained in the IMeta data is correct for this conversion.
         *
         * @param {Array<IMeta>} meta
         * @returns {boolean} Returns true if check was succesful.
         * @memberof AnyConversion
         */
        AnyConversion.prototype.checkAdditionalMetaInfos = function (meta) {
            return true;
        };
        /**
         * Checks if the datatypes of the data are correct for this conversion.
         *
         * @param {Array<any>} data
         * @returns {boolean} Returns true if check was successful.
         * @memberof AnyConversion
         */
        AnyConversion.prototype.checkDataTypes = function (data) {
            return true;
        };
        /**
         * Converts the data from package to settings format.
         *
         * @param {Array<any>} data
         * @returns {Array<any>}
         * @memberof AnyConversion
         */
        AnyConversion.prototype.convertDataFrom = function (data) {
            return data;
        };
        /**
         * Converts the data from settings to package format.
         *
         * @param {Array<any>} data
         * @returns {Array<IPackage>}
         * @memberof AnyConversion
         */
        AnyConversion.prototype.convertDataTo = function (data) {
            var _this = this;
            return data.map(function (item) { return new package_1.Package(new meta_1.Meta(_this.dataType), item); });
        };
        return AnyConversion;
    }());
    exports.AnyConversion = AnyConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW55Q29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2FueUNvbnZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBUUE7Ozs7O09BS0c7SUFDSDtRQU1JOzs7Ozs7V0FNRztRQUNILHVCQUFZLFVBQXlCLEVBQUUsVUFBeUI7WUFDNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBUSxDQUFDLEdBQUcsQ0FBQztRQUNqQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxtQ0FBVyxHQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLG1DQUFXLEdBQWxCLFVBQW1CLE9BQWlCLEVBQUUsTUFBZ0I7WUFBdEQsaUJBdUNDO1lBckNHLHdGQUF3RjtZQUN4RixJQUFJLElBQUksR0FBaUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLElBQU8sT0FBTyxpQkFBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFHLDBGQUEwRjtZQUMxRixJQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFDO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDdEM7WUFFRCxtRUFBbUU7WUFDbkUsSUFBRyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQ2pEO1lBRUQsb0ZBQW9GO1lBQ3BGLElBQUks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QU1HO1FBQ0kscUNBQWEsR0FBcEIsVUFBcUIsSUFBZ0I7WUFBckMsaUJBRUM7WUFERyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQU8sT0FBTyxJQUFJLGlCQUFPLENBQUMsSUFBSSxXQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQTdLRCxJQTZLQztJQUVRLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBhY2thZ2UgfSBmcm9tIFwiLi9pbnRlcmZhY2UvcGFja2FnZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gXCIuL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IElNZXRhIH0gZnJvbSBcIi4vaW50ZXJmYWNlL21ldGFJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWV0YSB9IGZyb20gXCIuL21ldGFcIjtcclxuaW1wb3J0IHsgUGFja2FnZSB9IGZyb20gXCIuL3BhY2thZ2VcIjtcclxuaW1wb3J0IHsgSVBhY2thZ2VFbnRyeUNvbnZlcnNpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2UvcGFja2FnZUVudHJ5Q29udmVyc2lvbkludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBiYXNlIGNsYXNzIGZvciBhbGwgY29udmVyc2lvbnMgb2YgcGFja2FnZSBlbnRyaWVzLlxyXG4gKlxyXG4gKiBAY2xhc3MgQW55Q29udmVyc2lvblxyXG4gKiBAaW1wbGVtZW50cyB7SVBhY2thZ2VFbnRyeUNvbnZlcnNpb259XHJcbiAqL1xyXG5jbGFzcyBBbnlDb252ZXJzaW9uIGltcGxlbWVudHMgSVBhY2thZ2VFbnRyeUNvbnZlcnNpb257XHJcblxyXG4gICAgcHJvdGVjdGVkIHNldHRpbmdLZXk6IEFycmF5PHN0cmluZz47XHJcbiAgICBwcm90ZWN0ZWQgcGFja2FnZUtleTogQXJyYXk8c3RyaW5nPjtcclxuICAgIHByb3RlY3RlZCBkYXRhVHlwZTogRGF0YVR5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFueUNvbnZlcnNpb24uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gc2V0dGluZ0tleSBUaGUga2V5cyB0byBiZSBhZGRyZXNzZWQgaW4gdGhlIHNldHRpbmdzIGRhdGEgYnkgdGhpcyBjb252ZXJzaW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBwYWNrYWdlS2V5IFRoZSBrZXlzIHRvIGJlIGFkZHJlc3NlZCBpbiB0aGUgcGFja2FnZSBkYXRhIGJ5IHRoaXMgY29udmVyc2lvbi5cclxuICAgICAqIEBtZW1iZXJvZiBBbnlDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdLZXk6IEFycmF5PHN0cmluZz4sIHBhY2thZ2VLZXk6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICB0aGlzLnNldHRpbmdLZXkgPSBzZXR0aW5nS2V5O1xyXG4gICAgICAgIHRoaXMucGFja2FnZUtleSA9IHBhY2thZ2VLZXk7XHJcbiAgICAgICAgdGhpcy5kYXRhVHlwZSA9IERhdGFUeXBlLkFOWTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRhdGF0eXBlIHdoaWNoIGNhbiBiZSBoYW5kbGVkIGJ5IHRoaXMgY29udmVyc2lvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7RGF0YVR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQW55Q29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGF0YVR5cGUoKTogRGF0YVR5cGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgYmFzaWMgcHJvY2VkdXJlIGFuZCBjaGVja3MgZm9yIHRoZSBjb252ZXJzaW9uIG9mIGEgcGFja2FnZSBlbnRyeSB0byBhIHNldHRpbmdzIGVudHJ5IGFuZCBhcHBsaWVzIGl0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2V0dGluZ3N9IHNldHRpbmdcclxuICAgICAqIEBwYXJhbSB7SVBhY2thZ2V9IHBhY2tldFxyXG4gICAgICogQHJldHVybnMge1NldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIEFueUNvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnRGcm9tKHNldHRpbmc6IFNldHRpbmdzLCBwYWNrZXQ6IElQYWNrYWdlKTogU2V0dGluZ3Mge1xyXG5cclxuICAgICAgICAvLyBleHRyYWN0IHRoZSBtZXRhZGF0YSBvZiB0aGUgKGluIHRoZSBwYWNrYWdlS2V5IGFycmF5KSBzcGVjaWZpZWQga2V5cyBmcm9tIHRoZSBwYWNrYWdlXHJcbiAgICAgICAgbGV0IG1ldGE6IEFycmF5PElNZXRhPiA9IHRoaXMucGFja2FnZUtleS5tYXAoKGtleSkgPT4geyByZXR1cm4gUGFja2FnZS5nZXRQYWNrYWdlS2V5TWV0YShwYWNrZXQsIGtleSk7IH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY2hlY2sgaWYgdGhlIG1ldGEgZGF0YSBpcyB2YWxpZCBhbmQgdGhlIGNvbnRhaW5lZCBkYXRhIHR5cGUgc3VwcG9ydGVkIGJ5IHRoaXMgY29udmVyc2lvblxyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrTWV0YURhdGFUeXBlKG1ldGEpKXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwid3JvbmcgbWV0YSB0eXBlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBpZiB0aGUgYWRkaXRpb25hbCBtZXRhIGRhdGEgaXMgc3VwcG9ydGVkIGJ5IHRoaXMgY29udmVyc2lvblxyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrQWRkaXRpb25hbE1ldGFJbmZvcyhtZXRhKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ3cm9uZyBhZGRpdGlvbmFsIG1ldGEgaW5mb1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGV4dHJhY3QgdGhlIGRhdGEgb2YgdGhlIChpbiB0aGUgcGFja2FnZUtleSBhcnJheSkgc3BlY2lmaWVkIGtleXMgZnJvbSB0aGUgcGFja2FnZVxyXG4gICAgICAgIGxldCBkYXRhOiBBcnJheTxhbnk+ID0gdGhpcy5wYWNrYWdlS2V5Lm1hcCgoa2V5KSA9PiB7IHJldHVybiBQYWNrYWdlLmdldFBhY2thZ2VLZXlEYXRhPGFueT4ocGFja2V0LCBrZXkpIH0pO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZGF0YSB0eXBlcyBvZiB0aGUgZGF0YSBhcmUgc3VwcG9ydGVkIGJ5IHRoaXMgY29udmVyc2lvblxyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrRGF0YVR5cGVzKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIndyb25nIGRhdGEgdHlwZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcnVuIHRoZSBjb252ZXJzaW9uIG9mIHRoZSBkYXRhXHJcbiAgICAgICAgbGV0IHNldHRpbmdzRGF0YSA9IHRoaXMuY29udmVydERhdGFGcm9tKGRhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBudW1iZXIgb2YgY29udmVydGVkIGRhdGEgZW50cmllcyBtYXRjaGVzIHRoZSBwcm92aWRlZCBzZXR0aW5ncyBrZXlzXHJcbiAgICAgICAgaWYoc2V0dGluZ3NEYXRhLmxlbmd0aCAhPT0gdGhpcy5zZXR0aW5nS2V5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbW91bnQgb2YgZGF0YSBhbmQga2V5cyBpbmNvbnNpc3RlbnRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgZWFjaCBjb252ZXJ0ZWQgZGF0YSBlbnRyeSB0byB0aGUgc2V0dGluZ1xyXG4gICAgICAgIHNldHRpbmdzRGF0YS5mb3JFYWNoKChpdGVtLCBpKSA9PiB7IFxyXG4gICAgICAgICAgICBpZihpdGVtICE9PSB1bmRlZmluZWQpIHsgLy8gb25seSBhZGQgdGhlIGNvbnZlcnRlZCBkYXRhIGlmIGl0IGlzIHZhbGlkL2V4aXN0c1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZy5zZXRWYWx1ZSh0aGlzLnNldHRpbmdLZXlbaV0sIGl0ZW0pO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc2V0dGluZztcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGJhc2ljIHByb2NlZHVyZSBhbmQgY2hlY2tzIGZvciB0aGUgY29udmVyc2lvbiBvZiBhIHNldHRpbmdzIGVudHJ5IHRvIGEgcGFja2FnZSBlbnRyeSBhbmQgYXBwbGllcyBpdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1NldHRpbmdzfSBzZXR0aW5nXHJcbiAgICAgKiBAcGFyYW0ge0lQYWNrYWdlfSBwYWNrZXRcclxuICAgICAqIEByZXR1cm5zIHtJUGFja2FnZX1cclxuICAgICAqIEBtZW1iZXJvZiBBbnlDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb252ZXJ0VG8oc2V0dGluZzogU2V0dGluZ3MsIHBhY2tldDogSVBhY2thZ2UpOiBJUGFja2FnZSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXh0cmFjdCB0aGUgZGF0YSBvZiB0aGUgKGluIHRoZSBzZXR0aW5nS2V5IGFycmF5KSBzcGVjaWZpZWQga2V5cyBmcm9tIHRoZSBzZXR0aW5nXHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnNldHRpbmdLZXkubWFwKChrZXkpID0+IHtyZXR1cm4gdGhpcy5nZXRTZXR0aW5nc0tleTxhbnk+KHNldHRpbmcsIGtleSk7IH0pO1xyXG5cclxuICAgICAgICAvLyBydW4gdGhlIGNvbnZlcnNpb24gb2YgdGhlIGRhdGFcclxuICAgICAgICBsZXQgcGFja2FnZURhdGE6IEFycmF5PElQYWNrYWdlPiA9IHRoaXMuY29udmVydERhdGFUbyhkYXRhKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGVhY2ggY29udmVydGVkIGRhdGEgZW50cnkgdG8gdGhlIHBhY2thZ2VcclxuICAgICAgICBwYWNrYWdlRGF0YS5mb3JFYWNoKChpdGVtLCBpKSA9PiB7IFxyXG4gICAgICAgICAgICBpZighUGFja2FnZS5pc0ludmFsaWQoaXRlbSkpIHsgLy8gb25seSBhZGQgdGhlIGNvbnZlcnRlZCBkYXRhIGlmIGl0IGlzIHZhbGlkXHJcbiAgICAgICAgICAgICAgICBQYWNrYWdlLnNldFBhY2thZ2VLZXkocGFja2V0LCB0aGlzLnBhY2thZ2VLZXlbaV0sIGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwYWNrZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGRhdGEgb2YgYSBrZXkgb2YgZnJvbSBhIHNldHRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHRlbXBsYXRlIFRcclxuICAgICAqIEBwYXJhbSB7U2V0dGluZ3N9IHNldHRpbmdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICAgICAqIEByZXR1cm5zIHtUfVxyXG4gICAgICogQG1lbWJlcm9mIEFueUNvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFNldHRpbmdzS2V5PFQ+KHNldHRpbmc6IFNldHRpbmdzLCBrZXk6IHN0cmluZyk6IFQge1xyXG4gICAgICAgcmV0dXJuIHNldHRpbmcuZ2V0VmFsdWUoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgZGF0YVR5cGUgY29udGFpbmVkIGluIHRoZSBJTWV0YSBkYXRhIGlzIGNvcnJlY3QgZm9yIHRoaXMgY29udmVyc2lvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElNZXRhPn0gbWV0YVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBjaGVjayB3YXMgc3VjY2Vzc2Z1bC5cclxuICAgICAqIEBtZW1iZXJvZiBBbnlDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja01ldGFEYXRhVHlwZShtZXRhOiAgQXJyYXk8SU1ldGE+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIG1ldGEuZXZlcnkoKG1ldGEpID0+IHsgcmV0dXJuICFNZXRhLmlzSW52YWxpZChtZXRhKSAmJiBtZXRhLmRhdGFUeXBlID09PSB0aGlzLmRhdGFUeXBlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGFkZGl0aW9uYWwgbWV0YSBpbmZvcyBjb250YWluZWQgaW4gdGhlIElNZXRhIGRhdGEgaXMgY29ycmVjdCBmb3IgdGhpcyBjb252ZXJzaW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SU1ldGE+fSBtZXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGNoZWNrIHdhcyBzdWNjZXNmdWwuXHJcbiAgICAgKiBAbWVtYmVyb2YgQW55Q29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tBZGRpdGlvbmFsTWV0YUluZm9zKG1ldGE6IEFycmF5PElNZXRhPik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgZGF0YXR5cGVzIG9mIHRoZSBkYXRhIGFyZSBjb3JyZWN0IGZvciB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGNoZWNrIHdhcyBzdWNjZXNzZnVsLlxyXG4gICAgICogQG1lbWJlcm9mIEFueUNvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrRGF0YVR5cGVzKGRhdGE6IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIHRoZSBkYXRhIGZyb20gcGFja2FnZSB0byBzZXR0aW5ncyBmb3JtYXQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBBbnlDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb252ZXJ0RGF0YUZyb20oZGF0YTogQXJyYXk8YW55Pik6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgdGhlIGRhdGEgZnJvbSBzZXR0aW5ncyB0byBwYWNrYWdlIGZvcm1hdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUGFja2FnZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgQW55Q29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFUbyhkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8SVBhY2thZ2U+IHtcclxuICAgICAgICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0pID0+IHsgcmV0dXJuIG5ldyBQYWNrYWdlKG5ldyBNZXRhKHRoaXMuZGF0YVR5cGUpLCBpdGVtKX0pO1xyXG4gICAgfVxyXG59IFxyXG5cclxuZXhwb3J0IHsgQW55Q29udmVyc2lvbiB9Il19