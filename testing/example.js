// Some Constants
var SPEED = 1;
var canvasId = "testcanvas";

/* 
Data definition 
A Monster is the enemy of the world
A Hero is the protagonist
A mousePos is the Posn where the mouse was last clicked
A bg is the Background image for the canvas
A Bullets is an array of Bullet

*/
function World(){
    this.monster = new Monster();
    this.hero = new Hero();
    this.mousePos = new Vector2D(0,0);
    this.bg = new Image();
    this.bullets = new Array();
}

// Represents a projectile
function Bullet(x,y){
    this.posn = new Vector2D(x,y);
    this.image = new Image();
}


// A Monster represents the antagonist
function Monster(){
    // this.pos is a Posn
    this.speed = SPEED;
    this.pos = new Vector2D(0,0);
    this.image = new Image();
}

// A Hero represents the protagonist
function Hero(){
    // this.pos is a Posn
    this.speed = SPEED;
    this.pos = new Vector2D(0,0);
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
    moveToPosn(w);
    return w;
}
// moveToPosn : World -> World
// Moves the hero to the mousePos
function moveToPosn(w){
    w.hero.pos = w.hero.pos.moveTo(w.mousePos, w.hero.speed);
    return w;
}
// outofBounds : [Hero|Monster] -> Boolean
// Checks if the hero or monster is outside the canvas
function outofBounds(e){
    var c = document.getElementById(canvasId);
    return e.x > c.width ||
        e.x < 0 ||
        e.y > c.height ||
        e.y < 0;
}

// keyhandler : World Key -> World
// Decides what to do based on the given key / world
function keyhandler(w, k) {
    return w;
}

// mousehandler : World String EventData -> World
// Handles mouse interaction
function mousehandler(w,t,e) {
    if(t == "click"){
    	w.mousePos = new Vector2D(e.x,e.y);
        imageShift(w.mousePos,w.hero.image);
    }else if(t == "touchmove"){
        w.mousePos = new Vector2D(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
        imageShift(w.mousePos,w.hero.image);
    }
    return w;
}

// Vector2D Image ->
// accounts for images location being top left
function imageShift(v,i){
	v.x -= i.width/2;
	v.y -= i.height/2;
}

// InitialWorld : -> World
// Creates the first world
function initialWorld(){
    var w = new World();
    w.hero.pos = new Vector2D(300,300);
    w.hero.image.src = '/p-brain.js/images/ally.png';
    w.monster.pos.x = 200;
    w.monster.pos = new Vector2D(200,200);
    w.monster.image.src = '/p-brain.js/images/logo.png';
    w.bg.src = '/p-brain.js/images/bg.jpg';
    return w;
}
