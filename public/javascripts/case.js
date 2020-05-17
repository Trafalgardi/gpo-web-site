function slideQuestions(params) {
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
        myQuestions = params.questions;
        console.log(myQuestions);

        for (let q = 0; q < myQuestions.length; q++) {
            //Когда одинаковые ответы для всех вопросов.
            // and for each available answer...
            let answers = checkboxAnswers(params.answers, q, params.answerDefault);
            // add this question and its answers to the output
            shuffle(answers);
            output.push(
                `<div class="slide">
                    <div class="question"> ${myQuestions[q]} </div>
                    <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
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

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
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

function checkboxAnswers(answers, questionIndex, defaultAnswer) { //Мы передаём сюда массив ответов для вопроса, i номер вопроса, def - выбор значения по умолчанию
    let answersHtml = [];
    for (let i = 0; i < answers.length; i++) {
        let checked = defaultAnswer == i ? ' checked' : '';
        answersHtml.push(
            `<div class=""custom-control custom-checkbox mb-2">
                <label>
                    <input type="checkbox" name="question${questionIndex}[]" value="${answers[i]}"${checked}>
                    ${answers[i]}
                </label>
            </div>`
        );
    }
    return answersHtml;
}