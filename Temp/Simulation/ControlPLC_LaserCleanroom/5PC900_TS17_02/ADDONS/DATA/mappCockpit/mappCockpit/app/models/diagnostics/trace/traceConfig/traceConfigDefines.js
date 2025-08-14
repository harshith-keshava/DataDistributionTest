define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Defines the ids of some trace configuration data on opc ua server(browsenames)
     *
     * @export
     * @class TraceConfigBrowseNameIds
     */
    var TraceConfigBrowseNameIds = /** @class */ (function () {
        function TraceConfigBrowseNameIds() {
        }
        TraceConfigBrowseNameIds.AcoposSamplingTime = "Timing_AcoposSampleTime";
        TraceConfigBrowseNameIds.PlcTaskClass = "Timing_PlcTaskClass";
        TraceConfigBrowseNameIds.TotalRecordingTime = "Timing_TotalRecordingTime";
        TraceConfigBrowseNameIds.TriggerOffsetTime = "Timing_TriggerOffsetTime";
        TraceConfigBrowseNameIds.PlcSampleTime = "Timing_PlcSampleTime";
        return TraceConfigBrowseNameIds;
    }());
    exports.TraceConfigBrowseNameIds = TraceConfigBrowseNameIds;
    /**
     * Defines the ids of some trace configuration properties which will be used in the export/import trace configuration file format
     *
     * @export
     * @class TraceConfigFilePropertyIds
     */
    var TraceConfigFilePropertyIds = /** @class */ (function () {
        function TraceConfigFilePropertyIds() {
        }
        // Timing Ids
        TraceConfigFilePropertyIds.AcoposSamplingTime = "TrcACOPOSSampleTime";
        TraceConfigFilePropertyIds.PvTaskClass = "TrcPVTaskClass";
        TraceConfigFilePropertyIds.TotalRecordingTime = "TrcTotalRecordingTime";
        TraceConfigFilePropertyIds.TriggerOffsetTime = "TrcTriggerOffsetTime";
        TraceConfigFilePropertyIds.PlcSampleTime = "TrcPLCSampleTime";
        // Start Trigger Ids
        TraceConfigFilePropertyIds.TriggerCondition = "TrcTriggerCondition";
        TraceConfigFilePropertyIds.TriggerDataPoint = "TrcTriggerDataPoint";
        TraceConfigFilePropertyIds.TriggerConditionSelection = "TrcTriggerConditionSelection";
        TraceConfigFilePropertyIds.TriggerThreshold = "TrcThreshold";
        TraceConfigFilePropertyIds.TriggerWindow = "TrcWindow";
        // DataPoint Ids
        TraceConfigFilePropertyIds.DataPoint = "TrcDataPoint";
        return TraceConfigFilePropertyIds;
    }());
    exports.TraceConfigFilePropertyIds = TraceConfigFilePropertyIds;
    /**
     * Defines the trace configuration group ids(e.g. categories like datapoints, starttriggers, ..) in the export/import trace configuration file format
     *
     * @export
     * @class TraceConfigFileGroupIds
     */
    var TraceConfigFileGroupIds = /** @class */ (function () {
        function TraceConfigFileGroupIds() {
        }
        TraceConfigFileGroupIds.DataPointList = "TrcDataPointList";
        TraceConfigFileGroupIds.TimingSettings = "TrcTimingSettings";
        TraceConfigFileGroupIds.TriggerSettings = "TrcTriggerSettings";
        return TraceConfigFileGroupIds;
    }());
    exports.TraceConfigFileGroupIds = TraceConfigFileGroupIds;
    /**
     * Defines the xml types which will be used in the trace configuration export/import format (e.g. group, selector, property, ...)
     *
     * @export
     * @class XmlNodeTypes
     */
    var XmlNodeTypes = /** @class */ (function () {
        function XmlNodeTypes() {
        }
        XmlNodeTypes.Configuration = "Configuration";
        XmlNodeTypes.Element = "Element";
        XmlNodeTypes.Group = "Group";
        XmlNodeTypes.Selector = "Selector";
        XmlNodeTypes.Property = "Property";
        return XmlNodeTypes;
    }());
    exports.XmlNodeTypes = XmlNodeTypes;
    /**
     * Defines the xml attribute ids which will be used in the trace configuration export/import format (e.g. ID, Value, ...)
     *
     * @export
     * @class XmlAttributes
     */
    var XmlAttributes = /** @class */ (function () {
        function XmlAttributes() {
        }
        XmlAttributes.Id = "ID";
        XmlAttributes.Value = "Value";
        return XmlAttributes;
    }());
    exports.XmlAttributes = XmlAttributes;
    /**
     * Defines the trace state ids
     *
     * @export
     * @class TraceStateIds
     */
    var TraceStateIds = /** @class */ (function () {
        function TraceStateIds() {
        }
        TraceStateIds.Undefined = "";
        TraceStateIds.Disabled = "1";
        TraceStateIds.Config_processing = "10";
        TraceStateIds.Config_applied = "11";
        TraceStateIds.Wait_start_trigger = "20";
        TraceStateIds.Wait_stop_event = "21";
        TraceStateIds.Data_available = "23";
        TraceStateIds.Record_failure = "82";
        return TraceStateIds;
    }());
    exports.TraceStateIds = TraceStateIds;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEZWZpbmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VDb25maWcvdHJhY2VDb25maWdEZWZpbmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBOzs7OztPQUtHO0lBQ0g7UUFBQTtRQU1BLENBQUM7UUFMbUIsMkNBQWtCLEdBQUcseUJBQXlCLENBQUM7UUFDL0MscUNBQVksR0FBRSxxQkFBcUIsQ0FBQztRQUNwQywyQ0FBa0IsR0FBRywyQkFBMkIsQ0FBQztRQUNqRCwwQ0FBaUIsR0FBRywwQkFBMEIsQ0FBQztRQUMvQyxzQ0FBYSxHQUFHLHNCQUFzQixDQUFDO1FBQzNELCtCQUFDO0tBQUEsQUFORCxJQU1DO0lBTlksNERBQXdCO0lBUXJDOzs7OztPQUtHO0lBQ0g7UUFBQTtRQWlCQSxDQUFDO1FBaEJHLGFBQWE7UUFDRyw2Q0FBa0IsR0FBRyxxQkFBcUIsQ0FBQztRQUMzQyxzQ0FBVyxHQUFFLGdCQUFnQixDQUFDO1FBQzlCLDZDQUFrQixHQUFHLHVCQUF1QixDQUFDO1FBQzdDLDRDQUFpQixHQUFHLHNCQUFzQixDQUFDO1FBQzNDLHdDQUFhLEdBQUcsa0JBQWtCLENBQUM7UUFFbkQsb0JBQW9CO1FBQ0osMkNBQWdCLEdBQUcscUJBQXFCLENBQUM7UUFDekMsMkNBQWdCLEdBQUcscUJBQXFCLENBQUM7UUFDekMsb0RBQXlCLEdBQUcsOEJBQThCLENBQUM7UUFDM0QsMkNBQWdCLEdBQUcsY0FBYyxDQUFDO1FBQ2xDLHdDQUFhLEdBQUcsV0FBVyxDQUFDO1FBRTVDLGdCQUFnQjtRQUNBLG9DQUFTLEdBQUcsY0FBYyxDQUFDO1FBQy9DLGlDQUFDO0tBQUEsQUFqQkQsSUFpQkM7SUFqQlksZ0VBQTBCO0lBb0J2Qzs7Ozs7T0FLRztJQUNIO1FBQUE7UUFJQSxDQUFDO1FBSG1CLHFDQUFhLEdBQUcsa0JBQWtCLENBQUM7UUFDbkMsc0NBQWMsR0FBRyxtQkFBbUIsQ0FBQztRQUNyQyx1Q0FBZSxHQUFHLG9CQUFvQixDQUFDO1FBQzNELDhCQUFDO0tBQUEsQUFKRCxJQUlDO0lBSlksMERBQXVCO0lBTXBDOzs7OztPQUtHO0lBQ0g7UUFBQTtRQU1BLENBQUM7UUFMbUIsMEJBQWEsR0FBRyxlQUFlLENBQUM7UUFDaEMsb0JBQU8sR0FBRyxTQUFTLENBQUM7UUFDcEIsa0JBQUssR0FBRyxPQUFPLENBQUM7UUFDaEIscUJBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIscUJBQVEsR0FBRyxVQUFVLENBQUM7UUFDMUMsbUJBQUM7S0FBQSxBQU5ELElBTUM7SUFOWSxvQ0FBWTtJQVF6Qjs7Ozs7T0FLRztJQUNIO1FBQUE7UUFHQSxDQUFDO1FBRm1CLGdCQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ1YsbUJBQUssR0FBRyxPQUFPLENBQUM7UUFDcEMsb0JBQUM7S0FBQSxBQUhELElBR0M7SUFIWSxzQ0FBYTtJQUsxQjs7Ozs7T0FLRztJQUNIO1FBQUE7UUFTQSxDQUFDO1FBUm1CLHVCQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysc0JBQVEsR0FBRyxHQUFHLENBQUM7UUFDZiwrQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsNEJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsZ0NBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzFCLDZCQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLDRCQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLDRCQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzFDLG9CQUFDO0tBQUEsQUFURCxJQVNDO0lBVFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRGVmaW5lcyB0aGUgaWRzIG9mIHNvbWUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhIG9uIG9wYyB1YSBzZXJ2ZXIoYnJvd3NlbmFtZXMpXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFRyYWNlQ29uZmlnQnJvd3NlTmFtZUlkc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRyYWNlQ29uZmlnQnJvd3NlTmFtZUlkc3tcclxuICAgIHN0YXRpYyByZWFkb25seSBBY29wb3NTYW1wbGluZ1RpbWUgPSBcIlRpbWluZ19BY29wb3NTYW1wbGVUaW1lXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUGxjVGFza0NsYXNzPSBcIlRpbWluZ19QbGNUYXNrQ2xhc3NcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBUb3RhbFJlY29yZGluZ1RpbWUgPSBcIlRpbWluZ19Ub3RhbFJlY29yZGluZ1RpbWVcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBUcmlnZ2VyT2Zmc2V0VGltZSA9IFwiVGltaW5nX1RyaWdnZXJPZmZzZXRUaW1lXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUGxjU2FtcGxlVGltZSA9IFwiVGltaW5nX1BsY1NhbXBsZVRpbWVcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIGlkcyBvZiBzb21lIHRyYWNlIGNvbmZpZ3VyYXRpb24gcHJvcGVydGllcyB3aGljaCB3aWxsIGJlIHVzZWQgaW4gdGhlIGV4cG9ydC9pbXBvcnQgdHJhY2UgY29uZmlndXJhdGlvbiBmaWxlIGZvcm1hdFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ0ZpbGVQcm9wZXJ0eUlkc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRyYWNlQ29uZmlnRmlsZVByb3BlcnR5SWRze1xyXG4gICAgLy8gVGltaW5nIElkc1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEFjb3Bvc1NhbXBsaW5nVGltZSA9IFwiVHJjQUNPUE9TU2FtcGxlVGltZVwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFB2VGFza0NsYXNzPSBcIlRyY1BWVGFza0NsYXNzXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgVG90YWxSZWNvcmRpbmdUaW1lID0gXCJUcmNUb3RhbFJlY29yZGluZ1RpbWVcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBUcmlnZ2VyT2Zmc2V0VGltZSA9IFwiVHJjVHJpZ2dlck9mZnNldFRpbWVcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBQbGNTYW1wbGVUaW1lID0gXCJUcmNQTENTYW1wbGVUaW1lXCI7XHJcblxyXG4gICAgLy8gU3RhcnQgVHJpZ2dlciBJZHNcclxuICAgIHN0YXRpYyByZWFkb25seSBUcmlnZ2VyQ29uZGl0aW9uID0gXCJUcmNUcmlnZ2VyQ29uZGl0aW9uXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgVHJpZ2dlckRhdGFQb2ludCA9IFwiVHJjVHJpZ2dlckRhdGFQb2ludFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFRyaWdnZXJDb25kaXRpb25TZWxlY3Rpb24gPSBcIlRyY1RyaWdnZXJDb25kaXRpb25TZWxlY3Rpb25cIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBUcmlnZ2VyVGhyZXNob2xkID0gXCJUcmNUaHJlc2hvbGRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBUcmlnZ2VyV2luZG93ID0gXCJUcmNXaW5kb3dcIjtcclxuICAgIFxyXG4gICAgLy8gRGF0YVBvaW50IElkc1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IERhdGFQb2ludCA9IFwiVHJjRGF0YVBvaW50XCI7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBncm91cCBpZHMoZS5nLiBjYXRlZ29yaWVzIGxpa2UgZGF0YXBvaW50cywgc3RhcnR0cmlnZ2VycywgLi4pIGluIHRoZSBleHBvcnQvaW1wb3J0IHRyYWNlIGNvbmZpZ3VyYXRpb24gZmlsZSBmb3JtYXRcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgVHJhY2VDb25maWdGaWxlR3JvdXBJZHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmFjZUNvbmZpZ0ZpbGVHcm91cElkc3tcclxuICAgIHN0YXRpYyByZWFkb25seSBEYXRhUG9pbnRMaXN0ID0gXCJUcmNEYXRhUG9pbnRMaXN0XCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgVGltaW5nU2V0dGluZ3MgPSBcIlRyY1RpbWluZ1NldHRpbmdzXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgVHJpZ2dlclNldHRpbmdzID0gXCJUcmNUcmlnZ2VyU2V0dGluZ3NcIjsgXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSB4bWwgdHlwZXMgd2hpY2ggd2lsbCBiZSB1c2VkIGluIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIGV4cG9ydC9pbXBvcnQgZm9ybWF0IChlLmcuIGdyb3VwLCBzZWxlY3RvciwgcHJvcGVydHksIC4uLilcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgWG1sTm9kZVR5cGVzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgWG1sTm9kZVR5cGVze1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IENvbmZpZ3VyYXRpb24gPSBcIkNvbmZpZ3VyYXRpb25cIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBFbGVtZW50ID0gXCJFbGVtZW50XCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgR3JvdXAgPSBcIkdyb3VwXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgU2VsZWN0b3IgPSBcIlNlbGVjdG9yXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUHJvcGVydHkgPSBcIlByb3BlcnR5XCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSB4bWwgYXR0cmlidXRlIGlkcyB3aGljaCB3aWxsIGJlIHVzZWQgaW4gdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gZXhwb3J0L2ltcG9ydCBmb3JtYXQgKGUuZy4gSUQsIFZhbHVlLCAuLi4pXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFhtbEF0dHJpYnV0ZXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBYbWxBdHRyaWJ1dGVze1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IElkID0gXCJJRFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFZhbHVlID0gXCJWYWx1ZVwiO1xyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgdHJhY2Ugc3RhdGUgaWRzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFRyYWNlU3RhdGVJZHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmFjZVN0YXRlSWRze1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFVuZGVmaW5lZCA9IFwiXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRGlzYWJsZWQgPSBcIjFcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBDb25maWdfcHJvY2Vzc2luZyA9IFwiMTBcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBDb25maWdfYXBwbGllZCA9IFwiMTFcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBXYWl0X3N0YXJ0X3RyaWdnZXIgPSBcIjIwXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgV2FpdF9zdG9wX2V2ZW50ID0gXCIyMVwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IERhdGFfYXZhaWxhYmxlID0gXCIyM1wiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFJlY29yZF9mYWlsdXJlID0gXCI4MlwiO1xyXG59XHJcblxyXG4iXX0=