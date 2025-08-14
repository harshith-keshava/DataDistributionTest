define(["require", "exports", "./persistence/settings", "./utilities/binSearch", "../models/common/series/seriesType", "../models/common/series/settingIds"], function (require, exports, settings_1, binSearch_1, seriesType_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BinSearchMode = binSearch_1.BinSearchMode;
    var SeriesHelper = /** @class */ (function () {
        function SeriesHelper() {
        }
        /**
         * searches for the next nearest timestamp in all series.
         *
         * @static
         * @param {number} searchValue the value to be searched for.
         * @param {number[][]} valueCollection an array of a value array containing the possible values.
         * @param {BinSearchMode} [searchMode=BinSearchMode.NEAREST] specefies the search mode to decide if the bigger, smaller or nearest values shoud be picked.
         * @returns
         * @memberof SeriesHelper
         */
        SeriesHelper.findNearestValueFromCollection = function (searchValue, valueCollection, searchMode) {
            if (searchMode === void 0) { searchMode = binSearch_1.BinSearchMode.NEAREST; }
            var nearestValues = [];
            // find and collect the nearest points within a single series
            valueCollection.forEach(function (values) {
                var nearestValueIndex = binSearch_1.BinSearch.findNearest(searchValue, values, searchMode);
                if (nearestValues.indexOf(values[nearestValueIndex]) == -1) {
                    nearestValues.push(values[nearestValueIndex]);
                }
            });
            // sort the nearest series points of multiple series by their x value (timestamp)
            nearestValues.sort(function (value1, value2) { return value1 - value2; });
            // get the nearest value from all value series
            var nearestValueIndex = binSearch_1.BinSearch.findNearest(searchValue, nearestValues, searchMode);
            var nearestValue = nearestValues[nearestValueIndex];
            return nearestValue;
        };
        /**
         * searches for the nearest value
         *
         * @static
         * @param {number} searchValue
         * @param {number[]} values
         * @param {*} [searchMode=BinSearchMode.NEAREST]
         * @param {number} [iFrom=0]
         * @param {number} [iTo=0]
         * @returns {number}
         * @memberof SeriesHelper
         */
        SeriesHelper.indexOfNearest = function (searchValue, values, searchMode) {
            if (searchMode === void 0) { searchMode = binSearch_1.BinSearchMode.NEAREST; }
            return binSearch_1.BinSearch.findNearest(searchValue, values, searchMode);
        };
        /**
         * Checks if the specified timestamp is with the available values
         *
         * @static
         * @param {number} timestamp
         * @param {number[]} timestamps
         * @returns {boolean}
         * @memberof SeriesHelper
         */
        SeriesHelper.isInRange = function (timestamp, timestamps) {
            return timestamps.length > 0 && timestamp >= timestamps[0] && timestamp <= timestamps[timestamps.length - 1];
        };
        /**
         * Returns all necessary settings to create a new serie
         *
         * @static
         * @param {ISignal} signal
         * @param {string} signalName
         * @param {string} color
         * @param {string} id
         * @param {SeriesType} type
         * @param {(CalculationDataInfo|undefined)} calculationDataInfo
         * @param {Array<string>} [errorInfo=new Array<string>()]
         * @returns {ISettings}
         * @memberof SeriesHelper
         */
        SeriesHelper.createSerieSettings = function (signal, signalName, color, id, type, calculationDataInfo, errorInfo) {
            if (errorInfo === void 0) { errorInfo = new Array(); }
            var serieType = SeriesHelper.getSerieTypeName(type);
            var settings = new settings_1.Settings(serieType, "1.1");
            var calculationDataInfoSettings = undefined;
            var signalDataSettings = undefined;
            var transferables;
            if (calculationDataInfo == undefined) {
                signalDataSettings = signal.getSettings();
                transferables = [signalDataSettings.data.rawPointsX.buffer, signalDataSettings.data.rawPointsY.buffer];
            }
            else {
                calculationDataInfoSettings = calculationDataInfo.getSettings();
            }
            settings.setValue(settingIds_1.SettingIds.SeriesId, id);
            settings.setValue(settingIds_1.SettingIds.SeriesName, signalName);
            settings.setValue(settingIds_1.SettingIds.SeriesColor, color);
            settings.setValue(settingIds_1.SettingIds.SeriesSignalData, signalDataSettings);
            settings.setValue(settingIds_1.SettingIds.SeriesCalculationData, calculationDataInfoSettings);
            settings.setValue(settingIds_1.SettingIds.SeriesErrorInfo, errorInfo);
            settings.setValue("transferables", transferables);
            return settings;
        };
        SeriesHelper.getSerieTypeName = function (type) {
            if (type == seriesType_1.SeriesType.timeSeries) {
                return "YTSeries";
            }
            else if (type == seriesType_1.SeriesType.xySeries) {
                return "XYSeries";
            }
            else {
                return "FFTSeries";
            }
        };
        return SeriesHelper;
    }());
    exports.SeriesHelper = SeriesHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vc2VyaWVzSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTBITyx3QkF4SGEseUJBQWEsQ0F3SGI7SUFsSHBCO1FBQUE7UUFnSEEsQ0FBQztRQS9HRzs7Ozs7Ozs7O1dBU0c7UUFDSSwyQ0FBOEIsR0FBckMsVUFBc0MsV0FBbUIsRUFBRSxlQUEyQixFQUFFLFVBQWlEO1lBQWpELDJCQUFBLEVBQUEsYUFBNEIseUJBQWEsQ0FBQyxPQUFPO1lBRXJJLElBQUksYUFBYSxHQUFhLEVBQUUsQ0FBQztZQUVqQyw2REFBNkQ7WUFDN0QsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQzNCLElBQUksaUJBQWlCLEdBQUcscUJBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxVQUFVLENBQUMsQ0FBQztnQkFDOUUsSUFBRyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUM7b0JBQ3RELGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztpQkFDakQ7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILGlGQUFpRjtZQUNqRixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTSxFQUFFLE1BQU0sSUFBTyxPQUFPLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwRSw4Q0FBOEM7WUFDOUMsSUFBSSxpQkFBaUIsR0FBRyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JGLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNJLDJCQUFjLEdBQXJCLFVBQXNCLFdBQW1CLEVBQUUsTUFBZ0IsRUFBRSxVQUFrQztZQUFsQywyQkFBQSxFQUFBLGFBQWEseUJBQWEsQ0FBQyxPQUFPO1lBQzNGLE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxzQkFBUyxHQUFoQixVQUFpQixTQUFpQixFQUFFLFVBQW9CO1lBQ3BELE9BQU8sVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUssU0FBUyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEgsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDSSxnQ0FBbUIsR0FBMUIsVUFBMkIsTUFBZSxFQUFFLFVBQWtCLEVBQUUsS0FBYSxFQUFFLEVBQVUsRUFBRSxJQUFnQixFQUFFLG1CQUFrRCxFQUFFLFNBQThDO1lBQTlDLDBCQUFBLEVBQUEsZ0JBQStCLEtBQUssRUFBVTtZQUMzTSxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxJQUFJLDJCQUEyQixHQUF3QixTQUFTLENBQUM7WUFDakUsSUFBSSxrQkFBa0IsR0FBd0IsU0FBUyxDQUFDO1lBQ3hELElBQUksYUFBYSxDQUFDO1lBRWxCLElBQUcsbUJBQW1CLElBQUksU0FBUyxFQUFDO2dCQUNoQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzFDLGFBQWEsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUc7aUJBQ0c7Z0JBQ0EsMkJBQTJCLEdBQUcsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDbkU7WUFFRCxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDckQsUUFBUSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUNuRSxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMscUJBQXFCLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztZQUNqRixRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3pELFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFHYyw2QkFBZ0IsR0FBL0IsVUFBZ0MsSUFBZ0I7WUFDNUMsSUFBSSxJQUFJLElBQUksdUJBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQy9CLE9BQU8sVUFBVSxDQUFDO2FBQ3JCO2lCQUNJLElBQUksSUFBSSxJQUFJLHVCQUFVLENBQUMsUUFBUSxFQUFFO2dCQUNsQyxPQUFPLFVBQVUsQ0FBQzthQUNyQjtpQkFDSTtnQkFDRCxPQUFPLFdBQVcsQ0FBQzthQUN0QjtRQUNMLENBQUM7UUFDTCxtQkFBQztJQUFELENBQUMsQUFoSEQsSUFnSEM7SUFoSFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IElTaWduYWwgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3NpZ25hbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCaW5TZWFyY2gsIEJpblNlYXJjaE1vZGUgfSBmcm9tIFwiLi91dGlsaXRpZXMvYmluU2VhcmNoXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vc2VyaWVzL3NldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFJbmZvIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YUluZm9cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJpZXNIZWxwZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBzZWFyY2hlcyBmb3IgdGhlIG5leHQgbmVhcmVzdCB0aW1lc3RhbXAgaW4gYWxsIHNlcmllcy5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2VhcmNoVmFsdWUgdGhlIHZhbHVlIHRvIGJlIHNlYXJjaGVkIGZvci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW11bXX0gdmFsdWVDb2xsZWN0aW9uIGFuIGFycmF5IG9mIGEgdmFsdWUgYXJyYXkgY29udGFpbmluZyB0aGUgcG9zc2libGUgdmFsdWVzLlxyXG4gICAgICogQHBhcmFtIHtCaW5TZWFyY2hNb2RlfSBbc2VhcmNoTW9kZT1CaW5TZWFyY2hNb2RlLk5FQVJFU1RdIHNwZWNlZmllcyB0aGUgc2VhcmNoIG1vZGUgdG8gZGVjaWRlIGlmIHRoZSBiaWdnZXIsIHNtYWxsZXIgb3IgbmVhcmVzdCB2YWx1ZXMgc2hvdWQgYmUgcGlja2VkLlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNIZWxwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZpbmROZWFyZXN0VmFsdWVGcm9tQ29sbGVjdGlvbihzZWFyY2hWYWx1ZTogbnVtYmVyLCB2YWx1ZUNvbGxlY3Rpb246IG51bWJlcltdW10sIHNlYXJjaE1vZGU6IEJpblNlYXJjaE1vZGUgPSBCaW5TZWFyY2hNb2RlLk5FQVJFU1QpIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbmVhcmVzdFZhbHVlczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gZmluZCBhbmQgY29sbGVjdCB0aGUgbmVhcmVzdCBwb2ludHMgd2l0aGluIGEgc2luZ2xlIHNlcmllc1xyXG4gICAgICAgIHZhbHVlQ29sbGVjdGlvbi5mb3JFYWNoKCh2YWx1ZXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5lYXJlc3RWYWx1ZUluZGV4ID0gQmluU2VhcmNoLmZpbmROZWFyZXN0KHNlYXJjaFZhbHVlLCB2YWx1ZXMsc2VhcmNoTW9kZSk7XHJcbiAgICAgICAgICAgIGlmKG5lYXJlc3RWYWx1ZXMuaW5kZXhPZih2YWx1ZXNbbmVhcmVzdFZhbHVlSW5kZXhdKSA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0VmFsdWVzLnB1c2godmFsdWVzW25lYXJlc3RWYWx1ZUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gc29ydCB0aGUgbmVhcmVzdCBzZXJpZXMgcG9pbnRzIG9mIG11bHRpcGxlIHNlcmllcyBieSB0aGVpciB4IHZhbHVlICh0aW1lc3RhbXApXHJcbiAgICAgICAgbmVhcmVzdFZhbHVlcy5zb3J0KCh2YWx1ZTEsIHZhbHVlMikgPT4geyByZXR1cm4gdmFsdWUxIC0gdmFsdWUyOyB9KTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHZhbHVlIGZyb20gYWxsIHZhbHVlIHNlcmllc1xyXG4gICAgICAgIGxldCBuZWFyZXN0VmFsdWVJbmRleCA9IEJpblNlYXJjaC5maW5kTmVhcmVzdChzZWFyY2hWYWx1ZSwgbmVhcmVzdFZhbHVlcyxzZWFyY2hNb2RlKTtcclxuICAgICAgICBsZXQgbmVhcmVzdFZhbHVlID0gbmVhcmVzdFZhbHVlc1tuZWFyZXN0VmFsdWVJbmRleF07XHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNlYXJjaGVzIGZvciB0aGUgbmVhcmVzdCB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZWFyY2hWYWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gdmFsdWVzXHJcbiAgICAgKiBAcGFyYW0geyp9IFtzZWFyY2hNb2RlPUJpblNlYXJjaE1vZGUuTkVBUkVTVF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaUZyb209MF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaVRvPTBdXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0hlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5kZXhPZk5lYXJlc3Qoc2VhcmNoVmFsdWU6IG51bWJlciwgdmFsdWVzOiBudW1iZXJbXSwgc2VhcmNoTW9kZSA9IEJpblNlYXJjaE1vZGUuTkVBUkVTVCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIEJpblNlYXJjaC5maW5kTmVhcmVzdChzZWFyY2hWYWx1ZSwgdmFsdWVzLCBzZWFyY2hNb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgc3BlY2lmaWVkIHRpbWVzdGFtcCBpcyB3aXRoIHRoZSBhdmFpbGFibGUgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gdGltZXN0YW1wc1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0luUmFuZ2UodGltZXN0YW1wOiBudW1iZXIsIHRpbWVzdGFtcHM6IG51bWJlcltdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVzdGFtcHMubGVuZ3RoID4gMCAmJiAgdGltZXN0YW1wID49IHRpbWVzdGFtcHNbMF0gJiYgdGltZXN0YW1wIDw9IHRpbWVzdGFtcHNbdGltZXN0YW1wcy5sZW5ndGgtMV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBuZWNlc3Nhcnkgc2V0dGluZ3MgdG8gY3JlYXRlIGEgbmV3IHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaWduYWxOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtTZXJpZXNUeXBlfSB0eXBlXHJcbiAgICAgKiBAcGFyYW0geyhDYWxjdWxhdGlvbkRhdGFJbmZvfHVuZGVmaW5lZCl9IGNhbGN1bGF0aW9uRGF0YUluZm9cclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gW2Vycm9ySW5mbz1uZXcgQXJyYXk8c3RyaW5nPigpXVxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNIZWxwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZVNlcmllU2V0dGluZ3Moc2lnbmFsOiBJU2lnbmFsLCBzaWduYWxOYW1lOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHR5cGU6IFNlcmllc1R5cGUsIGNhbGN1bGF0aW9uRGF0YUluZm86IENhbGN1bGF0aW9uRGF0YUluZm98dW5kZWZpbmVkLCBlcnJvckluZm86IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpKTogSVNldHRpbmdzIHtcclxuICAgICAgICBsZXQgc2VyaWVUeXBlID0gU2VyaWVzSGVscGVyLmdldFNlcmllVHlwZU5hbWUodHlwZSk7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKHNlcmllVHlwZSwgXCIxLjFcIik7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm9TZXR0aW5nczogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgc2lnbmFsRGF0YVNldHRpbmdzOiBJU2V0dGluZ3N8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCB0cmFuc2ZlcmFibGVzO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhSW5mbyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzaWduYWxEYXRhU2V0dGluZ3MgPSBzaWduYWwuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgdHJhbnNmZXJhYmxlcyA9IFtzaWduYWxEYXRhU2V0dGluZ3MuZGF0YS5yYXdQb2ludHNYLmJ1ZmZlciwgc2lnbmFsRGF0YVNldHRpbmdzLmRhdGEucmF3UG9pbnRzWS5idWZmZXJdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGFJbmZvU2V0dGluZ3MgPSBjYWxjdWxhdGlvbkRhdGFJbmZvLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0lkLCBpZCk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNOYW1lLCBzaWduYWxOYW1lKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NvbG9yLCBjb2xvcik7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNTaWduYWxEYXRhLCBzaWduYWxEYXRhU2V0dGluZ3MpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzQ2FsY3VsYXRpb25EYXRhLCBjYWxjdWxhdGlvbkRhdGFJbmZvU2V0dGluZ3MpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzRXJyb3JJbmZvLCBlcnJvckluZm8pO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFwidHJhbnNmZXJhYmxlc1wiLCB0cmFuc2ZlcmFibGVzKTtcclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFNlcmllVHlwZU5hbWUodHlwZTogU2VyaWVzVHlwZSk6IHN0cmluZ3tcclxuICAgICAgICBpZiAodHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiWVRTZXJpZXNcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlhZU2VyaWVzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJGRlRTZXJpZXNcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydHtCaW5TZWFyY2hNb2RlfSJdfQ==