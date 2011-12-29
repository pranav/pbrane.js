// Christmas Tree Javascript for pbrain.js 
// Example written by Pranav Gandhi

// Constants
var canvas_id = "xmastree";
var WIDTH = 450;
var HEIGHT = 750;

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
    var i = 0
    while(i < w.images.length){
        scn.drawImage(w.images[i].image, w.images[i].x, w.images[i].y);
        i += 1;
    }
}

/** getImages : -> [Arrayof TreeImage]
 * Retrieves all the images and returns them in an array */
function getImages(){
    var images = [imageMacro('images/background.png')];

    /** Insert snow */
    for(i = 0; i < 100; i++)
        images.push(generateSnow());

    images.push(imageMacro('images/tree.png'));
    images.push(imageMacro('images/ribbons.png'));
    images.push(imageMacro('images/merry.png'));
    images.push(imageMacro('images/christmas.png'));
    images.push(imageMacro('images/yellowbulbs.png'));    
    return images;
}

/** generateSnow : -> TreeImage
 * Generates a random snowflake */
function generateSnow(){
    var r = Math.random();
    if(r < 0.5)
        return new TreeImage('images/snowflakesmall.png', 
            Math.random()*WIDTH, Math.random()*HEIGHT);
    else if (r < 0.7)
        return new TreeImage('images/snowflakemed.png', 
            Math.random()*WIDTH, Math.random()*HEIGHT);
    else
        return new TreeImage('images/snowflakelarge.png',
            Math.random()*WIDTH, Math.random()*HEIGHT);
}

/** imageMacro : String -> TreeImage
 * Gets the image from the string source and places it at x=0, y=0. */
function imageMacro(src){
    return new TreeImage(src,0,0);
}

/** Returns World0, the initial state for the Canvas */
function initialWorld(){
    var world = new World();
    world.images = getImages();
    
    return world;
}





