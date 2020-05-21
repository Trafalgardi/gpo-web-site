import IAppRoute from "../configs/IAppRoute";
import App from "../app";
import { Request, Response, NextFunction } from 'express'
import AuthController from "../controllers/AuthController";
const AuthRoute: IAppRoute = {
    createRouter(router: any) {
        let app = App.Instance;

        const autCtrl = new AuthController(app);
        return router()
            .get('/', (req: Request, res: Response) => {
                //
                res.redirect("/signin");
                //check user
                //signin or homepage
            })
            .get('/signin', (req: Request, res: Response) => {
                let current_user = AuthController.authCheck(req, res);
                console.log(current_user);
                if (current_user == null)
                    res.render('signin');
                else
                    res.redirect('/page/homepage');
            })
            .post('/signin', (req: Request, res: Response) => {
                autCtrl.signIn(req, res);
            })

            .get('/signup', (req: Request, res: Response) => {
                let current_user = AuthController.authCheck(req, res);
                console.log(current_user);
                if (current_user == null)
                    res.render('signup');
                else
                    res.redirect('/page/homepage');
            })
            .post('/signup', (req: Request, res: Response) => {
                autCtrl.signUp(req, res);
            })
            
            .get('/sign-out', (req: Request, res: Response) => {
                autCtrl.signOut(req, res);
            })
    }
}

export default AuthRoute;