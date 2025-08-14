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
define(["require", "exports", "../../framework/componentHub/bindings/bindingType", "../../framework/componentHub/bindings/bindingDeclaration", "../../widgets/common/states/cursorStates", "../common/states/chartViewToolbarStates"], function (require, exports, bindingType_1, bindingDeclaration_1, CursorStatesClass, chartViewToolbarStates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Defines binding scopes for trace view
    var BindingScope = /** @class */ (function () {
        function BindingScope() {
        }
        BindingScope.TraceViewChartStates = "app::trace view chart states";
        return BindingScope;
    }());
    exports.BindingScope = BindingScope;
    // Defines all binding declarations for trace view
    var TraceViewBinding;
    (function (TraceViewBinding) {
        var CursorStates = /** @class */ (function (_super) {
            __extends(CursorStates, _super);
            function CursorStates() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CursorStates.scope = BindingScope.TraceViewChartStates;
            CursorStates.id = "cursor states";
            CursorStates.bindingType = bindingType_1.BindingType.STATE;
            CursorStates.dataType = CursorStatesClass.CursorStates;
            CursorStates.passByValue = true;
            return CursorStates;
        }(bindingDeclaration_1.BindingDeclaration));
        TraceViewBinding.CursorStates = CursorStates;
        var ToolState = /** @class */ (function (_super) {
            __extends(ToolState, _super);
            function ToolState() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ToolState.scope = BindingScope.TraceViewChartStates;
            ToolState.id = "tool state";
            ToolState.bindingType = bindingType_1.BindingType.STATE;
            ToolState.dataType = chartViewToolbarStates_1.ChartViewToolState;
            ToolState.passByValue = true;
            return ToolState;
        }(bindingDeclaration_1.BindingDeclaration));
        TraceViewBinding.ToolState = ToolState;
        var ZoomDirectionState = /** @class */ (function (_super) {
            __extends(ZoomDirectionState, _super);
            function ZoomDirectionState() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ZoomDirectionState.scope = BindingScope.TraceViewChartStates;
            ZoomDirectionState.id = "zoom direction state";
            ZoomDirectionState.bindingType = bindingType_1.BindingType.STATE;
            ZoomDirectionState.dataType = chartViewToolbarStates_1.ChartViewZoomDirectionState;
            ZoomDirectionState.passByValue = true;
            return ZoomDirectionState;
        }(bindingDeclaration_1.BindingDeclaration));
        TraceViewBinding.ZoomDirectionState = ZoomDirectionState;
    })(TraceViewBinding = exports.TraceViewBinding || (exports.TraceViewBinding = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ0lkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZVZpZXdXaWRnZXQvYmluZGluZ0lkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0Esd0NBQXdDO0lBQ3hDO1FBQUE7UUFFQSxDQUFDO1FBRGlCLGlDQUFvQixHQUFHLDhCQUE4QixDQUFDO1FBQ3hFLG1CQUFDO0tBQUEsQUFGRCxJQUVDO0lBRlksb0NBQVk7SUFJekIsa0RBQWtEO0lBQ2xELElBQWlCLGdCQUFnQixDQXdCaEM7SUF4QkQsV0FBaUIsZ0JBQWdCO1FBQzdCO1lBQWtDLGdDQUFrQjtZQUFwRDs7WUFNQSxDQUFDO1lBTGlCLGtCQUFLLEdBQUcsWUFBWSxDQUFDLG9CQUFvQixDQUFDO1lBQzFDLGVBQUUsR0FBRyxlQUFlLENBQUM7WUFDckIsd0JBQVcsR0FBRyx5QkFBVyxDQUFDLEtBQUssQ0FBQztZQUNoQyxxQkFBUSxHQUFHLGlCQUFpQixDQUFDLFlBQVksQ0FBQztZQUMxQyx3QkFBVyxHQUFHLElBQUksQ0FBQztZQUNyQyxtQkFBQztTQUFBLEFBTkQsQ0FBa0MsdUNBQWtCLEdBTW5EO1FBTlksNkJBQVksZUFNeEIsQ0FBQTtRQUVEO1lBQStCLDZCQUFrQjtZQUFqRDs7WUFNQSxDQUFDO1lBTGlCLGVBQUssR0FBRyxZQUFZLENBQUMsb0JBQW9CLENBQUM7WUFDMUMsWUFBRSxHQUFHLFlBQVksQ0FBQztZQUNsQixxQkFBVyxHQUFHLHlCQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2hDLGtCQUFRLEdBQUcsMkNBQWtCLENBQUM7WUFDOUIscUJBQVcsR0FBRyxJQUFJLENBQUM7WUFDckMsZ0JBQUM7U0FBQSxBQU5ELENBQStCLHVDQUFrQixHQU1oRDtRQU5ZLDBCQUFTLFlBTXJCLENBQUE7UUFFRDtZQUF3QyxzQ0FBa0I7WUFBMUQ7O1lBTUEsQ0FBQztZQUxpQix3QkFBSyxHQUFHLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztZQUMxQyxxQkFBRSxHQUFHLHNCQUFzQixDQUFDO1lBQzVCLDhCQUFXLEdBQUcseUJBQVcsQ0FBQyxLQUFLLENBQUM7WUFDaEMsMkJBQVEsR0FBRyxvREFBMkIsQ0FBQztZQUN2Qyw4QkFBVyxHQUFHLElBQUksQ0FBQztZQUNyQyx5QkFBQztTQUFBLEFBTkQsQ0FBd0MsdUNBQWtCLEdBTXpEO1FBTlksbUNBQWtCLHFCQU05QixDQUFBO0lBQ0wsQ0FBQyxFQXhCZ0IsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUF3QmhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmluZGluZ1R5cGUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9iaW5kaW5nVHlwZVwiO1xyXG5pbXBvcnQgeyBCaW5kaW5nRGVjbGFyYXRpb24gfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9iaW5kaW5nRGVjbGFyYXRpb25cIjtcclxuaW1wb3J0ICogYXMgQ3Vyc29yU3RhdGVzQ2xhc3MgZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3VG9vbFN0YXRlLCBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jaGFydFZpZXdUb29sYmFyU3RhdGVzXCI7XHJcblxyXG4vLyBEZWZpbmVzIGJpbmRpbmcgc2NvcGVzIGZvciB0cmFjZSB2aWV3XHJcbmV4cG9ydCBjbGFzcyBCaW5kaW5nU2NvcGV7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYWNlVmlld0NoYXJ0U3RhdGVzID0gXCJhcHA6OnRyYWNlIHZpZXcgY2hhcnQgc3RhdGVzXCI7XHJcbn1cclxuXHJcbi8vIERlZmluZXMgYWxsIGJpbmRpbmcgZGVjbGFyYXRpb25zIGZvciB0cmFjZSB2aWV3XHJcbmV4cG9ydCBuYW1lc3BhY2UgVHJhY2VWaWV3QmluZGluZ3tcclxuICAgIGV4cG9ydCBjbGFzcyBDdXJzb3JTdGF0ZXMgZXh0ZW5kcyBCaW5kaW5nRGVjbGFyYXRpb257XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzY29wZSA9IEJpbmRpbmdTY29wZS5UcmFjZVZpZXdDaGFydFN0YXRlcztcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGlkID0gXCJjdXJzb3Igc3RhdGVzXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLlNUQVRFO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZGF0YVR5cGUgPSBDdXJzb3JTdGF0ZXNDbGFzcy5DdXJzb3JTdGF0ZXM7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBwYXNzQnlWYWx1ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRvb2xTdGF0ZSBleHRlbmRzIEJpbmRpbmdEZWNsYXJhdGlvbntcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQmluZGluZ1Njb3BlLlRyYWNlVmlld0NoYXJ0U3RhdGVzO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaWQgPSBcInRvb2wgc3RhdGVcIjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJpbmRpbmdUeXBlID0gQmluZGluZ1R5cGUuU1RBVEU7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBkYXRhVHlwZSA9IENoYXJ0Vmlld1Rvb2xTdGF0ZTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHBhc3NCeVZhbHVlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgWm9vbURpcmVjdGlvblN0YXRlIGV4dGVuZHMgQmluZGluZ0RlY2xhcmF0aW9ue1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2NvcGUgPSBCaW5kaW5nU2NvcGUuVHJhY2VWaWV3Q2hhcnRTdGF0ZXM7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpZCA9IFwiem9vbSBkaXJlY3Rpb24gc3RhdGVcIjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJpbmRpbmdUeXBlID0gQmluZGluZ1R5cGUuU1RBVEU7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBkYXRhVHlwZSA9IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHBhc3NCeVZhbHVlID0gdHJ1ZTtcclxuICAgIH1cclxufSJdfQ==