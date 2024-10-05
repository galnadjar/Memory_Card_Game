const cardsArray = [
  { name: "crocodile", img: "assets/images/crocodile.png" },
  { name: "elephant", img: "assets/images/elephant.png" },
  { name: "gorilla", img: "assets/images/gorilla.png" },
  { name: "lion", img: "assets/images/lion.png" },
  { name: "monkey", img: "assets/images/monkey.png" },
  { name: "panda", img: "assets/images/panda.png" },
  { name: "snake", img: "assets/images/snake.png" },
  { name: "zebra", img: "assets/images/zebra.png" },
];

// Duplicate cards to create pairs
let gameCards = [...cardsArray, ...cardsArray];

// Shuffle the cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let moves = 0; // Track number of moves

// Increment moves and update the display
function incrementMoves() {
  moves++;
  document.getElementById("moves-count").textContent = `Moves: ${moves}`;
}

// Function to create card elements
function createCard(cardData) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const frontFace = document.createElement("div");
  frontFace.classList.add("front");
  const image = document.createElement("img");
  image.src = cardData.img;
  frontFace.appendChild(image);

  const backFace = document.createElement("div");
  backFace.classList.add("back");

  cardInner.appendChild(frontFace);
  cardInner.appendChild(backFace);
  card.appendChild(cardInner);

  card.addEventListener("click", flipCard);
  card.dataset.name = cardData.name;

  return card;
}

// Flip card function
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;
    incrementMoves(); // Count each move
    checkForMatch();
  }
}

// Check if two flipped cards match
function checkForMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

// If cards match, keep them flipped
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  matchedPairs++;
  console.log("matched")
  console.log("matching pairs now are: " + matchedPairs)
  resetBoard();

  // Check if game is over
  if (matchedPairs === cardsArray.length) {
    setTimeout(() => {
      submitScore();
    }, 500);
  }
}

// If cards don't match, flip them back
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

// Reset first and second card variables
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Send score to the backend
function submitScore() {
  fetch('http://localhost:3000/api/submit-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score: moves }),
  })
  .then(response => response.json())
  .then(data => {
    alert(`Congratulations, you won in ${moves} moves! Highest score: ${data.highestScore}`);
  })
  .catch(error => console.error('Error:', error));
}

// Fetch highest score when the game starts
function fetchHighestScore() {
  fetch('http://localhost:3000/api/highest-score')
    .then(response => response.json())
    .then(data => {
      document.getElementById("highest-score").textContent = `Highest Score: ${data.highestScore || 'N/A'}`;
    })
    .catch(error => console.error('Error:', error));
}

// Initialize the game board with shuffled cards
function initGameBoard() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  shuffle(gameCards).forEach(card => {
    gameBoard.appendChild(createCard(card));
  });

  moves = 0; // Reset moves
  matchedPairs = 0;
  document.getElementById("moves-count").textContent = "Moves: 0";
  fetchHighestScore(); // Fetch the highest score at the start
}

// Restart game
document.getElementById("reset-btn").addEventListener("click", initGameBoard);

// Start the game for the first time
initGameBoard();
