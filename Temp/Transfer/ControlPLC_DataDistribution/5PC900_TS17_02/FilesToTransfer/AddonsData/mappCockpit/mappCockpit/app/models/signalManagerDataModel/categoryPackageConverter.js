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
define(["require", "exports", "../../common/packageConversion/basePackageConverter", "../../common/packageConversion/enum/objectTypeEnum", "../../common/packageConversion/stringConversion", "../../common/packageConversion/arrayConversion", "../../common/packageConversion/subPackageConversion"], function (require, exports, basePackageConverter_1, objectTypeEnum_1, stringConversion_1, arrayConversion_1, subPackageConversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling the category setting.
     *
     * @class CategoryPackageConverter
     * @extends {BasePackageConverter}
     */
    var CategoryPackageConverter = /** @class */ (function (_super) {
        __extends(CategoryPackageConverter, _super);
        /**
         * Creates an instance of CategoryPackageConverter.
         *
         * @memberof CategoryPackageConverter
         */
        function CategoryPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.CATEGORY, "category") || this;
            _this.conversionInfoContainer.addConversion("1.0", 1, [
                new stringConversion_1.StringConversion(["id"], ["id"]),
                new arrayConversion_1.ArrayConversion(["serieGroups"], ["serieGroups"], new subPackageConversion_1.SubPackageConversion([], []))
            ]);
            return _this;
        }
        return CategoryPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.CategoryPackageConverter = CategoryPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnlQYWNrYWdlQ29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9jYXRlZ29yeVBhY2thZ2VDb252ZXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BOzs7OztPQUtHO0lBQ0g7UUFBdUMsNENBQW9CO1FBRXZEOzs7O1dBSUc7UUFDSDtZQUFBLFlBQ0ksa0JBQU0sMkJBQVUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLFNBTXpDO1lBSkcsS0FBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLG1DQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxpQ0FBZSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLDJDQUFvQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUMxRixDQUFDLENBQUM7O1FBQ1AsQ0FBQztRQUNMLCtCQUFDO0lBQUQsQ0FBQyxBQWZELENBQXVDLDJDQUFvQixHQWUxRDtJQUVRLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VQYWNrYWdlQ29udmVydGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9iYXNlUGFja2FnZUNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBPYmplY3RUeXBlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9lbnVtL29iamVjdFR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IFN0cmluZ0NvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL3N0cmluZ0NvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgQXJyYXlDb252ZXJzaW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9hcnJheUNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgU3ViUGFja2FnZUNvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL3N1YlBhY2thZ2VDb252ZXJzaW9uXCI7XHJcblxyXG4vKipcclxuICogVGhlIHBhY2thZ2UgY29udmVydGVyIGhhbmRsaW5nIHRoZSBjYXRlZ29yeSBzZXR0aW5nLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ2F0ZWdvcnlQYWNrYWdlQ29udmVydGVyXHJcbiAqIEBleHRlbmRzIHtCYXNlUGFja2FnZUNvbnZlcnRlcn1cclxuICovXHJcbmNsYXNzIENhdGVnb3J5UGFja2FnZUNvbnZlcnRlciBleHRlbmRzIEJhc2VQYWNrYWdlQ29udmVydGVye1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDYXRlZ29yeVBhY2thZ2VDb252ZXJ0ZXIuXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBDYXRlZ29yeVBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcihPYmplY3RUeXBlLkNBVEVHT1JZLCBcImNhdGVnb3J5XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29udmVyc2lvbkluZm9Db250YWluZXIuYWRkQ29udmVyc2lvbihcIjEuMFwiLCAxLCBbXHJcbiAgICAgICAgICAgIG5ldyBTdHJpbmdDb252ZXJzaW9uKFtcImlkXCJdLCBbXCJpZFwiXSksXHJcbiAgICAgICAgICAgIG5ldyBBcnJheUNvbnZlcnNpb24oW1wic2VyaWVHcm91cHNcIl0sIFtcInNlcmllR3JvdXBzXCJdLCBuZXcgU3ViUGFja2FnZUNvbnZlcnNpb24oW10sIFtdKSlcclxuICAgICAgICBdKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ2F0ZWdvcnlQYWNrYWdlQ29udmVydGVyIH0iXX0=