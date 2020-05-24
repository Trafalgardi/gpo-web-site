import IPathRoute from "../configs/IPathRoute";
import WebClientRoute from "./WebClientRoute";
import RemoteClientRoute from "./RemoteClientRoute";
import { Express, Router } from 'express'
import AdminPanelRoute from "./AdminPanelRoute";
import AuthRoute from "./AuthRoute";

export default class AppRoutes {
    private routeList: IPathRoute[] = [
        { path: '/', router: AuthRoute },
        { path: '/client', router: RemoteClientRoute },
        { path: '/adminPanel', router: AdminPanelRoute },
        { path: '/page', router: WebClientRoute },
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