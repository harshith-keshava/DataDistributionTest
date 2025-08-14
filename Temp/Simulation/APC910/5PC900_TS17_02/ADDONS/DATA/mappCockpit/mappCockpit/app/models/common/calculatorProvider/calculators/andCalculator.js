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
    var AndCalculator = /** @class */ (function (_super) {
        __extends(AndCalculator, _super);
        function AndCalculator() {
            var _this = _super.call(this, "bitwise and", "Bitwise AND", "Calculates Bitwise AND between signal and number") || this;
            _this.inputId1 = "InputSignalOrConstantA";
            _this.inputId2 = "InputSignalOrConstantB";
            _this.inputName1 = "Input signal or constant a";
            _this.inputName2 = "Input signal or constant b";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "and";
            return _this;
        }
        AndCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputId1, this.inputName1, 0, "Input is a signal: Each Y value of the signal is used for bitwise AND; Input is a constant: Constant used for bitwise AND", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputId2, this.inputName2, 0, "Input is a signal: Each Y value of the signal is used for bitwise AND; Input is a constant: Constant used for bitwise AND", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        AndCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        AndCalculator.prototype.prepareCalculationData = function () {
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
         * @memberof AndCalculator
         *
         * Review Lukas Obersamer:
         * The cyclomatic complexity of this function is too high, but that does not reflext the complexity for humans to understand it.
         * The complexity of understing this method is in fact super simple. It is a "flat list" of input checks. Therefore the method may remain in this form.
        */
        AndCalculator.prototype.verifyCalculationInputData = function () {
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
        AndCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            //retrieve calculation input data and initialize result
            var calculationInputData = this.getCalculationInputDataContainer();
            var result = new Array();
            var inputData1 = calculationInputData[0];
            var inputData2 = calculationInputData[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData2.data)) {
                result = this.calcAndSignalWithConstant(inputData1.data, inputData2.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data)) {
                result = this.calcAndSignalWithConstant(inputData2.data, inputData1.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data)) {
                result = this.calcAndSignalWithSignal(inputData1.data, inputData2.data);
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
         * Calculate bitwise and with each Y-IPoint-Array value with the given number
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof AndCalculator
         */
        AndCalculator.prototype.calcAndSignalWithConstant = function (inputSignal, inputNumber) {
            var bitwiseAnd = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                bitwiseAnd.push(new point_1.Point(inputSignal[i].x, inputSignal[i].y & inputNumber));
            }
            return bitwiseAnd;
        };
        /**
         * Calculate bitwise and with two Y-IPoint-Array values
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof AndCalculator
         */
        AndCalculator.prototype.calcAndSignalWithSignal = function (inputSignal1, inputSignal2) {
            var bitwiseAnd = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Add only signals with same sample count     
                for (var i = 0; i < inputSignal1.length; i++) {
                    bitwiseAnd.push(new point_1.Point(inputSignal1[i].x, inputSignal1[i].y & inputSignal2[i].y));
                }
            }
            else {
                this.addError("Calculation Error: The input signals don't have the same number of points!");
            }
            return bitwiseAnd;
        };
        return AndCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.AndCalculator = AndCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5kQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvYW5kQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBbUMsaUNBQWM7UUFXN0M7WUFBQSxZQUNJLGtCQUFNLGFBQWEsRUFBRSxhQUFhLEVBQUUsa0RBQWtELENBQUMsU0FDMUY7WUFYTyxjQUFRLEdBQUcsd0JBQXdCLENBQUM7WUFDcEMsY0FBUSxHQUFHLHdCQUF3QixDQUFDO1lBQ3BDLGdCQUFVLEdBQUcsNEJBQTRCLENBQUM7WUFDMUMsZ0JBQVUsR0FBRyw0QkFBNEIsQ0FBQztZQUUxQyxjQUFRLEdBQVcsY0FBYyxDQUFDO1lBQ2xDLGdCQUFVLEdBQUcsZUFBZSxDQUFDO1lBQzdCLGlCQUFXLEdBQUcsS0FBSyxDQUFDOztRQUk1QixDQUFDO1FBRU0sMkNBQW1CLEdBQTFCO1lBQ0ksSUFBSSxnQkFBZ0IsR0FBRyxpQkFBTSxtQkFBbUIsV0FBRSxDQUFDO1lBRW5ELGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZEQUE2QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsMkhBQTJILEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RRLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZEQUE2QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsMkhBQTJILEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRRLE9BQU8sZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUVN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QUFDLENBQUMsQ0FBQztpQkFDeEY7YUFDSjtpQkFDRztnQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLDRFQUE0RSxDQUFDLENBQUM7YUFDL0Y7WUFDRCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLEFBakxELENBQW1DLCtCQUFjLEdBaUxoRDtJQWpMWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGN1bGF0b3JCYXNlICwgRXJyb3JNZXNzYWdlVHlwZX0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1wiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9ySGVscGVyIH0gZnJvbSBcIi4vY2FsY3VsYXRvckhlbHBlclwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBbmRDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgaW5wdXRJZDEgPSBcIklucHV0U2lnbmFsT3JDb25zdGFudEFcIjtcclxuICAgIHByaXZhdGUgaW5wdXRJZDIgPSBcIklucHV0U2lnbmFsT3JDb25zdGFudEJcIjtcclxuICAgIHByaXZhdGUgaW5wdXROYW1lMSA9IFwiSW5wdXQgc2lnbmFsIG9yIGNvbnN0YW50IGFcIjtcclxuICAgIHByaXZhdGUgaW5wdXROYW1lMiA9IFwiSW5wdXQgc2lnbmFsIG9yIGNvbnN0YW50IGJcIjtcclxuXHJcbiAgICBwcml2YXRlIG91dHB1dElkOiBzdHJpbmcgPSBcIk91dHB1dFNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXROYW1lID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlID0gXCJhbmRcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcImJpdHdpc2UgYW5kXCIsIFwiQml0d2lzZSBBTkRcIiwgXCJDYWxjdWxhdGVzIEJpdHdpc2UgQU5EIGJldHdlZW4gc2lnbmFsIGFuZCBudW1iZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0SW5wdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdElucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXRJZDEsIHRoaXMuaW5wdXROYW1lMSwgMCwgXCJJbnB1dCBpcyBhIHNpZ25hbDogRWFjaCBZIHZhbHVlIG9mIHRoZSBzaWduYWwgaXMgdXNlZCBmb3IgYml0d2lzZSBBTkQ7IElucHV0IGlzIGEgY29uc3RhbnQ6IENvbnN0YW50IHVzZWQgZm9yIGJpdHdpc2UgQU5EXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXRJZDIsIHRoaXMuaW5wdXROYW1lMiwgMCwgXCJJbnB1dCBpcyBhIHNpZ25hbDogRWFjaCBZIHZhbHVlIG9mIHRoZSBzaWduYWwgaXMgdXNlZCBmb3IgYml0d2lzZSBBTkQ7IElucHV0IGlzIGEgY29uc3RhbnQ6IENvbnN0YW50IHVzZWQgZm9yIGJpdHdpc2UgQU5EXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dElkLCB0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gZGVmYXVsdE91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHByZXBhcmVDYWxjdWxhdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIucHJlcGFyZUNhbGN1bGF0aW9uRGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dERhdGExID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YTIgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0RGF0YTEuZGF0YSlcclxuICAgICAgICAgICAgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTIuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0RGF0YTIuZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcmVwYXJlZFBvaW50QXJyYXlzID0gQ2FsY3VsYXRvckhlbHBlci5maWx0ZXJNYXRjaGluZ1BvaW50c0J5WHZhbHVlKHsgXHJcbiAgICAgICAgICAgICAgICBwb2ludEFycmF5MTogaW5wdXREYXRhMS5kYXRhLCBcclxuICAgICAgICAgICAgICAgIHBvaW50QXJyYXkyOiBpbnB1dERhdGEyLmRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXS5kYXRhID0gcHJlcGFyZWRQb2ludEFycmF5cy5wb2ludEFycmF5MTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV0uZGF0YSA9IHByZXBhcmVkUG9pbnRBcnJheXMucG9pbnRBcnJheTI7XHJcblxyXG4gICAgICAgICAgICBpZighQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0RGF0YTEuZGF0YSkgfHwgIUNhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbChpbnB1dERhdGEyLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTm90RW5vdWdoQ29tbW9uVGltZXN0YW1wcywgW2lucHV0RGF0YTEubmFtZSwgaW5wdXREYXRhMi5uYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQW5kQ2FsY3VsYXRvclxyXG4gICAgICogXHJcbiAgICAgKiBSZXZpZXcgTHVrYXMgT2JlcnNhbWVyOlxyXG4gICAgICogVGhlIGN5Y2xvbWF0aWMgY29tcGxleGl0eSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvbyBoaWdoLCBidXQgdGhhdCBkb2VzIG5vdCByZWZsZXh0IHRoZSBjb21wbGV4aXR5IGZvciBodW1hbnMgdG8gdW5kZXJzdGFuZCBpdC4gXHJcbiAgICAgKiBUaGUgY29tcGxleGl0eSBvZiB1bmRlcnN0aW5nIHRoaXMgbWV0aG9kIGlzIGluIGZhY3Qgc3VwZXIgc2ltcGxlLiBJdCBpcyBhIFwiZmxhdCBsaXN0XCIgb2YgaW5wdXQgY2hlY2tzLiBUaGVyZWZvcmUgdGhlIG1ldGhvZCBtYXkgcmVtYWluIGluIHRoaXMgZm9ybS4gXHJcbiAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIC8vcmV0cmlldmUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YVxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXREYXRhMSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBpbnB1dERhdGEyID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV07XHJcblxyXG4gICAgICAgIGlmKGlucHV0RGF0YTEgPT0gdW5kZWZpbmVkIHx8IENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhpbnB1dERhdGExLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTFdKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmKGlucHV0RGF0YTIgPT0gdW5kZWZpbmVkIHx8IENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhpbnB1dERhdGEyLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGlucHV0RGF0YTEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGlucHV0RGF0YTIuZGF0YSkpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogSXQgaXMgbm90IHN1cHBvcnRlZCB0byBvcGVyYXRlIHdpdGgganVzdCB0d28gbnVtYmVycyFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0NoZWNraW5nIGlmIHRoZSBpbnB1dCBzaWduYWwgY29udGFpbnMgZmxvYXRpbmcgcG9pbnQgbnVtYmVyc1xyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dERhdGExLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuaVBvaW50QXJyYXlIYXNGbG9hdEluWVZhbHVlcyhpbnB1dERhdGExLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zRmxvYXRpbmdOdW1iZXJzLCBbdGhpcy5pbnB1dE5hbWUxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dERhdGEyLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuaVBvaW50QXJyYXlIYXNGbG9hdEluWVZhbHVlcyhpbnB1dERhdGEyLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zRmxvYXRpbmdOdW1iZXJzLCBbdGhpcy5pbnB1dE5hbWUyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQ2hlY2tpbmcgaWYgdGhlIGlucHV0IG51bWJlciBpcyBhIGZsb2F0aW5nIHBvaW50IG51bWJlcnNcclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXREYXRhMS5kYXRhKSAmJiAhTnVtYmVyLmlzU2FmZUludGVnZXIoaW5wdXREYXRhMS5kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5OdW1iZXJJc05vSW50LCBbdGhpcy5pbnB1dE5hbWUxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihpbnB1dERhdGEyLmRhdGEpICYmICFOdW1iZXIuaXNTYWZlSW50ZWdlcihpbnB1dERhdGEyLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk51bWJlcklzTm9JbnQsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVBbGdvcml0aG0oKSB7XHJcbiAgICAgICAgc3VwZXIuZXhlY3V0ZUFsZ29yaXRobSgpXHJcblxyXG4gICAgICAgIC8vcmV0cmlldmUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YSBhbmQgaW5pdGlhbGl6ZSByZXN1bHRcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGEgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dERhdGExID0gY2FsY3VsYXRpb25JbnB1dERhdGFbMF07XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YTIgPSBjYWxjdWxhdGlvbklucHV0RGF0YVsxXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGlucHV0RGF0YTIuZGF0YSkpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNhbGNBbmRTaWduYWxXaXRoQ29uc3RhbnQoaW5wdXREYXRhMS5kYXRhLCBpbnB1dERhdGEyLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXREYXRhMS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXREYXRhMi5kYXRhKSl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY2FsY0FuZFNpZ25hbFdpdGhDb25zdGFudChpbnB1dERhdGEyLmRhdGEsIGlucHV0RGF0YTEuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dERhdGExLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dERhdGEyLmRhdGEpKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jYWxjQW5kU2lnbmFsV2l0aFNpZ25hbChpbnB1dERhdGExLmRhdGEsIGlucHV0RGF0YTIuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2FkZCB0aGUgcmVzdWx0IG9mIHRoZSBjYWxjdWxhdGlvbiB0byB0aGUgY2FsY3VsYXRpb25PdXRwdUNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuYWRkQ2FsY3VsYXRpb25PdXRwdXREYXRhKHtcclxuICAgICAgICAgICAgZGF0YTogcmVzdWx0LFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5vdXRwdXRWYWx1ZSxcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5vdXRwdXROYW1lLFxyXG4gICAgICAgICAgICBpZDogdGhpcy5vdXRwdXRJZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSBiaXR3aXNlIGFuZCB3aXRoIGVhY2ggWS1JUG9pbnQtQXJyYXkgdmFsdWUgd2l0aCB0aGUgZ2l2ZW4gbnVtYmVyXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlucHV0TnVtYmVyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn0gXHJcbiAgICAgKiBAbWVtYmVyb2YgQW5kQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGNBbmRTaWduYWxXaXRoQ29uc3RhbnQoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4sIGlucHV0TnVtYmVyOiBudW1iZXIpIDogQXJyYXk8SVBvaW50PiB7XHJcbiAgICAgICAgbGV0IGJpdHdpc2VBbmQgPSBuZXcgQXJyYXk8SVBvaW50PigpOyAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBiaXR3aXNlQW5kLnB1c2gobmV3IFBvaW50KGlucHV0U2lnbmFsW2ldLngsIGlucHV0U2lnbmFsW2ldLnkgJiBpbnB1dE51bWJlcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYml0d2lzZUFuZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSBiaXR3aXNlIGFuZCB3aXRoIHR3byBZLUlQb2ludC1BcnJheSB2YWx1ZXNcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwxIFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbDJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fSBcclxuICAgICAqIEBtZW1iZXJvZiBBbmRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY0FuZFNpZ25hbFdpdGhTaWduYWwoaW5wdXRTaWduYWwxOiBBcnJheTxJUG9pbnQ+LCBpbnB1dFNpZ25hbDI6IEFycmF5PElQb2ludD4pIDogQXJyYXk8SVBvaW50PiB7XHJcbiAgICAgICAgbGV0IGJpdHdpc2VBbmQgPSBuZXcgQXJyYXk8SVBvaW50PigpOyBcclxuICAgICAgICBpZihpbnB1dFNpZ25hbDEubGVuZ3RoID09IGlucHV0U2lnbmFsMi5sZW5ndGgpeyAvLyBBZGQgb25seSBzaWduYWxzIHdpdGggc2FtZSBzYW1wbGUgY291bnQgICAgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRTaWduYWwxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBiaXR3aXNlQW5kLnB1c2gobmV3IFBvaW50KGlucHV0U2lnbmFsMVtpXS54LCBpbnB1dFNpZ25hbDFbaV0ueSAmIGlucHV0U2lnbmFsMltpXS55KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBUaGUgaW5wdXQgc2lnbmFscyBkb24ndCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBwb2ludHMhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYml0d2lzZUFuZDtcclxuICAgIH1cclxufSJdfQ==