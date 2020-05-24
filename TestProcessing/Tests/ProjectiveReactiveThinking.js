const {Check} = require('../CheckString');
module.exports = {
    ProjectiveReactiveThinking(answers) {
        var result = 0;
    
        let right = [1, 3, 5, 8, 9]
    
        for (let i = 0; i < answers.length; i++) {
            const element = answers[i];
            if (right.includes(parseInt(element)))
                result += 1;
        }
    
        result /= answers.length;
    
        return result;
    }
}