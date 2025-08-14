define(["require", "exports", "./bindingType"], function (require, exports, bindingType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Binding Declaration base class => IBindingDeclaration interface must be changed if this class is changed!!!
     *
     * @export
     * @class BindingDeclaration
     */
    var BindingDeclaration = /** @class */ (function () {
        function BindingDeclaration() {
        }
        BindingDeclaration.scope = "";
        BindingDeclaration.id = "";
        BindingDeclaration.bindingType = bindingType_1.BindingType.UNDEFINED;
        BindingDeclaration.dataType = "";
        BindingDeclaration.passByValue = true;
        return BindingDeclaration;
    }());
    exports.BindingDeclaration = BindingDeclaration;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ0RlY2xhcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2JpbmRpbmdEZWNsYXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTs7Ozs7T0FLRztJQUNIO1FBQUE7UUFNQSxDQUFDO1FBTGlCLHdCQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gscUJBQUUsR0FBRyxFQUFFLENBQUM7UUFDUiw4QkFBVyxHQUFHLHlCQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3BDLDJCQUFRLEdBQXdCLEVBQUUsQ0FBQztRQUNuQyw4QkFBVyxHQUFHLElBQUksQ0FBQztRQUNyQyx5QkFBQztLQUFBLEFBTkQsSUFNQztJQU5ZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJpbmRpbmdUeXBlIH0gZnJvbSBcIi4vYmluZGluZ1R5cGVcIjtcclxuaW1wb3J0IHsgVENvbm5lY3Rpb25EYXRhVHlwZSB9IGZyb20gXCIuLi9jb21tb24vY29tbW9uVHlwZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBCaW5kaW5nIERlY2xhcmF0aW9uIGJhc2UgY2xhc3MgPT4gSUJpbmRpbmdEZWNsYXJhdGlvbiBpbnRlcmZhY2UgbXVzdCBiZSBjaGFuZ2VkIGlmIHRoaXMgY2xhc3MgaXMgY2hhbmdlZCEhIVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBCaW5kaW5nRGVjbGFyYXRpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCaW5kaW5nRGVjbGFyYXRpb257XHJcbiAgICBwdWJsaWMgc3RhdGljIHNjb3BlID0gXCJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgaWQgPSBcIlwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLlVOREVGSU5FRDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZGF0YVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUgPSBcIlwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBwYXNzQnlWYWx1ZSA9IHRydWU7XHJcbn0iXX0=