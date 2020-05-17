const {Check} = require('../CheckString');
module.exports = {
    PSM25(answers) {
        var result = 0;
        for (var i = 0; i < answers.length; i++) {
            if (Check(answers[i], "постоянно"))
                result += 7;
            else if (Check(answers[i], "очень часто"))
                result += 6;
            else if (Check(answers[i], "часто"))
                result += 5;
            else if (Check(answers[i], "иногда"))
                result += 4;
            else if (Check(answers[i], "редко"))
                result += 3;
            else if (Check(answers[i], "очень редко"))
                result += 2;
            else if (Check(answers[i], "крайне редко"))
                result += 1;
        }
    
        result = 1 - result / 175;
        return result;
    }
}