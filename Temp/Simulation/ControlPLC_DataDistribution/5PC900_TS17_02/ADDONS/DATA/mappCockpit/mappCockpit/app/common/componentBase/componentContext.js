define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentContext = /** @class */ (function () {
        function ComponentContext() {
            /**
             * Holds the context informations
             *
             * @private
             * @type {Map<string, string>}
             * @memberof ComponentContext
             */
            this._data = new Map();
        }
        /**
         * Adds a new context with the given key
         *
         * @param {string} key
         * @param {string} value
         * @memberof ComponentContext
         */
        ComponentContext.prototype.addContext = function (key, value) {
            this._data.set(key, value);
        };
        /**
         * Returns the context for the given key or undefined if not found
         *
         * @param {string} key
         * @returns {(string|undefined)}
         * @memberof ComponentContext
         */
        ComponentContext.prototype.getContext = function (key) {
            if (this._data.has(key)) {
                return this._data.get(key);
            }
            return undefined;
        };
        /**
         * Removes the context with the given key
         *
         * @param {string} key
         * @memberof ComponentContext
         */
        ComponentContext.prototype.removeContext = function (key) {
            if (this._data.has(key)) {
                this._data.delete(key);
            }
        };
        return ComponentContext;
    }());
    exports.ComponentContext = ComponentContext;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50Q29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50Q29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1lBQ0k7Ozs7OztlQU1HO1lBQ0ssVUFBSyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBdUNuRCxDQUFDO1FBckNHOzs7Ozs7V0FNRztRQUNJLHFDQUFVLEdBQWpCLFVBQWtCLEdBQVcsRUFBRSxLQUFhO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0kscUNBQVUsR0FBakIsVUFBa0IsR0FBVztZQUN6QixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFDO2dCQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzlCO1lBRUQsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksd0NBQWEsR0FBcEIsVUFBcUIsR0FBVztZQUM1QixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFDO2dCQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxQjtRQUNMLENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUEvQ0QsSUErQ0M7SUEvQ1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENvbXBvbmVudENvbnRleHR7XHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBjb250ZXh0IGluZm9ybWF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7TWFwPHN0cmluZywgc3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRDb250ZXh0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGNvbnRleHQgd2l0aCB0aGUgZ2l2ZW4ga2V5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Q29udGV4dFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkQ29udGV4dChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb250ZXh0IGZvciB0aGUgZ2l2ZW4ga2V5IG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7KHN0cmluZ3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudENvbnRleHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbnRleHQoa2V5OiBzdHJpbmcpOiBzdHJpbmd8dW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHRoaXMuX2RhdGEuaGFzKGtleSkpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5nZXQoa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBjb250ZXh0IHdpdGggdGhlIGdpdmVuIGtleVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRDb250ZXh0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVDb250ZXh0KGtleTogc3RyaW5nKXtcclxuICAgICAgICBpZih0aGlzLl9kYXRhLmhhcyhrZXkpKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YS5kZWxldGUoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=