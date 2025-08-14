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
define(["require", "exports", "./anyConversion", "./enum/dataTypeEnum", "./package", "./meta", "../../widgets/common/states/settingIds", "./enum/additionalMetaKeys"], function (require, exports, anyConversion_1, dataTypeEnum_1, package_1, meta_1, settingIds_1, additionalMetaKeys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataIds;
    (function (DataIds) {
        DataIds["TimeCursorStates"] = "timeCursorStates";
        DataIds["FrequencyCursorStates"] = "frequencyCursorStates";
        DataIds["FrequencyCursorStates_OLD"] = "fftCursorStates";
        DataIds["Position"] = "position";
        DataIds["Active"] = "active";
    })(DataIds || (DataIds = {}));
    /**
     * The conversion handling the cursor state data, specific for the CursorStatePackageConverter.
     *
     * @class CursorStateConversion
     * @extends {AnyConversion}
     */
    var CursorStateConversion = /** @class */ (function (_super) {
        __extends(CursorStateConversion, _super);
        /**
         * Creates an instance of CursorStateConversion.
         * Only to be used in CursorStatePackageConverter, as it sets the used keys itself.
         *
         * @memberof CursorStateConversion
         */
        function CursorStateConversion() {
            var _this = this;
            var settingKeys = [
                settingIds_1.SettingIds.TimeCursorActiveState,
                settingIds_1.SettingIds.TimeCursorPositions,
                settingIds_1.SettingIds.FftCursorActiveState,
                settingIds_1.SettingIds.FftCursorPositions
            ];
            var packageKeys = [
                DataIds.TimeCursorStates,
                DataIds.FrequencyCursorStates,
                DataIds.FrequencyCursorStates_OLD
            ];
            _this = _super.call(this, settingKeys, packageKeys) || this;
            _this.dataType = dataTypeEnum_1.DataType.ARRAY;
            return _this;
        }
        /**
         * Converts the cursor state data from package to settings format.
         *
         * @param {Array<any>} data
         * @returns {Array<any>}
         * @memberof CursorStateConversion
         */
        CursorStateConversion.prototype.convertDataFrom = function (data) {
            var timeCursorSates = data[0];
            var frequencyCursorSates = data[1];
            if (frequencyCursorSates === undefined) { //backwards compatibility for when frequencyCursorStates were named fftCursorStates
                frequencyCursorSates = data[2];
            }
            var settingsData = new Array();
            settingsData.push(timeCursorSates.map(function (elem) { return elem.active; }));
            settingsData.push(timeCursorSates.map(function (elem) { return elem.position; }));
            settingsData.push(frequencyCursorSates.map(function (elem) { return elem.active; }));
            settingsData.push(frequencyCursorSates.map(function (elem) { return elem.position; }));
            return settingsData;
        };
        /**
         * Converts the cursor state data from settings to package format.
         *
         * @param {Array<any>} data
         * @returns {Array<IPackage>}
         * @memberof CursorStateConversion
         */
        CursorStateConversion.prototype.convertDataTo = function (data) {
            var timeCursorActiveStates = data[0];
            var timeCursorPositions = data[1];
            var frequencyCursorActiveStates = data[2];
            var frequencyCursorPositions = data[3];
            var timeCursorStates = this.buildcursorStateDataObjectArray(timeCursorPositions, timeCursorActiveStates);
            var timeCursorStatesPackage = new package_1.Package(new meta_1.Meta(this.dataType, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: CursorStateConversion.cursorStateDataObjectType }]), timeCursorStates);
            var frequencyCursorStates = this.buildcursorStateDataObjectArray(frequencyCursorPositions, frequencyCursorActiveStates);
            var frequencyCursorStatesPackage = new package_1.Package(new meta_1.Meta(this.dataType, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: CursorStateConversion.cursorStateDataObjectType }]), frequencyCursorStates);
            return [timeCursorStatesPackage, frequencyCursorStatesPackage];
        };
        /**
         * Builds CursorStateDataObjects from the given position and activestate arrays.
         *
         * @private
         * @param {Array<number>} cursorPositionArray
         * @param {Array<boolean>} cursorActiveStateArray
         * @returns {Array<CursorStateDataObject>}
         * @memberof CursorStateConversion
         */
        CursorStateConversion.prototype.buildcursorStateDataObjectArray = function (cursorPositionArray, cursorActiveStateArray) {
            var cursorStateDataObjectArray = new Array();
            for (var i = 0; i < cursorPositionArray.length && i < cursorActiveStateArray.length; i++) {
                var cursorStateDataObject = {};
                cursorStateDataObject[DataIds.Position] = cursorPositionArray[i];
                cursorStateDataObject[DataIds.Active] = cursorActiveStateArray[i];
                cursorStateDataObjectArray.push(cursorStateDataObject);
            }
            return cursorStateDataObjectArray;
        };
        /**
         * Checks if the  IMeta data is correct for this conversion.
         *
         * @param {Array<IMeta>} meta
         * @returns {boolean}
         * @memberof CursorStateConversion
         */
        CursorStateConversion.prototype.checkMetaDataType = function (meta) {
            var isValid = meta.length === 3;
            //check if timeCursorStates meta data is valid and contained data types supported by this conversion
            if ((!meta_1.Meta.isInvalid(meta[0])) && (meta[0].dataType === this.dataType && meta[0][additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE] === CursorStateConversion.cursorStateDataObjectType)) {
                isValid = isValid && true;
            }
            else {
                isValid = false;
            }
            //check if frequencyCursorStates meta data is valid and contained data types supported by this conversion
            if ((!meta_1.Meta.isInvalid(meta[1])) && (meta[1].dataType === this.dataType && meta[1][additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE] === CursorStateConversion.cursorStateDataObjectType)) {
                isValid = isValid && true;
            }
            //check if fftCursorStates meta data is valid and contained data types supported by this conversion (for backwards compatibility)
            else if ((!meta_1.Meta.isInvalid(meta[2])) && (meta[2].dataType === this.dataType && meta[2][additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE] === CursorStateConversion.cursorStateDataObjectType)) {
                isValid = isValid && true;
            }
            else {
                isValid = false;
            }
            return isValid;
        };
        CursorStateConversion.cursorStateDataObjectType = "cursorstatedata";
        return CursorStateConversion;
    }(anyConversion_1.AnyConversion));
    exports.CursorStateConversion = CursorStateConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU3RhdGVDb252ZXJzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vY3Vyc29yU3RhdGVDb252ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFjQSxJQUFLLE9BTUo7SUFORCxXQUFLLE9BQU87UUFDUixnREFBcUMsQ0FBQTtRQUNyQywwREFBK0MsQ0FBQTtRQUMvQyx3REFBNkMsQ0FBQTtRQUM3QyxnQ0FBcUIsQ0FBQTtRQUNyQiw0QkFBaUIsQ0FBQTtJQUNyQixDQUFDLEVBTkksT0FBTyxLQUFQLE9BQU8sUUFNWDtJQUVEOzs7OztPQUtHO0lBQ0g7UUFBb0MseUNBQWE7UUFJN0M7Ozs7O1dBS0c7UUFDSDtZQUFBLGlCQWdCQztZQWZHLElBQUksV0FBVyxHQUFHO2dCQUNkLHVCQUFVLENBQUMscUJBQXFCO2dCQUNoQyx1QkFBVSxDQUFDLG1CQUFtQjtnQkFDOUIsdUJBQVUsQ0FBQyxvQkFBb0I7Z0JBQy9CLHVCQUFVLENBQUMsa0JBQWtCO2FBQ2hDLENBQUM7WUFFRixJQUFJLFdBQVcsR0FBRztnQkFDZCxPQUFPLENBQUMsZ0JBQWdCO2dCQUN4QixPQUFPLENBQUMscUJBQXFCO2dCQUM3QixPQUFPLENBQUMseUJBQXlCO2FBQ3BDLENBQUM7WUFFRixRQUFBLGtCQUFNLFdBQVcsRUFBRSxXQUFXLENBQUMsU0FBQztZQUNoQyxLQUFJLENBQUMsUUFBUSxHQUFHLHVCQUFRLENBQUMsS0FBSyxDQUFDOztRQUNuQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksK0NBQWUsR0FBdEIsVUFBdUIsSUFBZ0I7WUFFbkMsSUFBSSxlQUFlLEdBQWtDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLG9CQUFvQixHQUFrQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEUsSUFBRyxvQkFBb0IsS0FBSyxTQUFTLEVBQUUsRUFBRSxtRkFBbUY7Z0JBQ3hILG9CQUFvQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQztZQUVELElBQUksWUFBWSxHQUFzQixJQUFJLEtBQUssRUFBRSxDQUFDO1lBRWxELFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBTSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBTSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLFlBQVksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFNLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUUsWUFBWSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQU0sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5RSxPQUFPLFlBQVksQ0FBQztRQUN4QixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksNkNBQWEsR0FBcEIsVUFBcUIsSUFBZ0I7WUFFakMsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSwyQkFBMkIsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSx3QkFBd0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdkMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsK0JBQStCLENBQUMsbUJBQW1CLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztZQUN6RyxJQUFJLHVCQUF1QixHQUFHLElBQUksaUJBQU8sQ0FBQyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUUsdUNBQWtCLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXJMLElBQUkscUJBQXFCLEdBQUcsSUFBSSxDQUFDLCtCQUErQixDQUFDLHdCQUF3QixFQUFFLDJCQUEyQixDQUFDLENBQUM7WUFDeEgsSUFBSSw0QkFBNEIsR0FBRyxJQUFJLGlCQUFPLENBQUMsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUMsR0FBRyxFQUFFLHVDQUFrQixDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUscUJBQXFCLENBQUMseUJBQXlCLEVBQUMsQ0FBQyxDQUFDLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtZQUU3TCxPQUFPLENBQUUsdUJBQXVCLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBR0Q7Ozs7Ozs7O1dBUUc7UUFDSywrREFBK0IsR0FBdkMsVUFBd0MsbUJBQWtDLEVBQUUsc0JBQXNDO1lBQzlHLElBQUksMEJBQTBCLEdBQWlDLElBQUksS0FBSyxFQUFFLENBQUM7WUFFM0UsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsc0JBQXNCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUVyRixJQUFJLHFCQUFxQixHQUFFLEVBQUUsQ0FBQztnQkFFOUIscUJBQXFCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLDBCQUEwQixDQUFDLElBQUksQ0FBQyxxQkFBOEMsQ0FBQyxDQUFDO2FBQ25GO1lBRUQsT0FBTywwQkFBMEIsQ0FBQztRQUN0QyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksaURBQWlCLEdBQXhCLFVBQXlCLElBQW1CO1lBRXhDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBRWhDLG9HQUFvRztZQUNwRyxJQUFHLENBQUMsQ0FBQyxXQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLHVDQUFrQixDQUFDLFNBQVMsQ0FBQyxLQUFLLHFCQUFxQixDQUFDLHlCQUF5QixDQUFDLEVBQUU7Z0JBQ2hLLE9BQU8sR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDO2FBQzdCO2lCQUFNO2dCQUNILE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDbkI7WUFFRCx5R0FBeUc7WUFDekcsSUFBRyxDQUFDLENBQUMsV0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyx1Q0FBa0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxxQkFBcUIsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO2dCQUNoSyxPQUFPLEdBQUcsT0FBTyxJQUFJLElBQUksQ0FBQzthQUM3QjtZQUNELGlJQUFpSTtpQkFDNUgsSUFBRyxDQUFDLENBQUMsV0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyx1Q0FBa0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxxQkFBcUIsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO2dCQUNySyxPQUFPLEdBQUcsT0FBTyxJQUFJLElBQUksQ0FBQzthQUM3QjtpQkFBTTtnQkFDSCxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ25CO1lBRUQsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQWxJdUIsK0NBQXlCLEdBQVcsaUJBQWlCLENBQUM7UUFtSWxGLDRCQUFDO0tBQUEsQUFySUQsQ0FBb0MsNkJBQWEsR0FxSWhEO0lBRVEsc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW55Q29udmVyc2lvbiB9IGZyb20gXCIuL2FueUNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgRGF0YVR5cGUgfSBmcm9tIFwiLi9lbnVtL2RhdGFUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBJUGFja2FnZSB9IGZyb20gXCIuL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBhY2thZ2UgfSBmcm9tIFwiLi9wYWNrYWdlXCI7XHJcbmltcG9ydCB7IE1ldGEgfSBmcm9tIFwiLi9tZXRhXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jb21tb24vc3RhdGVzL3NldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgQWRkaXRpb25hbE1ldGFLZXlzIH0gZnJvbSBcIi4vZW51bS9hZGRpdGlvbmFsTWV0YUtleXNcIjtcclxuaW1wb3J0IHsgSU1ldGEgfSBmcm9tIFwiLi9pbnRlcmZhY2UvbWV0YUludGVyZmFjZVwiO1xyXG5cclxudHlwZSBDdXJzb3JTdGF0ZURhdGFPYmplY3QgPSB7IC8vIHR5cGUgYWxpYXMgb2YgZGF0YSBvYmplY3QgZm9yIGN1cnNvcnN0YXRlXHJcbiAgICBwb3NpdGlvbjogbnVtYmVyLFxyXG4gICAgYWN0aXZlOiBib29sZWFuXHJcbn1cclxuXHJcbmVudW0gRGF0YUlkcyB7IC8vIGtleXMgb2YgZGF0YSBlbnRyaWVzIGluIHRoZSBwYWNrYWdlIGZvcm1hdFxyXG4gICAgVGltZUN1cnNvclN0YXRlcyA9IFwidGltZUN1cnNvclN0YXRlc1wiLFxyXG4gICAgRnJlcXVlbmN5Q3Vyc29yU3RhdGVzID0gXCJmcmVxdWVuY3lDdXJzb3JTdGF0ZXNcIixcclxuICAgIEZyZXF1ZW5jeUN1cnNvclN0YXRlc19PTEQgPSBcImZmdEN1cnNvclN0YXRlc1wiLFxyXG4gICAgUG9zaXRpb24gPSBcInBvc2l0aW9uXCIsXHJcbiAgICBBY3RpdmUgPSBcImFjdGl2ZVwiXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgY29udmVyc2lvbiBoYW5kbGluZyB0aGUgY3Vyc29yIHN0YXRlIGRhdGEsIHNwZWNpZmljIGZvciB0aGUgQ3Vyc29yU3RhdGVQYWNrYWdlQ29udmVydGVyLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ3Vyc29yU3RhdGVDb252ZXJzaW9uXHJcbiAqIEBleHRlbmRzIHtBbnlDb252ZXJzaW9ufVxyXG4gKi9cclxuY2xhc3MgQ3Vyc29yU3RhdGVDb252ZXJzaW9uIGV4dGVuZHMgQW55Q29udmVyc2lvbiB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGN1cnNvclN0YXRlRGF0YU9iamVjdFR5cGU6IHN0cmluZyA9IFwiY3Vyc29yc3RhdGVkYXRhXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEN1cnNvclN0YXRlQ29udmVyc2lvbi5cclxuICAgICAqIE9ubHkgdG8gYmUgdXNlZCBpbiBDdXJzb3JTdGF0ZVBhY2thZ2VDb252ZXJ0ZXIsIGFzIGl0IHNldHMgdGhlIHVzZWQga2V5cyBpdHNlbGYuXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZUNvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgbGV0IHNldHRpbmdLZXlzID0gW1xyXG4gICAgICAgICAgICBTZXR0aW5nSWRzLlRpbWVDdXJzb3JBY3RpdmVTdGF0ZSxcclxuICAgICAgICAgICAgU2V0dGluZ0lkcy5UaW1lQ3Vyc29yUG9zaXRpb25zLFxyXG4gICAgICAgICAgICBTZXR0aW5nSWRzLkZmdEN1cnNvckFjdGl2ZVN0YXRlLCBcclxuICAgICAgICAgICAgU2V0dGluZ0lkcy5GZnRDdXJzb3JQb3NpdGlvbnMgXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgbGV0IHBhY2thZ2VLZXlzID0gW1xyXG4gICAgICAgICAgICBEYXRhSWRzLlRpbWVDdXJzb3JTdGF0ZXMsXHJcbiAgICAgICAgICAgIERhdGFJZHMuRnJlcXVlbmN5Q3Vyc29yU3RhdGVzLFxyXG4gICAgICAgICAgICBEYXRhSWRzLkZyZXF1ZW5jeUN1cnNvclN0YXRlc19PTERcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBzdXBlcihzZXR0aW5nS2V5cywgcGFja2FnZUtleXMpO1xyXG4gICAgICAgIHRoaXMuZGF0YVR5cGUgPSBEYXRhVHlwZS5BUlJBWTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIHRoZSBjdXJzb3Igc3RhdGUgZGF0YSBmcm9tIHBhY2thZ2UgdG8gc2V0dGluZ3MgZm9ybWF0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVDb252ZXJzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb252ZXJ0RGF0YUZyb20oZGF0YTogQXJyYXk8YW55Pik6IEFycmF5PGFueT4ge1xyXG5cclxuICAgICAgICBsZXQgdGltZUN1cnNvclNhdGVzOiBBcnJheTxDdXJzb3JTdGF0ZURhdGFPYmplY3Q+ICA9IGRhdGFbMF07XHJcbiAgICAgICAgbGV0IGZyZXF1ZW5jeUN1cnNvclNhdGVzOiBBcnJheTxDdXJzb3JTdGF0ZURhdGFPYmplY3Q+ICA9IGRhdGFbMV07XHJcblxyXG4gICAgICAgIGlmKGZyZXF1ZW5jeUN1cnNvclNhdGVzID09PSB1bmRlZmluZWQpIHsgLy9iYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBmb3Igd2hlbiBmcmVxdWVuY3lDdXJzb3JTdGF0ZXMgd2VyZSBuYW1lZCBmZnRDdXJzb3JTdGF0ZXNcclxuICAgICAgICAgICAgZnJlcXVlbmN5Q3Vyc29yU2F0ZXMgPSBkYXRhWzJdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNldHRpbmdzRGF0YTogQXJyYXk8QXJyYXk8YW55Pj4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgc2V0dGluZ3NEYXRhLnB1c2godGltZUN1cnNvclNhdGVzLm1hcCgoZWxlbSkgPT4ge3JldHVybiBlbGVtLmFjdGl2ZX0pKTtcclxuICAgICAgICBzZXR0aW5nc0RhdGEucHVzaCh0aW1lQ3Vyc29yU2F0ZXMubWFwKChlbGVtKSA9PiB7cmV0dXJuIGVsZW0ucG9zaXRpb259KSk7XHJcbiAgICAgICAgc2V0dGluZ3NEYXRhLnB1c2goZnJlcXVlbmN5Q3Vyc29yU2F0ZXMubWFwKChlbGVtKSA9PiB7cmV0dXJuIGVsZW0uYWN0aXZlfSkpO1xyXG4gICAgICAgIHNldHRpbmdzRGF0YS5wdXNoKGZyZXF1ZW5jeUN1cnNvclNhdGVzLm1hcCgoZWxlbSkgPT4ge3JldHVybiBlbGVtLnBvc2l0aW9ufSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2V0dGluZ3NEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgdGhlIGN1cnNvciBzdGF0ZSBkYXRhIGZyb20gc2V0dGluZ3MgdG8gcGFja2FnZSBmb3JtYXQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBhY2thZ2U+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFUbyhkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8SVBhY2thZ2U+IHtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVDdXJzb3JBY3RpdmVTdGF0ZXMgPSBkYXRhWzBdO1xyXG4gICAgICAgIGxldCB0aW1lQ3Vyc29yUG9zaXRpb25zID0gZGF0YVsxXTtcclxuICAgICAgICBsZXQgZnJlcXVlbmN5Q3Vyc29yQWN0aXZlU3RhdGVzID0gZGF0YVsyXTtcclxuICAgICAgICBsZXQgZnJlcXVlbmN5Q3Vyc29yUG9zaXRpb25zID0gZGF0YVszXTtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVDdXJzb3JTdGF0ZXMgPSB0aGlzLmJ1aWxkY3Vyc29yU3RhdGVEYXRhT2JqZWN0QXJyYXkodGltZUN1cnNvclBvc2l0aW9ucywgdGltZUN1cnNvckFjdGl2ZVN0YXRlcyk7XHJcbiAgICAgICAgbGV0IHRpbWVDdXJzb3JTdGF0ZXNQYWNrYWdlID0gbmV3IFBhY2thZ2UobmV3IE1ldGEodGhpcy5kYXRhVHlwZSwgW3trZXk6IEFkZGl0aW9uYWxNZXRhS2V5cy5BUlJBWVRZUEUsIHZhbHVlOiBDdXJzb3JTdGF0ZUNvbnZlcnNpb24uY3Vyc29yU3RhdGVEYXRhT2JqZWN0VHlwZSB9XSksIHRpbWVDdXJzb3JTdGF0ZXMpO1xyXG5cclxuICAgICAgICBsZXQgZnJlcXVlbmN5Q3Vyc29yU3RhdGVzID0gdGhpcy5idWlsZGN1cnNvclN0YXRlRGF0YU9iamVjdEFycmF5KGZyZXF1ZW5jeUN1cnNvclBvc2l0aW9ucywgZnJlcXVlbmN5Q3Vyc29yQWN0aXZlU3RhdGVzKTtcclxuICAgICAgICBsZXQgZnJlcXVlbmN5Q3Vyc29yU3RhdGVzUGFja2FnZSA9IG5ldyBQYWNrYWdlKG5ldyBNZXRhKHRoaXMuZGF0YVR5cGUsIFt7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuQVJSQVlUWVBFLCB2YWx1ZTogQ3Vyc29yU3RhdGVDb252ZXJzaW9uLmN1cnNvclN0YXRlRGF0YU9iamVjdFR5cGV9XSksIGZyZXF1ZW5jeUN1cnNvclN0YXRlcylcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gWyB0aW1lQ3Vyc29yU3RhdGVzUGFja2FnZSwgZnJlcXVlbmN5Q3Vyc29yU3RhdGVzUGFja2FnZV07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnVpbGRzIEN1cnNvclN0YXRlRGF0YU9iamVjdHMgZnJvbSB0aGUgZ2l2ZW4gcG9zaXRpb24gYW5kIGFjdGl2ZXN0YXRlIGFycmF5cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjdXJzb3JQb3NpdGlvbkFycmF5XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGJvb2xlYW4+fSBjdXJzb3JBY3RpdmVTdGF0ZUFycmF5XHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29yU3RhdGVEYXRhT2JqZWN0Pn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZUNvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBidWlsZGN1cnNvclN0YXRlRGF0YU9iamVjdEFycmF5KGN1cnNvclBvc2l0aW9uQXJyYXk6IEFycmF5PG51bWJlcj4sIGN1cnNvckFjdGl2ZVN0YXRlQXJyYXk6IEFycmF5PGJvb2xlYW4+KTogQXJyYXk8Q3Vyc29yU3RhdGVEYXRhT2JqZWN0PiB7XHJcbiAgICAgICAgbGV0IGN1cnNvclN0YXRlRGF0YU9iamVjdEFycmF5OiBBcnJheTxDdXJzb3JTdGF0ZURhdGFPYmplY3Q+ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGN1cnNvclBvc2l0aW9uQXJyYXkubGVuZ3RoICYmIGkgPCBjdXJzb3JBY3RpdmVTdGF0ZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3Vyc29yU3RhdGVEYXRhT2JqZWN0PSB7fTtcclxuXHJcbiAgICAgICAgICAgIGN1cnNvclN0YXRlRGF0YU9iamVjdFtEYXRhSWRzLlBvc2l0aW9uXSA9IGN1cnNvclBvc2l0aW9uQXJyYXlbaV07XHJcbiAgICAgICAgICAgIGN1cnNvclN0YXRlRGF0YU9iamVjdFtEYXRhSWRzLkFjdGl2ZV0gPSBjdXJzb3JBY3RpdmVTdGF0ZUFycmF5W2ldO1xyXG4gICAgICAgICAgICBjdXJzb3JTdGF0ZURhdGFPYmplY3RBcnJheS5wdXNoKGN1cnNvclN0YXRlRGF0YU9iamVjdCBhcyBDdXJzb3JTdGF0ZURhdGFPYmplY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnNvclN0YXRlRGF0YU9iamVjdEFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSAgSU1ldGEgZGF0YSBpcyBjb3JyZWN0IGZvciB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJTWV0YT59IG1ldGFcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tNZXRhRGF0YVR5cGUobWV0YTogIEFycmF5PElNZXRhPik6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBsZXQgaXNWYWxpZCA9IG1ldGEubGVuZ3RoID09PSAzO1xyXG5cclxuICAgICAgICAvL2NoZWNrIGlmIHRpbWVDdXJzb3JTdGF0ZXMgbWV0YSBkYXRhIGlzIHZhbGlkIGFuZCBjb250YWluZWQgZGF0YSB0eXBlcyBzdXBwb3J0ZWQgYnkgdGhpcyBjb252ZXJzaW9uXHJcbiAgICAgICAgaWYoKCFNZXRhLmlzSW52YWxpZChtZXRhWzBdKSkgJiYgKG1ldGFbMF0uZGF0YVR5cGUgPT09IHRoaXMuZGF0YVR5cGUgJiYgbWV0YVswXVtBZGRpdGlvbmFsTWV0YUtleXMuQVJSQVlUWVBFXSA9PT0gQ3Vyc29yU3RhdGVDb252ZXJzaW9uLmN1cnNvclN0YXRlRGF0YU9iamVjdFR5cGUpKSB7XHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBpZiBmcmVxdWVuY3lDdXJzb3JTdGF0ZXMgbWV0YSBkYXRhIGlzIHZhbGlkIGFuZCBjb250YWluZWQgZGF0YSB0eXBlcyBzdXBwb3J0ZWQgYnkgdGhpcyBjb252ZXJzaW9uXHJcbiAgICAgICAgaWYoKCFNZXRhLmlzSW52YWxpZChtZXRhWzFdKSkgJiYgKG1ldGFbMV0uZGF0YVR5cGUgPT09IHRoaXMuZGF0YVR5cGUgJiYgbWV0YVsxXVtBZGRpdGlvbmFsTWV0YUtleXMuQVJSQVlUWVBFXSA9PT0gQ3Vyc29yU3RhdGVDb252ZXJzaW9uLmN1cnNvclN0YXRlRGF0YU9iamVjdFR5cGUpKSB7XHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHRydWU7XHJcbiAgICAgICAgfSBcclxuICAgICAgICAvL2NoZWNrIGlmIGZmdEN1cnNvclN0YXRlcyBtZXRhIGRhdGEgaXMgdmFsaWQgYW5kIGNvbnRhaW5lZCBkYXRhIHR5cGVzIHN1cHBvcnRlZCBieSB0aGlzIGNvbnZlcnNpb24gKGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSlcclxuICAgICAgICBlbHNlIGlmKCghTWV0YS5pc0ludmFsaWQobWV0YVsyXSkpICYmIChtZXRhWzJdLmRhdGFUeXBlID09PSB0aGlzLmRhdGFUeXBlICYmIG1ldGFbMl1bQWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRV0gPT09IEN1cnNvclN0YXRlQ29udmVyc2lvbi5jdXJzb3JTdGF0ZURhdGFPYmplY3RUeXBlKSkge1xyXG4gICAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDdXJzb3JTdGF0ZUNvbnZlcnNpb24gfSJdfQ==