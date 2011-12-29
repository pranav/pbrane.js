// Christmas Tree Javascript for pbrain.js 
// Example written by Pranav Gandhi

// Constants
var canvas_id = "xmastree";

/** Data definition for a World
 * A World consists of:
 * - Array of TreeImage
 * - Mouse Position [x, y] */
function World(){
    this.images = [];
    this.mousePosn = [];
}

/** TreeImage : String Int Int -> TreeImage
 * A TreeImage is a wrapper for Image with an X and Y */
function TreeImage(image_src, x, y){
    this.image = new Image();
    this.image.src = image_src;
    this.x = x;
    this.y = y;
}

/** mousehandler : World String MouseEvent -> World
 * Handles mouse interaction */
function mousehandler(w, m, mevent){
    return w;
}

/** keyhandler : World String KeyEvent -> World
 * Handles key input from the user */
function keyhandler(w, key, kevent){
    return w;
}

/** nextWorld : World -> World
 * Handles logic for the canvas for each tick cycle */
function nextWorld(w){
    return w;
}

/** toDraw : World Scene -> Void
 * Draws the world state onto the given Scene */
function toDraw(w, scn){
    var i = 0;
    scn.drawImage(w.images[i].image, w.images[i].x, w.images[i].y);
}

/** getImages : -> [Arrayof TreeImage]
 * Retrieves all the images and returns them in an array */
function getImages(){
    var images = [new TreeImage('images/background.png', 0, 0)];
    images.push(new TreeImage('images/tree.png',0,0));
    return images;
}

/** Returns World0, the initial state for the Canvas */
function initialWorld(){
    var world = new World();
    world.images = getImages();
    
    return world;
}





