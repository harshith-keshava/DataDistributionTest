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
define(["require", "exports", "../../../common/packageConversion/basePackageConverter", "../../../common/packageConversion/enum/objectTypeEnum", "../../../common/packageConversion/stringConversion", "../../../common/packageConversion/subPackageConversion", "../../../common/packageConversion/optionalConversion", "../../../common/persistence/settings", "../../../common/packageConversion/arrayConversion"], function (require, exports, basePackageConverter_1, objectTypeEnum_1, stringConversion_1, subPackageConversion_1, optionalConversion_1, settings_1, arrayConversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling the yt series setting.
     *
     * @class YTSeriesPackageConverter
     * @extends {BasePackageConverter}
     */
    var YTSeriesPackageConverter = /** @class */ (function (_super) {
        __extends(YTSeriesPackageConverter, _super);
        /**
         * Creates an instance of YTSeriesPackageConverter.
         *
         * @memberof YTSeriesPackageConverter
         */
        function YTSeriesPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.YTSERIES, "YTSeries") || this;
            _this.conversionInfoContainer.addConversion("1.0", 1, [
                new stringConversion_1.StringConversion(["id", "name", "color"], ["id", "name", "color"]),
                new optionalConversion_1.OptionalConversion(["calculationData"], ["calculationData"], new subPackageConversion_1.SubPackageConversion([], [])),
                new optionalConversion_1.OptionalConversion(["signalData"], ["signalData"], new subPackageConversion_1.SubPackageConversion([], []))
            ]);
            _this.conversionInfoContainer.addConversion("1.1", 2, [
                new stringConversion_1.StringConversion(["id", "name", "color"], ["id", "name", "color"]),
                new optionalConversion_1.OptionalConversion(["calculationData"], ["calculationData"], new subPackageConversion_1.SubPackageConversion([], [])),
                new optionalConversion_1.OptionalConversion(["signalData"], ["signalData"], new subPackageConversion_1.SubPackageConversion([], [])),
                new arrayConversion_1.ArrayConversion(["errorInfo"], ["errorInfo"], new stringConversion_1.StringConversion([], []))
            ]);
            _this.settingsUpgradeMap.set(1, _this.upgradeSettingsV1.bind(_this));
            return _this;
        }
        /**
         * Upgrades the yt series setting from version 1.0 to version 1.1
         *
         * @private
         * @param {ISettings} settingsData
         * @returns {ISettings}
         * @memberof YTSeriesPackageConverter
         */
        YTSeriesPackageConverter.prototype.upgradeSettingsV1 = function (settingsData) {
            var setting = settings_1.Settings.create(settingsData);
            var upgradedSettings = new settings_1.Settings(this.settingsType, "1.1");
            // set id field to updated setting without changes
            var id = setting.getValue("id");
            upgradedSettings.setValue("id", id);
            // set name field to updated setting without changes
            var name = setting.getValue("name");
            upgradedSettings.setValue("name", name);
            // set color field to updated setting without changes
            var color = setting.getValue("color");
            upgradedSettings.setValue("color", color);
            // set calculationData field to updated setting without changes
            var calculationData = setting.getValue("calculationData");
            upgradedSettings.setValue("calculationData", calculationData);
            // set signalData field to updated setting without changes
            var signalData = setting.getValue("signalData");
            upgradedSettings.setValue("signalData", signalData);
            // set errorInfo field to updated setting with the default value of an empty array 
            // field didnt exist on old settings version
            upgradedSettings.setValue("errorInfo", []);
            return upgradedSettings;
        };
        return YTSeriesPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.YTSeriesPackageConverter = YTSeriesPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXRTZXJpZXNQYWNrYWdlQ29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3Nlcmllcy95dFNlcmllc1BhY2thZ2VDb252ZXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBOzs7OztPQUtHO0lBQ0g7UUFBdUMsNENBQW9CO1FBRXZEOzs7O1dBSUc7UUFDSDtZQUFBLFlBQ0ksa0JBQU0sMkJBQVUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLFNBZ0J6QztZQWRHLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDakQsSUFBSSxtQ0FBZ0IsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLHVDQUFrQixDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSwyQ0FBb0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2xHLElBQUksdUNBQWtCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksMkNBQW9CLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQzNGLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDakQsSUFBSSxtQ0FBZ0IsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLHVDQUFrQixDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSwyQ0FBb0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2xHLElBQUksdUNBQWtCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksMkNBQW9CLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RixJQUFJLGlDQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksbUNBQWdCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ2xGLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQzs7UUFDdEUsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxvREFBaUIsR0FBekIsVUFBMEIsWUFBdUI7WUFDN0MsSUFBSSxPQUFPLEdBQUUsbUJBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFM0MsSUFBSSxnQkFBZ0IsR0FBRSxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUU3RCxrREFBa0Q7WUFDbEQsSUFBSSxFQUFFLEdBQVUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXBDLG9EQUFvRDtZQUNwRCxJQUFJLElBQUksR0FBVSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFeEMscURBQXFEO1lBQ3JELElBQUksS0FBSyxHQUFVLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUUxQywrREFBK0Q7WUFDL0QsSUFBSSxlQUFlLEdBQXlCLE9BQU8sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNoRixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFFOUQsMERBQTBEO1lBQzFELElBQUksVUFBVSxHQUF5QixPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RFLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFcEQsbUZBQW1GO1lBQ25GLDRDQUE0QztZQUM1QyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTNDLE9BQU8sZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUNMLCtCQUFDO0lBQUQsQ0FBQyxBQWpFRCxDQUF1QywyQ0FBb0IsR0FpRTFEO0lBRVEsNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVBhY2thZ2VDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2Jhc2VQYWNrYWdlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuaW1wb3J0IHsgU3RyaW5nQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vc3RyaW5nQ29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBTdWJQYWNrYWdlQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vc3ViUGFja2FnZUNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgT3B0aW9uYWxDb252ZXJzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9vcHRpb25hbENvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBBcnJheUNvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2FycmF5Q29udmVyc2lvblwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBwYWNrYWdlIGNvbnZlcnRlciBoYW5kbGluZyB0aGUgeXQgc2VyaWVzIHNldHRpbmcuXHJcbiAqXHJcbiAqIEBjbGFzcyBZVFNlcmllc1BhY2thZ2VDb252ZXJ0ZXJcclxuICogQGV4dGVuZHMge0Jhc2VQYWNrYWdlQ29udmVydGVyfVxyXG4gKi9cclxuY2xhc3MgWVRTZXJpZXNQYWNrYWdlQ29udmVydGVyIGV4dGVuZHMgQmFzZVBhY2thZ2VDb252ZXJ0ZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBZVFNlcmllc1BhY2thZ2VDb252ZXJ0ZXIuXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1BhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcihPYmplY3RUeXBlLllUU0VSSUVTLCBcIllUU2VyaWVzXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29udmVyc2lvbkluZm9Db250YWluZXIuYWRkQ29udmVyc2lvbihcIjEuMFwiLCAxLCBbXHJcbiAgICAgICAgICAgIG5ldyBTdHJpbmdDb252ZXJzaW9uKFtcImlkXCIsIFwibmFtZVwiLCBcImNvbG9yXCJdLCBbXCJpZFwiLCBcIm5hbWVcIiwgXCJjb2xvclwiXSksXHJcbiAgICAgICAgICAgIG5ldyBPcHRpb25hbENvbnZlcnNpb24oW1wiY2FsY3VsYXRpb25EYXRhXCJdLCBbXCJjYWxjdWxhdGlvbkRhdGFcIl0sIG5ldyBTdWJQYWNrYWdlQ29udmVyc2lvbihbXSwgW10pKSxcclxuICAgICAgICAgICAgbmV3IE9wdGlvbmFsQ29udmVyc2lvbihbXCJzaWduYWxEYXRhXCJdLCBbXCJzaWduYWxEYXRhXCJdLCBuZXcgU3ViUGFja2FnZUNvbnZlcnNpb24oW10sIFtdKSlcclxuICAgICAgICBdKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbnZlcnNpb25JbmZvQ29udGFpbmVyLmFkZENvbnZlcnNpb24oXCIxLjFcIiwgMiwgW1xyXG4gICAgICAgICAgICBuZXcgU3RyaW5nQ29udmVyc2lvbihbXCJpZFwiLCBcIm5hbWVcIiwgXCJjb2xvclwiXSwgW1wiaWRcIiwgXCJuYW1lXCIsIFwiY29sb3JcIl0pLFxyXG4gICAgICAgICAgICBuZXcgT3B0aW9uYWxDb252ZXJzaW9uKFtcImNhbGN1bGF0aW9uRGF0YVwiXSwgW1wiY2FsY3VsYXRpb25EYXRhXCJdLCBuZXcgU3ViUGFja2FnZUNvbnZlcnNpb24oW10sIFtdKSksXHJcbiAgICAgICAgICAgIG5ldyBPcHRpb25hbENvbnZlcnNpb24oW1wic2lnbmFsRGF0YVwiXSwgW1wic2lnbmFsRGF0YVwiXSwgbmV3IFN1YlBhY2thZ2VDb252ZXJzaW9uKFtdLCBbXSkpLFxyXG4gICAgICAgICAgICBuZXcgQXJyYXlDb252ZXJzaW9uKFtcImVycm9ySW5mb1wiXSwgW1wiZXJyb3JJbmZvXCJdLCBuZXcgU3RyaW5nQ29udmVyc2lvbihbXSwgW10pKVxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICB0aGlzLnNldHRpbmdzVXBncmFkZU1hcC5zZXQoMSwgdGhpcy51cGdyYWRlU2V0dGluZ3NWMS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZ3JhZGVzIHRoZSB5dCBzZXJpZXMgc2V0dGluZyBmcm9tIHZlcnNpb24gMS4wIHRvIHZlcnNpb24gMS4xXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nc0RhdGFcclxuICAgICAqIEByZXR1cm5zIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNQYWNrYWdlQ29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBncmFkZVNldHRpbmdzVjEoc2V0dGluZ3NEYXRhOiBJU2V0dGluZ3MpOiBJU2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzZXR0aW5nPSBTZXR0aW5ncy5jcmVhdGUoc2V0dGluZ3NEYXRhKTtcclxuXHJcbiAgICAgICAgbGV0IHVwZ3JhZGVkU2V0dGluZ3M9IG5ldyBTZXR0aW5ncyh0aGlzLnNldHRpbmdzVHlwZSwgXCIxLjFcIik7XHJcblxyXG4gICAgICAgIC8vIHNldCBpZCBmaWVsZCB0byB1cGRhdGVkIHNldHRpbmcgd2l0aG91dCBjaGFuZ2VzXHJcbiAgICAgICAgbGV0IGlkOiBzdHJpbmc9IHNldHRpbmcuZ2V0VmFsdWUoXCJpZFwiKTtcclxuICAgICAgICB1cGdyYWRlZFNldHRpbmdzLnNldFZhbHVlKFwiaWRcIiwgaWQpO1xyXG5cclxuICAgICAgICAvLyBzZXQgbmFtZSBmaWVsZCB0byB1cGRhdGVkIHNldHRpbmcgd2l0aG91dCBjaGFuZ2VzXHJcbiAgICAgICAgbGV0IG5hbWU6IHN0cmluZz0gc2V0dGluZy5nZXRWYWx1ZShcIm5hbWVcIik7XHJcbiAgICAgICAgdXBncmFkZWRTZXR0aW5ncy5zZXRWYWx1ZShcIm5hbWVcIiwgbmFtZSk7XHJcblxyXG4gICAgICAgIC8vIHNldCBjb2xvciBmaWVsZCB0byB1cGRhdGVkIHNldHRpbmcgd2l0aG91dCBjaGFuZ2VzXHJcbiAgICAgICAgbGV0IGNvbG9yOiBzdHJpbmc9IHNldHRpbmcuZ2V0VmFsdWUoXCJjb2xvclwiKTtcclxuICAgICAgICB1cGdyYWRlZFNldHRpbmdzLnNldFZhbHVlKFwiY29sb3JcIiwgY29sb3IpO1xyXG5cclxuICAgICAgICAvLyBzZXQgY2FsY3VsYXRpb25EYXRhIGZpZWxkIHRvIHVwZGF0ZWQgc2V0dGluZyB3aXRob3V0IGNoYW5nZXNcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhOiBJU2V0dGluZ3MgfCB1bmRlZmluZWQ9IHNldHRpbmcuZ2V0VmFsdWUoXCJjYWxjdWxhdGlvbkRhdGFcIik7XHJcbiAgICAgICAgdXBncmFkZWRTZXR0aW5ncy5zZXRWYWx1ZShcImNhbGN1bGF0aW9uRGF0YVwiLCBjYWxjdWxhdGlvbkRhdGEpO1xyXG5cclxuICAgICAgICAvLyBzZXQgc2lnbmFsRGF0YSBmaWVsZCB0byB1cGRhdGVkIHNldHRpbmcgd2l0aG91dCBjaGFuZ2VzXHJcbiAgICAgICAgbGV0IHNpZ25hbERhdGE6IElTZXR0aW5ncyB8IHVuZGVmaW5lZD0gc2V0dGluZy5nZXRWYWx1ZShcInNpZ25hbERhdGFcIik7XHJcbiAgICAgICAgdXBncmFkZWRTZXR0aW5ncy5zZXRWYWx1ZShcInNpZ25hbERhdGFcIiwgc2lnbmFsRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIHNldCBlcnJvckluZm8gZmllbGQgdG8gdXBkYXRlZCBzZXR0aW5nIHdpdGggdGhlIGRlZmF1bHQgdmFsdWUgb2YgYW4gZW1wdHkgYXJyYXkgXHJcbiAgICAgICAgLy8gZmllbGQgZGlkbnQgZXhpc3Qgb24gb2xkIHNldHRpbmdzIHZlcnNpb25cclxuICAgICAgICB1cGdyYWRlZFNldHRpbmdzLnNldFZhbHVlKFwiZXJyb3JJbmZvXCIsIFtdKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdXBncmFkZWRTZXR0aW5ncztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgWVRTZXJpZXNQYWNrYWdlQ29udmVydGVyfSJdfQ==