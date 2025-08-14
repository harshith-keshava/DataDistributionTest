define(["require", "exports", "../../common/domHelper", "../configManagerWidget"], function (require, exports, domHelper_1, configManagerWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmTreeGridCellStyle = /** @class */ (function () {
        function CmTreeGridCellStyle() {
        }
        CmTreeGridCellStyle.prototype.setCellStyle = function (args, dataModel) {
            if (args.column.field == configManagerWidget_1.ConfigManagerWidget.displayModifiedValueColumnId) {
                var writeAccess = false;
                if (dataModel != undefined) {
                    writeAccess = dataModel.writeAccess;
                }
                var writeAccessDisabled = !writeAccess;
                if (args.cellElement.classList != undefined) {
                    var item = args.data.item;
                    // Show ReadOnly cells with other color
                    var disableTreeCellClassName = "treeCellDisabled";
                    if (writeAccessDisabled == true || item.isReadOnly == true) {
                        args.cellElement.classList.add(disableTreeCellClassName);
                    }
                    else {
                        args.cellElement.classList.remove(disableTreeCellClassName);
                    }
                }
                // Set all cells disabled in the targetValue column
                domHelper_1.DomHelper.disableElement(args.cellElement, writeAccessDisabled);
            }
            if (args.column.field == configManagerWidget_1.ConfigManagerWidget.displayValueColumnId) {
                if (args.cellElement.classList != undefined) {
                    // Show all cells read only in the targetValue column
                    var disableTreeCellClassName = "treeCellDisabled";
                    args.cellElement.classList.add(disableTreeCellClassName);
                }
                // Set all cells disabled in the targetValue column
                domHelper_1.DomHelper.disableElement(args.cellElement, true);
            }
        };
        return CmTreeGridCellStyle;
    }());
    exports.CmTreeGridCellStyle = CmTreeGridCellStyle;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21UcmVlR3JpZENlbGxTdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L3ZpZXcvY21UcmVlR3JpZENlbGxTdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQUFBO1FBZ0NBLENBQUM7UUEvQkcsMENBQVksR0FBWixVQUFjLElBQUksRUFBRSxTQUFpRDtZQUNqRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLHlDQUFtQixDQUFDLDRCQUE0QixFQUFDO2dCQUN0RSxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztvQkFDdEIsV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7aUJBQ3ZDO2dCQUNELElBQUksbUJBQW1CLEdBQUcsQ0FBQyxXQUFXLENBQUM7Z0JBQ3ZDLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFDO29CQUN2QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQWUsQ0FBQztvQkFDckMsdUNBQXVDO29CQUN2QyxJQUFJLHdCQUF3QixHQUFHLGtCQUFrQixDQUFDO29CQUNsRCxJQUFHLG1CQUFtQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBQzt3QkFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7cUJBQzVEO3lCQUNHO3dCQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO3FCQUMvRDtpQkFDSjtnQkFDRCxtREFBbUQ7Z0JBQ25ELHFCQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzthQUNuRTtZQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUkseUNBQW1CLENBQUMsb0JBQW9CLEVBQUM7Z0JBQzlELElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFDO29CQUN2QyxxREFBcUQ7b0JBQ3JELElBQUksd0JBQXdCLEdBQUcsa0JBQWtCLENBQUM7b0JBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2lCQUM1RDtnQkFDRCxtREFBbUQ7Z0JBQ25ELHFCQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDckQ7UUFDSixDQUFDO1FBQ0wsMEJBQUM7SUFBRCxDQUFDLEFBaENELElBZ0NDO0lBaENZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZG9tSGVscGVyXCI7XHJcbmltcG9ydCB7IENvbmZpZ01hbmFnZXJXaWRnZXQgfSBmcm9tIFwiLi4vY29uZmlnTWFuYWdlcldpZGdldFwiO1xyXG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsIH0gZnJvbSBcIi4uL21vZGVsL2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgSUNtTm9kZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NtTm9kZUludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENtVHJlZUdyaWRDZWxsU3R5bGV7XHJcbiAgICBzZXRDZWxsU3R5bGUgKGFyZ3MsIGRhdGFNb2RlbDogQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbHx1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmIChhcmdzLmNvbHVtbi5maWVsZCA9PSBDb25maWdNYW5hZ2VyV2lkZ2V0LmRpc3BsYXlNb2RpZmllZFZhbHVlQ29sdW1uSWQpe1xyXG4gICAgICAgICAgICBsZXQgd3JpdGVBY2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB3cml0ZUFjY2VzcyA9IGRhdGFNb2RlbC53cml0ZUFjY2VzcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgd3JpdGVBY2Nlc3NEaXNhYmxlZCA9ICF3cml0ZUFjY2VzcztcclxuICAgICAgICAgICAgaWYoYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gYXJncy5kYXRhLml0ZW0gYXMgSUNtTm9kZTtcclxuICAgICAgICAgICAgICAgIC8vIFNob3cgUmVhZE9ubHkgY2VsbHMgd2l0aCBvdGhlciBjb2xvclxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSA9IFwidHJlZUNlbGxEaXNhYmxlZFwiO1xyXG4gICAgICAgICAgICAgICAgaWYod3JpdGVBY2Nlc3NEaXNhYmxlZCA9PSB0cnVlIHx8IGl0ZW0uaXNSZWFkT25seSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU2V0IGFsbCBjZWxscyBkaXNhYmxlZCBpbiB0aGUgdGFyZ2V0VmFsdWUgY29sdW1uXHJcbiAgICAgICAgICAgIERvbUhlbHBlci5kaXNhYmxlRWxlbWVudChhcmdzLmNlbGxFbGVtZW50LCB3cml0ZUFjY2Vzc0Rpc2FibGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFyZ3MuY29sdW1uLmZpZWxkID09IENvbmZpZ01hbmFnZXJXaWRnZXQuZGlzcGxheVZhbHVlQ29sdW1uSWQpe1xyXG4gICAgICAgICAgICBpZihhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBhbGwgY2VsbHMgcmVhZCBvbmx5IGluIHRoZSB0YXJnZXRWYWx1ZSBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUgPSBcInRyZWVDZWxsRGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNldCBhbGwgY2VsbHMgZGlzYWJsZWQgaW4gdGhlIHRhcmdldFZhbHVlIGNvbHVtblxyXG4gICAgICAgICAgICBEb21IZWxwZXIuZGlzYWJsZUVsZW1lbnQoYXJncy5jZWxsRWxlbWVudCwgdHJ1ZSk7XHJcbiAgICAgICB9IFxyXG4gICAgfVxyXG59Il19