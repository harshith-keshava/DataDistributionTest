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
define(["require", "exports", "../common/widgetBase", "../tabWidget/interfaces/tabWidgetInterface", "../common/viewTypeProvider", "../common/busyInformation", "../common/alertDialog", "../../common/persistence/persistDataController", "../../common/persistence/persistDataProvider", "./componentDefaultDefinition"], function (require, exports, widgetBase_1, tabWidgetInterface_1, viewTypeProvider_1, busyInformation_1, alertDialog_1, persistDataController_1, persistDataProvider_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MappCockpitWidget = /** @class */ (function (_super) {
        __extends(MappCockpitWidget, _super);
        function MappCockpitWidget() {
            // Names of the different views
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.StartViewName = "StartView";
            _this.ComponentsViewName = "ComponentsView";
            _this.TraceViewName = "TraceView";
            _this.ToolsViewName = "ToolsView";
            _this._sideBarWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._componentOverviewOpenViewHandler = function (sender, args) { return _this.onComponentOverviewWidgetOpenView(sender, args); };
            _this._traceOverviewOpenViewHandler = function (sender, args) { return _this.onTraceOverviewWidgetOpenView(sender, args); };
            _this._toolsOverviewOpenViewHandler = function (sender, args) { return _this.onToolsOverviewWidgetOpenView(sender, args); };
            _this._mainModelConnectionChangedHandler = function (sender, connected) { return _this.connectionChanged(sender, connected); };
            /**
             * Eventhandler for persist data controller events
             *
             * @private
             * @memberof MappCockpitWidget
             */
            _this._persistDataControllerNotificationHandler = function (sender, eventArgs) { _this.persistDataControllerNotificationHandler(sender, eventArgs); };
            return _this;
        }
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            // create the start page
            this.addStartPageWidget();
            // Connects PersistDataController with the default storage 
            this.initPersistDataController();
        };
        /**
         * Connects to the main datamodel
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.connectMainDataModel = function () {
            // connect the main data model
            this.dataModel = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.MappCockpitDataModelId);
            if (this.dataModel != undefined) {
                var mainDataModel = this.dataModel;
                var mainMappCockpitModel = mainDataModel.dataSource;
                // wait for successfull connection
                mainMappCockpitModel.eventModelConnectionChanged.attach(this._mainModelConnectionChangedHandler);
                // connect the main model
                mainMappCockpitModel.connect();
            }
            else {
                console.error("mappCockpit datamodel not available!");
            }
        };
        /**
         * Initialize to the persist data controller with the default storage
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.initPersistDataController = function () {
            // Create persist data controller
            this._persistDataController = new persistDataController_1.PersistDataController(persistDataProvider_1.PersistDataProvider.getInstance());
            // Handle events when connected or data loaded
            this._persistDataController.eventNotification.attach(this._persistDataControllerNotificationHandler);
            // Connect persist data controller with default storage
            this._persistDataController.connect();
        };
        /**
         * Handles the persist data controller storage connected event
         *
         * @private
         * @param {*} sender
         * @param {PersistDataControllerEventNotificationType} eventArgs
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.persistDataControllerNotificationHandler = function (sender, eventArgs) {
            if (eventArgs == persistDataController_1.PersistDataControllerEventNotificationType.connected) {
                // Connection done -> load data from default storage
                if (this._persistDataController != undefined) {
                    this._persistDataController.loadData();
                }
            }
            else if (eventArgs == persistDataController_1.PersistDataControllerEventNotificationType.dataLoaded) {
                // Detach _persistDataController events
                if (this._persistDataController != undefined) {
                    this._persistDataController.eventNotification.detach(this._persistDataControllerNotificationHandler);
                }
                // Data loaded from default storage -> start loading the mainDataModel(rest of the mappCockpit)
                this.connectMainDataModel();
            }
        };
        /**
         * Initializes the component
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Dispose this widget
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.dispose = function () {
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.sideBarWidget.eventWidgetActivated.detach(this._sideBarWidgetActivatedHandler);
                this._mainNavigationWidget.dataModel.dispose();
                this._mainNavigationWidget.dispose();
            }
            if (this._toolsOverviewWidget != undefined) {
                this._toolsOverviewWidget.eventOpenView.detach(this._toolsOverviewOpenViewHandler);
            }
            if (this._traceOverviewWidget != undefined) {
                this._traceOverviewWidget.eventOpenView.detach(this._traceOverviewOpenViewHandler);
            }
            if (this._componentOverviewWidget != undefined) {
                this._componentOverviewWidget.eventOpenView.detach(this._componentOverviewOpenViewHandler);
            }
            var mainDataModel = this.dataModel;
            if (mainDataModel != undefined) {
                var mainMappCockpitModel = mainDataModel.dataSource;
                if (mainMappCockpitModel != undefined) {
                    mainMappCockpitModel.eventModelConnectionChanged.detach(this._mainModelConnectionChangedHandler);
                }
            }
            _super.prototype.dispose.call(this);
        };
        /**
         *
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createLayout = function () {
            this._mainNavigationWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.MainNavigationWidgetId);
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.initialize();
                // add widget to the parent container
                this._mainNavigationWidget.addToParentContainer(this.mainDiv);
                this._mainNavigationWidget.dataModel = this.dataModel;
                this._mainNavigationWidget.sideBarWidget.eventWidgetActivated.attach(this._sideBarWidgetActivatedHandler);
            }
            this.resize(window.innerWidth, window.innerHeight);
            // Init AlertBox
            new alertDialog_1.AlertDialog();
        };
        /**
         *
         *
         * @param {number} width
         * @param {number} height
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.resize(width, height);
            }
        };
        /**
         * Load the style informations for the widget
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonStyleVariables.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/defaultScrollbarStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonToolbarStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/alertBoxStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/dragDropStyle.css");
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
        };
        MappCockpitWidget.prototype.connectionChanged = function (sender, connected) {
            if (connected) {
                this.onMainModelConnected(sender);
            }
            else {
                this.onMainModelDisconnected();
            }
        };
        /**
         * Called after the main model has been connected
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainMappCockpitModel
         * @returns
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onMainModelConnected = function (mainMappCockpitModel) {
            console.log("MappCockpitWidget.onMainModelConnected()");
            try {
                // force changing to anonymous to trigger the events for updating the ui state.
                this.changeUserToAnonymous();
                var loginWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.LoginWidgetId);
                if (loginWidget != undefined) {
                    loginWidget.loginInterface = { commandChangeUser: mainMappCockpitModel.commandChangeUser };
                    this._mainNavigationWidget.sideBarWidget.addWidget(loginWidget, "loginWidget", viewTypeProvider_1.ViewType.User, viewTypeProvider_1.ViewTypeProvider.getInstance().getIconByViewType(viewTypeProvider_1.ViewType.User));
                }
                this.addContentWidgets();
            }
            catch (error) {
                console.error(error);
            }
            this._mainNavigationWidget.selectTab(this.StartViewName, "Startpage", viewTypeProvider_1.ViewType.Overview);
        };
        /**
         * Called after the main model has been disconnected
         *
         * @private
         * @returns {*}
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onMainModelDisconnected = function () {
            console.log("MappCockpitWidget.onMainModelDisconnected()");
            this.setBusyInformation(new busyInformation_1.BusyInformation("Connection to server is lost!<br/>&nbsp;Refresh page to reconnect.", busyInformation_1.ImageId.disconnectedImage));
            this.setBusy(true);
        };
        /**
         * Creates the content widgets
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.addContentWidgets = function () {
            this.addComponentOverviewWidget();
            this.addTraceOverviewWidget();
            this.addToolsOverviewWidget();
            //this.addDummyWidget();
        };
        /**
         * Add the start page widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.addStartPageWidget = function () {
            var startPageWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.StartPageWidgetId);
            if (startPageWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab(this.StartViewName, "widgets/mappCockpitWidget/style/images/Areas/StartPageArea.svg");
                this._mainNavigationWidget.addWidget(startPageWidget, "Startpage", viewTypeProvider_1.ViewType.Overview, { parent: this.StartViewName, widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
                this._mainNavigationWidget.selectTab(this.StartViewName, "Startpage", viewTypeProvider_1.ViewType.Overview);
            }
        };
        MappCockpitWidget.prototype.addDummyWidget = function () {
            var dummyWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.DummyWidgetId);
            if (dummyWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("DummyView", "widgets/mappCockpitWidget/style/images/Areas/ToolsArea.svg");
                this._mainNavigationWidget.addWidget(dummyWidget, "DummyWidget", viewTypeProvider_1.ViewType.Overview, { parent: "DummyView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
            }
        };
        /**
         * Adds the component overview widget to the main navigation
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.addComponentOverviewWidget = function () {
            this._componentOverviewWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ComponentOverviewWidgetId);
            if (this._componentOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab(this.ComponentsViewName, "widgets/mappCockpitWidget/style/images/Areas/ComponentArea.svg");
                // add overview widget
                this._mainNavigationWidget.addWidget(this._componentOverviewWidget, "ComponentOverview", viewTypeProvider_1.ViewType.Overview, { parent: this.ComponentsViewName, widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
                this._componentOverviewWidget.eventOpenView.attach(this._componentOverviewOpenViewHandler);
            }
        };
        /**
         * Adds the trace overview widget to the main navigation
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.addTraceOverviewWidget = function () {
            var _this = this;
            this._traceOverviewWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.TraceOverviewWidgetId);
            if (this._traceOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab(this.TraceViewName, "widgets/mappCockpitWidget/style/images/Areas/TraceArea.svg");
                // initialize the trace provider TODO: when
                this.dataModel.dataSource.traceProvider.initialize().then(function () {
                    if (_this._traceOverviewWidget != undefined) {
                        _this._mainNavigationWidget.addWidget(_this._traceOverviewWidget, "TraceOverview", viewTypeProvider_1.ViewType.Overview, { parent: _this.TraceViewName, widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
                        _this._traceOverviewWidget.eventOpenView.attach(_this._traceOverviewOpenViewHandler);
                    }
                });
            }
        };
        /**
         * Adds the tools overview widget to the main navigation
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.addToolsOverviewWidget = function () {
            this._toolsOverviewWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.ToolsOverviewWidgetId);
            if (this._toolsOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab(this.ToolsViewName, "widgets/mappCockpitWidget/style/images/Areas/ToolsArea.svg");
                // add overview widget
                this._mainNavigationWidget.addWidget(this._toolsOverviewWidget, "ToolsOverview", viewTypeProvider_1.ViewType.Overview, { parent: this.ToolsViewName, widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
                this._toolsOverviewWidget.eventOpenView.attach(this._toolsOverviewOpenViewHandler);
            }
        };
        /**
          * Handles the OpenView event from the component overview widget
          *
          * @private
          * @param {*} sender
          * @param {EventOpenViewArgs} args
          * @memberof MappCockpitWidget
          */
        MappCockpitWidget.prototype.onComponentOverviewWidgetOpenView = function (sender, args) {
            this._mainNavigationWidget.addView(this.ComponentsViewName, args.componentId, args.componentDisplayName, args.viewType, true);
        };
        /**
         * Handles the OpenView event from the trace overview widget
         *
         * @private
         * @param {*} sender
         * @param {EventOpenViewArgs} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onTraceOverviewWidgetOpenView = function (sender, args) {
            this._mainNavigationWidget.addView(this.TraceViewName, args.componentId, args.componentDisplayName, args.viewType, true);
        };
        /**
         * Handles the OpenView event from the tools overview widget
         *
         * @private
         * @param {*} sender
         * @param {EventOpenViewArgs} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onToolsOverviewWidgetOpenView = function (sender, args) {
            this._mainNavigationWidget.addView(this.ToolsViewName, args.componentId, args.componentDisplayName, args.viewType, true);
        };
        /**
         * Changes the user to anonymous
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.changeUserToAnonymous = function () {
            var mainDataModel = this.dataModel;
            var userInfo = { username: MappCockpitWidget.defaultUser.username, password: MappCockpitWidget.defaultUser.password };
            mainDataModel.dataSource.commandChangeUser.execute(userInfo, function (userRoles) {
                console.log("%o Logged in with roles: %o", MappCockpitWidget.defaultUser.username, userRoles);
            }, function (error) {
                console.error("Could not log in: %o %o", MappCockpitWidget.defaultUser.username, error);
            });
        };
        // specifies the default user settings
        MappCockpitWidget.defaultUser = { username: "Anonymous", password: "" };
        return MappCockpitWidget;
    }(widgetBase_1.WidgetBase));
    exports.MappCockpitWidget = MappCockpitWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvbWFwcENvY2twaXRXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWlCQTtRQUFnQyxxQ0FBVTtRQUExQztZQUVJLCtCQUErQjtZQUZuQyxxRUFnYUM7WUE1Wm9CLG1CQUFhLEdBQUcsV0FBVyxDQUFDO1lBQzVCLHdCQUFrQixHQUFHLGdCQUFnQixDQUFDO1lBQ3RDLG1CQUFhLEdBQUcsV0FBVyxDQUFDO1lBQzVCLG1CQUFhLEdBQUcsV0FBVyxDQUFDO1lBUXJDLG9DQUE4QixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7WUFDckYsdUNBQWlDLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlDQUFpQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQTtZQUMxRyxtQ0FBNkIsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUEvQyxDQUErQyxDQUFDO1lBQ2pHLG1DQUE2QixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyw2QkFBNkIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQWhELENBQWdELENBQUE7WUFFbEcsd0NBQWtDLEdBQUcsVUFBQyxNQUFNLEVBQUMsU0FBUyxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBekMsQ0FBeUMsQ0FBQztZQWU3Rzs7Ozs7ZUFLRztZQUNLLCtD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Ozs7V0FLRztRQUNLLGlEQUFxQixHQUE3QjtZQUNJLElBQUksYUFBYSxHQUFzQyxJQUFJLENBQUMsU0FBVSxDQUFDO1lBQ3ZFLElBQUksUUFBUSxHQUFHLEVBQUUsUUFBUSxFQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4SCxhQUFhLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBQyxTQUFTO2dCQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbEcsQ0FBQyxFQUFDLFVBQUMsS0FBSztnQkFDSixPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUYsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBeFlELHNDQUFzQztRQUNkLDZCQUFXLEdBQUcsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQXdZbEYsd0JBQUM7S0FBQSxBQWhhRCxDQUFnQyx1QkFBVSxHQWdhekM7SUFFUSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBEYXRhTW9kZWxzIGZyb20gJy4uLy4uL21vZGVscy9kYXRhTW9kZWxzJztcclxuaW1wb3J0IHsgSU1hcHBDb2NrcGl0V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tYXBwQ29ja3BpdFdpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucyB9IGZyb20gXCIuLi90YWJXaWRnZXQvaW50ZXJmYWNlcy90YWJXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRXZlbnRPcGVuVmlld0FyZ3MgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50T3BlblZpZXdBcmdzXCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlLCBWaWV3VHlwZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvY29tcG9uZW50c0RhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBCdXN5SW5mb3JtYXRpb24sIEltYWdlSWQgfSBmcm9tIFwiLi4vY29tbW9uL2J1c3lJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBBbGVydERpYWxvZyB9IGZyb20gXCIuLi9jb21tb24vYWxlcnREaWFsb2dcIjtcclxuaW1wb3J0IHsgUGVyc2lzdERhdGFDb250cm9sbGVyLCBQZXJzaXN0RGF0YUNvbnRyb2xsZXJFdmVudE5vdGlmaWNhdGlvblR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBQZXJzaXN0RGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9wZXJzaXN0RGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElMb2dpbldpZGdldCwgSUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LCBJTWFpbk5hdmlnYXRpb25XaWRnZXQsIElUcmFjZU92ZXJ2aWV3V2lkZ2V0LCBJVG9vbHNPdmVydmlld1dpZGdldCB9IGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblwiO1xyXG5cclxuXHJcbmNsYXNzIE1hcHBDb2NrcGl0V2lkZ2V0IGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElNYXBwQ29ja3BpdFdpZGdldHtcclxuXHJcbiAgICAvLyBOYW1lcyBvZiB0aGUgZGlmZmVyZW50IHZpZXdzXHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBTdGFydFZpZXdOYW1lID0gXCJTdGFydFZpZXdcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgQ29tcG9uZW50c1ZpZXdOYW1lID0gXCJDb21wb25lbnRzVmlld1wiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBUcmFjZVZpZXdOYW1lID0gXCJUcmFjZVZpZXdcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgVG9vbHNWaWV3TmFtZSA9IFwiVG9vbHNWaWV3XCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFpbk5hdmlnYXRpb25XaWRnZXQhIDogSU1haW5OYXZpZ2F0aW9uV2lkZ2V0O1xyXG4gICAgcHJpdmF0ZSBfdG9vbHNPdmVydmlld1dpZGdldDogSVRvb2xzT3ZlcnZpZXdXaWRnZXR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdHJhY2VPdmVydmlld1dpZGdldDogSVRyYWNlT3ZlcnZpZXdXaWRnZXR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQ6IElDb21wb25lbnRPdmVydmlld1dpZGdldHx1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfc2lkZUJhcldpZGdldEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsYXJncyk7XHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRPdmVydmlld09wZW5WaWV3SGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Db21wb25lbnRPdmVydmlld1dpZGdldE9wZW5WaWV3KHNlbmRlciwgYXJncylcclxuICAgIHByaXZhdGUgX3RyYWNlT3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpID0+IHRoaXMub25UcmFjZU92ZXJ2aWV3V2lkZ2V0T3BlblZpZXcoc2VuZGVyLGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHNPdmVydmlld09wZW5WaWV3SGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Ub29sc092ZXJ2aWV3V2lkZ2V0T3BlblZpZXcoc2VuZGVyLCBhcmdzKVxyXG4gICAgXHJcbiAgICBwcml2YXRlIF9tYWluTW9kZWxDb25uZWN0aW9uQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGNvbm5lY3RlZCkgPT4gdGhpcy5jb25uZWN0aW9uQ2hhbmdlZChzZW5kZXIsIGNvbm5lY3RlZCk7XHJcblxyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgZGVmYXVsdCB1c2VyIHNldHRpbmdzXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBkZWZhdWx0VXNlciA9IHsgdXNlcm5hbWU6IFwiQW5vbnltb3VzXCIsIHBhc3N3b3JkOiBcIlwiIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgcGVyc2lzdCBkYXRhIGNvbnRyb2xsZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhQZXJzaXN0RGF0YUNvbnRyb2xsZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wZXJzaXN0RGF0YUNvbnRyb2xsZXI6IFBlcnNpc3REYXRhQ29udHJvbGxlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudGhhbmRsZXIgZm9yIHBlcnNpc3QgZGF0YSBjb250cm9sbGVyIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcGVyc2lzdERhdGFDb250cm9sbGVyTm90aWZpY2F0aW9uSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLnBlcnNpc3REYXRhQ29udHJvbGxlck5vdGlmaWNhdGlvbkhhbmRsZXIoc2VuZGVyLCBldmVudEFyZ3MpIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzdGFydCBwYWdlXHJcbiAgICAgICAgdGhpcy5hZGRTdGFydFBhZ2VXaWRnZXQoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDb25uZWN0cyBQZXJzaXN0RGF0YUNvbnRyb2xsZXIgd2l0aCB0aGUgZGVmYXVsdCBzdG9yYWdlIFxyXG4gICAgICAgIHRoaXMuaW5pdFBlcnNpc3REYXRhQ29udHJvbGxlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdG8gdGhlIG1haW4gZGF0YW1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RNYWluRGF0YU1vZGVsKCl7XHJcbiAgICAgICAgLy8gY29ubmVjdCB0aGUgbWFpbiBkYXRhIG1vZGVsXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uTWFwcENvY2twaXREYXRhTW9kZWxJZCkgYXMgRGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG1haW5EYXRhTW9kZWwgPSB0aGlzLmRhdGFNb2RlbDtcclxuICAgICAgICAgICAgbGV0IG1haW5NYXBwQ29ja3BpdE1vZGVsID0gbWFpbkRhdGFNb2RlbC5kYXRhU291cmNlO1xyXG5cclxuICAgICAgICAgICAgLy8gd2FpdCBmb3Igc3VjY2Vzc2Z1bGwgY29ubmVjdGlvblxyXG4gICAgICAgICAgICBtYWluTWFwcENvY2twaXRNb2RlbC5ldmVudE1vZGVsQ29ubmVjdGlvbkNoYW5nZWQuYXR0YWNoKHRoaXMuX21haW5Nb2RlbENvbm5lY3Rpb25DaGFuZ2VkSGFuZGxlcilcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbm5lY3QgdGhlIG1haW4gbW9kZWxcclxuICAgICAgICAgICAgbWFpbk1hcHBDb2NrcGl0TW9kZWwuY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibWFwcENvY2twaXQgZGF0YW1vZGVsIG5vdCBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdG8gdGhlIHBlcnNpc3QgZGF0YSBjb250cm9sbGVyIHdpdGggdGhlIGRlZmF1bHQgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0UGVyc2lzdERhdGFDb250cm9sbGVyKCl7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHBlcnNpc3QgZGF0YSBjb250cm9sbGVyXHJcbiAgICAgICAgdGhpcy5fcGVyc2lzdERhdGFDb250cm9sbGVyID0gbmV3IFBlcnNpc3REYXRhQ29udHJvbGxlcihQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEhhbmRsZSBldmVudHMgd2hlbiBjb25uZWN0ZWQgb3IgZGF0YSBsb2FkZWRcclxuICAgICAgICB0aGlzLl9wZXJzaXN0RGF0YUNvbnRyb2xsZXIuZXZlbnROb3RpZmljYXRpb24uYXR0YWNoKHRoaXMuX3BlcnNpc3REYXRhQ29udHJvbGxlck5vdGlmaWNhdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENvbm5lY3QgcGVyc2lzdCBkYXRhIGNvbnRyb2xsZXIgd2l0aCBkZWZhdWx0IHN0b3JhZ2VcclxuICAgICAgICB0aGlzLl9wZXJzaXN0RGF0YUNvbnRyb2xsZXIuY29ubmVjdCgpOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIHBlcnNpc3QgZGF0YSBjb250cm9sbGVyIHN0b3JhZ2UgY29ubmVjdGVkIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge1BlcnNpc3REYXRhQ29udHJvbGxlckV2ZW50Tm90aWZpY2F0aW9uVHlwZX0gZXZlbnRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwZXJzaXN0RGF0YUNvbnRyb2xsZXJOb3RpZmljYXRpb25IYW5kbGVyKHNlbmRlciwgZXZlbnRBcmdzOiBQZXJzaXN0RGF0YUNvbnRyb2xsZXJFdmVudE5vdGlmaWNhdGlvblR5cGUpe1xyXG4gICAgICAgIGlmKGV2ZW50QXJncyA9PSBQZXJzaXN0RGF0YUNvbnRyb2xsZXJFdmVudE5vdGlmaWNhdGlvblR5cGUuY29ubmVjdGVkKXtcclxuICAgICAgICAgICAgLy8gQ29ubmVjdGlvbiBkb25lIC0+IGxvYWQgZGF0YSBmcm9tIGRlZmF1bHQgc3RvcmFnZVxyXG4gICAgICAgICAgICBpZih0aGlzLl9wZXJzaXN0RGF0YUNvbnRyb2xsZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BlcnNpc3REYXRhQ29udHJvbGxlci5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZXZlbnRBcmdzID09IFBlcnNpc3REYXRhQ29udHJvbGxlckV2ZW50Tm90aWZpY2F0aW9uVHlwZS5kYXRhTG9hZGVkKXtcclxuICAgICAgICAgICAgLy8gRGV0YWNoIF9wZXJzaXN0RGF0YUNvbnRyb2xsZXIgZXZlbnRzXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3BlcnNpc3REYXRhQ29udHJvbGxlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGVyc2lzdERhdGFDb250cm9sbGVyLmV2ZW50Tm90aWZpY2F0aW9uLmRldGFjaCh0aGlzLl9wZXJzaXN0RGF0YUNvbnRyb2xsZXJOb3RpZmljYXRpb25IYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGF0YSBsb2FkZWQgZnJvbSBkZWZhdWx0IHN0b3JhZ2UgLT4gc3RhcnQgbG9hZGluZyB0aGUgbWFpbkRhdGFNb2RlbChyZXN0IG9mIHRoZSBtYXBwQ29ja3BpdClcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0TWFpbkRhdGFNb2RlbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCkgeyAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuc2lkZUJhcldpZGdldC5ldmVudFdpZGdldEFjdGl2YXRlZC5kZXRhY2godGhpcy5fc2lkZUJhcldpZGdldEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5kYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX3Rvb2xzT3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHNPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmRldGFjaCh0aGlzLl90b29sc092ZXJ2aWV3T3BlblZpZXdIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0LmV2ZW50T3BlblZpZXcuZGV0YWNoKHRoaXMuX3RyYWNlT3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmRldGFjaCh0aGlzLl9jb21wb25lbnRPdmVydmlld09wZW5WaWV3SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWFpbkRhdGFNb2RlbCA9ICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpO1xyXG4gICAgICAgIGlmKG1haW5EYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG1haW5NYXBwQ29ja3BpdE1vZGVsID0gbWFpbkRhdGFNb2RlbC5kYXRhU291cmNlO1xyXG4gICAgICAgICAgICBpZihtYWluTWFwcENvY2twaXRNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbWFpbk1hcHBDb2NrcGl0TW9kZWwuZXZlbnRNb2RlbENvbm5lY3Rpb25DaGFuZ2VkLmRldGFjaCh0aGlzLl9tYWluTW9kZWxDb25uZWN0aW9uQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5NYWluTmF2aWdhdGlvbldpZGdldElkKSBhcyBJTWFpbk5hdmlnYXRpb25XaWRnZXQ7XHJcbiAgICAgICAgaWYodGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICAvLyBhZGQgd2lkZ2V0IHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFRvUGFyZW50Q29udGFpbmVyKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmRhdGFNb2RlbCA9ICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zaWRlQmFyV2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9zaWRlQmFyV2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBJbml0IEFsZXJ0Qm94XHJcbiAgICAgICAgbmV3IEFsZXJ0RGlhbG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgaWYodGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIHRoZSBzdHlsZSBpbmZvcm1hdGlvbnMgZm9yIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvY29tbW9uU3R5bGVWYXJpYWJsZXMuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvY29tbW9uU3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvZGVmYXVsdFNjcm9sbGJhclN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2NvbW1vblRvb2xiYXJTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2Nzcy9hbGVydEJveFN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2RyYWdEcm9wU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIGFyZ3Mud2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uQ2hhbmdlZChzZW5kZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLCBjb25uZWN0ZWQ6IGJvb2xlYW4pe1xyXG4gICAgICAgIGlmIChjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk1haW5Nb2RlbENvbm5lY3RlZChzZW5kZXIpOyAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMub25NYWluTW9kZWxEaXNjb25uZWN0ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIG1haW4gbW9kZWwgaGFzIGJlZW4gY29ubmVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9IG1haW5NYXBwQ29ja3BpdE1vZGVsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25NYWluTW9kZWxDb25uZWN0ZWQobWFpbk1hcHBDb2NrcGl0TW9kZWw6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdFdpZGdldC5vbk1haW5Nb2RlbENvbm5lY3RlZCgpXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGZvcmNlIGNoYW5naW5nIHRvIGFub255bW91cyB0byB0cmlnZ2VyIHRoZSBldmVudHMgZm9yIHVwZGF0aW5nIHRoZSB1aSBzdGF0ZS5cclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VVc2VyVG9Bbm9ueW1vdXMoKTtcclxuICAgICAgICAgICAgbGV0IGxvZ2luV2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLkxvZ2luV2lkZ2V0SWQpIGFzIElMb2dpbldpZGdldDtcclxuICAgICAgICAgICAgaWYobG9naW5XaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxvZ2luV2lkZ2V0LmxvZ2luSW50ZXJmYWNlID0geyBjb21tYW5kQ2hhbmdlVXNlcjogbWFpbk1hcHBDb2NrcGl0TW9kZWwuY29tbWFuZENoYW5nZVVzZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LnNpZGVCYXJXaWRnZXQuYWRkV2lkZ2V0KGxvZ2luV2lkZ2V0LCBcImxvZ2luV2lkZ2V0XCIsIFZpZXdUeXBlLlVzZXIsIFZpZXdUeXBlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJY29uQnlWaWV3VHlwZShWaWV3VHlwZS5Vc2VyKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hZGRDb250ZW50V2lkZ2V0cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LnNlbGVjdFRhYih0aGlzLlN0YXJ0Vmlld05hbWUsIFwiU3RhcnRwYWdlXCIsIFZpZXdUeXBlLk92ZXJ2aWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciB0aGUgbWFpbiBtb2RlbCBoYXMgYmVlbiBkaXNjb25uZWN0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk1haW5Nb2RlbERpc2Nvbm5lY3RlZCgpOiBhbnkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRXaWRnZXQub25NYWluTW9kZWxEaXNjb25uZWN0ZWQoKVwiKTtcclxuICAgICAgICB0aGlzLnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiQ29ubmVjdGlvbiB0byBzZXJ2ZXIgaXMgbG9zdCE8YnIvPiZuYnNwO1JlZnJlc2ggcGFnZSB0byByZWNvbm5lY3QuXCIsIEltYWdlSWQuZGlzY29ubmVjdGVkSW1hZ2UpKTtcclxuICAgICAgICB0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjb250ZW50IHdpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkQ29udGVudFdpZGdldHMoKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDb21wb25lbnRPdmVydmlld1dpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuYWRkVHJhY2VPdmVydmlld1dpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbHNPdmVydmlld1dpZGdldCgpO1xyXG4gICAgICAgIC8vdGhpcy5hZGREdW1teVdpZGdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRoZSBzdGFydCBwYWdlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTdGFydFBhZ2VXaWRnZXQoKXtcclxuICAgICAgICBsZXQgc3RhcnRQYWdlV2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlN0YXJ0UGFnZVdpZGdldElkKSBhcyBJV2lkZ2V0O1xyXG4gICAgICAgIGlmKHN0YXJ0UGFnZVdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKHRoaXMuU3RhcnRWaWV3TmFtZSwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9TdGFydFBhZ2VBcmVhLnN2Z1wiKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkV2lkZ2V0KHN0YXJ0UGFnZVdpZGdldCwgXCJTdGFydHBhZ2VcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHtwYXJlbnQ6IHRoaXMuU3RhcnRWaWV3TmFtZSwgd2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnR9KTtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuc2VsZWN0VGFiKHRoaXMuU3RhcnRWaWV3TmFtZSxcIlN0YXJ0cGFnZVwiLCBWaWV3VHlwZS5PdmVydmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkRHVtbXlXaWRnZXQoKXtcclxuICAgICAgICBsZXQgZHVtbXlXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uRHVtbXlXaWRnZXRJZCkgYXMgSVdpZGdldDtcclxuICAgICAgICBpZihkdW1teVdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKFwiRHVtbXlWaWV3XCIsIFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9pbWFnZXMvQXJlYXMvVG9vbHNBcmVhLnN2Z1wiKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkV2lkZ2V0KGR1bW15V2lkZ2V0LCBcIkR1bW15V2lkZ2V0XCIsIFZpZXdUeXBlLk92ZXJ2aWV3LCB7cGFyZW50OiBcIkR1bW15Vmlld1wiLCB3aWRnZXRQb3NpdGlvbjogVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMubGVmdH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGNvbXBvbmVudCBvdmVydmlldyB3aWRnZXQgdG8gdGhlIG1haW4gbmF2aWdhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRDb21wb25lbnRPdmVydmlld1dpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbi5Db21wb25lbnRPdmVydmlld1dpZGdldElkKSBhcyBJQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQ7XHJcbiAgICAgICAgaWYodGhpcy5fY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkU2lkZUJhclRhYih0aGlzLkNvbXBvbmVudHNWaWV3TmFtZSwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9Db21wb25lbnRBcmVhLnN2Z1wiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGFkZCBvdmVydmlldyB3aWRnZXRcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LCBcIkNvbXBvbmVudE92ZXJ2aWV3XCIsIFZpZXdUeXBlLk92ZXJ2aWV3LCB7IHBhcmVudDogdGhpcy5Db21wb25lbnRzVmlld05hbWUsIHdpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5sZWZ0IH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmF0dGFjaCh0aGlzLl9jb21wb25lbnRPdmVydmlld09wZW5WaWV3SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgdHJhY2Ugb3ZlcnZpZXcgd2lkZ2V0IHRvIHRoZSBtYWluIG5hdmlnYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVHJhY2VPdmVydmlld1dpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlRyYWNlT3ZlcnZpZXdXaWRnZXRJZCkgYXMgSVRyYWNlT3ZlcnZpZXdXaWRnZXQ7XHJcbiAgICAgICAgaWYodGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKHRoaXMuVHJhY2VWaWV3TmFtZSwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9UcmFjZUFyZWEuc3ZnXCIpO1xyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIHRoZSB0cmFjZSBwcm92aWRlciBUT0RPOiB3aGVuXHJcbiAgICAgICAgICAgICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UudHJhY2VQcm92aWRlci5pbml0aWFsaXplKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpeyAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQsIFwiVHJhY2VPdmVydmlld1wiLCBWaWV3VHlwZS5PdmVydmlldywgeyBwYXJlbnQ6IHRoaXMuVHJhY2VWaWV3TmFtZSwgd2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhY2VPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmF0dGFjaCh0aGlzLl90cmFjZU92ZXJ2aWV3T3BlblZpZXdIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgdG9vbHMgb3ZlcnZpZXcgd2lkZ2V0IHRvIHRoZSBtYWluIG5hdmlnYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVG9vbHNPdmVydmlld1dpZGdldCgpe1xyXG4gICAgICAgIHRoaXMuX3Rvb2xzT3ZlcnZpZXdXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uVG9vbHNPdmVydmlld1dpZGdldElkKSBhcyBJVG9vbHNPdmVydmlld1dpZGdldDtcclxuICAgICAgICBpZih0aGlzLl90b29sc092ZXJ2aWV3V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIodGhpcy5Ub29sc1ZpZXdOYW1lLCBcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvaW1hZ2VzL0FyZWFzL1Rvb2xzQXJlYS5zdmdcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgb3ZlcnZpZXcgd2lkZ2V0XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldCh0aGlzLl90b29sc092ZXJ2aWV3V2lkZ2V0LCBcIlRvb2xzT3ZlcnZpZXdcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHtwYXJlbnQ6IHRoaXMuVG9vbHNWaWV3TmFtZSwgd2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnR9KTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHNPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmF0dGFjaCh0aGlzLl90b29sc092ZXJ2aWV3T3BlblZpZXdIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIE9wZW5WaWV3IGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudCBvdmVydmlldyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRPcGVuVmlld0FyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRPcGVuVmlldyhzZW5kZXIsIGFyZ3M6IEV2ZW50T3BlblZpZXdBcmdzKXtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRWaWV3KHRoaXMuQ29tcG9uZW50c1ZpZXdOYW1lLCBhcmdzLmNvbXBvbmVudElkLCBhcmdzLmNvbXBvbmVudERpc3BsYXlOYW1lLCBhcmdzLnZpZXdUeXBlLCB0cnVlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBPcGVuVmlldyBldmVudCBmcm9tIHRoZSB0cmFjZSBvdmVydmlldyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRPcGVuVmlld0FyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICAgcHJpdmF0ZSBvblRyYWNlT3ZlcnZpZXdXaWRnZXRPcGVuVmlldyhzZW5kZXIsIGFyZ3M6IEV2ZW50T3BlblZpZXdBcmdzKXtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRWaWV3KHRoaXMuVHJhY2VWaWV3TmFtZSwgYXJncy5jb21wb25lbnRJZCwgYXJncy5jb21wb25lbnREaXNwbGF5TmFtZSwgYXJncy52aWV3VHlwZSwgdHJ1ZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIE9wZW5WaWV3IGV2ZW50IGZyb20gdGhlIHRvb2xzIG92ZXJ2aWV3IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE9wZW5WaWV3QXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Ub29sc092ZXJ2aWV3V2lkZ2V0T3BlblZpZXcoc2VuZGVyLCBhcmdzOiBFdmVudE9wZW5WaWV3QXJncyl7XHJcbiAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkVmlldyh0aGlzLlRvb2xzVmlld05hbWUsIGFyZ3MuY29tcG9uZW50SWQsIGFyZ3MuY29tcG9uZW50RGlzcGxheU5hbWUsIGFyZ3Mudmlld1R5cGUsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlcyB0aGUgdXNlciB0byBhbm9ueW1vdXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hhbmdlVXNlclRvQW5vbnltb3VzKCkge1xyXG4gICAgICAgIGxldCBtYWluRGF0YU1vZGVsID0gKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCk7XHJcbiAgICAgICAgbGV0IHVzZXJJbmZvID0geyB1c2VybmFtZTogIE1hcHBDb2NrcGl0V2lkZ2V0LmRlZmF1bHRVc2VyLnVzZXJuYW1lLCBwYXNzd29yZDogIE1hcHBDb2NrcGl0V2lkZ2V0LmRlZmF1bHRVc2VyLnBhc3N3b3JkIH07XHJcbiAgICAgICAgbWFpbkRhdGFNb2RlbC5kYXRhU291cmNlLmNvbW1hbmRDaGFuZ2VVc2VyLmV4ZWN1dGUodXNlckluZm8sICh1c2VyUm9sZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlbyBMb2dnZWQgaW4gd2l0aCByb2xlczogJW9cIiwgTWFwcENvY2twaXRXaWRnZXQuZGVmYXVsdFVzZXIudXNlcm5hbWUsIHVzZXJSb2xlcyk7XHJcbiAgICAgICAgfSwoZXJyb3IpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3QgbG9nIGluOiAlbyAlb1wiLCBNYXBwQ29ja3BpdFdpZGdldC5kZWZhdWx0VXNlci51c2VybmFtZSwgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdFdpZGdldCB9OyJdfQ==