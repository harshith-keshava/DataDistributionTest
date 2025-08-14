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
define(["require", "exports", "../../../common/math/lineReductionAlgorithm/rdp", "../../../common/math/mathX", "./seriesType", "../../../common/persistence/settings", "../calculatorProvider/calculationDataInfo", "./settingIds", "./baseSeries", "../../../widgets/chartWidget/chartExtensions/chartDataOptimizer"], function (require, exports, rdp_1, mathX_1, seriesType_1, settings_1, calculationDataInfo_1, settingIds_1, baseSeries_1, chartDataOptimizer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYSeries = /** @class */ (function (_super) {
        __extends(XYSeries, _super);
        /**
         * Creates an instance of XYSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {ISeriesProvider} seriesProvider
         * @param {string} [uniqueId=""]
         * @memberof XYSeries
         */
        function XYSeries(signal, name, color, seriesProvider, uniqueId, errorInfo) {
            var _this = _super.call(this, signal, name, color, seriesProvider, uniqueId, errorInfo) || this;
            _this.type = seriesType_1.SeriesType.xySeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            _this.simplifySignal(_this.rawPoints);
            return _this;
        }
        /**
         * Creates an instance of XYSeries with the given settings
         *
         * @static
         * @param {ISettings} settings
         * @param {ISeriesProvider} seriesProvider
         * @returns {XYSeries}
         * @memberof XYSeries
         */
        XYSeries.create = function (settings, seriesProvider) {
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
            var newXYSeries = new XYSeries(signal, name, color, seriesProvider, id, errorInfo);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(settingIds_1.SettingIds.SeriesCalculationData);
            if (calculationDataInfo != undefined) {
                newXYSeries.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo();
                newXYSeries.calculationDataInfo.setSettings(calculationDataInfo);
            }
            return newXYSeries;
        };
        /**
         * Calculates an initial line simplification
         *
         * @param {IPoint[]} seriesPoints
         * @memberof XYSeries
         */
        XYSeries.prototype.simplifySignal = function (seriesPoints) {
            var lineOptimization = new rdp_1.RDP();
            var xValues = seriesPoints.map(function (point) { return point.x; });
            var yValues = seriesPoints.map(function (point) { return point.y; });
            var xMin = mathX_1.MathX.min(xValues);
            var xMax = mathX_1.MathX.max(xValues);
            var yMin = mathX_1.MathX.min(yValues);
            var yMax = mathX_1.MathX.max(yValues);
            // calculate series ranges
            var xRange = xMax - xMin;
            var yRange = yMax - yMin;
            // calculate unit per pixel ratios
            var xRatio = xRange / 10000;
            var yRatio = yRange / 10000;
            // the units/pixel ratio must not be 0 
            xRatio = xRatio > 0 ? xRatio : Number.MIN_VALUE;
            yRatio = yRatio > 0 ? yRatio : Number.MIN_VALUE;
            // set required simplification precision
            var precision = 1;
            // create chart points from the raw points
            var rawPoints = seriesPoints.map(function (point, i) { return new chartDataOptimizer_1.ChartPoint(i, true, point.x, point.y); });
            // calculate the reduced point set
            var reducedSeriesPoints = lineOptimization.simplify(rawPoints, precision, xRatio, yRatio, true);
            // update simplified series view points and reduction ratios
            this.data = reducedSeriesPoints;
            this.data.pixelRatioX = xRatio;
            this.data.pixelRatioY = yRatio;
        };
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof XYSeries
         */
        XYSeries.prototype.getMaxX = function () {
            var maxX;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (maxX == undefined || this.rawPoints[i].x > maxX) {
                        maxX = this.rawPoints[i].x;
                    }
                }
            }
            return maxX;
        };
        /**
         * Get min X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof XYSeries
         */
        XYSeries.prototype.getMinX = function () {
            var minX;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (minX == undefined || this.rawPoints[i].x < minX) {
                        minX = this.rawPoints[i].x;
                    }
                }
            }
            return minX;
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof XYSeries
         */
        XYSeries.prototype.updateTimestamps = function () {
            if (this.calculationDataInfo != undefined) {
                if (this.calculationDataInfo.inputData.length > 0) {
                    // we use the x values from the input 0 as the timestamps source
                    this._timestamps = this.calculationDataInfo.inputData[0].getData().map(function (inputDataPoint) { return inputDataPoint.x; });
                }
            }
        };
        /**
         * Called whenever the seris data has changed
         *
         * @private
         * @param {IPoint[]} data
         * @memberof XYSeries
         */
        XYSeries.prototype.onSerieDataChanged = function (seriesData) {
            if (seriesData && seriesData.length > 0) {
                this.simplifySignal(seriesData);
            }
        };
        return XYSeries;
    }(baseSeries_1.BaseSeries));
    exports.XYSeries = XYSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWFlTZXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2VyaWVzL1hZU2VyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFjQTtRQUE4Qiw0QkFBVTtRQUlwQzs7Ozs7Ozs7V0FRRztRQUNILGtCQUFZLE1BQWUsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLGNBQStCLEVBQUUsUUFBZ0IsRUFBRSxTQUF3QjtZQUFySSxZQUNJLGtCQUFNLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLFNBS2xFO1lBakJELFVBQUksR0FBRyx1QkFBVSxDQUFDLFFBQVEsQ0FBQztZQWF2QixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7UUFDeEMsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksZUFBTSxHQUFiLFVBQWMsUUFBbUIsRUFBRSxjQUErQjtZQUM5RCwrQkFBK0I7WUFDL0IsSUFBSSxXQUFXLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUMsSUFBSSxFQUFFLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNELElBQUksSUFBSSxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvRCxJQUFJLEtBQUssR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakUs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LEVBQUU7d0JBQ2hELElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDN0I7aUJBQ0o7YUFDSjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLG1DQUFnQixHQUF2QjtZQUNJLElBQUcsSUFBSSxDQUFDLG1CQUFtQixJQUFJLFNBQVMsRUFBQztnQkFDckMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQy9DLGdFQUFnRTtvQkFDaEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLGNBQWMsSUFBSyxPQUFPLGNBQWMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztpQkFDeEg7YUFDSjtRQUNMLENBQUM7UUFHRDs7Ozs7O1dBTUc7UUFDTyxxQ0FBa0IsR0FBNUIsVUFBOEIsVUFBb0I7WUFDOUMsSUFBRyxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbkM7UUFDTCxDQUFDO1FBSUwsZUFBQztJQUFELENBQUMsQUF6S0QsQ0FBOEIsdUJBQVUsR0F5S3ZDO0lBektZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NpZ25hbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFJEUCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbWF0aC9saW5lUmVkdWN0aW9uQWxnb3JpdGhtL3JkcFwiO1xyXG5pbXBvcnQgeyBNYXRoWCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbWF0aC9tYXRoWFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4vc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhSW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mb1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4vYmFzZVNlcmllc1wiO1xyXG5cclxuaW1wb3J0IHsgQ2hhcnRQb2ludCB9IGZyb20gXCIuLi8uLi8uLi93aWRnZXRzL2NoYXJ0V2lkZ2V0L2NoYXJ0RXh0ZW5zaW9ucy9jaGFydERhdGFPcHRpbWl6ZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBYWVNlcmllcyBleHRlbmRzIEJhc2VTZXJpZXN7XHJcbiAgICBcclxuICAgIHR5cGUgPSBTZXJpZXNUeXBlLnh5U2VyaWVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBYWVNlcmllc1xyXG4gICAgICogQHBhcmFtIHtJU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt1bmlxdWVJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpZ25hbDogSVNpZ25hbCwgbmFtZTogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyLCB1bmlxdWVJZDogc3RyaW5nLCBlcnJvckluZm86IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBzdXBlcihzaWduYWwsIG5hbWUsIGNvbG9yLCBzZXJpZXNQcm92aWRlciwgdW5pcXVlSWQsIGVycm9ySW5mbyk7XHJcbiAgICAgICAgdGhpcy5yYXdQb2ludHMgPSB0aGlzLnNpZ25hbC5yYXdQb2ludHM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lc3RhbXBzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuc2ltcGxpZnlTaWduYWwodGhpcy5yYXdQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBYWVNlcmllcyB3aXRoIHRoZSBnaXZlbiBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nc1xyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiBAcmV0dXJucyB7WFlTZXJpZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTZXJpZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZShzZXR0aW5nczogSVNldHRpbmdzLCBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyKTogWFlTZXJpZXN7XHJcbiAgICAgICAgLy8gZ2V0IGluZm8gZnJvbSBwZXJzaXN0aW5nZGF0YVxyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcbiAgICAgICAgbGV0IGlkOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0lkKTtcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNOYW1lKTtcclxuICAgICAgICBsZXQgY29sb3I6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzQ29sb3IpO1xyXG4gICAgICAgIGxldCBzaWduYWxEYXRhOiBJU2V0dGluZ3N8dW5kZWZpbmVkID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNTaWduYWxEYXRhKTtcclxuICAgICAgICBsZXQgZXJyb3JJbmZvOiBBcnJheTxzdHJpbmc+ID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNFcnJvckluZm8pO1xyXG4gICAgICAgIGlmKGVycm9ySW5mbyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBlcnJvckluZm8gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHNpZ25hbCB3aXRoIHRoZSBnaXZlbiBzaWduYWxEYXRhXHJcbiAgICAgICAgbGV0IHNpZ25hbCA9IHRoaXMuY3JlYXRlU2lnbmFsKHNpZ25hbERhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBzZXJpZXMgd2l0aCB0aGUgZ2l2ZW4gZGF0YVxyXG4gICAgICAgIGxldCBuZXdYWVNlcmllcyA9IG5ldyBYWVNlcmllcyhzaWduYWwsIG5hbWUsIGNvbG9yLCBzZXJpZXNQcm92aWRlciwgaWQsIGVycm9ySW5mbyk7XHJcblxyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvbiBpbmZvcm1hdGlvbnMgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm86IElTZXR0aW5nc3x1bmRlZmluZWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBuZXdYWVNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvID0gbmV3IENhbGN1bGF0aW9uRGF0YUluZm8oKTtcclxuICAgICAgICAgICAgbmV3WFlTZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mby5zZXRTZXR0aW5ncyhjYWxjdWxhdGlvbkRhdGFJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1hZU2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBhbiBpbml0aWFsIGxpbmUgc2ltcGxpZmljYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSBzZXJpZXNQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2ltcGxpZnlTaWduYWwoc2VyaWVzUG9pbnRzOklQb2ludFtdKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpbmVPcHRpbWl6YXRpb24gPSBuZXcgUkRQKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHhWYWx1ZXMgPSBzZXJpZXNQb2ludHMubWFwKChwb2ludCk9PnsgcmV0dXJuIHBvaW50Lng7fSk7XHJcbiAgICAgICAgbGV0IHlWYWx1ZXMgPSBzZXJpZXNQb2ludHMubWFwKChwb2ludCk9PnsgcmV0dXJuIHBvaW50Lnk7fSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHhNaW4gPSBNYXRoWC5taW4oeFZhbHVlcyk7XHJcbiAgICAgICAgY29uc3QgeE1heCA9IE1hdGhYLm1heCh4VmFsdWVzKTtcclxuICAgICAgICBjb25zdCB5TWluID0gTWF0aFgubWluKHlWYWx1ZXMpO1xyXG4gICAgICAgIGNvbnN0IHlNYXggPSBNYXRoWC5tYXgoeVZhbHVlcyk7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBzZXJpZXMgcmFuZ2VzXHJcbiAgICAgICAgY29uc3QgeFJhbmdlID0geE1heC14TWluO1xyXG4gICAgICAgIGNvbnN0IHlSYW5nZSA9IHlNYXgteU1pbjtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdW5pdCBwZXIgcGl4ZWwgcmF0aW9zXHJcbiAgICAgICAgbGV0IHhSYXRpbyA9IHhSYW5nZS8xMDAwMCA7ICAgXHJcbiAgICAgICAgbGV0IHlSYXRpbyA9IHlSYW5nZS8xMDAwMCA7ICBcclxuXHJcbiAgICAgICAgLy8gdGhlIHVuaXRzL3BpeGVsIHJhdGlvIG11c3Qgbm90IGJlIDAgXHJcbiAgICAgICAgeFJhdGlvID0geFJhdGlvID4gMCA/IHhSYXRpbzogTnVtYmVyLk1JTl9WQUxVRSA7ICAgXHJcbiAgICAgICAgeVJhdGlvID0geVJhdGlvID4gMCA/IHlSYXRpbzogTnVtYmVyLk1JTl9WQUxVRSA7ICBcclxuICAgICAgICAvLyBzZXQgcmVxdWlyZWQgc2ltcGxpZmljYXRpb24gcHJlY2lzaW9uXHJcbiAgICAgICAgY29uc3QgcHJlY2lzaW9uID0gMTtcclxuIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBjaGFydCBwb2ludHMgZnJvbSB0aGUgcmF3IHBvaW50c1xyXG4gICAgICAgIGxldCByYXdQb2ludHMgPSAgc2VyaWVzUG9pbnRzLm1hcCgocG9pbnQsaSk9PnsgcmV0dXJuIG5ldyBDaGFydFBvaW50KGksdHJ1ZSwgcG9pbnQueCwgcG9pbnQueSk7IH0pO1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgcmVkdWNlZCBwb2ludCBzZXRcclxuICAgICAgICBsZXQgcmVkdWNlZFNlcmllc1BvaW50cyA9IGxpbmVPcHRpbWl6YXRpb24uc2ltcGxpZnkocmF3UG9pbnRzLHByZWNpc2lvbiwgeFJhdGlvLHlSYXRpbywgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBzaW1wbGlmaWVkIHNlcmllcyB2aWV3IHBvaW50cyBhbmQgcmVkdWN0aW9uIHJhdGlvc1xyXG4gICAgICAgIHRoaXMuZGF0YSA9ICByZWR1Y2VkU2VyaWVzUG9pbnRzO1xyXG4gICAgICAgICg8YW55PnRoaXMuZGF0YSkucGl4ZWxSYXRpb1ggPSB4UmF0aW87XHJcbiAgICAgICAgKDxhbnk+dGhpcy5kYXRhKS5waXhlbFJhdGlvWSA9IHlSYXRpbztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IFggdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNYXhYKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WDtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5yYXdQb2ludHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYobWF4WCA9PSB1bmRlZmluZWQgfHwgdGhpcy5yYXdQb2ludHNbaV0ueCA+IG1heFggKXtcclxuICAgICAgICAgICAgICAgICAgICBtYXhYID0gdGhpcy5yYXdQb2ludHNbaV0ueFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhYO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiBYIHZhbHVlIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWluWCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1pblg7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmF3UG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1pblggPT0gdW5kZWZpbmVkIHx8IHRoaXMucmF3UG9pbnRzW2ldLnggPCBtaW5YICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluWCA9IHRoaXMucmF3UG9pbnRzW2ldLnhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWluWDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRpbWVzdGFtcHMgYmFzZW9uIHRoZSBhdmFpbGFibGUgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlVGltZXN0YW1wcygpIHtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2UgdXNlIHRoZSB4IHZhbHVlcyBmcm9tIHRoZSBpbnB1dCAwIGFzIHRoZSB0aW1lc3RhbXBzIHNvdXJjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZXN0YW1wcyA9IHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFbMF0uZ2V0RGF0YSgpLm1hcCgoaW5wdXREYXRhUG9pbnQpPT57IHJldHVybiBpbnB1dERhdGFQb2ludC54fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW5ldmVyIHRoZSBzZXJpcyBkYXRhIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25TZXJpZURhdGFDaGFuZ2VkKCBzZXJpZXNEYXRhOiBJUG9pbnRbXSkge1xyXG4gICAgICAgIGlmKHNlcmllc0RhdGEgJiYgc2VyaWVzRGF0YS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5zaW1wbGlmeVNpZ25hbChzZXJpZXNEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iXX0=