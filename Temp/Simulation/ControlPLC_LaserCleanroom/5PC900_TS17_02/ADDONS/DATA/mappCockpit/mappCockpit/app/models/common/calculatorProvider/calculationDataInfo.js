define(["require", "exports", "../../../common/persistence/settings", "./calculationDataInfoSettingIds"], function (require, exports, settings_1, calculationDataInfoSettingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationDataInfo = /** @class */ (function () {
        function CalculationDataInfo(uniqueId) {
            if (uniqueId === void 0) { uniqueId = ""; }
            this.inputSeriesIds = [];
            this._uniqueId = uniqueId;
            this._inputData = [];
            this._inputDataValues = [];
            this._inputDataIds = [];
            this._type = "";
        }
        Object.defineProperty(CalculationDataInfo.prototype, "uniqueId", {
            get: function () {
                return this._uniqueId;
            },
            enumerable: true,
            configurable: true
        });
        CalculationDataInfo.prototype.getSettings = function () {
            var settings = new settings_1.Settings("CalculationDataInfo", "2.0");
            settings.setValue(calculationDataInfoSettingIds_1.SettingIds.Type, this.type);
            settings.setValue(calculationDataInfoSettingIds_1.SettingIds.InputDataValues, this.inputDataValues);
            settings.setValue(calculationDataInfoSettingIds_1.SettingIds.InputDataIds, this.inputDataIds);
            settings.setValue(calculationDataInfoSettingIds_1.SettingIds.UniqueId, this.uniqueId);
            return settings;
        };
        CalculationDataInfo.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            this.type = settingsObj.getValue(calculationDataInfoSettingIds_1.SettingIds.Type);
            this.inputDataValues = settingsObj.getValue(calculationDataInfoSettingIds_1.SettingIds.InputDataValues);
            this.inputDataIds = settingsObj.getValue(calculationDataInfoSettingIds_1.SettingIds.InputDataIds);
            if (this.inputDataIds == undefined) {
                this.inputDataIds = new Array();
            }
            this._uniqueId = settingsObj.getValue(calculationDataInfoSettingIds_1.SettingIds.UniqueId);
        };
        Object.defineProperty(CalculationDataInfo.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculationDataInfo.prototype, "inputData", {
            get: function () {
                return this._inputData;
            },
            set: function (inputData) {
                this._inputData = inputData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculationDataInfo.prototype, "inputDataValues", {
            get: function () {
                return this._inputDataValues;
            },
            set: function (value) {
                this._inputDataValues = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculationDataInfo.prototype, "inputDataIds", {
            get: function () {
                return this._inputDataIds;
            },
            set: function (value) {
                this._inputDataIds = value;
            },
            enumerable: true,
            configurable: true
        });
        return CalculationDataInfo;
    }());
    exports.CalculationDataInfo = CalculationDataInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhSW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTtRQThDSSw2QkFBWSxRQUFtQjtZQUFuQix5QkFBQSxFQUFBLGFBQW1CO1lBdEN4QixtQkFBYyxHQUE0QixFQUFFLENBQUM7WUF1Q2hELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQWhERCxzQkFBVyx5Q0FBUTtpQkFBbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBZ0RELHlDQUFXLEdBQVg7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUQsUUFBUSxDQUFDLFFBQVEsQ0FBQywwQ0FBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsUUFBUSxDQUFDLFFBQVEsQ0FBQywwQ0FBVSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDcEUsUUFBUSxDQUFDLFFBQVEsQ0FBQywwQ0FBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUQsUUFBUSxDQUFDLFFBQVEsQ0FBQywwQ0FBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEQsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVELHlDQUFXLEdBQVgsVUFBWSxRQUFtQjtZQUMzQixJQUFJLFdBQVcsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsMENBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsMENBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsMENBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsRSxJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFDO2dCQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7YUFDM0M7WUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsMENBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsc0JBQUkscUNBQUk7aUJBQVI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBUyxJQUFZO2dCQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDOzs7V0FKQTtRQU1ELHNCQUFJLDBDQUFTO2lCQUFiO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDO2lCQUVELFVBQWMsU0FBdUM7Z0JBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQ2hDLENBQUM7OztXQUpBO1FBTUQsc0JBQUksZ0RBQWU7aUJBQW5CO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLENBQUM7aUJBRUQsVUFBb0IsS0FBb0I7Z0JBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7WUFDbEMsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBSSw2Q0FBWTtpQkFBaEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzlCLENBQUM7aUJBRUQsVUFBaUIsS0FBb0I7Z0JBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQy9CLENBQUM7OztXQUpBO1FBTUwsMEJBQUM7SUFBRCxDQUFDLEFBM0dELElBMkdDO0lBM0dZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3NPYmplY3QgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NPYmplY3RJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vY2FsY3VsYXRpb25EYXRhSW5mb1NldHRpbmdJZHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGlvbkRhdGFJbmZvIGltcGxlbWVudHMgSVNldHRpbmdzT2JqZWN0e1xyXG5cclxuICAgIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgdW5pcXVlSWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdW5pcXVlSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlucHV0U2VyaWVzSWRzOiBBcnJheTxzdHJpbmd8dW5kZWZpbmVkPiA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRvciB0eXBlIGlkKGUuZy4gYWRkLCBjb3MsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdGlvbkRhdGFJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3R5cGU6IHN0cmluZztcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFsbHkgdXNlZCBpbnB1dCBkYXRhIG9mIHRoZSBpbnB1dCBzaWduYWwgKGNvdWxkIGJlIG9ubHkgYSBwYXJ0IG9mIHRoZSBvcmlnaW5hbCBzaWduYWwgZGF0YSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pbnB1dERhdGE6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnB1dCBkYXRhIHZhbHVlIChvbmx5IHRoZSBuYW1lcyBvZiB0aGUgaW5wdXQgZGF0YTsgZS5nLiBzaWduYWxuYW1lLCBmaWx0ZXIgb3JkZXIgbnVtYmVyLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtBcnJheTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YUluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfaW5wdXREYXRhVmFsdWVzOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5wdXQgZGF0YSBpZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0FycmF5PHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pbnB1dERhdGFJZHM6IEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgY29uc3RydWN0b3IodW5pcXVlSWQ6IHN0cmluZz1cIlwiKXtcclxuICAgICAgICB0aGlzLl91bmlxdWVJZCA9IHVuaXF1ZUlkO1xyXG4gICAgICAgIHRoaXMuX2lucHV0RGF0YSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2lucHV0RGF0YVZhbHVlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2lucHV0RGF0YUlkcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyhcIkNhbGN1bGF0aW9uRGF0YUluZm9cIiwgXCIyLjBcIik7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5UeXBlLCB0aGlzLnR5cGUpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuSW5wdXREYXRhVmFsdWVzLCB0aGlzLmlucHV0RGF0YVZhbHVlcyk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5JbnB1dERhdGFJZHMsIHRoaXMuaW5wdXREYXRhSWRzKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlVuaXF1ZUlkLCB0aGlzLnVuaXF1ZUlkKTtcclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElTZXR0aW5ncykge1xyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5UeXBlKTtcclxuICAgICAgICB0aGlzLmlucHV0RGF0YVZhbHVlcyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuSW5wdXREYXRhVmFsdWVzKTtcclxuICAgICAgICB0aGlzLmlucHV0RGF0YUlkcyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuSW5wdXREYXRhSWRzKTtcclxuICAgICAgICBpZih0aGlzLmlucHV0RGF0YUlkcyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0RGF0YUlkcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl91bmlxdWVJZCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuVW5pcXVlSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0eXBlKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdHlwZSh0eXBlOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbnB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBpbnB1dERhdGEoaW5wdXREYXRhOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KXtcclxuICAgICAgICB0aGlzLl9pbnB1dERhdGEgPSBpbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlucHV0RGF0YVZhbHVlcygpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXREYXRhVmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBpbnB1dERhdGFWYWx1ZXModmFsdWU6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICB0aGlzLl9pbnB1dERhdGFWYWx1ZXMgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaW5wdXREYXRhSWRzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dERhdGFJZHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGlucHV0RGF0YUlkcyh2YWx1ZTogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMuX2lucHV0RGF0YUlkcyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=