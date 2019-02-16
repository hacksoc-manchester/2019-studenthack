// The horizontal and vertical gap between dots
var xGap = 15;
var yGap = 15;

var minDotSize = 0.5;
var maxDotSize = 6;

// The center of the dot pattern expressed in percentage of the window's dimensions
var centerPoint = {
    x: 0.5,
    y: 0.35
};

var dotSizeBias = {
    x: 2000,
    y: 400
};

var presets = {
    pagePadding: {
        768: 0.1, // (window)px: (window)%
        0: 0.1 // (window)px: (window)%
    },
    gap_titleBubble_timer: {
        1200: 0.1, // (window)px: (window)%
        992: 0.1,
        768: 0.1,
        0: 0.1
    },
    titleBubbleImgRatio: 1.41,
    titleBubbleOffset: {
        1200: 0.15, // (window)px: (window)%
        992: 0.1,
        768: 0.1,
        0: 0.1
    },
    titleBubbleWidth: {
        1200: 0.35, // (window)px: (window)%
        992: 0.35,
        768: 0.55,
        0: 0.8
    }
};

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
//   console.log("Starting rendering " + Date.now());
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
//   console.log("Rendering finished " + Date.now());
}


function getPresetForBrowserWidth(presetsArray) {
    var screenWidth = $(window).width();
    var previousScreenSize = 0;
    for(var screenSize in presetsArray) {
        if (screenSize > screenWidth) {
            return presetsArray[previousScreenSize];
        }
        previousScreenSize = screenSize;
    }
    return presetsArray[previousScreenSize];
}

function getMaxYPos() {
    var height = $(window).height();
    return height - (height * getPresetForBrowserWidth(presets.pagePadding));
}

function centerHorizontally(element) {
    var left = ($(window).width() - element.width()) / 2;
    element.css({
        left: left + "px"
    });
}

function placeTitleBubble() {
    var titleBubble = $("#title-bubble");
    var requiredYPos = $("#canvas").height() * 
                    (centerPoint.y - getPresetForBrowserWidth(presets.titleBubbleOffset));
    var windowWidth = $(window).width();
    var bubbleWidth = windowWidth * getPresetForBrowserWidth(presets.titleBubbleWidth);

    titleBubble.css({
        top: requiredYPos,
        width: bubbleWidth + "px",
        height: bubbleWidth /  presets.titleBubbleImgRatio + "px"
    });

    centerHorizontally(titleBubble);
}

function placeTimer() {
    var screenHeight = $(window).height();
    var titleBubble = $("#title-bubble");
    var titleBubbleHeight = titleBubble.width() / presets.titleBubbleImgRatio;
    var titleBubbleBottom = titleBubble.offset().top + titleBubbleHeight;
    var offset = screenHeight * getPresetForBrowserWidth(presets.gap_titleBubble_timer);

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