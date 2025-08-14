define(["require", "exports", "./enum/dataTypeEnum", "./meta"], function (require, exports, dataTypeEnum_1, meta_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The Package object as used within the ExportContainer.
     *
     * @export
     * @class Package
     * @implements {IPackage}
     */
    var Package = /** @class */ (function () {
        /**
         * Creates an instance of Package.
         * The meta data and data must be provided.
         *
         * @param {IMeta} meta
         * @param {*} data
         * @memberof Package
         */
        function Package(meta, data) {
            if (data === void 0) { data = {}; }
            this.meta = meta;
            this.data = data;
        }
        /**
         * The reviver function to be used, when parsing a Package from JSON.
         *
         * @static
         * @param {IPackage} this
         * @param {*} key
         * @param {*} value
         * @returns {*}
         * @memberof Package
         */
        Package.reviver = function (key, value) {
            var newValue = value;
            if (key === "data") {
                if (this.meta !== undefined && this.meta.dataType == dataTypeEnum_1.DataType.DATE) {
                    newValue = new Date(value);
                }
            }
            return newValue;
        };
        /**
         * The replacer function to be used, when stringifying a Package to JSON.
         *
         * @static
         * @param {IPackage} this
         * @param {*} key
         * @param {*} value
         * @returns
         * @memberof Package
         */
        Package.replacer = function (key, value) {
            var newValue = value;
            if (key === "data") {
                if (this.meta.dataType == dataTypeEnum_1.DataType.DATE) {
                    newValue = (new Date(value)).toISOString();
                }
            }
            return newValue;
        };
        /**
         * Set a given key with the given IPackage data of the given IPackage data.
         *
         * @static
         * @param {IPackage} packet
         * @param {string} key
         * @param {IPackage} value
         * @returns {IPackage}
         * @memberof Package
         */
        Package.setPackageKey = function (packet, key, value) {
            packet.data[key] = value;
            return packet;
        };
        /**
         *  Accesses the data of the given key of the given IPackage data.
         *
         * @static
         * @template T
         * @param {IPackage} packet
         * @param {string} key
         * @returns {(T | undefined)}
         * @memberof Package
         */
        Package.getPackageKeyData = function (packet, key) {
            var retVal = undefined;
            if (packet.data[key] !== undefined) {
                retVal = packet.data[key].data;
            }
            return retVal;
        };
        /**
         * Accesses the meta data of the given key of the given IPackage data.
         *
         * @static
         * @param {IPackage} packet
         * @param {string} key
         * @returns {IMeta}
         * @memberof Package
         */
        Package.getPackageKeyMeta = function (packet, key) {
            var retVal = meta_1.Meta.createInvalid();
            if (packet.data[key] !== undefined) {
                retVal = packet.data[key].meta;
            }
            return retVal;
        };
        /**
         * Creates invalid IPackage data (null object pattern).
         *
         * @static
         * @returns {IPackage}
         * @memberof Package
         */
        Package.createInvalid = function () {
            return new Package(meta_1.Meta.createInvalid());
        };
        /**
         * Checks if the given IPackage data is invalid (null object pattern).
         *
         * @static
         * @param {IPackage} packet
         * @returns {boolean}
         * @memberof Package
         */
        Package.isInvalid = function (packet) {
            return meta_1.Meta.isInvalid(packet.meta);
        };
        return Package;
    }());
    exports.Package = Package;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL3BhY2thZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7Ozs7OztPQU1HO0lBQ0g7UUFrQkk7Ozs7Ozs7V0FPRztRQUNILGlCQUFZLElBQVcsRUFBRSxJQUFjO1lBQWQscUJBQUEsRUFBQSxTQUFjO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDVyxlQUFPLEdBQXJCLFVBQXNDLEdBQVEsRUFBRSxLQUFVO1lBQ3RELElBQUksUUFBUSxHQUFRLEtBQUssQ0FBQTtZQUN6QixJQUFHLEdBQUcsS0FBSyxNQUFNLEVBQUM7Z0JBQ2QsSUFBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSx1QkFBUSxDQUFDLElBQUksRUFBRTtvQkFDL0QsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUM3QjthQUNKO1lBRUQsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNXLGdCQUFRLEdBQXRCLFVBQXVDLEdBQVcsRUFBRSxLQUFVO1lBQzFELElBQUksUUFBUSxHQUFRLEtBQUssQ0FBQztZQUMxQixJQUFHLEdBQUcsS0FBSyxNQUFNLEVBQUU7Z0JBQ2YsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSx1QkFBUSxDQUFDLElBQUksRUFBRTtvQkFDcEMsUUFBUSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDOUM7YUFDSjtZQUVELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDVyxxQkFBYSxHQUEzQixVQUE0QixNQUFnQixFQUFFLEdBQVcsRUFBRSxLQUFlO1lBQ3RFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDVyx5QkFBaUIsR0FBL0IsVUFBbUMsTUFBZ0IsRUFBRSxHQUFXO1lBRTVELElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUV2QixJQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUMvQixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDbEM7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDVyx5QkFBaUIsR0FBL0IsVUFBZ0MsTUFBZ0IsRUFBRSxHQUFXO1lBRXpELElBQUksTUFBTSxHQUFFLFdBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVqQyxJQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUMvQixNQUFNLEdBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDakM7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ1cscUJBQWEsR0FBM0I7WUFFSSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ1csaUJBQVMsR0FBdkIsVUFBd0IsTUFBZ0I7WUFFcEMsT0FBTyxXQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQ0wsY0FBQztJQUFELENBQUMsQUF6SkQsSUF5SkM7SUFFTywwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQYWNrYWdlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL3BhY2thZ2VJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSU1ldGEgfSBmcm9tIFwiLi9pbnRlcmZhY2UvbWV0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gXCIuL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IE1ldGEgfSBmcm9tIFwiLi9tZXRhXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBQYWNrYWdlIG9iamVjdCBhcyB1c2VkIHdpdGhpbiB0aGUgRXhwb3J0Q29udGFpbmVyLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBQYWNrYWdlXHJcbiAqIEBpbXBsZW1lbnRzIHtJUGFja2FnZX1cclxuICovXHJcbmNsYXNzIFBhY2thZ2UgaW1wbGVtZW50cyBJUGFja2FnZXtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtZXRhIGRhdGEgZGVzY3JpYmluZyB0aGUgZGF0YSBmaWVsZC5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7SU1ldGF9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbWV0YTogSU1ldGE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGF0YSBmaWVsZCBjb250YWluaW5nIHRoZSBkYXRhIHN0b3JlZCBpbiB0aGlzIHBhY2thZ2UuXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGF0YTogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQYWNrYWdlLlxyXG4gICAgICogVGhlIG1ldGEgZGF0YSBhbmQgZGF0YSBtdXN0IGJlIHByb3ZpZGVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0lNZXRhfSBtZXRhXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG1ldGE6IElNZXRhLCBkYXRhOiBhbnkgPSB7fSkge1xyXG4gICAgICAgIHRoaXMubWV0YSA9IG1ldGE7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSByZXZpdmVyIGZ1bmN0aW9uIHRvIGJlIHVzZWQsIHdoZW4gcGFyc2luZyBhIFBhY2thZ2UgZnJvbSBKU09OLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SVBhY2thZ2V9IHRoaXNcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmV2aXZlcih0aGlzOiBJUGFja2FnZSwga2V5OiBhbnksIHZhbHVlOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZTogYW55ID0gdmFsdWVcclxuICAgICAgICBpZihrZXkgPT09IFwiZGF0YVwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5tZXRhICE9PSB1bmRlZmluZWQgJiYgdGhpcy5tZXRhLmRhdGFUeXBlID09IERhdGFUeXBlLkRBVEUpIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gbmV3IERhdGUodmFsdWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJlcGxhY2VyIGZ1bmN0aW9uIHRvIGJlIHVzZWQsIHdoZW4gc3RyaW5naWZ5aW5nIGEgUGFja2FnZSB0byBKU09OLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SVBhY2thZ2V9IHRoaXNcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFBhY2thZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZXBsYWNlcih0aGlzOiBJUGFja2FnZSwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBsZXQgbmV3VmFsdWU6IGFueSA9IHZhbHVlO1xyXG4gICAgICAgIGlmKGtleSA9PT0gXCJkYXRhXCIpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5tZXRhLmRhdGFUeXBlID09IERhdGFUeXBlLkRBVEUpIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gKG5ldyBEYXRlKHZhbHVlKSkudG9JU09TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYSBnaXZlbiBrZXkgd2l0aCB0aGUgZ2l2ZW4gSVBhY2thZ2UgZGF0YSBvZiB0aGUgZ2l2ZW4gSVBhY2thZ2UgZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lQYWNrYWdlfSBwYWNrZXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICAgICAqIEBwYXJhbSB7SVBhY2thZ2V9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7SVBhY2thZ2V9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFBhY2thZ2VLZXkocGFja2V0OiBJUGFja2FnZSwga2V5OiBzdHJpbmcsIHZhbHVlOiBJUGFja2FnZSk6IElQYWNrYWdlIHtcclxuICAgICAgICBwYWNrZXQuZGF0YVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHBhY2tldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBBY2Nlc3NlcyB0aGUgZGF0YSBvZiB0aGUgZ2l2ZW4ga2V5IG9mIHRoZSBnaXZlbiBJUGFja2FnZSBkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0ZW1wbGF0ZSBUXHJcbiAgICAgKiBAcGFyYW0ge0lQYWNrYWdlfSBwYWNrZXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICAgICAqIEByZXR1cm5zIHsoVCB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFBhY2thZ2VLZXlEYXRhPFQ+KHBhY2tldDogSVBhY2thZ2UsIGtleTogc3RyaW5nKTogVCB8IHVuZGVmaW5lZCB7XHJcblxyXG4gICAgICAgIGxldCByZXRWYWwgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmKHBhY2tldC5kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXRWYWwgPSBwYWNrZXQuZGF0YVtrZXldLmRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiByZXRWYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY2Nlc3NlcyB0aGUgbWV0YSBkYXRhIG9mIHRoZSBnaXZlbiBrZXkgb2YgdGhlIGdpdmVuIElQYWNrYWdlIGRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJUGFja2FnZX0gcGFja2V0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7SU1ldGF9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFBhY2thZ2VLZXlNZXRhKHBhY2tldDogSVBhY2thZ2UsIGtleTogc3RyaW5nKTogSU1ldGEge1xyXG5cclxuICAgICAgICBsZXQgcmV0VmFsPSBNZXRhLmNyZWF0ZUludmFsaWQoKTtcclxuXHJcbiAgICAgICAgaWYocGFja2V0LmRhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldFZhbD0gcGFja2V0LmRhdGFba2V5XS5tZXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldFZhbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgaW52YWxpZCBJUGFja2FnZSBkYXRhIChudWxsIG9iamVjdCBwYXR0ZXJuKS5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7SVBhY2thZ2V9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUludmFsaWQoKTogSVBhY2thZ2Uge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXcgUGFja2FnZShNZXRhLmNyZWF0ZUludmFsaWQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGdpdmVuIElQYWNrYWdlIGRhdGEgaXMgaW52YWxpZCAobnVsbCBvYmplY3QgcGF0dGVybikuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJUGFja2FnZX0gcGFja2V0XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBQYWNrYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNJbnZhbGlkKHBhY2tldDogSVBhY2thZ2UpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1ldGEuaXNJbnZhbGlkKHBhY2tldC5tZXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0eyBQYWNrYWdlIH0iXX0=