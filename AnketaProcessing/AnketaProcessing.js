module.exports = {
    AnketaCalculation: (data) => {
        console.log("Обработка анкеты");
        console.log(data);

        //обработка        
        return Anketa(data);
    }
}

function Anketa(data) {
    var mainBlock = MainBlock(data);
    var educationBlock = EducationBlock(data);
    var additionalBlock = AdditionalBlock(data);
    //Предыдущие коэффициенты
    //var result = mainBlock * 0.4 + educationBlock * 0.6;
    var result = (mainBlock + educationBlock + additionalBlock) / 3;
    console.log("===Общий результат: " + result.toFixed(3));
    console.log("\n");
    return result;
}

function MainBlock(data) {
    var ageFloat = Age(data); //Возраст
    var swap = Swap(data); //Блок смен
    var familyStatus = FamilyStatus(data); //Семейное положение
    var children = Children(data); //Дети

    //var registration = Registration(data); //Гражданство
    //var drive = Drive(data); //Права + ТС
    //var military = 1; //Служба

    var result = (ageFloat + swap + familyStatus + children) / 4;
    console.log("==Личные данныые : " + result.toFixed(3));
    return result;
}

function Result(param) {

    console.log(param.personnelData.lastName + " " + param.personnelData.firstName + " " + param.personnelData.secondName)

    var mainBlock = MainBlock(param, id);
    var educationBlock = EducationBlock(param);
    var workBlock = WorkBlock(param);

    var result = mainBlock * 0.4 + educationBlock * 0.6;
    console.log("===Общий результат: " + result.toFixed(3));
    console.log("\n\n");
    return 0;


    var result = {
        age: ageFloat,
        swap: swapFloat,
        registration: registrationFloat,
        children: childrenFloat
    };
    var resFloat = (ageFloat + swapFloat + registrationFloat + childrenFloat) / 4;
    console.log("|||" + param.personnelData.lastName + ":" + resFloat + "|||");
    return 0;
}
///Основной блок
function MainBlock2(param, id) {

    //Результат основного блока
    //Сколько параметров складывается, на столько и делим
    //Сейчас без прав и службы и граждаства

    console.log("==Личные данныые : " + result.toFixed(3));

    var personnelData = param.personnelData;

    var lastName = personnelData.lastName + " ";
    var firstName = personnelData.firstName + " ";
    var secondName = personnelData.secondName;
    var gender = personnelData.gender[0];
    var age = personnelData.age;
    var registration = personnelData.registration;
    var temp = document.getElementById('addSomePersonal');

    var elem = "<div class='row'>";
    elem += "     <li class='col-1'>" + id + "</li>";
    elem += "     <li class='col-3'>" + lastName + firstName + secondName + "</li>";
    elem += "     <li class='col-3'>" + registration + "</li>";
    elem += "     <li class='col-1'>" + gender + "</li>";
    elem += "     <li class='col-1'>" + age + "</li>";
    elem += "     <li class='col-1'>" + result.toFixed(3) + "</li>";
    elem += "     <li class='col-1'>#</li>";
    elem += "     <li class='col-1' style=' border: none;'>#</li>";
    elem += "   </div>";
    temp.innerHTML += elem;

    return result;
    console.log(":military : " + military + "|||");
    console.log("ageFloat : " + ageFloat + "|||");
    console.log(":swap : " + swap + "|||");
    console.log(":registration : " + registration + "|||");
    console.log(":familyStatus : " + familyStatus + "|||");
    console.log(":children : " + children + "|||");
    console.log(":drive : " + drive + "|||");
    return result;

}

