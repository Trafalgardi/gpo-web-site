import DataProviderBase from "./DataProviderBase";
import dateTime from 'node-datetime';
import SecurityService from "../services/SecurityService";
/*
    Данный класс предназначен для пользователей сайта
*/
export default class WebClientDataProvider extends DataProviderBase {

   
    async setAnketa(anketa: string, user_id: number): Promise<boolean>{
        const sql = this.dbController.format("UPDATE users SET anketaData=? WHERE id=?", [anketa, user_id]);
        try {
            const rows = await this.query(sql);
            if (rows == null || rows.length == 0){
                return false;
            }
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }

    }

    async getAllTests(): Promise<[{id: number, name: string, questions: any[], category_id: number}]> | null{
        const sql = "SELECT `id`, `name`, `questions`, `category_id` FROM `tests` WHERE 1";
        try {
            const rows = await this.query(sql);
            if (rows == null || rows.length == 0){
                return null;
            }
            return rows;
        } catch (error) {
            console.log(error)
            return null;
        }   
    }
    async getIdBanTests(user_id: number): Promise<number[]> | null{
        const sql = "SELECT `banTests` FROM `users` WHERE id = " + user_id;
        try {
            const rows = await this.query(sql);
            if (rows == null || rows.length == 0){
                return null;
            }
            let banTests = JSON.parse(rows[0].banTests).ban;
            return banTests;
        } catch (error) {
            console.log(error)
            return null;
        }   
    }
    async getTestCategorias(): Promise<[{id: number, parent_id: number}]> | null{
        const sql = "SELECT * FROM test_categories WHERE 1"
        try {
            const rows = await this.query(sql);
            if (rows == null || rows.length == 0){
                return null;
            }
            return rows;
        } catch (error) {
            console.log(error)
            return null;
        }   
    }
    async getTestData(id:number): Promise<{}> | null{
        const sql = 'SELECT `questions` as data FROM `tests` WHERE id=' + id;
        try {
            const rows = await this.query(sql);
            if (rows == null || rows.length == 0){
                return null;
            }
            return rows[0].data;
        } catch (error) {
            console.log(error)
            return null;
        }   
    }
    async setDataTest():Promise<any> | null{
         
    }
    async insertUserTest(user_id: number, test_id: number, answers: string, testResult: number):Promise<any> | null{
        let dt = dateTime.create();
        let formatted = dt.format('Y-m-d H:M:S');
        const sql = this.dbController.format("INSERT INTO user_tests VALUES (?,?,?,?,?,?);", [0, user_id, test_id, answers, testResult, formatted])
        try {
            const rows = await this.query(sql);
            if (rows == null || rows.length == 0){
                return null;
            }
            return rows;
        } catch (error) {
            console.log(error)
            return null;
        } 
    }
    async updateBanUserTest(user_id: number, banTests: string):Promise<boolean>{
        const sql = "UPDATE `users` SET `banTests`= '" + banTests + "' WHERE `users`.`id` =" + user_id;
        try {
            const rows = await this.query(sql);
            if (rows == null || rows.length == 0){
                return false;
            }
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }  
    }

}