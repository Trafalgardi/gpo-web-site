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
const COOKIE_TOKEN = 'token';
class AuthController {
    constructor(app) {
        this.app = app;
        this.webClientDataProvider = this.app.providers.user;
    }
    selectUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.body.email;
            let result = yield this.webClientDataProvider.selectUser(email);
            res.json(result);
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.body.email;
            let password = req.body.password;
            let token = yield this.webClientDataProvider.signUp(email, password);
            res.cookie(COOKIE_TOKEN, token);
            res.json(token);
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = req.body.email;
            const password = req.body.password;
            let errorMsg = { msg: "Не верный логин или пароль", error: 401 };
            function throwError() {
                res.redirect('/signin');
            }
            if (login == null || login == undefined) {
                throwError();
                return;
            }
            let user = yield this.webClientDataProvider.selectUser(login);
            if (user == null || user.password == '') {
                throwError();
                return;
            }
            let isValidPassword = SecurityService_1.default.validatePassword(password, user.password);
            if (isValidPassword == false) {
                throwError();
                return;
            }
            let payload = {
                id: user.id,
                email: user.email
            };
            let token = SecurityService_1.default.generateToken(payload);
            res.cookie(COOKIE_TOKEN, token);
            res.redirect('/homepage');
        });
    }
    verification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let cookies = req.cookies;
            if (cookies == null || cookies == undefined) {
                res.redirect('/signin');
                return;
            }
            let token = cookies[COOKIE_TOKEN];
            let isTokenValid = SecurityService_1.default.verifyToken(token) != null;
            if (isTokenValid) {
                next();
            }
            else {
                res.redirect('/signin');
            }
        });
    }
}
exports.default = AuthController;
