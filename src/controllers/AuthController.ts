import App from "../app";
import UserDataProvider from "../providers/UserDataProviders";

export default class AuthController{
    private userDataProvider: UserDataProvider;
    constructor(private app: App){
        this.userDataProvider = this.app.providers.user;
    }

   login(){

   }
   logout(){
       
   }
}