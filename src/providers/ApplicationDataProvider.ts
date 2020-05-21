import DataProviderBase from "./DataProviderBase";
import WebClientDataProvider from "./WebClientDataProvider";
import DatabaseController from "../db/DatabaseController";
import RemoteClientDataProviders from "./RemoteClientDataProviders";
import AdminPanelDataProvider from "./AdminPanelDataProvider";
import AuthDataProvider from "./AuthDataProvider";

export default class ApplicationDataProvider{
    private storage: DataProviderBase[];
    constructor(){
        let host = 'localhost';
        let database = 'RecommendationSystem';
        let user = 'usrgpo';
        let password = 'PhyGyisHNs}{2DU'; //fkx8ZepaJEtS2xy //vMETuklX1HC4vX1g MySql auth  vMETuklX1HC4vX1g
        let dbController = new DatabaseController(host, database, user, password);
        this.storage = this.getProviders()
            .map(provider => new provider(dbController));
    }

    getInstanceProvider(type: any) : any | null{
        let items = this.storage.filter(provider => {
            if (provider instanceof type){
                return provider;
            }
        })

        return items.length > 0 ? items[0] : null;
    }

    get remoteClient(): RemoteClientDataProviders{
        return this.getInstanceProvider(RemoteClientDataProviders);
    }

    get webClient(): WebClientDataProvider{
        return this.getInstanceProvider(WebClientDataProvider);
    }
    
    get adminPanel(): AdminPanelDataProvider{
        return this.getInstanceProvider(AdminPanelDataProvider);
    }

    get auth(): AuthDataProvider{
        return this.getInstanceProvider(AuthDataProvider);
    }
    private getProviders(): any[]{
        return [
            RemoteClientDataProviders,
            WebClientDataProvider,
            AdminPanelDataProvider,
            AuthDataProvider
        ]
    }
}