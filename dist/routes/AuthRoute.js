"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const AuthRoute = {
    createRouter(router) {
        let app = app_1.default.Instance;
        const autCtrl = new AuthController_1.default(app);
        return router()
            .get('/', (req, res) => {
            res.redirect("/signin");
        })
            .get('/signin', (req, res) => {
            let current_user = AuthController_1.default.authCheck(req, res);
            console.log(current_user);
            if (current_user == null)
                res.render('signin');
            else
                res.redirect('/page/homepage');
        })
            .post('/signin', (req, res) => {
            autCtrl.signIn(req, res);
        })
            .get('/signup', (req, res) => {
            let current_user = AuthController_1.default.authCheck(req, res);
            console.log(current_user);
            if (current_user == null)
                res.render('signup');
            else
                res.redirect('/page/homepage');
        })
            .post('/signup', (req, res) => {
            autCtrl.signUp(req, res);
        })
            .get('/sign-out', (req, res) => {
            autCtrl.signOut(req, res);
        });
    }
};
exports.default = AuthRoute;
