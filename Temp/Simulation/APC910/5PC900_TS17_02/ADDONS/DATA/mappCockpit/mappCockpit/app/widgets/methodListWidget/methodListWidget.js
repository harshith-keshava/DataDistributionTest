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
define(["require", "exports", "../../framework/events", "./view/methodsGridToolbar", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "../../models/online/mappCockpitComponentReflection", "../common/domHelper", "./componentDefaultDefinition"], function (require, exports, events_1, methodsGridToolbar_1, treeGridWidgetBase_1, mappCockpitComponent_1, mappCockpitComponentReflection_1, domHelper_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSelectionChanged = /** @class */ (function (_super) {
        __extends(EventSelectionChanged, _super);
        function EventSelectionChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSelectionChanged;
    }(events_1.TypedEvent));
    ;
    /**
     * implements the MethodList widget
     *
     * @class MethodListWidget
     * @extends {TreeGridWidgetBase}
     * @implements {IMethodListWidget}
     */
    var MethodListWidget = /** @class */ (function (_super) {
        __extends(MethodListWidget, _super);
        function MethodListWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventSelectionChanged = new EventSelectionChanged();
            _this._executableMethods = [];
            _this._quickCommands = [];
            _this._uiRefreshTimer = -1;
            _this._uiRefreshDelay = 100;
            _this._methodsLoaded = false;
            _this._quickCommandsLoaded = false;
            return _this;
        }
        MethodListWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        MethodListWidget.prototype.initialized = function () {
            // invoke creating the methods bindings 
        };
        /**
          * Are the methods and quick commands infos already available(via binding)
          *
          * @private
          * @returns {boolean}
          * @memberof MethodListWidget
          */
        MethodListWidget.prototype.allBindingsDataAvailable = function () {
            if (this._methodsLoaded == true && this._quickCommandsLoaded == true) {
                return true;
            }
            return false;
        };
        /**
         * Called when the methods have been updated
         *
         * @private
         * @param {MappCockpitComponentMethod[]} userMethods
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.onMethodsUpdated = function (methods) {
            // update the methods
            this._executableMethods = methods;
            this._methodsLoaded = true;
            if (this.allBindingsDataAvailable() == true) {
                // after receiving all required data sets (methods,watchables and quick commands), the methodlist can be initialized
                this.initializeMethodlist();
            }
        };
        /**
         * Called when the quick commands have been updated
         *
         * @private
         * @param {MappCockpitComponentMethod[]} methods
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.onQuickCommandsUpdated = function (quickCommands) {
            // update the quick commands
            this._quickCommands = quickCommands;
            this._quickCommandsLoaded = true;
            if (this.allBindingsDataAvailable() == true) {
                // after receiving all required data sets (methods,watchables and quick commands), the methodlist can be initialized
                this.initializeMethodlist();
            }
        };
        /**
         * Initializes the method list widget and updates the ui
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.initializeMethodlist = function () {
            var _this = this;
            // initialize the method parameters default values
            this._executableMethods.forEach(function (executableMethod) {
                mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.updateMethodInputParameters(executableMethod);
                _this.observeMethodExecutability(executableMethod);
            });
            this.addToolBarButtons();
        };
        /**
         * Observes if the executability of the methods has changed
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.observeMethodExecutability = function (executableMethod) {
            var _this = this;
            executableMethod.isExecutable.attachObserver(this, function (isExecutable) {
                // refreshes the methods executable state
                _this.refreshMethodState(executableMethod, isExecutable);
            });
        };
        /**
         * Refreshes a single methods executable state
         *
         * @private
         * @param {MappCockpitComponentMethod} method
         * @param {boolean} isExecutable
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.refreshMethodState = function (method, isExecutable) {
            if (this.isTreeGridDataSourceInitialized()) {
                this.invokeDelayedUIRefresh();
            }
        };
        /**
         * Invokes a delayedUI update request
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.invokeDelayedUIRefresh = function () {
            var _this = this;
            // reset the current timeout
            clearTimeout(this._uiRefreshTimer);
            // start the next timeout
            this._uiRefreshTimer = setTimeout(function () {
                _this.updateMethodsList();
            }, this._uiRefreshDelay);
        };
        /**
         * Activates the method list widget
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.activate = function () {
        };
        /**
         * Dispose some objects from the widget
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.dispose = function () {
            // detach observers
            this.detachMethodsExecutabilityObservation();
            if (this._methodsToolbar != undefined) {
                this._methodsToolbar.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Detaches observation of the methods executability
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.detachMethodsExecutabilityObservation = function () {
            var _this = this;
            this._executableMethods.forEach(function (executableMethod) {
                mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.updateMethodInputParameters(executableMethod);
                executableMethod.isExecutable.detachObserver(_this);
            });
        };
        /**
         * Loads the styles for the method list toolbar buttons
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/methodListWidget/style/css/methodListToolbarButtonStyle.css");
        };
        /**
         * Creates the tree grid for the methods list
         *
         * @protected
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var methodsDataSource = [];
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridToolbarSupport()), { dataSource: methodsDataSource, editSettings: {
                    allowDeleting: false,
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                }, childMapping: "childs", isResponsive: false, rowSelected: function (args) { return _this.handleMethodListItemSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, queryCellInfo: function (args) { return _this.showMethodDisabledIfNotExecutable(args); } }));
        };
        /**
         * Returns true if dataSource treegrid has been initialized with this._executableMethods
         *
         * @private
         * @returns {boolean}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.isTreeGridDataSourceInitialized = function () {
            var treeGridObj = this.getTreeGridObject();
            if (treeGridObj != undefined && treeGridObj.model.dataSource != undefined) {
                var dataSource = treeGridObj.model.dataSource;
                //Check if tree grid dataSource has not been initialized.
                if (dataSource.length == 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Command", width: "250" },
                ],
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @protected
         * @returns {{}}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.getTreeGridToolbarSupport = function () {
            this._methodsToolbar = new methodsGridToolbar_1.MethodGridToolbar(); // TODO: use _toolbar and super.getTreeGridToolbarSupport()
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._methodsToolbar.getDefaultToolbarButtons()
                },
            };
        };
        /**
         * Add toolbar buttons with quickCommands info
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.addToolBarButtons = function () {
            if (this._quickCommands.length > 0) {
                this.addToolbarSettingsToTreeGrid();
                this.addQuickCommandButtons();
            }
            else {
                this.updateMethodsList();
                this._methodsToolbar.addDefaultToolbarButtons();
            }
            this._methodsToolbar.setActualComponentMethods(this._executableMethods);
        };
        /**
         * Add quick command buttons to treegrid's toolbar
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.addQuickCommandButtons = function () {
            var _this = this;
            this._quickCommands.forEach(function (command) {
                _this._methodsToolbar.addQuickCommandsToolbarButtons(command.name, command.imageName);
            });
        };
        MethodListWidget.prototype.treeGridCreated = function () {
            //super.treeGridCreated();
            this._methodsToolbar.initToolbar(this.mainDiv);
            // Resize needed because toolbar size is changed
            this.resize(this.width, this.height);
            this.updateMethodsList();
        };
        MethodListWidget.prototype.showMethodDisabledIfNotExecutable = function (args) {
            if (args.column.field == "displayName") {
                if (args.data.item != undefined && args.data.item.isExecutable != undefined) {
                    if (args.cellElement.classList != undefined) {
                        // Show ReadOnly cell with other color
                        var disableTreeCellClassName = "treeCellDisabled";
                        if (args.data.item.isExecutable.value == false) {
                            args.cellElement.classList.add(disableTreeCellClassName);
                        }
                        else {
                            args.cellElement.classList.remove(disableTreeCellClassName);
                        }
                    }
                    domHelper_1.DomHelper.disableElement(args.cellElement, !args.data.item.isExecutable.value);
                }
            }
        };
        /**
         * updates the commands data
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.updateMethodsList = function () {
            $(this.mainDiv).ejTreeGrid({
                dataSource: this.getDataModel()
            });
        };
        MethodListWidget.prototype.getDataModel = function () {
            return this._executableMethods;
            /*let temp = new Array();
            let group1= {childs: new Array(), displayName: "Initialisation"};
            let group2= {childs: new Array(), displayName: "Movement"}
            let group3= {childs: new Array(), displayName: "Others"}
            temp.push(group1);
            temp.push(group2);
            temp.push(group3);
    
            group1.childs = this._executableMethods.slice(0,5);
            group2.childs = this._executableMethods.slice(5,11);
            group3.childs = this._executableMethods.slice(16);
            return temp;*/
        };
        /**
         * First time treegrid is updated, toolbar buttons are inserted
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.addToolbarSettingsToTreeGrid = function () {
            $(this.mainDiv).ejTreeGrid({
                dataSource: this.getDataModel(),
                toolbarSettings: {
                    customToolbarItems: this._methodsToolbar.getCustomToolbars(this._quickCommands)
                }
            });
        };
        /**
         * handles selections of method items
         *
         * @param {*} args
         * @returns {*}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.handleMethodListItemSelected = function (args) {
            // update the method parameter list after a method has been selected.
            if (args.data.item && args.data.item instanceof mappCockpitComponent_1.MappCockpitComponentMethod) {
                this.onSelectionChanged(args.data.item);
            }
        };
        MethodListWidget.prototype.onSelectionChanged = function (method) {
            this.eventSelectionChanged.raise(null, method);
        };
        return MethodListWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.MethodListWidget = MethodListWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kTGlzdFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L21ldGhvZExpc3RXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBb0MseUNBQTRDO1FBQWhGOztRQUFrRixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQW5GLENBQW9DLG1CQUFVLEdBQXFDO0lBQUEsQ0FBQztJQUVwRjs7Ozs7O09BTUc7SUFDSDtRQUErQixvQ0FBa0I7UUFBakQ7WUFBQSxxRUFpWUM7WUEvWEcsMkJBQXFCLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1lBRzVDLHdCQUFrQixHQUFpQyxFQUFFLENBQUM7WUFDdEQsb0JBQWMsR0FBd0MsRUFBRSxDQUFDO1lBRXpELHFCQUFlLEdBQVUsQ0FBQyxDQUFDLENBQUM7WUFDNUIscUJBQWUsR0FBVSxHQUFHLENBQUM7WUFHN0Isb0JBQWMsR0FBRyxLQUFLLENBQUM7WUFDdkIsMEJBQW9CLEdBQUcsS0FBSyxDQUFDOztRQW9YekMsQ0FBQztRQWxYRyw4Q0FBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksdURBQTBCLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRUQsc0NBQVcsR0FBWDtZQUNJLHdDQUF3QztRQUM1QyxDQUFDO1FBRUQ7Ozs7OztZQU1JO1FBQ0ksbURBQXdCLEdBQWhDO1lBQ0ksSUFBRyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksSUFBSSxFQUFDO2dCQUNoRSxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVE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QUFrQixHQWlZaEQ7SUFFUSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWV0aG9kTGlzdFdpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0aG9kTGlzdFdpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgTWV0aG9kR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L21ldGhvZHNHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuaW1wb3J0IHsgRG9tSGVscGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9kb21IZWxwZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5cclxuY2xhc3MgRXZlbnRTZWxlY3Rpb25DaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD57IH07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgTWV0aG9kTGlzdCB3aWRnZXRcclxuICpcclxuICogQGNsYXNzIE1ldGhvZExpc3RXaWRnZXRcclxuICogQGV4dGVuZHMge1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lNZXRob2RMaXN0V2lkZ2V0fVxyXG4gKi9cclxuY2xhc3MgTWV0aG9kTGlzdFdpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElNZXRob2RMaXN0V2lkZ2V0IHtcclxuXHJcbiAgICBldmVudFNlbGVjdGlvbkNoYW5nZWQgPSBuZXcgRXZlbnRTZWxlY3Rpb25DaGFuZ2VkKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kc1Rvb2xiYXIhOiBNZXRob2RHcmlkVG9vbGJhcjtcclxuICAgIHByaXZhdGUgX2V4ZWN1dGFibGVNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdID0gW107XHJcbiAgICBwcml2YXRlIF9xdWlja0NvbW1hbmRzIDogTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgX3VpUmVmcmVzaFRpbWVyOm51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfdWlSZWZyZXNoRGVsYXk6bnVtYmVyID0gMTAwO1xyXG4gICAgXHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfcXVpY2tDb21tYW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICAvLyBpbnZva2UgY3JlYXRpbmcgdGhlIG1ldGhvZHMgYmluZGluZ3MgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogQXJlIHRoZSBtZXRob2RzIGFuZCBxdWljayBjb21tYW5kcyBpbmZvcyBhbHJlYWR5IGF2YWlsYWJsZSh2aWEgYmluZGluZylcclxuICAgICAgKlxyXG4gICAgICAqIEBwcml2YXRlXHJcbiAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAgKi9cclxuICAgIHByaXZhdGUgYWxsQmluZGluZ3NEYXRhQXZhaWxhYmxlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYodGhpcy5fbWV0aG9kc0xvYWRlZCA9PSB0cnVlICYmIHRoaXMuX3F1aWNrQ29tbWFuZHNMb2FkZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgbWV0aG9kcyBoYXZlIGJlZW4gdXBkYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IHVzZXJNZXRob2RzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTWV0aG9kc1VwZGF0ZWQobWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSkge1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIG1ldGhvZHNcclxuICAgICAgICB0aGlzLl9leGVjdXRhYmxlTWV0aG9kcyA9IG1ldGhvZHM7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kc0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuYWxsQmluZGluZ3NEYXRhQXZhaWxhYmxlKCkgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIC8vIGFmdGVyIHJlY2VpdmluZyBhbGwgcmVxdWlyZWQgZGF0YSBzZXRzIChtZXRob2RzLHdhdGNoYWJsZXMgYW5kIHF1aWNrIGNvbW1hbmRzKSwgdGhlIG1ldGhvZGxpc3QgY2FuIGJlIGluaXRpYWxpemVkXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZU1ldGhvZGxpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgcXVpY2sgY29tbWFuZHMgaGF2ZSBiZWVuIHVwZGF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfSBtZXRob2RzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUXVpY2tDb21tYW5kc1VwZGF0ZWQocXVpY2tDb21tYW5kczogTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXSkge1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIHF1aWNrIGNvbW1hbmRzXHJcbiAgICAgICAgdGhpcy5fcXVpY2tDb21tYW5kcyA9IHF1aWNrQ29tbWFuZHM7XHJcbiAgICAgICAgdGhpcy5fcXVpY2tDb21tYW5kc0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuYWxsQmluZGluZ3NEYXRhQXZhaWxhYmxlKCkgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIC8vIGFmdGVyIHJlY2VpdmluZyBhbGwgcmVxdWlyZWQgZGF0YSBzZXRzIChtZXRob2RzLHdhdGNoYWJsZXMgYW5kIHF1aWNrIGNvbW1hbmRzKSwgdGhlIG1ldGhvZGxpc3QgY2FuIGJlIGluaXRpYWxpemVkXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZU1ldGhvZGxpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgbWV0aG9kIGxpc3Qgd2lkZ2V0IGFuZCB1cGRhdGVzIHRoZSB1aVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVNZXRob2RsaXN0KCkge1xyXG5cclxuICAgICAgICAvLyBpbml0aWFsaXplIHRoZSBtZXRob2QgcGFyYW1ldGVycyBkZWZhdWx0IHZhbHVlc1xyXG4gICAgICAgIHRoaXMuX2V4ZWN1dGFibGVNZXRob2RzLmZvckVhY2goKGV4ZWN1dGFibGVNZXRob2QpPT57XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlcnMoZXhlY3V0YWJsZU1ldGhvZCk7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHkoZXhlY3V0YWJsZU1ldGhvZCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmFkZFRvb2xCYXJCdXR0b25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZlcyBpZiB0aGUgZXhlY3V0YWJpbGl0eSBvZiB0aGUgbWV0aG9kcyBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9ic2VydmVNZXRob2RFeGVjdXRhYmlsaXR5KGV4ZWN1dGFibGVNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgZXhlY3V0YWJsZU1ldGhvZC5pc0V4ZWN1dGFibGUuYXR0YWNoT2JzZXJ2ZXIodGhpcywoaXNFeGVjdXRhYmxlKT0+e1xyXG4gICAgICAgICAgICAvLyByZWZyZXNoZXMgdGhlIG1ldGhvZHMgZXhlY3V0YWJsZSBzdGF0ZVxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hNZXRob2RTdGF0ZShleGVjdXRhYmxlTWV0aG9kLCBpc0V4ZWN1dGFibGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2hlcyBhIHNpbmdsZSBtZXRob2RzIGV4ZWN1dGFibGUgc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRXhlY3V0YWJsZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgIHByaXZhdGUgcmVmcmVzaE1ldGhvZFN0YXRlKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIGlzRXhlY3V0YWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVHJlZUdyaWREYXRhU291cmNlSW5pdGlhbGl6ZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmludm9rZURlbGF5ZWRVSVJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIGEgZGVsYXllZFVJIHVwZGF0ZSByZXF1ZXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW52b2tlRGVsYXllZFVJUmVmcmVzaCgpIHtcclxuXHJcbiAgICAgICAgLy8gcmVzZXQgdGhlIGN1cnJlbnQgdGltZW91dFxyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl91aVJlZnJlc2hUaW1lcik7XHJcblxyXG4gICAgICAgIC8vIHN0YXJ0IHRoZSBuZXh0IHRpbWVvdXRcclxuICAgICAgICB0aGlzLl91aVJlZnJlc2hUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1ldGhvZHNMaXN0KCk7IFxyXG4gICAgICAgIH0sdGhpcy5fdWlSZWZyZXNoRGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIHRoZSBtZXRob2QgbGlzdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2Ugc29tZSBvYmplY3RzIGZyb20gdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuXHJcbiAgICAgICAgLy8gZGV0YWNoIG9ic2VydmVyc1xyXG4gICAgICAgIHRoaXMuZGV0YWNoTWV0aG9kc0V4ZWN1dGFiaWxpdHlPYnNlcnZhdGlvbigpO1xyXG5cclxuICAgICAgICBpZih0aGlzLl9tZXRob2RzVG9vbGJhciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRob2RzVG9vbGJhci5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyBvYnNlcnZhdGlvbiBvZiB0aGUgbWV0aG9kcyBleGVjdXRhYmlsaXR5XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoTWV0aG9kc0V4ZWN1dGFiaWxpdHlPYnNlcnZhdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9leGVjdXRhYmxlTWV0aG9kcy5mb3JFYWNoKChleGVjdXRhYmxlTWV0aG9kKSA9PiB7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlcnMoZXhlY3V0YWJsZU1ldGhvZCk7XHJcbiAgICAgICAgICAgIGV4ZWN1dGFibGVNZXRob2QuaXNFeGVjdXRhYmxlLmRldGFjaE9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIG1ldGhvZCBsaXN0IHRvb2xiYXIgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvc3R5bGUvY3NzL21ldGhvZExpc3RUb29sYmFyQnV0dG9uU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgbWV0aG9kcyBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgIHZhciBtZXRob2RzRGF0YVNvdXJjZSA9IFtdO1xyXG5cclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogbWV0aG9kc0RhdGFTb3VyY2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBcclxuICAgICAgICAgICAgICAgIGFsbG93RGVsZXRpbmcgOiBmYWxzZSAsXHJcbiAgICAgICAgICAgICAgICBzaG93RGVsZXRlQ29uZmlybURpYWxvZyAgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dDb25maXJtRGlhbG9nICA6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoaWxkTWFwcGluZzogXCJjaGlsZHNcIixcclxuICAgICAgICAgICAgaXNSZXNwb25zaXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgcm93U2VsZWN0ZWQ6IChhcmdzKSA9PiB0aGlzLmhhbmRsZU1ldGhvZExpc3RJdGVtU2VsZWN0ZWQoYXJncyksXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiB0aGlzLnNob3dNZXRob2REaXNhYmxlZElmTm90RXhlY3V0YWJsZShhcmdzKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBkYXRhU291cmNlIHRyZWVncmlkIGhhcyBiZWVuIGluaXRpYWxpemVkIHdpdGggdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzVHJlZUdyaWREYXRhU291cmNlSW5pdGlhbGl6ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIGlmICh0cmVlR3JpZE9iaiAhPSB1bmRlZmluZWQgJiYgdHJlZUdyaWRPYmoubW9kZWwuZGF0YVNvdXJjZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFTb3VyY2UgPSB0cmVlR3JpZE9iai5tb2RlbC5kYXRhU291cmNlO1xyXG5cclxuICAgICAgICAgICAgLy9DaGVjayBpZiB0cmVlIGdyaWQgZGF0YVNvdXJjZSBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQuXHJcbiAgICAgICAgICAgIGlmIChkYXRhU291cmNlLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJDb21tYW5kXCIsIHdpZHRoOiBcIjI1MFwifSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl9tZXRob2RzVG9vbGJhciA9IG5ldyBNZXRob2RHcmlkVG9vbGJhcigpOyAvLyBUT0RPOiB1c2UgX3Rvb2xiYXIgYW5kIHN1cGVyLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX21ldGhvZHNUb29sYmFyLmdldERlZmF1bHRUb29sYmFyQnV0dG9ucygpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCB0b29sYmFyIGJ1dHRvbnMgd2l0aCBxdWlja0NvbW1hbmRzIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUb29sQmFyQnV0dG9ucygpIHtcclxuICAgICAgICBpZiAodGhpcy5fcXVpY2tDb21tYW5kcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVG9vbGJhclNldHRpbmdzVG9UcmVlR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFF1aWNrQ29tbWFuZEJ1dHRvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWV0aG9kc0xpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kc1Rvb2xiYXIuYWRkRGVmYXVsdFRvb2xiYXJCdXR0b25zKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICB0aGlzLl9tZXRob2RzVG9vbGJhci5zZXRBY3R1YWxDb21wb25lbnRNZXRob2RzKHRoaXMuX2V4ZWN1dGFibGVNZXRob2RzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBxdWljayBjb21tYW5kIGJ1dHRvbnMgdG8gdHJlZWdyaWQncyB0b29sYmFyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkUXVpY2tDb21tYW5kQnV0dG9ucygpIHtcclxuICAgICAgICB0aGlzLl9xdWlja0NvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRob2RzVG9vbGJhci5hZGRRdWlja0NvbW1hbmRzVG9vbGJhckJ1dHRvbnMoY29tbWFuZC5uYW1lLCBjb21tYW5kLmltYWdlTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCB0cmVlR3JpZENyZWF0ZWQoKXtcclxuICAgICAgICAvL3N1cGVyLnRyZWVHcmlkQ3JlYXRlZCgpO1xyXG4gICAgICAgIHRoaXMuX21ldGhvZHNUb29sYmFyLmluaXRUb29sYmFyKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgLy8gUmVzaXplIG5lZWRlZCBiZWNhdXNlIHRvb2xiYXIgc2l6ZSBpcyBjaGFuZ2VkXHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZU1ldGhvZHNMaXN0KClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dNZXRob2REaXNhYmxlZElmTm90RXhlY3V0YWJsZShhcmdzKXtcclxuICAgICAgICBpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJkaXNwbGF5TmFtZVwiKXtcclxuICAgICAgICAgICAgaWYoYXJncy5kYXRhLml0ZW0gIT0gdW5kZWZpbmVkICYmIGFyZ3MuZGF0YS5pdGVtLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTaG93IFJlYWRPbmx5IGNlbGwgd2l0aCBvdGhlciBjb2xvclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUgPSBcInRyZWVDZWxsRGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGFyZ3MuY2VsbEVsZW1lbnQsICFhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgY29tbWFuZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZU1ldGhvZHNMaXN0KCkge1xyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5nZXREYXRhTW9kZWwoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGF0YU1vZGVsKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4ZWN1dGFibGVNZXRob2RzO1xyXG4gICAgICAgIC8qbGV0IHRlbXAgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQgZ3JvdXAxPSB7Y2hpbGRzOiBuZXcgQXJyYXkoKSwgZGlzcGxheU5hbWU6IFwiSW5pdGlhbGlzYXRpb25cIn07XHJcbiAgICAgICAgbGV0IGdyb3VwMj0ge2NoaWxkczogbmV3IEFycmF5KCksIGRpc3BsYXlOYW1lOiBcIk1vdmVtZW50XCJ9XHJcbiAgICAgICAgbGV0IGdyb3VwMz0ge2NoaWxkczogbmV3IEFycmF5KCksIGRpc3BsYXlOYW1lOiBcIk90aGVyc1wifVxyXG4gICAgICAgIHRlbXAucHVzaChncm91cDEpO1xyXG4gICAgICAgIHRlbXAucHVzaChncm91cDIpO1xyXG4gICAgICAgIHRlbXAucHVzaChncm91cDMpO1xyXG5cclxuICAgICAgICBncm91cDEuY2hpbGRzID0gdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMuc2xpY2UoMCw1KTtcclxuICAgICAgICBncm91cDIuY2hpbGRzID0gdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMuc2xpY2UoNSwxMSk7XHJcbiAgICAgICAgZ3JvdXAzLmNoaWxkcyA9IHRoaXMuX2V4ZWN1dGFibGVNZXRob2RzLnNsaWNlKDE2KTtcclxuICAgICAgICByZXR1cm4gdGVtcDsqL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyc3QgdGltZSB0cmVlZ3JpZCBpcyB1cGRhdGVkLCB0b29sYmFyIGJ1dHRvbnMgYXJlIGluc2VydGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVG9vbGJhclNldHRpbmdzVG9UcmVlR3JpZCgpIHtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuZ2V0RGF0YU1vZGVsKCksXHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl9tZXRob2RzVG9vbGJhci5nZXRDdXN0b21Ub29sYmFycyh0aGlzLl9xdWlja0NvbW1hbmRzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyBzZWxlY3Rpb25zIG9mIG1ldGhvZCBpdGVtc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNZXRob2RMaXN0SXRlbVNlbGVjdGVkKGFyZ3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBtZXRob2QgcGFyYW1ldGVyIGxpc3QgYWZ0ZXIgYSBtZXRob2QgaGFzIGJlZW4gc2VsZWN0ZWQuXHJcbiAgICAgICAgaWYgKGFyZ3MuZGF0YS5pdGVtICYmIGFyZ3MuZGF0YS5pdGVtIGluc3RhbmNlb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkKGFyZ3MuZGF0YS5pdGVtIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNlbGVjdGlvbkNoYW5nZWQobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRTZWxlY3Rpb25DaGFuZ2VkLnJhaXNlKG51bGwsIG1ldGhvZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1ldGhvZExpc3RXaWRnZXQgfTsiXX0=