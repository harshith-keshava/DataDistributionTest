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
define(["require", "exports", "../chartCommandBase"], function (require, exports, chartCommandBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TooglePanningCommand = /** @class */ (function (_super) {
        __extends(TooglePanningCommand, _super);
        function TooglePanningCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TooglePanningCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.setPanning(args.data.panningEnabled);
        };
        return TooglePanningCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.TooglePanningCommand = TooglePanningCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vZ2xlUGFubmluZ0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3Rvb2dsZVBhbm5pbmdDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUEwQyx3Q0FBZ0I7UUFBMUQ7O1FBS0EsQ0FBQztRQUhHLG9EQUFxQixHQUFyQixVQUFzQixNQUFXLEVBQUUsSUFBa0M7WUFDakUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFDTCwyQkFBQztJQUFELENBQUMsQUFMRCxDQUEwQyxtQ0FBZ0IsR0FLekQ7SUFMWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydENvbW1hbmRCYXNlIH0gZnJvbSBcIi4uL2NoYXJ0Q29tbWFuZEJhc2VcIjtcclxuaW1wb3J0IHsgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyB9IGZyb20gXCIuLi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2dsZVBhbm5pbmdDb21tYW5kIGV4dGVuZHMgQ2hhcnRDb21tYW5kQmFzZXtcclxuICAgIFxyXG4gICAgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlcjogYW55LCBhcmdzOiBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXdDaGFydE1hbmFnZXIuc2V0UGFubmluZyhhcmdzLmRhdGEucGFubmluZ0VuYWJsZWQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==