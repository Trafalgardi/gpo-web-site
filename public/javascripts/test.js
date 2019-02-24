




function printTest(params, id) {
    //let js = JSON.stringify(result[0].data);
    console.log(params)
    let temp = params.replace(/&quot;/g, '"');

    let json = JSON.parse(temp.substring(1, temp.length - 1))

    console.log(json)
    if (json.time !== undefined && json.time > 0) {
        creatTimer(json.time)
    } else {
        console.log("Таймера нет")
    }
    if (json.html !== undefined) {
        document.getElementById('comment').innerHTML = json.html;
    } else {
        console.log('Коментария нет')
    }
    //Определить ответ по умолчанию через условие (чтобы не выйти за рамки)
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
        default:
            break;
    }
    
    content += '<div class="box-footer">';
    content += '    <input type="submit" class="btn btn-primary" value="Отправить ответы"></input>';
    content += '</div>';

    content += '<div class="box-footer">';
    content += '    <input style="display:none" name="id" type="text" value="' + id + '"></input>';
    content += '</div>';

    document.getElementById('questions').innerHTML = content;

    //if(json.type == 3) $('.mask').mask(json.mask, {'translation': {0: {pattern: /d/}}});
    document.getElementById('testName').innerHTML = '<h1>' + json.name + '</h1>';

}
window.addEventListener("load", function () {
    //let button = document.querySelector("button");
    //button.addEventListener("click", function() {
    //    for (let index = 0; index < qJSON.questions.length; index++) {
    //        console.log(window.getElementByName("optionsRadios_"+index).value)
    //        
    //    }
    //    console.log("Кнопка нажата.");
    //});
});

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



