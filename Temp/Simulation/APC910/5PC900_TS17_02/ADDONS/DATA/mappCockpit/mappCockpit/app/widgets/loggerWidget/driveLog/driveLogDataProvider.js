var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../../models/online/mappCockpitComponent", "../../../common/fileProvider", "../interfaces/loggerDataProviderInterface", "./driveLogDataModel", "../../../common/nwctProvider/nwctProvider", "../dataLoadingProgressArgs", "../../../common/nwctProvider/nwctMetaDataProvider", "../../../common/nwctProvider/nwctDynamicMetaData", "../../../common/nwctProvider/nwctStaticMetaData", "../../../common/nwctProvider/brModuleParser", "../../../common/zipContainer", "../../common/alertDialog"], function (require, exports, mappCockpitComponent_1, fileProvider_1, loggerDataProviderInterface_1, driveLogDataModel_1, nwctProvider_1, dataLoadingProgressArgs_1, nwctMetaDataProvider_1, nwctDynamicMetaData_1, nwctStaticMetaData_1, brModuleParser_1, zipContainer_1, alertDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements some functionality to export/import or upload some network command trace data
     *
     * @export
     * @class DriveLogDataProvider
     */
    var DriveLogDataProvider = /** @class */ (function () {
        /**
         * Creates an instance of DriveLogDataProvider
         * @memberof DriveLogDataProvider
         */
        function DriveLogDataProvider() {
            var _this = this;
            /**
             * Event handler for the file provider when loading data from file is finished
             *
             * @private
             * @memberof DriveLogDataProvider
             */
            this._uploadDataFinishedHandler = function (sender, args) { return _this.onUploadDataFinished(sender, args); };
            /**
             * Event handler for namespaces for textsystem loading finished
             *
             * @private
             * @memberof DriveLogDataProvider
             */
            this._namespacesLoadedHandler = function (sender, args) { return _this.onNamespacesLoaded(sender, args); };
            /**
             * Event handler for data zipped
             *
             * @private
             * @memberof DriveLogDataProvider
             */
            this._dataZippedHandler = function (sender, zippedData) { return _this.onDataZippedHandler(sender, zippedData); };
            /**
             * Event handler for data unzipped
             *
             * @private
             * @memberof DriveLogDataProvider
             */
            this._dataUnzippedHandler = function (sender, unzippedData) { return _this.onDataUnzippedHandler(sender, unzippedData); };
            /**
             * Event to inform when some data is available(e.g. loading from file or from target)
             *
             * @memberof DriveLogDataProvider
             */
            this.eventDataAvailable = new loggerDataProviderInterface_1.EventDataAvailable();
            /**
             * Event to inform how many data is already loaded(e.g. 0%, 10%, ...., 100%);
             *
             * @memberof DriveLogDataProvider
             */
            this.eventDataLoadingProgressChanged = new loggerDataProviderInterface_1.EventDataLoadingProgress();
            this._fileProvider = new fileProvider_1.FileProvider(true);
        }
        /**
         * Is there some data available to export something
         *
         * @returns {boolean}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.isExportPossible = function () {
            return true;
        };
        /**
         * Dispose the DriveLogDataProvider instance
         *
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.dispose = function () {
        };
        DriveLogDataProvider.prototype.setComponentMethods = function (componentMethods) {
            this.onDriveLogComponentMethodsUpdated(componentMethods);
        };
        /**
         * The drive log component methods have been updated ...
         *
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.onDriveLogComponentMethodsUpdated = function (componentMethods) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._createDriveLogSnapshotMethod = componentMethods.filter(function (method) { return method.browseName == DriveLogDataProvider.createDriveLogSnapshotMethodName; })[0];
                            this._getDriveLogSnapshotMethod = componentMethods.filter(function (method) { return method.browseName == DriveLogDataProvider.getDriveLogSnapshotMethodName; })[0];
                            this._getDriveLogConfigInfoMethod = componentMethods.filter(function (method) { return method.browseName == DriveLogDataProvider.getDriveLogConfigInfoMethodName; })[0];
                            if (!(this._getDriveLogSnapshotMethod != undefined)) return [3 /*break*/, 2];
                            // update the methods input parameters
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(this._getDriveLogSnapshotMethod)];
                        case 1:
                            // update the methods input parameters
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!(this._getDriveLogConfigInfoMethod != undefined)) return [3 /*break*/, 4];
                            // update the methods input parameters
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(this._getDriveLogConfigInfoMethod)];
                        case 3:
                            // update the methods input parameters
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Uploads the network command trace data from target (eventUploadDataFinished will be raise))
         *
         * @returns
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.uploadDataFromTarget = function () {
            return __awaiter(this, void 0, void 0, function () {
                var dataAvailable, ref, currentNwctBinData, dynamicMetaData, staticMetaDataFromTarget;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this._createDriveLogSnapshotMethod != undefined && this._getDriveLogSnapshotMethod != undefined)) return [3 /*break*/, 10];
                            // create network command trace snapshot on target
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._createDriveLogSnapshotMethod)];
                        case 1:
                            // create network command trace snapshot on target
                            _a.sent();
                            return [4 /*yield*/, this.dataAvailable()];
                        case 2:
                            dataAvailable = _a.sent();
                            if (!dataAvailable) return [3 /*break*/, 8];
                            ref = { data: new Uint8Array() };
                            return [4 /*yield*/, this.getNwctData(ref)];
                        case 3:
                            _a.sent();
                            currentNwctBinData = ref.data;
                            return [4 /*yield*/, this.getDynamicMetaData()];
                        case 4:
                            dynamicMetaData = _a.sent();
                            if (!(this._nwctMetaDataProvider == undefined)) return [3 /*break*/, 6];
                            this._nwctMetaDataProvider = new nwctMetaDataProvider_1.NwctMetaDataProvider();
                            return [4 /*yield*/, this.getStaticMetaData()];
                        case 5:
                            staticMetaDataFromTarget = _a.sent();
                            this._nwctMetaDataProvider.setStaticMetaData(staticMetaDataFromTarget);
                            _a.label = 6;
                        case 6:
                            // Set dynamic data(network interface names, component names, ...) for every new upload of network command trace data
                            this._nwctMetaDataProvider.setDynamicMetaData(dynamicMetaData);
                            return [4 /*yield*/, this.createNwctProvider(currentNwctBinData, this._nwctMetaDataProvider)];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            console.error("No network command trace data available!");
                            _a.label = 9;
                        case 9: return [3 /*break*/, 11];
                        case 10:
                            console.error("DriveLog component methods not loaded!");
                            _a.label = 11;
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Returns the static meta data from target (OPC UA methods)
         *
         * @private
         * @returns {(Promise<NwctStaticMetaData|undefined>)}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getStaticMetaData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var acoposParameterStaticData, errorInfoStaticData, refMetaData, staticdata, refMetaDataErrorInfo, errorInfoStaticdata;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            acoposParameterStaticData = undefined;
                            errorInfoStaticData = undefined;
                            refMetaData = { data: "" };
                            return [4 /*yield*/, this.getNwctStaticMetaDataAcoposParameter(refMetaData)];
                        case 1:
                            _a.sent();
                            staticdata = refMetaData.data;
                            // create json objects
                            try {
                                acoposParameterStaticData = JSON.parse(staticdata);
                            }
                            catch (e) {
                                console.error("Problem with data from GetDriveLogConfigInfo with id 2!");
                                console.error(e);
                            }
                            refMetaDataErrorInfo = { data: "" };
                            return [4 /*yield*/, this.getNwctStaticMetaDataErrorInfo(refMetaDataErrorInfo)];
                        case 2:
                            _a.sent();
                            errorInfoStaticdata = refMetaDataErrorInfo.data;
                            // create json objects
                            try {
                                errorInfoStaticData = JSON.parse(errorInfoStaticdata);
                            }
                            catch (e) {
                                console.error("Problem with data from GetDriveLogConfigInfo with id 3!");
                                console.error(e);
                            }
                            // load data into satic metaData object
                            return [2 /*return*/, new nwctStaticMetaData_1.NwctStaticMetaData(acoposParameterStaticData, errorInfoStaticData)];
                    }
                });
            });
        };
        /**
         * Returns the dynamic meta data from the target (OPC UA methods)
         *
         * @private
         * @returns {(Promise<NwctDynamicMetaData|undefined>)}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getDynamicMetaData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var refMetaData, dyndata, mappMotionArConfigObject;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            refMetaData = { data: "" };
                            return [4 /*yield*/, this.getNwctDynamicMetaData(refMetaData)];
                        case 1:
                            _a.sent();
                            dyndata = refMetaData.data;
                            mappMotionArConfigObject = undefined;
                            try {
                                mappMotionArConfigObject = JSON.parse(dyndata);
                            }
                            catch (e) {
                                console.error("Problem with data from GetDriveLogConfigInfo with id 1!");
                                console.error(e);
                            }
                            // load data into dynamic metaData object
                            return [2 /*return*/, new nwctDynamicMetaData_1.NwctDynamicMetaData(mappMotionArConfigObject)];
                    }
                });
            });
        };
        /**
         * Exports the network command trace data from target to a file
         *
         * @memberof DriveLogDataProvider
         */
        /*public async exportUploadNetworkCommandTrace(){
            if(this._createDriveLogSnapshotMethod != undefined && this._getDriveLogSnapshot != undefined){
                        
                // create network command trace snapshot on target
                await MappCockpitComponentMethod.execute(this._createDriveLogSnapshotMethod);
    
                let dataAvailable = await this.dataAvailable();
                if(dataAvailable){
                    // get network command trace snapshot from target
                    let ref = {data: new Blob()};
                    await this.createNetworkCommandTraceData(ref);
    
                    // download network command trace snapshot
                    FileProvider.downloadData("DriveLogSnapShot" + FileProvider.BinFileExt, ref.data);
                }
                else{
                    console.error("No network command trace data available!");
                }
            }
        }*/
        /**
         * Exports the last imported/uploaded network command trace data to a file
         *
         * @memberof DriveLogDataProvider
         */
        /*public exportCurrentDataToFile(){
            let binBlobData = this.getCurrentBinDataAsBlob();
            if(binBlobData != undefined){
                // download current etwork command trace snapshot(uploaded or imported)
                FileProvider.downloadData("DriveLogSnapShot" + FileProvider.BinFileExt, binBlobData);
            }
        }*/
        /**
         * Export the dat to zip file
         *
         * @param {Blob} data
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.exportDataToFile = function (data) {
            if (data != undefined) {
                // Raise start exporting event 0%
                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.exportToFileType, 0));
                // Start compressing data
                this.zipData(data);
            }
        };
        /**
         * Compress data and save to file
         *
         * @private
         * @param {Blob} data
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.zipData = function (data) {
            var zipContainer = new zipContainer_1.ZipContainer();
            zipContainer.addFile("DriveLog.json", data);
            zipContainer.eventDataZipped.attach(this._dataZippedHandler);
            zipContainer.zipData();
        };
        /**
         * Imports some network command trace data from a file
         * Shows an file explorer to select a file and starts loading the file data (eventUploadDataFinished will be raise)
         *
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.importDataFromFile = function () {
            this._fileProvider.eventUploadDataFinished.attach(this._uploadDataFinishedHandler);
            this._fileProvider.uploadData(fileProvider_1.FileProvider.DriveLogExportFileExt + "," + fileProvider_1.FileProvider.BrFileExt);
        };
        /**
         * Occurs after reading data from file(trace configuration import data)
         *
         * @private
         * @param {HTMLInputElement} sender
         * @param {Map<string, string>} args
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.onUploadDataFinished = function (sender, args) {
            var _this = this;
            // Timeout needed to show some busyscreen before importing data otherwise UI have no time to update
            setTimeout(function () { return _this.onDataAvailable(sender, args); }, 200);
            this._fileProvider.eventUploadDataFinished.detach(this._uploadDataFinishedHandler);
        };
        /**
         * Raised when the data from a loaded file is available
         *
         * @private
         * @param {HTMLInputElement} fileInputElement
         * @param {Map<string, string>} fileContents
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.onDataAvailable = function (fileInputElement, fileContents) {
            var _this = this;
            if (fileContents.size === 1) {
                // Start with Progress 0% (load from file)
                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromFileType, 0));
                // Timeout needed to show the busyscreen before exporting data 
                setTimeout(function () { return _this.interpretData(fileContents); }, 200);
            }
        };
        /**
         * Loads the network command trace data from file (eventUploadDataFinished will be raise))
         *
         * @private
         * @param {*} fileContents
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.interpretData = function (fileContents) {
            return __awaiter(this, void 0, void 0, function () {
                var filedata, filename;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            filedata = fileContents.values().next().value;
                            filename = fileContents.keys().next().value;
                            if (!filename.endsWith(fileProvider_1.FileProvider.BrFileExt)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.importSdmBrFile(filedata)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                        case 2:
                            if (filename.endsWith(fileProvider_1.FileProvider.DriveLogExportFileExt)) { // dle file DriveLog import
                                this.importDleFile(filedata);
                                return [2 /*return*/];
                            }
                            _a.label = 3;
                        case 3:
                            /*else if(filename.endsWith(FileProvider.BinFileExt)){ // Bin file import
                                this.importBinFile(filedata);
                                return;
                            }*/
                            this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromFileType, 100));
                            this.showFileNotSupportedWarningWhenImportingFile();
                            // Raise EmtpyDataModel to clear the view
                            this.raiseEmptyDataModel();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Raises the dataAvailable event with an empty datamodel
         *
         * @private
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.raiseEmptyDataModel = function () {
            var loggerDataModel = new driveLogDataModel_1.DriveLogDataModel();
            this.eventDataAvailable.raise(this, loggerDataModel);
        };
        /**
         * Import SDM br file
         *
         * @private
         * @param {string} filedata
         * @returns
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.importSdmBrFile = function (filedata) {
            return __awaiter(this, void 0, void 0, function () {
                var arrayBuffer2, brModuleData, mappMotionArConfigObject, dynamicMetaData, staticMetaData, nwctMetaDataProvider;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            arrayBuffer2 = this.str2ab(filedata);
                            brModuleData = new brModuleParser_1.BrModuleParser(arrayBuffer2);
                            // check if its an valid NC data 
                            if (brModuleData.isNCData === false || brModuleData.has6Sections === false) {
                                //handle error
                                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromFileType, 100));
                                this.showFileNotSupportedWarningWhenImportingFile();
                                // Raise EmtpyDataModel to clear the view
                                this.raiseEmptyDataModel();
                                return [2 /*return*/];
                            }
                            this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromFileType, 100));
                            mappMotionArConfigObject = JSON.parse(brModuleData.mappMotionArConfig);
                            dynamicMetaData = new nwctDynamicMetaData_1.NwctDynamicMetaData(mappMotionArConfigObject);
                            staticMetaData = new nwctStaticMetaData_1.NwctStaticMetaData(JSON.parse(brModuleData.acoposParIDs), JSON.parse(brModuleData.acoposErrInfTypes));
                            nwctMetaDataProvider = new nwctMetaDataProvider_1.NwctMetaDataProvider();
                            // Set the static data from sdm binary file (parameter definitions, error info definitions, ...)
                            nwctMetaDataProvider.setStaticMetaData(staticMetaData);
                            // Set dynamic data(network interface names, component names, ...) from sdm binary file
                            nwctMetaDataProvider.setDynamicMetaData(dynamicMetaData);
                            return [4 /*yield*/, this.createNwctProvider(brModuleData.mTrcBinDat01, nwctMetaDataProvider)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates a warning message when the user imports a .br file(or unsupported file extension) which one is not supported
         *
         * @private
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.showFileNotSupportedWarningWhenImportingFile = function () {
            new alertDialog_1.AlertDialog().createMessageBox("File not supported", "Invalid file for this operation!", alertDialog_1.messageBoxType.Warning, undefined);
        };
        /**
         * Import dle file
         *
         * @private
         * @param {string} filedata
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.importDleFile = function (filedata) {
            var zipContainer = new zipContainer_1.ZipContainer();
            zipContainer.eventDataUnzipped.attach(this._dataUnzippedHandler);
            zipContainer.unzipData(filedata, "DriveLog.json");
        };
        // -----------------------------Remove for release------------------------------------------
        /**
         * Import bin file
         *
         * @private
         * @param {string} filedata
         * @memberof DriveLogDataProvider
         */
        /*private async importBinFile(filedata: string){
            // Convert bin string to array buffer
            let arrayBuffer = this.str2ab(filedata);
            
            // End with Progress 100% (load from file)
            this.eventDataLoadingProgressChanged.raise(this, new DataLoadingProgressArgs(DataLoadingProgressArgs.loadFromFileType, 100));
    
            // get DynamicMetaData from data buffer
            let dynamicMetaData = this.getDynamicMetaDataFromBuffer(arrayBuffer);
            // get only the data buffer without metaData info
            let dataBuffer = this.getDataBuffer(arrayBuffer);
    
            // create nwct provider
            if(this._nwctMetaDataProvider == undefined){
                this._nwctMetaDataProvider = new NwctMetaDataProvider();
                // Set the static data (parameter definitions, error info definitions, ...) after creating the NwctMetaDataProvider
                let staticMetaDataFromTarget = await this.getStaticMetaData();
                this._nwctMetaDataProvider.setStaticMetaData(staticMetaDataFromTarget);
            }
    
            // Set dynamic data(network interface names, component names, ...) for every new upload of network command trace data
            this._nwctMetaDataProvider.setDynamicMetaData(dynamicMetaData);
            // create nwct provider
            await this.createNwctProvider(dataBuffer, this._nwctMetaDataProvider);
        }*/
        /**
         * Returns only the network command trace buffer without the metadata
         *
         * @private
         * @param {ArrayBuffer} networkCmdTrcData
         * @returns {ArrayBuffer}
         * @memberof DriveLogDataProvider
         */
        /*private getDataBuffer(networkCmdTrcData: ArrayBuffer): ArrayBuffer{
            let metaDataStartIndex = this.findMetaDataStart(networkCmdTrcData);
            let dataBuffer = networkCmdTrcData;
            if(metaDataStartIndex != -1){
                // Extract metaData
                dataBuffer = networkCmdTrcData.slice(0,metaDataStartIndex);
            }
            return dataBuffer;
        }*/
        /**
         * Returns the dynamic meta data found within the drive log buffer
         *
         * @private
         * @param {ArrayBuffer} networkCmdTrcData
         * @returns {(NwctDynamicMetaData|undefined)}
         * @memberof DriveLogDataProvider
         */
        /*private getDynamicMetaDataFromBuffer(networkCmdTrcData: ArrayBuffer): NwctDynamicMetaData|undefined{
            let metaDataStartIndex: number = this.findMetaDataStart(networkCmdTrcData);
            let currentMetaDataString;
            if(metaDataStartIndex != -1){
                // Extract metaData
                let metaDataBuffer = networkCmdTrcData.slice(metaDataStartIndex);
                currentMetaDataString = this.ab2str(metaDataBuffer);
            }
            
            let metaDataObject: NwctDynamicMetaData|undefined;
            if(currentMetaDataString != undefined){
                
                let indexMappMotionArConfig = currentMetaDataString.search("mappMotionArConfig");
                let mappMotionArConfig = currentMetaDataString.substr(indexMappMotionArConfig-2);
    
                let newSection = mappMotionArConfig.indexOf("{\"acoposParIDs\":");
                if(newSection != -1){
                    mappMotionArConfig = mappMotionArConfig.substr(0, newSection);
                }
                let endIndex = mappMotionArConfig.lastIndexOf("}");
    
                mappMotionArConfig = mappMotionArConfig.substr(0, endIndex+1); // Remove wrong characters at the end
                
                // create json objects
                let mappMotionArConfigObject = JSON.parse(mappMotionArConfig);
    
                // load data into dynamic metaData object
                metaDataObject = new NwctDynamicMetaData(mappMotionArConfigObject);
            }
            return metaDataObject;
        }*/
        /**
         * Find the index where the metaData is located in the bin buffer if available, other wise -1
         *
         * @private
         * @param {ArrayBuffer} networkCmdTrcData
         * @returns {number}
         * @memberof DriveLogDataProvider
         */
        /*private findMetaDataStart(networkCmdTrcData: ArrayBuffer): number{
            for(let i = 0; i < networkCmdTrcData.byteLength+4; i++){
                // TODO: Find start of MetaData in bin buffer if used in final version(maybe with kaitai parser)
                // 7B 22 6D 61 70 70 4D 6F 74 69 6F 6E 41 72 43 6F => {"mappMotionArCo(nfig)
                if(networkCmdTrcData[i] == 123 && networkCmdTrcData[i+1] == 34 && networkCmdTrcData[i+2] == 109 && networkCmdTrcData[i+3] == 97 && networkCmdTrcData[i+4] == 112 && networkCmdTrcData[i+5] == 112 ){
                    return i;
                }
            }
            return -1;
        }*/
        // -----------------------------Remove for release------------------------------------------
        /**
         * Parses the available network command trace *.bin data -> raises the eventDataAvailable when nwctProvider is finished with loading the data
         *
         * @private
         * @param {ArrayBuffer} networkCmdTrcData
         * @param {NwctMetaDataProvider} nwctMetaDataProvider
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.createNwctProvider = function (networkCmdTrcData, nwctMetaDataProvider) {
            return __awaiter(this, void 0, void 0, function () {
                var nwctProvider, namespaces;
                return __generator(this, function (_a) {
                    // Start with Progress 0% (loading resources)
                    this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadResourcesType, 0));
                    nwctProvider = new nwctProvider_1.NwctProvider(networkCmdTrcData, nwctMetaDataProvider);
                    nwctProvider.eventNamespacesLoaded.attach(this._namespacesLoadedHandler);
                    namespaces = this.getNeededNamespaces();
                    nwctProvider.loadTextSystemNamespaces(namespaces);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Searches for namespaces which are needed for the current nwctTrace data and returns them
         *
         * @private
         * @returns {Array<string>}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getNeededNamespaces = function () {
            // TODO: load needed namespace names from target
            var namespaces = new Array();
            namespaces.push("BR/EventLog");
            return namespaces;
        };
        /**
         * Raised when loading namespaces is finished
         *
         * @private
         * @param {NwctProvider} sender
         * @param {*} args
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.onNamespacesLoaded = function (sender, args) {
            // End with Progress 100% (loading resources)
            this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadResourcesType, 100));
            // Update the data in the datamodel after loading of namespaces is finished
            var loggerDataModel = new driveLogDataModel_1.DriveLogDataModel();
            try {
                loggerDataModel.setNwctProvider(sender);
            }
            catch (e) {
                // No valid nwctProvider data
                this.showFileNotSupportedWarningWhenImportingFile();
            }
            this.eventDataAvailable.raise(this, loggerDataModel);
            // detach event namespacesLoaded
            sender.eventNamespacesLoaded.detach(this._namespacesLoadedHandler);
        };
        /**
         * Data zipped handler
         *
         * @private
         * @param {ZipContainer} sender
         * @param {*} zippedData
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.onDataZippedHandler = function (sender, zippedData) {
            // download zipped network command trace snapshot(uploaded or imported)
            fileProvider_1.FileProvider.downloadData("DriveLogSnapShot" + fileProvider_1.FileProvider.DriveLogExportFileExt, zippedData);
            // Raise end exporting event 100%
            this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.exportToFileType, 100));
            //Detach datazipped event
            sender.eventDataZipped.detach(this._dataZippedHandler);
        };
        /**
         * Data unzipped handler
         *
         * @private
         * @param {ZipContainer} sender
         * @param {*} unzippedData
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.onDataUnzippedHandler = function (sender, unzippedData) {
            // Create new datamodel with the new data
            var loggerDataModel = new driveLogDataModel_1.DriveLogDataModel();
            loggerDataModel.setSettings(JSON.parse(unzippedData));
            // Raise dataAvailable event
            this.eventDataAvailable.raise(this, loggerDataModel);
            // End with Progress 100% (load from file)
            this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromFileType, 100));
            // Detach data unzipped event
            sender.eventDataUnzipped.detach(this._dataUnzippedHandler);
        };
        /**
         * Creates network command trace data for export in blob format (*.bin)
         *
         * @private
         * @param {{data: Blob}} ref
         * @memberof DriveLogDataProvider
         */
        /*private async createNetworkCommandTraceData(ref: {data: Blob}){
            let internalRef = {data: new Uint8Array()};
            await this.getNwctData(internalRef);
            this._currentNwctBinData = internalRef.data;
            ref.data = this.getCurrentBinDataAsBlob();
            
        }*/
        /**
         * Returns the current bin data(uploaded or imported) incl. metadata as blob (else empty blob if error)
         *
         * @private
         * @returns {Blob}
         * @memberof DriveLogDataProvider
         */
        /*private getCurrentBinDataAsBlob(): Blob{
            // Add Network Command Trace Buffer and add dynamic MetaData
            //let data = new Blob([new Uint8Array(this._currentNwctBinData)]);
            let mergedArray: Uint8Array|undefined;
            let data = new Uint8Array(this._currentNwctBinData);
            if(this._currentMetaDataBuffer != undefined){
                let metaData =  new Uint8Array(this._currentMetaDataBuffer);
                mergedArray = new Uint8Array(data.length + metaData.length);
                mergedArray.set(data);
                mergedArray.set(metaData, data.length);
            }
            else{
                console.error("No metadata available!");
            }
            if(mergedArray != undefined){
                let blob = new Blob([mergedArray]);
                return blob;
            }
            // Return emtpy blob in case of an error
            return new Blob();
        }*/
        /**
         * Converts a string to an array buffer
         *
         * @private
         * @param {string} str
         * @returns {Uint8Array}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.str2ab = function (str) {
            var buf = new Uint8Array(str.length);
            for (var i = 0, strLen = str.length; i < strLen; i++) {
                buf[i] = str.charCodeAt(i);
            }
            return buf;
        };
        /**
         * Converts an array buffer to a string
         *
         * @private
         * @param {ArrayBuffer} buf
         * @returns {string}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.ab2str = function (buf) {
            return new TextDecoder().decode(buf);
        };
        /**
         * Upload network command trace data
         *
         * @private
         * @param {{data: Uint8Array}} ref
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getNwctData = function (ref) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this._getDriveLogSnapshotMethod != undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.loadData(this._getDriveLogSnapshotMethod, ref)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload the dynamic meta data for the network command trace
         *
         * @private
         * @param {{data: Uint8Array}} ref
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getNwctDynamicMetaData = function (ref) {
            return __awaiter(this, void 0, void 0, function () {
                var refMetaData, metaData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            refMetaData = { data: new Uint8Array() };
                            if (!(this._getDriveLogConfigInfoMethod != undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.loadData(this._getDriveLogConfigInfoMethod, refMetaData, 1)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            metaData = this.ab2str(refMetaData.data);
                            ref.data = metaData;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload the static meta data for the network command trace for the acopos parameters
         *
         * @private
         * @param {{data: Uint8Array}} ref
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getNwctStaticMetaDataAcoposParameter = function (ref) {
            return __awaiter(this, void 0, void 0, function () {
                var refMetaData, metaData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            refMetaData = { data: new Uint8Array() };
                            if (!(this._getDriveLogConfigInfoMethod != undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.loadData(this._getDriveLogConfigInfoMethod, refMetaData, 2)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            metaData = this.ab2str(refMetaData.data);
                            ref.data = metaData;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload the static meta data for the network command trace for the error infos
         *
         * @private
         * @param {{data: Uint8Array}} ref
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.getNwctStaticMetaDataErrorInfo = function (ref) {
            return __awaiter(this, void 0, void 0, function () {
                var refMetaData, metaData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            refMetaData = { data: new Uint8Array() };
                            if (!(this._getDriveLogConfigInfoMethod != undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.loadData(this._getDriveLogConfigInfoMethod, refMetaData, 3)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            metaData = this.ab2str(refMetaData.data);
                            ref.data = metaData;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Load data from target with the given component method
         *
         * @private
         * @param {MappCockpitComponentMethod} componentMethod
         * @param {{data: Uint8Array}} ref
         * @param {number} [additionalId=0] id which data should be loaded(needed for loading dynamically metaData)
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.loadData = function (componentMethod, ref, additionalId) {
            if (additionalId === void 0) { additionalId = 0; }
            return __awaiter(this, void 0, void 0, function () {
                var startOffset, maxBytes, inputCounter, startOffsetInputIndex, maxBytesInputIndex, result, dataLength, data, encData, i, encData_1, i, progress;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startOffset = 0;
                            maxBytes = 32768;
                            // Start with Progress 0% (load from target) => currently only for nwct Bin Data
                            if (componentMethod == this._getDriveLogSnapshotMethod) {
                                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromTargetType, 0));
                            }
                            inputCounter = 0;
                            if (additionalId != 0) {
                                componentMethod.inputParameters[inputCounter].value = additionalId;
                                inputCounter++;
                            }
                            startOffsetInputIndex = inputCounter;
                            maxBytesInputIndex = inputCounter + 1;
                            componentMethod.inputParameters[startOffsetInputIndex].value = startOffset;
                            componentMethod.inputParameters[maxBytesInputIndex].value = maxBytes;
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(componentMethod)];
                        case 1:
                            result = _a.sent();
                            dataLength = result.args.DataLeft + result.args.DataRead;
                            data = new Uint8Array(dataLength);
                            encData = this.encodeBase64(result.args.Data);
                            for (i = 0; i < encData.length; i++) {
                                data[startOffset + i] = encData[i];
                            }
                            startOffset += result.args.DataRead;
                            if (!(result.args.DataLeft == 0)) return [3 /*break*/, 2];
                            // Data loaded completly
                            if (componentMethod == this._getDriveLogSnapshotMethod) {
                                // raise event -> 100% progress
                                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromTargetType, 100));
                            }
                            return [3 /*break*/, 4];
                        case 2:
                            if (!(result.args.DataLeft > 0)) return [3 /*break*/, 4];
                            componentMethod.inputParameters[startOffsetInputIndex].value = startOffset;
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(componentMethod)];
                        case 3:
                            result = _a.sent();
                            encData_1 = this.encodeBase64(result.args.Data);
                            for (i = 0; i < encData_1.length; i++) {
                                data[startOffset + i] = encData_1[i];
                            }
                            startOffset += result.args.DataRead;
                            // Calculate progress after every loaded datapart (load from target) => currently only for nwct Bin Data
                            if (componentMethod == this._getDriveLogSnapshotMethod) {
                                progress = 100 - (result.args.DataLeft * 100) / dataLength;
                                this.eventDataLoadingProgressChanged.raise(this, new dataLoadingProgressArgs_1.DataLoadingProgressArgs(dataLoadingProgressArgs_1.DataLoadingProgressArgs.loadFromTargetType, Math.round(progress)));
                            }
                            return [3 /*break*/, 2];
                        case 4:
                            ref.data = data;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Convert from base64 string to Uint8Array
         *
         * @private
         * @param {any} base64
         * @returns {Uint8Array}
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.encodeBase64 = function (base64) {
            var binary_string = window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes;
        };
        /**
         * Executes a command on the target to look if there is some network command trace data available
         *
         * @private
         * @returns
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.dataAvailable = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this._getDriveLogSnapshotMethod != undefined)) return [3 /*break*/, 5];
                            this._getDriveLogSnapshotMethod.inputParameters[0].value = 0;
                            this._getDriveLogSnapshotMethod.inputParameters[1].value = 10;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 20)) return [3 /*break*/, 5];
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._getDriveLogSnapshotMethod)];
                        case 2:
                            result = _a.sent();
                            if (result.args != undefined && result.args.DataRead == 10) {
                                return [2 /*return*/, true];
                            }
                            return [4 /*yield*/, this.sleep(200)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, false];
                    }
                });
            });
        };
        /**
         * Wait some time
         *
         * @private
         * @param {number} ms time to wait in milliseconds
         * @returns
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.prototype.sleep = function (ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        };
        /**
         * Method names for loading the drive log snapshot and the drive log config infos
         *
         * @static
         * @memberof DriveLogDataProvider
         */
        DriveLogDataProvider.createDriveLogSnapshotMethodName = "CreateDriveLogSnapshot";
        DriveLogDataProvider.getDriveLogSnapshotMethodName = "GetDriveLogSnapshot";
        DriveLogDataProvider.getDriveLogConfigInfoMethodName = "GetDriveLogConfigInfo";
        return DriveLogDataProvider;
    }());
    exports.DriveLogDataProvider = DriveLogDataProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmVMb2dEYXRhUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbG9nZ2VyV2lkZ2V0L2RyaXZlTG9nL2RyaXZlTG9nRGF0YVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVBOzs7OztPQUtHO0lBQ0g7UUFpSEk7OztXQUdHO1FBQ0g7WUFBQSxpQkFFQztZQXhFRDs7Ozs7ZUFLRztZQUNLLCtCQUEwQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXRDLENBQXNDLENBQUM7WUFFM0Y7Ozs7O2VBS0c7WUFDSyw2QkFBd0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1lBRXpGOzs7OztlQUtHO1lBQ0ssdUJBQWtCLEdBQUcsVUFBQyxNQUFNLEVBQUUsVUFBVSxJQUFHLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQztZQUVoRzs7Ozs7ZUFLRztZQUNLLHlCQUFvQixHQUFHLFVBQUMsTUFBTSxFQUFFLFlBQVksSUFBRyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLEVBQWhELENBQWdELENBQUM7WUFFeEc7Ozs7ZUFJRztZQUNILHVCQUFrQixHQUFHLElBQUksZ0RBQWtCLEVBQUUsQ0FBQztZQUU5Qzs7OztlQUlHO1lBQ0gsb0NBQStCLEdBQUcsSUFBSSxzREFBd0IsRUFBRSxDQUFDO1lBMkI3RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMkJBQVksQ0FBQyxJ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QUFnQyxHQUFHLHdCQUF3QixDQUFDO1FBQzVELGtEQUE2QixHQUFHLHFCQUFxQixDQUFDO1FBQ3RELG9EQUErQixHQUFHLHVCQUF1QixDQUFDO1FBbzFCckYsMkJBQUM7S0FBQSxBQW44QkQsSUFtOEJDO0lBbjhCWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZpbGVQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZmlsZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElMb2dnZXJEYXRhUHJvdmlkZXIsIEV2ZW50RGF0YUF2YWlsYWJsZSwgRXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbG9nZ2VyRGF0YVByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERyaXZlTG9nRGF0YU1vZGVsIH0gZnJvbSBcIi4vZHJpdmVMb2dEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgTndjdFByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9ud2N0UHJvdmlkZXIvbndjdFByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzIH0gZnJvbSBcIi4uL2RhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzXCI7XHJcbmltcG9ydCB7IE53Y3RNZXRhRGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9ud2N0UHJvdmlkZXIvbndjdE1ldGFEYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgTndjdER5bmFtaWNNZXRhRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbndjdFByb3ZpZGVyL253Y3REeW5hbWljTWV0YURhdGFcIjtcclxuaW1wb3J0IHsgTndjdFN0YXRpY01ldGFEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9ud2N0UHJvdmlkZXIvbndjdFN0YXRpY01ldGFEYXRhXCI7XHJcbmltcG9ydCB7IElCck1vZHVsZVBhcnNlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbndjdFByb3ZpZGVyL2ludGVyZmFjZXMvYnJNb2R1bGVQYXJzZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQnJNb2R1bGVQYXJzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL253Y3RQcm92aWRlci9ick1vZHVsZVBhcnNlclwiO1xyXG5cclxuaW1wb3J0IHsgWmlwQ29udGFpbmVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi96aXBDb250YWluZXJcIjtcclxuaW1wb3J0IHsgQWxlcnREaWFsb2csIG1lc3NhZ2VCb3hUeXBlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hbGVydERpYWxvZ1wiO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgc29tZSBmdW5jdGlvbmFsaXR5IHRvIGV4cG9ydC9pbXBvcnQgb3IgdXBsb2FkIHNvbWUgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGFcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEcml2ZUxvZ0RhdGFQcm92aWRlciBpbXBsZW1lbnRzIElMb2dnZXJEYXRhUHJvdmlkZXJ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldHdvcmsgY29tbWFuZCBzbmFwc2hvdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY3JlYXRlRHJpdmVMb2dTbmFwc2hvdE1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIG1ldGhvZCB0byB1cGxvYWQgdGhlIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nZXREcml2ZUxvZ1NuYXBzaG90TWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgbWV0aG9kIHRvIHVwbG9hZCB0aGUgZHluYW1pYyBhbmQgc3RhdGljIG1ldGEgZGF0YSBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldERyaXZlTG9nQ29uZmlnSW5mb01ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8dW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBmaWxlcHJvdmlkZXIobmVlZGVkIGZvciBpbXBvcnQvZXhwb3J0IG9mIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7RmlsZVByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2ZpbGVQcm92aWRlcjogRmlsZVByb3ZpZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIG53Y3RNZXRhRGF0YVByb3ZpZGVyIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtJVGV4dFByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX253Y3RNZXRhRGF0YVByb3ZpZGVyOiBOd2N0TWV0YURhdGFQcm92aWRlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciB0aGUgZmlsZSBwcm92aWRlciB3aGVuIGxvYWRpbmcgZGF0YSBmcm9tIGZpbGUgaXMgZmluaXNoZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uVXBsb2FkRGF0YUZpbmlzaGVkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIG5hbWVzcGFjZXMgZm9yIHRleHRzeXN0ZW0gbG9hZGluZyBmaW5pc2hlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfbmFtZXNwYWNlc0xvYWRlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKT0+dGhpcy5vbk5hbWVzcGFjZXNMb2FkZWQoc2VuZGVyLCBhcmdzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIGRhdGEgemlwcGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kYXRhWmlwcGVkSGFuZGxlciA9IChzZW5kZXIsIHppcHBlZERhdGEpPT50aGlzLm9uRGF0YVppcHBlZEhhbmRsZXIoc2VuZGVyLCB6aXBwZWREYXRhKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIGRhdGEgdW56aXBwZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RhdGFVbnppcHBlZEhhbmRsZXIgPSAoc2VuZGVyLCB1bnppcHBlZERhdGEpPT50aGlzLm9uRGF0YVVuemlwcGVkSGFuZGxlcihzZW5kZXIsIHVuemlwcGVkRGF0YSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCB0byBpbmZvcm0gd2hlbiBzb21lIGRhdGEgaXMgYXZhaWxhYmxlKGUuZy4gbG9hZGluZyBmcm9tIGZpbGUgb3IgZnJvbSB0YXJnZXQpXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGV2ZW50RGF0YUF2YWlsYWJsZSA9IG5ldyBFdmVudERhdGFBdmFpbGFibGUoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEV2ZW50IHRvIGluZm9ybSBob3cgbWFueSBkYXRhIGlzIGFscmVhZHkgbG9hZGVkKGUuZy4gMCUsIDEwJSwgLi4uLiwgMTAwJSk7XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWQgPSBuZXcgRXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyB0aGVyZSBzb21lIGRhdGEgYXZhaWxhYmxlIHRvIGV4cG9ydCBzb21ldGhpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNFeHBvcnRQb3NzaWJsZSgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0aG9kIG5hbWVzIGZvciBsb2FkaW5nIHRoZSBkcml2ZSBsb2cgc25hcHNob3QgYW5kIHRoZSBkcml2ZSBsb2cgY29uZmlnIGluZm9zXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlRHJpdmVMb2dTbmFwc2hvdE1ldGhvZE5hbWUgPSBcIkNyZWF0ZURyaXZlTG9nU25hcHNob3RcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ2V0RHJpdmVMb2dTbmFwc2hvdE1ldGhvZE5hbWUgPSBcIkdldERyaXZlTG9nU25hcHNob3RcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ2V0RHJpdmVMb2dDb25maWdJbmZvTWV0aG9kTmFtZSA9IFwiR2V0RHJpdmVMb2dDb25maWdJbmZvXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5fZmlsZVByb3ZpZGVyID0gbmV3IEZpbGVQcm92aWRlcih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIERyaXZlTG9nRGF0YVByb3ZpZGVyIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIHNldENvbXBvbmVudE1ldGhvZHMoY29tcG9uZW50TWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSl7XHJcbiAgICAgICAgdGhpcy5vbkRyaXZlTG9nQ29tcG9uZW50TWV0aG9kc1VwZGF0ZWQoY29tcG9uZW50TWV0aG9kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZHJpdmUgbG9nIGNvbXBvbmVudCBtZXRob2RzIGhhdmUgYmVlbiB1cGRhdGVkIC4uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXX0gY29tcG9uZW50TWV0aG9kc1xyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgb25Ecml2ZUxvZ0NvbXBvbmVudE1ldGhvZHNVcGRhdGVkKGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10pIHtcclxuICAgICAgICB0aGlzLl9jcmVhdGVEcml2ZUxvZ1NuYXBzaG90TWV0aG9kID0gY29tcG9uZW50TWV0aG9kcy5maWx0ZXIobWV0aG9kID0+IHtyZXR1cm4gbWV0aG9kLmJyb3dzZU5hbWUgPT0gRHJpdmVMb2dEYXRhUHJvdmlkZXIuY3JlYXRlRHJpdmVMb2dTbmFwc2hvdE1ldGhvZE5hbWV9KVswXTtcclxuICAgICAgICB0aGlzLl9nZXREcml2ZUxvZ1NuYXBzaG90TWV0aG9kID0gY29tcG9uZW50TWV0aG9kcy5maWx0ZXIobWV0aG9kID0+IHtyZXR1cm4gbWV0aG9kLmJyb3dzZU5hbWUgPT0gRHJpdmVMb2dEYXRhUHJvdmlkZXIuZ2V0RHJpdmVMb2dTbmFwc2hvdE1ldGhvZE5hbWV9KVswXTtcclxuICAgICAgICB0aGlzLl9nZXREcml2ZUxvZ0NvbmZpZ0luZm9NZXRob2QgPSBjb21wb25lbnRNZXRob2RzLmZpbHRlcihtZXRob2QgPT4ge3JldHVybiBtZXRob2QuYnJvd3NlTmFtZSA9PSBEcml2ZUxvZ0RhdGFQcm92aWRlci5nZXREcml2ZUxvZ0NvbmZpZ0luZm9NZXRob2ROYW1lfSlbMF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fZ2V0RHJpdmVMb2dTbmFwc2hvdE1ldGhvZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIG1ldGhvZHMgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICBhd2FpdCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC51cGRhdGVJbnB1dFBhcmFtZXRlcnModGhpcy5fZ2V0RHJpdmVMb2dTbmFwc2hvdE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLl9nZXREcml2ZUxvZ0NvbmZpZ0luZm9NZXRob2QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgYXdhaXQgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QudXBkYXRlSW5wdXRQYXJhbWV0ZXJzKHRoaXMuX2dldERyaXZlTG9nQ29uZmlnSW5mb01ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBsb2FkcyB0aGUgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGEgZnJvbSB0YXJnZXQgKGV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkIHdpbGwgYmUgcmFpc2UpKVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHVwbG9hZERhdGFGcm9tVGFyZ2V0KCl7XHJcbiAgICAgICAgaWYodGhpcy5fY3JlYXRlRHJpdmVMb2dTbmFwc2hvdE1ldGhvZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5fZ2V0RHJpdmVMb2dTbmFwc2hvdE1ldGhvZCAhPSB1bmRlZmluZWQpeyAgICAgIFxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgbmV0d29yayBjb21tYW5kIHRyYWNlIHNuYXBzaG90IG9uIHRhcmdldFxyXG4gICAgICAgICAgICBhd2FpdCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKHRoaXMuX2NyZWF0ZURyaXZlTG9nU25hcHNob3RNZXRob2QpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFBdmFpbGFibGUgPSBhd2FpdCB0aGlzLmRhdGFBdmFpbGFibGUoKTtcclxuICAgICAgICAgICAgaWYoZGF0YUF2YWlsYWJsZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlZiA9IHtkYXRhOiBuZXcgVWludDhBcnJheSgpfTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0TndjdERhdGEocmVmKTtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50TndjdEJpbkRhdGEgPSByZWYuZGF0YTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IER5bmFtaWNNZXRhRGF0YSBmcm9tIHRhcmdldChvcGMgdWEgbWV0aG9kcylcclxuICAgICAgICAgICAgICAgIGxldCBkeW5hbWljTWV0YURhdGEgPSBhd2FpdCB0aGlzLmdldER5bmFtaWNNZXRhRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgbndjdCBwcm92aWRlclxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fbndjdE1ldGFEYXRhUHJvdmlkZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlciA9IG5ldyBOd2N0TWV0YURhdGFQcm92aWRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgc3RhdGljIGRhdGEgKHBhcmFtZXRlciBkZWZpbml0aW9ucywgZXJyb3IgaW5mbyBkZWZpbml0aW9ucywgLi4uKSBhZnRlciBjcmVhdGluZyB0aGUgTndjdE1ldGFEYXRhUHJvdmlkZXJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdGljTWV0YURhdGFGcm9tVGFyZ2V0ID0gYXdhaXQgdGhpcy5nZXRTdGF0aWNNZXRhRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyLnNldFN0YXRpY01ldGFEYXRhKHN0YXRpY01ldGFEYXRhRnJvbVRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgZHluYW1pYyBkYXRhKG5ldHdvcmsgaW50ZXJmYWNlIG5hbWVzLCBjb21wb25lbnQgbmFtZXMsIC4uLikgZm9yIGV2ZXJ5IG5ldyB1cGxvYWQgb2YgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGFcclxuICAgICAgICAgICAgICAgIHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyLnNldER5bmFtaWNNZXRhRGF0YShkeW5hbWljTWV0YURhdGEpO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVOd2N0UHJvdmlkZXIoY3VycmVudE53Y3RCaW5EYXRhLCB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgZGF0YSBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRyaXZlTG9nIGNvbXBvbmVudCBtZXRob2RzIG5vdCBsb2FkZWQhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHN0YXRpYyBtZXRhIGRhdGEgZnJvbSB0YXJnZXQgKE9QQyBVQSBtZXRob2RzKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7KFByb21pc2U8TndjdFN0YXRpY01ldGFEYXRhfHVuZGVmaW5lZD4pfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0U3RhdGljTWV0YURhdGEoKTogUHJvbWlzZTxOd2N0U3RhdGljTWV0YURhdGF8dW5kZWZpbmVkPntcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYWNvcG9zUGFyYW1ldGVyU3RhdGljRGF0YSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgZXJyb3JJbmZvU3RhdGljRGF0YSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBsb2FkIGFjb3BvcyBwYXJhbWV0ZXIgbWV0YSBkYXRhXHJcbiAgICAgICAgbGV0IHJlZk1ldGFEYXRhID0ge2RhdGE6IFwiXCJ9O1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0TndjdFN0YXRpY01ldGFEYXRhQWNvcG9zUGFyYW1ldGVyKHJlZk1ldGFEYXRhKTtcclxuICAgICAgICBsZXQgc3RhdGljZGF0YSA9IHJlZk1ldGFEYXRhLmRhdGE7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBqc29uIG9iamVjdHNcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGFjb3Bvc1BhcmFtZXRlclN0YXRpY0RhdGEgPSBKU09OLnBhcnNlKHN0YXRpY2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlByb2JsZW0gd2l0aCBkYXRhIGZyb20gR2V0RHJpdmVMb2dDb25maWdJbmZvIHdpdGggaWQgMiFcIilcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGxvYWQgZXJyb3IgaW5mbyBtZXRhIGRhdGFcclxuICAgICAgICBsZXQgcmVmTWV0YURhdGFFcnJvckluZm8gPSB7ZGF0YTogXCJcIn07XHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXROd2N0U3RhdGljTWV0YURhdGFFcnJvckluZm8ocmVmTWV0YURhdGFFcnJvckluZm8pO1xyXG4gICAgICAgIGxldCBlcnJvckluZm9TdGF0aWNkYXRhID0gcmVmTWV0YURhdGFFcnJvckluZm8uZGF0YTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGpzb24gb2JqZWN0c1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgZXJyb3JJbmZvU3RhdGljRGF0YSA9IEpTT04ucGFyc2UoZXJyb3JJbmZvU3RhdGljZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUHJvYmxlbSB3aXRoIGRhdGEgZnJvbSBHZXREcml2ZUxvZ0NvbmZpZ0luZm8gd2l0aCBpZCAzIVwiKVxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbG9hZCBkYXRhIGludG8gc2F0aWMgbWV0YURhdGEgb2JqZWN0XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOd2N0U3RhdGljTWV0YURhdGEoYWNvcG9zUGFyYW1ldGVyU3RhdGljRGF0YSwgZXJyb3JJbmZvU3RhdGljRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkeW5hbWljIG1ldGEgZGF0YSBmcm9tIHRoZSB0YXJnZXQgKE9QQyBVQSBtZXRob2RzKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7KFByb21pc2U8TndjdER5bmFtaWNNZXRhRGF0YXx1bmRlZmluZWQ+KX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldER5bmFtaWNNZXRhRGF0YSgpOiBQcm9taXNlPE53Y3REeW5hbWljTWV0YURhdGF8dW5kZWZpbmVkPntcclxuICAgICAgICBsZXQgcmVmTWV0YURhdGEgPSB7ZGF0YTogXCJcIn07XHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXROd2N0RHluYW1pY01ldGFEYXRhKHJlZk1ldGFEYXRhKTtcclxuICAgICAgICBsZXQgZHluZGF0YSA9IHJlZk1ldGFEYXRhLmRhdGE7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBqc29uIG9iamVjdHNcclxuICAgICAgICBsZXQgbWFwcE1vdGlvbkFyQ29uZmlnT2JqZWN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbWFwcE1vdGlvbkFyQ29uZmlnT2JqZWN0ID0gSlNPTi5wYXJzZShkeW5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9ibGVtIHdpdGggZGF0YSBmcm9tIEdldERyaXZlTG9nQ29uZmlnSW5mbyB3aXRoIGlkIDEhXCIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBsb2FkIGRhdGEgaW50byBkeW5hbWljIG1ldGFEYXRhIG9iamVjdFxyXG4gICAgICAgIHJldHVybiBuZXcgTndjdER5bmFtaWNNZXRhRGF0YShtYXBwTW90aW9uQXJDb25maWdPYmplY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhwb3J0cyB0aGUgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGEgZnJvbSB0YXJnZXQgdG8gYSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIC8qcHVibGljIGFzeW5jIGV4cG9ydFVwbG9hZE5ldHdvcmtDb21tYW5kVHJhY2UoKXtcclxuICAgICAgICBpZih0aGlzLl9jcmVhdGVEcml2ZUxvZ1NuYXBzaG90TWV0aG9kICE9IHVuZGVmaW5lZCAmJiB0aGlzLl9nZXREcml2ZUxvZ1NuYXBzaG90ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBuZXR3b3JrIGNvbW1hbmQgdHJhY2Ugc25hcHNob3Qgb24gdGFyZ2V0XHJcbiAgICAgICAgICAgIGF3YWl0IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmV4ZWN1dGUodGhpcy5fY3JlYXRlRHJpdmVMb2dTbmFwc2hvdE1ldGhvZCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YUF2YWlsYWJsZSA9IGF3YWl0IHRoaXMuZGF0YUF2YWlsYWJsZSgpO1xyXG4gICAgICAgICAgICBpZihkYXRhQXZhaWxhYmxlKXtcclxuICAgICAgICAgICAgICAgIC8vIGdldCBuZXR3b3JrIGNvbW1hbmQgdHJhY2Ugc25hcHNob3QgZnJvbSB0YXJnZXRcclxuICAgICAgICAgICAgICAgIGxldCByZWYgPSB7ZGF0YTogbmV3IEJsb2IoKX07XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZU5ldHdvcmtDb21tYW5kVHJhY2VEYXRhKHJlZik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZG93bmxvYWQgbmV0d29yayBjb21tYW5kIHRyYWNlIHNuYXBzaG90XHJcbiAgICAgICAgICAgICAgICBGaWxlUHJvdmlkZXIuZG93bmxvYWREYXRhKFwiRHJpdmVMb2dTbmFwU2hvdFwiICsgRmlsZVByb3ZpZGVyLkJpbkZpbGVFeHQsIHJlZi5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhIGF2YWlsYWJsZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydHMgdGhlIGxhc3QgaW1wb3J0ZWQvdXBsb2FkZWQgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGEgdG8gYSBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIC8qcHVibGljIGV4cG9ydEN1cnJlbnREYXRhVG9GaWxlKCl7XHJcbiAgICAgICAgbGV0IGJpbkJsb2JEYXRhID0gdGhpcy5nZXRDdXJyZW50QmluRGF0YUFzQmxvYigpO1xyXG4gICAgICAgIGlmKGJpbkJsb2JEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGRvd25sb2FkIGN1cnJlbnQgZXR3b3JrIGNvbW1hbmQgdHJhY2Ugc25hcHNob3QodXBsb2FkZWQgb3IgaW1wb3J0ZWQpXHJcbiAgICAgICAgICAgIEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJEcml2ZUxvZ1NuYXBTaG90XCIgKyBGaWxlUHJvdmlkZXIuQmluRmlsZUV4dCwgYmluQmxvYkRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhwb3J0IHRoZSBkYXQgdG8gemlwIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jsb2J9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXhwb3J0RGF0YVRvRmlsZShkYXRhOiBCbG9iKXtcclxuICAgICAgICBpZihkYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFJhaXNlIHN0YXJ0IGV4cG9ydGluZyBldmVudCAwJVxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWQucmFpc2UodGhpcywgbmV3IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzKERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzLmV4cG9ydFRvRmlsZVR5cGUsIDApKTtcclxuICAgICAgICAgICAgLy8gU3RhcnQgY29tcHJlc3NpbmcgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLnppcERhdGEoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tcHJlc3MgZGF0YSBhbmQgc2F2ZSB0byBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmxvYn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgemlwRGF0YShkYXRhOiBCbG9iKXtcclxuICAgICAgICBsZXQgemlwQ29udGFpbmVyID0gbmV3IFppcENvbnRhaW5lcigpO1xyXG4gICAgICAgIHppcENvbnRhaW5lci5hZGRGaWxlKFwiRHJpdmVMb2cuanNvblwiLCBkYXRhKTtcclxuICAgICAgICB6aXBDb250YWluZXIuZXZlbnREYXRhWmlwcGVkLmF0dGFjaCh0aGlzLl9kYXRhWmlwcGVkSGFuZGxlcik7XHJcbiAgICAgICAgemlwQ29udGFpbmVyLnppcERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEltcG9ydHMgc29tZSBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgZGF0YSBmcm9tIGEgZmlsZVxyXG4gICAgICogU2hvd3MgYW4gZmlsZSBleHBsb3JlciB0byBzZWxlY3QgYSBmaWxlIGFuZCBzdGFydHMgbG9hZGluZyB0aGUgZmlsZSBkYXRhIChldmVudFVwbG9hZERhdGFGaW5pc2hlZCB3aWxsIGJlIHJhaXNlKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW1wb3J0RGF0YUZyb21GaWxlKCl7XHJcbiAgICAgICAgdGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmF0dGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9maWxlUHJvdmlkZXIudXBsb2FkRGF0YShGaWxlUHJvdmlkZXIuRHJpdmVMb2dFeHBvcnRGaWxlRXh0ICsgXCIsXCIgKyBGaWxlUHJvdmlkZXIuQnJGaWxlRXh0ICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPY2N1cnMgYWZ0ZXIgcmVhZGluZyBkYXRhIGZyb20gZmlsZSh0cmFjZSBjb25maWd1cmF0aW9uIGltcG9ydCBkYXRhKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblVwbG9hZERhdGFGaW5pc2hlZChzZW5kZXI6IEhUTUxJbnB1dEVsZW1lbnQsIGFyZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz4pe1xyXG5cdFx0Ly8gVGltZW91dCBuZWVkZWQgdG8gc2hvdyBzb21lIGJ1c3lzY3JlZW4gYmVmb3JlIGltcG9ydGluZyBkYXRhIG90aGVyd2lzZSBVSSBoYXZlIG5vIHRpbWUgdG8gdXBkYXRlXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHRoaXMub25EYXRhQXZhaWxhYmxlKHNlbmRlciwgYXJncyksIDIwMCk7XHJcblxyXG5cdFx0dGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmRldGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlZCB3aGVuIHRoZSBkYXRhIGZyb20gYSBsb2FkZWQgZmlsZSBpcyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBmaWxlSW5wdXRFbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGZpbGVDb250ZW50c1xyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EYXRhQXZhaWxhYmxlKGZpbGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIGZpbGVDb250ZW50czogTWFwPHN0cmluZywgc3RyaW5nPil7XHJcbiAgICAgICAgaWYoZmlsZUNvbnRlbnRzLnNpemUgPT09IDEpe1xyXG4gICAgICAgICAgICAvLyBTdGFydCB3aXRoIFByb2dyZXNzIDAlIChsb2FkIGZyb20gZmlsZSlcclxuICAgICAgICAgICAgdGhpcy5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLnJhaXNlKHRoaXMsIG5ldyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyhEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5sb2FkRnJvbUZpbGVUeXBlLCAwKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaW1lb3V0IG5lZWRlZCB0byBzaG93IHRoZSBidXN5c2NyZWVuIGJlZm9yZSBleHBvcnRpbmcgZGF0YSBcclxuXHRcdCAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaW50ZXJwcmV0RGF0YShmaWxlQ29udGVudHMpLCAyMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgZGF0YSBmcm9tIGZpbGUgKGV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkIHdpbGwgYmUgcmFpc2UpKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGZpbGVDb250ZW50c1xyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgaW50ZXJwcmV0RGF0YShmaWxlQ29udGVudHMpe1xyXG4gICAgICAgIGxldCBmaWxlZGF0YTpzdHJpbmcgPSBmaWxlQ29udGVudHMudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xyXG4gICAgICAgIGxldCBmaWxlbmFtZSA9IGZpbGVDb250ZW50cy5rZXlzKCkubmV4dCgpLnZhbHVlO1xyXG4gICAgICAgIGlmKGZpbGVuYW1lLmVuZHNXaXRoKEZpbGVQcm92aWRlci5CckZpbGVFeHQpKXsgLy8gU0RNIGJyIGZpbGUgaW1wb3J0XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW1wb3J0U2RtQnJGaWxlKGZpbGVkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGZpbGVuYW1lLmVuZHNXaXRoKEZpbGVQcm92aWRlci5Ecml2ZUxvZ0V4cG9ydEZpbGVFeHQpKXsgLy8gZGxlIGZpbGUgRHJpdmVMb2cgaW1wb3J0XHJcbiAgICAgICAgICAgIHRoaXMuaW1wb3J0RGxlRmlsZShmaWxlZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyplbHNlIGlmKGZpbGVuYW1lLmVuZHNXaXRoKEZpbGVQcm92aWRlci5CaW5GaWxlRXh0KSl7IC8vIEJpbiBmaWxlIGltcG9ydFxyXG4gICAgICAgICAgICB0aGlzLmltcG9ydEJpbkZpbGUoZmlsZWRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLnJhaXNlKHRoaXMsIG5ldyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyhEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5sb2FkRnJvbUZpbGVUeXBlLCAxMDApKTtcclxuICAgICAgICB0aGlzLnNob3dGaWxlTm90U3VwcG9ydGVkV2FybmluZ1doZW5JbXBvcnRpbmdGaWxlKCk7XHJcbiAgICAgICAgLy8gUmFpc2UgRW10cHlEYXRhTW9kZWwgdG8gY2xlYXIgdGhlIHZpZXdcclxuICAgICAgICB0aGlzLnJhaXNlRW1wdHlEYXRhTW9kZWwoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIGRhdGFBdmFpbGFibGUgZXZlbnQgd2l0aCBhbiBlbXB0eSBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmFpc2VFbXB0eURhdGFNb2RlbCgpe1xyXG4gICAgICAgIGxldCBsb2dnZXJEYXRhTW9kZWwgPSBuZXcgRHJpdmVMb2dEYXRhTW9kZWwoKTtcclxuICAgICAgICB0aGlzLmV2ZW50RGF0YUF2YWlsYWJsZS5yYWlzZSh0aGlzLCBsb2dnZXJEYXRhTW9kZWwpOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEltcG9ydCBTRE0gYnIgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZWRhdGFcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBpbXBvcnRTZG1CckZpbGUoZmlsZWRhdGE6IHN0cmluZyl7XHJcbiAgICAgICAgLy8gQ29udmVydCBiaW4gc3RyaW5nIHRvIGFycmF5IGJ1ZmZlciBcclxuICAgICAgICBsZXQgYXJyYXlCdWZmZXIyID0gdGhpcy5zdHIyYWIoZmlsZWRhdGEpO1xyXG5cclxuICAgICAgICAvLyBSZWNlaXZlIHRoZSBwYXJzZWQgYnIgbW9kdWxlIGRhdGFcclxuICAgICAgICBsZXQgYnJNb2R1bGVEYXRhOiBJQnJNb2R1bGVQYXJzZXIgPSBuZXcgQnJNb2R1bGVQYXJzZXIoYXJyYXlCdWZmZXIyKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgaXRzIGFuIHZhbGlkIE5DIGRhdGEgXHJcbiAgICAgICAgaWYoYnJNb2R1bGVEYXRhLmlzTkNEYXRhID09PSBmYWxzZSB8fCBick1vZHVsZURhdGEuaGFzNlNlY3Rpb25zID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvL2hhbmRsZSBlcnJvclxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWQucmFpc2UodGhpcywgbmV3IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzKERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzLmxvYWRGcm9tRmlsZVR5cGUsIDEwMCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dGaWxlTm90U3VwcG9ydGVkV2FybmluZ1doZW5JbXBvcnRpbmdGaWxlKCk7XHJcbiAgICAgICAgICAgIC8vIFJhaXNlIEVtdHB5RGF0YU1vZGVsIHRvIGNsZWFyIHRoZSB2aWV3XHJcbiAgICAgICAgICAgIHRoaXMucmFpc2VFbXB0eURhdGFNb2RlbCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWQucmFpc2UodGhpcywgbmV3IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzKERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzLmxvYWRGcm9tRmlsZVR5cGUsIDEwMCkpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUganNvbiBvYmplY3RzXHJcbiAgICAgICAgbGV0IG1hcHBNb3Rpb25BckNvbmZpZ09iamVjdCA9IEpTT04ucGFyc2UoYnJNb2R1bGVEYXRhLm1hcHBNb3Rpb25BckNvbmZpZyk7XHJcblxyXG4gICAgICAgIC8vIGxvYWQgZGF0YSBpbnRvIGR5bmFtaWMgbWV0YURhdGEgb2JqZWN0XHJcbiAgICAgICAgbGV0IGR5bmFtaWNNZXRhRGF0YSA9IG5ldyBOd2N0RHluYW1pY01ldGFEYXRhKG1hcHBNb3Rpb25BckNvbmZpZ09iamVjdCk7XHJcbiAgICAgICAgLy8gVE9ETzogdHJ5IGNhdGNoIGZvciBKU09OIHBhcnNlXHJcbiAgICAgICAgbGV0IHN0YXRpY01ldGFEYXRhID0gbmV3IE53Y3RTdGF0aWNNZXRhRGF0YShKU09OLnBhcnNlKGJyTW9kdWxlRGF0YS5hY29wb3NQYXJJRHMpLCBKU09OLnBhcnNlKGJyTW9kdWxlRGF0YS5hY29wb3NFcnJJbmZUeXBlcykpO1xyXG5cclxuICAgICAgICBsZXQgbndjdE1ldGFEYXRhUHJvdmlkZXIgPSBuZXcgTndjdE1ldGFEYXRhUHJvdmlkZXIoKTtcclxuICAgICAgICAvLyBTZXQgdGhlIHN0YXRpYyBkYXRhIGZyb20gc2RtIGJpbmFyeSBmaWxlIChwYXJhbWV0ZXIgZGVmaW5pdGlvbnMsIGVycm9yIGluZm8gZGVmaW5pdGlvbnMsIC4uLilcclxuICAgICAgICBud2N0TWV0YURhdGFQcm92aWRlci5zZXRTdGF0aWNNZXRhRGF0YShzdGF0aWNNZXRhRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGRhdGEobmV0d29yayBpbnRlcmZhY2UgbmFtZXMsIGNvbXBvbmVudCBuYW1lcywgLi4uKSBmcm9tIHNkbSBiaW5hcnkgZmlsZVxyXG4gICAgICAgIG53Y3RNZXRhRGF0YVByb3ZpZGVyLnNldER5bmFtaWNNZXRhRGF0YShkeW5hbWljTWV0YURhdGEpO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZU53Y3RQcm92aWRlcihick1vZHVsZURhdGEubVRyY0JpbkRhdDAxLCBud2N0TWV0YURhdGFQcm92aWRlcik7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHdhcm5pbmcgbWVzc2FnZSB3aGVuIHRoZSB1c2VyIGltcG9ydHMgYSAuYnIgZmlsZShvciB1bnN1cHBvcnRlZCBmaWxlIGV4dGVuc2lvbikgd2hpY2ggb25lIGlzIG5vdCBzdXBwb3J0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd0ZpbGVOb3RTdXBwb3J0ZWRXYXJuaW5nV2hlbkltcG9ydGluZ0ZpbGUoKSB7XHJcblx0XHRuZXcgQWxlcnREaWFsb2coKS5jcmVhdGVNZXNzYWdlQm94KFwiRmlsZSBub3Qgc3VwcG9ydGVkXCIsIFwiSW52YWxpZCBmaWxlIGZvciB0aGlzIG9wZXJhdGlvbiFcIiwgbWVzc2FnZUJveFR5cGUuV2FybmluZywgdW5kZWZpbmVkKTtcclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBvcnQgZGxlIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbXBvcnREbGVGaWxlKGZpbGVkYXRhOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCB6aXBDb250YWluZXIgPSBuZXcgWmlwQ29udGFpbmVyKCk7XHJcbiAgICAgICAgemlwQ29udGFpbmVyLmV2ZW50RGF0YVVuemlwcGVkLmF0dGFjaCh0aGlzLl9kYXRhVW56aXBwZWRIYW5kbGVyKTtcclxuICAgICAgICB6aXBDb250YWluZXIudW56aXBEYXRhKGZpbGVkYXRhLFwiRHJpdmVMb2cuanNvblwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVJlbW92ZSBmb3IgcmVsZWFzZS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBvcnQgYmluIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgLypwcml2YXRlIGFzeW5jIGltcG9ydEJpbkZpbGUoZmlsZWRhdGE6IHN0cmluZyl7XHJcbiAgICAgICAgLy8gQ29udmVydCBiaW4gc3RyaW5nIHRvIGFycmF5IGJ1ZmZlciBcclxuICAgICAgICBsZXQgYXJyYXlCdWZmZXIgPSB0aGlzLnN0cjJhYihmaWxlZGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gRW5kIHdpdGggUHJvZ3Jlc3MgMTAwJSAobG9hZCBmcm9tIGZpbGUpXHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLnJhaXNlKHRoaXMsIG5ldyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyhEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5sb2FkRnJvbUZpbGVUeXBlLCAxMDApKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IER5bmFtaWNNZXRhRGF0YSBmcm9tIGRhdGEgYnVmZmVyXHJcbiAgICAgICAgbGV0IGR5bmFtaWNNZXRhRGF0YSA9IHRoaXMuZ2V0RHluYW1pY01ldGFEYXRhRnJvbUJ1ZmZlcihhcnJheUJ1ZmZlcik7XHJcbiAgICAgICAgLy8gZ2V0IG9ubHkgdGhlIGRhdGEgYnVmZmVyIHdpdGhvdXQgbWV0YURhdGEgaW5mb1xyXG4gICAgICAgIGxldCBkYXRhQnVmZmVyID0gdGhpcy5nZXREYXRhQnVmZmVyKGFycmF5QnVmZmVyKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIG53Y3QgcHJvdmlkZXJcclxuICAgICAgICBpZih0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlciA9IG5ldyBOd2N0TWV0YURhdGFQcm92aWRlcigpO1xyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIHN0YXRpYyBkYXRhIChwYXJhbWV0ZXIgZGVmaW5pdGlvbnMsIGVycm9yIGluZm8gZGVmaW5pdGlvbnMsIC4uLikgYWZ0ZXIgY3JlYXRpbmcgdGhlIE53Y3RNZXRhRGF0YVByb3ZpZGVyXHJcbiAgICAgICAgICAgIGxldCBzdGF0aWNNZXRhRGF0YUZyb21UYXJnZXQgPSBhd2FpdCB0aGlzLmdldFN0YXRpY01ldGFEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyLnNldFN0YXRpY01ldGFEYXRhKHN0YXRpY01ldGFEYXRhRnJvbVRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBkYXRhKG5ldHdvcmsgaW50ZXJmYWNlIG5hbWVzLCBjb21wb25lbnQgbmFtZXMsIC4uLikgZm9yIGV2ZXJ5IG5ldyB1cGxvYWQgb2YgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGFcclxuICAgICAgICB0aGlzLl9ud2N0TWV0YURhdGFQcm92aWRlci5zZXREeW5hbWljTWV0YURhdGEoZHluYW1pY01ldGFEYXRhKTtcclxuICAgICAgICAvLyBjcmVhdGUgbndjdCBwcm92aWRlclxyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlTndjdFByb3ZpZGVyKGRhdGFCdWZmZXIsIHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyKTtcclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBvbmx5IHRoZSBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgYnVmZmVyIHdpdGhvdXQgdGhlIG1ldGFkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IG5ldHdvcmtDbWRUcmNEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgLypwcml2YXRlIGdldERhdGFCdWZmZXIobmV0d29ya0NtZFRyY0RhdGE6IEFycmF5QnVmZmVyKTogQXJyYXlCdWZmZXJ7XHJcbiAgICAgICAgbGV0IG1ldGFEYXRhU3RhcnRJbmRleCA9IHRoaXMuZmluZE1ldGFEYXRhU3RhcnQobmV0d29ya0NtZFRyY0RhdGEpO1xyXG4gICAgICAgIGxldCBkYXRhQnVmZmVyID0gbmV0d29ya0NtZFRyY0RhdGE7XHJcbiAgICAgICAgaWYobWV0YURhdGFTdGFydEluZGV4ICE9IC0xKXtcclxuICAgICAgICAgICAgLy8gRXh0cmFjdCBtZXRhRGF0YVxyXG4gICAgICAgICAgICBkYXRhQnVmZmVyID0gbmV0d29ya0NtZFRyY0RhdGEuc2xpY2UoMCxtZXRhRGF0YVN0YXJ0SW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YUJ1ZmZlcjtcclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZHluYW1pYyBtZXRhIGRhdGEgZm91bmQgd2l0aGluIHRoZSBkcml2ZSBsb2cgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IG5ldHdvcmtDbWRUcmNEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7KE53Y3REeW5hbWljTWV0YURhdGF8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICAvKnByaXZhdGUgZ2V0RHluYW1pY01ldGFEYXRhRnJvbUJ1ZmZlcihuZXR3b3JrQ21kVHJjRGF0YTogQXJyYXlCdWZmZXIpOiBOd2N0RHluYW1pY01ldGFEYXRhfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWV0YURhdGFTdGFydEluZGV4OiBudW1iZXIgPSB0aGlzLmZpbmRNZXRhRGF0YVN0YXJ0KG5ldHdvcmtDbWRUcmNEYXRhKTtcclxuICAgICAgICBsZXQgY3VycmVudE1ldGFEYXRhU3RyaW5nO1xyXG4gICAgICAgIGlmKG1ldGFEYXRhU3RhcnRJbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgbWV0YURhdGFcclxuICAgICAgICAgICAgbGV0IG1ldGFEYXRhQnVmZmVyID0gbmV0d29ya0NtZFRyY0RhdGEuc2xpY2UobWV0YURhdGFTdGFydEluZGV4KTtcclxuICAgICAgICAgICAgY3VycmVudE1ldGFEYXRhU3RyaW5nID0gdGhpcy5hYjJzdHIobWV0YURhdGFCdWZmZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgbWV0YURhdGFPYmplY3Q6IE53Y3REeW5hbWljTWV0YURhdGF8dW5kZWZpbmVkO1xyXG4gICAgICAgIGlmKGN1cnJlbnRNZXRhRGF0YVN0cmluZyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGluZGV4TWFwcE1vdGlvbkFyQ29uZmlnID0gY3VycmVudE1ldGFEYXRhU3RyaW5nLnNlYXJjaChcIm1hcHBNb3Rpb25BckNvbmZpZ1wiKTtcclxuICAgICAgICAgICAgbGV0IG1hcHBNb3Rpb25BckNvbmZpZyA9IGN1cnJlbnRNZXRhRGF0YVN0cmluZy5zdWJzdHIoaW5kZXhNYXBwTW90aW9uQXJDb25maWctMik7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3U2VjdGlvbiA9IG1hcHBNb3Rpb25BckNvbmZpZy5pbmRleE9mKFwie1xcXCJhY29wb3NQYXJJRHNcXFwiOlwiKTtcclxuICAgICAgICAgICAgaWYobmV3U2VjdGlvbiAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICBtYXBwTW90aW9uQXJDb25maWcgPSBtYXBwTW90aW9uQXJDb25maWcuc3Vic3RyKDAsIG5ld1NlY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBlbmRJbmRleCA9IG1hcHBNb3Rpb25BckNvbmZpZy5sYXN0SW5kZXhPZihcIn1cIik7XHJcblxyXG4gICAgICAgICAgICBtYXBwTW90aW9uQXJDb25maWcgPSBtYXBwTW90aW9uQXJDb25maWcuc3Vic3RyKDAsIGVuZEluZGV4KzEpOyAvLyBSZW1vdmUgd3JvbmcgY2hhcmFjdGVycyBhdCB0aGUgZW5kXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjcmVhdGUganNvbiBvYmplY3RzXHJcbiAgICAgICAgICAgIGxldCBtYXBwTW90aW9uQXJDb25maWdPYmplY3QgPSBKU09OLnBhcnNlKG1hcHBNb3Rpb25BckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAvLyBsb2FkIGRhdGEgaW50byBkeW5hbWljIG1ldGFEYXRhIG9iamVjdFxyXG4gICAgICAgICAgICBtZXRhRGF0YU9iamVjdCA9IG5ldyBOd2N0RHluYW1pY01ldGFEYXRhKG1hcHBNb3Rpb25BckNvbmZpZ09iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXRhRGF0YU9iamVjdDtcclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCB0aGUgaW5kZXggd2hlcmUgdGhlIG1ldGFEYXRhIGlzIGxvY2F0ZWQgaW4gdGhlIGJpbiBidWZmZXIgaWYgYXZhaWxhYmxlLCBvdGhlciB3aXNlIC0xXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IG5ldHdvcmtDbWRUcmNEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIC8qcHJpdmF0ZSBmaW5kTWV0YURhdGFTdGFydChuZXR3b3JrQ21kVHJjRGF0YTogQXJyYXlCdWZmZXIpOiBudW1iZXJ7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG5ldHdvcmtDbWRUcmNEYXRhLmJ5dGVMZW5ndGgrNDsgaSsrKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogRmluZCBzdGFydCBvZiBNZXRhRGF0YSBpbiBiaW4gYnVmZmVyIGlmIHVzZWQgaW4gZmluYWwgdmVyc2lvbihtYXliZSB3aXRoIGthaXRhaSBwYXJzZXIpXHJcbiAgICAgICAgICAgIC8vIDdCIDIyIDZEIDYxIDcwIDcwIDREIDZGIDc0IDY5IDZGIDZFIDQxIDcyIDQzIDZGID0+IHtcIm1hcHBNb3Rpb25BckNvKG5maWcpXHJcbiAgICAgICAgICAgIGlmKG5ldHdvcmtDbWRUcmNEYXRhW2ldID09IDEyMyAmJiBuZXR3b3JrQ21kVHJjRGF0YVtpKzFdID09IDM0ICYmIG5ldHdvcmtDbWRUcmNEYXRhW2krMl0gPT0gMTA5ICYmIG5ldHdvcmtDbWRUcmNEYXRhW2krM10gPT0gOTcgJiYgbmV0d29ya0NtZFRyY0RhdGFbaSs0XSA9PSAxMTIgJiYgbmV0d29ya0NtZFRyY0RhdGFbaSs1XSA9PSAxMTIgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH0qL1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1SZW1vdmUgZm9yIHJlbGVhc2UtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyB0aGUgYXZhaWxhYmxlIG5ldHdvcmsgY29tbWFuZCB0cmFjZSAqLmJpbiBkYXRhIC0+IHJhaXNlcyB0aGUgZXZlbnREYXRhQXZhaWxhYmxlIHdoZW4gbndjdFByb3ZpZGVyIGlzIGZpbmlzaGVkIHdpdGggbG9hZGluZyB0aGUgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBuZXR3b3JrQ21kVHJjRGF0YVxyXG4gICAgICogQHBhcmFtIHtOd2N0TWV0YURhdGFQcm92aWRlcn0gbndjdE1ldGFEYXRhUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZU53Y3RQcm92aWRlcihuZXR3b3JrQ21kVHJjRGF0YTogQXJyYXlCdWZmZXIsIG53Y3RNZXRhRGF0YVByb3ZpZGVyOiBOd2N0TWV0YURhdGFQcm92aWRlcil7XHJcbiAgICAgICAgLy8gU3RhcnQgd2l0aCBQcm9ncmVzcyAwJSAobG9hZGluZyByZXNvdXJjZXMpXHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLnJhaXNlKHRoaXMsIG5ldyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyhEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5sb2FkUmVzb3VyY2VzVHlwZSwgMCkpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgbndjdFByb3ZpZGVyIHRvIHByb3ZpZGVyIHRoZSBkcml2ZSBsb2cgZGF0YSBmb3IgdGhlIGdpdmVuIGRhdGEgYnVmZmVyXHJcbiAgICAgICAgbGV0IG53Y3RQcm92aWRlciA9IG5ldyBOd2N0UHJvdmlkZXIobmV0d29ya0NtZFRyY0RhdGEsIG53Y3RNZXRhRGF0YVByb3ZpZGVyKTtcclxuICAgICAgICBcclxuICAgICAgICBud2N0UHJvdmlkZXIuZXZlbnROYW1lc3BhY2VzTG9hZGVkLmF0dGFjaCh0aGlzLl9uYW1lc3BhY2VzTG9hZGVkSGFuZGxlcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbG9hZCBuZWVkZWQgbmFtZXNwYWNlcyAgICAgICAgXHJcbiAgICAgICAgbGV0IG5hbWVzcGFjZXMgPSB0aGlzLmdldE5lZWRlZE5hbWVzcGFjZXMoKTtcclxuICAgICAgICBud2N0UHJvdmlkZXIubG9hZFRleHRTeXN0ZW1OYW1lc3BhY2VzKG5hbWVzcGFjZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VhcmNoZXMgZm9yIG5hbWVzcGFjZXMgd2hpY2ggYXJlIG5lZWRlZCBmb3IgdGhlIGN1cnJlbnQgbndjdFRyYWNlIGRhdGEgYW5kIHJldHVybnMgdGhlbVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE5lZWRlZE5hbWVzcGFjZXMoKTogQXJyYXk8c3RyaW5nPntcclxuICAgICAgICAvLyBUT0RPOiBsb2FkIG5lZWRlZCBuYW1lc3BhY2UgbmFtZXMgZnJvbSB0YXJnZXRcclxuICAgICAgICBsZXQgbmFtZXNwYWNlczogQXJyYXk8c3RyaW5nPiA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgbmFtZXNwYWNlcy5wdXNoKFwiQlIvRXZlbnRMb2dcIik7XHJcbiAgICAgICAgcmV0dXJuIG5hbWVzcGFjZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZWQgd2hlbiBsb2FkaW5nIG5hbWVzcGFjZXMgaXMgZmluaXNoZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtOd2N0UHJvdmlkZXJ9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk5hbWVzcGFjZXNMb2FkZWQoc2VuZGVyOiBOd2N0UHJvdmlkZXIsIGFyZ3Mpe1xyXG4gICAgICAgIC8vIEVuZCB3aXRoIFByb2dyZXNzIDEwMCUgKGxvYWRpbmcgcmVzb3VyY2VzKVxyXG4gICAgICAgIHRoaXMuZXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZC5yYWlzZSh0aGlzLCBuZXcgRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MoRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MubG9hZFJlc291cmNlc1R5cGUsIDEwMCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZGF0YSBpbiB0aGUgZGF0YW1vZGVsIGFmdGVyIGxvYWRpbmcgb2YgbmFtZXNwYWNlcyBpcyBmaW5pc2hlZFxyXG4gICAgICAgIGxldCBsb2dnZXJEYXRhTW9kZWwgPSBuZXcgRHJpdmVMb2dEYXRhTW9kZWwoKTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxvZ2dlckRhdGFNb2RlbC5zZXROd2N0UHJvdmlkZXIoc2VuZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSl7XHJcbiAgICAgICAgICAgIC8vIE5vIHZhbGlkIG53Y3RQcm92aWRlciBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZpbGVOb3RTdXBwb3J0ZWRXYXJuaW5nV2hlbkltcG9ydGluZ0ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFBdmFpbGFibGUucmFpc2UodGhpcywgbG9nZ2VyRGF0YU1vZGVsKTtcclxuXHJcbiAgICAgICAgLy8gZGV0YWNoIGV2ZW50IG5hbWVzcGFjZXNMb2FkZWRcclxuICAgICAgICBzZW5kZXIuZXZlbnROYW1lc3BhY2VzTG9hZGVkLmRldGFjaCh0aGlzLl9uYW1lc3BhY2VzTG9hZGVkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRhIHppcHBlZCBoYW5kbGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7WmlwQ29udGFpbmVyfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gemlwcGVkRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EYXRhWmlwcGVkSGFuZGxlcihzZW5kZXI6IFppcENvbnRhaW5lciwgemlwcGVkRGF0YTogYW55KXtcclxuICAgICAgICAvLyBkb3dubG9hZCB6aXBwZWQgbmV0d29yayBjb21tYW5kIHRyYWNlIHNuYXBzaG90KHVwbG9hZGVkIG9yIGltcG9ydGVkKVxyXG4gICAgICAgIEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJEcml2ZUxvZ1NuYXBTaG90XCIgKyBGaWxlUHJvdmlkZXIuRHJpdmVMb2dFeHBvcnRGaWxlRXh0LCB6aXBwZWREYXRhKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBSYWlzZSBlbmQgZXhwb3J0aW5nIGV2ZW50IDEwMCVcclxuICAgICAgICB0aGlzLmV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWQucmFpc2UodGhpcywgbmV3IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzKERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzLmV4cG9ydFRvRmlsZVR5cGUsIDEwMCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vRGV0YWNoIGRhdGF6aXBwZWQgZXZlbnRcclxuICAgICAgICBzZW5kZXIuZXZlbnREYXRhWmlwcGVkLmRldGFjaCh0aGlzLl9kYXRhWmlwcGVkSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGF0YSB1bnppcHBlZCBoYW5kbGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7WmlwQ29udGFpbmVyfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gdW56aXBwZWREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgIHByaXZhdGUgb25EYXRhVW56aXBwZWRIYW5kbGVyKHNlbmRlcjogWmlwQ29udGFpbmVyLCB1bnppcHBlZERhdGE6IGFueSl7XHJcbiAgICAgICAgLy8gQ3JlYXRlIG5ldyBkYXRhbW9kZWwgd2l0aCB0aGUgbmV3IGRhdGFcclxuICAgICAgICBsZXQgbG9nZ2VyRGF0YU1vZGVsID0gbmV3IERyaXZlTG9nRGF0YU1vZGVsKCk7XHJcbiAgICAgICAgbG9nZ2VyRGF0YU1vZGVsLnNldFNldHRpbmdzKEpTT04ucGFyc2UodW56aXBwZWREYXRhKSk7XHJcblxyXG4gICAgICAgIC8vIFJhaXNlIGRhdGFBdmFpbGFibGUgZXZlbnRcclxuICAgICAgICB0aGlzLmV2ZW50RGF0YUF2YWlsYWJsZS5yYWlzZSh0aGlzLCBsb2dnZXJEYXRhTW9kZWwpOyBcclxuICAgICAgICBcclxuICAgICAgICAvLyBFbmQgd2l0aCBQcm9ncmVzcyAxMDAlIChsb2FkIGZyb20gZmlsZSlcclxuICAgICAgICB0aGlzLmV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWQucmFpc2UodGhpcywgbmV3IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzKERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzLmxvYWRGcm9tRmlsZVR5cGUsIDEwMCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIERldGFjaCBkYXRhIHVuemlwcGVkIGV2ZW50XHJcbiAgICAgICAgc2VuZGVyLmV2ZW50RGF0YVVuemlwcGVkLmRldGFjaCh0aGlzLl9kYXRhVW56aXBwZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGEgZm9yIGV4cG9ydCBpbiBibG9iIGZvcm1hdCAoKi5iaW4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7e2RhdGE6IEJsb2J9fSByZWZcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICAvKnByaXZhdGUgYXN5bmMgY3JlYXRlTmV0d29ya0NvbW1hbmRUcmFjZURhdGEocmVmOiB7ZGF0YTogQmxvYn0pe1xyXG4gICAgICAgIGxldCBpbnRlcm5hbFJlZiA9IHtkYXRhOiBuZXcgVWludDhBcnJheSgpfTtcclxuICAgICAgICBhd2FpdCB0aGlzLmdldE53Y3REYXRhKGludGVybmFsUmVmKTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50TndjdEJpbkRhdGEgPSBpbnRlcm5hbFJlZi5kYXRhO1xyXG4gICAgICAgIHJlZi5kYXRhID0gdGhpcy5nZXRDdXJyZW50QmluRGF0YUFzQmxvYigpO1xyXG4gICAgICAgIFxyXG4gICAgfSovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IGJpbiBkYXRhKHVwbG9hZGVkIG9yIGltcG9ydGVkKSBpbmNsLiBtZXRhZGF0YSBhcyBibG9iIChlbHNlIGVtcHR5IGJsb2IgaWYgZXJyb3IpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtCbG9ifVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIC8qcHJpdmF0ZSBnZXRDdXJyZW50QmluRGF0YUFzQmxvYigpOiBCbG9ie1xyXG4gICAgICAgIC8vIEFkZCBOZXR3b3JrIENvbW1hbmQgVHJhY2UgQnVmZmVyIGFuZCBhZGQgZHluYW1pYyBNZXRhRGF0YVxyXG4gICAgICAgIC8vbGV0IGRhdGEgPSBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkodGhpcy5fY3VycmVudE53Y3RCaW5EYXRhKV0pO1xyXG4gICAgICAgIGxldCBtZXJnZWRBcnJheTogVWludDhBcnJheXx1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLl9jdXJyZW50TndjdEJpbkRhdGEpO1xyXG4gICAgICAgIGlmKHRoaXMuX2N1cnJlbnRNZXRhRGF0YUJ1ZmZlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgbWV0YURhdGEgPSAgbmV3IFVpbnQ4QXJyYXkodGhpcy5fY3VycmVudE1ldGFEYXRhQnVmZmVyKTtcclxuICAgICAgICAgICAgbWVyZ2VkQXJyYXkgPSBuZXcgVWludDhBcnJheShkYXRhLmxlbmd0aCArIG1ldGFEYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIG1lcmdlZEFycmF5LnNldChkYXRhKTtcclxuICAgICAgICAgICAgbWVyZ2VkQXJyYXkuc2V0KG1ldGFEYXRhLCBkYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBtZXRhZGF0YSBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtZXJnZWRBcnJheSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFttZXJnZWRBcnJheV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYmxvYjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmV0dXJuIGVtdHB5IGJsb2IgaW4gY2FzZSBvZiBhbiBlcnJvclxyXG4gICAgICAgIHJldHVybiBuZXcgQmxvYigpO1xyXG4gICAgfSovXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYW4gYXJyYXkgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICAgICAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxyXG4gICAgICogQG1lbWJlcm9mIERyaXZlTG9nRGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RyMmFiKHN0cjogc3RyaW5nKTogVWludDhBcnJheXtcclxuICAgICAgICBsZXQgYnVmID0gbmV3IFVpbnQ4QXJyYXkoc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yICh2YXIgaT0wLCBzdHJMZW49c3RyLmxlbmd0aDsgaTxzdHJMZW47IGkrKykge1xyXG4gICAgICAgICAgICBidWZbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJ1ZjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGFuIGFycmF5IGJ1ZmZlciB0byBhIHN0cmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBidWZcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhYjJzdHIoYnVmOiBBcnJheUJ1ZmZlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShidWYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBsb2FkIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7e2RhdGE6IFVpbnQ4QXJyYXl9fSByZWZcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldE53Y3REYXRhKHJlZjoge2RhdGE6IFVpbnQ4QXJyYXl9KXtcclxuICAgICAgICBpZih0aGlzLl9nZXREcml2ZUxvZ1NuYXBzaG90TWV0aG9kICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZERhdGEodGhpcy5fZ2V0RHJpdmVMb2dTbmFwc2hvdE1ldGhvZCwgcmVmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGxvYWQgdGhlIGR5bmFtaWMgbWV0YSBkYXRhIGZvciB0aGUgbmV0d29yayBjb21tYW5kIHRyYWNlIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3tkYXRhOiBVaW50OEFycmF5fX0gcmVmXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBnZXROd2N0RHluYW1pY01ldGFEYXRhKHJlZjoge2RhdGE6IHN0cmluZ30pe1xyXG4gICAgICAgICAvLyBnZXQgZGF0YSBidWZmZXJcclxuICAgICAgICBsZXQgcmVmTWV0YURhdGEgPSB7ZGF0YTogbmV3IFVpbnQ4QXJyYXkoKX07XHJcbiAgICAgICAgaWYodGhpcy5fZ2V0RHJpdmVMb2dDb25maWdJbmZvTWV0aG9kICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZERhdGEodGhpcy5fZ2V0RHJpdmVMb2dDb25maWdJbmZvTWV0aG9kLCByZWZNZXRhRGF0YSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnZlcnQgZGF0YSBidWZmZXIgdG8gc3RyaW5nXHJcbiAgICAgICAgbGV0IG1ldGFEYXRhID0gdGhpcy5hYjJzdHIocmVmTWV0YURhdGEuZGF0YSk7XHJcbiAgICAgICAgcmVmLmRhdGEgPSBtZXRhRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwbG9hZCB0aGUgc3RhdGljIG1ldGEgZGF0YSBmb3IgdGhlIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBmb3IgdGhlIGFjb3BvcyBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7e2RhdGE6IFVpbnQ4QXJyYXl9fSByZWZcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldE53Y3RTdGF0aWNNZXRhRGF0YUFjb3Bvc1BhcmFtZXRlcihyZWY6IHtkYXRhOiBzdHJpbmd9KXtcclxuICAgICAgICAvLyBnZXQgZGF0YSBidWZmZXJcclxuICAgICAgICBsZXQgcmVmTWV0YURhdGEgPSB7ZGF0YTogbmV3IFVpbnQ4QXJyYXkoKX07XHJcbiAgICAgICAgaWYodGhpcy5fZ2V0RHJpdmVMb2dDb25maWdJbmZvTWV0aG9kICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZERhdGEodGhpcy5fZ2V0RHJpdmVMb2dDb25maWdJbmZvTWV0aG9kLCByZWZNZXRhRGF0YSwgMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnZlcnQgZGF0YSBidWZmZXIgdG8gc3RyaW5nXHJcbiAgICAgICAgbGV0IG1ldGFEYXRhID0gdGhpcy5hYjJzdHIocmVmTWV0YURhdGEuZGF0YSk7XHJcbiAgICAgICAgcmVmLmRhdGEgPSBtZXRhRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwbG9hZCB0aGUgc3RhdGljIG1ldGEgZGF0YSBmb3IgdGhlIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBmb3IgdGhlIGVycm9yIGluZm9zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7e2RhdGE6IFVpbnQ4QXJyYXl9fSByZWZcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldE53Y3RTdGF0aWNNZXRhRGF0YUVycm9ySW5mbyhyZWY6IHtkYXRhOiBzdHJpbmd9KXtcclxuICAgICAgICAvLyBnZXQgZGF0YSBidWZmZXJcclxuICAgICAgICBsZXQgcmVmTWV0YURhdGEgPSB7ZGF0YTogbmV3IFVpbnQ4QXJyYXkoKX07XHJcbiAgICAgICAgaWYodGhpcy5fZ2V0RHJpdmVMb2dDb25maWdJbmZvTWV0aG9kICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZERhdGEodGhpcy5fZ2V0RHJpdmVMb2dDb25maWdJbmZvTWV0aG9kLCByZWZNZXRhRGF0YSwgMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnZlcnQgZGF0YSBidWZmZXIgdG8gc3RyaW5nXHJcbiAgICAgICAgbGV0IG1ldGFEYXRhID0gdGhpcy5hYjJzdHIocmVmTWV0YURhdGEuZGF0YSk7XHJcbiAgICAgICAgcmVmLmRhdGEgPSBtZXRhRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgZGF0YSBmcm9tIHRhcmdldCB3aXRoIHRoZSBnaXZlbiBjb21wb25lbnQgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IGNvbXBvbmVudE1ldGhvZFxyXG4gICAgICogQHBhcmFtIHt7ZGF0YTogVWludDhBcnJheX19IHJlZlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFthZGRpdGlvbmFsSWQ9MF0gaWQgd2hpY2ggZGF0YSBzaG91bGQgYmUgbG9hZGVkKG5lZWRlZCBmb3IgbG9hZGluZyBkeW5hbWljYWxseSBtZXRhRGF0YSlcclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGxvYWREYXRhKGNvbXBvbmVudE1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIHJlZjoge2RhdGE6IFVpbnQ4QXJyYXl9LCBhZGRpdGlvbmFsSWQ6IG51bWJlciA9IDApe1xyXG4gICAgICAgIGxldCBzdGFydE9mZnNldDogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgbWF4Qnl0ZXM6IG51bWJlciA9IDMyNzY4O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gU3RhcnQgd2l0aCBQcm9ncmVzcyAwJSAobG9hZCBmcm9tIHRhcmdldCkgPT4gY3VycmVudGx5IG9ubHkgZm9yIG53Y3QgQmluIERhdGFcclxuICAgICAgICBpZihjb21wb25lbnRNZXRob2QgPT0gdGhpcy5fZ2V0RHJpdmVMb2dTbmFwc2hvdE1ldGhvZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnREYXRhTG9hZGluZ1Byb2dyZXNzQ2hhbmdlZC5yYWlzZSh0aGlzLCBuZXcgRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MoRGF0YUxvYWRpbmdQcm9ncmVzc0FyZ3MubG9hZEZyb21UYXJnZXRUeXBlLDApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbnB1dENvdW50ZXIgPSAwO1xyXG4gICAgICAgIGlmKGFkZGl0aW9uYWxJZCAhPSAwKXtcclxuICAgICAgICAgICAgIGNvbXBvbmVudE1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbaW5wdXRDb3VudGVyXS52YWx1ZSA9IGFkZGl0aW9uYWxJZDtcclxuICAgICAgICAgICAgIGlucHV0Q291bnRlcisrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RhcnRPZmZzZXRJbnB1dEluZGV4ID0gaW5wdXRDb3VudGVyO1xyXG4gICAgICAgIGxldCBtYXhCeXRlc0lucHV0SW5kZXggPSBpbnB1dENvdW50ZXIrMTtcclxuICAgICAgICBjb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzW3N0YXJ0T2Zmc2V0SW5wdXRJbmRleF0udmFsdWUgPSBzdGFydE9mZnNldDtcclxuICAgICAgICBjb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzW21heEJ5dGVzSW5wdXRJbmRleF0udmFsdWUgPSBtYXhCeXRlcztcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuZXhlY3V0ZShjb21wb25lbnRNZXRob2QpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YUxlbmd0aCA9IHJlc3VsdC5hcmdzLkRhdGFMZWZ0ICsgcmVzdWx0LmFyZ3MuRGF0YVJlYWQ7XHJcbiAgICAgICAgbGV0IGRhdGE6IFVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShkYXRhTGVuZ3RoKTtcclxuICAgICAgICBsZXQgZW5jRGF0YSA9IHRoaXMuZW5jb2RlQmFzZTY0KHJlc3VsdC5hcmdzLkRhdGEpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZW5jRGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGRhdGFbc3RhcnRPZmZzZXQraV0gPSBlbmNEYXRhW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnRPZmZzZXQgKz0gcmVzdWx0LmFyZ3MuRGF0YVJlYWQ7XHJcbiAgICAgICAgaWYocmVzdWx0LmFyZ3MuRGF0YUxlZnQgPT0gMCl7XHJcbiAgICAgICAgICAgIC8vIERhdGEgbG9hZGVkIGNvbXBsZXRseVxyXG4gICAgICAgICAgICBpZihjb21wb25lbnRNZXRob2QgPT0gdGhpcy5fZ2V0RHJpdmVMb2dTbmFwc2hvdE1ldGhvZCl7XHJcbiAgICAgICAgICAgICAgICAvLyByYWlzZSBldmVudCAtPiAxMDAlIHByb2dyZXNzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50RGF0YUxvYWRpbmdQcm9ncmVzc0NoYW5nZWQucmFpc2UodGhpcywgbmV3IERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzKERhdGFMb2FkaW5nUHJvZ3Jlc3NBcmdzLmxvYWRGcm9tVGFyZ2V0VHlwZSwgMTAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gTG9hZCB0aGUgcmVzdCBvZiB0aGUgZGF0YVxyXG4gICAgICAgICAgICB3aGlsZShyZXN1bHQuYXJncy5EYXRhTGVmdCA+IDApe1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVyc1tzdGFydE9mZnNldElucHV0SW5kZXhdLnZhbHVlID0gc3RhcnRPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKGNvbXBvbmVudE1ldGhvZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5jRGF0YSA9IHRoaXMuZW5jb2RlQmFzZTY0KHJlc3VsdC5hcmdzLkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBlbmNEYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhW3N0YXJ0T2Zmc2V0K2ldID0gZW5jRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0ICs9IHJlc3VsdC5hcmdzLkRhdGFSZWFkO1xyXG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHByb2dyZXNzIGFmdGVyIGV2ZXJ5IGxvYWRlZCBkYXRhcGFydCAobG9hZCBmcm9tIHRhcmdldCkgPT4gY3VycmVudGx5IG9ubHkgZm9yIG53Y3QgQmluIERhdGFcclxuICAgICAgICAgICAgICAgIGlmKGNvbXBvbmVudE1ldGhvZCA9PSB0aGlzLl9nZXREcml2ZUxvZ1NuYXBzaG90TWV0aG9kKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSAxMDAgLSAocmVzdWx0LmFyZ3MuRGF0YUxlZnQqMTAwKSAvIGRhdGFMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudERhdGFMb2FkaW5nUHJvZ3Jlc3NDaGFuZ2VkLnJhaXNlKHRoaXMsIG5ldyBEYXRhTG9hZGluZ1Byb2dyZXNzQXJncyhEYXRhTG9hZGluZ1Byb2dyZXNzQXJncy5sb2FkRnJvbVRhcmdldFR5cGUsIE1hdGgucm91bmQocHJvZ3Jlc3MpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVmLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBmcm9tIGJhc2U2NCBzdHJpbmcgdG8gVWludDhBcnJheVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gYmFzZTY0XHJcbiAgICAgKiBAcmV0dXJucyB7VWludDhBcnJheX1cclxuICAgICAqIEBtZW1iZXJvZiBEcml2ZUxvZ0RhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVuY29kZUJhc2U2NChiYXNlNjQ6IGFueSk6IFVpbnQ4QXJyYXkge1xyXG4gICAgICAgIHZhciBiaW5hcnlfc3RyaW5nID0gd2luZG93LmF0b2IoYmFzZTY0KTtcclxuICAgICAgICB2YXIgbGVuID0gYmluYXJ5X3N0cmluZy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobGVuKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJ5dGVzW2ldID0gYmluYXJ5X3N0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYnl0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyBhIGNvbW1hbmQgb24gdGhlIHRhcmdldCB0byBsb29rIGlmIHRoZXJlIGlzIHNvbWUgbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGEgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBkYXRhQXZhaWxhYmxlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fZ2V0RHJpdmVMb2dTbmFwc2hvdE1ldGhvZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9nZXREcml2ZUxvZ1NuYXBzaG90TWV0aG9kLmlucHV0UGFyYW1ldGVyc1swXS52YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2dldERyaXZlTG9nU25hcHNob3RNZXRob2QuaW5wdXRQYXJhbWV0ZXJzWzFdLnZhbHVlID0gMTA7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgMjA7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuZXhlY3V0ZSh0aGlzLl9nZXREcml2ZUxvZ1NuYXBzaG90TWV0aG9kKTtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5hcmdzICE9IHVuZGVmaW5lZCAmJiByZXN1bHQuYXJncy5EYXRhUmVhZCA9PSAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNsZWVwKDIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2FpdCBzb21lIHRpbWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1zIHRpbWUgdG8gd2FpdCBpbiBtaWxsaXNlY29uZHNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRHJpdmVMb2dEYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzbGVlcChtczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcbiAgICB9XHJcbn0iXX0=