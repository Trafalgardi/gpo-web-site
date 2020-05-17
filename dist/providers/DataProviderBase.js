"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
class DataProviderBase {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
        this.query = util_1.default.promisify(this.dbConnection.query).bind(this.dbConnection);
    }
}
exports.default = DataProviderBase;
