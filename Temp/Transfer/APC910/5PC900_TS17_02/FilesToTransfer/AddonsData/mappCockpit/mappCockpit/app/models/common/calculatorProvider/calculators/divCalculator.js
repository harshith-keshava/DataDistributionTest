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
define(["require", "exports", "../calculationDataNumber", "../calculationDataPoints", "../calculationDataNumberOrPoints", "../../point", "../calculationDataDisplayInfo", "./calculatorHelper", "./calculatorBase"], function (require, exports, calculationDataNumber_1, calculationDataPoints_1, calculationDataNumberOrPoints_1, point_1, calculationDataDisplayInfo_1, calculatorHelper_1, calculatorBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DivCalculator = /** @class */ (function (_super) {
        __extends(DivCalculator, _super);
        function DivCalculator() {
            var _this = _super.call(this, "division", "Division a/b", "Divide a signal by another signal or a constant value") || this;
            _this.inputId1 = "DividendA";
            _this.inputId2 = "DivisorB";
            _this.inputId3 = "DivisionByZero";
            _this.inputName1 = "Dividend a";
            _this.inputName2 = "Divisor b";
            _this.inputName3 = "Division by zero";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "Quotient";
            return _this;
        }
        DivCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputId1, this.inputName1, 0, "The dividend", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputId2, this.inputName2, 1, "The divisor", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputId3, this.inputName3, 0, "Select if zero in the divisor cause an error or should be removed", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(true, false, this.getDivisionByZeroErrorHandling())));
            return defaultInputData;
        };
        DivCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        DivCalculator.prototype.prepareCalculationData = function () {
            _super.prototype.prepareCalculationData.call(this);
            //retrieve calculation input data
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
         *
         *
         * @protected
         * @returns
         * @memberof DivCalculator
         *
         * Review Lukas Obersamer:
         * The cyclomatic complexity of this function is too high, but that does not reflext the complexity for humans to understand it.
         * The complexity of understing this method is in fact super simple. It is a "flat list" of input checks. Therefore the method may remain in this form.
        */
        DivCalculator.prototype.verifyCalculationInputData = function () {
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
        };
        DivCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            //retrieve calculation input data and initialize result
            var calculationInputData = this.getCalculationInputDataContainer();
            var result = new Array();
            var dividend = calculationInputData[0];
            var divisor = calculationInputData[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(dividend.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(divisor.data)) {
                result = this.divTwoSignals(dividend.data, divisor.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(dividend.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(divisor.data)) {
                result = this.divSignalByConst(dividend.data, divisor.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(dividend.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(divisor.data)) {
                result = this.divConstBySignal(divisor.data, dividend.data);
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
         * Calculates output signal when input is Signal and Signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof DivCalculator
         */
        DivCalculator.prototype.divTwoSignals = function (inputSignal1, inputSignal2) {
            var points = new Array();
            if (inputSignal1.length == inputSignal2.length) {
                for (var i = 0; i < inputSignal1.length; i++) {
                    if (inputSignal2[i].y != 0) {
                        var tmpX = inputSignal1[i].x;
                        var tmpY = inputSignal1[i].y / inputSignal2[i].y;
                        points.push(new point_1.Point(tmpX, tmpY));
                    }
                }
            }
            else {
                this.addError("Calculation Error: The input signals don't have the same number of points!");
            }
            return points;
        };
        /**
         * Calculates output signal when input is Signal and Number (Const/Signal)
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof DivCalculator
         */
        DivCalculator.prototype.divConstBySignal = function (inputSignal, inputNumber) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                //Values which are 0 in the divisor are ignored
                if (inputSignal[i].y != 0) {
                    var tmpX = inputSignal[i].x;
                    var tmpY = inputNumber / inputSignal[i].y;
                    points.push(new point_1.Point(tmpX, tmpY));
                }
            }
            return points;
        };
        /**
         * Calculates output signal when input is Signal and Number (Signal/Const)
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof DivCalculator
         */
        DivCalculator.prototype.divSignalByConst = function (inputSignal, inputNumber) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var tmpX = inputSignal[i].x;
                var tmpY = inputSignal[i].y / inputNumber;
                points.push(new point_1.Point(tmpX, tmpY));
            }
            return points;
        };
        /**
         * Returns the possibilities of a divison with 0
         *
         * @private
         * @returns {Array<IValueListItem>}
         * @memberof DivCalculator
         */
        DivCalculator.prototype.getDivisionByZeroErrorHandling = function () {
            var divisionByZeroPossibilities = new Array();
            divisionByZeroPossibilities.push({ value: "0", displayValue: "Cause error" });
            divisionByZeroPossibilities.push({ value: "1", displayValue: "Points are removed" });
            return divisionByZeroPossibilities;
        };
        return DivCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.DivCalculator = DivCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2Q2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvZGl2Q2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBWUE7UUFBbUMsaUNBQWM7UUFjN0M7WUFBQSxZQUNJLGtCQUFNLFVBQVUsRUFBRSxjQUFjLEVBQUUsdURBQXVELENBQUMsU0FDN0Y7WUFkTyxjQUFRLEdBQVUsV0FBVyxDQUFDO1lBQzlCLGNBQVEsR0FBVSxVQUFVLENBQUM7WUFDN0IsY0FBUSxHQUFVLGdCQUFnQixDQUFDO1lBRW5DLGdCQUFVLEdBQVUsWUFBWSxDQUFDO1lBQ2pDLGdCQUFVLEdBQVUsV0FBVyxDQUFDO1lBQ2hDLGdCQUFVLEdBQVUsa0JBQWtCLENBQUM7WUFFdkMsY0FBUSxHQUFVLGNBQWMsQ0FBQztZQUNqQyxnQkFBVSxHQUFVLGVBQWUsQ0FBQztZQUNwQyxpQkFBVyxHQUFVLFVBQVUsQ0FBQzs7UUFJeEMsQ0FBQztRQUVNLDJDQUFtQixHQUExQjtZQUNJLElBQUksZ0JBQWdCLEdBQUcsaUJBQU0sbUJBQW1CLFdBQUUsQ0FBQztZQUVuRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekosZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkRBQTZCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FB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QUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7Z0JBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDdEM7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssc0RBQThCLEdBQXRDO1lBQ0ksSUFBSSwyQkFBMkIsR0FBRyxJQUFJLEtBQUssRUFBa0IsQ0FBQztZQUM5RCwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQW1CLENBQUMsQ0FBQztZQUM5RiwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBbUIsQ0FBQyxDQUFDO1lBQ3JHLE9BQU8sMkJBQTJCLENBQUM7UUFDdkMsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQWhPRCxDQUFtQywrQkFBYyxHQWdPaEQ7SUFoT1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckJhc2UsIEVycm9yTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBJVmFsdWVMaXN0SXRlbSB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21tb24vaW50ZXJmYWNlcy92YWx1ZUxpc3RJdGVtSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIERpdkNhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnB1dElkMTpzdHJpbmcgPSBcIkRpdmlkZW5kQVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dElkMjpzdHJpbmcgPSBcIkRpdmlzb3JCXCI7XHJcbiAgICBwcml2YXRlIGlucHV0SWQzOnN0cmluZyA9IFwiRGl2aXNpb25CeVplcm9cIjtcclxuXHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTE6c3RyaW5nID0gXCJEaXZpZGVuZCBhXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTI6c3RyaW5nID0gXCJEaXZpc29yIGJcIjtcclxuICAgIHByaXZhdGUgaW5wdXROYW1lMzpzdHJpbmcgPSBcIkRpdmlzaW9uIGJ5IHplcm9cIjtcclxuXHJcbiAgICBwcml2YXRlIG91dHB1dElkOnN0cmluZyA9IFwiT3V0cHV0U2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dE5hbWU6c3RyaW5nID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlOnN0cmluZyA9IFwiUXVvdGllbnRcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcImRpdmlzaW9uXCIsIFwiRGl2aXNpb24gYS9iXCIsIFwiRGl2aWRlIGEgc2lnbmFsIGJ5IGFub3RoZXIgc2lnbmFsIG9yIGEgY29uc3RhbnQgdmFsdWVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0SW5wdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdElucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXRJZDEsIHRoaXMuaW5wdXROYW1lMSwgMCwgXCJUaGUgZGl2aWRlbmRcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHModGhpcy5pbnB1dElkMiwgdGhpcy5pbnB1dE5hbWUyLCAxLCBcIlRoZSBkaXZpc29yXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlcih0aGlzLmlucHV0SWQzLCB0aGlzLmlucHV0TmFtZTMsIDAsIFwiU2VsZWN0IGlmIHplcm8gaW4gdGhlIGRpdmlzb3IgY2F1c2UgYW4gZXJyb3Igb3Igc2hvdWxkIGJlIHJlbW92ZWRcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKHRydWUsIGZhbHNlLCB0aGlzLmdldERpdmlzaW9uQnlaZXJvRXJyb3JIYW5kbGluZygpKSkpOyAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dElkLCB0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcHJlcGFyZUNhbGN1bGF0aW9uRGF0YSgpIHtcclxuICAgICAgICBzdXBlci5wcmVwYXJlQ2FsY3VsYXRpb25EYXRhKCk7XHJcblxyXG4gICAgICAgIC8vcmV0cmlldmUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YVxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGRpdmlkZW5kID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGRpdmlzb3IgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGRpdmlkZW5kLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbChkaXZpZGVuZC5kYXRhKVxyXG4gICAgICAgICAgICAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoZGl2aXNvci5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmlzVmFsaWRTaWduYWwoZGl2aXNvci5kYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHByZXBhcmVkUG9pbnRBcnJheXMgPSBDYWxjdWxhdG9ySGVscGVyLmZpbHRlck1hdGNoaW5nUG9pbnRzQnlYdmFsdWUoeyBcclxuICAgICAgICAgICAgICAgIHBvaW50QXJyYXkxOiBkaXZpZGVuZC5kYXRhLCBcclxuICAgICAgICAgICAgICAgIHBvaW50QXJyYXkyOiBkaXZpc29yLmRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXS5kYXRhID0gcHJlcGFyZWRQb2ludEFycmF5cy5wb2ludEFycmF5MTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV0uZGF0YSA9IHByZXBhcmVkUG9pbnRBcnJheXMucG9pbnRBcnJheTI7XHJcblxyXG4gICAgICAgICAgICBpZighQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGRpdmlkZW5kLmRhdGEpIHx8ICFDYWxjdWxhdG9ySGVscGVyLmlzVmFsaWRTaWduYWwoZGl2aXNvci5kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk5vdEVub3VnaENvbW1vblRpbWVzdGFtcHMsIFtkaXZpZGVuZC5uYW1lLCBkaXZpc29yLm5hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRGl2Q2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIFJldmlldyBMdWthcyBPYmVyc2FtZXI6XHJcbiAgICAgKiBUaGUgY3ljbG9tYXRpYyBjb21wbGV4aXR5IG9mIHRoaXMgZnVuY3Rpb24gaXMgdG9vIGhpZ2gsIGJ1dCB0aGF0IGRvZXMgbm90IHJlZmxleHQgdGhlIGNvbXBsZXhpdHkgZm9yIGh1bWFucyB0byB1bmRlcnN0YW5kIGl0LiBcclxuICAgICAqIFRoZSBjb21wbGV4aXR5IG9mIHVuZGVyc3RpbmcgdGhpcyBtZXRob2QgaXMgaW4gZmFjdCBzdXBlciBzaW1wbGUuIEl0IGlzIGEgXCJmbGF0IGxpc3RcIiBvZiBpbnB1dCBjaGVja3MuIFRoZXJlZm9yZSB0aGUgbWV0aG9kIG1heSByZW1haW4gaW4gdGhpcyBmb3JtLiBcclxuICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIudmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgLy9yZXRyaWV2ZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBsZXQgZGl2aWRlbmQgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgZGl2aXNvciA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG4gICAgICAgIGxldCBkaXZpc2lvbkJ5WmVybyA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzJdO1xyXG5cclxuICAgICAgICBpZihkaXZpZGVuZCA9PSB1bmRlZmluZWQgfHwgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKGRpdmlkZW5kLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTFdKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmKGRpdmlzb3IgPT0gdW5kZWZpbmVkIHx8IENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhkaXZpc29yLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmKGRpdmlzaW9uQnlaZXJvID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGRpdmlzaW9uQnlaZXJvLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTNdKTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBpZih0aGlzLmhhc0Vycm9ycygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihkaXZpZGVuZC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoZGl2aXNvci5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IEl0IGlzIG5vdCBzdXBwb3J0ZWQgdG8gb3BlcmF0ZSB3aXRoIGp1c3QgdHdvIG51bWJlcnMhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9DaGVja2luZyBpZiB0aGUgZGl2aXNvciBiZWluZyBhIG51bWJlciBpcyAwXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGRpdmlzb3IuZGF0YSkgJiYgZGl2aXNvci5kYXRhID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5OdW1iZXJOb3RBbGxvd2VkVG9CZVplcm8sIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9DaGVja2luZyBpZiB0aGUgc2lnbmFsIGFzIGRpdmlzb3IgY29udGFpbnMgMFxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChkaXZpc29yLmRhdGEpICYmIGRpdmlzaW9uQnlaZXJvLmRhdGEgPT0gMCAmJiBDYWxjdWxhdG9ySGVscGVyLmFtb3VudE9mWmVyb3NJbklQb2ludEFycmF5SW5ZVmFsdWVzKGRpdmlzb3IuZGF0YSkgIT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuQ29udGFpbnNaZXJvSW5ZVmFsdWVzLCBbdGhpcy5pbnB1dE5hbWUyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQ2hlY2tpbmcgaWYgdGhlIHNpZ25hbCBhcyBkaXZpc29yIGNvbnRhaW5zIG1vcmUgdGhhbiB0d28gdmFsdWVzIHdoaWNoIGFyZSBub3QgMFxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChkaXZpc29yLmRhdGEpICYmIChkaXZpc29yLmRhdGEubGVuZ3RoIC0gQ2FsY3VsYXRvckhlbHBlci5hbW91bnRPZlplcm9zSW5JUG9pbnRBcnJheUluWVZhbHVlcyhkaXZpc29yLmRhdGEpKSA8IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBUaGUgZGl2aXNvciBiZWluZyBhIHNpZ25hbCBoYXMgbGVzcyB0aGFuIHR3byB2YWx1ZXMgd2hpY2ggYXJlIG5vdCAwXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZUFsZ29yaXRobSgpIHtcclxuICAgICAgICBzdXBlci5leGVjdXRlQWxnb3JpdGhtKClcclxuXHJcbiAgICAgICAgLy9yZXRyaWV2ZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhIGFuZCBpbml0aWFsaXplIHJlc3VsdFxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YSA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBsZXQgZGl2aWRlbmQgPSBjYWxjdWxhdGlvbklucHV0RGF0YVswXTtcclxuICAgICAgICBsZXQgZGl2aXNvciA9IGNhbGN1bGF0aW9uSW5wdXREYXRhWzFdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoZGl2aWRlbmQuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGRpdmlzb3IuZGF0YSkpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmRpdlR3b1NpZ25hbHMoZGl2aWRlbmQuZGF0YSwgZGl2aXNvci5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGRpdmlkZW5kLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihkaXZpc29yLmRhdGEpKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5kaXZTaWduYWxCeUNvbnN0KGRpdmlkZW5kLmRhdGEsIGRpdmlzb3IuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihkaXZpZGVuZC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoZGl2aXNvci5kYXRhKSl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZGl2Q29uc3RCeVNpZ25hbChkaXZpc29yLmRhdGEsIGRpdmlkZW5kLmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGQgdGhlIHJlc3VsdCBvZiB0aGUgY2FsY3VsYXRpb24gdG8gdGhlIGNhbGN1bGF0aW9uT3V0cHVDb250YWluZXJcclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZSxcclxuICAgICAgICAgICAgaWQ6IHRoaXMub3V0cHV0SWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbCB3aGVuIGlucHV0IGlzIFNpZ25hbCBhbmQgU2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwxXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsMlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgRGl2Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpdlR3b1NpZ25hbHMoaW5wdXRTaWduYWwxOiBBcnJheTxJUG9pbnQ+LCBpbnB1dFNpZ25hbDI6IEFycmF5PElQb2ludD4pOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsMS5sZW5ndGggPT0gaW5wdXRTaWduYWwyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbDEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRTaWduYWwyW2ldLnkgIT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcFggPSBpbnB1dFNpZ25hbDFbaV0ueDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wWSA9IGlucHV0U2lnbmFsMVtpXS55IC8gaW5wdXRTaWduYWwyW2ldLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KHRtcFgsIHRtcFkpKTsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0IHNpZ25hbHMgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgcG9pbnRzIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbCB3aGVuIGlucHV0IGlzIFNpZ25hbCBhbmQgTnVtYmVyIChDb25zdC9TaWduYWwpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnB1dE51bWJlclxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgRGl2Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpdkNvbnN0QnlTaWduYWwoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4sIGlucHV0TnVtYmVyOiBudW1iZXIpOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vVmFsdWVzIHdoaWNoIGFyZSAwIGluIHRoZSBkaXZpc29yIGFyZSBpZ25vcmVkXHJcbiAgICAgICAgICAgIGlmIChpbnB1dFNpZ25hbFtpXS55ICE9IDApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcFggPSBpbnB1dFNpZ25hbFtpXS54O1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcFkgPSBpbnB1dE51bWJlciAvIGlucHV0U2lnbmFsW2ldLnk7XHJcbiAgICAgICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQodG1wWCwgdG1wWSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIG91dHB1dCBzaWduYWwgd2hlbiBpbnB1dCBpcyBTaWduYWwgYW5kIE51bWJlciAoU2lnbmFsL0NvbnN0KVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlucHV0TnVtYmVyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBEaXZDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGl2U2lnbmFsQnlDb25zdChpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50PiwgaW5wdXROdW1iZXI6IG51bWJlcik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHRtcFggPSBpbnB1dFNpZ25hbFtpXS54O1xyXG4gICAgICAgICAgICBsZXQgdG1wWSA9IGlucHV0U2lnbmFsW2ldLnkgLyBpbnB1dE51bWJlcjtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KHRtcFgsIHRtcFkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBvc3NpYmlsaXRpZXMgb2YgYSBkaXZpc29uIHdpdGggMFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVZhbHVlTGlzdEl0ZW0+fVxyXG4gICAgICogQG1lbWJlcm9mIERpdkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREaXZpc2lvbkJ5WmVyb0Vycm9ySGFuZGxpbmcoKTogQXJyYXk8SVZhbHVlTGlzdEl0ZW0+e1xyXG4gICAgICAgIGxldCBkaXZpc2lvbkJ5WmVyb1Bvc3NpYmlsaXRpZXMgPSBuZXcgQXJyYXk8SVZhbHVlTGlzdEl0ZW0+KCk7XHJcbiAgICAgICAgZGl2aXNpb25CeVplcm9Qb3NzaWJpbGl0aWVzLnB1c2goe3ZhbHVlOiBcIjBcIiwgZGlzcGxheVZhbHVlOiBcIkNhdXNlIGVycm9yXCJ9IGFzIElWYWx1ZUxpc3RJdGVtKTtcclxuICAgICAgICBkaXZpc2lvbkJ5WmVyb1Bvc3NpYmlsaXRpZXMucHVzaCh7dmFsdWU6IFwiMVwiLCBkaXNwbGF5VmFsdWU6IFwiUG9pbnRzIGFyZSByZW1vdmVkXCJ9IGFzIElWYWx1ZUxpc3RJdGVtKTtcclxuICAgICAgICByZXR1cm4gZGl2aXNpb25CeVplcm9Qb3NzaWJpbGl0aWVzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==