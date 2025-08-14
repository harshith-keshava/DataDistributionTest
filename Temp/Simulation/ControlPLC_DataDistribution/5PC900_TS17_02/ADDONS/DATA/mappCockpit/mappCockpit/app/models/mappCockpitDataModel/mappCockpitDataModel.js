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
define(["require", "exports", "../../models/dataModelBase", "../../models/online/componentsDataModel"], function (require, exports, dataModelBase_1, componentsDataModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the data model for the mappCockpit
     *
     * @class MappCockpitDataModel
     * @extends {DataModelBase}
     * @implements {IMappCockpitDataModel}
     */
    var MappCockpitDataModel = /** @class */ (function (_super) {
        __extends(MappCockpitDataModel, _super);
        function MappCockpitDataModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MappCockpitDataModel.prototype, "mappCockpitComponentDataModel", {
            get: function () { return this.dataSource; },
            enumerable: true,
            configurable: true
        });
        ;
        /**
         * initializes the data model
         *
         * @memberof MappCockpitDataModel
         */
        MappCockpitDataModel.prototype.initialize = function () {
            // the main data models data source is the mapp cockpit component data model
            var mappCockpitComponentDataModel = new componentsDataModel_1.MappCockpitComponentDataModel();
            this.dataSource = mappCockpitComponentDataModel;
            mappCockpitComponentDataModel.initialize();
            _super.prototype.initialize.call(this);
        };
        /**
         * initializes the data model component
         *
         * @memberof MappCockpitDataModel
         */
        MappCockpitDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        /**
         * Dispose the MappCockpitDataModel
         *
         * @memberof MappCockpitDataModel
         */
        MappCockpitDataModel.prototype.dispose = function () {
            this.mappCockpitComponentDataModel.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * updates the data model
         *
         * @memberof MappCockpitDataModel
         */
        MappCockpitDataModel.prototype.connect = function () {
            _super.prototype.connect.call(this);
            this.mappCockpitComponentDataModel.connect();
        };
        return MappCockpitDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.MappCockpitDataModel = MappCockpitDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXREYXRhTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9tYXBwQ29ja3BpdERhdGFNb2RlbC9tYXBwQ29ja3BpdERhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7Ozs7OztPQU1HO0lBQ0g7UUFBMEMsd0NBQWE7UUFBdkQ7O1FBK0NBLENBQUM7UUE3Q0csc0JBQVksK0RBQTZCO2lCQUF6QyxjQUE2RSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7V0FBQTtRQUFBLENBQUM7UUFFdkc7Ozs7V0FJRztRQUNILHlDQUFVLEdBQVY7WUFFSSw0RUFBNEU7WUFDNUUsSUFBSSw2QkFBNkIsR0FBRyxJQUFJLG1EQUE2QixFQUFFLENBQUM7WUFDeEUsSUFBSSxDQUFDLFVBQVUsR0FBRyw2QkFBNkIsQ0FBQztZQUNoRCw2QkFBNkIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUMzQyxpQkFBTSxVQUFVLFdBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGtEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHNDQUFPLEdBQVA7WUFDSSxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0MsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxzQ0FBTyxHQUFQO1lBQ0ksaUJBQU0sT0FBTyxXQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pELENBQUM7UUFFTCwyQkFBQztJQUFELENBQUMsQUEvQ0QsQ0FBMEMsNkJBQWEsR0ErQ3REO0lBL0NZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFNb2RlbEJhc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgSU1hcHBDb2NrcGl0RGF0YU1vZGVsIH0gZnJvbSBcIi4vbWFwcENvY2twaXREYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9jb21wb25lbnRzRGF0YU1vZGVsXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgZGF0YSBtb2RlbCBmb3IgdGhlIG1hcHBDb2NrcGl0XHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdERhdGFNb2RlbFxyXG4gKiBAZXh0ZW5kcyB7RGF0YU1vZGVsQmFzZX1cclxuICogQGltcGxlbWVudHMge0lNYXBwQ29ja3BpdERhdGFNb2RlbH1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBwQ29ja3BpdERhdGFNb2RlbCBleHRlbmRzIERhdGFNb2RlbEJhc2UgaW1wbGVtZW50cyBJTWFwcENvY2twaXREYXRhTW9kZWx7XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgbWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwoKTogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgeyByZXR1cm4gdGhpcy5kYXRhU291cmNlOyB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZXMgdGhlIGRhdGEgbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gdGhlIG1haW4gZGF0YSBtb2RlbHMgZGF0YSBzb3VyY2UgaXMgdGhlIG1hcHAgY29ja3BpdCBjb21wb25lbnQgZGF0YSBtb2RlbFxyXG4gICAgICAgIGxldCBtYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCA9IG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLmluaXRpYWxpemUoKTtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgZGF0YSBtb2RlbCBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBNYXBwQ29ja3BpdERhdGFNb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5tYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgZGF0YSBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBjb25uZWN0KCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgIHN1cGVyLmNvbm5lY3QoKTtcclxuICAgICAgICB0aGlzLm1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLmNvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19