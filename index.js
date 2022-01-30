import Player from './Player.js';
import Background from './background.js';
import Obstacle from './Obstacles.js';

// ===== GLOBAL VARIABLES ========================================================================================================
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 550;

let obstacles = [];
let score = 0;
let highscore = 0;
let animationId;

const tryAgainBtn = document.getElementById('tryAgainBtn');
const highscoreScreen = document.getElementById('highestScore');
const gameOverScreen = document.getElementById('gameOverScreen');
const startGame = document.getElementById('startGame');
const credits = document.getElementById('credits');
const creditsBtn = document.getElementById('creditsBtn');
const goBackBtn = document.getElementById('goBackToHomeScreen');
const backgroundAudio = new Audio('./assets/MusicAndSounds/bestbuddies.mp3');
const jumpingSound = new Audio('./assets/MusicAndSounds/Jumping.mp3');
const youPopped = new Audio('./assets/MusicAndSounds/duunk.mp3');
const darylComplaining = new Audio('./assets/MusicAndSounds/Squirrel.mp3');

let startGameScreen = document.getElementById('startGameScreen');

startGameScreen = new Image();
startGameScreen.src = './assets/StartScreen.png'

// ===== GAME FUNCTIONS ========================================================================================================

//RESPONSIBLE FOR CALLING THE BACKGROUND MUSIC AND LOOPING IT
backgroundAudio.play();
backgroundAudio.loop = true;


//=========================================================================

//NOTE: THIS CODE IS STILL MISSING INHERITANCE!!!!!!!!!!!!


//=========================================================================



//BUTTONS ON THE HOME SCREEN
startGameBtn.addEventListener('click', function(){
  animate();
  startGame.style.display = "none";
  gameOverScreen.style.display = "none";
  showCredits.style.display = "none";
})

creditsBtn.addEventListener('click', function(){
  startGame.style.display = "none";
  gameOverScreen.style.display = "none";
  showCredits.style.display = "block";
})

goBackBtn.addEventListener('click', function () {
  startGame.style.display = "block";
  gameOverScreen.style.display = "none";
  showCredits.style.display = "none";
})

//GENERATES RANDOM NUMBERS BETWEEN MIN AND MAX
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//INPUTHANDLER
class InputHandler {
  constructor(player) {
    this.keys = {};
    this.player = player;
    this.init();
  }

  init() {
    document.addEventListener('keydown', (event) => {
      this.keys[event.code] = true;
      event.preventDefault();
    });

    document.addEventListener('keyup', (event) => {
      this.keys[event.code] = false;
      this.player.isJumping = false;
    });
  }

  update() {
    if(this.player.grounded) {
    }
    if (
      (this.keys['Space'] || this.keys['ArrowUp']) &&
      this.player.grounded()
    ) {
      if (!this.player.isJumping) {
        this.player.isJumping = true;
        jumpingSound.play();
      }
    }

    if (
      (this.keys['ArrowDown'] || this.keys['KeyS']) &&
      !this.player.grounded()
    ) {
      this.player.velocity += 5;
    }
  }
}

//TIMEOUT FUNCTION
function timeOutTimeType() {
  if (obstacle.type === 0) {
    return 5000;
  } else {
    return getRandomNumber(1000, 8000);
  }
}

//PUSHES NEW OBSTACLES TO THE OBSTACLE ARRAY AND CALLS SETTIMEOUT
function handleObstacles() {
  obstacles.push(new Obstacle(canvas.width, canvas.height, ctx));
  setTimeout(handleObstacles, timeOutTimeType());
}

//GAMEOVER FUNCTION
function gameOverFunction() {
  backgroundAudio.pause();
  tryAgainBtn.style.display = "block";
  gameOverScreen.style.display = "block";
  ctx.font = '40px actionJ';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText('Daryl popped!', canvas.width / 2, 200);
  
  highscoreScreen.textContent = highscore;
  highscoreScreen.style.display = "flex";
  highscoreScreen.style.justifyContent = 'center';
  highscoreScreen.style.alignItems = 'center';

  console.log('GAME OVER');
}

