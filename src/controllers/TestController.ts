import App from "../app";
import WebClientDataProvider from "../providers/WebClientDataProvider";
import { Request, Response, NextFunction } from 'express'
import SecurityService from "../services/SecurityService";
export default class TestController {
    private userDataProvider: WebClientDataProvider;
    constructor(private app: App) {
        this.userDataProvider = this.app.providers.webClient;
    }

    getTest() {// конкретный тест

    }

    async getOpenTests(req: Request, res: Response) { // доступные тесты
        let token = req.cookies.token;
        let payload = SecurityService.verifyToken(token);
        let allTests = await this.userDataProvider.getAllTests();
        let idBanTests = await this.userDataProvider.getIdBanTests(payload.id);
        let tests = [];
        for (let i = 0; i < allTests.length; i++) {
            if (idBanTests.indexOf(allTests[i].id) === -1) {
                tests.push(allTests[i]);
            }
        }
        let categories = await this.userDataProvider.getTestCategorias();
        res.json({
            categories,
            tests
        });
    }

    setDataTest() { //Записать результаты теста

    }

    //Перенести в отдельный файл
    getCase() {

    }

    getOpenCases() {

    }

    setCase() {

    }
}