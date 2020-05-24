const quiz = "quiz";
const quiz_btn_container = "quiz-btn-container";

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
const btn_skip_remember_time = "btn_skip_remember_time"
//#endregion

// quiz_btn_container.innerHTML = `
// <button type="button" id="previous">Предыдущий вопрос</button>
// <button type="button" id="next">Следующий вопрос</button>
// <button type="submit" id="submitBtn">Отправить ответы</button>
// <button type="button" style="display:none" id="start">Начать</button>`;

const current_data = {
    data: {},
    question_id: 0,
    category_id: 0,
    get current_category() {
        return this.data.categories[this.category_id];
    },
    get current_question() {
        return this.current_category.questions[question_id];
    },
    get test_name() {
        return this.data.name;
    },
    get test_time() {
        return this.data.time;
    },
    get test_tutorial() {
        return this.data.tutorial;
    }
};

function mainFunc(json, id) {
    setInnerHTML(quiz_btn_container, "")
    setInnerHTML(quiz, "");

    current_data.data = json;
    current_data.question_id = 0;
    current_data.category_id = 0;
    console.log(current_data);

    setInnerHTML("testName", current_data.test_name)

    //Таймер на тест
    createTimer(current_data.test_time, "timer", submitTest);

    //Туторила
    setTutorial(current_data.test_tutorial)

    //Создание категорий
    createCategory()

}

function setTutorial(tutorial) {
    if (tutorial == null || tutorial === undefined || tutorial.type == -1 || tutorial.data == "") {
        console.log("Туторила нету")
        return false
    }
    return true
}
//#region Создание категорий
function createCategory() {
    setInnerHTML(quiz, "");

    let category = current_data.current_category;
    let content = "";
    content += `
        <div id="${categories_timer}"></div>
        <div id="${categories_name}">${category.name}</div>
        <div id="${categories_content}"></div>
    `;
    insertHtml(quiz, content)
    createTimer(category.time, categories_timer, () => categoriesTimer())
    let isTutorial = setTutorial(category.tutorial)
    if (isTutorial) {
        return
    }
    createQuestion(category.questions, 0)

}

function categoriesTimer() {
    console.log("Таймер категории")
}
//#endregion

//#region Создание вопроса
function createQuestion(questions, id = 0) {
    setInnerHTML(categories_content, "")
    setInnerHTML(quiz_btn_container, "")

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
    insertHtml(categories_content, content)
    if (currentQuestion.can_skip_remember_time && currentQuestion.time_to_remember > 0) {
        setInnerHTML(quiz_btn_container, `<button type="button" id="${btn_skip_remember_time}">Продолжить</button>`)
        addListenerOnClick(btn_skip_remember_time, () => $(`#timer_${question_timer_to_remember}`).trigger('complete'))
    }
    createTimer(time_to_remember, question_timer_to_remember, () => endTimeToRemember(questions, id), () => createAnswers(questions, id))
}


function endTimeToRemember(questions, id) {
    console.log("endTimeToRemember")
    setInnerHTML(question_img_container, "");
    setInnerHTML(question_description, "");
    setInnerHTML(question_timer_to_remember, "");
    removeChild(quiz_btn_container, btn_skip_remember_time)
    createAnswers(questions, id)
}

function createAnswers(questions, id) {
    let currentQuestion = questions[id];
    let answers = currentQuestion.answers

    switch (answers.type) {
        case 0:
            answers_0(questions, id)
            break;
        case 2:
            answers_2(questions, id)
            break;
        default:
            break;
    }

}

function addDataForm(name, value) {
    let element_name = document.getElementById(`form_answers_${name}`)

    if (element_name) {
        element_name.value = value
        return
    }
    let content = `<input type="text" id="form_answers_${name}" name="form_answers_${name}" value="${value}">`
    insertHtml("form", content)

}

function next(questions, id) {
    let nextId = id + 1;
    console.log(questions[nextId])
    if (questions.length > nextId) {
        createQuestion(questions, nextId)
    } else {
        alert("test off")
    }
}
//#region Answers template
function answers_2(questions, id) {
    let data = questions[id].answers.data
    let content = `<input type="text" id="form_answers_${id}" name="form_answers_${id}" value="" require>`
    quiz_btn_container.innerHTML = `<button type="button" id="btn_next">Продолжить</button>`
    addListenerOnClick("btn_next", function () {
        var answer = document.getElementById(`form_answers_${id}`)
        let isCheked = false;
        console.log(answer);

        isCheked = answer.value != ""
        if (isCheked == false) {
            alert("Впишите ответ")
            return
        }
        addDataForm(id, answer.value)
        next(questions, id)
    });
    setInnerHTML(question_content, content)
}

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
    setInnerHTML(quiz_btn_container, `<button type="button" id="btn_next">Продолжить</button>`)
    addListenerOnClick("btn_next", function () {
        var answer = document.getElementsByName("answer")
        let isCheked = false;
        let currentElement = ""
        for (let i = 0; i < answer.length; i++) {
            const element = answer[i];
            if (element.checked == true) {
                isCheked = true;
                currentElement = element
                break
            }
        }
        if (isCheked == false) {
            alert("Выберите ответ")
            return
        }
        addDataForm(id, currentElement.value)
        next(questions, id)

    });
    setInnerHTML(question_content, content)
}
//#endregion




//#endregion

//#region Timer
function createTimer(time, elementId, callback, callback_faild = () => console.log("Таймера нет")) {
    if (!(time !== undefined && time > 0)) {
        callback_faild()
        return
    }
    //gryz
    let min = time / 60;
    let timer = '';
    timer += `<h5 id="timer_${elementId}" class='timer' data-minutes-left='${min}'></h5>`;
    timer += "<section class='actions'></section>";
    setInnerHTML(elementId, timer)

    $(`#timer_${elementId}`).startTimer({
        onComplete: callback
    })
}

function submitTest() {
    document.forms[0].submit()
}
//#endregion

//#region HTML helper
function setInnerHTML(elementId, value) {
    var element = document.getElementById(elementId);
    if (element)
        element.innerHTML = value;
}

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
function insertHtml(elementId, content, position = 'beforeend') {
    let element = document.getElementById(elementId)
    if (element)
        element.insertAdjacentHTML(position, content)
}

function removeChild(elementId, childId) {
    let element = document.getElementById(elementId);
    if (element) {
        let child = document.getElementById(childId)
        if (child)
            element.removeChild(child)
    }
}

function addListenerOnClick(elementId, callback) {
    let element = document.getElementById(elementId);
    if (element) {
        element.onclick = callback;
    }
}
//#endregion