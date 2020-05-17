"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const RemoteClientController_1 = __importDefault(require("../controllers/RemoteClientController"));
const ClientRules_1 = require("../Enums/ClientRules");
const RemoteClientRoute = {
    createRouter(router) {
        let app = app_1.default.Instance;
        let clientController = new RemoteClientController_1.default(app);
        return router()
            .post('/authorization', (req, res) => {
            clientController.authorization(req, res);
        })
            .use((req, res, next) => {
            clientController.checkToken(req, res, next, ClientRules_1.ClientRules.user);
        })
            .get('/getUsers', (req, res) => {
            clientController.getUsers(req, res);
        })
            .post('/getUserTests', (req, res) => {
            clientController.getUserTests(req, res);
        });
    }
};
exports.default = RemoteClientRoute;
