function slideQuestions(params) {
    type = params.type;
    const quizContainer = $('#quiz');
    const submitButton = $('#submitBtn');

    // display quiz right away
    buildQuiz();

    const previousButton = $('#previous');
    const nextButton = $('#next');
    const slides = $('.slide');
    let currentSlide = 0;

    showSlide(currentSlide);

    previousButton.on("click", showPreviousSlide);
    nextButton.on("click", showNextSlide);

    function buildQuiz() {
        // we'll need a place to store the HTML output
        const output = [];
        myQuestions = type != 1 ? params.data : params.questions;
        console.log(myQuestions);
        for (let q = 0; q < myQuestions.length; q++) {
            let answers = [];
            if (type == 0) { //Когда разные ответы для всех вопросов.
                // and for each available answer...
                answers = radioAnswers(myQuestions[q].answers, q, -1);

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
                        <div class="question"> ${myQuestions[q].question} </div>
                        <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );
            } else if (type == 1) { //Когда одинаковые ответы для всех вопросов.
                // and for each available answer...
                answers = radioAnswers(params.answers, q, -1);

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
                        <div class="question"> ${myQuestions[q]} </div>
                        <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );
            } else if (type == 8) { //Когда разные ответы для всех вопросов и есть картинки.
                // and for each available answer...
                answers = radioAnswers(myQuestions[q].answers, q, -1);
                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
                        <div class="question"> ${myQuestions[q].question} </div>
                        <img src="../${myQuestions[q].img}" alt="тут должна быть кратинка :)">
                        ${answers.join("")}
                    </div>`
                );
            }
        }
        quizContainer.html(output.join(""));
    }

    function showSlide(n) {
        $(slides[currentSlide]).removeClass("active-slide");
        $(slides[n]).addClass("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.hide();
        } else {
            previousButton.show();
        }

        if (currentSlide === slides.length - 1) {
            nextButton.hide();
            submitButton.show();
        } else {
            nextButton.show();
            submitButton.hide();
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }
}

function justAnswers(questions, def) {
    let content = '';
    for (let i = 0; i < questions.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>' + (i + 1) + '.</label>';
        content += radioAnswers(questions[i].answers, i, -1).join("");
        content += '</div>';
    }
    return content;
}

function radioAnswers(answers, questionIndex, defaultAnswer) { //Мы передаём сюда массив ответов для вопроса, i номер вопроса, def - выбор значения по умолчанию
    const answersHtml = [];
    for (let i = 0; i < answers.length; i++) {
        let checked = defaultAnswer == i ? ' checked' : '';
        answersHtml.push(
            `<div class="radio">
                <label>
                    <input type="radio" name="question${questionIndex}" value="${answers[i]}"${checked}>
                    ${answers[i]}
                </label>
            </div>`
        );
    }
    if (defaultAnswer == -1) {
        answersHtml.push(
            `<label style="display:none">
                <input type="radio" name="question${questionIndex}" value="default" checked>
            </label>`
        );
    }
    return answersHtml;
}

function textAnswers(questions, mask, pattern) {
    let content = '';
    for (let i = 0; i < questions.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>' + (i + 1) + '. ' + questions[i] + '.</label>';
        content += '    <div>';
        content += '        <input class="mask" name="inputField_' + i + '" type="text" />';
        content += '    </div>'
        content += '</div>';
    }
    return content;
}

function oneTextAnswer() {
    let content = '';
    content += '<div class="form-group">';
    content += '    <div>'
    content += '        <input class="mask" name="inputField" type="text" />';
    content += '    </div>'
    content += '</div>';
    $('.quiz-container').addClass('no-min-height');
    $('#submitBtn').text('Отправить ответ');
    return content;
}

function noPatternText(json) {
    let random = getRandomInt(0, json.length);

    let content = '';
    content += '<div id="hiddenInput">';
    content += '    <input style="display: none;" type="text" name="random" value="' + random + '"/>'; //отправлем выбраную нами последовательность
    content += '    <input style="display: none;" type="text" name="timer" id="stopwatch"></input>';
    content += '</div>';

    let data = json[random];
    content += '<table class="table table-bordered" style="text-align: center;width: 1080px;margin: 0 auto;">';
    content += '    <thead id="tHead">';
    content += '       <tr>';
    for (let i = 0; i < data.length; i++) {
        content += '<th scope="col">';
        content += data[i];
        content += '</th>';
    }
    content += '       </tr>';
    content += '   </thead>';
    content += '</table>';
    $('.quiz-container').parent().css('width', 'auto');
    $('.quiz-container').addClass('no-min-height');
    $('#submitBtn').hide();
    $('#start').on('click', answerType5);
    $('#start').show();
    return content;
}

function answerType5() {
    let content = "";
    for (let i = 0; i < 10; i++) {
        content += `<th scope="row"><input style="width: 125px;" type="text" name="${i}" required/></th>`;
    }
    stopwatch()
    $('#tHead').html(content);
    $('#submitBtn').show();
    $('#start').hide();
}

function noPatternNumber(level) {
    let content = '';
    let data = numberTestData.data[level];
    let random = getRandomInt(0, data.length);
    content += '<div id="table">';
    content += '    <div id="hiddenInput">';
    content += '        <input style="display: none;" type="text" name="random" value="' + random + '"/>'; //отправлем выбраную нами последовательность
    content += '        <input style="display: none;" type="text" name="timer" id="stopwatch"></input>';
    content += '        <input style="display: none;" type="text" id="answer" name="answer"></input>';
    content += '    </div>';
    content += '    <table id="table" class="table table-bordered" style="text-align: center;width: 1080px;margin: 0 auto;">';
    content += '        <thead id="tHead">';
    content += '            <tr>';
    for (let i = 0; i < 10; i++) {
        content += '<th scope="col">';
        content += data[random][i];
        content += '</th>';
    }
    content += '            </tr>';
    content += '        </thead>';
    content += '    </table>';
    content += '</div>';

    $('#noPatternNumber').html(content);

    $('.quiz-container').parent().css('width', 'auto');
    $('.quiz-container').addClass('no-min-height');
    $('#submitBtn').hide();
    $('#start').off('click').on('click', function() {
        console.log('at6' + level);
        answerType6(level);
    });
    $('#start').text('Начать');
    $('#start').show();
}

function answerType6(level) {
    let content = "";
    for (let i = 0; i < 10; i++) {
        content += `<th scope="row"><input class="mask" style="width: 50px;" type="text" name="${i}" required/></th>`;
    }
    stopwatch()
    $('#tHead').html(content);
    $('#start').off('click').on('click', function() {
        console.log('ti' + level);
        takeInput(level);
    });
    if (level == 2) {
        $('#start').text('Отправить ответы');
    } else {
        $('#start').text('Начать следующий этап');
    }
}

let jsonData = [{
        random: 0,
        timer: "",
        answer: [],
    },
    {
        random: 0,
        timer: "",
        answer: [],
    },
    {
        random: 0,
        timer: "",
        answer: [],
    }
];

function takeInput(level) {
    let form = document.forms[0];
    let elems = form.elements;
    console.log(elems);
    jsonData[level].random = parseInt(elems[0].value);
    jsonData[level].timer = elems[1].value;
    for (let i = 3; i < 13; i++) {
        jsonData[level].answer.push(parseInt(elems[i].value));
    }
    console.log(jsonData);
    if (level != 2) {
        console.log(level);
        noPatternNumber(level + 1);
    } else {
        $('<input>').attr({
            type: 'hidden',
            name: 'ans',
            value: JSON.stringify(jsonData)
        }).appendTo('form');
        form.submit();
    }
}

function chooseN(json) {
    let content = '';
    content += '<div class="text-left">';
    for (let i = 0; i < json.data.length; i++) {
        content += `
        <div class="custom-control custom-checkbox mb-2">
            <input type="checkbox" class="custom-control-input" name="checkbox_${i}" value="${i}" id="checkbox${i}">
            <label class="custom-control-label" for="checkbox${i}">${json.data[i]}</label>
        </div>
        `;
    }
    content += '</div>';
    $('body').on('click', '[type=checkbox]', function() {
        if ($(":checked").length > json.count) this.checked = false;
    });
    return content;
}

function htmlOnline(data) {
    console.log(data)
    let content = '';
    for (let i = 0; i < data.length; i++) {
        content += '<div class="form-group">';
        content += '    <div>'
        for (let j = 0; j < data[i].question.length; j++) {
            content += "<p>" + data[i].question[j] + "</p>";
        }
        if (data[i].type == 2) {
            content += '<img src=" ' + data[i].img + '"><p></p>'
        }
        if (data[i].type != 1) {
            content += '<input style="size: 50px;" name="inputField_' + i + '" type="text" />'
        } else {
            content += radioAnswers(data[i].answer, i, -1).join("");
            /*for (let x = 0; x < data[i].answer.length; x++) { //json.questions[i]
                content += '    <div class="radio">'
                content += '        <label>'
                content += '            <input type="radio" name="optionsRadios_' + i + '" value=\'' + data[i].answer[x][0] + '\'>' + data[i].answer[x] // добавить защиту от дурака
                content += '        </label>'
                content += '    </div>'
            }*/
        }
        content += '    </div>'
        content += '</div>';

    }
    return content;
}

function slideQuestionsRememberImg(params) {
    type = params.type;
    const quizContainer = $('#quiz');
    const submitButton = $('#submitBtn');
    const startButton = $('#start');

    // display quiz right away
    buildQuiz();

    const previousButton = $('#previous');
    const nextButton = $('#next');
    const slides = $('.slide');
    let currentSlide = 0;

    submitButton.hide();
    startButton.show();
    quizContainer.parent().addClass('no-min-height');
    startButton.on('click', function() {
        startButton.hide();
        quizContainer.parent().removeClass('no-min-height');
        showSlide(0);
    })

    previousButton.hide();
    nextButton.hide();
    nextButton.on("click", showNextSlide);

    function buildQuiz() {
        const output = [];
        for (let i = 0; i < params.length; i++) {
            output.push(
                `<div class="slide" data-time="${params[i].time}">
                    <img src="../${params[i].img}" alt="тут должна быть кратинка :)">
                </div>`
            );
            for (let q = 0; q < params[i].question.length; q++) {
                let answers = radioAnswers(params[i].answer[q], i + '' + q, -1);
                output.push(
                    `<div class="slide">
                        <div class="question"> ${params[i].question[q]} </div>
                        <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );
            }
        }
        quizContainer.html(output.join(""));
    }

    function showSlide(n) {
        $(slides[currentSlide]).removeClass("active-slide");
        $(slides[n]).addClass("active-slide");
        currentSlide = n;

        if (currentSlide === slides.length - 1) {
            nextButton.hide();
            submitButton.show();
        } else {
            nextButton.show();
            submitButton.hide();
        }

        if ($(slides[n]).find('img').length > 0) {
            //nextButton.hide();
            createTimerImage($(slides[n]).data('time'), $(slides[n]).find('img'));
        } else {
            document.getElementById('timer').innerHTML = '';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function createTimerImage(time, image) {
        let timer = '';
        timer += "<h5 class='timer' data-minutes-left='" + time + "'></h5>";
        timer += "<section class='actions'></section>";
        document.getElementById('timer').innerHTML = timer;
        $('.timer').startTimer({
            onComplete: function() {
                showNextSlide();
                image.remove();
            }
        })
    }
}



function checkBox(data) {
    let content = "";
    for (let i = 0; i < data.answer.length; i++) {
        content += '<div id="q_' + i + '" style="text-align: left; display: none;" class="form-group">';
        content += questionCheckBox(data.question[i]);
        content += '</div>';
        content += '<div id="a_' + i + '" style="text-align: left; display: none;" class="form-group">';
        content += answersCheckBox(data.answer[i], i);
        content += '</div>';
    }
    $('.quiz-container').addClass('no-min-height');
    $('#submitBtn').hide();
    $('#start').show();
    $('#start').on('click', function() {
        answersType12(0, 0, data.answer.length - 1);
    });
    return content;
}

function answersType12(level, step, max) {
    if (step == 0) {
        $("#q_" + level).hide();
        $("#a_" + level).show();
        $('#start').text('Следующий этап');
        if (level == max) {
            $('#submitBtn').show();
            $('#start').hide();
        }
    } else {
        $("#q_" + (level + 1)).show();
        $("#a_" + level).hide();
        $('#start').text('Начать');
    }
    $('#start').off('click').on('click', function() {
        if (step == 0) {
            answersType12(level, 1, max);
        } else {
            answersType12(level + 1, 0, max);
        }
    });
}

function questionCheckBox(params) {
    let content = '';
    for (let x = 0; x < params.length; x++) { //json.questions[i]
        content += '    <div class="">';
        content += '        <label>';
        content += '            <p>' + (x + 1) + ') ' + params[x] + '</p>';
        content += '        </label>';
        content += '    </div>';
    }
    return content;
}

function answersCheckBox(params, question) {
    let content = '';
    for (let x = 0; x < params.length; x++) { //json.questions[i]
        content += `
        <div class="custom-control custom-checkbox mb-2">
            <input style="display: none" type="checkbox" id="checkbox_${question}_${x}" name="checkbox_${question}_${x}" value="0" checked>   
            <input onclick="check(this.name, this.checked)" type="checkbox" class="custom-control-input" name="checkbox_${question}_${x}" value="1" id="checkbox_${question}_${x}_1">
            <label class="custom-control-label" for="checkbox_${question}_${x}_1">${params[x]}</label>
        </div>
        `;
    }
    return content;
}

function check(name, checked) {
    console.log(name)
    console.log(checked)
    document.getElementById(name).checked = !checked;
}

function imageAnswers(page, lvl) {
    $(".row").empty()
    let imgCount = 0;
    if (lvl == 1) {
        imgCount = 2
    } else if (lvl == 2) {
        imgCount = 3
    } else {
        imgCount = 4
    }
    if (page == 2) {
        for (let i = 1; i <= imgCount; i++) {
            $('<img>').attr({
                id: 'img',
                src: "/images/lvl_" + lvl + "/page_" + page + "/" + i + ".PNG",
                style: "width: 700px; height: 430px; margin-left: auto; margin-right: auto;cursor: pointer;",
                onClick: "nextLevel(" + lvl + ", " + i + ")"
            }).appendTo('.row');
        }
    } else {
        for (let i = 1; i <= imgCount; i++) {
            $('<img>').attr({
                id: 'img',
                src: "/images/lvl_" + lvl + "/page_" + page + "/" + i + ".PNG",
                style: "width: 700px; height: 430px; margin-left: auto; margin-right: auto;"
            }).appendTo('.row');
        }
    }
    if (page == 1) {
        $('#submitBtn').hide();
        $('#start').show();
        $('#start').off('click').on('click', function() {
            nextPage(lvl);
        })
    } else {
        $('#start').hide();
    }
}

function nextPage(lvl) {
    imageAnswers(2, lvl);
}

function nextLevel(lvl, number) {
    $('#quiz').append(`<input style="display: none;" type="text" name="ans[${lvl}]" value="${number}"/>`);
    if (lvl == 3) {
        let form = document.forms[0];
        form.submit();
    } else {
        imageAnswers(1, lvl + 1);
    }
}

/*
let count = 0;

function printTest(params, id) {
    //let js = JSON.stringify(result[0].data);
    console.log(params)
    let temp = params.replace(/&quot;/g, '"');

    let json = JSON.parse(temp.substring(1, temp.length - 1))
    globalData = json;
    console.log(json)
    if (json.time !== undefined && json.time > 0) {
        creatTimer(json.time)
    } else {
        console.log("Таймера нет")
    }
    if (json.html !== undefined) {
        console.log(json.html)
        let temp = json.html.replace(/&lt;/g, '<');
        temp = temp.replace(/&gt;/g, '>');
        console.log(temp)
        document.getElementById('comment').innerHTML = temp;
    } else {
        console.log('Коментария нет')
    }
    //Определить ответ по умолчанию через условие (чтобы не выйти за рамки)
    console.log(json)
    let content = '';
    switch (json.type) {
        case 0: //Разные ответы на все тесты
            content += allForAll(json.data, json.answerDefault)
            break;
        case 1:
            content += oneForAll(json.questions, json.answers, json.answerDefault) // 0 - answerDefault или dif или значение по умолчанию.
            break;
        case 2:
            content += justAnswers(json.data, json.answerDefault)
            break;
        case 3:
            content += textAnswers(json.questions, json.mask, json.pattern)
            break;
        case 4:
            content += oneTextAnswer()
            break;
        case 5:
            content += noPatternText(json.data)
            break;
        case 6:
            content += '<div id="noPattern"></div>'
            break;
        case 7:
            content += '<div class="row" id="ImagePatter"></div>'
            break;
        case 8:
            content += imgForAll(json.data, json.answerDefault)
            break;
        case 9:
            content += chooseN()
            break;
        case 10:
            content += htmlOnline(json.data)
            break;
        case 11:
            content += custom(json.data)
            break;
        case 12:
            content += checkBox(json)
            break;
        default:
            break;
    }
    if (json.type != 5 && json.type != 6 && json.type != 7 && json.type != 12) {
        content += '<div class="box-footer" style="text-align: center;">';
        content += '    <input  type="submit" class="btn btn-primary" value="Отправить ответы"></input>';
        content += '</div>';
    }
    if (json.type == 12) {
        content += '<div id="btn" class="box-footer" style="text-align: center;">';
        content += '    <input onclick="testController(0)"  type="button" class="btn btn-primary" value="Начать"></input>';
        content += '</div>';
    }
    content += '<div class="box-footer">';
    content += '    <input style="display:none" name="id" type="text" value="' + id + '"></input>';
    content += '</div>';
    document.getElementById('questions').innerHTML = content;

    if (json.type == 12) {
        $("#q_1").show();
    }
    //if(json.type == 3) $('.mask').mask(json.mask, {'translation': {0: {pattern: /d/}}});
    document.getElementById('testName').innerHTML = '<h1>' + json.name + '</h1>';
    if (json.type == 6) noPatternNumber(0);
    if (json.type == 7) Image(1, 1, 1);
}*/

/*function oneForAll(questions, ans, def) { //Когда одинаковые ответы для всех вопросов.
    let content = '';
    for (let i = 0; i < questions.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>' + (i + 1) + '. ' + questions[i] + '</label>';
        content += radioAnswers(ans, i, def).join("");
        content += '</div>';
    }
    return content;
}

function allForAll(data, def) { //Когда разные ответы для всех вопросов.
    let content = '';
    for (let i = 0; i < data.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>' + (i + 1) + '. ' + data[i].question + '</label>';
        content += radioAnswers(data[i].answers, i, def).join("");
        content += '</div>';
    }
    return content;
}

function imgForAll(data, def) { //Когда разные ответы для всех вопросов в картинках.
    let content = '';
    for (let i = 0; i < data.length; i++) {
        content += '<div class="form-group">';
        content += '    <img src="../' + data[i].img + '" alt="тут должна быть кратинка:)">'; //<img src="URL" alt="альтернативный текст">
        content += radioAnswers(data[i].answers, i, def).join("");
        content += '</div>';
    }
    return content;
}

function custom(data) {
    let content = "";
    for (let i = 0; i < data.length; i++) {
        content += '<div style="text-align: center;" class="form-group">';
        content += '    <p> Внимательно посмотрите на картинку</p>';
        content += '    <img  src="' + data[i].img + '".</label>';
        content += CreatQuestionsAndAnswers(data[i].question, data[i].answer, 0, i);
        content += '</div>';
    }
    return content;
}

function CreatQuestionsAndAnswers(question, answer, def, forRadio) {
    let content = "";
    console.log(question.length)
    for (let i = 0; i < question.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>' + question[i] + '.</label>';
        def = def < 0 || def >= question.length ? 0 : def;
        for (let x = 0; x < answer[i].length; x++) {
            let checked = x == def ? 'checked' : '';
            content += '    <div class="radio">'
            content += '        <label>'
            content += '            <input type="radio" name="optionsRadios_' + forRadio + '_' + i + '" value=\'' + answer[i][x][0] + '\' ' + checked + ' >' + answer[i][x] // добавить защиту от дурака
            content += '        </label>'
            content += '    </div>'
        }
        content += '</div>';
    }
    return content;
}

function testController() {
    switch (count) {
        case 0:
            $("#q_1").hide();
            $("#a_1").show();
            count++;
            document.getElementById("btn").innerHTML = '<input onclick="testController(' + count + ')"  type="button" class="btn btn-primary" value="Следующий этап"></input>';
            break;
        case 1:
            $("#q_2").show();
            $("#a_1").hide();
            count++;
            document.getElementById("btn").innerHTML = '<input onclick="testController(' + count + ')"  type="button" class="btn btn-primary" value="Начать"></input>';
            break;
        case 2:
            $("#q_2").hide();
            $("#a_2").show();
            count++;
            document.getElementById("btn").innerHTML = '<input onclick="testController(' + count + ')"  type="button" class="btn btn-primary" value="Следующий этап"></input>';
            break;

        case 3:
            $("#q_3").show();
            $("#a_2").hide();
            count++;
            document.getElementById("btn").innerHTML = '<input onclick="testController(' + count + ')"  type="button" class="btn btn-primary" value="Начать"></input>';
            break;
        case 4:
            $("#q_3").hide();
            $("#a_3").show();
            count++;
            document.getElementById("btn").innerHTML = '<input onclick="testController(' + count + ')"  type="button" class="btn btn-primary" value="Следующий этап"></input>';
            break;
        case 5:
            $("#q_4").show();
            $("#a_3").hide();
            count++;
            document.getElementById("btn").innerHTML = '<input onclick="testController(' + count + ')"  type="button" class="btn btn-primary" value="Начать"></input>';
            break;
        case 6:
            $("#q_4").hide();
            $("#a_4").show();
            count++;
            document.getElementById("btn").innerHTML = '<input  type="submit" class="btn btn-primary" value="Отправить ответы"></input>';
            break;
        default:
            break;
    }
}
*/