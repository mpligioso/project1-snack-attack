var points = $('.points');

var timer = $('.timer');

$('.points span').text(snackboard.player.points);
$('.timer span').text(snackboard.timer);

points.keypress(function(){
  $('.points span').text(snackboard.player.points);
})

timer.on("change", function(){
  $('.timer span').text(snackboard.timer);
})