function Age(param) {
    var gender = param.personnelData.gender;
    var age = parseInt(param.personnelData.age);
    var ageFloat = 0;
    if (gender[0] == "Ж") {
        if ((age >= 21 && age <= 25) || (age >= 46 && age <= 55)) {
            ageFloat = 0.2;
        } else if (age >= 26 && age <= 30) {
            ageFloat = 0.4;
        } else if (age >= 31 && age <= 35) {
            ageFloat = 0.6;
        } else if (age >= 41 && age <= 45) {
            ageFloat = 0.8;
        } else if (age >= 36 && age <= 40) {
            ageFloat = 1;
        }
    } else {
        if (age >= 51 && age <= 60) {
            ageFloat = 0.2;
        } else if ((age >= 21 && age <= 25) || (age >= 46 && age <= 50)) {
            ageFloat = 0.4;
        } else if ((age >= 26 && age) <= 30 || (age >= 41 && age <= 45)) {
            ageFloat = 0.6;
        } else if (age >= 36 && age <= 40) {
            ageFloat = 0.8;
        } else if (age >= 31 && age <= 35) {
            ageFloat = 1;
        }
    }
    return ageFloat;
}

function CheckSwap(cause, coef) {
    var result = parseInt(cause);
    if (!cause)
        cause = 0;

    cause = Math.abs(cause);

    if (cause < 0)
        cause = 0;
    else if (cause > 10)
        cause = 10;

    cause = 1 - (cause * 0.1);
    return cause;
}

function Swap(param) {
    var swap = param.swap;
    var result = 0;

    var idSwap = 0;
    var swapFamily = 0;
    swapFamily += CheckSwap(swap[idSwap].cause["иные причины"]);
    swapFamily += CheckSwap(swap[idSwap].cause["по собственному желанию"]);
    swapFamily += CheckSwap(swap[idSwap].cause["усыновлен/удочерена"]);
    swapFamily += CheckSwap(swap[idSwap].cause["в связи с вступлением в брак"]);
    swapFamily += CheckSwap(swap[idSwap].cause["в целях безопасности"]);

    swapFamily /= 5;
    result += swapFamily;


    idSwap = 1;
    var swapName = 0;
    swapName += CheckSwap(swap[idSwap].cause["иные причины"]);
    swapName += CheckSwap(swap[idSwap].cause["по собственному желанию"]);
    swapName += CheckSwap(swap[idSwap].cause["усыновлен/удочерена"]);
    swapName += CheckSwap(swap[idSwap].cause["в целях безопасности"]);

    swapName /= 4;
    result += swapName;


    idSwap = 2;
    var swapPatronymic = 0;
    swapPatronymic += CheckSwap(swap[idSwap].cause["иные причины"]);
    swapPatronymic += CheckSwap(swap[idSwap].cause["по собственному желанию"]);
    swapPatronymic += CheckSwap(swap[idSwap].cause["усыновлен/удочерена"]);
    swapPatronymic += CheckSwap(swap[idSwap].cause["в целях безопасности"]);


    swapPatronymic /= 4;
    result += swapPatronymic;


    idSwap = 3;
    var swapDateBirth = 0;
    swapDateBirth += CheckSwap(swap[idSwap].cause["иные причины"]);
    swapDateBirth += CheckSwap(swap[idSwap].cause["по собственному желанию"]);
    swapDateBirth += CheckSwap(swap[idSwap].cause["ошибка оператора или регистратора"]);
    swapDateBirth += CheckSwap(swap[idSwap].cause["в целях безопасности"]);

    swapDateBirth /= 4;
    result += swapDateBirth;


    idSwap = 4;
    var swapRegistration = 0;
    swapRegistration += CheckSwap(swap[idSwap].cause["иные причины"]);
    swapRegistration += CheckSwap(swap[idSwap].cause["личные цели"]);
    swapRegistration += CheckSwap(swap[idSwap].cause["семейные обстоятельства"]);
    swapRegistration += CheckSwap(swap[idSwap].cause["в связи с состоянием здоровья"]);
    swapRegistration += CheckSwap(swap[idSwap].cause["в связи со сменой работы"]);
    swapRegistration += CheckSwap(swap[idSwap].cause["в связи с покупкой жилья"]);
    swapRegistration += CheckSwap(swap[idSwap].cause["в целях безопасности"]);

    swapRegistration /= 7;
    result += swapRegistration;


    idSwap = 5;
    var swapLocation = 0;
    swapLocation += CheckSwap(swap[idSwap].cause["иные причины"]);
    swapLocation += CheckSwap(swap[idSwap].cause["личные цели"]);
    swapLocation += CheckSwap(swap[idSwap].cause["семейные обстоятельства"]);
    swapLocation += CheckSwap(swap[idSwap].cause["в связи с состоянием здоровья"]);
    swapLocation += CheckSwap(swap[idSwap].cause["в связи со сменой работы"]);
    swapLocation += CheckSwap(swap[idSwap].cause["в связи с покупкой жилья"]);
    swapLocation += CheckSwap(swap[idSwap].cause["в целях безопасности"]);

    swapLocation /= 7;
    result += swapLocation;


    idSwap = 6;
    var swapPhone = 0;
    swapPhone += CheckSwap(swap[idSwap].cause["иные причины"]);
    swapPhone += CheckSwap(swap[idSwap].cause["личные цели"]);
    swapPhone += CheckSwap(swap[idSwap].cause["в связи с потерей сим. карты"]);
    swapPhone += CheckSwap(swap[idSwap].cause["в связи с переездом в другой регион/страну"]);
    swapPhone += CheckSwap(swap[idSwap].cause["в целях безопасности"]);

    swapPhone /= 5;
    result += swapPhone;


    idSwap = 7;
    var swapEmail = 0;
    swapEmail += CheckSwap(swap[idSwap].cause["другие причины"]);
    swapEmail += CheckSwap(swap[idSwap].cause["в связи с необходимостью создания нескольких аккаунтов в со-циальной сети"]);
    swapEmail += CheckSwap(swap[idSwap].cause["утеря пароля и невозможность его восстановления"]);
    swapEmail += CheckSwap(swap[idSwap].cause["спам/бан"]);
    swapEmail += CheckSwap(swap[idSwap].cause["в связи с работой в разных организациях"]);
    swapEmail += CheckSwap(swap[idSwap].cause["личная и корпоративная почта"])

    swapEmail /= 6;
    result += swapEmail;


    result /= (idSwap + 1);

    return result;

    console.log("swapFamily: " + swapFamily);
    console.log("swapName: " + swapName);
    console.log("swapPatronymic: " + swapPatronymic);
    console.log("swapDateBirth: " + swapDateBirth);
    console.log("swapRegistration: " + swapRegistration);
    console.log("swapLocation: " + swapLocation);
    console.log("swapPhone: " + swapPhone);
    console.log("swapEmail: " + swapEmail);

    console.log("ResultSwap: " + result);


    return result;
}


