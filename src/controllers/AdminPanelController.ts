import App from "../app";
import AdminPanelDataProvider from "../providers/AdminPanelDataProvider";
import { Request, Response, NextFunction } from 'express'
export default class AdminPanelController {
    private AdminPanelDataProvider: AdminPanelDataProvider;
    constructor(private app: App) {
        this.AdminPanelDataProvider = this.app.providers.adminPanel;
    }

    async getResults(req: Request, res: Response) {
        let emails: string = req.body.email_address.toString();
        let arr = emails.split(',');
        let email_list: string[] = [];
        arr.forEach(item => {
            if (item.length >= 5) {
                email_list.push("'" + item.trim() + "'");
            }
        });
        let users = await this.AdminPanelDataProvider.getUsers(email_list);
        let testUsers: any[] = [];
        users.forEach(async (user) => {
            let result = await this.AdminPanelDataProvider.getTestResult(user);
            testUsers.push(result);
        });

        //pdf.create(pdfTemplate({ users_tests }), {}).toFile(`${__dirname}/result.pdf`, (err) => {
        //    if (err) {
        //        res.send(Promise.reject());
        //    }
//
        //    res.sendFile(`${__dirname}/result.pdf`);
        //}
        //
        //return res.redirect('/results');


    }
}