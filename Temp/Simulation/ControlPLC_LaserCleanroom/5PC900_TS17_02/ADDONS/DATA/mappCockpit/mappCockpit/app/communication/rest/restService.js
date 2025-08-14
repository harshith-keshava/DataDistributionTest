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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Declares supported rest service types
     *
     * @enum {number}
     */
    var RestServiceType;
    (function (RestServiceType) {
        RestServiceType["POST"] = "POST";
        RestServiceType["DELETE"] = "DELETE";
        RestServiceType["GET"] = "GET";
        RestServiceType["PUT"] = "PUT";
        RestServiceType["PATCH"] = "PATCH";
        RestServiceType["Undefined"] = "";
    })(RestServiceType || (RestServiceType = {}));
    exports.RestServiceType = RestServiceType;
    var RestServiceMode;
    (function (RestServiceMode) {
        RestServiceMode[RestServiceMode["EXECUTE"] = 0] = "EXECUTE";
        RestServiceMode[RestServiceMode["BATCH"] = 1] = "BATCH";
    })(RestServiceMode || (RestServiceMode = {}));
    exports.RestServiceMode = RestServiceMode;
    /**
     * Provides a single batch request info
     *
     * @class BatchRequestInfo
     */
    var BatchRequestInfo = /** @class */ (function () {
        /**
         * Constructs an instance of BatchRequestInfo.
         * @param {number} id
         * @param {(string|undefined)} method
         * @param {string} url
         * @param {string} body
         * @memberof BatchRequestInfo
         */
        function BatchRequestInfo(id, method, url, body) {
            this._id = id;
            this._method = method;
            this._url = url;
            this._body = body;
        }
        Object.defineProperty(BatchRequestInfo.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BatchRequestInfo.prototype, "method", {
            get: function () {
                return this._method;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BatchRequestInfo.prototype, "body", {
            get: function () {
                return this._body;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BatchRequestInfo.prototype, "url", {
            get: function () {
                return this._url;
            },
            enumerable: true,
            configurable: true
        });
        /**
     * Creates an instance of BatchRequestInfo.
     * @param {number} id
    * @param {(string|undefined)} method
     * @param {string} url
     * @param {string} body
     * @memberof BatchRequestInfo
     */
        BatchRequestInfo.create = function (id, method, url, body) {
            // create the single batch object
            var singleBatchRequest = {
                id: id,
                method: method,
                url: url,
            };
            // add body data if defined
            if (body) {
                singleBatchRequest.body = body;
                singleBatchRequest.headers = { "Content-Type": "application/json" };
            }
            return singleBatchRequest;
        };
        return BatchRequestInfo;
    }());
    /**
     * Provides rest request info
     *
     * @class RestRequest
     */
    var RestRequestInfo = /** @class */ (function () {
        /**
         * Creates an instance of RestRequest.
         * @param {JQuery.AjaxSettings<any>} settings
         * @memberof RestRequest
         */
        function RestRequestInfo(settings) {
            this._settings = {};
            this._settings = settings;
        }
        Object.defineProperty(RestRequestInfo.prototype, "settings", {
            /**
             * Gets the rest request settings
             *
             * @readonly
             * @type {JQuery.AjaxSettings<any>}
             * @memberof RestRequest
             */
            get: function () {
                return this._settings;
            },
            enumerable: true,
            configurable: true
        });
        return RestRequestInfo;
    }());
    exports.RestRequestInfo = RestRequestInfo;
    /**
     * Implements a basic rest service call
     *
     * @class RestService
     */
    var RestService = /** @class */ (function () {
        /**
         *Creates an instance of RestService.
         * @memberof RestService
         */
        function RestService() {
            // specifies the service mode
            this.mode = RestServiceMode.EXECUTE;
            // holds rest request settings for batch mode
            this._batchRequests = [];
        }
        /**
         * Returns if the service has pending requests
         *
         * @returns
         * @memberof RestService
         */
        RestService.prototype.hasBatchRequests = function () {
            return this._batchRequests.length > 0;
        };
        RestService.prototype.call = function (serviceType, serviceUrl, serviceData, serviceHeaders) {
            if (serviceData === void 0) { serviceData = null; }
            if (serviceHeaders === void 0) { serviceHeaders = null; }
            return __awaiter(this, void 0, void 0, function () {
                var restRequest, restServicePromise;
                return __generator(this, function (_a) {
                    restRequest = this.createRequest(serviceType, serviceUrl, serviceData, serviceHeaders);
                    restServicePromise = this.createRestRequestPromise(restRequest);
                    // attach the request info to the promise
                    restServicePromise.restRequestInfo = restRequest;
                    // return just the request info or wait for executing the requuest
                    return [2 /*return*/, restServicePromise];
                });
            });
        };
        /**
         * Clears the list of requets.
         *
         * @memberof RestService
         */
        RestService.prototype.clearBatchRequests = function () {
            this._batchRequests = [];
        };
        /**
         * Executes the batch request specfied by the request collection
         *
         * @returns {Promise<any>}
         * @memberof RestService
         */
        RestService.prototype.executeBatchRequest = function () {
            return __awaiter(this, void 0, void 0, function () {
                var batchResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.callBatchRequest("", this._batchRequests)];
                        case 1:
                            batchResponse = _a.sent();
                            return [2 /*return*/, batchResponse];
                    }
                });
            });
        };
        /**
         * calls a batch request
         *
         * @template T
         * @param {JQuery.AjaxSettings<any>[]} restRequests
         * @memberof RestService
         */
        RestService.prototype.callBatchRequest = function (batchServiceBaseUrl, serviceRequests) {
            return __awaiter(this, void 0, void 0, function () {
                var batchRequests, batchRequest, restBatchServicePromise;
                return __generator(this, function (_a) {
                    // calculate the base url in common for all requets
                    batchServiceBaseUrl = this.getBatchRequestBaseUrl(serviceRequests);
                    batchRequests = { requests: this.createBatchRequestsData(serviceRequests, batchServiceBaseUrl) };
                    batchRequest = this.createRequest(RestServiceType.POST, batchServiceBaseUrl + '/$batch', batchRequests);
                    restBatchServicePromise = this.createRestRequestPromise(batchRequest);
                    // return just the request info or wait for executing the requuest
                    return [2 /*return*/, restBatchServicePromise];
                });
            });
        };
        /**
         * Creates and initializes the batch requests from the original single requests
         *
         * @private
         * @param {RestRequestInfo[]} serviceRequests
         * @param {string} batchServiceBaseUrl
         * @returns
         * @memberof RestService
         */
        RestService.prototype.createBatchRequestsData = function (serviceRequests, batchServiceBaseUrl) {
            // build the batch requests
            var batchRequests = this.buildBatchRequests(serviceRequests, batchServiceBaseUrl);
            return batchRequests;
        };
        /**
         *
         *
         * @private
         * @param {RestRequestInfo[]} serviceRequests
         * @param {string} batchServiceBaseUrl
         * @returns
         * @memberof RestService
         */
        RestService.prototype.buildBatchRequests = function (serviceRequests, batchServiceBaseUrl) {
            var batchRequests = [];
            for (var i = 0; i < serviceRequests.length; i++) {
                var serviceRequest = serviceRequests[i];
                if (serviceRequest.settings.url) {
                    // remove the base url from the single request url
                    var singleRequestUrl = serviceRequest.settings.url.replace(batchServiceBaseUrl, "");
                    // extract service data
                    var requestData = serviceRequest.settings.data ? JSON.parse(serviceRequest.settings.data) : undefined;
                    batchRequests.push(BatchRequestInfo.create(i, serviceRequest.settings.type, singleRequestUrl, requestData));
                }
            }
            return batchRequests;
        };
        /**
         * Calculates the base url which is the same for all requests
         *
         * @param {RestRequestInfo[]} serviceRequests
         * @returns {string}
         * @memberof RestService
         */
        RestService.prototype.getBatchRequestBaseUrl = function (serviceRequests) {
            // retrieve request urls
            var requestUrls = serviceRequests.map(function (request) { return request.settings.url; }).filter(function (url) { return url !== undefined; });
            // split th urls into their parts
            var requestUrlsSplitted = requestUrls.map(function (requestUrl) { return requestUrl.split("/"); });
            // search for the base url in common for all requests
            var baseUrlDepth = -1;
            var baseUrlFound = false;
            while (!baseUrlFound) {
                // increase the url depth
                baseUrlDepth++;
                // iterate through all request urls ...
                for (var i = 0; i < requestUrlsSplitted.length; i++) {
                    // and check if the base url depth exeeds any single url depth or any of the url parts is deifferent.
                    if (baseUrlDepth >= requestUrlsSplitted[i].length || requestUrlsSplitted[i][baseUrlDepth] != requestUrlsSplitted[0][baseUrlDepth]) {
                        // we ar done with sreaching because the exit criteria is met.
                        baseUrlFound = true;
                        break;
                    }
                }
            }
            // build the base path based und the calculated depth and the first request
            var batchBaseUrl = "";
            for (var i = 0; i < baseUrlDepth; i++) {
                batchBaseUrl += requestUrlsSplitted[0][i] + "/";
            }
            // remove last "/"
            batchBaseUrl = batchBaseUrl.slice(0, batchBaseUrl.length - 1);
            return batchBaseUrl;
        };
        /**
         * Creates a promise enclosing the rest request
         *
         * @private
         * @param {RestRequestInfo} restRequest
         * @returns
         * @memberof RestService
         */
        RestService.prototype.createRestRequestPromise = function (restRequest) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.mode == RestServiceMode.EXECUTE) {
                    // execute the rest service
                    // attach the callback functions to the promise callbacks
                    restRequest.settings.success = resolve;
                    restRequest.settings.error = reject;
                    // execute rest request
                    $.ajax(restRequest.settings);
                }
                else if (_this.mode == RestServiceMode.BATCH) {
                    // in batch mode we just collect the requests ....
                    _this._batchRequests.push(restRequest);
                    // in batch mode rest request info is returned as result. This allows accumulating multiple requests to be executed within a batch request call.
                    resolve(restRequest);
                }
            });
        };
        /**
         * Creates the basic ajax request info
         *
         * @private
         * @param {RestServiceType} serviceType
         * @param {string} serviceUrl
         * @param {(value?: any) => void} resolve
         * @param {(reason?: any) => void} reject
         * @returns {(JQuery.AjaxSettings<any> | undefined)}
         * @memberof RestService
         */
        RestService.prototype.createRequest = function (serviceType, serviceUrl, serviceData, serviceHeaders) {
            if (serviceData === void 0) { serviceData = null; }
            if (serviceHeaders === void 0) { serviceHeaders = null; }
            // create and initialize the service request object
            var restRequest = {
                type: serviceType,
                url: serviceUrl,
                xhrFields: {
                    withCredentials: true
                },
                dataType: 'json',
                contentType: 'application/json',
            };
            // set request data if defined
            if (serviceData) {
                restRequest.data = JSON.stringify(serviceData);
            }
            // set headers if defined
            if (serviceHeaders) {
                restRequest.headers = serviceHeaders;
            }
            return new RestRequestInfo(restRequest);
        };
        return RestService;
    }());
    exports.RestService = RestService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW11bmljYXRpb24vcmVzdC9yZXN0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDQTs7OztPQUlHO0lBQ0gsSUFBSyxlQU9KO0lBUEQsV0FBSyxlQUFlO1FBQ2hCLGdDQUFhLENBQUE7UUFDYixvQ0FBaUIsQ0FBQTtRQUNqQiw4QkFBVyxDQUFBO1FBQ1gsOEJBQVcsQ0FBQTtRQUNYLGtDQUFlLENBQUE7UUFDZixpQ0FBYyxDQUFBO0lBQ2xCLENBQUMsRUFQSSxlQUFlLEtBQWYsZUFBZSxRQU9uQjtJQTZYb0IsMENBQWU7SUExWHBDLElBQUssZUFHSjtJQUhELFdBQUssZUFBZTtRQUNoQiwyREFBTyxDQUFBO1FBQ1AsdURBQUssQ0FBQTtJQUNULENBQUMsRUFISSxlQUFlLEtBQWYsZUFBZSxRQUduQjtJQXVYcUMsMENBQWU7SUF4V3JEOzs7O09BSUc7SUFDSDtRQXlCSTs7Ozs7OztXQU9HO1FBQ0gsMEJBQW9CLEVBQVMsRUFBRSxNQUF1QixFQUFFLEdBQVUsRUFBRSxJQUFXO1lBQzNFLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQTlCRCxzQkFBVyxnQ0FBRTtpQkFBYjtnQkFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDcEIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyxvQ0FBTTtpQkFBakI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsa0NBQUk7aUJBQWY7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QVcsQ0FBQyxDQUFDO2lCQUV4QjtZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQztRQUdEOzs7Ozs7Ozs7O1dBVUc7UUFDSyxtQ0FBYSxHQUFwQixVQUFxQixXQUE0QixFQUFFLFVBQWtCLEVBQUUsV0FBNEIsRUFBRyxjQUE2QjtZQUE1RCw0QkFBQSxFQUFBLGtCQUE0QjtZQUFHLCtCQUFBLEVBQUEscUJBQTZCO1lBRWhJLG1EQUFtRDtZQUNuRCxJQUFJLFdBQVcsR0FBNEI7Z0JBQ3ZDLElBQUksRUFBRSxXQUFXO2dCQUNqQixHQUFHLEVBQUUsVUFBVTtnQkFDZixTQUFTLEVBQUU7b0JBQ1AsZUFBZSxFQUFFLElBQUk7aUJBQ3hCO2dCQUNELFFBQVEsRUFBRSxNQUFNO2dCQUNoQixXQUFXLEVBQUUsa0JBQWtCO2FBQ2xDLENBQUM7WUFFRiw4QkFBOEI7WUFDOUIsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsV0FBVyxDQUFDLElBQUksR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ25EO1lBQ0QseUJBQXlCO1lBQ3pCLElBQUksY0FBYyxFQUFFO2dCQUNoQixXQUFXLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQzthQUN4QztZQUVELE9BQU8sSUFBSSxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQXZQRCxJQXVQQztJQUdPLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiBEZWNsYXJlcyBzdXBwb3J0ZWQgcmVzdCBzZXJ2aWNlIHR5cGVzXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIFJlc3RTZXJ2aWNlVHlwZXtcclxuICAgIFBPU1QgPSBcIlBPU1RcIixcclxuICAgIERFTEVURSA9IFwiREVMRVRFXCIsIFxyXG4gICAgR0VUID0gXCJHRVRcIixcclxuICAgIFBVVCA9IFwiUFVUXCIsXHJcbiAgICBQQVRDSCA9IFwiUEFUQ0hcIixcclxuICAgIFVuZGVmaW5lZCA9IFwiXCIsXHJcbn1cclxuXHJcblxyXG5lbnVtIFJlc3RTZXJ2aWNlTW9kZXtcclxuICAgIEVYRUNVVEUsXHJcbiAgICBCQVRDSCwgXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogRGVjbGFyZXMgdGhlIHNpbmdsZSBiYXRjaCByZXF1ZXN0IGluZm8gbWVtYmVyc1xyXG4gKlxyXG4gKiBAaW50ZXJmYWNlIElCYXRjaFJlcXVlc3RJbmZvXHJcbiAqL1xyXG5pbnRlcmZhY2UgSUJhdGNoUmVxdWVzdEluZm97XHJcbiAgICBpZDpudW1iZXI7XHJcbiAgICBtZXRob2Q6c3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHVybDpzdHJpbmc7XHJcbiAgICBib2R5OmFueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGEgc2luZ2xlIGJhdGNoIHJlcXVlc3QgaW5mb1xyXG4gKlxyXG4gKiBAY2xhc3MgQmF0Y2hSZXF1ZXN0SW5mb1xyXG4gKi9cclxuY2xhc3MgQmF0Y2hSZXF1ZXN0SW5mbyBpbXBsZW1lbnRzIElCYXRjaFJlcXVlc3RJbmZve1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbWV0aG9kOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9ib2R5OiBzdHJpbmc7XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBtZXRob2QoKSA6IHN0cmluZ3x1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRob2Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBib2R5KCkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ib2R5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdXJsKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91cmw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0cyBhbiBpbnN0YW5jZSBvZiBCYXRjaFJlcXVlc3RJbmZvLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlkXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8dW5kZWZpbmVkKX0gbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keVxyXG4gICAgICogQG1lbWJlcm9mIEJhdGNoUmVxdWVzdEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIG1ldGhvZDpzdHJpbmd8dW5kZWZpbmVkLCB1cmw6c3RyaW5nLCBib2R5OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5fdXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMuX2JvZHkgPSBib2R5O1xyXG4gICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmF0Y2hSZXF1ZXN0SW5mby5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZFxyXG4gICAgKiBAcGFyYW0geyhzdHJpbmd8dW5kZWZpbmVkKX0gbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keVxyXG4gICAgICogQG1lbWJlcm9mIEJhdGNoUmVxdWVzdEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZShpZDogbnVtYmVyLCBtZXRob2Q6IHN0cmluZyB8IHVuZGVmaW5lZCwgdXJsOiBzdHJpbmcsIGJvZHk6IGFueSk6IElCYXRjaFJlcXVlc3RJbmZvIHtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzaW5nbGUgYmF0Y2ggb2JqZWN0XHJcbiAgICAgICAgbGV0IHNpbmdsZUJhdGNoUmVxdWVzdDphbnkgPSB7XHJcbiAgICAgICAgICAgIGlkOiBpZCwgXHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLCBcclxuICAgICAgICAgICAgdXJsOiB1cmwsIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIGJvZHkgZGF0YSBpZiBkZWZpbmVkXHJcbiAgICAgICAgaWYgKGJvZHkpIHtcclxuICAgICAgICAgICAgc2luZ2xlQmF0Y2hSZXF1ZXN0LmJvZHkgPSBib2R5O1xyXG4gICAgICAgICAgICBzaW5nbGVCYXRjaFJlcXVlc3QuaGVhZGVycyA9IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNpbmdsZUJhdGNoUmVxdWVzdDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgcmVzdCByZXF1ZXN0IGluZm9cclxuICpcclxuICogQGNsYXNzIFJlc3RSZXF1ZXN0XHJcbiAqL1xyXG5jbGFzcyBSZXN0UmVxdWVzdEluZm97XHJcbiAgICBcclxuICAgIHByaXZhdGUgX3NldHRpbmdzOkpRdWVyeS5BamF4U2V0dGluZ3M8YW55PiA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXN0UmVxdWVzdC5cclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5LkFqYXhTZXR0aW5nczxhbnk+fSBzZXR0aW5nc1xyXG4gICAgICogQG1lbWJlcm9mIFJlc3RSZXF1ZXN0XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzOkpRdWVyeS5BamF4U2V0dGluZ3M8YW55Pil7XHJcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHJlc3QgcmVxdWVzdCBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0pRdWVyeS5BamF4U2V0dGluZ3M8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBSZXN0UmVxdWVzdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzKCkgOiBKUXVlcnkuQWpheFNldHRpbmdzPGFueT4gIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3M7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgYmFzaWMgcmVzdCBzZXJ2aWNlIGNhbGxcclxuICpcclxuICogQGNsYXNzIFJlc3RTZXJ2aWNlXHJcbiAqL1xyXG5jbGFzcyBSZXN0U2VydmljZXtcclxuXHJcblxyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgc2VydmljZSBtb2RlXHJcbiAgICBwdWJsaWMgbW9kZTogUmVzdFNlcnZpY2VNb2RlID0gUmVzdFNlcnZpY2VNb2RlLkVYRUNVVEU7XHJcblxyXG5cclxuICAgIC8vIGhvbGRzIHJlc3QgcmVxdWVzdCBzZXR0aW5ncyBmb3IgYmF0Y2ggbW9kZVxyXG4gICAgcHJpdmF0ZSBfYmF0Y2hSZXF1ZXN0czogUmVzdFJlcXVlc3RJbmZvW10gPSBbXTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzdFNlcnZpY2UuXHJcbiAgICAgKiBAbWVtYmVyb2YgUmVzdFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaWYgdGhlIHNlcnZpY2UgaGFzIHBlbmRpbmcgcmVxdWVzdHNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFJlc3RTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNCYXRjaFJlcXVlc3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXRjaFJlcXVlc3RzLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBjYWxsPFQ+KHNlcnZpY2VUeXBlOiBSZXN0U2VydmljZVR5cGUsIHNlcnZpY2VVcmw6IHN0cmluZywgc2VydmljZURhdGE6IGFueSB8IG51bGwgPSBudWxsLCBzZXJ2aWNlSGVhZGVyczogYW55fG51bGwgPSBudWxsKTogUHJvbWlzZTxUPiB7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgYmFzaWMgcmVxdWVzdCBkZXNjcmlwdG9yXHJcbiAgICAgICAgbGV0IHJlc3RSZXF1ZXN0ID0gdGhpcy5jcmVhdGVSZXF1ZXN0KHNlcnZpY2VUeXBlLCBzZXJ2aWNlVXJsLHNlcnZpY2VEYXRhLCBzZXJ2aWNlSGVhZGVycyk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBwcm9taXNlIGZvciB0aGUgcmVzdCByZXF1ZXN0XHJcbiAgICAgICAgY29uc3QgcmVzdFNlcnZpY2VQcm9taXNlID0gdGhpcy5jcmVhdGVSZXN0UmVxdWVzdFByb21pc2U8VD4ocmVzdFJlcXVlc3QpO1xyXG5cclxuICAgICAgICAvLyBhdHRhY2ggdGhlIHJlcXVlc3QgaW5mbyB0byB0aGUgcHJvbWlzZVxyXG4gICAgICAgICg8YW55PnJlc3RTZXJ2aWNlUHJvbWlzZSkucmVzdFJlcXVlc3RJbmZvID0gcmVzdFJlcXVlc3Q7XHJcblxyXG4gICAgICAgIC8vIHJldHVybiBqdXN0IHRoZSByZXF1ZXN0IGluZm8gb3Igd2FpdCBmb3IgZXhlY3V0aW5nIHRoZSByZXF1dWVzdFxyXG4gICAgICAgIHJldHVybiAgcmVzdFNlcnZpY2VQcm9taXNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyB0aGUgbGlzdCBvZiByZXF1ZXRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBSZXN0U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgIGNsZWFyQmF0Y2hSZXF1ZXN0cygpe1xyXG5cclxuICAgICAgICB0aGlzLl9iYXRjaFJlcXVlc3RzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyB0aGUgYmF0Y2ggcmVxdWVzdCBzcGVjZmllZCBieSB0aGUgcmVxdWVzdCBjb2xsZWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBSZXN0U2VydmljZVxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGV4ZWN1dGVCYXRjaFJlcXVlc3QoKTpQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGNvbnN0IGJhdGNoUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNhbGxCYXRjaFJlcXVlc3QoXCJcIix0aGlzLl9iYXRjaFJlcXVlc3RzKTtcclxuICAgICAgICByZXR1cm4gYmF0Y2hSZXNwb25zZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxscyBhIGJhdGNoIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKiBAdGVtcGxhdGUgVFxyXG4gICAgICogQHBhcmFtIHtKUXVlcnkuQWpheFNldHRpbmdzPGFueT5bXX0gcmVzdFJlcXVlc3RzXHJcbiAgICAgKiBAbWVtYmVyb2YgUmVzdFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBjYWxsQmF0Y2hSZXF1ZXN0PFQ+KGJhdGNoU2VydmljZUJhc2VVcmw6IHN0cmluZywgc2VydmljZVJlcXVlc3RzOlJlc3RSZXF1ZXN0SW5mb1tdKTogUHJvbWlzZTxUPiB7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgYmFzZSB1cmwgaW4gY29tbW9uIGZvciBhbGwgcmVxdWV0c1xyXG4gICAgICAgIGJhdGNoU2VydmljZUJhc2VVcmwgPSB0aGlzLmdldEJhdGNoUmVxdWVzdEJhc2VVcmwoc2VydmljZVJlcXVlc3RzKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBiYXRjaCBsaXN0XHJcbiAgICAgICAgbGV0IGJhdGNoUmVxdWVzdHMgPSB7cmVxdWVzdHM6IHRoaXMuY3JlYXRlQmF0Y2hSZXF1ZXN0c0RhdGEoc2VydmljZVJlcXVlc3RzLCBiYXRjaFNlcnZpY2VCYXNlVXJsKSB9IDtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBiYXRjaCByZXF1ZXN0XHJcbiAgICAgICAgbGV0IGJhdGNoUmVxdWVzdCA9IHRoaXMuY3JlYXRlUmVxdWVzdChSZXN0U2VydmljZVR5cGUuUE9TVCwgYmF0Y2hTZXJ2aWNlQmFzZVVybCArICcvJGJhdGNoJyAsIGJhdGNoUmVxdWVzdHMgKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHByb21pc2UgZm9yIHRoZSByZXN0IGJhdGNoIHJlcXVlc3RcclxuICAgICAgICBjb25zdCByZXN0QmF0Y2hTZXJ2aWNlUHJvbWlzZSA9IHRoaXMuY3JlYXRlUmVzdFJlcXVlc3RQcm9taXNlPFQ+KGJhdGNoUmVxdWVzdCk7XHJcblxyXG4gICAgICAgIC8vIHJldHVybiBqdXN0IHRoZSByZXF1ZXN0IGluZm8gb3Igd2FpdCBmb3IgZXhlY3V0aW5nIHRoZSByZXF1dWVzdFxyXG4gICAgICAgIHJldHVybiAgcmVzdEJhdGNoU2VydmljZVByb21pc2U7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW5kIGluaXRpYWxpemVzIHRoZSBiYXRjaCByZXF1ZXN0cyBmcm9tIHRoZSBvcmlnaW5hbCBzaW5nbGUgcmVxdWVzdHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtSZXN0UmVxdWVzdEluZm9bXX0gc2VydmljZVJlcXVlc3RzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYmF0Y2hTZXJ2aWNlQmFzZVVybFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBSZXN0U2VydmljZVxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGNyZWF0ZUJhdGNoUmVxdWVzdHNEYXRhKHNlcnZpY2VSZXF1ZXN0czogUmVzdFJlcXVlc3RJbmZvW10sIGJhdGNoU2VydmljZUJhc2VVcmw6IHN0cmluZyk6IElCYXRjaFJlcXVlc3RJbmZvW10ge1xyXG5cclxuICAgICAgICAvLyBidWlsZCB0aGUgYmF0Y2ggcmVxdWVzdHNcclxuICAgICAgICBsZXQgYmF0Y2hSZXF1ZXN0cyA9IHRoaXMuYnVpbGRCYXRjaFJlcXVlc3RzKHNlcnZpY2VSZXF1ZXN0cywgYmF0Y2hTZXJ2aWNlQmFzZVVybCk7XHJcblxyXG4gICAgICAgIHJldHVybiBiYXRjaFJlcXVlc3RzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1Jlc3RSZXF1ZXN0SW5mb1tdfSBzZXJ2aWNlUmVxdWVzdHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYXRjaFNlcnZpY2VCYXNlVXJsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFJlc3RTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYnVpbGRCYXRjaFJlcXVlc3RzKHNlcnZpY2VSZXF1ZXN0czogUmVzdFJlcXVlc3RJbmZvW10sIGJhdGNoU2VydmljZUJhc2VVcmw6IHN0cmluZykge1xyXG5cclxuICAgICAgICBsZXQgYmF0Y2hSZXF1ZXN0czogSUJhdGNoUmVxdWVzdEluZm9bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VydmljZVJlcXVlc3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VSZXF1ZXN0OiBSZXN0UmVxdWVzdEluZm8gPSBzZXJ2aWNlUmVxdWVzdHNbaV07XHJcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlUmVxdWVzdC5zZXR0aW5ncy51cmwpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgYmFzZSB1cmwgZnJvbSB0aGUgc2luZ2xlIHJlcXVlc3QgdXJsXHJcbiAgICAgICAgICAgICAgICBsZXQgc2luZ2xlUmVxdWVzdFVybCA9IHNlcnZpY2VSZXF1ZXN0LiAgIHNldHRpbmdzLnVybC5yZXBsYWNlKGJhdGNoU2VydmljZUJhc2VVcmwsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gZXh0cmFjdCBzZXJ2aWNlIGRhdGFcclxuICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0RGF0YSA9IHNlcnZpY2VSZXF1ZXN0LnNldHRpbmdzLmRhdGEgPyBKU09OLnBhcnNlKDxhbnk+c2VydmljZVJlcXVlc3Quc2V0dGluZ3MuZGF0YSkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBiYXRjaFJlcXVlc3RzLnB1c2goQmF0Y2hSZXF1ZXN0SW5mby5jcmVhdGUoaSwgc2VydmljZVJlcXVlc3Quc2V0dGluZ3MudHlwZSxzaW5nbGVSZXF1ZXN0VXJsLCByZXF1ZXN0RGF0YSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiYXRjaFJlcXVlc3RzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgYmFzZSB1cmwgd2hpY2ggaXMgdGhlIHNhbWUgZm9yIGFsbCByZXF1ZXN0c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzdFJlcXVlc3RJbmZvW119IHNlcnZpY2VSZXF1ZXN0c1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBSZXN0U2VydmljZVxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGdldEJhdGNoUmVxdWVzdEJhc2VVcmwoc2VydmljZVJlcXVlc3RzOiBSZXN0UmVxdWVzdEluZm9bXSkgOiBzdHJpbmd7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgcmVxdWVzdCB1cmxzXHJcbiAgICAgICAgdmFyIHJlcXVlc3RVcmxzOnN0cmluZ1tdID0gc2VydmljZVJlcXVlc3RzLm1hcCgocmVxdWVzdCk9PiByZXF1ZXN0LnNldHRpbmdzLnVybCkuZmlsdGVyKCAodXJsKSA9PiB7cmV0dXJuIHVybCAhPT0gdW5kZWZpbmVkIH0pIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgIC8vIHNwbGl0IHRoIHVybHMgaW50byB0aGVpciBwYXJ0c1xyXG4gICAgICAgIHZhciByZXF1ZXN0VXJsc1NwbGl0dGVkID0gcmVxdWVzdFVybHMubWFwKChyZXF1ZXN0VXJsKT0+IHJlcXVlc3RVcmwuc3BsaXQoXCIvXCIpKTtcclxuXHJcbiAgICAgICAgLy8gc2VhcmNoIGZvciB0aGUgYmFzZSB1cmwgaW4gY29tbW9uIGZvciBhbGwgcmVxdWVzdHNcclxuICAgICAgICB2YXIgYmFzZVVybERlcHRoID0gLTE7XHJcbiAgICAgICAgdmFyIGJhc2VVcmxGb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIHdoaWxlICghYmFzZVVybEZvdW5kKSB7XHJcbiAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSB1cmwgZGVwdGhcclxuICAgICAgICAgICAgYmFzZVVybERlcHRoKys7IFxyXG4gICAgICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggYWxsIHJlcXVlc3QgdXJscyAuLi5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXF1ZXN0VXJsc1NwbGl0dGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhbmQgY2hlY2sgaWYgdGhlIGJhc2UgdXJsIGRlcHRoIGV4ZWVkcyBhbnkgc2luZ2xlIHVybCBkZXB0aCBvciBhbnkgb2YgdGhlIHVybCBwYXJ0cyBpcyBkZWlmZmVyZW50LlxyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VVcmxEZXB0aCA+PSByZXF1ZXN0VXJsc1NwbGl0dGVkW2ldLmxlbmd0aCB8fCByZXF1ZXN0VXJsc1NwbGl0dGVkW2ldW2Jhc2VVcmxEZXB0aF0gIT0gcmVxdWVzdFVybHNTcGxpdHRlZFswXVtiYXNlVXJsRGVwdGhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgYXIgZG9uZSB3aXRoIHNyZWFjaGluZyBiZWNhdXNlIHRoZSBleGl0IGNyaXRlcmlhIGlzIG1ldC5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlVXJsRm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBidWlsZCB0aGUgYmFzZSBwYXRoIGJhc2VkIHVuZCB0aGUgY2FsY3VsYXRlZCBkZXB0aCBhbmQgdGhlIGZpcnN0IHJlcXVlc3RcclxuICAgICAgICB2YXIgYmF0Y2hCYXNlVXJsID0gXCJcIjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhc2VVcmxEZXB0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJhdGNoQmFzZVVybCArPSAgcmVxdWVzdFVybHNTcGxpdHRlZFswXSFbaV0gKyBcIi9cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBsYXN0IFwiL1wiXHJcbiAgICAgICAgYmF0Y2hCYXNlVXJsID0gYmF0Y2hCYXNlVXJsLnNsaWNlKDAsYmF0Y2hCYXNlVXJsLmxlbmd0aC0xKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJhdGNoQmFzZVVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBwcm9taXNlIGVuY2xvc2luZyB0aGUgcmVzdCByZXF1ZXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UmVzdFJlcXVlc3RJbmZvfSByZXN0UmVxdWVzdFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBSZXN0U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVJlc3RSZXF1ZXN0UHJvbWlzZTxUPihyZXN0UmVxdWVzdDogUmVzdFJlcXVlc3RJbmZvKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PSBSZXN0U2VydmljZU1vZGUuRVhFQ1VURSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgdGhlIHJlc3Qgc2VydmljZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCB0aGUgY2FsbGJhY2sgZnVuY3Rpb25zIHRvIHRoZSBwcm9taXNlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3RSZXF1ZXN0LnNldHRpbmdzLnN1Y2Nlc3MgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3RSZXF1ZXN0LnNldHRpbmdzLmVycm9yID0gcmVqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgcmVzdCByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHJlc3RSZXF1ZXN0LnNldHRpbmdzKTsgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMubW9kZSA9PSBSZXN0U2VydmljZU1vZGUuQkFUQ0gpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpbiBiYXRjaCBtb2RlIHdlIGp1c3QgY29sbGVjdCB0aGUgcmVxdWVzdHMgLi4uLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JhdGNoUmVxdWVzdHMucHVzaChyZXN0UmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIGJhdGNoIG1vZGUgcmVzdCByZXF1ZXN0IGluZm8gaXMgcmV0dXJuZWQgYXMgcmVzdWx0LiBUaGlzIGFsbG93cyBhY2N1bXVsYXRpbmcgbXVsdGlwbGUgcmVxdWVzdHMgdG8gYmUgZXhlY3V0ZWQgd2l0aGluIGEgYmF0Y2ggcmVxdWVzdCBjYWxsLlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdFJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGJhc2ljIGFqYXggcmVxdWVzdCBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UmVzdFNlcnZpY2VUeXBlfSBzZXJ2aWNlVHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlcnZpY2VVcmxcclxuICAgICAqIEBwYXJhbSB7KHZhbHVlPzogYW55KSA9PiB2b2lkfSByZXNvbHZlXHJcbiAgICAgKiBAcGFyYW0geyhyZWFzb24/OiBhbnkpID0+IHZvaWR9IHJlamVjdFxyXG4gICAgICogQHJldHVybnMgeyhKUXVlcnkuQWpheFNldHRpbmdzPGFueT4gfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFJlc3RTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgY3JlYXRlUmVxdWVzdChzZXJ2aWNlVHlwZTogUmVzdFNlcnZpY2VUeXBlLCBzZXJ2aWNlVXJsOiBzdHJpbmcsIHNlcnZpY2VEYXRhOiBhbnkgfCBudWxsPW51bGwgLCBzZXJ2aWNlSGVhZGVyczogYW55fG51bGw9bnVsbCk6IFJlc3RSZXF1ZXN0SW5mb3tcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgYW5kIGluaXRpYWxpemUgdGhlIHNlcnZpY2UgcmVxdWVzdCBvYmplY3RcclxuICAgICAgICBsZXQgcmVzdFJlcXVlc3Q6SlF1ZXJ5LkFqYXhTZXR0aW5nczxhbnk+ID0ge1xyXG4gICAgICAgICAgICB0eXBlOiBzZXJ2aWNlVHlwZSxcclxuICAgICAgICAgICAgdXJsOiBzZXJ2aWNlVXJsLFxyXG4gICAgICAgICAgICB4aHJGaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHNldCByZXF1ZXN0IGRhdGEgaWYgZGVmaW5lZFxyXG4gICAgICAgIGlmIChzZXJ2aWNlRGF0YSkge1xyXG4gICAgICAgICAgICByZXN0UmVxdWVzdC5kYXRhID0gIEpTT04uc3RyaW5naWZ5KHNlcnZpY2VEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaWYgZGVmaW5lZFxyXG4gICAgICAgIGlmIChzZXJ2aWNlSGVhZGVycykge1xyXG4gICAgICAgICAgICByZXN0UmVxdWVzdC5oZWFkZXJzID0gc2VydmljZUhlYWRlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdFJlcXVlc3RJbmZvKHJlc3RSZXF1ZXN0KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7UmVzdFNlcnZpY2UsIFJlc3RTZXJ2aWNlVHlwZSwgUmVzdFNlcnZpY2VNb2RlLFJlc3RSZXF1ZXN0SW5mb307Il19