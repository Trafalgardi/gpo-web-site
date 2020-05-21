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
const node_datetime_1 = __importDefault(require("node-datetime"));
class WebClientDataProvider extends DataProviderBase_1.default {
    setAnketa(anketa, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = this.dbController.format("UPDATE users SET anketaData=? WHERE id=?", [anketa, user_id]);
            try {
                const rows = yield this.query(sql);
                if (rows == null || rows.length == 0) {
                    return false;
                }
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    getAllTests() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT `id`, `name`, `questions`, `category_id` FROM `tests` WHERE 1";
            try {
                const rows = yield this.query(sql);
                if (rows == null || rows.length == 0) {
                    return null;
                }
                return rows;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getIdBanTests(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT `banTests` FROM `users` WHERE id = " + user_id;
            try {
                const rows = yield this.query(sql);
                if (rows == null || rows.length == 0) {
                    return null;
                }
                let banTests = JSON.parse(rows[0].banTests).ban;
                return banTests;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getTestCategorias() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM test_categories WHERE 1";
            try {
                const rows = yield this.query(sql);
                if (rows == null || rows.length == 0) {
                    return null;
                }
                return rows;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getTest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT `questions` as data FROM `tests` WHERE id=' + id;
            try {
                const rows = yield this.query(sql);
                if (rows == null || rows.length == 0) {
                    return null;
                }
                return rows;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    setDataTest() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    insertUserTest(user_id, test_id, answers, testResult) {
        return __awaiter(this, void 0, void 0, function* () {
            let dt = node_datetime_1.default.create();
            let formatted = dt.format('Y-m-d H:M:S');
            const sql = this.dbController.format("INSERT INTO user_tests VALUES (?,?,?,?,?,?);", [0, user_id, test_id, answers, testResult, formatted]);
            try {
                const rows = yield this.query(sql);
                if (rows == null || rows.length == 0) {
                    return null;
                }
                return rows;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updateBanUserTest(user_id, banTests) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "UPDATE `users` SET `banTests`= '" + banTests + "' WHERE `users`.`id` =" + user_id;
            try {
                const rows = yield this.query(sql);
                if (rows == null || rows.length == 0) {
                    return false;
                }
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.default = WebClientDataProvider;
