var canvas = document.getElementById('snackboard');
var ctx = canvas.getContext('2d');

var canvasWidth = 800;
var canvasHeight = 600;

function Player (snackboard){
  //starting point
  this.x = 400;
  this.y = 300;
  this.speed = 10;
  this.points = 0;
  // this.image = new Image();
  this.snackboard = snackboard;

  document.onkeydown = (e) => {
    // if ((this.x < canvas.width-10 || this.x-10>0)
    // && (this.y > canvas.height - 50) || this.y-10>0) {
    switch (e.keyCode) {
      case 38:
        if (this.y - 10 > 10){
        this.y -= 10;
        };
        e.preventDefault()
        break;

      case 40:
        if (this.y + 10 < canvasHeight-10){
        this.y += 10;
        };
        e.preventDefault()
        break;

      case 37:
        if (this.x - 10 > 10){
        this.x -= 10;
        };
        e.preventDefault()
        break;

      case 39:
        if (this.x + 10 < canvasWidth-10) {
        this.x += 10;
        };
        e.preventDefault()
        break;
      }
      //Stop player from going outside of borders;
      // if (this.x-10 > canvas.width || this.x-10 < 0) {
      //   this.x *= -5;
      // }
      // if (this.y-10 > canvas.height || this.y-10 < 0) {
      //   this.y *= -5;
      // };
    };
}

Player.prototype.drawPlayer = function(){
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(this.x, this.y, 20, 0, 2*Math.PI);
  // ctx.drawImage(this.img, this.x-10, this.y-10, 20, 20)
  ctx.fill();
  ctx.closePath();
}

Player.prototype.move = function(dx, dy){
  var x = (this.x + dx) % 1100;
  var y = (this.y + dy) % 700;
  // if (!this.snackboard.checkForNegative(x,y)){
  //   this.x = x;
  //   this.y = y;
  // }
  // if (!this.snackboard.checkforPS(x,y)){
  //   this.x = x;
  //   this.y = y;
  // }
}

Player.prototype.eatItem = function(item){
  var onLeft = this.x;
  var onRight = this.x + 25;
  var onTop = this.y;
  var onBottom = this.y + 25;
  var objLeft = item.x;
  var objRight = item.x + 25;
  var objTop = item.y;
  var objBottom = item.y + 25;
  var eaten = true;
  if ((onBottom < objTop) ||
    (onTop > objBottom) ||
    (onRight < objLeft) ||
    (onLeft > objRight)) {
      eaten = false;
    }
  return eaten;
}

// SnackAttack.prototype.isEaten = function(){
//   if (this.player.eatItem()){

//   }
// }

function NegativeItem() {
  this.x = Math.floor(Math.random()* canvasWidth)-50;
  this.y = Math.floor(Math.random()* canvasHeight)-50;
  // this.img = new Image();
  // this.img.src = ('')
}

NegativeItem.prototype.draw = function(){
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
}

function PowerSnack() {
  this.x = Math.floor(Math.random()* canvasWidth)-30;
  this.y = Math.floor(Math.random()* canvasHeight)-30;
}

PowerSnack.prototype.draw = function(){
  ctx.fillStyle = "#000000";
  ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
}

var timer = 60;

function SnackAttack() {
  // this.canvas = document.getElementById('snackboard');
  // this.ctx = this.canvas.getContext('2d');
  // this.ctx.clearRect(0,0,1200,800)

  // this.timer = 60;

  // this.img = new Image();
  // this.img.src = "";

  this.player = new Player(this);
  this.list_NegativeItems = [];
  this.list_PositiveItems = [];

  this.createObstacles();
  this.createPowerSnack();
  this.timerCountdown();

  addingItems =
    setInterval(()=> {
      ctx.clearRect(0,0, canvasWidth, canvasHeight);
      this.player.drawPlayer();
      this.list_NegativeItems.forEach(function(item){
        item.draw();
      });
      this.list_PositiveItems.forEach(function(item){
        item.draw();
      })

    for (var i = 0; i < this.list_NegativeItems.length; i++){
      if (this.player.eatItem(this.list_NegativeItems[i])){
        this.list_NegativeItems.splice(i,1);
        this.player.points -= 1;
        console.log(this.player.points);
        ctx.clearRect(0,0, canvasWidth, canvasHeight);
      };
    };

    for (var i = 0; i < this.list_PositiveItems.length; i++){
      if (this.player.eatItem(this.list_PositiveItems[i])){
        this.list_PositiveItems.splice(i,1);
        this.player.points += 1;
        console.log(this.player.points);
        ctx.clearRect(0,0, canvasWidth, canvasHeight);
      };
    };
    $('.points span').text(this.player.points);
  }, 1000/60);
}

