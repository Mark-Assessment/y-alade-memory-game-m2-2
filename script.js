const gameBoard = document.getElementById('game-board');
const timer = document.getElementById('timer');
const matchesCounter = document.getElementById('matches');
const attemptsCounter = document.getElementById('attempts');
const resetButton = document.getElementById('reset-button');


let cards = [];
let flippedCards = [];
let matches = 0;
let attempts = 0;
let timeLeft = 60;
let gameInterval;

const cardData = [
    {image: 'assets/images/circle.png'},
    {image: 'assets/images/diamond.png'},
    {image: 'assets/images/heart.png'},
    {image: 'assets/images/hexagon.png'},
    {image: 'assets/images/pentagon.png'},
    {image: 'assets/images/square.png'},
    {image: 'assets/images/star.png'},
    {image: 'assets/images/triangle.png'},
];

// Create copies of card data to create pairs
let gameCards = [...cardData, ...cardData];


document.addEventListener('DOMContentLoaded', () => {
    initialiseGame();
    card = [...document.getElementsByClassName('card')];
    card.style.backgroundColor('white');

});

// Function to create cards
function createCard(card, index) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index('index');
    cardElement.innerHTML = `
        <div class = 'card-inner'>
            <div class = 'card-front'>
                <img src='${card.image}' alt = 'Card Front'>Card with image</img>
            </div>

            <div class = 'card-back'>
                <img src='' alt = 'Card Back'>Card with no image</img>
            </div>
        </div>
        `;
    cardElement.addEventListener('click', flipCard);
    return cardElement;
}

// Function to shuffle cards
function shuffleCards() {
    let gameBoard = document.getElementById('game-board');
    let cardElements = [...gameBoard.children];
    for (let card of cardElements) {
        card.style.order = Math.floor(Math.random() * cardElements.length);
    }
};

// Initialise game
function initialiseGame() {
    shuffleCards ();
    cards = [...document.getElementsByClassName('card')];
    cards = document.getElementById('test1');
    for (let card of cards) {
        // card.style.backgroundColor.remove('white');
        cards.addEventListener('click', flipCard);
    }    
}

function turnCard() { 
    let box = document.getElementsByClassName('card'); 
    box.addEventListener('click', flipCard); 
} 

// function changeCard() { 
     
// };

function flipCard() {
    const cardChanger = document.getElementsByClassName('card'); 
    cardChanger.classList.toggle("hide");

    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }

    if (flippedCards.length < 2 && !flippedCards.includes(this) && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        card.classList.remove('hide');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            document.getElementById('attempts').textContent = attempts;
            attempts++;
            setTimeout(checkMatch, 1000);
        }
    }
};

//Check if cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matches++;
        document.getElementById('matches').textContent = matches;
        if (matches === cards.length / 2) {
            alert('You have made a match!')
            // endGame(true);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];
}


document.getElementById('reset-button').addEventListener('click', resetGame);

// Function to restart the game
function resetGame() {
    document.getElementById('matches').textContent = matches;
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('time').textContent = timeLeft;
    matches = 0;
    attempts = 0;
    timeLeft = 60;
    gameStarted = false;
    clearInterval(timerInterval);
    for (const card of cards) {
        card.classList.remove('matched', 'flipped');
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


