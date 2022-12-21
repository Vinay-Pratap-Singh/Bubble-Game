const alphabetArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const bubbleColors = [
  "purple",
  "red",
  "green",
  "cyan",
  "orange",
  "pink",
  "gray",
];

// for appending the bubbles inside them
const bubbleBody = document.getElementById("bubbleWrapper");

// getting the the bubbles from dom
let myBubbles = [];

// for game loop rendering
let frameRate = 0.5;

// for storing and displaying score and high score
const score = document.getElementById("score");
const highScore = document.getElementById("highScore");
let currentHighScore = localStorage.getItem("highScore") || 0;
if (currentHighScore < 10) {
  highScore.innerText = "0" + currentHighScore;
} else {
  highScore.innerText = currentHighScore;
}

let currentScore = 0;

let missBubble = 0;

// for removing the click event listener from the window
let eventListnerController;

// for removing the game loop
let myLoop;

let heart = document.querySelectorAll(".fa-heart");
// converting heart node list to array
heart = Array.from(heart);

// function for creating the bubble
const createBubble = () => {
  // getting all the random values for bubble
  const randomAlphabet = Math.floor(Math.random() * alphabetArray.length);
  const randomColor = Math.floor(Math.random() * bubbleColors.length);
  const randomTime = Math.floor(Math.random() * (30 - 10 + 1) + 10);
  const randomLeft = Math.floor(Math.random() * (95 - 5 + 1) + 5);

  // creating the new bubble with random values
  const mydiv = document.createElement("div");
  mydiv.innerText = alphabetArray[randomAlphabet];
  mydiv.style.backgroundColor = bubbleColors[randomColor];
  mydiv.style["-webkit-animation-duration"] = `${randomTime}s`;
  mydiv.style.left = `${randomLeft}%`;
  mydiv.style.boxShadow =
    "inset -5px -5px 10px rgba(0, 0, 0, 1),1px 1px 1px white,-1px -1px 1px white";
  mydiv.classList.add("bubble");
  bubbleBody.appendChild(mydiv);

  // updating the myBubbles list with new ones
  myBubbles = document.querySelectorAll(".bubble");
  myBubbles = Array.from(myBubbles);

  // for deleting the bubble on animation end (bubble reach on top)
  mydiv.addEventListener("webkitAnimationEnd", () => {
    bubbleBody.removeChild(mydiv);
    missBubble += 1;
  });
};

// function for popping up the bubble if key matches
const burstBubble = (event) => {
  const key = event.key;

  for (let i = 0; i < myBubbles.length; i++) {
    if (myBubbles[i].innerText === key) {
      // popping the bubble
      bubbleBody.removeChild(myBubbles[i]);

      // updating the bubble list after popping the bubble
      myBubbles = document.querySelectorAll(".bubble");
      myBubbles = Array.from(myBubbles);

      // updating the game score
      currentScore += 1;
      if (currentScore < 0 && currentScore > -10) {
        score.innerText = "-0" + Math.abs(currentScore);
      } else if (currentScore < 10 && currentScore >= 0) {
        score.innerText = "0" + currentScore;
      } else {
        score.innerText = currentScore;
      }

      // setting the high score
      if (currentScore > currentHighScore) {
        currentHighScore = currentScore;
        localStorage.setItem("highScore", currentHighScore);
        if (currentHighScore < 10) {
          highScore.innerText = "0" + currentHighScore;
        } else {
          highScore.innerText = currentHighScore;
        }
      }

      // increasing the speed after every 20 points
      if (currentScore % 20 == 0) {
        frameRate += 0.1;
      }
      return;
    }
  }

  // if the key is not shift and caps lock then decreaing the score value
  if (key !== "Shift" && key !== "CapsLock") {
    currentScore -= 1;
    if (currentScore <= 0 && currentScore > -10) {
      score.innerText = "-0" + Math.abs(currentScore);
    } else if (currentScore < 10 && currentScore > 0) {
      score.innerText = "0" + currentScore;
    } else {
      score.innerText = currentScore;
    }
  }
};

// creating the game loop
let startTime = new Date().getTime();

// game loop for running the game
const gameLoop = () => {
  const currentTime = new Date().getTime();
  const difference = currentTime - startTime;
  if (difference > 1000 / frameRate) {
    startTime = currentTime;
    createBubble();
    endGame();
  }
  myLoop = window.requestAnimationFrame(gameLoop);
};

// function to start the game
const startGame = (event) => {
  const text = event.target.innerText;

  // if text is start game
  if (text === "Start Game") {
    // function for adding the window event listner for user key input
    eventListnerController = window.addEventListener("keyup", burstBubble);

    // changing the game button text to restart game
    gameBtn.innerText = "Restart Game";

    // starting the game loop
    gameLoop();
  } else if (text === "Restart Game") {
    window.location.reload();
  }
};

const endGame = () => {
  // checking that the game is over or not
  if (missBubble >= 5) {
    window.cancelAnimationFrame(myLoop);
    window.removeEventListener("click", startGame);
    bubbleBody.innerHTML = `<p class='gameOver'>Game Over</p>`;
  }

  // marking red for lost life
  for (let i = 0; i < missBubble; i++) {
    heart[4 - i].style.color = "red";
  }
};

const gameBtn = document.getElementById("gameBtn");
gameBtn.addEventListener("click", startGame);
