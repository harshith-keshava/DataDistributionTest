define(["require", "exports", "./opcUaRestResultTypes", "./opcUaRestServiceProvider"], function (require, exports, Rest, opcUaRestServiceProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Rest = Rest;
    /**
     * Defines OpcUa Attribute names.
     *
     * @enum {number}
     */
    var OpcUaAttribute;
    (function (OpcUaAttribute) {
        OpcUaAttribute["VALUE"] = "Value";
        OpcUaAttribute["DATA_TYPE"] = "DataType";
        OpcUaAttribute["BROWSE_NAME"] = "BrowseName";
        OpcUaAttribute["DISPLAY_NAME"] = "DisplayName";
        OpcUaAttribute["DESCRIPTION"] = "Description";
        OpcUaAttribute["USER_ACCESS_LEVEL"] = "UserAccessLevel";
    })(OpcUaAttribute || (OpcUaAttribute = {}));
    exports.OpcUaAttribute = OpcUaAttribute;
    /**
     * Specifies access levels ( as bit flags )
     *
     * @enum {number}
     */
    var OpcUaAccessLevel;
    (function (OpcUaAccessLevel) {
        OpcUaAccessLevel[OpcUaAccessLevel["CurrentRead"] = 1] = "CurrentRead";
        OpcUaAccessLevel[OpcUaAccessLevel["CurrentWrite"] = 2] = "CurrentWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["HistoryRead"] = 4] = "HistoryRead";
        OpcUaAccessLevel[OpcUaAccessLevel["HistoryWrite"] = 8] = "HistoryWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["SemanticChange"] = 16] = "SemanticChange";
        OpcUaAccessLevel[OpcUaAccessLevel["StatusWrite"] = 32] = "StatusWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["TimestampWrite"] = 64] = "TimestampWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["Reserved"] = 128] = "Reserved";
    })(OpcUaAccessLevel || (OpcUaAccessLevel = {}));
    exports.OpcUaAccessLevel = OpcUaAccessLevel;
    var OpcUaRestServices = new opcUaRestServiceProvider_1.OpcUaRestServiceProvider();
    exports.OpcUaRestServices = OpcUaRestServices;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BjVWFSZXN0U2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW11bmljYXRpb24vcmVzdC9vcGNVYVJlc3RTZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFvQzRCLG9CQUFJO0lBakNoQzs7OztPQUlHO0lBQ0gsSUFBSyxjQU9KO0lBUEQsV0FBSyxjQUFjO1FBQ2YsaUNBQWUsQ0FBQTtRQUNmLHdDQUFzQixDQUFBO1FBQ3RCLDRDQUEwQixDQUFBO1FBQzFCLDhDQUE0QixDQUFBO1FBQzVCLDZDQUEyQixDQUFBO1FBQzNCLHVEQUFxQyxDQUFBO0lBQ3pDLENBQUMsRUFQSSxjQUFjLEtBQWQsY0FBYyxRQU9sQjtJQXFCZ0Msd0NBQWM7SUFuQi9DOzs7O09BSUc7SUFDSCxJQUFLLGdCQVNKO0lBVEQsV0FBSyxnQkFBZ0I7UUFDakIscUVBQWtCLENBQUE7UUFDbEIsdUVBQW1CLENBQUE7UUFDbkIscUVBQWtCLENBQUE7UUFDbEIsdUVBQW1CLENBQUE7UUFDbkIsNEVBQXFCLENBQUE7UUFDckIsc0VBQWtCLENBQUE7UUFDbEIsNEVBQXFCLENBQUE7UUFDckIsaUVBQWUsQ0FBQTtJQUNuQixDQUFDLEVBVEksZ0JBQWdCLEtBQWhCLGdCQUFnQixRQVNwQjtJQUtnRCw0Q0FBZ0I7SUFGakUsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLG1EQUF3QixFQUFFLENBQUM7SUFFOUMsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVzdCBmcm9tIFwiLi9vcGNVYVJlc3RSZXN1bHRUeXBlc1wiO1xyXG5pbXBvcnQgeyBPcGNVYVJlc3RTZXJ2aWNlUHJvdmlkZXIgfSBmcm9tIFwiLi9vcGNVYVJlc3RTZXJ2aWNlUHJvdmlkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIE9wY1VhIEF0dHJpYnV0ZSBuYW1lcy5cclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gT3BjVWFBdHRyaWJ1dGUge1xyXG4gICAgVkFMVUUgPSBcIlZhbHVlXCIsXHJcbiAgICBEQVRBX1RZUEUgPSBcIkRhdGFUeXBlXCIsXHJcbiAgICBCUk9XU0VfTkFNRSA9IFwiQnJvd3NlTmFtZVwiLFxyXG4gICAgRElTUExBWV9OQU1FID0gXCJEaXNwbGF5TmFtZVwiLFxyXG4gICAgREVTQ1JJUFRJT04gPSBcIkRlc2NyaXB0aW9uXCIsXHJcbiAgICBVU0VSX0FDQ0VTU19MRVZFTCA9IFwiVXNlckFjY2Vzc0xldmVsXCJcclxufVxyXG5cclxuLyoqXHJcbiAqIFNwZWNpZmllcyBhY2Nlc3MgbGV2ZWxzICggYXMgYml0IGZsYWdzICkgXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIE9wY1VhQWNjZXNzTGV2ZWwge1xyXG4gICAgQ3VycmVudFJlYWQgPSAweDAxLFxyXG4gICAgQ3VycmVudFdyaXRlID0gMHgwMixcclxuICAgIEhpc3RvcnlSZWFkID0gMHgwNCxcclxuICAgIEhpc3RvcnlXcml0ZSA9IDB4MDgsXHJcbiAgICBTZW1hbnRpY0NoYW5nZSA9IDB4MTAsXHJcbiAgICBTdGF0dXNXcml0ZSA9IDB4MjAsXHJcbiAgICBUaW1lc3RhbXBXcml0ZSA9IDB4NDAsXHJcbiAgICBSZXNlcnZlZCA9IDB4ODAsXHJcbn1cclxuXHJcblxyXG52YXIgT3BjVWFSZXN0U2VydmljZXMgPSBuZXcgT3BjVWFSZXN0U2VydmljZVByb3ZpZGVyKCk7XHJcblxyXG5leHBvcnQgeyBPcGNVYVJlc3RTZXJ2aWNlcywgUmVzdCxPcGNVYUF0dHJpYnV0ZSwgT3BjVWFBY2Nlc3NMZXZlbCB9OyJdfQ==