const cardFiles = [];

for (let i = 1; i <= 30; i++) {
  cardFiles.push(`card${i}.jpg`);
}

let deck = [];
let currentIndex = 0;
let currentCardFile = "";

const currentCard = document.getElementById("currentCard");
const flipButton = document.getElementById("flipButton");
const restartButton = document.getElementById("restartButton");

const leftDock = document.getElementById("leftDock");
const rightDock = document.getElementById("rightDock");

const confirmBox = document.getElementById("confirmBox");
const cancelRestartButton = document.getElementById("cancelRestartButton");
const confirmRestartButton = document.getElementById("confirmRestartButton");

function shuffleDeck() {
  deck = [...cardFiles];

  for (let i = deck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = temp;
  }

  currentIndex = 0;
  currentCardFile = "";
}

function flipCard() {
  if (currentCardFile !== "") {
    dockCard(currentCardFile);
  }

  if (currentIndex >= deck.length) {
    currentCard.src = "";
    currentCard.alt = "";
    currentCardFile = "";
    flipButton.disabled = true;
    return;
  }

  currentCardFile = deck[currentIndex];
  currentCard.src = "images/" + currentCardFile;
  currentCard.alt = "Bingo card";

  currentIndex++;
}

function dockCard(fileName) {
  const dockedImage = document.createElement("img");
  dockedImage.src = "images/" + fileName;
  dockedImage.alt = "Flipped card";
  dockedImage.className = "dockedCard";

  const alreadyDocked = leftDock.children.length + rightDock.children.length;

  if (alreadyDocked < 15) {
    leftDock.appendChild(dockedImage);
  } else {
    rightDock.appendChild(dockedImage);
  }
}

function askToRestart() {
  confirmBox.classList.remove("hidden");
}

function cancelRestart() {
  confirmBox.classList.add("hidden");
}

function restartGame() {
  confirmBox.classList.add("hidden");

  shuffleDeck();

  currentCard.src = "";
  currentCard.alt = "";
  leftDock.innerHTML = "";
  rightDock.innerHTML = "";

  flipButton.disabled = false;
}

shuffleDeck();

const bgMusic = document.getElementById("bgMusic");

flipButton.addEventListener(
  "click",
  () => {
    if (bgMusic.paused) {
      bgMusic.volume = 0.25;
      bgMusic.play();
    }
  },
  { once: true }
);

flipButton.addEventListener("click", flipCard);
restartButton.addEventListener("click", askToRestart);
cancelRestartButton.addEventListener("click", cancelRestart);
confirmRestartButton.addEventListener("click", restartGame);