const {Check} = require('../CheckString');
module.exports = {
    AnalyticalIntuitiveThinking(answers) {
        var result = 0;
    
    
        if (Check(answers[0], "да"))
            result += 1;
        if (Check(answers[1], "да"))
            result += 1;
        if (Check(answers[2], "нет"))
            result += 1;
        if (Check(answers[3], "математика"))
            result += 1;
        if (Check(answers[4], "нет"))
            result += 1;
    
        result /= 5;
        return result;
    }
}