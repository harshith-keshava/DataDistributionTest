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
define(["require", "exports", "../../../framework/events", "../signal/eventSignalDataChangedArgs", "../calculatorProvider/calculationDataPoints", "../../../common/dateTimeHelper", "../../../common/seriesHelper", "../point", "../calculatorProvider/calculationDataInfo", "./seriesType", "../signal/signal", "./settingIds", "./eventSerieDataChangedArgs", "../../signalManagerDataModel/signalCategory"], function (require, exports, events_1, eventSignalDataChangedArgs_1, calculationDataPoints_1, dateTimeHelper_1, seriesHelper_1, point_1, calculationDataInfo_1, seriesType_1, signal_1, settingIds_1, eventSerieDataChangedArgs_1, signalCategory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSeriesDataChanged = /** @class */ (function (_super) {
        __extends(EventSeriesDataChanged, _super);
        function EventSeriesDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSeriesDataChanged;
    }(events_1.TypedEvent));
    ;
    var BaseSeries = /** @class */ (function () {
        /**
         * Creates an instance of BaseSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {CursorType} cursorType
         * @param {ISeriesProvider} serieProvider
         * @param {string} [uniqueId=""]
         * @memberof BaseSeries
         */
        function BaseSeries(signal, name, color, serieProvider, uniqueId, errorInfo) {
            var _this = this;
            this.type = seriesType_1.SeriesType.timeSeries;
            this.eventDataChanged = new EventSeriesDataChanged();
            this._onSignalDataChanged = function (sender, eventArgs) { _this.onSignalDataChanged(sender, eventArgs); };
            this._rawPoints = [];
            this._isCalculated = false;
            this._startTriggerTime = 0;
            this.calculationDataInfo = undefined;
            this.isAutoUpdated = false;
            this._data = [];
            // holds the timestamps
            this._timestamps = [];
            this._errorInfo = new Array();
            this._seriesProvider = serieProvider;
            this._name = name;
            this._color = color;
            this.signal = signal;
            this.signal.eventDataChanged.attach(this._onSignalDataChanged);
            this._description = "";
            this.errorInfo = errorInfo;
            // Set given unique id
            this._id = uniqueId;
            this.persistID = serieProvider.getSeriesPersistingId(this._id);
        }
        Object.defineProperty(BaseSeries.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "errorInfo", {
            get: function () {
                return this._errorInfo;
            },
            set: function (value) {
                this._errorInfo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "originalName", {
            get: function () {
                return this.signal.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "description", {
            get: function () {
                return this._description;
            },
            set: function (value) {
                this._description = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Create a signal with the given persisted signalData
         *
         * @protected
         * @param {*} signalData
         * @returns {ISignal}
         * @memberof BaseSeries
         */
        BaseSeries.createSignal = function (signalData) {
            var signal = new signal_1.Signal("", new Array());
            if (signalData != undefined) {
                signal.setSettings(signalData);
            }
            return signal;
        };
        /**
         * Returns the icon representation of this series (serie type, auto upload, series color, ... is included)
         *
         * @returns {string}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getIcon = function () {
            return this._seriesProvider.getIcon(this);
        };
        /**
         * Returns a specific icon for this series (e.g. only a single overlay)
         *
         * @param {string} svgName (e.g. "autoUpdatedOverlay" or "exclamationOverlay")
         * @returns {string}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getSpecificIcon = function (svgName) {
            return this._seriesProvider.getSpecificIcon(svgName);
        };
        /**
         * Retruns an error text for this series if some error infos are available
         *
         * @returns {string}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getErrorText = function () {
            var formatedText = "";
            if (this.errorInfo != undefined) {
                if (this.errorInfo.length > 0) {
                    formatedText = "";
                    this.errorInfo.forEach(function (error) {
                        formatedText += error + "\r\n";
                    });
                }
            }
            return formatedText;
        };
        /**
         * Returns the persisting data of the BaseSeries
         *
         * @returns {ISettings}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getSettings = function () {
            return seriesHelper_1.SeriesHelper.createSerieSettings(this.signal, this.name, this.color, this.id, this.type, this.calculationDataInfo, this.errorInfo);
        };
        /**
         * Disposes the BaseSeries
         *
         * @memberof BaseSeries
         */
        BaseSeries.prototype.dispose = function () {
            this.signal.eventDataChanged.detach(this._onSignalDataChanged);
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateTimestamps = function () {
        };
        Object.defineProperty(BaseSeries.prototype, "iconDefinition", {
            /**
             * Get serie icon definition
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                var iconDefinition = "<div class='e-doc' style='position: relative;height:16px;width:30px;margin:auto;float:left;margin-left:6px;margin-top:2px'>";
                // add series icon (with overlays)
                iconDefinition += this.getIcon();
                iconDefinition += "</div>";
                return iconDefinition;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the data of an existing serie
         *
         * @param {Array<IPoint>} rawPoints
         * @memberof baseSeries
         */
        BaseSeries.prototype.updatePoints = function (rawPoints) {
            this.rawPoints = rawPoints;
            this.getRange();
            this.simplifySignal(rawPoints);
            this.signal.rawPoints = rawPoints;
        };
        BaseSeries.prototype.simplifySignal = function (rawPoints) { };
        ;
        /**
         * Updates input data (DataPoints list) for calculated series
         *
         * @param {Array<CalculationDataPoints>} inputData
         * @memberof baseSeries
         */
        BaseSeries.prototype.updateInputData = function (inputData) {
            if (this.calculationDataInfo != undefined) {
                for (var i = 0; i < inputData.length; i++) {
                    if (inputData[i] instanceof calculationDataPoints_1.CalculationDataPoints) {
                        this.calculationDataInfo.inputData[i] = inputData[i];
                    }
                }
            }
        };
        /**
         * Updates input data values (input string; e.g. signalname, 5, ...) for calculated series
         *
         * @private
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateInputDataValues = function (inputChilds) {
            if (this.calculationDataInfo != undefined) {
                var values = new Array();
                var inputDataIds = new Array();
                for (var i = 0; i < inputChilds.length; i++) {
                    values.push(inputChilds[i].getRawValue());
                    inputDataIds.push(inputChilds[i].calculationData.id);
                }
                this.calculationDataInfo.inputDataIds = inputDataIds;
                this.calculationDataInfo.inputDataValues = values;
            }
        };
        /**
         * Updates the input series for calculated series
         *
         * @private
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateInputSeriesIds = function (inputChilds) {
            if (this.calculationDataInfo != undefined) {
                this.calculationDataInfo.inputSeriesIds = [];
                for (var i = 0; i < inputChilds.length; i++) {
                    var serie = inputChilds[i].serie;
                    if (serie != undefined) {
                        this.calculationDataInfo.inputSeriesIds.push(serie.id);
                    }
                }
            }
        };
        /**
         * Updates the calculation informations for this series
         *
         * @param {Array<TCalculationData>} inputData
         * @param {string} type
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateCalculationDataInfo = function (inputData, type, inputChilds, seriesProvider) {
            if (this.calculationDataInfo == undefined) {
                this.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo(seriesProvider.getUniqueCalculationId());
            }
            this.calculationDataInfo.type = type;
            this.updateInputData(inputData);
            this.updateInputDataValues(inputChilds);
            this.updateInputSeriesIds(inputChilds);
        };
        /**
         * Gets the range limits from a serie
         *
         * @protected
         * @memberof baseSeries
         */
        BaseSeries.prototype.getRange = function () {
            this.maxX = this.getMaxX();
            this.minX = this.getMinX();
            this.maxY = this.getMaxY();
            this.minY = this.getMinY();
        };
        /**
         *
         *
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMaxX = function () {
            return 0;
        };
        /**
         *
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMinX = function () {
            return 0;
        };
        /**
         * Get max Y value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMaxY = function () {
            var maxY;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (maxY == undefined || this.rawPoints[i].y > maxY) {
                        maxY = this.rawPoints[i].y;
                    }
                }
            }
            return maxY;
        };
        /**
         * Get min Y value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMinY = function () {
            var minY;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (minY == undefined || this.rawPoints[i].y < minY) {
                        minY = this.rawPoints[i].y;
                    }
                }
            }
            return minY;
        };
        Object.defineProperty(BaseSeries.prototype, "rawPoints", {
            /**
             * Get rawPoints
             *
             * @type {Array<IPoint>}
             * @memberof baseSeries
             */
            get: function () {
                return this._rawPoints;
            },
            /**
             * Set rawPoints
             *
             * @memberof baseSeries
             */
            set: function (points) {
                this._rawPoints = points;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "timestamps", {
            /**
             * gets the timestamps available in the series
             *
             * @readonly
             * @type {Array<number>}
             * @memberof baseSeries
             */
            get: function () {
                return this._timestamps;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * determines the index of the timestamp within the available timestamps
         *
         * @param {number} timestamp
         * @param {number[]} timestamps
         * @param {BinSearchMode} LOWER
         * @returns
         * @memberof baseSeries
         */
        BaseSeries.prototype.getTimestampIndex = function (timestamp, binSearchMode) {
            if (binSearchMode === void 0) { binSearchMode = seriesHelper_1.BinSearchMode.NEAREST; }
            // get the available timestamps
            var timestamps = this.timestamps;
            // get the index of the timestamp 
            var timestampIndex = seriesHelper_1.SeriesHelper.indexOfNearest(timestamp, timestamps, binSearchMode);
            return timestampIndex >= 0 && timestampIndex < timestamps.length ? timestampIndex : -1;
        };
        /**
         * Gets the series point nearest to the timestamp
         *
         * @returns {IPoint}
         * @memberof baseSeries
         */
        BaseSeries.prototype.pointFromTimestamp = function (timestamp) {
            var nearestTimestampIndex = this.getTimestampIndex(timestamp);
            return nearestTimestampIndex >= 0 ? this.rawPoints[nearestTimestampIndex] : new point_1.Point(0, 0);
        };
        /**
         * Gets the series point previous to the timestamp
         *
         * @returns {IPoint}
         * @memberof baseSeries
         */
        BaseSeries.prototype.previousPointFromTimestamp = function (timestamp) {
            // get the lowerbound timestamp index ( if the timestamp is not matching exactly)
            var nearestTimestampIndex = this.getTimestampIndex(timestamp, seriesHelper_1.BinSearchMode.LOWERBOUND);
            return nearestTimestampIndex >= 0 ? this.rawPoints[nearestTimestampIndex] : new point_1.Point(0, 0);
        };
        /**
         * Checks if the timestamp is within the available range
         *
         * @param {number} timestamp
         * @returns {boolean}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.timestampIsInRange = function (timestamp) {
            return seriesHelper_1.SeriesHelper.isInRange(timestamp, this.timestamps);
        };
        Object.defineProperty(BaseSeries.prototype, "isCalculated", {
            /**
             * Get if serie is calculated
             *
             * @type {boolean}
             * @memberof baseSeries
             */
            get: function () {
                return this._isCalculated;
            },
            /**
             * Set if serie is calculated
             *
             * @memberof baseSeries
             */
            set: function (value) {
                this._isCalculated = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "name", {
            /**
             * Get serie name
             *
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._name;
            },
            /**
             * Set serie name
             *
             * @memberof baseSeries
             */
            set: function (value) {
                var oldName = this._name;
                this._name = value;
                this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.rename, this._name, oldName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "id", {
            /**
             * Get unique serie id
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "color", {
            /**
             * Get serie color
             *
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._color;
            },
            /**
             * Set serie color
             *
             * @memberof baseSeries
             */
            set: function (value) {
                var oldColor = this._color;
                this._color = value;
                this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.colorChanged, this._color, oldColor);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "rawPointsValid", {
            /**
             * Get if rawPoints are valid
             *
             * @readonly
             * @type {boolean}
             * @memberof baseSeries
             */
            get: function () {
                return this.signal.rawPointsValid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "startTriggerTime", {
            /**
             * Get startTriggerTime
             *
             * @type {number}
             * @memberof baseSeries
             */
            get: function () {
                return this._startTriggerTime;
            },
            /**
             * Set startTriggerTime
             *
             * @memberof baseSeries
             */
            set: function (value) {
                if (value != this._startTriggerTime) {
                    var oldStartTriggerTime = this._startTriggerTime;
                    this._startTriggerTime = value;
                    this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged, oldStartTriggerTime);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "additionalInfo", {
            /**
             * Get start trigger formated time (shown next to serie name)
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                if (this._startTriggerTime != 0) {
                    return dateTimeHelper_1.DateTimeHelper.getDateTime(this._startTriggerTime);
                }
                return ""; // No start trigger info available
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "parent", {
            /**
             * Get parent of serie
             *
             * @type {(ISerieGroup | undefined)}
             * @memberof baseSeries
             */
            get: function () {
                return this._parent;
            },
            /**
             * Set parent of serie
             *
             * @memberof baseSeries
             */
            set: function (value) {
                this._parent = value;
                if (this._parent != undefined) {
                    if (this._parent.parent instanceof signalCategory_1.SignalCategory) {
                        if (this._parent.parent.id == signalCategory_1.SignalCategory.CategoryIdRecent) {
                            // Set serie to autoUpdated if in recent category
                            this.isAutoUpdated = true;
                        }
                    }
                    this.startTriggerTime = this._parent.startTriggerTime;
                }
                else {
                    this.startTriggerTime = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Resets the name to the original name from the signal
         *
         * @memberof baseSeries
         */
        BaseSeries.prototype.resetName = function () {
            this.name = this.originalName;
        };
        /**
         * Clones this serie
         *
         * @returns
         * @memberof baseSeries
         */
        BaseSeries.prototype.clone = function () {
            var settings = this.getSettings();
            settings.setValue(settingIds_1.SettingIds.SeriesId, this._seriesProvider.getUniqueId());
            return this._seriesProvider.createSerie(settings);
        };
        /**
         * Handles the serie data changed event (e.g. serie color, serie datapoints, rename changed)
         *
         * @private
         * @param {*} sender
         * @param {*} eventArgs
         * @memberof baseSeries
         */
        BaseSeries.prototype.onSignalDataChanged = function (sender, eventArgs) {
            switch (eventArgs.action) {
                case eventSignalDataChangedArgs_1.SignalAction.dataPointsChanged: {
                    this.updateTimestamps();
                    this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged, eventArgs.data);
                    break;
                }
                case eventSignalDataChangedArgs_1.SignalAction.startTriggerTimeChanged: {
                    this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged, eventArgs.data);
                    break;
                }
            }
        };
        BaseSeries.prototype.onDataChanged = function (action, data, oldData) {
            if (oldData === void 0) { oldData = undefined; }
            var eventArgs = new eventSerieDataChangedArgs_1.EventSerieDataChangedArgs(action, data, oldData);
            this.eventDataChanged.raise(this, eventArgs);
            if (action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                this.onSerieDataChanged(data);
            }
        };
        /**
         * Called whenever the seris data has changed
         *
         * @private
         * @param {IPoint[]} data
         * @memberof BaseSeries
         */
        BaseSeries.prototype.onSerieDataChanged = function (data) {
            //TODO: eventually call simplification ????
        };
        return BaseSeries;
    }());
    exports.BaseSeries = BaseSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVNlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBd0JBO1FBQXFDLDBDQUFrRDtRQUF2Rjs7UUFBeUYsQ0FBQztRQUFELDZCQUFDO0lBQUQsQ0FBQyxBQUExRixDQUFxQyxtQkFBVSxHQUEyQztJQUFBLENBQUM7SUFFM0Y7UUE2REk7Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQXNCLE1BQWUsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLGFBQThCLEVBQUUsUUFBZ0IsRUFBRSxTQUF3QjtZQUE5SSxpQkFZQztZQWpGRCxTQUFJLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUM7WUFDN0IscUJBQWdCLEdBQTJCLElBQUksc0JBQXNCLEVBQUUsQ0FBQztZQUloRSx5QkFBb0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQTtZQUcxRixlQUFVLEdBQWtCLEVBQUUsQ0FBQztZQU1qQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztZQUUvQixzQkFBaUIsR0FBVyxDQUFDLENBQUM7WUFFdEMsd0JBQW1CLEdBQWtDLFNBQVMsQ0FBQztZQUUvRCxrQkFBYSxHQUFZLEtBQUssQ0FBQztZQUNyQixVQUFLLEdBQWtCLEVBQUUsQ0FBQztZQWNwQyx1QkFBdUI7WUFDYixnQkFBVyxHQUFZLEVBQUUsQ0FBQztZQUU1QixlQUFVLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQWdDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUM7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFD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QztvQkFDbEUsTUFBTTtpQkFDVDtnQkFDRCxLQUFLLHlDQUFZLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtvQkFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1Q0FBVyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDeEUsTUFBTTtpQkFDVDthQUNKO1FBQ0wsQ0FBQztRQUVPLGtDQUFhLEdBQXJCLFVBQXNCLE1BQW1CLEVBQUUsSUFBUyxFQUFFLE9BQXdCO1lBQXhCLHdCQUFBLEVBQUEsbUJBQXdCO1lBQzFFLElBQUksU0FBUyxHQUFHLElBQUkscURBQXlCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM3QyxJQUFHLE1BQU0sSUFBSSx1Q0FBVyxDQUFDLGlCQUFpQixFQUFDO2dCQUN2QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakM7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ08sdUNBQWtCLEdBQTVCLFVBQThCLElBQWM7WUFDeEMsMkNBQTJDO1FBQy9DLENBQUM7UUFDTCxpQkFBQztJQUFELENBQUMsQUFsb0JELElBa29CQztJQWxvQlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2VyaWVHcm91cEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuXHJcbmltcG9ydCB7IFNpZ25hbEFjdGlvbiwgRXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vc2lnbmFsL2V2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IERhdGVUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kYXRlVGltZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIsIEJpblNlYXJjaE1vZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFJbmZvXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSBcIi4uL3NpZ25hbC9zaWduYWxcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuXHJcbmltcG9ydCB7IFNlcmllQWN0aW9uLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxDYXRlZ29yeSB9IGZyb20gXCIuLi8uLi9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbENhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuLi8uLi9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5cclxuY2xhc3MgRXZlbnRTZXJpZXNEYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQgPEJhc2VTZXJpZXMsIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3M+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VTZXJpZXN7XHJcblxyXG4gICAgdHlwZSA9IFNlcmllc1R5cGUudGltZVNlcmllcztcclxuICAgIGV2ZW50RGF0YUNoYW5nZWQ6IEV2ZW50U2VyaWVzRGF0YUNoYW5nZWQgPSBuZXcgRXZlbnRTZXJpZXNEYXRhQ2hhbmdlZCgpO1xyXG4gICAgcGVyc2lzdElEOiBzdHJpbmc7XHJcblxyXG5cclxuICAgIHByaXZhdGUgX29uU2lnbmFsRGF0YUNoYW5nZWQgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5vblNpZ25hbERhdGFDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzKX1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHNpZ25hbDogSVNpZ25hbDtcclxuICAgIHByb3RlY3RlZCBfcmF3UG9pbnRzOiBBcnJheTxJUG9pbnQ+ID0gW107XHJcbiAgICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfY29sb3I6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfaWQ6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIF9pc0NhbGN1bGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3BhcmVudDogSVNlcmllR3JvdXAgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9zdGFydFRyaWdnZXJUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICBjYWxjdWxhdGlvbkRhdGFJbmZvOiBDYWxjdWxhdGlvbkRhdGFJbmZvfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDsgXHJcbiAgICBcclxuICAgIGlzQXV0b1VwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBfZGF0YTogQXJyYXk8SVBvaW50PiA9IFtdO1xyXG4gICAgbWF4WCA6IG51bWJlcnx1bmRlZmluZWQ7XHJcbiAgICBtaW5YIDogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgIG1heFkgOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG4gICAgbWluWSA6IG51bWJlcnx1bmRlZmluZWQ7XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOkFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGhvbGRzIHRoZSB0aW1lc3RhbXBzXHJcbiAgICBwcm90ZWN0ZWQgX3RpbWVzdGFtcHM6bnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF9lcnJvckluZm8gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgcHVibGljIGdldCBlcnJvckluZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9ySW5mbztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgZXJyb3JJbmZvKHZhbHVlOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgdGhpcy5fZXJyb3JJbmZvID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvcmlnaW5hbE5hbWUoKTpzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNpZ25hbC5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGRlc2NyaXB0aW9uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmFzZVNlcmllc1xyXG4gICAgICogQHBhcmFtIHtJU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yVHlwZX0gY3Vyc29yVHlwZVxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pcXVlSWQ9XCJcIl1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzaWduYWw6IElTaWduYWwsIG5hbWU6IHN0cmluZywgY29sb3I6IHN0cmluZywgc2VyaWVQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyLCB1bmlxdWVJZDogc3RyaW5nLCBlcnJvckluZm86IEFycmF5PHN0cmluZz4pe1xyXG4gICAgICAgIHRoaXMuX3Nlcmllc1Byb3ZpZGVyID0gc2VyaWVQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuc2lnbmFsID0gc2lnbmFsO1xyXG4gICAgICAgIHRoaXMuc2lnbmFsLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX29uU2lnbmFsRGF0YUNoYW5nZWQpO1xyXG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gXCJcIjtcclxuICAgICAgICB0aGlzLmVycm9ySW5mbyA9IGVycm9ySW5mbztcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgZ2l2ZW4gdW5pcXVlIGlkXHJcbiAgICAgICAgdGhpcy5faWQgPSB1bmlxdWVJZDsgIFxyXG4gICAgICAgIHRoaXMucGVyc2lzdElEID0gc2VyaWVQcm92aWRlci5nZXRTZXJpZXNQZXJzaXN0aW5nSWQodGhpcy5faWQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBzaWduYWwgd2l0aCB0aGUgZ2l2ZW4gcGVyc2lzdGVkIHNpZ25hbERhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyp9IHNpZ25hbERhdGFcclxuICAgICAqIEByZXR1cm5zIHtJU2lnbmFsfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBjcmVhdGVTaWduYWwoc2lnbmFsRGF0YTogYW55KTogSVNpZ25hbHtcclxuICAgICAgICBsZXQgc2lnbmFsOiBJU2lnbmFsID0gbmV3IFNpZ25hbChcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpKTtcclxuICAgICAgICBpZihzaWduYWxEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNpZ25hbC5zZXRTZXR0aW5ncyhzaWduYWxEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNpZ25hbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gcmVwcmVzZW50YXRpb24gb2YgdGhpcyBzZXJpZXMgKHNlcmllIHR5cGUsIGF1dG8gdXBsb2FkLCBzZXJpZXMgY29sb3IsIC4uLiBpcyBpbmNsdWRlZClcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgZ2V0SWNvbigpOiBzdHJpbmd7XHJcbiAgICAgICByZXR1cm4gdGhpcy5fc2VyaWVzUHJvdmlkZXIuZ2V0SWNvbih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBzcGVjaWZpYyBpY29uIGZvciB0aGlzIHNlcmllcyAoZS5nLiBvbmx5IGEgc2luZ2xlIG92ZXJsYXkpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN2Z05hbWUgKGUuZy4gXCJhdXRvVXBkYXRlZE92ZXJsYXlcIiBvciBcImV4Y2xhbWF0aW9uT3ZlcmxheVwiKVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGdldFNwZWNpZmljSWNvbihzdmdOYW1lOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldFNwZWNpZmljSWNvbihzdmdOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJ1bnMgYW4gZXJyb3IgdGV4dCBmb3IgdGhpcyBzZXJpZXMgaWYgc29tZSBlcnJvciBpbmZvcyBhcmUgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGdldEVycm9yVGV4dCgpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IGZvcm1hdGVkVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgaWYodGhpcy5lcnJvckluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5lcnJvckluZm8ubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRlZFRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckluZm8uZm9yRWFjaChlcnJvciA9PntcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRlZFRleHQgKz0gZXJyb3IgKyBcIlxcclxcblwiO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3JtYXRlZFRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwZXJzaXN0aW5nIGRhdGEgb2YgdGhlIEJhc2VTZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgZ2V0U2V0dGluZ3MoKTogSVNldHRpbmdze1xyXG4gICAgICAgIHJldHVybiBTZXJpZXNIZWxwZXIuY3JlYXRlU2VyaWVTZXR0aW5ncyh0aGlzLnNpZ25hbCwgdGhpcy5uYW1lLCB0aGlzLmNvbG9yLCB0aGlzLmlkLCB0aGlzLnR5cGUsIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mbywgdGhpcy5lcnJvckluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIEJhc2VTZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5zaWduYWwuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fb25TaWduYWxEYXRhQ2hhbmdlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0aW1lc3RhbXBzIGJhc2VvbiB0aGUgYXZhaWxhYmxlIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGltZXN0YW1wcygpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzZXJpZSBpY29uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGljb25EZWZpbml0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGljb25EZWZpbml0aW9uID0gYDxkaXYgY2xhc3M9J2UtZG9jJyBzdHlsZT0ncG9zaXRpb246IHJlbGF0aXZlO2hlaWdodDoxNnB4O3dpZHRoOjMwcHg7bWFyZ2luOmF1dG87ZmxvYXQ6bGVmdDttYXJnaW4tbGVmdDo2cHg7bWFyZ2luLXRvcDoycHgnPmA7XHJcbiAgICAgICAgLy8gYWRkIHNlcmllcyBpY29uICh3aXRoIG92ZXJsYXlzKVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IHRoaXMuZ2V0SWNvbigpO1xyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICByZXR1cm4gaWNvbkRlZmluaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkYXRhIG9mIGFuIGV4aXN0aW5nIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSByYXdQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVQb2ludHMocmF3UG9pbnRzOiBBcnJheTxJUG9pbnQ+KXtcclxuICAgICAgICB0aGlzLnJhd1BvaW50cyA9IHJhd1BvaW50cztcclxuICAgICAgICB0aGlzLmdldFJhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5zaW1wbGlmeVNpZ25hbChyYXdQb2ludHMpO1xyXG4gICAgICAgIHRoaXMuc2lnbmFsLnJhd1BvaW50cyA9IHJhd1BvaW50cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2ltcGxpZnlTaWduYWwocmF3UG9pbnRzOiBBcnJheTxJUG9pbnQ+KXt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBpbnB1dCBkYXRhIChEYXRhUG9pbnRzIGxpc3QpIGZvciBjYWxjdWxhdGVkIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn0gaW5wdXREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUlucHV0RGF0YShpbnB1dERhdGE6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KXtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0RGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dERhdGFbaV0gaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFQb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFbaV0gPSBpbnB1dERhdGFbaV0gYXMgQ2FsY3VsYXRpb25EYXRhUG9pbnRzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBpbnB1dCBkYXRhIHZhbHVlcyAoaW5wdXQgc3RyaW5nOyBlLmcuIHNpZ25hbG5hbWUsIDUsIC4uLikgZm9yIGNhbGN1bGF0ZWQgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPn0gaW5wdXRDaGlsZHNcclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSW5wdXREYXRhVmFsdWVzKGlucHV0Q2hpbGRzOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+KXtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dERhdGFJZHMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRDaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goaW5wdXRDaGlsZHNbaV0uZ2V0UmF3VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChpbnB1dENoaWxkc1tpXS5jYWxjdWxhdGlvbkRhdGEuaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFJZHMgPSBpbnB1dERhdGFJZHM7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFWYWx1ZXMgPSB2YWx1ZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgaW5wdXQgc2VyaWVzIGZvciBjYWxjdWxhdGVkIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT59IGlucHV0Q2hpbGRzXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUlucHV0U2VyaWVzSWRzKGlucHV0Q2hpbGRzOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+KXtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0U2VyaWVzSWRzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDaGlsZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZSA9IGlucHV0Q2hpbGRzW2ldLnNlcmllO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXRTZXJpZXNJZHMucHVzaChzZXJpZS5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjYWxjdWxhdGlvbiBpbmZvcm1hdGlvbnMgZm9yIHRoaXMgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxUQ2FsY3VsYXRpb25EYXRhPn0gaW5wdXREYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+fSBpbnB1dENoaWxkc1xyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUNhbGN1bGF0aW9uRGF0YUluZm8gKGlucHV0RGF0YTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4sIHR5cGU6IHN0cmluZywgaW5wdXRDaGlsZHM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4sIHNlcmllc1Byb3ZpZGVyIDogSVNlcmllc1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mbyA9IG5ldyBDYWxjdWxhdGlvbkRhdGFJbmZvKHNlcmllc1Byb3ZpZGVyLmdldFVuaXF1ZUNhbGN1bGF0aW9uSWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0RGF0YShpbnB1dERhdGEpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXREYXRhVmFsdWVzKGlucHV0Q2hpbGRzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U2VyaWVzSWRzKGlucHV0Q2hpbGRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHJhbmdlIGxpbWl0cyBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0UmFuZ2UoKXtcclxuICAgICAgICB0aGlzLm1heFggPSB0aGlzLmdldE1heFgoKTtcclxuICAgICAgICB0aGlzLm1pblggPSB0aGlzLmdldE1pblgoKTtcclxuICAgICAgICB0aGlzLm1heFkgPSB0aGlzLmdldE1heFkoKTtcclxuICAgICAgICB0aGlzLm1pblkgPSB0aGlzLmdldE1pblkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1heFgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWluWCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IFkgdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1heFkoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtYXhZO1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJhd1BvaW50cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihtYXhZID09IHVuZGVmaW5lZCB8fCB0aGlzLnJhd1BvaW50c1tpXS55ID4gbWF4WSApe1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFkgPSB0aGlzLnJhd1BvaW50c1tpXS55XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heFk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWluIFkgdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1pblkoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5ZO1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJhd1BvaW50cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihtaW5ZID09IHVuZGVmaW5lZCB8fCB0aGlzLnJhd1BvaW50c1tpXS55IDwgbWluWSApe1xyXG4gICAgICAgICAgICAgICAgICAgIG1pblkgPSB0aGlzLnJhd1BvaW50c1tpXS55XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgcmF3UG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCByYXdQb2ludHMocG9pbnRzOiBBcnJheTxJUG9pbnQ+KXtcclxuICAgICAgICB0aGlzLl9yYXdQb2ludHMgPSBwb2ludHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0IHJhd1BvaW50c1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByYXdQb2ludHMoKTogIEFycmF5PElQb2ludD57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jhd1BvaW50cztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgdGltZXN0YW1wcyBhdmFpbGFibGUgaW4gdGhlIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRpbWVzdGFtcHMoKSA6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lc3RhbXBzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGV0ZXJtaW5lcyB0aGUgaW5kZXggb2YgdGhlIHRpbWVzdGFtcCB3aXRoaW4gdGhlIGF2YWlsYWJsZSB0aW1lc3RhbXBzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gdGltZXN0YW1wc1xyXG4gICAgICogQHBhcmFtIHtCaW5TZWFyY2hNb2RlfSBMT1dFUlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGdldFRpbWVzdGFtcEluZGV4KHRpbWVzdGFtcDogbnVtYmVyLGJpblNlYXJjaE1vZGU6QmluU2VhcmNoTW9kZSA9IEJpblNlYXJjaE1vZGUuTkVBUkVTVCkge1xyXG4gICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBhdmFpbGFibGUgdGltZXN0YW1wc1xyXG4gICAgICAgIGxldCB0aW1lc3RhbXBzID0gdGhpcy50aW1lc3RhbXBzO1xyXG4gICAgICAgIC8vIGdldCB0aGUgaW5kZXggb2YgdGhlIHRpbWVzdGFtcCBcclxuICAgICAgICBsZXQgdGltZXN0YW1wSW5kZXggPSBTZXJpZXNIZWxwZXIuaW5kZXhPZk5lYXJlc3QodGltZXN0YW1wLHRpbWVzdGFtcHMsYmluU2VhcmNoTW9kZSk7XHJcblxyXG4gICAgICAgIHJldHVybiAgdGltZXN0YW1wSW5kZXggPj0gMCAmJiB0aW1lc3RhbXBJbmRleCA8IHRpbWVzdGFtcHMubGVuZ3RoID8gdGltZXN0YW1wSW5kZXggOiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHNlcmllcyBwb2ludCBuZWFyZXN0IHRvIHRoZSB0aW1lc3RhbXBcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVBvaW50fVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvaW50RnJvbVRpbWVzdGFtcCh0aW1lc3RhbXA6bnVtYmVyKSA6IElQb2ludHtcclxuICAgICAgICBsZXQgbmVhcmVzdFRpbWVzdGFtcEluZGV4ID0gdGhpcy5nZXRUaW1lc3RhbXBJbmRleCh0aW1lc3RhbXApO1xyXG4gICAgICAgIHJldHVybiAgbmVhcmVzdFRpbWVzdGFtcEluZGV4ID49IDAgPyAgdGhpcy5yYXdQb2ludHNbbmVhcmVzdFRpbWVzdGFtcEluZGV4XSA6IG5ldyBQb2ludCgwLDApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHNlcmllcyBwb2ludCBwcmV2aW91cyB0byB0aGUgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lQb2ludH1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwcmV2aW91c1BvaW50RnJvbVRpbWVzdGFtcCh0aW1lc3RhbXA6IG51bWJlcik6IElQb2ludCB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBsb3dlcmJvdW5kIHRpbWVzdGFtcCBpbmRleCAoIGlmIHRoZSB0aW1lc3RhbXAgaXMgbm90IG1hdGNoaW5nIGV4YWN0bHkpXHJcbiAgICAgICAgbGV0IG5lYXJlc3RUaW1lc3RhbXBJbmRleCA9IHRoaXMuZ2V0VGltZXN0YW1wSW5kZXgodGltZXN0YW1wLEJpblNlYXJjaE1vZGUuTE9XRVJCT1VORCk7XHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RUaW1lc3RhbXBJbmRleCA+PSAwID8gdGhpcy5yYXdQb2ludHNbbmVhcmVzdFRpbWVzdGFtcEluZGV4XSA6IG5ldyBQb2ludCgwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgdGltZXN0YW1wIGlzIHdpdGhpbiB0aGUgYXZhaWxhYmxlIHJhbmdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdGltZXN0YW1wSXNJblJhbmdlKHRpbWVzdGFtcDpudW1iZXIpIDogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gIFNlcmllc0hlbHBlci5pc0luUmFuZ2UodGltZXN0YW1wLHRoaXMudGltZXN0YW1wcyk7XHJcbiAgICB9XHJcbiAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgaWYgc2VyaWUgaXMgY2FsY3VsYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgaXNDYWxjdWxhdGVkKHZhbHVlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl9pc0NhbGN1bGF0ZWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBpZiBzZXJpZSBpcyBjYWxjdWxhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzQ2FsY3VsYXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgcmV0dXJuIHRoaXMuX2lzQ2FsY3VsYXRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzZXJpZSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBvbGROYW1lID0gIHRoaXMuX25hbWU7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTZXJpZUFjdGlvbi5yZW5hbWUsIHRoaXMuX25hbWUsIG9sZE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHNlcmllIG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB1bmlxdWUgc2VyaWUgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc2VyaWUgY29sb3JcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBvbGRDb2xvciA9IHRoaXMuX2NvbG9yO1xyXG4gICAgICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNlcmllQWN0aW9uLmNvbG9yQ2hhbmdlZCwgdGhpcy5fY29sb3IsIG9sZENvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzZXJpZSBjb2xvclxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNvbG9yKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgaWYgcmF3UG9pbnRzIGFyZSB2YWxpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJhd1BvaW50c1ZhbGlkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmFsLnJhd1BvaW50c1ZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHN0YXJ0VHJpZ2dlclRpbWVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzdGFydFRyaWdnZXJUaW1lKCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzdGFydFRyaWdnZXJUaW1lXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBzdGFydFRyaWdnZXJUaW1lKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKHZhbHVlICE9IHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWUpe1xyXG4gICAgICAgICAgICBsZXQgb2xkU3RhcnRUcmlnZ2VyVGltZSA9IHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNlcmllQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkLCBvbGRTdGFydFRyaWdnZXJUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc3RhcnQgdHJpZ2dlciBmb3JtYXRlZCB0aW1lIChzaG93biBuZXh0IHRvIHNlcmllIG5hbWUpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBhZGRpdGlvbmFsSW5mbygpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fc3RhcnRUcmlnZ2VyVGltZSAhPSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGVUaW1lSGVscGVyLmdldERhdGVUaW1lKHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjsgLy8gTm8gc3RhcnQgdHJpZ2dlciBpbmZvIGF2YWlsYWJsZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHBhcmVudCBvZiBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoSVNlcmllR3JvdXAgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBwYXJlbnQoKTogSVNlcmllR3JvdXAgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgcGFyZW50IG9mIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBwYXJlbnQodmFsdWU6IElTZXJpZUdyb3VwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdmFsdWU7XHJcbiAgICAgICAgaWYodGhpcy5fcGFyZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgaWYodGhpcy5fcGFyZW50LnBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbENhdGVnb3J5KXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3BhcmVudC5wYXJlbnQuaWQgPT0gU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFJlY2VudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHNlcmllIHRvIGF1dG9VcGRhdGVkIGlmIGluIHJlY2VudCBjYXRlZ29yeVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBdXRvVXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zdGFydFRyaWdnZXJUaW1lID0gdGhpcy5fcGFyZW50LnN0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmlnZ2VyVGltZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXRzIHRoZSBuYW1lIHRvIHRoZSBvcmlnaW5hbCBuYW1lIGZyb20gdGhlIHNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNldE5hbWUoKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLm9yaWdpbmFsTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb25lcyB0aGlzIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSgpOiBCYXNlU2VyaWVze1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHRoaXMuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICAoc2V0dGluZ3MgYXMgU2V0dGluZ3MpLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzSWQsIHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldFVuaXF1ZUlkKCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJpZXNQcm92aWRlci5jcmVhdGVTZXJpZShzZXR0aW5ncykhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgc2VyaWUgZGF0YSBjaGFuZ2VkIGV2ZW50IChlLmcuIHNlcmllIGNvbG9yLCBzZXJpZSBkYXRhcG9pbnRzLCByZW5hbWUgY2hhbmdlZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gZXZlbnRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uU2lnbmFsRGF0YUNoYW5nZWQoc2VuZGVyOiBJU2lnbmFsLCBldmVudEFyZ3M6IEV2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzKXtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50QXJncy5hY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBTaWduYWxBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQ6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZXN0YW1wcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNlcmllQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkLCBldmVudEFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNpZ25hbEFjdGlvbi5zdGFydFRyaWdnZXJUaW1lQ2hhbmdlZDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2VyaWVBY3Rpb24uc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsIGV2ZW50QXJncy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25EYXRhQ2hhbmdlZChhY3Rpb246IFNlcmllQWN0aW9uLCBkYXRhOiBhbnksIG9sZERhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyhhY3Rpb24sIGRhdGEsIG9sZERhdGEpO1xyXG4gICAgICAgIHRoaXMuZXZlbnREYXRhQ2hhbmdlZC5yYWlzZSh0aGlzLCBldmVudEFyZ3MpO1xyXG4gICAgICAgIGlmKGFjdGlvbiA9PSBTZXJpZUFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZCl7XHJcbiAgICAgICAgICAgIHRoaXMub25TZXJpZURhdGFDaGFuZ2VkKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuZXZlciB0aGUgc2VyaXMgZGF0YSBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25TZXJpZURhdGFDaGFuZ2VkKCBkYXRhOiBJUG9pbnRbXSkge1xyXG4gICAgICAgIC8vVE9ETzogZXZlbnR1YWxseSBjYWxsIHNpbXBsaWZpY2F0aW9uID8/Pz9cclxuICAgIH1cclxufSJdfQ==