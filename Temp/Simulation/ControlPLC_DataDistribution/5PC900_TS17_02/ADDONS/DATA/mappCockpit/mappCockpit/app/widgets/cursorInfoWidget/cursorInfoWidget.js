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
define(["require", "exports", "./interfaces/cursorInfoWidgetInterface", "../common/treeGridWidgetBase", "./view/cursorInfoTreeGridToolbar", "./model/ytCursorSignal", "./model/xyCursorSignal", "./model/fftCursorSignal", "./model/cursorInfo", "../common/states/cursorStates", "./model/dynamicCursorSignalTemplate", "./model/cursorSignal", "../../common/seriesHelper", "../../common/utilities/binSearch", "../common/states/chartViewToolbarStates", "../../models/common/series/seriesType", "./componentDefaultDefinition", "../../models/chartManagerDataModel/chartManagerDataModel", "../common/states/cursorType"], function (require, exports, cursorInfoWidgetInterface_1, treeGridWidgetBase_1, cursorInfoTreeGridToolbar_1, ytCursorSignal_1, xyCursorSignal_1, fftCursorSignal_1, cursorInfo_1, cursorStates_1, dynamicCursorSignalTemplate_1, cursorSignal_1, seriesHelper_1, binSearch_1, chartViewToolbarStates_1, seriesType_1, componentDefaultDefinition_1, chartManagerDataModel_1, cursorType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // defines the base id for the cursor value template
    var CURSOR_VALUE_ID = "cursorValue_";
    /**
     * implements the CursorInfo Widget
     *
     * @class CursorInfoWidget
     * @extends {TreeGridWidgetBase}
     */
    var CursorInfoWidget = /** @class */ (function (_super) {
        __extends(CursorInfoWidget, _super);
        function CursorInfoWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._cursorInfoTemplateDataModel = new Array();
            _this._cursorSignalsDataModelChangedHandler = function (sender, args) { return _this.onCursorSignalsDataModelChanged(sender, args); };
            _this._chartManagerModelChangedHandler = function (sender, data) { return _this.onChartManagerModelChanged(sender, data); };
            _this._selectedCursorSignals = new Array();
            _this._cursorInfoSelectorIsActive = false;
            _this._columnId_Visible = "visible";
            _this._columnId_Name = "name";
            _this._columnId_Value = "value";
            _this._columnId_Description = "description";
            _this._columnId_IconDefinition = "iconDefinition";
            _this._indeterminateStateValue = "indeterminate";
            // holds the current cursor states values. We initialize the member for default. The effective initialization takes place when the external shared instance
            // of the cursor states is created and reflected through the curorStates setter!
            _this._cursorStates = new cursorStates_1.CursorStates();
            _this._toolState = new chartViewToolbarStates_1.ChartViewToolState();
            return _this;
        }
        /**
         * Initialize the widget
         *
         *  @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.initialize = function () {
            _super.prototype.setHeaderFilterBarHidden.call(this); // Must be set before initialization to avoid showing the filterbar
            _super.prototype.initialize.call(this);
        };
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof OverviewTreeGridWidgetBase
         */
        CursorInfoWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        CursorInfoWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            // Get cursor signals datamodel
            this._cursorSignalsDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.CursorSignalsDataModelId);
            // Attach cursor signals datamodel event
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.eventModelChanged.attach(this._cursorSignalsDataModelChangedHandler);
            }
            // Get cursor signals datamodel
            this._chartManagerDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartManagerDataModelId);
            this.attachChartManagerDataModelEvents();
            // Refresh treeGrid to see the loaded persisting data
            this.refresh();
            // Initialize scrollbars positions
            var scrollbarSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ScrollbarsSettingsId);
            this.setScrollBarSettings(scrollbarSettings);
            _super.prototype.setHeaderContent.call(this, "Cursors");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 80);
        };
        CursorInfoWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        Object.defineProperty(CursorInfoWidget.prototype, "cursorsStates", {
            /**
             * Gets the cursors states
             *
             * @protected
             * @type {CursorStates}
             * @memberof CursorInfoWidget
             */
            get: function () {
                return this._cursorStates;
            },
            /**
             * Sets the cursors states. The method is called automatically whenever a cursor state has been changed externally.
             *
             * @protected
             * @memberof CursorInfoWidget
             */
            set: function (cursorStates) {
                // update the backup field
                this._cursorStates = cursorStates;
                this.updateInfoCursorsWithNewStateValues(cursorStates);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorInfoWidget.prototype, "toolState", {
            /**
             * Gets the tool state
             *
             * @protected
             * @type {ChartViewToolState}
             * @memberof CursorInfoWidget
             */
            get: function () {
                return this._toolState;
            },
            /**
             * Sets the tool state. The method is called automatically whenever a tool state has been changed externally.
             *
             * @protected
             * @memberof CursorInfoWidget
             */
            set: function (toolState) {
                // update the backup field
                this._toolState = toolState;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the cursor states.
         *
         * @protected
         * @param {CursorStates} cursorStates
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCursorStates = function (cursorStates) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        /**
          * Updates the tool state
          *
          * @protected
          * @param {ChartViewToolState} toolState
          * @memberof CursorInfoWidget
          */
        CursorInfoWidget.prototype.updateToolState = function (toolState) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        CursorInfoWidget.prototype.dispose = function () {
            this.detachChartManagerDataModelEvents();
            if (this._cursorSignalsDataModel != undefined) {
                // Detach cursor signals datamodel events
                this._cursorSignalsDataModel.eventModelChanged.detach(this._cursorSignalsDataModelChangedHandler);
                // Dispose cursor signals datamodel
                this._cursorSignalsDataModel.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        CursorInfoWidget.prototype.getComponentSettings = function (onlyModified) {
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        CursorInfoWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
            }
        };
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.createTemplates = function () {
            var $widgetContainer = $(this.mainDiv);
            $widgetContainer.append(this.getColumnTemplateData(this._columnId_Visible));
            $widgetContainer.append(this.getColumnTemplateData(this._columnId_Name));
        };
        /**
         * Returns the column template informations
         *
         * @private
         * @returns {string}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getColumnTemplateData = function (columnId) {
            if (columnId == this._columnId_Visible) {
                return "<script type=\"text/x-jsrender\" id=\"ciVisibleColumnTemplate\">\n                        <div style=\"margin-left:10px;\">{{if visible == \"true\" && !hasChildRecords}} <input class=\"customCheckbox\" type=\"checkbox\" checked=\"checked\" value=\"\" />{{else !hasChildRecords}} <input class=\"customCheckbox\" type=\"checkbox\" value=\"\" />{{/if}}</div>\n                        </script>";
            }
            else if (columnId == this._columnId_Name) {
                return "<script type=\"text/x-jsrender\" id=\"ciNameColumnTemplate\">\n                        <div style='height:20px;' unselectable='on'>\n                            {{if hasChildRecords}}\n                                <div class='intend' style='height:1px; float:left; width:{{:level*6}}px; display:inline-block;'></div>\n                            {{else !hasChildRecords}}\n                                <div class='intend' style='height:1px; float:left; width:{{:level*6}}px; display:inline-block;'></div>\n                            {{/if}}\n                            {{:#data['iconDefinition']}}\n                            <div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['name']}}</div>\n                        </div>\n                    </script>";
            }
            return "";
        };
        /**
         * Creates the tree grid for the CursorInfos
         *
         * @protected
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridCellEditSupport()), this.getTreeGridToolbarSupport()), { childMapping: "filteredCursorInfos", expandStateMapping: "expandState", isResponsive: true, treeColumnIndex: 1, rowHeight: 28, 
                // Set init size to draw the toolbar icons at the right position
                sizeSettings: { height: '100px', width: '100px' }, selectionType: ej.TreeGrid.SelectionType.Multiple, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, queryCellInfo: function (args) { return _this.queryCellInfo(args); } }));
        };
        CursorInfoWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
            // Persist expandState in dataModel
            if (this._cursorSignalsDataModel !== undefined) {
                this._cursorSignalsDataModel.saveSettings();
            }
            // Persist scrollbar state in cursorInfoWidget
            this.saveTreeGridSettings();
        };
        CursorInfoWidget.prototype.queryCellInfo = function (args) {
            if (args.column.field == this._columnId_Visible) {
                if (args.cellValue == this._indeterminateStateValue) {
                    // Set indeterminate icons
                    $(args.cellElement.childNodes[1].childNodes[1]).prop(this._indeterminateStateValue, true);
                }
            }
        };
        /**
         * TreeGrid selected row has changed
         *
         * @private
         * @param {*} args
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridRowSelected = function (args) {
            if (args.model.selectedItems == undefined) {
                return;
            }
            if (this._cursorInfoSelectorIsActive == true) {
                // Saves the selected items for multiselection support in cursor info selector
                this._selectedCursorInfosOld = this._selectedCursorInfosNew;
                this._selectedCursorInfosNew = args.model.selectedItems;
            }
            else {
                this._selectedCursorSignals = this.getOnlyCursorSignals(args.model.selectedItems);
                this.updateCursorInfoSelectorButtonState();
            }
        };
        /**
         * get all CursorSignals for the current selection(if CursorInfo is selected, get the parent CursorSignal)
         *
         * @private
         * @param {*} selectedItems
         * @returns {Array<CursorSignal>}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getOnlyCursorSignals = function (selectedItems) {
            var newList = new Array();
            for (var i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i].item instanceof cursorSignal_1.CursorSignal) {
                    var index = newList.indexOf(selectedItems[i].item);
                    if (index == -1) { // Only add if not already in list
                        newList.push(selectedItems[i].item);
                    }
                }
                else if (selectedItems[i].item instanceof cursorInfo_1.CursorInfo) {
                    var index = newList.indexOf(selectedItems[i].parentItem.item);
                    if (index == -1) { // Only add if not already in list
                        newList.push(selectedItems[i].parentItem.item);
                    }
                }
            }
            return newList;
        };
        /**
         * Sets the cursor info selector button state (if one (or more) signal is selected the button is enabled)
         *
         * @private
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCursorInfoSelectorButtonState = function () {
            var toolbar = this._toolbar;
            if (this._selectedCursorSignals == undefined) {
                // no items selected deactivate Filter button
                toolbar.disableCursorInfoSelectorButton(true);
                return;
            }
            if (this._selectedCursorSignals.length < 1) {
                // no items selected deactivate Filter button
                toolbar.disableCursorInfoSelectorButton(true);
            }
            else {
                toolbar.disableCursorInfoSelectorButton(false);
            }
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridColumnDefinition = function () {
            // add check box state information
            var checkBoxStates = [
                { text: "Yes", value: "true" },
                { text: "No", value: "false" }
            ];
            // return the column definitions
            return {
                columns: [
                    { field: this._columnId_Visible, headerText: "Visible", visible: false, allowEditing: false, isTemplateColumn: true, templateID: "ciVisibleColumnTemplate", filterEditType: "dropdownedit", dropdownData: checkBoxStates, allowFilteringBlankContent: false, width: "55px" },
                    { field: this._columnId_Name, headerText: "Name", allowEditing: false, isTemplateColumn: true, templateID: "ciNameColumnTemplate" },
                    { field: this._columnId_Value, headerText: "Value", allowEditing: false, width: "140px", isTemplateColumn: true, template: "<div style='padding-left: 20px' id='" + this.mainDivId + CURSOR_VALUE_ID + "{{:uiId}}'></div>" },
                    { field: this._columnId_Description, headerText: "Description", visible: false, allowEditing: false, width: "140px" },
                    { field: this._columnId_IconDefinition, visible: false, width: "0px" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.treeGridColumnResized(args); },
            };
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridCellEditSupport = function () {
            return {
                editSettings: {
                    allowEditing: true,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new cursorInfoTreeGridToolbar_1.CursorInfoTreeGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        /**
         * TreeGrid was created
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridCreated = function () {
            _super.prototype.treeGridCreated.call(this);
            this.attachToCheckBoxChangedEvent();
        };
        /**
         * Attach check box changed events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.attachToCheckBoxChangedEvent = function () {
            var _this = this;
            $(this.mainDiv).on("change", ".customCheckbox", function (e) { return _this.checkBoxChanged(e); });
        };
        CursorInfoWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/cursorInfoWidget/style/css/cursorInfoStyleV1.css");
        };
        /**
         * Occurs on check box changed events
         *
         * @private
         * @param {*} e
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.checkBoxChanged = function (e) {
            var filterDataSource = this._cursorInfoTemplateDataModel;
            e = e || window.event;
            var targetEle = e.target;
            var checkStatus = $(targetEle).is(':checked');
            // $(targetEle).prop('checked', true);
            var record = this.getTreeRecord(targetEle);
            if (record != undefined) {
                if (checkStatus == false) {
                    record.item.visible = "false";
                    record["visible"] = "false";
                    this.setMultiSelectionCheckBoxes("false", record.index);
                }
                else {
                    record.item.visible = "true";
                    record["visible"] = "true";
                    this.setMultiSelectionCheckBoxes("true", record.index);
                }
                this.setModel(filterDataSource);
                // Set selection after setting checkbox because they are lost after setting a check box
                this.setSelectionInCursorInfoSelectorView(this._selectedCursorInfosOld);
                this.updateCheckBoxes();
                // Update cursor info visibilities if something has changed
                this.setCursorInfoVisibilities(this._selectedCursorSignals, this._cursorInfoTemplateDataModel[0]);
                // Update dataModel
                this._cursorSignalsDataModel.saveSettings();
            }
        };
        /**
         * If multi selection is active, set all selected items to the given state(checked/unchecked)
         *
         * @private
         * @param {string} state
         * @param {number} actualIndex
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setMultiSelectionCheckBoxes = function (state, actualIndex) {
            var selectedCursorInfos = this._selectedCursorInfosOld;
            if (selectedCursorInfos != undefined) {
                // Set/Unset check boxes
                var indexWithinMultiSelection = false;
                for (var i = 0; i < selectedCursorInfos.length; i++) {
                    if (actualIndex == selectedCursorInfos[i].index) {
                        indexWithinMultiSelection = true;
                    }
                }
                ;
                if (indexWithinMultiSelection == true) {
                    selectedCursorInfos.forEach(function (cursorInfo) {
                        cursorInfo.item.visible = state;
                        cursorInfo["visible"] = state;
                    });
                }
                else {
                    // Only one checkbox was clicked => set selection to the new one
                    this._selectedCursorInfosOld = this._selectedCursorInfosNew;
                }
            }
        };
        CursorInfoWidget.prototype.treeGridActionBegin = function (args) {
            // Don't support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
            }
        };
        /**
         * A treegrid column was resized
         *
         * @private
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridColumnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            if (this._cursorInfoSelectorIsActive) {
                this.updateCheckBoxes();
            }
            // Refresh cursor info values after resize (treegrid sets the data to "0" after resize)
            this.refreshCursorValues();
            // Just persist column resize when filter is closed
            if (!this._cursorInfoSelectorIsActive) {
                this.saveTreeGridSettings();
            }
        };
        /** resizes the cursor values widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            if (this._cursorInfoSelectorIsActive) {
                this.updateCheckBoxes();
            }
            // Refresh cursor values after resize (treegrid sets the data to "0" after resize)
            this.refreshCursorValues();
        };
        CursorInfoWidget.prototype.activateCursorInfoSelectorView = function (activate) {
            this._toolbar.activateCursorInfoSelectorView(activate);
            if (activate == true) {
                this.showCursorInfoSelectorView();
            }
            else {
                this.showCursorSignalsView();
            }
            // Update toolbar button positions(e.g. position of right align toolbar) after hide or show toolbar button
            this._toolbar.resize(this.width);
        };
        /**
         * Shows the curser signals with the filtered/defined cursor informations
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.showCursorSignalsView = function () {
            this._cursorInfoSelectorIsActive = false;
            this._selectedCursorInfosOld = undefined;
            this._selectedCursorInfosNew = undefined;
            // Show actual cursorInfo data
            this.refresh();
            // Sets the column visibilities
            var treeGridObject = _super.prototype.getTreeGridObject.call(this);
            this.setColumnVisiblities(treeGridObject, false);
            // set the selection to state before switching to the cursor info selector view
            this.setSelectionWithCursorSignals(treeGridObject, this._selectedCursorSignals);
            // Update the dynamic column size after hide/show of some columns
            this.resizeDynamicColumn(0, treeGridObject.model);
            // refresh the cursor info values
            this.refreshCursorValues();
        };
        /**
         * Shows the cursor info selector view
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.showCursorInfoSelectorView = function () {
            this._cursorInfoSelectorIsActive = true;
            // Reset cursor info template datamodel
            this._cursorInfoTemplateDataModel.splice(0, this._cursorInfoTemplateDataModel.length);
            // create a signal template based on the selected series
            var templateCursorSignal = new dynamicCursorSignalTemplate_1.DynamicCursorSignalTemplate(this._selectedCursorSignals);
            // add the signal template to the model
            this._cursorInfoTemplateDataModel.push(templateCursorSignal);
            // Set cursor info template visibilities
            this.updateTemplateVisibilities(this._selectedCursorSignals, templateCursorSignal);
            // show cursor info template datamodel (the possible cursor infos)
            this.updateDataSource(this._cursorInfoTemplateDataModel);
            // Sets the column visibilities
            var treeGridObject = _super.prototype.getTreeGridObject.call(this);
            this.setColumnVisiblities(treeGridObject, true);
            // Update the dynamic column size after hide/show of some columns
            this.resizeDynamicColumn(0, treeGridObject.model);
            // Removes the filter of the visibility flag which is needed in the cursor signal view
            treeGridObject.clearFilter(this._columnId_Visible);
            // Convert custom check boxes into syncfusion check boxes
            this.updateCheckBoxes();
        };
        /**
         * Sets the column visibilities for the cursor info selector view or the cursor signals view
         *
         * @private
         * @param {*} treeGridObject
         * @param {boolean} cursorInfoSelectorView
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setColumnVisiblities = function (treeGridObject, cursorInfoSelectorView) {
            // get needed columns
            var visibleColumn = treeGridObject.getColumnByField(this._columnId_Visible);
            var descriptionColumn = treeGridObject.getColumnByField(this._columnId_Description);
            var valueColumn = treeGridObject.getColumnByField(this._columnId_Value);
            if (cursorInfoSelectorView == false) {
                // Hide visible column
                treeGridObject.hideColumn(visibleColumn.headerText);
                // Hide description column
                treeGridObject.hideColumn(descriptionColumn.headerText);
                // Show value column
                treeGridObject.showColumn(valueColumn.headerText);
            }
            else {
                // Show visible column
                treeGridObject.showColumn(visibleColumn.headerText);
                // Show description column
                treeGridObject.showColumn(descriptionColumn.headerText);
                // Hide value column
                treeGridObject.hideColumn(valueColumn.headerText);
            }
        };
        /**
         * Sets the selection to the given selection objects in cursor info selector view
         *
         * @private
         * @param {Array<any>} selectedObjects
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectionInCursorInfoSelectorView = function (selectedObjects) {
            if (selectedObjects === undefined) {
                return;
            }
            var treeGridObject = this.getTreeGridObject();
            treeGridObject.clearSelection();
            if (selectedObjects.length !== undefined) {
                for (var i = 0; i < selectedObjects.length; i++) {
                    treeGridObject._multiSelectCtrlRequest = true;
                    var visibleIndex = 0;
                    for (var j = 0; j < treeGridObject.model.flatRecords.length; j++) {
                        if (treeGridObject.model.flatRecords[j].id == selectedObjects[i].id) {
                            treeGridObject.selectRows(visibleIndex);
                        }
                        visibleIndex++;
                    }
                }
            }
            else {
                treeGridObject.selectRows(selectedObjects.index);
            }
            // Set actual selection for later use 
            this._selectedCursorInfosOld = selectedObjects;
            this._selectedCursorInfosNew = selectedObjects;
        };
        ;
        /**
         * Sets the selection to the given cursor signals
         *
         * @private
         * @param {*} treeGridObject
         * @param {Array<CursorSignal>} cursorSignals
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectionWithCursorSignals = function (treeGridObject, cursorSignals) {
            // deselect all selections in cursor signals view
            treeGridObject.clearSelection();
            if (cursorSignals == undefined) {
                return;
            }
            for (var i = 0; i < cursorSignals.length; i++) {
                treeGridObject._multiSelectCtrlRequest = true;
                var visibleIndex = 0;
                var model = treeGridObject.model;
                for (var j = 0; j < model.flatRecords.length; j++) {
                    if (model.flatRecords[j].item == cursorSignals[i]) {
                        treeGridObject.selectRows(visibleIndex);
                    }
                    if (model.flatRecords[j].visible != "false") {
                        visibleIndex++;
                    }
                }
            }
        };
        ;
        /**
         * Sets the visible flags in the template cursor signal to the informations from the cursor signals
         * (e.g. all signals show y1 cursor info so therefore template cursor info visibility is set to "true";
         *       all signals dosn't show y1 cursor info so therefore template cursor info visibility is set to "false";
         *       some signals show y1 cursor info so therefore template cursor info visibility is set to "indeterminate";
         * )
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {DynamicCursorSignalTemplate} templateCursorSignal
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateTemplateVisibilities = function (cursorSignals, templateCursorSignal) {
            var _this = this;
            if (templateCursorSignal && templateCursorSignal.cursorInfos) {
                // for all available merged cursor infos
                templateCursorSignal.cursorInfos.forEach(function (templateCursorSignalInfo) {
                    // clear existing visibility
                    templateCursorSignalInfo.visible = "";
                    // get the cursor infos by id
                    var matchingCursorInfos = _this.retrievCursorInfosById(cursorSignals, templateCursorSignalInfo.id);
                    // for all selected cursor signals with matching id ...
                    matchingCursorInfos.forEach(function (cursorSignalInfo) {
                        // if the visibility is yet undefined ..
                        if (!templateCursorSignalInfo.visible) {
                            // initialize the visibility with the first cursor signal infos value.
                            templateCursorSignalInfo.visible = cursorSignalInfo.visible;
                        }
                        else {
                            // set visibility to undetermined if one of the following values is different
                            if (cursorSignalInfo.visible !== templateCursorSignalInfo.visible) {
                                templateCursorSignalInfo.visible = _this._indeterminateStateValue;
                            }
                        }
                    });
                });
            }
        };
        /**
         * Sets the visibility defined in the template cursor signal to the cursor signals
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {DynamicCursorSignalTemplate} templateCursorSignal
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setCursorInfoVisibilities = function (cursorSignals, templateCursorSignal) {
            var _this = this;
            if (templateCursorSignal && templateCursorSignal.cursorInfos) {
                // for all available merged cursor infos
                templateCursorSignal.cursorInfos.forEach(function (templateCursorSignalInfo) {
                    if (templateCursorSignalInfo.visible !== _this._indeterminateStateValue) {
                        // get the cursor infos by id
                        var matchingCursorInfos = _this.retrievCursorInfosById(cursorSignals, templateCursorSignalInfo.id);
                        // for all selected cursor infos with matching id ...
                        matchingCursorInfos.forEach(function (cursorSignalInfo) {
                            // set the cursor signals visibility from the template value if a valid state is defined
                            cursorSignalInfo.visible = templateCursorSignalInfo.visible;
                        });
                    }
                });
            }
        };
        /**
         * gets the cursor infos with the specified id
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {string} cursorInfoId
         * @returns {Array<CursorInfo>}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.retrievCursorInfosById = function (cursorSignals, cursorInfoId) {
            var matchingCursorInfos = [];
            cursorSignals.forEach(function (cursorSignal) {
                cursorSignal.cursorInfos.forEach(function (cursorSignalInfo) {
                    if (cursorSignalInfo.id === cursorInfoId) {
                        matchingCursorInfos.push(cursorSignalInfo);
                    }
                });
            });
            return matchingCursorInfos;
        };
        /**
         * Raises the move cursor event
         *
         * @param {number} cursorIndex
         * @param {CursorMovement} movement
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onMoveCursor = function (cursorIndex, movement) {
            var data = [];
            var x = this.cursorsStates.getPosition(cursorIndex, this.cursorsStates.getLastCursorTypeSelected());
            if (this._cursorSignalsDataModel != undefined) {
                var cursors = this._cursorSignalsDataModel.getCursorSignals();
                cursors.forEach(function (cursor) {
                    data.push(cursor.serie);
                });
                if (x != undefined) {
                    this.moveCursor(cursorIndex, movement, data, x);
                }
            }
        };
        /**
         * moves the cursor for the specified direction and offset
         *
         * @private
         * @param {number} cursorIndex
         * @param {CursorMovement} cursorMovement
         * @param {BaseSeries[]} series
         * @param {number} cursorPosition
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.moveCursor = function (cursorIndex, cursorMovement, series, cursorPosition) {
            var cursorType = this.cursorsStates.getLastCursorTypeSelected();
            // get the next possible cursor timestamp
            var nearestTimestamp = this.findNearestTimestampInSeries(series, cursorPosition, cursorMovement, cursorType);
            // update the cursors timestamp location
            this.updateCursorLocation(cursorIndex, nearestTimestamp);
        };
        /**
         * searches the next timestamp in all available series. The picked value takes the movement direction intoi account.
         *
         * @private
         * @param {BaseSeries[]} series
         * @param {number} cursorTimeStamp
         * @param {CursorMovement} cursorMovement
         * @returns {number}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.findNearestTimestampInSeries = function (series, cursorTimeStamp, cursorMovement, cursorType) {
            // retrieve the timestamps series from the signal series
            var timestampSeries = series.map(function (singleSeries) {
                if (cursorType_1.CursorTypeHelper.getCursorTypeForSeries(singleSeries) == cursorType) {
                    return singleSeries.timestamps;
                }
                else {
                    return [];
                }
            });
            var nextNearestTimeStamp = cursorTimeStamp;
            // dpendiung on movement direction we pick the next possible time stamp
            switch (cursorMovement) {
                case cursorInfoWidgetInterface_1.CursorMovement.Right:
                    nextNearestTimeStamp = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(cursorTimeStamp, timestampSeries, binSearch_1.BinSearchMode.NEXTUPPER);
                    break;
                case cursorInfoWidgetInterface_1.CursorMovement.Left:
                    nextNearestTimeStamp = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(cursorTimeStamp, timestampSeries, binSearch_1.BinSearchMode.PREVIOUSLOWER);
                    break;
            }
            return nextNearestTimeStamp;
        };
        /**
         * Handle cursor activation/selection
         *
         * @param {number} cursorIndex
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onReferenceCursorSelected = function (cursorIndex) {
            // update the cursor selection state
            this.cursorsStates.setSelected(cursorIndex, true);
            this.updateCursorStates(this.cursorsStates);
            // set the cursors as active tool
            var toolState = new chartViewToolbarStates_1.ChartViewToolState();
            toolState.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
            this.updateToolState(toolState);
        };
        /**
         * Adds a signal to the cursor info widget
         *
         * @param {Array<BaseSeries>} series
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.addSeries = function (series) {
            var cursorSignals = new Array();
            for (var i = 0; i < series.length; i++) {
                if (series[i].type === seriesType_1.SeriesType.timeSeries) {
                    cursorSignals.push(new ytCursorSignal_1.YTCursorSignal(series[i], false));
                }
                else if (series[i].type === seriesType_1.SeriesType.xySeries) {
                    cursorSignals.push(new xyCursorSignal_1.XYCursorSignal(series[i], false));
                }
                else if (series[i].type === seriesType_1.SeriesType.fftSeries) {
                    cursorSignals.push(new fftCursorSignal_1.FFTCursorSignal(series[i], false));
                }
            }
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.addSignal(cursorSignals);
            }
        };
        /**
         * Remove a cursor signal from the cursor info widget
         *
         * @param {BaseSeries} serie
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.removeSerie = function (serie) {
            if (this._cursorSignalsDataModel != undefined) {
                var cursorSignal = this._cursorSignalsDataModel.getCursorSignal(serie);
                if (cursorSignal) {
                    this._cursorSignalsDataModel.removeSerie(cursorSignal);
                    // Disables filter button if is active
                    var toolbar_1 = this._toolbar;
                    if (toolbar_1.cursorInfoSelectionIsActive) {
                        toolbar_1.activateCursorInfoSelectorView(!toolbar_1.cursorInfoSelectionIsActive);
                    }
                    // Removes the cursor signal from the current selection list and updates the toolbar button
                    var index = this._selectedCursorSignals.indexOf(cursorSignal);
                    if (index != -1) {
                        this._selectedCursorSignals.splice(index, 1);
                        this.updateCursorInfoSelectorButtonState();
                    }
                }
            }
        };
        /**
         * changes and updates the cursor location of the selected cursor
         *
         * @param {number} cursorIndex
         * @param {number} cursorTimestamp
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCursorLocation = function (cursorIndex, cursorTimestamp) {
            this.cursorsStates.setPosition(cursorIndex, cursorTimestamp);
            this.updateCursorStates(this.cursorsStates);
        };
        /**
         * refreshes the tree grids data
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refresh = function () {
            // refresh tree grid only if cursor signal view is active (not in case of cursor info selector)
            if (!this._cursorInfoSelectorIsActive && this.refreshEnabled) {
                if (this._cursorSignalsDataModel != undefined) {
                    var cursorSignals = this._cursorSignalsDataModel.getCursorSignals();
                    this.updateDataSource(cursorSignals);
                }
                // set the selection to the select signal before
                var treeGridObject = this.getTreeGridObject();
                this.setSelectionWithCursorSignals(treeGridObject, this._selectedCursorSignals);
                // Update cursor info values 
                this.refreshCursorStates();
            }
        };
        /**
         * Trigger the update of the cursorInfos for the current cursor states
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorStates = function () {
            this.updateCursorStates(this.cursorsStates);
        };
        CursorInfoWidget.prototype.updateDataSource = function (cursorSignals) {
            this.setCursorValueUiIds(cursorSignals);
            // Refresh TreeGrid with new datasource
            this.setModel(cursorSignals);
            // Refresh the cursor values after updating the model
            this.refreshCursorValues(cursorSignals);
        };
        /**
         * Defines and sets uids for every cursor value (cursor signals and cursor infos)
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setCursorValueUiIds = function (cursorSignals) {
            var cursorInfoId = 0;
            cursorSignals.forEach(function (cursorSignal) {
                cursorSignal.uiId = cursorInfoId++;
                cursorSignal.cursorInfos.forEach(function (cursorInfo) {
                    cursorInfo.uiId = cursorInfoId++;
                });
            });
        };
        /**
         * Refresh all cursor values
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorValues = function (cursorSignals) {
            var _this = this;
            if (cursorSignals === void 0) { cursorSignals = undefined; }
            if (cursorSignals == undefined && this._cursorSignalsDataModel != undefined) {
                cursorSignals = this._cursorSignalsDataModel.getCursorSignals();
            }
            if (cursorSignals != undefined) {
                cursorSignals.forEach(function (cursorSignal) {
                    _this.refreshCursorValueField(cursorSignal);
                    cursorSignal.cursorInfos.forEach(function (cursorInfo) {
                        _this.refreshCursorValueField(cursorInfo);
                    });
                });
            }
        };
        /**
         * updates a cursor value field with the current values of the correspondig cursor signal or info
         *
         * @private
         * @param {CursorSignal|CursorInfo} cursorSignalOrInfo
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorValueField = function (cursorSignalOrInfo) {
            if (cursorSignalOrInfo) {
                // get the corresponding ui element
                var cursorValueElement = this.getCursorValueElement(cursorSignalOrInfo);
                if (cursorValueElement != undefined) {
                    var valueString = cursorSignalOrInfo.value.toString();
                    cursorValueElement.innerText = valueString;
                }
            }
        };
        /**
         * Gets the corresponding cursor signal or info element
         *
         * @private
         * @param {CursorSignal|CursorInfo} cursorSignalOrInfo
         * @returns {(HTMLDivElement | undefined)}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getCursorValueElement = function (cursorSignalOrInfo) {
            var mySubDiv = this.mainDiv.querySelector("#" + this.mainDivId + CURSOR_VALUE_ID + cursorSignalOrInfo.uiId);
            if (mySubDiv == null) {
                return undefined;
            }
            return mySubDiv;
        };
        CursorInfoWidget.prototype.onCursorSignalsDataModelChanged = function (sender, args) {
            this.refresh();
            this.saveTreeGridSettings();
        };
        /**
         * This method will update the cursor info widget with data from
         * the cursor state.
         *
         * @private
         * @param {CursorStates} modifiedState
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateInfoCursorsWithNewStateValues = function (modifiedState) {
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.updateInfoCursorsWithNewCursorStateValues(modifiedState);
            }
            this._toolbar.updateButtonStates(modifiedState);
            this.refreshCursorValues();
        };
        /**
         * Convert custom check boxes into syncfusion check boxes
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCheckBoxes = function () {
            var checkBoxes = $('.customCheckbox');
            for (var i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].id = 'customCheckbox' + (i + 1);
                this.creatSyncfusionCheckbox(checkBoxes[i]);
            }
        };
        /**
         * Instantiate syncfusion check box
         *
         * @private
         * @param {HTMLElement} customCheckbox
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.creatSyncfusionCheckbox = function (customCheckbox) {
            var _this = this;
            var enableTriState = false;
            var state = this.getCustomCheckboxState($(customCheckbox));
            if (state === 'indeterminate') {
                enableTriState = true;
            }
            $(customCheckbox).ejCheckBox({
                enableTriState: enableTriState,
                id: customCheckbox.id,
                checkState: state,
                cssClass: "cursorInfoWidget",
                change: function (args) { return _this.syncfusionCheckBoxChanged(args); },
            });
        };
        /**
         * Trigger check box change event
         *
         * @private
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.syncfusionCheckBoxChanged = function (args) {
            if (args.model.enableTriState) {
                $('#' + args.model.id).ejCheckBox({ enableTriState: false });
            }
            this.setSelectedCursorsInfo(args);
            var customCheckbox = $('#' + args.model.id);
            customCheckbox.change();
        };
        /**
         * Set selected cursor info when checkbox is clicked
         *
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectedCursorsInfo = function (args) {
            var treegrid = this.getTreeGridObject();
            var index = parseInt(args.model.id.split('customCheckbox')[1], 10);
            if (this._selectedCursorInfosOld == undefined) {
                this._selectedCursorInfosOld = treegrid.model.flatRecords[index];
            }
            else {
                this._selectedCursorInfosOld = this._selectedCursorInfosNew;
            }
            this._selectedCursorInfosNew = treegrid.model.flatRecords[index];
        };
        /**
         * get state of checkbox
         *
         * @private
         * @param {JQuery<HTMLElement>} checkbox
         * @returns {string}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getCustomCheckboxState = function (checkbox) {
            if (checkbox.is(':checked')) {
                return 'check';
            }
            else if (checkbox.is(':indeterminate')) {
                return 'indeterminate';
            }
            else {
                return 'uncheck';
            }
        };
        /**
         * Attaches the chart manager datamodel events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.attachChartManagerDataModelEvents = function () {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.eventModelChanged.attach(this._chartManagerModelChangedHandler);
            }
        };
        /**
         * Detaches the chart manager datamodel events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.detachChartManagerDataModelEvents = function () {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.eventModelChanged.detach(this._chartManagerModelChangedHandler);
            }
        };
        /**
         * chartManagerModel has changed
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onChartManagerModelChanged = function (sender, args) {
            // Update the cursor info widget
            if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.addSerie && args.data.series != undefined) {
                this.addSeries(args.data.series);
            }
            else if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeSerie) {
                if (args.data.signalUsedInOtherCharts == false) {
                    this.removeSerie(args.data.serie);
                }
            }
        };
        return CursorInfoWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.CursorInfoWidget = CursorInfoWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySW5mb1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L2N1cnNvckluZm9XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JBLG9EQUFvRDtJQUNwRCxJQUFNLGVBQWUsR0FBRyxjQUFjLENBQUM7SUFFdkM7Ozs7O09BS0c7SUFDSDtRQUErQixvQ0FBa0I7UUFBakQ7WUFBQSxxRUF1dUNDO1lBcnVDVyxrQ0FBNEIsR0FBdUMsSUFBSSxLQUFLLEVBQStCLENBQUM7WUFJNUcsMkNBQXFDLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLCtCQUErQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBakQsQ0FBaUQsQ0FBQztZQUN6RyxzQ0FBZ0MsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUE3QyxDQUE2QyxDQUFDO1lBRW5HLDRCQUFzQixHQUF3QixJQUFJLEtBQUssRUFBZ0IsQ0FBQztZQUd4RSxpQ0FBMkIsR0FBRyxLQUFLLENBQUM7WUFFM0IsdUJBQWlCLEdBQUcsU0FBUyxDQUFDO1lBQzlCLG9CQUFjLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLHFCQUFlLEdBQUcsT0FBTyxDQUFDO1lBQzFCLDJCQUFxQixHQUFHLGFBQWEsQ0FBQztZQUN0Qyw4QkFBd0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUU1Qyw4QkFBd0IsR0FBRyxlQUFlLENBQUM7WUFFNUQsMkpBQTJKO1lBQzNKLGdGQUFnRjtZQUN0RSxtQkFBYSxHQUFpQixJQUFJLDJCQUFZLEVBQUUsQ0FBQztZQUVuRCxnQkFBVSxHQUF1QixJQUFJLDJDQUFrQixFQUFFLENBQUM7O1FBNnNDdEUsQ0FBQztRQTNz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SUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BDO2lCQUNJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSx3REFBZ0MsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxLQUFLLEVBQUU7b0JBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDckM7YUFDSjtRQUNMLENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUF2dUNELENBQStCLHVDQUFrQixHQXV1Q2hEO0lBRVEsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUN1cnNvckluZm9XaWRnZXQsQ3Vyc29yTW92ZW1lbnQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2N1cnNvckluZm9XaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvY3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWxzRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvY3Vyc29yU2lnbmFsc0RhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBZVEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL21vZGVsL3l0Q3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IFhZQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vbW9kZWwveHlDdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgRkZUQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vbW9kZWwvZmZ0Q3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IElVaUJpbmRpbmcgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEN1cnNvckluZm8gfSBmcm9tIFwiLi9tb2RlbC9jdXJzb3JJbmZvXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlIH0gZnJvbSBcIi4vbW9kZWwvZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL21vZGVsL2N1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBCaW5TZWFyY2hNb2RlIGFzIFNlYXJjaE1vZGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWxpdGllcy9iaW5TZWFyY2hcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3VG9vbFN0YXRlLCBDaGFydFZpZXdUb29sU3RhdGVFbnVtIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY2hhcnRWaWV3VG9vbGJhclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IEN1cnNvclR5cGVIZWxwZXIsIEN1cnNvclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JUeXBlXCI7XHJcblxyXG4vLyBkZWZpbmVzIHRoZSBiYXNlIGlkIGZvciB0aGUgY3Vyc29yIHZhbHVlIHRlbXBsYXRlXHJcbmNvbnN0IENVUlNPUl9WQUxVRV9JRCA9IFwiY3Vyc29yVmFsdWVfXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgQ3Vyc29ySW5mbyBXaWRnZXRcclxuICpcclxuICogQGNsYXNzIEN1cnNvckluZm9XaWRnZXRcclxuICogQGV4dGVuZHMge1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIEN1cnNvckluZm9XaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJQ3Vyc29ySW5mb1dpZGdldCB7XHJcbiAgICBwcml2YXRlIF9jdXJzb3JTaWduYWxzRGF0YU1vZGVsOiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbDogQXJyYXk8RHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlPiA9IG5ldyBBcnJheTxEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGU+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBDaGFydE1hbmFnZXJEYXRhTW9kZWx8dW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2N1cnNvclNpZ25hbHNEYXRhTW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25DdXJzb3JTaWduYWxzRGF0YU1vZGVsQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJNb2RlbENoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgZGF0YSkgPT4gdGhpcy5vbkNoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZChzZW5kZXIsIGRhdGEpOyAgXHJcblxyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRDdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+ID0gbmV3IEFycmF5PEN1cnNvclNpZ25hbD4oKTtcclxuICAgIHByaXZhdGUgX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQ7XHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZEN1cnNvckluZm9zTmV3O1xyXG4gICAgcHJpdmF0ZSBfY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29sdW1uSWRfVmlzaWJsZSA9IFwidmlzaWJsZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29sdW1uSWRfTmFtZSA9IFwibmFtZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29sdW1uSWRfVmFsdWUgPSBcInZhbHVlXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9EZXNjcmlwdGlvbiA9IFwiZGVzY3JpcHRpb25cIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbHVtbklkX0ljb25EZWZpbml0aW9uID0gXCJpY29uRGVmaW5pdGlvblwiO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9pbmRldGVybWluYXRlU3RhdGVWYWx1ZSA9IFwiaW5kZXRlcm1pbmF0ZVwiO1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBjdXJyZW50IGN1cnNvciBzdGF0ZXMgdmFsdWVzLiBXZSBpbml0aWFsaXplIHRoZSBtZW1iZXIgZm9yIGRlZmF1bHQuIFRoZSBlZmZlY3RpdmUgaW5pdGlhbGl6YXRpb24gdGFrZXMgcGxhY2Ugd2hlbiB0aGUgZXh0ZXJuYWwgc2hhcmVkIGluc3RhbmNlXHJcbiAgICAvLyBvZiB0aGUgY3Vyc29yIHN0YXRlcyBpcyBjcmVhdGVkIGFuZCByZWZsZWN0ZWQgdGhyb3VnaCB0aGUgY3Vyb3JTdGF0ZXMgc2V0dGVyIVxyXG4gICAgcHJvdGVjdGVkIF9jdXJzb3JTdGF0ZXM6IEN1cnNvclN0YXRlcyA9IG5ldyBDdXJzb3JTdGF0ZXMoKTtcclxuXHJcbiAgICBwcml2YXRlIF90b29sU3RhdGU6IENoYXJ0Vmlld1Rvb2xTdGF0ZSA9IG5ldyBDaGFydFZpZXdUb29sU3RhdGUoKTtcclxuXHJcbiAgICAvKiogIFxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKiBcclxuICAgICAqICBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckZpbHRlckJhckhpZGRlbigpOy8vIE11c3QgYmUgc2V0IGJlZm9yZSBpbml0aWFsaXphdGlvbiB0byBhdm9pZCBzaG93aW5nIHRoZSBmaWx0ZXJiYXJcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBoZWlnaHQgb2YgdGhlIGhlYWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZGVmaW5lSGVhZGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICAvLyBHZXQgY3Vyc29yIHNpZ25hbHMgZGF0YW1vZGVsXHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5DdXJzb3JTaWduYWxzRGF0YU1vZGVsSWQpIGFzIEN1cnNvclNpZ25hbHNEYXRhTW9kZWw7XHJcblxyXG4gICAgICAgIC8vIEF0dGFjaCBjdXJzb3Igc2lnbmFscyBkYXRhbW9kZWwgZXZlbnRcclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZXZlbnRNb2RlbENoYW5nZWQuYXR0YWNoKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEdldCBjdXJzb3Igc2lnbmFscyBkYXRhbW9kZWxcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQpIGFzIENoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuXHJcbiAgICAgICAgdGhpcy5hdHRhY2hDaGFydE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gUmVmcmVzaCB0cmVlR3JpZCB0byBzZWUgdGhlIGxvYWRlZCBwZXJzaXN0aW5nIGRhdGFcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzY3JvbGxiYXJzIHBvc2l0aW9uc1xyXG4gICAgICAgIGxldCBzY3JvbGxiYXJTZXR0aW5ncyA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLlNjcm9sbGJhcnNTZXR0aW5nc0lkKTtcclxuICAgICAgICB0aGlzLnNldFNjcm9sbEJhclNldHRpbmdzKHNjcm9sbGJhclNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudChcIkN1cnNvcnNcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigxLCA4MCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnNvcnMgc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge0N1cnNvclN0YXRlc31cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgY3Vyc29yc1N0YXRlcygpIDogQ3Vyc29yU3RhdGVzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjdXJzb3JzIHN0YXRlcy4gVGhlIG1ldGhvZCBpcyBjYWxsZWQgYXV0b21hdGljYWxseSB3aGVuZXZlciBhIGN1cnNvciBzdGF0ZSBoYXMgYmVlbiBjaGFuZ2VkIGV4dGVybmFsbHkuIFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXQgY3Vyc29yc1N0YXRlcyhjdXJzb3JTdGF0ZXMgOiBDdXJzb3JTdGF0ZXMpIHtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGJhY2t1cCBmaWVsZFxyXG4gICAgICAgIHRoaXMuX2N1cnNvclN0YXRlcyA9IGN1cnNvclN0YXRlcztcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVJbmZvQ3Vyc29yc1dpdGhOZXdTdGF0ZVZhbHVlcyhjdXJzb3JTdGF0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdG9vbCBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtDaGFydFZpZXdUb29sU3RhdGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICAgcHJvdGVjdGVkIGdldCB0b29sU3RhdGUoKSA6IENoYXJ0Vmlld1Rvb2xTdGF0ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2xTdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHRvb2wgc3RhdGUuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSB0b29sIHN0YXRlIGhhcyBiZWVuIGNoYW5nZWQgZXh0ZXJuYWxseS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0IHRvb2xTdGF0ZSh0b29sU3RhdGUgOiBDaGFydFZpZXdUb29sU3RhdGUpIHtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGJhY2t1cCBmaWVsZFxyXG4gICAgICAgIHRoaXMuX3Rvb2xTdGF0ZSA9IHRvb2xTdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGN1cnNvciBzdGF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTdGF0ZXN9IGN1cnNvclN0YXRlc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUN1cnNvclN0YXRlcyhjdXJzb3JTdGF0ZXM6IEN1cnNvclN0YXRlcyl7XHJcbiAgICAgICAgLy8gQklORElOR1NPVVJDRTogZGlzcGF0Y2hlcyB0aGUgbWV0aG9kIGNhbGwgdG8gYm91bmQgdGFyZ2V0c1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIFVwZGF0ZXMgdGhlIHRvb2wgc3RhdGVcclxuICAgICAgKlxyXG4gICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld1Rvb2xTdGF0ZX0gdG9vbFN0YXRlXHJcbiAgICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAgKi9cclxuICAgICBwcm90ZWN0ZWQgdXBkYXRlVG9vbFN0YXRlKHRvb2xTdGF0ZTogQ2hhcnRWaWV3VG9vbFN0YXRlKXtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBkaXNwYXRjaGVzIHRoZSBtZXRob2QgY2FsbCB0byBib3VuZCB0YXJnZXRzXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuZGV0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gRGV0YWNoIGN1cnNvciBzaWduYWxzIGRhdGFtb2RlbCBldmVudHNcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgLy8gRGlzcG9zZSBjdXJzb3Igc2lnbmFscyBkYXRhbW9kZWxcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdze1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBpZihkYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUZW1wbGF0ZXMoKXtcclxuXHRcdHZhciAkd2lkZ2V0Q29udGFpbmVyID0gJCh0aGlzLm1haW5EaXYpO1xyXG5cdFx0JHdpZGdldENvbnRhaW5lci5hcHBlbmQodGhpcy5nZXRDb2x1bW5UZW1wbGF0ZURhdGEodGhpcy5fY29sdW1uSWRfVmlzaWJsZSkpO1xyXG5cdFx0JHdpZGdldENvbnRhaW5lci5hcHBlbmQodGhpcy5nZXRDb2x1bW5UZW1wbGF0ZURhdGEodGhpcy5fY29sdW1uSWRfTmFtZSkpO1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBjb2x1bW4gdGVtcGxhdGUgaW5mb3JtYXRpb25zXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuXHQgKi9cclxuICAgIHByaXZhdGUgZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKGNvbHVtbklkOiBzdHJpbmcpIDogc3RyaW5ne1xyXG4gICAgICAgIGlmKGNvbHVtbklkID09IHRoaXMuX2NvbHVtbklkX1Zpc2libGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gYDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwiY2lWaXNpYmxlQ29sdW1uVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjEwcHg7XCI+e3tpZiB2aXNpYmxlID09IFwidHJ1ZVwiICYmICFoYXNDaGlsZFJlY29yZHN9fSA8aW5wdXQgY2xhc3M9XCJjdXN0b21DaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJjaGVja2VkXCIgdmFsdWU9XCJcIiAvPnt7ZWxzZSAhaGFzQ2hpbGRSZWNvcmRzfX0gPGlucHV0IGNsYXNzPVwiY3VzdG9tQ2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIlwiIC8+e3svaWZ9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NjcmlwdD5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGNvbHVtbklkID09IHRoaXMuX2NvbHVtbklkX05hbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gYDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwiY2lOYW1lQ29sdW1uVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT0naGVpZ2h0OjIwcHg7JyB1bnNlbGVjdGFibGU9J29uJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aWYgaGFzQ2hpbGRSZWNvcmRzfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCo2fX1weDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ZWxzZSAhaGFzQ2hpbGRSZWNvcmRzfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCo2fX1weDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7L2lmfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7OiNkYXRhWydpY29uRGVmaW5pdGlvbiddfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2UtY2VsbCcgc3R5bGU9J2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCUnIHVuc2VsZWN0YWJsZT0nb24nPnt7OiNkYXRhWyduYW1lJ119fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NjcmlwdD5gO1xyXG4gICAgICAgIH1cclxuXHRcdHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIEN1cnNvckluZm9zXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCl7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFx0XHJcblxyXG4gICAgICAgICAgICBjaGlsZE1hcHBpbmc6IFwiZmlsdGVyZWRDdXJzb3JJbmZvc1wiLFxyXG4gICAgICAgICAgICBleHBhbmRTdGF0ZU1hcHBpbmc6IFwiZXhwYW5kU3RhdGVcIixcclxuICAgICAgICAgICAgaXNSZXNwb25zaXZlOiB0cnVlLFxyXG4gICAgICAgICAgICB0cmVlQ29sdW1uSW5kZXg6IDEsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb3dIZWlnaHQgOiAyOCxcclxuICAgICAgICAgICAgLy8gU2V0IGluaXQgc2l6ZSB0byBkcmF3IHRoZSB0b29sYmFyIGljb25zIGF0IHRoZSByaWdodCBwb3NpdGlvblxyXG4gICAgICAgICAgICBzaXplU2V0dGluZ3M6IHsgaGVpZ2h0OiAnMTAwcHgnLCB3aWR0aDogJzEwMHB4JyB9LFxyXG5cclxuICAgICAgICAgICAgc2VsZWN0aW9uVHlwZTogZWouVHJlZUdyaWQuU2VsZWN0aW9uVHlwZS5NdWx0aXBsZSxcclxuXHJcbiAgICAgICAgICAgIGV4cGFuZGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcblx0XHRcdGNvbGxhcHNlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcm93U2VsZWN0ZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkUm93U2VsZWN0ZWQoYXJncyksXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIGFjdGlvbkJlZ2luOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpLCBcclxuICAgICAgICAgICAgcXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IHRoaXMucXVlcnlDZWxsSW5mbyhhcmdzKSxcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCl7XHJcbiAgICAgICAgLy8gUmVmcmVzaCB0byBzZWUgY29ycmVjdCBleHBhbmRlZC9jb2xsYXBzZWQgaWNvblxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIC8vIFBlcnNpc3QgZXhwYW5kU3RhdGUgaW4gZGF0YU1vZGVsXHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBQZXJzaXN0IHNjcm9sbGJhciBzdGF0ZSBpbiBjdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgICAgdGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcXVlcnlDZWxsSW5mbyhhcmdzKXtcclxuICAgICAgICBpZihhcmdzLmNvbHVtbi5maWVsZCA9PSB0aGlzLl9jb2x1bW5JZF9WaXNpYmxlKXtcclxuICAgICAgICAgICAgaWYoYXJncy5jZWxsVmFsdWUgPT0gdGhpcy5faW5kZXRlcm1pbmF0ZVN0YXRlVmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGluZGV0ZXJtaW5hdGUgaWNvbnNcclxuICAgICAgICAgICAgICAgICQoYXJncy5jZWxsRWxlbWVudC5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV0pLnByb3AodGhpcy5faW5kZXRlcm1pbmF0ZVN0YXRlVmFsdWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJlZUdyaWQgc2VsZWN0ZWQgcm93IGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKXtcclxuICAgICAgICBpZihhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbXMgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgLy8gU2F2ZXMgdGhlIHNlbGVjdGVkIGl0ZW1zIGZvciBtdWx0aXNlbGVjdGlvbiBzdXBwb3J0IGluIGN1cnNvciBpbmZvIHNlbGVjdG9yXHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXcgPSBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscyA9IHRoaXMuZ2V0T25seUN1cnNvclNpZ25hbHMoYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b25TdGF0ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGFsbCBDdXJzb3JTaWduYWxzIGZvciB0aGUgY3VycmVudCBzZWxlY3Rpb24oaWYgQ3Vyc29ySW5mbyBpcyBzZWxlY3RlZCwgZ2V0IHRoZSBwYXJlbnQgQ3Vyc29yU2lnbmFsKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbGVjdGVkSXRlbXNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JTaWduYWw+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRPbmx5Q3Vyc29yU2lnbmFscyhzZWxlY3RlZEl0ZW1zKTogQXJyYXk8Q3Vyc29yU2lnbmFsPntcclxuICAgICAgICBsZXQgbmV3TGlzdCA9IG5ldyBBcnJheTxDdXJzb3JTaWduYWw+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoc2VsZWN0ZWRJdGVtc1tpXS5pdGVtIGluc3RhbmNlb2YgQ3Vyc29yU2lnbmFsKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG5ld0xpc3QuaW5kZXhPZihzZWxlY3RlZEl0ZW1zW2ldLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggPT0gLTEpeyAvLyBPbmx5IGFkZCBpZiBub3QgYWxyZWFkeSBpbiBsaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TGlzdC5wdXNoKHNlbGVjdGVkSXRlbXNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihzZWxlY3RlZEl0ZW1zW2ldLml0ZW0gaW5zdGFuY2VvZiBDdXJzb3JJbmZvKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG5ld0xpc3QuaW5kZXhPZihzZWxlY3RlZEl0ZW1zW2ldLnBhcmVudEl0ZW0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA9PSAtMSl7IC8vIE9ubHkgYWRkIGlmIG5vdCBhbHJlYWR5IGluIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICBuZXdMaXN0LnB1c2goc2VsZWN0ZWRJdGVtc1tpXS5wYXJlbnRJdGVtLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3IgYnV0dG9uIHN0YXRlIChpZiBvbmUgKG9yIG1vcmUpIHNpZ25hbCBpcyBzZWxlY3RlZCB0aGUgYnV0dG9uIGlzIGVuYWJsZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUN1cnNvckluZm9TZWxlY3RvckJ1dHRvblN0YXRlKCl7XHJcbiAgICAgICAgbGV0IHRvb2xiYXIgPSB0aGlzLl90b29sYmFyIGFzIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXI7XHJcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIG5vIGl0ZW1zIHNlbGVjdGVkIGRlYWN0aXZhdGUgRmlsdGVyIGJ1dHRvblxyXG4gICAgICAgICAgICB0b29sYmFyLmRpc2FibGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscy5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgLy8gbm8gaXRlbXMgc2VsZWN0ZWQgZGVhY3RpdmF0ZSBGaWx0ZXIgYnV0dG9uXHJcbiAgICAgICAgICAgIHRvb2xiYXIuZGlzYWJsZUN1cnNvckluZm9TZWxlY3RvckJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdG9vbGJhci5kaXNhYmxlQ3Vyc29ySW5mb1NlbGVjdG9yQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgLy8gYWRkIGNoZWNrIGJveCBzdGF0ZSBpbmZvcm1hdGlvblxyXG4gICAgICAgIHZhciBjaGVja0JveFN0YXRlcyA9IFtcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIlllc1wiLCB2YWx1ZTogXCJ0cnVlXCIgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIk5vXCIsIHZhbHVlOiBcImZhbHNlXCIgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIC8vIHJldHVybiB0aGUgY29sdW1uIGRlZmluaXRpb25zXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9WaXNpYmxlLCBoZWFkZXJUZXh0OiBcIlZpc2libGVcIiwgdmlzaWJsZTogZmFsc2UsIGFsbG93RWRpdGluZzogZmFsc2UsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwiY2lWaXNpYmxlQ29sdW1uVGVtcGxhdGVcIiwgZmlsdGVyRWRpdFR5cGU6IFwiZHJvcGRvd25lZGl0XCIsIGRyb3Bkb3duRGF0YTogY2hlY2tCb3hTdGF0ZXMsIGFsbG93RmlsdGVyaW5nQmxhbmtDb250ZW50OiBmYWxzZSwgd2lkdGg6IFwiNTVweFwifSxcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9OYW1lLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgYWxsb3dFZGl0aW5nIDogZmFsc2UsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwiY2lOYW1lQ29sdW1uVGVtcGxhdGVcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogdGhpcy5fY29sdW1uSWRfVmFsdWUsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgYWxsb3dFZGl0aW5nIDogZmFsc2UsIHdpZHRoOiBcIjE0MHB4XCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3BhZGRpbmctbGVmdDogMjBweCcgaWQ9J1wiICsgdGhpcy5tYWluRGl2SWQgKyBDVVJTT1JfVkFMVUVfSUQgKyBcInt7OnVpSWR9fSc+PC9kaXY+XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9EZXNjcmlwdGlvbiwgaGVhZGVyVGV4dDogXCJEZXNjcmlwdGlvblwiLCAgdmlzaWJsZTogZmFsc2UsIGFsbG93RWRpdGluZyA6IGZhbHNlLCB3aWR0aDogXCIxNDBweFwifSxcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9JY29uRGVmaW5pdGlvbiwgdmlzaWJsZTogZmFsc2UsIHdpZHRoOiBcIjBweFwiIH0sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNlbGwgZWRpdCBzZXR0aW5nc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7e319XHJcblx0ICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCk6IHt9e1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZWRpdFNldHRpbmdzOiB7XHRcclxuICAgICAgICAgICAgICAgIGFsbG93RWRpdGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dEZWxldGVDb25maXJtRGlhbG9nICA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1EaWFsb2cgIDogZmFsc2UgXHJcbiAgICAgICAgICAgIH0sXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhcih0aGlzLm1haW5EaXYpO1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmVlR3JpZCB3YXMgY3JlYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgc3VwZXIudHJlZUdyaWRDcmVhdGVkKCk7XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaFRvQ2hlY2tCb3hDaGFuZ2VkRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBjaGVjayBib3ggY2hhbmdlZCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hUb0NoZWNrQm94Q2hhbmdlZEV2ZW50KCl7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLm9uKFwiY2hhbmdlXCIsIFwiLmN1c3RvbUNoZWNrYm94XCIsIChlKSA9PiB0aGlzLmNoZWNrQm94Q2hhbmdlZChlKSApO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvc3R5bGUvY3NzL2N1cnNvckluZm9TdHlsZVYxLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9jY3VycyBvbiBjaGVjayBib3ggY2hhbmdlZCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrQm94Q2hhbmdlZChlKXtcclxuICAgICAgICBsZXQgZmlsdGVyRGF0YVNvdXJjZSA9IHRoaXMuX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbDtcclxuXHJcbiAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgIGxldCB0YXJnZXRFbGUgPSBlLnRhcmdldDtcclxuICAgICAgICBsZXQgY2hlY2tTdGF0dXMgPSAkKHRhcmdldEVsZSkuaXMoJzpjaGVja2VkJyk7XHJcbiAgICAgICAgLy8gJCh0YXJnZXRFbGUpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5nZXRUcmVlUmVjb3JkKHRhcmdldEVsZSk7XHJcbiAgICAgICAgaWYocmVjb3JkICE9IHVuZGVmaW5lZCl7ICAgIFxyXG4gICAgICAgICAgICBpZihjaGVja1N0YXR1cyA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZWNvcmQuaXRlbS52aXNpYmxlID0gXCJmYWxzZVwiO1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkW1widmlzaWJsZVwiXSA9IFwiZmFsc2VcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlTZWxlY3Rpb25DaGVja0JveGVzKFwiZmFsc2VcIiwgcmVjb3JkLmluZGV4KTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkLml0ZW0udmlzaWJsZSA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkW1widmlzaWJsZVwiXSA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNdWx0aVNlbGVjdGlvbkNoZWNrQm94ZXMoXCJ0cnVlXCIsIHJlY29yZC5pbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZWwoZmlsdGVyRGF0YVNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgc2VsZWN0aW9uIGFmdGVyIHNldHRpbmcgY2hlY2tib3ggYmVjYXVzZSB0aGV5IGFyZSBsb3N0IGFmdGVyIHNldHRpbmcgYSBjaGVjayBib3hcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25JbkN1cnNvckluZm9TZWxlY3RvclZpZXcodGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hlY2tCb3hlcygpO1xyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIGN1cnNvciBpbmZvIHZpc2liaWxpdGllcyBpZiBzb21ldGhpbmcgaGFzIGNoYW5nZWRcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJzb3JJbmZvVmlzaWJpbGl0aWVzKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscywgdGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsWzBdKTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIGRhdGFNb2RlbFxyXG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsIS5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBtdWx0aSBzZWxlY3Rpb24gaXMgYWN0aXZlLCBzZXQgYWxsIHNlbGVjdGVkIGl0ZW1zIHRvIHRoZSBnaXZlbiBzdGF0ZShjaGVja2VkL3VuY2hlY2tlZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYWN0dWFsSW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TXVsdGlTZWxlY3Rpb25DaGVja0JveGVzKHN0YXRlOiBzdHJpbmcsIGFjdHVhbEluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1cnNvckluZm9zID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZDtcclxuICAgICAgICBpZihzZWxlY3RlZEN1cnNvckluZm9zICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldC9VbnNldCBjaGVjayBib3hlc1xyXG4gICAgICAgICAgICBsZXQgaW5kZXhXaXRoaW5NdWx0aVNlbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBzZWxlY3RlZEN1cnNvckluZm9zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGFjdHVhbEluZGV4ID09IHNlbGVjdGVkQ3Vyc29ySW5mb3NbaV0uaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4V2l0aGluTXVsdGlTZWxlY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZihpbmRleFdpdGhpbk11bHRpU2VsZWN0aW9uID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXJzb3JJbmZvcy5mb3JFYWNoKGN1cnNvckluZm8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvckluZm8uaXRlbS52aXNpYmxlID0gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29ySW5mb1tcInZpc2libGVcIl0gPSBzdGF0ZTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IG9uZSBjaGVja2JveCB3YXMgY2xpY2tlZCA9PiBzZXQgc2VsZWN0aW9uIHRvIHRoZSBuZXcgb25lXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyl7XHJcbiAgICAgICAgLy8gRG9uJ3Qgc3VwcG9ydCBcIkVudGYvRGVsXCIga2V5XHJcbiAgICAgICAgaWYoYXJncy5yZXF1ZXN0VHlwZSA9PSBcImRlbGV0ZVwiKXtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgdHJlZWdyaWQgY29sdW1uIHdhcyByZXNpemVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncyl7XHJcbiAgICAgICAgc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKTtcclxuICAgICAgICBpZiAodGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGVja0JveGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlZnJlc2ggY3Vyc29yIGluZm8gdmFsdWVzIGFmdGVyIHJlc2l6ZSAodHJlZWdyaWQgc2V0cyB0aGUgZGF0YSB0byBcIjBcIiBhZnRlciByZXNpemUpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVzKCk7XHJcblxyXG4gICAgICAgIC8vIEp1c3QgcGVyc2lzdCBjb2x1bW4gcmVzaXplIHdoZW4gZmlsdGVyIGlzIGNsb3NlZFxyXG4gICAgICAgIGlmICghdGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgY3Vyc29yIHZhbHVlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBpZiAodGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGVja0JveGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlZnJlc2ggY3Vyc29yIHZhbHVlcyBhZnRlciByZXNpemUgKHRyZWVncmlkIHNldHMgdGhlIGRhdGEgdG8gXCIwXCIgYWZ0ZXIgcmVzaXplKVxyXG4gICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY3RpdmF0ZUN1cnNvckluZm9TZWxlY3RvclZpZXcoYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG4gICAgICAgICh0aGlzLl90b29sYmFyIGFzIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXIpLmFjdGl2YXRlQ3Vyc29ySW5mb1NlbGVjdG9yVmlldyhhY3RpdmF0ZSk7XHJcblxyXG4gICAgICAgIGlmKGFjdGl2YXRlID09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDdXJzb3JJbmZvU2VsZWN0b3JWaWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0N1cnNvclNpZ25hbHNWaWV3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdG9vbGJhciBidXR0b24gcG9zaXRpb25zKGUuZy4gcG9zaXRpb24gb2YgcmlnaHQgYWxpZ24gdG9vbGJhcikgYWZ0ZXIgaGlkZSBvciBzaG93IHRvb2xiYXIgYnV0dG9uXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5yZXNpemUodGhpcy53aWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93cyB0aGUgY3Vyc2VyIHNpZ25hbHMgd2l0aCB0aGUgZmlsdGVyZWQvZGVmaW5lZCBjdXJzb3IgaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG93Q3Vyc29yU2lnbmFsc1ZpZXcoKXtcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLy8gU2hvdyBhY3R1YWwgY3Vyc29ySW5mbyBkYXRhXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcblxyXG4gICAgICAgIC8vIFNldHMgdGhlIGNvbHVtbiB2aXNpYmlsaXRpZXNcclxuICAgICAgICBsZXQgdHJlZUdyaWRPYmplY3QgPSBzdXBlci5nZXRUcmVlR3JpZE9iamVjdCgpOyAgXHJcbiAgICAgICAgdGhpcy5zZXRDb2x1bW5WaXNpYmxpdGllcyh0cmVlR3JpZE9iamVjdCwgZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBzZXQgdGhlIHNlbGVjdGlvbiB0byBzdGF0ZSBiZWZvcmUgc3dpdGNoaW5nIHRvIHRoZSBjdXJzb3IgaW5mbyBzZWxlY3RvciB2aWV3XHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25XaXRoQ3Vyc29yU2lnbmFscyh0cmVlR3JpZE9iamVjdCwgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBkeW5hbWljIGNvbHVtbiBzaXplIGFmdGVyIGhpZGUvc2hvdyBvZiBzb21lIGNvbHVtbnNcclxuICAgICAgICB0aGlzLnJlc2l6ZUR5bmFtaWNDb2x1bW4oMCwgdHJlZUdyaWRPYmplY3QubW9kZWwpO1xyXG5cclxuICAgICAgICAvLyByZWZyZXNoIHRoZSBjdXJzb3IgaW5mbyB2YWx1ZXNcclxuICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZXMoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93cyB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3Igdmlld1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd0N1cnNvckluZm9TZWxlY3RvclZpZXcoKXtcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGN1cnNvciBpbmZvIHRlbXBsYXRlIGRhdGFtb2RlbFxyXG4gICAgICAgIHRoaXMuX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbC5zcGxpY2UoMCwgdGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsLmxlbmd0aCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgc2lnbmFsIHRlbXBsYXRlIGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBzZXJpZXNcclxuICAgICAgICBsZXQgdGVtcGxhdGVDdXJzb3JTaWduYWwgPSBuZXcgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscylcclxuXHJcbiAgICAgICAgLy8gYWRkIHRoZSBzaWduYWwgdGVtcGxhdGUgdG8gdGhlIG1vZGVsXHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsLnB1c2godGVtcGxhdGVDdXJzb3JTaWduYWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBjdXJzb3IgaW5mbyB0ZW1wbGF0ZSB2aXNpYmlsaXRpZXNcclxuICAgICAgICB0aGlzLnVwZGF0ZVRlbXBsYXRlVmlzaWJpbGl0aWVzKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscywgdGVtcGxhdGVDdXJzb3JTaWduYWwpO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy8gc2hvdyBjdXJzb3IgaW5mbyB0ZW1wbGF0ZSBkYXRhbW9kZWwgKHRoZSBwb3NzaWJsZSBjdXJzb3IgaW5mb3MpXHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhU291cmNlKDxhbnk+dGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXRzIHRoZSBjb2x1bW4gdmlzaWJpbGl0aWVzXHJcbiAgICAgICAgbGV0IHRyZWVHcmlkT2JqZWN0ID0gc3VwZXIuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICB0aGlzLnNldENvbHVtblZpc2libGl0aWVzKHRyZWVHcmlkT2JqZWN0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBkeW5hbWljIGNvbHVtbiBzaXplIGFmdGVyIGhpZGUvc2hvdyBvZiBzb21lIGNvbHVtbnNcclxuICAgICAgICB0aGlzLnJlc2l6ZUR5bmFtaWNDb2x1bW4oMCwgdHJlZUdyaWRPYmplY3QubW9kZWwpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmVzIHRoZSBmaWx0ZXIgb2YgdGhlIHZpc2liaWxpdHkgZmxhZyB3aGljaCBpcyBuZWVkZWQgaW4gdGhlIGN1cnNvciBzaWduYWwgdmlld1xyXG4gICAgICAgIHRyZWVHcmlkT2JqZWN0LmNsZWFyRmlsdGVyKHRoaXMuX2NvbHVtbklkX1Zpc2libGUpO1xyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IGN1c3RvbSBjaGVjayBib3hlcyBpbnRvIHN5bmNmdXNpb24gY2hlY2sgYm94ZXNcclxuICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrQm94ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvbHVtbiB2aXNpYmlsaXRpZXMgZm9yIHRoZSBjdXJzb3IgaW5mbyBzZWxlY3RvciB2aWV3IG9yIHRoZSBjdXJzb3Igc2lnbmFscyB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJlZUdyaWRPYmplY3RcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY3Vyc29ySW5mb1NlbGVjdG9yVmlld1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDb2x1bW5WaXNpYmxpdGllcyh0cmVlR3JpZE9iamVjdCwgY3Vyc29ySW5mb1NlbGVjdG9yVmlldzpib29sZWFuKXtcclxuICAgICAgICAvLyBnZXQgbmVlZGVkIGNvbHVtbnNcclxuICAgICAgICBsZXQgdmlzaWJsZUNvbHVtbiA9IHRyZWVHcmlkT2JqZWN0LmdldENvbHVtbkJ5RmllbGQodGhpcy5fY29sdW1uSWRfVmlzaWJsZSk7XHJcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uQ29sdW1uID0gdHJlZUdyaWRPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZCh0aGlzLl9jb2x1bW5JZF9EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgbGV0IHZhbHVlQ29sdW1uID0gdHJlZUdyaWRPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZCh0aGlzLl9jb2x1bW5JZF9WYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmKGN1cnNvckluZm9TZWxlY3RvclZpZXcgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAvLyBIaWRlIHZpc2libGUgY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LmhpZGVDb2x1bW4odmlzaWJsZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEhpZGUgZGVzY3JpcHRpb24gY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LmhpZGVDb2x1bW4oZGVzY3JpcHRpb25Db2x1bW4uaGVhZGVyVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTaG93IHZhbHVlIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5zaG93Q29sdW1uKHZhbHVlQ29sdW1uLmhlYWRlclRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBTaG93IHZpc2libGUgY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNob3dDb2x1bW4odmlzaWJsZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNob3cgZGVzY3JpcHRpb24gY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNob3dDb2x1bW4oZGVzY3JpcHRpb25Db2x1bW4uaGVhZGVyVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBIaWRlIHZhbHVlIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5oaWRlQ29sdW1uKHZhbHVlQ29sdW1uLmhlYWRlclRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlbGVjdGlvbiB0byB0aGUgZ2l2ZW4gc2VsZWN0aW9uIG9iamVjdHMgaW4gY3Vyc29yIGluZm8gc2VsZWN0b3Igdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IHNlbGVjdGVkT2JqZWN0c1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25JbkN1cnNvckluZm9TZWxlY3RvclZpZXcoc2VsZWN0ZWRPYmplY3RzKSB7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkT2JqZWN0cyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRyZWVHcmlkT2JqZWN0OiBhbnkgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgdHJlZUdyaWRPYmplY3QuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRPYmplY3RzLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZWxlY3RlZE9iamVjdHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5fbXVsdGlTZWxlY3RDdHJsUmVxdWVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmlzaWJsZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0cmVlR3JpZE9iamVjdC5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHJlZUdyaWRPYmplY3QubW9kZWwuZmxhdFJlY29yZHNbal0uaWQgPT0gc2VsZWN0ZWRPYmplY3RzW2ldLmlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNlbGVjdFJvd3ModmlzaWJsZUluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNlbGVjdFJvd3Moc2VsZWN0ZWRPYmplY3RzLmluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2V0IGFjdHVhbCBzZWxlY3Rpb24gZm9yIGxhdGVyIHVzZSBcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gc2VsZWN0ZWRPYmplY3RzO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXcgPSBzZWxlY3RlZE9iamVjdHM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc2VsZWN0aW9uIHRvIHRoZSBnaXZlbiBjdXJzb3Igc2lnbmFsc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyZWVHcmlkT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbHNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0U2VsZWN0aW9uV2l0aEN1cnNvclNpZ25hbHModHJlZUdyaWRPYmplY3QsIGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4pIHtcclxuICAgICAgICAvLyBkZXNlbGVjdCBhbGwgc2VsZWN0aW9ucyBpbiBjdXJzb3Igc2lnbmFscyB2aWV3XHJcbiAgICAgICAgdHJlZUdyaWRPYmplY3QuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgaWYoY3Vyc29yU2lnbmFscyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjdXJzb3JTaWduYWxzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5fbXVsdGlTZWxlY3RDdHJsUmVxdWVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCB2aXNpYmxlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSB0cmVlR3JpZE9iamVjdC5tb2RlbDtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IG1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1vZGVsLmZsYXRSZWNvcmRzW2pdLml0ZW0gPT0gY3Vyc29yU2lnbmFsc1tpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2VsZWN0Um93cyh2aXNpYmxlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobW9kZWwuZmxhdFJlY29yZHNbal0udmlzaWJsZSAhPSBcImZhbHNlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmxlIGZsYWdzIGluIHRoZSB0ZW1wbGF0ZSBjdXJzb3Igc2lnbmFsIHRvIHRoZSBpbmZvcm1hdGlvbnMgZnJvbSB0aGUgY3Vyc29yIHNpZ25hbHNcclxuICAgICAqIChlLmcuIGFsbCBzaWduYWxzIHNob3cgeTEgY3Vyc29yIGluZm8gc28gdGhlcmVmb3JlIHRlbXBsYXRlIGN1cnNvciBpbmZvIHZpc2liaWxpdHkgaXMgc2V0IHRvIFwidHJ1ZVwiO1xyXG4gICAgICogICAgICAgYWxsIHNpZ25hbHMgZG9zbid0IHNob3cgeTEgY3Vyc29yIGluZm8gc28gdGhlcmVmb3JlIHRlbXBsYXRlIGN1cnNvciBpbmZvIHZpc2liaWxpdHkgaXMgc2V0IHRvIFwiZmFsc2VcIjtcclxuICAgICAqICAgICAgIHNvbWUgc2lnbmFscyBzaG93IHkxIGN1cnNvciBpbmZvIHNvIHRoZXJlZm9yZSB0ZW1wbGF0ZSBjdXJzb3IgaW5mbyB2aXNpYmlsaXR5IGlzIHNldCB0byBcImluZGV0ZXJtaW5hdGVcIjtcclxuICAgICAqIClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxzXHJcbiAgICAgKiBAcGFyYW0ge0R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZX0gdGVtcGxhdGVDdXJzb3JTaWduYWxcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRlbXBsYXRlVmlzaWJpbGl0aWVzKGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4sIHRlbXBsYXRlQ3Vyc29yU2lnbmFsOiBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGUpIHtcclxuICAgICAgICBpZiAodGVtcGxhdGVDdXJzb3JTaWduYWwgJiYgdGVtcGxhdGVDdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MpIHtcclxuICAgICAgICAgICAgLy8gZm9yIGFsbCBhdmFpbGFibGUgbWVyZ2VkIGN1cnNvciBpbmZvc1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZUN1cnNvclNpZ25hbC5jdXJzb3JJbmZvcy5mb3JFYWNoKCh0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhciBleGlzdGluZyB2aXNpYmlsaXR5XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjdXJzb3IgaW5mb3MgYnkgaWRcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ0N1cnNvckluZm9zOiBBcnJheTxDdXJzb3JJbmZvPiA9IHRoaXMucmV0cmlldkN1cnNvckluZm9zQnlJZChjdXJzb3JTaWduYWxzLCB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8uaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZvciBhbGwgc2VsZWN0ZWQgY3Vyc29yIHNpZ25hbHMgd2l0aCBtYXRjaGluZyBpZCAuLi5cclxuICAgICAgICAgICAgICAgIG1hdGNoaW5nQ3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29yU2lnbmFsSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB2aXNpYmlsaXR5IGlzIHlldCB1bmRlZmluZWQgLi5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHZpc2liaWxpdHkgd2l0aCB0aGUgZmlyc3QgY3Vyc29yIHNpZ25hbCBpbmZvcyB2YWx1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUgPSBjdXJzb3JTaWduYWxJbmZvLnZpc2libGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHZpc2liaWxpdHkgdG8gdW5kZXRlcm1pbmVkIGlmIG9uZSBvZiB0aGUgZm9sbG93aW5nIHZhbHVlcyBpcyBkaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnNvclNpZ25hbEluZm8udmlzaWJsZSAhPT0gdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlID0gdGhpcy5faW5kZXRlcm1pbmF0ZVN0YXRlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZpc2liaWxpdHkgZGVmaW5lZCBpbiB0aGUgdGVtcGxhdGUgY3Vyc29yIHNpZ25hbCB0byB0aGUgY3Vyc29yIHNpZ25hbHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxzXHJcbiAgICAgKiBAcGFyYW0ge0R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZX0gdGVtcGxhdGVDdXJzb3JTaWduYWxcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEN1cnNvckluZm9WaXNpYmlsaXRpZXMoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPiwgdGVtcGxhdGVDdXJzb3JTaWduYWw6IER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZSkge1xyXG4gICAgICAgIGlmICh0ZW1wbGF0ZUN1cnNvclNpZ25hbCAmJiB0ZW1wbGF0ZUN1cnNvclNpZ25hbC5jdXJzb3JJbmZvcykge1xyXG4gICAgICAgICAgICAvLyBmb3IgYWxsIGF2YWlsYWJsZSBtZXJnZWQgY3Vyc29yIGluZm9zXHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ3Vyc29yU2lnbmFsLmN1cnNvckluZm9zLmZvckVhY2goKHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mbykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSAhPT0gdGhpcy5faW5kZXRlcm1pbmF0ZVN0YXRlVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGN1cnNvciBpbmZvcyBieSBpZFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ0N1cnNvckluZm9zOiBBcnJheTxDdXJzb3JJbmZvPiA9IHRoaXMucmV0cmlldkN1cnNvckluZm9zQnlJZChjdXJzb3JTaWduYWxzLCB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8uaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgYWxsIHNlbGVjdGVkIGN1cnNvciBpbmZvcyB3aXRoIG1hdGNoaW5nIGlkIC4uLlxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoaW5nQ3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29yU2lnbmFsSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIGN1cnNvciBzaWduYWxzIHZpc2liaWxpdHkgZnJvbSB0aGUgdGVtcGxhdGUgdmFsdWUgaWYgYSB2YWxpZCBzdGF0ZSBpcyBkZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbEluZm8udmlzaWJsZSA9IHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgY3Vyc29yIGluZm9zIHdpdGggdGhlIHNwZWNpZmllZCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJzb3JJbmZvSWRcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JJbmZvPn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmV0cmlldkN1cnNvckluZm9zQnlJZChjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+LCBjdXJzb3JJbmZvSWQ6IHN0cmluZyk6IEFycmF5PEN1cnNvckluZm8+IHtcclxuICAgICAgICBsZXQgbWF0Y2hpbmdDdXJzb3JJbmZvczogQXJyYXk8Q3Vyc29ySW5mbz4gPSBbXTtcclxuICAgICAgICBjdXJzb3JTaWduYWxzLmZvckVhY2goKGN1cnNvclNpZ25hbCkgPT4ge2N1cnNvclNpZ25hbC5jdXJzb3JJbmZvcy5mb3JFYWNoKChjdXJzb3JTaWduYWxJbmZvKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnNvclNpZ25hbEluZm8uaWQgPT09IGN1cnNvckluZm9JZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoaW5nQ3Vyc29ySW5mb3MucHVzaChjdXJzb3JTaWduYWxJbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBtYXRjaGluZ0N1cnNvckluZm9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VzIHRoZSBtb3ZlIGN1cnNvciBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JNb3ZlbWVudH0gbW92ZW1lbnRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbk1vdmVDdXJzb3IoY3Vyc29ySW5kZXg6IG51bWJlciwgbW92ZW1lbnQ6IEN1cnNvck1vdmVtZW50KSB7XHJcbiAgICAgICAgbGV0IGRhdGE6IEJhc2VTZXJpZXMgW10gPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IHggPSB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0UG9zaXRpb24oY3Vyc29ySW5kZXgsIHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkpO1xyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGN1cnNvcnMgPSB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbHMoKTtcclxuICAgICAgICAgICAgY3Vyc29ycy5mb3JFYWNoKGN1cnNvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2goY3Vyc29yLnNlcmllKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoeCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlQ3Vyc29yKGN1cnNvckluZGV4LCBtb3ZlbWVudCwgZGF0YSwgeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtb3ZlcyB0aGUgY3Vyc29yIGZvciB0aGUgc3BlY2lmaWVkIGRpcmVjdGlvbiBhbmQgb2Zmc2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JNb3ZlbWVudH0gY3Vyc29yTW92ZW1lbnRcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc1tdfSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JQb3NpdGlvblxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3ZlQ3Vyc29yKGN1cnNvckluZGV4OiBudW1iZXIsIGN1cnNvck1vdmVtZW50OkN1cnNvck1vdmVtZW50LHNlcmllczpCYXNlU2VyaWVzW10sY3Vyc29yUG9zaXRpb246bnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBjdXJzb3JUeXBlOiBDdXJzb3JUeXBlID0gdGhpcy5jdXJzb3JzU3RhdGVzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKTtcclxuICAgICAgICAvLyBnZXQgdGhlIG5leHQgcG9zc2libGUgY3Vyc29yIHRpbWVzdGFtcFxyXG4gICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wID0gdGhpcy5maW5kTmVhcmVzdFRpbWVzdGFtcEluU2VyaWVzKHNlcmllcywgY3Vyc29yUG9zaXRpb24sIGN1cnNvck1vdmVtZW50LCBjdXJzb3JUeXBlKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBjdXJzb3JzIHRpbWVzdGFtcCBsb2NhdGlvblxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yTG9jYXRpb24oY3Vyc29ySW5kZXgsIG5lYXJlc3RUaW1lc3RhbXApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2VhcmNoZXMgdGhlIG5leHQgdGltZXN0YW1wIGluIGFsbCBhdmFpbGFibGUgc2VyaWVzLiBUaGUgcGlja2VkIHZhbHVlIHRha2VzIHRoZSBtb3ZlbWVudCBkaXJlY3Rpb24gaW50b2kgYWNjb3VudC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzW119IHNlcmllc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvclRpbWVTdGFtcFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JNb3ZlbWVudH0gY3Vyc29yTW92ZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmROZWFyZXN0VGltZXN0YW1wSW5TZXJpZXMoc2VyaWVzOiBCYXNlU2VyaWVzW10sIGN1cnNvclRpbWVTdGFtcDogbnVtYmVyLCBjdXJzb3JNb3ZlbWVudDogQ3Vyc29yTW92ZW1lbnQsIGN1cnNvclR5cGU6IEN1cnNvclR5cGUpOiBudW1iZXIge1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB0aW1lc3RhbXBzIHNlcmllcyBmcm9tIHRoZSBzaWduYWwgc2VyaWVzXHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcFNlcmllcyA9IHNlcmllcy5tYXAoKHNpbmdsZVNlcmllcykgPT4geyBcclxuICAgICAgICAgICAgaWYgKEN1cnNvclR5cGVIZWxwZXIuZ2V0Q3Vyc29yVHlwZUZvclNlcmllcyhzaW5nbGVTZXJpZXMpID09IGN1cnNvclR5cGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmdsZVNlcmllcy50aW1lc3RhbXBzOyBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbmV4dE5lYXJlc3RUaW1lU3RhbXAgPSBjdXJzb3JUaW1lU3RhbXA7XHJcblxyXG4gICAgICAgIC8vIGRwZW5kaXVuZyBvbiBtb3ZlbWVudCBkaXJlY3Rpb24gd2UgcGljayB0aGUgbmV4dCBwb3NzaWJsZSB0aW1lIHN0YW1wXHJcbiAgICAgICAgc3dpdGNoIChjdXJzb3JNb3ZlbWVudCkge1xyXG4gICAgICAgICAgICBjYXNlIEN1cnNvck1vdmVtZW50LlJpZ2h0OlxyXG4gICAgICAgICAgICAgICAgbmV4dE5lYXJlc3RUaW1lU3RhbXAgPSBTZXJpZXNIZWxwZXIuZmluZE5lYXJlc3RWYWx1ZUZyb21Db2xsZWN0aW9uKGN1cnNvclRpbWVTdGFtcCwgdGltZXN0YW1wU2VyaWVzLCBTZWFyY2hNb2RlLk5FWFRVUFBFUik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDdXJzb3JNb3ZlbWVudC5MZWZ0OlxyXG4gICAgICAgICAgICAgICAgbmV4dE5lYXJlc3RUaW1lU3RhbXAgPSBTZXJpZXNIZWxwZXIuZmluZE5lYXJlc3RWYWx1ZUZyb21Db2xsZWN0aW9uKGN1cnNvclRpbWVTdGFtcCwgdGltZXN0YW1wU2VyaWVzLCBTZWFyY2hNb2RlLlBSRVZJT1VTTE9XRVIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0TmVhcmVzdFRpbWVTdGFtcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBjdXJzb3IgYWN0aXZhdGlvbi9zZWxlY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblJlZmVyZW5jZUN1cnNvclNlbGVjdGVkKGN1cnNvckluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGN1cnNvciBzZWxlY3Rpb24gc3RhdGVcclxuICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0U2VsZWN0ZWQoY3Vyc29ySW5kZXgsIHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG5cclxuICAgICAgICAvLyBzZXQgdGhlIGN1cnNvcnMgYXMgYWN0aXZlIHRvb2xcclxuICAgICAgICBsZXQgdG9vbFN0YXRlOiBDaGFydFZpZXdUb29sU3RhdGUgPSBuZXcgQ2hhcnRWaWV3VG9vbFN0YXRlKCk7XHJcbiAgICAgICAgdG9vbFN0YXRlLnNlbGVjdGVkVG9vbCA9IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uQ1VSU09SUztcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sU3RhdGUodG9vbFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBzaWduYWwgdG8gdGhlIGN1cnNvciBpbmZvIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFNlcmllcyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KXtcclxuICAgICAgICBsZXQgY3Vyc29yU2lnbmFscyA9IG5ldyBBcnJheTxDdXJzb3JTaWduYWw+KCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoc2VyaWVzW2ldLnR5cGUgPT09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5wdXNoKG5ldyBZVEN1cnNvclNpZ25hbChzZXJpZXNbaV0sIGZhbHNlKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VyaWVzW2ldLnR5cGUgPT09IFNlcmllc1R5cGUueHlTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbHMucHVzaChuZXcgWFlDdXJzb3JTaWduYWwoc2VyaWVzW2ldLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5wdXNoKG5ldyBGRlRDdXJzb3JTaWduYWwoc2VyaWVzW2ldLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5hZGRTaWduYWwoY3Vyc29yU2lnbmFscyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgY3Vyc29yIHNpZ25hbCBmcm9tIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGN1cnNvclNpZ25hbCA9IHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFsKHNlcmllKTtcclxuICAgICAgICAgICAgaWYoY3Vyc29yU2lnbmFsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwucmVtb3ZlU2VyaWUoY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gRGlzYWJsZXMgZmlsdGVyIGJ1dHRvbiBpZiBpcyBhY3RpdmVcclxuICAgICAgICAgICAgICAgIGxldCB0b29sYmFyID0gdGhpcy5fdG9vbGJhciBhcyBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyO1xyXG4gICAgICAgICAgICAgICAgaWYodG9vbGJhci5jdXJzb3JJbmZvU2VsZWN0aW9uSXNBY3RpdmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXIuYWN0aXZhdGVDdXJzb3JJbmZvU2VsZWN0b3JWaWV3KCF0b29sYmFyLmN1cnNvckluZm9TZWxlY3Rpb25Jc0FjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZXMgdGhlIGN1cnNvciBzaWduYWwgZnJvbSB0aGUgY3VycmVudCBzZWxlY3Rpb24gbGlzdCBhbmQgdXBkYXRlcyB0aGUgdG9vbGJhciBidXR0b25cclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscy5pbmRleE9mKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b25TdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2hhbmdlcyBhbmQgdXBkYXRlcyB0aGUgY3Vyc29yIGxvY2F0aW9uIG9mIHRoZSBzZWxlY3RlZCBjdXJzb3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JUaW1lc3RhbXBcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVDdXJzb3JMb2NhdGlvbihjdXJzb3JJbmRleDogbnVtYmVyLCBjdXJzb3JUaW1lc3RhbXA6IG51bWJlcikge1xyXG5cclxuICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0UG9zaXRpb24oY3Vyc29ySW5kZXgsIGN1cnNvclRpbWVzdGFtcCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXModGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgdHJlZSBncmlkcyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZnJlc2goKXtcclxuICAgICAgICAvLyByZWZyZXNoIHRyZWUgZ3JpZCBvbmx5IGlmIGN1cnNvciBzaWduYWwgdmlldyBpcyBhY3RpdmUgKG5vdCBpbiBjYXNlIG9mIGN1cnNvciBpbmZvIHNlbGVjdG9yKVxyXG4gICAgICAgIGlmKCF0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSAmJiB0aGlzLnJlZnJlc2hFbmFibGVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvclNpZ25hbHMgPSB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbHMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YVNvdXJjZShjdXJzb3JTaWduYWxzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBzZWxlY3Rpb24gdG8gdGhlIHNlbGVjdCBzaWduYWwgYmVmb3JlXHJcbiAgICAgICAgICAgIGxldCB0cmVlR3JpZE9iamVjdDogYW55ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbldpdGhDdXJzb3JTaWduYWxzKHRyZWVHcmlkT2JqZWN0LCB0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gVXBkYXRlIGN1cnNvciBpbmZvIHZhbHVlcyBcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yU3RhdGVzKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlciB0aGUgdXBkYXRlIG9mIHRoZSBjdXJzb3JJbmZvcyBmb3IgdGhlIGN1cnJlbnQgY3Vyc29yIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hDdXJzb3JTdGF0ZXMoKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlRGF0YVNvdXJjZShjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+KXtcclxuICAgICAgICB0aGlzLnNldEN1cnNvclZhbHVlVWlJZHMoY3Vyc29yU2lnbmFscyk7XHJcblxyXG4gICAgICAgIC8vIFJlZnJlc2ggVHJlZUdyaWQgd2l0aCBuZXcgZGF0YXNvdXJjZVxyXG4gICAgICAgIHRoaXMuc2V0TW9kZWwoY3Vyc29yU2lnbmFscyk7XHJcblxyXG4gICAgICAgIC8vIFJlZnJlc2ggdGhlIGN1cnNvciB2YWx1ZXMgYWZ0ZXIgdXBkYXRpbmcgdGhlIG1vZGVsXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVzKGN1cnNvclNpZ25hbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhbmQgc2V0cyB1aWRzIGZvciBldmVyeSBjdXJzb3IgdmFsdWUgKGN1cnNvciBzaWduYWxzIGFuZCBjdXJzb3IgaW5mb3MpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDdXJzb3JWYWx1ZVVpSWRzKGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4pIHtcclxuICAgICAgICBsZXQgY3Vyc29ySW5mb0lkID0gMDtcclxuICAgICAgICBjdXJzb3JTaWduYWxzLmZvckVhY2goKGN1cnNvclNpZ25hbCk9PntcclxuICAgICAgICAgICAgKDxJVWlCaW5kaW5nPjxhbnk+Y3Vyc29yU2lnbmFsKS51aUlkID0gY3Vyc29ySW5mb0lkKys7XHJcbiAgICAgICAgICAgIGN1cnNvclNpZ25hbC5jdXJzb3JJbmZvcy5mb3JFYWNoKChjdXJzb3JJbmZvKT0+e1xyXG4gICAgICAgICAgICAgICAgICg8SVVpQmluZGluZz48YW55PmN1cnNvckluZm8pLnVpSWQgPSBjdXJzb3JJbmZvSWQrKztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2ggYWxsIGN1cnNvciB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoQ3Vyc29yVmFsdWVzKGN1cnNvclNpZ25hbHM6IEN1cnNvclNpZ25hbFtdfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGlmKGN1cnNvclNpZ25hbHMgPT0gdW5kZWZpbmVkICYmIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY3Vyc29yU2lnbmFscyA9IHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFscygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJzb3JTaWduYWxzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGN1cnNvclNpZ25hbHMuZm9yRWFjaCgoY3Vyc29yU2lnbmFsKT0+eyBcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlRmllbGQoY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbC5jdXJzb3JJbmZvcy5mb3JFYWNoKChjdXJzb3JJbmZvKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlRmllbGQoY3Vyc29ySW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIGEgY3Vyc29yIHZhbHVlIGZpZWxkIHdpdGggdGhlIGN1cnJlbnQgdmFsdWVzIG9mIHRoZSBjb3JyZXNwb25kaWcgY3Vyc29yIHNpZ25hbCBvciBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU2lnbmFsfEN1cnNvckluZm99IGN1cnNvclNpZ25hbE9ySW5mb1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoQ3Vyc29yVmFsdWVGaWVsZChjdXJzb3JTaWduYWxPckluZm86IEN1cnNvclNpZ25hbHxDdXJzb3JJbmZvKSB7XHJcbiAgICAgICAgaWYgKGN1cnNvclNpZ25hbE9ySW5mbykge1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGNvcnJlc3BvbmRpbmcgdWkgZWxlbWVudFxyXG4gICAgICAgICAgICBsZXQgY3Vyc29yVmFsdWVFbGVtZW50ID0gdGhpcy5nZXRDdXJzb3JWYWx1ZUVsZW1lbnQoY3Vyc29yU2lnbmFsT3JJbmZvKTtcclxuICAgICAgICAgICAgaWYgKGN1cnNvclZhbHVlRWxlbWVudCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZVN0cmluZzogc3RyaW5nID0gY3Vyc29yU2lnbmFsT3JJbmZvLnZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yVmFsdWVFbGVtZW50LmlubmVyVGV4dCA9IHZhbHVlU3RyaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY29ycmVzcG9uZGluZyBjdXJzb3Igc2lnbmFsIG9yIGluZm8gZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbHxDdXJzb3JJbmZvfSBjdXJzb3JTaWduYWxPckluZm9cclxuICAgICAqIEByZXR1cm5zIHsoSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDdXJzb3JWYWx1ZUVsZW1lbnQoY3Vyc29yU2lnbmFsT3JJbmZvOiBDdXJzb3JTaWduYWx8Q3Vyc29ySW5mbyk6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICB2YXIgbXlTdWJEaXYgPSB0aGlzLm1haW5EaXYucXVlcnlTZWxlY3RvcihcIiNcIiArIHRoaXMubWFpbkRpdklkICsgQ1VSU09SX1ZBTFVFX0lEICsgKDxJVWlCaW5kaW5nPjxhbnk+Y3Vyc29yU2lnbmFsT3JJbmZvKS51aUlkKTtcclxuICAgICAgICBpZihteVN1YkRpdiA9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxIVE1MRGl2RWxlbWVudD5teVN1YkRpdjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWQoc2VuZGVyLCBhcmdzKXtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB0aGlzLnNhdmVUcmVlR3JpZFNldHRpbmdzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIGN1cnNvciBpbmZvIHdpZGdldCB3aXRoIGRhdGEgZnJvbVxyXG4gICAgICogdGhlIGN1cnNvciBzdGF0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTdGF0ZXN9IG1vZGlmaWVkU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSW5mb0N1cnNvcnNXaXRoTmV3U3RhdGVWYWx1ZXMgKG1vZGlmaWVkU3RhdGU6IEN1cnNvclN0YXRlcykge1xyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC51cGRhdGVJbmZvQ3Vyc29yc1dpdGhOZXdDdXJzb3JTdGF0ZVZhbHVlcyhtb2RpZmllZFN0YXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICh0aGlzLl90b29sYmFyIGFzIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXIpLnVwZGF0ZUJ1dHRvblN0YXRlcyhtb2RpZmllZFN0YXRlKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IGN1c3RvbSBjaGVjayBib3hlcyBpbnRvIHN5bmNmdXNpb24gY2hlY2sgYm94ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVDaGVja0JveGVzKCkge1xyXG4gICAgICAgIHZhciBjaGVja0JveGVzID0gJCgnLmN1c3RvbUNoZWNrYm94Jyk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNoZWNrQm94ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2hlY2tCb3hlc1tpXS5pZCA9ICdjdXN0b21DaGVja2JveCcgKyAoaSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0U3luY2Z1c2lvbkNoZWNrYm94KGNoZWNrQm94ZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlIHN5bmNmdXNpb24gY2hlY2sgYm94XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGN1c3RvbUNoZWNrYm94XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0U3luY2Z1c2lvbkNoZWNrYm94KGN1c3RvbUNoZWNrYm94OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHZhciBlbmFibGVUcmlTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuZ2V0Q3VzdG9tQ2hlY2tib3hTdGF0ZSgkKGN1c3RvbUNoZWNrYm94KSk7XHJcbiAgICAgICAgaWYgKHN0YXRlID09PSAnaW5kZXRlcm1pbmF0ZScpIHsgZW5hYmxlVHJpU3RhdGUgPSB0cnVlOyB9XHJcbiAgICAgICAgJChjdXN0b21DaGVja2JveCkuZWpDaGVja0JveChcclxuICAgICAgICAgICAgeyAgXHJcbiAgICAgICAgICAgIGVuYWJsZVRyaVN0YXRlOiBlbmFibGVUcmlTdGF0ZSxcclxuICAgICAgICAgICAgaWQ6IGN1c3RvbUNoZWNrYm94LmlkLFxyXG4gICAgICAgICAgICBjaGVja1N0YXRlOiBzdGF0ZSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwiY3Vyc29ySW5mb1dpZGdldFwiLFxyXG4gICAgICAgICAgICBjaGFuZ2U6IChhcmdzKSA9PiB0aGlzLnN5bmNmdXNpb25DaGVja0JveENoYW5nZWQoYXJncyksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlciBjaGVjayBib3ggY2hhbmdlIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzeW5jZnVzaW9uQ2hlY2tCb3hDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncy5tb2RlbC5lbmFibGVUcmlTdGF0ZSkge1xyXG4gICAgICAgICAgICAkKCcjJyArIGFyZ3MubW9kZWwuaWQpLmVqQ2hlY2tCb3goe2VuYWJsZVRyaVN0YXRlOiBmYWxzZX0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkQ3Vyc29yc0luZm8oYXJncyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGN1c3RvbUNoZWNrYm94ID0gJCgnIycgKyBhcmdzLm1vZGVsLmlkKTtcclxuICAgICAgICBjdXN0b21DaGVja2JveC5jaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzZWxlY3RlZCBjdXJzb3IgaW5mbyB3aGVuIGNoZWNrYm94IGlzIGNsaWNrZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldFNlbGVjdGVkQ3Vyc29yc0luZm8oYXJncyl7XHJcbiAgICAgICAgdmFyIHRyZWVncmlkOiBhbnkgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoYXJncy5tb2RlbC5pZC5zcGxpdCgnY3VzdG9tQ2hlY2tib3gnKVsxXSwgMTApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gdHJlZWdyaWQubW9kZWwuZmxhdFJlY29yZHNbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9IHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXcgPSB0cmVlZ3JpZC5tb2RlbC5mbGF0UmVjb3Jkc1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgc3RhdGUgb2YgY2hlY2tib3hcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fSBjaGVja2JveFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q3VzdG9tQ2hlY2tib3hTdGF0ZShjaGVja2JveDogSlF1ZXJ5PEhUTUxFbGVtZW50Pik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnY2hlY2snO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hlY2tib3guaXMoJzppbmRldGVybWluYXRlJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdpbmRldGVybWluYXRlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAndW5jaGVjayc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoZXMgdGhlIGNoYXJ0IG1hbmFnZXIgZGF0YW1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaENoYXJ0TWFuYWdlckRhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5hdHRhY2godGhpcy5fY2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIGNoYXJ0IG1hbmFnZXIgZGF0YW1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaENoYXJ0TWFuYWdlckRhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fY2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2hhcnRNYW5hZ2VyTW9kZWwgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICAvLyBVcGRhdGUgdGhlIGN1cnNvciBpbmZvIHdpZGdldFxyXG4gICAgICAgIGlmIChhcmdzLmhpbnQgPT0gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkU2VyaWUgJiYgYXJncy5kYXRhLnNlcmllcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXMoYXJncy5kYXRhLnNlcmllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuaGludCA9PSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVTZXJpZSkge1xyXG4gICAgICAgICAgICBpZiAoYXJncy5kYXRhLnNpZ25hbFVzZWRJbk90aGVyQ2hhcnRzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlcmllKGFyZ3MuZGF0YS5zZXJpZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEN1cnNvckluZm9XaWRnZXQgfTsiXX0=