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
const DataProviderBase_1 = __importDefault(require("./DataProviderBase"));
class AdminPanelDataProvider extends DataProviderBase_1.default {
    getUsers(emailList) {
        return __awaiter(this, void 0, void 0, function* () {
            let emailListString = emailList.toString().split(',');
            const sql = "SELECT `id`, `email` FROM users WHERE email IN (" + emailListString + ")";
            let rows = null;
            try {
                rows = yield this.query(sql);
            }
            catch (error) {
                console.log(error);
            }
            if (rows == null)
                return null;
            let users = [];
            rows.forEach(item => {
                let user = {
                    id: item.id,
                    email: item.email
                };
                users.push(user);
            });
            return users;
        });
    }
    getTestResult(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT tests.id, tests.name, user_tests.result FROM user_tests JOIN tests ON user_tests.test_id=tests.id WHERE user_id='" + user.id + "'";
            let rows = null;
            try {
                rows = yield this.query(sql);
            }
            catch (error) {
                console.log(error);
            }
            if (rows == null)
                return null;
            let users_tests = [];
            rows.forEach((item) => {
                let element = {
                    id: item.id,
                    name: item.name,
                    result: item.result
                };
                users_tests.push(element);
            });
            return users_tests;
        });
    }
}
exports.default = AdminPanelDataProvider;
