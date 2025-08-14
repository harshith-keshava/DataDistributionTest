define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Container for all necessary information to pick the correct conversion for each version of setting and package data
     *
     * @class PackageConversionInfoContainer
     */
    var PackageConversionInfoContainer = /** @class */ (function () {
        /**
         * Creates an instance of PackageConversionInfoContainer.
         *
         * @memberof PackageConversionInfoContainer
         */
        function PackageConversionInfoContainer() {
            this.conversions = new Array();
        }
        /**
         * Adds a set of conversion and the version numbers supported on each side of the conversion.
         *
         * @param {string} settingsVersion The settings version supported by this set of conversion.
         * @param {number} packageVersion The package version supported by this set of conversion.
         * @param {Array<IPackageEntryConversion>} conversions The list of conversions between setting and package format.
         * @memberof PackageConversionInfoContainer
         */
        PackageConversionInfoContainer.prototype.addConversion = function (settingsVersion, packageVersion, conversions) {
            this.conversions.push({
                settingsVersion: settingsVersion,
                packageVersion: packageVersion,
                conversions: conversions
            });
        };
        /**
         * Gets the most recent set of conversions that are compatible for this settings version.
         *
         * @param {string} settingsVersion
         * @returns {PackageConversionInfo}
         * @memberof PackageConversionInfoContainer
         */
        PackageConversionInfoContainer.prototype.getNewestConversionForSettingsVersion = function (settingsVersion) {
            var candidates = this.conversions.filter(function (conversionInfo) { return conversionInfo.settingsVersion === settingsVersion; });
            var reducer = { settingsVersion: "-1.0", packageVersion: -1, conversions: [] }; // intialize a reducer
            var newest = candidates.reduce(function (prev, current) { return (current.packageVersion > prev.packageVersion) ? current : prev; }, reducer);
            if (reducer === newest) {
                throw new Error("no package conversion info found");
            }
            return newest;
        };
        /**
         * Gets the most recent set of conversions that are compatible for this package version.
         *
         * @param {number} packageVersion
         * @returns {PackageConversionInfo}
         * @memberof PackageConversionInfoContainer
         */
        PackageConversionInfoContainer.prototype.getNewestConversionForPackageVersion = function (packageVersion) {
            var candidates = this.conversions.filter(function (conversionInfo) { return conversionInfo.packageVersion === packageVersion; });
            var reducer = { settingsVersion: "-1.0", packageVersion: -1, conversions: [] };
            var newest = candidates.reduce(function (prev, current) { return (Number(current.settingsVersion) > Number(prev.settingsVersion)) ? current : prev; }, reducer);
            if (reducer === newest) {
                throw new Error("no package conversion info found");
            }
            return newest;
        };
        /**
         * Gets the overall most recent supported settings version in this container.
         *
         * @returns {string}
         * @memberof PackageConversionInfoContainer
         */
        PackageConversionInfoContainer.prototype.getMaxSupportedSettingsVersion = function () {
            var reducer = "-1.0";
            return this.conversions.reduce(function (prev, curr) { return (Number(curr.settingsVersion) > Number(prev)) ? curr.settingsVersion : prev; }, reducer);
        };
        return PackageConversionInfoContainer;
    }());
    exports.PackageConversionInfoContainer = PackageConversionInfoContainer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUNvbnZlcnNpb25JbmZvQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vcGFja2FnZUNvbnZlcnNpb25JbmZvQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBOzs7O09BSUc7SUFDSDtRQUtDOzs7O1dBSUc7UUFDSDtZQUNDLElBQUksQ0FBQyxXQUFXLEdBQUUsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMvQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLHNEQUFhLEdBQXBCLFVBQXFCLGVBQXVCLEVBQUUsY0FBc0IsRUFBRSxXQUEyQztZQUNoSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDckIsZUFBZSxFQUFFLGVBQWU7Z0JBQ2hDLGNBQWMsRUFBRSxjQUFjO2dCQUM5QixXQUFXLEVBQUUsV0FBVzthQUN4QixDQUFDLENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksOEVBQXFDLEdBQTVDLFVBQTZDLGVBQXVCO1lBRW5FLElBQUksVUFBVSxHQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsY0FBYyxJQUFNLE9BQU8sY0FBYyxDQUFDLGVBQWUsS0FBSyxlQUFlLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUMxSCxJQUFJLE9BQU8sR0FBMEIsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFDLENBQUUsQ0FBQyxzQkFBc0I7WUFDN0gsSUFBSSxNQUFNLEdBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxPQUFPLElBQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsQ0FBQTtZQUVuSSxJQUFHLE9BQU8sS0FBSyxNQUFNLEVBQUU7Z0JBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQTthQUNuRDtZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2YsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDZFQUFvQyxHQUEzQyxVQUE0QyxjQUFzQjtZQUVqRSxJQUFJLFVBQVUsR0FBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFDLGNBQWMsSUFBTSxPQUFPLGNBQWMsQ0FBQyxjQUFjLEtBQUssY0FBYyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7WUFDeEgsSUFBSSxPQUFPLEdBQTBCLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBQyxDQUFFO1lBQ3RHLElBQUksTUFBTSxHQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLEVBQUUsT0FBTyxJQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLENBQUE7WUFFckosSUFBRyxPQUFPLEtBQUssTUFBTSxFQUFFO2dCQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUE7YUFDbkQ7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNmLENBQUM7UUFFRTs7Ozs7V0FLQTtRQUNJLHVFQUE4QixHQUFyQztZQUNPLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUNyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLElBQUksSUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25KLENBQUM7UUFFTCxxQ0FBQztJQUFELENBQUMsQUFqRkQsSUFpRkM7SUFFUSx3RUFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUGFja2FnZUVudHJ5Q29udmVyc2lvbiB9IGZyb20gXCIuL2ludGVyZmFjZS9wYWNrYWdlRW50cnlDb252ZXJzaW9uSW50ZXJmYWNlXCI7XHJcblxyXG4vL3R5cGUgYWxpYXMgZm9yIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCBpbmZvcm1hdGlvbiBuZWNlc3NhcnkgdG8gcGVyZm9ybSBhIGNvbnZlcnNpb24gb2YgYW4gZW50cnkgaW4gSVBhY2thZ2UgZGF0YS5cclxudHlwZSBQYWNrYWdlQ29udmVyc2lvbkluZm8gPSB7IHNldHRpbmdzVmVyc2lvbjogc3RyaW5nLCBwYWNrYWdlVmVyc2lvbjogbnVtYmVyLCBjb252ZXJzaW9uczogQXJyYXk8SVBhY2thZ2VFbnRyeUNvbnZlcnNpb24+fTtcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBuZWNlc3NhcnkgaW5mb3JtYXRpb24gdG8gcGljayB0aGUgY29ycmVjdCBjb252ZXJzaW9uIGZvciBlYWNoIHZlcnNpb24gb2Ygc2V0dGluZyBhbmQgcGFja2FnZSBkYXRhXHJcbiAqXHJcbiAqIEBjbGFzcyBQYWNrYWdlQ29udmVyc2lvbkluZm9Db250YWluZXJcclxuICovXHJcbmNsYXNzIFBhY2thZ2VDb252ZXJzaW9uSW5mb0NvbnRhaW5lciB7XHJcblxyXG5cdC8vY29udGFpbnMgYWxsIGtub3duIGNvbnZlcnNpb25zXHJcblx0cHJpdmF0ZSBjb252ZXJzaW9uczogQXJyYXk8UGFja2FnZUNvbnZlcnNpb25JbmZvPjtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQYWNrYWdlQ29udmVyc2lvbkluZm9Db250YWluZXIuXHJcblx0ICogXHJcblx0ICogQG1lbWJlcm9mIFBhY2thZ2VDb252ZXJzaW9uSW5mb0NvbnRhaW5lclxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5jb252ZXJzaW9ucz0gbmV3IEFycmF5KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgc2V0IG9mIGNvbnZlcnNpb24gYW5kIHRoZSB2ZXJzaW9uIG51bWJlcnMgc3VwcG9ydGVkIG9uIGVhY2ggc2lkZSBvZiB0aGUgY29udmVyc2lvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzZXR0aW5nc1ZlcnNpb24gVGhlIHNldHRpbmdzIHZlcnNpb24gc3VwcG9ydGVkIGJ5IHRoaXMgc2V0IG9mIGNvbnZlcnNpb24uXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBhY2thZ2VWZXJzaW9uIFRoZSBwYWNrYWdlIHZlcnNpb24gc3VwcG9ydGVkIGJ5IHRoaXMgc2V0IG9mIGNvbnZlcnNpb24uXHJcblx0ICogQHBhcmFtIHtBcnJheTxJUGFja2FnZUVudHJ5Q29udmVyc2lvbj59IGNvbnZlcnNpb25zIFRoZSBsaXN0IG9mIGNvbnZlcnNpb25zIGJldHdlZW4gc2V0dGluZyBhbmQgcGFja2FnZSBmb3JtYXQuXHJcblx0ICogQG1lbWJlcm9mIFBhY2thZ2VDb252ZXJzaW9uSW5mb0NvbnRhaW5lclxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGRDb252ZXJzaW9uKHNldHRpbmdzVmVyc2lvbjogc3RyaW5nLCBwYWNrYWdlVmVyc2lvbjogbnVtYmVyLCBjb252ZXJzaW9uczogQXJyYXk8SVBhY2thZ2VFbnRyeUNvbnZlcnNpb24+KTogdm9pZCB7XHJcblx0XHR0aGlzLmNvbnZlcnNpb25zLnB1c2goe1xyXG5cdFx0XHRzZXR0aW5nc1ZlcnNpb246IHNldHRpbmdzVmVyc2lvbixcclxuXHRcdFx0cGFja2FnZVZlcnNpb246IHBhY2thZ2VWZXJzaW9uLFxyXG5cdFx0XHRjb252ZXJzaW9uczogY29udmVyc2lvbnNcdFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBtb3N0IHJlY2VudCBzZXQgb2YgY29udmVyc2lvbnMgdGhhdCBhcmUgY29tcGF0aWJsZSBmb3IgdGhpcyBzZXR0aW5ncyB2ZXJzaW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNldHRpbmdzVmVyc2lvblxyXG5cdCAqIEByZXR1cm5zIHtQYWNrYWdlQ29udmVyc2lvbkluZm99XHJcblx0ICogQG1lbWJlcm9mIFBhY2thZ2VDb252ZXJzaW9uSW5mb0NvbnRhaW5lclxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXROZXdlc3RDb252ZXJzaW9uRm9yU2V0dGluZ3NWZXJzaW9uKHNldHRpbmdzVmVyc2lvbjogc3RyaW5nKTogUGFja2FnZUNvbnZlcnNpb25JbmZvIHtcclxuXHRcdFxyXG5cdFx0bGV0IGNhbmRpZGF0ZXM9IHRoaXMuY29udmVyc2lvbnMuZmlsdGVyKChjb252ZXJzaW9uSW5mbykgPT4ge3JldHVybiBjb252ZXJzaW9uSW5mby5zZXR0aW5nc1ZlcnNpb24gPT09IHNldHRpbmdzVmVyc2lvbjt9KTtcclxuXHRcdGxldCByZWR1Y2VyOiBQYWNrYWdlQ29udmVyc2lvbkluZm8gPSB7IHNldHRpbmdzVmVyc2lvbjogXCItMS4wXCIsIHBhY2thZ2VWZXJzaW9uOiAtMSwgY29udmVyc2lvbnM6IFtdfSA7IC8vIGludGlhbGl6ZSBhIHJlZHVjZXJcclxuXHRcdGxldCBuZXdlc3Q9IGNhbmRpZGF0ZXMucmVkdWNlKChwcmV2LCBjdXJyZW50KSA9PiB7cmV0dXJuIChjdXJyZW50LnBhY2thZ2VWZXJzaW9uID4gcHJldi5wYWNrYWdlVmVyc2lvbikgPyBjdXJyZW50IDogcHJldiB9LHJlZHVjZXIpXHJcblxyXG5cdFx0aWYocmVkdWNlciA9PT0gbmV3ZXN0KSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIHBhY2thZ2UgY29udmVyc2lvbiBpbmZvIGZvdW5kXCIpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ld2VzdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIG1vc3QgcmVjZW50IHNldCBvZiBjb252ZXJzaW9ucyB0aGF0IGFyZSBjb21wYXRpYmxlIGZvciB0aGlzIHBhY2thZ2UgdmVyc2lvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwYWNrYWdlVmVyc2lvblxyXG5cdCAqIEByZXR1cm5zIHtQYWNrYWdlQ29udmVyc2lvbkluZm99XHJcblx0ICogQG1lbWJlcm9mIFBhY2thZ2VDb252ZXJzaW9uSW5mb0NvbnRhaW5lclxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXROZXdlc3RDb252ZXJzaW9uRm9yUGFja2FnZVZlcnNpb24ocGFja2FnZVZlcnNpb246IG51bWJlcik6IFBhY2thZ2VDb252ZXJzaW9uSW5mbyB7XHJcblxyXG5cdFx0bGV0IGNhbmRpZGF0ZXM9IHRoaXMuY29udmVyc2lvbnMuZmlsdGVyKChjb252ZXJzaW9uSW5mbykgPT4ge3JldHVybiBjb252ZXJzaW9uSW5mby5wYWNrYWdlVmVyc2lvbiA9PT0gcGFja2FnZVZlcnNpb247fSk7XHJcblx0XHRsZXQgcmVkdWNlcjogUGFja2FnZUNvbnZlcnNpb25JbmZvID0geyBzZXR0aW5nc1ZlcnNpb246IFwiLTEuMFwiLCBwYWNrYWdlVmVyc2lvbjogLTEsIGNvbnZlcnNpb25zOiBbXX0gO1xyXG5cdFx0bGV0IG5ld2VzdD0gY2FuZGlkYXRlcy5yZWR1Y2UoKHByZXYsIGN1cnJlbnQpID0+IHtyZXR1cm4gKE51bWJlcihjdXJyZW50LnNldHRpbmdzVmVyc2lvbikgPiBOdW1iZXIocHJldi5zZXR0aW5nc1ZlcnNpb24pKSA/IGN1cnJlbnQgOiBwcmV2IH0scmVkdWNlcilcclxuXHJcblx0XHRpZihyZWR1Y2VyID09PSBuZXdlc3QpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm8gcGFja2FnZSBjb252ZXJzaW9uIGluZm8gZm91bmRcIilcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3ZXN0O1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuXHQgKiBHZXRzIHRoZSBvdmVyYWxsIG1vc3QgcmVjZW50IHN1cHBvcnRlZCBzZXR0aW5ncyB2ZXJzaW9uIGluIHRoaXMgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge3N0cmluZ31cclxuXHQgKiBAbWVtYmVyb2YgUGFja2FnZUNvbnZlcnNpb25JbmZvQ29udGFpbmVyXHJcblx0ICovXHJcblx0cHVibGljIGdldE1heFN1cHBvcnRlZFNldHRpbmdzVmVyc2lvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCByZWR1Y2VyID0gXCItMS4wXCI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udmVyc2lvbnMucmVkdWNlKChwcmV2LCBjdXJyKSA9PiB7cmV0dXJuIChOdW1iZXIoY3Vyci5zZXR0aW5nc1ZlcnNpb24pID4gTnVtYmVyKHByZXYpKSA/IGN1cnIuc2V0dGluZ3NWZXJzaW9uIDogcHJldiB9LCByZWR1Y2VyKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IFBhY2thZ2VDb252ZXJzaW9uSW5mb0NvbnRhaW5lciB9Il19