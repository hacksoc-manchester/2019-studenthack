// The horizontal and vertical gap between dots
var xGap = 15;
var yGap = 15;

var minDotSize = 0.5;
var maxDotSize = 6;

// The center of the dot pattern expressed in percentage of the window's dimensions
var centerPoint = {
    x: 0.5,
    y: 0.35
}

var dotSizeBias = {
    x: 2000,
    y: 400
}

var spacingPresets = {
    pagePadding: {
        0: 0.1
    },
    titleBubble_timer: {
        0: 0.1
    }
}

var titleBubbleWidth = 0.35;
var titleBubbleImgRation = 1.41;

// Array to store the dots
var dots = [];

var dotColor = new Color(1, 0.874, 0.58);

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


function getPresetForBrowserWidth(presetsArray) {
    var screenWidth = $(window).width();
    for(var screenSize in presetsArray)
    if (screenSize < screenWidth)
    return presetsArray[screenSize];
    return 1;
}

function getMaxYPos() {
    var height = $(window).height();
    return height - (height * getPresetForBrowserWidth(spacingPresets.pagePadding));
}

function centerHorizontally(element) {
    var left = ($(window).width() - element.width()) / 2;
    element.css({
        left: left + "px"
    });
}

function placeTitleBubble() {
    var titleBubble = $("#title-bubble");
    var requiredYPos = $("#canvas").height() * (centerPoint.y - 0.15);
    var height = titleBubbleWidth * titleBubbleImgRation;
    titleBubble.css({
        top: requiredYPos,
        width: (titleBubbleWidth * 100) + "%",
        height: (height * 100) + "%"
    });
    centerHorizontally(titleBubble);
}

function placeTimer() {
    var screenHeight = $(window).height();
    var titleBubble = $("#title-bubble");
    var titleBubbleBottom = titleBubble.offset().top + titleBubble.height();
    var offset = screenHeight * getPresetForBrowserWidth(spacingPresets.titleBubble_timer);

    var timer = $("#timer");
    timer.css({
        top: Math.min(titleBubbleBottom + offset, 
            getMaxYPos() - timer.height())
    })
    centerHorizontally(timer);
}

function calculateDotSize(position, center) {
    var sizeScale = Math.pow(0.05 * (center.x - position.x), 2) / dotSizeBias.x + Math.pow(0.05 * (center.y - position.y), 2) / dotSizeBias.y;
    var dotSize = Math.max(minDotSize,
        Math.min(maxDotSize,
                 minDotSize / sizeScale));

    return dotSize;
}

function placeElements() {
    placeTitleBubble();
    placeTimer();
    renderDotPattern();
}

$(window).resize(placeElements);
placeElements();