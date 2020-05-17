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
class ClientController {
    constructor(app) {
        this.app = app;
        this.clientDataProvider = this.app.providers.client;
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
            res.json(token);
        });
    }
    checkToken(req, res, next) {
        let isValid = true;
        if (isValid) {
            next();
        }
        else {
            res.sendStatus(406);
        }
    }
}
exports.default = ClientController;
