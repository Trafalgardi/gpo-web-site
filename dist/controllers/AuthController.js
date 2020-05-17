"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    constructor(app) {
        this.app = app;
        this.userDataProvider = this.app.providers.user;
    }
    selectUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.body.email;
            let result = yield this.userDataProvider.selectUser(email);
            res.json(result);
        });
    }
    regUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.body.email;
            let password = req.body.password;
            let token = yield this.userDataProvider.regUser(email, password);
            res.cookie('token', token);
            res.json(token);
        });
    }
}
exports.default = AuthController;
