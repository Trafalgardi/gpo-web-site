import DataProviderBase from "./DataProviderBase";
import UserDataProvider from "./UserDataProviders";
import DatabaseController from "../db/DatabaseController";
import ClientDataProviders from "./ClientDataProviders";

export default class ApplicationDataProvider{
    private storage: DataProviderBase[];
    constructor(){
        let host = 'localhost';
        let database = 'RecommendationSystem';
        let user = 'usrgpo';
        let password = 'PhyGyisHNs}{2DU'; //fkx8ZepaJEtS2xy //vMETuklX1HC4vX1g MySql auth  vMETuklX1HC4vX1g
        let pool = new DatabaseController(host, database, user, password).Pool;
        this.storage = this.getProviders()
            .map(provider => new provider(pool));
    }

    getInstanceProvider(type: any) : any | null{
        let items = this.storage.filter(provider => {
            if (provider instanceof type){
                return provider;
            }
        })

        return items.length > 0 ? items[0] : null;
    }

    get client(): ClientDataProviders{
        return this.getInstanceProvider(ClientDataProviders);
    }
    
    private getProviders(): any[]{
        return [
            ClientDataProviders
        ]
    }
}