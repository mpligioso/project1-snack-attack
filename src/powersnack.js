//DEFINITIONS
//-----------
window.onload = function () {

// function Animation(frameSet, delay){
//   this.count = 0;
//   this.delay = delay;
//   this.frame = 0;
//   this.frameIndex = 0;
//   this.frameSet = frameSet
// }

// Animation.prototype.change = function (frameSet, delay=15){
//   if(this.frameSet != frameSet){
//     this.count = 0;
//     this.delay = delay;
//     this.frameIndex = 0;
//     this.frameSet = frameSet,
//     this.frame = this.frameSet[this.frameIndex]
//   }
// }

// Animation.prototype.update = function(){
//   this.count ++;
//   if (this.count >= this.delay){
//     this.count = 0;

//     this.frameIndex = (this.frameIndex == this.frameSet.length-1) ? 0: this.frameIndex + 1;
//     this.frame = this.frameSet[this.frameIndex];
//   }
// }

// spriteSheet = {
//   frameSets: [[0,1,2,3,4,],[5,6,7,8,9]], //to right, to left
//   image: new Image()
// };

// spriteSheet.image.src = "./images/pacman-spritesheet-movements.png"

function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("perload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

// Sound.prototype.fadeOutAudio = function (){
//     if(status != 'play') {
//       return false;
//     }

//     var actualVolume = this.sound.volume;
//     var fadeOutInterval = setInterval(function(){
//         actualVolume = (parseFloat(actualVolume) - 0.1).toFixed(1);
//         if(actualVolume >= 0){
//             this.sound.volume = actualVolume;
//         } else {
//             this.sound.pause();
//             status = 'pause';
//             clearInterval(fadeOutInterval);
//         }
//     }, 50);
// }

// function Player (myImage){
function Player (myImage){
  this.image = myImage;
  this.width = 70;
  this.height = 70;

  this.x = 400;
  this.y = 300;

  this.speed = 10;
  this.points = 0;
  // this.direction = undefined;

  // animation = new Animation();
}

// loop = function () {
//   if (newPlayer.direction === "right"){
//     newPlayer.animation.change(spriteSheet.frameSet[0], 15);
//   }

//   if (newPlayer.direction === "left"){
//     newPlayer.animation.change(spriteSheet.frameSet[1], 15);
//   }

//   render();
//   window.requestAnimationFrame(loop);
// }

// render = function(){
//   ctx.drawImage(sprite_sheet.image, player.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.floor(player.x), Math.floor(player.y), SPRITE_SIZE, SPRITE_SIZE);
// }



Player.prototype.draw = function(){
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}
// Player.prototype.render = function () {

//   ctx.clearRect(0, 0, this.width, this.height);

//   ctx.drawImage(
//   this.image,
//   0,
//   frameIndex * this.width / numberOfFrames,
//   0,
//   this.width / numberOfFrames,
//   this.height,
//   0,
//   0,
//   this.width / numberOfFrames,
//   this.height);
// };

// Player.prototype.update = function () {
//       this.tickCount += 1;
//       if (this.tickCount > this.ticksPerFrame) {
//         tickCount = 0;
//           // Go to the next frame
//           if (frameIndex < numberOfFrames - 1) {
//             // Go to the next framethat
//             frameIndex += 1;
//           } else {
//             frameIndex = 0;
//           }
//         };
// }

// function gameLoop (player) {
//   player.update();
//   player.render();
// }

Player.prototype.move = function(){
  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 38:
        if (this.y - this.speed > this.speed){
        this.y -= this.speed;
        this.direction = "up";
        };
        e.preventDefault()
        break;
      case 40:
        if (this.y + this.speed < canvas.height-this.speed){
        this.y += this.speed;
        this.direction = "down";
        };
        e.preventDefault()
        break;
      case 37:
        if (this.x - this.speed > this.speed){
        this.x -= this.speed;
        this.direction = "left";
        };
        e.preventDefault()
        break;
      case 39:
        if (this.x + this.speed < canvas.width-this.speed) {
        this.x += this.speed;
        this.direction = "right";
        };
        e.preventDefault()
        break;
      }
    }
};

Player.prototype.receivePoints = function (snack) {
  this.points += snack.points;
};

Player.prototype.receiveSpeed = function (snack){
  if (snack.hasSpeed){
    this.speed += snack.speed;
  };
}

//snack model
function Snack(myImage, width, height) {
  this.image = myImage;
  this.width = width;
  this.height = height;

  this.x = Math.floor(Math.random()* (canvas.width-50));
  this.y = Math.floor(Math.random()* (canvas.height-50));

  this.isEaten = false;

  this.isGood = true;

  this.hasSpeed = false;
  this.speed = undefined;
  this.points = 5;

  // this.density = 5;
}

