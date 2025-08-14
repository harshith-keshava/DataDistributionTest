define(["require", "exports", "../persistence/settings", "../../models/chartManagerDataModel/chartPackageConverter", "../../models/common/calculatorProvider/calculationDataPackageConverter", "../../models/signalManagerDataModel/categoryPackageConverter", "../../models/chartManagerDataModel/chartManagerDataModelPackageConverter", "../../widgets/common/states/cursorStatesPackageConverter", "../../models/chartManagerDataModel/scalePackageConverter", "../../models/signalManagerDataModel/serieGroupPackageConverter", "../../models/common/seriesProvider/seriesProviderPackageConverter", "../../models/signalManagerDataModel/signalManagerDataModelPackageConverter", "../../models/common/signal/signalPackageConverter", "../../models/common/series/ytSeriesPackageConverter", "../../models/common/series/xySeriesPackageConverter", "../../models/common/series/fftSeriesPackageConverter", "./package", "./enum/additionalMetaKeys"], function (require, exports, settings_1, chartPackageConverter_1, calculationDataPackageConverter_1, categoryPackageConverter_1, chartManagerDataModelPackageConverter_1, cursorStatesPackageConverter_1, scalePackageConverter_1, serieGroupPackageConverter_1, seriesProviderPackageConverter_1, signalManagerDataModelPackageConverter_1, signalPackageConverter_1, ytSeriesPackageConverter_1, xySeriesPackageConverter_1, fftSeriesPackageConverter_1, package_1, additionalMetaKeys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The Controller to handle the conversion from settings format to package format and vice versa.
     *
     * @class PackageConversionController
     */
    var PackageConversionController = /** @class */ (function () {
        /**
         * Creates an instance of PackageConversionController.
         * The constructor is set to private to ensure only one instance of the PackageConversionController exists at a time (Singleton).
         *
         * @memberof PackageConversionController
         */
        function PackageConversionController() {
            this.converterPool = [
                new calculationDataPackageConverter_1.CalculationDataPackageConverter(),
                new categoryPackageConverter_1.CategoryPackageConverter(),
                new chartPackageConverter_1.ChartPackageConverter(),
                new chartManagerDataModelPackageConverter_1.ChartManagerDataModelPackageConverter(),
                new cursorStatesPackageConverter_1.CursorStatesPackageConverter(),
                new scalePackageConverter_1.ScalePackageConverter(),
                new serieGroupPackageConverter_1.SerieGroupPackageConverter(),
                new seriesProviderPackageConverter_1.SeriesProviderPackageConverter(),
                new signalManagerDataModelPackageConverter_1.SignalManagerDataModelPackageConverter(),
                new signalPackageConverter_1.SignalPackageConverter(),
                new ytSeriesPackageConverter_1.YTSeriesPackageConverter(),
                new xySeriesPackageConverter_1.XYSeriesPackageConverter(),
                new fftSeriesPackageConverter_1.FFTSeriesPackageConverter()
            ];
            this.packageArray = new Array();
            this.settingsMap = new Map();
        }
        /**
         * Returns the current Instance of the PackageConversionController.
         * If no instance exists, it is created.
         *
         * @static
         * @returns {PackageConversionController}
         * @memberof PackageConversionController
         */
        PackageConversionController.getInstance = function () {
            if (this.instance == null) {
                this.instance = new PackageConversionController();
                this.idCounter = 0;
            }
            return this.instance;
        };
        /**
         * Resets the instance of the PackageConversionController.
         *
         * @static
         * @memberof PackageConversionController
         */
        PackageConversionController.resetInstance = function () {
            this.instance = null;
            this.idCounter = 0;
        };
        /**
         * Returns the current available id and increments the counter it is taken from.
         *
         * @static
         * @returns {number}
         * @memberof PackageConversionController
         */
        PackageConversionController.getId = function () {
            return this.idCounter++;
        };
        /**
         * Schedules a setting for conversion.
         * If a conversion for this key is already sheduled, it will be overwritten.
         *
         * @static
         * @param {string} key
         * @param {Settings} setting
         * @memberof PackageConversionController
         */
        PackageConversionController.scheduleConversionTo = function (key, setting) {
            var instance = PackageConversionController.getInstance();
            if (instance.settingsMap.has(key)) {
                instance.settingsMap.delete(key);
            }
            instance.settingsMap.set(key, settings_1.Settings.create(setting));
        };
        /**
         * Schedules an array of packages for conversion.
         * Invalid packages will be removed before sheduling for conversion.
         * If a conversion is already scheduled for any array of packages, it will be overwritten.
         *
         * @static
         * @param {Array<IPackage>} packets
         * @memberof PackageConversionController
         */
        PackageConversionController.scheduleConversionFrom = function (packets) {
            var instance = PackageConversionController.getInstance();
            instance.packageArray = packets.filter(function (packet) { return !package_1.Package.isInvalid(packet); });
        };
        /**
         * Triggers the conversion from settings format to package format and returns the result.
         *
         * @static
         * @returns {Array<IPackage>}
         * @memberof PackageConversionController
         */
        PackageConversionController.runConversionTo = function () {
            var packageArray = new Array();
            var instance = PackageConversionController.getInstance();
            try {
                instance.settingsMap.forEach(function (setting, key) {
                    var packet = instance.convertTo(setting, key);
                    instance.packageArray.push(packet);
                });
                packageArray = instance.packageArray;
            }
            catch (e) {
                console.error("PackageConversion failed: " + e);
            }
            PackageConversionController.resetInstance();
            return packageArray;
        };
        /**
         * Triggers the conversion from package format to settings format and returns the result.
         *
         * @static
         * @returns {Map<string, Settings>}
         * @memberof PackageConversionController
         */
        PackageConversionController.runConversionFrom = function () {
            var settingsMap = new Map();
            var instance = PackageConversionController.getInstance();
            try {
                var packageKeys = instance.collectPackageKeys();
                packageKeys.forEach(function (key) {
                    var packet = instance.getPackageByKey(key);
                    if (!package_1.Package.isInvalid(packet)) {
                        var setting = instance.convertFrom(packet);
                        instance.settingsMap.set(key, settings_1.Settings.create(setting));
                    }
                });
                settingsMap = instance.settingsMap;
            }
            catch (e) {
                console.error("PackageConversion failed: " + e);
            }
            PackageConversionController.resetInstance();
            return settingsMap;
        };
        /**
         * Returns a suitable instance of a converter specified by the provided settings type.
         * If no suitable converter is found, undefined will be returned.
         *
         * @private
         * @param {string} type
         * @returns {(IPackageConverter | undefined)}
         * @memberof PackageConversionController
         */
        PackageConversionController.prototype.pickConverterBySettingType = function (type) {
            return this.converterPool.find(function (converter) {
                return converter.getSettingsType() === type;
            });
        };
        /**
         * Returns a suitable instance of a converter specified by the provided package type.
         * If no suitable converter is found, undefined will be returned.
         *
         * @private
         * @param {string} type
         * @returns {IPackageConverter}
         * @memberof PackageConversionController
         */
        PackageConversionController.prototype.pickConverterByPackageType = function (type) {
            return this.converterPool.find(function (converter) {
                return converter.getObjectType() === type;
            });
        };
        /**
         * Searches the internal package array for keys of packages and returns the found keys.
         *
         * @private
         * @returns {Array<string>}
         * @memberof PackageConversionController
         */
        PackageConversionController.prototype.collectPackageKeys = function () {
            var packageKeys = new Array();
            this.packageArray.forEach(function (elem) {
                if (elem.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY] !== undefined) {
                    packageKeys.push(elem.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY]);
                }
            });
            return packageKeys;
        };
        /**
         * Returns a package specified by the provided id from the internal package array.
         * If no package with this id can be found, an invalid package will be returned.
         *
         * @param {number} id
         * @returns {(IPackage | undefined)}
         * @memberof PackageConversionController
         */
        PackageConversionController.prototype.getPackageById = function (id) {
            var packet = package_1.Package.createInvalid();
            var finding = this.packageArray.find(function (packet) {
                return packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.ID] === id;
            });
            if (finding !== undefined) {
                packet = finding;
            }
            return packet;
        };
        /**
         * Returns a package specified by the provided key from the internal packageArray.
         * If no package with this key can be found, an invalid package will be returned.
         *
         * @param {string} key
         * @returns {(IPackage | undefined)}
         * @memberof PackageConversionController
         */
        PackageConversionController.prototype.getPackageByKey = function (key) {
            var packet = package_1.Package.createInvalid();
            var finding = this.packageArray.find(function (packet) {
                return packet.meta.key === key;
            });
            if (finding !== undefined) {
                packet = finding;
            }
            return packet;
        };
        /**
         * Adds a single package to the internal package storage.
         *
         * @param {IPackage} packet
         * @memberof PackageConversionController
         */
        PackageConversionController.prototype.addPackage = function (packet) {
            if (!package_1.Package.isInvalid(packet)) {
                this.packageArray.push(packet);
            }
        };
        /**
         * Handles the conversion from ISettings to IPackage format.
         *
         * @param {Settings} setting
         * @param {string} [key]
         * @returns {IPackage}
         * @memberof PackageConversionController
         */
        PackageConversionController.prototype.convertTo = function (setting, key) {
            var converter = this.pickConverterBySettingType(setting.type);
            if (converter !== undefined) {
                var packet = converter.convertTo(setting, PackageConversionController.getId(), key);
                return packet;
            }
            else {
                throw new Error("No converter for this type of setting found");
            }
        };
        /**
         * Handles the conversion from IPackage to ISettings format.
         *
         * @param {IPackage} packet
         * @returns {ISettings}
         * @memberof PackageConversionController
         */
        PackageConversionController.prototype.convertFrom = function (packet) {
            var converter = this.pickConverterByPackageType(packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE]);
            if (converter !== undefined) {
                var setting = converter.convertFrom(packet);
                return setting;
            }
            else {
                throw new Error("No converter for this type of package found");
            }
        };
        PackageConversionController.instance = null;
        PackageConversionController.idCounter = 0;
        return PackageConversionController;
    }());
    exports.PackageConversionController = PackageConversionController;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vcGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXFCQTs7OztPQUlHO0lBQ0g7UUF3Qkk7Ozs7O1dBS0c7UUFDSDtZQXRCUSxrQkFBYSxHQUE2QjtnQkFDOUMsSUFBSSxpRUFBK0IsRUFBRTtnQkFDckMsSUFBSSxtREFBd0IsRUFBRTtnQkFDOUIsSUFBSSw2Q0FBcUIsRUFBRTtnQkFDM0IsSUFBSSw2RUFBcUMsRUFBRTtnQkFDM0MsSUFBSSwyREFBNEIsRUFBRTtnQkFDbEMsSUFBSSw2Q0FBcUIsRUFBRTtnQkFDM0IsSUFBSSx1REFBMEIsRUFBRTtnQkFDaEMsSUFBSSwrREFBOEIsRUFBRTtnQkFDcEMsSUFBSSwrRUFBc0MsRUFBRTtnQkFDNUMsSUFBSSwrQ0FBc0IsRUFBRTtnQkFDNUIsSUFBSSxtREFBd0IsRUFBRTtnQkFDOUIsSUFBSSxtREFBd0IsRUFBRTtnQkFDOUIsSUFBSSxxREFBeUIsRUFBRTthQUNsQyxDQUFDO1lBVUUsSUFBSSxDQUFDLFlBQVksR0FBRSxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNXLHVDQUFXLEdBQXpCO1lBRUksSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRSxJQUFJLDJCQUEyQixFQUFFLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUUsQ0FBQyxDQUFDO2FBQ3JCO1lBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNXLHlDQUFh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UyxDQUFDLE9BQU8sRUFBRSwyQkFBMkIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDOUYsT0FBTyxNQUFNLENBQUM7YUFDakI7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO2FBQ2xFO1FBQ0wsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNJLGlEQUFXLEdBQWxCLFVBQW1CLE1BQWdCO1lBRS9CLElBQUksU0FBUyxHQUFrQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1Q0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBRTNILElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFFekIsSUFBSSxPQUFPLEdBQWMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDdEQsT0FBTyxPQUFPLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO2FBQ2xFO1FBQ0wsQ0FBQztRQXJVYyxvQ0FBUSxHQUF1QyxJQUFJLENBQUM7UUFDcEQscUNBQVMsR0FBVyxDQUFDLENBQUM7UUFzVXpDLGtDQUFDO0tBQUEsQUE1VUQsSUE0VUM7SUFFUSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUGFja2FnZSB9IGZyb20gXCIuL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCJcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRQYWNrYWdlQ29udmVydGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRQYWNrYWdlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBhY2thZ2VDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhUGFja2FnZUNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeVBhY2thZ2VDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvY2F0ZWdvcnlQYWNrYWdlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlckRhdGFNb2RlbFBhY2thZ2VDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlc1BhY2thZ2VDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1BhY2thZ2VDb252ZXJ0ZXJcIjtcclxuaW1wb3J0IHsgU2NhbGVQYWNrYWdlQ29udmVydGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVQYWNrYWdlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IFNlcmllR3JvdXBQYWNrYWdlQ29udmVydGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NlcmllR3JvdXBQYWNrYWdlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IFNlcmllc1Byb3ZpZGVyUGFja2FnZUNvbnZlcnRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVyUGFja2FnZUNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUNvbnZlcnRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBTaWduYWxQYWNrYWdlQ29udmVydGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2lnbmFsL3NpZ25hbFBhY2thZ2VDb252ZXJ0ZXJcIjtcclxuaW1wb3J0IHsgWVRTZXJpZXNQYWNrYWdlQ29udmVydGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL3l0U2VyaWVzUGFja2FnZUNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBYWVNlcmllc1BhY2thZ2VDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMveHlTZXJpZXNQYWNrYWdlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IEZGVFNlcmllc1BhY2thZ2VDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvZmZ0U2VyaWVzUGFja2FnZUNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBQYWNrYWdlIH0gZnJvbSBcIi4vcGFja2FnZVwiO1xyXG5pbXBvcnQgeyBBZGRpdGlvbmFsTWV0YUtleXMgfSBmcm9tIFwiLi9lbnVtL2FkZGl0aW9uYWxNZXRhS2V5c1wiO1xyXG5pbXBvcnQgeyBJUGFja2FnZUNvbnZlcnRlciB9IGZyb20gXCIuL2ludGVyZmFjZS9wYWNrYWdlQ29udmVydGVySW50ZXJmYWNlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBDb250cm9sbGVyIHRvIGhhbmRsZSB0aGUgY29udmVyc2lvbiBmcm9tIHNldHRpbmdzIGZvcm1hdCB0byBwYWNrYWdlIGZvcm1hdCBhbmQgdmljZSB2ZXJzYS5cclxuICpcclxuICogQGNsYXNzIFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlclxyXG4gKi9cclxuY2xhc3MgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyIHtcclxuXHJcbiAgICBwcml2YXRlIHBhY2thZ2VBcnJheTogQXJyYXk8SVBhY2thZ2U+O1xyXG4gICAgcHJpdmF0ZSBzZXR0aW5nc01hcDogTWFwPHN0cmluZywgU2V0dGluZ3M+O1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpZENvdW50ZXI6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBjb252ZXJ0ZXJQb29sOiBBcnJheTxJUGFja2FnZUNvbnZlcnRlcj4gPSBbXHJcbiAgICAgICAgbmV3IENhbGN1bGF0aW9uRGF0YVBhY2thZ2VDb252ZXJ0ZXIoKSxcclxuICAgICAgICBuZXcgQ2F0ZWdvcnlQYWNrYWdlQ29udmVydGVyKCksXHJcbiAgICAgICAgbmV3IENoYXJ0UGFja2FnZUNvbnZlcnRlcigpLFxyXG4gICAgICAgIG5ldyBDaGFydE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQ29udmVydGVyKCksXHJcbiAgICAgICAgbmV3IEN1cnNvclN0YXRlc1BhY2thZ2VDb252ZXJ0ZXIoKSxcclxuICAgICAgICBuZXcgU2NhbGVQYWNrYWdlQ29udmVydGVyKCksXHJcbiAgICAgICAgbmV3IFNlcmllR3JvdXBQYWNrYWdlQ29udmVydGVyKCksXHJcbiAgICAgICAgbmV3IFNlcmllc1Byb3ZpZGVyUGFja2FnZUNvbnZlcnRlcigpLFxyXG4gICAgICAgIG5ldyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUNvbnZlcnRlcigpLFxyXG4gICAgICAgIG5ldyBTaWduYWxQYWNrYWdlQ29udmVydGVyKCksXHJcbiAgICAgICAgbmV3IFlUU2VyaWVzUGFja2FnZUNvbnZlcnRlcigpLFxyXG4gICAgICAgIG5ldyBYWVNlcmllc1BhY2thZ2VDb252ZXJ0ZXIoKSxcclxuICAgICAgICBuZXcgRkZUU2VyaWVzUGFja2FnZUNvbnZlcnRlcigpXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIuXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaXMgc2V0IHRvIHByaXZhdGUgdG8gZW5zdXJlIG9ubHkgb25lIGluc3RhbmNlIG9mIHRoZSBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIgZXhpc3RzIGF0IGEgdGltZSAoU2luZ2xldG9uKS5cclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICB0aGlzLnBhY2thZ2VBcnJheT0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc01hcD0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgSW5zdGFuY2Ugb2YgdGhlIFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlci4gXHJcbiAgICAgKiBJZiBubyBpbnN0YW5jZSBleGlzdHMsIGl0IGlzIGNyZWF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge1BhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlcn1cclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlPSBuZXcgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyKCk7ICBcclxuICAgICAgICAgICAgdGhpcy5pZENvdW50ZXI9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyB0aGUgaW5zdGFuY2Ugb2YgdGhlIFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVzZXRJbnN0YW5jZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlkQ291bnRlciA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IGF2YWlsYWJsZSBpZCBhbmQgaW5jcmVtZW50cyB0aGUgY291bnRlciBpdCBpcyB0YWtlbiBmcm9tLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldElkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWRDb3VudGVyKys7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTY2hlZHVsZXMgYSBzZXR0aW5nIGZvciBjb252ZXJzaW9uLlxyXG4gICAgICogSWYgYSBjb252ZXJzaW9uIGZvciB0aGlzIGtleSBpcyBhbHJlYWR5IHNoZWR1bGVkLCBpdCB3aWxsIGJlIG92ZXJ3cml0dGVuLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICAgICAqIEBwYXJhbSB7U2V0dGluZ3N9IHNldHRpbmdcclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzY2hlZHVsZUNvbnZlcnNpb25UbyhrZXk6IHN0cmluZywgc2V0dGluZzogSVNldHRpbmdzKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBpbnN0YW5jZSA9IFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlci5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgICAgICBpZihpbnN0YW5jZS5zZXR0aW5nc01hcC5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5zZXR0aW5nc01hcC5kZWxldGUoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5zdGFuY2Uuc2V0dGluZ3NNYXAuc2V0KGtleSwgU2V0dGluZ3MuY3JlYXRlKHNldHRpbmcpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlcyBhbiBhcnJheSBvZiBwYWNrYWdlcyBmb3IgY29udmVyc2lvbi5cclxuICAgICAqIEludmFsaWQgcGFja2FnZXMgd2lsbCBiZSByZW1vdmVkIGJlZm9yZSBzaGVkdWxpbmcgZm9yIGNvbnZlcnNpb24uXHJcbiAgICAgKiBJZiBhIGNvbnZlcnNpb24gaXMgYWxyZWFkeSBzY2hlZHVsZWQgZm9yIGFueSBhcnJheSBvZiBwYWNrYWdlcywgaXQgd2lsbCBiZSBvdmVyd3JpdHRlbi4gXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUGFja2FnZT59IHBhY2tldHNcclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzY2hlZHVsZUNvbnZlcnNpb25Gcm9tKHBhY2tldHM6IEFycmF5PElQYWNrYWdlPik6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAgICAgaW5zdGFuY2UucGFja2FnZUFycmF5PSBwYWNrZXRzLmZpbHRlcigocGFja2V0KSA9PiB7IHJldHVybiAhUGFja2FnZS5pc0ludmFsaWQocGFja2V0KTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VycyB0aGUgY29udmVyc2lvbiBmcm9tIHNldHRpbmdzIGZvcm1hdCB0byBwYWNrYWdlIGZvcm1hdCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0LlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUGFja2FnZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcnVuQ29udmVyc2lvblRvKCk6IEFycmF5PElQYWNrYWdlPiB7XHJcblxyXG4gICAgICAgIGxldCBwYWNrYWdlQXJyYXkgPSBuZXcgQXJyYXk8SVBhY2thZ2U+KCk7IFxyXG5cclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaW5zdGFuY2Uuc2V0dGluZ3NNYXAuZm9yRWFjaCgoc2V0dGluZywga2V5KT0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHBhY2tldDogSVBhY2thZ2UgPSBpbnN0YW5jZS5jb252ZXJ0VG8oc2V0dGluZywga2V5KTtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLnBhY2thZ2VBcnJheS5wdXNoKHBhY2tldCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcGFja2FnZUFycmF5ID0gaW5zdGFuY2UucGFja2FnZUFycmF5O1xyXG4gICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUGFja2FnZUNvbnZlcnNpb24gZmFpbGVkOiBcIiArIGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyLnJlc2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhY2thZ2VBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXJzIHRoZSBjb252ZXJzaW9uIGZyb20gcGFja2FnZSBmb3JtYXQgdG8gc2V0dGluZ3MgZm9ybWF0IGFuZCByZXR1cm5zIHRoZSByZXN1bHQuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge01hcDxzdHJpbmcsIFNldHRpbmdzPn1cclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBydW5Db252ZXJzaW9uRnJvbSgpOiBNYXA8c3RyaW5nLCBJU2V0dGluZ3M+IHtcclxuXHJcbiAgICAgICAgbGV0IHNldHRpbmdzTWFwID0gbmV3IE1hcDxzdHJpbmcsIElTZXR0aW5ncz4oKTtcclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHBhY2thZ2VLZXlzOiBBcnJheTxzdHJpbmc+ID0gaW5zdGFuY2UuY29sbGVjdFBhY2thZ2VLZXlzKCk7XHJcblxyXG4gICAgICAgICAgICBwYWNrYWdlS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHBhY2tldDogSVBhY2thZ2U9IGluc3RhbmNlLmdldFBhY2thZ2VCeUtleShrZXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFQYWNrYWdlLmlzSW52YWxpZChwYWNrZXQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXR0aW5nOiBJU2V0dGluZ3MgPSBpbnN0YW5jZS5jb252ZXJ0RnJvbShwYWNrZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldHRpbmdzTWFwLnNldChrZXksIFNldHRpbmdzLmNyZWF0ZShzZXR0aW5nKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2V0dGluZ3NNYXAgPSBpbnN0YW5jZS5zZXR0aW5nc01hcDtcclxuICAgICAgICB9Y2F0Y2goZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUGFja2FnZUNvbnZlcnNpb24gZmFpbGVkOiBcIiArIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIucmVzZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2V0dGluZ3NNYXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc3VpdGFibGUgaW5zdGFuY2Ugb2YgYSBjb252ZXJ0ZXIgc3BlY2lmaWVkIGJ5IHRoZSBwcm92aWRlZCBzZXR0aW5ncyB0eXBlLlxyXG4gICAgICogSWYgbm8gc3VpdGFibGUgY29udmVydGVyIGlzIGZvdW5kLCB1bmRlZmluZWQgd2lsbCBiZSByZXR1cm5lZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEByZXR1cm5zIHsoSVBhY2thZ2VDb252ZXJ0ZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBpY2tDb252ZXJ0ZXJCeVNldHRpbmdUeXBlKHR5cGU6IHN0cmluZyk6IElQYWNrYWdlQ29udmVydGVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0ZXJQb29sLmZpbmQoKGNvbnZlcnRlcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gY29udmVydGVyLmdldFNldHRpbmdzVHlwZSgpID09PSB0eXBlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBzdWl0YWJsZSBpbnN0YW5jZSBvZiBhIGNvbnZlcnRlciBzcGVjaWZpZWQgYnkgdGhlIHByb3ZpZGVkIHBhY2thZ2UgdHlwZS5cclxuICAgICAqIElmIG5vIHN1aXRhYmxlIGNvbnZlcnRlciBpcyBmb3VuZCwgdW5kZWZpbmVkIHdpbGwgYmUgcmV0dXJuZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAgICAgKiBAcmV0dXJucyB7SVBhY2thZ2VDb252ZXJ0ZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGlja0NvbnZlcnRlckJ5UGFja2FnZVR5cGUodHlwZTogc3RyaW5nKTogSVBhY2thZ2VDb252ZXJ0ZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRlclBvb2wuZmluZCgoY29udmVydGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb252ZXJ0ZXIuZ2V0T2JqZWN0VHlwZSgpID09PSB0eXBlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlYXJjaGVzIHRoZSBpbnRlcm5hbCBwYWNrYWdlIGFycmF5IGZvciBrZXlzIG9mIHBhY2thZ2VzIGFuZCByZXR1cm5zIHRoZSBmb3VuZCBrZXlzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb2xsZWN0UGFja2FnZUtleXMoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBhY2thZ2VLZXlzOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5wYWNrYWdlQXJyYXkuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZihlbGVtLm1ldGFbQWRkaXRpb25hbE1ldGFLZXlzLktFWV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcGFja2FnZUtleXMucHVzaChlbGVtLm1ldGFbQWRkaXRpb25hbE1ldGFLZXlzLktFWV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwYWNrYWdlS2V5cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBwYWNrYWdlIHNwZWNpZmllZCBieSB0aGUgcHJvdmlkZWQgaWQgZnJvbSB0aGUgaW50ZXJuYWwgcGFja2FnZSBhcnJheS5cclxuICAgICAqIElmIG5vIHBhY2thZ2Ugd2l0aCB0aGlzIGlkIGNhbiBiZSBmb3VuZCwgYW4gaW52YWxpZCBwYWNrYWdlIHdpbGwgYmUgcmV0dXJuZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7KElQYWNrYWdlIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBhY2thZ2VCeUlkKGlkOiBudW1iZXIpOiBJUGFja2FnZSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBhY2tldDogSVBhY2thZ2UgPSBQYWNrYWdlLmNyZWF0ZUludmFsaWQoKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbmRpbmcgPSB0aGlzLnBhY2thZ2VBcnJheS5maW5kKChwYWNrZXQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhY2tldC5tZXRhW0FkZGl0aW9uYWxNZXRhS2V5cy5JRF0gPT09IGlkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZihmaW5kaW5nICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcGFja2V0ID0gZmluZGluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYWNrZXQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHBhY2thZ2Ugc3BlY2lmaWVkIGJ5IHRoZSBwcm92aWRlZCBrZXkgZnJvbSB0aGUgaW50ZXJuYWwgcGFja2FnZUFycmF5LlxyXG4gICAgICogSWYgbm8gcGFja2FnZSB3aXRoIHRoaXMga2V5IGNhbiBiZSBmb3VuZCwgYW4gaW52YWxpZCBwYWNrYWdlIHdpbGwgYmUgcmV0dXJuZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gICAgICogQHJldHVybnMgeyhJUGFja2FnZSB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQYWNrYWdlQnlLZXkoa2V5OiBzdHJpbmcpOiBJUGFja2FnZSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBhY2tldDogSVBhY2thZ2UgPSBQYWNrYWdlLmNyZWF0ZUludmFsaWQoKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbmRpbmcgPSB0aGlzLnBhY2thZ2VBcnJheS5maW5kKChwYWNrZXQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhY2tldC5tZXRhLmtleSA9PT0ga2V5O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZihmaW5kaW5nICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcGFja2V0ID0gZmluZGluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYWNrZXQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHNpbmdsZSBwYWNrYWdlIHRvIHRoZSBpbnRlcm5hbCBwYWNrYWdlIHN0b3JhZ2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJUGFja2FnZX0gcGFja2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRQYWNrYWdlKHBhY2tldDogSVBhY2thZ2UpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYoIVBhY2thZ2UuaXNJbnZhbGlkKHBhY2tldCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWNrYWdlQXJyYXkucHVzaChwYWNrZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGNvbnZlcnNpb24gZnJvbSBJU2V0dGluZ3MgdG8gSVBhY2thZ2UgZm9ybWF0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2V0dGluZ3N9IHNldHRpbmdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XVxyXG4gICAgICogQHJldHVybnMge0lQYWNrYWdlfVxyXG4gICAgICogQG1lbWJlcm9mIFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydFRvKHNldHRpbmc6IFNldHRpbmdzLCBrZXk/OiBzdHJpbmcpOiBJUGFja2FnZSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbnZlcnRlcjogSVBhY2thZ2VDb252ZXJ0ZXIgfCB1bmRlZmluZWQgPSB0aGlzLnBpY2tDb252ZXJ0ZXJCeVNldHRpbmdUeXBlKHNldHRpbmcudHlwZSk7XHJcblxyXG4gICAgICAgIGlmKGNvbnZlcnRlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWNrZXQ6IElQYWNrYWdlID0gY29udmVydGVyLmNvbnZlcnRUbyhzZXR0aW5nLCBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIuZ2V0SWQoKSwga2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHBhY2tldDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb252ZXJ0ZXIgZm9yIHRoaXMgdHlwZSBvZiBzZXR0aW5nIGZvdW5kXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBjb252ZXJzaW9uIGZyb20gSVBhY2thZ2UgdG8gSVNldHRpbmdzIGZvcm1hdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQYWNrYWdlfSBwYWNrZXRcclxuICAgICAqIEByZXR1cm5zIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb252ZXJ0RnJvbShwYWNrZXQ6IElQYWNrYWdlKTogSVNldHRpbmdzIHtcclxuICAgXHJcbiAgICAgICAgbGV0IGNvbnZlcnRlcjogSVBhY2thZ2VDb252ZXJ0ZXIgfCB1bmRlZmluZWQgPSB0aGlzLnBpY2tDb252ZXJ0ZXJCeVBhY2thZ2VUeXBlKHBhY2tldC5tZXRhW0FkZGl0aW9uYWxNZXRhS2V5cy5PQkpFQ1RUWVBFXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIGNvbnZlcnRlciAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2V0dGluZzogSVNldHRpbmdzID0gY29udmVydGVyLmNvbnZlcnRGcm9tKHBhY2tldClcclxuICAgICAgICAgICAgcmV0dXJuIHNldHRpbmc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29udmVydGVyIGZvciB0aGlzIHR5cGUgb2YgcGFja2FnZSBmb3VuZFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIgfSJdfQ==