define(["require", "exports", "../../common/packageConversion/mceConversionError", "../../framework/componentHub/componentDataHub", "../../widgets/common/states/cursorStates", "../../widgets/traceViewWidget/bindingIds", "../packageConversion/packageConversionController"], function (require, exports, mceConversionError_1, componentDataHub_1, cursorStates_1, bindingIds_1, packageConversionController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Handles the creation of *.mce file export data (mce => MappCockpitExport), and also the import of the export data into the components/settingsObjects
     *
     * @export
     * @class MceExportImportHelper
     */
    var MceExportImportHelper = /** @class */ (function () {
        function MceExportImportHelper() {
        }
        /**
         * Returns the export data for the given components
         *
         * @static
         * @param {Array<IComponent>} componentInstances
         * @param {Array<ISettingsObject>} settingsObjects
         * @returns {string}
         * @memberof MceExportImportHelper
         */
        MceExportImportHelper.getExportData = function (componentInstances, settingsObjects) {
            try {
                // Add component data
                componentInstances.forEach(function (instance) {
                    var componentSettings = instance.getComponentSettings(false);
                    if (componentSettings !== undefined) {
                        packageConversionController_1.PackageConversionController.scheduleConversionTo(instance.component.type, componentSettings);
                    }
                });
                // TODO: Add settings objects data for CursorStates support
                settingsObjects.forEach(function (settingsObject) {
                    var settings = settingsObject.getSettings();
                    if (settings !== undefined) {
                        packageConversionController_1.PackageConversionController.scheduleConversionTo("CursorStates", settings); // CursorState type needed, or type of settings object
                    }
                });
                var packageData = packageConversionController_1.PackageConversionController.runConversionTo();
                if (packageData.length > 0) {
                    var stringData = JSON.stringify(packageData);
                    return stringData;
                }
                else { // TODO improve error handling!
                    throw "export failed";
                }
            }
            catch (e) {
                if (e instanceof Error && mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                    console.error(e.toString());
                }
                else {
                    console.error(e);
                }
            }
            return "";
        };
        /**
         * Clears all the components in the given order (needed before importing new data)
         *
         * @static
         * @param {Array<IComponent>} componentInstances
         * @memberof MceExportImportHelper
         */
        MceExportImportHelper.clearComponents = function (componentInstances) {
            componentInstances.forEach(function (componentInstances) {
                componentInstances.clear();
            });
        };
        /**
         * Sets the given data from a exportContainer to the given components
         *
         * @static
         * @param {Array<IComponent>} componentInstances
         * @param {Map<string, ISettings>} importedSettingsMap
         * @memberof MceExportImportHelper
         */
        MceExportImportHelper.setImportData = function (componentInstances, importedSettingsMap) {
            // set all settings to the components
            componentInstances.forEach(function (componentInstance) {
                var componentSettings = importedSettingsMap.get(componentInstance.component.type);
                if (componentSettings !== undefined) {
                    componentInstance.setComponentSettings(componentSettings);
                }
            });
            // TODO: Use settingsobjects data for more dynamic support
            //sets imported cursorstates settings 
            var cursorStatesSettings = importedSettingsMap.get("CursorStates");
            if (cursorStatesSettings !== undefined) {
                var cursorStatesScope = bindingIds_1.TraceViewBinding.CursorStates.scope;
                var cursorStatesID = bindingIds_1.TraceViewBinding.CursorStates.id;
                var cursorStates = new cursorStates_1.CursorStates();
                cursorStates.setSettings(cursorStatesSettings);
                componentDataHub_1.ComponentDataHub.updateShared(this, cursorStates, cursorStatesScope, cursorStatesID, cursorStates_1.CursorStates);
            }
        };
        MceExportImportHelper.readFileContentMce1 = function (fileData) {
            var parsedFileContent = JSON.parse(fileData);
            var importedSettingsMap = new Map();
            if (Array.isArray(parsedFileContent)) {
                packageConversionController_1.PackageConversionController.scheduleConversionFrom(parsedFileContent);
                importedSettingsMap = packageConversionController_1.PackageConversionController.runConversionFrom();
            }
            return importedSettingsMap;
        };
        MceExportImportHelper.readFileContentMce = function (fileData) {
            var parsedFileContent = JSON.parse(fileData);
            var importedSettingsMap = new Map();
            if (Array.isArray(parsedFileContent)) {
                importedSettingsMap = this.readFileContentMce1(fileData);
            }
            else if (parsedFileContent !== undefined && parsedFileContent.SeriesProvider !== undefined && parsedFileContent.SignalManagerDataModel !== undefined) {
                packageConversionController_1.PackageConversionController.scheduleConversionTo("SignalManagerDataModel", parsedFileContent.SignalManagerDataModel);
                packageConversionController_1.PackageConversionController.scheduleConversionTo("SeriesProvider", parsedFileContent.SeriesProvider);
                var packageArray = packageConversionController_1.PackageConversionController.runConversionTo();
                if (packageArray.length > 0) {
                    packageConversionController_1.PackageConversionController.scheduleConversionFrom(packageArray);
                    importedSettingsMap = packageConversionController_1.PackageConversionController.runConversionFrom();
                }
            }
            return importedSettingsMap;
        };
        MceExportImportHelper.readFileContent = function (fileData, fileEnding) {
            var importedSettingsMap = new Map();
            if (fileEnding === ".mce1") {
                importedSettingsMap = this.readFileContentMce1(fileData);
            }
            else {
                importedSettingsMap = this.readFileContentMce(fileData);
            }
            return importedSettingsMap;
        };
        return MceExportImportHelper;
    }());
    exports.MceExportImportHelper = MceExportImportHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNlRXhwb3J0SW1wb3J0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbWNlRXhwb3J0SW1wb3J0L21jZUV4cG9ydEltcG9ydEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFXQTs7Ozs7T0FLRztJQUNIO1FBQUE7UUE0SUEsQ0FBQztRQTFJRzs7Ozs7Ozs7V0FRRztRQUNJLG1DQUFhLEdBQXBCLFVBQXFCLGtCQUFxQyxFQUFFLGVBQXVDO1lBRS9GLElBQUc7Z0JBQ0MscUJBQXFCO2dCQUNyQixrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO29CQUMvQixJQUFJLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0QsSUFBRyxpQkFBaUIsS0FBSyxTQUFTLEVBQUM7d0JBQy9CLHlEQUEyQixDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7cUJBQ2hHO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVILDJEQUEyRDtnQkFDM0QsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFBLGNBQWM7b0JBQ2xDLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDNUMsSUFBRyxRQUFRLEtBQUssU0FBUyxFQUFDO3dCQUN0Qix5REFBMkIsQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxzREFBc0Q7cUJBQ3JJO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksV0FBVyxHQUFHLHlEQUEyQixDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUNoRSxJQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN2QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxD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QUMsY0FBYyxLQUFLLFNBQVMsSUFBSSxpQkFBaUIsQ0FBQyxzQkFBc0IsS0FBSyxTQUFTLEVBQUU7Z0JBQ25KLHlEQUEyQixDQUFDLG9CQUFvQixDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ3JILHlEQUEyQixDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUVyRyxJQUFJLFlBQVksR0FBRyx5REFBMkIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFFakUsSUFBRyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDeEIseURBQTJCLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ2pFLG1CQUFtQixHQUFFLHlEQUEyQixDQUFDLGlCQUFpQixFQUFFLENBQUM7aUJBQ3hFO2FBQ0o7WUFFRCxPQUFPLG1CQUFtQixDQUFDO1FBQy9CLENBQUM7UUFDTSxxQ0FBZSxHQUF0QixVQUF1QixRQUFnQixFQUFFLFVBQTRCO1lBRWpFLElBQUksbUJBQW1CLEdBQUUsSUFBSSxHQUFHLEVBQXFCLENBQUM7WUFFdEQsSUFBRyxVQUFVLEtBQUssT0FBTyxFQUFFO2dCQUN2QixtQkFBbUIsR0FBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0Q7aUJBQU07Z0JBQ0gsbUJBQW1CLEdBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzFEO1lBRUQsT0FBTyxtQkFBbUIsQ0FBQztRQUMvQixDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBNUlELElBNElDO0lBNUlZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1jZUNvbnZlcnNpb25FcnJvciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbWNlQ29udmVyc2lvbkVycm9yXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvaW50ZXJmYWNlcy9jb21wb25lbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzT2JqZWN0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzT2JqZWN0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERhdGFIdWIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9jb21wb25lbnREYXRhSHViXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcyB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IFRyYWNlVmlld0JpbmRpbmcgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy90cmFjZVZpZXdXaWRnZXQvYmluZGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vcGFja2FnZUNvbnZlcnNpb24vcGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7IElQYWNrYWdlIH0gZnJvbSBcIi4uL3BhY2thZ2VDb252ZXJzaW9uL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogSGFuZGxlcyB0aGUgY3JlYXRpb24gb2YgKi5tY2UgZmlsZSBleHBvcnQgZGF0YSAobWNlID0+IE1hcHBDb2NrcGl0RXhwb3J0KSwgYW5kIGFsc28gdGhlIGltcG9ydCBvZiB0aGUgZXhwb3J0IGRhdGEgaW50byB0aGUgY29tcG9uZW50cy9zZXR0aW5nc09iamVjdHNcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgTWNlRXhwb3J0SW1wb3J0SGVscGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWNlRXhwb3J0SW1wb3J0SGVscGVye1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZXhwb3J0IGRhdGEgZm9yIHRoZSBnaXZlbiBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJQ29tcG9uZW50Pn0gY29tcG9uZW50SW5zdGFuY2VzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElTZXR0aW5nc09iamVjdD59IHNldHRpbmdzT2JqZWN0c1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNY2VFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEV4cG9ydERhdGEoY29tcG9uZW50SW5zdGFuY2VzOiBBcnJheTxJQ29tcG9uZW50Piwgc2V0dGluZ3NPYmplY3RzOiBBcnJheTxJU2V0dGluZ3NPYmplY3Q+KTogc3RyaW5ne1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgLy8gQWRkIGNvbXBvbmVudCBkYXRhXHJcbiAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlcy5mb3JFYWNoKGluc3RhbmNlID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IGluc3RhbmNlLmdldENvbXBvbmVudFNldHRpbmdzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmKGNvbXBvbmVudFNldHRpbmdzICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlci5zY2hlZHVsZUNvbnZlcnNpb25UbyhpbnN0YW5jZS5jb21wb25lbnQudHlwZSwgY29tcG9uZW50U2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCBzZXR0aW5ncyBvYmplY3RzIGRhdGEgZm9yIEN1cnNvclN0YXRlcyBzdXBwb3J0XHJcbiAgICAgICAgICAgIHNldHRpbmdzT2JqZWN0cy5mb3JFYWNoKHNldHRpbmdzT2JqZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IHNldHRpbmdzT2JqZWN0LmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICBpZihzZXR0aW5ncyAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIuc2NoZWR1bGVDb252ZXJzaW9uVG8oXCJDdXJzb3JTdGF0ZXNcIiwgc2V0dGluZ3MpOyAvLyBDdXJzb3JTdGF0ZSB0eXBlIG5lZWRlZCwgb3IgdHlwZSBvZiBzZXR0aW5ncyBvYmplY3RcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBwYWNrYWdlRGF0YSA9IFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlci5ydW5Db252ZXJzaW9uVG8oKTtcclxuICAgICAgICAgICAgaWYocGFja2FnZURhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmluZ0RhdGEgPSBKU09OLnN0cmluZ2lmeShwYWNrYWdlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nRGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gVE9ETyBpbXByb3ZlIGVycm9yIGhhbmRsaW5nIVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJleHBvcnQgZmFpbGVkXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGlmKGUgaW5zdGFuY2VvZiBFcnJvciAmJiBNY2VDb252ZXJzaW9uRXJyb3IuaXNNY2VDb252ZXJzaW9uRXJyb3IoZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYWxsIHRoZSBjb21wb25lbnRzIGluIHRoZSBnaXZlbiBvcmRlciAobmVlZGVkIGJlZm9yZSBpbXBvcnRpbmcgbmV3IGRhdGEpXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJQ29tcG9uZW50Pn0gY29tcG9uZW50SW5zdGFuY2VzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWNlRXhwb3J0SW1wb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjbGVhckNvbXBvbmVudHMoY29tcG9uZW50SW5zdGFuY2VzOiBBcnJheTxJQ29tcG9uZW50Pil7XHJcbiAgICAgICAgY29tcG9uZW50SW5zdGFuY2VzLmZvckVhY2goY29tcG9uZW50SW5zdGFuY2VzID0+IHtcclxuICAgICAgICAgICAgICg8YW55PmNvbXBvbmVudEluc3RhbmNlcykuY2xlYXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiBkYXRhIGZyb20gYSBleHBvcnRDb250YWluZXIgdG8gdGhlIGdpdmVuIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDb21wb25lbnQ+fSBjb21wb25lbnRJbnN0YW5jZXNcclxuICAgICAqIEBwYXJhbSB7TWFwPHN0cmluZywgSVNldHRpbmdzPn0gaW1wb3J0ZWRTZXR0aW5nc01hcFxyXG4gICAgICogQG1lbWJlcm9mIE1jZUV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0SW1wb3J0RGF0YShjb21wb25lbnRJbnN0YW5jZXM6IEFycmF5PElDb21wb25lbnQ+LCBpbXBvcnRlZFNldHRpbmdzTWFwOiBNYXA8c3RyaW5nLCBJU2V0dGluZ3M+KXtcclxuICAgICAgIFxyXG4gICAgICAgIC8vIHNldCBhbGwgc2V0dGluZ3MgdG8gdGhlIGNvbXBvbmVudHNcclxuICAgICAgICBjb21wb25lbnRJbnN0YW5jZXMuZm9yRWFjaChjb21wb25lbnRJbnN0YW5jZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IGltcG9ydGVkU2V0dGluZ3NNYXAuZ2V0KGNvbXBvbmVudEluc3RhbmNlLmNvbXBvbmVudC50eXBlKTtcclxuICAgICAgICAgICAgaWYoY29tcG9uZW50U2V0dGluZ3MgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZS5zZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5ncyBhcyBDb21wb25lbnRTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBUT0RPOiBVc2Ugc2V0dGluZ3NvYmplY3RzIGRhdGEgZm9yIG1vcmUgZHluYW1pYyBzdXBwb3J0XHJcbiAgICAgICAgLy9zZXRzIGltcG9ydGVkIGN1cnNvcnN0YXRlcyBzZXR0aW5ncyBcclxuICAgICAgICBsZXQgY3Vyc29yU3RhdGVzU2V0dGluZ3MgPSBpbXBvcnRlZFNldHRpbmdzTWFwLmdldChcIkN1cnNvclN0YXRlc1wiKTtcclxuICAgICAgICBpZihjdXJzb3JTdGF0ZXNTZXR0aW5ncyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JTdGF0ZXNTY29wZSA9IFRyYWNlVmlld0JpbmRpbmcuQ3Vyc29yU3RhdGVzLnNjb3BlO1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yU3RhdGVzSUQgPSBUcmFjZVZpZXdCaW5kaW5nLkN1cnNvclN0YXRlcy5pZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JTdGF0ZXMgPSBuZXcgQ3Vyc29yU3RhdGVzKCk7XHJcbiAgICAgICAgICAgIGN1cnNvclN0YXRlcy5zZXRTZXR0aW5ncyhjdXJzb3JTdGF0ZXNTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIENvbXBvbmVudERhdGFIdWIudXBkYXRlU2hhcmVkKHRoaXMsIGN1cnNvclN0YXRlcywgY3Vyc29yU3RhdGVzU2NvcGUsIGN1cnNvclN0YXRlc0lELCBDdXJzb3JTdGF0ZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkRmlsZUNvbnRlbnRNY2UxKGZpbGVEYXRhOiBzdHJpbmcpOiBNYXA8c3RyaW5nLCBJU2V0dGluZ3M+IHtcclxuXHJcbiAgICAgICAgbGV0IHBhcnNlZEZpbGVDb250ZW50OiBBcnJheTxJUGFja2FnZT49IEpTT04ucGFyc2UoZmlsZURhdGEpO1xyXG5cclxuICAgICAgICBsZXQgaW1wb3J0ZWRTZXR0aW5nc01hcDogTWFwPHN0cmluZywgSVNldHRpbmdzPj0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICBpZihBcnJheS5pc0FycmF5KHBhcnNlZEZpbGVDb250ZW50KSkge1xyXG5cclxuICAgICAgICAgICAgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyLnNjaGVkdWxlQ29udmVyc2lvbkZyb20ocGFyc2VkRmlsZUNvbnRlbnQpO1xyXG4gICAgICAgICAgICBpbXBvcnRlZFNldHRpbmdzTWFwPSBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIucnVuQ29udmVyc2lvbkZyb20oKTsgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW1wb3J0ZWRTZXR0aW5nc01hcDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkRmlsZUNvbnRlbnRNY2UoZmlsZURhdGE6IHN0cmluZyk6IE1hcDxzdHJpbmcsIElTZXR0aW5ncz4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwYXJzZWRGaWxlQ29udGVudDogeyBTZXJpZXNQcm92aWRlcjogSVNldHRpbmdzLCBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsOiBJU2V0dGluZ3MgfSA9IEpTT04ucGFyc2UoZmlsZURhdGEpO1xyXG5cclxuICAgICAgICBsZXQgaW1wb3J0ZWRTZXR0aW5nc01hcDogTWFwPHN0cmluZywgSVNldHRpbmdzPj0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICBpZihBcnJheS5pc0FycmF5KHBhcnNlZEZpbGVDb250ZW50KSkge1xyXG4gICAgICAgICAgICBpbXBvcnRlZFNldHRpbmdzTWFwPSB0aGlzLnJlYWRGaWxlQ29udGVudE1jZTEoZmlsZURhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZihwYXJzZWRGaWxlQ29udGVudCAhPT0gdW5kZWZpbmVkICYmIHBhcnNlZEZpbGVDb250ZW50LlNlcmllc1Byb3ZpZGVyICE9PSB1bmRlZmluZWQgJiYgcGFyc2VkRmlsZUNvbnRlbnQuU2lnbmFsTWFuYWdlckRhdGFNb2RlbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlci5zY2hlZHVsZUNvbnZlcnNpb25UbyhcIlNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcIiwgcGFyc2VkRmlsZUNvbnRlbnQuU2lnbmFsTWFuYWdlckRhdGFNb2RlbCk7XHJcbiAgICAgICAgICAgIFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlci5zY2hlZHVsZUNvbnZlcnNpb25UbyhcIlNlcmllc1Byb3ZpZGVyXCIsIHBhcnNlZEZpbGVDb250ZW50LlNlcmllc1Byb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYWNrYWdlQXJyYXkgPSBQYWNrYWdlQ29udmVyc2lvbkNvbnRyb2xsZXIucnVuQ29udmVyc2lvblRvKCk7XHJcblxyXG4gICAgICAgICAgICBpZihwYWNrYWdlQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyLnNjaGVkdWxlQ29udmVyc2lvbkZyb20ocGFja2FnZUFycmF5KTtcclxuICAgICAgICAgICAgICAgIGltcG9ydGVkU2V0dGluZ3NNYXA9IFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlci5ydW5Db252ZXJzaW9uRnJvbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW1wb3J0ZWRTZXR0aW5nc01hcDtcclxuICAgIH1cclxuICAgIHN0YXRpYyByZWFkRmlsZUNvbnRlbnQoZmlsZURhdGE6IHN0cmluZywgZmlsZUVuZGluZzogXCIubWNlXCIgfCBcIi5tY2UxXCIpOiBNYXA8c3RyaW5nLCBJU2V0dGluZ3M+IHtcclxuXHJcbiAgICAgICAgbGV0IGltcG9ydGVkU2V0dGluZ3NNYXA9IG5ldyBNYXA8c3RyaW5nLCBJU2V0dGluZ3M+KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZmlsZUVuZGluZyA9PT0gXCIubWNlMVwiKSB7XHJcbiAgICAgICAgICAgIGltcG9ydGVkU2V0dGluZ3NNYXA9IHRoaXMucmVhZEZpbGVDb250ZW50TWNlMShmaWxlRGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW1wb3J0ZWRTZXR0aW5nc01hcD0gdGhpcy5yZWFkRmlsZUNvbnRlbnRNY2UoZmlsZURhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGltcG9ydGVkU2V0dGluZ3NNYXA7XHJcbiAgICB9XHJcbn0iXX0=