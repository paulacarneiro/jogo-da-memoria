const gameElement = document.getElementById('game');
const homeElement = document.getElementById('home');
const newGameButton = document.getElementById('new-game');
const scoreElement = document.getElementById('score');

gameElement.style.display = 'none';
scoreElement.style.display = 'none';

newGameButton.onclick = startNewGame;

let [firstCard, secondCard] = [null, null];

let numberOfMatches = 0;
const lastMatch = 10;

const cards = document.querySelectorAll('.card');

function startNewGame() {
  resetCards();
  shuffleCards();

  cards.forEach(card => {
    card.addEventListener('click', handleClick);
  });

  homeElement.style.display= 'none';
  gameElement.style.display = 'flex';
}

// GAME FUNCTIONS

function flipCard(card) {
  card.classList.add('flipped');
  card.removeEventListener('click', handleClick);
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
};

function unflipCards() {
  firstCard.classList.remove('flipped');
  secondCard.classList.remove('flipped');
  firstCard.addEventListener('click', handleClick);
  secondCard.addEventListener('click', handleClick);
  resetCards();
}

function gameOver() {
  console.log('game over');
  setTimeout(() => {
    gameElement.style.display= 'none';
    homeElement.style.display = 'flex';
    // scoreElement.style.display = 'block';
  }, 2000);
  
}

function checkForMatch() {
  if (firstCard.dataset.character !== secondCard.dataset.character) {
    setTimeout(() => {
      unflipCards();
    }, 1500);
    return;
  }
  numberOfMatches++;
  if (numberOfMatches === lastMatch) {
    gameOver();
    return;
  }
  
  resetCards();
  
}

function handleClick() {
  if (!firstCard) {
    firstCard = this;
    flipCard(this);
    return ;
  }
  if (!secondCard && firstCard != this) {
    secondCard = this;
    flipCard(this);
    checkForMatch();
  }
}

function shuffleCards() {
  cards.forEach(card => {
    const position = Math.floor(Math.random() * 20);
    card.style.order = position;
  });
};