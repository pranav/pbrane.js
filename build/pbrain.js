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
    brain = new PBrain(state, canvasId, draw, tick, key, mouse);
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
        document.getElementById(brain.id).addEventListener(ke,function(_ke){
            return function (e) {
                if(brain.inFocus()){
                    brain.eventQ.push(new KeyEvent(_ke,e.keyCode));
                }
        };}(ke));
    }
}
/*
addMouseEventListener : PBrain ->
    lauches a mouse event listener that adds key event to that PBranes queue
*/
function addMouseEventListener(brain) {
    var mevents = ["click", "mousedown", "mousemove", "mouseup","touchstart",
    "touchmove","touchend", "drag"];
    for(i in mevents){
        var me = mevents[i];
        addEventListener(me,function(_me){
            return function (e) {
                if(brain.inFocus()){
                   brain.eventQ.push(new MouseEvent(_me,e));
                }
        };}(me));
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
    if(brain.tick){
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
        if(e instanceof MouseEvent && brain.onMouse){
            brain.state = brain.onMouse(brain.state, e.type, e.event);
        } else if(brain.onKey){
            brain.state = brain.onKey(brain.state, e.type, e.event);
        }
        //draw(brain);
    } 
    brain.eventQ = new Array();
}

//This file is for a class that represents a two dimentional vector
function Vector2D(x,y){
    this.x = x;
    this.y = y;  
    this.add = add;
    this.sub = sub;
    this.moveTo = moveTo;
    this.mult = mult;
    this.magnitude = magnitude;
    this.unit = unit;
    this.rotate = rotate;
}

// All following functions are methods of the 2DVector class

// Vector -> boolean
// this and that have same x,y
function equals(v){
	return this.x == v.x && this.y == v.y;
}

//Vector, Number -> Vector
//produces a Vector moved n towards the given vector
function moveTo(v,d){
	var dir = v.sub(this);
	if(dir.magnitude() > d){
    	return this.add(dir.unit().mult(d));
	} else {
		return v;
	}
}

//Vector -> Vector
//produces the sum of the vectors
function add(v){
    return new Vector2D(this.x + v.x, this.y + v.y);
}

//Vector -> Vector
//produces the difference of the vectors
function sub(v){
    return new Vector2D(this.x - v.x,this.y - v.y);
}

//Number -> Vector
//scalar multiplies this vector
function mult(n){
    return new Vector2D(this.x*n,this.y*n);
}
//-> Number
//gets the length of this vector
function magnitude(){
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
}

//-> Vector
//gets the unit of this vector
function unit(){
    return this.mult(1/this.magnitude());
}

//Number Vector -> Vector
//rotates this r radians around p in the counterclockwise direction 
function rotate(r,p) {
	var temp = this.sub(r);
	var rotated = new Vector2D(temp.x * Math.cos(p) - temp.y * Math.sin(p),
			temp.x * Math.sin(p) + temp.y * Math.cos(p));
	return rotated.add(r);
}


