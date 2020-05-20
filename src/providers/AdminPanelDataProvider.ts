import DataProviderBase from "./DataProviderBase";
export default class AdminPanelDataProvider extends DataProviderBase {

    async getUsers(emailList: string[]): null | Promise<[{ id: number, email: string }]> {
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

        return rows;
    }

    async getTestResult(user: { id: number, email: string }): null | Promise<any> {
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
            users_tests.push({ user: user, test: item });
        });

        return users_tests;
    }
}
