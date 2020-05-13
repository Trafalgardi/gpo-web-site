const {Check} = require('../CheckString');
module.exports = {
    Munsterberg(answers) {
        var result = 0;
        var array = answers[0].split(" ");
        var words = [
            "солнце",
            "район",
            "новость",
            "факт",
            "экзамен",
            "прокурор",
            "теория",
            "хоккей",
            "телевизор",
            "память",
            "восприятие",
            "любовь",
            "спектакль",
            "радость",
            "народ",
            "репортаж",
            "конкурс",
            "личность",
            "комедия",
            "отчаяние",
            "лаборатория",
            "основание",
            "психиатрия",
            "плавание",
            "гиена"
        ];
    
        for (var i = 0; i < array.length; i++) {
            if (!Check(array[i], "")) {
                for (var j = 0; j < words.length; j++) {
                    if (Check(array[i], words[j])) {
                        result += 1;
                        words.splice(j, 1);
                        break;
                    }
                }
            }
        }
    
        result /= 25;
        if (result <= 0)
            result = 0;
        else if (result > 1)
            result = 1;
        return result;
    }
}