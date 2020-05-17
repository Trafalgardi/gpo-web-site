import App from "../app";
import UserDataProvider from "../providers/UserDataProviders";
import { Request, Response } from 'express'
export default class AuthController {
    private userDataProvider: UserDataProvider;
    constructor(private app: App) {
        this.userDataProvider = this.app.providers.user;
    }

    async selectUser(req: Request, res: Response) {
        let email = req.body.email;
        let result = await this.userDataProvider.selectUser(email);
        
        res.json(result);
    }
    async regUser(req: Request, res: Response) {
        let email = req.body.email;
        let password = req.body.password;
        let token = await this.userDataProvider.regUser(email, password);
        res.cookie('token', token);
        //res.redirect('/homepage') 
        res.json(token);
    }
}