let cards = [];
let flippedCards = [];
let matches = 0;
let attempts = 0;
let timeLeft = 60;
let timerInterval;
let gameStarted = false;

// Code to shuffle cards
function shuffleCards() {
    let gameBoard = document.getElementById('game-board');
    let cardElements = [...gameBoard.children];
    for (let card of cardElements) {
        card.style.order = Math.floor(Math.random() * cardElements.length);
    }
};

function initialiseGame() {
    cards = [...document.getElementsByClassName('card')];
    for (let card of cards) {
        card.addEventListener('click', flipCard);
    }
    shuffleCards ();
}

function flipCard() {
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }

    if (flippedCards.length < 2 && !flippedCards.includes(this) && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        this.style.backgroundColor = this.dataset.color;
        this.querySelector('svg').style.fill = 'white';
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            attempts++;
            document.getElementById('attempts').textContent = attempts;
            setTimeout(checkMatch, 1000);
        }
    }
};

//Check if cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.shape === card2.dataset.shape) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matches++;
        document.getElementById('matches').textContent = matches;
        if (matches === cards.length / 2) {
            endGame(true);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.style.backgroundColor = '#fff';
        card2.style.backgroundColor = '#fff';
        card1.querySelector('svg').style.fill = '';
        card2.querySelector('svg').style.fill = '';
    }
    flippedCards = [];
}

// Function to restart the game
function resetGame() {
    matches = 0;
    attempts = 0;
    timeLeft = 60;
    gameStarted = false;
    document.getElementById('matches').textContent = matches;
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('time').textContent = timeLeft;
    clearInterval(timerInterval);
    for (let card of cards) {
        card.classList.remove('matched', 'flipped');
        card.style.backgroundColor = '#fff';
        card.querySelector('svg').style.fill = '';
    }
    shuffleCards();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

// Initialise the game
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    resetGame();
});