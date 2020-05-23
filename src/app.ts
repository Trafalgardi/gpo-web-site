import bodyParser from 'body-parser';
import ApplicationDataProvider from "./providers/ApplicationDataProvider";
import IAppConfig from "./configs/IAppConfig";
import express from 'express'
import AppRoutes from "./routes/AppRoutes";
import cookieParser from 'cookie-parser';
import path from 'path';

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
    this.expApp.set('views', path.join(__dirname, '../views'));
    this.expApp.set('view engine', 'pug');

    this.expApp.use(bodyParser.json()); // parse form data client
    this.expApp.use(bodyParser.urlencoded({
        extended: true
    }));
    this.expApp.use(cookieParser())


    this.expApp.use(express.static(path.join(__dirname, '../public'))); // configure express to use public folder
    this.expApp.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist'))); // redirect JS jQuery
    this.expApp.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js'))); // redirect bootstrap JS
    this.expApp.use('/js', express.static(path.join(__dirname, '../node_modules/popper.js/dist/umd'))); // redirect popper js 
    this.expApp.use('/js', express.static(path.join(__dirname, '../node_modules/holderjs'))); // redirect Holder js
    this.expApp.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css'))); // redirect CSS bootstrap

    

    this.dataProvireds = new ApplicationDataProvider(this.config.host, this.config.database, this.config.user, this.config.password);

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