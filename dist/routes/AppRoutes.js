"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientRoute_1 = __importDefault(require("./ClientRoute"));
const express_1 = require("express");
class AppRoutes {
    constructor() {
        this.routeList = [
            { path: '/client', router: ClientRoute_1.default }
        ];
    }
    mount(expApp) {
        this.routeList.forEach((item) => {
            expApp.use(item.path, item.router.createRouter(express_1.Router));
        });
    }
}
exports.default = AppRoutes;
