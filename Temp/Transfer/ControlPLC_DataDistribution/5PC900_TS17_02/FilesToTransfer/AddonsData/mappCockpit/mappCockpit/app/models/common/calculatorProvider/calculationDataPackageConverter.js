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
define(["require", "exports", "../../../common/packageConversion/basePackageConverter", "../../../common/packageConversion/enum/objectTypeEnum", "../../../common/packageConversion/arrayConversion", "../../../common/persistence/settings", "../../../common/packageConversion/stringConversion", "../../../common/packageConversion/numberOrStringToStringConversion"], function (require, exports, basePackageConverter_1, objectTypeEnum_1, arrayConversion_1, settings_1, stringConversion_1, numberOrStringToStringConversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling calculation data info setting.
     *
     * @class CalculationDataPackageConverter
     * @extends {BasePackageConverter}
     */
    var CalculationDataPackageConverter = /** @class */ (function (_super) {
        __extends(CalculationDataPackageConverter, _super);
        /**
         * Creates an instance of CalculationDataPackageConverter.
         *
         * @memberof CalculationDataPackageConverter
         */
        function CalculationDataPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.CALCULATION, "CalculationDataInfo") || this;
            _this.conversionInfoContainer.addConversion("1.0", 1, [
                new stringConversion_1.StringConversion(["uniqueId", "type"], ["uniqueId", "type"]),
                new arrayConversion_1.ArrayConversion(["inputDataValues"], ["inputDataValues"], new numberOrStringToStringConversion_1.NumberOrStringToStringConversion([], []))
            ]);
            _this.conversionInfoContainer.addConversion("2.0", 2, [
                new arrayConversion_1.ArrayConversion(["inputDataIds", "inputDataValues"], ["inputDataIds", "inputDataValues"], new numberOrStringToStringConversion_1.NumberOrStringToStringConversion([], [])),
                new stringConversion_1.StringConversion(["type", "uniqueId"], ["type", "uniqueId"])
            ]);
            _this.settingsUpgradeMap.set(1, _this.upgradeV1Setting.bind(_this));
            return _this;
        }
        /**
         * Creates and returns the substitution map for matching calculator display string to calculator type.
         *
         * @private
         * @returns {Map<string, string>}
         * @memberof CalculationDataPackageConverter
         */
        CalculationDataPackageConverter.prototype.getDisplayStringToCalculationTypeMapV1 = function () {
            var v1SubstitutionMap = new Map();
            v1SubstitutionMap.set("Absolute value |a|", "absolute value");
            v1SubstitutionMap.set("Addition a+b", "add");
            v1SubstitutionMap.set("Bitwise AND", "bitwise and");
            v1SubstitutionMap.set("Atan2(a)", "atan2");
            v1SubstitutionMap.set("Cos(a)", "cos");
            v1SubstitutionMap.set("Differentiate dy/dt", "differentiate");
            v1SubstitutionMap.set("Division a/b", "division");
            v1SubstitutionMap.set("Equal to a = b", "equal to");
            v1SubstitutionMap.set("Exponential a" + "\u207F", "exponentiation");
            v1SubstitutionMap.set("FFT", "fft bilstein");
            v1SubstitutionMap.set("Greater than a > b", "greater than");
            v1SubstitutionMap.set("Less than a < b", "less than");
            v1SubstitutionMap.set("Limit", "max min");
            v1SubstitutionMap.set("LP Bessel", "lp bessel");
            v1SubstitutionMap.set("LP Butterworth", "lp butterworth");
            v1SubstitutionMap.set("Max (a,b)", "max");
            v1SubstitutionMap.set("Min (a,b)", "min");
            v1SubstitutionMap.set("Modulo", "modulo");
            v1SubstitutionMap.set("Multiplication a*b", "multiplication");
            v1SubstitutionMap.set("Bitwise NOT", "bitwise not");
            v1SubstitutionMap.set("Bitwise OR", "bitwise or");
            v1SubstitutionMap.set("Shift time axis", "shift time axis");
            v1SubstitutionMap.set("Sin(a)", "sin");
            v1SubstitutionMap.set("Square root √a", "square root ");
            v1SubstitutionMap.set("Math expression", "stringmathjs");
            v1SubstitutionMap.set("Subtraction a-b", "sub");
            v1SubstitutionMap.set("Time stamp synchronization", "timeStampSync");
            v1SubstitutionMap.set("Vector length √(a\u00B2 + b\u00B2)", "vector ");
            v1SubstitutionMap.set("XY", "xy");
            return v1SubstitutionMap;
        };
        /**
         * Returns the input data ids based on the calculator display string.
         *
         * @private
         * @param {string} calculationType The calculator type for which the inputDataIds are requested
         * @returns {Array<string>}
         * @memberof CalculationDataPackageConverter
         *
         * Review Lukas Obersamer:
         * The cyclomatic complexity of this function is too high, but that does not reflect the complexity for humans to understand it.
         * The complexity of understing this method is in fact super simple. Therefore the method may remain in this form.
         * Furthermore, this is a part that covers to update of one format to another. Changing to a new format will not require to touch this code. Therefore the expected rate of change is minimal.
         * In the future, similar topics should be solvel using different solutions, such as a map.
         */
        CalculationDataPackageConverter.prototype.getInputDataIdsForTypeV1 = function (calculationType) {
            var inputDataIds = new Array();
            switch (calculationType) {
                case "absolute value":
                    inputDataIds.push("InputSignalA");
                    break;
                case "add":
                    inputDataIds.push("SummandA");
                    inputDataIds.push("SummandB");
                    break;
                case "bitwise and":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "atan2":
                    inputDataIds.push("InputSignalA");
                    break;
                case "cos":
                    inputDataIds.push("InputSignalA");
                    break;
                case "differentiate":
                    inputDataIds.push("InputSignal");
                    break;
                case "division":
                    inputDataIds.push("DividendA");
                    inputDataIds.push("DivisorB");
                    inputDataIds.push("DivisionByZero");
                    break;
                case "equal to":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "exponentiation":
                    inputDataIds.push("InputSignalA");
                    inputDataIds.push("ConstantValueN");
                    break;
                case "fft bilstein":
                    inputDataIds.push("InputSignal");
                    break;
                case "greater than":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "less than":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "max min":
                    inputDataIds.push("UpperLimit");
                    inputDataIds.push("LowerLimit");
                    inputDataIds.push("InputSignal");
                    break;
                case "lp bessel":
                    inputDataIds.push("Order");
                    inputDataIds.push("CutoffFrequency");
                    inputDataIds.push("InputSignal");
                    break;
                case "lp butterworth":
                    inputDataIds.push("Order");
                    inputDataIds.push("CutoffFrequency");
                    inputDataIds.push("InputSignal");
                    break;
                case "max":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "min":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "modulo":
                    inputDataIds.push("DividendA");
                    inputDataIds.push("DivisorB");
                    inputDataIds.push("DivisionByZero");
                    break;
                case "multiplication":
                    inputDataIds.push("MultiplicandA");
                    inputDataIds.push("MultiplierB");
                    break;
                case "bitwise not":
                    inputDataIds.push("InputSignal");
                    break;
                case "bitwise or":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "shift time axis":
                    inputDataIds.push("InputSignalA");
                    inputDataIds.push("DelayTimeB");
                    break;
                case "sin":
                    inputDataIds.push("InputSignalA");
                    break;
                case "square root ":
                    inputDataIds.push("InputSignalA");
                    break;
                case "stringmathjs":
                    inputDataIds.push("CalculatingValues");
                    inputDataIds.push("CalculatingTime");
                    inputDataIds.push("InputSignalOrNumberA");
                    inputDataIds.push("InputSignalOrNumberB");
                    inputDataIds.push("InputSignalOrNumberC");
                    inputDataIds.push("InputSignalOrNumberD");
                    inputDataIds.push("InputSignalOrNumberE");
                    break;
                case "sub":
                    inputDataIds.push("MinuendA");
                    inputDataIds.push("SubtrahendB");
                    break;
                case "timeStampSync":
                    inputDataIds.push("InputSignalAToSynchronizeTimeStamps");
                    inputDataIds.push("InputSignalBWithReferenceTimeStamps");
                    break;
                case "vector ":
                    inputDataIds.push("InputSignalA");
                    inputDataIds.push("InputSignalB");
                    break;
                case "xy":
                    inputDataIds.push("XSignal");
                    inputDataIds.push("YSignal");
                    break;
            }
            return inputDataIds;
        };
        /**
         * Upgrades the CalculationDataInfo Setting from version 1.0 to version 2.0
         *
         * @private
         * @param {ISettings} settingData
         * @returns {ISettings}
         * @memberof CalculationDataPackageConverter
         */
        CalculationDataPackageConverter.prototype.upgradeV1Setting = function (settingData) {
            var setting = settings_1.Settings.create(settingData);
            var upgradedSetting = new settings_1.Settings(this.settingsType, "2.0");
            // set uniqueId field to updated setting without changes
            var uniqueId = setting.getValue("uniqueId");
            upgradedSetting.setValue("uniqueId", uniqueId);
            // set inputDataValues field to updated setting without changes
            var inputDataValues = setting.getValue("inputDataValues");
            upgradedSetting.setValue("inputDataValues", inputDataValues);
            // set type field to updated setting and replace the old value displaystring with the new value calculator type
            var type = setting.getValue("type");
            var substitutionMap = this.getDisplayStringToCalculationTypeMapV1();
            type = substitutionMap.get(type);
            if (type !== undefined) {
                upgradedSetting.setValue("type", type);
            }
            else {
                throw new Error("no calculation type for calculation display string found");
            }
            // set inputDataIds field to updated setting and generate its values based on the calculator type
            // fiels didnt exist on old settings version
            var inputDataIds = this.getInputDataIdsForTypeV1(type);
            if (inputDataIds.length > 0) {
                upgradedSetting.setValue("inputDataIds", inputDataIds);
            }
            else {
                throw new Error("no input data ids for calculation type found");
            }
            return upgradedSetting;
        };
        return CalculationDataPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.CalculationDataPackageConverter = CalculationDataPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhUGFja2FnZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhUGFja2FnZUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7Ozs7O09BS0c7SUFDSDtRQUE4QyxtREFBb0I7UUFFOUQ7Ozs7V0FJRztRQUNIO1lBQUEsWUFDSSxrQkFBTSwyQkFBVSxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxTQVl2RDtZQVZHLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDakQsSUFBSSxtQ0FBZ0IsQ0FBQyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxpQ0FBZSxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxtRUFBZ0MsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDOUcsQ0FBQyxDQUFDO1lBQ0gsS0FBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLGlDQUFlLENBQUMsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLElBQUksbUVBQWdDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMzSSxJQUFJLG1DQUFnQixDQUFDLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ25FLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQzs7UUFDckUsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGdGQUFzQyxHQUE5QztZQUNJLElBQUksaUJBQWlCLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7WUFDbkQsaUJBQWlCLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDOUQsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3BELGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0MsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2QyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDOUQsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNsRCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDcEQsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUNwRSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQzdDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUM1RCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDdEQsaUJBQWlCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMxQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzFELGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlELGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDcEQsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNsRCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUM1RCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUN4RCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDekQsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hELGlCQUFpQixDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUNyRSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkUsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVsQyxPQUFPLGlCQUFpQixDQUFDO1FBQ2pDLENBQUM7UUFDRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0ssa0VBQXdCLEdBQWhDLFVBQWlDLGVBQXVCO1lBQ3BELElBQUksWUFBWSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFFdkMsUUFBTyxlQUFlLEVBQUM7Z0JBQ25CLEtBQUssZ0JBQWdCO29CQUNqQixZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNsQyxNQUFNO2dCQUNWLEtBQUssS0FBSztvQkFDTixZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5QixZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5QixNQUFNO2dCQUNWLEtBQUssYUFBYTtvQkFDZCxZQUFZLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQzVDLFlBQVksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDNUMsTUFBTTtnQkFDVixLQUFLLE9BQU87b0JBQ1IsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDbEMsTUFBTTtnQkFDVixLQUFLLEtBQUs7b0JBQ04sWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDbEMsTUFBTTtnQkFDVixLQUFLLGVBQWU7b0JBQ2hCLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1YsS0FBSyxVQUFVO29CQUNYLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQy9CLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDcEMsTUFBTTtnQkFDVixLQUFLLFVBQVU7b0JBQ1gsWUFBWSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO29CQUM1QyxZQUFZLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1YsS0FBSyxnQkFBZ0I7b0JBQ2pCLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ2xDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDcEMsTUFBTTtnQkFDVixLQUFLLGNBQWM7b0JBQ2YsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDakMsTUFBTTtnQkFDVixLQUFLLGNBQWM7b0JBQ2YsWUFBWSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO29CQUM1QyxZQUFZLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1YsS0FBSyxXQUFXO29CQUNaLFlBQVksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDNUMsWUFBWSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO29CQUM1QyxNQUFNO2dCQUNWLEtBQUssU0FBUztvQkFDVixZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNoQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNoQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNqQyxNQUFNO2dCQUNWLEtBQUssV0FBVztvQkFDWixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMzQixZQUFZLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQ3JDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1YsS0FBSyxnQkFBZ0I7b0JBQ2pCLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzNCLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDckMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDakMsTUFBTTtnQkFDVixLQUFLLEtBQUs7b0JBQ04sWUFBWSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO29CQUM1QyxZQUFZLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1YsS0FBSyxLQUFLO29CQUNOLFlBQVksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDNUMsWUFBWSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO29CQUM1QyxNQUFNO2dCQUNWLEtBQUssUUFBUTtvQkFDVCxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUMvQixZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5QixZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ3BDLE1BQU07Z0JBQ1YsS0FBSyxnQkFBZ0I7b0JBQ2pCLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ25DLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1YsS0FBSyxhQUFhO29CQUNkLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1YsS0FBSyxZQUFZO29CQUNiLFlBQVksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDNUMsWUFBWSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO29CQUM1QyxNQUFNO2dCQUNWLEtBQUssaUJBQWlCO29CQUNsQixZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNsQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNoQyxNQUFNO2dCQUNWLEtBQUssS0FBSztvQkFDTixZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNsQyxNQUFNO2dCQUNWLEtBQUssY0FBYztvQkFDZixZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNsQyxNQUFNO2dCQUNWLEtBQUssY0FBYztvQkFDZixZQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQ3ZDLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDckMsWUFBWSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUMxQyxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQzFDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFDMUMsWUFBWSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUMxQyxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQzFDLE1BQU07Z0JBQ1YsS0FBSyxLQUFLO29CQUNOLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1YsS0FBSyxlQUFlO29CQUNoQixZQUFZLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7b0JBQ3pELFlBQVksQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQztvQkFDekQsTUFBTTtnQkFDVixLQUFLLFNBQVM7b0JBQ1YsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDbEMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDbEMsTUFBTTtnQkFDVixLQUFLLElBQUk7b0JBQ0wsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDN0IsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDN0IsTUFBTTthQUNiO1lBQ0QsT0FBTyxZQUFZLENBQUM7UUFDeEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSywwREFBZ0IsR0FBeEIsVUFBeUIsV0FBc0I7WUFDM0MsSUFBSSxPQUFPLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDM0MsSUFBSSxlQUFlLEdBQUcsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFN0Qsd0RBQXdEO1lBQ3hELElBQUksUUFBUSxHQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0MsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFL0MsK0RBQStEO1lBQy9ELElBQUksZUFBZSxHQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN6RCxlQUFlLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBRTdELCtHQUErRztZQUMvRyxJQUFJLElBQUksR0FBRSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLElBQUksZUFBZSxHQUFFLElBQUksQ0FBQyxzQ0FBc0MsRUFBRSxDQUFDO1lBQ25FLElBQUksR0FBRSxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUcsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDbkIsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFBO2FBQzlFO1lBRUQsaUdBQWlHO1lBQ2pHLDRDQUE0QztZQUM1QyxJQUFJLFlBQVksR0FBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsSUFBRyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsZUFBZSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDMUQ7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO2FBQ25FO1lBRUQsT0FBTyxlQUFlLENBQUM7UUFDM0IsQ0FBQztRQUNMLHNDQUFDO0lBQUQsQ0FBQyxBQXBQRCxDQUE4QywyQ0FBb0IsR0FvUGpFO0lBRVEsMEVBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVBhY2thZ2VDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2Jhc2VQYWNrYWdlQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuaW1wb3J0IHsgQXJyYXlDb252ZXJzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9hcnJheUNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTdHJpbmdDb252ZXJzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9zdHJpbmdDb252ZXJzaW9uXCI7XHJcbmltcG9ydCB7IE51bWJlck9yU3RyaW5nVG9TdHJpbmdDb252ZXJzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9udW1iZXJPclN0cmluZ1RvU3RyaW5nQ29udmVyc2lvblwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBwYWNrYWdlIGNvbnZlcnRlciBoYW5kbGluZyBjYWxjdWxhdGlvbiBkYXRhIGluZm8gc2V0dGluZy5cclxuICpcclxuICogQGNsYXNzIENhbGN1bGF0aW9uRGF0YVBhY2thZ2VDb252ZXJ0ZXJcclxuICogQGV4dGVuZHMge0Jhc2VQYWNrYWdlQ29udmVydGVyfVxyXG4gKi9cclxuY2xhc3MgQ2FsY3VsYXRpb25EYXRhUGFja2FnZUNvbnZlcnRlciBleHRlbmRzIEJhc2VQYWNrYWdlQ29udmVydGVye1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2FsY3VsYXRpb25EYXRhUGFja2FnZUNvbnZlcnRlci5cclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcihPYmplY3RUeXBlLkNBTENVTEFUSU9OLCBcIkNhbGN1bGF0aW9uRGF0YUluZm9cIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb252ZXJzaW9uSW5mb0NvbnRhaW5lci5hZGRDb252ZXJzaW9uKFwiMS4wXCIsIDEsIFtcclxuICAgICAgICAgICAgbmV3IFN0cmluZ0NvbnZlcnNpb24oW1widW5pcXVlSWRcIiwgXCJ0eXBlXCJdLCBbXCJ1bmlxdWVJZFwiLCBcInR5cGVcIl0pLFxyXG4gICAgICAgICAgICBuZXcgQXJyYXlDb252ZXJzaW9uKFtcImlucHV0RGF0YVZhbHVlc1wiXSwgW1wiaW5wdXREYXRhVmFsdWVzXCJdLCBuZXcgTnVtYmVyT3JTdHJpbmdUb1N0cmluZ0NvbnZlcnNpb24oW10sIFtdKSlcclxuICAgICAgICBdKTtcclxuICAgICAgICB0aGlzLmNvbnZlcnNpb25JbmZvQ29udGFpbmVyLmFkZENvbnZlcnNpb24oXCIyLjBcIiwgMiwgW1xyXG4gICAgICAgICAgICBuZXcgQXJyYXlDb252ZXJzaW9uKFtcImlucHV0RGF0YUlkc1wiLCBcImlucHV0RGF0YVZhbHVlc1wiXSwgW1wiaW5wdXREYXRhSWRzXCIsIFwiaW5wdXREYXRhVmFsdWVzXCJdLCBuZXcgTnVtYmVyT3JTdHJpbmdUb1N0cmluZ0NvbnZlcnNpb24oW10sIFtdKSksXHJcbiAgICAgICAgICAgIG5ldyBTdHJpbmdDb252ZXJzaW9uKFtcInR5cGVcIiwgXCJ1bmlxdWVJZFwiXSwgW1widHlwZVwiLCBcInVuaXF1ZUlkXCJdKVxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICB0aGlzLnNldHRpbmdzVXBncmFkZU1hcC5zZXQoMSwgdGhpcy51cGdyYWRlVjFTZXR0aW5nLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyB0aGUgc3Vic3RpdHV0aW9uIG1hcCBmb3IgbWF0Y2hpbmcgY2FsY3VsYXRvciBkaXNwbGF5IHN0cmluZyB0byBjYWxjdWxhdG9yIHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtNYXA8c3RyaW5nLCBzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREaXNwbGF5U3RyaW5nVG9DYWxjdWxhdGlvblR5cGVNYXBWMSgpOiBNYXA8c3RyaW5nLCBzdHJpbmc+IHtcclxuICAgICAgICBsZXQgdjFTdWJzdGl0dXRpb25NYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIkFic29sdXRlIHZhbHVlIHxhfFwiLCBcImFic29sdXRlIHZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2MVN1YnN0aXR1dGlvbk1hcC5zZXQoXCJBZGRpdGlvbiBhK2JcIiwgXCJhZGRcIik7XHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIkJpdHdpc2UgQU5EXCIsIFwiYml0d2lzZSBhbmRcIik7XHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIkF0YW4yKGEpXCIsIFwiYXRhbjJcIik7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIkNvcyhhKVwiLCBcImNvc1wiKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIkRpZmZlcmVudGlhdGUgZHkvZHRcIiwgXCJkaWZmZXJlbnRpYXRlXCIpOyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdjFTdWJzdGl0dXRpb25NYXAuc2V0KFwiRGl2aXNpb24gYS9iXCIsIFwiZGl2aXNpb25cIik7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIkVxdWFsIHRvIGEgPSBiXCIsIFwiZXF1YWwgdG9cIik7XHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIkV4cG9uZW50aWFsIGFcIiArIFwiXFx1MjA3RlwiLCBcImV4cG9uZW50aWF0aW9uXCIpO1xyXG4gICAgICAgICAgICB2MVN1YnN0aXR1dGlvbk1hcC5zZXQoXCJGRlRcIiwgXCJmZnQgYmlsc3RlaW5cIik7XHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIkdyZWF0ZXIgdGhhbiBhID4gYlwiLCBcImdyZWF0ZXIgdGhhblwiKTtcclxuICAgICAgICAgICAgdjFTdWJzdGl0dXRpb25NYXAuc2V0KFwiTGVzcyB0aGFuIGEgPCBiXCIsIFwibGVzcyB0aGFuXCIpO1xyXG4gICAgICAgICAgICB2MVN1YnN0aXR1dGlvbk1hcC5zZXQoXCJMaW1pdFwiLCBcIm1heCBtaW5cIik7XHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIkxQIEJlc3NlbFwiLCBcImxwIGJlc3NlbFwiKTtcclxuICAgICAgICAgICAgdjFTdWJzdGl0dXRpb25NYXAuc2V0KFwiTFAgQnV0dGVyd29ydGhcIiwgXCJscCBidXR0ZXJ3b3J0aFwiKTtcclxuICAgICAgICAgICAgdjFTdWJzdGl0dXRpb25NYXAuc2V0KFwiTWF4IChhLGIpXCIsIFwibWF4XCIpO1xyXG4gICAgICAgICAgICB2MVN1YnN0aXR1dGlvbk1hcC5zZXQoXCJNaW4gKGEsYilcIiwgXCJtaW5cIik7XHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIk1vZHVsb1wiLCBcIm1vZHVsb1wiKTtcclxuICAgICAgICAgICAgdjFTdWJzdGl0dXRpb25NYXAuc2V0KFwiTXVsdGlwbGljYXRpb24gYSpiXCIsIFwibXVsdGlwbGljYXRpb25cIik7XHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIkJpdHdpc2UgTk9UXCIsIFwiYml0d2lzZSBub3RcIik7XHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIkJpdHdpc2UgT1JcIiwgXCJiaXR3aXNlIG9yXCIpO1xyXG4gICAgICAgICAgICB2MVN1YnN0aXR1dGlvbk1hcC5zZXQoXCJTaGlmdCB0aW1lIGF4aXNcIiwgXCJzaGlmdCB0aW1lIGF4aXNcIik7XHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIlNpbihhKVwiLCBcInNpblwiKTtcclxuICAgICAgICAgICAgdjFTdWJzdGl0dXRpb25NYXAuc2V0KFwiU3F1YXJlIHJvb3Qg4oiaYVwiLCBcInNxdWFyZSByb290IFwiKTtcclxuICAgICAgICAgICAgdjFTdWJzdGl0dXRpb25NYXAuc2V0KFwiTWF0aCBleHByZXNzaW9uXCIsIFwic3RyaW5nbWF0aGpzXCIpO1xyXG4gICAgICAgICAgICB2MVN1YnN0aXR1dGlvbk1hcC5zZXQoXCJTdWJ0cmFjdGlvbiBhLWJcIiwgXCJzdWJcIik7XHJcbiAgICAgICAgICAgIHYxU3Vic3RpdHV0aW9uTWFwLnNldChcIlRpbWUgc3RhbXAgc3luY2hyb25pemF0aW9uXCIsIFwidGltZVN0YW1wU3luY1wiKTtcclxuICAgICAgICAgICAgdjFTdWJzdGl0dXRpb25NYXAuc2V0KFwiVmVjdG9yIGxlbmd0aCDiiJooYVxcdTAwQjIgKyBiXFx1MDBCMilcIiwgXCJ2ZWN0b3IgXCIpO1xyXG4gICAgICAgICAgICB2MVN1YnN0aXR1dGlvbk1hcC5zZXQoXCJYWVwiLCBcInh5XCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHYxU3Vic3RpdHV0aW9uTWFwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbnB1dCBkYXRhIGlkcyBiYXNlZCBvbiB0aGUgY2FsY3VsYXRvciBkaXNwbGF5IHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNhbGN1bGF0aW9uVHlwZSBUaGUgY2FsY3VsYXRvciB0eXBlIGZvciB3aGljaCB0aGUgaW5wdXREYXRhSWRzIGFyZSByZXF1ZXN0ZWRcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqIFxyXG4gICAgICogUmV2aWV3IEx1a2FzIE9iZXJzYW1lcjpcclxuICAgICAqIFRoZSBjeWNsb21hdGljIGNvbXBsZXhpdHkgb2YgdGhpcyBmdW5jdGlvbiBpcyB0b28gaGlnaCwgYnV0IHRoYXQgZG9lcyBub3QgcmVmbGVjdCB0aGUgY29tcGxleGl0eSBmb3IgaHVtYW5zIHRvIHVuZGVyc3RhbmQgaXQuIFxyXG4gICAgICogVGhlIGNvbXBsZXhpdHkgb2YgdW5kZXJzdGluZyB0aGlzIG1ldGhvZCBpcyBpbiBmYWN0IHN1cGVyIHNpbXBsZS4gVGhlcmVmb3JlIHRoZSBtZXRob2QgbWF5IHJlbWFpbiBpbiB0aGlzIGZvcm0uXHJcblx0ICogRnVydGhlcm1vcmUsIHRoaXMgaXMgYSBwYXJ0IHRoYXQgY292ZXJzIHRvIHVwZGF0ZSBvZiBvbmUgZm9ybWF0IHRvIGFub3RoZXIuIENoYW5naW5nIHRvIGEgbmV3IGZvcm1hdCB3aWxsIG5vdCByZXF1aXJlIHRvIHRvdWNoIHRoaXMgY29kZS4gVGhlcmVmb3JlIHRoZSBleHBlY3RlZCByYXRlIG9mIGNoYW5nZSBpcyBtaW5pbWFsLlxyXG5cdCAqIEluIHRoZSBmdXR1cmUsIHNpbWlsYXIgdG9waWNzIHNob3VsZCBiZSBzb2x2ZWwgdXNpbmcgZGlmZmVyZW50IHNvbHV0aW9ucywgc3VjaCBhcyBhIG1hcC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbnB1dERhdGFJZHNGb3JUeXBlVjEoY2FsY3VsYXRpb25UeXBlOiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIGxldCBpbnB1dERhdGFJZHMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICBzd2l0Y2goY2FsY3VsYXRpb25UeXBlKXtcclxuICAgICAgICAgICAgY2FzZSBcImFic29sdXRlIHZhbHVlXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsQVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYWRkXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIlN1bW1hbmRBXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJTdW1tYW5kQlwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYml0d2lzZSBhbmRcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPckNvbnN0YW50QVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPckNvbnN0YW50QlwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYXRhbjJcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxBXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIFwiY29zXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsQVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBcImRpZmZlcmVudGlhdGVcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhazsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgXCJkaXZpc2lvblwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJEaXZpZGVuZEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIkRpdmlzb3JCXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJEaXZpc2lvbkJ5WmVyb1wiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBcImVxdWFsIHRvXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImV4cG9uZW50aWF0aW9uXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsQVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiQ29uc3RhbnRWYWx1ZU5cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZmdCBiaWxzdGVpblwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZ3JlYXRlciB0aGFuXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImxlc3MgdGhhblwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbE9yQ29uc3RhbnRBXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbE9yQ29uc3RhbnRCXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYXggbWluXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIlVwcGVyTGltaXRcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIkxvd2VyTGltaXRcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJscCBiZXNzZWxcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiT3JkZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIkN1dG9mZkZyZXF1ZW5jeVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImxwIGJ1dHRlcndvcnRoXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIk9yZGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJDdXRvZmZGcmVxdWVuY3lcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYXhcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPckNvbnN0YW50QVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPckNvbnN0YW50QlwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibWluXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1vZHVsb1wiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJEaXZpZGVuZEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIkRpdmlzb3JCXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJEaXZpc2lvbkJ5WmVyb1wiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibXVsdGlwbGljYXRpb25cIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiTXVsdGlwbGljYW5kQVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiTXVsdGlwbGllckJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJpdHdpc2Ugbm90XCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJiaXR3aXNlIG9yXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNoaWZ0IHRpbWUgYXhpc1wiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIkRlbGF5VGltZUJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNpblwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbEFcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNxdWFyZSByb290IFwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbEFcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN0cmluZ21hdGhqc1wiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJDYWxjdWxhdGluZ1ZhbHVlc1wiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiQ2FsY3VsYXRpbmdUaW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbE9yTnVtYmVyQVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPck51bWJlckJcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JOdW1iZXJDXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbE9yTnVtYmVyRFwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPck51bWJlckVcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1YlwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJNaW51ZW5kQVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiU3VidHJhaGVuZEJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInRpbWVTdGFtcFN5bmNcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxBVG9TeW5jaHJvbml6ZVRpbWVTdGFtcHNcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsQldpdGhSZWZlcmVuY2VUaW1lU3RhbXBzXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2ZWN0b3IgXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsQVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxCXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4eVwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJYU2lnbmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJZU2lnbmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGFJZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGdyYWRlcyB0aGUgQ2FsY3VsYXRpb25EYXRhSW5mbyBTZXR0aW5nIGZyb20gdmVyc2lvbiAxLjAgdG8gdmVyc2lvbiAyLjBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7SVNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGdyYWRlVjFTZXR0aW5nKHNldHRpbmdEYXRhOiBJU2V0dGluZ3MpOiBJU2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzZXR0aW5nID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdEYXRhKTtcclxuICAgICAgICBsZXQgdXBncmFkZWRTZXR0aW5nID0gbmV3IFNldHRpbmdzKHRoaXMuc2V0dGluZ3NUeXBlLCBcIjIuMFwiKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHVuaXF1ZUlkIGZpZWxkIHRvIHVwZGF0ZWQgc2V0dGluZyB3aXRob3V0IGNoYW5nZXNcclxuICAgICAgICBsZXQgdW5pcXVlSWQ9IHNldHRpbmcuZ2V0VmFsdWUoXCJ1bmlxdWVJZFwiKTtcclxuICAgICAgICB1cGdyYWRlZFNldHRpbmcuc2V0VmFsdWUoXCJ1bmlxdWVJZFwiLCB1bmlxdWVJZCk7XHJcblxyXG4gICAgICAgIC8vIHNldCBpbnB1dERhdGFWYWx1ZXMgZmllbGQgdG8gdXBkYXRlZCBzZXR0aW5nIHdpdGhvdXQgY2hhbmdlc1xyXG4gICAgICAgIGxldCBpbnB1dERhdGFWYWx1ZXM9IHNldHRpbmcuZ2V0VmFsdWUoXCJpbnB1dERhdGFWYWx1ZXNcIik7XHJcbiAgICAgICAgdXBncmFkZWRTZXR0aW5nLnNldFZhbHVlKFwiaW5wdXREYXRhVmFsdWVzXCIsIGlucHV0RGF0YVZhbHVlcyk7XHJcblxyXG4gICAgICAgIC8vIHNldCB0eXBlIGZpZWxkIHRvIHVwZGF0ZWQgc2V0dGluZyBhbmQgcmVwbGFjZSB0aGUgb2xkIHZhbHVlIGRpc3BsYXlzdHJpbmcgd2l0aCB0aGUgbmV3IHZhbHVlIGNhbGN1bGF0b3IgdHlwZVxyXG4gICAgICAgIGxldCB0eXBlPSBzZXR0aW5nLmdldFZhbHVlKFwidHlwZVwiKTtcclxuICAgICAgICBsZXQgc3Vic3RpdHV0aW9uTWFwPSB0aGlzLmdldERpc3BsYXlTdHJpbmdUb0NhbGN1bGF0aW9uVHlwZU1hcFYxKCk7XHJcbiAgICAgICAgdHlwZT0gc3Vic3RpdHV0aW9uTWFwLmdldCh0eXBlKTtcclxuICAgICAgICBpZih0eXBlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdXBncmFkZWRTZXR0aW5nLnNldFZhbHVlKFwidHlwZVwiLCB0eXBlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBjYWxjdWxhdGlvbiB0eXBlIGZvciBjYWxjdWxhdGlvbiBkaXNwbGF5IHN0cmluZyBmb3VuZFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2V0IGlucHV0RGF0YUlkcyBmaWVsZCB0byB1cGRhdGVkIHNldHRpbmcgYW5kIGdlbmVyYXRlIGl0cyB2YWx1ZXMgYmFzZWQgb24gdGhlIGNhbGN1bGF0b3IgdHlwZVxyXG4gICAgICAgIC8vIGZpZWxzIGRpZG50IGV4aXN0IG9uIG9sZCBzZXR0aW5ncyB2ZXJzaW9uXHJcbiAgICAgICAgbGV0IGlucHV0RGF0YUlkcz0gdGhpcy5nZXRJbnB1dERhdGFJZHNGb3JUeXBlVjEodHlwZSk7XHJcbiAgICAgICAgaWYoaW5wdXREYXRhSWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdXBncmFkZWRTZXR0aW5nLnNldFZhbHVlKFwiaW5wdXREYXRhSWRzXCIsIGlucHV0RGF0YUlkcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gaW5wdXQgZGF0YSBpZHMgZm9yIGNhbGN1bGF0aW9uIHR5cGUgZm91bmRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdXBncmFkZWRTZXR0aW5nO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQYWNrYWdlQ29udmVydGVyIH0iXX0=