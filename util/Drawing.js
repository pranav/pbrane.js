/** Drawing library for pbrain.js */


/*
loadImage : String -> PImage
loads that image
*/
function loadImage(path){
    return function(x,y,scn){
	return function(ctx){
	    scn(ctx);
	    img = new Image();
	    img.src = path;
	    ctx.drawImage(img,x,y);
	};
    };
}

/* 
circle : Int Color -> PImage
makes a circle of that radius and color
*/
function circle(rad,col){
    return arc(rad,col,0,2*Math.PI,false);
}

/*
arc : Int Color Float Float Boolean
makes an arc with that spec
*/
function arc(rad,col,start,end,isClockwise){
    return function(x,y,scn){
	return function(ctx){
	    scn(ctx);
	    ctx.beginPath();
	    ctx.arc(x,y,rad,start,end,isClockwise);
	    ctx.fillStyle = col;
	    ctx.fill();
	};
    };
}