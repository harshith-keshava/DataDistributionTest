define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Settings = /** @class */ (function () {
        /**
         * Creates an instance of Settings
         * @param {string} type
         * @memberof Settings
         */
        function Settings(type, version) {
            if (version === void 0) { version = "1.0"; }
            /**
             * List of settings data with ids
             *
             * @type {{ [key: string]: any; }}
             * @memberof Settings
             */
            this.data = {};
            this.type = type;
            this.version = version;
        }
        /**
         * Creates an instance with the given interface data
         *
         * @static
         * @param {ISettings} settings
         * @returns {Settings}
         * @memberof Settings
         */
        Settings.create = function (settings) {
            var instance = new Settings(settings.type, settings.version);
            instance.data = settings.data;
            return instance;
        };
        /**
         * sets some settings data with the given id
         *
         * @param {string} key
         * @param {*} value
         * @memberof Settings
         */
        Settings.prototype.setValue = function (key, value) {
            this.data[key] = value;
        };
        /**
         * Returns some settings data for the given id
         *
         * @param {string} key
         * @returns {*}
         * @memberof Settings
         */
        Settings.prototype.getValue = function (key) {
            return this.data[key];
        };
        return Settings;
    }());
    exports.Settings = Settings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQTZCSTs7OztXQUlHO1FBQ0gsa0JBQVksSUFBWSxFQUFFLE9BQXVCO1lBQXZCLHdCQUFBLEVBQUEsZUFBdUI7WUFiakQ7Ozs7O2VBS0c7WUFDSCxTQUFJLEdBQTRCLEVBQUUsQ0FBQztZQVEvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLGVBQU0sR0FBYixVQUFjLFFBQW1CO1lBQzdCLElBQUksUUFBUSxHQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUM5QixPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsMkJBQVEsR0FBUixVQUFTLEdBQVcsRUFBRSxLQUFVO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCwyQkFBUSxHQUFSLFVBQVMsR0FBVztZQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQUFDLEFBMUVELElBMEVDO0lBMUVZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzIGltcGxlbWVudHMgSVNldHRpbmdze1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHlwZSBvZiB0aGUgc2V0dGluZ3MgZGF0YSAoZS5nLiBjbGFzc25hbWUsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHR5cGU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZlcnNpb24gb2YgdGhpcyBzZXR0aW5ncyBkYXRhIGZvcm1hdCA9PiBcIngueVwiIFxyXG4gICAgICogSWYgc2V0dGluZ3MgZGF0YSB3aWxsIGJlIGNoYW5nZWQgXCJ4XCIgTVVTVCBiZSBpbmNyZWFzZWRcclxuICAgICAqIElmIGFkZGl0aW9uYWxseSBzZXR0aW5ncyB3aWxsIGJlIGFkZGVkIG9ubHkgXCJ5XCIgTVVTVCBiZSBjaGFuZ2VkKGluIHRoaXMgY2FzZSBkb24ndCBmb3JnZXQgdG8gY2hlY2sgaWYgbmV3IHNldHRpbmcgaXMgYXZhaWxhYmxlIGluIFxyXG4gICAgICogc2V0Q29tcG9uZW50U2V0dGluZ3MgbWV0aG9kIGlmIGEgcHJldmlvdXMgdmVyc2lvbiBpcyBsb2FkZWQgd2l0aG91dCB0aGlzIHNldHRpbmcpXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0IG9mIHNldHRpbmdzIGRhdGEgd2l0aCBpZHNcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7eyBba2V5OiBzdHJpbmddOiBhbnk7IH19XHJcbiAgICAgKiBAbWVtYmVyb2YgU2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgZGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnk7IH0gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2V0dGluZ3NcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgU2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCB2ZXJzaW9uOiBzdHJpbmcgPSBcIjEuMFwiKXtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIHdpdGggdGhlIGdpdmVuIGludGVyZmFjZSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJucyB7U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZShzZXR0aW5nczogSVNldHRpbmdzKTogU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IGluc3RhbmNlID0gIG5ldyBTZXR0aW5ncyhzZXR0aW5ncy50eXBlLCBzZXR0aW5ncy52ZXJzaW9uKTtcclxuICAgICAgICBpbnN0YW5jZS5kYXRhID0gc2V0dGluZ3MuZGF0YTtcclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogc2V0cyBzb21lIHNldHRpbmdzIGRhdGEgd2l0aCB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgU2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgc2V0VmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuZGF0YVtrZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBzb21lIHNldHRpbmdzIGRhdGEgZm9yIHRoZSBnaXZlbiBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIGdldFZhbHVlKGtleTogc3RyaW5nKTogYW55e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFba2V5XTtcclxuICAgIH1cclxufSJdfQ==