define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NumericHelper = /** @class */ (function () {
        function NumericHelper() {
        }
        /**
         * Converts a numeric string to a better formated numeric string for the given datatype (e.g. float and double to Precision(7))
         *
         * @static
         * @param {string} numericString
         * @param {string} dataTypeName
         * @returns {string}
         * @memberof NumericHelper
         */
        NumericHelper.convertNumericString = function (numericString, dataTypeName) {
            if (dataTypeName == "Float") {
                var floatValue = parseFloat(numericString);
                return floatValue.toPrecision(7);
            }
            /*else if (dataTypeName == "Double"){
                let floatValue =  parseFloat(numericString);
                return floatValue.toPrecision(7);
            }*/
            return numericString;
        };
        return NumericHelper;
    }());
    exports.NumericHelper = NumericHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpY0hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL251bWVyaWNIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQ0E7UUFBQTtRQXNCQSxDQUFDO1FBcEJHOzs7Ozs7OztXQVFHO1FBQ0ksa0NBQW9CLEdBQTNCLFVBQTRCLGFBQXFCLEVBQUUsWUFBb0I7WUFDbkUsSUFBRyxZQUFZLElBQUksT0FBTyxFQUFDO2dCQUN2QixJQUFJLFVBQVUsR0FBSSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztZQUNEOzs7ZUFHRztZQUNILE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUF0QkQsSUFzQkM7SUF0Qlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGNsYXNzIE51bWVyaWNIZWxwZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBudW1lcmljIHN0cmluZyB0byBhIGJldHRlciBmb3JtYXRlZCBudW1lcmljIHN0cmluZyBmb3IgdGhlIGdpdmVuIGRhdGF0eXBlIChlLmcuIGZsb2F0IGFuZCBkb3VibGUgdG8gUHJlY2lzaW9uKDcpKVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBudW1lcmljU3RyaW5nXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVR5cGVOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE51bWVyaWNIZWxwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNvbnZlcnROdW1lcmljU3RyaW5nKG51bWVyaWNTdHJpbmc6IHN0cmluZywgZGF0YVR5cGVOYW1lOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYoZGF0YVR5cGVOYW1lID09IFwiRmxvYXRcIil7XHJcbiAgICAgICAgICAgIGxldCBmbG9hdFZhbHVlID0gIHBhcnNlRmxvYXQobnVtZXJpY1N0cmluZyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmbG9hdFZhbHVlLnRvUHJlY2lzaW9uKDcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKmVsc2UgaWYgKGRhdGFUeXBlTmFtZSA9PSBcIkRvdWJsZVwiKXtcclxuICAgICAgICAgICAgbGV0IGZsb2F0VmFsdWUgPSAgcGFyc2VGbG9hdChudW1lcmljU3RyaW5nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZsb2F0VmFsdWUudG9QcmVjaXNpb24oNyk7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgcmV0dXJuIG51bWVyaWNTdHJpbmc7XHJcbiAgICB9XHJcbn0iXX0=