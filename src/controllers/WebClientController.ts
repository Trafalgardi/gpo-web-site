import App from "../app";
import WebClientDataProvider from "../providers/WebClientDataProvider";
import AuthController from "../controllers/AuthController";
import { Request, Response, NextFunction } from 'express'
export default class WebClientController{
    private userDataProvider: WebClientDataProvider;
    constructor(private app: App){
        this.userDataProvider = this.app.providers.webClient;
    }

   login(){

   }
   logout(){
       
   }
    async showTeasts(req: Request, res: Response){
        let current_user = AuthController.authCheck(req, res);

        var getShowTeasts = await this.userDataProvider.showTeasts(current_user.id);
        var showTeasts = ""
        var showAnketa = ""
        if(getShowTeasts === 0){
            showTeasts = "none"
            showAnketa = ""
        }else if(getShowTeasts === 1){
            showTeasts = ""
            showAnketa = "none"
        }

        res.render('homepage', { email: current_user.email, showTeasts, showAnketa });
   }
}