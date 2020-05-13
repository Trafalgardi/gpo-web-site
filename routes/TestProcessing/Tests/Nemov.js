const {Check} = require('../CheckString');
module.exports = {
    Nemov(answers) {
        var result = 0;
        for (var i = 0; i < answers.length; i++) {
            if (Check(answers[i], "да"))
                result += 1;
        }
    
        result /= 40;
        return result;
    }
}