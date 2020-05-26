import App from "../app";
import AdminPanelDataProvider from "../providers/AdminPanelDataProvider";
import { Request, Response, NextFunction } from 'express'
import pdf from 'html-pdf'
import { TestExecution } from "../../TestProcessing/TestProcessing.js"
import pdfTemplate from '../configs//PdfTemplate';

export default class AdminPanelController {
    private adminPanelDataProvider: AdminPanelDataProvider;
    constructor(private app: App) {
        this.adminPanelDataProvider = this.app.providers.adminPanel;
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
        let users = await this.adminPanelDataProvider.getUsers(email_list);

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

        let testUsers: any[] = await getTestUsers(this.adminPanelDataProvider);


        let fileName = `${__dirname}/result.pdf`;
        let pdfHtml = pdf.create(pdfTemplate(testUsers));

        pdfHtml.toFile(fileName, (err, r) => {
            if (err) {
                res.send(Promise.reject());
            }

            res.sendFile(`${__dirname}/result.pdf`);

        })
    }

    async calculateAllTests(req: Request, res: Response) {
        let all_tests = await this.adminPanelDataProvider.getAllUserTests();
        let update_data: { id: number, result: number }[] = [];
        all_tests.forEach(element => {

            let newResult = TestExecution(element.test_id, JSON.parse(element.answers).data);

            if (newResult < 0 || newResult > 1 || isNaN(newResult)) {
                newResult = -2;
                console.log(`Ошибка в обработке теста ${element.test_id!} [${element.id}]`)
            }
            update_data.push({ id: element.id, result: newResult });

        });
        let update_result = await this.adminPanelDataProvider.updateUserTests(update_data);
        res.json(update_result);
    }
}