//DISPLAYSCORE
function displayScore(ctx) {
  ctx.fillStyle = 'black';
  let scoreToString = score.toString();
  ctx.font = '20px Courier';
  ctx.fillText('Squirrelmeter Score: ' +  scoreToString, canvas.width/1.5, 50);
}

//COLLISION DETECTION
function squaresColliding(player, block) {
  let object1 = Object.assign(
    Object.create(Object.getPrototypeOf(player)),
    player
  );
  let object2 = Object.assign(
    Object.create(Object.getPrototypeOf(block)),
    block
  );
  object2.x = object2.x + 10;
  object2.y = object2.y + 10;
  return !(
    object1.x > object2.x + object2.width ||
    object1.x + object1.width < object2.x ||
    object1.y > object2.y + object2.height ||
    object1.y + object1.height < object2.y
  );
}

//IMPORT
const player = new Player(canvas.width, canvas.height, ctx);
const input = new InputHandler(player);
const background = new Background(canvas.width, canvas.height, ctx);
const obstacle = new Obstacle(canvas.width, canvas.height, ctx);

function isPlaying(audio) { return !audio.paused; } //CHECK IF SOUND STILL PLAYING

//ANIMATES THE GAME, HEART OF THE CODE
function animate() {

  //CLEARING THE CANVAS AFTER EVERY FRAME
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score++;

  //INCREASING THE SPEED AFTER CERTAIN SCORE
  if (score >= 1000) {
    obstacle.slideSpeed = 50;
    background.speed = 15;
  } else if (score >= 1200) {
    obstacle.slideSpeed = 80;
    background.speed = 45;
  } else if (score >= 1500) {
    obstacle.slideSpeed = 110;
    background.speed = 45;
  } else if (score >= 1800) {
    obstacle.slideSpeed = 130;
    background.speed = 60;
  }

  animationId = requestAnimationFrame(animate);

  background.draw(ctx);
  background.update();
  player.draw(ctx);
  player.update(input);
  input.update();
  displayScore(ctx);
  isPlaying(backgroundAudio);

  //CANCELS THE ANIMATION FRAME AFTER COLLISION AND CALLS GAME OVER FUNCTION
  obstacles.forEach((obstacle, index) => {
    obstacle.update();
    if (squaresColliding(player, obstacle)) {
      if(score >= highscore){
        highscore = score;
      }
      youPopped.play();
      cancelAnimationFrame(animationId);
      gameOverFunction();
      darylComplaining.play();
    }

    if (obstacle.x + obstacle.width <= 0) {
      setTimeout(() => {
        obstacles.splice(index, 1);
      }, 0);
    }
    
  });
}

//SETS DIFFERENT TIMEOUTS FOR DIFFERENT OBSTACLES
if (obstacle.type === 0) {
  setTimeout(() => {
    handleObstacles();
  }, 5000);
} else {
  setTimeout(() => {
    handleObstacles();
  }, 1000);
}



//TRYAGAIN BUTTON, RESETTING THE GAME
tryAgainBtn.addEventListener('click', function () {

  //CLEARING OBSTACLE ARRAY
  obstacles.length = 0;

  //SETTING SCORE TO 0
  score = 0;

  //RESETS SPEED
  player.speed = 0;
  background.speed = 8;
  obstacle.slideSpeed = 15;

  //RESET ALL CSS AND HTML CONTENT
  startGame.style.display = "none";
  gameOverScreen.style.display = "none";
  showCredits.style.display = "none";

  //RESET AUDIO
  backgroundAudio.currentTime = 0;
  backgroundAudio.play();
  
  //RECALL THE ANIMATE FUNCTION AND LOOP THE GAME AGAIN
  animate();
});
