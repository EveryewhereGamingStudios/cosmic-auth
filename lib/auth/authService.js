"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMessage = exports.requestMessage = void 0;
var moralis_1 = __importDefault(require("moralis"));
var supabase_js_1 = require("@supabase/supabase-js");
var config_1 = __importDefault(require("../config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var supabase = (0, supabase_js_1.createClient)(config_1.default.SUPABASE_URL, config_1.default.SUPABASE_SERVICE_KEY);
var STATEMENT = 'Please sign this message to confirm your identity.';
var EXPIRATION_TIME = 900000;
var TIMEOUT = 15;
function requestMessage(_a) {
    var address = _a.address, chain = _a.chain, networkType = _a.networkType;
    return __awaiter(this, void 0, void 0, function () {
        var url, now, expirationTime, result, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = new URL(config_1.default.SUPABASE_URL);
                    now = new Date();
                    expirationTime = new Date(now.getTime() + EXPIRATION_TIME);
                    return [4 /*yield*/, moralis_1.default.Auth.requestMessage({
                            address: address,
                            chain: chain,
                            networkType: networkType,
                            domain: url.hostname,
                            statement: STATEMENT,
                            uri: url.toString(),
                            notBefore: now.toISOString(),
                            expirationTime: expirationTime.toISOString(),
                            timeout: TIMEOUT,
                        })];
                case 1:
                    result = _b.sent();
                    message = result.toJSON().message;
                    return [2 /*return*/, message];
            }
        });
    });
}
exports.requestMessage = requestMessage;
function verifyMessage(_a) {
    var networkType = _a.networkType, signature = _a.signature, message = _a.message;
    return __awaiter(this, void 0, void 0, function () {
        var result, authData, user, response, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, moralis_1.default.Auth.verify({
                        networkType: networkType,
                        signature: signature,
                        message: message,
                    })];
                case 1:
                    result = _b.sent();
                    authData = result.toJSON();
                    return [4 /*yield*/, supabase.from('users').select('*').eq('moralis_provider_id', authData.profileId).single()];
                case 2:
                    user = (_b.sent()).data;
                    if (!!user) return [3 /*break*/, 4];
                    return [4 /*yield*/, supabase
                            .from('users')
                            .insert({ moralis_provider_id: authData.profileId, metadata: authData })
                            .single()];
                case 3:
                    response = _b.sent();
                    user = response.data;
                    _b.label = 4;
                case 4:
                    token = jsonwebtoken_1.default.sign(__assign(__assign({}, user), { aud: 'authenticated', role: 'authenticated', exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 }), config_1.default.SUPABASE_JWT);
                    return [2 /*return*/, { user: user, token: token }];
            }
        });
    });
}
exports.verifyMessage = verifyMessage;
