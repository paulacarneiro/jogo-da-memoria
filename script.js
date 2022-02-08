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
  // console.log(firstCard);
  // console.log(secondCard);
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
  // resetCards();
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
    // console.log(firstCard);
    flipCard(this);
    return ;
  }
  if (!secondCard && firstCard != this) {
    secondCard = this;
    // console.log(secondCard);
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

// cards.forEach(card => {
//   card.addEventListener('click', handleClick);
// });


// END GAME FUNCTIONS 

// export const {Game} = {
//   [firstCard, secondCard]: [null,null],
//   match : 0,
//   lastMatch : 10,
  
//   cards : document.querySelectorAll('.card'),

//   flipCard(card) {
//     card.classList.add('flipped');
//     card.removeEventListener('click', handleClick);
//   },

//   resetCards() {
//     [firstCard, secondCard] = [null, null];
//     // console.log(firstCard);
//     // console.log(secondCard);
//   }, 

//   unflipCards() {
//     firstCard.classList.remove('flipped');
//     secondCard.classList.remove('flipped');
//     firstCard.addEventListener('click', handleClick);
//     secondCard.addEventListener('click', handleClick);
//     resetCards();
//   },

//   gameOver() {
//     console.log('go');
//     resetCards();
    
//   },

//   checkForMatch() {
//     if (firstCard.dataset.character !== secondCard.dataset.character) {
//       setTimeout(() => {
//         unflipCards();
//       }, 1500);
//       return;
//     }
//     match++;
//     if (match === 10) {
//       gameOver();
//       return;
//     }
    
//     resetCards();
    
//   },

//   handleClick() {
//     if (!firstCard) {
//       firstCard = this;
//       // console.log(firstCard);
//       flipCard(this);
//       return ;
//     }
//     if (!secondCard && firstCard != this) {
//       secondCard = this;
//       // console.log(secondCard);
//       flipCard(this);
//       checkForMatch();
//     }
//   },

//   shuffleCards() {
//     cards.forEach(card => {
//       const position = Math.floor(Math.random() * 20);
//       card.style.order = position;
//     });
//   },

//   addEventListeners() {
//     cards.forEach(card => {
//       card.addEventListener('click', handleClick);
//     })
//   }
// }