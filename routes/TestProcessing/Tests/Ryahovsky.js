function Check(x, y) {
	return x.toLowerCase() === y.toLowerCase();
}

module.exports = {
    Ryahovsky: (answers) => {
        var result = 0;

        for (var i = 0; i < answers.length; i++) {
            if (Check(answers[i], "да"))
                result += 2;
            else if (Check(answers[i], "иногда"))
                result += 1;
        }

        if (result == 0)
            result = 0;
        else if (result < 4)
            result = 0.1;
        else if (result < 9)
            result = 0.7;
        else if (result < 14)
            result = 0.9;
        else if (result < 19)
            result = 1;
        else if (result < 25)
            result = 0.9;
        else if (result < 30)
            result = 0.3;
        else
            result = 0.1;

        return result;
    }
}
