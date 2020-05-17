import IAppRoute from "../configs/IAppRoute";
import App from "../app";
import AuthController from "../controllers/AuthController";
import { Request, Response } from 'express'
const UserRoute: IAppRoute = {
    createRouter(router: any) {
        let app = App.Instance;

        let AutCtrl = new AuthController(app);

        return router()
            .post('/selectUser', (req: Request, res: Response) => {
                AutCtrl.selectUser(req, res);
            })
            .post('/regUser', (req: Request, res: Response) => {
                AutCtrl.regUser(req, res);
            })
    }
}

export default UserRoute;