import App from "../app";
import WebClientDataProvider from "../providers/WebClientDataProvider";
import { Request, Response, NextFunction } from 'express'
import SecurityService from "../services/SecurityService";
import TokenAuthChecker from "../services/TokenAuthCkecker";
import AuthDataProvider from "../providers/AuthDataProvider";

const COOKIE_TOKEN: string = 'token';
export default class AuthController {

    private static authCkecker = new TokenAuthChecker();
    public static authCheck = AuthController.authCkecker.authCheck;
    private static auth =  AuthController.authCkecker.auth;
    private static logout = AuthController.authCkecker.logout;
    public static async verification(req: Request, res: Response, next: NextFunction){
        let user_id = AuthController.authCheck(req, res);
        
        if (user_id != null){
            next();
        }
        else{
            res.redirect('/signin');
        }

    }

    private authDataProvider: AuthDataProvider;
    constructor(private app: App) {
        this.authDataProvider = this.app.providers.auth;
    }

    public async signUp(req: Request, res: Response) {
        function throwError(msg){
            res.render('signup', {msg: msg})
        }

        if (AuthController.authCheck(req, res) != null ){
            res.redirect('/page/homepage')
            return;
        }
        let email = req.body.email;
        let password = req.body.password;
        if (email == undefined || password == undefined){
            throwError("Не введен логин или пароль");
            return;
        }
        let token = await this.authDataProvider.signUp(email, password);
        if (token == null){
            throwError("Логин занят");
            return;
        }
        AuthController.auth(req, res, {key: COOKIE_TOKEN, value: token})
        res.redirect('/page/homepage') 
    }

    public async signIn(req: Request, res: Response){
        function throwError(){
            res.render('signin', {msg: "Не верный логин или пароль"})
        }

        if (AuthController.authCheck(req, res) != null ){
            res.redirect('/page/homepage')
            return;
        }

        const login = req.body.email;
        const password = req.body.password;
        
        if (login == null || login == undefined || password == null || password == undefined){
            throwError();
            return;
        }

        let user = await this.authDataProvider.selectUser(login);
       
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
        AuthController.auth(req, res, {key: COOKIE_TOKEN, value: token})
        res.redirect('/page/homepage'); //TODO: homepage
    }

    public signOut(req: Request, res: Response){
        AuthController.logout(req, res, COOKIE_TOKEN);
        res.redirect('/signin');
    }
   
    
}