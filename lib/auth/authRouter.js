"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = __importDefault(require("express"));
var authController_1 = require("./authController");
exports.authRouter = express_1.default.Router();
exports.authRouter.route('/request-message').post(authController_1.request);
exports.authRouter.route('/sign-message').post(authController_1.verify);
