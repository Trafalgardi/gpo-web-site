import App from "../app";
import WebClientDataProvider from "../providers/WebClientDataProvider";
import { Request, Response, NextFunction } from 'express'
import SecurityService from "../services/SecurityService";
import {TestExecution} from "../../TestProcessing/TestProcessing.js"
import AuthController from "./AuthController";
export default class TestController {
    private userDataProvider: WebClientDataProvider;
    constructor(private app: App) {
        this.userDataProvider = this.app.providers.webClient;
    }

    async getTest(req: Request, res: Response) {// конкретный тест
        let test = await this.userDataProvider.getTest(Number.parseInt(req.params.id));
        //console.log(test)
        if(Number.parseInt(req.params.id) > 33)
        {
            console.log("DSds")
            res.render('testReborn', { json: JSON.stringify(test[0].data), id: req.params.id })
           return
        }
        res.render('test', { json: JSON.stringify(test[0].data), id: req.params.id })

    }

    async getOpenTests(req: Request, res: Response) { // доступные тесты
        let payload = AuthController.authCheck(req, res);
        console.log(payload)
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
        let banTests = await this.userDataProvider.getIdBanTests(payload.id);
        let tmp = {
            ban: banTests,
        }
        tmp.ban.push(Number.parseInt(req.body.id))
        await this.userDataProvider.updateBanUserTest(payload.id, JSON.stringify(tmp))
        let testResult = TestExecution(req.body.id, answers.data);
        await this.userDataProvider.insertUserTest(payload.id, req.body.id, JSON.stringify(answers), testResult)
        console.log("Данные ушли")
        res.render('post');
    }

    //Перенести в отдельный файл
    getCase() {

    }

    getOpenCases() {

    }

    setCase() {

    }
}