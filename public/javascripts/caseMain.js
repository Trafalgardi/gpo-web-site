function checkType(parms, id) {
    const previousButton = $('#previous');
    const nextButton = $('#next');
    let content = '';

    console.log(JSON.parse(parms));
    let json = JSON.parse(parms);

    numberTestData = json;
    myQuestions = json.data;

    if (json.html !== undefined) {
        console.log(json.html);
        let temp = json.html.replace(/&lt;/g, '<');
        temp = temp.replace(/&gt;/g, '>');
        console.log(temp);
        document.getElementById('comment').innerHTML = temp;
    } else {
        console.log('Комментария нет');
    }

    slideQuestions(json);

    $('#caseName').html('<h1>' + json.name + '</h1>');
    if (json.mask) $('.mask').mask(json.mask, { 'translation': { 0: { pattern: json.pattern } } });
    $('#info').html(`<div class="box-footer"><input style="display:none" name="id" type="text" value="${id}"></input> </div>`);
}

// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) { str = '0' + str; }
    return str;
}

function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}