/** Drawing library for pbrain.js */



/** drawRect : Int Int Int Int String Scene -> Scene
 * drawRect requires the x, y, width, height, color (in hex), and Context
 * It will use the built in scn.fillRect */
function drawRect(x, y, width, height, color, scn){
    scn.fillStyle = color;
    scn.fillRect(x, y, x + width, y + height);
    return scn;
}

/** drawCircle : Int Int Int Color Scene -> Scene
 * drawCircle requires x, y, radius, color (in hex), and Context */
function drawCircle(x, y, r, color, scn){
    scn.beginPath();
    scn.arc(x, y, r, 0, 2*Math.PI, false);
    scn.fillStyle = color;
    scn.fill();
    return scn;
}
