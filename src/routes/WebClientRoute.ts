import IAppRoute from "../configs/IAppRoute";
import App from "../app";
import AuthController from "../controllers/AuthController";
import { Request, Response, NextFunction } from 'express'
import AnketaController from "../controllers/AnketaController";
import SecurityService from "../services/SecurityService";
import TestController from "../controllers/TestController";
import WebClientController from "../controllers/WebClientController";
const WebClientRoute: IAppRoute = {
    createRouter(router: any) {
        let app = App.Instance;
        const webClientCtrl = new WebClientController(app);
        const anketaCtrl = new AnketaController(app);
        const testCtrl = new TestController(app);
        return router()
            .use('/', function timeLog(req: Request, res: Response, next: NextFunction) {
                console.log(req.url + ' == Time: ', Date.now());
                next();
            })
            .use('/', (req: Request, res: Response, next: NextFunction) => {
                AuthController.verification(req, res, next);
            }) // Проверка сессии
            
            .get('/', (req: Request, res: Response) => {
                res.redirect('/page/homepage');
            })

            .get('/homepage', (req: Request, res: Response) => {
                
                webClientCtrl.showTeasts(req, res);
            })

            .get('/opentests', (req: Request, res: Response) => {
                let current_user = AuthController.authCheck(req, res);
                res.render('opentests', { email: current_user.email })
            })
            .get('/getOpenTests', (req: Request, res: Response) => {
                testCtrl.getOpenTests(req, res);
            })
            .post('/setAnketaData', (req: Request, res: Response) => {
                anketaCtrl.setAnketaData(req, res);
            })

            .post('/getAnketaData', (req: Request, res: Response) => {
                anketaCtrl.getAnketaData(req, res);
            })

            .get('/questionnaire', (req: Request, res: Response) => {
                let current_user = AuthController.authCheck(req, res);
                res.render('questionnaire', { email: current_user.email });
            })
            .get('/test/:id', (req: Request, res: Response) => {
                testCtrl.getTest(req, res);
            })
            .post('/test/setDataTest', (req: Request, res: Response) => {
                testCtrl.setDataTest(req, res);
            })
            .post('/test/setDataTestNew', (req: Request, res: Response) => {
                testCtrl.setDataTestNew(req, res);
            })
            
        // .post('/getDataTest', getDataTest);
        // .post('/test/addDataTest', addDataTest);
        // .post('/test/updateTests', updateTests);//Проверка тестов в таблице user_tests(Коэф. пройденый тестов)
        // .post('/setAnketaCoef', setAnketaCoef); //Обновление столбца tests в таблице users(Коэф. анкеты)
    }
}

export default WebClientRoute;