function Registration(param) {
    var registration = param.personnelData.registration;
    var registrationFloat = 0;

    if (registration == "гражданство РФ") {
        registrationFloat = 1;
    } else if (registration == "двойное гражданство (РФ и др.)") {
        registrationFloat = 0.75;
    } else if (registration == "политический беженец (политическое убежище)") {
        registrationFloat = 0.5;
    } else if (registration == "лицо без гражданство") {
        registrationFloat = 0.25;
    }

    return registrationFloat;
}


function Children(param) {
    var children = param.personnelData.children;
    var childrenFloat = 1;

    if (children && children.children && children.children.length > 0) {
        children = children.children;


        var minAge = parseInt(children[0].age);
        if (!minAge)
            minAge = 0;
        for (var i = 0; i < children.length; i++) {
            var currentAge = parseInt(children[i].age);
            if (currentAge < minAge) {
                minAge = currentAge;
            }
        }

        //Минимальный возраст ребёнка делим на 18 (т.к. в 18 лет это 1 балл)
        childrenFloat = minAge / 18;
    }

    return childrenFloat;
}


function FamilyStatus(param) {
    var status = param.personnelData;
    var result = 1;
    //Нет записи (временно)
    return result;
}


function Drive(param) {
    var data = param.drive.haveCar;
    var result = 0;

    if (!data)
        return 0;
    if (data == "легковой автомобиль") {
        result = 1;
    } else if (data == "грузовой автомобиль") {
        result = 0.75;
    } else if (data == "общественный автомобильный транспорт") {
        result = 0.5
    } else if (data == "другое") {
        result = 0.25;
    }

    return result;
}

