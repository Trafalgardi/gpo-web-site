const quiz = document.getElementById("quiz")

const question_timer_to_remember = "question_timer_to_remember";
const question_timer = "question_timer";
const question_text = "question_text";
const question_img_container = "question_img_container";
const question_description = "question_description";
const question_content = "question_content";

function mainFunc(json, id) {
    quiz_btn_container.innerHTML = "";
    setName(json.name, "testName")
    let content = "";
    quiz.innerHTML = content;
    //Таймер на тест
    createTimer(json.time, "timer");

    //Туторила
    setTutorial(json.tutorial)

    //Создание категорий
    createCategories(json.categories[0])


    //Запись данных в html
    
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
    createTimer(time_to_remember, question_timer_to_remember, () => timeToRemember(questions, id), () => createAnswers(questions, id))
}
function createAnswers(questions, id) {
    let currentQuestion = questions[id];
    console.log("dsadsadss");
    
}
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
    <div id="categories_timer"></div>
    <div id="categories_name">${categories.name}</div>
    <div id="categories_content"></div>`;
    insertHtml(quiz, content)
    createTimer(categories.time, "categories_timer", () => categoriesTimer())
    let isTutorial = setTutorial(categories.tutorial)
    if(isTutorial){
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

function stopwatch() {
    var $stopwatch, // Stopwatch element on the page
        incrementTime = 70, // Timer speed in milliseconds
        currentTime = 0, // Current time in hundredths of a second
        updateTimer = function () {
            $stopwatch.val(formatTime(currentTime));
            currentTime += incrementTime / 10;
        },
        init = function () {
            $stopwatch = $('#stopwatch');
            stopwatch.Timer = $.timer(updateTimer, incrementTime, true);
        };
    $(init);
}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
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
