const {Check} = require('../CheckString');
module.exports = {
   
Shubert(answers) {
    var result = 0;
    for (var i = 0; i < answers.length; i++) {
        if (Check(answers[i], "полностью согласен, полное \"да\""))
            result += 1;
        else if (Check(answers[i], "больше \"да\", чем \"нет\""))
            result += 0.5;
        else if (Check(answers[i], "ни \"да\", ни \"нет\", нечто среднее"))
            result += 0;
        else if (Check(answers[i], "больше \"нет\", чем \"да\""))
            result += -0.5;
        else if (Check(answers[i], "полное \"нет\""))
            result += -1;
    }

    if (result <= -25)
        result = 0.25;
    else if (result <= -24)
        result = 0.27;
    else if (result <= -23)
        result = 0.28;
    else if (result <= -22)
        result = 0.30;
    else if (result <= -21)
        result = 0.32;
    else if (result <= -20)
        result = 0.34;
    else if (result <= -19)
        result = 0.35;
    else if (result <= -18)
        result = 0.37;
    else if (result <= -17)
        result = 0.39;
    else if (result <= -16)
        result = 0.40;
    else if (result <= -15)
        result = 0.42;
    else if (result <= -14)
        result = 0.44;
    else if (result <= -13)
        result = 0.46;
    else if (result <= -12)
        result = 0.47;
    else if (result <= -11)
        result = 0.49;
    else if (result <= -10)
        result = 0.75;
    else if (result <= -9)
        result = 0.76;
    else if (result <= -8)
        result = 0.78;
    else if (result <= -7)
        result = 0.79;
    else if (result <= -6)
        result = 0.80;
    else if (result <= -5)
        result = 0.82;
    else if (result <= -4)
        result = 0.83;
    else if (result <= -3)
        result = 0.84;
    else if (result <= -2)
        result = 0.85;
    else if (result <= -1)
        result = 0.87;
    else if (result <= 0)
        result = 0.88;
    else if (result <= 1)
        result = 0.89;
    else if (result <= 2)
        result = 0.91;
    else if (result <= 3)
        result = 0.92;
    else if (result <= 4)
        result = 0.93;
    else if (result <= 5)
        result = 0.95;
    else if (result <= 6)
        result = 0.96;
    else if (result <= 7)
        result = 0.97;
    else if (result <= 8)
        result = 0.98;
    else if (result <= 9)
        result = 0.99;
    else if (result <= 10)
        result = 1;
    else if (result <= 11)
        result = 0.5;
    else if (result <= 12)
        result = 0.56;
    else if (result <= 13)
        result = 0.58;
    else if (result <= 14)
        result = 0.60;
    else if (result <= 15)
        result = 0.62;
    else if (result <= 16)
        result = 0.64;
    else if (result <= 17)
        result = 0.66;
    else if (result <= 18)
        result = 0.68;
    else if (result <= 19)
        result = 0.70;
    else if (result <= 20)
        result = 0.74;
    else if (result <= 21)
        result = 0.24;
    else if (result <= 22)
        result = 0.18;
    else if (result <= 23)
        result = 0.12;
    else if (result <= 24)
        result = 0.06;
    else
        result = 0;
    return result;
}
}
