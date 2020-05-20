import IPathRoute from "../configs/IPathRoute";
import WebClientRoute from "./WebClientRoute";
import RemoteClientRoute from "./RemoteClientRoute";
import { Express, Router } from 'express'
import AdminPanelRoute from "./AdminPanelRoute";

export default class AppRoutes {
    private routeList: IPathRoute[] = [
        { path: '/client', router: RemoteClientRoute },
        { path: '/', router: WebClientRoute },
        { path: '/adminPanel', router: AdminPanelRoute }
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