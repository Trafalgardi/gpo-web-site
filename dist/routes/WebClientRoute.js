"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const WebClientRoute = {
    createRouter(router) {
        let app = app_1.default.Instance;
        let autCtrl = new AuthController_1.default(app);
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
            .use(autCtrl.verification)
            .get('/', (req, res) => {
            res.render('homepage');
        });
    }
};
exports.default = WebClientRoute;
