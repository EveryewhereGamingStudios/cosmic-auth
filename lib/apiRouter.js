"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
var express_1 = __importDefault(require("express"));
var authRouter_1 = require("./auth/authRouter");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use('/auth', authRouter_1.authRouter);
