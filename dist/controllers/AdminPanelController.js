"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AdminPanelController {
    constructor(app) {
        this.app = app;
        this.AdminPanelDataProvider = this.app.providers.adminPanel;
    }
    getResults(req, res) {
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
            let testUsers = [];
            users.forEach((user) => __awaiter(this, void 0, void 0, function* () {
                let result = yield this.AdminPanelDataProvider.getTestResult(user);
                testUsers.push(result);
            }));
        });
    }
}
exports.default = AdminPanelController;
