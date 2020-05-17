"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const AnketaController_1 = __importDefault(require("../controllers/AnketaController"));
const SecurityService_1 = __importDefault(require("../services/SecurityService"));
const WebClientRoute = {
    createRouter(router) {
        let app = app_1.default.Instance;
        const autCtrl = new AuthController_1.default(app);
        const anketaCtrl = new AnketaController_1.default(app);
        return router()
            .get('/signin', (req, res) => {
            res.render('signin');
        })
            .post('/signin', (req, res) => {
            autCtrl.signIn(req, res);
        })
            .get('/signup', (req, res) => {
            res.render('signup');
        })
            .post('/signup', (req, res) => {
            autCtrl.signUp(req, res);
        })
            .get('/', (req, res) => {
            res.redirect('/page/homepage');
        })
            .get('/sign-out', (req, res) => {
            autCtrl.signOut(req, res);
        })
            .use('/page', function timeLog(req, res, next) {
            console.log('Time: ', Date.now());
            next();
        })
            .use('/page', (req, res, next) => {
            autCtrl.verification(req, res, next);
        })
            .get('/page/homepage', (req, res) => {
            let token = req.cookies.token;
            let payload = SecurityService_1.default.verifyToken(token);
            res.render('homepage', { email: payload.email });
        })
            .get('/page/opentests', (req, res) => {
        })
            .post('/page/setAnketaData', (req, res) => {
            anketaCtrl.setAnketaData(req, res);
        })
            .post('/page/getAnketaData', (req, res) => {
            anketaCtrl.getAnketaData(req, res);
        })
            .get('/page/questionnaire', (req, res) => {
            let token = req.cookies.token;
            let payload = SecurityService_1.default.verifyToken(token);
            res.render('questionnaire', { email: payload.email });
        });
    }
};
exports.default = WebClientRoute;
