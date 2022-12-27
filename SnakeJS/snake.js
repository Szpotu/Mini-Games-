const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
/* One of the most recognizable games in history in Vanilla JS */

const tail = [];
let tailSize = 3;

//Class Game 
class Game {
  constructor() {
    this.isFinished = false;
    this.score = 0;
  }
  refreshBoard() {
    ctx.fillStyle = 'rgb(255,255,200)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '20px Arial';
    ctx.strokeStyle = 'black';
    ctx.strokeText('Score:' + this.score, 300, 25);
    return this;
  }
  //Wall collision 
  collision(snakeHeadX, snakeHeadY) { 
    return snakeHeadX == -1 || snakeHeadY == -1 || snakeHeadX * 20 == canvas.width || snakeHeadY * 20 == canvas.width ? false : this;

  }
  //Tail collision
  tailCollision(headX, headY) {
    for (let i = 0; i < tail.length; i++) {
      //Returns true if snake's head position equals one of iterated tail part 
      if (tail[i].x == headX && tail[i].y == headY && headX != 10 && headY != 10) {
        console.log('Tail Collision');
        return true;

      }
    }

  }
  //Every time when snake's head collides with an generated food his tail size increases by 1
  snakeBite(foodX, foodY, snakeHeadX, snakeHeadY, fieldSize, score) {
    if (foodX == snakeHeadX * fieldSize && foodY == snakeHeadY * fieldSize) {
      tailSize++;
      this.score += 5;
      return true;
    }
  }
  //Change snake speed according to increasing score (every 40 points)
  upgradeLevel(mySnake) {
    while (this.score % 40 == 0) {
      this.score += 5;
      console.log('Upgrade');
      mySnake.fps += 5;
    }
  }
  
}
class Food {
  constructor() {
    this.xPos = (Math.floor(Math.random() * 20)) * 20; // Random positive integer between 0-20 * number of squares
    this.yPos = (Math.floor(Math.random() * 20)) * 20; // Random positive integer between 0-20 * number of squares

  }
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.xPos, this.yPos, 20, 20);
  }
}
class Snake {
  constructor() {
    this.fieldSum = 20; // Amount of fileds on board
    this.headPosX = this.fieldSum / 2; // Start position X 
    this.headPosY = this.fieldSum / 2; // Start position Y 
    this.fieldSize = canvas.width / this.fieldSum; 
    this.dx = 0; // Direction X 
    this.dy = 0; // Direction Y 
    this.fps = 6; // Snake speed 
  }
  draw() {
    //Draw Tail
    for (let i = 0; i < tail.length; i++) {
      let element = tail[i];
      ctx.fillStyle = 'red';
      ctx.fillRect(element.x * 20, element.y * 20, this.fieldSum, this.fieldSum);
      ctx.fillStroke ='blue';
    }
    tail.push(new Tail(this.headPosX, this.headPosY));
    while (tail.length > tailSize) {
      tail.shift();
    }
    //Draw head 
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'red';
    ctx.fillRect(this.headPosX * this.fieldSum, this.headPosY * this.fieldSum, this.fieldSize, this.fieldSize);
    return this;
  }
  move() {
    this.headPosX = this.headPosX + this.dx;
    this.headPosY = this.headPosY + this.dy;
    return this;
  }
  turn() {
    window.addEventListener('keyup', key => {
      switch (key.which) {
        case 37:
          if (this.dx != 1) {
            this.dx = -1;
            this.dy = 0;
            break;
          } else {
            break
          }

          case 38:
            if (this.dy != 1) {
              this.dx = 0;
              this.dy = -1;
              break;
            } else {
              break
            }
            case 39:
              if (this.dx != -1) {
                this.dx = 1;
                this.dy = 0;
                break;
              } else {
                break
              }

              case 40:
                if (this.dy != -1) {
                  this.dx = 0;
                  this.dy = 1;
                  break;
                } else {
                  break
                }
      }
    })
  }

}
class Tail {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
//Objects 
let newGame = new Game();
let mySnake = new Snake();
let newFood = new Food();
//Game loop 
const playGame = () => {
  if (newGame.isFinished) {
    newGame = new Game();
    mySnake = new Snake();
    newFodd = new Food();
    playGame(); // Recursively
    return false;
  }
  if (newGame.snakeBite(newFood.xPos, newFood.yPos, mySnake.headPosX, mySnake.headPosY, mySnake.fieldSum, mySnake.score)) {
    newFood = new Food();
    tail.push(newFood);
  };
 
  newGame.upgradeLevel(mySnake);
  newGame.refreshBoard();
  if (!newGame.collision(mySnake.headPosX, mySnake.headPosY)) {
    console.log('Stop');
    newGame.isFinished = true;
  } else if (newGame.tailCollision(mySnake.headPosX, mySnake.headPosY)) {
    newGame.isFinished = true;
    console.log('Fail');
  }

  newFood.draw();
  mySnake.draw().move().turn();

  setTimeout(playGame, 1000 / mySnake.fps);

}
playGame();
// To extend: 
// Use refference to values of 20 instead of values 
// Size of field + color of snake + entry level + CPU vs ? 
