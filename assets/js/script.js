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



