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

var snackImages = [beerImg, baconImg, cheeseImg, avoImg, appleImg, eggplantImg, eggsImg];

var fixedSnacks = [];

var movingSnacks = [];