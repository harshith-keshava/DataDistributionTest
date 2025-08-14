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
define(["require", "exports", "./calculatorBase", "../calculationDataPoints", "../calculationDataNumberOrPoints", "../../point", "../calculationDataDisplayInfo", "./calculatorHelper", "../calculationDataNumber"], function (require, exports, calculatorBase_1, calculationDataPoints_1, calculationDataNumberOrPoints_1, point_1, calculationDataDisplayInfo_1, calculatorHelper_1, calculationDataNumber_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ModuloCalculator = /** @class */ (function (_super) {
        __extends(ModuloCalculator, _super);
        function ModuloCalculator() {
            var _this = _super.call(this, "modulo", "Modulo", "Modulo calculation between dividend a and divisor b") || this;
            _this.inputId1 = "DividendA";
            _this.inputId2 = "DivisorB";
            _this.inputId3 = "DivisionByZero";
            _this.inputName1 = "Dividend a";
            _this.inputName2 = "Divisor b";
            _this.inputName3 = "Division by zero";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "modulo";
            return _this;
        }
        ModuloCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputId1, this.inputName1, 0, "Input is a signal: Each Y value of the signal is used for modulo calculation; Input is a constant: Constant used for modulo calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputId2, this.inputName2, 0, "Input is a signal: Each Y value of the signal is used for modulo calculation; Input is a constant: Constant used for modulo calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputId3, this.inputName3, 0, "Select if zero in the divisor cause an error or should be removed", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(true, false, this.getDivisionByZeroErrorHandling())));
            return defaultInputData;
        };
        ModuloCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        ModuloCalculator.prototype.prepareCalculationData = function () {
            _super.prototype.prepareCalculationData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var dividend = calculationInputDataContainer[0];
            var divisor = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(dividend.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(dividend.data)
                && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(divisor.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(divisor.data)) {
                var preparedPointArrays = calculatorHelper_1.CalculatorHelper.filterMatchingPointsByXvalue({
                    pointArray1: dividend.data,
                    pointArray2: divisor.data
                });
                calculationInputDataContainer[0].data = preparedPointArrays.pointArray1;
                calculationInputDataContainer[1].data = preparedPointArrays.pointArray2;
                if (!calculatorHelper_1.CalculatorHelper.isValidSignal(dividend.data) || !calculatorHelper_1.CalculatorHelper.isValidSignal(divisor.data)) {
                    this.addErrorByType(calculatorBase_1.ErrorMessageType.NotEnoughCommonTimestamps, [dividend.name, divisor.name]);
                }
            }
        };
        /**
         * Review Lukas Obersamer:
         * The cyclomatic complexity of this function is too high, but that does not reflext the complexity for humans to understand it.
         * The complexity of understing this method is in fact super simple. It is a "flat list" of input checks. Therefore the method may remain in this form.
         *
         * @protected
         * @returns
         * @memberof ModuloCalculator
         */
        ModuloCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            //retrieve calculation input data
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var dividend = calculationInputDataContainer[0];
            var divisor = calculationInputDataContainer[1];
            var divisionByZero = calculationInputDataContainer[2];
            if (dividend == undefined || calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(dividend.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (divisor == undefined || calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(divisor.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
            if (divisionByZero == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(divisionByZero.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName3]);
            }
            if (this.hasErrors()) {
                return;
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(dividend.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(divisor.data)) {
                this.addError("Calculation Error: It is not supported to operate with just two numbers!");
            }
            //Checking if the divisor being a number is 0
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(divisor.data) && divisor.data === 0) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.NumberNotAllowedToBeZero, [this.inputName2]);
            }
            //Checking if the signal as divisor contains 0
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(divisor.data) && divisionByZero.data == 0 && calculatorHelper_1.CalculatorHelper.amountOfZerosInIPointArrayInYValues(divisor.data) != 0) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.ContainsZeroInYValues, [this.inputName2]);
            }
            //Checking if the signal as divisor contains more than two values which are not 0
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(divisor.data) && (divisor.data.length - calculatorHelper_1.CalculatorHelper.amountOfZerosInIPointArrayInYValues(divisor.data)) < 2) {
                this.addError("Calculation Error: The divisor being a signal has less than two values which are not 0");
            }
            //Checking if the input signal contains floating point numbers
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(dividend.data) && calculatorHelper_1.CalculatorHelper.iPointArrayHasFloatInYValues(dividend.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.ContainsFloatingNumbers, [this.inputName1]);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(divisor.data) && calculatorHelper_1.CalculatorHelper.iPointArrayHasFloatInYValues(divisor.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.ContainsFloatingNumbers, [this.inputName2]);
            }
            //Checking if the input number is a floating point numbers
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(dividend.data) && !Number.isSafeInteger(dividend.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.NumberIsNoInt, [this.inputName1]);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(divisor.data) && !Number.isSafeInteger(divisor.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.NumberIsNoInt, [this.inputName2]);
            }
        };
        ModuloCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            //retrieve calculation input data and initialize result
            var calculationInputData = this.getCalculationInputDataContainer();
            var result = new Array();
            var inputData1 = calculationInputData[0];
            var inputData2 = calculationInputData[1];
            //input1 = signal input2 = constant
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData2.data)) {
                result = this.calcSignalModuloConstant(inputData1.data, inputData2.data);
            }
            //input1 = constant input2 = signal
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data)) {
                result = this.calcConstantModuloSignal(inputData1.data, inputData2.data);
            }
            //input1 = signal input2 = signal
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data)) {
                result = this.calcSignalModuloSignal(inputData1.data, inputData2.data);
            }
            //add the result of the calculation to the calculationOutpuContainer
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName,
                id: this.outputId
            });
        };
        /**
         * Calculate "modulo" with each Y-IPoint-Array value and the given number
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof ModuloCalculator
         */
        ModuloCalculator.prototype.calcSignalModuloConstant = function (inputSignal, inputNumber) {
            var result = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                if (inputNumber != 0) {
                    result.push(new point_1.Point(inputSignal[i].x, inputSignal[i].y % inputNumber));
                }
            }
            return result;
        };
        /**
         * Calculate "modulo" with the given number and each Y-IPoint-Array value
         *
         * @private
         * @param {number} inputNumber
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof ModuloCalculator
         */
        ModuloCalculator.prototype.calcConstantModuloSignal = function (inputNumber, inputSignal) {
            var result = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                if (inputSignal[i].y != 0) {
                    result.push(new point_1.Point(inputSignal[i].x, inputNumber % inputSignal[i].y));
                }
            }
            return result;
        };
        /**
         * Applies "modulo" between two Y-IPoint-Array values
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof ModuloCalculator
         */
        ModuloCalculator.prototype.calcSignalModuloSignal = function (inputSignal1, inputSignal2) {
            var result = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Use only signals with same sample count for modulo calculation     
                for (var i = 0; i < inputSignal1.length; i++) {
                    if (inputSignal2[i].y != 0) {
                        result.push(new point_1.Point(inputSignal1[i].x, inputSignal1[i].y % inputSignal2[i].y));
                    }
                }
            }
            else {
                this.addError("Calculation Error: The input signals don't have the same number of points!");
            }
            return result;
        };
        /**
         * Returns the possibilities of a divison with 0
         *
         * @private
         * @returns {Array<IValueListItem>}
         * @memberof DivCalculator
         */
        ModuloCalculator.prototype.getDivisionByZeroErrorHandling = function () {
            var divisionByZeroPossibilities = new Array();
            divisionByZeroPossibilities.push({ value: "0", displayValue: "Cause error" });
            divisionByZeroPossibilities.push({ value: "1", displayValue: "Points are removed" });
            return divisionByZeroPossibilities;
        };
        return ModuloCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.ModuloCalculator = ModuloCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxvQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvbW9kdWxvQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBWUE7UUFBc0Msb0NBQWM7UUFhaEQ7WUFBQSxZQUNJLGtCQUFNLFFBQVEsRUFBRSxRQUFRLEVBQUUscURBQXFELENBQUMsU0FDbkY7WUFiTyxjQUFRLEdBQVUsV0FBVyxDQUFDO1lBQzlCLGNBQVEsR0FBVSxVQUFVLENBQUM7WUFDN0IsY0FBUSxHQUFVLGdCQUFnQixDQUFDO1lBQ25DLGdCQUFVLEdBQVUsWUFBWSxDQUFDO1lBQ2pDLGdCQUFVLEdBQVUsV0FBVyxDQUFDO1lBQ2hDLGdCQUFVLEdBQVUsa0JBQWtCLENBQUM7WUFFdkMsY0FBUSxHQUFXLGNBQWMsQ0FBQztZQUNsQyxnQkFBVSxHQUFXLGVBQWUsQ0FBQztZQUNyQyxpQkFBVyxHQUFXLFFBQVEsQ0FBQzs7UUFJdkMsQ0FBQztRQUVNLDhDQUFtQixHQUExQjtZQUNJLElBQUksZ0JBQWdCLEdBQUcsaUJBQU0sbUJBQW1CLFdBQUUsQ0FBQztZQUVuRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLHlJQUF5SSxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwUixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLHlJQUF5SSxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FB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Ozs7OztXQU1HO1FBQ0sseURBQThCLEdBQXRDO1lBQ0ksSUFBSSwyQkFBMkIsR0FBRyxJQUFJLEtBQUssRUFBa0IsQ0FBQztZQUM5RCwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQW1CLENBQUMsQ0FBQztZQUM5RiwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBbUIsQ0FBQyxDQUFDO1lBQ3JHLE9BQU8sMkJBQTJCLENBQUM7UUFDdkMsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQXpPRCxDQUFzQywrQkFBYyxHQXlPbkQ7SUF6T1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsY3VsYXRvckJhc2UgLCBFcnJvck1lc3NhZ2VUeXBlfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uL3BvaW50XCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2R1bG9DYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgaW5wdXRJZDE6c3RyaW5nID0gXCJEaXZpZGVuZEFcIjtcclxuICAgIHByaXZhdGUgaW5wdXRJZDI6c3RyaW5nID0gXCJEaXZpc29yQlwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dElkMzpzdHJpbmcgPSBcIkRpdmlzaW9uQnlaZXJvXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTE6c3RyaW5nID0gXCJEaXZpZGVuZCBhXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTI6c3RyaW5nID0gXCJEaXZpc29yIGJcIjtcclxuICAgIHByaXZhdGUgaW5wdXROYW1lMzpzdHJpbmcgPSBcIkRpdmlzaW9uIGJ5IHplcm9cIjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBvdXRwdXRJZDogc3RyaW5nID0gXCJPdXRwdXRTaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0TmFtZTogc3RyaW5nID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlOiBzdHJpbmcgPSBcIm1vZHVsb1wiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwibW9kdWxvXCIsIFwiTW9kdWxvXCIsIFwiTW9kdWxvIGNhbGN1bGF0aW9uIGJldHdlZW4gZGl2aWRlbmQgYSBhbmQgZGl2aXNvciBiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0SWQxLCB0aGlzLmlucHV0TmFtZTEsIDAsIFwiSW5wdXQgaXMgYSBzaWduYWw6IEVhY2ggWSB2YWx1ZSBvZiB0aGUgc2lnbmFsIGlzIHVzZWQgZm9yIG1vZHVsbyBjYWxjdWxhdGlvbjsgSW5wdXQgaXMgYSBjb25zdGFudDogQ29uc3RhbnQgdXNlZCBmb3IgbW9kdWxvIGNhbGN1bGF0aW9uXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXRJZDIsIHRoaXMuaW5wdXROYW1lMiwgMCwgXCJJbnB1dCBpcyBhIHNpZ25hbDogRWFjaCBZIHZhbHVlIG9mIHRoZSBzaWduYWwgaXMgdXNlZCBmb3IgbW9kdWxvIGNhbGN1bGF0aW9uOyBJbnB1dCBpcyBhIGNvbnN0YW50OiBDb25zdGFudCB1c2VkIGZvciBtb2R1bG8gY2FsY3VsYXRpb25cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyKHRoaXMuaW5wdXRJZDMsIHRoaXMuaW5wdXROYW1lMywgMCwgXCJTZWxlY3QgaWYgemVybyBpbiB0aGUgZGl2aXNvciBjYXVzZSBhbiBlcnJvciBvciBzaG91bGQgYmUgcmVtb3ZlZFwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8odHJ1ZSwgZmFsc2UsIHRoaXMuZ2V0RGl2aXNpb25CeVplcm9FcnJvckhhbmRsaW5nKCkpKSk7ICAgICAgXHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0SW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdE91dHB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0T3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5vdXRwdXRJZCwgdGhpcy5vdXRwdXROYW1lLCB0aGlzLm91dHB1dFZhbHVlLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRPdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBwcmVwYXJlQ2FsY3VsYXRpb25EYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnByZXBhcmVDYWxjdWxhdGlvbkRhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBsZXQgZGl2aWRlbmQgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgZGl2aXNvciA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoZGl2aWRlbmQuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGRpdmlkZW5kLmRhdGEpXHJcbiAgICAgICAgICAgICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChkaXZpc29yLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbChkaXZpc29yLmRhdGEpKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJlcGFyZWRQb2ludEFycmF5cyA9IENhbGN1bGF0b3JIZWxwZXIuZmlsdGVyTWF0Y2hpbmdQb2ludHNCeVh2YWx1ZSh7IFxyXG4gICAgICAgICAgICAgICAgcG9pbnRBcnJheTE6IGRpdmlkZW5kLmRhdGEsIFxyXG4gICAgICAgICAgICAgICAgcG9pbnRBcnJheTI6IGRpdmlzb3IuZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdLmRhdGEgPSBwcmVwYXJlZFBvaW50QXJyYXlzLnBvaW50QXJyYXkxO1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXS5kYXRhID0gcHJlcGFyZWRQb2ludEFycmF5cy5wb2ludEFycmF5MjtcclxuXHJcbiAgICAgICAgICAgIGlmKCFDYWxjdWxhdG9ySGVscGVyLmlzVmFsaWRTaWduYWwoZGl2aWRlbmQuZGF0YSkgfHwgIUNhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbChkaXZpc29yLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTm90RW5vdWdoQ29tbW9uVGltZXN0YW1wcywgW2RpdmlkZW5kLm5hbWUsIGRpdmlzb3IubmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV2aWV3IEx1a2FzIE9iZXJzYW1lcjpcclxuICAgICAqIFRoZSBjeWNsb21hdGljIGNvbXBsZXhpdHkgb2YgdGhpcyBmdW5jdGlvbiBpcyB0b28gaGlnaCwgYnV0IHRoYXQgZG9lcyBub3QgcmVmbGV4dCB0aGUgY29tcGxleGl0eSBmb3IgaHVtYW5zIHRvIHVuZGVyc3RhbmQgaXQuIFxyXG4gICAgICogVGhlIGNvbXBsZXhpdHkgb2YgdW5kZXJzdGluZyB0aGlzIG1ldGhvZCBpcyBpbiBmYWN0IHN1cGVyIHNpbXBsZS4gSXQgaXMgYSBcImZsYXQgbGlzdFwiIG9mIGlucHV0IGNoZWNrcy4gVGhlcmVmb3JlIHRoZSBtZXRob2QgbWF5IHJlbWFpbiBpbiB0aGlzIGZvcm0uIFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTW9kdWxvQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIudmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgLy9yZXRyaWV2ZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaXZpZGVuZCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBkaXZpc29yID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV07XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uQnlaZXJvID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMl07XHJcblxyXG4gICAgICAgIGlmKGRpdmlkZW5kID09IHVuZGVmaW5lZCB8fCBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoZGl2aWRlbmQuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgaWYoZGl2aXNvciA9PSB1bmRlZmluZWQgfHwgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKGRpdmlzb3IuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMl0pO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgaWYoZGl2aXNpb25CeVplcm8gPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoZGl2aXNpb25CeVplcm8uZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lM10pO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGlmKHRoaXMuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGRpdmlkZW5kLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihkaXZpc29yLmRhdGEpKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IEl0IGlzIG5vdCBzdXBwb3J0ZWQgdG8gb3BlcmF0ZSB3aXRoIGp1c3QgdHdvIG51bWJlcnMhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0NoZWNraW5nIGlmIHRoZSBkaXZpc29yIGJlaW5nIGEgbnVtYmVyIGlzIDBcclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoZGl2aXNvci5kYXRhKSAmJiBkaXZpc29yLmRhdGEgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk51bWJlck5vdEFsbG93ZWRUb0JlWmVybywgW3RoaXMuaW5wdXROYW1lMl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0NoZWNraW5nIGlmIHRoZSBzaWduYWwgYXMgZGl2aXNvciBjb250YWlucyAwXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGRpdmlzb3IuZGF0YSkgJiYgZGl2aXNpb25CeVplcm8uZGF0YSA9PSAwICYmIENhbGN1bGF0b3JIZWxwZXIuYW1vdW50T2ZaZXJvc0luSVBvaW50QXJyYXlJbllWYWx1ZXMoZGl2aXNvci5kYXRhKSAhPSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc1plcm9JbllWYWx1ZXMsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9DaGVja2luZyBpZiB0aGUgc2lnbmFsIGFzIGRpdmlzb3IgY29udGFpbnMgbW9yZSB0aGFuIHR3byB2YWx1ZXMgd2hpY2ggYXJlIG5vdCAwXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGRpdmlzb3IuZGF0YSkgJiYgKGRpdmlzb3IuZGF0YS5sZW5ndGggLSBDYWxjdWxhdG9ySGVscGVyLmFtb3VudE9mWmVyb3NJbklQb2ludEFycmF5SW5ZVmFsdWVzKGRpdmlzb3IuZGF0YSkpIDwgMikge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IFRoZSBkaXZpc29yIGJlaW5nIGEgc2lnbmFsIGhhcyBsZXNzIHRoYW4gdHdvIHZhbHVlcyB3aGljaCBhcmUgbm90IDBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQ2hlY2tpbmcgaWYgdGhlIGlucHV0IHNpZ25hbCBjb250YWlucyBmbG9hdGluZyBwb2ludCBudW1iZXJzXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGRpdmlkZW5kLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuaVBvaW50QXJyYXlIYXNGbG9hdEluWVZhbHVlcyhkaXZpZGVuZC5kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc0Zsb2F0aW5nTnVtYmVycywgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoZGl2aXNvci5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmlQb2ludEFycmF5SGFzRmxvYXRJbllWYWx1ZXMoZGl2aXNvci5kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc0Zsb2F0aW5nTnVtYmVycywgW3RoaXMuaW5wdXROYW1lMl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0NoZWNraW5nIGlmIHRoZSBpbnB1dCBudW1iZXIgaXMgYSBmbG9hdGluZyBwb2ludCBudW1iZXJzXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGRpdmlkZW5kLmRhdGEpICYmICFOdW1iZXIuaXNTYWZlSW50ZWdlcihkaXZpZGVuZC5kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5OdW1iZXJJc05vSW50LCBbdGhpcy5pbnB1dE5hbWUxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihkaXZpc29yLmRhdGEpICYmICFOdW1iZXIuaXNTYWZlSW50ZWdlcihkaXZpc29yLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk51bWJlcklzTm9JbnQsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVBbGdvcml0aG0oKSB7XHJcbiAgICAgICAgc3VwZXIuZXhlY3V0ZUFsZ29yaXRobSgpXHJcblxyXG4gICAgICAgIC8vcmV0cmlldmUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YSBhbmQgaW5pdGlhbGl6ZSByZXN1bHRcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGEgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dERhdGExID0gY2FsY3VsYXRpb25JbnB1dERhdGFbMF07XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YTIgPSBjYWxjdWxhdGlvbklucHV0RGF0YVsxXTtcclxuXHJcbiAgICAgICAgLy9pbnB1dDEgPSBzaWduYWwgaW5wdXQyID0gY29uc3RhbnRcclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXREYXRhMS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXREYXRhMi5kYXRhKSl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY2FsY1NpZ25hbE1vZHVsb0NvbnN0YW50KGlucHV0RGF0YTEuZGF0YSwgaW5wdXREYXRhMi5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pbnB1dDEgPSBjb25zdGFudCBpbnB1dDIgPSBzaWduYWxcclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXREYXRhMS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXREYXRhMi5kYXRhKSl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY2FsY0NvbnN0YW50TW9kdWxvU2lnbmFsKGlucHV0RGF0YTEuZGF0YSwgaW5wdXREYXRhMi5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pbnB1dDEgPSBzaWduYWwgaW5wdXQyID0gc2lnbmFsXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTIuZGF0YSkpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNhbGNTaWduYWxNb2R1bG9TaWduYWwoaW5wdXREYXRhMS5kYXRhLCBpbnB1dERhdGEyLmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGQgdGhlIHJlc3VsdCBvZiB0aGUgY2FsY3VsYXRpb24gdG8gdGhlIGNhbGN1bGF0aW9uT3V0cHVDb250YWluZXJcclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZSxcclxuICAgICAgICAgICAgaWQ6IHRoaXMub3V0cHV0SWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgXCJtb2R1bG9cIiB3aXRoIGVhY2ggWS1JUG9pbnQtQXJyYXkgdmFsdWUgYW5kIHRoZSBnaXZlbiBudW1iZXJcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwgXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5wdXROdW1iZXJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fSBcclxuICAgICAqIEBtZW1iZXJvZiBNb2R1bG9DYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY1NpZ25hbE1vZHVsb0NvbnN0YW50KGlucHV0U2lnbmFsOiBBcnJheTxJUG9pbnQ+LCBpbnB1dE51bWJlcjogbnVtYmVyKSA6IEFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXk8SVBvaW50PigpOyAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihpbnB1dE51bWJlciAhPSAwKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBQb2ludChpbnB1dFNpZ25hbFtpXS54LCBpbnB1dFNpZ25hbFtpXS55ICUgaW5wdXROdW1iZXIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIFwibW9kdWxvXCIgd2l0aCB0aGUgZ2l2ZW4gbnVtYmVyIGFuZCBlYWNoIFktSVBvaW50LUFycmF5IHZhbHVlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5wdXROdW1iZXJcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwgXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn0gXHJcbiAgICAgKiBAbWVtYmVyb2YgTW9kdWxvQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGNDb25zdGFudE1vZHVsb1NpZ25hbChpbnB1dE51bWJlcjogbnVtYmVyLCBpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50PikgOiBBcnJheTxJUG9pbnQ+IHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5PElQb2ludD4oKTsgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRTaWduYWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoaW5wdXRTaWduYWxbaV0ueSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgUG9pbnQoaW5wdXRTaWduYWxbaV0ueCwgaW5wdXROdW1iZXIgJSBpbnB1dFNpZ25hbFtpXS55KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcGxpZXMgXCJtb2R1bG9cIiBiZXR3ZWVuIHR3byBZLUlQb2ludC1BcnJheSB2YWx1ZXNcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwxIFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbDJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fSBcclxuICAgICAqIEBtZW1iZXJvZiBNb2R1bG9DYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY1NpZ25hbE1vZHVsb1NpZ25hbChpbnB1dFNpZ25hbDE6IEFycmF5PElQb2ludD4sIGlucHV0U2lnbmFsMjogQXJyYXk8SVBvaW50PikgOiBBcnJheTxJUG9pbnQ+IHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5PElQb2ludD4oKTsgXHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWwxLmxlbmd0aCA9PSBpbnB1dFNpZ25hbDIubGVuZ3RoKXsgLy8gVXNlIG9ubHkgc2lnbmFscyB3aXRoIHNhbWUgc2FtcGxlIGNvdW50IGZvciBtb2R1bG8gY2FsY3VsYXRpb24gICAgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRTaWduYWwxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dFNpZ25hbDJbaV0ueSAhPSAwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgUG9pbnQoaW5wdXRTaWduYWwxW2ldLngsIGlucHV0U2lnbmFsMVtpXS55ICUgaW5wdXRTaWduYWwyW2ldLnkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IFRoZSBpbnB1dCBzaWduYWxzIGRvbid0IGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHBvaW50cyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwb3NzaWJpbGl0aWVzIG9mIGEgZGl2aXNvbiB3aXRoIDBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElWYWx1ZUxpc3RJdGVtPn1cclxuICAgICAqIEBtZW1iZXJvZiBEaXZDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RGl2aXNpb25CeVplcm9FcnJvckhhbmRsaW5nKCk6IEFycmF5PElWYWx1ZUxpc3RJdGVtPntcclxuICAgICAgICBsZXQgZGl2aXNpb25CeVplcm9Qb3NzaWJpbGl0aWVzID0gbmV3IEFycmF5PElWYWx1ZUxpc3RJdGVtPigpO1xyXG4gICAgICAgIGRpdmlzaW9uQnlaZXJvUG9zc2liaWxpdGllcy5wdXNoKHt2YWx1ZTogXCIwXCIsIGRpc3BsYXlWYWx1ZTogXCJDYXVzZSBlcnJvclwifSBhcyBJVmFsdWVMaXN0SXRlbSk7XHJcbiAgICAgICAgZGl2aXNpb25CeVplcm9Qb3NzaWJpbGl0aWVzLnB1c2goe3ZhbHVlOiBcIjFcIiwgZGlzcGxheVZhbHVlOiBcIlBvaW50cyBhcmUgcmVtb3ZlZFwifSBhcyBJVmFsdWVMaXN0SXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIGRpdmlzaW9uQnlaZXJvUG9zc2liaWxpdGllcztcclxuICAgIH1cclxufSJdfQ==