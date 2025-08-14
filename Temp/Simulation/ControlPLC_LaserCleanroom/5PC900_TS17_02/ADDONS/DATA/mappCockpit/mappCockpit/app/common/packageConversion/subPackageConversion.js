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
define(["require", "exports", "./anyConversion", "./enum/dataTypeEnum", "./package", "./meta", "./packageConversionController", "../persistence/settings"], function (require, exports, anyConversion_1, dataTypeEnum_1, package_1, meta_1, packageConversionController_1, settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This conversion handles packages.
     * It is used for subpackages referenced by a link id and nested settings.
     *
     * @class SubPackageConversion
     * @extends {AnyConversion}
     */
    var SubPackageConversion = /** @class */ (function (_super) {
        __extends(SubPackageConversion, _super);
        /**
         * Creates an instance of SubPackageConversion.
         *
         * @param {Array<string>} settingKey The keys to be addressed in the settings data by this conversion.
         * @param {Array<string>} packageKey The keys to be addressed in the package data by this conversion.
         * @memberof SubPackageConversion
         */
        function SubPackageConversion(settingKey, packageKey) {
            var _this = _super.call(this, settingKey, packageKey) || this;
            _this.dataType = dataTypeEnum_1.DataType.LINK;
            return _this;
        }
        /**
         * Checks if the data type is of type number.
         *
         * @param {Array<any>} data
         * @returns {boolean}
         * @memberof SubPackageConversion
         */
        SubPackageConversion.prototype.checkDataTypes = function (data) {
            return data.every(function (item) { return typeof item === "number"; });
        };
        /**
         * Retrieves the referenced subpackage from the package conversion controller and performs its conversion from package to settings format.
         *
         * @param {Array<any>} data
         * @returns {Array<any>}
         * @memberof SubPackageConversion
         */
        SubPackageConversion.prototype.convertDataFrom = function (data) {
            var controller = packageConversionController_1.PackageConversionController.getInstance();
            var packets = new Array();
            data.forEach(function (item) {
                //retrieve package by given link id
                var result = controller.getPackageById(item);
                //if package is valid, add it to the packages to be convertes
                if (!package_1.Package.isInvalid(result)) {
                    packets.push(result);
                }
            });
            var settings = new Array();
            packets.forEach(function (packet) {
                // convert package to setting
                var setting = controller.convertFrom(packet);
                //add converted setting to return value
                settings.push(settings_1.Settings.create(setting));
            });
            return settings;
        };
        /**
         * Performs the conversion of a nested setting from setting to package format, adds the converted subpackage to the package conversion controller and references it in the current package.
         *
         * @param {Array<any>} data
         * @returns {Array<IPackage>}
         * @memberof SubPackageConversion
         */
        SubPackageConversion.prototype.convertDataTo = function (data) {
            var _this = this;
            var controller = packageConversionController_1.PackageConversionController.getInstance();
            var packets = new Array();
            data.forEach(function (setting) {
                //convert setting to package
                var packet = controller.convertTo(settings_1.Settings.create(setting));
                //generate link package for converted package
                var link = new package_1.Package(new meta_1.Meta(_this.dataType), packet.meta.id);
                //add converted package to controller
                controller.addPackage(packet);
                // add link package to return value
                packets.push(link);
            });
            return packets;
        };
        return SubPackageConversion;
    }(anyConversion_1.AnyConversion));
    exports.SubPackageConversion = SubPackageConversion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViUGFja2FnZUNvbnZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9zdWJQYWNrYWdlQ29udmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7Ozs7OztPQU1HO0lBQ0g7UUFBbUMsd0NBQWE7UUFFNUM7Ozs7OztXQU1HO1FBQ0gsOEJBQVksVUFBeUIsRUFBRSxVQUF5QjtZQUFoRSxZQUNJLGtCQUFNLFVBQVUsRUFBRSxVQUFVLENBQUMsU0FFaEM7WUFERyxLQUFJLENBQUMsUUFBUSxHQUFHLHVCQUFRLENBQUMsSUFBSSxDQUFDOztRQUNsQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksNkNBQWMsR0FBckIsVUFBc0IsSUFBZ0I7WUFDbEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQUMsSUFBSSxJQUFPLE9BQU8sT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDhDQUFlLEdBQXRCLFVBQXVCLElBQWdCO1lBRW5DLElBQUksVUFBVSxHQUFnQyx5REFBMkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4RixJQUFJLE9BQU8sR0FBb0IsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtnQkFFZCxtQ0FBbUM7Z0JBQ25DLElBQUksTUFBTSxHQUFhLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXZELDZEQUE2RDtnQkFDN0QsSUFBRyxDQUFDLGlCQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN4QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxRQUFRLEdBQW9CLElBQUksS0FBSyxFQUFFLENBQUM7WUFDNUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBRW5CLDZCQUE2QjtnQkFDN0IsSUFBSSxPQUFPLEdBQWMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFeEQsdUNBQXVDO2dCQUN2QyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksNENBQWEsR0FBcEIsVUFBcUIsSUFBZ0I7WUFBckMsaUJBb0JDO1lBbEJHLElBQUksVUFBVSxHQUFnQyx5REFBMkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4RixJQUFJLE9BQU8sR0FBb0IsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztnQkFFakIsNEJBQTRCO2dCQUM1QixJQUFJLE1BQU0sR0FBYSxVQUFVLENBQUMsU0FBUyxDQUFDLG1CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRXRFLDZDQUE2QztnQkFDN0MsSUFBSSxJQUFJLEdBQWEsSUFBSSxpQkFBTyxDQUFDLElBQUksV0FBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUUxRSxxQ0FBcUM7Z0JBQ3JDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTlCLG1DQUFtQztnQkFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7UUFDTCwyQkFBQztJQUFELENBQUMsQUF2RkQsQ0FBbUMsNkJBQWEsR0F1Ri9DO0lBQ1Esb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW55Q29udmVyc2lvbiB9IGZyb20gXCIuL2FueUNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgRGF0YVR5cGUgfSBmcm9tIFwiLi9lbnVtL2RhdGFUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBJUGFja2FnZSB9IGZyb20gXCIuL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBhY2thZ2UgfSBmcm9tIFwiLi9wYWNrYWdlXCI7XHJcbmltcG9ydCB7IE1ldGEgfSBmcm9tIFwiLi9tZXRhXCI7XHJcbmltcG9ydCB7IFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlciB9IGZyb20gXCIuL3BhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29udmVyc2lvbiBoYW5kbGVzIHBhY2thZ2VzLlxyXG4gKiBJdCBpcyB1c2VkIGZvciBzdWJwYWNrYWdlcyByZWZlcmVuY2VkIGJ5IGEgbGluayBpZCBhbmQgbmVzdGVkIHNldHRpbmdzLlxyXG4gKlxyXG4gKiBAY2xhc3MgU3ViUGFja2FnZUNvbnZlcnNpb25cclxuICogQGV4dGVuZHMge0FueUNvbnZlcnNpb259XHJcbiAqL1xyXG5jbGFzcyBTdWJQYWNrYWdlQ29udmVyc2lvbiBleHRlbmRzIEFueUNvbnZlcnNpb24ge1xyXG4gICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFN1YlBhY2thZ2VDb252ZXJzaW9uLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHNldHRpbmdLZXkgVGhlIGtleXMgdG8gYmUgYWRkcmVzc2VkIGluIHRoZSBzZXR0aW5ncyBkYXRhIGJ5IHRoaXMgY29udmVyc2lvbi5cclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gcGFja2FnZUtleSBUaGUga2V5cyB0byBiZSBhZGRyZXNzZWQgaW4gdGhlIHBhY2thZ2UgZGF0YSBieSB0aGlzIGNvbnZlcnNpb24uXHJcbiAgICAgKiBAbWVtYmVyb2YgU3ViUGFja2FnZUNvbnZlcnNpb25cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ0tleTogQXJyYXk8c3RyaW5nPiwgcGFja2FnZUtleTogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHN1cGVyKHNldHRpbmdLZXksIHBhY2thZ2VLZXkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVR5cGUgPSBEYXRhVHlwZS5MSU5LO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBkYXRhIHR5cGUgaXMgb2YgdHlwZSBudW1iZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBTdWJQYWNrYWdlQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tEYXRhVHlwZXMoZGF0YTogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBkYXRhLmV2ZXJ5KChpdGVtKSA9PiB7IHJldHVybiB0eXBlb2YgaXRlbSA9PT0gXCJudW1iZXJcIjsgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHRoZSByZWZlcmVuY2VkIHN1YnBhY2thZ2UgZnJvbSB0aGUgcGFja2FnZSBjb252ZXJzaW9uIGNvbnRyb2xsZXIgYW5kIHBlcmZvcm1zIGl0cyBjb252ZXJzaW9uIGZyb20gcGFja2FnZSB0byBzZXR0aW5ncyBmb3JtYXQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBTdWJQYWNrYWdlQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFGcm9tKGRhdGE6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29udHJvbGxlcjogUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyID0gUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IHBhY2tldHM6IEFycmF5PElQYWNrYWdlPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4geyBcclxuXHJcbiAgICAgICAgICAgIC8vcmV0cmlldmUgcGFja2FnZSBieSBnaXZlbiBsaW5rIGlkXHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IElQYWNrYWdlID0gY29udHJvbGxlci5nZXRQYWNrYWdlQnlJZChpdGVtKTsgXHJcblxyXG4gICAgICAgICAgICAvL2lmIHBhY2thZ2UgaXMgdmFsaWQsIGFkZCBpdCB0byB0aGUgcGFja2FnZXMgdG8gYmUgY29udmVydGVzXHJcbiAgICAgICAgICAgIGlmKCFQYWNrYWdlLmlzSW52YWxpZChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICBwYWNrZXRzLnB1c2gocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IHNldHRpbmdzOiBBcnJheTxTZXR0aW5ncz4gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBwYWNrZXRzLmZvckVhY2goKHBhY2tldCkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY29udmVydCBwYWNrYWdlIHRvIHNldHRpbmdcclxuICAgICAgICAgICAgbGV0IHNldHRpbmc6IElTZXR0aW5ncyA9IGNvbnRyb2xsZXIuY29udmVydEZyb20ocGFja2V0KTtcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIGNvbnZlcnRlZCBzZXR0aW5nIHRvIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICBzZXR0aW5ncy5wdXNoKFNldHRpbmdzLmNyZWF0ZShzZXR0aW5nKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGVyZm9ybXMgdGhlIGNvbnZlcnNpb24gb2YgYSBuZXN0ZWQgc2V0dGluZyBmcm9tIHNldHRpbmcgdG8gcGFja2FnZSBmb3JtYXQsIGFkZHMgdGhlIGNvbnZlcnRlZCBzdWJwYWNrYWdlIHRvIHRoZSBwYWNrYWdlIGNvbnZlcnNpb24gY29udHJvbGxlciBhbmQgcmVmZXJlbmNlcyBpdCBpbiB0aGUgY3VycmVudCBwYWNrYWdlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gZGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQYWNrYWdlPn1cclxuICAgICAqIEBtZW1iZXJvZiBTdWJQYWNrYWdlQ29udmVyc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydERhdGFUbyhkYXRhOiBBcnJheTxhbnk+KTogQXJyYXk8SVBhY2thZ2U+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29udHJvbGxlcjogUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyID0gUGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IHBhY2tldHM6IEFycmF5PElQYWNrYWdlPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoc2V0dGluZykgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9jb252ZXJ0IHNldHRpbmcgdG8gcGFja2FnZVxyXG4gICAgICAgICAgICBsZXQgcGFja2V0OiBJUGFja2FnZSA9IGNvbnRyb2xsZXIuY29udmVydFRvKFNldHRpbmdzLmNyZWF0ZShzZXR0aW5nKSk7XHJcblxyXG4gICAgICAgICAgICAvL2dlbmVyYXRlIGxpbmsgcGFja2FnZSBmb3IgY29udmVydGVkIHBhY2thZ2VcclxuICAgICAgICAgICAgbGV0IGxpbms6IElQYWNrYWdlID0gbmV3IFBhY2thZ2UobmV3IE1ldGEodGhpcy5kYXRhVHlwZSksIHBhY2tldC5tZXRhLmlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIGNvbnZlcnRlZCBwYWNrYWdlIHRvIGNvbnRyb2xsZXJcclxuICAgICAgICAgICAgY29udHJvbGxlci5hZGRQYWNrYWdlKHBhY2tldCk7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgbGluayBwYWNrYWdlIHRvIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICBwYWNrZXRzLnB1c2gobGluayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHBhY2tldHM7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgU3ViUGFja2FnZUNvbnZlcnNpb24gfSJdfQ==