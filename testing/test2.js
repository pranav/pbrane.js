/**
arr = ['grea','g34s'];
function foo() {
  
    
    for (a in arr) {
        addEventListener("keydown", function(e) {
            p = document.createElement("p");
            p.appendChild(document.createTextNode(a));
            
            document.body.appendChild(p);
        });
    }
    
}
foo();

*/

function MouseX(x2,y2) {
    this.x = x2;
    this.y = y2;
}

function MouseY(x1) {
    this.x = x1;
}

var m = new MouseX(5,5);
var o = new MouseY(5);

var arr = new Array();

addEventListener("mousemove", function(e) {
    arr.push(new MouseX(e.x, e.y));
});

addEventListener("keyup", function(e) {
    alert(arr[0].x);
});
