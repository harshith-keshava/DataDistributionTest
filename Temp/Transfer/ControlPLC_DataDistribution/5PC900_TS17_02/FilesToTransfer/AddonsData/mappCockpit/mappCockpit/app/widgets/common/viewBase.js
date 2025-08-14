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
define(["require", "exports", "./widgetBase"], function (require, exports, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The class is the base for views representing a container for a composition of other wigets
     *
     * @export
     * @abstract
     * @class ViewBase
     * @extends {WidgetBase}
     * @implements {IView}
     */
    var ViewBase = /** @class */ (function (_super) {
        __extends(ViewBase, _super);
        function ViewBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._childWidgets = [];
            // holds an id referencing the connected component.
            _this._connectionId = "";
            return _this;
        }
        /**
         * Connects to a component
         *
         * @param {string} connectionId
         * @memberof ViewBase
         */
        ViewBase.prototype.connect = function (connectionId) {
            _super.prototype.connect.call(this, connectionId);
            this._connectionId = connectionId;
        };
        /**
         * Adds respectively connects a widget to its view
         *
         * @param {IWidget} widget
         * @memberof ViewBase
         */
        ViewBase.prototype.addWidget = function (widget) {
            this._childWidgets.push(widget);
            widget.view = this;
        };
        /**
         * Removes respectively disconnects a widget from its view
         *
         * @param {IWidget} widget
         * @memberof ViewBase
         */
        ViewBase.prototype.removeWidget = function (widget) {
            var i = this._childWidgets.indexOf(widget);
            if (i >= 0) {
                this._childWidgets.splice(i, 1);
            }
        };
        /**
         * Returns the widget for the given id if found, else undefined
         *
         * @param {string} id the widget id
         * @returns {*}
         * @memberof ViewBase
         */
        ViewBase.prototype.getWidgetById = function (id) {
            for (var key in this._childWidgets) {
                var widget = this._childWidgets[key];
                if (widget.component.id == id) {
                    return widget;
                }
            }
            return undefined;
        };
        return ViewBase;
    }(widgetBase_1.WidgetBase));
    exports.ViewBase = ViewBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld0Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL3ZpZXdCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTs7Ozs7Ozs7T0FRRztJQUNIO1FBQXVDLDRCQUFVO1FBQWpEO1lBQUEscUVBMERDO1lBeERXLG1CQUFhLEdBQWtCLEVBQUUsQ0FBQztZQUUxQyxtREFBbUQ7WUFDekMsbUJBQWEsR0FBVyxFQUFFLENBQUM7O1FBcUR6QyxDQUFDO1FBbkRHOzs7OztXQUtHO1FBQ0ksMEJBQU8sR0FBZCxVQUFlLFlBQW1CO1lBQzlCLGlCQUFNLE9BQU8sWUFBQyxZQUFZLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUN0QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCw0QkFBUyxHQUFULFVBQVUsTUFBZTtZQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCwrQkFBWSxHQUFaLFVBQWEsTUFBZTtZQUN4QixJQUFJLENBQUMsR0FBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGdDQUFhLEdBQXBCLFVBQXFCLEVBQVU7WUFDM0IsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxJQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBQztvQkFDekIsT0FBTyxNQUFNLENBQUM7aUJBQ2pCO2FBQ0o7WUFDRCxPQUFPLFNBQVMsQ0FBQTtRQUNwQixDQUFDO1FBQ0wsZUFBQztJQUFELENBQUMsQUExREQsQ0FBdUMsdUJBQVUsR0EwRGhEO0lBMURxQiw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyBpcyB0aGUgYmFzZSBmb3Igdmlld3MgcmVwcmVzZW50aW5nIGEgY29udGFpbmVyIGZvciBhIGNvbXBvc2l0aW9uIG9mIG90aGVyIHdpZ2V0c1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY2xhc3MgVmlld0Jhc2VcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqIEBpbXBsZW1lbnRzIHtJVmlld31cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWaWV3QmFzZSBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJVmlldyB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX2NoaWxkV2lkZ2V0czpBcnJheTxJV2lkZ2V0PiA9IFtdO1xyXG5cclxuICAgIC8vIGhvbGRzIGFuIGlkIHJlZmVyZW5jaW5nIHRoZSBjb25uZWN0ZWQgY29tcG9uZW50LlxyXG4gICAgcHJvdGVjdGVkIF9jb25uZWN0aW9uSWQ6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0byBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb25uZWN0aW9uSWRcclxuICAgICAqIEBtZW1iZXJvZiBWaWV3QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29ubmVjdChjb25uZWN0aW9uSWQ6c3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuY29ubmVjdChjb25uZWN0aW9uSWQpO1xyXG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25JZCA9IGNvbm5lY3Rpb25JZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgcmVzcGVjdGl2ZWx5IGNvbm5lY3RzIGEgd2lkZ2V0IHRvIGl0cyB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBWaWV3QmFzZVxyXG4gICAgICovXHJcbiAgICBhZGRXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0KSB7ICAgIFxyXG4gICAgICAgIHRoaXMuX2NoaWxkV2lkZ2V0cy5wdXNoKHdpZGdldCk7XHJcbiAgICAgICAgd2lkZ2V0LnZpZXcgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyByZXNwZWN0aXZlbHkgZGlzY29ubmVjdHMgYSB3aWRnZXQgZnJvbSBpdHMgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgVmlld0Jhc2VcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlV2lkZ2V0KHdpZGdldDogSVdpZGdldCkgeyAgICBcclxuICAgICAgICBsZXQgaSAgPSB0aGlzLl9jaGlsZFdpZGdldHMuaW5kZXhPZih3aWRnZXQpO1xyXG4gICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hpbGRXaWRnZXRzLnNwbGljZShpLDEpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHdpZGdldCBmb3IgdGhlIGdpdmVuIGlkIGlmIGZvdW5kLCBlbHNlIHVuZGVmaW5lZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCB0aGUgd2lkZ2V0IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBWaWV3QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0V2lkZ2V0QnlJZChpZDogc3RyaW5nKTogSVdpZGdldHx1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX2NoaWxkV2lkZ2V0cykge1xyXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5fY2hpbGRXaWRnZXRzW2tleV07XHJcbiAgICAgICAgICAgIGlmKHdpZGdldC5jb21wb25lbnQuaWQgPT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcbn1cclxuIl19