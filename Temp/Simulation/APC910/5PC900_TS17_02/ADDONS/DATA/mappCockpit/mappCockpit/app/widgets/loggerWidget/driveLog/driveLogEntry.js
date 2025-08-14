define(["require", "exports", "./driveLogEntryAdditionalData", "./driveLogEntryHelper"], function (require, exports, driveLogEntryAdditionalData_1, driveLogEntryHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Represents one network command trace logger entry
     *
     * @export
     * @class DriveLogEntry
     * @implements {IDriveLogEntry}
     */
    var DriveLogEntry = /** @class */ (function () {
        /**
         * Creates an instance of DriveLogEntry with a nwctEntry or driveLogEntryExport data
         * @param {INwctEntry} parsedEntry
         * @param {(NwctTextProvider|undefined)} nwctTextProvider
         * @memberof DriveLogEntry
         */
        function DriveLogEntry(parsedEntry, exportData) {
            if (exportData === void 0) { exportData = undefined; }
            this._parsedEntry = parsedEntry;
            if (exportData != undefined) {
                this.setExportData(exportData);
                return;
            }
            if (this._parsedEntry != undefined) {
                var record = this._parsedEntry;
                this._recordType = record.entryType;
                this._recordTypeName = record.entryTypeName;
                if (record.responseEntry != undefined) {
                    this._linkedRecordType = record.responseEntry.entryType;
                    this._linkedRecordTypeName = record.responseEntry.entryTypeName;
                    this._isLinkedRecordValid = record.parId == record.responseEntry.parId;
                }
                else {
                    // Default values if no response is available
                    this._linkedRecordType = -1;
                    this._linkedRecordTypeName = "";
                    this._isLinkedRecordValid = true;
                }
                return;
            }
            if (this._parsedEntry == undefined) {
                console.error("No entry data available!");
            }
        }
        /**
         * Returns the export data of this entry
         *
         * @returns {IDriveLogEntryExportData}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getExportData = function () {
            // Get mandatory export data
            var exportData = this.getMandatoryData();
            // Add additional export data
            var unit = this.getUnit();
            if (unit != "") {
                exportData["parUnit"] = unit;
            }
            if (this._linkedRecordType != undefined && this._linkedRecordType != -1) {
                // linked record available
                exportData["linkedRecType"] = this._linkedRecordType;
                if (this._isLinkedRecordError != undefined && this._isLinkedRecordError == true) {
                    exportData["isLinkedRecError"] = this._isLinkedRecordError;
                }
                if (this._linkedRecordTypeName != "") {
                    exportData["linkedRecTypeName"] = this._linkedRecordTypeName;
                }
                if (this._errorResponseParId != undefined && this._errorResponseParId != -1) {
                    exportData["linkedRecParId"] = this._errorResponseParId;
                }
                if (this._errorResponseParName != undefined && this._errorResponseParName != "") {
                    exportData["linkedRecParName"] = this._errorResponseParName;
                }
            }
            if (this.responseTime != "") {
                exportData["linkedRecDelay"] = this.responseTime;
            }
            if (this._additionalData != undefined && this._additionalData.mergedData != undefined) {
                exportData["parGroup"] = this._additionalData.getParGroupExportData();
                exportData["errorInfo"] = this._additionalData.getErrorInfoExportData();
                exportData["bitPattern"] = this._additionalData.getBitPatternExportData();
            }
            return exportData;
        };
        /**
         * Retruns the mandatory export data
         *
         * @private
         * @returns {IDriveLogEntryExportData}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getMandatoryData = function () {
            return { recNumber: this.recordNumber,
                recType: this._recordType,
                recTypeName: this._recordTypeName,
                time: this.time,
                modInterface: this.getModuleInterface(),
                modType: this.getModuleType(),
                modChannel: this.getModuleChannel(),
                applObject: this.objectName,
                parId: this._parId,
                parName: this.getDescriptionText(),
                parValue: this.getValue(),
            };
        };
        /**
         * Sets the export data to this entry
         *
         * @param {IDriveLogEntryExportDataOptional} exportData
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.setExportData = function (exportData) {
            this.setMandatoryData(exportData);
            // Set additional export data or default values if not available
            this._additionalData = driveLogEntryAdditionalData_1.AdditionalData.create(exportData.parGroup, exportData.errorInfo, exportData.bitPattern);
            this._responseTime = exportData.linkedRecDelay;
            if (this._responseTime == undefined) {
                this._responseTime = "";
            }
            this._unit = exportData.parUnit;
            if (this._unit == undefined) {
                this._unit = "";
            }
            this.setLinkedRecordData(exportData);
            this._isRecordError = false;
            if (this._additionalData != undefined) {
                if (this._additionalData.mergedData != undefined) {
                    if (this._additionalData.mergedData.errorInfo != undefined) {
                        if (this._linkedRecordType == undefined || this._linkedRecordType == -1 || this._linkedRecordType == 5) { // 5 => "RD_RSP"
                            // If error info is available but no linked record it must be a record error(no response error)
                            this._isRecordError = true;
                        }
                    }
                }
            }
            this._isBitPattern = false;
            if (this._additionalData != undefined) {
                if (this._additionalData.mergedData != undefined) {
                    if (this._additionalData.mergedData.bitPattern != undefined) {
                        this._isBitPattern = true;
                    }
                }
            }
            this._descriptionError = this.getDescriptionError();
        };
        /**
         *  Set mandatory export data
         *
         * @private
         * @param {IDriveLogEntryExportDataOptional} exportData
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.setMandatoryData = function (exportData) {
            this._recordNumber = exportData.recNumber;
            this._recordType = exportData.recType;
            this._recordTypeName = exportData.recTypeName;
            this._time = exportData.time;
            this._moduleInterface = exportData.modInterface;
            this._moduleType = exportData.modType;
            this._moduleChannel = exportData.modChannel;
            this._objectName = exportData.applObject;
            this._parId = exportData.parId;
            this._descriptionText = exportData.parName;
            this._value = exportData.parValue;
        };
        /**
         * Set linked RecordData
         *
         * @private
         * @param {IDriveLogEntryExportDataOptional} exportData
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.setLinkedRecordData = function (exportData) {
            this._linkedRecordType = exportData.linkedRecType;
            if (this._linkedRecordType == undefined) {
                this.setDefaultValuesForLinkedRecord();
            }
            else {
                this._linkedRecordTypeName = exportData.linkedRecTypeName;
                if (this._linkedRecordTypeName == undefined) {
                    this._linkedRecordTypeName = "";
                }
                this._isLinkedRecordValid = true;
                if (exportData.linkedRecParName != undefined && exportData.linkedRecParName != exportData.parName) {
                    this._isLinkedRecordValid = false;
                }
                this._isLinkedRecordError = exportData.isLinkedRecError;
                if (this._isLinkedRecordError == undefined) {
                    this._isLinkedRecordError = false;
                }
                this._errorResponseParName = exportData.linkedRecParName;
                if (this._errorResponseParName == undefined) {
                    this._errorResponseParName = "";
                }
                this._errorResponseParId = exportData.linkedRecParId;
                if (this._errorResponseParId == undefined) {
                    this._errorResponseParId = -1;
                }
            }
        };
        /**
         * Sets the default data of a linked record
         *
         * @private
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.setDefaultValuesForLinkedRecord = function () {
            // Set default values for linkedRecord if not available
            this._linkedRecordType = -1;
            this._linkedRecordTypeName = "";
            this._isLinkedRecordValid = true;
            this._isLinkedRecordError = false;
            this._errorResponseParName = "";
            this._errorResponseParId = -1;
        };
        Object.defineProperty(DriveLogEntry.prototype, "recordNumber", {
            /**
             * Returns the unique number of the logger entry
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._recordNumber == undefined) {
                    this._recordNumber = this._parsedEntry.index;
                }
                return this._recordNumber;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DriveLogEntry.prototype, "module", {
            /**
             * Returns the module description for this logger entry (e.g. PLK: SL1.IF2.ST1 (CHAN 2))
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._module == undefined) {
                    this._module = this.getModuleFormated(this.getModuleInterface(), this.getModuleType(), this.getModuleChannel());
                }
                return this._module;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DriveLogEntry.prototype, "objectName", {
            /**
             * Returns the name of the object (e.g. gAxis01)
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._objectName == undefined) {
                    this._objectName = this._parsedEntry.componentName;
                }
                return this._objectName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DriveLogEntry.prototype, "descriptionRawData", {
            /**
             * Retruns the info which is used for the description column for the search and filtering(texts without styling)
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._descriptionRawData == undefined) {
                    this._descriptionRawData = this.getDescriptionRawData(this.getDescriptionText(), this.getDescriptionValueWithUnit(), this.getAdditionalSearchInfo());
                }
                return this._descriptionRawData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the id of the icon which one should be shown for this record
         * If response and request is available and valid the ids will be added with a "_" between -> "id1_id2")
         * If response of request is invalid a postfix will be added -> "_invalid" e.g. id1_invalid
         *
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionIconId = function () {
            if (this._descriptionIconId == undefined) {
                var invalidLinkedRecord = false;
                if (this.isResponseAvailable()) {
                    invalidLinkedRecord = !this.isResponseParIdValid();
                }
                this._descriptionIconId = driveLogEntryHelper_1.DriveLogEntryHelper.generateIconId(this._recordType, this._linkedRecordType, invalidLinkedRecord);
            }
            return this._descriptionIconId;
        };
        /**
         * Returns only the description text without the value
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionText = function () {
            if (this._descriptionText == undefined) {
                this._descriptionText = this.getDescriptionTextFromRecord();
            }
            return this._descriptionText;
        };
        /**
         * Returns only the formated description text (e.g. red font color) without the value
         *
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionTextFormated = function () {
            if (this._descriptionTextFormated == undefined) {
                if (this.isErrorRecord()) {
                    this._descriptionTextFormated = driveLogEntryHelper_1.DriveLogEntryHelper.setStyleError(this.getDescriptionText());
                }
                else {
                    this._descriptionTextFormated = this.getDescriptionText();
                }
            }
            return this._descriptionTextFormated;
        };
        /**
         * Retruns the formated value (e.g. red font color) with the unit
         *
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionValueWithUnitFormated = function () {
            if (this._descriptionValueWithUnitFormated == undefined) {
                // only show value in red if responsError and read request
                if (this.isResponseError() && this._recordType == 4) { // 4 -> readRequest
                    this._descriptionValueWithUnitFormated = driveLogEntryHelper_1.DriveLogEntryHelper.setStyleError(this.getDescriptionValueWithUnit());
                }
                else {
                    this._descriptionValueWithUnitFormated = this.getDescriptionValueWithUnit();
                }
            }
            return this._descriptionValueWithUnitFormated;
        };
        /**
         * Returns the formated error description
         *
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionErrorFormated = function () {
            return driveLogEntryHelper_1.DriveLogEntryHelper.setStyleError(this.descriptionError());
        };
        Object.defineProperty(DriveLogEntry.prototype, "descriptionTooltip", {
            /**
             * Returns the tooltip text for the description text and value
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._descriptionTooltip == undefined) {
                    this._descriptionTooltip = this.getDescriptionTooltip();
                }
                return this._descriptionTooltip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DriveLogEntry.prototype, "time", {
            /**
             * Returns the time of the logger entry
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._time == undefined) {
                    this._time = this._parsedEntry.time.toFixed(4).toString();
                }
                return this._time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DriveLogEntry.prototype, "responseTime", {
            /**
             * Returns the time delay between the request and the response
             *
             * @readonly
             * @type {string}
             * @memberof DriveLogEntry
             */
            get: function () {
                if (this._responseTime == undefined) {
                    this._responseTime = "";
                    if (this._parsedEntry.responseEntry != undefined) {
                        this._responseTime = ((this._parsedEntry.responseEntry.time - this._parsedEntry.time) * 1000).toFixed(3).toString();
                    }
                }
                return this._responseTime;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * is the entry a error record
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isErrorRecord = function () {
            if (this._isRecordError == undefined) {
                this._isRecordError = false; // Default false
                var record = this._parsedEntry;
                if (record != undefined) {
                    this._isRecordError = record.isErrorRecord;
                }
            }
            return this._isRecordError;
        };
        /**
         * is the entry response error record(response available but response par id not valid)
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isResponseError = function () {
            if (this._isResponseError == undefined) {
                this._isResponseError = this.isResponseAvailable() && !this.isResponseParIdValid();
            }
            return this._isResponseError;
        };
        /**
         * Returns the module string( interface, type, channel,...)
         *
         * @private
         * @param {string} moduleInterface
         * @param {string} modulType
         * @param {number} modulChannel
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleFormated = function (moduleInterface, modulType, modulChannel) {
            var moduleFormated = moduleInterface;
            if (modulType != "") {
                moduleFormated += " (" + modulType + " " + modulChannel + ")";
            }
            return moduleFormated;
        };
        /**
         * Retruns the interface name incl. nodenumber
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleInterface = function () {
            if (this._moduleInterface == undefined) {
                this._moduleInterface = this.getModuleInterfaceFromRecord();
            }
            return this._moduleInterface;
        };
        /**
         * Returns the type of the module
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleType = function () {
            if (this._moduleType == undefined) {
                this._moduleType = this.getModuleTypeFromRecord();
            }
            return this._moduleType;
        };
        /**
         * Returns the channel of the module
         *
         * @private
         * @returns {number}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleChannel = function () {
            if (this._moduleChannel == undefined) {
                this._moduleChannel = this.getModuleChannelFromRecord();
            }
            return this._moduleChannel;
        };
        /**
         * Returns the interfacename incl. nodenumber from nwct entry
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleInterfaceFromRecord = function () {
            return this._parsedEntry.networkInterface + this.getNodeNumber();
        };
        /**
         * Returns the description raw data, needed for search an filtering; e.g  param name, param value, additional info like errornumber, ...)
         *
         * @private
         * @param {(string|undefined)} descriptionText
         * @param {(string|undefined)} descriptionValue
         * @param {string} additionalSearchInfo
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionRawData = function (descriptionText, descriptionValue, additionalSearchInfo) {
            if (descriptionText == undefined) {
                descriptionText = "";
            }
            if (descriptionValue == undefined) {
                descriptionValue = "";
            }
            return descriptionText + " " + descriptionValue + " " + additionalSearchInfo;
        };
        /**
         * Returns only the value without the description
         *
         * @type {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionValueWithUnit = function () {
            if (this._descriptionValueWithUnit == undefined) {
                this._descriptionValueWithUnit = driveLogEntryHelper_1.DriveLogEntryHelper.combineValueWithUnit(this.getValue(), this.getUnit());
            }
            return this._descriptionValueWithUnit;
        };
        /**
         * Holds the error description without formating
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.descriptionError = function () {
            var _a;
            if (this._descriptionError == undefined) {
                this._descriptionError = "";
                if (this.isResponseError()) {
                    var record = this._parsedEntry;
                    this._errorResponseParName = record.responseEntry.parIdName;
                    this._errorResponseParId = (_a = record === null || record === void 0 ? void 0 : record.responseEntry) === null || _a === void 0 ? void 0 : _a.parId;
                }
                this._descriptionError = this.getDescriptionError();
            }
            return this._descriptionError;
        };
        /**
         * Returns the description error
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionError = function () {
            if (this._errorResponseParName != undefined && this._errorResponseParName != "") {
                if (this.isResponseErrorRec()) {
                    return this._errorResponseParName; // Only return the parameter name if response error
                }
                // if response par id is different to request par id -> show special error
                return "(Error: RespParID=" + this._errorResponseParName + ")";
            }
            return "";
        };
        /**
         * Returns the description text without the value(with or without styling)
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionTextFromRecord = function () {
            var record = this._parsedEntry;
            if (record != undefined) {
                return record.parIdName;
            }
            return "";
        };
        /**
         * Retruns the par id
         *
         * @private
         * @returns {number}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getParId = function () {
            if (this._parId == undefined) {
                var record = this._parsedEntry;
                this._parId = record.parId;
            }
            return this._parId;
        };
        /**
         * Returns only the value
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getValue = function () {
            if (this._value == undefined) {
                this._value = this.getValueFromRecord();
            }
            return this._value;
        };
        /**
         * Returns only the unit
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getUnit = function () {
            if (this._unit == undefined) {
                this._unit = this.getUnitFromRecord();
            }
            return this._unit;
        };
        /**
         * Returns true if the parameter is a bitPattern and has some bitPattern infos available
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isBitPattern = function () {
            if (this._isBitPattern == undefined) {
                var record = this._parsedEntry;
                this._isBitPattern = record.isBitPattern;
            }
            return this._isBitPattern;
        };
        /**
         * Returns the value which should be shown for the given record
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getValueFromRecord = function () {
            var record = this._parsedEntry;
            if (this.isResponseAvailable()) {
                var returnValue = "";
                if (this._linkedRecordType == 5) { // "RD_RSP" => ReadResponse => show the value from the response and not from the request
                    var formatedValue = record.responseEntry.formatedValue;
                    returnValue = formatedValue;
                }
                else {
                    returnValue = record.formatedValue;
                }
                return returnValue;
            }
            else {
                if (record.isResponse && this._recordType == 3) { // "WR_RSP" => WriteResponse => don't show the value because it is only shown in the write request
                    return "";
                }
                else if (this._recordType == 4) { // "RD_REQ" => ReadRequest => don't show the value because it is only a read request (and not the already read value from the response)
                    return "";
                }
            }
            return record.formatedValue;
        };
        /**
         * Returns the unit from the nwct enry which should be shown for the given record
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getUnitFromRecord = function () {
            var record = this._parsedEntry;
            if (this.isResponseAvailable()) {
                var returnValue = "";
                if (this._linkedRecordType == 5) { // "RD_RSP" => ReadResponse => show the value/unit from the response and not from the request
                    returnValue = record.responseEntry.unit;
                }
                else {
                    returnValue = record.unit;
                }
                return returnValue;
            }
            else {
                if (record.isResponse && this._recordType == 3) { // "WR_RSP" => WriteResponse => don't show the value/unit because it is only shown in the write request
                    return "";
                }
                else if (this._recordType == 4) { // "RD_REQ" => ReadRequest => don't show the value/unit because it is only a read request (and not the already read value from the response)
                    return "";
                }
            }
            return record.unit;
        };
        /**
         * Returns some text which should also be used for the search/filter mechanisms(e.g. errorNumber, error description)
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getAdditionalSearchInfo = function () {
            var _a, _b;
            var errorNumber = (_b = (_a = this.getAddtionalData().mergedData) === null || _a === void 0 ? void 0 : _a.errorInfo) === null || _b === void 0 ? void 0 : _b.errorNumber;
            var additionalData = "";
            if (errorNumber != undefined && errorNumber != -1) {
                additionalData = errorNumber.toString();
            }
            if (this.descriptionError() != "") {
                // Add error description to search info
                if (additionalData != "") {
                    additionalData += " ";
                }
                additionalData += this.descriptionError();
            }
            return additionalData;
        };
        /**
         * Returns a description tooltip text
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getDescriptionTooltip = function () {
            var tooltip = driveLogEntryHelper_1.DriveLogEntryHelper.getMainDescriptionTooltip(this.getMergedRecordTypeName(), this.getParId());
            // Add parameter name and value if available
            tooltip += this.getDescriptionTextFormated();
            // add value only if it is not a bitpattern value
            if (this.getDescriptionValueWithUnitFormated() != "" && !this.isBitPattern()) {
                tooltip += " = " + this.getDescriptionValueWithUnitFormated();
            }
            // Format the additionalData(paramGroups data, bitmask data, ...)
            var tooltipForRecord = driveLogEntryHelper_1.DriveLogEntryHelper.getAdditionalDescriptionTooltip(this.getAddtionalData().mergedData);
            if (tooltipForRecord != "") {
                tooltip += "<br/>";
                tooltip += tooltipForRecord;
            }
            return tooltip;
        };
        /**
         * Returns the additional data for this entry(e.g. error info, param group info, bit mask info)
         *
         * @private
         * @returns {AdditionalData}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getAddtionalData = function () {
            if (this._additionalData == undefined) {
                var record = this._parsedEntry;
                var additionalData = new driveLogEntryAdditionalData_1.AdditionalData();
                // Add tooltip info of request if available
                if ((!this.isErrorRecord() && this._recordType != 4) || (!this.isResponseAvailable())) {
                    // show info if no response is available or
                    // show info if it is not an read error request => for read error request the data will be used from the response
                    var data = this.getAdditionalDataForRecord(record);
                    if (data != undefined) {
                        additionalData.addData(data);
                    }
                }
                // Add tooltip info of response if available
                if (this.isResponseAvailable() && (this._recordType != 2 || this.isResponseErrorRec())) { //"WR_REQ" write value already shown from request data; only show error data if available
                    var data = this.getAdditionalDataForRecord(record.responseEntry);
                    if (data != undefined) {
                        additionalData.addData(data);
                    }
                }
                this._additionalData = additionalData;
            }
            return this._additionalData;
        };
        /**
         * Get tooltip data for the given record(request or response)
         *
         * @private
         * @param {INwctEntry} record
         * @returns {(IAdditionalData|undefined)}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getAdditionalDataForRecord = function (record) {
            var parGroup;
            var errorInfo;
            var bitPattern;
            if (record.isParameterGroup) {
                // Show parameterGroup info in case of parameter group
                var parGroupDescriptionData = record.parameterGroupDescription;
                if (Array.isArray(parGroupDescriptionData)) {
                    parGroup = parGroupDescriptionData;
                }
                else {
                    errorInfo = parGroupDescriptionData;
                }
            }
            if (record.isBitPattern) {
                // Add parameter name in case of bitpattern
                bitPattern = record.bitPatternDescription;
            }
            if (parGroup == undefined && bitPattern == undefined && errorInfo == undefined) {
                return undefined;
            }
            var data = { parGroup: parGroup, errorInfo: errorInfo, bitPattern: bitPattern };
            return data;
        };
        /**
         * Returns the node number to which the logger entry belongs to
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getNodeNumber = function () {
            var nodeNumber = this._parsedEntry.nodeNumber.toString();
            if (nodeNumber == "0") { // if node number is 0 don't show => e.g. NCMAN
                return "";
            }
            return ".ST" + nodeNumber;
        };
        /**
         * Returns the channel of the object
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleChannelFromRecord = function () {
            return this._parsedEntry.channelNumber;
        };
        /**
         * Returns the object type (e.g. AXIS, VAXIS, ...)
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getModuleTypeFromRecord = function () {
            return this._parsedEntry.componentType;
        };
        /**
         * Returns the tooltip text for the record type(e.g. "Write Request", ..)
         *
         * @private
         * @returns {string}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.getMergedRecordTypeName = function () {
            if (this._mergedRecordTypeName == undefined) {
                if (this.isResponseAvailable()) {
                    // Response is available -> Show request/response merged text
                    var responseText = this._linkedRecordTypeName;
                    var diffCharIndex = driveLogEntryHelper_1.DriveLogEntryHelper.findFirstDifferentChar(this._recordTypeName, responseText);
                    if (diffCharIndex > 0) {
                        responseText = responseText.substr(diffCharIndex);
                    }
                    // show response text in red and add error if response is invalid
                    this._mergedRecordTypeName = this._recordTypeName + "/" + responseText;
                }
                else {
                    this._mergedRecordTypeName = this._recordTypeName;
                }
            }
            if (this.isResponseError()) {
                var responseStartIndex = this._mergedRecordTypeName.indexOf("/");
                if (responseStartIndex != -1) {
                    var requestText = this._mergedRecordTypeName.substr(0, responseStartIndex + 1);
                    var responseText = this._mergedRecordTypeName.substr(responseStartIndex + 1);
                    responseText = driveLogEntryHelper_1.DriveLogEntryHelper.setStyleError(responseText + " Error");
                    return requestText + responseText;
                }
                else {
                    return this._mergedRecordTypeName;
                }
            }
            return this._mergedRecordTypeName;
        };
        /**
         * Returns true if a response is available for the given request
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isResponseAvailable = function () {
            if (this._linkedRecordType != undefined) {
                if (this._linkedRecordType != -1) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns true if the given response is valid for the given request(same command/parameterId for request and response)
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isResponseParIdValid = function () {
            if (this._isLinkedRecordValid != undefined) {
                return this._isLinkedRecordValid;
            }
            return true;
        };
        /**
         * Retruns true if a response error, else false
         *
         * @private
         * @returns {boolean}
         * @memberof DriveLogEntry
         */
        DriveLogEntry.prototype.isResponseErrorRec = function () {
            if (this._isLinkedRecordError == undefined) {
                var record = this._parsedEntry;
                this._isLinkedRecordError = record.responseEntry.isErrorRecord;
            }
            return this._isLinkedRecordError;
        };
        return DriveLogEntry;
    }());
    exports.DriveLogEntry = DriveLogEntry;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmVMb2dFbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9sb2dnZXJXaWRnZXQvZHJpdmVMb2cvZHJpdmVMb2dFbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQTs7Ozs7O09BTUc7SUFDSDtRQW1NSTs7Ozs7V0FLRztRQUNILHVCQUFZLFdBQWlDLEVBQUUsVUFBa0U7WUFBbEUsMkJBQUEsRUFBQSxzQkFBa0U7WUFDN0csSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDaEMsSUFBRyxVQUFVLElBQUksU0FBUyxFQUFDO2dCQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQixPQUFPO2FBQ1Y7WUFDRCxJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFDO2dCQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTyxDQUFDLGFBQWEsQ0FBQztnQkFDN0MsSUFBRyxNQUFNLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztvQkFDakMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO29CQUN4RCxJQUFJLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7b0JBQ2hFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFPLENBQUMsS0FBSyxJQUFJLE1BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO2lCQUM1RTtxQkFDRztvQkFDQSw2Q0FBNkM7b0JBQzdDLElBQUksQ0FBQyxpQkFBaUIsR0FBRSxDQUFDLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUs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LElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFPLENBQUMsYUFBYyxDQUFDLGFBQWEsQ0FBQzthQUNwRTtZQUNELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3JDLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUFsb0NELElBa29DQztJQWxvQ1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRHJpdmVMb2dFbnRyeSB9IGZyb20gXCIuLi9kcml2ZUxvZy9pbnRlcmZhY2VzL2RyaXZlTG9nRW50cnlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSU53Y3RFbnRyeSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbndjdFByb3ZpZGVyL2ludGVyZmFjZXMvbndjdEVudHJ5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElOd2N0Qml0RGVmaW5pdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbndjdFByb3ZpZGVyL2ludGVyZmFjZXMvbndjdEJpdERlZmluaXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSURyaXZlTG9nRW50cnlFeHBvcnREYXRhLCBJRHJpdmVMb2dFbnRyeUV4cG9ydERhdGFPcHRpb25hbCB9IGZyb20gXCIuL2ludGVyZmFjZXMvZHJpdmVMb2dFbnRyeUV4cG9ydERhdGFJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQWRkaXRpb25hbERhdGEsIElBZGRpdGlvbmFsRGF0YSB9IGZyb20gXCIuL2RyaXZlTG9nRW50cnlBZGRpdGlvbmFsRGF0YVwiO1xyXG5pbXBvcnQgeyBEcml2ZUxvZ0VudHJ5SGVscGVyIH0gZnJvbSBcIi4vZHJpdmVMb2dFbnRyeUhlbHBlclwiO1xyXG5pbXBvcnQgeyBJTndjdFBhcmFtR3JvdXBJbmZvIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9ud2N0UHJvdmlkZXIvaW50ZXJmYWNlcy9ud2N0UGFyYW1Hcm91cEluZm9JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSU53Y3RFcnJvckluZm8gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL253Y3RQcm92aWRlci9pbnRlcmZhY2VzL253Y3RFcnJvckluZm9JbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIG9uZSBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgbG9nZ2VyIGVudHJ5XHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIERyaXZlTG9nRW50cnlcclxuICogQGltcGxlbWVudHMge0lEcml2ZUxvZ0VudHJ5fVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERyaXZlTG9nRW50cnkgaW1wbGVtZW50cyBJRHJpdmVMb2dFbnRyeXsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgcGFyc2VkIGRhdGEgb2YgdGhlIG9yaWdpbmFsIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBlbnRyeVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7SU53Y3RFbnRyeX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3BhcnNlZEVudHJ5OiBJTndjdEVudHJ5fHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHVuaXF1ZSBudW1iZXIgb2YgdGhlIHJlY29yZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcmVjb3JkTnVtYmVyOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIG1vZHVsZSBuYW1lKG5ldHdvcmsgaW50ZXJmYWNlTmFtZSArIG5vZGVudW1iZXIgKyBlbGVtZW50VHlwZSArIGNoYW5uZWwpIG9mIHRoZSBsb2dnZXIgZW50cnlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX21vZHVsZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX21vZHVsZUludGVyZmFjZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX21vZHVsZVR5cGU6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9tb2R1bGVDaGFubmVsOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZCB0aGUgYXBwbGljYXRpb24gb2JqZWN0IG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX29iamVjdE5hbWU6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgaWNvbiBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KHN0cmluZ3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGVzY3JpcHRpb25JY29uSWQ6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgZGVzY3JpcHRpb24gaW5mb3JtYXRpb24odXNlZCBmb3IgZmlsdGVyaW5nIGFuZCBzZWFyY2hpbmcpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kZXNjcmlwdGlvblJhd0RhdGE6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgZGVzY3JpcHRpb24gdGV4dCAoYW5kIHRoZSBmb3JtYXRlZCB0ZXh0OyBlLmcuIHJlZCBmb250LC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2Rlc2NyaXB0aW9uVGV4dDogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2Rlc2NyaXB0aW9uVGV4dEZvcm1hdGVkOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGRlc2NyaXB0aW9uIHZhbHVlIGluZm9ybWF0aW9uIChhbmQgdGhlIGZvcm1hdGVkIHRleHQ7IGUuZy4gcmVkIGZvbnQsLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KHN0cmluZ3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0OiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfZGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0Rm9ybWF0ZWQ6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgdmFsdWUgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSB1bml0IGZvciB0aGUgZ2l2ZW4gdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3VuaXQ6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgZGVzY3JpcHRpb24gdG9vbHRpcCB0ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kZXNjcmlwdGlvblRvb2x0aXA6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0ZWggZGVzY3JpcHRpb24gZXJyb3IgdGV4dFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KHN0cmluZ3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGVzY3JpcHRpb25FcnJvcjogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSB0aW1lIHdoZW4gdGhpcyBsb2cgZW50cnkgb2NjdXJlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KHN0cmluZ3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgIHByaXZhdGUgX3RpbWU6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgdGltZSBkZWxheSBvZiBhIHJlc3BvbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZXNwb25zZVRpbWU6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNvcmQgdHlwZSBhbmQgbmFtZSBvZiByZWNvcmQgYW4gbGlua2VkIHJlY29yZChyZXNwb25zZSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3JlY29yZFR5cGU6IG51bWJlcnx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9yZWNvcmRUeXBlTmFtZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2xpbmtlZFJlY29yZFR5cGU6IG51bWJlcnx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9saW5rZWRSZWNvcmRUeXBlTmFtZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXJnZWQgcmVjb3JkIHR5cGUgbmFtZSAoZS5nLiBSZWFkIFJlcXVlc3QvUmVhZCBSZXNwb25zZSAtPiBSZWFkIFJlcXVlc3QvUmVzcG9uc2UpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9tZXJnZWRSZWNvcmRUeXBlTmFtZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIHBhcmFtZXRlciBhIGJpdFBhdHRlcm4gYW5kIGhhcyBiaXRQYXR0ZXJuIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhib29sZWFufHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pc0JpdFBhdHRlcm46IGJvb2xlYW58dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkaXRpb25hbCBpbmZvIHVzZWQgZm9yIHRvb2x0aXAgaW5mbyhlcnJvciBpbmZvcywgcGFyYW1ldGVyIGdyb3VwIGluZm9zLCBiaXRQYXR0ZXJuIGluZm9zKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KEFkZGl0aW9uYWxEYXRhfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9hZGRpdGlvbmFsRGF0YTogQWRkaXRpb25hbERhdGF8dW5kZWZpbmVkO1xyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogU29tbWUgZXJyb3IgaW5mb3MoaXMgZXJyb3IgcmVjb3JkLCBpcyByZXNwb25zZSBlcnJvciByZWNvcmQsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhib29sZWFufHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pc1JlY29yZEVycm9yOiBib29sZWFufHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2lzUmVzcG9uc2VFcnJvcjogYm9vbGVhbnx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9pc0xpbmtlZFJlY29yZFZhbGlkOiBib29sZWFufHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2lzTGlua2VkUmVjb3JkRXJyb3I6IGJvb2xlYW58dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfZXJyb3JSZXNwb25zZVBhck5hbWU6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBwYXIgaWQgYW5kIHRoZSByZXNwb25zZSBwYXIgaWQgaWYgZGlmZmVyZW50IGZyb20gcGFyIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wYXJJZDogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2Vycm9yUmVzcG9uc2VQYXJJZDogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIERyaXZlTG9nRW50cnkgd2l0aCBhIG53Y3RFbnRyeSBvciBkcml2ZUxvZ0VudHJ5RXhwb3J0IGRhdGFcclxuICAgICAqIEBwYXJhbSB7SU53Y3RFbnRyeX0gcGFyc2VkRW50cnlcclxuICAgICAqIEBwYXJhbSB7KE53Y3RUZXh0UHJvdmlkZXJ8dW5kZWZpbmVkKX0gbndjdFRleHRQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocGFyc2VkRW50cnk6IElOd2N0RW50cnl8dW5kZWZpbmVkLCBleHBvcnREYXRhOiBJRHJpdmVMb2dFbnRyeUV4cG9ydERhdGFPcHRpb25hbHx1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMuX3BhcnNlZEVudHJ5ID0gcGFyc2VkRW50cnk7XHJcbiAgICAgICAgaWYoZXhwb3J0RGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldEV4cG9ydERhdGEoZXhwb3J0RGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fcGFyc2VkRW50cnkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuX3BhcnNlZEVudHJ5O1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRUeXBlID0gcmVjb3JkIS5lbnRyeVR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZFR5cGVOYW1lID0gcmVjb3JkIS5lbnRyeVR5cGVOYW1lO1xyXG4gICAgICAgICAgICBpZihyZWNvcmQucmVzcG9uc2VFbnRyeSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlua2VkUmVjb3JkVHlwZSA9IHJlY29yZC5yZXNwb25zZUVudHJ5LmVudHJ5VHlwZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmtlZFJlY29yZFR5cGVOYW1lID0gcmVjb3JkLnJlc3BvbnNlRW50cnkuZW50cnlUeXBlTmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzTGlua2VkUmVjb3JkVmFsaWQgPSByZWNvcmQhLnBhcklkID09IHJlY29yZCEucmVzcG9uc2VFbnRyeS5wYXJJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB2YWx1ZXMgaWYgbm8gcmVzcG9uc2UgaXMgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5rZWRSZWNvcmRUeXBlID0tMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmtlZFJlY29yZFR5cGVOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzTGlua2VkUmVjb3JkVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fcGFyc2VkRW50cnkgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIGVudHJ5IGRhdGEgYXZhaWxhYmxlIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZXhwb3J0IGRhdGEgb2YgdGhpcyBlbnRyeVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJRHJpdmVMb2dFbnRyeUV4cG9ydERhdGF9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RXhwb3J0RGF0YSgpOiBJRHJpdmVMb2dFbnRyeUV4cG9ydERhdGF7XHJcbiAgICAgICAgLy8gR2V0IG1hbmRhdG9yeSBleHBvcnQgZGF0YVxyXG4gICAgICAgIGxldCBleHBvcnREYXRhID0gdGhpcy5nZXRNYW5kYXRvcnlEYXRhKCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBhZGRpdGlvbmFsIGV4cG9ydCBkYXRhXHJcbiAgICAgICAgbGV0IHVuaXQgPSB0aGlzLmdldFVuaXQoKTtcclxuICAgICAgICBpZih1bml0ICE9IFwiXCIpe1xyXG4gICAgICAgICAgICBleHBvcnREYXRhW1wicGFyVW5pdFwiXSA9IHVuaXQ7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgaWYodGhpcy5fbGlua2VkUmVjb3JkVHlwZSAhPSB1bmRlZmluZWQgJiYgdGhpcy5fbGlua2VkUmVjb3JkVHlwZSAhPSAtMSl7XHJcbiAgICAgICAgICAgIC8vIGxpbmtlZCByZWNvcmQgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgIGV4cG9ydERhdGFbXCJsaW5rZWRSZWNUeXBlXCJdID0gdGhpcy5fbGlua2VkUmVjb3JkVHlwZTtcclxuICAgICAgICAgICAgaWYodGhpcy5faXNMaW5rZWRSZWNvcmRFcnJvciAhPSB1bmRlZmluZWQgJiYgdGhpcy5faXNMaW5rZWRSZWNvcmRFcnJvciA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGV4cG9ydERhdGFbXCJpc0xpbmtlZFJlY0Vycm9yXCJdID0gdGhpcy5faXNMaW5rZWRSZWNvcmRFcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLl9saW5rZWRSZWNvcmRUeXBlTmFtZSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIGV4cG9ydERhdGFbXCJsaW5rZWRSZWNUeXBlTmFtZVwiXSA9IHRoaXMuX2xpbmtlZFJlY29yZFR5cGVOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJJZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5fZXJyb3JSZXNwb25zZVBhcklkICE9IC0xKXtcclxuICAgICAgICAgICAgICAgIGV4cG9ydERhdGFbXCJsaW5rZWRSZWNQYXJJZFwiXSA9IHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLl9lcnJvclJlc3BvbnNlUGFyTmFtZSAhPSB1bmRlZmluZWQgJiYgdGhpcy5fZXJyb3JSZXNwb25zZVBhck5hbWUgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICBleHBvcnREYXRhW1wibGlua2VkUmVjUGFyTmFtZVwiXSA9IHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5yZXNwb25zZVRpbWUgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIGV4cG9ydERhdGFbXCJsaW5rZWRSZWNEZWxheVwiXSA9IHRoaXMucmVzcG9uc2VUaW1lO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2FkZGl0aW9uYWxEYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLl9hZGRpdGlvbmFsRGF0YS5tZXJnZWREYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGV4cG9ydERhdGFbXCJwYXJHcm91cFwiXSA9IHRoaXMuX2FkZGl0aW9uYWxEYXRhLmdldFBhckdyb3VwRXhwb3J0RGF0YSgpO1xyXG4gICAgICAgICAgICBleHBvcnREYXRhW1wiZXJyb3JJbmZvXCJdID0gdGhpcy5fYWRkaXRpb25hbERhdGEuZ2V0RXJyb3JJbmZvRXhwb3J0RGF0YSgpO1xyXG4gICAgICAgICAgICBleHBvcnREYXRhW1wiYml0UGF0dGVyblwiXSA9IHRoaXMuX2FkZGl0aW9uYWxEYXRhLmdldEJpdFBhdHRlcm5FeHBvcnREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgcmV0dXJuIGV4cG9ydERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRydW5zIHRoZSBtYW5kYXRvcnkgZXhwb3J0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0lEcml2ZUxvZ0VudHJ5RXhwb3J0RGF0YX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWFuZGF0b3J5RGF0YSgpOiBJRHJpdmVMb2dFbnRyeUV4cG9ydERhdGF7XHJcbiAgICAgICAgcmV0dXJuIHsgcmVjTnVtYmVyOiB0aGlzLnJlY29yZE51bWJlcixcclxuICAgICAgICAgICAgcmVjVHlwZTogdGhpcy5fcmVjb3JkVHlwZSEsXHJcbiAgICAgICAgICAgIHJlY1R5cGVOYW1lOiB0aGlzLl9yZWNvcmRUeXBlTmFtZSEsXHJcblxyXG4gICAgICAgICAgICB0aW1lOiB0aGlzLnRpbWUsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBtb2RJbnRlcmZhY2U6IHRoaXMuZ2V0TW9kdWxlSW50ZXJmYWNlKCksXHJcbiAgICAgICAgICAgIG1vZFR5cGU6IHRoaXMuZ2V0TW9kdWxlVHlwZSgpLFxyXG4gICAgICAgICAgICBtb2RDaGFubmVsOiB0aGlzLmdldE1vZHVsZUNoYW5uZWwoKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFwcGxPYmplY3Q6IHRoaXMub2JqZWN0TmFtZSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhcklkOiB0aGlzLl9wYXJJZCEsXHJcbiAgICAgICAgICAgIHBhck5hbWU6IHRoaXMuZ2V0RGVzY3JpcHRpb25UZXh0KCksXHJcbiAgICAgICAgICAgIHBhclZhbHVlOiB0aGlzLmdldFZhbHVlKCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGV4cG9ydCBkYXRhIHRvIHRoaXMgZW50cnlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lEcml2ZUxvZ0VudHJ5RXhwb3J0RGF0YU9wdGlvbmFsfSBleHBvcnREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICAgcHJpdmF0ZSBzZXRFeHBvcnREYXRhKGV4cG9ydERhdGE6IElEcml2ZUxvZ0VudHJ5RXhwb3J0RGF0YU9wdGlvbmFsKXtcclxuICAgICAgICB0aGlzLnNldE1hbmRhdG9yeURhdGEoZXhwb3J0RGF0YSk7XHJcblxyXG4gICAgICAgIC8vIFNldCBhZGRpdGlvbmFsIGV4cG9ydCBkYXRhIG9yIGRlZmF1bHQgdmFsdWVzIGlmIG5vdCBhdmFpbGFibGVcclxuICAgICAgICB0aGlzLl9hZGRpdGlvbmFsRGF0YSA9IEFkZGl0aW9uYWxEYXRhLmNyZWF0ZShleHBvcnREYXRhLnBhckdyb3VwLCBleHBvcnREYXRhLmVycm9ySW5mbywgZXhwb3J0RGF0YS5iaXRQYXR0ZXJuKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9yZXNwb25zZVRpbWUgPSBleHBvcnREYXRhLmxpbmtlZFJlY0RlbGF5O1xyXG4gICAgICAgIGlmKHRoaXMuX3Jlc3BvbnNlVGltZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNwb25zZVRpbWUgPSBcIlwiO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLl91bml0ID0gZXhwb3J0RGF0YS5wYXJVbml0O1xyXG4gICAgICAgIGlmKHRoaXMuX3VuaXQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fdW5pdCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0TGlua2VkUmVjb3JkRGF0YShleHBvcnREYXRhKTsgICAgICBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9pc1JlY29yZEVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5fYWRkaXRpb25hbERhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fYWRkaXRpb25hbERhdGEubWVyZ2VkRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fYWRkaXRpb25hbERhdGEubWVyZ2VkRGF0YS5lcnJvckluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9saW5rZWRSZWNvcmRUeXBlID09IHVuZGVmaW5lZCB8fCB0aGlzLl9saW5rZWRSZWNvcmRUeXBlID09IC0xIHx8IHRoaXMuX2xpbmtlZFJlY29yZFR5cGUgPT0gNSl7IC8vIDUgPT4gXCJSRF9SU1BcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBlcnJvciBpbmZvIGlzIGF2YWlsYWJsZSBidXQgbm8gbGlua2VkIHJlY29yZCBpdCBtdXN0IGJlIGEgcmVjb3JkIGVycm9yKG5vIHJlc3BvbnNlIGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1JlY29yZEVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2lzQml0UGF0dGVybiA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuX2FkZGl0aW9uYWxEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2FkZGl0aW9uYWxEYXRhLm1lcmdlZERhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2FkZGl0aW9uYWxEYXRhLm1lcmdlZERhdGEuYml0UGF0dGVybiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzQml0UGF0dGVybiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uRXJyb3IgPSB0aGlzLmdldERlc2NyaXB0aW9uRXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBTZXQgbWFuZGF0b3J5IGV4cG9ydCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SURyaXZlTG9nRW50cnlFeHBvcnREYXRhT3B0aW9uYWx9IGV4cG9ydERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TWFuZGF0b3J5RGF0YShleHBvcnREYXRhOiBJRHJpdmVMb2dFbnRyeUV4cG9ydERhdGFPcHRpb25hbCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fcmVjb3JkTnVtYmVyID0gZXhwb3J0RGF0YS5yZWNOdW1iZXI7XHJcbiAgICAgICAgdGhpcy5fcmVjb3JkVHlwZSA9IGV4cG9ydERhdGEucmVjVHlwZTtcclxuICAgICAgICB0aGlzLl9yZWNvcmRUeXBlTmFtZSA9IGV4cG9ydERhdGEucmVjVHlwZU5hbWU7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWUgPSBleHBvcnREYXRhLnRpbWU7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZHVsZUludGVyZmFjZSA9IGV4cG9ydERhdGEubW9kSW50ZXJmYWNlO1xyXG4gICAgICAgIHRoaXMuX21vZHVsZVR5cGUgPSBleHBvcnREYXRhLm1vZFR5cGU7XHJcbiAgICAgICAgdGhpcy5fbW9kdWxlQ2hhbm5lbCA9IGV4cG9ydERhdGEubW9kQ2hhbm5lbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fb2JqZWN0TmFtZSA9IGV4cG9ydERhdGEuYXBwbE9iamVjdDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9wYXJJZCA9IGV4cG9ydERhdGEucGFySWQ7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb25UZXh0ID0gZXhwb3J0RGF0YS5wYXJOYW1lO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gZXhwb3J0RGF0YS5wYXJWYWx1ZTsgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgbGlua2VkIFJlY29yZERhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJRHJpdmVMb2dFbnRyeUV4cG9ydERhdGFPcHRpb25hbH0gZXhwb3J0RGF0YVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRMaW5rZWRSZWNvcmREYXRhKGV4cG9ydERhdGE6IElEcml2ZUxvZ0VudHJ5RXhwb3J0RGF0YU9wdGlvbmFsKXtcclxuICAgICAgICB0aGlzLl9saW5rZWRSZWNvcmRUeXBlID0gZXhwb3J0RGF0YS5saW5rZWRSZWNUeXBlO1xyXG4gICAgICAgIGlmKHRoaXMuX2xpbmtlZFJlY29yZFR5cGUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0VmFsdWVzRm9yTGlua2VkUmVjb3JkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpbmtlZFJlY29yZFR5cGVOYW1lID0gZXhwb3J0RGF0YS5saW5rZWRSZWNUeXBlTmFtZTtcclxuICAgICAgICAgICAgaWYodGhpcy5fbGlua2VkUmVjb3JkVHlwZU5hbWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmtlZFJlY29yZFR5cGVOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5faXNMaW5rZWRSZWNvcmRWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmKGV4cG9ydERhdGEubGlua2VkUmVjUGFyTmFtZSAhPSB1bmRlZmluZWQgJiYgZXhwb3J0RGF0YS5saW5rZWRSZWNQYXJOYW1lICE9IGV4cG9ydERhdGEucGFyTmFtZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0xpbmtlZFJlY29yZFZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5faXNMaW5rZWRSZWNvcmRFcnJvciA9IGV4cG9ydERhdGEuaXNMaW5rZWRSZWNFcnJvcjtcclxuICAgICAgICAgICAgaWYodGhpcy5faXNMaW5rZWRSZWNvcmRFcnJvciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNMaW5rZWRSZWNvcmRFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9lcnJvclJlc3BvbnNlUGFyTmFtZSA9IGV4cG9ydERhdGEubGlua2VkUmVjUGFyTmFtZTtcclxuICAgICAgICAgICAgaWYodGhpcy5fZXJyb3JSZXNwb25zZVBhck5hbWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fZXJyb3JSZXNwb25zZVBhcklkID0gZXhwb3J0RGF0YS5saW5rZWRSZWNQYXJJZDtcclxuICAgICAgICAgICAgaWYodGhpcy5fZXJyb3JSZXNwb25zZVBhcklkID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvclJlc3BvbnNlUGFySWQgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRlZmF1bHQgZGF0YSBvZiBhIGxpbmtlZCByZWNvcmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXREZWZhdWx0VmFsdWVzRm9yTGlua2VkUmVjb3JkKCl7XHJcbiAgICAgICAgLy8gU2V0IGRlZmF1bHQgdmFsdWVzIGZvciBsaW5rZWRSZWNvcmQgaWYgbm90IGF2YWlsYWJsZVxyXG4gICAgICAgIHRoaXMuX2xpbmtlZFJlY29yZFR5cGUgPSAtMTtcclxuICAgICAgICB0aGlzLl9saW5rZWRSZWNvcmRUeXBlTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5faXNMaW5rZWRSZWNvcmRWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5faXNMaW5rZWRSZWNvcmRFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJOYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9lcnJvclJlc3BvbnNlUGFySWQgPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVuaXF1ZSBudW1iZXIgb2YgdGhlIGxvZ2dlciBlbnRyeVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmVjb3JkTnVtYmVyKCk6IG51bWJlcntcclxuICAgICAgICBpZih0aGlzLl9yZWNvcmROdW1iZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fcmVjb3JkTnVtYmVyID0gdGhpcy5fcGFyc2VkRW50cnkhLmluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVjb3JkTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbW9kdWxlIGRlc2NyaXB0aW9uIGZvciB0aGlzIGxvZ2dlciBlbnRyeSAoZS5nLiBQTEs6IFNMMS5JRjIuU1QxIChDSEFOIDIpKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbW9kdWxlKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9tb2R1bGUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbW9kdWxlID0gdGhpcy5nZXRNb2R1bGVGb3JtYXRlZCh0aGlzLmdldE1vZHVsZUludGVyZmFjZSgpLCB0aGlzLmdldE1vZHVsZVR5cGUoKSwgdGhpcy5nZXRNb2R1bGVDaGFubmVsKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kdWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0IChlLmcuIGdBeGlzMDEpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBvYmplY3ROYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9vYmplY3ROYW1lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX29iamVjdE5hbWUgPSB0aGlzLl9wYXJzZWRFbnRyeSEuY29tcG9uZW50TmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29iamVjdE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRydW5zIHRoZSBpbmZvIHdoaWNoIGlzIHVzZWQgZm9yIHRoZSBkZXNjcmlwdGlvbiBjb2x1bW4gZm9yIHRoZSBzZWFyY2ggYW5kIGZpbHRlcmluZyh0ZXh0cyB3aXRob3V0IHN0eWxpbmcpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkZXNjcmlwdGlvblJhd0RhdGEoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX2Rlc2NyaXB0aW9uUmF3RGF0YSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kZXNjcmlwdGlvblJhd0RhdGEgPSB0aGlzLmdldERlc2NyaXB0aW9uUmF3RGF0YSh0aGlzLmdldERlc2NyaXB0aW9uVGV4dCgpLCB0aGlzLmdldERlc2NyaXB0aW9uVmFsdWVXaXRoVW5pdCgpLCB0aGlzLmdldEFkZGl0aW9uYWxTZWFyY2hJbmZvKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb25SYXdEYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGlkIG9mIHRoZSBpY29uIHdoaWNoIG9uZSBzaG91bGQgYmUgc2hvd24gZm9yIHRoaXMgcmVjb3JkIFxyXG4gICAgICogSWYgcmVzcG9uc2UgYW5kIHJlcXVlc3QgaXMgYXZhaWxhYmxlIGFuZCB2YWxpZCB0aGUgaWRzIHdpbGwgYmUgYWRkZWQgd2l0aCBhIFwiX1wiIGJldHdlZW4gLT4gXCJpZDFfaWQyXCIpXHJcbiAgICAgKiBJZiByZXNwb25zZSBvZiByZXF1ZXN0IGlzIGludmFsaWQgYSBwb3N0Zml4IHdpbGwgYmUgYWRkZWQgLT4gXCJfaW52YWxpZFwiIGUuZy4gaWQxX2ludmFsaWRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlc2NyaXB0aW9uSWNvbklkKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9kZXNjcmlwdGlvbkljb25JZCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgaW52YWxpZExpbmtlZFJlY29yZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzUmVzcG9uc2VBdmFpbGFibGUoKSl7XHJcbiAgICAgICAgICAgICAgICBpbnZhbGlkTGlua2VkUmVjb3JkID0gIXRoaXMuaXNSZXNwb25zZVBhcklkVmFsaWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbkljb25JZCA9IERyaXZlTG9nRW50cnlIZWxwZXIuZ2VuZXJhdGVJY29uSWQodGhpcy5fcmVjb3JkVHlwZSwgdGhpcy5fbGlua2VkUmVjb3JkVHlwZSwgaW52YWxpZExpbmtlZFJlY29yZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbkljb25JZDtcclxuICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIG9ubHkgdGhlIGRlc2NyaXB0aW9uIHRleHQgd2l0aG91dCB0aGUgdmFsdWVcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERlc2NyaXB0aW9uVGV4dCgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fZGVzY3JpcHRpb25UZXh0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uVGV4dCA9IHRoaXMuZ2V0RGVzY3JpcHRpb25UZXh0RnJvbVJlY29yZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb25UZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBvbmx5IHRoZSBmb3JtYXRlZCBkZXNjcmlwdGlvbiB0ZXh0IChlLmcuIHJlZCBmb250IGNvbG9yKSB3aXRob3V0IHRoZSB2YWx1ZSBcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlc2NyaXB0aW9uVGV4dEZvcm1hdGVkKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9kZXNjcmlwdGlvblRleHRGb3JtYXRlZCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzRXJyb3JSZWNvcmQoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXNjcmlwdGlvblRleHRGb3JtYXRlZCA9IERyaXZlTG9nRW50cnlIZWxwZXIuc2V0U3R5bGVFcnJvcih0aGlzLmdldERlc2NyaXB0aW9uVGV4dCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzY3JpcHRpb25UZXh0Rm9ybWF0ZWQgPSB0aGlzLmdldERlc2NyaXB0aW9uVGV4dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvblRleHRGb3JtYXRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJ1bnMgdGhlIGZvcm1hdGVkIHZhbHVlIChlLmcuIHJlZCBmb250IGNvbG9yKSB3aXRoIHRoZSB1bml0XHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZXNjcmlwdGlvblZhbHVlV2l0aFVuaXRGb3JtYXRlZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fZGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0Rm9ybWF0ZWQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gb25seSBzaG93IHZhbHVlIGluIHJlZCBpZiByZXNwb25zRXJyb3IgYW5kIHJlYWQgcmVxdWVzdFxyXG4gICAgICAgICAgICBpZih0aGlzLmlzUmVzcG9uc2VFcnJvcigpICYmIHRoaXMuX3JlY29yZFR5cGUgPT0gNCl7IC8vIDQgLT4gcmVhZFJlcXVlc3RcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uVmFsdWVXaXRoVW5pdEZvcm1hdGVkID0gRHJpdmVMb2dFbnRyeUhlbHBlci5zZXRTdHlsZUVycm9yKHRoaXMuZ2V0RGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXNjcmlwdGlvblZhbHVlV2l0aFVuaXRGb3JtYXRlZCA9IHRoaXMuZ2V0RGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uVmFsdWVXaXRoVW5pdEZvcm1hdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZm9ybWF0ZWQgZXJyb3IgZGVzY3JpcHRpb24gXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgZ2V0RGVzY3JpcHRpb25FcnJvckZvcm1hdGVkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gRHJpdmVMb2dFbnRyeUhlbHBlci5zZXRTdHlsZUVycm9yKHRoaXMuZGVzY3JpcHRpb25FcnJvcigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRvb2x0aXAgdGV4dCBmb3IgdGhlIGRlc2NyaXB0aW9uIHRleHQgYW5kIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkZXNjcmlwdGlvblRvb2x0aXAoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX2Rlc2NyaXB0aW9uVG9vbHRpcCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kZXNjcmlwdGlvblRvb2x0aXAgPSB0aGlzLmdldERlc2NyaXB0aW9uVG9vbHRpcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb25Ub29sdGlwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdGltZSBvZiB0aGUgbG9nZ2VyIGVudHJ5XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0aW1lKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl90aW1lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgPSB0aGlzLl9wYXJzZWRFbnRyeSEudGltZS50b0ZpeGVkKDQpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdGltZSBkZWxheSBiZXR3ZWVuIHRoZSByZXF1ZXN0IGFuZCB0aGUgcmVzcG9uc2VcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJlc3BvbnNlVGltZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMuX3Jlc3BvbnNlVGltZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNwb25zZVRpbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9wYXJzZWRFbnRyeSEucmVzcG9uc2VFbnRyeSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzcG9uc2VUaW1lID0gKCh0aGlzLl9wYXJzZWRFbnRyeSEucmVzcG9uc2VFbnRyeS50aW1lIC0gdGhpcy5fcGFyc2VkRW50cnkhLnRpbWUpKjEwMDApLnRvRml4ZWQoMykudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcG9uc2VUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaXMgdGhlIGVudHJ5IGEgZXJyb3IgcmVjb3JkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0Vycm9yUmVjb3JkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYodGhpcy5faXNSZWNvcmRFcnJvciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9pc1JlY29yZEVycm9yID0gZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuX3BhcnNlZEVudHJ5O1xyXG4gICAgICAgICAgICBpZihyZWNvcmQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzUmVjb3JkRXJyb3IgPSByZWNvcmQuaXNFcnJvclJlY29yZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faXNSZWNvcmRFcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGlzIHRoZSBlbnRyeSByZXNwb25zZSBlcnJvciByZWNvcmQocmVzcG9uc2UgYXZhaWxhYmxlIGJ1dCByZXNwb25zZSBwYXIgaWQgbm90IHZhbGlkKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNSZXNwb25zZUVycm9yKCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYodGhpcy5faXNSZXNwb25zZUVycm9yID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzUmVzcG9uc2VFcnJvciA9IHRoaXMuaXNSZXNwb25zZUF2YWlsYWJsZSgpICYmICF0aGlzLmlzUmVzcG9uc2VQYXJJZFZhbGlkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1Jlc3BvbnNlRXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBtb2R1bGUgc3RyaW5nKCBpbnRlcmZhY2UsIHR5cGUsIGNoYW5uZWwsLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbW9kdWxlSW50ZXJmYWNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbW9kdWxUeXBlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW9kdWxDaGFubmVsXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNb2R1bGVGb3JtYXRlZChtb2R1bGVJbnRlcmZhY2U6IHN0cmluZywgbW9kdWxUeXBlOiBzdHJpbmcsIG1vZHVsQ2hhbm5lbDogbnVtYmVyKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBtb2R1bGVGb3JtYXRlZCA9IG1vZHVsZUludGVyZmFjZTtcclxuICAgICAgICBpZihtb2R1bFR5cGUgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIG1vZHVsZUZvcm1hdGVkICs9IFwiIChcIisgbW9kdWxUeXBlICsgXCIgXCIgKyBtb2R1bENoYW5uZWwgK1wiKVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9kdWxlRm9ybWF0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRydW5zIHRoZSBpbnRlcmZhY2UgbmFtZSBpbmNsLiBub2RlbnVtYmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1vZHVsZUludGVyZmFjZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fbW9kdWxlSW50ZXJmYWNlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21vZHVsZUludGVyZmFjZSA9IHRoaXMuZ2V0TW9kdWxlSW50ZXJmYWNlRnJvbVJlY29yZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kdWxlSW50ZXJmYWNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgbW9kdWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1vZHVsZVR5cGUoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX21vZHVsZVR5cGUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbW9kdWxlVHlwZSA9IHRoaXMuZ2V0TW9kdWxlVHlwZUZyb21SZWNvcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZHVsZVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjaGFubmVsIG9mIHRoZSBtb2R1bGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TW9kdWxlQ2hhbm5lbCgpOiBudW1iZXJ7XHJcbiAgICAgICAgaWYodGhpcy5fbW9kdWxlQ2hhbm5lbCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tb2R1bGVDaGFubmVsID0gdGhpcy5nZXRNb2R1bGVDaGFubmVsRnJvbVJlY29yZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kdWxlQ2hhbm5lbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGludGVyZmFjZW5hbWUgaW5jbC4gbm9kZW51bWJlciBmcm9tIG53Y3QgZW50cnlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TW9kdWxlSW50ZXJmYWNlRnJvbVJlY29yZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlZEVudHJ5IS5uZXR3b3JrSW50ZXJmYWNlICsgdGhpcy5nZXROb2RlTnVtYmVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVzY3JpcHRpb24gcmF3IGRhdGEsIG5lZWRlZCBmb3Igc2VhcmNoIGFuIGZpbHRlcmluZzsgZS5nICBwYXJhbSBuYW1lLCBwYXJhbSB2YWx1ZSwgYWRkaXRpb25hbCBpbmZvIGxpa2UgZXJyb3JudW1iZXIsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfHVuZGVmaW5lZCl9IGRlc2NyaXB0aW9uVGV4dFxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfHVuZGVmaW5lZCl9IGRlc2NyaXB0aW9uVmFsdWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRpdGlvbmFsU2VhcmNoSW5mb1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RGVzY3JpcHRpb25SYXdEYXRhKGRlc2NyaXB0aW9uVGV4dDogc3RyaW5nfHVuZGVmaW5lZCwgZGVzY3JpcHRpb25WYWx1ZTogc3RyaW5nfHVuZGVmaW5lZCwgYWRkaXRpb25hbFNlYXJjaEluZm86IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICBpZihkZXNjcmlwdGlvblRleHQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZGVzY3JpcHRpb25UZXh0ID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGVzY3JpcHRpb25WYWx1ZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBkZXNjcmlwdGlvblZhbHVlID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uVGV4dCArIFwiIFwiICsgZGVzY3JpcHRpb25WYWx1ZSArIFwiIFwiICsgYWRkaXRpb25hbFNlYXJjaEluZm87XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgb25seSB0aGUgdmFsdWUgd2l0aG91dCB0aGUgZGVzY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREZXNjcmlwdGlvblZhbHVlV2l0aFVuaXQoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX2Rlc2NyaXB0aW9uVmFsdWVXaXRoVW5pdCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kZXNjcmlwdGlvblZhbHVlV2l0aFVuaXQgPSBEcml2ZUxvZ0VudHJ5SGVscGVyLmNvbWJpbmVWYWx1ZVdpdGhVbml0KHRoaXMuZ2V0VmFsdWUoKSwgdGhpcy5nZXRVbml0KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGVycm9yIGRlc2NyaXB0aW9uIHdpdGhvdXQgZm9ybWF0aW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlc2NyaXB0aW9uRXJyb3IoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX2Rlc2NyaXB0aW9uRXJyb3IgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGVzY3JpcHRpb25FcnJvciA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNSZXNwb25zZUVycm9yKCkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuX3BhcnNlZEVudHJ5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3JSZXNwb25zZVBhck5hbWUgPSByZWNvcmQhLnJlc3BvbnNlRW50cnkhLnBhcklkTmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJJZCA9IHJlY29yZD8ucmVzcG9uc2VFbnRyeT8ucGFySWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZGVzY3JpcHRpb25FcnJvciA9IHRoaXMuZ2V0RGVzY3JpcHRpb25FcnJvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb25FcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlc2NyaXB0aW9uIGVycm9yXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERlc2NyaXB0aW9uRXJyb3IoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX2Vycm9yUmVzcG9uc2VQYXJOYW1lICE9IHVuZGVmaW5lZCAmJiB0aGlzLl9lcnJvclJlc3BvbnNlUGFyTmFtZSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc1Jlc3BvbnNlRXJyb3JSZWMoKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXJyb3JSZXNwb25zZVBhck5hbWU7IC8vIE9ubHkgcmV0dXJuIHRoZSBwYXJhbWV0ZXIgbmFtZSBpZiByZXNwb25zZSBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmIHJlc3BvbnNlIHBhciBpZCBpcyBkaWZmZXJlbnQgdG8gcmVxdWVzdCBwYXIgaWQgLT4gc2hvdyBzcGVjaWFsIGVycm9yXHJcbiAgICAgICAgICAgIHJldHVybiBcIihFcnJvcjogUmVzcFBhcklEPVwiICsgdGhpcy5fZXJyb3JSZXNwb25zZVBhck5hbWUgKyBcIilcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZXNjcmlwdGlvbiB0ZXh0IHdpdGhvdXQgdGhlIHZhbHVlKHdpdGggb3Igd2l0aG91dCBzdHlsaW5nKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREZXNjcmlwdGlvblRleHRGcm9tUmVjb3JkKCk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5fcGFyc2VkRW50cnk7XHJcbiAgICAgICAgaWYocmVjb3JkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNvcmQucGFySWROYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJ1bnMgdGhlIHBhciBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQYXJJZCgpOiBudW1iZXJ7XHJcbiAgICAgICAgaWYodGhpcy5fcGFySWQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuX3BhcnNlZEVudHJ5O1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJJZCA9IHJlY29yZCEucGFySWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgb25seSB0aGUgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VmFsdWUoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX3ZhbHVlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5nZXRWYWx1ZUZyb21SZWNvcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIG9ubHkgdGhlIHVuaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VW5pdCgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fdW5pdCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl91bml0ID0gdGhpcy5nZXRVbml0RnJvbVJlY29yZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdW5pdDsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXJhbWV0ZXIgaXMgYSBiaXRQYXR0ZXJuIGFuZCBoYXMgc29tZSBiaXRQYXR0ZXJuIGluZm9zIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNCaXRQYXR0ZXJuKCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYodGhpcy5faXNCaXRQYXR0ZXJuID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSB0aGlzLl9wYXJzZWRFbnRyeTtcclxuICAgICAgICAgICAgdGhpcy5faXNCaXRQYXR0ZXJuID0gcmVjb3JkIS5pc0JpdFBhdHRlcm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0JpdFBhdHRlcm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSB3aGljaCBzaG91bGQgYmUgc2hvd24gZm9yIHRoZSBnaXZlbiByZWNvcmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VmFsdWVGcm9tUmVjb3JkKCk6c3RyaW5ne1xyXG4gICAgICAgIGxldCByZWNvcmQgPSB0aGlzLl9wYXJzZWRFbnRyeTtcclxuICAgICAgICBpZih0aGlzLmlzUmVzcG9uc2VBdmFpbGFibGUoKSl7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IFwiXCI7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2xpbmtlZFJlY29yZFR5cGUgPT0gNSl7IC8vIFwiUkRfUlNQXCIgPT4gUmVhZFJlc3BvbnNlID0+IHNob3cgdGhlIHZhbHVlIGZyb20gdGhlIHJlc3BvbnNlIGFuZCBub3QgZnJvbSB0aGUgcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm1hdGVkVmFsdWUgPSByZWNvcmQhLnJlc3BvbnNlRW50cnkhLmZvcm1hdGVkVmFsdWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGZvcm1hdGVkVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gcmVjb3JkIS5mb3JtYXRlZFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYocmVjb3JkIS5pc1Jlc3BvbnNlICYmIHRoaXMuX3JlY29yZFR5cGUgPT0gMyl7IC8vIFwiV1JfUlNQXCIgPT4gV3JpdGVSZXNwb25zZSA9PiBkb24ndCBzaG93IHRoZSB2YWx1ZSBiZWNhdXNlIGl0IGlzIG9ubHkgc2hvd24gaW4gdGhlIHdyaXRlIHJlcXVlc3RcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5fcmVjb3JkVHlwZSA9PSA0KXsgLy8gXCJSRF9SRVFcIiA9PiBSZWFkUmVxdWVzdCA9PiBkb24ndCBzaG93IHRoZSB2YWx1ZSBiZWNhdXNlIGl0IGlzIG9ubHkgYSByZWFkIHJlcXVlc3QgKGFuZCBub3QgdGhlIGFscmVhZHkgcmVhZCB2YWx1ZSBmcm9tIHRoZSByZXNwb25zZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWNvcmQhLmZvcm1hdGVkVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB1bml0IGZyb20gdGhlIG53Y3QgZW5yeSB3aGljaCBzaG91bGQgYmUgc2hvd24gZm9yIHRoZSBnaXZlbiByZWNvcmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VW5pdEZyb21SZWNvcmQoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuX3BhcnNlZEVudHJ5O1xyXG4gICAgICAgIGlmKHRoaXMuaXNSZXNwb25zZUF2YWlsYWJsZSgpKXtcclxuICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlID0gXCJcIjsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5fbGlua2VkUmVjb3JkVHlwZSA9PSA1KXsgLy8gXCJSRF9SU1BcIiA9PiBSZWFkUmVzcG9uc2UgPT4gc2hvdyB0aGUgdmFsdWUvdW5pdCBmcm9tIHRoZSByZXNwb25zZSBhbmQgbm90IGZyb20gdGhlIHJlcXVlc3RcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gcmVjb3JkIS5yZXNwb25zZUVudHJ5IS51bml0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHJlY29yZCEudW5pdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHJlY29yZCEuaXNSZXNwb25zZSAmJiB0aGlzLl9yZWNvcmRUeXBlID09IDMpeyAvLyBcIldSX1JTUFwiID0+IFdyaXRlUmVzcG9uc2UgPT4gZG9uJ3Qgc2hvdyB0aGUgdmFsdWUvdW5pdCBiZWNhdXNlIGl0IGlzIG9ubHkgc2hvd24gaW4gdGhlIHdyaXRlIHJlcXVlc3RcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5fcmVjb3JkVHlwZSA9PSA0KXsgLy8gXCJSRF9SRVFcIiA9PiBSZWFkUmVxdWVzdCA9PiBkb24ndCBzaG93IHRoZSB2YWx1ZS91bml0IGJlY2F1c2UgaXQgaXMgb25seSBhIHJlYWQgcmVxdWVzdCAoYW5kIG5vdCB0aGUgYWxyZWFkeSByZWFkIHZhbHVlIGZyb20gdGhlIHJlc3BvbnNlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZCEudW5pdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgc29tZSB0ZXh0IHdoaWNoIHNob3VsZCBhbHNvIGJlIHVzZWQgZm9yIHRoZSBzZWFyY2gvZmlsdGVyIG1lY2hhbmlzbXMoZS5nLiBlcnJvck51bWJlciwgZXJyb3IgZGVzY3JpcHRpb24pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEFkZGl0aW9uYWxTZWFyY2hJbmZvKCk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgZXJyb3JOdW1iZXIgPSB0aGlzLmdldEFkZHRpb25hbERhdGEoKS5tZXJnZWREYXRhPy5lcnJvckluZm8/LmVycm9yTnVtYmVyO1xyXG4gICAgICAgIGxldCBhZGRpdGlvbmFsRGF0YSA9IFwiXCI7XHJcbiAgICAgICAgaWYoZXJyb3JOdW1iZXIgIT0gdW5kZWZpbmVkICYmIGVycm9yTnVtYmVyICE9IC0xKXtcclxuICAgICAgICAgICBhZGRpdGlvbmFsRGF0YSA9IGVycm9yTnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuZGVzY3JpcHRpb25FcnJvcigpICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAvLyBBZGQgZXJyb3IgZGVzY3JpcHRpb24gdG8gc2VhcmNoIGluZm9cclxuICAgICAgICAgICAgaWYoYWRkaXRpb25hbERhdGEgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF0YSArPSBcIiBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsRGF0YSArPSB0aGlzLmRlc2NyaXB0aW9uRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxEYXRhO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGRlc2NyaXB0aW9uIHRvb2x0aXAgdGV4dFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREZXNjcmlwdGlvblRvb2x0aXAoKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCB0b29sdGlwID0gRHJpdmVMb2dFbnRyeUhlbHBlci5nZXRNYWluRGVzY3JpcHRpb25Ub29sdGlwKHRoaXMuZ2V0TWVyZ2VkUmVjb3JkVHlwZU5hbWUoKSwgdGhpcy5nZXRQYXJJZCgpKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgcGFyYW1ldGVyIG5hbWUgYW5kIHZhbHVlIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgIHRvb2x0aXAgKz0gdGhpcy5nZXREZXNjcmlwdGlvblRleHRGb3JtYXRlZCgpO1xyXG4gICAgICAgIC8vIGFkZCB2YWx1ZSBvbmx5IGlmIGl0IGlzIG5vdCBhIGJpdHBhdHRlcm4gdmFsdWVcclxuICAgICAgICBpZih0aGlzLmdldERlc2NyaXB0aW9uVmFsdWVXaXRoVW5pdEZvcm1hdGVkKCkgIT0gXCJcIiAmJiAhdGhpcy5pc0JpdFBhdHRlcm4oKSl7XHJcbiAgICAgICAgICAgIHRvb2x0aXAgKz0gXCIgPSBcIiArIHRoaXMuZ2V0RGVzY3JpcHRpb25WYWx1ZVdpdGhVbml0Rm9ybWF0ZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZvcm1hdCB0aGUgYWRkaXRpb25hbERhdGEocGFyYW1Hcm91cHMgZGF0YSwgYml0bWFzayBkYXRhLCAuLi4pXHJcbiAgICAgICAgbGV0IHRvb2x0aXBGb3JSZWNvcmQgPSBEcml2ZUxvZ0VudHJ5SGVscGVyLmdldEFkZGl0aW9uYWxEZXNjcmlwdGlvblRvb2x0aXAodGhpcy5nZXRBZGR0aW9uYWxEYXRhKCkubWVyZ2VkRGF0YSk7XHJcbiAgICAgICAgaWYodG9vbHRpcEZvclJlY29yZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgdG9vbHRpcCArPSBcIjxici8+XCI7XHJcbiAgICAgICAgICAgIHRvb2x0aXAgKz0gdG9vbHRpcEZvclJlY29yZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRvb2x0aXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBhZGRpdGlvbmFsIGRhdGEgZm9yIHRoaXMgZW50cnkoZS5nLiBlcnJvciBpbmZvLCBwYXJhbSBncm91cCBpbmZvLCBiaXQgbWFzayBpbmZvKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7QWRkaXRpb25hbERhdGF9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEFkZHRpb25hbERhdGEoKTogQWRkaXRpb25hbERhdGF7XHJcbiAgICAgICAgaWYodGhpcy5fYWRkaXRpb25hbERhdGEgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuX3BhcnNlZEVudHJ5O1xyXG4gICAgICAgICAgICBsZXQgYWRkaXRpb25hbERhdGEgPSBuZXcgQWRkaXRpb25hbERhdGEoKTtcclxuICAgICAgICAgICAgLy8gQWRkIHRvb2x0aXAgaW5mbyBvZiByZXF1ZXN0IGlmIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBpZigoIXRoaXMuaXNFcnJvclJlY29yZCgpICYmIHRoaXMuX3JlY29yZFR5cGUgIT0gNCkgfHwgKCF0aGlzLmlzUmVzcG9uc2VBdmFpbGFibGUoKSkpeyBcclxuICAgICAgICAgICAgICAgIC8vIHNob3cgaW5mbyBpZiBubyByZXNwb25zZSBpcyBhdmFpbGFibGUgb3JcclxuICAgICAgICAgICAgICAgIC8vIHNob3cgaW5mbyBpZiBpdCBpcyBub3QgYW4gcmVhZCBlcnJvciByZXF1ZXN0ID0+IGZvciByZWFkIGVycm9yIHJlcXVlc3QgdGhlIGRhdGEgd2lsbCBiZSB1c2VkIGZyb20gdGhlIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0QWRkaXRpb25hbERhdGFGb3JSZWNvcmQocmVjb3JkISk7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbERhdGEuYWRkRGF0YShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBZGQgdG9vbHRpcCBpbmZvIG9mIHJlc3BvbnNlIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBpZih0aGlzLmlzUmVzcG9uc2VBdmFpbGFibGUoKSAmJiAodGhpcy5fcmVjb3JkVHlwZSAhPSAyIHx8IHRoaXMuaXNSZXNwb25zZUVycm9yUmVjKCkpKXsgLy9cIldSX1JFUVwiIHdyaXRlIHZhbHVlIGFscmVhZHkgc2hvd24gZnJvbSByZXF1ZXN0IGRhdGE7IG9ubHkgc2hvdyBlcnJvciBkYXRhIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldEFkZGl0aW9uYWxEYXRhRm9yUmVjb3JkKHJlY29yZCEucmVzcG9uc2VFbnRyeSEpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxEYXRhLmFkZERhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYWRkaXRpb25hbERhdGEgPSBhZGRpdGlvbmFsRGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZGl0aW9uYWxEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRvb2x0aXAgZGF0YSBmb3IgdGhlIGdpdmVuIHJlY29yZChyZXF1ZXN0IG9yIHJlc3BvbnNlKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lOd2N0RW50cnl9IHJlY29yZFxyXG4gICAgICogQHJldHVybnMgeyhJQWRkaXRpb25hbERhdGF8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QWRkaXRpb25hbERhdGFGb3JSZWNvcmQocmVjb3JkOiBJTndjdEVudHJ5KTogSUFkZGl0aW9uYWxEYXRhfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgcGFyR3JvdXA6IEFycmF5PElOd2N0UGFyYW1Hcm91cEluZm8+fHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgZXJyb3JJbmZvOiBJTndjdEVycm9ySW5mb3x1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGJpdFBhdHRlcm46IEFycmF5PElOd2N0Qml0RGVmaW5pdGlvbj58dW5kZWZpbmVkO1xyXG4gICAgICAgIGlmKHJlY29yZC5pc1BhcmFtZXRlckdyb3VwKXtcclxuICAgICAgICAgICAgLy8gU2hvdyBwYXJhbWV0ZXJHcm91cCBpbmZvIGluIGNhc2Ugb2YgcGFyYW1ldGVyIGdyb3VwXHJcbiAgICAgICAgICAgIGxldCBwYXJHcm91cERlc2NyaXB0aW9uRGF0YSA9IHJlY29yZC5wYXJhbWV0ZXJHcm91cERlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHBhckdyb3VwRGVzY3JpcHRpb25EYXRhKSl7XHJcbiAgICAgICAgICAgICAgICBwYXJHcm91cCA9IHBhckdyb3VwRGVzY3JpcHRpb25EYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBlcnJvckluZm8gPSBwYXJHcm91cERlc2NyaXB0aW9uRGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZWNvcmQuaXNCaXRQYXR0ZXJuKXtcclxuICAgICAgICAgICAgLy8gQWRkIHBhcmFtZXRlciBuYW1lIGluIGNhc2Ugb2YgYml0cGF0dGVyblxyXG4gICAgICAgICAgICBiaXRQYXR0ZXJuID0gcmVjb3JkLmJpdFBhdHRlcm5EZXNjcmlwdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGFyR3JvdXAgPT0gdW5kZWZpbmVkICYmIGJpdFBhdHRlcm4gPT0gdW5kZWZpbmVkICYmIGVycm9ySW5mbyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YSA9IHtwYXJHcm91cDogcGFyR3JvdXAsIGVycm9ySW5mbzogZXJyb3JJbmZvLCBiaXRQYXR0ZXJuOiBiaXRQYXR0ZXJufTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG5vZGUgbnVtYmVyIHRvIHdoaWNoIHRoZSBsb2dnZXIgZW50cnkgYmVsb25ncyB0b1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXROb2RlTnVtYmVyKCk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgbm9kZU51bWJlciA9IHRoaXMuX3BhcnNlZEVudHJ5IS5ub2RlTnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYobm9kZU51bWJlciA9PSBcIjBcIil7IC8vIGlmIG5vZGUgbnVtYmVyIGlzIDAgZG9uJ3Qgc2hvdyA9PiBlLmcuIE5DTUFOXHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCIuU1RcIiArIG5vZGVOdW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjaGFubmVsIG9mIHRoZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0VudHJ5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TW9kdWxlQ2hhbm5lbEZyb21SZWNvcmQoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJzZWRFbnRyeSEuY2hhbm5lbE51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG9iamVjdCB0eXBlIChlLmcuIEFYSVMsIFZBWElTLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1vZHVsZVR5cGVGcm9tUmVjb3JkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VkRW50cnkhLmNvbXBvbmVudFR5cGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdG9vbHRpcCB0ZXh0IGZvciB0aGUgcmVjb3JkIHR5cGUoZS5nLiBcIldyaXRlIFJlcXVlc3RcIiwgLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICAgcHJpdmF0ZSBnZXRNZXJnZWRSZWNvcmRUeXBlTmFtZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fbWVyZ2VkUmVjb3JkVHlwZU5hbWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc1Jlc3BvbnNlQXZhaWxhYmxlKCkpe1xyXG4gICAgICAgICAgICAgICAgLy8gUmVzcG9uc2UgaXMgYXZhaWxhYmxlIC0+IFNob3cgcmVxdWVzdC9yZXNwb25zZSBtZXJnZWQgdGV4dFxyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlVGV4dCA9IHRoaXMuX2xpbmtlZFJlY29yZFR5cGVOYW1lITtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmZkNoYXJJbmRleCA9IERyaXZlTG9nRW50cnlIZWxwZXIuZmluZEZpcnN0RGlmZmVyZW50Q2hhcih0aGlzLl9yZWNvcmRUeXBlTmFtZSEsIHJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZihkaWZmQ2hhckluZGV4ID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0ID0gcmVzcG9uc2VUZXh0LnN1YnN0cihkaWZmQ2hhckluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gc2hvdyByZXNwb25zZSB0ZXh0IGluIHJlZCBhbmQgYWRkIGVycm9yIGlmIHJlc3BvbnNlIGlzIGludmFsaWRcclxuICAgICAgICAgICAgICAgIHRoaXMuX21lcmdlZFJlY29yZFR5cGVOYW1lID0gdGhpcy5fcmVjb3JkVHlwZU5hbWUgKyBcIi9cIiArIHJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWVyZ2VkUmVjb3JkVHlwZU5hbWUgPSB0aGlzLl9yZWNvcmRUeXBlTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmlzUmVzcG9uc2VFcnJvcigpKXsgXHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZVN0YXJ0SW5kZXggPSB0aGlzLl9tZXJnZWRSZWNvcmRUeXBlTmFtZSEuaW5kZXhPZihcIi9cIik7XHJcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlU3RhcnRJbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxdWVzdFRleHQgPSB0aGlzLl9tZXJnZWRSZWNvcmRUeXBlTmFtZSEuc3Vic3RyKDAscmVzcG9uc2VTdGFydEluZGV4KzEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlVGV4dCA9IHRoaXMuX21lcmdlZFJlY29yZFR5cGVOYW1lIS5zdWJzdHIocmVzcG9uc2VTdGFydEluZGV4KzEpO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0ID0gRHJpdmVMb2dFbnRyeUhlbHBlci5zZXRTdHlsZUVycm9yKHJlc3BvbnNlVGV4dCArIFwiIEVycm9yXCIpOyAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0VGV4dCArIHJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21lcmdlZFJlY29yZFR5cGVOYW1lITtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lcmdlZFJlY29yZFR5cGVOYW1lITtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBhIHJlc3BvbnNlIGlzIGF2YWlsYWJsZSBmb3IgdGhlIGdpdmVuIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzUmVzcG9uc2VBdmFpbGFibGUoKTogYm9vbGVhbntcclxuICAgICAgICBpZih0aGlzLl9saW5rZWRSZWNvcmRUeXBlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2xpbmtlZFJlY29yZFR5cGUgICE9IC0xKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gcmVzcG9uc2UgaXMgdmFsaWQgZm9yIHRoZSBnaXZlbiByZXF1ZXN0KHNhbWUgY29tbWFuZC9wYXJhbWV0ZXJJZCBmb3IgcmVxdWVzdCBhbmQgcmVzcG9uc2UpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRW50cnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1Jlc3BvbnNlUGFySWRWYWxpZCgpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuX2lzTGlua2VkUmVjb3JkVmFsaWQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzTGlua2VkUmVjb3JkVmFsaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cnVucyB0cnVlIGlmIGEgcmVzcG9uc2UgZXJyb3IsIGVsc2UgZmFsc2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dFbnRyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzUmVzcG9uc2VFcnJvclJlYygpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuX2lzTGlua2VkUmVjb3JkRXJyb3IgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuX3BhcnNlZEVudHJ5O1xyXG4gICAgICAgICAgICB0aGlzLl9pc0xpbmtlZFJlY29yZEVycm9yID0gcmVjb3JkIS5yZXNwb25zZUVudHJ5IS5pc0Vycm9yUmVjb3JkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faXNMaW5rZWRSZWNvcmRFcnJvcjtcclxuICAgIH1cclxufSJdfQ==