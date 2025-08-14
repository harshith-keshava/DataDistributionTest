define(["require", "exports", "../../../core/interfaces/components/ui/chart/chartInterface", "../../../core/types/AxisBounds"], function (require, exports, chartInterface_1, AxisBounds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SFChartAxis = /** @class */ (function () {
        function SFChartAxis(axis, eventAxisRangeChanged, sfChart) {
            this._chartAxis = axis;
            this.eventAxisRangeChanged = eventAxisRangeChanged;
            this.sfChart = sfChart;
        }
        SFChartAxis.prototype.setAxisRange = function (newRange, forceRedraw, syncAxis) {
            if (forceRedraw === void 0) { forceRedraw = false; }
            if (syncAxis === void 0) { syncAxis = false; }
            var axis = this._chartAxis;
            this.setChartAxisRange(newRange.min, newRange.max);
            var eventAxisRangeChangedArgs = new chartInterface_1.EventAxisRangeChangedArgs([axis.name], forceRedraw, syncAxis);
            this.eventAxisRangeChanged.raise(this, eventAxisRangeChangedArgs);
        };
        SFChartAxis.prototype.setChartAxisRange = function (minValue, maxValue) {
            /*The following lines fix the bug in syncfusion source code, where the axis range is not set,
            when the chart is zoomed in before setting the range by manualy setting all given ranges */
            this._chartAxis._range.min = minValue;
            this._chartAxis._range.max = maxValue;
            this._chartAxis.range.min = minValue;
            this._chartAxis.range.max = maxValue;
            this._chartAxis._initialRange.min = minValue;
            this._chartAxis._initialRange.max = maxValue;
            this._chartAxis.visibleRange.max = maxValue;
            this._chartAxis.visibleRange.min = minValue;
        };
        SFChartAxis.prototype.getAxisRange = function () {
            var axis = this._chartAxis;
            axis.visibleRange.min = SFChartAxis.changeInfinityToMaxValue(axis.visibleRange.min);
            axis.visibleRange.max = SFChartAxis.changeInfinityToMaxValue(axis.visibleRange.max);
            return { min: axis.visibleRange.min, max: axis.visibleRange.max, delta: axis.visibleRange.delta };
        };
        /**
         * Change the value to min/max value if it is -inf/+inf
         *
         * @static
         * @param {number} value
         * @returns {number}
         * @memberof SFChartAxis
         */
        SFChartAxis.changeInfinityToMaxValue = function (value) {
            if (value == Number.NEGATIVE_INFINITY) {
                value = Number.MIN_VALUE;
            }
            else if (value == Number.POSITIVE_INFINITY) {
                value = Number.MAX_VALUE;
            }
            return value;
        };
        SFChartAxis.prototype.getAxisRangeInPixel = function () {
            var axis = this._chartAxis;
            var pixelRange;
            if (axis.orientation == "horizontal") {
                pixelRange = { max: axis.width, min: 0 };
            }
            else {
                pixelRange = { max: axis.length, min: 0 };
            }
            return pixelRange;
        };
        SFChartAxis.prototype.getAxisOrientation = function () {
            if (this._chartAxis.orientation == "horizontal") {
                return chartInterface_1.AxisOrientation.horizontal;
            }
            else {
                return chartInterface_1.AxisOrientation.vertical;
            }
        };
        SFChartAxis.prototype.getAxisID = function () {
            return this._chartAxis.name;
        };
        SFChartAxis.prototype.getAxisBounds = function () {
            var axisBounds;
            var chartArea = this.sfChart.getChartArea();
            var currentAxis = this._chartAxis;
            if (currentAxis.orientation == "horizontal") {
                var x = currentAxis.x;
                var y = currentAxis.y;
                var width = currentAxis.width;
                var height = this.sfChart._SFChart.svgHeight - y;
                axisBounds = new AxisBounds_1.AxisBounds(currentAxis, x, y, width, height);
            }
            else {
                if (currentAxis.x <= chartArea.x) {
                    var width = currentAxis.AxisMaxWidth;
                    var height = currentAxis.height;
                    var x = currentAxis.x - width;
                    var y = currentAxis.y;
                    axisBounds = new AxisBounds_1.AxisBounds(currentAxis, x, y, width, height);
                }
                else {
                    var width = currentAxis.AxisMaxWidth;
                    var height = currentAxis.height;
                    var x = currentAxis.x;
                    var y = currentAxis.y;
                    axisBounds = new AxisBounds_1.AxisBounds(currentAxis, x, y, width, height);
                }
            }
            return axisBounds;
        };
        return SFChartAxis;
    }());
    exports.SFChartAxis = SFChartAxis;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZDaGFydEF4aXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvY2hhcnRXcmFwcGVyL1NGQ2hhcnRBeGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBO1FBS0kscUJBQVksSUFBSSxFQUFFLHFCQUFxQixFQUFFLE9BQXVCO1lBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztZQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBRUQsa0NBQVksR0FBWixVQUFhLFFBQXFCLEVBQUUsV0FBNEIsRUFBRSxRQUFnQjtZQUE5Qyw0QkFBQSxFQUFBLG1CQUE0QjtZQUFFLHlCQUFBLEVBQUEsZ0JBQWdCO1lBQzlFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ELElBQUkseUJBQXlCLEdBQUcsSUFBSSwwQ0FBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbEcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBRU8sdUNBQWlCLEdBQXpCLFVBQTBCLFFBQWdCLEVBQUUsUUFBZ0I7WUFFeEQ7dUdBQzJGO1lBRTNGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztZQUV0QyxJQUFJLENBQUMsVUFB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cGxlUmFuZ2UsIEV2ZW50QXhpc1JhbmdlQ2hhbmdlZEFyZ3MsIEF4aXNPcmllbnRhdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTRkNoYXJ0V3JhcHBlciB9IGZyb20gXCIuL1NGQ2hhcnRXcmFwcGVyXCI7XHJcbmltcG9ydCB7IEF4aXNCb3VuZHMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS90eXBlcy9BeGlzQm91bmRzXCI7XHJcbmltcG9ydCB7IElDaGFydEF4aXMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvQ2hhcnRBeGlzSW50ZXJmYWNlXCI7XHJcbmV4cG9ydCBjbGFzcyBTRkNoYXJ0QXhpcyBpbXBsZW1lbnRzIElDaGFydEF4aXMge1xyXG4gICAgcHJpdmF0ZSBfY2hhcnRBeGlzO1xyXG4gICAgcHJpdmF0ZSBldmVudEF4aXNSYW5nZUNoYW5nZWQ7XHJcbiAgICBwcml2YXRlIHNmQ2hhcnQ6IFNGQ2hhcnRXcmFwcGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGF4aXMsIGV2ZW50QXhpc1JhbmdlQ2hhbmdlZCwgc2ZDaGFydDogU0ZDaGFydFdyYXBwZXIpIHtcclxuICAgICAgICB0aGlzLl9jaGFydEF4aXMgPSBheGlzO1xyXG4gICAgICAgIHRoaXMuZXZlbnRBeGlzUmFuZ2VDaGFuZ2VkID0gZXZlbnRBeGlzUmFuZ2VDaGFuZ2VkO1xyXG4gICAgICAgIHRoaXMuc2ZDaGFydCA9IHNmQ2hhcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QXhpc1JhbmdlKG5ld1JhbmdlOiBTaW1wbGVSYW5nZSwgZm9yY2VSZWRyYXc6IGJvb2xlYW4gPSBmYWxzZSwgc3luY0F4aXMgPSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5fY2hhcnRBeGlzO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hhcnRBeGlzUmFuZ2UobmV3UmFuZ2UubWluLCBuZXdSYW5nZS5tYXgpO1xyXG4gICAgICAgIGxldCBldmVudEF4aXNSYW5nZUNoYW5nZWRBcmdzID0gbmV3IEV2ZW50QXhpc1JhbmdlQ2hhbmdlZEFyZ3MoW2F4aXMubmFtZV0sIGZvcmNlUmVkcmF3LCBzeW5jQXhpcyk7XHJcbiAgICAgICAgdGhpcy5ldmVudEF4aXNSYW5nZUNoYW5nZWQucmFpc2UodGhpcywgZXZlbnRBeGlzUmFuZ2VDaGFuZ2VkQXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDaGFydEF4aXNSYW5nZShtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIC8qVGhlIGZvbGxvd2luZyBsaW5lcyBmaXggdGhlIGJ1ZyBpbiBzeW5jZnVzaW9uIHNvdXJjZSBjb2RlLCB3aGVyZSB0aGUgYXhpcyByYW5nZSBpcyBub3Qgc2V0LFxyXG4gICAgICAgIHdoZW4gdGhlIGNoYXJ0IGlzIHpvb21lZCBpbiBiZWZvcmUgc2V0dGluZyB0aGUgcmFuZ2UgYnkgbWFudWFseSBzZXR0aW5nIGFsbCBnaXZlbiByYW5nZXMgKi9cclxuXHJcbiAgICAgICAgdGhpcy5fY2hhcnRBeGlzLl9yYW5nZS5taW4gPSBtaW5WYWx1ZTtcclxuICAgICAgICB0aGlzLl9jaGFydEF4aXMuX3JhbmdlLm1heCA9IG1heFZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLl9jaGFydEF4aXMucmFuZ2UubWluID0gbWluVmFsdWU7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRBeGlzLnJhbmdlLm1heCA9IG1heFZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLl9jaGFydEF4aXMuX2luaXRpYWxSYW5nZS5taW4gPSBtaW5WYWx1ZTtcclxuICAgICAgICB0aGlzLl9jaGFydEF4aXMuX2luaXRpYWxSYW5nZS5tYXggPSBtYXhWYWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2hhcnRBeGlzLnZpc2libGVSYW5nZS5tYXggPSBtYXhWYWx1ZTtcclxuICAgICAgICB0aGlzLl9jaGFydEF4aXMudmlzaWJsZVJhbmdlLm1pbiA9IG1pblZhbHVlO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEF4aXNSYW5nZSgpOiBTaW1wbGVSYW5nZSB7XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLl9jaGFydEF4aXM7XHJcbiAgICAgICAgYXhpcy52aXNpYmxlUmFuZ2UubWluID0gU0ZDaGFydEF4aXMuY2hhbmdlSW5maW5pdHlUb01heFZhbHVlKGF4aXMudmlzaWJsZVJhbmdlLm1pbik7XHJcbiAgICAgICAgYXhpcy52aXNpYmxlUmFuZ2UubWF4ID0gU0ZDaGFydEF4aXMuY2hhbmdlSW5maW5pdHlUb01heFZhbHVlKGF4aXMudmlzaWJsZVJhbmdlLm1heCk7XHJcbiAgICAgICAgcmV0dXJuIHsgbWluOiBheGlzLnZpc2libGVSYW5nZS5taW4sIG1heDogYXhpcy52aXNpYmxlUmFuZ2UubWF4LCBkZWx0YTogYXhpcy52aXNpYmxlUmFuZ2UuZGVsdGEgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSB0aGUgdmFsdWUgdG8gbWluL21heCB2YWx1ZSBpZiBpdCBpcyAtaW5mLytpbmZcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU0ZDaGFydEF4aXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjaGFuZ2VJbmZpbml0eVRvTWF4VmFsdWUodmFsdWU6IG51bWJlcik6IG51bWJlcntcclxuICAgICAgICBpZih2YWx1ZSA9PSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkpe1xyXG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlci5NSU5fVkFMVUU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodmFsdWUgPT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKXtcclxuICAgICAgICAgICAgdmFsdWUgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXhpc1JhbmdlSW5QaXhlbCgpOiBTaW1wbGVSYW5nZSB7XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLl9jaGFydEF4aXM7XHJcbiAgICAgICAgbGV0IHBpeGVsUmFuZ2U6IFNpbXBsZVJhbmdlO1xyXG4gICAgICAgIGlmIChheGlzLm9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgICAgIHBpeGVsUmFuZ2UgPSB7IG1heDogYXhpcy53aWR0aCwgbWluOiAwfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBpeGVsUmFuZ2UgPSB7IG1heDogYXhpcy5sZW5ndGgsIG1pbjogMH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaXhlbFJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEF4aXNPcmllbnRhdGlvbigpOiBBeGlzT3JpZW50YXRpb24ge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFydEF4aXMub3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEF4aXNPcmllbnRhdGlvbi5ob3Jpem9udGFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIEF4aXNPcmllbnRhdGlvbi52ZXJ0aWNhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXhpc0lEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYXJ0QXhpcy5uYW1lO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0QXhpc0JvdW5kcygpOiBBeGlzQm91bmRzIHtcclxuICAgICAgICBsZXQgYXhpc0JvdW5kczogQXhpc0JvdW5kcztcclxuICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5zZkNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgIGxldCBjdXJyZW50QXhpcyA9IHRoaXMuX2NoYXJ0QXhpcztcclxuICAgICAgICBpZiAoY3VycmVudEF4aXMub3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICAgICAgbGV0IHggPSBjdXJyZW50QXhpcy54O1xyXG4gICAgICAgICAgICBsZXQgeSA9IGN1cnJlbnRBeGlzLnk7XHJcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IGN1cnJlbnRBeGlzLndpZHRoO1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5zZkNoYXJ0Ll9TRkNoYXJ0LnN2Z0hlaWdodCAtIHk7XHJcbiAgICAgICAgICAgIGF4aXNCb3VuZHMgPSBuZXcgQXhpc0JvdW5kcyhjdXJyZW50QXhpcywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEF4aXMueCA8PSBjaGFydEFyZWEueCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gY3VycmVudEF4aXMuQXhpc01heFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlaWdodCA9IGN1cnJlbnRBeGlzLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gY3VycmVudEF4aXMueCAtIHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBjdXJyZW50QXhpcy55O1xyXG4gICAgICAgICAgICAgICAgYXhpc0JvdW5kcyA9IG5ldyBBeGlzQm91bmRzKGN1cnJlbnRBeGlzLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IGN1cnJlbnRBeGlzLkF4aXNNYXhXaWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSBjdXJyZW50QXhpcy5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IGN1cnJlbnRBeGlzLng7XHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IGN1cnJlbnRBeGlzLnk7XHJcbiAgICAgICAgICAgICAgICBheGlzQm91bmRzID0gbmV3IEF4aXNCb3VuZHMoY3VycmVudEF4aXMsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBheGlzQm91bmRzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==