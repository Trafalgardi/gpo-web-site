import App from "../app";
import WebClientDataProvider from "../providers/WebClientDataProvider";
import { Request, Response, NextFunction } from 'express'
import SecurityService from "../services/SecurityService";
export default class AuthController {
    private readonly COOKIE_TOKEN: string;

    private webClientDataProvider: WebClientDataProvider;
    constructor(private app: App) {
        this.webClientDataProvider = this.app.providers.user;
        this.COOKIE_TOKEN = 'token';
    }

    async selectUser(req: Request, res: Response) {
        let email = req.body.email;
        let result = await this.webClientDataProvider.selectUser(email);
        
        res.json(result);
    }
    async signUp(req: Request, res: Response) {
        let email = req.body.email;
        let password = req.body.password;
        let token = await this.webClientDataProvider.signUp(email, password);
        res.cookie(this.COOKIE_TOKEN, token);
        //res.redirect('/homepage') 
        res.json(token);
    }

    async signIn(req: Request, res: Response){
        const login = req.body.email;
        const password = req.body.password;
        let errorMsg = {msg:"Не верный логин или пароль", error: 401};
        
        function throwError(){
            //res.json(errorMsg)
            res.redirect('/signin', 401)
        }
        if (login == null || login == undefined){
            throwError();
            return;
        }

        let user = await this.webClientDataProvider.selectUser(login);
        if (user == null){
            throwError();
            return;
        }
        
        let isValidPassword = SecurityService.validatePassword(password, user.passwordHash);
        if (isValidPassword == false){
            throwError();
            return;
        }

        let payload = {
            id: user.id,
            email: user.email
        }
        let token = SecurityService.generateToken(payload);
        res.cookie(this.COOKIE_TOKEN, token);
        res.redirect('/homepage'); //TODO: homepage
    }

    verification(req: Request, res: Response, next: NextFunction){
        let cookies = req.cookies;
        if (cookies == undefined){
            res.redirect('/signin');
            return;
        }
        //console.log(this.COOKIE_TOKEN) //TODO: COOKIE_TOKEN
        let token = cookies['token'];
        let isTokenValid = SecurityService.verifyToken(token) != null;
        
        if (isTokenValid){
            next();
        }
        else{
            res.redirect('/signin');
        }

    }
    


}