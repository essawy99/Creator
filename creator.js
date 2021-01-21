var currentDrawing;

/* A small script to throw error if the application 
is accessed by a mobile phone */

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.getElementById("commands").style.display = "none";
    document.getElementById("loadTitle").style.display = "none";
    document.getElementById("loadInput").style.display = "none";
    document.getElementById("loadButton").style.display = "none";
    document.getElementById("saveTitle").style.display = "none";
    document.getElementById("saveOutput").style.display = "none";
	document.getElementById("isMobile").style.display = "block";
} 

/* If not incompatible begin running*/

else {

var currentDrawing;

// next four lines initialize paper.js
paper.install(window);
window.onload = function() {
var canvas = document.getElementById('myCanvas');
paper.setup(canvas);


// create tool for animations
var tool = new Tool();

// create drawing and vhLines objects that define the program
currentDrawing = new drawing();
var currentGrid = new vhLines();

// when you click down the program decides whether
// you are trying to move an existing point or create
// a new point using findPointBeingEdited() function
// then it updates grid location.
tool.onMouseDown = function(event) {
    currentDrawing.findPointBeingEdited(event.point); 
    currentGrid.updateGrid(event.point, currentDrawing);
}

// when you drag the mouse it updates location of 
// the selected point and Grid
tool.onMouseDrag = function(event) {
    currentDrawing.updateDrawing(event.point);
    currentGrid.updateGrid(event.point, currentDrawing);
}
       

// A series of commands from the keyboard :

tool.onKeyDown = function(event) {
    if(event.key == 'n') {
        currentDrawing.addNewShape();                     
    }
    if(event.key == 'c') {
        currentDrawing.closeCurrentShape();                   
    }
    if(event.key == 'f') {
        currentDrawing.fillCurrentShape();
    }
    if(event.key == 's') {
        currentDrawing.selectedCurrentShape();
    }
    if(event.key == 'o') {
        currentDrawing.curveCurrentShape();
    }
    if(event.key == 'shift') {
        currentDrawing.strokeColorCurrentShape();
    }
    if(event.key == 'p') {
        currentDrawing.printCode();
    }
    if(event.key == 'l') {
        currentDrawing.loadDrawing();
    }  
}
       

} // close bracket for paper.js

} // close else statement bracket
