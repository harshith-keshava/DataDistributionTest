define(["require", "exports", "../../../core/interfaces/components/ui/chart/chartInterface", "../chartWrapper/SFChartAxis"], function (require, exports, chartInterface_1, SFChartAxis_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartZoomCalculations = /** @class */ (function () {
        function ChartZoomCalculations() {
        }
        /**
         * Returns an numberarray with the min and the max range value
         *
         * @param {ITraceChart} traceChart
         * @param {IChartAxis} chartAxis
         * @param {number} zoomStep
         * @param {*} mouseX
         * @param {*} mouseY
         * @returns {number[]}
         * @memberof ChartZoomCalculations
         */
        ChartZoomCalculations.prototype.calculateAxisZoomRanges = function (traceChart, chartAxis, zoomStep, mouseX, mouseY) {
            var axisRange = chartAxis.getAxisRange();
            var currentAxisMin = axisRange.min;
            var currentAxisMax = axisRange.max;
            try {
                var axisMin = Big(currentAxisMin);
                var axisMax = Big(currentAxisMax);
                var axisRange_1 = axisMax.minus(axisMin);
                var chartCoordinate = traceChart.getChartCoordinateFromPixel(traceChart.primaryXAxisName, chartAxis.getAxisID(), mouseX, mouseY);
                var axisValue = void 0;
                if (chartAxis.getAxisOrientation() == chartInterface_1.AxisOrientation.horizontal) {
                    axisValue = Big(chartCoordinate.x);
                }
                else {
                    axisValue = Big(chartCoordinate.y);
                }
                if (axisValue != undefined && Number(axisRange_1.toString()) != 0) { // Avoid division by zero
                    var axisValuePercentage = (axisValue.minus(axisMin)).div(axisRange_1);
                    var newAxisRange = axisRange_1.times(zoomStep);
                    var newAxisMin = Big(axisValue.minus(newAxisRange.times(axisValuePercentage)));
                    var newAxisMax = newAxisMin.plus(newAxisRange);
                    var minString = newAxisMin.toString();
                    var maxString = newAxisMax.toString();
                    var newAxisMinNumber = Number(minString);
                    var newAxisMaxNumber = Number(maxString);
                    // Use max values if new calculated values are infinity
                    newAxisMinNumber = SFChartAxis_1.SFChartAxis.changeInfinityToMaxValue(newAxisMinNumber);
                    newAxisMaxNumber = SFChartAxis_1.SFChartAxis.changeInfinityToMaxValue(newAxisMaxNumber);
                    return [newAxisMinNumber, newAxisMaxNumber];
                }
            }
            catch (e) {
                // Error occured => Infinity values not working with Big.js
                // Return current range values
            }
            console.log("axis value not defined or out of range");
            return [currentAxisMin, currentAxisMax];
        };
        return ChartZoomCalculations;
    }());
    exports.ChartZoomCalculations = ChartZoomCalculations;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRab29tQ2FsY3VsYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2hlbHBlcnMvY2hhcnRab29tQ2FsY3VsYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBO1FBQUE7UUFnRUEsQ0FBQztRQTlERzs7Ozs7Ozs7OztXQVVHO1FBQ0gsdURBQXVCLEdBQXZCLFVBQXdCLFVBQXdCLEVBQUUsU0FBc0IsRUFBRSxRQUFpQixFQUFFLE1BQU0sRUFBRSxNQUFNO1lBRXZHLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN6QyxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO1lBQ25DLElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7WUFFbkMsSUFBRztnQkFDQyxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxXQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFdkMsSUFBSSxlQUFlLEdBQUcsVUFBVSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUVqSSxJQUFJLFNBQVMsU0FBQSxDQUFDO2dCQUNkLElBQUcsU0FBUyxDQUFDLGtCQUFrQixFQUFFLElBQUksZ0NBQWUsQ0FBQyxVQUFVLEVBQUM7b0JBQzVELFNBQVMsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN0QztxQkFDRztvQkFDQSxTQUFTLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdEM7Z0JBRUQsSUFBRyxTQUFTLElBQUksU0FBUyxJQUFJLE1BQU0sQ0FBQyxXQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSx5QkFBeUI7b0JBQ3RGLElBQUksbUJBQW1CLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVMsQ0FBQyxDQUFDO29CQUNwRSxJQUFJLFlBQVksR0FBRyxXQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUU3QyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvRSxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUUvQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3RDLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDdEMsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3pDLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6Qyx1REFBdUQ7b0JBQ3ZELGdCQUFnQixHQUFHLHlCQUFXLENBQUMsd0JBQXdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDMUUsZ0JBQWdCLEdBQUcseUJBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUMxRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztpQkFDL0M7YUFDSjtZQUNELE9BQU0sQ0FBQyxFQUFDO2dCQUNKLDJEQUEyRDtnQkFDM0QsOEJBQThCO2FBQ2pDO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBRXRELE9BQU8sQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUtMLDRCQUFDO0lBQUQsQ0FBQyxBQWhFRCxJQWdFQztJQUVPLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRBeGlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBeGlzT3JpZW50YXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvY2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU0ZDaGFydEF4aXMgfSBmcm9tIFwiLi4vY2hhcnRXcmFwcGVyL1NGQ2hhcnRBeGlzXCI7XHJcbmNsYXNzIENoYXJ0Wm9vbUNhbGN1bGF0aW9uc3tcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYW4gbnVtYmVyYXJyYXkgd2l0aCB0aGUgbWluIGFuZCB0aGUgbWF4IHJhbmdlIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDaGFydH0gdHJhY2VDaGFydFxyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRBeGlzfSBjaGFydEF4aXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB6b29tU3RlcFxyXG4gICAgICogQHBhcmFtIHsqfSBtb3VzZVhcclxuICAgICAqIEBwYXJhbSB7Kn0gbW91c2VZXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRab29tQ2FsY3VsYXRpb25zXHJcbiAgICAgKi9cclxuICAgIGNhbGN1bGF0ZUF4aXNab29tUmFuZ2VzKHRyYWNlQ2hhcnQgOiBJVHJhY2VDaGFydCwgY2hhcnRBeGlzIDogSUNoYXJ0QXhpcywgem9vbVN0ZXAgOiBudW1iZXIsIG1vdXNlWCwgbW91c2VZKTogbnVtYmVyW117XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgYXhpc1JhbmdlID0gY2hhcnRBeGlzLmdldEF4aXNSYW5nZSgpO1xyXG4gICAgICAgIGxldCBjdXJyZW50QXhpc01pbiA9IGF4aXNSYW5nZS5taW47XHJcbiAgICAgICAgbGV0IGN1cnJlbnRBeGlzTWF4ID0gYXhpc1JhbmdlLm1heDtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgYXhpc01pbiA9IEJpZyhjdXJyZW50QXhpc01pbik7XHJcbiAgICAgICAgICAgIGxldCBheGlzTWF4ID0gQmlnKGN1cnJlbnRBeGlzTWF4KTtcclxuICAgICAgICAgICAgbGV0IGF4aXNSYW5nZSA9IGF4aXNNYXgubWludXMoYXhpc01pbik7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRDb29yZGluYXRlID0gdHJhY2VDaGFydC5nZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwodHJhY2VDaGFydC5wcmltYXJ5WEF4aXNOYW1lLCBjaGFydEF4aXMuZ2V0QXhpc0lEKCksIG1vdXNlWCwgbW91c2VZKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBheGlzVmFsdWU7IFxyXG4gICAgICAgICAgICBpZihjaGFydEF4aXMuZ2V0QXhpc09yaWVudGF0aW9uKCkgPT0gQXhpc09yaWVudGF0aW9uLmhvcml6b250YWwpe1xyXG4gICAgICAgICAgICAgICAgYXhpc1ZhbHVlID0gQmlnKGNoYXJ0Q29vcmRpbmF0ZS54KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgYXhpc1ZhbHVlID0gQmlnKGNoYXJ0Q29vcmRpbmF0ZS55KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoYXhpc1ZhbHVlICE9IHVuZGVmaW5lZCAmJiBOdW1iZXIoYXhpc1JhbmdlLnRvU3RyaW5nKCkpICE9IDApeyAvLyBBdm9pZCBkaXZpc2lvbiBieSB6ZXJvXHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpc1ZhbHVlUGVyY2VudGFnZSA9IChheGlzVmFsdWUubWludXMoYXhpc01pbikpLmRpdihheGlzUmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0F4aXNSYW5nZSA9IGF4aXNSYW5nZS50aW1lcyh6b29tU3RlcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0F4aXNNaW4gPSBCaWcoYXhpc1ZhbHVlLm1pbnVzKG5ld0F4aXNSYW5nZS50aW1lcyhheGlzVmFsdWVQZXJjZW50YWdlKSkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0F4aXNNYXggPSBuZXdBeGlzTWluLnBsdXMobmV3QXhpc1JhbmdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWluU3RyaW5nID0gbmV3QXhpc01pbi50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heFN0cmluZyA9IG5ld0F4aXNNYXgudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBeGlzTWluTnVtYmVyID0gTnVtYmVyKG1pblN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3QXhpc01heE51bWJlciA9IE51bWJlcihtYXhTdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgLy8gVXNlIG1heCB2YWx1ZXMgaWYgbmV3IGNhbGN1bGF0ZWQgdmFsdWVzIGFyZSBpbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgbmV3QXhpc01pbk51bWJlciA9IFNGQ2hhcnRBeGlzLmNoYW5nZUluZmluaXR5VG9NYXhWYWx1ZShuZXdBeGlzTWluTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIG5ld0F4aXNNYXhOdW1iZXIgPSBTRkNoYXJ0QXhpcy5jaGFuZ2VJbmZpbml0eVRvTWF4VmFsdWUobmV3QXhpc01heE51bWJlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW25ld0F4aXNNaW5OdW1iZXIsIG5ld0F4aXNNYXhOdW1iZXJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICAvLyBFcnJvciBvY2N1cmVkID0+IEluZmluaXR5IHZhbHVlcyBub3Qgd29ya2luZyB3aXRoIEJpZy5qc1xyXG4gICAgICAgICAgICAvLyBSZXR1cm4gY3VycmVudCByYW5nZSB2YWx1ZXNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXhpcyB2YWx1ZSBub3QgZGVmaW5lZCBvciBvdXQgb2YgcmFuZ2VcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBbY3VycmVudEF4aXNNaW4sIGN1cnJlbnRBeGlzTWF4XTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7Q2hhcnRab29tQ2FsY3VsYXRpb25zfSJdfQ==