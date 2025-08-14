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
     * implements the trace configuration view widget
     *
     * @class TraceConfigurationViewWidget
     * @extends {WidgetBase}
     */
    var TraceConfigurationViewWidget = /** @class */ (function (_super) {
        __extends(TraceConfigurationViewWidget, _super);
        function TraceConfigurationViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._layoutWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            return _this;
        }
        TraceConfigurationViewWidget.prototype.initializeComponent = function () {
            this.component.setDefaultDefinition(new componentDefaultDefinition_1.ComponentDefaultDefinition());
            this.component.disablePersisting();
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
            // attach layout of traceConfigurationWidget to view
            this.attachLayoutToView(this);
        };
        TraceConfigurationViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(componentDefaultDefinition_1.ComponentDefaultDefinition.SplitterWidgetTraceConfigurationViewId);
            this.attachLayoutToView(this);
            this._layoutWidget.initialize();
            // add widget to the parent container
            this._layoutWidget.addToParentContainer(this.mainDiv);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivatedHandler);
        };
        TraceConfigurationViewWidget.prototype.dispose = function () {
            this.disconnectComponent(this._connectionId);
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivatedHandler);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /** resizes the trace configuration view widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        TraceConfigurationViewWidget.prototype.connect = function (componentId) {
            _super.prototype.connect.call(this, componentId);
            // connect the component connection
            this.connectComponent(componentId);
        };
        /**
         *  Connects the active component
         *
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.connectComponent = function (componentId) {
            //BINDINGSOURCE: forwards the call to the bound provider
        };
        /**
         * Disconnects the active component
         *
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.disconnectComponent = function (componentId) {
            //BINDINGSOURCE: forwards the call to the bound provider
        };
        TraceConfigurationViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return TraceConfigurationViewWidget;
    }(viewBase_1.ViewBase));
    exports.TraceConfigurationViewWidget = TraceConfigurationViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0L3RyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUtBOzs7OztPQUtHO0lBQ0Y7UUFBa0QsZ0RBQVE7UUFBMUQ7WUFBQSxxRUFxRkE7WUFuRlcsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQzs7UUFtRmhHLENBQUM7UUFqRkcsMERBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHVEQUEwQixFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxrREFBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFFeEIsb0RBQW9EO1lBQ3BELElBQUksQ0FBQyxrQkFBa0IsQ0FBTSxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsdURBQWdCLEdBQWhCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyx1REFBMEIsQ0FBQyxzQ0FBc0MsQ0FBNEIsQ0FBQztZQUNsSixJQUFJLENBQUMsa0JBQWtCLENBQU0sSUFBSSxDQUFDLENBQUM7WUFFbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNoQyxxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUVELDhDQUFPLEdBQVA7WUFDSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTdDLElBQUksQ0FBQyxhQUFjLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxhQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUIsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsNkNBQU0sR0FBTixVQUFPLEtBQWEsRUFBRSxNQUFjO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBRTVCLElBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQy9CLElBQUksQ0FBQyxhQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM3QztRQUNMLENBQUM7UUFHTSw4Q0FBTyxHQUFkLFVBQWUsV0FBa0I7WUFDN0IsaUJBQU0sT0FBTyxZQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzNCLG1DQUFtQztZQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSyx1REFBZ0IsR0FBeEIsVUFBeUIsV0FBa0I7WUFDdkMsd0RBQXdEO1FBQzVELENBQUM7UUFFRDs7OztXQUlHO1FBQ0ssMERBQW1CLEdBQTNCLFVBQTRCLFdBQWtCO1lBQzFDLHdEQUF3RDtRQUM1RCxDQUFDO1FBRU8seURBQWtCLEdBQTFCLFVBQTJCLE1BQU0sRUFBRSxJQUFJO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0wsbUNBQUM7SUFBRCxDQUFDLEFBckZBLENBQWtELG1CQUFRLEdBcUYxRDtJQXJGYSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgVmlld0Jhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmYXVsdERlZmluaXRpb25cIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHZpZXcgd2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKi9cclxuIGV4cG9ydCBjbGFzcyBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0IGV4dGVuZHMgVmlld0Jhc2UgaW1wbGVtZW50cyBJVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25Db250ZW50QWN0aXZhdGVkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0RGVmYXVsdERlZmluaXRpb24obmV3IENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0V2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIC8vIGF0dGFjaCBsYXlvdXQgb2YgdHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0IHRvIHZpZXdcclxuICAgICAgICB0aGlzLmF0dGFjaExheW91dFRvVmlldyg8YW55PnRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRMYXlvdXRXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uLlNwbGl0dGVyV2lkZ2V0VHJhY2VDb25maWd1cmF0aW9uVmlld0lkKSBhcyBXaWRnZXRzLklTcGxpdHRlcldpZGdldDtcclxuICAgICAgICB0aGlzLmF0dGFjaExheW91dFRvVmlldyg8YW55PnRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIC8vIGFkZCB3aWRnZXQgdG8gdGhlIHBhcmVudCBjb250YWluZXJcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuYWRkVG9QYXJlbnRDb250YWluZXIodGhpcy5tYWluRGl2KTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuYXR0YWNoKHRoaXMuX2xheW91dFdpZGdldEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RDb21wb25lbnQodGhpcy5fY29ubmVjdGlvbklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5ldmVudFdpZGdldEFjdGl2YXRlZC5kZXRhY2godGhpcy5fbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kaXNwb3NlKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZXNpemVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHZpZXcgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2xheW91dFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9ICBcclxuXHJcblxyXG4gICAgcHVibGljIGNvbm5lY3QoY29tcG9uZW50SWQ6c3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuY29ubmVjdChjb21wb25lbnRJZCk7XHJcbiAgICAgICAgLy8gY29ubmVjdCB0aGUgY29tcG9uZW50IGNvbm5lY3Rpb25cclxuICAgICAgICB0aGlzLmNvbm5lY3RDb21wb25lbnQoY29tcG9uZW50SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIENvbm5lY3RzIHRoZSBhY3RpdmUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0Q29tcG9uZW50KGNvbXBvbmVudElkOnN0cmluZykge1xyXG4gICAgICAgIC8vQklORElOR1NPVVJDRTogZm9yd2FyZHMgdGhlIGNhbGwgdG8gdGhlIGJvdW5kIHByb3ZpZGVyXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNjb25uZWN0cyB0aGUgYWN0aXZlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGlzY29ubmVjdENvbXBvbmVudChjb21wb25lbnRJZDpzdHJpbmcpIHtcclxuICAgICAgICAvL0JJTkRJTkdTT1VSQ0U6IGZvcndhcmRzIHRoZSBjYWxsIHRvIHRoZSBib3VuZCBwcm92aWRlclxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==