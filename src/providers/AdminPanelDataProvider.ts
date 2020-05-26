import DataProviderBase from "./DataProviderBase";
export default class AdminPanelDataProvider extends DataProviderBase {

    async getUsers(emailList: string[]): null | Promise<{ id: number, email: string }[]> {
        let emailListString = emailList.toString().split(',');

        const sql = "SELECT `id`, `email` FROM users WHERE email IN (" + emailListString + ")";

        let rows: any = null;
        try {
            rows = await this.query(sql);
        } catch (error) {
            console.log(error);
        }

        if (rows == null)
            return null;



        let users = [];

        rows.forEach(item => {
            let user =
            {
                id: item.id,
                email: item.email
            };
            users.push(user)
        });
        return users;
    }

    async getTestResult(user): null | Promise<any[]> {
        const sql = "SELECT tests.id, tests.name, user_tests.result FROM user_tests JOIN tests ON user_tests.test_id=tests.id WHERE user_id='" + user.id + "'"

        let rows: any = null;
        try {
            rows = await this.query(sql);
        } catch (error) {
            console.log(error);
        }

        if (rows == null)
            return null;

        let users_tests = [];

        rows.forEach((item: any) => {
            let element = {
                id: item.id,
                name: item.name,
                result: item.result
            }
            users_tests.push(element);
        });

        return users_tests;
    }

    async getAllUserTests(): null | Promise<{ id: number, test_id: number, answers: string, result: number }[]> {
        const sql = "SELECT `id`, `test_id`, `answers`, `result` FROM `user_tests` WHERE 1"
        
        let rows = await this.safeQuery<{ id: number, test_id: number, answers: string, result: number }[]>(sql);
        
        return rows;
    }

    async updateUserTests(results: {id: number, result: number}[]): null | Promise<any>{
        const sql_template = "UPDATE `user_tests` SET `result`=? WHERE `id`=?;";
  
        results.forEach(async element => {
            //console.log([element.id, element.result])
            //sql += this.dbController.format(sql_template, [element.id, element.result]);
            const sql = " UPDATE `user_tests` SET `result`=" + element.result + " WHERE `id`=" + element.id;
            await this.safeQuery(sql);
            
        })

        return true;
    }
}
