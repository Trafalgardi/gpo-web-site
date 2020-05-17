"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebClientController {
    constructor(app) {
        this.app = app;
        this.userDataProvider = this.app.providers.webClient;
    }
    login() {
    }
    logout() {
    }
}
exports.default = WebClientController;
