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
define(["require", "exports", "../../../common/packageConversion/basePackageConverter", "../../../common/packageConversion/enum/objectTypeEnum", "../../../common/packageConversion/arrayConversion", "../../../common/packageConversion/subPackageConversion", "../../../common/packageConversion/generateFromConversion", "./seriesProvider", "../../../common/packageConversion/packageConversionController", "../../../common/packageConversion/package"], function (require, exports, basePackageConverter_1, objectTypeEnum_1, arrayConversion_1, subPackageConversion_1, generateFromConversion_1, seriesProvider_1, packageConversionController_1, package_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The package converter handling the series provider setting.
     *
     * @class SeriesProviderPackageConverter
     * @extends {BasePackageConverter}
     */
    var SeriesProviderPackageConverter = /** @class */ (function (_super) {
        __extends(SeriesProviderPackageConverter, _super);
        /**
         * Creates an instance of SeriesProviderPackageConverter.
         *
         * @memberof SeriesProviderPackageConverter
         */
        function SeriesProviderPackageConverter() {
            var _this = _super.call(this, objectTypeEnum_1.ObjectType.SERIESPROVIDER, "SeriesProvider") || this;
            _this.conversionInfoContainer.addConversion("1.0", 1, [
                new arrayConversion_1.ArrayConversion(["series"], ["series"], new subPackageConversion_1.SubPackageConversion([], [])),
                new generateFromConversion_1.GenerateFromConversion(["seriesIds"], ["series"], _this.generateSeriesIds)
            ]);
            return _this;
        }
        /**
         * Function for generating seriesIds out of the serie packages identified by given package link ids.
         *
         * @private
         * @param {Array<any>} data
         * @returns {Array<any>}
         * @memberof SeriesProviderPackageConverter
         */
        SeriesProviderPackageConverter.prototype.generateSeriesIds = function (data) {
            //get instance of package conversion controller
            var controller = packageConversionController_1.PackageConversionController.getInstance();
            var newData = data.map(function (linkIds) {
                //get packages identified by link ids
                var packageArray = linkIds.map(function (linkId) { return controller.getPackageById(linkId); });
                //remove invalid packages
                packageArray = packageArray.filter(function (packet) { return !package_1.Package.isInvalid(packet); });
                //get ids of series
                var idArray = packageArray.map(function (packet) {
                    var id = package_1.Package.getPackageKeyData(packet, "id");
                    return (id !== undefined) ? id : "";
                });
                //remove invalid ids
                idArray = idArray.filter(function (id) { return id !== ""; });
                //get series provider key
                var seriesProviderComponentID = "SeriesProvider";
                //generate series ids of series
                var seriesIdArray = idArray.map(function (id) { return seriesProvider_1.SeriesProvider.getSeriesPersistingIdForComponent(id, seriesProviderComponentID); });
                return seriesIdArray;
            });
            return newData;
        };
        return SeriesProviderPackageConverter;
    }(basePackageConverter_1.BasePackageConverter));
    exports.SeriesProviderPackageConverter = SeriesProviderPackageConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzUHJvdmlkZXJQYWNrYWdlQ29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVyUGFja2FnZUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7Ozs7O09BS0c7SUFDSDtRQUE2QyxrREFBb0I7UUFFN0Q7Ozs7V0FJRztRQUNIO1lBQUEsWUFDSSxrQkFBTSwyQkFBVSxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxTQU1yRDtZQUpHLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDakQsSUFBSSxpQ0FBZSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLDJDQUFvQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDN0UsSUFBSSwrQ0FBc0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSSxDQUFDLGlCQUFpQixDQUFDO2FBQ2hGLENBQUMsQ0FBQzs7UUFDUCxDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNLLDBEQUFpQixHQUF6QixVQUEwQixJQUFnQjtZQUV0QywrQ0FBK0M7WUFDL0MsSUFBSSxVQUFVLEdBQUcseURBQTJCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFM0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQXNCO2dCQUUxQyxxQ0FBcUM7Z0JBQ3JDLElBQUksWUFBWSxHQUFvQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTSxJQUFPLE9BQU8sVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUzRyx5QkFBeUI7Z0JBQ3pCLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxJQUFPLE9BQU8sQ0FBQyxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV2RixtQkFBbUI7Z0JBQ25CLElBQUksT0FBTyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO29CQUVsQyxJQUFJLEVBQUUsR0FBdUIsaUJBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3JFLE9BQU8sQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN4QyxDQUFDLENBQUMsQ0FBQztnQkFFSCxvQkFBb0I7Z0JBQ3BCLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUMsRUFBRSxJQUFPLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV4RCx5QkFBeUI7Z0JBQ3pCLElBQUkseUJBQXlCLEdBQVcsZ0JBQWdCLENBQUM7Z0JBRXpELCtCQUErQjtnQkFDL0IsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQUUsSUFBTyxPQUFPLCtCQUFjLENBQUMsaUNBQWlDLENBQUMsRUFBRSxFQUFFLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFckksT0FBTyxhQUFhLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBQ0wscUNBQUM7SUFBRCxDQUFDLEFBM0RELENBQTZDLDJDQUFvQixHQTJEaEU7SUFFUSx3RUFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlUGFja2FnZUNvbnZlcnRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vYmFzZVBhY2thZ2VDb252ZXJ0ZXJcIjtcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9vYmplY3RUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBBcnJheUNvbnZlcnNpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2FycmF5Q29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBTdWJQYWNrYWdlQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vc3ViUGFja2FnZUNvbnZlcnNpb25cIjtcclxuaW1wb3J0IHsgR2VuZXJhdGVGcm9tQ29udmVyc2lvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZ2VuZXJhdGVGcm9tQ29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuL3Nlcmllc1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vcGFja2FnZUNvbnZlcnNpb25Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7IElQYWNrYWdlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9pbnRlcmZhY2UvcGFja2FnZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQYWNrYWdlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9wYWNrYWdlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBwYWNrYWdlIGNvbnZlcnRlciBoYW5kbGluZyB0aGUgc2VyaWVzIHByb3ZpZGVyIHNldHRpbmcuXHJcbiAqXHJcbiAqIEBjbGFzcyBTZXJpZXNQcm92aWRlclBhY2thZ2VDb252ZXJ0ZXJcclxuICogQGV4dGVuZHMge0Jhc2VQYWNrYWdlQ29udmVydGVyfVxyXG4gKi9cclxuY2xhc3MgU2VyaWVzUHJvdmlkZXJQYWNrYWdlQ29udmVydGVyIGV4dGVuZHMgQmFzZVBhY2thZ2VDb252ZXJ0ZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZXJpZXNQcm92aWRlclBhY2thZ2VDb252ZXJ0ZXIuXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclBhY2thZ2VDb252ZXJ0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcihPYmplY3RUeXBlLlNFUklFU1BST1ZJREVSLCBcIlNlcmllc1Byb3ZpZGVyXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29udmVyc2lvbkluZm9Db250YWluZXIuYWRkQ29udmVyc2lvbihcIjEuMFwiLCAxLCBbXHJcbiAgICAgICAgICAgIG5ldyBBcnJheUNvbnZlcnNpb24oW1wic2VyaWVzXCJdLCBbXCJzZXJpZXNcIl0sIG5ldyBTdWJQYWNrYWdlQ29udmVyc2lvbihbXSwgW10pKSxcclxuICAgICAgICAgICAgbmV3IEdlbmVyYXRlRnJvbUNvbnZlcnNpb24oW1wic2VyaWVzSWRzXCJdLCBbXCJzZXJpZXNcIl0sIHRoaXMuZ2VuZXJhdGVTZXJpZXNJZHMpXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gZm9yIGdlbmVyYXRpbmcgc2VyaWVzSWRzIG91dCBvZiB0aGUgc2VyaWUgcGFja2FnZXMgaWRlbnRpZmllZCBieSBnaXZlbiBwYWNrYWdlIGxpbmsgaWRzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyUGFja2FnZUNvbnZlcnRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdlbmVyYXRlU2VyaWVzSWRzKGRhdGE6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcclxuXHJcbiAgICAgICAgLy9nZXQgaW5zdGFuY2Ugb2YgcGFja2FnZSBjb252ZXJzaW9uIGNvbnRyb2xsZXJcclxuICAgICAgICBsZXQgY29udHJvbGxlciA9IFBhY2thZ2VDb252ZXJzaW9uQ29udHJvbGxlci5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgICAgICBsZXQgbmV3RGF0YSA9IGRhdGEubWFwKChsaW5rSWRzOiBBcnJheTxudW1iZXI+KTogQXJyYXk8c3RyaW5nPiA9PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vZ2V0IHBhY2thZ2VzIGlkZW50aWZpZWQgYnkgbGluayBpZHNcclxuICAgICAgICAgICAgbGV0IHBhY2thZ2VBcnJheTogQXJyYXk8SVBhY2thZ2U+ID0gbGlua0lkcy5tYXAoKGxpbmtJZCkgPT4geyByZXR1cm4gY29udHJvbGxlci5nZXRQYWNrYWdlQnlJZChsaW5rSWQpOyB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICAvL3JlbW92ZSBpbnZhbGlkIHBhY2thZ2VzXHJcbiAgICAgICAgICAgIHBhY2thZ2VBcnJheSA9IHBhY2thZ2VBcnJheS5maWx0ZXIoKHBhY2tldCkgPT4geyByZXR1cm4gIVBhY2thZ2UuaXNJbnZhbGlkKHBhY2tldCk7IH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vZ2V0IGlkcyBvZiBzZXJpZXNcclxuICAgICAgICAgICAgbGV0IGlkQXJyYXkgPSBwYWNrYWdlQXJyYXkubWFwKChwYWNrZXQpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGlkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBQYWNrYWdlLmdldFBhY2thZ2VLZXlEYXRhKHBhY2tldCwgXCJpZFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoaWQgIT09IHVuZGVmaW5lZCkgPyBpZCA6IFwiXCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vcmVtb3ZlIGludmFsaWQgaWRzXHJcbiAgICAgICAgICAgIGlkQXJyYXkgPSBpZEFycmF5LmZpbHRlcigoaWQpID0+IHsgcmV0dXJuIGlkICE9PSBcIlwiOyB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICAvL2dldCBzZXJpZXMgcHJvdmlkZXIga2V5XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNQcm92aWRlckNvbXBvbmVudElEOiBzdHJpbmcgPSBcIlNlcmllc1Byb3ZpZGVyXCI7XHJcbiAgICBcclxuICAgICAgICAgICAgLy9nZW5lcmF0ZSBzZXJpZXMgaWRzIG9mIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzSWRBcnJheSA9IGlkQXJyYXkubWFwKChpZCkgPT4geyByZXR1cm4gU2VyaWVzUHJvdmlkZXIuZ2V0U2VyaWVzUGVyc2lzdGluZ0lkRm9yQ29tcG9uZW50KGlkLCBzZXJpZXNQcm92aWRlckNvbXBvbmVudElEKTsgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHNlcmllc0lkQXJyYXk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdEYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBTZXJpZXNQcm92aWRlclBhY2thZ2VDb252ZXJ0ZXIgfSJdfQ==