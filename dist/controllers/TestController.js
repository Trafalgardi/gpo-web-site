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
class TestController {
    constructor(app) {
        this.app = app;
        this.userDataProvider = this.app.providers.webClient;
    }
    getTest() {
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
    setDataTest() {
    }
    getCase() {
    }
    getOpenCases() {
    }
    setCase() {
    }
}
exports.default = TestController;
