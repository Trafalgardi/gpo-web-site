"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    constructor(app) {
        this.app = app;
        this.userDataProvider = this.app.providers.user;
    }
    login() {
    }
    logout() {
    }
}
exports.default = AuthController;