SnackAttack.prototype.startNewGame = function () {
  this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  setInterval(()=> {
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    this.player.drawPlayer();
    this.list_NegativeItems.forEach(function(item){
      item.draw();
    });
    this.list_PositiveItems.forEach(function(item){
      item.draw();
    })

  for (var i = 0; i < this.list_NegativeItems.length; i++){
    if (this.player.eatItem(this.list_NegativeItems[i])){
      this.list_NegativeItems.splice(i,1);
      this.player.points -= 1;
      console.log(this.player.points);
      ctx.clearRect(0,0, canvasWidth, canvasHeight);
    };
  };

  for (var i = 0; i < this.list_PositiveItems.length; i++){
    if (this.player.eatItem(this.list_PositiveItems[i])){
      this.list_PositiveItems.splice(i,1);
      this.player.points += 1;
      console.log(this.player.points);
      ctx.clearRect(0,0, canvasWidth, canvasHeight);
    };
  };
}, 1000/60);
}

// SnackAttack.prototype.getPoints = function(){
//   for (var i = 0; i < this.list_NegativeItems.length; i++){
//     if (this.player.eatItem(this.list_NegativeItems[i])){
//       this.list_NegativeItems.splice(i,1);
//       this.player.points -= 1;
//       console.log(this.player.points);
//       ctx.clearRect(0,0, canvasWidth, canvasHeight);
//     };
//   };

//   for (var i = 0; i < this.list_NegativeItems.length; i++){
//     if (this.player.eatItem(this.list_NegativeItems[i])){
//       this.list_NegativeItems.splice(i,1);
//       this.player.points -= 1;
//       console.log(this.player.points);
//       ctx.clearRect(0,0, canvasWidth, canvasHeight);
//     };
//   };
// }

SnackAttack.prototype.timerCountdown = function(){
  setInterval(() => {
  $('.timer span').text(timer);
  timer --;
  }, 1000)
}

SnackAttack.prototype.createObstacles = function(){
  for (var i =0; i < 10; i++){
    this.list_NegativeItems.push(new NegativeItem());
  };

  this.list_NegativeItems = this.list_NegativeItems.filter((item) => {
    return Math.abs(this.player.x - item.x) > 10 || Math.abs(this.player.y - item.y) > 10;
  });
};

SnackAttack.prototype.createPowerSnack = function(){
  for (var i =0; i < 10; i++){
    this.list_PositiveItems.push(new PowerSnack());
  };

  this.list_PositiveItems = this.list_PositiveItems.filter((item) => {
    return Math.abs(this.player.x - item.x) > 50 || Math.abs(this.player.y - item.y) > 50;
  });
};

// SnackAttack.prototype.checkCollision = function (x,y,array){
//   for(var i = 0; i < array.length; i++){
//     if (array[i].x === x && array[i].y === y){
//       this.array.splice(i, 1);
//     }
//   }
// }


// SnackAttack.prototype.checkForNegative = function(x,y){
//   console.log('checkForNegative being run');
//   return this.list_NegativeItems.filter((item)=> {
//     return Math.abs(x - item.x) < 10 && Math.abs(y - obstacle.y) < 10;
//   }).length > 0;
// };

// SnackAttack.prototype.checkforPS = function(x,y){
//   console.log('checkForPS running');
//   return this.list_PositiveItems.filter((item) => {
//     return Math.abs(x - item.x) < 20 && Math.abs(y - obstacle.y) < 20;
//   }).length > 0;
// };

