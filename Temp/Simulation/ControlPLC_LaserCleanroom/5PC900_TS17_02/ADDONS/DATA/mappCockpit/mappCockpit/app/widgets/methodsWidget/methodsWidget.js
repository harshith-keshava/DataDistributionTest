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
define(["require", "exports", "../common/viewBase", "./componentDefaultDefinition"], function (require, exports, viewBase_1, componentDefaultDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements displaying and execution of methods
     *
     * @class MethodsWidget
     * @extends {WidgetBase}
     * @implements {IMethodsWidget}
     */
    var MethodsWidget = /** @class */ (function (_super) {
        __extends(MethodsWidget, _super);
        function MethodsWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._layoutWidgetActivated = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._methodListSelectionChangedHandler = function (sender, args) { return _this.onMethodListSelectionChanged(sender, args); };
            return _this;
        }
        MethodsWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Defines the height of the header
         *
         * @returns {number}
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.defineHeaderHeight = function () {
            return 30;
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
            this.setHeaderContent("Commands");
            this.setMethodListWidget();
            this.setParameterListWidget();
        };
        MethodsWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetMethodsId);
            this.attachLayoutToView(this);
            //No persisting data in the common component view
            this._layoutWidget.component.disablePersisting();
            this._layoutWidget.initialize();
            // add widget to the parent container
            this._layoutWidget.addToParentContainer(this.mainDiv);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivated);
        };
        /**
         * set the method list widget
         *
         * @returns {*}
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.setMethodListWidget = function () {
            this._methodListWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.MethodListWidgetId);
            this._methodListWidget.eventSelectionChanged.attach(this._methodListSelectionChangedHandler);
        };
        /**
         * set the method parameter list widget
         *
         * @returns {*}
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.setParameterListWidget = function () {
            this._methodParameterListWidget = this.getWidgetById(componentDefaultDefinition_1.ComponentDefaultDefinition.MethodParameterListWidgetId);
        };
        /**
         * activates MethodWidget
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.activate = function () {
            this._layoutWidget.activate();
        };
        /**
         * deactivates MethodWidget
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.deactivate = function () {
        };
        /**
         * disposes MethodWidget
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.dispose = function () {
            if (this._methodListWidget != undefined) {
                this._methodListWidget.eventSelectionChanged.detach(this._methodListSelectionChangedHandler);
            }
            if (this._methodParameterListWidget != undefined) {
                this._methodParameterListWidget.dispose();
            }
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivated);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * resizes the methods widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                var heightWithoutHeader = height - this._headerHeight;
                this._layoutWidget.resize(width, heightWithoutHeader);
            }
        };
        MethodsWidget.prototype.onMethodListSelectionChanged = function (sender, args) {
            this._methodParameterListWidget.updateParametersList(args);
        };
        MethodsWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return MethodsWidget;
    }(viewBase_1.ViewBase));
    exports.MethodsWidget = MethodsWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kc1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RzV2lkZ2V0L21ldGhvZHNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBOzs7Ozs7T0FNRztJQUNIO1FBQTRCLGlDQUFRO1FBQXBDO1lBQUEscUVBdUlDO1lBaklXLDRCQUFzQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7WUFDN0Usd0NBQWtDLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBOUMsQ0FBOEMsQ0FBQzs7UUFnSS9HLENBQUM7UUE5SEcsMkNBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUdEOzs7OztXQUtHO1FBQ0gsMENBQWtCLEdBQWxCO1lBQ0ksT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILG1DQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUV4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFbEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVELHdDQUFnQixHQUFoQjtZQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFB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NEIsbUJBQVEsR0F1SW5DO0lBRVEsc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBJTWV0aG9kc1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0aG9kc1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgVmlld0Jhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuXHJcbmltcG9ydCB7IElMYXlvdXRXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvbGF5b3V0V2lkZ2V0SW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBkaXNwbGF5aW5nIGFuZCBleGVjdXRpb24gb2YgbWV0aG9kc1xyXG4gKlxyXG4gKiBAY2xhc3MgTWV0aG9kc1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lNZXRob2RzV2lkZ2V0fVxyXG4gKi9cclxuY2xhc3MgTWV0aG9kc1dpZGdldCBleHRlbmRzIFZpZXdCYXNlIGltcGxlbWVudHMgSU1ldGhvZHNXaWRnZXQge1xyXG5cclxuICAgIHByaXZhdGUgX21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQ6IFdpZGdldHMuSU1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbWV0aG9kTGlzdFdpZGdldDogV2lkZ2V0cy5JTWV0aG9kTGlzdFdpZGdldHx1bmRlZmluZWQ7XHJcblxyXG5cclxuICAgIHByaXZhdGUgX2xheW91dFdpZGdldEFjdGl2YXRlZCA9IChzZW5kZXIsYXJncyk9PnRoaXMub25Db250ZW50QWN0aXZhdGVkKHNlbmRlcixhcmdzKTtcclxuICAgIHByaXZhdGUgX21ldGhvZExpc3RTZWxlY3Rpb25DaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25NZXRob2RMaXN0U2VsZWN0aW9uQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcbiAgIFxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldERlZmF1bHREZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBoZWlnaHQgb2YgdGhlIGhlYWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWZpbmVIZWFkZXJIZWlnaHQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplZCgpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRMYXlvdXRXaWRnZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRIZWFkZXJDb250ZW50KFwiQ29tbWFuZHNcIik7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TWV0aG9kTGlzdFdpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyTGlzdFdpZGdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRMYXlvdXRXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNwbGl0dGVyV2lkZ2V0TWV0aG9kc0lkKSBhcyBJTGF5b3V0V2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuYXR0YWNoTGF5b3V0VG9WaWV3KDxhbnk+dGhpcyk7XHJcbiAgICAgICAgLy9ObyBwZXJzaXN0aW5nIGRhdGEgaW4gdGhlIGNvbW1vbiBjb21wb25lbnQgdmlld1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuaW5pdGlhbGl6ZSgpOyBcclxuXHJcbiAgICAgICAgLy8gYWRkIHdpZGdldCB0byB0aGUgcGFyZW50IGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5hZGRUb1BhcmVudENvbnRhaW5lcih0aGlzLm1haW5EaXYpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuYXR0YWNoKHRoaXMuX2xheW91dFdpZGdldEFjdGl2YXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIG1ldGhvZCBsaXN0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2V0TWV0aG9kTGlzdFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9tZXRob2RMaXN0V2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLk1ldGhvZExpc3RXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JTWV0aG9kTGlzdFdpZGdldDtcclxuICAgICAgICB0aGlzLl9tZXRob2RMaXN0V2lkZ2V0LmV2ZW50U2VsZWN0aW9uQ2hhbmdlZC5hdHRhY2godGhpcy5fbWV0aG9kTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgbWV0aG9kIHBhcmFtZXRlciBsaXN0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2V0UGFyYW1ldGVyTGlzdFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLk1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFjdGl2YXRlcyBNZXRob2RXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWFjdGl2YXRlcyBNZXRob2RXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWFjdGl2YXRlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGlzcG9zZXMgTWV0aG9kV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICBpZih0aGlzLl9tZXRob2RMaXN0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZExpc3RXaWRnZXQuZXZlbnRTZWxlY3Rpb25DaGFuZ2VkLmRldGFjaCh0aGlzLl9tZXRob2RMaXN0U2VsZWN0aW9uQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuZGV0YWNoKHRoaXMuX2xheW91dFdpZGdldEFjdGl2YXRlZCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kaXNwb3NlKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIHJlc2l6ZXMgdGhlIG1ldGhvZHMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2xheW91dFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0V2l0aG91dEhlYWRlciA9IGhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5yZXNpemUod2lkdGgsIGhlaWdodFdpdGhvdXRIZWFkZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTWV0aG9kTGlzdFNlbGVjdGlvbkNoYW5nZWQoc2VuZGVyLGFyZ3Mpe1xyXG4gICAgICAgIHRoaXMuX21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQhLnVwZGF0ZVBhcmFtZXRlcnNMaXN0KGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG5cclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNZXRob2RzV2lkZ2V0IH07Il19