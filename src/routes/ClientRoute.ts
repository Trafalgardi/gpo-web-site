import IAppRoute from "../configs/IAppRoute";
import App from "../app";
import ClientController from "../controllers/ClientController";
import {Request, Response} from 'express'
const ClientRoute: IAppRoute = {
    createRouter(router: any){
        let app = App.Instance;

        let clientController = new ClientController(app);

        return router()
            .use(clientController.checkToken)
            .post('/authorization', (req: Request, res: Response) =>{
                clientController.authorization(req, res);
            })

    }
}

export default ClientRoute;