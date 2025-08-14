define(["require", "exports", "../calculationDataPoints", "../../../common/series/seriesType", "./calculatorHelper"], function (require, exports, calculationDataPoints_1, seriesType_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ErrorMessageType;
    (function (ErrorMessageType) {
        ErrorMessageType[ErrorMessageType["MissingOrInvalidInput"] = 0] = "MissingOrInvalidInput";
        ErrorMessageType[ErrorMessageType["InvalidOutput"] = 1] = "InvalidOutput";
        ErrorMessageType[ErrorMessageType["InvalidInputType"] = 2] = "InvalidInputType";
        ErrorMessageType[ErrorMessageType["NotEnoughCommonTimestamps"] = 3] = "NotEnoughCommonTimestamps";
        ErrorMessageType[ErrorMessageType["ContainsNaNOrInfinity"] = 4] = "ContainsNaNOrInfinity";
        ErrorMessageType[ErrorMessageType["ContainsZeroInYValues"] = 5] = "ContainsZeroInYValues";
        ErrorMessageType[ErrorMessageType["ContainsFloatingNumbers"] = 6] = "ContainsFloatingNumbers";
        ErrorMessageType[ErrorMessageType["NumberNotAllowedToBeZero"] = 7] = "NumberNotAllowedToBeZero";
        ErrorMessageType[ErrorMessageType["NumberIsNoInt"] = 8] = "NumberIsNoInt";
        ErrorMessageType[ErrorMessageType["NotStrictlyMonotonicallyIncreasingInTime"] = 9] = "NotStrictlyMonotonicallyIncreasingInTime";
        ErrorMessageType[ErrorMessageType["ArraysHaveDifferentLength"] = 10] = "ArraysHaveDifferentLength";
    })(ErrorMessageType || (ErrorMessageType = {}));
    exports.ErrorMessageType = ErrorMessageType;
    exports.ErroMessageType = ErrorMessageType;
    /**
     * Base class for all calculators
     *
     * @class CalculatorBase
     * @implements {ICalculator}
     */
    var CalculatorBase = /** @class */ (function () {
        /**
         * Creates an instance of CalculatorBase.
         *
         * @param {string} id
         * @param {string} displayName
         * @param {string} description
         * @memberof CalculatorBase
         */
        function CalculatorBase(id, displayName, description) {
            this.errorList = new Array();
            this.calculationInputDataContainer = new Array();
            this.calculationOutputDataContainer = new Array();
            this._id = id;
            this._displayName = displayName;
            this._description = description;
        }
        Object.defineProperty(CalculatorBase.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculatorBase.prototype, "displayName", {
            get: function () {
                return this._displayName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculatorBase.prototype, "description", {
            get: function () {
                return this._description;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Empties the error list.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.clearErrors = function () {
            this.errorList = new Array();
        };
        /**
         * Adds an error to the errorlist.
         *
         * @protected
         * @param {string} errorMessage
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addError = function (errorMessage) {
            this.errorList.push(errorMessage);
        };
        /**
         * Returns the error list.
         *
         * @returns {Array<string>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getErrors = function () {
            return this.errorList;
        };
        /**
         * Returns if the error list has entries.
         *
         * @protected
         * @returns {boolean}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.hasErrors = function () {
            return this.errorList.length > 0;
        };
        /**
         * Empties the calculation input data container.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.clearCalculationInputDataContainer = function () {
            this.calculationInputDataContainer = new Array();
        };
        /**
         * Adds calculation input data (data to be calculated) to the calculation input data container.
         *
         * @protected
         * @param {CalculationInputData} calculationData
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addCalculationInputData = function (calculationData) {
            this.calculationInputDataContainer.push(calculationData);
        };
        /**
         * Returns the calculation input data container (data to be calculated).
         *
         * @returns {Array<CalculationInputData>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getCalculationInputDataContainer = function () {
            return this.calculationInputDataContainer;
        };
        /**
         * Empties the calculation output data container.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.clearCalculationOutputDataContainer = function () {
            this.calculationOutputDataContainer = new Array();
        };
        /**
         * Adds calculation output data (data resulting from calculation) to ther calculation output data container.
         *
         * @protected
         * @param {CalculationOutputData} calculationOutputData
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addCalculationOutputData = function (calculationOutputData) {
            this.calculationOutputDataContainer.push(calculationOutputData);
        };
        /**
         * Returns the container holding the calculation output data (data resulting from calculation).
         *
         * @returns {Array<CalculationOutputData>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getCalculationOutputDataContainer = function () {
            return this.calculationOutputDataContainer;
        };
        /**
         * Adds an error to the errorlist of the calculator.
         * Generates the error message based on error type.
         *
         * @protected
         * @param {ErrorMessageType} errorMessageType
         * @param {Array<string>} errorMessageData
         * @returns
         * @memberof CalculatorBase
         *
         */
        CalculatorBase.prototype.addErrorByType = function (errorMessageType, errorMessageData) {
            if (!(errorMessageData.length > 0)) { // log to console if no errorMessageData is provided
                console.error("errorMessageData is missing!");
                return;
            }
            var errorMessage = "";
            var joinedErrorMessageData = errorMessageData.join(", ");
            switch (errorMessageType) { // generate error message according to errror type
                case ErrorMessageType.MissingOrInvalidInput:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is missing or invalid!";
                    break;
                case ErrorMessageType.InvalidOutput:
                    errorMessage = "Calculation Error: Output data for '" + joinedErrorMessageData + "' is invalid!";
                    break;
                case ErrorMessageType.InvalidInputType:
                    errorMessage = "Calculation Error: Input signal type for '" + joinedErrorMessageData + "' is not supported! Please use input signal of type YT.";
                    break;
                case ErrorMessageType.NotEnoughCommonTimestamps:
                    errorMessage = "Calculation Error: The inputs '" + joinedErrorMessageData + "' do not share enough common timestamps!";
                    break;
                case ErrorMessageType.ContainsNaNOrInfinity:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' does contain NaN or Infinity!";
                    break;
                case ErrorMessageType.ContainsZeroInYValues:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' does contain 0 in the y values!";
                    break;
                case ErrorMessageType.ContainsFloatingNumbers:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' does contain floating point numbers in the y values!";
                    break;
                case ErrorMessageType.NumberNotAllowedToBeZero:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is not allowed to be 0!";
                    break;
                case ErrorMessageType.NumberIsNoInt:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is not allowed to be a floating point number!";
                    break;
                case ErrorMessageType.NotStrictlyMonotonicallyIncreasingInTime:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is not strictly monotonically increasing in time!";
                    break;
                case ErrorMessageType.ArraysHaveDifferentLength:
                    errorMessage = "Calculation Error: " + joinedErrorMessageData + " need to have the same length!";
                    break;
                default:
                    errorMessage = "Calculation Error: Calculation of '" + joinedErrorMessageData + "' failed! Unknown reason!";
                    break;
            }
            this.errorList.push(errorMessage);
        };
        /**
         * Hook to provide the default input data
         *
         * @returns {(Array<TCalculationData>)}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getDefaultInputData = function () {
            var defaultInputData = new Array();
            return defaultInputData;
        };
        /**
         * Hook to provide the default output data
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getDefaultOutputData = function () {
            var defaultOutputData = new Array();
            return defaultOutputData;
        };
        /**
         * Runs the steps necessary to perform the calculation of the calculator.
         *
         * @param {(Array<TCalculationData>)} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.calculate = function (inputData) {
            this.clearErrors();
            this.clearCalculationInputDataContainer();
            this.clearCalculationOutputDataContainer();
            this.extractCalculationData(inputData);
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.prepareCalculationData();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.verifyCalculationInputData();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.executeAlgorithm();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.verifyCalculationOutputData();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            var outputData = this.generateOutputData();
            return outputData;
        };
        /**
         * Extracts the calculation input data from the calculator input.
         * Checks if input is not of type XY or FFT.
         *
         * @private
         * @param {(Array<TCalculationData>)} inputData
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.extractCalculationData = function (inputData) {
            var _this = this;
            var invalidSerieTypesNames = new Array();
            inputData.forEach(function (input) {
                var calculationData = {
                    data: input.getData(),
                    name: input.getDisplayName()
                };
                if (input.type == seriesType_1.SeriesType.fftSeries || input.type == seriesType_1.SeriesType.xySeries) {
                    invalidSerieTypesNames.push(input.getDisplayName());
                }
                _this.addCalculationInputData(calculationData);
            });
            if (invalidSerieTypesNames.length > 0) {
                this.addErrorByType(ErrorMessageType.InvalidInputType, invalidSerieTypesNames);
            }
        };
        /**
         * Hook for preparing the calculation input data.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.prepareCalculationData = function () { };
        /**
         * Hook for verifying calculation input data.
         * Performs basic verification as default.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.verifyCalculationInputData = function () {
            var _this = this;
            this.getCalculationInputDataContainer().forEach(function (calculationInputData) {
                if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(calculationInputData.data)) { //calculationInputData is a signal
                    if (!calculatorHelper_1.CalculatorHelper.isSignalLongerThanMinimum(calculationInputData.data)) {
                        _this.addErrorByType(ErrorMessageType.MissingOrInvalidInput, [calculationInputData.name]);
                    }
                    else if (calculatorHelper_1.CalculatorHelper.containsNaNOrInfinityInYvalue(calculationInputData.data)) {
                        _this.addErrorByType(ErrorMessageType.ContainsNaNOrInfinity, [calculationInputData.name]);
                    }
                }
                if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(calculationInputData.data)) { //calculationInputData is a number
                    if (Number.isNaN(calculationInputData.data)) { //NaN means no data provided 
                        _this.addErrorByType(ErrorMessageType.MissingOrInvalidInput, [calculationInputData.name]);
                    }
                    else if (!calculatorHelper_1.CalculatorHelper.isValidNumber(calculationInputData.data)) {
                        _this.addErrorByType(ErrorMessageType.ContainsNaNOrInfinity, [calculationInputData.name]);
                    }
                }
                if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(calculationInputData.data)) {
                    if (calculationInputData.data === "") {
                        _this.addErrorByType(ErrorMessageType.MissingOrInvalidInput, [calculationInputData.name]);
                    }
                }
            });
        };
        /**
         * Hook for executing the algorithm/calculation.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.executeAlgorithm = function () { };
        /**
         * Hook for verifying the calculation result.
         * Performs basic verfication as default.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.verifyCalculationOutputData = function () {
            var _this = this;
            this.getCalculationOutputDataContainer().forEach(function (calculationOutputData) {
                if (!calculatorHelper_1.CalculatorHelper.isSignalLongerThanMinimum(calculationOutputData.data)) {
                    _this.addErrorByType(ErrorMessageType.InvalidOutput, [calculationOutputData.name]);
                }
                else if (calculatorHelper_1.CalculatorHelper.containsNaNOrInfinityInYvalue(calculationOutputData.data)) {
                    _this.addErrorByType(ErrorMessageType.ContainsNaNOrInfinity, [calculationOutputData.name]);
                }
            });
        };
        /**
         * Generates output data of the calculator based on the data in the calculationOutputDataContainer.
         *
         * @private
         * @returns {Array<CalculationDataPoints>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.generateOutputData = function () {
            var outputData = new Array();
            var calculationOutputDataContainer = this.getCalculationOutputDataContainer();
            calculationOutputDataContainer.forEach(function (calculationOutputData) {
                outputData.push(new calculationDataPoints_1.CalculationDataPoints(calculationOutputData.id, calculationOutputData.name, calculationOutputData.value, calculationOutputData.data));
            });
            if (calculationOutputDataContainer.length == 0) {
                outputData = this.getDefaultOutputData();
            }
            return outputData;
        };
        /**
         * Returns the calculation data used by the algorithm of the calculator after all preparations done.
         *
         * @returns {(Array<TCalculationData>)}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getActualInputData = function () {
            var inputData = this.getDefaultInputData();
            var calculationData = this.getCalculationInputDataContainer();
            for (var i = 0; i < inputData.length && i < calculationData.length; i++) {
                inputData[i].setData(calculationData[i].data);
            }
            return inputData;
        };
        return CalculatorBase;
    }());
    exports.CalculatorBase = CalculatorBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRvckJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2NhbGN1bGF0b3JCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BLElBQUssZ0JBWUo7SUFaRCxXQUFLLGdCQUFnQjtRQUNqQix5RkFBcUIsQ0FBQTtRQUNyQix5RUFBYSxDQUFBO1FBQ2IsK0VBQWdCLENBQUE7UUFDaEIsaUdBQXlCLENBQUE7UUFDekIseUZBQXFCLENBQUE7UUFDckIseUZBQXFCLENBQUE7UUFDckIsNkZBQXVCLENBQUE7UUFDdkIsK0ZBQXdCLENBQUE7UUFDeEIseUVBQWEsQ0FBQTtRQUNiLCtIQUF3QyxDQUFBO1FBQ3hDLGtHQUF5QixDQUFBO0lBQzdCLENBQUMsRUFaSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBWXBCO0lBeWN1Qiw0Q0FBZ0I7SUFBc0IsMkNBQWU7SUE1YjdFOzs7OztPQUtHO0lBQ0g7UUF5Qkk7Ozs7Ozs7V0FPRztRQUNILHdCQUFzQixFQUFVLEVBQUUsV0FBbUIsRUFBRSxXQUFtQjtZQTFCbEUsY0FBUyxHQUFrQixJQUFJLEtBQUssRUFBVSxDQUFDO1lBRS9DLGtDQUE2QixHQUFnQyxJQUFJLEtBQUssRUFBd0IsQ0FBQztZQUUvRixtQ0FBOEIsR0FBaUMsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUF1QnRHLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDcEMsQ0FBQztRQXhCRCxzQkFBVyw4QkFBRTtpQkFBYjtnQkFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDcEIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx1Q0FBVztpQkFBdEI7Z0JBQ0ks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SSxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0MsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7WUFFOUQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9ELFNBQVMsQ0FBQyxDQUFDLENBQXFCLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0RTtZQUVELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFTCxxQkFBQztJQUFELENBQUMsQUFwYkQsSUFvYkM7SUFFTyx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jYWxjdWxhdG9ySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3Nlcmllcy9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEsIENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuXHJcbmVudW0gRXJyb3JNZXNzYWdlVHlwZSB7XHJcbiAgICBNaXNzaW5nT3JJbnZhbGlkSW5wdXQsXHJcbiAgICBJbnZhbGlkT3V0cHV0LFxyXG4gICAgSW52YWxpZElucHV0VHlwZSxcclxuICAgIE5vdEVub3VnaENvbW1vblRpbWVzdGFtcHMsXHJcbiAgICBDb250YWluc05hTk9ySW5maW5pdHksXHJcbiAgICBDb250YWluc1plcm9JbllWYWx1ZXMsXHJcbiAgICBDb250YWluc0Zsb2F0aW5nTnVtYmVycyxcclxuICAgIE51bWJlck5vdEFsbG93ZWRUb0JlWmVybyxcclxuICAgIE51bWJlcklzTm9JbnQsXHJcbiAgICBOb3RTdHJpY3RseU1vbm90b25pY2FsbHlJbmNyZWFzaW5nSW5UaW1lLFxyXG4gICAgQXJyYXlzSGF2ZURpZmZlcmVudExlbmd0aFxyXG59XHJcblxyXG50eXBlIENhbGN1bGF0aW9uSW5wdXREYXRhID0ge1xyXG4gICAgZGF0YTogbnVtYmVyIHwgc3RyaW5nIHwgQXJyYXk8SVBvaW50PixcclxuICAgIG5hbWU6IHN0cmluZ1xyXG59XHJcbnR5cGUgQ2FsY3VsYXRpb25PdXRwdXREYXRhID0ge1xyXG4gICAgZGF0YTogQXJyYXk8SVBvaW50PixcclxuICAgIHZhbHVlOiBzdHJpbmcsXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBpZDogc3RyaW5nLFxyXG59XHJcblxyXG4vKipcclxuICogQmFzZSBjbGFzcyBmb3IgYWxsIGNhbGN1bGF0b3JzXHJcbiAqXHJcbiAqIEBjbGFzcyBDYWxjdWxhdG9yQmFzZVxyXG4gKiBAaW1wbGVtZW50cyB7SUNhbGN1bGF0b3J9XHJcbiAqL1xyXG5jbGFzcyBDYWxjdWxhdG9yQmFzZSBpbXBsZW1lbnRzIElDYWxjdWxhdG9ye1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZGlzcGxheU5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2Rlc2NyaXB0aW9uOiBzdHJpbmc7XHJcblxyXG5cclxuICAgIHByaXZhdGUgZXJyb3JMaXN0OiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyOiBBcnJheTxDYWxjdWxhdGlvbklucHV0RGF0YT4gPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25JbnB1dERhdGE+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXI6IEFycmF5PENhbGN1bGF0aW9uT3V0cHV0RGF0YT4gPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25PdXRwdXREYXRhPigpO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkaXNwbGF5TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDYWxjdWxhdG9yQmFzZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlzcGxheU5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXNjcmlwdGlvblxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogRW1wdGllcyB0aGUgZXJyb3IgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNsZWFyRXJyb3JzKCkge1xyXG4gICAgICAgIHRoaXMuZXJyb3JMaXN0ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gZXJyb3IgdG8gdGhlIGVycm9ybGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JNZXNzYWdlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZEVycm9yKGVycm9yTWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvckxpc3QucHVzaChlcnJvck1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZXJyb3IgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RXJyb3JzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaWYgdGhlIGVycm9yIGxpc3QgaGFzIGVudHJpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGhhc0Vycm9ycygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvckxpc3QubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbXB0aWVzIHRoZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhIGNvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNsZWFyQ2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbklucHV0RGF0YT4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgY2FsY3VsYXRpb24gaW5wdXQgZGF0YSAoZGF0YSB0byBiZSBjYWxjdWxhdGVkKSB0byB0aGUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YSBjb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtDYWxjdWxhdGlvbklucHV0RGF0YX0gY2FsY3VsYXRpb25EYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZENhbGN1bGF0aW9uSW5wdXREYXRhKGNhbGN1bGF0aW9uRGF0YTogQ2FsY3VsYXRpb25JbnB1dERhdGEpIHtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyLnB1c2goY2FsY3VsYXRpb25EYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNhbGN1bGF0aW9uIGlucHV0IGRhdGEgY29udGFpbmVyIChkYXRhIHRvIGJlIGNhbGN1bGF0ZWQpLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbklucHV0RGF0YT59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk6IEFycmF5PENhbGN1bGF0aW9uSW5wdXREYXRhPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1wdGllcyB0aGUgY2FsY3VsYXRpb24gb3V0cHV0IGRhdGEgY29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY2xlYXJDYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25PdXRwdXREYXRhPigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YSAoZGF0YSByZXN1bHRpbmcgZnJvbSBjYWxjdWxhdGlvbikgdG8gdGhlciBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YSBjb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtDYWxjdWxhdGlvbk91dHB1dERhdGF9IGNhbGN1bGF0aW9uT3V0cHV0RGF0YVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhZGRDYWxjdWxhdGlvbk91dHB1dERhdGEoY2FsY3VsYXRpb25PdXRwdXREYXRhOiBDYWxjdWxhdGlvbk91dHB1dERhdGEpIHtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lci5wdXNoKGNhbGN1bGF0aW9uT3V0cHV0RGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb250YWluZXIgaG9sZGluZyB0aGUgY2FsY3VsYXRpb24gb3V0cHV0IGRhdGEgKGRhdGEgcmVzdWx0aW5nIGZyb20gY2FsY3VsYXRpb24pLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbk91dHB1dERhdGE+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRDYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIoKTogQXJyYXk8Q2FsY3VsYXRpb25PdXRwdXREYXRhPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGVycm9yIHRvIHRoZSBlcnJvcmxpc3Qgb2YgdGhlIGNhbGN1bGF0b3IuXHJcbiAgICAgKiBHZW5lcmF0ZXMgdGhlIGVycm9yIG1lc3NhZ2UgYmFzZWQgb24gZXJyb3IgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yTWVzc2FnZVR5cGV9IGVycm9yTWVzc2FnZVR5cGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZXJyb3JNZXNzYWdlRGF0YVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG5cdCAqIFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWRkRXJyb3JCeVR5cGUoZXJyb3JNZXNzYWdlVHlwZTogRXJyb3JNZXNzYWdlVHlwZSwgZXJyb3JNZXNzYWdlRGF0YTogQXJyYXk8c3RyaW5nPil7XHJcblxyXG4gICAgICAgIGlmKCEoZXJyb3JNZXNzYWdlRGF0YS5sZW5ndGggPiAwKSkgeyAvLyBsb2cgdG8gY29uc29sZSBpZiBubyBlcnJvck1lc3NhZ2VEYXRhIGlzIHByb3ZpZGVkXHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3JNZXNzYWdlRGF0YSBpcyBtaXNzaW5nIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGpvaW5lZEVycm9yTWVzc2FnZURhdGEgPSBlcnJvck1lc3NhZ2VEYXRhLmpvaW4oXCIsIFwiKTtcclxuICAgICAgICBcclxuICAgICAgICBzd2l0Y2ggKGVycm9yTWVzc2FnZVR5cGUpIHsgLy8gZ2VuZXJhdGUgZXJyb3IgbWVzc2FnZSBhY2NvcmRpbmcgdG8gZXJycm9yIHR5cGVcclxuXHJcbiAgICAgICAgICAgIGNhc2UgRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQ6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBEYXRhIGZvciAnXCIgKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICsgXCInIGlzIG1pc3Npbmcgb3IgaW52YWxpZCFcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVycm9yTWVzc2FnZVR5cGUuSW52YWxpZE91dHB1dDpcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2FsY3VsYXRpb24gRXJyb3I6IE91dHB1dCBkYXRhIGZvciAnXCIgKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICsgXCInIGlzIGludmFsaWQhXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFcnJvck1lc3NhZ2VUeXBlLkludmFsaWRJbnB1dFR5cGU6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBJbnB1dCBzaWduYWwgdHlwZSBmb3IgJ1wiICsgam9pbmVkRXJyb3JNZXNzYWdlRGF0YSArIFwiJyBpcyBub3Qgc3VwcG9ydGVkISBQbGVhc2UgdXNlIGlucHV0IHNpZ25hbCBvZiB0eXBlIFlULlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRXJyb3JNZXNzYWdlVHlwZS5Ob3RFbm91Z2hDb21tb25UaW1lc3RhbXBzOlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0cyAnXCIgKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICsgXCInIGRvIG5vdCBzaGFyZSBlbm91Z2ggY29tbW9uIHRpbWVzdGFtcHMhXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zTmFOT3JJbmZpbml0eTpcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2FsY3VsYXRpb24gRXJyb3I6IERhdGEgZm9yICdcIiArIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgKyBcIicgZG9lcyBjb250YWluIE5hTiBvciBJbmZpbml0eSFcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVycm9yTWVzc2FnZVR5cGUuQ29udGFpbnNaZXJvSW5ZVmFsdWVzOlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogRGF0YSBmb3IgJ1wiICsgam9pbmVkRXJyb3JNZXNzYWdlRGF0YSArIFwiJyBkb2VzIGNvbnRhaW4gMCBpbiB0aGUgeSB2YWx1ZXMhXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zRmxvYXRpbmdOdW1iZXJzOlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogRGF0YSBmb3IgJ1wiICsgam9pbmVkRXJyb3JNZXNzYWdlRGF0YSArIFwiJyBkb2VzIGNvbnRhaW4gZmxvYXRpbmcgcG9pbnQgbnVtYmVycyBpbiB0aGUgeSB2YWx1ZXMhXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFcnJvck1lc3NhZ2VUeXBlLk51bWJlck5vdEFsbG93ZWRUb0JlWmVybzpcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2FsY3VsYXRpb24gRXJyb3I6IERhdGEgZm9yICdcIiArIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgKyBcIicgaXMgbm90IGFsbG93ZWQgdG8gYmUgMCFcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVycm9yTWVzc2FnZVR5cGUuTnVtYmVySXNOb0ludDpcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2FsY3VsYXRpb24gRXJyb3I6IERhdGEgZm9yICdcIiArIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgKyBcIicgaXMgbm90IGFsbG93ZWQgdG8gYmUgYSBmbG9hdGluZyBwb2ludCBudW1iZXIhXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFcnJvck1lc3NhZ2VUeXBlLk5vdFN0cmljdGx5TW9ub3RvbmljYWxseUluY3JlYXNpbmdJblRpbWU6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBEYXRhIGZvciAnXCIgKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICsgXCInIGlzIG5vdCBzdHJpY3RseSBtb25vdG9uaWNhbGx5IGluY3JlYXNpbmcgaW4gdGltZSFcIlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRXJyb3JNZXNzYWdlVHlwZS5BcnJheXNIYXZlRGlmZmVyZW50TGVuZ3RoOlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogXCIgKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICsgXCIgbmVlZCB0byBoYXZlIHRoZSBzYW1lIGxlbmd0aCFcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogQ2FsY3VsYXRpb24gb2YgJ1wiKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICtcIicgZmFpbGVkISBVbmtub3duIHJlYXNvbiFcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5lcnJvckxpc3QucHVzaChlcnJvck1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvb2sgdG8gcHJvdmlkZSB0aGUgZGVmYXVsdCBpbnB1dCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhBcnJheTxUQ2FsY3VsYXRpb25EYXRhPil9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4ge1xyXG5cclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IG5ldyBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPigpO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0SW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9vayB0byBwcm92aWRlIHRoZSBkZWZhdWx0IG91dHB1dCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz57XHJcblxyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRPdXRwdXREYXRhO1xyXG4gICAgfVxyXG4gICAgICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSdW5zIHRoZSBzdGVwcyBuZWNlc3NhcnkgdG8gcGVyZm9ybSB0aGUgY2FsY3VsYXRpb24gb2YgdGhlIGNhbGN1bGF0b3IuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4pfSBpbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGUoaW5wdXREYXRhOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPik6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG5cclxuICAgICAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICB0aGlzLmV4dHJhY3RDYWxjdWxhdGlvbkRhdGEoaW5wdXREYXRhKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmVwYXJlQ2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmhhc0Vycm9ycygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmV4ZWN1dGVBbGdvcml0aG0oKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJpZnlDYWxjdWxhdGlvbk91dHB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG91dHB1dERhdGE6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4gPSB0aGlzLmdlbmVyYXRlT3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4dHJhY3RzIHRoZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhIGZyb20gdGhlIGNhbGN1bGF0b3IgaW5wdXQuXHJcbiAgICAgKiBDaGVja3MgaWYgaW5wdXQgaXMgbm90IG9mIHR5cGUgWFkgb3IgRkZULlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxUQ2FsY3VsYXRpb25EYXRhPil9IGlucHV0RGF0YVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXh0cmFjdENhbGN1bGF0aW9uRGF0YShpbnB1dERhdGE6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KSB7XHJcblxyXG4gICAgICAgIGxldCBpbnZhbGlkU2VyaWVUeXBlc05hbWVzOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgaW5wdXREYXRhLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgIGRhdGE6IGlucHV0LmdldERhdGEoKSxcclxuICAgICAgICAgICAgICAgbmFtZTogaW5wdXQuZ2V0RGlzcGxheU5hbWUoKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYoaW5wdXQudHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcyB8fCBpbnB1dC50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGludmFsaWRTZXJpZVR5cGVzTmFtZXMucHVzaChpbnB1dC5nZXREaXNwbGF5TmFtZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hZGRDYWxjdWxhdGlvbklucHV0RGF0YShjYWxjdWxhdGlvbkRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZihpbnZhbGlkU2VyaWVUeXBlc05hbWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkludmFsaWRJbnB1dFR5cGUsIGludmFsaWRTZXJpZVR5cGVzTmFtZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb29rIGZvciBwcmVwYXJpbmcgdGhlIGNhbGN1bGF0aW9uIGlucHV0IGRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCAgcHJlcGFyZUNhbGN1bGF0aW9uRGF0YSgpIHt9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9vayBmb3IgdmVyaWZ5aW5nIGNhbGN1bGF0aW9uIGlucHV0IGRhdGEuXHJcbiAgICAgKiBQZXJmb3JtcyBiYXNpYyB2ZXJpZmljYXRpb24gYXMgZGVmYXVsdC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCl7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCkuZm9yRWFjaCgoY2FsY3VsYXRpb25JbnB1dERhdGEpID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChjYWxjdWxhdGlvbklucHV0RGF0YS5kYXRhKSkgeyAvL2NhbGN1bGF0aW9uSW5wdXREYXRhIGlzIGEgc2lnbmFsXHJcbiAgICAgICAgICAgICAgICBpZighQ2FsY3VsYXRvckhlbHBlci5pc1NpZ25hbExvbmdlclRoYW5NaW5pbXVtKGNhbGN1bGF0aW9uSW5wdXREYXRhLmRhdGEpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFtjYWxjdWxhdGlvbklucHV0RGF0YS5uYW1lXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoQ2FsY3VsYXRvckhlbHBlci5jb250YWluc05hTk9ySW5maW5pdHlJbll2YWx1ZShjYWxjdWxhdGlvbklucHV0RGF0YS5kYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuQ29udGFpbnNOYU5PckluZmluaXR5LCBbY2FsY3VsYXRpb25JbnB1dERhdGEubmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihjYWxjdWxhdGlvbklucHV0RGF0YS5kYXRhKSl7IC8vY2FsY3VsYXRpb25JbnB1dERhdGEgaXMgYSBudW1iZXJcclxuICAgICAgICAgICAgICAgIGlmKE51bWJlci5pc05hTihjYWxjdWxhdGlvbklucHV0RGF0YS5kYXRhKSl7IC8vTmFOIG1lYW5zIG5vIGRhdGEgcHJvdmlkZWQgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW2NhbGN1bGF0aW9uSW5wdXREYXRhLm5hbWVdKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKCFDYWxjdWxhdG9ySGVscGVyLmlzVmFsaWROdW1iZXIoY2FsY3VsYXRpb25JbnB1dERhdGEuZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuQ29udGFpbnNOYU5PckluZmluaXR5LCBbY2FsY3VsYXRpb25JbnB1dERhdGEubmFtZV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKGNhbGN1bGF0aW9uSW5wdXREYXRhLmRhdGEpKXtcclxuICAgICAgICAgICAgICAgIGlmKGNhbGN1bGF0aW9uSW5wdXREYXRhLmRhdGEgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbY2FsY3VsYXRpb25JbnB1dERhdGEubmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9vayBmb3IgZXhlY3V0aW5nIHRoZSBhbGdvcml0aG0vY2FsY3VsYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCAgZXhlY3V0ZUFsZ29yaXRobSgpIHt9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9vayBmb3IgdmVyaWZ5aW5nIHRoZSBjYWxjdWxhdGlvbiByZXN1bHQuXHJcbiAgICAgKiBQZXJmb3JtcyBiYXNpYyB2ZXJmaWNhdGlvbiBhcyBkZWZhdWx0LlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25PdXRwdXREYXRhKCl7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyKCkuZm9yRWFjaCgoY2FsY3VsYXRpb25PdXRwdXREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighQ2FsY3VsYXRvckhlbHBlci5pc1NpZ25hbExvbmdlclRoYW5NaW5pbXVtKGNhbGN1bGF0aW9uT3V0cHV0RGF0YS5kYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5JbnZhbGlkT3V0cHV0LCBbY2FsY3VsYXRpb25PdXRwdXREYXRhLm5hbWVdKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKENhbGN1bGF0b3JIZWxwZXIuY29udGFpbnNOYU5PckluZmluaXR5SW5ZdmFsdWUoY2FsY3VsYXRpb25PdXRwdXREYXRhLmRhdGEpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zTmFOT3JJbmZpbml0eSwgW2NhbGN1bGF0aW9uT3V0cHV0RGF0YS5uYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBvdXRwdXQgZGF0YSBvZiB0aGUgY2FsY3VsYXRvciBiYXNlZCBvbiB0aGUgZGF0YSBpbiB0aGUgY2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdlbmVyYXRlT3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyKClcclxuICAgICAgICBcclxuICAgICAgICBjYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIuZm9yRWFjaCgoY2FsY3VsYXRpb25PdXRwdXREYXRhKT0+e1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKGNhbGN1bGF0aW9uT3V0cHV0RGF0YS5pZCwgY2FsY3VsYXRpb25PdXRwdXREYXRhLm5hbWUsIGNhbGN1bGF0aW9uT3V0cHV0RGF0YS52YWx1ZSwgY2FsY3VsYXRpb25PdXRwdXREYXRhLmRhdGEpKTsgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKGNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lci5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBvdXRwdXREYXRhID0gdGhpcy5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNhbGN1bGF0aW9uIGRhdGEgdXNlZCBieSB0aGUgYWxnb3JpdGhtIG9mIHRoZSBjYWxjdWxhdG9yIGFmdGVyIGFsbCBwcmVwYXJhdGlvbnMgZG9uZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KX1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWN0dWFsSW5wdXREYXRhKCk6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+IHtcclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gdGhpcy5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YSA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaTxpbnB1dERhdGEubGVuZ3RoICYmIGk8Y2FsY3VsYXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIChpbnB1dERhdGFbaV0gYXMgQ2FsY3VsYXRpb25EYXRhKS5zZXREYXRhKGNhbGN1bGF0aW9uRGF0YVtpXS5kYXRhKTsgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQge0NhbGN1bGF0b3JCYXNlLCBFcnJvck1lc3NhZ2VUeXBlLCBFcnJvck1lc3NhZ2VUeXBlIGFzIEVycm9NZXNzYWdlVHlwZX07Il19