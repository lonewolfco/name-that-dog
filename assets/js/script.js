var startBtn = document.querySelector(".start-btn");
var timerCount = document.querySelector(".timer-count");


var timer;
var timeLeft;

var questions = [
    {
        question: "./assets/images/pug.jpeg",
        multipleChoiceOptions: [
            "Shih Tzu",
            "Puggle",
            "Yorkie",
            "Pug"
        ],
        correct: "Pug"

    }
];

startBtn.addEventListener("click", startGame);

// startGame function beings when the start game button is clicked & triggers other functions
function startGame() {
    alert("Get Ready...")
    timeLeft = 60;
    countDown ();
    
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


function renderQuestion () {

}