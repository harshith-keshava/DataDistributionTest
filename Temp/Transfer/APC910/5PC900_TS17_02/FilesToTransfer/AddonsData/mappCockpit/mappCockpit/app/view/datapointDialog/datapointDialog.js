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
define(["require", "exports", "../../framework/events", "./model/dataPoint", "./model/dataPointCategory", "./model/dataPointComponent", "./eventDatapointArgs"], function (require, exports, events_1, dataPoint_1, dataPointCategory_1, dataPointComponent_1, eventDatapointArgs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FooterContentType;
    (function (FooterContentType) {
        FooterContentType[FooterContentType["addReplaceClose"] = 0] = "addReplaceClose";
        FooterContentType[FooterContentType["applyClose"] = 1] = "applyClose";
    })(FooterContentType = exports.FooterContentType || (exports.FooterContentType = {}));
    var EventAddDatapoint = /** @class */ (function (_super) {
        __extends(EventAddDatapoint, _super);
        function EventAddDatapoint() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventAddDatapoint;
    }(events_1.TypedEvent));
    ;
    var EventDialogClosed = /** @class */ (function (_super) {
        __extends(EventDialogClosed, _super);
        function EventDialogClosed() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDialogClosed;
    }(events_1.TypedEvent));
    ;
    /**
     * Implements a static DatapointDialog
     *
     * @class DatapointDialog
     */
    var DatapointDialog = /** @class */ (function () {
        /**
         * Creates an instance of DatapointDialog
         * @memberof DatapointDialog
         */
        function DatapointDialog() {
            // events from dialog
            this.eventAddDatapoint = new EventAddDatapoint();
            this.eventDialogClosed = new EventDialogClosed();
            var datapointDialogId = "CommonDatapointDialog";
            // Add to root => get the page body
            var pageBody = $("body");
            pageBody.append("<div id='" + datapointDialogId + "'></>");
            this.initialize(datapointDialogId);
        }
        /**
         * Returns the one and only instance
         *
         * @static
         * @returns
         * @memberof DatapointDialog
         */
        DatapointDialog.getInstance = function () {
            if (this._instance == undefined) {
                this._instance = new DatapointDialog();
            }
            return this._instance;
        };
        /**
         * Opens the datapoint dialog with the given dialog title and footer content (buttons for add, replace, close or apply, close)
         *
         * @param {string} [dialogTitle="Add data points"]
         * @param {FooterContentType} [footerContentType=FooterContentType.addReplaceClose]
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.open = function (dialogTitle, footerContentType) {
            if (dialogTitle === void 0) { dialogTitle = "Add data points"; }
            if (footerContentType === void 0) { footerContentType = FooterContentType.addReplaceClose; }
            // Set dialog title
            $(this._dialogId).ejDialog({ title: dialogTitle });
            this.createDialog(dialogTitle);
            this.createContentOfDialog();
            // Set footer of the dialog
            this.createFooterOfDialog(footerContentType);
            var isOpen = $(this._dialogId).ejDialog("isOpen");
            if (!isOpen) {
                this.showDialog();
            }
        };
        /**
         * Closes the dialog
         *
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.close = function () {
            $(this._dialogId).ejDialog("close");
            var treeGridObj = $("#" + this._dataPointContentId).data("ejTreeGrid");
            treeGridObj.destroy();
        };
        /**
         * Updates the available datapoints in the dialog
         *
         * @param {Array<TraceDataPointInfo>} data
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.setDatapoints = function (data) {
            this._dataPointsData = new Array();
            var _loop_1 = function (i) {
                var dataPointInfo = data[i];
                var dataPointComponent = this_1._dataPointsData.filter(function (ele) { return ele.sourceName == dataPointInfo.componentName; })[0];
                if (dataPointComponent == undefined) {
                    dataPointComponent = new dataPointComponent_1.DataPointComponent(dataPointInfo.componentName);
                    this_1._dataPointsData.push(dataPointComponent);
                }
                var categoryName = this_1.getDataPointCategoryName(dataPointInfo.namespace);
                var dataPointCategory = dataPointComponent.childs.filter(function (ele) { return ele.sourceName == categoryName; })[0];
                if (dataPointCategory == undefined) {
                    dataPointCategory = new dataPointCategory_1.DataPointCategory(categoryName);
                    dataPointComponent.childs.push(dataPointCategory);
                }
                dataPointCategory.childs.push(new dataPoint_1.DataPoint(dataPointInfo));
            };
            var this_1 = this;
            for (var i = 0; i < data.length; i++) {
                _loop_1(i);
            }
            this.updateTreeGrid();
        };
        /**
         * Initializes the Datapoint dialog with the given id
         *
         * @private
         * @param {string} dialogId
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.initialize = function (dialogId) {
            this._dialogId = "#" + dialogId;
            this._dataPointContentId = dialogId + "_ContentRoot";
            this._dataPointFooterId = dialogId + "_Footer";
            this._dataPointFooterScriptId = dialogId + "_FooterScript";
            // Add content div
            $(this._dialogId).append("<div id='" + this._dataPointContentId + "'></div>");
            // Add footer div
            $(this._dialogId).append("<script id=\"" + this._dataPointFooterScriptId + "\" type=\"text/x-jsrender\">\n        <div id=\"" + this._dataPointFooterId + "\" style=\"padding-left:10px; padding-top: 5px\"></div>\n        </script>");
        };
        /**
         * Returns the category name for the given namespace name
         *
         * @private
         * @param {*} namespaceName
         * @returns {string}
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.getDataPointCategoryName = function (namespaceName) {
            var categoryName = namespaceName;
            if (namespaceName == "*ACP") {
                categoryName = "Hardware: ACOPOS";
            }
            else if (namespaceName == "*DDP" || namespaceName == "*TRK") {
                categoryName = "Component on PLC";
            }
            return categoryName;
        };
        /**
         * Creates the dialog
         *
         * @private
         * @param {string} dialogTitle
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.createDialog = function (dialogTitle) {
            var _this = this;
            $(this._dialogId).ejDialog({
                actionButtons: ["close"],
                height: "675px",
                width: "530px",
                title: dialogTitle,
                resize: function (args) { return _this.resize(args); },
                enableModal: true,
                showFooter: true,
                footerTemplateId: this._dataPointFooterScriptId,
                close: function (args) { return _this.onDialogClosed(); },
            });
        };
        /**
         * Resizes the dialog
         *
         * @private
         * @param {*} args
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.resize = function (args) {
            // Set treegrid size to the Dialog size
            this._actualDialogHeight = args.model.height;
            this._actualDialogWidth = args.model.width;
            var treeGridObj = $("#" + this._dataPointContentId).data("ejTreeGrid"), sizeSettings = {
                height: this._actualDialogHeight - 107, width: this._actualDialogWidth - 30,
            };
            if (treeGridObj) {
                treeGridObj.option("sizeSettings", sizeSettings, true); // force the setting to resize the treegrid correct
            }
        };
        /**
         * Shows the dialog with current defined size (_actualDialogHeight, _actualDialogWidth)
         *
         * @private
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.showDialog = function () {
            $(this._dialogId).ejDialog("open");
            var treeGridObj = $("#" + this._dataPointContentId).data("ejTreeGrid"), sizeSettings = {
                height: this._actualDialogHeight - 107, width: this._actualDialogWidth - 30,
            };
            if (treeGridObj) {
                treeGridObj.option("sizeSettings", sizeSettings, true); // force the setting to resize the treegrid correct
            }
            $(this._dialogId).ejDialog({ height: this._actualDialogHeight });
            $(this._dialogId).ejDialog({ width: this._actualDialogWidth });
            $(this._dialogId).ejDialog("refresh");
        };
        /**
         * Creates the content of the dialog (TreeGrid with datapoints)
         *
         * @private
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.createContentOfDialog = function () {
            var _this = this;
            $("#" + this._dataPointContentId).ejTreeGrid({
                columns: [
                    { field: "sourceName", headerText: "Name", width: 220 },
                    { field: "description", headerText: "Description", width: 300 },
                    { field: "dataPointName", headerText: "Data point", width: 300 },
                ],
                allowColumnResize: true,
                enableVirtualization: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.Normal },
                editSettings: { allowDeleting: false },
                childMapping: "childs",
                expandStateMapping: "expandState",
                sizeSettings: { height: "570px", width: "500px" },
                recordDoubleClick: function (args) { return _this.onAddDatapoint(args.model.selectedItem, eventDatapointArgs_1.DatapointAction.add); },
            });
            this.updateTreeGrid();
        };
        /**
         * Creates the footer content(Add or Apply buttons)
         *
         * @private
         * @param {FooterContentType} footerContentType
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.createFooterOfDialog = function (footerContentType) {
            // Reset footer content
            $("#" + this._dataPointFooterId)[0].innerHTML = "";
            // Create footer content
            if (footerContentType == FooterContentType.applyClose) {
                this.createApplyCloseFooter();
            }
            else {
                this.createAddReplaceCloseFooter();
            }
        };
        /**
         * Creates the Apply/Close buttons in the footer content
         *
         * @private
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.createApplyCloseFooter = function () {
            var _this = this;
            $("#" + this._dataPointFooterId).append('<div id="replaceButton"></div>&nbsp;&nbsp;&nbsp;<div id="closeButton"></div>');
            $("#replaceButton").ejButton({
                text: "Apply",
                click: function (args) {
                    var treegridObj = $("#" + _this._dataPointContentId).data("ejTreeGrid");
                    var selectedItem = treegridObj.model.selectedItem;
                    _this.onAddDatapoint(selectedItem, eventDatapointArgs_1.DatapointAction.replace);
                }
            });
            $("#closeButton").ejButton({
                text: "Close",
                click: function (args) { _this.close(); }
            });
        };
        /**
         * Creates the Add/Replace/Close buttons in the footer content
         *
         * @private
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.createAddReplaceCloseFooter = function () {
            var _this = this;
            $("#" + this._dataPointFooterId).append('<div id="addButton"></div>&nbsp;&nbsp;&nbsp;<div id="replaceButton"></div>&nbsp;&nbsp;&nbsp;<div id="closeButton"></div>');
            $("#addButton").ejButton({
                text: "Add",
                click: function (args) {
                    var treegridObj = $("#" + _this._dataPointContentId).data("ejTreeGrid");
                    var selectedItem = treegridObj.model.selectedItem;
                    _this.onAddDatapoint(selectedItem, eventDatapointArgs_1.DatapointAction.add);
                }
            });
            $("#replaceButton").ejButton({
                text: "Replace",
                click: function (args) {
                    var treegridObj = $("#" + _this._dataPointContentId).data("ejTreeGrid");
                    var selectedItem = treegridObj.model.selectedItem;
                    _this.onAddDatapoint(selectedItem, eventDatapointArgs_1.DatapointAction.replace);
                }
            });
            $("#closeButton").ejButton({
                text: "Close",
                click: function (args) { _this.close(); }
            });
        };
        /**
         * Updates the datapoints in the treegrid
         *
         * @private
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.updateTreeGrid = function () {
            var treegridObj = $("#" + this._dataPointContentId).data("ejTreeGrid");
            if (treegridObj != undefined) {
                // refresh TreeGrid with new datasource if tree grid is already available
                treegridObj.setModel({ "dataSource": this._dataPointsData });
            }
        };
        /**
         * Raises the addDatapoint event
         *
         * @private
         * @param {DataPoint} datapoint
         * @param {DatapointAction} action
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.onAddDatapoint = function (datapoint, action) {
            if (datapoint.dataPointName != undefined && datapoint.dataPointName != "" && datapoint.dataPointInfo != undefined) {
                var eventArgs = new eventDatapointArgs_1.EventDatapointArgs(this, action, datapoint.dataPointInfo);
                this.eventAddDatapoint.raise(null, eventArgs);
            }
        };
        /**
         * Raises the dialogClosed event
         *
         * @private
         * @memberof DatapointDialog
         */
        DatapointDialog.prototype.onDialogClosed = function () {
            this.eventDialogClosed.raise(null, null);
        };
        return DatapointDialog;
    }());
    exports.DatapointDialog = DatapointDialog;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXBvaW50RGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC92aWV3L2RhdGFwb2ludERpYWxvZy9kYXRhcG9pbnREaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BLElBQVksaUJBR1g7SUFIRCxXQUFZLGlCQUFpQjtRQUN6QiwrRUFBZSxDQUFBO1FBQ2YscUVBQVUsQ0FBQTtJQUNkLENBQUMsRUFIVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQUc1QjtJQUVEO1FBQWdDLHFDQUFvQztRQUFwRTs7UUFBc0UsQ0FBQztRQUFELHdCQUFDO0lBQUQsQ0FBQyxBQUF2RSxDQUFnQyxtQkFBVSxHQUE2QjtJQUFBLENBQUM7SUFDeEU7UUFBZ0MscUNBQXNCO1FBQXREOztRQUF3RCxDQUFDO1FBQUQsd0JBQUM7SUFBRCxDQUFDLEFBQXpELENBQWdDLG1CQUFVLEdBQWU7SUFBQSxDQUFDO0lBRTFEOzs7O09BSUc7SUFDSDtRQXFHSTs7O1dBR0c7UUFDSDtZQTFGQSxxQkFBcUI7WUFDZCxzQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFDNUMsc0JBQWlCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1lBeUYvQyxJQUFJLGlCQUFpQixHQUFHLHVCQUF1QixDQUFDO1lBQ2hELG1DQUFtQztZQUNuQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUF6RkQ7Ozs7OztXQU1HO1FBQ1csMkJBQVcsR0FBekI7WUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFDO2dCQUMzQixJQUFJ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LGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQzdHLElBQUksU0FBUyxHQUFHLElBQUksdUNBQWtCLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQzdFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ2pEO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssd0NBQWMsR0FBdEI7WUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBbFdELElBa1dDO0lBbFdZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IERhdGFQb2ludCB9IGZyb20gXCIuL21vZGVsL2RhdGFQb2ludFwiO1xyXG5pbXBvcnQgeyBEYXRhUG9pbnRDYXRlZ29yeSB9IGZyb20gXCIuL21vZGVsL2RhdGFQb2ludENhdGVnb3J5XCI7XHJcbmltcG9ydCB7IERhdGFQb2ludENvbXBvbmVudCB9IGZyb20gXCIuL21vZGVsL2RhdGFQb2ludENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBFdmVudERhdGFwb2ludEFyZ3MsIERhdGFwb2ludEFjdGlvbiB9IGZyb20gXCIuL2V2ZW50RGF0YXBvaW50QXJnc1wiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFQb2ludEluZm8gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50SW5mb1wiO1xyXG5cclxuZXhwb3J0IGVudW0gRm9vdGVyQ29udGVudFR5cGV7XHJcbiAgICBhZGRSZXBsYWNlQ2xvc2UsXHJcbiAgICBhcHBseUNsb3NlLFxyXG59XHJcblxyXG5jbGFzcyBFdmVudEFkZERhdGFwb2ludCBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgRXZlbnREYXRhcG9pbnRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnREaWFsb2dDbG9zZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIG51bGw+eyB9O1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgYSBzdGF0aWMgRGF0YXBvaW50RGlhbG9nXHJcbiAqXHJcbiAqIEBjbGFzcyBEYXRhcG9pbnREaWFsb2dcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEYXRhcG9pbnREaWFsb2d7XHJcbiAgIFxyXG4gICAgLy8gSFRNTCBESVYgaWRzXHJcbiAgICBwcml2YXRlIF9kaWFsb2dJZDtcclxuICAgIHByaXZhdGUgX2RhdGFQb2ludENvbnRlbnRJZDtcclxuICAgIHByaXZhdGUgX2RhdGFQb2ludEZvb3RlcklkO1xyXG4gICAgcHJpdmF0ZSBfZGF0YVBvaW50Rm9vdGVyU2NyaXB0SWQ7XHJcblxyXG4gICAgLy8gRGF0YXBvaW50cyBhcnJheSBmb3IgdGhlIHRyZWVncmlkXHJcbiAgICBwcml2YXRlIF9kYXRhUG9pbnRzRGF0YTogQXJyYXk8YW55Pnx1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIC8vIGN1cnJlbnQgZGlhbG9nIHNpemVcclxuICAgIHByaXZhdGUgX2FjdHVhbERpYWxvZ1dpZHRoO1xyXG4gICAgcHJpdmF0ZSBfYWN0dWFsRGlhbG9nSGVpZ2h0O1xyXG5cclxuICAgIC8vIGV2ZW50cyBmcm9tIGRpYWxvZ1xyXG4gICAgcHVibGljIGV2ZW50QWRkRGF0YXBvaW50ID0gbmV3IEV2ZW50QWRkRGF0YXBvaW50KCk7XHJcbiAgICBwdWJsaWMgZXZlbnREaWFsb2dDbG9zZWQgPSBuZXcgRXZlbnREaWFsb2dDbG9zZWQoKTtcclxuXHJcbiAgICAvLyB0aGUgb25lIGFuZCBvbmx5IHNpbmdsZXRvbiBpbnN0YW5jZVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBEYXRhcG9pbnREaWFsb2d8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgb25lIGFuZCBvbmx5IGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBEYXRhcG9pbnREaWFsb2dcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IERhdGFwb2ludERpYWxvZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVucyB0aGUgZGF0YXBvaW50IGRpYWxvZyB3aXRoIHRoZSBnaXZlbiBkaWFsb2cgdGl0bGUgYW5kIGZvb3RlciBjb250ZW50IChidXR0b25zIGZvciBhZGQsIHJlcGxhY2UsIGNsb3NlIG9yIGFwcGx5LCBjbG9zZSlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2RpYWxvZ1RpdGxlPVwiQWRkIGRhdGEgcG9pbnRzXCJdXHJcbiAgICAgKiBAcGFyYW0ge0Zvb3RlckNvbnRlbnRUeXBlfSBbZm9vdGVyQ29udGVudFR5cGU9Rm9vdGVyQ29udGVudFR5cGUuYWRkUmVwbGFjZUNsb3NlXVxyXG4gICAgICogQG1lbWJlcm9mIERhdGFwb2ludERpYWxvZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3BlbihkaWFsb2dUaXRsZTogc3RyaW5nID0gXCJBZGQgZGF0YSBwb2ludHNcIiwgZm9vdGVyQ29udGVudFR5cGU6IEZvb3RlckNvbnRlbnRUeXBlID0gRm9vdGVyQ29udGVudFR5cGUuYWRkUmVwbGFjZUNsb3NlKXtcclxuICAgICAgICAvLyBTZXQgZGlhbG9nIHRpdGxlXHJcbiAgICAgICAgJCh0aGlzLl9kaWFsb2dJZCkuZWpEaWFsb2coe3RpdGxlOiBkaWFsb2dUaXRsZSB9KTtcclxuICAgICAgICB0aGlzLmNyZWF0ZURpYWxvZyhkaWFsb2dUaXRsZSk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb250ZW50T2ZEaWFsb2coKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGZvb3RlciBvZiB0aGUgZGlhbG9nXHJcbiAgICAgICAgdGhpcy5jcmVhdGVGb290ZXJPZkRpYWxvZyhmb290ZXJDb250ZW50VHlwZSk7XHJcblxyXG4gICAgICAgIHZhciBpc09wZW4gPSAkKHRoaXMuX2RpYWxvZ0lkKS5lakRpYWxvZyhcImlzT3BlblwiKTtcclxuICAgICAgICBpZighaXNPcGVuKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0RpYWxvZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyB0aGUgZGlhbG9nXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIERhdGFwb2ludERpYWxvZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvc2UoKXtcclxuICAgICAgICAkKHRoaXMuX2RpYWxvZ0lkKS5lakRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgIHZhciB0cmVlR3JpZE9iaiA9ICQoXCIjXCIrIHRoaXMuX2RhdGFQb2ludENvbnRlbnRJZCkuZGF0YShcImVqVHJlZUdyaWRcIik7XHJcbiAgICAgICAgdHJlZUdyaWRPYmouZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgYXZhaWxhYmxlIGRhdGFwb2ludHMgaW4gdGhlIGRpYWxvZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIERhdGFwb2ludERpYWxvZ1xyXG4gICAgICovXHJcbiAgICAgcHVibGljIHNldERhdGFwb2ludHMoZGF0YTogQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPil7XHJcbiAgICAgICAgdGhpcy5fZGF0YVBvaW50c0RhdGEgPSBuZXcgQXJyYXk8YW55PigpOyBcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludEluZm8gPSBkYXRhW2ldIGFzIFRyYWNlRGF0YVBvaW50SW5mbztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYXRhUG9pbnRDb21wb25lbnQgPSB0aGlzLl9kYXRhUG9pbnRzRGF0YS5maWx0ZXIoZWxlID0+IGVsZS5zb3VyY2VOYW1lID09IGRhdGFQb2ludEluZm8uY29tcG9uZW50TmFtZSlbMF07XHJcbiAgICAgICAgICAgIGlmKGRhdGFQb2ludENvbXBvbmVudCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgZGF0YVBvaW50Q29tcG9uZW50ID0gbmV3IERhdGFQb2ludENvbXBvbmVudChkYXRhUG9pbnRJbmZvLmNvbXBvbmVudE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVBvaW50c0RhdGEucHVzaChkYXRhUG9pbnRDb21wb25lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgY2F0ZWdvcnlOYW1lID0gdGhpcy5nZXREYXRhUG9pbnRDYXRlZ29yeU5hbWUoZGF0YVBvaW50SW5mby5uYW1lc3BhY2UpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludENhdGVnb3J5ID0gZGF0YVBvaW50Q29tcG9uZW50LmNoaWxkcy5maWx0ZXIoZWxlID0+IGVsZS5zb3VyY2VOYW1lID09IGNhdGVnb3J5TmFtZSlbMF07XHJcbiAgICAgICAgICAgIGlmKGRhdGFQb2ludENhdGVnb3J5ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRhdGFQb2ludENhdGVnb3J5ID0gbmV3IERhdGFQb2ludENhdGVnb3J5KGNhdGVnb3J5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhUG9pbnRDb21wb25lbnQuY2hpbGRzLnB1c2goZGF0YVBvaW50Q2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRhUG9pbnRDYXRlZ29yeS5jaGlsZHMucHVzaChuZXcgRGF0YVBvaW50KGRhdGFQb2ludEluZm8pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVUcmVlR3JpZCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGF0YXBvaW50RGlhbG9nXHJcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXBvaW50RGlhbG9nXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBsZXQgZGF0YXBvaW50RGlhbG9nSWQgPSBcIkNvbW1vbkRhdGFwb2ludERpYWxvZ1wiO1xyXG4gICAgICAgIC8vIEFkZCB0byByb290ID0+IGdldCB0aGUgcGFnZSBib2R5XHJcbiAgICAgICAgdmFyIHBhZ2VCb2R5ID0gJChcImJvZHlcIik7XHJcbiAgICAgICAgcGFnZUJvZHkuYXBwZW5kKFwiPGRpdiBpZD0nXCIgKyBkYXRhcG9pbnREaWFsb2dJZCArIFwiJz48Lz5cIik7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKGRhdGFwb2ludERpYWxvZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBEYXRhcG9pbnQgZGlhbG9nIHdpdGggdGhlIGdpdmVuIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaWFsb2dJZFxyXG4gICAgICogQG1lbWJlcm9mIERhdGFwb2ludERpYWxvZ1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemUoZGlhbG9nSWQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fZGlhbG9nSWQgPSBcIiNcIiArIGRpYWxvZ0lkO1xyXG4gICAgICAgIHRoaXMuX2RhdGFQb2ludENvbnRlbnRJZCA9IGRpYWxvZ0lkICsgXCJfQ29udGVudFJvb3RcIjtcclxuICAgICAgICB0aGlzLl9kYXRhUG9pbnRGb290ZXJJZCA9IGRpYWxvZ0lkICsgXCJfRm9vdGVyXCI7XHJcbiAgICAgICAgdGhpcy5fZGF0YVBvaW50Rm9vdGVyU2NyaXB0SWQgPSBkaWFsb2dJZCArIFwiX0Zvb3RlclNjcmlwdFwiO1xyXG4gICAgICAgIC8vIEFkZCBjb250ZW50IGRpdlxyXG4gICAgICAgICQodGhpcy5fZGlhbG9nSWQpLmFwcGVuZChcIjxkaXYgaWQ9J1wiKyB0aGlzLl9kYXRhUG9pbnRDb250ZW50SWQgKyBcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBmb290ZXIgZGl2XHJcbiAgICAgICAgJCh0aGlzLl9kaWFsb2dJZCkuYXBwZW5kKGA8c2NyaXB0IGlkPVwiYCArIHRoaXMuX2RhdGFQb2ludEZvb3RlclNjcmlwdElkICsgYFwiIHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIj5cclxuICAgICAgICA8ZGl2IGlkPVwiYCsgdGhpcy5fZGF0YVBvaW50Rm9vdGVySWQgK2BcIiBzdHlsZT1cInBhZGRpbmctbGVmdDoxMHB4OyBwYWRkaW5nLXRvcDogNXB4XCI+PC9kaXY+XHJcbiAgICAgICAgPC9zY3JpcHQ+YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjYXRlZ29yeSBuYW1lIGZvciB0aGUgZ2l2ZW4gbmFtZXNwYWNlIG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBuYW1lc3BhY2VOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERhdGFwb2ludERpYWxvZ1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERhdGFQb2ludENhdGVnb3J5TmFtZShuYW1lc3BhY2VOYW1lKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgY2F0ZWdvcnlOYW1lID0gbmFtZXNwYWNlTmFtZTtcclxuICAgICAgICBpZihuYW1lc3BhY2VOYW1lID09IFwiKkFDUFwiKXtcclxuICAgICAgICAgICAgY2F0ZWdvcnlOYW1lID0gXCJIYXJkd2FyZTogQUNPUE9TXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYobmFtZXNwYWNlTmFtZSA9PSBcIipERFBcIiB8fCBuYW1lc3BhY2VOYW1lID09IFwiKlRSS1wiKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhdGVnb3J5TmFtZSA9IFwiQ29tcG9uZW50IG9uIFBMQ1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2F0ZWdvcnlOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgZGlhbG9nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaWFsb2dUaXRsZVxyXG4gICAgICogQG1lbWJlcm9mIERhdGFwb2ludERpYWxvZ1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURpYWxvZyhkaWFsb2dUaXRsZTogc3RyaW5nKXtcclxuICAgICAgICAkKHRoaXMuX2RpYWxvZ0lkKS5lakRpYWxvZyh7XHJcbiAgICAgICAgICAgIGFjdGlvbkJ1dHRvbnM6IFtcImNsb3NlXCJdLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiNjc1cHhcIixcclxuICAgICAgICAgICAgd2lkdGg6IFwiNTMwcHhcIixcclxuICAgICAgICAgICAgdGl0bGU6IGRpYWxvZ1RpdGxlLFxyXG4gICAgICAgICAgICByZXNpemU6IChhcmdzKSA9PiB0aGlzLnJlc2l6ZShhcmdzKSxcclxuICAgICAgICAgICAgZW5hYmxlTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNob3dGb290ZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGZvb3RlclRlbXBsYXRlSWQ6IHRoaXMuX2RhdGFQb2ludEZvb3RlclNjcmlwdElkLFxyXG4gICAgICAgICAgICBjbG9zZTogKGFyZ3MpID0+IHRoaXMub25EaWFsb2dDbG9zZWQoKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZXMgdGhlIGRpYWxvZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBEYXRhcG9pbnREaWFsb2dcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNpemUoYXJncyl7XHJcbiAgICAgICAgLy8gU2V0IHRyZWVncmlkIHNpemUgdG8gdGhlIERpYWxvZyBzaXplXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsRGlhbG9nSGVpZ2h0ID0gPG51bWJlcj5hcmdzLm1vZGVsIS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsRGlhbG9nV2lkdGggPSA8bnVtYmVyPmFyZ3MubW9kZWwhLndpZHRoO1xyXG4gICAgICAgIHZhciB0cmVlR3JpZE9iaiA9ICQoXCIjXCIrIHRoaXMuX2RhdGFQb2ludENvbnRlbnRJZCkuZGF0YShcImVqVHJlZUdyaWRcIiksXHJcbiAgICAgICAgICAgIHNpemVTZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLl9hY3R1YWxEaWFsb2dIZWlnaHQtMTA3LCB3aWR0aDogdGhpcy5fYWN0dWFsRGlhbG9nV2lkdGgtMzAsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodHJlZUdyaWRPYmope1xyXG4gICAgICAgICAgICB0cmVlR3JpZE9iai5vcHRpb24oXCJzaXplU2V0dGluZ3NcIiwgc2l6ZVNldHRpbmdzLCB0cnVlKTsgLy8gZm9yY2UgdGhlIHNldHRpbmcgdG8gcmVzaXplIHRoZSB0cmVlZ3JpZCBjb3JyZWN0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgdGhlIGRpYWxvZyB3aXRoIGN1cnJlbnQgZGVmaW5lZCBzaXplIChfYWN0dWFsRGlhbG9nSGVpZ2h0LCBfYWN0dWFsRGlhbG9nV2lkdGgpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBEYXRhcG9pbnREaWFsb2dcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG93RGlhbG9nKCl7XHJcbiAgICAgICAgJCh0aGlzLl9kaWFsb2dJZCkuZWpEaWFsb2coXCJvcGVuXCIpO1xyXG4gICAgICAgIHZhciB0cmVlR3JpZE9iaiA9ICQoXCIjXCIrIHRoaXMuX2RhdGFQb2ludENvbnRlbnRJZCkuZGF0YShcImVqVHJlZUdyaWRcIiksXHJcbiAgICAgICAgICAgIHNpemVTZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLl9hY3R1YWxEaWFsb2dIZWlnaHQtMTA3LCB3aWR0aDogdGhpcy5fYWN0dWFsRGlhbG9nV2lkdGgtMzAsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodHJlZUdyaWRPYmope1xyXG4gICAgICAgICAgICB0cmVlR3JpZE9iai5vcHRpb24oXCJzaXplU2V0dGluZ3NcIiwgc2l6ZVNldHRpbmdzLCB0cnVlKTsgLy8gZm9yY2UgdGhlIHNldHRpbmcgdG8gcmVzaXplIHRoZSB0cmVlZ3JpZCBjb3JyZWN0XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQodGhpcy5fZGlhbG9nSWQpLmVqRGlhbG9nKHtoZWlnaHQ6IHRoaXMuX2FjdHVhbERpYWxvZ0hlaWdodCB9KTtcclxuICAgICAgICAkKHRoaXMuX2RpYWxvZ0lkKS5lakRpYWxvZyh7d2lkdGg6IHRoaXMuX2FjdHVhbERpYWxvZ1dpZHRoIH0pO1xyXG4gICAgICAgICQodGhpcy5fZGlhbG9nSWQpLmVqRGlhbG9nKFwicmVmcmVzaFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbnRlbnQgb2YgdGhlIGRpYWxvZyAoVHJlZUdyaWQgd2l0aCBkYXRhcG9pbnRzKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXBvaW50RGlhbG9nXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29udGVudE9mRGlhbG9nKCl7XHJcbiAgICAgICAgKDxhbnk+JChcIiNcIisgdGhpcy5fZGF0YVBvaW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwic291cmNlTmFtZVwiLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgd2lkdGg6IDIyMH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsIGhlYWRlclRleHQ6IFwiRGVzY3JpcHRpb25cIiwgd2lkdGg6IDMwMH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRhdGFQb2ludE5hbWVcIiwgaGVhZGVyVGV4dDogXCJEYXRhIHBvaW50XCIsIHdpZHRoOiAzMDB9LFxyXG4gICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGVuYWJsZVZpcnR1YWxpemF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLk5vcm1hbCB9LFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHsgYWxsb3dEZWxldGluZyA6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgIGNoaWxkTWFwcGluZzpcImNoaWxkc1wiLFxyXG4gICAgICAgICAgICBleHBhbmRTdGF0ZU1hcHBpbmc6IFwiZXhwYW5kU3RhdGVcIixcclxuICAgICAgICAgICAgc2l6ZVNldHRpbmdzOiB7ICBoZWlnaHQ6IFwiNTcwcHhcIiwgd2lkdGg6IFwiNTAwcHhcIiB9LFxyXG4gICAgICAgICAgICByZWNvcmREb3VibGVDbGljazogKGFyZ3MpID0+IHRoaXMub25BZGREYXRhcG9pbnQoYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0sIERhdGFwb2ludEFjdGlvbi5hZGQpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVHJlZUdyaWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGZvb3RlciBjb250ZW50KEFkZCBvciBBcHBseSBidXR0b25zKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Zvb3RlckNvbnRlbnRUeXBlfSBmb290ZXJDb250ZW50VHlwZVxyXG4gICAgICogQG1lbWJlcm9mIERhdGFwb2ludERpYWxvZ1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUZvb3Rlck9mRGlhbG9nKGZvb3RlckNvbnRlbnRUeXBlOiBGb290ZXJDb250ZW50VHlwZSl7XHJcbiAgICAgICAgLy8gUmVzZXQgZm9vdGVyIGNvbnRlbnRcclxuICAgICAgICAkKFwiI1wiICsgdGhpcy5fZGF0YVBvaW50Rm9vdGVySWQpWzBdLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBmb290ZXIgY29udGVudFxyXG4gICAgICAgIGlmKGZvb3RlckNvbnRlbnRUeXBlID09IEZvb3RlckNvbnRlbnRUeXBlLmFwcGx5Q2xvc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFwcGx5Q2xvc2VGb290ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBZGRSZXBsYWNlQ2xvc2VGb290ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBBcHBseS9DbG9zZSBidXR0b25zIGluIHRoZSBmb290ZXIgY29udGVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXBvaW50RGlhbG9nXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQXBwbHlDbG9zZUZvb3Rlcigpe1xyXG4gICAgICAgICQoXCIjXCIgKyB0aGlzLl9kYXRhUG9pbnRGb290ZXJJZCkuYXBwZW5kKCc8ZGl2IGlkPVwicmVwbGFjZUJ1dHRvblwiPjwvZGl2PiZuYnNwOyZuYnNwOyZuYnNwOzxkaXYgaWQ9XCJjbG9zZUJ1dHRvblwiPjwvZGl2PicpO1xyXG4gICAgICAgICg8YW55PiQoXCIjcmVwbGFjZUJ1dHRvblwiKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiBcIkFwcGx5XCIsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyZWVncmlkT2JqID0gJChcIiNcIisgdGhpcy5fZGF0YVBvaW50Q29udGVudElkKS5kYXRhKFwiZWpUcmVlR3JpZFwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSAoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkFkZERhdGFwb2ludChzZWxlY3RlZEl0ZW0sIERhdGFwb2ludEFjdGlvbi5yZXBsYWNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICg8YW55PiQoXCIjY2xvc2VCdXR0b25cIikpLmVqQnV0dG9uKHtcclxuICAgICAgICAgICAgdGV4dDogXCJDbG9zZVwiLFxyXG4gICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHsgdGhpcy5jbG9zZSgpOyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBBZGQvUmVwbGFjZS9DbG9zZSBidXR0b25zIGluIHRoZSBmb290ZXIgY29udGVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXBvaW50RGlhbG9nXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQWRkUmVwbGFjZUNsb3NlRm9vdGVyKCl7XHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMuX2RhdGFQb2ludEZvb3RlcklkKS5hcHBlbmQoJzxkaXYgaWQ9XCJhZGRCdXR0b25cIj48L2Rpdj4mbmJzcDsmbmJzcDsmbmJzcDs8ZGl2IGlkPVwicmVwbGFjZUJ1dHRvblwiPjwvZGl2PiZuYnNwOyZuYnNwOyZuYnNwOzxkaXYgaWQ9XCJjbG9zZUJ1dHRvblwiPjwvZGl2PicpO1xyXG4gICAgICAgICg8YW55PiQoXCIjYWRkQnV0dG9uXCIpKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiQWRkXCIsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyZWVncmlkT2JqID0gJChcIiNcIisgdGhpcy5fZGF0YVBvaW50Q29udGVudElkKS5kYXRhKFwiZWpUcmVlR3JpZFwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSAoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkFkZERhdGFwb2ludChzZWxlY3RlZEl0ZW0sIERhdGFwb2ludEFjdGlvbi5hZGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICg8YW55PiQoXCIjcmVwbGFjZUJ1dHRvblwiKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiBcIlJlcGxhY2VcIixcclxuICAgICAgICAgICAgY2xpY2s6IChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJlZWdyaWRPYmogPSAkKFwiI1wiKyB0aGlzLl9kYXRhUG9pbnRDb250ZW50SWQpLmRhdGEoXCJlalRyZWVHcmlkXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9ICg8YW55PnRyZWVncmlkT2JqLm1vZGVsKS5zZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWRkRGF0YXBvaW50KHNlbGVjdGVkSXRlbSwgRGF0YXBvaW50QWN0aW9uLnJlcGxhY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgKDxhbnk+JChcIiNjbG9zZUJ1dHRvblwiKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiBcIkNsb3NlXCIsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4geyB0aGlzLmNsb3NlKCk7IH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRhdGFwb2ludHMgaW4gdGhlIHRyZWVncmlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBEYXRhcG9pbnREaWFsb2dcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUcmVlR3JpZCgpe1xyXG4gICAgICAgIHZhciB0cmVlZ3JpZE9iaiA9ICQoXCIjXCIrIHRoaXMuX2RhdGFQb2ludENvbnRlbnRJZCkuZGF0YShcImVqVHJlZUdyaWRcIik7XHJcbiAgICAgICAgaWYodHJlZWdyaWRPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gcmVmcmVzaCBUcmVlR3JpZCB3aXRoIG5ldyBkYXRhc291cmNlIGlmIHRyZWUgZ3JpZCBpcyBhbHJlYWR5IGF2YWlsYWJsZVxyXG4gICAgICAgICAgICB0cmVlZ3JpZE9iai5zZXRNb2RlbCh7XCJkYXRhU291cmNlXCIgOiB0aGlzLl9kYXRhUG9pbnRzRGF0YSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VzIHRoZSBhZGREYXRhcG9pbnQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtEYXRhUG9pbnR9IGRhdGFwb2ludFxyXG4gICAgICogQHBhcmFtIHtEYXRhcG9pbnRBY3Rpb259IGFjdGlvblxyXG4gICAgICogQG1lbWJlcm9mIERhdGFwb2ludERpYWxvZ1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQWRkRGF0YXBvaW50KGRhdGFwb2ludDogRGF0YVBvaW50LCBhY3Rpb246IERhdGFwb2ludEFjdGlvbikge1xyXG4gICAgICAgIGlmKGRhdGFwb2ludC5kYXRhUG9pbnROYW1lICE9IHVuZGVmaW5lZCAmJiBkYXRhcG9pbnQuZGF0YVBvaW50TmFtZSAhPSBcIlwiICYmIGRhdGFwb2ludC5kYXRhUG9pbnRJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnREYXRhcG9pbnRBcmdzKHRoaXMsIGFjdGlvbiwgZGF0YXBvaW50LmRhdGFQb2ludEluZm8pXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZGREYXRhcG9pbnQucmFpc2UobnVsbCwgZXZlbnRBcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIGRpYWxvZ0Nsb3NlZCBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXBvaW50RGlhbG9nXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EaWFsb2dDbG9zZWQoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudERpYWxvZ0Nsb3NlZC5yYWlzZShudWxsLCBudWxsKTtcclxuICAgIH1cclxufVxyXG4iXX0=