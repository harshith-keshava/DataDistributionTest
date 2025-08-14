var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "../../../core/interfaces/components/ui/chart/chartInterface", "./SFChartAxis", "../helpers/chartLabelFormater", "../../../models/common/point", "../../chartViewWidget/chartViewWidget", "../userInteraction/userInteractionController", "../ChartBase", "../helpers/chartRangeHelper"], function (require, exports, chartInterface_1, SFChartAxis_1, chartLabelFormater_1, point_1, chartViewWidget_1, userInteractionController_1, ChartBase_1, chartRangeHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var spaceChartRightHandSide = 15;
    var SFChartWrapper = /** @class */ (function () {
        function SFChartWrapper(div, scales, nameScaleX) {
            this.prevPanningCoords = {
                'x': undefined,
                'y': undefined
            };
            this._SFChart = this.initializeSFChart(div, scales, nameScaleX);
            this.addTextMeasurementCanvas();
            this.eventAxisRangeChanged = new chartInterface_1.EventAxisRangeChanged();
            this.eventMouseAction = new chartInterface_1.EventMouseAction();
            this.eventMouseWheel = new chartInterface_1.EventMouseWheel();
            this.addEventListenersToChart();
        }
        /**
         * Initialization of Syncfusion chart
         *
         * @private
         * @memberof SFChartWrapper
         */
        SFChartWrapper.prototype.initializeSFChart = function (div, scales, nameScaleX) {
            var chartSettings = {};
            chartSettings = __assign(__assign(__assign(__assign({ enableCanvasRendering: true }, this.getSFChartSeriesSettings(scales)), this.getSFChartScaleSettings(scales, nameScaleX)), { zooming: { enable: true, enableMouseWheel: false, type: "XY", enableScrollbar: false, toolbarItems: [""] }, crosshair: { visible: false, type: 'crosshair', line: { color: "black" } }, legend: { visible: false, enableScrollbar: false } }), this.getSFChartEventHandlers());
            $(div).ejChart(chartSettings);
            var SFChartInstance = $(div).ejChart("instance"); // as ej.datavisualization.Chart;
            SFChartInstance.maxLabelWidth = 55;
            return SFChartInstance;
        };
        /**
        *
        *
        * @private
        * @returns {{}}
        * @memberof SFChartWrapper
        */
        SFChartWrapper.prototype.getSFChartSeriesSettings = function (scales) {
            var seriesArray = [];
            for (var _i = 0, scales_1 = scales; _i < scales_1.length; _i++) {
                var scale = scales_1[_i];
                for (var _a = 0, _b = scale.childs; _a < _b.length; _a++) {
                    var series = _b[_a];
                    var traceDataSeries = this.createTraceDataSeries(series, scale.id);
                    if (traceDataSeries != undefined) {
                        seriesArray.push(traceDataSeries);
                    }
                }
            }
            return { series: seriesArray };
        };
        /**
      *
      *
      * @private
      * @returns {{}}
      * @memberof SFChartWrapper
      */
        SFChartWrapper.prototype.getSFChartScaleSettings = function (scales, nameScaleX) {
            var data = {
                primaryXAxis: {
                    name: nameScaleX,
                    crosshairLabel: { visible: true, trackballTooltipSettings: { border: { width: 10 } } },
                    labelFormat: 'n3',
                    labelPlacement: 'onticks',
                    scrollbarSettings: {
                        visible: false,
                        canResize: false,
                    },
                    labelIntersectAction: "Hide",
                    range: { min: scales[0].minXValue, max: scales[0].maxXValue }
                },
                primaryYAxis: {
                    name: scales[0].id,
                    crosshairLabel: { visible: true },
                    enableAutoIntervalOnZooming: true,
                    labelFormat: "n3",
                    maximumLabelWidth: 60,
                    labelIntersectAction: "Hide",
                    range: { min: scales[0].minYValue, max: scales[0].maxYValue }
                },
            };
            for (var i = 1; i < scales.length; i++) {
                data.axes = [{
                        name: scales[i].id,
                        opposedPosition: true,
                        majorGridLines: { visible: false },
                        range: { min: scales[i].minYValue, max: scales[i].maxYValue },
                        orientation: "vertical"
                    }];
            }
            return data;
        };
        SFChartWrapper.prototype.setSeries = function (series) {
            this._SFChart.option("series", series);
        };
        /**
         * Create property containing data to be drawn
         *
         * @private
         * @param {BaseSeries} serie
         * @param {string} axisID
         * @returns {{}}
         * @memberof SFChartWrapper
         */
        SFChartWrapper.prototype.createTraceDataSeries = function (serie, axisID) {
            if (serie.rawPointsValid == false) {
                // For invalid point data a trace data serie can't be created(ejChart crash if points with undefined x or y values)
                return undefined;
            }
            var properties = {
                name: serie.id,
                type: 'line',
                dataSource: serie.data,
                xName: "x",
                yName: "y",
                fill: serie.color,
                yAxisName: axisID,
                _yAxisName: axisID,
            };
            return properties;
        };
        /**
        *
        *
        * @private
        * @returns {{}}
        * @memberof SFChartWrapper
        */
        SFChartWrapper.prototype.getSFChartEventHandlers = function () {
            var _this = this;
            return {
                zoomed: function (args) { _this.onChartZoomed(args); },
                axesLabelRendering: function (args) { _this.onAxesLabelRendering(args); },
            };
        };
        /**
        *
        *
        * @private
        * @memberof SFChartWrapper
        */
        SFChartWrapper.prototype.addEventListenersToChart = function () {
            var _this = this;
            this._SFChart._on(this._SFChart.element, "mousewheel", function (args) { return _this.onChartMouseWheel(args); });
            this._SFChart._on(this._SFChart.element, "mousedown", function (args) { return _this.onChartMouseDown(args); });
            this._SFChart._on(this._SFChart.element, "mouseup", function (args) { return _this.onChartMouseUp(args); });
            this._SFChart._on(this._SFChart.element, "mousemove", function (args) { return _this.onChartMouseMove(args); });
        };
        SFChartWrapper.prototype.onChartMouseDown = function (args) {
            var chartObjectUnderMouse = this.getChartObjectUnderMouse(this._SFChart.mousemoveX, this._SFChart.mousemoveY);
            if (chartObjectUnderMouse.args.axis != undefined) {
                this.mouseDownAxis = chartObjectUnderMouse.args.axis.name;
            }
            var mousePoint = new point_1.Point(args.clientX, args.clientY);
            var mousePointChart = new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY);
            var mouseDownArgs = new chartInterface_1.EventMouseArgs(userInteractionController_1.MouseActionType.mouseDown, mousePoint, mousePointChart, args.objectUnderMouse);
            this.eventMouseAction.raise(this, mouseDownArgs);
        };
        SFChartWrapper.prototype.onChartMouseUp = function (args) {
            this.mouseDownAxis = undefined;
            var mousePoint = new point_1.Point(args.clientX, args.clientY);
            var mousePointChart = new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY);
            var mouseUpArgs = new chartInterface_1.EventMouseArgs(userInteractionController_1.MouseActionType.mouseUp, mousePoint, mousePointChart, args.objectUnderMouse);
            this.eventMouseAction.raise(this, mouseUpArgs);
        };
        SFChartWrapper.prototype.onChartMouseMove = function (args) {
            var mousePoint = new point_1.Point(args.clientX, args.clientY);
            var mousePointChart = new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY);
            var mouseMoveArgs = new chartInterface_1.EventMouseArgs(userInteractionController_1.MouseActionType.mouseMove, mousePoint, mousePointChart, args.objectUnderMouse);
            this.eventMouseAction.raise(this, mouseMoveArgs);
        };
        SFChartWrapper.prototype.onChartMouseWheel = function (args) {
            var mouseWheelArgs = new chartInterface_1.EventMouseWheelArgs(new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY), args.objectUnderMouse, args.originalEvent.wheelDelta);
            this.eventMouseWheel.raise(this, mouseWheelArgs);
        };
        /**
      * Sets scale ranges after boxZoom accordingy to zooming position and factor; sets zp and zf to 0/1
      *
      * @protected
      * @param {*} args
      * @memberof SFChartWrapper
      */
        SFChartWrapper.prototype.onChartZoomed = function (args) {
            //let yScales = this.getYScales();
            var chartAxes = args.model._axes;
            var xAxisZoomCanceled = false;
            for (var _i = 0, chartAxes_1 = chartAxes; _i < chartAxes_1.length; _i++) {
                var currentChartAxis = chartAxes_1[_i];
                var minVal = currentChartAxis.visibleRange.min;
                var maxVal = currentChartAxis.visibleRange.max;
                //limit the axis range to Precision 11 to prevent syncfusion chart from failing
                if (maxVal.toPrecision(11) - minVal.toPrecision(11) > chartRangeHelper_1.SF_axisResolution) {
                    var axis_1 = this.getAxis(currentChartAxis.name);
                    if (axis_1 != undefined) {
                        axis_1.setAxisRange({ min: minVal, max: maxVal }, false, false);
                    }
                }
                else {
                    if (currentChartAxis.orientation == "horizontal") {
                        xAxisZoomCanceled = true;
                    }
                }
                currentChartAxis.zoomPosition = 0;
                currentChartAxis.zoomFactor = 1;
            }
            var axis = this.getAxis(chartAxes[0].name);
            if (axis != undefined && xAxisZoomCanceled == false) {
                axis.setAxisRange(axis.getAxisRange(), false, true);
            }
            this._SFChart.zoomed = false;
        };
        SFChartWrapper.prototype.redraw = function () {
            this._SFChart.redraw();
        };
        SFChartWrapper.prototype.resize = function (height, width) {
            this._SFChart.option("size", { height: String(height), width: String(width - spaceChartRightHandSide) });
        };
        /**
       * Sets zoomAxes
       *
       * @param {ZoomDirection} zoomAxes
       * @memberof SFChartWrapper
       */
        SFChartWrapper.prototype.setZoomDirection = function (zoomAxes) {
            this._SFChart.model.zooming.type = chartViewWidget_1.ZoomDirection[zoomAxes];
        };
        /**
        * Enables box zooming
        *
        * @param {boolean} enable
        * @memberof SFChartWrapper
        */
        SFChartWrapper.prototype.enableBoxZoom = function (enable) {
            this._SFChart.model.zooming.enable = enable;
        };
        /**
         * Enables panning
         *
         * @param {boolean} enable
         * @memberof SFChartWrapper
         */
        SFChartWrapper.prototype.enablePanning = function (enable) {
            // Currently not needed to set the panning info in the sfc chart 
            //this._SFChart.panning = enable;
        };
        SFChartWrapper.prototype.setPanningAxes = function (axes) {
            this._SFChart.activePanningAxes = axes;
        };
        /**
         * Adds an invisible Canvas which is used to measure label width
         *
         * @private
         * @memberof SFChartWrapper
         */
        SFChartWrapper.prototype.addTextMeasurementCanvas = function () {
            var id = this._SFChart.chartContainer[0].id;
            var t = $("#" + id);
            t.append('<canvas id="' + id + '_' + "textMaesurementCanvas" + '" style="z-index: -5; position:absolute"> </canvas>');
        };
        /**
       *
       *
       * @private
       * @param {*} args
       * @memberof SFChartWrapper
       */
        SFChartWrapper.prototype.onAxesLabelRendering = function (args) {
            if (this._SFChart != undefined) {
                var id = this._SFChart.chartContainer[0].id;
                var textMaesurementCanvas = document.getElementById(id + '_' + "textMaesurementCanvas");
                if (textMaesurementCanvas) {
                    var context = textMaesurementCanvas.getContext("2d");
                    var number = args.data.label["Value"];
                    var interval = args.data.axis.visibleRange.interval;
                    if (args.data.axis.orientation == "horizontal") {
                        // XAxis(time)
                        args.data.label["Text"] = chartLabelFormater_1.ChartLabelFormater.getXAxisLabelText(number, context, interval);
                    }
                    else {
                        // YAxis
                        args.data.label["Text"] = chartLabelFormater_1.ChartLabelFormater.getYAxisLabelText(number, context, interval);
                    }
                }
            }
        };
        SFChartWrapper.prototype.getChartArea = function () {
            return { x: this._SFChart.canvasX, y: this._SFChart.canvasY, width: this._SFChart.canvasWidth, height: this._SFChart.canvasHeight };
        };
        SFChartWrapper.prototype.setChartArea = function (chartArea) {
            this._SFChart.model.margin.left = chartArea.x - 71;
            this._SFChart.model.margin.top = chartArea.y - 10;
            var numbrOfYAxis = this._SFChart.model._axes.length - 2;
            this._SFChart.model.margin.right = this._SFChart.model.width - (chartArea.x + chartArea.width) - 10 - (numbrOfYAxis * 71);
            this._SFChart.model.margin.bottom = this._SFChart.model.height - ((chartArea.y) + chartArea.height) - 31;
        };
        SFChartWrapper.prototype.getAxis = function (axisID) {
            var axis = this.getChartAxisByName(axisID);
            if (axis != undefined) {
                return new SFChartAxis_1.SFChartAxis(axis, this.eventAxisRangeChanged, this);
            }
            else {
                return undefined;
            }
        };
        SFChartWrapper.prototype.getXAxisWidth = function () {
            return this.getChartArea().width;
        };
        /**
        * Get axis with a given name
        *
        * @param {string} axisName
        * @returns {*}
        * @memberof SFChartWrapper
        */
        SFChartWrapper.prototype.getChartAxisByName = function (axisName) {
            var axes = this._SFChart.model._axes;
            for (var i = 0; i < axes.length; i++) {
                if (axes[i].name == axisName) {
                    return axes[i];
                }
            }
        };
        SFChartWrapper.prototype.doPanning = function (pageX, pageY) {
            if (this.prevPanningCoords.x != undefined) {
                var oDelta = void 0;
                oDelta = {
                    'x': this.prevPanningCoords.x - pageX,
                    'y': this.prevPanningCoords.y - pageY
                };
                this.prevPanningCoords = {
                    'x': pageX,
                    'y': pageY
                };
                for (var i = 0; i < this._SFChart.activePanningAxes.length; i++) {
                    var axis = this.getChartAxisByName(this._SFChart.activePanningAxes[i].getAxisID());
                    for (var j = 0; j < this._SFChart.model._axes.length; j++) {
                        if (axis.name == this._SFChart.model._axes[j].name) {
                            axis = this._SFChart.model._axes[j];
                        }
                    }
                    var delta = void 0;
                    axis.visibleRange.min = SFChartAxis_1.SFChartAxis.changeInfinityToMaxValue(axis.visibleRange.min);
                    axis.visibleRange.max = SFChartAxis_1.SFChartAxis.changeInfinityToMaxValue(axis.visibleRange.max);
                    if (axis.orientation == "horizontal") {
                        delta = ((Big(axis.visibleRange.max).minus(Big(axis.visibleRange.min))).div(Big(axis.width))).times(Big(oDelta.x));
                        var deltaNmbr = Number(delta.toString());
                        if (axis != undefined) {
                            this.getAxis(axis.name).setAxisRange({ min: axis.visibleRange.min + deltaNmbr, max: axis.visibleRange.max + deltaNmbr });
                        }
                    }
                    else {
                        if (axis != undefined) {
                            delta = ((Big(axis.visibleRange.max).minus(Big(axis.visibleRange.min))).div(Big(axis.height))).times(Big(oDelta.y));
                            var deltaNmbr = Number(delta.toString());
                            deltaNmbr = deltaNmbr * -1;
                            this.getAxis(axis.name).setAxisRange({ min: axis.visibleRange.min + deltaNmbr, max: axis.visibleRange.max + deltaNmbr });
                        }
                    }
                }
            }
            else {
                this.prevPanningCoords = {
                    'x': pageX,
                    'y': pageY
                };
            }
        };
        SFChartWrapper.prototype.addYAxis = function (axisName, axisMin, axisMax, position) {
            var currentAxes = this._SFChart.option("axes");
            var opposedPosition = false;
            if (position == chartInterface_1.AxisPosition.right) {
                opposedPosition = true;
                ;
            }
            currentAxes.push({
                name: axisName,
                opposedPosition: opposedPosition,
                majorGridLines: { visible: false },
                range: { min: axisMin, max: axisMax },
                orientation: "vertical"
            });
            this._SFChart.option("axes", currentAxes);
            if (this._SFChart.model.axes.length == 1) {
                this._SFChart.model.margin.right = 10;
            }
        };
        SFChartWrapper.prototype.removeYAxis = function (axisName) {
            //TODO: Update so it works for more than 2 axis
            var index;
            for (var i = 0; i < this._SFChart.model.axes.length; i++) {
                if (this._SFChart.model.axes[i].name === axisName) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                this._SFChart.model.axes.splice(index, 1);
            }
            else if (this._SFChart.model.axes.length > 0) {
                this._SFChart.model.primaryYAxis = this._SFChart.model.axes[0];
                this._SFChart.model.primaryYAxis.majorGridLines.visible = true;
                this._SFChart.model.primaryYAxis.opposedPosition = false;
                this._SFChart.model.primaryYAxis.backGround = 'transparent';
                this._SFChart.model.axes = [];
            }
            if (this._SFChart.model.axes.length == 0) {
                this._SFChart.model.margin.right = 10;
            }
        };
        SFChartWrapper.prototype.setYAxisOffset = function (numberOfAxes) {
            if (numberOfAxes > 0) {
                this._SFChart.model.margin.right = 10 + (71 * numberOfAxes);
            }
            else {
                this._SFChart.model.margin.right = 10;
            }
        };
        SFChartWrapper.prototype.getChartObjectUnderMouse = function (mouseX, mouseY) {
            var chartObjectUnderMouse = new ChartBase_1.ChartObjectInformation(ChartBase_1.ChartObjectType.emptySpace, {});
            var axisBounds = Array();
            for (var i = 0; i < this._SFChart.model._axes.length; i++) {
                axisBounds.push(this.getAxis(this._SFChart.model._axes[i].name).getAxisBounds());
            }
            for (var i = 0; i < axisBounds.length; i++) {
                if ((mouseX - axisBounds[i].x) < (axisBounds[i].width) && mouseX > axisBounds[i].x) {
                    if ((mouseY - axisBounds[i].y) < (axisBounds[i].height) && mouseY > axisBounds[i].y) {
                        chartObjectUnderMouse = new ChartBase_1.ChartObjectInformation(ChartBase_1.ChartObjectType.axis, { axis: axisBounds[i].axis });
                    }
                }
            }
            return chartObjectUnderMouse;
        };
        return SFChartWrapper;
    }());
    exports.SFChartWrapper = SFChartWrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZDaGFydFdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvY2hhcnRXcmFwcGVyL1NGQ2hhcnRXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBZUEsSUFBTSx1QkFBdUIsR0FBVyxFQUFFLENBQUM7SUFHM0M7UUFjSSx3QkFBWSxHQUFtQixFQUFFLE1BQWdCLEVBQUUsVUFBa0I7WUFMOUQsc0JBQWlCLEdBQUc7Z0JBQ3ZCLEdBQUcsRUFBRSxTQUFTO2dCQUNkLEdBQUcsRUFBRSxTQUFTO2FBQ2pCLENBQUE7WUFHRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBRWhDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLHNDQUFxQixFQUFFLENBQUM7WUFDekQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksaUNBQWdCLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZ0NBQWUsRUFBRSxDQUFDO1lBRzdDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLDBDQUFpQixHQUF6QixVQUEwQixHQUFtQixFQUFFLE1BQWdCLEVBQUUsVUFBa0I7WUFFL0UsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFBO1lBQ3RCLGFBQWEseUNBQ1QscUJBQXFCLEVBQUUsSUFBSSxJQUV4QixJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLEdBQ3JDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEtBRW5ELE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsZ0JB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VUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO29CQUM5RSxJQUFHLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQzt3QkFDL0UscUJBQXFCLEdBQUcsSUFBSSxrQ0FBc0IsQ0FBQywyQkFBZSxDQUFDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztxQkFDeEc7aUJBQ0o7YUFDSjtZQUVELE9BQU8scUJBQXFCLENBQUM7UUFDakMsQ0FBQztRQUVMLHFCQUFDO0lBQUQsQ0FBQyxBQWxoQkQsSUFraEJDO0lBRU8sd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IElDaGFydCwgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkLCBFdmVudE1vdXNlQWN0aW9uLCBFdmVudE1vdXNlQXJncywgRXZlbnRNb3VzZVdoZWVsLCBFdmVudE1vdXNlV2hlZWxBcmdzLCBBeGlzUG9zaXRpb259IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBeGlzQm91bmRzIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvQXhpc0JvdW5kc1wiO1xyXG5pbXBvcnQgeyBJQ2hhcnRBeGlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTRkNoYXJ0QXhpcyB9IGZyb20gXCIuL1NGQ2hhcnRBeGlzXCI7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3R5cGVzL1JlY3RhbmdsZVwiO1xyXG5pbXBvcnQgeyBDaGFydExhYmVsRm9ybWF0ZXIgfSBmcm9tIFwiLi4vaGVscGVycy9jaGFydExhYmVsRm9ybWF0ZXJcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBab29tRGlyZWN0aW9uIH0gZnJvbSBcIi4uLy4uL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXRcIlxyXG5pbXBvcnQgeyBNb3VzZUFjdGlvblR5cGUgfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbiwgQ2hhcnRPYmplY3RUeXBlIH0gZnJvbSBcIi4uL0NoYXJ0QmFzZVwiO1xyXG5pbXBvcnQgeyBTRl9heGlzUmVzb2x1dGlvbiB9IGZyb20gXCIuLi9oZWxwZXJzL2NoYXJ0UmFuZ2VIZWxwZXJcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcblxyXG5cclxuY29uc3Qgc3BhY2VDaGFydFJpZ2h0SGFuZFNpZGU6IG51bWJlciA9IDE1O1xyXG5cclxuXHJcbmNsYXNzIFNGQ2hhcnRXcmFwcGVyIGltcGxlbWVudHMgSUNoYXJ0e1xyXG4gICAgX1NGQ2hhcnQvLzogZWouZGF0YXZpc3VhbGl6YXRpb24uQ2hhcnQ7XHJcbiAgICBldmVudEF4aXNSYW5nZUNoYW5nZWQgOiBFdmVudEF4aXNSYW5nZUNoYW5nZWQ7XHJcbiAgICBldmVudE1vdXNlQWN0aW9uIDogRXZlbnRNb3VzZUFjdGlvbjtcclxuICAgIGV2ZW50TW91c2VXaGVlbDogRXZlbnRNb3VzZVdoZWVsO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIG1vdXNlRG93bkF4aXM7XHJcblxyXG4gICAgcHVibGljIHByZXZQYW5uaW5nQ29vcmRzID0ge1xyXG4gICAgICAgICd4JzogdW5kZWZpbmVkLFxyXG4gICAgICAgICd5JzogdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGl2OiBIVE1MRGl2RWxlbWVudCwgc2NhbGVzIDogU2NhbGVbXSwgbmFtZVNjYWxlWDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0ID0gdGhpcy5pbml0aWFsaXplU0ZDaGFydChkaXYsIHNjYWxlcywgbmFtZVNjYWxlWCk7XHJcbiAgICAgICAgdGhpcy5hZGRUZXh0TWVhc3VyZW1lbnRDYW52YXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudEF4aXNSYW5nZUNoYW5nZWQgPSBuZXcgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudE1vdXNlQWN0aW9uID0gbmV3IEV2ZW50TW91c2VBY3Rpb24oKTtcclxuICAgICAgICB0aGlzLmV2ZW50TW91c2VXaGVlbCA9IG5ldyBFdmVudE1vdXNlV2hlZWwoKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnNUb0NoYXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXphdGlvbiBvZiBTeW5jZnVzaW9uIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBTRkNoYXJ0V3JhcHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVTRkNoYXJ0KGRpdjogSFRNTERpdkVsZW1lbnQsIHNjYWxlcyA6IFNjYWxlW10sIG5hbWVTY2FsZVg6IHN0cmluZykgOiBlai5kYXRhdmlzdWFsaXphdGlvbi5DaGFydHtcclxuXHJcbiAgICAgICAgbGV0IGNoYXJ0U2V0dGluZ3MgPSB7fVxyXG4gICAgICAgIGNoYXJ0U2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGVuYWJsZUNhbnZhc1JlbmRlcmluZzogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0U0ZDaGFydFNlcmllc1NldHRpbmdzKHNjYWxlcyksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0U0ZDaGFydFNjYWxlU2V0dGluZ3Moc2NhbGVzLCBuYW1lU2NhbGVYKSxcclxuXHJcbiAgICAgICAgICAgIHpvb21pbmc6IHsgZW5hYmxlOiB0cnVlLCBlbmFibGVNb3VzZVdoZWVsOiBmYWxzZSwgdHlwZTogXCJYWVwiLCBlbmFibGVTY3JvbGxiYXI6IGZhbHNlLCB0b29sYmFySXRlbXM6IFtcIlwiXSB9LFxyXG4gICAgICAgICAgICBjcm9zc2hhaXI6IHsgdmlzaWJsZTogZmFsc2UsIHR5cGU6ICdjcm9zc2hhaXInLCBsaW5lOiB7IGNvbG9yOiBcImJsYWNrXCIgfSB9LFxyXG4gICAgICAgICAgICBsZWdlbmQ6IHsgdmlzaWJsZTogZmFsc2UsIGVuYWJsZVNjcm9sbGJhciA6IGZhbHNlfSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFNGQ2hhcnRFdmVudEhhbmRsZXJzKCksXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJChkaXYpLmVqQ2hhcnQoY2hhcnRTZXR0aW5ncyk7XHJcbiAgICAgICAgbGV0IFNGQ2hhcnRJbnN0YW5jZSA9ICQoZGl2KS5lakNoYXJ0KFwiaW5zdGFuY2VcIikvLyBhcyBlai5kYXRhdmlzdWFsaXphdGlvbi5DaGFydDtcclxuICAgICAgICBcclxuICAgICAgICBTRkNoYXJ0SW5zdGFuY2UubWF4TGFiZWxXaWR0aCA9IDU1O1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIFNGQ2hhcnRJbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgU0ZDaGFydFdyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTRkNoYXJ0U2VyaWVzU2V0dGluZ3Moc2NhbGVzIDogU2NhbGVbXSkgOiB7fXtcclxuICAgICAgICBsZXQgc2VyaWVzQXJyYXkgOiB7fVtdPSBbXTtcclxuICAgICAgICBmb3IobGV0IHNjYWxlIG9mIHNjYWxlcyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgc2VyaWVzIG9mIHNjYWxlLmNoaWxkcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2VEYXRhU2VyaWVzID0gdGhpcy5jcmVhdGVUcmFjZURhdGFTZXJpZXMoc2VyaWVzLCBzY2FsZS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZih0cmFjZURhdGFTZXJpZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZXNBcnJheS5wdXNoKHRyYWNlRGF0YVNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7c2VyaWVzOiBzZXJpZXNBcnJheX07XHJcblxyXG4gICAgfVxyXG5cclxuICAgICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFNGQ2hhcnRXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U0ZDaGFydFNjYWxlU2V0dGluZ3Moc2NhbGVzIDogU2NhbGVbXSwgbmFtZVNjYWxlWDogc3RyaW5nKSA6IHt9e1xyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICBwcmltYXJ5WEF4aXM6IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVTY2FsZVgsXHJcbiAgICAgICAgICAgICAgICBjcm9zc2hhaXJMYWJlbDogeyB2aXNpYmxlOiB0cnVlLCB0cmFja2JhbGxUb29sdGlwU2V0dGluZ3M6IHsgYm9yZGVyOiB7IHdpZHRoOiAxMCB9IH0gfSxcclxuICAgICAgICAgICAgICAgIGxhYmVsRm9ybWF0OiAnbjMnLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxQbGFjZW1lbnQ6ICdvbnRpY2tzJyxcclxuICAgICAgICAgICAgICAgIHNjcm9sbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuUmVzaXplOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhYmVsSW50ZXJzZWN0QWN0aW9uIDogXCJIaWRlXCIsXHJcbiAgICAgICAgICAgICAgICByYW5nZToge21pbjogc2NhbGVzWzBdLm1pblhWYWx1ZSwgbWF4OiBzY2FsZXNbMF0ubWF4WFZhbHVlfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJpbWFyeVlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lIDogc2NhbGVzWzBdLmlkLFxyXG4gICAgICAgICAgICAgICAgY3Jvc3NoYWlyTGFiZWw6IHsgdmlzaWJsZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlQXV0b0ludGVydmFsT25ab29taW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxGb3JtYXQ6IFwibjNcIixcclxuICAgICAgICAgICAgICAgIG1heGltdW1MYWJlbFdpZHRoIDogNjAsXHJcbiAgICAgICAgICAgICAgICBsYWJlbEludGVyc2VjdEFjdGlvbiA6IFwiSGlkZVwiLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHttaW46IHNjYWxlc1swXS5taW5ZVmFsdWUsIG1heDogc2NhbGVzWzBdLm1heFlWYWx1ZX1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAxOyBpIDwgc2NhbGVzLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgICAgIChkYXRhIGFzIGFueSkuYXhlcyA9IFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBzY2FsZXNbaV0uaWQsXHJcbiAgICAgICAgICAgICAgICBvcHBvc2VkUG9zaXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtYWpvckdyaWRMaW5lczogeyB2aXNpYmxlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHttaW46IHNjYWxlc1tpXS5taW5ZVmFsdWUsIG1heDogc2NhbGVzW2ldLm1heFlWYWx1ZX0sXHJcbiAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogXCJ2ZXJ0aWNhbFwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNldFNlcmllcyhzZXJpZXMpe1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQub3B0aW9uKFwic2VyaWVzXCIsIHNlcmllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgcHJvcGVydHkgY29udGFpbmluZyBkYXRhIHRvIGJlIGRyYXduXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBheGlzSURcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBTRkNoYXJ0V3JhcHBlclxyXG4gICAgICovXHJcbiAgICAgICAgcHVibGljICBjcmVhdGVUcmFjZURhdGFTZXJpZXMoc2VyaWU6IEJhc2VTZXJpZXMsIGF4aXNJRDogc3RyaW5nKToge318dW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgaWYoc2VyaWUucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgLy8gRm9yIGludmFsaWQgcG9pbnQgZGF0YSBhIHRyYWNlIGRhdGEgc2VyaWUgY2FuJ3QgYmUgY3JlYXRlZChlakNoYXJ0IGNyYXNoIGlmIHBvaW50cyB3aXRoIHVuZGVmaW5lZCB4IG9yIHkgdmFsdWVzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcHJvcGVydGllcyA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHNlcmllLmlkLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxyXG4gICAgICAgICAgICAgICAgZGF0YVNvdXJjZTogc2VyaWUuZGF0YSxcclxuICAgICAgICAgICAgICAgIHhOYW1lOiBcInhcIixcclxuICAgICAgICAgICAgICAgIHlOYW1lOiBcInlcIixcclxuICAgICAgICAgICAgICAgIGZpbGw6IHNlcmllLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgeUF4aXNOYW1lOiBheGlzSUQsXHJcbiAgICAgICAgICAgICAgICBfeUF4aXNOYW1lOiBheGlzSUQsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGUgXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgU0ZDaGFydFdyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTRkNoYXJ0RXZlbnRIYW5kbGVycygpIDoge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgem9vbWVkOiAoYXJncykgPT4ge3RoaXMub25DaGFydFpvb21lZChhcmdzKX0sXHJcbiAgICAgICAgICAgIGF4ZXNMYWJlbFJlbmRlcmluZzogKGFyZ3MpID0+IHt0aGlzLm9uQXhlc0xhYmVsUmVuZGVyaW5nKGFyZ3MpfSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFNGQ2hhcnRXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkRXZlbnRMaXN0ZW5lcnNUb0NoYXJ0KCl7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5fb24odGhpcy5fU0ZDaGFydC5lbGVtZW50LCBcIm1vdXNld2hlZWxcIiwgKGFyZ3MpID0+IHRoaXMub25DaGFydE1vdXNlV2hlZWwoYXJncykpO1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQuX29uKHRoaXMuX1NGQ2hhcnQuZWxlbWVudCwgXCJtb3VzZWRvd25cIiwgKGFyZ3MpID0+IHRoaXMub25DaGFydE1vdXNlRG93bihhcmdzKSk7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5fb24odGhpcy5fU0ZDaGFydC5lbGVtZW50LCBcIm1vdXNldXBcIiwgKGFyZ3MpID0+IHRoaXMub25DaGFydE1vdXNlVXAoYXJncykpO1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQuX29uKHRoaXMuX1NGQ2hhcnQuZWxlbWVudCwgXCJtb3VzZW1vdmVcIiwgKGFyZ3MpID0+IHRoaXMub25DaGFydE1vdXNlTW92ZShhcmdzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VEb3duKGFyZ3Mpe1xyXG4gICAgICAgIGxldCBjaGFydE9iamVjdFVuZGVyTW91c2UgPSB0aGlzLmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZSh0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVgsIHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWSk7XHJcbiAgICAgICAgaWYoY2hhcnRPYmplY3RVbmRlck1vdXNlLmFyZ3MuYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkF4aXMgPSBjaGFydE9iamVjdFVuZGVyTW91c2UuYXJncy5heGlzLm5hbWU7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1vdXNlUG9pbnQgPSBuZXcgUG9pbnQoYXJncy5jbGllbnRYLCBhcmdzLmNsaWVudFkpXHJcbiAgICAgICAgbGV0IG1vdXNlUG9pbnRDaGFydCA9IG5ldyBQb2ludCh0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVgsIHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWSk7XHJcbiAgICAgICAgbGV0IG1vdXNlRG93bkFyZ3MgOiBFdmVudE1vdXNlQXJncyA9IG5ldyBFdmVudE1vdXNlQXJncyhNb3VzZUFjdGlvblR5cGUubW91c2VEb3duLCBtb3VzZVBvaW50LCBtb3VzZVBvaW50Q2hhcnQsIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSlcclxuICAgICAgICB0aGlzLmV2ZW50TW91c2VBY3Rpb24ucmFpc2UodGhpcywgbW91c2VEb3duQXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VVcChhcmdzKXtcclxuICAgICAgICB0aGlzLm1vdXNlRG93bkF4aXMgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGxldCBtb3VzZVBvaW50ID0gbmV3IFBvaW50KGFyZ3MuY2xpZW50WCwgYXJncy5jbGllbnRZKVxyXG4gICAgICAgIGxldCBtb3VzZVBvaW50Q2hhcnQgPSBuZXcgUG9pbnQodGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVYLCB0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVkpO1xyXG4gICAgICAgIGxldCBtb3VzZVVwQXJncyA6IEV2ZW50TW91c2VBcmdzID0gbmV3IEV2ZW50TW91c2VBcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZVVwLCBtb3VzZVBvaW50LCBtb3VzZVBvaW50Q2hhcnQsIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSlcclxuICAgICAgICB0aGlzLmV2ZW50TW91c2VBY3Rpb24ucmFpc2UodGhpcywgbW91c2VVcEFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DaGFydE1vdXNlTW92ZShhcmdzKXtcclxuICAgICBcclxuICAgICAgICBsZXQgbW91c2VQb2ludCA9IG5ldyBQb2ludChhcmdzLmNsaWVudFgsIGFyZ3MuY2xpZW50WSlcclxuICAgICAgICBsZXQgbW91c2VQb2ludENoYXJ0ID0gbmV3IFBvaW50KHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWCwgdGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVZKTtcclxuICAgICAgICBsZXQgbW91c2VNb3ZlQXJncyA6IEV2ZW50TW91c2VBcmdzID0gbmV3IEV2ZW50TW91c2VBcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZU1vdmUsIG1vdXNlUG9pbnQsIG1vdXNlUG9pbnRDaGFydCwgYXJncy5vYmplY3RVbmRlck1vdXNlKVxyXG4gICAgICAgIHRoaXMuZXZlbnRNb3VzZUFjdGlvbi5yYWlzZSh0aGlzLCBtb3VzZU1vdmVBcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZVdoZWVsKGFyZ3Mpe1xyXG4gICAgICAgIGxldCBtb3VzZVdoZWVsQXJncyA6IEV2ZW50TW91c2VXaGVlbEFyZ3MgPSBuZXcgRXZlbnRNb3VzZVdoZWVsQXJncyhuZXcgUG9pbnQodGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVYLCB0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVkpLCBhcmdzLm9iamVjdFVuZGVyTW91c2UsIGFyZ3Mub3JpZ2luYWxFdmVudC53aGVlbERlbHRhKVxyXG4gICAgICAgIHRoaXMuZXZlbnRNb3VzZVdoZWVsLnJhaXNlKHRoaXMsIG1vdXNlV2hlZWxBcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICAgICAvKipcclxuICAgICAqIFNldHMgc2NhbGUgcmFuZ2VzIGFmdGVyIGJveFpvb20gYWNjb3JkaW5neSB0byB6b29taW5nIHBvc2l0aW9uIGFuZCBmYWN0b3I7IHNldHMgenAgYW5kIHpmIHRvIDAvMVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFNGQ2hhcnRXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkNoYXJ0Wm9vbWVkKGFyZ3MpIHtcclxuICAgICAgICAvL2xldCB5U2NhbGVzID0gdGhpcy5nZXRZU2NhbGVzKCk7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXhlcyA6IGFueVtdID0gYXJncy5tb2RlbC5fYXhlcztcclxuICAgICAgICBsZXQgeEF4aXNab29tQ2FuY2VsZWQgPSBmYWxzZTtcclxuICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBjdXJyZW50Q2hhcnRBeGlzIG9mIGNoYXJ0QXhlcyl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbWluVmFsID0gIGN1cnJlbnRDaGFydEF4aXMudmlzaWJsZVJhbmdlLm1pbjtcclxuICAgICAgICAgICAgbGV0IG1heFZhbCA9ICBjdXJyZW50Q2hhcnRBeGlzLnZpc2libGVSYW5nZS5tYXg7XHJcblxyXG4gICAgICAgICAgICAvL2xpbWl0IHRoZSBheGlzIHJhbmdlIHRvIFByZWNpc2lvbiAxMSB0byBwcmV2ZW50IHN5bmNmdXNpb24gY2hhcnQgZnJvbSBmYWlsaW5nXHJcbiAgICAgICAgICAgIGlmKG1heFZhbC50b1ByZWNpc2lvbigxMSkgLSBtaW5WYWwudG9QcmVjaXNpb24oMTEpID4gU0ZfYXhpc1Jlc29sdXRpb24pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmdldEF4aXMoY3VycmVudENoYXJ0QXhpcy5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXhpcy5zZXRBeGlzUmFuZ2Uoe21pbjogbWluVmFsLCBtYXg6IG1heFZhbH0sZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudENoYXJ0QXhpcy5vcmllbnRhdGlvbiA9PSBcImhvcml6b250YWxcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgeEF4aXNab29tQ2FuY2VsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50Q2hhcnRBeGlzLnpvb21Qb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDaGFydEF4aXMuem9vbUZhY3RvciA9IDE7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmdldEF4aXMoY2hhcnRBeGVzWzBdLm5hbWUpO1xyXG4gICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkICYmIHhBeGlzWm9vbUNhbmNlbGVkID09IGZhbHNlKXtcclxuICAgICAgICAgICAgYXhpcy5zZXRBeGlzUmFuZ2UoYXhpcy5nZXRBeGlzUmFuZ2UoKSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC56b29tZWQgPSBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVkcmF3KCl7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5yZWRyYXcoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVzaXplKGhlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm9wdGlvbihcInNpemVcIiwge2hlaWdodDogU3RyaW5nKGhlaWdodCksIHdpZHRoOiBTdHJpbmcod2lkdGggLSBzcGFjZUNoYXJ0UmlnaHRIYW5kU2lkZSl9KTtcclxuICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICogU2V0cyB6b29tQXhlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Wm9vbURpcmVjdGlvbn0gem9vbUF4ZXNcclxuICAgICAqIEBtZW1iZXJvZiBTRkNoYXJ0V3JhcHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Wm9vbURpcmVjdGlvbih6b29tQXhlczogWm9vbURpcmVjdGlvbikge1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwuem9vbWluZy50eXBlID0gIFpvb21EaXJlY3Rpb25bem9vbUF4ZXNdO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIEVuYWJsZXMgYm94IHpvb21pbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIFNGQ2hhcnRXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVCb3hab29tKGVuYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwuem9vbWluZy5lbmFibGUgPSBlbmFibGU7XHJcbiAgICB9XHJcbiBcclxuICAgICAvKipcclxuICAgICAgKiBFbmFibGVzIHBhbm5pbmdcclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcbiAgICAgICogQG1lbWJlcm9mIFNGQ2hhcnRXcmFwcGVyXHJcbiAgICAgICovXHJcbiAgICAgcHVibGljIGVuYWJsZVBhbm5pbmcoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgLy8gQ3VycmVudGx5IG5vdCBuZWVkZWQgdG8gc2V0IHRoZSBwYW5uaW5nIGluZm8gaW4gdGhlIHNmYyBjaGFydCBcclxuICAgICAgICAvL3RoaXMuX1NGQ2hhcnQucGFubmluZyA9IGVuYWJsZTtcclxuICAgICB9XHJcblxyXG5cclxuICAgICBwdWJsaWMgc2V0UGFubmluZ0F4ZXMoYXhlcyA6IElDaGFydEF4aXNbXSl7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5hY3RpdmVQYW5uaW5nQXhlcyA9IGF4ZXM7IFxyXG4gICAgIH1cclxuIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBpbnZpc2libGUgQ2FudmFzIHdoaWNoIGlzIHVzZWQgdG8gbWVhc3VyZSBsYWJlbCB3aWR0aFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgU0ZDaGFydFdyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUZXh0TWVhc3VyZW1lbnRDYW52YXMoKXtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLl9TRkNoYXJ0LmNoYXJ0Q29udGFpbmVyWzBdLmlkO1xyXG4gICAgICAgIGxldCB0ID0gJChcIiNcIitpZCk7IFxyXG4gICAgICAgIHQuYXBwZW5kKCc8Y2FudmFzIGlkPVwiJytpZCsnXycrXCJ0ZXh0TWFlc3VyZW1lbnRDYW52YXNcIisnXCIgc3R5bGU9XCJ6LWluZGV4OiAtNTsgcG9zaXRpb246YWJzb2x1dGVcIj4gPC9jYW52YXM+Jyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBTRkNoYXJ0V3JhcHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQXhlc0xhYmVsUmVuZGVyaW5nKGFyZ3Mpe1xyXG4gICAgICAgIGlmKHRoaXMuX1NGQ2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGhpcy5fU0ZDaGFydC5jaGFydENvbnRhaW5lclswXS5pZDtcclxuICAgICAgICAgICAgbGV0IHRleHRNYWVzdXJlbWVudENhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQrJ18nK1widGV4dE1hZXN1cmVtZW50Q2FudmFzXCIpO1xyXG4gICAgICAgICAgICBpZih0ZXh0TWFlc3VyZW1lbnRDYW52YXMpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IHRleHRNYWVzdXJlbWVudENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtYmVyID0gYXJncy5kYXRhLmxhYmVsW1wiVmFsdWVcIl07XHJcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPWFyZ3MuZGF0YS5heGlzLnZpc2libGVSYW5nZS5pbnRlcnZhbDtcclxuICAgICAgICAgICAgICAgIGlmKGFyZ3MuZGF0YS5heGlzLm9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBYQXhpcyh0aW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuZGF0YS5sYWJlbFtcIlRleHRcIl0gPSBDaGFydExhYmVsRm9ybWF0ZXIuZ2V0WEF4aXNMYWJlbFRleHQobnVtYmVyLCBjb250ZXh0LCBpbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFlBeGlzXHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5kYXRhLmxhYmVsW1wiVGV4dFwiXSA9IENoYXJ0TGFiZWxGb3JtYXRlci5nZXRZQXhpc0xhYmVsVGV4dChudW1iZXIsIGNvbnRleHQsIGludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFydEFyZWEoKSA6IFJlY3RhbmdsZXtcclxuICAgICAgICByZXR1cm4gIHt4OiB0aGlzLl9TRkNoYXJ0LmNhbnZhc1gsIHk6IHRoaXMuX1NGQ2hhcnQuY2FudmFzWSwgd2lkdGg6IHRoaXMuX1NGQ2hhcnQuY2FudmFzV2lkdGgsIGhlaWdodDogdGhpcy5fU0ZDaGFydC5jYW52YXNIZWlnaHR9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldENoYXJ0QXJlYShjaGFydEFyZWE6IFJlY3RhbmdsZSl7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4ubGVmdCA9IGNoYXJ0QXJlYS54IC0gNzE7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4udG9wID0gY2hhcnRBcmVhLnkgLSAxMDtcclxuXHJcbiAgICAgICAgbGV0IG51bWJyT2ZZQXhpcyA9IHRoaXMuX1NGQ2hhcnQubW9kZWwuX2F4ZXMubGVuZ3RoIC0gMlxyXG5cclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLm1hcmdpbi5yaWdodCA9IHRoaXMuX1NGQ2hhcnQubW9kZWwud2lkdGggLSAoY2hhcnRBcmVhLnggKyBjaGFydEFyZWEud2lkdGgpIC0gMTAgLSAobnVtYnJPZllBeGlzICogNzEpIDtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLm1hcmdpbi5ib3R0b20gPSB0aGlzLl9TRkNoYXJ0Lm1vZGVsLmhlaWdodCAtICgoY2hhcnRBcmVhLnkpICsgY2hhcnRBcmVhLmhlaWdodCkgLSAzMTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXhpcyhheGlzSUQpIDogU0ZDaGFydEF4aXN8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5nZXRDaGFydEF4aXNCeU5hbWUoYXhpc0lEKVxyXG4gICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTRkNoYXJ0QXhpcyhheGlzLCB0aGlzLmV2ZW50QXhpc1JhbmdlQ2hhbmdlZCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFhBeGlzV2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGFydEFyZWEoKS53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBHZXQgYXhpcyB3aXRoIGEgZ2l2ZW4gbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBheGlzTmFtZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgU0ZDaGFydFdyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDaGFydEF4aXNCeU5hbWUoYXhpc05hbWUgOiBzdHJpbmcpIDogYW55e1xyXG4gICAgICAgIGxldCBheGVzID0gdGhpcy5fU0ZDaGFydC5tb2RlbC5fYXhlcztcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXhlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGF4ZXNbaV0ubmFtZSA9PSBheGlzTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXhlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBkb1Bhbm5pbmcocGFnZVgsIHBhZ2VZKXtcclxuICAgICBcclxuXHJcbiAgICAgICAgaWYodGhpcy5wcmV2UGFubmluZ0Nvb3Jkcy54ICE9IHVuZGVmaW5lZCl7IFxyXG4gICAgICAgICAgICBsZXQgb0RlbHRhO1xyXG4gICAgICAgICAgICBvRGVsdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAneCc6ICB0aGlzLnByZXZQYW5uaW5nQ29vcmRzLnghIC0gcGFnZVgsXHJcbiAgICAgICAgICAgICAgICAneSc6ICB0aGlzLnByZXZQYW5uaW5nQ29vcmRzLnkhIC0gcGFnZVlcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJldlBhbm5pbmdDb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAneCc6IHBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgJ3knOiBwYWdlWVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fU0ZDaGFydC5hY3RpdmVQYW5uaW5nQXhlcy5sZW5ndGggOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuZ2V0Q2hhcnRBeGlzQnlOYW1lKHRoaXMuX1NGQ2hhcnQuYWN0aXZlUGFubmluZ0F4ZXNbaV0uZ2V0QXhpc0lEKCkpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuX1NGQ2hhcnQubW9kZWwuX2F4ZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF4aXMubmFtZSA9PSB0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzW2pdLm5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBheGlzID0gdGhpcy5fU0ZDaGFydC5tb2RlbC5fYXhlc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGF4aXMudmlzaWJsZVJhbmdlLm1pbiA9IFNGQ2hhcnRBeGlzLmNoYW5nZUluZmluaXR5VG9NYXhWYWx1ZShheGlzLnZpc2libGVSYW5nZS5taW4pO1xyXG4gICAgICAgICAgICAgICAgYXhpcy52aXNpYmxlUmFuZ2UubWF4ID0gU0ZDaGFydEF4aXMuY2hhbmdlSW5maW5pdHlUb01heFZhbHVlKGF4aXMudmlzaWJsZVJhbmdlLm1heCk7XHJcbiAgICAgICAgICAgICAgICBpZihheGlzLm9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBkZWx0YSA9ICgoQmlnKGF4aXMudmlzaWJsZVJhbmdlLm1heCkubWludXMoQmlnKGF4aXMudmlzaWJsZVJhbmdlLm1pbikpKS5kaXYoQmlnKGF4aXMud2lkdGgpKSkudGltZXMoQmlnKG9EZWx0YS54KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlbHRhTm1iciA9IE51bWJlcihkZWx0YS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRBeGlzKGF4aXMubmFtZSkhLnNldEF4aXNSYW5nZSh7bWluOiBheGlzLnZpc2libGVSYW5nZS5taW4gKyBkZWx0YU5tYnIsIG1heDogYXhpcy52aXNpYmxlUmFuZ2UubWF4ICsgZGVsdGFObWJyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWx0YSA9ICgoQmlnKGF4aXMudmlzaWJsZVJhbmdlLm1heCkubWludXMoQmlnKGF4aXMudmlzaWJsZVJhbmdlLm1pbikpKS5kaXYoQmlnKGF4aXMuaGVpZ2h0KSkpLnRpbWVzKEJpZyhvRGVsdGEueSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlbHRhTm1iciA9IE51bWJlcihkZWx0YS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWx0YU5tYnIgPSBkZWx0YU5tYnIgKiAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRBeGlzKGF4aXMubmFtZSkhLnNldEF4aXNSYW5nZSh7bWluOiBheGlzLnZpc2libGVSYW5nZS5taW4gKyBkZWx0YU5tYnIsIG1heDogYXhpcy52aXNpYmxlUmFuZ2UubWF4ICsgZGVsdGFObWJyfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5wcmV2UGFubmluZ0Nvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICd4JzogcGFnZVgsXHJcbiAgICAgICAgICAgICAgICAneSc6IHBhZ2VZXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFlBeGlzKGF4aXNOYW1lOiBzdHJpbmcsIGF4aXNNaW46IG51bWJlciwgYXhpc01heDpudW1iZXIsIHBvc2l0aW9uIDogQXhpc1Bvc2l0aW9uKXtcclxuICAgICAgICBsZXQgY3VycmVudEF4ZXMgPSAgdGhpcy5fU0ZDaGFydC5vcHRpb24oXCJheGVzXCIpO1xyXG4gICAgICAgIGxldCBvcHBvc2VkUG9zaXRpb24gPSBmYWxzZTtcclxuICAgICAgICBpZihwb3NpdGlvbiA9PSBBeGlzUG9zaXRpb24ucmlnaHQpe1xyXG4gICAgICAgICAgICBvcHBvc2VkUG9zaXRpb24gPSB0cnVlOztcclxuICAgICAgICB9XHJcblxyXG4gICAgICBcclxuICAgICAgICBjdXJyZW50QXhlcy5wdXNoKHtcclxuICAgICAgICAgICAgbmFtZTogYXhpc05hbWUsXHJcbiAgICAgICAgICAgIG9wcG9zZWRQb3NpdGlvbjogb3Bwb3NlZFBvc2l0aW9uLFxyXG4gICAgICAgICAgICBtYWpvckdyaWRMaW5lczogeyB2aXNpYmxlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICByYW5nZToge21pbjogYXhpc01pbiwgbWF4OiBheGlzTWF4fSxcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IFwidmVydGljYWxcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQub3B0aW9uKFwiYXhlc1wiLCBjdXJyZW50QXhlcyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlcy5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwubWFyZ2luLnJpZ2h0ID0gMTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlWUF4aXMoYXhpc05hbWUgOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vVE9ETzogVXBkYXRlIHNvIGl0IHdvcmtzIGZvciBtb3JlIHRoYW4gMiBheGlzXHJcbiAgICAgICAgbGV0IGluZGV4O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlc1tpXS5uYW1lID09PSBheGlzTmFtZSl7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fU0ZDaGFydC5tb2RlbC5heGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5wcmltYXJ5WUF4aXMgPSB0aGlzLl9TRkNoYXJ0Lm1vZGVsLmF4ZXNbMF07XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwucHJpbWFyeVlBeGlzLm1ham9yR3JpZExpbmVzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLnByaW1hcnlZQXhpcy5vcHBvc2VkUG9zaXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5wcmltYXJ5WUF4aXMuYmFja0dyb3VuZCA9ICd0cmFuc3BhcmVudCc7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5fU0ZDaGFydC5tb2RlbC5heGVzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4ucmlnaHQgPSAxMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldFlBeGlzT2Zmc2V0KG51bWJlck9mQXhlczogbnVtYmVyKXtcclxuICAgICAgICBpZihudW1iZXJPZkF4ZXMgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4ucmlnaHQgPSAxMCArICg3MSAqIG51bWJlck9mQXhlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwubWFyZ2luLnJpZ2h0ID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKG1vdXNlWDogbnVtYmVyLCBtb3VzZVk6IG51bWJlcikgOiBDaGFydE9iamVjdEluZm9ybWF0aW9ue1xyXG4gICAgICAgIGxldCBjaGFydE9iamVjdFVuZGVyTW91c2UgPSBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuZW1wdHlTcGFjZSwge30pO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IGF4aXNCb3VuZHMgPSBBcnJheTxBeGlzQm91bmRzPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgYXhpc0JvdW5kcy5wdXNoKHRoaXMuZ2V0QXhpcyh0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzW2ldLm5hbWUpIS5nZXRBeGlzQm91bmRzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBheGlzQm91bmRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoKG1vdXNlWCAtIGF4aXNCb3VuZHNbaV0ueCkgPCAoYXhpc0JvdW5kc1tpXS53aWR0aCkgJiYgbW91c2VYID4gYXhpc0JvdW5kc1tpXS54KXtcclxuICAgICAgICAgICAgICAgIGlmKChtb3VzZVkgLSBheGlzQm91bmRzW2ldLnkpIDwgKGF4aXNCb3VuZHNbaV0uaGVpZ2h0KSAmJiBtb3VzZVkgPiBheGlzQm91bmRzW2ldLnkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0T2JqZWN0VW5kZXJNb3VzZSA9IG5ldyBDaGFydE9iamVjdEluZm9ybWF0aW9uKENoYXJ0T2JqZWN0VHlwZS5heGlzLCB7YXhpczogYXhpc0JvdW5kc1tpXS5heGlzfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjaGFydE9iamVjdFVuZGVyTW91c2U7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQge1NGQ2hhcnRXcmFwcGVyfSJdfQ==