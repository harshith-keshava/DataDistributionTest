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
define(["require", "exports", "./ChartBase", "../../common/seriesHelper", "./chartExtensions/chartExtensions"], function (require, exports, ChartBase_1, seriesHelper_1, chartExtensions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BasicChart = /** @class */ (function (_super) {
        __extends(BasicChart, _super);
        function BasicChart(parentView, name, scale) {
            return _super.call(this, parentView, name, scale) || this;
        }
        /**
         * dispose chart
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.dispose = function () {
            this.removeWidgetFromView(this.parentView);
            _super.prototype.dispose.call(this);
        };
        /**
         *
         *
         * @protected
         * @param {IView} parentView
         * @memberof BasicChart
         */
        BasicChart.prototype.addWidgetToView = function (parentView) {
            if (parentView) {
                parentView.addWidget(this);
            }
        };
        /**
         *
         *
         * @private
         * @param {ChartViewChartManager} chartManager
         * @memberof BasicChart
         */
        BasicChart.prototype.removeWidgetFromView = function (parentView) {
            if (parentView) {
                parentView.removeWidget(this);
            }
        };
        BasicChart.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initializeCursorHandlers();
            this.attachChartExtensions(this.chartInstance);
            this.xAxisWidth = this.chart.getXAxisWidth();
        };
        /**
         * Reinitializes the chart
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.reinitialize = function () {
            _super.prototype.reinitialize.call(this);
            this.setAvailableSeriesAsDataSource();
            this.attachChartExtensions(this.chartInstance);
            this.xAxisWidth = this.chart.getXAxisWidth();
            this.cursorHandler = undefined;
            this.initializeCursorHandlers();
        };
        /**
         * Attaches a extension instance
         *
         * @private
         * @param {*} chartInstance
         * @memberof BasicChart
         */
        BasicChart.prototype.attachChartExtensions = function (chartInstance) {
            // inject an extension provider
            var basicChartExtensions = new chartExtensions_1.ChartExtensions(this);
            // use an yt/fft optimization algorithm
            basicChartExtensions.chartDataOptimizer.trimSeriesForChartBounds = basicChartExtensions.chartDataOptimizer.trimSeriesForChartBoundsYt;
            // set the chart extensions
            chartInstance.chartExtensions = basicChartExtensions;
        };
        /**
         * Send data of the series to the chart instance
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.setAvailableSeriesAsDataSource = function () {
            var traceDataSeries = new Array();
            for (var i = 0; i < this.scales.length; i++) {
                for (var j = 0; j < this.scales[i].childs.length; j++) {
                    if (this.scales[i].childs[j].rawPointsValid) {
                        var effectiveSerie = this.chartInstance.chartExtensions ? this.chartInstance.chartExtensions.chartDataOptimizer.attachSeries(this.scales[i].childs[j]) : this.scales[i].childs[j];
                        traceDataSeries.push(this.chart.createTraceDataSeries(effectiveSerie, this.scales[i].id));
                    }
                }
            }
            this.chart.setSeries(traceDataSeries);
        };
        /**
         * Adds a new y axis into the chart
         *
         * @param {Scale} yAxis
         * @param {boolean} opposedPosition
         * @param {string} color
         * @memberof BasicChart
         */
        BasicChart.prototype.addYScale = function (scale, position) {
            var newAxisWidth = 71;
            this.chart.addYAxis(scale.id, scale.minYValue, scale.maxYValue, position);
            this.xAxisWidth = this.chart.getXAxisWidth() - newAxisWidth;
            if (this.scales.indexOf(scale) == -1) {
                this.scales.push(scale);
            }
        };
        /**
         *
         *
         * @param {Scale} yScale
         * @memberof BasicChart
         */
        BasicChart.prototype.removeYScaleFromChart = function (yScale) {
            this.chart.removeYAxis(yScale.id);
            this.chart.redraw();
            this.xAxisWidth = this.chart.getXAxisWidth();
            var scaleIndex = this.scales.indexOf(yScale);
            if (scaleIndex > -1) {
                this.scales.splice(scaleIndex, 1);
            }
        };
        /**
         *
         *
         * @param {*} referenceAxis
         * @param {number} min
         * @param {number} max
         * @memberof BasicChart
         */
        BasicChart.prototype.onSynchronizeScaleRange = function (scale, min, max) {
            var yScales = this.getYScales();
            for (var _i = 0, yScales_1 = yScales; _i < yScales_1.length; _i++) {
                var yScale = yScales_1[_i];
                yScale.minXValue = min;
                yScale.maxXValue = max;
            }
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                axis.setAxisRange({ min: min, max: max });
            }
        };
        BasicChart.prototype.getTimestampInSeries = function (point, availableSeries) {
            // get the points of the available series
            // get the timestamps series from the signal series
            var timestampSeries;
            timestampSeries = availableSeries.map(function (singleSeries) { return singleSeries.serie.timestamps; });
            var nearestPoint = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(point.x, timestampSeries);
            return nearestPoint;
        };
        /**
         * Gets a chart point for the specified timestamp
         *
         * @private
         * @param {number} leadCursorTimeStamp
         * @returns {Point}
         * @memberof BasicChart
         */
        BasicChart.prototype.getCursorPoint = function (timestamp, series, seriesIndex) {
            var cursorPoint = series[seriesIndex].serie.previousPointFromTimestamp(timestamp);
            return { timestamp: cursorPoint.x, x: cursorPoint.x, y: cursorPoint.y };
        };
        /**
         *
         *
         * @protected
         * @param {{ x: number, y: number}} currPos
         * @param {{ x: number, y: number}} clickPos
         * @returns {number}
         * @memberof BasicChart
         */
        BasicChart.prototype.absDistanceToCursor = function (currPos, clickPos) {
            return Math.sqrt(Math.pow(clickPos.x - currPos.x, 2));
        };
        ;
        /**
         * Add drop locations in the chart
         *
         * @param {Array<BaseSeries>} serie
         * @returns
         * @memberof BasicChart
         */
        BasicChart.prototype.addSerieDropLocations = function (serie, chartManagerChart) {
            if (chartManagerChart.childs[0].dropPossible) {
                this.addSerieYAxisDropLocations(serie[0]);
            }
            if (chartManagerChart.dropPossible) {
                this.addSerieChartAreaDropLocations(serie[0]);
            }
        };
        /**
         * Add drop locations to the y axis
         *
         * @private
         * @param {*} data
         * @memberof BasicChart
         */
        BasicChart.prototype.addSerieYAxisDropLocations = function (data) {
            if (data.name)
                this.calculateChartDimensions();
            for (var _i = 0, _a = this.axisBounds; _i < _a.length; _i++) {
                var axisBound = _a[_i];
                var offsetWidth = 4;
                var offsetLeft = 2;
                if (axisBound.axis.orientation == "vertical") {
                    $(this.mainDiv).append('<div id="' + this.axisDropZoneId + axisBound.axis.name + '" style="position:absolute; width: ' + (axisBound.width - offsetWidth) + 'px; height: ' + (axisBound.height) + 'px; left:' + (axisBound.x + offsetLeft) + 'px; top:' + (axisBound.y) + 'px" class="dropLocationArea"></div>');
                }
            }
        };
        /**
         * Add drop locations in the chart area
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof BasicChart
         */
        BasicChart.prototype.addSerieChartAreaDropLocations = function (serie) {
            var maximumYAxis = 2;
            if (serie.name)
                if (this.scales.length < maximumYAxis) {
                    var chartArea = this.chart.getChartArea();
                    $(this.mainDiv).append('<div id="' + this.axisDropZoneId + "_chartArea" + '" style="z-index: 5; position:absolute; width: ' + (chartArea.width) + 'px; height: ' + (chartArea.height) + 'px; left:' + (chartArea.x) + 'px; top:' + (chartArea.y) + 'px" class="dropLocationArea"></div>');
                }
        };
        /**
        * Returns the current drop location type (e.g. assign to scale, add new scale, invalid for drop)
        *
        * @param {*} currentTarget
        * @returns {DropLocationType}
        * @memberof BasicChart
        */
        BasicChart.prototype.getDropLocationType = function (currentTarget) {
            if (currentTarget.id.includes("_axisDropZoneScale")) {
                return ChartBase_1.DropLocationType.assignToScale;
            }
            if (currentTarget.id.includes("_axisDropZone_chartArea") && this.scales.length < 2) {
                return ChartBase_1.DropLocationType.addNewScale;
            }
            return ChartBase_1.DropLocationType.invalid;
        };
        /**
         * Highlight droppable areas if a valid signal is dragged over
         *
         * @param {*} currentTarget
         * @memberof BasicChart
         */
        BasicChart.prototype.updateDroppableAreas = function (currentTarget) {
            if (currentTarget.id.includes("_axisDropZone_chartArea") || currentTarget.id.includes("_refCursor_")) {
                var chartArea = document.getElementById(this.axisDropZoneChartAreaId);
                if (chartArea != undefined) {
                    chartArea.classList.add('draggedOver');
                }
                for (var i = 0; i < this.scales.length; i++) {
                    var axisArea = document.getElementById(this.axisDropZoneId + this.scales[i].id);
                    if (axisArea != undefined) {
                        axisArea.classList.remove('draggedOver');
                    }
                }
            }
            else if (currentTarget.id.includes("_axisDropZoneScale")) {
                for (var i = 0; i < this.scales.length; i++) {
                    if (currentTarget.id.includes(this.scales[i].id)) {
                        var axisArea = document.getElementById(this.axisDropZoneId + this.scales[i].id);
                        if (axisArea != undefined) {
                            axisArea.classList.add('draggedOver');
                        }
                    }
                    else {
                        var axisArea = document.getElementById(this.axisDropZoneId + this.scales[i].id);
                        if (axisArea != undefined) {
                            axisArea.classList.remove('draggedOver');
                        }
                    }
                }
                var chartArea = document.getElementById(this.axisDropZoneChartAreaId);
                if (chartArea != undefined) {
                    chartArea.classList.remove('draggedOver');
                }
            }
        };
        ;
        /**
         * Reset highlighted areas
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.resetHighlighting = function () {
            var chartArea = document.getElementById(this.axisDropZoneChartAreaId);
            if (chartArea != undefined) {
                chartArea.classList.remove('draggedOver');
            }
            for (var i = 0; i < this.scales.length; i++) {
                var axisArea = document.getElementById(this.axisDropZoneId + this.scales[i].id);
                if (axisArea != undefined) {
                    axisArea.classList.remove('draggedOver');
                }
            }
        };
        BasicChart.prototype.initializeCursorHandlers = function () { };
        return BasicChart;
    }(ChartBase_1.ChartBase));
    exports.BasicChart = BasicChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9CYXNpY0NoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZQTtRQUFrQyw4QkFBUztRQUl2QyxvQkFBWSxVQUFpQixFQUFFLElBQVksRUFBRSxLQUFjO21CQUN2RCxrQkFBTSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLDRCQUFPLEdBQWQ7WUFDSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDTyxvQ0FBZSxHQUF6QixVQUEwQixVQUFrQjtZQUN4QyxJQUFJLFVBQVUsRUFBRTtnQkFDWixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHlDQUFvQixHQUE1QixVQUE2QixVQUFpQjtZQUMxQyxJQUFJLFVBQVUsRUFBRTtnQkFDWixVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztRQUVELGdDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRS9DLElBQUksQ0FBQyxVQUFVLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNsRCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLGlDQUFZLEdBQW5CO1lBQ0ksaUJBQU0sWUFBWSxXQUFFLENBQUM7WUFDckIsSUFB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LENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3lCQUM3QztxQkFDSjtpQkFDSjtnQkFFRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUN0RSxJQUFHLFNBQVMsSUFBSSxTQUFTLEVBQUU7b0JBQ3ZCLFNBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUM5QzthQUNKO1FBQ0wsQ0FBQztRQUFBLENBQUM7UUFFRjs7OztXQUlHO1FBQ0ksc0NBQWlCLEdBQXhCO1lBQ0ksSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN0RSxJQUFHLFNBQVMsSUFBSSxTQUFTLEVBQUU7Z0JBQ3ZCLFNBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN2QyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEYsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFFO29CQUN0QixRQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDN0M7YUFDSjtRQUNMLENBQUM7UUFFUyw2Q0FBd0IsR0FBbEMsY0FBdUMsQ0FBQztRQUU1QyxpQkFBQztJQUFELENBQUMsQUFoVkQsQ0FBa0MscUJBQVMsR0FnVjFDO0lBRVEsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydEJhc2UsIERyb3BMb2NhdGlvblR5cGUsIFRpbWVQb2ludCB9IGZyb20gXCIuL0NoYXJ0QmFzZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQXhpc1Bvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0RXh0ZW5zaW9ucyB9IGZyb20gXCIuL2NoYXJ0RXh0ZW5zaW9ucy9jaGFydEV4dGVuc2lvbnNcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySGFuZGxlciB9IGZyb20gXCIuL2N1cnNvci9DdXJzb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1NlcmllIH0gZnJvbSBcIi4vY2hhcnRWaWV3U2VyaWVcIjtcclxuaW1wb3J0IHsgSVZpZXcgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvdmlld0ludGVyZmFjZVwiO1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzaWNDaGFydCBleHRlbmRzIENoYXJ0QmFzZXtcclxuICAgIFxyXG4gICAgYWJzdHJhY3QgY3Vyc29ySGFuZGxlcjogQ3Vyc29ySGFuZGxlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50VmlldzogSVZpZXcsIG5hbWU6IHN0cmluZywgc2NhbGU6IFNjYWxlW10pIHtcclxuICAgICAgICBzdXBlcihwYXJlbnRWaWV3LCBuYW1lLCBzY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkaXNwb3NlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLnJlbW92ZVdpZGdldEZyb21WaWV3KHRoaXMucGFyZW50Vmlldyk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0lWaWV3fSBwYXJlbnRWaWV3XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWRkV2lkZ2V0VG9WaWV3KHBhcmVudFZpZXcgOiBJVmlldykge1xyXG4gICAgICAgIGlmIChwYXJlbnRWaWV3KSB7XHJcbiAgICAgICAgICAgIHBhcmVudFZpZXcuYWRkV2lkZ2V0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRWaWV3Q2hhcnRNYW5hZ2VyfSBjaGFydE1hbmFnZXJcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlV2lkZ2V0RnJvbVZpZXcocGFyZW50VmlldzogSVZpZXcpIHtcclxuICAgICAgICBpZiAocGFyZW50Vmlldykge1xyXG4gICAgICAgICAgICBwYXJlbnRWaWV3LnJlbW92ZVdpZGdldCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUN1cnNvckhhbmRsZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hDaGFydEV4dGVuc2lvbnModGhpcy5jaGFydEluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgdGhpcy54QXhpc1dpZHRoID0gIHRoaXMuY2hhcnQuZ2V0WEF4aXNXaWR0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVpbml0aWFsaXplcyB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVpbml0aWFsaXplKCkge1xyXG4gICAgICAgIHN1cGVyLnJlaW5pdGlhbGl6ZSgpOyBcclxuICAgICAgICB0aGlzLnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoQ2hhcnRFeHRlbnNpb25zKHRoaXMuY2hhcnRJbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIHRoaXMueEF4aXNXaWR0aCA9ICB0aGlzLmNoYXJ0LmdldFhBeGlzV2lkdGgoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUN1cnNvckhhbmRsZXJzKCk7IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoZXMgYSBleHRlbnNpb24gaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjaGFydEluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaENoYXJ0RXh0ZW5zaW9ucyhjaGFydEluc3RhbmNlOiBhbnkpIHtcclxuXHJcbiAgICAgICAgLy8gaW5qZWN0IGFuIGV4dGVuc2lvbiBwcm92aWRlclxyXG4gICAgICAgIGxldCBiYXNpY0NoYXJ0RXh0ZW5zaW9ucyA9IG5ldyBDaGFydEV4dGVuc2lvbnModGhpcyk7XHJcbiAgICAgICAgLy8gdXNlIGFuIHl0L2ZmdCBvcHRpbWl6YXRpb24gYWxnb3JpdGhtXHJcbiAgICAgICAgYmFzaWNDaGFydEV4dGVuc2lvbnMuY2hhcnREYXRhT3B0aW1pemVyLnRyaW1TZXJpZXNGb3JDaGFydEJvdW5kcyA9IGJhc2ljQ2hhcnRFeHRlbnNpb25zLmNoYXJ0RGF0YU9wdGltaXplci50cmltU2VyaWVzRm9yQ2hhcnRCb3VuZHNZdDtcclxuICAgICAgICAvLyBzZXQgdGhlIGNoYXJ0IGV4dGVuc2lvbnNcclxuICAgICAgICBjaGFydEluc3RhbmNlLmNoYXJ0RXh0ZW5zaW9ucyA9IGJhc2ljQ2hhcnRFeHRlbnNpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZCBkYXRhIG9mIHRoZSBzZXJpZXMgdG8gdGhlIGNoYXJ0IGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpIHtcclxuICAgICAgICBsZXQgdHJhY2VEYXRhU2VyaWVzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuc2NhbGVzW2ldLmNoaWxkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNjYWxlc1tpXS5jaGlsZHNbal0ucmF3UG9pbnRzVmFsaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlZmZlY3RpdmVTZXJpZSA9IHRoaXMuY2hhcnRJbnN0YW5jZS5jaGFydEV4dGVuc2lvbnMgPyB0aGlzLmNoYXJ0SW5zdGFuY2UuY2hhcnRFeHRlbnNpb25zLmNoYXJ0RGF0YU9wdGltaXplci5hdHRhY2hTZXJpZXModGhpcy5zY2FsZXNbaV0uY2hpbGRzW2pdKSA6IHRoaXMuc2NhbGVzW2ldLmNoaWxkc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB0cmFjZURhdGFTZXJpZXMucHVzaCh0aGlzLmNoYXJ0LmNyZWF0ZVRyYWNlRGF0YVNlcmllcyhlZmZlY3RpdmVTZXJpZSwgdGhpcy5zY2FsZXNbaV0uaWQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jaGFydC5zZXRTZXJpZXModHJhY2VEYXRhU2VyaWVzKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyB5IGF4aXMgaW50byB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSB5QXhpc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBvcHBvc2VkUG9zaXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFlTY2FsZShzY2FsZTogU2NhbGUsIHBvc2l0aW9uIDogQXhpc1Bvc2l0aW9uKXtcclxuICAgICAgICBjb25zdCBuZXdBeGlzV2lkdGggPSA3MTtcclxuICAgIFx0dGhpcy5jaGFydC5hZGRZQXhpcyhzY2FsZS5pZCwgc2NhbGUubWluWVZhbHVlLCBzY2FsZS5tYXhZVmFsdWUsIHBvc2l0aW9uKTtcclxuXHJcbiAgICBcdHRoaXMueEF4aXNXaWR0aCA9IHRoaXMuY2hhcnQuZ2V0WEF4aXNXaWR0aCgpIC0gbmV3QXhpc1dpZHRoO1xyXG5cclxuICAgICAgICBpZih0aGlzLnNjYWxlcy5pbmRleE9mKHNjYWxlKSA9PSAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGVzLnB1c2goc2NhbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHlTY2FsZVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVlTY2FsZUZyb21DaGFydCh5U2NhbGU6IFNjYWxlKXtcclxuICAgICAgICB0aGlzLmNoYXJ0LnJlbW92ZVlBeGlzKHlTY2FsZS5pZCk7XHJcbiAgICAgICAgdGhpcy5jaGFydC5yZWRyYXcoKTtcclxuXHJcbiAgICAgICAgdGhpcy54QXhpc1dpZHRoID0gdGhpcy5jaGFydC5nZXRYQXhpc1dpZHRoKCk7XHJcbiAgICAgICAgbGV0IHNjYWxlSW5kZXggPSB0aGlzLnNjYWxlcy5pbmRleE9mKHlTY2FsZSk7XHJcbiAgICAgICAgaWYgKHNjYWxlSW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlcy5zcGxpY2Uoc2NhbGVJbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHJlZmVyZW5jZUF4aXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblN5bmNocm9uaXplU2NhbGVSYW5nZShzY2FsZSA6IFNjYWxlLCBtaW46bnVtYmVyLCBtYXg6bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHlTY2FsZXMgPSB0aGlzLmdldFlTY2FsZXMoKTtcclxuICAgICAgICBmb3IobGV0IHlTY2FsZSBvZiB5U2NhbGVzKXtcclxuICAgICAgICAgICAgeVNjYWxlLm1pblhWYWx1ZSA9IG1pbjtcclxuICAgICAgICAgICAgeVNjYWxlLm1heFhWYWx1ZSA9IG1heDtcclxuICAgICAgICB9XHJcbiAgICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYXhpcy5zZXRBeGlzUmFuZ2Uoe21pbiwgbWF4fSk7XHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGdldFRpbWVzdGFtcEluU2VyaWVzKHBvaW50OiBJUG9pbnQsIGF2YWlsYWJsZVNlcmllcyA6IENoYXJ0Vmlld1NlcmllW10pIDogbnVtYmVye1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIHBvaW50cyBvZiB0aGUgYXZhaWxhYmxlIHNlcmllc1xyXG4gICAgICAgIC8vIGdldCB0aGUgdGltZXN0YW1wcyBzZXJpZXMgZnJvbSB0aGUgc2lnbmFsIHNlcmllc1xyXG4gICAgICAgIGxldCB0aW1lc3RhbXBTZXJpZXM7XHJcbiAgICAgICAgdGltZXN0YW1wU2VyaWVzPSBhdmFpbGFibGVTZXJpZXMubWFwKChzaW5nbGVTZXJpZXMpPT57IHJldHVybiBzaW5nbGVTZXJpZXMuc2VyaWUudGltZXN0YW1wc30pOyAgICAgICAgXHJcbiAgICAgICAgbGV0IG5lYXJlc3RQb2ludCA9IFNlcmllc0hlbHBlci5maW5kTmVhcmVzdFZhbHVlRnJvbUNvbGxlY3Rpb24ocG9pbnQueCwgdGltZXN0YW1wU2VyaWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RQb2ludDtcclxuICAgIH1cclxuXHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIGNoYXJ0IHBvaW50IGZvciB0aGUgc3BlY2lmaWVkIHRpbWVzdGFtcFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGVhZEN1cnNvclRpbWVTdGFtcFxyXG4gICAgICogQHJldHVybnMge1BvaW50fVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEN1cnNvclBvaW50KHRpbWVzdGFtcDogbnVtYmVyLHNlcmllczogQ2hhcnRWaWV3U2VyaWVbXSwgc2VyaWVzSW5kZXg6bnVtYmVyKTogVGltZVBvaW50IHtcclxuICAgICAgICBsZXQgY3Vyc29yUG9pbnQgPSBzZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnByZXZpb3VzUG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcCk7XHJcbiAgICAgICAgcmV0dXJuIHt0aW1lc3RhbXA6IGN1cnNvclBvaW50LngsIHg6IGN1cnNvclBvaW50LngsIHk6Y3Vyc29yUG9pbnQueSB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge3sgeDogbnVtYmVyLCB5OiBudW1iZXJ9fSBjdXJyUG9zXHJcbiAgICAgKiBAcGFyYW0ge3sgeDogbnVtYmVyLCB5OiBudW1iZXJ9fSBjbGlja1Bvc1xyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnNEaXN0YW5jZVRvQ3Vyc29yIChjdXJyUG9zOiB7IHg6IG51bWJlciwgeTogbnVtYmVyfSwgXHJcbiAgICAgICAgY2xpY2tQb3M6IHsgeDogbnVtYmVyLCB5OiBudW1iZXJ9KTogbnVtYmVye1xyXG5cclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KGNsaWNrUG9zLnggLSBjdXJyUG9zLngsIDIpKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgZHJvcCBsb2NhdGlvbnMgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2VyaWVEcm9wTG9jYXRpb25zKHNlcmllOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCl7XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlckNoYXJ0LmNoaWxkc1swXS5kcm9wUG9zc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZVlBeGlzRHJvcExvY2F0aW9ucyhzZXJpZVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFydE1hbmFnZXJDaGFydC5kcm9wUG9zc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZUNoYXJ0QXJlYURyb3BMb2NhdGlvbnMoc2VyaWVbMF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBkcm9wIGxvY2F0aW9ucyB0byB0aGUgeSBheGlzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZVlBeGlzRHJvcExvY2F0aW9ucyhkYXRhOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBpZihkYXRhLm5hbWUpXHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDaGFydERpbWVuc2lvbnMoKTtcclxuICAgICAgICBmb3IobGV0IGF4aXNCb3VuZCBvZiB0aGlzLmF4aXNCb3VuZHMpe1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0V2lkdGggPSA0O1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IDI7XHJcbiAgICAgICAgICAgIGlmKGF4aXNCb3VuZC5heGlzLm9yaWVudGF0aW9uID09IFwidmVydGljYWxcIil7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMubWFpbkRpdikuYXBwZW5kKCc8ZGl2IGlkPVwiJyt0aGlzLmF4aXNEcm9wWm9uZUlkICsgYXhpc0JvdW5kLmF4aXMubmFtZSsnXCIgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTsgd2lkdGg6ICcrIChheGlzQm91bmQud2lkdGgtb2Zmc2V0V2lkdGgpICsgJ3B4OyBoZWlnaHQ6ICcrIChheGlzQm91bmQuaGVpZ2h0KSArJ3B4OyBsZWZ0OicrKGF4aXNCb3VuZC54ICsgb2Zmc2V0TGVmdCkrJ3B4OyB0b3A6JysoYXhpc0JvdW5kLnkpKydweFwiIGNsYXNzPVwiZHJvcExvY2F0aW9uQXJlYVwiPjwvZGl2PicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGRyb3AgbG9jYXRpb25zIGluIHRoZSBjaGFydCBhcmVhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU2VyaWVDaGFydEFyZWFEcm9wTG9jYXRpb25zKHNlcmllOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBjb25zdCBtYXhpbXVtWUF4aXMgPSAyO1xyXG4gICAgICAgIGlmKHNlcmllLm5hbWUpXHJcbiAgICAgIFx0aWYodGhpcy5zY2FsZXMubGVuZ3RoIDwgbWF4aW11bVlBeGlzKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgICQodGhpcy5tYWluRGl2KS5hcHBlbmQoJzxkaXYgaWQ9XCInKyB0aGlzLmF4aXNEcm9wWm9uZUlkICtcIl9jaGFydEFyZWFcIisnXCIgc3R5bGU9XCJ6LWluZGV4OiA1OyBwb3NpdGlvbjphYnNvbHV0ZTsgd2lkdGg6ICcrIChjaGFydEFyZWEud2lkdGgpICsgJ3B4OyBoZWlnaHQ6ICcrIChjaGFydEFyZWEuaGVpZ2h0KSArJ3B4OyBsZWZ0OicrKGNoYXJ0QXJlYS54KSsncHg7IHRvcDonKyhjaGFydEFyZWEueSkrJ3B4XCIgY2xhc3M9XCJkcm9wTG9jYXRpb25BcmVhXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgZHJvcCBsb2NhdGlvbiB0eXBlIChlLmcuIGFzc2lnbiB0byBzY2FsZSwgYWRkIG5ldyBzY2FsZSwgaW52YWxpZCBmb3IgZHJvcClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnJlbnRUYXJnZXRcclxuICAgICAqIEByZXR1cm5zIHtEcm9wTG9jYXRpb25UeXBlfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERyb3BMb2NhdGlvblR5cGUoY3VycmVudFRhcmdldDogYW55KTogRHJvcExvY2F0aW9uVHlwZXtcclxuICAgICAgICBpZihjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX2F4aXNEcm9wWm9uZVNjYWxlXCIpKXtcclxuICAgICAgICAgICAgcmV0dXJuIERyb3BMb2NhdGlvblR5cGUuYXNzaWduVG9TY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVfY2hhcnRBcmVhXCIpICYmIHRoaXMuc2NhbGVzLmxlbmd0aCA8IDIpe1xyXG4gICAgICAgICAgICByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5hZGROZXdTY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIERyb3BMb2NhdGlvblR5cGUuaW52YWxpZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZ2hsaWdodCBkcm9wcGFibGUgYXJlYXMgaWYgYSB2YWxpZCBzaWduYWwgaXMgZHJhZ2dlZCBvdmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBjdXJyZW50VGFyZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlRHJvcHBhYmxlQXJlYXMoY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgIGlmKGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXMoXCJfYXhpc0Ryb3Bab25lX2NoYXJ0QXJlYVwiKSB8fCBjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX3JlZkN1cnNvcl9cIikpe1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5heGlzRHJvcFpvbmVDaGFydEFyZWFJZCk7XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0QXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0QXJlYSEuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5heGlzRHJvcFpvbmVJZCArIHRoaXMuc2NhbGVzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmKGF4aXNBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF4aXNBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXMoXCJfYXhpc0Ryb3Bab25lU2NhbGVcIikpe1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXModGhpcy5zY2FsZXNbaV0uaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF4aXNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5heGlzRHJvcFpvbmVJZCArIHRoaXMuc2NhbGVzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihheGlzQXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXhpc0FyZWEhLmNsYXNzTGlzdC5hZGQoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF4aXNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5heGlzRHJvcFpvbmVJZCArIHRoaXMuc2NhbGVzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihheGlzQXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXhpc0FyZWEhLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5heGlzRHJvcFpvbmVDaGFydEFyZWFJZCk7XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0QXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0QXJlYSEuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCBoaWdobGlnaHRlZCBhcmVhc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNldEhpZ2hsaWdodGluZygpe1xyXG4gICAgICAgIGxldCBjaGFydEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmF4aXNEcm9wWm9uZUNoYXJ0QXJlYUlkKTtcclxuICAgICAgICBpZihjaGFydEFyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0QXJlYSEuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGF4aXNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5heGlzRHJvcFpvbmVJZCArIHRoaXMuc2NhbGVzW2ldLmlkKTtcclxuICAgICAgICAgICAgaWYoYXhpc0FyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBheGlzQXJlYSEuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZUN1cnNvckhhbmRsZXJzKCkgeyB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBCYXNpY0NoYXJ0IH07XHJcblxyXG4iXX0=