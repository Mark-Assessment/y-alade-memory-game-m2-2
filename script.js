const gameBoard = document.getElementById('game-board');
const timer = document.getElementById('timer');
const matchesCounter = document.getElementById('matches');
const attemptsCounter = document.getElementById('attempts');
const resetButton = document.getElementById('reset-button');
const modal = document.getElementById('instructionModal');
const btn = document.getElementById('instruction-button');
const closeBtn = document.querySelector('.modal-close');
const endGameModal = document.getElementById('endGameModal');
const endGameTitle = document.getElementById('endGameTitle');
const endGameMessage = document.getElementById('endGameMessage');
const endGameCloseBtn = document.getElementById('endGameCloseBtn');


let cards = [];
let firstCard = '';
let secondCard = '';
let flippedCards = [];
let matches = 0;
let attempts = 0;
let timeLeft = 60;
let gameInterval;
let canFlip = true;
let isGameStarted = false;


const cardData = [
    {image: 'assets/images/circle.png', name: 'circle'},
    {image: 'assets/images/diamond.png', name: 'diamond'},
    {image: 'assets/images/heart.png', name: 'heart'},
    {image: 'assets/images/hexagon.png', name:'hexagon'},
    {image: 'assets/images/pentagon.png', name: 'pentagon'},
    {image: 'assets/images/square.png', name: 'square'},
    {image: 'assets/images/star.png', name: 'star'},
    {image: 'assets/images/triangle.png', name: 'triangle'},
];

// Create copies of card data to create pairs
let gameCards = [...cardData, ...cardData];

// Initialise game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initialiseGame();
});

// Function to create cards
function createCard(card, index) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    cardElement.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="assets/images/card-back.png" alt="Card back">
            </div>
            <div class="card-back">
                <img src="${card.image}" alt="${card.name} shape">
            </div>
        </div>
    `;
    cardElement.addEventListener('click', flipCard);
    return cardElement;
}

// Function to open the modal
function openModal() {
    modal.style.display = 'flex';
}

//Function to close modal by clicking on [x]
function closeModal() {
    modal.style.display = 'none';
}

// Modal event listeners
btn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Close modal hwen clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});


// Function to shuffle cards
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      return cards;
};

// Function to initialise game
function initialiseGame() {
  cards = shuffleCards([...gameCards]);
  gameBoard.innerHTML = '';
  cards.forEach((card, index) => {
    gameBoard.appendChild(createCard(card, index));
  });
  matches = 0;
  attempts = 0;
  timeLeft = 90;
  matchesCounter.textContent = matches;
  attemptsCounter.textContent = attempts;
  timer.textContent = timeLeft;
  clearInterval(gameInterval);
  isGameStarted = false;
  canFlip = true;
  firstCard = null;
  secondCard = null;
}

// Function to turn card
function flipCard() {  
    
    if (!canFlip || this.classList.contains('flipped') || this === firstCard) return;

    this.classList.add('flipped');

    if (!isGameStarted) {
        startTimer();
        isGameStarted = true;
    }

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        canFlip = false;
        checkForMatch();
    }
}
function checkForMatch() {
    attempts++;
    attemptsCounter.textContent = attempts;

    const isMatch = cards[parseInt(firstCard.dataset.index)].name === cards[parseInt(secondCard.dataset.index)].name;

    if (isMatch) {
        matches++;
        matchesCounter.textContent = matches;
        resetCards();
        if (matches === cardData.length) {
            endGame(true);
        }
    } else {
        setTimeout(unflipCards, 1000);
    }
}   
    
function unflipCards() {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetCards();
}
    
function resetCards() {
    [firstCard, secondCard] = [null, null];
    canFlip = true;
}

// Function start timer with first card flip
function startTimer () {
        gameInterval = setInterval(() => {
            timeLeft--;
            timer.textContent = timeLeft;
        if (timeLeft === 0) {
            endGame(false);
        }
    }, 1000);
}

// Show end game message in modal
function showEndGameModal(title, message) {
    endGameTitle.textContent = title;
    endGameMessage.textContent = message;
    endGameModal.style.display = 'flex';
}

function closeEndGameModal() {
    endGameModal.style.display = 'none';
    initialiseGame(); // Game will reset when modal is closed
}

// Function to end game
function endGame(isWin) {
    clearInterval(gameInterval);
    canFlip = false;
    if (isWin) {
        showEndGameModal('Well done!',
            `Well done! You got all the matches in ${attempts} attempts with ${timeLeft} seconds left`
        );
    } else {
        showEndGameModal('Game over',
            `Game over! You found ${matches} matches in ${attempts} attempts.`
        );
    }
}

//Event listener for 'Play Again' button
endGameCloseBtn.addEventListener('click', closeEndGameModal);

// Click outside of modal to close it
window.addEventListener('click', function(event) {
    if (event.target === endGameModal) {
        closeEndGameModal();
    }
});


resetButton.addEventListener('click', initialiseGame)
        







