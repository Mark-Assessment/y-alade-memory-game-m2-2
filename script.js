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
});

// Function to create cards
function createCard(card, index) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    // cardElement.dataset.index('index');
    cardElement.dataset.index = index;
    cardElement.innerHTML = `
        <div class = 'card card-inner'>
            <div class = 'card-front'> Card with no image
                <img src='assets/images/card-back.png' alt='Card Back'>
            </div>

            <div class = 'card-back'> Card with image
                <img src='${card.image}' alt='Card Front'>
            </div>
        </div>
        `;
    // cardElement.addEventListener('click', flipCard);
    return cardElement;
}

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
  console.log("cards array in initialize game = ", cards)
  cards.forEach((card, index) => {
    gameBoard.appendChild(createCard(card, index));
  });
}

// function turnCard() { 
//     let box = document.getElementsByClassName('card'); 
//     box.addEventListener('click', flipCard); 
// } 

// function changeCard() { 
     
// };



