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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../../../framework/state", "../../chartViewWidget/chartViewWidget", "../../../framework/reflection/decorators/metaClassPropertyDecorator", "../../../framework/componentHub/common/commonTypes"], function (require, exports, state_1, chartViewWidget_1, Reflection, commonTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartViewToolStateEnum;
    (function (ChartViewToolStateEnum) {
        ChartViewToolStateEnum[ChartViewToolStateEnum["CURSORS"] = 0] = "CURSORS";
        ChartViewToolStateEnum[ChartViewToolStateEnum["PANNING"] = 1] = "PANNING";
        ChartViewToolStateEnum[ChartViewToolStateEnum["BOXZOOM"] = 2] = "BOXZOOM";
    })(ChartViewToolStateEnum = exports.ChartViewToolStateEnum || (exports.ChartViewToolStateEnum = {}));
    /**
     *
     * @singleton
     * @export
     * @class ChartViewToolState
     */
    var ChartViewToolState = /** @class */ (function (_super) {
        __extends(ChartViewToolState, _super);
        function ChartViewToolState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.selectedTool = ChartViewToolStateEnum.CURSORS;
            return _this;
        }
        ChartViewToolState = __decorate([
            Reflection.metaClassProperty(Reflection.MetaClassProperty.transferType, commonTypes_1.DataTransferType.byValue),
            Reflection.metaClassProperty(Reflection.MetaClassProperty.className, "ChartViewToolState")
        ], ChartViewToolState);
        return ChartViewToolState;
    }(state_1.State));
    exports.ChartViewToolState = ChartViewToolState;
    var ChartViewZoomDirectionState = /** @class */ (function (_super) {
        __extends(ChartViewZoomDirectionState, _super);
        function ChartViewZoomDirectionState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
            return _this;
        }
        ChartViewZoomDirectionState = __decorate([
            Reflection.metaClassProperty(Reflection.MetaClassProperty.transferType, commonTypes_1.DataTransferType.byValue),
            Reflection.metaClassProperty(Reflection.MetaClassProperty.className, "ChartViewZoomDirectionState")
        ], ChartViewZoomDirectionState);
        return ChartViewZoomDirectionState;
    }(state_1.State));
    exports.ChartViewZoomDirectionState = ChartViewZoomDirectionState;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3VG9vbGJhclN0YXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vc3RhdGVzL2NoYXJ0Vmlld1Rvb2xiYXJTdGF0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtBLElBQVksc0JBS1g7SUFMRCxXQUFZLHNCQUFzQjtRQUM5Qix5RUFBTyxDQUFBO1FBQ1AseUVBQU8sQ0FBQTtRQUNQLHlFQUFPLENBQUE7SUFFWCxDQUFDLEVBTFcsc0JBQXNCLEdBQXRCLDhCQUFzQixLQUF0Qiw4QkFBc0IsUUFLakM7SUFFRDs7Ozs7T0FLRztJQUdIO1FBQXdDLHNDQUFLO1FBQTdDO1lBQUEscUVBRUM7WUFERyxrQkFBWSxHQUEyQixzQkFBc0IsQ0FBQyxPQUFPLENBQUM7O1FBQzFFLENBQUM7UUFGWSxrQkFBa0I7WUFGN0IsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUMsOEJBQWdCLENBQUMsT0FBTyxDQUFDO1lBQ2hHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFDLG9CQUFvQixDQUFDO1dBQzlFLGtCQUFrQixDQUU5QjtRQUFELHlCQUFDO0tBQUEsQUFGRCxDQUF3QyxhQUFLLEdBRTVDO0lBRlksZ0RBQWtCO0lBTy9CO1FBQWlELCtDQUFLO1FBQXREO1lBQUEscUVBRUM7WUFERyxtQkFBYSxHQUFrQiwrQkFBYSxDQUFDLEVBQUUsQ0FBQzs7UUFDcEQsQ0FBQztRQUZZLDJCQUEyQjtZQUZ2QyxVQUFVLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBQyw4QkFBZ0IsQ0FBQyxPQUFPLENBQUM7WUFDaEcsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUMsNkJBQTZCLENBQUM7V0FDdEYsMkJBQTJCLENBRXZDO1FBQUQsa0NBQUM7S0FBQSxBQUZELENBQWlELGFBQUssR0FFckQ7SUFGWSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvc3RhdGVcIjtcclxuaW1wb3J0IHsgWm9vbURpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCAqIGFzIFJlZmxlY3Rpb24gIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcmVmbGVjdGlvbi9kZWNvcmF0b3JzL21ldGFDbGFzc1Byb3BlcnR5RGVjb3JhdG9yXCI7XHJcbmltcG9ydCB7IERhdGFUcmFuc2ZlclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9jb21tb24vY29tbW9uVHlwZXNcIjtcclxuXHJcbmV4cG9ydCBlbnVtIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW17XHJcbiAgICBDVVJTT1JTLFxyXG4gICAgUEFOTklORyxcclxuICAgIEJPWFpPT00sXHJcbiAgICBcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBzaW5nbGV0b25cclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ2hhcnRWaWV3VG9vbFN0YXRlXHJcbiAqL1xyXG4gQFJlZmxlY3Rpb24ubWV0YUNsYXNzUHJvcGVydHkoUmVmbGVjdGlvbi5NZXRhQ2xhc3NQcm9wZXJ0eS50cmFuc2ZlclR5cGUsRGF0YVRyYW5zZmVyVHlwZS5ieVZhbHVlKVxyXG4gQFJlZmxlY3Rpb24ubWV0YUNsYXNzUHJvcGVydHkoUmVmbGVjdGlvbi5NZXRhQ2xhc3NQcm9wZXJ0eS5jbGFzc05hbWUsXCJDaGFydFZpZXdUb29sU3RhdGVcIilcclxuZXhwb3J0IGNsYXNzIENoYXJ0Vmlld1Rvb2xTdGF0ZSBleHRlbmRzIFN0YXRle1xyXG4gICAgc2VsZWN0ZWRUb29sOiBDaGFydFZpZXdUb29sU3RhdGVFbnVtID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5DVVJTT1JTOyAgXHJcbn1cclxuXHJcblxyXG5AUmVmbGVjdGlvbi5tZXRhQ2xhc3NQcm9wZXJ0eShSZWZsZWN0aW9uLk1ldGFDbGFzc1Byb3BlcnR5LnRyYW5zZmVyVHlwZSxEYXRhVHJhbnNmZXJUeXBlLmJ5VmFsdWUpIFxyXG5AUmVmbGVjdGlvbi5tZXRhQ2xhc3NQcm9wZXJ0eShSZWZsZWN0aW9uLk1ldGFDbGFzc1Byb3BlcnR5LmNsYXNzTmFtZSxcIkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZVwiKSBcclxuZXhwb3J0IGNsYXNzIENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSBleHRlbmRzIFN0YXRle1xyXG4gICAgem9vbURpcmVjdGlvbjogWm9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWFk7XHJcbn0iXX0=