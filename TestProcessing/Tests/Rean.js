const {Check} = require('../CheckString');
module.exports = {
    Rean(answers) {
        var result = 0;
        for (var i = 0; i < answers.length; i++) {
            if (i == 3 || i == 4 || i == 6 || i == 8 || i == 12 || i == 14 || i == 16) { //нет
                if (Check(answers[i], "нет")) {
                    console.log(i + " +");
                    result += 1;
                }
            } else {
                if (Check(answers[i], "да"))
                    result += 1;
            }
        }
    
        result /= 20;
        return result;
    }
}