define(["require", "exports", "../../../common/math/lineReductionAlgorithm/rdp", "../../../common/math/mathX"], function (require, exports, rdp_1, mathX_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements and optimizations for chart signal data
     *
     * @class ChartDataOptimizer
     */
    var ChartDataOptimizer = /** @class */ (function () {
        /**
         * Creates an instance of class ChartDataOptimizer
         * @param {IChartSeriesProvider} seriesProvider
         * @memberof ChartDataOptimizer
         */
        function ChartDataOptimizer(seriesProvider) {
            this._seriesProvider = seriesProvider;
            this.rdp = new rdp_1.RDP();
        }
        /**
        * The default method just passes the points originally
        *
        * @param {*} chartSeries
        * @param {*} chartInstance
        * @returns
        * @memberof ChartDataOptimizer
        */
        ChartDataOptimizer.prototype.trimSeriesForChartBounds = function (chartSeries, chartInstance) {
            var seriesName = chartSeries.name;
            var serie = this._seriesProvider.series.filter(function (serie) {
                //console.log(serie.id, seriesName);
                return serie.id === seriesName; //
            });
            var optimizedSeriesPoints = [];
            if (serie.length === 1) {
                var signalPoints = serie[0].rawPoints;
                for (var i = 0; i < signalPoints.length; i++) {
                    optimizedSeriesPoints.push(new ChartPoint(i, true, signalPoints[i].x, signalPoints[i].y));
                }
            }
            return optimizedSeriesPoints;
        };
        /**
        * Trims and optimizes the trace data to fit in the destination range and ui area.
        *
        * @param {*} chartSeries
        * @param {*} chartInstance
        * @returns
        * @memberof ChartDataOptimizer
        */
        ChartDataOptimizer.prototype.trimSeriesForChartBoundsXY = function (chartSeries, chartInstance) {
            return this.trimSeriesForChartBounds2D(chartSeries, chartInstance);
        };
        ChartDataOptimizer.prototype.trimSeriesForChartBoundsYt = function (chartSeries, chartInstance) {
            var canvasBounds = {
                x: chartInstance.canvasX,
                y: chartInstance.canvasY,
                width: chartInstance.canvasWidth,
                height: chartInstance.canvasHeight,
            };
            var seriesBounds = {
                xMin: chartSeries.xAxis.visibleRange.min,
                xMax: chartSeries.xAxis.visibleRange.max,
                xDelta: chartSeries.xAxis.visibleRange.delta,
                yMin: chartSeries.yAxis.visibleRange.min,
                yMax: chartSeries.yAxis.visibleRange.max,
                yDelta: chartSeries.yAxis.visibleRange.delta,
            };
            var seriesName = chartSeries.name;
            var series = this.getSeries(seriesName);
            var optimizedSeriesPoints = [];
            if (series) {
                // we use the display points for further line optimization processing
                var signalPoints = this.getDisplayPoints(series);
                // find the lower range index
                var iVisibleMin = this.findNearestIndex(signalPoints, chartSeries.xAxis.visibleRange.min, 0, signalPoints.length - 1);
                // adjust to the first min point outside the min axis range 
                while (signalPoints[iVisibleMin].x >= chartSeries.xAxis.visibleRange.min && iVisibleMin > 0) {
                    iVisibleMin--;
                }
                // find the upper range index
                var iVisibleMax = this.findNearestIndex(signalPoints, chartSeries.xAxis.visibleRange.max, 0, signalPoints.length - 1);
                // adjust to the first max point outside the max axis range 
                while (signalPoints[iVisibleMax].x <= chartSeries.xAxis.visibleRange.max && iVisibleMax < signalPoints.length - 1) {
                    iVisibleMax++;
                }
                // get points reduced and optimized for the visible bounds
                optimizedSeriesPoints = this.retriveReducedPointsWithinBounds(signalPoints, canvasBounds, seriesBounds, iVisibleMin, iVisibleMax);
            }
            return optimizedSeriesPoints;
        };
        /**
         * Creates point instances to be used for displaying based on the rawpoints.
         *
         * @private
         * @param {ChartViewSerie} series
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getDisplayPoints = function (series) {
            // get the underlying series
            var effectiveSeries = series.serie;
            // create the display points if not yet defined
            if (!effectiveSeries.displayPoints) {
                effectiveSeries.displayPoints = effectiveSeries.rawPoints.map(function (rawPoint, index) { return new ChartPoint(index, true, rawPoint.x, rawPoint.y); });
            }
            return effectiveSeries.displayPoints ? effectiveSeries.displayPoints : [];
        };
        /**
         * Retrieves the requested series
         *
         * @private
         * @param {*} seriesName
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getSeries = function (seriesName) {
            var seriesByName = this._seriesProvider.series.filter(function (serie) {
                return serie.id === seriesName;
            });
            return seriesByName.length == 1 ? seriesByName[0] : null;
        };
        /**
       * Finds the item nearest to the specified value
       *
       * @memberof ChartDataOptimizer
       */
        ChartDataOptimizer.prototype.findNearestIndex = function (array, value, iFirst, iLast) {
            // calculate the middle index
            var iMiddle = Math.floor((iFirst + iLast) / 2);
            // if the value matches, we have found the correct index
            if (value == array[iMiddle].x)
                return iMiddle;
            // if the the last possible index is reached, the index with the nearest index is selected
            if (iLast - 1 === iFirst)
                return Math.abs(array[iFirst].x - value) > Math.abs(array[iLast].x - value) ? iLast : iFirst;
            // if the value is greater continue on the higher remaining section
            if (value > array[iMiddle].x)
                return this.findNearestIndex(array, value, iMiddle, iLast);
            // if the value is greater continue on the lower remaining section
            if (value < array[iMiddle].x)
                return this.findNearestIndex(array, value, iFirst, iMiddle);
        };
        /**
     * Optimizes the pointts with respect to the visible area
     *
     * @param {*} points
     * @param {*} canvasBounds
     * @param {*} seriesBounds
     * @returns {*}
     * @memberof ChartDataOptimizer
     */
        ChartDataOptimizer.prototype.retriveReducedPointsWithinBounds = function (points, canvasBounds, seriesBounds, iMin, iMax) {
            var optimizedPoints = [];
            var visiblePointsCount = iMax - iMin;
            // If the points count is under the area pixel width there is no need to optimize.....
            if ((visiblePointsCount) < canvasBounds.width) {
                // ... so we just convert the visble points to chart points
                optimizedPoints = this.getChartPoints(points, iMin, iMax);
            }
            else {
                // ... otherwise we optimze the points to a reduced but still usefull amount.
                optimizedPoints = this.getReducedChartPointsWithinBounds(canvasBounds, seriesBounds, points, iMin, iMax);
            }
            return optimizedPoints;
        };
        /**
      *  Gets the chart points for the specefied range
      *
      * @private
      * @param {*} canvasBounds
      * @param {*} seriesBounds
      * @param {*} points
      * @param {*} iMin
      * @param {*} iMax
      * @param {any[]} pixelPoints
      * @returns
      * @memberof ChartDataOptimizer
      */
        ChartDataOptimizer.prototype.getChartPoints = function (points, iMin, iMax) {
            return points.filter(function (point, i) { return i >= iMin && i <= iMax; });
        };
        /**
         * Reduces the points to a useful count with respect to the visible area
         *
         * @private
         * @param {*} canvasBounds
         * @param {*} seriesBounds
         * @param {*} points
         * @param {*} iMin
         * @param {*} iMax
         * @param {any[]} pixelPoints
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getReducedChartPointsWithinBounds = function (canvasBounds, seriesBounds, points, iMin, iMax) {
            // create the pixel point array
            // the width needs to be converted to integer because in the case of active browser zoom the width is passed as float value !
            var canvasWidth = Math.ceil(canvasBounds.width);
            var pixelPoints = new Array(canvasWidth);
            // create a set for receiving the visible points to avoid duplicates
            var optimizedPoints = new Set();
            var xScale = canvasBounds.width / seriesBounds.xDelta;
            if (points.length > 1) {
                for (var iVisiblePoint = iMin; iVisiblePoint <= iMax; iVisiblePoint++) {
                    this.reducePixelPoints(points[iVisiblePoint], seriesBounds, xScale, iVisiblePoint, pixelPoints);
                }
                for (var i = 0; i < pixelPoints.length; i++) {
                    var pixelPoint = pixelPoints[i];
                    if (pixelPoint !== undefined) {
                        this.addPixelSubPoints(pixelPoint, i, optimizedPoints);
                    }
                }
            }
            return Array.from(optimizedPoints);
        };
        /**
       * Adds additional points for marking min and max values within a segment
       *
       * @private
       * @param {*} pixelPoint
       * @param {number} i
       * @param {ChartPoint[]} optimizedPoints
       * @memberof ChartDataOptimizer
       */
        ChartDataOptimizer.prototype.addPixelSubPoints = function (pixelPoint, i, optimizedPoints) {
            // add the first pixel point
            this.addOptimizedPoint(optimizedPoints, i, pixelPoint.firstPoint);
            // add min max points
            if (pixelPoint.yMinPoint.index <= pixelPoint.yMaxPoint.index) {
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMinPoint);
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMaxPoint);
            }
            else {
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMaxPoint);
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMinPoint);
            }
            // add the last point
            this.addOptimizedPoint(optimizedPoints, i, pixelPoint.lastPoint);
        };
        /**
         * Creates and adds a chart point
         *
         * @private
         * @param {ChartPoint[]} optimizedPoints
         * @param {number} i
         * @param {*} pixelPoint
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.addOptimizedPoint = function (optimizedPoints, i, pixelPoint) {
            optimizedPoints.add(pixelPoint);
        };
        /**
         * Finds the maximum within an array
         *
         * @param {*} values
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.findMaximum = function (values) {
            var max = values[0];
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                max = value > max ? value : max;
            }
            return max;
        };
        /**
       * Reduces the pixel points respecting the point density on pixels
       *
       * @private
       * @param {*} visiblePoint
       * @param {*} seriesBounds
       * @param {number} xScale
       * @param {*} iVisiblePoint
       * @param {any[]} pixelPoints
       * @memberof ChartDataOptimizer
       */
        ChartDataOptimizer.prototype.reducePixelPoints = function (visiblePoint, seriesBounds, xScale, iVisiblePoint, pixelPoints) {
            // calculate the pixel offset to axis min
            var xOffset = (visiblePoint.x - seriesBounds.xMin) * (xScale);
            // get the pixel index
            var iPixel = Math.round(xOffset);
            visiblePoint.index = iVisiblePoint;
            this.addPointsForXPixel(pixelPoints, visiblePoint, iPixel);
        };
        /**
         * Adds a point for a corrsponding pixel location
         *
         * @private
         * @param {any[]} pixelPoints
         * @param {number} iPixel
         * @param {*} signalPoint
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.addPointsForXPixel = function (pixelPoints, signalPoint, iPixel) {
            if (!pixelPoints[iPixel]) {
                // define the first point for this pixel
                pixelPoints[iPixel] = {};
                // initialize the last point as default
                pixelPoints[iPixel].firstPoint = signalPoint;
                pixelPoints[iPixel].lastPoint = signalPoint;
                pixelPoints[iPixel].yMaxPoint = signalPoint;
                pixelPoints[iPixel].yMinPoint = signalPoint;
            }
            else {
                // update the last point for following values on the same pixel
                pixelPoints[iPixel].lastPoint = signalPoint;
                // update min,max
                if (signalPoint.y > pixelPoints[iPixel].yMaxPoint.y) {
                    // update the point containing yMax
                    pixelPoints[iPixel].yMaxPoint = signalPoint;
                }
                if (signalPoint.y < pixelPoints[iPixel].yMinPoint.y) {
                    // update the point containing yMin
                    pixelPoints[iPixel].yMinPoint = signalPoint;
                }
            }
        };
        /**
         * Trims or optimizes series point to be display within a 2D chart
         *
         * @param {*} chartSeries
         * @param {*} chartInstance
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.trimSeriesForChartBounds2D = function (chartSeries, chartInstance) {
            // the chart points to be calculated
            var chartPoints = [];
            // get the canvas bounds in pixel
            var canvasBounds = this.getChartAreaBoundsInPixel(chartInstance);
            // get the chart area bounds
            var chartAreaBounds = this.getChartAreaBounds(chartSeries);
            // get the series with a matching name
            var dataSeries = this.getSeriesData(chartSeries);
            if (dataSeries) {
                // get the original unmodified points 
                var rawPoints = dataSeries.rawPoints;
                // get the initially simplified data
                var viewPointsData = dataSeries.data;
                // retrieve the points to be displayed       
                var viewSeriesPoints = viewPointsData;
                console.time("calculate reduced chart points");
                // retrieve the visible segment points
                chartPoints = this.retrieveVisibleLineSegmentPoints(viewSeriesPoints, chartAreaBounds);
                // get raw points count covered by the visible segments
                var rawVisiblePointsCount = chartPoints.length > 0 ? chartPoints[chartPoints.length - 1].index - chartPoints[0].index + 1 : 0;
                if (rawVisiblePointsCount > 0) {
                    // calculate the current chart units/pixel
                    var kXUnitsPerPixel = chartAreaBounds.xDelta / canvasBounds.width;
                    var kYUnitsPerPixel = chartAreaBounds.yDelta / canvasBounds.height;
                    // if the current coordinate to pixel ratio falls below the initial ration we need to recalculate the simplified points for the current given view port
                    // to get the best matching approximated simplified line. 
                    if (this.isDetailZoomLevel(viewPointsData, kXUnitsPerPixel, kYUnitsPerPixel)) {
                        // retrieve the points with the precision for requested zoom level 
                        chartPoints = this.retrieveDetailedChartPoints(chartPoints, rawPoints, chartAreaBounds, kXUnitsPerPixel, kYUnitsPerPixel);
                    }
                }
                console.timeEnd("calculate reduced chart points");
                console.log("optimized points: %o", chartPoints.length);
            }
            var optimizedPoints = chartPoints.map(function (point, i) { return new ChartPoint(point.index, point.visible, point.x, point.y); });
            return optimizedPoints;
        };
        /**
         * Gets
         *
         * @private
         * @param {*} chartSeries
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getSeriesData = function (chartSeries) {
            var chartViewSeries = this._seriesProvider.series.find(function (series) { return series.id === chartSeries.name; });
            var dataSeries = chartViewSeries ? chartViewSeries.serie : undefined;
            return dataSeries;
        };
        /**
         * Retrieves the data points necessary to satisfy the specified chart bounds and zoom ratio.
         *
         * @private
         * @param {SeriesPoint[]} chartPoints
         * @param {IPoint[]} rawPoints
         * @param {{ xMin: any; xMax: any; xDelta: any; yMin: any; yMax: any; yDelta: any; }} chartAreaBounds
         * @param {number} currentChartPixelRatioX
         * @param {number} currentChartPixelRationY
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.retrieveDetailedChartPoints = function (chartPoints, rawPoints, chartAreaBounds, currentChartPixelRatioX, currentChartPixelRationY) {
            var lastRawIndex = chartPoints[chartPoints.length - 1].index;
            var firstVisibleRawPointIndex = chartPoints[0].index;
            var lastVisibleRawPointIndex = lastRawIndex < rawPoints.length ? lastRawIndex + 1 : rawPoints.length;
            // retrieve the raw points covered by the visible segments
            var rawVisiblePoints = rawPoints.slice(firstVisibleRawPointIndex, lastVisibleRawPointIndex);
            // update point indices
            this.updateVisibilityIndices(rawVisiblePoints);
            // retrieve the visible line segment points
            chartPoints = this.retrieveVisibleLineSegmentPoints(rawVisiblePoints, chartAreaBounds);
            // if the numbert of chart points is still too high, we need to further simplify the data points
            if (chartPoints.length > 1000) {
                // simplify the remaining visible points according the specified precision and ratio
                chartPoints = this.rdp.simplify(rawVisiblePoints, 0.25, currentChartPixelRatioX, currentChartPixelRationY, false);
                // update point indices
                this.updateVisibilityIndices(chartPoints);
                // retrieve the visible segment points
                chartPoints = this.retrieveVisibleLineSegmentPoints(chartPoints, chartAreaBounds);
            }
            return chartPoints;
        };
        /**
         *
         *
         * @private
         * @param {*} viewPointsData
         * @param {number} currentChartPixelRatioX
         * @param {number} currentChartPixelRationY
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.isDetailZoomLevel = function (viewPointsData, currentChartPixelRatioX, currentChartPixelRationY) {
            return currentChartPixelRatioX < viewPointsData.pixelRatioX || currentChartPixelRationY < viewPointsData.pixelRatioY;
        };
        /**
         * Updates the indices of the points
         *
         * @private
         * @param {IPoint[]} reducedVisiblePoints
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.updateVisibilityIndices = function (points) {
            var seriesPoints = points;
            seriesPoints.forEach(function (point, index) { point.index = index; });
        };
        /**
         * Gets the chart area bounds in pixel
         *
         * @private
         * @param {*} chartInstance
         * @returns {{x:number,y:number,width:number,height:number}}
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getChartAreaBoundsInPixel = function (chartInstance) {
            return {
                x: chartInstance.canvasX,
                y: chartInstance.canvasY,
                width: chartInstance.canvasWidth,
                height: chartInstance.canvasHeight,
            };
        };
        /**
         * Gets the visible chart area bounds in coordinate units
         *
         * @private
         * @param {*} chartSeries
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getChartAreaBounds = function (chartSeries) {
            var chartAreaBounds = {
                xMin: chartSeries.xAxis.range.min,
                xMax: chartSeries.xAxis.range.max,
                xDelta: chartSeries.xAxis.range.delta,
                yMin: chartSeries.yAxis.range.min,
                yMax: chartSeries.yAxis.range.max,
                yDelta: chartSeries.yAxis.range.delta,
            };
            return chartAreaBounds;
        };
        /**
         * Determines if a line intersects a rectangle
         *
         * @param {IPoint} p1
         * @param {IPoint} p2
         * @param {Bounds} bounds
         * @returns
         * @memberof ChartDataOptimizer
         *
         * Review Lukas Obersamer:
         * The cyclomatic complexity of this function is too high, but that does not reflext the complexity for humans to understand it.
         * The complexity of understing this method is in fact super simple in particular due to professional commenting. Therefore the method shall remain in this form.
         */
        ChartDataOptimizer.prototype.lineIntersectsRectangle = function (p1, p2, bounds) {
            // exclude non intersecting lines
            if ((p1.x < bounds.xMin && p2.x < bounds.xMin) || (p1.y < bounds.yMin && p2.y < bounds.yMin) || (p1.x > bounds.xMax && p2.x > bounds.xMax) || (p1.y > bounds.yMax && p2.y > bounds.yMax))
                return false;
            if (this.rectangleContainsPoint(p1, bounds) || this.rectangleContainsPoint(p2, bounds)) {
                return true;
            }
            try {
                // calculate dy/dx
                var k = (p2.y - p1.y) / (p2.x - p1.x);
                // check if line intersects left border
                var yIntersect = p1.y + k * (bounds.xMin - p1.x);
                if (yIntersect >= bounds.yMin && yIntersect <= bounds.yMax)
                    return true;
                // check if line intersects right border
                yIntersect = p1.y + k * (bounds.xMax - p1.x);
                if (yIntersect >= bounds.yMin && yIntersect <= bounds.yMax)
                    return true;
                // check if line intersects bottom border
                var xIntersec = p1.x + (bounds.yMin - p1.y) / k;
                if (xIntersec >= bounds.xMin && xIntersec <= bounds.xMax)
                    return true;
                // check if line intersects top border
                xIntersec = p1.x + (bounds.yMax - p1.y) / k;
                if (xIntersec >= bounds.xMin && xIntersec <= bounds.xMax)
                    return true;
            }
            catch (error) {
                console.error("lineIntersectsRectangle");
            }
            return false;
        };
        /**
         * Retrieves the line segment points for segments intersecting the specified bounds. The methods adds, if necessary invisible line segments by adding invisible helkper points.
         *
         * @private
         * @param {IPoint[]} points
         * @param {Bounds} bounds
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.retrieveVisibleLineSegmentPoints = function (points, bounds) {
            if (points.length < 2)
                return points;
            // the available point as series points
            var seriesPoints = points;
            // create the result segment points array
            var lineSegmentPoints = [];
            // holds the last added end point.
            var lastEndPoint = null;
            for (var i = 1; i < seriesPoints.length; i++) {
                var pStart = seriesPoints[i - 1];
                var pEnd = seriesPoints[i];
                // check if the line intersects the specified bounds
                if (this.lineIntersectsRectangle(pStart, pEnd, bounds)) {
                    if (!lastEndPoint) {
                        // at the very beginning we need to add the first start point
                        pStart.visible = true;
                        lineSegmentPoints.push(pStart);
                    }
                    else {
                        // now we continue the line ....
                        // if the line is interrupted ( start and previous end index is not the same), we need to add an invisible helper point to create an invisible segment.
                        // additionally we need to add the start point of the next visible line segment.
                        if (pStart.index != lastEndPoint.index) {
                            // create an invisible helper point
                            var invisibleSegmenStartPoint = Object.create(lastEndPoint);
                            invisibleSegmenStartPoint.visible = false;
                            // add the invisible helper point
                            lineSegmentPoints.push(invisibleSegmenStartPoint);
                            // add the start point of next visible line segment. This is where the line segment is to be continued.
                            pStart.visible = true;
                            lineSegmentPoints.push(pStart);
                        }
                    }
                    // just add the next visible end point
                    pEnd.visible = true;
                    lineSegmentPoints.push(pEnd);
                    lastEndPoint = pEnd;
                }
            }
            return lineSegmentPoints;
        };
        ChartDataOptimizer.prototype.rectangleContainsPoint = function (point, bounds) {
            var xMinDiff = point.x - bounds.xMin;
            var xMaxDiff = bounds.xMax - point.x;
            var yMinDiff = point.y - bounds.yMin;
            var yMaxDiff = bounds.yMax - point.y;
            var xWithinRange = xMinDiff >= 0 && xMaxDiff >= 0;
            var yWithinRange = yMinDiff >= 0 && yMaxDiff >= 0;
            // const xWithinRange = point.x >= bounds.xMin && point.x <= bounds.xMax;
            // const yWithinRange = point.y >= bounds.yMin && point.y <= bounds.yMax;
            var rectanglesContainsPoint = xWithinRange && yWithinRange;
            return rectanglesContainsPoint;
        };
        /**
         * Attaches a series to the chart optimizer. The method in fact just calculates and updates the series bounds.
         *
         * @param {BaseSeries} serie
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.attachSeries = function (serie) {
            if (serie.rawPoints.length > 1) {
                var signalPoints = serie.rawPoints;
                var xValues = signalPoints.map(function (point) { return point.x; });
                var yValues = signalPoints.map(function (point) { return point.y; });
                var xMin = mathX_1.MathX.min(xValues);
                var xMax = mathX_1.MathX.max(xValues);
                var yMin = mathX_1.MathX.min(yValues);
                var yMax = mathX_1.MathX.max(yValues);
                // update the series bounds
                serie.bounds = { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, width: (xMax - xMin), height: (yMax - yMin) };
                this.clearSeriesDisplayPoints(serie);
            }
            return serie;
        };
        /**
         * Clears eventually existing display points.
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.clearSeriesDisplayPoints = function (serie) {
            serie.displayPoints = null;
        };
        return ChartDataOptimizer;
    }());
    exports.ChartDataOptimizer = ChartDataOptimizer;
    /**
     * Implements the chart point class
     *
     * @class ChartPoint
     */
    var ChartPoint = /** @class */ (function () {
        function ChartPoint(index, visible, x, y) {
            this.index = index;
            this.x = x;
            this.y = y;
            this.xValue = x;
            this.YValues = [y];
            this.visible = visible;
        }
        return ChartPoint;
    }());
    exports.ChartPoint = ChartPoint;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnREYXRhT3B0aW1pemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2NoYXJ0RXh0ZW5zaW9ucy9jaGFydERhdGFPcHRpbWl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBVUE7Ozs7T0FJRztJQUNIO1FBT0k7Ozs7V0FJRztRQUNILDRCQUFZLGNBQW9DO1lBQzVDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBR0Q7Ozs7Ozs7VUFPRTtRQUNGLHFEQUF3QixHQUF4QixVQUF5QixXQUFXLEVBQUUsYUFBYTtZQUUvQyxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ2xDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUs7Z0JBQ2pELG9DQUFvQztnQkFDcEMsT0FBTyxLQUFLLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxDQUFBLEVBQUU7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFHSCxJQUFJLHFCQUFxQixHQUFpQixFQUFFLENBQUM7WUFFN0MsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxZQUFZLEdBQVMsS0FBSyxDQUFDLENBQUMsQ0FBRSxDQUFDLFNBQVMsQ0FBQztnQkFFN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFD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QyxDQUFDO1lBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLENBQUM7UUFDTCxpQkFBQztJQUFELENBQUMsQUFqQkQsSUFpQkM7SUFqQlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBSRFAgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL21hdGgvbGluZVJlZHVjdGlvbkFsZ29yaXRobS9yZHBcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3U2VyaWUgfSBmcm9tIFwiLi4vY2hhcnRWaWV3U2VyaWVcIjtcclxuaW1wb3J0IHsgTWF0aFggfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL21hdGgvbWF0aFhcIjtcclxuXHJcblxyXG50eXBlIEJvdW5kcyA9IHsgeE1pbjogbnVtYmVyOyB4TWF4OiBudW1iZXI7IHlNaW46IG51bWJlcjsgeU1heDogbnVtYmVyfTsgXHJcbnR5cGUgU2VyaWVzUG9pbnQgPSBJUG9pbnQgJiB7IHZpc2libGU6Ym9vbGVhbiwgaW5kZXh9O1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgYW5kIG9wdGltaXphdGlvbnMgZm9yIGNoYXJ0IHNpZ25hbCBkYXRhXHJcbiAqXHJcbiAqIEBjbGFzcyBDaGFydERhdGFPcHRpbWl6ZXJcclxuICovXHJcbmNsYXNzIENoYXJ0RGF0YU9wdGltaXplciB7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGNoYXJ0IHNpZ25hbHMgc291cmNlXHJcbiAgICBwcml2YXRlIF9zZXJpZXNQcm92aWRlcjogSUNoYXJ0U2VyaWVzUHJvdmlkZXI7XHJcbiAgICBwcml2YXRlIHJkcDogUkRQO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgY2xhc3MgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydFNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzZXJpZXNQcm92aWRlcjogSUNoYXJ0U2VyaWVzUHJvdmlkZXIpIHtcclxuICAgICAgICB0aGlzLl9zZXJpZXNQcm92aWRlciA9IHNlcmllc1Byb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMucmRwID0gbmV3IFJEUCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogVGhlIGRlZmF1bHQgbWV0aG9kIGp1c3QgcGFzc2VzIHRoZSBwb2ludHMgb3JpZ2luYWxseVxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0geyp9IGNoYXJ0U2VyaWVzXHJcbiAgICAqIEBwYXJhbSB7Kn0gY2hhcnRJbnN0YW5jZVxyXG4gICAgKiBAcmV0dXJuc1xyXG4gICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAqL1xyXG4gICAgdHJpbVNlcmllc0ZvckNoYXJ0Qm91bmRzKGNoYXJ0U2VyaWVzLCBjaGFydEluc3RhbmNlKTogSVBvaW50W10ge1xyXG5cclxuICAgICAgICBsZXQgc2VyaWVzTmFtZSA9IGNoYXJ0U2VyaWVzLm5hbWU7XHJcbiAgICAgICAgbGV0IHNlcmllID0gdGhpcy5fc2VyaWVzUHJvdmlkZXIuc2VyaWVzLmZpbHRlcigoc2VyaWUpID0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzZXJpZS5pZCwgc2VyaWVzTmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXJpZS5pZCA9PT0gc2VyaWVzTmFtZTsvL1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IG9wdGltaXplZFNlcmllc1BvaW50czogQ2hhcnRQb2ludFtdID0gW107XHJcblxyXG4gICAgICAgIGlmIChzZXJpZS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgbGV0IHNpZ25hbFBvaW50cyA9ICg8YW55PnNlcmllWzBdKS5yYXdQb2ludHM7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpZ25hbFBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgb3B0aW1pemVkU2VyaWVzUG9pbnRzLnB1c2gobmV3IENoYXJ0UG9pbnQoaSx0cnVlLCBzaWduYWxQb2ludHNbaV0ueCwgc2lnbmFsUG9pbnRzW2ldLnkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW1pemVkU2VyaWVzUG9pbnRzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogVHJpbXMgYW5kIG9wdGltaXplcyB0aGUgdHJhY2UgZGF0YSB0byBmaXQgaW4gdGhlIGRlc3RpbmF0aW9uIHJhbmdlIGFuZCB1aSBhcmVhLlxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0geyp9IGNoYXJ0U2VyaWVzXHJcbiAgICAqIEBwYXJhbSB7Kn0gY2hhcnRJbnN0YW5jZVxyXG4gICAgKiBAcmV0dXJuc1xyXG4gICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAqL1xyXG4gICAgdHJpbVNlcmllc0ZvckNoYXJ0Qm91bmRzWFkoY2hhcnRTZXJpZXMsIGNoYXJ0SW5zdGFuY2UpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmltU2VyaWVzRm9yQ2hhcnRCb3VuZHMyRChjaGFydFNlcmllcywgY2hhcnRJbnN0YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJpbVNlcmllc0ZvckNoYXJ0Qm91bmRzWXQoY2hhcnRTZXJpZXMsIGNoYXJ0SW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgbGV0IGNhbnZhc0JvdW5kcyA9IHtcclxuICAgICAgICAgICAgeDogY2hhcnRJbnN0YW5jZS5jYW52YXNYLFxyXG4gICAgICAgICAgICB5OiBjaGFydEluc3RhbmNlLmNhbnZhc1ksXHJcbiAgICAgICAgICAgIHdpZHRoOiBjaGFydEluc3RhbmNlLmNhbnZhc1dpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGNoYXJ0SW5zdGFuY2UuY2FudmFzSGVpZ2h0LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBzZXJpZXNCb3VuZHMgPSB7XHJcbiAgICAgICAgICAgIHhNaW46IGNoYXJ0U2VyaWVzLnhBeGlzLnZpc2libGVSYW5nZS5taW4sXHJcbiAgICAgICAgICAgIHhNYXg6IGNoYXJ0U2VyaWVzLnhBeGlzLnZpc2libGVSYW5nZS5tYXgsXHJcbiAgICAgICAgICAgIHhEZWx0YTogY2hhcnRTZXJpZXMueEF4aXMudmlzaWJsZVJhbmdlLmRlbHRhLFxyXG5cclxuICAgICAgICAgICAgeU1pbjogY2hhcnRTZXJpZXMueUF4aXMudmlzaWJsZVJhbmdlLm1pbixcclxuICAgICAgICAgICAgeU1heDogY2hhcnRTZXJpZXMueUF4aXMudmlzaWJsZVJhbmdlLm1heCxcclxuICAgICAgICAgICAgeURlbHRhOiBjaGFydFNlcmllcy55QXhpcy52aXNpYmxlUmFuZ2UuZGVsdGEsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IHNlcmllc05hbWUgPSBjaGFydFNlcmllcy5uYW1lO1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSB0aGlzLmdldFNlcmllcyhzZXJpZXNOYW1lKTtcclxuXHJcblxyXG4gICAgICAgIGxldCBvcHRpbWl6ZWRTZXJpZXNQb2ludHM6IENoYXJ0UG9pbnRbXSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoc2VyaWVzKSB7XHJcbiAgXHJcbiAgICAgICAgICAgIC8vIHdlIHVzZSB0aGUgZGlzcGxheSBwb2ludHMgZm9yIGZ1cnRoZXIgbGluZSBvcHRpbWl6YXRpb24gcHJvY2Vzc2luZ1xyXG4gICAgICAgICAgICBsZXQgc2lnbmFsUG9pbnRzID0gdGhpcy5nZXREaXNwbGF5UG9pbnRzKHNlcmllcykgYXMgSVBvaW50W107XHJcblxyXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBsb3dlciByYW5nZSBpbmRleFxyXG4gICAgICAgICAgICBsZXQgaVZpc2libGVNaW4gPSB0aGlzLmZpbmROZWFyZXN0SW5kZXgoc2lnbmFsUG9pbnRzLCBjaGFydFNlcmllcy54QXhpcy52aXNpYmxlUmFuZ2UubWluLCAwLCBzaWduYWxQb2ludHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIC8vIGFkanVzdCB0byB0aGUgZmlyc3QgbWluIHBvaW50IG91dHNpZGUgdGhlIG1pbiBheGlzIHJhbmdlIFxyXG4gICAgICAgICAgICB3aGlsZSAoc2lnbmFsUG9pbnRzW2lWaXNpYmxlTWluXS54ID49IGNoYXJ0U2VyaWVzLnhBeGlzLnZpc2libGVSYW5nZS5taW4gJiYgaVZpc2libGVNaW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpVmlzaWJsZU1pbi0tOyAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIHVwcGVyIHJhbmdlIGluZGV4XHJcbiAgICAgICAgICAgIGxldCBpVmlzaWJsZU1heCA9IHRoaXMuZmluZE5lYXJlc3RJbmRleChzaWduYWxQb2ludHMsIGNoYXJ0U2VyaWVzLnhBeGlzLnZpc2libGVSYW5nZS5tYXgsIDAsIHNpZ25hbFBvaW50cy5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgLy8gYWRqdXN0IHRvIHRoZSBmaXJzdCBtYXggcG9pbnQgb3V0c2lkZSB0aGUgbWF4IGF4aXMgcmFuZ2UgXHJcbiAgICAgICAgICAgIHdoaWxlIChzaWduYWxQb2ludHNbaVZpc2libGVNYXhdLnggPD0gY2hhcnRTZXJpZXMueEF4aXMudmlzaWJsZVJhbmdlLm1heCAmJiBpVmlzaWJsZU1heCA8IHNpZ25hbFBvaW50cy5sZW5ndGgtMSkge1xyXG4gICAgICAgICAgICAgICAgaVZpc2libGVNYXgrKzsgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBnZXQgcG9pbnRzIHJlZHVjZWQgYW5kIG9wdGltaXplZCBmb3IgdGhlIHZpc2libGUgYm91bmRzXHJcbiAgICAgICAgICAgIG9wdGltaXplZFNlcmllc1BvaW50cyA9IHRoaXMucmV0cml2ZVJlZHVjZWRQb2ludHNXaXRoaW5Cb3VuZHMoc2lnbmFsUG9pbnRzLCBjYW52YXNCb3VuZHMsIHNlcmllc0JvdW5kcywgaVZpc2libGVNaW4sIGlWaXNpYmxlTWF4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpbWl6ZWRTZXJpZXNQb2ludHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBwb2ludCBpbnN0YW5jZXMgdG8gYmUgdXNlZCBmb3IgZGlzcGxheWluZyBiYXNlZCBvbiB0aGUgcmF3cG9pbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld1NlcmllfSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREaXNwbGF5UG9pbnRzKHNlcmllczogQ2hhcnRWaWV3U2VyaWUpOiBJUG9pbnRbXSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgdW5kZXJseWluZyBzZXJpZXNcclxuICAgICAgICBsZXQgZWZmZWN0aXZlU2VyaWVzID0gKDxhbnk+c2VyaWVzKS5zZXJpZTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBkaXNwbGF5IHBvaW50cyBpZiBub3QgeWV0IGRlZmluZWRcclxuICAgICAgICBpZiAoIWVmZmVjdGl2ZVNlcmllcy5kaXNwbGF5UG9pbnRzKSB7XHJcbiAgICAgICAgICAgIGVmZmVjdGl2ZVNlcmllcy5kaXNwbGF5UG9pbnRzID0gZWZmZWN0aXZlU2VyaWVzLnJhd1BvaW50cy5tYXAoKHJhd1BvaW50LCBpbmRleCkgPT4geyByZXR1cm4gbmV3IENoYXJ0UG9pbnQoaW5kZXgsIHRydWUsIHJhd1BvaW50LngsIHJhd1BvaW50LnkpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVmZmVjdGl2ZVNlcmllcy5kaXNwbGF5UG9pbnRzID8gZWZmZWN0aXZlU2VyaWVzLmRpc3BsYXlQb2ludHMgOltdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHRoZSByZXF1ZXN0ZWQgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VyaWVzTmFtZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTZXJpZXMoc2VyaWVzTmFtZTogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlcmllc0J5TmFtZSA9IHRoaXMuX3Nlcmllc1Byb3ZpZGVyLnNlcmllcy5maWx0ZXIoKHNlcmllKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXJpZS5pZCA9PT0gc2VyaWVzTmFtZTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiAgc2VyaWVzQnlOYW1lLmxlbmd0aCA9PSAxID8gc2VyaWVzQnlOYW1lWzBdOiBudWxsO1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIEZpbmRzIHRoZSBpdGVtIG5lYXJlc3QgdG8gdGhlIHNwZWNpZmllZCB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTmVhcmVzdEluZGV4KGFycmF5LCB2YWx1ZSwgaUZpcnN0LCBpTGFzdDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgbWlkZGxlIGluZGV4XHJcbiAgICAgICAgY29uc3QgaU1pZGRsZSA9IE1hdGguZmxvb3IoKGlGaXJzdCArIGlMYXN0KSAvIDIpO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgbWF0Y2hlcywgd2UgaGF2ZSBmb3VuZCB0aGUgY29ycmVjdCBpbmRleFxyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBhcnJheVtpTWlkZGxlXS54KSByZXR1cm4gaU1pZGRsZTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIHRoZSBsYXN0IHBvc3NpYmxlIGluZGV4IGlzIHJlYWNoZWQsIHRoZSBpbmRleCB3aXRoIHRoZSBuZWFyZXN0IGluZGV4IGlzIHNlbGVjdGVkXHJcbiAgICAgICAgaWYgKGlMYXN0IC0gMSA9PT0gaUZpcnN0KSByZXR1cm4gTWF0aC5hYnMoYXJyYXlbaUZpcnN0XS54IC0gdmFsdWUpID4gTWF0aC5hYnMoYXJyYXlbaUxhc3RdLnggLSB2YWx1ZSkgPyBpTGFzdCA6IGlGaXJzdDtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIGdyZWF0ZXIgY29udGludWUgb24gdGhlIGhpZ2hlciByZW1haW5pbmcgc2VjdGlvblxyXG4gICAgICAgIGlmICh2YWx1ZSA+IGFycmF5W2lNaWRkbGVdLngpIHJldHVybiB0aGlzLmZpbmROZWFyZXN0SW5kZXgoYXJyYXksIHZhbHVlLCBpTWlkZGxlLCBpTGFzdCk7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBncmVhdGVyIGNvbnRpbnVlIG9uIHRoZSBsb3dlciByZW1haW5pbmcgc2VjdGlvblxyXG4gICAgICAgIGlmICh2YWx1ZSA8IGFycmF5W2lNaWRkbGVdLngpIHJldHVybiB0aGlzLmZpbmROZWFyZXN0SW5kZXgoYXJyYXksIHZhbHVlLCBpRmlyc3QsIGlNaWRkbGUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgKiBPcHRpbWl6ZXMgdGhlIHBvaW50dHMgd2l0aCByZXNwZWN0IHRvIHRoZSB2aXNpYmxlIGFyZWFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHBvaW50c1xyXG4gICAgICogQHBhcmFtIHsqfSBjYW52YXNCb3VuZHNcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VyaWVzQm91bmRzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXRyaXZlUmVkdWNlZFBvaW50c1dpdGhpbkJvdW5kcyhwb2ludHMsIGNhbnZhc0JvdW5kcywgc2VyaWVzQm91bmRzLCBpTWluLCBpTWF4KTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IG9wdGltaXplZFBvaW50czogQ2hhcnRQb2ludFtdID0gW107XHJcblxyXG4gICAgICAgIGxldCB2aXNpYmxlUG9pbnRzQ291bnQgPSBpTWF4IC0gaU1pbjtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIHBvaW50cyBjb3VudCBpcyB1bmRlciB0aGUgYXJlYSBwaXhlbCB3aWR0aCB0aGVyZSBpcyBubyBuZWVkIHRvIG9wdGltaXplLi4uLi5cclxuICAgICAgICBpZiAoKHZpc2libGVQb2ludHNDb3VudCkgPCBjYW52YXNCb3VuZHMud2lkdGgpIHtcclxuICAgICAgICAgICAgLy8gLi4uIHNvIHdlIGp1c3QgY29udmVydCB0aGUgdmlzYmxlIHBvaW50cyB0byBjaGFydCBwb2ludHNcclxuICAgICAgICAgICAgb3B0aW1pemVkUG9pbnRzID0gdGhpcy5nZXRDaGFydFBvaW50cyhwb2ludHMsIGlNaW4sIGlNYXgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAuLi4gb3RoZXJ3aXNlIHdlIG9wdGltemUgdGhlIHBvaW50cyB0byBhIHJlZHVjZWQgYnV0IHN0aWxsIHVzZWZ1bGwgYW1vdW50LlxyXG4gICAgICAgICAgICBvcHRpbWl6ZWRQb2ludHMgPSB0aGlzLmdldFJlZHVjZWRDaGFydFBvaW50c1dpdGhpbkJvdW5kcyhjYW52YXNCb3VuZHMsIHNlcmllc0JvdW5kcywgcG9pbnRzLCBpTWluLCBpTWF4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpbWl6ZWRQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgICAgLyoqXHJcbiAgICAgKiAgR2V0cyB0aGUgY2hhcnQgcG9pbnRzIGZvciB0aGUgc3BlY2VmaWVkIHJhbmdlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY2FudmFzQm91bmRzXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlcmllc0JvdW5kc1xyXG4gICAgICogQHBhcmFtIHsqfSBwb2ludHNcclxuICAgICAqIEBwYXJhbSB7Kn0gaU1pblxyXG4gICAgICogQHBhcmFtIHsqfSBpTWF4XHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBwaXhlbFBvaW50c1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDaGFydFBvaW50cyhwb2ludHM6IENoYXJ0UG9pbnRbXSwgaU1pbjogbnVtYmVyLCBpTWF4OiBudW1iZXIpIHtcclxuICAgICAgICAgcmV0dXJuIHBvaW50cy5maWx0ZXIoKHBvaW50LGkpPT57IHJldHVybiBpID49IGlNaW4gJiYgaSA8PSBpTWF4IH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZHVjZXMgdGhlIHBvaW50cyB0byBhIHVzZWZ1bCBjb3VudCB3aXRoIHJlc3BlY3QgdG8gdGhlIHZpc2libGUgYXJlYVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGNhbnZhc0JvdW5kc1xyXG4gICAgICogQHBhcmFtIHsqfSBzZXJpZXNCb3VuZHNcclxuICAgICAqIEBwYXJhbSB7Kn0gcG9pbnRzXHJcbiAgICAgKiBAcGFyYW0geyp9IGlNaW5cclxuICAgICAqIEBwYXJhbSB7Kn0gaU1heFxyXG4gICAgICogQHBhcmFtIHthbnlbXX0gcGl4ZWxQb2ludHNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UmVkdWNlZENoYXJ0UG9pbnRzV2l0aGluQm91bmRzKGNhbnZhc0JvdW5kczogYW55LCBzZXJpZXNCb3VuZHM6IGFueSwgcG9pbnRzOiBDaGFydFBvaW50W10sIGlNaW46IG51bWJlciwgaU1heDogbnVtYmVyKSA6Q2hhcnRQb2ludFtde1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgcGl4ZWwgcG9pbnQgYXJyYXlcclxuICAgICAgICAvLyB0aGUgd2lkdGggbmVlZHMgdG8gYmUgY29udmVydGVkIHRvIGludGVnZXIgYmVjYXVzZSBpbiB0aGUgY2FzZSBvZiBhY3RpdmUgYnJvd3NlciB6b29tIHRoZSB3aWR0aCBpcyBwYXNzZWQgYXMgZmxvYXQgdmFsdWUgIVxyXG4gICAgICAgIGxldCBjYW52YXNXaWR0aCA9IE1hdGguY2VpbChjYW52YXNCb3VuZHMud2lkdGgpO1xyXG4gICAgICAgIHZhciBwaXhlbFBvaW50cyA9IG5ldyBBcnJheShjYW52YXNXaWR0aCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgc2V0IGZvciByZWNlaXZpbmcgdGhlIHZpc2libGUgcG9pbnRzIHRvIGF2b2lkIGR1cGxpY2F0ZXNcclxuICAgICAgICBsZXQgb3B0aW1pemVkUG9pbnRzOiBTZXQ8Q2hhcnRQb2ludD4gPSBuZXcgU2V0PENoYXJ0UG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCB4U2NhbGUgPSBjYW52YXNCb3VuZHMud2lkdGggLyBzZXJpZXNCb3VuZHMueERlbHRhO1xyXG4gICAgICAgIGlmIChwb2ludHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpVmlzaWJsZVBvaW50ID0gaU1pbjsgaVZpc2libGVQb2ludCA8PSBpTWF4OyBpVmlzaWJsZVBvaW50KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVkdWNlUGl4ZWxQb2ludHMocG9pbnRzW2lWaXNpYmxlUG9pbnRdLCBzZXJpZXNCb3VuZHMsIHhTY2FsZSwgaVZpc2libGVQb2ludCwgcGl4ZWxQb2ludHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGl4ZWxQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBpeGVsUG9pbnQgPSBwaXhlbFBvaW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChwaXhlbFBvaW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBpeGVsU3ViUG9pbnRzKHBpeGVsUG9pbnQsIGksIG9wdGltaXplZFBvaW50cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20ob3B0aW1pemVkUG9pbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICogQWRkcyBhZGRpdGlvbmFsIHBvaW50cyBmb3IgbWFya2luZyBtaW4gYW5kIG1heCB2YWx1ZXMgd2l0aGluIGEgc2VnbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHBpeGVsUG9pbnRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0UG9pbnRbXX0gb3B0aW1pemVkUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkUGl4ZWxTdWJQb2ludHMocGl4ZWxQb2ludDogYW55LCBpOiBudW1iZXIsIG9wdGltaXplZFBvaW50czogU2V0PENoYXJ0UG9pbnQ+KSB7XHJcblxyXG4gICAgICAgIC8vIGFkZCB0aGUgZmlyc3QgcGl4ZWwgcG9pbnRcclxuICAgICAgICB0aGlzLmFkZE9wdGltaXplZFBvaW50KG9wdGltaXplZFBvaW50cywgaSwgcGl4ZWxQb2ludC5maXJzdFBvaW50KTtcclxuICAgICAgICAvLyBhZGQgbWluIG1heCBwb2ludHNcclxuICAgICAgICBpZiAocGl4ZWxQb2ludC55TWluUG9pbnQuaW5kZXggPD0gcGl4ZWxQb2ludC55TWF4UG9pbnQuaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRPcHRpbWl6ZWRQb2ludChvcHRpbWl6ZWRQb2ludHMsIGksIHBpeGVsUG9pbnQueU1pblBvaW50KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRPcHRpbWl6ZWRQb2ludChvcHRpbWl6ZWRQb2ludHMsIGksIHBpeGVsUG9pbnQueU1heFBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkT3B0aW1pemVkUG9pbnQob3B0aW1pemVkUG9pbnRzLCBpLCBwaXhlbFBvaW50LnlNYXhQb2ludCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkT3B0aW1pemVkUG9pbnQob3B0aW1pemVkUG9pbnRzLCBpLCBwaXhlbFBvaW50LnlNaW5Qb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGFkZCB0aGUgbGFzdCBwb2ludFxyXG4gICAgICAgIHRoaXMuYWRkT3B0aW1pemVkUG9pbnQob3B0aW1pemVkUG9pbnRzLCBpLCBwaXhlbFBvaW50Lmxhc3RQb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuZCBhZGRzIGEgY2hhcnQgcG9pbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDaGFydFBvaW50W119IG9wdGltaXplZFBvaW50c1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlcclxuICAgICAqIEBwYXJhbSB7Kn0gcGl4ZWxQb2ludFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZE9wdGltaXplZFBvaW50KG9wdGltaXplZFBvaW50czpTZXQ8Q2hhcnRQb2ludD4sIGk6IG51bWJlciwgcGl4ZWxQb2ludDogYW55KSB7XHJcblxyXG4gICAgICAgIG9wdGltaXplZFBvaW50cy5hZGQocGl4ZWxQb2ludCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgdGhlIG1heGltdW0gd2l0aGluIGFuIGFycmF5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIGZpbmRNYXhpbXVtKHZhbHVlcykge1xyXG4gICAgICAgIGxldCBtYXggPSB2YWx1ZXNbMF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2YWx1ZXNbaV07XHJcbiAgICAgICAgICAgIG1heCA9IHZhbHVlID4gbWF4ID8gdmFsdWUgOiBtYXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXg7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiBSZWR1Y2VzIHRoZSBwaXhlbCBwb2ludHMgcmVzcGVjdGluZyB0aGUgcG9pbnQgZGVuc2l0eSBvbiBwaXhlbHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB2aXNpYmxlUG9pbnRcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VyaWVzQm91bmRzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFNjYWxlXHJcbiAgICAgKiBAcGFyYW0geyp9IGlWaXNpYmxlUG9pbnRcclxuICAgICAqIEBwYXJhbSB7YW55W119IHBpeGVsUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVkdWNlUGl4ZWxQb2ludHModmlzaWJsZVBvaW50OiBhbnksIHNlcmllc0JvdW5kczogYW55LCB4U2NhbGU6IG51bWJlciwgaVZpc2libGVQb2ludDogYW55LCBwaXhlbFBvaW50czogYW55W10pIHtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHBpeGVsIG9mZnNldCB0byBheGlzIG1pblxyXG4gICAgICAgIGxldCB4T2Zmc2V0ID0gKHZpc2libGVQb2ludC54IC0gc2VyaWVzQm91bmRzLnhNaW4pICogKHhTY2FsZSk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBwaXhlbCBpbmRleFxyXG4gICAgICAgIGxldCBpUGl4ZWwgPSBNYXRoLnJvdW5kKHhPZmZzZXQpO1xyXG4gICAgICAgIHZpc2libGVQb2ludC5pbmRleCA9IGlWaXNpYmxlUG9pbnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRQb2ludHNGb3JYUGl4ZWwocGl4ZWxQb2ludHMsIHZpc2libGVQb2ludCwgaVBpeGVsKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9pbnQgZm9yIGEgY29ycnNwb25kaW5nIHBpeGVsIGxvY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7YW55W119IHBpeGVsUG9pbnRzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaVBpeGVsXHJcbiAgICAgKiBAcGFyYW0geyp9IHNpZ25hbFBvaW50XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkUG9pbnRzRm9yWFBpeGVsKHBpeGVsUG9pbnRzOiBhbnlbXSwgc2lnbmFsUG9pbnQ6IGFueSwgaVBpeGVsOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKCFwaXhlbFBvaW50c1tpUGl4ZWxdKSB7XHJcbiAgICAgICAgICAgIC8vIGRlZmluZSB0aGUgZmlyc3QgcG9pbnQgZm9yIHRoaXMgcGl4ZWxcclxuICAgICAgICAgICAgcGl4ZWxQb2ludHNbaVBpeGVsXSA9IHt9O1xyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIHRoZSBsYXN0IHBvaW50IGFzIGRlZmF1bHRcclxuICAgICAgICAgICAgcGl4ZWxQb2ludHNbaVBpeGVsXS5maXJzdFBvaW50ID0gc2lnbmFsUG9pbnQ7XHJcbiAgICAgICAgICAgIHBpeGVsUG9pbnRzW2lQaXhlbF0ubGFzdFBvaW50ID0gc2lnbmFsUG9pbnQ7XHJcbiAgICAgICAgICAgIHBpeGVsUG9pbnRzW2lQaXhlbF0ueU1heFBvaW50ID0gc2lnbmFsUG9pbnQ7XHJcbiAgICAgICAgICAgIHBpeGVsUG9pbnRzW2lQaXhlbF0ueU1pblBvaW50ID0gc2lnbmFsUG9pbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBsYXN0IHBvaW50IGZvciBmb2xsb3dpbmcgdmFsdWVzIG9uIHRoZSBzYW1lIHBpeGVsXHJcbiAgICAgICAgICAgIHBpeGVsUG9pbnRzW2lQaXhlbF0ubGFzdFBvaW50ID0gc2lnbmFsUG9pbnQ7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgbWluLG1heFxyXG4gICAgICAgICAgICBpZiAoc2lnbmFsUG9pbnQueSA+IHBpeGVsUG9pbnRzW2lQaXhlbF0ueU1heFBvaW50LnkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9pbnQgY29udGFpbmluZyB5TWF4XHJcbiAgICAgICAgICAgICAgICBwaXhlbFBvaW50c1tpUGl4ZWxdLnlNYXhQb2ludCA9IHNpZ25hbFBvaW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2lnbmFsUG9pbnQueSA8IHBpeGVsUG9pbnRzW2lQaXhlbF0ueU1pblBvaW50LnkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9pbnQgY29udGFpbmluZyB5TWluXHJcbiAgICAgICAgICAgICAgICBwaXhlbFBvaW50c1tpUGl4ZWxdLnlNaW5Qb2ludCA9IHNpZ25hbFBvaW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaW1zIG9yIG9wdGltaXplcyBzZXJpZXMgcG9pbnQgdG8gYmUgZGlzcGxheSB3aXRoaW4gYSAyRCBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gY2hhcnRTZXJpZXNcclxuICAgICAqIEBwYXJhbSB7Kn0gY2hhcnRJbnN0YW5jZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmltU2VyaWVzRm9yQ2hhcnRCb3VuZHMyRChjaGFydFNlcmllcywgY2hhcnRJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAvLyB0aGUgY2hhcnQgcG9pbnRzIHRvIGJlIGNhbGN1bGF0ZWRcclxuICAgICAgICBsZXQgY2hhcnRQb2ludHM6IFNlcmllc1BvaW50W10gPSBbXTtcclxuICAgICAgICAvLyBnZXQgdGhlIGNhbnZhcyBib3VuZHMgaW4gcGl4ZWxcclxuICAgICAgICBsZXQgY2FudmFzQm91bmRzID0gdGhpcy5nZXRDaGFydEFyZWFCb3VuZHNJblBpeGVsKGNoYXJ0SW5zdGFuY2UpO1xyXG4gICAgICAgIC8vIGdldCB0aGUgY2hhcnQgYXJlYSBib3VuZHNcclxuICAgICAgICBsZXQgY2hhcnRBcmVhQm91bmRzID0gdGhpcy5nZXRDaGFydEFyZWFCb3VuZHMoY2hhcnRTZXJpZXMpO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIHNlcmllcyB3aXRoIGEgbWF0Y2hpbmcgbmFtZVxyXG4gICAgICAgIGxldCBkYXRhU2VyaWVzID0gdGhpcy5nZXRTZXJpZXNEYXRhKGNoYXJ0U2VyaWVzKTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGFTZXJpZXMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgb3JpZ2luYWwgdW5tb2RpZmllZCBwb2ludHMgXHJcbiAgICAgICAgICAgIGxldCByYXdQb2ludHM6IElQb2ludFtdID0gZGF0YVNlcmllcy5yYXdQb2ludHM7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgaW5pdGlhbGx5IHNpbXBsaWZpZWQgZGF0YVxyXG4gICAgICAgICAgICBsZXQgdmlld1BvaW50c0RhdGEgPSAoPGFueT5kYXRhU2VyaWVzKS5kYXRhO1xyXG4gICAgICAgICAgICAvLyByZXRyaWV2ZSB0aGUgcG9pbnRzIHRvIGJlIGRpc3BsYXllZCAgICAgICBcclxuICAgICAgICAgICAgbGV0IHZpZXdTZXJpZXNQb2ludHMgPSB2aWV3UG9pbnRzRGF0YSBhcyBJUG9pbnRbXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUudGltZShcImNhbGN1bGF0ZSByZWR1Y2VkIGNoYXJ0IHBvaW50c1wiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJldHJpZXZlIHRoZSB2aXNpYmxlIHNlZ21lbnQgcG9pbnRzXHJcbiAgICAgICAgICAgIGNoYXJ0UG9pbnRzID0gdGhpcy5yZXRyaWV2ZVZpc2libGVMaW5lU2VnbWVudFBvaW50cyh2aWV3U2VyaWVzUG9pbnRzLCBjaGFydEFyZWFCb3VuZHMpO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHJhdyBwb2ludHMgY291bnQgY292ZXJlZCBieSB0aGUgdmlzaWJsZSBzZWdtZW50c1xyXG4gICAgICAgICAgICBsZXQgcmF3VmlzaWJsZVBvaW50c0NvdW50ID0gY2hhcnRQb2ludHMubGVuZ3RoID4gMCA/IGNoYXJ0UG9pbnRzW2NoYXJ0UG9pbnRzLmxlbmd0aCAtIDFdLmluZGV4IC0gY2hhcnRQb2ludHNbMF0uaW5kZXggKyAxIDogMDtcclxuICAgICAgICAgICAgaWYgKHJhd1Zpc2libGVQb2ludHNDb3VudCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGN1cnJlbnQgY2hhcnQgdW5pdHMvcGl4ZWxcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtYVW5pdHNQZXJQaXhlbCA9IGNoYXJ0QXJlYUJvdW5kcy54RGVsdGEgLyBjYW52YXNCb3VuZHMud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrWVVuaXRzUGVyUGl4ZWwgPSBjaGFydEFyZWFCb3VuZHMueURlbHRhIC8gY2FudmFzQm91bmRzLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgY3VycmVudCBjb29yZGluYXRlIHRvIHBpeGVsIHJhdGlvIGZhbGxzIGJlbG93IHRoZSBpbml0aWFsIHJhdGlvbiB3ZSBuZWVkIHRvIHJlY2FsY3VsYXRlIHRoZSBzaW1wbGlmaWVkIHBvaW50cyBmb3IgdGhlIGN1cnJlbnQgZ2l2ZW4gdmlldyBwb3J0XHJcbiAgICAgICAgICAgICAgICAvLyB0byBnZXQgdGhlIGJlc3QgbWF0Y2hpbmcgYXBwcm94aW1hdGVkIHNpbXBsaWZpZWQgbGluZS4gXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0RldGFpbFpvb21MZXZlbCh2aWV3UG9pbnRzRGF0YSxrWFVuaXRzUGVyUGl4ZWwsa1lVbml0c1BlclBpeGVsKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyByZXRyaWV2ZSB0aGUgcG9pbnRzIHdpdGggdGhlIHByZWNpc2lvbiBmb3IgcmVxdWVzdGVkIHpvb20gbGV2ZWwgXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRQb2ludHMgPSB0aGlzLnJldHJpZXZlRGV0YWlsZWRDaGFydFBvaW50cyhjaGFydFBvaW50cywgcmF3UG9pbnRzLCBjaGFydEFyZWFCb3VuZHMsIGtYVW5pdHNQZXJQaXhlbCwga1lVbml0c1BlclBpeGVsKTsgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUudGltZUVuZChcImNhbGN1bGF0ZSByZWR1Y2VkIGNoYXJ0IHBvaW50c1wiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvcHRpbWl6ZWQgcG9pbnRzOiAlb1wiLCBjaGFydFBvaW50cy5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb3B0aW1pemVkUG9pbnRzID0gY2hhcnRQb2ludHMubWFwKChwb2ludCwgaSkgPT4geyByZXR1cm4gbmV3IENoYXJ0UG9pbnQocG9pbnQuaW5kZXgscG9pbnQudmlzaWJsZSwgcG9pbnQueCwgcG9pbnQueSk7IH0pO1xyXG4gICAgICAgIHJldHVybiBvcHRpbWl6ZWRQb2ludHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjaGFydFNlcmllc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTZXJpZXNEYXRhKGNoYXJ0U2VyaWVzOiBhbnkpIHtcclxuICAgICAgICBsZXQgY2hhcnRWaWV3U2VyaWVzOiBDaGFydFZpZXdTZXJpZSB8IHVuZGVmaW5lZCA9IHRoaXMuX3Nlcmllc1Byb3ZpZGVyLnNlcmllcy5maW5kKChzZXJpZXMpID0+IHsgcmV0dXJuIHNlcmllcy5pZCA9PT0gY2hhcnRTZXJpZXMubmFtZTsgfSk7XHJcbiAgICAgICAgbGV0IGRhdGFTZXJpZXMgPSBjaGFydFZpZXdTZXJpZXMgPyBjaGFydFZpZXdTZXJpZXMuc2VyaWUgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmV0dXJuIGRhdGFTZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGRhdGEgcG9pbnRzIG5lY2Vzc2FyeSB0byBzYXRpc2Z5IHRoZSBzcGVjaWZpZWQgY2hhcnQgYm91bmRzIGFuZCB6b29tIHJhdGlvLiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTZXJpZXNQb2ludFtdfSBjaGFydFBvaW50c1xyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXX0gcmF3UG9pbnRzXHJcbiAgICAgKiBAcGFyYW0ge3sgeE1pbjogYW55OyB4TWF4OiBhbnk7IHhEZWx0YTogYW55OyB5TWluOiBhbnk7IHlNYXg6IGFueTsgeURlbHRhOiBhbnk7IH19IGNoYXJ0QXJlYUJvdW5kc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnJlbnRDaGFydFBpeGVsUmF0aW9YXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3VycmVudENoYXJ0UGl4ZWxSYXRpb25ZXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJldHJpZXZlRGV0YWlsZWRDaGFydFBvaW50cyhjaGFydFBvaW50czogU2VyaWVzUG9pbnRbXSwgcmF3UG9pbnRzOiBJUG9pbnRbXSwgY2hhcnRBcmVhQm91bmRzOiB7IHhNaW46IGFueTsgeE1heDogYW55OyB4RGVsdGE6IGFueTsgeU1pbjogYW55OyB5TWF4OiBhbnk7IHlEZWx0YTogYW55OyB9LCBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvWDogbnVtYmVyLCBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvblk6IG51bWJlcikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGxhc3RSYXdJbmRleCA9IGNoYXJ0UG9pbnRzW2NoYXJ0UG9pbnRzLmxlbmd0aCAtIDFdLmluZGV4O1xyXG4gICAgICAgIGNvbnN0IGZpcnN0VmlzaWJsZVJhd1BvaW50SW5kZXggPSBjaGFydFBvaW50c1swXS5pbmRleDtcclxuICAgICAgICBjb25zdCBsYXN0VmlzaWJsZVJhd1BvaW50SW5kZXggPSBsYXN0UmF3SW5kZXggPCByYXdQb2ludHMubGVuZ3RoID8gbGFzdFJhd0luZGV4ICsgMSA6IHJhd1BvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSByYXcgcG9pbnRzIGNvdmVyZWQgYnkgdGhlIHZpc2libGUgc2VnbWVudHNcclxuICAgICAgICBsZXQgcmF3VmlzaWJsZVBvaW50cyA9IHJhd1BvaW50cy5zbGljZShmaXJzdFZpc2libGVSYXdQb2ludEluZGV4LCBsYXN0VmlzaWJsZVJhd1BvaW50SW5kZXgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHVwZGF0ZSBwb2ludCBpbmRpY2VzXHJcbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmlsaXR5SW5kaWNlcyhyYXdWaXNpYmxlUG9pbnRzKTtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIHZpc2libGUgbGluZSBzZWdtZW50IHBvaW50c1xyXG4gICAgICAgIGNoYXJ0UG9pbnRzID0gdGhpcy5yZXRyaWV2ZVZpc2libGVMaW5lU2VnbWVudFBvaW50cyhyYXdWaXNpYmxlUG9pbnRzLCBjaGFydEFyZWFCb3VuZHMpO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGUgbnVtYmVydCBvZiBjaGFydCBwb2ludHMgaXMgc3RpbGwgdG9vIGhpZ2gsIHdlIG5lZWQgdG8gZnVydGhlciBzaW1wbGlmeSB0aGUgZGF0YSBwb2ludHNcclxuICAgICAgICBpZiAoY2hhcnRQb2ludHMubGVuZ3RoID4gMTAwMCkge1xyXG5cclxuICAgICAgICAgICAgLy8gc2ltcGxpZnkgdGhlIHJlbWFpbmluZyB2aXNpYmxlIHBvaW50cyBhY2NvcmRpbmcgdGhlIHNwZWNpZmllZCBwcmVjaXNpb24gYW5kIHJhdGlvXHJcbiAgICAgICAgICAgIGNoYXJ0UG9pbnRzID0gdGhpcy5yZHAuc2ltcGxpZnkocmF3VmlzaWJsZVBvaW50cywgMC4yNSwgY3VycmVudENoYXJ0UGl4ZWxSYXRpb1gsIGN1cnJlbnRDaGFydFBpeGVsUmF0aW9uWSwgZmFsc2UpIGFzIFNlcmllc1BvaW50W107XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgcG9pbnQgaW5kaWNlc1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpc2liaWxpdHlJbmRpY2VzKGNoYXJ0UG9pbnRzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJldHJpZXZlIHRoZSB2aXNpYmxlIHNlZ21lbnQgcG9pbnRzXHJcbiAgICAgICAgICAgIGNoYXJ0UG9pbnRzID0gdGhpcy5yZXRyaWV2ZVZpc2libGVMaW5lU2VnbWVudFBvaW50cyhjaGFydFBvaW50cywgY2hhcnRBcmVhQm91bmRzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2hhcnRQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB2aWV3UG9pbnRzRGF0YVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnJlbnRDaGFydFBpeGVsUmF0aW9YXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3VycmVudENoYXJ0UGl4ZWxSYXRpb25ZXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzRGV0YWlsWm9vbUxldmVsKHZpZXdQb2ludHNEYXRhOiBhbnksIGN1cnJlbnRDaGFydFBpeGVsUmF0aW9YOiBudW1iZXIsIGN1cnJlbnRDaGFydFBpeGVsUmF0aW9uWTogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDaGFydFBpeGVsUmF0aW9YIDwgdmlld1BvaW50c0RhdGEucGl4ZWxSYXRpb1ggfHwgY3VycmVudENoYXJ0UGl4ZWxSYXRpb25ZIDwgdmlld1BvaW50c0RhdGEucGl4ZWxSYXRpb1k7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgaW5kaWNlcyBvZiB0aGUgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IHJlZHVjZWRWaXNpYmxlUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlVmlzaWJpbGl0eUluZGljZXMocG9pbnRzOiBJUG9pbnRbXSkge1xyXG4gICAgICAgIGxldCBzZXJpZXNQb2ludHMgPSBwb2ludHMgYXMgU2VyaWVzUG9pbnRbXTtcclxuICAgICAgICBzZXJpZXNQb2ludHMuZm9yRWFjaCgocG9pbnQsaW5kZXgpID0+IHsgcG9pbnQuaW5kZXggPSBpbmRleDsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjaGFydCBhcmVhIGJvdW5kcyBpbiBwaXhlbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoYXJ0SW5zdGFuY2VcclxuICAgICAqIEByZXR1cm5zIHt7eDpudW1iZXIseTpudW1iZXIsd2lkdGg6bnVtYmVyLGhlaWdodDpudW1iZXJ9fVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENoYXJ0QXJlYUJvdW5kc0luUGl4ZWwoY2hhcnRJbnN0YW5jZTogYW55KTogeyB4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogY2hhcnRJbnN0YW5jZS5jYW52YXNYLFxyXG4gICAgICAgICAgICB5OiBjaGFydEluc3RhbmNlLmNhbnZhc1ksXHJcbiAgICAgICAgICAgIHdpZHRoOiBjaGFydEluc3RhbmNlLmNhbnZhc1dpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGNoYXJ0SW5zdGFuY2UuY2FudmFzSGVpZ2h0LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB2aXNpYmxlIGNoYXJ0IGFyZWEgYm91bmRzIGluIGNvb3JkaW5hdGUgdW5pdHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjaGFydFNlcmllc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDaGFydEFyZWFCb3VuZHMoY2hhcnRTZXJpZXM6IGFueSkge1xyXG5cclxuICAgICAgICBsZXQgY2hhcnRBcmVhQm91bmRzID0ge1xyXG4gICAgICAgICAgICB4TWluOiBjaGFydFNlcmllcy54QXhpcy5yYW5nZS5taW4sXHJcbiAgICAgICAgICAgIHhNYXg6IGNoYXJ0U2VyaWVzLnhBeGlzLnJhbmdlLm1heCxcclxuICAgICAgICAgICAgeERlbHRhOiBjaGFydFNlcmllcy54QXhpcy5yYW5nZS5kZWx0YSxcclxuICAgICAgICAgICAgeU1pbjogY2hhcnRTZXJpZXMueUF4aXMucmFuZ2UubWluLFxyXG4gICAgICAgICAgICB5TWF4OiBjaGFydFNlcmllcy55QXhpcy5yYW5nZS5tYXgsXHJcbiAgICAgICAgICAgIHlEZWx0YTogY2hhcnRTZXJpZXMueUF4aXMucmFuZ2UuZGVsdGEsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY2hhcnRBcmVhQm91bmRzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgYSBsaW5lIGludGVyc2VjdHMgYSByZWN0YW5nbGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gcDFcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBwMlxyXG4gICAgICogQHBhcmFtIHtCb3VuZHN9IGJvdW5kc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqIFxyXG4gICAgICogUmV2aWV3IEx1a2FzIE9iZXJzYW1lcjpcclxuICAgICAqIFRoZSBjeWNsb21hdGljIGNvbXBsZXhpdHkgb2YgdGhpcyBmdW5jdGlvbiBpcyB0b28gaGlnaCwgYnV0IHRoYXQgZG9lcyBub3QgcmVmbGV4dCB0aGUgY29tcGxleGl0eSBmb3IgaHVtYW5zIHRvIHVuZGVyc3RhbmQgaXQuIFxyXG4gICAgICogVGhlIGNvbXBsZXhpdHkgb2YgdW5kZXJzdGluZyB0aGlzIG1ldGhvZCBpcyBpbiBmYWN0IHN1cGVyIHNpbXBsZSBpbiBwYXJ0aWN1bGFyIGR1ZSB0byBwcm9mZXNzaW9uYWwgY29tbWVudGluZy4gVGhlcmVmb3JlIHRoZSBtZXRob2Qgc2hhbGwgcmVtYWluIGluIHRoaXMgZm9ybS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGxpbmVJbnRlcnNlY3RzUmVjdGFuZ2xlKHAxOiBJUG9pbnQsIHAyOiBJUG9pbnQsIGJvdW5kczogQm91bmRzKSB7XHJcblxyXG4gICAgICAgIC8vIGV4Y2x1ZGUgbm9uIGludGVyc2VjdGluZyBsaW5lc1xyXG4gICAgICAgIGlmICgocDEueCA8IGJvdW5kcy54TWluICYmIHAyLnggPCBib3VuZHMueE1pbikgfHwgKHAxLnkgPCBib3VuZHMueU1pbiAmJiBwMi55IDwgYm91bmRzLnlNaW4pIHx8IChwMS54ID4gYm91bmRzLnhNYXggJiYgcDIueCA+IGJvdW5kcy54TWF4KSB8fCAocDEueSA+IGJvdW5kcy55TWF4ICYmIHAyLnkgPiBib3VuZHMueU1heCkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJlY3RhbmdsZUNvbnRhaW5zUG9pbnQocDEsYm91bmRzKSB8fCB0aGlzLnJlY3RhbmdsZUNvbnRhaW5zUG9pbnQocDIsYm91bmRzKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBkeS9keFxyXG4gICAgICAgICAgICBsZXQgayA9IChwMi55IC0gcDEueSkgLyAocDIueCAtIHAxLngpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgbGluZSBpbnRlcnNlY3RzIGxlZnQgYm9yZGVyXHJcbiAgICAgICAgICAgIGxldCB5SW50ZXJzZWN0ID0gcDEueSArIGsgKiAoYm91bmRzLnhNaW4gLSBwMS54KTtcclxuICAgICAgICAgICAgaWYgKHlJbnRlcnNlY3QgPj0gYm91bmRzLnlNaW4gJiYgeUludGVyc2VjdCA8PSBib3VuZHMueU1heCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBsaW5lIGludGVyc2VjdHMgcmlnaHQgYm9yZGVyXHJcbiAgICAgICAgICAgIHlJbnRlcnNlY3QgPSBwMS55ICsgayAqIChib3VuZHMueE1heCAtIHAxLngpO1xyXG4gICAgICAgICAgICBpZiAoeUludGVyc2VjdCA+PSBib3VuZHMueU1pbiAmJiB5SW50ZXJzZWN0IDw9IGJvdW5kcy55TWF4KSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGxpbmUgaW50ZXJzZWN0cyBib3R0b20gYm9yZGVyXHJcbiAgICAgICAgICAgIGxldCB4SW50ZXJzZWMgPSBwMS54ICsgKGJvdW5kcy55TWluIC0gcDEueSkgLyBrO1xyXG4gICAgICAgICAgICBpZiAoeEludGVyc2VjID49IGJvdW5kcy54TWluICYmIHhJbnRlcnNlYyA8PSBib3VuZHMueE1heCkgcmV0dXJuIHRydWU7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgbGluZSBpbnRlcnNlY3RzIHRvcCBib3JkZXJcclxuICAgICAgICAgICAgeEludGVyc2VjID0gcDEueCArIChib3VuZHMueU1heCAtIHAxLnkpIC8gaztcclxuICAgICAgICAgICAgaWYgKHhJbnRlcnNlYyA+PSBib3VuZHMueE1pbiAmJiB4SW50ZXJzZWMgPD0gYm91bmRzLnhNYXgpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJsaW5lSW50ZXJzZWN0c1JlY3RhbmdsZVwiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHRoZSBsaW5lIHNlZ21lbnQgcG9pbnRzIGZvciBzZWdtZW50cyBpbnRlcnNlY3RpbmcgdGhlIHNwZWNpZmllZCBib3VuZHMuIFRoZSBtZXRob2RzIGFkZHMsIGlmIG5lY2Vzc2FyeSBpbnZpc2libGUgbGluZSBzZWdtZW50cyBieSBhZGRpbmcgaW52aXNpYmxlIGhlbGtwZXIgcG9pbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSBwb2ludHNcclxuICAgICAqIEBwYXJhbSB7Qm91bmRzfSBib3VuZHNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmV0cmlldmVWaXNpYmxlTGluZVNlZ21lbnRQb2ludHMocG9pbnRzOiBJUG9pbnRbXSAsIGJvdW5kczogQm91bmRzKTpTZXJpZXNQb2ludFtdIHtcclxuXHJcbiAgICAgICAgaWYgKHBvaW50cy5sZW5ndGggPCAyKSByZXR1cm4gcG9pbnRzIGFzIFNlcmllc1BvaW50W107XHJcblxyXG4gICAgICAgIC8vIHRoZSBhdmFpbGFibGUgcG9pbnQgYXMgc2VyaWVzIHBvaW50c1xyXG4gICAgICAgIGxldCBzZXJpZXNQb2ludHMgPSBwb2ludHMgYXMgU2VyaWVzUG9pbnRbXTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSByZXN1bHQgc2VnbWVudCBwb2ludHMgYXJyYXlcclxuICAgICAgICBsZXQgbGluZVNlZ21lbnRQb2ludHM6IFNlcmllc1BvaW50W10gPSBbXTtcclxuXHJcblxyXG4gICAgICAgIC8vIGhvbGRzIHRoZSBsYXN0IGFkZGVkIGVuZCBwb2ludC5cclxuICAgICAgICBsZXQgbGFzdEVuZFBvaW50OlNlcmllc1BvaW50fG51bGwgPSBudWxsO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNlcmllc1BvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwU3RhcnQgPSBzZXJpZXNQb2ludHNbaSAtIDFdO1xyXG4gICAgICAgICAgICBjb25zdCBwRW5kID0gc2VyaWVzUG9pbnRzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGxpbmUgaW50ZXJzZWN0cyB0aGUgc3BlY2lmaWVkIGJvdW5kc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saW5lSW50ZXJzZWN0c1JlY3RhbmdsZShwU3RhcnQsIHBFbmQsIGJvdW5kcykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWxhc3RFbmRQb2ludCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgd2UgbmVlZCB0byBhZGQgdGhlIGZpcnN0IHN0YXJ0IHBvaW50XHJcbiAgICAgICAgICAgICAgICAgICAgcFN0YXJ0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVTZWdtZW50UG9pbnRzLnB1c2gocFN0YXJ0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBub3cgd2UgY29udGludWUgdGhlIGxpbmUgLi4uLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5lIGlzIGludGVycnVwdGVkICggc3RhcnQgYW5kIHByZXZpb3VzIGVuZCBpbmRleCBpcyBub3QgdGhlIHNhbWUpLCB3ZSBuZWVkIHRvIGFkZCBhbiBpbnZpc2libGUgaGVscGVyIHBvaW50IHRvIGNyZWF0ZSBhbiBpbnZpc2libGUgc2VnbWVudC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGRpdGlvbmFsbHkgd2UgbmVlZCB0byBhZGQgdGhlIHN0YXJ0IHBvaW50IG9mIHRoZSBuZXh0IHZpc2libGUgbGluZSBzZWdtZW50LlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwU3RhcnQuaW5kZXggIT0gbGFzdEVuZFBvaW50LmluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYW4gaW52aXNpYmxlIGhlbHBlciBwb2ludFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW52aXNpYmxlU2VnbWVuU3RhcnRQb2ludCA9IE9iamVjdC5jcmVhdGUobGFzdEVuZFBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW52aXNpYmxlU2VnbWVuU3RhcnRQb2ludC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgaW52aXNpYmxlIGhlbHBlciBwb2ludFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lU2VnbWVudFBvaW50cy5wdXNoKGludmlzaWJsZVNlZ21lblN0YXJ0UG9pbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBzdGFydCBwb2ludCBvZiBuZXh0IHZpc2libGUgbGluZSBzZWdtZW50LiBUaGlzIGlzIHdoZXJlIHRoZSBsaW5lIHNlZ21lbnQgaXMgdG8gYmUgY29udGludWVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwU3RhcnQudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVTZWdtZW50UG9pbnRzLnB1c2gocFN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGp1c3QgYWRkIHRoZSBuZXh0IHZpc2libGUgZW5kIHBvaW50XHJcbiAgICAgICAgICAgICAgICBwRW5kLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGluZVNlZ21lbnRQb2ludHMucHVzaChwRW5kKTtcclxuICAgICAgICAgICAgICAgIGxhc3RFbmRQb2ludCA9IHBFbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGxpbmVTZWdtZW50UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHJlY3RhbmdsZUNvbnRhaW5zUG9pbnQocG9pbnQ6IElQb2ludCwgYm91bmRzOiB7IHhNaW46IG51bWJlcjsgeE1heDogbnVtYmVyOyB5TWluOiBudW1iZXI7IHlNYXg6IG51bWJlcjsgfSkge1xyXG5cclxuICAgICAgICBjb25zdCB4TWluRGlmZiA9IHBvaW50LnggLSBib3VuZHMueE1pbjtcclxuICAgICAgICBjb25zdCB4TWF4RGlmZiA9IGJvdW5kcy54TWF4IC0gcG9pbnQueDtcclxuICAgICAgICBjb25zdCB5TWluRGlmZiA9IHBvaW50LnkgLSBib3VuZHMueU1pbjtcclxuICAgICAgICBjb25zdCB5TWF4RGlmZiA9IGJvdW5kcy55TWF4IC0gcG9pbnQueTtcclxuXHJcbiAgICAgICAgY29uc3QgeFdpdGhpblJhbmdlID0geE1pbkRpZmYgPj0gMCAmJiB4TWF4RGlmZiA+PSAwO1xyXG4gICAgICAgIGNvbnN0IHlXaXRoaW5SYW5nZSA9IHlNaW5EaWZmID49IDAgJiYgeU1heERpZmYgPj0gMDtcclxuXHJcblxyXG4gICAgICAgIC8vIGNvbnN0IHhXaXRoaW5SYW5nZSA9IHBvaW50LnggPj0gYm91bmRzLnhNaW4gJiYgcG9pbnQueCA8PSBib3VuZHMueE1heDtcclxuICAgICAgICAvLyBjb25zdCB5V2l0aGluUmFuZ2UgPSBwb2ludC55ID49IGJvdW5kcy55TWluICYmIHBvaW50LnkgPD0gYm91bmRzLnlNYXg7XHJcblxyXG4gICAgICAgIGxldCByZWN0YW5nbGVzQ29udGFpbnNQb2ludCA9IHhXaXRoaW5SYW5nZSAmJiB5V2l0aGluUmFuZ2U7XHJcblxyXG4gICAgICAgIHJldHVybiByZWN0YW5nbGVzQ29udGFpbnNQb2ludDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIGEgc2VyaWVzIHRvIHRoZSBjaGFydCBvcHRpbWl6ZXIuIFRoZSBtZXRob2QgaW4gZmFjdCBqdXN0IGNhbGN1bGF0ZXMgYW5kIHVwZGF0ZXMgdGhlIHNlcmllcyBib3VuZHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgYXR0YWNoU2VyaWVzKHNlcmllOiBCYXNlU2VyaWVzKSB7XHJcblxyXG4gICAgICAgIGlmIChzZXJpZS5yYXdQb2ludHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBsZXQgc2lnbmFsUG9pbnRzOiBJUG9pbnRbXSA9IHNlcmllLnJhd1BvaW50cztcclxuXHJcbiAgICAgICAgICAgIGxldCB4VmFsdWVzID0gc2lnbmFsUG9pbnRzLm1hcCgocG9pbnQpID0+IHsgcmV0dXJuIHBvaW50LnggfSk7XHJcbiAgICAgICAgICAgIGxldCB5VmFsdWVzID0gc2lnbmFsUG9pbnRzLm1hcCgocG9pbnQpID0+IHsgcmV0dXJuIHBvaW50LnkgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgeE1pbiA9IE1hdGhYLm1pbih4VmFsdWVzKTtcclxuICAgICAgICAgICAgbGV0IHhNYXggPSBNYXRoWC5tYXgoeFZhbHVlcyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgeU1pbiA9IE1hdGhYLm1pbih5VmFsdWVzKTtcclxuICAgICAgICAgICAgbGV0IHlNYXggPSBNYXRoWC5tYXgoeVZhbHVlcyk7XHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgc2VyaWVzIGJvdW5kc1xyXG4gICAgICAgICAgICAoPGFueT5zZXJpZSkuYm91bmRzID0geyB4TWluOiB4TWluLCB4TWF4OiB4TWF4LCB5TWluOiB5TWluLCB5TWF4OiB5TWF4LCB3aWR0aDogKHhNYXggLSB4TWluKSwgaGVpZ2h0OiAoeU1heCAtIHlNaW4pIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VyaWVzRGlzcGxheVBvaW50cyhzZXJpZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgZXZlbnR1YWxseSBleGlzdGluZyBkaXNwbGF5IHBvaW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsZWFyU2VyaWVzRGlzcGxheVBvaW50cyhzZXJpZTogQmFzZVNlcmllcykge1xyXG4gICAgICAgICg8YW55PnNlcmllKS5kaXNwbGF5UG9pbnRzID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlY2xhcmVzIHRoZSB0cmFjZSBkYXRhIHNvdXJjZSBpbnRlcmZhY2VcclxuICpcclxuICogQGludGVyZmFjZSBJQ2hhcnRTZXJpZXNQcm92aWRlclxyXG4gKi9cclxuaW50ZXJmYWNlIElDaGFydFNlcmllc1Byb3ZpZGVyIHtcclxuICAgIHNlcmllczogQXJyYXk8Q2hhcnRWaWV3U2VyaWU+O1xyXG59XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyB0aGUgY2hhcnQgcG9pbnQgY2xhc3NcclxuICpcclxuICogQGNsYXNzIENoYXJ0UG9pbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDaGFydFBvaW50IHtcclxuXHJcbiAgICBpbmRleDogbnVtYmVyO1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeFZhbHVlOiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICBZVmFsdWVzOiBudW1iZXJbXTtcclxuICAgIHZpc2libGU6Ym9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpbmRleCwgdmlzaWJsZSwgeCwgeSkge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy54VmFsdWUgPSB4O1xyXG4gICAgICAgIHRoaXMuWVZhbHVlcyA9IFt5XTtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydERhdGFPcHRpbWl6ZXIsIElDaGFydFNlcmllc1Byb3ZpZGVyIH07Il19