Snack.prototype.draw = function(){
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  if (this.hasMovement){
    this.x += this.vx;
    this.y += this.vy;
  }
}

// Snack.prototype = Object.create(Player.prototype)

function SuperSnack (myImage, width, height){
  Snack.call(this, myImage, width, height);
  this.x = Math.floor(Math.random()* (canvas.width-30));
  this.y = Math.floor(Math.random()* (canvas.height-30));
  this.isBonus = true;
  this.points = Math.floor(Math.random() * 50)
  // this.density = 0;
}

SuperSnack.prototype = Object.create(Snack.prototype)

function MovingSnack (myImage, width, height){
  Snack.call(this, myImage, width, height);
  this.x = canvas.width;
  this.vx = Math.floor(Math.random()* 10);
  this.vy = Math.floor(Math.random()* 10);
  this.hasMovement = true;
  this.points = 5;
}

MovingSnack.prototype = Object.create(Snack.prototype)

//CANVAS
//---------------

var canvas = document.getElementById('snackboard');

var ctx = canvas.getContext('2d');
var timer = 10;

// Images

var playerImg = new Image();
playerImg.src = "./images/character.png"

//++ Foods
var friesImg = new Image();
friesImg.src = "./images/fries1.png"

var burgerImg = new Image();
burgerImg.src = "./images/burger.png"

var hotdogImg = new Image();
hotdogImg.src = "./images/hotdog.png"

var tacoImg = new Image();
tacoImg.src = "./images/taco.png"


//BONUS FOODS
var icelollyImg = new Image();
icelollyImg.src = "./images/icelolly.png"

var donutImg = new Image();
donutImg.src = "./images/donut1.png"

var pizzaImg = new Image();
pizzaImg.src = "./images/pizza1.png"


//-- Foods
var tomatoImg = new Image();
tomatoImg.src = "./images/Tomato.png"

var turnipImg = new Image();
turnipImg.src = "./images/Turnip.png"

var eggplantImg = new Image();
eggplantImg.src = "./images/Eggplant.png"

var onionImg = new Image();
onionImg.src = "./images/Onion.png"

var bananaImg = new Image();
bananaImg.src = "./images/banana.png"

var carrotImg = new Image();
carrotImg.src = "./images/carrot.png"

var poivronImg = new Image();
poivronImg.src = "./images/poivron.png"

var pumpkinImg = new Image();
pumpkinImg.src = "./images/pumpkin.png"

//Audio files
var winningMusic = new Sound("./sounds/applause3.mp3");
var losingMusic = new Sound("./sounds/fail.wav")
var backgroundMusic = new Sound("./sounds/background-music.mp3")
var badFood = new Sound("./sounds/badfood.wav")
var superBonus = new Sound("./sounds/Bonus.wav")


var newPlayer = new Player(playerImg);

var badSnackImages = [eggplantImg,
  onionImg,
  turnipImg,
  tomatoImg,
  bananaImg,
  poivronImg,
  pumpkinImg,
  carrotImg];

var goodSnackImages = [friesImg,
burgerImg,
hotdogImg,
tacoImg,
icelollyImg,
donutImg,
pizzaImg];

// var superSnackImages = [icelollyImg,
// donutImg,
// pizzaImg];

var fixedSnacks = [];

var movingSnacks = [];

var stableSnacks = [];

function checkCollision(objA, objB){
  return objA.x < objB.x + objB.width &&
  objA.x + objA.width > objB.x &&
  objA.y < objB.y + objB.height &&
  objA.height + objA.y > objB.y;
}

var isOver = false;

$('.game-over').hide();

function isGameOver(){
  if (timer < 0){
    isOver = true;

    $('.game-over').fadeIn(500);

    if (newPlayer.points > 100) {
      $("#winner").show();
      winningMusic.play();
    } else {
      $("#loser").show();
      losingMusic.play()
    }

    $('.try-btn').click(function() {
      $('.game-over').hide();
      runGame();
    });
  }
};


function startCountdown() {
  timerCountdown =
  setInterval(() => {
      if (timer >= 0){
        $('.timer span').text(timer);
        timer --;
        };
      }, 1000);
    };


// function initSuperSnacks(){
//   for (var i =0; i < 3; i++){
//     stableSnacks.push(new SuperSnack(donutImg, 40, 40));
//     console.log(stableSnacks)
//   };

