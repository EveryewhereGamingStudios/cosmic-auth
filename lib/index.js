"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moralis_1 = __importDefault(require("moralis"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var errorHandler_1 = require("./middlewares/errorHandler");
var config_1 = __importDefault(require("./config"));
var apiRouter_1 = require("./apiRouter");
var app = (0, express_1.default)();
moralis_1.default.start({
    apiKey: config_1.default.MORALIS_API_KEY,
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', apiRouter_1.apiRouter);
app.use(errorHandler_1.errorHandler);
app.use(express_1.default.static('public'));
app.listen(config_1.default.PORT, function () {
    // eslint-disable-next-line no-console
    console.log("".concat(config_1.default.APP_NAME, " is running on port ").concat(config_1.default.PORT));
});
