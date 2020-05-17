"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const ClientController_1 = __importDefault(require("../controllers/ClientController"));
const ClientRules_1 = require("../Enums/ClientRules");
const ClientRoute = {
    createRouter(router) {
        let app = app_1.default.Instance;
        let clientController = new ClientController_1.default(app);
        return router()
            .post('/authorization', (req, res) => {
            clientController.authorization(req, res);
        })
            .use((req, res, next) => {
            clientController.checkToken(req, res, next, ClientRules_1.ClientRules.user);
        })
            .post('/getUsers', (req, res) => {
            clientController.GetUsers(req, res);
        });
    }
};
exports.default = ClientRoute;
