import IPathRoute from "../configs/IPathRoute";
import UserRoute from "./UserRoute";
import ClientRoute from "./ClientRoute";
import {Express, Router} from 'express'

export default class AppRoutes{
      private routeList: IPathRoute[] = [
            {path: '/client', router: ClientRoute}
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