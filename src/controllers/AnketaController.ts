import App from "../app";
import WebClientDataProvider from "../providers/WebClientDataProvider";

export default class AnketaController{
    private userDataProvider: WebClientDataProvider;
    constructor(private app: App){
        this.userDataProvider = this.app.providers.webClient;
    }

    getAnketaData(){ //Получить заполненную анкету

    }

    setAnketaData(){ //Записать данные в анкету

    }
}