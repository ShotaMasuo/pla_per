$(function(){

  function buildSchedule(schedule){
    let html = `
              <div class="task" style="grid-column: ${schedule.start_scale}/${schedule.finish_scale}; background-color: ${schedule.color}; grid-row: 1/2; ">
                <span>${schedule.name}</span>
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
                  <div class="task" style="grid-column: ${width[0]}/${width[1]}; grid-row: 1/2; background-color: ${schedules[i]['color']}; data-schedule_id="${schedule_id}"">
                    <span>${schedules[i]['name']}</span>
                  </div>
                `
      if (width.length > 2){
        let html3 = `
                      <div class="task" style="grid-column: ${width[2]}/${width[3]}; grid-row: 3/4; background-color: ${schedules[i]['color']}; cursor: default;">
                        <span>${schedules[i]['name']}</span>
                      </div>
                    `
        html += html3
      }
      html2 = html2 + html;
    }
    return html2;
  }
  function buildDone(s_scale, f_scale, color, name){
    let addhtml = `
                  <div class="task" style="grid-column: ${s_scale}/${f_scale}; grid-row: 3/4; background-color: ${color}; cursor: default;">
                   ${name}
                  </div>
    `
    return addhtml;
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
  $(document).on('click', '.left-buttons__left', function(e){
    e.preventDefault();
    if ($('div').hasClass('display-input')){
      $(".under-leftbuttons").slideUp();
      $(".under-leftbuttons").removeClass('display-input');
    }else{
      $(".under-leftbuttons").slideDown();
      $(".under-leftbuttons").addClass('display-input');
    }
  })
  let doneurl = ""
  $(document).on('click', '.task', function(){
    doneurl = "/schedules/" + $(this).attr("data-schedule_id")
    $('.edit-wrapper').fadeIn();
    $('.edit-wrapper').addClass('to_block');
  });
  $(document).on('click', '.close-btn', function(){
    $('.edit-wrapper').fadeOut();
    $('.edit-wrapper').removeClass('to_block');
  })
  $('.edit-schedule__form').on('submit', function(e){
    let formData = new FormData(this);
    e.preventDefault();
    $('.edit-wrapper').fadeOut();
    $('.edit-wrapper').removeClass('to_block');
    $.ajax({
      url: doneurl,
      type: "PATCH",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(schedule){
      console.log(schedule.finished_scale);
      $('.schedule-wrapper__plan').append(buildDone(schedule.started_scale, schedule.finished_scale, schedule.color, schedule.name));
      $('.send-done').prop('disabled', false);
    })
    .fail(function(){
      alert('更新できませんでした。')
      $('.send-done').prop('disabled', false);
    })
  })
});