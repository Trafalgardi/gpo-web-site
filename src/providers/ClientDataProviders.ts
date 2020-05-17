import DataProviderBase from "./DataProviderBase";
import { MysqlError, FieldInfo } from "mysql";
import util from 'util';

export default class ClientDataProviders extends DataProviderBase {

    async selectUser(login: string): Promise<{ rules: string, passwordHash: string }> | null  { // 
        const sql = "SELECT `rules`, `password` FROM `client_users` WHERE `login`='" + login + "' LIMIT 1";
        try {
            let rows = await this.query(sql);
            let data = rows[0];
            if (data == "") {
                return null;
            }
            return { rules: data.rules, passwordHash: data.password };

        }
        catch (e) {
            console.log(e);
            return null;
        }
    }

    async getUsers(): Promise<any[]> | null {
        let sql = "SELECT id, email, date, anketaData, anketaResult FROM users WHERE 1";
        try {
            let rows = await this.query(sql)
            if (rows == "") {
                return null;
            }
            let data: any[] = []

            for (let i = 0; i < rows.length; i++) {
                const element = rows[i];
                let item = {
                    id: element.id,
                    email: element.email,
                    date: element.date,
                    anketaData: element.anketaData,
                    anketaResult: element.anketaResult
                }
                data.push(item);
            }

            return data;
        }
        catch (e) {
            console.log(e)
            return null;
        }
    }

    getUserTests(userId: number): any {

        let data: {
            id: string,
            user_id: number,
            test_id: number,
            questions: [],
            answers: [],
            result: number,
            date: string
        }

        let sql = 'SELECT `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `user_tests`.`answers`, `user_tests`.`result`, `user_tests`.`date`' +
            'FROM `tests` JOIN `user_tests` ON `user_tests`.`test_id` = `tests`.`id` AND `user_tests`.`result` != -1 AND `user_tests`.`user_id` = ' + userId;
        //this.dbConnection.query(sql, function (error: MysqlError, results: any, fields: FieldInfo[]) {
        //    if (error) {
        //        console.log("check1")
        //        let json = {
        //            status: false,
        //            message: 'there are some error with query'
        //        }
        //        return res.render('error', { json });
        //    } else {
        //        response.success = true;
        //        response.data = results;
        //        for (let i = 0; i < response.data.length; i++) {
        //            response.data[i].question = "Тест №" + response.data[i].test_id;
        //        }
        //        //console.log(response)
        //        res.json(response);
        //    }
        //})
        return null;
    }
}