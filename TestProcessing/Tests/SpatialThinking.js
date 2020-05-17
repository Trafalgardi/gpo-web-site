const {Check} = require('../CheckString');
module.exports = {
    SpatialThinking(answers) {
        var result = 0;
    
        if (Check(answers[0], "D"))
            result += 1;
        if (Check(answers[1], "E"))
            result += 1;
        if (Check(answers[2], "D"))
            result += 1;
        if (Check(answers[3], "E"))
            result += 1;
        if (Check(answers[4], "C"))
            result += 1;
        if (Check(answers[5], "A"))
            result += 1;
        if (Check(answers[6], "B"))
            result += 1;
        if (Check(answers[7], "D"))
            result += 1;
        if (Check(answers[8], "B"))
            result += 1;
        if (Check(answers[9], "D"))
            result += 1;
    
    
        result /= 10;
    
        return result;
    }
}