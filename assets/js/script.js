// Element variables that will have content set by Script
var questionText = document.getElementById("question");
var answerList = document.getElementById("answerBox");
var timerText = document.getElementById("timer");
var scoreText = document.getElementById("score");
var startButton = document.getElementById("startButton");
var resetButton = document.getElementById("resetBtn");
var leaderList = document.getElementById("leaderList");

// Question Variables
var test = [
    { 
        question: "Click Button above to start the quiz",
        answers: ["click these to Answer", "Example Button", "Example Button", "Example Button",]
    },
    {
        question: "The Test is over. Please enter your name below to save your score."
    },
    {
        question: "What does HTML stand for?",
        answers: ["Home Tool Markup Language", "Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Hyperbolic Text Language" ],
        correct: "Hyper Text Markup Language"
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        answers: ["alt", "longdesc", "title", "src"],
        correct: "alt"
    },
    {
        question: "Choose the correct HTMl element for the largest heading",
        answers: ["<h1>", "<h6>", "<heading>", "<head>"],
        correct: "<h1>"
    },
    {
        question: "Which character is used to indicate an end tag?",
        answers: ["*", "<", "/", "^"],
        correct: "/"
    },
    {
        question: "What is the correct HTML for inserting an image?",
        answers: ["<img href=\"image.gif\" alt=\"MyImage\">", "<img alt=\"MyImage\>image.gif</img>", "<img src=\"image.gif\" alt=\"MyImage\">", "<image src=\"image.gif\" alt=\"MyImage\">"],
        correct: "<img src=\"image.gif\" alt=\"MyImage\">"
    },
    {
        question: "What does CSS stand for?",
        answers: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correct: "Cascading Style Sheets"
    },
    {
        question: "What is the correct HTMl for referring to an external style sheet?",
        answers: ["<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">", "<style src=\"mystyle.css\">", "<stylesheet>mystyle.css</stylesheet>"],
        correct: "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">"
    },
    {
        question: "Which CSS property is used to change the background color?",
        answers: ["color", "background-color", "bgcolor"],
        correct: "background-color"
    },
    {
        question: "How do you display a border like this with CSS: \n The top border = 10 pixels \n the bottom border = 5 pixels \n the left border = 20pixels \n the right border = 1 pixel?",
        answers: ["border-width:5px 20px 10px 1px;", "border-width:10px 5px 20px 1px;", "border-width:10px 1px 5px 20px;", "border-width:10px 20px 5px 1px;"],
        correct: "border-width:10px 1px 5px 20px;"
    },
    {
        question: "How do you select an element with id 'demo'?",
        answers: ["*demo", "#demo", "demo", ".demo"],
        correct: "#demo"
    },
    {
        question: "Inside which HTML Element do we put the JavaScript?",
        answers: ["<js>", "<script>", "<scripting>", "<javascript>"],
        correct: "<script>"
    },
    {
        question: "Using JavaScript how do you write \"Hello World\" in an alert box?",
        answers: ["alertBox(\"Hello World\")", "msg(\"Hello World\")", "msgBox(\"Hello World\")", "alert(\"Hello World\")"],
        correct: "alert(\"Hello World\")"
    },
    {
        question: "How can you add a comment in JavaScript?",
        answers: ["'This is a comment", "<!--- This is a comment -->", "//This is a comment"],
        correct: "//This is a comment"
    },
    {
        question: "JavaScript is the same as Java",
        answers: ["True", "False"],
        correct: "False"
    },
    {
        question: "How do you create a function in JavaScript",
        answers: ["function myFunction()", "call function myFunction()", "call myFunction()"],
        correct: "function myFunction()"
    }
]

//Game state Variables
var testIndex = 0;
var score = 0;
var gameRunning = true
var timerLength = 180;

//Score Object
var scoreInfo = {
    name: null,
    score: null,
    timeLeft: null
}

//Content editing Functions
//Sets question box content to question
function setQuestionText() {
    questionText.textContent = test[testIndex].question;
}

//Removes all buttons from the answer Box
function clearAnswers() {
    var numAnswers = answerList.childElementCount
    for (var i = 0; i < numAnswers; i++) {
        if (answerList.firtChild === null) {
            return
        } else {
            answerList.firstChild.remove();
        }
    }
}

