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
define(["require", "exports", "./treeGridWidgetBase", "../common/eventOpenViewArgs", "../../framework/events"], function (require, exports, treeGridWidgetBase_1, eventOpenViewArgs_1, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventOpenView = /** @class */ (function (_super) {
        __extends(EventOpenView, _super);
        function EventOpenView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventOpenView;
    }(events_1.TypedEvent));
    ;
    var OverviewTreeGridWidgetBase = /** @class */ (function (_super) {
        __extends(OverviewTreeGridWidgetBase, _super);
        function OverviewTreeGridWidgetBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Event for opening a view
             *
             * @memberof OverviewTreeGridWidgetBase
             */
            _this.eventOpenView = new EventOpenView();
            /**
             * Items which should be shown in the overview tree grid
             *
             * @protected
             * @type {Array<OverviewItem>}
             * @memberof OverviewTreeGridWidgetBase
             */
            _this._dataSource = new Array();
            return _this;
        }
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.defineHeaderHeight = function () {
            return 30;
        };
        /**
         * Initializes the widget
         *
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, this.getHeaderText());
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 100);
        };
        /**
         * Handles the activation of the widget
         *
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.activate = function () {
            this.updateTreeGridDataSource();
        };
        /**
         * Creates the tree grid for the items overview
         *
         * @protected
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.mainDiv).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridColumnSorting()), { recordDoubleClick: function (args) { return _this.doubleClickFromTreeGrid(args); }, queryCellInfo: function (args) {
                    if (args.column.field == "commandButtons") {
                        _this.addCommandButtons(args);
                    }
                } }));
        };
        /**
         * Updates the tree grids dataSource
         *
         * @protected
         * @returns
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.updateTreeGridDataSource = function () {
            if (this._dataSource == undefined) {
                return;
            }
            if (this.mainDiv != undefined) {
                var mainDiv = $(this.mainDiv);
                if (mainDiv != undefined) {
                    mainDiv.ejTreeGrid({
                        dataSource: this._dataSource,
                    });
                }
            }
        };
        /**
         * Loads the styles for the overview treegrid widget base
         *
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            this.addStyle("widgets/common/style/css/overviewCommandButtonStyle.css");
            this.addStyle("widgets/common/style/css/iconComponentViewStyle.css");
            this.addStyle("widgets/common/style/css/iconTraceConfigurationViewStyle.css");
            this.addStyle("widgets/common/style/css/iconTraceViewStyle.css");
            this.addStyle("widgets/common/style/css/iconLoggerViewStyle.css");
        };
        /**
         * Adds the available buttons to the given overview item in the commandButtons field
         *
         * @private
         * @param {*} args
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.addCommandButtons = function (args) {
            args.cellElement.innerHTML = "";
            var cellRowIndex = args.data.index;
            var commandIds = this.getCommandIdsFromItem(args.data.item);
            // Add divs for the buttons
            for (var index = 0; index < commandIds.length; index++) {
                var commandId = commandIds[index];
                var uniqueId = this.getUniqueButtonId(commandId, cellRowIndex);
                args.cellElement.innerHTML += "<div id='" + uniqueId + "' ></div>   ";
            }
            ;
            // Create ejButtons within the divs (after all divs were inserted in the innerHTML, otherwise problems occur)
            for (var index = 0; index < commandIds.length; index++) {
                var commandId = commandIds[index];
                var uniqueId = this.getUniqueButtonId(commandId, cellRowIndex);
                this.createButton(uniqueId, commandId, args.data.item);
            }
            ;
        };
        /**
         * Creates a single button
         *
         * @private
         * @param {string} uniqueId
         * @param {string} commandId
         * @param {OverviewItem} overviewItem
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.createButton = function (uniqueId, commandId, overviewItem) {
            var _this = this;
            var imageClass = this.getIconClassNameForCommandId(commandId) + "-Overview";
            var buttonObj = $(this.mainDiv).find("#" + uniqueId);
            buttonObj.ejButton({
                text: this.getNameForCommandId(commandId),
                contentType: ej.ContentType.TextAndImage,
                cssClass: "overviewCommandButton " + imageClass,
                prefixIcon: "e-icon",
                click: function (clickArgs) { return _this.click(overviewItem, commandId); },
            });
        };
        /**
         * Returns a unique button id
         *
         * @private
         * @param {string} commandId
         * @param {*} cellRowIndex
         * @returns {string}
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.getUniqueButtonId = function (commandId, cellRowIndex) {
            return "overviewCommandButton" + commandId + cellRowIndex;
        };
        /**
         * Returns the column resize support definitions
         *
         * @private
         * @returns {{}}
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        /**
         * Handles the double click event from the treegrid
         *
         * @private
         * @param {*} args
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.doubleClickFromTreeGrid = function (args) {
            if (args.model.selectedItem != undefined) {
                this.doubleClick(args.columnName, args.model.selectedItem.item);
            }
        };
        /**
         * Returns the definition for column sorting(=> deactivated)
         *
         * @protected
         * @returns {{}}
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.getTreeGridColumnSorting = function () {
            return {
                allowSorting: false,
            };
        };
        /**
         * Raises the event for opening a view with the given type for the given component
         *
         * @protected
         * @param {string} componentId
         * @param {string} componentDisplayName
         * @param {ViewType} viewType
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.onOpenView = function (componentId, componentDisplayName, viewType) {
            var eventArgs = new eventOpenViewArgs_1.EventOpenViewArgs(this, componentId, componentDisplayName, viewType);
            this.eventOpenView.raise(null, eventArgs);
        };
        return OverviewTreeGridWidgetBase;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.OverviewTreeGridWidgetBase = OverviewTreeGridWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL292ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQU1BO1FBQTRCLGlDQUFtQztRQUEvRDs7UUFBaUUsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQUFsRSxDQUE0QixtQkFBVSxHQUE0QjtJQUFBLENBQUM7SUFFbkU7UUFBeUQsOENBQWtCO1FBQTNFO1lBQUEscUVBMlNDO1lBelNHOzs7O2VBSUc7WUFDSCxtQkFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFFcEM7Ozs7OztlQU1HO1lBQ08saUJBQVcsR0FBd0IsSUFBSSxLQUFLLEVBQWdCLENBQUM7O1FBMlIzRSxDQUFDO1FBelJHOzs7OztXQUtHO1FBQ0gsdURBQWtCLEdBQWxCO1lBQ0ksT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGdEQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixpQkFBTSxnQkFBZ0IsWUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUU3Qyw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksNkNBQVEsR0FBZjtZQUNJLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNPLG1EQUFjLEdBQXhCO1lBQUEsaUJBYUM7WUFaRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUseUNBQ25CLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUNsQyxJQUFJLENBQUMsOEJBQThC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WSxJQUFJLFNBQVMsRUFBQztnQkFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ2xFO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLDZEQUF3QixHQUFsQztZQUNJLE9BQU87Z0JBQ0gsWUFBWSxFQUFFLEtBQUs7YUFDdEIsQ0FBQztRQUNOLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNPLCtDQUFVLEdBQXBCLFVBQXFCLFdBQW1CLEVBQUUsb0JBQTRCLEVBQUUsUUFBa0I7WUFDdEYsSUFBSSxTQUFTLEdBQUcsSUFBSSxxQ0FBaUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pGLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBNEVMLGlDQUFDO0lBQUQsQ0FBQyxBQTNTRCxDQUF5RCx1Q0FBa0IsR0EyUzFFO0lBM1NxQixnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgRXZlbnRPcGVuVmlld0FyZ3MgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50T3BlblZpZXdBcmdzXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSB9IGZyb20gXCIuL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgT3ZlcnZpZXdJdGVtIH0gZnJvbSBcIi4vb3ZlcnZpZXdJdGVtXCI7XHJcblxyXG5jbGFzcyBFdmVudE9wZW5WaWV3IGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCBFdmVudE9wZW5WaWV3QXJncz57IH07XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2V7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCBmb3Igb3BlbmluZyBhIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZXZlbnRPcGVuVmlldyA9IG5ldyBFdmVudE9wZW5WaWV3KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJdGVtcyB3aGljaCBzaG91bGQgYmUgc2hvd24gaW4gdGhlIG92ZXJ2aWV3IHRyZWUgZ3JpZCBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8T3ZlcnZpZXdJdGVtPn1cclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgX2RhdGFTb3VyY2U6IEFycmF5PE92ZXJ2aWV3SXRlbT4gPSBuZXcgQXJyYXk8T3ZlcnZpZXdJdGVtPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGRlZmluZUhlYWRlckhlaWdodCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudCh0aGlzLmdldEhlYWRlclRleHQoKSk7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMSwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGFjdGl2YXRpb24gb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWN0aXZhdGUoKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRyZWVHcmlkRGF0YVNvdXJjZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgaXRlbXMgb3ZlcnZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkgeyBcclxuICAgICAgICAkKHRoaXMubWFpbkRpdikuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5Tb3J0aW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZWNvcmREb3VibGVDbGljazogKGFyZ3MpID0+IHRoaXMuZG91YmxlQ2xpY2tGcm9tVHJlZUdyaWQoYXJncyksXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihhcmdzLmNvbHVtbi5maWVsZCA9PSBcImNvbW1hbmRCdXR0b25zXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ29tbWFuZEJ1dHRvbnMoYXJncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0cmVlIGdyaWRzIGRhdGFTb3VyY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVUcmVlR3JpZERhdGFTb3VyY2UoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YVNvdXJjZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1haW5EaXYgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBtYWluRGl2ID0gJCh0aGlzLm1haW5EaXYpO1xyXG4gICAgICAgICAgICBpZihtYWluRGl2ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBtYWluRGl2LmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuX2RhdGFTb3VyY2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSBvdmVydmlldyB0cmVlZ3JpZCB3aWRnZXQgYmFzZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIubG9hZFN0eWxlcygpO1xyXG4gICAgICAgIHRoaXMuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3Mvb3ZlcnZpZXdDb21tYW5kQnV0dG9uU3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3MvaWNvbkNvbXBvbmVudFZpZXdTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgdGhpcy5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy9pY29uVHJhY2VDb25maWd1cmF0aW9uVmlld1N0eWxlLmNzc1wiKTtcclxuICAgICAgICB0aGlzLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL2ljb25UcmFjZVZpZXdTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgdGhpcy5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy9pY29uTG9nZ2VyVmlld1N0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBBZGRzIHRoZSBhdmFpbGFibGUgYnV0dG9ucyB0byB0aGUgZ2l2ZW4gb3ZlcnZpZXcgaXRlbSBpbiB0aGUgY29tbWFuZEJ1dHRvbnMgZmllbGRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRDb21tYW5kQnV0dG9ucyhhcmdzKXtcclxuICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgIFxyXG4gICAgICAgIHZhciBjZWxsUm93SW5kZXggPSBhcmdzLmRhdGEuaW5kZXg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbW1hbmRJZHMgPSB0aGlzLmdldENvbW1hbmRJZHNGcm9tSXRlbShhcmdzLmRhdGEuaXRlbSk7XHJcbiAgICAgICAgLy8gQWRkIGRpdnMgZm9yIHRoZSBidXR0b25zXHJcbiAgICAgICAgZm9yKGxldCBpbmRleD0wOyBpbmRleCA8IGNvbW1hbmRJZHMubGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgbGV0IGNvbW1hbmRJZCA9IGNvbW1hbmRJZHNbaW5kZXhdO1xyXG4gICAgICAgICAgICBsZXQgdW5pcXVlSWQgPSB0aGlzLmdldFVuaXF1ZUJ1dHRvbklkKGNvbW1hbmRJZCwgY2VsbFJvd0luZGV4KTtcclxuICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5pbm5lckhUTUwgKz0gXCI8ZGl2IGlkPSdcIiArIHVuaXF1ZUlkICsgXCInID48L2Rpdj4gICBcIjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgZWpCdXR0b25zIHdpdGhpbiB0aGUgZGl2cyAoYWZ0ZXIgYWxsIGRpdnMgd2VyZSBpbnNlcnRlZCBpbiB0aGUgaW5uZXJIVE1MLCBvdGhlcndpc2UgcHJvYmxlbXMgb2NjdXIpXHJcbiAgICAgICAgZm9yKGxldCBpbmRleD0wOyBpbmRleCA8IGNvbW1hbmRJZHMubGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgbGV0IGNvbW1hbmRJZCA9IGNvbW1hbmRJZHNbaW5kZXhdO1xyXG4gICAgICAgICAgICBsZXQgdW5pcXVlSWQgPSB0aGlzLmdldFVuaXF1ZUJ1dHRvbklkKGNvbW1hbmRJZCwgY2VsbFJvd0luZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odW5pcXVlSWQsIGNvbW1hbmRJZCwgYXJncy5kYXRhLml0ZW0pXHJcbiAgICAgICAgfTtcclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgc2luZ2xlIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdW5pcXVlSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tYW5kSWRcclxuICAgICAqIEBwYXJhbSB7T3ZlcnZpZXdJdGVtfSBvdmVydmlld0l0ZW1cclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUJ1dHRvbih1bmlxdWVJZDogc3RyaW5nLCBjb21tYW5kSWQ6IHN0cmluZywgb3ZlcnZpZXdJdGVtOiBPdmVydmlld0l0ZW0pe1xyXG4gICAgICAgIGxldCBpbWFnZUNsYXNzOiBzdHJpbmcgPSB0aGlzLmdldEljb25DbGFzc05hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkKSArIFwiLU92ZXJ2aWV3XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGJ1dHRvbk9iaiA9ICQodGhpcy5tYWluRGl2KS5maW5kKFwiI1wiICsgdW5pcXVlSWQpO1xyXG4gICAgICAgIGJ1dHRvbk9iai5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IHRoaXMuZ2V0TmFtZUZvckNvbW1hbmRJZChjb21tYW5kSWQpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZWouQ29udGVudFR5cGUuVGV4dEFuZEltYWdlLFxyXG4gICAgICAgICAgICBjc3NDbGFzczogXCJvdmVydmlld0NvbW1hbmRCdXR0b24gXCIgKyBpbWFnZUNsYXNzLFxyXG4gICAgICAgICAgICBwcmVmaXhJY29uOiBcImUtaWNvblwiICwvL1NwZWNpZmllcyB0aGUgcHJpbWFyeSBpY29uIGZvciBCdXR0b25cclxuICAgICAgICAgICAgY2xpY2s6IChjbGlja0FyZ3MpID0+IHRoaXMuY2xpY2sob3ZlcnZpZXdJdGVtLCBjb21tYW5kSWQpLFxyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXHRcdFxyXG5cdC8qKlxyXG4gICAgICogUmV0dXJucyBhIHVuaXF1ZSBidXR0b24gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1hbmRJZFxyXG4gICAgICogQHBhcmFtIHsqfSBjZWxsUm93SW5kZXhcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRVbmlxdWVCdXR0b25JZChjb21tYW5kSWQ6IHN0cmluZywgY2VsbFJvd0luZGV4KTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIm92ZXJ2aWV3Q29tbWFuZEJ1dHRvblwiICsgY29tbWFuZElkICsgY2VsbFJvd0luZGV4O1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbHVtbiByZXNpemUgc3VwcG9ydCBkZWZpbml0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHsgICAgICAgIFxyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGRvdWJsZSBjbGljayBldmVudCBmcm9tIHRoZSB0cmVlZ3JpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRvdWJsZUNsaWNrRnJvbVRyZWVHcmlkKGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZG91YmxlQ2xpY2soYXJncy5jb2x1bW5OYW1lLCBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbS5pdGVtKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmluaXRpb24gZm9yIGNvbHVtbiBzb3J0aW5nKD0+IGRlYWN0aXZhdGVkKVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRDb2x1bW5Tb3J0aW5nKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7ICAgICAgICBcclxuICAgICAgICAgICAgYWxsb3dTb3J0aW5nOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VzIHRoZSBldmVudCBmb3Igb3BlbmluZyBhIHZpZXcgd2l0aCB0aGUgZ2l2ZW4gdHlwZSBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnRJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudERpc3BsYXlOYW1lXHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQG1lbWJlcm9mIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbk9wZW5WaWV3KGNvbXBvbmVudElkOiBzdHJpbmcsIGNvbXBvbmVudERpc3BsYXlOYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSApIHtcclxuICAgICAgICBsZXQgZXZlbnRBcmdzID0gbmV3IEV2ZW50T3BlblZpZXdBcmdzKHRoaXMsIGNvbXBvbmVudElkLCBjb21wb25lbnREaXNwbGF5TmFtZSwgdmlld1R5cGUpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRPcGVuVmlldy5yYWlzZShudWxsLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuICAgICAqIFJldHVybnMgdGhlIGhlYWRlciB0ZXh0IHdoaWNoIG9uZSBzaG91bGQgYmUgc2hvd24gZm9yIHRoaXMgb3ZlcnZpZXcgd2lkZ2V0IGluIHRoZSBoZWFkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldEhlYWRlclRleHQoKTogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgYXZhaWxhYmxlIGNvbW1hbmQgaWRzIGZvciB0aGUgZ2l2ZW4gb3ZlcnZpZXdJdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0ge092ZXJ2aWV3SXRlbX0gb3ZlcnZpZXdJdGVtXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0Q29tbWFuZElkc0Zyb21JdGVtKG92ZXJ2aWV3SXRlbTogT3ZlcnZpZXdJdGVtKTogQXJyYXk8c3RyaW5nPjtcclxuXHJcblx0LyoqXHJcbiAgICAgKiBHZXRzIHRoZSBuYW1lIGZvciB0aGUgZ2l2ZW4gY29tbWFuZCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1hbmRJZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0TmFtZUZvckNvbW1hbmRJZChjb21tYW5kSWQ6IHN0cmluZyk6IHN0cmluZztcclxuXHJcblx0LyoqXHJcbiAgICAgKiBHZXRzIGFuIGljb24gY2xhc3NOYW1lIGZvciB0aGUgZ2l2ZW4gY29tbWFuZCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1hbmRJZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0SWNvbkNsYXNzTmFtZUZvckNvbW1hbmRJZChjb21tYW5kSWQ6IHN0cmluZyk6IHN0cmluZztcclxuXHJcblx0LyoqXHJcbiAgICAgKiBJcyBjYWxsZWQgd2hlbiBhIGJ1dHRvbiBpcyBjbGlja2VkIGZvciB0aGUgZ2l2ZW4gb3ZlcnZpZXdJdGVtIGZvciB0aGUgZ2l2ZW4gY29tbWFuZElkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0ge092ZXJ2aWV3SXRlbX0gb3ZlcnZpZXdJdGVtXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZElkXHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNsaWNrKG92ZXJ2aWV3SXRlbTogT3ZlcnZpZXdJdGVtLCBjb21tYW5kSWQ6IHN0cmluZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyBjYWxsZWQgd2hlbiBhIGRvdWJsZWNsaWNrIGZvciB0aGUgZ2l2ZW4gb3ZlcnZpZXdJdGVtIG9jY3VycmVkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sdW1OYW1lXHJcbiAgICAgKiBAcGFyYW0ge092ZXJ2aWV3SXRlbX0gb3ZlcnZpZXdJdGVtXHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGRvdWJsZUNsaWNrKGNvbHVtTmFtZTogc3RyaW5nLCBvdmVydmlld0l0ZW06IE92ZXJ2aWV3SXRlbSk7XHJcbn1cclxuIl19