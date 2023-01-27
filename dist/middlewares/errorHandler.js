"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var common_core_1 = require("@moralisweb3/common-core");
var makeMoralisErrorMessage = function (error) {
    var _a, _b;
    var message = error.message || 'Unknown error';
    var errorResponse = (_a = error.details) === null || _a === void 0 ? void 0 : _a.response;
    var errorResponseData = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof errorResponse === 'object' ? ((_b = error.details) === null || _b === void 0 ? void 0 : _b.response).data : null;
    if (errorResponseData) {
        // Handle MoralisError
        if (errorResponseData && (errorResponseData === null || errorResponseData === void 0 ? void 0 : errorResponseData.message)) {
            message = "".concat((errorResponseData === null || errorResponseData === void 0 ? void 0 : errorResponseData.name) ? "".concat(errorResponseData.name, ": ") : '').concat(errorResponseData.message);
        }
        else if (errorResponseData.error) {
            // Handle ParseError
            message = errorResponseData.error;
        }
    }
    return message;
};
function errorHandler(error, req, res, _next) {
    var _a, _b;
    if (error instanceof common_core_1.MoralisError) {
        var status = typeof ((_a = error.details) === null || _a === void 0 ? void 0 : _a.status) === 'number' ? (_b = error.details) === null || _b === void 0 ? void 0 : _b.status : 500;
        var errorMessage = makeMoralisErrorMessage(error);
        res.status(status).json({ error: errorMessage });
    }
    else {
        res.status(500).json({ error: error.message });
    }
}
exports.errorHandler = errorHandler;
