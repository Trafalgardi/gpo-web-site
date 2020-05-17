const {Check} = require('../CheckString');
module.exports = {
    Nemchin(answers) {
        var result = 0;
        for (var i = 0; i < answers.length; i++) {
            if (Check(answers[i][0], "в"))
                result += 2;
            else if (Check(answers[i][0], "б"))
                result += 1;
        }
    
        result = 1 - result / 60;
        return result;
    }
}