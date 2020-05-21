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
const TokenAuthCkecker_1 = __importDefault(require("../services/TokenAuthCkecker"));
const COOKIE_TOKEN = 'token';
class AuthController {
    constructor(app) {
        this.app = app;
        this.authDataProvider = this.app.providers.auth;
    }
    static verification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user_id = AuthController.authCheck(req, res);
            if (user_id != null) {
                next();
            }
            else {
                res.redirect('/signin');
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            function throwError() {
                res.redirect('/singup');
            }
            if (AuthController.authCheck(req, res) != null) {
                res.redirect('/page/homepage');
                return;
            }
            let email = req.body.email;
            let password = req.body.password;
            if (email == undefined || password == undefined) {
                throwError();
                return;
            }
            let token = yield this.authDataProvider.signUp(email, password);
            if (token == null) {
                throwError();
                return;
            }
            AuthController.auth(req, res, { key: COOKIE_TOKEN, value: token });
            res.redirect('/page/homepage');
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            function throwError() {
                res.redirect('/signin');
            }
            if (AuthController.authCheck(req, res) != null) {
                res.redirect('/page/homepage');
                return;
            }
            const login = req.body.email;
            const password = req.body.password;
            if (login == null || login == undefined || password == null || password == undefined) {
                throwError();
                return;
            }
            let user = yield this.authDataProvider.selectUser(login);
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
            AuthController.auth(req, res, { key: COOKIE_TOKEN, value: token });
            res.redirect('/page/homepage');
        });
    }
    signOut(req, res) {
        AuthController.logout(req, res, COOKIE_TOKEN);
        res.redirect('/signin');
    }
}
AuthController.authCkecker = new TokenAuthCkecker_1.default();
AuthController.authCheck = AuthController.authCkecker.authCheck;
AuthController.auth = AuthController.authCkecker.auth;
AuthController.logout = AuthController.authCkecker.logout;
exports.default = AuthController;
