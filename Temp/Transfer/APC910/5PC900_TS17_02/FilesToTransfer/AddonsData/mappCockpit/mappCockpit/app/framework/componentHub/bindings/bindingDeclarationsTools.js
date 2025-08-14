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
define(["require", "exports", "./bindingType", "./bindingDeclaration"], function (require, exports, bindingType_1, bindingDeclaration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Defines allscopes for tools
    var BindingScope = /** @class */ (function () {
        function BindingScope() {
        }
        BindingScope.ToolsProvider = "app::tools provider";
        return BindingScope;
    }());
    exports.BindingScope = BindingScope;
    // Defines all binding declarations for tools
    var Tools;
    (function (Tools) {
        var ToolsIds = /** @class */ (function (_super) {
            __extends(ToolsIds, _super);
            function ToolsIds() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ToolsIds.scope = BindingScope.ToolsProvider;
            ToolsIds.id = "tools ids";
            ToolsIds.bindingType = bindingType_1.BindingType.DATA;
            ToolsIds.dataType = "";
            return ToolsIds;
        }(bindingDeclaration_1.BindingDeclaration));
        Tools.ToolsIds = ToolsIds;
    })(Tools = exports.Tools || (exports.Tools = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ0RlY2xhcmF0aW9uc1Rvb2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2JpbmRpbmdEZWNsYXJhdGlvbnNUb29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0EsOEJBQThCO0lBQzlCO1FBQUE7UUFFQSxDQUFDO1FBRGlCLDBCQUFhLEdBQUcscUJBQXFCLENBQUM7UUFDeEQsbUJBQUM7S0FBQSxBQUZELElBRUM7SUFGWSxvQ0FBWTtJQUl6Qiw2Q0FBNkM7SUFDN0MsSUFBaUIsS0FBSyxDQU9yQjtJQVBELFdBQWlCLEtBQUs7UUFDbEI7WUFBOEIsNEJBQWtCO1lBQWhEOztZQUtBLENBQUM7WUFKaUIsY0FBSyxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFDbkMsV0FBRSxHQUFHLFdBQVcsQ0FBQztZQUNqQixvQkFBVyxHQUFHLHlCQUFXLENBQUMsSUFBSSxDQUFDO1lBQy9CLGlCQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2hDLGVBQUM7U0FBQSxBQUxELENBQThCLHVDQUFrQixHQUsvQztRQUxZLGNBQVEsV0FLcEIsQ0FBQTtJQUNMLENBQUMsRUFQZ0IsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBT3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmluZGluZ1R5cGUgfSBmcm9tIFwiLi9iaW5kaW5nVHlwZVwiO1xyXG5pbXBvcnQgeyBCaW5kaW5nRGVjbGFyYXRpb24gfSBmcm9tIFwiLi9iaW5kaW5nRGVjbGFyYXRpb25cIjtcclxuXHJcbi8vIERlZmluZXMgYWxsc2NvcGVzIGZvciB0b29sc1xyXG5leHBvcnQgY2xhc3MgQmluZGluZ1Njb3Ble1xyXG4gICAgcHVibGljIHN0YXRpYyBUb29sc1Byb3ZpZGVyID0gXCJhcHA6OnRvb2xzIHByb3ZpZGVyXCI7XHJcbn1cclxuXHJcbi8vIERlZmluZXMgYWxsIGJpbmRpbmcgZGVjbGFyYXRpb25zIGZvciB0b29sc1xyXG5leHBvcnQgbmFtZXNwYWNlIFRvb2xze1xyXG4gICAgZXhwb3J0IGNsYXNzIFRvb2xzSWRzIGV4dGVuZHMgQmluZGluZ0RlY2xhcmF0aW9ue1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2NvcGUgPSBCaW5kaW5nU2NvcGUuVG9vbHNQcm92aWRlcjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGlkID0gXCJ0b29scyBpZHNcIjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJpbmRpbmdUeXBlID0gQmluZGluZ1R5cGUuREFUQTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGRhdGFUeXBlID0gXCJcIjtcclxuICAgIH1cclxufVxyXG4iXX0=