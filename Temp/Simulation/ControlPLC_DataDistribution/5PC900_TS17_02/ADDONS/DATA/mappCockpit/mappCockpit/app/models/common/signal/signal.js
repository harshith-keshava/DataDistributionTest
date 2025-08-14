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
define(["require", "exports", "../../../framework/events", "./eventSignalDataChangedArgs", "../point", "../../../common/persistence/settings", "./settingIds"], function (require, exports, events_1, eventSignalDataChangedArgs_1, point_1, settings_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventDataChanged = /** @class */ (function (_super) {
        __extends(EventDataChanged, _super);
        function EventDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataChanged;
    }(events_1.TypedEvent));
    ;
    var Signal = /** @class */ (function () {
        /**
         * Creates an instance of Signal.
         * @param {string} name
         * @param {Array<IPoint>} data
         * @memberof Signal
         */
        function Signal(name, data) {
            this.eventDataChanged = new EventDataChanged();
            this._name = name;
            this._rawPoints = [];
            // preserve original data points
            this.rawPoints = data;
            this.id = name + Signal.uniqueId;
            Signal.uniqueId++;
        }
        Object.defineProperty(Signal.prototype, "rawPointsValid", {
            get: function () {
                if (this._rawPoints.length < 2) {
                    return false;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signal.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                var oldName = this._name;
                this._name = value;
                this.onDataChanged(eventSignalDataChangedArgs_1.SignalAction.rename, oldName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signal.prototype, "rawPoints", {
            get: function () {
                return this._rawPoints;
            },
            set: function (points) {
                this._rawPoints = points;
                //rawPoints as Transferable Float64Array
                this._rawPoints_x = new Float64Array(this._rawPoints.length);
                this._rawPoints_y = new Float64Array(this._rawPoints.length);
                for (var i = 0; i < this._rawPoints.length; i++) {
                    this._rawPoints_x[i] = this._rawPoints[i].x;
                    this._rawPoints_y[i] = this._rawPoints[i].y;
                }
                // Raise rawPoints changed event
                this.onDataChanged(eventSignalDataChangedArgs_1.SignalAction.dataPointsChanged, this._rawPoints);
            },
            enumerable: true,
            configurable: true
        });
        Signal.prototype.getSettings = function () {
            var settings = new settings_1.Settings("Signal", "2.0");
            settings.setValue(settingIds_1.SettingIds.Name, this.name);
            settings.setValue(settingIds_1.SettingIds.RawPointsX, this._rawPoints_x);
            settings.setValue(settingIds_1.SettingIds.RawPointsY, this._rawPoints_y);
            return settings;
        };
        /*getSettings(): any {
            return { name: this.name, items: this._rawPoints, items_x: this._rawPoints_x, items_y: this._rawPoints_y };
        }*/
        Signal.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            this.name = settingsObj.getValue(settingIds_1.SettingIds.Name);
            var signalPoints = new Array();
            var pointsX = settingsObj.getValue(settingIds_1.SettingIds.RawPointsX);
            var pointsY = settingsObj.getValue(settingIds_1.SettingIds.RawPointsY);
            pointsX = Object.values(pointsX);
            pointsY = Object.values(pointsY);
            for (var i = 0; i < pointsX.length; i++) {
                var rawPointX = pointsX[i];
                var rawPointY = pointsY[i];
                signalPoints.push(new point_1.Point(parseFloat(rawPointX), parseFloat(rawPointY)));
            }
            // preserve original data points
            this._rawPoints = signalPoints;
            this._rawPoints_x = pointsX;
            this._rawPoints_y = pointsY;
        };
        /**
         * Clones the signal
         *
         * @returns
         * @memberof Signal
         */
        Signal.prototype.clone = function () {
            var clonedSignal = new Signal(this._name, this.rawPoints);
            return clonedSignal;
        };
        /**
         * Raises the name changed event
         *
         * @private
         * @param {string} name
         * @memberof Signal
         */
        Signal.prototype.onDataChanged = function (action, data) {
            var eventArgs = new eventSignalDataChangedArgs_1.EventSignalDataChangedArgs(action, data);
            this.eventDataChanged.raise(this, eventArgs);
        };
        Signal.uniqueId = 0; // TODO use unique id (first recent data and latest have same id) => create unique id generator
        return Signal;
    }());
    exports.Signal = Signal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3NpZ25hbC9zaWduYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQStCLG9DQUErQztRQUE5RTs7UUFBZ0YsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FBQyxBQUFqRixDQUErQixtQkFBVSxHQUF3QztJQUFBLENBQUM7SUFHbEY7UUFtREk7Ozs7O1dBS0c7UUFDSCxnQkFBWSxJQUFZLEVBQUUsSUFBbUI7WUF2RDdDLHFCQUFnQixHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7WUF3RHhELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUV0QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBcERELHNCQUFXLGtDQUFjO2lCQUF6QjtnQkFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztvQkFDMUIsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsd0JBQUk7aUJBQWY7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBZ0IsS0FBYTtnQkFDekIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMseUNBQVksQ0FB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R0FBRyxZQUFZLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7UUFFaEMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsc0JBQUssR0FBTDtZQUNJLElBQUksWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFELE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyw4QkFBYSxHQUFyQixVQUFzQixNQUFvQixFQUFFLElBQVM7WUFDakQsSUFBSSxTQUFTLEdBQUcsSUFBSSx1REFBMEIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFHakQsQ0FBQztRQXJIYyxlQUFRLEdBQVcsQ0FBQyxDQUFDLENBQUMsK0ZBQStGO1FBdUh4SSxhQUFDO0tBQUEsQUFuSUQsSUFtSUM7SUFuSVksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBTaWduYWxBY3Rpb24sIEV2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2V0dGluZ0lkc1wiO1xyXG5cclxuY2xhc3MgRXZlbnREYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SVNpZ25hbCwgRXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3M+eyB9O1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWwgaW1wbGVtZW50cyBJU2lnbmFse1xyXG4gICAgICAgIFxyXG4gICAgZXZlbnREYXRhQ2hhbmdlZDogRXZlbnREYXRhQ2hhbmdlZCA9IG5ldyBFdmVudERhdGFDaGFuZ2VkKCk7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3Jhd1BvaW50czogSVBvaW50W107XHJcblxyXG4gICAgcHJpdmF0ZSBfcmF3UG9pbnRzX3g7XHJcbiAgICBwcml2YXRlIF9yYXdQb2ludHNfeTtcclxuXHJcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1bmlxdWVJZDogbnVtYmVyID0gMDsgLy8gVE9ETyB1c2UgdW5pcXVlIGlkIChmaXJzdCByZWNlbnQgZGF0YSBhbmQgbGF0ZXN0IGhhdmUgc2FtZSBpZCkgPT4gY3JlYXRlIHVuaXF1ZSBpZCBnZW5lcmF0b3JcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJhd1BvaW50c1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmKHRoaXMuX3Jhd1BvaW50cy5sZW5ndGggPCAyKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgICAgIFxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG9sZE5hbWUgPSB0aGlzLl9uYW1lO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2lnbmFsQWN0aW9uLnJlbmFtZSwgb2xkTmFtZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgcmF3UG9pbnRzKCk6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jhd1BvaW50cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHJhd1BvaW50cyhwb2ludHM6IEFycmF5PElQb2ludD4pe1xyXG4gICAgICAgIHRoaXMuX3Jhd1BvaW50cyA9IHBvaW50cztcclxuXHJcbiAgICAgICAgLy9yYXdQb2ludHMgYXMgVHJhbnNmZXJhYmxlIEZsb2F0NjRBcnJheVxyXG4gICAgICAgIHRoaXMuX3Jhd1BvaW50c194ID0gbmV3IEZsb2F0NjRBcnJheSh0aGlzLl9yYXdQb2ludHMubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLl9yYXdQb2ludHNfeSA9IG5ldyBGbG9hdDY0QXJyYXkodGhpcy5fcmF3UG9pbnRzLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9yYXdQb2ludHMubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5fcmF3UG9pbnRzX3hbaV0gPSB0aGlzLl9yYXdQb2ludHNbaV0ueDtcclxuICAgICAgICAgICAgdGhpcy5fcmF3UG9pbnRzX3lbaV0gPSB0aGlzLl9yYXdQb2ludHNbaV0ueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUmFpc2UgcmF3UG9pbnRzIGNoYW5nZWQgZXZlbnRcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2lnbmFsQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkLCB0aGlzLl9yYXdQb2ludHMpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNpZ25hbC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBkYXRhOiBBcnJheTxJUG9pbnQ+KXtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9yYXdQb2ludHMgPSBbXTtcclxuICAgICAgICAvLyBwcmVzZXJ2ZSBvcmlnaW5hbCBkYXRhIHBvaW50c1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gZGF0YTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlkID0gbmFtZSArIFNpZ25hbC51bmlxdWVJZDtcclxuICAgICAgICBTaWduYWwudW5pcXVlSWQrKztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyhcIlNpZ25hbFwiLCBcIjIuMFwiKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLk5hbWUsIHRoaXMubmFtZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5SYXdQb2ludHNYLCB0aGlzLl9yYXdQb2ludHNfeCk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5SYXdQb2ludHNZLCB0aGlzLl9yYXdQb2ludHNfeSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKmdldFNldHRpbmdzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZTogdGhpcy5uYW1lLCBpdGVtczogdGhpcy5fcmF3UG9pbnRzLCBpdGVtc194OiB0aGlzLl9yYXdQb2ludHNfeCwgaXRlbXNfeTogdGhpcy5fcmF3UG9pbnRzX3kgfTtcclxuICAgIH0qL1xyXG5cclxuICAgIHNldFNldHRpbmdzKHNldHRpbmdzOiBJU2V0dGluZ3Mpe1xyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5OYW1lKTtcclxuICAgICAgICBsZXQgc2lnbmFsUG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBsZXQgcG9pbnRzWCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuUmF3UG9pbnRzWCk7XHJcbiAgICAgICAgbGV0IHBvaW50c1kgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlJhd1BvaW50c1kpO1xyXG5cclxuICAgICAgICBwb2ludHNYID0gT2JqZWN0LnZhbHVlcyhwb2ludHNYKTtcclxuICAgICAgICBwb2ludHNZID0gT2JqZWN0LnZhbHVlcyhwb2ludHNZKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBvaW50c1gubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgcmF3UG9pbnRYOiBzdHJpbmcgPSBwb2ludHNYW2ldO1xyXG4gICAgICAgICAgICBsZXQgcmF3UG9pbnRZOiBzdHJpbmcgPSBwb2ludHNZW2ldO1xyXG5cclxuICAgICAgICAgICAgc2lnbmFsUG9pbnRzLnB1c2gobmV3IFBvaW50KHBhcnNlRmxvYXQocmF3UG9pbnRYKSwgcGFyc2VGbG9hdChyYXdQb2ludFkpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBwcmVzZXJ2ZSBvcmlnaW5hbCBkYXRhIHBvaW50c1xyXG4gICAgICAgIHRoaXMuX3Jhd1BvaW50cyA9IHNpZ25hbFBvaW50cztcclxuICAgICAgICB0aGlzLl9yYXdQb2ludHNfeCA9IHBvaW50c1g7XHJcbiAgICAgICAgdGhpcy5fcmF3UG9pbnRzX3kgPSBwb2ludHNZO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb25lcyB0aGUgc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxcclxuICAgICAqL1xyXG4gICAgY2xvbmUoKTogU2lnbmFse1xyXG4gICAgICAgIGxldCBjbG9uZWRTaWduYWwgPSBuZXcgU2lnbmFsKHRoaXMuX25hbWUsIHRoaXMucmF3UG9pbnRzKTtcclxuICAgICAgICByZXR1cm4gY2xvbmVkU2lnbmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VzIHRoZSBuYW1lIGNoYW5nZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkRhdGFDaGFuZ2VkKGFjdGlvbjogU2lnbmFsQWN0aW9uLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgZXZlbnRBcmdzID0gbmV3IEV2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzKGFjdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFDaGFuZ2VkLnJhaXNlKHRoaXMsIGV2ZW50QXJncyk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbn0iXX0=