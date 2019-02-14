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

var dotSizeBias = {
    x: 3000,
    y: 600
}

// Array to store the dots
var dots = [];

function calculateDotSize(position, center) {
    var sizeScale = Math.pow(0.05 * (center.x - position.x), 2) / dotSizeBias.x + Math.pow(0.05 * (center.y - position.y), 2) / dotSizeBias.y;
    var dotSize = Math.max(minDotSize,
        Math.min(maxDotSize,
                 minDotSize / sizeScale));

    return dotSize;
}

function renderDot(position, center) {
    var currentDot = new Path.Circle(position, calculateDotSize(position, center));
    currentDot.fillColor = dotColor;
    return currentDot;
}

// Clears the canvas and renders the dot pattern
function renderDotPattern() {
    console.log("Starting rendering " + Date.now());
    project.clear();
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    var center = new Point(centerPoint.x * width, centerPoint.y * height);

    var currentX = 0;
    while (currentX < width) {
        dots[currentX] = [];
        var currentY = -yGap /  2;
        while (currentY < height) {
            var currentPos = new Point(currentX, currentY);
            dots[currentX][currentY] = renderDot(currentPos, center);
            currentY += yGap;
        }
        currentX += xGap;
    }
    console.log("Rendering finished " + Date.now());
}

$(window).resize(renderDotPattern);
renderDotPattern();