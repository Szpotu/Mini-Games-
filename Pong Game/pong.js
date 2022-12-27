const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.querySelector('.reset');
const scoreDigits = document.querySelectorAll('.score-digit');
//Position score


const deployReset = (element) =>{
    element.style.position = 'absolute';
    element.style.top = 0;
    element.style.fontSize ='30px';
}
const deployScore = (element) =>{
    element.style.display ='inline';
    element.style.position ='relative';
    element.style.fontSize = '40px';
    element.style.margin = '15px';
    element.style.left = `${canvas.width/2-50}px`;
}
// How to assign styles from object/map

canvas.width = 600;
canvas.height = 400;
const drawBoard = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw net 
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
}
class Game {
  constructor(player, cpu, ball) {
    this.currentStriking = null;
    this.player = player;
    this.cpu = cpu;
    this.ball = ball;
    this.speed = 3; 
    this.scoreLeft = 0; 
    this.scoreRight= 0; 

  }
  //Choose who's striking next
  checkStriking() {
      let striker = this.currentStriking;
      if (this.ball.x > canvas.width / 2) {
        this.cpuLvl+=0.1;
        striker = this.cpu;
      } else if(this.ball.x < canvas.width/2) {
        striker = this.player;
        
      }
      //Assign measurments of palette
      let pongPalette = {};
      pongPalette.top = striker.y;
      pongPalette.bottom = striker.y + striker.size;
      pongPalette.left = striker.x;
      pongPalette.right = striker.x +1 ;
      // Assign measurments of ball
      ball.top = ball.y;
      ball.bottom = ball.y + ball.radius;
      ball.left = ball.x;
      ball.right = ball.x + ball.radius;      
      // Check if striker put palette in position that fills conditions below - lacking collisions ..? 
      let isStriking = ball.right > pongPalette.left && ball.bottom > pongPalette.top && ball.left < pongPalette.right && ball.top < pongPalette.bottom;
     
      //
      let player = (ball.x < canvas.width / 2) ? this.currentStriking = this.player : this.currentStriking = this.cpu;
      //Multiplies ball's x direction with speed 
      if (isStriking) {
        let direction = this.ball.x > canvas.width /2 ? -1 : 1; 
        let strikePoint = (ball.y - (player.y + striker.size/2));
        strikePoint = strikePoint / (player.size/2);
        let angRad = strikePoint * Math.PI/4;
        this.ball.dx = direction * this.speed * Math.cos(angRad);
        this.ball.dy = direction * this.speed * Math.sin(angRad);
        this.speed+=1;
        player.size-=2;
      }
    } 
    score(){
        if(this.ball.x > canvas.width){
            this.scoreLeft++; 
            document.querySelector('#score-player-1').innerHTML = this.scoreLeft;
            return true;
            
        }
        else if(this.ball.x < -3){
                this.scoreRight++;
                document.querySelector('#score-player-2').innerHTML = this.scoreRight;
                return true;
        }
        return false; 
        }
    reset(){
        document.querySelector('.reset').addEventListener('click', ()=>{
            
            document.querySelectorAll('.score-digit').forEach( e=>{
                e.innerHTML = 0;
            })
            this.scoreLeft = 0;
            this.scoreRight = 0;
         
            setTimeout(()=>{
                ball.x = canvas.width / 2;
                ball.y = canvas.height / 2;
                ball.dx = 3;
                ball.dy = 3;
                this.player.size = 100;
                this.cpu.size = 100
            },2000);
        })
    }
    }

class Ball {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.dx = 3;
    this.dy = 3;
    this.radius = 10;
  }
  // Draw the ball
  draw() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    return this;
  }
  // Create behaviour for moving ball 
  move() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

  }
}
// Class Rocket 
class PongPalette {
  constructor(side) {
    if (side === 'Left') {
      // Adjust position for a player on left side  
      this.strokeStyle = 'red';
      this.x = 0;
    }
    //Adjust position for a player on right side
    else if (side === 'Right') {
      this.strokeStyle = 'lightgreen';
      this.x = canvas.width;
    }

    this.side = side;
    this.size = 100;
    this.y = canvas.height / 2 ;
    this.width = 10;
    //Remove from cpu 
  }
  draw() {
    let rocketLocation;
    // Variable stores data about x position of rocket 
    if (this.side == 'Left') {
      rocketLocation = 0;
    } else if (this.side == 'Right') {
      rocketLocation = canvas.width;
    }
    ctx.lineWidth = this.width;
    ctx.beginPath();
    ctx.strokeStyle = this.strokeStyle;
    ctx.moveTo(rocketLocation, this.y);
    ctx.lineTo(rocketLocation, this.y + this.size);
    ctx.stroke();
    return this;
  }
  
}

class CPU extends PongPalette {
  constructor(side) {
    super(side);
    this.cpuLvl = 0.1;
  }
  moveAI(ball) {
    this.y += (ball.y - (this.y + this.size / 2)) * this.cpuLvl;

  }
}
class Player extends PongPalette{
    constructor(side){
        super(side);
        this.mouseMoving = window.addEventListener('mousemove',event=>{
            this.y = event.y - this.size/2; 
        }); 
    }
}
// Display text at the beginning 
const startGame = () => {
  ctx.fillStyle = 'white';
  ctx.font = '40px serif';
  ctx.fillText('Click to start', 100, 100, 200);
}
const gameLoop = () => {
  deployReset(resetBtn);
  scoreDigits.forEach(element=>deployScore(element));
  if(game.score()){
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.dx = 0;
        setTimeout(()=>{
            ball.dx = Math.floor(Math.random() * 4 + 1);
            ball.dy = Math.floor(Math.random() * 4 + 1);
            game.speed = 3 ;
            player.size, cpu.size = 100;
        },3000);
        
  }
  drawBoard();
  ball.draw().move();
  player.draw();
  cpu.draw().moveAI(ball);
  game.checkStriking(ball);
  requestAnimationFrame(gameLoop);
  game.reset();
}
const ball = new Ball();
const player = new Player('Left');
const cpu = new CPU('Right');
const game = new Game(player, cpu, ball);
// init screen render 
drawBoard();
startGame();

// Loop game 
gameLoop();
