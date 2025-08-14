define(["require", "exports", "./driveLog/driveLogDefinitions", "./driveLog/driveLogDataProvider", "./nullLogger/nullLoggerDefinitions", "./nullLogger/nullLoggerDataProvider"], function (require, exports, driveLogDefinitions_1, driveLogDataProvider_1, nullLoggerDefinitions_1, nullLoggerDataProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides all the available logger implementations(e.g. network command trace,...)
     *
     * @export
     * @class LoggerProvider
     */
    var LoggerProvider = /** @class */ (function () {
        function LoggerProvider() {
        }
        /**
         * Returns the logger data provider for the given component id
         *
         * @static
         * @param {string} componentId
         * @returns {ILoggerDataProvider}
         * @memberof LoggerProvider
         */
        LoggerProvider.getLoggerDataProviderForComponentNew = function (componentId) {
            if (componentId == this.driveLogComponentName) {
                return new driveLogDataProvider_1.DriveLogDataProvider();
            }
            return new nullLoggerDataProvider_1.NullLoggerDataProvider();
        };
        /**
         * Returns the logger definitions for the given component id
         *
         * @static
         * @param {string} componentId
         * @returns {ILoggerDefinitions}
         * @memberof LoggerProvider
         */
        LoggerProvider.getLoggerDefinitionsForComponentNew = function (componentId) {
            if (componentId == this.driveLogComponentName) {
                return new driveLogDefinitions_1.DriveLogDefinitions();
            }
            return new nullLoggerDefinitions_1.NullLoggerDefinitions();
        };
        /**
         * Name of the DriveLog component
         *
         * @static
         * @memberof LoggerProvider
         */
        LoggerProvider.driveLogComponentName = "DriveLog";
        return LoggerProvider;
    }());
    exports.LoggerProvider = LoggerProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbG9nZ2VyV2lkZ2V0L2xvZ2dlclByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVNBOzs7OztPQUtHO0lBQ0g7UUFBQTtRQXVDQSxDQUFDO1FBN0JHOzs7Ozs7O1dBT0c7UUFDSSxtREFBb0MsR0FBM0MsVUFBNEMsV0FBNkI7WUFDckUsSUFBRyxXQUFXLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFDO2dCQUN6QyxPQUFPLElBQUksMkNBQW9CLEVBQUUsQ0FBQzthQUNyQztZQUNELE9BQU8sSUFBSSwrQ0FBc0IsRUFBRSxDQUFDO1FBQ3hDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksa0RBQW1DLEdBQTFDLFVBQTJDLFdBQTZCO1lBQ3BFLElBQUcsV0FBVyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBQztnQkFDekMsT0FBTyxJQUFJLHlDQUFtQixFQUFFLENBQUM7YUFDcEM7WUFDRCxPQUFPLElBQUksNkNBQXFCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBcENEOzs7OztXQUtHO1FBQ29CLG9DQUFxQixHQUFHLFVBQVUsQ0FBQztRQStCOUQscUJBQUM7S0FBQSxBQXZDRCxJQXVDQztJQXZDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMb2dnZXJEZWZpbml0aW9ucyB9IGZyb20gXCIuL2ludGVyZmFjZXMvbG9nZ2VyRGVmaW5pdGlvbnNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUxvZ2dlckRhdGFQcm92aWRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvbG9nZ2VyRGF0YVByb3ZpZGVySW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBEcml2ZUxvZ0RlZmluaXRpb25zIH0gZnJvbSBcIi4vZHJpdmVMb2cvZHJpdmVMb2dEZWZpbml0aW9uc1wiO1xyXG5pbXBvcnQgeyBEcml2ZUxvZ0RhdGFQcm92aWRlciB9IGZyb20gXCIuL2RyaXZlTG9nL2RyaXZlTG9nRGF0YVByb3ZpZGVyXCI7XHJcblxyXG5pbXBvcnQgeyBOdWxsTG9nZ2VyRGVmaW5pdGlvbnMgfSBmcm9tIFwiLi9udWxsTG9nZ2VyL251bGxMb2dnZXJEZWZpbml0aW9uc1wiO1xyXG5pbXBvcnQgeyBOdWxsTG9nZ2VyRGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4vbnVsbExvZ2dlci9udWxsTG9nZ2VyRGF0YVByb3ZpZGVyXCI7XHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgYWxsIHRoZSBhdmFpbGFibGUgbG9nZ2VyIGltcGxlbWVudGF0aW9ucyhlLmcuIG5ldHdvcmsgY29tbWFuZCB0cmFjZSwuLi4pXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIExvZ2dlclByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9nZ2VyUHJvdmlkZXJ7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogTmFtZSBvZiB0aGUgRHJpdmVMb2cgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1lbWJlcm9mIExvZ2dlclByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZHJpdmVMb2dDb21wb25lbnROYW1lID0gXCJEcml2ZUxvZ1wiO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGxvZ2dlciBkYXRhIHByb3ZpZGVyIGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50IGlkXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkXHJcbiAgICAgKiBAcmV0dXJucyB7SUxvZ2dlckRhdGFQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBMb2dnZXJQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0TG9nZ2VyRGF0YVByb3ZpZGVyRm9yQ29tcG9uZW50TmV3KGNvbXBvbmVudElkOiBzdHJpbmd8dW5kZWZpbmVkKTogSUxvZ2dlckRhdGFQcm92aWRlcntcclxuICAgICAgICBpZihjb21wb25lbnRJZCA9PSB0aGlzLmRyaXZlTG9nQ29tcG9uZW50TmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRHJpdmVMb2dEYXRhUHJvdmlkZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdWxsTG9nZ2VyRGF0YVByb3ZpZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBsb2dnZXIgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBjb21wb25lbnQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50SWRcclxuICAgICAqIEByZXR1cm5zIHtJTG9nZ2VyRGVmaW5pdGlvbnN9XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9nZ2VyUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldExvZ2dlckRlZmluaXRpb25zRm9yQ29tcG9uZW50TmV3KGNvbXBvbmVudElkOiBzdHJpbmd8dW5kZWZpbmVkKTogSUxvZ2dlckRlZmluaXRpb25ze1xyXG4gICAgICAgIGlmKGNvbXBvbmVudElkID09IHRoaXMuZHJpdmVMb2dDb21wb25lbnROYW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEcml2ZUxvZ0RlZmluaXRpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTnVsbExvZ2dlckRlZmluaXRpb25zKCk7XHJcbiAgICB9XHJcbn0iXX0=