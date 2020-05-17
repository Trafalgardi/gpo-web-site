"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoute_1 = __importDefault(require("./UserRoute"));
const RemoteClientRoute_1 = __importDefault(require("./RemoteClientRoute"));
const express_1 = require("express");
class AppRoutes {
    constructor() {
        this.routeList = [
            { path: '/client', router: RemoteClientRoute_1.default },
            { path: '/user', router: UserRoute_1.default }
        ];
    }
    mount(expApp) {
        this.routeList.forEach((item) => {
            expApp.use(item.path, item.router.createRouter(express_1.Router));
        });
    }
}
exports.default = AppRoutes;