//   stableSnacks = stableSnacks.filter((item) => {
//     return Math.abs(newPlayer.x - item.x) > 50 || Math.abs(newPlayer.y - item.y) > 50;
//   });
// }

function addingSnacks() {
  addSnacks =
  setInterval(() => {
    var randomNumber = Math.floor(Math.random() * badSnackImages.length)
    var fixedImage = badSnackImages[randomNumber];
    var height = 50;

    var newSnack = new Snack(fixedImage, 50, height);
    newSnack.isGood = false;
    if (fixedImage === onionImg){
      newSnack.speed = 5;
    }

    // if (fixedImage === tomatoImg || fixedImage === eggplantImg ||
    //   fixedImage === onionImg || fixedImage === turnipImg){
    //   newSnack.isGood = false;
      newSnack.points *= -1;
    // }
    if(fixedSnacks.length < 7){
      fixedSnacks.push(newSnack);
    };
  }, 600)
};


function addingMovingSnacks() {
  addMovingSnacks =
  setInterval(() => {
    var randomNumber = Math.floor(Math.random() * goodSnackImages.length)
    var fixedImage = goodSnackImages[randomNumber];
    var height = 50;

    var newSnack = new Snack(fixedImage, 50, height);
    if (fixedImage === pizzaImg || fixedImage === donutImg
    || fixedImage === icelollyImg) {
      newSnack.hasSpeed = true;
    };
    if (fixedImage === pizzaImg) {
      newSnack.speed = 20;
    }
    if (fixedImage === donutImg) {
      newSnack.speed = 30;
    }
    if (fixedImage === icelollyImg){
      newSnack.speed = 40;
    };

    if(movingSnacks.length < 5){
      movingSnacks.push(newSnack);

    };
  }, 800)
};

// function updateSnackMovement(){
//   isMoving =
//   setInterval(() => {
//     ctx.clearRect(0,0, canvas.width, canvas.height);
//     movingSnacks.forEach(function(oneSnack){
//       oneSnack.draw();
//       oneSnack.x += oneSnack.vx;
//       oneSnack.y += oneSnack.vy;
//     })
//   },20)
// }

function updateSnacks(snackArray) {
  snackArray.forEach((oneSnack) => {
    var isCollision = checkCollision(newPlayer,oneSnack);
    if (isCollision){
      oneSnack.isEaten = true;
      newPlayer.receivePoints(oneSnack)
      newPlayer.receiveSpeed(oneSnack)
      if (!oneSnack.isGood){
        badFood.play();
      }
      if (oneSnack.isBonus){
        superBonus.play();
      }
    }
    oneSnack.draw();
  });

  return snackArray.filter(function(oneSnack){
    return !oneSnack.isEaten;
  });
};

function resetSpeed(){
  setInterval(function(){
    newPlayer.speed = 10
  }, 10000)
}


function initGame () {
  if(!isOver){
    backgroundMusic.play();
  }
  drawGame =
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    newPlayer.draw();
    newPlayer.move();

    $('.points span').text(newPlayer.points);

    stableSnacks = updateSnacks(stableSnacks);
    fixedSnacks = updateSnacks(fixedSnacks);
    movingSnacks = updateSnacks(movingSnacks);


    isGameOver();
    if(isOver){
      clearInterval(drawGame);
      clearInterval(addSnacks);
      clearInterval(timerCountdown);
      backgroundMusic.stop()
      ctx.clearRect(0,0,canvas.width,canvas.height)
    }
  }, 1000/30);
};

function resetGame(){
  isOver = false;
  timer = 60;
  stableSnacks = []
  fixedSnacks = []
  newPlayer.points = 0;
}

function runGame() {
  resetGame();
  startCountdown();
  resetSpeed();
  // initSuperSnacks();
  addingSnacks();
  addingMovingSnacks();
  initGame();
};


// DOM && Other
//----------------------------

// var $gameOverDiv =
// ("<div class='game-over'></div>");

// var $winner =
// ("<img src='./images/win.gif'><br><button class='try-btn btn'>PLAY AGAIN</button>");

// var $loser =
// ("<img src='./images/lose.gif'><br><button class='try-btn btn'>TRY AGAIN</button>")

// $(document).ready(function() {


  $('.start-btn').click(() => {
    $('.start-page').fadeOut('2');
    runGame();

  });

  $('.instructions').hide();

$('.how-to').click(()=> {
  $('.instructions').toggle();
  $('.side-style').toggle();
})

$('.return-btn').click(() => {
  $('.instructions').hide();
  $('.side-style').toggle();
});


// });

  // $($gameOverDiv).hide().appendTo(".layout").fadeIn(500);

};

