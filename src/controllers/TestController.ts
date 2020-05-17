import App from "../app";
import WebClientDataProvider from "../providers/WebClientDataProvider";

export default class TestController{
    private userDataProvider: WebClientDataProvider;
    constructor(private app: App){
        this.userDataProvider = this.app.providers.user;
    }

    getTest(){// конкретный тест

    }
    
    getOpenTests(){ // доступные тесты

    }

    setDataTest(){ //Записать результаты теста

    }

    //Перенести в отдельный файл
    getCase(){

    }
    
    getOpenCases(){

    }

    setCase(){

    }
}