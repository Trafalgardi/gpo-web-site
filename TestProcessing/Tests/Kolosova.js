const {Check} = require('../CheckString');
module.exports = {
    Kolosova(answers) {
        var result = 0;
        for (var i = 0; i < answers.length; i++) {
            if (Check(answers[i][0], "а"))
                result += 2;
            else if (Check(answers[i][0], "б"))
                result += 1;
        }
        result /= 20;
        return result;
    }
}
