function toDraw(w, ctx){
    ctx.fillRect(300, w, 50,50);
}   

function nextWorld(w) {
    return (w + 1) % 600;
}

function keyhandler(w, k) {
    return w;
}

function mousehandler(w,e,x,y) {
    return w;
}

launch(0, "testcanvas", toDraw, nextWorld, keyhandler, mousehandler);

