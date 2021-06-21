// Element Variables
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
        question: "What is a function inside an object called?",
        answers: ["Method", "Function", "Block", "Operator" ],
        correct: "Method"
    },
    {
        question: "What is the keyword for variable?",
        answers: ["var", "variable", "num", "String"],
        correct: "var"
    }
];

//Game state Variables
var testIndex = 0;
var score = 0;
var gameRunning = true
var timerLength = 180;

function setQuestionText() {
    questionText.textContent = test[testIndex].question;
}

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

function setScore() {
    scoreText.textContent = score;
}

function setTimer(value) {
    timerText.textContent = value;
}

