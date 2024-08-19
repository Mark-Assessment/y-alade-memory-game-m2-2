const gameBoard = document.getElementById('game-board');
const timer = document.getElementById('timer');
const matchesCounter = document.getElementById('matches');
const attemptsCounter = document.getElementById('attempts');
const resetButton = document.getElementById('reset-button');


let cards = [];
let flippedCards = [];
let matchesCounter = 0;
let attemptsCounter = 0;
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
});

// Function to create cards
function createCard(card, index) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index('index');
    cardElement.innerHTML = `
        <div class = 'card card-inner'>
            <div class = 'card-front'>
                <img src='${card.image}' alt = 'Card Front'>Card with image</img>
            </div>

            <div class = 'card-back'>
                <img src='assets/images/card-back.png' alt = 'Card Back'>Card with no image</img>
            </div>
        </div>
        `;
    cardElement.addEventListener('click', flipCard);
    return cardElement;
}

// Function to shuffle cards
function shuffleCards(gameCards) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
};

// Function to initialise game
function initialiseGame() {
  shuffleCards(gameCards);
  gameBoard.innerHTML = '';
  cards.forEach((card, index) => {
    gameBoard.appendChild(createCard(card, index));
  });
}

function turnCard() { 
    let box = document.getElementsByClassName('card'); 
    box.addEventListener('click', flipCard); 
} 

// function changeCard() { 
     
// };



