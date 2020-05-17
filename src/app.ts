import bodyParser from 'body-parser';
import ApplicationDataProvider from "./providers/ApplicationDataProvider";
import IAppConfig from "./configs/IAppConfig";
import express from 'express'
import AppRoutes from "./routes/AppRoutes";
import cookieParser from 'cookie-parser';

export default class App {
  private static mInstance: App;
  public static get Instance(): App {
    return App.mInstance;
  }

  private dataProvireds: ApplicationDataProvider;
  get providers(): ApplicationDataProvider {
    return this.dataProvireds;
  }

  private expApp: express.Express;

  constructor(private config: IAppConfig) {
    this.expApp = express();
    App.mInstance = this;
  }

  run(): void {
  
    this.expApp.set('port', process.env.port || this.config.port); // set express to use this port
    this.expApp.use(bodyParser.json()); // parse form data client
    this.expApp.use(bodyParser.urlencoded({
        extended: true
    }));
    this.expApp.use(cookieParser())

    this.dataProvireds = new ApplicationDataProvider();

    let appRouter = new AppRoutes();
    appRouter.mount(this.expApp)

    this.expApp.listen(this.config.port, (err: any) => {
      if (err !== undefined) {
        console.log(err);
      } else {
        console.log("Server run on port: " + this.config.port);
      }
    });
  }
} 