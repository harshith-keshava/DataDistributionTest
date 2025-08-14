define(["require", "exports", "./themeProvider"], function (require, exports, themeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ViewType;
    (function (ViewType) {
        ViewType[ViewType["Default"] = 0] = "Default";
        ViewType[ViewType["Common"] = 1] = "Common";
        ViewType[ViewType["Analysis"] = 2] = "Analysis";
        ViewType[ViewType["Configuration"] = 3] = "Configuration";
        ViewType[ViewType["Overview"] = 4] = "Overview";
        ViewType[ViewType["User"] = 5] = "User";
        ViewType[ViewType["SideBarTab"] = 6] = "SideBarTab";
        ViewType[ViewType["DriveLog"] = 7] = "DriveLog";
    })(ViewType || (ViewType = {}));
    exports.ViewType = ViewType;
    /**
     *
     *
     * @class ViewTypeProvider
     */
    var ViewTypeProvider = /** @class */ (function () {
        function ViewTypeProvider() {
            this._iconPathList = {};
            /**
             * Maps viewType to its icon Css Class name
             *
             * @private
             * @type {Map<ViewType, string>}
             * @memberof ViewTypeProvider
             */
            this._viewTypeIconClassMap = new Map([
                [ViewType.Default, ""],
                [ViewType.Common, "iconComponentView"],
                [ViewType.Analysis, "iconTraceView"],
                [ViewType.Configuration, "iconTraceConfigurationView"],
                [ViewType.Overview, "iconOverviewPage"],
                [ViewType.User, "iconUser"],
                [ViewType.SideBarTab, ""],
                [ViewType.DriveLog, "iconLoggerView"]
            ]);
        }
        ViewTypeProvider.getInstance = function () {
            if (!ViewTypeProvider.instance) {
                ViewTypeProvider.instance = new ViewTypeProvider();
                // ... any one time initialization goes here ...
                this.instance.initIconPathList();
            }
            return ViewTypeProvider.instance;
        };
        /**
         * Returns the componentType for the given viewType
         *
         * @param {ViewType} viewType
         * @returns {string}
         * @memberof ViewTypeProvider
         */
        ViewTypeProvider.prototype.getComponentTypeForViewType = function (viewType) {
            if (viewType == ViewType.Analysis) {
                return "TraceViewWidget";
            }
            else if (viewType == ViewType.Configuration) {
                return "TraceConfigurationViewWidget";
            }
            else if (viewType == ViewType.Common) {
                return "ComponentViewWidget";
            }
            else if (viewType == ViewType.DriveLog) {
                return "LoggerWidget";
            }
            return "";
        };
        /**
         * Returns the default component id for the given view type
         *
         * @param {ViewType} viewType
         * @returns {string}
         * @memberof ViewTypeProvider
         */
        ViewTypeProvider.prototype.getDefaultComponentIdForViewType = function (viewType) {
            // Currently the default component id is the same as the view type
            return this.getComponentTypeForViewType(viewType);
        };
        ViewTypeProvider.prototype.getIconByViewType = function (viewType) {
            return this._iconPathList[viewType];
        };
        ViewTypeProvider.prototype.initIconPathList = function () {
            var themeProvider = themeProvider_1.ThemeProvider.getInstance();
            this._iconPathList[ViewType.Common.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconComponentView.svg");
            this._iconPathList[ViewType.Analysis.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconTraceView.svg");
            this._iconPathList[ViewType.Configuration.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconTraceConfigurationView.svg");
            this._iconPathList[ViewType.Overview.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconOverviewPage.svg");
            this._iconPathList[ViewType.User.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconUser.svg");
            this._iconPathList[ViewType.DriveLog.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconLoggerView.svg");
        };
        /**
         * Return css Class name by passed viewType.
         * When no css Class is found for the passed viewType, an empty string gets returned.
         *
         * @param {ViewType} viewType
         * @return {*}  {string}
         * @memberof ViewTypeProvider
         */
        ViewTypeProvider.prototype.getIconClassByViewType = function (viewType) {
            var cssClass = this._viewTypeIconClassMap.get(viewType);
            if (cssClass === undefined) {
                return "";
            }
            else {
                return cssClass;
            }
        };
        return ViewTypeProvider;
    }());
    exports.ViewTypeProvider = ViewTypeProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld1R5cGVQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vdmlld1R5cGVQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxJQUFLLFFBU0o7SUFURCxXQUFLLFFBQVE7UUFDVCw2Q0FBTyxDQUFBO1FBQ1AsMkNBQU0sQ0FBQTtRQUNOLCtDQUFRLENBQUE7UUFDUix5REFBYSxDQUFBO1FBQ2IsK0NBQVEsQ0FBQTtRQUNSLHVDQUFJLENBQUE7UUFDSixtREFBVSxDQUFBO1FBQ1YsK0NBQVEsQ0FBQTtJQUNaLENBQUMsRUFUSSxRQUFRLEtBQVIsUUFBUSxRQVNaO0lBOEd5Qiw0QkFBUTtJQTVHbEM7Ozs7T0FJRztJQUNIO1FBQUE7WUFFWSxrQkFBYSxHQUFvQyxFQUFFLENBQUM7WUFFNUQ7Ozs7OztlQU1HO1lBQ2MsMEJBQXFCLEdBQTBCLElBQUksR0FBRyxDQUFvQjtnQkFDdkYsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDO2dCQUN0QyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDO2dCQUNwQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsNEJBQTRCLENBQUM7Z0JBQ3RELENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQztnQkFDdkMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQztnQkFDM0IsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztnQkFDekIsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDO2FBQ3hDLENBQUMsQ0FBQztRQWlGUCxDQUFDO1FBN0VVLDRCQUFXLEdBQWxCO1lBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtnQkFDNUIsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkQsZ0RBQWdEO2dCQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDcEM7WUFDRCxPQUFPLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksc0RBQTJCLEdBQWxDLFVBQW1DLFFBQWtCO1lBQ2pELElBQUcsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUM7Z0JBQzdCLE9BQU8saUJBQWlCLENBQUM7YUFDNUI7aUJBQ0ksSUFBRyxRQUFRLElBQUksUUFBUSxDQUFDLGFBQWEsRUFBQztnQkFDdkMsT0FBTyw4QkFBOEIsQ0FBQzthQUN6QztpQkFDSSxJQUFHLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFDO2dCQUNoQyxPQUFPLHFCQUFxQixDQUFDO2FBQ2hDO2lCQUNJLElBQUcsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUM7Z0JBQ25DLE9BQU8sY0FBYyxDQUFDO2FBQ3hCO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksMkRBQWdDLEdBQXZDLFVBQXdDLFFBQWtCO1lBQ3RELGtFQUFrRTtZQUNsRSxPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBR00sNENBQWlCLEdBQXhCLFVBQXlCLFFBQWtCO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRU8sMkNBQWdCLEdBQXhCO1lBQ0ksSUFBSSxhQUFhLEdBQUcsNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsaUJBQWlCLENBQUMsbURBQW1ELENBQUMsQ0FBQztZQUN0SSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsaUJBQWlCLENBQUMsK0NBQStDLENBQUMsQ0FBQztZQUNwSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsaUJBQWlCLENBQUMsNERBQTRELENBQUMsQ0FBQztZQUN0SixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsaUJBQWlCLENBQUMsa0RBQWtELENBQUMsQ0FBQztZQUN2SSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsaUJBQWlCLENBQUMsMENBQTBDLENBQUMsQ0FBQztZQUMzSCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsaUJBQWlCLENBQUMsZ0RBQWdELENBQUMsQ0FBQztRQUN6SSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLGlEQUFzQixHQUE3QixVQUE4QixRQUFrQjtZQUM1QyxJQUFJLFFBQVEsR0FBdUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1RSxJQUFHLFFBQVEsS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO2FBQ2I7aUJBQ0k7Z0JBQ0QsT0FBTyxRQUFRLENBQUM7YUFDbkI7UUFDTCxDQUFDO1FBRUwsdUJBQUM7SUFBRCxDQUFDLEFBckdELElBcUdDO0lBRU8sNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCIuL3RoZW1lUHJvdmlkZXJcIjtcclxuXHJcbmVudW0gVmlld1R5cGV7XHJcbiAgICBEZWZhdWx0LFxyXG4gICAgQ29tbW9uLFxyXG4gICAgQW5hbHlzaXMsXHJcbiAgICBDb25maWd1cmF0aW9uLFxyXG4gICAgT3ZlcnZpZXcsXHJcbiAgICBVc2VyLFxyXG4gICAgU2lkZUJhclRhYixcclxuICAgIERyaXZlTG9nLFxyXG59XHJcblxyXG4vKipcclxuICpcclxuICpcclxuICogQGNsYXNzIFZpZXdUeXBlUHJvdmlkZXJcclxuICovXHJcbmNsYXNzIFZpZXdUeXBlUHJvdmlkZXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaWNvblBhdGhMaXN0OiB7IFt2aWV3VHlwZTpzdHJpbmddIDogc3RyaW5nOyB9ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIHZpZXdUeXBlIHRvIGl0cyBpY29uIENzcyBDbGFzcyBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtNYXA8Vmlld1R5cGUsIHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgVmlld1R5cGVQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF92aWV3VHlwZUljb25DbGFzc01hcDogTWFwPFZpZXdUeXBlLCBzdHJpbmc+ID0gbmV3IE1hcDxWaWV3VHlwZSwgc3RyaW5nPiAoW1xyXG4gICAgICAgIFtWaWV3VHlwZS5EZWZhdWx0LCBcIlwiXSxcclxuICAgICAgICBbVmlld1R5cGUuQ29tbW9uLCBcImljb25Db21wb25lbnRWaWV3XCJdLFxyXG4gICAgICAgIFtWaWV3VHlwZS5BbmFseXNpcywgXCJpY29uVHJhY2VWaWV3XCJdLFxyXG4gICAgICAgIFtWaWV3VHlwZS5Db25maWd1cmF0aW9uLCBcImljb25UcmFjZUNvbmZpZ3VyYXRpb25WaWV3XCJdLFxyXG4gICAgICAgIFtWaWV3VHlwZS5PdmVydmlldywgXCJpY29uT3ZlcnZpZXdQYWdlXCJdLFxyXG4gICAgICAgIFtWaWV3VHlwZS5Vc2VyLCBcImljb25Vc2VyXCJdLFxyXG4gICAgICAgIFtWaWV3VHlwZS5TaWRlQmFyVGFiLCBcIlwiXSxcclxuICAgICAgICBbVmlld1R5cGUuRHJpdmVMb2csIFwiaWNvbkxvZ2dlclZpZXdcIl1cclxuICAgIF0pO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBWaWV3VHlwZVByb3ZpZGVyO1xyXG4gIFxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghVmlld1R5cGVQcm92aWRlci5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBWaWV3VHlwZVByb3ZpZGVyLmluc3RhbmNlID0gbmV3IFZpZXdUeXBlUHJvdmlkZXIoKTtcclxuICAgICAgICAgICAgLy8gLi4uIGFueSBvbmUgdGltZSBpbml0aWFsaXphdGlvbiBnb2VzIGhlcmUgLi4uXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuaW5pdEljb25QYXRoTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVmlld1R5cGVQcm92aWRlci5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbXBvbmVudFR5cGUgZm9yIHRoZSBnaXZlbiB2aWV3VHlwZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFZpZXdUeXBlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbXBvbmVudFR5cGVGb3JWaWV3VHlwZSh2aWV3VHlwZTogVmlld1R5cGUpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodmlld1R5cGUgPT0gVmlld1R5cGUuQW5hbHlzaXMpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJUcmFjZVZpZXdXaWRnZXRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih2aWV3VHlwZSA9PSBWaWV3VHlwZS5Db25maWd1cmF0aW9uKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLkNvbW1vbil7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkNvbXBvbmVudFZpZXdXaWRnZXRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih2aWV3VHlwZSA9PSBWaWV3VHlwZS5Ecml2ZUxvZyl7XHJcbiAgICAgICAgICAgcmV0dXJuIFwiTG9nZ2VyV2lkZ2V0XCI7XHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBpZCBmb3IgdGhlIGdpdmVuIHZpZXcgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFZpZXdUeXBlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRJZEZvclZpZXdUeXBlKHZpZXdUeXBlOiBWaWV3VHlwZSk6IHN0cmluZ3tcclxuICAgICAgICAvLyBDdXJyZW50bHkgdGhlIGRlZmF1bHQgY29tcG9uZW50IGlkIGlzIHRoZSBzYW1lIGFzIHRoZSB2aWV3IHR5cGVcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21wb25lbnRUeXBlRm9yVmlld1R5cGUodmlld1R5cGUpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIGdldEljb25CeVZpZXdUeXBlKHZpZXdUeXBlOiBWaWV3VHlwZSk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5faWNvblBhdGhMaXN0W3ZpZXdUeXBlXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRJY29uUGF0aExpc3QoKXtcclxuICAgICAgICBsZXQgdGhlbWVQcm92aWRlciA9IFRoZW1lUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB0aGlzLl9pY29uUGF0aExpc3RbVmlld1R5cGUuQ29tbW9uLnRvU3RyaW5nKCldID0gdGhlbWVQcm92aWRlci5nZXRUaGVtZWRGaWxlUGF0aChcIndpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9JY29uQ29tcG9uZW50Vmlldy5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5faWNvblBhdGhMaXN0W1ZpZXdUeXBlLkFuYWx5c2lzLnRvU3RyaW5nKCldID0gdGhlbWVQcm92aWRlci5nZXRUaGVtZWRGaWxlUGF0aChcIndpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9JY29uVHJhY2VWaWV3LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLl9pY29uUGF0aExpc3RbVmlld1R5cGUuQ29uZmlndXJhdGlvbi50b1N0cmluZygpXSA9IHRoZW1lUHJvdmlkZXIuZ2V0VGhlbWVkRmlsZVBhdGgoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvSWNvblRyYWNlQ29uZmlndXJhdGlvblZpZXcuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuX2ljb25QYXRoTGlzdFtWaWV3VHlwZS5PdmVydmlldy50b1N0cmluZygpXSA9IHRoZW1lUHJvdmlkZXIuZ2V0VGhlbWVkRmlsZVBhdGgoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvSWNvbk92ZXJ2aWV3UGFnZS5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5faWNvblBhdGhMaXN0W1ZpZXdUeXBlLlVzZXIudG9TdHJpbmcoKV0gPSB0aGVtZVByb3ZpZGVyLmdldFRoZW1lZEZpbGVQYXRoKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL0ljb25Vc2VyLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLl9pY29uUGF0aExpc3RbVmlld1R5cGUuRHJpdmVMb2cudG9TdHJpbmcoKV0gPSB0aGVtZVByb3ZpZGVyLmdldFRoZW1lZEZpbGVQYXRoKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL0ljb25Mb2dnZXJWaWV3LnN2Z1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBjc3MgQ2xhc3MgbmFtZSBieSBwYXNzZWQgdmlld1R5cGUuXHJcbiAgICAgKiBXaGVuIG5vIGNzcyBDbGFzcyBpcyBmb3VuZCBmb3IgdGhlIHBhc3NlZCB2aWV3VHlwZSwgYW4gZW1wdHkgc3RyaW5nIGdldHMgcmV0dXJuZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFZpZXdUeXBlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEljb25DbGFzc0J5Vmlld1R5cGUodmlld1R5cGU6IFZpZXdUeXBlKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgY3NzQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMuX3ZpZXdUeXBlSWNvbkNsYXNzTWFwLmdldCh2aWV3VHlwZSk7XHJcbiAgICAgICAgaWYoY3NzQ2xhc3MgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjc3NDbGFzcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQge1ZpZXdUeXBlUHJvdmlkZXIsIFZpZXdUeXBlfTsiXX0=