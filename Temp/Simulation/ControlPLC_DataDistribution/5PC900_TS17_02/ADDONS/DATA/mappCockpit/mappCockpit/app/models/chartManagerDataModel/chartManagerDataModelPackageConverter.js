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
define(["require", "exports", "../../common/packageConversion/basePackageConverter", "../../common/packageConversion/enum/objectTypeEnum", "../../common/packageConversion/subPackageConversion", "../../common/packageConversion/arrayConversion"], function (require, exports, basePackageConverter_1, objectTypeEnum_1, subPackageConversion_1, arrayConversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling the chart manager data model setting.
     *
     * @class ChartManagerDataModelPackageConverter
     * @extends {BasePackageConverter}
     */
    var ChartManagerDataModelPackageConverter = /** @class */ (function (_super) {
        __extends(ChartManagerDataModelPackageConverter, _super);
        /**
         * Creates an instance of ChartManagerDataModelPackageConverter.
         *
         * @memberof ChartManagerDataModelPackageConverter
         */
        function ChartManagerDataModelPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.CHARTMANAGERDATAMODEL, "ChartManagerDataModel") || this;
            _this.conversionInfoContainer.addConversion("1.0", 1, [
                new arrayConversion_1.ArrayConversion(["dataModel"], ["dataModel"], new subPackageConversion_1.SubPackageConversion([], []))
            ]);
            return _this;
        }
        return ChartManagerDataModelPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.ChartManagerDataModelPackageConverter = ChartManagerDataModelPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQ29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTs7Ozs7T0FLRztJQUNIO1FBQW9ELHlEQUFvQjtRQUVwRTs7OztXQUlHO1FBQ0g7WUFBQSxZQUNJLGtCQUFNLDJCQUFVLENBQUMscUJBQXFCLEVBQUUsdUJBQXVCLENBQUMsU0FNbkU7WUFKRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQ2pELElBQUksaUNBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSwyQ0FBb0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDdEYsQ0FBQyxDQUFDOztRQUVQLENBQUM7UUFDTCw0Q0FBQztJQUFELENBQUMsQUFmRCxDQUFvRCwyQ0FBb0IsR0FldkU7SUFFUSxzRkFBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlUGFja2FnZUNvbnZlcnRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYmFzZVBhY2thZ2VDb252ZXJ0ZXJcIjtcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9vYmplY3RUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBTdWJQYWNrYWdlQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vc3ViUGFja2FnZUNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgQXJyYXlDb252ZXJzaW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9hcnJheUNvbnZlcnNpb25cIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgcGFja2FnZSBjb252ZXJ0ZXIgaGFuZGxpbmcgdGhlIGNoYXJ0IG1hbmFnZXIgZGF0YSBtb2RlbCBzZXR0aW5nLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUNvbnZlcnRlclxyXG4gKiBAZXh0ZW5kcyB7QmFzZVBhY2thZ2VDb252ZXJ0ZXJ9XHJcbiAqL1xyXG5jbGFzcyBDaGFydE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQ29udmVydGVyIGV4dGVuZHMgQmFzZVBhY2thZ2VDb252ZXJ0ZXJ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFBhY2thZ2VDb252ZXJ0ZXIuXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQ29udmVydGVyIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKE9iamVjdFR5cGUuQ0hBUlRNQU5BR0VSREFUQU1PREVMLCBcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbnZlcnNpb25JbmZvQ29udGFpbmVyLmFkZENvbnZlcnNpb24oXCIxLjBcIiwgMSwgW1xyXG4gICAgICAgICAgICBuZXcgQXJyYXlDb252ZXJzaW9uKFtcImRhdGFNb2RlbFwiXSwgW1wiZGF0YU1vZGVsXCJdLCBuZXcgU3ViUGFja2FnZUNvbnZlcnNpb24oW10sIFtdKSlcclxuICAgICAgICBdKTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENoYXJ0TWFuYWdlckRhdGFNb2RlbFBhY2thZ2VDb252ZXJ0ZXIgfSJdfQ==