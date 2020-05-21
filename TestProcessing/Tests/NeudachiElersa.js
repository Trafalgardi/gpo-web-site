const {Check} = require('../CheckString');
module.exports = {
    NeudachiElersa(answers) {
        var result = 0;

        if (Check(answers[0], "бдительный"))
            result += 1;
        if (Check(answers[1], "кроткий") || Check(answers[1], "робкий"))
            result += 1;
        if (Check(answers[2], "осторожный") || Check(answers[2], "пессимистичный"))
            result += 1;
        if (Check(answers[3], "внимательный"))
            result += 1;
        if (Check(answers[4], "трусливый"))
            result += 1;
        if (Check(answers[5], "предусмотрительный"))
            result += 1;
        if (Check(answers[6], "колеблющийся") || Check(answers[6], "удалой"))
            result += 1;
        if (Check(answers[7], "боязливый"))
            result += 1;
        if (Check(answers[8], "не задумывающийся"))
            result += 1;
        if (Check(answers[9], "добросовестный"))
            result += 1;
        if (Check(answers[10], "меланхоличный") || Check(answers[10], "сомневающийся"))
            result += 1;
        if (Check(answers[11], "трусливый") || Check(answers[11], "взволнованный"))
            result += 1;
        if (Check(answers[12], "тихий") || Check(answers[12], "боязливый"))
            result += 1;
        if (Check(answers[13], "внимательный"))
            result += 1;
        if (Check(answers[14], "рассудительный"))
            result += 1;
        if (Check(answers[15], "осторожный") || Check(answers[15], "предусмотрительный"))
            result += 1;
        if (Check(answers[16], "робкий"))
            result += 1;
        if (Check(answers[17], "малодушный"))
            result += 1;
        if (Check(answers[18], "пугливый") || Check(answers[18], "нерешительный"))
            result += 1;
        if (Check(answers[19], "исполнительный") || Check(answers[19], "преданный"))
            result += 1;
        if (Check(answers[20], "предусмотрительный"))
            result += 1;
        if (Check(answers[21], "укрощенный"))
            result += 1;
        if (Check(answers[22], "осторожный") || Check(answers[22], "терпеливый"))
            result += 1;
        if (Check(answers[23], "разумный") || Check(answers[23], "заботливый"))
            result += 1;
        if (Check(answers[24], "предвидящий"))
            result += 1;
        if (Check(answers[25], "пугливый"))
            result += 1;
        if (Check(answers[26], "пессимистичный"))
            result += 1;
        if (Check(answers[27], "рассудительный") || Check(answers[27], "осмотрительный"))
            result += 1;
        if (Check(answers[28], "тихий") || Check(answers[28], "боязливый"))
            result += 1;
        if (Check(answers[29], "бдительный"))
            result += 1;

        result /= 30;
        return result;
    }
}