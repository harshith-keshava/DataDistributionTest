define(["require", "exports", "./traceDataConversion/classes/ConvertHandler", "./traceDataConversion/enums/ConvertTypes", "../models/common/signal/signal", "./colorHelper", "./dateTimeHelper", "../models/common/point", "./traceDataConversion/classes/DeconvertHandler", "./traceDataConversion/exceptions/traceDataConversionError", "./traceDataConversion/classes/ytSignal", "./traceDataConversion/classes/xySignal", "./traceDataConversion/classes/fftSignal", "../core/types/sample", "../core/types/frequencyAmplitude", "../core/types/point", "../models/common/series/seriesType", "./exportSerieGroup", "../models/common/signal/serieGroup", "../models/signalManagerDataModel/signalManagerCalculation", "./seriesHelper", "../models/common/calculatorProvider/calculators/fftCalculator", "../models/common/calculatorProvider/calculators/xyCalculator"], function (require, exports, ConvertHandler_1, ConvertTypes_1, signal_1, colorHelper_1, dateTimeHelper_1, point_1, DeconvertHandler_1, traceDataConversionError_1, ytSignal_1, xySignal_1, fftSignal_1, sample_1, frequencyAmplitude_1, point_2, seriesType_1, exportSerieGroup_1, serieGroup_1, signalManagerCalculation_1, seriesHelper_1, fftCalculator_1, xyCalculator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportImportHelper = /** @class */ (function () {
        /**
         * Creates an instance of ExportImportHelper
         * @param {ISeriesProvider} seriesProvider
         * @memberof ExportImportHelper
         */
        function ExportImportHelper(seriesProvider) {
            this._seriesProvider = seriesProvider;
        }
        /**
         * converts the data of a serieGroup to a csv string
         *
         * @param {Array<ExportSerieGroup>} elements
         * @returns {string}
         * @memberof ExportImportHelper
         */
        ExportImportHelper.prototype.exportTraceData = function (elements) {
            var returnValue = undefined;
            try {
                var recordings = new Array();
                for (var i = 0; i < elements.length; i++) { // create a recording for each ExportSeriesGroup
                    try {
                        var recording = new Recording(elements[i], this._seriesProvider);
                        recordings.push(recording);
                    }
                    catch (e) {
                        console.error("Convert for " + elements[i].name + " not possible!");
                        console.error(e);
                    }
                }
                if (recordings.length > 0) { //convert recordings if there are any
                    var convertHandler = new ConvertHandler_1.ConvertHandler();
                    var partialFile = convertHandler.convert(recordings, ConvertTypes_1.ConvertTypes.CSV_AS_EN);
                    returnValue = partialFile.data;
                }
            }
            catch (e) {
                if (traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(e)) {
                    console.error("ErrorType: " + e.name + " ErrorMessage: " + e.message);
                }
                else {
                    console.error("Convert not possible! Signals can not be exported!");
                }
                alert("Trace data can not be exported!");
            }
            return returnValue;
        };
        /**
         * Converts a csv string to a list of serie groups
         *
         * @param {string} data
         * @param {string} filename
         * @param {(Array<TraceDataPointInfo>|undefined)} [traceDataPointInfos=undefined] can be used for adding alias and description of a datapoint
         * @returns {ISerieGroup[]}
         * @memberof ExportImportHelper
         */
        ExportImportHelper.prototype.importTraceData = function (data, filename, traceDataPointInfos) {
            if (traceDataPointInfos === void 0) { traceDataPointInfos = undefined; }
            // get recordings from data(csv)
            var recordings = ExportImportHelper.getRecordingsFromData(data, filename);
            if (recordings == undefined) {
                return [new serieGroup_1.SerieGroup("No data found!", '0', 0)];
            }
            // get serie groups from the recording datas
            return this.getSerieGroupsFromRecordings(recordings, traceDataPointInfos);
        };
        /**
         * Returns recording data from the given input data(csv)
         *
         * @private
         * @static
         * @param {string} data
         * @param {string} filename
         * @returns
         * @memberof ExportImportHelper
         */
        ExportImportHelper.getRecordingsFromData = function (data, filename) {
            var deconverter = new DeconvertHandler_1.DeconvertHandler();
            var recordings;
            try {
                recordings = deconverter.Deconvert({ data: data, fileending: this.getFileExtension(filename) });
            }
            catch (e) {
                if (traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(e)) {
                    console.error("ErrorType: " + e.name + " ErrorMessage: " + e.message);
                }
                else {
                    console.error("Deconvert not possible! Signals can not be imported!");
                }
                alert("Trace data can not be imported from file!");
                return undefined;
            }
            return recordings;
        };
        /**
         * Returns a series group array with the informations from the given recordings
         *
         * @private
         * @param {Array<IRecording>} recordings
         * @param {(Array<TraceDataPointInfo>|undefined)} [traceDataPointInfos=undefined]
         * @returns
         * @memberof ExportImportHelper
         */
        ExportImportHelper.prototype.getSerieGroupsFromRecordings = function (recordings, traceDataPointInfos) {
            var _this = this;
            if (traceDataPointInfos === void 0) { traceDataPointInfos = undefined; }
            var serieGroups = new Array();
            // Each recording will be displayed as a own signal group with its own start trigger time
            recordings.forEach(function (recording) {
                var timestamp = recording.startTriggerTime;
                var id = timestamp.toString();
                var serieGroup = new serieGroup_1.SerieGroup(dateTimeHelper_1.DateTimeHelper.getDateTime(timestamp), id, timestamp);
                var signals = recording.signals;
                var _loop_1 = function (i) {
                    if (signals[i] instanceof ytSignal_1.YTSignal) {
                        var newSerie = _this.createYTSerieFromYTSignal(serieGroup, signals[i]);
                        if (traceDataPointInfos != undefined) {
                            // Add description and alias name for datapoint if found
                            var tracePointInfos = traceDataPointInfos.filter(function (element) { return element.fullname == signals[i].name; });
                            if (tracePointInfos.length == 1) {
                                newSerie.name = tracePointInfos[0].componentName + ":" + tracePointInfos[0].name;
                                newSerie.description = traceDataPointInfos[0].description;
                            }
                        }
                        serieGroup.addSerie(newSerie);
                    }
                };
                for (var i = 0; i < signals.length; i++) {
                    _loop_1(i);
                }
                signals.forEach(function (signal) {
                    if (signal instanceof xySignal_1.XYSignal || signal instanceof fftSignal_1.FFTSignal) {
                        _this.createCalculatedSerieFromCalculatedSignal(serieGroup, signal);
                    }
                });
                serieGroups.push(serieGroup);
            });
            return serieGroups;
        };
        ExportImportHelper.prototype.createYTSerieFromYTSignal = function (serieGroup, signal) {
            var signalData = new Array();
            for (var i = 0; i < signal.items.length; i++) {
                signalData.push(new point_1.Point(signal.items[i].t, signal.items[i].y));
            }
            var newSignal = new signal_1.Signal(signal.name, signalData);
            var settings = seriesHelper_1.SeriesHelper.createSerieSettings(newSignal, newSignal.name, colorHelper_1.ColorHelper.getColor(), this._seriesProvider.getUniqueId(), seriesType_1.SeriesType.timeSeries, undefined);
            var newSerie = this._seriesProvider.createSerie(settings);
            return newSerie;
        };
        ExportImportHelper.prototype.createCalculatedSerieFromCalculatedSignal = function (serieGroup, signal) {
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation(signal.name, this._seriesProvider);
            serieGroup.addSerieContainer(calculation, -1);
            if (signal instanceof xySignal_1.XYSignal) {
                calculation.setCalculatorTypeById(xyCalculator_1.XYCalculator.id);
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdXSignal, signal.xSource.name);
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdYSignal, signal.ySource.name);
                calculation.setOutputSignalName(signal.name);
            }
            if (signal instanceof fftSignal_1.FFTSignal) {
                calculation.setCalculatorTypeById(fftCalculator_1.FftCalculator.id);
                calculation.setInputValueById(fftCalculator_1.FftCalculator.inputIdSignal, signal.source.name);
                calculation.setOutputSignalName(signal.name);
            }
        };
        ExportImportHelper.getFileExtension = function (filename) {
            return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        };
        return ExportImportHelper;
    }());
    exports.ExportImportHelper = ExportImportHelper;
    var Recording = /** @class */ (function () {
        function Recording(element, seriesProvider) {
            this.startTriggerTime = 0;
            this.signals = new Array();
            this._seriesProvider = seriesProvider;
            //Export a serieGroup
            if (element instanceof exportSerieGroup_1.ExportSerieGroup) {
                this.startTriggerTime = element.startTriggerTime;
                for (var i = 0; i < element.series.length; i++) {
                    if (element.series[i].type == seriesType_1.SeriesType.timeSeries) { //Export YTSeries
                        this.signals.push(this.createYTSignalFromSeries(element.series[i]));
                    }
                    if (element.series[i].type == seriesType_1.SeriesType.xySeries) { //Export XYSeries
                        this.signals.push(this.createXYSignalFromSeries(element.series[i]));
                    }
                    if (element.series[i].type == seriesType_1.SeriesType.fftSeries) { //Export FFTSeries
                        this.signals.push(this.createFFTSignalFromSeries(element.series[i]));
                    }
                }
            }
        }
        Recording.prototype.createYTSignalFromSeries = function (serie) {
            var samples = new Array();
            serie.rawPoints.forEach(function (point) {
                samples.push(new sample_1.Sample(point.x, point.y));
            });
            return new ytSignal_1.YTSignal(serie.name, samples);
        };
        Recording.prototype.createXYSignalFromSeries = function (serie) {
            var points = new Array();
            serie.rawPoints.forEach(function (point) {
                points.push(new point_2.Point(point.x, point.y));
            });
            var calculationDataInfo = serie.calculationDataInfo;
            var xSource = this.createYTSignalFromSeries(this._seriesProvider.get(calculationDataInfo.inputSeriesIds[0]));
            var ySource = this.createYTSignalFromSeries(this._seriesProvider.get(calculationDataInfo.inputSeriesIds[1]));
            return new xySignal_1.XYSignal(serie.name, points, xSource, ySource);
        };
        Recording.prototype.createFFTSignalFromSeries = function (serie) {
            var freqAmps = new Array();
            serie.rawPoints.forEach(function (point) {
                freqAmps.push(new frequencyAmplitude_1.FrequencyAmplitude(point.x, point.y));
            });
            var calculationDataInfo = serie.calculationDataInfo;
            var source = this.createYTSignalFromSeries(this._seriesProvider.get(calculationDataInfo.inputSeriesIds[0]));
            return new fftSignal_1.FFTSignal(serie.name, freqAmps, source);
        };
        return Recording;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0SW1wb3J0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vZXhwb3J0SW1wb3J0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWdDQTtRQVdJOzs7O1dBSUc7UUFDSCw0QkFBWSxjQUErQjtZQUN2QyxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztRQUMxQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsNENBQWUsR0FBZixVQUFnQixRQUFpQztZQUU3QyxJQUFJLFdBQVcsR0FBdUIsU0FBUyxDQUFDO1lBRWhELElBQUk7Z0JBQ0EsSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztnQkFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxnREFBZ0Q7b0JBRXZGLElBQUk7d0JBQ0EsSUFBSSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDakUsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDOUI7b0JBQUMsT0FBTSxDQUFDLEVBQUU7d0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUNwRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNwQjtpQkFDSjtnQkFDRCxJQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUscUNBQXFDO29CQUM3RCxJQUFJLGNBQWMsR0FBRyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztvQkFDMUMsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FB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QVEsQ0FBQyxJQUFJLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxtQkFBbUIsR0FBRyxLQUFLLENBQUMsbUJBQW1CLENBQUM7WUFDcEQsSUFBSSxNQUFNLEdBQWEsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLG1CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBYSxDQUFDLENBQUM7WUFFbkksT0FBTyxJQUFJLHFCQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FBQyxBQWhFRCxJQWdFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTaWduYWwgYXMgSUxpYlNpZ25hbCB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVJlY29yZGluZyB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vaW50ZXJmYWNlcy9yZWNvcmRpbmdJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllR3JvdXAgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllR3JvdXBJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IENvbnZlcnRIYW5kbGVyIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL0NvbnZlcnRIYW5kbGVyXCI7XHJcbmltcG9ydCB7IENvbnZlcnRUeXBlcyB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vZW51bXMvQ29udmVydFR5cGVzXCI7XHJcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zaWduYWxcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tIFwiLi9jb2xvckhlbHBlclwiO1xyXG5pbXBvcnQgeyBEYXRlVGltZUhlbHBlciB9IGZyb20gXCIuL2RhdGVUaW1lSGVscGVyXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vcG9pbnRcIjtcclxuaW1wb3J0IHsgRGVjb252ZXJ0SGFuZGxlciB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9EZWNvbnZlcnRIYW5kbGVyXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvciB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vZXhjZXB0aW9ucy90cmFjZURhdGFDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnRJbmZvIH0gZnJvbSBcIi4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFQb2ludEluZm9cIjtcclxuaW1wb3J0IHsgWVRTaWduYWwgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMveXRTaWduYWxcIjtcclxuaW1wb3J0IHsgWFlTaWduYWwgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMveHlTaWduYWxcIjtcclxuaW1wb3J0IHsgRkZUU2lnbmFsIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL2ZmdFNpZ25hbFwiO1xyXG5pbXBvcnQgeyBTYW1wbGUgfSBmcm9tIFwiLi4vY29yZS90eXBlcy9zYW1wbGVcIjtcclxuaW1wb3J0IHsgWFlTZXJpZXMgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvWFlTZXJpZXNcIjtcclxuaW1wb3J0IHsgRkZUU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vc2VyaWVzL0ZGVFNlcmllc1wiO1xyXG5pbXBvcnQgeyBZVFNlcmllcyB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9ZVFNlcmllc1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgRnJlcXVlbmN5QW1wbGl0dWRlIH0gZnJvbSBcIi4uL2NvcmUvdHlwZXMvZnJlcXVlbmN5QW1wbGl0dWRlXCI7XHJcbmltcG9ydCB7IFBvaW50IGFzIENvcmVQb2ludCB9IGZyb20gXCIuLi9jb3JlL3R5cGVzL3BvaW50XCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBFeHBvcnRTZXJpZUdyb3VwIH0gZnJvbSBcIi4vZXhwb3J0U2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vc2lnbmFsL3NlcmllR3JvdXBcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIH0gZnJvbSBcIi4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblwiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIgfSBmcm9tIFwiLi9zZXJpZXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgRmZ0Q2FsY3VsYXRvciB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9mZnRDYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IFhZQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy94eUNhbGN1bGF0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHBvcnRJbXBvcnRIZWxwZXIge1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBzZXJpZXMgcHJvdmlkZXIgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0lTZXJpZXNQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcjtcclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyKXtcclxuICAgICAgICB0aGlzLl9zZXJpZXNQcm92aWRlciA9IHNlcmllc1Byb3ZpZGVyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGNvbnZlcnRzIHRoZSBkYXRhIG9mIGEgc2VyaWVHcm91cCB0byBhIGNzdiBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEV4cG9ydFNlcmllR3JvdXA+fSBlbGVtZW50c1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgZXhwb3J0VHJhY2VEYXRhKGVsZW1lbnRzOiBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPik6IHN0cmluZyB8IHVuZGVmaW5lZHtcclxuXHJcbiAgICAgICAgbGV0IHJldHVyblZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmRpbmdzID0gbmV3IEFycmF5PElSZWNvcmRpbmc+KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspeyAvLyBjcmVhdGUgYSByZWNvcmRpbmcgZm9yIGVhY2ggRXhwb3J0U2VyaWVzR3JvdXBcclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmRpbmcgPSBuZXcgUmVjb3JkaW5nKGVsZW1lbnRzW2ldLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkaW5ncy5wdXNoKHJlY29yZGluZyk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29udmVydCBmb3IgXCIgKyBlbGVtZW50c1tpXS5uYW1lICsgXCIgbm90IHBvc3NpYmxlIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlY29yZGluZ3MubGVuZ3RoID4gMCkgeyAvL2NvbnZlcnQgcmVjb3JkaW5ncyBpZiB0aGVyZSBhcmUgYW55XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udmVydEhhbmRsZXIgPSBuZXcgQ29udmVydEhhbmRsZXIoKTtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJ0aWFsRmlsZSA9IGNvbnZlcnRIYW5kbGVyLmNvbnZlcnQocmVjb3JkaW5ncywgQ29udmVydFR5cGVzLkNTVl9BU19FTik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHBhcnRpYWxGaWxlLmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGlmKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5pc1RyYWNlRGF0YUNvbnZlcnNpb25FcnJvcihlKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yVHlwZTogXCIrIGUubmFtZSArXCIgRXJyb3JNZXNzYWdlOiBcIisgZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb252ZXJ0IG5vdCBwb3NzaWJsZSEgU2lnbmFscyBjYW4gbm90IGJlIGV4cG9ydGVkIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbGVydChcIlRyYWNlIGRhdGEgY2FuIG5vdCBiZSBleHBvcnRlZCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgIH1cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGEgY3N2IHN0cmluZyB0byBhIGxpc3Qgb2Ygc2VyaWUgZ3JvdXBzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlbmFtZVxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPnx1bmRlZmluZWQpfSBbdHJhY2VEYXRhUG9pbnRJbmZvcz11bmRlZmluZWRdIGNhbiBiZSB1c2VkIGZvciBhZGRpbmcgYWxpYXMgYW5kIGRlc2NyaXB0aW9uIG9mIGEgZGF0YXBvaW50XHJcbiAgICAgKiBAcmV0dXJucyB7SVNlcmllR3JvdXBbXX1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgaW1wb3J0VHJhY2VEYXRhKGRhdGE6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZywgdHJhY2VEYXRhUG9pbnRJbmZvczogQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPnx1bmRlZmluZWQgPSB1bmRlZmluZWQpOiBJU2VyaWVHcm91cFtde1xyXG4gICAgICAgIC8vIGdldCByZWNvcmRpbmdzIGZyb20gZGF0YShjc3YpXHJcbiAgICAgICAgbGV0IHJlY29yZGluZ3M9IEV4cG9ydEltcG9ydEhlbHBlci5nZXRSZWNvcmRpbmdzRnJvbURhdGEoZGF0YSwgZmlsZW5hbWUpO1xyXG4gICAgICAgIGlmKHJlY29yZGluZ3MgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtuZXcgU2VyaWVHcm91cChcIk5vIGRhdGEgZm91bmQhXCIsICcwJywgMCldIGFzIElTZXJpZUdyb3VwW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCBzZXJpZSBncm91cHMgZnJvbSB0aGUgcmVjb3JkaW5nIGRhdGFzXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VyaWVHcm91cHNGcm9tUmVjb3JkaW5ncyhyZWNvcmRpbmdzLCB0cmFjZURhdGFQb2ludEluZm9zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgcmVjb3JkaW5nIGRhdGEgZnJvbSB0aGUgZ2l2ZW4gaW5wdXQgZGF0YShjc3YpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SW1wb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFJlY29yZGluZ3NGcm9tRGF0YShkYXRhOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBkZWNvbnZlcnRlciA9IG5ldyBEZWNvbnZlcnRIYW5kbGVyKCk7XHJcbiAgICAgICAgbGV0IHJlY29yZGluZ3M6IElSZWNvcmRpbmdbXTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHJlY29yZGluZ3MgPSBkZWNvbnZlcnRlci5EZWNvbnZlcnQoe2RhdGE6ZGF0YSwgZmlsZWVuZGluZzogdGhpcy5nZXRGaWxlRXh0ZW5zaW9uKGZpbGVuYW1lKX0pO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaWYoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmlzVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yKGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3JUeXBlOiBcIisgZS5uYW1lICtcIiBFcnJvck1lc3NhZ2U6IFwiKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRlY29udmVydCBub3QgcG9zc2libGUhIFNpZ25hbHMgY2FuIG5vdCBiZSBpbXBvcnRlZCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWxlcnQoXCJUcmFjZSBkYXRhIGNhbiBub3QgYmUgaW1wb3J0ZWQgZnJvbSBmaWxlIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc2VyaWVzIGdyb3VwIGFycmF5IHdpdGggdGhlIGluZm9ybWF0aW9ucyBmcm9tIHRoZSBnaXZlbiByZWNvcmRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVJlY29yZGluZz59IHJlY29yZGluZ3NcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz58dW5kZWZpbmVkKX0gW3RyYWNlRGF0YVBvaW50SW5mb3M9dW5kZWZpbmVkXVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTZXJpZUdyb3Vwc0Zyb21SZWNvcmRpbmdzKHJlY29yZGluZ3M6IEFycmF5PElSZWNvcmRpbmc+LCB0cmFjZURhdGFQb2ludEluZm9zOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXBzID0gbmV3IEFycmF5PElTZXJpZUdyb3VwPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEVhY2ggcmVjb3JkaW5nIHdpbGwgYmUgZGlzcGxheWVkIGFzIGEgb3duIHNpZ25hbCBncm91cCB3aXRoIGl0cyBvd24gc3RhcnQgdHJpZ2dlciB0aW1lXHJcbiAgICAgICAgcmVjb3JkaW5ncy5mb3JFYWNoKHJlY29yZGluZyA9PntcclxuICAgICAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHJlY29yZGluZy5zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aW1lc3RhbXAudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgbGV0IHNlcmllR3JvdXAgPSBuZXcgU2VyaWVHcm91cChEYXRlVGltZUhlbHBlci5nZXREYXRlVGltZSh0aW1lc3RhbXApLCBpZCwgdGltZXN0YW1wKTtcclxuICAgICAgICAgICAgbGV0IHNpZ25hbHMgPSByZWNvcmRpbmcuc2lnbmFscztcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHNpZ25hbHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoc2lnbmFsc1tpXSBpbnN0YW5jZW9mIFlUU2lnbmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1NlcmllOiBCYXNlU2VyaWVzID0gdGhpcy5jcmVhdGVZVFNlcmllRnJvbVlUU2lnbmFsKHNlcmllR3JvdXAsIHNpZ25hbHNbaV0gYXMgWVRTaWduYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRyYWNlRGF0YVBvaW50SW5mb3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGRlc2NyaXB0aW9uIGFuZCBhbGlhcyBuYW1lIGZvciBkYXRhcG9pbnQgaWYgZm91bmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyYWNlUG9pbnRJbmZvcyA9IHRyYWNlRGF0YVBvaW50SW5mb3MuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudC5mdWxsbmFtZSA9PSBzaWduYWxzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0cmFjZVBvaW50SW5mb3MubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWUubmFtZSA9IHRyYWNlUG9pbnRJbmZvc1swXS5jb21wb25lbnROYW1lICsgXCI6XCIgKyB0cmFjZVBvaW50SW5mb3NbMF0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NlcmllLmRlc2NyaXB0aW9uID0gdHJhY2VEYXRhUG9pbnRJbmZvc1swXS5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZXJpZUdyb3VwLmFkZFNlcmllKG5ld1NlcmllKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaWduYWxzLmZvckVhY2goc2lnbmFsID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHNpZ25hbCBpbnN0YW5jZW9mIFhZU2lnbmFsIHx8IHNpZ25hbCBpbnN0YW5jZW9mIEZGVFNpZ25hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQ2FsY3VsYXRlZFNlcmllRnJvbUNhbGN1bGF0ZWRTaWduYWwoc2VyaWVHcm91cCwgc2lnbmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgc2VyaWVHcm91cHMucHVzaChzZXJpZUdyb3VwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VyaWVHcm91cHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVZVFNlcmllRnJvbVlUU2lnbmFsKHNlcmllR3JvdXA6IFNlcmllR3JvdXAsIHNpZ25hbDogWVRTaWduYWwpOiBCYXNlU2VyaWVzIHtcclxuXHJcbiAgICAgICAgbGV0IHNpZ25hbERhdGEgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNpZ25hbC5pdGVtcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHNpZ25hbERhdGEucHVzaChuZXcgUG9pbnQoc2lnbmFsLml0ZW1zW2ldLnQsIHNpZ25hbC5pdGVtc1tpXS55KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXdTaWduYWwgPSBuZXcgU2lnbmFsKHNpZ25hbC5uYW1lLCBzaWduYWxEYXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gU2VyaWVzSGVscGVyLmNyZWF0ZVNlcmllU2V0dGluZ3MobmV3U2lnbmFsLCBuZXdTaWduYWwubmFtZSwgQ29sb3JIZWxwZXIuZ2V0Q29sb3IoKSwgdGhpcy5fc2VyaWVzUHJvdmlkZXIuZ2V0VW5pcXVlSWQoKSwgU2VyaWVzVHlwZS50aW1lU2VyaWVzLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIGxldCBuZXdTZXJpZSA9IHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmNyZWF0ZVNlcmllKHNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1NlcmllITtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlICBjcmVhdGVDYWxjdWxhdGVkU2VyaWVGcm9tQ2FsY3VsYXRlZFNpZ25hbChzZXJpZUdyb3VwOiBTZXJpZUdyb3VwLCBzaWduYWw6IElMaWJTaWduYWwpOiB2b2lke1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKHNpZ25hbC5uYW1lLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcbiAgICAgICAgc2VyaWVHcm91cC5hZGRTZXJpZUNvbnRhaW5lcihjYWxjdWxhdGlvbiwgLTEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHNpZ25hbCBpbnN0YW5jZW9mICBYWVNpZ25hbCkge1xyXG5cclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0Q2FsY3VsYXRvclR5cGVCeUlkKFhZQ2FsY3VsYXRvci5pZCk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldElucHV0VmFsdWVCeUlkKFhZQ2FsY3VsYXRvci5pbnB1dElkWFNpZ25hbCwgc2lnbmFsLnhTb3VyY2UubmFtZSk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldElucHV0VmFsdWVCeUlkKFhZQ2FsY3VsYXRvci5pbnB1dElkWVNpZ25hbCwgc2lnbmFsLnlTb3VyY2UubmFtZSk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldE91dHB1dFNpZ25hbE5hbWUoc2lnbmFsLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzaWduYWwgaW5zdGFuY2VvZiAgRkZUU2lnbmFsKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZUJ5SWQoRmZ0Q2FsY3VsYXRvci5pZCk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldElucHV0VmFsdWVCeUlkKEZmdENhbGN1bGF0b3IuaW5wdXRJZFNpZ25hbCwgc2lnbmFsLnNvdXJjZS5uYW1lKTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0T3V0cHV0U2lnbmFsTmFtZShzaWduYWwubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldEZpbGVFeHRlbnNpb24oZmlsZW5hbWUpOnN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGZpbGVuYW1lLnNsaWNlKChmaWxlbmFtZS5sYXN0SW5kZXhPZihcIi5cIikgLSAxID4+PiAwKSArIDIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBSZWNvcmRpbmcgaW1wbGVtZW50cyBJUmVjb3JkaW5ne1xyXG4gICAgc3RhcnRUcmlnZ2VyVGltZTogbnVtYmVyID0gMDtcclxuICAgIHNpZ25hbHM6IElMaWJTaWduYWxbXTtcclxuICAgIHByaXZhdGUgX3Nlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXI7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEV4cG9ydFNlcmllR3JvdXAsIHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIpe1xyXG4gICAgICAgIHRoaXMuc2lnbmFscyA9IG5ldyBBcnJheTxJTGliU2lnbmFsPigpO1xyXG4gICAgICAgIHRoaXMuX3Nlcmllc1Byb3ZpZGVyID0gc2VyaWVzUHJvdmlkZXI7XHJcblxyXG4gICAgICAgIC8vRXhwb3J0IGEgc2VyaWVHcm91cFxyXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRXhwb3J0U2VyaWVHcm91cCkgeyAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRyaWdnZXJUaW1lID0gZWxlbWVudC5zdGFydFRyaWdnZXJUaW1lOyAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZWxlbWVudC5zZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5zZXJpZXNbaV0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpeyAvL0V4cG9ydCBZVFNlcmllc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbmFscy5wdXNoKHRoaXMuY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKGVsZW1lbnQuc2VyaWVzW2ldIGFzIFlUU2VyaWVzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlcmllc1tpXS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpeyAvL0V4cG9ydCBYWVNlcmllc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbmFscy5wdXNoKHRoaXMuY3JlYXRlWFlTaWduYWxGcm9tU2VyaWVzKGVsZW1lbnQuc2VyaWVzW2ldIGFzIFhZU2VyaWVzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlcmllc1tpXS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKXsgLy9FeHBvcnQgRkZUU2VyaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWduYWxzLnB1c2godGhpcy5jcmVhdGVGRlRTaWduYWxGcm9tU2VyaWVzKGVsZW1lbnQuc2VyaWVzW2ldIGFzIEZGVFNlcmllcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKHNlcmllOiBZVFNlcmllcyk6IFlUU2lnbmFsIHtcclxuXHJcbiAgICAgICAgbGV0IHNhbXBsZXM6IEFycmF5PFNhbXBsZT4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgc2VyaWUucmF3UG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBzYW1wbGVzLnB1c2gobmV3IFNhbXBsZShwb2ludC54LCBwb2ludC55KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBZVFNpZ25hbChzZXJpZS5uYW1lLCBzYW1wbGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVhZU2lnbmFsRnJvbVNlcmllcyhzZXJpZTogWFlTZXJpZXMpOiBYWVNpZ25hbCB7XHJcblxyXG4gICAgICAgIGxldCBwb2ludHM6IEFycmF5PENvcmVQb2ludD4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgc2VyaWUucmF3UG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgQ29yZVBvaW50KHBvaW50LngsIHBvaW50LnkpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm8gPSBzZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvO1xyXG4gICAgICAgIGxldCB4U291cmNlOiBZVFNpZ25hbCA9IHRoaXMuY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldChjYWxjdWxhdGlvbkRhdGFJbmZvIS5pbnB1dFNlcmllc0lkc1swXSkgYXMgWVRTZXJpZXMpO1xyXG4gICAgICAgIGxldCB5U291cmNlOiBZVFNpZ25hbCA9IHRoaXMuY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldChjYWxjdWxhdGlvbkRhdGFJbmZvIS5pbnB1dFNlcmllc0lkc1sxXSkgYXMgWVRTZXJpZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFhZU2lnbmFsKHNlcmllLm5hbWUsIHBvaW50cywgeFNvdXJjZSwgeVNvdXJjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVGRlRTaWduYWxGcm9tU2VyaWVzKHNlcmllOiBGRlRTZXJpZXMpOiBGRlRTaWduYWwge1xyXG5cclxuICAgICAgICBsZXQgZnJlcUFtcHM6IEFycmF5PEZyZXF1ZW5jeUFtcGxpdHVkZT4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgc2VyaWUucmF3UG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBmcmVxQW1wcy5wdXNoKG5ldyBGcmVxdWVuY3lBbXBsaXR1ZGUocG9pbnQueCwgcG9pbnQueSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mbyA9IHNlcmllLmNhbGN1bGF0aW9uRGF0YUluZm87XHJcbiAgICAgICAgbGV0IHNvdXJjZTogWVRTaWduYWwgPSB0aGlzLmNyZWF0ZVlUU2lnbmFsRnJvbVNlcmllcyh0aGlzLl9zZXJpZXNQcm92aWRlci5nZXQoY2FsY3VsYXRpb25EYXRhSW5mbyEuaW5wdXRTZXJpZXNJZHNbMF0pIGFzIFlUU2VyaWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBGRlRTaWduYWwoc2VyaWUubmFtZSwgZnJlcUFtcHMsIHNvdXJjZSk7XHJcbiAgICB9XHJcbn1cclxuIl19