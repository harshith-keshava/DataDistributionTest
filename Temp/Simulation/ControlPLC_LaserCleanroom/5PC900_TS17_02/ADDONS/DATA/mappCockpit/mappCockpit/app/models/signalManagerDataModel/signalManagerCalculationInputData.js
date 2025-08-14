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
define(["require", "exports", "../common/signal/serieNode", "./eventSignalManagerDataChangedArgs", "../common/calculatorProvider/calculationDataNumber", "./signalManagerCalculatorType", "./signalManagerCalculationOutputData", "../common/series/seriesType", "../common/calculatorProvider/calculationData", "../common/calculatorProvider/calculationDataNumberOrPoints", "../common/calculatorProvider/calculationDataString", "../common/calculatorProvider/calculationDataPoints"], function (require, exports, serieNode_1, eventSignalManagerDataChangedArgs_1, calculationDataNumber_1, signalManagerCalculatorType_1, signalManagerCalculationOutputData_1, seriesType_1, calculationData_1, calculationDataNumberOrPoints_1, calculationDataString_1, calculationDataPoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculationInputData = /** @class */ (function (_super) {
        __extends(SignalManagerCalculationInputData, _super);
        /**
         * Creates an instance of SignalManagerCalculationInputData.
         * @param {TCalculationData} calculationData
         * @param {boolean} isInput
         * @memberof SignalManagerCalculationInputData
         */
        function SignalManagerCalculationInputData(calculationData) {
            var _this = _super.call(this, "", undefined) || this;
            _this.onlyValuesFromListAreAllowed = false;
            _this.dropPossible = false;
            /**
             * Is a cloning operation active (some messages should not be shown while cloning)
             *
             * @type {boolean}
             * @memberof SignalManagerCalculationInputData
             */
            _this.whileCloning = false;
            /**
             * Reset value while circular ref found operation active (some messages should not be shown while reset value in case of circular ref found)
             *
             * @type {boolean}
             * @memberof SignalManagerCalculationInputData
             */
            _this.whileCircularRefFound = false;
            _this.calculationData = calculationData;
            if (_this.calculationData.displayInfo != undefined) {
                _this.onlyValuesFromListAreAllowed = _this.calculationData.displayInfo.onlyValuesFromListAreAllowed;
            }
            _this._value = _this.calculationData.value;
            _this.canDelete = false;
            return _this;
        }
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "values", {
            /**
             * Returns a list with available values for this calculation input
             *
             * @readonly
             * @type {(Array<IValueListItem>|undefined)}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                if (this.calculationData.values != undefined) {
                    return this.calculationData.values;
                }
                else if (this.calculationData.displayInfo != undefined && this.calculationData.displayInfo.showSignalList == true) {
                    return this.getSerieSelections();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "dataTypeName", {
            /**
             * Returns the datatype of this calculation input
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                if (this.calculationData instanceof calculationDataNumber_1.CalculationDataNumber) {
                    return "Float";
                }
                else {
                    return "String";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "minValue", {
            get: function () {
                if (this.calculationData.displayInfo != undefined) {
                    return this.calculationData.displayInfo.minValue;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "maxValue", {
            get: function () {
                if (this.calculationData.displayInfo != undefined) {
                    return this.calculationData.displayInfo.maxValue;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "parent", {
            /**
             * Returns the parent of this calculation input
             *
             * @type {(ISerieContainer | undefined)}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return this._parent;
            },
            /**
             * Sets the parent of this calculation input
             *
             * @memberof SignalManagerCalculationInputData
             */
            set: function (value) {
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "name", {
            /**
             * Returns the name of this calculation input
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                var dataModel = this.getDataModel();
                if (dataModel != undefined) {
                    if (dataModel.editModeActive == true) {
                        return this.calculationData.getDisplayName(); // Show the display name of input/output parameter in edit mode
                    }
                }
                return this.value; // Show only the value 
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "description", {
            /**
             * Returns the description of this calculation input
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return this.calculationData.description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "color", {
            /**
             * Returns the color of this calculation input => currently no color needed for inputs
             *
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return "";
            },
            /**
             * Sets the color of this calculation input => currently no color needed for inputs
             *
             * @memberof SignalManagerCalculationInputData
             */
            set: function (value) {
                if (this.serie != undefined) {
                    this.serie.color = value;
                }
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.colorChanged, value));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the value of the calculation input written in the cell (rowdata)
         * Added for html
         * @type {string}
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.getRawValue = function () {
            return this._value;
        };
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "value", {
            /**
             * Returns the value of this calculation input
             *
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return this.calculationData.getDisplayValue(this._value);
            },
            /**
             * Sets the value of this calculation input
             *
             * @memberof SignalManagerCalculationInputData
             */
            set: function (value) {
                var oldValue = this._value;
                this._value = this.calculationData.getRawValueToDisplayValue(value);
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.valueChanged, value, oldValue));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Set clone data like value, series data and calculation raw data. while cloning flag will be set at the beginning and reseted at the end
         *
         * @param {SignalManagerCalculationInputData} originalInputData
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.setCloneData = function (originalInputData) {
            this.whileCloning = true;
            this.value = originalInputData.value;
            if (originalInputData.serie != undefined) {
                this.serie = originalInputData.serie.clone();
            }
            // Sets the data information from the original object to the new created cloned object
            calculationData_1.CalculationData.setRawData(originalInputData.calculationData, this.calculationData);
            this.whileCloning = false;
        };
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "nodeType", {
            /**
             * Returns the type of this calculation input
             *
             * @readonly
             * @protected
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return serieNode_1.NodeType.calculationInputParam;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the value of the signalCalculationData to the calculation data (NOT FOR serie names in signal calculation data; only for strings, numerics, ...)
         * Resets an old serie to undefined if it was used before in this SignalManagerCalculation data.
         *
         * @param {CalculationData} calculationData
         * @returns {boolean} false if data can not be set => data is not a number
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.setSignalCalculationValueToCalculationData = function (calculationData, showMessages) {
            calculationData.value = this.getRawValue();
            if (calculationData instanceof calculationDataNumber_1.CalculationDataNumber || calculationData instanceof calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints) {
                if (calculationData.value != "" && this.isNumber(calculationData.value) == false) {
                    var mainMessage = "Input data ('" + calculationData.value + "') is not in a valid number format";
                    if (calculationData instanceof calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints) {
                        // value from input data could also be a signal name
                        mainMessage += " nor a valid signal name";
                    }
                    // Input data not in a correct number format
                    if (showMessages == true) {
                        var message = mainMessage + ". Use '.' instead of ',' or remove characters in case of number! Previous value will be used.";
                        alert(message);
                    }
                    // Set not a number data => should lead to a calculation error
                    calculationData.setData(Number.NaN);
                    return false;
                }
                else {
                    var parsedData = parseFloat(calculationData.value);
                    calculationData.setData(parsedData); // Set available number data
                }
            }
            else if (calculationData instanceof calculationDataString_1.CalculationDataString) {
                calculationData.setData(calculationData.value); // Set available string data
            }
            else if (calculationData instanceof calculationDataPoints_1.CalculationDataPoints) {
                calculationData.setData(new Array()); // No signal data available, set empty points
            }
            // Remove current used serie from calculationData
            this.serie = undefined;
            return true;
        };
        /**
         * check if the string is in a correct number format (e.g. "1.2", "10e5", "-3", ...)
         *
         * @private
         * @param {string} numberString
         * @returns
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.isNumber = function (numberString) {
            return /^-?[\d.]+(?:e-?\d+)?$/.test(numberString);
        };
        SignalManagerCalculationInputData.prototype.setSignalCalculationValueToCalculationDataWithSerieData = function (serie, calculationData) {
            calculationData.value = this.value;
            calculationData.type = serie.type;
            if (calculationData instanceof calculationDataPoints_1.CalculationDataPoints || calculationData instanceof calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints) {
                calculationData.setData(serie.rawPoints);
            }
            // Add current used signal to calculationData
            this.serie = serie;
        };
        /**
         * Returns all a list(displayValue, value) of the series which are available at the parent serie group, output series of the current calculation will be removed
         *
         * @private
         * @returns {Array<any>}
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.getSerieSelections = function () {
            // get all available series from parent serieGroup
            var serieSelections = this.getAllSeriesFromParentSerieGroup();
            // Remove own output series from this calculation
            var outputSerieData = this.getOutputDatasOfParent()[0]; // TODO: multi output
            if (outputSerieData != undefined) {
                if (outputSerieData.serie != undefined) {
                    for (var i = 0; i < serieSelections.length; i++) {
                        if (serieSelections[i].value == outputSerieData.serie.name) {
                            serieSelections.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
            // Remove series which results in a cycle of calculations
            if (this.parent instanceof signalManagerCalculatorType_1.SignalManagerCalculatorType) {
                for (var i = 0; i < serieSelections.length; i++) {
                    if (this.parent.cycleFound(serieSelections[i].value) == true) { // check for cycle
                        serieSelections.splice(i, 1);
                        i--;
                    }
                }
            }
            return serieSelections;
        };
        /**
         * Returns a list(with displayValue and value) of all series from the parent serie group
         *
         * @private
         * @returns {Array<any>}
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.getAllSeriesFromParentSerieGroup = function () {
            var serieSelections = new Array();
            var serieGroup = this.getSerieGroup();
            if (serieGroup != undefined) { // Is a serie group available
                var series = serieGroup.getSeries();
                for (var i = 0; i < series.length; i++) {
                    // So far, only allowed to use yt series as input 
                    if (series[i].type == seriesType_1.SeriesType.timeSeries) {
                        var serieName = series[i].name;
                        serieSelections.push({ displayValue: serieName, value: serieName });
                    }
                }
            }
            return serieSelections;
        };
        SignalManagerCalculationInputData.prototype.getOutputDatasOfParent = function () {
            var outputDatas = new Array();
            if (this._parent != undefined) {
                var parentChilds = this._parent.getChilds();
                for (var i = 0; i < parentChilds.length; i++) {
                    if (parentChilds[i] instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                        outputDatas.push(parentChilds[i]);
                    }
                }
            }
            return outputDatas;
        };
        return SignalManagerCalculationInputData;
    }(serieNode_1.SerieNode));
    exports.SignalManagerCalculationInputData = SignalManagerCalculationInputData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWdCQTtRQUF1RCxxREFBUztRQTRRNUQ7Ozs7O1dBS0c7UUFDSCwyQ0FBWSxlQUFpQztZQUE3QyxZQUNJLGtCQUFNLEVBQUUsRUFBRSxTQUFTLENBQUMsU0FPdkI7WUF4UkQsa0NBQTRCLEdBQVksS0FBSyxDQUFDO1lBQzlDLGtCQUFZLEdBQVksS0FBSyxDQUFDO1lBRTlCOzs7OztlQUtHO1lBQ0ksa0JBQVksR0FBWSxLQUFLLENBQUM7WUFFckM7Ozs7O2VBS0c7WUFDSSwyQkFBcUIsR0FBWSxLQUFLLENBQUM7WUFpUTFDLEtBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLElBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFDO2dCQUM3QyxLQUFJLENBQUMsNEJBQTRCLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsNEJBQTRCLENBQUM7YUFDckc7WUFDRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDOztRQUMzQixDQUFDO1FBNVBELHNCQUFXLHFEQUFNO1lBUGpCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBQztvQkFDeEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztpQkFDdEM7cUJBQ0ksSUFBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsSUFBSSxT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QUM7Z0JBQ3pCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzVDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUN0QyxJQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSx1RUFBa0MsRUFBQzt3QkFDN0QsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUF1QyxDQUFDLENBQUM7cUJBQzNFO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLFdBQVcsQ0FBQztRQUN2QixDQUFDO1FBRUwsd0NBQUM7SUFBRCxDQUFDLEFBcldELENBQXVELHFCQUFTLEdBcVcvRDtJQXJXWSw4RUFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJpZU5vZGUsIE5vZGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVOb2RlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJBY3Rpb24sIEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuL2V2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBJU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvc2VyaWVDb250YWluZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhTnVtYmVyXCI7XHJcbmltcG9ydCB7IElDZWxsSW5mbyB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9pbnRlcmZhY2VzL2NlbGxJbmZvSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElWYWx1ZUxpc3RJdGVtIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZhbHVlTGlzdEl0ZW1JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllcy9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEsIENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVN0cmluZyB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVN0cmluZ1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIGV4dGVuZHMgU2VyaWVOb2RlIGltcGxlbWVudHMgSUNlbGxJbmZve1xyXG4gICAgY2FsY3VsYXRpb25EYXRhOiBUQ2FsY3VsYXRpb25EYXRhO1xyXG4gICAgb25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZHJvcFBvc3NpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyBhIGNsb25pbmcgb3BlcmF0aW9uIGFjdGl2ZSAoc29tZSBtZXNzYWdlcyBzaG91bGQgbm90IGJlIHNob3duIHdoaWxlIGNsb25pbmcpXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB3aGlsZUNsb25pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IHZhbHVlIHdoaWxlIGNpcmN1bGFyIHJlZiBmb3VuZCBvcGVyYXRpb24gYWN0aXZlIChzb21lIG1lc3NhZ2VzIHNob3VsZCBub3QgYmUgc2hvd24gd2hpbGUgcmVzZXQgdmFsdWUgaW4gY2FzZSBvZiBjaXJjdWxhciByZWYgZm91bmQpXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB3aGlsZUNpcmN1bGFyUmVmRm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgd2l0aCBhdmFpbGFibGUgdmFsdWVzIGZvciB0aGlzIGNhbGN1bGF0aW9uIGlucHV0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7KEFycmF5PElWYWx1ZUxpc3RJdGVtPnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlcygpOiBBcnJheTxJVmFsdWVMaXN0SXRlbT58dW5kZWZpbmVkIHtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YS52YWx1ZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLnZhbHVlcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mbyAhPSB1bmRlZmluZWQgJiYgdGhpcy5jYWxjdWxhdGlvbkRhdGEuZGlzcGxheUluZm8uc2hvd1NpZ25hbExpc3QgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFNlcmllU2VsZWN0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRhdGF0eXBlIG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGF0YVR5cGVOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YU51bWJlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkZsb2F0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0cmluZ1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG1pblZhbHVlKCk6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGEuZGlzcGxheUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmRpc3BsYXlJbmZvLm1pblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IG1heFZhbHVlKCk6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGEuZGlzcGxheUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmRpc3BsYXlJbmZvLm1heFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcGFyZW50IG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXQgXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwYXJlbnQgb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBwYXJlbnQodmFsdWU6IElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsLmVkaXRNb2RlQWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmdldERpc3BsYXlOYW1lKCk7IC8vIFNob3cgdGhlIGRpc3BsYXkgbmFtZSBvZiBpbnB1dC9vdXRwdXQgcGFyYW1ldGVyIGluIGVkaXQgbW9kZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlOyAgLy8gU2hvdyBvbmx5IHRoZSB2YWx1ZSBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlc2NyaXB0aW9uIG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGlvbkRhdGEuZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb2xvciBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0ID0+IGN1cnJlbnRseSBubyBjb2xvciBuZWVkZWQgZm9yIGlucHV0c1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY29sb3IoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29sb3Igb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dCA9PiBjdXJyZW50bHkgbm8gY29sb3IgbmVlZGVkIGZvciBpbnB1dHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZS5jb2xvciA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQodGhpcywgbmV3IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyhTaWduYWxNYW5hZ2VyQWN0aW9uLmNvbG9yQ2hhbmdlZCwgdmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBjYWxjdWxhdGlvbiBpbnB1dCB3cml0dGVuIGluIHRoZSBjZWxsIChyb3dkYXRhKVxyXG4gICAgICogQWRkZWQgZm9yIGh0bWxcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSYXdWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0IFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGlvbkRhdGEuZ2V0RGlzcGxheVZhbHVlKHRoaXMuX3ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5jYWxjdWxhdGlvbkRhdGEuZ2V0UmF3VmFsdWVUb0Rpc3BsYXlWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi52YWx1ZUNoYW5nZWQsIHZhbHVlLCBvbGRWYWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldCBjbG9uZSBkYXRhIGxpa2UgdmFsdWUsIHNlcmllcyBkYXRhIGFuZCBjYWxjdWxhdGlvbiByYXcgZGF0YS4gd2hpbGUgY2xvbmluZyBmbGFnIHdpbGwgYmUgc2V0IGF0IHRoZSBiZWdpbm5pbmcgYW5kIHJlc2V0ZWQgYXQgdGhlIGVuZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhfSBvcmlnaW5hbElucHV0RGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBzZXRDbG9uZURhdGEob3JpZ2luYWxJbnB1dERhdGE6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSl7XHJcbiAgICAgICAgdGhpcy53aGlsZUNsb25pbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSBvcmlnaW5hbElucHV0RGF0YS52YWx1ZTtcclxuICAgICAgICBpZihvcmlnaW5hbElucHV0RGF0YS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllID0gb3JpZ2luYWxJbnB1dERhdGEuc2VyaWUuY2xvbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldHMgdGhlIGRhdGEgaW5mb3JtYXRpb24gZnJvbSB0aGUgb3JpZ2luYWwgb2JqZWN0IHRvIHRoZSBuZXcgY3JlYXRlZCBjbG9uZWQgb2JqZWN0XHJcbiAgICAgICAgQ2FsY3VsYXRpb25EYXRhLnNldFJhd0RhdGEob3JpZ2luYWxJbnB1dERhdGEuY2FsY3VsYXRpb25EYXRhLCB0aGlzLmNhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgdGhpcy53aGlsZUNsb25pbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHR5cGUgb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBub2RlVHlwZSgpOiBOb2RlVHlwZXtcclxuICAgICAgICByZXR1cm4gTm9kZVR5cGUuY2FsY3VsYXRpb25JbnB1dFBhcmFtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIHNpZ25hbENhbGN1bGF0aW9uRGF0YSB0byB0aGUgY2FsY3VsYXRpb24gZGF0YSAoTk9UIEZPUiBzZXJpZSBuYW1lcyBpbiBzaWduYWwgY2FsY3VsYXRpb24gZGF0YTsgb25seSBmb3Igc3RyaW5ncywgbnVtZXJpY3MsIC4uLilcclxuICAgICAqIFJlc2V0cyBhbiBvbGQgc2VyaWUgdG8gdW5kZWZpbmVkIGlmIGl0IHdhcyB1c2VkIGJlZm9yZSBpbiB0aGlzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiBkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q2FsY3VsYXRpb25EYXRhfSBjYWxjdWxhdGlvbkRhdGFcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBmYWxzZSBpZiBkYXRhIGNhbiBub3QgYmUgc2V0ID0+IGRhdGEgaXMgbm90IGEgbnVtYmVyXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTaWduYWxDYWxjdWxhdGlvblZhbHVlVG9DYWxjdWxhdGlvbkRhdGEoY2FsY3VsYXRpb25EYXRhOiBDYWxjdWxhdGlvbkRhdGEsIHNob3dNZXNzYWdlczogYm9vbGVhbik6IGJvb2xlYW57XHJcbiAgICAgICAgY2FsY3VsYXRpb25EYXRhLnZhbHVlID0gdGhpcy5nZXRSYXdWYWx1ZSgpO1xyXG4gICAgICAgIGlmKGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YU51bWJlciB8fCBjYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cykge1xyXG4gICAgICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGEudmFsdWUgIT0gXCJcIiAmJiB0aGlzLmlzTnVtYmVyKGNhbGN1bGF0aW9uRGF0YS52YWx1ZSkgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgbGV0IG1haW5NZXNzYWdlID0gXCJJbnB1dCBkYXRhICgnXCIgKyBjYWxjdWxhdGlvbkRhdGEudmFsdWUgK1wiJykgaXMgbm90IGluIGEgdmFsaWQgbnVtYmVyIGZvcm1hdFwiO1xyXG4gICAgICAgICAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhbHVlIGZyb20gaW5wdXQgZGF0YSBjb3VsZCBhbHNvIGJlIGEgc2lnbmFsIG5hbWVcclxuICAgICAgICAgICAgICAgICAgICBtYWluTWVzc2FnZSArPSBcIiBub3IgYSB2YWxpZCBzaWduYWwgbmFtZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gSW5wdXQgZGF0YSBub3QgaW4gYSBjb3JyZWN0IG51bWJlciBmb3JtYXRcclxuICAgICAgICAgICAgICAgIGlmKHNob3dNZXNzYWdlcyA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG1haW5NZXNzYWdlICsgXCIuIFVzZSAnLicgaW5zdGVhZCBvZiAnLCcgb3IgcmVtb3ZlIGNoYXJhY3RlcnMgaW4gY2FzZSBvZiBudW1iZXIhIFByZXZpb3VzIHZhbHVlIHdpbGwgYmUgdXNlZC5cIjtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IG5vdCBhIG51bWJlciBkYXRhID0+IHNob3VsZCBsZWFkIHRvIGEgY2FsY3VsYXRpb24gZXJyb3JcclxuICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5zZXREYXRhKE51bWJlci5OYU4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFyc2VkRGF0YSA9IHBhcnNlRmxvYXQoY2FsY3VsYXRpb25EYXRhLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5zZXREYXRhKHBhcnNlZERhdGEpOyAvLyBTZXQgYXZhaWxhYmxlIG51bWJlciBkYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YVN0cmluZyl7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5zZXREYXRhKGNhbGN1bGF0aW9uRGF0YS52YWx1ZSk7ICAgLy8gU2V0IGF2YWlsYWJsZSBzdHJpbmcgZGF0YVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFQb2ludHMpe1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGEuc2V0RGF0YShuZXcgQXJyYXk8SVBvaW50PigpKTsgICAvLyBObyBzaWduYWwgZGF0YSBhdmFpbGFibGUsIHNldCBlbXB0eSBwb2ludHNcclxuICAgICAgICB9ICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFJlbW92ZSBjdXJyZW50IHVzZWQgc2VyaWUgZnJvbSBjYWxjdWxhdGlvbkRhdGFcclxuICAgICAgICB0aGlzLnNlcmllID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0cnVlOyAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2hlY2sgaWYgdGhlIHN0cmluZyBpcyBpbiBhIGNvcnJlY3QgbnVtYmVyIGZvcm1hdCAoZS5nLiBcIjEuMlwiLCBcIjEwZTVcIiwgXCItM1wiLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBudW1iZXJTdHJpbmdcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNOdW1iZXIobnVtYmVyU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gL14tP1tcXGQuXSsoPzplLT9cXGQrKT8kLy50ZXN0KG51bWJlclN0cmluZyk7XHJcbiAgICB9IFxyXG5cclxuICAgIHB1YmxpYyBzZXRTaWduYWxDYWxjdWxhdGlvblZhbHVlVG9DYWxjdWxhdGlvbkRhdGFXaXRoU2VyaWVEYXRhKHNlcmllOiBCYXNlU2VyaWVzLCBjYWxjdWxhdGlvbkRhdGE6IFRDYWxjdWxhdGlvbkRhdGEpe1xyXG4gICAgICAgIGNhbGN1bGF0aW9uRGF0YS52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgY2FsY3VsYXRpb25EYXRhLnR5cGUgPSBzZXJpZS50eXBlO1xyXG4gICAgICAgIGlmKGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YVBvaW50cyB8fCBjYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyl7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5zZXREYXRhKHNlcmllLnJhd1BvaW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBjdXJyZW50IHVzZWQgc2lnbmFsIHRvIGNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICAgIHRoaXMuc2VyaWUgPSBzZXJpZTtcclxuICAgIH0gXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEuXHJcbiAgICAgKiBAcGFyYW0ge1RDYWxjdWxhdGlvbkRhdGF9IGNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0lucHV0XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNhbGN1bGF0aW9uRGF0YTogVENhbGN1bGF0aW9uRGF0YSl7XHJcbiAgICAgICAgc3VwZXIoXCJcIiwgdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YSA9IGNhbGN1bGF0aW9uRGF0YTtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm9ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQgPSB0aGlzLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mby5vbmx5VmFsdWVzRnJvbUxpc3RBcmVBbGxvd2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHRoaXMuY2FsY3VsYXRpb25EYXRhLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2FuRGVsZXRlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBhIGxpc3QoZGlzcGxheVZhbHVlLCB2YWx1ZSkgb2YgdGhlIHNlcmllcyB3aGljaCBhcmUgYXZhaWxhYmxlIGF0IHRoZSBwYXJlbnQgc2VyaWUgZ3JvdXAsIG91dHB1dCBzZXJpZXMgb2YgdGhlIGN1cnJlbnQgY2FsY3VsYXRpb24gd2lsbCBiZSByZW1vdmVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcmllU2VsZWN0aW9ucygpOiBBcnJheTxhbnk+e1xyXG4gICAgICAgIC8vIGdldCBhbGwgYXZhaWxhYmxlIHNlcmllcyBmcm9tIHBhcmVudCBzZXJpZUdyb3VwXHJcbiAgICAgICAgbGV0IHNlcmllU2VsZWN0aW9ucyA9IHRoaXMuZ2V0QWxsU2VyaWVzRnJvbVBhcmVudFNlcmllR3JvdXAoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBSZW1vdmUgb3duIG91dHB1dCBzZXJpZXMgZnJvbSB0aGlzIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgbGV0IG91dHB1dFNlcmllRGF0YSA9IHRoaXMuZ2V0T3V0cHV0RGF0YXNPZlBhcmVudCgpWzBdOy8vIFRPRE86IG11bHRpIG91dHB1dFxyXG4gICAgICAgIGlmKG91dHB1dFNlcmllRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihvdXRwdXRTZXJpZURhdGEuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2VyaWVTZWxlY3Rpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZXJpZVNlbGVjdGlvbnNbaV0udmFsdWUgPT0gb3V0cHV0U2VyaWVEYXRhLnNlcmllLm5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZVNlbGVjdGlvbnMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgc2VyaWVzIHdoaWNoIHJlc3VsdHMgaW4gYSBjeWNsZSBvZiBjYWxjdWxhdGlvbnNcclxuICAgICAgICBpZih0aGlzLnBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2VyaWVTZWxlY3Rpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50IS5jeWNsZUZvdW5kKHNlcmllU2VsZWN0aW9uc1tpXS52YWx1ZSkgPT0gdHJ1ZSl7IC8vIGNoZWNrIGZvciBjeWNsZVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllU2VsZWN0aW9ucy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07ICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWVTZWxlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qod2l0aCBkaXNwbGF5VmFsdWUgYW5kIHZhbHVlKSBvZiBhbGwgc2VyaWVzIGZyb20gdGhlIHBhcmVudCBzZXJpZSBncm91cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBbGxTZXJpZXNGcm9tUGFyZW50U2VyaWVHcm91cCgpOiBBcnJheTxhbnk+e1xyXG4gICAgICAgIGxldCBzZXJpZVNlbGVjdGlvbnMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgIGxldCBzZXJpZUdyb3VwID0gdGhpcy5nZXRTZXJpZUdyb3VwKCk7XHJcbiAgICAgICAgaWYoc2VyaWVHcm91cCAhPSB1bmRlZmluZWQpeyAvLyBJcyBhIHNlcmllIGdyb3VwIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBsZXQgc2VyaWVzID0gc2VyaWVHcm91cC5nZXRTZXJpZXMoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgLy8gU28gZmFyLCBvbmx5IGFsbG93ZWQgdG8gdXNlIHl0IHNlcmllcyBhcyBpbnB1dCBcclxuXHRcdCAgICAgICAgaWYoc2VyaWVzW2ldLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWVOYW1lID0gc2VyaWVzW2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVTZWxlY3Rpb25zLnB1c2goe2Rpc3BsYXlWYWx1ZTogc2VyaWVOYW1lLCB2YWx1ZTogc2VyaWVOYW1lfSk7XHJcblx0XHQgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVTZWxlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T3V0cHV0RGF0YXNPZlBhcmVudCgpOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhPntcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YXMgPSBuZXcgQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YT4oKTtcclxuICAgICAgICBpZih0aGlzLl9wYXJlbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHBhcmVudENoaWxkcyA9IHRoaXMuX3BhcmVudC5nZXRDaGlsZHMoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBwYXJlbnRDaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYocGFyZW50Q2hpbGRzW2ldIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0RGF0YXMucHVzaChwYXJlbnRDaGlsZHNbaV0gYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGFzO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19