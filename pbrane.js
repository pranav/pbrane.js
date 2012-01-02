var brane = null;
//the PBrane class
function PBrane(state, canvasId, draw, tick, key, mouse){
    this.state = state;
    this.id = canvasId;
    this.draw = draw;
    this.tick = tick;
    this.onKey = key;
    this.onMouse = mouse;
    this.eventQ = new Array();
    this.inFocus = function() {
        return true; //document.activeElement.getAttribute("id") == this.id; FIXME
    };
}
// struct for mouse events
function MouseEvent(type,event){
    this.type = type;
    this.event = event;
}
// struct for key events
function KeyEvent(type,event){
    this.type = type;
    this.event = event;
}

/*
launch : World, CanvasId, draw, tick = null, key = null, mouse = null ->
    launches PBrane
*/
function launch(state, canvasId, draw, tick, key, mouse){
    brane = new PBrane(state, canvasId, draw, tick, key, mouse);
    addKeyEventListener(brane);
    addMouseEventListener(brane);
    setInterval("runThrough(brane)",1);
}

/*
addKeyEventListener : PBrane ->
    lauches a key event listener that adds key event to that PBranes queue
*/
function addKeyEventListener(brane) {
    var kevents = ["keyup", "keydown"];
    for(i in kevents){
        var ke = kevents[i];
        document.getElementById(brane.id).addEventListener(ke,function(_ke){
            return function (e) {
                if(brane.inFocus()){
                    brane.eventQ.push(new KeyEvent(_ke,e.keyCode));
                }
        };}(ke));
    }
}
/*
addMouseEventListener : PBrane ->
    lauches a mouse event listener that adds key event to that PBranes queue
*/
function addMouseEventListener(brane) {
    var mevents = ["click", "mousedown", "mousemove", "mouseup","touchstart",
    "touchmove","touchend", "drag"];
    for(i in mevents){
        var me = mevents[i];
        addEventListener(me,function(_me){
            return function (e) {
                if(brane.inFocus()){
                   brane.eventQ.push(new MouseEvent(_me,e));
                }
        };}(me));
    }
}

/*
runThrough : PBrane ->
    Deals with a tick, the possibilty of keyevents and mouse events, and drawing
*/
function runThrough(brane){
    tick(brane);
    draw(brane);
    handleEvents(brane);
    draw(brane);
}

/*
tick : PBrane ->
    ticks that brane
*/
function tick(brane){
    if(brane.tick){
        brane.state = brane.tick(brane.state);
    }
}

/*
draw : PBrane ->
    draws the brane
*/
function draw(brane){
    var element = document.getElementById(brane.id);
    var ctx = element.getContext("2d");
    //ctx.clearRect(0,0,element.width,element.height);
    var w = ctx.width;
    ctx.width = 1;
    ctx.width = w;
    brane.draw(brane.state, ctx);
}

/*
handleEvents : PBrane ->
    handles all events in that brane, clears the queue
*/
function handleEvents(brane){
    for(i in brane.eventQ){
        var e = brane.eventQ[i];
        if(e instanceof MouseEvent && brane.onMouse){
            brane.state = brane.onMouse(brane.state, e.type, e.event);
        } else if(brane.onKey){
            brane.state = brane.onKey(brane.state, e.type, e.event);
        }
        //draw(brane);
    } 
    brane.eventQ = new Array();
}

