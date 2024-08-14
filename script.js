let cards = [];
let flippedCards = [];
let matches = 0;
let attempts = 0;
let timeLeft = 60;
let timerInterval;

// Code to shuffle cards

function shuffleCards() {
    let gameBoard = document.getElementById('game-board');
    let cardElements = [...gameBoard.children];
    for (let card of cards) {
        card.style.order = Math.floor(Math.random() * cardElements);
    }
};

function initialiseGame() {
    cards = 
}