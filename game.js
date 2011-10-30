///////////////////////////////////////////////
// Implementations
///////////////////////////////////////////////

// Canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

// Some constants
canvas.width = 704;
canvas.height = 396;
// Add the canvas to the page
document.body.appendChild(canvas);

///////////////////////////////////////////////
// Rendering
//   We need the Ready because if the image is not set before the DOM calls it,
//   then an error will be thrown

// Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
}
bgImage.src = "images/bg.jpg"; 

// Hero Image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
    heroReady = true;
}
heroImage.src = "images/jon.png";

// Monster Image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
    monsterReady = true;
}
monsterImage.src = "images/ally.png";

// Render the world
var render = function () {
    if(bgReady)
        ctx.drawImage(bgImage, 0, 0);
    if(monsterReady)
        ctx.drawImage(monsterImage, monster.x, monster.y);
    
    if(heroReady)
        ctx.drawImage(heroImage, hero.x, hero.y);
       
    drawPos();   
}

// Draws the position of hero on the screen
var drawPos = function() {
    ctx.fillStyle = "#00FF00";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseAlign = "top";
    ctx.fillText("X: " + hero.x + " Y: " + hero.y, 32, 32);
}

/////////////////////////////////////////////
// Logic

// Our hero
var hero = {
    speed: 256,
    x: 0,
    y: 0
};

// The monster
var monster = {
    x: 0,
    y: 0
};

// Key-handlers
var keysDown = {};

addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false);

// nextWorld : Handles the logic for each world
var nextWorld = function(modifier) {
    if(38 in keysDown && hero.y > 0) // Up
        hero.y -= hero.speed * modifier;
    if(40 in keysDown && hero.y < (canvas.height - heroImage.height)) // Down
        hero.y += hero.speed * modifier;
    if(37 in keysDown && hero.x > 0) // Left
        hero.x -= hero.speed * modifier;
    if(39 in keysDown && hero.x < (canvas.width - heroImage.width)) // Right
        hero.x += hero.speed * modifier;
        
    heroHitsMonster();      
}

var heroHitsMonster = function() {
    if(Math.abs(hero.x - monster.x) <= Math.abs(heroImage.width - monsterImage.width) &&
        Math.abs(hero.y - monster.y) <= Math.abs(heroIMage.width - monsterImage.height))
        newMonster();

}

var newMonster = function() {
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
} 

var initWorld = function() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    newMonster();
}

// The big bang
var bigbang = function() {
    var now = Date.now();
    var delta = (now - then);
    
    
    // Do not do anything until the images are ready
    if(bgReady && heroReady && monsterReady)
        nextWorld(delta / 1000);
    render();
    
    then = now;
}
initWorld();
var then = Date.now();
setInterval(bigbang, 1);

















