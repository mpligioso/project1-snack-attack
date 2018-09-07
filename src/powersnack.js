
window.onload = function () {


//DEFINITIONS
//-----------
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


//Player constructor, animation to be developed
function Player (myImage){
  this.image = myImage;
  this.width = 70;
  this.height = 70;

  this.x = 400;
  this.y = 300;

  this.speed = 10;
  this.points = 0;
}

//methods for Player constructor
Player.prototype.draw = function(){
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

Player.prototype.move = function(){
  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 38:
        if (this.y - this.speed > 10){
        this.y -= this.speed;
        };
        e.preventDefault()
        break;
      case 40:
        if (this.y + this.speed < canvas.height-10){
        this.y += this.speed;
        };
        e.preventDefault()
        break;
      case 37:
        if (this.x - this.speed > 10){
        this.x -= this.speed;
        };
        e.preventDefault()
        break;
      case 39:
        if (this.x + this.speed < canvas.width-10) {
        this.x += this.speed;
        };
        e.preventDefault()
        break;
      }
    }
};

Player.prototype.receivePoints = function (snack) {
  this.points += snack.points;
};

//Snack constructor
function Snack(myImage, width, height) {
  this.image = myImage;
  this.width = width;
  this.height = height;

  this.x = Math.floor(Math.random()* (canvas.width-50));
  this.y = Math.floor(Math.random()* (canvas.height-50));

  this.isEaten = false;

  this.isGood = true;
  this.isSuper = false;
  this.isPowerful = false;
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

// Image variables

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
tacoImg];

var superSnackImages = [icelollyImg,
donutImg,
pizzaImg];

var badSnacks = [];

var goodSnacks = [];

var superSnacks = [];

var isOver = false;

//Check if objects have touched

  function checkCollision(objA, objB){
    return objA.x < objB.x + objB.width &&
    objA.x + objA.width > objB.x &&
    objA.y < objB.y + objB.height &&
    objA.height + objA.y > objB.y;
  }

  function startCountdown() {
    timerCountdown =
    setInterval(() => {
        if (timer >= 0){
          $('.timer span').text(timer);
          timer --;
          };
        }, 1000);
      };


  function addingBadSnacks() {
    addBadSnacks =
    setInterval(() => {
      var randomNumber = Math.floor(Math.random() * badSnackImages.length)
      var fixedImage = badSnackImages[randomNumber];
      var height = 50;

      var newSnack = new Snack(fixedImage, 50, height);
      newSnack.isGood = false;

      newSnack.points *= -1;

      if (fixedImage === onionImg){
        newSnack.points = Math.floor(Math.random()*35);
      }
      // }
      if(badSnacks.length < 7){
        badSnacks.push(newSnack);
      };
    }, 600)
  };


  function addingGoodSnacks() {
    addGoodSnacks =
    setInterval(() => {
      var randomNumber = Math.floor(Math.random() * goodSnackImages.length)
      var fixedImage = goodSnackImages[randomNumber];
      var height = 50;

      var newSnack = new Snack(fixedImage, 50, height);

      if(goodSnacks.length < 5){
        goodSnacks.push(newSnack);

      };
    }, 600)
  };

  function addingSuperSnacks(){
    addSuperSnacks =
    setInterval(() => {
      var randomNumber = Math.floor(Math.random() * superSnackImages.length)
      var fixedImage = superSnackImages[randomNumber];
      var height = 50;

      var newSnack = new Snack(fixedImage, 50, height);
      newSnack.isSuper = true;

      if (fixedImage === pizzaImg) {
        newSnack.points = 15;
      }
      if (fixedImage === donutImg) {
        newSnack.isPowerful = true;
      }
      if (fixedImage === icelollyImg){
        newSnack.points = Math.floor(Math.random()*45);
      };

      if(superSnacks.length < 3){
        superSnacks.push(newSnack);
      };
    }, 3000)
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
        if (!oneSnack.isGood){
          badFood.play();
        }
        if (oneSnack.isSuper){
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

      badSnacks = updateSnacks(badSnacks);
      goodSnacks = updateSnacks(goodSnacks);
      superSnacks = updateSnacks(superSnacks);


      isGameOver();
      if(isOver){
        clearInterval(drawGame);
        clearInterval(addGoodSnacks);
        clearInterval(addBadSnacks);
        clearInterval(addSuperSnacks);
        clearInterval(timerCountdown);
        backgroundMusic.stop()
        backgroundMusic.currentTime = 0;

        ctx.clearRect(0,0,canvas.width,canvas.height)
      }
    }, 1000/30);
  };

  function resetGame(){
    isOver = false;
    timer = 60;
    badSnacks = [];
    goodSnacks = [];
    superSnacks = [];
    newPlayer.points = 0;
  }

  function runGame() {
    resetGame();
    startCountdown();
    resetSpeed();
    addingBadSnacks();
    addingGoodSnacks();
    addingSuperSnacks();
    initGame();
  };


// DOM && Other
//----------------------------

//hide results div
$('.instructions').hide();
$('.game-over').hide();


  function isGameOver(){
    if (timer < 0){
      isOver = true;

      $('.game-over').fadeIn(500);

      if (newPlayer.points > 100) {
        $("#loser").hide();
        $("#winner").show();
        winningMusic.play();
      } else {
        $("#winner").hide();
        $("#loser").show();
        losingMusic.play()
      }

      $('.try-btn').click(function() {
        $('.game-over').hide();
        runGame();
      });
    }
  };

  $('.start-btn').click(() => {
    $('.start-page').fadeOut('2');
    runGame();

  });


  $('.how-to').click(()=> {
    $('.instructions').toggle();
    $('.side-style').toggle();
  })

  $('.return-btn').click(() => {
    $('.instructions').hide();
    $('.side-style').toggle();
  });



};

