"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const UserRoute = {
    createRouter(router) {
        let app = app_1.default.Instance;
        let AutCtrl = new AuthController_1.default(app);
        return router()
            .post('/selectUser', (req, res) => {
            AutCtrl.selectUser(req, res);
        })
            .post('/regUser', (req, res) => {
            AutCtrl.regUser(req, res);
        });
    }
};
exports.default = UserRoute;
