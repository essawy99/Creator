/* This class contains all the shapes on the screen
   and the methods associated with interactivity
   
   It interacts regularly with the shape class to 
   build all the functionality in the program    */

class drawing {
    constructor() {
        // array containing all shapes
        this.shapes = [];                
        // first shape automatically added to drawing
        var originalShape = new shape();   
        this.shapes.push(originalShape)  

        // this is the shape currently being edited
        this.shapeOfInterest = originalShape;

        // this is the point currently being edited and 
        // associated index
        this.pointOfInterest = null;
        this.index = 0;     
    }
    //-------------------------------------------------------//

    /* this method iterates throught shapes in drawing and if
    the point is found in existing points it selects it by
    editing the properties shapeOfInterest, pointOfInterest, and 
    index otherwise it creates a new point on the current shape */
    
    findPointBeingEdited(point) {
        for(var i = 0; i < this.shapes.length; i++) { 
            //iterate through each shape
            var shape = this.shapes[i];
            //find the point being edited using findPoint
            var pointIndex = shape.findPoint(point);  
            //if a point is found select that point and associated shape
            if (pointIndex >= 0) {                    
                this.shapeOfInterest = shape;
                this.index = pointIndex;
                this.pointOfInterest = shape.points[this.index];
                return;
            } 
        }
        // if no shape is found create a new point on current shape 
        // and select it
        this.shapeOfInterest.newPoint(point);
        this.index = this.shapeOfInterest.points.length - 1;
        this.pointOfInterest = this.shapeOfInterest.points[this.index]
    }
    //--------------User Interface functions--------------------//

    /* this method adds a new shape to the drawing and selects it */
    addNewShape() {
        var newShape = new shape();
        this.shapes.push(newShape);
        this.shapeOfInterest = newShape;
    }

    /*  this method changes the location of a point in the drawing */
    updateDrawing(point) {
        this.shapeOfInterest.updatePoint(point, this.index);
        this.pointOfInterest = this.shapeOfInterest.points[this.index];
    }

    /*  this method closes the currently selected shape */
    closeCurrentShape() {
        this.shapeOfInterest.closeShape();
    }

    /* this method prompts the user to change the color of the shape */
    fillCurrentShape() {
        this.shapeOfInterest.fillShape();
    }

    /* this method prompts the user to change the color of the stroke */
    strokeColorCurrentShape() {
        var input = prompt('What color do you want the stroke to be?');
        this.shapeOfInterest.strokeColor(input);
    }

    /* this method highlights the points on a shape to help u draw */
    selectedCurrentShape() {
        this.shapeOfInterest.path.fullySelected = 
        !this.shapeOfInterest.path.fullySelected;
    }
    
    /* This method smooths the lines into a single curve */
    curveCurrentShape() {
        this.shapeOfInterest.curveLines();
    }
    
    //-------------------------------------------------------//
    
    /* This method takes the inputted save code and draws
    the corresponding drawing.  */
    loadDrawing() {
        // get save-code from load text area
        var input = document.getElementById('loadInput').value

        var processedInput ='';
        // removes all new line chars from input
        for (var i = 0; i < input.length; i++) {
            if(input.charAt(i) != '\n') {
                processedInput += input.charAt(i);
            }
        }

        // splits the code into an array split by -
        var partsArray = processedInput.split('-');
        var i = 1;   // ignore i=0 its empty
        // iterates through save code until no s
        // is found meaning end has been reached
        // s markes new shape so the loop creates
        // a new shape and uses .loadShape to process it
        while(true) {
            if(partsArray[i] == "s") {
                console.log("hi");
                this.addNewShape();
                i++;
                i = this.shapeOfInterest.loadShape(partsArray, i);
            }
            else {
                break;
            }
        }
    }

    //-------------------------------------------------------//
    
    /* This method prints a class containing the drawing you drew
    including a function to remove the shape and to move it */
    printCode() {
        // we iterate through every point in the drawing to find
        //  the leftmost and rightmost point and top and bottom point.
        //  We use that to calculate the center Y position of drawing
        //  and the center X position of drawing
        
        var yMin = h;
        var yMax = 0;
        var xMin = w;
        var xMax = 0;
        //iterate through each shape and find associated points array
        for(var i = 0; i < this.shapes.length; i++) { 
            var points = this.shapes[i].points;
            // iterate through points array and update variables 
            for (var j = 0; j < points.length; j++) {
                if (points[j].x < xMin) {
                    xMin = points[j].x;
                }
                if (points[j].x > xMax) {
                    xMax = points[j].x;
                }
                if (points[j].y < yMin) {
                    yMin = points[j].y;
                }
                if (points[j].y > yMax) {
                    yMax = points[j].y;
                }
            }
        }

        // center is calculated by taking average
        var xCenter = (xMin + xMax)/2;
        var yCenter = (yMin + yMax)/2;
        
        var name = prompt('What do you want to name your class?');
        
        // first we print out a code to save our progress
        var code = "/* Code: {";
        
        // Now we use .printShapeCode() on each shape
        for(var i = 0; i < this.shapes.length; i++){
            code += (this.shapes[i].printShapeCode());
        }
        // We close off the save code 
        code += "}*/\n";

        var output = '';
        // Iterate through code and place new 
        // line charachter every 75 chars
        for (var i = 0; i < code.length; i++) {
            if(i % 75 == 0) {
                output += '\n';
            }
            output += code.charAt(i);
        }
 
        // Now we start building the class starting
        // with the constructor
        output += 
        "class " + name + " {\n" +
        "\tconstructor(x,y) {\n" +
        "\t\tthis.xLoc = x;\n" +
        "\t\tthis.yLoc = y;\n" +
        "\t\tthis.size = 1;\n";
        
        // iterate through each shape and print out its constructor
        for(var i = 0; i < this.shapes.length; i++){
            output += (this.shapes[i].printShapeConstr(i, xCenter, yCenter));
        }
        // we close off the constructor 
        // and repeat the process on the update func
        output += "\t}\n\n";
        output += "\tupdate(xIncr, yIncr){\n";
        for(var i = 0; i < this.shapes.length; i++){
            output += (this.shapes[i].printShapeUpdate(i));
        }

        // we close off the update func
        // and repeat the process on the remove func
        output += "\t}\n\n";
        output += "\tremove(){\n";
        for(var i = 0; i < this.shapes.length; i++){
            output += (this.shapes[i].printShaperemove(i));
        }

        // now we close off the class
        output+= "\t}\n";
        output+= "}\n";  
        // print in console
        console.log(output);
        
        // We create html output by replacing 
        // \n with <br> and \t with &ensp;&ensp;
        var htmlOutput = ''
        for (var i = 0; i < output.length; i++) {
            if(output.charAt(i) == '\n') {
                htmlOutput += "<br>";
            }
            else if(output.charAt(i) == '\t')
                htmlOutput += "&ensp;&ensp;"
            else {
                htmlOutput += output.charAt(i);
            }
        }
       
        // insert the output into the correct element
        document.getElementById("saveOutput").innerHTML = htmlOutput;
    }    
}

