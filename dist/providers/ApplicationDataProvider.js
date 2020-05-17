"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDataProviders_1 = __importDefault(require("./UserDataProviders"));
const database_1 = __importDefault(require("../db/database"));
class ApplicationDataProvider {
    constructor() {
        let host;
        let database;
        let user;
        let password;
        let pool = new database_1.default(host, database, user, password).Pool;
        this.storage = this.getProviders()
            .map(provider => new provider(pool));
    }
    getInstanceProvider(type) {
        let items = this.storage.filter(provider => {
            if (provider instanceof type) {
                return provider;
            }
        });
        return items.length > 0 ? items[0] : null;
    }
    get user() {
        return this.getInstanceProvider(UserDataProviders_1.default);
    }
    getProviders() {
        return [
            UserDataProviders_1.default
        ];
    }
}
exports.default = ApplicationDataProvider;
