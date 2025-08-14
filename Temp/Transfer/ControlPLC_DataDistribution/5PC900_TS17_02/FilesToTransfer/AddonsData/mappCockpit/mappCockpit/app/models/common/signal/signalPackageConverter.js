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
define(["require", "exports", "../../../common/packageConversion/basePackageConverter", "../../../common/packageConversion/enum/objectTypeEnum", "../../../common/packageConversion/stringConversion", "../../../common/packageConversion/arrayConversion", "../../../common/packageConversion/numberConversion", "../../../common/persistence/settings"], function (require, exports, basePackageConverter_1, objectTypeEnum_1, stringConversion_1, arrayConversion_1, numberConversion_1, settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling the signal setting.
     *
     * @class SignalPackageConverter
     * @extends {BasePackageConverter}
     */
    var SignalPackageConverter = /** @class */ (function (_super) {
        __extends(SignalPackageConverter, _super);
        /**
         * Creates an instance of SignalPackageConverter.
         *
         * @memberof SignalPackageConverter
         */
        function SignalPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.SIGNAL, "Signal") || this;
            _this.conversionInfoContainer.addConversion("2.0", 1, [
                new stringConversion_1.StringConversion(["name"], ["name"]),
                new arrayConversion_1.ArrayConversion(["rawPointsX", "rawPointsY"], ["xValues", "yValues"], new numberConversion_1.NumberConversion([], []))
            ]);
            _this.settingsUpgradeMap.set(1, _this.upgradeSettingsV1.bind(_this));
            return _this;
        }
        /**
         * Upgrades the signal setting from version 1.0 to version 2.0
         *
         * @private
         * @param {ISettings} settingsData
         * @returns {ISettings}
         * @memberof SignalPackageConverter
         */
        SignalPackageConverter.prototype.upgradeSettingsV1 = function (settingsData) {
            var setting = settings_1.Settings.create(settingsData);
            var upgradedSettings = new settings_1.Settings(this.settingsType, "2.0");
            // set name field to updated setting without changes
            var name = setting.getValue("name");
            upgradedSettings.setValue("name", name);
            // set rawPointsX and rawPointsX field to updated setting with data extracted from obsolet points field of previous version.
            // fields didnt exist on old settings version
            var points = setting.getValue("points");
            var pointsX = points.map(function (s) { return Number(s.split(";")[0]); });
            var pointsY = points.map(function (s) { return Number(s.split(";")[1]); });
            upgradedSettings.setValue("rawPointsX", pointsX);
            upgradedSettings.setValue("rawPointsY", pointsY);
            return upgradedSettings;
        };
        return SignalPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.SignalPackageConverter = SignalPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsUGFja2FnZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zaWduYWwvc2lnbmFsUGFja2FnZUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7Ozs7O09BS0c7SUFDSDtRQUFxQywwQ0FBb0I7UUFFckQ7Ozs7V0FJRztRQUNIO1lBQUEsWUFDSSxrQkFBTSwyQkFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsU0FRckM7WUFORyxLQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQ2pELElBQUksbUNBQWdCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLGlDQUFlLENBQUMsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsSUFBSSxtQ0FBZ0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDMUcsQ0FBQyxDQUFDO1lBRUgsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDOztRQUN0RSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLGtEQUFpQixHQUF6QixVQUEwQixZQUF1QjtZQUM3QyxJQUFJLE9BQU8sR0FBRSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUzQyxJQUFJLGdCQUFnQixHQUFFLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTdELG9EQUFvRDtZQUNwRCxJQUFJLElBQUksR0FBVSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFHeEMsNEhBQTRIO1lBQzVILDZDQUE2QztZQUM3QyxJQUFJLE1BQU0sR0FBaUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV0RCxJQUFJLE9BQU8sR0FBaUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBTSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUNqRixJQUFJLE9BQU8sR0FBaUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBTSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUNqRixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFakQsT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBL0NELENBQXFDLDJDQUFvQixHQStDeEQ7SUFFUSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlUGFja2FnZUNvbnZlcnRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYmFzZVBhY2thZ2VDb252ZXJ0ZXJcIjtcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9vYmplY3RUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBTdHJpbmdDb252ZXJzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9zdHJpbmdDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IEFycmF5Q29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYXJyYXlDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IE51bWJlckNvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL251bWJlckNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBwYWNrYWdlIGNvbnZlcnRlciBoYW5kbGluZyB0aGUgc2lnbmFsIHNldHRpbmcuXHJcbiAqXHJcbiAqIEBjbGFzcyBTaWduYWxQYWNrYWdlQ29udmVydGVyXHJcbiAqIEBleHRlbmRzIHtCYXNlUGFja2FnZUNvbnZlcnRlcn1cclxuICovXHJcbmNsYXNzIFNpZ25hbFBhY2thZ2VDb252ZXJ0ZXIgZXh0ZW5kcyBCYXNlUGFja2FnZUNvbnZlcnRlcntcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsUGFja2FnZUNvbnZlcnRlci5cclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcihPYmplY3RUeXBlLlNJR05BTCwgXCJTaWduYWxcIik7XHJcblxyXG4gICAgICAgIHRoaXMuY29udmVyc2lvbkluZm9Db250YWluZXIuYWRkQ29udmVyc2lvbihcIjIuMFwiLCAxLCBbXHJcbiAgICAgICAgICAgIG5ldyBTdHJpbmdDb252ZXJzaW9uKFtcIm5hbWVcIl0sIFtcIm5hbWVcIl0pLFxyXG4gICAgICAgICAgICBuZXcgQXJyYXlDb252ZXJzaW9uKFtcInJhd1BvaW50c1hcIiwgXCJyYXdQb2ludHNZXCJdLCBbXCJ4VmFsdWVzXCIsIFwieVZhbHVlc1wiXSwgbmV3IE51bWJlckNvbnZlcnNpb24oW10sIFtdKSlcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc1VwZ3JhZGVNYXAuc2V0KDEsIHRoaXMudXBncmFkZVNldHRpbmdzVjEuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGdyYWRlcyB0aGUgc2lnbmFsIHNldHRpbmcgZnJvbSB2ZXJzaW9uIDEuMCB0byB2ZXJzaW9uIDIuMFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ3NEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7SVNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGdyYWRlU2V0dGluZ3NWMShzZXR0aW5nc0RhdGE6IElTZXR0aW5ncyk6IElTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IHNldHRpbmc9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5nc0RhdGEpO1xyXG5cclxuICAgICAgICBsZXQgdXBncmFkZWRTZXR0aW5ncz0gbmV3IFNldHRpbmdzKHRoaXMuc2V0dGluZ3NUeXBlLCBcIjIuMFwiKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IG5hbWUgZmllbGQgdG8gdXBkYXRlZCBzZXR0aW5nIHdpdGhvdXQgY2hhbmdlc1xyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmc9IHNldHRpbmcuZ2V0VmFsdWUoXCJuYW1lXCIpO1xyXG4gICAgICAgIHVwZ3JhZGVkU2V0dGluZ3Muc2V0VmFsdWUoXCJuYW1lXCIsIG5hbWUpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gc2V0IHJhd1BvaW50c1ggYW5kIHJhd1BvaW50c1ggZmllbGQgdG8gdXBkYXRlZCBzZXR0aW5nIHdpdGggZGF0YSBleHRyYWN0ZWQgZnJvbSBvYnNvbGV0IHBvaW50cyBmaWVsZCBvZiBwcmV2aW91cyB2ZXJzaW9uLlxyXG4gICAgICAgIC8vIGZpZWxkcyBkaWRudCBleGlzdCBvbiBvbGQgc2V0dGluZ3MgdmVyc2lvblxyXG4gICAgICAgIGxldCBwb2ludHM6IEFycmF5PHN0cmluZz49IHNldHRpbmcuZ2V0VmFsdWUoXCJwb2ludHNcIik7XHJcblxyXG4gICAgICAgIGxldCBwb2ludHNYOiBBcnJheTxudW1iZXI+PSBwb2ludHMubWFwKChzKSA9PiB7cmV0dXJuIE51bWJlcihzLnNwbGl0KFwiO1wiKVswXSk7fSk7XHJcbiAgICAgICAgbGV0IHBvaW50c1k6IEFycmF5PG51bWJlcj49IHBvaW50cy5tYXAoKHMpID0+IHtyZXR1cm4gTnVtYmVyKHMuc3BsaXQoXCI7XCIpWzFdKTt9KTtcclxuICAgICAgICB1cGdyYWRlZFNldHRpbmdzLnNldFZhbHVlKFwicmF3UG9pbnRzWFwiLCBwb2ludHNYKTtcclxuICAgICAgICB1cGdyYWRlZFNldHRpbmdzLnNldFZhbHVlKFwicmF3UG9pbnRzWVwiLCBwb2ludHNZKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdXBncmFkZWRTZXR0aW5ncztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgU2lnbmFsUGFja2FnZUNvbnZlcnRlciB9Il19