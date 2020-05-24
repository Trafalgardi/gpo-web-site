const {Check} = require('../CheckString');
module.exports = {
    AnalyticalThinking(answers) {
        var result = 0;
    
        if (answers.length < 8){
            console.log("Не достаточно ответов!")
            return 0;
        }
            
        if (Check(answers[0], "М"))
            result += 1;
        if (Check(answers[1], "Г"))
            result += 1;
        if (Check(answers[2], "33"))
            result += 1;
        if (Check(answers[3], "4"))
            result += 1;
        if (Check(answers[4], "52"))
            result += 1;
        if (Check(answers[5], "Д"))
            result += 1;
        if (Check(answers[6], "Б"))
            result += 1;
        if (Check(answers[7], "Б"))
            result += 1;
        
        result /= 8;
    
        return result;
    }
}