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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigTriggerTreeGridToolbar", "./view/traceConfigTriggerTreeGridCellEditTemplate", "./view/traceConfigTriggerTreeGridCellEditEvents", "../../view/datapointDialog/datapointDialog", "./model/traceConfigTriggerDataModel", "./triggerDescriptionProvider", "./componentDefaultDefinition"], function (require, exports, treeGridWidgetBase_1, traceConfigTriggerTreeGridToolbar_1, traceConfigTriggerTreeGridCellEditTemplate_1, traceConfigTriggerTreeGridCellEditEvents_1, datapointDialog_1, traceConfigTriggerDataModel_1, triggerDescriptionProvider_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigTriggerWidget
     *
     * @class TraceConfigTriggerWidget
     * @extends {TreeGridWidgetBase}
     */
    var TraceConfigTriggerWidget = /** @class */ (function (_super) {
        __extends(TraceConfigTriggerWidget, _super);
        function TraceConfigTriggerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._addDataPointHandler = function (sender, args) { return _this.onAddDatapoint(sender, args); };
            _this._dialogClosedHandler = function (sender, args) { return _this.onDialogClosed(sender, args); };
            _this._availableTraceDataPoints = new Array();
            _this._actualTriggerConditionDescriptionId = 0;
            _this._dropDownListSelectionChangedHandler = function (sender, args) { return _this.onDropDownListSelectionChanged(sender, args); };
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        /**
         * Defines the height of the footer
         *
         * @returns {number}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.defineFooterHeight = function () {
            return 290;
        };
        TraceConfigTriggerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        TraceConfigTriggerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Trigger");
            this.updateFooterContent(0);
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 80);
        };
        /**
         * Updates and initializes the trace data points
         *
         * @private
         * @param {TraceDataPoint[]} traceDataPoints
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.initializeAvailableDataPoints = function (availableTraceDataPoints) {
            this._availableTraceDataPoints = availableTraceDataPoints;
            datapointDialog_1.DatapointDialog.getInstance().setDatapoints(this._availableTraceDataPoints);
        };
        /**
         * Updates and initializes the start triggers
         *
         * @private
         * @param {TraceStartTrigger[]} startTriggers
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.initializeTraceStartTriggerInfo = function (startTriggerInfo) {
            var traceConfigTriggerDataModel = new traceConfigTriggerDataModel_1.TraceConfigTriggerDataModel();
            traceConfigTriggerDataModel.initialize();
            this.dataModel = traceConfigTriggerDataModel;
            traceConfigTriggerDataModel.initData = startTriggerInfo;
        };
        TraceConfigTriggerWidget.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this._cellEditTemplate != undefined) {
                this._cellEditTemplate.eventSelectionChanged.detach(this._dropDownListSelectionChangedHandler);
            }
        };
        /** updates the footer content with the trigger description
         *
         * @param {number} triggerConditionId (e.g. 20 for IN_WINDOW; 30 for OUT_WINDOW; ...)
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.updateFooterContent = function (triggerConditionId) {
            if (this._actualTriggerConditionDescriptionId != triggerConditionId) {
                this._actualTriggerConditionDescriptionId = triggerConditionId;
                var htmlData = triggerDescriptionProvider_1.TriggerDescriptionProvider.getHtmlDescription(triggerConditionId);
                _super.prototype.setFooterContent.call(this, htmlData);
            }
        };
        /**
         * implements the model change handling
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @returns {*}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            this.refresh();
            // Set correct footer content 
            var treeGridObj = this.getTreeGridObject();
            var actualSelectedItem = treeGridObj.model.selectedItem;
            if (actualSelectedItem == undefined) {
                // get trigger condition of first trigger
                var conditionParameter = "StartTrigger1_Condition";
                var triggerConditionValue = this.getTriggerConditionValue(treeGridObj.model.dataSource, conditionParameter);
                this.updateFooterContent(triggerConditionValue);
            }
            else {
                this.updateFooterContentToSelectedItem(actualSelectedItem);
            }
        };
        TraceConfigTriggerWidget.prototype.updateFooterContentToSelectedItem = function (selectedItem) {
            var startTriggerGroup;
            if (selectedItem.level == 0) {
                // Rootnode selected
                startTriggerGroup = selectedItem;
            }
            else {
                // Parameter selected
                startTriggerGroup = selectedItem.parentItem;
            }
            if (startTriggerGroup != undefined) {
                // TODO: remove/change _startTriggerRef
                var triggerConditionValue = startTriggerGroup._startTriggerRef.condition;
                this.updateFooterContent(parseInt(triggerConditionValue, 10));
            }
        };
        /**
         * handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            this.refresh();
        };
        /** catches the add datapoint event from the datapoint dialog
         * => sets the selected datapoint to the actual selected trigger and closes the datapoint dialog
         *
         * @param {} sender
         * @param {EventDatapointArgs} args
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.onAddDatapoint = function (sender, args) {
            this.setDatapointNameToSelectedTrigger(args.dataPointInfo.fullname);
            datapointDialog_1.DatapointDialog.getInstance().close();
        };
        /** catches the dialog close event from the datapoint dialog
         * => detaches the dialog events
         *
         * @param {} sender
         * @param {} args
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.onDialogClosed = function (sender, args) {
            datapointDialog_1.DatapointDialog.getInstance().eventAddDatapoint.detach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.getInstance().eventDialogClosed.detach(this._dialogClosedHandler);
        };
        /** catches the dialog close event from the datapoint dialog
         * => detaches the dialog events
         *
         * @param {string} dataPointName
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.setDatapointNameToSelectedTrigger = function (dataPointName) {
            var treeGridObj = this.getTreeGridObject();
            var startTriggerItem;
            var actualSelectedItem = treeGridObj.model.selectedItem;
            if (actualSelectedItem != undefined) {
                if (actualSelectedItem.level == 0) {
                    startTriggerItem = actualSelectedItem;
                }
                else {
                    startTriggerItem = actualSelectedItem.parentItem;
                }
            }
            else {
                console.log("No start trigger selected!");
            }
            // Save cell bevor updating the datamodel to see the right data after update
            treeGridObj.saveCell();
            var dataPointNameParameter = startTriggerItem.item.childs.filter(function (triggerParameter) { return triggerParameter.id == "datapoint"; })[0];
            if (dataPointNameParameter != undefined) {
                dataPointNameParameter.displayValue = dataPointName;
                this.refresh();
                startTriggerItem.setValue(dataPointNameParameter, dataPointName);
            }
        };
        /** creates the tree grid for the trigger informations
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridCellEditSupport()), { childMapping: "childs", expandStateMapping: "expandState", expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); } }));
        };
        TraceConfigTriggerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridColumnDefinition = function () {
            this._cellEditTemplate = traceConfigTriggerTreeGridCellEditTemplate_1.TraceConfigTriggerTreeGridCellEditTemplate.createInstance();
            this._cellEditTemplate.eventSelectionChanged.attach(this._dropDownListSelectionChangedHandler);
            return {
                columns: [
                    { field: "displayName", headerText: "Name", width: "200" },
                    { field: "displayValue", headerText: "Value", width: "200", editType: "stringedit", editTemplate: this._cellEditTemplate }
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new traceConfigTriggerTreeGridToolbar_1.TraceConfigTriggerTreeGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridCellEditSupport = function () {
            var cellEditEvents = new traceConfigTriggerTreeGridCellEditEvents_1.TraceConfigTriggerTreeGridCellEditEvents();
            return {
                editSettings: { allowEditing: true },
                beginEdit: function (args) { return cellEditEvents.beginEdit(args); },
                endEdit: function (args) { return cellEditEvents.endEdit(args); },
            };
        };
        TraceConfigTriggerWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                this.deleteStartTriggers(args.deletedItems);
                args.cancel = true;
            }
        };
        TraceConfigTriggerWidget.prototype.treeGridActionComplete = function (args) {
            // Event trigger while changing datasource dynamically. 
            // code to done after the dynamic change of datasource. 
            if (args.requestType === 'refreshDataSource') {
                this.refreshSelection();
            }
        };
        TraceConfigTriggerWidget.prototype.treeGridRowSelected = function (args) {
            if (args.model.selectedItem != undefined) {
                this.updateFooterContentToSelectedItem(args.model.selectedItem);
                this.updateToolbarButtonStates(args.model.dataSource, args.model.selectedItem);
            }
        };
        TraceConfigTriggerWidget.prototype.addStartTrigger = function () {
            this.dataModel.addTrigger();
            this.refreshSelection();
            // Get actual selection item
            var treeObj = $(this.mainDiv).ejTreeGrid('instance');
            var selectedItem = treeObj.model.selectedItem;
            if (treeObj.model.selectedRowIndex == -1) {
                selectedItem = undefined;
            }
            this.updateToolbarButtonStates(treeObj.model.dataSource, selectedItem);
        };
        TraceConfigTriggerWidget.prototype.deleteStartTriggers = function (deleteItems) {
            var indexList = new Array();
            for (var i = deleteItems.length - 1; i >= 0; i--) {
                if (deleteItems[i].level == 0) {
                    // Only level 0 can be deleted (start trigger group, not single parameters of this group)
                    indexList.push(deleteItems[i].hierarchyRowIndex);
                }
            }
            if (indexList.length > 0) {
                this.dataModel.removeTriggers(indexList);
                this.refreshSelection();
                // Get actual selection item
                var treeObj = $(this.mainDiv).ejTreeGrid('instance');
                var selectedItem = treeObj.model.selectedItem;
                if (treeObj.model.selectedRowIndex == -1) {
                    selectedItem = undefined;
                }
                this.updateToolbarButtonStates(treeObj.model.dataSource, selectedItem);
            }
        };
        /**
         * opens the datapoint selection dialog and attaches to the dialog events
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.openDatapointDialog = function () {
            datapointDialog_1.DatapointDialog.getInstance().eventAddDatapoint.attach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.getInstance().eventDialogClosed.attach(this._dialogClosedHandler);
            datapointDialog_1.DatapointDialog.getInstance().open(TraceConfigTriggerWidget.selectDataPointDialogTitle, datapointDialog_1.FooterContentType.applyClose);
        };
        TraceConfigTriggerWidget.prototype.refreshSelection = function () {
            var treeObj = $(this.mainDiv).ejTreeGrid('instance');
            // Get actual selection index
            var actualSelectedRowIndex = treeObj.model.selectedRowIndex;
            if (actualSelectedRowIndex == -1) {
                // update toolbar buttons in case of no selected item
                this.updateToolbarButtonStates(treeObj.model.dataSource, undefined);
                return;
            }
            // Reset selection
            treeObj.model.selectedRowIndex = -1;
            // Set to last index if index is out of range
            if (actualSelectedRowIndex >= treeObj.model.flatRecords.length) {
                actualSelectedRowIndex = treeObj.model.flatRecords.length - 1;
            }
            // Set selection
            treeObj.model.selectedRowIndex = actualSelectedRowIndex;
            // update toolbar buttons with selected item
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.dataSource, treeObj.model.flatRecords[actualSelectedRowIndex].item);
            }
        };
        /**
         * Returns the trigger condition(e.g. 20 for IN_WINDOW; 30 for OUT_WINDOW; ...) for the given condition parameter id (e.g. StartTrigger1_Condition)
         *
         * @param {} dataSource
         * @param {string} conditionParameter
         * @returns {number}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTriggerConditionValue = function (dataSource, conditionParameter) {
            for (var i = 0; i < dataSource.length; i++) {
                var startTrigger = dataSource[i];
                for (var j = 0; j < startTrigger.childs.length; j++) {
                    var parameter = startTrigger.childs[j];
                    if (parameter.componentParameter.browseName == conditionParameter) {
                        return parseInt(parameter.componentParameter.value, 10);
                    }
                }
            }
            return 0;
        };
        /**
         * Refreshes trigger parameters tree grid with the current model data
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.refresh = function () {
            if (this.refreshEnabled) {
                this.setModel(this.dataModel.data);
            }
        };
        TraceConfigTriggerWidget.prototype.onDropDownListSelectionChanged = function (sender, args) {
            this.updateFooterContent(args.value);
        };
        TraceConfigTriggerWidget.prototype.updateToolbarButtonStates = function (startTriggers, selectedItem) {
            var toolbar = this._toolbar;
            // Set select trigger datapoint button state
            if (selectedItem == undefined) {
                toolbar.disableSelectTriggerDataPointButton(true);
            }
            else {
                toolbar.disableSelectTriggerDataPointButton(false);
            }
            // Set add trigger button state
            if (startTriggers.length > 1) {
                toolbar.disableAddButton(true);
            }
            else {
                toolbar.disableAddButton(false);
            }
            // Set remove trigger button state
            if (startTriggers.length == 0 || selectedItem == undefined || selectedItem.level > 0) {
                toolbar.disableRemoveButton(true);
            }
            else {
                toolbar.disableRemoveButton(false);
            }
        };
        TraceConfigTriggerWidget.selectDataPointDialogTitle = "Select data point";
        return TraceConfigTriggerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.TraceConfigTriggerWidget = TraceConfigTriggerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC90cmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZUE7Ozs7O09BS0c7SUFDSDtRQUF1Qyw0Q0FBa0I7UUFBekQ7WUFBQSxxRUEwY0M7WUF4Y1csMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFDdkUsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFFdkUsK0JBQXlCLEdBQXlCLElBQUksS0FBSyxFQUFzQixDQUFDO1lBR2xGLDBDQUFvQyxHQUFHLENBQUMsQ0FBQztZQUl6QywwQ0FBb0MsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsOEJBQThCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFoRCxDQUFnRCxDQUFDOztRQThibkgsQ0FBQztRQTViRzs7Ozs7V0FLRztRQUNILHFEQUFrQixHQUFsQjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gscURBQWtCLEdBQWxCO1lBQ0ksT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO1FBRUQsc0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFp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QyxNQUFNLEdBQUcsQ0FBQyxFQUFDO2dCQUN4QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEM7aUJBQ0c7Z0JBQ0EsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25DO1lBRUQsa0NBQWtDO1lBQ2xDLElBQUcsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLFNBQVMsSUFBSSxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBQztnQkFDaEYsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JDO2lCQUNHO2dCQUNBLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QztRQUNMLENBQUM7UUEvYk0sbURBQTBCLEdBQUcsbUJBQW1CLENBQUM7UUFnYzVELCtCQUFDO0tBQUEsQUExY0QsQ0FBdUMsdUNBQWtCLEdBMGN4RDtJQUVRLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElEYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdEV2ZW50cyB9IGZyb20gXCIuL3ZpZXcvdHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdEV2ZW50c1wiO1xyXG5pbXBvcnQgeyBEYXRhcG9pbnREaWFsb2csIEZvb3RlckNvbnRlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL3ZpZXcvZGF0YXBvaW50RGlhbG9nL2RhdGFwb2ludERpYWxvZ1wiO1xyXG5pbXBvcnQgeyBFdmVudERhdGFwb2ludEFyZ3MgfSBmcm9tIFwiLi4vLi4vdmlldy9kYXRhcG9pbnREaWFsb2cvZXZlbnREYXRhcG9pbnRBcmdzXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL3RyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvdHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyaWdnZXJEZXNjcmlwdGlvblByb3ZpZGVyIH0gZnJvbSBcIi4vdHJpZ2dlckRlc2NyaXB0aW9uUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBUcmFjZVN0YXJ0VHJpZ2dlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VTdGFydFRyaWdnZXJcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2V7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWRkRGF0YVBvaW50SGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25BZGREYXRhcG9pbnQoc2VuZGVyLGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfZGlhbG9nQ2xvc2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25EaWFsb2dDbG9zZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIHByaXZhdGUgX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50czogVHJhY2VEYXRhUG9pbnRJbmZvW10gPSBuZXcgQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPigpO1xyXG5cclxuICAgIHByaXZhdGUgX2NlbGxFZGl0VGVtcGxhdGU7XHJcbiAgICBwcml2YXRlIF9hY3R1YWxUcmlnZ2VyQ29uZGl0aW9uRGVzY3JpcHRpb25JZCA9IDA7XHJcblxyXG4gICAgc3RhdGljIHNlbGVjdERhdGFQb2ludERpYWxvZ1RpdGxlID0gXCJTZWxlY3QgZGF0YSBwb2ludFwiO1xyXG5cclxuICAgIHByaXZhdGUgX2Ryb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkRyb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWZpbmVIZWFkZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGhlaWdodCBvZiB0aGUgZm9vdGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lRm9vdGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMjkwO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcblxyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQoXCJUcmlnZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRm9vdGVyQ29udGVudCgwKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigxLCA4MCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIHRyYWNlIGRhdGEgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhY2VEYXRhUG9pbnRbXX0gdHJhY2VEYXRhUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUF2YWlsYWJsZURhdGFQb2ludHMoYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOlRyYWNlRGF0YVBvaW50SW5mb1tdKXtcclxuICAgICAgICB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMgPSBhdmFpbGFibGVUcmFjZURhdGFQb2ludHM7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmdldEluc3RhbmNlKCkuc2V0RGF0YXBvaW50cyh0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgYW5kIGluaXRpYWxpemVzIHRoZSBzdGFydCB0cmlnZ2Vyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlU3RhcnRUcmlnZ2VyW119IHN0YXJ0VHJpZ2dlcnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplVHJhY2VTdGFydFRyaWdnZXJJbmZvKHN0YXJ0VHJpZ2dlckluZm86IHsgZGF0YTpUcmFjZVN0YXJ0VHJpZ2dlcltdICwgaW5mbzpNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSl7XHJcbiAgICAgICAgbGV0IHRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbCA9IG5ldyBUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWwoKSBhcyBJVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIHRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbC5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSB0cmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWw7XHJcbiAgICAgICAgdHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsLmluaXREYXRhID0gc3RhcnRUcmlnZ2VySW5mbztcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIGlmKHRoaXMuX2NlbGxFZGl0VGVtcGxhdGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY2VsbEVkaXRUZW1wbGF0ZS5ldmVudFNlbGVjdGlvbkNoYW5nZWQuZGV0YWNoKHRoaXMuX2Ryb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiB1cGRhdGVzIHRoZSBmb290ZXIgY29udGVudCB3aXRoIHRoZSB0cmlnZ2VyIGRlc2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRyaWdnZXJDb25kaXRpb25JZCAoZS5nLiAyMCBmb3IgSU5fV0lORE9XOyAzMCBmb3IgT1VUX1dJTkRPVzsgLi4uKVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlRm9vdGVyQ29udGVudCh0cmlnZ2VyQ29uZGl0aW9uSWQ6IG51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5fYWN0dWFsVHJpZ2dlckNvbmRpdGlvbkRlc2NyaXB0aW9uSWQgIT0gdHJpZ2dlckNvbmRpdGlvbklkKXtcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsVHJpZ2dlckNvbmRpdGlvbkRlc2NyaXB0aW9uSWQgPSB0cmlnZ2VyQ29uZGl0aW9uSWQ7XHJcbiAgICAgICAgICAgIGxldCBodG1sRGF0YSA9IFRyaWdnZXJEZXNjcmlwdGlvblByb3ZpZGVyLmdldEh0bWxEZXNjcmlwdGlvbih0cmlnZ2VyQ29uZGl0aW9uSWQpO1xyXG4gICAgICAgICAgICBzdXBlci5zZXRGb290ZXJDb250ZW50KGh0bWxEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIGltcGxlbWVudHMgdGhlIG1vZGVsIGNoYW5nZSBoYW5kbGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuXHJcbiAgICAgICAgIC8vIFNldCBjb3JyZWN0IGZvb3RlciBjb250ZW50IFxyXG4gICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgIGxldCBhY3R1YWxTZWxlY3RlZEl0ZW0gPSAoPGFueT50cmVlR3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICBpZihhY3R1YWxTZWxlY3RlZEl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgIC8vIGdldCB0cmlnZ2VyIGNvbmRpdGlvbiBvZiBmaXJzdCB0cmlnZ2VyXHJcbiAgICAgICAgICAgICBsZXQgY29uZGl0aW9uUGFyYW1ldGVyID0gXCJTdGFydFRyaWdnZXIxX0NvbmRpdGlvblwiO1xyXG4gICAgICAgICAgICAgbGV0IHRyaWdnZXJDb25kaXRpb25WYWx1ZSA9IHRoaXMuZ2V0VHJpZ2dlckNvbmRpdGlvblZhbHVlKHRyZWVHcmlkT2JqLm1vZGVsLmRhdGFTb3VyY2UsIGNvbmRpdGlvblBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvb3RlckNvbnRlbnQodHJpZ2dlckNvbmRpdGlvblZhbHVlKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvb3RlckNvbnRlbnRUb1NlbGVjdGVkSXRlbShhY3R1YWxTZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZUZvb3RlckNvbnRlbnRUb1NlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW0pe1xyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJHcm91cDtcclxuICAgICAgICBpZihzZWxlY3RlZEl0ZW0ubGV2ZWwgPT0gMCl7XHJcbiAgICAgICAgICAgIC8vIFJvb3Rub2RlIHNlbGVjdGVkXHJcbiAgICAgICAgICAgIHN0YXJ0VHJpZ2dlckdyb3VwID0gc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBQYXJhbWV0ZXIgc2VsZWN0ZWRcclxuICAgICAgICAgICAgc3RhcnRUcmlnZ2VyR3JvdXAgPSBzZWxlY3RlZEl0ZW0ucGFyZW50SXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RhcnRUcmlnZ2VyR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZlL2NoYW5nZSBfc3RhcnRUcmlnZ2VyUmVmXHJcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyQ29uZGl0aW9uVmFsdWUgPSBzdGFydFRyaWdnZXJHcm91cC5fc3RhcnRUcmlnZ2VyUmVmLmNvbmRpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDb250ZW50KHBhcnNlSW50KHRyaWdnZXJDb25kaXRpb25WYWx1ZSwgMTApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRoZSBjaGFuZ2VzIG9mIG9ic2VydmVkIGl0ZW1zIHJlcXVlc3RlZCBieSAnb2JzZXJ2ZURhdGFNb2RlbEl0ZW1zJ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNhdGNoZXMgdGhlIGFkZCBkYXRhcG9pbnQgZXZlbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICogPT4gc2V0cyB0aGUgc2VsZWN0ZWQgZGF0YXBvaW50IHRvIHRoZSBhY3R1YWwgc2VsZWN0ZWQgdHJpZ2dlciBhbmQgY2xvc2VzIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHt9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudERhdGFwb2ludEFyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkFkZERhdGFwb2ludChzZW5kZXIsIGFyZ3M6RXZlbnREYXRhcG9pbnRBcmdzKXtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldERhdGFwb2ludE5hbWVUb1NlbGVjdGVkVHJpZ2dlcihhcmdzLmRhdGFQb2ludEluZm8uZnVsbG5hbWUpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5nZXRJbnN0YW5jZSgpLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNhdGNoZXMgdGhlIGRpYWxvZyBjbG9zZSBldmVudCBmcm9tIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKiA9PiBkZXRhY2hlcyB0aGUgZGlhbG9nIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7fSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7fSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EaWFsb2dDbG9zZWQoc2VuZGVyLCBhcmdzKXtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZ2V0SW5zdGFuY2UoKS5ldmVudEFkZERhdGFwb2ludC5kZXRhY2godGhpcy5fYWRkRGF0YVBvaW50SGFuZGxlcik7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmdldEluc3RhbmNlKCkuZXZlbnREaWFsb2dDbG9zZWQuZGV0YWNoKHRoaXMuX2RpYWxvZ0Nsb3NlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjYXRjaGVzIHRoZSBkaWFsb2cgY2xvc2UgZXZlbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICogPT4gZGV0YWNoZXMgdGhlIGRpYWxvZyBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVBvaW50TmFtZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldERhdGFwb2ludE5hbWVUb1NlbGVjdGVkVHJpZ2dlcihkYXRhUG9pbnROYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VySXRlbTtcclxuICAgICAgICBsZXQgYWN0dWFsU2VsZWN0ZWRJdGVtID0gKDxhbnk+dHJlZUdyaWRPYmoubW9kZWwpLnNlbGVjdGVkSXRlbTtcclxuICAgICAgICBpZihhY3R1YWxTZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoYWN0dWFsU2VsZWN0ZWRJdGVtLmxldmVsID09IDApe1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUcmlnZ2VySXRlbSA9IGFjdHVhbFNlbGVjdGVkSXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUcmlnZ2VySXRlbSA9IGFjdHVhbFNlbGVjdGVkSXRlbS5wYXJlbnRJdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc3RhcnQgdHJpZ2dlciBzZWxlY3RlZCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTYXZlIGNlbGwgYmV2b3IgdXBkYXRpbmcgdGhlIGRhdGFtb2RlbCB0byBzZWUgdGhlIHJpZ2h0IGRhdGEgYWZ0ZXIgdXBkYXRlXHJcbiAgICAgICAgdHJlZUdyaWRPYmouc2F2ZUNlbGwoKTsgXHJcbiAgICAgICAgbGV0IGRhdGFQb2ludE5hbWVQYXJhbWV0ZXIgPSBzdGFydFRyaWdnZXJJdGVtLml0ZW0uY2hpbGRzLmZpbHRlcih0cmlnZ2VyUGFyYW1ldGVyICA9PiB7cmV0dXJuIHRyaWdnZXJQYXJhbWV0ZXIuaWQgPT0gXCJkYXRhcG9pbnRcIn0pWzBdO1xyXG4gICAgICAgIGlmKGRhdGFQb2ludE5hbWVQYXJhbWV0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZGF0YVBvaW50TmFtZVBhcmFtZXRlci5kaXNwbGF5VmFsdWUgPSBkYXRhUG9pbnROYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgc3RhcnRUcmlnZ2VySXRlbS5zZXRWYWx1ZShkYXRhUG9pbnROYW1lUGFyYW1ldGVyLCBkYXRhUG9pbnROYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIHRyaWdnZXIgaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpLFxyXG5cclxuICAgICAgICAgICAgY2hpbGRNYXBwaW5nOlwiY2hpbGRzXCIsXHJcbiAgICAgICAgICAgIGV4cGFuZFN0YXRlTWFwcGluZzogXCJleHBhbmRTdGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3MpLFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgICAgICBhY3Rpb25CZWdpbjogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKSxcclxuICAgICAgICAgICAgYWN0aW9uQ29tcGxldGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyksIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKXtcclxuICAgICAgICAvLyBSZWZyZXNoIHRvIHNlZSBjb3JyZWN0IGV4cGFuZGVkL2NvbGxhcHNlZCBpY29uXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICB0aGlzLl9jZWxsRWRpdFRlbXBsYXRlID0gVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLmNyZWF0ZUluc3RhbmNlKCk7XHJcbiAgICAgICAgdGhpcy5fY2VsbEVkaXRUZW1wbGF0ZS5ldmVudFNlbGVjdGlvbkNoYW5nZWQuYXR0YWNoKHRoaXMuX2Ryb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgd2lkdGg6IFwiMjAwXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5VmFsdWVcIiwgaGVhZGVyVGV4dDogXCJWYWx1ZVwiLCB3aWR0aDogXCIyMDBcIiwgZWRpdFR5cGU6IFwic3RyaW5nZWRpdFwiLCBlZGl0VGVtcGxhdGU6IHRoaXMuX2NlbGxFZGl0VGVtcGxhdGV9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gcmVzaXplIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRUb29sYmFyKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjZWxsIGVkaXQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCk6IHt9e1xyXG5cdFx0bGV0IGNlbGxFZGl0RXZlbnRzID0gbmV3IFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRFdmVudHMoKTtcclxuXHRcdHJldHVybiB7XHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0VkaXRpbmc6IHRydWUgfSxcclxuICAgICAgICAgICAgYmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzKSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKXtcclxuICAgICAgICAvLyBTdXBwb3J0IFwiRW50Zi9EZWxcIiBrZXlcclxuICAgICAgICBpZihhcmdzLnJlcXVlc3RUeXBlID09IFwiZGVsZXRlXCIpe1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVN0YXJ0VHJpZ2dlcnMoYXJncy5kZWxldGVkSXRlbXMpO1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRBY3Rpb25Db21wbGV0ZShhcmdzKXtcclxuICAgICAgICAvLyBFdmVudCB0cmlnZ2VyIHdoaWxlIGNoYW5naW5nIGRhdGFzb3VyY2UgZHluYW1pY2FsbHkuIFxyXG4gICAgICAgIC8vIGNvZGUgdG8gZG9uZSBhZnRlciB0aGUgZHluYW1pYyBjaGFuZ2Ugb2YgZGF0YXNvdXJjZS4gXHJcbiAgICAgICAgaWYgKGFyZ3MucmVxdWVzdFR5cGUgPT09ICdyZWZyZXNoRGF0YVNvdXJjZScpIHsgXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFNlbGVjdGlvbigpO1x0XHRcdFx0XHRcdFxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9vdGVyQ29udGVudFRvU2VsZWN0ZWRJdGVtKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGFyZ3MubW9kZWwuZGF0YVNvdXJjZSwgYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkU3RhcnRUcmlnZ2VyKCl7XHJcbiAgICAgICAgKDxJVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5hZGRUcmlnZ2VyKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaFNlbGVjdGlvbigpO1xyXG5cclxuICAgICAgICAvLyBHZXQgYWN0dWFsIHNlbGVjdGlvbiBpdGVtXHJcbiAgICAgICAgY29uc3QgdHJlZU9iaiA9ICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKCdpbnN0YW5jZScpOyBcclxuICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdHJlZU9iai5tb2RlbC5zZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgaWYoIHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9PSAtMSl7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKHRyZWVPYmoubW9kZWwuZGF0YVNvdXJjZSwgc2VsZWN0ZWRJdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVsZXRlU3RhcnRUcmlnZ2VycyhkZWxldGVJdGVtcyl7XHJcbiAgICAgICAgbGV0IGluZGV4TGlzdCA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPWRlbGV0ZUl0ZW1zLmxlbmd0aC0xOyBpID49IDA7IGktLSl7XHJcbiAgICAgICAgICAgIGlmKGRlbGV0ZUl0ZW1zW2ldLmxldmVsID09IDApe1xyXG4gICAgICAgICAgICAgICAgLy8gT25seSBsZXZlbCAwIGNhbiBiZSBkZWxldGVkIChzdGFydCB0cmlnZ2VyIGdyb3VwLCBub3Qgc2luZ2xlIHBhcmFtZXRlcnMgb2YgdGhpcyBncm91cClcclxuICAgICAgICAgICAgICAgIGluZGV4TGlzdC5wdXNoKGRlbGV0ZUl0ZW1zW2ldLmhpZXJhcmNoeVJvd0luZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmRleExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICg8SVRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkucmVtb3ZlVHJpZ2dlcnMoaW5kZXhMaXN0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gR2V0IGFjdHVhbCBzZWxlY3Rpb24gaXRlbVxyXG4gICAgICAgICAgICBjb25zdCB0cmVlT2JqID0gJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoJ2luc3RhbmNlJyk7IFxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdHJlZU9iai5tb2RlbC5zZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgICAgIGlmKCB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmRhdGFTb3VyY2UsIHNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogb3BlbnMgdGhlIGRhdGFwb2ludCBzZWxlY3Rpb24gZGlhbG9nIGFuZCBhdHRhY2hlcyB0byB0aGUgZGlhbG9nIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9wZW5EYXRhcG9pbnREaWFsb2coKXtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZ2V0SW5zdGFuY2UoKS5ldmVudEFkZERhdGFwb2ludC5hdHRhY2godGhpcy5fYWRkRGF0YVBvaW50SGFuZGxlcik7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmdldEluc3RhbmNlKCkuZXZlbnREaWFsb2dDbG9zZWQuYXR0YWNoKHRoaXMuX2RpYWxvZ0Nsb3NlZEhhbmRsZXIpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5nZXRJbnN0YW5jZSgpLm9wZW4oVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0LnNlbGVjdERhdGFQb2ludERpYWxvZ1RpdGxlLCBGb290ZXJDb250ZW50VHlwZS5hcHBseUNsb3NlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hTZWxlY3Rpb24oKXtcclxuXHRcdGNvbnN0IHRyZWVPYmogPSAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCgnaW5zdGFuY2UnKTsgXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0Ly8gR2V0IGFjdHVhbCBzZWxlY3Rpb24gaW5kZXhcclxuICAgICAgICBsZXQgYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9IHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleDtcclxuICAgICAgICBpZiAoYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9PSAtMSl7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMgaW4gY2FzZSBvZiBubyBzZWxlY3RlZCBpdGVtXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmRhdGFTb3VyY2UsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG5cdFx0Ly8gUmVzZXQgc2VsZWN0aW9uXHJcblx0XHR0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPSAtMTtcclxuXHRcdFxyXG5cdFx0Ly8gU2V0IHRvIGxhc3QgaW5kZXggaWYgaW5kZXggaXMgb3V0IG9mIHJhbmdlXHJcblx0XHRpZihhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID49IHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoKXtcclxuXHRcdFx0YWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9IHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cdFx0Ly8gU2V0IHNlbGVjdGlvblxyXG5cdFx0dHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID0gYWN0dWFsU2VsZWN0ZWRSb3dJbmRleDtcclxuXHRcdFxyXG5cdFx0Ly8gdXBkYXRlIHRvb2xiYXIgYnV0dG9ucyB3aXRoIHNlbGVjdGVkIGl0ZW1cclxuXHRcdGlmKHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHNbYWN0dWFsU2VsZWN0ZWRSb3dJbmRleF0gIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0dGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKHRyZWVPYmoubW9kZWwuZGF0YVNvdXJjZSwgdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkc1thY3R1YWxTZWxlY3RlZFJvd0luZGV4XS5pdGVtKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmlnZ2VyIGNvbmRpdGlvbihlLmcuIDIwIGZvciBJTl9XSU5ET1c7IDMwIGZvciBPVVRfV0lORE9XOyAuLi4pIGZvciB0aGUgZ2l2ZW4gY29uZGl0aW9uIHBhcmFtZXRlciBpZCAoZS5nLiBTdGFydFRyaWdnZXIxX0NvbmRpdGlvbilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge30gZGF0YVNvdXJjZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbmRpdGlvblBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmlnZ2VyQ29uZGl0aW9uVmFsdWUoZGF0YVNvdXJjZSwgY29uZGl0aW9uUGFyYW1ldGVyOiBzdHJpbmcpOiBudW1iZXJ7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBkYXRhU291cmNlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0ICBzdGFydFRyaWdnZXIgPSBkYXRhU291cmNlW2ldO1xyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IHN0YXJ0VHJpZ2dlci5jaGlsZHMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtZXRlciA9IHN0YXJ0VHJpZ2dlci5jaGlsZHNbal07XHJcbiAgICAgICAgICAgICAgICBpZihwYXJhbWV0ZXIuY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWUgPT0gY29uZGl0aW9uUGFyYW1ldGVyKXtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChwYXJhbWV0ZXIuY29tcG9uZW50UGFyYW1ldGVyLnZhbHVlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoZXMgdHJpZ2dlciBwYXJhbWV0ZXJzIHRyZWUgZ3JpZCB3aXRoIHRoZSBjdXJyZW50IG1vZGVsIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWZyZXNoKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlZnJlc2hFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZWwodGhpcy5kYXRhTW9kZWwuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICBcclxuICAgIHByaXZhdGUgb25Ecm9wRG93bkxpc3RTZWxlY3Rpb25DaGFuZ2VkKHNlbmRlcixhcmdzKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZvb3RlckNvbnRlbnQoYXJncy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKHN0YXJ0VHJpZ2dlcnM6IEFycmF5PGFueT4sIHNlbGVjdGVkSXRlbSl7XHJcbiAgICAgICAgbGV0IHRvb2xiYXIgPSB0aGlzLl90b29sYmFyIGFzIFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkVG9vbGJhcjtcclxuICAgICAgICAvLyBTZXQgc2VsZWN0IHRyaWdnZXIgZGF0YXBvaW50IGJ1dHRvbiBzdGF0ZVxyXG4gICAgICAgIGlmKHNlbGVjdGVkSXRlbSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0b29sYmFyLmRpc2FibGVTZWxlY3RUcmlnZ2VyRGF0YVBvaW50QnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0b29sYmFyLmRpc2FibGVTZWxlY3RUcmlnZ2VyRGF0YVBvaW50QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGFkZCB0cmlnZ2VyIGJ1dHRvbiBzdGF0ZVxyXG4gICAgICAgIGlmKHN0YXJ0VHJpZ2dlcnMubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHRvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCByZW1vdmUgdHJpZ2dlciBidXR0b24gc3RhdGVcclxuICAgICAgICBpZihzdGFydFRyaWdnZXJzLmxlbmd0aCA9PSAwIHx8IHNlbGVjdGVkSXRlbSA9PSB1bmRlZmluZWQgfHwgc2VsZWN0ZWRJdGVtLmxldmVsID4gMCl7XHJcbiAgICAgICAgICAgIHRvb2xiYXIuZGlzYWJsZVJlbW92ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdG9vbGJhci5kaXNhYmxlUmVtb3ZlQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldCB9OyJdfQ==