//WHEN I click the start button
//THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and my score


//questions
var questions = [
{
  title: "Commonly used data types DO NOT include:",
  choices: ["strings", "booleans", "alerts", "numbers"],
  answer: "alerts"
},
{
  title: "The condition in an if / else statement is enclosed within ____.",
  choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
  answer: "parentheses"
},
{
  title: "Which built-in method removes the last element from an array and returns that element?",
  choices: ["last()", "get()", "pop()", "None of the Above"],
  answer: "pop()"
},
{
  title: "Which built-in method returns the calling string value converted to lower case?",
  choices: ["toLowerCase()", "toLower()", "changeCase(case)", "None of the Above"],
  answer: "toLowerCase()"
},
{
  title: "Which of the following function of Number object returns the number's value",
  choices: ["toString()", "valueOf()", "toLocaleString()", "toPrecision()"],
  answer: "valueOf()"
},
{
  title: "Which of the following function of Array object joins all elements of an array into a string?",
  choices: ["concat()", "join()", "pop()", "map()"],
  answer: "join()"
}
];

// DOM elements
let timerEl = document.querySelector("#time");
let choicesEl = document.querySelector("#choices");
let submitBtn = document.querySelector("#submit");
let questionsEl = document.querySelector("#questions");
let startBtn = document.querySelector("#start");
let initialsEl = document.querySelector("#initials");
let feedbackEl = document.querySelector("#feedback");


//quiz variables
let currentQuestionIndex = 0;
let time = questions.length * 10;
var timerId;

function startQuiz() {
    let startScreenEl = document.getElementById("#start-screen");
    startScreenEl.setAttribute("class", "hide");


    //show questions
    questionsEl.removeAttribute("class");


    //begin timer
    timerId = setInterval(clockTick, 1000);

    //display starting time
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    //get question from array
    let currrentQuestion = questions[currentQuestionIndex];

    //get updated title with current question
    let titleEl = document.getElementById("question-title");
    titleEl.textContent = currrentQuestion.title;

    //clear old questions
    choicesEl.innerHTML = "";

    //loop over questions
    currrentQuestion.choices.forEach(function(choice, i) {
        //new choice button for each choice
        let choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", "choice");

        choiceNode.textContent = i + 1 + ". " + choice;
        //add event listener for each node
        choiceNode.onclick = questionClick;

        //display
        choicesEl.appendChild(choiceNode);
    });
}

function questionClick() {
    //checks answer
    if (this.value !== questions[currentQuestionIndex].answer) {
        //subract time for wrong answer
        time -= 10

        if (time < 0) {
            time = 0;
        }

        //display new time
        timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
    }

    function quizEnd() {
        // stop timer
        clearInterval(timerId);
      
        // show end screen
        var endScreenEl = document.getElementById("end-screen");
        endScreenEl.removeAttribute("class");
      
        // show final score
        var finalScoreEl = document.getElementById("final-score");
        finalScoreEl.textContent = time;
      
        // hide questions section
        questionsEl.setAttribute("class", "hide");
      }
      
      function clockTick() {
        // update time
        time--;
        timerEl.textContent = time;
      
        // check if user ran out of time
        if (time <= 0) {
          quizEnd();
        }
      }
      
      function saveHighscore() {
        // get value of input box
        var initials = initialsEl.value.trim();
      
        if (initials !== "") {
          // get saved scores from localstorage, or if not any, set to empty array
          var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];
      
          // format new score object for current user
          var newScore = {
            score: time,
            initials: initials
          };
      
          // save to localstorage
          highscores.push(newScore);
          window.localStorage.setItem("highscores", JSON.stringify(highscores));
      
          // redirect to next page
          window.location.href = "score.html";
        }
      }
      
      function checkForEnter(event) {
        // "13" represents the enter key
        if (event.key === "Enter") {
          saveHighscore();
        }
      }
      
      // submit initials
      submitBtn.onclick = saveHighscore;
      
      // start quiz
      startBtn.onclick = startQuiz;
      
      initialsEl.onkeyup = checkForEnter;

///////////////////get scores

      function printHighscores() {
        // either get scores from localstorage or set to empty array
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
      
        // sort highscores by score property in descending order
        highscores.sort(function(a, b) {
          return b.score - a.score;
        });
      
        highscores.forEach(function(score) {
          // create li tag for each high score
          var liTag = document.createElement("li");
          liTag.textContent = score.initials + " - " + score.score;
      
          // display on page
          var olEl = document.getElementById("highscores");
          olEl.appendChild(liTag);
        });
      }
      
      function clearHighscores() {
        window.localStorage.removeItem("highscores");
        window.location.reload();
      }
      
      document.getElementById("clear").onclick = clearHighscores();
      
      // run function when page loads
      printHighscores();


























