var brain = null;
//the PBrane class
function PBrain(state, canvasId, draw, tick, key, mouse){
    this.state = state;
    this.id = canvasId;
    this.draw = draw;
    this.tick = tick;
    this.onKey = key;
    this.onMouse = mouse;
    this.eventQ = new Array();
    this.inFocus = true; //FIXME
}
// struct for mouse events
function MouseEvent(id,type,x,y){
    this.id = id;
    this.type = type;
    this.x = x;
    this.y = y
}
// struct for key events
function KeyEvent(id,type){
    this.id = id;
    this.type = type;
}

/*
launch : World, CanvasId, draw, tick = null, key = null, mouse = null ->
    launches PBrane
*/
function launch(state, canvasId, draw, tick, key, mouse){
    brain = new PBrain(state, canvasId, draw, tick, key, mouse);
    addEventListener("focus", function (e) {} ); //FIXME Figure out how to handle focusing
    addKeyEventListener(brain);
    addMouseEventListener(brain);
    setInterval("runThrough(brain)",1);
}

/*
addKeyEventListener : PBrain ->
    lauches a key event listener that adds key event to that PBranes queue
*/
function addKeyEventListener(brain) {
    var kevents = ["keyup", "keydown"];
    for(i in kevents){
        var ke = kevents[i];
        addEventListener(ke,function (e) {
            if(brain.inFocus){
             brain.eventQ.push(new KeyEvent(e.keyCode,ke));
            }
         });
    }
}
/*
addMouseEventListener : PBrain ->
    lauches a mouse event listener that adds key event to that PBranes queue
*/
function addMouseEventListener(brain) {
    var kevents = ["mousedown", "mousemove", "mouseup", "click"];
    for(i in kevents){
        var ke = kevents[i];
        addEventListener(ke,function (e) {
           if(brain.inFocus){
                brain.eventQ.push(new MouseEvent(ke,e.button,e.x,e.y));
            }
        });
    }
}

/*
runThrough : PBrain ->
    Deals with a tick, the possibilty of keyevents and mouse events, and drawing
*/
function runThrough(brain){
    tick(brain);
    draw(brain);
    handleEvents(brain);
    draw(brain);
}

/*
tick : PBrain ->
    ticks that brane
*/
function tick(brain){
    if(brain.tick != null){
        brain.state = brain.tick(brain.state);
    }
}

/*
draw : PBrain ->
    draws the brane
*/
function draw(brain){
    var element = document.getElementById(brain.id);
    var ctx = element.getContext("2d");
    ctx.clearRect(0,0,element.width,element.height);
    brain.draw(brain.state, ctx);
}

/*
handleEvents : PBrain ->
    handles all events in that brane, clears the queue
*/
function handleEvents(brain){
    for(i in brain.eventQ){
        var e = brain.eventQ[i];
        if(e instanceof MouseEvent){
            brain.state = brain.onMouse(brain.state, e.id, e.x, e.y);
        } else {
            brain.state = brain.onKey(brain.state, e);
        }
    } 
    brain.eventQ = new Array();
}

