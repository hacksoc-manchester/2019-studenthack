// The horizontal and vertical gap between dots
var xGap = 15;
var yGap = 15;

var minDotSize = 0.5;
var maxDotSize = 6;

var dotColor = new Color(1, 0.874, 0.58);

// The center of the dot pattern expressed in percentage of the window's dimensions
var centerPoint = {
    x: 0.5,
    y: 0.2
}

// Clears the canvas and renders the dot pattern
function renderDotPattern() {
    project.clear();
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    var center = new Point(centerPoint.x * width, centerPoint.y * height);


    var currentY = -yGap /  2;
    while (currentY < height) {
        var currentX = 0;
        while (currentX < width) {
            var currentPos = new Point(currentX, currentY);
            var currentSize = Math.max(minDotSize,
                                       Math.min(maxDotSize,
                                                minDotSize * 1500 / currentPos.getDistance(center)));
            var currentDot = new Path.Circle(currentPos, currentSize);
            currentDot.fillColor = dotColor;
            currentDot.onMouseEnter = function() {
                currentDot.set({
                    fillColor: 'black'
                });
            };
            currentX += xGap;
        }
        currentY += yGap;
    }
}

$(window).resize(renderDotPattern);
renderDotPattern();