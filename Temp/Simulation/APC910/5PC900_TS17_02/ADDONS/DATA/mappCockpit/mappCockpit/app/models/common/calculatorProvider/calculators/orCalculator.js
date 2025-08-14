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
define(["require", "exports", "./calculatorBase", "../calculationDataPoints", "../calculationDataNumberOrPoints", "../../point", "../calculationDataDisplayInfo", "./calculatorHelper"], function (require, exports, calculatorBase_1, calculationDataPoints_1, calculationDataNumberOrPoints_1, point_1, calculationDataDisplayInfo_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OrCalculator = /** @class */ (function (_super) {
        __extends(OrCalculator, _super);
        function OrCalculator() {
            var _this = _super.call(this, "bitwise or", "Bitwise OR", "Calculates Bitwise OR between signal and number") || this;
            _this.inputId1 = "InputSignalOrConstantA";
            _this.inputId2 = "InputSignalOrConstantB";
            _this.inputName1 = "Input signal or constant a";
            _this.inputName2 = "Input signal or constant b";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "or";
            return _this;
        }
        OrCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputId1, this.inputName1, 0, "Input is a signal: Each Y value of the signal is used for bitwise OR; Input is a constant: Constant used for bitwise OR", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputId2, this.inputName2, 0, "Input is a signal: Each Y value of the signal is used for bitwise OR; Input is a constant: Constant used for bitwise OR", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        OrCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        OrCalculator.prototype.prepareCalculationData = function () {
            _super.prototype.prepareCalculationData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var inputData1 = calculationInputDataContainer[0];
            var inputData2 = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(inputData1.data)
                && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(inputData2.data)) {
                var preparedPointArrays = calculatorHelper_1.CalculatorHelper.filterMatchingPointsByXvalue({
                    pointArray1: inputData1.data,
                    pointArray2: inputData2.data
                });
                calculationInputDataContainer[0].data = preparedPointArrays.pointArray1;
                calculationInputDataContainer[1].data = preparedPointArrays.pointArray2;
                if (!calculatorHelper_1.CalculatorHelper.isValidSignal(inputData1.data) || !calculatorHelper_1.CalculatorHelper.isValidSignal(inputData2.data)) {
                    this.addErrorByType(calculatorBase_1.ErrorMessageType.NotEnoughCommonTimestamps, [inputData1.name, inputData2.name]);
                }
            }
        };
        /**
         *
         *
         * @protected
         * @returns
         * @memberof OrCalculator
         *
         * Review Lukas Obersamer:
         * The cyclomatic complexity of this function is too high, but that does not reflext the complexity for humans to understand it.
         * The complexity of understing this method is in fact super simple. Therefore the method may remain in this form.
        */
        OrCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            //retrieve calculation input data
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var inputData1 = calculationInputDataContainer[0];
            var inputData2 = calculationInputDataContainer[1];
            if (inputData1 == undefined || calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(inputData1.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (inputData2 == undefined || calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(inputData2.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
            if (this.hasErrors()) {
                return;
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData2.data)) {
                this.addError("Calculation Error: It is not supported to operate with just two numbers!");
            }
            //Checking if the input signal contains floating point numbers
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.iPointArrayHasFloatInYValues(inputData1.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.ContainsFloatingNumbers, [this.inputName1]);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data) && calculatorHelper_1.CalculatorHelper.iPointArrayHasFloatInYValues(inputData2.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.ContainsFloatingNumbers, [this.inputName2]);
            }
            //Checking if the input number is a floating point numbers
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData1.data) && !Number.isSafeInteger(inputData1.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.NumberIsNoInt, [this.inputName1]);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData2.data) && !Number.isSafeInteger(inputData2.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.NumberIsNoInt, [this.inputName2]);
            }
        };
        OrCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            //retrieve calculation input data and initialize result
            var calculationInputData = this.getCalculationInputDataContainer();
            var result = new Array();
            var inputData1 = calculationInputData[0];
            var inputData2 = calculationInputData[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData2.data)) {
                result = this.calcOrSignalWithConstant(inputData1.data, inputData2.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data)) {
                result = this.calcOrSignalWithConstant(inputData2.data, inputData1.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data)) {
                result = this.calcOrSignalWithSignal(inputData1.data, inputData2.data);
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
         * Calculate bitwise or with each Y-IPoint-Array value with the given number
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof OrCalculator
         */
        OrCalculator.prototype.calcOrSignalWithConstant = function (inputSignal, inputNumber) {
            var bitwiseOr = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                bitwiseOr.push(new point_1.Point(inputSignal[i].x, inputSignal[i].y | inputNumber));
            }
            return bitwiseOr;
        };
        /**
         * Calculate bitwise or with two Y-IPoint-Array values
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof OrCalculator
         */
        OrCalculator.prototype.calcOrSignalWithSignal = function (inputSignal1, inputSignal2) {
            var bitwiseOr = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Add only signals with same sample count     
                for (var i = 0; i < inputSignal1.length; i++) {
                    bitwiseOr.push(new point_1.Point(inputSignal1[i].x, inputSignal1[i].y | inputSignal2[i].y));
                }
            }
            else {
                this.addError("Calculation Error: The input signals don't have the same number of points!");
            }
            return bitwiseOr;
        };
        return OrCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.OrCalculator = OrCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JDYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9vckNhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBO1FBQWtDLGdDQUFjO1FBVzVDO1lBQUEsWUFDSSxrQkFBTSxZQUFZLEVBQUUsWUFBWSxFQUFFLGlEQUFpRCxDQUFDLFNBQ3ZGO1lBWE8sY0FBUSxHQUFVLHdCQUF3QixDQUFDO1lBQzNDLGNBQVEsR0FBVSx3QkFBd0IsQ0FBQztZQUMzQyxnQkFBVSxHQUFHLDRCQUE0QixDQUFDO1lBQzFDLGdCQUFVLEdBQUcsNEJBQTRCLENBQUM7WUFFMUMsY0FBUSxHQUFXLGNBQWMsQ0FBQztZQUNsQyxnQkFBVSxHQUFHLGVBQWUsQ0FBQztZQUM3QixpQkFBVyxHQUFHLElBQUksQ0FBQzs7UUFJM0IsQ0FBQztRQUVNLDBDQUFtQixHQUExQjtZQUNJLElBQUksZ0JBQWdCLEdBQUcsaUJBQU0sbUJBQW1CLFdBQUUsQ0FBQztZQUVuRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLHlIQUF5SCxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwUSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLHlIQUF5SCxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwUSxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFTSwy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QyxDQUFDLENBQUM7aUJBQ3ZGO2FBQ0o7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO2FBQy9GO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQWpMRCxDQUFrQywrQkFBYyxHQWlML0M7SUFqTFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSAsIEVycm9yTWVzc2FnZVR5cGV9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgT3JDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgaW5wdXRJZDE6c3RyaW5nID0gXCJJbnB1dFNpZ25hbE9yQ29uc3RhbnRBXCI7XHJcbiAgICBwcml2YXRlIGlucHV0SWQyOnN0cmluZyA9IFwiSW5wdXRTaWduYWxPckNvbnN0YW50QlwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUxID0gXCJJbnB1dCBzaWduYWwgb3IgY29uc3RhbnQgYVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUyID0gXCJJbnB1dCBzaWduYWwgb3IgY29uc3RhbnQgYlwiO1xyXG5cclxuICAgIHByaXZhdGUgb3V0cHV0SWQ6IHN0cmluZyA9IFwiT3V0cHV0U2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dE5hbWUgPSBcIk91dHB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0VmFsdWUgPSBcIm9yXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJiaXR3aXNlIG9yXCIsIFwiQml0d2lzZSBPUlwiLCBcIkNhbGN1bGF0ZXMgQml0d2lzZSBPUiBiZXR3ZWVuIHNpZ25hbCBhbmQgbnVtYmVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0SWQxLCB0aGlzLmlucHV0TmFtZTEsIDAsIFwiSW5wdXQgaXMgYSBzaWduYWw6IEVhY2ggWSB2YWx1ZSBvZiB0aGUgc2lnbmFsIGlzIHVzZWQgZm9yIGJpdHdpc2UgT1I7IElucHV0IGlzIGEgY29uc3RhbnQ6IENvbnN0YW50IHVzZWQgZm9yIGJpdHdpc2UgT1JcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHModGhpcy5pbnB1dElkMiwgdGhpcy5pbnB1dE5hbWUyLCAwLCBcIklucHV0IGlzIGEgc2lnbmFsOiBFYWNoIFkgdmFsdWUgb2YgdGhlIHNpZ25hbCBpcyB1c2VkIGZvciBiaXR3aXNlIE9SOyBJbnB1dCBpcyBhIGNvbnN0YW50OiBDb25zdGFudCB1c2VkIGZvciBiaXR3aXNlIE9SXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dElkLCB0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gZGVmYXVsdE91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHByZXBhcmVDYWxjdWxhdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIucHJlcGFyZUNhbGN1bGF0aW9uRGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dERhdGExID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YTIgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0RGF0YTEuZGF0YSlcclxuICAgICAgICAgICAgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTIuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0RGF0YTIuZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcmVwYXJlZFBvaW50QXJyYXlzID0gQ2FsY3VsYXRvckhlbHBlci5maWx0ZXJNYXRjaGluZ1BvaW50c0J5WHZhbHVlKHsgXHJcbiAgICAgICAgICAgICAgICBwb2ludEFycmF5MTogaW5wdXREYXRhMS5kYXRhLCBcclxuICAgICAgICAgICAgICAgIHBvaW50QXJyYXkyOiBpbnB1dERhdGEyLmRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXS5kYXRhID0gcHJlcGFyZWRQb2ludEFycmF5cy5wb2ludEFycmF5MTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV0uZGF0YSA9IHByZXBhcmVkUG9pbnRBcnJheXMucG9pbnRBcnJheTI7XHJcblxyXG4gICAgICAgICAgICBpZighQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0RGF0YTEuZGF0YSkgfHwgIUNhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbChpbnB1dERhdGEyLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTm90RW5vdWdoQ29tbW9uVGltZXN0YW1wcywgW2lucHV0RGF0YTEubmFtZSwgaW5wdXREYXRhMi5uYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgT3JDYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogUmV2aWV3IEx1a2FzIE9iZXJzYW1lcjpcclxuICAgICAqIFRoZSBjeWNsb21hdGljIGNvbXBsZXhpdHkgb2YgdGhpcyBmdW5jdGlvbiBpcyB0b28gaGlnaCwgYnV0IHRoYXQgZG9lcyBub3QgcmVmbGV4dCB0aGUgY29tcGxleGl0eSBmb3IgaHVtYW5zIHRvIHVuZGVyc3RhbmQgaXQuIFxyXG4gICAgICogVGhlIGNvbXBsZXhpdHkgb2YgdW5kZXJzdGluZyB0aGlzIG1ldGhvZCBpcyBpbiBmYWN0IHN1cGVyIHNpbXBsZS4gVGhlcmVmb3JlIHRoZSBtZXRob2QgbWF5IHJlbWFpbiBpbiB0aGlzIGZvcm0uIFxyXG4gICAgKi9cclxuICAgIHByb3RlY3RlZCB2ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpIHtcclxuICAgICAgICBzdXBlci52ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICAvL3JldHJpZXZlIGNhbGN1bGF0aW9uIGlucHV0IGRhdGFcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlucHV0RGF0YTEgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgaW5wdXREYXRhMiA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihpbnB1dERhdGExID09IHVuZGVmaW5lZCB8fCBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoaW5wdXREYXRhMS5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUxXSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBpZihpbnB1dERhdGEyID09IHVuZGVmaW5lZCB8fCBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoaW5wdXREYXRhMi5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUyXSk7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihpbnB1dERhdGExLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihpbnB1dERhdGEyLmRhdGEpKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IEl0IGlzIG5vdCBzdXBwb3J0ZWQgdG8gb3BlcmF0ZSB3aXRoIGp1c3QgdHdvIG51bWJlcnMhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9DaGVja2luZyBpZiB0aGUgaW5wdXQgc2lnbmFsIGNvbnRhaW5zIGZsb2F0aW5nIHBvaW50IG51bWJlcnNcclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXREYXRhMS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmlQb2ludEFycmF5SGFzRmxvYXRJbllWYWx1ZXMoaW5wdXREYXRhMS5kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc0Zsb2F0aW5nTnVtYmVycywgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXREYXRhMi5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmlQb2ludEFycmF5SGFzRmxvYXRJbllWYWx1ZXMoaW5wdXREYXRhMi5kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc0Zsb2F0aW5nTnVtYmVycywgW3RoaXMuaW5wdXROYW1lMl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0NoZWNraW5nIGlmIHRoZSBpbnB1dCBudW1iZXIgaXMgYSBmbG9hdGluZyBwb2ludCBudW1iZXJzXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGlucHV0RGF0YTEuZGF0YSkgJiYgIU51bWJlci5pc1NhZmVJbnRlZ2VyKGlucHV0RGF0YTEuZGF0YSkpe1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTnVtYmVySXNOb0ludCwgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXREYXRhMi5kYXRhKSAmJiAhTnVtYmVyLmlzU2FmZUludGVnZXIoaW5wdXREYXRhMi5kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5OdW1iZXJJc05vSW50LCBbdGhpcy5pbnB1dE5hbWUyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlQWxnb3JpdGhtKCkge1xyXG4gICAgICAgIHN1cGVyLmV4ZWN1dGVBbGdvcml0aG0oKVxyXG5cclxuICAgICAgICAvL3JldHJpZXZlIGNhbGN1bGF0aW9uIGlucHV0IGRhdGEgYW5kIGluaXRpYWxpemUgcmVzdWx0XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXREYXRhMSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhWzBdO1xyXG4gICAgICAgIGxldCBpbnB1dERhdGEyID0gY2FsY3VsYXRpb25JbnB1dERhdGFbMV07XHJcblxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dERhdGExLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihpbnB1dERhdGEyLmRhdGEpKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jYWxjT3JTaWduYWxXaXRoQ29uc3RhbnQoaW5wdXREYXRhMS5kYXRhLCBpbnB1dERhdGEyLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXREYXRhMS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXREYXRhMi5kYXRhKSl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY2FsY09yU2lnbmFsV2l0aENvbnN0YW50KGlucHV0RGF0YTIuZGF0YSwgaW5wdXREYXRhMS5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTIuZGF0YSkpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNhbGNPclNpZ25hbFdpdGhTaWduYWwoaW5wdXREYXRhMS5kYXRhLCBpbnB1dERhdGEyLmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGQgdGhlIHJlc3VsdCBvZiB0aGUgY2FsY3VsYXRpb24gdG8gdGhlIGNhbGN1bGF0aW9uT3V0cHVDb250YWluZXJcclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZSxcclxuICAgICAgICAgICAgaWQ6IHRoaXMub3V0cHV0SWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgYml0d2lzZSBvciB3aXRoIGVhY2ggWS1JUG9pbnQtQXJyYXkgdmFsdWUgd2l0aCB0aGUgZ2l2ZW4gbnVtYmVyXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlucHV0TnVtYmVyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn0gXHJcbiAgICAgKiBAbWVtYmVyb2YgT3JDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY09yU2lnbmFsV2l0aENvbnN0YW50KGlucHV0U2lnbmFsOiBBcnJheTxJUG9pbnQ+LCBpbnB1dE51bWJlcjogbnVtYmVyKSA6IEFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIGxldCBiaXR3aXNlT3IgPSBuZXcgQXJyYXk8SVBvaW50PigpOyAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBiaXR3aXNlT3IucHVzaChuZXcgUG9pbnQoaW5wdXRTaWduYWxbaV0ueCwgaW5wdXRTaWduYWxbaV0ueSB8IGlucHV0TnVtYmVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiaXR3aXNlT3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgYml0d2lzZSBvciB3aXRoIHR3byBZLUlQb2ludC1BcnJheSB2YWx1ZXNcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwxIFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbDJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fSBcclxuICAgICAqIEBtZW1iZXJvZiBPckNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjT3JTaWduYWxXaXRoU2lnbmFsKGlucHV0U2lnbmFsMTogQXJyYXk8SVBvaW50PiwgaW5wdXRTaWduYWwyOiBBcnJheTxJUG9pbnQ+KSA6IEFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIGxldCBiaXR3aXNlT3IgPSBuZXcgQXJyYXk8SVBvaW50PigpOyBcclxuICAgICAgICBpZihpbnB1dFNpZ25hbDEubGVuZ3RoID09IGlucHV0U2lnbmFsMi5sZW5ndGgpeyAvLyBBZGQgb25seSBzaWduYWxzIHdpdGggc2FtZSBzYW1wbGUgY291bnQgICAgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRTaWduYWwxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBiaXR3aXNlT3IucHVzaChuZXcgUG9pbnQoaW5wdXRTaWduYWwxW2ldLngsIGlucHV0U2lnbmFsMVtpXS55IHwgaW5wdXRTaWduYWwyW2ldLnkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IFRoZSBpbnB1dCBzaWduYWxzIGRvbid0IGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHBvaW50cyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiaXR3aXNlT3I7XHJcbiAgICB9XHJcbn0iXX0=