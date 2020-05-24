const quiz = document.getElementById("quiz")

//#region const categories 
const categories_timer = "categories_timer";
const categories_name = "categories_name";
const categories_content = "categories_content";
//#endregion

//#region const question
const question_timer_to_remember = "question_timer_to_remember";
const question_timer = "question_timer";
const question_text = "question_text";
const question_img_container = "question_img_container";
const question_description = "question_description";
const question_content = "question_content";
//#endregion

//#region const buttons
const quiz_btn_container = document.getElementById("quiz-btn-container")
const btn_skip_remember_time = "btn_skip_remember_time"
//#endregion

quiz_btn_container.innerHTML = `
<button type="button" id="previous">Предыдущий вопрос</button>
<button type="button" id="next">Следующий вопрос</button>
<button type="submit" id="submitBtn">Отправить ответы</button>
<button type="button" style="display:none" id="start">Начать</button>`;

function mainFunc(json, id) {
    quiz_btn_container.innerHTML = "";
    quiz.innerHTML = "";

    setName(json.name, "testName")

    //Таймер на тест
    createTimer(json.time, "timer");

    //Туторила
    setTutorial(json.tutorial)

    //Создание категорий
    createCategories(json.categories[0])

}

function setName(name, elementId = "testName") {
    var element = document.getElementById(elementId);
    element.innerHTML = name;
}

function setTutorial(tutorial) {
    if (tutorial == null || tutorial === undefined || tutorial.type == -1 || tutorial.data == "") {
        console.log("Туторила нету")
        return false
    }
    return true
}
//#region Создание вопроса
function createQuestion(questions, id = 0) {
    let currentQuestion = questions[id];
    let time_to_remember = currentQuestion.time_to_remember;

    let img = ""
    currentQuestion.images.forEach(element => {
        img += `<img src="/images/${element}">`;
    });
    let content = `
    <div id="${question_timer_to_remember}"></div>
    <div id="${question_timer}"></div>
    <div id="${question_text}">${currentQuestion.text}</div>
    <div id="${question_img_container}">${img}</div>
    <div id="${question_description}">${currentQuestion.description}</div>
    <div id="${question_content}"></div>`;
    insertHtml(quiz, content)
    if (currentQuestion.can_skip_remember_time && currentQuestion.time_to_remember > 0) {
        quiz_btn_container.innerHTML = `<button type="button" id="${btn_skip_remember_time}">Продолжить</button>`
        let btn = document.getElementById(btn_skip_remember_time).onclick = cancelTimerToRemember;
    }
    createTimer(time_to_remember, question_timer_to_remember, () => timeToRemember(questions, id), () => createAnswers(questions, id))
}

function cancelTimerToRemember() {
    $(`#timer_${question_timer_to_remember}`).trigger('complete');
    document.getElementById(question_timer_to_remember).innerHTML = ""
    quiz_btn_container.removeChild(document.getElementById(btn_skip_remember_time))
}

function createAnswers(questions, id) {
    let currentQuestion = questions[id];
    let answers = currentQuestion.answers
    switch (answers.type) {
        case 0:
            answers_0(questions, id)
            break;

        default:
            break;
    }

}
//#region Answers template
function answers_0(questions, id) {
    let data = questions[id].answers.data
    let content = '';
    for (let i = 0; i < data.length; i++) { //json.questions[i]
        content += `
        <div class="radio">
            <label>
                <input id="answer_${data[i]}" type="radio" name="answer" value="${data[i]}">
                ${data[i]}
            </label>
        </div>`
    }
    quiz_btn_container.innerHTML = `<button type="button" id="btn_next">Продолжить</button>`
    let btn = document.getElementById("btn_next").onclick = function () {
        var answer = document.getElementsByName("answer")
        let isCheked = false;
        for (let i = 0; i < answer.length; i++) {
            const element = answer[i];
            if(element.checked == true) {
                isCheked = true;
                break
            }
        }
        if(isCheked==false){
            alert("Выберите ответ")
            return
        }
        addDataForm(id, element.value)
    };
    //btn.className = test ? "valid" : "invalid";
    document.getElementById(question_content).innerHTML = content;
}
function addDataForm(name, value) {
    let element_name = document.getElementById(`form_answers_${name}`)
    
    if(element_name){
        element_name.value = value
        return
    }
    let content = `<input type="text" id="form_answers_${name}" name="form_answers_${name}" value="${value}">`
    var form = document.getElementById("form")
    insertHtml(form, content)
}
//#endregion

function createImg(container_id, path) {
    let content = `<img src="${path}">`;
    insertHtml(document.getElementById(container_id), content)
}

function timeToRemember(questions, id) {
    document.getElementById(question_img_container).innerHTML = ""
    document.getElementById(question_description).innerHTML = ""
    createAnswers(questions, id)
}
//#endregion
//#region Создание категорий

function createCategories(categories) {
    console.log(categories)
    let content = "";
    content += `
    <div id="${categories_timer}"></div>
    <div id="${categories_name}">${categories.name}</div>
    <div id="${categories_content}"></div>`;
    insertHtml(quiz, content)
    createTimer(categories.time, categories_timer, () => categoriesTimer())
    let isTutorial = setTutorial(categories.tutorial)
    if (isTutorial) {
        return
    }
    createQuestion(categories.questions, 0)

}
//#endregion
//#region Timer
function createTimer(time, elementId = "timer", callback = () => document.forms[0].submit(), callback_faild = () => console.log("Таймера нет")) {
    if (!(time !== undefined && time > 0)) {
        callback_faild()
        return
    }
    //gryz
    let min = time / 60;
    let timer = '';
    timer += `<h5 id="timer_${elementId}" class='timer' data-minutes-left='${min}'></h5>`;
    timer += "<section class='actions'></section>";
    document.getElementById(elementId).innerHTML = timer;

    $(`#timer_${elementId}`).startTimer({
        onComplete: callback
    })
}

function categoriesTimer() {
    console.log("Таймер категории")
}

//#endregion
/**
 * @position {string} beforebegin | afterbegin | beforeend | afterend
 *  <!-- beforebegin -->
 *  \<p>
 *  <!-- afterbegin -->
 *  foo
 *  <!-- beforeend -->
 *  \</p>
 *  <!-- afterend -->
 */
function insertHtml(element, content, position = 'beforeend') {
    element.insertAdjacentHTML(position, content)
}