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
define(["require", "exports", "../../common/packageConversion/basePackageConverter", "../../common/packageConversion/enum/objectTypeEnum", "../../common/packageConversion/stringConversion", "../../common/packageConversion/booleanConversion", "../../common/packageConversion/numberConversion", "../../common/packageConversion/arrayConversion"], function (require, exports, basePackageConverter_1, objectTypeEnum_1, stringConversion_1, booleanConversion_1, numberConversion_1, arrayConversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling the scale setting
     *
     * @class ScalePackageConverter
     * @extends {BasePackageConverter}
     */
    var ScalePackageConverter = /** @class */ (function (_super) {
        __extends(ScalePackageConverter, _super);
        /**
         * Creates an instance of ScalePackageConverter.
         *
         * @memberof ScalePackageConverter
         */
        function ScalePackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.SCALE, "Scale") || this;
            _this.conversionInfoContainer.addConversion("1.0", 1, [
                new stringConversion_1.StringConversion(["id", "name"], ["id", "name"]),
                new booleanConversion_1.BooleanConversion(["expandState"], ["expandState"]),
                new numberConversion_1.NumberConversion(["minXValue", "maxXValue", "minYValue", "maxYValue"], ["minXValue", "maxXValue", "minYValue", "maxYValue"]),
                new arrayConversion_1.ArrayConversion(["seriesIds"], ["seriesIds"], new stringConversion_1.StringConversion([], []))
            ]);
            return _this;
        }
        return ScalePackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.ScalePackageConverter = ScalePackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGVQYWNrYWdlQ29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlUGFja2FnZUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBT0E7Ozs7O09BS0c7SUFDSDtRQUFvQyx5Q0FBb0I7UUFFcEQ7Ozs7V0FJRztRQUNIO1lBQUEsWUFDSSxrQkFBTSwyQkFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsU0FRbkM7WUFORyxLQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQ2pELElBQUksbUNBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3BELElBQUkscUNBQWlCLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLG1DQUFnQixDQUFDLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDaEksSUFBSSxpQ0FBZSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLG1DQUFnQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNsRixDQUFDLENBQUM7O1FBQ1AsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQWpCRCxDQUFvQywyQ0FBb0IsR0FpQnZEO0lBRVEsc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVBhY2thZ2VDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2Jhc2VQYWNrYWdlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuaW1wb3J0IHsgU3RyaW5nQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vc3RyaW5nQ29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBCb29sZWFuQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYm9vbGVhbkNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgTnVtYmVyQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbnVtYmVyQ29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBBcnJheUNvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2FycmF5Q29udmVyc2lvblwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBwYWNrYWdlIGNvbnZlcnRlciBoYW5kbGluZyB0aGUgc2NhbGUgc2V0dGluZ1xyXG4gKlxyXG4gKiBAY2xhc3MgU2NhbGVQYWNrYWdlQ29udmVydGVyXHJcbiAqIEBleHRlbmRzIHtCYXNlUGFja2FnZUNvbnZlcnRlcn1cclxuICovXHJcbmNsYXNzIFNjYWxlUGFja2FnZUNvbnZlcnRlciBleHRlbmRzIEJhc2VQYWNrYWdlQ29udmVydGVye1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTY2FsZVBhY2thZ2VDb252ZXJ0ZXIuXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBTY2FsZVBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcihPYmplY3RUeXBlLlNDQUxFLCBcIlNjYWxlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29udmVyc2lvbkluZm9Db250YWluZXIuYWRkQ29udmVyc2lvbihcIjEuMFwiLCAxLCBbXHJcbiAgICAgICAgICAgIG5ldyBTdHJpbmdDb252ZXJzaW9uKFtcImlkXCIsIFwibmFtZVwiXSwgW1wiaWRcIiwgXCJuYW1lXCJdKSxcclxuICAgICAgICAgICAgbmV3IEJvb2xlYW5Db252ZXJzaW9uKFtcImV4cGFuZFN0YXRlXCJdLCBbXCJleHBhbmRTdGF0ZVwiXSksXHJcbiAgICAgICAgICAgIG5ldyBOdW1iZXJDb252ZXJzaW9uKFtcIm1pblhWYWx1ZVwiLCBcIm1heFhWYWx1ZVwiLCBcIm1pbllWYWx1ZVwiLCBcIm1heFlWYWx1ZVwiXSwgW1wibWluWFZhbHVlXCIsIFwibWF4WFZhbHVlXCIsIFwibWluWVZhbHVlXCIsIFwibWF4WVZhbHVlXCJdKSxcclxuICAgICAgICAgICAgbmV3IEFycmF5Q29udmVyc2lvbihbXCJzZXJpZXNJZHNcIl0sIFtcInNlcmllc0lkc1wiXSwgbmV3IFN0cmluZ0NvbnZlcnNpb24oW10sIFtdKSlcclxuICAgICAgICBdKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgU2NhbGVQYWNrYWdlQ29udmVydGVyIH0iXX0=