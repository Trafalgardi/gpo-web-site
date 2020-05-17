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
class ClientDataProviders extends DataProviderBase_1.default {
    selectUser(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT `rules`, `password` FROM `client_users` WHERE `login`='" + login + "' LIMIT 1";
            try {
                let rows = yield this.query(sql);
                let data = rows[0];
                if (data == "") {
                    return null;
                }
                return { rules: data.rules, passwordHash: data.password };
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    getUsers() {
        let sql = "SELECT id, email, date, anketaData, anketaResult FROM users WHERE 1";
        this.dbConnection.query(sql, function (error, results, fields) {
            if (error || results == "") {
                return null;
            }
            let data = [results[0].length];
            for (let i = 0; i < results[0].length; i++) {
                const element = results[0][i];
                let item = {
                    id: element.id,
                    email: element.email,
                    date: element.date,
                    anketaData: element.anketaData,
                    anketaResult: element.anketaResult
                };
                data.push(item);
            }
            return data;
        });
        return null;
    }
    getUserTests(userId) {
        let data;
        let sql = 'SELECT `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `user_tests`.`answers`, `user_tests`.`result`, `user_tests`.`date`' +
            'FROM `tests` JOIN `user_tests` ON `user_tests`.`test_id` = `tests`.`id` AND `user_tests`.`result` != -1 AND `user_tests`.`user_id` = ' + userId;
        return null;
    }
}
exports.default = ClientDataProviders;
