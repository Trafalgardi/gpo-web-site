const {Check} = require('../CheckString');
module.exports = {
    Goroh(answers) {
        var result = 0;
    
        if (Check(answers[0][0], "б"))
            result += 1;
        else if (Check(answers[0][0], "в"))
            result += 2;
    
        if (Check(answers[1][0], "а"))
            result += 1;
        else if (Check(answers[1][0], "б"))
            result += 2;
    
        if (Check(answers[2][0], "а"))
            result += 1;
        else if (Check(answers[2][0], "б"))
            result += 2;
    
        if (Check(answers[3][0], "а"))
            result += 2;
        else if (Check(answers[3][0], "б"))
            result += 1;
    
        if (Check(answers[4][0], "б"))
            result += 1;
        else if (Check(answers[4][0], "в"))
            result += 2;
    
        if (Check(answers[5][0], "б"))
            result += 2;
        else if (Check(answers[5][0], "в"))
            result += 1;
    
        if (Check(answers[6][0], "б"))
            result += 1;
        else if (Check(answers[6][0], "в"))
            result += 2;
    
        if (Check(answers[7][0], "б"))
            result += 2;
        else if (Check(answers[7][0], "в"))
            result += 1;
    
        if (Check(answers[8][0], "а"))
            result += 1;
        else if (Check(answers[8][0], "в"))
            result += 2;
    
        if (Check(answers[9][0], "а"))
            result += 2;
        else if (Check(answers[9][0], "б"))
            result += 1;
    
        result /= 20;
        return result;
    }
}