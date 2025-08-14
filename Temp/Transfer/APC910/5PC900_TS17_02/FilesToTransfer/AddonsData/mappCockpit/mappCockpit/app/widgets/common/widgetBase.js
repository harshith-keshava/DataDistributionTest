define(["require", "exports", "../../models/dataModelInterface", "./busyInformation", "./themeProvider", "./widgetsWithDropSupportProvider", "./dragDropArgs", "../../framework/componentHub/bindings/bindings", "../../common/componentBase/componentSettings", "./componentDefaultDefinitionWidgetBase"], function (require, exports, dataModelInterface_1, busyInformation_1, themeProvider_1, widgetsWithDropSupportProvider_1, dragDropArgs_1, bindings_1, componentSettings_1, componentDefaultDefinitionWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WidgetBase = /** @class */ (function () {
        /**
         * Creates an instance of WidgetBase
         * @memberof WidgetBase
         */
        function WidgetBase() {
            var _this = this;
            this._widgets = new Map();
            this._subComponentsLoadedHandler = function (sender, eventArgs) { _this.handleSubComponentsLoaded(sender, eventArgs); };
            this._componentSettingsLoadedHandler = function (sender, eventArgs) { _this.handleComponentSettingsLoaded(sender, eventArgs); };
            this.busyScreenId = "";
            this.flaggedForResize = false;
            this.widgetName = "";
            this._actualWidth = 0;
            this._actualHeight = 0;
            this._headerHeight = 0;
            this._footerHeight = 0;
            this._busyInformation = new busyInformation_1.BusyInformation();
            this._modelChangedHandler = function (sender, data) { _this.handleModelChanged(sender, data); };
            this._modelItemsChangedHandler = function (sender, data) { _this.handleModelItemsChanged(sender, data); };
            //#region Drop support
            this._supportedDragDropDataIds = new Array(); //e.g. Signal, ..
            //#endregion
            //#region drag support
            this._dropPossible = false;
            this._draggingSupportActive = false;
            this._defaultDropNotPossibleRepresentation = "";
            this._dataModel = new NullDataModel();
        }
        Object.defineProperty(WidgetBase.prototype, "mainDiv", {
            get: function () {
                return this._widgetMainDiv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "headerDiv", {
            get: function () {
                return this._widgetHeaderDiv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "footerDiv", {
            get: function () {
                return this._widgetFooterDiv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "mainDivId", {
            /**
             * Returns the widgets main div id
             *
             * @readonly
             * @type {string}
             * @memberof WidgetBase
             */
            get: function () {
                return this.mainDiv.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "view", {
            get: function () {
                return this._view;
            },
            set: function (view) {
                this._view = view;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "width", {
            /**
             * Returns the current width of the widget
             *
             * @readonly
             * @type {number}
             * @memberof WidgetBase
             */
            get: function () {
                return this._actualWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "height", {
            /**
             * Returns the current height of the widget
             *
             * @readonly
             * @type {number}
             * @memberof WidgetBase
             */
            get: function () {
                return this._actualHeight;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns a unique div id (e.g. Cont_1)
         *
         * @static
         * @returns {string}
         * @memberof WidgetBase
         */
        WidgetBase.getUniqueDivId = function () {
            WidgetBase._uniqueDivId++;
            var id = WidgetBase._uniqueDivId.toString();
            return "Cont_" + id;
        };
        /**
         * Initializes the widget
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.initialize = function () {
            this.initializeWithId(WidgetBase.getUniqueDivId());
        };
        /**
         * Initializes the widget with the given id
         *
         * @private
         * @param {string} divId
         * @memberof WidgetBase
         */
        WidgetBase.prototype.initializeWithId = function (divId) {
            // Create the needed divs
            this.createDivs(divId);
            // Add divs to document body (otherwise syncfusion can not initialize the widgets correct)
            this.addToDocumentsTemp();
            // Load styles
            this.loadStyles();
            // Load component settings
            this.component.eventSubComponentsLoaded.attach(this._subComponentsLoadedHandler);
            this.component.eventComponentSettingsLoaded.attach(this._componentSettingsLoadedHandler);
            this.component.loadComponentSettings();
            this.component.eventSubComponentsLoaded.detach(this._subComponentsLoadedHandler);
            this.component.eventComponentSettingsLoaded.detach(this._componentSettingsLoadedHandler);
        };
        /**
         * Creates the main div and if needed header and footer divs
         *
         * @private
         * @param {string} divId
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createDivs = function (divId) {
            // Create widget main div at first to define the mainDivId
            this._widgetMainDiv = document.createElement("div");
            this._widgetMainDiv.id = divId;
            this._headerHeight = this.defineHeaderHeight();
            if (this._headerHeight != 0) {
                this.createHeaderDiv();
            }
            this._footerHeight = this.defineFooterHeight();
            if (this._footerHeight != 0) {
                this.createFooterDiv();
            }
        };
        /**
         * Returns the height which the header should have
         *
         * @returns {number}
         * @memberof WidgetBase
         */
        WidgetBase.prototype.defineHeaderHeight = function () {
            return 0;
        };
        /**
         * Returns the height which the footer should have
         *
         * @returns {number}
         * @memberof WidgetBase
         */
        WidgetBase.prototype.defineFooterHeight = function () {
            return 0;
        };
        /**
         * Adds(moves) the div containers of this widget to the document(needed for correct behavior of the syncfusion widget because they are looking into the document)
         *
         * @public
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addToDocumentsTemp = function () {
            var widgetTempDivId = "widgetTemp";
            // create document body widgetTemp container if not already available ...
            var widgetTempDiv = document.getElementById(widgetTempDivId);
            if (widgetTempDiv == null) {
                widgetTempDiv = document.createElement("div");
                widgetTempDiv.id = widgetTempDivId;
                document.body.appendChild(widgetTempDiv);
            }
            // ... and add the divs of this widget
            if (this.headerDiv != undefined) {
                widgetTempDiv.appendChild(this.headerDiv);
            }
            widgetTempDiv.appendChild(this.mainDiv);
            if (this.footerDiv != undefined) {
                widgetTempDiv.appendChild(this.footerDiv);
            }
        };
        /**
         * Creates a new header div
         *
         * @protected
         * @param {number} headerHeight
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createHeaderDiv = function () {
            var headerContainerId = this.mainDivId + "_header";
            this._widgetHeaderDiv = this.createDiv(headerContainerId, "widgetHeader", this._headerHeight);
        };
        /**
         * creates a new footer div
         *
         * @protected
         * @param {number} footerHeight
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createFooterDiv = function () {
            var footerContainerId = this.mainDivId + "_footer";
            this._widgetFooterDiv = this.createDiv(footerContainerId, "widgetFooter", this._footerHeight);
        };
        /**
         * Creates a new div with the given informations
         *
         * @private
         * @param {string} id
         * @param {string} className
         * @param {number} height
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createDiv = function (id, className, height) {
            var newHeaderDiv = document.createElement("div");
            newHeaderDiv.id = id;
            newHeaderDiv.classList.add(className);
            newHeaderDiv.style.height = height.toString() + "px";
            return newHeaderDiv;
        };
        /**
         * Adds the div containers(header, main, footer, ...) of this widget to the given parent container
         *
         * @param {(HTMLDivElement|undefined)} parentContainer
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addToParentContainer = function (parentContainer) {
            if (parentContainer == undefined) {
                return;
            }
            // Add header
            if (this._widgetHeaderDiv != undefined) {
                parentContainer.append(this._widgetHeaderDiv);
            }
            // Add main
            parentContainer.append(this.mainDiv);
            // Add footer
            if (this._widgetFooterDiv != undefined) {
                parentContainer.append(this._widgetFooterDiv);
            }
        };
        WidgetBase.prototype.addToParentContainerId = function (parentContainerId) {
            var parentContainer = document.getElementById(parentContainerId);
            if (parentContainer != null) {
                this.addToParentContainer(parentContainer);
            }
        };
        /**
         * Handles the sub component loaded event
         *
         * @param {ComponentBase} sender
         * @param {*} eventargs
         * @memberof WidgetBase
         */
        WidgetBase.prototype.handleSubComponentsLoaded = function (sender, eventargs) {
            this.createLayout();
            this.attachLayoutToView();
        };
        /**
         * Handles the component settings loaded event
         *
         * @param {ComponentBase} sender
         * @param {*} eventargs
         * @memberof WidgetBase
         */
        WidgetBase.prototype.handleComponentSettingsLoaded = function (sender, eventargs) {
            this.initialized();
            this.component.setBindingsData();
        };
        /**
         * Reinitializes the chart
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.reinitialize = function () {
            // get current div id
            var currentId = this.mainDivId;
            // empty current wirdget div
            $(this.mainDiv).empty();
            // initialize widget with the already used div id
            this.initializeWithId(currentId);
        };
        /**
         * Will be called after initialization(when loading persisting data was done)
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.initialized = function () {
        };
        /**
         * Initialize the component parts here
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.initializeComponent = function () {
        };
        /**
         * Set the id for the default settings data which should be used if no persisting data is available
         *
         * @param {string} defaultSettingsDataId
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setDefaultComponentSettingsDataId = function (defaultSettingsDataId) {
            this.component.defaultSettingsDataId = defaultSettingsDataId;
        };
        /**
         * Returns the settings of this component
         *
         * @returns {ComponentSettings}
         * @memberof WidgetBase
         */
        WidgetBase.prototype.getComponentSettings = function (onlyModified) {
            return this.component.getComponentSettings(onlyModified);
        };
        /**
         * Sets settings to this component
         *
         * @param {(ComponentSettings|undefined)} settings
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setComponentSettings = function (settings) {
            if (settings != undefined) {
                // Set componentSettings
                this.component.setComponentSettings(settings);
            }
        };
        WidgetBase.prototype.attachLayoutToView = function (parentView) {
            if (parentView === void 0) { parentView = undefined; }
            var view = parentView ? parentView : this._view;
            if (view && this._layoutWidget) {
                this._layoutWidget.view = view;
            }
        };
        /** sets the header content
         *
         * @param {string} content
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setHeaderContent = function (content) {
            if (this._widgetHeaderDiv != undefined) {
                this._widgetHeaderDiv.innerHTML = content;
            }
        };
        /** sets the footer content
         *
         * @param {string} content
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setFooterContent = function (content) {
            if (this._widgetFooterDiv != undefined) {
                this._widgetFooterDiv.innerHTML = content;
            }
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createLayout = function () {
        };
        /**
         * Load styles for WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.loadStyles = function () {
            //this.styleLoaded(undefined);
        };
        ;
        WidgetBase.prototype.addStyle = function (filePath) {
            var themedFilePath = this.getThemedFilePath(filePath);
            $(this.mainDiv).append('<link rel="stylesheet" href="' + themedFilePath + '" type="text/css" />');
            /*var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = filePath;
            $(this.mainDiv).append(link);*/
            //this.loadCss($(this.mainDiv), filePath, (link) =>{this.styleLoaded(link)});
        };
        ;
        WidgetBase.prototype.addStyleToContentId = function (parentContainer, filePath) {
            if (parentContainer != undefined && parentContainer.id != "") {
                var themedFilePath = this.getThemedFilePath(filePath);
                $(parentContainer).append('<link rel="stylesheet" href="' + themedFilePath + '" type="text/css" />');
            }
        };
        WidgetBase.prototype.getThemedFilePath = function (filePath) {
            var themeProvider = themeProvider_1.ThemeProvider.getInstance();
            return themeProvider.getThemedFilePath(filePath);
        };
        Object.defineProperty(WidgetBase.prototype, "supportedDragDropDataIds", {
            get: function () {
                return this._supportedDragDropDataIds;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds the given dragdrop data id to this widget, and adds this widget to the WidgetsWithDropSupportProvider if not already there
         * Can only be used if the widget derives from IDroppable
         *
         * @param {string} id
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addSupportedDragDropDataId = function (id) {
            widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().addWidget(this);
            // check if already in list
            var index = this._supportedDragDropDataIds.indexOf(id);
            if (index == -1) {
                this._supportedDragDropDataIds.push(id);
            }
        };
        /**
         * Removes the given dragdrop data id from this widget, and if it is the last dragdrop data id, removes the widget from the WidgetsWithDropSupportProvider
         * Can only be used if the widget derives from IDroppable
         *
         * @param {string} id
         * @memberof WidgetBase
         */
        WidgetBase.prototype.removeSupportedDragDropDataId = function (id) {
            var index = this._supportedDragDropDataIds.indexOf(id);
            if (index != -1) {
                this._supportedDragDropDataIds.splice(index, 1);
            }
            if (this._supportedDragDropDataIds.length == 0) {
                widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().removeWidget(this);
            }
        };
        /**
         * Adds dragging support to this widget; via IDraggable the widget can provide the information which object should be dragged
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addDraggingSupport = function () {
            var _this = this;
            if (this.mainDivId == "") {
                console.error("widget main div id not set for draggable support");
                return;
            }
            var imageProvider = this.component.getSubComponent(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase.ImageProviderId);
            if (imageProvider != undefined) {
                this._defaultDropNotPossibleRepresentation = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/dropNotPossible.svg");
            }
            else {
                console.error("ImageProvider not available => Add ImageProvider sub component to this widget!");
            }
            this._draggingSupportActive = true;
            this._draggingContainer = $(this.mainDiv);
            this._draggingContainer.ejDraggable({
                distance: 10,
                helper: function (args) { return _this.draggingHelper(args); },
                dragStart: function (args) { return _this.draggingStart(args); },
                dragStop: function (args) { return _this.draggingStop(args); },
                destroy: function (args) { return _this.draggingDestroy(args); },
                drag: function (args) { return _this.draggingDrag(args); },
            });
        };
        /**
         * Removes dragging support from this widget
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.removeDraggingSupport = function () {
            this._draggingSupportActive = false;
            var ejDraggableObj = this._draggingContainer.data("ejDraggable");
            if (ejDraggableObj != undefined) {
                ejDraggableObj.destroy();
            }
        };
        /**
         * Will be called at the end of a drag&drop operation
         *
         * @private
         * @param {*} args
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingDestroy = function (args) {
        };
        /**
         * Creates the temporary drag object for the drag & drop operation and adds it to the document body
         *
         * @private
         * @param {*} args
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingHelper = function (args) {
            var ejDraggableObj = this._draggingContainer.data("ejDraggable");
            if (ejDraggableObj != undefined) {
                // Set drag object position (_relYposition and _relXposition are the positions within the draggable object)
                ejDraggableObj.option("cursorAt", { top: (ejDraggableObj._relYposition * -1) - 10, left: ejDraggableObj._relXposition * -1 }, true);
            }
            // Get the information of the drag object from widget
            var dragDataObject = this.startDragging();
            if (dragDataObject == undefined) {
                return;
            }
            this._dragDataObject = dragDataObject;
            this._defaultDragRepresentation = this._dragDataObject.representation;
            this._dragSymbol = $('<pre>').html(this._defaultDropNotPossibleRepresentation);
            // Adds the current data to the drag data
            this.setDragData(args, this._dragDataObject.data);
            this._dragSymbol.appendTo(document.body);
            return this._dragSymbol;
        };
        /**
         * Will be called at the beginning of a drag&drop operation
         *
         * @protected
         * @returns {(DragDropDataObject|undefined)}
         * @memberof WidgetBase
         */
        WidgetBase.prototype.startDragging = function () {
            return undefined;
        };
        /**
         * Will be called after the drop
         *
         * @protected
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingStopped = function () {
        };
        /**
         * Removes the temporary drag object after drag & drop operation
         *
         * @private
         * @memberof WidgetBase
         */
        WidgetBase.prototype.removeDragObjectFromDocument = function () {
            for (var i = document.body.childNodes.length - 1; i >= 0; i--) {
                if (document.body.childNodes[i].nodeName == "PRE") {
                    document.body.childNodes[i].remove();
                }
            }
        };
        /**
         * Will be called at start dragging
         *
         * @private
         * @param {*} args
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingStart = function (args) {
            var _this = this;
            var dragData = this.getDragData(args);
            if (dragData != undefined) {
                // Inform only widgets with drop support for the given dragDropDataId
                widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                    // call dragStart
                    widget.dragStart(new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData, _this._defaultDragRepresentation));
                });
                return;
            }
            args.cancel = true;
        };
        /**
         * Will be called while dragging is active
         *
         * @private
         * @param {*} args
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingDrag = function (args) {
            var _this = this;
            this._dropPossible = false;
            var currentDragDropElement = this._defaultDragRepresentation.clone();
            var dragData = this.getDragData(args);
            if (dragData != undefined) {
                var newWidget_1 = undefined;
                if (args.currentTarget != undefined) { // undefined if out of browser window
                    // Inform only widgets with drop support for the given dragDropDataId
                    widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                        // Only widget with currentTarget(divId) as parent should be informed
                        if (_this.isElementWithinWidget(args.currentTarget, widget.mainDivId)) {
                            newWidget_1 = widget;
                            // call dragOver
                            var dragDropArgs = new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData, currentDragDropElement);
                            var dragOverPossible = widget.dragOver(dragDropArgs);
                            if (dragOverPossible) {
                                _this._dropPossible = dragOverPossible;
                            }
                        }
                    });
                }
                if (newWidget_1 != this._currentWidget) {
                    // DragOver changed from one widget to an other
                    if (this._currentWidget != undefined) {
                        this._currentWidget.dropFocusLost(args);
                    }
                    this._currentWidget = newWidget_1;
                }
            }
            if (this._dropPossible) {
                this._dragSymbol[0].innerHTML = currentDragDropElement.getDragDropElement();
            }
            else {
                this._dragSymbol[0].innerHTML = this._defaultDropNotPossibleRepresentation;
            }
        };
        /**
         * Will be called when dragging was stopped
         *
         * @private
         * @param {*} args
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingStop = function (args) {
            var _this = this;
            var dragData = this.getDragData(args);
            if (this._dropPossible) {
                if (args.currentTarget != undefined) { // undefined if out of browser window
                    // Inform only widgets with drop support for the given dragDropDataId
                    widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                        // Only widget with currentTarget(divId) as parent should be informed
                        if (_this.isElementWithinWidget(args.currentTarget, widget.mainDivId)) {
                            // call drop
                            widget.drop(new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData));
                        }
                    });
                }
            }
            // Inform only widgets with drop support for the given dragDropDataId
            widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                // call dragStop
                widget.dragStop(new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData));
            });
            this.draggingStopped();
            this.removeDragObjectFromDocument();
        };
        WidgetBase.prototype.getDragData = function (args) {
            if (this._dragDataObject != undefined) {
                return args.element.data(this._dragDataObject.id);
            }
            return undefined;
        };
        WidgetBase.prototype.setDragData = function (args, data) {
            args.element.data(this._dragDataObject.id, data);
        };
        /**
         * Check if an element is a child of the given parent id
         *
         * @private
         * @param {*} element
         * @param {string} widgetId
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.isElementWithinWidget = function (element, widgetId) {
            var id = "#" + widgetId;
            var parent = element.closest(id);
            if (parent == null) {
                return false;
            }
            return true;
        };
        /**
         * Returns the widget for the given id if found, else undefined
         *
         * @param {string} id the widget id
         * @returns {*}
         * @memberof WidgetBase
         */
        /*public getWidgetById(id: string, recursive: boolean = false): IWidget|undefined{
            for (let key in this._widgets) {
                let foundWidget: IWidget|undefined = undefined;
                let widget = this._widgets[key];
                if(widget.id == id){
                    foundWidget = widget;
                }
                else{
                    if(recursive == true){
                        let foundChildWidget = widget.getWidgetById(id, true);
                        if(foundChildWidget != undefined){
                            foundWidget = foundChildWidget;
                        }
                    }
                }
                if(foundWidget != undefined){
                    return foundWidget;
                }
            }
            return undefined
        }*/
        //#endregion
        /*private styleLoaded(link){
            
        }
    
        private loadCss(element, url, callback){
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = url;
            
            element[0].appendChild(link);
        
            var img = document.createElement('img');
            img.onerror = function(){
                if(callback){
                    callback(link);
                }
            }
            img.src = url;
        }*/
        /**
         * Activate the WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.activate = function () {
        };
        /**
         * Deactivate the WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.deactivate = function () {
        };
        /**
         * Connects the widget base
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.connect = function (componentId) {
        };
        /**
         * Dispose the WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.dispose = function () {
            if (this._draggingSupportActive == true) {
                this.removeDraggingSupport();
            }
            if (this._dataModel != undefined) {
                this._dataModel.eventModelChanged.detach(this._modelChangedHandler);
                this._dataModel.eventModelItemsChanged.detach(this._modelItemsChangedHandler);
            }
            // delete bindings
            bindings_1.Bindings.unbind(this);
        };
        /**
         * Sets the busy screen information which will be shown when the busy flag true
         *
         * @param {BusyInformation} busyInformation
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setBusyInformation = function (busyInformation) {
            this._busyInformation = busyInformation;
        };
        /**
         * Set the busy flag of the WidgetBase
         *
         * @param {boolean} flag if true busy screen will be shown
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setBusy = function (flag) {
            this.busyScreenId = this.mainDivId + "_busyScreen";
            if (flag == true) {
                var commonLayoutProvider = this.component.getSubComponent(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase.CommonLayoutProviderId);
                if (commonLayoutProvider != undefined) {
                    var html = commonLayoutProvider.getBusyScreenLayout(this.busyScreenId, this._busyInformation);
                    $(this.mainDiv).parent().append(html);
                }
                else {
                    console.error("CommonLayoutProvider not available => add to sub components!");
                }
            }
            else {
                var busyDiv = $(this.mainDiv).parent().find("#" + this.busyScreenId);
                busyDiv.remove();
            }
        };
        WidgetBase.prototype.changeBusyMessage = function (newMessage) {
            var commonLayoutProvider = this.component.getSubComponent(componentDefaultDefinitionWidgetBase_1.ComponentDefaultDefinitionWidgetBase.CommonLayoutProviderId);
            if (commonLayoutProvider != undefined) {
                commonLayoutProvider.changeBusyMessage(this.busyScreenId, newMessage);
            }
        };
        /**
         * Persist widget settings
         *
         * @protected
         * @memberof WidgetBase
         */
        WidgetBase.prototype.saveSettings = function () {
            this.component.saveComponentSettings();
        };
        /**
         * Resize the WidgetBase
         *
         * @param {number} width
         * @param {number} height
         * @memberof WidgetBase
         */
        WidgetBase.prototype.resize = function (width, height) {
        };
        Object.defineProperty(WidgetBase.prototype, "dataModel", {
            get: function () {
                return this._dataModel;
            },
            set: function (dataModel) {
                // Detach events from old dataModel
                this.detachDataModelEvents();
                // Set new dataModel
                this._dataModel = dataModel;
                // Attach events to new dataModel
                this.attachDataModelEvents();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * attaches the data model events
         *
         * @private
         * @memberof WidgetBase
         */
        WidgetBase.prototype.attachDataModelEvents = function () {
            if (this._dataModel != undefined) {
                this._dataModel.eventModelChanged.attach(this._modelChangedHandler);
                this._dataModel.eventModelItemsChanged.attach(this._modelItemsChangedHandler);
            }
        };
        /**
         * detaches the data model events
         *
         * @private
         * @memberof WidgetBase
         */
        WidgetBase.prototype.detachDataModelEvents = function () {
            if (this._dataModel != undefined) {
                this._dataModel.eventModelChanged.detach(this._modelChangedHandler);
                this._dataModel.eventModelItemsChanged.detach(this._modelItemsChangedHandler);
            }
        };
        WidgetBase.prototype.handleModelChanged = function (sender, data) {
        };
        WidgetBase.prototype.handleModelItemsChanged = function (sender, eventArgs) {
        };
        WidgetBase.prototype.onObservablesChanged = function (changedObservables) {
        };
        WidgetBase.WidgetSettingId = "widget";
        /**
         * Holds the last used unique div id
         *
         * @private
         * @static
         * @type {number}
         * @memberof WidgetBase
         */
        WidgetBase._uniqueDivId = 0;
        return WidgetBase;
    }());
    exports.WidgetBase = WidgetBase;
    /**
     * the class implements the null object for the data model. It is intended to be set for widgets without a real data model
     *
     * @class NullDataModel
     * @implements {IDataModel}
     */
    var NullDataModel = /** @class */ (function () {
        function NullDataModel() {
            this.eventModelChanged = new dataModelInterface_1.EventModelChanged;
            this.eventModelItemsChanged = new dataModelInterface_1.EventModelItemsChanged;
        }
        NullDataModel.prototype.observeModelItems = function (observableItems) {
        };
        NullDataModel.prototype.onModelItemsChanged = function (sender, data) {
        };
        NullDataModel.prototype.handleModelItemsChanged = function (sender, data) {
        };
        NullDataModel.prototype.initialize = function () {
        };
        NullDataModel.prototype.clear = function () {
        };
        NullDataModel.prototype.dispose = function () {
        };
        NullDataModel.prototype.getDefaultStoringData = function () {
            return undefined;
        };
        NullDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        NullDataModel.prototype.getComponentSettings = function () {
            return new componentSettings_1.ComponentSettings();
        };
        NullDataModel.prototype.setComponentSettings = function (data) {
        };
        NullDataModel.prototype.connect = function () {
        };
        NullDataModel.prototype.onModelChanged = function (sender, data) {
        };
        NullDataModel.prototype.handleModelChanged = function (sender, data) {
        };
        return NullDataModel;
    }());
    exports.NullDataModel = NullDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vd2lkZ2V0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFzQkE7UUFxRkk7OztXQUdHO1FBQ0g7WUFBQSxpQkFFQztZQXhGUyxhQUFRLEdBQXlCLElBQUksR0FBRyxFQUFtQixDQUFDO1lBNEM5RCxnQ0FBMkIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUMzRyxvQ0FBK0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUUzSCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztZQUVsQixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7WUFDbEMsZUFBVSxHQUFXLEVBQUUsQ0FBQTtZQUViLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1lBQ3pCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1lBRTFCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1lBRWpCLHFCQUFnQixHQUFvQixJQUFJLGlDQUFlLEVBQUUsQ0FBQztZQUUxRCx5QkFBb0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQU8sS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRiw4QkFBeUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQU8sS0FBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQXFhMUcsc0JBQXNCO1lBQ1YsOEJBQXlCLEdBQUcsSUFB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RGhGLENBQUM7UUFoREcseUNBQWlCLEdBQWpCLFVBQWtCLGVBQXNCO1FBRXhDLENBQUM7UUFDRCwyQ0FBbUIsR0FBbkIsVUFBb0IsTUFBa0IsRUFBRSxJQUEyQjtRQUVuRSxDQUFDO1FBQ0QsK0NBQXVCLEdBQXZCLFVBQXdCLE1BQWtCLEVBQUUsSUFBMkI7UUFFdkUsQ0FBQztRQUlELGtDQUFVLEdBQVY7UUFFQSxDQUFDO1FBRUQsNkJBQUssR0FBTDtRQUVBLENBQUM7UUFFRCwrQkFBTyxHQUFQO1FBRUEsQ0FBQztRQUNELDZDQUFxQixHQUFyQjtZQUNJLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRCwyQ0FBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELDRDQUFvQixHQUFwQjtZQUNJLE9BQU8sSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFRCw0Q0FBb0IsR0FBcEIsVUFBcUIsSUFBdUI7UUFFNUMsQ0FBQztRQUVELCtCQUFPLEdBQVA7UUFFQSxDQUFDO1FBQ0Qsc0NBQWMsR0FBZCxVQUFlLE1BQWtCLEVBQUUsSUFBMkI7UUFFOUQsQ0FBQztRQUNELDBDQUFrQixHQUFsQixVQUFtQixNQUFrQixFQUFFLElBQTJCO1FBRWxFLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUF2REQsSUF1REM7SUF2RFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRGF0YU1vZGVsLEV2ZW50TW9kZWxDaGFuZ2VkLEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZCB9IGZyb20gJy4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2UnXHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9pbnRlcmZhY2VzL2NvbXBvbmVudEludGVyZmFjZSc7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tICcuL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSVZpZXcgfSBmcm9tICcuL2ludGVyZmFjZXMvdmlld0ludGVyZmFjZSc7XHJcbmltcG9ydCB7IElEcm9wcGFibGUgfSBmcm9tICcuL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZSc7XHJcbmltcG9ydCB7IElMYXlvdXRXaWRnZXQgfSBmcm9tICcuL2ludGVyZmFjZXMvbGF5b3V0V2lkZ2V0SW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSU9ic2VydmVyLCBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZXMvb2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBCdXN5SW5mb3JtYXRpb24gfSBmcm9tICcuL2J1c3lJbmZvcm1hdGlvbic7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICcuL3RoZW1lUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIgfSBmcm9tICcuL3dpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlcic7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YU9iamVjdCB9IGZyb20gJy4vZHJhZ0RhdGFPYmplY3QnO1xyXG5pbXBvcnQgeyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uIH0gZnJvbSAnLi9kcmFnRHJvcFJlcHJlc2VudGF0aW9uJztcclxuaW1wb3J0IHsgRHJhZ0Ryb3BBcmdzIH0gZnJvbSAnLi9kcmFnRHJvcEFyZ3MnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZSc7XHJcbmltcG9ydCB7IEJpbmRpbmdzIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9iaW5kaW5ncyc7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2UgfSBmcm9tICcuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZSc7XHJcbmltcG9ydCB7IElJbWFnZVByb3ZpZGVyIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2ltYWdlUHJvdmlkZXJJbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBJQ29tbW9uTGF5b3V0UHJvdmlkZXIgfSBmcm9tICcuL2ludGVyZmFjZXMvY29tbW9uTGF5b3V0UHJvdmlkZXJJbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBFdmVudENvbXBvbmVudFNldHRpbmdzTG9hZGVkQXJncyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2V2ZW50Q29tcG9uZW50U2V0dGluZ3NMb2FkZWRBcmdzJztcclxuaW1wb3J0IHsgRXZlbnRTdWJDb21wb25lbnRzTG9hZGVkQXJncyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2V2ZW50U3ViQ29tcG9uZW50c0xvYWRlZEFyZ3MnO1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElXaWRnZXQsIElPYnNlcnZlciwgSUNvbXBvbmVudHtcclxuICAgICAgIFxyXG4gICAgcHJvdGVjdGVkIF9kYXRhTW9kZWw6IElEYXRhTW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgX3dpZGdldHM6IE1hcDxzdHJpbmcsIElXaWRnZXQ+ID0gbmV3IE1hcDxzdHJpbmcsIElXaWRnZXQ+KCk7XHJcbiAgICBwcml2YXRlIF92aWV3OklWaWV3fHVuZGVmaW5lZDtcclxuICAgICAgIFxyXG4gICAgcHJvdGVjdGVkIF9sYXlvdXRXaWRnZXQ6IElMYXlvdXRXaWRnZXR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFdpZGdldDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiAgSG9sZHMgdGhlIG1haW4gZGl2IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfd2lkZ2V0TWFpbkRpdiE6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIGdldCBtYWluRGl2KCk6IEhUTUxEaXZFbGVtZW50e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93aWRnZXRNYWluRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGhlYWRlciBkaXYgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF93aWRnZXRIZWFkZXJEaXY6IEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBnZXQgaGVhZGVyRGl2KCk6IEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkZ2V0SGVhZGVyRGl2O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBmb290ZXIgZGl2IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfd2lkZ2V0Rm9vdGVyRGl2OiBIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgZ2V0IGZvb3RlckRpdigpOiBIVE1MRGl2RWxlbWVudHx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZGdldEZvb3RlckRpdjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBXaWRnZXRTZXR0aW5nSWQgPSBcIndpZGdldFwiO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9zdWJDb21wb25lbnRzTG9hZGVkSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLmhhbmRsZVN1YkNvbXBvbmVudHNMb2FkZWQoc2VuZGVyLCBldmVudEFyZ3MpIH07XHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRTZXR0aW5nc0xvYWRlZEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5oYW5kbGVDb21wb25lbnRTZXR0aW5nc0xvYWRlZChzZW5kZXIsIGV2ZW50QXJncykgfTtcclxuICAgICAgXHJcbiAgICBidXN5U2NyZWVuSWQgPSBcIlwiO1xyXG4gICAgXHJcbiAgICBmbGFnZ2VkRm9yUmVzaXplOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB3aWRnZXROYW1lOiBzdHJpbmcgPSBcIlwiXHJcblxyXG4gICAgcHJvdGVjdGVkIF9hY3R1YWxXaWR0aDogbnVtYmVyID0gMDtcclxuICAgIHByb3RlY3RlZCBfYWN0dWFsSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByb3RlY3RlZCBfaGVhZGVySGVpZ2h0ID0gMDtcclxuXHRwcm90ZWN0ZWQgX2Zvb3RlckhlaWdodCA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfYnVzeUluZm9ybWF0aW9uOiBCdXN5SW5mb3JtYXRpb24gPSBuZXcgQnVzeUluZm9ybWF0aW9uKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHsgdGhpcy5oYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyLCBkYXRhKTsgfTtcclxuICAgIHByaXZhdGUgX21vZGVsSXRlbXNDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHsgdGhpcy5oYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXIsIGRhdGEpOyB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgd2lkZ2V0cyBtYWluIGRpdiBpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbWFpbkRpdklkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWluRGl2LmlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbXBvbmVudCBvZiB0aGlzIHdpZGdldChob2xkcyB0aGUgc2V0dGluZ3MgZm9yIHBlcnNpc3RpbmcpXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge0NvbXBvbmVudEJhc2V9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29tcG9uZW50ITogQ29tcG9uZW50QmFzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV2lkZ2V0QmFzZVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YU1vZGVsID0gbmV3IE51bGxEYXRhTW9kZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmlldygpIDogSVZpZXd8dW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmlldztcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBzZXQgdmlldyh2aWV3IDogSVZpZXd8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHdpZHRoIG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBnZXQgd2lkdGgoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3R1YWxXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgaGVpZ2h0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0dWFsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGxhc3QgdXNlZCB1bmlxdWUgZGl2IGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfdW5pcXVlRGl2SWQ6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHVuaXF1ZSBkaXYgaWQgKGUuZy4gQ29udF8xKVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGdldFVuaXF1ZURpdklkKCk6IHN0cmluZ3tcclxuICAgICAgICBXaWRnZXRCYXNlLl91bmlxdWVEaXZJZCsrO1xyXG4gICAgICAgIGxldCBpZCA9IFdpZGdldEJhc2UuX3VuaXF1ZURpdklkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIFwiQ29udF9cIiArIGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplV2l0aElkKFdpZGdldEJhc2UuZ2V0VW5pcXVlRGl2SWQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgd2lkZ2V0IHdpdGggdGhlIGdpdmVuIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXZJZFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplV2l0aElkKGRpdklkOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbmVlZGVkIGRpdnNcclxuICAgICAgICB0aGlzLmNyZWF0ZURpdnMoZGl2SWQpO1xyXG4gICAgICBcclxuICAgICAgICAvLyBBZGQgZGl2cyB0byBkb2N1bWVudCBib2R5IChvdGhlcndpc2Ugc3luY2Z1c2lvbiBjYW4gbm90IGluaXRpYWxpemUgdGhlIHdpZGdldHMgY29ycmVjdClcclxuICAgICAgICB0aGlzLmFkZFRvRG9jdW1lbnRzVGVtcCgpO1xyXG5cclxuICAgICAgICAvLyBMb2FkIHN0eWxlc1xyXG4gICAgICAgIHRoaXMubG9hZFN0eWxlcygpO1xyXG5cclxuICAgICAgICAvLyBMb2FkIGNvbXBvbmVudCBzZXR0aW5nc1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmV2ZW50U3ViQ29tcG9uZW50c0xvYWRlZC5hdHRhY2godGhpcy5fc3ViQ29tcG9uZW50c0xvYWRlZEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmV2ZW50Q29tcG9uZW50U2V0dGluZ3NMb2FkZWQuYXR0YWNoKHRoaXMuX2NvbXBvbmVudFNldHRpbmdzTG9hZGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQubG9hZENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZXZlbnRTdWJDb21wb25lbnRzTG9hZGVkLmRldGFjaCh0aGlzLl9zdWJDb21wb25lbnRzTG9hZGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZXZlbnRDb21wb25lbnRTZXR0aW5nc0xvYWRlZC5kZXRhY2godGhpcy5fY29tcG9uZW50U2V0dGluZ3NMb2FkZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIG1haW4gZGl2IGFuZCBpZiBuZWVkZWQgaGVhZGVyIGFuZCBmb290ZXIgZGl2c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGl2SWRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGl2cyhkaXZJZDogc3RyaW5nKXtcclxuICAgICAgICAvLyBDcmVhdGUgd2lkZ2V0IG1haW4gZGl2IGF0IGZpcnN0IHRvIGRlZmluZSB0aGUgbWFpbkRpdklkXHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0TWFpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0TWFpbkRpdi5pZCA9IGRpdklkO1xyXG5cclxuICAgICAgICB0aGlzLl9oZWFkZXJIZWlnaHQgPSB0aGlzLmRlZmluZUhlYWRlckhlaWdodCgpO1xyXG4gICAgICAgIGlmKHRoaXMuX2hlYWRlckhlaWdodCAhPSAwKXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVIZWFkZXJEaXYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZm9vdGVySGVpZ2h0ID0gdGhpcy5kZWZpbmVGb290ZXJIZWlnaHQoKTtcclxuICAgICAgICBpZih0aGlzLl9mb290ZXJIZWlnaHQgIT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9vdGVyRGl2KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaGVpZ2h0IHdoaWNoIHRoZSBoZWFkZXIgc2hvdWxkIGhhdmVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZGVmaW5lSGVhZGVySGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgd2hpY2ggdGhlIGZvb3RlciBzaG91bGQgaGF2ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBkZWZpbmVGb290ZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyhtb3ZlcykgdGhlIGRpdiBjb250YWluZXJzIG9mIHRoaXMgd2lkZ2V0IHRvIHRoZSBkb2N1bWVudChuZWVkZWQgZm9yIGNvcnJlY3QgYmVoYXZpb3Igb2YgdGhlIHN5bmNmdXNpb24gd2lkZ2V0IGJlY2F1c2UgdGhleSBhcmUgbG9va2luZyBpbnRvIHRoZSBkb2N1bWVudClcclxuICAgICAqXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkVG9Eb2N1bWVudHNUZW1wKCl7XHJcbiAgICAgICAgY29uc3Qgd2lkZ2V0VGVtcERpdklkID0gXCJ3aWRnZXRUZW1wXCI7XHJcbiAgICAgICAgLy8gY3JlYXRlIGRvY3VtZW50IGJvZHkgd2lkZ2V0VGVtcCBjb250YWluZXIgaWYgbm90IGFscmVhZHkgYXZhaWxhYmxlIC4uLlxyXG4gICAgICAgIGxldCB3aWRnZXRUZW1wRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQod2lkZ2V0VGVtcERpdklkKTtcclxuICAgICAgICBpZih3aWRnZXRUZW1wRGl2ID09IG51bGwpe1xyXG4gICAgICAgICAgICB3aWRnZXRUZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgd2lkZ2V0VGVtcERpdi5pZCA9IHdpZGdldFRlbXBEaXZJZDtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3aWRnZXRUZW1wRGl2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC4uLiBhbmQgYWRkIHRoZSBkaXZzIG9mIHRoaXMgd2lkZ2V0XHJcbiAgICAgICAgaWYodGhpcy5oZWFkZXJEaXYgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgd2lkZ2V0VGVtcERpdi5hcHBlbmRDaGlsZCh0aGlzLmhlYWRlckRpdik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpZGdldFRlbXBEaXYuYXBwZW5kQ2hpbGQodGhpcy5tYWluRGl2KTtcclxuXHRcdGlmKHRoaXMuZm9vdGVyRGl2ICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHdpZGdldFRlbXBEaXYuYXBwZW5kQ2hpbGQodGhpcy5mb290ZXJEaXYpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBoZWFkZXIgZGl2XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlYWRlckhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUhlYWRlckRpdigpe1xyXG5cdFx0bGV0IGhlYWRlckNvbnRhaW5lcklkID0gdGhpcy5tYWluRGl2SWQgKyBcIl9oZWFkZXJcIjtcclxuICAgICAgICB0aGlzLl93aWRnZXRIZWFkZXJEaXYgPSB0aGlzLmNyZWF0ZURpdihoZWFkZXJDb250YWluZXJJZCwgXCJ3aWRnZXRIZWFkZXJcIiwgdGhpcy5faGVhZGVySGVpZ2h0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAgICogY3JlYXRlcyBhIG5ldyBmb290ZXIgZGl2XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZvb3RlckhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUZvb3RlckRpdigpe1xyXG5cdFx0bGV0IGZvb3RlckNvbnRhaW5lcklkID0gdGhpcy5tYWluRGl2SWQgKyBcIl9mb290ZXJcIjtcclxuICAgICAgICB0aGlzLl93aWRnZXRGb290ZXJEaXYgPSB0aGlzLmNyZWF0ZURpdihmb290ZXJDb250YWluZXJJZCwgXCJ3aWRnZXRGb290ZXJcIiwgdGhpcy5fZm9vdGVySGVpZ2h0KTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBkaXYgd2l0aCB0aGUgZ2l2ZW4gaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGl2KGlkOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nLCBoZWlnaHQ6IG51bWJlcik6IEhUTUxEaXZFbGVtZW50e1xyXG4gICAgICAgIGxldCBuZXdIZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIG5ld0hlYWRlckRpdi5pZCA9IGlkO1xyXG4gICAgICAgIG5ld0hlYWRlckRpdi5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgbmV3SGVhZGVyRGl2LnN0eWxlLmhlaWdodCA9IGhlaWdodC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgIHJldHVybiBuZXdIZWFkZXJEaXY7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZGl2IGNvbnRhaW5lcnMoaGVhZGVyLCBtYWluLCBmb290ZXIsIC4uLikgb2YgdGhpcyB3aWRnZXQgdG8gdGhlIGdpdmVuIHBhcmVudCBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQpfSBwYXJlbnRDb250YWluZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkVG9QYXJlbnRDb250YWluZXIocGFyZW50Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQpe1xyXG5cdFx0aWYocGFyZW50Q29udGFpbmVyID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgaGVhZGVyXHJcblx0XHRpZih0aGlzLl93aWRnZXRIZWFkZXJEaXYgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cGFyZW50Q29udGFpbmVyLmFwcGVuZCh0aGlzLl93aWRnZXRIZWFkZXJEaXYpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCBtYWluXHJcblx0XHRwYXJlbnRDb250YWluZXIuYXBwZW5kKHRoaXMubWFpbkRpdik7XHJcblxyXG5cdFx0Ly8gQWRkIGZvb3RlclxyXG5cdFx0aWYodGhpcy5fd2lkZ2V0Rm9vdGVyRGl2ICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHBhcmVudENvbnRhaW5lci5hcHBlbmQodGhpcy5fd2lkZ2V0Rm9vdGVyRGl2KTtcclxuXHRcdH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFkZFRvUGFyZW50Q29udGFpbmVySWQocGFyZW50Q29udGFpbmVySWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHBhcmVudENvbnRhaW5lciA9IDxIVE1MRGl2RWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50Q29udGFpbmVySWQpO1xyXG4gICAgICAgIGlmKHBhcmVudENvbnRhaW5lciAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRUb1BhcmVudENvbnRhaW5lcihwYXJlbnRDb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIHN1YiBjb21wb25lbnQgbG9hZGVkIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCYXNlfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gZXZlbnRhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBoYW5kbGVTdWJDb21wb25lbnRzTG9hZGVkKHNlbmRlcjogQ29tcG9uZW50QmFzZSwgZXZlbnRhcmdzOiBFdmVudFN1YkNvbXBvbmVudHNMb2FkZWRBcmdzKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZUxheW91dCgpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoTGF5b3V0VG9WaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBjb21wb25lbnQgc2V0dGluZ3MgbG9hZGVkIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCYXNlfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gZXZlbnRhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBoYW5kbGVDb21wb25lbnRTZXR0aW5nc0xvYWRlZChzZW5kZXI6IENvbXBvbmVudEJhc2UsIGV2ZW50YXJnczogRXZlbnRDb21wb25lbnRTZXR0aW5nc0xvYWRlZEFyZ3Mpe1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQoKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRCaW5kaW5nc0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlaW5pdGlhbGl6ZXMgdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcmVpbml0aWFsaXplKCk6dm9pZCB7XHJcbiAgICAgICAgLy8gZ2V0IGN1cnJlbnQgZGl2IGlkXHJcbiAgICAgICAgbGV0IGN1cnJlbnRJZCA9IHRoaXMubWFpbkRpdklkO1xyXG4gICAgICAgIC8vIGVtcHR5IGN1cnJlbnQgd2lyZGdldCBkaXZcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZW1wdHkoKTtcclxuICAgICAgICAvLyBpbml0aWFsaXplIHdpZGdldCB3aXRoIHRoZSBhbHJlYWR5IHVzZWQgZGl2IGlkXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplV2l0aElkKGN1cnJlbnRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaWxsIGJlIGNhbGxlZCBhZnRlciBpbml0aWFsaXphdGlvbih3aGVuIGxvYWRpbmcgcGVyc2lzdGluZyBkYXRhIHdhcyBkb25lKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCk6dm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSBjb21wb25lbnQgcGFydHMgaGVyZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGlkIGZvciB0aGUgZGVmYXVsdCBzZXR0aW5ncyBkYXRhIHdoaWNoIHNob3VsZCBiZSB1c2VkIGlmIG5vIHBlcnNpc3RpbmcgZGF0YSBpcyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVmYXVsdFNldHRpbmdzRGF0YUlkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzRGF0YUlkKGRlZmF1bHRTZXR0aW5nc0RhdGFJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gZGVmYXVsdFNldHRpbmdzRGF0YUlkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNldHRpbmdzIG9mIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdze1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQpO1xyXG4gICAgfVxyXG4gXHJcbiAgICAgLyoqXHJcbiAgICAgICogU2V0cyBzZXR0aW5ncyB0byB0aGlzIGNvbXBvbmVudFxyXG4gICAgICAqXHJcbiAgICAgICogQHBhcmFtIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX0gc2V0dGluZ3NcclxuICAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbXBvbmVudFNldHRpbmdzKHNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBjb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhdHRhY2hMYXlvdXRUb1ZpZXcocGFyZW50VmlldzpJVmlld3x1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgdmlldyA9IHBhcmVudFZpZXcgPyBwYXJlbnRWaWV3IDogdGhpcy5fdmlldztcclxuXHJcbiAgICAgICAgaWYgKHZpZXcgJiYgdGhpcy5fbGF5b3V0V2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC52aWV3ID0gdmlldztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNldHMgdGhlIGhlYWRlciBjb250ZW50IFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcblx0c2V0SGVhZGVyQ29udGVudChjb250ZW50OnN0cmluZyl7XHJcblx0XHRpZih0aGlzLl93aWRnZXRIZWFkZXJEaXYgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0dGhpcy5fd2lkZ2V0SGVhZGVyRGl2LmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNldHMgdGhlIGZvb3RlciBjb250ZW50IFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcblx0c2V0Rm9vdGVyQ29udGVudChjb250ZW50OnN0cmluZyl7XHJcblx0XHRpZih0aGlzLl93aWRnZXRGb290ZXJEaXYgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0dGhpcy5fd2lkZ2V0Rm9vdGVyRGl2LmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblx0XHR9XHJcblx0fSAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCl7XHJcblxyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgc3R5bGVzIGZvciBXaWRnZXRCYXNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIC8vdGhpcy5zdHlsZUxvYWRlZCh1bmRlZmluZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGRTdHlsZShmaWxlUGF0aDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgdGhlbWVkRmlsZVBhdGggPSB0aGlzLmdldFRoZW1lZEZpbGVQYXRoKGZpbGVQYXRoKTtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuYXBwZW5kKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIicgKyB0aGVtZWRGaWxlUGF0aCArICdcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpO1xyXG4gICAgICAgIC8qdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcbiAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcclxuICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICAgICAgICBsaW5rLmhyZWYgPSBmaWxlUGF0aDtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuYXBwZW5kKGxpbmspOyovXHJcbiAgICAgICAgLy90aGlzLmxvYWRDc3MoJCh0aGlzLm1haW5EaXYpLCBmaWxlUGF0aCwgKGxpbmspID0+e3RoaXMuc3R5bGVMb2FkZWQobGluayl9KTtcclxuICAgIH07XHJcblxyXG4gICAgYWRkU3R5bGVUb0NvbnRlbnRJZChwYXJlbnRDb250YWluZXI6IEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZCwgZmlsZVBhdGg6IHN0cmluZyl7XHJcbiAgICAgICAgaWYocGFyZW50Q29udGFpbmVyICE9IHVuZGVmaW5lZCAmJiBwYXJlbnRDb250YWluZXIuaWQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIGxldCB0aGVtZWRGaWxlUGF0aCA9IHRoaXMuZ2V0VGhlbWVkRmlsZVBhdGgoZmlsZVBhdGgpO1xyXG4gICAgICAgICAgICAkKHBhcmVudENvbnRhaW5lcikuYXBwZW5kKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIicgKyB0aGVtZWRGaWxlUGF0aCArICdcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRUaGVtZWRGaWxlUGF0aChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCB0aGVtZVByb3ZpZGVyID0gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGVtZVByb3ZpZGVyLmdldFRoZW1lZEZpbGVQYXRoKGZpbGVQYXRoKTtcclxuICAgIH1cclxuXHJcbi8vI3JlZ2lvbiBEcm9wIHN1cHBvcnRcclxuICAgIHByaXZhdGUgX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7IC8vZS5nLiBTaWduYWwsIC4uXHJcbiAgICBwdWJsaWMgZ2V0IHN1cHBvcnRlZERyYWdEcm9wRGF0YUlkcygpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBnaXZlbiBkcmFnZHJvcCBkYXRhIGlkIHRvIHRoaXMgd2lkZ2V0LCBhbmQgYWRkcyB0aGlzIHdpZGdldCB0byB0aGUgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyIGlmIG5vdCBhbHJlYWR5IHRoZXJlXHJcbiAgICAgKiBDYW4gb25seSBiZSB1c2VkIGlmIHRoZSB3aWRnZXQgZGVyaXZlcyBmcm9tIElEcm9wcGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGFkZFN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5hZGRXaWRnZXQoPGFueT50aGlzIGFzIElEcm9wcGFibGUpO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcy5pbmRleE9mKGlkKTtcclxuICAgICAgICBpZihpbmRleCA9PSAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcy5wdXNoKGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBkcmFnZHJvcCBkYXRhIGlkIGZyb20gdGhpcyB3aWRnZXQsIGFuZCBpZiBpdCBpcyB0aGUgbGFzdCBkcmFnZHJvcCBkYXRhIGlkLCByZW1vdmVzIHRoZSB3aWRnZXQgZnJvbSB0aGUgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyXHJcbiAgICAgKiBDYW4gb25seSBiZSB1c2VkIGlmIHRoZSB3aWRnZXQgZGVyaXZlcyBmcm9tIElEcm9wcGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHMuaW5kZXhPZihpZCk7XHJcbiAgICAgICAgaWYoaW5kZXggIT0gLTEpe1xyXG4gICAgICAgICAgICB0aGlzLl9zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkucmVtb3ZlV2lkZ2V0KDxhbnk+dGhpcyBhcyBJRHJvcHBhYmxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbi8vI2VuZHJlZ2lvblxyXG4gICAgXHJcbi8vI3JlZ2lvbiBkcmFnIHN1cHBvcnRcclxuICAgIHByaXZhdGUgX2Ryb3BQb3NzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZHJhZ2dpbmdTdXBwb3J0QWN0aXZlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9kcmFnZ2luZ0NvbnRhaW5lcjtcclxuICAgIHByaXZhdGUgX2RyYWdEYXRhT2JqZWN0ITogRHJhZ0Ryb3BEYXRhT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBfZHJhZ1N5bWJvbDtcclxuICAgIHByaXZhdGUgX2RlZmF1bHREcmFnUmVwcmVzZW50YXRpb24hOiBEcmFnRHJvcFJlcHJlc2VudGF0aW9uO1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdERyb3BOb3RQb3NzaWJsZVJlcHJlc2VudGF0aW9uOnN0cmluZyA9IFwiXCI7XHJcbiAgICBcclxuXHQvKipcclxuICAgICAqIEFkZHMgZHJhZ2dpbmcgc3VwcG9ydCB0byB0aGlzIHdpZGdldDsgdmlhIElEcmFnZ2FibGUgdGhlIHdpZGdldCBjYW4gcHJvdmlkZSB0aGUgaW5mb3JtYXRpb24gd2hpY2ggb2JqZWN0IHNob3VsZCBiZSBkcmFnZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZERyYWdnaW5nU3VwcG9ydCgpe1xyXG4gICAgICAgIGlmKHRoaXMubWFpbkRpdklkID09IFwiXCIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwid2lkZ2V0IG1haW4gZGl2IGlkIG5vdCBzZXQgZm9yIGRyYWdnYWJsZSBzdXBwb3J0XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbWFnZVByb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uV2lkZ2V0QmFzZS5JbWFnZVByb3ZpZGVySWQpIGFzIElJbWFnZVByb3ZpZGVyOyBcclxuICAgICAgICBpZihpbWFnZVByb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHREcm9wTm90UG9zc2libGVSZXByZXNlbnRhdGlvbiA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Ryb3BOb3RQb3NzaWJsZS5zdmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbWFnZVByb3ZpZGVyIG5vdCBhdmFpbGFibGUgPT4gQWRkIEltYWdlUHJvdmlkZXIgc3ViIGNvbXBvbmVudCB0byB0aGlzIHdpZGdldCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kcmFnZ2luZ1N1cHBvcnRBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nQ29udGFpbmVyID0gJCh0aGlzLm1haW5EaXYpO1xyXG5cclxuICAgICAgICB0aGlzLl9kcmFnZ2luZ0NvbnRhaW5lci5lakRyYWdnYWJsZSh7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlOiAxMCxcclxuXHJcbiAgICAgICAgICAgIGhlbHBlcjogKGFyZ3MpID0+IHRoaXMuZHJhZ2dpbmdIZWxwZXIoYXJncyksXHJcbiAgICAgICAgICAgIGRyYWdTdGFydDogKGFyZ3MpID0+IHRoaXMuZHJhZ2dpbmdTdGFydChhcmdzKSxcclxuICAgICAgICAgICAgZHJhZ1N0b3A6IChhcmdzKSA9PiB0aGlzLmRyYWdnaW5nU3RvcChhcmdzKSxcclxuICAgICAgICAgICAgZGVzdHJveTogKGFyZ3MpID0+IHRoaXMuZHJhZ2dpbmdEZXN0cm95KGFyZ3MpLFxyXG4gICAgICAgICAgICBkcmFnOiAoYXJncykgPT4gdGhpcy5kcmFnZ2luZ0RyYWcoYXJncyksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGRyYWdnaW5nIHN1cHBvcnQgZnJvbSB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVEcmFnZ2luZ1N1cHBvcnQoKXtcclxuICAgICAgICB0aGlzLl9kcmFnZ2luZ1N1cHBvcnRBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgZWpEcmFnZ2FibGVPYmogPSB0aGlzLl9kcmFnZ2luZ0NvbnRhaW5lci5kYXRhKFwiZWpEcmFnZ2FibGVcIik7XHJcbiAgICAgICAgaWYoZWpEcmFnZ2FibGVPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZWpEcmFnZ2FibGVPYmouZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBXaWxsIGJlIGNhbGxlZCBhdCB0aGUgZW5kIG9mIGEgZHJhZyZkcm9wIG9wZXJhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZHJhZ2dpbmdEZXN0cm95KGFyZ3Mpe1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB0ZW1wb3JhcnkgZHJhZyBvYmplY3QgZm9yIHRoZSBkcmFnICYgZHJvcCBvcGVyYXRpb24gYW5kIGFkZHMgaXQgdG8gdGhlIGRvY3VtZW50IGJvZHlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkcmFnZ2luZ0hlbHBlcihhcmdzKSB7XHJcbiAgICAgICAgdmFyIGVqRHJhZ2dhYmxlT2JqID0gdGhpcy5fZHJhZ2dpbmdDb250YWluZXIuZGF0YShcImVqRHJhZ2dhYmxlXCIpO1xyXG4gICAgICAgIGlmKGVqRHJhZ2dhYmxlT2JqICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBkcmFnIG9iamVjdCBwb3NpdGlvbiAoX3JlbFlwb3NpdGlvbiBhbmQgX3JlbFhwb3NpdGlvbiBhcmUgdGhlIHBvc2l0aW9ucyB3aXRoaW4gdGhlIGRyYWdnYWJsZSBvYmplY3QpXHJcbiAgICAgICAgICAgIGVqRHJhZ2dhYmxlT2JqLm9wdGlvbihcImN1cnNvckF0XCIsIHsgdG9wOiAoIGVqRHJhZ2dhYmxlT2JqLl9yZWxZcG9zaXRpb24qLTEpLTEwLCBsZWZ0OiAgZWpEcmFnZ2FibGVPYmouX3JlbFhwb3NpdGlvbiotMSB9LCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBHZXQgdGhlIGluZm9ybWF0aW9uIG9mIHRoZSBkcmFnIG9iamVjdCBmcm9tIHdpZGdldFxyXG4gICAgICAgIGxldCBkcmFnRGF0YU9iamVjdCA9IHRoaXMuc3RhcnREcmFnZ2luZygpO1xyXG4gICAgICAgIGlmKGRyYWdEYXRhT2JqZWN0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZHJhZ0RhdGFPYmplY3QgPSBkcmFnRGF0YU9iamVjdDtcclxuXHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdERyYWdSZXByZXNlbnRhdGlvbiA9IHRoaXMuX2RyYWdEYXRhT2JqZWN0LnJlcHJlc2VudGF0aW9uO1xyXG4gICAgICAgIHRoaXMuX2RyYWdTeW1ib2wgPSAkKCc8cHJlPicpLmh0bWwodGhpcy5fZGVmYXVsdERyb3BOb3RQb3NzaWJsZVJlcHJlc2VudGF0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gQWRkcyB0aGUgY3VycmVudCBkYXRhIHRvIHRoZSBkcmFnIGRhdGFcclxuICAgICAgICB0aGlzLnNldERyYWdEYXRhKGFyZ3MsIHRoaXMuX2RyYWdEYXRhT2JqZWN0LmRhdGEpXHJcblxyXG4gICAgICAgIHRoaXMuX2RyYWdTeW1ib2wuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RyYWdTeW1ib2w7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaWxsIGJlIGNhbGxlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgZHJhZyZkcm9wIG9wZXJhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsoRHJhZ0Ryb3BEYXRhT2JqZWN0fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnREcmFnZ2luZygpOkRyYWdEcm9wRGF0YU9iamVjdHx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGFmdGVyIHRoZSBkcm9wXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGRyYWdnaW5nU3RvcHBlZCgpe1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSB0ZW1wb3JhcnkgZHJhZyBvYmplY3QgYWZ0ZXIgZHJhZyAmIGRyb3Agb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlRHJhZ09iamVjdEZyb21Eb2N1bWVudCgpIHsgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzLmxlbmd0aC0xOyBpID49IDA7IGktLSl7XHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1tpXS5ub2RlTmFtZSA9PSBcIlBSRVwiKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1tpXS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaWxsIGJlIGNhbGxlZCBhdCBzdGFydCBkcmFnZ2luZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRyYWdnaW5nU3RhcnQoYXJncykge1xyXG4gICAgICAgIGxldCBkcmFnRGF0YSA9IHRoaXMuZ2V0RHJhZ0RhdGEoYXJncyk7XHJcbiAgICAgICAgaWYoZHJhZ0RhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gSW5mb3JtIG9ubHkgd2lkZ2V0cyB3aXRoIGRyb3Agc3VwcG9ydCBmb3IgdGhlIGdpdmVuIGRyYWdEcm9wRGF0YUlkXHJcbiAgICAgICAgICAgIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFdpZGdldHNXaXRoRHJhZ0Ryb3BEYXRhSWQodGhpcy5fZHJhZ0RhdGFPYmplY3QuaWQpLmZvckVhY2god2lkZ2V0ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNhbGwgZHJhZ1N0YXJ0XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuZHJhZ1N0YXJ0KG5ldyBEcmFnRHJvcEFyZ3MoYXJncy5jdXJyZW50VGFyZ2V0LCBkcmFnRGF0YSwgdGhpcy5fZGVmYXVsdERyYWdSZXByZXNlbnRhdGlvbikpO1xyXG4gICAgICAgICAgICB9KTsgIFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIHdoaWxlIGRyYWdnaW5nIGlzIGFjdGl2ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZHJhZ2dpbmdEcmFnKGFyZ3MpIHtcclxuICAgICAgICB0aGlzLl9kcm9wUG9zc2libGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgY3VycmVudERyYWdEcm9wRWxlbWVudCA9IHRoaXMuX2RlZmF1bHREcmFnUmVwcmVzZW50YXRpb24uY2xvbmUoKTtcclxuICAgICAgICBsZXQgZHJhZ0RhdGEgPSB0aGlzLmdldERyYWdEYXRhKGFyZ3MpO1xyXG4gICAgICAgIGlmKGRyYWdEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBuZXdXaWRnZXQ6IElEcm9wcGFibGV8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZihhcmdzLmN1cnJlbnRUYXJnZXQgIT0gdW5kZWZpbmVkKXsgLy8gdW5kZWZpbmVkIGlmIG91dCBvZiBicm93c2VyIHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBJbmZvcm0gb25seSB3aWRnZXRzIHdpdGggZHJvcCBzdXBwb3J0IGZvciB0aGUgZ2l2ZW4gZHJhZ0Ryb3BEYXRhSWRcclxuICAgICAgICAgICAgICAgIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFdpZGdldHNXaXRoRHJhZ0Ryb3BEYXRhSWQodGhpcy5fZHJhZ0RhdGFPYmplY3QuaWQpLmZvckVhY2god2lkZ2V0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHdpZGdldCB3aXRoIGN1cnJlbnRUYXJnZXQoZGl2SWQpIGFzIHBhcmVudCBzaG91bGQgYmUgaW5mb3JtZWRcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzRWxlbWVudFdpdGhpbldpZGdldChhcmdzLmN1cnJlbnRUYXJnZXQsIHdpZGdldC5tYWluRGl2SWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3V2lkZ2V0ID0gd2lkZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFnT3ZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHJhZ0Ryb3BBcmdzID0gbmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhLCBjdXJyZW50RHJhZ0Ryb3BFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRyYWdPdmVyUG9zc2libGUgPSB3aWRnZXQuZHJhZ092ZXIoZHJhZ0Ryb3BBcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZHJhZ092ZXJQb3NzaWJsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcm9wUG9zc2libGUgPSBkcmFnT3ZlclBvc3NpYmxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgaWYobmV3V2lkZ2V0ICE9IHRoaXMuX2N1cnJlbnRXaWRnZXQpe1xyXG4gICAgICAgICAgICAgICAgLy8gRHJhZ092ZXIgY2hhbmdlZCBmcm9tIG9uZSB3aWRnZXQgdG8gYW4gb3RoZXJcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2N1cnJlbnRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0LmRyb3BGb2N1c0xvc3QoYXJncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0ID0gbmV3V2lkZ2V0O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9kcm9wUG9zc2libGUpe1xyXG4gICAgICAgICAgICB0aGlzLl9kcmFnU3ltYm9sWzBdLmlubmVySFRNTCA9IGN1cnJlbnREcmFnRHJvcEVsZW1lbnQuZ2V0RHJhZ0Ryb3BFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTeW1ib2xbMF0uaW5uZXJIVE1MID0gdGhpcy5fZGVmYXVsdERyb3BOb3RQb3NzaWJsZVJlcHJlc2VudGF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gZHJhZ2dpbmcgd2FzIHN0b3BwZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRyYWdnaW5nU3RvcChhcmdzKSB7XHJcbiAgICAgICAgbGV0IGRyYWdEYXRhID0gdGhpcy5nZXREcmFnRGF0YShhcmdzKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5fZHJvcFBvc3NpYmxlKXtcclxuICAgICAgICAgICAgaWYoYXJncy5jdXJyZW50VGFyZ2V0ICE9IHVuZGVmaW5lZCApeyAgLy8gdW5kZWZpbmVkIGlmIG91dCBvZiBicm93c2VyIHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgLy8gSW5mb3JtIG9ubHkgd2lkZ2V0cyB3aXRoIGRyb3Agc3VwcG9ydCBmb3IgdGhlIGdpdmVuIGRyYWdEcm9wRGF0YUlkXHJcbiAgICAgICAgICAgICAgICBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRXaWRnZXRzV2l0aERyYWdEcm9wRGF0YUlkKHRoaXMuX2RyYWdEYXRhT2JqZWN0LmlkKS5mb3JFYWNoKHdpZGdldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB3aWRnZXQgd2l0aCBjdXJyZW50VGFyZ2V0KGRpdklkKSBhcyBwYXJlbnQgc2hvdWxkIGJlIGluZm9ybWVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc0VsZW1lbnRXaXRoaW5XaWRnZXQoYXJncy5jdXJyZW50VGFyZ2V0LCB3aWRnZXQubWFpbkRpdklkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGwgZHJvcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuZHJvcChuZXcgRHJhZ0Ryb3BBcmdzKGFyZ3MuY3VycmVudFRhcmdldCwgZHJhZ0RhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSW5mb3JtIG9ubHkgd2lkZ2V0cyB3aXRoIGRyb3Agc3VwcG9ydCBmb3IgdGhlIGdpdmVuIGRyYWdEcm9wRGF0YUlkXHJcbiAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0V2lkZ2V0c1dpdGhEcmFnRHJvcERhdGFJZCh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCkuZm9yRWFjaCh3aWRnZXQgPT4ge1xyXG4gICAgICAgICAgICAvLyBjYWxsIGRyYWdTdG9wXHJcbiAgICAgICAgICAgIHdpZGdldC5kcmFnU3RvcChuZXcgRHJhZ0Ryb3BBcmdzKGFyZ3MuY3VycmVudFRhcmdldCwgZHJhZ0RhdGEpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZ1N0b3BwZWQoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZURyYWdPYmplY3RGcm9tRG9jdW1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERyYWdEYXRhKGFyZ3M6IGFueSk6IGFueXtcclxuICAgICAgICBpZih0aGlzLl9kcmFnRGF0YU9iamVjdCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gYXJncy5lbGVtZW50LmRhdGEodGhpcy5fZHJhZ0RhdGFPYmplY3QuaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0RHJhZ0RhdGEoYXJnczogYW55LCBkYXRhOiBhbnkpe1xyXG4gICAgICAgIGFyZ3MuZWxlbWVudC5kYXRhKHRoaXMuX2RyYWdEYXRhT2JqZWN0LmlkLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIGFuIGVsZW1lbnQgaXMgYSBjaGlsZCBvZiB0aGUgZ2l2ZW4gcGFyZW50IGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdpZGdldElkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGlzRWxlbWVudFdpdGhpbldpZGdldChlbGVtZW50LCB3aWRnZXRJZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgaWQgPSBcIiNcIiArIHdpZGdldElkO1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBlbGVtZW50LmNsb3Nlc3QoaWQpO1xyXG4gICAgICAgIGlmKHBhcmVudCA9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHdpZGdldCBmb3IgdGhlIGdpdmVuIGlkIGlmIGZvdW5kLCBlbHNlIHVuZGVmaW5lZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCB0aGUgd2lkZ2V0IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIC8qcHVibGljIGdldFdpZGdldEJ5SWQoaWQ6IHN0cmluZywgcmVjdXJzaXZlOiBib29sZWFuID0gZmFsc2UpOiBJV2lkZ2V0fHVuZGVmaW5lZHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fd2lkZ2V0cykge1xyXG4gICAgICAgICAgICBsZXQgZm91bmRXaWRnZXQ6IElXaWRnZXR8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5fd2lkZ2V0c1trZXldO1xyXG4gICAgICAgICAgICBpZih3aWRnZXQuaWQgPT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgZm91bmRXaWRnZXQgPSB3aWRnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHJlY3Vyc2l2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm91bmRDaGlsZFdpZGdldCA9IHdpZGdldC5nZXRXaWRnZXRCeUlkKGlkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihmb3VuZENoaWxkV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kV2lkZ2V0ID0gZm91bmRDaGlsZFdpZGdldDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZm91bmRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZFdpZGdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9Ki9cclxuXHJcblxyXG4vLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLypwcml2YXRlIHN0eWxlTG9hZGVkKGxpbmspe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZENzcyhlbGVtZW50LCB1cmwsIGNhbGxiYWNrKXtcclxuICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xyXG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gICAgICAgIGxpbmsuaHJlZiA9IHVybDtcclxuICAgICAgICBcclxuICAgICAgICBlbGVtZW50WzBdLmFwcGVuZENoaWxkKGxpbmspO1xyXG4gICAgXHJcbiAgICAgICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobGluayk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2YXRlIHRoZSBXaWRnZXRCYXNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZSB0aGUgV2lkZ2V0QmFzZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGRlYWN0aXZhdGUoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgd2lkZ2V0IGJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBjb25uZWN0KGNvbXBvbmVudElkOnN0cmluZyl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgV2lkZ2V0QmFzZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBpZih0aGlzLl9kcmFnZ2luZ1N1cHBvcnRBY3RpdmUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRHJhZ2dpbmdTdXBwb3J0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX2RhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZXZlbnRNb2RlbENoYW5nZWQuZGV0YWNoKHRoaXMuX21vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZC5kZXRhY2godGhpcy5fbW9kZWxJdGVtc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGRlbGV0ZSBiaW5kaW5nc1xyXG4gICAgICAgIEJpbmRpbmdzLnVuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGJ1c3kgc2NyZWVuIGluZm9ybWF0aW9uIHdoaWNoIHdpbGwgYmUgc2hvd24gd2hlbiB0aGUgYnVzeSBmbGFnIHRydWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0J1c3lJbmZvcm1hdGlvbn0gYnVzeUluZm9ybWF0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBzZXRCdXN5SW5mb3JtYXRpb24oYnVzeUluZm9ybWF0aW9uOiBCdXN5SW5mb3JtYXRpb24pe1xyXG4gICAgICAgIHRoaXMuX2J1c3lJbmZvcm1hdGlvbiA9IGJ1c3lJbmZvcm1hdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgYnVzeSBmbGFnIG9mIHRoZSBXaWRnZXRCYXNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBmbGFnIGlmIHRydWUgYnVzeSBzY3JlZW4gd2lsbCBiZSBzaG93blxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgc2V0QnVzeShmbGFnOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmJ1c3lTY3JlZW5JZCA9IHRoaXMubWFpbkRpdklkICsgXCJfYnVzeVNjcmVlblwiO1xyXG4gICAgICAgIGlmKGZsYWcgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGxldCBjb21tb25MYXlvdXRQcm92aWRlciA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbldpZGdldEJhc2UuQ29tbW9uTGF5b3V0UHJvdmlkZXJJZCkgYXMgSUNvbW1vbkxheW91dFByb3ZpZGVyO1xyXG4gICAgICAgICAgICBpZihjb21tb25MYXlvdXRQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGh0bWwgPSBjb21tb25MYXlvdXRQcm92aWRlci5nZXRCdXN5U2NyZWVuTGF5b3V0KHRoaXMuYnVzeVNjcmVlbklkLCB0aGlzLl9idXN5SW5mb3JtYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzLm1haW5EaXYpLnBhcmVudCgpLmFwcGVuZChodG1sKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbW1vbkxheW91dFByb3ZpZGVyIG5vdCBhdmFpbGFibGUgPT4gYWRkIHRvIHN1YiBjb21wb25lbnRzIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBsZXQgYnVzeURpdiA9ICQodGhpcy5tYWluRGl2KS5wYXJlbnQoKS5maW5kKFwiI1wiK3RoaXMuYnVzeVNjcmVlbklkKTtcclxuICAgICAgICAgICAgYnVzeURpdi5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQnVzeU1lc3NhZ2UobmV3TWVzc2FnZTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgY29tbW9uTGF5b3V0UHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb25XaWRnZXRCYXNlLkNvbW1vbkxheW91dFByb3ZpZGVySWQpIGFzIElDb21tb25MYXlvdXRQcm92aWRlcjtcclxuICAgICAgICBpZihjb21tb25MYXlvdXRQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb21tb25MYXlvdXRQcm92aWRlci5jaGFuZ2VCdXN5TWVzc2FnZSh0aGlzLmJ1c3lTY3JlZW5JZCwgbmV3TWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGVyc2lzdCB3aWRnZXQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2F2ZVNldHRpbmdzKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNhdmVDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplIHRoZSBXaWRnZXRCYXNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YU1vZGVsKCk6SURhdGFNb2RlbHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBkYXRhTW9kZWwoZGF0YU1vZGVsOiBJRGF0YU1vZGVsKXtcclxuICAgICAgICAvLyBEZXRhY2ggZXZlbnRzIGZyb20gb2xkIGRhdGFNb2RlbFxyXG4gICAgICAgIHRoaXMuZGV0YWNoRGF0YU1vZGVsRXZlbnRzKCk7XHJcbiAgICAgICAgLy8gU2V0IG5ldyBkYXRhTW9kZWxcclxuICAgICAgICB0aGlzLl9kYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcbiAgICAgICAgLy8gQXR0YWNoIGV2ZW50cyB0byBuZXcgZGF0YU1vZGVsXHJcbiAgICAgICAgdGhpcy5hdHRhY2hEYXRhTW9kZWxFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGF0dGFjaGVzIHRoZSBkYXRhIG1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaERhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZih0aGlzLl9kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9tb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxJdGVtc0NoYW5nZWQuYXR0YWNoKHRoaXMuX21vZGVsSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGRldGFjaGVzIHRoZSBkYXRhIG1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaERhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZih0aGlzLl9kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9tb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxJdGVtc0NoYW5nZWQuZGV0YWNoKHRoaXMuX21vZGVsSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBhbnksIGRhdGE6IGFueSk6IGFueSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25PYnNlcnZhYmxlc0NoYW5nZWQoY2hhbmdlZE9ic2VydmFibGVzOiBPYnNlcnZhYmxlW10pIHtcclxuIFxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0aGUgY2xhc3MgaW1wbGVtZW50cyB0aGUgbnVsbCBvYmplY3QgZm9yIHRoZSBkYXRhIG1vZGVsLiBJdCBpcyBpbnRlbmRlZCB0byBiZSBzZXQgZm9yIHdpZGdldHMgd2l0aG91dCBhIHJlYWwgZGF0YSBtb2RlbFxyXG4gKlxyXG4gKiBAY2xhc3MgTnVsbERhdGFNb2RlbFxyXG4gKiBAaW1wbGVtZW50cyB7SURhdGFNb2RlbH1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOdWxsRGF0YU1vZGVsIGltcGxlbWVudHMgSURhdGFNb2RlbHtcclxuXHJcbiAgICBldmVudE1vZGVsQ2hhbmdlZDogRXZlbnRNb2RlbENoYW5nZWQgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWQ7IFxyXG4gICAgZXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZDogRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZCA9IG5ldyBFdmVudE1vZGVsSXRlbXNDaGFuZ2VkOyBcclxuICAgICAgICBcclxuICAgIHB1YmxpYyBjb21wb25lbnQhOiBDb21wb25lbnRCYXNlO1xyXG5cclxuICAgIG9ic2VydmVNb2RlbEl0ZW1zKG9ic2VydmFibGVJdGVtczogYW55W10pIHtcclxuXHJcbiAgICB9XHJcbiAgICBvbk1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcblxyXG4gICAgfVxyXG4gICAgaGFuZGxlTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBkYXRhOmFueSA7ICAgIGRhdGFTb3VyY2U7XHJcbiAgICBpbml0aWFsaXplKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xlYXIoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG5cclxuICAgIH1cclxuICAgIGdldERlZmF1bHRTdG9yaW5nRGF0YSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgIH1cclxuICAgXHJcbiAgICBzZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3QoKTogdm9pZCB7XHJcbiAgIFxyXG4gICAgfVxyXG4gICAgb25Nb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuIFxyXG4gICAgfVxyXG4gICAgaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7V2lkZ2V0QmFzZX07Il19