"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const AnketaController_1 = __importDefault(require("../controllers/AnketaController"));
const TestController_1 = __importDefault(require("../controllers/TestController"));
const WebClientRoute = {
    createRouter(router) {
        let app = app_1.default.Instance;
        const anketaCtrl = new AnketaController_1.default(app);
        const testCtrl = new TestController_1.default(app);
        return router()
            .use('/', function timeLog(req, res, next) {
            console.log('Time: ', Date.now());
            next();
        })
            .use('/', (req, res, next) => {
            AuthController_1.default.verification(req, res, next);
        })
            .get('/', (req, res) => {
            res.redirect('/page/homepage');
        })
            .get('/homepage', (req, res) => {
            let current_user = AuthController_1.default.authCheck(req, res);
            res.render('homepage', { email: current_user.email });
        })
            .get('/opentests', (req, res) => {
            let current_user = AuthController_1.default.authCheck(req, res);
            res.render('opentests', { email: current_user.email });
        })
            .get('/getOpenTests', (req, res) => {
            console.log("WOW");
            testCtrl.getOpenTests(req, res);
        })
            .post('/setAnketaData', (req, res) => {
            anketaCtrl.setAnketaData(req, res);
        })
            .post('/getAnketaData', (req, res) => {
            anketaCtrl.getAnketaData(req, res);
        })
            .get('/questionnaire', (req, res) => {
            let current_user = AuthController_1.default.authCheck(req, res);
            res.render('questionnaire', { email: current_user.email });
        })
            .get('/test/:id', (req, res) => {
            testCtrl.getTest(req, res);
        })
            .post('/test/setDataTest', (req, res) => {
            testCtrl.setDataTest(req, res);
        });
    }
};
exports.default = WebClientRoute;
