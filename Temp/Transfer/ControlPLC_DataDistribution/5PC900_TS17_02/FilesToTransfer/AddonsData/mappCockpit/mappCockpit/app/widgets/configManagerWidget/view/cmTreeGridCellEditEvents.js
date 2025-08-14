define(["require", "exports", "../configManagerWidget"], function (require, exports, configManagerWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmTreeGridCellEditEvents = /** @class */ (function () {
        function CmTreeGridCellEditEvents() {
        }
        CmTreeGridCellEditEvents.prototype.beginEdit = function (args, dataModel) {
            // index 1 is modified value and index 2 is value
            // modified value can only be changed if user with write access is logged in
            var writeAccess = false;
            if (dataModel != undefined) {
                writeAccess = dataModel.writeAccess;
            }
            var item = args.data.item;
            if (args.columnIndex != 1 || (writeAccess == false || item.isReadOnly == true || args.data.element.componentParameter == undefined)) {
                args.cancel = true;
            }
        };
        CmTreeGridCellEditEvents.prototype.endEdit = function (args, dataModel) {
            if (args.columnObject.field == configManagerWidget_1.ConfigManagerWidget.displayModifiedValueColumnId) {
                if (dataModel != undefined) {
                    dataModel.setValue(args.data.element, args.value);
                }
            }
        };
        return CmTreeGridCellEditEvents;
    }());
    exports.CmTreeGridCellEditEvents = CmTreeGridCellEditEvents;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21UcmVlR3JpZENlbGxFZGl0RXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbmZpZ01hbmFnZXJXaWRnZXQvdmlldy9jbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFBQTtRQXFCQSxDQUFDO1FBcEJHLDRDQUFTLEdBQVQsVUFBVSxJQUFJLEVBQUUsU0FBaUQ7WUFDN0QsaURBQWlEO1lBQ2pELDRFQUE0RTtZQUM1RSxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBRyxTQUFTLElBQUksU0FBUyxFQUFDO2dCQUN0QixXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQzthQUN2QztZQUNELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBZSxDQUFDO1lBQ3JDLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLFNBQVMsQ0FBQyxFQUFDO2dCQUMvSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN0QjtRQUNMLENBQUM7UUFFRCwwQ0FBTyxHQUFQLFVBQVEsSUFBSSxFQUFFLFNBQWlEO1lBQzNELElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUkseUNBQW1CLENBQUMsNEJBQTRCLEVBQUM7Z0JBQzNFLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztvQkFDdEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JEO2FBQ0o7UUFDTCxDQUFDO1FBQ0wsK0JBQUM7SUFBRCxDQUFDLEFBckJELElBcUJDO0lBckJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZ01hbmFnZXJXaWRnZXQgfSBmcm9tIFwiLi4vY29uZmlnTWFuYWdlcldpZGdldFwiO1xyXG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsIH0gZnJvbSBcIi4uL21vZGVsL2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgSUNtTm9kZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NtTm9kZUludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENtVHJlZUdyaWRDZWxsRWRpdEV2ZW50c3tcclxuICAgIGJlZ2luRWRpdChhcmdzLCBkYXRhTW9kZWw6IENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWx8dW5kZWZpbmVkKXtcclxuICAgICAgICAvLyBpbmRleCAxIGlzIG1vZGlmaWVkIHZhbHVlIGFuZCBpbmRleCAyIGlzIHZhbHVlXHJcbiAgICAgICAgLy8gbW9kaWZpZWQgdmFsdWUgY2FuIG9ubHkgYmUgY2hhbmdlZCBpZiB1c2VyIHdpdGggd3JpdGUgYWNjZXNzIGlzIGxvZ2dlZCBpblxyXG4gICAgICAgIGxldCB3cml0ZUFjY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgIGlmKGRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB3cml0ZUFjY2VzcyA9IGRhdGFNb2RlbC53cml0ZUFjY2VzcztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBhcmdzLmRhdGEuaXRlbSBhcyBJQ21Ob2RlO1xyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uSW5kZXggIT0gMSB8fCAod3JpdGVBY2Nlc3MgPT0gZmFsc2UgfHwgaXRlbS5pc1JlYWRPbmx5ID09IHRydWUgfHwgYXJncy5kYXRhLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyID09IHVuZGVmaW5lZCkpe1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuZEVkaXQoYXJncywgZGF0YU1vZGVsOiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5PYmplY3QuZmllbGQgPT0gQ29uZmlnTWFuYWdlcldpZGdldC5kaXNwbGF5TW9kaWZpZWRWYWx1ZUNvbHVtbklkKXtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBkYXRhTW9kZWwuc2V0VmFsdWUoYXJncy5kYXRhLmVsZW1lbnQsIGFyZ3MudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==