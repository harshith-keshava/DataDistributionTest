define(["require", "exports", "../chartWidget/YTChart", "../chartWidget/XYChart", "../chartWidget/FFTChart", "./chartViewWidget", "../common/viewTypeProvider", "../chartWidget/helpers/chartRangeHelper", "../../models/chartManagerDataModel/chartManagerDataModel", "../../models/chartManagerDataModel/chartManagerChart", "../../models/common/series/eventSerieDataChangedArgs", "./helpers/chartDropHelper", "../common/states/chartViewToolbarStates", "../../core/interfaces/components/ui/chart/chartInterface", "../common/SerieChartTypeHelper", "../../models/common/series/seriesType", "../chartWidget/cursor/CrossHairCursor", "../chartWidget/cursor/LineCursor", "../common/paneProperties", "../../framework/componentHub/bindings/bindings", "../traceViewWidget/bindingIds"], function (require, exports, YTChart_1, XYChart_1, FFTChart_1, chartViewWidget_1, viewTypeProvider_1, chartRangeHelper_1, chartManagerDataModel_1, chartManagerChart_1, eventSerieDataChangedArgs_1, chartDropHelper_1, chartViewToolbarStates_1, chartInterface_1, SerieChartTypeHelper_1, seriesType_1, CrossHairCursor_1, LineCursor_1, paneProperties_1, bindings_1, bindingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartViewChartManager = /** @class */ (function () {
        /**
         * Creates an instance of ChartViewChartManager
         * @param {ChartViewWidget} chartViewWidget
         * @param {IUserInteractionController} userInteractionController
         * @param {ChartViewLayoutManager} layoutManager
         * @param {IChartManagerDataModel} chartManagerDataModel
         * @memberof ChartViewChartManager
         */
        function ChartViewChartManager(chartViewWidget, userInteractionController, layoutManager, chartManagerDataModel) {
            var _this = this;
            this.traceChartList = [];
            this.series = new Array();
            this._toolState = new chartViewToolbarStates_1.ChartViewToolState();
            this._zoomDirectionState = new chartViewToolbarStates_1.ChartViewZoomDirectionState();
            this._onSerieDataChanged = function (sender, eventArgs) { return _this.onSerieDataChanged(sender, eventArgs); };
            this._userChartInteractionHandler = function (sender, args) { return _this.onUserChartInteraction(sender, args); };
            this._onRedrawAllCharts = function (sender, args) { return _this.onRedrawAllCharts(sender, args); };
            this._onChartSeriesAdded = function (sender, args) { return _this.onChartSeriesAdded(sender, args); };
            this._persistedPanes = [];
            this._chartMinHeight = 100;
            this.chartViewWidget = chartViewWidget;
            this.userInteractionController = userInteractionController;
            this.layoutManager = layoutManager;
            this._chartManagerDataModel = chartManagerDataModel;
            this.createBindings();
        }
        Object.defineProperty(ChartViewChartManager.prototype, "toolState", {
            /**
             * Gets the tool state
             *
             * @readonly
             * @protected
             * @type {ChartViewToolState}
             * @memberof ChartViewChartManager
             */
            get: function () {
                return this._toolState;
            },
            /**
             * Sets the tool state. The method is called automatically whenever a tool state has been changed externally.
             *
             * @protected
             * @memberof ChartViewChartManager
             */
            set: function (toolState) {
                // update the backup field
                this._toolState = toolState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewChartManager.prototype, "zoomDirectionState", {
            /**
              * Gets the zoom direction state
              *
              * @readonly
              * @protected
              * @type {ChartViewZoomDirectionState}
              * @memberof ChartViewChartManager
              */
            get: function () {
                return this._zoomDirectionState;
            },
            /**
             * Sets the zoom direction state. The method is called automatically whenever a zoom direction state has been changed externally.
             *
             * @protected
             * @memberof ChartViewChartManager
             */
            set: function (zoomDirectionState) {
                // update the backup field
                this._zoomDirectionState = zoomDirectionState;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates the bindings
         *
         * @private
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.createBindings = function () {
            bindings_1.Bindings.createByDecl(bindingIds_1.TraceViewBinding.ToolState, this, "toolState", "");
            bindings_1.Bindings.createByDecl(bindingIds_1.TraceViewBinding.ZoomDirectionState, this, "zoomDirectionState", "");
        };
        ChartViewChartManager.prototype.initChartViewWithDataModel = function () {
            var _this = this;
            if (this._chartManagerDataModel != undefined) {
                // If there are already charts in the datamodel => show in chart view => needed for persisting
                if (this._chartManagerDataModel.data != undefined) {
                    //Get persisted chart panes
                    this._persistedPanes = this.layoutManager.chartSplitter.getChartViewSplitterPaneDefinitions();
                    this._chartManagerDataModel.data.forEach(function (chart) {
                        // Add charts, add scales, add series
                        _this.addTraceChart(chart, -1, chart.chartType, false); // Suppress redrawing and do it after all charts where added to avoid multiple redraws
                    });
                    // redraw all charts after adding
                    /*for (let i = 0; i < this.traceChartList.length; i++) {
                        this.traceChartList[i].redrawChart();
                    }*/
                }
            }
        };
        /**
         * Disposes the instance
         *
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.dispose = function () {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].dispose();
            }
            // Unbinds all bindings to this instance
            bindings_1.Bindings.unbind(this);
        };
        ChartViewChartManager.prototype.addTraceChart = function (chart, index, type, supressRedraw) {
            if (index === void 0) { index = -1; }
            if (supressRedraw === void 0) { supressRedraw = false; }
            var newTraceChart = this.addChartToContainer(chart.name, index, type, chart.childs);
            if (supressRedraw == false) {
                this.redrawCharts(false);
            }
            this.updateZoomSettings();
            this.updateXAxisWidth(chart.chartType);
            return newTraceChart;
        };
        ChartViewChartManager.prototype.addChartToContainer = function (name, index, type, scales) {
            if (index === void 0) { index = -1; }
            var traceChart;
            var chartHeight = 300;
            if (this.chartViewWidget.view) {
                // TODO: Handle with settings object factory
                if (type === chartManagerChart_1.ChartType.YTChart) {
                    traceChart = new YTChart_1.YTChart(this.chartViewWidget.view, name, type, scales);
                }
                else if (type === chartManagerChart_1.ChartType.XYChart) {
                    traceChart = new XYChart_1.XYChart(this.chartViewWidget.view, name, type, scales);
                }
                else {
                    traceChart = new FFTChart_1.FFTChart(this.chartViewWidget.view, name, type, scales);
                }
                traceChart.eventUserChartInteraction.attach(this._userChartInteractionHandler);
                traceChart.eventRedrawAllCharts.attach(this._onRedrawAllCharts);
                traceChart.eventSeriesAdded.attach(this._onChartSeriesAdded);
                //Set the height of persisted charts
                if (this._persistedPanes.length > 0) {
                    chartHeight = this.getPersistedChartHeight(name);
                    //Workaround: Add 2 pixels if is the first chart 
                    if (this.layoutManager.chartSplitter.layoutPanes.length == 0) {
                        chartHeight += 2;
                    }
                }
                var paneProperties = new paneProperties_1.PaneProperties();
                paneProperties.paneSize = chartHeight;
                paneProperties.minSize = this._chartMinHeight;
                this.layoutManager.chartSplitter.addWidget(traceChart, name, viewTypeProvider_1.ViewType.User, paneProperties);
                if (index != -1) {
                    // TODO: set index at addWidget Method to avoid moving the chart afterwards
                    this.layoutManager.chartSplitter.moveWidget(traceChart, index);
                    this.traceChartList.splice(index, 0, traceChart);
                }
                else {
                    this.traceChartList.push(traceChart);
                }
                return traceChart;
            }
            return undefined;
        };
        /**
         * Get height of persisted charts
         *
         * @param {string} chartName
         * @returns {number}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.getPersistedChartHeight = function (chartName) {
            var chartHeight = this.layoutManager.getChartViewSplitterHeight(this._persistedPanes, chartName);
            this._persistedPanes = this._persistedPanes.filter(function (element) { return element.componentDefinition.id != chartName; });
            return chartHeight;
        };
        /**
         * Method to set the ZoomSetting(Direction and BoxZoom) for all Charts according to the corresponding states
         *
         * @private
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateZoomSettings = function () {
            var toolstate = this.toolState;
            var zoomDirectionState = this.zoomDirectionState;
            if (toolstate.selectedTool == chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM) {
                this.setBoxZoom(true);
                this.setPanning(false);
            }
            else if (toolstate.selectedTool == chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING) {
                this.setBoxZoom(false);
                this.setPanning(true);
            }
            else {
                this.setBoxZoom(false);
                this.setPanning(false);
            }
            this.setChartZoomAxes(zoomDirectionState.zoomDirection);
        };
        ChartViewChartManager.prototype.removeTraceChart = function (chart) {
            chart.eventUserChartInteraction.detach(this._userChartInteractionHandler);
            chart.eventRedrawAllCharts.detach(this._onRedrawAllCharts);
            chart.eventSeriesAdded.detach(this._onChartSeriesAdded);
            this.removeChartFromChartList(chart);
            chart.dispose();
            this.layoutManager.chartSplitter.removeWidget(chart);
        };
        ChartViewChartManager.prototype.removeChartFromChartList = function (chart) {
            var index = this.getChartIndex(chart);
            if (index > -1) {
                this.traceChartList.splice(index, 1);
            }
        };
        ChartViewChartManager.prototype.moveTraceChart = function (chart, targetChart, args) {
            var traceChart = this.getChartObjectByName(chart.name);
            var targetTraceChart = this.getChartObjectByName(targetChart.name);
            if (traceChart != undefined && targetTraceChart != undefined) {
                var chartIndex = this.getChartIndex(traceChart);
                var targetIndex = this.getChartIndex(targetTraceChart);
                if (args.insertType == "insertBelow") {
                    targetIndex += 1;
                }
                if (chartIndex > -1 && targetIndex > -1) {
                    this.traceChartList.splice(chartIndex, 1);
                    if (chartIndex < targetIndex) {
                        this.traceChartList.splice(targetIndex - 1, 0, traceChart);
                    }
                    else {
                        this.traceChartList.splice(targetIndex, 0, traceChart);
                    }
                    this.layoutManager.chartSplitter.moveWidget(traceChart, targetIndex);
                }
                this.redrawCharts(false);
                this.updateXAxisWidth(chart.chartType);
            }
        };
        ChartViewChartManager.prototype.removeAllCharts = function () {
            while (this.traceChartList.length > 0) {
                this.removeTraceChart(this.traceChartList[0]);
            }
        };
        ChartViewChartManager.prototype.getChartIndex = function (chart) {
            var index = -1;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i] == chart) {
                    index = i;
                }
            }
            return index;
        };
        ChartViewChartManager.prototype.getTraceChartByContainerId = function (containerID) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                var divId = this.traceChartList[i].mainDivId;
                if (divId == containerID.substr(0, divId.length)) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.getTraceChartByName = function (chartName) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].widgetName == chartName) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.onChartManagerModelChanged = function (dataModel, args) {
            this._chartManagerDataModel = dataModel;
            switch (args.hint) {
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addSerie: {
                    this.addSeriesToChart(args.data.series, args.data.chart, args.data.axis, args.data.keepScales);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.moveSerie: {
                    this.moveSerie(args.data.serie, args.data.chart.name, args.data.targetChart.name, args.data.targetAxis);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeSerie: {
                    this.removeSerie(args.data.serie, args.data.chart.name);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeChart: {
                    this.removeChart(args.data.chart);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addChart: {
                    this.addTraceChart(args.data.chart, args.data.index, args.data.type);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.moveChart: {
                    this.moveTraceChart(args.data.chart, args.data.target, args.data);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addYScale: {
                    this.addYScale(args.data.yAxis, args.data.chart.name);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeYScale: {
                    this.removeYAxis(args.data.yAxis, args.data.chart);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.updateScaleRange: {
                    this.synchronizeScaleXRange(args.data.scale);
                    break;
                }
            }
        };
        ChartViewChartManager.prototype.addSeriesToChart = function (series, chart, scale, keepScales) {
            if (keepScales === void 0) { keepScales = false; }
            for (var i = 0; i < series.length; i++) {
                series[i].eventDataChanged.attach(this._onSerieDataChanged);
            }
            var chartName = chart.name;
            var resetXRange = false;
            var resetYRange = false;
            if (!keepScales) {
                resetXRange = this.isFirstSeriesOfTypeInCharts(series[0]);
                resetYRange = this.isFirstSeriesOnScale(series[0], scale);
            }
            else {
                var chartObj = this.getChartObjectByName(chartName);
                if (chartObj != undefined) {
                    // TODO: Only works for YT but not for FFT
                    // Update scale(Y)
                    chartObj.setScaleRange(scale, scale.minXValue, scale.maxXValue, scale.minYValue, scale.maxYValue);
                    // Update scale(X)
                    chartObj.setRangeX(scale.minXValue, scale.maxXValue);
                }
            }
            this.addSeries(series, chartName, scale, resetYRange, resetXRange);
            if (resetXRange) {
                this.resetXRange(series[0]);
            }
        };
        /**
         *Checks if a given Series is the first Series on a particular scale
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @param {Scale} scale
         * @returns {boolean}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isFirstSeriesOnScale = function (series, scale) {
            //only reset the chartrange on the y axis if these are the first series in the scale
            if (scale.childs.length < 1 || series != scale.childs[0]) {
                return false;
            }
            return true;
        };
        /**
         *Checks if a given Series is the first of its type in all charts
         *
         * @private
         * @param {BaseSeries} series
         * @returns
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isFirstSeriesOfTypeInCharts = function (series) {
            var charts = this.getChartsForSerie(series);
            for (var _i = 0, charts_1 = charts; _i < charts_1.length; _i++) {
                var chart = charts_1[_i];
                if (chart.series.length != 0) {
                    return false;
                }
            }
            return true;
        };
        ChartViewChartManager.prototype.getChartsForSerie = function (series) {
            var charts = Array();
            if (series.type == seriesType_1.SeriesType.fftSeries) {
                charts = new chartRangeHelper_1.ChartRangeHelper().getFFTCharts(this.traceChartList);
            }
            else if (series.type == seriesType_1.SeriesType.timeSeries) {
                charts = new chartRangeHelper_1.ChartRangeHelper().getYTCharts(this.traceChartList);
            }
            return charts;
        };
        ChartViewChartManager.prototype.onSerieDataChanged = function (sender, eventArgs) {
            if (eventArgs.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                this.updateSerieData(sender);
            }
            else if (eventArgs.action == eventSerieDataChangedArgs_1.SerieAction.colorChanged) {
                this.updateSerieColor(sender);
            }
        };
        /**
         *  Updates the serie datapoints in all charts where the serie is displayed
         *  If datapoints not valid, the serie will be removed from the charts otherwise added if not already in the chart
         *
         * @private
         * @param {BaseSeries} series
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateSerieData = function (series) {
            if (series.rawPointsValid == false) {
                // No valid serie data => remove from all charts
                this.removeSerieFromAllCharts(series);
            }
            else {
                // add serie to chart if not already in it otherwise update chart
                if (this._chartManagerDataModel != undefined) {
                    var charts = this._chartManagerDataModel.getChartsUsingSerie([series]);
                    this.updateSerieInAllCharts(charts, series);
                }
            }
        };
        ChartViewChartManager.prototype.updateSerieInAllCharts = function (charts, series) {
            var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(series.type);
            for (var i = 0; i < charts.length; i++) {
                var chart = this.getChartObjectByName(charts[i].name);
                if (chart != undefined && serieChartType == chart.type) {
                    if (!this.isSerieInChart(chart, series)) {
                        // add series 
                        var scale = charts[i].getYAxisForSerie(series);
                        if (scale != undefined) {
                            var isFirstSeriesInChart = this.isFirstSeriesOfTypeInCharts(series);
                            this.addSeries([series], charts[i].name, scale, this.isFirstSeriesOnScale(series, scale), true);
                            if (isFirstSeriesInChart) {
                                this.resetXRange(series);
                            }
                        }
                        else {
                            console.error("Scale not found for serie");
                        }
                    }
                    chart.setAvailableSeriesAsDataSource();
                    chart.redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.resetXRange = function (series) {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            if (series.type == seriesType_1.SeriesType.timeSeries) {
                chartRangeHelper.resetXRangesYT(this.traceChartList);
            }
            else if (series.type == seriesType_1.SeriesType.fftSeries) {
                chartRangeHelper.resetXRangesFFT(this.traceChartList);
            }
            this.redrawCharts(true);
        };
        /**
         * Updates the color of the serie in all charts where the serie is displayed
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateSerieColor = function (serie) {
            if (this._chartManagerDataModel != undefined) {
                var series = new Array();
                series.push(serie);
                var charts = this._chartManagerDataModel.getChartsUsingSerie(series);
                for (var i = 0; i < charts.length; i++) {
                    var chart = this.getChartObjectByName(charts[i].name);
                    if (chart != undefined) {
                        // Update series color in the chart
                        chart.setAvailableSeriesAsDataSource();
                    }
                }
            }
        };
        /**
         * add serie to chart
         *
         * @param {Array<BaseSeries>} series
         * @param {string} chartName
         * @param {Scale} scale
         * @param {boolean} updateRangeY
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.addSeries = function (series, chartName, scale, updateRangeY, updateRangeX) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                var axisMin = void 0;
                var axisMax = void 0;
                var axis = chart.chart.getAxis(scale.id);
                if (axis != undefined) {
                    var axisRange = axis.getAxisRange();
                    if (axisRange != undefined) {
                        axisMin = axisRange.min;
                        axisMax = axisRange.max;
                    }
                }
                else {
                    console.error("Scale not available! " + scale.id);
                }
                chart.addSeriesToChart(series, scale, updateRangeX);
                chart.setAvailableSeriesAsDataSource();
                if (axisMin != undefined && axisMax != undefined) {
                    chart.setScaleRange(scale, scale.minXValue, scale.maxXValue, axisMin, axisMax);
                }
                if (updateRangeY) {
                    var axisMinValue = chart.getSeriesMinYForScale(scale);
                    var axisMaxValue = chart.getSeriesMaxYForScale(scale);
                    if (axisMinValue != undefined && axisMaxValue != undefined) {
                        chart.updateRangeY(scale, axisMinValue, axisMaxValue);
                    }
                }
                chart.redrawChart();
            }
        };
        ChartViewChartManager.prototype.addYScale = function (yScale, chartName) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                chart.addYScale(yScale, chartInterface_1.AxisPosition.right);
                this.updateXAxisWidth(chart.type);
            }
        };
        /**
         * move one serie from one chart to another
         *
         * @param {BaseSeries} serie
         * @param {string} chartName
         * @param {string} targetChartName
         * @param {Scale} targetScale
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.moveSerie = function (serie, chartName, targetChartName, targetScale) {
            if (serie.rawPointsValid == true) {
                var chart = this.getChartObjectByName(chartName);
                var target = this.getChartObjectByName(targetChartName);
                var series = new Array();
                series.push(serie);
                if (chart != undefined && target != undefined) {
                    chart.removeSerieFromChart(serie, this.isLastSerieWithCursorType(chart));
                    target.addSeriesToChart(series, targetScale, true);
                    chart.setAvailableSeriesAsDataSource();
                    target.setAvailableSeriesAsDataSource();
                }
                this.updateXAxisWidth(chart.type);
            }
        };
        /**
         * remove one serie from given chart
         *
         * @param {BaseSeries} serie
         * @param {string} chartName
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.removeSerie = function (serie, chartName) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                chart.removeSerieFromChart(serie, this.isLastSerieWithCursorType(chart));
                chart.setAvailableSeriesAsDataSource();
            }
            var chartsWithSerie = this._chartManagerDataModel.getChartsUsingSerie([serie]);
            if (chartsWithSerie.length == 0) { // Serie not used in an other chart => detach serie events
                serie.eventDataChanged.detach(this._onSerieDataChanged);
            }
        };
        ChartViewChartManager.prototype.removeYAxis = function (yScale, chart) {
            var traceChart = this.getChartObjectByName(chart.name);
            if (traceChart != undefined) {
                traceChart.removeYScaleFromChart(yScale);
                traceChart.setAvailableSeriesAsDataSource();
            }
            this.updateXAxisWidth(chart.chartType);
        };
        /**
         * remove chart
         *
         * @param {string} chartName
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.removeChart = function (chart) {
            var traceChart = this.getChartObjectByName(chart.name);
            if (traceChart != undefined) {
                this.removeTraceChart(traceChart);
                var minX = void 0;
                var maxX = void 0;
                for (var i = 0; i < traceChart.series.length; i++) {
                    if (minX == undefined || minX > traceChart.series[i].minX) {
                        minX = traceChart.series[i].minX;
                    }
                    if (maxX == undefined || maxX < traceChart.series[i].maxX) {
                        maxX = traceChart.series[i].maxX;
                    }
                }
            }
            this.updateXAxisWidth(chart.chartType);
        };
        ChartViewChartManager.prototype.setPanningAxes = function (axes) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                var panningAxis = new Array();
                if (axes[0] == undefined) {
                    for (var j = 0; j < this.traceChartList[i].scales.length; j++) {
                        var axis = this.traceChartList[i].chart.getAxis(this.traceChartList[i].scales[j].id);
                        if (axis != undefined) {
                            panningAxis.push(axis);
                        }
                    }
                    var axis = this.traceChartList[i].chart.getAxis(this.traceChartList[i].primaryXAxisName);
                    if (axis != undefined) {
                        panningAxis.push(axis);
                    }
                }
                else {
                    panningAxis = axes;
                }
                this.traceChartList[i].chart.setPanningAxes(panningAxis);
            }
        };
        ChartViewChartManager.prototype.synchronizeScaleXRange = function (scale) {
            var chartType = scale.parent.chartType;
            var min = scale.minXValue;
            var max = scale.maxXValue;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].onSynchronizeScaleRange(scale, min, max);
                    //this.traceChartList[i].redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.getZoomAxesInChart = function (chart, zoomDirection) {
            var axes = new Array();
            if (zoomDirection == chartViewWidget_1.ZoomDirection.XY || zoomDirection == chartViewWidget_1.ZoomDirection.X) {
                var axis = chart.chart.getAxis(chart.primaryXAxisName);
                if (axis != undefined) {
                    axes.push(axis);
                }
            }
            if (zoomDirection == chartViewWidget_1.ZoomDirection.XY || zoomDirection == chartViewWidget_1.ZoomDirection.Y) {
                for (var i = 0; i < chart.scales.length; i++) {
                    var axis = chart.chart.getAxis(chart.scales[i].id);
                    if (axis != undefined && axis.getAxisOrientation() == chartInterface_1.AxisOrientation.vertical) {
                        axes.push(axis);
                    }
                }
            }
            return axes;
        };
        /**
         * Returns true if there are no more series in all other charts with the same cursor type
         *
         * @private
         * @param {ITraceChart} chart
         * @returns {boolean}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isLastSerieWithCursorType = function (chart) {
            var cursorType = chart.getSerieCursorType();
            if (chart.series.length > 1) {
                return false;
            }
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].getSerieCursorType() === cursorType && this.traceChartList[i] !== chart) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Finds ITraceChartObject by give name and return object
         *
         * @private
         * @param {string} name
         * @returns {(ITraceChart | undefined)}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.getChartObjectByName = function (name) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].widgetName == name) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.isSerieInChart = function (chart, serie) {
            for (var i = 0; i < chart.series.length; i++) {
                if (chart.series[i].id === serie.id) {
                    return true;
                }
            }
            return false;
        };
        /*private getPreviousChartObjectByName(name :string) : ITraceChart | undefined{
            for(let i = 0; i < this.traceChartList.length; i++){
                if(this.traceChartList[i].widgetName == name){
                   return this.traceChartList[i];
                }
            }
            return undefined;
        }*/
        ChartViewChartManager.prototype.removeSerieFromAllCharts = function (serie) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                var index = this.traceChartList[i].series.map(function (x) { return x.id; }).indexOf(serie.id);
                //const index = this.traceChartList[i].series.indexOf(serie, 0);
                if (index > -1) {
                    this.traceChartList[i].removeSerieFromChart(this.traceChartList[i].series[index], this.isLastSerieWithCursorType(this.traceChartList[i]));
                }
            }
        };
        ChartViewChartManager.prototype.checkReferenceCursorsHovering = function (mousePoint, traceChart) {
            traceChart.checkCursorsHovering(mousePoint);
        };
        ChartViewChartManager.prototype.dragCursorAlongLine = function (traceChart, movementX, movementY) {
            traceChart.dragCursorAlongLine(movementX, movementY, this._hoveredSeries);
        };
        ChartViewChartManager.prototype.setCursorOnPointerPosition = function (traceChart, mousePoint) {
            traceChart.setCursorOnPointerPosition(mousePoint);
        };
        ChartViewChartManager.prototype.doPanning = function (traceChart, mousePointX, mousePointY) {
            traceChart.doPanning(mousePointX, mousePointY);
        };
        ChartViewChartManager.prototype.resetPanningCoords = function () {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.resetPanningCoords();
            }
        };
        ChartViewChartManager.prototype.resetZoom = function () {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            chartRangeHelper.resetXRangesAllChartTypes(this.traceChartList);
            chartRangeHelper.resetYRangesAllChartTypes(this.traceChartList);
            this.redrawCharts(true);
        };
        ChartViewChartManager.prototype.resetCursorsHovering = function (args) {
            if (this.traceChartList.length > 0) {
                var parentElement = args.data.e.target.parentElement;
                if (parentElement !== undefined && parentElement !== null) {
                    var mouseOverCursors = this.isMouseOverCursors(parentElement);
                    //Just reset cursors if mouse is moving outside a chart
                    if (this.getTraceChartByContainerId(parentElement.id) === undefined && !mouseOverCursors) {
                        this.traceChartList[0].resetCursorsHovered();
                    }
                }
            }
        };
        ChartViewChartManager.prototype.autoScale = function () {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.autoScaleYScales();
            }
            chartRangeHelper.resetXRangesAllChartTypes(this.traceChartList);
            this.redrawCharts(true);
        };
        ChartViewChartManager.prototype.setChartZoomAxes = function (axes) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setZoomAxes(axes);
            }
            this.chartViewWidget.activeSelectedZoomAxis = axes;
        };
        ChartViewChartManager.prototype.setPanning = function (enable) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setPanning(enable);
            }
        };
        ChartViewChartManager.prototype.setBoxZoom = function (enable) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setBoxZoom(enable);
            }
        };
        ChartViewChartManager.prototype.redrawCharts = function (forceRedraw, chartType) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                //if (forceRedraw == true || this.traceChartList[i].type != ChartType.XYChart) {
                //    this.traceChartList[i].redrawChart();
                //}
                if (chartType == undefined || forceRedraw == true || this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.onRedrawAllCharts = function (sender, args) {
            this.redrawCharts(false, args.chartType);
        };
        ChartViewChartManager.prototype.onChartSeriesAdded = function (sender, args) {
            if (args != undefined) {
                var serie = args;
                serie.eventDataChanged.attach(this._onSerieDataChanged);
            }
        };
        ChartViewChartManager.prototype.isMouseOverCursors = function (element) {
            if (element.classList.value.includes(CrossHairCursor_1.CrossHairCursor.crossHairCursorId) || element.classList.value.includes(LineCursor_1.LineCursor.lineCursorId)) {
                return true;
            }
            return false;
        };
        ChartViewChartManager.prototype.onUserChartInteraction = function (sender, eventUserChartInteractionArgs) {
            //on dragging the hoverd series needs to be stored to calculate the cursor postion when the mouse is moved over multiple charts
            if (eventUserChartInteractionArgs.eventArguments.hoveredSeries) {
                this._hoveredSeries = eventUserChartInteractionArgs.eventArguments.hoveredSeries;
            }
            this.chartViewWidget.onUserChartInteraction(sender, eventUserChartInteractionArgs);
        };
        ChartViewChartManager.prototype.addDroppableLocations = function (data, sameGroup) {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                var chartManagerChart = this._chartManagerDataModel.getChart(chart.widgetName);
                var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(data[0].type);
                SerieChartTypeHelper_1.SerieChartTypeHelper.setDropPossibleAreas(chartManagerChart, data, serieChartType, sameGroup);
                chart.addSerieDropLocations(data, chartManagerChart);
            }
            var dropHelper = new chartDropHelper_1.ChartDropHelper(this._chartManagerDataModel, this.chartViewWidget);
            // Add empty space drop location
            if (dropHelper.canAddChart() == true) { // Is it possible to add one more chart
                var emptySpaceElement = document.getElementById(this.layoutManager.chartSplitter.getLastPaneId());
                var scrollBarWidth = $('#' + this.layoutManager.chartSplitterParentContainerId)[0].offsetWidth - $('#' + this.layoutManager.chartSplitterContainerId)[0].offsetWidth;
                if (emptySpaceElement != undefined) {
                    emptySpaceElement.style.backgroundColor = 'rgba(125,160,165, 0.2)';
                    if (data[0].type == seriesType_1.SeriesType.timeSeries && data.length > 2 || !sameGroup) {
                        this.addChartTypeAreas(emptySpaceElement, [true, false, true], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.timeSeries) {
                        this.addChartTypeAreas(emptySpaceElement, [true, true, true], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.xySeries) {
                        this.addChartTypeAreas(emptySpaceElement, [false, true, false], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.fftSeries) {
                        this.addChartTypeAreas(emptySpaceElement, [false, false, true], scrollBarWidth);
                    }
                }
            }
        };
        ChartViewChartManager.prototype.addChartTypeAreas = function (parent, enabled, scrollBarWidth) {
            var chartNames = ['YT', 'XY', 'FFT'];
            for (var i = 0; i < chartNames.length; i = i + 1) {
                var area = document.createElement('div');
                area.id = parent.id + '_' + chartNames[i];
                area.classList.add('chartTypes');
                if (!enabled[i]) {
                    area.classList.add('disabled');
                }
                area.style.width = ((parent.offsetWidth - scrollBarWidth) / chartNames.length).toString() + 'px';
                var image = document.createElement("img");
                image.src = './widgets/common/style/images/chartType' + chartNames[i] + '.svg';
                image.classList.add('imageChart');
                area.appendChild(image);
                parent.appendChild(area);
            }
        };
        ChartViewChartManager.prototype.removeDroppableLocations = function () {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.removeSerieDropLocations();
            }
            // Remove empty space drop location
            var emptySpaceElement = document.getElementById(this.layoutManager.chartSplitter.getLastPaneId());
            if (emptySpaceElement != undefined) {
                var typeOfCharts = emptySpaceElement.children.length;
                emptySpaceElement.style.backgroundColor = '#fff';
                for (var i = 0; i < typeOfCharts; i = i + 1) {
                    emptySpaceElement.children[0].remove();
                }
            }
        };
        ChartViewChartManager.prototype.updateXAxisWidth = function (chartType) {
            var maxYAxes = 0;
            var chartArea;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].chart.redraw();
                    var numberOfYAxesInChart = this.traceChartList[i].getNumberOfYScales();
                    if (numberOfYAxesInChart == 0) {
                        numberOfYAxesInChart = 1;
                    }
                    //if one chart has more axis than the others use its width, if they have the same amount use the one with the higher width
                    if (numberOfYAxesInChart > maxYAxes) {
                        maxYAxes = numberOfYAxesInChart;
                        chartArea = this.traceChartList[i].chart.getChartArea();
                    }
                    else if (numberOfYAxesInChart == maxYAxes && this.traceChartList[i].chart.getChartArea().width > chartArea.width) {
                        chartArea = this.traceChartList[i].chart.getChartArea();
                    }
                }
            }
            if (chartArea != undefined) {
                this.alignYAxes(chartArea, chartType);
            }
        };
        ChartViewChartManager.prototype.alignYAxes = function (chartArea, chartType) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    var newChartArea = { x: chartArea.x, y: chartArea.y, width: chartArea.width, height: this.traceChartList[i].chart.getChartArea().height - 1 };
                    this.traceChartList[i].chart.setChartArea(newChartArea);
                    this.traceChartList[i].redrawChart();
                }
            }
        };
        return ChartViewChartManager;
    }());
    exports.ChartViewChartManager = ChartViewChartManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdDaGFydE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBaUNBO1FBc0VJOzs7Ozs7O1dBT0c7UUFDSCwrQkFBWSxlQUFnQyxFQUFFLHlCQUFxRCxFQUFFLGFBQXFDLEVBQUUscUJBQTZDO1lBQXpMLGlCQU9DO1lBbkZELG1CQUFjLEdBQXVCLEVBQUUsQ0FBQztZQUN4QyxXQUFNLEdBQWlCLElBQUksS0FBSyxFQUFjLENBQUM7WUFNdkMsZUFBVSxHQUF1QixJQUFJLDJDQUFrQixFQUFFLENBQUM7WUFDMUQsd0JBQW1CLEdBQWdDLElBQUksb0RBQTJCLEVBQUUsQ0FBQztZQUVyRix3QkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUExQyxDQUEwQyxDQUFDO1lBQ3hGLGlDQUE0QixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXpDLENBQXlDLENBQUM7WUFDM0YsdUJBQWtCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQztZQUMxRSx3QkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO1lBRTVFLG9CQUFlLEdBQWtDLEVBQUUsQ0FBQztZQUkzQyxvQkFBZSxHQUFHLEdBQUcsQ0FBQztZQTBEbkMsSUFB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LENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLENBQUM7b0JBQzdJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDeEM7YUFFSjtRQUNMLENBQUM7UUFDTCw0QkFBQztJQUFELENBQUMsQUFwL0JELElBby9CQztJQXAvQlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCJcclxuaW1wb3J0IHsgWVRDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9ZVENoYXJ0XCJcclxuaW1wb3J0IHsgWFlDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9YWUNoYXJ0XCJcclxuaW1wb3J0IHsgRkZUQ2hhcnQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvRkZUQ2hhcnRcIjtcclxuaW1wb3J0IHsgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MsIENoYXJ0QmFzZSwgRXZlbnRSZWRyYXdBbGxDaGFydHNBcmdzIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L0NoYXJ0QmFzZVwiXHJcbmltcG9ydCB7IENoYXJ0Vmlld0xheW91dE1hbmFnZXIgfSBmcm9tIFwiLi9jaGFydFZpZXdMYXlvdXRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdXaWRnZXQsIFpvb21EaXJlY3Rpb24gfSBmcm9tIFwiLi9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgVmlld1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRSYW5nZUhlbHBlciB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9oZWxwZXJzL2NoYXJ0UmFuZ2VIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgSVVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2ludGVyZmFjZXMvY29udHJvbGxlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUsIENoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIlxyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIlxyXG5pbXBvcnQgeyBTZXJpZUFjdGlvbiwgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9ldmVudFNlcmllRGF0YUNoYW5nZWRBcmdzXCJcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBDaGFydERyb3BIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdUb29sU3RhdGUsIENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSwgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bSB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2NoYXJ0Vmlld1Rvb2xiYXJTdGF0ZXNcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBeGlzUG9zaXRpb24sIEF4aXNPcmllbnRhdGlvbiB9IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tIFwiLi4vLi4vY29yZS90eXBlcy9SZWN0YW5nbGVcIjtcclxuaW1wb3J0IHsgSUNoYXJ0QXhpcyB9IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9DaGFydEF4aXNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyUGFuZURlZmluaXRpb24gfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJQYW5lRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDcm9zc0hhaXJDdXJzb3IgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvY3Vyc29yL0Nyb3NzSGFpckN1cnNvclwiO1xyXG5pbXBvcnQgeyBMaW5lQ3Vyc29yIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L2N1cnNvci9MaW5lQ3Vyc29yXCI7XHJcbmltcG9ydCB7IFBhbmVQcm9wZXJ0aWVzIH0gZnJvbSBcIi4uL2NvbW1vbi9wYW5lUHJvcGVydGllc1wiO1xyXG5pbXBvcnQgeyBCaW5kaW5ncyB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2JpbmRpbmdzXCI7XHJcbmltcG9ydCB7IFRyYWNlVmlld0JpbmRpbmcgfSBmcm9tIFwiLi4vdHJhY2VWaWV3V2lkZ2V0L2JpbmRpbmdJZHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFydFZpZXdDaGFydE1hbmFnZXIge1xyXG4gICAgY2hhcnRWaWV3V2lkZ2V0OiBDaGFydFZpZXdXaWRnZXQ7XHJcbiAgICB0cmFjZUNoYXJ0TGlzdDogQXJyYXk8SVRyYWNlQ2hhcnQ+ID0gW107XHJcbiAgICBzZXJpZXM6IEJhc2VTZXJpZXNbXSA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG5cclxuICAgIGxheW91dE1hbmFnZXI6IENoYXJ0Vmlld0xheW91dE1hbmFnZXI7XHJcbiAgICB1c2VySW50ZXJhY3Rpb25Db250cm9sbGVyOiBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlcjtcclxuICAgIF9jaGFydE1hbmFnZXJEYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcblxyXG4gICAgcHJpdmF0ZSBfdG9vbFN0YXRlOiBDaGFydFZpZXdUb29sU3RhdGUgPSBuZXcgQ2hhcnRWaWV3VG9vbFN0YXRlKCk7XHJcbiAgICBwcml2YXRlIF96b29tRGlyZWN0aW9uU3RhdGU6IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSA9IG5ldyBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9vblNlcmllRGF0YUNoYW5nZWQgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHRoaXMub25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzKTtcclxuICAgIHByaXZhdGUgX3VzZXJDaGFydEludGVyYWN0aW9uSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Vc2VyQ2hhcnRJbnRlcmFjdGlvbihzZW5kZXIsIGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfb25SZWRyYXdBbGxDaGFydHMgPSAoc2VuZGVyLGFyZ3MpID0+IHRoaXMub25SZWRyYXdBbGxDaGFydHMoc2VuZGVyLGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfb25DaGFydFNlcmllc0FkZGVkID0gKHNlbmRlcixhcmdzKSA9PiB0aGlzLm9uQ2hhcnRTZXJpZXNBZGRlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGVyc2lzdGVkUGFuZXM6IEFycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+ID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfaG92ZXJlZFNlcmllcztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jaGFydE1pbkhlaWdodCA9IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRvb2wgc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtDaGFydFZpZXdUb29sU3RhdGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgdG9vbFN0YXRlKCkgOiBDaGFydFZpZXdUb29sU3RhdGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sU3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHRvb2wgc3RhdGUuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSB0b29sIHN0YXRlIGhhcyBiZWVuIGNoYW5nZWQgZXh0ZXJuYWxseS4gXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0IHRvb2xTdGF0ZSh0b29sU3RhdGUgOiBDaGFydFZpZXdUb29sU3RhdGUpIHtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGJhY2t1cCBmaWVsZFxyXG4gICAgICAgIHRoaXMuX3Rvb2xTdGF0ZSA9IHRvb2xTdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiBHZXRzIHRoZSB6b29tIGRpcmVjdGlvbiBzdGF0ZVxyXG4gICAgICAqXHJcbiAgICAgICogQHJlYWRvbmx5XHJcbiAgICAgICogQHByb3RlY3RlZFxyXG4gICAgICAqIEB0eXBlIHtDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGV9XHJcbiAgICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICAqL1xyXG4gICAgIHByb3RlY3RlZCBnZXQgem9vbURpcmVjdGlvblN0YXRlKCkgOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl96b29tRGlyZWN0aW9uU3RhdGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgem9vbSBkaXJlY3Rpb24gc3RhdGUuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSB6b29tIGRpcmVjdGlvbiBzdGF0ZSBoYXMgYmVlbiBjaGFuZ2VkIGV4dGVybmFsbHkuIFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNldCB6b29tRGlyZWN0aW9uU3RhdGUoem9vbURpcmVjdGlvblN0YXRlOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUpIHtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGJhY2t1cCBmaWVsZFxyXG4gICAgICAgIHRoaXMuX3pvb21EaXJlY3Rpb25TdGF0ZSA9IHpvb21EaXJlY3Rpb25TdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld1dpZGdldH0gY2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0ge0lVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyfSB1c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld0xheW91dE1hbmFnZXJ9IGxheW91dE1hbmFnZXJcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckRhdGFNb2RlbH0gY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0Vmlld1dpZGdldDogQ2hhcnRWaWV3V2lkZ2V0LCB1c2VySW50ZXJhY3Rpb25Db250cm9sbGVyOiBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlciwgbGF5b3V0TWFuYWdlcjogQ2hhcnRWaWV3TGF5b3V0TWFuYWdlciwgY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXdXaWRnZXQgPSBjaGFydFZpZXdXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyID0gdXNlckludGVyYWN0aW9uQ29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIgPSBsYXlvdXRNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNyZWF0ZUJpbmRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBiaW5kaW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQmluZGluZ3MoKXtcclxuICAgICAgICBCaW5kaW5ncy5jcmVhdGVCeURlY2woVHJhY2VWaWV3QmluZGluZy5Ub29sU3RhdGUsIHRoaXMsIFwidG9vbFN0YXRlXCIsIFwiXCIpO1xyXG4gICAgICAgIEJpbmRpbmdzLmNyZWF0ZUJ5RGVjbChUcmFjZVZpZXdCaW5kaW5nLlpvb21EaXJlY3Rpb25TdGF0ZSwgdGhpcywgXCJ6b29tRGlyZWN0aW9uU3RhdGVcIiwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRDaGFydFZpZXdXaXRoRGF0YU1vZGVsKCl7ICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgYWxyZWFkeSBjaGFydHMgaW4gdGhlIGRhdGFtb2RlbCA9PiBzaG93IGluIGNoYXJ0IHZpZXcgPT4gbmVlZGVkIGZvciBwZXJzaXN0aW5nXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5kYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvL0dldCBwZXJzaXN0ZWQgY2hhcnQgcGFuZXNcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BlcnNpc3RlZFBhbmVzID0gdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIuZ2V0Q2hhcnRWaWV3U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5kYXRhLmZvckVhY2goY2hhcnQ9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGNoYXJ0cywgYWRkIHNjYWxlcywgYWRkIHNlcmllc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVHJhY2VDaGFydChjaGFydCwtMSwgKGNoYXJ0IGFzIENoYXJ0TWFuYWdlckNoYXJ0KS5jaGFydFR5cGUsIGZhbHNlKTsgLy8gU3VwcHJlc3MgcmVkcmF3aW5nIGFuZCBkbyBpdCBhZnRlciBhbGwgY2hhcnRzIHdoZXJlIGFkZGVkIHRvIGF2b2lkIG11bHRpcGxlIHJlZHJhd3NcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlZHJhdyBhbGwgY2hhcnRzIGFmdGVyIGFkZGluZ1xyXG4gICAgICAgICAgICAgICAgLypmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFVuYmluZHMgYWxsIGJpbmRpbmdzIHRvIHRoaXMgaW5zdGFuY2VcclxuICAgICAgICBCaW5kaW5ncy51bmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVHJhY2VDaGFydChjaGFydDogQ2hhcnRNYW5hZ2VyQ2hhcnQsIGluZGV4OiBudW1iZXIgPSAtMSwgdHlwZTogbnVtYmVyLCBzdXByZXNzUmVkcmF3OiBib29sZWFuID0gZmFsc2UpOiBJVHJhY2VDaGFydHx1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBuZXdUcmFjZUNoYXJ0OiBJVHJhY2VDaGFydHx1bmRlZmluZWQgPSB0aGlzLmFkZENoYXJ0VG9Db250YWluZXIoY2hhcnQubmFtZSwgaW5kZXgsIHR5cGUsIGNoYXJ0LmNoaWxkcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc3VwcmVzc1JlZHJhdyA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMucmVkcmF3Q2hhcnRzKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVab29tU2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVYQXhpc1dpZHRoKGNoYXJ0LmNoYXJ0VHlwZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1RyYWNlQ2hhcnQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYWRkQ2hhcnRUb0NvbnRhaW5lcihuYW1lOiBzdHJpbmcsIGluZGV4OiBudW1iZXIgPSAtMSwgdHlwZTogQ2hhcnRUeXBlLCBzY2FsZXM6IFNjYWxlW10pOiBJVHJhY2VDaGFydHx1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCB0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydDtcclxuICAgICAgICBsZXQgY2hhcnRIZWlnaHQgPSAzMDA7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhcnRWaWV3V2lkZ2V0LnZpZXcpIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogSGFuZGxlIHdpdGggc2V0dGluZ3Mgb2JqZWN0IGZhY3RvcnlcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IENoYXJ0VHlwZS5ZVENoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0ID0gbmV3IFlUQ2hhcnQodGhpcy5jaGFydFZpZXdXaWRnZXQudmlldywgbmFtZSwgdHlwZSwgc2NhbGVzKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0ID0gbmV3IFhZQ2hhcnQodGhpcy5jaGFydFZpZXdXaWRnZXQudmlldywgbmFtZSwgdHlwZSwgc2NhbGVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnQgPSBuZXcgRkZUQ2hhcnQodGhpcy5jaGFydFZpZXdXaWRnZXQudmlldywgbmFtZSwgdHlwZSwgc2NhbGVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdHJhY2VDaGFydC5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uLmF0dGFjaCh0aGlzLl91c2VyQ2hhcnRJbnRlcmFjdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0cmFjZUNoYXJ0LmV2ZW50UmVkcmF3QWxsQ2hhcnRzLmF0dGFjaCh0aGlzLl9vblJlZHJhd0FsbENoYXJ0cyk7XHJcbiAgICAgICAgICAgIHRyYWNlQ2hhcnQuZXZlbnRTZXJpZXNBZGRlZC5hdHRhY2godGhpcy5fb25DaGFydFNlcmllc0FkZGVkKVxyXG5cclxuICAgICAgICAgICAgLy9TZXQgdGhlIGhlaWdodCBvZiBwZXJzaXN0ZWQgY2hhcnRzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wZXJzaXN0ZWRQYW5lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFydEhlaWdodCA9IHRoaXMuZ2V0UGVyc2lzdGVkQ2hhcnRIZWlnaHQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAvL1dvcmthcm91bmQ6IEFkZCAyIHBpeGVscyBpZiBpcyB0aGUgZmlyc3QgY2hhcnQgXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIubGF5b3V0UGFuZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydEhlaWdodCArPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFuZVByb3BlcnRpZXMgPSBuZXcgUGFuZVByb3BlcnRpZXMoKTtcclxuICAgICAgICAgICAgcGFuZVByb3BlcnRpZXMucGFuZVNpemUgPSBjaGFydEhlaWdodDtcclxuICAgICAgICAgICAgcGFuZVByb3BlcnRpZXMubWluU2l6ZSA9IHRoaXMuX2NoYXJ0TWluSGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5hZGRXaWRnZXQodHJhY2VDaGFydCwgbmFtZSwgVmlld1R5cGUuVXNlciwgcGFuZVByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBzZXQgaW5kZXggYXQgYWRkV2lkZ2V0IE1ldGhvZCB0byBhdm9pZCBtb3ZpbmcgdGhlIGNoYXJ0IGFmdGVyd2FyZHNcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLm1vdmVXaWRnZXQodHJhY2VDaGFydCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdC5zcGxpY2UoaW5kZXgsIDAsIHRyYWNlQ2hhcnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnB1c2godHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRyYWNlQ2hhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBoZWlnaHQgb2YgcGVyc2lzdGVkIGNoYXJ0c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGdldFBlcnNpc3RlZENoYXJ0SGVpZ2h0KGNoYXJ0TmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY2hhcnRIZWlnaHQgPSB0aGlzLmxheW91dE1hbmFnZXIuZ2V0Q2hhcnRWaWV3U3BsaXR0ZXJIZWlnaHQodGhpcy5fcGVyc2lzdGVkUGFuZXMsIGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgdGhpcy5fcGVyc2lzdGVkUGFuZXMgPSB0aGlzLl9wZXJzaXN0ZWRQYW5lcy5maWx0ZXIoZWxlbWVudCA9PiB7IHJldHVybiBlbGVtZW50LmNvbXBvbmVudERlZmluaXRpb24uaWQgIT0gY2hhcnROYW1lfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjaGFydEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIFpvb21TZXR0aW5nKERpcmVjdGlvbiBhbmQgQm94Wm9vbSkgZm9yIGFsbCBDaGFydHMgYWNjb3JkaW5nIHRvIHRoZSBjb3JyZXNwb25kaW5nIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlWm9vbVNldHRpbmdzKCkge1xyXG4gICAgICAgIGxldCB0b29sc3RhdGU6IENoYXJ0Vmlld1Rvb2xTdGF0ZSA9IHRoaXMudG9vbFN0YXRlO1xyXG4gICAgICAgIGxldCB6b29tRGlyZWN0aW9uU3RhdGU6IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSA9IHRoaXMuem9vbURpcmVjdGlvblN0YXRlO1xyXG5cclxuICAgICAgICBpZiAodG9vbHN0YXRlLnNlbGVjdGVkVG9vbCA9PSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkJPWFpPT00pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCb3hab29tKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBhbm5pbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0b29sc3RhdGUuc2VsZWN0ZWRUb29sID09IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uUEFOTklORykge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJveFpvb20oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBhbm5pbmcodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJveFpvb20oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBhbm5pbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRDaGFydFpvb21BeGVzKHpvb21EaXJlY3Rpb25TdGF0ZS56b29tRGlyZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVUcmFjZUNoYXJ0KGNoYXJ0OiBJVHJhY2VDaGFydCkge1xyXG4gICAgICAgIGNoYXJ0LmV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24uZGV0YWNoKHRoaXMuX3VzZXJDaGFydEludGVyYWN0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgY2hhcnQuZXZlbnRSZWRyYXdBbGxDaGFydHMuZGV0YWNoKHRoaXMuX29uUmVkcmF3QWxsQ2hhcnRzKTtcclxuICAgICAgICBjaGFydC5ldmVudFNlcmllc0FkZGVkLmRldGFjaCh0aGlzLl9vbkNoYXJ0U2VyaWVzQWRkZWQpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2hhcnRGcm9tQ2hhcnRMaXN0KGNoYXJ0KTtcclxuICAgICAgICBjaGFydC5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIucmVtb3ZlV2lkZ2V0KGNoYXJ0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUNoYXJ0RnJvbUNoYXJ0TGlzdChjaGFydDogSVRyYWNlQ2hhcnQpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldENoYXJ0SW5kZXgoY2hhcnQpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVUcmFjZUNoYXJ0KGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydCwgdGFyZ2V0Q2hhcnQ6IENoYXJ0TWFuYWdlckNoYXJ0LCBhcmdzKSB7XHJcblxyXG4gICAgICAgIGxldCB0cmFjZUNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydC5uYW1lKTtcclxuICAgICAgICBsZXQgdGFyZ2V0VHJhY2VDaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUodGFyZ2V0Q2hhcnQubmFtZSk7XHJcblxyXG4gICAgICAgIGlmICh0cmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCAmJiB0YXJnZXRUcmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0SW5kZXggPSB0aGlzLmdldENoYXJ0SW5kZXgodHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRJbmRleCA9IHRoaXMuZ2V0Q2hhcnRJbmRleCh0YXJnZXRUcmFjZUNoYXJ0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcmdzLmluc2VydFR5cGUgPT0gXCJpbnNlcnRCZWxvd1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhcnRJbmRleCA+IC0xICYmIHRhcmdldEluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKGNoYXJ0SW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0SW5kZXggPCB0YXJnZXRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKHRhcmdldEluZGV4IC0gMSwgMCwgdHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnNwbGljZSh0YXJnZXRJbmRleCwgMCwgdHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5tb3ZlV2lkZ2V0KHRyYWNlQ2hhcnQsIHRhcmdldEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWRyYXdDaGFydHMoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQuY2hhcnRUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVBbGxDaGFydHMoKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRyYWNlQ2hhcnQodGhpcy50cmFjZUNoYXJ0TGlzdFswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2hhcnRJbmRleChjaGFydDogSVRyYWNlQ2hhcnQpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBpbmRleCA9IC0xXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldID09IGNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRyYWNlQ2hhcnRCeUNvbnRhaW5lcklkKGNvbnRhaW5lcklEOiBzdHJpbmcpOiBJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXZJZCA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0ubWFpbkRpdklkO1xyXG4gICAgICAgICAgICBpZiAoZGl2SWQgPT0gY29udGFpbmVySUQuc3Vic3RyKDAsIGRpdklkLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRyYWNlQ2hhcnRCeU5hbWUoY2hhcnROYW1lOiBzdHJpbmcpOiBJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLndpZGdldE5hbWUgPT0gY2hhcnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZChkYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwsIGFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IGRhdGFNb2RlbDsgICAgICBcclxuICAgICAgICBzd2l0Y2ggKGFyZ3MuaGludCkge1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZFNlcmllOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllc1RvQ2hhcnQoYXJncy5kYXRhLnNlcmllcywgYXJncy5kYXRhLmNoYXJ0LCBhcmdzLmRhdGEuYXhpcywgYXJncy5kYXRhLmtlZXBTY2FsZXMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5tb3ZlU2VyaWU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVNlcmllKGFyZ3MuZGF0YS5zZXJpZSwgYXJncy5kYXRhLmNoYXJ0Lm5hbWUsIGFyZ3MuZGF0YS50YXJnZXRDaGFydC5uYW1lLCBhcmdzLmRhdGEudGFyZ2V0QXhpcyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZVNlcmllOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlcmllKGFyZ3MuZGF0YS5zZXJpZSwgYXJncy5kYXRhLmNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVDaGFydDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGFydChhcmdzLmRhdGEuY2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRDaGFydDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUcmFjZUNoYXJ0KGFyZ3MuZGF0YS5jaGFydCwgYXJncy5kYXRhLmluZGV4LCBhcmdzLmRhdGEudHlwZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50Lm1vdmVDaGFydDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVHJhY2VDaGFydChhcmdzLmRhdGEuY2hhcnQsIGFyZ3MuZGF0YS50YXJnZXQsIGFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZFlTY2FsZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRZU2NhbGUoYXJncy5kYXRhLnlBeGlzLCBhcmdzLmRhdGEuY2hhcnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZVlTY2FsZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVZQXhpcyhhcmdzLmRhdGEueUF4aXMsIGFyZ3MuZGF0YS5jaGFydCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnVwZGF0ZVNjYWxlUmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3luY2hyb25pemVTY2FsZVhSYW5nZShhcmdzLmRhdGEuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFkZFNlcmllc1RvQ2hhcnQoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgc2NhbGU6IFNjYWxlLCBrZWVwU2NhbGVzOiBib29sZWFuID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc2VyaWVzW2ldLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX29uU2VyaWVEYXRhQ2hhbmdlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjaGFydE5hbWUgPSBjaGFydC5uYW1lO1xyXG5cclxuICAgICAgICBsZXQgcmVzZXRYUmFuZ2UgPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmVzZXRZUmFuZ2UgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBpZigha2VlcFNjYWxlcyl7XHJcbiAgICAgICAgICAgIHJlc2V0WFJhbmdlPSB0aGlzLmlzRmlyc3RTZXJpZXNPZlR5cGVJbkNoYXJ0cyhzZXJpZXNbMF0pXHJcbiAgICAgICAgICAgIHJlc2V0WVJhbmdlID0gdGhpcy5pc0ZpcnN0U2VyaWVzT25TY2FsZShzZXJpZXNbMF0sIHNjYWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0T2JqID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydE5hbWUpO1xyXG4gICAgICAgICAgICBpZihjaGFydE9iaiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogT25seSB3b3JrcyBmb3IgWVQgYnV0IG5vdCBmb3IgRkZUXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHNjYWxlKFkpXHJcbiAgICAgICAgICAgICAgICBjaGFydE9iai5zZXRTY2FsZVJhbmdlKHNjYWxlLCBzY2FsZS5taW5YVmFsdWUsIHNjYWxlLm1heFhWYWx1ZSwgc2NhbGUubWluWVZhbHVlLCBzY2FsZS5tYXhZVmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzY2FsZShYKVxyXG4gICAgICAgICAgICAgICAgY2hhcnRPYmouc2V0UmFuZ2VYKHNjYWxlLm1pblhWYWx1ZSwgc2NhbGUubWF4WFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZXMoc2VyaWVzLCBjaGFydE5hbWUsIHNjYWxlLCByZXNldFlSYW5nZSwgcmVzZXRYUmFuZ2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChyZXNldFhSYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0WFJhbmdlKHNlcmllc1swXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpDaGVja3MgaWYgYSBnaXZlbiBTZXJpZXMgaXMgdGhlIGZpcnN0IFNlcmllcyBvbiBhIHBhcnRpY3VsYXIgc2NhbGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNGaXJzdFNlcmllc09uU2NhbGUoc2VyaWVzOiBCYXNlU2VyaWVzLCBzY2FsZTogU2NhbGUpOiBib29sZWFuIHtcclxuICAgICAgICAvL29ubHkgcmVzZXQgdGhlIGNoYXJ0cmFuZ2Ugb24gdGhlIHkgYXhpcyBpZiB0aGVzZSBhcmUgdGhlIGZpcnN0IHNlcmllcyBpbiB0aGUgc2NhbGVcclxuICAgICAgICBpZiAoc2NhbGUuY2hpbGRzLmxlbmd0aCA8IDEgfHwgc2VyaWVzICE9IHNjYWxlLmNoaWxkc1swXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpDaGVja3MgaWYgYSBnaXZlbiBTZXJpZXMgaXMgdGhlIGZpcnN0IG9mIGl0cyB0eXBlIGluIGFsbCBjaGFydHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNGaXJzdFNlcmllc09mVHlwZUluQ2hhcnRzKHNlcmllczogQmFzZVNlcmllcykge1xyXG4gICAgICAgIGxldCBjaGFydHMgPSB0aGlzLmdldENoYXJ0c0ZvclNlcmllKHNlcmllcyk7XHJcblxyXG4gICAgICAgIGZvciggbGV0IGNoYXJ0IG9mIGNoYXJ0cyl7XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0LnNlcmllcy5sZW5ndGggIT0gMCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDaGFydHNGb3JTZXJpZShzZXJpZXM6IEJhc2VTZXJpZXMpOiBJVHJhY2VDaGFydFtdIHtcclxuICAgICAgICBsZXQgY2hhcnRzID0gQXJyYXk8SVRyYWNlQ2hhcnQ+KCk7XHJcbiAgICAgICAgaWYgKHNlcmllcy50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKSB7XHJcblxyXG4gICAgICAgICAgICBjaGFydHMgPSBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpLmdldEZGVENoYXJ0cyh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VyaWVzLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0cyA9IG5ldyBDaGFydFJhbmdlSGVscGVyKCkuZ2V0WVRDaGFydHModGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBldmVudEFyZ3M6IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICBpZiAoZXZlbnRBcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlcmllRGF0YShzZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudEFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmNvbG9yQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlcmllQ29sb3Ioc2VuZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVXBkYXRlcyB0aGUgc2VyaWUgZGF0YXBvaW50cyBpbiBhbGwgY2hhcnRzIHdoZXJlIHRoZSBzZXJpZSBpcyBkaXNwbGF5ZWRcclxuICAgICAqICBJZiBkYXRhcG9pbnRzIG5vdCB2YWxpZCwgdGhlIHNlcmllIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBjaGFydHMgb3RoZXJ3aXNlIGFkZGVkIGlmIG5vdCBhbHJlYWR5IGluIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNlcmllRGF0YShzZXJpZXM6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBpZiAoc2VyaWVzLnJhd1BvaW50c1ZhbGlkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIHZhbGlkIHNlcmllIGRhdGEgPT4gcmVtb3ZlIGZyb20gYWxsIGNoYXJ0c1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlcmllRnJvbUFsbENoYXJ0cyhzZXJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gYWRkIHNlcmllIHRvIGNoYXJ0IGlmIG5vdCBhbHJlYWR5IGluIGl0IG90aGVyd2lzZSB1cGRhdGUgY2hhcnRcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydHMgPSB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZ2V0Q2hhcnRzVXNpbmdTZXJpZShbc2VyaWVzXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlcmllSW5BbGxDaGFydHMoY2hhcnRzLCBzZXJpZXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTZXJpZUluQWxsQ2hhcnRzKGNoYXJ0czogSUNoYXJ0TWFuYWdlckNoYXJ0W10sIHNlcmllczogQmFzZVNlcmllcykge1xyXG4gICAgICAgIGxldCBzZXJpZUNoYXJ0VHlwZSA9IFNlcmllQ2hhcnRUeXBlSGVscGVyLmdldFNlcmllQ2hhcnRUeXBlKHNlcmllcy50eXBlKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQgJiYgc2VyaWVDaGFydFR5cGUgPT0gY2hhcnQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2VyaWVJbkNoYXJ0KGNoYXJ0LCBzZXJpZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHNlcmllcyBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSBjaGFydHNbaV0uZ2V0WUF4aXNGb3JTZXJpZShzZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzRmlyc3RTZXJpZXNJbkNoYXJ0ID0gdGhpcy5pc0ZpcnN0U2VyaWVzT2ZUeXBlSW5DaGFydHMoc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXMoW3Nlcmllc10sIGNoYXJ0c1tpXS5uYW1lLCBzY2FsZSwgdGhpcy5pc0ZpcnN0U2VyaWVzT25TY2FsZShzZXJpZXMsIHNjYWxlKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaXJzdFNlcmllc0luQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRYUmFuZ2Uoc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNjYWxlIG5vdCBmb3VuZCBmb3Igc2VyaWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2hhcnQuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICBjaGFydC5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXRYUmFuZ2Uoc2VyaWVzOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBsZXQgY2hhcnRSYW5nZUhlbHBlciA6IENoYXJ0UmFuZ2VIZWxwZXIgPSBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpO1xyXG4gICAgICAgIGlmIChzZXJpZXMudHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgY2hhcnRSYW5nZUhlbHBlci5yZXNldFhSYW5nZXNZVCh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VyaWVzLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuICAgICAgICAgICAgY2hhcnRSYW5nZUhlbHBlci5yZXNldFhSYW5nZXNGRlQodGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVkcmF3Q2hhcnRzKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY29sb3Igb2YgdGhlIHNlcmllIGluIGFsbCBjaGFydHMgd2hlcmUgdGhlIHNlcmllIGlzIGRpc3BsYXllZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlU2VyaWVDb2xvcihzZXJpZTogQmFzZVNlcmllcykge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgc2VyaWVzLnB1c2goc2VyaWUpO1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRzID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldENoYXJ0c1VzaW5nU2VyaWUoc2VyaWVzKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnRzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzZXJpZXMgY29sb3IgaW4gdGhlIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnQuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgc2VyaWUgdG8gY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVwZGF0ZVJhbmdlWVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBhZGRTZXJpZXMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnROYW1lOiBzdHJpbmcsIHNjYWxlOiBTY2FsZSwgdXBkYXRlUmFuZ2VZOiBib29sZWFuLCB1cGRhdGVSYW5nZVg6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgYXhpc01pbjogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgYXhpc01heDogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgbGV0IGF4aXMgPSAoY2hhcnQgYXMgQ2hhcnRCYXNlKS5jaGFydC5nZXRBeGlzKHNjYWxlLmlkKTtcclxuICAgICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNSYW5nZSA9IGF4aXMuZ2V0QXhpc1JhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXhpc1JhbmdlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF4aXNNaW4gPSBheGlzUmFuZ2UubWluO1xyXG4gICAgICAgICAgICAgICAgICAgIGF4aXNNYXggPSBheGlzUmFuZ2UubWF4XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTY2FsZSBub3QgYXZhaWxhYmxlISBcIiArIHNjYWxlLmlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2hhcnQuYWRkU2VyaWVzVG9DaGFydChzZXJpZXMsIHNjYWxlLCB1cGRhdGVSYW5nZVgpO1xyXG4gICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChheGlzTWluICE9IHVuZGVmaW5lZCAmJiBheGlzTWF4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnQuc2V0U2NhbGVSYW5nZShzY2FsZSwgc2NhbGUubWluWFZhbHVlLCBzY2FsZS5tYXhYVmFsdWUsIGF4aXNNaW4sIGF4aXNNYXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1cGRhdGVSYW5nZVkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWluVmFsdWUgPSBjaGFydC5nZXRTZXJpZXNNaW5ZRm9yU2NhbGUoc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNNYXhWYWx1ZSA9IGNoYXJ0LmdldFNlcmllc01heFlGb3JTY2FsZShzY2FsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGF4aXNNaW5WYWx1ZSAhPSB1bmRlZmluZWQgJiYgYXhpc01heFZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0LnVwZGF0ZVJhbmdlWShzY2FsZSwgYXhpc01pblZhbHVlLCBheGlzTWF4VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoYXJ0LnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFlTY2FsZSh5U2NhbGU6IFNjYWxlLCBjaGFydE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnROYW1lKTtcclxuICAgICAgICBpZihjaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjaGFydCEuYWRkWVNjYWxlKHlTY2FsZSwgQXhpc1Bvc2l0aW9uLnJpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVYQXhpc1dpZHRoKGNoYXJ0IS50eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtb3ZlIG9uZSBzZXJpZSBmcm9tIG9uZSBjaGFydCB0byBhbm90aGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJ0TmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldENoYXJ0TmFtZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gdGFyZ2V0U2NhbGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgbW92ZVNlcmllKHNlcmllOiBCYXNlU2VyaWVzLCBjaGFydE5hbWU6IHN0cmluZywgdGFyZ2V0Q2hhcnROYW1lOiBzdHJpbmcsIHRhcmdldFNjYWxlOiBTY2FsZSkge1xyXG4gICAgICAgIGlmIChzZXJpZS5yYXdQb2ludHNWYWxpZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnROYW1lKTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUodGFyZ2V0Q2hhcnROYW1lKTtcclxuICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICBzZXJpZXMucHVzaChzZXJpZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkICYmIHRhcmdldCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LnJlbW92ZVNlcmllRnJvbUNoYXJ0KHNlcmllLCB0aGlzLmlzTGFzdFNlcmllV2l0aEN1cnNvclR5cGUoY2hhcnQpKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5hZGRTZXJpZXNUb0NoYXJ0KHNlcmllcywgdGFyZ2V0U2NhbGUsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQhLnR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBvbmUgc2VyaWUgZnJvbSBnaXZlbiBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMsIGNoYXJ0TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydE5hbWUpO1xyXG4gICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hhcnQucmVtb3ZlU2VyaWVGcm9tQ2hhcnQoc2VyaWUsIHRoaXMuaXNMYXN0U2VyaWVXaXRoQ3Vyc29yVHlwZShjaGFydCkpO1xyXG4gICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjaGFydHNXaXRoU2VyaWUgPSB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZ2V0Q2hhcnRzVXNpbmdTZXJpZShbc2VyaWVdKTtcclxuICAgICAgICBpZiAoY2hhcnRzV2l0aFNlcmllLmxlbmd0aCA9PSAwKSB7IC8vIFNlcmllIG5vdCB1c2VkIGluIGFuIG90aGVyIGNoYXJ0ID0+IGRldGFjaCBzZXJpZSBldmVudHNcclxuICAgICAgICAgICAgc2VyaWUuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fb25TZXJpZURhdGFDaGFuZ2VkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlWUF4aXMoeVNjYWxlOiBTY2FsZSwgY2hhcnQ6IENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgbGV0IHRyYWNlQ2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgIGlmICh0cmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0cmFjZUNoYXJ0LnJlbW92ZVlTY2FsZUZyb21DaGFydCh5U2NhbGUpO1xyXG4gICAgICAgICAgICB0cmFjZUNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVYQXhpc1dpZHRoKGNoYXJ0LmNoYXJ0VHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcnROYW1lXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUNoYXJ0KGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgIGxldCB0cmFjZUNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydC5uYW1lKTtcclxuICAgICAgICBpZiAodHJhY2VDaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUcmFjZUNoYXJ0KHRyYWNlQ2hhcnQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1pblg6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgbGV0IG1heFg6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2VDaGFydC5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChtaW5YID09IHVuZGVmaW5lZCB8fCBtaW5YID4gdHJhY2VDaGFydC5zZXJpZXNbaV0ubWluWCEpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW5YID0gdHJhY2VDaGFydC5zZXJpZXNbaV0ubWluWDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtYXhYID09IHVuZGVmaW5lZCB8fCBtYXhYIDwgdHJhY2VDaGFydC5zZXJpZXNbaV0ubWF4WCEpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhYID0gdHJhY2VDaGFydC5zZXJpZXNbaV0ubWF4WDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVYQXhpc1dpZHRoKGNoYXJ0LmNoYXJ0VHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFubmluZ0F4ZXMoYXhlczogSUNoYXJ0QXhpc1tdKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGFubmluZ0F4aXMgPSBuZXcgQXJyYXk8SUNoYXJ0QXhpcz4oKTtcclxuICAgICAgICAgICAgaWYgKGF4ZXNbMF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2NhbGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF4aXMgPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LmdldEF4aXModGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zY2FsZXNbal0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChheGlzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYW5uaW5nQXhpcy5wdXNoKGF4aXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYXhpcyA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0QXhpcyh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnByaW1hcnlYQXhpc05hbWUpXHJcbiAgICAgICAgICAgICAgICBpZiAoYXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYW5uaW5nQXhpcy5wdXNoKGF4aXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFubmluZ0F4aXMgPSBheGVzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LnNldFBhbm5pbmdBeGVzKHBhbm5pbmdBeGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3luY2hyb25pemVTY2FsZVhSYW5nZShzY2FsZTogU2NhbGUpIHtcclxuICAgICAgICBsZXQgY2hhcnRUeXBlID0gc2NhbGUucGFyZW50LmNoYXJ0VHlwZTtcclxuICAgICAgICBsZXQgbWluID0gc2NhbGUubWluWFZhbHVlO1xyXG4gICAgICAgIGxldCBtYXggPSBzY2FsZS5tYXhYVmFsdWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS50eXBlID09IGNoYXJ0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5vblN5bmNocm9uaXplU2NhbGVSYW5nZShzY2FsZSwgbWluLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Wm9vbUF4ZXNJbkNoYXJ0KGNoYXJ0OiBJVHJhY2VDaGFydCwgem9vbURpcmVjdGlvbjogWm9vbURpcmVjdGlvbik6IEFycmF5PElDaGFydEF4aXM+IHtcclxuICAgICAgICBsZXQgYXhlcyA9IG5ldyBBcnJheTxJQ2hhcnRBeGlzPigpO1xyXG5cclxuICAgICAgICBpZiAoem9vbURpcmVjdGlvbiA9PSBab29tRGlyZWN0aW9uLlhZIHx8IHpvb21EaXJlY3Rpb24gPT0gWm9vbURpcmVjdGlvbi5YKSB7XHJcbiAgICAgICAgICAgIGxldCBheGlzID0gY2hhcnQuY2hhcnQuZ2V0QXhpcyhjaGFydC5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICAgICAgaWYgKGF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBheGVzLnB1c2goYXhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh6b29tRGlyZWN0aW9uID09IFpvb21EaXJlY3Rpb24uWFkgfHwgem9vbURpcmVjdGlvbiA9PSBab29tRGlyZWN0aW9uLlkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydC5zY2FsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzID0gY2hhcnQuY2hhcnQuZ2V0QXhpcyhjaGFydC5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF4aXMgIT0gdW5kZWZpbmVkICYmIGF4aXMuZ2V0QXhpc09yaWVudGF0aW9uKCkgPT0gQXhpc09yaWVudGF0aW9uLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXhlcy5wdXNoKGF4aXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBheGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBubyBtb3JlIHNlcmllcyBpbiBhbGwgb3RoZXIgY2hhcnRzIHdpdGggdGhlIHNhbWUgY3Vyc29yIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDaGFydH0gY2hhcnRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzTGFzdFNlcmllV2l0aEN1cnNvclR5cGUoY2hhcnQ6IElUcmFjZUNoYXJ0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGN1cnNvclR5cGUgPSBjaGFydC5nZXRTZXJpZUN1cnNvclR5cGUoKTtcclxuICAgICAgICBpZiAoY2hhcnQuc2VyaWVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0uZ2V0U2VyaWVDdXJzb3JUeXBlKCkgPT09IGN1cnNvclR5cGUgJiYgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXSAhPT0gY2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIElUcmFjZUNoYXJ0T2JqZWN0IGJ5IGdpdmUgbmFtZSBhbmQgcmV0dXJuIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHJldHVybnMgeyhJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q2hhcnRPYmplY3RCeU5hbWUobmFtZTogc3RyaW5nKTogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS53aWRnZXROYW1lID09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1NlcmllSW5DaGFydChjaGFydCwgc2VyaWUpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0LnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnQuc2VyaWVzW2ldLmlkID09PSBzZXJpZS5pZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qcHJpdmF0ZSBnZXRQcmV2aW91c0NoYXJ0T2JqZWN0QnlOYW1lKG5hbWUgOnN0cmluZykgOiBJVHJhY2VDaGFydCB8IHVuZGVmaW5lZHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudHJhY2VDaGFydExpc3RbaV0ud2lkZ2V0TmFtZSA9PSBuYW1lKXtcclxuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhY2VDaGFydExpc3RbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0qL1xyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlU2VyaWVGcm9tQWxsQ2hhcnRzKHNlcmllOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2VyaWVzLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5pZDsgfSkuaW5kZXhPZihzZXJpZS5pZCk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgaW5kZXggPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNlcmllcy5pbmRleE9mKHNlcmllLCAwKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0ucmVtb3ZlU2VyaWVGcm9tQ2hhcnQodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXJpZXNbaW5kZXhdLCB0aGlzLmlzTGFzdFNlcmllV2l0aEN1cnNvclR5cGUodGhpcy50cmFjZUNoYXJ0TGlzdFtpXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrUmVmZXJlbmNlQ3Vyc29yc0hvdmVyaW5nKG1vdXNlUG9pbnQ6IElQb2ludCwgdHJhY2VDaGFydDogSVRyYWNlQ2hhcnQpOiB2b2lke1xyXG4gICAgICAgIHRyYWNlQ2hhcnQuY2hlY2tDdXJzb3JzSG92ZXJpbmcobW91c2VQb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ0N1cnNvckFsb25nTGluZSh0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydCwgbW92ZW1lbnRYOiBudW1iZXIsIG1vdmVtZW50WTogbnVtYmVyKTogdm9pZHtcclxuICAgICAgICB0cmFjZUNoYXJ0LmRyYWdDdXJzb3JBbG9uZ0xpbmUobW92ZW1lbnRYLCBtb3ZlbWVudFksIHRoaXMuX2hvdmVyZWRTZXJpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uKHRyYWNlQ2hhcnQgOiBJVHJhY2VDaGFydCwgbW91c2VQb2ludDogSVBvaW50KXtcclxuICAgICAgICB0cmFjZUNoYXJ0LnNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uKG1vdXNlUG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvUGFubmluZyh0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydCwgbW91c2VQb2ludFg6IG51bWJlciwgbW91c2VQb2ludFk6IG51bWJlcik6IHZvaWR7XHJcbiAgICAgICAgdHJhY2VDaGFydC5kb1Bhbm5pbmcobW91c2VQb2ludFgsIG1vdXNlUG9pbnRZKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFBhbm5pbmdDb29yZHMoKXtcclxuICAgICAgICBmb3IobGV0IGNoYXJ0IG9mIHRoaXMudHJhY2VDaGFydExpc3Qpe1xyXG4gICAgICAgICAgICBjaGFydC5yZXNldFBhbm5pbmdDb29yZHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlc2V0Wm9vbSgpIHtcclxuICAgICAgICBsZXQgY2hhcnRSYW5nZUhlbHBlciA9IG5ldyBDaGFydFJhbmdlSGVscGVyKCk7XHJcblxyXG4gICAgICAgIGNoYXJ0UmFuZ2VIZWxwZXIucmVzZXRYUmFuZ2VzQWxsQ2hhcnRUeXBlcyh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICBjaGFydFJhbmdlSGVscGVyLnJlc2V0WVJhbmdlc0FsbENoYXJ0VHlwZXModGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHModHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRDdXJzb3JzSG92ZXJpbmcoYXJncykge1xyXG4gICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSBhcmdzLmRhdGEuZS50YXJnZXQucGFyZW50RWxlbWVudFxyXG4gICAgICAgICAgICBpZiAocGFyZW50RWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIHBhcmVudEVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3VzZU92ZXJDdXJzb3JzID0gdGhpcy5pc01vdXNlT3ZlckN1cnNvcnMocGFyZW50RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAvL0p1c3QgcmVzZXQgY3Vyc29ycyBpZiBtb3VzZSBpcyBtb3Zpbmcgb3V0c2lkZSBhIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdldFRyYWNlQ2hhcnRCeUNvbnRhaW5lcklkKHBhcmVudEVsZW1lbnQuaWQpID09PSB1bmRlZmluZWQgJiYgIW1vdXNlT3ZlckN1cnNvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0WzBdLnJlc2V0Q3Vyc29yc0hvdmVyZWQoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG5cclxuICAgIGF1dG9TY2FsZSgpIHtcclxuICAgICAgICBsZXQgY2hhcnRSYW5nZUhlbHBlciA9IG5ldyBDaGFydFJhbmdlSGVscGVyKCk7XHJcbiAgICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdGhpcy50cmFjZUNoYXJ0TGlzdCkge1xyXG4gICAgICAgICAgICBjaGFydC5hdXRvU2NhbGVZU2NhbGVzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGFydFJhbmdlSGVscGVyLnJlc2V0WFJhbmdlc0FsbENoYXJ0VHlwZXModGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHModHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2hhcnRab29tQXhlcyhheGVzOiBab29tRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2V0Wm9vbUF4ZXMoYXhlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0LmFjdGl2ZVNlbGVjdGVkWm9vbUF4aXMgPSBheGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhbm5pbmcoZW5hYmxlOiBib29sZWFuKTogYW55IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXRQYW5uaW5nKGVuYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEJveFpvb20oZW5hYmxlOiBib29sZWFuKTogYW55IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXRCb3hab29tKGVuYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhd0NoYXJ0cyhmb3JjZVJlZHJhdzogYm9vbGVhbiwgY2hhcnRUeXBlPzogQ2hhcnRUeXBlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vaWYgKGZvcmNlUmVkcmF3ID09IHRydWUgfHwgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS50eXBlICE9IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0ucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0VHlwZSA9PSB1bmRlZmluZWQgfHwgZm9yY2VSZWRyYXcgPT0gdHJ1ZSB8fCB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnR5cGUgPT0gY2hhcnRUeXBlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0ucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVkcmF3QWxsQ2hhcnRzKHNlbmRlciwgYXJncyA6IEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncyl7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHMoZmFsc2UsIGFyZ3MuY2hhcnRUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYXJ0U2VyaWVzQWRkZWQoc2VuZGVyOiBJVHJhY2VDaGFydCwgYXJnczogQmFzZVNlcmllcyl7XHJcbiAgICAgICAgaWYoYXJncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgc2VyaWUgPSBhcmdzO1xyXG4gICAgICAgICAgICBzZXJpZS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vblNlcmllRGF0YUNoYW5nZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTW91c2VPdmVyQ3Vyc29ycyhlbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LnZhbHVlLmluY2x1ZGVzKENyb3NzSGFpckN1cnNvci5jcm9zc0hhaXJDdXJzb3JJZCkgfHwgZWxlbWVudC5jbGFzc0xpc3QudmFsdWUuaW5jbHVkZXMoTGluZUN1cnNvci5saW5lQ3Vyc29ySWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVXNlckNoYXJ0SW50ZXJhY3Rpb24oc2VuZGVyLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJnczogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpIDogdm9pZCB7XHJcbiAgICAgICAgLy9vbiBkcmFnZ2luZyB0aGUgaG92ZXJkIHNlcmllcyBuZWVkcyB0byBiZSBzdG9yZWQgdG8gY2FsY3VsYXRlIHRoZSBjdXJzb3IgcG9zdGlvbiB3aGVuIHRoZSBtb3VzZSBpcyBtb3ZlZCBvdmVyIG11bHRpcGxlIGNoYXJ0c1xyXG4gICAgICAgIGlmIChldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncy5ldmVudEFyZ3VtZW50cy5ob3ZlcmVkU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hvdmVyZWRTZXJpZXMgPSBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncy5ldmVudEFyZ3VtZW50cy5ob3ZlcmVkU2VyaWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldC5vblVzZXJDaGFydEludGVyYWN0aW9uKHNlbmRlciwgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZERyb3BwYWJsZUxvY2F0aW9ucyhkYXRhLCBzYW1lR3JvdXA6IGJvb2xlYW4pIHtcclxuICAgICAgICBmb3IgKGxldCBjaGFydCBvZiB0aGlzLnRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFydE1hbmFnZXJDaGFydCA9IHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRDaGFydChjaGFydC53aWRnZXROYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZXJpZUNoYXJ0VHlwZSA9IFNlcmllQ2hhcnRUeXBlSGVscGVyLmdldFNlcmllQ2hhcnRUeXBlKGRhdGFbMF0udHlwZSk7XHJcbiAgICAgICAgICAgIFNlcmllQ2hhcnRUeXBlSGVscGVyLnNldERyb3BQb3NzaWJsZUFyZWFzKGNoYXJ0TWFuYWdlckNoYXJ0ISwgZGF0YSwgc2VyaWVDaGFydFR5cGUsIHNhbWVHcm91cCk7XHJcbiAgICAgICAgICAgIGNoYXJ0LmFkZFNlcmllRHJvcExvY2F0aW9ucyhkYXRhLCBjaGFydE1hbmFnZXJDaGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZHJvcEhlbHBlciA9IG5ldyBDaGFydERyb3BIZWxwZXIodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB0aGlzLmNoYXJ0Vmlld1dpZGdldCk7XHJcbiAgICAgICAgLy8gQWRkIGVtcHR5IHNwYWNlIGRyb3AgbG9jYXRpb25cclxuICAgICAgICBpZiAoZHJvcEhlbHBlci5jYW5BZGRDaGFydCgpID09IHRydWUpIHsgLy8gSXMgaXQgcG9zc2libGUgdG8gYWRkIG9uZSBtb3JlIGNoYXJ0XHJcbiAgICAgICAgICAgIGxldCBlbXB0eVNwYWNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLmdldExhc3RQYW5lSWQoKSk7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxCYXJXaWR0aCA9ICQoJyMnICsgdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXJQYXJlbnRDb250YWluZXJJZClbMF0ub2Zmc2V0V2lkdGggLSAkKCcjJyArIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyQ29udGFpbmVySWQpWzBdLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICBpZiAoZW1wdHlTcGFjZUVsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBlbXB0eVNwYWNlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgxMjUsMTYwLDE2NSwgMC4yKSc7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVswXS50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcyAmJiBkYXRhLmxlbmd0aCA+IDIgfHwgIXNhbWVHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnRUeXBlQXJlYXMoZW1wdHlTcGFjZUVsZW1lbnQsIFt0cnVlLCBmYWxzZSwgdHJ1ZV0sIHNjcm9sbEJhcldpZHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoYXJ0VHlwZUFyZWFzKGVtcHR5U3BhY2VFbGVtZW50LCBbdHJ1ZSwgdHJ1ZSwgdHJ1ZV0sIHNjcm9sbEJhcldpZHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydFR5cGVBcmVhcyhlbXB0eVNwYWNlRWxlbWVudCwgW2ZhbHNlLCB0cnVlLCBmYWxzZV0sIHNjcm9sbEJhcldpZHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbMF0udHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnRUeXBlQXJlYXMoZW1wdHlTcGFjZUVsZW1lbnQsIFtmYWxzZSwgZmFsc2UsIHRydWVdLCBzY3JvbGxCYXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRDaGFydFR5cGVBcmVhcyhwYXJlbnQ6IEhUTUxFbGVtZW50LCBlbmFibGVkOiBBcnJheTxib29sZWFuPiwgc2Nyb2xsQmFyV2lkdGgpIHtcclxuICAgICAgICBsZXQgY2hhcnROYW1lcyA9IFsnWVQnLCAnWFknLCAnRkZUJ107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFydE5hbWVzLmxlbmd0aDsgaSA9IGkgKyAxKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGFyZWEuaWQgPSBwYXJlbnQuaWQgKyAnXycgKyBjaGFydE5hbWVzW2ldO1xyXG4gICAgICAgICAgICBhcmVhLmNsYXNzTGlzdC5hZGQoJ2NoYXJ0VHlwZXMnKTtcclxuICAgICAgICAgICAgaWYgKCFlbmFibGVkW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhcmVhLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFyZWEuc3R5bGUud2lkdGggPSAoKHBhcmVudC5vZmZzZXRXaWR0aCAtIHNjcm9sbEJhcldpZHRoKSAvIGNoYXJ0TmFtZXMubGVuZ3RoKS50b1N0cmluZygpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9ICcuL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9jaGFydFR5cGUnICsgY2hhcnROYW1lc1tpXSArICcuc3ZnJztcclxuICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnaW1hZ2VDaGFydCcpO1xyXG5cclxuICAgICAgICAgICAgYXJlYS5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChhcmVhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZURyb3BwYWJsZUxvY2F0aW9ucygpIHtcclxuICAgICAgICBmb3IgKGxldCBjaGFydCBvZiB0aGlzLnRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGNoYXJ0LnJlbW92ZVNlcmllRHJvcExvY2F0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgZW1wdHkgc3BhY2UgZHJvcCBsb2NhdGlvblxyXG4gICAgICAgIGxldCBlbXB0eVNwYWNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLmdldExhc3RQYW5lSWQoKSk7XHJcbiAgICAgICAgaWYgKGVtcHR5U3BhY2VFbGVtZW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgdHlwZU9mQ2hhcnRzID0gZW1wdHlTcGFjZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgICAgICAgICBlbXB0eVNwYWNlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZU9mQ2hhcnRzOyBpID0gaSArIDEpIHtcclxuICAgICAgICAgICAgICAgIGVtcHR5U3BhY2VFbGVtZW50LmNoaWxkcmVuWzBdLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVYQXhpc1dpZHRoKGNoYXJ0VHlwZTogQ2hhcnRUeXBlKSB7XHJcbiAgICAgICAgbGV0IG1heFlBeGVzID0gMDtcclxuICAgICAgICBsZXQgY2hhcnRBcmVhOiBSZWN0YW5nbGUgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnR5cGUgPT0gY2hhcnRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LnJlZHJhdygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBudW1iZXJPZllBeGVzSW5DaGFydCA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uZ2V0TnVtYmVyT2ZZU2NhbGVzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtYmVyT2ZZQXhlc0luQ2hhcnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlck9mWUF4ZXNJbkNoYXJ0ID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2lmIG9uZSBjaGFydCBoYXMgbW9yZSBheGlzIHRoYW4gdGhlIG90aGVycyB1c2UgaXRzIHdpZHRoLCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgYW1vdW50IHVzZSB0aGUgb25lIHdpdGggdGhlIGhpZ2hlciB3aWR0aFxyXG4gICAgICAgICAgICAgICAgaWYgKG51bWJlck9mWUF4ZXNJbkNoYXJ0ID4gbWF4WUF4ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhZQXhlcyA9IG51bWJlck9mWUF4ZXNJbkNoYXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0QXJlYSA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChudW1iZXJPZllBeGVzSW5DaGFydCA9PSBtYXhZQXhlcyAmJiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LmdldENoYXJ0QXJlYSgpLndpZHRoID4gY2hhcnRBcmVhIS53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0QXJlYSA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaGFydEFyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxpZ25ZQXhlcyhjaGFydEFyZWEsIGNoYXJ0VHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWxpZ25ZQXhlcyhjaGFydEFyZWE6IFJlY3RhbmdsZSwgY2hhcnRUeXBlOiBDaGFydFR5cGUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0udHlwZSA9PSBjaGFydFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdDaGFydEFyZWEgPSB7IHg6IGNoYXJ0QXJlYS54LCB5OiBjaGFydEFyZWEueSwgd2lkdGg6IGNoYXJ0QXJlYS53aWR0aCwgaGVpZ2h0OiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LmdldENoYXJ0QXJlYSgpLmhlaWdodCAtIDF9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5zZXRDaGFydEFyZWEobmV3Q2hhcnRBcmVhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0ucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=