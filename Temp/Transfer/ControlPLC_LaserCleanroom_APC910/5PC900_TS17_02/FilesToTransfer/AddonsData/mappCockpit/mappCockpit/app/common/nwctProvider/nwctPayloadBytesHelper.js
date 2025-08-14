define(["require", "exports", "../../libs/dataparsing/primitiveTypes/I1Type", "../../libs/dataparsing/primitiveTypes/I2Type", "../../libs/dataparsing/primitiveTypes/I4Type", "../../libs/dataparsing/primitiveTypes/UI1Type", "../../libs/dataparsing/primitiveTypes/UI2Type", "../../libs/dataparsing/primitiveTypes/UI4Type", "../../libs/dataparsing/primitiveTypes/R4Type", "../../libs/dataparsing/primitiveTypes/R8Type", "../../libs/dataparsing/primitiveTypes/BP16Type", "../../libs/dataparsing/primitiveTypes/BP32Type", "../../libs/dataparsing/primitiveTypes/BYTES6Type", "../../libs/dataparsing/primitiveTypes/T5Time", "../../libs/dataparsing/primitiveTypes/STR6Type", "../../libs/dataparsing/kaitai-struct/KaitaiStream"], function (require, exports, I1Type, I2Type, I4Type, UI1Type, UI2Type, UI4Type, R4Type, R8Type, BP16Type, BP32Type, BYTES6Type, T5Time, STR6Type, KaitaiStream) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NwctPayloadBytesHelper = /** @class */ (function () {
        function NwctPayloadBytesHelper() {
        }
        /**
         * Takes the Payload Bytes as Uint8Array and the type information and parse it with the help of the Kaitai parser
         *
         * @static
         * @param {Uint8Array} bytes
         * @param {string} type
         * @return {*}  {(number|Array<number>|string|undefined)}
         * @memberof NwctPayloadBytesHelper
         *
         * Review Lukas Obersamer:
         * The cyclomatic complexity of this function is too high, but that does not reflct the complexity for humans to understand it.
         * The complexity of understing this method is in fact super simple. Therefore the method may remain in this form.
         * Future implementations should avoid using the switch case and use a map, a strategy pattern or a similar approach instead.
         */
        NwctPayloadBytesHelper.getKaitaiParsedTypes = function (bytes, type) {
            // create a KaitaiStream and pass the binary data
            var kaitaiStream = new KaitaiStream(bytes);
            switch (type) {
                case "I1": return new I1Type(kaitaiStream).i1Type;
                case "I2": return new I2Type(kaitaiStream).i2Type;
                case "I4": return new I4Type(kaitaiStream).i4Type;
                case "BOOL":
                case "X1":
                case "UI1": return new UI1Type(kaitaiStream).ui1Type;
                case "X2":
                case "PARID":
                case "UI2": return new UI2Type(kaitaiStream).ui2Type;
                case "BRMOD":
                case "DATA":
                case "X4":
                case "UI4": return new UI4Type(kaitaiStream).ui4Type;
                case "STR6": return new STR6Type(kaitaiStream).str6Type;
                case "R4": return new R4Type(kaitaiStream).r4Type;
                case "R8": return new R8Type(kaitaiStream).r8Type;
                case "BP8": return [new UI1Type(kaitaiStream).ui1Type];
                case "BP16": return new BP16Type(kaitaiStream).bp16;
                case "BP32": return new BP32Type(kaitaiStream).bp32;
                case "BYTES6": return new BYTES6Type(kaitaiStream).bytes6;
                case "T5":
                    var tmp = new T5Time(kaitaiStream);
                    return [tmp.hour, tmp.min, tmp.sec, tmp.hundredSec, tmp.day, tmp.month, tmp.year];
                default:
                    if (type.startsWith("BYTES") || type.startsWith("STR")) {
                        return new UI4Type(kaitaiStream).ui4Type;
                    }
                    return undefined;
            }
        };
        /**
         * Returns a number for the given ByteArray for the given byteCount
         *
         * @static
         * @param {Uint8Array} bytes
         * @param {number} [byteCount=1]
         * @returns {number}
         * @memberof NwctPayloadBytesHelper
         */
        NwctPayloadBytesHelper.getNumber = function (bytes, byteCount) {
            if (byteCount === void 0) { byteCount = 1; }
            if (byteCount == 4) {
                return ((bytes[0] | bytes[1] << 8) | bytes[2] << 16) | bytes[3] << 24;
            }
            if (byteCount == 2) {
                return bytes[0] | bytes[1] << 8;
            }
            return bytes[0];
        };
        /**
         * Returns a number for the given ByteArray for the given BitPattern type
         *
         * @static
         * @param {Uint8Array} payloadBytes
         * @param {string} type
         * @returns {number}
         * @memberof NwctPayloadBytesHelper
         */
        NwctPayloadBytesHelper.getBPnumber = function (payloadBytes, type) {
            if (type == "BP8") {
                return payloadBytes[0];
            }
            else if (type == "BP16") {
                return this.getNumber(payloadBytes.slice(0, 2), 2);
            }
            else if (type == "BP32") {
                return this.getNumber(payloadBytes.slice(0, 4), 4);
            }
            return 0;
        };
        return NwctPayloadBytesHelper;
    }());
    exports.NwctPayloadBytesHelper = NwctPayloadBytesHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFBheWxvYWRCeXRlc0hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9ud2N0UGF5bG9hZEJ5dGVzSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWVBO1FBQUE7UUEyRkEsQ0FBQztRQXpGRzs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ1csMkNBQW9CLEdBQWxDLFVBQW1DLEtBQWlCLEVBQUUsSUFBWTtZQUM5RCxpREFBaUQ7WUFDakQsSUFBSSxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFM0MsUUFBTyxJQUFJLEVBQUU7Z0JBQ1QsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDbEQsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDbEQsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDbEQsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxLQUFLLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDckQsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxLQUFLLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDckQsS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxLQUFLLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFlBQVks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LDZCQUFDO0lBQUQsQ0FBQyxBQTNGRCxJQTJGQztJQTNGWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBJMVR5cGUgZnJvbSBcIi4uLy4uL2xpYnMvZGF0YXBhcnNpbmcvcHJpbWl0aXZlVHlwZXMvSTFUeXBlXCI7XHJcbmltcG9ydCAqIGFzIEkyVHlwZSBmcm9tIFwiLi4vLi4vbGlicy9kYXRhcGFyc2luZy9wcmltaXRpdmVUeXBlcy9JMlR5cGVcIjtcclxuaW1wb3J0ICogYXMgSTRUeXBlIGZyb20gXCIuLi8uLi9saWJzL2RhdGFwYXJzaW5nL3ByaW1pdGl2ZVR5cGVzL0k0VHlwZVwiO1xyXG5pbXBvcnQgKiBhcyBVSTFUeXBlIGZyb20gXCIuLi8uLi9saWJzL2RhdGFwYXJzaW5nL3ByaW1pdGl2ZVR5cGVzL1VJMVR5cGVcIjtcclxuaW1wb3J0ICogYXMgVUkyVHlwZSBmcm9tIFwiLi4vLi4vbGlicy9kYXRhcGFyc2luZy9wcmltaXRpdmVUeXBlcy9VSTJUeXBlXCI7XHJcbmltcG9ydCAqIGFzIFVJNFR5cGUgZnJvbSBcIi4uLy4uL2xpYnMvZGF0YXBhcnNpbmcvcHJpbWl0aXZlVHlwZXMvVUk0VHlwZVwiO1xyXG5pbXBvcnQgKiBhcyBSNFR5cGUgZnJvbSBcIi4uLy4uL2xpYnMvZGF0YXBhcnNpbmcvcHJpbWl0aXZlVHlwZXMvUjRUeXBlXCI7XHJcbmltcG9ydCAqIGFzIFI4VHlwZSBmcm9tIFwiLi4vLi4vbGlicy9kYXRhcGFyc2luZy9wcmltaXRpdmVUeXBlcy9SOFR5cGVcIjtcclxuaW1wb3J0ICogYXMgQlAxNlR5cGUgZnJvbSBcIi4uLy4uL2xpYnMvZGF0YXBhcnNpbmcvcHJpbWl0aXZlVHlwZXMvQlAxNlR5cGVcIjtcclxuaW1wb3J0ICogYXMgQlAzMlR5cGUgZnJvbSBcIi4uLy4uL2xpYnMvZGF0YXBhcnNpbmcvcHJpbWl0aXZlVHlwZXMvQlAzMlR5cGVcIjtcclxuaW1wb3J0ICogYXMgQllURVM2VHlwZSBmcm9tIFwiLi4vLi4vbGlicy9kYXRhcGFyc2luZy9wcmltaXRpdmVUeXBlcy9CWVRFUzZUeXBlXCI7XHJcbmltcG9ydCAqIGFzIFQ1VGltZSBmcm9tIFwiLi4vLi4vbGlicy9kYXRhcGFyc2luZy9wcmltaXRpdmVUeXBlcy9UNVRpbWVcIjtcclxuaW1wb3J0ICogYXMgU1RSNlR5cGUgZnJvbSBcIi4uLy4uL2xpYnMvZGF0YXBhcnNpbmcvcHJpbWl0aXZlVHlwZXMvU1RSNlR5cGVcIjtcclxuaW1wb3J0ICogYXMgS2FpdGFpU3RyZWFtIGZyb20gXCIuLi8uLi9saWJzL2RhdGFwYXJzaW5nL2thaXRhaS1zdHJ1Y3QvS2FpdGFpU3RyZWFtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTndjdFBheWxvYWRCeXRlc0hlbHBlcntcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRha2VzIHRoZSBQYXlsb2FkIEJ5dGVzIGFzIFVpbnQ4QXJyYXkgYW5kIHRoZSB0eXBlIGluZm9ybWF0aW9uIGFuZCBwYXJzZSBpdCB3aXRoIHRoZSBoZWxwIG9mIHRoZSBLYWl0YWkgcGFyc2VyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtVaW50OEFycmF5fSBieXRlc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEByZXR1cm4geyp9ICB7KG51bWJlcnxBcnJheTxudW1iZXI+fHN0cmluZ3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQYXlsb2FkQnl0ZXNIZWxwZXJcclxuICAgICAqIFxyXG4gICAgICogUmV2aWV3IEx1a2FzIE9iZXJzYW1lcjpcclxuICAgICAqIFRoZSBjeWNsb21hdGljIGNvbXBsZXhpdHkgb2YgdGhpcyBmdW5jdGlvbiBpcyB0b28gaGlnaCwgYnV0IHRoYXQgZG9lcyBub3QgcmVmbGN0IHRoZSBjb21wbGV4aXR5IGZvciBodW1hbnMgdG8gdW5kZXJzdGFuZCBpdC4gXHJcbiAgICAgKiBUaGUgY29tcGxleGl0eSBvZiB1bmRlcnN0aW5nIHRoaXMgbWV0aG9kIGlzIGluIGZhY3Qgc3VwZXIgc2ltcGxlLiBUaGVyZWZvcmUgdGhlIG1ldGhvZCBtYXkgcmVtYWluIGluIHRoaXMgZm9ybS5cclxuICAgICAqIEZ1dHVyZSBpbXBsZW1lbnRhdGlvbnMgc2hvdWxkIGF2b2lkIHVzaW5nIHRoZSBzd2l0Y2ggY2FzZSBhbmQgdXNlIGEgbWFwLCBhIHN0cmF0ZWd5IHBhdHRlcm4gb3IgYSBzaW1pbGFyIGFwcHJvYWNoIGluc3RlYWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0S2FpdGFpUGFyc2VkVHlwZXMoYnl0ZXM6IFVpbnQ4QXJyYXksIHR5cGU6IHN0cmluZykgOiBudW1iZXJ8QXJyYXk8bnVtYmVyPnxzdHJpbmd8dW5kZWZpbmVkIHtcclxuICAgICAgICAvLyBjcmVhdGUgYSBLYWl0YWlTdHJlYW0gYW5kIHBhc3MgdGhlIGJpbmFyeSBkYXRhXHJcbiAgICAgICAgbGV0IGthaXRhaVN0cmVhbSA9IG5ldyBLYWl0YWlTdHJlYW0oYnl0ZXMpO1xyXG5cclxuICAgICAgICBzd2l0Y2godHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiSTFcIjogcmV0dXJuIG5ldyBJMVR5cGUoa2FpdGFpU3RyZWFtKS5pMVR5cGU7XHJcbiAgICAgICAgICAgIGNhc2UgXCJJMlwiOiByZXR1cm4gbmV3IEkyVHlwZShrYWl0YWlTdHJlYW0pLmkyVHlwZTtcclxuICAgICAgICAgICAgY2FzZSBcIkk0XCI6IHJldHVybiBuZXcgSTRUeXBlKGthaXRhaVN0cmVhbSkuaTRUeXBlO1xyXG4gICAgICAgICAgICBjYXNlIFwiQk9PTFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiWDFcIjpcclxuICAgICAgICAgICAgY2FzZSBcIlVJMVwiOiByZXR1cm4gbmV3IFVJMVR5cGUoa2FpdGFpU3RyZWFtKS51aTFUeXBlO1xyXG4gICAgICAgICAgICBjYXNlIFwiWDJcIjpcclxuICAgICAgICAgICAgY2FzZSBcIlBBUklEXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJVSTJcIjogcmV0dXJuIG5ldyBVSTJUeXBlKGthaXRhaVN0cmVhbSkudWkyVHlwZTtcclxuICAgICAgICAgICAgY2FzZSBcIkJSTU9EXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJEQVRBXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJYNFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiVUk0XCI6IHJldHVybiBuZXcgVUk0VHlwZShrYWl0YWlTdHJlYW0pLnVpNFR5cGU7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTVFI2XCI6IHJldHVybiBuZXcgU1RSNlR5cGUoa2FpdGFpU3RyZWFtKS5zdHI2VHlwZTtcclxuICAgICAgICAgICAgY2FzZSBcIlI0XCI6IHJldHVybiBuZXcgUjRUeXBlKGthaXRhaVN0cmVhbSkucjRUeXBlO1xyXG4gICAgICAgICAgICBjYXNlIFwiUjhcIjogcmV0dXJuIG5ldyBSOFR5cGUoa2FpdGFpU3RyZWFtKS5yOFR5cGU7XHJcbiAgICAgICAgICAgIGNhc2UgXCJCUDhcIjogcmV0dXJuIFtuZXcgVUkxVHlwZShrYWl0YWlTdHJlYW0pLnVpMVR5cGVdO1xyXG4gICAgICAgICAgICBjYXNlIFwiQlAxNlwiOiByZXR1cm4gbmV3IEJQMTZUeXBlKGthaXRhaVN0cmVhbSkuYnAxNjtcclxuICAgICAgICAgICAgY2FzZSBcIkJQMzJcIjogcmV0dXJuIG5ldyBCUDMyVHlwZShrYWl0YWlTdHJlYW0pLmJwMzI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJCWVRFUzZcIjogcmV0dXJuIG5ldyBCWVRFUzZUeXBlKGthaXRhaVN0cmVhbSkuYnl0ZXM2O1xyXG4gICAgICAgICAgICBjYXNlIFwiVDVcIjogbGV0IHRtcCA9IG5ldyBUNVRpbWUoa2FpdGFpU3RyZWFtKTsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3RtcC5ob3VyLCB0bXAubWluLCB0bXAuc2VjLCB0bXAuaHVuZHJlZFNlYywgdG1wLmRheSwgdG1wLm1vbnRoLCB0bXAueWVhcl07XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlLnN0YXJ0c1dpdGgoXCJCWVRFU1wiKSB8fCB0eXBlLnN0YXJ0c1dpdGgoXCJTVFJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVJNFR5cGUoa2FpdGFpU3RyZWFtKS51aTRUeXBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbnVtYmVyIGZvciB0aGUgZ2l2ZW4gQnl0ZUFycmF5IGZvciB0aGUgZ2l2ZW4gYnl0ZUNvdW50XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtVaW50OEFycmF5fSBieXRlc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtieXRlQ291bnQ9MV1cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFBheWxvYWRCeXRlc0hlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE51bWJlcihieXRlczogVWludDhBcnJheSwgYnl0ZUNvdW50OiBudW1iZXIgPSAxKTogbnVtYmVye1xyXG4gICAgICAgIGlmKGJ5dGVDb3VudCA9PSA0KXtcclxuICAgICAgICAgICAgcmV0dXJuICgoYnl0ZXNbMF0gfCBieXRlc1sxXSA8PCA4KSB8IGJ5dGVzWzJdIDw8IDE2KSB8IGJ5dGVzWzNdIDw8IDI0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihieXRlQ291bnQgPT0gMil7XHJcbiAgICAgICAgICAgIHJldHVybiBieXRlc1swXSB8IGJ5dGVzWzFdIDw8IDg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBieXRlc1swXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBudW1iZXIgZm9yIHRoZSBnaXZlbiBCeXRlQXJyYXkgZm9yIHRoZSBnaXZlbiBCaXRQYXR0ZXJuIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IHBheWxvYWRCeXRlc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFBheWxvYWRCeXRlc0hlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEJQbnVtYmVyKHBheWxvYWRCeXRlczogVWludDhBcnJheSwgdHlwZTogc3RyaW5nKTogbnVtYmVye1xyXG4gICAgICAgIGlmKHR5cGUgPT0gXCJCUDhcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXlsb2FkQnl0ZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHlwZSA9PSBcIkJQMTZcIil7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE51bWJlcihwYXlsb2FkQnl0ZXMuc2xpY2UoMCwyKSwgMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHlwZSA9PSBcIkJQMzJcIil7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE51bWJlcihwYXlsb2FkQnl0ZXMuc2xpY2UoMCw0KSwgNCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG59Il19