/**
This is the nyancat example
The launch command
launch(initialWorld(), "testcanvas", toDraw, nextWorld, keyhandler, mousehandler);
*/

/** Some constants */
var CELL_SIZE = 30;
var WIDTH_CELLS = document.width / CELL_SIZE;
var HEIGHT_CELLS = document.height / CELL_SIZE;

/** This is the World */
function World(){
    this.cat = new Cat(document.width/2, document.height/2);
    this.rainbow = new Rainbow();
}

/** A Rainbow is a list of blocks */
function Rainbow(){
    
}

/** A Block is an X, Y, Color (in hex) */
function Block(x,y,color){
    
}

/** This is the "cat" */
function Cat(x,y,src){
    this.posn = new Posn(x,y);
    this.image = new Image();
}

/** This represents a Position on the screen */
function Posn(x,y){
    this.x = x;
    this.y = y;
}

/** RENDERING */
function toDraw(w, scn){
    scn.drawImage()   
}

function initialWorld(){
    var w = new World();
    w.cat.image.src = '/;'
}
