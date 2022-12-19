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

// getting the the bubbles from dom
let myBubbles = [];

let score = 0;

let missBubble = 0;

// function for creating the bubble
const createBubble = () => {
  // getting all the random values for bubble
  const randomAlphabet = Math.floor(Math.random() * alphabetArray.length);
  const randomColor = Math.floor(Math.random() * bubbleColors.length);
  const randomTime = Math.floor(Math.random() * (30 - 10 + 1) + 10);
  const randomLeft = Math.floor(Math.random() * (95 - 5 + 1) + 5);

  // creating the new bubble with random values
  const mydiv = document.createElement("div");
  mydiv.style.width = "50px";
  mydiv.style.height = "50px";
  mydiv.style.bottom = "0px";
  mydiv.innerText = alphabetArray[randomAlphabet];
  mydiv.style.backgroundColor = bubbleColors[randomColor];
  mydiv.style["-webkit-animation-duration"] = `${randomTime}s`;
  mydiv.style.left = `${randomLeft}%`;
  mydiv.style.boxShadow =
    "inset -5px -5px 10px rgba(0, 0, 0, 1),1px 1px 1px white,-1px -1px 1px white";
  mydiv.classList.add("bubble");
  document.body.appendChild(mydiv);

  // updating the myBubbles list with new ones
  myBubbles = document.querySelectorAll(".bubble");
  myBubbles = Array.from(myBubbles);

  // for deleting the bubble on animation end (bubble reach on top)
  mydiv.addEventListener("webkitAnimationEnd", () => {
    document.body.removeChild(mydiv);
    missBubble += 1;
    console.log(missBubble);
  });
};

// function for popping up the bubble if key matches
const burstBubble = (event) => {
  const key = event.key;
  for (let i = 0; i < myBubbles.length; i++) {
    if (myBubbles[i].innerText === key) {
      // popping the bubble
      document.body.removeChild(myBubbles[i]);

      // updating the bubble list after popping the bubble
      myBubbles = document.querySelectorAll(".bubble");
      myBubbles = Array.from(myBubbles);
      break;
    }
  }
};

// creating the game loop
let startTime = new Date().getTime();
let frameRate = 0.5;

// game loop for running the game
const gameLoop = () => {
  const currentTime = new Date().getTime();
  const difference = currentTime - startTime;
  if (difference > 1000 / frameRate) {
    startTime = currentTime;
    createBubble();
  }
  window.requestAnimationFrame(gameLoop);
};

// running the game loop
gameLoop();

// function for adding the window event listner for user key input
window.addEventListener("keyup", burstBubble);
