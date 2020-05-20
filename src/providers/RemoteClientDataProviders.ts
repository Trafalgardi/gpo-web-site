import DataProviderBase from "./DataProviderBase";

export default class RemoteClientDataProviders extends DataProviderBase {

    async selectUser(login: string): Promise<{ rules: string, passwordHash: string }> | null { // 
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
        const sql = "SELECT id, email, date, anketaData, anketaResult FROM users WHERE 1";
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

    async getUserTests(userId: number): Promise<any[]> | null {
        const sql = 'SELECT `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `user_tests`.`answers`, `user_tests`.`result`, `user_tests`.`date`' +
            'FROM `tests` JOIN `user_tests` ON `user_tests`.`test_id` = `tests`.`id` AND `user_tests`.`result` != -1 AND `user_tests`.`user_id` = ' + userId;
        try {
            let rows = await this.query(sql)
            if (rows == "") {
                return null;
            }

            return rows;
        }
        catch (e) {
            console.log(e)
            return null;
        }

    }
}