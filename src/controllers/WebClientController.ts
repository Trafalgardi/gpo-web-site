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

        var rows = await this.userDataProvider.showTeasts(current_user.id);
        var t = rows === 0 ? false : true

        var showTeasts = t ? "" : "none"
        var showAnketa = t ? "none" : ""
        
        res.render('homepage', { email: current_user.email, showTeasts: showTeasts, showAnketa: showAnketa });
   }
}