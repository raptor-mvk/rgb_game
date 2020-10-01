$(function(){
  var default_level = 1
  var default_points = 0 
  var default_lives = 30
  var cur_pts = 0
  var timerId = 0

  function prepare_question(level, points, lives) {
    $('#level-num').html(level)
    $('#pts-cnt').html(points)
    $('#lives-cnt').html(lives)
    var red_q = Math.round(Math.random() * 255)
    var green_q = Math.round(Math.random() * 255)
    var blue_q = Math.round(Math.random() * 255)
    $('#question-1').css('background-color', 'RGB('+red_q+','+green_q+','+blue_q+')')
    var ans = Math.floor(Math.random() * 5) + 1
    for (i = 1; i <= 5; i++) {
       if (ans == i) {
         $('#answer-'+i).css('background-color', 'RGB('+red_q+','+green_q+','+blue_q+')')
         $('#answer-'+i).unbind('click')
         $('#answer-'+i).on('click', function() {
            if (level == 30) {
              alert('Вы выиграли! Результат: ' + points + ' очков')
            } else {
              prepare_question(level + 1, points + cur_pts, lives)
            }
         })
       } else {	
         var red_a = Math.round(Math.random() * (128 - 4 * level) - 64)
         var green_a = Math.round(Math.random() * (128 - 4 * level) - 64)
         var blue_a = Math.round(Math.random() * (128 - 4 * level) - 64)
         red_a = (red_q + red_a + 128 - 4 * level) % 255
         green_a = (green_q + green_a + 128 - 4 * level) % 255
         blue_a = (blue_q + blue_a + 128 - 4 * level) % 255
         $('#answer-'+i).css('background-color', 'RGB('+red_a+','+green_a+','+blue_a+')')
         $('#answer-'+i).unbind('click')
         $('#answer-'+i).on('click', function() {
            if (lives == 1) {
              alert('Вы проиграли! Результат: ' + points + ' очков')
              prepare_question(default_level, default_points, default_lives)
            } else {
              alert('Мимо! У вас осталось ' + (lives - 1) + ' попыток')
              prepare_question(level, points - level, lives - 1)
            }
         })
       }
    }
    clearInterval(timerId);
    cur_pts = 10
    $('#level-pts').html(cur_pts)
    timerId = setInterval(function() {
        cur_pts--;
        $('#level-pts').html(cur_pts)
      }, 1000);
    setTimeout(function() {
        clearInterval(timerId);
      }, 10000);
  }

  prepare_question(default_level, default_points, default_lives)
  $('#question-1').on('click', function() {
    prepare_question(default_level, default_points, default_lives)
  });
});