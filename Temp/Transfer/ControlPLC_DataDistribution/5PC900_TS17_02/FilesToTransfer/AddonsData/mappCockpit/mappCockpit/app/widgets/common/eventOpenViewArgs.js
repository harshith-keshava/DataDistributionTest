define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * EventArgs data for opening a new view
     *
     * @class EventOpenViewArgs
     */
    var EventOpenViewArgs = /** @class */ (function () {
        /**
         * Creates an instance of EventOpenViewArgs.
         * @param {*} caller
         * @param {string} componentId
         * @param {string} componentDisplayName
         * @param {ViewType} viewType
         * @memberof EventOpenViewArgs
         */
        function EventOpenViewArgs(caller, componentId, componentDisplayName, viewType) {
            this.caller = caller;
            this.componentId = componentId;
            this.componentDisplayName = componentDisplayName;
            this.viewType = viewType;
        }
        return EventOpenViewArgs;
    }());
    exports.EventOpenViewArgs = EventOpenViewArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRPcGVuVmlld0FyZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL2V2ZW50T3BlblZpZXdBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBOzs7O09BSUc7SUFDSDtRQWlDSTs7Ozs7OztXQU9HO1FBQ0gsMkJBQVksTUFBVyxFQUFFLFdBQW1CLEVBQUUsb0JBQTRCLEVBQUUsUUFBa0I7WUFDMUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1lBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUM7UUFDTCx3QkFBQztJQUFELENBQUMsQUEvQ0QsSUErQ0M7SUEvQ1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld1R5cGUgfSBmcm9tIFwiLi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcblxyXG4vKipcclxuICogRXZlbnRBcmdzIGRhdGEgZm9yIG9wZW5pbmcgYSBuZXcgdmlld1xyXG4gKlxyXG4gKiBAY2xhc3MgRXZlbnRPcGVuVmlld0FyZ3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFdmVudE9wZW5WaWV3QXJncyB7XHJcbiAgICAvKipcclxuICAgICAqIENhbGxlciB3aG8gd291bGQgbGlrZSB0byBvcGVuIGEgbmV3IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBFdmVudE9wZW5WaWV3QXJnc1xyXG4gICAgICovXHJcbiAgICBjYWxsZXI6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXBvbmVudElkIG9mIHRoZSBjb21wb25lbnQgdG8gb3BlbiBhIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEV2ZW50T3BlblZpZXdBcmdzXHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudElkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwbGF5TmFtZSBvZiB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBFdmVudE9wZW5WaWV3QXJnc1xyXG4gICAgICovXHJcbiAgICBjb21wb25lbnREaXNwbGF5TmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmlld1R5cGUgb2YgdGhlIHZpZXcgd2hpY2ggb25lIHNob3VsZCBiZSBvcGVuZWRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Vmlld1R5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgRXZlbnRPcGVuVmlld0FyZ3NcclxuICAgICAqL1xyXG4gICAgdmlld1R5cGU6IFZpZXdUeXBlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBFdmVudE9wZW5WaWV3QXJncy5cclxuICAgICAqIEBwYXJhbSB7Kn0gY2FsbGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50SWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnREaXNwbGF5TmFtZVxyXG4gICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICAqIEBtZW1iZXJvZiBFdmVudE9wZW5WaWV3QXJnc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXI6IGFueSwgY29tcG9uZW50SWQ6IHN0cmluZywgY29tcG9uZW50RGlzcGxheU5hbWU6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRJZCA9IGNvbXBvbmVudElkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RGlzcGxheU5hbWUgPSBjb21wb25lbnREaXNwbGF5TmFtZTtcclxuICAgICAgICB0aGlzLnZpZXdUeXBlID0gdmlld1R5cGU7XHJcbiAgICB9XHJcbn0iXX0=