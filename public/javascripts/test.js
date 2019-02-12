let qJSON = "";
function printTest(params, id) {
    //let js = JSON.stringify(result[0].data);
    console.log(params)
    let temp = params.replace(/&quot;/g, '"');

    let json = JSON.parse(temp.substring(1, temp.length - 1))
    //let json = JSON.parse(params);
    //let json = {
    //    "name": "НазваниеТеста",
    //    "time": .1,
    //    "html": "Коментарий есть",
    //    "answers": [
    //        "да",
    //        "нет"
    //    ],
    //    "answerDefault": 0,
    //    "questions": [
    //        {
    //            "question": "Впорос 1",
    //            "answer": [
    //                "Ответ1",
    //                "Ответ2",
    //                "Ответ3"
    //            ]
    //        },
    //        {
    //            "question": "Впорос 2",
    //            "answer": [
    //                "Ответ1",
    //                "Ответ2",
    //                "Ответ3"
    //            ]
    //        },
    //        {
    //            "question": "Впорос 3",
    //            "answer": [
    //                "Ответ1",
    //                "Ответ2",
    //                "Ответ3"
    //            ]
    //        },
    //        {
    //            "question": "Впорос 4",
    //            "answer": [
    //                "Ответ1",
    //                "Ответ2",
    //                "Ответ3"
    //            ]
    //        }
    //    ],
    //    "write": false,
    //    "characters": "Abs"
    //};

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
    let content = '';
    
    for (let i = 0; i < json.questions.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>' + (i + 1) + '. ' + json.questions[i].question + '</label>';
        if(json.answerDefault){
        
        }
        let ans = json.answers === undefined ? json.questions[i].answer : json.answers;
        let def = json.answerDefault !== undefined ? (json.answerDefault < 0 ? 0: json.answerDefault >= ans.length ? (ans.length - 1) : json.answerDefault): 0;
        content += oneAnswer(ans, i, def);
        content += '</div>';
    }

    content += '<div class="box-footer">';
    content += '    <input type="submit" class="btn btn-primary" value="Отправить ответы"></input>';
    content += '</div>';

    content += '<div class="box-footer">';
    content += '    <input style="display:none" name="id" type="text" value="' + id + '"></input>';
    content += '</div>';

    document.getElementById('questions').innerHTML = content;
    document.getElementById('testName').innerHTML = '<h1>' + json.name + '</h1>';

    /* 
    let temp = params.replace(/&quot;/g, '"');

    let json = JSON.parse(temp.substring(1, temp.length - 1))

    console.log(json); // this will show the info it in firebug console
    
    qJSON = json;
    let content = '';
    for (let i = 0; i < qJSON.questions.length; i++) {
        content += '<div class="form-group">';
        content += '    <label>' + (i + 1) + '. ' + qJSON.questions[i].question + '</label>';
        for (let x = 0; x < qJSON.questions[i].answers.length; x++) {
            content += '    <div class="radio">'
            content += '        <label>'
            content += '            <input type="radio" name="optionsRadios_' + i + '" value="' + qJSON.questions[i].answers[x] + '" >' + qJSON.questions[i].answers[x] // добавить защиту от дурака
            content += '        </label>'
            content += '    </div>'
        }
        content += '</div>';
    };
    //content += '<input type="text" id="answerInput" name="quantity" value="'+qJSON.questions.length+'">';
    content += '<div class="box-footer">';
    content += '    <input type="submit" class="btn btn-primary" value="Отправить ответы"></input>';
    content += '</div>';

    content += '<div class="box-footer">';
    content += '    <input style="display:none" name="id" type="text" value="' + id + '"></input>';
    content += '</div>';

    content += '<div class="box-footer">';
    content += '    <input style="display:none" name="size" type="text" value="' + qJSON.questions.length + '"></input>';
    content += '</div>';

    document.getElementById('timer').innerHTML = timer;
    document.getElementById('testName').innerHTML = '<h1>' + qJSON.testName + '</h1>';
    document.getElementById('questions').innerHTML = content;
    let form = document.getElementById('questions');
    $('.timer').startTimer({
        onComplete: function () {
            form.submit();
        }
    })

*/
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
function oneAnswer(parms, i, def) {
    let content = '';
    console.log(def)
    for (let x = 0; x < parms.length; x++) { //json.questions[i]
        let checked = x == def ? 'checked': '';
        content += '    <div class="radio">'
        content += '        <label>'
        content += '            <input type="radio" name="optionsRadios_' + i + '" value="' + parms[x] +'" '+ checked +' >' + parms[x] // добавить защиту от дурака
        content += '        </label>'
        content += '    </div>'
    }
    return content;
}



