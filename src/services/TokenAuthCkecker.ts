import { Request, Response, NextFunction } from 'express'
import IAuthCkecker from '../configs/IAuthCkecker'
import SecurityService from './SecurityService';

const COOKIE_TOKEN: string = 'token';

export default class TokenAuthChecker extends IAuthCkecker{
    

    
    authCheck(req: Request, res: Response):  {id: number, email: string} | null {
        let cookies = req.cookies;

        if (cookies == null || cookies == undefined){
            return null;
        }

        let token = cookies[COOKIE_TOKEN];
        let payload = SecurityService.verifyToken(token);
        if (payload == null)
        {
            return null;
        }
        if (payload.id == undefined || payload.id == null){
            return null;
        }
        return {id: payload.id, email: payload.email}
        
    }

    auth(req: Request, res: Response, data: {key: string, value: string}){
        res.cookie(data.key, data.value);
    }

    logout(req: Request, res: Response, data: string): void {
        res.clearCookie(data);
    }
}