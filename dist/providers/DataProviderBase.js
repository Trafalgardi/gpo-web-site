"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataProviderBase {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
        console.log(dbConnection);
    }
}
exports.default = DataProviderBase;
