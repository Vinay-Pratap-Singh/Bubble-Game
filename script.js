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

// getting the the bubbles from dom
let myBubbles;

// creating the game loop
let startTime = new Date().getTime();
let frameRate = 1;

// game loop for running the game
const gameLoop = () => {
  const currentTime = new Date().getTime();
  const difference = currentTime - startTime;
  if (difference > 1000 / frameRate) {
    console.log("good");
    startTime = currentTime;
  }
  window.requestAnimationFrame(gameLoop);
};

// gameLoop();

// function for creating the bubble
const createBubble = () => {
  const mydiv = document.createElement("div");
  mydiv.style.width = "50px";
  mydiv.style.height = "50px";
  mydiv.style.bottom = "0px";
  mydiv.innerText = alphabetArray[0];
  mydiv.style.backgroundColor = "purple";
  mydiv.style.boxShadow =
    "inset -5px -5px 10px rgba(0, 0, 0, 1),1px 1px 1px white,-1px -1px 1px white";
  mydiv.classList.add("bubble");
  document.body.appendChild(mydiv);

  // updating the myBubbles list with new ones
  myBubbles = document.querySelectorAll(".bubble");
  myBubbles = Array.from(myBubbles);
};
createBubble();

// function for popping up the bubble
const burstBubble = (event) => {
  const key = event.key;
  myBubbles.map((element, index) => {
    if (element.innerText === key) {
      deleteIndex = index;
        document.body.removeChild(myBubbles[index]);
        myBubbles = document.querySelectorAll(".bubble");
        myBubbles = Array.from(myBubbles);
    }
  });
};

// function for adding the window event listner
window.addEventListener("keyup", burstBubble);
