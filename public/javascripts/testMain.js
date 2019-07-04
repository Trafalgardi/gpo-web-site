
function checkType(parms, id) {


  console.log(JSON.parse(parms))
  let json = JSON.parse(parms)

  myQuestions = json.data;
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

  switch (json.type) {
    case 0: //Разные ответы на все тесты
      testNode(json, id)
        break;
    case 1: 
    testNode(json, id)
    //content += oneForAll(json.questions, json.answers, json.answerDefault) // 0 - answerDefault или dif или значение по умолчанию.
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
    case 12: 
    content += checkBox(json)
        break;
    default:
        break;
  }
  if(json.type != 0 && json.type != 1){
    if(json.type != 5 && json.type != 6 && json.type != 7 && json.type != 12){
      content += '<div class="box-footer" style="text-align: center;">';
      content += '    <input  type="submit" class="btn btn-primary" value="Отправить ответы"></input>';
      content += '</div>';
    }
    if(json.type == 12){
        content += '<div id="btn" class="box-footer" style="text-align: center;">';
        content += '    <input onclick="testController(0)"  type="button" class="btn btn-primary" value="Начать"></input>';
        content += '</div>';
    }
    content += '<div class="box-footer">';
    content += '    <input style="display:none" name="id" type="text" value="' + id + '"></input>';
    content += '</div>';
    document.getElementById('questions').innerHTML = content;
    
    if(json.type == 12){
        $("#q_1").show();
    }
    
    
    
    
    
    //if(json.type == 3) $('.mask').mask(json.mask, {'translation': {0: {pattern: /d/}}});
    document.getElementById('testName').innerHTML = '<h1>' + json.name + '</h1>';
    if(json.type == 6) noPatternNumber(0);
    if(json.type == 7) Image(1, 1, 1);
  }
  
}

function testNode(parms, id) {

    
    type = parms.type;
    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
      if(type == 0){
        myQuestions = parms.data;
        for (let q = 0; q < myQuestions.length; q++) {
          
          const answers = [];
          // and for each available answer...
          
          for (let index = 0; index <= myQuestions[q].answers.length; index++) {
            if(index < myQuestions[q].answers.length)
              {
                answers.push(
                `<label>
                  <input type="radio" name="question${q}" value="${myQuestions[q].answers[index]}">
                    ${myQuestions[q].answers[index]}
                </label>`
                );
              }
              else if(index == myQuestions[q].answers.length)
              {
                answers.push(
                  `<label style="display:none">
                    <input type="radio" name="question${q}" value="default" checked>
                  </label>`
                  );
              }
          }
          
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${myQuestions[q].question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );

          
        }
      }else if(type == 1){
        //console.log(parms.questions)
        for (let q = 0; q < parms.questions.length; q++) {
          
          const answers = [];
          // and for each available answer...
          
          for (let index = 0; index <= parms.answers.length; index++) {
            if(index < parms.answers.length)
              {
                answers.push(
                `<label>
                  <input type="radio" name="question${q}" value="${parms.answers[index]}">
                    ${parms.answers[index]}
                </label>`
                );
              }
              else if(index == parms.answers.length)
              {
                answers.push(
                  `<label style="display:none">
                    <input type="radio" name="question${q}" value="default" checked>
                  </label>`
                  );
              }
          }
          
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${parms.questions[q]} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );

          
        }
      }
      quizContainer.innerHTML = output.join("");
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
      
      if (currentSlide === 0) {
        previousButton.style.display = "none";
      } else {
        previousButton.style.display = "inline-block";
      }
      
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    const testInfo = document.getElementById("info");
    const quizContainer = document.getElementById("quiz");
    const submitButton = document.getElementById("submit");
  
    // display quiz right away
    buildQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");

    let currentSlide = 0;
  
    showSlide(0);
  
    // on submit, show results
    //submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

    testInfo.innerHTML = `<div class="box-footer"><input style="display:none" name="id" type="text" value="${id}"></input> </div>'`;
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