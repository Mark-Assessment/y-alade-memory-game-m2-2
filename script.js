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

}