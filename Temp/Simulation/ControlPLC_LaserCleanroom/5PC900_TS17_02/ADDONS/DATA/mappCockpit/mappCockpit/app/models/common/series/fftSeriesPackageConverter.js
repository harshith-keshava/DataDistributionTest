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
define(["require", "exports", "../../../common/packageConversion/basePackageConverter", "../../../common/packageConversion/enum/objectTypeEnum", "../../../common/packageConversion/stringConversion", "../../../common/packageConversion/subPackageConversion", "../../../common/packageConversion/arrayConversion", "../../../common/persistence/settings"], function (require, exports, basePackageConverter_1, objectTypeEnum_1, stringConversion_1, subPackageConversion_1, arrayConversion_1, settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling the fft series setting.
     *
     * @class FFTSeriesPackageConverter
     * @extends {BasePackageConverter}
     */
    var FFTSeriesPackageConverter = /** @class */ (function (_super) {
        __extends(FFTSeriesPackageConverter, _super);
        /**
         * Creates an instance of FFTSeriesPackageConverter.
         *
         * @memberof FFTSeriesPackageConverter
         */
        function FFTSeriesPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.FFTSERIES, "FFTSeries") || this;
            _this.conversionInfoContainer.addConversion("1.0", 1, [
                new stringConversion_1.StringConversion(["id", "name", "color"], ["id", "name", "color"]),
                new subPackageConversion_1.SubPackageConversion(["calculationData"], ["calculationData"])
            ]);
            _this.conversionInfoContainer.addConversion("1.1", 2, [
                new stringConversion_1.StringConversion(["id", "name", "color"], ["id", "name", "color"]),
                new subPackageConversion_1.SubPackageConversion(["calculationData"], ["calculationData"]),
                new arrayConversion_1.ArrayConversion(["errorInfo"], ["errorInfo"], new stringConversion_1.StringConversion([], []))
            ]);
            _this.settingsUpgradeMap.set(1, _this.upgradeSettingsV1.bind(_this));
            return _this;
        }
        /**
         * Upgrades the fft series setting from version 1.0 to version 1.1
         *
         * @private
         * @param {ISettings} settingsData
         * @returns {ISettings}
         * @memberof FFTSeriesPackageConverter
         */
        FFTSeriesPackageConverter.prototype.upgradeSettingsV1 = function (settingsData) {
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
            // set errorInfo field to updated setting with the default value of an empty array 
            // field didnt exist on old settings version
            upgradedSettings.setValue("errorInfo", []);
            return upgradedSettings;
        };
        return FFTSeriesPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.FFTSeriesPackageConverter = FFTSeriesPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0U2VyaWVzUGFja2FnZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zZXJpZXMvZmZ0U2VyaWVzUGFja2FnZUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7Ozs7O09BS0c7SUFDSDtRQUF3Qyw2Q0FBb0I7UUFFeEQ7Ozs7V0FJRztRQUNIO1lBQUEsWUFDSSxrQkFBTSwyQkFBVSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsU0FjM0M7WUFaRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQ2pELElBQUksbUNBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDdEUsSUFBSSwyQ0FBb0IsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQ3JFLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDakQsSUFBSSxtQ0FBZ0IsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLDJDQUFvQixDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2xFLElBQUksaUNBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxtQ0FBZ0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbEYsQ0FBQyxDQUFDO1lBRUgsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDOztRQUN0RSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLHFEQUFpQixHQUF6QixVQUEwQixZQUF1QjtZQUM3QyxJQUFJLE9BQU8sR0FBRSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUzQyxJQUFJLGdCQUFnQixHQUFFLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTdELGtEQUFrRDtZQUNsRCxJQUFJLEVBQUUsR0FBVSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFcEMsb0RBQW9EO1lBQ3BELElBQUksSUFBSSxHQUFVLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0MsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV4QyxxREFBcUQ7WUFDckQsSUFBSSxLQUFLLEdBQVUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTFDLCtEQUErRDtZQUMvRCxJQUFJLGVBQWUsR0FBYSxPQUFPLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDcEUsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBRTlELG1GQUFtRjtZQUNuRiw0Q0FBNEM7WUFDNUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUzQyxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFDTCxnQ0FBQztJQUFELENBQUMsQUEzREQsQ0FBd0MsMkNBQW9CLEdBMkQzRDtJQUVRLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VQYWNrYWdlQ29udmVydGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9iYXNlUGFja2FnZUNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBPYmplY3RUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9lbnVtL29iamVjdFR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IFN0cmluZ0NvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL3N0cmluZ0NvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgU3ViUGFja2FnZUNvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL3N1YlBhY2thZ2VDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IEFycmF5Q29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYXJyYXlDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgcGFja2FnZSBjb252ZXJ0ZXIgaGFuZGxpbmcgdGhlIGZmdCBzZXJpZXMgc2V0dGluZy5cclxuICpcclxuICogQGNsYXNzIEZGVFNlcmllc1BhY2thZ2VDb252ZXJ0ZXJcclxuICogQGV4dGVuZHMge0Jhc2VQYWNrYWdlQ29udmVydGVyfVxyXG4gKi9cclxuY2xhc3MgRkZUU2VyaWVzUGFja2FnZUNvbnZlcnRlciBleHRlbmRzIEJhc2VQYWNrYWdlQ29udmVydGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRkZUU2VyaWVzUGFja2FnZUNvbnZlcnRlci5cclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIEZGVFNlcmllc1BhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcihPYmplY3RUeXBlLkZGVFNFUklFUywgXCJGRlRTZXJpZXNcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb252ZXJzaW9uSW5mb0NvbnRhaW5lci5hZGRDb252ZXJzaW9uKFwiMS4wXCIsIDEsIFtcclxuICAgICAgICAgICAgbmV3IFN0cmluZ0NvbnZlcnNpb24oW1wiaWRcIiwgXCJuYW1lXCIsIFwiY29sb3JcIl0sIFtcImlkXCIsIFwibmFtZVwiLCBcImNvbG9yXCJdKSxcclxuICAgICAgICAgICAgbmV3IFN1YlBhY2thZ2VDb252ZXJzaW9uKFtcImNhbGN1bGF0aW9uRGF0YVwiXSwgW1wiY2FsY3VsYXRpb25EYXRhXCJdKVxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29udmVyc2lvbkluZm9Db250YWluZXIuYWRkQ29udmVyc2lvbihcIjEuMVwiLCAyLCBbXHJcbiAgICAgICAgICAgIG5ldyBTdHJpbmdDb252ZXJzaW9uKFtcImlkXCIsIFwibmFtZVwiLCBcImNvbG9yXCJdLCBbXCJpZFwiLCBcIm5hbWVcIiwgXCJjb2xvclwiXSksXHJcbiAgICAgICAgICAgIG5ldyBTdWJQYWNrYWdlQ29udmVyc2lvbihbXCJjYWxjdWxhdGlvbkRhdGFcIl0sIFtcImNhbGN1bGF0aW9uRGF0YVwiXSksXHJcbiAgICAgICAgICAgIG5ldyBBcnJheUNvbnZlcnNpb24oW1wiZXJyb3JJbmZvXCJdLCBbXCJlcnJvckluZm9cIl0sIG5ldyBTdHJpbmdDb252ZXJzaW9uKFtdLCBbXSkpXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3NVcGdyYWRlTWFwLnNldCgxLCB0aGlzLnVwZ3JhZGVTZXR0aW5nc1YxLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBncmFkZXMgdGhlIGZmdCBzZXJpZXMgc2V0dGluZyBmcm9tIHZlcnNpb24gMS4wIHRvIHZlcnNpb24gMS4xXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nc0RhdGFcclxuICAgICAqIEByZXR1cm5zIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzUGFja2FnZUNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZ3JhZGVTZXR0aW5nc1YxKHNldHRpbmdzRGF0YTogSVNldHRpbmdzKTogSVNldHRpbmdzIHtcclxuICAgICAgICBsZXQgc2V0dGluZz0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzRGF0YSk7XHJcblxyXG4gICAgICAgIGxldCB1cGdyYWRlZFNldHRpbmdzPSBuZXcgU2V0dGluZ3ModGhpcy5zZXR0aW5nc1R5cGUsIFwiMS4xXCIpO1xyXG5cclxuICAgICAgICAvLyBzZXQgaWQgZmllbGQgdG8gdXBkYXRlZCBzZXR0aW5nIHdpdGhvdXQgY2hhbmdlc1xyXG4gICAgICAgIGxldCBpZDogc3RyaW5nPSBzZXR0aW5nLmdldFZhbHVlKFwiaWRcIik7XHJcbiAgICAgICAgdXBncmFkZWRTZXR0aW5ncy5zZXRWYWx1ZShcImlkXCIsIGlkKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IG5hbWUgZmllbGQgdG8gdXBkYXRlZCBzZXR0aW5nIHdpdGhvdXQgY2hhbmdlc1xyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmc9IHNldHRpbmcuZ2V0VmFsdWUoXCJuYW1lXCIpO1xyXG4gICAgICAgIHVwZ3JhZGVkU2V0dGluZ3Muc2V0VmFsdWUoXCJuYW1lXCIsIG5hbWUpO1xyXG5cclxuICAgICAgICAvLyBzZXQgY29sb3IgZmllbGQgdG8gdXBkYXRlZCBzZXR0aW5nIHdpdGhvdXQgY2hhbmdlc1xyXG4gICAgICAgIGxldCBjb2xvcjogc3RyaW5nPSBzZXR0aW5nLmdldFZhbHVlKFwiY29sb3JcIik7XHJcbiAgICAgICAgdXBncmFkZWRTZXR0aW5ncy5zZXRWYWx1ZShcImNvbG9yXCIsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGNhbGN1bGF0aW9uRGF0YSBmaWVsZCB0byB1cGRhdGVkIHNldHRpbmcgd2l0aG91dCBjaGFuZ2VzXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YTogSVNldHRpbmdzPSBzZXR0aW5nLmdldFZhbHVlKFwiY2FsY3VsYXRpb25EYXRhXCIpO1xyXG4gICAgICAgIHVwZ3JhZGVkU2V0dGluZ3Muc2V0VmFsdWUoXCJjYWxjdWxhdGlvbkRhdGFcIiwgY2FsY3VsYXRpb25EYXRhKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGVycm9ySW5mbyBmaWVsZCB0byB1cGRhdGVkIHNldHRpbmcgd2l0aCB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBhbiBlbXB0eSBhcnJheSBcclxuICAgICAgICAvLyBmaWVsZCBkaWRudCBleGlzdCBvbiBvbGQgc2V0dGluZ3MgdmVyc2lvblxyXG4gICAgICAgIHVwZ3JhZGVkU2V0dGluZ3Muc2V0VmFsdWUoXCJlcnJvckluZm9cIiwgW10pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB1cGdyYWRlZFNldHRpbmdzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBGRlRTZXJpZXNQYWNrYWdlQ29udmVydGVyfSJdfQ==