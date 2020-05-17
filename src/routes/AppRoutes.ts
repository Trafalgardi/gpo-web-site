import IPathRoute from "../configs/IPathRoute";
import UserRoute from "./UserRoute";
import RemoteClientRoute from "./RemoteClientRoute";
import { Express, Router } from 'express'

export default class AppRoutes {
    private routeList: IPathRoute[] = [
        { path: '/client', router: RemoteClientRoute },
        { path: '/user', router: UserRoute }
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