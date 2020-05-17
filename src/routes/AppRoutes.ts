import IPathRoute from "../configs/IPathRoute";
import WebClientRoute from "./WebClientRoute";
import RemoteClientRoute from "./RemoteClientRoute";
import { Express, Router } from 'express'

export default class AppRoutes {
    private routeList: IPathRoute[] = [
        { path: '/client', router: RemoteClientRoute },
        { path: '/', router: WebClientRoute }
    ];

    mount(expApp: Express): void {
        this.routeList.forEach((item) => {
            expApp.use(
                item.path,
                item.router.createRouter(Router)
            );
        });
    }
}