import DataProviderBase from "./DataProviderBase";
import dateTime from 'node-datetime';
import SecurityService from "../services/SecurityService";
/*
    Данный класс предназначен для пользователей сайта
*/
export default class WebClientDataProvider extends DataProviderBase {

    async selectUser(email: string) : Promise<{id: number, email: string, passwordHash: string}> | null {
        const sql = "SELECT `id`, `email`, `password` FROM users WHERE email = '" + email + "' LIMIT 1";
        try {
            let rows = await this.query(sql);
            if (rows == null || rows.length == 0){
                return null;
            }
            return rows[0];
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async signUp(email: string, password: string): Promise<string> | null {
        let dt = dateTime.create();
        let date = dt.format('d-m-Y H:M:S');
        let passwordHash = SecurityService.generatePasswordHash(password);
        let userData = {
            email: email,
            password: passwordHash,
            date: date,
            banTests: '{"ban":[]}', //Закрытые тесты TODO: Добавить удалённые тесты
            banCases: '{"ban": []}' //Закрытые кейсы
        };
        let user = await this.selectUser(email);
        if (user != null){
            //юзер существует
            return null;
        }
        const sql = this.dbController.format("INSERT INTO users SET ?", [userData]); 
        try {
            await this.query(sql);
            let user_id = (await this.selectUser(email)).id;
            let currentUser = {
                id: user_id,
                email: email
            }
            let token = SecurityService.generateToken(currentUser);
            return token;
        } catch (error) {
            console.log(error)
            return null;
        }
       
    }




}