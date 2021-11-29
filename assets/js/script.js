var startButton = document.querySelector("#start-btn");
var nextButton = document.querySelector("#next-btn");
var timerCount = document.querySelector(".timer-count");
var questionContainerEl = document.querySelector("#question-container");
var questionEl = document.querySelector("#question");
var answerButtonsEl = document.querySelector("#answer-btns");
var instructions = document.querySelector(".instructions-text");


var timer;
var timeLeft;

var randomizeQuestions;
var currentQuestionIndex;

var questions = [
    {
        question: "Pug",
        answers: [
            {text: "Shih Tzu", correct: false},
            {text: "Puggle", correct: false},
            {text: "Yorkie", correct: false},
            {text: "Pug", correct: true},
        ],
        correct: "Pug",
    }
];

var questionPointer = 0;

startButton.addEventListener("click", startGame);

// startGame function beings when the start game button is clicked & triggers other functions
function startGame() {
    console.log("Start Game");
    startButton.classList.add("hide");
    instructions.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    nextButton.classList.remove("hide");

    alert("Get Ready...");

    timeLeft = 60;
    countDown ();

   randomizeQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;

    setQuestion ();
}

// timer function 
function countDown() {

    timer = setInterval(function() {

        if (timeLeft >= 1) {
            timerCount.textContent = ": " + timeLeft + " Seconds";
            timeLeft --;
            // test if meets win condition & timerCount 
        } if (timerCount === 0) {
            clearInterval(timer);
            // trigger loseGame();
        }
    }, 1000);
}


function setQuestion () {
    resetButton ();
    showQuestion(randomizeQuestions[currentQuestionIndex]);

}

function showQuestion(question) {
    questionEl.innerText = question.question;

    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", answerQuestion);
        answerButtonsEl.appendChild(button);
    });

}

function resetButton () {
    nextButton.classList.add("hide");
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild (answerButtonsEl.firstChild)
    }


}

function answerQuestion (event) {
    var buttonEl = event.target;
    var correct = buttonEl.dataset.correct;
    setCorrectAnswer(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setCorrectAnswer(button, button.dataset.correct)
    })

    // if (answer === questions [questionPointer].correct) {
    //     buttonEl.classList.add("correct");
    // } else {
    //     buttonEl.classList.add("wrong");
    // }

    console.log(answer);
}

function setCorrectAnswer (element, correct) {
    clearAnswer(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
        timeLeft - 10;
    }

}

function clearAnswer (element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}