define(["require", "exports", "../../../common/exportSerieGroup", "../../../models/common/signal/serieGroup", "../../../models/signalManagerDataModel/signalManagerCalculation", "../../../models/signalManagerDataModel/signalManagerCalculationInputData", "../../../models/signalManagerDataModel/signalManagerCalculationOutputData", "../../../models/common/series/seriesType", "../../../models/signalManagerDataModel/signalCategory"], function (require, exports, exportSerieGroup_1, serieGroup_1, signalManagerCalculation_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, seriesType_1, signalCategory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportHelper = /** @class */ (function () {
        function ExportHelper() {
        }
        /**
         * Returns array of exportSerieGroup elements
         *
         * @param {*} elements
         * @returns {Array<ExportSerieGroup>}
         * @memberof ExportHelper
         */
        ExportHelper.prototype.getExportableElements = function (elements) {
            var serieGroups = new Array();
            var items = new Array();
            var groupElements = new Array();
            var signalCalculations = new Array();
            var signalInputCalculations = new Array();
            var signalOutputCalculations = new Array();
            //delete not exportable items
            for (var i = 0; i < elements.length; i++) {
                if (!this.isElementExportable(elements[i].item)) {
                    elements.splice(i, 1);
                    i = -1;
                }
            }
            //Classify selected elements into arrays according to its type 
            for (var i = 0; i < elements.length; i++) {
                items.push(elements[i].item);
                //Put all signalCalculations selected into an array for later checks
                if (elements[i].item instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                    signalCalculations.push(elements[i].item);
                }
                //Put all signalInputCalculations selected into an array for later checks
                else if (elements[i].item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    if (!this.isSignalRepeated(signalInputCalculations, elements[i].item.serie)) {
                        signalInputCalculations.push(elements[i].item);
                    }
                    else {
                        var index = items.indexOf(elements[i].item);
                        items.splice(index, 1);
                    }
                }
                //Put all signalOuputCalculations selected into an array for later
                else if (elements[i].item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                    signalOutputCalculations.push(elements[i].item);
                }
                else if (elements[i].item instanceof serieGroup_1.SerieGroup) {
                    //Put all seriegroups selected into an array
                    var serieGroup = elements[i].item;
                    serieGroups.push(serieGroup);
                    //Convert selected Seriegroups to exportSerieGroups
                    if (serieGroup.getChilds()[0] != undefined) {
                        groupElements.push(new exportSerieGroup_1.ExportSerieGroup(serieGroup.name, serieGroup.startTriggerTime, elements[i].item.childs[0].serie));
                        for (var j = 1; j < serieGroup.getChilds().length; j++) {
                            if (serieGroup.getChilds()[j].serie != undefined && serieGroup.getChilds()[j].serie.rawPointsValid == true) {
                                var index = groupElements.length - 1;
                                groupElements[index].addSerie(serieGroup.getChilds()[j].serie);
                            }
                        }
                    }
                }
            }
            this.filterSelectedItems(items, serieGroups, signalCalculations, signalInputCalculations, signalOutputCalculations, groupElements);
            return groupElements;
        };
        /**
         * Delete duplicated series, invalid series or not need it
         *
         * @private
         * @param {Array<any>} items
         * @param {Array<SerieGroup>} serieGroups
         * @param {Array<SignalManagerCalculation>} signalCalculations
         * @param {Array<SignalManagerCalculationInputData>} signalInputCalculations
         * @param {Array<SignalManagerCalculationOutputData>} signalOutputCalculations
         * @memberof ExportHelper
         *
         * Review Lukas Obersamer:
         * The cyclomatic complexity is too high. Commenting is well done, which makes it easier to understand what the code is supposed to do.
         * --> Corrective actions needed as soon as this area of code is touched the next time.
         */
        ExportHelper.prototype.filterSelectedItems = function (items, serieGroups, signalCalculations, signalInputCalculations, signalOutputCalculations, groupElements) {
            //delete selected rows if its SerieGroup is also selected. 
            for (var i = 0; i < items.length; i++) {
                for (var j = 0; j < serieGroups.length; j++) {
                    if (!(items[i] instanceof serieGroup_1.SerieGroup) && items[i].getSerieGroup() == serieGroups[j]) {
                        //delete same element in alll arrays
                        var index = signalCalculations.indexOf(items[i]);
                        signalCalculations.splice(index, 1);
                        index = signalInputCalculations.indexOf(items[i]);
                        signalInputCalculations.splice(index, 1);
                        index = signalOutputCalculations.indexOf(items[i]);
                        signalOutputCalculations.splice(index, 1);
                        items.splice(i, 1);
                        i = -1;
                        break;
                    }
                }
            }
            //delete selected CalculationOutput if its CalculationData is also selected. 
            for (var i = 0; i < signalOutputCalculations.length; i++) {
                if (this.isSignalRepeated(signalCalculations, signalOutputCalculations[i].serie)) {
                    var index = items.indexOf(signalOutputCalculations[i]);
                    signalOutputCalculations.splice(i, 1);
                    items.splice(index, 1);
                    i = -1;
                }
            }
            //add input calculation data if calculation is selected
            for (var i = 0; i < signalCalculations.length; i++) {
                var inputSeries = signalCalculations[i].getInputCalculationData();
                if (signalCalculations[i].getOutputCalculationData()[0].serie.type != seriesType_1.SeriesType.timeSeries) { //Momentary solution. Next step: Export the whole YT formula
                    this.addInputElements(items, inputSeries);
                }
            }
            //add input calculation data if ouput calculation is selected 
            for (var i = 0; i < signalOutputCalculations.length; i++) {
                var calculation = signalOutputCalculations[i].parent.parent;
                var inputSeries = calculation.getInputCalculationData();
                if (signalOutputCalculations[i].serie.type != seriesType_1.SeriesType.timeSeries) { //Momentary solution. Next step: Export the whole YT formula
                    this.addInputElements(items, inputSeries);
                }
            }
            //delete repeated selected series (serie + same serie in input calculation)
            for (var i = 0; i < items.length; i++) {
                if (!(items[i] instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) && this.isSignalRepeated(signalInputCalculations, items[i].serie)) {
                    items.splice(i, 1);
                    i = -1;
                }
            }
            //create exportSerieGroups with the selected rows
            for (var i = 0; i < items.length; i++) {
                if (!(items[i] instanceof serieGroup_1.SerieGroup)) {
                    var parent_1 = items[i].getSerieGroup();
                    var newGroup = true;
                    for (var j = 0; j < groupElements.length; j++) {
                        if (parent_1.startTriggerTime == groupElements[j].startTriggerTime) {
                            newGroup = false;
                            groupElements[j].addSerie(items[i].serie);
                        }
                    }
                    if (newGroup) {
                        groupElements.push(new exportSerieGroup_1.ExportSerieGroup(parent_1.name, parent_1.startTriggerTime, items[i].serie));
                    }
                }
            }
        };
        /**
         * Returns true if a signal is repeated
         *
         * @private
         * @param {Array<any>} arrayOfItems
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof ExportHelper
         */
        ExportHelper.prototype.isSignalRepeated = function (arrayOfItems, serie) {
            for (var i = 0; i < arrayOfItems.length; i++) {
                if (arrayOfItems[i].serie == serie) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Add input series (if not selected) in XY or FFT formulas
         *
         * @private
         * @param {Array<any>} items
         * @param {Array<SignalManagerCalculationInputData>} inputSeries
         * @memberof ExportHelper
         */
        ExportHelper.prototype.addInputElements = function (items, inputSeries) {
            for (var j = 0; j < inputSeries.length; j++) {
                var isSelected = false;
                for (var a = 0; a < items.length; a++) {
                    if (inputSeries[j].serie == items[a].serie) {
                        isSelected = true;
                    }
                }
                if (!isSelected) {
                    items.push(inputSeries[j]);
                }
            }
        };
        /**
         * Returns true if selected element can be exported
         *
         * @param {*} item
         * @returns {boolean}
         * @memberof ExportHelper
         */
        ExportHelper.prototype.isElementExportable = function (item) {
            //SignalCategory selected
            if (item instanceof signalCategory_1.SignalCategory) {
                return false;
            }
            //Input data without valid signal is selected
            else if (item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData && item.serie == undefined) {
                return false;
            }
            //Name of Calculation selected
            else if (item.parent instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                return false;
            }
            //SerieContainer selected
            else if (!(item instanceof serieGroup_1.SerieGroup) && item.parent instanceof signalCategory_1.SignalCategory) {
                return false;
            }
            //Calculated signal is invalid
            else if ((item instanceof signalManagerCalculation_1.SignalManagerCalculation || item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) && (item.serie == undefined || item.serie.rawPointsValid == false)) {
                return false;
            }
            return true;
        };
        return ExportHelper;
    }());
    exports.ExportHelper = ExportHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3NpZ25hbE1hbmFnZXJXaWRnZXQvaGVscGVycy9leHBvcnRIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0E7UUFBQTtRQWtPQSxDQUFDO1FBaE9HOzs7Ozs7V0FNRztRQUNJLDRDQUFxQixHQUE1QixVQUE2QixRQUFRO1lBQ2pDLElBQUksV0FBVyxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFDMUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJLEtBQUssRUFBb0IsQ0FBQztZQUNsRCxJQUFJLGtCQUFrQixHQUFHLElBQUksS0FBSyxFQUE0QixDQUFDO1lBQy9ELElBQUksdUJBQXVCLEdBQUcsSUFBSSxLQUFLLEVBQXFDLENBQUM7WUFDN0UsSUFBSSx3QkFBd0IsR0FBRyxJQUFJLEtBQUssRUFBc0MsQ0FBQztZQUUvRSw2QkFBNkI7WUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM3QyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNWO2FBQ0o7WUFFRCwrREFBK0Q7WUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FB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SSxDQUFDLFVBQVUsRUFBRTtvQkFDYixLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM5QjthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDBDQUFtQixHQUExQixVQUEyQixJQUFJO1lBQzNCLHlCQUF5QjtZQUN6QixJQUFJLElBQUksWUFBWSwrQkFBYyxFQUFFO2dCQUNoQyxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELDZDQUE2QztpQkFDeEMsSUFBRyxJQUFJLFlBQVkscUVBQWlDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ2pGLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsOEJBQThCO2lCQUN6QixJQUFHLElBQUksQ0FBQyxNQUFNLFlBQVksbURBQXdCLEVBQUU7Z0JBQ3JELE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QseUJBQXlCO2lCQUNwQixJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksdUJBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLFlBQVksK0JBQWMsRUFBRTtnQkFDN0UsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCw4QkFBOEI7aUJBQ3pCLElBQUksQ0FBQyxJQUFJLFlBQVksbURBQXdCLElBQUksSUFBSSxZQUFZLHVFQUFrQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDMUssT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBbE9ELElBa09DO0lBRVEsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeHBvcnRTZXJpZUdyb3VwIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9leHBvcnRTZXJpZUdyb3VwXCI7XHJcbmltcG9ydCB7IFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXMvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxDYXRlZ29yeSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxDYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzL2Jhc2VTZXJpZXNcIjtcclxuXHJcbmNsYXNzIEV4cG9ydEhlbHBlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFycmF5IG9mIGV4cG9ydFNlcmllR3JvdXAgZWxlbWVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnRzXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8RXhwb3J0U2VyaWVHcm91cD59XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFeHBvcnRhYmxlRWxlbWVudHMoZWxlbWVudHMpOiBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPiB7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXBzID0gbmV3IEFycmF5PFNlcmllR3JvdXA+KCk7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICBsZXQgZ3JvdXBFbGVtZW50cyA9IG5ldyBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPigpO1xyXG4gICAgICAgIGxldCBzaWduYWxDYWxjdWxhdGlvbnMgPSBuZXcgQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uPigpO1xyXG4gICAgICAgIGxldCBzaWduYWxJbnB1dENhbGN1bGF0aW9ucyA9IG5ldyBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+KCk7XHJcbiAgICAgICAgbGV0IHNpZ25hbE91dHB1dENhbGN1bGF0aW9ucyA9IG5ldyBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhPigpO1xyXG5cclxuICAgICAgICAvL2RlbGV0ZSBub3QgZXhwb3J0YWJsZSBpdGVtc1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRWxlbWVudEV4cG9ydGFibGUoZWxlbWVudHNbaV0uaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGkgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9DbGFzc2lmeSBzZWxlY3RlZCBlbGVtZW50cyBpbnRvIGFycmF5cyBhY2NvcmRpbmcgdG8gaXRzIHR5cGUgXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpdGVtcy5wdXNoKGVsZW1lbnRzW2ldLml0ZW0pO1xyXG4gICAgICAgICAgICAvL1B1dCBhbGwgc2lnbmFsQ2FsY3VsYXRpb25zIHNlbGVjdGVkIGludG8gYW4gYXJyYXkgZm9yIGxhdGVyIGNoZWNrc1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudHNbaV0uaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgc2lnbmFsQ2FsY3VsYXRpb25zLnB1c2goZWxlbWVudHNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9QdXQgYWxsIHNpZ25hbElucHV0Q2FsY3VsYXRpb25zIHNlbGVjdGVkIGludG8gYW4gYXJyYXkgZm9yIGxhdGVyIGNoZWNrc1xyXG4gICAgICAgICAgICBlbHNlIGlmIChlbGVtZW50c1tpXS5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTaWduYWxSZXBlYXRlZChzaWduYWxJbnB1dENhbGN1bGF0aW9ucywgZWxlbWVudHNbaV0uaXRlbS5zZXJpZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbElucHV0Q2FsY3VsYXRpb25zLnB1c2goZWxlbWVudHNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGl0ZW1zLmluZGV4T2YoZWxlbWVudHNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1B1dCBhbGwgc2lnbmFsT3VwdXRDYWxjdWxhdGlvbnMgc2VsZWN0ZWQgaW50byBhbiBhcnJheSBmb3IgbGF0ZXJcclxuICAgICAgICAgICAgZWxzZSBpZiAoZWxlbWVudHNbaV0uaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEpIHtcclxuICAgICAgICAgICAgICAgIHNpZ25hbE91dHB1dENhbGN1bGF0aW9ucy5wdXNoKGVsZW1lbnRzW2ldLml0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnRzW2ldLml0ZW0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAvL1B1dCBhbGwgc2VyaWVncm91cHMgc2VsZWN0ZWQgaW50byBhbiBhcnJheVxyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllR3JvdXA6IFNlcmllR3JvdXAgPSBlbGVtZW50c1tpXS5pdGVtO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVHcm91cHMucHVzaChzZXJpZUdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0NvbnZlcnQgc2VsZWN0ZWQgU2VyaWVncm91cHMgdG8gZXhwb3J0U2VyaWVHcm91cHNcclxuICAgICAgICAgICAgICAgIGlmIChzZXJpZUdyb3VwLmdldENoaWxkcygpWzBdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwRWxlbWVudHMucHVzaChuZXcgRXhwb3J0U2VyaWVHcm91cChzZXJpZUdyb3VwLm5hbWUsIHNlcmllR3JvdXAuc3RhcnRUcmlnZ2VyVGltZSwgZWxlbWVudHNbaV0uaXRlbS5jaGlsZHNbMF0uc2VyaWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHNlcmllR3JvdXAuZ2V0Q2hpbGRzKCkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcmllR3JvdXAuZ2V0Q2hpbGRzKClbal0uc2VyaWUgIT0gdW5kZWZpbmVkICYmIHNlcmllR3JvdXAuZ2V0Q2hpbGRzKClbal0uc2VyaWUhLnJhd1BvaW50c1ZhbGlkID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGdyb3VwRWxlbWVudHMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwRWxlbWVudHNbaW5kZXhdLmFkZFNlcmllKHNlcmllR3JvdXAuZ2V0Q2hpbGRzKClbal0uc2VyaWUhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZEl0ZW1zKGl0ZW1zLCBzZXJpZUdyb3Vwcywgc2lnbmFsQ2FsY3VsYXRpb25zLCBzaWduYWxJbnB1dENhbGN1bGF0aW9ucywgc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zLCBncm91cEVsZW1lbnRzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGdyb3VwRWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGUgZHVwbGljYXRlZCBzZXJpZXMsIGludmFsaWQgc2VyaWVzIG9yIG5vdCBuZWVkIGl0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gaXRlbXNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U2VyaWVHcm91cD59IHNlcmllR3JvdXBzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbj59IHNpZ25hbENhbGN1bGF0aW9uc1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+fSBzaWduYWxJbnB1dENhbGN1bGF0aW9uc1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhPn0gc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zXHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SGVscGVyXHJcbiAgICAgKiBcclxuICAgICAqIFJldmlldyBMdWthcyBPYmVyc2FtZXI6XHJcbiAgICAgKiBUaGUgY3ljbG9tYXRpYyBjb21wbGV4aXR5IGlzIHRvbyBoaWdoLiBDb21tZW50aW5nIGlzIHdlbGwgZG9uZSwgd2hpY2ggbWFrZXMgaXQgZWFzaWVyIHRvIHVuZGVyc3RhbmQgd2hhdCB0aGUgY29kZSBpcyBzdXBwb3NlZCB0byBkby5cclxuICAgICAqIC0tPiBDb3JyZWN0aXZlIGFjdGlvbnMgbmVlZGVkIGFzIHNvb24gYXMgdGhpcyBhcmVhIG9mIGNvZGUgaXMgdG91Y2hlZCB0aGUgbmV4dCB0aW1lLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbHRlclNlbGVjdGVkSXRlbXMoaXRlbXM6IEFycmF5PGFueT4sIHNlcmllR3JvdXBzOiBBcnJheTxTZXJpZUdyb3VwPiwgc2lnbmFsQ2FsY3VsYXRpb25zOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24+LCBzaWduYWxJbnB1dENhbGN1bGF0aW9uczogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPiwgc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhPiwgZ3JvdXBFbGVtZW50czogQXJyYXk8RXhwb3J0U2VyaWVHcm91cD4pIHtcclxuICAgICAgICAvL2RlbGV0ZSBzZWxlY3RlZCByb3dzIGlmIGl0cyBTZXJpZUdyb3VwIGlzIGFsc28gc2VsZWN0ZWQuIFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZXJpZUdyb3Vwcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoaXRlbXNbaV0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwKSAmJiBpdGVtc1tpXS5nZXRTZXJpZUdyb3VwKCkgPT0gc2VyaWVHcm91cHNbal0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSBzYW1lIGVsZW1lbnQgaW4gYWxsbCBhcnJheXNcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBzaWduYWxDYWxjdWxhdGlvbnMuaW5kZXhPZihpdGVtc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsQ2FsY3VsYXRpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBzaWduYWxJbnB1dENhbGN1bGF0aW9ucy5pbmRleE9mKGl0ZW1zW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBzaWduYWxJbnB1dENhbGN1bGF0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zLmluZGV4T2YoaXRlbXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbE91dHB1dENhbGN1bGF0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZGVsZXRlIHNlbGVjdGVkIENhbGN1bGF0aW9uT3V0cHV0IGlmIGl0cyBDYWxjdWxhdGlvbkRhdGEgaXMgYWxzbyBzZWxlY3RlZC4gXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaWduYWxSZXBlYXRlZChzaWduYWxDYWxjdWxhdGlvbnMsIHNpZ25hbE91dHB1dENhbGN1bGF0aW9uc1tpXS5zZXJpZSEpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBpdGVtcy5pbmRleE9mKHNpZ25hbE91dHB1dENhbGN1bGF0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIGkgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGQgaW5wdXQgY2FsY3VsYXRpb24gZGF0YSBpZiBjYWxjdWxhdGlvbiBpcyBzZWxlY3RlZFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnbmFsQ2FsY3VsYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dFNlcmllczogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPiA9IHNpZ25hbENhbGN1bGF0aW9uc1tpXS5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgICAgICBpZiAoc2lnbmFsQ2FsY3VsYXRpb25zW2ldLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpWzBdLnNlcmllIS50eXBlICE9IFNlcmllc1R5cGUudGltZVNlcmllcykgeyAvL01vbWVudGFyeSBzb2x1dGlvbi4gTmV4dCBzdGVwOiBFeHBvcnQgdGhlIHdob2xlIFlUIGZvcm11bGFcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSW5wdXRFbGVtZW50cyhpdGVtcywgaW5wdXRTZXJpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2FkZCBpbnB1dCBjYWxjdWxhdGlvbiBkYXRhIGlmIG91cHV0IGNhbGN1bGF0aW9uIGlzIHNlbGVjdGVkIFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbiA9IHNpZ25hbE91dHB1dENhbGN1bGF0aW9uc1tpXS5wYXJlbnQhLnBhcmVudCEgYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uO1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRTZXJpZXM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4gPSBjYWxjdWxhdGlvbi5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgICAgICBpZiAoc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zW2ldLnNlcmllIS50eXBlICE9IFNlcmllc1R5cGUudGltZVNlcmllcykgeyAvL01vbWVudGFyeSBzb2x1dGlvbi4gTmV4dCBzdGVwOiBFeHBvcnQgdGhlIHdob2xlIFlUIGZvcm11bGFcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSW5wdXRFbGVtZW50cyhpdGVtcywgaW5wdXRTZXJpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2RlbGV0ZSByZXBlYXRlZCBzZWxlY3RlZCBzZXJpZXMgKHNlcmllICsgc2FtZSBzZXJpZSBpbiBpbnB1dCBjYWxjdWxhdGlvbilcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghKGl0ZW1zW2ldIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKSAmJiB0aGlzLmlzU2lnbmFsUmVwZWF0ZWQoc2lnbmFsSW5wdXRDYWxjdWxhdGlvbnMsIGl0ZW1zW2ldLnNlcmllKSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgaSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NyZWF0ZSBleHBvcnRTZXJpZUdyb3VwcyB3aXRoIHRoZSBzZWxlY3RlZCByb3dzXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIShpdGVtc1tpXSBpbnN0YW5jZW9mIFNlcmllR3JvdXApKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50OiBTZXJpZUdyb3VwID0gaXRlbXNbaV0uZ2V0U2VyaWVHcm91cCgpIGFzIFNlcmllR3JvdXA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3R3JvdXAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBncm91cEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5zdGFydFRyaWdnZXJUaW1lID09IGdyb3VwRWxlbWVudHNbal0uc3RhcnRUcmlnZ2VyVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cEVsZW1lbnRzW2pdLmFkZFNlcmllKGl0ZW1zW2ldLnNlcmllISlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3R3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cEVsZW1lbnRzLnB1c2gobmV3IEV4cG9ydFNlcmllR3JvdXAocGFyZW50Lm5hbWUsIHBhcmVudC5zdGFydFRyaWdnZXJUaW1lLCBpdGVtc1tpXS5zZXJpZSEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBhIHNpZ25hbCBpcyByZXBlYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGFycmF5T2ZJdGVtc1xyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNTaWduYWxSZXBlYXRlZChhcnJheU9mSXRlbXM6IEFycmF5PGFueT4sIHNlcmllOiBCYXNlU2VyaWVzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5T2ZJdGVtc1tpXS5zZXJpZSA9PSBzZXJpZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGlucHV0IHNlcmllcyAoaWYgbm90IHNlbGVjdGVkKSBpbiBYWSBvciBGRlQgZm9ybXVsYXMgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gaXRlbXNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPn0gaW5wdXRTZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRJbnB1dEVsZW1lbnRzKGl0ZW1zOiBBcnJheTxhbnk+LCBpbnB1dFNlcmllczogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPikge1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5wdXRTZXJpZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IGlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCBpdGVtcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0U2VyaWVzW2pdLnNlcmllID09IGl0ZW1zW2FdLnNlcmllKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGlucHV0U2VyaWVzW2pdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBzZWxlY3RlZCBlbGVtZW50IGNhbiBiZSBleHBvcnRlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gaXRlbVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc0VsZW1lbnRFeHBvcnRhYmxlKGl0ZW0pOiBib29sZWFuIHtcclxuICAgICAgICAvL1NpZ25hbENhdGVnb3J5IHNlbGVjdGVkXHJcbiAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vSW5wdXQgZGF0YSB3aXRob3V0IHZhbGlkIHNpZ25hbCBpcyBzZWxlY3RlZFxyXG4gICAgICAgIGVsc2UgaWYoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSAmJiBpdGVtLnNlcmllID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9OYW1lIG9mIENhbGN1bGF0aW9uIHNlbGVjdGVkXHJcbiAgICAgICAgZWxzZSBpZihpdGVtLnBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vU2VyaWVDb250YWluZXIgc2VsZWN0ZWRcclxuICAgICAgICBlbHNlIGlmICghKGl0ZW0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwKSAmJiBpdGVtLnBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbENhdGVnb3J5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9DYWxjdWxhdGVkIHNpZ25hbCBpcyBpbnZhbGlkXHJcbiAgICAgICAgZWxzZSBpZiAoKGl0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfHwgaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEpICYmIChpdGVtLnNlcmllID09IHVuZGVmaW5lZCB8fCBpdGVtLnNlcmllLnJhd1BvaW50c1ZhbGlkID09IGZhbHNlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgRXhwb3J0SGVscGVyIH07Il19