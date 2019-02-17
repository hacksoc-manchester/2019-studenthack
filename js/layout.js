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
    dotPatternOffset: {
        1200:  0
    },
    titleBubbleHeight: {
        1200: 1, // (window)px: (window)%
        0: 1.1
    },
    titleBubbleWidth: {
        1200: 1, // (window)px: (window)%
        992: 1.12,
        0: 1.2
    },
    titleBubbleTextOffset: {
        0: 0.45 // (window)px: (window)%
    },
    logoRatio: 1.08
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
//   $("#canvas").height($(document).height());
  var width = $("#canvas").width();
  var height = $("#canvas").height();
//   var height = $(document).height();
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

function placeDotPattern() {
    var container = $(".content");
    // container.css("background-position-x",
    //                 getPresetForBrowserWidth(presets.));
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

function centerHorizontally(element) {
    var left = ($(window).width() - element.width()) / 2;
    element.css({
        left: left + "px"
    });
}

function placeTitleText() {
    var textContainer = $("#title-bubble-content")
    var titleBubble = $("#title-bubble");

    var requiredPosition = 
            titleBubble.height()
            * getPresetForBrowserWidth(presets.titleBubbleTextOffset);
    textContainer.css({
        top: requiredPosition + "px"
    })
}

function placeTitleBubble() {
    var titleBubble = $("#title-bubble");
    var requiredHeight = $(window).height() * 
        getPresetForBrowserWidth(presets.titleBubbleHeight);
    var requiredWidth = $(window).width() * 
        getPresetForBrowserWidth(presets.titleBubbleWidth);

    titleBubble.css({
        width: requiredWidth + "px",
        height: requiredHeight + "px"
    })
}


function calculateDotSize(position, center) {
    var sizeScale = Math.pow(0.05 * (center.x - position.x), 2) / dotSizeBias.x + Math.pow(0.05 * (center.y - position.y), 2) / dotSizeBias.y;
    var dotSize = Math.max(minDotSize,
        Math.min(maxDotSize,
                 minDotSize / sizeScale));

    return dotSize;
}

function resizeLogo() {
    var logo = $("#logo");
    var logoWidth = logo.width();
    var requiredHeight = logoWidth / presets.logoRatio;

    logo.css({
        height: requiredHeight + "px"
    });
}

function loaded() {
    $('.preloader').fadeOut(1000, "swing", function()  {
        $('.preloader-wrapper').fadeOut();
    });
    $('body').removeClass('preloader-site');
}

function placeElements() {
    // renderDotPattern();
    placeTitleBubble();
    placeDotPattern();
    resizeLogo();
    placeTitleText();
    loaded();
}

$(document).ready(function () {
    $('body').addClass('preloader-site');

    $(window).resize(placeElements);
    placeElements();
    // $("body").scroll(placeElements);
});