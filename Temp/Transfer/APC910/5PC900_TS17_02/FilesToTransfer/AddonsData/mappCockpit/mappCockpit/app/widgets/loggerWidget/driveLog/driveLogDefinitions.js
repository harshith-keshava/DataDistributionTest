define(["require", "exports", "../loggerColumnDefinition"], function (require, exports, loggerColumnDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DriveLogDefinitions = /** @class */ (function () {
        function DriveLogDefinitions() {
            /**
             * Column id definitions
             * For this definitions properties must be available in the LoggerEntry interface
             *
             * @private
             * @memberof DriveLogDefinitions
             */
            this.columnIdRecordNumber = "recordNumber";
            this.columnIdTime = "time";
            this.columnIdModule = "module";
            this.columnIdObjectName = "objectName";
            this.columnIdDescriptionRawData = "descriptionRawData";
            this.columnIdResponseTime = "responseTime";
        }
        /**
         * Returns the column definition for the network command trace logger
         *
         * @returns {Array<LoggerColumnDefinition>}
         * @memberof DriveLogDefinitions
         */
        DriveLogDefinitions.prototype.getColumnDefinitions = function () {
            var columnDefinitions = new Array();
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdRecordNumber, "No.", 40, loggerColumnDefinition_1.FieldType.Numeric));
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdTime, "Time [s]", 60, loggerColumnDefinition_1.FieldType.Numeric, true));
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdModule, "Module (Element)", 120, loggerColumnDefinition_1.FieldType.String, true));
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdObjectName, "Appl. Object", 90, loggerColumnDefinition_1.FieldType.String, true, "objectNameTooltipTemplate"));
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdDescriptionRawData, "Drive Parameter Data", 320, loggerColumnDefinition_1.FieldType.String, true, "descriptionTooltipTemplate"));
            columnDefinitions.push(new loggerColumnDefinition_1.LoggerColumnDefinition(this.columnIdResponseTime, "Resp. Time [ms]", 70, loggerColumnDefinition_1.FieldType.Numeric, true));
            return columnDefinitions;
        };
        /**
         * Returns the html representation for the cell with the given columnId
         *
         * @param {string} columnId
         * @param {Array<string>} values
         * @returns {string}
         * @memberof DriveLogDefinitions
         */
        DriveLogDefinitions.prototype.getCellData = function (columnId, cellItem) {
            var item = cellItem;
            if (columnId == this.columnIdRecordNumber) {
                return "&nbsp;&nbsp;&nbsp;&nbsp;" + item.recordNumber.toString();
            }
            else if (columnId == this.columnIdTime) {
                return item.time;
            }
            else if (columnId == this.columnIdModule) {
                return item.module;
            }
            else if (columnId == this.columnIdObjectName) {
                return item.objectName;
            }
            else if (columnId == this.columnIdDescriptionRawData) {
                var imagePath = "widgets/loggerWidget/style/images/" + item.getDescriptionIconId() + ".svg";
                return "<div style=\"white-space: nowrap;\">\n                <div style='position: relative; top:  2px; display: inline-block; width: 30px;'><img height=\"22\" alt=\" \" src=\"" + imagePath + "\"></div>\n                <div style='position: relative; top: -5px; display: inline-block; width: 220px;'>" + item.getDescriptionTextFormated() + "</div>\n                <div style='position: relative; top: -5px; display: inline-block; width: 230px;'>" + item.getDescriptionValueWithUnitFormated() + "&nbsp;</div>\n                <div style='position: relative; top: -5px; display: inline-block;'>" + item.getDescriptionErrorFormated() + "</div>\n            </div>";
            }
            else if (columnId == this.columnIdResponseTime) {
                return item.responseTime;
            }
            console.error("CellData not implemented for column id: " + columnId);
            return "";
        };
        /**
         * Returns the template for the tooltip
         *
         * @returns {string}
         * @memberof DriveLogDefinitions
         */
        DriveLogDefinitions.prototype.getCellTooltipTemplateData = function () {
            return "<script type=\"text/x-jsrender\" id=\"defaultTooltipTemplate\">\n                </script>\n                <script type=\"text/x-jsrender\" id=\"objectNameTooltipTemplate\">\n                    <div class=\"tooltipBox\">\n                        {{:#data['record']['objectName']}}\n                    </div>\n                </script>\n                <script type=\"text/x-jsrender\" id=\"descriptionTooltipTemplate\">\n                    <div class=\"tooltipBox\">\n                        {{:#data['record']['descriptionTooltip']}}\n                    </div>\n                </script>";
        };
        return DriveLogDefinitions;
    }());
    exports.DriveLogDefinitions = DriveLogDefinitions;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmVMb2dEZWZpbml0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9sb2dnZXJXaWRnZXQvZHJpdmVMb2cvZHJpdmVMb2dEZWZpbml0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQUFBO1lBRUk7Ozs7OztlQU1HO1lBQ2MseUJBQW9CLEdBQUcsY0FBYyxDQUFDO1lBQ3RDLGlCQUFZLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLG1CQUFjLEdBQUcsUUFBUSxDQUFDO1lBQzFCLHVCQUFrQixHQUFHLFlBQVksQ0FBQztZQUNsQywrQkFBMEIsR0FBRyxvQkFBb0IsQ0FBQztZQUNsRCx5QkFBb0IsR0FBRyxjQUFjLENBQUM7UUE2RTNELENBQUM7UUEzRUc7Ozs7O1dBS0c7UUFDSSxrREFBb0IsR0FBM0I7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUksS0FBSyxFQUEwQixDQUFDO1lBQzVELGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLCtDQUFzQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLGtDQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1RyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSwrQ0FBc0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsa0NBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSwrQ0FBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxrQ0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pILGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLCtDQUFzQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLGtDQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSwyQkFBMkIsQ0FBQyxDQUFDLENBQUM7WUFDckosaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksK0NBQXNCLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLHNCQUFzQixFQUFFLEdBQUcsRUFBRSxrQ0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1lBQ3ZLLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLCtDQUFzQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsa0NBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5SCxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0kseUNBQVcsR0FBbEIsVUFBbUIsUUFBZ0IsRUFBRSxRQUFzQjtZQUN2RCxJQUFJLElBQUksR0FBRyxRQUEwQixDQUFDO1lBQ3RDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDdkMsT0FBTywwQkFBMEIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3BFO2lCQUNJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3BDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQzthQUNwQjtpQkFDSSxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN0QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDdEI7aUJBQ0ksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUMxQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDMUI7aUJBQ0ksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLDBCQUEwQixFQUFFO2dCQUM5QyxJQUFJLFNBQVMsR0FBRyxvQ0FBb0MsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQzVGLE9BQU8sMktBQ3dHLEdBQUUsU0FBUyxHQUFHLDhHQUMzQyxHQUFFLElBQUksQ0FBQywwQkFBMEIsRUFBRSxHQUFHLDJHQUN0QyxHQUFFLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLG1HQUM3RCxHQUFFLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUFHLDRCQUN4RyxDQUFDO2FBQ1g7aUJBQ0ksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUM1QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDNUI7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksd0RBQTBCLEdBQWpDO1lBQ0ksT0FBTyxtbEJBV1csQ0FBQztRQUN2QixDQUFDO1FBQ0wsMEJBQUM7SUFBRCxDQUFDLEFBM0ZELElBMkZDO0lBM0ZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMb2dnZXJEZWZpbml0aW9ucyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2xvZ2dlckRlZmluaXRpb25zSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IExvZ2dlckNvbHVtbkRlZmluaXRpb24sIEZpZWxkVHlwZSB9IGZyb20gXCIuLi9sb2dnZXJDb2x1bW5EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IElMb2dnZXJFbnRyeSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2xvZ2dlckVudHJ5XCI7XHJcbmltcG9ydCB7IElEcml2ZUxvZ0VudHJ5IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9kcml2ZUxvZ0VudHJ5SW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRHJpdmVMb2dEZWZpbml0aW9ucyBpbXBsZW1lbnRzIElMb2dnZXJEZWZpbml0aW9uc3tcclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIENvbHVtbiBpZCBkZWZpbml0aW9uc1xyXG4gICAgICogRm9yIHRoaXMgZGVmaW5pdGlvbnMgcHJvcGVydGllcyBtdXN0IGJlIGF2YWlsYWJsZSBpbiB0aGUgTG9nZ2VyRW50cnkgaW50ZXJmYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RlZmluaXRpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29sdW1uSWRSZWNvcmROdW1iZXIgPSBcInJlY29yZE51bWJlclwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb2x1bW5JZFRpbWUgPSBcInRpbWVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29sdW1uSWRNb2R1bGUgPSBcIm1vZHVsZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb2x1bW5JZE9iamVjdE5hbWUgPSBcIm9iamVjdE5hbWVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29sdW1uSWREZXNjcmlwdGlvblJhd0RhdGEgPSBcImRlc2NyaXB0aW9uUmF3RGF0YVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb2x1bW5JZFJlc3BvbnNlVGltZSA9IFwicmVzcG9uc2VUaW1lXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGhlIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBsb2dnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8TG9nZ2VyQ29sdW1uRGVmaW5pdGlvbj59XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEZWZpbml0aW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q29sdW1uRGVmaW5pdGlvbnMoKTogQXJyYXk8TG9nZ2VyQ29sdW1uRGVmaW5pdGlvbj57XHJcbiAgICAgICAgbGV0IGNvbHVtbkRlZmluaXRpb25zID0gbmV3IEFycmF5PExvZ2dlckNvbHVtbkRlZmluaXRpb24+KCk7XHJcbiAgICAgICAgY29sdW1uRGVmaW5pdGlvbnMucHVzaChuZXcgTG9nZ2VyQ29sdW1uRGVmaW5pdGlvbih0aGlzLmNvbHVtbklkUmVjb3JkTnVtYmVyLCBcIk5vLlwiLCA0MCwgRmllbGRUeXBlLk51bWVyaWMpKTtcclxuICAgICAgICBjb2x1bW5EZWZpbml0aW9ucy5wdXNoKG5ldyBMb2dnZXJDb2x1bW5EZWZpbml0aW9uKHRoaXMuY29sdW1uSWRUaW1lLCBcIlRpbWUgW3NdXCIsIDYwLCBGaWVsZFR5cGUuTnVtZXJpYywgdHJ1ZSkpO1xyXG4gICAgICAgIGNvbHVtbkRlZmluaXRpb25zLnB1c2gobmV3IExvZ2dlckNvbHVtbkRlZmluaXRpb24odGhpcy5jb2x1bW5JZE1vZHVsZSwgXCJNb2R1bGUgKEVsZW1lbnQpXCIsIDEyMCwgRmllbGRUeXBlLlN0cmluZywgdHJ1ZSkpO1xyXG4gICAgICAgIGNvbHVtbkRlZmluaXRpb25zLnB1c2gobmV3IExvZ2dlckNvbHVtbkRlZmluaXRpb24odGhpcy5jb2x1bW5JZE9iamVjdE5hbWUsIFwiQXBwbC4gT2JqZWN0XCIsIDkwLCBGaWVsZFR5cGUuU3RyaW5nLCB0cnVlLCBcIm9iamVjdE5hbWVUb29sdGlwVGVtcGxhdGVcIikpO1xyXG4gICAgICAgIGNvbHVtbkRlZmluaXRpb25zLnB1c2gobmV3IExvZ2dlckNvbHVtbkRlZmluaXRpb24odGhpcy5jb2x1bW5JZERlc2NyaXB0aW9uUmF3RGF0YSwgXCJEcml2ZSBQYXJhbWV0ZXIgRGF0YVwiLCAzMjAsIEZpZWxkVHlwZS5TdHJpbmcsIHRydWUsIFwiZGVzY3JpcHRpb25Ub29sdGlwVGVtcGxhdGVcIikpO1xyXG4gICAgICAgIGNvbHVtbkRlZmluaXRpb25zLnB1c2gobmV3IExvZ2dlckNvbHVtbkRlZmluaXRpb24odGhpcy5jb2x1bW5JZFJlc3BvbnNlVGltZSwgXCJSZXNwLiBUaW1lIFttc11cIiwgNzAsIEZpZWxkVHlwZS5OdW1lcmljLCB0cnVlKSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaHRtbCByZXByZXNlbnRhdGlvbiBmb3IgdGhlIGNlbGwgd2l0aCB0aGUgZ2l2ZW4gY29sdW1uSWQgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbHVtbklkXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHZhbHVlc1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RlZmluaXRpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDZWxsRGF0YShjb2x1bW5JZDogc3RyaW5nLCBjZWxsSXRlbTogSUxvZ2dlckVudHJ5KTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaXRlbSA9IGNlbGxJdGVtIGFzIElEcml2ZUxvZ0VudHJ5O1xyXG4gICAgICAgIGlmIChjb2x1bW5JZCA9PSB0aGlzLmNvbHVtbklkUmVjb3JkTnVtYmVyKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gXCImbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtcIiArIGl0ZW0ucmVjb3JkTnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbHVtbklkID09IHRoaXMuY29sdW1uSWRUaW1lKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS50aW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb2x1bW5JZCA9PSB0aGlzLmNvbHVtbklkTW9kdWxlKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5tb2R1bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbHVtbklkID09IHRoaXMuY29sdW1uSWRPYmplY3ROYW1lKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5vYmplY3ROYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb2x1bW5JZCA9PSB0aGlzLmNvbHVtbklkRGVzY3JpcHRpb25SYXdEYXRhKSB7IFxyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlUGF0aCA9IFwid2lkZ2V0cy9sb2dnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL1wiICsgaXRlbS5nZXREZXNjcmlwdGlvbkljb25JZCgpICsgXCIuc3ZnXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogbm93cmFwO1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT0ncG9zaXRpb246IHJlbGF0aXZlOyB0b3A6ICAycHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IDMwcHg7Jz48aW1nIGhlaWdodD1cIjIyXCIgYWx0PVwiIFwiIHNyYz1cImArIGltYWdlUGF0aCArIGBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9J3Bvc2l0aW9uOiByZWxhdGl2ZTsgdG9wOiAtNXB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAyMjBweDsnPmArIGl0ZW0uZ2V0RGVzY3JpcHRpb25UZXh0Rm9ybWF0ZWQoKSArIGA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9J3Bvc2l0aW9uOiByZWxhdGl2ZTsgdG9wOiAtNXB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAyMzBweDsnPmArIGl0ZW0uZ2V0RGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0Rm9ybWF0ZWQoKSArIGAmbmJzcDs8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9J3Bvc2l0aW9uOiByZWxhdGl2ZTsgdG9wOiAtNXB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7Jz5gKyBpdGVtLmdldERlc2NyaXB0aW9uRXJyb3JGb3JtYXRlZCgpICsgYDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb2x1bW5JZCA9PSB0aGlzLmNvbHVtbklkUmVzcG9uc2VUaW1lKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5yZXNwb25zZVRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDZWxsRGF0YSBub3QgaW1wbGVtZW50ZWQgZm9yIGNvbHVtbiBpZDogXCIgKyBjb2x1bW5JZCk7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9ICAgIFxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdGVtcGxhdGUgZm9yIHRoZSB0b29sdGlwXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RlZmluaXRpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDZWxsVG9vbHRpcFRlbXBsYXRlRGF0YSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cImRlZmF1bHRUb29sdGlwVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgIDwvc2NyaXB0PlxyXG4gICAgICAgICAgICAgICAgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJvYmplY3ROYW1lVG9vbHRpcFRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXBCb3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3s6I2RhdGFbJ3JlY29yZCddWydvYmplY3ROYW1lJ119fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9zY3JpcHQ+XHJcbiAgICAgICAgICAgICAgICA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cImRlc2NyaXB0aW9uVG9vbHRpcFRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXBCb3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3s6I2RhdGFbJ3JlY29yZCddWydkZXNjcmlwdGlvblRvb2x0aXAnXX19XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L3NjcmlwdD5gO1xyXG4gICAgfVxyXG59Il19