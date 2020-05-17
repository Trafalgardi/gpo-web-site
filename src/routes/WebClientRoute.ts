import IAppRoute from "../configs/IAppRoute";
import App from "../app";
import AuthController from "../controllers/AuthController";
import { Request, Response, NextFunction } from 'express'
import AnketaController from "../controllers/AnketaController";
import SecurityService from "../services/SecurityService";
import TestController from "../controllers/TestController";
const WebClientRoute: IAppRoute = {
    createRouter(router: any) {
        let app = App.Instance;

        const autCtrl = new AuthController(app);
        const anketaCtrl = new AnketaController(app);
        const testCtrl = new TestController(app);
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

            .get('/', (req: Request, res: Response) => {
                res.redirect('/page/homepage');
            })

            .get('/sign-out', (req: Request, res: Response) => {
                autCtrl.signOut(req, res);
            })

            .use('/page', function timeLog(req, res, next) {
                console.log('Time: ', Date.now());
                next();
            })

            .use('/page', (req: Request, res: Response, next: NextFunction) => {
                autCtrl.verification(req, res, next);
            }) // Проверка сессии

            .get('/page/homepage', (req: Request, res: Response) => {
                let token = req.cookies.token;
                let payload = SecurityService.verifyToken(token);
                res.render('homepage', {email: payload.email});
            })

            .get('/page/opentests', (req: Request, res: Response) => {
                let token = req.cookies.token;
                let payload = SecurityService.verifyToken(token);
                res.render('opentests', {email: payload.email})
            })
            .get('/page/getOpenTests', (req: Request, res: Response) => {

                testCtrl.getOpenTests(req, res);
            })
            .post('/page/setAnketaData', (req: Request, res: Response) => {
                anketaCtrl.setAnketaData(req, res);
            })

            .post('/page/getAnketaData', (req: Request, res: Response) => {
                anketaCtrl.getAnketaData(req, res);
            })

            .get('/page/questionnaire', (req: Request, res: Response) => {
                let token = req.cookies.token;
                let payload = SecurityService.verifyToken(token);
                res.render('questionnaire', {email: payload.email});
            })
            .get('/page/test/:id', (req: Request, res: Response) => {
                testCtrl.getTest(req, res);
            })
            .post('/page/test/setDataTest', (req: Request, res: Response) => {
                testCtrl.setDataTest(req, res);
            })
        // .post('/getDataTest', getDataTest);
        // .post('/test/addDataTest', addDataTest);
        // .post('/test/updateTests', updateTests);//Проверка тестов в таблице user_tests(Коэф. пройденый тестов)
        // .post('/setAnketaCoef', setAnketaCoef); //Обновление столбца tests в таблице users(Коэф. анкеты)
    }
}

export default WebClientRoute;