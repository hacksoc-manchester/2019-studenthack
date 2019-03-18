// Configuration
var countDownDate = new Date("Mar 30, 2019 9:00:00").getTime();

var bounceSettings = {
  times: 1,
  distance: 4, //px
  speed: 20 //ms
}

// Logic (DO NOT MODIFY)
var currentTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}

var previousTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}

$(document).queue(updateTime);

function bounce(element) {
  for(var i = 0; i < bounceSettings.times; i++) {
      element.animate({top: '-='+ bounceSettings.distance}, bounceSettings.speed)
          .animate({top: '+='+bounceSettings.distance}, bounceSettings.speed);
  }        
}

function updateTime() {
  $(this).dequeue();
  var now = new Date().getTime();
  var distance = countDownDate - now;

  currentTime.days = Math.floor(distance / (1000 * 60 * 60 * 24));
  currentTime.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  currentTime.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  currentTime.seconds = Math.floor((distance % (1000 * 60)) / 1000);

  for(var unit in previousTime) {
    if (previousTime[unit] == 0 || previousTime[unit] != currentTime[unit]) {
      previousTime[unit] = currentTime[unit];
      bounce($("#timer-" + unit));
    }
    $("#timer-" + unit).html(currentTime[unit] < 10 ? "0" + currentTime[unit] : currentTime[unit]);
  }

  if (distance < 0) {
    for(var unit in currentTime) {
      $("#timer-" + unit).html("00");
    }
    return;
  }
  $(document).delay(1000).queue(updateTime);
}
