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
define(["require", "exports", "./bindingType", "./bindingDeclaration"], function (require, exports, bindingType_1, bindingDeclaration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Defines all scopes for traces
    var BindingScope = /** @class */ (function () {
        function BindingScope() {
        }
        BindingScope.TraceComponentsProvider = "app::trace components provider";
        BindingScope.TraceConfig = "app::trace configuration";
        BindingScope.TraceState = "app::trace state";
        BindingScope.TraceControl = "app::trace control";
        BindingScope.TraceDataControl = "app::trace data control";
        return BindingScope;
    }());
    exports.BindingScope = BindingScope;
    // Defines all binding declarations for traces
    var Traces;
    (function (Traces) {
        var ComponentIds = /** @class */ (function (_super) {
            __extends(ComponentIds, _super);
            function ComponentIds() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ComponentIds.scope = BindingScope.TraceComponentsProvider;
            ComponentIds.id = "component ids";
            ComponentIds.bindingType = bindingType_1.BindingType.DATA;
            ComponentIds.dataType = "";
            return ComponentIds;
        }(bindingDeclaration_1.BindingDeclaration));
        Traces.ComponentIds = ComponentIds;
        var State = /** @class */ (function (_super) {
            __extends(State, _super);
            function State() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            State.scope = BindingScope.TraceState;
            State.id = "state";
            State.bindingType = bindingType_1.BindingType.DATA;
            State.dataType = "";
            return State;
        }(bindingDeclaration_1.BindingDeclaration));
        Traces.State = State;
        var ControlInterface = /** @class */ (function (_super) {
            __extends(ControlInterface, _super);
            function ControlInterface() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ControlInterface.scope = BindingScope.TraceControl;
            ControlInterface.id = "control interface";
            ControlInterface.bindingType = bindingType_1.BindingType.INTERFACE;
            ControlInterface.dataType = "";
            return ControlInterface;
        }(bindingDeclaration_1.BindingDeclaration));
        Traces.ControlInterface = ControlInterface;
        var AvailableDataPoints = /** @class */ (function (_super) {
            __extends(AvailableDataPoints, _super);
            function AvailableDataPoints() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AvailableDataPoints.scope = BindingScope.TraceConfig; // TODO: Trace or TraceConfig ???
            AvailableDataPoints.id = "availableDataPoints";
            AvailableDataPoints.bindingType = bindingType_1.BindingType.DATA;
            AvailableDataPoints.dataType = "";
            return AvailableDataPoints;
        }(bindingDeclaration_1.BindingDeclaration));
        Traces.AvailableDataPoints = AvailableDataPoints;
        var TraceData;
        (function (TraceData) {
            var Load = /** @class */ (function (_super) {
                __extends(Load, _super);
                function Load() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Load.scope = BindingScope.TraceDataControl;
                Load.id = "load";
                Load.bindingType = bindingType_1.BindingType.COMMAND;
                Load.dataType = "";
                return Load;
            }(bindingDeclaration_1.BindingDeclaration));
            TraceData.Load = Load;
            var Loaded = /** @class */ (function (_super) {
                __extends(Loaded, _super);
                function Loaded() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Loaded.scope = BindingScope.TraceDataControl;
                Loaded.id = "loaded";
                Loaded.bindingType = bindingType_1.BindingType.COMMAND_RESPONSE;
                Loaded.dataType = "";
                return Loaded;
            }(bindingDeclaration_1.BindingDeclaration));
            TraceData.Loaded = Loaded;
            var LoadingError = /** @class */ (function (_super) {
                __extends(LoadingError, _super);
                function LoadingError() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LoadingError.scope = BindingScope.TraceDataControl;
                LoadingError.id = "loading error";
                LoadingError.bindingType = bindingType_1.BindingType.COMMAND_RESPONSE;
                LoadingError.dataType = "";
                return LoadingError;
            }(bindingDeclaration_1.BindingDeclaration));
            TraceData.LoadingError = LoadingError;
            var DataAvailable = /** @class */ (function (_super) {
                __extends(DataAvailable, _super);
                function DataAvailable() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DataAvailable.scope = BindingScope.TraceDataControl;
                DataAvailable.id = "data available";
                DataAvailable.bindingType = bindingType_1.BindingType.DATA;
                DataAvailable.dataType = "";
                return DataAvailable;
            }(bindingDeclaration_1.BindingDeclaration));
            TraceData.DataAvailable = DataAvailable;
        })(TraceData = Traces.TraceData || (Traces.TraceData = {}));
        var Configuration;
        (function (Configuration) {
            var DataPoints = /** @class */ (function (_super) {
                __extends(DataPoints, _super);
                function DataPoints() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DataPoints.scope = BindingScope.TraceConfig;
                DataPoints.id = "data points";
                DataPoints.bindingType = bindingType_1.BindingType.DATA;
                DataPoints.dataType = "";
                return DataPoints;
            }(bindingDeclaration_1.BindingDeclaration));
            Configuration.DataPoints = DataPoints;
            var TimingInfos = /** @class */ (function (_super) {
                __extends(TimingInfos, _super);
                function TimingInfos() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                TimingInfos.scope = BindingScope.TraceConfig;
                TimingInfos.id = "timing parameters";
                TimingInfos.bindingType = bindingType_1.BindingType.DATA;
                TimingInfos.dataType = "";
                return TimingInfos;
            }(bindingDeclaration_1.BindingDeclaration));
            Configuration.TimingInfos = TimingInfos;
            var StartTriggerInfos = /** @class */ (function (_super) {
                __extends(StartTriggerInfos, _super);
                function StartTriggerInfos() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                StartTriggerInfos.scope = BindingScope.TraceConfig;
                StartTriggerInfos.id = "start trigger info";
                StartTriggerInfos.bindingType = bindingType_1.BindingType.DATA;
                StartTriggerInfos.dataType = "";
                return StartTriggerInfos;
            }(bindingDeclaration_1.BindingDeclaration));
            Configuration.StartTriggerInfos = StartTriggerInfos;
        })(Configuration = Traces.Configuration || (Traces.Configuration = {}));
    })(Traces = exports.Traces || (exports.Traces = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ0RlY2xhcmF0aW9uc1RyYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9iaW5kaW5nRGVjbGFyYXRpb25zVHJhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQSxnQ0FBZ0M7SUFDaEM7UUFBQTtRQU1BLENBQUM7UUFMaUIsb0NBQXVCLEdBQUcsZ0NBQWdDLENBQUM7UUFDM0Qsd0JBQVcsR0FBRywwQkFBMEIsQ0FBQztRQUN6Qyx1QkFBVSxHQUFHLGtCQUFrQixDQUFDO1FBQ2hDLHlCQUFZLEdBQUcsb0JBQW9CLENBQUM7UUFDcEMsNkJBQWdCLEdBQUcseUJBQXlCLENBQUM7UUFDL0QsbUJBQUM7S0FBQSxBQU5ELElBTUM7SUFOWSxvQ0FBWTtJQVF6Qiw4Q0FBOEM7SUFDOUMsSUFBaUIsTUFBTSxDQWlGdEI7SUFqRkQsV0FBaUIsTUFBTTtRQUNuQjtZQUFrQyxnQ0FBa0I7WUFBcEQ7O1lBS0EsQ0FBQztZQUppQixrQkFBSyxHQUFHLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQztZQUM3QyxlQUFFLEdBQUcsZUFBZSxDQUFDO1lBQ3JCLHdCQUFXLEdBQUcseUJBQVcsQ0FBQyxJQUFJLENBQUM7WUFDL0IscUJBQVEsR0FBRyxFQUFFLENBQUM7WUFDaEMsbUJBQUM7U0FBQSxBQUxELENBQWtDLHVDQUFrQixHQUtuRDtRQUxZLG1CQUFZLGVBS3hCLENBQUE7UUFFRDtZQUEyQix5QkFBa0I7WUFBN0M7O1lBS0EsQ0FBQztZQUppQixXQUFLLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUNoQyxRQUFFLEdBQUcsT0FBTyxDQUFDO1lBQ2IsaUJBQVcsR0FBRyx5QkFBVyxDQUFDLElBQUksQ0FBQztZQUMvQixjQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2hDLFlBQUM7U0FBQSxBQUxELENBQTJCLHVDQUFr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VSxhQUt0QixDQUFBO1lBRUQ7Z0JBQWlDLCtCQUFrQjtnQkFBbkQ7O2dCQUtBLENBQUM7Z0JBSmlCLGlCQUFLLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQztnQkFDakMsY0FBRSxHQUFHLG1CQUFtQixDQUFDO2dCQUN6Qix1QkFBVyxHQUFHLHlCQUFXLENBQUMsSUFBSSxDQUFDO2dCQUMvQixvQkFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsa0JBQUM7YUFBQSxBQUxELENBQWlDLHVDQUFrQixHQUtsRDtZQUxZLHlCQUFXLGNBS3ZCLENBQUE7WUFFRDtnQkFBdUMscUNBQWtCO2dCQUF6RDs7Z0JBS0EsQ0FBQztnQkFKaUIsdUJBQUssR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDO2dCQUNqQyxvQkFBRSxHQUFHLG9CQUFvQixDQUFDO2dCQUMxQiw2QkFBVyxHQUFHLHlCQUFXLENBQUMsSUFBSSxDQUFDO2dCQUMvQiwwQkFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsd0JBQUM7YUFBQSxBQUxELENBQXVDLHVDQUFrQixHQUt4RDtZQUxZLCtCQUFpQixvQkFLN0IsQ0FBQTtRQUNMLENBQUMsRUFyQmdCLGFBQWEsR0FBYixvQkFBYSxLQUFiLG9CQUFhLFFBcUI3QjtJQUNMLENBQUMsRUFqRmdCLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQWlGdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaW5kaW5nVHlwZSB9IGZyb20gXCIuL2JpbmRpbmdUeXBlXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdEZWNsYXJhdGlvbiB9IGZyb20gXCIuL2JpbmRpbmdEZWNsYXJhdGlvblwiO1xyXG5cclxuLy8gRGVmaW5lcyBhbGwgc2NvcGVzIGZvciB0cmFjZXNcclxuZXhwb3J0IGNsYXNzIEJpbmRpbmdTY29wZXtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhY2VDb21wb25lbnRzUHJvdmlkZXIgPSBcImFwcDo6dHJhY2UgY29tcG9uZW50cyBwcm92aWRlclwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFjZUNvbmZpZyA9IFwiYXBwOjp0cmFjZSBjb25maWd1cmF0aW9uXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYWNlU3RhdGUgPSBcImFwcDo6dHJhY2Ugc3RhdGVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhY2VDb250cm9sID0gXCJhcHA6OnRyYWNlIGNvbnRyb2xcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhY2VEYXRhQ29udHJvbCA9IFwiYXBwOjp0cmFjZSBkYXRhIGNvbnRyb2xcIjtcclxufVxyXG5cclxuLy8gRGVmaW5lcyBhbGwgYmluZGluZyBkZWNsYXJhdGlvbnMgZm9yIHRyYWNlc1xyXG5leHBvcnQgbmFtZXNwYWNlIFRyYWNlc3tcclxuICAgIGV4cG9ydCBjbGFzcyBDb21wb25lbnRJZHMgZXh0ZW5kcyBCaW5kaW5nRGVjbGFyYXRpb257XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzY29wZSA9IEJpbmRpbmdTY29wZS5UcmFjZUNvbXBvbmVudHNQcm92aWRlcjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGlkID0gXCJjb21wb25lbnQgaWRzXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLkRBVEE7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBkYXRhVHlwZSA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN0YXRlIGV4dGVuZHMgQmluZGluZ0RlY2xhcmF0aW9ue1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2NvcGUgPSBCaW5kaW5nU2NvcGUuVHJhY2VTdGF0ZTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGlkID0gXCJzdGF0ZVwiO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYmluZGluZ1R5cGUgPSBCaW5kaW5nVHlwZS5EQVRBO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZGF0YVR5cGUgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDb250cm9sSW50ZXJmYWNlIGV4dGVuZHMgQmluZGluZ0RlY2xhcmF0aW9ue1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2NvcGUgPSBCaW5kaW5nU2NvcGUuVHJhY2VDb250cm9sO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaWQgPSBcImNvbnRyb2wgaW50ZXJmYWNlXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLklOVEVSRkFDRTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGRhdGFUeXBlID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQXZhaWxhYmxlRGF0YVBvaW50cyBleHRlbmRzIEJpbmRpbmdEZWNsYXJhdGlvbntcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQmluZGluZ1Njb3BlLlRyYWNlQ29uZmlnOyAvLyBUT0RPOiBUcmFjZSBvciBUcmFjZUNvbmZpZyA/Pz9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGlkID0gXCJhdmFpbGFibGVEYXRhUG9pbnRzXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLkRBVEE7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBkYXRhVHlwZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBuYW1lc3BhY2UgVHJhY2VEYXRhe1xyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBMb2FkIGV4dGVuZHMgQmluZGluZ0RlY2xhcmF0aW9ue1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQmluZGluZ1Njb3BlLlRyYWNlRGF0YUNvbnRyb2w7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgaWQgPSBcImxvYWRcIjtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLkNPTU1BTkQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgZGF0YVR5cGUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIExvYWRlZCBleHRlbmRzIEJpbmRpbmdEZWNsYXJhdGlvbntcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBzY29wZSA9IEJpbmRpbmdTY29wZS5UcmFjZURhdGFDb250cm9sO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGlkID0gXCJsb2FkZWRcIjtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLkNPTU1BTkRfUkVTUE9OU0U7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgZGF0YVR5cGUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIExvYWRpbmdFcnJvciBleHRlbmRzIEJpbmRpbmdEZWNsYXJhdGlvbntcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBzY29wZSA9IEJpbmRpbmdTY29wZS5UcmFjZURhdGFDb250cm9sO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGlkID0gXCJsb2FkaW5nIGVycm9yXCI7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgYmluZGluZ1R5cGUgPSBCaW5kaW5nVHlwZS5DT01NQU5EX1JFU1BPTlNFO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGRhdGFUeXBlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBEYXRhQXZhaWxhYmxlIGV4dGVuZHMgQmluZGluZ0RlY2xhcmF0aW9ue1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQmluZGluZ1Njb3BlLlRyYWNlRGF0YUNvbnRyb2w7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgaWQgPSBcImRhdGEgYXZhaWxhYmxlXCI7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgYmluZGluZ1R5cGUgPSBCaW5kaW5nVHlwZS5EQVRBO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGRhdGFUeXBlID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBDb25maWd1cmF0aW9ue1xyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBEYXRhUG9pbnRzIGV4dGVuZHMgQmluZGluZ0RlY2xhcmF0aW9ue1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQmluZGluZ1Njb3BlLlRyYWNlQ29uZmlnO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGlkID0gXCJkYXRhIHBvaW50c1wiO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGJpbmRpbmdUeXBlID0gQmluZGluZ1R5cGUuREFUQTtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBkYXRhVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBUaW1pbmdJbmZvcyBleHRlbmRzIEJpbmRpbmdEZWNsYXJhdGlvbntcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBzY29wZSA9IEJpbmRpbmdTY29wZS5UcmFjZUNvbmZpZztcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBpZCA9IFwidGltaW5nIHBhcmFtZXRlcnNcIjtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLkRBVEE7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgZGF0YVR5cGUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIFN0YXJ0VHJpZ2dlckluZm9zIGV4dGVuZHMgQmluZGluZ0RlY2xhcmF0aW9ue1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQmluZGluZ1Njb3BlLlRyYWNlQ29uZmlnO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGlkID0gXCJzdGFydCB0cmlnZ2VyIGluZm9cIjtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLkRBVEE7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgZGF0YVR5cGUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=