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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../common/treeGridWidgetBase", "../../models/common/signal/serieGroup", "./view/smTreeGridCellEditEvents", "./view/smTreeGridCellEditTemplate", "./view/signalManagerTreeGridToolbar", "../../common/fileProvider", "../../framework/events", "../../common/exportImportHelper", "../common/busyInformation", "../../models/signalManagerDataModel/signalCategory", "../../models/signalManagerDataModel/signalManagerCalculation", "../../models/common/signal/serieContainer", "../../models/common/signal/serieNode", "../common/interfaces/dropInterface", "../common/dragDataObject", "../../models/signalManagerDataModel/signalManagerCalculationInputData", "../../models/signalManagerDataModel/signalManagerCalculationOutputData", "../common/dragDropRepresentation", "../../models/signalManagerDataModel/signalManagerCalculatorType", "../../models/common/series/seriesType", "./helpers/exportHelper", "../common/alertDialog", "../../models/signalManagerDataModel/signalRoot", "./componentDefaultDefinition", "../common/widgetBase", "../../common/persistence/persistDataProvider", "../../common/packageConversion/mceConversionError", "../../common/mceExportImport/mceExportImportHelper", "../../framework/componentHub/componentDataHub", "../common/states/cursorStates", "../traceViewWidget/bindingIds"], function (require, exports, treeGridWidgetBase_1, serieGroup_1, smTreeGridCellEditEvents_1, smTreeGridCellEditTemplate_1, signalManagerTreeGridToolbar_1, fileProvider_1, events_1, exportImportHelper_1, busyInformation_1, signalCategory_1, signalManagerCalculation_1, serieContainer_1, serieNode_1, dropInterface_1, dragDataObject_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, dragDropRepresentation_1, signalManagerCalculatorType_1, seriesType_1, exportHelper_1, alertDialog_1, signalRoot_1, componentDefaultDefinition_1, widgetBase_1, persistDataProvider_1, mceConversionError_1, mceExportImportHelper_1, componentDataHub_1, cursorStates_1, bindingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSerieDoubleClicked = /** @class */ (function (_super) {
        __extends(EventSerieDoubleClicked, _super);
        function EventSerieDoubleClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSerieDoubleClicked;
    }(events_1.TypedEvent));
    ;
    var EventChangeSize = /** @class */ (function (_super) {
        __extends(EventChangeSize, _super);
        function EventChangeSize() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventChangeSize;
    }(events_1.TypedEvent));
    ;
    var SignalManagerWidget = /** @class */ (function (_super) {
        __extends(SignalManagerWidget, _super);
        function SignalManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._highlightAreaId = "signalManager_Highlighted";
            _this._deleteItemsContent = "This action will permanently delete selected elements.";
            _this._deleteItemsHeader = "Delete recorded data?";
            _this._warningImportingHeader = "Import canceled";
            _this._warningImportingContent = "It is not possible to import one .mce file with other files at the same time.";
            _this._MCEFilesImportedHeader = "Delete all trace data?";
            _this._MCEFilesImportedContent = "Do you want to delete all trace data and import the .mce file?";
            _this._isFirstResize = true;
            _this._indexesDragged = [];
            _this._fileProvider = new fileProvider_1.FileProvider();
            _this.editModeActive = false;
            _this._widthDifference = 450;
            _this._minWidth = 250;
            _this.eventSerieDoubleClicked = new EventSerieDoubleClicked();
            _this.eventChangeSize = new EventChangeSize();
            _this._uploadDataFinishedHandler = function (sender, args) { return _this.onUploadDataFinished(args); };
            return _this;
        }
        Object.defineProperty(SignalManagerWidget.prototype, "autoUploadActive", {
            /**
             * Gets the information if the auto upload of tracedata is active
             *
             * @readonly
             * @type {boolean}
             * @memberof SignalManagerWidget
             */
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        SignalManagerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        SignalManagerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initSignalManagerDataModel();
            this.initSeriesProvider();
            this.initChartManagerDataModel();
            this.refresh();
            _super.prototype.setHeaderContent.call(this, "Signals");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 40);
            // Initialize scrollbars positions
            var scrollbarSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ScrollbarsSettingsId);
            this.setScrollBarSettings(scrollbarSettings);
            // Add drag support
            _super.prototype.addDraggingSupport.call(this);
            // Add drop support
            _super.prototype.addSupportedDragDropDataId.call(this, dropInterface_1.DragDropDataId.signal);
        };
        SignalManagerWidget.prototype.dispose = function () {
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
            _super.prototype.dispose.call(this);
        };
        //#region drag support
        SignalManagerWidget.prototype.startDragging = function () {
            if (this._currentDragDropSeries != undefined) {
                var signalImage = void 0, signalName = void 0;
                var imageProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ImageProviderId);
                if (this._currentDragDropSeries.length == 1) {
                    // Default yt series svg
                    signalName = this._currentDragDropSeries[0].name;
                    if (imageProvider != undefined) {
                        signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/ytSeries.svg");
                        if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.xySeries) {
                            // Use xy series svg
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/xySeries.svg");
                        }
                        else if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.fftSeries) {
                            // Use fft series svg
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/fftSeries.svg");
                        }
                        if (signalImage != undefined) {
                            // Replace serie color in svg with color of current serie
                            signalImage = signalImage.replace("stroke:#76bea6", "stroke:" + this._currentDragDropSeries[0].color);
                        }
                    }
                }
                else {
                    if (imageProvider != undefined) {
                        if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.xySeries) {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalXYSeries.svg");
                        }
                        else if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.fftSeries) {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalFFTSeries.svg");
                        }
                        else {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalYTSeries.svg");
                        }
                    }
                }
                var dragDropIconRepresentation = new dragDropRepresentation_1.DragDropRepresentation();
                dragDropIconRepresentation.iconList.push(signalImage);
                dragDropIconRepresentation.textList.push(signalName);
                return new dragDataObject_1.DragDropDataObject(dropInterface_1.DragDropDataId.signal, this._currentDragDropSeries, dragDropIconRepresentation);
            }
            return undefined;
        };
        SignalManagerWidget.prototype.draggingStopped = function () {
            // Reset current drag drop signal
            this._currentDragDropSeries = undefined;
            this._currentCalculatorType = undefined;
            this._indexesDragged = [];
        };
        //#endregion
        //#region drop support
        SignalManagerWidget.prototype.addDropLocations = function (series) {
            if (series[0].parent != undefined && series.length == 1) {
                series[0].parent.visibleChilds.forEach(function (child) {
                    if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                        child.setDropLocations(true, series[0]);
                    }
                });
            }
        };
        SignalManagerWidget.prototype.removeDropLocations = function (series) {
            if (series[0].parent != undefined && series.length == 1) {
                series[0].parent.visibleChilds.forEach(function (child) {
                    if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                        child.setDropLocations(false, series[0]);
                    }
                });
            }
        };
        SignalManagerWidget.prototype.dragStart = function (args) {
            var series = args.data;
            // Add possible dropLocations
            this.addDropLocations(series);
            // Update treeGrid
            this.refresh();
            var treeGridObj = this.getTreeGridObject();
            this.updateSerieSelection(treeGridObj, this._indexesDragged);
        };
        SignalManagerWidget.prototype.dragStop = function (args) {
            var series = args.data;
            // Remove possible dropLocations
            this.removeDropLocations(series);
            // Update treeGrid
            this.refresh();
            var treeGridObj = this.getTreeGridObject();
            this.updateSerieSelection(treeGridObj, this._indexesDragged);
        };
        SignalManagerWidget.prototype.dragOver = function (args) {
            var calculationInputItem = this.getCalculationInputFromDropLocation(args.currentTarget);
            if (calculationInputItem != undefined && calculationInputItem.dropPossible == true) {
                this.addHighlightedArea(args.currentTarget);
                return true;
            }
            else {
                this.resetHighlightArea();
            }
            return false;
        };
        SignalManagerWidget.prototype.drop = function (args) {
            var series = args.data[0];
            var calculationInputTarget = this.getCalculationInputFromDropLocation(args.currentTarget);
            var calculationInputDraggedItem = this.getCalculationInputDragged(series);
            if (calculationInputTarget != undefined && calculationInputTarget.dropPossible == true) {
                if (series != undefined) {
                    //Exchange of serie if the dragged serie is inside the calculator
                    if (this._currentCalculatorType == calculationInputTarget.parent && calculationInputDraggedItem != undefined) {
                        var oldValue = calculationInputTarget.value;
                        calculationInputDraggedItem.value = oldValue;
                    }
                    calculationInputTarget.value = series.name;
                }
            }
        };
        /**
         * Adds a <div> into the cell when droppable is possible and signal is being dragged over
         *
         * @private
         * @param {*} currentTarget
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.addHighlightedArea = function (currentTarget) {
            var highlightElem = $('<div id="' + this._highlightAreaId + '" style=" pointer-events:none; position:absolute; " class="draggedOver"></div>');
            this.resetHighlightArea(highlightElem);
            $(currentTarget).append(highlightElem);
            highlightElem.offset({ top: $(currentTarget).offset().top, left: $(currentTarget).offset().left });
            highlightElem.css('height', currentTarget.offsetHeight);
            highlightElem.css('width', currentTarget.offsetWidth);
        };
        /**
         * Remove all signalManager highlighted areas (except the selected one)
         *
         * @private
         * @param {JQuery<HTMLElement>} [element]
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.resetHighlightArea = function (element) {
            var highlightElem = $('#' + this._highlightAreaId);
            for (var i = 0; i < highlightElem.length; i++) {
                if (element == undefined || highlightElem[i] != element[0]) {
                    highlightElem[i].remove();
                }
            }
        };
        SignalManagerWidget.prototype.getCalculationInputFromDropLocation = function (currentTarget) {
            var record = this.getTreeRecord(currentTarget);
            if (record != undefined) {
                if (record.item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData && currentTarget.classList.value.includes('dropLocationArea')) {
                    return record.item;
                }
            }
            return undefined;
        };
        SignalManagerWidget.prototype.getCalculationInputDragged = function (serie) {
            if (this._currentCalculatorType != undefined) {
                for (var i = 0; i < this._currentCalculatorType.getChilds().length; i++) {
                    if (this._currentCalculatorType.getChilds()[i].serie == serie) {
                        return this._currentCalculatorType.getChilds()[i];
                    }
                }
            }
            return undefined;
        };
        //#endregion
        /**
         * Creates the layout of the widget
         *
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createLayout = function () {
            this.mainDiv.style.overflow = "hidden";
            _super.prototype.createLayout.call(this);
        };
        SignalManagerWidget.prototype.initSignalManagerDataModel = function () {
            var dataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SignalManagerDataModelId);
            this.dataModel = dataModel;
        };
        SignalManagerWidget.prototype.initSeriesProvider = function () {
            this._seriesProvider = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SeriesProviderId);
        };
        SignalManagerWidget.prototype.initChartManagerDataModel = function () {
            this._chartManagerDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ChartManagerDataModelId);
        };
        /**
         * Handles the model changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @returns {*}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            this.refresh();
            this.saveTreeGridSettings();
        };
        /**
         * Resizes the signal manager widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.resize = function (width, height) {
            if (this._isFirstResize && this.editModeActive) {
                //Deactivate editMode and set correct width when widget is initialized
                this._isFirstResize = false;
                this.activateEditMode(false);
            }
            else {
                this._isFirstResize = false;
                _super.prototype.resize.call(this, width, height);
            }
        };
        /**
     * Sets the selection to the given series
     *
     * @private
     * @param {*} treeGridObject
     * @param {Array<number>} indexes
     * @memberof SignalManagerWidget
     */
        SignalManagerWidget.prototype.updateSerieSelection = function (treeGridObject, indexes) {
            // deselect all selections in signal pane
            treeGridObject.clearSelection();
            if (indexes[0] == undefined) {
                return;
            }
            for (var i = 0; i < indexes.length; i++) {
                treeGridObject._multiSelectCtrlRequest = true;
                var visibleIndex = 0;
                for (var j = 0; j < treeGridObject.model.flatRecords.length; j++) {
                    if (j == indexes[i]) {
                        treeGridObject.selectRows(visibleIndex);
                    }
                    if (treeGridObject.model.flatRecords[j].visible != "false") {
                        visibleIndex++;
                    }
                }
            }
        };
        ;
        /**
         * Refreshes the tree grid
         *
         * @private
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.refresh = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        if (this.refreshEnabled) {
                            this.setModelWithEditSupport(this.dataModel.data);
                        }
                    }
                    catch (e) {
                        console.info("SignalManager refresh error! => TreeGrid recreation!");
                        console.info(e);
                        this.createTreeGrid();
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createTemplates = function () {
            var $widgetContainer = $(this.mainDiv);
            $widgetContainer.append(this.getColumnTemplateData(SignalManagerWidget.nameColumnId));
            $widgetContainer.append(this.getColumnTemplateData(SignalManagerWidget.colorColumnId));
        };
        /**
         * Creates the tree grid for the signal manager
         *
         * @protected
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridCellEditSupport()), this.getTreeGridDragDropSupport()), { dataSource: this.dataModel.data, childMapping: "visibleChilds", expandStateMapping: "expandState", allowReordering: false, rowHeight: 28, selectionSettings: {
                    selectionType: 'multiple'
                }, selectionType: 'multiple', expanded: function () { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function () { return _this.treeGridNodeExpandedOrCollapsed(); }, recordClick: function (args) { return _this.click(); }, recordDoubleClick: function (args) { return _this.doubleClick(args); }, rowSelected: function (args) { return _this.rowSelected(args.data.item, args.model.currentViewData); }, create: function () { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); }, queryCellInfo: function (args) { return _this.treeGridQueryCellInfo(args); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: SignalManagerWidget.nameColumnId, headerText: "Name", width: "351px", isTemplateColumn: true, templateID: "smNameColumnTemplate" },
                    { field: SignalManagerWidget.valueColumnId, headerText: "Value", visible: this.editModeActive, width: "300px", editTemplate: smTreeGridCellEditTemplate_1.SmTreeGridCellEditTemplate.createInstance(), isTemplateColumn: true },
                    { field: SignalManagerWidget.descriptionColumnId, headerText: "Description", visible: this.editModeActive, width: "100px" },
                    { field: SignalManagerWidget.colorColumnId, headerText: "Color", width: "50px", visible: this.editModeActive, editType: "DatePicker", editTemplate: smTreeGridCellEditTemplate_1.SmTreeGridCellEditTemplate.createInstance(), isTemplateColumn: true, templateID: "smColorColumnTemplate" },
                    { field: SignalManagerWidget.iconDefinitionColumnId, visible: false, width: "0px" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.treeGridColumnResized(args); },
            };
        };
        /**
         * A treegrid column was resized
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridColumnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            this.saveTreeGridSettings();
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new signalManagerTreeGridToolbar_1.SignalManagerTreeGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridCellEditSupport = function () {
            var _this = this;
            var cellEditEvents = new smTreeGridCellEditEvents_1.SmTreeGridCellEditEvents();
            return {
                editSettings: { allowEditing: true },
                beginEdit: function (args) { return cellEditEvents.beginEdit(args, _this); },
                endEdit: function (args) { return cellEditEvents.endEdit(args, _this); },
            };
        };
        /**
         * Activates the signal manager drag and drop support
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridDragDropSupport = function () {
            var _this = this;
            return {
                allowDragAndDrop: true,
                rowDragStart: function (args) { return _this.rowDragStart(args); },
            };
        };
        /**
         * Switch into "edit mode" or "normal mode"
         * if edit mode is active, the edit mode will be set to the datamodel, and the widget size will be increased
         * if normal mode is active, the normal mode will be set to the datamodel, and the widget size will be decreased
         *
         * @private
         * @param {boolean} active
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.setEditMode = function (active) {
            if (this.editModeActive != active) {
                if (active == true) {
                    this.onChangeSize(this._actualWidth + this._widthDifference);
                }
                else {
                    var newSize = this._actualWidth - this._widthDifference;
                    if (newSize < this._minWidth) {
                        newSize = this._minWidth;
                    }
                    this.onChangeSize(newSize);
                }
            }
            this.editModeActive = active;
            this.dataModel.editModeActive = this.editModeActive;
            this._toolbar.activateEditModeButton(this.editModeActive);
        };
        /**
         * Well be called after some tree grid action was started
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
                if (this.containsItemWithinRecentOrUploaded(args.deletedItems)) {
                    this.showMessageBoxForDeletingItem(args.deletedItems);
                }
                else {
                    this.deleteItems(args.deletedItems);
                }
            }
        };
        /**
         * Loads the styles for the chart manager widget
         *
         * @memberof ChartManagerWidget
         */
        SignalManagerWidget.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            _super.prototype.addStyle.call(this, "widgets/common/style/css/dropDownMenuStyle.css");
        };
        /**
         * Well be called after some tree grid action was completed
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridActionComplete = function (args) {
            // Event trigger while changing datasource dynamically. 
            // code to done after the dynamic change of datasource. 
            if (args.requestType === 'refreshDataSource') {
                this.refreshSelection();
                if (this._serieContainerToSelectAfterRefresh != undefined) {
                    // Selects the imported signalfile, or the inserted calculation, ...
                    this.selectItem(this._serieContainerToSelectAfterRefresh);
                    this._serieContainerToSelectAfterRefresh = undefined;
                }
            }
        };
        /**
         * Will be called to update the style of the give cell if a refresh will be needed
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridQueryCellInfo = function (args) {
            if (args.column.field == "name") {
                if (this.isGroupItem(args.data.item)) {
                    // Show group nodes always bold => also if they have no childs
                    if (args.cellElement.style != undefined) {
                        if (args.data.level == 0) {
                            args.cellElement.style.fontWeight = "800"; // 700 would be bold
                        }
                        else {
                            args.cellElement.style.fontWeight = "650";
                        }
                    }
                }
                // Show all nodes red which have invalid signals in it 
                if (this.isItemInvalid(args.data.item) == true) {
                    if (args.cellElement.style != undefined) {
                        args.cellElement.style.color = "red";
                        args.cellElement.style.fontWeight = "bold";
                        //args.cellElement.innerText = args.cellElement.innerText + "(invalid)";
                    }
                }
            }
            else if (args.column.field == "value") {
                if (args.data.dropPossible == true) {
                    args.cellElement.classList.add("dropLocationArea");
                }
            }
        };
        /**
         * Has the given item some data and is this data valid
         *
         * @private
         * @param {*} item
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isItemInvalid = function (item) {
            if (item instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                var calculatedSignals = item.getSeries();
                // check if a calculated output signal is invalid
                for (var i = 0; i < calculatedSignals.length; i++) {
                    if (calculatedSignals[i].rawPointsValid == false) {
                        return true;
                    }
                }
            }
            else if (item instanceof serieNode_1.SerieNode) {
                if (item.serie != undefined && item.serie.rawPointsValid == false) {
                    if (item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                        return true;
                    }
                    else {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * A drag and drop operation was started
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.rowDragStart = function (args) {
            this._indexesDragged = [];
            var selectedElements = this.checkSelectedElements(args.draggedRecords, args.draggedRow);
            if (selectedElements.length > 0) {
                this._currentDragDropSeries = selectedElements;
                // Set current drag drop signal
            }
            else {
                this._currentDragDropSeries = undefined; // Reset current drag drop signal
            }
            // Resets dragged Records because the tree grid drag drop is canceled(general drag drop is used after collection the drag object data here)
            // If dragged Records will not be resetet the next drag drop records will be added to the current records
            // args.draggedRecords = []; // Not working, we have to reset it directly in the tree grid object
            this.clearDraggedRecords();
            args.cancel = true;
        };
        SignalManagerWidget.prototype.refreshSelection = function () {
            var treeObj = $(this.mainDiv).ejTreeGrid('instance');
            // Get actual selection index
            var actualSelectedRowIndex = treeObj.model.selectedRowIndex;
            // Reset selection
            treeObj.model.selectedRowIndex = -1;
            // Set to last index if index is out of range
            if (actualSelectedRowIndex >= treeObj.model.flatRecords.length) {
                actualSelectedRowIndex = treeObj.model.flatRecords.length - 1;
            }
            // Set selection
            treeObj.model.selectedRowIndex = actualSelectedRowIndex;
            var areElementsExportable = this.canItemsBeExported(treeObj.model.flatRecords);
            // update toolbar buttons
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.flatRecords[actualSelectedRowIndex].item, areElementsExportable);
            }
            else {
                this.updateToolbarButtonStates(undefined, areElementsExportable);
            }
        };
        SignalManagerWidget.prototype.rowSelected = function (item, currentViewData) {
            var areElementsExportable = this.canItemsBeExported(currentViewData);
            this.updateToolbarButtonStates(item, areElementsExportable);
        };
        /**
         * updates the toolbar buttons(e.g. insert calulation only enabled on SerieGroup or under "Calculated signals" category)
         *
         * @private
         * @param {ISerieNode} item
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.updateToolbarButtonStates = function (item, areElementsExportable) {
            var toolbar = this._toolbar;
            if (item == undefined) {
                toolbar.disableInsertCalculationButton(true);
                toolbar.disableDeleteButton(true);
            }
            else {
                // set delete button state
                toolbar.disableDeleteButton(!item.canDelete);
                if (item instanceof serieGroup_1.SerieGroup) {
                    toolbar.disableExportButton(false);
                    toolbar.disableInsertCalculationButton(false);
                }
                else {
                    if (item.getSerieGroup() == undefined) {
                        toolbar.disableInsertCalculationButton(true);
                        toolbar.disableExportButton(true);
                    }
                    else if (item instanceof signalManagerCalculatorType_1.SignalManagerCalculatorType && item.name == 'Algorithm' || item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData && item.serie == undefined ||
                        ((item instanceof signalManagerCalculation_1.SignalManagerCalculation || item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) && (item.serie == undefined || item.serie.rawPointsValid == false))) {
                        toolbar.disableInsertCalculationButton(false);
                        toolbar.disableExportButton(true);
                    }
                    else {
                        toolbar.disableExportButton(false);
                        toolbar.disableInsertCalculationButton(false);
                    }
                }
            }
            if (areElementsExportable) {
                toolbar.disableExportButton(false);
            }
            else {
                toolbar.disableExportButton(true);
            }
        };
        SignalManagerWidget.prototype.canItemsBeExported = function (items) {
            var canBeExported = false;
            var exportHelper = new exportHelper_1.ExportHelper();
            for (var i = 0; i < items.length; i++) {
                if (exportHelper.isElementExportable(items[i].item) === true) {
                    canBeExported = true;
                    break;
                }
            }
            return canBeExported;
        };
        /**
         * A click on the tree grid (needed for reseting the current drag drop signal)
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.click = function () {
            // Reset current drag drop signal after click was finished(click up)
            this._currentDragDropSeries = undefined;
            this.focus();
        };
        /**
         * A double click on the tree grid was done
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.doubleClick = function (args) {
            if (args.cellIndex == 0) {
                var serieNode = args.data.item;
                var foundSeries = this.getSeriesFromItem(serieNode);
                if (foundSeries.length > 0) {
                    // Only one serie can be added by double click currently(TODO: add multi insert)
                    this.onSeriesDoubleClicked(foundSeries[0]);
                }
            }
        };
        /**
         * Checks if all elements selected are series and of the same type
         *
         * @private
         * @param {*} elements
         * @param {*} draggedRow
         * @returns {Array<BaseSeries>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.checkSelectedElements = function (elements, draggedRow) {
            var series = new Array();
            var items = new Array();
            var draggedRowIsSelected = false;
            var invalidSelection = false;
            if (draggedRow == undefined || draggedRow.serie == undefined) {
                return [];
            }
            var type = draggedRow.serie.type;
            for (var i = 0; i < elements.length; i = i + 1) {
                if (elements[i].serie == undefined || elements[i].serie.type != type) {
                    invalidSelection = true;
                }
                if (elements[i] == draggedRow) {
                    draggedRowIsSelected = true;
                }
                series.push(elements[i].serie);
                items.push(elements[i]);
            }
            if (draggedRow.item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                this._currentCalculatorType = draggedRow.parent;
            }
            //Once all elements have been checked, select correct elements according to the exceptions
            if (!draggedRowIsSelected) {
                series = [];
                series.push(draggedRow.serie);
                this._indexesDragged = [];
                this._indexesDragged.push(draggedRow.index);
            }
            else if (invalidSelection) {
                return [];
            }
            else {
                series = this.deleteEqualSignals(series, items);
            }
            return series;
        };
        /**
         * Delete duplicated signals from the drag&drop array
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @param {*} elements
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteEqualSignals = function (series, elements) {
            for (var i = 0; i < series.length; i++) {
                if (elements[i].item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    var selectedItems = Object.assign([], series);
                    selectedItems.splice(i, 1);
                    if (selectedItems.includes(series[i])) {
                        series.splice(i, 1);
                        elements.splice(i, 1);
                        i = -1;
                    }
                }
            }
            for (var i = 0; i < elements.length; i++) {
                this._indexesDragged.push(elements[i].index);
            }
            return series;
        };
        /**
         * Returns all series which were found in the serie node item(e.g. a normal serie or calculated series)
         *
         * @private
         * @param {*} item
         * @returns {Array<BaseSeries>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getSeriesFromItem = function (item) {
            var signals = new Array();
            if (item instanceof serieNode_1.SerieNode && item.serie != undefined) { // Is Signal node
                signals.push(item.serie);
            }
            else if (item instanceof serieContainer_1.SerieContainer) { // is calculation(group node) with signals
                return item.getSeries();
            }
            return signals;
        };
        /**
         * Is the given item a group item (e.g. needed for setting the font style to bold)
         *
         * @private
         * @param {ISerieContainer} item
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isGroupItem = function (item) {
            if (item == undefined) {
                return false;
            }
            if (item.visibleChilds != undefined) {
                return true;
            }
            return false;
        };
        SignalManagerWidget.prototype.insertCalculation = function (item) {
            if (item == undefined) {
                return;
            }
            var selectedItem = item.item;
            var serieGroup;
            if (selectedItem instanceof serieGroup_1.SerieGroup || selectedItem instanceof signalCategory_1.SignalCategory) {
                // Calculation can only be insert at groups or categories
                serieGroup = selectedItem;
            }
            else {
                serieGroup = selectedItem.getSerieGroup();
            }
            if (serieGroup != undefined) {
                this.activateEditMode(true);
                return this.addCalculationToContainer(serieGroup);
            }
            return undefined;
        };
        SignalManagerWidget.prototype.addCalculationToContainer = function (container) {
            if (this._seriesProvider == undefined) {
                return undefined;
            }
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", this._seriesProvider);
            this._serieContainerToSelectAfterRefresh = calculation;
            container.addSerieContainer(calculation, -1);
            return calculation;
        };
        SignalManagerWidget.prototype.getComponentSettings = function (onlyModified) {
            this.component.setSetting(widgetBase_1.WidgetBase.WidgetSettingId, this.getWidgetSettings());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        SignalManagerWidget.prototype.setComponentSettings = function (data) {
            _super.prototype.setComponentSettings.call(this, data);
            this.setWidgetSettings(this.component.getSetting(widgetBase_1.WidgetBase.WidgetSettingId));
        };
        SignalManagerWidget.prototype.getWidgetSettings = function () {
            var settings = { "editModeActive": this.editModeActive,
                "width": this._actualWidth
            };
            return settings;
        };
        SignalManagerWidget.prototype.setWidgetSettings = function (data) {
            if (data == undefined) {
                return;
            }
            this.editModeActive = (data["editModeActive"]);
            this._actualWidth = data["width"];
        };
        SignalManagerWidget.prototype.activateEditMode = function (activate) {
            // Show or hide edit mode columns
            var treeObject = this.getTreeGridObject();
            var valueColumn = treeObject.getColumnByField(SignalManagerWidget.valueColumnId);
            var descriptionColumn = treeObject.getColumnByField(SignalManagerWidget.descriptionColumnId);
            var colorColumn = treeObject.getColumnByField(SignalManagerWidget.colorColumnId);
            if (activate == true) {
                treeObject.showColumn(valueColumn.headerText);
                treeObject.showColumn(descriptionColumn.headerText);
                treeObject.showColumn(colorColumn.headerText);
            }
            else {
                treeObject.hideColumn(valueColumn.headerText);
                treeObject.hideColumn(descriptionColumn.headerText);
                treeObject.hideColumn(colorColumn.headerText);
            }
            this.setEditMode(activate);
            this.refresh();
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.component.id, this.getComponentSettings(true));
        };
        /**
         * Returns true if one of the items deleted has been done through the trace of mappCockpit
         *
         * @param {*} selectedItems
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.containsItemWithinRecentOrUploaded = function (selectedItems) {
            for (var i = 0; i < selectedItems.length; i++) {
                if (this.isItemInSignalCategory(selectedItems[i].item, signalCategory_1.SignalCategory.CategoryIdUploaded) || this.isItemInSignalCategory(selectedItems[i].item, signalCategory_1.SignalCategory.CategoryIdRecent)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns true if the item selected belongs to the signal category selected
         *
         * @private
         * @param {ISerieNode | ISerieContainer} item
         * @param {string} signalCategoryId
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isItemInSignalCategory = function (item, signalCategoryId) {
            var parent = item.parent;
            if (parent instanceof signalCategory_1.SignalCategory && parent.id == signalCategoryId) {
                return true;
            }
            else if (!(parent instanceof signalRoot_1.SignalRoot)) {
                return this.isItemInSignalCategory(parent, signalCategoryId);
            }
            else {
                return false;
            }
        };
        /**
         * Shows message box according to type
         *
         * @private
         * @param {messageBoxType} type
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBox = function (type, fileContents) {
            if (type === alertDialog_1.messageBoxType.Warning) {
                this.showWarningWhenImportingFiles();
            }
            else if (type === alertDialog_1.messageBoxType.YesNo) {
                this.showMessageBoxWhenImportingMCEFiles(fileContents);
            }
        };
        /**
         * Creates a warning message when the user imports a .mce file and other files too
         *
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showWarningWhenImportingFiles = function () {
            new alertDialog_1.AlertDialog().createMessageBox(this._warningImportingHeader, this._warningImportingContent, alertDialog_1.messageBoxType.Warning, undefined);
        };
        /**
         * Creates a message box that lets user decide to delete selected data or not
         *
         * @param {*} deletedItems
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBoxForDeletingItem = function (deletedItems) {
            var deferred = jQuery.Deferred();
            var self = this;
            new alertDialog_1.AlertDialog().createMessageBox(this._deleteItemsHeader, this._deleteItemsContent, alertDialog_1.messageBoxType.CancelDelete, deferred);
            $.when(deferred).done(function () {
                self.deleteItems(deletedItems);
            });
        };
        /**
         * Creates a message box that lets user decide to import .mce file nad delete all data or not
         *
         * @private
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBoxWhenImportingMCEFiles = function (fileContents) {
            var deferred = jQuery.Deferred();
            var self = this;
            new alertDialog_1.AlertDialog().createMessageBox(this._MCEFilesImportedHeader, this._MCEFilesImportedContent, alertDialog_1.messageBoxType.YesNo, deferred);
            $.when(deferred).done(function () {
                self.startImport(fileContents);
            });
        };
        /**
         * Delete selected items
         *
         * @param {*} items
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteItems = function (items) {
            this.enableTreeGridRefresh(false);
            for (var i = 0; i < items.length; i++) {
                this.deleteItem(items[i].item);
            }
            this.enableTreeGridRefresh(true);
            //Refresh treegrid just when all items have been deleted
            this.refresh();
        };
        /**
         * Delete a specific item
         *
         * @private
         * @param {*} item
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteItem = function (item) {
            if (item.canDelete) {
                if (item instanceof serieContainer_1.SerieContainer && !(item instanceof signalManagerCalculation_1.SignalManagerCalculation)) {
                    this.removeSerieContainer(item);
                }
                else {
                    this.removeSerieNode(item);
                }
            }
        };
        /**
         *  Remove the signal container with all sub containers and signals from datamodel
         *
         * @private
         * @param {ISerieContainer} serieGroup
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.removeSerieContainer = function (serieGroup) {
            this._dataModel.removeSerieContainer(serieGroup);
        };
        /**
         * Removes the signal from datamodel
         *
         * @private
         * @param {ISerieNode} serieNode
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.removeSerieNode = function (serieNode) {
            this._dataModel.removeSerieNode(serieNode);
        };
        /**
         * Exports a serieGroup
         *
         * @public
         * @param {Array<ExportSerieGroup>} elements
         * @memberof SignalManagerTreeGrid
         */
        SignalManagerWidget.prototype.exportSerieGroup = function (elements) {
            var _this = this;
            this.setBusyInformation(new busyInformation_1.BusyInformation("Exporting data...", busyInformation_1.ImageId.defaultImage, 48, true));
            this.setBusy(true);
            // Timeout needed to show the busyscreen before exporting data 
            setTimeout(function () { return _this.exportCsvData(elements); }, 200);
        };
        /**
         * Opens a file select dialog and imports a serieGroup from the file
         *
         * @public
         * @memberof SignalManagerTreeGrid
         */
        SignalManagerWidget.prototype.importSerieGroup = function () {
            this._serieContainerToSelectAfterRefresh = undefined;
            this._fileProvider.eventUploadDataFinished.attach(this._uploadDataFinishedHandler);
            this._fileProvider.uploadData(".csv, .mce, .mce1", true); // Only show/accept *.csv, *.mce, *.mce1 files
        };
        SignalManagerWidget.prototype.exportSignalManagerData = function () {
            var _this = this;
            this.setBusyInformation(new busyInformation_1.BusyInformation("Exporting data...", busyInformation_1.ImageId.defaultImage, 48, true));
            this.setBusy(true);
            // Timeout needed to show the busyscreen before exporting data 
            setTimeout(function () { return _this.exportData(); }, 200);
        };
        /**
         * Occurs after reading data from file(trace import data)
         *
         * @private
         * @param {HTMLInputElement} sender
         * @param {Map<string, string>} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onUploadDataFinished = function (args) {
            this.setBusyInformation(new busyInformation_1.BusyInformation("Importing data...", busyInformation_1.ImageId.defaultImage, 48, true));
            var msgBoxType = this.checkMessageBoxType(args);
            if (msgBoxType != undefined) {
                this.showMessageBox(msgBoxType, args);
            }
            else {
                this.startImport(args);
            }
            this._fileProvider.eventUploadDataFinished.detach(this._uploadDataFinishedHandler);
        };
        /**
         * Exports the given signal group to TraceData.csv file
         *
         * @private
         * @param { Array<ExportSerieGroup>} elements
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.exportCsvData = function (elements) {
            var data;
            if (this._seriesProvider != undefined) {
                data = new exportImportHelper_1.ExportImportHelper(this._seriesProvider).exportTraceData(elements);
            }
            else {
                console.error("SeriesProvider is not available!");
            }
            if (data !== undefined) {
                var blob = new Blob([data], { type: "text/csv" });
                fileProvider_1.FileProvider.downloadData("TraceData.csv", blob);
            }
            this.setBusy(false);
        };
        /**
         * Exports the signal manager data(datamodel, series provider, ...)
         *
         * @private
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.exportData = function () {
            if (this._seriesProvider != undefined) { // SeriesProvider needed to export data
                try {
                    var components = this.getComponentsToExport();
                    var settingObjects = this.getSettingObjectsToExport();
                    var stringData = mceExportImportHelper_1.MceExportImportHelper.getExportData(components, settingObjects);
                    var blob = new Blob([stringData], { type: "text/html" });
                    fileProvider_1.FileProvider.downloadData("Export.mce1", blob);
                }
                catch (e) {
                    if (e instanceof Error && mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                        console.error(e.toString());
                    }
                    else {
                        console.error(e);
                    }
                }
            }
            else {
                console.error("SeriesProvider for export not available!");
            }
            this.setBusy(false);
        };
        /**
         * Returns the components in a defined order which should be cleared before importing new setting
         *
         * @private
         * @returns {Array<IComponent>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getComponentsToClear = function () {
            var componentsToClear = new Array();
            componentsToClear.push(this.dataModel); // SignalManagerDataModel
            if (this._chartManagerDataModel != undefined) {
                componentsToClear.push(this._chartManagerDataModel); // ChartManagerDataModel
            }
            if (this._seriesProvider != undefined) {
                componentsToClear.push(this._seriesProvider); // SeriesProvider must be imported first
            }
            return componentsToClear;
        };
        /**
         * Returns the components which should be exported/imported from the mce file in the given order
         *
         * @private
         * @returns {Array<IComponent>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getComponentsToExport = function () {
            var exportComponents = new Array();
            if (this._seriesProvider != undefined) {
                exportComponents.push(this._seriesProvider); // SeriesProvider must be imported first
            }
            exportComponents.push(this.dataModel); // SignalManagerDataModel
            if (this._chartManagerDataModel != undefined) {
                exportComponents.push(this._chartManagerDataModel); // ChartManagerDataModel
            }
            return exportComponents;
        };
        /**
         * Returns all settings objects which should be exported
         *
         * @private
         * @returns {Array<ISettingsObject>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getSettingObjectsToExport = function () {
            var settingsObjects = new Array();
            // get current cursorstates
            var cursorstates = componentDataHub_1.ComponentDataHub.readShared(this, bindingIds_1.TraceViewBinding.CursorStates.scope, bindingIds_1.TraceViewBinding.CursorStates.id, cursorStates_1.CursorStates);
            settingsObjects.push(cursorstates);
            return settingsObjects;
        };
        /**
         * Sets the busy screen and start importing data
         *
         * @private
         * @param {Map<string, string>} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.startImport = function (args) {
            var _this = this;
            this.setBusy(true);
            // Timeout needed to show the busyscreen before importing data 
            setTimeout(function () { return _this.importData(args); }, 200);
        };
        /**
         * imports the given filedata with the given filename to the signal manager datamodel
         *
         * @private
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.importData = function (fileContents) {
            var _this = this;
            fileContents.forEach(function (fileData, filename) {
                if (filename.toLowerCase().endsWith(".csv")) {
                    if (_this._seriesProvider != undefined) {
                        var exportImportHelper = new exportImportHelper_1.ExportImportHelper(_this._seriesProvider);
                        var serieGroups = exportImportHelper.importTraceData(fileData, filename);
                        var signalFile_1 = new serieContainer_1.SerieContainer(filename);
                        _this.setContainerId(signalFile_1);
                        serieGroups.forEach(function (serieGroup) {
                            signalFile_1.addSerieContainer(serieGroup, -1);
                        });
                        _this._serieContainerToSelectAfterRefresh = signalFile_1;
                        _this._dataModel.addSerieContainer(signalFile_1, signalCategory_1.SignalCategory.CategoryIdImported);
                    }
                    else {
                        console.error("SeriesProvider is not available!");
                    }
                }
                else if (filename.toLowerCase().endsWith(".mce")) {
                    try {
                        _this.importMCEFile(fileData, ".mce");
                    }
                    catch (e) {
                        if (e instanceof Error && mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                            console.error(e.toString());
                        }
                        else {
                            console.error(e);
                        }
                    }
                }
                else if (filename.toLowerCase().endsWith(".mce1")) {
                    try {
                        _this.importMCEFile(fileData, ".mce1");
                    }
                    catch (e) {
                        if (e instanceof Error && mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                            console.error(e.toString());
                        }
                        else {
                            console.error(e);
                        }
                    }
                }
                else {
                    console.error("Import for file format not implemented: " + filename);
                }
            });
            this.setBusy(false);
        };
        /**
         * Returns type of message box need it (if need it)
         *
         * @private
         * @param {Map<string, string>} fileContents
         * @returns {(messageBoxType | undefined)}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.checkMessageBoxType = function (fileContents) {
            var isSignalManagerEmpty = this.isSignalManagerEmpty(this.dataModel.data);
            var isThereMCEFile = false;
            fileContents.forEach(function (fileData, filename) {
                if (filename.toLowerCase().endsWith(".mce") || filename.toLowerCase().endsWith(".mce1")) {
                    isThereMCEFile = true;
                }
            });
            if (isThereMCEFile && fileContents.size > 1) {
                return alertDialog_1.messageBoxType.Warning;
            }
            else if (isThereMCEFile && !isSignalManagerEmpty) {
                return alertDialog_1.messageBoxType.YesNo;
            }
            else {
                return undefined;
            }
        };
        /**
         * Returns true if there is nothing in the signalManager
         *
         * @private
         * @param {*} data
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isSignalManagerEmpty = function (data) {
            var isEmpty = true;
            for (var i = 0; i < data.length; i++) {
                if (data[i].childs.length > 0) {
                    isEmpty = false;
                    break;
                }
            }
            return isEmpty;
        };
        /**
         * Deletes all trace data and imports the .mce file
         *
         * @private
         * @param {*} data
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.importMCEFile = function (fileData, fileEnding) {
            if (this._seriesProvider) { // serie provider needed to import data
                this.enableTreeGridRefresh(false);
                // Clear components with the given order
                var componentsToClear = this.getComponentsToClear();
                mceExportImportHelper_1.MceExportImportHelper.clearComponents(componentsToClear);
                if (fileEnding === ".mce1" || fileEnding === ".mce") {
                    var settingsMap = mceExportImportHelper_1.MceExportImportHelper.readFileContent(fileData, fileEnding);
                    var components = this.getComponentsToExport(); // Import and Export components are the same so we can use the export components array
                    //let settingObjects = this.getSettingObjectsToExport(); // Import and Export objects are the same so we can use the export settings object array
                    // MceExportImportHelper.setImportData(components, settingObjects, settingsMap);
                    mceExportImportHelper_1.MceExportImportHelper.setImportData(components, settingsMap);
                }
                this.enableTreeGridRefresh(true);
                this.refresh();
            }
            else {
                console.error("SeriesProvider for import not available!");
            }
        };
        /**
         * Selects the given container in the tree grid and scrolls to it if out of the window (TODO: Move to BaseClass incl. _serieContainerToSelectAfterRefresh)
         *
         * @private
         * @param {(ISerieContainer|undefined)} container
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.selectItem = function (container) {
            var treeObject = this.getTreeGridObject();
            var record = treeObject.model.flatRecords.filter(function (record) { return record.item === container; })[0];
            if (record != undefined) {
                // expand parent node if it is collapsed to see the new imported trace data
                if (record.parentItem.expandState == false) {
                    treeObject.expandCollapseRow(record.parentItem.index);
                }
                // treeObject.scrollOffset not possible if there would be some free space after the last item in the tree grid after scrolling to the given item
                // => scrollToBottom befor scroll to a special offset if possible
                treeObject.scrollToBottom();
                treeObject.setModel({ "selectedRowIndex": record.index });
                var rowHeight = treeObject.model.rowHeight;
                // scroll index not the same as the selectedIndex => collapsed nodes must be considered
                var scrollIndex = this.getScrollIndex(treeObject.model.flatRecords, record.index);
                var scrollOffset = (scrollIndex - 1) * rowHeight;
                treeObject.scrollOffset(0, scrollOffset); // Use parent index to see the parent node in the view
                //(<any>treeObject).updateScrollBar();
            }
        };
        /**
         * Returns the index of only the visible(expanded) rows
         *
         * @private
         * @param {Array<any>} rows
         * @param {number} rowIndex
         * @returns {number}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getScrollIndex = function (rows, rowIndex) {
            var scrollIndex = 0;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].index == rowIndex) {
                    scrollIndex++;
                    return scrollIndex;
                }
                /*if(rows[i].item instanceof SerieGroup){
                    if(this.isVisibleSerieGroupNode(rows[i]) == false){
                        continue;
                    }
                    scrollIndex++;
                }
                else */ if (rows[i].item instanceof serieContainer_1.SerieContainer) {
                    if (this.isVisibleSerieGroupNode(rows[i]) == false) {
                        continue;
                    }
                    scrollIndex++;
                }
                else if (rows[i].item instanceof serieNode_1.SerieNode) {
                    if (this.isVisibleSerieNode(rows[i]) == false) {
                        continue;
                    }
                    scrollIndex++;
                }
            }
            return scrollIndex;
        };
        /**
         * Set unique id for imported data
         *
         * @private
         * @param {SerieContainer} serieContainer
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.setContainerId = function (serieContainer) {
            serieContainer.id = this.getUniqueId();
        };
        /**
         * Returns a unique id for the imported serieContainer
         *
         * @private
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getUniqueId = function () {
            var importedDataIds = this.getImportedDataIds();
            for (var i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
                var id = i.toString();
                if (importedDataIds.includes(id) == false) {
                    return id;
                }
            }
            console.error("No unique id for serieContainer available!");
            return "";
        };
        /**
         * Returns an array of all ids from the imported from file category
         *
         * @private
         * @returns {Array<string>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getImportedDataIds = function () {
            var ids = [];
            var signalCategory = this._dataModel.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdImported);
            signalCategory.getChilds().forEach(function (child) {
                ids.push(child.id);
            });
            return ids;
        };
        SignalManagerWidget.prototype.isVisibleSerieGroupNode = function (node) {
            if (node.parentItem != null) {
                if (node.parentItem.expandState == false) {
                    return false;
                }
                else if (node.parentItem.parentItem != undefined) {
                    if (node.parentItem.parentItem.expandState == false) {
                        return false;
                    }
                }
            }
            return true;
        };
        SignalManagerWidget.prototype.isVisibleSerieNode = function (node) {
            if (node.parentItem.expandState == false || node.parentItem.parentItem.expandState == false) {
                return false;
            }
            else if (node.parentItem.parentItem.parentItem != undefined) {
                if (node.parentItem.parentItem.parentItem.expandState == false) {
                    return false;
                }
            }
            return true;
        };
        SignalManagerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
            //Persist data model (expandState)
            if (this._dataModel !== undefined) {
                this._dataModel.saveSettings();
            }
            this.saveTreeGridSettings();
        };
        /**
         * Returns the column template informations
         *
         * @private
         * @param {string} columnId
         * @returns {string}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getColumnTemplateData = function (columnId) {
            if (columnId == SignalManagerWidget.colorColumnId) {
                return "<script type=\"text/x-jsrender\" id=\"smColorColumnTemplate\">\n\t\t\t\t\t\t<div style='height:20px;padding-left:7px;padding-top:4px;' unselectable='on'>\n\t\t\t\t\t\t\t<div class='e-cell' style='display:inline-block;width:17px;height:17px;background-color: {{:#data['color']}};' unselectable='on'></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</script>";
            }
            else if (columnId == SignalManagerWidget.nameColumnId) {
                return "<script type=\"text/x-jsrender\" id=\"smNameColumnTemplate\">\n\t\t\t\t\t\t<div style='height:20px;' unselectable='on'>\n\t\t\t\t\t\t\t{{if hasChildRecords}}\n\t\t\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*10}}px; display:inline-block;'></div>\n\t\t\t\t\t\t\t{{else !hasChildRecords}}\n\t\t\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*10}}px; display:inline-block;'></div>\n\t\t\t\t\t\t\t{{/if}}\n\t\t\t\t\t\t\t{{:#data['iconDefinition']}}\n\t\t\t\t\t\t\t<div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['name']}}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</script>";
            }
            return "";
        };
        /**
         * Raises the series double click event
         *
         * @private
         * @param {BaseSeries} series
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onSeriesDoubleClicked = function (series) {
            this.eventSerieDoubleClicked.raise(this, series);
        };
        /**
         * Raises the change size event
         *
         * @private
         * @param {number} size
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onChangeSize = function (size) {
            this.eventChangeSize.raise(this, size);
        };
        /**
         * Mouse is not over signalManager while dragging operation
         *
         * @param {DragDropArgs} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.dropFocusLost = function (args) {
            this.resetHighlightArea();
        };
        // column definitions
        SignalManagerWidget.nameColumnId = "name";
        SignalManagerWidget.valueColumnId = "value";
        SignalManagerWidget.descriptionColumnId = "description";
        SignalManagerWidget.colorColumnId = "color";
        SignalManagerWidget.iconDefinitionColumnId = "iconDefinition";
        return SignalManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.SignalManagerWidget = SignalManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3NpZ25hbE1hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBK0NBO1FBQXNDLDJDQUE0QztRQUFsRjs7UUFBb0YsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FBQyxBQUFyRixDQUFzQyxtQkFBVSxHQUFxQztJQUFBLENBQUM7SUFDdEY7UUFBOEIsbUNBQXdDO1FBQXRFOztRQUF3RSxDQUFDO1FBQUQsc0JBQUM7SUFBRCxDQUFDLEFBQXpFLENBQThCLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUUxRTtRQUFrQyx1Q0FBa0I7UUFBcEQ7WUFBQSxxRUF1cURDO1lBOXBEaUIsc0JBQWdCLEdBQUcsMkJBQTJCLENBQUM7WUFFL0MseUJBQW1CLEdBQUcsd0RBQXdELENBQUM7WUFDL0Usd0JBQWtCLEdBQUcsdUJBQXVCLENBQUM7WUFDN0MsNkJBQXVCLEdBQUcsaUJBQWlCLENBQUE7WUFDM0MsOEJBQXdCLEdBQUcsK0VBQStFLENBQUE7WUFDMUcsNkJBQXVCLEdBQUcsd0JBQXdCLENBQUM7WUFDbkQsOEJBQXdCLEdBQUcsZ0VBQWdFLENBQUM7WUFFckcsb0JBQWMsR0FBWSxJQUFJLENBQUM7WUFFL0IscUJBQWUsR0FBa0IsRUFBRSxDQUFDO1lBUXBDLG1CQUFhLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFNcEMsb0JBQWMsR0FBWSxLQUFLLENBQUM7WUFFL0Isc0JBQWdCLEdBQVcsR0FBRyxDQUFDO1lBQy9CLGVBQVMsR0FBVyxHQUFHLENBQUM7WUFJaEMsNkJBQXVCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1lBRXhELHFCQUFlLEdBQUcs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aUNBQWEsR0FBRyxPQUFPLENBQUM7UUFDeEIsdUNBQW1CLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLGlDQUFhLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLDBDQUFzQixHQUFHLGdCQUFnQixDQUFDO1FBZ3FEbEUsMEJBQUM7S0FBQSxBQXZxREQsQ0FBa0MsdUNBQWtCLEdBdXFEbkQ7SUFFUSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUdyb3VwIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2lnbmFsL3NlcmllR3JvdXBcIjtcclxuaW1wb3J0IHsgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwsIElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgU21UcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy9zbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHNcIjtcclxuaW1wb3J0IHsgU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUgfSBmcm9tIFwiLi92aWV3L3NtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L3NpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgRmlsZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9maWxlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV4cG9ydEltcG9ydEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZXhwb3J0SW1wb3J0SGVscGVyXCI7XHJcbmltcG9ydCB7IEJ1c3lJbmZvcm1hdGlvbiwgSW1hZ2VJZCB9IGZyb20gXCIuLi9jb21tb24vYnVzeUluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IElTaWduYWxNYW5hZ2VyV2lkZ2V0IH0gZnJvbSBcIi4uL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblwiO1xyXG5pbXBvcnQgeyBJU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZU5vZGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZUNvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBTZXJpZU5vZGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVOb2RlXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YUlkLCBJRHJvcHBhYmxlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2Ryb3BJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSURyYWdnYWJsZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9kcmFnSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YU9iamVjdCB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0RhdGFPYmplY3RcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllcy9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wUmVwcmVzZW50YXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL2RyYWdEcm9wUmVwcmVzZW50YXRpb25cIjtcclxuaW1wb3J0IHsgRHJhZ0Ryb3BBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRHJvcEFyZ3NcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgRXhwb3J0U2VyaWVHcm91cCB9IGZyb20gXCIuLi8uLi9jb21tb24vZXhwb3J0U2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBFeHBvcnRIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJzL2V4cG9ydEhlbHBlclwiO1xyXG5pbXBvcnQgeyBBbGVydERpYWxvZywgbWVzc2FnZUJveFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2FsZXJ0RGlhbG9nXCI7XHJcbmltcG9ydCB7IFNpZ25hbFJvb3QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsUm9vdFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUltYWdlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvaW1hZ2VQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQZXJzaXN0RGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9wZXJzaXN0RGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE1jZUNvbnZlcnNpb25FcnJvciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbWNlQ29udmVyc2lvbkVycm9yXCI7XHJcbmltcG9ydCB7IE1jZUV4cG9ydEltcG9ydEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vbWNlRXhwb3J0SW1wb3J0L21jZUV4cG9ydEltcG9ydEhlbHBlclwiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2ludGVyZmFjZXMvY29tcG9uZW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5nc09iamVjdCB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc09iamVjdEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREYXRhSHViIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvY29tcG9uZW50RGF0YUh1YlwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgVHJhY2VWaWV3QmluZGluZyB9IGZyb20gXCIuLi90cmFjZVZpZXdXaWRnZXQvYmluZGluZ0lkc1wiO1xyXG5cclxuY2xhc3MgRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElTaWduYWxNYW5hZ2VyV2lkZ2V0LCBCYXNlU2VyaWVzPnsgfTtcclxuY2xhc3MgRXZlbnRDaGFuZ2VTaXplIGV4dGVuZHMgVHlwZWRFdmVudDxJU2lnbmFsTWFuYWdlcldpZGdldCwgbnVtYmVyPnsgfTtcclxuXHJcbmNsYXNzIFNpZ25hbE1hbmFnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJU2lnbmFsTWFuYWdlcldpZGdldCwgSURyYWdnYWJsZSwgSURyb3BwYWJsZXtcclxuXHRcclxuXHQvLyBjb2x1bW4gZGVmaW5pdGlvbnNcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG5hbWVDb2x1bW5JZCA9IFwibmFtZVwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdmFsdWVDb2x1bW5JZCA9IFwidmFsdWVcIjtcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uQ29sdW1uSWQgPSBcImRlc2NyaXB0aW9uXCI7XHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBjb2xvckNvbHVtbklkID0gXCJjb2xvclwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaWNvbkRlZmluaXRpb25Db2x1bW5JZCA9IFwiaWNvbkRlZmluaXRpb25cIjtcclxuXHJcblx0cHJpdmF0ZSByZWFkb25seSBfaGlnaGxpZ2h0QXJlYUlkID0gXCJzaWduYWxNYW5hZ2VyX0hpZ2hsaWdodGVkXCI7XHJcblxyXG5cdHByaXZhdGUgcmVhZG9ubHkgX2RlbGV0ZUl0ZW1zQ29udGVudCA9IFwiVGhpcyBhY3Rpb24gd2lsbCBwZXJtYW5lbnRseSBkZWxldGUgc2VsZWN0ZWQgZWxlbWVudHMuXCI7XHJcblx0cHJpdmF0ZSByZWFkb25seSBfZGVsZXRlSXRlbXNIZWFkZXIgPSBcIkRlbGV0ZSByZWNvcmRlZCBkYXRhP1wiO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgX3dhcm5pbmdJbXBvcnRpbmdIZWFkZXIgPSBcIkltcG9ydCBjYW5jZWxlZFwiXHJcblx0cHJpdmF0ZSByZWFkb25seSBfd2FybmluZ0ltcG9ydGluZ0NvbnRlbnQgPSBcIkl0IGlzIG5vdCBwb3NzaWJsZSB0byBpbXBvcnQgb25lIC5tY2UgZmlsZSB3aXRoIG90aGVyIGZpbGVzIGF0IHRoZSBzYW1lIHRpbWUuXCIgXHJcblx0cHJpdmF0ZSByZWFkb25seSBfTUNFRmlsZXNJbXBvcnRlZEhlYWRlciA9IFwiRGVsZXRlIGFsbCB0cmFjZSBkYXRhP1wiO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgX01DRUZpbGVzSW1wb3J0ZWRDb250ZW50ID0gXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgYWxsIHRyYWNlIGRhdGEgYW5kIGltcG9ydCB0aGUgLm1jZSBmaWxlP1wiO1xyXG5cclxuXHRwcml2YXRlIF9pc0ZpcnN0UmVzaXplOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfaW5kZXhlc0RyYWdnZWQ6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcblx0cHJpdmF0ZSBfY3VycmVudERyYWdEcm9wU2VyaWVzPzogQXJyYXk8QmFzZVNlcmllcz47XHJcblxyXG5cdHByaXZhdGUgX2N1cnJlbnRDYWxjdWxhdG9yVHlwZT86IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZTtcclxuXHJcblx0cHJpdmF0ZSBfc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaDogSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZDtcclxuXHRcdFxyXG5cdHByaXZhdGUgX2ZpbGVQcm92aWRlciA9IG5ldyBGaWxlUHJvdmlkZXIoKTtcclxuXHJcblx0cHJpdmF0ZSBfc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcnx1bmRlZmluZWQ7XHJcblxyXG5cdHByaXZhdGUgX2NoYXJ0TWFuYWdlckRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbHx1bmRlZmluZWQ7XHJcblxyXG5cdHB1YmxpYyBlZGl0TW9kZUFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwcml2YXRlIF93aWR0aERpZmZlcmVuY2U6IG51bWJlciA9IDQ1MDtcclxuXHRwcml2YXRlIF9taW5XaWR0aDogbnVtYmVyID0gMjUwO1xyXG5cclxuXHRfY3VycmVudFRhcmdldDtcclxuXHJcblx0ZXZlbnRTZXJpZURvdWJsZUNsaWNrZWQgPSBuZXcgRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQoKTtcclxuXHRcclxuXHRldmVudENoYW5nZVNpemUgPSBuZXcgRXZlbnRDaGFuZ2VTaXplKCk7XHJcblx0XHJcblx0cHJpdmF0ZSBfdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25VcGxvYWREYXRhRmluaXNoZWQoYXJncyk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGluZm9ybWF0aW9uIGlmIHRoZSBhdXRvIHVwbG9hZCBvZiB0cmFjZWRhdGEgaXMgYWN0aXZlXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdGdldCBhdXRvVXBsb2FkQWN0aXZlKCk6Ym9vbGVhbntcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBoZWlnaHQgb2YgdGhlIGhlYWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWZpbmVIZWFkZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHRcclxuXHRpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcblx0XHR0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcblx0fVxyXG5cdFxyXG5cdGluaXRpYWxpemVkKCl7XHJcblx0XHRzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuXHRcdHRoaXMuaW5pdFNpZ25hbE1hbmFnZXJEYXRhTW9kZWwoKTtcclxuXHRcdHRoaXMuaW5pdFNlcmllc1Byb3ZpZGVyKCk7XHJcblx0XHR0aGlzLmluaXRDaGFydE1hbmFnZXJEYXRhTW9kZWwoKTsgXHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdFxyXG5cdFx0c3VwZXIuc2V0SGVhZGVyQ29udGVudChcIlNpZ25hbHNcIik7XHJcblxyXG5cdFx0Ly8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcblx0XHRzdXBlci5zZXREeW5hbWljQ29sdW1uKDAsIDQwKTtcclxuXHJcblx0XHQvLyBJbml0aWFsaXplIHNjcm9sbGJhcnMgcG9zaXRpb25zXHJcblx0XHRsZXQgc2Nyb2xsYmFyU2V0dGluZ3MgPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFRyZWVHcmlkV2lkZ2V0QmFzZS5TY3JvbGxiYXJzU2V0dGluZ3NJZCk7XHJcblx0XHR0aGlzLnNldFNjcm9sbEJhclNldHRpbmdzKHNjcm9sbGJhclNldHRpbmdzKTtcclxuXHRcdFxyXG5cdFx0Ly8gQWRkIGRyYWcgc3VwcG9ydFxyXG5cdFx0c3VwZXIuYWRkRHJhZ2dpbmdTdXBwb3J0KCk7XHJcblx0XHRcclxuXHRcdC8vIEFkZCBkcm9wIHN1cHBvcnRcclxuXHRcdHN1cGVyLmFkZFN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKERyYWdEcm9wRGF0YUlkLnNpZ25hbClcclxuXHR9XHJcblxyXG5cdGRpc3Bvc2UoKXtcclxuXHRcdHRoaXMucmVtb3ZlU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoRHJhZ0Ryb3BEYXRhSWQuc2lnbmFsKTtcclxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcclxuXHR9XHJcblx0IFxyXG5cdC8vI3JlZ2lvbiBkcmFnIHN1cHBvcnRcclxuXHRzdGFydERyYWdnaW5nKCk6IERyYWdEcm9wRGF0YU9iamVjdHx1bmRlZmluZWR7XHJcblx0XHRpZih0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXMgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IHNpZ25hbEltYWdlLFxyXG5cdFx0XHRcdHNpZ25hbE5hbWU7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgaW1hZ2VQcm92aWRlciA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5JbWFnZVByb3ZpZGVySWQpIGFzIElJbWFnZVByb3ZpZGVyO1xyXG5cdFx0XHRpZiAodGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzLmxlbmd0aCA9PSAxKSB7XHJcblx0XHRcdFx0Ly8gRGVmYXVsdCB5dCBzZXJpZXMgc3ZnXHJcblx0XHRcdFx0c2lnbmFsTmFtZSA9IHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllc1swXS5uYW1lO1xyXG5cdFx0XHRcdGlmKGltYWdlUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdHNpZ25hbEltYWdlID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AveXRTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdFx0aWYodGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS54eVNlcmllcyl7XHJcblx0XHRcdFx0XHRcdC8vIFVzZSB4eSBzZXJpZXMgc3ZnXHJcblx0XHRcdFx0XHRcdHNpZ25hbEltYWdlID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AveHlTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZih0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcyl7XHJcblx0XHRcdFx0XHRcdC8vIFVzZSBmZnQgc2VyaWVzIHN2Z1xyXG5cdFx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2ZmdFNlcmllcy5zdmdcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZihzaWduYWxJbWFnZSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0XHQvLyBSZXBsYWNlIHNlcmllIGNvbG9yIGluIHN2ZyB3aXRoIGNvbG9yIG9mIGN1cnJlbnQgc2VyaWVcclxuXHRcdFx0XHRcdFx0c2lnbmFsSW1hZ2UgPSBzaWduYWxJbWFnZS5yZXBsYWNlKFwic3Ryb2tlOiM3NmJlYTZcIiwgXCJzdHJva2U6XCIgKyB0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0uY29sb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRpZihpbWFnZVByb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHRpZih0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKXtcclxuXHRcdFx0XHRcdFx0c2lnbmFsSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9zZXZlcmFsWFlTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZih0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcyl7XHJcblx0XHRcdFx0XHRcdHNpZ25hbEltYWdlID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3Avc2V2ZXJhbEZGVFNlcmllcy5zdmdcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0c2lnbmFsSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9zZXZlcmFsWVRTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgZHJhZ0Ryb3BJY29uUmVwcmVzZW50YXRpb24gPSBuZXcgRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbigpO1xyXG5cdFx0XHRkcmFnRHJvcEljb25SZXByZXNlbnRhdGlvbi5pY29uTGlzdC5wdXNoKHNpZ25hbEltYWdlKTtcclxuXHRcdFx0ZHJhZ0Ryb3BJY29uUmVwcmVzZW50YXRpb24udGV4dExpc3QucHVzaChzaWduYWxOYW1lKTtcclxuXHRcdFx0cmV0dXJuIG5ldyBEcmFnRHJvcERhdGFPYmplY3QoRHJhZ0Ryb3BEYXRhSWQuc2lnbmFsLCB0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXMsIGRyYWdEcm9wSWNvblJlcHJlc2VudGF0aW9uKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cdFxyXG5cdGRyYWdnaW5nU3RvcHBlZCgpe1xyXG5cdFx0Ly8gUmVzZXQgY3VycmVudCBkcmFnIGRyb3Agc2lnbmFsXHJcblx0XHR0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXMgPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLl9jdXJyZW50Q2FsY3VsYXRvclR5cGUgPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLl9pbmRleGVzRHJhZ2dlZCA9IFtdO1xyXG5cdH1cclxuXHQvLyNlbmRyZWdpb25cclxuXHJcblx0Ly8jcmVnaW9uIGRyb3Agc3VwcG9ydFxyXG5cdHByaXZhdGUgYWRkRHJvcExvY2F0aW9ucyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KXtcclxuICAgICAgICBpZiAoc2VyaWVzWzBdLnBhcmVudCAhPSB1bmRlZmluZWQgJiYgc2VyaWVzLmxlbmd0aCA9PSAxKSB7XHJcblx0XHRcdHNlcmllc1swXS5wYXJlbnQudmlzaWJsZUNoaWxkcyEuZm9yRWFjaChjaGlsZCA9PiB7XHJcblx0XHRcdFx0aWYoY2hpbGQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pe1xyXG5cdFx0XHRcdFx0Y2hpbGQuc2V0RHJvcExvY2F0aW9ucyh0cnVlLCBzZXJpZXNbMF0pO1xyXG5cdFx0XHRcdH1cdFx0XHRcdFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVtb3ZlRHJvcExvY2F0aW9ucyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KXtcclxuXHRcdGlmIChzZXJpZXNbMF0ucGFyZW50ICE9IHVuZGVmaW5lZCAmJiBzZXJpZXMubGVuZ3RoID09IDEpIHtcclxuXHRcdFx0c2VyaWVzWzBdLnBhcmVudC52aXNpYmxlQ2hpbGRzIS5mb3JFYWNoKGNoaWxkID0+IHtcclxuXHRcdFx0XHRpZihjaGlsZCBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbil7XHJcblx0XHRcdFx0XHRjaGlsZC5zZXREcm9wTG9jYXRpb25zKGZhbHNlLCBzZXJpZXNbMF0pO1xyXG5cdFx0XHRcdH1cdFx0XHRcdFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGRyYWdTdGFydChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuXHRcdGxldCBzZXJpZXMgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcblx0XHRcclxuXHRcdC8vIEFkZCBwb3NzaWJsZSBkcm9wTG9jYXRpb25zXHJcblx0XHR0aGlzLmFkZERyb3BMb2NhdGlvbnMoc2VyaWVzKTtcclxuXHRcdFxyXG5cdFx0Ly8gVXBkYXRlIHRyZWVHcmlkXHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHJcblx0XHRsZXQgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHR0aGlzLnVwZGF0ZVNlcmllU2VsZWN0aW9uKHRyZWVHcmlkT2JqLCB0aGlzLl9pbmRleGVzRHJhZ2dlZCk7XHJcblx0fVxyXG5cclxuXHRkcmFnU3RvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuXHRcdGxldCBzZXJpZXMgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcblx0XHRcclxuXHRcdC8vIFJlbW92ZSBwb3NzaWJsZSBkcm9wTG9jYXRpb25zXHJcblx0XHR0aGlzLnJlbW92ZURyb3BMb2NhdGlvbnMoc2VyaWVzKTtcclxuXHJcblx0XHQvLyBVcGRhdGUgdHJlZUdyaWRcclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdFx0XHJcblx0XHRsZXQgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHR0aGlzLnVwZGF0ZVNlcmllU2VsZWN0aW9uKHRyZWVHcmlkT2JqLCB0aGlzLl9pbmRleGVzRHJhZ2dlZCk7XHJcblx0fVxyXG5cclxuXHRkcmFnT3ZlcihhcmdzOiBEcmFnRHJvcEFyZ3MpOiBib29sZWFuIHtcclxuXHRcdGxldCBjYWxjdWxhdGlvbklucHV0SXRlbSA9ICB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXRGcm9tRHJvcExvY2F0aW9uKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcblx0XHRcclxuXHRcdGlmKGNhbGN1bGF0aW9uSW5wdXRJdGVtICE9IHVuZGVmaW5lZCAmJiBjYWxjdWxhdGlvbklucHV0SXRlbS5kcm9wUG9zc2libGUgPT0gdHJ1ZSl7XHJcblx0XHRcdHRoaXMuYWRkSGlnaGxpZ2h0ZWRBcmVhKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRkcm9wKGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG5cdFx0bGV0IHNlcmllcyA9IGFyZ3MuZGF0YVswXSBhcyBCYXNlU2VyaWVzO1xyXG5cdFx0bGV0IGNhbGN1bGF0aW9uSW5wdXRUYXJnZXQgPSAgdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RnJvbURyb3BMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0bGV0IGNhbGN1bGF0aW9uSW5wdXREcmFnZ2VkSXRlbSA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERyYWdnZWQoc2VyaWVzKTtcclxuXHJcblx0XHRpZihjYWxjdWxhdGlvbklucHV0VGFyZ2V0ICE9IHVuZGVmaW5lZCAmJiBjYWxjdWxhdGlvbklucHV0VGFyZ2V0LmRyb3BQb3NzaWJsZSA9PSB0cnVlKXtcclxuXHRcdFx0aWYoc2VyaWVzICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0Ly9FeGNoYW5nZSBvZiBzZXJpZSBpZiB0aGUgZHJhZ2dlZCBzZXJpZSBpcyBpbnNpZGUgdGhlIGNhbGN1bGF0b3JcclxuXHRcdFx0XHRpZiAodGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlID09IGNhbGN1bGF0aW9uSW5wdXRUYXJnZXQucGFyZW50ICYmIGNhbGN1bGF0aW9uSW5wdXREcmFnZ2VkSXRlbSAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdGxldCBvbGRWYWx1ZSA9IGNhbGN1bGF0aW9uSW5wdXRUYXJnZXQudmFsdWU7XHJcblx0XHRcdFx0XHRjYWxjdWxhdGlvbklucHV0RHJhZ2dlZEl0ZW0hLnZhbHVlID0gb2xkVmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhbGN1bGF0aW9uSW5wdXRUYXJnZXQudmFsdWUgPSBzZXJpZXMubmFtZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIDxkaXY+IGludG8gdGhlIGNlbGwgd2hlbiBkcm9wcGFibGUgaXMgcG9zc2libGUgYW5kIHNpZ25hbCBpcyBiZWluZyBkcmFnZ2VkIG92ZXJcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBjdXJyZW50VGFyZ2V0XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGFkZEhpZ2hsaWdodGVkQXJlYShjdXJyZW50VGFyZ2V0KSB7XHJcblx0XHRsZXQgaGlnaGxpZ2h0RWxlbSA9ICQoJzxkaXYgaWQ9XCInKyB0aGlzLl9oaWdobGlnaHRBcmVhSWQgKydcIiBzdHlsZT1cIiBwb2ludGVyLWV2ZW50czpub25lOyBwb3NpdGlvbjphYnNvbHV0ZTsgXCIgY2xhc3M9XCJkcmFnZ2VkT3ZlclwiPjwvZGl2PicpO1xyXG5cdFx0dGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoaGlnaGxpZ2h0RWxlbSk7XHJcblx0XHQkKGN1cnJlbnRUYXJnZXQpLmFwcGVuZChoaWdobGlnaHRFbGVtKTtcclxuXHJcblx0XHRoaWdobGlnaHRFbGVtLm9mZnNldCh7dG9wOiAkKGN1cnJlbnRUYXJnZXQpLm9mZnNldCgpIS50b3AsIGxlZnQ6ICQoY3VycmVudFRhcmdldCkub2Zmc2V0KCkhLmxlZnR9KVxyXG5cdFx0aGlnaGxpZ2h0RWxlbS5jc3MoJ2hlaWdodCcsIGN1cnJlbnRUYXJnZXQub2Zmc2V0SGVpZ2h0KTtcclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCd3aWR0aCcsIGN1cnJlbnRUYXJnZXQub2Zmc2V0V2lkdGgpO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZSBhbGwgc2lnbmFsTWFuYWdlciBoaWdobGlnaHRlZCBhcmVhcyAoZXhjZXB0IHRoZSBzZWxlY3RlZCBvbmUpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gW2VsZW1lbnRdXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHJlc2V0SGlnaGxpZ2h0QXJlYSAoZWxlbWVudD86IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuXHRcdGxldCBoaWdobGlnaHRFbGVtID0gJCgnIycgKyB0aGlzLl9oaWdobGlnaHRBcmVhSWQpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBoaWdobGlnaHRFbGVtLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0aWYgKGVsZW1lbnQgPT0gdW5kZWZpbmVkIHx8IGhpZ2hsaWdodEVsZW1baV0gIT0gZWxlbWVudFswXSkge1xyXG5cdFx0XHRcdGhpZ2hsaWdodEVsZW1baV0ucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Q2FsY3VsYXRpb25JbnB1dEZyb21Ecm9wTG9jYXRpb24oY3VycmVudFRhcmdldCk6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YXx1bmRlZmluZWR7XHJcblx0XHRsZXQgcmVjb3JkID0gdGhpcy5nZXRUcmVlUmVjb3JkKGN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGlmKHJlY29yZCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRpZihyZWNvcmQuaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSAmJiBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC52YWx1ZS5pbmNsdWRlcygnZHJvcExvY2F0aW9uQXJlYScpKXtcclxuXHRcdFx0XHRyZXR1cm4gcmVjb3JkLml0ZW07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRDYWxjdWxhdGlvbklucHV0RHJhZ2dlZChzZXJpZTogQmFzZVNlcmllcyk6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB8IHVuZGVmaW5lZHtcclxuXHRcdGlmICh0aGlzLl9jdXJyZW50Q2FsY3VsYXRvclR5cGUgIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlIS5nZXRDaGlsZHMoKS5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0aWYgKHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSEuZ2V0Q2hpbGRzKClbaV0uc2VyaWUgPT0gc2VyaWUpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50Q2FsY3VsYXRvclR5cGUhLmdldENoaWxkcygpW2ldIGFzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHQvLyNlbmRyZWdpb25cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0Y3JlYXRlTGF5b3V0KCkge1xyXG5cdFx0dGhpcy5tYWluRGl2LnN0eWxlLm92ZXJmbG93ID1cImhpZGRlblwiO1xyXG5cdFx0c3VwZXIuY3JlYXRlTGF5b3V0KCk7XHJcblx0fVxyXG5cclxuXHRpbml0U2lnbmFsTWFuYWdlckRhdGFNb2RlbCgpIHtcclxuXHRcdGxldCBkYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU2lnbmFsTWFuYWdlckRhdGFNb2RlbElkKSBhcyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbDtcclxuXHRcdHRoaXMuZGF0YU1vZGVsID0gZGF0YU1vZGVsIGFzIElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsO1xyXG5cdH1cclxuXHJcblx0aW5pdFNlcmllc1Byb3ZpZGVyKCkge1xyXG5cdFx0dGhpcy5fc2VyaWVzUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU2VyaWVzUHJvdmlkZXJJZCkgYXMgSVNlcmllc1Byb3ZpZGVyO1xyXG5cdH1cclxuXHJcblx0aW5pdENoYXJ0TWFuYWdlckRhdGFNb2RlbCgpIHtcclxuXHRcdHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5DaGFydE1hbmFnZXJEYXRhTW9kZWxJZCkgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuXHR9XHJcblx0XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIG1vZGVsIGNoYW5nZXNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcblx0ICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGV2ZW50QXJnc1xyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0aGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpOiBhbnkge1xyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblx0XHR0aGlzLnNhdmVUcmVlR3JpZFNldHRpbmdzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNpemVzIHRoZSBzaWduYWwgbWFuYWdlciB3aWRnZXRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblx0XHRpZiAodGhpcy5faXNGaXJzdFJlc2l6ZSAmJiB0aGlzLmVkaXRNb2RlQWN0aXZlKSB7XHJcblx0XHRcdC8vRGVhY3RpdmF0ZSBlZGl0TW9kZSBhbmQgc2V0IGNvcnJlY3Qgd2lkdGggd2hlbiB3aWRnZXQgaXMgaW5pdGlhbGl6ZWRcclxuXHRcdFx0dGhpcy5faXNGaXJzdFJlc2l6ZSA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmFjdGl2YXRlRWRpdE1vZGUoZmFsc2UpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5faXNGaXJzdFJlc2l6ZSA9IGZhbHNlO1xyXG5cdFx0XHRzdXBlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQgICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGdpdmVuIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyZWVHcmlkT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGluZGV4ZXNcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlU2VyaWVTZWxlY3Rpb24odHJlZUdyaWRPYmplY3QsIGluZGV4ZXM6IEFycmF5PG51bWJlcj4pIHtcclxuICAgICAgICAvLyBkZXNlbGVjdCBhbGwgc2VsZWN0aW9ucyBpbiBzaWduYWwgcGFuZVxyXG4gICAgICAgIHRyZWVHcmlkT2JqZWN0LmNsZWFyU2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmKGluZGV4ZXNbMF0gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW5kZXhlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuX211bHRpU2VsZWN0Q3RybFJlcXVlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8ICg8YW55PnRyZWVHcmlkT2JqZWN0Lm1vZGVsKS5mbGF0UmVjb3Jkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZihqID09IGluZGV4ZXNbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNlbGVjdFJvd3ModmlzaWJsZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKCg8YW55PnRyZWVHcmlkT2JqZWN0Lm1vZGVsKS5mbGF0UmVjb3Jkc1tqXS52aXNpYmxlICE9IFwiZmFsc2VcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZWZyZXNoZXMgdGhlIHRyZWUgZ3JpZCBcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgYXN5bmMgcmVmcmVzaCgpe1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYodGhpcy5yZWZyZXNoRW5hYmxlZCl7XHJcblx0XHRcdFx0dGhpcy5zZXRNb2RlbFdpdGhFZGl0U3VwcG9ydCh0aGlzLmRhdGFNb2RlbC5kYXRhKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjYXRjaChlKXtcclxuXHRcdFx0XHRcclxuXHRcdFx0Y29uc29sZS5pbmZvKFwiU2lnbmFsTWFuYWdlciByZWZyZXNoIGVycm9yISA9PiBUcmVlR3JpZCByZWNyZWF0aW9uIVwiKTtcclxuXHRcdFx0Y29uc29sZS5pbmZvKGUpO1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5jcmVhdGVUcmVlR3JpZCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjb2x1bW4gdGVtcGxhdGVzIGZvciB0aGUgdHJlZSBncmlkIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHdpZGdldCBjb250YWluZXJcclxuXHQgKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBjcmVhdGVUZW1wbGF0ZXMoKXtcclxuXHRcdHZhciAkd2lkZ2V0Q29udGFpbmVyID0gJCh0aGlzLm1haW5EaXYpO1xyXG5cdFx0JHdpZGdldENvbnRhaW5lci5hcHBlbmQodGhpcy5nZXRDb2x1bW5UZW1wbGF0ZURhdGEoU2lnbmFsTWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQpKTtcclxuXHRcdCR3aWRnZXRDb250YWluZXIuYXBwZW5kKHRoaXMuZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKFNpZ25hbE1hbmFnZXJXaWRnZXQuY29sb3JDb2x1bW5JZCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgc2lnbmFsIG1hbmFnZXJcclxuXHQgKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpe1xyXG5cdFx0JCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG5cdFx0XHQuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG5cdFx0XHQuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG5cdFx0XHQuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcdFxyXG5cdFx0XHQuLi50aGlzLmdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCksXHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWREcmFnRHJvcFN1cHBvcnQoKSxcclxuXHRcdFxyXG5cdFx0XHRkYXRhU291cmNlOnRoaXMuZGF0YU1vZGVsLmRhdGEsXHJcblx0XHRcdGNoaWxkTWFwcGluZzpcInZpc2libGVDaGlsZHNcIixcclxuXHRcdFx0ZXhwYW5kU3RhdGVNYXBwaW5nOiBcImV4cGFuZFN0YXRlXCIsXHJcblx0XHRcdGFsbG93UmVvcmRlcmluZzogZmFsc2UsXHJcblx0XHRcdHJvd0hlaWdodDogMjgsXHJcblx0XHRcdHNlbGVjdGlvblNldHRpbmdzOntcclxuXHRcdFx0XHRzZWxlY3Rpb25UeXBlIDogJ211bHRpcGxlJyBcclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0aW9uVHlwZTogJ211bHRpcGxlJyxcclxuXHRcdFx0ZXhwYW5kZWQ6ICgpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cdFx0XHRjb2xsYXBzZWQ6ICgpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cclxuXHRcdFx0cmVjb3JkQ2xpY2s6IChhcmdzKSA9PiB0aGlzLmNsaWNrKCksXHJcblx0XHRcdHJlY29yZERvdWJsZUNsaWNrOiAoYXJncykgPT4gdGhpcy5kb3VibGVDbGljayhhcmdzKSxcclxuXHRcdFx0cm93U2VsZWN0ZWQ6IChhcmdzKSA9PiB0aGlzLnJvd1NlbGVjdGVkKGFyZ3MuZGF0YS5pdGVtLCBhcmdzLm1vZGVsLmN1cnJlbnRWaWV3RGF0YSksXHJcblx0XHRcdGNyZWF0ZTogKCkgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuXHRcdFx0YWN0aW9uQmVnaW46IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyksXHJcblx0XHRcdGFjdGlvbkNvbXBsZXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkNvbXBsZXRlKGFyZ3MpLFxyXG5cdFx0XHRxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZFF1ZXJ5Q2VsbEluZm8oYXJncyksXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y29sdW1uczogW1xyXG5cdFx0XHRcdHsgZmllbGQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgd2lkdGg6IFwiMzUxcHhcIiAsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwic21OYW1lQ29sdW1uVGVtcGxhdGVcIn0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC52YWx1ZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHZpc2libGU6IHRoaXMuZWRpdE1vZGVBY3RpdmUsIHdpZHRoOiBcIjMwMHB4XCIsIGVkaXRUZW1wbGF0ZTogU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKSwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZX0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC5kZXNjcmlwdGlvbkNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIsIHZpc2libGU6IHRoaXMuZWRpdE1vZGVBY3RpdmUsIHdpZHRoOiBcIjEwMHB4XCIgfSxcclxuXHRcdFx0XHR7IGZpZWxkOiBTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQsIGhlYWRlclRleHQ6IFwiQ29sb3JcIiwgd2lkdGg6IFwiNTBweFwiLCB2aXNpYmxlOiB0aGlzLmVkaXRNb2RlQWN0aXZlLCBlZGl0VHlwZTogXCJEYXRlUGlja2VyXCIsIGVkaXRUZW1wbGF0ZTogU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKSwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJzbUNvbG9yQ29sdW1uVGVtcGxhdGVcIn0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC5pY29uRGVmaW5pdGlvbkNvbHVtbklkLCB2aXNpYmxlOiBmYWxzZSwgd2lkdGg6IFwiMHB4XCIgfSxcclxuXHRcdFx0XSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7e319XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG5cdFx0XHRjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1uc1x0fSxcclxuXHRcdFx0Y29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAgICogQSB0cmVlZ3JpZCBjb2x1bW4gd2FzIHJlc2l6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ29sdW1uUmVzaXplZChhcmdzKXtcclxuXHRcdHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCk7XHJcblx0XHR0aGlzLnNhdmVUcmVlR3JpZFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG5cdFx0dGhpcy5fdG9vbGJhciA9IG5ldyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyKHRoaXMubWFpbkRpdik7XHRcclxuXHRcdHJldHVybiBzdXBlci5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY2VsbCBlZGl0IHNldHRpbmdzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKToge317XHJcblx0XHR2YXIgY2VsbEVkaXRFdmVudHMgPSBuZXcgU21UcmVlR3JpZENlbGxFZGl0RXZlbnRzKCk7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRlZGl0U2V0dGluZ3M6IHtcdGFsbG93RWRpdGluZzogdHJ1ZSB9LFxyXG5cdFx0XHRiZWdpbkVkaXQ6IChhcmdzKSA9PiBjZWxsRWRpdEV2ZW50cy5iZWdpbkVkaXQoYXJncywgdGhpcyksXHJcblx0XHRcdGVuZEVkaXQ6IChhcmdzKSA9PiBjZWxsRWRpdEV2ZW50cy5lbmRFZGl0KGFyZ3MsIHRoaXMpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFjdGl2YXRlcyB0aGUgc2lnbmFsIG1hbmFnZXIgZHJhZyBhbmQgZHJvcCBzdXBwb3J0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWREcmFnRHJvcFN1cHBvcnQoKToge317XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhbGxvd0RyYWdBbmREcm9wIDogdHJ1ZSxcclxuXHRcdFx0cm93RHJhZ1N0YXJ0OiAoYXJncykgPT4gdGhpcy5yb3dEcmFnU3RhcnQoYXJncyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoIGludG8gXCJlZGl0IG1vZGVcIiBvciBcIm5vcm1hbCBtb2RlXCJcclxuXHQgKiBpZiBlZGl0IG1vZGUgaXMgYWN0aXZlLCB0aGUgZWRpdCBtb2RlIHdpbGwgYmUgc2V0IHRvIHRoZSBkYXRhbW9kZWwsIGFuZCB0aGUgd2lkZ2V0IHNpemUgd2lsbCBiZSBpbmNyZWFzZWRcclxuXHQgKiBpZiBub3JtYWwgbW9kZSBpcyBhY3RpdmUsIHRoZSBub3JtYWwgbW9kZSB3aWxsIGJlIHNldCB0byB0aGUgZGF0YW1vZGVsLCBhbmQgdGhlIHdpZGdldCBzaXplIHdpbGwgYmUgZGVjcmVhc2VkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aXZlXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHNldEVkaXRNb2RlKGFjdGl2ZTpib29sZWFuKXtcclxuXHRcdGlmKHRoaXMuZWRpdE1vZGVBY3RpdmUgIT0gYWN0aXZlKXtcclxuXHRcdFx0aWYoYWN0aXZlID09IHRydWUpe1xyXG5cdFx0XHRcdHRoaXMub25DaGFuZ2VTaXplKHRoaXMuX2FjdHVhbFdpZHRoICsgdGhpcy5fd2lkdGhEaWZmZXJlbmNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGxldCBuZXdTaXplID0gdGhpcy5fYWN0dWFsV2lkdGggLSB0aGlzLl93aWR0aERpZmZlcmVuY2U7XHJcblx0XHRcdFx0aWYobmV3U2l6ZSA8IHRoaXMuX21pbldpZHRoKXtcclxuXHRcdFx0XHRcdG5ld1NpemUgPSB0aGlzLl9taW5XaWR0aDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5vbkNoYW5nZVNpemUobmV3U2l6ZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuZWRpdE1vZGVBY3RpdmUgPSBhY3RpdmU7XHJcblx0XHQodGhpcy5kYXRhTW9kZWwgYXMgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwpLmVkaXRNb2RlQWN0aXZlID0gdGhpcy5lZGl0TW9kZUFjdGl2ZTtcclxuXHJcblx0XHQodGhpcy5fdG9vbGJhciBhcyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyKS5hY3RpdmF0ZUVkaXRNb2RlQnV0dG9uKHRoaXMuZWRpdE1vZGVBY3RpdmUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2VsbCBiZSBjYWxsZWQgYWZ0ZXIgc29tZSB0cmVlIGdyaWQgYWN0aW9uIHdhcyBzdGFydGVkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3Mpe1xyXG5cdFx0Ly8gU3VwcG9ydCBcIkVudGYvRGVsXCIga2V5XHJcblx0XHRpZihhcmdzLnJlcXVlc3RUeXBlID09IFwiZGVsZXRlXCIpe1xyXG5cdFx0XHRhcmdzLmNhbmNlbCA9IHRydWU7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRhaW5zSXRlbVdpdGhpblJlY2VudE9yVXBsb2FkZWQoYXJncy5kZWxldGVkSXRlbXMpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TWVzc2FnZUJveEZvckRlbGV0aW5nSXRlbShhcmdzLmRlbGV0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUl0ZW1zKGFyZ3MuZGVsZXRlZEl0ZW1zKTtcclxuICAgICAgICAgICAgfVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgY2hhcnQgbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIubG9hZFN0eWxlcygpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL2Ryb3BEb3duTWVudVN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogV2VsbCBiZSBjYWxsZWQgYWZ0ZXIgc29tZSB0cmVlIGdyaWQgYWN0aW9uIHdhcyBjb21wbGV0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyl7IFxyXG5cdFx0Ly8gRXZlbnQgdHJpZ2dlciB3aGlsZSBjaGFuZ2luZyBkYXRhc291cmNlIGR5bmFtaWNhbGx5LiBcclxuXHRcdC8vIGNvZGUgdG8gZG9uZSBhZnRlciB0aGUgZHluYW1pYyBjaGFuZ2Ugb2YgZGF0YXNvdXJjZS4gXHJcblx0XHRpZiAoYXJncy5yZXF1ZXN0VHlwZSA9PT0gJ3JlZnJlc2hEYXRhU291cmNlJykgeyBcclxuXHRcdFx0dGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHJcblx0XHRcdGlmKHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggIT0gdW5kZWZpbmVkKXtcdFx0XHRcdFxyXG5cdFx0XHRcdC8vIFNlbGVjdHMgdGhlIGltcG9ydGVkIHNpZ25hbGZpbGUsIG9yIHRoZSBpbnNlcnRlZCBjYWxjdWxhdGlvbiwgLi4uXHJcblx0XHRcdFx0dGhpcy5zZWxlY3RJdGVtKHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2gpO1xyXG5cdFx0XHRcdHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggPSB1bmRlZmluZWQ7XHJcblx0XHRcdH1cclxuXHRcdH0gXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaWxsIGJlIGNhbGxlZCB0byB1cGRhdGUgdGhlIHN0eWxlIG9mIHRoZSBnaXZlIGNlbGwgaWYgYSByZWZyZXNoIHdpbGwgYmUgbmVlZGVkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSB0cmVlR3JpZFF1ZXJ5Q2VsbEluZm8oYXJncyl7XHJcblx0XHRpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJuYW1lXCIpe1xyXG5cdFx0XHRpZih0aGlzLmlzR3JvdXBJdGVtKGFyZ3MuZGF0YS5pdGVtKSkge1xyXG5cdFx0XHRcdC8vIFNob3cgZ3JvdXAgbm9kZXMgYWx3YXlzIGJvbGQgPT4gYWxzbyBpZiB0aGV5IGhhdmUgbm8gY2hpbGRzXHJcblx0XHRcdFx0aWYoYXJncy5jZWxsRWxlbWVudC5zdHlsZSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0aWYoYXJncy5kYXRhLmxldmVsID09IDApe1xyXG5cdFx0XHRcdFx0XHRhcmdzLmNlbGxFbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcIjgwMFwiOyAvLyA3MDAgd291bGQgYmUgYm9sZFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdFx0YXJncy5jZWxsRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCI2NTBcIjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gU2hvdyBhbGwgbm9kZXMgcmVkIHdoaWNoIGhhdmUgaW52YWxpZCBzaWduYWxzIGluIGl0IFxyXG5cdFx0XHRpZih0aGlzLmlzSXRlbUludmFsaWQoYXJncy5kYXRhLml0ZW0pID09IHRydWUpe1xyXG5cdFx0XHRcdGlmKGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG5cdFx0XHRcdFx0YXJncy5jZWxsRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XHJcblx0XHRcdFx0XHQvL2FyZ3MuY2VsbEVsZW1lbnQuaW5uZXJUZXh0ID0gYXJncy5jZWxsRWxlbWVudC5pbm5lclRleHQgKyBcIihpbnZhbGlkKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBcclxuXHRcdGVsc2UgaWYgKGFyZ3MuY29sdW1uLmZpZWxkID09IFwidmFsdWVcIil7XHJcblx0XHRcdGlmKGFyZ3MuZGF0YS5kcm9wUG9zc2libGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkcm9wTG9jYXRpb25BcmVhXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9ICAgICAgXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIYXMgdGhlIGdpdmVuIGl0ZW0gc29tZSBkYXRhIGFuZCBpcyB0aGlzIGRhdGEgdmFsaWQgXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gaXRlbVxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc0l0ZW1JbnZhbGlkKGl0ZW0pOiBib29sZWFue1xyXG5cdFx0aWYoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbil7XHJcblx0XHRcdGxldCBjYWxjdWxhdGVkU2lnbmFscyA9IGl0ZW0uZ2V0U2VyaWVzKCk7XHJcblx0XHRcdC8vIGNoZWNrIGlmIGEgY2FsY3VsYXRlZCBvdXRwdXQgc2lnbmFsIGlzIGludmFsaWRcclxuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGNhbGN1bGF0ZWRTaWduYWxzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRpZihjYWxjdWxhdGVkU2lnbmFsc1tpXS5yYXdQb2ludHNWYWxpZCA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllTm9kZSApe1xyXG5cdFx0XHRpZihpdGVtLnNlcmllICE9IHVuZGVmaW5lZCAmJiBpdGVtLnNlcmllLnJhd1BvaW50c1ZhbGlkID09IGZhbHNlKXtcclxuXHRcdFx0XHRpZihpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSl7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgZHJhZyBhbmQgZHJvcCBvcGVyYXRpb24gd2FzIHN0YXJ0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHJvd0RyYWdTdGFydChhcmdzKXtcclxuXHRcdHRoaXMuX2luZGV4ZXNEcmFnZ2VkID0gW107XHJcblx0XHRcclxuXHRcdGxldCBzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5jaGVja1NlbGVjdGVkRWxlbWVudHMoYXJncy5kcmFnZ2VkUmVjb3JkcywgYXJncy5kcmFnZ2VkUm93KTtcclxuXHRcdGlmIChzZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCA+IDAgKSB7XHJcblx0XHRcdHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcyA9IHNlbGVjdGVkRWxlbWVudHM7XHJcblx0XHRcdCAvLyBTZXQgY3VycmVudCBkcmFnIGRyb3Agc2lnbmFsXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzID0gdW5kZWZpbmVkOyAvLyBSZXNldCBjdXJyZW50IGRyYWcgZHJvcCBzaWduYWxcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZXNldHMgZHJhZ2dlZCBSZWNvcmRzIGJlY2F1c2UgdGhlIHRyZWUgZ3JpZCBkcmFnIGRyb3AgaXMgY2FuY2VsZWQoZ2VuZXJhbCBkcmFnIGRyb3AgaXMgdXNlZCBhZnRlciBjb2xsZWN0aW9uIHRoZSBkcmFnIG9iamVjdCBkYXRhIGhlcmUpXHJcblx0XHQvLyBJZiBkcmFnZ2VkIFJlY29yZHMgd2lsbCBub3QgYmUgcmVzZXRldCB0aGUgbmV4dCBkcmFnIGRyb3AgcmVjb3JkcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBjdXJyZW50IHJlY29yZHNcclxuXHRcdC8vIGFyZ3MuZHJhZ2dlZFJlY29yZHMgPSBbXTsgLy8gTm90IHdvcmtpbmcsIHdlIGhhdmUgdG8gcmVzZXQgaXQgZGlyZWN0bHkgaW4gdGhlIHRyZWUgZ3JpZCBvYmplY3RcclxuXHRcdHRoaXMuY2xlYXJEcmFnZ2VkUmVjb3JkcygpXHJcblx0XHRcclxuXHRcdGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVmcmVzaFNlbGVjdGlvbigpe1xyXG5cdFx0Y29uc3QgdHJlZU9iaiA9ICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKCdpbnN0YW5jZScpOyBcclxuXHRcdFx0XHRcdFx0XHJcblx0XHQvLyBHZXQgYWN0dWFsIHNlbGVjdGlvbiBpbmRleFxyXG5cdFx0bGV0IGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXg7XHJcblx0XHQvLyBSZXNldCBzZWxlY3Rpb25cclxuXHRcdHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IC0xO1xyXG5cdFx0XHJcblx0XHQvLyBTZXQgdG8gbGFzdCBpbmRleCBpZiBpbmRleCBpcyBvdXQgb2YgcmFuZ2VcclxuXHRcdGlmKGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPj0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgpe1xyXG5cdFx0XHRhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgtMTtcclxuXHRcdH1cclxuXHRcdC8vIFNldCBzZWxlY3Rpb25cclxuXHRcdHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IGFjdHVhbFNlbGVjdGVkUm93SW5kZXg7XHJcblx0XHRcclxuXHRcdGxldCBhcmVFbGVtZW50c0V4cG9ydGFibGUgPSB0aGlzLmNhbkl0ZW1zQmVFeHBvcnRlZCh0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzKTtcclxuXHJcblx0XHQvLyB1cGRhdGUgdG9vbGJhciBidXR0b25zXHJcblx0XHRpZih0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdLml0ZW0sIGFyZUVsZW1lbnRzRXhwb3J0YWJsZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModW5kZWZpbmVkLCBhcmVFbGVtZW50c0V4cG9ydGFibGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByb3dTZWxlY3RlZChpdGVtOiBhbnksIGN1cnJlbnRWaWV3RGF0YSl7XHJcblx0XHRsZXQgYXJlRWxlbWVudHNFeHBvcnRhYmxlID0gdGhpcy5jYW5JdGVtc0JlRXhwb3J0ZWQoY3VycmVudFZpZXdEYXRhKTtcclxuXHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhpdGVtLCBhcmVFbGVtZW50c0V4cG9ydGFibGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogdXBkYXRlcyB0aGUgdG9vbGJhciBidXR0b25zKGUuZy4gaW5zZXJ0IGNhbHVsYXRpb24gb25seSBlbmFibGVkIG9uIFNlcmllR3JvdXAgb3IgdW5kZXIgXCJDYWxjdWxhdGVkIHNpZ25hbHNcIiBjYXRlZ29yeSlcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVOb2RlfSBpdGVtXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoaXRlbTogSVNlcmllTm9kZSB8IHVuZGVmaW5lZCwgYXJlRWxlbWVudHNFeHBvcnRhYmxlOiBib29sZWFuKXtcclxuXHRcdGxldCB0b29sYmFyID0gdGhpcy5fdG9vbGJhciBhcyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyO1xyXG5cdFx0aWYgKGl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0dG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24odHJ1ZSk7XHJcblx0XHRcdHRvb2xiYXIuZGlzYWJsZURlbGV0ZUJ1dHRvbih0cnVlKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQvLyBzZXQgZGVsZXRlIGJ1dHRvbiBzdGF0ZVxyXG5cdFx0XHR0b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24oIWl0ZW0uY2FuRGVsZXRlKTtcclxuXHJcblx0XHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwKXtcclxuXHRcdFx0XHR0b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdHRvb2xiYXIuZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGlmKGl0ZW0uZ2V0U2VyaWVHcm91cCgpID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHR0b29sYmFyLmRpc2FibGVJbnNlcnRDYWxjdWxhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHRcdFx0XHRcdHRvb2xiYXIuZGlzYWJsZUV4cG9ydEJ1dHRvbih0cnVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlICYmIGl0ZW0ubmFtZSA9PSAnQWxnb3JpdGhtJyB8fCBpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhICYmIGl0ZW0uc2VyaWUgPT0gdW5kZWZpbmVkIHx8XHJcblx0XHRcdFx0KChpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIHx8IGl0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKSAmJiAoaXRlbS5zZXJpZSA9PSB1bmRlZmluZWQgfHwgaXRlbS5zZXJpZSEucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2UpKSl7XHJcblx0XHRcdFx0XHR0b29sYmFyLmRpc2FibGVJbnNlcnRDYWxjdWxhdGlvbkJ1dHRvbihmYWxzZSk7XHJcblx0XHRcdFx0XHR0b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24odHJ1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHR0b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdFx0dG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVx0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFyZUVsZW1lbnRzRXhwb3J0YWJsZSkge1xyXG5cdFx0XHR0b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24oZmFsc2UpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRvb2xiYXIuZGlzYWJsZUV4cG9ydEJ1dHRvbih0cnVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjYW5JdGVtc0JlRXhwb3J0ZWQoaXRlbXMpOiBib29sZWFuIHtcclxuXHRcdGxldCBjYW5CZUV4cG9ydGVkID0gZmFsc2U7XHJcblx0XHRsZXQgZXhwb3J0SGVscGVyID0gbmV3IEV4cG9ydEhlbHBlcigpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoZXhwb3J0SGVscGVyLmlzRWxlbWVudEV4cG9ydGFibGUoaXRlbXNbaV0uaXRlbSkgPT09IHRydWUpIHtcclxuXHRcdFx0XHRjYW5CZUV4cG9ydGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGNhbkJlRXhwb3J0ZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGNsaWNrIG9uIHRoZSB0cmVlIGdyaWQgKG5lZWRlZCBmb3IgcmVzZXRpbmcgdGhlIGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbClcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGNsaWNrKCl7XHJcblx0XHQvLyBSZXNldCBjdXJyZW50IGRyYWcgZHJvcCBzaWduYWwgYWZ0ZXIgY2xpY2sgd2FzIGZpbmlzaGVkKGNsaWNrIHVwKVxyXG5cdFx0dGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5mb2N1cygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBkb3VibGUgY2xpY2sgb24gdGhlIHRyZWUgZ3JpZCB3YXMgZG9uZVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGFyZ3NcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZG91YmxlQ2xpY2soYXJncyl7XHJcblx0XHRpZihhcmdzLmNlbGxJbmRleCA9PSAwKXtcclxuXHRcdFx0bGV0IHNlcmllTm9kZSA9IGFyZ3MuZGF0YS5pdGVtO1xyXG5cdFx0XHRsZXQgZm91bmRTZXJpZXMgPSB0aGlzLmdldFNlcmllc0Zyb21JdGVtKHNlcmllTm9kZSk7XHJcblx0XHRcdGlmKGZvdW5kU2VyaWVzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRcdC8vIE9ubHkgb25lIHNlcmllIGNhbiBiZSBhZGRlZCBieSBkb3VibGUgY2xpY2sgY3VycmVudGx5KFRPRE86IGFkZCBtdWx0aSBpbnNlcnQpXHJcblx0XHRcdFx0dGhpcy5vblNlcmllc0RvdWJsZUNsaWNrZWQoZm91bmRTZXJpZXNbMF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbGwgZWxlbWVudHMgc2VsZWN0ZWQgYXJlIHNlcmllcyBhbmQgb2YgdGhlIHNhbWUgdHlwZVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGVsZW1lbnRzXHJcblx0ICogQHBhcmFtIHsqfSBkcmFnZ2VkUm93XHJcblx0ICogQHJldHVybnMge0FycmF5PEJhc2VTZXJpZXM+fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBjaGVja1NlbGVjdGVkRWxlbWVudHMoZWxlbWVudHMsIGRyYWdnZWRSb3cpOkFycmF5PEJhc2VTZXJpZXM+IHtcclxuXHRcdGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuXHRcdGxldCBpdGVtcyA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRsZXQgZHJhZ2dlZFJvd0lzU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdGxldCBpbnZhbGlkU2VsZWN0aW9uID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKGRyYWdnZWRSb3cgPT0gdW5kZWZpbmVkIHx8IGRyYWdnZWRSb3cuc2VyaWUgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBbXTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdHlwZSA9IGRyYWdnZWRSb3cuc2VyaWUudHlwZTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpID0gaSArIDEpe1xyXG5cdFx0XHRpZiAoZWxlbWVudHNbaV0uc2VyaWUgPT0gdW5kZWZpbmVkIHx8IGVsZW1lbnRzW2ldLnNlcmllLnR5cGUgIT0gdHlwZSkge1xyXG5cdFx0XHRcdGludmFsaWRTZWxlY3Rpb24gPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChlbGVtZW50c1tpXSA9PSBkcmFnZ2VkUm93KSB7XHJcblx0XHRcdFx0ZHJhZ2dlZFJvd0lzU2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHNlcmllcy5wdXNoKGVsZW1lbnRzW2ldLnNlcmllKTtcclxuXHRcdFx0aXRlbXMucHVzaChlbGVtZW50c1tpXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRyYWdnZWRSb3cuaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSl7XHJcblx0XHRcdHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSA9IGRyYWdnZWRSb3cucGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vT25jZSBhbGwgZWxlbWVudHMgaGF2ZSBiZWVuIGNoZWNrZWQsIHNlbGVjdCBjb3JyZWN0IGVsZW1lbnRzIGFjY29yZGluZyB0byB0aGUgZXhjZXB0aW9uc1xyXG5cdFx0aWYgKCFkcmFnZ2VkUm93SXNTZWxlY3RlZCkge1xyXG5cdFx0XHRzZXJpZXMgPSBbXTtcclxuXHRcdFx0c2VyaWVzLnB1c2goZHJhZ2dlZFJvdy5zZXJpZSk7XHJcblx0XHRcdHRoaXMuX2luZGV4ZXNEcmFnZ2VkID0gW107XHJcblx0XHRcdHRoaXMuX2luZGV4ZXNEcmFnZ2VkLnB1c2goZHJhZ2dlZFJvdy5pbmRleCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGludmFsaWRTZWxlY3Rpb24pIHtcclxuXHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHNlcmllcyA9IHRoaXMuZGVsZXRlRXF1YWxTaWduYWxzKHNlcmllcywgaXRlbXMpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gc2VyaWVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVsZXRlIGR1cGxpY2F0ZWQgc2lnbmFscyBmcm9tIHRoZSBkcmFnJmRyb3AgYXJyYXlcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcblx0ICogQHBhcmFtIHsqfSBlbGVtZW50c1xyXG5cdCAqIEByZXR1cm5zXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGRlbGV0ZUVxdWFsU2lnbmFscyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBlbGVtZW50cykge1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoZWxlbWVudHNbaV0uaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSl7XHJcblx0XHRcdFx0bGV0IHNlbGVjdGVkSXRlbXMgPSBPYmplY3QuYXNzaWduKFtdLCBzZXJpZXMpO1xyXG5cdFx0XHRcdHNlbGVjdGVkSXRlbXMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdGlmIChzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKHNlcmllc1tpXSkpe1xyXG5cdFx0XHRcdFx0c2VyaWVzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdGVsZW1lbnRzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdGkgPSAtMTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQucHVzaChlbGVtZW50c1tpXS5pbmRleCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBzZXJpZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGFsbCBzZXJpZXMgd2hpY2ggd2VyZSBmb3VuZCBpbiB0aGUgc2VyaWUgbm9kZSBpdGVtKGUuZy4gYSBub3JtYWwgc2VyaWUgb3IgY2FsY3VsYXRlZCBzZXJpZXMpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gaXRlbVxyXG5cdCAqIEByZXR1cm5zIHtBcnJheTxCYXNlU2VyaWVzPn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0U2VyaWVzRnJvbUl0ZW0oaXRlbSk6IEFycmF5PEJhc2VTZXJpZXM+e1xyXG5cdFx0bGV0IHNpZ25hbHMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuXHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBTZXJpZU5vZGUgJiYgaXRlbS5zZXJpZSAhPSB1bmRlZmluZWQpeyAvLyBJcyBTaWduYWwgbm9kZVxyXG5cdFx0XHRzaWduYWxzLnB1c2goaXRlbS5zZXJpZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGl0ZW0gaW5zdGFuY2VvZiBTZXJpZUNvbnRhaW5lcil7IC8vIGlzIGNhbGN1bGF0aW9uKGdyb3VwIG5vZGUpIHdpdGggc2lnbmFsc1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5nZXRTZXJpZXMoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBzaWduYWxzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSXMgdGhlIGdpdmVuIGl0ZW0gYSBncm91cCBpdGVtIChlLmcuIG5lZWRlZCBmb3Igc2V0dGluZyB0aGUgZm9udCBzdHlsZSB0byBib2xkKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0lTZXJpZUNvbnRhaW5lcn0gaXRlbVxyXG5cdCAqIEByZXR1cm5zXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGlzR3JvdXBJdGVtKGl0ZW06IElTZXJpZUNvbnRhaW5lcik6IGJvb2xlYW57XHJcblx0XHRpZihpdGVtID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmKGl0ZW0udmlzaWJsZUNoaWxkcyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGluc2VydENhbGN1bGF0aW9uKGl0ZW0pOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb258dW5kZWZpbmVke1xyXG5cdFx0aWYoaXRlbSA9PSB1bmRlZmluZWQpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR2YXIgc2VsZWN0ZWRJdGVtID0gaXRlbS5pdGVtO1xyXG5cdFx0dmFyIHNlcmllR3JvdXA7XHJcblx0XHRpZihzZWxlY3RlZEl0ZW0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwIHx8IHNlbGVjdGVkSXRlbSBpbnN0YW5jZW9mIFNpZ25hbENhdGVnb3J5KXtcclxuXHRcdFx0Ly8gQ2FsY3VsYXRpb24gY2FuIG9ubHkgYmUgaW5zZXJ0IGF0IGdyb3VwcyBvciBjYXRlZ29yaWVzXHJcblx0XHRcdHNlcmllR3JvdXAgPSBzZWxlY3RlZEl0ZW07XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRzZXJpZUdyb3VwID0gc2VsZWN0ZWRJdGVtLmdldFNlcmllR3JvdXAoKTtcclxuXHRcdH1cclxuXHRcdGlmKHNlcmllR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuXHJcblx0XHRcdHRoaXMuYWN0aXZhdGVFZGl0TW9kZSh0cnVlKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWRkQ2FsY3VsYXRpb25Ub0NvbnRhaW5lcihzZXJpZUdyb3VwKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cdFxyXG5cdHByaXZhdGUgYWRkQ2FsY3VsYXRpb25Ub0NvbnRhaW5lcihjb250YWluZXI6IElTZXJpZUNvbnRhaW5lcik6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbnx1bmRlZmluZWR7XHJcblx0XHRpZih0aGlzLl9zZXJpZXNQcm92aWRlciA9PSB1bmRlZmluZWQpe1xyXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGNhbGN1bGF0aW9uID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbihcIkNhbGN1bGF0aW9uXCIsIHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTtcclxuXHRcdHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggPSBjYWxjdWxhdGlvbjtcclxuXHRcdGNvbnRhaW5lci5hZGRTZXJpZUNvbnRhaW5lcihjYWxjdWxhdGlvbiwgLTEpO1xyXG5cdFx0cmV0dXJuIGNhbGN1bGF0aW9uO1xyXG4gICAgfVxyXG5cclxuXHRwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkOiBib29sZWFuKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcblx0XHR0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFdpZGdldEJhc2UuV2lkZ2V0U2V0dGluZ0lkLCB0aGlzLmdldFdpZGdldFNldHRpbmdzKCkpO1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuXHRcdHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEpO1xyXG5cdFx0dGhpcy5zZXRXaWRnZXRTZXR0aW5ncyh0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFdpZGdldEJhc2UuV2lkZ2V0U2V0dGluZ0lkKSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldFdpZGdldFNldHRpbmdzKCk6IGFueXtcclxuXHRcdGxldCBzZXR0aW5ncyA9IHtcImVkaXRNb2RlQWN0aXZlXCI6IHRoaXMuZWRpdE1vZGVBY3RpdmUsXHJcblx0XHRcdFx0XHRcdFwid2lkdGhcIjogdGhpcy5fYWN0dWFsV2lkdGhcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdHJldHVybiBzZXR0aW5ncztcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2V0V2lkZ2V0U2V0dGluZ3MoZGF0YTogYW55KSB7XHJcblx0XHRpZihkYXRhID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuZWRpdE1vZGVBY3RpdmUgPSAoZGF0YVtcImVkaXRNb2RlQWN0aXZlXCJdKTtcclxuXHRcdHRoaXMuX2FjdHVhbFdpZHRoID0gZGF0YVtcIndpZHRoXCJdO1xyXG5cdH1cclxuXHJcblx0YWN0aXZhdGVFZGl0TW9kZShhY3RpdmF0ZTogYm9vbGVhbil7XHJcblxyXG5cdFx0Ly8gU2hvdyBvciBoaWRlIGVkaXQgbW9kZSBjb2x1bW5zXHJcblx0XHRsZXQgdHJlZU9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTsgXHJcblx0XHRsZXQgdmFsdWVDb2x1bW4gPSB0cmVlT2JqZWN0LmdldENvbHVtbkJ5RmllbGQoU2lnbmFsTWFuYWdlcldpZGdldC52YWx1ZUNvbHVtbklkKTtcclxuXHRcdGxldCBkZXNjcmlwdGlvbkNvbHVtbiA9IHRyZWVPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZChTaWduYWxNYW5hZ2VyV2lkZ2V0LmRlc2NyaXB0aW9uQ29sdW1uSWQpO1xyXG5cdFx0bGV0IGNvbG9yQ29sdW1uID0gdHJlZU9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKFNpZ25hbE1hbmFnZXJXaWRnZXQuY29sb3JDb2x1bW5JZCk7XHJcblx0XHRpZihhY3RpdmF0ZSA9PSB0cnVlKXtcclxuXHRcdFx0dHJlZU9iamVjdC5zaG93Q29sdW1uKHZhbHVlQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0XHR0cmVlT2JqZWN0LnNob3dDb2x1bW4oZGVzY3JpcHRpb25Db2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHRcdHRyZWVPYmplY3Quc2hvd0NvbHVtbihjb2xvckNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHRyZWVPYmplY3QuaGlkZUNvbHVtbih2YWx1ZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdFx0dHJlZU9iamVjdC5oaWRlQ29sdW1uKGRlc2NyaXB0aW9uQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0XHR0cmVlT2JqZWN0LmhpZGVDb2x1bW4oY29sb3JDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldEVkaXRNb2RlKGFjdGl2YXRlKTtcclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdFx0UGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldERhdGFXaXRoSWQodGhpcy5jb21wb25lbnQuaWQsIHRoaXMuZ2V0Q29tcG9uZW50U2V0dGluZ3ModHJ1ZSkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0cnVlIGlmIG9uZSBvZiB0aGUgaXRlbXMgZGVsZXRlZCBoYXMgYmVlbiBkb25lIHRocm91Z2ggdGhlIHRyYWNlIG9mIG1hcHBDb2NrcGl0XHJcblx0ICpcclxuXHQgKiBAcGFyYW0geyp9IHNlbGVjdGVkSXRlbXNcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb250YWluc0l0ZW1XaXRoaW5SZWNlbnRPclVwbG9hZGVkKHNlbGVjdGVkSXRlbXM6IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5pc0l0ZW1JblNpZ25hbENhdGVnb3J5KHNlbGVjdGVkSXRlbXNbaV0uaXRlbSwgU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFVwbG9hZGVkKSB8fCB0aGlzLmlzSXRlbUluU2lnbmFsQ2F0ZWdvcnkoc2VsZWN0ZWRJdGVtc1tpXS5pdGVtLCBTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkUmVjZW50KSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGl0ZW0gc2VsZWN0ZWQgYmVsb25ncyB0byB0aGUgc2lnbmFsIGNhdGVnb3J5IHNlbGVjdGVkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SVNlcmllTm9kZSB8IElTZXJpZUNvbnRhaW5lcn0gaXRlbVxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzaWduYWxDYXRlZ29yeUlkXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGlzSXRlbUluU2lnbmFsQ2F0ZWdvcnkoaXRlbTogSVNlcmllTm9kZSB8IElTZXJpZUNvbnRhaW5lciwgc2lnbmFsQ2F0ZWdvcnlJZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgcGFyZW50ID0gaXRlbS5wYXJlbnQ7XHJcblxyXG5cdFx0aWYgKHBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbENhdGVnb3J5ICYmIHBhcmVudC5pZCA9PSBzaWduYWxDYXRlZ29yeUlkKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoIShwYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxSb290KSl7XHJcblx0XHRcdHJldHVybiB0aGlzLmlzSXRlbUluU2lnbmFsQ2F0ZWdvcnkocGFyZW50ISwgc2lnbmFsQ2F0ZWdvcnlJZCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2hvd3MgbWVzc2FnZSBib3ggYWNjb3JkaW5nIHRvIHR5cGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHttZXNzYWdlQm94VHlwZX0gdHlwZVxyXG5cdCAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gZmlsZUNvbnRlbnRzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHNob3dNZXNzYWdlQm94KHR5cGU6IG1lc3NhZ2VCb3hUeXBlLCBmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuXHRcdGlmKHR5cGUgPT09IG1lc3NhZ2VCb3hUeXBlLldhcm5pbmcpIHtcclxuXHRcdFx0dGhpcy5zaG93V2FybmluZ1doZW5JbXBvcnRpbmdGaWxlcygpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZih0eXBlID09PSBtZXNzYWdlQm94VHlwZS5ZZXNObykge1xyXG5cdFx0XHR0aGlzLnNob3dNZXNzYWdlQm94V2hlbkltcG9ydGluZ01DRUZpbGVzKGZpbGVDb250ZW50cyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgd2FybmluZyBtZXNzYWdlIHdoZW4gdGhlIHVzZXIgaW1wb3J0cyBhIC5tY2UgZmlsZSBhbmQgb3RoZXIgZmlsZXMgdG9vXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2hvd1dhcm5pbmdXaGVuSW1wb3J0aW5nRmlsZXMoKSB7XHJcblx0XHRuZXcgQWxlcnREaWFsb2coKS5jcmVhdGVNZXNzYWdlQm94KHRoaXMuX3dhcm5pbmdJbXBvcnRpbmdIZWFkZXIsdGhpcy5fd2FybmluZ0ltcG9ydGluZ0NvbnRlbnQsIG1lc3NhZ2VCb3hUeXBlLldhcm5pbmcsIHVuZGVmaW5lZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbWVzc2FnZSBib3ggdGhhdCBsZXRzIHVzZXIgZGVjaWRlIHRvIGRlbGV0ZSBzZWxlY3RlZCBkYXRhIG9yIG5vdFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsqfSBkZWxldGVkSXRlbXNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzaG93TWVzc2FnZUJveEZvckRlbGV0aW5nSXRlbShkZWxldGVkSXRlbXMpIHtcclxuXHRcdGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0XHJcblx0XHRuZXcgQWxlcnREaWFsb2coKS5jcmVhdGVNZXNzYWdlQm94KHRoaXMuX2RlbGV0ZUl0ZW1zSGVhZGVyLHRoaXMuX2RlbGV0ZUl0ZW1zQ29udGVudCwgbWVzc2FnZUJveFR5cGUuQ2FuY2VsRGVsZXRlLCBkZWZlcnJlZCk7XHJcblxyXG5cdFx0JC53aGVuKGRlZmVycmVkKS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHNlbGYuZGVsZXRlSXRlbXMoZGVsZXRlZEl0ZW1zKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG1lc3NhZ2UgYm94IHRoYXQgbGV0cyB1c2VyIGRlY2lkZSB0byBpbXBvcnQgLm1jZSBmaWxlIG5hZCBkZWxldGUgYWxsIGRhdGEgb3Igbm90XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gZmlsZUNvbnRlbnRzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHNob3dNZXNzYWdlQm94V2hlbkltcG9ydGluZ01DRUZpbGVzKGZpbGVDb250ZW50czogTWFwPHN0cmluZywgc3RyaW5nPikge1xyXG5cdFx0bGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdG5ldyBBbGVydERpYWxvZygpLmNyZWF0ZU1lc3NhZ2VCb3godGhpcy5fTUNFRmlsZXNJbXBvcnRlZEhlYWRlcix0aGlzLl9NQ0VGaWxlc0ltcG9ydGVkQ29udGVudCwgbWVzc2FnZUJveFR5cGUuWWVzTm8sIGRlZmVycmVkKTtcclxuXHRcdFxyXG5cdFx0JC53aGVuKGRlZmVycmVkKS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHNlbGYuc3RhcnRJbXBvcnQoZmlsZUNvbnRlbnRzKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVsZXRlIHNlbGVjdGVkIGl0ZW1zXHJcblx0ICpcclxuXHQgKiBAcGFyYW0geyp9IGl0ZW1zXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgZGVsZXRlSXRlbXMoaXRlbXMpIHtcclxuXHRcdHRoaXMuZW5hYmxlVHJlZUdyaWRSZWZyZXNoKGZhbHNlKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVJdGVtKGl0ZW1zW2ldLml0ZW0pO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5lbmFibGVUcmVlR3JpZFJlZnJlc2godHJ1ZSk7XHJcblx0XHQvL1JlZnJlc2ggdHJlZWdyaWQganVzdCB3aGVuIGFsbCBpdGVtcyBoYXZlIGJlZW4gZGVsZXRlZFxyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWxldGUgYSBzcGVjaWZpYyBpdGVtXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gaXRlbVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBkZWxldGVJdGVtKGl0ZW0pe1xyXG5cdFx0aWYoaXRlbS5jYW5EZWxldGUpe1xyXG5cdFx0XHRpZihpdGVtIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIgJiYgIShpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKSl7IFxyXG5cdFx0XHRcdHRoaXMucmVtb3ZlU2VyaWVDb250YWluZXIoaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZXtcclxuXHRcdFx0XHR0aGlzLnJlbW92ZVNlcmllTm9kZShpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiAgUmVtb3ZlIHRoZSBzaWduYWwgY29udGFpbmVyIHdpdGggYWxsIHN1YiBjb250YWluZXJzIGFuZCBzaWduYWxzIGZyb20gZGF0YW1vZGVsXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBzZXJpZUdyb3VwXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHJlbW92ZVNlcmllQ29udGFpbmVyKHNlcmllR3JvdXA6IElTZXJpZUNvbnRhaW5lcil7XHJcblx0XHQoPElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkucmVtb3ZlU2VyaWVDb250YWluZXIoc2VyaWVHcm91cCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIHRoZSBzaWduYWwgZnJvbSBkYXRhbW9kZWxcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVOb2RlfSBzZXJpZU5vZGVcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZTogSVNlcmllTm9kZSl7XHJcblx0XHQoPElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkucmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHBvcnRzIGEgc2VyaWVHcm91cFxyXG5cdCAqXHJcblx0ICogQHB1YmxpY1xyXG5cdCAqIEBwYXJhbSB7QXJyYXk8RXhwb3J0U2VyaWVHcm91cD59IGVsZW1lbnRzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBleHBvcnRTZXJpZUdyb3VwKGVsZW1lbnRzOiBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPil7XHJcblx0XHR0aGlzLnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiRXhwb3J0aW5nIGRhdGEuLi5cIiwgSW1hZ2VJZC5kZWZhdWx0SW1hZ2UsIDQ4LCB0cnVlKSk7XHJcblx0XHR0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcblx0XHQvLyBUaW1lb3V0IG5lZWRlZCB0byBzaG93IHRoZSBidXN5c2NyZWVuIGJlZm9yZSBleHBvcnRpbmcgZGF0YSBcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5leHBvcnRDc3ZEYXRhKGVsZW1lbnRzKSwgMjAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9wZW5zIGEgZmlsZSBzZWxlY3QgZGlhbG9nIGFuZCBpbXBvcnRzIGEgc2VyaWVHcm91cCBmcm9tIHRoZSBmaWxlXHJcblx0ICpcclxuXHQgKiBAcHVibGljXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbXBvcnRTZXJpZUdyb3VwKCl7XHJcblx0XHR0aGlzLl9zZXJpZUNvbnRhaW5lclRvU2VsZWN0QWZ0ZXJSZWZyZXNoID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmF0dGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuXHRcdHRoaXMuX2ZpbGVQcm92aWRlci51cGxvYWREYXRhKFwiLmNzdiwgLm1jZSwgLm1jZTFcIiwgdHJ1ZSk7IC8vIE9ubHkgc2hvdy9hY2NlcHQgKi5jc3YsICoubWNlLCAqLm1jZTEgZmlsZXNcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBleHBvcnRTaWduYWxNYW5hZ2VyRGF0YSgpe1xyXG5cdFx0dGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihcIkV4cG9ydGluZyBkYXRhLi4uXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCA0OCwgdHJ1ZSkpO1xyXG5cdFx0dGhpcy5zZXRCdXN5KHRydWUpO1xyXG5cdFx0Ly8gVGltZW91dCBuZWVkZWQgdG8gc2hvdyB0aGUgYnVzeXNjcmVlbiBiZWZvcmUgZXhwb3J0aW5nIGRhdGEgXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHRoaXMuZXhwb3J0RGF0YSgpLCAyMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT2NjdXJzIGFmdGVyIHJlYWRpbmcgZGF0YSBmcm9tIGZpbGUodHJhY2UgaW1wb3J0IGRhdGEpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gc2VuZGVyXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uVXBsb2FkRGF0YUZpbmlzaGVkKGFyZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz4pe1xyXG5cdFx0dGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihcIkltcG9ydGluZyBkYXRhLi4uXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCA0OCwgdHJ1ZSkpO1xyXG5cdFx0bGV0IG1zZ0JveFR5cGUgPSB0aGlzLmNoZWNrTWVzc2FnZUJveFR5cGUoYXJncyk7IFxyXG5cclxuXHRcdGlmIChtc2dCb3hUeXBlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnNob3dNZXNzYWdlQm94KG1zZ0JveFR5cGUsIGFyZ3MpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuc3RhcnRJbXBvcnQoYXJncyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmRldGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4cG9ydHMgdGhlIGdpdmVuIHNpZ25hbCBncm91cCB0byBUcmFjZURhdGEuY3N2IGZpbGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsgQXJyYXk8RXhwb3J0U2VyaWVHcm91cD59IGVsZW1lbnRzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGV4cG9ydENzdkRhdGEoZWxlbWVudHM6IEFycmF5PEV4cG9ydFNlcmllR3JvdXA+KXtcclxuXHRcdGxldCBkYXRhO1xyXG5cdFx0aWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0ZGF0YSA9IG5ldyBFeHBvcnRJbXBvcnRIZWxwZXIodGhpcy5fc2VyaWVzUHJvdmlkZXIpLmV4cG9ydFRyYWNlRGF0YShlbGVtZW50cyk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiU2VyaWVzUHJvdmlkZXIgaXMgbm90IGF2YWlsYWJsZSFcIilcclxuXHRcdH1cclxuXHRcdGlmKGRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiBcInRleHQvY3N2XCIgfSk7XHJcblx0XHRcdEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJUcmFjZURhdGEuY3N2XCIsIGJsb2IpOyAgICBcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0QnVzeShmYWxzZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHBvcnRzIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhKGRhdGFtb2RlbCwgc2VyaWVzIHByb3ZpZGVyLCAuLi4pXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBleHBvcnREYXRhKCl7XHJcblx0XHRpZih0aGlzLl9zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpeyAvLyBTZXJpZXNQcm92aWRlciBuZWVkZWQgdG8gZXhwb3J0IGRhdGFcclxuXHRcdFx0dHJ5e1xyXG5cdFx0XHRcdGxldCBjb21wb25lbnRzID0gdGhpcy5nZXRDb21wb25lbnRzVG9FeHBvcnQoKTtcclxuXHRcdFx0XHRsZXQgc2V0dGluZ09iamVjdHMgPSB0aGlzLmdldFNldHRpbmdPYmplY3RzVG9FeHBvcnQoKTtcclxuXHRcdFx0XHRsZXQgc3RyaW5nRGF0YSA9IE1jZUV4cG9ydEltcG9ydEhlbHBlci5nZXRFeHBvcnREYXRhKGNvbXBvbmVudHMsIHNldHRpbmdPYmplY3RzKTtcclxuXHRcdFx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtzdHJpbmdEYXRhXSwgeyB0eXBlOiBcInRleHQvaHRtbFwiIH0pO1xyXG5cdFx0XHRcdEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJFeHBvcnQubWNlMVwiLCBibG9iKTsgICAgXHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRpZihlIGluc3RhbmNlb2YgRXJyb3IgJiYgTWNlQ29udmVyc2lvbkVycm9yLmlzTWNlQ29udmVyc2lvbkVycm9yKGUpKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUudG9TdHJpbmcoKSlcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gXHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiU2VyaWVzUHJvdmlkZXIgZm9yIGV4cG9ydCBub3QgYXZhaWxhYmxlIVwiKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0QnVzeShmYWxzZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBjb21wb25lbnRzIGluIGEgZGVmaW5lZCBvcmRlciB3aGljaCBzaG91bGQgYmUgY2xlYXJlZCBiZWZvcmUgaW1wb3J0aW5nIG5ldyBzZXR0aW5nXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHtBcnJheTxJQ29tcG9uZW50Pn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0Q29tcG9uZW50c1RvQ2xlYXIoKTogQXJyYXk8SUNvbXBvbmVudD57XHJcblx0XHRsZXQgY29tcG9uZW50c1RvQ2xlYXIgPSBuZXcgQXJyYXk8SUNvbXBvbmVudD4oKTtcclxuXHRcdGNvbXBvbmVudHNUb0NsZWFyLnB1c2godGhpcy5kYXRhTW9kZWwpOyAvLyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcblx0XHRpZih0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0Y29tcG9uZW50c1RvQ2xlYXIucHVzaCh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpOyAvLyBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLl9zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Y29tcG9uZW50c1RvQ2xlYXIucHVzaCh0aGlzLl9zZXJpZXNQcm92aWRlcik7IC8vIFNlcmllc1Byb3ZpZGVyIG11c3QgYmUgaW1wb3J0ZWQgZmlyc3RcclxuICAgICAgICB9XHJcblxyXG5cdFx0cmV0dXJuIGNvbXBvbmVudHNUb0NsZWFyO1xyXG5cdH1cclxuICAgIFx0XHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgY29tcG9uZW50cyB3aGljaCBzaG91bGQgYmUgZXhwb3J0ZWQvaW1wb3J0ZWQgZnJvbSB0aGUgbWNlIGZpbGUgaW4gdGhlIGdpdmVuIG9yZGVyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHtBcnJheTxJQ29tcG9uZW50Pn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0Q29tcG9uZW50c1RvRXhwb3J0KCk6IEFycmF5PElDb21wb25lbnQ+e1xyXG5cdFx0bGV0IGV4cG9ydENvbXBvbmVudHMgPSBuZXcgQXJyYXk8SUNvbXBvbmVudD4oKTtcclxuXHRcdGlmICh0aGlzLl9zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0ZXhwb3J0Q29tcG9uZW50cy5wdXNoKHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTsgLy8gU2VyaWVzUHJvdmlkZXIgbXVzdCBiZSBpbXBvcnRlZCBmaXJzdFxyXG4gICAgICAgIH1cclxuXHRcdGV4cG9ydENvbXBvbmVudHMucHVzaCh0aGlzLmRhdGFNb2RlbCk7IC8vIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuXHRcdGlmKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRleHBvcnRDb21wb25lbnRzLnB1c2godGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKTsgLy8gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcblx0XHR9ICAgICAgIFxyXG5cdFxyXG5cdFx0cmV0dXJuIGV4cG9ydENvbXBvbmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyBhbGwgc2V0dGluZ3Mgb2JqZWN0cyB3aGljaCBzaG91bGQgYmUgZXhwb3J0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge0FycmF5PElTZXR0aW5nc09iamVjdD59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFNldHRpbmdPYmplY3RzVG9FeHBvcnQoKTogQXJyYXk8SVNldHRpbmdzT2JqZWN0PiB7XHJcblx0XHRsZXQgc2V0dGluZ3NPYmplY3RzID0gbmV3IEFycmF5PElTZXR0aW5nc09iamVjdD4oKTtcclxuXHRcdFxyXG5cdFx0Ly8gZ2V0IGN1cnJlbnQgY3Vyc29yc3RhdGVzXHJcblx0XHRsZXQgY3Vyc29yc3RhdGVzID0gQ29tcG9uZW50RGF0YUh1Yi5yZWFkU2hhcmVkPEN1cnNvclN0YXRlcz4odGhpcywgVHJhY2VWaWV3QmluZGluZy5DdXJzb3JTdGF0ZXMuc2NvcGUsIFRyYWNlVmlld0JpbmRpbmcuQ3Vyc29yU3RhdGVzLmlkLCBDdXJzb3JTdGF0ZXMpO1xyXG5cdFx0c2V0dGluZ3NPYmplY3RzLnB1c2goY3Vyc29yc3RhdGVzKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHNldHRpbmdzT2JqZWN0cztcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYnVzeSBzY3JlZW4gYW5kIHN0YXJ0IGltcG9ydGluZyBkYXRhXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzdGFydEltcG9ydChhcmdzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XHJcblx0XHR0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcblx0XHQvLyBUaW1lb3V0IG5lZWRlZCB0byBzaG93IHRoZSBidXN5c2NyZWVuIGJlZm9yZSBpbXBvcnRpbmcgZGF0YSBcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbXBvcnREYXRhKGFyZ3MpLCAyMDApO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIGltcG9ydHMgdGhlIGdpdmVuIGZpbGVkYXRhIHdpdGggdGhlIGdpdmVuIGZpbGVuYW1lIHRvIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhbW9kZWxcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW1wb3J0RGF0YShmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pe1xyXG5cdFx0ZmlsZUNvbnRlbnRzLmZvckVhY2goKGZpbGVEYXRhLCBmaWxlbmFtZSkgPT4ge1xyXG5cdFx0XHRpZihmaWxlbmFtZS50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwiLmNzdlwiKSl7XHJcblx0XHRcdFx0aWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdGxldCBleHBvcnRJbXBvcnRIZWxwZXIgPSBuZXcgRXhwb3J0SW1wb3J0SGVscGVyKHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTtcclxuXHRcdFx0XHRcdGxldCBzZXJpZUdyb3VwcyA9IGV4cG9ydEltcG9ydEhlbHBlci5pbXBvcnRUcmFjZURhdGEoZmlsZURhdGEsIGZpbGVuYW1lKTtcclxuXHRcdFx0XHRcdGxldCBzaWduYWxGaWxlID0gbmV3IFNlcmllQ29udGFpbmVyKGZpbGVuYW1lKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dGhpcy5zZXRDb250YWluZXJJZChzaWduYWxGaWxlKTtcclxuXHRcdFx0XHRcdHNlcmllR3JvdXBzLmZvckVhY2goc2VyaWVHcm91cCA9PntcdFxyXG5cdFx0XHRcdFx0XHRzaWduYWxGaWxlLmFkZFNlcmllQ29udGFpbmVyKHNlcmllR3JvdXAsIC0xKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggPSBzaWduYWxGaWxlO1xyXG5cdFx0XHRcdFx0KDxJU2lnbmFsTWFuYWdlckRhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLmFkZFNlcmllQ29udGFpbmVyKHNpZ25hbEZpbGUsIFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRJbXBvcnRlZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiU2VyaWVzUHJvdmlkZXIgaXMgbm90IGF2YWlsYWJsZSFcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGZpbGVuYW1lLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoXCIubWNlXCIpKSB7XHJcblxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHR0aGlzLmltcG9ydE1DRUZpbGUoZmlsZURhdGEsIFwiLm1jZVwiKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRpZihlIGluc3RhbmNlb2YgRXJyb3IgJiYgTWNlQ29udmVyc2lvbkVycm9yLmlzTWNlQ29udmVyc2lvbkVycm9yKGUpKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZS50b1N0cmluZygpKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IFxyXG5cdFx0XHRlbHNlIGlmIChmaWxlbmFtZS50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwiLm1jZTFcIikpe1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHR0aGlzLmltcG9ydE1DRUZpbGUoZmlsZURhdGEsIFwiLm1jZTFcIik7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0aWYoZSBpbnN0YW5jZW9mIEVycm9yICYmIE1jZUNvbnZlcnNpb25FcnJvci5pc01jZUNvbnZlcnNpb25FcnJvcihlKSkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUudG9TdHJpbmcoKSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJJbXBvcnQgZm9yIGZpbGUgZm9ybWF0IG5vdCBpbXBsZW1lbnRlZDogXCIgKyBmaWxlbmFtZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuc2V0QnVzeShmYWxzZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHR5cGUgb2YgbWVzc2FnZSBib3ggbmVlZCBpdCAoaWYgbmVlZCBpdClcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAcmV0dXJucyB7KG1lc3NhZ2VCb3hUeXBlIHwgdW5kZWZpbmVkKX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tNZXNzYWdlQm94VHlwZShmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBtZXNzYWdlQm94VHlwZSB8IHVuZGVmaW5lZCB7XHJcblx0XHRsZXQgaXNTaWduYWxNYW5hZ2VyRW1wdHkgPSB0aGlzLmlzU2lnbmFsTWFuYWdlckVtcHR5KHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG5cdFx0bGV0IGlzVGhlcmVNQ0VGaWxlID0gZmFsc2U7XHJcblxyXG5cdFx0ZmlsZUNvbnRlbnRzLmZvckVhY2goKGZpbGVEYXRhLCBmaWxlbmFtZSkgPT4ge1xyXG5cdFx0XHRpZiAoZmlsZW5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aChcIi5tY2VcIikgfHwgZmlsZW5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aChcIi5tY2UxXCIpKSB7XHJcblx0XHRcdFx0aXNUaGVyZU1DRUZpbGUgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoaXNUaGVyZU1DRUZpbGUgJiYgZmlsZUNvbnRlbnRzLnNpemUgPiAxKSB7XHJcblx0XHRcdHJldHVybiBtZXNzYWdlQm94VHlwZS5XYXJuaW5nO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihpc1RoZXJlTUNFRmlsZSAmJiAhaXNTaWduYWxNYW5hZ2VyRW1wdHkpIHtcclxuXHRcdFx0cmV0dXJuIG1lc3NhZ2VCb3hUeXBlLlllc05vO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgbm90aGluZyBpbiB0aGUgc2lnbmFsTWFuYWdlclxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGRhdGFcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNTaWduYWxNYW5hZ2VyRW1wdHkoZGF0YSk6IGJvb2xlYW4ge1xyXG5cdFx0bGV0IGlzRW1wdHkgPSB0cnVlO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChkYXRhW2ldLmNoaWxkcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0aXNFbXB0eSA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaXNFbXB0eTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlbGV0ZXMgYWxsIHRyYWNlIGRhdGEgYW5kIGltcG9ydHMgdGhlIC5tY2UgZmlsZVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGRhdGFcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW1wb3J0TUNFRmlsZShmaWxlRGF0YTogc3RyaW5nLCBmaWxlRW5kaW5nOiBzdHJpbmcpIHtcclxuXHRcdGlmKHRoaXMuX3Nlcmllc1Byb3ZpZGVyKXsgLy8gc2VyaWUgcHJvdmlkZXIgbmVlZGVkIHRvIGltcG9ydCBkYXRhXHJcblx0XHRcdHRoaXMuZW5hYmxlVHJlZUdyaWRSZWZyZXNoKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFyIGNvbXBvbmVudHMgd2l0aCB0aGUgZ2l2ZW4gb3JkZXJcclxuXHRcdFx0bGV0IGNvbXBvbmVudHNUb0NsZWFyID0gdGhpcy5nZXRDb21wb25lbnRzVG9DbGVhcigpO1xyXG5cdFx0XHRNY2VFeHBvcnRJbXBvcnRIZWxwZXIuY2xlYXJDb21wb25lbnRzKGNvbXBvbmVudHNUb0NsZWFyKTtcclxuXHJcblx0XHRcdGlmKGZpbGVFbmRpbmcgPT09IFwiLm1jZTFcIiB8fCBmaWxlRW5kaW5nID09PSBcIi5tY2VcIikge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxldCBzZXR0aW5nc01hcD0gTWNlRXhwb3J0SW1wb3J0SGVscGVyLnJlYWRGaWxlQ29udGVudChmaWxlRGF0YSwgZmlsZUVuZGluZyk7XHJcblxyXG5cdFx0XHRcdGxldCBjb21wb25lbnRzID0gdGhpcy5nZXRDb21wb25lbnRzVG9FeHBvcnQoKTsgLy8gSW1wb3J0IGFuZCBFeHBvcnQgY29tcG9uZW50cyBhcmUgdGhlIHNhbWUgc28gd2UgY2FuIHVzZSB0aGUgZXhwb3J0IGNvbXBvbmVudHMgYXJyYXlcclxuXHRcdFx0XHQvL2xldCBzZXR0aW5nT2JqZWN0cyA9IHRoaXMuZ2V0U2V0dGluZ09iamVjdHNUb0V4cG9ydCgpOyAvLyBJbXBvcnQgYW5kIEV4cG9ydCBvYmplY3RzIGFyZSB0aGUgc2FtZSBzbyB3ZSBjYW4gdXNlIHRoZSBleHBvcnQgc2V0dGluZ3Mgb2JqZWN0IGFycmF5XHJcblxyXG5cdFx0XHRcdC8vIE1jZUV4cG9ydEltcG9ydEhlbHBlci5zZXRJbXBvcnREYXRhKGNvbXBvbmVudHMsIHNldHRpbmdPYmplY3RzLCBzZXR0aW5nc01hcCk7XHJcblx0XHRcdFx0TWNlRXhwb3J0SW1wb3J0SGVscGVyLnNldEltcG9ydERhdGEoY29tcG9uZW50cywgc2V0dGluZ3NNYXApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmVuYWJsZVRyZWVHcmlkUmVmcmVzaCh0cnVlKTtcclxuXHRcdFx0dGhpcy5yZWZyZXNoKCk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiU2VyaWVzUHJvdmlkZXIgZm9yIGltcG9ydCBub3QgYXZhaWxhYmxlIVwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlbGVjdHMgdGhlIGdpdmVuIGNvbnRhaW5lciBpbiB0aGUgdHJlZSBncmlkIGFuZCBzY3JvbGxzIHRvIGl0IGlmIG91dCBvZiB0aGUgd2luZG93IChUT0RPOiBNb3ZlIHRvIEJhc2VDbGFzcyBpbmNsLiBfc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaClcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsoSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZCl9IGNvbnRhaW5lclxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzZWxlY3RJdGVtKGNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZCl7XHJcblx0XHRsZXQgdHJlZU9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTsgXHJcblx0XHRsZXQgcmVjb3JkID0gKDxhbnk+dHJlZU9iamVjdC5tb2RlbCkuZmxhdFJlY29yZHMuZmlsdGVyKHJlY29yZCA9PiB7cmV0dXJuIHJlY29yZC5pdGVtID09PSBjb250YWluZXJ9KVswXTtcclxuXHRcdGlmKHJlY29yZCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHQvLyBleHBhbmQgcGFyZW50IG5vZGUgaWYgaXQgaXMgY29sbGFwc2VkIHRvIHNlZSB0aGUgbmV3IGltcG9ydGVkIHRyYWNlIGRhdGFcclxuXHRcdFx0aWYocmVjb3JkLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdHRyZWVPYmplY3QuZXhwYW5kQ29sbGFwc2VSb3cocmVjb3JkLnBhcmVudEl0ZW0uaW5kZXgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIHRyZWVPYmplY3Quc2Nyb2xsT2Zmc2V0IG5vdCBwb3NzaWJsZSBpZiB0aGVyZSB3b3VsZCBiZSBzb21lIGZyZWUgc3BhY2UgYWZ0ZXIgdGhlIGxhc3QgaXRlbSBpbiB0aGUgdHJlZSBncmlkIGFmdGVyIHNjcm9sbGluZyB0byB0aGUgZ2l2ZW4gaXRlbVxyXG5cdFx0XHQvLyA9PiBzY3JvbGxUb0JvdHRvbSBiZWZvciBzY3JvbGwgdG8gYSBzcGVjaWFsIG9mZnNldCBpZiBwb3NzaWJsZVxyXG5cdFx0XHR0cmVlT2JqZWN0LnNjcm9sbFRvQm90dG9tKCk7XHJcblx0XHRcdHRyZWVPYmplY3Quc2V0TW9kZWwoe1wic2VsZWN0ZWRSb3dJbmRleFwiIDogcmVjb3JkLmluZGV4IH0pO1xyXG5cdFx0XHRsZXQgcm93SGVpZ2h0ID0gdHJlZU9iamVjdC5tb2RlbC5yb3dIZWlnaHQ7XHJcblx0XHRcdC8vIHNjcm9sbCBpbmRleCBub3QgdGhlIHNhbWUgYXMgdGhlIHNlbGVjdGVkSW5kZXggPT4gY29sbGFwc2VkIG5vZGVzIG11c3QgYmUgY29uc2lkZXJlZFxyXG5cdFx0XHRsZXQgc2Nyb2xsSW5kZXg9IHRoaXMuZ2V0U2Nyb2xsSW5kZXgoKDxhbnk+dHJlZU9iamVjdC5tb2RlbCkuZmxhdFJlY29yZHMsIHJlY29yZC5pbmRleCk7XHJcblx0XHRcdGxldCBzY3JvbGxPZmZzZXQgPSAgKHNjcm9sbEluZGV4LTEpKnJvd0hlaWdodCE7XHJcblx0XHRcdHRyZWVPYmplY3Quc2Nyb2xsT2Zmc2V0KDAsIHNjcm9sbE9mZnNldCk7IC8vIFVzZSBwYXJlbnQgaW5kZXggdG8gc2VlIHRoZSBwYXJlbnQgbm9kZSBpbiB0aGUgdmlld1xyXG5cdFx0XHQvLyg8YW55PnRyZWVPYmplY3QpLnVwZGF0ZVNjcm9sbEJhcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgaW5kZXggb2Ygb25seSB0aGUgdmlzaWJsZShleHBhbmRlZCkgcm93c1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0FycmF5PGFueT59IHJvd3NcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gcm93SW5kZXhcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRTY3JvbGxJbmRleChyb3dzOiBBcnJheTxhbnk+LCByb3dJbmRleDogbnVtYmVyKTogbnVtYmVye1xyXG5cdFx0bGV0IHNjcm9sbEluZGV4ID0gMDtcclxuXHRcdGZvcihsZXQgaT0wOyBpPCByb3dzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0aWYocm93c1tpXS5pbmRleCA9PSByb3dJbmRleCl7XHJcblx0XHRcdFx0c2Nyb2xsSW5kZXgrK1xyXG5cdFx0XHRcdHJldHVybiBzY3JvbGxJbmRleDtcclxuXHRcdFx0fVxyXG5cdFx0XHQvKmlmKHJvd3NbaV0uaXRlbSBpbnN0YW5jZW9mIFNlcmllR3JvdXApe1xyXG5cdFx0XHRcdGlmKHRoaXMuaXNWaXNpYmxlU2VyaWVHcm91cE5vZGUocm93c1tpXSkgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNjcm9sbEluZGV4Kys7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSAqL2lmKHJvd3NbaV0uaXRlbSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuXHRcdFx0XHRpZih0aGlzLmlzVmlzaWJsZVNlcmllR3JvdXBOb2RlKHJvd3NbaV0pID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzY3JvbGxJbmRleCsrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYocm93c1tpXS5pdGVtIGluc3RhbmNlb2YgU2VyaWVOb2RlKXtcclxuXHRcdFx0XHRpZih0aGlzLmlzVmlzaWJsZVNlcmllTm9kZShyb3dzW2ldKSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c2Nyb2xsSW5kZXgrKztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHNjcm9sbEluZGV4O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHVuaXF1ZSBpZCBmb3IgaW1wb3J0ZWQgZGF0YVxyXG5cdCAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7U2VyaWVDb250YWluZXJ9IHNlcmllQ29udGFpbmVyXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHNldENvbnRhaW5lcklkKHNlcmllQ29udGFpbmVyOiBTZXJpZUNvbnRhaW5lcikge1xyXG5cdFx0c2VyaWVDb250YWluZXIuaWQgPSB0aGlzLmdldFVuaXF1ZUlkKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgdW5pcXVlIGlkIGZvciB0aGUgaW1wb3J0ZWQgc2VyaWVDb250YWluZXJcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VW5pcXVlSWQoKSB7XHJcblx0XHRsZXQgaW1wb3J0ZWREYXRhSWRzID0gdGhpcy5nZXRJbXBvcnRlZERhdGFJZHMoKTtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gaS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpZihpbXBvcnRlZERhdGFJZHMuaW5jbHVkZXMoaWQpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gdW5pcXVlIGlkIGZvciBzZXJpZUNvbnRhaW5lciBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBhbGwgaWRzIGZyb20gdGhlIGltcG9ydGVkIGZyb20gZmlsZSBjYXRlZ29yeSBcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge0FycmF5PHN0cmluZz59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldEltcG9ydGVkRGF0YUlkcygpOiBBcnJheTxzdHJpbmc+IHtcclxuXHRcdGxldCBpZHM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHRcdGxldCBzaWduYWxDYXRlZ29yeSA9ICg8SVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5nZXRTaWduYWxDYXRlZ29yeShTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkSW1wb3J0ZWQpO1xyXG5cdFx0c2lnbmFsQ2F0ZWdvcnkhLmdldENoaWxkcygpLmZvckVhY2goY2hpbGQgPT4ge1xyXG5cdFx0XHRpZHMucHVzaCgoY2hpbGQgYXMgU2VyaWVDb250YWluZXIpLmlkKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGlkcztcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaXNWaXNpYmxlU2VyaWVHcm91cE5vZGUobm9kZSk6IGJvb2xlYW57XHJcblx0XHRpZihub2RlLnBhcmVudEl0ZW0gIT0gbnVsbCl7XHJcblx0XHRcdGlmKG5vZGUucGFyZW50SXRlbS5leHBhbmRTdGF0ZSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYobm9kZS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRpZihub2RlLnBhcmVudEl0ZW0ucGFyZW50SXRlbS5leHBhbmRTdGF0ZSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaXNWaXNpYmxlU2VyaWVOb2RlKG5vZGUpOiBib29sZWFue1xyXG5cdFx0aWYobm9kZS5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlIHx8IG5vZGUucGFyZW50SXRlbS5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihub2RlLnBhcmVudEl0ZW0ucGFyZW50SXRlbS5wYXJlbnRJdGVtICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGlmKG5vZGUucGFyZW50SXRlbS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKXtcclxuICAgICAgICAvLyBSZWZyZXNoIHRvIHNlZSBjb3JyZWN0IGV4cGFuZGVkL2NvbGxhcHNlZCBpY29uXHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdC8vUGVyc2lzdCBkYXRhIG1vZGVsIChleHBhbmRTdGF0ZSlcclxuXHRcdGlmICh0aGlzLl9kYXRhTW9kZWwgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHQoPGFueT50aGlzLl9kYXRhTW9kZWwpLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBjb2x1bW4gdGVtcGxhdGUgaW5mb3JtYXRpb25zXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjb2x1bW5JZFxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldENvbHVtblRlbXBsYXRlRGF0YShjb2x1bW5JZDogc3RyaW5nKSA6IHN0cmluZ3tcclxuXHRcdGlmKGNvbHVtbklkID09IFNpZ25hbE1hbmFnZXJXaWRnZXQuY29sb3JDb2x1bW5JZCl7XHJcblx0XHRcdHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJzbUNvbG9yQ29sdW1uVGVtcGxhdGVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBzdHlsZT0naGVpZ2h0OjIwcHg7cGFkZGluZy1sZWZ0OjdweDtwYWRkaW5nLXRvcDo0cHg7JyB1bnNlbGVjdGFibGU9J29uJz5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdlLWNlbGwnIHN0eWxlPSdkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxN3B4O2hlaWdodDoxN3B4O2JhY2tncm91bmQtY29sb3I6IHt7OiNkYXRhWydjb2xvciddfX07JyB1bnNlbGVjdGFibGU9J29uJz48L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L3NjcmlwdD5gXHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGNvbHVtbklkID09IFNpZ25hbE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkKXtcclxuXHRcdFx0cmV0dXJuIGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cInNtTmFtZUNvbHVtblRlbXBsYXRlXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgc3R5bGU9J2hlaWdodDoyMHB4OycgdW5zZWxlY3RhYmxlPSdvbic+XHJcblx0XHRcdFx0XHRcdFx0e3tpZiBoYXNDaGlsZFJlY29yZHN9fVxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz0naW50ZW5kJyBzdHlsZT0naGVpZ2h0OjFweDsgZmxvYXQ6bGVmdDsgd2lkdGg6e3s6bGV2ZWwqMTB9fXB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPjwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdHt7ZWxzZSAhaGFzQ2hpbGRSZWNvcmRzfX1cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjEwfX1weDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz48L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHR7ey9pZn19XHJcblx0XHRcdFx0XHRcdFx0e3s6I2RhdGFbJ2ljb25EZWZpbml0aW9uJ119fVxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9J2UtY2VsbCcgc3R5bGU9J2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCUnIHVuc2VsZWN0YWJsZT0nb24nPnt7OiNkYXRhWyduYW1lJ119fTwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvc2NyaXB0PmA7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gXCJcIjtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogUmFpc2VzIHRoZSBzZXJpZXMgZG91YmxlIGNsaWNrIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uU2VyaWVzRG91YmxlQ2xpY2tlZChzZXJpZXM6IEJhc2VTZXJpZXMpIHtcclxuXHRcdHRoaXMuZXZlbnRTZXJpZURvdWJsZUNsaWNrZWQucmFpc2UodGhpcywgc2VyaWVzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJhaXNlcyB0aGUgY2hhbmdlIHNpemUgZXZlbnRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IHNpemVcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25DaGFuZ2VTaXplKHNpemU6IG51bWJlcikge1xyXG5cdFx0dGhpcy5ldmVudENoYW5nZVNpemUucmFpc2UodGhpcywgc2l6ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb3VzZSBpcyBub3Qgb3ZlciBzaWduYWxNYW5hZ2VyIHdoaWxlIGRyYWdnaW5nIG9wZXJhdGlvblxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtEcmFnRHJvcEFyZ3N9IGFyZ3NcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkcm9wRm9jdXNMb3N0KGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFNpZ25hbE1hbmFnZXJXaWRnZXQgfTsiXX0=