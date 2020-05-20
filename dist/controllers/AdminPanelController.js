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
const html_pdf_1 = __importDefault(require("html-pdf"));
const PdfTemplate_1 = __importDefault(require("../configs//PdfTemplate"));
class AdminPanelController {
    constructor(app) {
        this.app = app;
        this.AdminPanelDataProvider = this.app.providers.adminPanel;
    }
    getResultsPDF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emails = req.body.email_address.toString();
            let arr = emails.split(',');
            let email_list = [];
            arr.forEach(item => {
                if (item.length >= 5) {
                    email_list.push("'" + item.trim() + "'");
                }
            });
            let users = yield this.AdminPanelDataProvider.getUsers(email_list);
            if (users.length == 0) {
                res.redirect('./results');
                return;
            }
            function getTestUsers(provider) {
                return __awaiter(this, void 0, void 0, function* () {
                    let resultArr = [];
                    for (let i = 0; i < users.length; i++) {
                        const user = users[i];
                        let result = yield provider.getTestResult(user);
                        resultArr.push({ user: user, tests: result });
                    }
                    return resultArr;
                });
            }
            let testUsers = yield getTestUsers(this.AdminPanelDataProvider);
            let fileName = `${__dirname}/result.pdf`;
            let pdfHtml = html_pdf_1.default.create(PdfTemplate_1.default(testUsers));
            pdfHtml.toFile(fileName, (err, r) => {
                if (err) {
                    res.send(Promise.reject());
                }
                res.sendFile(`${__dirname}/result.pdf`);
            });
        });
    }
}
exports.default = AdminPanelController;
