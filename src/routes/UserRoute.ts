import IAppRoute from "../configs/IAppRoute";
import App from "../app";
import AuthController from "../controllers/AuthController";

const UserRoute: IAppRoute = {
    createRouter(router: any){
        let app = App.Instance;

        let AutCtrl = new AuthController(app);

        return router()
            .get('/', (req: Request, res: Response) =>{

            })
    }
}

export default UserRoute;