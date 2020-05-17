import App from "../app";
import WebClientDataProvider from "../providers/WebClientDataProvider";

export default class WebClientController{
    private userDataProvider: WebClientDataProvider;
    constructor(private app: App){
        this.userDataProvider = this.app.providers.user;
    }

   login(){

   }
   logout(){
       
   }
}