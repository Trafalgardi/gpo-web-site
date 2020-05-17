"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SecurityService_1 = __importDefault(require("../services/SecurityService"));
const TestProcessing_js_1 = require("../../TestProcessing/TestProcessing.js");
class TestController {
    constructor(app) {
        this.app = app;
        this.userDataProvider = this.app.providers.webClient;
    }
    getTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let test = yield this.userDataProvider.getTest(Number.parseInt(req.params.id));
            console.log(test);
            res.render('test', { json: JSON.stringify(test[0].data), id: req.params.id });
        });
    }
    getOpenTests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.cookies.token;
            let payload = SecurityService_1.default.verifyToken(token);
            let allTests = yield this.userDataProvider.getAllTests();
            let idBanTests = yield this.userDataProvider.getIdBanTests(payload.id);
            let tests = [];
            for (let i = 0; i < allTests.length; i++) {
                if (idBanTests.indexOf(allTests[i].id) === -1) {
                    tests.push(allTests[i]);
                }
            }
            let categories = yield this.userDataProvider.getTestCategorias();
            res.json({
                categories,
                tests
            });
        });
    }
    setDataTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            let token = req.cookies.token;
            let payload = SecurityService_1.default.verifyToken(token);
            console.log("Body \n");
            console.log(req.body);
            let temp = Object.values(body);
            let answers = {
                data: []
            };
            if (req.body.id != 25 && req.body.id != 26 && req.body.id != 33) {
                for (let index = 0; index < temp.length - 1; index++) {
                    answers.data[index] = temp[index];
                }
            }
            else if (req.body.id == 25) {
                answers = {
                    data: JSON.parse(req.body.ans)
                };
            }
            else if (req.body.id == 24) {
                answers = {
                    data: req.body
                };
            }
            else if (req.body.id == 33) {
                answers = {
                    data: []
                };
                for (let index = 0; index < 4; index++) {
                    let tempArr = [];
                    for (let i = 0; i < 10; i++) {
                        let temp2 = req.body['checkbox_' + index + '_' + i];
                        tempArr.push(temp2);
                    }
                    answers.data.push(tempArr);
                }
            }
            let banTests = yield this.userDataProvider.getIdBanTests(payload.id);
            let tmp = {
                ban: banTests,
            };
            tmp.ban.push(Number.parseInt(req.body.id));
            yield this.userDataProvider.updateBanUserTest(payload.id, JSON.stringify(tmp));
            let testResult = TestProcessing_js_1.TestExecution(req.body.id, answers.data);
            yield this.userDataProvider.insertUserTest(payload.id, req.body.id, JSON.stringify(answers), testResult);
            console.log("Данные ушли");
            res.render('post');
        });
    }
    getCase() {
    }
    getOpenCases() {
    }
    setCase() {
    }
}
exports.default = TestController;
