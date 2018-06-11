var canvas = document.getElementById('snackboard');
var ctx = canvas.getContext('2d');

function Player (snackboard){
  //starting point
  this.x = 600;
  this.y = 400;
  this.speed = 0;
  this.points = 0;
  // this.image = new Image();
  this.snackboard = snackboard;

  document.onkeydown = (e) => {
    e.preventDefault()
    // if ((this.x < canvas.width -50) || (this.y < canvas.height - 50)){
    switch (e.keyCode) {
      case 38:
        this.y -= 10;
        console.log("up")
        break;
      case 40:
        this.y += 10;
        console.log("down")
        break;
      case 37:
        this.x -= 10;
        console.log("left")
        break;
      case 39:
        this.x += 10;
        console.log("right")
        break;
      }
      //Stop player from going outside of borders;
      if (this.x-10 > canvas.width || this.x-10 < 0) {
        this.x *= -1;
      }
      if (this.y-10 > canvas.height || this.y-10 < 0) {
        this.y *= -1;
      };
    // };
    };

  // document.onkeydown = (e) => {
  //   // e.preventDefault()
  //   switch (e.keyCode) {
  //     case 38:
  //       this.move(0,-1);
  //       console.log("up")
  //       break;
  //     case 40:
  //       this.move(0,1);
  //       console.log("down")
  //       break;
  //     case 37:
  //       this.move(-1,0);
  //       console.log("left")
  //       break;
  //     case 39:
  //       this.move(1,0);
  //       console.log("right")
  //       break;
  //     }
  // }
}

Player.prototype.drawPlayer = function(){
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  // to have a circle
  ctx.arc(this.x, this.y, 50, 0, 2*Math.PI);
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

// Player.prototype.eatItem = function(item){
//   return (this.x === item.x && this.y === item.y);
// }

function NegativeItem() {
  //to give random location on board
  this.x = Math.floor(Math.random()* 1200)-30;
  this.y = Math.floor(Math.random()* 800)-30;
  // this.img = new Image();
  // this.img.src = ('')
}

NegativeItem.prototype.draw = function(){
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
}

function PowerSnack() {
  this.x = Math.floor(Math.random()* 1200)-20;
  this.y = Math.floor(Math.random()* 800)-20;
}

PowerSnack.prototype.draw = function(){
  ctx.fillStyle = "#000000";
  ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
}


function SnackAttack() {
  // this.canvas = document.getElementById('snackboard');
  // this.ctx = this.canvas.getContext('2d');
  // this.ctx.clearRect(0,0,1200,800)

  this.timer = 60;

  // this.img = new Image();
  // this.img.src = "";

  this.player = new Player(this);
  this.list_NegativeItems = [];
  this.list_PositiveItems = [];

  this.createObstacles();
  this.createPowerSnack();

  this.interval =
    setInterval(()=> {
      ctx.clearRect(0,0, 1200, 800);
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
        ctx.clearRect(0,0, 1200, 800);
      };
    };

    for (var i = 0; i < this.list_PositiveItems.length; i++){
      if (this.player.eatItem(this.list_PositiveItems[i])){
        this.list_PositiveItems.splice(i,1);
        this.player.points += 1;
        console.log(this.player.points);
        ctx.clearRect(0,0, 1200, 800);
      };
    };

      // if (this.checkCollision(this.player.x, this.player.y, this.list_NegativeItems)){


      // }
      // if (this.checkCollision(this.player.x, this.player.y, this.list_PositiveItems)){
      //   console.log("I should be able to detect + items")
      //   ctx.clearRect(0,0, 1200, 800);
      // }


    }, 60/1000);



    //   }
    // }
}

SnackAttack.prototype.startNewGame = function () {
  this.ctx.clearRect(0, 0, 1200, 800);
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

var snackboard = new SnackAttack();
