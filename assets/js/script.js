// declare variables calling out properties from HTML
var startButton = document.querySelector("#start-btn");
var nextButton = document.querySelector("#next-btn");
var timerCount = document.querySelector(".timer-count");
var questionContainerEl = document.querySelector("#question-container");
var questionEl = document.querySelector("#question");
var answerButtonsEl = document.querySelector("#answer-btns");
var instructions = document.querySelector(".instructions-text");
var form = document.querySelector("#form");
var scoreText = document.querySelector("#enter-score-text");


var timer;
var timeLeft;

var randomizeQuestions;
var questionPointer;

var questions = [
    {
        question: "What type of dog is the talking dog in Men in Black?",
        answers: [
            {text: "Shih Tzu", correct: false},
            {text: "Puggle", correct: false},
            {text: "Yorkie", correct: false},
            {text: "Pug", correct: true},
        ],
    },
    {
        question: "What type of dog is the UW Mascot?",
        answers: [
            {text: "Malamute", correct: false},
            {text: "Siberian Husky", correct: true},
            {text: "Pomsky", correct: false},
            {text: "Tamaskan Wolf Dog", correct: false},
        ],
    },
    {
        question: "What type of Dog is Scooby-Doo based off of?",
        answers: [
            {text: "Bloodhound", correct: false},
            {text: "Pitbull", correct: false},
            {text: "Great Dane", correct: true},
            {text: "Mastiff", correct: false},
        ],
    },
    {
        question: "What type of dog has the highest risk of cancer",
        answers: [
            {text: "Bloodhound", correct: false},
            {text: "Irish Wolfhound", correct: false},
            {text: "Golden Retriever", correct: true},
            {text: "German Shepherd", correct: false},
        ],
    },
    {
        question: "What type of dog was dubbed the Nanny Dog in the 1920s?",
        answers: [
            {text: "Beagle", correct: false},
            {text: "Pitbull", correct: true},
            {text: "Labrador Retriever", correct: false},
            {text: "English Bulldog", correct: false},
        ],
    }
];

// event listeners in place for when the start button is pressed & the next button is pressed
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestion )

// startGame function beings when the start game button is clicked & triggers other functions
function startGame() {
    startButton.classList.add("hide");
    instructions.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    nextButton.classList.remove("hide");
    form.classList.add("hide");

    timeLeft = 60;
    countDown ();

   randomizeQuestions = questions.sort(() => Math.random() - .5);
    questionPointer = 0;

    setQuestion ();
}

// timer function to countdown time remaining in the game
function countDown() {

    timer = setInterval(function() {

        if (timeLeft > 0) {
            timerCount.textContent = timeLeft + " Seconds";
            timeLeft --;
            // test if meets win condition & timerCount 
        } if (timeLeft === 0) {
            clearInterval(timer);
            timerCount.textContent = timeLeft + " Seconds";
            // trigger loseGame();
            questionContainerEl.classList.add("hide");
            startButton.classList.remove("hide");
            instructions.classList.remove("hide");
            nextButton.classList.add("hide");

            instructions.textContent=("Game Over - Try Again");
        }
    }, 1000);
}

// function triggered after startGame function
// function will call out the resetButton function and trigger the randomization of the questions being displayed
function setQuestion () {
    resetButton ();
    showQuestion(randomizeQuestions[questionPointer]);

}

// function to display the correct question text in the question container
// creates new buttons for each answer associated with each question
// when one of the newly created answer buttons is pressed, the answerQuestion function is triggered
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

// Once a question is displayed this function will hide the next button until one of the answer buttons is pressed.
function resetButton () {
    nextButton.classList.add("hide");
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild (answerButtonsEl.firstChild)
    }


}

// This function creates buttons depending on the questions object length
// This function looks to what the correct answer should be based on what has been pressed by the user
// This function will prevent any questions being asked or the timer from continuing once all of the questions have been used. 
function answerQuestion (event) {
    var buttonEl = event.target;
    var correct = buttonEl.dataset.correct;
    setCorrectAnswer(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setCorrectAnswer(button, button.dataset.correct)
    })
// if there are questions still remaining, show the nextButton
    if (randomizeQuestions.length > questionPointer +1 ) {
        nextButton.classList.remove("hide");
    } else {
        // if there are no questions remaning in array, stop the countDown, show the high scores submission, and turn the start button into a restart button
        var score = timeLeft +1;
        form.classList.remove("hide");
        scoreText.innerText = ("Enter Initials to Save Score of " + score)
        startButton.innerText = ("Restart");
        startButton.classList.remove("hide");
        clearInterval(timer);
        return score;

    }
    console.log(correct);
// if the answer selected is NOT true, then deduct 10 seconds from countdown
    if (!correct === true) {
        console.log(timeLeft);
        timeLeft = timeLeft - 10;
        console.log(timeLeft);
    }

}

// function to adjust the coloring of buttons to show the correct and wrong answer colors
// will know what class to add to which based on boolean of variable questions
function setCorrectAnswer (element, correct) {
    clearAnswer(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }

}

// functiom to clear out the color styling on the buttons
function clearAnswer (element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");

}

// function to populate the nezt question & call out setQuestion function
function nextQuestion () {
   questionPointer++;
   setQuestion ();
}


var userInitial = document.querySelector("#userinput.value");
var submitScoreBtn = document.querySelector("#high-score-btn");

submitScoreBtn.addEventListener("click", saveScore);

function saveScore () {
    localStorage.setItem("userInitialInput", JSON.stringify(userInitial));
}