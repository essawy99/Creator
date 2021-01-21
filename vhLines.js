class vhLines {
    constructor() {
        /* horizontal line between equal x points */
        var from = new Point(200, -2000);
        var to = new Point(200, 2000);
        this.horizontal = new Path.Line(from, to);
        this.horizontal.strokeColor ='black';

        /* vertical line between equal y points */
        var from2 = new Point(-2000, 200);
        var to2 = new Point(2000, 200);
        this.vertical = new Path.Line(from2, to2);
        this.vertical.strokeColor ='black';
    }
    //-------------------------------------------------------//

    /* function updates grid to location of mouse click/drag */
    updateGrid(cursor, drawing) {
        // adjust grid location
        this.horizontal.position.x = cursor.x;
        this.vertical.position.y = cursor.y;
        
        // reset grid color
        this.horizontal.strokeColor ='black';
        this.vertical.strokeColor ='black';
        
        // iterates through each point in drawing and if 
        // two points have equal x position it changes 
        // horizontal grid color to orange and vice versa
        // for vertical
        for(var i = 0; i < drawing.shapes.length; i++) {
            var shape = drawing.shapes[i];
            for(var j = 0; j < shape.points.length; j++) {
                var point = shape.points[j];
                // update horizontal color if equal
                if(cursor.x == point.x && point != drawing.pointOfInterest) {
                    this.horizontal.strokeColor = 'orange';  
                }
                // update vertical color if equal
                if(cursor.y == point.y && point != drawing.pointOfInterest) {
                    this.vertical.strokeColor = 'orange';
                }
            }
        }
    }
    //-------------------------------------------------------//
}