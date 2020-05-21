"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IAuthCkecker_1 = __importDefault(require("../configs/IAuthCkecker"));
const SecurityService_1 = __importDefault(require("./SecurityService"));
const COOKIE_TOKEN = 'token';
class TokenAuthChecker extends IAuthCkecker_1.default {
    authCheck(req, res) {
        let cookies = req.cookies;
        if (cookies == null || cookies == undefined) {
            return null;
        }
        let token = cookies[COOKIE_TOKEN];
        let payload = SecurityService_1.default.verifyToken(token);
        if (payload == null) {
            return null;
        }
        if (payload.id == undefined || payload.id == null) {
            return null;
        }
        return { id: payload.id, email: payload.email };
    }
    auth(req, res, data) {
        res.cookie(data.key, data.value);
    }
    logout(req, res, data) {
        res.clearCookie(data);
    }
}
exports.default = TokenAuthChecker;
