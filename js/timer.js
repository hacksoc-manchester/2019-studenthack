var countDownDate = new Date("Mar 23, 2019 9:00:00").getTime();

var x = setInterval(updateTime, 1000);
updateTime();

function updateTime() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  $("#timer-days").html(days < 10 ? "0" + days : days);
  $("#timer-hours").html(hours < 10 ? "0" + hours: hours);
  $("#timer-minutes").html(minutes < 10 ? "0" + minutes : minutes);
  $("#timer-seconds").html(seconds < 10 ? "0" + seconds : seconds);

  if (distance < 0) {
    clearInterval(x);
    $("#timer-days").html("00");
    $("#timer-hours").html("00");
    $("#timer-minutes").html("00");
    $("#timer-seconds").html("00");
  }
}