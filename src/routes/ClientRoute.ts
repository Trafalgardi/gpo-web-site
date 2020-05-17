import IAppRoute from "../configs/IAppRoute";
import App from "../app";
import ClientController from "../controllers/ClientController";
import {Request, Response, NextFunction} from 'express'
import { ClientRules } from "../Enums/ClientRules";

const ClientRoute: IAppRoute = {
    createRouter(router: any){
        let app = App.Instance;

        let clientController = new ClientController(app);

        return router()
            .post('/authorization', (req: Request, res: Response) =>{
                clientController.authorization(req, res);
            })
            .use((req: Request, res: Response, next: NextFunction) => {
                clientController.checkToken(req, res, next, ClientRules.user)
            })
            .get('/getUsers', (req: Request, res: Response) =>{
                clientController.getUsers(req, res);
            })
            .post('/getUserTests', (req: Request, res: Response) =>{
                clientController.getUserTests(req, res);
            })
            

    }
}

export default ClientRoute;