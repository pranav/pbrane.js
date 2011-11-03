//This file is for a class that represents a two dimentional vector
function Vector2D(x,y){
    this.x = x;
    this.y = y;  
    this.add = add;
    this.sub = sub;
    this.moveTo = moveTo;
    this.mult = mult;
    this.length = length;
    this.unit = unit;
    this.rotate = rotate;
}

// All following functions are methods of the 2DVector class


//Vector, Number -> Vector
//produces a Vector moved n towards the given vector
function moveTo(v,d){
    return this.add(v.sub(this).unit().mult(d));
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
function length(){
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
}

//-> Vector
//gets the unit of this vector
function unit(){
    return this.mult(this.length());
}

//Number Vector -> Vector
//rotates this r radians around p in the counterclockwise direction 
function rotate(r,p) {
	var temp = this.sub(r);
	var rotated = new Vector2D(temp.x * Math.cos(p) - temp.y * Math.sin(p),
			temp.x * Math.sin(p) + temp.y * Math.cos(p));
	return rotated.add(r);
}


