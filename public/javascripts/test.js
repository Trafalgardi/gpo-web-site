let globalData = 0;
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
        content += htmlAnswers()
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
        content += castom(json.data)
            break;

        default:
            break;
    }
    
    if(json.type != 5 && json.type != 6 && json.type != 7){
        content += '<div class="box-footer" style="text-align: center;">';
        content += '    <input  type="submit" class="btn btn-primary" value="Отправить ответы"></input>';
        content += '</div>';
    }
   

    content += '<div class="box-footer">';
    content += '    <input style="display:none" name="id" type="text" value="' + id + '"></input>';
    content += '</div>';

    document.getElementById('questions').innerHTML = content;

    //if(json.type == 3) $('.mask').mask(json.mask, {'translation': {0: {pattern: /d/}}});
    document.getElementById('testName').innerHTML = '<h1>' + json.name + '</h1>';
    if(json.type == 6) noPatternNumber(0);
    if(json.type == 7) Image(1, 1, 1);
}

function creatTimer(time) {

    let timer = '';
    timer += "<h5 class='timer' data-minutes-left='" + time + "'></h5>";
    timer += "<section class='actions'></section>";
    document.getElementById('timer').innerHTML = timer;
    let form = document.getElementById('questions');
    $('.timer').startTimer({
        onComplete: function () {
            console.log(form)
            form.submit();
        }
    })

}


function oneForAll(questions, ans, def){ //Когда одинаковые ответы для всех вопросов.
    let content = '';
    for (let i = 0; i < questions.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>' + (i + 1) + '. ' + questions[i] + '</label>';
        content += Answers(ans, i, def);
        content += '</div>';
        
    }
    return content;
}

function allForAll(data, def){ //Когда разные ответы для всех вопросов.
    let content = '';
    for (let i = 0; i < data.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>' + (i + 1) + '. ' + data[i].question + '</label>';
        content += Answers(data[i].answers, i, def);
        content += '</div>';
        
    }
    return content;
}
function imgForAll(data, def){ //Когда разные ответы для всех вопросов в картинках.
    let content = '';
    for (let i = 0; i < data.length; i++) {
        content += '<div class="form-group">';
        content += '    <img src="../' + data[i].img + '" alt="тут должна быть кратинка:)">';//<img src="URL" alt="альтернативный текст">
        content += Answers(data[i].answers, i, def);
        content += '</div>';
        
    }
    return content;
}
function chooseN() {
    
    let content = '';
    content += '<div class="row" style="width: 1080px; margin-left: auto; margin-right: auto;">';
    for (let i = 0; i < 5; i++) {
        content += '<div class="form-group" style="margin: 0 10px; ">';
        content += '    <label>Впишите вариант</label>';
        content += '    <div>'
        content += '        <input style="size: 50px; " name="inputFild_' + i + '" type="number" />';
        content += '    </div>'
        content += '</div>';
        
    }
    content += '</div>';
    console.log(content)
    return content;
}
function justAnswers(data, def) {
    let content = '';
    for (let i = 0; i < data.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>' + (i + 1) + '.</label>';
        content += Answers(data[i].answers, i, def);
        content += '</div>';
        
    }
    return content;
}

function textAnswers(questions, def) {
    let content = '';
    for (let i = 0; i < questions.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>' + (i + 1) +'. ' + questions[i] + '.</label>';
        //content += Answers(data[i].answers, i, def);
        content += '    <div>'
        content += '        <input class="mask" name="inputFild_' + i + '" type="text" />';
        content += '    </div>'
        content += '</div>';
        
    }

    return content;
}

