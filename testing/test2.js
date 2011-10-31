function foo() {
    //arr = ['grea','g34s'];
    
    for (var i = 0;i<2;i++) {
        addEventListener("keydown", function(e) {
            p = document.createElement("p");
            p.appendChild(document.createTextNode(i));
            
            document.body.appendChild(p);
        });
    }
    
}
foo();
