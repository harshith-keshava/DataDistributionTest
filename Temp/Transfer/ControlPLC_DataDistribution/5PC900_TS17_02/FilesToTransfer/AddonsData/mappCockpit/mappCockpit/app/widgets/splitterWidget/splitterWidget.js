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
define(["require", "exports", "../common/layoutWidgetBase", "./layoutPane", "../common/viewTypeProvider", "../common/uniqueIdGenerator", "./splitterPaneDefinition", "./splitterDefinition", "../../common/componentFactory/componentDefinition", "../common/widgetBase", "../common/paneProperties"], function (require, exports, layoutWidgetBase_1, layoutPane_1, viewTypeProvider_1, uniqueIdGenerator_1, splitterPaneDefinition_1, splitterDefinition_1, componentDefinition_1, widgetBase_1, paneProperties_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplitterWidget = /** @class */ (function (_super) {
        __extends(SplitterWidget, _super);
        function SplitterWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._orientation = ej.Orientation.Horizontal;
            _this._isResponsive = true;
            _this._defaultSplitterSize = 9; // TODO get actual splitter size 
            return _this;
        }
        /**
         * Initialize the splitter widget
         *
         * @param {number} [headerHeight=0]
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.initialize = function () {
            this._actualWidth = 1000;
            this._actualHeight = 400;
            this.layoutPanes = new Array();
            _super.prototype.initialize.call(this);
        };
        /**
         * Sets the orientation of the splitters in the widget (vertical or horizontal)
         *
         * @param {string} orientation
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.setOrientation = function (orientation) {
            if (orientation == splitterDefinition_1.SplitterDefinition.orientationVertical) {
                this._orientation = ej.Orientation.Vertical;
            }
            else if (orientation == splitterDefinition_1.SplitterDefinition.orientationHorizontal) {
                this._orientation = ej.Orientation.Horizontal;
            }
        };
        /**
         * Returns the orientation of the splitters in the widget (vertical or horizontal)
         *
         * @returns {string}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getOrientation = function () {
            if (this._orientation == ej.Orientation.Vertical) {
                return splitterDefinition_1.SplitterDefinition.orientationVertical;
            }
            else if (this._orientation == ej.Orientation.Horizontal) {
                return splitterDefinition_1.SplitterDefinition.orientationHorizontal;
            }
            return "";
        };
        SplitterWidget.prototype.getResponsive = function () {
            return this._isResponsive;
        };
        SplitterWidget.prototype.setResponsive = function (isResponsive) {
            this._isResponsive = isResponsive;
            this._actualHeight = 400;
        };
        /**
         * Creates the splitter widget
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.createLayout = function () {
            var _this = this;
            $(this.mainDiv).ejSplitter({
                isResponsive: true,
                orientation: ej.Orientation.Horizontal,
                allowKeyboardNavigation: false,
                // Set a default size => Needed for inactive splitter windows to avoid AddItem problems
                width: "400px",
                height: "400px",
                resize: function (args) {
                    _this.onSplitterResize(args);
                },
                create: function (args) {
                    _this.mainDiv.style.padding = "0px";
                }
            });
        };
        /**
         * Sets the actual layout panes definitions to the ejsplitter
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.recalculateLayout = function () {
            var splitter = this.getSplitter();
            // Set orientation before get properties to the correct paneSizes(height/width)
            splitter.option("orientation", this._orientation);
            var properties = this.getProperties(splitter);
            var keys = Object.keys(this.layoutPanes);
            if (properties.length != keys.length) {
                throw (new Error("properties.length != this.layoutPanes.length"));
            }
            this.updatePropertiesInformationsWithLayoutPanesData(properties);
            this.setPanePropertiesToSplitter(splitter, properties);
            if (this._isResponsive == false) {
                // create default first pane, which will be needed for drag&drop of new widgets to the splitter widget
                var splitter_1 = this.getSplitter();
                var newItem = splitter_1.addItem("<div id='" + this.getLastPaneId() + "' style='overflow:hidden; width:100%; height:100%'></div>", { paneSize: 400, expandable: false, collapsible: false }, 0);
            }
        };
        /**
         * resizes the splitter widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resize = function (width, height) {
            if (this._isResponsive) {
                this._actualHeight = height;
            }
            this._actualWidth = width;
            this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Loads the styles for the splitter widget
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.loadStyles = function () {
            // TODO: get div from _layoutContainerId
            //super.addStyleToContentId("#" + this._layoutContainerId, "widgets/splitterWidget/style/css/splitterStyle.css");
            //super.addStyleToContentId("#" + this._layoutContainerId, "widgets/common/style/css/widgetHeaderFooterStyle.css");
        };
        /**
         * Activates all the widget in the different splitter panes
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.activate = function () {
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.activate();
                }
            });
        };
        /**
         * Deactivates all the widget in the different splitter panes
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.deactivate = function () {
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.deactivate();
                }
            });
        };
        /**
         * Disposes the widget
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.dispose = function () {
            this.component.disablePersisting();
            _super.prototype.dispose.call(this);
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.dispose();
                }
            });
        };
        SplitterWidget.prototype.getComponentSettings = function (onlyModified) {
            this.component.setSetting(splitterDefinition_1.SplitterDefinition.splitterDefinitionId, this.getSplitterDefinition());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        SplitterWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
                var splitterDefinition = this.component.getSetting(splitterDefinition_1.SplitterDefinition.splitterDefinitionId);
                if (splitterDefinition != undefined) {
                    this.setSplitterDefinition(splitterDefinition);
                }
            }
        };
        SplitterWidget.prototype.getSplitterDefinition = function () {
            var splitterDefinition = new splitterDefinition_1.SplitterDefinition(this.getOrientation(), this.getResponsive());
            splitterDefinition.paneDefinitions = this.getSplitterPaneDefinitions();
            return splitterDefinition;
        };
        SplitterWidget.prototype.setSplitterDefinition = function (splitterDefinition) {
            var splitterOrientation = splitterDefinition.orientation;
            var splitterResponsive = splitterDefinition.responsive;
            var paneDefinitions = splitterDefinition.paneDefinitions;
            if (paneDefinitions == undefined) {
                return;
            }
            // Set splitter panes
            this.setSplitterPaneDefinitions(paneDefinitions);
            // Set orientation of splitter panes
            this.setOrientation(splitterOrientation);
            // Set responsive of splitter
            this.setResponsive(splitterResponsive);
            this.recalculateLayout();
        };
        SplitterWidget.prototype.getSplitterPaneDefinitions = function () {
            var _this = this;
            var paneDefinitions = new Array();
            this._widgets.forEach(function (widget, key) {
                if (widget != undefined) {
                    var componentDefinition = new componentDefinition_1.ComponentDefinition("", "", "");
                    componentDefinition.set(widget.component.getDefinition());
                    var paneSettings = undefined;
                    var layoutPane = _this.getLayoutPane(key);
                    if (layoutPane != undefined) {
                        paneSettings = layoutPane.getSettings();
                    }
                    else {
                        console.error("LayoutPane not defined!");
                    }
                    paneDefinitions.push(new splitterPaneDefinition_1.SplitterPaneDefinition(componentDefinition, paneSettings));
                }
            });
            return paneDefinitions;
        };
        SplitterWidget.prototype.getLayoutPane = function (key) {
            var layoutPane;
            layoutPane = this.layoutPanes.filter(function (element) { return element.name == key; });
            return layoutPane[0];
        };
        SplitterWidget.prototype.setSplitterPaneDefinitions = function (paneDefinitions) {
            // Create splitter panes and add widgets
            for (var i_1 = 0; i_1 < paneDefinitions.length; i_1++) {
                if (paneDefinitions[i_1] != undefined) {
                    var componentDefinition = paneDefinitions[i_1].componentDefinition;
                    if (this.component.componentFactory != undefined) {
                        var component = this.component.addSubComponent(componentDefinition.type, componentDefinition.id, componentDefinition.defaultSettingsDataId, this.component.context);
                        if (component != undefined) {
                            // check if instance is a widget
                            if (component instanceof widgetBase_1.WidgetBase) {
                                var widget = component;
                                var splitterStoringDataId = componentDefinition.defaultSettingsDataId;
                                if (splitterStoringDataId != "") {
                                    widget.setDefaultComponentSettingsDataId(splitterStoringDataId);
                                }
                                this.addWidget(widget, componentDefinition.id, viewTypeProvider_1.ViewType.Default, new paneProperties_1.PaneProperties());
                            }
                        }
                        else {
                            if (componentDefinition.type != "ChartBase") { // "ChartBase" currently not implemented => TODO: create charts with componentfactory
                                console.warn("Component with component type '" + componentDefinition.type + "' could not be created!");
                            }
                        }
                    }
                    else {
                        console.error("ComponentFactory not available!");
                    }
                }
            }
            // Set splitter pane sizes
            var i = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (paneDefinitions[i].paneData != undefined) {
                    layoutPane.setSettings(paneDefinitions[i].paneData); // TODO: paneData
                }
                i++;
            }
        };
        /**
         * Get pane definitions from chartSplitter component
         *
         * @returns {Array<SplitterPaneDefinition>}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getChartViewSplitterPaneDefinitions = function () {
            var settings = this.component.getComponentSettings();
            var paneDefinitions = new Array();
            if (settings.data != undefined) {
                if (settings.data.splitterDefinition != undefined) {
                    paneDefinitions = settings.data.splitterDefinition.paneDefinitions;
                }
            }
            return paneDefinitions;
        };
        /**
         * Adds a widget to the splitter => a new pane will be added for the widget to the splitter
         *
         * @param {IWidget} widget
         * @param {string} name
         * @param {ViewType} viewType
         * @param {PaneProperties} paneProperties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addWidget = function (widget, name, viewType, paneProperties) {
            _super.prototype.addWidget.call(this, widget, name, viewType);
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            var oldPaneSizes = this.getPaneSizes(properties);
            if (!this._isResponsive && paneProperties.paneSize != -1) {
                this._actualHeight += paneProperties.paneSize + this._defaultSplitterSize;
                this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            }
            var paneId = this.getPaneDivId(name);
            var indexOfNewPane = splitter.model.properties.length;
            this.addPane(splitter, paneId, indexOfNewPane, paneProperties);
            widget.initialize();
            // add widget to the parent container
            widget.addToParentContainerId(paneId);
            this.updateLayoutPanesAfterAddingNewPane(properties, oldPaneSizes, widget, viewType);
            if (!this._isResponsive) {
                this.setPanePropertiesToSplitter(splitter, properties);
                this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
            }
        };
        /**
         * adds this widget to the given container
         *
         * @param {(HTMLDivElement|undefined)} parentContainer
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addToParentContainer = function (parentContainer) {
            // Adds some additional needed styles for this splitter to the parent container
            this.addStyleToContentId(parentContainer, "widgets/splitterWidget/style/css/splitterStyle.css");
            this.addStyleToContentId(parentContainer, "widgets/common/style/css/widgetHeaderFooterStyle.css");
            _super.prototype.addToParentContainer.call(this, parentContainer);
        };
        /**
         * Removes a widget(pane) from the splitter
         *
         * @param {IWidget} widget
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removeWidget = function (widget) {
            var paneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            // get all actual paneSizes 
            var properties = this.getProperties(splitter);
            var sizeToRemove = properties[paneIndex].paneSize;
            var paneSizes = this.getPaneSizes(properties);
            paneSizes.splice(paneIndex, 1);
            splitter.removeItem(paneIndex);
            this.adjustChartsDivContainerSize(sizeToRemove);
            var newSplitterHeight = this.adjustSplitterSize(splitter, sizeToRemove);
            for (var i = 0; i < properties.length; i++) {
                properties[i].paneSize = paneSizes[i];
            }
            this.layoutPanes.splice(paneIndex, 1);
            this.removeWidgetFromList(widget);
            this._actualHeight = newSplitterHeight;
            this.setPanePropertiesToSplitter(splitter, properties);
        };
        /**
         * Moves a widget(splitter pane) from the source index to the target index
         * (internal: target index will be decreased by 1 if source index is before target index)
         *
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.moveWidget = function (widget, targetPaneIndex) {
            // adds the widget divs to the documents temp
            widget.addToDocumentsTemp();
            var sourcePaneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            var layoutPane = this.layoutPanes[sourcePaneIndex];
            targetPaneIndex = this.updataTargetPaneIndex(sourcePaneIndex, targetPaneIndex);
            var originalPaneProperies = this.getPaneProperties(layoutPane);
            var properties = this.getProperties(splitter);
            this.updatePropertiesList(properties, sourcePaneIndex, targetPaneIndex);
            this.removePane(splitter, sourcePaneIndex);
            var paneId = this.getPaneDivId(widget.widgetName);
            this.addPane(splitter, paneId, targetPaneIndex, originalPaneProperies);
            this.updateLayoutPanesListAfterMoving(layoutPane, sourcePaneIndex, targetPaneIndex);
            this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            // adds the widget divs to the new added splitter pane
            widget.addToParentContainerId(paneId);
            widget.flaggedForResize = true;
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Returns the paneProperties of the given layoutPane
         *
         * @private
         * @param {ILayoutPane} layoutPane
         * @returns {PaneProperties}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneProperties = function (layoutPane) {
            var paneProperties = new paneProperties_1.PaneProperties();
            paneProperties.collapsible = layoutPane.collapsible;
            paneProperties.expandable = layoutPane.expandable;
            paneProperties.minSize = layoutPane.minimumSize;
            paneProperties.resizable = layoutPane.resizable;
            return paneProperties;
        };
        /**
         * Resize a widget to a new size and adapt the other widgets in this layoutWidget(splitter)
         *
         * @param {IWidget} widget
         * @param {number} newSize
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeWidget = function (widget, newSize) {
            var paneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            // set new pane sizes
            var currentPaneSize = properties[paneIndex].paneSize;
            var paneDiffSize = currentPaneSize - newSize;
            var sizeOfOtherPane = -1;
            var indexOfOtherPane = -1;
            if (paneIndex + 1 >= this.layoutPanes.length) {
                // Last pane size changed => update the size of the pane before
                sizeOfOtherPane = properties[paneIndex - 1].paneSize + paneDiffSize;
                indexOfOtherPane = paneIndex - 1;
            }
            else {
                // Update the following pane size
                sizeOfOtherPane = properties[paneIndex + 1].paneSize + paneDiffSize;
                indexOfOtherPane = paneIndex + 1;
            }
            if (sizeOfOtherPane < 0) {
                // Avoid resizing the following pane(or the pane before) to a size smaller then 0
                var oldValue = Math.abs(sizeOfOtherPane);
                sizeOfOtherPane = 50;
                newSize = newSize - oldValue - 50;
            }
            this.layoutPanes[indexOfOtherPane].size = sizeOfOtherPane;
            properties[indexOfOtherPane].paneSize = sizeOfOtherPane;
            this.layoutPanes[paneIndex].size = newSize;
            properties[paneIndex].paneSize = newSize;
            // Updates the splitters
            this.setPanePropertiesToSplitter(splitter, properties);
            // updates the contents in the splitters
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight);
        };
        /**
         * Returns the ejSplitter data object
         *
         * @private
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getSplitter = function () {
            return $(this.mainDiv).data("ejSplitter");
        };
        /**
         * Returns the sizes of all panes together, incl. the dynamic pane
         *
         * @private
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.sumOfDefinedLayoutPaneSizes = function () {
            var sum = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane != undefined) {
                    sum += layoutPane.size;
                }
            }
            return sum;
        };
        /**
         * Returns the sizes of all panes together, without the size of the dynamic pane but including the splitter size(e.g. 9px)
         *
         * @private
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.sumOfDefinedPaneSizes = function () {
            var sum = 0;
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        sum += layoutPane.size;
                    }
                    if (index > 0) {
                        var splitterSize = this._defaultSplitterSize;
                        sum += splitterSize; // Add size of splitter
                    }
                }
                index++;
            }
            return sum;
        };
        /**
         * if the pane sizes are too big for the current window size, the panes would be decreased in size
         *
         * @private
         * @param {number} size
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adoptLayoutPanesToFitCurrentSize = function (size) {
            var sumOfPanesWitoutDynamic = this.sumOfDefinedPaneSizes();
            var neededSize = sumOfPanesWitoutDynamic - size;
            if (neededSize > 0) {
                // TODO: get last not dynamic pane
                var lastPane = this.layoutPanes[this.layoutPanes.length - 1];
                lastPane.size = lastPane.size - neededSize;
            }
        };
        /**
         * Adds a new pane at the given index with the given size
         *
         * @private
         * @param {ej.Splitter} splitter
         * @param {string} paneId
         * @param {number} indexOfNewPane
         * @param {PaneProperties} paneProperties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addPane = function (splitter, paneId, indexOfNewPane, paneProperties) {
            var newItem;
            if (!this._isResponsive && paneProperties.paneSize != -1) {
                if (indexOfNewPane == 0) {
                    indexOfNewPane++;
                }
                newItem = splitter.removeItem(indexOfNewPane - 1);
                newItem = splitter.addItem("<div id='" + paneId + "' style='overflow:hidden; width:100%; height:100%''></div>", { paneSize: paneProperties.paneSize, expandable: paneProperties.expandable, collapsible: paneProperties.collapsible, minSize: paneProperties.minSize }, indexOfNewPane - 1);
                //Check splitter size: Increase height of splitter if it is not big enough to insert a new chart
                if (!this.hasPaneMinSize(splitter)) {
                    this.resizeSplitter(this._actualWidth, this._actualHeight + 1);
                }
                newItem = splitter.addItem("<div id='" + this.getLastPaneId() + "' style='overflow:hidden; width:100%; height:100%'></div>", { paneSize: 400, expandable: false, collapsible: false }, indexOfNewPane);
            }
            else {
                newItem = splitter.addItem("<div id='" + paneId + "' style='overflow:hidden; width:100%; height:100%''></div>", { paneSize: paneProperties.paneSize, expandable: paneProperties.expandable, collapsible: paneProperties.collapsible, minSize: paneProperties.minSize }, indexOfNewPane);
            }
            if (newItem.toString() == "") {
                console.error("ERROR: splitter.addItem");
            }
            else {
                newItem[0].style.overflow = "hidden";
            }
        };
        /**
         * Returns the div id of the last pane
         *
         * @returns {string}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getLastPaneId = function () {
            return this.mainDivId + "_lastPane";
        };
        /**
         * Returns the div id of a pane for the given widgetname
         *
         * @private
         * @param {string} name
         * @returns {string}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneDivId = function (name) {
            return this.mainDivId + "pane_" + name.replace(" ", "");
        };
        /**
         *  Removes the pane with the given index from the splitter
         *
         * @private
         * @param {*} splitter
         * @param {number} paneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removePane = function (splitter, paneIndex) {
            splitter.removeItem(paneIndex);
        };
        SplitterWidget.prototype.updateLayoutPanesAfterAddingNewPane = function (properties, oldPaneSizes, widget, viewType) {
            if (this._isResponsive) {
                this.updataLayoutPanesAfterAddingNewPaneResponsive(properties, widget);
            }
            else {
                oldPaneSizes[oldPaneSizes.length - 1] = undefined;
                for (var i = 0; i < properties.length - 1; i++) {
                    var name_1 = "";
                    if (oldPaneSizes[i] != undefined) {
                        properties[i].paneSize = oldPaneSizes[i];
                        name_1 = this.layoutPanes[i].name;
                    }
                    if (name_1 === "") {
                        name_1 = widget.widgetName + "_" + viewType.toString();
                        name_1 = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(name_1);
                        name_1 = name_1.replace(/[&\/\\#,+( )$~%.'":*?<>{}]/g, '_');
                    }
                    var paneWidget = widget;
                    if (this.layoutPanes[i] != undefined) {
                        paneWidget = this.layoutPanes[i].widget;
                    }
                    this.layoutPanes[i] = new layoutPane_1.LayoutPane(name_1, properties[i].paneSize, paneWidget, false, true, properties[i].expandable, properties[i].collapsible, properties[i].minSize);
                }
            }
        };
        SplitterWidget.prototype.updataLayoutPanesAfterAddingNewPaneResponsive = function (properties, widget) {
            var _loop_1 = function (i) {
                var name_2 = "";
                var j = 0;
                this_1._widgets.forEach(function (value, key) {
                    if (j == i) {
                        name_2 = key;
                    }
                    j++;
                });
                var paneWidget = widget;
                if (this_1.layoutPanes[i] != undefined) {
                    paneWidget = this_1.layoutPanes[i].widget;
                }
                this_1.layoutPanes[i] = new layoutPane_1.LayoutPane(name_2, properties[i].paneSize, paneWidget, false, true, properties[i].expandable, properties[i].collapsible, properties[i].minSize);
            };
            var this_1 = this;
            for (var i = 0; i < properties.length; i++) {
                _loop_1(i);
            }
        };
        /**
         * Updates the properties with the informations from the layoutPane definitions;
         * Size of dynamic pane will be calculated by using the actual widget size
         *
         * @private
         * @param {*} properties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePropertiesInformationsWithLayoutPanesData = function (properties) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        properties[index].paneSize = layoutPane.size;
                    }
                    else {
                        var size = this._actualWidth;
                        if (this._orientation == ej.Orientation.Vertical) {
                            size = this._actualHeight;
                        }
                        properties[index].paneSize = size - this.sumOfDefinedLayoutPaneSizes();
                    }
                    properties[index].expandable = layoutPane.expandable;
                    properties[index].collapsible = layoutPane.collapsible;
                    properties[index].resizable = layoutPane.resizable;
                    properties[index].minSize = layoutPane.minimumSize;
                }
                index++;
            }
        };
        /**
         * resize the splitter and update the splitter panesizes
         *
         * @private
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeSplitter = function (width, height) {
            var splitter = this.getSplitter();
            splitter.option("width", width, true);
            splitter.option("height", height, true);
            var properties = this.getProperties(splitter);
            this.updatePaneProperties(properties, width, height);
            this.setPanePropertiesToSplitter(splitter, properties);
        };
        /**
         * Return true if splitter has enough size to insert all necessary charts.
         *
         * @private
         * @param {ej.Splitter} splitter
         * @returns {boolean}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.hasPaneMinSize = function (splitter) {
            var minHeight = 0;
            var sumOfPaneHeights = minHeight;
            if (splitter.model.properties && splitter.model.properties.length > 0) {
                //Min height of splitter => lastPaneSize + bar size (409) + minSize of all charts + the bar height between charts(9)
                minHeight = 409 + (splitter.model.properties.length - 1) * 9;
                sumOfPaneHeights = (splitter.model.properties.length - 1) * 9;
                splitter.model.properties.forEach(function (pane) {
                    minHeight += pane.minSize;
                    sumOfPaneHeights += pane.paneSize;
                });
            }
            if (sumOfPaneHeights >= minHeight) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Updates the panesize in the properties for the new height/width
         *
         * @private
         * @param {*} properties
         * @param {*} width
         * @param {*} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePaneProperties = function (properties, width, height) {
            // Set all know pane sizes
            this.setKnownPaneSizes(properties);
            // Set all dynamic pane sizes
            this.setDynamicPaneSizes(properties, width, height);
        };
        SplitterWidget.prototype.setKnownPaneSizes = function (properties) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        properties[index].paneSize = layoutPane.size;
                    }
                }
                index++;
            }
        };
        SplitterWidget.prototype.setDynamicPaneSizes = function (properties, width, height) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == true) {
                        if (this._orientation == ej.Orientation.Vertical) {
                            properties[index].paneSize = height - this.sumOfDefinedPaneSizes();
                        }
                        else {
                            properties[index].paneSize = width - this.sumOfDefinedPaneSizes();
                        }
                    }
                }
                index++;
            }
        };
        /**
         * Sets the given properties(panesizes, ...) to the ejsplitter
         * if the last panesize is under 1px a correction of the panesize will be done; occures sometimes in case of browser zoom
         *
         * @private
         * @param {ej.Splitter} splitter
         * @param {*} properties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.setPanePropertiesToSplitter = function (splitter, properties) {
            // round pane sizes
            properties.forEach(function (pane) {
                pane.paneSize = Math.floor(pane.paneSize);
            });
            this.setProperties(splitter, properties);
            var splitterPanes = splitter.panes;
            if (splitterPanes != undefined && splitterPanes.length > 0) {
                var lastPane = splitterPanes[splitterPanes.length - 1];
                if (lastPane != undefined) {
                    var lastPaneSizeString = lastPane.style.width;
                    if (this._orientation == ej.Orientation.Vertical) {
                        lastPaneSizeString = lastPane.style.height;
                    }
                    var lastPaneSize = parseFloat(lastPaneSizeString);
                    if (lastPaneSize <= 0.9999 && properties[properties.length - 1].paneSize > 0) {
                        // Size of last splitter pane was not set correct => to less space!
                        // if browser zoom is used the sizes will be defined with decimalplaces;
                        // the ejSplitter sets the size of the last pane to 0 if it is a little bit to tall (e.g. "0.1px") => pane will not be shown
                        // Set last pane a little bit smaller
                        properties[properties.length - 1].paneSize--;
                        this.setProperties(splitter, properties);
                    }
                }
            }
        };
        /**
         * Sets the splitter pane content sizes (widget sizes)
         *
         * @private
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeSplitterPaneContents = function (width, height) {
            // Set the sizes of the splitter panecontents
            var index = 0;
            for (var i = 0; i < this.layoutPanes.length; i++) {
                var widget = this._widgets.get(this.layoutPanes[i].name);
                if (widget != undefined) {
                    var widgetWidth = width;
                    var widgetHeight = height;
                    if (this._orientation == ej.Orientation.Vertical) {
                        if (this.layoutPanes[index].fillSpace == true) {
                            widgetHeight = height - this.sumOfDefinedPaneSizes();
                            if (widgetHeight < 0) { // No place for dynamic pane, maybe also other panes have to be adopted
                                this.adoptLayoutPanesToFitCurrentSize(height);
                                widgetHeight = 0;
                            }
                        }
                        else {
                            widgetHeight = this.layoutPanes[index].size;
                        }
                    }
                    else {
                        if (this.layoutPanes[index].fillSpace == true) {
                            widgetWidth = width - this.sumOfDefinedPaneSizes();
                            if (widgetWidth < 0) { // No place for dynamic pane, maybe also other panes have to be adopted
                                this.adoptLayoutPanesToFitCurrentSize(width);
                                widgetWidth = 0;
                            }
                        }
                        else {
                            widgetWidth = this.layoutPanes[index].size;
                        }
                    }
                    widget.resize(widgetWidth, widgetHeight);
                }
                index++;
            }
            //Persist data every time a splitter is resized
            this.saveSettings();
        };
        /**
         * Updates the layout panes
         *
         * @private
         * @param {*} splitbarIndex
         * @param {*} prevPaneSize
         * @param {*} nextPaneSize
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updateLayoutPanesOnSplitterResize = function (splitbarIndex, prevPaneSize, nextPaneSize) {
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            if (!this._isResponsive) {
                if (this.layoutPanes[splitbarIndex + 1] != undefined) {
                    properties[splitbarIndex + 1].paneSize = this.layoutPanes[splitbarIndex + 1].size;
                }
                this.setPanePropertiesToSplitter(splitter, properties);
                var oldSize = this.layoutPanes[splitbarIndex].size;
                this.layoutPanes[splitbarIndex].size = prevPaneSize;
                this._actualHeight += (prevPaneSize - oldSize);
                this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            }
            else {
                this.setPanePropertiesToSplitter(splitter, properties);
                for (var i = 0; i < properties.length; i++) {
                    this.layoutPanes[i].size = properties[i].paneSize;
                }
            }
        };
        /**
         * corrects the target index if source index is before target index
         *
         * @private
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updataTargetPaneIndex = function (sourcePaneIndex, targetPaneIndex) {
            if (sourcePaneIndex < targetPaneIndex) {
                // moved element is in list before target position and was removed before, so index must be decreased to get correct insert position
                targetPaneIndex--;
            }
            return targetPaneIndex;
        };
        /**
         * Returns the properties from the ejSplitter
         *
         * @private
         * @param {*} splitter
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getProperties = function (splitter) {
            return splitter.option("properties");
        };
        /**
         * Sets the properties of the ejSplitter
         *
         * @private
         * @param {ej.Splitter} splitter
         * @param {*} properties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.setProperties = function (splitter, properties) {
            splitter.option("properties", properties, true); // force the setting to resize the chart splitters
        };
        /**
         * Updates the properties => moves the property informations from source to target index
         *
         * @private
         * @param {*} properties
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePropertiesList = function (properties, sourcePaneIndex, targetPaneIndex) {
            var paneProperties = properties[sourcePaneIndex];
            properties.splice(sourcePaneIndex, 1);
            properties.splice(targetPaneIndex, 0, paneProperties);
        };
        /**
         * Updates the layout panes list after moving
         *
         * @private
         * @param {*} layoutPane
         * @param {*} sourcePaneIndex
         * @param {*} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updateLayoutPanesListAfterMoving = function (layoutPane, sourcePaneIndex, targetPaneIndex) {
            this.layoutPanes.splice(sourcePaneIndex, 1);
            this.layoutPanes.splice(targetPaneIndex, 0, layoutPane);
        };
        /**
         * Returns the pane index of the given widget
         *
         * @private
         * @param {*} widget
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneIndex = function (widget) {
            var paneIndex = -1;
            for (var i = 0; i < this.layoutPanes.length; i++) {
                if (this.layoutPanes[i].widget == widget) {
                    paneIndex = i;
                }
            }
            return paneIndex;
        };
        /**
         * Removes the widget from the widgets list of this layout widget
         *
         * @private
         * @param {*} widget
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removeWidgetFromList = function (widget) {
            var _this = this;
            this._widgets.forEach(function (widgetTemp, key) {
                if (widgetTemp == widget) {
                    _this._widgets.delete(key);
                }
            });
        };
        /**
         * Adjust charts div container => remove chart size
         *
         * @private
         * @param {*} sizeToRemove
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adjustChartsDivContainerSize = function (sizeToRemove) {
            this.mainDiv.style.height = (this.mainDiv.offsetHeight - sizeToRemove - 400 + this._defaultSplitterSize) + "px"; // Remove pane size + splitter size(9px)
        };
        /**
         *  Adjust ejSplitter size
         *
         * @private
         * @param {*} splitter
         * @param {*} sizeToRemove
         * @returns {number} Returns the new splitter size after removing
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adjustSplitterSize = function (splitter, sizeToRemove) {
            var actualSplitterHeight = splitter.option("height");
            var newSplitterHeight = parseInt(actualSplitterHeight, 10); // parseInt to remove "px"
            newSplitterHeight -= sizeToRemove + this._defaultSplitterSize; // Remove pane size + splitter size(9px)
            splitter.option("height", newSplitterHeight, true); // TODO: not only height, also width 
            return newSplitterHeight;
        };
        /**
         * Notifies that splitter has resized
         *
         * @private
         */
        SplitterWidget.prototype.onSplitterResize = function (args) {
            this.updateLayoutPanesOnSplitterResize(args.splitbarIndex, args.prevPane.size, args.nextPane.size);
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Returns a list with only the sizes of the panes
         *
         * @private
         * @param {*} properties
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneSizes = function (properties) {
            var paneSizes = new Array();
            properties.forEach(function (property) {
                paneSizes.push(property.paneSize);
            });
            return paneSizes;
        };
        return SplitterWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.SplitterWidget = SplitterWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXJXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWdCQTtRQUE2QixrQ0FBZ0I7UUFBN0M7WUFBQSxxRUEybENDO1lBemxDVyxrQkFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBRXpDLG1CQUFhLEdBQVksSUFBSSxDQUFDO1lBRTlCLDBCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFDLGlDQUFpQzs7UUFxbEMvRSxDQUFDO1FBbGxDRzs7Ozs7V0FLRztRQUNILG1DQUFVLEdBQVY7WUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztZQUV6QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFFL0IsaUJBQU0sVUFBVSxXQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsdUNBQWMsR0FBZCxVQUFlLFdBQW1CO1lBQzlCLElBQUcsV0FBVyxJQUFJLHVDQUFrQixDQUFDLG1CQUFtQixFQUFDO2dCQUNyRCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO2FBQy9DO2lCQUNJLElBQUcsV0FBVyxJQUFJLHVDQUFrQixDQUFDLHFCQUFxQixFQUFDO2dCQUM1RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO2FBQ2pEO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsdUNBQWMsR0FBZDtZQUNJLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBQztnQkFDNUMsT0FBTyx1Q0FB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LHFDQUFZLEdBQXBCLFVBQXFCLFVBQVU7WUFDM0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNwQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtnQkFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQUFDLEFBM2xDRCxDQUE2QixtQ0FBZ0IsR0EybEM1QztJQUVPLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGF5b3V0V2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vbGF5b3V0V2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBMYXlvdXRQYW5lIH0gZnJvbSBcIi4vbGF5b3V0UGFuZVwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBVbmlxdWVJZEdlbmVyYXRvciB9IGZyb20gXCIuLi9jb21tb24vdW5pcXVlSWRHZW5lcmF0b3JcIjtcclxuXHJcbmltcG9ydCB7IFNwbGl0dGVyUGFuZURlZmluaXRpb24gfSBmcm9tIFwiLi9zcGxpdHRlclBhbmVEZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuL3NwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUxheW91dFBhbmUgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2xheW91dFBhbmVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUGFuZVByb3BlcnRpZXMgfSBmcm9tIFwiLi4vY29tbW9uL3BhbmVQcm9wZXJ0aWVzXCI7XHJcbmltcG9ydCB7IElTcGxpdHRlcldpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvc3BsaXR0ZXJXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbmNsYXNzIFNwbGl0dGVyV2lkZ2V0IGV4dGVuZHMgTGF5b3V0V2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElTcGxpdHRlcldpZGdldHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfb3JpZW50YXRpb24gPSBlai5PcmllbnRhdGlvbi5Ib3Jpem9udGFsO1xyXG5cclxuICAgIHByaXZhdGUgX2lzUmVzcG9uc2l2ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFNwbGl0dGVyU2l6ZTogbnVtYmVyID0gOTsgLy8gVE9ETyBnZXQgYWN0dWFsIHNwbGl0dGVyIHNpemUgXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgc3BsaXR0ZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtoZWFkZXJIZWlnaHQ9MF1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gMTAwMDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSA0MDA7XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgIFxyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBzcGxpdHRlcnMgaW4gdGhlIHdpZGdldCAodmVydGljYWwgb3IgaG9yaXpvbnRhbClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZW50YXRpb25cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbjogc3RyaW5nKXtcclxuICAgICAgICBpZihvcmllbnRhdGlvbiA9PSBTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25WZXJ0aWNhbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gZWouT3JpZW50YXRpb24uVmVydGljYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYob3JpZW50YXRpb24gPT0gU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uSG9yaXpvbnRhbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gZWouT3JpZW50YXRpb24uSG9yaXpvbnRhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgc3BsaXR0ZXJzIGluIHRoZSB3aWRnZXQgKHZlcnRpY2FsIG9yIGhvcml6b250YWwpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXRPcmllbnRhdGlvbigpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICByZXR1cm4gU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uVmVydGljYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uSG9yaXpvbnRhbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25Ib3Jpem9udGFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXNwb25zaXZlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUmVzcG9uc2l2ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSZXNwb25zaXZlKGlzUmVzcG9uc2l2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5faXNSZXNwb25zaXZlID0gaXNSZXNwb25zaXZlO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IDQwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHNwbGl0dGVyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqU3BsaXR0ZXIoe1xyXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBlai5PcmllbnRhdGlvbi5Ib3Jpem9udGFsLCAvLyBJbml0aWFsIG9ubHkgSG9yaXpvbnRhbCBpcyB3b3JraW5nID0+IGxhdGVyIHN3aXRjaCB0byB2ZXJ0aWNhbCBpbiByZWNhbGN1bGF0ZSBsYXlvdXQgaXMgcG9zc2libGVcclxuICAgICAgICAgICAgYWxsb3dLZXlib2FyZE5hdmlnYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyBTZXQgYSBkZWZhdWx0IHNpemUgPT4gTmVlZGVkIGZvciBpbmFjdGl2ZSBzcGxpdHRlciB3aW5kb3dzIHRvIGF2b2lkIEFkZEl0ZW0gcHJvYmxlbXNcclxuICAgICAgICAgICAgd2lkdGg6IFwiNDAwcHhcIixcclxuICAgICAgICAgICAgaGVpZ2h0OiBcIjQwMHB4XCIsXHJcbiAgICAgICAgICAgIHJlc2l6ZTogKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TcGxpdHRlclJlc2l6ZShhcmdzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLnBhZGRpbmcgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhY3R1YWwgbGF5b3V0IHBhbmVzIGRlZmluaXRpb25zIHRvIHRoZSBlanNwbGl0dGVyXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZWNhbGN1bGF0ZUxheW91dCgpe1xyXG4gICAgICAgIHZhciBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICAvLyBTZXQgb3JpZW50YXRpb24gYmVmb3JlIGdldCBwcm9wZXJ0aWVzIHRvIHRoZSBjb3JyZWN0IHBhbmVTaXplcyhoZWlnaHQvd2lkdGgpXHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwib3JpZW50YXRpb25cIiwgdGhpcy5fb3JpZW50YXRpb24pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMubGF5b3V0UGFuZXMpO1xyXG4gICAgICAgIGlmKHByb3BlcnRpZXMubGVuZ3RoICE9IGtleXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKFwicHJvcGVydGllcy5sZW5ndGggIT0gdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGhcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVByb3BlcnRpZXNJbmZvcm1hdGlvbnNXaXRoTGF5b3V0UGFuZXNEYXRhKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIHRoaXMuc2V0UGFuZVByb3BlcnRpZXNUb1NwbGl0dGVyKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5faXNSZXNwb25zaXZlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIGRlZmF1bHQgZmlyc3QgcGFuZSwgd2hpY2ggd2lsbCBiZSBuZWVkZWQgZm9yIGRyYWcmZHJvcCBvZiBuZXcgd2lkZ2V0cyB0byB0aGUgc3BsaXR0ZXIgd2lkZ2V0XHJcbiAgICAgICAgICAgIGxldCBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICAgICAgbGV0IG5ld0l0ZW0gPSBzcGxpdHRlci5hZGRJdGVtKFwiPGRpdiBpZD0nXCIgKyB0aGlzLmdldExhc3RQYW5lSWQoKSArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuOyB3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJSc+PC9kaXY+XCIsIHsgcGFuZVNpemU6IDQwMCwgZXhwYW5kYWJsZTogZmFsc2UsIGNvbGxhcHNpYmxlOiBmYWxzZX0sIDApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXNpemVzIHRoZSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHsgICBcclxuICAgICAgICBpZih0aGlzLl9pc1Jlc3BvbnNpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcblxyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHModGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIHNwbGl0dGVyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgLy8gVE9ETzogZ2V0IGRpdiBmcm9tIF9sYXlvdXRDb250YWluZXJJZFxyXG4gICAgICAgIC8vc3VwZXIuYWRkU3R5bGVUb0NvbnRlbnRJZChcIiNcIiArIHRoaXMuX2xheW91dENvbnRhaW5lcklkLCBcIndpZGdldHMvc3BsaXR0ZXJXaWRnZXQvc3R5bGUvY3NzL3NwbGl0dGVyU3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIC8vc3VwZXIuYWRkU3R5bGVUb0NvbnRlbnRJZChcIiNcIiArIHRoaXMuX2xheW91dENvbnRhaW5lcklkLCBcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy93aWRnZXRIZWFkZXJGb290ZXJTdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZXMgYWxsIHRoZSB3aWRnZXQgaW4gdGhlIGRpZmZlcmVudCBzcGxpdHRlciBwYW5lc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlYWN0aXZhdGVzIGFsbCB0aGUgd2lkZ2V0IGluIHRoZSBkaWZmZXJlbnQgc3BsaXR0ZXIgcGFuZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmRlYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldCkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFNwbGl0dGVyRGVmaW5pdGlvbi5zcGxpdHRlckRlZmluaXRpb25JZCwgdGhpcy5nZXRTcGxpdHRlckRlZmluaXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENvbXBvbmVudFNldHRpbmdzKGRhdGE6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcbiAgICAgICAgaWYgKGRhdGEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNwbGl0dGVyRGVmaW5pdGlvbiA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoU3BsaXR0ZXJEZWZpbml0aW9uLnNwbGl0dGVyRGVmaW5pdGlvbklkKTtcclxuICAgICAgICAgICAgaWYoc3BsaXR0ZXJEZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNwbGl0dGVyRGVmaW5pdGlvbihzcGxpdHRlckRlZmluaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U3BsaXR0ZXJEZWZpbml0aW9uKCk6IFNwbGl0dGVyRGVmaW5pdGlvbntcclxuICAgICAgICBsZXQgc3BsaXR0ZXJEZWZpbml0aW9uID0gbmV3IFNwbGl0dGVyRGVmaW5pdGlvbih0aGlzLmdldE9yaWVudGF0aW9uKCksIHRoaXMuZ2V0UmVzcG9uc2l2ZSgpKTtcclxuICAgICAgICBzcGxpdHRlckRlZmluaXRpb24ucGFuZURlZmluaXRpb25zID0gdGhpcy5nZXRTcGxpdHRlclBhbmVEZWZpbml0aW9ucygpO1xyXG4gICAgICAgIHJldHVybiBzcGxpdHRlckRlZmluaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTcGxpdHRlckRlZmluaXRpb24oc3BsaXR0ZXJEZWZpbml0aW9uOiBTcGxpdHRlckRlZmluaXRpb24pe1xyXG4gICAgICAgIGxldCBzcGxpdHRlck9yaWVudGF0aW9uID0gc3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uO1xyXG4gICAgICAgIGxldCBzcGxpdHRlclJlc3BvbnNpdmUgPSBzcGxpdHRlckRlZmluaXRpb24ucmVzcG9uc2l2ZTtcclxuICAgICAgICBsZXQgcGFuZURlZmluaXRpb25zID0gc3BsaXR0ZXJEZWZpbml0aW9uLnBhbmVEZWZpbml0aW9ucztcclxuICAgICAgICBcclxuICAgICAgICBpZihwYW5lRGVmaW5pdGlvbnMgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTZXQgc3BsaXR0ZXIgcGFuZXNcclxuICAgICAgICB0aGlzLnNldFNwbGl0dGVyUGFuZURlZmluaXRpb25zKHBhbmVEZWZpbml0aW9ucyk7XHJcbiBcclxuICAgICAgICAvLyBTZXQgb3JpZW50YXRpb24gb2Ygc3BsaXR0ZXIgcGFuZXNcclxuICAgICAgICB0aGlzLnNldE9yaWVudGF0aW9uKHNwbGl0dGVyT3JpZW50YXRpb24pO1xyXG5cclxuICAgICAgICAvLyBTZXQgcmVzcG9uc2l2ZSBvZiBzcGxpdHRlclxyXG4gICAgICAgIHRoaXMuc2V0UmVzcG9uc2l2ZShzcGxpdHRlclJlc3BvbnNpdmUpO1xyXG5cclxuICAgICAgICB0aGlzLnJlY2FsY3VsYXRlTGF5b3V0KCk7ICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBnZXRTcGxpdHRlclBhbmVEZWZpbml0aW9ucygpOiBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPntcclxuICAgICAgICBsZXQgcGFuZURlZmluaXRpb25zID0gbmV3IEFycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+KCk7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnREZWZpbml0aW9uID0gbmV3IENvbXBvbmVudERlZmluaXRpb24oXCJcIixcIlwiLFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50RGVmaW5pdGlvbi5zZXQod2lkZ2V0LmNvbXBvbmVudC5nZXREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhbmVTZXR0aW5nczogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gdGhpcy5nZXRMYXlvdXRQYW5lKGtleSk7XHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXRQYW5lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZVNldHRpbmdzID0gbGF5b3V0UGFuZS5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTGF5b3V0UGFuZSBub3QgZGVmaW5lZCFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYW5lRGVmaW5pdGlvbnMucHVzaChuZXcgU3BsaXR0ZXJQYW5lRGVmaW5pdGlvbihjb21wb25lbnREZWZpbml0aW9uLCBwYW5lU2V0dGluZ3MpKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcGFuZURlZmluaXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TGF5b3V0UGFuZShrZXk6IHN0cmluZyk6IElMYXlvdXRQYW5le1xyXG4gICAgICAgIGxldCBsYXlvdXRQYW5lO1xyXG4gICAgICAgIGxheW91dFBhbmUgPSB0aGlzLmxheW91dFBhbmVzLmZpbHRlcihlbGVtZW50ID0+IHsgcmV0dXJuIGVsZW1lbnQubmFtZSA9PSBrZXl9KVxyXG4gICAgICAgIHJldHVybiBsYXlvdXRQYW5lWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbnMocGFuZURlZmluaXRpb25zOiBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPil7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHNwbGl0dGVyIHBhbmVzIGFuZCBhZGQgd2lkZ2V0c1xyXG4gICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgcGFuZURlZmluaXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHBhbmVEZWZpbml0aW9uc1tpXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudERlZmluaXRpb24gPSBwYW5lRGVmaW5pdGlvbnNbaV0uY29tcG9uZW50RGVmaW5pdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEZhY3RvcnkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQuYWRkU3ViQ29tcG9uZW50KGNvbXBvbmVudERlZmluaXRpb24udHlwZSwgY29tcG9uZW50RGVmaW5pdGlvbi5pZCwgY29tcG9uZW50RGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQsIHRoaXMuY29tcG9uZW50LmNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbXBvbmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpbnN0YW5jZSBpcyBhIHdpZGdldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjb21wb25lbnQgaW5zdGFuY2VvZiBXaWRnZXRCYXNlKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0ID0gY29tcG9uZW50ICBhcyBJV2lkZ2V0OyAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BsaXR0ZXJTdG9yaW5nRGF0YUlkID0gY29tcG9uZW50RGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzcGxpdHRlclN0b3JpbmdEYXRhSWQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnNldERlZmF1bHRDb21wb25lbnRTZXR0aW5nc0RhdGFJZChzcGxpdHRlclN0b3JpbmdEYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkV2lkZ2V0KHdpZGdldCwgY29tcG9uZW50RGVmaW5pdGlvbi5pZCwgVmlld1R5cGUuRGVmYXVsdCwgbmV3IFBhbmVQcm9wZXJ0aWVzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvbXBvbmVudERlZmluaXRpb24udHlwZSAhPSBcIkNoYXJ0QmFzZVwiKXsgLy8gXCJDaGFydEJhc2VcIiBjdXJyZW50bHkgbm90IGltcGxlbWVudGVkID0+IFRPRE86IGNyZWF0ZSBjaGFydHMgd2l0aCBjb21wb25lbnRmYWN0b3J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDb21wb25lbnQgd2l0aCBjb21wb25lbnQgdHlwZSAnXCIgKyBjb21wb25lbnREZWZpbml0aW9uLnR5cGUgKyBcIicgY291bGQgbm90IGJlIGNyZWF0ZWQhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50RmFjdG9yeSBub3QgYXZhaWxhYmxlIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0IHNwbGl0dGVyIHBhbmUgc2l6ZXNcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKHBhbmVEZWZpbml0aW9uc1tpXS5wYW5lRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGF5b3V0UGFuZS5zZXRTZXR0aW5ncyhwYW5lRGVmaW5pdGlvbnNbaV0ucGFuZURhdGEpOyAvLyBUT0RPOiBwYW5lRGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgcGFuZSBkZWZpbml0aW9ucyBmcm9tIGNoYXJ0U3BsaXR0ZXIgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+fVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDaGFydFZpZXdTcGxpdHRlclBhbmVEZWZpbml0aW9ucygpOiBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPntcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGxldCBwYW5lRGVmaW5pdGlvbnMgPSBuZXcgQXJyYXk8U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbj4oKTtcclxuICAgICAgICBpZiAoc2V0dGluZ3MuZGF0YSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmRhdGEuc3BsaXR0ZXJEZWZpbml0aW9uICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcGFuZURlZmluaXRpb25zID0gc2V0dGluZ3MuZGF0YS5zcGxpdHRlckRlZmluaXRpb24ucGFuZURlZmluaXRpb25zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFuZURlZmluaXRpb25zO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSB3aWRnZXQgdG8gdGhlIHNwbGl0dGVyID0+IGEgbmV3IHBhbmUgd2lsbCBiZSBhZGRlZCBmb3IgdGhlIHdpZGdldCB0byB0aGUgc3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcGFyYW0ge1BhbmVQcm9wZXJ0aWVzfSBwYW5lUHJvcGVydGllc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIG5hbWU6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlLCBwYW5lUHJvcGVydGllczogUGFuZVByb3BlcnRpZXMpeyBcclxuICAgICAgICBzdXBlci5hZGRXaWRnZXQod2lkZ2V0LCBuYW1lLCB2aWV3VHlwZSk7XHJcblxyXG4gICAgICAgIGxldCBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7IFxyXG4gICAgICAgIGxldCBvbGRQYW5lU2l6ZXMgPSB0aGlzLmdldFBhbmVTaXplcyhwcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSAmJiBwYW5lUHJvcGVydGllcy5wYW5lU2l6ZSAhPSAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCArPSBwYW5lUHJvcGVydGllcy5wYW5lU2l6ZSArIHRoaXMuX2RlZmF1bHRTcGxpdHRlclNpemU7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCAtIHRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFuZUlkID0gdGhpcy5nZXRQYW5lRGl2SWQobmFtZSk7XHJcbiAgICAgICAgdmFyIGluZGV4T2ZOZXdQYW5lID0gc3BsaXR0ZXIubW9kZWwucHJvcGVydGllcyEubGVuZ3RoO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFBhbmUoc3BsaXR0ZXIsIHBhbmVJZCwgaW5kZXhPZk5ld1BhbmUsIHBhbmVQcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgd2lkZ2V0LmluaXRpYWxpemUoKTtcclxuICAgICAgICAvLyBhZGQgd2lkZ2V0IHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXHJcbiAgICAgICAgd2lkZ2V0LmFkZFRvUGFyZW50Q29udGFpbmVySWQocGFuZUlkKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVMYXlvdXRQYW5lc0FmdGVyQWRkaW5nTmV3UGFuZShwcm9wZXJ0aWVzLCBvbGRQYW5lU2l6ZXMsIHdpZGdldCwgdmlld1R5cGUpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5faXNSZXNwb25zaXZlKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYW5lUHJvcGVydGllc1RvU3BsaXR0ZXIoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGRzIHRoaXMgd2lkZ2V0IHRvIHRoZSBnaXZlbiBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQpfSBwYXJlbnRDb250YWluZXJcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRUb1BhcmVudENvbnRhaW5lcihwYXJlbnRDb250YWluZXI6IEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZCl7XHJcbiAgICAgICAgLy8gQWRkcyBzb21lIGFkZGl0aW9uYWwgbmVlZGVkIHN0eWxlcyBmb3IgdGhpcyBzcGxpdHRlciB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuYWRkU3R5bGVUb0NvbnRlbnRJZChwYXJlbnRDb250YWluZXIsIFwid2lkZ2V0cy9zcGxpdHRlcldpZGdldC9zdHlsZS9jc3Mvc3BsaXR0ZXJTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgdGhpcy5hZGRTdHlsZVRvQ29udGVudElkKHBhcmVudENvbnRhaW5lciwgXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3Mvd2lkZ2V0SGVhZGVyRm9vdGVyU3R5bGUuY3NzXCIpO1xyXG5cclxuICAgICAgICBzdXBlci5hZGRUb1BhcmVudENvbnRhaW5lcihwYXJlbnRDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhIHdpZGdldChwYW5lKSBmcm9tIHRoZSBzcGxpdHRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlV2lkZ2V0KHdpZGdldDogSVdpZGdldCl7XHJcbiAgICAgICAgbGV0IHBhbmVJbmRleCA9IHRoaXMuZ2V0UGFuZUluZGV4KHdpZGdldCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgIC8vIGdldCBhbGwgYWN0dWFsIHBhbmVTaXplcyBcclxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7ICBcclxuICAgICAgICB2YXIgc2l6ZVRvUmVtb3ZlID0gcHJvcGVydGllc1twYW5lSW5kZXhdLnBhbmVTaXplO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBwYW5lU2l6ZXMgPSB0aGlzLmdldFBhbmVTaXplcyhwcm9wZXJ0aWVzKTtcclxuICAgICAgICBwYW5lU2l6ZXMuc3BsaWNlKHBhbmVJbmRleCwgMSk7XHJcbiAgICAgICAgc3BsaXR0ZXIucmVtb3ZlSXRlbShwYW5lSW5kZXgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRqdXN0Q2hhcnRzRGl2Q29udGFpbmVyU2l6ZShzaXplVG9SZW1vdmUpO1xyXG4gICAgICAgIGxldCBuZXdTcGxpdHRlckhlaWdodCA9IHRoaXMuYWRqdXN0U3BsaXR0ZXJTaXplKHNwbGl0dGVyLCBzaXplVG9SZW1vdmUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgcHJvcGVydGllc1tpXS5wYW5lU2l6ZSA9IHBhbmVTaXplc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lcy5zcGxpY2UocGFuZUluZGV4LDEpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlV2lkZ2V0RnJvbUxpc3Qod2lkZ2V0KTtcclxuIFxyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IG5ld1NwbGl0dGVySGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLnNldFBhbmVQcm9wZXJ0aWVzVG9TcGxpdHRlcihzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogTW92ZXMgYSB3aWRnZXQoc3BsaXR0ZXIgcGFuZSkgZnJvbSB0aGUgc291cmNlIGluZGV4IHRvIHRoZSB0YXJnZXQgaW5kZXhcclxuICAgICAqIChpbnRlcm5hbDogdGFyZ2V0IGluZGV4IHdpbGwgYmUgZGVjcmVhc2VkIGJ5IDEgaWYgc291cmNlIGluZGV4IGlzIGJlZm9yZSB0YXJnZXQgaW5kZXgpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIG1vdmVXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0LCB0YXJnZXRQYW5lSW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgLy8gYWRkcyB0aGUgd2lkZ2V0IGRpdnMgdG8gdGhlIGRvY3VtZW50cyB0ZW1wXHJcbiAgICAgICAgd2lkZ2V0LmFkZFRvRG9jdW1lbnRzVGVtcCgpO1xyXG5cclxuICAgICAgICBsZXQgc291cmNlUGFuZUluZGV4ID0gdGhpcy5nZXRQYW5lSW5kZXgod2lkZ2V0KTtcclxuICAgICAgICBsZXQgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxheW91dFBhbmUgPSB0aGlzLmxheW91dFBhbmVzW3NvdXJjZVBhbmVJbmRleF07XHJcbiAgICAgICAgdGFyZ2V0UGFuZUluZGV4ID0gdGhpcy51cGRhdGFUYXJnZXRQYW5lSW5kZXgoc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBvcmlnaW5hbFBhbmVQcm9wZXJpZXMgPSB0aGlzLmdldFBhbmVQcm9wZXJ0aWVzKGxheW91dFBhbmUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVByb3BlcnRpZXNMaXN0KHByb3BlcnRpZXMsIHNvdXJjZVBhbmVJbmRleCwgdGFyZ2V0UGFuZUluZGV4KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVtb3ZlUGFuZShzcGxpdHRlciwgc291cmNlUGFuZUluZGV4KTtcclxuXHJcbiAgICAgICAgbGV0IHBhbmVJZCA9IHRoaXMuZ2V0UGFuZURpdklkKHdpZGdldC53aWRnZXROYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZFBhbmUoc3BsaXR0ZXIsIHBhbmVJZCwgdGFyZ2V0UGFuZUluZGV4LCBvcmlnaW5hbFBhbmVQcm9wZXJpZXMpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUxheW91dFBhbmVzTGlzdEFmdGVyTW92aW5nKGxheW91dFBhbmUsIHNvdXJjZVBhbmVJbmRleCwgdGFyZ2V0UGFuZUluZGV4KTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlcih0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gYWRkcyB0aGUgd2lkZ2V0IGRpdnMgdG8gdGhlIG5ldyBhZGRlZCBzcGxpdHRlciBwYW5lXHJcbiAgICAgICAgd2lkZ2V0LmFkZFRvUGFyZW50Q29udGFpbmVySWQocGFuZUlkKTtcclxuICAgICAgICB3aWRnZXQuZmxhZ2dlZEZvclJlc2l6ZSA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlclBhbmVDb250ZW50cyh0aGlzLl9hY3R1YWxXaWR0aCx0aGlzLl9hY3R1YWxIZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBhbmVQcm9wZXJ0aWVzIG9mIHRoZSBnaXZlbiBsYXlvdXRQYW5lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SUxheW91dFBhbmV9IGxheW91dFBhbmVcclxuICAgICAqIEByZXR1cm5zIHtQYW5lUHJvcGVydGllc31cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhbmVQcm9wZXJ0aWVzKGxheW91dFBhbmU6IElMYXlvdXRQYW5lKTogUGFuZVByb3BlcnRpZXN7XHJcbiAgICAgICAgbGV0IHBhbmVQcm9wZXJ0aWVzID0gbmV3IFBhbmVQcm9wZXJ0aWVzKCk7XHJcbiAgICAgICAgcGFuZVByb3BlcnRpZXMuY29sbGFwc2libGUgPSBsYXlvdXRQYW5lLmNvbGxhcHNpYmxlO1xyXG4gICAgICAgIHBhbmVQcm9wZXJ0aWVzLmV4cGFuZGFibGUgPSBsYXlvdXRQYW5lLmV4cGFuZGFibGU7XHJcbiAgICAgICAgcGFuZVByb3BlcnRpZXMubWluU2l6ZSA9IGxheW91dFBhbmUubWluaW11bVNpemU7XHJcbiAgICAgICAgcGFuZVByb3BlcnRpZXMucmVzaXphYmxlID0gbGF5b3V0UGFuZS5yZXNpemFibGU7XHJcbiAgICAgICAgcmV0dXJuIHBhbmVQcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplIGEgd2lkZ2V0IHRvIGEgbmV3IHNpemUgYW5kIGFkYXB0IHRoZSBvdGhlciB3aWRnZXRzIGluIHRoaXMgbGF5b3V0V2lkZ2V0KHNwbGl0dGVyKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3U2l6ZVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZVdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIG5ld1NpemU6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHBhbmVJbmRleCA9IHRoaXMuZ2V0UGFuZUluZGV4KHdpZGdldCk7XHJcbiAgICAgICAgdmFyIHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG5cclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcikgXHJcbiAgICAgICAgLy8gc2V0IG5ldyBwYW5lIHNpemVzXHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYW5lU2l6ZSA9IHByb3BlcnRpZXNbcGFuZUluZGV4XS5wYW5lU2l6ZTtcclxuICAgICAgICBsZXQgcGFuZURpZmZTaXplID0gY3VycmVudFBhbmVTaXplLW5ld1NpemU7XHJcblxyXG4gICAgICAgIGxldCBzaXplT2ZPdGhlclBhbmUgPSAtMTtcclxuICAgICAgICBsZXQgaW5kZXhPZk90aGVyUGFuZSA9IC0xO1xyXG4gICAgICAgIGlmKHBhbmVJbmRleCArMSA+PSB0aGlzLmxheW91dFBhbmVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIC8vIExhc3QgcGFuZSBzaXplIGNoYW5nZWQgPT4gdXBkYXRlIHRoZSBzaXplIG9mIHRoZSBwYW5lIGJlZm9yZVxyXG4gICAgICAgICAgICBzaXplT2ZPdGhlclBhbmUgPSBwcm9wZXJ0aWVzW3BhbmVJbmRleC0xXS5wYW5lU2l6ZStwYW5lRGlmZlNpemU7XHJcbiAgICAgICAgICAgIGluZGV4T2ZPdGhlclBhbmUgPSBwYW5lSW5kZXgtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBmb2xsb3dpbmcgcGFuZSBzaXplXHJcbiAgICAgICAgICAgIHNpemVPZk90aGVyUGFuZSA9IHByb3BlcnRpZXNbcGFuZUluZGV4KzFdLnBhbmVTaXplK3BhbmVEaWZmU2l6ZTtcclxuICAgICAgICAgICAgaW5kZXhPZk90aGVyUGFuZSA9IHBhbmVJbmRleCsxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzaXplT2ZPdGhlclBhbmUgPCAwKXtcclxuICAgICAgICAgICAgLy8gQXZvaWQgcmVzaXppbmcgdGhlIGZvbGxvd2luZyBwYW5lKG9yIHRoZSBwYW5lIGJlZm9yZSkgdG8gYSBzaXplIHNtYWxsZXIgdGhlbiAwXHJcbiAgICAgICAgICAgIGxldCBvbGRWYWx1ZSA9IE1hdGguYWJzKHNpemVPZk90aGVyUGFuZSk7XHJcbiAgICAgICAgICAgIHNpemVPZk90aGVyUGFuZSA9IDUwOyAgIFxyXG4gICAgICAgICAgICBuZXdTaXplID0gbmV3U2l6ZSAtIG9sZFZhbHVlIC0gNTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXNbaW5kZXhPZk90aGVyUGFuZV0uc2l6ZSA9IHNpemVPZk90aGVyUGFuZTtcclxuICAgICAgICBwcm9wZXJ0aWVzW2luZGV4T2ZPdGhlclBhbmVdLnBhbmVTaXplID0gc2l6ZU9mT3RoZXJQYW5lO1xyXG5cclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzW3BhbmVJbmRleF0uc2l6ZSA9IG5ld1NpemU7XHJcbiAgICAgICAgcHJvcGVydGllc1twYW5lSW5kZXhdLnBhbmVTaXplID0gbmV3U2l6ZTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBVcGRhdGVzIHRoZSBzcGxpdHRlcnNcclxuICAgICAgICB0aGlzLnNldFBhbmVQcm9wZXJ0aWVzVG9TcGxpdHRlcihzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZXMgdGhlIGNvbnRlbnRzIGluIHRoZSBzcGxpdHRlcnNcclxuICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZWpTcGxpdHRlciBkYXRhIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U3BsaXR0ZXIoKTogZWouU3BsaXR0ZXJ7XHJcbiAgICAgICAgcmV0dXJuICQodGhpcy5tYWluRGl2KS5kYXRhKFwiZWpTcGxpdHRlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNpemVzIG9mIGFsbCBwYW5lcyB0b2dldGhlciwgaW5jbC4gdGhlIGR5bmFtaWMgcGFuZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3VtT2ZEZWZpbmVkTGF5b3V0UGFuZVNpemVzKCk6IG51bWJlcntcclxuICAgICAgICBsZXQgc3VtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzdW0gKz0gbGF5b3V0UGFuZS5zaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzaXplcyBvZiBhbGwgcGFuZXMgdG9nZXRoZXIsIHdpdGhvdXQgdGhlIHNpemUgb2YgdGhlIGR5bmFtaWMgcGFuZSBidXQgaW5jbHVkaW5nIHRoZSBzcGxpdHRlciBzaXplKGUuZy4gOXB4KVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk6IG51bWJlcntcclxuICAgICAgICBsZXQgc3VtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5sYXlvdXRQYW5lcykge1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9ICB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKGxheW91dFBhbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXRQYW5lLmZpbGxTcGFjZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGxheW91dFBhbmUuc2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGluZGV4PjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcGxpdHRlclNpemUgPSB0aGlzLl9kZWZhdWx0U3BsaXR0ZXJTaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBzcGxpdHRlclNpemU7IC8vIEFkZCBzaXplIG9mIHNwbGl0dGVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGlmIHRoZSBwYW5lIHNpemVzIGFyZSB0b28gYmlnIGZvciB0aGUgY3VycmVudCB3aW5kb3cgc2l6ZSwgdGhlIHBhbmVzIHdvdWxkIGJlIGRlY3JlYXNlZCBpbiBzaXplXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZG9wdExheW91dFBhbmVzVG9GaXRDdXJyZW50U2l6ZShzaXplOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBzdW1PZlBhbmVzV2l0b3V0RHluYW1pYyA9IHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7XHJcbiAgICAgICAgbGV0IG5lZWRlZFNpemUgPSBzdW1PZlBhbmVzV2l0b3V0RHluYW1pYyAtIHNpemU7XHJcbiAgICAgICAgaWYobmVlZGVkU2l6ZSA+IDApe1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBnZXQgbGFzdCBub3QgZHluYW1pYyBwYW5lXHJcbiAgICAgICAgICAgIGxldCBsYXN0UGFuZSA9IHRoaXMubGF5b3V0UGFuZXNbdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgIGxhc3RQYW5lLnNpemUgPSBsYXN0UGFuZS5zaXplLSBuZWVkZWRTaXplO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBwYW5lIGF0IHRoZSBnaXZlbiBpbmRleCB3aXRoIHRoZSBnaXZlbiBzaXplIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2VqLlNwbGl0dGVyfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhbmVJZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4T2ZOZXdQYW5lXHJcbiAgICAgKiBAcGFyYW0ge1BhbmVQcm9wZXJ0aWVzfSBwYW5lUHJvcGVydGllc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkUGFuZShzcGxpdHRlcjogZWouU3BsaXR0ZXIsIHBhbmVJZDogc3RyaW5nLCBpbmRleE9mTmV3UGFuZTogbnVtYmVyLCBwYW5lUHJvcGVydGllczogUGFuZVByb3BlcnRpZXMpe1xyXG4gICAgICAgIGxldCBuZXdJdGVtO1xyXG4gICAgICAgIGlmKCF0aGlzLl9pc1Jlc3BvbnNpdmUgJiYgcGFuZVByb3BlcnRpZXMucGFuZVNpemUgIT0gLTEpe1xyXG4gICAgICAgICAgICBpZihpbmRleE9mTmV3UGFuZSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGluZGV4T2ZOZXdQYW5lKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3SXRlbT0gc3BsaXR0ZXIucmVtb3ZlSXRlbShpbmRleE9mTmV3UGFuZS0xKTtcclxuXHJcbiAgICAgICAgICAgIG5ld0l0ZW09IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHBhbmVJZCArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuOyB3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJScnPjwvZGl2PlwiLCB7IHBhbmVTaXplOiBwYW5lUHJvcGVydGllcy5wYW5lU2l6ZSwgZXhwYW5kYWJsZTogcGFuZVByb3BlcnRpZXMuZXhwYW5kYWJsZSwgY29sbGFwc2libGU6IHBhbmVQcm9wZXJ0aWVzLmNvbGxhcHNpYmxlLCBtaW5TaXplOiBwYW5lUHJvcGVydGllcy5taW5TaXplfSwgaW5kZXhPZk5ld1BhbmUtMSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL0NoZWNrIHNwbGl0dGVyIHNpemU6IEluY3JlYXNlIGhlaWdodCBvZiBzcGxpdHRlciBpZiBpdCBpcyBub3QgYmlnIGVub3VnaCB0byBpbnNlcnQgYSBuZXcgY2hhcnRcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc1BhbmVNaW5TaXplKHNwbGl0dGVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlcih0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0ICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5ld0l0ZW09IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHRoaXMuZ2V0TGFzdFBhbmVJZCgpICsgXCInIHN0eWxlPSdvdmVyZmxvdzpoaWRkZW47IHdpZHRoOjEwMCU7IGhlaWdodDoxMDAlJz48L2Rpdj5cIiwgeyBwYW5lU2l6ZTogNDAwLCBleHBhbmRhYmxlOiBmYWxzZSwgY29sbGFwc2libGU6IGZhbHNlfSwgaW5kZXhPZk5ld1BhbmUpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbmV3SXRlbSA9IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHBhbmVJZCArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuOyB3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJScnPjwvZGl2PlwiLCB7IHBhbmVTaXplOiBwYW5lUHJvcGVydGllcy5wYW5lU2l6ZSwgZXhwYW5kYWJsZTogcGFuZVByb3BlcnRpZXMuZXhwYW5kYWJsZSwgY29sbGFwc2libGU6IHBhbmVQcm9wZXJ0aWVzLmNvbGxhcHNpYmxlLCBtaW5TaXplOiBwYW5lUHJvcGVydGllcy5taW5TaXplfSwgaW5kZXhPZk5ld1BhbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobmV3SXRlbS50b1N0cmluZygpID09IFwiXCIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRVJST1I6IHNwbGl0dGVyLmFkZEl0ZW1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIG5ld0l0ZW1bMF0uc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpdiBpZCBvZiB0aGUgbGFzdCBwYW5lXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TGFzdFBhbmVJZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkRpdklkICsgXCJfbGFzdFBhbmVcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpdiBpZCBvZiBhIHBhbmUgZm9yIHRoZSBnaXZlbiB3aWRnZXRuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UGFuZURpdklkKG5hbWU6IHN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1haW5EaXZJZCArIFwicGFuZV9cIiArIG5hbWUucmVwbGFjZShcIiBcIiwgXCJcIik7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqICBSZW1vdmVzIHRoZSBwYW5lIHdpdGggdGhlIGdpdmVuIGluZGV4IGZyb20gdGhlIHNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwYW5lSW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZVBhbmUoc3BsaXR0ZXIsIHBhbmVJbmRleDogbnVtYmVyKXtcclxuICAgICAgICBzcGxpdHRlci5yZW1vdmVJdGVtKHBhbmVJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVMYXlvdXRQYW5lc0FmdGVyQWRkaW5nTmV3UGFuZShwcm9wZXJ0aWVzLCBvbGRQYW5lU2l6ZXMsIHdpZGdldDogSVdpZGdldCwgdmlld1R5cGUpe1xyXG4gICAgICAgIGlmKHRoaXMuX2lzUmVzcG9uc2l2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRhTGF5b3V0UGFuZXNBZnRlckFkZGluZ05ld1BhbmVSZXNwb25zaXZlKHByb3BlcnRpZXMsIHdpZGdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7ICBcclxuICAgICAgICAgICAgb2xkUGFuZVNpemVzW29sZFBhbmVTaXplcy5sZW5ndGgtMV0gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aC0xOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYob2xkUGFuZVNpemVzW2ldICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpXS5wYW5lU2l6ZSA9IG9sZFBhbmVTaXplc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gdGhpcy5sYXlvdXRQYW5lc1tpXS5uYW1lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihuYW1lID09PSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gd2lkZ2V0LndpZGdldE5hbWUgKyBcIl9cIisgdmlld1R5cGUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gVW5pcXVlSWRHZW5lcmF0b3IuZ2V0SW5zdGFuY2UoKS5nZXRVbmlxdWVJZEZyb21TdHJpbmcobmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bJlxcL1xcXFwjLCsoICkkfiUuJ1wiOio/PD57fV0vZywnXycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHBhbmVXaWRnZXQgPSB3aWRnZXQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxheW91dFBhbmVzW2ldICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZVdpZGdldCA9IHRoaXMubGF5b3V0UGFuZXNbaV0ud2lkZ2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tpXSAgPSAgbmV3IExheW91dFBhbmUobmFtZSwgcHJvcGVydGllc1tpXS5wYW5lU2l6ZSwgcGFuZVdpZGdldCwgZmFsc2UsIHRydWUsIHByb3BlcnRpZXNbaV0uZXhwYW5kYWJsZSwgcHJvcGVydGllc1tpXS5jb2xsYXBzaWJsZSwgcHJvcGVydGllc1tpXS5taW5TaXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0YUxheW91dFBhbmVzQWZ0ZXJBZGRpbmdOZXdQYW5lUmVzcG9uc2l2ZShwcm9wZXJ0aWVzLCB3aWRnZXQpIHtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgaiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoaiA9PSBpKXtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaisrO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYW5lV2lkZ2V0ID0gd2lkZ2V0O1xyXG4gICAgICAgICAgICBpZih0aGlzLmxheW91dFBhbmVzW2ldICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBwYW5lV2lkZ2V0ID0gdGhpcy5sYXlvdXRQYW5lc1tpXS53aWRnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tpXSA9IG5ldyBMYXlvdXRQYW5lKG5hbWUsIHByb3BlcnRpZXNbaV0ucGFuZVNpemUsIHBhbmVXaWRnZXQsIGZhbHNlLCB0cnVlLCBwcm9wZXJ0aWVzW2ldLmV4cGFuZGFibGUsIHByb3BlcnRpZXNbaV0uY29sbGFwc2libGUsIHByb3BlcnRpZXNbaV0ubWluU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwcm9wZXJ0aWVzIHdpdGggdGhlIGluZm9ybWF0aW9ucyBmcm9tIHRoZSBsYXlvdXRQYW5lIGRlZmluaXRpb25zO1xyXG4gICAgICogU2l6ZSBvZiBkeW5hbWljIHBhbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGJ5IHVzaW5nIHRoZSBhY3R1YWwgd2lkZ2V0IHNpemVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm9wZXJ0aWVzSW5mb3JtYXRpb25zV2l0aExheW91dFBhbmVzRGF0YShwcm9wZXJ0aWVzKXsgICBcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0UGFuZS5maWxsU3BhY2UgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLnBhbmVTaXplID0gbGF5b3V0UGFuZS5zaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX2FjdHVhbFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX29yaWVudGF0aW9uID09IGVqLk9yaWVudGF0aW9uLlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHRoaXMuX2FjdHVhbEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSBzaXplIC0gdGhpcy5zdW1PZkRlZmluZWRMYXlvdXRQYW5lU2l6ZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLmV4cGFuZGFibGUgPSBsYXlvdXRQYW5lLmV4cGFuZGFibGU7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5jb2xsYXBzaWJsZSA9IGxheW91dFBhbmUuY29sbGFwc2libGU7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5yZXNpemFibGUgPSBsYXlvdXRQYW5lLnJlc2l6YWJsZTtcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLm1pblNpemUgPSBsYXlvdXRQYW5lLm1pbmltdW1TaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiByZXNpemUgdGhlIHNwbGl0dGVyIGFuZCB1cGRhdGUgdGhlIHNwbGl0dGVyIHBhbmVzaXplc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2l6ZVNwbGl0dGVyKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwid2lkdGhcIiwgd2lkdGgsIHRydWUpO1xyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcImhlaWdodFwiLCBoZWlnaHQsIHRydWUpO1xyXG5cclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7IFxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVBhbmVQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFBhbmVQcm9wZXJ0aWVzVG9TcGxpdHRlcihzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICB9ICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHNwbGl0dGVyIGhhcyBlbm91Z2ggc2l6ZSB0byBpbnNlcnQgYWxsIG5lY2Vzc2FyeSBjaGFydHMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7ZWouU3BsaXR0ZXJ9IHNwbGl0dGVyXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhc1BhbmVNaW5TaXplKHNwbGl0dGVyOiBlai5TcGxpdHRlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBtaW5IZWlnaHQgPSAwO1xyXG4gICAgICAgIGxldCBzdW1PZlBhbmVIZWlnaHRzID0gbWluSGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoc3BsaXR0ZXIubW9kZWwucHJvcGVydGllcyAmJiBzcGxpdHRlci5tb2RlbC5wcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy9NaW4gaGVpZ2h0IG9mIHNwbGl0dGVyID0+IGxhc3RQYW5lU2l6ZSArIGJhciBzaXplICg0MDkpICsgbWluU2l6ZSBvZiBhbGwgY2hhcnRzICsgdGhlIGJhciBoZWlnaHQgYmV0d2VlbiBjaGFydHMoOSlcclxuICAgICAgICAgICAgbWluSGVpZ2h0ID0gNDA5ICsgKHNwbGl0dGVyLm1vZGVsLnByb3BlcnRpZXMubGVuZ3RoIC0gMSkgKiA5O1xyXG4gICAgICAgICAgICBzdW1PZlBhbmVIZWlnaHRzID0gKHNwbGl0dGVyLm1vZGVsLnByb3BlcnRpZXMubGVuZ3RoIC0gMSkgKiA5O1xyXG5cclxuICAgICAgICAgICAgc3BsaXR0ZXIubW9kZWwucHJvcGVydGllcy5mb3JFYWNoKHBhbmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0ICs9IHBhbmUubWluU2l6ZTtcclxuICAgICAgICAgICAgICAgIHN1bU9mUGFuZUhlaWdodHMgKz0gcGFuZS5wYW5lU2l6ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChzdW1PZlBhbmVIZWlnaHRzID49IG1pbkhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwYW5lc2l6ZSBpbiB0aGUgcHJvcGVydGllcyBmb3IgdGhlIG5ldyBoZWlnaHQvd2lkdGhcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0geyp9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUGFuZVByb3BlcnRpZXMocHJvcGVydGllcywgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBhbGwga25vdyBwYW5lIHNpemVzXHJcbiAgICAgICAgdGhpcy5zZXRLbm93blBhbmVTaXplcyhwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBhbGwgZHluYW1pYyBwYW5lIHNpemVzXHJcbiAgICAgICAgdGhpcy5zZXREeW5hbWljUGFuZVNpemVzKHByb3BlcnRpZXMsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0S25vd25QYW5lU2l6ZXMocHJvcGVydGllcyl7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLmxheW91dFBhbmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gIHRoaXMubGF5b3V0UGFuZXNba2V5XTtcclxuICAgICAgICAgICAgaWYobGF5b3V0UGFuZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGxheW91dFBhbmUuZmlsbFNwYWNlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5wYW5lU2l6ZSA9IGxheW91dFBhbmUuc2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldER5bmFtaWNQYW5lU2l6ZXMocHJvcGVydGllcywgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5sYXlvdXRQYW5lcykge1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9ICB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKGxheW91dFBhbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXRQYW5lLmZpbGxTcGFjZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9vcmllbnRhdGlvbiA9PSBlai5PcmllbnRhdGlvbi5WZXJ0aWNhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLnBhbmVTaXplID0gaGVpZ2h0IC0gdGhpcy5zdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLnBhbmVTaXplID0gd2lkdGggLSB0aGlzLnN1bU9mRGVmaW5lZFBhbmVTaXplcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiBwcm9wZXJ0aWVzKHBhbmVzaXplcywgLi4uKSB0byB0aGUgZWpzcGxpdHRlclxyXG4gICAgICogaWYgdGhlIGxhc3QgcGFuZXNpemUgaXMgdW5kZXIgMXB4IGEgY29ycmVjdGlvbiBvZiB0aGUgcGFuZXNpemUgd2lsbCBiZSBkb25lOyBvY2N1cmVzIHNvbWV0aW1lcyBpbiBjYXNlIG9mIGJyb3dzZXIgem9vbVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2VqLlNwbGl0dGVyfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQYW5lUHJvcGVydGllc1RvU3BsaXR0ZXIoc3BsaXR0ZXI6IGVqLlNwbGl0dGVyLCBwcm9wZXJ0aWVzKXtcclxuICAgICAgICAvLyByb3VuZCBwYW5lIHNpemVzXHJcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHBhbmUgPT4ge1xyXG4gICAgICAgICAgICBwYW5lLnBhbmVTaXplID0gTWF0aC5mbG9vcihwYW5lLnBhbmVTaXplKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc3BsaXR0ZXJQYW5lcyA9ICg8YW55PnNwbGl0dGVyKS5wYW5lcztcclxuICAgICAgICBpZihzcGxpdHRlclBhbmVzICE9IHVuZGVmaW5lZCAmJiBzcGxpdHRlclBhbmVzLmxlbmd0aCA+IDApIHsgXHJcbiAgICAgICAgICAgIGxldCBsYXN0UGFuZSA9IHNwbGl0dGVyUGFuZXNbc3BsaXR0ZXJQYW5lcy5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgIGlmKGxhc3RQYW5lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdFBhbmVTaXplU3RyaW5nID0gbGFzdFBhbmUuc3R5bGUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9vcmllbnRhdGlvbiA9PSBlai5PcmllbnRhdGlvbi5WZXJ0aWNhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFBhbmVTaXplU3RyaW5nID0gbGFzdFBhbmUuc3R5bGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RQYW5lU2l6ZSA9IHBhcnNlRmxvYXQobGFzdFBhbmVTaXplU3RyaW5nKTtcclxuICAgICAgICAgICAgICAgIGlmKGxhc3RQYW5lU2l6ZSA8PSAwLjk5OTkgJiYgcHJvcGVydGllc1twcm9wZXJ0aWVzLmxlbmd0aC0xXS5wYW5lU2l6ZSA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNpemUgb2YgbGFzdCBzcGxpdHRlciBwYW5lIHdhcyBub3Qgc2V0IGNvcnJlY3QgPT4gdG8gbGVzcyBzcGFjZSFcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBicm93c2VyIHpvb20gaXMgdXNlZCB0aGUgc2l6ZXMgd2lsbCBiZSBkZWZpbmVkIHdpdGggZGVjaW1hbHBsYWNlcztcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZWpTcGxpdHRlciBzZXRzIHRoZSBzaXplIG9mIHRoZSBsYXN0IHBhbmUgdG8gMCBpZiBpdCBpcyBhIGxpdHRsZSBiaXQgdG8gdGFsbCAoZS5nLiBcIjAuMXB4XCIpID0+IHBhbmUgd2lsbCBub3QgYmUgc2hvd25cclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBsYXN0IHBhbmUgYSBsaXR0bGUgYml0IHNtYWxsZXJcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoLTFdLnBhbmVTaXplLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNwbGl0dGVyIHBhbmUgY29udGVudCBzaXplcyAod2lkZ2V0IHNpemVzKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICAgcHJpdmF0ZSByZXNpemVTcGxpdHRlclBhbmVDb250ZW50cyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgLy8gU2V0IHRoZSBzaXplcyBvZiB0aGUgc3BsaXR0ZXIgcGFuZWNvbnRlbnRzXHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLl93aWRnZXRzLmdldCh0aGlzLmxheW91dFBhbmVzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCB3aWRnZXRXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdpZGdldEhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9vcmllbnRhdGlvbiA9PSBlai5PcmllbnRhdGlvbi5WZXJ0aWNhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sYXlvdXRQYW5lc1tpbmRleF0uZmlsbFNwYWNlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRIZWlnaHQgPSBoZWlnaHQgLSB0aGlzLnN1bU9mRGVmaW5lZFBhbmVTaXplcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih3aWRnZXRIZWlnaHQgPCAwKXsgLy8gTm8gcGxhY2UgZm9yIGR5bmFtaWMgcGFuZSwgbWF5YmUgYWxzbyBvdGhlciBwYW5lcyBoYXZlIHRvIGJlIGFkb3B0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRvcHRMYXlvdXRQYW5lc1RvRml0Q3VycmVudFNpemUoaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldEhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0SGVpZ2h0ID0gdGhpcy5sYXlvdXRQYW5lc1tpbmRleF0uc2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxheW91dFBhbmVzW2luZGV4XS5maWxsU3BhY2UgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldFdpZHRoID0gd2lkdGggLSB0aGlzLnN1bU9mRGVmaW5lZFBhbmVTaXplcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih3aWRnZXRXaWR0aCA8IDApeyAvLyBObyBwbGFjZSBmb3IgZHluYW1pYyBwYW5lLCBtYXliZSBhbHNvIG90aGVyIHBhbmVzIGhhdmUgdG8gYmUgYWRvcHRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZG9wdExheW91dFBhbmVzVG9GaXRDdXJyZW50U2l6ZSh3aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0V2lkdGggPSB0aGlzLmxheW91dFBhbmVzW2luZGV4XS5zaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdpZGdldC5yZXNpemUod2lkZ2V0V2lkdGgsIHdpZGdldEhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1BlcnNpc3QgZGF0YSBldmVyeSB0aW1lIGEgc3BsaXR0ZXIgaXMgcmVzaXplZFxyXG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBsYXlvdXQgcGFuZXMgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXRiYXJJbmRleFxyXG4gICAgICogQHBhcmFtIHsqfSBwcmV2UGFuZVNpemVcclxuICAgICAqIEBwYXJhbSB7Kn0gbmV4dFBhbmVTaXplXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVMYXlvdXRQYW5lc09uU3BsaXR0ZXJSZXNpemUoc3BsaXRiYXJJbmRleCwgcHJldlBhbmVTaXplLCBuZXh0UGFuZVNpemUpe1xyXG4gICAgICAgIGxldCBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLl9pc1Jlc3BvbnNpdmUpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXggKyAxXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllc1tzcGxpdGJhckluZGV4ICsgMV0ucGFuZVNpemUgPSB0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXggKyAxXS5zaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGFuZVByb3BlcnRpZXNUb1NwbGl0dGVyKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG9sZFNpemUgPSB0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXhdLnNpemVcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tzcGxpdGJhckluZGV4XS5zaXplID0gcHJldlBhbmVTaXplO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCArPSAocHJldlBhbmVTaXplIC0gb2xkU2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNleyAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zZXRQYW5lUHJvcGVydGllc1RvU3BsaXR0ZXIoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tpXS5zaXplID0gcHJvcGVydGllc1tpXS5wYW5lU2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvcnJlY3RzIHRoZSB0YXJnZXQgaW5kZXggaWYgc291cmNlIGluZGV4IGlzIGJlZm9yZSB0YXJnZXQgaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0YVRhcmdldFBhbmVJbmRleChzb3VyY2VQYW5lSW5kZXg6IG51bWJlciwgdGFyZ2V0UGFuZUluZGV4OiBudW1iZXIpOiBudW1iZXJ7XHJcbiAgICAgICAgaWYoc291cmNlUGFuZUluZGV4IDwgdGFyZ2V0UGFuZUluZGV4KXtcclxuICAgICAgICAgICAgLy8gbW92ZWQgZWxlbWVudCBpcyBpbiBsaXN0IGJlZm9yZSB0YXJnZXQgcG9zaXRpb24gYW5kIHdhcyByZW1vdmVkIGJlZm9yZSwgc28gaW5kZXggbXVzdCBiZSBkZWNyZWFzZWQgdG8gZ2V0IGNvcnJlY3QgaW5zZXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHRhcmdldFBhbmVJbmRleC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFyZ2V0UGFuZUluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcHJvcGVydGllcyBmcm9tIHRoZSBlalNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKXtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXIub3B0aW9uKFwicHJvcGVydGllc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGVqU3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtlai5TcGxpdHRlcn0gc3BsaXR0ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UHJvcGVydGllcyhzcGxpdHRlcjogZWouU3BsaXR0ZXIsIHByb3BlcnRpZXMpe1xyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcInByb3BlcnRpZXNcIiwgcHJvcGVydGllcywgdHJ1ZSk7IC8vIGZvcmNlIHRoZSBzZXR0aW5nIHRvIHJlc2l6ZSB0aGUgY2hhcnQgc3BsaXR0ZXJzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgcHJvcGVydGllcyA9PiBtb3ZlcyB0aGUgcHJvcGVydHkgaW5mb3JtYXRpb25zIGZyb20gc291cmNlIHRvIHRhcmdldCBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHByb3BlcnRpZXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzb3VyY2VQYW5lSW5kZXhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXRQYW5lSW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVByb3BlcnRpZXNMaXN0KHByb3BlcnRpZXMsIHNvdXJjZVBhbmVJbmRleDogbnVtYmVyLCB0YXJnZXRQYW5lSW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHBhbmVQcm9wZXJ0aWVzID0gcHJvcGVydGllc1tzb3VyY2VQYW5lSW5kZXhdO1xyXG4gICAgICAgIHByb3BlcnRpZXMuc3BsaWNlKHNvdXJjZVBhbmVJbmRleCwgMSk7XHJcbiAgICAgICAgcHJvcGVydGllcy5zcGxpY2UodGFyZ2V0UGFuZUluZGV4LCAwLCBwYW5lUHJvcGVydGllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBsYXlvdXQgcGFuZXMgbGlzdCBhZnRlciBtb3ZpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBsYXlvdXRQYW5lXHJcbiAgICAgKiBAcGFyYW0geyp9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHsqfSB0YXJnZXRQYW5lSW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxheW91dFBhbmVzTGlzdEFmdGVyTW92aW5nKGxheW91dFBhbmUsIHNvdXJjZVBhbmVJbmRleCwgdGFyZ2V0UGFuZUluZGV4KXtcclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzLnNwbGljZShzb3VyY2VQYW5lSW5kZXgsIDEpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXMuc3BsaWNlKHRhcmdldFBhbmVJbmRleCwgMCwgbGF5b3V0UGFuZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwYW5lIGluZGV4IG9mIHRoZSBnaXZlbiB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB3aWRnZXRcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQYW5lSW5kZXgod2lkZ2V0KTogbnVtYmVye1xyXG4gICAgICAgIGxldCBwYW5lSW5kZXggPSAtMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF5b3V0UGFuZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmxheW91dFBhbmVzW2ldLndpZGdldCA9PSB3aWRnZXQpe1xyXG4gICAgICAgICAgICAgICAgcGFuZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFuZUluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgd2lkZ2V0IGZyb20gdGhlIHdpZGdldHMgbGlzdCBvZiB0aGlzIGxheW91dCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB3aWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZVdpZGdldEZyb21MaXN0KHdpZGdldCl7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXRUZW1wLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYod2lkZ2V0VGVtcCA9PSB3aWRnZXQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkZ2V0cy5kZWxldGUoa2V5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGp1c3QgY2hhcnRzIGRpdiBjb250YWluZXIgPT4gcmVtb3ZlIGNoYXJ0IHNpemVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzaXplVG9SZW1vdmVcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkanVzdENoYXJ0c0RpdkNvbnRhaW5lclNpemUoc2l6ZVRvUmVtb3ZlKXtcclxuICAgICAgICB0aGlzLm1haW5EaXYuc3R5bGUuaGVpZ2h0ISA9ICh0aGlzLm1haW5EaXYub2Zmc2V0SGVpZ2h0ISAtIHNpemVUb1JlbW92ZSAtIDQwMCArIHRoaXMuX2RlZmF1bHRTcGxpdHRlclNpemUpICsgXCJweFwiOyAvLyBSZW1vdmUgcGFuZSBzaXplICsgc3BsaXR0ZXIgc2l6ZSg5cHgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgQWRqdXN0IGVqU3BsaXR0ZXIgc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNwbGl0dGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHNpemVUb1JlbW92ZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbmV3IHNwbGl0dGVyIHNpemUgYWZ0ZXIgcmVtb3ZpbmdcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkanVzdFNwbGl0dGVyU2l6ZShzcGxpdHRlciwgc2l6ZVRvUmVtb3ZlKTogbnVtYmVye1xyXG4gICAgICAgIGxldCBhY3R1YWxTcGxpdHRlckhlaWdodCA9IHNwbGl0dGVyLm9wdGlvbihcImhlaWdodFwiKTtcclxuICAgICAgICBsZXQgbmV3U3BsaXR0ZXJIZWlnaHQgPSBwYXJzZUludChhY3R1YWxTcGxpdHRlckhlaWdodCwgMTApOyAvLyBwYXJzZUludCB0byByZW1vdmUgXCJweFwiXHJcbiAgICAgICAgbmV3U3BsaXR0ZXJIZWlnaHQgLT0gc2l6ZVRvUmVtb3ZlICsgdGhpcy5fZGVmYXVsdFNwbGl0dGVyU2l6ZTsgLy8gUmVtb3ZlIHBhbmUgc2l6ZSArIHNwbGl0dGVyIHNpemUoOXB4KVxyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcImhlaWdodFwiLCBuZXdTcGxpdHRlckhlaWdodCwgdHJ1ZSk7IC8vIFRPRE86IG5vdCBvbmx5IGhlaWdodCwgYWxzbyB3aWR0aCBcclxuICAgICAgICByZXR1cm4gbmV3U3BsaXR0ZXJIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb3RpZmllcyB0aGF0IHNwbGl0dGVyIGhhcyByZXNpemVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblNwbGl0dGVyUmVzaXplKGFyZ3MpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxheW91dFBhbmVzT25TcGxpdHRlclJlc2l6ZShhcmdzLnNwbGl0YmFySW5kZXgsIGFyZ3MucHJldlBhbmUuc2l6ZSwgYXJncy5uZXh0UGFuZS5zaXplKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IHdpdGggb25seSB0aGUgc2l6ZXMgb2YgdGhlIHBhbmVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhbmVTaXplcyhwcm9wZXJ0aWVzKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgdmFyIHBhbmVTaXplcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcclxuICAgICAgICAgICAgcGFuZVNpemVzLnB1c2gocHJvcGVydHkucGFuZVNpemUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwYW5lU2l6ZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7U3BsaXR0ZXJXaWRnZXR9OyJdfQ==