function htmlAnswers() {
    let content = '';
    
    content += '<div class="form-group">';
    content += '    <div>'
    content += '        <input class="mask" name="inputFild" type="text" />';
    content += '    </div>'
    content += '</div>';
        
    return content;
}
function htmlOnline(data) {
    console.log(data)
    let content = '';
    for (let index = 0; index < data.length; index++) {
        
        content += '<div class="form-group">';
        content += '    <div>'
        for (let i = 0; i < data[index].question.length; i++) {
            
            content += "<p>"+data[index].question[i]+"</p>";
            if(data[index].type == 2){
                content += '<img src=" ' + data[index].img +'">'
            }
        }
        if(data[index].type != 1) {
            content += '<p></p><input style="size: 50px;" name="inputFild_' + index + '" type="text" />'
        } else {
            for (let x = 0; x < data[index].answer.length; x++) { //json.questions[i]
                content += '    <div class="radio">'
                content += '        <label>'
                content += '            <input type="radio" name="optionsRadios_' + index + '" value=\'' + data[index].answer[x][0] + '\'>' + data[index].answer[x] // добавить защиту от дурака
                content += '        </label>'
                content += '    </div>'
            }
        }
        content += '    </div>'
        content += '</div>';

    }
    
        
    return content;
}
function castom(data) {
    let content = "";
    for (let i = 0; i < data.length; i++) {
        
        content += '<div style="text-align: center;" class="form-group">';
        content += '    <p> Внимательно посмотрите на картинку</p>';
        content += '    <img  src="' + data[i].img + '".</label>';
        content +=  CreatQuestionsAndAnswers(data[i].question, data[i].answer, 0, i);
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
        def = def < 0 || def >= question.length ? 0  : def;
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
function Answers(parms, i, def) { //Мы передаём сюда массив ответов для вопроса, i номер вопроса, def - выбор значения по умолчанию
    let content = '';
    console.log(def)
    def = def < 0 || def >= parms.length ? 0  : def;
    for (let x = 0; x < parms.length; x++) { //json.questions[i]
        let checked = x == def ? 'checked' : '';
        content += '    <div class="radio">'
        content += '        <label>'
        content += '            <input type="radio" name="optionsRadios_' + i + '" value=\'' + parms[x] + '\' ' + checked + ' >' + parms[x] // добавить защиту от дурака
        content += '        </label>'
        content += '    </div>'
    }
    return content;
}

function noPatternText(json) {
    
    let random = getRandomInt(0, 10);

    let content = '';
    content += '<div id="hiddenInput">';
    content += '<input style="display: none;" type="text" name="random" value="'+ random +'"/>'//отправлем выбраную нами последовательность
    content += '<input style="display: none;" type="text" name="timer" id="stopwatch"></input>';

    content += '</div>';
    let data = json[random];
    content += '<table class="table table-bordered" style="text-align: center;width: 1080px;margin: 0 auto;">'
    content += '    <thead id="tHead">'
    
    content += '       <tr>'
    for (let index = 0; index < data.length; index++) {
        content += '<th scope="col">'
        content +=  data[index];
        content += '</th>'
    }
    content += '   </thead>'
    
    content += '</table>'
    
    content += '<div style="text-align: center;" id="btn" class="box-footer">';
    content += '    <input onclick="AnswerTypeFive()" type="button" class="btn btn-primary" value="Начать"></input>';
    content += '</div>';
        
    return content;
}

function noPatternNumber(int) {
    let content = '';
    let random = getRandomInt(0, 10);
    let data = globalData.data[int];
    content += '<div id="table">'
    
    content += '<div id="hiddenInput">';
    content += '<input style="display: none;" type="text" name="random" value="'+ random +'"/>'//отправлем выбраную нами последовательность
    content += '<input style="display: none;" type="text" name="timer" id="stopwatch"></input>';
    content += '<input style="display: none;" type="text" id="answer" name="answer"></input>';
    content += '</div>';
    
    content += '<table id="table" class="table table-bordered" style="text-align: center;width: 1080px;margin: 0 auto;">'
    content += '    <thead id="tHead">'
    
    content += '       <tr>'

    for (let index = 0; index < 10; index++) {
        content += '<th scope="col">'
        content +=  data[random][index];
        content += '</th>'
    }
    content += '   </thead>'
    
    content += '</table>'
    
    content += '<div style="text-align: center;" id="btn" class="box-footer">';
    content += '    <input onclick="AnswerTypeSix('+int+')" type="button" class="btn btn-primary" value="Начать"></input>';
    content += '</div>';
    
    
    content += '</div>'

    document.getElementById('noPattern').innerHTML = content;
}

function AnswerTypeSix(int) {
    let content = "";

    content += '<th scope="row"><input style="width: 50px;" type="text" name="0" required/></th>'
    content += '<th scope="row"><input style="width: 50px;" type="text" name="1" required/></th>'
    content += '<th scope="row"><input style="width: 50px;" type="text" name="2" required/></th>'
    content += '<th scope="row"><input style="width: 50px;" type="text" name="3" required/></th>'
    content += '<th scope="row"><input style="width: 50px;" type="text" name="4" required/></th>'
    content += '<th scope="row"><input style="width: 50px;" type="text" name="5" required/></th>'
    content += '<th scope="row"><input style="width: 50px;" type="text" name="6" required/></th>'
    content += '<th scope="row"><input style="width: 50px;" type="text" name="7" required/></th>'
    content += '<th scope="row"><input style="width: 50px;" type="text" name="8" required/></th>'
    content += '<th scope="row"><input style="width: 50px;" type="text" name="9" required/></th>'
    
    Example1()
    document.getElementById("tHead").innerHTML = content;
    if(int == 2){
        document.getElementById("btn").innerHTML = '<input onclick="TakeInput('+int+')" type="button" class="btn btn-primary" value="Отправить ответы"></input>';
    }else{
        document.getElementById("btn").innerHTML = '<input onclick="TakeInput('+int+')" type="button" class="btn btn-primary" value="Начать следующий этап"></input>';
    }
}
function noPatternNumber1() {
    noPatternNumber(1)
}
let jsonData = 
    [
        {
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
    ]

function TakeInput(int) {
    
    let form = document.forms[0];
    let elems = form.elements;
    console.log(elems) 
    jsonData[int].random = parseInt(elems[0].value)
    jsonData[int].timer = elems[1].value
    for (let index = 3; index < 13; index++) {
        jsonData[int].answer.push(parseInt(elems[index].value))

    }
    console.log(jsonData)
    if(int != 2) {
        console.log(int)
        noPatternNumber(int + 1)
    }else {
        $('<input>').attr({
            type: 'hidden',
            name: 'ans',
            value: JSON.stringify(jsonData)
        }).appendTo('form');
        form.submit()
    }
    
    
}

function AnswerTypeFive() {
    let content = "";

    content += '<th scope="row"><input style="width: 125px;" type="text" name="0" required/></th>'
    content += '<th scope="row"><input style="width: 125px;" type="text" name="1" required/></th>'
    content += '<th scope="row"><input style="width: 125px;" type="text" name="2" required/></th>'
    content += '<th scope="row"><input style="width: 125px;" type="text" name="3" required/></th>'
    content += '<th scope="row"><input style="width: 125px;" type="text" name="4" required/></th>'
    content += '<th scope="row"><input style="width: 125px;" type="text" name="5" required/></th>'
    content += '<th scope="row"><input style="width: 125px;" type="text" name="6" required/></th>'
    content += '<th scope="row"><input style="width: 125px;" type="text" name="7" required/></th>'
    content += '<th scope="row"><input style="width: 125px;" type="text" name="8" required/></th>'
    content += '<th scope="row"><input style="width: 125px;" type="text" name="9" required/></th>'
    
    Example1()
    document.getElementById("tHead").innerHTML = content;
    document.getElementById("btn").innerHTML = '<input type="submit" class="btn btn-primary" value="Отправить ответы"></input>';
    
}

function Image(page, stage, lvl) {
    $(".row").empty()
    
    let imgCount = 0;
    if(lvl == 1){
        imgCount = 2
    }else if(lvl == 2){
        imgCount = 3
    }else {
        imgCount = 4
    }
    if(page==2){
        for (let i = 1; i <= imgCount; i++) {
            $('<img>').attr({
                id: 'img',
                src: "/img/lvl_"+lvl+"/page_"+page+"/"+i+".png",
                style: "width: 700px; height: 430px; margin-left: auto; margin-right: auto;",
                onClick: "nextStage("+stage+", "+lvl+", "+i+")"
            }).appendTo('.row');    
        }
    }else {
        for (let i = 1; i <= imgCount; i++) {
            $('<img>').attr({
                id: 'img',
                src: "/img/lvl_"+lvl+"/page_"+page+"/"+i+".png",
                style: "width: 700px; height: 430px; margin-left: auto; margin-right: auto;"
            }).appendTo('.row');    
        }
    }
    
    $('<div>').attr({
        id: 'divBtn',
        style: 'text-align: center;'
    }).appendTo('#questions');  
    if(page == 1){
        $('<input>').attr({
            id: 'btn',
            type: 'button', 
            class: "btn btn-primary",
            value: "Начать",
            onClick: "nextPage("+lvl+")"
        }).appendTo('#divBtn'); 
    }else {
        $("questions").empty()
    }
    
 
}
function nextPage(lvl) {
    Image(2, 2, lvl)
}
function nextStage(stage, number) {
    alert(stage, number)
}
function CreatQuestionImg(number) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        
    }
}

function Example1() {
    var $stopwatch, // Stopwatch element on the page
        incrementTime = 70, // Timer speed in milliseconds
        currentTime = 0, // Current time in hundredths of a second
        updateTimer = function() {
            $stopwatch.val(formatTime(currentTime));
            currentTime += incrementTime / 10;
        },
        init = function() {
            $stopwatch = $('#stopwatch');
            Example1.Timer = $.timer(updateTimer, incrementTime, true);
        };
    $(init);
};
// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
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
