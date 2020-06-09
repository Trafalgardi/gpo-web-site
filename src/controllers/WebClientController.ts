import App from "../app";
import WebClientDataProvider from "../providers/WebClientDataProvider";

export default class WebClientController{
    private userDataProvider: WebClientDataProvider;
    constructor(private app: App){
        this.userDataProvider = this.app.providers.webClient;
    }

   login(){

   }
   logout(){
       
   }
   public async showTeasts(user_id){
        var rows = await this.userDataProvider.showTeasts(user_id);
        var t = rows === 0 ? false : true
        return t 
   }
}