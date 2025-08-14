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
define(["require", "exports", "./ChartBase", "./helpers/chartRangeHelper", "./chartExtensions/chartExtensions", "./cursor/CursorHandler", "../../common/math/mathX"], function (require, exports, ChartBase_1, chartRangeHelper_1, chartExtensions_1, CursorHandler_1, mathX_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYChart = /** @class */ (function (_super) {
        __extends(XYChart, _super);
        function XYChart(parentView, name, type, scales) {
            var _this = _super.call(this, parentView, name, scales) || this;
            _this.series = [];
            _this.primaryXAxisName = "PrimaryDataXAxis";
            _this.primaryYAxisName = "Scale_1";
            _this.cursorHandler = undefined;
            _this.widgetName = name;
            _this.parentView = parentView;
            _this.type = type;
            _this.addWidgetToView(parentView);
            return _this;
        }
        /**
         * Eradicate!
         *
         * @memberof XYChart
         */
        XYChart.prototype.dispose = function () {
            this.removeWidgetFromView(this.parentView);
            _super.prototype.dispose.call(this);
        };
        /**
         * Add widget to view
         *
         * @private
         * @param {ChartViewChartManager} chartManager
         * @memberof XYChart
         */
        XYChart.prototype.addWidgetToView = function (parentView) {
            if (parentView) {
                parentView.addWidget(this);
            }
        };
        /**
         * Remove widget from view
         *
         * @private
         * @param {ChartViewChartManager} chartManager
         * @memberof XYChart
         */
        XYChart.prototype.removeWidgetFromView = function (parentView) {
            if (parentView) {
                parentView.removeWidget(this);
            }
        };
        XYChart.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.setAvailableSeriesAsDataSource();
            this.initializeCursorHandlers();
            this.attachChartExtensions(this.chartInstance);
        };
        /**
         * Reinitializes the chart
         *
         * @memberof XYChart
         */
        XYChart.prototype.reinitialize = function () {
            _super.prototype.reinitialize.call(this);
            this.setAvailableSeriesAsDataSource();
            this.cursorHandler = undefined;
            this.initializeCursorHandlers();
            this.attachChartExtensions(this.chartInstance);
        };
        /**
         * Attaches a extension instance
         *
         * @private
         * @param {*} chartInstance
         * @memberof XYChart
         */
        XYChart.prototype.attachChartExtensions = function (chartInstance) {
            // inject an extension provider
            var xyChartExtensions = new chartExtensions_1.ChartExtensions(this);
            // use an XY optimization algorithm
            xyChartExtensions.chartDataOptimizer.trimSeriesForChartBounds = xyChartExtensions.chartDataOptimizer.trimSeriesForChartBoundsXY;
            // set the chart extensions
            chartInstance.chartExtensions = xyChartExtensions;
        };
        XYChart.prototype.initializeCursorHandlers = function () {
            if (this.cursorHandler == undefined) {
                this.cursorHandler = new CursorHandler_1.CursorHandler(this.mainDiv, this.chart.getChartArea());
                this.cursorHandler.enableCrosshairCursor = true;
            }
        };
        /**
         * Send data of the series to the chart instance
         *
         * @memberof XYChart
         */
        XYChart.prototype.setAvailableSeriesAsDataSource = function () {
            var traceDataSeries = new Array();
            for (var i = 0; i < this.series.length; i++) {
                var effectiveSerie = this.chartInstance.chartExtensions ? this.chartInstance.chartExtensions.chartDataOptimizer.attachSeries(this.series[i]) : this.series[i];
                traceDataSeries.push(this.chart.createTraceDataSeries(effectiveSerie, this.primaryYAxisName));
            }
            this.chart.setSeries(traceDataSeries);
            this.repositionCursors();
        };
        /**
         * Calculate zoom on mousewheel action
         *
         * @protected
         * @param {*} args
         * @memberof XYChart
         */
        XYChart.prototype.onChartMouseWheel = function (sender, args) {
            _super.prototype.onChartMouseWheel.call(this, sender, args);
        };
        /**
         *
         *
         * @protected
         * @param {Point} cursorPoint
         * @returns {number}
         * @memberof XYChart
         */
        XYChart.prototype.getTimestampInSeries = function (cursorPoint, availableSeries) {
            // find the nearest series point
            //console.log(series.length);
            var nearestSeriesPointInfo = this.findNearestSeriesPointInSeries(cursorPoint, availableSeries);
            // get the nearest series and point index
            var nearestSeriesIndex = nearestSeriesPointInfo.seriesIndex;
            var nearestPointIndex = nearestSeriesPointInfo.pointIndex;
            // get the nearest series points 
            var calculationDataInfo = availableSeries[nearestSeriesIndex].calculationDataInfo;
            if (calculationDataInfo != undefined) {
                var nearestSeriesPoints = calculationDataInfo.inputData[0].getData();
                // get the nearest timestamp of the nearest series
                var nearestTimestamp = nearestSeriesPoints[nearestPointIndex].x;
                return nearestTimestamp;
            }
            console.error("NearestTimestamp not found! No calculationDataInfo!");
            return 0;
        };
        /**
         * Gets a timestamp nearest to thespecified point
         *
         * @protected
         * @param {Point} cursorPoint
         * @returns
         * @memberof XYChart
         */
        XYChart.prototype.getTimestampFromSerie = function (cursorPoint) {
            var xAxis = this.chart.getAxis(this.primaryXAxisName);
            var yAxis = this.chart.getAxis(this.scales[0].id);
            if (xAxis != undefined && yAxis != undefined) {
                // get the current active series points;
                var effectiveSeriesPoints = this.series[this.draggedSeriesIndex].serie.rawPoints;
                // find the nearest point within this series
                var nearestPointInfo = this.findNearestXYPoint(effectiveSeriesPoints, cursorPoint, xAxis, yAxis);
                // grab one input data series to get access to the timestamps.
                var calculationDataInfo = this.series[this.draggedSeriesIndex].calculationDataInfo;
                if (calculationDataInfo != undefined) {
                    var inputSeriesPoints = calculationDataInfo.inputData[0].getData();
                    // get the nearest timestamp from this series. The input datas x vlues represent the timestamps.
                    var nearestTimestamp = inputSeriesPoints[nearestPointInfo.pointIndex].x;
                    return nearestTimestamp;
                }
            }
            return 0;
        };
        /**
         * Finds the nearest point in all avalibale series.
         *
         * @private
         * @param {Point} cursorPoint
         * @returns {NearestPointInfo}
         * @memberof XYChart
         */
        XYChart.prototype.findNearestSeriesPointInSeries = function (cursorPoint, series) {
            // get the charts x-Axis
            var xAxis = this.chart.getAxis(this.primaryXAxisName);
            // get the charts y-Axis
            var yAxis = this.chart.getAxis(this.scales[0].id);
            // create an array for collecting the nearest point infos
            var nearestXYSeriesPointInfos = this.findNearestPointsInSeries(series, cursorPoint, xAxis, yAxis);
            // retrieve the collected nearest point distances
            var nearestSeriesPointInfo = this.getNearestPointOfAllSeries(nearestXYSeriesPointInfos);
            return nearestSeriesPointInfo;
        };
        /**
         * Finds a nearest point within a series
         *
         * @private
         * @param {IPoint[]} xyRawPoints
         * @param {Point} chartPoint
         * @param {*} xAxis
         * @param {*} yAxis
         * @returns {NearestPointInfo}
         * @memberof XYChart
         */
        XYChart.prototype.findNearestXYPoint = function (xyRawPoints, chartPoint, xAxis, yAxis) {
            // get the x-axis range
            var xAxisRange = xAxis.getAxisRange();
            // get the chart x axis pixel range
            var xAxisPixelRange = xAxis.getAxisRangeInPixel();
            // calculate the x - pixel/unit ratio
            var xPixelsPerUnit = (xAxisPixelRange.max - xAxisPixelRange.min) / (xAxisRange.max - xAxisRange.min);
            // get the y-axis range
            var yAxisRange = yAxis.getAxisRange();
            // get the chart y axis pixel range
            var yAxisPixelRange = yAxis.getAxisRangeInPixel();
            // calculate the y - pixel/unit ratio
            var yPixelsPerUnit = (yAxisPixelRange.max - yAxisPixelRange.min) / (yAxisRange.max - yAxisRange.min);
            // create a initial nearest point info.
            var nearestPointInfo = this.getMinSquaredDistancePointInfo(xyRawPoints, chartPoint, xPixelsPerUnit, yPixelsPerUnit);
            return nearestPointInfo;
        };
        /**
         * Gets the minimal squared distance of the specified point within the points
         *
         * @private
         * @param {IPoint[]} xyRawPoints
         * @param {Point} chartPoint
         * @param {number} xPixelsPerUnit
         * @param {number} yPixelsPerUnit
         * @returns
         * @memberof XYChart
         */
        XYChart.prototype.getMinSquaredDistancePointInfo = function (xyRawPoints, chartPoint, xPixelsPerUnit, yPixelsPerUnit) {
            var nearestPointInfo = { seriesIndex: 0, pointIndex: 0, distanceSquared: Number.MAX_VALUE };
            // find the smallest distance to the series point
            for (var i = 0; i < xyRawPoints.length; i++) {
                // calculate the x distance 
                var dx = (xyRawPoints[i].x - chartPoint.x) * xPixelsPerUnit;
                // calculate the y distance
                var dy = (xyRawPoints[i].y - chartPoint.y) * yPixelsPerUnit;
                // calculate the 2D distance to the point
                var pointToSeriesDistanceSquared = dx * dx + dy * dy;
                // update the nearest point info if the distance is smaller then the already existing one. 
                if (pointToSeriesDistanceSquared < nearestPointInfo.distanceSquared) {
                    nearestPointInfo.distanceSquared = pointToSeriesDistanceSquared;
                    nearestPointInfo.pointIndex = i;
                }
            }
            return nearestPointInfo;
        };
        /**
         * Retrievs the point which is the nearest in all series
         *
         * @private
         * @param {NearestPointInfo[]} nearestXYSeriesPointInfos
         * @returns
         * @memberof XYChart
         */
        XYChart.prototype.getNearestPointOfAllSeries = function (nearestXYSeriesPointInfos) {
            // retrieve the collected nearest point distances
            var pointToSeriesDistances = nearestXYSeriesPointInfos.map(function (nearestXYSeriesPointInfo) { return nearestXYSeriesPointInfo.distanceSquared; });
            // get the smallest one...        
            var smallestPointToSeriesDistance = mathX_1.MathX.min(pointToSeriesDistances);
            // get the index of the smallest one...
            // the nearest distance index directly matches the series index because the order within the arrays is the same.
            var nearestSeriesIndex = nearestXYSeriesPointInfos.findIndex(function (nearestXYSeriesPointInfo) { return nearestXYSeriesPointInfo.distanceSquared === smallestPointToSeriesDistance; });
            // update the nearest point infos series index
            var nearestSeriesPointInfo = nearestXYSeriesPointInfos[nearestSeriesIndex];
            nearestSeriesPointInfo.seriesIndex = nearestSeriesIndex;
            return nearestSeriesPointInfo;
        };
        /**
         * Finds the nearest points in the specified series
         *
         * @private
         * @param {Point} cursorPoint
         * @param { IChartAxis | undefined} xAxis
         * @param { IChartAxis | undefined} yAxis
         * @returns
         * @memberof XYChart
         */
        XYChart.prototype.findNearestPointsInSeries = function (series, cursorPoint, xAxis, yAxis) {
            var _this = this;
            var nearestXYSeriesPointInfos = [];
            if (xAxis && yAxis) {
                // collect the nearest point infos of all series
                series.forEach(function (series) { nearestXYSeriesPointInfos.push(_this.findNearestXYPoint(series.serie.rawPoints, cursorPoint, xAxis, yAxis)); });
            }
            return nearestXYSeriesPointInfos;
        };
        /**
         * Gets a chart point for the specified timestamp
         *
         * @private
         * @param {number} timestamp
         * @returns {Point}
         * @memberof ChartBase
         */
        XYChart.prototype.getCursorPoint = function (timestamp, series, seriesIndex) {
            var seriesTimestampIndex = series[seriesIndex].serie.getTimestampIndex(timestamp);
            var seriesPoint = series[seriesIndex].serie.rawPoints[seriesTimestampIndex];
            return { timestamp: series[seriesIndex].calculationDataInfo.inputData[0].getData()[seriesTimestampIndex].x, x: seriesPoint.x, y: seriesPoint.y };
        };
        /**
         * Get max x value from all series in the chart
         *
         * @returns {(number|undefined)}
         * @memberof XYChart
         */
        XYChart.prototype.getTotalMaxX = function (traceChartList) {
            var maxX = undefined;
            for (var i = 0; i < this.series.length; i++) {
                if (this.series[i] !== undefined) {
                    if (maxX == undefined || this.series[i].maxX > maxX) {
                        maxX = this.series[i].maxX;
                    }
                }
            }
            return maxX;
        };
        /**
         * Get min x value from all series in the chart
         *
         * @returns {(number|undefined)}
         * @memberof XYChart
         */
        XYChart.prototype.getTotalMinX = function (traceChartList) {
            var minX = undefined;
            for (var i = 0; i < this.series.length; i++) {
                if (this.series[i] !== undefined) {
                    if (minX == undefined || this.series[i].minX < minX) {
                        minX = this.series[i].minX;
                    }
                }
            }
            return minX;
        };
        /**
         * Add drop locations in the chart
         *
         * @param {Array<BaseSeries>} serie
         * @returns
         * @memberof XYChart
         */
        XYChart.prototype.addSerieDropLocations = function (serie, chartManagerChart) {
            if (!chartManagerChart.childs[0].dropPossible) {
                return;
            }
            this.addSerieChartDropLocations(serie[0]);
        };
        /**
         * Add drop locations in the chart area
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof YTChart
         */
        XYChart.prototype.addSerieChartDropLocations = function (serie) {
            if (serie.name) {
                var offsetWidth = 18.4;
                var parentContainer = $(this.mainDiv);
                parentContainer.append('<div id="' + this.axisDropZoneId + "_chartArea" + '" style="position:absolute; width: ' + (parentContainer.width() - offsetWidth) + 'px; height: ' + (parentContainer.height()) + 'px; top: 0px"; class="dropLocationArea"></div>');
            }
        };
        /**
         *
         *
         * @param {*} pageX
         * @param {*} pageY
         * @memberof XYChart
         */
        XYChart.prototype.doPanning = function (pageX, pageY) {
            _super.prototype.doPanning.call(this, pageX, pageY);
            this.redrawChart();
        };
        /**
         * Returns the current drop location type (e.g. assign to scale, add new scale, invalid for drop)
         *
         * @returns {DropLocationType}
         * @memberof XYChart
         */
        XYChart.prototype.getDropLocationType = function (currentTarget) {
            return ChartBase_1.DropLocationType.assignToScale;
        };
        /**
         * Highlight droppable areas if a valid signal is dragged over
         *
         * @param {*} currentTarget
         * @memberof BasicChart
         */
        XYChart.prototype.updateDroppableAreas = function (currentTarget) {
            if (currentTarget.id.includes("_axisDropZone_chartArea")) {
                var chartArea = document.getElementById(this.axisDropZoneChartAreaId);
                if (chartArea != undefined) {
                    chartArea.classList.add('draggedOver');
                }
            }
            else {
                this.resetHighlighting();
            }
        };
        ;
        /**
         * Reset highlighted areas
         *
         * @memberof BasicChart
         */
        XYChart.prototype.resetHighlighting = function () {
            var chartArea = document.getElementById(this.axisDropZoneId);
            if (chartArea != undefined) {
                chartArea.classList.remove('draggedOver');
            }
        };
        XYChart.prototype.setScaleRange = function (scale, minXValue, maxXValue, minYValue, maxYValue, orientation, setAxisRange) {
            if (setAxisRange === void 0) { setAxisRange = true; }
            _super.prototype.setScaleRange.call(this, scale, minXValue, maxXValue, minYValue, maxYValue, orientation, setAxisRange);
            if (orientation == 'horizontal' && setAxisRange == true) {
                var axis = this.chart.getAxis(this.primaryXAxisName);
                if (axis != undefined) {
                    axis.setAxisRange({ min: scale.minXValue, max: scale.maxXValue });
                }
            }
        };
        XYChart.prototype.addSeriesToChart = function (series, scale, updateRangeX) {
            var resetXRange = false;
            if (this.series.length == 0) {
                resetXRange = true;
            }
            _super.prototype.addSeriesToChart.call(this, series, scale, updateRangeX);
            if (resetXRange && updateRangeX == true) {
                new chartRangeHelper_1.ChartRangeHelper().resetXRangesAllChartTypes([this]);
            }
        };
        /**
         * Get used cursor states
         *
         * @protected
         * @returns {Array<ICursorState>}
         * @memberof XYChart
         */
        XYChart.prototype.getUsedCursorStates = function () {
            return this.cursorsStates.getTimeStates();
        };
        return XYChart;
    }(ChartBase_1.ChartBase));
    exports.XYChart = XYChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWFlDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9YWUNoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrQkE7UUFBc0IsMkJBQVM7UUFTM0IsaUJBQVksVUFBaUIsRUFBRSxJQUFZLEVBQUUsSUFBZSxFQUFFLE1BQWU7WUFBN0UsWUFDSSxrQkFBTSxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQU1sQztZQWRELFlBQU0sR0FBMkIsRUFBRSxDQUFDO1lBRXBDLHNCQUFnQixHQUFHLGtCQUFrQixDQUFBO1lBQ3JDLHNCQUFnQixHQUFHLFNBQVMsQ0FBQTtZQUU1QixtQkFBYSxHQUE0QixTQUFTLENBQUM7WUFJL0MsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsS0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFakIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7UUFDckMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSx5QkFBTyxHQUFkO1lBQ0ksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQyxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssaUNBQWUsR0FBdkIsVUFBd0IsVUFBa0I7WUFDdEMsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QjtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxzQ0FBb0IsR0FBNUIsVUFBNkIsVUFBaUI7WUFDMUMsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNq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QUMsQ0FBQztpQkFDbkU7YUFDSjtRQUVMLENBQUM7UUFFTSxrQ0FBZ0IsR0FBdkIsVUFBd0IsTUFBeUIsRUFBRSxLQUFZLEVBQUUsWUFBc0I7WUFDbkYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO2dCQUN2QixXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1lBQ0QsaUJBQU0sZ0JBQWdCLFlBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNwRCxJQUFHLFdBQVcsSUFBSSxZQUFZLElBQUksSUFBSSxFQUFDO2dCQUNuQyxJQUFJLG1DQUFnQixFQUFFLENBQUMseUJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzVEO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLHFDQUFtQixHQUE3QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM5QyxDQUFDO1FBQ0wsY0FBQztJQUFELENBQUMsQUFoZkQsQ0FBc0IscUJBQVMsR0FnZjlCO0lBRVEsMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydEJhc2UsIERyb3BMb2NhdGlvblR5cGUsIFRpbWVQb2ludCB9IGZyb20gXCIuL0NoYXJ0QmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFydFJhbmdlSGVscGVyIH0gZnJvbSBcIi4vaGVscGVycy9jaGFydFJhbmdlSGVscGVyXCI7XHJcbmltcG9ydCB7IENoYXJ0RXh0ZW5zaW9ucyB9IGZyb20gXCIuL2NoYXJ0RXh0ZW5zaW9ucy9jaGFydEV4dGVuc2lvbnNcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdTZXJpZSB9IGZyb20gXCIuL2NoYXJ0Vmlld1NlcmllXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IEN1cnNvckhhbmRsZXIgfSBmcm9tIFwiLi9jdXJzb3IvQ3Vyc29ySGFuZGxlclwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hdGhYIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXRoL21hdGhYXCI7XHJcbmltcG9ydCB7IElDaGFydEF4aXMgfSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvQ2hhcnRBeGlzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZpZXdJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUN1cnNvclN0YXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2N1cnNvclN0YXRlSW50ZXJmYWNlXCI7XHJcblxyXG4vLyBzcGVjaWZpZXMgYSB0eXBlIGZvciBob2xkaW5nIG5lYXJlc3QgcG9pbnQgaW5mb3JtYXRpb25cclxudHlwZSBOZWFyZXN0UG9pbnRJbmZvID0geyBzZXJpZXNJbmRleDpudW1iZXIsIHBvaW50SW5kZXg6bnVtYmVyLCBkaXN0YW5jZVNxdWFyZWQ6bnVtYmVyfTtcclxuXHJcbmNsYXNzIFhZQ2hhcnQgZXh0ZW5kcyBDaGFydEJhc2V7XHJcblxyXG4gICAgc2VyaWVzIDogQXJyYXk8Q2hhcnRWaWV3U2VyaWU+ID0gW107XHJcblxyXG4gICAgcHJpbWFyeVhBeGlzTmFtZSA9IFwiUHJpbWFyeURhdGFYQXhpc1wiXHJcbiAgICBwcmltYXJ5WUF4aXNOYW1lID0gXCJTY2FsZV8xXCJcclxuXHJcbiAgICBjdXJzb3JIYW5kbGVyOiBDdXJzb3JIYW5kbGVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRWaWV3OiBJVmlldywgbmFtZTogc3RyaW5nLCB0eXBlOiBDaGFydFR5cGUsIHNjYWxlczogU2NhbGVbXSkge1xyXG4gICAgICAgIHN1cGVyKHBhcmVudFZpZXcsIG5hbWUsIHNjYWxlcyk7XHJcbiAgICAgICAgdGhpcy53aWRnZXROYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnBhcmVudFZpZXcgPSBwYXJlbnRWaWV3O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkV2lkZ2V0VG9WaWV3KHBhcmVudFZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXJhZGljYXRlIVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVXaWRnZXRGcm9tVmlldyh0aGlzLnBhcmVudFZpZXcpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCB3aWRnZXQgdG8gdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld0NoYXJ0TWFuYWdlcn0gY2hhcnRNYW5hZ2VyXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFdpZGdldFRvVmlldyhwYXJlbnRWaWV3IDogSVZpZXcpIHtcclxuICAgICAgICBpZiAocGFyZW50Vmlldykge1xyXG4gICAgICAgICAgICBwYXJlbnRWaWV3LmFkZFdpZGdldCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgd2lkZ2V0IGZyb20gdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld0NoYXJ0TWFuYWdlcn0gY2hhcnRNYW5hZ2VyXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZVdpZGdldEZyb21WaWV3KHBhcmVudFZpZXc6IElWaWV3KSB7XHJcbiAgICAgICAgaWYgKHBhcmVudFZpZXcpIHtcclxuICAgICAgICAgICAgcGFyZW50Vmlldy5yZW1vdmVXaWRnZXQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuICAgICAgICB0aGlzLnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUN1cnNvckhhbmRsZXJzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXR0YWNoQ2hhcnRFeHRlbnNpb25zKHRoaXMuY2hhcnRJbnN0YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWluaXRpYWxpemVzIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgc3VwZXIucmVpbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUN1cnNvckhhbmRsZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hDaGFydEV4dGVuc2lvbnModGhpcy5jaGFydEluc3RhbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIGEgZXh0ZW5zaW9uIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY2hhcnRJbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hDaGFydEV4dGVuc2lvbnMoY2hhcnRJbnN0YW5jZTogYW55KSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAvLyBpbmplY3QgYW4gZXh0ZW5zaW9uIHByb3ZpZGVyXHJcbiAgICAgICAgICBsZXQgeHlDaGFydEV4dGVuc2lvbnMgPSBuZXcgQ2hhcnRFeHRlbnNpb25zKHRoaXMpO1xyXG4gICAgICAgICAgLy8gdXNlIGFuIFhZIG9wdGltaXphdGlvbiBhbGdvcml0aG1cclxuICAgICAgICAgIHh5Q2hhcnRFeHRlbnNpb25zLmNoYXJ0RGF0YU9wdGltaXplci50cmltU2VyaWVzRm9yQ2hhcnRCb3VuZHMgPSB4eUNoYXJ0RXh0ZW5zaW9ucy5jaGFydERhdGFPcHRpbWl6ZXIudHJpbVNlcmllc0ZvckNoYXJ0Qm91bmRzWFk7XHJcbiAgICAgICAgICAvLyBzZXQgdGhlIGNoYXJ0IGV4dGVuc2lvbnNcclxuICAgICAgICAgIGNoYXJ0SW5zdGFuY2UuY2hhcnRFeHRlbnNpb25zID0geHlDaGFydEV4dGVuc2lvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplQ3Vyc29ySGFuZGxlcnMoKXtcclxuICAgICAgICBpZiAodGhpcy5jdXJzb3JIYW5kbGVyID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlciA9IG5ldyBDdXJzb3JIYW5kbGVyKHRoaXMubWFpbkRpdiwgdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlci5lbmFibGVDcm9zc2hhaXJDdXJzb3IgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kIGRhdGEgb2YgdGhlIHNlcmllcyB0byB0aGUgY2hhcnQgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCkge1xyXG4gICAgICAgIGxldCB0cmFjZURhdGFTZXJpZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlZmZlY3RpdmVTZXJpZSA9IHRoaXMuY2hhcnRJbnN0YW5jZS5jaGFydEV4dGVuc2lvbnMgPyB0aGlzLmNoYXJ0SW5zdGFuY2UuY2hhcnRFeHRlbnNpb25zLmNoYXJ0RGF0YU9wdGltaXplci5hdHRhY2hTZXJpZXModGhpcy5zZXJpZXNbaV0pIDogdGhpcy5zZXJpZXNbaV07ICAgICAgICAgICBcclxuICAgICAgICAgICAgdHJhY2VEYXRhU2VyaWVzLnB1c2godGhpcy5jaGFydC5jcmVhdGVUcmFjZURhdGFTZXJpZXMoZWZmZWN0aXZlU2VyaWUsIHRoaXMucHJpbWFyeVlBeGlzTmFtZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jaGFydC5zZXRTZXJpZXModHJhY2VEYXRhU2VyaWVzKTtcclxuICAgICAgICB0aGlzLnJlcG9zaXRpb25DdXJzb3JzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIHpvb20gb24gbW91c2V3aGVlbCBhY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkNoYXJ0TW91c2VXaGVlbChzZW5kZXIsIGFyZ3Mpe1xyXG4gICAgICAgIHN1cGVyLm9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlciwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7UG9pbnR9IGN1cnNvclBvaW50XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFRpbWVzdGFtcEluU2VyaWVzKGN1cnNvclBvaW50OiBQb2ludCwgYXZhaWxhYmxlU2VyaWVzOiBDaGFydFZpZXdTZXJpZVtdKSA6IG51bWJlciB7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgdGhlIG5lYXJlc3Qgc2VyaWVzIHBvaW50XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhzZXJpZXMubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBuZWFyZXN0U2VyaWVzUG9pbnRJbmZvOk5lYXJlc3RQb2ludEluZm8gPSB0aGlzLmZpbmROZWFyZXN0U2VyaWVzUG9pbnRJblNlcmllcyhjdXJzb3JQb2ludCwgYXZhaWxhYmxlU2VyaWVzKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIG5lYXJlc3Qgc2VyaWVzIGFuZCBwb2ludCBpbmRleFxyXG4gICAgICAgIGNvbnN0IG5lYXJlc3RTZXJpZXNJbmRleCA9IG5lYXJlc3RTZXJpZXNQb2ludEluZm8uc2VyaWVzSW5kZXg7XHJcbiAgICAgICAgY29uc3QgbmVhcmVzdFBvaW50SW5kZXggPSBuZWFyZXN0U2VyaWVzUG9pbnRJbmZvLnBvaW50SW5kZXg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHNlcmllcyBwb2ludHMgXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm8gPSBhdmFpbGFibGVTZXJpZXNbbmVhcmVzdFNlcmllc0luZGV4XS5jYWxjdWxhdGlvbkRhdGFJbmZvO1xyXG4gICAgICAgIGlmKCBjYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBuZWFyZXN0U2VyaWVzUG9pbnRzID0gY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFbMF0uZ2V0RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHRpbWVzdGFtcCBvZiB0aGUgbmVhcmVzdCBzZXJpZXNcclxuICAgICAgICAgICAgbGV0IG5lYXJlc3RUaW1lc3RhbXAgPSBuZWFyZXN0U2VyaWVzUG9pbnRzW25lYXJlc3RQb2ludEluZGV4XS54O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5lYXJlc3RUaW1lc3RhbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJOZWFyZXN0VGltZXN0YW1wIG5vdCBmb3VuZCEgTm8gY2FsY3VsYXRpb25EYXRhSW5mbyFcIik7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIHRpbWVzdGFtcCBuZWFyZXN0IHRvIHRoZXNwZWNpZmllZCBwb2ludFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7UG9pbnR9IGN1cnNvclBvaW50XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFRpbWVzdGFtcEZyb21TZXJpZSAoY3Vyc29yUG9pbnQ6IFBvaW50KTpudW1iZXIge1xyXG4gICAgICAgIGxldCB4QXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgIGxldCB5QXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnNjYWxlc1swXS5pZCk7XHJcblxyXG4gICAgICAgIGlmKHhBeGlzICE9IHVuZGVmaW5lZCAmJiB5QXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBhY3RpdmUgc2VyaWVzIHBvaW50cztcclxuICAgICAgICAgICAgY29uc3QgZWZmZWN0aXZlU2VyaWVzUG9pbnRzID0gdGhpcy5zZXJpZXNbdGhpcy5kcmFnZ2VkU2VyaWVzSW5kZXhdLnNlcmllLnJhd1BvaW50cztcclxuXHJcbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIG5lYXJlc3QgcG9pbnQgd2l0aGluIHRoaXMgc2VyaWVzXHJcbiAgICAgICAgICAgIGxldCBuZWFyZXN0UG9pbnRJbmZvID0gdGhpcy5maW5kTmVhcmVzdFhZUG9pbnQoZWZmZWN0aXZlU2VyaWVzUG9pbnRzLCBjdXJzb3JQb2ludCx4QXhpcyx5QXhpcyk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZ3JhYiBvbmUgaW5wdXQgZGF0YSBzZXJpZXMgdG8gZ2V0IGFjY2VzcyB0byB0aGUgdGltZXN0YW1wcy5cclxuICAgICAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm8gPSB0aGlzLnNlcmllc1t0aGlzLmRyYWdnZWRTZXJpZXNJbmRleF0uY2FsY3VsYXRpb25EYXRhSW5mbztcclxuICAgICAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGlucHV0U2VyaWVzUG9pbnRzID0gY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFbMF0uZ2V0RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgbmVhcmVzdCB0aW1lc3RhbXAgZnJvbSB0aGlzIHNlcmllcy4gVGhlIGlucHV0IGRhdGFzIHggdmx1ZXMgcmVwcmVzZW50IHRoZSB0aW1lc3RhbXBzLlxyXG4gICAgICAgICAgICAgICAgbGV0IG5lYXJlc3RUaW1lc3RhbXAgPSBpbnB1dFNlcmllc1BvaW50c1tuZWFyZXN0UG9pbnRJbmZvLnBvaW50SW5kZXhdLng7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5lYXJlc3RUaW1lc3RhbXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyB0aGUgbmVhcmVzdCBwb2ludCBpbiBhbGwgYXZhbGliYWxlIHNlcmllcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQb2ludH0gY3Vyc29yUG9pbnRcclxuICAgICAqIEByZXR1cm5zIHtOZWFyZXN0UG9pbnRJbmZvfVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTmVhcmVzdFNlcmllc1BvaW50SW5TZXJpZXMoY3Vyc29yUG9pbnQ6IFBvaW50LCBzZXJpZXMgOiBDaGFydFZpZXdTZXJpZVtdKTogTmVhcmVzdFBvaW50SW5mbyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjaGFydHMgeC1BeGlzXHJcbiAgICAgICAgbGV0IHhBeGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjaGFydHMgeS1BeGlzXHJcbiAgICAgICAgbGV0IHlBeGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMuc2NhbGVzWzBdLmlkKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IGZvciBjb2xsZWN0aW5nIHRoZSBuZWFyZXN0IHBvaW50IGluZm9zXHJcbiAgICAgICAgbGV0IG5lYXJlc3RYWVNlcmllc1BvaW50SW5mb3M6IE5lYXJlc3RQb2ludEluZm9bXSA9IHRoaXMuZmluZE5lYXJlc3RQb2ludHNJblNlcmllcyhzZXJpZXMsY3Vyc29yUG9pbnQsIHhBeGlzLCB5QXhpcyk7XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBjb2xsZWN0ZWQgbmVhcmVzdCBwb2ludCBkaXN0YW5jZXNcclxuICAgICAgICBjb25zdCBuZWFyZXN0U2VyaWVzUG9pbnRJbmZvID0gdGhpcy5nZXROZWFyZXN0UG9pbnRPZkFsbFNlcmllcyhuZWFyZXN0WFlTZXJpZXNQb2ludEluZm9zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RTZXJpZXNQb2ludEluZm87XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgYSBuZWFyZXN0IHBvaW50IHdpdGhpbiBhIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSB4eVJhd1BvaW50c1xyXG4gICAgICogQHBhcmFtIHtQb2ludH0gY2hhcnRQb2ludFxyXG4gICAgICogQHBhcmFtIHsqfSB4QXhpc1xyXG4gICAgICogQHBhcmFtIHsqfSB5QXhpc1xyXG4gICAgICogQHJldHVybnMge05lYXJlc3RQb2ludEluZm99XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmROZWFyZXN0WFlQb2ludCh4eVJhd1BvaW50czpJUG9pbnRbXSwgY2hhcnRQb2ludDpQb2ludCAseEF4aXM6SUNoYXJ0QXhpcyx5QXhpczpJQ2hhcnRBeGlzKTogTmVhcmVzdFBvaW50SW5mbyB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgeC1heGlzIHJhbmdlXHJcbiAgICAgICAgY29uc3QgeEF4aXNSYW5nZSA9IHhBeGlzLmdldEF4aXNSYW5nZSgpO1xyXG4gICAgICAgIC8vIGdldCB0aGUgY2hhcnQgeCBheGlzIHBpeGVsIHJhbmdlXHJcbiAgICAgICAgY29uc3QgeEF4aXNQaXhlbFJhbmdlID0geEF4aXMuZ2V0QXhpc1JhbmdlSW5QaXhlbCgpO1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgeCAtIHBpeGVsL3VuaXQgcmF0aW9cclxuICAgICAgICBjb25zdCB4UGl4ZWxzUGVyVW5pdCA9ICh4QXhpc1BpeGVsUmFuZ2UubWF4LXhBeGlzUGl4ZWxSYW5nZS5taW4pLyh4QXhpc1JhbmdlLm1heCAtIHhBeGlzUmFuZ2UubWluKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIHktYXhpcyByYW5nZVxyXG4gICAgICAgIGNvbnN0IHlBeGlzUmFuZ2UgPSB5QXhpcy5nZXRBeGlzUmFuZ2UoKTtcclxuICAgICAgICAvLyBnZXQgdGhlIGNoYXJ0IHkgYXhpcyBwaXhlbCByYW5nZVxyXG4gICAgICAgIGNvbnN0IHlBeGlzUGl4ZWxSYW5nZSA9IHlBeGlzLmdldEF4aXNSYW5nZUluUGl4ZWwoKTtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHkgLSBwaXhlbC91bml0IHJhdGlvXHJcbiAgICAgICAgY29uc3QgeVBpeGVsc1BlclVuaXQgPSAgICh5QXhpc1BpeGVsUmFuZ2UubWF4LXlBeGlzUGl4ZWxSYW5nZS5taW4pIC8gKHlBeGlzUmFuZ2UubWF4IC0geUF4aXNSYW5nZS5taW4pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYSBpbml0aWFsIG5lYXJlc3QgcG9pbnQgaW5mby5cclxuICAgICAgICBjb25zdCBuZWFyZXN0UG9pbnRJbmZvOiBOZWFyZXN0UG9pbnRJbmZvID0gdGhpcy5nZXRNaW5TcXVhcmVkRGlzdGFuY2VQb2ludEluZm8oeHlSYXdQb2ludHMsIGNoYXJ0UG9pbnQsIHhQaXhlbHNQZXJVbml0LCB5UGl4ZWxzUGVyVW5pdCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZWFyZXN0UG9pbnRJbmZvO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1pbmltYWwgc3F1YXJlZCBkaXN0YW5jZSBvZiB0aGUgc3BlY2lmaWVkIHBvaW50IHdpdGhpbiB0aGUgcG9pbnRzIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSB4eVJhd1BvaW50c1xyXG4gICAgICogQHBhcmFtIHtQb2ludH0gY2hhcnRQb2ludFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhQaXhlbHNQZXJVbml0XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVBpeGVsc1BlclVuaXRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1pblNxdWFyZWREaXN0YW5jZVBvaW50SW5mbyh4eVJhd1BvaW50czogSVBvaW50W10sIGNoYXJ0UG9pbnQ6IFBvaW50LCB4UGl4ZWxzUGVyVW5pdDogbnVtYmVyLCB5UGl4ZWxzUGVyVW5pdDogbnVtYmVyKSB7XHJcbiAgICAgICBcclxuICAgICAgICBjb25zdCBuZWFyZXN0UG9pbnRJbmZvOiBOZWFyZXN0UG9pbnRJbmZvID0geyBzZXJpZXNJbmRleDogMCwgcG9pbnRJbmRleDogMCwgZGlzdGFuY2VTcXVhcmVkOiBOdW1iZXIuTUFYX1ZBTFVFIH07XHJcbiAgICAgICAgLy8gZmluZCB0aGUgc21hbGxlc3QgZGlzdGFuY2UgdG8gdGhlIHNlcmllcyBwb2ludFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeHlSYXdQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSB4IGRpc3RhbmNlIFxyXG4gICAgICAgICAgICBsZXQgZHggPSAoeHlSYXdQb2ludHNbaV0ueCAtIGNoYXJ0UG9pbnQueCkgKiB4UGl4ZWxzUGVyVW5pdDtcclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSB5IGRpc3RhbmNlXHJcbiAgICAgICAgICAgIGxldCBkeSA9ICh4eVJhd1BvaW50c1tpXS55IC0gY2hhcnRQb2ludC55KSAqIHlQaXhlbHNQZXJVbml0O1xyXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIDJEIGRpc3RhbmNlIHRvIHRoZSBwb2ludFxyXG4gICAgICAgICAgICBsZXQgcG9pbnRUb1Nlcmllc0Rpc3RhbmNlU3F1YXJlZCA9IGR4ICogZHggKyBkeSAqIGR5O1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIG5lYXJlc3QgcG9pbnQgaW5mbyBpZiB0aGUgZGlzdGFuY2UgaXMgc21hbGxlciB0aGVuIHRoZSBhbHJlYWR5IGV4aXN0aW5nIG9uZS4gXHJcbiAgICAgICAgICAgIGlmIChwb2ludFRvU2VyaWVzRGlzdGFuY2VTcXVhcmVkIDwgbmVhcmVzdFBvaW50SW5mby5kaXN0YW5jZVNxdWFyZWQpIHtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RQb2ludEluZm8uZGlzdGFuY2VTcXVhcmVkID0gcG9pbnRUb1Nlcmllc0Rpc3RhbmNlU3F1YXJlZDtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RQb2ludEluZm8ucG9pbnRJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RQb2ludEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2cyB0aGUgcG9pbnQgd2hpY2ggaXMgdGhlIG5lYXJlc3QgaW4gYWxsIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge05lYXJlc3RQb2ludEluZm9bXX0gbmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TmVhcmVzdFBvaW50T2ZBbGxTZXJpZXMobmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvczogTmVhcmVzdFBvaW50SW5mb1tdKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIGNvbGxlY3RlZCBuZWFyZXN0IHBvaW50IGRpc3RhbmNlc1xyXG4gICAgICAgIGNvbnN0IHBvaW50VG9TZXJpZXNEaXN0YW5jZXMgPSBuZWFyZXN0WFlTZXJpZXNQb2ludEluZm9zLm1hcCgobmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvKSA9PiB7IHJldHVybiBuZWFyZXN0WFlTZXJpZXNQb2ludEluZm8uZGlzdGFuY2VTcXVhcmVkOyB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIHNtYWxsZXN0IG9uZS4uLiAgICAgICAgXHJcbiAgICAgICAgY29uc3Qgc21hbGxlc3RQb2ludFRvU2VyaWVzRGlzdGFuY2UgPSBNYXRoWC5taW4ocG9pbnRUb1Nlcmllc0Rpc3RhbmNlcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgc21hbGxlc3Qgb25lLi4uXHJcbiAgICAgICAgLy8gdGhlIG5lYXJlc3QgZGlzdGFuY2UgaW5kZXggZGlyZWN0bHkgbWF0Y2hlcyB0aGUgc2VyaWVzIGluZGV4IGJlY2F1c2UgdGhlIG9yZGVyIHdpdGhpbiB0aGUgYXJyYXlzIGlzIHRoZSBzYW1lLlxyXG4gICAgICAgIGNvbnN0IG5lYXJlc3RTZXJpZXNJbmRleCA9IG5lYXJlc3RYWVNlcmllc1BvaW50SW5mb3MuZmluZEluZGV4KChuZWFyZXN0WFlTZXJpZXNQb2ludEluZm8pID0+IHsgcmV0dXJuIG5lYXJlc3RYWVNlcmllc1BvaW50SW5mby5kaXN0YW5jZVNxdWFyZWQgPT09IHNtYWxsZXN0UG9pbnRUb1Nlcmllc0Rpc3RhbmNlOyB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIG5lYXJlc3QgcG9pbnQgaW5mb3Mgc2VyaWVzIGluZGV4XHJcbiAgICAgICAgY29uc3QgbmVhcmVzdFNlcmllc1BvaW50SW5mbyA9IG5lYXJlc3RYWVNlcmllc1BvaW50SW5mb3NbbmVhcmVzdFNlcmllc0luZGV4XTtcclxuICAgICAgICBuZWFyZXN0U2VyaWVzUG9pbnRJbmZvLnNlcmllc0luZGV4ID0gbmVhcmVzdFNlcmllc0luZGV4O1xyXG4gICAgICAgIHJldHVybiBuZWFyZXN0U2VyaWVzUG9pbnRJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgdGhlIG5lYXJlc3QgcG9pbnRzIGluIHRoZSBzcGVjaWZpZWQgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UG9pbnR9IGN1cnNvclBvaW50XHJcbiAgICAgKiBAcGFyYW0geyBJQ2hhcnRBeGlzIHwgdW5kZWZpbmVkfSB4QXhpc1xyXG4gICAgICogQHBhcmFtIHsgSUNoYXJ0QXhpcyB8IHVuZGVmaW5lZH0geUF4aXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmROZWFyZXN0UG9pbnRzSW5TZXJpZXMoc2VyaWVzOiBDaGFydFZpZXdTZXJpZVtdLCBjdXJzb3JQb2ludDogUG9pbnQsIHhBeGlzOiBJQ2hhcnRBeGlzIHwgdW5kZWZpbmVkLCB5QXhpczogSUNoYXJ0QXhpcyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBuZWFyZXN0WFlTZXJpZXNQb2ludEluZm9zOiBOZWFyZXN0UG9pbnRJbmZvW10gPSBbXTtcclxuICAgICAgICBpZiAoeEF4aXMgJiYgeUF4aXMpIHtcclxuICAgICAgICAgICAgLy8gY29sbGVjdCB0aGUgbmVhcmVzdCBwb2ludCBpbmZvcyBvZiBhbGwgc2VyaWVzXHJcbiAgICAgICAgICAgIHNlcmllcy5mb3JFYWNoKChzZXJpZXMpID0+IHsgbmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvcy5wdXNoKHRoaXMuZmluZE5lYXJlc3RYWVBvaW50KHNlcmllcy5zZXJpZS5yYXdQb2ludHMsIGN1cnNvclBvaW50LCB4QXhpcywgeUF4aXMpKTsgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZWFyZXN0WFlTZXJpZXNQb2ludEluZm9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIGNoYXJ0IHBvaW50IGZvciB0aGUgc3BlY2lmaWVkIHRpbWVzdGFtcFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcmV0dXJucyB7UG9pbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRDdXJzb3JQb2ludCh0aW1lc3RhbXA6IG51bWJlciwgc2VyaWVzIDogQ2hhcnRWaWV3U2VyaWVbXSwgc2VyaWVzSW5kZXg6bnVtYmVyKTogVGltZVBvaW50e1xyXG4gICAgICAgIGxldCBzZXJpZXNUaW1lc3RhbXBJbmRleCA9IHNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUuZ2V0VGltZXN0YW1wSW5kZXgodGltZXN0YW1wKTtcclxuICAgICAgICBsZXQgc2VyaWVzUG9pbnQgPSBzZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnJhd1BvaW50c1tzZXJpZXNUaW1lc3RhbXBJbmRleF07XHJcbiAgICAgICAgcmV0dXJuIHt0aW1lc3RhbXA6IHNlcmllc1tzZXJpZXNJbmRleF0uY2FsY3VsYXRpb25EYXRhSW5mbyEuaW5wdXREYXRhWzBdLmdldERhdGEoKVtzZXJpZXNUaW1lc3RhbXBJbmRleF0ueCx4OiBzZXJpZXNQb2ludC54LHk6IHNlcmllc1BvaW50Lnl9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1heCB4IHZhbHVlIGZyb20gYWxsIHNlcmllcyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRvdGFsTWF4WCh0cmFjZUNoYXJ0TGlzdCk6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1heFg6IG51bWJlcnx1bmRlZmluZWQgPSB1bmRlZmluZWRcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcmllc1tpXSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGlmIChtYXhYID09IHVuZGVmaW5lZCB8fCB0aGlzLnNlcmllc1tpXS5tYXhYISA+IG1heFgpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFggPSB0aGlzLnNlcmllc1tpXS5tYXhYO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhYXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWluIHggdmFsdWUgZnJvbSBhbGwgc2VyaWVzIGluIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VG90YWxNaW5YKHRyYWNlQ2hhcnRMaXN0KTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWluWDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VyaWVzW2ldICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pblggPT0gdW5kZWZpbmVkIHx8IHRoaXMuc2VyaWVzW2ldLm1pblghIDwgbWluWCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluWCA9IHRoaXMuc2VyaWVzW2ldLm1pblg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtaW5YXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgZHJvcCBsb2NhdGlvbnMgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2VyaWVEcm9wTG9jYXRpb25zKHNlcmllOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnRNYW5hZ2VyQ2hhcnQpe1xyXG4gICAgICAgIGlmICghY2hhcnRNYW5hZ2VyQ2hhcnQuY2hpbGRzWzBdLmRyb3BQb3NzaWJsZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZUNoYXJ0RHJvcExvY2F0aW9ucyhzZXJpZVswXSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkIGRyb3AgbG9jYXRpb25zIGluIHRoZSBjaGFydCBhcmVhXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgWVRDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllQ2hhcnREcm9wTG9jYXRpb25zKHNlcmllOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBpZihzZXJpZS5uYW1lKXtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFdpZHRoID0gMTguNDtcclxuICAgICAgICAgICAgbGV0IHBhcmVudENvbnRhaW5lciA9ICQodGhpcy5tYWluRGl2KTtcclxuICAgICAgICAgICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZCgnPGRpdiBpZD1cIicrIHRoaXMuYXhpc0Ryb3Bab25lSWQgK1wiX2NoYXJ0QXJlYVwiKydcIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlOyB3aWR0aDogJysgKHBhcmVudENvbnRhaW5lci53aWR0aCgpIS0gb2Zmc2V0V2lkdGgpICsgJ3B4OyBoZWlnaHQ6ICcrIChwYXJlbnRDb250YWluZXIuaGVpZ2h0KCkhKSArJ3B4OyB0b3A6IDBweFwiOyBjbGFzcz1cImRyb3BMb2NhdGlvbkFyZWFcIj48L2Rpdj4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFnZVhcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFnZVlcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb1Bhbm5pbmcocGFnZVgsIHBhZ2VZKXtcclxuICAgICAgICBzdXBlci5kb1Bhbm5pbmcocGFnZVgsIHBhZ2VZKTtcclxuICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IGRyb3AgbG9jYXRpb24gdHlwZSAoZS5nLiBhc3NpZ24gdG8gc2NhbGUsIGFkZCBuZXcgc2NhbGUsIGludmFsaWQgZm9yIGRyb3ApXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Ryb3BMb2NhdGlvblR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RHJvcExvY2F0aW9uVHlwZShjdXJyZW50VGFyZ2V0KTogRHJvcExvY2F0aW9uVHlwZXtcclxuICAgICAgICByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5hc3NpZ25Ub1NjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlnaGxpZ2h0IGRyb3BwYWJsZSBhcmVhcyBpZiBhIHZhbGlkIHNpZ25hbCBpcyBkcmFnZ2VkIG92ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnJlbnRUYXJnZXRcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVEcm9wcGFibGVBcmVhcyhjdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVfY2hhcnRBcmVhXCIpKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuYXhpc0Ryb3Bab25lQ2hhcnRBcmVhSWQpO1xyXG4gICAgICAgICAgICBpZihjaGFydEFyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFydEFyZWEhLmNsYXNzTGlzdC5hZGQoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgaGlnaGxpZ2h0ZWQgYXJlYXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXRIaWdobGlnaHRpbmcoKXtcclxuICAgICAgICBsZXQgY2hhcnRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5heGlzRHJvcFpvbmVJZCk7XHJcbiAgICAgICAgaWYoY2hhcnRBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaGFydEFyZWEhLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0U2NhbGVSYW5nZShzY2FsZTogU2NhbGUsIG1pblhWYWx1ZTogbnVtYmVyLCBtYXhYVmFsdWU6IG51bWJlciwgbWluWVZhbHVlOiBudW1iZXIsIG1heFlWYWx1ZTogbnVtYmVyLCBvcmllbnRhdGlvbj86IHN0cmluZywgc2V0QXhpc1JhbmdlID0gdHJ1ZSl7XHJcbiAgICAgICAgc3VwZXIuc2V0U2NhbGVSYW5nZShzY2FsZSxtaW5YVmFsdWUsIG1heFhWYWx1ZSwgbWluWVZhbHVlLCBtYXhZVmFsdWUsIG9yaWVudGF0aW9uLCBzZXRBeGlzUmFuZ2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCcgJiYgc2V0QXhpc1JhbmdlID09IHRydWUpe1xyXG4gICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgICAgICBpZiggYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgYXhpcy5zZXRBeGlzUmFuZ2Uoe21pbjogc2NhbGUubWluWFZhbHVlLCBtYXg6IHNjYWxlLm1heFhWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRTZXJpZXNUb0NoYXJ0KHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIHNjYWxlOiBTY2FsZSwgdXBkYXRlUmFuZ2VYIDogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IHJlc2V0WFJhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5zZXJpZXMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICByZXNldFhSYW5nZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmFkZFNlcmllc1RvQ2hhcnQoc2VyaWVzLCBzY2FsZSwgdXBkYXRlUmFuZ2VYKTtcclxuICAgICAgICBpZihyZXNldFhSYW5nZSAmJiB1cGRhdGVSYW5nZVggPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIG5ldyBDaGFydFJhbmdlSGVscGVyKCkucmVzZXRYUmFuZ2VzQWxsQ2hhcnRUeXBlcyhbdGhpc10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB1c2VkIGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUN1cnNvclN0YXRlPn1cclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRVc2VkQ3Vyc29yU3RhdGVzKCk6IEFycmF5PElDdXJzb3JTdGF0ZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0VGltZVN0YXRlcygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBYWUNoYXJ0IH07XHJcblxyXG4iXX0=