import {runAnim} from '/tagAnim.js';


const button = document.getElementById('restart');
button.style.opacity = 0;

const showButton = function() {
  console.log('Done');
  button.style.opacity = 1;
  button.addEventListener('click', runGame);
}


const runGame = function() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let boxIndexVal = new Array(9).fill('');

  let nextMove = 'X';
  let isGameOver = false;
  let gameMess = document.querySelector('.game');
  let nextTurn = document.querySelector('#next-player');

  nextTurn.innerHTML = 'Next player: X';
  gameMess.innerHTML = 'Game ON';
  button.style.opacity = 0;

  document.querySelectorAll('.box').forEach((element) => {
    element.innerHTML = '';
    element.addEventListener('click', event => handleClickOnBox(event))
  });
  const handleClickOnBox = (event) => {
    if (!isGameOver) {
      let boxIndex = event.target.dataset.boxIndex;
      if (event.target.getInnerHTML() !== '' || isGameOver) {
        console.log('Already taken');
        return;
      }
      event.target.innerHTML = nextMove;
      runAnim(nextMove, event.target);
      boxIndexVal[boxIndex] = nextMove;
      checkWinner();
      changePlayer();
      
      
    }
    return false;
  }
  const changePlayer = function() {
    nextMove = nextMove === 'X' ? 'O' : 'X';
    nextTurn.innerHTML = `Next player: ${nextMove}`;
  }
  const checkWinner = function() {
    for (let i = 0; i <= 7; i++) {
      let winningCondition = winConditions[i];

      if (
        boxIndexVal[winningCondition[0]] == '' ||
        boxIndexVal[winningCondition[1]] == '' ||
        boxIndexVal[winningCondition[2]] == ''
      ) {
        console.log(boxIndexVal);
        continue;
      } else if (
        boxIndexVal[winningCondition[0]] ==
        boxIndexVal[winningCondition[1]] &&
        boxIndexVal[winningCondition[1]] ==
        boxIndexVal[winningCondition[2]]

      ) {
        gameMess.innerHTML = `Winner : ${nextMove} `
        isGameOver = true;
        showButton();
        break;
      } else if (
        !(boxIndexVal[winningCondition[0]] ==
          boxIndexVal[winningCondition[1]] &&
          boxIndexVal[winningCondition[1]] ==
          boxIndexVal[winningCondition[2]]) &&
        boxIndexVal.indexOf('') == -1
      ) {
        gameMess.innerHTML = `Draw`;
        isGameOver = true;
        showButton();
      }
    }
  }
}
runGame();
//Handle boxClick 
//ChangeNextMove
//checkWinner
//draw 
