let score = JSON.parse(localStorage.getItem('paris')) || { win: 0, lose: 0, tie: 0 };

function updateScoreDisplay() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;
}
let isAutoPlay=false;
let intervalId; 
function autoplay()
{
  if(!isAutoPlay)
  {
    intervalId=setInterval(function()
    {
      const playMove=getComputerMove();
      playGame(playMove);
    },5000);
    isAutoPlay=true;
  }
  else
  {
    clearInterval(intervalId);
    isAutoPlay=false;
  }
}

function playGame(playerMove) {
  const computerMove = getComputerMove();
  const result = getResult(playerMove, computerMove);

  document.querySelector('.js-your-move').innerHTML = `
    ${playerMove} <img class="imgf" src="./${playerMove}-emoji.png" alt="${playerMove}">
  `;
  document.querySelector('.js-computer-move').innerHTML = `
    ${computerMove} <img class="imgf" src="./${computerMove}-emoji.png" alt="${computerMove}">
  `;
  document.querySelector('.js-stat').innerText = result;

  if (result === 'You won!') {
    score.win += 1;
  } else if (result === 'You lost!') {
    score.lose += 1;
  } else {
    score.tie += 1;
  }

  localStorage.setItem('paris', JSON.stringify(score));
  updateScoreDisplay();
}

function getComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return moves[randomIndex];
}

function getResult(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return 'It\'s a tie!';
  }

  if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    return 'You won!';
  }

  return 'You lost!';
}

function resetGame() {
  score = { win: 0, lose: 0, tie: 0 };
  localStorage.removeItem('paris');
  updateScoreDisplay();
  document.querySelector('.js-your-move').innerHTML = '';
  document.querySelector('.js-computer-move').innerHTML = '';
  document.querySelector('.js-stat').innerHTML = 'Status';
}

updateScoreDisplay();