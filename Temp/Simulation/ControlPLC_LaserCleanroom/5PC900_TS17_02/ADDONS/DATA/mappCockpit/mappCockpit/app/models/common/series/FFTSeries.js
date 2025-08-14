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
define(["require", "exports", "./seriesType", "../../../common/persistence/settings", "../calculatorProvider/calculationDataInfo", "./settingIds", "./baseSeries"], function (require, exports, seriesType_1, settings_1, calculationDataInfo_1, settingIds_1, baseSeries_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FFTSeries = /** @class */ (function (_super) {
        __extends(FFTSeries, _super);
        /**
         * Creates an instance of FFTSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {ISeriesProvider} seriesProvider
         * @param {string} [uniqueId=""]
         * @memberof FFTSeries
         */
        function FFTSeries(signal, name, color, seriesProvider, uniqueId, errorInfo) {
            var _this = _super.call(this, signal, name, color, seriesProvider, uniqueId, errorInfo) || this;
            _this.type = seriesType_1.SeriesType.fftSeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            return _this;
        }
        /**
         * Creates an instance of FFTSeries with the given settings
         *
         * @static
         * @param {ISettings} settings
         * @param {ISeriesProvider} seriesProvider
         * @returns {FFTSeries}
         * @memberof FFTSeries
         */
        FFTSeries.create = function (settings, seriesProvider) {
            // get info from persistingdata
            var settingsObj = settings_1.Settings.create(settings);
            var id = settingsObj.getValue(settingIds_1.SettingIds.SeriesId);
            var name = settingsObj.getValue(settingIds_1.SettingIds.SeriesName);
            var color = settingsObj.getValue(settingIds_1.SettingIds.SeriesColor);
            var signalData = settingsObj.getValue(settingIds_1.SettingIds.SeriesSignalData);
            var errorInfo = settingsObj.getValue(settingIds_1.SettingIds.SeriesErrorInfo);
            if (errorInfo == undefined) {
                errorInfo = new Array();
            }
            // create signal with the given signalData
            var signal = this.createSignal(signalData);
            // create series with the given data
            var newYTSeries = new FFTSeries(signal, name, color, seriesProvider, id, errorInfo);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(settingIds_1.SettingIds.SeriesCalculationData);
            if (calculationDataInfo != undefined) {
                newYTSeries.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo();
                newYTSeries.calculationDataInfo.setSettings(calculationDataInfo);
            }
            return newYTSeries;
        };
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof FFTSeries
         */
        FFTSeries.prototype.getMaxX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[this.rawPoints.length - 1].x;
            }
            return undefined;
        };
        /**
         * Get min X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof FFTSeries
         */
        FFTSeries.prototype.getMinX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[0].x;
            }
            return undefined;
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof FFTSeries
         */
        FFTSeries.prototype.updateTimestamps = function () {
            if (this.rawPoints.length > 0) {
                this._timestamps = this.rawPoints.map(function (rawPoint) { return rawPoint.x; });
            }
        };
        return FFTSeries;
    }(baseSeries_1.BaseSeries));
    exports.FFTSeries = FFTSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkZUU2VyaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3Nlcmllcy9GRlRTZXJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQStCLDZCQUFVO1FBSXJDOzs7Ozs7OztXQVFHO1FBQ0gsbUJBQVksTUFBZSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsY0FBK0IsRUFBRSxRQUFnQixFQUFFLFNBQXdCO1lBQXJJLFlBQ0ksa0JBQU0sTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsU0FJbEU7WUFoQlEsVUFBSSxHQUFHLHVCQUFVLENBQUMsU0FBUyxDQUFDO1lBYWpDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDdkMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOztRQUNwQixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxnQkFBTSxHQUFiLFVBQWMsUUFBbUIsRUFBRSxjQUErQjtZQUM5RCwrQkFBK0I7WUFDL0IsSUFBSSxXQUFXLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUMsSUFBSSxFQUFFLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNELElBQUksSUFBSSxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvRCxJQUFJLEtBQUssR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakUsSUFBSSxVQUFVLEdBQXdCLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hGLElBQUksU0FBUyxHQUFrQixXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDaEYsSUFBRyxTQUFTLElBQUksU0FBUyxFQUFDO2dCQUN0QixTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQzthQUNuQztZQUVELDBDQUEwQztZQUMxQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTNDLG9DQUFvQztZQUNwQyxJQUFJLFdBQVcsR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRXBGLDRDQUE0QztZQUM1QyxJQUFJLG1CQUFtQixHQUF3QixXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN0RyxJQUFHLG1CQUFtQixJQUFJLFNBQVMsRUFBQztnQkFDaEMsV0FBVyxDQUFDLG1CQUFtQixHQUFHLElBQUkseUNBQW1CLEVBQUUsQ0FBQztnQkFDNUQsV0FBVyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ3BFO1lBRUQsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLDJCQUFPLEdBQWpCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDckQ7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ08sMkJBQU8sR0FBakI7WUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtZQUNELE9BQU8sU0FBUyxDQUFBO1FBQ3BCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNPLG9DQUFnQixHQUExQjtZQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBUSxJQUFPLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9FO1FBQ0wsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FBQyxBQWhHRCxDQUErQix1QkFBVSxHQWdHeEM7SUFoR1ksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YUluZm9cIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuL2Jhc2VTZXJpZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGRlRTZXJpZXMgZXh0ZW5kcyBCYXNlU2VyaWVze1xyXG4gICAgXHJcbiAgICByZWFkb25seSB0eXBlID0gU2VyaWVzVHlwZS5mZnRTZXJpZXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEZGVFNlcmllc1xyXG4gICAgICogQHBhcmFtIHtJU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt1bmlxdWVJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIEZGVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzaWduYWw6IElTaWduYWwsIG5hbWU6IHN0cmluZywgY29sb3I6IHN0cmluZywgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlciwgdW5pcXVlSWQ6IHN0cmluZywgZXJyb3JJbmZvOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgc3VwZXIoc2lnbmFsLCBuYW1lLCBjb2xvciwgc2VyaWVzUHJvdmlkZXIsIHVuaXF1ZUlkLCBlcnJvckluZm8pO1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gdGhpcy5zaWduYWwucmF3UG9pbnRzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZXN0YW1wcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRkZUU2VyaWVzIHdpdGggdGhlIGdpdmVuIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdzXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZXNQcm92aWRlcn0gc2VyaWVzUHJvdmlkZXJcclxuICAgICAqIEByZXR1cm5zIHtGRlRTZXJpZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUoc2V0dGluZ3M6IElTZXR0aW5ncywgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcik6IEZGVFNlcmllc3tcclxuICAgICAgICAvLyBnZXQgaW5mbyBmcm9tIHBlcnNpc3RpbmdkYXRhXHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzSWQpO1xyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc05hbWUpO1xyXG4gICAgICAgIGxldCBjb2xvcjogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNDb2xvcik7XHJcbiAgICAgICAgbGV0IHNpZ25hbERhdGE6IElTZXR0aW5nc3x1bmRlZmluZWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc1NpZ25hbERhdGEpO1xyXG4gICAgICAgIGxldCBlcnJvckluZm86IEFycmF5PHN0cmluZz4gPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0Vycm9ySW5mbyk7XHJcbiAgICAgICAgaWYoZXJyb3JJbmZvID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGVycm9ySW5mbyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjcmVhdGUgc2lnbmFsIHdpdGggdGhlIGdpdmVuIHNpZ25hbERhdGFcclxuICAgICAgICBsZXQgc2lnbmFsID0gdGhpcy5jcmVhdGVTaWduYWwoc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIHNlcmllcyB3aXRoIHRoZSBnaXZlbiBkYXRhXHJcbiAgICAgICAgbGV0IG5ld1lUU2VyaWVzID0gbmV3IEZGVFNlcmllcyhzaWduYWwsIG5hbWUsIGNvbG9yLCBzZXJpZXNQcm92aWRlciwgaWQsIGVycm9ySW5mbyk7XHJcblxyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvbiBpbmZvcm1hdGlvbnMgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm86IElTZXR0aW5nc3x1bmRlZmluZWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBuZXdZVFNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvID0gbmV3IENhbGN1bGF0aW9uRGF0YUluZm8oKTtcclxuICAgICAgICAgICAgbmV3WVRTZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mby5zZXRTZXR0aW5ncyhjYWxjdWxhdGlvbkRhdGFJbmZvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdZVFNlcmllcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggWCB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNYXhYKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXdQb2ludHNbdGhpcy5yYXdQb2ludHMubGVuZ3RoIC0gMV0ueFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiBYIHZhbHVlIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBGRlRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1pblgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhd1BvaW50c1swXS54O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0aW1lc3RhbXBzIGJhc2VvbiB0aGUgYXZhaWxhYmxlIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVUaW1lc3RhbXBzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVzdGFtcHMgPSB0aGlzLnJhd1BvaW50cy5tYXAoKHJhd1BvaW50KSA9PiB7IHJldHVybiByYXdQb2ludC54OyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=