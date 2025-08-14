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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "./componentDefaultDefinition", "../common/treeGridWidgetBase"], function (require, exports, componentDefaultDefinition_1, treeGridWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    import { FileReader } from "../../common/utilities/binFileReader";
    import * as KaitaiStream from "../../libs/dataparsing/kaitai-struct/kaitaiStream";
    import * as NwctBinParser from "../../libs/dataparsing/NwctBinParser";*/
    /**
     * implements the dummy widget
     *
     * @class DummyWidget
     * @extends {WidgetBase}
     */
    var DummyWidget = /** @class */ (function (_super) {
        __extends(DummyWidget, _super);
        function DummyWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Event handlers
            _this._contentActivatedHandler = function (sender, args) { return _this.onLayoutContentActivated(sender, args); };
            return _this;
            /**
             * resizes the trace configuration widget
             *
             * @param {number} width
             * @param {number} height
             * @memberof TraceConfigurationWidget
             */
            /*resize(width: number, height: number){
                this._actualWidth = width;
                this._actualHeight = height;
                
                if(this._layoutWidget != undefined){
                    this._layoutWidget!.resize(width, height);
                }
            }*/
            /**
             * Creates the widget content and eventually subwidgets
             *
             * @param {string} layoutContainerId
             * @memberof DummyWidget
             */
            /*createLayout() {
                this.createDummyData();
            }
        
            resize(width: number, height: number){
        
                this._mainDiv[0].style.width = width.toString() + "px";
                this._mainDiv[0].style.height = height.toString() + "px";
            }
        
            private createDummyData() {
        
                this._mainDiv.append("Dummy widget");
                this._mainDiv[0].style.background = ColorHelper.getColor();
                this._mainDiv[0].style.overflow = "hidden";
            }*/
        }
        DummyWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof DummyWidget
         */
        DummyWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.getNwctData();
            /*
            this._layoutWidget = this.component.getSubComponent(ComponentDefaultDefinition.mainWidgetId);
    
            this._layoutWidget!.initialize("");
            this._layoutWidget!.eventWidgetActivated.attach(this._contentActivatedHandler);
            this._layoutWidget.addToParentContainer(this.mainDiv);*/
        };
        DummyWidget.prototype.getNwctData = function () {
            return new Array();
        };
        /**
         * Disposes the dummy widget
         *
         * @returns {*}
         * @memberof DummyWidget
         */
        DummyWidget.prototype.dispose = function () {
            /* this._layoutWidget!.eventWidgetActivated.detach(this._contentActivatedHandler);
             this._layoutWidget!.dispose();*/
            _super.prototype.dispose.call(this);
        };
        DummyWidget.prototype.getDataSource = function () {
            var _this = this;
            var dataSource = new Array();
            var data = this.getNwctData();
            data.dataRecords.forEach(function (dataRecord) {
                var ncObjectType = "";
                var channelIndex = "";
                if (dataRecord.ncObjectType == 1) {
                    ncObjectType = "ncAXIS";
                    channelIndex = (dataRecord.channelIndex + 1);
                }
                else if (dataRecord.ncObjectType == 3) {
                    ncObjectType = "ncMODULE";
                    channelIndex = (dataRecord.channelIndex + 1);
                }
                var nodeNumber = "";
                var networkType = "";
                data.configRecord.forEach(function (configRecord) {
                    if (configRecord.configurationRecordId == dataRecord.configRecordId) {
                        nodeNumber = configRecord.nodeNumberOfDrive;
                        if (configRecord.networkType == 254) {
                            networkType = "NCMAN";
                            nodeNumber = "";
                        }
                        else if (configRecord.networkType == 1) {
                            networkType = "PLK[0]";
                        }
                        else {
                            networkType = configRecord.networkType;
                        }
                    }
                });
                var parDatValue = "";
                if (dataRecord.acoposParameterData != undefined && dataRecord.acoposParameterData.parDat.value != undefined) {
                    parDatValue = " = " + dataRecord.acoposParameterData.parDat.value;
                }
                var type = "req";
                var record = _this.getRecord(dataRecord.index, networkType, nodeNumber, ncObjectType + " " + channelIndex, dataRecord.acoposParameterData.parId + parDatValue, dataRecord.timeInSeconds, type);
                dataSource.push(record);
            });
            return dataSource;
        };
        DummyWidget.prototype.getRecord = function (index, interfaceName, node, ncObject, description, time, type) {
            if (type == "res") {
                return { resIndex: index, interface: interfaceName, node: node, ncObject: ncObject, res: description, resTime: time };
            }
            else {
                return { reqIndex: index, interface: interfaceName, node: node, ncObject: ncObject, req: description, reqTime: time };
            }
        };
        DummyWidget.prototype.createTreeGrid = function () {
            var dataSource = this.getDataSource();
            $(this.mainDiv).ejTreeGrid(__assign(__assign({}, this.getTreeGridColumnDefinition()), { dataSource: dataSource, editSettings: { allowDeleting: false } }));
        };
        DummyWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "reqIndex", headerText: "Index", width: "40" },
                    { field: "interface", headerText: "Interface", width: "40" },
                    { field: "node", headerText: "Node", width: "40" },
                    { field: "ncObject", headerText: "NC Object", width: "100" },
                    { field: "req", headerText: "Request", width: "200" },
                    { field: "reqTime", headerText: "Time [s]", width: "100" },
                    { field: "resTime", headerText: "Time [s]", width: "100" },
                    { field: "res", headerText: "Response", width: "200" },
                    { field: "resIndex", headerText: "Index", width: "100" },
                ],
            };
        };
        /**
         * Raised after a layout content was activated
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof DummyWidget
         */
        DummyWidget.prototype.onLayoutContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return DummyWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.DummyWidget = DummyWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXlXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvZHVtbXlXaWRnZXQvZHVtbXlXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7Ozs0RUFHd0U7SUFHeEU7Ozs7O09BS0c7SUFDSDtRQUEwQiwrQkFBa0I7UUFBNUM7WUFBQSxxRUE4S0M7WUE1S0csaUJBQWlCO1lBQ1QsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQzs7WUFxSWpHOzs7Ozs7ZUFNRztZQUNIOzs7Ozs7O2VBT0c7WUFFSDs7Ozs7ZUFLRztZQUNIOzs7Ozs7Ozs7Ozs7Ozs7ZUFlRztRQUNQLENBQUM7UUF6S0cseUNBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGlDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkI7Ozs7O29FQUt3RDtRQUM1RCxDQUFDO1FBRUQsaUNBQVcsR0FBWDtZQUNJLE9BQU8sSUFBSSxLQUFLLEVBQU8sQ0FBQztRQUM1QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCw2QkFBTyxHQUFQO1lBQ0c7NkNBQ2lDO1lBQ2hDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFTyxtQ0FBYSxHQUFyQjtZQUFBLGlCQXdDQztZQXZDRyxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1lBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FB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Q0osQ0FBQztRQUNOLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssOENBQXdCLEdBQWhDLFVBQWlDLE1BQU0sRUFBRSxJQUFJO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBd0NMLGtCQUFDO0lBQUQsQ0FBQyxBQTlLRCxDQUEwQix1Q0FBa0IsR0E4SzNDO0lBRVEsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvL2ltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSUR1bW15V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9kdW1teVdpZGdldEludGVyZmFjZVwiO1xyXG4vL2ltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvckhlbHBlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IExheW91dFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2xheW91dFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgVG9vbHNPdmVydmlld1dpZGdldCB9IGZyb20gXCIuLi90b29sc092ZXJ2aWV3V2lkZ2V0L3Rvb2xzT3ZlcnZpZXdXaWRnZXRcIjtcclxuLypcclxuaW1wb3J0IHsgRmlsZVJlYWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vdXRpbGl0aWVzL2JpbkZpbGVSZWFkZXJcIjtcclxuaW1wb3J0ICogYXMgS2FpdGFpU3RyZWFtIGZyb20gXCIuLi8uLi9saWJzL2RhdGFwYXJzaW5nL2thaXRhaS1zdHJ1Y3Qva2FpdGFpU3RyZWFtXCI7XHJcbmltcG9ydCAqIGFzIE53Y3RCaW5QYXJzZXIgZnJvbSBcIi4uLy4uL2xpYnMvZGF0YXBhcnNpbmcvTndjdEJpblBhcnNlclwiOyovXHJcblxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIGR1bW15IHdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgRHVtbXlXaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBEdW1teVdpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElEdW1teVdpZGdldCB7XHJcblxyXG4gICAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAgIHByaXZhdGUgX2NvbnRlbnRBY3RpdmF0ZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vbkxheW91dENvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLCBhcmdzKTtcclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBEdW1teVdpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplZCgpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmdldE53Y3REYXRhKCk7XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24ubWFpbldpZGdldElkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5pbml0aWFsaXplKFwiXCIpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuYXR0YWNoKHRoaXMuX2NvbnRlbnRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuYWRkVG9QYXJlbnRDb250YWluZXIodGhpcy5tYWluRGl2KTsqL1xyXG4gICAgfVxyXG5cclxuICAgIGdldE53Y3REYXRhKCk6IGFueXtcclxuICAgICAgICByZXR1cm4gbmV3IEFycmF5PGFueT4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBkdW1teSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBEdW1teVdpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAvKiB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9jb250ZW50QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kaXNwb3NlKCk7Ki9cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREYXRhU291cmNlKCl7XHJcbiAgICAgICAgbGV0IGRhdGFTb3VyY2UgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXROd2N0RGF0YSgpO1xyXG4gICAgICAgIGRhdGEuZGF0YVJlY29yZHMuZm9yRWFjaChkYXRhUmVjb3JkID0+IHtcclxuICAgICAgICAgICAgbGV0IG5jT2JqZWN0VHlwZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBjaGFubmVsSW5kZXggPSBcIlwiO1xyXG4gICAgICAgICAgICBpZihkYXRhUmVjb3JkLm5jT2JqZWN0VHlwZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIG5jT2JqZWN0VHlwZSA9IFwibmNBWElTXCI7XHJcbiAgICAgICAgICAgICAgICBjaGFubmVsSW5kZXggPSAoZGF0YVJlY29yZC5jaGFubmVsSW5kZXgrMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihkYXRhUmVjb3JkLm5jT2JqZWN0VHlwZSA9PSAzKXtcclxuICAgICAgICAgICAgICAgIG5jT2JqZWN0VHlwZSA9IFwibmNNT0RVTEVcIjtcclxuICAgICAgICAgICAgICAgIGNoYW5uZWxJbmRleCA9IChkYXRhUmVjb3JkLmNoYW5uZWxJbmRleCsxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZU51bWJlciA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBuZXR3b3JrVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGRhdGEuY29uZmlnUmVjb3JkLmZvckVhY2goY29uZmlnUmVjb3JkID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGNvbmZpZ1JlY29yZC5jb25maWd1cmF0aW9uUmVjb3JkSWQgPT0gZGF0YVJlY29yZC5jb25maWdSZWNvcmRJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU51bWJlciA9IGNvbmZpZ1JlY29yZC5ub2RlTnVtYmVyT2ZEcml2ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb25maWdSZWNvcmQubmV0d29ya1R5cGUgPT0gMjU0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya1R5cGUgPSBcIk5DTUFOXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVOdW1iZXIgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGNvbmZpZ1JlY29yZC5uZXR3b3JrVHlwZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya1R5cGUgPSBcIlBMS1swXVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya1R5cGUgPSBjb25maWdSZWNvcmQubmV0d29ya1R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IHBhckRhdFZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgaWYoZGF0YVJlY29yZC5hY29wb3NQYXJhbWV0ZXJEYXRhICE9IHVuZGVmaW5lZCAmJiBkYXRhUmVjb3JkLmFjb3Bvc1BhcmFtZXRlckRhdGEucGFyRGF0LnZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBwYXJEYXRWYWx1ZSA9IFwiID0gXCIgKyBkYXRhUmVjb3JkLmFjb3Bvc1BhcmFtZXRlckRhdGEucGFyRGF0LnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gXCJyZXFcIjtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuZ2V0UmVjb3JkKGRhdGFSZWNvcmQuaW5kZXgsIG5ldHdvcmtUeXBlLCBub2RlTnVtYmVyLCBuY09iamVjdFR5cGUgKyBcIiBcIiArIGNoYW5uZWxJbmRleCwgZGF0YVJlY29yZC5hY29wb3NQYXJhbWV0ZXJEYXRhLnBhcklkICsgcGFyRGF0VmFsdWUsIGRhdGFSZWNvcmQudGltZUluU2Vjb25kcywgdHlwZSk7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2UucHVzaChyZWNvcmQpO1xyXG4gICAgICAgIH0pOyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRhdGFTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZWNvcmQoaW5kZXgsIGludGVyZmFjZU5hbWUsIG5vZGUsIG5jT2JqZWN0LCBkZXNjcmlwdGlvbiwgdGltZSwgdHlwZSl7XHJcblxyXG4gICAgICAgIGlmKHR5cGUgPT0gXCJyZXNcIil7XHJcbiAgICAgICAgICAgIHJldHVybiB7cmVzSW5kZXg6IGluZGV4LCBpbnRlcmZhY2U6IGludGVyZmFjZU5hbWUsIG5vZGU6IG5vZGUsIG5jT2JqZWN0OiBuY09iamVjdCwgcmVzOiBkZXNjcmlwdGlvbiwgcmVzVGltZTogdGltZX07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7cmVxSW5kZXg6IGluZGV4LCBpbnRlcmZhY2U6IGludGVyZmFjZU5hbWUsIG5vZGU6IG5vZGUsIG5jT2JqZWN0OiBuY09iamVjdCwgcmVxOiBkZXNjcmlwdGlvbiwgcmVxVGltZTogdGltZX07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuXHJcblxyXG4gICAgICAgIHZhciBkYXRhU291cmNlID0gdGhpcy5nZXREYXRhU291cmNlKCk7XHJcblxyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IGRhdGFTb3VyY2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0RlbGV0aW5nIDogZmFsc2UgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlcUluZGV4XCIsIGhlYWRlclRleHQ6IFwiSW5kZXhcIiwgd2lkdGg6IFwiNDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImludGVyZmFjZVwiLCBoZWFkZXJUZXh0OiBcIkludGVyZmFjZVwiLCB3aWR0aDogXCI0MFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwibm9kZVwiLCBoZWFkZXJUZXh0OiBcIk5vZGVcIiwgd2lkdGg6IFwiNDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIm5jT2JqZWN0XCIsIGhlYWRlclRleHQ6IFwiTkMgT2JqZWN0XCIsIHdpZHRoOiBcIjEwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVxXCIsIGhlYWRlclRleHQ6IFwiUmVxdWVzdFwiLCB3aWR0aDogXCIyMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlcVRpbWVcIiwgaGVhZGVyVGV4dDogXCJUaW1lIFtzXVwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlc1RpbWVcIiwgaGVhZGVyVGV4dDogXCJUaW1lIFtzXVwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlc1wiLCBoZWFkZXJUZXh0OiBcIlJlc3BvbnNlXCIsIHdpZHRoOiBcIjIwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVzSW5kZXhcIiwgaGVhZGVyVGV4dDogXCJJbmRleFwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlZCBhZnRlciBhIGxheW91dCBjb250ZW50IHdhcyBhY3RpdmF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25MYXlvdXRDb250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIGFyZ3Mud2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogcmVzaXplcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgLypyZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2xheW91dFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBEdW1teVdpZGdldFxyXG4gICAgICovXHJcbiAgICAvKmNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUR1bW15RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblxyXG4gICAgICAgIHRoaXMuX21haW5EaXZbMF0uc3R5bGUud2lkdGggPSB3aWR0aC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgIHRoaXMuX21haW5EaXZbMF0uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0LnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVEdW1teURhdGEoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21haW5EaXYuYXBwZW5kKFwiRHVtbXkgd2lkZ2V0XCIpO1xyXG4gICAgICAgIHRoaXMuX21haW5EaXZbMF0uc3R5bGUuYmFja2dyb3VuZCA9IENvbG9ySGVscGVyLmdldENvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5fbWFpbkRpdlswXS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICB9Ki9cclxufVxyXG5cclxuZXhwb3J0IHsgRHVtbXlXaWRnZXQgfTsiXX0=