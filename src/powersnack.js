//DEFINITIONS
//-----------
window.onload = function () {

function Player (myImage){
  this.image = myImage;
  this.width = 50;
  this.height = 50;

  this.x = 400;
  this.y = 300;

  this.speed = 0;
  this.points = 0;
}

Player.prototype.draw = function(){
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  // ctx.fill();
  // ctx.closePath();
}

Player.prototype.move = function(){
  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 38:
        if (this.y - 10 > 10){
        this.y -= 10;
        console.log("up")
        };
        e.preventDefault()
        break;
      case 40:
        if (this.y + 10 < canvas.height-10){
        this.y += 10;
        console.log("down")
        };
        e.preventDefault()
        break;
      case 37:
        if (this.x - 10 > 10){
        this.x -= 10;
        console.log("left")
        };
        e.preventDefault()
        break;
      case 39:
        if (this.x + 10 < canvas.width-10) {
        this.x += 10;
        console.log("right")
        };
        e.preventDefault()
        break;
      }
    }
};

Player.prototype.receivePoints = function (snack) {
  this.points += snack.points
};

//snack model
function Snack(myImage, width, height) {
  Player.call(this, myImage, width, height);

  this.x = Math.floor(Math.random()* (canvas.width-50));
  this.y = Math.floor(Math.random()* (canvas.height-50));

  this.isEaten = false;

  this.isGood = true;

  this.points = 5;

  // this.density = 5;
}

Snack.prototype = Object.create(Player.prototype)

function SuperSnack (myImage, width, height){
  Snack.call(this, myImage, width, height);
  this.x = Math.floor(Math.random()* (canvas.width-30));
  this.y = Math.floor(Math.random()* (canvas.height-30));

  this.points = Math.floor(Math.random() * 50)
  // this.density = 0;
}


function MovingSnack (myImage, width, height){
  Snack.call(this, myImage, width, height);
  this.vx = Math.floor(Math.random()* 10);
  this.vy = Math.floor(Math.random()* 10);
  this.points = 5;
}

SuperSnack.prototype = Object.create(Snack.prototype)

//CANVAS
//---------------

var canvas = document.getElementById('snackboard');

var ctx = canvas.getContext('2d');
var timer = 60;

// Images
var playerImg = new Image();
playerImg.src = "./images/Cherry.png"

var beerImg = new Image();
beerImg.src = "./images/Beer.png"

var baconImg = new Image();
baconImg.src = "./images/Bacon.png"

var cheeseImg = new Image();
cheeseImg.src = "./images/Cheese.png"

var avoImg = new Image();
avoImg.src = "./images/Avocado.png"

var appleImg = new Image();
appleImg.src = "./images/Apple.png"

var eggplantImg = new Image();
eggplantImg.src = "./images/Eggplant.png"

var eggsImg = new Image();
eggsImg.src = "./images/Eggs.png"

var newPlayer = new Player(playerImg, 50, 50);

var snackImages = [baconImg, cheeseImg, avoImg, appleImg, eggplantImg, eggsImg];

var fixedSnacks = [];

var movingSnacks = [];

function checkCollision(objA, objB){
  return objA.x < objB.x + objB.width &&
  objA.x + objA.width > objB.x &&
  objA.y < objB.y + objB.height &&
  objA.height + objA.y > objB.y;
}

var isOver = false;

function isGameOver(){
  if (timer < 0){
    isOver = true;
    $($gameOverDiv).hide().appendTo(".layout").fadeIn(500);

    if (newPlayer.points > 100) {
      $(".game-over").append($winner);
    } else {
      $(".game-over").append($loser);
    }
  }
};

function startCountdown() {
  timerCountdown =
  setInterval(() => {
      if (timer >= 0){
        $('.timer span').text(timer);
        timer --;
        console.log(timer)
        };
      }, 1000);
    };

var stableSnacks = [];

function initSuperSnacks(){
  for (var i =0; i < 3; i++){
    stableSnacks.push(new SuperSnack(beerImg, 50, 50));
    console.log(stableSnacks)
  };

  // stableSnacks = stableSnacks.filter((item) => {
  //   return Math.abs(newPlayer.x - item.x) > 50 || Math.abs(newPlayer.y - item.y) > 50;
  // });
}

// function initSnacks(snackArray) {
//   snackArray.forEach((oneSnack) => {S
//     var isCollision = checkCollision(newPlayer,oneSnack);
//     if (isCollision){
//       if(oneSnack.isGood){
//         oneSnack.isEaten = true;
//         newPlayer.receivePoints(oneSnack)
//       } else {
//         oneSnack.isEaten = true;
//         newPlayer.receivePoints(oneSnack)
//       }
//     }
//     oneSnack.draw();
//   });
// };

// function removeSnacks(snackArray){
//   snackArray = snackArray.filter(function(oneSnack){
//     return !oneSnack.isEaten;
//   });
// }


function addingSnacks() {
  addSnacks =
  setInterval(() => {
    var randomNumber = Math.floor(Math.random() * snackImages.length)
    var fixedImage = snackImages[randomNumber];
    var height = 50;

    var newSnack = new Snack(fixedImage, 50, height);
    if (fixedImage === appleImg || fixedImage === eggplantImg ||
      fixedImage === eggsImg){
      newSnack.isGood = false;
      newSnack.points *= -1;
    }
    if(fixedSnacks.length < 15){
      fixedSnacks.push(newSnack);
    };
  }, 800)
};

function initGame () {
  drawGame =
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newPlayer.draw();
    newPlayer.move();

    $('.points span').text(newPlayer.points);



    stableSnacks.forEach((oneSnack) => {
      var isCollision = checkCollision(newPlayer,oneSnack);
      if (isCollision){
        if(oneSnack.isGood){
          oneSnack.isEaten = true;
          newPlayer.receivePoints(oneSnack)
        } else {
          oneSnack.isEaten = true;
          newPlayer.receivePoints(oneSnack)
        }
      }
      oneSnack.draw();
    });

    stableSnacks = stableSnacks.filter(function(oneSnack){
      return !oneSnack.isEaten;
    });


    fixedSnacks.forEach((oneSnack) => {
      var isCollision = checkCollision(newPlayer,oneSnack);
      if (isCollision){
        if(oneSnack.isGood){
          oneSnack.isEaten = true;
          newPlayer.receivePoints(oneSnack)
        } else {
          oneSnack.isEaten = true;
          newPlayer.receivePoints(oneSnack)
        }
      }
      oneSnack.draw();
    });

    fixedSnacks = fixedSnacks.filter(function(oneSnack){
      return !oneSnack.isEaten;
    });

    isGameOver();
    if(isOver){
      clearInterval(drawGame);
      clearInterval(addSnacks);
      clearInterval(timerCountdown);
    }

  }, 1000/60);
};


// DOM && Other
//----------------------------

var $gameOverDiv =
("<div class='game-over'></div>");

var $winner =
("<img src='./images/win.gif'> <button class='try-btn btn'>PLAY AGAIN</button>");

var $loser =
("<img src='./images/lose.gif'><button class='try-btn btn'>TRY AGAIN</button>")


  $('.start-btn').click(() => {
    $('.start-page').fadeOut('2');
    startCountdown();
    initSuperSnacks();
    addingSnacks();
    initGame()
  });


  // $('.try-btn').click(() => {
  //   document.reload();
  //   $('.game-over').toggle();
  //   startCountdown();
  //   initSuperSnacks();
  //   addingSnacks();
  //   initGame()
  // });

  // $($gameOverDiv).hide().appendTo(".layout").fadeIn(500);

};

