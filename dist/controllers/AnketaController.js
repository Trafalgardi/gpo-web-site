"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SecurityService_1 = __importDefault(require("../services/SecurityService"));
class AnketaController {
    constructor(app) {
        this.app = app;
        this.webClientDataProvider = this.app.providers.webClient;
    }
    getAnketaData(req, res) {
    }
    setAnketaData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            let personnelData = {
                gender: body['gender'],
                age: body['age'],
                registration: body['registration'],
                familyStatus: body['sp'],
                children: children()
            };
            let swap = [];
            let swapJson = {
                Name: '',
                check: false,
                cause: {}
            };
            for (let i = 0; i < 8; i++) {
                swapJson.Name = body['change_' + i + '_0'];
                swapJson.check = body['change_' + i + '_1'];
                swapJson.cause = causeSwap(i);
                let temp = JSON.stringify(swapJson);
                swap[i] = JSON.parse(temp);
            }
            function causeSwap(index) {
                let cause = {};
                for (let i = 0; i < 9; i++) {
                    if (body['change_' + index + '_1_' + i] == undefined)
                        continue;
                    cause[body['change_' + index + '_1_' + i]] = body['change_' + index + '_1_' + i + '_1'];
                }
                return cause;
            }
            function education() {
                let education = {
                    "Бакалавриат": "0",
                    "Магистратура": "0",
                    "Специалитет": "0",
                    "Подготовка кадров высшей квалификации": "0",
                    "Направление подготовки": {
                        "Педагогическое": "false",
                        "В области управления": "false",
                        "Управление проектами": "false",
                        "Техническое": "false",
                        "Гуманитарное": "false"
                    },
                    "Ученая степень": {
                        "Кандитат наук": "false",
                        "Доктор наук": "false",
                        "PhD": "false"
                    },
                    "Профессиональная переподготовка": {
                        "Гуманитарное": "false",
                        "Педагогическое": "false",
                        "В области управления": "false",
                        "Управление проектами": "false",
                        "Техническое": "false"
                    }
                };
                for (let index = 0; index < 19; index++) {
                    if (body["education_" + index] == undefined)
                        continue;
                    if (index == 12)
                        continue;
                    if (index < 4) {
                        education[body["education_" + index]] = body["education_" + index + '_0'];
                    }
                    else if (index > 3 && index < 9) {
                        education['Направление подготовки'][body["education_" + index]] = true;
                    }
                    else if (body["education_12"] == 'Да' && index > 13) {
                        education["Профессиональная переподготовка"][body["education_" + index]] = true;
                    }
                    else {
                        education["Ученая степень"][body["education_" + index]] = true;
                    }
                }
                return education;
            }
            function driveLicense() {
                let driveLicenseJSON = {
                    experience: 0,
                    category: '-',
                    haveCar: '-'
                };
                if (body["drive"] == "Да") {
                    driveLicenseJSON.experience = body['drive_1'];
                    driveLicenseJSON.category = body['drive_2'];
                    driveLicenseJSON.haveCar = body['drive_3'];
                }
                return driveLicenseJSON;
            }
            function militaryService() {
                let militaryServiceJSON = {
                    "Отношение к воинской обязанности": body['militarySelect'],
                    "По какой причине": body['notMilitarySelect'],
                    "Военнообязанный": body['yesMilitarySelect'],
                    "Воинское звания": body['yesMilitaryRankSelect']
                };
                return militaryServiceJSON;
            }
            function language() {
                let num = body['langNubmer'];
                let languageArr = [];
                let languageJSON = {
                    'Язык': '',
                    'Уровень владения языком': '',
                    'Шкала уровней владения иностранными языками по системе CEFR': ''
                };
                for (let index = 0; index <= num; index++) {
                    if (body['language_name_' + index] == undefined)
                        continue;
                    languageJSON['Язык'] = body['language_name_' + index];
                    languageJSON['Уровень владения языком'] = body['language_level_' + index];
                    languageJSON['Шкала уровней владения иностранными языками по системе CEFR'] = body['language_CEFR_' + index];
                    let temp = JSON.stringify(languageJSON);
                    languageArr[index] = JSON.parse(temp);
                }
                return languageArr;
            }
            function children() {
                let arr = [];
                let child = {
                    "Дети": body['children']
                };
                if (body['children'] == 'true') {
                    let childrenJSON = {
                        'age': '',
                        'gender': ''
                    };
                    let temp = body["childrenNumber"];
                    for (let index = 0; index <= 13; index++) {
                        if (body["ageChildrenName_" + index] == undefined)
                            continue;
                        childrenJSON['age'] = body["ageChildrenName_" + index];
                        childrenJSON['gender'] = body["genderChildrenName_" + index];
                        let temp = JSON.stringify(childrenJSON);
                        arr[index] = JSON.parse(temp);
                    }
                    const result = arr.filter(Boolean);
                    child['children'] = result;
                }
                return child;
            }
            let data = {
                personnelData: personnelData,
                leaderId: body["leader_id"],
                swap: swap,
                drive: driveLicense(),
                education: education(),
                military: militaryService(),
                language: language(),
                academicDegree: {
                    "Доктор наук": 'Нет',
                    "Кандидат наук": 'Нет'
                },
                experience: body['work_experience'],
                workExpirence: {
                    'Общий стаж': body['experience_0'],
                    'По специальности': body['experience_1'],
                    'Управленческий стаж': body['experience_2'],
                    'Педагогический стаж': body['experience_3'],
                    'Управление проектами': body['experience_4'],
                    'Не по специальности': body['experience_5'],
                    'Рабочие специальности': body['experience_6']
                }
            };
            data.academicDegree['Доктор наук'] = body['academic_degree_doc_1'];
            data.academicDegree['Кандидат наук'] = body['academic_degree_candidate_1'];
            let token = req.cookies.token;
            let payload = SecurityService_1.default.verifyToken(token);
            let user_id = payload.id;
            console.log(this.webClientDataProvider);
            yield this.webClientDataProvider.setAnketa(JSON.stringify(data), user_id);
            res.render('post');
        });
    }
}
exports.default = AnketaController;
