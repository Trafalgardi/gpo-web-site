const {Check} = require('../CheckString');
module.exports = {
    HolmsRage(answers) {
        var result = 0;
    
        var coef = [
            100,
            73,
            65,
            63,
            63,
            53,
            50,
            47,
            45,
            45,
            44,
            40,
            39,
            39,
            39,
            38,
            37,
            36,
            35,
            31,
            30,
            29,
            29,
            29,
            28,
            26,
            26,
            25,
            24,
            23,
            20,
            20,
            20,
            19,
            19,
            18,
            17,
            16,
            15,
            15,
            13,
            12,
            11
        ];
    
        let sum = 0;
        for (var i = 0; i < answers.length; i++) {
            var number = Number.parseInt(answers[i]);
            if (!Number.isInteger(number))
                number = 0;
            if (Check(answers[i], "да"))
                number = 1;

            if (number >= 1)
                sum += coef[i];
        }
    
        if (sum > 300)
            sum = 300;
    
        result = 1 - (sum - 11) / Math.min(300 - 11, sum);
        return result;
    }
}