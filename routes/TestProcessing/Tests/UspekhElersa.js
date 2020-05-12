const {Check} = require('../CheckString');
module.exports = {
    UspekhElersa(answers) {
        var result = 0;

        var yes = [];
        var no = [];

        yes.push(answers[1]);
        yes.push(answers[2]);
        yes.push(answers[3]);
        yes.push(answers[4]);
        yes.push(answers[6]);
        yes.push(answers[7]);
        yes.push(answers[8]);
        yes.push(answers[9]);
        yes.push(answers[13]);
        yes.push(answers[14]);
        yes.push(answers[15]);
        yes.push(answers[16]);
        yes.push(answers[20]);
        yes.push(answers[21]);
        yes.push(answers[24]);
        yes.push(answers[25]);
        yes.push(answers[26]);
        yes.push(answers[27]);
        yes.push(answers[28]);
        yes.push(answers[29]);
        yes.push(answers[31]);
        yes.push(answers[36]);
        yes.push(answers[40]);

        no.push(answers[5])
        no.push(answers[12])
        no.push(answers[17])
        no.push(answers[19])
        no.push(answers[23])
        no.push(answers[30])
        no.push(answers[35])
        no.push(answers[37])
        no.push(answers[38])

        //console.log(yes.length);
        //console.log(no.length);

        for (var i = 0; i < yes.length; i++) {
            if (Check(yes[i], "да"))
                result += 1;
        }

        for (var i = 0; i < no.length; i++) {
            if (Check(no[i], "нет"))
                result += 1;
        }

        result /= 32;
        return result;
    }
}