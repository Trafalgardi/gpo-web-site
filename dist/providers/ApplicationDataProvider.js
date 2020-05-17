"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDataProviders_1 = __importDefault(require("./UserDataProviders"));
const DatabaseController_1 = __importDefault(require("../db/DatabaseController"));
const RemoteClientDataProviders_1 = __importDefault(require("./RemoteClientDataProviders"));
class ApplicationDataProvider {
    constructor() {
        let host = 'localhost';
        let database = 'RecommendationSystem';
        let user = 'usrgpo';
        let password = 'PhyGyisHNs}{2DU';
        let dbController = new DatabaseController_1.default(host, database, user, password);
        this.storage = this.getProviders()
            .map(provider => new provider(dbController));
    }
    getInstanceProvider(type) {
        let items = this.storage.filter(provider => {
            if (provider instanceof type) {
                return provider;
            }
        });
        return items.length > 0 ? items[0] : null;
    }
    get remoteClient() {
        return this.getInstanceProvider(RemoteClientDataProviders_1.default);
    }
    get user() {
        return this.getInstanceProvider(UserDataProviders_1.default);
    }
    getProviders() {
        return [
            RemoteClientDataProviders_1.default,
            UserDataProviders_1.default
        ];
    }
}
exports.default = ApplicationDataProvider;
