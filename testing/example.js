// Prevents iOS devices from scrolling
var SPEED = 1;
document.getElementById("testcanvas").ontouchmove = function(e){
    e.preventDefault();
}

/* 
Data definition */
function World(){
    this.monster = new Monster();
    this.hero = new Hero();
    this.mousePos = new Posn(0,0);
    this.bg = new Image();
}

// Represents a position on the canvas
function Posn(x,y){
    this.x = x;
    this.y = y;
}

// A Monster represents the antagonist
function Monster(){
    // this.pos is a Posn
    this.speed = SPEED;
    this.pos = new Posn(0,0);
    this.image = new Image();
}

// A Hero represents the protagonist
function Hero(){
    // this.pos is a Posn
    this.speed = SPEED;
    this.pos = new Posn(0,0);
    this.image = new Image();
}

// toDraw : World Scene ->
// Draws the world onto the given scene (context)
function toDraw(w, scn){
    scn.drawImage(w.bg, 0,0);
    scn.drawImage(w.hero.image, w.hero.pos.x, w.hero.pos.y);
    scn.drawImage(w.monster.image, w.monster.pos.x, w.monster.pos.y);
}

// nextWorld : World -> World
// Calculates the next world
function nextWorld(w) {
    var dir = new Posn(
            (w.mousePos.x-w.hero.pos.x),
            (w.mousePos.y-w.hero.pos.y));
    var dist = magnitude(dir.x,dir.y);
    if (dist == 0){
        return w;
    }
    w.hero.pos.x += (dir.x / dist) * w.hero.speed;
    w.hero.pos.y += (dir.y / dist) * w.hero.speed;
    if(dist < magnitude((w.mousePos.x-w.hero.pos.x),(w.mousePos.y-w.hero.pos.y))){
        w.hero.pos.x = w.mousePos.x;
        w.hero.pos.y = w.mousePos.y;
        
    }
    return w;
}

function magnitude(x,y){
    return Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
}

// keyhandler : World Key -> World
// Decides what to do based on the given key / world
function keyhandler(w, k) {
    return w;
}

function mousehandler(w,t,e) {
    if(t == "click" || t == "drag"){
        w.mousePos.x = e.x - w.hero.image.width/2;
        w.mousePos.y = e.y - w.hero.image.height/2;
    }else if(t == "touchmove"){
        w.mousePos.x = e.targetTouches[0].pageX;    
        w.mousePos.y = e.targetTouches[0].pageY;
    }
    return w;
}

// InitialWorld : -> World
// Creates the first world
function initialWorld(){
    var w = new World();
    w.hero.pos.x = 300;
    w.hero.pos.y = 300;
    w.hero.image.src = '/p-brain.js/images/ally.png';
    w.monster.pos.x = 400;
    w.monster.pos.y = 400;
    w.monster.image.src = '/p-brain.js/images/logo.png';
    w.bg.src = '/p-brain.js/images/bg.jpg';
    return w;
}

// Start this thing up
launch(initialWorld(), "testcanvas", toDraw, nextWorld, keyhandler, mousehandler);

