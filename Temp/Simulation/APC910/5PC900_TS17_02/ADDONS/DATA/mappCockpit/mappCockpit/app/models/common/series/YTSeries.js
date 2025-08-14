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
define(["require", "exports", "../../../widgets/chartWidget/chartExtensions/chartDataOptimizer", "../../../common/math/mathX", "./seriesType", "../../../common/persistence/settings", "../calculatorProvider/calculationDataInfo", "./settingIds", "./baseSeries"], function (require, exports, chartDataOptimizer_1, mathX_1, seriesType_1, settings_1, calculationDataInfo_1, settingIds_1, baseSeries_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var YTSeries = /** @class */ (function (_super) {
        __extends(YTSeries, _super);
        /**
         * Creates an instance of YTSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {ISeriesProvider} seriesProvider
         * @param {string} [uniqueId=""]
         * @memberof YTSeries
         */
        function YTSeries(signal, name, color, seriesProvider, uniqueId, errorInfo) {
            var _this = _super.call(this, signal, name, color, seriesProvider, uniqueId, errorInfo) || this;
            _this.type = seriesType_1.SeriesType.timeSeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            _this.simplifySignal(_this.rawPoints);
            return _this;
        }
        /**
         * Creates an instance of YTSeries with the given settings
         *
         * @static
         * @param {ISettings} settings
         * @param {ISeriesProvider} seriesProvider
         * @returns {YTSeries}
         * @memberof YTSeries
         */
        YTSeries.create = function (settings, seriesProvider) {
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
            var newYTSeries = new YTSeries(signal, name, color, seriesProvider, id, errorInfo);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(settingIds_1.SettingIds.SeriesCalculationData);
            if (calculationDataInfo != undefined) {
                newYTSeries.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo();
                newYTSeries.calculationDataInfo.setSettings(calculationDataInfo);
            }
            return newYTSeries;
        };
        /**
         * Simplifies series data points
         *
         * @memberof YTSeries
         */
        YTSeries.prototype.simplifySignal = function (seriesPoints) {
            // retrieve x and y values
            var xValues = seriesPoints.map(function (point) { return point.x; });
            var yValues = seriesPoints.map(function (point) { return point.y; });
            // get the min max values
            var xMin = mathX_1.MathX.min(xValues);
            var xMax = mathX_1.MathX.max(xValues);
            var yMin = mathX_1.MathX.min(yValues);
            var yMax = mathX_1.MathX.max(yValues);
            // create the simplified points. For yt they are just the min max edge points for initializing the chart area. 
            var reducedSeriesPoints = [];
            reducedSeriesPoints.push(new chartDataOptimizer_1.ChartPoint(0, true, xMin, yMin));
            reducedSeriesPoints.push(new chartDataOptimizer_1.ChartPoint(1, true, xMax, yMax));
            // update simplified series with min/max yt points
            this.data = reducedSeriesPoints;
        };
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof YTSeries
         */
        YTSeries.prototype.getMaxX = function () {
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
         * @memberof YTSeries
         */
        YTSeries.prototype.getMinX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[0].x;
            }
            return undefined;
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof YTSeries
         */
        YTSeries.prototype.updateTimestamps = function () {
            if (this.rawPoints.length > 0) {
                this._timestamps = this.rawPoints.map(function (rawPoint) { return rawPoint.x; });
            }
        };
        return YTSeries;
    }(baseSeries_1.BaseSeries));
    exports.YTSeries = YTSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVRTZXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2VyaWVzL1lUU2VyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFhQTtRQUE4Qiw0QkFBVTtRQUlwQzs7Ozs7Ozs7V0FRRztRQUNILGtCQUFZLE1BQWUsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLGNBQStCLEVBQUUsUUFBZ0IsRUFBRSxTQUF3QjtZQUFySSxZQUNJLGtCQUFNLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLFNBS2xFO1lBakJRLFVBQUksR0FBRyx1QkFBVSxDQUFDLFVBQVUsQ0FBQztZQWFsQyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7UUFDeEMsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksZUFBTSxHQUFiLFVBQWMsUUFBbUIsRUFBRSxjQUErQjtZQUM5RCwrQkFBK0I7WUFDL0IsSUFBSSxXQUFXLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUMsSUFBSSxFQUFFLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNELElBQUksSUFBSSxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvRCxJQUFJLEtBQUssR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakUs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TyxTQUFTLENBQUE7UUFDcEIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ08sbUNBQWdCLEdBQTFCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRLElBQU8sT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0U7UUFDTCxDQUFDO1FBQ0wsZUFBQztJQUFELENBQUMsQUExSEQsQ0FBOEIsdUJBQVUsR0EwSHZDO0lBMUhZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NpZ25hbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCJcclxuaW1wb3J0IHsgQ2hhcnRQb2ludCB9IGZyb20gXCIuLi8uLi8uLi93aWRnZXRzL2NoYXJ0V2lkZ2V0L2NoYXJ0RXh0ZW5zaW9ucy9jaGFydERhdGFPcHRpbWl6ZXJcIjtcclxuaW1wb3J0IHsgTWF0aFggfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL21hdGgvbWF0aFhcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YUluZm9cIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllc30gZnJvbSBcIi4vYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3Nlcmllc0hlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFlUU2VyaWVzIGV4dGVuZHMgQmFzZVNlcmllc3tcclxuICAgXHJcbiAgICByZWFkb25seSB0eXBlID0gU2VyaWVzVHlwZS50aW1lU2VyaWVzO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWVRTZXJpZXNcclxuICAgICAqIEBwYXJhbSB7SVNpZ25hbH0gc2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZXNQcm92aWRlcn0gc2VyaWVzUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pcXVlSWQ9XCJcIl1cclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzaWduYWw6IElTaWduYWwsIG5hbWU6IHN0cmluZywgY29sb3I6IHN0cmluZywgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlciwgdW5pcXVlSWQ6IHN0cmluZywgZXJyb3JJbmZvOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgc3VwZXIoc2lnbmFsLCBuYW1lLCBjb2xvciwgc2VyaWVzUHJvdmlkZXIsIHVuaXF1ZUlkLCBlcnJvckluZm8pO1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gdGhpcy5zaWduYWwucmF3UG9pbnRzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZXN0YW1wcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZ2UoKTtcclxuICAgICAgICB0aGlzLnNpbXBsaWZ5U2lnbmFsKHRoaXMucmF3UG9pbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWVRTZXJpZXMgd2l0aCB0aGUgZ2l2ZW4gc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ3NcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQHJldHVybnMge1lUU2VyaWVzfVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUoc2V0dGluZ3M6IElTZXR0aW5ncywgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcik6IFlUU2VyaWVze1xyXG4gICAgICAgIC8vIGdldCBpbmZvIGZyb20gcGVyc2lzdGluZ2RhdGFcclxuICAgICAgICBsZXQgc2V0dGluZ3NPYmogPSBTZXR0aW5ncy5jcmVhdGUoc2V0dGluZ3MpO1xyXG4gICAgICAgIGxldCBpZDogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNJZCk7XHJcbiAgICAgICAgbGV0IG5hbWU6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzTmFtZSk7XHJcbiAgICAgICAgbGV0IGNvbG9yOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NvbG9yKTtcclxuICAgICAgICBsZXQgc2lnbmFsRGF0YTogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzU2lnbmFsRGF0YSk7XHJcbiAgICAgICAgbGV0IGVycm9ySW5mbzogQXJyYXk8c3RyaW5nPiA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzRXJyb3JJbmZvKTtcclxuICAgICAgICBpZihlcnJvckluZm8gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZXJyb3JJbmZvID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBzaWduYWwgd2l0aCB0aGUgZ2l2ZW4gc2lnbmFsRGF0YVxyXG4gICAgICAgIGxldCBzaWduYWwgPSB0aGlzLmNyZWF0ZVNpZ25hbChzaWduYWxEYXRhKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHNlcmllcyB3aXRoIHRoZSBnaXZlbiBkYXRhXHJcbiAgICAgICAgbGV0IG5ld1lUU2VyaWVzID0gbmV3IFlUU2VyaWVzKHNpZ25hbCwgbmFtZSwgY29sb3IsIHNlcmllc1Byb3ZpZGVyLCBpZCwgZXJyb3JJbmZvKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGNhbGN1bGF0aW9uIGluZm9ybWF0aW9ucyBpZiBhdmFpbGFibGVcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mbzogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzQ2FsY3VsYXRpb25EYXRhKTtcclxuICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIG5ld1lUU2VyaWVzLmNhbGN1bGF0aW9uRGF0YUluZm8gPSBuZXcgQ2FsY3VsYXRpb25EYXRhSW5mbygpO1xyXG4gICAgICAgICAgICBuZXdZVFNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvLnNldFNldHRpbmdzKGNhbGN1bGF0aW9uRGF0YUluZm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3WVRTZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaW1wbGlmaWVzIHNlcmllcyBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2ltcGxpZnlTaWduYWwoc2VyaWVzUG9pbnRzOklQb2ludFtdKSB7XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHggYW5kIHkgdmFsdWVzXHJcbiAgICAgICAgY29uc3QgeFZhbHVlcyA9IHNlcmllc1BvaW50cy5tYXAoKHBvaW50KT0+eyByZXR1cm4gcG9pbnQueDt9KTtcclxuICAgICAgICBsZXQgeVZhbHVlcyA9IHNlcmllc1BvaW50cy5tYXAoKHBvaW50KT0+eyByZXR1cm4gcG9pbnQueTt9KTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtaW4gbWF4IHZhbHVlc1xyXG4gICAgICAgIGNvbnN0IHhNaW4gPSBNYXRoWC5taW4oeFZhbHVlcyk7XHJcbiAgICAgICAgY29uc3QgeE1heCA9IE1hdGhYLm1heCh4VmFsdWVzKTtcclxuICAgICAgICBjb25zdCB5TWluID0gTWF0aFgubWluKHlWYWx1ZXMpO1xyXG4gICAgICAgIGNvbnN0IHlNYXggPSBNYXRoWC5tYXgoeVZhbHVlcyk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc2ltcGxpZmllZCBwb2ludHMuIEZvciB5dCB0aGV5IGFyZSBqdXN0IHRoZSBtaW4gbWF4IGVkZ2UgcG9pbnRzIGZvciBpbml0aWFsaXppbmcgdGhlIGNoYXJ0IGFyZWEuIFxyXG4gICAgICAgIGxldCByZWR1Y2VkU2VyaWVzUG9pbnRzOkNoYXJ0UG9pbnRbXSA9IFtdO1xyXG4gICAgICAgIHJlZHVjZWRTZXJpZXNQb2ludHMucHVzaChuZXcgQ2hhcnRQb2ludCgwLHRydWUseE1pbix5TWluKSk7XHJcbiAgICAgICAgcmVkdWNlZFNlcmllc1BvaW50cy5wdXNoKG5ldyBDaGFydFBvaW50KDEsdHJ1ZSx4TWF4LHlNYXgpKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHNpbXBsaWZpZWQgc2VyaWVzIHdpdGggbWluL21heCB5dCBwb2ludHNcclxuICAgICAgICB0aGlzLmRhdGEgPSAgcmVkdWNlZFNlcmllc1BvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggWCB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1heFgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhd1BvaW50c1t0aGlzLnJhd1BvaW50cy5sZW5ndGggLSAxXS54XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWluIFggdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNaW5YKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXdQb2ludHNbMF0ueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRpbWVzdGFtcHMgYmFzZW9uIHRoZSBhdmFpbGFibGUgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGltZXN0YW1wcygpIHtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lc3RhbXBzID0gdGhpcy5yYXdQb2ludHMubWFwKChyYXdQb2ludCkgPT4geyByZXR1cm4gcmF3UG9pbnQueDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19