///Образование
function EducationBlock(param) {

    var levelEducation = LevelEducation(param);
    var directionTraining = DirectionTraining(param);
    var academicDegree = AcademicDegree(param);
    var language = Language(param); //Пока только сам язык без уровня и квалификации

    //убрать учёную степень и языки
    var result = (levelEducation + directionTraining) / 2;


    console.log("==Образование: " + result.toFixed(3));
    //return result;
    console.log(":Уровень образования: " + levelEducation);
    console.log(":Направление подготовки: " + directionTraining);
    //console.log(":Учёная степень: " + academicDegree);
    //console.log(":Знание иностранных языков: " + language);
    return result;
}

function LevelEducation(param) {
    var education = param.education;
    var number = 0;

    if (education["Специалитет"] != 0) {
        number = 1;

    } else if (education["Магистратура"] != 0) {
        number = 0.75;

    } else if (education["Бакалавриат"] != 0) {
        number = 0.5;
    } else if (education["Полное среднетехническое образование"] != 0) {
        number = 0.45;
    }
    //number /= 5;
    return parseFloat(number);
}


function DirectionTraining(param) {
    var education = param.education["Направление подготовки"];
    var retraining = param.education["Профессиональная переподготовка"];
    var number = 0;

    if (education["Техническое"] == true)
        number += 0.45;
    if (education["В области управления"] == true)
        number += 0.3;
    if (education["Гуманитарное"] == true)
        number += 0.25;


    if (number > 1)
        number = 1;
    /*
	
    var number = 0;
    if (education["Педагогическое"] == true)
    	number+= 0;
    if (education["Управление проектами"] == true)
    	number+= 0;

    if (retraining["Педагогическое"] == true)
    	number++;
	
    if (retraining["Управление проектами"] == true)
    	number++;
	
	
    */
    ///Гуманитарное
    ///техническое
    // области управления = 1
    /*	
    	педагогичкое перенести и управление проектами перенести в один дополнительный
    	Основной:
    	гум + тех + в области управления = 1
    	тех + управ = 0,75
    	гум + тех = 0,7 
    	гум + управ = 0,55

    	тех = 0,45
    	гум = 0,25
    	управ = 0,3
    	
    	гуманит + тех + обл управления = 1
    	техничекое + область урпавления = 0,75
    	гум + тех = 0,5

    */

    return parseFloat(number);
}


function AcademicDegree(param) {
    var education = param.education;
    var number = 0;
    var academic = education["Ученая степень"];

    if (academic["PhD"] == true) {
        number = 1;
    } else if (academic["Доктор наук"] == true) {
        number = 0.75;
    } else if (academic["Кандитат наук"] == true) {
        number = 0.5;
    }
    return parseFloat(number);
}

function ProfessionalRetraining(param) {
    var retraining = param.education["Профессиональная переподготовка"];
    var number = 0;

    if (retraining["Педагогическое"] == true)
        number++;
    if (retraining["В области управления"] == true)
        number++;
    if (retraining["Управление проектами"] == true)
        number++;
    if (retraining["Техническое"] == true)
        number++;
    if (retraining["Гуманитарное"] == true)
        number++;

    number /= 5;
    return parseFloat(number);
}


function Language(param) {
    var language = param.language;
    var number = 0;
    if (language) {
        for (var i = 0; i < language.length; i++) {
            var temp = CheckLanguate(language[i]["Язык"], language[i]["Уровень владения языком"], language[i]["Шкала уровней владения иностранными языками по системе CEFR"]);
            if (temp > number)
                number = temp;
        }
    }

    return number;
}


