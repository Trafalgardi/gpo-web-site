const {Check} = require('../CheckString');
module.exports = {
    ProductiveReproductiveThinking(answers) {
        var result = 0;
    
    
        if (Check(answers[0], "да"))
            result += 1;
        if (Check(answers[1], "нет"))
            result += 1;
        if (Check(answers[2], "нет"))
            result += 1;
        if (Check(answers[3], "да"))
            result += 1;
        if (Check(answers[4], "«Завтра я выучу 30 новых английских слов»"))
            result += 1;
    
        result /= 5;
        return result;
    }
}