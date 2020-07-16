$(function(){

  function buildSchedule(schedule){
    let html = `
              <div class="task" style="grid-column: ${schedule.start_scale}/${schedule.finish_scale}; background-color: ${schedule.color};">
                <a href="/schedules/${schedule.id}/edit">${schedule.name}</a>
              </div>
              `
    return html;
  }
  $('.form-field__form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(schedule){
      let html = buildSchedule(schedule);
      $('.schedule-wrapper__plan').append(html);
      $('form')[0].reset();
      $('.add-schedule').prop('disabled', false);
    })
    .fail(function(){
      alert("登録できませんでした");
    })
  });
  

});