function CheckLanguate(language, level, cval) {
    var numberLanguage = 0;
    var numberLevel = 0;
    var numberCval = 0;
    var number = 0;
    if (language == "Английский язык" || language == "Китайский язык") {
        numberLanguage = 1;
    }
    if (language == "Французский язык" || language == "арабский") {
        numberLanguage = 0.9;
    }
    if (language == "Немецкий язык" || language == "Хинди") {
        numberLanguage = 0.8;
    }
    if (language == "испанский" || language == "корейский") {
        numberLanguage = 0.7;
    }
    if (language == "португальский" || language == "турецкий") {
        numberLanguage = 0.6;
    }
    if (language == "итальянский" || language == "Иврит") {
        numberLanguage = 0.5;
    }
    if (language == "польский" || language == "малайский") {
        numberLanguage = 0.4;
    }
    if (language == "болгарский" || language == "монгольский") {
        numberLanguage = 0.3;
    }
    if (language == "греческий" || language == "тайский") {
        numberLanguage = 0.2;
    }
    if (language == "Другой" || language == "другой") {
        numberLanguage = 0.1;
    }

    if (level == "Начальный") { //школьный курс (базовый курс)
        numberLevel = 0.5;
    } else if (level == "Средний") { //разговорный
        numberLevel = 0.75;
    } else if (level == "Продвинутый" || level == "Свободно владею") { //профессиональный
        numberLevel = 1;
    }

    if (cval == "A1") {
        numberCval = 0.6;
    } else if (cval == "A2") {
        numberCval = 0.7;
    } else if (cval == "B1") {
        numberCval = 0.8;
    } else if (cval == "B2") {
        numberCval = 0.9;
    } else if (cval == "C1") {
        numberCval = 1;
    } else if (cval == "C2") {
        numberCval = 1;
    }

    number = numberLanguage;
    return parseFloat(number);
}


function WorkBlock(param) {
    return 0;
}

///Дополнительная информация
function AdditionalBlock(param) {
    var agreePsychologic = AgreePsychologic(param);
    var adaptation = Adaptation(param);
    var levelPC = LevelPC(param);
    var uncertainty = Uncertainty(param);

    var result = (agreePsychologic + adaptation + levelPC + uncertainty) / 4;


    console.log("==Дополнительная информация: " + result.toFixed(3));
    console.log(":Согласие на участие в психологической диагностике: " + agreePsychologic);
    console.log(":Быстро адаптироваться: " + adaptation);
    console.log(":Уровень пользования ПК: " + levelPC);
    console.log(":При неопределенности: " + uncertainty);
    return result;
}

function AgreePsychologic(param) {
    var agreePsychologic = param.additionalInfo.agreePsychologic;
    var resultFloat = 0;

    if (agreePsychologic == "Да")
        resultFloat = 1;

    return resultFloat;
}

function Adaptation(param) {
    var adaptation = param.additionalInfo.adaptation;
    var resultFloat = 0;

    if (adaptation == "Да (менее чем за 1 месяц)")
        resultFloat = 1;
    else if (adaptation == "Да (более чем за 1 месяц)")
        resultFloat = 0.5;

    return resultFloat;
}

function LevelPC(param) {
    var levelPC = param.additionalInfo.levelPC;
    var resultFloat = 0;

    if (levelPC == "Продвинутый пользователь")
        resultFloat = 1;
    else if (levelPC == "Уверенный пользователь")
        resultFloat = 0.75;
    else if (levelPC == "Средний уровень")
        resultFloat = 0.5;
    else if (levelPC == "Начинающий уровень")
        resultFloat = 0.25;

    return resultFloat;
}

function Uncertainty(param) {
    var uncertainty = param.additionalInfo.uncertainty;
    var resultFloat = 0;

    if (uncertainty == "Да (удачно)")
        resultFloat = 1;
    else if (uncertainty == "Да (неудачно)")
        resultFloat = 0.5;

    return resultFloat;
}