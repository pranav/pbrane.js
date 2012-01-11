// Christmas Tree Javascript for pbrain.js 
// Example written by Pranav Gandhi

// Constants
var canvas_id = "xmastree";
var WIDTH = 450;
var HEIGHT = 750;
var SPEED = 0.5;
var speed_variance = 1;

/** Data definition for a World
 * A World consists of:
 * - Array of TreeImage */
function World(){
    this.images = [];
}

/** TreeImage : String Int Int ... [String Int]-> TreeImage
 * A TreeImage is a wrapper for Image with an X and Y 
 * Name is an optional argument used for finding a specific image
 * Speed is an optional argument used to alter speed of falling snow */
function TreeImage(image_src, x, y, name, speed){
    this.name = name;
    this.image = loadImage(image_src);
    this.x = x;
    this.y = y;
    this.speed = speed;
}

/** mousehandler : World String MouseEvent -> World
 * Handles mouse interaction */
function mousehandler(w, m, mevent){
    if(m == "mousemove") // Change the speed of the snow
        SPEED = Math.round(mevent.y/HEIGHT*2) + 1;
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
    var i = 0
    while(i < w.images.length){
        var img = w.images[i];
        if(img.name == "snow"){
            if(img.y >= HEIGHT)
                img.y = -50;
            else
                img.y += SPEED * img.speed;    
        }
        i += 1;
    }
    
    return w;
}

/** toDraw : World Scene -> Void
 * Draws the world state onto the given Scene */
function toDraw(w, scn){
    var i = 0;
    curScn = scn;
    while(i < w.images.length){
        curScn = w.images[i].image(w.images[i].x, w.images[i].y,curScn);
        i += 1;
    }
    
    return circle(50,"#000000")(0,0,curScn);
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
    images.push(new TreeImage('images/pokeballs.png',0,0,"pokeballs"));
    images.push(imageMacro('images/pikachu.png'));
    images.push(imageMacro('images/yellowbulbs.png'));    
    return images;
}

/** generateSnow : -> TreeImage
 * Generates a random snowflake */
function generateSnow(){
    var r = Math.random();
    if(r < 0.5)
        return new TreeImage('images/snowflakesmall.png', 
            Math.random()*WIDTH, Math.random()*HEIGHT, "snow", 
                3 + Math.random() * speed_variance);
    else if (r < 0.9)
        return new TreeImage('images/snowflakemed.png', 
            Math.random()*WIDTH, Math.random()*HEIGHT, "snow",
                2 + Math.random() * speed_variance);
    else
        return new TreeImage('images/snowflakelarge.png',
            Math.random()*WIDTH, Math.random()*HEIGHT, "snow",
                1 + Math.random() * speed_variance);
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