//Builds Answer Buttons for current question
function buildAnswers() {
    var questionInfo = test[testIndex];
    var possibleAnswers = questionInfo.answers;
    var correctAnswer = questionInfo.correct;

    for (var x = 0; x < possibleAnswers.length; x++) {
        var listEl = document.createElement("li");
        var buttonEl =document.createElement("button");

        buttonEl.textContent = possibleAnswers[x];

        if (possibleAnswers[x] == correctAnswer) {
            buttonEl.dataset.correct = "true";
        } else {
            buttonEl.dataset.correct = "false";
        }

        if (testIndex != 0) {
            buttonEl.addEventListener("click", checkAnswer)
        }
        listEl.append(buttonEl);
        answerList.append(listEl);
    }
}

//Sets text in score box to value of score
function setScore() {
    scoreText.textContent = score;
}

//Sets timer text to value provided
function setTimer(value) {
    timerText.textContent = value;
}

//Creates the leaderboard form and submit button
function createForm() {
    var form = document.createElement("form");
    var label = document.createElement("label");
    var input = document.createElement("input");
    var submitButton = document.createElement("button");


    input.setAttribute("type", "text");
    input.setAttribute("id", "Initials");
    input.setAttribute("name", "Initials");
    input.setAttribute("value", "Initials");

    label.setAttribute("for", "Initials");
    label.textContent = "Initials:";

    submitButton.setAttribute("id", "submitStore");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", submitScore);

    form.append(label);
    form.append(input);
    form.append(submitButton);
    
    clearAnswers();
    answerList.appendChild(form);
}


//Logic Handlers for events
//Checks to see if submitted answer is correct or not.  if it is correct score is increased if wrong timer and score are decreased 
function checkAnswer(event) {
    var correct = event.target.dataset.correct
    if (correct == "true") {
        console.log("correct");
        score += 50;
    } else {
        console.log("wrong");
        score -= 25;
        timerLength -= 10;
    }

    testIndex++;
    setScore();

    if (testIndex > test.length - 1)  {
        endGame();
    } else {
        nextQuestion();
    }
}

//Converts seconds to Minutes and Seconds
function secondsToTimer(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    var secondsValue = seconds;
    if (seconds < 10) {
        secondsValue = "0" + seconds;
        }
    timerValue = minutes + ":" + secondsValue;

    return timerValue;
}

// Starts the Timer for the quiz
function startTimer() {
    console.log("Start Timer");
    var timer = setInterval(function(){
        if (!gameRunning) {
            clearInterval(timer);
        } else if (timerLength == 0) {
            clearInterval(timer);
            endGame();
        } else {
            timerLength--;
            setTimer(secondsToTimer(timerLength));
        }
    }, 1000);
}

//Submits the current score to local storage as a string
function submitScore(event) {
    event.preventDefault();
    console.log("submit Score");
    console.log(localStorage.length);
    var scoreName = "Entry" + (localStorage.length + 1);


    scoreInfo.name = document.getElementById("Initials").value;
    scoreInfo.score = score;
    scoreInfo.timeLeft = timerLength;
    localStorage.setItem(scoreName, JSON.stringify(scoreInfo));
    initialize();
}

// Adds all scores in local Storage to leaderboard list
function updateLeaderboard() {
    leaderList.textContent = "";
    if(localStorage.length > 0) {
        for (var i = 1; i <= localStorage.length; i++) {
            var listEl = document.createElement("li");
            var entryName = "Entry" + i;
            var entryInfo = JSON.parse(localStorage.getItem(entryName));
            var seconds = entryInfo.timeLeft;
            var entryText = "Initials: " + entryInfo.name + " ------- Score: " + entryInfo.score + " ------- Time Left: " + secondsToTimer(seconds);
            listEl.textContent = entryText;
            leaderList.append(listEl);
        } 
    } else {
        leaderList.textContent = "Take a Quiz to get on the leaderboard";
    }
}

//Builds the next question
function nextQuestion() {
    setQuestionText()
    clearAnswers();
    buildAnswers();
}

//Starts the quiz
function startQuiz() {
    testIndex = 2;
    gameRunning = true;
    clearAnswers();    
    setQuestionText();
    buildAnswers();
    startTimer();
    startButton.disabled = true;
    timerLength = 180;
}

//Called when timer is 0 or all questions are answered. ends the game
function endGame() {
    gameRunning = false;
    console.log("Game Over")
    testIndex = 1
    setQuestionText();
    clearAnswers();
    createForm();

}

//Page initializer and function that runs when page is reset;
function initialize() {
    testIndex = 0;
    score = 0;
    setQuestionText();
    clearAnswers();
    buildAnswers();
    setScore(score);
    setTimer("3:00");
    gameRunning = false;
    startButton.disabled = false;
    updateLeaderboard();
}

initialize();

//Event Listeners
startButton.addEventListener("click", startQuiz);
resetButton.addEventListener("click", initialize);
