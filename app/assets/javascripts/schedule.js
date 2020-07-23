$(function(){

  function buildSchedule(schedule){
    let html = `
              <div class="task" style="grid-column: ${schedule.start_scale}/${schedule.finish_scale}; background-color: ${schedule.color};">
                <span data-schedule_id="${schedule.id}">${schedule.name}</span>
              </div>
              `
    return html;
  }
  function buildButton(newday){
    let html = `
      <a class="day-icon back" id="/schedules/${newday[0]}/otherday" href="/schedules/${newday[0]}/otherday">
        <i class="fas fa-chevron-left"></i>
      </a>
      <span class="day_display">${newday[1]}</span>
      <a class="day-icon front" id="/schedules/${newday[2]}/otherday" href="/schedules/${newday[2]}/otherday">
        <i class="fas fa-chevron-right"></i>
      </a>
    `
    return html;
  }
  function buildPlanDone(schedules, width_records){
    let html2 = ""
    for(var i = 0; i< schedules.length; i++){
      let schedule_id = schedules[i].id
      let width = width_records[schedule_id]
      let html = `
                  <div class="task" style="grid-column: ${width[0]}/${width[1]}; grid-row: 1/2; background-color: ${schedules[i]['color']};">
                    <span data-schedule_id="${schedules[i].id}">${schedules[i]['name']}</span>
                  </div>
                `
      if (width.length > 2){
        let html3 = `
                      <div class="task" style="grid-column: ${width[2]}/${width[3]}; grid-row: 3/4; background-color: ${schedules[i]['color']};">
                      <span data-schedule_id="${schedules[i].id}">${schedules[i]['name']}</span>
                      </div>
                    `
        html += html3
      }
      html2 = html2 + html;
    }
    return html2;
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
      $('.add-schedule').prop('disabled', false);
    })
  });
  
  $(document).on('click', '.day-icon', function(e){
    e.preventDefault();
    let day = $(this).attr("id");
    $.ajax({
      url: day,
      type: "GET",
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(schedules){
      $('.task').remove();
      $('.back').remove();
      $('.front').remove();
      $('.day_display').remove();
      $('.center-buttons').append(buildButton(schedules.days));
      $('.schedule-wrapper__plan').append(buildPlanDone(schedules.schedules, schedules.width_records));
      $('.day-icon').prop('disabled', false);
    });
  });
});