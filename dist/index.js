"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
try {
    new app_1.default({
        port: 3000,
        applicationName: 'RESS'
    }).run();
}
catch (e) {
    console.error(e.message);
}
