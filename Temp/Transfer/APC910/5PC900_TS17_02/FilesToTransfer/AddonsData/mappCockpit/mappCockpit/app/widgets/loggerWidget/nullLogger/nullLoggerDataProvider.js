define(["require", "exports", "./../interfaces/loggerDataProviderInterface"], function (require, exports, loggerDataProviderInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Null LoggerDataProvider object
     *
     * @export
     * @class NullLoggerDataProvider
     * @implements {ILoggerDataProvider}
     */
    var NullLoggerDataProvider = /** @class */ (function () {
        function NullLoggerDataProvider() {
            this.eventDataAvailable = new loggerDataProviderInterface_1.EventDataAvailable();
            this.eventDataLoadingProgressChanged = new loggerDataProviderInterface_1.EventDataLoadingProgress();
        }
        NullLoggerDataProvider.prototype.setComponentMethods = function (componentMethods) {
        };
        NullLoggerDataProvider.prototype.uploadDataFromTarget = function () {
        };
        NullLoggerDataProvider.prototype.importDataFromFile = function () {
        };
        NullLoggerDataProvider.prototype.exportDataToFile = function (data) {
        };
        NullLoggerDataProvider.prototype.isExportPossible = function () {
            return false;
        };
        NullLoggerDataProvider.prototype.dispose = function () {
        };
        return NullLoggerDataProvider;
    }());
    exports.NullLoggerDataProvider = NullLoggerDataProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbExvZ2dlckRhdGFQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9sb2dnZXJXaWRnZXQvbnVsbExvZ2dlci9udWxsTG9nZ2VyRGF0YVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBOzs7Ozs7T0FNRztJQUNIO1FBQUE7WUFDSSx1QkFBa0IsR0FBRyxJQUFJLGdEQUFrQixFQUFFLENBQUM7WUFDOUMsb0NBQStCLEdBQUcsSUFBSSxzREFBd0IsRUFBRSxDQUFDO1FBeUJyRSxDQUFDO1FBdkJHLG9EQUFtQixHQUFuQixVQUFvQixnQkFBOEM7UUFFbEUsQ0FBQztRQUVELHFEQUFvQixHQUFwQjtRQUVBLENBQUM7UUFFRCxtREFBa0IsR0FBbEI7UUFFQSxDQUFDO1FBRUQsaURBQWdCLEdBQWhCLFVBQWlCLElBQVU7UUFFM0IsQ0FBQztRQUVELGlEQUFnQixHQUFoQjtZQUNJLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCx3Q0FBTyxHQUFQO1FBRUEsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQTNCRCxJQTJCQztJQTNCWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTG9nZ2VyRGF0YVByb3ZpZGVyLCBFdmVudERhdGFBdmFpbGFibGUsIEV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzcyB9IGZyb20gXCIuLy4uL2ludGVyZmFjZXMvbG9nZ2VyRGF0YVByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuXHJcbi8qKlxyXG4gKiBOdWxsIExvZ2dlckRhdGFQcm92aWRlciBvYmplY3RcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgTnVsbExvZ2dlckRhdGFQcm92aWRlclxyXG4gKiBAaW1wbGVtZW50cyB7SUxvZ2dlckRhdGFQcm92aWRlcn1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOdWxsTG9nZ2VyRGF0YVByb3ZpZGVyIGltcGxlbWVudHMgSUxvZ2dlckRhdGFQcm92aWRlcntcclxuICAgIGV2ZW50RGF0YUF2YWlsYWJsZSA9IG5ldyBFdmVudERhdGFBdmFpbGFibGUoKTtcclxuICAgIGV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWQgPSBuZXcgRXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzKCk7XHJcbiAgICBcclxuICAgIHNldENvbXBvbmVudE1ldGhvZHMoY29tcG9uZW50TWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXBsb2FkRGF0YUZyb21UYXJnZXQoKSB7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbXBvcnREYXRhRnJvbUZpbGUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0RGF0YVRvRmlsZShkYXRhOiBCbG9iKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzRXhwb3J0UG9zc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuXHJcbiAgICB9XHJcbn0iXX0=