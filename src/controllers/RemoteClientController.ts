import App from "../app";
import RemoteClientDataProviders from "../providers/RemoteClientDataProviders";
import { Request, Response, NextFunction } from 'express'
import SecurityService from "../services/SecurityService";
import { ClientRules } from "../Enums/ClientRules";

export default class RemoteClientController {
    private clientDataProvider: RemoteClientDataProviders;
    constructor(private app: App) {
        this.clientDataProvider = this.app.providers.remoteClient;
    }

    checkToken(req: Request, res: Response, next: NextFunction, targetRules: ClientRules) {
        let token: any = req.headers['access_token'];
        let payload = SecurityService.verifyToken(token);
        let isValid = false;
        if (payload != null) {
            let rulesString: string = payload['rules'];
            let currentRules: ClientRules = ClientRules[rulesString];
            isValid = currentRules >= targetRules;
        }

        if (isValid) {
            next();
        }
        else {
            res.json({ msg: "Ошибка авторизации", error: 401 })
        }
        console.log("isValidUser: " + isValid)
    }

    async authorization(req: Request, res: Response) {
        let login = req.body.login;
        let password = req.body.password;

        if (login === undefined || password === undefined) {
            res.json({ msg: "Не верный логин", error: 400 })
            return;
        }

        let user = await this.clientDataProvider.selectUser(login);

        if (user == null) {
            res.json({ msg: "Не верный логин", error: 400 })
            return;
        }

        let isValidPass = SecurityService.validatePassword(password, user.passwordHash);

        if (isValidPass == false) {
            res.json({ msg: "Не верный пароль", error: 400 })
            return;
        }

        let payload = {
            login: login,
            rules: user.rules
        }

        let token = SecurityService.generateToken(payload);

        res.json({token: token, rules: user.rules});
    }

    async getUsers(req: Request, res: Response) {
        let users = await this.clientDataProvider.getUsers();
        res.json(users)
    }

    async getUserTests(req: Request, res: Response) {
        let userId = req.body.user_id;
        let users = await this.clientDataProvider.getUserTests(userId);
        res.json(users)
    }
    
}