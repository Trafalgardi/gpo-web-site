"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const ApplicationDataProvider_1 = __importDefault(require("./providers/ApplicationDataProvider"));
const express_1 = __importDefault(require("express"));
const AppRoutes_1 = __importDefault(require("./routes/AppRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class App {
    constructor(config) {
        this.config = config;
        this.expApp = express_1.default();
        App.mInstance = this;
    }
    static get Instance() {
        return App.mInstance;
    }
    get providers() {
        return this.dataProvireds;
    }
    run() {
        this.expApp.set('port', process.env.port || this.config.port);
        this.expApp.use(body_parser_1.default.json());
        this.expApp.use(body_parser_1.default.urlencoded({
            extended: true
        }));
        this.expApp.use(cookie_parser_1.default());
        this.dataProvireds = new ApplicationDataProvider_1.default();
        let appRouter = new AppRoutes_1.default();
        appRouter.mount(this.expApp);
        this.expApp.listen(this.config.port, (err) => {
            if (err !== undefined) {
                console.log(err);
            }
            else {
                console.log("Server run on port: " + this.config.port);
            }
        });
    }
}
exports.default = App;
