const {Check} = require('../CheckString');
module.exports = {
    Madduh(answers) {
        var result = 0;
        for (var i = 0; i < answers.length; i++) {
            if (Check(answers[i], "совершенно верно."))
                result += 3;
            else if (Check(answers[i], "скорее всего верно;"))
                result += 2;
            else if (Check(answers[i], "едва ли это верно;"))
                result += 1;
        }
    
        result /= 30; // 30, а не 40 потому что от 0 до 3, а не от 1 до 4
        return result;
    }
}