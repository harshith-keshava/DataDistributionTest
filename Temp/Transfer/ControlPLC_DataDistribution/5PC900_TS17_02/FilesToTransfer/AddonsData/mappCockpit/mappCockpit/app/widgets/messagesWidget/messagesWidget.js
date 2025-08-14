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
define(["require", "exports", "../../common/directoryProvider", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "./model/messagesViewModel", "../common/themeProvider", "./componentDefaultDefinition"], function (require, exports, directoryProvider_1, treeGridWidgetBase_1, mappCockpitComponent_1, messagesViewModel_1, themeProvider_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessagesWidget = /** @class */ (function (_super) {
        __extends(MessagesWidget, _super);
        function MessagesWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Defines the html fragment for the split layout
            _this.messagesWidgetSeverityTemplate = "\n    <script type=\"text/x-jsrender\" id=\"severityColumnTemplate\">\n        {{if severity==0}}\n            <img src=\"" + MessagesWidget.getImagePath("icon_success.svg") + "\" style=\"padding-left: 8px; max-height: 100%; alt=\" {{: 0 }} \">\n        {{else severity==1 }}\n            <img src=\"" + MessagesWidget.getImagePath("icon_info.svg") + "\" style=\"padding-left: 8px; max-height: 100%; alt=\"{{: 1 }}\"> \n        {{else severity==2}}\n            <img src=\"" + MessagesWidget.getImagePath("icon_warning.svg") + "\" style=\"padding-left: 8px; max-height: 100%;  alt=\" {{: 2 }} \">\t\t\n        {{else severity==3}}\n            <img src=\"" + MessagesWidget.getImagePath("icon_error.svg") + "\" style=\"padding-left: 8px; max-height: 100%; alt=\"{{: 3 }}\"> \n        {{/if}}\n    </script>\n    ";
            // holds the message parameters
            _this._messageParameters = [];
            _this._messageWidgetData = new messagesViewModel_1.MessagesData;
            return _this;
        }
        MessagesWidget.getImagePath = function (imageName) {
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "messagesWidget/style/images/" + imageName);
        };
        MessagesWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        MessagesWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 2, 400);
        };
        /**
         * Called when the message parameters have been updated
         *
         * @private
         * @param {MappCockpitComponentParameter[]} messageParameters
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.onMessageParametersUpdated = function (messageParameters) {
            //BINDINGTARGET: the method will be called because of a binding notification
            this._messageParameters = messageParameters;
            // update the widgets data source.
            this.populateMessagesWidgetContent();
        };
        /**
         * Updates the data for the widget from the message parameter values
         *
         * @private
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.updateMessagesWidgetData = function () {
            this._messageWidgetData = messagesViewModel_1.MessagesViewModel.convertParametersToMessageData(this._messageParameters);
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.createLayout = function () {
            $(this.mainDiv).append(this.messagesWidgetSeverityTemplate);
            _super.prototype.createLayout.call(this);
        };
        /**
         * Updates the messages widget with the data and populates the widget
         *
         * @private
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.populateMessagesWidgetContent = function () {
            this.refreshMessageContent();
            this.observeMessages();
        };
        /**
         * refreshes the messages after the message parameters have changed
         *
         * @private
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.refreshMessageContent = function () {
            this.updateMessagesWidgetData();
            $(this.mainDiv).ejTreeGrid({
                dataSource: this._messageWidgetData.messages,
            });
        };
        /**
         * Observes the message parameters for change and updates the content.
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.observeMessages = function () {
            // invoke observing the messages
            mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, this._messageParameters);
        };
        /**
         * handles observable changes
         *
         * @param {Observable[]} changedObservables
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.onObservablesChanged = function (changedObservables) {
            console.log("onObservablesChanged: %o %o", this, changedObservables);
            this.refreshMessageContent();
        };
        /**
         * activates MessagesWidget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.activate = function () {
            console.log("MessagesWidget activated");
            mappCockpitComponent_1.MappCockpitComponentParameter.activateComponentModelItems(this, this._messageParameters);
        };
        /**
         * deactivates MessagesWidget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.deactivate = function () {
            console.log("MessagesWidget deactivated");
            mappCockpitComponent_1.MappCockpitComponentParameter.deactivateComponentModelItems(this, this._messageParameters);
        };
        /**
         * disposes MessagesWidget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.dispose = function () {
            var _a;
            console.log("MessagesWidget disposed");
            mappCockpitComponent_1.MappCockpitComponentParameter.unobserveAll(this, (_a = this._messageParameters[0]) === null || _a === void 0 ? void 0 : _a.component);
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the tree grid for the messages list
         *
         * @protected
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.createTreeGrid = function () {
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), { allowSelection: false, editSettings: {
                    allowEditing: true,
                    editMode: "normal",
                    showDeleteConfirmDialog: false,
                    showConfirmDialog: false
                }, queryCellInfo: function (args) {
                    if (args.column.field == "description") {
                        args.cellElement.style.fontWeight = "bold";
                    }
                    var messageItem = args.data;
                    if (messageItem.severity == "3") {
                        args.cellElement.style.color = "red";
                    }
                } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "severity", headerText: "Severity", isTemplateColumn: true, template: "#severityColumnTemplate", width: "32" },
                    { field: "timeStamp", headerText: "Time", width: "200" },
                    { field: "description", headerText: "Description" },
                    { field: "eventId", headerText: "ID", width: "160" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        return MessagesWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.MessagesWidget = MessagesWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXNXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWVzc2FnZXNXaWRnZXQvbWVzc2FnZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7UUFBNkIsa0NBQWtCO1FBQS9DO1lBQUEscUVBdU5DO1lBck5HLGlEQUFpRDtZQUNoQyxvQ0FBOEIsR0FBRyw0SEFHL0IsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsNkhBRXJELEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRywySEFFbEQsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsaUlBRXJELEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLDBHQUdyRSxDQUFDO1lBRUYsK0JBQStCO1lBQ3ZCLHdCQUFrQixHQUFvQyxFQUFFLENBQUM7WUFDekQsd0JBQWtCLEdBQWlCLElBQUksZ0NBQVksQ0FBQzs7UUFvTWhFLENBQUM7UUFsTWtCLDJCQUFZLEdBQTNCLFVBQTRCLFNBQWlCO1lBQ3pDLE9BQU8sNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyw4QkFBOEIsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUM3SixDQUFDO1FBRUQsNENBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELG9DQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQiw4QkFBOEI7WUFDOUIs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LElBQUksSUFBSyxPQUFBLGlCQUFNLG1CQUFtQixhQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF2RCxDQUF1RDthQUNuRixDQUFDO1FBQ04sQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQXZORCxDQUE2Qix1Q0FBa0IsR0F1TjlDO0lBR1Esd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBJTWVzc2FnZXNXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21lc3NhZ2VzV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlc1ZpZXdNb2RlbCwgTWVzc2FnZXNEYXRhLCBNZXNzYWdEYXRhSXRlbSB9IGZyb20gXCIuL21vZGVsL21lc3NhZ2VzVmlld01vZGVsXCI7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3RoZW1lUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcblxyXG5jbGFzcyBNZXNzYWdlc1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElNZXNzYWdlc1dpZGdldCB7XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgaHRtbCBmcmFnbWVudCBmb3IgdGhlIHNwbGl0IGxheW91dFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlc1dpZGdldFNldmVyaXR5VGVtcGxhdGUgPSBgXHJcbiAgICA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cInNldmVyaXR5Q29sdW1uVGVtcGxhdGVcIj5cclxuICAgICAgICB7e2lmIHNldmVyaXR5PT0wfX1cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJgICsgTWVzc2FnZXNXaWRnZXQuZ2V0SW1hZ2VQYXRoKFwiaWNvbl9zdWNjZXNzLnN2Z1wiKSArIGBcIiBzdHlsZT1cInBhZGRpbmctbGVmdDogOHB4OyBtYXgtaGVpZ2h0OiAxMDAlOyBhbHQ9XCIge3s6IDAgfX0gXCI+XHJcbiAgICAgICAge3tlbHNlIHNldmVyaXR5PT0xIH19XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiYCArIE1lc3NhZ2VzV2lkZ2V0LmdldEltYWdlUGF0aChcImljb25faW5mby5zdmdcIikgKyBgXCIgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDhweDsgbWF4LWhlaWdodDogMTAwJTsgYWx0PVwie3s6IDEgfX1cIj4gXHJcbiAgICAgICAge3tlbHNlIHNldmVyaXR5PT0yfX1cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJgICsgTWVzc2FnZXNXaWRnZXQuZ2V0SW1hZ2VQYXRoKFwiaWNvbl93YXJuaW5nLnN2Z1wiKSArIGBcIiBzdHlsZT1cInBhZGRpbmctbGVmdDogOHB4OyBtYXgtaGVpZ2h0OiAxMDAlOyAgYWx0PVwiIHt7OiAyIH19IFwiPlx0XHRcclxuICAgICAgICB7e2Vsc2Ugc2V2ZXJpdHk9PTN9fVxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImAgKyBNZXNzYWdlc1dpZGdldC5nZXRJbWFnZVBhdGgoXCJpY29uX2Vycm9yLnN2Z1wiKSArIGBcIiBzdHlsZT1cInBhZGRpbmctbGVmdDogOHB4OyBtYXgtaGVpZ2h0OiAxMDAlOyBhbHQ9XCJ7ezogMyB9fVwiPiBcclxuICAgICAgICB7ey9pZn19XHJcbiAgICA8L3NjcmlwdD5cclxuICAgIGA7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIG1lc3NhZ2UgcGFyYW1ldGVyc1xyXG4gICAgcHJpdmF0ZSBfbWVzc2FnZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VXaWRnZXREYXRhOiBNZXNzYWdlc0RhdGEgPSBuZXcgTWVzc2FnZXNEYXRhO1xyXG4gICBcclxuICAgIHByaXZhdGUgc3RhdGljIGdldEltYWdlUGF0aChpbWFnZU5hbWU6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcIm1lc3NhZ2VzV2lkZ2V0L3N0eWxlL2ltYWdlcy9cIiArIGltYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDIsIDQwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgbWVzc2FnZSBwYXJhbWV0ZXJzIGhhdmUgYmVlbiB1cGRhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gbWVzc2FnZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTWVzc2FnZVBhcmFtZXRlcnNVcGRhdGVkKG1lc3NhZ2VQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgLy9CSU5ESU5HVEFSR0VUOiB0aGUgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGJlY2F1c2Ugb2YgYSBiaW5kaW5nIG5vdGlmaWNhdGlvblxyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzID0gbWVzc2FnZVBhcmFtZXRlcnM7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgd2lkZ2V0cyBkYXRhIHNvdXJjZS5cclxuICAgICAgICB0aGlzLnBvcHVsYXRlTWVzc2FnZXNXaWRnZXRDb250ZW50KCk7XHJcbiAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZGF0YSBmb3IgdGhlIHdpZGdldCBmcm9tIHRoZSBtZXNzYWdlIHBhcmFtZXRlciB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlTWVzc2FnZXNXaWRnZXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VXaWRnZXREYXRhID0gTWVzc2FnZXNWaWV3TW9kZWwuY29udmVydFBhcmFtZXRlcnNUb01lc3NhZ2VEYXRhKHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzKTsgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuYXBwZW5kKHRoaXMubWVzc2FnZXNXaWRnZXRTZXZlcml0eVRlbXBsYXRlKTtcclxuICAgICAgICBzdXBlci5jcmVhdGVMYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIG1lc3NhZ2VzIHdpZGdldCB3aXRoIHRoZSBkYXRhIGFuZCBwb3B1bGF0ZXMgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZU1lc3NhZ2VzV2lkZ2V0Q29udGVudCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoTWVzc2FnZUNvbnRlbnQoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVNZXNzYWdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVmcmVzaGVzIHRoZSBtZXNzYWdlcyBhZnRlciB0aGUgbWVzc2FnZSBwYXJhbWV0ZXJzIGhhdmUgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoTWVzc2FnZUNvbnRlbnQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZXNXaWRnZXREYXRhKCk7XHJcblxyXG4gICAgICAgICQodGhpcy5tYWluRGl2KS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5fbWVzc2FnZVdpZGdldERhdGEubWVzc2FnZXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZlcyB0aGUgbWVzc2FnZSBwYXJhbWV0ZXJzIGZvciBjaGFuZ2UgYW5kIHVwZGF0ZXMgdGhlIGNvbnRlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIG9ic2VydmVNZXNzYWdlcygpIHsgICAgIFxyXG4gICAgICAgIC8vIGludm9rZSBvYnNlcnZpbmcgdGhlIG1lc3NhZ2VzXHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIub2JzZXJ2ZVBhcmFtZXRlclZhbHVlQ2hhbmdlcyh0aGlzLHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgb2JzZXJ2YWJsZSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYnNlcnZhYmxlW119IGNoYW5nZWRPYnNlcnZhYmxlc1xyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIG9uT2JzZXJ2YWJsZXNDaGFuZ2VkKGNoYW5nZWRPYnNlcnZhYmxlczogT2JzZXJ2YWJsZVtdKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvbk9ic2VydmFibGVzQ2hhbmdlZDogJW8gJW9cIix0aGlzLGNoYW5nZWRPYnNlcnZhYmxlcyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoTWVzc2FnZUNvbnRlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFjdGl2YXRlcyBNZXNzYWdlc1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWN0aXZhdGUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2VzV2lkZ2V0IGFjdGl2YXRlZFwiKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5hY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcyx0aGlzLl9tZXNzYWdlUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWFjdGl2YXRlcyBNZXNzYWdlc1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZXNXaWRnZXQgZGVhY3RpdmF0ZWRcIik7XHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuZGVhY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcyx0aGlzLl9tZXNzYWdlUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkaXNwb3NlcyBNZXNzYWdlc1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZXNXaWRnZXQgZGlzcG9zZWRcIik7XHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIudW5vYnNlcnZlQWxsKHRoaXMsdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnNbMF0/LmNvbXBvbmVudCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgbWVzc2FnZXMgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgJCh0aGlzLm1haW5EaXYpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgYWxsb3dTZWxlY3Rpb246IGZhbHNlLCAgIFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHsgXHJcbiAgICAgICAgICAgICAgICBhbGxvd0VkaXRpbmc6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgZWRpdE1vZGU6IFwibm9ybWFsXCIsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1EaWFsb2cgIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybURpYWxvZyAgOiBmYWxzZSBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IGZ1bmN0aW9uIChhcmdzKXtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmNvbHVtbi5maWVsZCA9PSBcImRlc2NyaXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUl0ZW0gPSBhcmdzLmRhdGEgYXMgTWVzc2FnRGF0YUl0ZW07XHJcbiAgICAgICAgICAgICAgICBpZihtZXNzYWdlSXRlbS5zZXZlcml0eSA9PSBcIjNcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJzZXZlcml0eVwiLCBoZWFkZXJUZXh0OiBcIlNldmVyaXR5XCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlOiBcIiNzZXZlcml0eUNvbHVtblRlbXBsYXRlXCIsICB3aWR0aDogXCIzMlwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInRpbWVTdGFtcFwiLCBoZWFkZXJUZXh0OiBcIlRpbWVcIiwgIHdpZHRoOiBcIjIwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGVzY3JpcHRpb25cIiwgaGVhZGVyVGV4dDogXCJEZXNjcmlwdGlvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImV2ZW50SWRcIiwgaGVhZGVyVGV4dDogXCJJRFwiLCAgd2lkdGg6IFwiMTYwXCIgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKSwgXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IE1lc3NhZ2VzV2lkZ2V0IH07Il19