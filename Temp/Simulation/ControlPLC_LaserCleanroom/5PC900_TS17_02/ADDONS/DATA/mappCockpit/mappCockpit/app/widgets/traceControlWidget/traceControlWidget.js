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
define(["require", "exports", "../common/widgetBase", "../common/domHelper", "../common/themeProvider", "../../common/fileProvider", "../../models/diagnostics/trace/traceConfig/traceConfigDefines", "./componentDefaultDefinition", "../../common/componentBase/contextIds/contextIdsComponent"], function (require, exports, widgetBase_1, domHelper_1, themeProvider_1, fileProvider_1, traceConfigDefines_1, componentDefaultDefinition_1, contextIdsComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Layout styles for dynamic layout
     *
     * @enum {number}
     */
    var LayoutStyle;
    (function (LayoutStyle) {
        LayoutStyle[LayoutStyle["Default"] = 0] = "Default";
        LayoutStyle[LayoutStyle["MinimizeStep1"] = 1] = "MinimizeStep1";
        LayoutStyle[LayoutStyle["MinimizeStep2"] = 2] = "MinimizeStep2";
        LayoutStyle[LayoutStyle["MinimizeStep3"] = 3] = "MinimizeStep3";
    })(LayoutStyle || (LayoutStyle = {}));
    /**
     * The texts for the buttons
     *
     * @class ButtonTexts
     */
    var ButtonTexts = /** @class */ (function () {
        function ButtonTexts() {
        }
        // Default button texts
        ButtonTexts.Activate = "Activate";
        ButtonTexts.ForceStart = "Force start";
        ButtonTexts.ForceStop = "Force stop";
        ButtonTexts.SaveTraceConfiguration = "Save trace configuration";
        ButtonTexts.ImportTraceConfiguration = "Import trace configuration";
        ButtonTexts.ExportTraceConfiguration = "Export trace configuration";
        // Minimized button texts
        ButtonTexts.SaveTraceConfigurationMinimized = "Save";
        ButtonTexts.ImportTraceConfigurationMinimized = "Import";
        ButtonTexts.ExportTraceConfigurationMinimized = "Export";
        return ButtonTexts;
    }());
    /**
     * implements the TraceControlWidget
     *
     * @class TraceControlWidget
     * @extends {WidgetBase}
     */
    var TraceControlWidget = /** @class */ (function (_super) {
        __extends(TraceControlWidget, _super);
        function TraceControlWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._actualTraceState = traceConfigDefines_1.TraceStateIds.Disabled;
            _this._saveConfigIsActive = false;
            _this._activateIsActive = false;
            _this._fileProvider = new fileProvider_1.FileProvider();
            _this._uploadDataFinishedHandler = function (sender, args) { return _this.onUploadDataFinished(sender, args); };
            /**
             * Default button width for active button
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth1 = "85px";
            /**
             * Default button width for force start/stop button
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth2 = "100px";
            /**
             * Default button width for save/import/export trace config buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth3 = "195px";
            /**
             * Minimized Step 1 button width for save/import/export trace config buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth3MinimizedStep1 = "60px";
            /**
             * Minimized Step 2 button width for save/import/export trace config buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonWidth3MinimizedStep2 = "16px";
            /**
             * Default left position of the save/import/export buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._leftPositionStart = 730;
            /**
             * Default space between the  save/import/export buttons
             *
             * @private
             * @memberof TraceControlWidget
             */
            _this._defaultButtonSpace = 35;
            return _this;
        }
        TraceControlWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Dispose some objects from this widget
         *
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.dispose = function () {
            // Dispose static button and fields
            this.destroyButton(this._activateButtonId);
            this.destroyField(this._stateFieldId);
            this.destroyButton(this._forceStartButtonId);
            this.destroyButton(this._forceStopButtonId);
            // Dispose dynamic buttons if available
            this.destroyButton(this._saveTraceConfigurationButtonId);
            this.destroyButton(this._importTraceConfigurationButtonId);
            this.destroyButton(this._exportTraceConfigurationButtonId);
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createLayout = function () {
            this.initButtonAndFieldIds();
            this.createDivButtonsAndFieldsLayout();
            this.addStaticButtons();
        };
        /**
         * Initializes the ids for the buttons and fields
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.initButtonAndFieldIds = function () {
            var layoutContainerId = this.mainDivId;
            this._activateButtonId = layoutContainerId + "_activateButton";
            this._forceStartButtonId = layoutContainerId + "_forceStartButton";
            this._forceStopButtonId = layoutContainerId + "_forceStopButton";
            this._saveTraceConfigurationButtonId = layoutContainerId + "_saveTraceConfigurationButton";
            this._importTraceConfigurationButtonId = layoutContainerId + "_importTraceConfigurationButton";
            this._exportTraceConfigurationButtonId = layoutContainerId + "_exportTraceConfigurationButton";
            this._stateFieldId = layoutContainerId + "tracecontrol_state";
            this._stateImage = layoutContainerId + "tracecontrol_state_image";
        };
        /**
         * Creates the layout for the buttons and fields
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createDivButtonsAndFieldsLayout = function () {
            this.mainDiv.style.paddingTop = "4px";
            this.mainDiv.style.background = "var(--main-grey-dark2)";
            this.mainDiv.style.overflow = "hidden";
            var element = $(this.mainDiv);
            element.append("<div style='left: 25px; position: absolute;' id='" + this._activateButtonId + "'></div>");
            element.append("<div style='top: 10px; left: 150px; position: absolute;' class='traceControlStateImage' id='" + this._stateImage + "'></div>");
            element.append("<div style='top: 10px; left: 180px; position: absolute;' id='" + this._stateFieldId + "'></div>");
            element.append("<div style='left: 340px; position: absolute;' id='" + this._forceStartButtonId + "'></div>");
            element.append("<div style='left: 475px; position: absolute;' id='" + this._forceStopButtonId + "'></div>");
            element.append("<div style='left: " + this.getLeftPosition(0) + "px; position: absolute;' id='" + this._saveTraceConfigurationButtonId + "'></div>");
            element.append("<div style='left: " + this.getLeftPosition(1) + "px; position: absolute;' id='" + this._importTraceConfigurationButtonId + "'></div>");
            element.append("<div style='left: " + this.getLeftPosition(2) + "px; position: absolute;' id='" + this._exportTraceConfigurationButtonId + "'></div>");
        };
        /**
         * Returns the left position of a button for the given LayoutStyle
         *
         * @private
         * @param {number} index
         * @param {LayoutStyle} [layoutStyle=LayoutStyle.Default]
         * @returns {number}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.getLeftPosition = function (index, layoutStyle) {
            if (layoutStyle === void 0) { layoutStyle = LayoutStyle.Default; }
            if (index == 0) {
                return this._leftPositionStart;
            }
            else {
                var defaultButtonWidth = this._defaultButtonWidth3;
                if (layoutStyle == LayoutStyle.MinimizeStep1) {
                    defaultButtonWidth = this._defaultButtonWidth3MinimizedStep1;
                }
                else if (layoutStyle == LayoutStyle.MinimizeStep2) {
                    defaultButtonWidth = this._defaultButtonWidth3MinimizedStep2;
                }
                var buttonWidth = parseInt(defaultButtonWidth, 10);
                return this._leftPositionStart + (index * (buttonWidth + this._defaultButtonSpace));
            }
        };
        /**
         * Creates the buttons and fields
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.addStaticButtons = function () {
            this.createButton(this._activateButtonId, ButtonTexts.Activate, this.getImagePath("play.svg"), this._defaultButtonWidth1);
            this.createField(this._stateFieldId);
            this.createButton(this._forceStartButtonId, ButtonTexts.ForceStart, this.getImagePath("record.svg"), this._defaultButtonWidth2);
            this.createButton(this._forceStopButtonId, ButtonTexts.ForceStop, this.getImagePath("stop.svg"), this._defaultButtonWidth2);
        };
        /**
         * Loads the styles for the trace control widget
         *
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/traceControlWidget/style/css/traceControlStyle.css");
            _super.prototype.addStyle.call(this, "widgets/traceControlWidget/style/css/traceControlButtonStyle.css");
        };
        /**
         * Activates/Deactivates a button
         *
         * @private
         * @param {string} id
         * @param {boolean} deactivate
         * @returns
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.deactivateButton = function (id, deactivate) {
            var ejButton = $("#" + id).data("ejButton");
            if (ejButton == undefined) {
                return;
            }
            this.setButtonCssClass(ejButton, deactivate);
            var buttonElement = $("#" + id)[0];
            var imagePath = this.getImagePathForId(id, deactivate);
            buttonElement.style.backgroundImage = "url('" + imagePath + "')";
            domHelper_1.DomHelper.disableElement(buttonElement, deactivate);
        };
        /**
         * Sets the layout of the button(e.g. text, size, left postion)
         *
         * @private
         * @param {string} id
         * @param {string} buttonText
         * @param {string} newSize
         * @param {string} newLeftPosition
         * @returns
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonLayout = function (id, buttonText, newSize, newLeftPosition) {
            var ejButton = $("#" + id).data("ejButton");
            if (ejButton == undefined) {
                return;
            }
            ejButton.option("text", buttonText, true);
            if (buttonText == "") {
                ejButton.option("contentType", ej.ContentType.ImageOnly, true);
            }
            else {
                ejButton.option("contentType", ej.ContentType.TextAndImage, true);
            }
            ejButton.option("width", newSize, true);
            var buttonElement = $("#" + id)[0];
            if (buttonElement != undefined) {
                buttonElement.style.left = newLeftPosition;
            }
        };
        /**
         * Returns the imagepath for the button ids
         *
         * @private
         * @param {string} buttonId
         * @param {boolean} deactivate
         * @returns {string}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.getImagePathForId = function (buttonId, deactivate) {
            var imagePath;
            if (buttonId == this._forceStartButtonId) {
                imagePath = this.getImagePath("record.svg", deactivate);
            }
            else if (buttonId == this._forceStopButtonId) {
                imagePath = this.getImagePath("stop.svg", deactivate);
            }
            else if (buttonId == this._saveTraceConfigurationButtonId) {
                imagePath = this.getImagePath("save.svg", deactivate);
            }
            else if (buttonId == this._activateButtonId) {
                imagePath = this.getImagePath("play.svg", deactivate);
            }
            else if (buttonId == this._importTraceConfigurationButtonId) {
                imagePath = this.getImagePath("import.svg", deactivate);
            }
            else if (buttonId == this._exportTraceConfigurationButtonId) {
                imagePath = this.getImagePath("export.svg", deactivate);
            }
            return imagePath;
        };
        /**
         * Sets the Button css styles for activated or deactivated state
         *
         * @private
         * @param {*} ejButton
         * @param {boolean} deactivate
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonCssClass = function (ejButton, deactivate) {
            if (deactivate == true) {
                ejButton.option("cssClass", "traceControlButtonDeactivated", true);
            }
            else {
                ejButton.option("cssClass", "traceControlButton", true);
            }
        };
        /**
         * Creates a button with the given text and image
         *
         * @param {string} id
         * @param {string} text
         * @param {string} imagePath
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createButton = function (id, text, imagePath, width) {
            var _this = this;
            $("#" + id).ejButton({
                text: text,
                contentType: ej.ContentType.TextAndImage,
                cssClass: "traceControlButton",
                prefixIcon: "e-icon",
                click: function (clickArgs) { return _this.click(id); },
                width: width,
            });
            var buttonElement = $("#" + id)[0];
            buttonElement.style.backgroundPositionX = "4px";
            buttonElement.style.backgroundPositionY = "4px";
            buttonElement.style.backgroundImage = "url('" + imagePath + "')";
            buttonElement.style.backgroundRepeat = "no-repeat";
            buttonElement.style.backgroundSize = "16px 16px";
        };
        /**
         * Destroys the button object
         *
         * @param {string} id
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.destroyButton = function (id) {
            var button = $("#" + id).data("ejButton");
            if (button != undefined) {
                button.destroy();
            }
        };
        /**
         * Creates the trace state field (currently a special button is used)
         *
         * @param {string} id
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.createField = function (id) {
            $("#" + id).ejButton({
                text: "0",
                contentType: ej.ContentType.TextOnly,
                cssClass: "traceStateButton",
            });
            var fieldElement = $("#" + id)[0];
            if (fieldElement != undefined) {
                fieldElement.style.color = "#FFFFFF";
            }
        };
        /**
         * Destroys the field object
         *
         * @param {string} id
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.destroyField = function (id) {
            var field = $("#" + id).data("ejButton");
            if (field != undefined) {
                field.destroy();
            }
        };
        /**
         * Resizes the trace control widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.resize = function (width, height) {
            this._actualHeight = height;
            this._actualWidth = width;
            this.mainDiv.style.width = width.toString() + "px";
            this.mainDiv.style.height = height.toString() + "px";
            this.updateDynamicLayout();
        };
        /**
         * Updates the dynamic layout (e.g. smaller buttons if small widget size)
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.updateDynamicLayout = function () {
            var neededSizeForDefaultLayout = 1400;
            var neededSizeForMinimzedLayoutStep1 = 1000;
            if (this._actualWidth > neededSizeForDefaultLayout) {
                this.setLayout(LayoutStyle.Default);
            }
            else if (this._actualWidth > neededSizeForMinimzedLayoutStep1) {
                this.setLayout(LayoutStyle.MinimizeStep1);
            }
            else {
                this.setLayout(LayoutStyle.MinimizeStep2);
            }
        };
        /**
         * Sets the dynamic layout to a defined layout style (e.g. default or minimized)
         *
         * @private
         * @param {LayoutStyle} layoutStyle
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setLayout = function (layoutStyle) {
            switch (layoutStyle) {
                case LayoutStyle.MinimizeStep2: {
                    this.setButtonLayout(this._saveTraceConfigurationButtonId, "", this._defaultButtonWidth3MinimizedStep2, this.getLeftPosition(0, LayoutStyle.MinimizeStep2) + "px");
                    this.setButtonLayout(this._importTraceConfigurationButtonId, "", this._defaultButtonWidth3MinimizedStep2, this.getLeftPosition(1, LayoutStyle.MinimizeStep2) + "px");
                    this.setButtonLayout(this._exportTraceConfigurationButtonId, "", this._defaultButtonWidth3MinimizedStep2, this.getLeftPosition(2, LayoutStyle.MinimizeStep2) + "px");
                    break;
                }
                case LayoutStyle.MinimizeStep1: {
                    this.setButtonLayout(this._saveTraceConfigurationButtonId, ButtonTexts.SaveTraceConfigurationMinimized, this._defaultButtonWidth3MinimizedStep1, this.getLeftPosition(0, LayoutStyle.MinimizeStep1) + "px");
                    this.setButtonLayout(this._importTraceConfigurationButtonId, ButtonTexts.ImportTraceConfigurationMinimized, this._defaultButtonWidth3MinimizedStep1, this.getLeftPosition(1, LayoutStyle.MinimizeStep1) + "px");
                    this.setButtonLayout(this._exportTraceConfigurationButtonId, ButtonTexts.ExportTraceConfigurationMinimized, this._defaultButtonWidth3MinimizedStep1, this.getLeftPosition(2, LayoutStyle.MinimizeStep1) + "px");
                    break;
                }
                case LayoutStyle.Default: {
                    this.setButtonLayout(this._saveTraceConfigurationButtonId, ButtonTexts.SaveTraceConfiguration, this._defaultButtonWidth3, this.getLeftPosition(0) + "px");
                    this.setButtonLayout(this._importTraceConfigurationButtonId, ButtonTexts.ImportTraceConfiguration, this._defaultButtonWidth3, this.getLeftPosition(1) + "px");
                    this.setButtonLayout(this._exportTraceConfigurationButtonId, ButtonTexts.ExportTraceConfiguration, this._defaultButtonWidth3, this.getLeftPosition(2) + "px");
                    break;
                }
            }
        };
        /**
         * Sets and defines the interface to the trace control
         *
         * @private
         * @param {ITraceComponentControl} traceComponentControl
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.updateTraceControlInterface = function (traceComponentControl) {
            var _a;
            if (((_a = this.component.context) === null || _a === void 0 ? void 0 : _a.getContext(contextIdsComponent_1.ContextIdsComponent.ViewComponentTypeId)) == "TraceViewWidget") {
                traceComponentControl = this.getInterfaceWithoutSaveCommand(traceComponentControl);
            }
            this._traceControlInterface = traceComponentControl;
            if (this._traceControlInterface) {
                this.addDynamicButtonsForAvailableCommands(this._traceControlInterface);
                this.addTraceState();
            }
        };
        /**
         * Returns the trace component control with out the save/import/export trace configuration command
         *
         * @private
         * @param {ITraceComponentControl} traceComponentControl
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceControlWidget.prototype.getInterfaceWithoutSaveCommand = function (traceComponentControl) {
            return {
                commandActivate: traceComponentControl.commandActivate,
                commandForceStart: traceComponentControl.commandForceStart,
                commandForceStop: traceComponentControl.commandForceStop,
            };
        };
        /**
         * Add trace state info to layout
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.addTraceState = function () {
            this.createField(this._stateFieldId);
            this.refreshTraceControlParameterValue(this._actualTraceState);
        };
        /**
         * Adds the dynamic buttons (save/import/export trace configuation) if command is available in command interface
         *
         * @private
         * @param {*} commands
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.addDynamicButtonsForAvailableCommands = function (commands) {
            if (commands.commandSaveConfiguration) {
                this.createButton(this._saveTraceConfigurationButtonId, ButtonTexts.SaveTraceConfiguration, this.getImagePath("save.svg"), this._defaultButtonWidth3);
            }
            if (commands.commandImportTraceConfiguration) {
                this.createButton(this._importTraceConfigurationButtonId, ButtonTexts.ImportTraceConfiguration, this.getImagePath("import.svg"), this._defaultButtonWidth3);
            }
            if (commands.commandExportTraceConfiguration) {
                this.createButton(this._exportTraceConfigurationButtonId, ButtonTexts.ExportTraceConfiguration, this.getImagePath("export.svg"), this._defaultButtonWidth3);
            }
            // Update layout after adding new buttons
            this.updateDynamicLayout();
        };
        /**
         * Will be called when a button was clicked
         *
         * @private
         * @param {*} buttonId
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.click = function (buttonId) {
            switch (buttonId) {
                case this._activateButtonId:
                    this.executeActivate();
                    break;
                case this._forceStartButtonId:
                    this.executeForceStart();
                    break;
                case this._forceStopButtonId:
                    this.executeForceStop();
                    break;
                case this._saveTraceConfigurationButtonId:
                    this.executeSaveConfiguration();
                    break;
                case this._importTraceConfigurationButtonId:
                    this.importTraceConfiguration();
                    break;
                case this._exportTraceConfigurationButtonId:
                    this.exportTraceConfiguration();
                    break;
            }
        };
        /**
         * Activates the trace
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeActivate = function () {
            // invoke activate trace by using a component command
            if (this._saveConfigIsActive == false) {
                this._activateIsActive = true;
                this.setButtonStates(this._actualTraceState);
                this.activateTrace();
            }
        };
        TraceControlWidget.prototype.activateTrace = function () {
            var _this = this;
            if (this._traceControlInterface) {
                this._traceControlInterface.commandActivate.execute(null, function (result) {
                    _this.onTraceActivated();
                });
            }
        };
        /**
         * Processes trace activation response
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.onTraceActivated = function () {
            this._activateIsActive = false;
            this.setButtonStates(this._actualTraceState);
        };
        /**
         * handles trace state changes
         *
         * @private
         * @param {string} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.onTraceStateChanged = function (traceState) {
            this._actualTraceState = traceState;
            this.refreshTraceControlParameterValue(traceState);
        };
        /**
         * Forces starting the trace
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeForceStart = function () {
            if (this._traceControlInterface) {
                if (this._actualTraceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                    this._traceControlInterface.commandForceStart.execute();
                }
            }
        };
        /**
         * Forces stopping the trace
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeForceStop = function () {
            if (this._traceControlInterface) {
                if (this._actualTraceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) { // Only while running
                    this._traceControlInterface.commandForceStop.execute();
                }
            }
        };
        /**
         * Saves the trace configuration on target
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.executeSaveConfiguration = function () {
            var _this = this;
            if (this._traceControlInterface) {
                if (this.saveTraceConfigPossibleInThisState(this._actualTraceState)) {
                    this._saveConfigIsActive = true;
                    this.setButtonStates(this._actualTraceState);
                    this._traceControlInterface.commandSaveConfiguration.execute(null, function (result) {
                        _this._saveConfigIsActive = false;
                        _this.setButtonStates(_this._actualTraceState);
                    });
                }
            }
        };
        /**
         * Opens a file select dialog and imports a trace configuration from the file
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.importTraceConfiguration = function () {
            this._fileProvider.eventUploadDataFinished.attach(this._uploadDataFinishedHandler);
            this._fileProvider.uploadData(".tracecfg"); // Only show/accept *.tracecfg files
        };
        /**
         * Export a trace configuration to a file
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.exportTraceConfiguration = function () {
            this._traceControlInterface.commandExportTraceConfiguration.execute(null, function (result) {
                var blob = new Blob([result], { type: "text/xml" });
                fileProvider_1.FileProvider.downloadData("TraceConfi.tracecfg", blob);
            });
        };
        /**
         * Occurs after reading data from file(trace configuration import data)
         *
         * @private
         * @param {HTMLInputElement} sender
         * @param {Map<string, string>} args
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.onUploadDataFinished = function (sender, args) {
            /*this.setBusyInformation(new BusyInformation("Importing data...", ImageId.defaultImage, 48, true));
            this.setBusy(true);*/
            var _this = this;
            // Timeout needed to show the busyscreen before importing data 
            setTimeout(function () { return _this.importData(sender, args); }, 200);
            this._fileProvider.eventUploadDataFinished.detach(this._uploadDataFinishedHandler);
        };
        /**
         * imports the given filedata with the given filename
         *
         * @private
         * @param {HTMLInputElement} fileInputElement
         * @param {Map<string, string>} fileContents
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.importData = function (fileInputElement, fileContents) {
            if (fileContents.size === 1) {
                var filedata = fileContents.values().next().value;
                this._traceControlInterface.commandImportTraceConfiguration.execute(filedata, function (result) {
                });
            }
        };
        /**
         * refreshes the trace state (displayname of value and the state icon)
         *
         * @private
         * @param {MappCockpitComponentParameter} traceControlParameter
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.refreshTraceControlParameterValue = function (traceState) {
            this.setTraceStateText(traceState);
            this.setTraceStateImage(traceState);
            this.setButtonStates(traceState);
        };
        /**
         * Set the display name for the trace state in the visualization
         *
         * @private
         * @param {string} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setTraceStateText = function (traceState) {
            // Get display name for the trace state
            var traceStateDisplayText = "Inactive";
            if (traceState == traceConfigDefines_1.TraceStateIds.Config_processing || traceState == traceConfigDefines_1.TraceStateIds.Config_applied) {
                traceStateDisplayText = "Applying configuration";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                traceStateDisplayText = "Wait for start trigger";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) {
                traceStateDisplayText = "Running";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Data_available) {
                traceStateDisplayText = "Data available";
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Record_failure) {
                traceStateDisplayText = "Record failed";
            }
            // Set display name for the trace state
            $("#" + this._stateFieldId).ejButton({
                text: traceStateDisplayText,
            });
        };
        /**
         * Sets an image for the trace state in the visualization
         *
         * @private
         * @param {string} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setTraceStateImage = function (traceState) {
            // Get image for the trace state
            var imagepath = this.getImagePath("inactive.svg");
            if (traceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                imagepath = this.getImagePath("wait_start_trigger.svg");
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) {
                imagepath = this.getImagePath("wait_stop_event.svg");
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Data_available) {
                imagepath = this.getImagePath("data_available.svg");
            }
            // Set image for the trace state
            var imageElement = $("#" + this._stateImage)[0];
            if (imageElement != undefined) {
                imageElement.style.backgroundImage = "url('" + imagepath + "')";
            }
        };
        /**
         * Sets the states(enabled/disabled) of the buttons for the given trace state
         *
         * @private
         * @param {string} traceState
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonStates = function (traceState) {
            if (traceState == traceConfigDefines_1.TraceStateIds.Wait_start_trigger) {
                this.setButtonStateInWaitStartTriggerState();
            }
            else if (traceState == traceConfigDefines_1.TraceStateIds.Wait_stop_event) {
                this.setButtonStateInWaitStopEventState();
            }
            else {
                if (this.saveTraceConfigPossibleInThisState(traceState)) {
                    this.deactivateButton(this._saveTraceConfigurationButtonId, false);
                }
                // other state => deactivate force start trigger and force stop event
                this.deactivateButton(this._forceStartButtonId, true);
                this.deactivateButton(this._forceStopButtonId, true);
                // set activate button state
                if (this._activateIsActive == false && this._saveConfigIsActive == false) {
                    this.deactivateButton(this._activateButtonId, false);
                }
                else {
                    this.deactivateButton(this._activateButtonId, true);
                }
            }
        };
        /**
         * Sets the button states if the trace state is waiting for start trigger
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonStateInWaitStartTriggerState = function () {
            // Wait for start trigger => activate force start; deactivate force stop event
            this.deactivateButton(this._forceStartButtonId, false);
            this.deactivateButton(this._forceStopButtonId, true);
            this.deactivateButton(this._saveTraceConfigurationButtonId, true);
        };
        /**
         * Sets the button states if the trace state is waiting for the stop event
         *
         * @private
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.setButtonStateInWaitStopEventState = function () {
            // Running => deactivate force start trigger; activate force stop event
            this.deactivateButton(this._forceStartButtonId, true);
            this.deactivateButton(this._forceStopButtonId, false);
            this.deactivateButton(this._saveTraceConfigurationButtonId, true);
        };
        /**
         * Returns the imagePath for the given imageName and state(activated/deactivated)
         *
         * @private
         * @param {string} imageName
         * @param {boolean} [deactivated=false]
         * @returns {string}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.getImagePath = function (imageName, deactivated) {
            if (deactivated === void 0) { deactivated = false; }
            if (deactivated == true) {
                imageName = imageName.replace(".svg", "_deactivated.svg");
            }
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("widgets/traceControlWidget/style/images/" + imageName);
        };
        /**
         * Return true if saveing of trace configuration is possible in the current trace state
         *
         * @private
         * @param {*} state
         * @returns {boolean}
         * @memberof TraceControlWidget
         */
        TraceControlWidget.prototype.saveTraceConfigPossibleInThisState = function (state) {
            if (state == traceConfigDefines_1.TraceStateIds.Disabled || state == traceConfigDefines_1.TraceStateIds.Data_available || state == traceConfigDefines_1.TraceStateIds.Record_failure) {
                return true;
            }
            return false;
        };
        return TraceControlWidget;
    }(widgetBase_1.WidgetBase));
    exports.TraceControlWidget = TraceControlWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb250cm9sV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC90cmFjZUNvbnRyb2xXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBOzs7O09BSUc7SUFDSCxJQUFLLFdBS0o7SUFMRCxXQUFLLFdBQVc7UUFDWixtREFBTyxDQUFBO1FBQ1AsK0RBQWEsQ0FBQTtRQUNiLCtEQUFhLENBQUE7UUFDYiwrREFBYSxDQUFBO0lBQ2pCLENBQUMsRUFMSSxXQUFXLEtBQVgsV0FBVyxRQUtmO0lBRUQ7Ozs7T0FJRztJQUNIO1FBQUE7UUFhQSxDQUFDO1FBWkcsdUJBQXVCO1FBQ1Asb0JBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsc0JBQVUsR0FBRyxhQUFhLENBQUM7UUFDM0IscUJBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsa0NBQXNCLEdBQUcsMEJBQTBCLENBQUM7UUFDcEQsb0NBQXdCLEdBQUcsNEJBQTRCLENBQUM7UUFDeEQsb0NBQXdCLEdBQUcsNEJBQTRCLENBQUM7UUFFeEUseUJBQXlCO1FBQ1QsMkNBQStCLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLDZDQUFpQyxHQUFHLFFBQVEsQ0FBQztRQUM3Qyw2Q0FBaUMsR0FBRyxRQUFRLENBQUM7UUFDakUsa0JBQUM7S0FBQSxBQWJELElBYUM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBQWlDLHNDQUFVO1FBQTNDO1lBQUEscUVBZzJCQztZQXQxQlcsdUJBQWlCLEdBQUcsa0NBQWEsQ0FBQyxRQUFRLENBQUM7WUFFM0MseUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQzVCLHVCQUFpQixHQUFHLEtBQUssQ0FBQztZQUkxQixtQkFBYSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1lBRW5DLGdDQUEwQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtB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MEMsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUNqSCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLCtEQUFrQyxHQUExQyxVQUEyQyxLQUFLO1lBQzVDLElBQUcsS0FBSyxJQUFJLGtDQUFhLENBQUMsUUFBUSxJQUFJLEtBQUssSUFBSSxrQ0FBYSxDQUFDLGNBQWMsSUFBSSxLQUFLLElBQUksa0NBQWEsQ0FBQyxjQUFjLEVBQUM7Z0JBQ2pILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0wseUJBQUM7SUFBRCxDQUFDLEFBaDJCRCxDQUFpQyx1QkFBVSxHQWcyQjFDO0lBRVEsZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb250cm9sV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbnRyb2xXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29tcG9uZW50Q29udHJvbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvaW50ZXJmYWNlcy90cmFjZUNvbnRyb2xQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEb21IZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL2RvbUhlbHBlclwiO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi90aGVtZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEZpbGVQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZmlsZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRyYWNlU3RhdGVJZHMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlQ29uZmlnL3RyYWNlQ29uZmlnRGVmaW5lc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENvbnRleHRJZHNDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29udGV4dElkcy9jb250ZXh0SWRzQ29tcG9uZW50XCI7XHJcblxyXG4vKipcclxuICogTGF5b3V0IHN0eWxlcyBmb3IgZHluYW1pYyBsYXlvdXRcclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gTGF5b3V0U3R5bGV7XHJcbiAgICBEZWZhdWx0LFxyXG4gICAgTWluaW1pemVTdGVwMSxcclxuICAgIE1pbmltaXplU3RlcDIsXHJcbiAgICBNaW5pbWl6ZVN0ZXAzLFxyXG59XHJcblxyXG4vKipcclxuICogVGhlIHRleHRzIGZvciB0aGUgYnV0dG9uc1xyXG4gKlxyXG4gKiBAY2xhc3MgQnV0dG9uVGV4dHNcclxuICovXHJcbmNsYXNzIEJ1dHRvblRleHRze1xyXG4gICAgLy8gRGVmYXVsdCBidXR0b24gdGV4dHNcclxuICAgIHN0YXRpYyByZWFkb25seSBBY3RpdmF0ZSA9IFwiQWN0aXZhdGVcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBGb3JjZVN0YXJ0ID0gXCJGb3JjZSBzdGFydFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEZvcmNlU3RvcCA9IFwiRm9yY2Ugc3RvcFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNhdmVUcmFjZUNvbmZpZ3VyYXRpb24gPSBcIlNhdmUgdHJhY2UgY29uZmlndXJhdGlvblwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbiA9IFwiSW1wb3J0IHRyYWNlIGNvbmZpZ3VyYXRpb25cIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBFeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24gPSBcIkV4cG9ydCB0cmFjZSBjb25maWd1cmF0aW9uXCI7XHJcblxyXG4gICAgLy8gTWluaW1pemVkIGJ1dHRvbiB0ZXh0c1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNhdmVUcmFjZUNvbmZpZ3VyYXRpb25NaW5pbWl6ZWQgPSBcIlNhdmVcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25NaW5pbWl6ZWQgPSBcIkltcG9ydFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbk1pbmltaXplZCA9IFwiRXhwb3J0XCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIFRyYWNlQ29udHJvbFdpZGdldCBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJVHJhY2VDb250cm9sV2lkZ2V0IHtcclxuICAgIHByaXZhdGUgX3N0YXRlRmllbGRJZDtcclxuICAgIHByaXZhdGUgX3N0YXRlSW1hZ2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZhdGVCdXR0b25JZDtcclxuICAgIHByaXZhdGUgX2ZvcmNlU3RhcnRCdXR0b25JZDtcclxuICAgIHByaXZhdGUgX2ZvcmNlU3RvcEJ1dHRvbklkO1xyXG4gICAgcHJpdmF0ZSBfc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkO1xyXG4gICAgcHJpdmF0ZSBfaW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQ7XHJcbiAgICBwcml2YXRlIF9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZDtcclxuICAgIHByaXZhdGUgX2FjdHVhbFRyYWNlU3RhdGUgPSBUcmFjZVN0YXRlSWRzLkRpc2FibGVkO1xyXG5cclxuICAgIHByaXZhdGUgX3NhdmVDb25maWdJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfYWN0aXZhdGVJc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3RyYWNlQ29udHJvbEludGVyZmFjZTogSVRyYWNlQ29tcG9uZW50Q29udHJvbHx1bmRlZmluZWQ7XHJcblx0XHRcclxuICAgIHByaXZhdGUgX2ZpbGVQcm92aWRlciA9IG5ldyBGaWxlUHJvdmlkZXIoKTtcclxuXHRcclxuICAgIHByaXZhdGUgX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uVXBsb2FkRGF0YUZpbmlzaGVkKHNlbmRlcixhcmdzKTtcclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBidXR0b24gd2lkdGggZm9yIGFjdGl2ZSBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgxID0gXCI4NXB4XCI7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBidXR0b24gd2lkdGggZm9yIGZvcmNlIHN0YXJ0L3N0b3AgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGVmYXVsdEJ1dHRvbldpZHRoMiA9IFwiMTAwcHhcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgYnV0dG9uIHdpZHRoIGZvciBzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlnIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgzID0gXCIxOTVweFwiO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltaXplZCBTdGVwIDEgYnV0dG9uIHdpZHRoIGZvciBzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlnIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDEgPSBcIjYwcHhcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltaXplZCBTdGVwIDIgYnV0dG9uIHdpZHRoIGZvciBzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlnIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDIgPSBcIjE2cHhcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgbGVmdCBwb3NpdGlvbiBvZiB0aGUgc2F2ZS9pbXBvcnQvZXhwb3J0IGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9sZWZ0UG9zaXRpb25TdGFydCA9IDczMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgc3BhY2UgYmV0d2VlbiB0aGUgIHNhdmUvaW1wb3J0L2V4cG9ydCBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGVmYXVsdEJ1dHRvblNwYWNlID0gMzU7XHJcbiAgICAgXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHNvbWUgb2JqZWN0cyBmcm9tIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgLy8gRGlzcG9zZSBzdGF0aWMgYnV0dG9uIGFuZCBmaWVsZHNcclxuICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fYWN0aXZhdGVCdXR0b25JZCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95RmllbGQodGhpcy5fc3RhdGVGaWVsZElkKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQpO1xyXG5cclxuICAgICAgICAvLyBEaXNwb3NlIGR5bmFtaWMgYnV0dG9ucyBpZiBhdmFpbGFibGVcclxuICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZClcclxuXHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdEJ1dHRvbkFuZEZpZWxkSWRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlRGl2QnV0dG9uc0FuZEZpZWxkc0xheW91dCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRkU3RhdGljQnV0dG9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGlkcyBmb3IgdGhlIGJ1dHRvbnMgYW5kIGZpZWxkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdEJ1dHRvbkFuZEZpZWxkSWRzKCl7XHJcbiAgICAgICAgbGV0IGxheW91dENvbnRhaW5lcklkID0gdGhpcy5tYWluRGl2SWQ7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVCdXR0b25JZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfYWN0aXZhdGVCdXR0b25cIjtcclxuICAgICAgICB0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX2ZvcmNlU3RhcnRCdXR0b25cIjtcclxuICAgICAgICB0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfZm9yY2VTdG9wQnV0dG9uXCI7XHJcbiAgICAgICAgdGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uXCI7XHJcbiAgICAgICAgdGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25cIjtcclxuICAgICAgICB0aGlzLl9zdGF0ZUZpZWxkSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwidHJhY2Vjb250cm9sX3N0YXRlXCI7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVJbWFnZSA9IGxheW91dENvbnRhaW5lcklkICsgXCJ0cmFjZWNvbnRyb2xfc3RhdGVfaW1hZ2VcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBmb3IgdGhlIGJ1dHRvbnMgYW5kIGZpZWxkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGl2QnV0dG9uc0FuZEZpZWxkc0xheW91dCgpe1xyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS5wYWRkaW5nVG9wID0gXCI0cHhcIjtcclxuICAgICAgICB0aGlzLm1haW5EaXYuc3R5bGUuYmFja2dyb3VuZCA9IFwidmFyKC0tbWFpbi1ncmV5LWRhcmsyKVwiO1xyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSAkKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiAyNXB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX2FjdGl2YXRlQnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSd0b3A6IDEwcHg7IGxlZnQ6IDE1MHB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBjbGFzcz0ndHJhY2VDb250cm9sU3RhdGVJbWFnZScgaWQ9J1wiKyB0aGlzLl9zdGF0ZUltYWdlICtcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0ndG9wOiAxMHB4OyBsZWZ0OiAxODBweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9zdGF0ZUZpZWxkSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiAzNDBweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9mb3JjZVN0YXJ0QnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdsZWZ0OiA0NzVweDsgcG9zaXRpb246IGFic29sdXRlOycgaWQ9J1wiKyB0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCArXCInPjwvZGl2PlwiKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J2xlZnQ6IFwiICsgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMCkgKyBcInB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCArXCInPjwvZGl2PlwiKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcIjxkaXYgc3R5bGU9J2xlZnQ6IFwiICsgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMSkgKyBcInB4OyBwb3NpdGlvbjogYWJzb2x1dGU7JyBpZD0nXCIrIHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkICtcIic+PC9kaXY+XCIpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFwiPGRpdiBzdHlsZT0nbGVmdDogXCIgKyB0aGlzLmdldExlZnRQb3NpdGlvbigyKSArIFwicHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnIGlkPSdcIisgdGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQgK1wiJz48L2Rpdj5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBsZWZ0IHBvc2l0aW9uIG9mIGEgYnV0dG9uIGZvciB0aGUgZ2l2ZW4gTGF5b3V0U3R5bGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICAgKiBAcGFyYW0ge0xheW91dFN0eWxlfSBbbGF5b3V0U3R5bGU9TGF5b3V0U3R5bGUuRGVmYXVsdF1cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TGVmdFBvc2l0aW9uKGluZGV4OiBudW1iZXIsIGxheW91dFN0eWxlOiBMYXlvdXRTdHlsZSA9IExheW91dFN0eWxlLkRlZmF1bHQpOiBudW1iZXJ7XHJcbiAgICAgICAgaWYoaW5kZXggPT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sZWZ0UG9zaXRpb25TdGFydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRCdXR0b25XaWR0aCA9IHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDM7XHJcbiAgICAgICAgICAgIGlmKGxheW91dFN0eWxlID09IExheW91dFN0eWxlLk1pbmltaXplU3RlcDEpe1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEJ1dHRvbldpZHRoID0gdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAxO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihsYXlvdXRTdHlsZSA9PSBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyKXtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRCdXR0b25XaWR0aCA9IHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYnV0dG9uV2lkdGggPSBwYXJzZUludChkZWZhdWx0QnV0dG9uV2lkdGgsIDEwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xlZnRQb3NpdGlvblN0YXJ0ICsgKGluZGV4ICogKGJ1dHRvbldpZHRoICsgdGhpcy5fZGVmYXVsdEJ1dHRvblNwYWNlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgYnV0dG9ucyBhbmQgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTdGF0aWNCdXR0b25zKCl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5fYWN0aXZhdGVCdXR0b25JZCwgQnV0dG9uVGV4dHMuQWN0aXZhdGUsICB0aGlzLmdldEltYWdlUGF0aChcInBsYXkuc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgxKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUZpZWxkKHRoaXMuX3N0YXRlRmllbGRJZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkLCBCdXR0b25UZXh0cy5Gb3JjZVN0YXJ0LCAgdGhpcy5nZXRJbWFnZVBhdGgoXCJyZWNvcmQuc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgyKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCwgQnV0dG9uVGV4dHMuRm9yY2VTdG9wLCAgdGhpcy5nZXRJbWFnZVBhdGgoXCJzdG9wLnN2Z1wiKSwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgdHJhY2UgY29udHJvbCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvdHJhY2VDb250cm9sV2lkZ2V0L3N0eWxlL2Nzcy90cmFjZUNvbnRyb2xTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC9zdHlsZS9jc3MvdHJhY2VDb250cm9sQnV0dG9uU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzL0RlYWN0aXZhdGVzIGEgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWFjdGl2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlYWN0aXZhdGVCdXR0b24oaWQ6IHN0cmluZywgZGVhY3RpdmF0ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdmFyIGVqQnV0dG9uID0gJChcIiNcIisgaWQpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihlakJ1dHRvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLnNldEJ1dHRvbkNzc0NsYXNzKGVqQnV0dG9uLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYnV0dG9uRWxlbWVudCA9ICQoXCIjXCIgKyBpZClbMF07XHJcblxyXG4gICAgICAgIGxldCBpbWFnZVBhdGggPSB0aGlzLmdldEltYWdlUGF0aEZvcklkKGlkLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdcIiArIGltYWdlUGF0aCArXCInKVwiO1xyXG5cclxuICAgICAgICBEb21IZWxwZXIuZGlzYWJsZUVsZW1lbnQoYnV0dG9uRWxlbWVudCwgZGVhY3RpdmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBsYXlvdXQgb2YgdGhlIGJ1dHRvbihlLmcuIHRleHQsIHNpemUsIGxlZnQgcG9zdGlvbilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uVGV4dFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1NpemVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdMZWZ0UG9zaXRpb25cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uTGF5b3V0KGlkOiBzdHJpbmcsIGJ1dHRvblRleHQ6IHN0cmluZywgbmV3U2l6ZTogc3RyaW5nLCBuZXdMZWZ0UG9zaXRpb246IHN0cmluZyl7XHJcbiAgICAgICAgdmFyIGVqQnV0dG9uID0gJChcIiNcIisgaWQpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihlakJ1dHRvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVqQnV0dG9uLm9wdGlvbihcInRleHRcIiwgYnV0dG9uVGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgaWYoYnV0dG9uVGV4dCA9PSBcIlwiKXtcclxuICAgICAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwiY29udGVudFR5cGVcIiwgZWouQ29udGVudFR5cGUuSW1hZ2VPbmx5LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwiY29udGVudFR5cGVcIiwgZWouQ29udGVudFR5cGUuVGV4dEFuZEltYWdlLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWpCdXR0b24ub3B0aW9uKFwid2lkdGhcIiwgbmV3U2l6ZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gJChcIiNcIiArIGlkKVswXTtcclxuICAgICAgICBpZihidXR0b25FbGVtZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUubGVmdCA9IG5ld0xlZnRQb3NpdGlvblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGltYWdlcGF0aCBmb3IgdGhlIGJ1dHRvbiBpZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlYWN0aXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SW1hZ2VQYXRoRm9ySWQoYnV0dG9uSWQ6IHN0cmluZywgZGVhY3RpdmF0ZTogYm9vbGVhbik6IHN0cmluZ3tcclxuICAgICAgICBsZXQgaW1hZ2VQYXRoO1xyXG4gICAgICAgIGlmKGJ1dHRvbklkID09IHRoaXMuX2ZvcmNlU3RhcnRCdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwicmVjb3JkLnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9mb3JjZVN0b3BCdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwic3RvcC5zdmdcIiwgZGVhY3RpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYnV0dG9uSWQgPT0gdGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkKXtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gdGhpcy5nZXRJbWFnZVBhdGgoXCJzYXZlLnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9hY3RpdmF0ZUJ1dHRvbklkKXtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gdGhpcy5nZXRJbWFnZVBhdGgoXCJwbGF5LnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwiaW1wb3J0LnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihidXR0b25JZCA9PSB0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCl7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IHRoaXMuZ2V0SW1hZ2VQYXRoKFwiZXhwb3J0LnN2Z1wiLCBkZWFjdGl2YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGltYWdlUGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIEJ1dHRvbiBjc3Mgc3R5bGVzIGZvciBhY3RpdmF0ZWQgb3IgZGVhY3RpdmF0ZWQgc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlakJ1dHRvblxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWFjdGl2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uQ3NzQ2xhc3MoZWpCdXR0b24sIGRlYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGRlYWN0aXZhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGVqQnV0dG9uLm9wdGlvbihcImNzc0NsYXNzXCIsIFwidHJhY2VDb250cm9sQnV0dG9uRGVhY3RpdmF0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGVqQnV0dG9uLm9wdGlvbihcImNzc0NsYXNzXCIsIFwidHJhY2VDb250cm9sQnV0dG9uXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBidXR0b24gd2l0aCB0aGUgZ2l2ZW4gdGV4dCBhbmQgaW1hZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VQYXRoXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQnV0dG9uKGlkOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgaW1hZ2VQYXRoOiBzdHJpbmcsIHdpZHRoKXtcclxuICAgICAgICAoPGFueT4kKFwiI1wiICsgaWQpKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5UZXh0QW5kSW1hZ2UsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcInRyYWNlQ29udHJvbEJ1dHRvblwiLFxyXG4gICAgICAgICAgICBwcmVmaXhJY29uOiBcImUtaWNvblwiLCAvL1NwZWNpZmllcyB0aGUgcHJpbWFyeSBpY29uIGZvciBCdXR0b25cclxuICAgICAgICAgICAgY2xpY2s6IChjbGlja0FyZ3MpID0+IHRoaXMuY2xpY2soaWQpLFxyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gJChcIiNcIiArIGlkKVswXTtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblggPSBcIjRweFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IFwiNHB4XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnXCIgKyBpbWFnZVBhdGggK1wiJylcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSBcIm5vLXJlcGVhdFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjE2cHggMTZweFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzdHJveXMgdGhlIGJ1dHRvbiBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXN0cm95QnV0dG9uKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBidXR0b24gPSAkKFwiI1wiICsgaWQpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihidXR0b24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYnV0dG9uLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJhY2Ugc3RhdGUgZmllbGQgKGN1cnJlbnRseSBhIHNwZWNpYWwgYnV0dG9uIGlzIHVzZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRmllbGQoaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgKDxhbnk+JChcIiNcIiArIGlkKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiBcIjBcIixcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGVqLkNvbnRlbnRUeXBlLlRleHRPbmx5LFxyXG4gICAgICAgICAgICBjc3NDbGFzczogXCJ0cmFjZVN0YXRlQnV0dG9uXCIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBmaWVsZEVsZW1lbnQgPSAkKFwiI1wiICsgaWQpWzBdO1xyXG4gICAgICAgIGlmKGZpZWxkRWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBmaWVsZEVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiNGRkZGRkZcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95cyB0aGUgZmllbGQgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVzdHJveUZpZWxkKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBmaWVsZCA9ICQoXCIjXCIgKyBpZCkuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmKGZpZWxkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZpZWxkLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemVzIHRoZSB0cmFjZSBjb250cm9sIHdpZGdldFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcblxyXG4gICAgICAgIHRoaXMubWFpbkRpdi5zdHlsZS53aWR0aCA9IHdpZHRoLnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy5tYWluRGl2LnN0eWxlLmhlaWdodCA9IGhlaWdodC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXBkYXRlRHluYW1pY0xheW91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZHluYW1pYyBsYXlvdXQgKGUuZy4gc21hbGxlciBidXR0b25zIGlmIHNtYWxsIHdpZGdldCBzaXplKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlRHluYW1pY0xheW91dCgpe1xyXG4gICAgICAgIGxldCBuZWVkZWRTaXplRm9yRGVmYXVsdExheW91dCA9IDE0MDA7XHJcbiAgICAgICAgbGV0IG5lZWRlZFNpemVGb3JNaW5pbXplZExheW91dFN0ZXAxID0gMTAwMDtcclxuICAgICAgICBpZih0aGlzLl9hY3R1YWxXaWR0aCA+IG5lZWRlZFNpemVGb3JEZWZhdWx0TGF5b3V0KXtcclxuICAgICAgICAgICAgdGhpcy5zZXRMYXlvdXQoTGF5b3V0U3R5bGUuRGVmYXVsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5fYWN0dWFsV2lkdGggPiBuZWVkZWRTaXplRm9yTWluaW16ZWRMYXlvdXRTdGVwMSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TGF5b3V0KExheW91dFN0eWxlLk1pbmltaXplU3RlcDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNldExheW91dChMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBkeW5hbWljIGxheW91dCB0byBhIGRlZmluZWQgbGF5b3V0IHN0eWxlIChlLmcuIGRlZmF1bHQgb3IgbWluaW1pemVkKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0xheW91dFN0eWxlfSBsYXlvdXRTdHlsZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldExheW91dChsYXlvdXRTdHlsZTogTGF5b3V0U3R5bGUpe1xyXG4gICAgICAgIHN3aXRjaChsYXlvdXRTdHlsZSl7XHJcbiAgICAgICAgICAgIGNhc2UgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBcIlwiLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDIsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDAsIExheW91dFN0eWxlLk1pbmltaXplU3RlcDIpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBcIlwiLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDIsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDEsIExheW91dFN0eWxlLk1pbmltaXplU3RlcDIpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBcIlwiLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDIsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDIsIExheW91dFN0eWxlLk1pbmltaXplU3RlcDIpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5TYXZlVHJhY2VDb25maWd1cmF0aW9uTWluaW1pemVkLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzTWluaW1pemVkU3RlcDEsIHRoaXMuZ2V0TGVmdFBvc2l0aW9uKDAsIExheW91dFN0eWxlLk1pbmltaXplU3RlcDEpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCBCdXR0b25UZXh0cy5JbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb25NaW5pbWl6ZWQsIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDNNaW5pbWl6ZWRTdGVwMSwgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMSwgTGF5b3V0U3R5bGUuTWluaW1pemVTdGVwMSkgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5fZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLkV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbk1pbmltaXplZCwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoM01pbmltaXplZFN0ZXAxLCB0aGlzLmdldExlZnRQb3NpdGlvbigyLCBMYXlvdXRTdHlsZS5NaW5pbWl6ZVN0ZXAxKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIExheW91dFN0eWxlLkRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uTGF5b3V0KHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuU2F2ZVRyYWNlQ29uZmlndXJhdGlvbiwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMywgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMCkgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25MYXlvdXQodGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLkltcG9ydFRyYWNlQ29uZmlndXJhdGlvbiwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMywgdGhpcy5nZXRMZWZ0UG9zaXRpb24oMSkgK1wicHhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvbkxheW91dCh0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzLCB0aGlzLmdldExlZnRQb3NpdGlvbigyKSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGFuZCBkZWZpbmVzIHRoZSBpbnRlcmZhY2UgdG8gdGhlIHRyYWNlIGNvbnRyb2xcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDb21wb25lbnRDb250cm9sfSB0cmFjZUNvbXBvbmVudENvbnRyb2xcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUcmFjZUNvbnRyb2xJbnRlcmZhY2UodHJhY2VDb21wb25lbnRDb250cm9sOiBJVHJhY2VDb21wb25lbnRDb250cm9sKSB7XHJcbiAgICAgICAgaWYodGhpcy5jb21wb25lbnQuY29udGV4dD8uZ2V0Q29udGV4dChDb250ZXh0SWRzQ29tcG9uZW50LlZpZXdDb21wb25lbnRUeXBlSWQpID09IFwiVHJhY2VWaWV3V2lkZ2V0XCIpe1xyXG4gICAgICAgICAgICB0cmFjZUNvbXBvbmVudENvbnRyb2wgPSB0aGlzLmdldEludGVyZmFjZVdpdGhvdXRTYXZlQ29tbWFuZCh0cmFjZUNvbXBvbmVudENvbnRyb2wpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UgPSB0cmFjZUNvbXBvbmVudENvbnRyb2w7XHJcbiAgICAgICAgaWYodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKXtcclxuICAgICAgICAgICAgdGhpcy5hZGREeW5hbWljQnV0dG9uc0ZvckF2YWlsYWJsZUNvbW1hbmRzKHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJhY2VTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyYWNlIGNvbXBvbmVudCBjb250cm9sIHdpdGggb3V0IHRoZSBzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlndXJhdGlvbiBjb21tYW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ29tcG9uZW50Q29udHJvbH0gdHJhY2VDb21wb25lbnRDb250cm9sXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgIHByaXZhdGUgZ2V0SW50ZXJmYWNlV2l0aG91dFNhdmVDb21tYW5kKHRyYWNlQ29tcG9uZW50Q29udHJvbDogSVRyYWNlQ29tcG9uZW50Q29udHJvbCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tbWFuZEFjdGl2YXRlOiB0cmFjZUNvbXBvbmVudENvbnRyb2wuY29tbWFuZEFjdGl2YXRlLFxyXG4gICAgICAgICAgICBjb21tYW5kRm9yY2VTdGFydDogdHJhY2VDb21wb25lbnRDb250cm9sLmNvbW1hbmRGb3JjZVN0YXJ0LFxyXG4gICAgICAgICAgICBjb21tYW5kRm9yY2VTdG9wOiB0cmFjZUNvbXBvbmVudENvbnRyb2wuY29tbWFuZEZvcmNlU3RvcCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRyYWNlIHN0YXRlIGluZm8gdG8gbGF5b3V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUcmFjZVN0YXRlKCl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVGaWVsZCh0aGlzLl9zdGF0ZUZpZWxkSWQpO1xyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hUcmFjZUNvbnRyb2xQYXJhbWV0ZXJWYWx1ZSh0aGlzLl9hY3R1YWxUcmFjZVN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGR5bmFtaWMgYnV0dG9ucyAoc2F2ZS9pbXBvcnQvZXhwb3J0IHRyYWNlIGNvbmZpZ3VhdGlvbikgaWYgY29tbWFuZCBpcyBhdmFpbGFibGUgaW4gY29tbWFuZCBpbnRlcmZhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjb21tYW5kc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcblxyXG4gICAgcHJpdmF0ZSBhZGREeW5hbWljQnV0dG9uc0ZvckF2YWlsYWJsZUNvbW1hbmRzKGNvbW1hbmRzKXtcclxuICAgICAgICBpZihjb21tYW5kcy5jb21tYW5kU2F2ZUNvbmZpZ3VyYXRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLl9zYXZlVHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLlNhdmVUcmFjZUNvbmZpZ3VyYXRpb24sIHRoaXMuZ2V0SW1hZ2VQYXRoKFwic2F2ZS5zdmdcIiksIHRoaXMuX2RlZmF1bHRCdXR0b25XaWR0aDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjb21tYW5kcy5jb21tYW5kSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5faW1wb3J0VHJhY2VDb25maWd1cmF0aW9uQnV0dG9uSWQsIEJ1dHRvblRleHRzLkltcG9ydFRyYWNlQ29uZmlndXJhdGlvbiwgIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiaW1wb3J0LnN2Z1wiKSwgdGhpcy5fZGVmYXVsdEJ1dHRvbldpZHRoMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNvbW1hbmRzLmNvbW1hbmRFeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLl9leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgQnV0dG9uVGV4dHMuRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uLCAgdGhpcy5nZXRJbWFnZVBhdGgoXCJleHBvcnQuc3ZnXCIpLCB0aGlzLl9kZWZhdWx0QnV0dG9uV2lkdGgzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBVcGRhdGUgbGF5b3V0IGFmdGVyIGFkZGluZyBuZXcgYnV0dG9uc1xyXG4gICAgICAgIHRoaXMudXBkYXRlRHluYW1pY0xheW91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBjYWxsZWQgd2hlbiBhIGJ1dHRvbiB3YXMgY2xpY2tlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGJ1dHRvbklkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xpY2soYnV0dG9uSWQpe1xyXG5cclxuICAgICAgICBzd2l0Y2goYnV0dG9uSWQpe1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuX2FjdGl2YXRlQnV0dG9uSWQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVBY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkOiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVGb3JjZVN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSB0aGlzLl9mb3JjZVN0b3BCdXR0b25JZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUZvcmNlU3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlU2F2ZUNvbmZpZ3VyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuX2ltcG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuX2V4cG9ydFRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2YXRlcyB0aGUgdHJhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4ZWN1dGVBY3RpdmF0ZSgpe1xyXG4gICAgICAgIC8vIGludm9rZSBhY3RpdmF0ZSB0cmFjZSBieSB1c2luZyBhIGNvbXBvbmVudCBjb21tYW5kXHJcbiAgICAgICAgaWYodGhpcy5fc2F2ZUNvbmZpZ0lzQWN0aXZlID09IGZhbHNlKXsgIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZhdGVJc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGVzKHRoaXMuX2FjdHVhbFRyYWNlU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZVRyYWNlKCk7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZVRyYWNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlLmNvbW1hbmRBY3RpdmF0ZS5leGVjdXRlKG51bGwsKHJlc3VsdCkgPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVHJhY2VBY3RpdmF0ZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRyYWNlIGFjdGl2YXRpb24gcmVzcG9uc2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVHJhY2VBY3RpdmF0ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGVzKHRoaXMuX2FjdHVhbFRyYWNlU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyB0cmFjZSBzdGF0ZSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFjZVN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25UcmFjZVN0YXRlQ2hhbmdlZCh0cmFjZVN0YXRlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9hY3R1YWxUcmFjZVN0YXRlID0gdHJhY2VTdGF0ZTsgXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVHJhY2VDb250cm9sUGFyYW1ldGVyVmFsdWUodHJhY2VTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JjZXMgc3RhcnRpbmcgdGhlIHRyYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlRm9yY2VTdGFydCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RhcnRfdHJpZ2dlcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UuY29tbWFuZEZvcmNlU3RhcnQuZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9yY2VzIHN0b3BwaW5nIHRoZSB0cmFjZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUZvcmNlU3RvcCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RvcF9ldmVudCl7IC8vIE9ubHkgd2hpbGUgcnVubmluZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlLmNvbW1hbmRGb3JjZVN0b3AuZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZXMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gb24gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlU2F2ZUNvbmZpZ3VyYXRpb24oKXtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2F2ZVRyYWNlQ29uZmlnUG9zc2libGVJblRoaXNTdGF0ZSh0aGlzLl9hY3R1YWxUcmFjZVN0YXRlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYXZlQ29uZmlnSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZXModGhpcy5fYWN0dWFsVHJhY2VTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UuY29tbWFuZFNhdmVDb25maWd1cmF0aW9uLmV4ZWN1dGUobnVsbCwocmVzdWx0KSA9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYXZlQ29uZmlnSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlcyh0aGlzLl9hY3R1YWxUcmFjZVN0YXRlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbnMgYSBmaWxlIHNlbGVjdCBkaWFsb2cgYW5kIGltcG9ydHMgYSB0cmFjZSBjb25maWd1cmF0aW9uIGZyb20gdGhlIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGltcG9ydFRyYWNlQ29uZmlndXJhdGlvbigpe1xyXG4gICAgICAgIHRoaXMuX2ZpbGVQcm92aWRlci5ldmVudFVwbG9hZERhdGFGaW5pc2hlZC5hdHRhY2godGhpcy5fdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fZmlsZVByb3ZpZGVyLnVwbG9hZERhdGEoXCIudHJhY2VjZmdcIik7IC8vIE9ubHkgc2hvdy9hY2NlcHQgKi50cmFjZWNmZyBmaWxlc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhwb3J0IGEgdHJhY2UgY29uZmlndXJhdGlvbiB0byBhIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbigpe1xyXG5cclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xJbnRlcmZhY2UhLmNvbW1hbmRFeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24uZXhlY3V0ZShudWxsLChyZXN1bHQpID0+e1xyXG4gICAgICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtyZXN1bHRdLCB7IHR5cGU6IFwidGV4dC94bWxcIiB9KTtcclxuICAgICAgICAgICAgRmlsZVByb3ZpZGVyLmRvd25sb2FkRGF0YShcIlRyYWNlQ29uZmkudHJhY2VjZmdcIiwgYmxvYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9ICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9jY3VycyBhZnRlciByZWFkaW5nIGRhdGEgZnJvbSBmaWxlKHRyYWNlIGNvbmZpZ3VyYXRpb24gaW1wb3J0IGRhdGEpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblVwbG9hZERhdGFGaW5pc2hlZChzZW5kZXI6IEhUTUxJbnB1dEVsZW1lbnQsIGFyZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz4pe1xyXG5cdFx0Lyp0aGlzLnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiSW1wb3J0aW5nIGRhdGEuLi5cIiwgSW1hZ2VJZC5kZWZhdWx0SW1hZ2UsIDQ4LCB0cnVlKSk7XHJcblx0XHR0aGlzLnNldEJ1c3kodHJ1ZSk7Ki9cclxuXHRcdFxyXG5cdFx0Ly8gVGltZW91dCBuZWVkZWQgdG8gc2hvdyB0aGUgYnVzeXNjcmVlbiBiZWZvcmUgaW1wb3J0aW5nIGRhdGEgXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHRoaXMuaW1wb3J0RGF0YShzZW5kZXIsIGFyZ3MpLCAyMDApO1xyXG5cclxuXHRcdHRoaXMuX2ZpbGVQcm92aWRlci5ldmVudFVwbG9hZERhdGFGaW5pc2hlZC5kZXRhY2godGhpcy5fdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG5cdCAqIGltcG9ydHMgdGhlIGdpdmVuIGZpbGVkYXRhIHdpdGggdGhlIGdpdmVuIGZpbGVuYW1lXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZmlsZUlucHV0RWxlbWVudFxyXG5cdCAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gZmlsZUNvbnRlbnRzXHJcblx0ICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW1wb3J0RGF0YShmaWxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50LCBmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGZpbGVDb250ZW50cy5zaXplID09PSAxKXtcclxuICAgICAgICAgICAgbGV0IGZpbGVkYXRhID0gZmlsZUNvbnRlbnRzLnZhbHVlcygpLm5leHQoKS52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlIS5jb21tYW5kSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uLmV4ZWN1dGUoZmlsZWRhdGEsKHJlc3VsdCkgPT57XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVmcmVzaGVzIHRoZSB0cmFjZSBzdGF0ZSAoZGlzcGxheW5hbWUgb2YgdmFsdWUgYW5kIHRoZSBzdGF0ZSBpY29uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB0cmFjZUNvbnRyb2xQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoVHJhY2VDb250cm9sUGFyYW1ldGVyVmFsdWUodHJhY2VTdGF0ZTogc3RyaW5nKSB7ICAgXHJcbiAgICAgICAgdGhpcy5zZXRUcmFjZVN0YXRlVGV4dCh0cmFjZVN0YXRlKTtcclxuICAgICAgICB0aGlzLnNldFRyYWNlU3RhdGVJbWFnZSh0cmFjZVN0YXRlKTtcclxuICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlcyh0cmFjZVN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgZGlzcGxheSBuYW1lIGZvciB0aGUgdHJhY2Ugc3RhdGUgaW4gdGhlIHZpc3VhbGl6YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYWNlU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRUcmFjZVN0YXRlVGV4dCh0cmFjZVN0YXRlOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vIEdldCBkaXNwbGF5IG5hbWUgZm9yIHRoZSB0cmFjZSBzdGF0ZVxyXG4gICAgICAgIGxldCB0cmFjZVN0YXRlRGlzcGxheVRleHQgPSBcIkluYWN0aXZlXCI7XHJcbiAgICAgICAgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkNvbmZpZ19wcm9jZXNzaW5nIHx8IHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5Db25maWdfYXBwbGllZCl7XHJcbiAgICAgICAgICAgIHRyYWNlU3RhdGVEaXNwbGF5VGV4dCA9IFwiQXBwbHlpbmcgY29uZmlndXJhdGlvblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5XYWl0X3N0YXJ0X3RyaWdnZXIpe1xyXG4gICAgICAgICAgICB0cmFjZVN0YXRlRGlzcGxheVRleHQgPSBcIldhaXQgZm9yIHN0YXJ0IHRyaWdnZXJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuV2FpdF9zdG9wX2V2ZW50KXtcclxuICAgICAgICAgICAgdHJhY2VTdGF0ZURpc3BsYXlUZXh0ID0gXCJSdW5uaW5nXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkRhdGFfYXZhaWxhYmxlKXtcclxuICAgICAgICAgICAgdHJhY2VTdGF0ZURpc3BsYXlUZXh0ID0gXCJEYXRhIGF2YWlsYWJsZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5SZWNvcmRfZmFpbHVyZSl7XHJcbiAgICAgICAgICAgIHRyYWNlU3RhdGVEaXNwbGF5VGV4dCA9IFwiUmVjb3JkIGZhaWxlZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgZGlzcGxheSBuYW1lIGZvciB0aGUgdHJhY2Ugc3RhdGVcclxuICAgICAgICAoPGFueT4kKFwiI1wiICsgdGhpcy5fc3RhdGVGaWVsZElkKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiAgdHJhY2VTdGF0ZURpc3BsYXlUZXh0LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhbiBpbWFnZSBmb3IgdGhlIHRyYWNlIHN0YXRlIGluIHRoZSB2aXN1YWxpemF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFjZVN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0VHJhY2VTdGF0ZUltYWdlKHRyYWNlU3RhdGU6c3RyaW5nKXtcclxuICAgICAgICAvLyBHZXQgaW1hZ2UgZm9yIHRoZSB0cmFjZSBzdGF0ZVxyXG4gICAgICAgIGxldCBpbWFnZXBhdGggPSAgdGhpcy5nZXRJbWFnZVBhdGgoXCJpbmFjdGl2ZS5zdmdcIik7XHJcbiAgICAgICAgaWYodHJhY2VTdGF0ZSA9PVRyYWNlU3RhdGVJZHMuV2FpdF9zdGFydF90cmlnZ2VyKXsgXHJcbiAgICAgICAgICAgIGltYWdlcGF0aCA9ICB0aGlzLmdldEltYWdlUGF0aChcIndhaXRfc3RhcnRfdHJpZ2dlci5zdmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RvcF9ldmVudCl7XHJcbiAgICAgICAgICAgIGltYWdlcGF0aCA9ICB0aGlzLmdldEltYWdlUGF0aChcIndhaXRfc3RvcF9ldmVudC5zdmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLkRhdGFfYXZhaWxhYmxlKXtcclxuICAgICAgICAgICAgaW1hZ2VwYXRoID0gIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiZGF0YV9hdmFpbGFibGUuc3ZnXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0IGltYWdlIGZvciB0aGUgdHJhY2Ugc3RhdGVcclxuICAgICAgICBsZXQgaW1hZ2VFbGVtZW50ID0gJChcIiNcIiArIHRoaXMuX3N0YXRlSW1hZ2UpWzBdO1xyXG4gICAgICAgIGlmKGltYWdlRWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpbWFnZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ1wiICsgaW1hZ2VwYXRoICtcIicpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc3RhdGVzKGVuYWJsZWQvZGlzYWJsZWQpIG9mIHRoZSBidXR0b25zIGZvciB0aGUgZ2l2ZW4gdHJhY2Ugc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYWNlU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRCdXR0b25TdGF0ZXModHJhY2VTdGF0ZTogc3RyaW5nKXtcclxuICAgICAgICBpZih0cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuV2FpdF9zdGFydF90cmlnZ2VyKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZUluV2FpdFN0YXJ0VHJpZ2dlclN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHJhY2VTdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLldhaXRfc3RvcF9ldmVudCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGVJbldhaXRTdG9wRXZlbnRTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNhdmVUcmFjZUNvbmZpZ1Bvc3NpYmxlSW5UaGlzU3RhdGUodHJhY2VTdGF0ZSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlQnV0dG9uKHRoaXMuX3NhdmVUcmFjZUNvbmZpZ3VyYXRpb25CdXR0b25JZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG90aGVyIHN0YXRlID0+IGRlYWN0aXZhdGUgZm9yY2Ugc3RhcnQgdHJpZ2dlciBhbmQgZm9yY2Ugc3RvcCBldmVudFxyXG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlQnV0dG9uKHRoaXMuX2ZvcmNlU3RvcEJ1dHRvbklkLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBhY3RpdmF0ZSBidXR0b24gc3RhdGVcclxuICAgICAgICAgICAgaWYodGhpcy5fYWN0aXZhdGVJc0FjdGl2ZSA9PSBmYWxzZSAmJiB0aGlzLl9zYXZlQ29uZmlnSXNBY3RpdmUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlQnV0dG9uKHRoaXMuX2FjdGl2YXRlQnV0dG9uSWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlQnV0dG9uKHRoaXMuX2FjdGl2YXRlQnV0dG9uSWQsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGJ1dHRvbiBzdGF0ZXMgaWYgdGhlIHRyYWNlIHN0YXRlIGlzIHdhaXRpbmcgZm9yIHN0YXJ0IHRyaWdnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEJ1dHRvblN0YXRlSW5XYWl0U3RhcnRUcmlnZ2VyU3RhdGUoKXtcclxuICAgICAgICAvLyBXYWl0IGZvciBzdGFydCB0cmlnZ2VyID0+IGFjdGl2YXRlIGZvcmNlIHN0YXJ0OyBkZWFjdGl2YXRlIGZvcmNlIHN0b3AgZXZlbnRcclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlQnV0dG9uKHRoaXMuX2ZvcmNlU3RvcEJ1dHRvbklkLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGJ1dHRvbiBzdGF0ZXMgaWYgdGhlIHRyYWNlIHN0YXRlIGlzIHdhaXRpbmcgZm9yIHRoZSBzdG9wIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRCdXR0b25TdGF0ZUluV2FpdFN0b3BFdmVudFN0YXRlKCl7XHJcbiAgICAgICAgLy8gUnVubmluZyA9PiBkZWFjdGl2YXRlIGZvcmNlIHN0YXJ0IHRyaWdnZXI7IGFjdGl2YXRlIGZvcmNlIHN0b3AgZXZlbnRcclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fZm9yY2VTdGFydEJ1dHRvbklkLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fZm9yY2VTdG9wQnV0dG9uSWQsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVCdXR0b24odGhpcy5fc2F2ZVRyYWNlQ29uZmlndXJhdGlvbkJ1dHRvbklkLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGltYWdlUGF0aCBmb3IgdGhlIGdpdmVuIGltYWdlTmFtZSBhbmQgc3RhdGUoYWN0aXZhdGVkL2RlYWN0aXZhdGVkKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VOYW1lXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWFjdGl2YXRlZD1mYWxzZV1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SW1hZ2VQYXRoKGltYWdlTmFtZTogc3RyaW5nLCBkZWFjdGl2YXRlZDogYm9vbGVhbiA9IGZhbHNlKTpzdHJpbmd7XHJcbiAgICAgICAgaWYoZGVhY3RpdmF0ZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGltYWdlTmFtZSA9IGltYWdlTmFtZS5yZXBsYWNlKFwiLnN2Z1wiLCBcIl9kZWFjdGl2YXRlZC5zdmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBUaGVtZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGhlbWVkRmlsZVBhdGgoXCJ3aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC9zdHlsZS9pbWFnZXMvXCIgKyBpbWFnZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgc2F2ZWluZyBvZiB0cmFjZSBjb25maWd1cmF0aW9uIGlzIHBvc3NpYmxlIGluIHRoZSBjdXJyZW50IHRyYWNlIHN0YXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3RhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNhdmVUcmFjZUNvbmZpZ1Bvc3NpYmxlSW5UaGlzU3RhdGUoc3RhdGUpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHN0YXRlID09IFRyYWNlU3RhdGVJZHMuRGlzYWJsZWQgfHwgc3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5EYXRhX2F2YWlsYWJsZSB8fCBzdGF0ZSA9PSBUcmFjZVN0YXRlSWRzLlJlY29yZF9mYWlsdXJlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVHJhY2VDb250cm9sV2lkZ2V0IH07Il19