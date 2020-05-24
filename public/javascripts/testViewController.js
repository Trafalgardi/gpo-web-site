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
    test_id: -1,
    _question_id: 0,
    _category_id: 0,
    get question_id() {
        return this._question_id;
    },
    set question_id(value) {
        console.log("question_id: " + value)
        if (value < 0) {
            return
        }
        else if (value >= this.current_category.questions.length) {
            console.log("next category")
            this.category_id++;
            return;
        }
        this._question_id = value;
        createQuestion();
    },
    get category_id() {
        return this._category_id;
    },
    set category_id(value) {
        console.log("category_id: " + value)
        if (value < 0) {
            return
        }
        else if (value >= this.data.categories.length) {
            //submit
            submitTest();
            return;
        }
        console.log("set category: " + value)
        this._category_id = value;
        createCategory();
        this.question_id = 0;
    },
    get current_category() {
        return this.data.categories[this.category_id];
    },
    get current_question() {
        return this.current_category.questions[this.question_id];
    },
    get test_name() {
        return this.data.name;
    },
    get test_time() {
        return this.data.time;
    },
    get test_tutorial() {
        return this.data.tutorial;
    },
    save_answers: [],
    addAnswer(ans) {
        this.save_answers[this.category_id][this.question_id] = ans;
        //console.log(this.save_answers);
    }

};

function mainFunc(json, id) {
    current_data.data = json;
    current_data.test_id = id;
    //let question_count = json.categories.map(v => v.questions.length).reduce((a, c) => a + c);
    current_data.save_answers = new Array(json.categories.length);
    for (let i = 0; i < current_data.save_answers.length; i++) {
        current_data.save_answers[i] = new Array(json.categories[i].questions.length);
    }
    //console.log("question_count: " + question_count);
    console.log(current_data);
    setInnerHTML("testName", current_data.test_name)

    //Таймер на тест
    createTimer(current_data.test_time, "timer", submitTest);

    //Туторила
    setTutorial(current_data.test_tutorial)

    //Создание категорий
    current_data.category_id = 0;

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
    setInnerHTML(quiz_btn_container, "")

    let category = current_data.current_category;
    let content = "";
    content += `
        <div id="${categories_timer}"></div>
        <div id="${categories_name}">${category.name}</div>
        <div id="${categories_content}"></div>
    `;
    insertHTML(quiz, content)
    createTimer(category.time, categories_timer, () => categoriesTimer())
    let isTutorial = setTutorial(category.tutorial)
    if (isTutorial) {
        return
    }

}

function categoriesTimer() {
    console.log("Таймер категории")
}
//#endregion

//#region Создание вопроса
function createQuestion() {
    setInnerHTML(categories_content, "")
    setInnerHTML(quiz_btn_container, "")
    let currentQuestion = current_data.current_question;
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
    insertHTML(categories_content, content)
    if (currentQuestion.can_skip_remember_time && currentQuestion.time_to_remember > 0) {
        setInnerHTML(quiz_btn_container, `<button type="button" id="${btn_skip_remember_time}">Продолжить</button>`)
        addListenerOnClick(btn_skip_remember_time, () => $(`#timer_${question_timer_to_remember}`).trigger('complete'))
        //TODO проверить создание кнопок ниже
    }
    createTimer(time_to_remember, question_timer_to_remember, endTimeToRemember, createAnswers);
}


function endTimeToRemember() {
    console.log("endTimeToRemember")
    setInnerHTML(question_img_container, "");
    setInnerHTML(question_description, "");
    setInnerHTML(question_timer_to_remember, "");
    removeChild(quiz_btn_container, btn_skip_remember_time)
    createAnswers()
}

function createAnswers() {
    if (current_data.question_id != 0) {
        //кнопка назад
        insertHTML(quiz_btn_container, `<button type="button" id="btn_back">Назад</button>`)
        addListenerOnClick("btn_back", () => current_data.question_id--);
    }
    let button_id = "";
    let button_text = "";
    if (current_data.question_id + 1 >= current_data.current_category.questions.length) {

        if (current_data.category_id + 1 >= current_data.data.categories.length) {
            //отправить
            button_id = "btn_submit";
            button_text = "Отправить";
        }
        else {
            //Следующий раздел
            button_id = "btn_next_category";
            button_text = "Следующий раздел";
        }
    }
    else {
        //вперёд
        button_id = "btn_next";
        button_text = "Продолжить";
    }
    insertHTML(quiz_btn_container, `<button type="button" id="${button_id}">${button_text}</button>`)

    let currentQuestion = current_data.current_question;
    let answers = currentQuestion.answers
    switch (answers.type) {
        case 0:
            answers_0(button_id)
            break;
        case 2:
            answers_2(button_id)
            break;
        default:
            break;
    }

}

function next() {
    current_data.question_id++;
    if (current_data.current_category.questions.length > current_data.question_id) {

    } else {
        // next categories or end test
        setInnerHTML(quiz_btn_container, `<button type="button" id="submit">Завершить</button>`)
        addListenerOnClick("submit", submitTest);
    }
}

//#region Answers template
function answers_2(button_id) {
    console.log("answers_2")
    let id = current_data.question_id;
    let content = `<input type="text" id="form_answers_${id}" name="form_answers_${id}" value="" require>`

    addListenerOnClick(button_id, function () {
        var answer = document.getElementById(`form_answers_${id}`)
        let isCheked = false;

        isCheked = answer.value != ""
        if (isCheked == false) {
            alert("Впишите ответ")
            return
        }
        current_data.addAnswer(answer.value)
        current_data.question_id++;
    });
    setInnerHTML(question_content, content)
}

function answers_0(button_id) {
    //console.log("answers_0")
    let data = current_data.current_question.answers.data
    let content = '';
    for (let i = 0; i < data.length; i++) {
        content += `
        <div class="radio">
            <label>
                <input id="answer_${data[i]}" type="radio" name="answer" value="${data[i]}">
                ${data[i]}
            </label>
        </div>`
    }
    setInnerHTML(question_content, content)
   
    
    addListenerOnClick(button_id, function () {
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
        current_data.addAnswer(currentElement.value)
        current_data.question_id++;

    });

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
    insertHTML("form", `<input type="text" name=test_id value="${current_data.test_id}"> `)
    let answers = current_data.save_answers;
    for (let i = 0; i < answers.length; i++) {
        const category = answers[i];
        for (let j = 0; j < category.length; j++) {
            const ans = category[j];
            insertHTML("form", `<input type="text" name="answers[${i}][${j}]" value="${ans}"> `)
        }
    }

    //for (let i = 0; i < answers.length; i++) {
    //    const ans = answers[i];
    //    insertHtml("form", `<input type="text" name=answers value="${ans}"> `)
    //}
    //console.log(document.forms[0])
    document.forms[0].submit()
}
//#endregion

//#region HTML helper
/*
function addDataForm(name, value) {
    let element_name = document.getElementById(`form_answers_${name}`)

    if (element_name) {
        element_name.value = value
        return
    }
    let content = `<input type="text" id="form_answers_${name}" name="form_answers_${name}" value="${value}">`
    insertHtml("form", content)

}
*/
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
function insertHTML(elementId, content, position = 'beforeend') {
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