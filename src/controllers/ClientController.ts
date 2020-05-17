import App from "../app";
import ClientDataProviders from "../providers/ClientDataProviders";
import { Request, Response, NextFunction } from 'express'
import SecurityService from "../services/SecurityService";

export default class ClientController {
    private clientDataProvider: ClientDataProviders;
    constructor(private app: App) {
        this.clientDataProvider = this.app.providers.client;
    }


    async authorization(req: Request, res: Response){
        let login = req.body.login;
        let password = req.body.password;

        if (login === undefined || password === undefined) {
            res.json({msg: "Не верный логин", error: 400})
            return;
        }

        let user = await this.clientDataProvider.selectUser(login);
        
        if (user == null) {
            res.json({msg: "Не верный логин", error: 400})
            return;
        }

        let isValidPass = SecurityService.validatePassword(password, user.passwordHash);

        if (isValidPass == false) {
            res.json({msg: "Не верный пароль", error: 400})
            return;
        }

        let payload = {
            login: login,
            rules: user.rules
        }

        let token = SecurityService.generateToken(payload);

        res.json(token);
    }

    checkToken(req: Request, res: Response, next: NextFunction){
        let isValid = true;
        if (isValid){
            next();
        }
        else{
            res.sendStatus(406);
        }
    }
    
}