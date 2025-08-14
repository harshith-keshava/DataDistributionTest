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
define(["require", "exports", "../../common/packageConversion/basePackageConverter", "../../common/packageConversion/enum/objectTypeEnum", "../../common/packageConversion/numberConversion", "../../common/packageConversion/stringConversion", "../../common/packageConversion/arrayConversion", "../../common/packageConversion/optionalConversion"], function (require, exports, basePackageConverter_1, objectTypeEnum_1, numberConversion_1, stringConversion_1, arrayConversion_1, optionalConversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling the series group setting.
     *
     * @class SerieGroupPackageConverter
     * @extends {BasePackageConverter}
     */
    var SerieGroupPackageConverter = /** @class */ (function (_super) {
        __extends(SerieGroupPackageConverter, _super);
        /**
         * Creates an instance of SerieGroupPackageConverter.
         *
         * @memberof SerieGroupPackageConverter
         */
        function SerieGroupPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.SERIEGROUP, "SerieGroup") || this;
            _this.conversionInfoContainer.addConversion("1.0", 1, [
                new optionalConversion_1.OptionalConversion(["containerName"], ["containerName"], new stringConversion_1.StringConversion([], [])),
                new numberConversion_1.NumberConversion(["startTriggerTime"], ["startTriggerTime"]),
                new arrayConversion_1.ArrayConversion(["seriesIds"], ["seriesIds"], new stringConversion_1.StringConversion([], []))
            ]);
            return _this;
        }
        return SerieGroupPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.SerieGroupPackageConverter = SerieGroupPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVHcm91cFBhY2thZ2VDb252ZXJ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NlcmllR3JvdXBQYWNrYWdlQ29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQTs7Ozs7T0FLRztJQUNIO1FBQXlDLDhDQUFvQjtRQUV6RDs7OztXQUlHO1FBQ0g7WUFBQSxZQUNJLGtCQUFNLDJCQUFVLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxTQU83QztZQUxHLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDakQsSUFBSSx1Q0FBa0IsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSSxtQ0FBZ0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzFGLElBQUksbUNBQWdCLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxpQ0FBZSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLG1DQUFnQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNsRixDQUFDLENBQUM7O1FBQ1AsQ0FBQztRQUNMLGlDQUFDO0lBQUQsQ0FBQyxBQWhCRCxDQUF5QywyQ0FBb0IsR0FnQjVEO0lBRVEsZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVBhY2thZ2VDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2Jhc2VQYWNrYWdlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuaW1wb3J0IHsgTnVtYmVyQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbnVtYmVyQ29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBTdHJpbmdDb252ZXJzaW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9zdHJpbmdDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IEFycmF5Q29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYXJyYXlDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IE9wdGlvbmFsQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vb3B0aW9uYWxDb252ZXJzaW9uXCI7XHJcblxyXG4vKipcclxuICogVGhlIHBhY2thZ2UgY29udmVydGVyIGhhbmRsaW5nIHRoZSBzZXJpZXMgZ3JvdXAgc2V0dGluZy5cclxuICpcclxuICogQGNsYXNzIFNlcmllR3JvdXBQYWNrYWdlQ29udmVydGVyXHJcbiAqIEBleHRlbmRzIHtCYXNlUGFja2FnZUNvbnZlcnRlcn1cclxuICovXHJcbmNsYXNzIFNlcmllR3JvdXBQYWNrYWdlQ29udmVydGVyIGV4dGVuZHMgQmFzZVBhY2thZ2VDb252ZXJ0ZXJ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNlcmllR3JvdXBQYWNrYWdlQ29udmVydGVyLlxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcihPYmplY3RUeXBlLlNFUklFR1JPVVAsIFwiU2VyaWVHcm91cFwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbnZlcnNpb25JbmZvQ29udGFpbmVyLmFkZENvbnZlcnNpb24oXCIxLjBcIiwgMSwgW1xyXG4gICAgICAgICAgICBuZXcgT3B0aW9uYWxDb252ZXJzaW9uKFtcImNvbnRhaW5lck5hbWVcIl0sIFtcImNvbnRhaW5lck5hbWVcIl0sIG5ldyBTdHJpbmdDb252ZXJzaW9uKFtdLCBbXSkpLFxyXG4gICAgICAgICAgICBuZXcgTnVtYmVyQ29udmVyc2lvbihbXCJzdGFydFRyaWdnZXJUaW1lXCJdLCBbXCJzdGFydFRyaWdnZXJUaW1lXCJdKSxcclxuICAgICAgICAgICAgbmV3IEFycmF5Q29udmVyc2lvbihbXCJzZXJpZXNJZHNcIl0sIFtcInNlcmllc0lkc1wiXSwgbmV3IFN0cmluZ0NvbnZlcnNpb24oW10sIFtdKSlcclxuICAgICAgICBdKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgU2VyaWVHcm91cFBhY2thZ2VDb252ZXJ0ZXIgfSJdfQ==