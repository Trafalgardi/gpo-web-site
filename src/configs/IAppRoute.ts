import { Router } from "express";

export default interface IAppRoute{
    createRouter(router: any): Router;
}