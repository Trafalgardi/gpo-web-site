"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const AdminPanelController_1 = __importDefault(require("../controllers/AdminPanelController"));
const AdminPanelRoute = {
    createRouter(router) {
        let app = app_1.default.Instance;
        const AdminPanelCtrl = new AdminPanelController_1.default(app);
        return router()
            .get('/results', (req, res) => {
            res.render('users_results_form', { email: "authData.user.email" });
        })
            .post('/getResultsPDF', (req, res) => {
            AdminPanelCtrl.getResultsPDF(req, res);
        });
    }
};
exports.default = AdminPanelRoute;
