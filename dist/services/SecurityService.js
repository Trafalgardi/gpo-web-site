"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SecurityService {
    static generatePasswordHash(password) {
        let salt = bcrypt_1.default.genSaltSync(10);
        let hash = bcrypt_1.default.hashSync(password, salt);
        return hash;
    }
    static validatePassword(password, hash) {
        return bcrypt_1.default.compareSync(password, hash);
    }
    static generateToken(payload) {
        let token = jsonwebtoken_1.default.sign(payload, this.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
        return token;
    }
    static verifyToken(token) {
        if (token == null || token == "" || token === undefined)
            return null;
        try {
            let error, data = jsonwebtoken_1.default.verify(token, this.TOKEN_SECRET_KEY);
            if (error) {
                console.log(error);
                return null;
            }
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
}
SecurityService.TOKEN_SECRET_KEY = 'SuperSecRetKey';
exports.default = SecurityService;
