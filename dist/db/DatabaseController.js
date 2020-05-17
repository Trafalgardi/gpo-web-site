"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class DatabaseController {
    get Pool() {
        return this.pool;
    }
    constructor(host, db, user, password) {
        this.pool = mysql_1.default.createPool({
            connectionLimit: 10,
            host: host,
            user: user,
            password: password,
            database: db
        });
        this.conn();
    }
    conn() {
        this.pool.getConnection((err, connection) => {
            console.log("Database connected!");
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection)
                connection.release();
        });
    }
}
exports.default = DatabaseController;
