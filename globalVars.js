
 // Decides canvas size and sets important global
 // variables 
 
 // small script to find document width and height.
 var w = 0;var h = 0;
        //IE
        if(!window.innerWidth){
            if(!(document.documentElement.clientWidth == 0)){
            //strict mode
            w = document.documentElement.clientWidth;h = document.documentElement.clientHeight;
            } else{
            //quirks mode
            w = document.body.clientWidth;h = document.body.clientHeight;
            }
        } else {
            //w3c
            w = window.innerWidth;h = window.innerHeight;
  }


var wUnit = w/1000;
var hUnit = h/1000;
var center =  w/2;

// the width of the left side toolbar is 4/10*h
// so we take w - the width of toolbar to find 
// the width of the canvas
w = (w - ((4/10) * h));

// set canvas width and height based on new w
document.getElementById("myCanvas").width = w;
document.getElementById("myCanvas").style.left = ((4/10) * h);
document.getElementById("myCanvas").height = h;

// create global variables
var wUnit = w/1000;
var hUnit = h/1000;
var center =  w/2;