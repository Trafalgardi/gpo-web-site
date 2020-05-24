import App from "../app";
import WebClientDataProvider from "../providers/WebClientDataProvider";
import { Request, Response, NextFunction } from 'express'
import SecurityService from "../services/SecurityService";
import { TestExecution } from "../../TestProcessing/TestProcessing.js"
import AuthController from "./AuthController";
export default class TestController {
    private webClientDataProvider: WebClientDataProvider;
    constructor(private app: App) {
        this.webClientDataProvider = this.app.providers.webClient;
    }

    async getTest(req: Request, res: Response) {// конкретный тест
        let test_id = Number.parseInt(req.params.id);
        if (isNaN(test_id)) {
            res.redirect("/page/opentests");
            return;
        }
        let checkAccessTest = await this.checkAccessTest(req, res, test_id);
        if (checkAccessTest == false) {
            res.redirect("/page/opentests");
            return;
        }

        let testData = await this.webClientDataProvider.getTestData(test_id);
        if (test_id > 33) {
            console.log("Обработка теста нового образца!")
            res.render('testReborn', { json: testData, id: test_id })
            return
        }
        res.render('test', { json: JSON.stringify(testData), id: req.params.id })

    }

    async getOpenTests(req: Request, res: Response) { // доступные тесты
        let payload = AuthController.authCheck(req, res);
        console.log(payload)
        let allTests = await this.webClientDataProvider.getAllTests();
        let idBanTests = await this.webClientDataProvider.getIdBanTests(payload.id);
        let tests = [];
        for (let i = 0; i < allTests.length; i++) {
            if (idBanTests.indexOf(allTests[i].id) === -1) {
                tests.push(allTests[i]);
            }
        }
        let categories = await this.webClientDataProvider.getTestCategorias();
        res.json({
            categories,
            tests
        });
    }

    async setDataTestNew(req: Request, res: Response) { //Записать результаты теста
        let body = req.body; // Our body from post request
        let payload = AuthController.authCheck(req, res);

        let answers = body.answers;
        let str: string = body.test_id;
        if (!str.match(/^\d+$/)) {
            res.status(400).send("Syntax error")
            return;
        }
        let test_id: number = Number.parseInt(body.test_id);

        let checkAccessTest = await this.checkAccessTest(req, res, test_id);
        console.log("checkAccessTest: " + checkAccessTest)
        if (checkAccessTest == false) {
            //res.status(404).send("Test not found")
            console.log("Попытка отправит заблокированный тест")
            res.redirect("/page/opentests");
            return;
        }

        let result = answers;
        console.log(result)

        //Проверить, не находится ли тест в заблокированных

        //res.json(result)
        res.render('post')
    }

    async setDataTest(req: Request, res: Response) { //Записать результаты теста
        let body = req.body; // Our body from post request
        let token = req.cookies.token;
        let payload = SecurityService.verifyToken(token);
        console.log("Body \n")
        console.log(req.body)
        let temp = Object.values(body);
        let answers = {
            data: []
        };
        let test_id: number = Number.parseInt(body.id);
        console.log(test_id)
        let checkAccessTest = await this.checkAccessTest(req, res, test_id);
        console.log(checkAccessTest)
        if (checkAccessTest == false) {
            //res.status(404).send("Test not found")
            res.redirect("/page/opentests");
            return;
        }
        if (req.body.id != 25 && req.body.id != 26 && req.body.id != 33) {

            for (let index = 0; index < temp.length - 1; index++) {

                answers.data[index] = temp[index];

            }
        } else if (req.body.id == 25) {
            answers = {
                data: JSON.parse(req.body.ans)
            }
        } else if (req.body.id == 24) {
            answers = {
                data: req.body
            }
        } else if (req.body.id == 33) {
            answers = {
                data: []
            };

            for (let index = 0; index < 4; index++) {
                let tempArr = []
                for (let i = 0; i < 10; i++) {
                    let temp2 = req.body['checkbox_' + index + '_' + i]
                    tempArr.push(temp2)

                }
                answers.data.push(tempArr)

            }

        }
        let banTests = await this.webClientDataProvider.getIdBanTests(payload.id);

        banTests.push(test_id)
        await this.webClientDataProvider.updateBanUserTest(payload.id, banTests)
        let testResult = TestExecution(req.body.id, answers.data);
        await this.webClientDataProvider.insertUserTest(payload.id, req.body.id, JSON.stringify(answers), testResult)
        console.log("Данные ушли")
        res.render('post');
    }

    async checkAccessTest(req: Request, res: Response, test_id: number): Promise<boolean> {
        let payload = AuthController.authCheck(req, res);
        let ban = await this.webClientDataProvider.getIdBanTests(payload.id);
        console.log(ban)
        return !ban.includes(test_id);
    }

    //Перенести в отдельный файл
    getCase() {

    }

    getOpenCases() {

    }

    setCase() {

    }
}