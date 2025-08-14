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
define(["require", "exports", "./model/configManagerWidgetDataModel", "../common/treeGridWidgetBase", "./view/cmTreeGridCellEditTemplate", "./view/cmTreeGridCellEditEvents", "./view/cmTreeGridCellStyle", "./view/cmTreeGridToolbar", "../../models/online/mappCockpitComponent", "./componentDefaultDefinition", "../common/widgetBase"], function (require, exports, configManagerWidgetDataModel_1, treeGridWidgetBase_1, cmTreeGridCellEditTemplate_1, cmTreeGridCellEditEvents_1, cmTreeGridCellStyle_1, cmTreeGridToolbar_1, mappCockpitComponent_1, componentDefaultDefinition_1, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfigManagerWidget = /** @class */ (function (_super) {
        __extends(ConfigManagerWidget, _super);
        function ConfigManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * is edit mode active in the widget
             *
             * @private
             * @type {boolean}
             * @memberof ConfigManagerWidget
             */
            _this._editModeActive = false;
            // holds the update delay timer id
            _this._uiRefreshTimer = -1;
            // specifies the time spent until the effective refresh will be executed
            _this._uiRefreshDelay = 100;
            _this._methods = [];
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        ConfigManagerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Configuration");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 100);
        };
        ConfigManagerWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
        };
        ConfigManagerWidget.prototype.onMethodsUpdated = function (methods) {
            this._methods = methods;
            // get the save configuration method
            this._saveParametersMethod = this.retrieveSaveParametersMethod();
            // disable save button
            var toolbar = this._toolbar;
            toolbar.saveButtonExecutable(false);
            // enable the save button depending on executable state.
            if (this._saveParametersMethod) {
                toolbar.saveButtonExecutable(this._saveParametersMethod.isExecutable.value);
                this._saveParametersMethod.isExecutable.changed(function (isExecutable) {
                    toolbar.saveButtonExecutable(isExecutable);
                });
            }
        };
        ConfigManagerWidget.prototype.retrieveSaveParametersMethod = function () {
            return this._methods.filter(function (method) { return method.browseName == "Save Config"; })[0];
        };
        /**
         * Called when the configuration parameters have been changed
         *
         * @private
         * @param {MappCockpitComponentParameter[]} configurationParameters
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.onConfigurationParametersUpdated = function (configurationParameters) {
            var configManagerDataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ConfigManagerDataModel);
            if (configManagerDataModel != undefined) {
                configManagerDataModel.setEditModeActive(this._editModeActive);
                configManagerDataModel.configurationParameters = configurationParameters;
                this.dataModel = configManagerDataModel;
            }
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.createLayout = function () {
            this.mainDiv.style.overflow = "hidden";
            $(this.mainDiv).append(this.getScriptInformationForTreeGrid());
            _super.prototype.createLayout.call(this);
        };
        /**
         * Sets the component settings deactivates the edit settings by default
         *
         * @param {ComponentSettings} data
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
            }
            // Deactivate the edit mode by default
            this.setEditMode(false);
        };
        /**
         * Returns the template for the display name column (Icons, expand state, display name...)
         *
         * @private
         * @returns {string}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getScriptInformationForTreeGrid = function () {
            var str = "<script type=\"text/x-jsrender\" id=\"cmDisplayNameColumnTemplate\">\n\t\t\t\t<div style='height:24px;' unselectable='on'>\n\t\t\t\t\t<div class='cmIndent' style='width:{{:level*20}}px;'></div>\n                    <div class='cmCollapseExpandIcon'>{{:#data['collapseExpandIconDefinition']}}</div>\n                    <div class='cmNodeIcon'>{{:#data['iconDefinition']}}</div>                   \n                                     \n                    <div class='e-cell cmCell' unselectable='on'>{{:#data['displayName']}}</div>\n                    </div>\n\t\t</script>";
            return str;
        };
        /**
         * Load the styles for the config manager
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/configManagerWidget/style/css/treeGridIconStyles.css");
        };
        ConfigManagerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            // delegate model change processing depending on change type (hint)
            switch (eventArgs.hint) {
                case "writeAccessChanged":
                    this.handleWriteAccessChanged(eventArgs.data);
                    break;
                default:
                    this.updateGridData(sender);
            }
        };
        /**
         * Handles write access changes.
         *
         * @private
         * @param {boolean} writeAccess
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.handleWriteAccessChanged = function (writeAccess) {
            this.updateWriteAccess(writeAccess);
        };
        /**
         * Updates write access related ui states.
         *
         * @param {boolean} writeAccess
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.updateWriteAccess = function (writeAccess) {
            if (this._configManagerWidgetDataModel != undefined) {
                this._configManagerWidgetDataModel.writeAccess = writeAccess;
            }
            var toolbar = this._toolbar;
            toolbar.setWriteAccess(writeAccess);
            this.refresh();
        };
        /**
         * Applies the modified parameters (writes them to target)
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.applyModifiedParameters = function () {
            if (this._configManagerWidgetDataModel) {
                this._configManagerWidgetDataModel.applyModifiedParameters();
            }
        };
        /**
         * Discards parameter modifications
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.discard = function () {
            if (this._configManagerWidgetDataModel) {
                this._configManagerWidgetDataModel.discard();
            }
        };
        /**
         * Executes the save parameters method
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.saveParameters = function () {
            if (this._saveParametersMethod != undefined) {
                if (this._saveParametersMethod.isExecutable != undefined) {
                    if (this._saveParametersMethod.isExecutable.value == true) {
                        mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._saveParametersMethod);
                    }
                }
            }
        };
        /**
         * Activates/Deactivates the edit mode
         *
         * @param {boolean} activate
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.setEditMode = function (activate) {
            this._editModeActive = activate;
            // Set the info if the editmode is active or not to the datamodel
            if (!(this.dataModel instanceof widgetBase_1.NullDataModel)) {
                this.dataModel.setEditModeActive(activate);
            }
            // Show or hide edit mode columns
            var treeObject = this.getTreeGridObject();
            var modifiedValueColumn = treeObject.getColumnByField(ConfigManagerWidget.displayModifiedValueColumnId);
            if (activate == true) {
                treeObject.showColumn(modifiedValueColumn.headerText);
            }
            else {
                treeObject.hideColumn(modifiedValueColumn.headerText);
            }
            this.updateGridData(this.dataModel);
            // Update toolbar button positions(e.g. position of right align toolbar) after hide or show toolbar button
            this._toolbar.resize(this.width);
        };
        /**
         * Handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            this.updateGridData(sender);
        };
        /**
         * Activate the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.activate = function () {
            var componentParameters = this.getComponentParameters();
            if (componentParameters != undefined) {
                mappCockpitComponent_1.MappCockpitComponentParameter.activateComponentModelItems(this.dataModel, componentParameters);
            }
        };
        /**
         * Deactivate the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.deactivate = function () {
            var componentParameters = this.getComponentParameters();
            if (componentParameters) {
                mappCockpitComponent_1.MappCockpitComponentParameter.deactivateComponentModelItems(this.dataModel, componentParameters);
            }
        };
        /**
         * Dispose the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.dispose = function () {
            if (this.dataModel != undefined) {
                this.dataModel.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the tree grid for the configuration structure
         *
         * @protected
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var cellEditEvents = new cmTreeGridCellEditEvents_1.CmTreeGridCellEditEvents();
            var cellStyle = new cmTreeGridCellStyle_1.CmTreeGridCellStyle();
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), { dataSource: undefined, childMapping: "childs", expandStateMapping: "expandState", isResponsive: false, allowReordering: false, editSettings: {
                    allowEditing: true,
                    allowDeleting: false,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false,
                }, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, queryCellInfo: function (args) { return cellStyle.setCellStyle(args, _this._configManagerWidgetDataModel); }, beginEdit: function (args) { return cellEditEvents.beginEdit(args, _this._configManagerWidgetDataModel); }, endEdit: function (args) { return cellEditEvents.endEdit(args, _this._configManagerWidgetDataModel); }, create: function (args) { return _this.treeGridCreated(); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: ConfigManagerWidget.displayNameColumnId, headerText: "Name", width: "300", isTemplateColumn: true, templateID: "cmDisplayNameColumnTemplate" },
                    { field: ConfigManagerWidget.displayModifiedValueColumnId, headerText: "Value", visible: false, width: "180", editType: "stringedit", editTemplate: cmTreeGridCellEditTemplate_1.CmTreeGridCellEditTemplate.createInstance() },
                    { field: ConfigManagerWidget.displayValueColumnId, headerText: "Target Value", width: "180", editType: "stringedit", editTemplate: cmTreeGridCellEditTemplate_1.CmTreeGridCellEditTemplate.createInstance() },
                    { field: ConfigManagerWidget.unitColumnId, headerText: "Unit", width: "100" },
                    { field: ConfigManagerWidget.descriptionColumnId, headerText: "Description", width: "400" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new cmTreeGridToolbar_1.CmTreeGridToolbar(this.mainDiv);
            return _super.prototype.getTreeGridToolbarSupport.call(this);
        };
        /**
         * Handles the collapse/expand events
         *
         * @private
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
        };
        /**
         * Returns the component parameters from the datamodel
         *
         * @private
         * @returns {(Array<MappCockpitComponentParameter>|undefined)}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getComponentParameters = function () {
            return this.dataModel.componentParameters;
        };
        /**
         * Updates the grids data
         *
         * @private
         * @param {IDataModel} dataModel
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.updateGridData = function (dataModel) {
            var newDataModel = new configManagerWidgetDataModel_1.ConfigManagerWidgetDataModel(dataModel);
            if (this._configManagerWidgetDataModel != undefined) {
                newDataModel.writeAccess = this._configManagerWidgetDataModel.writeAccess;
                // set expands states from the current to the new datamodel
                newDataModel.setExpandStates(this._configManagerWidgetDataModel.getDataModel());
                this._configManagerWidgetDataModel.dispose();
            }
            this._configManagerWidgetDataModel = newDataModel;
            var toolbar = this._toolbar;
            toolbar.setTransferPossible(this._configManagerWidgetDataModel.isTransferPossible);
            this.refresh();
        };
        /**
         * refreshes the tree grids data
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.refresh = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // multiple refresh requests will be delayed as long as no request is received within the specified timeout. This in consequence supresses too many updates.
                    this.invokeDelayedUIRefresh();
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Invokes a delayedUI update request
         *
         * @private
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.invokeDelayedUIRefresh = function () {
            var _this = this;
            // reset the current timeout
            clearTimeout(this._uiRefreshTimer);
            // start the next timeout
            this._uiRefreshTimer = setTimeout(function () {
                _this.refreshGrid();
            }, this._uiRefreshDelay);
        };
        /**
         * Refreshes thegrid content
         *
         * @private
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.refreshGrid = function () {
            if (this._configManagerWidgetDataModel != undefined && this.refreshEnabled) {
                var datamodel = this._configManagerWidgetDataModel.getDataModel();
                this.setModelWithEditSupport(datamodel);
            }
        };
        // column definitions
        ConfigManagerWidget.displayNameColumnId = "displayName";
        ConfigManagerWidget.displayModifiedValueColumnId = "modifiedDisplayValue";
        ConfigManagerWidget.displayValueColumnId = "displayValue";
        ConfigManagerWidget.unitColumnId = "unit";
        ConfigManagerWidget.descriptionColumnId = "description";
        return ConfigManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.ConfigManagerWidget = ConfigManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L2NvbmZpZ01hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JBO1FBQWtDLHVDQUFrQjtRQUFwRDtZQUFBLHFFQXlkQztZQXZjRzs7Ozs7O2VBTUc7WUFDSyxxQkFBZSxHQUFZLEtBQUssQ0FBQztZQUV6QyxrQ0FBa0M7WUFDMUIscUJBQWUsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyQyx3RUFBd0U7WUFDaEUscUJBQWUsR0FBVyxHQUFHLENBQUM7WUF5QjlCLGNBQVEsR0FBc0MsRUFBRSxDQUFDOztRQWthN0QsQ0FBQztRQXpiRzs7Ozs7V0FLRztRQUNILGdEQUFrQixHQUFsQjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVELHlDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixpQkFBTSxnQkFBZ0IsWUFBQyxlQUFlLENBQUMsQ0FBQztZQUV4Qyw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxpREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksdURBQTBCLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFLTyw4Q0FBZ0IsR0FBeEIsVUFBeUIsT0FBMEM7WUFDL0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDeEIsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztZQUNqRSxzQkFBc0I7WUFD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Q0FBb0IsR0FBRyxjQUFjLENBQUM7UUFDdEMsZ0NBQVksR0FBRyxNQUFNLENBQUM7UUFDdEIsdUNBQW1CLEdBQUcsYUFBYSxDQUFDO1FBa2Q1RCwwQkFBQztLQUFBLEFBemRELENBQWtDLHVDQUFrQixHQXlkbkQ7SUFFUSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgQ21UcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy9jbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHNcIjtcclxuaW1wb3J0IHsgQ21UcmVlR3JpZENlbGxTdHlsZSB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZENlbGxTdHlsZVwiO1xyXG5pbXBvcnQgeyBDbVRyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBJQ29uZmlnTWFuYWdlcldpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY29uZmlnTWFuYWdlcldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBOdWxsRGF0YU1vZGVsIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcblxyXG5cclxuY2xhc3MgQ29uZmlnTWFuYWdlcldpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElDb25maWdNYW5hZ2VyV2lkZ2V0IHtcclxuICAgIFxyXG4gICAgLy8gY29sdW1uIGRlZmluaXRpb25zXHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBkaXNwbGF5TmFtZUNvbHVtbklkID0gXCJkaXNwbGF5TmFtZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkaXNwbGF5TW9kaWZpZWRWYWx1ZUNvbHVtbklkID0gXCJtb2RpZmllZERpc3BsYXlWYWx1ZVwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGlzcGxheVZhbHVlQ29sdW1uSWQgPSBcImRpc3BsYXlWYWx1ZVwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdW5pdENvbHVtbklkID0gXCJ1bml0XCI7XHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBkZXNjcmlwdGlvbkNvbHVtbklkID0gXCJkZXNjcmlwdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaG9sZHMgdGhlIHVpIGRhdGFtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWx8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWw6IENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWx8dW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGlzIGVkaXQgbW9kZSBhY3RpdmUgaW4gdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2VkaXRNb2RlQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIHVwZGF0ZSBkZWxheSB0aW1lciBpZFxyXG4gICAgcHJpdmF0ZSBfdWlSZWZyZXNoVGltZXI6IG51bWJlciA9IC0xO1xyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSB0aW1lIHNwZW50IHVudGlsIHRoZSBlZmZlY3RpdmUgcmVmcmVzaCB3aWxsIGJlIGV4ZWN1dGVkXHJcbiAgICBwcml2YXRlIF91aVJlZnJlc2hEZWxheTogbnVtYmVyID0gMTAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVmaW5lSGVhZGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiQ29uZmlndXJhdGlvblwiKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigzLCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXREZWZhdWx0RGVmaW5pdGlvbihuZXcgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+ID0gW107XHJcbiAgICBwcml2YXRlIF9zYXZlUGFyYW1ldGVyc01ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8dW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgb25NZXRob2RzVXBkYXRlZChtZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4pIHtcclxuICAgICAgICB0aGlzLl9tZXRob2RzID0gbWV0aG9kcztcclxuICAgICAgICAvLyBnZXQgdGhlIHNhdmUgY29uZmlndXJhdGlvbiBtZXRob2RcclxuICAgICAgICB0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZCA9IHRoaXMucmV0cmlldmVTYXZlUGFyYW1ldGVyc01ldGhvZCgpO1xyXG4gICAgICAgIC8vIGRpc2FibGUgc2F2ZSBidXR0b25cclxuICAgICAgICBsZXQgdG9vbGJhciA9IHRoaXMuX3Rvb2xiYXIgYXMgQ21UcmVlR3JpZFRvb2xiYXI7XHJcbiAgICAgICAgdG9vbGJhci5zYXZlQnV0dG9uRXhlY3V0YWJsZShmYWxzZSk7XHJcbiAgICAgICAgLy8gZW5hYmxlIHRoZSBzYXZlIGJ1dHRvbiBkZXBlbmRpbmcgb24gZXhlY3V0YWJsZSBzdGF0ZS5cclxuICAgICAgICBpZiAodGhpcy5fc2F2ZVBhcmFtZXRlcnNNZXRob2QpIHtcclxuICAgICAgICAgICAgdG9vbGJhci5zYXZlQnV0dG9uRXhlY3V0YWJsZSh0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZC5pc0V4ZWN1dGFibGUuY2hhbmdlZCgoaXNFeGVjdXRhYmxlKT0+e1xyXG4gICAgICAgICAgICAgICAgdG9vbGJhci5zYXZlQnV0dG9uRXhlY3V0YWJsZShpc0V4ZWN1dGFibGUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJldHJpZXZlU2F2ZVBhcmFtZXRlcnNNZXRob2QoKTpNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kcy5maWx0ZXIobWV0aG9kID0+IG1ldGhvZC5icm93c2VOYW1lID09IFwiU2F2ZSBDb25maWdcIilbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzIGhhdmUgYmVlbiBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29uZmlndXJhdGlvblBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db25maWd1cmF0aW9uUGFyYW1ldGVyc1VwZGF0ZWQoY29uZmlndXJhdGlvblBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIGxldCBjb25maWdNYW5hZ2VyRGF0YU1vZGVsID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkNvbmZpZ01hbmFnZXJEYXRhTW9kZWwpIGFzIElDb25maWdNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIGlmIChjb25maWdNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25maWdNYW5hZ2VyRGF0YU1vZGVsLnNldEVkaXRNb2RlQWN0aXZlKHRoaXMuX2VkaXRNb2RlQWN0aXZlKTtcclxuICAgICAgICAgICAgY29uZmlnTWFuYWdlckRhdGFNb2RlbC5jb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IGNvbmZpZ01hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLm92ZXJmbG93ID1cImhpZGRlblwiO1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5hcHBlbmQodGhpcy5nZXRTY3JpcHRJbmZvcm1hdGlvbkZvclRyZWVHcmlkKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1cGVyLmNyZWF0ZUxheW91dCgpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuICAgICAqIFNldHMgdGhlIGNvbXBvbmVudCBzZXR0aW5ncyBkZWFjdGl2YXRlcyB0aGUgZWRpdCBzZXR0aW5ncyBieSBkZWZhdWx0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRTZXR0aW5nc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbXBvbmVudFNldHRpbmdzKGRhdGE6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcbiAgICAgICAgaWYoZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzdXBlci5zZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRGVhY3RpdmF0ZSB0aGUgZWRpdCBtb2RlIGJ5IGRlZmF1bHRcclxuICAgICAgICB0aGlzLnNldEVkaXRNb2RlKGZhbHNlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0ZW1wbGF0ZSBmb3IgdGhlIGRpc3BsYXkgbmFtZSBjb2x1bW4gKEljb25zLCBleHBhbmQgc3RhdGUsIGRpc3BsYXkgbmFtZS4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U2NyaXB0SW5mb3JtYXRpb25Gb3JUcmVlR3JpZCgpIDogc3RyaW5ne1xyXG5cdFx0dmFyIHN0ciA9XHJcblx0XHRgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjbURpc3BsYXlOYW1lQ29sdW1uVGVtcGxhdGVcIj5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPSdoZWlnaHQ6MjRweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nY21JbmRlbnQnIHN0eWxlPSd3aWR0aDp7ezpsZXZlbCoyMH19cHg7Jz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjbUNvbGxhcHNlRXhwYW5kSWNvbic+e3s6I2RhdGFbJ2NvbGxhcHNlRXhwYW5kSWNvbkRlZmluaXRpb24nXX19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY21Ob2RlSWNvbic+e3s6I2RhdGFbJ2ljb25EZWZpbml0aW9uJ119fTwvZGl2PiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2UtY2VsbCBjbUNlbGwnIHVuc2VsZWN0YWJsZT0nb24nPnt7OiNkYXRhWydkaXNwbGF5TmFtZSddfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHRcdDwvc2NyaXB0PmBcclxuXHJcbiAgICAgIHJldHVybiBzdHI7XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCB0aGUgc3R5bGVzIGZvciB0aGUgY29uZmlnIG1hbmFnZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbmZpZ01hbmFnZXJXaWRnZXQvc3R5bGUvY3NzL3RyZWVHcmlkSWNvblN0eWxlcy5jc3NcIik7XHJcbiAgICB9XHJcblxyXG5cdGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuICAgICAgICAvLyBkZWxlZ2F0ZSBtb2RlbCBjaGFuZ2UgcHJvY2Vzc2luZyBkZXBlbmRpbmcgb24gY2hhbmdlIHR5cGUgKGhpbnQpXHJcbiAgICAgICAgc3dpdGNoKGV2ZW50QXJncy5oaW50KXtcclxuICAgICAgICAgICAgY2FzZSBcIndyaXRlQWNjZXNzQ2hhbmdlZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVXcml0ZUFjY2Vzc0NoYW5nZWQoZXZlbnRBcmdzLmRhdGEgYXMgYm9vbGVhbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR3JpZERhdGEoc2VuZGVyIGFzIElDb25maWdNYW5hZ2VyRGF0YU1vZGVsKTtcclxuICAgICAgICB9XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB3cml0ZSBhY2Nlc3MgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB3cml0ZUFjY2Vzc1xyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVXcml0ZUFjY2Vzc0NoYW5nZWQod3JpdGVBY2Nlc3M6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVdyaXRlQWNjZXNzKHdyaXRlQWNjZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgd3JpdGUgYWNjZXNzIHJlbGF0ZWQgdWkgc3RhdGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gd3JpdGVBY2Nlc3NcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVXcml0ZUFjY2Vzcyh3cml0ZUFjY2VzczogYm9vbGVhbikge1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC53cml0ZUFjY2VzcyA9IHdyaXRlQWNjZXNzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdG9vbGJhciA9IHRoaXMuX3Rvb2xiYXIgYXMgQ21UcmVlR3JpZFRvb2xiYXI7XHJcbiAgICAgICAgdG9vbGJhci5zZXRXcml0ZUFjY2Vzcyh3cml0ZUFjY2Vzcyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBsaWVzIHRoZSBtb2RpZmllZCBwYXJhbWV0ZXJzICh3cml0ZXMgdGhlbSB0byB0YXJnZXQpXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFwcGx5TW9kaWZpZWRQYXJhbWV0ZXJzKCl7XHJcbiAgICAgICAgaWYgKCB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwuYXBwbHlNb2RpZmllZFBhcmFtZXRlcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNjYXJkcyBwYXJhbWV0ZXIgbW9kaWZpY2F0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNjYXJkKCl7XHJcbiAgICAgICAgaWYgKCB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwuZGlzY2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIHRoZSBzYXZlIHBhcmFtZXRlcnMgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmVQYXJhbWV0ZXJzKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NhdmVQYXJhbWV0ZXJzTWV0aG9kICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2F2ZVBhcmFtZXRlcnNNZXRob2QuaXNFeGVjdXRhYmxlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NhdmVQYXJhbWV0ZXJzTWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuZXhlY3V0ZSh0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZXMvRGVhY3RpdmF0ZXMgdGhlIGVkaXQgbW9kZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRFZGl0TW9kZShhY3RpdmF0ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5fZWRpdE1vZGVBY3RpdmUgPSBhY3RpdmF0ZTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRoZSBpbmZvIGlmIHRoZSBlZGl0bW9kZSBpcyBhY3RpdmUgb3Igbm90IHRvIHRoZSBkYXRhbW9kZWxcclxuICAgICAgICBpZighKHRoaXMuZGF0YU1vZGVsIGluc3RhbmNlb2YgTnVsbERhdGFNb2RlbCkpe1xyXG4gICAgICAgICAgICAodGhpcy5kYXRhTW9kZWwgYXMgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWwpLnNldEVkaXRNb2RlQWN0aXZlKGFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNob3cgb3IgaGlkZSBlZGl0IG1vZGUgY29sdW1uc1xyXG5cdFx0bGV0IHRyZWVPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7IFxyXG5cdFx0bGV0IG1vZGlmaWVkVmFsdWVDb2x1bW4gPSB0cmVlT2JqZWN0LmdldENvbHVtbkJ5RmllbGQoQ29uZmlnTWFuYWdlcldpZGdldC5kaXNwbGF5TW9kaWZpZWRWYWx1ZUNvbHVtbklkKTtcclxuXHRcdGlmKGFjdGl2YXRlID09IHRydWUpe1xyXG5cdFx0XHR0cmVlT2JqZWN0LnNob3dDb2x1bW4obW9kaWZpZWRWYWx1ZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHRyZWVPYmplY3QuaGlkZUNvbHVtbihtb2RpZmllZFZhbHVlQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0fVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUdyaWREYXRhKHRoaXMuZGF0YU1vZGVsIGFzIElDb25maWdNYW5hZ2VyRGF0YU1vZGVsKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBVcGRhdGUgdG9vbGJhciBidXR0b24gcG9zaXRpb25zKGUuZy4gcG9zaXRpb24gb2YgcmlnaHQgYWxpZ24gdG9vbGJhcikgYWZ0ZXIgaGlkZSBvciBzaG93IHRvb2xiYXIgYnV0dG9uXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5yZXNpemUodGhpcy53aWR0aCk7XHJcbiAgICB9XHJcblx0XHJcblx0LyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBjaGFuZ2VzIG9mIG9ic2VydmVkIGl0ZW1zIHJlcXVlc3RlZCBieSAnb2JzZXJ2ZURhdGFNb2RlbEl0ZW1zJ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZXZlbnRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUdyaWREYXRhKHNlbmRlciBhcyBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAgICAqIEFjdGl2YXRlIHRoZSBjb25maWdtYW5hZ2Vyd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICBsZXQgY29tcG9uZW50UGFyYW1ldGVycyA9IHRoaXMuZ2V0Q29tcG9uZW50UGFyYW1ldGVycygpO1xyXG4gICAgICAgIGlmKGNvbXBvbmVudFBhcmFtZXRlcnMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMuZGF0YU1vZGVsLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZSB0aGUgY29uZmlnbWFuYWdlcndpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRlYWN0aXZhdGUoKXtcclxuICAgICAgICBsZXQgY29tcG9uZW50UGFyYW1ldGVycyA9IHRoaXMuZ2V0Q29tcG9uZW50UGFyYW1ldGVycygpO1xyXG4gICAgICAgIGlmKGNvbXBvbmVudFBhcmFtZXRlcnMpe1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5kZWFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLmRhdGFNb2RlbCwgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgY29uZmlnbWFuYWdlcndpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG4gICAgICBcclxuXHQvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIGNvbmZpZ3VyYXRpb24gc3RydWN0dXJlXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCl7XHJcbiAgICAgICAgbGV0IGNlbGxFZGl0RXZlbnRzID0gbmV3IENtVHJlZUdyaWRDZWxsRWRpdEV2ZW50cygpO1xyXG4gICAgICAgIGxldCBjZWxsU3R5bGUgPSBuZXcgQ21UcmVlR3JpZENlbGxTdHlsZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHRcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgY2hpbGRNYXBwaW5nOlwiY2hpbGRzXCIsXHJcbiAgICAgICAgICAgIGV4cGFuZFN0YXRlTWFwcGluZzogXCJleHBhbmRTdGF0ZVwiLFxyXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmU6IGZhbHNlLCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhbGxvd1Jlb3JkZXJpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIGFsbG93RWRpdGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFsbG93RGVsZXRpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dEZWxldGVDb25maXJtRGlhbG9nICA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1EaWFsb2cgIDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIFxyXG5cdFx0XHRleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cdFx0XHRjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuICAgICAgICAgICAgcXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IGNlbGxTdHlsZS5zZXRDZWxsU3R5bGUoYXJncywgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCksXHJcbiAgICAgICAgICAgIGJlZ2luRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmJlZ2luRWRpdChhcmdzLCB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKSxcclxuICAgICAgICAgICAgZW5kRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmVuZEVkaXQoYXJncywgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCksXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBDb25maWdNYW5hZ2VyV2lkZ2V0LmRpc3BsYXlOYW1lQ29sdW1uSWQsIGhlYWRlclRleHQ6IFwiTmFtZVwiLCB3aWR0aDogXCIzMDBcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJjbURpc3BsYXlOYW1lQ29sdW1uVGVtcGxhdGVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogQ29uZmlnTWFuYWdlcldpZGdldC5kaXNwbGF5TW9kaWZpZWRWYWx1ZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHZpc2libGU6IGZhbHNlLCB3aWR0aDogXCIxODBcIiwgZWRpdFR5cGU6IFwic3RyaW5nZWRpdFwiLCBlZGl0VGVtcGxhdGU6IENtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLmNyZWF0ZUluc3RhbmNlKCl9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogQ29uZmlnTWFuYWdlcldpZGdldC5kaXNwbGF5VmFsdWVDb2x1bW5JZCwgaGVhZGVyVGV4dDogXCJUYXJnZXQgVmFsdWVcIiwgd2lkdGg6IFwiMTgwXCIsIGVkaXRUeXBlOiBcInN0cmluZ2VkaXRcIiwgZWRpdFRlbXBsYXRlOiBDbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZS5jcmVhdGVJbnN0YW5jZSgpfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IENvbmZpZ01hbmFnZXJXaWRnZXQudW5pdENvbHVtbklkLCBoZWFkZXJUZXh0OiBcIlVuaXRcIiwgd2lkdGg6IFwiMTAwXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IENvbmZpZ01hbmFnZXJXaWRnZXQuZGVzY3JpcHRpb25Db2x1bW5JZCwgaGVhZGVyVGV4dDogXCJEZXNjcmlwdGlvblwiLCB3aWR0aDogXCI0MDBcIiB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgQ21UcmVlR3JpZFRvb2xiYXIodGhpcy5tYWluRGl2KTtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpO1xyXG4gICAgfVx0XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBjb2xsYXBzZS9leHBhbmQgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpe1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzIGZyb20gdGhlIGRhdGFtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDb21wb25lbnRQYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGFNb2RlbCBhcyBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCkuY29tcG9uZW50UGFyYW1ldGVycztcclxuICAgIH1cclxuXHQvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGdyaWRzIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBkYXRhTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlR3JpZERhdGEoZGF0YU1vZGVsOiBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgIGxldCBuZXdEYXRhTW9kZWwgPSBuZXcgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbChkYXRhTW9kZWwpO1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbmV3RGF0YU1vZGVsLndyaXRlQWNjZXNzID0gdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC53cml0ZUFjY2VzcztcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBleHBhbmRzIHN0YXRlcyBmcm9tIHRoZSBjdXJyZW50IHRvIHRoZSBuZXcgZGF0YW1vZGVsXHJcbiAgICAgICAgICAgIG5ld0RhdGFNb2RlbC5zZXRFeHBhbmRTdGF0ZXModGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5nZXREYXRhTW9kZWwoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsID0gbmV3RGF0YU1vZGVsO1xyXG4gICAgICAgIGxldCB0b29sYmFyID0gdGhpcy5fdG9vbGJhciBhcyBDbVRyZWVHcmlkVG9vbGJhcjtcclxuICAgICAgICB0b29sYmFyLnNldFRyYW5zZmVyUG9zc2libGUodGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5pc1RyYW5zZmVyUG9zc2libGUpO1xyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblx0fVxyXG5cdCAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogcmVmcmVzaGVzIHRoZSB0cmVlIGdyaWRzIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgcmVmcmVzaCgpe1xyXG5cclxuICAgICAgICAvLyBtdWx0aXBsZSByZWZyZXNoIHJlcXVlc3RzIHdpbGwgYmUgZGVsYXllZCBhcyBsb25nIGFzIG5vIHJlcXVlc3QgaXMgcmVjZWl2ZWQgd2l0aGluIHRoZSBzcGVjaWZpZWQgdGltZW91dC4gVGhpcyBpbiBjb25zZXF1ZW5jZSBzdXByZXNzZXMgdG9vIG1hbnkgdXBkYXRlcy5cclxuICAgICAgIHRoaXMuaW52b2tlRGVsYXllZFVJUmVmcmVzaCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgYSBkZWxheWVkVUkgdXBkYXRlIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgIHByaXZhdGUgaW52b2tlRGVsYXllZFVJUmVmcmVzaCgpIHtcclxuXHJcbiAgICAgICAgLy8gcmVzZXQgdGhlIGN1cnJlbnQgdGltZW91dFxyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl91aVJlZnJlc2hUaW1lcik7XHJcblxyXG4gICAgICAgIC8vIHN0YXJ0IHRoZSBuZXh0IHRpbWVvdXRcclxuICAgICAgICB0aGlzLl91aVJlZnJlc2hUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hHcmlkKCk7ICAgXHJcbiAgICAgICAgfSx0aGlzLl91aVJlZnJlc2hEZWxheSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaGVzIHRoZWdyaWQgY29udGVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hHcmlkKCkge1xyXG4gICAgIFxyXG4gICAgICAgIGlmICh0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsICE9IHVuZGVmaW5lZCAmJiB0aGlzLnJlZnJlc2hFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhbW9kZWwgPSB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmdldERhdGFNb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGVsV2l0aEVkaXRTdXBwb3J0KGRhdGFtb2RlbCk7XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IENvbmZpZ01hbmFnZXJXaWRnZXQgfTsiXX0=