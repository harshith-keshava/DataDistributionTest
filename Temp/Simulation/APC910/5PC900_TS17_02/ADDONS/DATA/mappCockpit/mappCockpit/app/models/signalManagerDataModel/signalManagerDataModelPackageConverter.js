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
define(["require", "exports", "../../common/packageConversion/basePackageConverter", "../../common/packageConversion/enum/objectTypeEnum", "../../common/packageConversion/arrayConversion", "../../common/packageConversion/subPackageConversion"], function (require, exports, basePackageConverter_1, objectTypeEnum_1, arrayConversion_1, subPackageConversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling the signal manager datamodel setting
     *
     * @class SignalManagerDataModelPackageConverter
     * @extends {BasePackageConverter}
     */
    var SignalManagerDataModelPackageConverter = /** @class */ (function (_super) {
        __extends(SignalManagerDataModelPackageConverter, _super);
        /**
         * Creates an instance of SignalManagerDataModelPackageConverter.
         *
         * @memberof SignalManagerDataModelPackageConverter
         */
        function SignalManagerDataModelPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.SIGNALMANAGERDATAMODEL, "SignalManagerDataModel") || this;
            _this.conversionInfoContainer.addConversion("1.0", 1, [
                new arrayConversion_1.ArrayConversion(["categories"], ["categories"], new subPackageConversion_1.SubPackageConversion([], []))
            ]);
            return _this;
        }
        return SignalManagerDataModelPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.SignalManagerDataModelPackageConverter = SignalManagerDataModelPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckRhdGFNb2RlbFBhY2thZ2VDb252ZXJ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQ29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTs7Ozs7T0FLRztJQUNIO1FBQXFELDBEQUFvQjtRQUVyRTs7OztXQUlHO1FBQ0g7WUFBQSxZQUNJLGtCQUFNLDJCQUFVLENBQUMsc0JBQXNCLEVBQUUsd0JBQXdCLENBQUMsU0FLckU7WUFIRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQ2pELElBQUksaUNBQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSwyQ0FBb0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDeEYsQ0FBQyxDQUFDOztRQUNQLENBQUM7UUFDTCw2Q0FBQztJQUFELENBQUMsQUFkRCxDQUFxRCwyQ0FBb0IsR0FjeEU7SUFFUSx3RkFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlUGFja2FnZUNvbnZlcnRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYmFzZVBhY2thZ2VDb252ZXJ0ZXJcIjtcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9vYmplY3RUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBBcnJheUNvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2FycmF5Q29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBTdWJQYWNrYWdlQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vc3ViUGFja2FnZUNvbnZlcnNpb25cIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgcGFja2FnZSBjb252ZXJ0ZXIgaGFuZGxpbmcgdGhlIHNpZ25hbCBtYW5hZ2VyIGRhdGFtb2RlbCBzZXR0aW5nXHJcbiAqXHJcbiAqIEBjbGFzcyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUNvbnZlcnRlclxyXG4gKiBAZXh0ZW5kcyB7QmFzZVBhY2thZ2VDb252ZXJ0ZXJ9XHJcbiAqL1xyXG5jbGFzcyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUNvbnZlcnRlciBleHRlbmRzIEJhc2VQYWNrYWdlQ29udmVydGVye1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUNvbnZlcnRlci5cclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQ29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoT2JqZWN0VHlwZS5TSUdOQUxNQU5BR0VSREFUQU1PREVMLCBcIlNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb252ZXJzaW9uSW5mb0NvbnRhaW5lci5hZGRDb252ZXJzaW9uKFwiMS4wXCIsIDEsIFtcclxuICAgICAgICAgICAgbmV3IEFycmF5Q29udmVyc2lvbihbXCJjYXRlZ29yaWVzXCJdLCBbXCJjYXRlZ29yaWVzXCJdLCBuZXcgU3ViUGFja2FnZUNvbnZlcnNpb24oW10sIFtdKSlcclxuICAgICAgICBdKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFBhY2thZ2VDb252ZXJ0ZXIgfSJdfQ==