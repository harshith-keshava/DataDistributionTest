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
define(["require", "exports", "../../../common/packageConversion/cursorStateConversion", "../../../common/packageConversion/basePackageConverter", "../../../common/packageConversion/enum/objectTypeEnum"], function (require, exports, cursorStateConversion_1, basePackageConverter_1, objectTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling the cursor states setting.
     *
     * @class CursorStatesPackageConverter
     * @extends {BasePackageConverter}
     */
    var CursorStatesPackageConverter = /** @class */ (function (_super) {
        __extends(CursorStatesPackageConverter, _super);
        /**
         * Creates an instance of CursorStatesPackageConverter.
         *
         * @memberof CursorStatesPackageConverter
         */
        function CursorStatesPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.CURSORSTATES, "CursorStates") || this;
            _this.conversionInfoContainer.addConversion("1.0", 1, [
                new cursorStateConversion_1.CursorStateConversion()
            ]);
            return _this;
        }
        return CursorStatesPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.CursorStatesPackageConverter = CursorStatesPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU3RhdGVzUGFja2FnZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1BhY2thZ2VDb252ZXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBOzs7OztPQUtHO0lBQ0g7UUFBMkMsZ0RBQW9CO1FBRTNEOzs7O1dBSUc7UUFDSDtZQUFBLFlBRUksa0JBQU0sMkJBQVUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLFNBS2pEO1lBSEcsS0FBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLDZDQUFxQixFQUFFO2FBQzlCLENBQUMsQ0FBQzs7UUFDUCxDQUFDO1FBRUwsbUNBQUM7SUFBRCxDQUFDLEFBaEJELENBQTJDLDJDQUFvQixHQWdCOUQ7SUFFUSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXJzb3JTdGF0ZUNvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2N1cnNvclN0YXRlQ29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBCYXNlUGFja2FnZUNvbnZlcnRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYmFzZVBhY2thZ2VDb252ZXJ0ZXJcIjtcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9vYmplY3RUeXBlRW51bVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBwYWNrYWdlIGNvbnZlcnRlciBoYW5kbGluZyB0aGUgY3Vyc29yIHN0YXRlcyBzZXR0aW5nLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ3Vyc29yU3RhdGVzUGFja2FnZUNvbnZlcnRlclxyXG4gKiBAZXh0ZW5kcyB7QmFzZVBhY2thZ2VDb252ZXJ0ZXJ9XHJcbiAqL1xyXG5jbGFzcyBDdXJzb3JTdGF0ZXNQYWNrYWdlQ29udmVydGVyIGV4dGVuZHMgQmFzZVBhY2thZ2VDb252ZXJ0ZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDdXJzb3JTdGF0ZXNQYWNrYWdlQ29udmVydGVyLlxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzUGFja2FnZUNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoT2JqZWN0VHlwZS5DVVJTT1JTVEFURVMsIFwiQ3Vyc29yU3RhdGVzXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29udmVyc2lvbkluZm9Db250YWluZXIuYWRkQ29udmVyc2lvbihcIjEuMFwiLCAxLCBbXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JTdGF0ZUNvbnZlcnNpb24oKVxyXG4gICAgICAgIF0pOyBcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IEN1cnNvclN0YXRlc1BhY2thZ2VDb252ZXJ0ZXIgfSJdfQ==