import App from "../app";
import WebClientDataProvider from "../providers/WebClientDataProvider";
import { Request, Response, NextFunction } from 'express'
import SecurityService from "../services/SecurityService";

const COOKIE_TOKEN: string = 'token';
export default class AuthController {

    private webClientDataProvider: WebClientDataProvider;
    constructor(private app: App) {
        this.webClientDataProvider = this.app.providers.webClient;
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
        res.cookie(COOKIE_TOKEN, token);
        res.redirect('/page/homepage') 
       
    }

    async signIn(req: Request, res: Response){
        const login = req.body.email;
        const password = req.body.password;
        
        function throwError(){
            res.redirect('/signin')
        }
        if (login == null || login == undefined){
            throwError();
            return;
        }

        let user = await this.webClientDataProvider.selectUser(login);
       
        if (user == null || user.password == ''){
            throwError();
            return;
        }
        
        let isValidPassword = SecurityService.validatePassword(password, user.password);
        if (isValidPassword == false){
            throwError();
            return;
        }

        let payload = {
            id: user.id,
            email: user.email
        }
        let token = SecurityService.generateToken(payload);
        res.cookie(COOKIE_TOKEN, token);
        res.redirect('/page/homepage'); //TODO: homepage
    }

    signOut(req: Request, res: Response){
        res.clearCookie("token");
        res.redirect('signin');
    }
    async verification(req: Request, res: Response, next: NextFunction){
        let cookies = req.cookies;
        if (cookies == null || cookies == undefined){
            res.redirect('/signin');
            return;
        }

        let token = cookies[COOKIE_TOKEN];
        let isTokenValid = SecurityService.verifyToken(token) != null;
        
        if (isTokenValid){
            next();
        }
        else{
            res.redirect('/signin');
        }

    }
    
}