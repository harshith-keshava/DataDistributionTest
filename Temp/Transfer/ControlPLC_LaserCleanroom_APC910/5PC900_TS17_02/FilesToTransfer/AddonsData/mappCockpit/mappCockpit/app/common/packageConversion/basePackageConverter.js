define(["require", "exports", "../persistence/settings", "./enum/additionalMetaKeys", "./package", "./meta", "./enum/dataTypeEnum", "./packageConversionInfoContainer"], function (require, exports, settings_1, additionalMetaKeys_1, package_1, meta_1, dataTypeEnum_1, packageConversionInfoContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The base class for all package converters.
     *
     * @class BasePackageConverter
     */
    var BasePackageConverter = /** @class */ (function () {
        /**
         * Creates an instance of BasePackageConverter.
         *
         * @param {ObjectType} objectType The object type of the package that can be handled by this converter.
         * @param {string} settingsType The settings type that can be handled by this converter.
         * @memberof BasePackageConverter
         */
        function BasePackageConverter(objectType, settingsType) {
            this.conversionInfoContainer = new packageConversionInfoContainer_1.PackageConversionInfoContainer();
            this.settingsUpgradeMap = new Map();
            this.objectType = objectType;
            this.settingsType = settingsType;
        }
        /**
         * Returns the object type with which this converter can work.
         *
         * @returns {ObjectType}
         * @memberof BasePackageConverter
         */
        BasePackageConverter.prototype.getObjectType = function () {
            return this.objectType;
        };
        /**
         * Returns the settings type with which this converter can work.
         *
         * @returns {string}
         * @memberof BasePackageConverter
         */
        BasePackageConverter.prototype.getSettingsType = function () {
            return this.settingsType;
        };
        /**
         * Handles the basic procedure of converting a setting to a package.
         *
         * @param {Settings} setting The settings object to be converted to a package
         * @param {number} id The id of the resulting package
         * @param {string} [key=""] The key of the resulting package
         * @returns {IPackage}
         * @memberof BasePackageConverter
         */
        BasePackageConverter.prototype.convertTo = function (setting, id, key) {
            if (key === void 0) { key = ""; }
            setting = this.upgradeSetting(setting);
            //retrieve the appropriate conversions for the given setting version
            var conversionInfo = this.conversionInfoContainer.getNewestConversionForSettingsVersion(setting.version);
            var conversions = conversionInfo.conversions;
            //build the additional meta info for the setting
            var additionalMetaInfo = this.buildAdditionalMetaInfo(id, key, conversionInfo.packageVersion);
            var packet = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.OBJECT, additionalMetaInfo));
            if (conversions.length !== 0) { // only run conversions if there are some (version is supported)
                conversions.forEach(function (conversion) { packet = conversion.convertTo(setting, packet); });
            }
            else { // no conversions means the version is unsupported -> throw an error
                throw new Error("unsupported version");
            }
            return packet;
        };
        /**
         * Upgrades a Setting to its newest supported version.
         *
         * @private
         * @param {Settings} setting The settings to be upgraded
         * @returns {Settings}
         * @memberof BasePackageConverter
         */
        BasePackageConverter.prototype.upgradeSetting = function (setting) {
            var upgradedSetting = setting;
            var currentVersion = Number(upgradedSetting.version);
            var maxVersion = Number(this.conversionInfoContainer.getMaxSupportedSettingsVersion());
            while (currentVersion < maxVersion) { // upgrade the setting until the current version and the max supported version match
                var upgrade = this.settingsUpgradeMap.get(currentVersion);
                if (upgrade === undefined) { // if an upgrade inbetween is missing, the setting cannot be updated to newest version -> unsupported version error
                    throw new Error("unsupported version");
                }
                upgradedSetting = upgrade(upgradedSetting);
                currentVersion = Number(upgradedSetting.version);
            }
            return settings_1.Settings.create(upgradedSetting);
        };
        /**
         * Handles the basic procedure of converting a package to a setting
         *
         * @param {IPackage} packet
         * @returns {ISettings}
         * @memberof BasePackageConverter
         */
        BasePackageConverter.prototype.convertFrom = function (packet) {
            var packageVersion = this.getPackageVersion(packet);
            //retrieve the appropriate conversions for the given package version
            var conversionsInfo = this.conversionInfoContainer.getNewestConversionForPackageVersion(packageVersion);
            var conversions = conversionsInfo.conversions;
            var setting = new settings_1.Settings(this.settingsType, conversionsInfo.settingsVersion);
            if (conversions.length !== 0) { // only run conversions if there are some (version is supported)
                conversions.forEach(function (conversion) { setting = conversion.convertFrom(setting, packet); });
                setting = this.upgradeSetting(setting);
            }
            else { // no conversions means the version is unsupported -> throw an error
                throw new Error("unsupported version");
            }
            return setting;
        };
        /**
         * Builds the additional meta information for a converter.
         *
         * @private
         * @param {number} id
         * @param {string} key
         * @returns {Array<KeyValue>}
         * @memberof BasePackageConverter
         */
        BasePackageConverter.prototype.buildAdditionalMetaInfo = function (id, key, version) {
            var additionalMetaInfo = new Array();
            additionalMetaInfo.push({ key: additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE, value: this.objectType });
            additionalMetaInfo.push({ key: additionalMetaKeys_1.AdditionalMetaKeys.VERSION, value: version });
            if (!Number.isNaN(id)) { // add id only if there is one
                additionalMetaInfo.push({ key: additionalMetaKeys_1.AdditionalMetaKeys.ID, value: id });
            }
            if (key !== "") { // add key only if there is one
                additionalMetaInfo.push({ key: additionalMetaKeys_1.AdditionalMetaKeys.KEY, value: key });
            }
            return additionalMetaInfo;
        };
        /**
         * Returns the version number of the provided package.
         *
         * @private
         * @param {Package} packet
         * @returns {number} Version number or NaN if no version number found
         * @memberof BasePackageConverter
         */
        BasePackageConverter.prototype.getPackageVersion = function (packet) {
            return Number(packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.VERSION]);
        };
        return BasePackageConverter;
    }());
    exports.BasePackageConverter = BasePackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVBhY2thZ2VDb252ZXJ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9iYXNlUGFja2FnZUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFjQTs7OztPQUlHO0lBQ0g7UUFjSTs7Ozs7O1dBTUc7UUFDSCw4QkFBWSxVQUFzQixFQUFFLFlBQW9CO1lBRXBELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLCtEQUE4QixFQUFFLENBQUM7WUFDcEUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7WUFFcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksNENBQWEsR0FBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksOENBQWUsR0FBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksd0NBQVMsR0FBaEIsVUFBaUIsT0FBaUIsRUFBRSxFQUFVLEVBQUUsR0FBZ0I7WUFBaEIsb0JBQUEsRUFBQSxRQUFnQjtZQUU1RCxPQUFPLEdBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV0QyxvRUFBb0U7WUFDcEUsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLHFDQUFxQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6RyxJQUFJLFdBQVcsR0FBRSxjQUFjLENBQUMsV0FBVyxDQUFDO1lBRTVDLGdEQUFnRDtZQUNoRCxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVB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QUksQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1lBQ3RGLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSx1Q0FBa0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7WUFFM0UsSUFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSw4QkFBOEI7Z0JBQ2pELGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSx1Q0FBa0IsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7YUFDcEU7WUFDRCxJQUFHLEdBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSwrQkFBK0I7Z0JBQzVDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSx1Q0FBa0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7YUFDdEU7WUFFRCxPQUFPLGtCQUFrQixDQUFDO1FBQzlCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssZ0RBQWlCLEdBQXpCLFVBQTBCLE1BQWU7WUFDckMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1Q0FBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFDTCwyQkFBQztJQUFELENBQUMsQUEzS0QsSUEyS0M7SUFFUSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJUGFja2FnZSB9IGZyb20gXCIuL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi9lbnVtL29iamVjdFR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IEFkZGl0aW9uYWxNZXRhS2V5cyB9IGZyb20gXCIuL2VudW0vYWRkaXRpb25hbE1ldGFLZXlzXCI7XHJcbmltcG9ydCB7IFBhY2thZ2UgfSBmcm9tIFwiLi9wYWNrYWdlXCI7XHJcbmltcG9ydCB7IE1ldGEgfSBmcm9tIFwiLi9tZXRhXCI7XHJcbmltcG9ydCB7IERhdGFUeXBlIH0gZnJvbSBcIi4vZW51bS9kYXRhVHlwZUVudW1cIjtcclxuaW1wb3J0IHsgUGFja2FnZUNvbnZlcnNpb25JbmZvQ29udGFpbmVyIH0gZnJvbSBcIi4vcGFja2FnZUNvbnZlcnNpb25JbmZvQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IElQYWNrYWdlQ29udmVydGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlL3BhY2thZ2VDb252ZXJ0ZXJJbnRlcmZhY2VcIjtcclxuXHJcbi8vVHlwZSBkZXNjcmliaW5nIGEgS2V5IFZhbHVlIHBhaXIsIGFzIGl0IGlzIGFjY2NlcHRlZCBieSB0aGUgTWV0YSBvYmplY3QgY29uc3RydWN0b3IuXHJcbnR5cGUgS2V5VmFsdWUgPSB7a2V5OiBzdHJpbmcsIHZhbHVlOmFueX07XHJcblxyXG4vKipcclxuICogVGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBwYWNrYWdlIGNvbnZlcnRlcnMuXHJcbiAqXHJcbiAqIEBjbGFzcyBCYXNlUGFja2FnZUNvbnZlcnRlclxyXG4gKi9cclxuY2xhc3MgQmFzZVBhY2thZ2VDb252ZXJ0ZXIgaW1wbGVtZW50cyBJUGFja2FnZUNvbnZlcnRlciB7XHJcblxyXG4gICAgLy8gY29udGFpbmVyIGNvbnRhaW5pbmcgYWxsIGNvbnZlcnNpb25zIG5lY2Vzc2FyeSBmb3IgdGhpcyBjb252ZXJ0ZXIgZm9yIGV2ZXJ5IHZlcnNpb24gc3VwcG9ydGVkXHJcbiAgICBwcm90ZWN0ZWQgY29udmVyc2lvbkluZm9Db250YWluZXI6IFBhY2thZ2VDb252ZXJzaW9uSW5mb0NvbnRhaW5lcjtcclxuXHJcbiAgICAvLyBtYXAgY29udGFpbmluZyB1cGdyYWRlcyBmb3IgZWFjaCBzZXR0aW5ncyB2ZXJzaW9uIHRvIHRoZSB2ZXJzaW9uIG9uZSBhYm92ZVxyXG4gICAgcHJvdGVjdGVkIHNldHRpbmdzVXBncmFkZU1hcDogTWFwPG51bWJlciwgKHNldHRpbmdzOiBJU2V0dGluZ3MpID0+IElTZXR0aW5ncz47XHJcblxyXG4gICAgLy8gdGhlIG9iamVjdCB0eXBlIG9mIHRoZSBwYWNrYWdlIHRoaXMgY29udmVydGVyIGlzIHN1aXRhYmxlIGZvclxyXG4gICAgcHJvdGVjdGVkIG9iamVjdFR5cGU6IE9iamVjdFR5cGVcclxuXHJcbiAgICAvLyB0aGUgc2V0dGluZ3MgdHlwZSB0aGlzIGNvbnZlcnRlciBpcyBzdWl0YWJsZSBmb3JcclxuICAgIHByb3RlY3RlZCBzZXR0aW5nc1R5cGU6IHN0cmluZ1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCYXNlUGFja2FnZUNvbnZlcnRlci5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RUeXBlfSBvYmplY3RUeXBlIFRoZSBvYmplY3QgdHlwZSBvZiB0aGUgcGFja2FnZSB0aGF0IGNhbiBiZSBoYW5kbGVkIGJ5IHRoaXMgY29udmVydGVyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNldHRpbmdzVHlwZSBUaGUgc2V0dGluZ3MgdHlwZSB0aGF0IGNhbiBiZSBoYW5kbGVkIGJ5IHRoaXMgY29udmVydGVyLlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VQYWNrYWdlQ29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9iamVjdFR5cGU6IE9iamVjdFR5cGUsIHNldHRpbmdzVHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb252ZXJzaW9uSW5mb0NvbnRhaW5lciA9IG5ldyBQYWNrYWdlQ29udmVyc2lvbkluZm9Db250YWluZXIoKTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzVXBncmFkZU1hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm9iamVjdFR5cGUgPSBvYmplY3RUeXBlO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3NUeXBlID0gc2V0dGluZ3NUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgb2JqZWN0IHR5cGUgd2l0aCB3aGljaCB0aGlzIGNvbnZlcnRlciBjYW4gd29yay5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0VHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlUGFja2FnZUNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0T2JqZWN0VHlwZSgpOiBPYmplY3RUeXBlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2V0dGluZ3MgdHlwZSB3aXRoIHdoaWNoIHRoaXMgY29udmVydGVyIGNhbiB3b3JrLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNldHRpbmdzVHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGJhc2ljIHByb2NlZHVyZSBvZiBjb252ZXJ0aW5nIGEgc2V0dGluZyB0byBhIHBhY2thZ2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTZXR0aW5nc30gc2V0dGluZyBUaGUgc2V0dGluZ3Mgb2JqZWN0IHRvIGJlIGNvbnZlcnRlZCB0byBhIHBhY2thZ2VcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCBUaGUgaWQgb2YgdGhlIHJlc3VsdGluZyBwYWNrYWdlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2tleT1cIlwiXSBUaGUga2V5IG9mIHRoZSByZXN1bHRpbmcgcGFja2FnZVxyXG4gICAgICogQHJldHVybnMge0lQYWNrYWdlfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VQYWNrYWdlQ29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb252ZXJ0VG8oc2V0dGluZzogU2V0dGluZ3MsIGlkOiBudW1iZXIsIGtleTogc3RyaW5nID0gXCJcIik6IElQYWNrYWdlIHtcclxuICAgICAgICBcclxuICAgICAgICBzZXR0aW5nPSB0aGlzLnVwZ3JhZGVTZXR0aW5nKHNldHRpbmcpO1xyXG5cclxuICAgICAgICAvL3JldHJpZXZlIHRoZSBhcHByb3ByaWF0ZSBjb252ZXJzaW9ucyBmb3IgdGhlIGdpdmVuIHNldHRpbmcgdmVyc2lvblxyXG4gICAgICAgIGxldCBjb252ZXJzaW9uSW5mbyA9IHRoaXMuY29udmVyc2lvbkluZm9Db250YWluZXIuZ2V0TmV3ZXN0Q29udmVyc2lvbkZvclNldHRpbmdzVmVyc2lvbihzZXR0aW5nLnZlcnNpb24pO1xyXG4gICAgICAgIGxldCBjb252ZXJzaW9ucz0gY29udmVyc2lvbkluZm8uY29udmVyc2lvbnM7XHJcblxyXG4gICAgICAgIC8vYnVpbGQgdGhlIGFkZGl0aW9uYWwgbWV0YSBpbmZvIGZvciB0aGUgc2V0dGluZ1xyXG4gICAgICAgIGxldCBhZGRpdGlvbmFsTWV0YUluZm8gPSB0aGlzLmJ1aWxkQWRkaXRpb25hbE1ldGFJbmZvKGlkLCBrZXksIGNvbnZlcnNpb25JbmZvLnBhY2thZ2VWZXJzaW9uKTtcclxuXHJcbiAgICAgICAgbGV0IHBhY2tldCA9IG5ldyBQYWNrYWdlKG5ldyBNZXRhKERhdGFUeXBlLk9CSkVDVCwgYWRkaXRpb25hbE1ldGFJbmZvKSk7XHJcblxyXG4gICAgICAgIGlmKGNvbnZlcnNpb25zLmxlbmd0aCAhPT0gMCkgeyAvLyBvbmx5IHJ1biBjb252ZXJzaW9ucyBpZiB0aGVyZSBhcmUgc29tZSAodmVyc2lvbiBpcyBzdXBwb3J0ZWQpXHJcbiAgICAgICAgICAgIGNvbnZlcnNpb25zLmZvckVhY2goKGNvbnZlcnNpb24pID0+IHsgcGFja2V0PSBjb252ZXJzaW9uLmNvbnZlcnRUbyhzZXR0aW5nLCBwYWNrZXQpfSlcclxuICAgICAgICB9IGVsc2UgeyAvLyBubyBjb252ZXJzaW9ucyBtZWFucyB0aGUgdmVyc2lvbiBpcyB1bnN1cHBvcnRlZCAtPiB0aHJvdyBhbiBlcnJvclxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZCB2ZXJzaW9uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhY2tldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZ3JhZGVzIGEgU2V0dGluZyB0byBpdHMgbmV3ZXN0IHN1cHBvcnRlZCB2ZXJzaW9uLiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTZXR0aW5nc30gc2V0dGluZyBUaGUgc2V0dGluZ3MgdG8gYmUgdXBncmFkZWRcclxuICAgICAqIEByZXR1cm5zIHtTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlUGFja2FnZUNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZ3JhZGVTZXR0aW5nKHNldHRpbmc6IFNldHRpbmdzKTogU2V0dGluZ3Mge1xyXG5cclxuICAgICAgICBsZXQgdXBncmFkZWRTZXR0aW5nOiBJU2V0dGluZ3M9IHNldHRpbmc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGN1cnJlbnRWZXJzaW9uOiBudW1iZXI9IE51bWJlcih1cGdyYWRlZFNldHRpbmcudmVyc2lvbik7XHJcbiAgICAgICAgbGV0IG1heFZlcnNpb249IE51bWJlcih0aGlzLmNvbnZlcnNpb25JbmZvQ29udGFpbmVyLmdldE1heFN1cHBvcnRlZFNldHRpbmdzVmVyc2lvbigpKVxyXG5cclxuICAgICAgICB3aGlsZShjdXJyZW50VmVyc2lvbiA8IG1heFZlcnNpb24pIHsgLy8gdXBncmFkZSB0aGUgc2V0dGluZyB1bnRpbCB0aGUgY3VycmVudCB2ZXJzaW9uIGFuZCB0aGUgbWF4IHN1cHBvcnRlZCB2ZXJzaW9uIG1hdGNoXHJcbiAgICAgICAgICAgIGxldCB1cGdyYWRlPSB0aGlzLnNldHRpbmdzVXBncmFkZU1hcC5nZXQoY3VycmVudFZlcnNpb24pO1xyXG4gICAgICAgICAgICBpZih1cGdyYWRlID09PSB1bmRlZmluZWQpIHsgLy8gaWYgYW4gdXBncmFkZSBpbmJldHdlZW4gaXMgbWlzc2luZywgdGhlIHNldHRpbmcgY2Fubm90IGJlIHVwZGF0ZWQgdG8gbmV3ZXN0IHZlcnNpb24gLT4gdW5zdXBwb3J0ZWQgdmVyc2lvbiBlcnJvclxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWQgdmVyc2lvblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1cGdyYWRlZFNldHRpbmc9IHVwZ3JhZGUodXBncmFkZWRTZXR0aW5nKTtcclxuICAgICAgICAgICAgY3VycmVudFZlcnNpb249IE51bWJlcih1cGdyYWRlZFNldHRpbmcudmVyc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBTZXR0aW5ncy5jcmVhdGUodXBncmFkZWRTZXR0aW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGJhc2ljIHByb2NlZHVyZSBvZiBjb252ZXJ0aW5nIGEgcGFja2FnZSB0byBhIHNldHRpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQYWNrYWdlfSBwYWNrZXRcclxuICAgICAqIEByZXR1cm5zIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnRGcm9tKHBhY2tldDogSVBhY2thZ2UpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBhY2thZ2VWZXJzaW9uPSB0aGlzLmdldFBhY2thZ2VWZXJzaW9uKHBhY2tldCk7XHJcblxyXG4gICAgICAgIC8vcmV0cmlldmUgdGhlIGFwcHJvcHJpYXRlIGNvbnZlcnNpb25zIGZvciB0aGUgZ2l2ZW4gcGFja2FnZSB2ZXJzaW9uXHJcbiAgICAgICAgbGV0IGNvbnZlcnNpb25zSW5mbyA9IHRoaXMuY29udmVyc2lvbkluZm9Db250YWluZXIuZ2V0TmV3ZXN0Q29udmVyc2lvbkZvclBhY2thZ2VWZXJzaW9uKHBhY2thZ2VWZXJzaW9uKTtcclxuICAgICAgICBsZXQgY29udmVyc2lvbnMgPSBjb252ZXJzaW9uc0luZm8uY29udmVyc2lvbnM7XHJcblxyXG4gICAgICAgIGxldCBzZXR0aW5nID0gbmV3IFNldHRpbmdzKHRoaXMuc2V0dGluZ3NUeXBlLCBjb252ZXJzaW9uc0luZm8uc2V0dGluZ3NWZXJzaW9uKTtcclxuXHJcbiAgICAgICAgaWYoY29udmVyc2lvbnMubGVuZ3RoICE9PSAwKSB7IC8vIG9ubHkgcnVuIGNvbnZlcnNpb25zIGlmIHRoZXJlIGFyZSBzb21lICh2ZXJzaW9uIGlzIHN1cHBvcnRlZClcclxuICAgICAgICAgICAgY29udmVyc2lvbnMuZm9yRWFjaCgoY29udmVyc2lvbikgPT4geyBzZXR0aW5nPSBjb252ZXJzaW9uLmNvbnZlcnRGcm9tKHNldHRpbmcsIHBhY2tldCl9KVxyXG4gICAgICAgICAgICBzZXR0aW5nPSB0aGlzLnVwZ3JhZGVTZXR0aW5nKHNldHRpbmcpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIG5vIGNvbnZlcnNpb25zIG1lYW5zIHRoZSB2ZXJzaW9uIGlzIHVuc3VwcG9ydGVkIC0+IHRocm93IGFuIGVycm9yXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkIHZlcnNpb25cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2V0dGluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkcyB0aGUgYWRkaXRpb25hbCBtZXRhIGluZm9ybWF0aW9uIGZvciBhIGNvbnZlcnRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8S2V5VmFsdWU+fVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VQYWNrYWdlQ29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYnVpbGRBZGRpdGlvbmFsTWV0YUluZm8oaWQ6IG51bWJlciwga2V5OiBzdHJpbmcsIHZlcnNpb246IG51bWJlcik6IEFycmF5PEtleVZhbHVlPntcclxuXHJcbiAgICAgICAgbGV0IGFkZGl0aW9uYWxNZXRhSW5mbzogQXJyYXk8S2V5VmFsdWU+ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgYWRkaXRpb25hbE1ldGFJbmZvLnB1c2goe2tleTogQWRkaXRpb25hbE1ldGFLZXlzLk9CSkVDVFRZUEUsIHZhbHVlOiB0aGlzLm9iamVjdFR5cGV9KTtcclxuICAgICAgICBhZGRpdGlvbmFsTWV0YUluZm8ucHVzaCh7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuVkVSU0lPTiwgdmFsdWU6IHZlcnNpb259KTtcclxuXHJcbiAgICAgICAgaWYoIU51bWJlci5pc05hTihpZCkpeyAvLyBhZGQgaWQgb25seSBpZiB0aGVyZSBpcyBvbmVcclxuICAgICAgICAgICAgYWRkaXRpb25hbE1ldGFJbmZvLnB1c2goe2tleTogQWRkaXRpb25hbE1ldGFLZXlzLklELCB2YWx1ZTogaWR9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoa2V5ICE9PSBcIlwiKSB7IC8vIGFkZCBrZXkgb25seSBpZiB0aGVyZSBpcyBvbmVcclxuICAgICAgICAgICAgYWRkaXRpb25hbE1ldGFJbmZvLnB1c2goe2tleTogQWRkaXRpb25hbE1ldGFLZXlzLktFWSwgdmFsdWU6IGtleX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxNZXRhSW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHZlcnNpb24gbnVtYmVyIG9mIHRoZSBwcm92aWRlZCBwYWNrYWdlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1BhY2thZ2V9IHBhY2tldFxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gVmVyc2lvbiBudW1iZXIgb3IgTmFOIGlmIG5vIHZlcnNpb24gbnVtYmVyIGZvdW5kXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQYWNrYWdlVmVyc2lvbihwYWNrZXQ6IFBhY2thZ2UpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIocGFja2V0Lm1ldGFbQWRkaXRpb25hbE1ldGFLZXlzLlZFUlNJT05dKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQmFzZVBhY2thZ2VDb252ZXJ0ZXIgfSJdfQ==