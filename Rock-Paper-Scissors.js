const scores = JSON.parse(localStorage.getItem('scores')) || {
    wins : 0,
    loses : 0,
    ties : 0
  };

show_score();

let isAutoPlaying = false;
let intervalId; 

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove()
      playGame(playerMove);
  }, 1000);
  isAutoPlaying = true
  document.querySelector('.js-auto-play-text').innerHTML = 'playing..';
}  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-text').innerHTML = 'Autoplay';
  }  
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });


function playGame(playerMove)
{
  const computerMove = pickComputerMove();
  
  let result = '';
  
  if (playerMove === 'paper')
  {
      if (computerMove === 'rock')
    {
      result = 'You win.';
    }
    else if (computerMove === 'paper')
    {
      result ='Tie.';
    }
    else if (computerMove === 'scissors')
    {
      result = 'You lose.';
    }
  }
  else if (playerMove === 'scissors') 
  {
    if (computerMove === 'rock')
    {
      result = 'You lose.';
    }
    else if (computerMove === 'paper')
    {
      result = 'You win.';
    }
    else if (computerMove === 'scissors')
    {
      result = 'Tie.';
    }
  }
  else if (playerMove === 'rock')
  {      
    if (computerMove === 'rock')
    {
      result = 'Tie.';
    }
    else if (computerMove === 'paper')
    {
      result = 'You lose.';
    }
    else if (computerMove === 'scissors')
    {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    scores.wins += 1;
  } else if (result === 'You lose.') {
    scores.loses += 1;
  } else if (result === 'Tie.') {
    scores.ties += 1;
  }

  localStorage.setItem('scores', JSON.stringify(scores))
  /* becouse set item only takes strings we have to conver our objct to a string using json*/
  
  document.querySelector('.js-result').innerHTML = result;
  
  document.querySelector('.js-moves').innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-emoji">
    <img src="images/${computerMove}-emoji.png" class="move-emoji">
    Computer`;

  show_score();

}

function show_score() {
  document.querySelector('.js-scores').innerHTML = `wins: ${scores.wins} loses: ${scores.loses} ties: ${scores.ties}`;
}

function pickComputerMove()
{
  const randomNumber = Math.random();

  let computerMove = '';
  
  if (randomNumber >= 0 && randomNumber < 1/3)
  {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1/3 && randomNumber < 2/3)
  {
    computerMove = 'paper';
  }
  else if (randomNumber >= 2/3 && randomNumber < 1)
  {
    computerMove = 'scissors';
  }

  return computerMove;

}