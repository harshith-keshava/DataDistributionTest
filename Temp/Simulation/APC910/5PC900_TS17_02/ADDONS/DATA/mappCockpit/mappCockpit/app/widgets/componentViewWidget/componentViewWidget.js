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
    var ComponentViewWidget = /** @class */ (function (_super) {
        __extends(ComponentViewWidget, _super);
        function ComponentViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._layoutWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            return _this;
        }
        ComponentViewWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        ComponentViewWidget.prototype.connect = function (componentId) {
            _super.prototype.connect.call(this, componentId);
            this.connectComponent(componentId);
        };
        /**
         * Connects the active component
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectComponent = function (componentName) {
            //BINDINGSOURCE: forwards the call to the bound provider
        };
        /**
         * Disconnects the active component
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.disconnectComponent = function (componentName) {
            //BINDINGSOURCE: forwards the call to the bound provider
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
        };
        ComponentViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetComponentViewId);
            this.attachLayoutToView(this);
            this._layoutWidget.component.disablePersisting();
            this._layoutWidget.initialize();
            // add widget to the parent container
            this._layoutWidget.addToParentContainer(this.mainDiv);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivatedHandler);
            // disable persisting for inner splitters
            var innerLayoutWidget = this._layoutWidget.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetTopSplitterId);
            innerLayoutWidget.component.disablePersisting();
        };
        /**
         * Activates the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.activate = function () {
            this._layoutWidget.activate();
        };
        /**
         * Deactivates the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.deactivate = function () {
            this._layoutWidget.deactivate();
        };
        /**
         * Disposes the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.dispose = function () {
            this.disconnectComponent(this._connectionId);
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivatedHandler);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * Resizes the component view
         *
         * @param number width
         * @param number height
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        ComponentViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return ComponentViewWidget;
    }(viewBase_1.ViewBase));
    exports.ComponentViewWidget = ComponentViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50Vmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21wb25lbnRWaWV3V2lkZ2V0L2NvbXBvbmVudFZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BO1FBQXlDLHVDQUFRO1FBQWpEO1lBQUEscUVBb0hDO1lBbEhXLG1DQUE2QixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7O1FBa0hoRyxDQUFDO1FBaEhHLGlEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSx1REFBMEIsRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFHTSxxQ0FBTyxHQUFkLFVBQWUsV0FBa0I7WUFDN0IsaUJBQU0sT0FBTyxZQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyw4Q0FBZ0IsR0FBeEIsVUFBeUIsYUFBcUI7WUFDMUMsd0RBQXdEO1FBQzVELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLGlEQUFtQixHQUEzQixVQUE0QixhQUFxQjtZQUM3Qyx3REFBd0Q7UUFDNUQsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCx5Q0FBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUVELDhDQUFnQixHQUFoQjtZQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsdURBQTBCLENBQUMsNkJBQTZCLENBQWtCLENBQUM7WUFDL0gsSUFBSSxDQUFDLGtCQUFrQixDQUFNLElBQUksQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFFakQsSUFBSSxDQUFDLGFBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNqQyxxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLGFBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFFcEYseUNBQXlDO1lBQ3pDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLHVEQUEwQixDQUFDLDJCQUEyQixDQUFrQixDQUFDO1lBQzlJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3BELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILHNDQUFRLEdBQVI7WUFDSSxJQUFJLENBQUMsYUFBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILHdDQUFVLEdBQVY7WUFDSSxJQUFJLENBQUMsYUFBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILHFDQUFPLEdBQVA7WUFDSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTdDLElBQUksQ0FBQyxhQUFjLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxhQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUIsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCxvQ0FBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLE1BQWM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFFNUIsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1FBQ0wsQ0FBQztRQUVPLGdEQUFrQixHQUExQixVQUEyQixNQUFNLEVBQUUsSUFBSTtZQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNMLDBCQUFDO0lBQUQsQ0FBQyxBQXBIRCxDQUF5QyxtQkFBUSxHQW9IaEQ7SUFwSFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbXBvbmVudFZpZXdXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NvbXBvbmVudFZpZXdXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IFZpZXdCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IElMYXlvdXRXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvbGF5b3V0V2lkZ2V0SW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50Vmlld1dpZGdldCBleHRlbmRzIFZpZXdCYXNlIGltcGxlbWVudHMgSUNvbXBvbmVudFZpZXdXaWRnZXR7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25Db250ZW50QWN0aXZhdGVkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0KGNvbXBvbmVudElkOnN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmNvbm5lY3QoY29tcG9uZW50SWQpO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdENvbXBvbmVudChjb21wb25lbnRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgYWN0aXZlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RDb21wb25lbnQoY29tcG9uZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgLy9CSU5ESU5HU09VUkNFOiBmb3J3YXJkcyB0aGUgY2FsbCB0byB0aGUgYm91bmQgcHJvdmlkZXJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2Nvbm5lY3RzIHRoZSBhY3RpdmUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGlzY29ubmVjdENvbXBvbmVudChjb21wb25lbnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAvL0JJTkRJTkdTT1VSQ0U6IGZvcndhcmRzIHRoZSBjYWxsIHRvIHRoZSBib3VuZCBwcm92aWRlclxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCkge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdExheW91dFdpZGdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRMYXlvdXRXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNwbGl0dGVyV2lkZ2V0Q29tcG9uZW50Vmlld0lkKSBhcyBJTGF5b3V0V2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuYXR0YWNoTGF5b3V0VG9WaWV3KDxhbnk+dGhpcyk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG5cclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmluaXRpYWxpemUoKTtcclxuICAgICAgICAvLyBhZGQgd2lkZ2V0IHRvIHRoZSBwYXJlbnQgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmFkZFRvUGFyZW50Q29udGFpbmVyKHRoaXMubWFpbkRpdik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5ldmVudFdpZGdldEFjdGl2YXRlZC5hdHRhY2godGhpcy5fbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcblxyXG4gICAgICAgIC8vIGRpc2FibGUgcGVyc2lzdGluZyBmb3IgaW5uZXIgc3BsaXR0ZXJzXHJcbiAgICAgICAgbGV0IGlubmVyTGF5b3V0V2lkZ2V0ID0gdGhpcy5fbGF5b3V0V2lkZ2V0LmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb24uU3BsaXR0ZXJXaWRnZXRUb3BTcGxpdHRlcklkKSBhcyBJTGF5b3V0V2lkZ2V0O1xyXG4gICAgICAgIGlubmVyTGF5b3V0V2lkZ2V0LmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIHRoZSBjb21wb25lbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZXMgdGhlIGNvbXBvbmVudCB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kZWFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBjb21wb25lbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuZGlzY29ubmVjdENvbXBvbmVudCh0aGlzLl9jb25uZWN0aW9uSWQpO1xyXG5cclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmRpc3Bvc2UoKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemVzIHRoZSBjb21wb25lbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBudW1iZXIgd2lkdGhcclxuICAgICAqIEBwYXJhbSBudW1iZXIgaGVpZ2h0XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fbGF5b3V0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBvbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgYXJncy53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgIH1cclxufSJdfQ==