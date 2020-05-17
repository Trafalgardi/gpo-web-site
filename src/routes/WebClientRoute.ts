import IAppRoute from "../configs/IAppRoute";
import App from "../app";
import AuthController from "../controllers/AuthController";
import { Request, Response } from 'express'
const WebClientRoute: IAppRoute = {
    createRouter(router: any) {
        let app = App.Instance;

        let autCtrl = new AuthController(app);

        return router()
            .get('/signin', (req: Request, res: Response) => {
                res.render('signin');
            })
            .post('/signin', (req: Request, res: Response) => {
                autCtrl.signIn(req, res);
            })

            .get('/signup', (req: Request, res: Response) => {
                res.render('signup');
            })
            .post('/signup', (req: Request, res: Response) => {
                autCtrl.signUp(req, res);
            })

            .use(autCtrl.verification)
            .get('/', (req: Request, res: Response) => {
                res.render('homepage');
                
            })
           
    }
}

export default WebClientRoute;