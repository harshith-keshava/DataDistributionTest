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
define(["require", "exports", "../../common/dateTimeHelper", "../../models/common/point", "../../common/colorHelper", "../common/busyInformation", "../../models/chartManagerDataModel/chartManagerChart", "../../models/diagnostics/trace/traceConfig/traceConfigDefines", "../common/viewBase", "../chartViewWidget/helpers/chartDropHelper", "../chartViewWidget/insertedInfo", "../../models/chartManagerDataModel/scale", "../chartWidget/ChartBase", "../common/SerieChartTypeHelper", "../../models/signalManagerDataModel/signalManagerCalculation", "../../models/signalManagerDataModel/signalCategory", "../../models/common/signal/serieGroup", "../../models/common/signal/signal", "../../models/common/series/seriesType", "./componentDefaultDefinition", "../../common/seriesHelper", "../../models/common/calculatorProvider/calculators/xyCalculator", "../../models/common/calculatorProvider/calculators/fftCalculator"], function (require, exports, dateTimeHelper_1, point_1, colorHelper_1, busyInformation_1, chartManagerChart_1, traceConfigDefines_1, viewBase_1, chartDropHelper_1, insertedInfo_1, scale_1, ChartBase_1, SerieChartTypeHelper_1, signalManagerCalculation_1, signalCategory_1, serieGroup_1, signal_1, seriesType_1, componentDefaultDefinition_1, seriesHelper_1, xyCalculator_1, fftCalculator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceViewWidget = /** @class */ (function (_super) {
        __extends(TraceViewWidget, _super);
        function TraceViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isLoadingTraceData = false;
            _this._widgetIsActive = true;
            // Event handlers
            _this._contentActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._chartViewWidgetDropChangedHandler = function (sender, args) { return _this.onDropChanged(sender, args); };
            _this._signalManagerWidgetSerieDoubleClickedHandler = function (sender, data) { return _this.onSignalManagerWidgetSerieDoubleClicked(sender, data); };
            _this._signalManagerWidgetChangeSizeHandler = function (sender, data) { return _this.onSignalManagerWidgetChangeSize(sender, data); };
            _this._signalManagerSignalRemovedHandler = function (sender, data) { return _this.onSignalManagerSignalRemoved(sender, data); };
            _this._chartManagerWidgetdropHelperHandler = function (sender, args) { return _this.onDropChanged(sender, args); };
            _this._traceState = "";
            return _this;
        }
        TraceViewWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
            this.setSeriesProvider();
            this.setTraceControlWidget();
            this.setInnerWidgets();
        };
        TraceViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetTraceViewId);
            this.attachLayoutToView(this);
            this._layoutWidget.initialize();
            // add widget to the parent container
            this._layoutWidget.addToParentContainer(this.mainDiv);
            this._layoutWidget.eventWidgetActivated.attach(this._contentActivatedHandler);
        };
        /**
         * Sets the inner widgets (signalmanager, chart view, chartmanager/cursorinfo)
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setInnerWidgets = function () {
            // Create left widget
            this.setSignalManagerWidget();
            this.attachSignalManagerWidgetEvents();
            // Create the middle widget
            this.setChartViewWidget();
            // Create the widgets on the right side
            this.setRightWidgets();
            this.attachSignalManagerDataModelEvents();
        };
        /**
         * Sets the right widgets (chartmanager, cursorinfo)
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setRightWidgets = function () {
            // Sets the chart manager widget on top
            this.setChartManagerWidget();
        };
        /**
         * Sets the seriesProvider
         *
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setSeriesProvider = function () {
            this._seriesProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SeriesProviderId);
        };
        /**
         * Sets the trace control widget
         *
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setTraceControlWidget = function () {
            this._traceControlWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.TraceControlWidgetId);
        };
        /**
         * Sets the signal manager widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setSignalManagerWidget = function () {
            this._signalManagerWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.SignalManagerWidgetId);
            this._signalManagerDataModel = this._signalManagerWidget.dataModel;
        };
        /**
         * Sets the chart view widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setChartViewWidget = function () {
            this._chartViewWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartViewWidgetId);
            this._chartViewWidget.eventDropHelper.attach(this._chartViewWidgetDropChangedHandler);
        };
        /**
         * Sets the chart manager widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setChartManagerWidget = function () {
            this._chartManagerWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartManagerWidgetId);
            this._chartManagerWidget.eventDropHelper.attach(this._chartManagerWidgetdropHelperHandler);
            this._chartManagerDataModel = this._chartManagerWidget.dataModel;
        };
        /**
         * Activate the widget
         *
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.activate = function () {
            this._layoutWidget.activate();
        };
        TraceViewWidget.prototype.dispose = function () {
            this._widgetIsActive = false;
            this._layoutWidget.dispose();
            // Detach events
            this.detachEvents();
            // Dispose provider
            this.disposeProviders();
            // Dispose datamodels
            this.disposeDataModels();
            _super.prototype.dispose.call(this);
        };
        /**
         * Detaches all events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachEvents = function () {
            this.detachChartViewWidgetEvents();
            this.detachSignalManagerWidgetEvents();
            this.detachSignalManagerDataModelEvents();
            this.detachChartManagerWidgetEvents();
            this._layoutWidget.eventWidgetActivated.detach(this._contentActivatedHandler);
        };
        TraceViewWidget.prototype.disposeProviders = function () {
            if (this._seriesProvider != undefined) {
                // TODO: Last user must dispose
                this.component.componentFactory.disposeComponent("SeriesProvider");
            }
        };
        /**
         * Dispose all data models
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.disposeDataModels = function () {
            // TODO: Dispose datamodels central
            if (this._signalManagerDataModel != undefined) {
                this._signalManagerDataModel.dispose();
            }
            if (this._chartManagerDataModel != undefined) {
                // TODO: Last user must dispose
                // TODO: only needed to remove singleton instance of chartmanagerDataModel
                this.component.componentFactory.disposeComponent("ChartManagerDataModel");
            }
        };
        /** resizes the trace configuration widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        TraceViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        TraceViewWidget.prototype.detachChartViewWidgetEvents = function () {
            if (this._chartViewWidget != undefined) {
                this._chartViewWidget.eventDropHelper.detach(this._chartViewWidgetDropChangedHandler);
            }
        };
        /**
         * Called when a D&D operation has been done
         *
         * Review Lukas Obersamer:
         * The cyclomatic complexity of this function is too high.
         * Temporarily okay, as in my subjective judgement, the code readability is okay and the expected risk of hidden issues is expected to be very low.
         * --> Corrective action is sufficient within the 5.19 version range.
         * --> TODO further discussion (e.g. separation of control flow logic and data processing) and definition of mitigation options needed (as soon as this area has to be adapted)
         *
         * @private
         * @param {DataModels.IChartManagerDataModel} chartManagerDataModel
         * @param {*} args
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onDropChanged = function (chartManagerDataModel, args) {
            switch (args.hint) {
                case chartDropHelper_1.ChartDropHelperChangedHint.createChart: {
                    //creates a chart an adds its series
                    var chartName = chartManagerDataModel.getUniqueChartName();
                    var chartManagerChart = new chartManagerChart_1.ChartManagerChart(chartName, args.data.type);
                    chartManagerChart.addDefaultYScale(this._chartManagerDataModel);
                    chartManagerDataModel.addChart(chartManagerChart, -1);
                    if (args.data.series != undefined) {
                        var yAxisId = chartManagerChart.getDefaultYAxisId();
                        var series = args.data.series;
                        if (args.data.type != chartManagerChart_1.ChartType.YTChart && args.data.series[0].type == seriesType_1.SeriesType.timeSeries) {
                            this._signalManagerWidget.enableTreeGridRefresh(false);
                            if (args.data.type == chartManagerChart_1.ChartType.XYChart) {
                                series = new Array();
                                var xySeries = this.createXYSerie(args.data.series[0].parent, args.data.series);
                                if (xySeries != undefined) {
                                    series.push(xySeries);
                                }
                            }
                            else if (args.data.type == chartManagerChart_1.ChartType.FFTChart) {
                                series = new Array();
                                for (var i = 0; i < args.data.series.length; i++) {
                                    var fftSeries = this.createFFTSerie(args.data.series[i].parent, args.data.series[i]);
                                    if (fftSeries != undefined) {
                                        series.push(fftSeries);
                                    }
                                }
                            }
                            this._signalManagerWidget.enableTreeGridRefresh(true);
                            if (!this._signalManagerWidget.editModeActive && args.data.type == chartManagerChart_1.ChartType.XYChart) {
                                this._signalManagerWidget.activateEditMode(true);
                            }
                        }
                        //Add all dragged series to the chart.
                        this.addSerieToChart(chartManagerDataModel, series, chartManagerChart, yAxisId);
                    }
                    break;
                }
                case chartDropHelper_1.ChartDropHelperChangedHint.addSerie: {
                    var series = args.data.series;
                    var chart = args.data.chart;
                    var yAxis = args.data.yAxis;
                    if (chart != undefined) {
                        //target chart may not be provided by the event args
                        if (args.data.targetChart == undefined) {
                            if (this._chartViewWidget != undefined) {
                                args.data.targetChart = this._chartViewWidget.getTraceChartByName(chart.name);
                            }
                        }
                        //if target chart still does not exist dont try to add the series to anything
                        if (args.data.targetChart != undefined) {
                            var yAxisId = this.getYAxisId(chartManagerDataModel, chart, yAxis, args.data.targetChart);
                            //insert serie to empty a chart
                            this.addSerieToChart(chartManagerDataModel, series, chart, yAxisId);
                        }
                    }
                    break;
                }
                case chartDropHelper_1.ChartDropHelperChangedHint.createXYSerie: {
                    //Creates XY serie and adds it to the XY chart
                    var chartManagerChart = args.data.chart;
                    var series = new Array();
                    var xySeries = this.createXYSerie(args.data.series[0].parent, args.data.series);
                    if (xySeries != undefined) {
                        series.push(xySeries);
                    }
                    var yAxisId = chartManagerChart.getDefaultYAxisId();
                    //Add all dragged series to the chart.
                    this.addSerieToChart(chartManagerDataModel, series, chartManagerChart, yAxisId);
                    break;
                }
                case chartDropHelper_1.ChartDropHelperChangedHint.createFFTSerie: {
                    //Creates FFT serie and add it to the FFT chart
                    var chart = args.data.chart;
                    var series = new Array();
                    for (var i = 0; i < args.data.series.length; i++) {
                        var fftSeries = this.createFFTSerie(args.data.series[i].parent, args.data.series[i]);
                        if (fftSeries != undefined) {
                            series.push(fftSeries);
                        }
                    }
                    var yAxis = args.data.yAxis;
                    //target chart may not be provided by the event args
                    if (args.data.targetChart == undefined) {
                        if (this._chartViewWidget != undefined) {
                            args.data.targetChart = this._chartViewWidget.getTraceChartByName(chart.name);
                        }
                    }
                    //if target chart still does not exist dont try to add the series to anything
                    if (args.data.targetChart != undefined) {
                        var yAxisId = this.getYAxisId(chartManagerDataModel, chart, yAxis, args.data.targetChart);
                        //Add all dragged series to the chart.
                        this.addSerieToChart(chartManagerDataModel, series, chart, yAxisId);
                    }
                }
            }
        };
        /**
         * Attaches the signal manager widget events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.attachSignalManagerWidgetEvents = function () {
            if (this._signalManagerWidget != undefined) {
                this._signalManagerWidget.eventSerieDoubleClicked.attach(this._signalManagerWidgetSerieDoubleClickedHandler);
                this._signalManagerWidget.eventChangeSize.attach(this._signalManagerWidgetChangeSizeHandler);
            }
        };
        /**
         * Detaches the signal manager widget events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachSignalManagerWidgetEvents = function () {
            if (this._signalManagerWidget != undefined) {
                this._signalManagerWidget.eventSerieDoubleClicked.detach(this._signalManagerWidgetSerieDoubleClickedHandler);
                this._signalManagerWidget.eventChangeSize.detach(this._signalManagerWidgetChangeSizeHandler);
            }
        };
        TraceViewWidget.prototype.onSignalManagerWidgetSerieDoubleClicked = function (sender, serie) {
            this.addNewChart(this._chartManagerWidget.dataModel, serie);
        };
        TraceViewWidget.prototype.onSignalManagerWidgetChangeSize = function (sender, newSize) {
            // get parent(splitter) widget of sender(signalManager)
            var innerLayoutSplitterWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetMainTraceId);
            // change size of splitter pane
            innerLayoutSplitterWidget.resizeWidget(sender, newSize);
        };
        /**
         * Adds a new chart to the chartmanager datamodel(if possible => max chart number) and adds the given signal to the new chart
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addNewChart = function (chartManagerDataModel, serie) {
            if (chartManagerDataModel) {
                var newChartName = chartManagerDataModel.getUniqueChartName();
                var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(serie.type);
                var newChart = new chartManagerChart_1.ChartManagerChart(newChartName, serieChartType);
                newChart.addDefaultYScale(this._chartManagerDataModel);
                var isChartAdded = chartManagerDataModel.addChart(newChart, 0);
                if (serie != undefined && isChartAdded) {
                    var series = new Array();
                    series.push(serie);
                    var yAxis = newChart.getYScale(newChart.getDefaultYAxisId());
                    if (yAxis != undefined) {
                        this.addSerieToChart(chartManagerDataModel, series, newChart, yAxis.id);
                    }
                    else {
                        console.error("Default yAxis not available!");
                    }
                }
            }
        };
        /**
         * Add serie to chart (one by one)
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @param {(IChartManagerChart | undefined)} chartManagerChart
         * @param {string} yAxisId
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addSerieToChart = function (chartManagerDataModel, series, chartManagerChart, yAxisId) {
            var yAxis = chartManagerChart.getYScale(yAxisId);
            var insertedInfo = new insertedInfo_1.InsertedInfo(series, yAxis, chartManagerChart);
            if (insertedInfo != undefined && insertedInfo.yAxis != undefined && insertedInfo.chart != undefined) {
                chartManagerDataModel.addSeriesToChart(insertedInfo.chart, insertedInfo.series, insertedInfo.yAxis);
            }
        };
        TraceViewWidget.prototype.createXYSerie = function (container, series) {
            if (this._seriesProvider == undefined) {
                return undefined;
            }
            // create calculation
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", this._seriesProvider);
            // add calculation to container
            container.addSerieContainer(calculation, -1);
            // set calculation type
            calculation.setCalculatorTypeById(xyCalculator_1.XYCalculator.id);
            // set calculation input data
            if (series.length > 0 && series[0] != undefined) {
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdXSignal, series[0].name);
            }
            if (series.length > 1 && series[1] != undefined) {
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdYSignal, series[1].name);
            }
            // Return calculation output data 
            return calculation.getOutputCalculationData()[0].serie;
        };
        /**
         * Create FFT output serie
         *
         * @private
         * @param {ISerieContainer} container
         * @param {BaseSeries} series
         * @returns
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createFFTSerie = function (container, series) {
            if (this._seriesProvider == undefined) {
                return undefined;
            }
            // create calculation
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", this._seriesProvider);
            // add calculation to container
            container.addSerieContainer(calculation, -1);
            // set calculation type
            calculation.setCalculatorTypeById(fftCalculator_1.FftCalculator.id);
            // set calculation input data
            calculation.setInputValueById(fftCalculator_1.FftCalculator.inputIdSignal, series.name);
            // Change output data name and color of new FFT calculation
            var inputData = calculation.getInputCalculationData();
            var outputData = calculation.getOutputCalculationData();
            if (inputData[0].serie != undefined && inputData[0].serie.rawPointsValid) {
                var outputData_1 = calculation.getOutputCalculationData();
                if (outputData_1.length > 0) {
                    outputData_1[0].color = inputData[0].serie.color;
                    outputData_1[0].value = 'FFT(' + inputData[0].serie.name + ') ' + calculation.serie.calculationDataInfo.uniqueId;
                }
            }
            // Return calculation output data 
            return outputData[0].serie;
        };
        /**
         *
         *
         * @private
         * @param {IChartManagerDataModel} chartManagerDataModel
         * @param {IChartManagerChart} chart
         * @param {(Scale | undefined)} yAxis
         * @param {(ITraceChart | undefined)} targetChart
         * @returns {string}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.getYAxisId = function (chartManagerDataModel, chart, yAxis, targetChart) {
            var yAxisId;
            if (yAxis != undefined) {
                chart = yAxis.parent;
                yAxisId = yAxis.id;
            }
            else {
                yAxisId = this.getYScaleId(chartManagerDataModel, chart, targetChart);
                if (yAxisId == undefined) {
                    // Create new scale
                    yAxisId = chart.getNextYAxisId();
                    var newYAxis = new scale_1.Scale(yAxisId, chart);
                    chartManagerDataModel.addYScale(chart, newYAxis);
                }
            }
            return yAxisId;
        };
        /**
         * Return yAxis id when serie is dropped in the chart view
         *
         * @private
         * @param {DataModels.IChartManagerDataModel} chartManagerDataModel
         * @param {IChartManagerChart} chartManagerChart
         * @param {*} targetChart
         * @returns {string}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.getYScaleId = function (chartManagerDataModel, chartManagerChart, targetChart) {
            var yAxisId;
            if (chartManagerChart.chartType == chartManagerChart_1.ChartType.XYChart) {
                yAxisId = chartManagerChart.getDefaultYAxisId();
            }
            else {
                //adding series to YT charts
                var objectUnderMouse = targetChart.getChartObjectUnderMouse(targetChart.chartInstance.mousemoveX, targetChart.chartInstance.mousemoveY);
                if (objectUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.axis) {
                    // get axis id
                    yAxisId = objectUnderMouse.args.axis.getAxisID();
                }
                else if (objectUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.chartSpace) {
                    // create new axis
                    yAxisId = chartManagerChart.getNextYAxisId();
                    var newYAxis = new scale_1.Scale(yAxisId, chartManagerChart);
                    chartManagerDataModel.addYScale(chartManagerChart, newYAxis);
                }
            }
            return yAxisId;
        };
        /**
         * Attaches the signal manager datamodel events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.attachSignalManagerDataModelEvents = function () {
            if (this._signalManagerDataModel) {
                this._signalManagerDataModel.eventSignalRemoved.attach(this._signalManagerSignalRemovedHandler);
            }
        };
        /**
         * Detaches the signal manager datamodel events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachSignalManagerDataModelEvents = function () {
            if (this._signalManagerDataModel) {
                this._signalManagerDataModel.eventSignalRemoved.detach(this._signalManagerSignalRemovedHandler);
            }
        };
        TraceViewWidget.prototype.onSignalManagerSignalRemoved = function (sender, serie) {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.removeSerieFromAllCharts(serie);
            }
        };
        /**
         * Detaches the chart manager widget events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachChartManagerWidgetEvents = function () {
            this._chartManagerWidget.eventDropHelper.detach(this._chartManagerWidgetdropHelperHandler);
        };
        /**
         * Start loading trace data from target
         *
         * @private
         * @returns
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.loadTraceDataFromTarget = function () {
            if (this._isLoadingTraceData == true || this._widgetIsActive == false) {
                return;
            }
            this._isLoadingTraceData = true;
            this._traceControlWidget.setBusyInformation(new busyInformation_1.BusyInformation("Loading trace data", busyInformation_1.ImageId.defaultImage, 25, false));
            this._traceControlWidget.setBusy(true);
            // invoke loading trace data
            this.invokeLoadTraceData();
        };
        TraceViewWidget.prototype.invokeLoadTraceData = function () {
            // BINDINGSOURCE: method for dispatching the call to a bound target
        };
        /**
         * Informations if loading of trace data from target failed
         *
         * @private
         * @param {*} errorData
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onErrorLoadingTraceData = function (errorData) {
            this._isLoadingTraceData = false;
            this._traceControlWidget.setBusy(false);
        };
        /**
         * update the available data point infos
         *
         * @private
         * @param {Array<TraceDataPointInfo>} traceDataPointInfos
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.updateAvailableDataPoints = function (traceDataPointInfos) {
            this._traceDataPointInfos = traceDataPointInfos;
        };
        /**
         *  handles trace state changes
         *
         * @private
         * @param {string} traceState
         * @param {string} oldTraceState
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onTraceStateChanged = function (traceState, oldTraceState) {
            var whileStartup = false;
            if (this._traceState == "") {
                whileStartup = true;
            }
            this._traceState = traceState;
            // Load available data if state was changed to data_available and also at startup
            if (traceState == traceConfigDefines_1.TraceStateIds.Data_available && (oldTraceState != traceConfigDefines_1.TraceStateIds.Data_available || whileStartup == true)) {
                // Auto upload of trace data
                this.loadTraceDataFromTarget();
            }
        };
        /**
         * Informations(tracedata) from target after successful trace data upload
         *
         * @private
         * @param {*} result
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onTraceDataLoaded = function (result) {
            var traceData = result;
            var addTraceDataToSignalManager = true;
            // check if data already in signalmanager datamodel
            if (traceData.traceChannels.length > 0 && traceData.traceChannels[0].tracePoints.length > 0) {
                var serieGroupId = traceData.triggerTime.toString();
                if (this._signalManagerDataModel != undefined) {
                    if (this._signalManagerDataModel["disposed"] != true) { // Bugfix to avoid use of not unbinded datamodel
                        var latestCategory = this._signalManagerDataModel.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdRecent);
                        if (latestCategory != undefined) {
                            var serieContainer = latestCategory.getSerieContainerById(serieGroupId);
                            if (serieContainer != undefined) { // signal container already exists; needed to avoid duplicated signal containers if event comes multiple times
                                addTraceDataToSignalManager = false;
                            }
                        }
                    }
                }
                else {
                    console.error("signalManagerDataModel not available");
                }
            }
            if (addTraceDataToSignalManager == true) {
                if (traceData.traceChannels.length > 0 && traceData.traceChannels[0].tracePoints.length > 0) {
                    this.addTraceDataToSignalManager(traceData);
                }
            }
            this._isLoadingTraceData = false;
            this._traceControlWidget.setBusy(false);
        };
        /**
         * Adds the given trace data to the signal manager
         *
         * @private
         * @param {*} traceData
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addTraceDataToSignalManager = function (traceData) {
            var id = traceData.triggerTime.toString();
            var newSerieGroup = new serieGroup_1.SerieGroup(dateTimeHelper_1.DateTimeHelper.getDateTime(traceData.triggerTime), id, traceData.triggerTime);
            var _loop_1 = function () {
                var signalHasNullValues = false;
                data = new Array();
                for (var j = 0; j < traceData.traceChannels[i].tracePoints.length; j++) {
                    xVal = (traceData.traceChannels[i].tracePoints[j].timeStamp - traceData.triggerTime) / 1000000;
                    var dataValue = traceData.traceChannels[i].tracePoints[j].dataValue;
                    if (dataValue == null) {
                        // null value found => used for NaN or +/- inf
                        // use empty point array for signal
                        data = new Array();
                        signalHasNullValues = true;
                        break;
                    }
                    else {
                        yVal = dataValue;
                        data.push(new point_1.Point(xVal, yVal));
                    }
                }
                var newSignal = new signal_1.Signal(traceData.traceChannels[i].name, data);
                if (this_1._seriesProvider != undefined) {
                    var errorInfo = new Array();
                    if (signalHasNullValues == true) {
                        errorInfo.push("Invalid signal contains NaN or inf values!");
                    }
                    var settings = seriesHelper_1.SeriesHelper.createSerieSettings(newSignal, newSignal.name, colorHelper_1.ColorHelper.getColor(), this_1._seriesProvider.getUniqueId(), seriesType_1.SeriesType.timeSeries, undefined, errorInfo);
                    var newSerie = this_1._seriesProvider.createSerie(settings);
                    if (newSerie != undefined) {
                        if (this_1._traceDataPointInfos != undefined) {
                            var tracePointInfos = this_1._traceDataPointInfos.filter(function (element) { return element.fullname == newSignal.name; });
                            if (tracePointInfos.length == 1) {
                                newSerie.name = tracePointInfos[0].componentName + ":" + tracePointInfos[0].name;
                                newSerie.description = tracePointInfos[0].description;
                            }
                        }
                        newSerieGroup.addSerie(newSerie);
                    }
                    else {
                        console.error("Creation of the serie was not possible!");
                    }
                }
                else {
                    console.error("SeriesProvider not available!");
                }
            };
            var this_1 = this, data, xVal, yVal;
            for (var i = 0; i < traceData.traceChannels.length; i++) {
                _loop_1();
            }
            this._signalManagerDataModel.addUploadedSerieGroup(newSerieGroup);
        };
        return TraceViewWidget;
    }(viewBase_1.ViewBase));
    exports.TraceViewWidget = TraceViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VWaWV3V2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlVmlld1dpZGdldC90cmFjZVZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWtDQTtRQUE4QixtQ0FBUTtRQUF0QztZQUFBLHFFQWl4QkM7WUFud0JXLHlCQUFtQixHQUFHLEtBQUssQ0FBQztZQUk1QixxQkFBZSxHQUFHLElBQUksQ0FBQztZQUUvQixpQkFBaUI7WUFDVCw4QkFBd0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1lBRW5GLHdDQUFrQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO1lBRXhGLG1EQUE2QyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQTFELENBQTBELENBQUM7WUFDN0gsMkNBQXFDLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLCtCQUErQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBbEQsQ0FBa0QsQ0FBQztZQUM3Ryx3Q0FBa0MsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUEvQyxDQUErQyxDQUFDO1lBRXZHLDBDQUFvQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FB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QWUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dDQUM3QixRQUFRLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQ2pGLFFBQVEsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQzs2QkFDekQ7eUJBQ0o7d0JBQ0QsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFTLENBQUMsQ0FBQztxQkFDckM7eUJBQ0c7d0JBQ0EsT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFBO3FCQUMzRDtpQkFDSjtxQkFDRztvQkFDQSxPQUFPLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUE7aUJBQ2pEOzsrQkF6Q0csSUFBSSxFQUVBLElBQUksRUFVQSxJQUFJO1lBZnBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7O2FBNkN0RDtZQUNELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBanhCRCxDQUE4QixtQkFBUSxHQWl4QnJDO0lBRVEsMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF5b3V0V2lkZ2V0IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2xheW91dFdpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2VyaWVDb250YWluZXJJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IFRyYWNlRGF0YSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUmVhZGVyXCI7XHJcbmltcG9ydCB7IERhdGVUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kYXRlVGltZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3BvaW50XCI7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvckhlbHBlclwiO1xyXG5pbXBvcnQgeyBCdXN5SW5mb3JtYXRpb24sIEltYWdlSWQgfSBmcm9tIFwiLi4vY29tbW9uL2J1c3lJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJDaGFydCwgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgVHJhY2VTdGF0ZUlkcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VDb25maWcvdHJhY2VDb25maWdEZWZpbmVzXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IFZpZXdCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3QmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludCB9IGZyb20gXCIuLi9jaGFydFZpZXdXaWRnZXQvaGVscGVycy9jaGFydERyb3BIZWxwZXJcIjtcclxuaW1wb3J0IHsgSW5zZXJ0ZWRJbmZvIH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9pbnNlcnRlZEluZm9cIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBDaGFydE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvQ2hhcnRCYXNlXCI7XHJcbmltcG9ydCB7IFNlcmllQ2hhcnRUeXBlSGVscGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9TZXJpZUNoYXJ0VHlwZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbENhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2lnbmFsXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0ICogYXMgRGF0YU1vZGVscyBmcm9tICcuLi8uLi9tb2RlbHMvZGF0YU1vZGVscyc7XHJcbmltcG9ydCB7IFNlcmllc0hlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzSGVscGVyXCI7XHJcbmltcG9ydCB7IFhZQ2FsY3VsYXRvciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy94eUNhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgRmZ0Q2FsY3VsYXRvciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9mZnRDYWxjdWxhdG9yXCI7XHJcblxyXG5jbGFzcyBUcmFjZVZpZXdXaWRnZXQgZXh0ZW5kcyBWaWV3QmFzZSBpbXBsZW1lbnRzIFdpZGdldHMuSVRyYWNlVmlld1dpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hhcnRNYW5hZ2VyRGF0YU1vZGVsITogRGF0YU1vZGVscy5JQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBfY2hhcnRNYW5hZ2VyV2lkZ2V0ITogV2lkZ2V0cy5JQ2hhcnRNYW5hZ2VyV2lkZ2V0O1xyXG5cclxuICAgIHByaXZhdGUgX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwhOiBEYXRhTW9kZWxzLklTaWduYWxNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgcHVibGljIF9zaWduYWxNYW5hZ2VyV2lkZ2V0PzogV2lkZ2V0cy5JU2lnbmFsTWFuYWdlcldpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF9zZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyfHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFydFZpZXdXaWRnZXQ/OiBXaWRnZXRzLklDaGFydFZpZXdXaWRnZXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHJhY2VDb250cm9sV2lkZ2V0ITogV2lkZ2V0cy5JVHJhY2VDb250cm9sV2lkZ2V0O1xyXG5cclxuICAgIHByaXZhdGUgX2lzTG9hZGluZ1RyYWNlRGF0YSA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3RyYWNlRGF0YVBvaW50SW5mb3M6IEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4gfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfd2lkZ2V0SXNBY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIC8vIEV2ZW50IGhhbmRsZXJzXHJcbiAgICBwcml2YXRlIF9jb250ZW50QWN0aXZhdGVkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Db250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncyk7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hhcnRWaWV3V2lkZ2V0RHJvcENoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vbkRyb3BDaGFuZ2VkKHNlbmRlciwgYXJncyk7ICAgXHJcblxyXG4gICAgcHJpdmF0ZSBfc2lnbmFsTWFuYWdlcldpZGdldFNlcmllRG91YmxlQ2xpY2tlZEhhbmRsZXIgPSAoc2VuZGVyLCBkYXRhKSA9PiB0aGlzLm9uU2lnbmFsTWFuYWdlcldpZGdldFNlcmllRG91YmxlQ2xpY2tlZChzZW5kZXIsIGRhdGEpOyAgICAgXHJcbiAgICBwcml2YXRlIF9zaWduYWxNYW5hZ2VyV2lkZ2V0Q2hhbmdlU2l6ZUhhbmRsZXIgPSAoc2VuZGVyLCBkYXRhKSA9PiB0aGlzLm9uU2lnbmFsTWFuYWdlcldpZGdldENoYW5nZVNpemUoc2VuZGVyLCBkYXRhKTsgICAgIFxyXG4gICAgcHJpdmF0ZSBfc2lnbmFsTWFuYWdlclNpZ25hbFJlbW92ZWRIYW5kbGVyID0gKHNlbmRlciwgZGF0YSkgPT4gdGhpcy5vblNpZ25hbE1hbmFnZXJTaWduYWxSZW1vdmVkKHNlbmRlciwgZGF0YSk7ICAgICBcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfY2hhcnRNYW5hZ2VyV2lkZ2V0ZHJvcEhlbHBlckhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uRHJvcENoYW5nZWQoc2VuZGVyLCBhcmdzKTtcclxuICAgIHByaXZhdGUgX3RyYWNlU3RhdGU6IHN0cmluZz1cIlwiO1xyXG4gIFxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplZCgpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRMYXlvdXRXaWRnZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTZXJpZXNQcm92aWRlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0VHJhY2VDb250cm9sV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRJbm5lcldpZGdldHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0TGF5b3V0V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TcGxpdHRlcldpZGdldFRyYWNlVmlld0lkKSBhcyBJTGF5b3V0V2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuYXR0YWNoTGF5b3V0VG9WaWV3KDxhbnk+dGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIC8vIGFkZCB3aWRnZXQgdG8gdGhlIHBhcmVudCBjb250YWluZXJcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuYWRkVG9QYXJlbnRDb250YWluZXIodGhpcy5tYWluRGl2KTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9jb250ZW50QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaW5uZXIgd2lkZ2V0cyAoc2lnbmFsbWFuYWdlciwgY2hhcnQgdmlldywgY2hhcnRtYW5hZ2VyL2N1cnNvcmluZm8pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRJbm5lcldpZGdldHMoKSB7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBsZWZ0IHdpZGdldFxyXG4gICAgICAgIHRoaXMuc2V0U2lnbmFsTWFuYWdlcldpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoU2lnbmFsTWFuYWdlcldpZGdldEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIG1pZGRsZSB3aWRnZXRcclxuICAgICAgICB0aGlzLnNldENoYXJ0Vmlld1dpZGdldCgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIHdpZGdldHMgb24gdGhlIHJpZ2h0IHNpZGVcclxuICAgICAgICB0aGlzLnNldFJpZ2h0V2lkZ2V0cygpO1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHJpZ2h0IHdpZGdldHMgKGNoYXJ0bWFuYWdlciwgY3Vyc29yaW5mbylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFJpZ2h0V2lkZ2V0cygpIHtcclxuXHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY2hhcnQgbWFuYWdlciB3aWRnZXQgb24gdG9wXHJcbiAgICAgICAgdGhpcy5zZXRDaGFydE1hbmFnZXJXaWRnZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0U2VyaWVzUHJvdmlkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5fc2VyaWVzUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU2VyaWVzUHJvdmlkZXJJZCkgYXMgSVNlcmllc1Byb3ZpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdHJhY2UgY29udHJvbCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRUcmFjZUNvbnRyb2xXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlRyYWNlQ29udHJvbFdpZGdldElkKSBhcyBXaWRnZXRzLklUcmFjZUNvbnRyb2xXaWRnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzaWduYWwgbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFNpZ25hbE1hbmFnZXJXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5TaWduYWxNYW5hZ2VyV2lkZ2V0SWQpIGFzIFdpZGdldHMuSVNpZ25hbE1hbmFnZXJXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQuZGF0YU1vZGVsIGFzIERhdGFNb2RlbHMuSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjaGFydCB2aWV3IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q2hhcnRWaWV3V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0Vmlld1dpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5DaGFydFZpZXdXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JQ2hhcnRWaWV3V2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0Vmlld1dpZGdldC5ldmVudERyb3BIZWxwZXIuYXR0YWNoKHRoaXMuX2NoYXJ0Vmlld1dpZGdldERyb3BDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjaGFydCBtYW5hZ2VyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q2hhcnRNYW5hZ2VyV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5DaGFydE1hbmFnZXJXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JQ2hhcnRNYW5hZ2VyV2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldC5ldmVudERyb3BIZWxwZXIuYXR0YWNoKHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldGRyb3BIZWxwZXJIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsID0gdGhpcy5fY2hhcnRNYW5hZ2VyV2lkZ2V0LmRhdGFNb2RlbCBhcyBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl93aWRnZXRJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICAvLyBEZXRhY2ggZXZlbnRzXHJcbiAgICAgICAgdGhpcy5kZXRhY2hFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcG9zZSBwcm92aWRlclxyXG4gICAgICAgIHRoaXMuZGlzcG9zZVByb3ZpZGVycygpO1xyXG5cclxuICAgICAgICAvLyBEaXNwb3NlIGRhdGFtb2RlbHNcclxuICAgICAgICB0aGlzLmRpc3Bvc2VEYXRhTW9kZWxzKCk7XHJcblxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgYWxsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoRXZlbnRzKCl7XHJcbiAgICAgICAgdGhpcy5kZXRhY2hDaGFydFZpZXdXaWRnZXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kZXRhY2hTaWduYWxNYW5hZ2VyV2lkZ2V0RXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5kZXRhY2hTaWduYWxNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kZXRhY2hDaGFydE1hbmFnZXJXaWRnZXRFdmVudHMoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9jb250ZW50QWN0aXZhdGVkSGFuZGxlcik7ICBcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlUHJvdmlkZXJzKCl7XHJcbiAgICAgICAgaWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogTGFzdCB1c2VyIG11c3QgZGlzcG9zZVxyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRGYWN0b3J5IS5kaXNwb3NlQ29tcG9uZW50KFwiU2VyaWVzUHJvdmlkZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSBhbGwgZGF0YSBtb2RlbHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpc3Bvc2VEYXRhTW9kZWxzKCl7XHJcbiAgICAgICAgLy8gVE9ETzogRGlzcG9zZSBkYXRhbW9kZWxzIGNlbnRyYWxcclxuICAgICAgICBpZih0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogTGFzdCB1c2VyIG11c3QgZGlzcG9zZVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBvbmx5IG5lZWRlZCB0byByZW1vdmUgc2luZ2xldG9uIGluc3RhbmNlIG9mIGNoYXJ0bWFuYWdlckRhdGFNb2RlbFxyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRGYWN0b3J5IS5kaXNwb3NlQ29tcG9uZW50KFwiQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9sYXlvdXRXaWRnZXQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwcml2YXRlIGRldGFjaENoYXJ0Vmlld1dpZGdldEV2ZW50cygpe1xyXG4gICAgICAgIGlmKHRoaXMuX2NoYXJ0Vmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFydFZpZXdXaWRnZXQuZXZlbnREcm9wSGVscGVyLmRldGFjaCh0aGlzLl9jaGFydFZpZXdXaWRnZXREcm9wQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIGEgRCZEIG9wZXJhdGlvbiBoYXMgYmVlbiBkb25lXHJcbiAgICAgKiBcclxuICAgICAqIFJldmlldyBMdWthcyBPYmVyc2FtZXI6XHJcbiAgICAgKiBUaGUgY3ljbG9tYXRpYyBjb21wbGV4aXR5IG9mIHRoaXMgZnVuY3Rpb24gaXMgdG9vIGhpZ2guXHJcbiAgICAgKiBUZW1wb3JhcmlseSBva2F5LCBhcyBpbiBteSBzdWJqZWN0aXZlIGp1ZGdlbWVudCwgdGhlIGNvZGUgcmVhZGFiaWxpdHkgaXMgb2theSBhbmQgdGhlIGV4cGVjdGVkIHJpc2sgb2YgaGlkZGVuIGlzc3VlcyBpcyBleHBlY3RlZCB0byBiZSB2ZXJ5IGxvdy5cclxuICAgICAqIC0tPiBDb3JyZWN0aXZlIGFjdGlvbiBpcyBzdWZmaWNpZW50IHdpdGhpbiB0aGUgNS4xOSB2ZXJzaW9uIHJhbmdlLlxyXG4gICAgICogLS0+IFRPRE8gZnVydGhlciBkaXNjdXNzaW9uIChlLmcuIHNlcGFyYXRpb24gb2YgY29udHJvbCBmbG93IGxvZ2ljIGFuZCBkYXRhIHByb2Nlc3NpbmcpIGFuZCBkZWZpbml0aW9uIG9mIG1pdGlnYXRpb24gb3B0aW9ucyBuZWVkZWQgKGFzIHNvb24gYXMgdGhpcyBhcmVhIGhhcyB0byBiZSBhZGFwdGVkKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0RhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbH0gY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkRyb3BDaGFuZ2VkKGNoYXJ0TWFuYWdlckRhdGFNb2RlbDogRGF0YU1vZGVscy5JQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBhcmdzKSB7XHJcbiAgICAgICAgc3dpdGNoIChhcmdzLmhpbnQpIHtcclxuICAgICAgICAgICAgY2FzZSBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5jcmVhdGVDaGFydDoge1xyXG4gICAgICAgICAgICAgICAgLy9jcmVhdGVzIGEgY2hhcnQgYW4gYWRkcyBpdHMgc2VyaWVzXHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnROYW1lID0gY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldFVuaXF1ZUNoYXJ0TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckNoYXJ0ID0gbmV3IENoYXJ0TWFuYWdlckNoYXJ0KGNoYXJ0TmFtZSwgYXJncy5kYXRhLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgY2hhcnRNYW5hZ2VyQ2hhcnQuYWRkRGVmYXVsdFlTY2FsZSh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmFkZENoYXJ0KGNoYXJ0TWFuYWdlckNoYXJ0LCAtMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5kYXRhLnNlcmllcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeUF4aXNJZCA9IGNoYXJ0TWFuYWdlckNoYXJ0LmdldERlZmF1bHRZQXhpc0lkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcmllcyA9IGFyZ3MuZGF0YS5zZXJpZXMgYXMgQmFzZVNlcmllc1tdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmRhdGEudHlwZSAhPSBDaGFydFR5cGUuWVRDaGFydCAmJiBhcmdzLmRhdGEuc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0IS5lbmFibGVUcmVlR3JpZFJlZnJlc2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJncy5kYXRhLnR5cGUgPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4eVNlcmllcyA9IHRoaXMuY3JlYXRlWFlTZXJpZShhcmdzLmRhdGEuc2VyaWVzWzBdLnBhcmVudCwgYXJncy5kYXRhLnNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih4eVNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHh5U2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhcmdzLmRhdGEudHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5kYXRhLnNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZmdFNlcmllcyA9IHRoaXMuY3JlYXRlRkZUU2VyaWUoYXJncy5kYXRhLnNlcmllc1tpXS5wYXJlbnQsIGFyZ3MuZGF0YS5zZXJpZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZmdFNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXMucHVzaChmZnRTZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0IS5lbmFibGVUcmVlR3JpZFJlZnJlc2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQhLmVkaXRNb2RlQWN0aXZlICYmIGFyZ3MuZGF0YS50eXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0IS5hY3RpdmF0ZUVkaXRNb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vQWRkIGFsbCBkcmFnZ2VkIHNlcmllcyB0byB0aGUgY2hhcnQuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZVRvQ2hhcnQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBzZXJpZXMsIGNoYXJ0TWFuYWdlckNoYXJ0LCB5QXhpc0lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuYWRkU2VyaWU6IHsgXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiA9IGFyZ3MuZGF0YS5zZXJpZXM7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCA9IGFyZ3MuZGF0YS5jaGFydDtcclxuICAgICAgICAgICAgICAgIGxldCB5QXhpczogU2NhbGUgPSBhcmdzLmRhdGEueUF4aXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90YXJnZXQgY2hhcnQgbWF5IG5vdCBiZSBwcm92aWRlZCBieSB0aGUgZXZlbnQgYXJnc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZ3MuZGF0YS50YXJnZXRDaGFydCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9jaGFydFZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuZGF0YS50YXJnZXRDaGFydCA9IHRoaXMuX2NoYXJ0Vmlld1dpZGdldC5nZXRUcmFjZUNoYXJ0QnlOYW1lKGNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgdGFyZ2V0IGNoYXJ0IHN0aWxsIGRvZXMgbm90IGV4aXN0IGRvbnQgdHJ5IHRvIGFkZCB0aGUgc2VyaWVzIHRvIGFueXRoaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJncy5kYXRhLnRhcmdldENoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5QXhpc0lkID0gdGhpcy5nZXRZQXhpc0lkKGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgY2hhcnQsIHlBeGlzLCBhcmdzLmRhdGEudGFyZ2V0Q2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luc2VydCBzZXJpZSB0byBlbXB0eSBhIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVUb0NoYXJ0KGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWVzLCBjaGFydCwgeUF4aXNJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuY3JlYXRlWFlTZXJpZTogeyBcclxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlcyBYWSBzZXJpZSBhbmQgYWRkcyBpdCB0byB0aGUgWFkgY2hhcnRcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydE1hbmFnZXJDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0ID0gYXJncy5kYXRhLmNoYXJ0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHh5U2VyaWVzID0gdGhpcy5jcmVhdGVYWVNlcmllKGFyZ3MuZGF0YS5zZXJpZXNbMF0ucGFyZW50LCBhcmdzLmRhdGEuc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgIGlmKHh5U2VyaWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzLnB1c2goeHlTZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHlBeGlzSWQgPSBjaGFydE1hbmFnZXJDaGFydC5nZXREZWZhdWx0WUF4aXNJZCgpO1xyXG4gICAgICAgICAgICAgICAgLy9BZGQgYWxsIGRyYWdnZWQgc2VyaWVzIHRvIHRoZSBjaGFydC5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVUb0NoYXJ0KGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWVzLCBjaGFydE1hbmFnZXJDaGFydCwgeUF4aXNJZCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5jcmVhdGVGRlRTZXJpZTogeyBcclxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlcyBGRlQgc2VyaWUgYW5kIGFkZCBpdCB0byB0aGUgRkZUIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCA9IGFyZ3MuZGF0YS5jaGFydDtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5kYXRhLnNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZmdFNlcmllcyA9IHRoaXMuY3JlYXRlRkZUU2VyaWUoYXJncy5kYXRhLnNlcmllc1tpXS5wYXJlbnQsIGFyZ3MuZGF0YS5zZXJpZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZmdFNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXMucHVzaChmZnRTZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB5QXhpczogU2NhbGUgPSBhcmdzLmRhdGEueUF4aXM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vdGFyZ2V0IGNoYXJ0IG1heSBub3QgYmUgcHJvdmlkZWQgYnkgdGhlIGV2ZW50IGFyZ3NcclxuICAgICAgICAgICAgICAgIGlmKGFyZ3MuZGF0YS50YXJnZXRDaGFydCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2NoYXJ0Vmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRhdGEudGFyZ2V0Q2hhcnQgPSB0aGlzLl9jaGFydFZpZXdXaWRnZXQuZ2V0VHJhY2VDaGFydEJ5TmFtZShjaGFydC5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRhcmdldCBjaGFydCBzdGlsbCBkb2VzIG5vdCBleGlzdCBkb250IHRyeSB0byBhZGQgdGhlIHNlcmllcyB0byBhbnl0aGluZ1xyXG4gICAgICAgICAgICAgICAgaWYoYXJncy5kYXRhLnRhcmdldENoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHlBeGlzSWQgPSB0aGlzLmdldFlBeGlzSWQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBjaGFydCwgeUF4aXMsIGFyZ3MuZGF0YS50YXJnZXRDaGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgYWxsIGRyYWdnZWQgc2VyaWVzIHRvIHRoZSBjaGFydC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllVG9DaGFydChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllcywgY2hhcnQsIHlBeGlzSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoZXMgdGhlIHNpZ25hbCBtYW5hZ2VyIHdpZGdldCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaFNpZ25hbE1hbmFnZXJXaWRnZXRFdmVudHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0LmV2ZW50U2VyaWVEb3VibGVDbGlja2VkLmF0dGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0U2VyaWVEb3VibGVDbGlja2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQuZXZlbnRDaGFuZ2VTaXplLmF0dGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0Q2hhbmdlU2l6ZUhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBzaWduYWwgbWFuYWdlciB3aWRnZXQgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hTaWduYWxNYW5hZ2VyV2lkZ2V0RXZlbnRzKCkge1xyXG4gICAgICAgIGlmKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldC5ldmVudFNlcmllRG91YmxlQ2xpY2tlZC5kZXRhY2godGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldFNlcmllRG91YmxlQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0LmV2ZW50Q2hhbmdlU2l6ZS5kZXRhY2godGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldENoYW5nZVNpemVIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNpZ25hbE1hbmFnZXJXaWRnZXRTZXJpZURvdWJsZUNsaWNrZWQoc2VuZGVyLCBzZXJpZTogQmFzZVNlcmllcykge1xyXG4gICAgICAgIHRoaXMuYWRkTmV3Q2hhcnQodGhpcy5fY2hhcnRNYW5hZ2VyV2lkZ2V0LmRhdGFNb2RlbCBhcyBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2lnbmFsTWFuYWdlcldpZGdldENoYW5nZVNpemUoc2VuZGVyLCBuZXdTaXplKSB7XHJcbiAgICAgICAgLy8gZ2V0IHBhcmVudChzcGxpdHRlcikgd2lkZ2V0IG9mIHNlbmRlcihzaWduYWxNYW5hZ2VyKVxyXG4gICAgICAgIGxldCBpbm5lckxheW91dFNwbGl0dGVyV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNwbGl0dGVyV2lkZ2V0TWFpblRyYWNlSWQpIGFzIFdpZGdldHMuSVNwbGl0dGVyV2lkZ2V0O1xyXG4gICAgICAgIC8vIGNoYW5nZSBzaXplIG9mIHNwbGl0dGVyIHBhbmVcclxuICAgICAgICBpbm5lckxheW91dFNwbGl0dGVyV2lkZ2V0LnJlc2l6ZVdpZGdldChzZW5kZXIsIG5ld1NpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBjaGFydCB0byB0aGUgY2hhcnRtYW5hZ2VyIGRhdGFtb2RlbChpZiBwb3NzaWJsZSA9PiBtYXggY2hhcnQgbnVtYmVyKSBhbmQgYWRkcyB0aGUgZ2l2ZW4gc2lnbmFsIHRvIHRoZSBuZXcgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZE5ld0NoYXJ0KGNoYXJ0TWFuYWdlckRhdGFNb2RlbDogRGF0YU1vZGVscy5JQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBzZXJpZTogQmFzZVNlcmllcykge1xyXG4gICAgICAgIGlmIChjaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICAgICAgdmFyIG5ld0NoYXJ0TmFtZSA9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRVbmlxdWVDaGFydE5hbWUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzZXJpZUNoYXJ0VHlwZSA9IFNlcmllQ2hhcnRUeXBlSGVscGVyLmdldFNlcmllQ2hhcnRUeXBlKHNlcmllLnR5cGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5ld0NoYXJ0ID0gbmV3IENoYXJ0TWFuYWdlckNoYXJ0KG5ld0NoYXJ0TmFtZSwgc2VyaWVDaGFydFR5cGUpO1xyXG4gICAgICAgICAgICBuZXdDaGFydC5hZGREZWZhdWx0WVNjYWxlKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaXNDaGFydEFkZGVkID0gY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmFkZENoYXJ0KG5ld0NoYXJ0LCAwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZXJpZSAhPSB1bmRlZmluZWQgJiYgaXNDaGFydEFkZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXMucHVzaChzZXJpZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeUF4aXMgPSBuZXdDaGFydC5nZXRZU2NhbGUobmV3Q2hhcnQuZ2V0RGVmYXVsdFlBeGlzSWQoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoeUF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZVRvQ2hhcnQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBzZXJpZXMsIG5ld0NoYXJ0LCB5QXhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGVmYXVsdCB5QXhpcyBub3QgYXZhaWxhYmxlIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBzZXJpZSB0byBjaGFydCAob25lIGJ5IG9uZSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0geyhJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpfSBjaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHlBeGlzSWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZVRvQ2hhcnQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIGNoYXJ0TWFuYWdlckNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQsIHlBeGlzSWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCB5QXhpcyA9IGNoYXJ0TWFuYWdlckNoYXJ0IS5nZXRZU2NhbGUoeUF4aXNJZCk7XHJcbiAgICAgICAgbGV0IGluc2VydGVkSW5mbyA9IG5ldyBJbnNlcnRlZEluZm8oc2VyaWVzLCB5QXhpcywgY2hhcnRNYW5hZ2VyQ2hhcnQhKTtcclxuICAgICAgICBpZiAoaW5zZXJ0ZWRJbmZvICE9IHVuZGVmaW5lZCAmJiBpbnNlcnRlZEluZm8ueUF4aXMgIT0gdW5kZWZpbmVkICYmIGluc2VydGVkSW5mby5jaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmFkZFNlcmllc1RvQ2hhcnQoaW5zZXJ0ZWRJbmZvLmNoYXJ0LCBpbnNlcnRlZEluZm8uc2VyaWVzLCBpbnNlcnRlZEluZm8ueUF4aXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVhZU2VyaWUoY29udGFpbmVyOiBJU2VyaWVDb250YWluZXIsIHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pOiBCYXNlU2VyaWVzfHVuZGVmaW5lZCB7XHJcbiAgICAgIGlmKHRoaXMuX3Nlcmllc1Byb3ZpZGVyID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICB9IFxyXG5cclxuICAgICAgLy8gY3JlYXRlIGNhbGN1bGF0aW9uXHJcblx0ICBsZXQgY2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKFwiQ2FsY3VsYXRpb25cIiwgdGhpcy5fc2VyaWVzUHJvdmlkZXIpO1xyXG4gICAgICAgIFxyXG5cdCAgLy8gYWRkIGNhbGN1bGF0aW9uIHRvIGNvbnRhaW5lclxyXG5cdCAgY29udGFpbmVyLmFkZFNlcmllQ29udGFpbmVyKGNhbGN1bGF0aW9uLCAtMSk7XHJcbiAgICAgICAgXHJcblx0ICAvLyBzZXQgY2FsY3VsYXRpb24gdHlwZVxyXG5cdCAgY2FsY3VsYXRpb24uc2V0Q2FsY3VsYXRvclR5cGVCeUlkKFhZQ2FsY3VsYXRvci5pZCk7XHJcblxyXG5cdCAgLy8gc2V0IGNhbGN1bGF0aW9uIGlucHV0IGRhdGFcclxuXHQgIGlmKHNlcmllcy5sZW5ndGggPiAwICYmIHNlcmllc1swXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGNhbGN1bGF0aW9uLnNldElucHV0VmFsdWVCeUlkKFhZQ2FsY3VsYXRvci5pbnB1dElkWFNpZ25hbCwgc2VyaWVzWzBdLm5hbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG5cdCAgaWYoc2VyaWVzLmxlbmd0aCA+IDEgJiYgc2VyaWVzWzFdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldElucHV0VmFsdWVCeUlkKFhZQ2FsY3VsYXRvci5pbnB1dElkWVNpZ25hbCwgc2VyaWVzWzFdLm5hbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZXR1cm4gY2FsY3VsYXRpb24gb3V0cHV0IGRhdGEgXHJcbiAgICAgIHJldHVybiBjYWxjdWxhdGlvbi5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKVswXS5zZXJpZSBhcyBCYXNlU2VyaWVzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBGRlQgb3V0cHV0IHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBjb250YWluZXJcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUZGVFNlcmllKGNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyLCBzZXJpZXM6IEJhc2VTZXJpZXMpOiBCYXNlU2VyaWVzfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICAvLyBjcmVhdGUgY2FsY3VsYXRpb25cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKFwiQ2FsY3VsYXRpb25cIiwgdGhpcy5fc2VyaWVzUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICAvLyBhZGQgY2FsY3VsYXRpb24gdG8gY29udGFpbmVyXHJcbiAgICAgICAgY29udGFpbmVyLmFkZFNlcmllQ29udGFpbmVyKGNhbGN1bGF0aW9uLCAtMSk7XHJcblxyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvbiB0eXBlXHJcbiAgICAgICAgY2FsY3VsYXRpb24uc2V0Q2FsY3VsYXRvclR5cGVCeUlkKEZmdENhbGN1bGF0b3IuaWQpO1xyXG5cclxuICAgICAgICAvLyBzZXQgY2FsY3VsYXRpb24gaW5wdXQgZGF0YVxyXG4gICAgICAgIGNhbGN1bGF0aW9uLnNldElucHV0VmFsdWVCeUlkKEZmdENhbGN1bGF0b3IuaW5wdXRJZFNpZ25hbCwgc2VyaWVzLm5hbWUpO1xyXG5cclxuICAgICAgICAvLyBDaGFuZ2Ugb3V0cHV0IGRhdGEgbmFtZSBhbmQgY29sb3Igb2YgbmV3IEZGVCBjYWxjdWxhdGlvblxyXG4gICAgICAgIGxldCBpbnB1dERhdGEgPSBjYWxjdWxhdGlvbi5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gY2FsY3VsYXRpb24uZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgaWYoaW5wdXREYXRhWzBdLnNlcmllICE9IHVuZGVmaW5lZCAmJiBpbnB1dERhdGFbMF0uc2VyaWUucmF3UG9pbnRzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IG91dHB1dERhdGEgPSBjYWxjdWxhdGlvbi5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICAgICAgaWYob3V0cHV0RGF0YS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgb3V0cHV0RGF0YVswXS5jb2xvciA9IGlucHV0RGF0YVswXS5zZXJpZS5jb2xvcjtcclxuICAgICAgICAgICAgICAgIG91dHB1dERhdGFbMF0udmFsdWUgPSAnRkZUKCcgKyBpbnB1dERhdGFbMF0uc2VyaWUubmFtZSArICcpICcgKyBjYWxjdWxhdGlvbi5zZXJpZSEuY2FsY3VsYXRpb25EYXRhSW5mbyEudW5pcXVlSWQ7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIGNhbGN1bGF0aW9uIG91dHB1dCBkYXRhIFxyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhWzBdLnNlcmllIGFzIEJhc2VTZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJEYXRhTW9kZWx9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICAgKiBAcGFyYW0geyhTY2FsZSB8IHVuZGVmaW5lZCl9IHlBeGlzXHJcbiAgICAgKiBAcGFyYW0geyhJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCl9IHRhcmdldENoYXJ0XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFlBeGlzSWQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWwsIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHlBeGlzOiBTY2FsZSB8IHVuZGVmaW5lZCwgdGFyZ2V0Q2hhcnQ6IElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcclxuICAgICAgIGxldCB5QXhpc0lkOiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHlBeGlzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaGFydCA9IHlBeGlzLnBhcmVudDtcclxuICAgICAgICAgICAgeUF4aXNJZCA9IHlBeGlzLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgeUF4aXNJZCA9IHRoaXMuZ2V0WVNjYWxlSWQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBjaGFydCwgdGFyZ2V0Q2hhcnQpO1xyXG4gICAgICAgICAgICBpZih5QXhpc0lkID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IHNjYWxlXHJcbiAgICAgICAgICAgICAgICB5QXhpc0lkID0gY2hhcnQuZ2V0TmV4dFlBeGlzSWQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdZQXhpcyA9IG5ldyBTY2FsZSh5QXhpc0lkLCBjaGFydCk7XHJcbiAgICAgICAgICAgICAgICBjaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkWVNjYWxlKGNoYXJ0LCBuZXdZQXhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHlBeGlzSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4geUF4aXMgaWQgd2hlbiBzZXJpZSBpcyBkcm9wcGVkIGluIHRoZSBjaGFydCB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7RGF0YU1vZGVscy5JQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsfSBjaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICogQHBhcmFtIHsqfSB0YXJnZXRDaGFydFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRZU2NhbGVJZChjaGFydE1hbmFnZXJEYXRhTW9kZWw6IERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgdGFyZ2V0Q2hhcnQpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHlBeGlzSWQ7XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlckNoYXJ0LmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICB5QXhpc0lkID0gY2hhcnRNYW5hZ2VyQ2hhcnQuZ2V0RGVmYXVsdFlBeGlzSWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vYWRkaW5nIHNlcmllcyB0byBZVCBjaGFydHNcclxuICAgICAgICAgICAgbGV0IG9iamVjdFVuZGVyTW91c2UgPSB0YXJnZXRDaGFydC5nZXRDaGFydE9iamVjdFVuZGVyTW91c2UodGFyZ2V0Q2hhcnQuY2hhcnRJbnN0YW5jZS5tb3VzZW1vdmVYLCB0YXJnZXRDaGFydC5jaGFydEluc3RhbmNlLm1vdXNlbW92ZVkpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0VW5kZXJNb3VzZS5jaGFydE9iamVjdFR5cGUgPT0gQ2hhcnRPYmplY3RUeXBlLmF4aXMpIHsgXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgYXhpcyBpZFxyXG4gICAgICAgICAgICAgICAgeUF4aXNJZCA9IG9iamVjdFVuZGVyTW91c2UuYXJncy5heGlzLmdldEF4aXNJRCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iamVjdFVuZGVyTW91c2UuY2hhcnRPYmplY3RUeXBlID09IENoYXJ0T2JqZWN0VHlwZS5jaGFydFNwYWNlKSB7IFxyXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIG5ldyBheGlzXHJcbiAgICAgICAgICAgICAgICB5QXhpc0lkID0gY2hhcnRNYW5hZ2VyQ2hhcnQuZ2V0TmV4dFlBeGlzSWQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdZQXhpcyA9IG5ldyBTY2FsZSh5QXhpc0lkLCBjaGFydE1hbmFnZXJDaGFydCk7XHJcbiAgICAgICAgICAgICAgICBjaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkWVNjYWxlKGNoYXJ0TWFuYWdlckNoYXJ0LCBuZXdZQXhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHlBeGlzSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgc2lnbmFsIG1hbmFnZXIgZGF0YW1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoU2lnbmFsTWFuYWdlckRhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmV2ZW50U2lnbmFsUmVtb3ZlZC5hdHRhY2godGhpcy5fc2lnbmFsTWFuYWdlclNpZ25hbFJlbW92ZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgc2lnbmFsIG1hbmFnZXIgZGF0YW1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoU2lnbmFsTWFuYWdlckRhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmV2ZW50U2lnbmFsUmVtb3ZlZC5kZXRhY2godGhpcy5fc2lnbmFsTWFuYWdlclNpZ25hbFJlbW92ZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNpZ25hbE1hbmFnZXJTaWduYWxSZW1vdmVkKHNlbmRlciwgc2VyaWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5yZW1vdmVTZXJpZUZyb21BbGxDaGFydHMoc2VyaWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBjaGFydCBtYW5hZ2VyIHdpZGdldCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaENoYXJ0TWFuYWdlcldpZGdldEV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJXaWRnZXQuZXZlbnREcm9wSGVscGVyLmRldGFjaCh0aGlzLl9jaGFydE1hbmFnZXJXaWRnZXRkcm9wSGVscGVySGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG4gICAgICogU3RhcnQgbG9hZGluZyB0cmFjZSBkYXRhIGZyb20gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9hZFRyYWNlRGF0YUZyb21UYXJnZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9PSB0cnVlIHx8IHRoaXMuX3dpZGdldElzQWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0LnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiTG9hZGluZyB0cmFjZSBkYXRhXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCAyNSwgZmFsc2UpKTtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQuc2V0QnVzeSh0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gaW52b2tlIGxvYWRpbmcgdHJhY2UgZGF0YVxyXG4gICAgICAgIHRoaXMuaW52b2tlTG9hZFRyYWNlRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW52b2tlTG9hZFRyYWNlRGF0YSgpIHtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBtZXRob2QgZm9yIGRpc3BhdGNoaW5nIHRoZSBjYWxsIHRvIGEgYm91bmQgdGFyZ2V0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmZvcm1hdGlvbnMgaWYgbG9hZGluZyBvZiB0cmFjZSBkYXRhIGZyb20gdGFyZ2V0IGZhaWxlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVycm9yRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRXJyb3JMb2FkaW5nVHJhY2VEYXRhKGVycm9yRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldC5zZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZSB0aGUgYXZhaWxhYmxlIGRhdGEgcG9pbnQgaW5mb3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxUcmFjZURhdGFQb2ludEluZm8+fSB0cmFjZURhdGFQb2ludEluZm9zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlQXZhaWxhYmxlRGF0YVBvaW50cyh0cmFjZURhdGFQb2ludEluZm9zOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+KXtcclxuICAgICAgICB0aGlzLl90cmFjZURhdGFQb2ludEluZm9zID0gdHJhY2VEYXRhUG9pbnRJbmZvcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBoYW5kbGVzIHRyYWNlIHN0YXRlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYWNlU3RhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvbGRUcmFjZVN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25UcmFjZVN0YXRlQ2hhbmdlZCh0cmFjZVN0YXRlOiBzdHJpbmcsIG9sZFRyYWNlU3RhdGU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCB3aGlsZVN0YXJ0dXAgPSBmYWxzZTtcclxuICAgICAgICBpZih0aGlzLl90cmFjZVN0YXRlID09IFwiXCIpe1xyXG4gICAgICAgICAgICB3aGlsZVN0YXJ0dXAgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90cmFjZVN0YXRlID0gdHJhY2VTdGF0ZTtcclxuICAgICAgICAvLyBMb2FkIGF2YWlsYWJsZSBkYXRhIGlmIHN0YXRlIHdhcyBjaGFuZ2VkIHRvIGRhdGFfYXZhaWxhYmxlIGFuZCBhbHNvIGF0IHN0YXJ0dXBcclxuICAgICAgICBpZiAodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkRhdGFfYXZhaWxhYmxlICYmIChvbGRUcmFjZVN0YXRlICE9IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUgfHwgd2hpbGVTdGFydHVwID09IHRydWUpKSB7IFxyXG4gICAgICAgICAgICAvLyBBdXRvIHVwbG9hZCBvZiB0cmFjZSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMubG9hZFRyYWNlRGF0YUZyb21UYXJnZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmZvcm1hdGlvbnModHJhY2VkYXRhKSBmcm9tIHRhcmdldCBhZnRlciBzdWNjZXNzZnVsIHRyYWNlIGRhdGEgdXBsb2FkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcmVzdWx0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25UcmFjZURhdGFMb2FkZWQocmVzdWx0KSB7XHJcbiAgICAgICAgdmFyIHRyYWNlRGF0YSA9IHJlc3VsdCBhcyBUcmFjZURhdGE7XHJcbiAgICAgICAgbGV0IGFkZFRyYWNlRGF0YVRvU2lnbmFsTWFuYWdlciA9IHRydWU7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZGF0YSBhbHJlYWR5IGluIHNpZ25hbG1hbmFnZXIgZGF0YW1vZGVsXHJcbiAgICAgICAgaWYgKHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzLmxlbmd0aCA+IDAgJiYgdHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbMF0hLnRyYWNlUG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNlcmllR3JvdXBJZCA9IHRyYWNlRGF0YS50cmlnZ2VyVGltZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbFtcImRpc3Bvc2VkXCJdICE9IHRydWUpey8vIEJ1Z2ZpeCB0byBhdm9pZCB1c2Ugb2Ygbm90IHVuYmluZGVkIGRhdGFtb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXRlc3RDYXRlZ29yeSA9IHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuZ2V0U2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFJlY2VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhdGVzdENhdGVnb3J5ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWVDb250YWluZXIgPSBsYXRlc3RDYXRlZ29yeS5nZXRTZXJpZUNvbnRhaW5lckJ5SWQoc2VyaWVHcm91cElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcmllQ29udGFpbmVyICE9IHVuZGVmaW5lZCkgeyAvLyBzaWduYWwgY29udGFpbmVyIGFscmVhZHkgZXhpc3RzOyBuZWVkZWQgdG8gYXZvaWQgZHVwbGljYXRlZCBzaWduYWwgY29udGFpbmVycyBpZiBldmVudCBjb21lcyBtdWx0aXBsZSB0aW1lc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkVHJhY2VEYXRhVG9TaWduYWxNYW5hZ2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzaWduYWxNYW5hZ2VyRGF0YU1vZGVsIG5vdCBhdmFpbGFibGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhZGRUcmFjZURhdGFUb1NpZ25hbE1hbmFnZXIgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAodHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHMubGVuZ3RoID4gMCAmJiB0cmFjZURhdGEudHJhY2VDaGFubmVsc1swXSEudHJhY2VQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUcmFjZURhdGFUb1NpZ25hbE1hbmFnZXIodHJhY2VEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9pc0xvYWRpbmdUcmFjZURhdGEgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQuc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBnaXZlbiB0cmFjZSBkYXRhIHRvIHRoZSBzaWduYWwgbWFuYWdlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFRyYWNlRGF0YVRvU2lnbmFsTWFuYWdlcih0cmFjZURhdGEpIHtcclxuICAgICAgICBsZXQgaWQgPSB0cmFjZURhdGEudHJpZ2dlclRpbWUudG9TdHJpbmcoKTtcclxuICAgICAgICB2YXIgbmV3U2VyaWVHcm91cCA9IG5ldyBTZXJpZUdyb3VwKERhdGVUaW1lSGVscGVyLmdldERhdGVUaW1lKHRyYWNlRGF0YS50cmlnZ2VyVGltZSksIGlkLCB0cmFjZURhdGEudHJpZ2dlclRpbWUpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzaWduYWxIYXNOdWxsVmFsdWVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0cmFjZURhdGEudHJhY2VDaGFubmVsc1tpXS50cmFjZVBvaW50cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHhWYWw6IG51bWJlciA9ICh0cmFjZURhdGEudHJhY2VDaGFubmVsc1tpXS50cmFjZVBvaW50c1tqXS50aW1lU3RhbXAgLSB0cmFjZURhdGEudHJpZ2dlclRpbWUpIC8gMTAwMDAwMDtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhVmFsdWUgPSB0cmFjZURhdGEudHJhY2VDaGFubmVsc1tpXS50cmFjZVBvaW50c1tqXS5kYXRhVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhVmFsdWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbnVsbCB2YWx1ZSBmb3VuZCA9PiB1c2VkIGZvciBOYU4gb3IgKy8tIGluZlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZSBlbXB0eSBwb2ludCBhcnJheSBmb3Igc2lnbmFsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsSGFzTnVsbFZhbHVlcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB5VmFsOiBudW1iZXIgPSBkYXRhVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKG5ldyBQb2ludCh4VmFsLCB5VmFsKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5ld1NpZ25hbCA9IG5ldyBTaWduYWwodHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbaV0ubmFtZSwgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3Nlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JJbmZvID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgICAgIGlmKHNpZ25hbEhhc051bGxWYWx1ZXMgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JJbmZvLnB1c2goXCJJbnZhbGlkIHNpZ25hbCBjb250YWlucyBOYU4gb3IgaW5mIHZhbHVlcyFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgc2V0dGluZ3MgPSBTZXJpZXNIZWxwZXIuY3JlYXRlU2VyaWVTZXR0aW5ncyhuZXdTaWduYWwsIG5ld1NpZ25hbC5uYW1lLCBDb2xvckhlbHBlci5nZXRDb2xvcigpLCB0aGlzLl9zZXJpZXNQcm92aWRlci5nZXRVbmlxdWVJZCgpLCBTZXJpZXNUeXBlLnRpbWVTZXJpZXMsIHVuZGVmaW5lZCwgZXJyb3JJbmZvKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdTZXJpZSA9IHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmNyZWF0ZVNlcmllKHNldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgIGlmKG5ld1NlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RyYWNlRGF0YVBvaW50SW5mb3MgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmFjZVBvaW50SW5mb3MgPSB0aGlzLl90cmFjZURhdGFQb2ludEluZm9zLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQuZnVsbG5hbWUgPT0gbmV3U2lnbmFsLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2VQb2ludEluZm9zLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXJpZS5uYW1lID0gdHJhY2VQb2ludEluZm9zWzBdLmNvbXBvbmVudE5hbWUgKyBcIjpcIiArIHRyYWNlUG9pbnRJbmZvc1swXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWUuZGVzY3JpcHRpb24gPSB0cmFjZVBvaW50SW5mb3NbMF0uZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWVHcm91cC5hZGRTZXJpZShuZXdTZXJpZSEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3JlYXRpb24gb2YgdGhlIHNlcmllIHdhcyBub3QgcG9zc2libGUhXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZXJpZXNQcm92aWRlciBub3QgYXZhaWxhYmxlIVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuYWRkVXBsb2FkZWRTZXJpZUdyb3VwKG5ld1NlcmllR3JvdXApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZVZpZXdXaWRnZXQgfTsiXX0=