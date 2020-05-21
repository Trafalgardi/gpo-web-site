"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebClientRoute_1 = __importDefault(require("./WebClientRoute"));
const RemoteClientRoute_1 = __importDefault(require("./RemoteClientRoute"));
const express_1 = require("express");
const AdminPanelRoute_1 = __importDefault(require("./AdminPanelRoute"));
const AuthRoute_1 = __importDefault(require("./AuthRoute"));
class AppRoutes {
    constructor() {
        this.routeList = [
            { path: '/', router: AuthRoute_1.default },
            { path: '/client', router: RemoteClientRoute_1.default },
            { path: '/adminPanel', router: AdminPanelRoute_1.default },
            { path: '/page', router: WebClientRoute_1.default },
        ];
    }
    mount(expApp) {
        this.routeList.forEach((item) => {
            expApp.use(item.path, item.router.createRouter(express_1.Router));
        });
    }
}
exports.default = AppRoutes;
