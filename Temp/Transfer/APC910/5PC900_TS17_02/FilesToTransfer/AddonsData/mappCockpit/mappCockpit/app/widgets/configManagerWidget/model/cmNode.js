define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmNode = /** @class */ (function () {
        function CmNode(element) {
            this.element = element;
        }
        Object.defineProperty(CmNode.prototype, "displayName", {
            get: function () {
                return this.element.displayName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "description", {
            get: function () {
                return this.element.description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "modifiedDisplayValue", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    if (this.element.componentParameter.modifiedDisplayValue != undefined) {
                        return this.element.componentParameter.modifiedDisplayValue;
                    }
                    return this.displayValue;
                }
                return "";
            },
            set: function (value) {
                if (this.element.componentParameter != undefined) {
                    this.element.componentParameter.modifiedDisplayValue = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "displayValue", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return this.element.componentParameter.displayValue;
                }
                return "";
            },
            set: function (value) {
                if (this.element.componentParameter != undefined) {
                    this.element.componentParameter.displayValue = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "unit", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return this.element.componentParameter.engineeringUnit;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "isReadOnly", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return this.element.componentParameter.isReadOnly;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "isWritable", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return this.element.componentParameter.isWriteable.value;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "writeAccess", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return this.element.componentParameter.writeAccess.value;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "transferFailed", {
            get: function () {
                var transferFailed = false;
                var param = this.element.componentParameter;
                if (param != undefined) {
                    if (param.transferFailed != undefined) {
                        transferFailed = param.transferFailed;
                    }
                }
                return transferFailed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "iconDefinition", {
            /**
             * Returns the icon definition for this node
             *
             * @readonly
             * @type {string}
             * @memberof CmNode
             */
            get: function () {
                if (this.isModified == true && this.element.editModeActive) {
                    //Show some modified icon
                    return this.getModifiedIconDefinition();
                }
                // Show the default node icon
                return CmNode.createDiv("e-treegrid e-cmdoc");
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Return the icon definition if node is modified(e.g. only modified, or modified and transfer failed, or modified and not transferable)
         *
         * @protected
         * @returns {string}
         * @memberof CmNode
         */
        CmNode.prototype.getModifiedIconDefinition = function () {
            if (this.transferFailed == true) {
                return CmNode.createDiv("transferFailedIcon", "Pending change (failed to apply value in last attempt)");
            }
            if (this.isWritable == false) {
                return CmNode.createDiv("notTransferableIcon", "Pending change can’t be applied due to current component state");
            }
            return CmNode.createDiv("modifiedIcon", "Pending change");
        };
        /**
         * creates a div with the given tooltipText and className and returns the div string
         *
         * @private
         * @param {string} tooltipText
         * @param {string} className
         * @returns {string}
         * @memberof CmNode
         */
        CmNode.createDiv = function (className, tooltipText) {
            if (tooltipText === void 0) { tooltipText = ""; }
            if (tooltipText != "") {
                return "<div title='" + tooltipText + "' class='" + className + "'></div>";
            }
            return "<div class='" + className + "'></div>";
        };
        Object.defineProperty(CmNode.prototype, "collapseExpandIconDefinition", {
            /**
             * Returns the icon definition for collapse/expand icon for this node
             *
             * @readonly
             * @type {string}
             * @memberof CmNode
             */
            get: function () {
                // No collapse expand icon for nodes without childs
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "isModified", {
            /**
             * Is the value of this node already modified
             *
             * @protected
             * @returns {boolean}
             * @memberof CmNode
             */
            get: function () {
                var _a;
                if (((_a = this.element.componentParameter) === null || _a === void 0 ? void 0 : _a.modifiedValue) != undefined) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        return CmNode;
    }());
    exports.CmNode = CmNode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21Ob2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbmZpZ01hbmFnZXJXaWRnZXQvbW9kZWwvY21Ob2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBR0ksZ0JBQVksT0FBcUI7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUVELHNCQUFJLCtCQUFXO2lCQUFmO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDcEMsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBSSwrQkFBVztpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ3BDLENBQUM7OztXQUFBO1FBRUQsc0JBQUksd0NBQW9CO2lCQUF4QjtnQkFDSSxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksU0FBUyxFQUFDO29CQUM1QyxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLElBQUksU0FBUyxFQUFDO3dCQUNqRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUM7cUJBQy9EO29CQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztpQkFDNUI7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDO2lCQUVELFVBQXlCLEtBQWE7Z0JBQ2xDLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxTQUFTLEVBQUM7b0JBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO2lCQUNoRTtZQUNMLENBQUM7OztXQU5BO1FBUUQsc0JBQUksZ0NBQVk7aUJBQWhCO2dCQUNJLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxTQUFTLEVBQUM7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LENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNjLGdCQUFTLEdBQTFCLFVBQTJCLFNBQWlCLEVBQUUsV0FBd0I7WUFBeEIsNEJBQUEsRUFBQSxnQkFBd0I7WUFDbEUsSUFBRyxXQUFXLElBQUksRUFBRSxFQUFDO2dCQUNqQixPQUFPLGNBQWMsR0FBRyxXQUFXLEdBQUcsV0FBVyxHQUFHLFNBQVMsR0FBRyxVQUFVLENBQUE7YUFDN0U7WUFDRCxPQUFPLGNBQWMsR0FBRyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQ25ELENBQUM7UUFTRCxzQkFBSSxnREFBNEI7WUFQaEM7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLG1EQUFtRDtnQkFDbkQsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDOzs7V0FBQTtRQVNELHNCQUFXLDhCQUFVO1lBUHJCOzs7Ozs7ZUFNRztpQkFDSDs7Z0JBQ0ksSUFBRyxPQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLDBDQUFFLGFBQWEsS0FBSSxTQUFTLEVBQUM7b0JBQzNELE9BQU8sSUFBSSxDQUFDO2lCQUNmO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUM7OztXQUFBO1FBQ0wsYUFBQztJQUFELENBQUMsQUE5SkQsSUE4SkM7SUE5Slksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ21Ob2RlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY21Ob2RlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDbVBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29uZmlnTWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NtUGFyYW1ldGVySW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ21Ob2RlIGltcGxlbWVudHMgSUNtTm9kZXtcclxuICAgIGVsZW1lbnQ6IElDbVBhcmFtZXRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBJQ21QYXJhbWV0ZXIpe1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpc3BsYXlOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmRpc3BsYXlOYW1lOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuZGVzY3JpcHRpb247ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtb2RpZmllZERpc3BsYXlWYWx1ZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyLm1vZGlmaWVkRGlzcGxheVZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5tb2RpZmllZERpc3BsYXlWYWx1ZTsgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0IG1vZGlmaWVkRGlzcGxheVZhbHVlKHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKHRoaXMuZWxlbWVudC5jb21wb25lbnRQYXJhbWV0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5tb2RpZmllZERpc3BsYXlWYWx1ZSA9IHZhbHVlOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5kaXNwbGF5VmFsdWU7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0IGRpc3BsYXlWYWx1ZSh2YWx1ZTogc3RyaW5nKXtcclxuICAgICAgICBpZih0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jb21wb25lbnRQYXJhbWV0ZXIuZGlzcGxheVZhbHVlID0gdmFsdWU7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdW5pdCgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5lbmdpbmVlcmluZ1VuaXQ7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNSZWFkT25seSgpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuZWxlbWVudC5jb21wb25lbnRQYXJhbWV0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jb21wb25lbnRQYXJhbWV0ZXIuaXNSZWFkT25seTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNXcml0YWJsZSgpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuZWxlbWVudC5jb21wb25lbnRQYXJhbWV0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jb21wb25lbnRQYXJhbWV0ZXIuaXNXcml0ZWFibGUudmFsdWU7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHdyaXRlQWNjZXNzKCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci53cml0ZUFjY2Vzcy52YWx1ZTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRyYW5zZmVyRmFpbGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IHRyYW5zZmVyRmFpbGVkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHBhcmFtID0gdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlcjtcclxuICAgICAgICBpZihwYXJhbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihwYXJhbS50cmFuc2ZlckZhaWxlZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmZXJGYWlsZWQgPSBwYXJhbS50cmFuc2ZlckZhaWxlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJhbnNmZXJGYWlsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpY29uIGRlZmluaXRpb24gZm9yIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDbU5vZGVcclxuICAgICAqL1xyXG4gICAgZ2V0IGljb25EZWZpbml0aW9uKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLmlzTW9kaWZpZWQgPT0gdHJ1ZSAmJiB0aGlzLmVsZW1lbnQuZWRpdE1vZGVBY3RpdmUpe1xyXG4gICAgICAgICAgICAvL1Nob3cgc29tZSBtb2RpZmllZCBpY29uXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE1vZGlmaWVkSWNvbkRlZmluaXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2hvdyB0aGUgZGVmYXVsdCBub2RlIGljb25cclxuICAgICAgICByZXR1cm4gQ21Ob2RlLmNyZWF0ZURpdihcImUtdHJlZWdyaWQgZS1jbWRvY1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgaWNvbiBkZWZpbml0aW9uIGlmIG5vZGUgaXMgbW9kaWZpZWQoZS5nLiBvbmx5IG1vZGlmaWVkLCBvciBtb2RpZmllZCBhbmQgdHJhbnNmZXIgZmFpbGVkLCBvciBtb2RpZmllZCBhbmQgbm90IHRyYW5zZmVyYWJsZSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENtTm9kZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TW9kaWZpZWRJY29uRGVmaW5pdGlvbigpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy50cmFuc2ZlckZhaWxlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgcmV0dXJuIENtTm9kZS5jcmVhdGVEaXYoXCJ0cmFuc2ZlckZhaWxlZEljb25cIiwgXCJQZW5kaW5nIGNoYW5nZSAoZmFpbGVkIHRvIGFwcGx5IHZhbHVlIGluIGxhc3QgYXR0ZW1wdClcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaXNXcml0YWJsZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBDbU5vZGUuY3JlYXRlRGl2KFwibm90VHJhbnNmZXJhYmxlSWNvblwiLCBcIlBlbmRpbmcgY2hhbmdlIGNhbuKAmXQgYmUgYXBwbGllZCBkdWUgdG8gY3VycmVudCBjb21wb25lbnQgc3RhdGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBDbU5vZGUuY3JlYXRlRGl2KFwibW9kaWZpZWRJY29uXCIsIFwiUGVuZGluZyBjaGFuZ2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGEgZGl2IHdpdGggdGhlIGdpdmVuIHRvb2x0aXBUZXh0IGFuZCBjbGFzc05hbWUgYW5kIHJldHVybnMgdGhlIGRpdiBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvb2x0aXBUZXh0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENtTm9kZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGNyZWF0ZURpdihjbGFzc05hbWU6IHN0cmluZywgdG9vbHRpcFRleHQ6IHN0cmluZyA9IFwiXCIpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodG9vbHRpcFRleHQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjxkaXYgdGl0bGU9J1wiICsgdG9vbHRpcFRleHQgKyBcIicgY2xhc3M9J1wiICsgY2xhc3NOYW1lICsgXCInPjwvZGl2PlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIjxkaXYgY2xhc3M9J1wiICsgY2xhc3NOYW1lICsgXCInPjwvZGl2PlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaWNvbiBkZWZpbml0aW9uIGZvciBjb2xsYXBzZS9leHBhbmQgaWNvbiBmb3IgdGhpcyBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENtTm9kZVxyXG4gICAgICovXHJcbiAgICBnZXQgY29sbGFwc2VFeHBhbmRJY29uRGVmaW5pdGlvbigpOiBzdHJpbmd7XHJcbiAgICAgICAgLy8gTm8gY29sbGFwc2UgZXhwYW5kIGljb24gZm9yIG5vZGVzIHdpdGhvdXQgY2hpbGRzXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyB0aGUgdmFsdWUgb2YgdGhpcyBub2RlIGFscmVhZHkgbW9kaWZpZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDbU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc01vZGlmaWVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlcj8ubW9kaWZpZWRWYWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59Il19