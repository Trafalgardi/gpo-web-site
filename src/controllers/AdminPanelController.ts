import App from "../app";
import AdminPanelDataProvider from "../providers/AdminPanelDataProvider";
import { Request, Response, NextFunction } from 'express'
import pdf from 'html-pdf'

import pdfTemplate from '../configs//PdfTemplate';

export default class AdminPanelController {
    private AdminPanelDataProvider: AdminPanelDataProvider;
    constructor(private app: App) {
        this.AdminPanelDataProvider = this.app.providers.adminPanel;
    }

    async getResultsPDF(req: Request, res: Response) {
        let emails: string = req.body.email_address.toString();
        let arr = emails.split(',');
        let email_list: string[] = [];
        arr.forEach(item => {
            if (item.length >= 5) {
                email_list.push("'" + item.trim() + "'");
            }
        });
        let users = await this.AdminPanelDataProvider.getUsers(email_list);

        if (users.length == 0) {
            res.redirect('./results');
            return;
        }


        async function getTestUsers(provider): Promise<any[]> {
            let resultArr = [];
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                let result = await provider.getTestResult(user);
                resultArr.push({ user: user, tests: result });
            }
            return resultArr;
        }

        let testUsers: any[] = await getTestUsers(this.AdminPanelDataProvider);


        let fileName = `${__dirname}/result.pdf`;
        let pdfHtml = pdf.create(pdfTemplate(testUsers));

        pdfHtml.toFile(fileName, (err, r) => {
            if (err) {
                res.send(Promise.reject());
            }

            res.sendFile(`${__dirname}/result.pdf`);

        })
    }
}