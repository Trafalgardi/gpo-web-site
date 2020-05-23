const quiz_btn_container = document.getElementById("quiz-btn-container")
function checkType(parms, id) {
    const previousButton = $('#previous');
    const nextButton = $('#next');
    let content = '';
    let json = JSON.parse(parms);
    if(json.type == null || json.type == undefined)
    {
        mainFunc(json)
        return
    }
    quiz_btn_container.innerHTML = `
    <button type="button" id="previous">Предыдущий вопрос</button>
    <button type="button" id="next">Следующий вопрос</button>
    <button type="submit" id="submitBtn">Отправить ответы</button>
    <button type="button" style="display:none" id="start">Начать</button>`;
    numberTestData = json;
    myQuestions = json.data;

    if (json.time !== undefined && json.time > 0) {
        createTimer(json.time);
    } else {
        console.log("Таймера нет");
    }

    if (json.html !== undefined) {
        console.log(json.html);
        let temp = json.html.replace(/&lt;/g, '<');
        temp = temp.replace(/&gt;/g, '>');
        console.log(temp);
        document.getElementById('comment').innerHTML = temp;
    } else {
        console.log('Комментария нет');
    }

    switch (json.type) {
        case 0: //Разные ответы на все тесты
            slideQuestions(json);
            break;
        case 1:
            slideQuestions(json);
            //content += oneForAll(json.questions, json.answers, json.answerDefault) // 0 - answerDefault или dif или значение по умолчанию.
            break;
        case 2:
            content += justAnswers(json.data, json.answerDefault);
            break;
        case 3:
            content += textAnswers(json.questions);
            break;
        case 4:
            content += oneTextAnswer();
            break;
        case 5:
            content += noPatternText(json.data);
            break;
        case 6:
            content += '<div id="noPatternNumber"></div>';
            break;
        case 7: //-
            content += '<div class="row" id="ImagePatter"></div>';
            break;
        case 8:
            slideQuestions(json);
            break;
        case 9:
            content += chooseN(json);
            break;
        case 10:
            content += htmlOnline(json.data);
            break;
        case 11:
            content += slideQuestionsRememberImg(json.data);
            break;
        case 12:
            content += checkBox(json);
            break;
        default:
            break;
    }

    if (json.type != 0 && json.type != 1 && json.type != 8 && json.type != 11) {
        previousButton.hide();
        nextButton.hide();
        $('#quiz').append(content);
    }

    $('#testName').html('<h1>' + json.name + '</h1>');
    if (json.mask) $('.mask').mask(json.mask, { 'translation': { 0: { pattern: json.pattern } } });
    if (json.type == 6) noPatternNumber(0);
    if (json.type == 7) imageAnswers(1, 1);
    if (json.type == 12) {
        $("#q_0").show();
    }
    $('#info').html(`<div class="box-footer"><input style="display:none" name="id" type="text" value="${id}"></input> </div>`);
}

function createTimer(time) {
    let timer = '';
    timer += "<h5 class='timer' data-minutes-left='" + time + "'></h5>";
    timer += "<section class='actions'></section>";
    document.getElementById('timer').innerHTML = timer;
    let form = document.forms[0];
    $('.timer').startTimer({
        onComplete: function() {
            console.log(form)
            form.submit();
        }
    })
}

function stopwatch() {
    var $stopwatch, // Stopwatch element on the page
        incrementTime = 70, // Timer speed in milliseconds
        currentTime = 0, // Current time in hundredths of a second
        updateTimer = function() {
            $stopwatch.val(formatTime(currentTime));
            currentTime += incrementTime / 10;
        },
        init = function() {
            $stopwatch = $('#stopwatch');
            stopwatch.Timer = $.timer(updateTimer, incrementTime, true);
        };
    $(init);
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