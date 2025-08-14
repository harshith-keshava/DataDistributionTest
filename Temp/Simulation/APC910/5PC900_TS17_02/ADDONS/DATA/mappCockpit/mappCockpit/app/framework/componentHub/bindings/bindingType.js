define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Specifies the possible binding types
     *
     * @export
     * @enum {number}
     */
    var BindingType;
    (function (BindingType) {
        BindingType[BindingType["UNDEFINED"] = 0] = "UNDEFINED";
        BindingType[BindingType["DATA"] = 1] = "DATA";
        BindingType[BindingType["COMMAND"] = 2] = "COMMAND";
        BindingType[BindingType["COMMAND_RESPONSE"] = 3] = "COMMAND_RESPONSE";
        BindingType[BindingType["STATE"] = 4] = "STATE";
        BindingType[BindingType["INTERFACE"] = 5] = "INTERFACE";
    })(BindingType = exports.BindingType || (exports.BindingType = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ1R5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ1R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7Ozs7O09BS0c7SUFDRixJQUFZLFdBT1o7SUFQQSxXQUFZLFdBQVc7UUFDcEIsdURBQVMsQ0FBQTtRQUNULDZDQUFJLENBQUE7UUFDSixtREFBTyxDQUFBO1FBQ1AscUVBQWdCLENBQUE7UUFDaEIsK0NBQUssQ0FBQTtRQUNMLHVEQUFTLENBQUE7SUFDYixDQUFDLEVBUFksV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFPdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU3BlY2lmaWVzIHRoZSBwb3NzaWJsZSBiaW5kaW5nIHR5cGVzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbiBleHBvcnQgZW51bSBCaW5kaW5nVHlwZXtcclxuICAgIFVOREVGSU5FRCxcclxuICAgIERBVEEsXHJcbiAgICBDT01NQU5ELFxyXG4gICAgQ09NTUFORF9SRVNQT05TRSxcclxuICAgIFNUQVRFLFxyXG4gICAgSU5URVJGQUNFLFxyXG59Il19