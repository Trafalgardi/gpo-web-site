"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SecurityService_1 = __importDefault(require("../services/SecurityService"));
const ClientRules_1 = require("../Enums/ClientRules");
class RemouteClientController {
    constructor(app) {
        this.app = app;
        this.clientDataProvider = this.app.providers.remoteClient;
    }
    checkToken(req, res, next, targetRules) {
        let token = req.headers['access_token'];
        let payload = SecurityService_1.default.verifyToken(token);
        let isValid = false;
        if (payload != null) {
            let rulesString = payload.rules;
            let currentRules = ClientRules_1.ClientRules[rulesString];
            isValid = currentRules >= targetRules;
        }
        if (isValid) {
            next();
        }
        else {
            res.json({ msg: "Ошибка авторизации", error: 401 });
        }
        console.log("isValidUser: " + isValid);
    }
    authorization(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let login = req.body.login;
            let password = req.body.password;
            if (login === undefined || password === undefined) {
                res.json({ msg: "Не верный логин", error: 400 });
                return;
            }
            let user = yield this.clientDataProvider.selectUser(login);
            if (user == null) {
                res.json({ msg: "Не верный логин", error: 400 });
                return;
            }
            let isValidPass = SecurityService_1.default.validatePassword(password, user.passwordHash);
            if (isValidPass == false) {
                res.json({ msg: "Не верный пароль", error: 400 });
                return;
            }
            let payload = {
                login: login,
                rules: user.rules
            };
            let token = SecurityService_1.default.generateToken(payload);
            res.json({ token: token, rules: user.rules });
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield this.clientDataProvider.getUsers();
            res.json(users);
        });
    }
    getUserTests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = req.body.user_id;
            let users = yield this.clientDataProvider.getUserTests(userId);
            res.json(users);
        });
    }
}
exports.default = RemouteClientController;
