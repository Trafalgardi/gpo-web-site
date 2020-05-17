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
const SecurityService_1 = __importDefault(require("../services/SecurityService"));
class WebClientDataProvider extends DataProviderBase_1.default {
    selectUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT `id`, `email`, `password` FROM users WHERE email = '" + email + "' LIMIT 1";
            try {
                let rows = yield this.query(sql);
                if (rows == null || rows.length == 0) {
                    return null;
                }
                return rows[0];
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    signUp(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let dt = node_datetime_1.default.create();
            let date = dt.format('d-m-Y H:M:S');
            let passwordHash = SecurityService_1.default.generatePasswordHash(password);
            let userData = {
                email: email,
                password: passwordHash,
                date: date,
                banTests: '{"ban":[]}',
                banCases: '{"ban": []}'
            };
            let user = yield this.selectUser(email);
            if (user != null) {
                return null;
            }
            const sql = this.dbController.format("INSERT INTO users SET ?", [userData]);
            try {
                yield this.query(sql);
                let user_id = (yield this.selectUser(email)).id;
                let currentUser = {
                    id: user_id,
                    email: email
                };
                let token = SecurityService_1.default.generateToken(currentUser);
                return token;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
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
    getIdBanTests(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT `banTests` FROM `users` WHERE id = " + id;
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
}
exports.default = WebClientDataProvider;
