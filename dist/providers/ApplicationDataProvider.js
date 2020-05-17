"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseController_1 = __importDefault(require("../db/DatabaseController"));
const ClientDataProviders_1 = __importDefault(require("./ClientDataProviders"));
class ApplicationDataProvider {
    constructor() {
        let host = 'localhost';
        let database = 'RecommendationSystem';
        let user = 'usrgpo';
        let password = 'PhyGyisHNs}{2DU';
        let pool = new DatabaseController_1.default(host, database, user, password).Pool;
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
    get client() {
        return this.getInstanceProvider(ClientDataProviders_1.default);
    }
    getProviders() {
        return [
            ClientDataProviders_1.default
        ];
    }
}
exports.default = ApplicationDataProvider;
