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
     * The package converter handling the xy series setting.
     *
     * @class XYSeriesPackageConverter
     * @extends {BasePackageConverter}
     */
    var XYSeriesPackageConverter = /** @class */ (function (_super) {
        __extends(XYSeriesPackageConverter, _super);
        /**
         * Creates an instance of XYSeriesPackageConverter.
         *
         * @memberof XYSeriesPackageConverter
         */
        function XYSeriesPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.XYSERIES, "XYSeries") || this;
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
         * Upgrades the xy series setting from version 1.0 to version 1.1
         *
         * @private
         * @param {ISettings} settingsData
         * @returns {ISettings}
         * @memberof XYSeriesPackageConverter
         */
        XYSeriesPackageConverter.prototype.upgradeSettingsV1 = function (settingsData) {
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
        return XYSeriesPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.XYSeriesPackageConverter = XYSeriesPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHlTZXJpZXNQYWNrYWdlQ29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3Nlcmllcy94eVNlcmllc1BhY2thZ2VDb252ZXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBOzs7OztPQUtHO0lBQ0g7UUFBdUMsNENBQW9CO1FBRXZEOzs7O1dBSUc7UUFDSDtZQUFBLFlBQ0ksa0JBQU0sMkJBQVUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLFNBY3pDO1lBWkcsS0FBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLG1DQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3RFLElBQUksMkNBQW9CLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUNyRSxDQUFDLENBQUM7WUFFSCxLQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQ2pELElBQUksbUNBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDdEUsSUFBSSwyQ0FBb0IsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLGlDQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksbUNBQWdCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ2xGLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQzs7UUFDdEUsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxvREFBaUIsR0FBekIsVUFBMEIsWUFBdUI7WUFDN0MsSUFBSSxPQUFPLEdBQUUsbUJBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFM0MsSUFBSSxnQkFBZ0IsR0FBRSxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUU3RCxrREFBa0Q7WUFDbEQsSUFBSSxFQUFFLEdBQVUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXBDLG9EQUFvRDtZQUNwRCxJQUFJLElBQUksR0FBVSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFeEMscURBQXFEO1lBQ3JELElBQUksS0FBSyxHQUFVLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUUxQywrREFBK0Q7WUFDL0QsSUFBSSxlQUFlLEdBQWEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3BFLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUU5RCxtRkFBbUY7WUFDbkYsNENBQTRDO1lBQzVDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFM0MsT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBQ0wsK0JBQUM7SUFBRCxDQUFDLEFBM0RELENBQXVDLDJDQUFvQixHQTJEMUQ7SUFFUSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlUGFja2FnZUNvbnZlcnRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYmFzZVBhY2thZ2VDb252ZXJ0ZXJcIjtcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9vYmplY3RUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBTdHJpbmdDb252ZXJzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9zdHJpbmdDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IFN1YlBhY2thZ2VDb252ZXJzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9zdWJQYWNrYWdlQ29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQXJyYXlDb252ZXJzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9hcnJheUNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcblxyXG4vKipcclxuICogVGhlIHBhY2thZ2UgY29udmVydGVyIGhhbmRsaW5nIHRoZSB4eSBzZXJpZXMgc2V0dGluZy5cclxuICpcclxuICogQGNsYXNzIFhZU2VyaWVzUGFja2FnZUNvbnZlcnRlclxyXG4gKiBAZXh0ZW5kcyB7QmFzZVBhY2thZ2VDb252ZXJ0ZXJ9XHJcbiAqL1xyXG5jbGFzcyBYWVNlcmllc1BhY2thZ2VDb252ZXJ0ZXIgZXh0ZW5kcyBCYXNlUGFja2FnZUNvbnZlcnRlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFhZU2VyaWVzUGFja2FnZUNvbnZlcnRlci5cclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzUGFja2FnZUNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKE9iamVjdFR5cGUuWFlTRVJJRVMsIFwiWFlTZXJpZXNcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb252ZXJzaW9uSW5mb0NvbnRhaW5lci5hZGRDb252ZXJzaW9uKFwiMS4wXCIsIDEsIFtcclxuICAgICAgICAgICAgbmV3IFN0cmluZ0NvbnZlcnNpb24oW1wiaWRcIiwgXCJuYW1lXCIsIFwiY29sb3JcIl0sIFtcImlkXCIsIFwibmFtZVwiLCBcImNvbG9yXCJdKSxcclxuICAgICAgICAgICAgbmV3IFN1YlBhY2thZ2VDb252ZXJzaW9uKFtcImNhbGN1bGF0aW9uRGF0YVwiXSwgW1wiY2FsY3VsYXRpb25EYXRhXCJdKVxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29udmVyc2lvbkluZm9Db250YWluZXIuYWRkQ29udmVyc2lvbihcIjEuMVwiLCAyLCBbXHJcbiAgICAgICAgICAgIG5ldyBTdHJpbmdDb252ZXJzaW9uKFtcImlkXCIsIFwibmFtZVwiLCBcImNvbG9yXCJdLCBbXCJpZFwiLCBcIm5hbWVcIiwgXCJjb2xvclwiXSksXHJcbiAgICAgICAgICAgIG5ldyBTdWJQYWNrYWdlQ29udmVyc2lvbihbXCJjYWxjdWxhdGlvbkRhdGFcIl0sIFtcImNhbGN1bGF0aW9uRGF0YVwiXSksXHJcbiAgICAgICAgICAgIG5ldyBBcnJheUNvbnZlcnNpb24oW1wiZXJyb3JJbmZvXCJdLCBbXCJlcnJvckluZm9cIl0sIG5ldyBTdHJpbmdDb252ZXJzaW9uKFtdLCBbXSkpXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3NVcGdyYWRlTWFwLnNldCgxLCB0aGlzLnVwZ3JhZGVTZXR0aW5nc1YxLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBncmFkZXMgdGhlIHh5IHNlcmllcyBzZXR0aW5nIGZyb20gdmVyc2lvbiAxLjAgdG8gdmVyc2lvbiAxLjFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdzRGF0YVxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1BhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGdyYWRlU2V0dGluZ3NWMShzZXR0aW5nc0RhdGE6IElTZXR0aW5ncyk6IElTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IHNldHRpbmc9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5nc0RhdGEpO1xyXG5cclxuICAgICAgICBsZXQgdXBncmFkZWRTZXR0aW5ncz0gbmV3IFNldHRpbmdzKHRoaXMuc2V0dGluZ3NUeXBlLCBcIjEuMVwiKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGlkIGZpZWxkIHRvIHVwZGF0ZWQgc2V0dGluZyB3aXRob3V0IGNoYW5nZXNcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZz0gc2V0dGluZy5nZXRWYWx1ZShcImlkXCIpO1xyXG4gICAgICAgIHVwZ3JhZGVkU2V0dGluZ3Muc2V0VmFsdWUoXCJpZFwiLCBpZCk7XHJcblxyXG4gICAgICAgIC8vIHNldCBuYW1lIGZpZWxkIHRvIHVwZGF0ZWQgc2V0dGluZyB3aXRob3V0IGNoYW5nZXNcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nPSBzZXR0aW5nLmdldFZhbHVlKFwibmFtZVwiKTtcclxuICAgICAgICB1cGdyYWRlZFNldHRpbmdzLnNldFZhbHVlKFwibmFtZVwiLCBuYW1lKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGNvbG9yIGZpZWxkIHRvIHVwZGF0ZWQgc2V0dGluZyB3aXRob3V0IGNoYW5nZXNcclxuICAgICAgICBsZXQgY29sb3I6IHN0cmluZz0gc2V0dGluZy5nZXRWYWx1ZShcImNvbG9yXCIpO1xyXG4gICAgICAgIHVwZ3JhZGVkU2V0dGluZ3Muc2V0VmFsdWUoXCJjb2xvclwiLCBjb2xvcik7XHJcblxyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvbkRhdGEgZmllbGQgdG8gdXBkYXRlZCBzZXR0aW5nIHdpdGhvdXQgY2hhbmdlc1xyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGE6IElTZXR0aW5ncz0gc2V0dGluZy5nZXRWYWx1ZShcImNhbGN1bGF0aW9uRGF0YVwiKTtcclxuICAgICAgICB1cGdyYWRlZFNldHRpbmdzLnNldFZhbHVlKFwiY2FsY3VsYXRpb25EYXRhXCIsIGNhbGN1bGF0aW9uRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIHNldCBlcnJvckluZm8gZmllbGQgdG8gdXBkYXRlZCBzZXR0aW5nIHdpdGggdGhlIGRlZmF1bHQgdmFsdWUgb2YgYW4gZW1wdHkgYXJyYXkgXHJcbiAgICAgICAgLy8gZmllbGQgZGlkbnQgZXhpc3Qgb24gb2xkIHNldHRpbmdzIHZlcnNpb25cclxuICAgICAgICB1cGdyYWRlZFNldHRpbmdzLnNldFZhbHVlKFwiZXJyb3JJbmZvXCIsIFtdKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdXBncmFkZWRTZXR0aW5ncztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgWFlTZXJpZXNQYWNrYWdlQ29udmVydGVyfSJdfQ==