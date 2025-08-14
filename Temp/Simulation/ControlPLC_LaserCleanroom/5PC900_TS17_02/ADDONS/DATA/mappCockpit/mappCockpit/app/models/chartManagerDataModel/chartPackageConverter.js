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
define(["require", "exports", "../../common/packageConversion/basePackageConverter", "../../common/packageConversion/enum/objectTypeEnum", "../../common/packageConversion/stringConversion", "../../common/packageConversion/booleanConversion", "../../common/packageConversion/subPackageConversion", "../../common/packageConversion/arrayConversion", "../../common/packageConversion/numberStringConversion"], function (require, exports, basePackageConverter_1, objectTypeEnum_1, stringConversion_1, booleanConversion_1, subPackageConversion_1, arrayConversion_1, numberStringConversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling the chart setting.
     *
     * @class ChartPackageConverter
     * @extends {BasePackageConverter}
     */
    var ChartPackageConverter = /** @class */ (function (_super) {
        __extends(ChartPackageConverter, _super);
        /**
         * Creates an instance of ChartPackageConverter.
         *
         * @memberof ChartPackageConverter
         */
        function ChartPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.CHART, "Chart") || this;
            // the substitution map to map the chart type enum to human readable values.
            var substitutionMap = new Map();
            substitutionMap.set(0, "yt");
            substitutionMap.set(1, "xy");
            substitutionMap.set(2, "fft");
            _this.conversionInfoContainer.addConversion("1.0", 1, [
                new numberStringConversion_1.NumberStringConversion(["type"], ["type"], substitutionMap),
                new stringConversion_1.StringConversion(["name"], ["name"]),
                new booleanConversion_1.BooleanConversion(["expandState"], ["expandState"]),
                new arrayConversion_1.ArrayConversion(["scales"], ["scales"], new subPackageConversion_1.SubPackageConversion([], []))
            ]);
            return _this;
        }
        return ChartPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.ChartPackageConverter = ChartPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRQYWNrYWdlQ29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0UGFja2FnZUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7Ozs7O09BS0c7SUFDSDtRQUFvQyx5Q0FBb0I7UUFFcEQ7Ozs7V0FJRztRQUNIO1lBQUEsWUFDSSxrQkFBTSwyQkFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsU0FjbkM7WUFaRyw0RUFBNEU7WUFDNUUsSUFBSSxlQUFlLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7WUFDckQsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0IsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0IsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFOUIsS0FBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLCtDQUFzQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxlQUFlLENBQUM7Z0JBQy9ELElBQUksbUNBQWdCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLHFDQUFpQixDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxpQ0FBZSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLDJDQUFvQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNoRixDQUFDLENBQUM7O1FBQ1AsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQXZCRCxDQUFvQywyQ0FBb0IsR0F1QnZEO0lBRVEsc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVBhY2thZ2VDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2Jhc2VQYWNrYWdlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuaW1wb3J0IHsgU3RyaW5nQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vc3RyaW5nQ29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBCb29sZWFuQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYm9vbGVhbkNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgU3ViUGFja2FnZUNvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL3N1YlBhY2thZ2VDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IEFycmF5Q29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYXJyYXlDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IE51bWJlclN0cmluZ0NvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL251bWJlclN0cmluZ0NvbnZlcnNpb25cIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgcGFja2FnZSBjb252ZXJ0ZXIgaGFuZGxpbmcgdGhlIGNoYXJ0IHNldHRpbmcuXHJcbiAqXHJcbiAqIEBjbGFzcyBDaGFydFBhY2thZ2VDb252ZXJ0ZXJcclxuICogQGV4dGVuZHMge0Jhc2VQYWNrYWdlQ29udmVydGVyfVxyXG4gKi9cclxuY2xhc3MgQ2hhcnRQYWNrYWdlQ29udmVydGVyIGV4dGVuZHMgQmFzZVBhY2thZ2VDb252ZXJ0ZXJ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoYXJ0UGFja2FnZUNvbnZlcnRlci5cclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0UGFja2FnZUNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKE9iamVjdFR5cGUuQ0hBUlQsIFwiQ2hhcnRcIik7XHJcblxyXG4gICAgICAgIC8vIHRoZSBzdWJzdGl0dXRpb24gbWFwIHRvIG1hcCB0aGUgY2hhcnQgdHlwZSBlbnVtIHRvIGh1bWFuIHJlYWRhYmxlIHZhbHVlcy5cclxuICAgICAgICBsZXQgc3Vic3RpdHV0aW9uTWFwOiBNYXA8bnVtYmVyLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHN1YnN0aXR1dGlvbk1hcC5zZXQoMCwgXCJ5dFwiKTtcclxuICAgICAgICBzdWJzdGl0dXRpb25NYXAuc2V0KDEsIFwieHlcIik7XHJcbiAgICAgICAgc3Vic3RpdHV0aW9uTWFwLnNldCgyLCBcImZmdFwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbnZlcnNpb25JbmZvQ29udGFpbmVyLmFkZENvbnZlcnNpb24oXCIxLjBcIiwgMSwgW1xyXG4gICAgICAgICAgICBuZXcgTnVtYmVyU3RyaW5nQ29udmVyc2lvbihbXCJ0eXBlXCJdLCBbXCJ0eXBlXCJdLCBzdWJzdGl0dXRpb25NYXApLFxyXG4gICAgICAgICAgICBuZXcgU3RyaW5nQ29udmVyc2lvbihbXCJuYW1lXCJdLCBbXCJuYW1lXCJdKSxcclxuICAgICAgICAgICAgbmV3IEJvb2xlYW5Db252ZXJzaW9uKFtcImV4cGFuZFN0YXRlXCJdLCBbXCJleHBhbmRTdGF0ZVwiXSksXHJcbiAgICAgICAgICAgIG5ldyBBcnJheUNvbnZlcnNpb24oW1wic2NhbGVzXCJdLCBbXCJzY2FsZXNcIl0sIG5ldyBTdWJQYWNrYWdlQ29udmVyc2lvbihbXSwgW10pKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydFBhY2thZ2VDb252ZXJ0ZXIgfSJdfQ==