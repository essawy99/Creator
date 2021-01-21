/*  this method closes the currently selected shape */
class shape {
    constructor() {
        this.points = []
        this.path = new Path();
        this.path.strokeColor = 'black';
        this.curve = false;
        this.closed;
    }
    //-------------------------------------------------------//

    /* function iterates through each point until it finds 
    a point within a 10 pixel radius */
    findPoint(point) {
        for(var i = 0; i < this.points.length; i++) {
            if(point.x < (this.points[i].x + 10) && 
               point.x > (this.points[i].x - 10) &&
               point.y < (this.points[i].y + 10) && 
               point.y > (this.points[i].y - 10) ) {
               return i;           
            }
        }
        return -1;
    }
    //-------------------------------------------------------//

    /* function creates a new point on path and records it */
    newPoint(point) {
        this.points.push(point);
        this.path.add(point);
    } 
    //--------------User Interface functions--------------------//
    
    /*  this method changes the location of a point in the drawing */
    updatePoint(point,index) {
        this.points[index].x = point.x;
        this.points[index].y = point.y;
        this.path.removeSegment(index);
        this.path.insert(index, point);
    }

    /*  this method closes the currently selected shape */
    closeShape() {
        this.path.closed = !this.path.closed
        this.closed = !this.closed
    }

    /* this method prompts the user to change the color of the shape */
    fillShape() {
        var input = prompt('What color do you want?');
        
        this.path.fillColor = input;
        
    }

    /* this method highlights the points on a shape to help u draw */
    selectedShape() {
        this.path.fullySelected = 
        !this.path.fullySelected;
    }
    
    /* This method smooths the lines into a single curve */
    curveLines() {
        this.curve = true
        this.path.smooth();
    }

    /* this method prompts the user to change the color of the stroke */
    strokeColor(color) {
        this.path.strokeColor = color;
    }
    //-------------------------------------------------------//

    /* function is given the starting index and array 
    containing the save code and translates the code
    into a shape that can be edited on screen  */
    loadShape(array, index) {
        // set strokecolor
        this.path.strokeColor = array[index];
        
        // set fillcolor
        if(array[index +1] != 'null') {
            this.path.fillColor = array[index + 1];
        }
        
        // close path if neessary
        if(array[index + 2] == 'true') {
            this.path.closed = true;
        }
        
        // iterate from there adding all the points
        // in the save code
        var i = index + 3
        while(true) {
            if (array[i] == "p") {
                var point = new Point
                ((array[i+1] * wUnit), (array[i+2] * wUnit) );
                i+=3;
                this.newPoint(point);
            }
            else {
                break;
            }
        }
        
        // smooth array if necessary
        if(array[i] == 'true') {
            this.curve = true;
            this.path.smooth();
        }

        // return ending index so drawing load func can continue
        return (i+1);
    } 
    //-------------------------------------------------------//

    /* helper function creates string containing string code
    associated with shape seperated by dashes*/
    printShapeCode() {
        // starts with marker of new shape
        var output = "-s";
        
        // add stokecolor
        output += "-" + this.path.strokeColor.toCSS()
        
        // add fillcolor
        if(this.path.fillColor == null) {
            output += "-" + 'null';
        }
        else {
            output += "-" + this.path.fillColor.toCSS();
        }
        
        // closed shape code
        output += "-" + this.path.closed 
        
        // add all points in WUnits for portability
        // divided by 'p' 
        for (var i = 0; i < this.points.length; i++){
            output += "-p";
            output += "-" + (this.points[i].x / wUnit);  
            output += "-" + (this.points[i].y / wUnit);

        }
        
        // add curve code
        output += "-" + this.curve
        return output;
    }

    //-------------------------------------------------------//

    /* helper function creates string containing Constructor*/
    printShapeConstr(shapeNumber,xCenter, yCenter) {
        // adds new path, strokColor, fillcolor, closed
        var output = "\t\tthis.path" + shapeNumber + "= new Path();\n";
        
        output += "\t\tthis.path" + shapeNumber + ".strokeColor = " +
        this.path.strokeColor + ";\n"
        
        output += "\t\tthis.path" + shapeNumber + ".fillColor = " +
        this.path.fillColor + ";\n"
        
        output += "\t\tthis.path" + shapeNumber + ".closed = " +
        this.path.closed + ";\n"
        
        // adds each point to path
        for (var i = 0; i < this.points.length; i++){
            output += "\t\tthis.path" + shapeNumber + ".add( new Point(" + 
            ((this.points[i].x - xCenter) / wUnit) + "* wUnit * this.size + this.xLoc, " 
            + ((this.points[i].y - yCenter) / wUnit) + " * wUnit * this.size + this.yLoc));\n";

        }
        // smooths if nesessary
        if(this.curve) {
            output += "\t\tthis.path" + shapeNumber + ".smooth();\n"
        }
        return output;
    }
    //-------------------------------------------------------//

    /* helper function creates string containing update
    which Increments path x and y position  */
    printShapeUpdate(shapeNumber) {
        var output = "\t\tthis.path" + shapeNumber + ".position.x += xIncr\n";
        output += "\t\tthis.path" + shapeNumber + ".position.y += yIncr\n";
        return output;
    }

    //-------------------------------------------------------//

    /* function prints remover method that removes path from 
    screen so it doesn't need to be redrawn */
    printShaperemove(shapeNumber) {
        var output = "\t\tthis.path" + shapeNumber + ".remove()\n";
        return output;
    }
}