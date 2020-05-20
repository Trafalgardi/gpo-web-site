import IAppRoute from "../configs/IAppRoute";
import App from "../app";
import AdminPanelController from "../controllers/AdminPanelController";
import { Request, Response, NextFunction } from 'express'
const AdminPanelRoute: IAppRoute = {
    createRouter(router: any) {
        let app = App.Instance;

        const AdminPanelCtrl = new AdminPanelController(app);
        return router()
            //pages
            .get('/results', (req: Request, res: Response) => {
                res.render('users_results_form', { email: "authData.user.email" });
            })
            //query
            .post('/getResultsPDF', (req: Request, res: Response) => {
                AdminPanelCtrl.getResultsPDF(req, res);
            })
    }
}

export default AdminPanelRoute;