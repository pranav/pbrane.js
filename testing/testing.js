function toDraw(w, ctx){
    var rocket = new Image();
    rocket.src = '/p-brain.js/images/ally.png';
    ctx.drawImage(rocket, 300, w);
}


function nextWorld(w) {
    return (w + 1) % 600;
    
}

function keyhandler(w, k) {

    return w - 5;
}

function mousehandler(w,e,x,y) {
    return w;
}

launch(600, "testcanvas", toDraw, nextWorld, keyhandler, mousehandler);

