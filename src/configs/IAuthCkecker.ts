import { Request, Response, NextFunction } from 'express'
export default abstract class IAuthChecker{
    abstract authCheck(req: Request, res: Response): {id: number, email: string} | null;

    abstract auth(req: Request, res: Response, data: any): void;

    abstract logout(req: Request, res: Response, data: any): void;
}