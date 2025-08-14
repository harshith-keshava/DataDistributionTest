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
define(["require", "exports", "./bindingType", "./bindingDeclaration", "../../../common/componentBase/contextIds/contextIdsComponent"], function (require, exports, bindingType_1, bindingDeclaration_1, contextIdsComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Defines all scopes for components
    var BindingScope = /** @class */ (function () {
        function BindingScope() {
        }
        BindingScope.Component = "app::component";
        BindingScope.ComponentsProvider = "app::components provider";
        return BindingScope;
    }());
    exports.BindingScope = BindingScope;
    // Defines all binding declarations for components
    var Components;
    (function (Components) {
        var UserComponentIds = /** @class */ (function (_super) {
            __extends(UserComponentIds, _super);
            function UserComponentIds() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UserComponentIds.scope = BindingScope.ComponentsProvider;
            UserComponentIds.id = "user component ids";
            UserComponentIds.bindingType = bindingType_1.BindingType.DATA;
            UserComponentIds.dataType = "";
            return UserComponentIds;
        }(bindingDeclaration_1.BindingDeclaration));
        Components.UserComponentIds = UserComponentIds;
        var Component;
        (function (Component) {
            var componentIdPlaceHolder = "<%" + contextIdsComponent_1.ContextIdsComponent.ComponentId + "%>";
            var Connect = /** @class */ (function (_super) {
                __extends(Connect, _super);
                function Connect() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Connect.scope = BindingScope.Component;
                Connect.id = "connect";
                Connect.bindingType = bindingType_1.BindingType.COMMAND;
                Connect.dataType = "";
                return Connect;
            }(bindingDeclaration_1.BindingDeclaration));
            Component.Connect = Connect;
            var Disconnect = /** @class */ (function (_super) {
                __extends(Disconnect, _super);
                function Disconnect() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Disconnect.scope = BindingScope.Component;
                Disconnect.id = "disconnect";
                Disconnect.bindingType = bindingType_1.BindingType.COMMAND;
                Disconnect.dataType = "";
                return Disconnect;
            }(bindingDeclaration_1.BindingDeclaration));
            Component.Disconnect = Disconnect;
            var Messages = /** @class */ (function (_super) {
                __extends(Messages, _super);
                function Messages() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Messages.scope = BindingScope.Component;
                Messages.id = componentIdPlaceHolder + "message parameters";
                Messages.bindingType = bindingType_1.BindingType.DATA;
                Messages.dataType = "";
                return Messages;
            }(bindingDeclaration_1.BindingDeclaration));
            Component.Messages = Messages;
            var Watchables = /** @class */ (function (_super) {
                __extends(Watchables, _super);
                function Watchables() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Watchables.scope = BindingScope.Component;
                Watchables.id = componentIdPlaceHolder + "watchable parameters";
                Watchables.bindingType = bindingType_1.BindingType.DATA;
                Watchables.dataType = "";
                return Watchables;
            }(bindingDeclaration_1.BindingDeclaration));
            Component.Watchables = Watchables;
            var WatchableStates = /** @class */ (function (_super) {
                __extends(WatchableStates, _super);
                function WatchableStates() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                WatchableStates.scope = BindingScope.Component;
                WatchableStates.id = componentIdPlaceHolder + "watchable state parameters";
                WatchableStates.bindingType = bindingType_1.BindingType.DATA;
                WatchableStates.dataType = "";
                return WatchableStates;
            }(bindingDeclaration_1.BindingDeclaration));
            Component.WatchableStates = WatchableStates;
            var Configuration = /** @class */ (function (_super) {
                __extends(Configuration, _super);
                function Configuration() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Configuration.scope = BindingScope.Component;
                Configuration.id = componentIdPlaceHolder + "configuration parameters";
                Configuration.bindingType = bindingType_1.BindingType.DATA;
                Configuration.dataType = "";
                return Configuration;
            }(bindingDeclaration_1.BindingDeclaration));
            Component.Configuration = Configuration;
            var QuickCommands = /** @class */ (function (_super) {
                __extends(QuickCommands, _super);
                function QuickCommands() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                QuickCommands.scope = BindingScope.Component;
                QuickCommands.id = componentIdPlaceHolder + "quick commands";
                QuickCommands.bindingType = bindingType_1.BindingType.DATA;
                QuickCommands.dataType = "";
                return QuickCommands;
            }(bindingDeclaration_1.BindingDeclaration));
            Component.QuickCommands = QuickCommands;
            var UserMethods = /** @class */ (function (_super) {
                __extends(UserMethods, _super);
                function UserMethods() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                UserMethods.scope = BindingScope.Component;
                UserMethods.id = componentIdPlaceHolder + "user methods";
                UserMethods.bindingType = bindingType_1.BindingType.DATA;
                UserMethods.dataType = "";
                return UserMethods;
            }(bindingDeclaration_1.BindingDeclaration));
            Component.UserMethods = UserMethods;
            var AllMethods = /** @class */ (function (_super) {
                __extends(AllMethods, _super);
                function AllMethods() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AllMethods.scope = BindingScope.Component;
                AllMethods.id = componentIdPlaceHolder + "all methods";
                AllMethods.bindingType = bindingType_1.BindingType.DATA;
                AllMethods.dataType = "";
                return AllMethods;
            }(bindingDeclaration_1.BindingDeclaration));
            Component.AllMethods = AllMethods;
        })(Component = Components.Component || (Components.Component = {}));
    })(Components = exports.Components || (exports.Components = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ0RlY2xhcmF0aW9uc0NvbXBvbmVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvYmluZGluZ0RlY2xhcmF0aW9uc0NvbXBvbmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBLG9DQUFvQztJQUNwQztRQUFBO1FBR0EsQ0FBQztRQUZpQixzQkFBUyxHQUFHLGdCQUFnQixDQUFDO1FBQzdCLCtCQUFrQixHQUFHLDBCQUEwQixDQUFDO1FBQ2xFLG1CQUFDO0tBQUEsQUFIRCxJQUdDO0lBSFksb0NBQVk7SUFLekIsa0RBQWtEO0lBQ2xELElBQWlCLFVBQVUsQ0F5RTFCO0lBekVELFdBQWlCLFVBQVU7UUFDdkI7WUFBc0Msb0NBQWtCO1lBQXhEOztZQUtBLENBQUM7WUFKaUIsc0JBQUssR0FBRyxZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDeEMsbUJBQUUsR0FBRyxvQkFBb0IsQ0FBQztZQUMxQiw0QkFBVyxHQUFHLHlCQUFXLENBQUMsSUFBSSxDQUFDO1lBQy9CLHlCQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2hDLHVCQUFDO1NBQUEsQUFMRCxDQUFzQyx1Q0FBa0IsR0FLdkQ7UUFMWSwyQkFBZ0IsbUJBSzVCLENBQUE7UUFFRCxJQUFpQixTQUFTLENBZ0V6QjtRQWhFRCxXQUFpQixTQUFTO1lBQ3RCLElBQUksc0JBQXNCLEdBQUcsSUFBSSxHQUFHLHlDQUFtQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDM0U7Z0JBQTZCLDJCQUFrQjtnQkFBL0M7O2dCQUtBLENBQUM7Z0JBSmlCLGFBQUssR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO2dCQUMvQixVQUFFLEdBQUcsU0FBUyxDQUFDO2dCQUNmLG1CQUFXLEdBQUcseUJBQVcsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLGdCQUFRLEdBQUcsRUFB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QkFBZ0MsOEJBQWtCO2dCQUFsRDs7Z0JBS0EsQ0FBQztnQkFKaUIsZ0JBQUssR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO2dCQUMvQixhQUFFLEdBQUcsc0JBQXNCLEdBQUcsYUFBYSxDQUFDO2dCQUM1QyxzQkFBVyxHQUFHLHlCQUFXLENBQUMsSUFBSSxDQUFDO2dCQUMvQixtQkFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsaUJBQUM7YUFBQSxBQUxELENBQWdDLHVDQUFrQixHQUtqRDtZQUxZLG9CQUFVLGFBS3RCLENBQUE7UUFDTCxDQUFDLEVBaEVnQixTQUFTLEdBQVQsb0JBQVMsS0FBVCxvQkFBUyxRQWdFekI7SUFDTCxDQUFDLEVBekVnQixVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQXlFMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaW5kaW5nVHlwZSB9IGZyb20gXCIuL2JpbmRpbmdUeXBlXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdEZWNsYXJhdGlvbiB9IGZyb20gXCIuL2JpbmRpbmdEZWNsYXJhdGlvblwiO1xyXG5pbXBvcnQgeyBDb250ZXh0SWRzQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbnRleHRJZHMvY29udGV4dElkc0NvbXBvbmVudFwiO1xyXG5cclxuLy8gRGVmaW5lcyBhbGwgc2NvcGVzIGZvciBjb21wb25lbnRzXHJcbmV4cG9ydCBjbGFzcyBCaW5kaW5nU2NvcGV7XHJcbiAgICBwdWJsaWMgc3RhdGljIENvbXBvbmVudCA9IFwiYXBwOjpjb21wb25lbnRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ29tcG9uZW50c1Byb3ZpZGVyID0gXCJhcHA6OmNvbXBvbmVudHMgcHJvdmlkZXJcIjtcclxufVxyXG5cclxuLy8gRGVmaW5lcyBhbGwgYmluZGluZyBkZWNsYXJhdGlvbnMgZm9yIGNvbXBvbmVudHNcclxuZXhwb3J0IG5hbWVzcGFjZSBDb21wb25lbnRze1xyXG4gICAgZXhwb3J0IGNsYXNzIFVzZXJDb21wb25lbnRJZHMgZXh0ZW5kcyBCaW5kaW5nRGVjbGFyYXRpb257XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzY29wZSA9IEJpbmRpbmdTY29wZS5Db21wb25lbnRzUHJvdmlkZXI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpZCA9IFwidXNlciBjb21wb25lbnQgaWRzXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLkRBVEE7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBkYXRhVHlwZSA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBDb21wb25lbnR7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudElkUGxhY2VIb2xkZXIgPSBcIjwlXCIgKyBDb250ZXh0SWRzQ29tcG9uZW50LkNvbXBvbmVudElkICsgXCIlPlwiOyBcclxuICAgICAgICBleHBvcnQgY2xhc3MgQ29ubmVjdCBleHRlbmRzIEJpbmRpbmdEZWNsYXJhdGlvbntcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBzY29wZSA9IEJpbmRpbmdTY29wZS5Db21wb25lbnQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgaWQgPSBcImNvbm5lY3RcIjtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLkNPTU1BTkQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgZGF0YVR5cGUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIERpc2Nvbm5lY3QgZXh0ZW5kcyBCaW5kaW5nRGVjbGFyYXRpb257XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgc2NvcGUgPSBCaW5kaW5nU2NvcGUuQ29tcG9uZW50O1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGlkID0gXCJkaXNjb25uZWN0XCI7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgYmluZGluZ1R5cGUgPSBCaW5kaW5nVHlwZS5DT01NQU5EO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGRhdGFUeXBlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBNZXNzYWdlcyBleHRlbmRzIEJpbmRpbmdEZWNsYXJhdGlvbntcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBzY29wZSA9IEJpbmRpbmdTY29wZS5Db21wb25lbnQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgaWQgPSBjb21wb25lbnRJZFBsYWNlSG9sZGVyICsgXCJtZXNzYWdlIHBhcmFtZXRlcnNcIjtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLkRBVEE7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgZGF0YVR5cGUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBleHBvcnQgY2xhc3MgV2F0Y2hhYmxlcyBleHRlbmRzIEJpbmRpbmdEZWNsYXJhdGlvbntcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBzY29wZSA9IEJpbmRpbmdTY29wZS5Db21wb25lbnQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgaWQgPSBjb21wb25lbnRJZFBsYWNlSG9sZGVyICsgXCJ3YXRjaGFibGUgcGFyYW1ldGVyc1wiO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGJpbmRpbmdUeXBlID0gQmluZGluZ1R5cGUuREFUQTtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBkYXRhVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnQgY2xhc3MgV2F0Y2hhYmxlU3RhdGVzIGV4dGVuZHMgQmluZGluZ0RlY2xhcmF0aW9ue1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQmluZGluZ1Njb3BlLkNvbXBvbmVudDtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBpZCA9IGNvbXBvbmVudElkUGxhY2VIb2xkZXIgKyBcIndhdGNoYWJsZSBzdGF0ZSBwYXJhbWV0ZXJzXCI7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgYmluZGluZ1R5cGUgPSBCaW5kaW5nVHlwZS5EQVRBO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGRhdGFUeXBlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uIGV4dGVuZHMgQmluZGluZ0RlY2xhcmF0aW9ue1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQmluZGluZ1Njb3BlLkNvbXBvbmVudDtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBpZCA9IGNvbXBvbmVudElkUGxhY2VIb2xkZXIgKyBcImNvbmZpZ3VyYXRpb24gcGFyYW1ldGVyc1wiO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGJpbmRpbmdUeXBlID0gQmluZGluZ1R5cGUuREFUQTtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBkYXRhVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnQgY2xhc3MgUXVpY2tDb21tYW5kcyBleHRlbmRzIEJpbmRpbmdEZWNsYXJhdGlvbntcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBzY29wZSA9IEJpbmRpbmdTY29wZS5Db21wb25lbnQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgaWQgPSBjb21wb25lbnRJZFBsYWNlSG9sZGVyICsgXCJxdWljayBjb21tYW5kc1wiO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGJpbmRpbmdUeXBlID0gQmluZGluZ1R5cGUuREFUQTtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBkYXRhVHlwZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnQgY2xhc3MgVXNlck1ldGhvZHMgZXh0ZW5kcyBCaW5kaW5nRGVjbGFyYXRpb257XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgc2NvcGUgPSBCaW5kaW5nU2NvcGUuQ29tcG9uZW50O1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGlkID0gY29tcG9uZW50SWRQbGFjZUhvbGRlciArIFwidXNlciBtZXRob2RzXCI7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgYmluZGluZ1R5cGUgPSBCaW5kaW5nVHlwZS5EQVRBO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGRhdGFUeXBlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBBbGxNZXRob2RzIGV4dGVuZHMgQmluZGluZ0RlY2xhcmF0aW9ue1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQmluZGluZ1Njb3BlLkNvbXBvbmVudDtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBpZCA9IGNvbXBvbmVudElkUGxhY2VIb2xkZXIgKyBcImFsbCBtZXRob2RzXCI7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgYmluZGluZ1R5cGUgPSBCaW5kaW5nVHlwZS5EQVRBO1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGRhdGFUeXBlID0gXCJcIjtcclxuICAgICAgICB9ICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==