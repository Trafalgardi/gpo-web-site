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
            .use('/page', autCtrl.verification)
            .get('/page/homepage', (req, res) => {
            res.render('homepage');
        });
    }
};
exports.default = WebClientRoute;
