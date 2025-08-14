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
define(["require", "exports", "../../../framework/events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventDataAvailable = /** @class */ (function (_super) {
        __extends(EventDataAvailable, _super);
        function EventDataAvailable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataAvailable;
    }(events_1.TypedEvent));
    exports.EventDataAvailable = EventDataAvailable;
    ;
    var EventDataLoadingProgress = /** @class */ (function (_super) {
        __extends(EventDataLoadingProgress, _super);
        function EventDataLoadingProgress() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataLoadingProgress;
    }(events_1.TypedEvent));
    exports.EventDataLoadingProgress = EventDataLoadingProgress;
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyRGF0YVByb3ZpZGVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2xvZ2dlcldpZGdldC9pbnRlcmZhY2VzL2xvZ2dlckRhdGFQcm92aWRlckludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBd0Msc0NBQW9DO1FBQTVFOztRQUE4RSxDQUFDO1FBQUQseUJBQUM7SUFBRCxDQUFDLEFBQS9FLENBQXdDLG1CQUFVLEdBQTZCO0lBQWxFLGdEQUFrQjtJQUFnRCxDQUFDO0lBQ2hGO1FBQThDLDRDQUF3RDtRQUF0Rzs7UUFBd0csQ0FBQztRQUFELCtCQUFDO0lBQUQsQ0FBQyxBQUF6RyxDQUE4QyxtQkFBVSxHQUFpRDtJQUE1Riw0REFBd0I7SUFBb0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyB9IGZyb20gXCIuLi9kYXRhTG9hZGluZ1Byb2dyZXNzQXJnc1wiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnREYXRhQXZhaWxhYmxlIGV4dGVuZHMgVHlwZWRFdmVudDxJTG9nZ2VyRGF0YVByb3ZpZGVyLCBhbnk+eyB9O1xyXG5leHBvcnQgY2xhc3MgRXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzIGV4dGVuZHMgVHlwZWRFdmVudDxJTG9nZ2VyRGF0YVByb3ZpZGVyLCBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncz57IH07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMb2dnZXJEYXRhUHJvdmlkZXJ7XHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlZCB3aGVuIG5ldyBkYXRhIGlzIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtFdmVudERhdGFBdmFpbGFibGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgSUxvZ2dlckRhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBldmVudERhdGFBdmFpbGFibGU6IEV2ZW50RGF0YUF2YWlsYWJsZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlZCB3aGVuIGRhdGEgbG9hZGluZyBwcm9ncmVzcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge0V2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc31cclxuICAgICAqIEBtZW1iZXJvZiBJTG9nZ2VyRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWQ6IEV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgYXZhaWxhYmxlIGNvbXBvbmVudCBtZXRob2RzIHRvIGhhbmRsZSB0aGUgdXBsb2FkIG9mIGRhdGEgZnJvbSB0YXJnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBtZW1iZXJvZiBJTG9nZ2VyRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHNldENvbXBvbmVudE1ldGhvZHMoY29tcG9uZW50TWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGxvYWRzIGxvZ2dlciBkYXRhIGZyb20gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIElMb2dnZXJEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgdXBsb2FkRGF0YUZyb21UYXJnZXQoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEltcG9ydHMgbG9nZ2VyIGRhdGEgZnJvbSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIElMb2dnZXJEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgaW1wb3J0RGF0YUZyb21GaWxlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnQgbG9nZ2VyIGRhdGEgdG8gZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmxvYn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIElMb2dnZXJEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZXhwb3J0RGF0YVRvRmlsZShkYXRhOiBCbG9iKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGlzIGFuIGV4cG9ydCBwb3NzaWJsZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIElMb2dnZXJEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgaXNFeHBvcnRQb3NzaWJsZSgpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSUxvZ2dlckRhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCk7XHJcbn0iXX0=